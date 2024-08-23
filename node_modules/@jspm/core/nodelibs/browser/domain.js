import './events.js';
import { y } from './chunk-4bd36a8f.js';

var exports$1 = {},
    _dewExec = false;
function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  exports$1 = function () {
    // Import Events
    var events = y; // Export Domain

    var domain = {};

    domain.createDomain = domain.create = function () {
      var d = new events.EventEmitter();

      function emitError(e) {
        d.emit("error", e);
      }

      d.add = function (emitter) {
        emitter.on("error", emitError);
      };

      d.remove = function (emitter) {
        emitter.removeListener("error", emitError);
      };

      d.bind = function (fn) {
        return function () {
          var args = Array.prototype.slice.call(arguments);

          try {
            fn.apply(null, args);
          } catch (err) {
            emitError(err);
          }
        };
      };

      d.intercept = function (fn) {
        return function (err) {
          if (err) {
            emitError(err);
          } else {
            var args = Array.prototype.slice.call(arguments, 1);

            try {
              fn.apply(null, args);
            } catch (err) {
              emitError(err);
            }
          }
        };
      };

      d.run = function (fn) {
        try {
          fn();
        } catch (err) {
          emitError(err);
        }

        return this;
      };

      d.dispose = function () {
        this.removeAllListeners();
        return this;
      };

      d.enter = d.exit = function () {
        return this;
      };

      return d;
    };

    return domain;
  }.call(exports$1);

  return exports$1;
}

const exports = dew();

var create = exports.create;
var createDomain = exports.createDomain;

export { create, createDomain, exports as default };
