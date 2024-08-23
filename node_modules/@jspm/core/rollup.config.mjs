import rollupPluginJspm from '@jspm/plugin-rollup';
import { readdirSync } from 'fs';
import rimraf from 'rimraf';

rimraf.sync('./nodelibs/browser');

const input = Object.fromEntries(
  [
    ...readdirSync('./src-browser'),
    'assert/strict.js',
    'fs/promises.js',
    'dns/promises.js',
    'path/posix.js',
    'path/win32.js',
    'stream/promises.js',
    'stream/web.js',
    'timers/promises.js',
    'util/types.js'
  ]
    .filter(n => !n.startsWith('__') && n.endsWith('.js'))
    .map(n => [n.slice(0, -3), './src-browser/' + n])
);

const jspmPlugin = rollupPluginJspm({
  env: ['browser'],
  inputMap: {
    // TODO: better way to override scopes?
    imports: input,
    scopes: {
      './node_modules/assert/': input,
      './node_modules/browserify-zlib/': input,
      './node_modules/buffer/': input,
      './node_modules/console-browserify/': input,
      './node_modules/constants-browserify/': input,
      './node_modules/crypto-browserify/': input,
      './node_modules/diagnostics_channel/': input,
      './node_modules/domain-browser/': input,
      './node_modules/events/': input,
      './node_modules/glob/': input,
      './node_modules/https-browserify/': input,
      './node_modules/kleur/': input,
      './node_modules/memfs/': input,
      './node_modules/open/': input,
      './node_modules/os-browserify/': input,
      './node_modules/path-browserify/': input,
      './node_modules/punycode/': input,
      './node_modules/querystring/': input,
      './node_modules/rollup/': input,
      './node_modules/stream-browserify/': input,
      './node_modules/stream-http/': input,
      './node_modules/string_decoder/': input,
      './node_modules/timers-browserify/': input,
      './node_modules/tty-browserify/': input,
      './node_modules/url/': input,
      './node_modules/util/': input,
      './node_modules/vm-browserify/': input
      
    }
  }
});

export default {
  input,
  output: {
    dir: 'nodelibs/browser',
    entryFileNames: '[name].js',
    chunkFileNames: 'chunk-[hash].js',
    format: 'esm'
  },
  onwarn () {},
  plugins: [jspmPlugin, {
    buildStart () {
      // (async () => {
      //   for await (const { type, message } of jspmPlugin.logStream()) {
      //     console.log(`${type}: ${message}`);
      //   }
      // })();
    }
  }]
}
