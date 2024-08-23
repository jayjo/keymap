function unimplemented () {
  throw new Error('Node.js dgram module is not supported by JSPM core in the browser');
}

export default {
  _createSocketHandle: unimplemented,
  createSocket: unimplemented,
  Socket: unimplemented
};

export {
  unimplemented as _createSocketHandle,
  unimplemented as createSocket,
  unimplemented as Socket
}
