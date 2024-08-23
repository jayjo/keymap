import * as empty from '../nodelibs/@empty.js';
import * as emptyDew from '../nodelibs/@empty.dew.js';
import * as assert from '../nodelibs/browser/assert.js';
import * as assertStrict from '../nodelibs/browser/assert/strict.js';
import * as buffer from '../nodelibs/browser/buffer.js';
import * as console from '../nodelibs/browser/console.js';
import * as constants from '../nodelibs/browser/constants.js';
import * as crypto from '../nodelibs/browser/crypto.js';
import * as domain from '../nodelibs/browser/domain.js';
import * as events from '../nodelibs/browser/events.js';
import * as fs from '../nodelibs/browser/fs.js';
import * as fsPromises from '../nodelibs/browser/fs/promises.js';
import * as http from '../nodelibs/browser/http.js';
import * as https from '../nodelibs/browser/https.js';
import * as os from '../nodelibs/browser/os.js';
import * as path from '../nodelibs/browser/path.js';
import * as pathPosix from '../nodelibs/browser/path/posix.js';
import * as pathWin32 from '../nodelibs/browser/path/win32.js';
import * as process from '../nodelibs/browser/process.js';
import * as punycode from '../nodelibs/browser/punycode.js';
import * as querystring from '../nodelibs/browser/querystring.js';
import * as stream from '../nodelibs/browser/stream.js';
import * as streamPromises from '../nodelibs/browser/stream/promises.js';
import * as string_decoder from '../nodelibs/browser/string_decoder.js';
import * as sys from '../nodelibs/browser/sys.js';
import * as timers from '../nodelibs/browser/timers.js';
import * as tty from '../nodelibs/browser/tty.js';
import * as url from '../nodelibs/browser/url.js';
import * as util from '../nodelibs/browser/util.js';
import * as vm from '../nodelibs/browser/vm.js';
import * as zlib from '../nodelibs/browser/zlib.js';
import * as performance from '../nodelibs/browser/perf_hooks.js'
import * as diagnostics_channel from '../nodelibs/browser/diagnostics_channel.js'
import * as wasi from '../nodelibs/browser/wasi.js'
import * as webStream from '../nodelibs/browser/stream/web.js'
import * as workerThreads from '../nodelibs/browser/worker_threads.js'

if (Object.keys(assert).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(assertStrict).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(buffer).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(console).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(constants).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(crypto).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(domain).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(events).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(fs).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(fsPromises).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(http).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(https).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(os).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(path).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(process).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(punycode).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(querystring).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(stream).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(string_decoder).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(sys).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(timers).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(tty).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(url).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(util).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(vm).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(zlib).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(performance).length < 5)
  throw new Error('Invalid exports');
else if (Object.keys(diagnostics_channel).length < 4)
  throw new Error('Invalid exports')
else if (Object.keys(wasi).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(webStream).length < 2)
  throw new Error('Invalid exports.');
else if (Object.keys(workerThreads).length < 16)
  throw new Error('Invalid exports');
