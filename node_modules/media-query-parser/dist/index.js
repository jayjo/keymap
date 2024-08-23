/*! @license MediaQueryParser - MIT License - Tom Golden (github@tbjgolden.com) */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

var weirdNewlines = /(\u000D|\u000C|\u000D\u000A)/g;
var nullOrSurrogates = /[\u0000\uD800-\uDFFF]/g;
var commentRegex = /(\/\*)[\s\S]*?(\*\/)/g;
var lexicalAnalysis = function lexicalAnalysis(str, index) {
  if (index === void 0) {
    index = 0;
  }

  str = str.replace(weirdNewlines, '\n').replace(nullOrSurrogates, "\uFFFD");
  str = str.replace(commentRegex, '');
  var tokens = [];

  for (; index < str.length; index += 1) {
    var code = str.charCodeAt(index);

    if (code === 0x0009 || code === 0x0020 || code === 0x000a) {
      var code_1 = str.charCodeAt(++index);

      while (code_1 === 0x0009 || code_1 === 0x0020 || code_1 === 0x000a) {
        code_1 = str.charCodeAt(++index);
      }

      index -= 1;
      tokens.push({
        type: '<whitespace-token>'
      });
    } else if (code === 0x0022) {
      var result = consumeString(str, index);

      if (result === null) {
        return null;
      }

      var _a = __read(result, 2),
          lastIndex = _a[0],
          value = _a[1];

      tokens.push({
        type: '<string-token>',
        value: value
      });
      index = lastIndex;
    } else if (code === 0x0023) {
      if (index + 1 < str.length) {
        var nextCode = str.charCodeAt(index + 1);

        if (nextCode === 0x005f || nextCode >= 0x0041 && nextCode <= 0x005a || nextCode >= 0x0061 && nextCode <= 0x007a || nextCode >= 0x0080 || nextCode >= 0x0030 && nextCode <= 0x0039 || nextCode === 0x005c && index + 2 < str.length && str.charCodeAt(index + 2) !== 0x000a) {
          var flag = wouldStartIdentifier(str, index + 1) ? 'id' : 'unrestricted';
          var result = consumeIdentUnsafe(str, index + 1);

          if (result !== null) {
            var _b = __read(result, 2),
                lastIndex = _b[0],
                value = _b[1];

            tokens.push({
              type: '<hash-token>',
              value: value.toLowerCase(),
              flag: flag
            });
            index = lastIndex;
            continue;
          }
        }
      }

      tokens.push({
        type: '<delim-token>',
        value: code
      });
    } else if (code === 0x0027) {
      var result = consumeString(str, index);

      if (result === null) {
        return null;
      }

      var _c = __read(result, 2),
          lastIndex = _c[0],
          value = _c[1];

      tokens.push({
        type: '<string-token>',
        value: value
      });
      index = lastIndex;
    } else if (code === 0x0028) {
      tokens.push({
        type: '<(-token>'
      });
    } else if (code === 0x0029) {
      tokens.push({
        type: '<)-token>'
      });
    } else if (code === 0x002b) {
      var plusNumeric = consumeNumeric(str, index);

      if (plusNumeric === null) {
        tokens.push({
          type: '<delim-token>',
          value: code
        });
      } else {
        var _d = __read(plusNumeric, 2),
            lastIndex = _d[0],
            tokenTuple = _d[1];

        if (tokenTuple[0] === '<dimension-token>') {
          tokens.push({
            type: '<dimension-token>',
            value: tokenTuple[1],
            unit: tokenTuple[2].toLowerCase(),
            flag: 'number'
          });
        } else if (tokenTuple[0] === '<number-token>') {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: tokenTuple[2]
          });
        } else {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: 'number'
          });
        }

        index = lastIndex;
      }
    } else if (code === 0x002c) {
      tokens.push({
        type: '<comma-token>'
      });
    } else if (code === 0x002d) {
      var minusNumeric = consumeNumeric(str, index);

      if (minusNumeric !== null) {
        var _e = __read(minusNumeric, 2),
            lastIndex = _e[0],
            tokenTuple = _e[1];

        if (tokenTuple[0] === '<dimension-token>') {
          tokens.push({
            type: '<dimension-token>',
            value: tokenTuple[1],
            unit: tokenTuple[2].toLowerCase(),
            flag: 'number'
          });
        } else if (tokenTuple[0] === '<number-token>') {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: tokenTuple[2]
          });
        } else {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: 'number'
          });
        }

        index = lastIndex;
        continue;
      }

      if (index + 2 < str.length) {
        var nextCode = str.charCodeAt(index + 1);
        var nextNextCode = str.charCodeAt(index + 2);

        if (nextCode === 0x002d && nextNextCode === 0x003e) {
          tokens.push({
            type: '<CDC-token>'
          });
          index += 2;
          continue;
        }
      }

      var result = consumeIdentLike(str, index);

      if (result !== null) {
        var _f = __read(result, 3),
            lastIndex = _f[0],
            value = _f[1],
            type = _f[2];

        tokens.push({
          type: type,
          value: value
        });
        index = lastIndex;
        continue;
      }

      tokens.push({
        type: '<delim-token>',
        value: code
      });
    } else if (code === 0x002e) {
      var minusNumeric = consumeNumeric(str, index);

      if (minusNumeric === null) {
        tokens.push({
          type: '<delim-token>',
          value: code
        });
      } else {
        var _g = __read(minusNumeric, 2),
            lastIndex = _g[0],
            tokenTuple = _g[1];

        if (tokenTuple[0] === '<dimension-token>') {
          tokens.push({
            type: '<dimension-token>',
            value: tokenTuple[1],
            unit: tokenTuple[2].toLowerCase(),
            flag: 'number'
          });
        } else if (tokenTuple[0] === '<number-token>') {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: tokenTuple[2]
          });
        } else {
          tokens.push({
            type: tokenTuple[0],
            value: tokenTuple[1],
            flag: 'number'
          });
        }

        index = lastIndex;
        continue;
      }
    } else if (code === 0x003a) {
      tokens.push({
        type: '<colon-token>'
      });
    } else if (code === 0x003b) {
      tokens.push({
        type: '<semicolon-token>'
      });
    } else if (code === 0x003c) {
      if (index + 3 < str.length) {
        var nextCode = str.charCodeAt(index + 1);
        var nextNextCode = str.charCodeAt(index + 2);
        var nextNextNextCode = str.charCodeAt(index + 3);

        if (nextCode === 0x0021 && nextNextCode === 0x002d && nextNextNextCode === 0x002d) {
          tokens.push({
            type: '<CDO-token>'
          });
          index += 3;
          continue;
        }
      }

      tokens.push({
        type: '<delim-token>',
        value: code
      });
    } else if (code === 0x0040) {
      var result = consumeIdent(str, index + 1);

      if (result !== null) {
        var _h = __read(result, 2),
            lastIndex = _h[0],
            value = _h[1];

        tokens.push({
          type: '<at-keyword-token>',
          value: value.toLowerCase()
        });
        index = lastIndex;
        continue;
      }

      tokens.push({
        type: '<delim-token>',
        value: code
      });
    } else if (code === 0x005b) {
      tokens.push({
        type: '<[-token>'
      });
    } else if (code === 0x005c) {
      var result = consumeEscape(str, index);

      if (result === null) {
        return null;
      }

      var _j = __read(result, 2),
          lastIndex = _j[0],
          value = _j[1];

      str = str.slice(0, index) + value + str.slice(lastIndex + 1);
      index -= 1;
    } else if (code === 0x005d) {
      tokens.push({
        type: '<]-token>'
      });
    } else if (code === 0x007b) {
      tokens.push({
        type: '<{-token>'
      });
    } else if (code === 0x007d) {
      tokens.push({
        type: '<}-token>'
      });
    } else if (code >= 0x0030 && code <= 0x0039) {
      var result = consumeNumeric(str, index);

      var _k = __read(result, 2),
          lastIndex = _k[0],
          tokenTuple = _k[1];

      if (tokenTuple[0] === '<dimension-token>') {
        tokens.push({
          type: '<dimension-token>',
          value: tokenTuple[1],
          unit: tokenTuple[2].toLowerCase(),
          flag: 'number'
        });
      } else if (tokenTuple[0] === '<number-token>') {
        tokens.push({
          type: tokenTuple[0],
          value: tokenTuple[1],
          flag: tokenTuple[2]
        });
      } else {
        tokens.push({
          type: tokenTuple[0],
          value: tokenTuple[1],
          flag: 'number'
        });
      }

      index = lastIndex;
    } else if (code === 0x005f || code >= 0x0041 && code <= 0x005a || code >= 0x0061 && code <= 0x007a || code >= 0x0080) {
      var result = consumeIdentLike(str, index);

      if (result === null) {
        return null;
      }

      var _l = __read(result, 3),
          lastIndex = _l[0],
          value = _l[1],
          type = _l[2];

      tokens.push({
        type: type,
        value: value
      });
      index = lastIndex;
    } else {
      tokens.push({
        type: '<delim-token>',
        value: code
      });
    }
  }

  tokens.push({
    type: '<EOF-token>'
  });
  return tokens;
};
var consumeString = function consumeString(str, index) {
  if (str.length <= index + 1) return null;
  var firstCode = str.charCodeAt(index);
  var charCodes = [];

  for (var i = index + 1; i < str.length; i += 1) {
    var code = str.charCodeAt(i);

    if (code === firstCode) {
      return [i, String.fromCharCode.apply(null, charCodes)];
    } else if (code === 0x005c) {
      var result = consumeEscape(str, i);
      if (result === null) return null;

      var _a = __read(result, 2),
          lastIndex = _a[0],
          charCode = _a[1];

      charCodes.push(charCode);
      i = lastIndex;
    } else if (code === 0x000a) {
      return null;
    } else {
      charCodes.push(code);
    }
  }

  return null;
};
var wouldStartIdentifier = function wouldStartIdentifier(str, index) {
  if (str.length <= index) return false;
  var code = str.charCodeAt(index);

  if (code === 0x002d) {
    if (str.length <= index + 1) return false;
    var nextCode = str.charCodeAt(index + 1);

    if (nextCode === 0x002d || nextCode === 0x005f || nextCode >= 0x0041 && nextCode <= 0x005a || nextCode >= 0x0061 && nextCode <= 0x007a || nextCode >= 0x0080) {
      return true;
    } else if (nextCode === 0x005c) {
      if (str.length <= index + 2) return false;
      var nextNextCode = str.charCodeAt(index + 2);
      return nextNextCode !== 0x000a;
    } else {
      return false;
    }
  } else if (code === 0x005f || code >= 0x0041 && code <= 0x005a || code >= 0x0061 && code <= 0x007a || code >= 0x0080) {
    return true;
  } else if (code === 0x005c) {
    if (str.length <= index + 1) return false;
    var nextCode = str.charCodeAt(index + 1);
    return nextCode !== 0x000a;
  } else {
    return false;
  }
};
var consumeEscape = function consumeEscape(str, index) {
  if (str.length <= index + 1) return null;
  if (str.charCodeAt(index) !== 0x005c) return null;
  var code = str.charCodeAt(index + 1);

  if (code === 0x000a) {
    return null;
  } else if (code >= 0x0030 && code <= 0x0039 || code >= 0x0041 && code <= 0x0046 || code >= 0x0061 && code <= 0x0066) {
    var hexCharCodes = [code];
    var min = Math.min(index + 7, str.length);
    var i = index + 2;

    for (; i < min; i += 1) {
      var code_2 = str.charCodeAt(i);

      if (code_2 >= 0x0030 && code_2 <= 0x0039 || code_2 >= 0x0041 && code_2 <= 0x0046 || code_2 >= 0x0061 && code_2 <= 0x0066) {
        hexCharCodes.push(code_2);
      } else {
        break;
      }
    }

    if (i < str.length) {
      var code_3 = str.charCodeAt(i);

      if (code_3 === 0x0009 || code_3 === 0x0020 || code_3 === 0x000a) {
        i += 1;
      }
    }

    return [i - 1, parseInt(String.fromCharCode.apply(null, hexCharCodes), 16)];
  } else {
    return [index + 1, code];
  }
};
var consumeNumeric = function consumeNumeric(str, index) {
  var numberResult = consumeNumber(str, index);
  if (numberResult === null) return null;

  var _a = __read(numberResult, 3),
      numberEndIndex = _a[0],
      numberValue = _a[1],
      numberFlag = _a[2];

  var identResult = consumeIdent(str, numberEndIndex + 1);

  if (identResult !== null) {
    var _b = __read(identResult, 2),
        identEndIndex = _b[0],
        identValue = _b[1];

    return [identEndIndex, ['<dimension-token>', numberValue, identValue]];
  }

  if (numberEndIndex + 1 < str.length && str.charCodeAt(numberEndIndex + 1) === 0x0025) {
    return [numberEndIndex + 1, ['<percentage-token>', numberValue]];
  }

  return [numberEndIndex, ['<number-token>', numberValue, numberFlag]];
};
var consumeNumber = function consumeNumber(str, index) {
  if (str.length <= index) return null;
  var flag = 'integer';
  var numberChars = [];
  var firstCode = str.charCodeAt(index);

  if (firstCode === 0x002b || firstCode === 0x002d) {
    index += 1;
    if (firstCode === 0x002d) numberChars.push(0x002d);
  }

  while (index < str.length) {
    var code = str.charCodeAt(index);

    if (code >= 0x0030 && code <= 0x0039) {
      numberChars.push(code);
      index += 1;
    } else {
      break;
    }
  }

  if (index + 1 < str.length) {
    var nextCode = str.charCodeAt(index);
    var nextNextCode = str.charCodeAt(index + 1);

    if (nextCode === 0x002e && nextNextCode >= 0x0030 && nextNextCode <= 0x0039) {
      numberChars.push(nextCode, nextNextCode);
      flag = 'number';
      index += 2;

      while (index < str.length) {
        var code = str.charCodeAt(index);

        if (code >= 0x0030 && code <= 0x0039) {
          numberChars.push(code);
          index += 1;
        } else {
          break;
        }
      }
    }
  }

  if (index + 1 < str.length) {
    var nextCode = str.charCodeAt(index);
    var nextNextCode = str.charCodeAt(index + 1);
    var nextNextNextCode = str.charCodeAt(index + 2);

    if (nextCode === 0x0045 || nextCode === 0x0065) {
      var nextNextIsDigit = nextNextCode >= 0x0030 && nextNextCode <= 0x0039;

      if (nextNextIsDigit || (nextNextCode === 0x002b || nextNextCode === 0x002d) && nextNextNextCode >= 0x0030 && nextNextNextCode <= 0x0039) {
        flag = 'number';

        if (nextNextIsDigit) {
          numberChars.push(0x0045, nextNextCode);
          index += 2;
        } else if (nextNextCode === 0x002d) {
          numberChars.push(0x0045, 0x002d, nextNextNextCode);
          index += 3;
        } else {
          numberChars.push(0x0045, nextNextNextCode);
          index += 3;
        }

        while (index < str.length) {
          var code = str.charCodeAt(index);

          if (code >= 0x0030 && code <= 0x0039) {
            numberChars.push(code);
            index += 1;
          } else {
            break;
          }
        }
      }
    }
  }

  var numberString = String.fromCharCode.apply(null, numberChars);
  var value = flag === 'number' ? parseFloat(numberString) : parseInt(numberString);
  if (value === -0) value = 0;
  return Number.isNaN(value) ? null : [index - 1, value, flag];
};
var consumeIdentUnsafe = function consumeIdentUnsafe(str, index) {
  if (str.length <= index) {
    return null;
  }

  var identChars = [];

  for (var code = str.charCodeAt(index); index < str.length; code = str.charCodeAt(++index)) {
    if (code === 0x002d || code === 0x005f || code >= 0x0041 && code <= 0x005a || code >= 0x0061 && code <= 0x007a || code >= 0x0080 || code >= 0x0030 && code <= 0x0039) {
      identChars.push(code);
      continue;
    } else {
      var result = consumeEscape(str, index);

      if (result !== null) {
        var _a = __read(result, 2),
            lastIndex = _a[0],
            code_4 = _a[1];

        identChars.push(code_4);
        index = lastIndex;
        continue;
      }
    }

    break;
  }

  return index === 0 ? null : [index - 1, String.fromCharCode.apply(null, identChars)];
};
var consumeIdent = function consumeIdent(str, index) {
  if (str.length <= index || !wouldStartIdentifier(str, index)) {
    return null;
  }

  var identChars = [];

  for (var code = str.charCodeAt(index); index < str.length; code = str.charCodeAt(++index)) {
    if (code === 0x002d || code === 0x005f || code >= 0x0041 && code <= 0x005a || code >= 0x0061 && code <= 0x007a || code >= 0x0080 || code >= 0x0030 && code <= 0x0039) {
      identChars.push(code);
      continue;
    } else {
      var result = consumeEscape(str, index);

      if (result !== null) {
        var _a = __read(result, 2),
            lastIndex = _a[0],
            code_5 = _a[1];

        identChars.push(code_5);
        index = lastIndex;
        continue;
      }
    }

    break;
  }

  return [index - 1, String.fromCharCode.apply(null, identChars)];
};
var consumeUrl = function consumeUrl(str, index) {
  var code = str.charCodeAt(index);

  while (code === 0x0009 || code === 0x0020 || code === 0x000a) {
    code = str.charCodeAt(++index);
  }

  var urlChars = [];
  var hasFinishedWord = false;

  while (index < str.length) {
    if (code === 0x0029) {
      return [index, String.fromCharCode.apply(null, urlChars)];
    } else if (code === 0x0022 || code === 0x0027 || code === 0x0028) {
      return null;
    } else if (code === 0x0009 || code === 0x0020 || code === 0x000a) {
      if (!hasFinishedWord && urlChars.length !== 0) hasFinishedWord = true;
    } else if (code === 0x005c) {
      var result = consumeEscape(str, index);
      if (result === null || hasFinishedWord) return null;

      var _a = __read(result, 2),
          lastIndex = _a[0],
          value = _a[1];

      urlChars.push(value);
      index = lastIndex;
    } else {
      if (hasFinishedWord) return null;
      urlChars.push(code);
    }

    code = str.charCodeAt(++index);
  }

  return null;
};
var consumeIdentLike = function consumeIdentLike(str, index) {
  var result = consumeIdent(str, index);
  if (result === null) return null;

  var _a = __read(result, 2),
      lastIndex = _a[0],
      value = _a[1];

  if (value.toLowerCase() === 'url') {
    if (str.length > lastIndex + 1) {
      var nextCode = str.charCodeAt(lastIndex + 1);

      if (nextCode === 0x0028) {
        for (var offset = 2; lastIndex + offset < str.length; offset += 1) {
          var nextNextCode = str.charCodeAt(lastIndex + offset);

          if (nextNextCode === 0x0022 || nextNextCode === 0x0027) {
            return [lastIndex + 1, value.toLowerCase(), '<function-token>'];
          } else if (nextNextCode !== 0x0009 && nextNextCode !== 0x0020 && nextNextCode !== 0x000a) {
            var result_1 = consumeUrl(str, lastIndex + offset);
            if (result_1 === null) return null;

            var _b = __read(result_1, 2),
                lastUrlIndex = _b[0],
                value_1 = _b[1];

            return [lastUrlIndex, value_1, '<url-token>'];
          }
        }

        return [lastIndex + 1, value.toLowerCase(), '<function-token>'];
      }
    }
  } else if (str.length > lastIndex + 1) {
    var nextCode = str.charCodeAt(lastIndex + 1);

    if (nextCode === 0x0028) {
      return [lastIndex + 1, value.toLowerCase(), '<function-token>'];
    }
  }

  return [lastIndex, value.toLowerCase(), '<ident-token>'];
};

