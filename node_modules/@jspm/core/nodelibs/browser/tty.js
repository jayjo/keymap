function isatty () {
  return false;
}

function ReadStream () {
  throw new Error('tty.ReadStream is not implemented');
}

function WriteStream() {
  throw new Error('tty.WriteStream is not implemented');
}

var m = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isatty: isatty,
  ReadStream: ReadStream,
  WriteStream: WriteStream
});

export { ReadStream, WriteStream, m as default, isatty };
