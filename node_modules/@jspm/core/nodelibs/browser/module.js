function unimplemented () {
  throw new Error('Node.js module module is not supported by JSPM core in the browser');
}

var builtinModules = [
  '_http_agent',         '_http_client',        '_http_common',
  '_http_incoming',      '_http_outgoing',      '_http_server',
  '_stream_duplex',      '_stream_passthrough', '_stream_readable',
  '_stream_transform',   '_stream_wrap',        '_stream_writable',
  '_tls_common',         '_tls_wrap',           'assert',
  'assert/strict',       'async_hooks',         'buffer',
  'child_process',       'cluster',             'console',
  'constants',           'crypto',              'dgram',
  'diagnostics_channel', 'dns',                 'dns/promises',
  'domain',              'events',              'fs',
  'fs/promises',         'http',                'http2',
  'https',               'inspector',           'module',
  'net',                 'os',                  'path',
  'path/posix',          'path/win32',          'perf_hooks',
  'process',             'punycode',            'querystring',
  'readline',            'repl',                'stream',
  'stream/consumers',    'stream/promises',     'stream/web',
  'string_decoder',      'sys',                 'timers',
  'timers/promises',     'tls',                 'trace_events',
  'tty',                 'url',                 'util',
  'util/types',          'v8',                  'vm',
  'worker_threads',      'zlib'
];

var module = {
  builtinModules: builtinModules,
  _cache: null,
  _pathCache: null,
  _extensions: null,
  globalPaths: null,
  _debug: unimplemented,
  _findPath: unimplemented,
  _nodeModulePaths: unimplemented,
  _resolveLookupPaths: unimplemented,
  _load: unimplemented,
  _resolveFilename: unimplemented,
  createRequireFromPath: unimplemented,
  createRequire: unimplemented,
  _initPaths: unimplemented,
  _preloadModules: unimplemented,
  syncBuiltinESMExports: unimplemented,
  Module: unimplemented,
  runMain: unimplemented,
  findSourceMap: unimplemented,
  SourceMap: unimplemented
};

var _cache = null,
  _pathCache = null,
  _extensions = null,
  globalPaths = null;

export { unimplemented as Module, unimplemented as SourceMap, _cache, unimplemented as _debug, _extensions, unimplemented as _findPath, unimplemented as _initPaths, unimplemented as _load, unimplemented as _nodeModulePaths, _pathCache, unimplemented as _preloadModules, unimplemented as _resolveFilename, unimplemented as _resolveLookupPaths, builtinModules, unimplemented as createRequire, unimplemented as createRequireFromPath, module as default, unimplemented as findSourceMap, globalPaths, unimplemented as runMain, unimplemented as syncBuiltinESMExports };
