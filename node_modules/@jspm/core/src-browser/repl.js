function unimplemented () {
  throw new Error('Node.js repl module is not supported by JSPM core in the browser');
}

export default {
  writer: unimplemented,
  _builtinLibs: null,
  REPLServer: unimplemented,
  REPL_MODE_SLOPPY: null,
  REPL_MODE_STRICT: null,
  start: unimplemented,
  Recoverable: unimplemented,
  repl: null
};

export var _builtinLibs = null,
  REPL_MODE_SLOPPY = null,
  REPL_MODE_STRICT = null,
  repl = null;

export {
  unimplemented as writer,
  unimplemented as REPLServer,
  unimplemented as start,
  unimplemented as Recoverable,
}
