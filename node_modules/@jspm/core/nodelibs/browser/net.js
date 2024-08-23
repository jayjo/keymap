function unimplemented () {
  throw new Error('Node.js net module is not supported by JSPM core outside of Node.js');
}

var net = {
  _createServerHandle: unimplemented,
  _normalizeArgs: unimplemented,
  _setSimultaneousAccepts: unimplemented,
  connect: unimplemented,
  createConnection: unimplemented,
  createServer: unimplemented,
  isIP: unimplemented,
  isIPv4: unimplemented,
  isIPv6: unimplemented,
  Server: unimplemented,
  Socket: unimplemented,
  Stream: unimplemented
};

export { unimplemented as Server, unimplemented as Socket, unimplemented as Stream, unimplemented as _createServerHandle, unimplemented as _normalizeArgs, unimplemented as _setSimultaneousAccepts, unimplemented as connect, unimplemented as createConnection, unimplemented as createServer, net as default, unimplemented as isIP, unimplemented as isIPv4, unimplemented as isIPv6 };
