import { b as buffer, d as dew$7 } from './chunk-44e51b61.js';
import { d as dew$6 } from './chunk-c3d025d9.js';
import { p as process } from './chunk-2eac56ff.js';
import h from './url.js';
import './chunk-4bd36a8f.js';
import './chunk-ce0fbc82.js';
import './chunk-b4205b57.js';
import './chunk-5decc758.js';
import './chunk-4ccc3a29.js';
import './chunk-924bb2e1.js';
import './chunk-b04e620d.js';
import './chunk-23dbec7b.js';

var exports$6 = {},
    _dewExec$5 = false;

var _global$3 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$5() {
  if (_dewExec$5) return exports$6;
  _dewExec$5 = true;
  exports$6.fetch = isFunction(_global$3.fetch) && isFunction(_global$3.ReadableStream);
  exports$6.writableStream = isFunction(_global$3.WritableStream);
  exports$6.abortController = isFunction(_global$3.AbortController); // The xhr request to example.com may violate some restrictive CSP configurations,
  // so if we're running in a browser that supports `fetch`, avoid calling getXHR()
  // and assume support for certain features below.

  var xhr;

  function getXHR() {
    // Cache the xhr value
    if (xhr !== undefined) return xhr;

    if (_global$3.XMLHttpRequest) {
      xhr = new _global$3.XMLHttpRequest(); // If XDomainRequest is available (ie only, where xhr might not work
      // cross domain), use the page location. Otherwise use example.com
      // Note: this doesn't actually make an http request.

      try {
        xhr.open("GET", _global$3.XDomainRequest ? "/" : "https://example.com");
      } catch (e) {
        xhr = null;
      }
    } else {
      // Service workers don't have XHR
      xhr = null;
    }

    return xhr;
  }

  function checkTypeSupport(type) {
    var xhr = getXHR();
    if (!xhr) return false;

    try {
      xhr.responseType = type;
      return xhr.responseType === type;
    } catch (e) {}

    return false;
  } // If fetch is supported, then arraybuffer will be supported too. Skip calling
  // checkTypeSupport(), since that calls getXHR().


  exports$6.arraybuffer = exports$6.fetch || checkTypeSupport("arraybuffer"); // These next two tests unavoidably show warnings in Chrome. Since fetch will always
  // be used if it's available, just return false for these to avoid the warnings.

  exports$6.msstream = !exports$6.fetch && checkTypeSupport("ms-stream");
  exports$6.mozchunkedarraybuffer = !exports$6.fetch && checkTypeSupport("moz-chunked-arraybuffer"); // If fetch is supported, then overrideMimeType will be supported too. Skip calling
  // getXHR().

  exports$6.overrideMimeType = exports$6.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false);

  function isFunction(value) {
    return typeof value === "function";
  }

  xhr = null; // Help gc

  return exports$6;
}

var exports$5 = {},
    _dewExec$4 = false;

