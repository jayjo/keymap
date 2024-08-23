function unimplemented(name) {
  throw new Error('Node.js process ' + name + ' is not supported by JSPM core outside of Node.js');
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue)
    return;
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  }
  else {
    queueIndex = -1;
  }
  if (queue.length)
    drainQueue();
}

function drainQueue() {
  if (draining)
    return;
  var timeout = setTimeout(cleanUpNextTick, 0);
  draining = true;

  var len = queue.length;
  while(len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue)
        currentQueue[queueIndex].run();
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  clearTimeout(timeout);
}

export function nextTick (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining)
    setTimeout(drainQueue, 0);
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

export var title = 'browser';
export var arch = 'x64';
export var platform = 'browser';
export var env = {
  PATH: '/usr/bin',
  LANG: navigator.language + '.UTF-8',
  PWD: '/',
  HOME: '/home',
  TMP: '/tmp',
};
export var argv = ['/usr/bin/node'];
export var execArgv = [];
export var version = 'v16.8.0';
export var versions = {};

export var emitWarning = function(message, type) {
  console.warn((type ? (type + ': ') : '') + message);
};

export var binding = function(name) { unimplemented('binding'); };

export var umask = function(mask) { return 0; };

export var cwd = function() { return '/'; };
export var chdir = function(dir) {};

export var release = {
  name: 'node',
  sourceUrl: '',
  headersUrl: '',
  libUrl: '',
}

function noop() {}

export var _rawDebug = noop;
export var moduleLoadList = [];
export function _linkedBinding(name) { unimplemented('_linkedBinding'); }
export var domain = {};
export var _exiting = false;
export var config = {};
export function dlopen(name) { unimplemented('dlopen'); }
export function _getActiveRequests() { return []; }
export function _getActiveHandles() { return []; }
export var reallyExit = noop;
export var _kill = noop;
export var cpuUsage = function() { return {}; };
export var resourceUsage = cpuUsage;
export var memoryUsage = cpuUsage;
export var kill = noop;
export var exit = noop;
export var openStdin = noop;
export var allowedNodeEnvironmentFlags = {};
export function assert(condition, message) {
  if (!condition) throw new Error(message || 'assertion error');
}
export var features = {
  inspector: false,
  debug: false,
  uv: false,
  ipv6: false,
  tls_alpn: false,
  tls_sni: false,
  tls_ocsp: false,
  tls: false,
  cached_builtins: true,
};
export var _fatalExceptions = noop;
export var setUncaughtExceptionCaptureCallback = noop;
export function hasUncaughtExceptionCaptureCallback() { return false; };
export var _tickCallback = noop;
export var _debugProcess = noop;
export var _debugEnd = noop;
export var _startProfilerIdleNotifier = noop;
export var _stopProfilerIdleNotifier = noop;
export var stdout = undefined;
export var stderr = undefined;
export var stdin = undefined;
export var abort = noop;
export var pid = 2;
export var ppid = 1;
export var execPath = '/bin/usr/node';
export var debugPort = 9229;
export var argv0 = 'node';
export var _preload_modules = [];
export var setSourceMapsEnabled = noop;

var _performance = {
  now: typeof performance !== 'undefined' ? performance.now.bind(performance) : undefined,
  timing: typeof performance !== 'undefined' ? performance.timing : undefined,
};
if (_performance.now === undefined) {
  var nowOffset = Date.now();

  if (_performance.timing && _performance.timing.navigationStart) {
    nowOffset = _performance.timing.navigationStart;
  }
  _performance.now = () => Date.now() - nowOffset;
}

export function uptime() {
  return _performance.now() / 1000;
}

var nanoPerSec = 1000000000;
export function hrtime(previousTimestamp) {
  var baseNow = Math.floor((Date.now() - _performance.now()) * 1e-3);
  var clocktime = _performance.now() * 1e-3;
  var seconds = Math.floor(clocktime) + baseNow;
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += nanoPerSec;
    }
  }
  return [seconds, nanoseconds];
};
hrtime.bigint = function(time) {
  var diff = hrtime(time);
  if (typeof BigInt === 'undefined') {
    return diff[0] * nanoPerSec + diff[1];
  }
  return BigInt(diff[0] * nanoPerSec) + BigInt(diff[1]);
};

export var _maxListeners = 10;
export var _events = {};
export var _eventsCount = 0;
export function on () { return process };
export var addListener = on;
export var once = on;
export var off = on;
export var removeListener = on;
export var removeAllListeners = on;
export var emit = noop;
export var prependListener = on;
export var prependOnceListener = on;
export function listeners (name) { return []; };

var process = {
  version,
  versions,
  arch,
  platform,
  release,
  _rawDebug,
  moduleLoadList,
  binding,
  _linkedBinding,
  _events,
  _eventsCount,
  _maxListeners,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  prependListener,
  prependOnceListener,
  listeners,
  domain,
  _exiting,
  config,
  dlopen,
  uptime,
  _getActiveRequests,
  _getActiveHandles,
  reallyExit,
  _kill,
  cpuUsage,
  resourceUsage,
  memoryUsage,
  kill,
  exit,
  openStdin,
  allowedNodeEnvironmentFlags,
  assert,
  features,
  _fatalExceptions,
  setUncaughtExceptionCaptureCallback,
  hasUncaughtExceptionCaptureCallback,
  emitWarning,
  nextTick,
  _tickCallback,
  _debugProcess,
  _debugEnd,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  stdout,
  stdin,
  stderr,
  abort,
  umask,
  chdir,
  cwd,
  env,
  title,
  argv,
  execArgv,
  pid,
  ppid,
  execPath,
  debugPort,
  hrtime,
  argv0,
  _preload_modules,
  setSourceMapsEnabled,
};

export default process;
