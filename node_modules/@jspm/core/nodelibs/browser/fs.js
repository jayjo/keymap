import { b as buffer } from './chunk-44e51b61.js';
import et from './assert.js';
import './util.js';
import { X } from './chunk-b4205b57.js';
import './path.js';
import { p as process } from './chunk-2eac56ff.js';
import './events.js';
import { y } from './chunk-4bd36a8f.js';
import './stream.js';
import h, { fileURLToPath } from './url.js';
import { e as exports$i } from './chunk-23dbec7b.js';
import { e as exports$j } from './chunk-6c718bbe.js';
import { Buffer } from './buffer.js';
import './chunk-ce0fbc82.js';
import './chunk-5decc758.js';
import './chunk-4ccc3a29.js';
import './chunk-924bb2e1.js';
import './chunk-b04e620d.js';

var exports$h = {},
    _dewExec$f = false;
function dew$f() {
  if (_dewExec$f) return exports$h;
  _dewExec$f = true;
  Object.defineProperty(exports$h, "__esModule", {
    value: true
  });
  exports$h.constants = void 0;
  exports$h.constants = {
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 64,
    O_EXCL: 128,
    O_NOCTTY: 256,
    O_TRUNC: 512,
    O_APPEND: 1024,
    O_DIRECTORY: 65536,
    O_NOATIME: 262144,
    O_NOFOLLOW: 131072,
    O_SYNC: 1052672,
    O_DIRECT: 16384,
    O_NONBLOCK: 2048,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    UV_FS_COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_EXCL: 1,
    COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE_FORCE: 4
  };
  return exports$h;
}

var exports$g = {},
    _dewExec$e = false;
function dew$e() {
  if (_dewExec$e) return exports$g;
  _dewExec$e = true;
  if (typeof BigInt === "function") exports$g.default = BigInt;else exports$g.default = function BigIntNotSupported() {
    throw new Error("BigInt is not supported in this environment.");
  };
  return exports$g;
}

var exports$f = {},
    _dewExec$d = false;
function dew$d() {
  if (_dewExec$d) return exports$f;
  _dewExec$d = true;
  Object.defineProperty(exports$f, "__esModule", {
    value: true
  });
  exports$f.Stats = void 0;

  var constants_1 = dew$f();

  var getBigInt_1 = dew$e();

  var S_IFMT = constants_1.constants.S_IFMT,
      S_IFDIR = constants_1.constants.S_IFDIR,
      S_IFREG = constants_1.constants.S_IFREG,
      S_IFBLK = constants_1.constants.S_IFBLK,
      S_IFCHR = constants_1.constants.S_IFCHR,
      S_IFLNK = constants_1.constants.S_IFLNK,
      S_IFIFO = constants_1.constants.S_IFIFO,
      S_IFSOCK = constants_1.constants.S_IFSOCK;
  /**
   * Statistics about a file/directory, like `fs.Stats`.
   */

  var Stats = function () {
    function Stats() {}

    Stats.build = function (node, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }

      var stats = new Stats();
      var uid = node.uid,
          gid = node.gid,
          atime = node.atime,
          mtime = node.mtime,
          ctime = node.ctime;
      var getStatNumber = !bigint ? function (number) {
        return number;
      } : getBigInt_1.default; // Copy all values on Stats from Node, so that if Node values
      // change, values on Stats would still be the old ones,
      // just like in Node fs.

      stats.uid = getStatNumber(uid);
      stats.gid = getStatNumber(gid);
      stats.rdev = getStatNumber(0);
      stats.blksize = getStatNumber(4096);
      stats.ino = getStatNumber(node.ino);
      stats.size = getStatNumber(node.getSize());
      stats.blocks = getStatNumber(1);
      stats.atime = atime;
      stats.mtime = mtime;
      stats.ctime = ctime;
      stats.birthtime = ctime;
      stats.atimeMs = getStatNumber(atime.getTime());
      stats.mtimeMs = getStatNumber(mtime.getTime());
      var ctimeMs = getStatNumber(ctime.getTime());
      stats.ctimeMs = ctimeMs;
      stats.birthtimeMs = ctimeMs;
      stats.dev = getStatNumber(0);
      stats.mode = getStatNumber(node.mode);
      stats.nlink = getStatNumber(node.nlink);
      return stats;
    };

    Stats.prototype._checkModeProperty = function (property) {
      return (Number(this.mode) & S_IFMT) === property;
    };

    Stats.prototype.isDirectory = function () {
      return this._checkModeProperty(S_IFDIR);
    };

    Stats.prototype.isFile = function () {
      return this._checkModeProperty(S_IFREG);
    };

    Stats.prototype.isBlockDevice = function () {
      return this._checkModeProperty(S_IFBLK);
    };

    Stats.prototype.isCharacterDevice = function () {
      return this._checkModeProperty(S_IFCHR);
    };

    Stats.prototype.isSymbolicLink = function () {
      return this._checkModeProperty(S_IFLNK);
    };

    Stats.prototype.isFIFO = function () {
      return this._checkModeProperty(S_IFIFO);
    };

    Stats.prototype.isSocket = function () {
      return this._checkModeProperty(S_IFSOCK);
    };

    return Stats;
  }();

  exports$f.Stats = Stats;
  exports$f.default = Stats;
  return exports$f;
}

var exports$e = {},
    _dewExec$c = false;
function dew$c() {
  if (_dewExec$c) return exports$e;
  _dewExec$c = true;

  var __spreadArray = exports$e && exports$e.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

  Object.defineProperty(exports$e, "__esModule", {
    value: true
  });
  exports$e.bufferFrom = exports$e.bufferAllocUnsafe = exports$e.Buffer = void 0;
  var buffer_1 = buffer;
  Object.defineProperty(exports$e, "Buffer", {
    enumerable: true,
    get: function () {
      return buffer_1.Buffer;
    }
  });

  function bufferV0P12Ponyfill(arg0) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    return new (buffer_1.Buffer.bind.apply(buffer_1.Buffer, __spreadArray([void 0, arg0], args, false)))();
  }

  var bufferAllocUnsafe = buffer_1.Buffer.allocUnsafe || bufferV0P12Ponyfill;
  exports$e.bufferAllocUnsafe = bufferAllocUnsafe;
  var bufferFrom = buffer_1.Buffer.from || bufferV0P12Ponyfill;
  exports$e.bufferFrom = bufferFrom;
  return exports$e;
}

var exports$d = {},
    _dewExec$b = false;

var _global$3 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$b() {
  if (_dewExec$b) return exports$d;
  _dewExec$b = true;

  // The whole point behind this internal module is to allow Node.js to no
  // longer be forced to treat every error message change as a semver-major
  // change. The NodeError classes here all expose a `code` property whose
  // value statically and permanently identifies the error. While the error
  // message may change, the code should not.
  var __extends = exports$d && exports$d.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  Object.defineProperty(exports$d, "__esModule", {
    value: true
  });
  exports$d.E = exports$d.AssertionError = exports$d.message = exports$d.RangeError = exports$d.TypeError = exports$d.Error = void 0;
  var assert = et;
  var util = X;
  var kCode = typeof Symbol === "undefined" ? "_kCode" : Symbol("code");
  var messages = {}; // new Map();

  function makeNodeError(Base) {
    return function (_super) {
      __extends(NodeError, _super);

      function NodeError(key) {
        var args = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }

        var _this = _super.call(this, message(key, args)) || this;

        _this.code = key;
        _this[kCode] = key;
        _this.name = _super.prototype.name + " [" + _this[kCode] + "]";
        return _this;
      }

      return NodeError;
    }(Base);
  }

  var g = typeof globalThis !== "undefined" ? globalThis : _global$3;

  var AssertionError = function (_super) {
    __extends(AssertionError, _super);

    function AssertionError(options) {
      var _this = this;

      if (typeof options !== "object" || options === null) {
        throw new exports$d.TypeError("ERR_INVALID_ARG_TYPE", "options", "object");
      }

      if (options.message) {
        _this = _super.call(this, options.message) || this;
      } else {
        _this = _super.call(this, util.inspect(options.actual).slice(0, 128) + " " + (options.operator + " " + util.inspect(options.expected).slice(0, 128))) || this;
      }

      _this.generatedMessage = !options.message;
      _this.name = "AssertionError [ERR_ASSERTION]";
      _this.code = "ERR_ASSERTION";
      _this.actual = options.actual;
      _this.expected = options.expected;
      _this.operator = options.operator;
      exports$d.Error.captureStackTrace(_this, options.stackStartFunction);
      return _this;
    }

    return AssertionError;
  }(g.Error);

  exports$d.AssertionError = AssertionError;

  function message(key, args) {
    assert.strictEqual(typeof key, "string"); // const msg = messages.get(key);

    var msg = messages[key];
    assert(msg, "An invalid error message key was used: " + key + ".");
    var fmt;

    if (typeof msg === "function") {
      fmt = msg;
    } else {
      fmt = util.format;
      if (args === undefined || args.length === 0) return msg;
      args.unshift(msg);
    }

    return String(fmt.apply(null, args));
  }

  exports$d.message = message; // Utility function for registering the error codes. Only used here. Exported
  // *only* to allow for testing.

  function E(sym, val) {
    messages[sym] = typeof val === "function" ? val : String(val);
  }

  exports$d.E = E;
  exports$d.Error = makeNodeError(g.Error);
  exports$d.TypeError = makeNodeError(g.TypeError);
  exports$d.RangeError = makeNodeError(g.RangeError); // To declare an error message, use the E(sym, val) function above. The sym
  // must be an upper case string. The val can be either a function or a string.
  // The return value of the function must be a string.
  // Examples:
  // E('EXAMPLE_KEY1', 'This is the error value');
  // E('EXAMPLE_KEY2', (a, b) => return `${a} ${b}`);
  //
  // Once an error code has been assigned, the code itself MUST NOT change and
  // any given error code must never be reused to identify a different error.
  //
  // Any error code added here should also be added to the documentation
  //
  // Note: Please try to keep these in alphabetical order

  E("ERR_ARG_NOT_ITERABLE", "%s must be iterable");
  E("ERR_ASSERTION", "%s");
  E("ERR_BUFFER_OUT_OF_BOUNDS", bufferOutOfBounds);
  E("ERR_CHILD_CLOSED_BEFORE_REPLY", "Child closed before reply received");
  E("ERR_CONSOLE_WRITABLE_STREAM", "Console expects a writable stream instance for %s");
  E("ERR_CPU_USAGE", "Unable to obtain cpu usage %s");
  E("ERR_DNS_SET_SERVERS_FAILED", function (err, servers) {
    return "c-ares failed to set servers: \"" + err + "\" [" + servers + "]";
  });
  E("ERR_FALSY_VALUE_REJECTION", "Promise was rejected with falsy value");
  E("ERR_ENCODING_NOT_SUPPORTED", function (enc) {
    return "The \"" + enc + "\" encoding is not supported";
  });
  E("ERR_ENCODING_INVALID_ENCODED_DATA", function (enc) {
    return "The encoded data was not valid for encoding " + enc;
  });
  E("ERR_HTTP_HEADERS_SENT", "Cannot render headers after they are sent to the client");
  E("ERR_HTTP_INVALID_STATUS_CODE", "Invalid status code: %s");
  E("ERR_HTTP_TRAILER_INVALID", "Trailers are invalid with this transfer encoding");
  E("ERR_INDEX_OUT_OF_RANGE", "Index out of range");
  E("ERR_INVALID_ARG_TYPE", invalidArgType);
  E("ERR_INVALID_ARRAY_LENGTH", function (name, len, actual) {
    assert.strictEqual(typeof actual, "number");
    return "The array \"" + name + "\" (length " + actual + ") must be of length " + len + ".";
  });
  E("ERR_INVALID_BUFFER_SIZE", "Buffer size must be a multiple of %s");
  E("ERR_INVALID_CALLBACK", "Callback must be a function");
  E("ERR_INVALID_CHAR", "Invalid character in %s");
  E("ERR_INVALID_CURSOR_POS", "Cannot set cursor row without setting its column");
  E("ERR_INVALID_FD", "\"fd\" must be a positive integer: %s");
  E("ERR_INVALID_FILE_URL_HOST", "File URL host must be \"localhost\" or empty on %s");
  E("ERR_INVALID_FILE_URL_PATH", "File URL path %s");
  E("ERR_INVALID_HANDLE_TYPE", "This handle type cannot be sent");
  E("ERR_INVALID_IP_ADDRESS", "Invalid IP address: %s");
  E("ERR_INVALID_OPT_VALUE", function (name, value) {
    return "The value \"" + String(value) + "\" is invalid for option \"" + name + "\"";
  });
  E("ERR_INVALID_OPT_VALUE_ENCODING", function (value) {
    return "The value \"" + String(value) + "\" is invalid for option \"encoding\"";
  });
  E("ERR_INVALID_REPL_EVAL_CONFIG", "Cannot specify both \"breakEvalOnSigint\" and \"eval\" for REPL");
  E("ERR_INVALID_SYNC_FORK_INPUT", "Asynchronous forks do not support Buffer, Uint8Array or string input: %s");
  E("ERR_INVALID_THIS", "Value of \"this\" must be of type %s");
  E("ERR_INVALID_TUPLE", "%s must be an iterable %s tuple");
  E("ERR_INVALID_URL", "Invalid URL: %s");
  E("ERR_INVALID_URL_SCHEME", function (expected) {
    return "The URL must be " + oneOf(expected, "scheme");
  });
  E("ERR_IPC_CHANNEL_CLOSED", "Channel closed");
  E("ERR_IPC_DISCONNECTED", "IPC channel is already disconnected");
  E("ERR_IPC_ONE_PIPE", "Child process can have only one IPC pipe");
  E("ERR_IPC_SYNC_FORK", "IPC cannot be used with synchronous forks");
  E("ERR_MISSING_ARGS", missingArgs);
  E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  E("ERR_NAPI_CONS_FUNCTION", "Constructor must be a function");
  E("ERR_NAPI_CONS_PROTOTYPE_OBJECT", "Constructor.prototype must be an object");
  E("ERR_NO_CRYPTO", "Node.js is not compiled with OpenSSL crypto support");
  E("ERR_NO_LONGER_SUPPORTED", "%s is no longer supported");
  E("ERR_PARSE_HISTORY_DATA", "Could not parse history data in %s");
  E("ERR_SOCKET_ALREADY_BOUND", "Socket is already bound");
  E("ERR_SOCKET_BAD_PORT", "Port should be > 0 and < 65536");
  E("ERR_SOCKET_BAD_TYPE", "Bad socket type specified. Valid types are: udp4, udp6");
  E("ERR_SOCKET_CANNOT_SEND", "Unable to send data");
  E("ERR_SOCKET_CLOSED", "Socket is closed");
  E("ERR_SOCKET_DGRAM_NOT_RUNNING", "Not running");
  E("ERR_STDERR_CLOSE", "process.stderr cannot be closed");
  E("ERR_STDOUT_CLOSE", "process.stdout cannot be closed");
  E("ERR_STREAM_WRAP", "Stream has StringDecoder set or is in objectMode");
  E("ERR_TLS_CERT_ALTNAME_INVALID", "Hostname/IP does not match certificate's altnames: %s");
  E("ERR_TLS_DH_PARAM_SIZE", function (size) {
    return "DH parameter size " + size + " is less than 2048";
  });
  E("ERR_TLS_HANDSHAKE_TIMEOUT", "TLS handshake timeout");
  E("ERR_TLS_RENEGOTIATION_FAILED", "Failed to renegotiate");
  E("ERR_TLS_REQUIRED_SERVER_NAME", "\"servername\" is required parameter for Server.addContext");
  E("ERR_TLS_SESSION_ATTACK", "TSL session renegotiation attack detected");
  E("ERR_TRANSFORM_ALREADY_TRANSFORMING", "Calling transform done when still transforming");
  E("ERR_TRANSFORM_WITH_LENGTH_0", "Calling transform done when writableState.length != 0");
  E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s");
  E("ERR_UNKNOWN_SIGNAL", "Unknown signal: %s");
  E("ERR_UNKNOWN_STDIN_TYPE", "Unknown stdin file type");
  E("ERR_UNKNOWN_STREAM_TYPE", "Unknown stream file type");
  E("ERR_V8BREAKITERATOR", "Full ICU data not installed. " + "See https://github.com/nodejs/node/wiki/Intl");

  function invalidArgType(name, expected, actual) {
    assert(name, "name is required"); // determiner: 'must be' or 'must not be'

    var determiner;

    if (expected.includes("not ")) {
      determiner = "must not be";
      expected = expected.split("not ")[1];
    } else {
      determiner = "must be";
    }

    var msg;

    if (Array.isArray(name)) {
      var names = name.map(function (val) {
        return "\"" + val + "\"";
      }).join(", ");
      msg = "The " + names + " arguments " + determiner + " " + oneOf(expected, "type");
    } else if (name.includes(" argument")) {
      // for the case like 'first argument'
      msg = "The " + name + " " + determiner + " " + oneOf(expected, "type");
    } else {
      var type = name.includes(".") ? "property" : "argument";
      msg = "The \"" + name + "\" " + type + " " + determiner + " " + oneOf(expected, "type");
    } // if actual value received, output it


    if (arguments.length >= 3) {
      msg += ". Received type " + (actual !== null ? typeof actual : "null");
    }

    return msg;
  }

  function missingArgs() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    assert(args.length > 0, "At least one arg needs to be specified");
    var msg = "The ";
    var len = args.length;
    args = args.map(function (a) {
      return "\"" + a + "\"";
    });

    switch (len) {
      case 1:
        msg += args[0] + " argument";
        break;

      case 2:
        msg += args[0] + " and " + args[1] + " arguments";
        break;

      default:
        msg += args.slice(0, len - 1).join(", ");
        msg += ", and " + args[len - 1] + " arguments";
        break;
    }

    return msg + " must be specified";
  }

  function oneOf(expected, thing) {
    assert(expected, "expected is required");
    assert(typeof thing === "string", "thing is required");

    if (Array.isArray(expected)) {
      var len = expected.length;
      assert(len > 0, "At least one expected value needs to be specified"); // tslint:disable-next-line

      expected = expected.map(function (i) {
        return String(i);
      });

      if (len > 2) {
        return "one of " + thing + " " + expected.slice(0, len - 1).join(", ") + ", or " + expected[len - 1];
      } else if (len === 2) {
        return "one of " + thing + " " + expected[0] + " or " + expected[1];
      } else {
        return "of " + thing + " " + expected[0];
      }
    } else {
      return "of " + thing + " " + String(expected);
    }
  }

  function bufferOutOfBounds(name, isWriting) {
    if (isWriting) {
      return "Attempt to write outside buffer bounds";
    } else {
      return "\"" + name + "\" is outside of buffer bounds";
    }
  }

  return exports$d;
}

