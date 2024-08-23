import exports$2 from './http.js';
import h from './url.js';
import './chunk-44e51b61.js';
import './chunk-4bd36a8f.js';
import './chunk-ce0fbc82.js';
import './chunk-b4205b57.js';
import './chunk-5decc758.js';
import './chunk-2eac56ff.js';
import './chunk-4ccc3a29.js';
import './chunk-c3d025d9.js';
import './chunk-924bb2e1.js';
import './chunk-b04e620d.js';
import './chunk-23dbec7b.js';

var exports$1 = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  var http = exports$2;
  var url = h;
  var https = exports$1;

  for (var key in http) {
    if (http.hasOwnProperty(key)) https[key] = http[key];
  }

  https.request = function (params, cb) {
    params = validateParams(params);
    return http.request.call(this || _global, params, cb);
  };

  https.get = function (params, cb) {
    params = validateParams(params);
    return http.get.call(this || _global, params, cb);
  };

  function validateParams(params) {
    if (typeof params === "string") {
      params = url.parse(params);
    }

    if (!params.protocol) {
      params.protocol = "https:";
    }

    if (params.protocol !== "https:") {
      throw new Error("Protocol \"" + params.protocol + "\" not supported. Expected \"https:\"");
    }

    return params;
  }

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
