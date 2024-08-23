function unimplemented () {
  throw new Error('Node.js tls module is not supported by JSPM core outside of Node.js');
}

export default {
  CLIENT_RENEG_LIMIT: null,
  CLIENT_RENEG_WINDOW: null,
  DEFAULT_CIPHERS: null,
  DEFAULT_ECDH_CURVE: null,
  DEFAULT_MIN_VERSION: null,
  DEFAULT_MAX_VERSION: null,
  getCiphers: unimplemented,
  rootCertificates: null,
  convertALPNProtocols: unimplemented,
  checkServerIdentity: unimplemented,
  parseCertString: unimplemented,
  createSecureContext: unimplemented,
  SecureContext: unimplemented,
  TLSSocket: unimplemented,
  Server: unimplemented,
  createServer: unimplemented,
  connect: unimplemented,
  createSecurePair: unimplemented
};

export var CLIENT_RENEG_LIMIT = null,
  CLIENT_RENEG_WINDOW = null,
  DEFAULT_CIPHERS = null,
  DEFAULT_ECDH_CURVE = null,
  DEFAULT_MIN_VERSION = null,
  DEFAULT_MAX_VERSION = null,
  rootCertificates = null;

export {
  unimplemented as getCiphers,
  unimplemented as convertALPNProtocols,
  unimplemented as checkServerIdentity,
  unimplemented as parseCertString,
  unimplemented as createSecureContext,
  unimplemented as SecureContext,
  unimplemented as TLSSocket,
  unimplemented as Server,
  unimplemented as createServer,
  unimplemented as connect,
  unimplemented as createSecurePair
}