var exports$c = {},
    _dewExec$a = false;
function dew$a() {
  if (_dewExec$a) return exports$c;
  _dewExec$a = true;
  Object.defineProperty(exports$c, "__esModule", {
    value: true
  });
  exports$c.strToEncoding = exports$c.assertEncoding = exports$c.ENCODING_UTF8 = void 0;

  var buffer_1 = dew$c();

  var errors = dew$b();

  exports$c.ENCODING_UTF8 = "utf8";

  function assertEncoding(encoding) {
    if (encoding && !buffer_1.Buffer.isEncoding(encoding)) throw new errors.TypeError("ERR_INVALID_OPT_VALUE_ENCODING", encoding);
  }

  exports$c.assertEncoding = assertEncoding;

  function strToEncoding(str, encoding) {
    if (!encoding || encoding === exports$c.ENCODING_UTF8) return str; // UTF-8

    if (encoding === "buffer") return new buffer_1.Buffer(str); // `buffer` encoding

    return new buffer_1.Buffer(str).toString(encoding); // Custom encoding
  }

  exports$c.strToEncoding = strToEncoding;
  return exports$c;
}

var exports$b = {},
    _dewExec$9 = false;
function dew$9() {
  if (_dewExec$9) return exports$b;
  _dewExec$9 = true;
  Object.defineProperty(exports$b, "__esModule", {
    value: true
  });
  exports$b.Dirent = void 0;

  var constants_1 = dew$f();

  var encoding_1 = dew$a();

  var S_IFMT = constants_1.constants.S_IFMT,
      S_IFDIR = constants_1.constants.S_IFDIR,
      S_IFREG = constants_1.constants.S_IFREG,
      S_IFBLK = constants_1.constants.S_IFBLK,
      S_IFCHR = constants_1.constants.S_IFCHR,
      S_IFLNK = constants_1.constants.S_IFLNK,
      S_IFIFO = constants_1.constants.S_IFIFO,
      S_IFSOCK = constants_1.constants.S_IFSOCK;
  /**
   * A directory entry, like `fs.Dirent`.
   */

  var Dirent = function () {
    function Dirent() {
      this.name = "";
      this.mode = 0;
    }

    Dirent.build = function (link, encoding) {
      var dirent = new Dirent();
      var mode = link.getNode().mode;
      dirent.name = (0, encoding_1.strToEncoding)(link.getName(), encoding);
      dirent.mode = mode;
      return dirent;
    };

    Dirent.prototype._checkModeProperty = function (property) {
      return (this.mode & S_IFMT) === property;
    };

    Dirent.prototype.isDirectory = function () {
      return this._checkModeProperty(S_IFDIR);
    };

    Dirent.prototype.isFile = function () {
      return this._checkModeProperty(S_IFREG);
    };

    Dirent.prototype.isBlockDevice = function () {
      return this._checkModeProperty(S_IFBLK);
    };

    Dirent.prototype.isCharacterDevice = function () {
      return this._checkModeProperty(S_IFCHR);
    };

    Dirent.prototype.isSymbolicLink = function () {
      return this._checkModeProperty(S_IFLNK);
    };

    Dirent.prototype.isFIFO = function () {
      return this._checkModeProperty(S_IFIFO);
    };

    Dirent.prototype.isSocket = function () {
      return this._checkModeProperty(S_IFSOCK);
    };

    return Dirent;
  }();

  exports$b.Dirent = Dirent;
  exports$b.default = Dirent;
  return exports$b;
}

var exports$a = {},
    _dewExec$8 = false;

var _global$2 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$8() {
  if (_dewExec$8) return exports$a;
  _dewExec$8 = true;
  var process$1 = process;
  Object.defineProperty(exports$a, "__esModule", {
    value: true
  });

  var _setImmediate;

  if (typeof process$1.nextTick === "function") _setImmediate = process$1.nextTick.bind(typeof globalThis !== "undefined" ? globalThis : _global$2);else _setImmediate = setTimeout.bind(typeof globalThis !== "undefined" ? globalThis : _global$2);
  exports$a.default = _setImmediate;
  return exports$a;
}

var exports$9 = {},
    _dewExec$7 = false;
function dew$7() {
  if (_dewExec$7) return exports$9;
  _dewExec$7 = true;
  var process$1 = process;
  // Here we mock the global `process` variable in case we are not in Node's environment.
  Object.defineProperty(exports$9, "__esModule", {
    value: true
  });
  exports$9.createProcess = void 0;
  /**
   * Looks to return a `process` object, if one is available.
   *
   * The global `process` is returned if defined;
   * otherwise `require('process')` is attempted.
   *
   * If that fails, `undefined` is returned.
   *
   * @return {IProcess | undefined}
   */

  var maybeReturnProcess = function () {
    if (typeof process$1 !== "undefined") {
      return process$1;
    }

    try {
      return process;
    } catch (_a) {
      return undefined;
    }
  };

  function createProcess() {
    var p = maybeReturnProcess() || {};
    if (!p.getuid) p.getuid = function () {
      return 0;
    };
    if (!p.getgid) p.getgid = function () {
      return 0;
    };
    if (!p.cwd) p.cwd = function () {
      return "/";
    };
    if (!p.nextTick) p.nextTick = dew$8().default;
    if (!p.emitWarning) p.emitWarning = function (message, type) {
      // tslint:disable-next-line:no-console
      console.warn("" + type + (type ? ": " : "") + message);
    };
    if (!p.env) p.env = {};
    return p;
  }

  exports$9.createProcess = createProcess;
  exports$9.default = createProcess();
  return exports$9;
}

var exports$8 = {},
    _dewExec$6 = false;
function dew$6() {
  if (_dewExec$6) return exports$8;
  _dewExec$6 = true;

  var __extends = exports$8 && exports$8.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  Object.defineProperty(exports$8, "__esModule", {
    value: true
  });
  exports$8.File = exports$8.Link = exports$8.Node = exports$8.SEP = void 0;

  var process_1 = dew$7();

  var buffer_1 = dew$c();

  var constants_1 = dew$f();

  var events_1 = y;

  var Stats_1 = dew$d();

  var S_IFMT = constants_1.constants.S_IFMT,
      S_IFDIR = constants_1.constants.S_IFDIR,
      S_IFREG = constants_1.constants.S_IFREG,
      S_IFLNK = constants_1.constants.S_IFLNK,
      O_APPEND = constants_1.constants.O_APPEND;
  exports$8.SEP = "/";
  /**
   * Node in a file system (like i-node, v-node).
   */

  var Node = function (_super) {
    __extends(Node, _super);

    function Node(ino, perm) {
      if (perm === void 0) {
        perm = 438;
      }

      var _this = _super.call(this) || this; // User ID and group ID.


      _this.uid = process_1.default.getuid();
      _this.gid = process_1.default.getgid();
      _this.atime = new Date();
      _this.mtime = new Date();
      _this.ctime = new Date();
      _this.perm = 438; // Permissions `chmod`, `fchmod`

      _this.mode = S_IFREG; // S_IFDIR, S_IFREG, etc.. (file by default?)
      // Number of hard links pointing at this Node.

      _this.nlink = 1;
      _this.perm = perm;
      _this.mode |= perm;
      _this.ino = ino;
      return _this;
    }

    Node.prototype.getString = function (encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }

      return this.getBuffer().toString(encoding);
    };

    Node.prototype.setString = function (str) {
      // this.setBuffer(bufferFrom(str, 'utf8'));
      this.buf = (0, buffer_1.bufferFrom)(str, "utf8");
      this.touch();
    };

    Node.prototype.getBuffer = function () {
      if (!this.buf) this.setBuffer((0, buffer_1.bufferAllocUnsafe)(0));
      return (0, buffer_1.bufferFrom)(this.buf); // Return a copy.
    };

    Node.prototype.setBuffer = function (buf) {
      this.buf = (0, buffer_1.bufferFrom)(buf); // Creates a copy of data.

      this.touch();
    };

    Node.prototype.getSize = function () {
      return this.buf ? this.buf.length : 0;
    };

    Node.prototype.setModeProperty = function (property) {
      this.mode = this.mode & ~S_IFMT | property;
    };

    Node.prototype.setIsFile = function () {
      this.setModeProperty(S_IFREG);
    };

    Node.prototype.setIsDirectory = function () {
      this.setModeProperty(S_IFDIR);
    };

    Node.prototype.setIsSymlink = function () {
      this.setModeProperty(S_IFLNK);
    };

    Node.prototype.isFile = function () {
      return (this.mode & S_IFMT) === S_IFREG;
    };

    Node.prototype.isDirectory = function () {
      return (this.mode & S_IFMT) === S_IFDIR;
    };

    Node.prototype.isSymlink = function () {
      // return !!this.symlink;
      return (this.mode & S_IFMT) === S_IFLNK;
    };

    Node.prototype.makeSymlink = function (steps) {
      this.symlink = steps;
      this.setIsSymlink();
    };

    Node.prototype.write = function (buf, off, len, pos) {
      if (off === void 0) {
        off = 0;
      }

      if (len === void 0) {
        len = buf.length;
      }

      if (pos === void 0) {
        pos = 0;
      }

      if (!this.buf) this.buf = (0, buffer_1.bufferAllocUnsafe)(0);

      if (pos + len > this.buf.length) {
        var newBuf = (0, buffer_1.bufferAllocUnsafe)(pos + len);
        this.buf.copy(newBuf, 0, 0, this.buf.length);
        this.buf = newBuf;
      }

      buf.copy(this.buf, pos, off, off + len);
      this.touch();
      return len;
    }; // Returns the number of bytes read.


    Node.prototype.read = function (buf, off, len, pos) {
      if (off === void 0) {
        off = 0;
      }

      if (len === void 0) {
        len = buf.byteLength;
      }

      if (pos === void 0) {
        pos = 0;
      }

      if (!this.buf) this.buf = (0, buffer_1.bufferAllocUnsafe)(0);
      var actualLen = len;

      if (actualLen > buf.byteLength) {
        actualLen = buf.byteLength;
      }

      if (actualLen + pos > this.buf.length) {
        actualLen = this.buf.length - pos;
      }

      this.buf.copy(buf, off, pos, pos + actualLen);
      return actualLen;
    };

    Node.prototype.truncate = function (len) {
      if (len === void 0) {
        len = 0;
      }

      if (!len) this.buf = (0, buffer_1.bufferAllocUnsafe)(0);else {
        if (!this.buf) this.buf = (0, buffer_1.bufferAllocUnsafe)(0);

        if (len <= this.buf.length) {
          this.buf = this.buf.slice(0, len);
        } else {
          var buf = (0, buffer_1.bufferAllocUnsafe)(0);
          this.buf.copy(buf);
          buf.fill(0, len);
        }
      }
      this.touch();
    };

    Node.prototype.chmod = function (perm) {
      this.perm = perm;
      this.mode = this.mode & ~511 | perm;
      this.touch();
    };

    Node.prototype.chown = function (uid, gid) {
      this.uid = uid;
      this.gid = gid;
      this.touch();
    };

    Node.prototype.touch = function () {
      this.mtime = new Date();
      this.emit("change", this);
    };

    Node.prototype.canRead = function (uid, gid) {
      if (uid === void 0) {
        uid = process_1.default.getuid();
      }

      if (gid === void 0) {
        gid = process_1.default.getgid();
      }

      if (this.perm & 4
      /* IROTH */
      ) {
        return true;
      }

      if (gid === this.gid) {
        if (this.perm & 32
        /* IRGRP */
        ) {
          return true;
        }
      }

      if (uid === this.uid) {
        if (this.perm & 256
        /* IRUSR */
        ) {
          return true;
        }
      }

      return false;
    };

    Node.prototype.canWrite = function (uid, gid) {
      if (uid === void 0) {
        uid = process_1.default.getuid();
      }

      if (gid === void 0) {
        gid = process_1.default.getgid();
      }

      if (this.perm & 2
      /* IWOTH */
      ) {
        return true;
      }

      if (gid === this.gid) {
        if (this.perm & 16
        /* IWGRP */
        ) {
          return true;
        }
      }

      if (uid === this.uid) {
        if (this.perm & 128
        /* IWUSR */
        ) {
          return true;
        }
      }

      return false;
    };

    Node.prototype.del = function () {
      this.emit("delete", this);
    };

    Node.prototype.toJSON = function () {
      return {
        ino: this.ino,
        uid: this.uid,
        gid: this.gid,
        atime: this.atime.getTime(),
        mtime: this.mtime.getTime(),
        ctime: this.ctime.getTime(),
        perm: this.perm,
        mode: this.mode,
        nlink: this.nlink,
        symlink: this.symlink,
        data: this.getString()
      };
    };

    return Node;
  }(events_1.EventEmitter);

  exports$8.Node = Node;
  /**
   * Represents a hard link that points to an i-node `node`.
   */

  var Link = function (_super) {
    __extends(Link, _super);

    function Link(vol, parent, name) {
      var _this = _super.call(this) || this;

      _this.children = {}; // Path to this node as Array: ['usr', 'bin', 'node'].

      _this.steps = []; // "i-node" number of the node.

      _this.ino = 0; // Number of children.

      _this.length = 0;
      _this.vol = vol;
      _this.parent = parent;
      _this.steps = parent ? parent.steps.concat([name]) : [name];
      return _this;
    }

    Link.prototype.setNode = function (node) {
      this.node = node;
      this.ino = node.ino;
    };

    Link.prototype.getNode = function () {
      return this.node;
    };

    Link.prototype.createChild = function (name, node) {
      if (node === void 0) {
        node = this.vol.createNode();
      }

      var link = new Link(this.vol, this, name);
      link.setNode(node);

      if (node.isDirectory()) ;

      this.setChild(name, link);
      return link;
    };

    Link.prototype.setChild = function (name, link) {
      if (link === void 0) {
        link = new Link(this.vol, this, name);
      }

      this.children[name] = link;
      link.parent = this;
      this.length++;
      this.emit("child:add", link, this);
      return link;
    };

    Link.prototype.deleteChild = function (link) {
      delete this.children[link.getName()];
      this.length--;
      this.emit("child:delete", link, this);
    };

    Link.prototype.getChild = function (name) {
      if (Object.hasOwnProperty.call(this.children, name)) {
        return this.children[name];
      }
    };

    Link.prototype.getPath = function () {
      return this.steps.join(exports$8.SEP);
    };

    Link.prototype.getName = function () {
      return this.steps[this.steps.length - 1];
    }; // del() {
    //     const parent = this.parent;
    //     if(parent) {
    //         parent.deleteChild(link);
    //     }
    //     this.parent = null;
    //     this.vol = null;
    // }

    /**
     * Walk the tree path and return the `Link` at that location, if any.
     * @param steps {string[]} Desired location.
     * @param stop {number} Max steps to go into.
     * @param i {number} Current step in the `steps` array.
     *
     * @return {Link|null}
     */


    Link.prototype.walk = function (steps, stop, i) {
      if (stop === void 0) {
        stop = steps.length;
      }

      if (i === void 0) {
        i = 0;
      }

      if (i >= steps.length) return this;
      if (i >= stop) return this;
      var step = steps[i];
      var link = this.getChild(step);
      if (!link) return null;
      return link.walk(steps, stop, i + 1);
    };

    Link.prototype.toJSON = function () {
      return {
        steps: this.steps,
        ino: this.ino,
        children: Object.keys(this.children)
      };
    };

    return Link;
  }(events_1.EventEmitter);

  exports$8.Link = Link;
  /**
   * Represents an open file (file descriptor) that points to a `Link` (Hard-link) and a `Node`.
   */

  var File = function () {
    /**
     * Open a Link-Node pair. `node` is provided separately as that might be a different node
     * rather the one `link` points to, because it might be a symlink.
     * @param link
     * @param node
     * @param flags
     * @param fd
     */
    function File(link, node, flags, fd) {
      /**
       * A cursor/offset position in a file, where data will be written on write.
       * User can "seek" this position.
       */
      this.position = 0;
      this.link = link;
      this.node = node;
      this.flags = flags;
      this.fd = fd;
    }

    File.prototype.getString = function (encoding) {

      return this.node.getString();
    };

    File.prototype.setString = function (str) {
      this.node.setString(str);
    };

    File.prototype.getBuffer = function () {
      return this.node.getBuffer();
    };

    File.prototype.setBuffer = function (buf) {
      this.node.setBuffer(buf);
    };

    File.prototype.getSize = function () {
      return this.node.getSize();
    };

    File.prototype.truncate = function (len) {
      this.node.truncate(len);
    };

    File.prototype.seekTo = function (position) {
      this.position = position;
    };

    File.prototype.stats = function () {
      return Stats_1.default.build(this.node);
    };

    File.prototype.write = function (buf, offset, length, position) {
      if (offset === void 0) {
        offset = 0;
      }

      if (length === void 0) {
        length = buf.length;
      }

      if (typeof position !== "number") position = this.position;
      if (this.flags & O_APPEND) position = this.getSize();
      var bytes = this.node.write(buf, offset, length, position);
      this.position = position + bytes;
      return bytes;
    };

    File.prototype.read = function (buf, offset, length, position) {
      if (offset === void 0) {
        offset = 0;
      }

      if (length === void 0) {
        length = buf.byteLength;
      }

      if (typeof position !== "number") position = this.position;
      var bytes = this.node.read(buf, offset, length, position);
      this.position = position + bytes;
      return bytes;
    };

    File.prototype.chmod = function (perm) {
      this.node.chmod(perm);
    };

    File.prototype.chown = function (uid, gid) {
      this.node.chown(uid, gid);
    };

    return File;
  }();

  exports$8.File = File;
  return exports$8;
}

