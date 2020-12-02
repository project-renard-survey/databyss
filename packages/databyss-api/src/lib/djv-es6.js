"use strict";
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) { // .length of function is 2
        'use strict';
        if (target === null || target === undefined) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
  
        var to = Object(target);
  
        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];
  
          if (nextSource !== null && nextSource !== undefined) { 
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t(require("libs/djv-draft-04")) : "function" == typeof define && define.amd ? define(["libs/djv-draft-04"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.djv = t(require("libs/djv-draft-04")) : e.djv = t(e["libs/djv-draft-04"]);
}("undefined" != typeof self ? self : void 0, function (e) {
  return function (e) {
    function t(a) {
      if (r[a]) return r[a].exports;
      var n = r[a] = {
        i: a,
        l: !1,
        exports: {}
      };
      return e[a].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }

    var r = {};
    return t.m = e, t.c = r, t.d = function (e, r, a) {
      t.o(e, r) || Object.defineProperty(e, r, {
        configurable: !1,
        enumerable: !0,
        get: a
      });
    }, t.n = function (e) {
      var r = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };
      return t.d(r, "a", r), r;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 8);
  }([function (e, t, r) {
    "use strict";

    function a(e, t, r) {
      return "function" != typeof e ? e : e(t, r);
    }

    function n(e, t) {
      return "object" === (void 0 === e ? "undefined" : i(e)) && Object.prototype.hasOwnProperty.call(e, t);
    }

    var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    };
    e.exports = {
      asExpression: a,
      hasProperty: n
    };
  }, function (e, t, r) {
    "use strict";

    function a(e, t, r) {
      return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = r, e;
    }

    function n(e) {
      return "object" === (void 0 === e ? "undefined" : f(e)) || "boolean" == typeof e;
    }

    function i(e) {
      return !0 === e ? s.ANY_SCHEMA : !1 === e ? s.NOT_ANY_SCHEMA : e;
    }

    function o(e) {
      if ("object" !== (void 0 === e ? "undefined" : f(e)) || null === e) return {
        enum: [e]
      };
      if (Array.isArray(e)) return {
        items: e.map(o),
        additionalItems: !1
      };
      var t = Object.keys(e);
      return {
        properties: t.reduce(function (t, r) {
          return Object.assign({}, t, a({}, r, o(e[r])));
        }, {}),
        required: t
      };
    }

    var f = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    },
        s = {
      ANY_SCHEMA: {},
      NOT_ANY_SCHEMA: {
        not: {}
      }
    };
    e.exports = {
      is: n,
      make: o,
      transform: i,
      transformation: s
    };
  }, function (e, t, r) {
    "use strict";

    function a(e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) {
          r[t] = e[t];
        }

        return r;
      }

      return Array.from(e);
    }

    function n(e, t) {
      function r(e) {
        for (var t = arguments.length, a = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
          a[n - 1] = arguments[n];
        }

        var i = void 0;
        return r.lines.push(e.replace(/%i/g, function () {
          return "i";
        }).replace(/\$(\d)/g, function (e, t) {
          return "" + a[t - 1];
        }).replace(/(%[sd])/g, function () {
          return a.length && (i = a.shift()), "" + i;
        })), r;
      }

      function a() {
        return this.join(".").replace(/\.\[/g, "[");
      }

      var n = "function" == typeof t.errorHandler ? t.errorHandler : function (e) {
        var t = this.data.toString().replace(/^data/, ""),
            r = t.replace(/\['([^']+)'\]/gi, ".$1").replace(/\[(i[0-9]*)\]/gi, "['+$1+']"),
            a = "#" + t.replace(/\[i([0-9]*)\]/gi, "/items").replace(/\['([^']+)'\]/gi, "/properties/$1") + "/" + e;
        return "return {\n        keyword: '" + e + "',\n        dataPath: unescape(\"" + r.replace("unescape(", "").replace(")]", "]").replace(")]", "]").replace("['", "").replace("']", "") + '"),\n        schemaPath: unescape("' + a.replace("unescape(", "").replace(")]", "]").replace(")]", "]").replace("['", "").replace("']", "") + '")\n      };';
      };
      return Object.assign(r, {
        cachedIndex: 0,
        cached: [],
        cache: function cache(e) {
          var t = r.cached[r.cached.length - 1];
          return t[e] ? "i" + t[e] : (r.cachedIndex += 1, t[e] = r.cachedIndex, "(i" + t[e] + " = " + e + ")");
        },
        data: ["data"],
        error: n,
        lines: [],
        schema: ["schema"],
        push: r,
        link: function link(t) {
          return "f" + e.link(t);
        },
        visit: function visit(t) {
          r.cached.push({}), e.visit(t, r), r.cached.pop();
        }
      }), r.data.toString = a, r.schema.toString = a, r;
    }

    function i(e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          a = r.inner,
          n = new Function("schema", e)(t);
      return a || (n.toString = function () {
        return e;
      }), n;
    }

    function o(e) {
      var t = e.defineErrors,
          r = e.index;
      return "\n    " + (t ? "const errors = [];" : "") + "\n    " + (r ? "let i" + Array.apply(void 0, a(Array(r))).map(function (e, t) {
        return t + 1;
      }).join(",i") + ";" : "") + "\n  ";
    }

    function f(e) {
      var t = e.context;
      if (e.inner || !t.length) return "";
      var r = [],
          a = [];
      return t.forEach(function (e, t) {
        if ("number" == typeof e) return void a.push(t + 1 + " = f" + (e + 1));
        r.push(t + 1 + " = " + e);
      }), "const f" + r.concat(a).join(", f") + ";";
    }

    function s(e) {
      var t = e.defineErrors,
          r = e.lines,
          a = o(e),
          n = t ? "if(errors.length) return errors;" : "";
      return '\n    "use strict";\n    ' + a + "\n    " + r.join("\n") + "\n    " + n + "\n  ";
    }

    function c(e, t) {
      var r = e.cachedIndex,
          a = e.lines,
          n = t.context,
          i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          o = i.inner,
          c = i.errorHandler,
          u = {
        context: n,
        inner: o,
        defineErrors: c,
        index: r,
        lines: a
      };
      return "\n    " + f(u) + "\n    function f0(data) {\n      " + s(u) + "\n    }\n    return f0;\n  ";
    }

    function u(e) {
      for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) {
        r[a - 1] = arguments[a];
      }

      return function () {
        for (var t = arguments.length, a = Array(t), n = 0; n < t; n++) {
          a[n] = arguments[n];
        }

        var i = a[a.length - 1] || {},
            o = [e[0]];
        return r.forEach(function (t, r) {
          var n = Number.isInteger(t) ? a[t] : i[t];
          o.push(n, e[r + 1]);
        }), o.join("");
      };
    }

    e.exports = {
      body: c,
      restore: i,
      template: n,
      expression: u
    };
  }, function (e, t, r) {
    "use strict";

    function a(e, t) {
      return Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(t)
        }
      }));
    }

    var n = a(["!/^[a-zA-Z]+$/.test(", ")"], ["!/^[a-zA-Z]+$/.test(", ")"]),
        i = a(["!/^[a-zA-Z0-9]+$/.test(", ")"], ["!/^[a-zA-Z0-9]+$/.test(", ")"]),
        o = a(["!/^[-_a-zA-Z0-9]+$/.test(", ")"], ["!/^[-_a-zA-Z0-9]+$/.test(", ")"]),
        f = a(["!/^[a-fA-F0-9]+$/.test(", ")"], ["!/^[a-fA-F0-9]+$/.test(", ")"]),
        s = a(["!/^[0-9]+$/.test(", ")"], ["!/^[0-9]+$/.test(", ")"]),
        c = a(["isNaN(Date.parse(", ")) || ~", ".indexOf('/')"], ["isNaN(Date.parse(", ")) || ~", ".indexOf(\\'/\\')"]),
        u = a(["", " !== ", ".toUpperCase()"], ["", " !== ", ".toUpperCase()"]),
        p = a(["", " !== ", ".toLowerCase()"], ["", " !== ", ".toLowerCase()"]),
        A = a(["", ".length >= 256 || !/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9]))*$/.test(", ")"], ["", ".length >= 256 || !/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\\\-]{0,61}[a-zA-Z0-9])(\\\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\\\-]{0,61}[a-zA-Z0-9]))*$/.test(", ")"]),
        d = a(["!/^[A-Za-z][A-Za-z0-9+\\-.]*:(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?$/.test(", ")"], ["!/^[A-Za-z][A-Za-z0-9+\\\\-.]*:(?:\\\\/\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\\\.[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]+)\\\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\\\?(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\\\#(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?$/.test(", ")"]),
        l = a(["!/^[^@]+@[^@]+\\.[^@]+$/.test(", ")"], ["!/^[^@]+@[^@]+\\\\.[^@]+$/.test(", ")"]),
        y = a(["!/^(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}$/.test(", ") || ", '.split(".")[3] > 255'], ["!/^(\\\\d?\\\\d?\\\\d){0,255}\\\\.(\\\\d?\\\\d?\\\\d){0,255}\\\\.(\\\\d?\\\\d?\\\\d){0,255}\\\\.(\\\\d?\\\\d?\\\\d){0,255}$/.test(", ") || ", '.split(".")[3] > 255']),
        h = a(["!/^((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})((([\\dA-F]{1,4}((?!\\3)::|:\\b|$))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})$/.test(", ")"], ["!/^((?=.*::)(?!.*::.+::)(::)?([\\\\dA-F]{1,4}:(:|\\\\b)|){5}|([\\\\dA-F]{1,4}:){6})((([\\\\dA-F]{1,4}((?!\\\\3)::|:\\\\b|$))|(?!\\\\2\\\\3)){2}|(((2[0-4]|1\\\\d|[1-9])?\\\\d|25[0-5])\\\\.?\\\\b){4})$/.test(", ")"]),
        F = a(["/[^\\\\]\\\\[^.*+?^${}()|[\\]\\\\bBcdDfnrsStvwWxu0-9]/i.test(", ")"], ["/[^\\\\\\\\]\\\\\\\\[^.*+?^\\${}()|[\\\\]\\\\\\\\bBcdDfnrsStvwWxu0-9]/i.test(", ")"]),
        m = a(["!/^$|^\\/(?:~(?=[01])|[^~])*$/i.test(", ")"], ["!/^$|^\\\\/(?:~(?=[01])|[^~])*$/i.test(", ")"]),
        v = a(["!/^(?:[A-Za-z][A-Za-z0-9+\\-.]*:(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?|(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&'()*+,;=@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?)$/i.test(", ")"], ["!/^(?:[A-Za-z][A-Za-z0-9+\\\\-.]*:(?:\\\\/\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\\\.[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]+)\\\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\\\?(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\\\#(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?|(?:\\\\/\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\\\.[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:]+)\\\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\\\/(?:(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=@]|%[0-9A-Fa-f]{2})+(?:\\\\/(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\\\?(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\\\#(?:[A-Za-z0-9\\\\-._~!$&\\'()*+,;=:@\\\\/?]|%[0-9A-Fa-f]{2})*)?)$/i.test(", ")"]),
        $ = a(["!/^(?:(?:[^\\x00-\\x20\"'<>%\\\\^`{|}]|%[0-9a-f]{2})|\\{[+#.\\/;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\:[1-9][0-9]{0,3}|\\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\:[1-9][0-9]{0,3}|\\*)?)*\\})*$/i.test(", ")"], ["!/^(?:(?:[^\\\\x00-\\\\x20\"\\'<>%\\\\\\\\^\\`{|}]|%[0-9a-f]{2})|\\\\{[+#.\\\\/;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\\\:[1-9][0-9]{0,3}|\\\\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\\\:[1-9][0-9]{0,3}|\\\\*)?)*\\\\})*$/i.test(", ")"]),
        b = r(2),
        g = b.expression;
    e.exports = {
      alpha: g(n, "data"),
      alphanumeric: g(i, "data"),
      identifier: g(o, "data"),
      hexadecimal: g(f, "data"),
      numeric: g(s, "data"),
      "date-time": g(c, "data", "data"),
      uppercase: g(u, "data", "data"),
      lowercase: g(p, "data", "data"),
      hostname: g(A, "data", "data"),
      uri: g(d, "data"),
      email: g(l, "data"),
      ipv4: g(y, "data", "data"),
      ipv6: g(h, "data"),
      regex: g(F, "data"),
      "json-pointer": g(m, "data"),
      "uri-reference": g(v, "data"),
      "uri-template": g($, "data")
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(11),
        n = r(12),
        i = r(13),
        o = r(14),
        f = r(16),
        s = r(17),
        c = r(18),
        u = r(19),
        p = r(20),
        A = r(21),
        d = r(22),
        l = r(23),
        y = r(24),
        h = r(25),
        F = r(26),
        m = r(27);
    e.exports = {
      name: {
        $ref: f,
        required: a,
        format: n,
        property: i,
        type: o,
        not: s,
        anyOf: c,
        oneOf: u,
        allOf: p,
        dependencies: A,
        properties: d,
        patternProperties: l,
        items: y,
        contains: h,
        constant: F,
        propertyNames: m
      },
      list: [f, a, n, i, o, s, c, u, p, A, d, l, y, h, F, m]
    };
  }, function (e, t, r) {
    "use strict";

    var a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    };
    e.exports = {
      readOnly: "false",
      exclusiveMinimum: function exclusiveMinimum(e) {
        return "%s <= " + e.exclusiveMinimum;
      },
      minimum: function minimum(e) {
        return "%s < " + e.minimum;
      },
      exclusiveMaximum: function exclusiveMaximum(e) {
        return "%s >= " + e.exclusiveMaximum;
      },
      maximum: function maximum(e) {
        return "%s > " + e.maximum;
      },
      multipleOf: '($1/$2) % 1 !== 0 && typeof $1 === "number"',
      pattern: function pattern(e) {
        var t = void 0,
            r = void 0;
        return "string" == typeof e.pattern ? t = e.pattern : (t = e.pattern[0], r = e.pattern[1]), 'typeof ($1) === "string" && !' + new RegExp(t, r) + ".test($1)";
      },
      minLength: 'typeof $1 === "string" && function dltml(b,c){for(var a=0,d=b.length;a<d&&c;){var e=b.charCodeAt(a++);55296<=e&&56319>=e&&a<d&&56320!==(b.charCodeAt(a++)&64512)&&a--;c--}return!!c}($1, $2)',
      maxLength: 'typeof $1 === "string" && function dmtml(b,c){for(var a=0,d=b.length;a<d&&0<=c;){var e=b.charCodeAt(a++);55296<=e&&56319>=e&&a<d&&56320!==(b.charCodeAt(a++)&64512)&&a--;c--}return 0>c}($1, $2)',
      minItems: "$1.length < $2 && Array.isArray($1)",
      maxItems: "$1.length > $2 && Array.isArray($1)",
      uniqueItems: function uniqueItems(e, t) {
        return e.uniqueItems ? (t(t.cache("{}")), 'Array.isArray($1) && $1.some(function(item, key) {\n      if(item !== null && typeof item === "object") key = JSON.stringify(item);\n      else key = item;\n      if(' + t.cache("{}") + ".hasOwnProperty(key)) return true;\n      " + t.cache("{}") + "[key] = true;\n    })") : "true";
      },
      minProperties: '!Array.isArray($1) && typeof $1 === "object" && Object.keys($1).length < $2',
      maxProperties: '!Array.isArray($1) && typeof $1 === "object" && Object.keys($1).length > $2',
      enum: function _enum(e, t) {
        return e.enum.map(function (e) {
          var r = "$1",
              n = e;
          return "object" === (void 0 === e ? "undefined" : a(e)) ? (n = "'" + JSON.stringify(e) + "'", r = t.cache("JSON.stringify($1)")) : "string" == typeof e && (n = "'" + escape(e) + "'"), r + " != unescape(" + n + ")";
        }).join(" && ");
      }
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = ["$ref", "$schema", "type", "not", "anyOf", "allOf", "oneOf", "properties", "patternProperties", "additionalProperties", "items", "additionalItems", "required", "default", "title", "description", "definitions", "dependencies", "$id", "contains", "const", "examples"];
  }, function (e, t, r) {
    "use strict";

    function a(e) {
      return "string" != typeof e ? e : e.split(u)[0];
    }

    function n(e) {
      return c.test(e);
    }

    function i(e) {
      return e.replace(p, "$1");
    }

    function o(e) {
      return "string" != typeof e ? e : e.split(u)[1];
    }

    function f(e) {
      return e.filter(function (e) {
        return "string" == typeof e;
      }).reduce(function (e, t) {
        if (!e.length || n(t)) return t;
        if (!t) return e;

        if (0 === t.indexOf("#")) {
          var r = e.indexOf("#");
          return -1 === r ? e + t : e.slice(0, r) + t;
        }

        var a = i(e) + t;
        return a + (-1 === a.indexOf("#") ? "#" : "");
      }, "");
    }

    function s(e) {
      return decodeURIComponent(e.replace(/~1/g, "/").replace(/~0/g, "~"));
    }

    var c = /:\/\//,
        u = /#\/?/,
        p = /(^[^:]+:\/\/[^?#]*\/).*/,
        A = {
      id: "$id"
    };
    e.exports = {
      makePath: f,
      isFullUri: n,
      head: a,
      fragment: o,
      normalize: s,
      keys: A
    };
  }, function (e, t, r) {
    e.exports = r(9);
  }, function (e, t, r) {
    "use strict";

    function a(e, t, r) {
      return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = r, e;
    }

    function n() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      if (!_instanceof(this, n)) return new n(e);
      this.options = e, this.resolved = {}, this.state = new A(null, this), this.useVersion(e.version, e.versionConfigure), this.addFormat(e.formats);
    }

    var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    },
        o = r(2),
        f = o.restore,
        s = o.expression,
        c = r(3),
        u = r(10),
        p = u.generate,
        A = u.State,
        d = r(28),
        l = d.add,
        y = d.use;
    Object.assign(n, {
      expression: s
    }), Object.assign(n.prototype, {
      validate: function validate(e, t) {
        return this.resolve(e).fn(t);
      },
      addSchema: function addSchema(e, t) {
        var r = this,
            a = "object" === (void 0 === e ? "undefined" : i(e)) ? e : t,
            n = {
          schema: a,
          fn: p(this, a, void 0, this.options)
        };
        return [e, t.id].filter(function (e) {
          return "string" == typeof e;
        }).forEach(function (e) {
          r.resolved[e] = Object.assign({
            name: e
          }, n);
        }), n;
      },
      removeSchema: function removeSchema(e) {
        e ? delete this.resolved[e] : this.resolved = {};
      },
      resolve: function resolve(e) {
        return "object" !== (void 0 === e ? "undefined" : i(e)) && this.resolved[e] ? this.resolved[e] : this.addSchema(e, this.state.resolve(e));
      },
      export: function _export(e) {
        var t = this,
            r = void 0;
        return e ? (r = this.resolve(e), r = {
          name: e,
          schema: r.schema,
          fn: r.fn.toString()
        }) : (r = {}, Object.keys(this.resolved).forEach(function (e) {
          r[e] = {
            name: e,
            schema: t.resolved[e].schema,
            fn: t.resolved[e].fn.toString()
          };
        })), JSON.stringify(r);
      },
      import: function _import(e) {
        var t = this,
            r = JSON.parse(e),
            n = r;
        r.name && r.fn && r.schema && (n = a({}, r.name, r)), Object.keys(n).forEach(function (e) {
          var r = n[e],
              a = r.name,
              i = r.schema,
              o = r.fn,
              s = f(o, i, t.options);
          t.resolved[a] = {
            name: a,
            schema: i,
            fn: s
          };
        });
      },
      addFormat: function addFormat(e, t) {
        if ("string" == typeof e) return void (c[e] = t);
        "object" === (void 0 === e ? "undefined" : i(e)) && Object.assign(c, e);
      },
      setErrorHandler: function setErrorHandler(e) {
        Object.assign(this.options, {
          errorHandler: e
        });
      },
      useVersion: function useVersion(e, t) {
        "function" != typeof t && "draft-04" === e && (t = r(29)), "function" == typeof t && l(e, t), y(e);
      }
    }), e.exports = n;
  }, function (e, t, r) {
    "use strict";

    function a() {
      var e = (arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments[1]);
      Object.assign(this, {
        context: [],
        entries: new Map(),
        env: e
      });
    }

    function n(e, t) {
      var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : new a(t, e),
          n = arguments[3],
          i = u(r, n);
      i.visit(t);
      var o = s(i, r, n);
      return c(o, t, n);
    }

    var i = r(4),
        o = i.list,
        f = r(2),
        s = f.body,
        c = f.restore,
        u = f.template,
        p = r(0),
        A = p.hasProperty,
        d = r(7),
        l = d.normalize,
        y = d.makePath,
        h = d.head,
        F = d.isFullUri,
        m = d.fragment,
        v = d.keys,
        $ = r(1),
        b = $.is,
        g = $.transform;
    a.prototype = Object.assign(Object.create(Array.prototype), {
      addEntry: function addEntry(e, t) {
        var r = this.entries.get(t);
        return !1 === r ? this.context.push(t) : (void 0 === r && (this.entries.set(t, !1), r = n(this.env, t, this, {
          inner: !0
        }), this.entries.set(t, r), this.revealReference(t)), this.context.push(r));
      },
      revealReference: function revealReference(e) {
        for (var t = this.context.indexOf(e); -1 !== t; t = this.context.indexOf(e)) {
          this.context[t] = this.context.length;
        }
      },
      link: function link(e) {
        var t = this.resolve(e);
        return this.addEntry(e, t);
      },
      resolveReference: function resolveReference(e) {
        if (F(e)) return e;

        for (var t = void 0, r = void 0, a = this.length - 1; a >= 0; a -= 1, t = !1) {
          var n = this[a],
              i = n[v.id],
              o = n.$ref;

          if (t = i || o, F(t)) {
            r = a;
            break;
          }
        }

        for (var f = [], s = this.length - 1; s > r; s -= 1) {
          var c = this[s],
              u = c[v.id],
              p = c.$ref,
              A = u || p;
          h(A) && f.push(A);
        }

        return y([t].concat(f, [e]));
      },
      ascend: function ascend(e) {
        for (var t = h(e), r = this.env.resolved[t] || {}, a = r.schema, n = void 0 === a ? this[0] : a; n.$ref && h(n.$ref) !== h(e) && 1 === Object.keys(n).length;) {
          n = this.ascend(n.$ref);
        }

        return n;
      },
      descend: function descend(e, t) {
        var r = this,
            a = m(e);
        if (!a && F(e)) return t;
        a || (a = e);
        var n = a.split("/"),
            i = n.map(l).reduce(function (e, t, a) {
          var i = e[t];
          return b(i) || (i = e.definitions && e.definitions[t]), a !== n.length - 1 && A(i, v.id) && r.push(i), i;
        }, t);
        return b(i) ? i : t;
      },
      resolve: function resolve(e) {
        if ("string" != typeof e) return e;
        var t = this.resolveReference(e),
            r = this.ascend(t);
        return this.descend(e, r);
      },
      visit: function visit(e, t) {
        var r = g(e),
            a = this.length;
        this.push(r), o.some(function (e) {
          return e(r, t);
        }), this.length = a;
      }
    }), e.exports = {
      State: a,
      generate: n
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = function (e, t) {
      Array.isArray(e.required) && t("if (" + t.data + " !== null && typeof " + t.data + " === 'object' && !Array.isArray(" + t.data + ")) {\n    " + e.required.map(function (e) {
        return "if (!" + t.data + '.hasOwnProperty(unescape("' + escape(e) + '"))) ' + t.error("required", e);
      }).join("") + "\n  }");
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(3);

    e.exports = function (e, t) {
      if (void 0 !== e.format) {
        var r = a[e.format];

        if ("function" == typeof r) {
          t("if (" + r({
            data: t.data,
            schema: e
          }) + ") " + t.error("format"));
        }
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(5),
        n = r(6),
        i = r(0),
        o = i.asExpression;

    e.exports = function (e, t) {
      Object.keys(e).forEach(function (r) {
        if (-1 === n.indexOf(r) && "format" !== r) {
          var i = o(a[r], e, t);

          if (i) {
            var f = t.error(r);
            t("if (" + i + ") " + f, t.data, e[r]);
          }
        }
      });
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(15),
        n = r(0),
        i = n.hasProperty;

    e.exports = function (e, t) {
      if (i(e, "type")) {
        var r = t.error("type", e.type);
        t("if (" + ("(" + [].concat(e.type).map(function (e) {
          return a[e];
        }).join(") && (") + ")") + ") " + r, t.data);
      }
    };
  }, function (e, t, r) {
    "use strict";

    e.exports = {
      null: "%s !== null",
      string: 'typeof %s !== "string"',
      boolean: 'typeof %s !== "boolean"',
      number: 'typeof %s !== "number" || %s !== %s',
      integer: 'typeof %s !== "number" || %s % 1 !== 0',
      object: '!%s || typeof %s !== "object" || Array.isArray(%s)',
      array: "!Array.isArray(%s)",
      date: "!(%s instanceof Date)"
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      return !!n(e, "$ref") && (t("if (" + t.link(e.$ref) + "(" + t.data + ")) " + t.error("$ref")), !0);
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      if (n(e, "not")) {
        t("if (!" + (t.link(e.not) + "(" + t.data + ")") + ") " + t.error("not"));
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      if (n(e, "anyOf")) {
        var r = t.error("anyOf"),
            a = e.anyOf.map(function (e) {
          return t.link(e) + "(" + t.data + ")";
        }).join(" && ");
        t("if (" + a + ") " + r);
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      if (n(e, "oneOf")) {
        var r = e.oneOf.map(function (e) {
          return t.link(e);
        }),
            a = t.cache("[" + r + "]"),
            i = t.cache("[" + r + "]"),
            o = t.cache(i + ".length - 1"),
            f = t.cache(i + ".length - 1"),
            s = t.cache("0"),
            c = t.cache("0"),
            u = t.error("oneOf");
        t("for (\n    " + a + ", " + o + ", " + s + ";\n    " + f + " >= 0 && " + f + " < " + i + ".length;\n    " + f + "--) {\n      if(!" + i + "[" + f + "](" + t.data + ")) " + c + "++;\n    }\n    if (" + c + " !== 1) " + u + "\n  ");
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      if (n(e, "allOf")) {
        var r = t.error("allOf"),
            a = e.allOf.map(function (e) {
          return t.link(e) + "(" + t.data + ")";
        }).join(" || ");
        t("if (" + a + ") " + r);
      }
    };
  }, function (e, t, r) {
    "use strict";

    function a(e) {
      if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) {
          r[t] = e[t];
        }

        return r;
      }

      return Array.from(e);
    }

    var n = r(0),
        i = n.hasProperty,
        o = r(1),
        f = o.is;

    e.exports = function (e, t) {
      i(e, "dependencies") && Object.keys(e.dependencies).forEach(function (r) {
        var n = e.dependencies[r],
            i = t.error("dependencies");
        t("if (" + t.data + '.hasOwnProperty(unescape("' + escape(r) + '"))) {'), Array.isArray(n) || "string" == typeof n ? [].concat(a(n)).map(function (e) {
          return "if (!" + t.data + '.hasOwnProperty(unescape("' + escape(e) + '"))) ' + i;
        }).map(t) : f(n) && t.visit(n), t("}");
      });
    };
  }, function (e, t, r) {
    "use strict";

    var a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    },
        n = r(0),
        i = n.hasProperty;

    e.exports = function (e, t) {
      i(e, "properties") && "object" === a(e.properties) && Object.keys(e.properties).forEach(function (r) {
        var n = e.properties[r];

        if ("object" !== (void 0 === n ? "undefined" : a(n)) || Object.keys(n).length) {
          var i = !e.required || -1 === e.required.indexOf(r);
          i && t("if (" + t.data + '.hasOwnProperty(unescape("' + escape(r) + '"))) {'), t.data.push("[unescape('" + escape(r) + "')]"), t.visit(n), t.data.pop(), i && t("}");
        }
      });
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      var r = n(e, "additionalProperties") && !0 !== e.additionalProperties,
          a = n(e, "patternProperties");

      if (r || a) {
        t("if(typeof " + t.data + " === 'object' && !Array.isArray(" + t.data + ")) {"), t(t.cache("null"));

        var i = t.cache("null"),
            o = function o() {
          !1 === e.additionalProperties ? t(t.error("additionalProperties")) : e.additionalProperties && (t.data.push("[" + i + "]"), t.visit(e.additionalProperties), t.data.pop());
        };

        t("for (" + i + " in " + t.data + ") {"), r && a && t(t.cache("false")), a ? Object.keys(e.patternProperties).forEach(function (a) {
          t("if (" + new RegExp(a) + ".test(" + i + ")) {"), r && t(t.cache("false") + " = true;");
          var n = e.patternProperties[a];
          t.data.push("[" + i + "]"), t.visit(n), t.data.pop(), t("}"), e.properties ? t("if (" + (r ? t.cache("false") + " || " : "") + " " + t.schema + ".properties.hasOwnProperty(" + i + ")) continue;") : r && t("if (" + t.cache("false") + ") continue;"), o();
        }) : (e.properties && t("if(" + t.schema + ".properties.hasOwnProperty(" + i + ")) continue;"), o()), t("}}");
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    },
        n = r(0),
        i = n.hasProperty;

    e.exports = function (e, t) {
      if (i(e, "items")) {
        var r = e.items.length,
            n = t.error("additionalItems"),
            o = t.data;

        if (t("if(Array.isArray(" + o + ")) {"), Array.isArray(e.items)) {
          if (!1 === e.additionalItems && t("if (" + o + ".length > " + r + ") " + n), e.items.forEach(function (e, r) {
            t("if(" + o + ".length > " + r + ") {"), o.push("[" + r + "]"), t.visit(e), o.pop(), t("}");
          }), "object" === a(e.additionalItems)) {
            var f = t.cache(r),
                s = t.cache(r);
            t("for (" + f + "; " + s + " < " + o + ".length; " + s + "++) {"), o.push("[" + t.cache(r) + "]"), t.visit(e.additionalItems), o.pop(), t("}");
          }
        } else {
          var c = t.cache("0"),
              u = t.cache("0");
          t("for (" + c + "; " + u + " < " + o + ".length; " + u + "++) {"), o.push("[" + u + "]"), t.visit(e.items), o.pop(), t("}");
        }

        t("}");
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      if (n(e, "contains")) {
        var r = t.error("contains"),
            a = "" + t.link(e.contains),
            i = t.data,
            o = t.cache("0"),
            f = t.cache("0");
        t("if (Array.isArray(" + i + ")) {\n    if (" + i + ".length === 0) " + r + "\n      for (" + o + "; " + f + " < " + i + ".length; " + f + "++) {\n        if (!" + a + "(" + i.toString.apply(i.concat("[" + f + "]")) + ")) break;\n        if (" + f + " === " + i + ".length - 1) " + r + "\n      }\n  }");
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty,
        i = r(1),
        o = i.make;

    e.exports = function (e, t) {
      if (n(e, "const")) {
        var r = o(e.const);
        t.visit(r);
      }
    };
  }, function (e, t, r) {
    "use strict";

    var a = r(0),
        n = a.hasProperty;

    e.exports = function (e, t) {
      if (n(e, "propertyNames")) {
        var r = t.link(e.propertyNames),
            a = t.error("propertyNames");
        t("if (Object.keys(" + t.data + ").some(" + r + ")) " + a);
      }
    };
  }, function (e, t, r) {
    "use strict";

    function a(e, t) {
      d[e] = t;
    }

    function n(e) {
      if (e && d[e]) {
        (0, d[e])({
          properties: i,
          keywords: o,
          validators: f,
          formats: s,
          keys: u,
          transformation: A
        });
      }
    }

    var i = r(5),
        o = r(6),
        f = r(4),
        s = r(3),
        c = r(7),
        u = c.keys,
        p = r(1),
        A = p.transformation,
        d = {};
    e.exports = {
      add: a,
      use: n
    };
  }, function (t, r) {
    t.exports = e;
  }]);
});