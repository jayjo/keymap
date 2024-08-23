function unimplemented () {
  throw new Error('Node.js repl module is not supported by JSPM core in the browser');
}

var repl = {
  writer: unimplemented,
  _builtinLibs: null,
  REPLServer: unimplemented,
  REPL_MODE_SLOPPY: null,
  REPL_MODE_STRICT: null,
  start: unimplemented,
  Recoverable: unimplemented,
  repl: null
};

var _builtinLibs = null,
  REPL_MODE_SLOPPY = null,
  REPL_MODE_STRICT = null,
  repl$1 = null;

export { unimplemented as REPLServer, REPL_MODE_SLOPPY, REPL_MODE_STRICT, unimplemented as Recoverable, _builtinLibs, repl as default, repl$1 as repl, unimplemented as start, unimplemented as writer };