var exports$7 = {},
    _dewExec$5 = false;

var _global$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$5() {
  if (_dewExec$5) return exports$7;
  _dewExec$5 = true;
  Object.defineProperty(exports$7, "__esModule", {
    value: true
  });
  /**
   * `setTimeoutUnref` is just like `setTimeout`,
   * only in Node's environment it will "unref" its macro task.
   */

  function setTimeoutUnref(callback, time, args) {
    var ref = setTimeout.apply(typeof globalThis !== "undefined" ? globalThis : _global$1, arguments);
    if (ref && typeof ref === "object" && typeof ref.unref === "function") ref.unref();
    return ref;
  }

  exports$7.default = setTimeoutUnref;
  return exports$7;
}

var exports$6 = {},
    _dewExec$4 = false;
function dew$4() {
  if (_dewExec$4) return exports$6;
  _dewExec$4 = true;

  var __spreadArray = exports$6 && exports$6.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

  Object.defineProperty(exports$6, "__esModule", {
    value: true
  });
  exports$6.FileHandle = void 0;

  function promisify(vol, fn, getResult) {
    if (getResult === void 0) {
      getResult = function (input) {
        return input;
      };
    }

    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return new Promise(function (resolve, reject) {
        vol[fn].bind(vol).apply(void 0, __spreadArray(__spreadArray([], args, false), [function (error, result) {
          if (error) return reject(error);
          return resolve(getResult(result));
        }], false));
      });
    };
  }

  var FileHandle = function () {
    function FileHandle(vol, fd) {
      this.vol = vol;
      this.fd = fd;
    }

    FileHandle.prototype.appendFile = function (data, options) {
      return promisify(this.vol, "appendFile")(this.fd, data, options);
    };

    FileHandle.prototype.chmod = function (mode) {
      return promisify(this.vol, "fchmod")(this.fd, mode);
    };

    FileHandle.prototype.chown = function (uid, gid) {
      return promisify(this.vol, "fchown")(this.fd, uid, gid);
    };

    FileHandle.prototype.close = function () {
      return promisify(this.vol, "close")(this.fd);
    };

    FileHandle.prototype.datasync = function () {
      return promisify(this.vol, "fdatasync")(this.fd);
    };

    FileHandle.prototype.read = function (buffer, offset, length, position) {
      return promisify(this.vol, "read", function (bytesRead) {
        return {
          bytesRead: bytesRead,
          buffer: buffer
        };
      })(this.fd, buffer, offset, length, position);
    };

    FileHandle.prototype.readFile = function (options) {
      return promisify(this.vol, "readFile")(this.fd, options);
    };

    FileHandle.prototype.stat = function (options) {
      return promisify(this.vol, "fstat")(this.fd, options);
    };

    FileHandle.prototype.sync = function () {
      return promisify(this.vol, "fsync")(this.fd);
    };

    FileHandle.prototype.truncate = function (len) {
      return promisify(this.vol, "ftruncate")(this.fd, len);
    };

    FileHandle.prototype.utimes = function (atime, mtime) {
      return promisify(this.vol, "futimes")(this.fd, atime, mtime);
    };

    FileHandle.prototype.write = function (buffer, offset, length, position) {
      return promisify(this.vol, "write", function (bytesWritten) {
        return {
          bytesWritten: bytesWritten,
          buffer: buffer
        };
      })(this.fd, buffer, offset, length, position);
    };

    FileHandle.prototype.writeFile = function (data, options) {
      return promisify(this.vol, "writeFile")(this.fd, data, options);
    };

    return FileHandle;
  }();

  exports$6.FileHandle = FileHandle;

  function createPromisesApi(vol) {
    if (typeof Promise === "undefined") return null;
    return {
      FileHandle: FileHandle,
      access: function (path, mode) {
        return promisify(vol, "access")(path, mode);
      },
      appendFile: function (path, data, options) {
        return promisify(vol, "appendFile")(path instanceof FileHandle ? path.fd : path, data, options);
      },
      chmod: function (path, mode) {
        return promisify(vol, "chmod")(path, mode);
      },
      chown: function (path, uid, gid) {
        return promisify(vol, "chown")(path, uid, gid);
      },
      copyFile: function (src, dest, flags) {
        return promisify(vol, "copyFile")(src, dest, flags);
      },
      lchmod: function (path, mode) {
        return promisify(vol, "lchmod")(path, mode);
      },
      lchown: function (path, uid, gid) {
        return promisify(vol, "lchown")(path, uid, gid);
      },
      link: function (existingPath, newPath) {
        return promisify(vol, "link")(existingPath, newPath);
      },
      lstat: function (path, options) {
        return promisify(vol, "lstat")(path, options);
      },
      mkdir: function (path, options) {
        return promisify(vol, "mkdir")(path, options);
      },
      mkdtemp: function (prefix, options) {
        return promisify(vol, "mkdtemp")(prefix, options);
      },
      open: function (path, flags, mode) {
        return promisify(vol, "open", function (fd) {
          return new FileHandle(vol, fd);
        })(path, flags, mode);
      },
      readdir: function (path, options) {
        return promisify(vol, "readdir")(path, options);
      },
      readFile: function (id, options) {
        return promisify(vol, "readFile")(id instanceof FileHandle ? id.fd : id, options);
      },
      readlink: function (path, options) {
        return promisify(vol, "readlink")(path, options);
      },
      realpath: function (path, options) {
        return promisify(vol, "realpath")(path, options);
      },
      rename: function (oldPath, newPath) {
        return promisify(vol, "rename")(oldPath, newPath);
      },
      rmdir: function (path) {
        return promisify(vol, "rmdir")(path);
      },
      stat: function (path, options) {
        return promisify(vol, "stat")(path, options);
      },
      symlink: function (target, path, type) {
        return promisify(vol, "symlink")(target, path, type);
      },
      truncate: function (path, len) {
        return promisify(vol, "truncate")(path, len);
      },
      unlink: function (path) {
        return promisify(vol, "unlink")(path);
      },
      utimes: function (path, atime, mtime) {
        return promisify(vol, "utimes")(path, atime, mtime);
      },
      writeFile: function (id, data, options) {
        return promisify(vol, "writeFile")(id instanceof FileHandle ? id.fd : id, data, options);
      }
    };
  }

  exports$6.default = createPromisesApi;
  return exports$6;
}

var exports$5 = {},
    _dewExec$3 = false;
function dew$3() {
  if (_dewExec$3) return exports$5;
  _dewExec$3 = true;
  var process$1 = process;
  Object.defineProperty(exports$5, "__esModule", {
    value: true
  });
  exports$5.unixify = unixify;
  exports$5.correctPath = correctPath;
  var isWin = process$1.platform === "win32";

  function removeTrailingSeparator(str) {
    var i = str.length - 1;

    if (i < 2) {
      return str;
    }

    while (isSeparator(str, i)) {
      i--;
    }

    return str.substr(0, i + 1);
  }

  function isSeparator(str, i) {
    var _char = str[i];
    return i > 0 && (_char === "/" || isWin && _char === "\\");
  }

  function normalizePath(str, stripTrailing) {
    if (typeof str !== "string") {
      throw new TypeError("expected a string");
    }

    str = str.replace(/[\\\/]+/g, "/");

    if (stripTrailing !== false) {
      str = removeTrailingSeparator(str);
    }

    return str;
  }

  function unixify(filepath) {
    var stripTrailing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (isWin) {
      filepath = normalizePath(filepath, stripTrailing);
      return filepath.replace(/^([a-zA-Z]+:|\.\/)/, "");
    }

    return filepath;
  }

  function correctPath(filepath) {
    return unixify(filepath.replace(/^\\\\\?\\.:\\/, "\\"));
  }

  return exports$5;
}

