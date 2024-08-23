import './util.js';
import et from './assert.js';
import { X } from './chunk-b4205b57.js';
import './chunk-ce0fbc82.js';
import './chunk-5decc758.js';

var exports$1 = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  /*global window, global*/
  var util = X;
  var assert = et;

  function now() {
    return new Date().getTime();
  }

  var slice = Array.prototype.slice;
  var console;
  var times = {};

  if (typeof _global !== "undefined" && _global.console) {
    console = _global.console;
  } else if (typeof window !== "undefined" && window.console) {
    console = window.console;
  } else {
    console = {};
  }

  var functions = [[log, "log"], [info, "info"], [warn, "warn"], [error, "error"], [time, "time"], [timeEnd, "timeEnd"], [trace, "trace"], [dir, "dir"], [consoleAssert, "assert"]];

  for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i];
    var f = tuple[0];
    var name = tuple[1];

    if (!console[name]) {
      console[name] = f;
    }
  }

  exports$1 = console;

  function log() {}

  function info() {
    console.log.apply(console, arguments);
  }

  function warn() {
    console.log.apply(console, arguments);
  }

  function error() {
    console.warn.apply(console, arguments);
  }

  function time(label) {
    times[label] = now();
  }

  function timeEnd(label) {
    var time = times[label];

    if (!time) {
      throw new Error("No such label: " + label);
    }

    delete times[label];
    var duration = now() - time;
    console.log(label + ": " + duration + "ms");
  }

  function trace() {
    var err = new Error();
    err.name = "Trace";
    err.message = util.format.apply(null, arguments);
    console.error(err.stack);
  }

  function dir(object) {
    console.log(util.inspect(object) + "\n");
  }

  function consoleAssert(expression) {
    if (!expression) {
      var arr = slice.call(arguments, 1);
      assert.ok(false, util.format.apply(null, arr));
    }
  }

  return exports$1;
}

const exports = dew();

var assert = exports.assert;
var clear = exports.clear;
var context = exports.context;
var count = exports.count;
var countReset = exports.countReset;
var debug = exports.debug;
var dir = exports.dir;
var dirxml = exports.dirxml;
var error = exports.error;
var group = exports.group;
var groupCollapsed = exports.groupCollapsed;
var groupEnd = exports.groupEnd;
var info = exports.info;
var log = exports.log;
var memory = exports.memory;
var profile = exports.profile;
var profileEnd = exports.profileEnd;
var table = exports.table;
var time = exports.time;
var timeEnd = exports.timeEnd;
var timeStamp = exports.timeStamp;
var trace = exports.trace;
var warn = exports.warn;

export { assert, clear, context, count, countReset, debug, exports as default, dir, dirxml, error, group, groupCollapsed, groupEnd, info, log, memory, profile, profileEnd, table, time, timeEnd, timeStamp, trace, warn };