var _global$2 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$4() {
  if (_dewExec$4) return exports$5;
  _dewExec$4 = true;
  var Buffer = buffer.Buffer;
  var process$1 = process;

  var capability = dew$5();

  var inherits = dew$7();

  var stream = dew$6();

  var rStates = exports$5.readyStates = {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4
  };

  var IncomingMessage = exports$5.IncomingMessage = function (xhr, response, mode, resetTimers) {
    var self = this || _global$2;
    stream.Readable.call(self);
    self._mode = mode;
    self.headers = {};
    self.rawHeaders = [];
    self.trailers = {};
    self.rawTrailers = []; // Fake the 'close' event, but only once 'end' fires

    self.on("end", function () {
      // The nextTick is necessary to prevent the 'request' module from causing an infinite loop
      process$1.nextTick(function () {
        self.emit("close");
      });
    });

    if (mode === "fetch") {
      self._fetchResponse = response;
      self.url = response.url;
      self.statusCode = response.status;
      self.statusMessage = response.statusText;
      response.headers.forEach(function (header, key) {
        self.headers[key.toLowerCase()] = header;
        self.rawHeaders.push(key, header);
      });

      if (capability.writableStream) {
        var writable = new WritableStream({
          write: function (chunk) {
            resetTimers(false);
            return new Promise(function (resolve, reject) {
              if (self._destroyed) {
                reject();
              } else if (self.push(Buffer.from(chunk))) {
                resolve();
              } else {
                self._resumeFetch = resolve;
              }
            });
          },
          close: function () {
            resetTimers(true);
            if (!self._destroyed) self.push(null);
          },
          abort: function (err) {
            resetTimers(true);
            if (!self._destroyed) self.emit("error", err);
          }
        });

        try {
          response.body.pipeTo(writable).catch(function (err) {
            resetTimers(true);
            if (!self._destroyed) self.emit("error", err);
          });
          return;
        } catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this

      } // fallback for when writableStream or pipeTo aren't available


      var reader = response.body.getReader();

      function read() {
        reader.read().then(function (result) {
          if (self._destroyed) return;
          resetTimers(result.done);

          if (result.done) {
            self.push(null);
            return;
          }

          self.push(Buffer.from(result.value));
          read();
        }).catch(function (err) {
          resetTimers(true);
          if (!self._destroyed) self.emit("error", err);
        });
      }

      read();
    } else {
      self._xhr = xhr;
      self._pos = 0;
      self.url = xhr.responseURL;
      self.statusCode = xhr.status;
      self.statusMessage = xhr.statusText;
      var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
      headers.forEach(function (header) {
        var matches = header.match(/^([^:]+):\s*(.*)/);

        if (matches) {
          var key = matches[1].toLowerCase();

          if (key === "set-cookie") {
            if (self.headers[key] === undefined) {
              self.headers[key] = [];
            }

            self.headers[key].push(matches[2]);
          } else if (self.headers[key] !== undefined) {
            self.headers[key] += ", " + matches[2];
          } else {
            self.headers[key] = matches[2];
          }

          self.rawHeaders.push(matches[1], matches[2]);
        }
      });
      self._charset = "x-user-defined";

      if (!capability.overrideMimeType) {
        var mimeType = self.rawHeaders["mime-type"];

        if (mimeType) {
          var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);

          if (charsetMatch) {
            self._charset = charsetMatch[1].toLowerCase();
          }
        }

        if (!self._charset) self._charset = "utf-8"; // best guess
      }
    }
  };

  inherits(IncomingMessage, stream.Readable);

  IncomingMessage.prototype._read = function () {
    var self = this || _global$2;
    var resolve = self._resumeFetch;

    if (resolve) {
      self._resumeFetch = null;
      resolve();
    }
  };

  IncomingMessage.prototype._onXHRProgress = function (resetTimers) {
    var self = this || _global$2;
    var xhr = self._xhr;
    var response = null;

    switch (self._mode) {
      case "text":
        response = xhr.responseText;

        if (response.length > self._pos) {
          var newData = response.substr(self._pos);

          if (self._charset === "x-user-defined") {
            var buffer = Buffer.alloc(newData.length);

            for (var i = 0; i < newData.length; i++) buffer[i] = newData.charCodeAt(i) & 255;

            self.push(buffer);
          } else {
            self.push(newData, self._charset);
          }

          self._pos = response.length;
        }

        break;

      case "arraybuffer":
        if (xhr.readyState !== rStates.DONE || !xhr.response) break;
        response = xhr.response;
        self.push(Buffer.from(new Uint8Array(response)));
        break;

      case "moz-chunked-arraybuffer":
        // take whole
        response = xhr.response;
        if (xhr.readyState !== rStates.LOADING || !response) break;
        self.push(Buffer.from(new Uint8Array(response)));
        break;

      case "ms-stream":
        response = xhr.response;
        if (xhr.readyState !== rStates.LOADING) break;
        var reader = new _global$2.MSStreamReader();

        reader.onprogress = function () {
          if (reader.result.byteLength > self._pos) {
            self.push(Buffer.from(new Uint8Array(reader.result.slice(self._pos))));
            self._pos = reader.result.byteLength;
          }
        };

        reader.onload = function () {
          resetTimers(true);
          self.push(null);
        }; // reader.onerror = ??? // TODO: this


        reader.readAsArrayBuffer(response);
        break;
    } // The ms-stream case handles end separately in reader.onload()


    if (self._xhr.readyState === rStates.DONE && self._mode !== "ms-stream") {
      resetTimers(true);
      self.push(null);
    }
  };

  return exports$5;
}

var exports$4 = {},
    _dewExec$3 = false;