var exports$4 = {},
    _dewExec$2 = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew$2() {
  if (_dewExec$2) return exports$4;
  _dewExec$2 = true;

  var __extends = exports$4 && exports$4.__extends || function () {
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    return function (d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();

  var __spreadArray = exports$4 && exports$4.__spreadArray || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };

  Object.defineProperty(exports$4, "__esModule", {
    value: true
  });
  exports$4.FSWatcher = exports$4.StatWatcher = exports$4.Volume = exports$4.toUnixTimestamp = exports$4.bufferToEncoding = exports$4.dataToBuffer = exports$4.dataToStr = exports$4.pathToSteps = exports$4.filenameToSteps = exports$4.pathToFilename = exports$4.flagsToNumber = exports$4.FLAGS = void 0;
  var pathModule = exports$i;

  var node_1 = dew$6();

  var Stats_1 = dew$d();

  var Dirent_1 = dew$9();

  var buffer_1 = dew$c();

  var setImmediate_1 = dew$8();

  var process_1 = dew$7();

  var setTimeoutUnref_1 = dew$5();

  var stream_1 = exports$j;

  var constants_1 = dew$f();

  var events_1 = y;

  var encoding_1 = dew$a();

  var errors = dew$b();

  var util = X;

  var promises_1 = dew$4();

  var resolveCrossPlatform = pathModule.resolve;
  var O_RDONLY = constants_1.constants.O_RDONLY,
      O_WRONLY = constants_1.constants.O_WRONLY,
      O_RDWR = constants_1.constants.O_RDWR,
      O_CREAT = constants_1.constants.O_CREAT,
      O_EXCL = constants_1.constants.O_EXCL,
      O_TRUNC = constants_1.constants.O_TRUNC,
      O_APPEND = constants_1.constants.O_APPEND,
      O_SYNC = constants_1.constants.O_SYNC,
      O_DIRECTORY = constants_1.constants.O_DIRECTORY,
      F_OK = constants_1.constants.F_OK,
      COPYFILE_EXCL = constants_1.constants.COPYFILE_EXCL,
      COPYFILE_FICLONE_FORCE = constants_1.constants.COPYFILE_FICLONE_FORCE;

  var _a = pathModule.posix ? pathModule.posix : pathModule,
      sep = _a.sep,
      relative = _a.relative,
      join = _a.join,
      dirname = _a.dirname;

  var isWin = process_1.default.platform === "win32";
  var kMinPoolSpace = 128; // const kMaxLength = require('buffer').kMaxLength;
  // ---------------------------------------- Error messages
  // TODO: Use `internal/errors.js` in the future.

  var ERRSTR = {
    PATH_STR: "path must be a string or Buffer",
    // FD:             'file descriptor must be a unsigned 32-bit integer',
    FD: "fd must be a file descriptor",
    MODE_INT: "mode must be an int",
    CB: "callback must be a function",
    UID: "uid must be an unsigned int",
    GID: "gid must be an unsigned int",
    LEN: "len must be an integer",
    ATIME: "atime must be an integer",
    MTIME: "mtime must be an integer",
    PREFIX: "filename prefix is required",
    BUFFER: "buffer must be an instance of Buffer or StaticBuffer",
    OFFSET: "offset must be an integer",
    LENGTH: "length must be an integer",
    POSITION: "position must be an integer"
  };

  var ERRSTR_OPTS = function (tipeof) {
    return "Expected options to be either an object or a string, but got " + tipeof + " instead";
  }; // const ERRSTR_FLAG = flag => `Unknown file open flag: ${flag}`;


  var ENOENT = "ENOENT";
  var EBADF = "EBADF";
  var EINVAL = "EINVAL";
  var EPERM = "EPERM";
  var EPROTO = "EPROTO";
  var EEXIST = "EEXIST";
  var ENOTDIR = "ENOTDIR";
  var EMFILE = "EMFILE";
  var EACCES = "EACCES";
  var EISDIR = "EISDIR";
  var ENOTEMPTY = "ENOTEMPTY";
  var ENOSYS = "ENOSYS";

  function formatError(errorCode, func, path, path2) {
    if (func === void 0) {
      func = "";
    }

    if (path === void 0) {
      path = "";
    }

    if (path2 === void 0) {
      path2 = "";
    }

    var pathFormatted = "";
    if (path) pathFormatted = " '" + path + "'";
    if (path2) pathFormatted += " -> '" + path2 + "'";

    switch (errorCode) {
      case ENOENT:
        return "ENOENT: no such file or directory, " + func + pathFormatted;

      case EBADF:
        return "EBADF: bad file descriptor, " + func + pathFormatted;

      case EINVAL:
        return "EINVAL: invalid argument, " + func + pathFormatted;

      case EPERM:
        return "EPERM: operation not permitted, " + func + pathFormatted;

      case EPROTO:
        return "EPROTO: protocol error, " + func + pathFormatted;

      case EEXIST:
        return "EEXIST: file already exists, " + func + pathFormatted;

      case ENOTDIR:
        return "ENOTDIR: not a directory, " + func + pathFormatted;

      case EISDIR:
        return "EISDIR: illegal operation on a directory, " + func + pathFormatted;

      case EACCES:
        return "EACCES: permission denied, " + func + pathFormatted;

      case ENOTEMPTY:
        return "ENOTEMPTY: directory not empty, " + func + pathFormatted;

      case EMFILE:
        return "EMFILE: too many open files, " + func + pathFormatted;

      case ENOSYS:
        return "ENOSYS: function not implemented, " + func + pathFormatted;

      default:
        return errorCode + ": error occurred, " + func + pathFormatted;
    }
  }

  function createError(errorCode, func, path, path2, Constructor) {
    if (func === void 0) {
      func = "";
    }

    if (path === void 0) {
      path = "";
    }

    if (path2 === void 0) {
      path2 = "";
    }

    if (Constructor === void 0) {
      Constructor = Error;
    }

    var error = new Constructor(formatError(errorCode, func, path, path2));
    error.code = errorCode;
    return error;
  } // ---------------------------------------- Flags
  // List of file `flags` as defined by Node.


  var FLAGS;

  (function (FLAGS) {
    // Open file for reading. An exception occurs if the file does not exist.
    FLAGS[FLAGS["r"] = O_RDONLY] = "r"; // Open file for reading and writing. An exception occurs if the file does not exist.

    FLAGS[FLAGS["r+"] = O_RDWR] = "r+"; // Open file for reading in synchronous mode. Instructs the operating system to bypass the local file system cache.

    FLAGS[FLAGS["rs"] = O_RDONLY | O_SYNC] = "rs";
    FLAGS[FLAGS["sr"] = FLAGS.rs] = "sr"; // Open file for reading and writing, telling the OS to open it synchronously. See notes for 'rs' about using this with caution.

    FLAGS[FLAGS["rs+"] = O_RDWR | O_SYNC] = "rs+";
    FLAGS[FLAGS["sr+"] = FLAGS["rs+"]] = "sr+"; // Open file for writing. The file is created (if it does not exist) or truncated (if it exists).

    FLAGS[FLAGS["w"] = O_WRONLY | O_CREAT | O_TRUNC] = "w"; // Like 'w' but fails if path exists.

    FLAGS[FLAGS["wx"] = O_WRONLY | O_CREAT | O_TRUNC | O_EXCL] = "wx";
    FLAGS[FLAGS["xw"] = FLAGS.wx] = "xw"; // Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).

    FLAGS[FLAGS["w+"] = O_RDWR | O_CREAT | O_TRUNC] = "w+"; // Like 'w+' but fails if path exists.

    FLAGS[FLAGS["wx+"] = O_RDWR | O_CREAT | O_TRUNC | O_EXCL] = "wx+";
    FLAGS[FLAGS["xw+"] = FLAGS["wx+"]] = "xw+"; // Open file for appending. The file is created if it does not exist.

    FLAGS[FLAGS["a"] = O_WRONLY | O_APPEND | O_CREAT] = "a"; // Like 'a' but fails if path exists.

    FLAGS[FLAGS["ax"] = O_WRONLY | O_APPEND | O_CREAT | O_EXCL] = "ax";
    FLAGS[FLAGS["xa"] = FLAGS.ax] = "xa"; // Open file for reading and appending. The file is created if it does not exist.

    FLAGS[FLAGS["a+"] = O_RDWR | O_APPEND | O_CREAT] = "a+"; // Like 'a+' but fails if path exists.

    FLAGS[FLAGS["ax+"] = O_RDWR | O_APPEND | O_CREAT | O_EXCL] = "ax+";
    FLAGS[FLAGS["xa+"] = FLAGS["ax+"]] = "xa+";
  })(FLAGS = exports$4.FLAGS || (exports$4.FLAGS = {}));

  function flagsToNumber(flags) {
    if (typeof flags === "number") return flags;

    if (typeof flags === "string") {
      var flagsNum = FLAGS[flags];
      if (typeof flagsNum !== "undefined") return flagsNum;
    } // throw new TypeError(formatError(ERRSTR_FLAG(flags)));


    throw new errors.TypeError("ERR_INVALID_OPT_VALUE", "flags", flags);
  }

  exports$4.flagsToNumber = flagsToNumber; // ---------------------------------------- Options

  function getOptions(defaults, options) {
    var opts;
    if (!options) return defaults;else {
      var tipeof = typeof options;

      switch (tipeof) {
        case "string":
          opts = Object.assign({}, defaults, {
            encoding: options
          });
          break;

        case "object":
          opts = Object.assign({}, defaults, options);
          break;

        default:
          throw TypeError(ERRSTR_OPTS(tipeof));
      }
    }
    if (opts.encoding !== "buffer") (0, encoding_1.assertEncoding)(opts.encoding);
    return opts;
  }

  function optsGenerator(defaults) {
    return function (options) {
      return getOptions(defaults, options);
    };
  }

  function validateCallback(callback) {
    if (typeof callback !== "function") throw TypeError(ERRSTR.CB);
    return callback;
  }

  function optsAndCbGenerator(getOpts) {
    return function (options, callback) {
      return typeof options === "function" ? [getOpts(), options] : [getOpts(options), validateCallback(callback)];
    };
  }

  var optsDefaults = {
    encoding: "utf8"
  };
  var getDefaultOpts = optsGenerator(optsDefaults);
  var getDefaultOptsAndCb = optsAndCbGenerator(getDefaultOpts);
  var readFileOptsDefaults = {
    flag: "r"
  };
  var getReadFileOptions = optsGenerator(readFileOptsDefaults);
  var writeFileDefaults = {
    encoding: "utf8",
    mode: 438
    /* DEFAULT */
    ,
    flag: FLAGS[FLAGS.w]
  };
  var getWriteFileOptions = optsGenerator(writeFileDefaults);
  var appendFileDefaults = {
    encoding: "utf8",
    mode: 438
    /* DEFAULT */
    ,
    flag: FLAGS[FLAGS.a]
  };
  var getAppendFileOpts = optsGenerator(appendFileDefaults);
  var getAppendFileOptsAndCb = optsAndCbGenerator(getAppendFileOpts);
  var realpathDefaults = optsDefaults;
  var getRealpathOptions = optsGenerator(realpathDefaults);
  var getRealpathOptsAndCb = optsAndCbGenerator(getRealpathOptions);
  var mkdirDefaults = {
    mode: 511
    /* DIR */
    ,
    recursive: false
  };

  var getMkdirOptions = function (options) {
    if (typeof options === "number") return Object.assign({}, mkdirDefaults, {
      mode: options
    });
    return Object.assign({}, mkdirDefaults, options);
  };

  var rmdirDefaults = {
    recursive: false
  };

  var getRmdirOptions = function (options) {
    return Object.assign({}, rmdirDefaults, options);
  };

  var readdirDefaults = {
    encoding: "utf8",
    withFileTypes: false
  };
  var getReaddirOptions = optsGenerator(readdirDefaults);
  var getReaddirOptsAndCb = optsAndCbGenerator(getReaddirOptions);
  var statDefaults = {
    bigint: false
  };

  var getStatOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    return Object.assign({}, statDefaults, options);
  };

  var getStatOptsAndCb = function (options, callback) {
    return typeof options === "function" ? [getStatOptions(), options] : [getStatOptions(options), validateCallback(callback)];
  }; // ---------------------------------------- Utility functions


  function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
      throw new errors.TypeError("ERR_INVALID_FILE_URL_HOST", process_1.default.platform);
    }

    var pathname = url.pathname;

    for (var n = 0; n < pathname.length; n++) {
      if (pathname[n] === "%") {
        var third = pathname.codePointAt(n + 2) | 32;

        if (pathname[n + 1] === "2" && third === 102) {
          throw new errors.TypeError("ERR_INVALID_FILE_URL_PATH", "must not include encoded / characters");
        }
      }
    }

    return decodeURIComponent(pathname);
  }

  function pathToFilename(path) {
    if (typeof path !== "string" && !buffer_1.Buffer.isBuffer(path)) {
      try {
        if (!(path instanceof h.URL)) throw new TypeError(ERRSTR.PATH_STR);
      } catch (err) {
        throw new TypeError(ERRSTR.PATH_STR);
      }

      path = getPathFromURLPosix(path);
    }

    var pathString = String(path);
    nullCheck(pathString); // return slash(pathString);

    return pathString;
  }

  exports$4.pathToFilename = pathToFilename;

  var resolve = function (filename, base) {
    if (base === void 0) {
      base = process_1.default.cwd();
    }

    return resolveCrossPlatform(base, filename);
  };

  if (isWin) {
    var _resolve_1 = resolve;

    var unixify_1 = dew$3().unixify;

    resolve = function (filename, base) {
      return unixify_1(_resolve_1(filename, base));
    };
  }

  function filenameToSteps(filename, base) {
    var fullPath = resolve(filename, base);
    var fullPathSansSlash = fullPath.substr(1);
    if (!fullPathSansSlash) return [];
    return fullPathSansSlash.split(sep);
  }

  exports$4.filenameToSteps = filenameToSteps;

  function pathToSteps(path) {
    return filenameToSteps(pathToFilename(path));
  }

  exports$4.pathToSteps = pathToSteps;

  function dataToStr(data, encoding) {
    if (encoding === void 0) {
      encoding = encoding_1.ENCODING_UTF8;
    }

    if (buffer_1.Buffer.isBuffer(data)) return data.toString(encoding);else if (data instanceof Uint8Array) return (0, buffer_1.bufferFrom)(data).toString(encoding);else return String(data);
  }

  exports$4.dataToStr = dataToStr;

  function dataToBuffer(data, encoding) {
    if (encoding === void 0) {
      encoding = encoding_1.ENCODING_UTF8;
    }

    if (buffer_1.Buffer.isBuffer(data)) return data;else if (data instanceof Uint8Array) return (0, buffer_1.bufferFrom)(data);else return (0, buffer_1.bufferFrom)(String(data), encoding);
  }

  exports$4.dataToBuffer = dataToBuffer;

  function bufferToEncoding(buffer, encoding) {
    if (!encoding || encoding === "buffer") return buffer;else return buffer.toString(encoding);
  }

  exports$4.bufferToEncoding = bufferToEncoding;

  function nullCheck(path, callback) {
    if (("" + path).indexOf("\0") !== -1) {
      var er = new Error("Path must be a string without null bytes");
      er.code = ENOENT;
      if (typeof callback !== "function") throw er;
      process_1.default.nextTick(callback, er);
      return false;
    }

    return true;
  }

  function _modeToNumber(mode, def) {
    if (typeof mode === "number") return mode;
    if (typeof mode === "string") return parseInt(mode, 8);
    if (def) return modeToNumber(def);
    return undefined;
  }

  function modeToNumber(mode, def) {
    var result = _modeToNumber(mode, def);

    if (typeof result !== "number" || isNaN(result)) throw new TypeError(ERRSTR.MODE_INT);
    return result;
  }

  function isFd(path) {
    return path >>> 0 === path;
  }

  function validateFd(fd) {
    if (!isFd(fd)) throw TypeError(ERRSTR.FD);
  } // converts Date or number to a fractional UNIX timestamp


  function toUnixTimestamp(time) {
    // tslint:disable-next-line triple-equals
    if (typeof time === "string" && +time == time) {
      return +time;
    }

    if (time instanceof Date) {
      return time.getTime() / 1000;
    }

    if (isFinite(time)) {
      if (time < 0) {
        return Date.now() / 1000;
      }

      return time;
    }

    throw new Error("Cannot parse time: " + time);
  }

  exports$4.toUnixTimestamp = toUnixTimestamp;

  function validateUid(uid) {
    if (typeof uid !== "number") throw TypeError(ERRSTR.UID);
  }

  function validateGid(gid) {
    if (typeof gid !== "number") throw TypeError(ERRSTR.GID);
  }

  function flattenJSON(nestedJSON) {
    var flatJSON = {};

    function flatten(pathPrefix, node) {
      for (var path in node) {
        var contentOrNode = node[path];
        var joinedPath = join(pathPrefix, path);

        if (typeof contentOrNode === "string") {
          flatJSON[joinedPath] = contentOrNode;
        } else if (typeof contentOrNode === "object" && contentOrNode !== null && Object.keys(contentOrNode).length > 0) {
          // empty directories need an explicit entry and therefore get handled in `else`, non-empty ones are implicitly considered
          flatten(joinedPath, contentOrNode);
        } else {
          // without this branch null, empty-object or non-object entries would not be handled in the same way
          // by both fromJSON() and fromNestedJSON()
          flatJSON[joinedPath] = null;
        }
      }
    }

    flatten("", nestedJSON);
    return flatJSON;
  }
  /**
   * `Volume` represents a file system.
   */


  var Volume = function () {
    function Volume(props) {
      if (props === void 0) {
        props = {};
      } // I-node number counter.


      this.ino = 0; // A mapping for i-node numbers to i-nodes (`Node`);

      this.inodes = {}; // List of released i-node numbers, for reuse.

      this.releasedInos = []; // A mapping for file descriptors to `File`s.

      this.fds = {}; // A list of reusable (opened and closed) file descriptors, that should be
      // used first before creating a new file descriptor.

      this.releasedFds = []; // Max number of open files.

      this.maxFiles = 10000; // Current number of open files.

      this.openFiles = 0;
      this.promisesApi = (0, promises_1.default)(this);
      this.statWatchers = {};
      this.props = Object.assign({
        Node: node_1.Node,
        Link: node_1.Link,
        File: node_1.File
      }, props);
      var root = this.createLink();
      root.setNode(this.createNode(true));
      var self = this; // tslint:disable-line no-this-assignment

      this.StatWatcher = function (_super) {
        __extends(StatWatcher, _super);

        function StatWatcher() {
          return _super.call(this, self) || this;
        }

        return StatWatcher;
      }(StatWatcher);

      var _ReadStream = FsReadStream;

      this.ReadStream = function (_super) {
        __extends(class_1, _super);

        function class_1() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          return _super.apply(this, __spreadArray([self], args, false)) || this;
        }

        return class_1;
      }(_ReadStream);

      var _WriteStream = FsWriteStream;

      this.WriteStream = function (_super) {
        __extends(class_2, _super);

        function class_2() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          return _super.apply(this, __spreadArray([self], args, false)) || this;
        }

        return class_2;
      }(_WriteStream);

      this.FSWatcher = function (_super) {
        __extends(FSWatcher, _super);

        function FSWatcher() {
          return _super.call(this, self) || this;
        }

        return FSWatcher;
      }(FSWatcher); // root.setChild('.', root);
      // root.getNode().nlink++;
      // root.setChild('..', root);
      // root.getNode().nlink++;


      this.root = root;
    }

    Volume.fromJSON = function (json, cwd) {
      var vol = new Volume();
      vol.fromJSON(json, cwd);
      return vol;
    };

    Volume.fromNestedJSON = function (json, cwd) {
      var vol = new Volume();
      vol.fromNestedJSON(json, cwd);
      return vol;
    };

    Object.defineProperty(Volume.prototype, "promises", {
      get: function () {
        if (this.promisesApi === null) throw new Error("Promise is not supported in this environment.");
        return this.promisesApi;
      },
      enumerable: false,
      configurable: true
    });

    Volume.prototype.createLink = function (parent, name, isDirectory, perm) {
      if (isDirectory === void 0) {
        isDirectory = false;
      }

      if (!parent) {
        return new this.props.Link(this, null, "");
      }

      if (!name) {
        throw new Error("createLink: name cannot be empty");
      }

      return parent.createChild(name, this.createNode(isDirectory, perm));
    };

    Volume.prototype.deleteLink = function (link) {
      var parent = link.parent;

      if (parent) {
        parent.deleteChild(link);
        return true;
      }

      return false;
    };

    Volume.prototype.newInoNumber = function () {
      var releasedFd = this.releasedInos.pop();
      if (releasedFd) return releasedFd;else {
        this.ino = (this.ino + 1) % 4294967295;
        return this.ino;
      }
    };

    Volume.prototype.newFdNumber = function () {
      var releasedFd = this.releasedFds.pop();
      return typeof releasedFd === "number" ? releasedFd : Volume.fd--;
    };

    Volume.prototype.createNode = function (isDirectory, perm) {
      if (isDirectory === void 0) {
        isDirectory = false;
      }

      var node = new this.props.Node(this.newInoNumber(), perm);
      if (isDirectory) node.setIsDirectory();
      this.inodes[node.ino] = node;
      return node;
    };

    Volume.prototype.getNode = function (ino) {
      return this.inodes[ino];
    };

    Volume.prototype.deleteNode = function (node) {
      node.del();
      delete this.inodes[node.ino];
      this.releasedInos.push(node.ino);
    }; // Generates 6 character long random string, used by `mkdtemp`.


    Volume.prototype.genRndStr = function () {
      var str = (Math.random() + 1).toString(36).substr(2, 6);
      if (str.length === 6) return str;else return this.genRndStr();
    }; // Returns a `Link` (hard link) referenced by path "split" into steps.


    Volume.prototype.getLink = function (steps) {
      return this.root.walk(steps);
    }; // Just link `getLink`, but throws a correct user error, if link to found.


    Volume.prototype.getLinkOrThrow = function (filename, funcName) {
      var steps = filenameToSteps(filename);
      var link = this.getLink(steps);
      if (!link) throw createError(ENOENT, funcName, filename);
      return link;
    }; // Just like `getLink`, but also dereference/resolves symbolic links.


    Volume.prototype.getResolvedLink = function (filenameOrSteps) {
      var steps = typeof filenameOrSteps === "string" ? filenameToSteps(filenameOrSteps) : filenameOrSteps;
      var link = this.root;
      var i = 0;

      while (i < steps.length) {
        var step = steps[i];
        link = link.getChild(step);
        if (!link) return null;
        var node = link.getNode();

        if (node.isSymlink()) {
          steps = node.symlink.concat(steps.slice(i + 1));
          link = this.root;
          i = 0;
          continue;
        }

        i++;
      }

      return link;
    }; // Just like `getLinkOrThrow`, but also dereference/resolves symbolic links.


    Volume.prototype.getResolvedLinkOrThrow = function (filename, funcName) {
      var link = this.getResolvedLink(filename);
      if (!link) throw createError(ENOENT, funcName, filename);
      return link;
    };

    Volume.prototype.resolveSymlinks = function (link) {
      // let node: Node = link.getNode();
      // while(link && node.isSymlink()) {
      //     link = this.getLink(node.symlink);
      //     if(!link) return null;
      //     node = link.getNode();
      // }
      // return link;
      return this.getResolvedLink(link.steps.slice(1));
    }; // Just like `getLinkOrThrow`, but also verifies that the link is a directory.


    Volume.prototype.getLinkAsDirOrThrow = function (filename, funcName) {
      var link = this.getLinkOrThrow(filename, funcName);
      if (!link.getNode().isDirectory()) throw createError(ENOTDIR, funcName, filename);
      return link;
    }; // Get the immediate parent directory of the link.


    Volume.prototype.getLinkParent = function (steps) {
      return this.root.walk(steps, steps.length - 1);
    };

    Volume.prototype.getLinkParentAsDirOrThrow = function (filenameOrSteps, funcName) {
      var steps = filenameOrSteps instanceof Array ? filenameOrSteps : filenameToSteps(filenameOrSteps);
      var link = this.getLinkParent(steps);
      if (!link) throw createError(ENOENT, funcName, sep + steps.join(sep));
      if (!link.getNode().isDirectory()) throw createError(ENOTDIR, funcName, sep + steps.join(sep));
      return link;
    };

    Volume.prototype.getFileByFd = function (fd) {
      return this.fds[String(fd)];
    };

    Volume.prototype.getFileByFdOrThrow = function (fd, funcName) {
      if (!isFd(fd)) throw TypeError(ERRSTR.FD);
      var file = this.getFileByFd(fd);
      if (!file) throw createError(EBADF, funcName);
      return file;
    };

    Volume.prototype.getNodeByIdOrCreate = function (id, flags, perm) {
      if (typeof id === "number") {
        var file = this.getFileByFd(id);
        if (!file) throw Error("File nto found");
        return file.node;
      } else {
        var steps = pathToSteps(id);
        var link = this.getLink(steps);
        if (link) return link.getNode(); // Try creating a node if not found.

        if (flags & O_CREAT) {
          var dirLink = this.getLinkParent(steps);

          if (dirLink) {
            var name_1 = steps[steps.length - 1];
            link = this.createLink(dirLink, name_1, false, perm);
            return link.getNode();
          }
        }

        throw createError(ENOENT, "getNodeByIdOrCreate", pathToFilename(id));
      }
    };

    Volume.prototype.wrapAsync = function (method, args, callback) {
      var _this = this;

      validateCallback(callback);
      (0, setImmediate_1.default)(function () {
        var result;

        try {
          result = method.apply(_this, args);
        } catch (err) {
          callback(err);
          return;
        }

        callback(null, result);
      });
    };

    Volume.prototype._toJSON = function (link, json, path) {
      var _a;

      if (link === void 0) {
        link = this.root;
      }

      if (json === void 0) {
        json = {};
      }

      var isEmpty = true;
      var children = link.children;

      if (link.getNode().isFile()) {
        children = (_a = {}, _a[link.getName()] = link.parent.getChild(link.getName()), _a);
        link = link.parent;
      }

      for (var name_2 in children) {
        isEmpty = false;
        var child = link.getChild(name_2);

        if (!child) {
          throw new Error("_toJSON: unexpected undefined");
        }

        var node = child.getNode();

        if (node.isFile()) {
          var filename = child.getPath();
          if (path) filename = relative(path, filename);
          json[filename] = node.getString();
        } else if (node.isDirectory()) {
          this._toJSON(child, json, path);
        }
      }

      var dirPath = link.getPath();
      if (path) dirPath = relative(path, dirPath);

      if (dirPath && isEmpty) {
        json[dirPath] = null;
      }

      return json;
    };

    Volume.prototype.toJSON = function (paths, json, isRelative) {
      if (json === void 0) {
        json = {};
      }

      if (isRelative === void 0) {
        isRelative = false;
      }

      var links = [];

      if (paths) {
        if (!(paths instanceof Array)) paths = [paths];

        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
          var path = paths_1[_i];
          var filename = pathToFilename(path);
          var link = this.getResolvedLink(filename);
          if (!link) continue;
          links.push(link);
        }
      } else {
        links.push(this.root);
      }

      if (!links.length) return json;

      for (var _a = 0, links_1 = links; _a < links_1.length; _a++) {
        var link = links_1[_a];

        this._toJSON(link, json, isRelative ? link.getPath() : "");
      }

      return json;
    };

    Volume.prototype.fromJSON = function (json, cwd) {
      if (cwd === void 0) {
        cwd = process_1.default.cwd();
      }

      for (var filename in json) {
        var data = json[filename];
        filename = resolve(filename, cwd);

        if (typeof data === "string") {
          var dir = dirname(filename);
          this.mkdirpBase(dir, 511
          /* DIR */
          );
          this.writeFileSync(filename, data);
        } else {
          this.mkdirpBase(filename, 511
          /* DIR */
          );
        }
      }
    };

    Volume.prototype.fromNestedJSON = function (json, cwd) {
      this.fromJSON(flattenJSON(json), cwd);
    };

    Volume.prototype.reset = function () {
      this.ino = 0;
      this.inodes = {};
      this.releasedInos = [];
      this.fds = {};
      this.releasedFds = [];
      this.openFiles = 0;
      this.root = this.createLink();
      this.root.setNode(this.createNode(true));
    }; // Legacy interface


    Volume.prototype.mountSync = function (mountpoint, json) {
      this.fromJSON(json, mountpoint);
    };

    Volume.prototype.openLink = function (link, flagsNum, resolveSymlinks) {
      if (resolveSymlinks === void 0) {
        resolveSymlinks = true;
      }

      if (this.openFiles >= this.maxFiles) {
        // Too many open files.
        throw createError(EMFILE, "open", link.getPath());
      } // Resolve symlinks.


      var realLink = link;
      if (resolveSymlinks) realLink = this.resolveSymlinks(link);
      if (!realLink) throw createError(ENOENT, "open", link.getPath());
      var node = realLink.getNode(); // Check whether node is a directory

      if (node.isDirectory()) {
        if ((flagsNum & (O_RDONLY | O_RDWR | O_WRONLY)) !== O_RDONLY) throw createError(EISDIR, "open", link.getPath());
      } else {
        if (flagsNum & O_DIRECTORY) throw createError(ENOTDIR, "open", link.getPath());
      } // Check node permissions


      if (!(flagsNum & O_WRONLY)) {
        if (!node.canRead()) {
          throw createError(EACCES, "open", link.getPath());
        }
      }

      var file = new this.props.File(link, node, flagsNum, this.newFdNumber());
      this.fds[file.fd] = file;
      this.openFiles++;
      if (flagsNum & O_TRUNC) file.truncate();
      return file;
    };

    Volume.prototype.openFile = function (filename, flagsNum, modeNum, resolveSymlinks) {
      if (resolveSymlinks === void 0) {
        resolveSymlinks = true;
      }

      var steps = filenameToSteps(filename);
      var link = resolveSymlinks ? this.getResolvedLink(steps) : this.getLink(steps); // Try creating a new file, if it does not exist.

      if (!link && flagsNum & O_CREAT) {
        // const dirLink: Link = this.getLinkParent(steps);
        var dirLink = this.getResolvedLink(steps.slice(0, steps.length - 1)); // if(!dirLink) throw createError(ENOENT, 'open', filename);

        if (!dirLink) throw createError(ENOENT, "open", sep + steps.join(sep));

        if (flagsNum & O_CREAT && typeof modeNum === "number") {
          link = this.createLink(dirLink, steps[steps.length - 1], false, modeNum);
        }
      }

      if (link) return this.openLink(link, flagsNum, resolveSymlinks);
      throw createError(ENOENT, "open", filename);
    };

    Volume.prototype.openBase = function (filename, flagsNum, modeNum, resolveSymlinks) {
      if (resolveSymlinks === void 0) {
        resolveSymlinks = true;
      }

      var file = this.openFile(filename, flagsNum, modeNum, resolveSymlinks);
      if (!file) throw createError(ENOENT, "open", filename);
      return file.fd;
    };

    Volume.prototype.openSync = function (path, flags, mode) {
      if (mode === void 0) {
        mode = 438
        /* DEFAULT */
        ;
      } // Validate (1) mode; (2) path; (3) flags - in that order.


      var modeNum = modeToNumber(mode);
      var fileName = pathToFilename(path);
      var flagsNum = flagsToNumber(flags);
      return this.openBase(fileName, flagsNum, modeNum);
    };

    Volume.prototype.open = function (path, flags, a, b) {
      var mode = a;
      var callback = b;

      if (typeof a === "function") {
        mode = 438
        /* DEFAULT */
        ;
        callback = a;
      }

      mode = mode || 438
      /* DEFAULT */
      ;
      var modeNum = modeToNumber(mode);
      var fileName = pathToFilename(path);
      var flagsNum = flagsToNumber(flags);
      this.wrapAsync(this.openBase, [fileName, flagsNum, modeNum], callback);
    };

    Volume.prototype.closeFile = function (file) {
      if (!this.fds[file.fd]) return;
      this.openFiles--;
      delete this.fds[file.fd];
      this.releasedFds.push(file.fd);
    };

    Volume.prototype.closeSync = function (fd) {
      validateFd(fd);
      var file = this.getFileByFdOrThrow(fd, "close");
      this.closeFile(file);
    };

    Volume.prototype.close = function (fd, callback) {
      validateFd(fd);
      this.wrapAsync(this.closeSync, [fd], callback);
    };

    Volume.prototype.openFileOrGetById = function (id, flagsNum, modeNum) {
      if (typeof id === "number") {
        var file = this.fds[id];
        if (!file) throw createError(ENOENT);
        return file;
      } else {
        return this.openFile(pathToFilename(id), flagsNum, modeNum);
      }
    };

    Volume.prototype.readBase = function (fd, buffer, offset, length, position) {
      var file = this.getFileByFdOrThrow(fd);
      return file.read(buffer, Number(offset), Number(length), position);
    };

    Volume.prototype.readSync = function (fd, buffer, offset, length, position) {
      validateFd(fd);
      return this.readBase(fd, buffer, offset, length, position);
    };

    Volume.prototype.read = function (fd, buffer, offset, length, position, callback) {
      var _this = this;

      validateCallback(callback); // This `if` branch is from Node.js

      if (length === 0) {
        return process_1.default.nextTick(function () {
          if (callback) callback(null, 0, buffer);
        });
      }

      (0, setImmediate_1.default)(function () {
        try {
          var bytes = _this.readBase(fd, buffer, offset, length, position);

          callback(null, bytes, buffer);
        } catch (err) {
          callback(err);
        }
      });
    };

    Volume.prototype.readFileBase = function (id, flagsNum, encoding) {
      var result;
      var isUserFd = typeof id === "number";
      var userOwnsFd = isUserFd && isFd(id);
      var fd;
      if (userOwnsFd) fd = id;else {
        var filename = pathToFilename(id);
        var steps = filenameToSteps(filename);
        var link = this.getResolvedLink(steps);

        if (link) {
          var node = link.getNode();
          if (node.isDirectory()) throw createError(EISDIR, "open", link.getPath());
        }

        fd = this.openSync(id, flagsNum);
      }

      try {
        result = bufferToEncoding(this.getFileByFdOrThrow(fd).getBuffer(), encoding);
      } finally {
        if (!userOwnsFd) {
          this.closeSync(fd);
        }
      }

      return result;
    };

    Volume.prototype.readFileSync = function (file, options) {
      var opts = getReadFileOptions(options);
      var flagsNum = flagsToNumber(opts.flag);
      return this.readFileBase(file, flagsNum, opts.encoding);
    };

    Volume.prototype.readFile = function (id, a, b) {
      var _a = optsAndCbGenerator(getReadFileOptions)(a, b),
          opts = _a[0],
          callback = _a[1];

      var flagsNum = flagsToNumber(opts.flag);
      this.wrapAsync(this.readFileBase, [id, flagsNum, opts.encoding], callback);
    };

    Volume.prototype.writeBase = function (fd, buf, offset, length, position) {
      var file = this.getFileByFdOrThrow(fd, "write");
      return file.write(buf, offset, length, position);
    };

    Volume.prototype.writeSync = function (fd, a, b, c, d) {
      validateFd(fd);
      var encoding;
      var offset;
      var length;
      var position;
      var isBuffer = typeof a !== "string";

      if (isBuffer) {
        offset = (b || 0) | 0;
        length = c;
        position = d;
      } else {
        position = b;
        encoding = c;
      }

      var buf = dataToBuffer(a, encoding);

      if (isBuffer) {
        if (typeof length === "undefined") {
          length = buf.length;
        }
      } else {
        offset = 0;
        length = buf.length;
      }

      return this.writeBase(fd, buf, offset, length, position);
    };

    Volume.prototype.write = function (fd, a, b, c, d, e) {
      var _this = this;

      validateFd(fd);
      var offset;
      var length;
      var position;
      var encoding;
      var callback;
      var tipa = typeof a;
      var tipb = typeof b;
      var tipc = typeof c;
      var tipd = typeof d;

      if (tipa !== "string") {
        if (tipb === "function") {
          callback = b;
        } else if (tipc === "function") {
          offset = b | 0;
          callback = c;
        } else if (tipd === "function") {
          offset = b | 0;
          length = c;
          callback = d;
        } else {
          offset = b | 0;
          length = c;
          position = d;
          callback = e;
        }
      } else {
        if (tipb === "function") {
          callback = b;
        } else if (tipc === "function") {
          position = b;
          callback = c;
        } else if (tipd === "function") {
          position = b;
          encoding = c;
          callback = d;
        }
      }

      var buf = dataToBuffer(a, encoding);

      if (tipa !== "string") {
        if (typeof length === "undefined") length = buf.length;
      } else {
        offset = 0;
        length = buf.length;
      }

      var cb = validateCallback(callback);
      (0, setImmediate_1.default)(function () {
        try {
          var bytes = _this.writeBase(fd, buf, offset, length, position);

          if (tipa !== "string") {
            cb(null, bytes, buf);
          } else {
            cb(null, bytes, a);
          }
        } catch (err) {
          cb(err);
        }
      });
    };

    Volume.prototype.writeFileBase = function (id, buf, flagsNum, modeNum) {
      // console.log('writeFileBase', id, buf, flagsNum, modeNum);
      // const node = this.getNodeByIdOrCreate(id, flagsNum, modeNum);
      // node.setBuffer(buf);
      var isUserFd = typeof id === "number";
      var fd;
      if (isUserFd) fd = id;else {
        fd = this.openBase(pathToFilename(id), flagsNum, modeNum); // fd = this.openSync(id as PathLike, flagsNum, modeNum);
      }
      var offset = 0;
      var length = buf.length;
      var position = flagsNum & O_APPEND ? undefined : 0;

      try {
        while (length > 0) {
          var written = this.writeSync(fd, buf, offset, length, position);
          offset += written;
          length -= written;
          if (position !== undefined) position += written;
        }
      } finally {
        if (!isUserFd) this.closeSync(fd);
      }
    };

    Volume.prototype.writeFileSync = function (id, data, options) {
      var opts = getWriteFileOptions(options);
      var flagsNum = flagsToNumber(opts.flag);
      var modeNum = modeToNumber(opts.mode);
      var buf = dataToBuffer(data, opts.encoding);
      this.writeFileBase(id, buf, flagsNum, modeNum);
    };

    Volume.prototype.writeFile = function (id, data, a, b) {
      var options = a;
      var callback = b;

      if (typeof a === "function") {
        options = writeFileDefaults;
        callback = a;
      }

      var cb = validateCallback(callback);
      var opts = getWriteFileOptions(options);
      var flagsNum = flagsToNumber(opts.flag);
      var modeNum = modeToNumber(opts.mode);
      var buf = dataToBuffer(data, opts.encoding);
      this.wrapAsync(this.writeFileBase, [id, buf, flagsNum, modeNum], cb);
    };

    Volume.prototype.linkBase = function (filename1, filename2) {
      var steps1 = filenameToSteps(filename1);
      var link1 = this.getLink(steps1);
      if (!link1) throw createError(ENOENT, "link", filename1, filename2);
      var steps2 = filenameToSteps(filename2); // Check new link directory exists.

      var dir2 = this.getLinkParent(steps2);
      if (!dir2) throw createError(ENOENT, "link", filename1, filename2);
      var name = steps2[steps2.length - 1]; // Check if new file already exists.

      if (dir2.getChild(name)) throw createError(EEXIST, "link", filename1, filename2);
      var node = link1.getNode();
      node.nlink++;
      dir2.createChild(name, node);
    };

    Volume.prototype.copyFileBase = function (src, dest, flags) {
      var buf = this.readFileSync(src);

      if (flags & COPYFILE_EXCL) {
        if (this.existsSync(dest)) {
          throw createError(EEXIST, "copyFile", src, dest);
        }
      }

      if (flags & COPYFILE_FICLONE_FORCE) {
        throw createError(ENOSYS, "copyFile", src, dest);
      }

      this.writeFileBase(dest, buf, FLAGS.w, 438
      /* DEFAULT */
      );
    };

    Volume.prototype.copyFileSync = function (src, dest, flags) {
      var srcFilename = pathToFilename(src);
      var destFilename = pathToFilename(dest);
      return this.copyFileBase(srcFilename, destFilename, (flags || 0) | 0);
    };

    Volume.prototype.copyFile = function (src, dest, a, b) {
      var srcFilename = pathToFilename(src);
      var destFilename = pathToFilename(dest);
      var flags;
      var callback;

      if (typeof a === "function") {
        flags = 0;
        callback = a;
      } else {
        flags = a;
        callback = b;
      }

      validateCallback(callback);
      this.wrapAsync(this.copyFileBase, [srcFilename, destFilename, flags], callback);
    };

    Volume.prototype.linkSync = function (existingPath, newPath) {
      var existingPathFilename = pathToFilename(existingPath);
      var newPathFilename = pathToFilename(newPath);
      this.linkBase(existingPathFilename, newPathFilename);
    };

    Volume.prototype.link = function (existingPath, newPath, callback) {
      var existingPathFilename = pathToFilename(existingPath);
      var newPathFilename = pathToFilename(newPath);
      this.wrapAsync(this.linkBase, [existingPathFilename, newPathFilename], callback);
    };

    Volume.prototype.unlinkBase = function (filename) {
      var steps = filenameToSteps(filename);
      var link = this.getLink(steps);
      if (!link) throw createError(ENOENT, "unlink", filename); // TODO: Check if it is file, dir, other...

      if (link.length) throw Error("Dir not empty...");
      this.deleteLink(link);
      var node = link.getNode();
      node.nlink--; // When all hard links to i-node are deleted, remove the i-node, too.

      if (node.nlink <= 0) {
        this.deleteNode(node);
      }
    };

    Volume.prototype.unlinkSync = function (path) {
      var filename = pathToFilename(path);
      this.unlinkBase(filename);
    };

    Volume.prototype.unlink = function (path, callback) {
      var filename = pathToFilename(path);
      this.wrapAsync(this.unlinkBase, [filename], callback);
    };

    Volume.prototype.symlinkBase = function (targetFilename, pathFilename) {
      var pathSteps = filenameToSteps(pathFilename); // Check if directory exists, where we about to create a symlink.

      var dirLink = this.getLinkParent(pathSteps);
      if (!dirLink) throw createError(ENOENT, "symlink", targetFilename, pathFilename);
      var name = pathSteps[pathSteps.length - 1]; // Check if new file already exists.

      if (dirLink.getChild(name)) throw createError(EEXIST, "symlink", targetFilename, pathFilename); // Create symlink.

      var symlink = dirLink.createChild(name);
      symlink.getNode().makeSymlink(filenameToSteps(targetFilename));
      return symlink;
    }; // `type` argument works only on Windows.


    Volume.prototype.symlinkSync = function (target, path, type) {
      var targetFilename = pathToFilename(target);
      var pathFilename = pathToFilename(path);
      this.symlinkBase(targetFilename, pathFilename);
    };

    Volume.prototype.symlink = function (target, path, a, b) {
      var callback = validateCallback(typeof a === "function" ? a : b);
      var targetFilename = pathToFilename(target);
      var pathFilename = pathToFilename(path);
      this.wrapAsync(this.symlinkBase, [targetFilename, pathFilename], callback);
    };

    Volume.prototype.realpathBase = function (filename, encoding) {
      var steps = filenameToSteps(filename);
      var realLink = this.getResolvedLink(steps);
      if (!realLink) throw createError(ENOENT, "realpath", filename);
      return (0, encoding_1.strToEncoding)(realLink.getPath(), encoding);
    };

    Volume.prototype.realpathSync = function (path, options) {
      return this.realpathBase(pathToFilename(path), getRealpathOptions(options).encoding);
    };

    Volume.prototype.realpath = function (path, a, b) {
      var _a = getRealpathOptsAndCb(a, b),
          opts = _a[0],
          callback = _a[1];

      var pathFilename = pathToFilename(path);
      this.wrapAsync(this.realpathBase, [pathFilename, opts.encoding], callback);
    };

    Volume.prototype.lstatBase = function (filename, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }

      var link = this.getLink(filenameToSteps(filename));
      if (!link) throw createError(ENOENT, "lstat", filename);
      return Stats_1.default.build(link.getNode(), bigint);
    };

    Volume.prototype.lstatSync = function (path, options) {
      return this.lstatBase(pathToFilename(path), getStatOptions(options).bigint);
    };

    Volume.prototype.lstat = function (path, a, b) {
      var _a = getStatOptsAndCb(a, b),
          opts = _a[0],
          callback = _a[1];

      this.wrapAsync(this.lstatBase, [pathToFilename(path), opts.bigint], callback);
    };

    Volume.prototype.statBase = function (filename, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }

      var link = this.getResolvedLink(filenameToSteps(filename));
      if (!link) throw createError(ENOENT, "stat", filename);
      return Stats_1.default.build(link.getNode(), bigint);
    };

    Volume.prototype.statSync = function (path, options) {
      return this.statBase(pathToFilename(path), getStatOptions(options).bigint);
    };

    Volume.prototype.stat = function (path, a, b) {
      var _a = getStatOptsAndCb(a, b),
          opts = _a[0],
          callback = _a[1];

      this.wrapAsync(this.statBase, [pathToFilename(path), opts.bigint], callback);
    };

    Volume.prototype.fstatBase = function (fd, bigint) {
      if (bigint === void 0) {
        bigint = false;
      }

      var file = this.getFileByFd(fd);
      if (!file) throw createError(EBADF, "fstat");
      return Stats_1.default.build(file.node, bigint);
    };

    Volume.prototype.fstatSync = function (fd, options) {
      return this.fstatBase(fd, getStatOptions(options).bigint);
    };

    Volume.prototype.fstat = function (fd, a, b) {
      var _a = getStatOptsAndCb(a, b),
          opts = _a[0],
          callback = _a[1];

      this.wrapAsync(this.fstatBase, [fd, opts.bigint], callback);
    };

    Volume.prototype.renameBase = function (oldPathFilename, newPathFilename) {
      var link = this.getLink(filenameToSteps(oldPathFilename));
      if (!link) throw createError(ENOENT, "rename", oldPathFilename, newPathFilename); // TODO: Check if it is directory, if non-empty, we cannot move it, right?

      var newPathSteps = filenameToSteps(newPathFilename); // Check directory exists for the new location.

      var newPathDirLink = this.getLinkParent(newPathSteps);
      if (!newPathDirLink) throw createError(ENOENT, "rename", oldPathFilename, newPathFilename); // TODO: Also treat cases with directories and symbolic links.
      // TODO: See: http://man7.org/linux/man-pages/man2/rename.2.html
      // Remove hard link from old folder.

      var oldLinkParent = link.parent;

      if (oldLinkParent) {
        oldLinkParent.deleteChild(link);
      } // Rename should overwrite the new path, if that exists.


      var name = newPathSteps[newPathSteps.length - 1];
      link.steps = __spreadArray(__spreadArray([], newPathDirLink.steps, true), [name], false);
      newPathDirLink.setChild(link.getName(), link);
    };

    Volume.prototype.renameSync = function (oldPath, newPath) {
      var oldPathFilename = pathToFilename(oldPath);
      var newPathFilename = pathToFilename(newPath);
      this.renameBase(oldPathFilename, newPathFilename);
    };

    Volume.prototype.rename = function (oldPath, newPath, callback) {
      var oldPathFilename = pathToFilename(oldPath);
      var newPathFilename = pathToFilename(newPath);
      this.wrapAsync(this.renameBase, [oldPathFilename, newPathFilename], callback);
    };

    Volume.prototype.existsBase = function (filename) {
      return !!this.statBase(filename);
    };

    Volume.prototype.existsSync = function (path) {
      try {
        return this.existsBase(pathToFilename(path));
      } catch (err) {
        return false;
      }
    };

    Volume.prototype.exists = function (path, callback) {
      var _this = this;

      var filename = pathToFilename(path);
      if (typeof callback !== "function") throw Error(ERRSTR.CB);
      (0, setImmediate_1.default)(function () {
        try {
          callback(_this.existsBase(filename));
        } catch (err) {
          callback(false);
        }
      });
    };

    Volume.prototype.accessBase = function (filename, mode) {
      this.getLinkOrThrow(filename, "access"); // TODO: Verify permissions
    };

    Volume.prototype.accessSync = function (path, mode) {
      if (mode === void 0) {
        mode = F_OK;
      }

      var filename = pathToFilename(path);
      mode = mode | 0;
      this.accessBase(filename, mode);
    };

    Volume.prototype.access = function (path, a, b) {
      var mode = F_OK;
      var callback;

      if (typeof a !== "function") {
        mode = a | 0; // cast to number

        callback = validateCallback(b);
      } else {
        callback = a;
      }

      var filename = pathToFilename(path);
      this.wrapAsync(this.accessBase, [filename, mode], callback);
    };

    Volume.prototype.appendFileSync = function (id, data, options) {
      if (options === void 0) {
        options = appendFileDefaults;
      }

      var opts = getAppendFileOpts(options); // force append behavior when using a supplied file descriptor

      if (!opts.flag || isFd(id)) opts.flag = "a";
      this.writeFileSync(id, data, opts);
    };

    Volume.prototype.appendFile = function (id, data, a, b) {
      var _a = getAppendFileOptsAndCb(a, b),
          opts = _a[0],
          callback = _a[1]; // force append behavior when using a supplied file descriptor


      if (!opts.flag || isFd(id)) opts.flag = "a";
      this.writeFile(id, data, opts, callback);
    };

    Volume.prototype.readdirBase = function (filename, options) {
      var steps = filenameToSteps(filename);
      var link = this.getResolvedLink(steps);
      if (!link) throw createError(ENOENT, "readdir", filename);
      var node = link.getNode();
      if (!node.isDirectory()) throw createError(ENOTDIR, "scandir", filename);

      if (options.withFileTypes) {
        var list_1 = [];

        for (var name_3 in link.children) {
          var child = link.getChild(name_3);

          if (!child) {
            continue;
          }

          list_1.push(Dirent_1.default.build(child, options.encoding));
        }

        if (!isWin && options.encoding !== "buffer") list_1.sort(function (a, b) {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        return list_1;
      }

      var list = [];

      for (var name_4 in link.children) {
        list.push((0, encoding_1.strToEncoding)(name_4, options.encoding));
      }

      if (!isWin && options.encoding !== "buffer") list.sort();
      return list;
    };

    Volume.prototype.readdirSync = function (path, options) {
      var opts = getReaddirOptions(options);
      var filename = pathToFilename(path);
      return this.readdirBase(filename, opts);
    };

    Volume.prototype.readdir = function (path, a, b) {
      var _a = getReaddirOptsAndCb(a, b),
          options = _a[0],
          callback = _a[1];

      var filename = pathToFilename(path);
      this.wrapAsync(this.readdirBase, [filename, options], callback);
    };

    Volume.prototype.readlinkBase = function (filename, encoding) {
      var link = this.getLinkOrThrow(filename, "readlink");
      var node = link.getNode();
      if (!node.isSymlink()) throw createError(EINVAL, "readlink", filename);
      var str = sep + node.symlink.join(sep);
      return (0, encoding_1.strToEncoding)(str, encoding);
    };

    Volume.prototype.readlinkSync = function (path, options) {
      var opts = getDefaultOpts(options);
      var filename = pathToFilename(path);
      return this.readlinkBase(filename, opts.encoding);
    };

    Volume.prototype.readlink = function (path, a, b) {
      var _a = getDefaultOptsAndCb(a, b),
          opts = _a[0],
          callback = _a[1];

      var filename = pathToFilename(path);
      this.wrapAsync(this.readlinkBase, [filename, opts.encoding], callback);
    };

    Volume.prototype.fsyncBase = function (fd) {
      this.getFileByFdOrThrow(fd, "fsync");
    };

    Volume.prototype.fsyncSync = function (fd) {
      this.fsyncBase(fd);
    };

    Volume.prototype.fsync = function (fd, callback) {
      this.wrapAsync(this.fsyncBase, [fd], callback);
    };

    Volume.prototype.fdatasyncBase = function (fd) {
      this.getFileByFdOrThrow(fd, "fdatasync");
    };

    Volume.prototype.fdatasyncSync = function (fd) {
      this.fdatasyncBase(fd);
    };

    Volume.prototype.fdatasync = function (fd, callback) {
      this.wrapAsync(this.fdatasyncBase, [fd], callback);
    };

    Volume.prototype.ftruncateBase = function (fd, len) {
      var file = this.getFileByFdOrThrow(fd, "ftruncate");
      file.truncate(len);
    };

    Volume.prototype.ftruncateSync = function (fd, len) {
      this.ftruncateBase(fd, len);
    };

    Volume.prototype.ftruncate = function (fd, a, b) {
      var len = typeof a === "number" ? a : 0;
      var callback = validateCallback(typeof a === "number" ? b : a);
      this.wrapAsync(this.ftruncateBase, [fd, len], callback);
    };

    Volume.prototype.truncateBase = function (path, len) {
      var fd = this.openSync(path, "r+");

      try {
        this.ftruncateSync(fd, len);
      } finally {
        this.closeSync(fd);
      }
    };

    Volume.prototype.truncateSync = function (id, len) {
      if (isFd(id)) return this.ftruncateSync(id, len);
      this.truncateBase(id, len);
    };

    Volume.prototype.truncate = function (id, a, b) {
      var len = typeof a === "number" ? a : 0;
      var callback = validateCallback(typeof a === "number" ? b : a);
      if (isFd(id)) return this.ftruncate(id, len, callback);
      this.wrapAsync(this.truncateBase, [id, len], callback);
    };

    Volume.prototype.futimesBase = function (fd, atime, mtime) {
      var file = this.getFileByFdOrThrow(fd, "futimes");
      var node = file.node;
      node.atime = new Date(atime * 1000);
      node.mtime = new Date(mtime * 1000);
    };

    Volume.prototype.futimesSync = function (fd, atime, mtime) {
      this.futimesBase(fd, toUnixTimestamp(atime), toUnixTimestamp(mtime));
    };

    Volume.prototype.futimes = function (fd, atime, mtime, callback) {
      this.wrapAsync(this.futimesBase, [fd, toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
    };

    Volume.prototype.utimesBase = function (filename, atime, mtime) {
      var fd = this.openSync(filename, "r+");

      try {
        this.futimesBase(fd, atime, mtime);
      } finally {
        this.closeSync(fd);
      }
    };

    Volume.prototype.utimesSync = function (path, atime, mtime) {
      this.utimesBase(pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime));
    };

    Volume.prototype.utimes = function (path, atime, mtime, callback) {
      this.wrapAsync(this.utimesBase, [pathToFilename(path), toUnixTimestamp(atime), toUnixTimestamp(mtime)], callback);
    };

    Volume.prototype.mkdirBase = function (filename, modeNum) {
      var steps = filenameToSteps(filename); // This will throw if user tries to create root dir `fs.mkdirSync('/')`.

      if (!steps.length) {
        throw createError(EEXIST, "mkdir", filename);
      }

      var dir = this.getLinkParentAsDirOrThrow(filename, "mkdir"); // Check path already exists.

      var name = steps[steps.length - 1];
      if (dir.getChild(name)) throw createError(EEXIST, "mkdir", filename);
      dir.createChild(name, this.createNode(true, modeNum));
    };
    /**
     * Creates directory tree recursively.
     * @param filename
     * @param modeNum
     */


    Volume.prototype.mkdirpBase = function (filename, modeNum) {
      var steps = filenameToSteps(filename);
      var link = this.root;

      for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        if (!link.getNode().isDirectory()) throw createError(ENOTDIR, "mkdir", link.getPath());
        var child = link.getChild(step);

        if (child) {
          if (child.getNode().isDirectory()) link = child;else throw createError(ENOTDIR, "mkdir", child.getPath());
        } else {
          link = link.createChild(step, this.createNode(true, modeNum));
        }
      }
    };

    Volume.prototype.mkdirSync = function (path, options) {
      var opts = getMkdirOptions(options);
      var modeNum = modeToNumber(opts.mode, 511);
      var filename = pathToFilename(path);
      if (opts.recursive) this.mkdirpBase(filename, modeNum);else this.mkdirBase(filename, modeNum);
    };

    Volume.prototype.mkdir = function (path, a, b) {
      var opts = getMkdirOptions(a);
      var callback = validateCallback(typeof a === "function" ? a : b);
      var modeNum = modeToNumber(opts.mode, 511);
      var filename = pathToFilename(path);
      if (opts.recursive) this.wrapAsync(this.mkdirpBase, [filename, modeNum], callback);else this.wrapAsync(this.mkdirBase, [filename, modeNum], callback);
    }; // legacy interface


    Volume.prototype.mkdirpSync = function (path, mode) {
      this.mkdirSync(path, {
        mode: mode,
        recursive: true
      });
    };

    Volume.prototype.mkdirp = function (path, a, b) {
      var mode = typeof a === "function" ? undefined : a;
      var callback = validateCallback(typeof a === "function" ? a : b);
      this.mkdir(path, {
        mode: mode,
        recursive: true
      }, callback);
    };

    Volume.prototype.mkdtempBase = function (prefix, encoding, retry) {
      if (retry === void 0) {
        retry = 5;
      }

      var filename = prefix + this.genRndStr();

      try {
        this.mkdirBase(filename, 511
        /* DIR */
        );
        return (0, encoding_1.strToEncoding)(filename, encoding);
      } catch (err) {
        if (err.code === EEXIST) {
          if (retry > 1) return this.mkdtempBase(prefix, encoding, retry - 1);else throw Error("Could not create temp dir.");
        } else throw err;
      }
    };

    Volume.prototype.mkdtempSync = function (prefix, options) {
      var encoding = getDefaultOpts(options).encoding;
      if (!prefix || typeof prefix !== "string") throw new TypeError("filename prefix is required");
      nullCheck(prefix);
      return this.mkdtempBase(prefix, encoding);
    };

    Volume.prototype.mkdtemp = function (prefix, a, b) {
      var _a = getDefaultOptsAndCb(a, b),
          encoding = _a[0].encoding,
          callback = _a[1];

      if (!prefix || typeof prefix !== "string") throw new TypeError("filename prefix is required");
      if (!nullCheck(prefix)) return;
      this.wrapAsync(this.mkdtempBase, [prefix, encoding], callback);
    };

    Volume.prototype.rmdirBase = function (filename, options) {
      var opts = getRmdirOptions(options);
      var link = this.getLinkAsDirOrThrow(filename, "rmdir"); // Check directory is empty.

      if (link.length && !opts.recursive) throw createError(ENOTEMPTY, "rmdir", filename);
      this.deleteLink(link);
    };

    Volume.prototype.rmdirSync = function (path, options) {
      this.rmdirBase(pathToFilename(path), options);
    };

    Volume.prototype.rmdir = function (path, a, b) {
      var opts = getRmdirOptions(a);
      var callback = validateCallback(typeof a === "function" ? a : b);
      this.wrapAsync(this.rmdirBase, [pathToFilename(path), opts], callback);
    };

    Volume.prototype.fchmodBase = function (fd, modeNum) {
      var file = this.getFileByFdOrThrow(fd, "fchmod");
      file.chmod(modeNum);
    };

    Volume.prototype.fchmodSync = function (fd, mode) {
      this.fchmodBase(fd, modeToNumber(mode));
    };

    Volume.prototype.fchmod = function (fd, mode, callback) {
      this.wrapAsync(this.fchmodBase, [fd, modeToNumber(mode)], callback);
    };

    Volume.prototype.chmodBase = function (filename, modeNum) {
      var fd = this.openSync(filename, "r+");

      try {
        this.fchmodBase(fd, modeNum);
      } finally {
        this.closeSync(fd);
      }
    };

    Volume.prototype.chmodSync = function (path, mode) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path);
      this.chmodBase(filename, modeNum);
    };

    Volume.prototype.chmod = function (path, mode, callback) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path);
      this.wrapAsync(this.chmodBase, [filename, modeNum], callback);
    };

    Volume.prototype.lchmodBase = function (filename, modeNum) {
      var fd = this.openBase(filename, O_RDWR, 0, false);

      try {
        this.fchmodBase(fd, modeNum);
      } finally {
        this.closeSync(fd);
      }
    };

    Volume.prototype.lchmodSync = function (path, mode) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path);
      this.lchmodBase(filename, modeNum);
    };

    Volume.prototype.lchmod = function (path, mode, callback) {
      var modeNum = modeToNumber(mode);
      var filename = pathToFilename(path);
      this.wrapAsync(this.lchmodBase, [filename, modeNum], callback);
    };

    Volume.prototype.fchownBase = function (fd, uid, gid) {
      this.getFileByFdOrThrow(fd, "fchown").chown(uid, gid);
    };

    Volume.prototype.fchownSync = function (fd, uid, gid) {
      validateUid(uid);
      validateGid(gid);
      this.fchownBase(fd, uid, gid);
    };

    Volume.prototype.fchown = function (fd, uid, gid, callback) {
      validateUid(uid);
      validateGid(gid);
      this.wrapAsync(this.fchownBase, [fd, uid, gid], callback);
    };

    Volume.prototype.chownBase = function (filename, uid, gid) {
      var link = this.getResolvedLinkOrThrow(filename, "chown");
      var node = link.getNode();
      node.chown(uid, gid); // if(node.isFile() || node.isSymlink()) {
      //
      // } else if(node.isDirectory()) {
      //
      // } else {
      // TODO: What do we do here?
      // }
    };

    Volume.prototype.chownSync = function (path, uid, gid) {
      validateUid(uid);
      validateGid(gid);
      this.chownBase(pathToFilename(path), uid, gid);
    };

    Volume.prototype.chown = function (path, uid, gid, callback) {
      validateUid(uid);
      validateGid(gid);
      this.wrapAsync(this.chownBase, [pathToFilename(path), uid, gid], callback);
    };

    Volume.prototype.lchownBase = function (filename, uid, gid) {
      this.getLinkOrThrow(filename, "lchown").getNode().chown(uid, gid);
    };

    Volume.prototype.lchownSync = function (path, uid, gid) {
      validateUid(uid);
      validateGid(gid);
      this.lchownBase(pathToFilename(path), uid, gid);
    };

    Volume.prototype.lchown = function (path, uid, gid, callback) {
      validateUid(uid);
      validateGid(gid);
      this.wrapAsync(this.lchownBase, [pathToFilename(path), uid, gid], callback);
    };

    Volume.prototype.watchFile = function (path, a, b) {
      var filename = pathToFilename(path);
      var options = a;
      var listener = b;

      if (typeof options === "function") {
        listener = a;
        options = null;
      }

      if (typeof listener !== "function") {
        throw Error("\"watchFile()\" requires a listener function");
      }

      var interval = 5007;
      var persistent = true;

      if (options && typeof options === "object") {
        if (typeof options.interval === "number") interval = options.interval;
        if (typeof options.persistent === "boolean") persistent = options.persistent;
      }

      var watcher = this.statWatchers[filename];

      if (!watcher) {
        watcher = new this.StatWatcher();
        watcher.start(filename, persistent, interval);
        this.statWatchers[filename] = watcher;
      }

      watcher.addListener("change", listener);
      return watcher;
    };

    Volume.prototype.unwatchFile = function (path, listener) {
      var filename = pathToFilename(path);
      var watcher = this.statWatchers[filename];
      if (!watcher) return;

      if (typeof listener === "function") {
        watcher.removeListener("change", listener);
      } else {
        watcher.removeAllListeners("change");
      }

      if (watcher.listenerCount("change") === 0) {
        watcher.stop();
        delete this.statWatchers[filename];
      }
    };

    Volume.prototype.createReadStream = function (path, options) {
      return new this.ReadStream(path, options);
    };

    Volume.prototype.createWriteStream = function (path, options) {
      return new this.WriteStream(path, options);
    }; // watch(path: PathLike): FSWatcher;
    // watch(path: PathLike, options?: IWatchOptions | string): FSWatcher;


    Volume.prototype.watch = function (path, options, listener) {
      var filename = pathToFilename(path);
      var givenOptions = options;

      if (typeof options === "function") {
        listener = options;
        givenOptions = null;
      } // tslint:disable-next-line prefer-const


      var _a = getDefaultOpts(givenOptions),
          persistent = _a.persistent,
          recursive = _a.recursive,
          encoding = _a.encoding;

      if (persistent === undefined) persistent = true;
      if (recursive === undefined) recursive = false;
      var watcher = new this.FSWatcher();
      watcher.start(filename, persistent, recursive, encoding);

      if (listener) {
        watcher.addListener("change", listener);
      }

      return watcher;
    };
    /**
     * Global file descriptor counter. UNIX file descriptors start from 0 and go sequentially
     * up, so here, in order not to conflict with them, we choose some big number and descrease
     * the file descriptor of every new opened file.
     * @type {number}
     * @todo This should not be static, right?
     */


    Volume.fd = 2147483647;
    return Volume;
  }();

  exports$4.Volume = Volume;

  function emitStop(self) {
    self.emit("stop");
  }

  var StatWatcher = function (_super) {
    __extends(StatWatcher, _super);

    function StatWatcher(vol) {
      var _this = _super.call(this) || this;

      _this.onInterval = function () {
        try {
          var stats = _this.vol.statSync(_this.filename);

          if (_this.hasChanged(stats)) {
            _this.emit("change", stats, _this.prev);

            _this.prev = stats;
          }
        } finally {
          _this.loop();
        }
      };

      _this.vol = vol;
      return _this;
    }

    StatWatcher.prototype.loop = function () {
      this.timeoutRef = this.setTimeout(this.onInterval, this.interval);
    };

    StatWatcher.prototype.hasChanged = function (stats) {
      // if(!this.prev) return false;
      if (stats.mtimeMs > this.prev.mtimeMs) return true;
      if (stats.nlink !== this.prev.nlink) return true;
      return false;
    };

    StatWatcher.prototype.start = function (path, persistent, interval) {
      if (persistent === void 0) {
        persistent = true;
      }

      if (interval === void 0) {
        interval = 5007;
      }

      this.filename = pathToFilename(path);
      this.setTimeout = persistent ? setTimeout.bind(typeof globalThis !== "undefined" ? globalThis : _global) : setTimeoutUnref_1.default;
      this.interval = interval;
      this.prev = this.vol.statSync(this.filename);
      this.loop();
    };

    StatWatcher.prototype.stop = function () {
      clearTimeout(this.timeoutRef);
      process_1.default.nextTick(emitStop, this);
    };

    return StatWatcher;
  }(events_1.EventEmitter);

  exports$4.StatWatcher = StatWatcher;
  var pool;

  function allocNewPool(poolSize) {
    pool = (0, buffer_1.bufferAllocUnsafe)(poolSize);
    pool.used = 0;
  }

  util.inherits(FsReadStream, stream_1.Readable);
  exports$4.ReadStream = FsReadStream;

  function FsReadStream(vol, path, options) {
    if (!(this instanceof FsReadStream)) return new FsReadStream(vol, path, options);
    this._vol = vol; // a little bit bigger buffer and water marks by default

    options = Object.assign({}, getOptions(options, {}));
    if (options.highWaterMark === undefined) options.highWaterMark = 64 * 1024;
    stream_1.Readable.call(this, options);
    this.path = pathToFilename(path);
    this.fd = options.fd === undefined ? null : options.fd;
    this.flags = options.flags === undefined ? "r" : options.flags;
    this.mode = options.mode === undefined ? 438 : options.mode;
    this.start = options.start;
    this.end = options.end;
    this.autoClose = options.autoClose === undefined ? true : options.autoClose;
    this.pos = undefined;
    this.bytesRead = 0;

    if (this.start !== undefined) {
      if (typeof this.start !== "number") {
        throw new TypeError("\"start\" option must be a Number");
      }

      if (this.end === undefined) {
        this.end = Infinity;
      } else if (typeof this.end !== "number") {
        throw new TypeError("\"end\" option must be a Number");
      }

      if (this.start > this.end) {
        throw new Error("\"start\" option must be <= \"end\" option");
      }

      this.pos = this.start;
    }

    if (typeof this.fd !== "number") this.open();
    this.on("end", function () {
      if (this.autoClose) {
        if (this.destroy) this.destroy();
      }
    });
  }

  FsReadStream.prototype.open = function () {
    var self = this; // tslint:disable-line no-this-assignment

    this._vol.open(this.path, this.flags, this.mode, function (er, fd) {
      if (er) {
        if (self.autoClose) {
          if (self.destroy) self.destroy();
        }

        self.emit("error", er);
        return;
      }

      self.fd = fd;
      self.emit("open", fd); // start the flow of data.

      self.read();
    });
  };

  FsReadStream.prototype._read = function (n) {
    if (typeof this.fd !== "number") {
      return this.once("open", function () {
        this._read(n);
      });
    }

    if (this.destroyed) return;

    if (!pool || pool.length - pool.used < kMinPoolSpace) {
      // discard the old pool.
      allocNewPool(this._readableState.highWaterMark);
    } // Grab another reference to the pool in the case that while we're
    // in the thread pool another read() finishes up the pool, and
    // allocates a new one.


    var thisPool = pool;
    var toRead = Math.min(pool.length - pool.used, n);
    var start = pool.used;
    if (this.pos !== undefined) toRead = Math.min(this.end - this.pos + 1, toRead); // already read everything we were supposed to read!
    // treat as EOF.

    if (toRead <= 0) return this.push(null); // the actual read.

    var self = this; // tslint:disable-line no-this-assignment

    this._vol.read(this.fd, pool, pool.used, toRead, this.pos, onread); // move the pool positions, and internal position for reading.


    if (this.pos !== undefined) this.pos += toRead;
    pool.used += toRead;

    function onread(er, bytesRead) {
      if (er) {
        if (self.autoClose && self.destroy) {
          self.destroy();
        }

        self.emit("error", er);
      } else {
        var b = null;

        if (bytesRead > 0) {
          self.bytesRead += bytesRead;
          b = thisPool.slice(start, start + bytesRead);
        }

        self.push(b);
      }
    }
  };

  FsReadStream.prototype._destroy = function (err, cb) {
    this.close(function (err2) {
      cb(err || err2);
    });
  };

  FsReadStream.prototype.close = function (cb) {
    var _this = this;

    if (cb) this.once("close", cb);

    if (this.closed || typeof this.fd !== "number") {
      if (typeof this.fd !== "number") {
        this.once("open", closeOnOpen);
        return;
      }

      return process_1.default.nextTick(function () {
        return _this.emit("close");
      });
    }

    this.closed = true;

    this._vol.close(this.fd, function (er) {
      if (er) _this.emit("error", er);else _this.emit("close");
    });

    this.fd = null;
  }; // needed because as it will be called with arguments
  // that does not match this.close() signature


  function closeOnOpen(fd) {
    this.close();
  }

  util.inherits(FsWriteStream, stream_1.Writable);
  exports$4.WriteStream = FsWriteStream;

  function FsWriteStream(vol, path, options) {
    if (!(this instanceof FsWriteStream)) return new FsWriteStream(vol, path, options);
    this._vol = vol;
    options = Object.assign({}, getOptions(options, {}));
    stream_1.Writable.call(this, options);
    this.path = pathToFilename(path);
    this.fd = options.fd === undefined ? null : options.fd;
    this.flags = options.flags === undefined ? "w" : options.flags;
    this.mode = options.mode === undefined ? 438 : options.mode;
    this.start = options.start;
    this.autoClose = options.autoClose === undefined ? true : !!options.autoClose;
    this.pos = undefined;
    this.bytesWritten = 0;

    if (this.start !== undefined) {
      if (typeof this.start !== "number") {
        throw new TypeError("\"start\" option must be a Number");
      }

      if (this.start < 0) {
        throw new Error("\"start\" must be >= zero");
      }

      this.pos = this.start;
    }

    if (options.encoding) this.setDefaultEncoding(options.encoding);
    if (typeof this.fd !== "number") this.open(); // dispose on finish.

    this.once("finish", function () {
      if (this.autoClose) {
        this.close();
      }
    });
  }

  FsWriteStream.prototype.open = function () {
    this._vol.open(this.path, this.flags, this.mode, function (er, fd) {
      if (er) {
        if (this.autoClose && this.destroy) {
          this.destroy();
        }

        this.emit("error", er);
        return;
      }

      this.fd = fd;
      this.emit("open", fd);
    }.bind(this));
  };

  FsWriteStream.prototype._write = function (data, encoding, cb) {
    if (!(data instanceof buffer_1.Buffer)) return this.emit("error", new Error("Invalid data"));

    if (typeof this.fd !== "number") {
      return this.once("open", function () {
        this._write(data, encoding, cb);
      });
    }

    var self = this; // tslint:disable-line no-this-assignment

    this._vol.write(this.fd, data, 0, data.length, this.pos, function (er, bytes) {
      if (er) {
        if (self.autoClose && self.destroy) {
          self.destroy();
        }

        return cb(er);
      }

      self.bytesWritten += bytes;
      cb();
    });

    if (this.pos !== undefined) this.pos += data.length;
  };

  FsWriteStream.prototype._writev = function (data, cb) {
    if (typeof this.fd !== "number") {
      return this.once("open", function () {
        this._writev(data, cb);
      });
    }

    var self = this; // tslint:disable-line no-this-assignment

    var len = data.length;
    var chunks = new Array(len);
    var size = 0;

    for (var i = 0; i < len; i++) {
      var chunk = data[i].chunk;
      chunks[i] = chunk;
      size += chunk.length;
    }

    var buf = buffer_1.Buffer.concat(chunks);

    this._vol.write(this.fd, buf, 0, buf.length, this.pos, function (er, bytes) {
      if (er) {
        if (self.destroy) self.destroy();
        return cb(er);
      }

      self.bytesWritten += bytes;
      cb();
    });

    if (this.pos !== undefined) this.pos += size;
  };

  FsWriteStream.prototype._destroy = FsReadStream.prototype._destroy;
  FsWriteStream.prototype.close = FsReadStream.prototype.close; // There is no shutdown() for files.

  FsWriteStream.prototype.destroySoon = FsWriteStream.prototype.end; // ---------------------------------------- FSWatcher

  var FSWatcher = function (_super) {
    __extends(FSWatcher, _super);

    function FSWatcher(vol) {
      var _this = _super.call(this) || this;

      _this._filename = "";
      _this._filenameEncoded = ""; // _persistent: boolean = true;

      _this._recursive = false;
      _this._encoding = encoding_1.ENCODING_UTF8;

      _this._onNodeChange = function () {
        _this._emit("change");
      };

      _this._onParentChild = function (link) {
        if (link.getName() === _this._getName()) {
          _this._emit("rename");
        }
      };

      _this._emit = function (type) {
        _this.emit("change", type, _this._filenameEncoded);
      };

      _this._persist = function () {
        _this._timer = setTimeout(_this._persist, 1000000);
      };

      _this._vol = vol;
      return _this; // TODO: Emit "error" messages when watching.
      // this._handle.onchange = function(status, eventType, filename) {
      //     if (status < 0) {
      //         self._handle.close();
      //         const error = !filename ?
      //             errnoException(status, 'Error watching file for changes:') :
      //             errnoException(status, `Error watching file ${filename} for changes:`);
      //         error.filename = filename;
      //         self.emit('error', error);
      //     } else {
      //         self.emit('change', eventType, filename);
      //     }
      // };
    }

    FSWatcher.prototype._getName = function () {
      return this._steps[this._steps.length - 1];
    };

    FSWatcher.prototype.start = function (path, persistent, recursive, encoding) {
      if (persistent === void 0) {
        persistent = true;
      }

      if (recursive === void 0) {
        recursive = false;
      }

      if (encoding === void 0) {
        encoding = encoding_1.ENCODING_UTF8;
      }

      this._filename = pathToFilename(path);
      this._steps = filenameToSteps(this._filename);
      this._filenameEncoded = (0, encoding_1.strToEncoding)(this._filename); // this._persistent = persistent;

      this._recursive = recursive;
      this._encoding = encoding;

      try {
        this._link = this._vol.getLinkOrThrow(this._filename, "FSWatcher");
      } catch (err) {
        var error = new Error("watch " + this._filename + " " + err.code);
        error.code = err.code;
        error.errno = err.code;
        throw error;
      }

      this._link.getNode().on("change", this._onNodeChange);

      this._link.on("child:add", this._onNodeChange);

      this._link.on("child:delete", this._onNodeChange);

      var parent = this._link.parent;

      if (parent) {
        // parent.on('child:add', this._onParentChild);
        parent.setMaxListeners(parent.getMaxListeners() + 1);
        parent.on("child:delete", this._onParentChild);
      }

      if (persistent) this._persist();
    };

    FSWatcher.prototype.close = function () {
      clearTimeout(this._timer);

      this._link.getNode().removeListener("change", this._onNodeChange);

      var parent = this._link.parent;

      if (parent) {
        // parent.removeListener('child:add', this._onParentChild);
        parent.removeListener("child:delete", this._onParentChild);
      }
    };

    return FSWatcher;
  }(events_1.EventEmitter);

  exports$4.FSWatcher = FSWatcher;
  return exports$4;
}

