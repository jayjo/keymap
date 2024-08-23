// Copyright Joyent and Node contributors. All rights reserved. MIT license.

function unimplemented(name) {
  throw new Error(
    `Node.js HTTP/2 ${name} is not currently supported by JSPM core in Deno`,
  );
}

export class Http2Session {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class ServerHttp2Session {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class ClientHttp2Session {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class Http2Stream {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class ClientHttp2Stream {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class ServerHttp2Stream {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class Http2Server {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class Http2SecureServer {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export function createServer() {}
export function createSecureServer() {}
export function connect() {}
export const constants = {};
export function getDefaultSettings() {}
export function getPackedSettings() {}
export function getUnpackedSettings() {}
export const sensitiveHeaders = Symbol("nodejs.http2.sensitiveHeaders");
export class Http2ServerRequest {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export class Http2ServerResponse {
  constructor() {
    unimplemented(this.constructor.name);
  }
}
export default {
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