var _global$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$3() {
  if (_dewExec$3) return exports$4;
  _dewExec$3 = true;
  var Buffer = buffer.Buffer;
  var process$1 = process;

  var capability = dew$5();

  var inherits = dew$7();

  var response = dew$4();

  var stream = dew$6();

  var IncomingMessage = response.IncomingMessage;
  var rStates = response.readyStates;

  function decideMode(preferBinary, useFetch) {
    if (capability.fetch && useFetch) {
      return "fetch";
    } else if (capability.mozchunkedarraybuffer) {
      return "moz-chunked-arraybuffer";
    } else if (capability.msstream) {
      return "ms-stream";
    } else if (capability.arraybuffer && preferBinary) {
      return "arraybuffer";
    } else {
      return "text";
    }
  }

  var ClientRequest = exports$4 = function (opts) {
    var self = this || _global$1;
    stream.Writable.call(self);
    self._opts = opts;
    self._body = [];
    self._headers = {};
    if (opts.auth) self.setHeader("Authorization", "Basic " + Buffer.from(opts.auth).toString("base64"));
    Object.keys(opts.headers).forEach(function (name) {
      self.setHeader(name, opts.headers[name]);
    });
    var preferBinary;
    var useFetch = true;

    if (opts.mode === "disable-fetch" || "requestTimeout" in opts && !capability.abortController) {
      // If the use of XHR should be preferred. Not typically needed.
      useFetch = false;
      preferBinary = true;
    } else if (opts.mode === "prefer-streaming") {
      // If streaming is a high priority but binary compatibility and
      // the accuracy of the 'content-type' header aren't
      preferBinary = false;
    } else if (opts.mode === "allow-wrong-content-type") {
      // If streaming is more important than preserving the 'content-type' header
      preferBinary = !capability.overrideMimeType;
    } else if (!opts.mode || opts.mode === "default" || opts.mode === "prefer-fast") {
      // Use binary if text streaming may corrupt data or the content-type header, or for speed
      preferBinary = true;
    } else {
      throw new Error("Invalid value for opts.mode");
    }

    self._mode = decideMode(preferBinary, useFetch);
    self._fetchTimer = null;
    self._socketTimeout = null;
    self._socketTimer = null;
    self.on("finish", function () {
      self._onFinish();
    });
  };

  inherits(ClientRequest, stream.Writable);

  ClientRequest.prototype.setHeader = function (name, value) {
    var self = this || _global$1;
    var lowerName = name.toLowerCase(); // This check is not necessary, but it prevents warnings from browsers about setting unsafe
    // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
    // http-browserify did it, so I will too.

    if (unsafeHeaders.indexOf(lowerName) !== -1) return;
    self._headers[lowerName] = {
      name: name,
      value: value
    };
  };

  ClientRequest.prototype.getHeader = function (name) {
    var header = (this || _global$1)._headers[name.toLowerCase()];

    if (header) return header.value;
    return null;
  };

  ClientRequest.prototype.removeHeader = function (name) {
    var self = this || _global$1;
    delete self._headers[name.toLowerCase()];
  };

  ClientRequest.prototype._onFinish = function () {
    var self = this || _global$1;
    if (self._destroyed) return;
    var opts = self._opts;

    if ("timeout" in opts && opts.timeout !== 0) {
      self.setTimeout(opts.timeout);
    }

    var headersObj = self._headers;
    var body = null;

    if (opts.method !== "GET" && opts.method !== "HEAD") {
      body = new Blob(self._body, {
        type: (headersObj["content-type"] || {}).value || ""
      });
    } // create flattened list of headers


    var headersList = [];
    Object.keys(headersObj).forEach(function (keyName) {
      var name = headersObj[keyName].name;
      var value = headersObj[keyName].value;

      if (Array.isArray(value)) {
        value.forEach(function (v) {
          headersList.push([name, v]);
        });
      } else {
        headersList.push([name, value]);
      }
    });

    if (self._mode === "fetch") {
      var signal = null;

      if (capability.abortController) {
        var controller = new AbortController();
        signal = controller.signal;
        self._fetchAbortController = controller;

        if ("requestTimeout" in opts && opts.requestTimeout !== 0) {
          self._fetchTimer = _global$1.setTimeout(function () {
            self.emit("requestTimeout");
            if (self._fetchAbortController) self._fetchAbortController.abort();
          }, opts.requestTimeout);
        }
      }

      _global$1.fetch(self._opts.url, {
        method: self._opts.method,
        headers: headersList,
        body: body || undefined,
        mode: "cors",
        credentials: opts.withCredentials ? "include" : "same-origin",
        signal: signal
      }).then(function (response) {
        self._fetchResponse = response;

        self._resetTimers(false);

        self._connect();
      }, function (reason) {
        self._resetTimers(true);

        if (!self._destroyed) self.emit("error", reason);
      });
    } else {
      var xhr = self._xhr = new _global$1.XMLHttpRequest();

      try {
        xhr.open(self._opts.method, self._opts.url, true);
      } catch (err) {
        process$1.nextTick(function () {
          self.emit("error", err);
        });
        return;
      } // Can't set responseType on really old browsers


      if ("responseType" in xhr) xhr.responseType = self._mode;
      if ("withCredentials" in xhr) xhr.withCredentials = !!opts.withCredentials;
      if (self._mode === "text" && "overrideMimeType" in xhr) xhr.overrideMimeType("text/plain; charset=x-user-defined");

      if ("requestTimeout" in opts) {
        xhr.timeout = opts.requestTimeout;

        xhr.ontimeout = function () {
          self.emit("requestTimeout");
        };
      }

      headersList.forEach(function (header) {
        xhr.setRequestHeader(header[0], header[1]);
      });
      self._response = null;

      xhr.onreadystatechange = function () {
        switch (xhr.readyState) {
          case rStates.LOADING:
          case rStates.DONE:
            self._onXHRProgress();

            break;
        }
      }; // Necessary for streaming in Firefox, since xhr.response is ONLY defined
      // in onprogress, not in onreadystatechange with xhr.readyState = 3


      if (self._mode === "moz-chunked-arraybuffer") {
        xhr.onprogress = function () {
          self._onXHRProgress();
        };
      }

      xhr.onerror = function () {
        if (self._destroyed) return;

        self._resetTimers(true);

        self.emit("error", new Error("XHR error"));
      };

      try {
        xhr.send(body);
      } catch (err) {
        process$1.nextTick(function () {
          self.emit("error", err);
        });
        return;
      }
    }
  };
  /**
   * Checks if xhr.status is readable and non-zero, indicating no error.
   * Even though the spec says it should be available in readyState 3,
   * accessing it throws an exception in IE8
   */


  function statusValid(xhr) {
    try {
      var status = xhr.status;
      return status !== null && status !== 0;
    } catch (e) {
      return false;
    }
  }

  ClientRequest.prototype._onXHRProgress = function () {
    var self = this || _global$1;

    self._resetTimers(false);

    if (!statusValid(self._xhr) || self._destroyed) return;
    if (!self._response) self._connect();

    self._response._onXHRProgress(self._resetTimers.bind(self));
  };

  ClientRequest.prototype._connect = function () {
    var self = this || _global$1;
    if (self._destroyed) return;
    self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._resetTimers.bind(self));

    self._response.on("error", function (err) {
      self.emit("error", err);
    });

    self.emit("response", self._response);
  };

  ClientRequest.prototype._write = function (chunk, encoding, cb) {
    var self = this || _global$1;

    self._body.push(chunk);

    cb();
  };

  ClientRequest.prototype._resetTimers = function (done) {
    var self = this || _global$1;

    _global$1.clearTimeout(self._socketTimer);

    self._socketTimer = null;

    if (done) {
      _global$1.clearTimeout(self._fetchTimer);

      self._fetchTimer = null;
    } else if (self._socketTimeout) {
      self._socketTimer = _global$1.setTimeout(function () {
        self.emit("timeout");
      }, self._socketTimeout);
    }
  };

  ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function (err) {
    var self = this || _global$1;
    self._destroyed = true;

    self._resetTimers(true);

    if (self._response) self._response._destroyed = true;
    if (self._xhr) self._xhr.abort();else if (self._fetchAbortController) self._fetchAbortController.abort();
    if (err) self.emit("error", err);
  };

  ClientRequest.prototype.end = function (data, encoding, cb) {
    var self = this || _global$1;

    if (typeof data === "function") {
      cb = data;
      data = undefined;
    }

    stream.Writable.prototype.end.call(self, data, encoding, cb);
  };

  ClientRequest.prototype.setTimeout = function (timeout, cb) {
    var self = this || _global$1;
    if (cb) self.once("timeout", cb);
    self._socketTimeout = timeout;

    self._resetTimers(false);
  };

  ClientRequest.prototype.flushHeaders = function () {};

  ClientRequest.prototype.setNoDelay = function () {};

  ClientRequest.prototype.setSocketKeepAlive = function () {}; // Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method


  var unsafeHeaders = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "via"];
  return exports$4;
}

