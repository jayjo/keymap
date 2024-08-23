function unimplemented () {
  throw new Error('Node.js tls module is not supported by JSPM core outside of Node.js');
}

var tls = {
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

var CLIENT_RENEG_LIMIT = null,
  CLIENT_RENEG_WINDOW = null,
  DEFAULT_CIPHERS = null,
  DEFAULT_ECDH_CURVE = null,
  DEFAULT_MIN_VERSION = null,
  DEFAULT_MAX_VERSION = null,
  rootCertificates = null;

export { CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW, DEFAULT_CIPHERS, DEFAULT_ECDH_CURVE, DEFAULT_MAX_VERSION, DEFAULT_MIN_VERSION, unimplemented as SecureContext, unimplemented as Server, unimplemented as TLSSocket, unimplemented as checkServerIdentity, unimplemented as connect, unimplemented as convertALPNProtocols, unimplemented as createSecureContext, unimplemented as createSecurePair, unimplemented as createServer, tls as default, unimplemented as getCiphers, unimplemented as parseCertString, rootCertificates };
