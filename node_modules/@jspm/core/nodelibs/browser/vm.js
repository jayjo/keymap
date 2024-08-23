var exports$1 = {},
    _dewExec = false;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

function dew() {
  if (_dewExec) return exports$1;
  _dewExec = true;

  var indexOf = function (xs, item) {
    if (xs.indexOf) return xs.indexOf(item);else for (var i = 0; i < xs.length; i++) {
      if (xs[i] === item) return i;
    }
    return -1;
  };

  var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj);else {
      var res = [];

      for (var key in obj) res.push(key);

      return res;
    }
  };

  var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
      fn(xs[i], i, xs);
    }
  };

  var defineProp = function () {
    try {
      Object.defineProperty({}, "_", {});
      return function (obj, name, value) {
        Object.defineProperty(obj, name, {
          writable: true,
          enumerable: false,
          configurable: true,
          value: value
        });
      };
    } catch (e) {
      return function (obj, name, value) {
        obj[name] = value;
      };
    }
  }();

  var globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];

  function Context() {}

  Context.prototype = {};

  var Script = exports$1.Script = function NodeScript(code) {
    if (!((this || _global) instanceof Script)) return new Script(code);
    (this || _global).code = code;
  };

  Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
      throw new TypeError("needs a 'context' argument.");
    }

    var iframe = document.createElement("iframe");
    if (!iframe.style) iframe.style = {};
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var win = iframe.contentWindow;
    var wEval = win.eval,
        wExecScript = win.execScript;

    if (!wEval && wExecScript) {
      // win.eval() magically appears when this is called in IE:
      wExecScript.call(win, "null");
      wEval = win.eval;
    }

    forEach(Object_keys(context), function (key) {
      win[key] = context[key];
    });
    forEach(globals, function (key) {
      if (context[key]) {
        win[key] = context[key];
      }
    });
    var winKeys = Object_keys(win);
    var res = wEval.call(win, (this || _global).code);
    forEach(Object_keys(win), function (key) {
      // Avoid copying circular objects like `top` and `window` by only
      // updating existing context properties or new properties in the `win`
      // that was only introduced after the eval.
      if (key in context || indexOf(winKeys, key) === -1) {
        context[key] = win[key];
      }
    });
    forEach(globals, function (key) {
      if (!(key in context)) {
        defineProp(context, key, win[key]);
      }
    });
    document.body.removeChild(iframe);
    return res;
  };

  Script.prototype.runInThisContext = function () {
    return eval((this || _global).code); // maybe...
  };

  Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    if (context) {
      forEach(Object_keys(ctx), function (key) {
        context[key] = ctx[key];
      });
    }

    return res;
  };

  forEach(Object_keys(Script.prototype), function (name) {
    exports$1[name] = Script[name] = function (code) {
      var s = Script(code);
      return s[name].apply(s, [].slice.call(arguments, 1));
    };
  });

  exports$1.isContext = function (context) {
    return context instanceof Context;
  };

  exports$1.createScript = function (code) {
    return exports$1.Script(code);
  };

  exports$1.createContext = Script.createContext = function (context) {
    var copy = new Context();

    if (typeof context === "object") {
      forEach(Object_keys(context), function (key) {
        copy[key] = context[key];
      });
    }

    return copy;
  };

  return exports$1;
}

const exports = dew();
exports['Script']; exports['isContext']; exports['createScript']; exports['createContext'];

var Script = exports.Script;
var createContext = exports.createContext;
var createScript = exports.createScript;
var isContext = exports.isContext;
var runInContext = exports.runInContext;
var runInNewContext = exports.runInNewContext;
var runInThisContext = exports.runInThisContext;

export { Script, createContext, createScript, exports as default, isContext, runInContext, runInNewContext, runInThisContext };
