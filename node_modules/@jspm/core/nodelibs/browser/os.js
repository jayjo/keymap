import { uptime } from './process.js';
export { uptime } from './process.js';

var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  exports$1.endianness = function () {
    return "LE";
  };

  exports$1.hostname = function () {
    if (typeof location !== "undefined") {
      return location.hostname;
    } else return "";
  };

  exports$1.loadavg = function () {
    return [];
  };

  exports$1.uptime = function () {
    return 0;
  };

  exports$1.freemem = function () {
    return Number.MAX_VALUE;
  };

  exports$1.totalmem = function () {
    return Number.MAX_VALUE;
  };

  exports$1.cpus = function () {
    return [];
  };

  exports$1.type = function () {
    return "Browser";
  };

  exports$1.release = function () {
    if (typeof navigator !== "undefined") {
      return navigator.appVersion;
    }

    return "";
  };

  exports$1.networkInterfaces = exports$1.getNetworkInterfaces = function () {
    return {};
  };

  exports$1.arch = function () {
    return "javascript";
  };

  exports$1.platform = function () {
    return "browser";
  };

  exports$1.tmpdir = exports$1.tmpDir = function () {
    return "/tmp";
  };

  exports$1.EOL = "\n";

  exports$1.homedir = function () {
    return "/";
  };

  return exports$1;
}

const exports = dew();
exports['endianness']; exports['hostname']; exports['loadavg']; exports['uptime']; exports['freemem']; exports['totalmem']; exports['cpus']; exports['type']; exports['release']; exports['networkInterfaces']; exports['getNetworkInterfaces']; exports['arch']; exports['platform']; exports['tmpdir']; exports['tmpDir']; exports['EOL']; exports['homedir'];

var _endianness = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1 ? 'LE' : 'BE';
exports.endianness = function() { return _endianness; };
exports.homedir = function() { return '/home'; };
exports.version = function() { return ''; };
exports.arch = function() { return 'x64'; };
exports.totalmem = function() {
  return navigator.deviceMemory !== undefined ? navigator.deviceMemory * (1 << 30) : 2 * (1 << 30);
};
exports.cpus = function () {
  return Array(navigator.hardwareConcurrency || 0).fill({ model: '', times: {} });
};
exports.uptime = uptime;
exports.constants = {};
var version = exports.version;
var constants = exports.constants;
var EOL = exports.EOL;
var arch = exports.arch;
var cpus = exports.cpus;
var endianness = exports.endianness;
var freemem = exports.freemem;
var getNetworkInterfaces = exports.getNetworkInterfaces;
var homedir = exports.homedir;
var hostname = exports.hostname;
var loadavg = exports.loadavg;
var networkInterfaces = exports.networkInterfaces;
var platform = exports.platform;
var release = exports.release;
var tmpDir = exports.tmpDir;
var tmpdir = exports.tmpdir;
var totalmem = exports.totalmem;
var type = exports.type;

export { EOL, arch, constants, cpus, exports as default, endianness, freemem, getNetworkInterfaces, homedir, hostname, loadavg, networkInterfaces, platform, release, tmpDir, tmpdir, totalmem, type, version };
