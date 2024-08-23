function unimplemented () {
  throw new Error('Node.js readline module is not supported by JSPM core outside of Node.js');
}

export default {
  Interface: unimplemented,
  clearLine: unimplemented,
  clearScreenDown: unimplemented,
  createInterface: unimplemented,
  cursorTo: unimplemented,
  emitKeypressEvents: unimplemented,
  moveCursor: unimplemented
};

export {
  unimplemented as Interface,
  unimplemented as clearLine,
  unimplemented as clearScreenDown,
  unimplemented as createInterface,
  unimplemented as cursorTo,
  unimplemented as emitKeypressEvents,
  unimplemented as moveCursor
}