var exports$3 = {},
    _dewExec$1 = false;
function dew$1() {
  if (_dewExec$1) return exports$3;
  _dewExec$1 = true;
  Object.defineProperty(exports$3, "__esModule", {
    value: true
  });
  exports$3.fsAsyncMethods = exports$3.fsSyncMethods = exports$3.fsProps = void 0;
  var fsProps = ["constants", "F_OK", "R_OK", "W_OK", "X_OK", "Stats"];
  exports$3.fsProps = fsProps;
  var fsSyncMethods = ["renameSync", "ftruncateSync", "truncateSync", "chownSync", "fchownSync", "lchownSync", "chmodSync", "fchmodSync", "lchmodSync", "statSync", "lstatSync", "fstatSync", "linkSync", "symlinkSync", "readlinkSync", "realpathSync", "unlinkSync", "rmdirSync", "mkdirSync", "mkdirpSync", "readdirSync", "closeSync", "openSync", "utimesSync", "futimesSync", "fsyncSync", "writeSync", "readSync", "readFileSync", "writeFileSync", "appendFileSync", "existsSync", "accessSync", "fdatasyncSync", "mkdtempSync", "copyFileSync", "createReadStream", "createWriteStream"];
  exports$3.fsSyncMethods = fsSyncMethods;
  var fsAsyncMethods = ["rename", "ftruncate", "truncate", "chown", "fchown", "lchown", "chmod", "fchmod", "lchmod", "stat", "lstat", "fstat", "link", "symlink", "readlink", "realpath", "unlink", "rmdir", "mkdir", "mkdirp", "readdir", "close", "open", "utimes", "futimes", "fsync", "write", "read", "readFile", "writeFile", "appendFile", "exists", "access", "fdatasync", "mkdtemp", "copyFile", "watchFile", "unwatchFile", "watch"];
  exports$3.fsAsyncMethods = fsAsyncMethods;
  return exports$3;
}