var simplifyAST = function simplifyAST(ast) {
  for (var i = ast.length - 1; i >= 0; i--) {
    ast[i] = simplifyMediaQuery(ast[i]);
  }

  return ast;
};

var simplifyMediaQuery = function simplifyMediaQuery(mediaQuery) {
  if (mediaQuery.mediaCondition === null) return mediaQuery;
  var mediaCondition = simplifyMediaCondition(mediaQuery.mediaCondition);

  if (mediaCondition.operator === null && mediaCondition.children.length === 1 && 'children' in mediaCondition.children[0]) {
    mediaCondition = mediaCondition.children[0];
  }

  return {
    mediaPrefix: mediaQuery.mediaPrefix,
    mediaType: mediaQuery.mediaType,
    mediaCondition: mediaCondition
  };
};

var simplifyMediaCondition = function simplifyMediaCondition(mediaCondition) {
  for (var i = mediaCondition.children.length - 1; i >= 0; i--) {
    var unsimplifiedChild = mediaCondition.children[i];

    if (!('context' in unsimplifiedChild)) {
      var child = simplifyMediaCondition(unsimplifiedChild);

      if (child.operator === null && child.children.length === 1) {
        mediaCondition.children[i] = child.children[0];
      } else if (child.operator === mediaCondition.operator && (child.operator === 'and' || child.operator === 'or')) {
        var spliceArgs = [i, 1];

        for (var i_1 = 0; i_1 < child.children.length; i_1++) {
          spliceArgs.push(child.children[i_1]);
        }

        mediaCondition.children.splice.apply(mediaCondition.children, spliceArgs);
      }
    }
  }

  return mediaCondition;
};