var exports$3 = {},
    _dewExec$2 = false;
function dew$2() {
  if (_dewExec$2) return exports$3;
  _dewExec$2 = true;
  exports$3 = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }

  return exports$3;
}

var exports$2 = {},
    _dewExec$1 = false;
function dew$1() {
  if (_dewExec$1) return exports$2;
  _dewExec$1 = true;
  exports$2 = {
    "100": "Continue",
    "101": "Switching Protocols",
    "102": "Processing",
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "203": "Non-Authoritative Information",
    "204": "No Content",
    "205": "Reset Content",
    "206": "Partial Content",
    "207": "Multi-Status",
    "208": "Already Reported",
    "226": "IM Used",
    "300": "Multiple Choices",
    "301": "Moved Permanently",
    "302": "Found",
    "303": "See Other",
    "304": "Not Modified",
    "305": "Use Proxy",
    "307": "Temporary Redirect",
    "308": "Permanent Redirect",
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "407": "Proxy Authentication Required",
    "408": "Request Timeout",
    "409": "Conflict",
    "410": "Gone",
    "411": "Length Required",
    "412": "Precondition Failed",
    "413": "Payload Too Large",
    "414": "URI Too Long",
    "415": "Unsupported Media Type",
    "416": "Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot",
    "421": "Misdirected Request",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "424": "Failed Dependency",
    "425": "Unordered Collection",
    "426": "Upgrade Required",
    "428": "Precondition Required",
    "429": "Too Many Requests",
    "431": "Request Header Fields Too Large",
    "451": "Unavailable For Legal Reasons",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported",
    "506": "Variant Also Negotiates",
    "507": "Insufficient Storage",
    "508": "Loop Detected",
    "509": "Bandwidth Limit Exceeded",
    "510": "Not Extended",
    "511": "Network Authentication Required"
  };
  return exports$2;
}