var exports$2 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$2;
  _dewExec = true;

  var __assign = exports$2 && exports$2.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];

        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }

      return t;
    };

    return __assign.apply(this, arguments);
  };

  Object.defineProperty(exports$2, "__esModule", {
    value: true
  });
  exports$2.fs = exports$2.createFsFromVolume = exports$2.vol = exports$2.Volume = void 0;

  var Stats_1 = dew$d();

  var Dirent_1 = dew$9();

  var volume_1 = dew$2();

  var _a = dew$1(),
      fsSyncMethods = _a.fsSyncMethods,
      fsAsyncMethods = _a.fsAsyncMethods;

  var constants_1 = dew$f();

  var F_OK = constants_1.constants.F_OK,
      R_OK = constants_1.constants.R_OK,
      W_OK = constants_1.constants.W_OK,
      X_OK = constants_1.constants.X_OK;
  exports$2.Volume = volume_1.Volume; // Default volume.

  exports$2.vol = new volume_1.Volume();

  function createFsFromVolume(vol) {
    var fs = {
      F_OK: F_OK,
      R_OK: R_OK,
      W_OK: W_OK,
      X_OK: X_OK,
      constants: constants_1.constants,
      Stats: Stats_1.default,
      Dirent: Dirent_1.default
    }; // Bind FS methods.

    for (var _i = 0, fsSyncMethods_1 = fsSyncMethods; _i < fsSyncMethods_1.length; _i++) {
      var method = fsSyncMethods_1[_i];
      if (typeof vol[method] === "function") fs[method] = vol[method].bind(vol);
    }

    for (var _a = 0, fsAsyncMethods_1 = fsAsyncMethods; _a < fsAsyncMethods_1.length; _a++) {
      var method = fsAsyncMethods_1[_a];
      if (typeof vol[method] === "function") fs[method] = vol[method].bind(vol);
    }

    fs.StatWatcher = vol.StatWatcher;
    fs.FSWatcher = vol.FSWatcher;
    fs.WriteStream = vol.WriteStream;
    fs.ReadStream = vol.ReadStream;
    fs.promises = vol.promises;
    fs._toUnixTimestamp = volume_1.toUnixTimestamp;
    return fs;
  }

  exports$2.createFsFromVolume = createFsFromVolume;
  exports$2.fs = createFsFromVolume(exports$2.vol);
  exports$2 = __assign(__assign({}, exports$2), exports$2.fs);
  exports$2.semantic = true;
  return exports$2;
}