var createError = function createError(message, err) {
  if (err instanceof Error) {
    return new Error("".concat(err.message.trim(), "\n").concat(message.trim()));
  } else {
    return new Error(message.trim());
  }
};

var toAST = function toAST(str) {
  return simplifyAST(toUnflattenedAST(str));
};
var toUnflattenedAST = function toUnflattenedAST(str) {
  var tokenList = lexicalAnalysis(str.trim());

  if (tokenList === null) {
    throw createError('Failed tokenizing');
  }

  var startIndex = 0;
  var endIndex = tokenList.length - 1;

  if (tokenList[0].type === '<at-keyword-token>' && tokenList[0].value === 'media') {
    if (tokenList[1].type !== '<whitespace-token>') {
      throw createError('Expected whitespace after media');
    }

    startIndex = 2;

    for (var i = 2; i < tokenList.length - 1; i++) {
      var token = tokenList[i];

      if (token.type === '<{-token>') {
        endIndex = i;
        break;
      } else if (token.type === '<semicolon-token>') {
        throw createError("Expected '{' in media query but found ';'");
      }
    }
  }

  tokenList = tokenList.slice(startIndex, endIndex);
  return syntacticAnalysis(tokenList);
};
var removeWhitespace = function removeWhitespace(tokenList) {
  var newTokenList = [];
  var before = false;

  for (var i = 0; i < tokenList.length; i++) {
    if (tokenList[i].type === '<whitespace-token>') {
      before = true;

      if (newTokenList.length > 0) {
        newTokenList[newTokenList.length - 1].wsAfter = true;
      }
    } else {
      newTokenList.push(__assign(__assign({}, tokenList[i]), {
        wsBefore: before,
        wsAfter: false
      }));
      before = false;
    }
  }

  return newTokenList;
};
var syntacticAnalysis = function syntacticAnalysis(tokenList) {
  var e_1, _a;

  var mediaQueryList = [[]];

  for (var i = 0; i < tokenList.length; i++) {
    var token = tokenList[i];

    if (token.type === '<comma-token>') {
      mediaQueryList.push([]);
    } else {
      mediaQueryList[mediaQueryList.length - 1].push(token);
    }
  }

  var mediaQueries = mediaQueryList.map(removeWhitespace);

  if (mediaQueries.length === 1 && mediaQueries[0].length === 0) {
    return [{
      mediaCondition: null,
      mediaPrefix: null,
      mediaType: 'all'
    }];
  } else {
    var mediaQueryTokens = mediaQueries.map(function (mediaQueryTokens) {
      if (mediaQueryTokens.length === 0) {
        return null;
      } else {
        return tokenizeMediaQuery(mediaQueryTokens);
      }
    });
    var nonNullMediaQueryTokens = [];

    try {
      for (var mediaQueryTokens_1 = __values(mediaQueryTokens), mediaQueryTokens_1_1 = mediaQueryTokens_1.next(); !mediaQueryTokens_1_1.done; mediaQueryTokens_1_1 = mediaQueryTokens_1.next()) {
        var mediaQueryToken = mediaQueryTokens_1_1.value;

        if (mediaQueryToken !== null) {
          nonNullMediaQueryTokens.push(mediaQueryToken);
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (mediaQueryTokens_1_1 && !mediaQueryTokens_1_1.done && (_a = mediaQueryTokens_1["return"])) _a.call(mediaQueryTokens_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    if (nonNullMediaQueryTokens.length === 0) {
      throw createError('No valid media queries');
    }

    return nonNullMediaQueryTokens;
  }
};
var tokenizeMediaQuery = function tokenizeMediaQuery(tokens) {
  var firstToken = tokens[0];

  if (firstToken.type === '<(-token>') {
    try {
      return {
        mediaPrefix: null,
        mediaType: 'all',
        mediaCondition: tokenizeMediaCondition(tokens, true)
      };
    } catch (err) {
      throw createError("Expected media condition after '('", err);
    }
  } else if (firstToken.type === '<ident-token>') {
    var mediaPrefix = null;
    var mediaType = void 0;
    var value = firstToken.value;

    if (value === 'only' || value === 'not') {
      mediaPrefix = value;
    }

    var firstIndex = mediaPrefix === null ? 0 : 1;

    if (tokens.length <= firstIndex) {
      throw createError("Expected extra token in media query");
    }

    var firstNonUnaryToken = tokens[firstIndex];

    if (firstNonUnaryToken.type === '<ident-token>') {
      var value_1 = firstNonUnaryToken.value;

      if (value_1 === 'all') {
        mediaType = 'all';
      } else if (value_1 === 'print' || value_1 === 'screen') {
        mediaType = value_1;
      } else if (value_1 === 'tty' || value_1 === 'tv' || value_1 === 'projection' || value_1 === 'handheld' || value_1 === 'braille' || value_1 === 'embossed' || value_1 === 'aural' || value_1 === 'speech') {
        mediaPrefix = mediaPrefix === 'not' ? null : 'not';
        mediaType = 'all';
      } else {
        throw createError("Unknown ident '".concat(value_1, "' in media query"));
      }
    } else if (mediaPrefix === 'not' && firstNonUnaryToken.type === '<(-token>') {
      var tokensWithParens = [{
        type: '<(-token>',
        wsBefore: false,
        wsAfter: false
      }];
      tokensWithParens.push.apply(tokensWithParens, tokens);
      tokensWithParens.push({
        type: '<)-token>',
        wsBefore: false,
        wsAfter: false
      });

      try {
        return {
          mediaPrefix: null,
          mediaType: 'all',
          mediaCondition: tokenizeMediaCondition(tokensWithParens, true)
        };
      } catch (err) {
        throw createError("Expected media condition after '('", err);
      }
    } else {
      throw createError('Invalid media query');
    }

    if (firstIndex + 1 === tokens.length) {
      return {
        mediaPrefix: mediaPrefix,
        mediaType: mediaType,
        mediaCondition: null
      };
    } else if (firstIndex + 4 < tokens.length) {
      var secondNonUnaryToken = tokens[firstIndex + 1];

      if (secondNonUnaryToken.type === '<ident-token>' && secondNonUnaryToken.value === 'and') {
        try {
          return {
            mediaPrefix: mediaPrefix,
            mediaType: mediaType,
            mediaCondition: tokenizeMediaCondition(tokens.slice(firstIndex + 2), false)
          };
        } catch (err) {
          throw createError("Expected media condition after 'and'", err);
        }
      } else {
        throw createError("Expected 'and' after media prefix");
      }
    } else {
      throw createError('Expected media condition after media prefix');
    }
  } else {
    throw createError('Expected media condition or media prefix');
  }
};
var tokenizeMediaCondition = function tokenizeMediaCondition(tokens, mayContainOr, previousOperator) {
  if (previousOperator === void 0) {
    previousOperator = null;
  }

  if (tokens.length < 3 || tokens[0].type !== '<(-token>' || tokens[tokens.length - 1].type !== '<)-token>') {
    throw new Error('Invalid media condition');
  }

  var endIndexOfFirstFeature = tokens.length - 1;
  var maxDepth = 0;
  var count = 0;

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.type === '<(-token>') {
      count += 1;
      maxDepth = Math.max(maxDepth, count);
    } else if (token.type === '<)-token>') {
      count -= 1;
    }

    if (count === 0) {
      endIndexOfFirstFeature = i;
      break;
    }
  }

  if (count !== 0) {
    throw new Error('Mismatched parens\nInvalid media condition');
  }

  var child;
  var featureTokens = tokens.slice(0, endIndexOfFirstFeature + 1);

  if (maxDepth === 1) {
    child = tokenizeMediaFeature(featureTokens);
  } else {
    if (featureTokens[1].type === '<ident-token>' && featureTokens[1].value === 'not') {
      child = tokenizeMediaCondition(featureTokens.slice(2, -1), true, 'not');
    } else {
      child = tokenizeMediaCondition(featureTokens.slice(1, -1), true);
    }
  }

  if (endIndexOfFirstFeature === tokens.length - 1) {
    return {
      operator: previousOperator,
      children: [child]
    };
  } else {
    var nextToken = tokens[endIndexOfFirstFeature + 1];

    if (nextToken.type !== '<ident-token>') {
      throw new Error('Invalid operator\nInvalid media condition');
    } else if (previousOperator !== null && previousOperator !== nextToken.value) {
      throw new Error("'".concat(nextToken.value, "' and '").concat(previousOperator, "' must not be at same level\nInvalid media condition"));
    } else if (nextToken.value === 'or' && !mayContainOr) {
      throw new Error("Cannot use 'or' at top level of a media query\nInvalid media condition");
    } else if (nextToken.value !== 'and' && nextToken.value !== 'or') {
      throw new Error("Invalid operator: '".concat(nextToken.value, "'\nInvalid media condition"));
    }

    var siblings = tokenizeMediaCondition(tokens.slice(endIndexOfFirstFeature + 2), mayContainOr, nextToken.value);
    return {
      operator: nextToken.value,
      children: [child].concat(siblings.children)
    };
  }
};
var tokenizeMediaFeature = function tokenizeMediaFeature(rawTokens) {
  if (rawTokens.length < 3 || rawTokens[0].type !== '<(-token>' || rawTokens[rawTokens.length - 1].type !== '<)-token>') {
    throw new Error('Invalid media feature');
  }

  var tokens = [rawTokens[0]];

  for (var i = 1; i < rawTokens.length; i++) {
    if (i < rawTokens.length - 2) {
      var a = rawTokens[i];
      var b = rawTokens[i + 1];
      var c = rawTokens[i + 2];

      if (a.type === '<number-token>' && a.value > 0 && b.type === '<delim-token>' && b.value === 0x002f && c.type === '<number-token>' && c.value > 0) {
        tokens.push({
          type: '<ratio-token>',
          numerator: a.value,
          denominator: c.value,
          wsBefore: a.wsBefore,
          wsAfter: c.wsAfter
        });
        i += 2;
        continue;
      }
    }

    tokens.push(rawTokens[i]);
  }

  var nextToken = tokens[1];

  if (nextToken.type === '<ident-token>' && tokens.length === 3) {
    return {
      context: 'boolean',
      feature: nextToken.value
    };
  } else if (tokens.length === 5 && tokens[1].type === '<ident-token>' && tokens[2].type === '<colon-token>') {
    var valueToken = tokens[3];

    if (valueToken.type === '<number-token>' || valueToken.type === '<dimension-token>' || valueToken.type === '<ratio-token>' || valueToken.type === '<ident-token>') {
      var feature = tokens[1].value;
      var prefix = null;
      var slice = feature.slice(0, 4);

      if (slice === 'min-') {
        prefix = 'min';
        feature = feature.slice(4);
      } else if (slice === 'max-') {
        prefix = 'max';
        feature = feature.slice(4);
      }

      valueToken.wsBefore;
          valueToken.wsAfter;
          var value = __rest(valueToken, ["wsBefore", "wsAfter"]);

      return {
        context: 'value',
        prefix: prefix,
        feature: feature,
        value: value
      };
    }
  } else if (tokens.length >= 5) {
    try {
      var range = tokenizeRange(tokens);
      return {
        context: 'range',
        feature: range.featureName,
        range: range
      };
    } catch (err) {
      throw createError('Invalid media feature', err);
    }
  }

  throw new Error('Invalid media feature');
};
var tokenizeRange = function tokenizeRange(tokens) {
  var _a, _b, _c, _d;

  if (tokens.length < 5 || tokens[0].type !== '<(-token>' || tokens[tokens.length - 1].type !== '<)-token>') {
    throw new Error('Invalid range');
  }

  var range = {
    leftToken: null,
    leftOp: null,
    featureName: '',
    rightOp: null,
    rightToken: null
  };
  var hasLeft = tokens[1].type === '<number-token>' || tokens[1].type === '<dimension-token>' || tokens[1].type === '<ratio-token>' || tokens[1].type === '<ident-token>' && tokens[1].value === 'infinite';

  if (tokens[2].type === '<delim-token>') {
    if (tokens[2].value === 0x003c) {
      if (tokens[3].type === '<delim-token>' && tokens[3].value === 0x003d && !tokens[3].wsBefore) {
        range[hasLeft ? 'leftOp' : 'rightOp'] = '<=';
      } else {
        range[hasLeft ? 'leftOp' : 'rightOp'] = '<';
      }
    } else if (tokens[2].value === 0x003e) {
      if (tokens[3].type === '<delim-token>' && tokens[3].value === 0x003d && !tokens[3].wsBefore) {
        range[hasLeft ? 'leftOp' : 'rightOp'] = '>=';
      } else {
        range[hasLeft ? 'leftOp' : 'rightOp'] = '>';
      }
    } else if (tokens[2].value === 0x003d) {
      range[hasLeft ? 'leftOp' : 'rightOp'] = '=';
    } else {
      throw new Error('Invalid range');
    }

    if (hasLeft) {
      range.leftToken = tokens[1];
    } else if (tokens[1].type === '<ident-token>') {
      range.featureName = tokens[1].value;
    } else {
      throw new Error('Invalid range');
    }

    var tokenIndexAfterFirstOp = 2 + ((_b = (_a = range[hasLeft ? 'leftOp' : 'rightOp']) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
    var tokenAfterFirstOp = tokens[tokenIndexAfterFirstOp];

    if (hasLeft) {
      if (tokenAfterFirstOp.type === '<ident-token>') {
        range.featureName = tokenAfterFirstOp.value;

        if (tokens.length >= 7) {
          var secondOpToken = tokens[tokenIndexAfterFirstOp + 1];
          var followingToken = tokens[tokenIndexAfterFirstOp + 2];

          if (secondOpToken.type === '<delim-token>') {
            var charCode = secondOpToken.value;

            if (charCode === 0x003c) {
              if (followingToken.type === '<delim-token>' && followingToken.value === 0x003d && !followingToken.wsBefore) {
                range.rightOp = '<=';
              } else {
                range.rightOp = '<';
              }
            } else if (charCode === 0x003e) {
              if (followingToken.type === '<delim-token>' && followingToken.value === 0x003d && !followingToken.wsBefore) {
                range.rightOp = '>=';
              } else {
                range.rightOp = '>';
              }
            } else {
              throw new Error('Invalid range');
            }

            var tokenAfterSecondOp = tokens[tokenIndexAfterFirstOp + 1 + ((_d = (_c = range.rightOp) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0)];
            range.rightToken = tokenAfterSecondOp;
          } else {
            throw new Error('Invalid range');
          }
        } else if (tokenIndexAfterFirstOp + 2 !== tokens.length) {
          throw new Error('Invalid range');
        }
      } else {
        throw new Error('Invalid range');
      }
    } else {
      range.rightToken = tokenAfterFirstOp;
    }

    var validRange = null;
    var lt = range.leftToken,
        leftOp = range.leftOp,
        featureName = range.featureName,
        rightOp = range.rightOp,
        rt = range.rightToken;
    var leftToken = null;

    if (lt !== null) {
      if (lt.type === '<ident-token>') {
        var type = lt.type,
            value = lt.value;

        if (value === 'infinite') {
          leftToken = {
            type: type,
            value: value
          };
        }
      } else if (lt.type === '<number-token>' || lt.type === '<dimension-token>' || lt.type === '<ratio-token>') {
        lt.wsBefore;
            lt.wsAfter;
            var ltNoWS = __rest(lt, ["wsBefore", "wsAfter"]);

        leftToken = ltNoWS;
      }
    }

    var rightToken = null;

    if (rt !== null) {
      if (rt.type === '<ident-token>') {
        var type = rt.type,
            value = rt.value;

        if (value === 'infinite') {
          rightToken = {
            type: type,
            value: value
          };
        }
      } else if (rt.type === '<number-token>' || rt.type === '<dimension-token>' || rt.type === '<ratio-token>') {
        rt.wsBefore;
            rt.wsAfter;
            var rtNoWS = __rest(rt, ["wsBefore", "wsAfter"]);

        rightToken = rtNoWS;
      }
    }

    if (leftToken !== null && rightToken !== null) {
      if ((leftOp === '<' || leftOp === '<=') && (rightOp === '<' || rightOp === '<=')) {
        validRange = {
          leftToken: leftToken,
          leftOp: leftOp,
          featureName: featureName,
          rightOp: rightOp,
          rightToken: rightToken
        };
      } else if ((leftOp === '>' || leftOp === '>=') && (rightOp === '>' || rightOp === '>=')) {
        validRange = {
          leftToken: leftToken,
          leftOp: leftOp,
          featureName: featureName,
          rightOp: rightOp,
          rightToken: rightToken
        };
      } else {
        throw new Error('Invalid range');
      }
    } else if (leftToken === null && leftOp === null && rightOp !== null && rightToken !== null) {
      validRange = {
        leftToken: leftToken,
        leftOp: leftOp,
        featureName: featureName,
        rightOp: rightOp,
        rightToken: rightToken
      };
    } else if (leftToken !== null && leftOp !== null && rightOp === null && rightToken === null) {
      validRange = {
        leftToken: leftToken,
        leftOp: leftOp,
        featureName: featureName,
        rightOp: rightOp,
        rightToken: rightToken
      };
    }

    return validRange;
  } else {
    throw new Error('Invalid range');
  }
};

exports.consumeEscape = consumeEscape;
exports.consumeIdent = consumeIdent;
exports.consumeIdentLike = consumeIdentLike;
exports.consumeIdentUnsafe = consumeIdentUnsafe;
exports.consumeNumber = consumeNumber;
exports.consumeNumeric = consumeNumeric;
exports.consumeString = consumeString;
exports.consumeUrl = consumeUrl;
exports.lexicalAnalysis = lexicalAnalysis;
exports.removeWhitespace = removeWhitespace;
exports.syntacticAnalysis = syntacticAnalysis;
exports.toAST = toAST;
exports.toUnflattenedAST = toUnflattenedAST;
exports.tokenizeMediaCondition = tokenizeMediaCondition;
exports.tokenizeMediaFeature = tokenizeMediaFeature;
exports.tokenizeMediaQuery = tokenizeMediaQuery;
exports.tokenizeRange = tokenizeRange;
exports.wouldStartIdentifier = wouldStartIdentifier;
//# sourceMappingURL=index.js.map