var exports$1 = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  var ClientRequest = dew$3();

  var response = dew$4();

  var extend = dew$2();

  var statusCodes = dew$1();

  var url = h;
  var http = exports$1;

  http.request = function (opts, cb) {
    if (typeof opts === "string") opts = url.parse(opts);else opts = extend(opts); // Normally, the page is loaded from http or https, so not specifying a protocol
    // will result in a (valid) protocol-relative url. However, this won't work if
    // the protocol is something else, like 'file:'

    var defaultProtocol = _global.location.protocol.search(/^https?:$/) === -1 ? "http:" : "";
    var protocol = opts.protocol || defaultProtocol;
    var host = opts.hostname || opts.host;
    var port = opts.port;
    var path = opts.path || "/"; // Necessary for IPv6 addresses

    if (host && host.indexOf(":") !== -1) host = "[" + host + "]"; // This may be a relative url. The browser should always be able to interpret it correctly.

    opts.url = (host ? protocol + "//" + host : "") + (port ? ":" + port : "") + path;
    opts.method = (opts.method || "GET").toUpperCase();
    opts.headers = opts.headers || {}; // Also valid opts.auth, opts.mode

    var req = new ClientRequest(opts);
    if (cb) req.on("response", cb);
    return req;
  };

  http.get = function get(opts, cb) {
    var req = http.request(opts, cb);
    req.end();
    return req;
  };

  http.ClientRequest = ClientRequest;
  http.IncomingMessage = response.IncomingMessage;

  http.Agent = function () {};

  http.Agent.defaultMaxSockets = 4;
  http.globalAgent = new http.Agent();
  http.STATUS_CODES = statusCodes;
  http.METHODS = ["CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REPORT", "SEARCH", "SUBSCRIBE", "TRACE", "UNLOCK", "UNSUBSCRIBE"];
  return exports$1;
}

const exports = dew();

var Agent = exports.Agent;
var ClientRequest = exports.ClientRequest;
var IncomingMessage = exports.IncomingMessage;
var METHODS = exports.METHODS;
var STATUS_CODES = exports.STATUS_CODES;
var get = exports.get;
var globalAgent = exports.globalAgent;
var request = exports.request;

export { Agent, ClientRequest, IncomingMessage, METHODS, STATUS_CODES, exports as default, get, globalAgent, request };