const exports$1 = dew();
exports$1['__esModule']; exports$1['fs']; exports$1['createFsFromVolume']; exports$1['vol']; exports$1['Volume']; exports$1['semantic'];

const exports = dew$2();
exports['__esModule']; exports['FSWatcher']; exports['StatWatcher']; exports['Volume']; exports['toUnixTimestamp']; exports['bufferToEncoding']; exports['dataToBuffer']; exports['dataToStr']; exports['pathToSteps']; exports['filenameToSteps']; exports['pathToFilename']; exports['flagsToNumber']; exports['FLAGS']; exports['ReadStream']; exports['WriteStream'];

const { vol, createFsFromVolume } = exports$1;

function unimplemented(name) {
  throw new Error(`Node.js fs ${name} is not supported by JSPM core in the browser`);
}

vol.fromNestedJSON({
  '/dev': { stdin: '', stdout: '', stderr: '' },
  '/usr/bin': {},
  '/home': {},
  '/tmp': {},
});

vol.releasedFds = [2, 1, 0];
vol.openSync('/dev/stdin', 'w');
vol.openSync('/dev/stdout', 'r');
vol.openSync('/dev/stderr', 'r');
watchStdo('/dev/stdout', 1, console.log);
watchStdo('/dev/stderr', 2, console.error);
function watchStdo(path, fd, listener) {
  let oldSize = 0;
  const decoder = new TextDecoder();
  vol.watch(path, 'utf8', () => {
    const { size } = vol.fstatSync(fd);
    const buf = Buffer.alloc(size - oldSize);
    vol.readSync(fd, buf, 0, buf.length, oldSize);
    oldSize = size;
    listener(decoder.decode(buf, { stream: true }));
  });
}

