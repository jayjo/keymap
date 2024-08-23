// Copyright Joyent and Node contributors. All rights reserved. MIT license.

function unimplemented(name) {
  throw new Error(
    `Node.js HTTP/2 ${name} is not currently supported by JSPM core in Deno`,
  );
}

class Http2Session {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class ServerHttp2Session {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class ClientHttp2Session {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class Http2Stream {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class ClientHttp2Stream {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class ServerHttp2Stream {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class Http2Server {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class Http2SecureServer {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
function createServer() {}
function createSecureServer() {}
function connect() {}
const constants = {};
function getDefaultSettings() {}
function getPackedSettings() {}
function getUnpackedSettings() {}
const sensitiveHeaders = Symbol("nodejs.http2.sensitiveHeaders");
class Http2ServerRequest {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
class Http2ServerResponse {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
var http2 = {
  Http2Session,
  ServerHttp2Session,
  ClientHttp2Session,
  Http2Stream,
  ClientHttp2Stream,
  ServerHttp2Stream,
  Http2Server,
  Http2SecureServer,
  createServer,
  createSecureServer,
  connect,
  constants,
  getDefaultSettings,
  getPackedSettings,
  getUnpackedSettings,
  sensitiveHeaders,
  Http2ServerRequest,
  Http2ServerResponse,
};

export { ClientHttp2Session, ClientHttp2Stream, Http2SecureServer, Http2Server, Http2ServerRequest, Http2ServerResponse, Http2Session, Http2Stream, ServerHttp2Session, ServerHttp2Stream, connect, constants, createSecureServer, createServer, http2 as default, getDefaultSettings, getPackedSettings, getUnpackedSettings, sensitiveHeaders };
