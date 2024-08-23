import http from "http";
import fs from "fs";
import { once } from "events";
import { extname } from "path";
import { fileURLToPath } from "url";
import open from "open";
import kleur from 'kleur';
import { spawn } from 'child_process';
import glob from 'glob';
import path from 'path';

const timeout = 60 * 1000;
const port = 8080;

const rootURL = new URL('..', import.meta.url);

const mimes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.wasm': 'application/wasm'
};

const shouldExit = !process.env.WATCH_MODE;
const testName = process.env.TEST_NAME ?? 'test';

const dirname = path.dirname(fileURLToPath(import.meta.url));
function getTests() {
  return glob.sync('**/*.test.js', {
    ignore: 'node_modules/**',
    cwd: path.join(dirname, '..'),
    absolute: true,
  }).map(test => path.relative(dirname, test).replace(/\\/g, '/'));
}

// Firefox stack to Node.js stack
function createError({ message, stack }) {
  const error = new Error(message);
  const lines = stack ? stack.trim().split('\n').map((l) => {
    if (l[0] === '@') return `    at <anonymous> (${kleur.blue(l.slice(1) || '<anonymous>')})`
    return `    at ${l.slice(0, l.indexOf('@'))} (${kleur.blue(l.slice(l.indexOf('@') + 1) || '<anonymous>')})`;
  }) : [];
  lines.unshift(kleur.red(message));
  error.stack = lines.join('\n');
  return error;
}

let failTimeout, browserTimeout;

function setBrowserTimeout () {
  if (!shouldExit)
    return;
  if (browserTimeout)
    clearTimeout(browserTimeout);
  browserTimeout = setTimeout(() => {
    console.log(`No browser requests made to server for ${timeout / 1000}s, closing.`);
    if (spawnPs)
      spawnPs.kill('SIGKILL');
    process.exit(failTimeout || process.env.CI_BROWSER ? 1 : 0);
  }, timeout);
}

setBrowserTimeout();

http.createServer(async function (req, res) {
  setBrowserTimeout();
  if (req.url.startsWith('/tests/ping')) {
    res.writeHead(200);
    res.end('');
    return;
  }
  else if (req.url.startsWith('/tests/list')) {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-cache' });
    res.end(JSON.stringify(getTests()));
    return;
  }
  else if (req.url.startsWith('/done')) {
    console.log(kleur.green('Tests completed successfully.'));
    const message = new URL(req.url, rootURL).searchParams.get('message');
    if (message) console.log(message);
    if (shouldExit) {
      if (spawnPs)
        spawnPs.kill('SIGKILL');
      setTimeout(() => process.exit(), 500);
    }
    return;
  }
  else if (req.url.startsWith('/error?')) {
    const cnt = req.url.slice(7);
    console.log(kleur.red(cnt + ' test failures found.\n'));
    req.setEncoding('utf8');
    let body = '';
    req.on('data', chunk => body += chunk);
    await once(req, 'end');
    const err = JSON.parse(body);
    console.error(err);
    res.statusCode = 201;
    res.end();
    if (shouldExit) {
      if (spawnPs)
        spawnPs.kill('SIGKILL');
      failTimeout = setTimeout(() => process.exit(1), 5000);
    }
    return;
  }
  else if (failTimeout) {
    clearTimeout(failTimeout);
    failTimeout = null;
  }

  const url = new URL(req.url[0] === '/' ? req.url.slice(1) : req.url, rootURL);
  const filePath = fileURLToPath(url);

  // redirect to test/test.html file by default
  if (url.href === rootURL.href) {
    res.writeHead(301, {
      'location': '/test/test.html'
    });
    res.end();
    return;
  }

  let fileStream;
  try {
    fileStream = fs.createReadStream(filePath);
    await once(fileStream, 'readable');
    if (filePath.endsWith(path.sep)) {
      fileStream.close();
      res.writeHead(404, {
        'content-type': 'text/html'
      });
      res.end(`File not found.`);
      return;
    }
  }
  catch (e) {
    if (e.code === 'EISDIR') {
      res.writeHead(200, { 'content-type': 'text/plain' });
      res.end('Directory');
    }
    else if (e.code === 'ENOENT' || e.code === 'ENOTDIR') {
      res.writeHead(404, {
        'content-type': 'text/html'
      });
      res.end(`File not found.`);
    }
    return;
  }

  let mime;
  if (filePath.endsWith('javascript.css'))
    mime = 'application/javascript';
  else if (filePath.endsWith('content-type-xml.json'))
    mime = 'application/xml';
  else
    mime = mimes[extname(filePath)] || 'text/plain';

  const headers = filePath.endsWith('content-type-none.json') ?
    {} : { 'content-type': mime, 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' }

  res.writeHead(200, headers);
  fileStream.pipe(res);
  await once(fileStream, 'end');
  res.end();
}).listen(port);

let spawnPs;
if (process.env.CI_BROWSER) {
  const args = process.env.CI_BROWSER_FLAGS ? process.env.CI_BROWSER_FLAGS.split(' ') : [];
  console.log('Spawning browser: ' + process.env.CI_BROWSER + ' ' + args.join(' '));
  spawnPs = spawn(process.env.CI_BROWSER, [...args, `http://localhost:${port}/test/${testName}.html`]);
}
else {
  open(`http://localhost:${port}/test/${testName}.html`, { app: { name: open.apps.chrome } });
}
