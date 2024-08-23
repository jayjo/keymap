import './events.js';
import { a as dew$1, c as dew$2, e as dew$3, f as dew$4, g as dew$5, h as dew$6, i as dew$7, d as dew$8 } from './chunk-44e51b61.js';
import { y } from './chunk-4bd36a8f.js';

var exports$1 = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;
  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  exports$1 = Stream;
  var EE = y.EventEmitter;

  var inherits = dew$8();

  inherits(Stream, EE);
  Stream.Readable = dew$1();
  Stream.Writable = dew$2();
  Stream.Duplex = dew$3();
  Stream.Transform = dew$4();
  Stream.PassThrough = dew$5();
  Stream.finished = dew$6();
  Stream.pipeline = dew$7(); // Backwards-compat with node 0.4.x

  Stream.Stream = Stream; // old-style streams.  Note that the pipe method (the only relevant
  // part of this class) is overridden in the Readable class.

  function Stream() {
    EE.call(this || _global);
  }

  Stream.prototype.pipe = function (dest, options) {
    var source = this || _global;

    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) {
          source.pause();
        }
      }
    }

    source.on("data", ondata);

    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }

    dest.on("drain", ondrain); // If the 'end' option is not supplied, dest.end() will be called when
    // source gets the 'end' or 'close' events.  Only dest.end() once.

    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }

    var didOnEnd = false;

    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }

    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === "function") dest.destroy();
    } // don't leave dangling pipes when there are errors.


    function onerror(er) {
      cleanup();

      if (EE.listenerCount(this || _global, "error") === 0) {
        throw er; // Unhandled stream error in pipe.
      }
    }

    source.on("error", onerror);
    dest.on("error", onerror); // remove all the event listeners that were added.

    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }

    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source); // Allow for unix-like usage: A.pipe(B).pipe(C)

    return dest;
  };

  return exports$1;
}

const exports = dew();

export { exports as e };