const fs = createFsFromVolume(vol);

fs.opendir = () => unimplemented('opendir');
fs.opendirSync = () => unimplemented('opendirSync');
fs.promises.opendir = () => unimplemented('promises.opendir');
fs.cp = () => unimplemented('cp');
fs.cpSync = () => unimplemented('cpSync');
fs.promises.cp = () => unimplemented('promises.cp');
fs.readv = () => unimplemented('readv');
fs.readvSync = () => unimplemented('readvSync');
fs.rm = () => unimplemented('rm');
fs.rmSync = () => unimplemented('rmSync');
fs.promises.rm = () => unimplemented('promises.rm');
fs.Dir = () => unimplemented('Dir');
fs.promises.watch = () => unimplemented('promises.watch');

fs.FileReadStream = fs.ReadStream;
fs.FileWriteStream = fs.WriteStream;

function handleFsUrl (url, isSync) {
  if (url.protocol === 'file:')
    return fileURLToPath(url);
  if (url.protocol === 'https:' || url.protocol === 'http:') {
    const path = '\\\\url\\' + url.href.replaceAll(/\//g, '\\\\');
    if (existsSync(path))
      return path;
    if (isSync)
      throw new Error(`Cannot sync request URL ${url} via FS. JSPM FS support for network URLs requires using async FS methods or priming the MemFS cache first with an async request before a sync request.`);
    return (async () => {
      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`Unable to fetch ${url.href}, ${res.status}`);
      const buf = await res.arrayBuffer();
      writeFileSync(path, Buffer.from(buf));
      return path;
    })();
  }
  throw new Error('URL ' + url + ' not supported in JSPM FS implementation.');
}

function wrapFsSync (fn) {
  return function (path, ...args) {
    if (path instanceof URL)
      return fn(handleFsUrl(path, true), ...args);
    return fn(path, ...args);
  };
}

function wrapFsPromise (fn) {
  return async function (path, ...args) {
    if (path instanceof URL)
      return fn(await handleFsUrl(path), ...args);
    return fn(path, ...args);
  };
}

function wrapFsCallback (fn) {
  return function (path, ...args) {
    const cb = args[args.length - 1];
    if (path instanceof URL && typeof cb === 'function') {
      handleFsUrl(path).then(path => {
        fn(path, ...args);
      }, cb);
    }
    else {
      fn(path, ...args);
    }
  }; 
}

fs.promises.readFile = wrapFsPromise(fs.promises.readFile);
fs.readFile = wrapFsCallback(fs.readFile);
fs.readFileSync = wrapFsSync(fs.readFileSync);

const {
  appendFile,
  appendFileSync,
  access,
  accessSync,
  chown,
  chownSync,
  chmod,
  chmodSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  cp,
  cpSync,
  createReadStream,
  createWriteStream,
  exists,
  existsSync,
  fchown,
  fchownSync,
  fchmod,
  fchmodSync,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  lchown,
  lchownSync,
  lchmod,
  lchmodSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  opendir,
  opendirSync,
  readdir,
  readdirSync,
  read,
  readSync,
  readv,
  readvSync,
  readFile,
  readFileSync,
  readlink,
  readlinkSync,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rm,
  rmSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unwatchFile,
  unlink,
  unlinkSync,
  utimes,
  utimesSync,
  watch,
  watchFile,
  writeFile,
  writeFileSync,
  write,
  writeSync,
  writev,
  writevSync,
  Dir,
  Dirent,
  Stats,
  ReadStream,
  WriteStream,
  FileReadStream,
  FileWriteStream,
  _toUnixTimestamp,
  constants: { F_OK, R_OK, W_OK, X_OK },
  constants,
  promises,
} = fs;

export { Dir, Dirent, F_OK, FileReadStream, FileWriteStream, R_OK, ReadStream, Stats, W_OK, WriteStream, X_OK, _toUnixTimestamp, access, accessSync, appendFile, appendFileSync, chmod, chmodSync, chown, chownSync, close, closeSync, constants, copyFile, copyFileSync, cp, cpSync, createReadStream, createWriteStream, fs as default, exists, existsSync, fchmod, fchmodSync, fchown, fchownSync, fdatasync, fdatasyncSync, fstat, fstatSync, fsync, fsyncSync, ftruncate, ftruncateSync, futimes, futimesSync, lchmod, lchmodSync, lchown, lchownSync, link, linkSync, lstat, lstatSync, mkdir, mkdirSync, mkdtemp, mkdtempSync, open, openSync, opendir, opendirSync, promises, read, readFile, readFileSync, readSync, readdir, readdirSync, readlink, readlinkSync, readv, readvSync, realpath, realpathSync, rename, renameSync, rm, rmSync, rmdir, rmdirSync, stat, statSync, symlink, symlinkSync, truncate, truncateSync, unlink, unlinkSync, unwatchFile, utimes, utimesSync, watch, watchFile, write, writeFile, writeFileSync, writeSync, writev, writevSync };
