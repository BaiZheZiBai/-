(function (t, e) {
  "use strict";
  "function" == typeof define && define.amd && define([], e), Cesium.viewerCesiumNavigationMixin = e()
})("undefined" != typeof window ? window : "undefined" != typeof self ? self : this, function () {
  var t, e, n;
  return function (i) {
      function o(t, e) {
        return b.call(t, e)
      }

      function r(t, e) {
        var n, i, o, r, s, a, l, u, c, h, p, f, d = e && e.split("/"),
          m = v.map,
          g = m && m["*"] || {};
        if (t) {
          for (t = t.split("/"), s = t.length - 1, v.nodeIdCompat && k.test(t[s]) && (t[s] = t[s].replace(k, "")), "." === t[0].charAt(0) && d && (f = d.slice(0, d.length - 1), t = f.concat(t)), c = 0; c < t.length; c++)
            if (p = t[c], "." === p) t.splice(c, 1), c -= 1;
            else if (".." === p) {
            if (0 === c || 1 === c && ".." === t[2] || ".." === t[c - 1]) continue;
            c > 0 && (t.splice(c - 1, 2), c -= 2)
          }
          t = t.join("/")
        }
        if ((d || g) && m) {
          for (n = t.split("/"), c = n.length; c > 0; c -= 1) {
            if (i = n.slice(0, c).join("/"), d)
              for (h = d.length; h > 0; h -= 1)
                if (o = m[d.slice(0, h).join("/")], o && (o = o[i])) {
                  r = o, a = c;
                  break
                } if (r) break;
            !l && g && g[i] && (l = g[i], u = c)
          }!r && l && (r = l, a = u), r && (n.splice(0, a, r), t = n.join("/"))
        }
        return t
      }

      function s(t, e) {
        return function () {
          var n = w.call(arguments, 0);
          return "string" != typeof n[0] && 1 === n.length && n.push(null), f.apply(i, n.concat([t, e]))
        }
      }

      function a(t) {
        return function (e) {
          return r(e, t)
        }
      }

      function l(t) {
        return function (e) {
          g[t] = e
        }
      }

      function u(t) {
        if (o(_, t)) {
          var e = _[t];
          delete _[t], y[t] = !0, p.apply(i, e)
        }
        if (!o(g, t) && !o(y, t)) throw new Error("No " + t);
        return g[t]
      }

      function c(t) {
        var e, n = t ? t.indexOf("!") : -1;
        return n > -1 && (e = t.substring(0, n), t = t.substring(n + 1, t.length)), [e, t]
      }

      function h(t) {
        return function () {
          return v && v.config && v.config[t] || {}
        }
      }
      var p, f, d, m, g = {},
        _ = {},
        v = {},
        y = {},
        b = Object.prototype.hasOwnProperty,
        w = [].slice,
        k = /\.js$/;
      d = function (t, e) {
        var n, i = c(t),
          o = i[0];
        return t = i[1], o && (o = r(o, e), n = u(o)), o ? t = n && n.normalize ? n.normalize(t, a(e)) : r(t, e) : (t = r(t, e), i = c(t), o = i[0], t = i[1], o && (n = u(o))), {
          f: o ? o + "!" + t : t,
          n: t,
          pr: o,
          p: n
        }
      }, m = {
        require: function (t) {
          return s(t)
        },
        exports: function (t) {
          var e = g[t];
          return "undefined" != typeof e ? e : g[t] = {}
        },
        module: function (t) {
          return {
            id: t,
            uri: "",
            exports: g[t],
            config: h(t)
          }
        }
      }, p = function (t, e, n, r) {
        var a, c, h, p, f, v, b = [],
          w = typeof n;
        if (r = r || t, "undefined" === w || "function" === w) {
          for (e = !e.length && n.length ? ["require", "exports", "module"] : e, f = 0; f < e.length; f += 1)
            if (p = d(e[f], r), c = p.f, "require" === c) b[f] = m.require(t);
            else if ("exports" === c) b[f] = m.exports(t), v = !0;
          else if ("module" === c) a = b[f] = m.module(t);
          else if (o(g, c) || o(_, c) || o(y, c)) b[f] = u(c);
          else {
            if (!p.p) throw new Error(t + " missing " + c);
            p.p.load(p.n, s(r, !0), l(c), {}), b[f] = g[c]
          }
          h = n ? n.apply(g[t], b) : void 0, t && (a && a.exports !== i && a.exports !== g[t] ? g[t] = a.exports : h === i && v || (g[t] = h))
        } else t && (g[t] = n)
      }, t = e = f = function (t, e, n, o, r) {
        if ("string" == typeof t) return m[t] ? m[t](e) : u(d(t, e).f);
        if (!t.splice) {
          if (v = t, v.deps && f(v.deps, v.callback), !e) return;
          e.splice ? (t = e, e = n, n = null) : t = i
        }
        return e = e || function () {}, "function" == typeof n && (n = o, o = r), o ? p(i, t, e, n) : setTimeout(function () {
          p(i, t, e, n)
        }, 4), f
      }, f.config = function (t) {
        return f(t)
      }, t._defined = g, n = function (t, e, n) {
        if ("string" != typeof t) throw new Error("See almond README: incorrect module build, no module name");
        e.splice || (n = e, e = []), o(g, t) || o(_, t) || (_[t] = [t, e, n])
      }, n.amd = {
        jQuery: !0
      }
    }(), n("almond", function () {}),
    function () {
      (function (t) {
        var e = this || (0, eval)("this"),
          i = e.document,
          o = e.navigator,
          r = e.jQuery,
          s = e.JSON;
        (function (t) {
          "function" == typeof n && n.amd ? n("knockout", ["exports", "require"], t) : t("object" == typeof exports && "object" == typeof module ? module.exports || exports : e.ko = {})
        })(function (n, a) {
          function l(t, e) {
            return (null === t || typeof t in g) && t === e
          }

          function u(e, n) {
            var i;
            return function () {
              i || (i = m.a.setTimeout(function () {
                i = t, e()
              }, n))
            }
          }

          function c(t, e) {
            var n;
            return function () {
              clearTimeout(n), n = m.a.setTimeout(t, e)
            }
          }

          function h(t, e) {
            e && e !== _ ? "beforeChange" === e ? this.Kb(t) : this.Ha(t, e) : this.Lb(t)
          }

          function p(t, e) {
            null !== e && e.k && e.k()
          }

          function f(t, e) {
            var n = this.Hc,
              i = n[k];
            i.R || (this.lb && this.Ma[e] ? (n.Pb(e, t, this.Ma[e]), this.Ma[e] = null, --this.lb) : i.r[e] || n.Pb(e, t, i.s ? {
              ia: t
            } : n.uc(t)))
          }

          function d(t, e, n, i) {
            m.d[t] = {
              init: function (t, o, r, s, a) {
                var l, u;
                return m.m(function () {
                  var r = m.a.c(o()),
                    s = !n != !r,
                    c = !u;
                  (c || e || s !== l) && (c && m.va.Aa() && (u = m.a.ua(m.f.childNodes(t), !0)), s ? (c || m.f.da(t, m.a.ua(u)), m.eb(i ? i(a, r) : a, t)) : m.f.xa(t), l = s)
                }, null, {
                  i: t
                }), {
                  controlsDescendantBindings: !0
                }
              }
            }, m.h.ta[t] = !1, m.f.Z[t] = !0
          }
          var m = "undefined" != typeof n ? n : {};
          m.b = function (t, e) {
              for (var n = t.split("."), i = m, o = 0; o < n.length - 1; o++) i = i[n[o]];
              i[n[n.length - 1]] = e
            }, m.G = function (t, e, n) {
              t[e] = n
            }, m.version = "3.4.0", m.b("version", m.version), m.options = {
              deferUpdates: !1,
              useOnlyNativeEvents: !1
            }, m.a = function () {
              function n(t, e) {
                for (var n in t) t.hasOwnProperty(n) && e(n, t[n])
              }

              function a(t, e) {
                if (e)
                  for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                return t
              }

              function l(t, e) {
                return t.__proto__ = e, t
              }

              function u(t, e, n, i) {
                var o = t[e].match(_) || [];
                m.a.q(n.match(_), function (t) {
                  m.a.pa(o, t, i)
                }), t[e] = o.join(" ")
              }
              var c = {
                __proto__: []
              }
              instanceof Array, h = "function" == typeof Symbol, p = {}, f = {};
              p[o && /Firefox\/2/i.test(o.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"], p.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" "), n(p, function (t, e) {
                if (e.length)
                  for (var n = 0, i = e.length; n < i; n++) f[e[n]] = t
              });
              var d = {
                  propertychange: !0
                },
                g = i && function () {
                  for (var e = 3, n = i.createElement("div"), o = n.getElementsByTagName("i"); n.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->", o[0];);
                  return 4 < e ? e : t
                }(),
                _ = /\S+/g;
              return {
                cc: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
                q: function (t, e) {
                  for (var n = 0, i = t.length; n < i; n++) e(t[n], n)
                },
                o: function (t, e) {
                  if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e);
                  for (var n = 0, i = t.length; n < i; n++)
                    if (t[n] === e) return n;
                  return -1
                },
                Sb: function (t, e, n) {
                  for (var i = 0, o = t.length; i < o; i++)
                    if (e.call(n, t[i], i)) return t[i];
                  return null
                },
                La: function (t, e) {
                  var n = m.a.o(t, e);
                  0 < n ? t.splice(n, 1) : 0 === n && t.shift()
                },
                Tb: function (t) {
                  t = t || [];
                  for (var e = [], n = 0, i = t.length; n < i; n++) 0 > m.a.o(e, t[n]) && e.push(t[n]);
                  return e
                },
                fb: function (t, e) {
                  t = t || [];
                  for (var n = [], i = 0, o = t.length; i < o; i++) n.push(e(t[i], i));
                  return n
                },
                Ka: function (t, e) {
                  t = t || [];
                  for (var n = [], i = 0, o = t.length; i < o; i++) e(t[i], i) && n.push(t[i]);
                  return n
                },
                ra: function (t, e) {
                  if (e instanceof Array) t.push.apply(t, e);
                  else
                    for (var n = 0, i = e.length; n < i; n++) t.push(e[n]);
                  return t
                },
                pa: function (t, e, n) {
                  var i = m.a.o(m.a.zb(t), e);
                  0 > i ? n && t.push(e) : n || t.splice(i, 1)
                },
                ka: c,
                extend: a,
                Xa: l,
                Ya: c ? l : a,
                D: n,
                Ca: function (t, e) {
                  if (!t) return t;
                  var n, i = {};
                  for (n in t) t.hasOwnProperty(n) && (i[n] = e(t[n], n, t));
                  return i
                },
                ob: function (t) {
                  for (; t.firstChild;) m.removeNode(t.firstChild)
                },
                jc: function (t) {
                  t = m.a.V(t);
                  for (var e = (t[0] && t[0].ownerDocument || i).createElement("div"), n = 0, o = t.length; n < o; n++) e.appendChild(m.$(t[n]));
                  return e
                },
                ua: function (t, e) {
                  for (var n = 0, i = t.length, o = []; n < i; n++) {
                    var r = t[n].cloneNode(!0);
                    o.push(e ? m.$(r) : r)
                  }
                  return o
                },
                da: function (t, e) {
                  if (m.a.ob(t), e)
                    for (var n = 0, i = e.length; n < i; n++) t.appendChild(e[n])
                },
                qc: function (t, e) {
                  var n = t.nodeType ? [t] : t;
                  if (0 < n.length) {
                    for (var i = n[0], o = i.parentNode, r = 0, s = e.length; r < s; r++) o.insertBefore(e[r], i);
                    for (r = 0, s = n.length; r < s; r++) m.removeNode(n[r])
                  }
                },
                za: function (t, e) {
                  if (t.length) {
                    for (e = 8 === e.nodeType && e.parentNode || e; t.length && t[0].parentNode !== e;) t.splice(0, 1);
                    for (; 1 < t.length && t[t.length - 1].parentNode !== e;) t.length--;
                    if (1 < t.length) {
                      var n = t[0],
                        i = t[t.length - 1];
                      for (t.length = 0; n !== i;) t.push(n), n = n.nextSibling;
                      t.push(i)
                    }
                  }
                  return t
                },
                sc: function (t, e) {
                  7 > g ? t.setAttribute("selected", e) : t.selected = e
                },
                $a: function (e) {
                  return null === e || e === t ? "" : e.trim ? e.trim() : e.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                },
                nd: function (t, e) {
                  return t = t || "", !(e.length > t.length) && t.substring(0, e.length) === e
                },
                Mc: function (t, e) {
                  if (t === e) return !0;
                  if (11 === t.nodeType) return !1;
                  if (e.contains) return e.contains(3 === t.nodeType ? t.parentNode : t);
                  if (e.compareDocumentPosition) return 16 == (16 & e.compareDocumentPosition(t));
                  for (; t && t != e;) t = t.parentNode;
                  return !!t
                },
                nb: function (t) {
                  return m.a.Mc(t, t.ownerDocument.documentElement)
                },
                Qb: function (t) {
                  return !!m.a.Sb(t, m.a.nb)
                },
                A: function (t) {
                  return t && t.tagName && t.tagName.toLowerCase()
                },
                Wb: function (t) {
                  return m.onError ? function () {
                    try {
                      return t.apply(this, arguments)
                    } catch (t) {
                      throw m.onError && m.onError(t), t
                    }
                  } : t
                },
                setTimeout: function (t, e) {
                  return setTimeout(m.a.Wb(t), e)
                },
                $b: function (t) {
                  setTimeout(function () {
                    throw m.onError && m.onError(t), t
                  }, 0)
                },
                p: function (t, e, n) {
                  var i = m.a.Wb(n);
                  if (n = g && d[e], m.options.useOnlyNativeEvents || n || !r)
                    if (n || "function" != typeof t.addEventListener) {
                      if ("undefined" == typeof t.attachEvent) throw Error("Browser doesn't support addEventListener or attachEvent");
                      var o = function (e) {
                          i.call(t, e)
                        },
                        s = "on" + e;
                      t.attachEvent(s, o), m.a.F.oa(t, function () {
                        t.detachEvent(s, o)
                      })
                    } else t.addEventListener(e, i, !1);
                  else r(t).bind(e, i)
                },
                Da: function (t, n) {
                  if (!t || !t.nodeType) throw Error("element must be a DOM node when calling triggerEvent");
                  var o;
                  if ("input" === m.a.A(t) && t.type && "click" == n.toLowerCase() ? (o = t.type, o = "checkbox" == o || "radio" == o) : o = !1, m.options.useOnlyNativeEvents || !r || o)
                    if ("function" == typeof i.createEvent) {
                      if ("function" != typeof t.dispatchEvent) throw Error("The supplied element doesn't support dispatchEvent");
                      o = i.createEvent(f[n] || "HTMLEvents"), o.initEvent(n, !0, !0, e, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, t), t.dispatchEvent(o)
                    } else if (o && t.click) t.click();
                  else {
                    if ("undefined" == typeof t.fireEvent) throw Error("Browser doesn't support triggering events");
                    t.fireEvent("on" + n)
                  } else r(t).trigger(n)
                },
                c: function (t) {
                  return m.H(t) ? t() : t
                },
                zb: function (t) {
                  return m.H(t) ? t.t() : t
                },
                bb: function (t, e, n) {
                  var i;
                  e && ("object" == typeof t.classList ? (i = t.classList[n ? "add" : "remove"], m.a.q(e.match(_), function (e) {
                    i.call(t.classList, e)
                  })) : "string" == typeof t.className.baseVal ? u(t.className, "baseVal", e, n) : u(t, "className", e, n))
                },
                Za: function (e, n) {
                  var i = m.a.c(n);
                  null !== i && i !== t || (i = "");
                  var o = m.f.firstChild(e);
                  !o || 3 != o.nodeType || m.f.nextSibling(o) ? m.f.da(e, [e.ownerDocument.createTextNode(i)]) : o.data = i, m.a.Rc(e)
                },
                rc: function (t, e) {
                  if (t.name = e, 7 >= g) try {
                    t.mergeAttributes(i.createElement("<input name='" + t.name + "'/>"), !1)
                  } catch (t) {}
                },
                Rc: function (t) {
                  9 <= g && (t = 1 == t.nodeType ? t : t.parentNode, t.style && (t.style.zoom = t.style.zoom))
                },
                Nc: function (t) {
                  if (g) {
                    var e = t.style.width;
                    t.style.width = 0, t.style.width = e
                  }
                },
                hd: function (t, e) {
                  t = m.a.c(t), e = m.a.c(e);
                  for (var n = [], i = t; i <= e; i++) n.push(i);
                  return n
                },
                V: function (t) {
                  for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]);
                  return e
                },
                Yb: function (t) {
                  return h ? Symbol(t) : t
                },
                rd: 6 === g,
                sd: 7 === g,
                C: g,
                ec: function (t, e) {
                  for (var n = m.a.V(t.getElementsByTagName("input")).concat(m.a.V(t.getElementsByTagName("textarea"))), i = "string" == typeof e ? function (t) {
                      return t.name === e
                    } : function (t) {
                      return e.test(t.name)
                    }, o = [], r = n.length - 1; 0 <= r; r--) i(n[r]) && o.push(n[r]);
                  return o
                },
                ed: function (t) {
                  return "string" == typeof t && (t = m.a.$a(t)) ? s && s.parse ? s.parse(t) : new Function("return " + t)() : null
                },
                Eb: function (t, e, n) {
                  if (!s || !s.stringify) throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                  return s.stringify(m.a.c(t), e, n)
                },
                fd: function (t, e, o) {
                  o = o || {};
                  var r = o.params || {},
                    s = o.includeFields || this.cc,
                    a = t;
                  if ("object" == typeof t && "form" === m.a.A(t))
                    for (var a = t.action, l = s.length - 1; 0 <= l; l--)
                      for (var u = m.a.ec(t, s[l]), c = u.length - 1; 0 <= c; c--) r[u[c].name] = u[c].value;
                  e = m.a.c(e);
                  var h = i.createElement("form");
                  h.style.display = "none", h.action = a, h.method = "post";
                  for (var p in e) t = i.createElement("input"), t.type = "hidden", t.name = p, t.value = m.a.Eb(m.a.c(e[p])), h.appendChild(t);
                  n(r, function (t, e) {
                    var n = i.createElement("input");
                    n.type = "hidden", n.name = t, n.value = e, h.appendChild(n)
                  }), i.body.appendChild(h), o.submitter ? o.submitter(h) : h.submit(), setTimeout(function () {
                    h.parentNode.removeChild(h)
                  }, 0)
                }
              }
            }(), m.b("utils", m.a), m.b("utils.arrayForEach", m.a.q), m.b("utils.arrayFirst", m.a.Sb), m.b("utils.arrayFilter", m.a.Ka), m.b("utils.arrayGetDistinctValues", m.a.Tb), m.b("utils.arrayIndexOf", m.a.o), m.b("utils.arrayMap", m.a.fb), m.b("utils.arrayPushAll", m.a.ra), m.b("utils.arrayRemoveItem", m.a.La), m.b("utils.extend", m.a.extend), m.b("utils.fieldsIncludedWithJsonPost", m.a.cc), m.b("utils.getFormFields", m.a.ec), m.b("utils.peekObservable", m.a.zb), m.b("utils.postJson", m.a.fd), m.b("utils.parseJson", m.a.ed), m.b("utils.registerEventHandler", m.a.p), m.b("utils.stringifyJson", m.a.Eb), m.b("utils.range", m.a.hd), m.b("utils.toggleDomNodeCssClass", m.a.bb), m.b("utils.triggerEvent", m.a.Da), m.b("utils.unwrapObservable", m.a.c), m.b("utils.objectForEach", m.a.D), m.b("utils.addOrRemoveItem", m.a.pa), m.b("utils.setTextContent", m.a.Za), m.b("unwrap", m.a.c), Function.prototype.bind || (Function.prototype.bind = function (t) {
              var e = this;
              if (1 === arguments.length) return function () {
                return e.apply(t, arguments)
              };
              var n = Array.prototype.slice.call(arguments, 1);
              return function () {
                var i = n.slice(0);
                return i.push.apply(i, arguments), e.apply(t, i)
              }
            }), m.a.e = new function () {
              function e(e, r) {
                var s = e[i];
                if (!s || "null" === s || !o[s]) {
                  if (!r) return t;
                  s = e[i] = "ko" + n++, o[s] = {}
                }
                return o[s]
              }
              var n = 0,
                i = "__ko__" + (new Date).getTime(),
                o = {};
              return {
                get: function (n, i) {
                  var o = e(n, !1);
                  return o === t ? t : o[i]
                },
                set: function (n, i, o) {
                  o === t && e(n, !1) === t || (e(n, !0)[i] = o)
                },
                clear: function (t) {
                  var e = t[i];
                  return !!e && (delete o[e], t[i] = null, !0)
                },
                I: function () {
                  return n++ + i
                }
              }
            }, m.b("utils.domData", m.a.e), m.b("utils.domData.clear", m.a.e.clear), m.a.F = new function () {
              function e(e, n) {
                var o = m.a.e.get(e, i);
                return o === t && n && (o = [], m.a.e.set(e, i, o)), o
              }

              function n(t) {
                var i = e(t, !1);
                if (i)
                  for (var i = i.slice(0), o = 0; o < i.length; o++) i[o](t);
                if (m.a.e.clear(t), m.a.F.cleanExternalData(t), s[t.nodeType])
                  for (i = t.firstChild; t = i;) i = t.nextSibling, 8 === t.nodeType && n(t)
              }
              var i = m.a.e.I(),
                o = {
                  1: !0,
                  8: !0,
                  9: !0
                },
                s = {
                  1: !0,
                  9: !0
                };
              return {
                oa: function (t, n) {
                  if ("function" != typeof n) throw Error("Callback must be a function");
                  e(t, !0).push(n)
                },
                pc: function (n, o) {
                  var r = e(n, !1);
                  r && (m.a.La(r, o), 0 == r.length && m.a.e.set(n, i, t))
                },
                $: function (t) {
                  if (o[t.nodeType] && (n(t), s[t.nodeType])) {
                    var e = [];
                    m.a.ra(e, t.getElementsByTagName("*"));
                    for (var i = 0, r = e.length; i < r; i++) n(e[i])
                  }
                  return t
                },
                removeNode: function (t) {
                  m.$(t), t.parentNode && t.parentNode.removeChild(t)
                },
                cleanExternalData: function (t) {
                  r && "function" == typeof r.cleanData && r.cleanData([t])
                }
              }
            }, m.$ = m.a.F.$, m.removeNode = m.a.F.removeNode, m.b("cleanNode", m.$), m.b("removeNode", m.removeNode), m.b("utils.domNodeDisposal", m.a.F), m.b("utils.domNodeDisposal.addDisposeCallback", m.a.F.oa), m.b("utils.domNodeDisposal.removeDisposeCallback", m.a.F.pc),
            function () {
              var n = [0, "", ""],
                o = [1, "<table>", "</table>"],
                s = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                a = [1, "<select multiple='multiple'>", "</select>"],
                l = {
                  thead: o,
                  tbody: o,
                  tfoot: o,
                  tr: [2, "<table><tbody>", "</tbody></table>"],
                  td: s,
                  th: s,
                  option: a,
                  optgroup: a
                },
                u = 8 >= m.a.C;
              m.a.ma = function (t, o) {
                var s;
                if (r) {
                  if (r.parseHTML) s = r.parseHTML(t, o) || [];
                  else if ((s = r.clean([t], o)) && s[0]) {
                    for (var a = s[0]; a.parentNode && 11 !== a.parentNode.nodeType;) a = a.parentNode;
                    a.parentNode && a.parentNode.removeChild(a)
                  }
                } else {
                  (s = o) || (s = i);
                  var c, a = s.parentWindow || s.defaultView || e,
                    h = m.a.$a(t).toLowerCase(),
                    p = s.createElement("div");
                  for (c = (h = h.match(/^<([a-z]+)[ >]/)) && l[h[1]] || n, h = c[0], c = "ignored<div>" + c[1] + t + c[2] + "</div>", "function" == typeof a.innerShiv ? p.appendChild(a.innerShiv(c)) : (u && s.appendChild(p), p.innerHTML = c, u && p.parentNode.removeChild(p)); h--;) p = p.lastChild;
                  s = m.a.V(p.lastChild.childNodes)
                }
                return s
              }, m.a.Cb = function (e, n) {
                if (m.a.ob(e), n = m.a.c(n), null !== n && n !== t)
                  if ("string" != typeof n && (n = n.toString()), r) r(e).html(n);
                  else
                    for (var i = m.a.ma(n, e.ownerDocument), o = 0; o < i.length; o++) e.appendChild(i[o])
              }
            }(), m.b("utils.parseHtmlFragment", m.a.ma), m.b("utils.setHtml", m.a.Cb), m.M = function () {
              function e(t, n) {
                if (t)
                  if (8 == t.nodeType) {
                    var i = m.M.lc(t.nodeValue);
                    null != i && n.push({
                      Lc: t,
                      cd: i
                    })
                  } else if (1 == t.nodeType)
                  for (var i = 0, o = t.childNodes, r = o.length; i < r; i++) e(o[i], n)
              }
              var n = {};
              return {
                wb: function (t) {
                  if ("function" != typeof t) throw Error("You can only pass a function to ko.memoization.memoize()");
                  var e = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
                  return n[e] = t, "<!--[ko_memo:" + e + "]-->"
                },
                xc: function (e, i) {
                  var o = n[e];
                  if (o === t) throw Error("Couldn't find any memo with ID " + e + ". Perhaps it's already been unmemoized.");
                  try {
                    return o.apply(null, i || []), !0
                  } finally {
                    delete n[e]
                  }
                },
                yc: function (t, n) {
                  var i = [];
                  e(t, i);
                  for (var o = 0, r = i.length; o < r; o++) {
                    var s = i[o].Lc,
                      a = [s];
                    n && m.a.ra(a, n), m.M.xc(i[o].cd, a), s.nodeValue = "", s.parentNode && s.parentNode.removeChild(s)
                  }
                },
                lc: function (t) {
                  return (t = t.match(/^\[ko_memo\:(.*?)\]$/)) ? t[1] : null
                }
              }
            }(), m.b("memoization", m.M), m.b("memoization.memoize", m.M.wb), m.b("memoization.unmemoize", m.M.xc), m.b("memoization.parseMemoText", m.M.lc), m.b("memoization.unmemoizeDomNodeAndDescendants", m.M.yc), m.Y = function () {
              function t() {
                if (r)
                  for (var t, e = r, n = 0; a < r;)
                    if (t = o[a++]) {
                      if (a > e) {
                        if (5e3 <= ++n) {
                          a = r, m.a.$b(Error("'Too much recursion' after processing " + n + " task groups."));
                          break
                        }
                        e = r
                      }
                      try {
                        t()
                      } catch (t) {
                        m.a.$b(t)
                      }
                    }
              }

              function n() {
                t(), a = r = o.length = 0
              }
              var o = [],
                r = 0,
                s = 1,
                a = 0;
              return {
                scheduler: e.MutationObserver ? function (t) {
                  var e = i.createElement("div");
                  return new MutationObserver(t).observe(e, {
                      attributes: !0
                    }),
                    function () {
                      e.classList.toggle("foo")
                    }
                }(n) : i && "onreadystatechange" in i.createElement("script") ? function (t) {
                  var e = i.createElement("script");
                  e.onreadystatechange = function () {
                    e.onreadystatechange = null, i.documentElement.removeChild(e), e = null, t()
                  }, i.documentElement.appendChild(e)
                } : function (t) {
                  setTimeout(t, 0)
                },
                Wa: function (t) {
                  return r || m.Y.scheduler(n), o[r++] = t, s++
                },
                cancel: function (t) {
                  t -= s - r, t >= a && t < r && (o[t] = null)
                },
                resetForTesting: function () {
                  var t = r - a;
                  return a = r = o.length = 0, t
                },
                md: t
              }
            }(), m.b("tasks", m.Y), m.b("tasks.schedule", m.Y.Wa), m.b("tasks.runEarly", m.Y.md), m.ya = {
              throttle: function (t, e) {
                t.throttleEvaluation = e;
                var n = null;
                return m.B({
                  read: t,
                  write: function (i) {
                    clearTimeout(n), n = m.a.setTimeout(function () {
                      t(i)
                    }, e)
                  }
                })
              },
              rateLimit: function (t, e) {
                var n, i, o;
                "number" == typeof e ? n = e : (n = e.timeout, i = e.method), t.cb = !1, o = "notifyWhenChangesStop" == i ? c : u, t.Ta(function (t) {
                  return o(t, n)
                })
              },
              deferred: function (e, n) {
                if (!0 !== n) throw Error("The 'deferred' extender only accepts the value 'true', because it is not supported to turn deferral off once enabled.");
                e.cb || (e.cb = !0, e.Ta(function (n) {
                  var i;
                  return function () {
                    m.Y.cancel(i), i = m.Y.Wa(n), e.notifySubscribers(t, "dirty")
                  }
                }))
              },
              notify: function (t, e) {
                t.equalityComparer = "always" == e ? null : l
              }
            };
          var g = {
            undefined: 1,
            boolean: 1,
            number: 1,
            string: 1
          };
          m.b("extenders", m.ya), m.vc = function (t, e, n) {
            this.ia = t, this.gb = e, this.Kc = n, this.R = !1, m.G(this, "dispose", this.k)
          }, m.vc.prototype.k = function () {
            this.R = !0, this.Kc()
          }, m.J = function () {
            m.a.Ya(this, v), v.rb(this)
          };
          var _ = "change",
            v = {
              rb: function (t) {
                t.K = {}, t.Nb = 1
              },
              X: function (t, e, n) {
                var i = this;
                n = n || _;
                var o = new m.vc(i, e ? t.bind(e) : t, function () {
                  m.a.La(i.K[n], o), i.Ia && i.Ia(n)
                });
                return i.sa && i.sa(n), i.K[n] || (i.K[n] = []), i.K[n].push(o), o
              },
              notifySubscribers: function (t, e) {
                if (e = e || _, e === _ && this.zc(), this.Pa(e)) try {
                  m.l.Ub();
                  for (var n, i = this.K[e].slice(0), o = 0; n = i[o]; ++o) n.R || n.gb(t)
                } finally {
                  m.l.end()
                }
              },
              Na: function () {
                return this.Nb
              },
              Uc: function (t) {
                return this.Na() !== t
              },
              zc: function () {
                ++this.Nb
              },
              Ta: function (t) {
                var e, n, i, o = this,
                  r = m.H(o);
                o.Ha || (o.Ha = o.notifySubscribers, o.notifySubscribers = h);
                var s = t(function () {
                  o.Mb = !1, r && i === o && (i = o()), e = !1, o.tb(n, i) && o.Ha(n = i)
                });
                o.Lb = function (t) {
                  o.Mb = e = !0, i = t, s()
                }, o.Kb = function (t) {
                  e || (n = t, o.Ha(t, "beforeChange"))
                }
              },
              Pa: function (t) {
                return this.K[t] && this.K[t].length
              },
              Sc: function (t) {
                if (t) return this.K[t] && this.K[t].length || 0;
                var e = 0;
                return m.a.D(this.K, function (t, n) {
                  "dirty" !== t && (e += n.length)
                }), e
              },
              tb: function (t, e) {
                return !this.equalityComparer || !this.equalityComparer(t, e)
              },
              extend: function (t) {
                var e = this;
                return t && m.a.D(t, function (t, n) {
                  var i = m.ya[t];
                  "function" == typeof i && (e = i(e, n) || e)
                }), e
              }
            };
          m.G(v, "subscribe", v.X), m.G(v, "extend", v.extend), m.G(v, "getSubscriptionsCount", v.Sc), m.a.ka && m.a.Xa(v, Function.prototype), m.J.fn = v, m.hc = function (t) {
            return null != t && "function" == typeof t.X && "function" == typeof t.notifySubscribers
          }, m.b("subscribable", m.J), m.b("isSubscribable", m.hc), m.va = m.l = function () {
            function t(t) {
              i.push(n), n = t
            }

            function e() {
              n = i.pop()
            }
            var n, i = [],
              o = 0;
            return {
              Ub: t,
              end: e,
              oc: function (t) {
                if (n) {
                  if (!m.hc(t)) throw Error("Only subscribable things can act as dependencies");
                  n.gb.call(n.Gc, t, t.Cc || (t.Cc = ++o))
                }
              },
              w: function (n, i, o) {
                try {
                  return t(), n.apply(i, o || [])
                } finally {
                  e()
                }
              },
              Aa: function () {
                if (n) return n.m.Aa()
              },
              Sa: function () {
                if (n) return n.Sa
              }
            }
          }(), m.b("computedContext", m.va), m.b("computedContext.getDependenciesCount", m.va.Aa), m.b("computedContext.isInitial", m.va.Sa), m.b("ignoreDependencies", m.qd = m.l.w);
          var y = m.a.Yb("_latestValue");
          m.N = function (t) {
            function e() {
              return 0 < arguments.length ? (e.tb(e[y], arguments[0]) && (e.ga(), e[y] = arguments[0], e.fa()), this) : (m.l.oc(e), e[y])
            }
            return e[y] = t, m.a.ka || m.a.extend(e, m.J.fn), m.J.fn.rb(e), m.a.Ya(e, b), m.options.deferUpdates && m.ya.deferred(e, !0), e
          };
          var b = {
            equalityComparer: l,
            t: function () {
              return this[y]
            },
            fa: function () {
              this.notifySubscribers(this[y])
            },
            ga: function () {
              this.notifySubscribers(this[y], "beforeChange")
            }
          };
          m.a.ka && m.a.Xa(b, m.J.fn);
          var w = m.N.gd = "__ko_proto__";
          b[w] = m.N, m.Oa = function (e, n) {
            return null !== e && e !== t && e[w] !== t && (e[w] === n || m.Oa(e[w], n))
          }, m.H = function (t) {
            return m.Oa(t, m.N)
          }, m.Ba = function (t) {
            return !!("function" == typeof t && t[w] === m.N || "function" == typeof t && t[w] === m.B && t.Vc)
          }, m.b("observable", m.N), m.b("isObservable", m.H), m.b("isWriteableObservable", m.Ba), m.b("isWritableObservable", m.Ba), m.b("observable.fn", b), m.G(b, "peek", b.t), m.G(b, "valueHasMutated", b.fa), m.G(b, "valueWillMutate", b.ga), m.la = function (t) {
            if (t = t || [], "object" != typeof t || !("length" in t)) throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
            return t = m.N(t), m.a.Ya(t, m.la.fn), t.extend({
              trackArrayChanges: !0
            })
          }, m.la.fn = {
            remove: function (t) {
              for (var e = this.t(), n = [], i = "function" != typeof t || m.H(t) ? function (e) {
                  return e === t
                } : t, o = 0; o < e.length; o++) {
                var r = e[o];
                i(r) && (0 === n.length && this.ga(), n.push(r), e.splice(o, 1), o--)
              }
              return n.length && this.fa(), n
            },
            removeAll: function (e) {
              if (e === t) {
                var n = this.t(),
                  i = n.slice(0);
                return this.ga(), n.splice(0, n.length), this.fa(), i
              }
              return e ? this.remove(function (t) {
                return 0 <= m.a.o(e, t)
              }) : []
            },
            destroy: function (t) {
              var e = this.t(),
                n = "function" != typeof t || m.H(t) ? function (e) {
                  return e === t
                } : t;
              this.ga();
              for (var i = e.length - 1; 0 <= i; i--) n(e[i]) && (e[i]._destroy = !0);
              this.fa()
            },
            destroyAll: function (e) {
              return e === t ? this.destroy(function () {
                return !0
              }) : e ? this.destroy(function (t) {
                return 0 <= m.a.o(e, t)
              }) : []
            },
            indexOf: function (t) {
              var e = this();
              return m.a.o(e, t)
            },
            replace: function (t, e) {
              var n = this.indexOf(t);
              0 <= n && (this.ga(), this.t()[n] = e, this.fa())
            }
          }, m.a.ka && m.a.Xa(m.la.fn, m.N.fn), m.a.q("pop push reverse shift sort splice unshift".split(" "), function (t) {
            m.la.fn[t] = function () {
              var e = this.t();
              this.ga(), this.Vb(e, t, arguments);
              var n = e[t].apply(e, arguments);
              return this.fa(), n === e ? this : n
            }
          }), m.a.q(["slice"], function (t) {
            m.la.fn[t] = function () {
              var e = this();
              return e[t].apply(e, arguments)
            }
          }), m.b("observableArray", m.la), m.ya.trackArrayChanges = function (t, e) {
            function n() {
              if (!o) {
                o = !0;
                var e = t.notifySubscribers;
                t.notifySubscribers = function (t, n) {
                  return n && n !== _ || ++s, e.apply(this, arguments)
                };
                var n = [].concat(t.t() || []);
                r = null, i = t.X(function (e) {
                  if (e = [].concat(e || []), t.Pa("arrayChange")) {
                    var i;
                    (!r || 1 < s) && (r = m.a.ib(n, e, t.hb)), i = r
                  }
                  n = e, r = null, s = 0, i && i.length && t.notifySubscribers(i, "arrayChange")
                })
              }
            }
            if (t.hb = {}, e && "object" == typeof e && m.a.extend(t.hb, e), t.hb.sparse = !0, !t.Vb) {
              var i, o = !1,
                r = null,
                s = 0,
                a = t.sa,
                l = t.Ia;
              t.sa = function (e) {
                a && a.call(t, e), "arrayChange" === e && n()
              }, t.Ia = function (e) {
                l && l.call(t, e), "arrayChange" !== e || t.Pa("arrayChange") || (i.k(), o = !1)
              }, t.Vb = function (t, e, n) {
                function i(t, e, n) {
                  return a[a.length] = {
                    status: t,
                    value: e,
                    index: n
                  }
                }
                if (o && !s) {
                  var a = [],
                    l = t.length,
                    u = n.length,
                    c = 0;
                  switch (e) {
                    case "push":
                      c = l;
                    case "unshift":
                      for (e = 0; e < u; e++) i("added", n[e], c + e);
                      break;
                    case "pop":
                      c = l - 1;
                    case "shift":
                      l && i("deleted", t[c], c);
                      break;
                    case "splice":
                      e = Math.min(Math.max(0, 0 > n[0] ? l + n[0] : n[0]), l);
                      for (var l = 1 === u ? l : Math.min(e + (n[1] || 0), l), u = e + u - 2, c = Math.max(l, u), h = [], p = [], f = 2; e < c; ++e, ++f) e < l && p.push(i("deleted", t[e], e)), e < u && h.push(i("added", n[f], e));
                      m.a.dc(p, h);
                      break;
                    default:
                      return
                  }
                  r = a
                }
              }
            }
          };
          var k = m.a.Yb("_state");
          m.m = m.B = function (e, n, i) {
            function o() {
              if (0 < arguments.length) {
                if ("function" != typeof r) throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                return r.apply(s.pb, arguments), this
              }
              return m.l.oc(o), (s.S || s.s && o.Qa()) && o.aa(), s.T
            }
            if ("object" == typeof e ? i = e : (i = i || {}, e && (i.read = e)), "function" != typeof i.read) throw Error("Pass a function that returns the value of the ko.computed");
            var r = i.write,
              s = {
                T: t,
                S: !0,
                Ra: !1,
                Fb: !1,
                R: !1,
                Va: !1,
                s: !1,
                jd: i.read,
                pb: n || i.owner,
                i: i.disposeWhenNodeIsRemoved || i.i || null,
                wa: i.disposeWhen || i.wa,
                mb: null,
                r: {},
                L: 0,
                bc: null
              };
            return o[k] = s, o.Vc = "function" == typeof r, m.a.ka || m.a.extend(o, m.J.fn), m.J.fn.rb(o), m.a.Ya(o, C), i.pure ? (s.Va = !0, s.s = !0, m.a.extend(o, x)) : i.deferEvaluation && m.a.extend(o, E), m.options.deferUpdates && m.ya.deferred(o, !0), s.i && (s.Fb = !0, s.i.nodeType || (s.i = null)), s.s || i.deferEvaluation || o.aa(), s.i && o.ba() && m.a.F.oa(s.i, s.mb = function () {
              o.k()
            }), o
          };
          var C = {
              equalityComparer: l,
              Aa: function () {
                return this[k].L
              },
              Pb: function (t, e, n) {
                if (this[k].Va && e === this) throw Error("A 'pure' computed must not be called recursively");
                this[k].r[t] = n, n.Ga = this[k].L++, n.na = e.Na()
              },
              Qa: function () {
                var t, e, n = this[k].r;
                for (t in n)
                  if (n.hasOwnProperty(t) && (e = n[t], e.ia.Uc(e.na))) return !0
              },
              bd: function () {
                this.Fa && !this[k].Ra && this.Fa()
              },
              ba: function () {
                return this[k].S || 0 < this[k].L
              },
              ld: function () {
                this.Mb || this.ac()
              },
              uc: function (t) {
                if (t.cb && !this[k].i) {
                  var e = t.X(this.bd, this, "dirty"),
                    n = t.X(this.ld, this);
                  return {
                    ia: t,
                    k: function () {
                      e.k(), n.k()
                    }
                  }
                }
                return t.X(this.ac, this)
              },
              ac: function () {
                var t = this,
                  e = t.throttleEvaluation;
                e && 0 <= e ? (clearTimeout(this[k].bc), this[k].bc = m.a.setTimeout(function () {
                  t.aa(!0)
                }, e)) : t.Fa ? t.Fa() : t.aa(!0)
              },
              aa: function (t) {
                var e = this[k],
                  n = e.wa;
                if (!e.Ra && !e.R) {
                  if (e.i && !m.a.nb(e.i) || n && n()) {
                    if (!e.Fb) return void this.k()
                  } else e.Fb = !1;
                  e.Ra = !0;
                  try {
                    this.Qc(t)
                  } finally {
                    e.Ra = !1
                  }
                  e.L || this.k()
                }
              },
              Qc: function (e) {
                var n = this[k],
                  i = n.Va ? t : !n.L,
                  o = {
                    Hc: this,
                    Ma: n.r,
                    lb: n.L
                  };
                m.l.Ub({
                  Gc: o,
                  gb: f,
                  m: this,
                  Sa: i
                }), n.r = {}, n.L = 0, o = this.Pc(n, o), this.tb(n.T, o) && (n.s || this.notifySubscribers(n.T, "beforeChange"), n.T = o, n.s ? this.zc() : e && this.notifySubscribers(n.T)), i && this.notifySubscribers(n.T, "awake")
              },
              Pc: function (t, e) {
                try {
                  var n = t.jd;
                  return t.pb ? n.call(t.pb) : n()
                } finally {
                  m.l.end(), e.lb && !t.s && m.a.D(e.Ma, p), t.S = !1
                }
              },
              t: function () {
                var t = this[k];
                return (t.S && !t.L || t.s && this.Qa()) && this.aa(), t.T
              },
              Ta: function (t) {
                m.J.fn.Ta.call(this, t), this.Fa = function () {
                  this.Kb(this[k].T), this[k].S = !0, this.Lb(this)
                }
              },
              k: function () {
                var t = this[k];
                !t.s && t.r && m.a.D(t.r, function (t, e) {
                  e.k && e.k()
                }), t.i && t.mb && m.a.F.pc(t.i, t.mb), t.r = null, t.L = 0, t.R = !0, t.S = !1, t.s = !1, t.i = null
              }
            },
            x = {
              sa: function (t) {
                var e = this,
                  n = e[k];
                if (!n.R && n.s && "change" == t) {
                  if (n.s = !1, n.S || e.Qa()) n.r = null, n.L = 0, n.S = !0, e.aa();
                  else {
                    var i = [];
                    m.a.D(n.r, function (t, e) {
                      i[e.Ga] = t
                    }), m.a.q(i, function (t, i) {
                      var o = n.r[t],
                        r = e.uc(o.ia);
                      r.Ga = i, r.na = o.na, n.r[t] = r
                    })
                  }
                  n.R || e.notifySubscribers(n.T, "awake")
                }
              },
              Ia: function (e) {
                var n = this[k];
                n.R || "change" != e || this.Pa("change") || (m.a.D(n.r, function (t, e) {
                  e.k && (n.r[t] = {
                    ia: e.ia,
                    Ga: e.Ga,
                    na: e.na
                  }, e.k())
                }), n.s = !0, this.notifySubscribers(t, "asleep"))
              },
              Na: function () {
                var t = this[k];
                return t.s && (t.S || this.Qa()) && this.aa(), m.J.fn.Na.call(this)
              }
            },
            E = {
              sa: function (t) {
                "change" != t && "beforeChange" != t || this.t()
              }
            };
          m.a.ka && m.a.Xa(C, m.J.fn);
          var L = m.N.gd;
          m.m[L] = m.N, C[L] = m.m, m.Xc = function (t) {
              return m.Oa(t, m.m)
            }, m.Yc = function (t) {
              return m.Oa(t, m.m) && t[k] && t[k].Va
            }, m.b("computed", m.m), m.b("dependentObservable", m.m), m.b("isComputed", m.Xc), m.b("isPureComputed", m.Yc), m.b("computed.fn", C), m.G(C, "peek", C.t), m.G(C, "dispose", C.k), m.G(C, "isActive", C.ba), m.G(C, "getDependenciesCount", C.Aa), m.nc = function (t, e) {
              return "function" == typeof t ? m.m(t, e, {
                pure: !0
              }) : (t = m.a.extend({}, t), t.pure = !0, m.m(t, e))
            }, m.b("pureComputed", m.nc),
            function () {
              function e(o, r, s) {
                if (s = s || new i, o = r(o), "object" != typeof o || null === o || o === t || o instanceof RegExp || o instanceof Date || o instanceof String || o instanceof Number || o instanceof Boolean) return o;
                var a = o instanceof Array ? [] : {};
                return s.save(o, a), n(o, function (n) {
                  var i = r(o[n]);
                  switch (typeof i) {
                    case "boolean":
                    case "number":
                    case "string":
                    case "function":
                      a[n] = i;
                      break;
                    case "object":
                    case "undefined":
                      var l = s.get(i);
                      a[n] = l !== t ? l : e(i, r, s)
                  }
                }), a
              }

              function n(t, e) {
                if (t instanceof Array) {
                  for (var n = 0; n < t.length; n++) e(n);
                  "function" == typeof t.toJSON && e("toJSON")
                } else
                  for (n in t) e(n)
              }

              function i() {
                this.keys = [], this.Ib = []
              }
              m.wc = function (t) {
                if (0 == arguments.length) throw Error("When calling ko.toJS, pass the object you want to convert.");
                return e(t, function (t) {
                  for (var e = 0; m.H(t) && 10 > e; e++) t = t();
                  return t
                })
              }, m.toJSON = function (t, e, n) {
                return t = m.wc(t), m.a.Eb(t, e, n)
              }, i.prototype = {
                save: function (t, e) {
                  var n = m.a.o(this.keys, t);
                  0 <= n ? this.Ib[n] = e : (this.keys.push(t), this.Ib.push(e))
                },
                get: function (e) {
                  return e = m.a.o(this.keys, e), 0 <= e ? this.Ib[e] : t
                }
              }
            }(), m.b("toJS", m.wc), m.b("toJSON", m.toJSON),
            function () {
              m.j = {
                u: function (e) {
                  switch (m.a.A(e)) {
                    case "option":
                      return !0 === e.__ko__hasDomDataOptionValue__ ? m.a.e.get(e, m.d.options.xb) : 7 >= m.a.C ? e.getAttributeNode("value") && e.getAttributeNode("value").specified ? e.value : e.text : e.value;
                    case "select":
                      return 0 <= e.selectedIndex ? m.j.u(e.options[e.selectedIndex]) : t;
                    default:
                      return e.value
                  }
                },
                ha: function (e, n, i) {
                  switch (m.a.A(e)) {
                    case "option":
                      switch (typeof n) {
                        case "string":
                          m.a.e.set(e, m.d.options.xb, t), "__ko__hasDomDataOptionValue__" in e && delete e.__ko__hasDomDataOptionValue__, e.value = n;
                          break;
                        default:
                          m.a.e.set(e, m.d.options.xb, n), e.__ko__hasDomDataOptionValue__ = !0, e.value = "number" == typeof n ? n : ""
                      }
                      break;
                    case "select":
                      "" !== n && null !== n || (n = t);
                      for (var o, r = -1, s = 0, a = e.options.length; s < a; ++s)
                        if (o = m.j.u(e.options[s]), o == n || "" == o && n === t) {
                          r = s;
                          break
                        }(i || 0 <= r || n === t && 1 < e.size) && (e.selectedIndex = r);
                      break;
                    default:
                      null !== n && n !== t || (n = ""), e.value = n
                  }
                }
              }
            }(), m.b("selectExtensions", m.j), m.b("selectExtensions.readValue", m.j.u), m.b("selectExtensions.writeValue", m.j.ha), m.h = function () {
              function t(t) {
                t = m.a.$a(t), 123 === t.charCodeAt(0) && (t = t.slice(1, -1));
                var e, n = [],
                  s = t.match(i),
                  a = [],
                  l = 0;
                if (s) {
                  s.push(",");
                  for (var u, c = 0; u = s[c]; ++c) {
                    var h = u.charCodeAt(0);
                    if (44 === h) {
                      if (0 >= l) {
                        n.push(e && a.length ? {
                          key: e,
                          value: a.join("")
                        } : {
                          unknown: e || a.join("")
                        }), e = l = 0, a = [];
                        continue
                      }
                    } else if (58 === h) {
                      if (!l && !e && 1 === a.length) {
                        e = a.pop();
                        continue
                      }
                    } else 47 === h && c && 1 < u.length ? (h = s[c - 1].match(o)) && !r[h[0]] && (t = t.substr(t.indexOf(u) + 1), s = t.match(i), s.push(","), c = -1, u = "/") : 40 === h || 123 === h || 91 === h ? ++l : 41 === h || 125 === h || 93 === h ? --l : e || a.length || 34 !== h && 39 !== h || (u = u.slice(1, -1));
                    a.push(u)
                  }
                }
                return n
              }
              var e = ["true", "false", "null", "undefined"],
                n = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
                i = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"),
                o = /[\])"'A-Za-z0-9_$]+$/,
                r = { in: 1,
                  return: 1,
                  typeof: 1
                },
                s = {};
              return {
                ta: [],
                ea: s,
                yb: t,
                Ua: function (i, o) {
                  function r(t, i) {
                    var o;
                    if (!c) {
                      var h = m.getBindingHandler(t);
                      if (h && h.preprocess && !(i = h.preprocess(i, t, r))) return;
                      (h = s[t]) && (o = i, 0 <= m.a.o(e, o) ? o = !1 : (h = o.match(n), o = null !== h && (h[1] ? "Object(" + h[1] + ")" + h[2] : o)), h = o), h && l.push("'" + t + "':function(_z){" + o + "=_z}")
                    }
                    u && (i = "function(){return " + i + " }"), a.push("'" + t + "':" + i)
                  }
                  o = o || {};
                  var a = [],
                    l = [],
                    u = o.valueAccessors,
                    c = o.bindingParams,
                    h = "string" == typeof i ? t(i) : i;
                  return m.a.q(h, function (t) {
                    r(t.key || t.unknown, t.value)
                  }), l.length && r("_ko_property_writers", "{" + l.join(",") + " }"), a.join(",")
                },
                ad: function (t, e) {
                  for (var n = 0; n < t.length; n++)
                    if (t[n].key == e) return !0;
                  return !1
                },
                Ea: function (t, e, n, i, o) {
                  t && m.H(t) ? !m.Ba(t) || o && t.t() === i || t(i) : (t = e.get("_ko_property_writers")) && t[n] && t[n](i)
                }
              }
            }(), m.b("expressionRewriting", m.h), m.b("expressionRewriting.bindingRewriteValidators", m.h.ta), m.b("expressionRewriting.parseObjectLiteral", m.h.yb), m.b("expressionRewriting.preProcessBindings", m.h.Ua), m.b("expressionRewriting._twoWayBindings", m.h.ea), m.b("jsonExpressionRewriting", m.h), m.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", m.h.Ua),
            function () {
              function t(t) {
                return 8 == t.nodeType && s.test(r ? t.text : t.nodeValue)
              }

              function e(t) {
                return 8 == t.nodeType && a.test(r ? t.text : t.nodeValue)
              }

              function n(n, i) {
                for (var o = n, r = 1, s = []; o = o.nextSibling;) {
                  if (e(o) && (r--, 0 === r)) return s;
                  s.push(o), t(o) && r++
                }
                if (!i) throw Error("Cannot find closing comment tag to match: " + n.nodeValue);
                return null
              }

              function o(t, e) {
                var i = n(t, e);
                return i ? 0 < i.length ? i[i.length - 1].nextSibling : t.nextSibling : null
              }
              var r = i && "<!--test-->" === i.createComment("test").text,
                s = r ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
                a = r ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
                l = {
                  ul: !0,
                  ol: !0
                };
              m.f = {
                Z: {},
                childNodes: function (e) {
                  return t(e) ? n(e) : e.childNodes
                },
                xa: function (e) {
                  if (t(e)) {
                    e = m.f.childNodes(e);
                    for (var n = 0, i = e.length; n < i; n++) m.removeNode(e[n])
                  } else m.a.ob(e)
                },
                da: function (e, n) {
                  if (t(e)) {
                    m.f.xa(e);
                    for (var i = e.nextSibling, o = 0, r = n.length; o < r; o++) i.parentNode.insertBefore(n[o], i)
                  } else m.a.da(e, n)
                },
                mc: function (e, n) {
                  t(e) ? e.parentNode.insertBefore(n, e.nextSibling) : e.firstChild ? e.insertBefore(n, e.firstChild) : e.appendChild(n)
                },
                gc: function (e, n, i) {
                  i ? t(e) ? e.parentNode.insertBefore(n, i.nextSibling) : i.nextSibling ? e.insertBefore(n, i.nextSibling) : e.appendChild(n) : m.f.mc(e, n)
                },
                firstChild: function (n) {
                  return t(n) ? !n.nextSibling || e(n.nextSibling) ? null : n.nextSibling : n.firstChild
                },
                nextSibling: function (n) {
                  return t(n) && (n = o(n)), n.nextSibling && e(n.nextSibling) ? null : n.nextSibling
                },
                Tc: t,
                pd: function (t) {
                  return (t = (r ? t.text : t.nodeValue).match(s)) ? t[1] : null
                },
                kc: function (n) {
                  if (l[m.a.A(n)]) {
                    var i = n.firstChild;
                    if (i)
                      do
                        if (1 === i.nodeType) {
                          var r;
                          r = i.firstChild;
                          var s = null;
                          if (r)
                            do
                              if (s) s.push(r);
                              else if (t(r)) {
                            var a = o(r, !0);
                            a ? r = a : s = [r]
                          } else e(r) && (s = [r]);
                          while (r = r.nextSibling);
                          if (r = s)
                            for (s = i.nextSibling, a = 0; a < r.length; a++) s ? n.insertBefore(r[a], s) : n.appendChild(r[a])
                        } while (i = i.nextSibling)
                  }
                }
              }
            }(), m.b("virtualElements", m.f), m.b("virtualElements.allowedBindings", m.f.Z), m.b("virtualElements.emptyNode", m.f.xa), m.b("virtualElements.insertAfter", m.f.gc), m.b("virtualElements.prepend", m.f.mc), m.b("virtualElements.setDomNodeChildren", m.f.da),
            function () {
              m.Q = function () {
                this.Fc = {}
              }, m.a.extend(m.Q.prototype, {
                nodeHasBindings: function (t) {
                  switch (t.nodeType) {
                    case 1:
                      return null != t.getAttribute("data-bind") || m.g.getComponentNameForNode(t);
                    case 8:
                      return m.f.Tc(t);
                    default:
                      return !1
                  }
                },
                getBindings: function (t, e) {
                  var n = this.getBindingsString(t, e),
                    n = n ? this.parseBindingsString(n, e, t) : null;
                  return m.g.Ob(n, t, e, !1)
                },
                getBindingAccessors: function (t, e) {
                  var n = this.getBindingsString(t, e),
                    n = n ? this.parseBindingsString(n, e, t, {
                      valueAccessors: !0
                    }) : null;
                  return m.g.Ob(n, t, e, !0)
                },
                getBindingsString: function (t) {
                  switch (t.nodeType) {
                    case 1:
                      return t.getAttribute("data-bind");
                    case 8:
                      return m.f.pd(t);
                    default:
                      return null
                  }
                },
                parseBindingsString: function (t, e, n, i) {
                  try {
                    var o, r = this.Fc,
                      s = t + (i && i.valueAccessors || "");
                    if (!(o = r[s])) {
                      var a, l = "with($context){with($data||{}){return{" + m.h.Ua(t, i) + "}}}";
                      a = new Function("$context", "$element", l), o = r[s] = a
                    }
                    return o(e, n)
                  } catch (e) {
                    throw e.message = "Unable to parse bindings.\nBindings value: " + t + "\nMessage: " + e.message, e
                  }
                }
              }), m.Q.instance = new m.Q
            }(), m.b("bindingProvider", m.Q),
            function () {
              function n(t) {
                return function () {
                  return t
                }
              }

              function i(t) {
                return t()
              }

              function o(t) {
                return m.a.Ca(m.l.w(t), function (e, n) {
                  return function () {
                    return t()[n]
                  }
                })
              }

              function s(t, e, i) {
                return "function" == typeof t ? o(t.bind(null, e, i)) : m.a.Ca(t, n)
              }

              function a(t, e) {
                return o(this.getBindings.bind(this, t, e))
              }

              function l(t, e, n) {
                var i, o = m.f.firstChild(e),
                  r = m.Q.instance,
                  s = r.preprocessNode;
                if (s) {
                  for (; i = o;) o = m.f.nextSibling(i), s.call(r, i);
                  o = m.f.firstChild(e)
                }
                for (; i = o;) o = m.f.nextSibling(i), u(t, i, n)
              }

              function u(t, e, n) {
                var i = !0,
                  o = 1 === e.nodeType;
                o && m.f.kc(e), (o && n || m.Q.instance.nodeHasBindings(e)) && (i = h(e, null, t, n).shouldBindDescendants), i && !f[m.a.A(e)] && l(t, e, !o)
              }

              function c(t) {
                var e = [],
                  n = {},
                  i = [];
                return m.a.D(t, function o(r) {
                  if (!n[r]) {
                    var s = m.getBindingHandler(r);
                    s && (s.after && (i.push(r), m.a.q(s.after, function (e) {
                      if (t[e]) {
                        if (-1 !== m.a.o(i, e)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + i.join(", "));
                        o(e)
                      }
                    }), i.length--), e.push({
                      key: r,
                      fc: s
                    })), n[r] = !0
                  }
                }), e
              }

              function h(e, n, o, r) {
                var s = m.a.e.get(e, d);
                if (!n) {
                  if (s) throw Error("You cannot apply bindings multiple times to the same element.");
                  m.a.e.set(e, d, !0)
                }!s && r && m.tc(e, o);
                var l;
                if (n && "function" != typeof n) l = n;
                else {
                  var u = m.Q.instance,
                    h = u.getBindingAccessors || a,
                    p = m.B(function () {
                      return (l = n ? n(o, e) : h.call(u, e, o)) && o.P && o.P(), l
                    }, null, {
                      i: e
                    });
                  l && p.ba() || (p = null)
                }
                var f;
                if (l) {
                  var g = p ? function (t) {
                      return function () {
                        return i(p()[t])
                      }
                    } : function (t) {
                      return l[t]
                    },
                    _ = function () {
                      return m.a.Ca(p ? p() : l, i)
                    };
                  _.get = function (t) {
                    return l[t] && i(g(t))
                  }, _.has = function (t) {
                    return t in l
                  }, r = c(l), m.a.q(r, function (n) {
                    var i = n.fc.init,
                      r = n.fc.update,
                      s = n.key;
                    if (8 === e.nodeType && !m.f.Z[s]) throw Error("The binding '" + s + "' cannot be used with virtual elements");
                    try {
                      "function" == typeof i && m.l.w(function () {
                        var n = i(e, g(s), _, o.$data, o);
                        if (n && n.controlsDescendantBindings) {
                          if (f !== t) throw Error("Multiple bindings (" + f + " and " + s + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                          f = s
                        }
                      }), "function" == typeof r && m.B(function () {
                        r(e, g(s), _, o.$data, o)
                      }, null, {
                        i: e
                      })
                    } catch (t) {
                      throw t.message = 'Unable to process binding "' + s + ": " + l[s] + '"\nMessage: ' + t.message, t
                    }
                  })
                }
                return {
                  shouldBindDescendants: f === t
                }
              }

              function p(t) {
                return t && t instanceof m.U ? t : new m.U(t)
              }
              m.d = {};
              var f = {
                script: !0,
                textarea: !0,
                template: !0
              };
              m.getBindingHandler = function (t) {
                return m.d[t]
              }, m.U = function (e, n, i, o) {
                var r, s = this,
                  a = "function" == typeof e && !m.H(e),
                  l = m.B(function () {
                    var t = a ? e() : e,
                      r = m.a.c(t);
                    return n ? (n.P && n.P(), m.a.extend(s, n), l && (s.P = l)) : (s.$parents = [], s.$root = r, s.ko = m), s.$rawData = t, s.$data = r, i && (s[i] = r), o && o(s, n, r), s.$data
                  }, null, {
                    wa: function () {
                      return r && !m.a.Qb(r)
                    },
                    i: !0
                  });
                l.ba() && (s.P = l, l.equalityComparer = null, r = [], l.Ac = function (e) {
                  r.push(e), m.a.F.oa(e, function (e) {
                    m.a.La(r, e), r.length || (l.k(), s.P = l = t)
                  })
                })
              }, m.U.prototype.createChildContext = function (t, e, n) {
                return new m.U(t, this, e, function (t, e) {
                  t.$parentContext = e, t.$parent = e.$data, t.$parents = (e.$parents || []).slice(0), t.$parents.unshift(t.$parent), n && n(t)
                })
              }, m.U.prototype.extend = function (t) {
                return new m.U(this.P || this.$data, this, null, function (e, n) {
                  e.$rawData = n.$rawData, m.a.extend(e, "function" == typeof t ? t() : t)
                })
              };
              var d = m.a.e.I(),
                g = m.a.e.I();
              m.tc = function (t, e) {
                return 2 != arguments.length ? m.a.e.get(t, g) : (m.a.e.set(t, g, e), void(e.P && e.P.Ac(t)))
              }, m.Ja = function (t, e, n) {
                return 1 === t.nodeType && m.f.kc(t), h(t, e, p(n), !0)
              }, m.Dc = function (t, e, n) {
                return n = p(n), m.Ja(t, s(e, n, t), n)
              }, m.eb = function (t, e) {
                1 !== e.nodeType && 8 !== e.nodeType || l(p(t), e, !0)
              }, m.Rb = function (t, n) {
                if (!r && e.jQuery && (r = e.jQuery), n && 1 !== n.nodeType && 8 !== n.nodeType) throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
                n = n || e.document.body, u(p(t), n, !0)
              }, m.kb = function (e) {
                switch (e.nodeType) {
                  case 1:
                  case 8:
                    var n = m.tc(e);
                    if (n) return n;
                    if (e.parentNode) return m.kb(e.parentNode)
                }
                return t
              }, m.Jc = function (e) {
                return (e = m.kb(e)) ? e.$data : t
              }, m.b("bindingHandlers", m.d), m.b("applyBindings", m.Rb), m.b("applyBindingsToDescendants", m.eb), m.b("applyBindingAccessorsToNode", m.Ja), m.b("applyBindingsToNode", m.Dc), m.b("contextFor", m.kb), m.b("dataFor", m.Jc)
            }(),
            function (t) {
              function e(e, i) {
                var s, a = o.hasOwnProperty(e) ? o[e] : t;
                a ? a.X(i) : (a = o[e] = new m.J, a.X(i), n(e, function (t, n) {
                  var i = !(!n || !n.synchronous);
                  r[e] = {
                    definition: t,
                    Zc: i
                  }, delete o[e], s || i ? a.notifySubscribers(t) : m.Y.Wa(function () {
                    a.notifySubscribers(t)
                  })
                }), s = !0)
              }

              function n(t, e) {
                i("getConfig", [t], function (n) {
                  n ? i("loadComponent", [t, n], function (t) {
                    e(t, n)
                  }) : e(null, null)
                })
              }

              function i(e, n, o, r) {
                r || (r = m.g.loaders.slice(0));
                var s = r.shift();
                if (s) {
                  var a = s[e];
                  if (a) {
                    var l = !1;
                    if (a.apply(s, n.concat(function (t) {
                        l ? o(null) : null !== t ? o(t) : i(e, n, o, r)
                      })) !== t && (l = !0, !s.suppressLoaderExceptions)) throw Error("Component loaders must supply values by invoking the callback, not by returning values synchronously.")
                  } else i(e, n, o, r)
                } else o(null)
              }
              var o = {},
                r = {};
              m.g = {
                get: function (n, i) {
                  var o = r.hasOwnProperty(n) ? r[n] : t;
                  o ? o.Zc ? m.l.w(function () {
                    i(o.definition)
                  }) : m.Y.Wa(function () {
                    i(o.definition)
                  }) : e(n, i)
                },
                Xb: function (t) {
                  delete r[t]
                },
                Jb: i
              }, m.g.loaders = [], m.b("components", m.g), m.b("components.get", m.g.get), m.b("components.clearCachedDefinition", m.g.Xb)
            }(),
            function () {
              function t(t, e, n, i) {
                function o() {
                  0 === --a && i(r)
                }
                var r = {},
                  a = 2,
                  l = n.template;
                n = n.viewModel, l ? s(e, l, function (e) {
                  m.g.Jb("loadTemplate", [t, e], function (t) {
                    r.template = t, o()
                  })
                }) : o(), n ? s(e, n, function (e) {
                  m.g.Jb("loadViewModel", [t, e], function (t) {
                    r[c] = t, o()
                  })
                }) : o()
              }

              function n(t, e, i) {
                if ("function" == typeof e) i(function (t) {
                  return new e(t)
                });
                else if ("function" == typeof e[c]) i(e[c]);
                else if ("instance" in e) {
                  var o = e.instance;
                  i(function () {
                    return o
                  })
                } else "viewModel" in e ? n(t, e.viewModel, i) : t("Unknown viewModel value: " + e)
              }

              function o(t) {
                switch (m.a.A(t)) {
                  case "script":
                    return m.a.ma(t.text);
                  case "textarea":
                    return m.a.ma(t.value);
                  case "template":
                    if (r(t.content)) return m.a.ua(t.content.childNodes)
                }
                return m.a.ua(t.childNodes)
              }

              function r(t) {
                return e.DocumentFragment ? t instanceof DocumentFragment : t && 11 === t.nodeType
              }

              function s(t, n, i) {
                "string" == typeof n.require ? a || e.require ? (a || e.require)([n.require], i) : t("Uses require, but no AMD loader is present") : i(n)
              }

              function l(t) {
                return function (e) {
                  throw Error("Component '" + t + "': " + e)
                }
              }
              var u = {};
              m.g.register = function (t, e) {
                if (!e) throw Error("Invalid configuration for " + t);
                if (m.g.ub(t)) throw Error("Component " + t + " is already registered");
                u[t] = e
              }, m.g.ub = function (t) {
                return u.hasOwnProperty(t)
              }, m.g.od = function (t) {
                delete u[t], m.g.Xb(t)
              }, m.g.Zb = {
                getConfig: function (t, e) {
                  e(u.hasOwnProperty(t) ? u[t] : null)
                },
                loadComponent: function (e, n, i) {
                  var o = l(e);
                  s(o, n, function (n) {
                    t(e, o, n, i)
                  })
                },
                loadTemplate: function (t, n, s) {
                  if (t = l(t), "string" == typeof n) s(m.a.ma(n));
                  else if (n instanceof Array) s(n);
                  else if (r(n)) s(m.a.V(n.childNodes));
                  else if (n.element)
                    if (n = n.element, e.HTMLElement ? n instanceof HTMLElement : n && n.tagName && 1 === n.nodeType) s(o(n));
                    else if ("string" == typeof n) {
                    var a = i.getElementById(n);
                    a ? s(o(a)) : t("Cannot find element with ID " + n)
                  } else t("Unknown element type: " + n);
                  else t("Unknown template value: " + n)
                },
                loadViewModel: function (t, e, i) {
                  n(l(t), e, i)
                }
              };
              var c = "createViewModel";
              m.b("components.register", m.g.register), m.b("components.isRegistered", m.g.ub), m.b("components.unregister", m.g.od), m.b("components.defaultLoader", m.g.Zb), m.g.loaders.push(m.g.Zb), m.g.Bc = u
            }(),
            function () {
              function t(t, n) {
                var i = t.getAttribute("params");
                if (i) {
                  var i = e.parseBindingsString(i, n, t, {
                      valueAccessors: !0,
                      bindingParams: !0
                    }),
                    i = m.a.Ca(i, function (e) {
                      return m.m(e, null, {
                        i: t
                      })
                    }),
                    o = m.a.Ca(i, function (e) {
                      var n = e.t();
                      return e.ba() ? m.m({
                        read: function () {
                          return m.a.c(e())
                        },
                        write: m.Ba(n) && function (t) {
                          e()(t)
                        },
                        i: t
                      }) : n
                    });
                  return o.hasOwnProperty("$raw") || (o.$raw = i), o
                }
                return {
                  $raw: {}
                }
              }
              m.g.getComponentNameForNode = function (t) {
                var e = m.a.A(t);
                if (m.g.ub(e) && (-1 != e.indexOf("-") || "[object HTMLUnknownElement]" == "" + t || 8 >= m.a.C && t.tagName === e)) return e
              }, m.g.Ob = function (e, n, i, o) {
                if (1 === n.nodeType) {
                  var r = m.g.getComponentNameForNode(n);
                  if (r) {
                    if (e = e || {}, e.component) throw Error('Cannot use the "component" binding on a custom element matching a component');
                    var s = {
                      name: r,
                      params: t(n, i)
                    };
                    e.component = o ? function () {
                      return s
                    } : s
                  }
                }
                return e
              };
              var e = new m.Q;
              9 > m.a.C && (m.g.register = function (t) {
                return function (e) {
                  return i.createElement(e), t.apply(this, arguments)
                }
              }(m.g.register), i.createDocumentFragment = function (t) {
                return function () {
                  var e, n = t(),
                    i = m.g.Bc;
                  for (e in i) i.hasOwnProperty(e) && n.createElement(e);
                  return n
                }
              }(i.createDocumentFragment))
            }(),
            function (t) {
              function e(t, e, n) {
                if (e = e.template, !e) throw Error("Component '" + t + "' has no template");
                t = m.a.ua(e), m.f.da(n, t)
              }

              function n(t, e, n, i) {
                var o = t.createViewModel;
                return o ? o.call(t, i, {
                  element: e,
                  templateNodes: n
                }) : i
              }
              var i = 0;
              m.d.component = {
                init: function (o, r, s, a, l) {
                  function u() {
                    var t = c && c.dispose;
                    "function" == typeof t && t.call(c), h = c = null
                  }
                  var c, h, p = m.a.V(m.f.childNodes(o));
                  return m.a.F.oa(o, u), m.m(function () {
                    var s, a, f = m.a.c(r());
                    if ("string" == typeof f ? s = f : (s = m.a.c(f.name), a = m.a.c(f.params)), !s) throw Error("No component name specified");
                    var d = h = ++i;
                    m.g.get(s, function (i) {
                      if (h === d) {
                        if (u(), !i) throw Error("Unknown component '" + s + "'");
                        e(s, i, o);
                        var r = n(i, o, p, a);
                        i = l.createChildContext(r, t, function (t) {
                          t.$component = r, t.$componentTemplateNodes = p
                        }), c = r, m.eb(i, o)
                      }
                    })
                  }, null, {
                    i: o
                  }), {
                    controlsDescendantBindings: !0
                  }
                }
              }, m.f.Z.component = !0
            }();
          var T = {
            class: "className",
            for: "htmlFor"
          };
          m.d.attr = {
              update: function (e, n) {
                var i = m.a.c(n()) || {};
                m.a.D(i, function (n, i) {
                  i = m.a.c(i);
                  var o = !1 === i || null === i || i === t;
                  o && e.removeAttribute(n), 8 >= m.a.C && n in T ? (n = T[n], o ? e.removeAttribute(n) : e[n] = i) : o || e.setAttribute(n, i.toString()), "name" === n && m.a.rc(e, o ? "" : i.toString())
                })
              }
            },
            function () {
              m.d.checked = {
                after: ["value", "attr"],
                init: function (e, n, i) {
                  function o() {
                    var t = e.checked,
                      o = f ? s() : t;
                    if (!m.va.Sa() && (!l || t)) {
                      var r = m.l.w(n);
                      if (c) {
                        var a = h ? r.t() : r;
                        p !== o ? (t && (m.a.pa(a, o, !0), m.a.pa(a, p, !1)), p = o) : m.a.pa(a, o, t), h && m.Ba(r) && r(a)
                      } else m.h.Ea(r, i, "checked", o, !0)
                    }
                  }

                  function r() {
                    var t = m.a.c(n());
                    e.checked = c ? 0 <= m.a.o(t, s()) : a ? t : s() === t
                  }
                  var s = m.nc(function () {
                      return i.has("checkedValue") ? m.a.c(i.get("checkedValue")) : i.has("value") ? m.a.c(i.get("value")) : e.value
                    }),
                    a = "checkbox" == e.type,
                    l = "radio" == e.type;
                  if (a || l) {
                    var u = n(),
                      c = a && m.a.c(u) instanceof Array,
                      h = !(c && u.push && u.splice),
                      p = c ? s() : t,
                      f = l || c;
                    l && !e.name && m.d.uniqueName.init(e, function () {
                      return !0
                    }), m.m(o, null, {
                      i: e
                    }), m.a.p(e, "click", o), m.m(r, null, {
                      i: e
                    }), u = t
                  }
                }
              }, m.h.ea.checked = !0, m.d.checkedValue = {
                update: function (t, e) {
                  t.value = m.a.c(e())
                }
              }
            }(), m.d.css = {
              update: function (t, e) {
                var n = m.a.c(e());
                null !== n && "object" == typeof n ? m.a.D(n, function (e, n) {
                  n = m.a.c(n), m.a.bb(t, e, n)
                }) : (n = m.a.$a(String(n || "")), m.a.bb(t, t.__ko__cssValue, !1), t.__ko__cssValue = n, m.a.bb(t, n, !0))
              }
            }, m.d.enable = {
              update: function (t, e) {
                var n = m.a.c(e());
                n && t.disabled ? t.removeAttribute("disabled") : n || t.disabled || (t.disabled = !0)
              }
            }, m.d.disable = {
              update: function (t, e) {
                m.d.enable.update(t, function () {
                  return !m.a.c(e())
                })
              }
            }, m.d.event = {
              init: function (t, e, n, i, o) {
                var r = e() || {};
                m.a.D(r, function (r) {
                  "string" == typeof r && m.a.p(t, r, function (t) {
                    var s, a = e()[r];
                    if (a) {
                      try {
                        var l = m.a.V(arguments);
                        i = o.$data, l.unshift(i), s = a.apply(i, l)
                      } finally {
                        !0 !== s && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                      }!1 === n.get(r + "Bubble") && (t.cancelBubble = !0, t.stopPropagation && t.stopPropagation())
                    }
                  })
                })
              }
            }, m.d.foreach = {
              ic: function (t) {
                return function () {
                  var e = t(),
                    n = m.a.zb(e);
                  return n && "number" != typeof n.length ? (m.a.c(e), {
                    foreach: n.data,
                    as: n.as,
                    includeDestroyed: n.includeDestroyed,
                    afterAdd: n.afterAdd,
                    beforeRemove: n.beforeRemove,
                    afterRender: n.afterRender,
                    beforeMove: n.beforeMove,
                    afterMove: n.afterMove,
                    templateEngine: m.W.sb
                  }) : {
                    foreach: e,
                    templateEngine: m.W.sb
                  }
                }
              },
              init: function (t, e) {
                return m.d.template.init(t, m.d.foreach.ic(e))
              },
              update: function (t, e, n, i, o) {
                return m.d.template.update(t, m.d.foreach.ic(e), n, i, o)
              }
            }, m.h.ta.foreach = !1, m.f.Z.foreach = !0, m.d.hasfocus = {
              init: function (t, e, n) {
                function i(i) {
                  t.__ko_hasfocusUpdating = !0;
                  var o = t.ownerDocument;
                  if ("activeElement" in o) {
                    var r;
                    try {
                      r = o.activeElement
                    } catch (t) {
                      r = o.body
                    }
                    i = r === t
                  }
                  o = e(), m.h.Ea(o, n, "hasfocus", i, !0), t.__ko_hasfocusLastValue = i, t.__ko_hasfocusUpdating = !1
                }
                var o = i.bind(null, !0),
                  r = i.bind(null, !1);
                m.a.p(t, "focus", o), m.a.p(t, "focusin", o), m.a.p(t, "blur", r), m.a.p(t, "focusout", r)
              },
              update: function (t, e) {
                var n = !!m.a.c(e());
                t.__ko_hasfocusUpdating || t.__ko_hasfocusLastValue === n || (n ? t.focus() : t.blur(), !n && t.__ko_hasfocusLastValue && t.ownerDocument.body.focus(), m.l.w(m.a.Da, null, [t, n ? "focusin" : "focusout"]))
              }
            }, m.h.ea.hasfocus = !0, m.d.hasFocus = m.d.hasfocus, m.h.ea.hasFocus = !0, m.d.html = {
              init: function () {
                return {
                  controlsDescendantBindings: !0
                }
              },
              update: function (t, e) {
                m.a.Cb(t, e())
              }
            }, d("if"), d("ifnot", !1, !0), d("with", !0, !1, function (t, e) {
              return t.createChildContext(e)
            });
          var D = {};
          m.d.options = {
              init: function (t) {
                if ("select" !== m.a.A(t)) throw Error("options binding applies only to SELECT elements");
                for (; 0 < t.length;) t.remove(0);
                return {
                  controlsDescendantBindings: !0
                }
              },
              update: function (e, n, i) {
                function o() {
                  return m.a.Ka(e.options, function (t) {
                    return t.selected
                  })
                }

                function r(t, e, n) {
                  var i = typeof e;
                  return "function" == i ? e(t) : "string" == i ? t[e] : n
                }

                function s(t, n) {
                  if (d && c) m.j.ha(e, m.a.c(i.get("value")), !0);
                  else if (f.length) {
                    var o = 0 <= m.a.o(f, m.j.u(n[0]));
                    m.a.sc(n[0], o), d && !o && m.l.w(m.a.Da, null, [e, "change"])
                  }
                }
                var a = e.multiple,
                  l = 0 != e.length && a ? e.scrollTop : null,
                  u = m.a.c(n()),
                  c = i.get("valueAllowUnset") && i.has("value"),
                  h = i.get("optionsIncludeDestroyed");
                n = {};
                var p, f = [];
                c || (a ? f = m.a.fb(o(), m.j.u) : 0 <= e.selectedIndex && f.push(m.j.u(e.options[e.selectedIndex]))), u && ("undefined" == typeof u.length && (u = [u]), p = m.a.Ka(u, function (e) {
                  return h || e === t || null === e || !m.a.c(e._destroy)
                }), i.has("optionsCaption") && (u = m.a.c(i.get("optionsCaption")), null !== u && u !== t && p.unshift(D)));
                var d = !1;
                n.beforeRemove = function (t) {
                  e.removeChild(t)
                }, u = s, i.has("optionsAfterRender") && "function" == typeof i.get("optionsAfterRender") && (u = function (e, n) {
                  s(0, n), m.l.w(i.get("optionsAfterRender"), null, [n[0], e !== D ? e : t])
                }), m.a.Bb(e, p, function (n, o, s) {
                  return s.length && (f = !c && s[0].selected ? [m.j.u(s[0])] : [], d = !0), o = e.ownerDocument.createElement("option"), n === D ? (m.a.Za(o, i.get("optionsCaption")), m.j.ha(o, t)) : (s = r(n, i.get("optionsValue"), n), m.j.ha(o, m.a.c(s)), n = r(n, i.get("optionsText"), s), m.a.Za(o, n)), [o]
                }, n, u), m.l.w(function () {
                  c ? m.j.ha(e, m.a.c(i.get("value")), !0) : (a ? f.length && o().length < f.length : f.length && 0 <= e.selectedIndex ? m.j.u(e.options[e.selectedIndex]) !== f[0] : f.length || 0 <= e.selectedIndex) && m.a.Da(e, "change")
                }), m.a.Nc(e), l && 20 < Math.abs(l - e.scrollTop) && (e.scrollTop = l)
              }
            }, m.d.options.xb = m.a.e.I(), m.d.selectedOptions = {
              after: ["options", "foreach"],
              init: function (t, e, n) {
                m.a.p(t, "change", function () {
                  var i = e(),
                    o = [];
                  m.a.q(t.getElementsByTagName("option"), function (t) {
                    t.selected && o.push(m.j.u(t))
                  }), m.h.Ea(i, n, "selectedOptions", o)
                })
              },
              update: function (t, e) {
                if ("select" != m.a.A(t)) throw Error("values binding applies only to SELECT elements");
                var n = m.a.c(e()),
                  i = t.scrollTop;
                n && "number" == typeof n.length && m.a.q(t.getElementsByTagName("option"), function (t) {
                  var e = 0 <= m.a.o(n, m.j.u(t));
                  t.selected != e && m.a.sc(t, e)
                }), t.scrollTop = i
              }
            }, m.h.ea.selectedOptions = !0, m.d.style = {
              update: function (e, n) {
                var i = m.a.c(n() || {});
                m.a.D(i, function (n, i) {
                  i = m.a.c(i), null !== i && i !== t && !1 !== i || (i = ""), e.style[n] = i
                })
              }
            }, m.d.submit = {
              init: function (t, e, n, i, o) {
                if ("function" != typeof e()) throw Error("The value for a submit binding must be a function");
                m.a.p(t, "submit", function (n) {
                  var i, r = e();
                  try {
                    i = r.call(o.$data, t)
                  } finally {
                    !0 !== i && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
                  }
                })
              }
            }, m.d.text = {
              init: function () {
                return {
                  controlsDescendantBindings: !0
                }
              },
              update: function (t, e) {
                m.a.Za(t, e())
              }
            }, m.f.Z.text = !0,
            function () {
              if (e && e.navigator) var n = function (t) {
                  if (t) return parseFloat(t[1])
                },
                i = e.opera && e.opera.version && parseInt(e.opera.version()),
                o = e.navigator.userAgent,
                r = n(o.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),
                s = n(o.match(/Firefox\/([^ ]*)/));
              if (10 > m.a.C) var a = m.a.e.I(),
                l = m.a.e.I(),
                u = function (t) {
                  var e = this.activeElement;
                  (e = e && m.a.e.get(e, l)) && e(t)
                },
                c = function (t, e) {
                  var n = t.ownerDocument;
                  m.a.e.get(n, a) || (m.a.e.set(n, a, !0), m.a.p(n, "selectionchange", u)), m.a.e.set(t, l, e)
                };
              m.d.textInput = {
                init: function (e, n, o) {
                  function a(t, n) {
                    m.a.p(e, t, n)
                  }

                  function l() {
                    var i = m.a.c(n());
                    null !== i && i !== t || (i = ""), f !== t && i === f ? m.a.setTimeout(l, 4) : e.value !== i && (d = i, e.value = i)
                  }

                  function u() {
                    p || (f = e.value, p = m.a.setTimeout(h, 4))
                  }

                  function h() {
                    clearTimeout(p), f = p = t;
                    var i = e.value;
                    d !== i && (d = i, m.h.Ea(n(), o, "textInput", i))
                  }
                  var p, f, d = e.value,
                    g = 9 == m.a.C ? u : h;
                  10 > m.a.C ? (a("propertychange", function (t) {
                    "value" === t.propertyName && g(t)
                  }), 8 == m.a.C && (a("keyup", h), a("keydown", h)), 8 <= m.a.C && (c(e, g), a("dragend", u))) : (a("input", h), 5 > r && "textarea" === m.a.A(e) ? (a("keydown", u), a("paste", u), a("cut", u)) : 11 > i ? a("keydown", u) : 4 > s && (a("DOMAutoComplete", h), a("dragdrop", h), a("drop", h))), a("change", h), m.m(l, null, {
                    i: e
                  })
                }
              }, m.h.ea.textInput = !0, m.d.textinput = {
                preprocess: function (t, e, n) {
                  n("textInput", t)
                }
              }
            }(), m.d.uniqueName = {
              init: function (t, e) {
                if (e()) {
                  var n = "ko_unique_" + ++m.d.uniqueName.Ic;
                  m.a.rc(t, n)
                }
              }
            }, m.d.uniqueName.Ic = 0, m.d.value = {
              after: ["options", "foreach"],
              init: function (t, e, n) {
                if ("input" != t.tagName.toLowerCase() || "checkbox" != t.type && "radio" != t.type) {
                  var i = ["change"],
                    o = n.get("valueUpdate"),
                    r = !1,
                    s = null;
                  o && ("string" == typeof o && (o = [o]), m.a.ra(i, o), i = m.a.Tb(i));
                  var a = function () {
                    s = null, r = !1;
                    var i = e(),
                      o = m.j.u(t);
                    m.h.Ea(i, n, "value", o)
                  };
                  !m.a.C || "input" != t.tagName.toLowerCase() || "text" != t.type || "off" == t.autocomplete || t.form && "off" == t.form.autocomplete || -1 != m.a.o(i, "propertychange") || (m.a.p(t, "propertychange", function () {
                    r = !0
                  }), m.a.p(t, "focus", function () {
                    r = !1
                  }), m.a.p(t, "blur", function () {
                    r && a()
                  })), m.a.q(i, function (e) {
                    var n = a;
                    m.a.nd(e, "after") && (n = function () {
                      s = m.j.u(t), m.a.setTimeout(a, 0)
                    }, e = e.substring(5)), m.a.p(t, e, n)
                  });
                  var l = function () {
                    var i = m.a.c(e()),
                      o = m.j.u(t);
                    if (null !== s && i === s) m.a.setTimeout(l, 0);
                    else if (i !== o)
                      if ("select" === m.a.A(t)) {
                        var r = n.get("valueAllowUnset"),
                          o = function () {
                            m.j.ha(t, i, r)
                          };
                        o(), r || i === m.j.u(t) ? m.a.setTimeout(o, 0) : m.l.w(m.a.Da, null, [t, "change"])
                      } else m.j.ha(t, i)
                  };
                  m.m(l, null, {
                    i: t
                  })
                } else m.Ja(t, {
                  checkedValue: e
                })
              },
              update: function () {}
            }, m.h.ea.value = !0, m.d.visible = {
              update: function (t, e) {
                var n = m.a.c(e()),
                  i = "none" != t.style.display;
                n && !i ? t.style.display = "" : !n && i && (t.style.display = "none")
              }
            },
            function (t) {
              m.d[t] = {
                init: function (e, n, i, o, r) {
                  return m.d.event.init.call(this, e, function () {
                    var e = {};
                    return e[t] = n(), e
                  }, i, o, r)
                }
              }
            }("click"), m.O = function () {}, m.O.prototype.renderTemplateSource = function () {
              throw Error("Override renderTemplateSource")
            }, m.O.prototype.createJavaScriptEvaluatorBlock = function () {
              throw Error("Override createJavaScriptEvaluatorBlock")
            }, m.O.prototype.makeTemplateSource = function (t, e) {
              if ("string" == typeof t) {
                e = e || i;
                var n = e.getElementById(t);
                if (!n) throw Error("Cannot find template with ID " + t);
                return new m.v.n(n)
              }
              if (1 == t.nodeType || 8 == t.nodeType) return new m.v.qa(t);
              throw Error("Unknown template type: " + t)
            }, m.O.prototype.renderTemplate = function (t, e, n, i) {
              return t = this.makeTemplateSource(t, i), this.renderTemplateSource(t, e, n, i)
            }, m.O.prototype.isTemplateRewritten = function (t, e) {
              return !1 === this.allowTemplateRewriting || this.makeTemplateSource(t, e).data("isRewritten")
            }, m.O.prototype.rewriteTemplate = function (t, e, n) {
              t = this.makeTemplateSource(t, n), e = e(t.text()), t.text(e), t.data("isRewritten", !0)
            }, m.b("templateEngine", m.O), m.Gb = function () {
              function t(t, e, n, i) {
                t = m.h.yb(t);
                for (var o = m.h.ta, r = 0; r < t.length; r++) {
                  var s = t[r].key;
                  if (o.hasOwnProperty(s)) {
                    var a = o[s];
                    if ("function" == typeof a) {
                      if (s = a(t[r].value)) throw Error(s)
                    } else if (!a) throw Error("This template engine does not support the '" + s + "' binding within its templates")
                  }
                }
                return n = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + m.h.Ua(t, {
                  valueAccessors: !0
                }) + " } })()},'" + n.toLowerCase() + "')", i.createJavaScriptEvaluatorBlock(n) + e
              }
              var e = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
                n = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
              return {
                Oc: function (t, e, n) {
                  e.isTemplateRewritten(t, n) || e.rewriteTemplate(t, function (t) {
                    return m.Gb.dd(t, e)
                  }, n)
                },
                dd: function (i, o) {
                  return i.replace(e, function (e, n, i, r, s) {
                    return t(s, n, i, o)
                  }).replace(n, function (e, n) {
                    return t(n, "<!-- ko -->", "#comment", o)
                  })
                },
                Ec: function (t, e) {
                  return m.M.wb(function (n, i) {
                    var o = n.nextSibling;
                    o && o.nodeName.toLowerCase() === e && m.Ja(o, t, i)
                  })
                }
              }
            }(), m.b("__tr_ambtns", m.Gb.Ec),
            function () {
              m.v = {}, m.v.n = function (t) {
                if (this.n = t) {
                  var e = m.a.A(t);
                  this.ab = "script" === e ? 1 : "textarea" === e ? 2 : "template" == e && t.content && 11 === t.content.nodeType ? 3 : 4
                }
              }, m.v.n.prototype.text = function () {
                var t = 1 === this.ab ? "text" : 2 === this.ab ? "value" : "innerHTML";
                if (0 == arguments.length) return this.n[t];
                var e = arguments[0];
                "innerHTML" === t ? m.a.Cb(this.n, e) : this.n[t] = e
              };
              var e = m.a.e.I() + "_";
              m.v.n.prototype.data = function (t) {
                return 1 === arguments.length ? m.a.e.get(this.n, e + t) : void m.a.e.set(this.n, e + t, arguments[1])
              };
              var n = m.a.e.I();
              m.v.n.prototype.nodes = function () {
                var e = this.n;
                return 0 == arguments.length ? (m.a.e.get(e, n) || {}).jb || (3 === this.ab ? e.content : 4 === this.ab ? e : t) : void m.a.e.set(e, n, {
                  jb: arguments[0]
                })
              }, m.v.qa = function (t) {
                this.n = t
              }, m.v.qa.prototype = new m.v.n, m.v.qa.prototype.text = function () {
                if (0 == arguments.length) {
                  var e = m.a.e.get(this.n, n) || {};
                  return e.Hb === t && e.jb && (e.Hb = e.jb.innerHTML), e.Hb
                }
                m.a.e.set(this.n, n, {
                  Hb: arguments[0]
                })
              }, m.b("templateSources", m.v), m.b("templateSources.domElement", m.v.n), m.b("templateSources.anonymousTemplate", m.v.qa)
            }(),
            function () {
              function e(t, e, n) {
                var i;
                for (e = m.f.nextSibling(e); t && (i = t) !== e;) t = m.f.nextSibling(i), n(i, t)
              }

              function n(t, n) {
                if (t.length) {
                  var i = t[0],
                    o = t[t.length - 1],
                    r = i.parentNode,
                    s = m.Q.instance,
                    a = s.preprocessNode;
                  if (a) {
                    if (e(i, o, function (t, e) {
                        var n = t.previousSibling,
                          r = a.call(s, t);
                        r && (t === i && (i = r[0] || e), t === o && (o = r[r.length - 1] || n))
                      }), t.length = 0, !i) return;
                    i === o ? t.push(i) : (t.push(i, o), m.a.za(t, r))
                  }
                  e(i, o, function (t) {
                    1 !== t.nodeType && 8 !== t.nodeType || m.Rb(n, t)
                  }), e(i, o, function (t) {
                    1 !== t.nodeType && 8 !== t.nodeType || m.M.yc(t, [n])
                  }), m.a.za(t, r)
                }
              }

              function i(t) {
                return t.nodeType ? t : 0 < t.length ? t[0] : null
              }

              function o(t, e, o, r, a) {
                a = a || {};
                var l = (t && i(t) || o || {}).ownerDocument,
                  u = a.templateEngine || s;
                if (m.Gb.Oc(o, u, l), o = u.renderTemplate(o, r, a, l), "number" != typeof o.length || 0 < o.length && "number" != typeof o[0].nodeType) throw Error("Template engine must return an array of DOM nodes");
                switch (l = !1, e) {
                  case "replaceChildren":
                    m.f.da(t, o), l = !0;
                    break;
                  case "replaceNode":
                    m.a.qc(t, o), l = !0;
                    break;
                  case "ignoreTargetNode":
                    break;
                  default:
                    throw Error("Unknown renderMode: " + e)
                }
                return l && (n(o, r), a.afterRender && m.l.w(a.afterRender, null, [o, r.$data])), o
              }

              function r(t, e, n) {
                return m.H(t) ? t() : "function" == typeof t ? t(e, n) : t
              }
              var s;
              m.Db = function (e) {
                if (e != t && !(e instanceof m.O)) throw Error("templateEngine must inherit from ko.templateEngine");
                s = e
              }, m.Ab = function (e, n, a, l, u) {
                if (a = a || {}, (a.templateEngine || s) == t) throw Error("Set a template engine before calling renderTemplate");
                if (u = u || "replaceChildren", l) {
                  var c = i(l);
                  return m.B(function () {
                    var t = n && n instanceof m.U ? n : new m.U(m.a.c(n)),
                      s = r(e, t.$data, t),
                      t = o(l, u, s, t, a);
                    "replaceNode" == u && (l = t, c = i(l))
                  }, null, {
                    wa: function () {
                      return !c || !m.a.nb(c)
                    },
                    i: c && "replaceNode" == u ? c.parentNode : c
                  })
                }
                return m.M.wb(function (t) {
                  m.Ab(e, n, a, t, "replaceNode")
                })
              }, m.kd = function (e, i, s, a, l) {
                function u(t, e) {
                  n(e, h), s.afterRender && s.afterRender(e, t), h = null
                }

                function c(t, n) {
                  h = l.createChildContext(t, s.as, function (t) {
                    t.$index = n
                  });
                  var i = r(e, t, h);
                  return o(null, "ignoreTargetNode", i, h, s)
                }
                var h;
                return m.B(function () {
                  var e = m.a.c(i) || [];
                  "undefined" == typeof e.length && (e = [e]), e = m.a.Ka(e, function (e) {
                    return s.includeDestroyed || e === t || null === e || !m.a.c(e._destroy)
                  }), m.l.w(m.a.Bb, null, [a, e, c, s, u])
                }, null, {
                  i: a
                })
              };
              var a = m.a.e.I();
              m.d.template = {
                init: function (t, e) {
                  var n = m.a.c(e());
                  if ("string" == typeof n || n.name) m.f.xa(t);
                  else {
                    if ("nodes" in n) {
                      if (n = n.nodes || [], m.H(n)) throw Error('The "nodes" option must be a plain, non-observable array.')
                    } else n = m.f.childNodes(t);
                    n = m.a.jc(n), new m.v.qa(t).nodes(n)
                  }
                  return {
                    controlsDescendantBindings: !0
                  }
                },
                update: function (e, n, i, o, r) {
                  var s, l = n();
                  n = m.a.c(l), i = !0, o = null, "string" == typeof n ? n = {} : (l = n.name, "if" in n && (i = m.a.c(n.if)), i && "ifnot" in n && (i = !m.a.c(n.ifnot)), s = m.a.c(n.data)), "foreach" in n ? o = m.kd(l || e, i && n.foreach || [], n, e, r) : i ? (r = "data" in n ? r.createChildContext(s, n.as) : r, o = m.Ab(l || e, r, n, e)) : m.f.xa(e), r = o, (s = m.a.e.get(e, a)) && "function" == typeof s.k && s.k(), m.a.e.set(e, a, r && r.ba() ? r : t)
                }
              }, m.h.ta.template = function (t) {
                return t = m.h.yb(t), 1 == t.length && t[0].unknown || m.h.ad(t, "name") ? null : "This template engine does not support anonymous templates nested within its templates"
              }, m.f.Z.template = !0
            }(), m.b("setTemplateEngine", m.Db), m.b("renderTemplate", m.Ab), m.a.dc = function (t, e, n) {
              if (t.length && e.length) {
                var i, o, r, s, a;
                for (i = o = 0;
                  (!n || i < n) && (s = t[o]); ++o) {
                  for (r = 0; a = e[r]; ++r)
                    if (s.value === a.value) {
                      s.moved = a.index, a.moved = s.index, e.splice(r, 1), i = r = 0;
                      break
                    } i += r
                }
              }
            }, m.a.ib = function () {
              function t(t, e, n, i, o) {
                var r, s, a, l, u, c = Math.min,
                  h = Math.max,
                  p = [],
                  f = t.length,
                  d = e.length,
                  g = d - f || 1,
                  _ = f + d + 1;
                for (r = 0; r <= f; r++)
                  for (l = a, p.push(a = []), u = c(d, r + g), s = h(0, r - 1); s <= u; s++) a[s] = s ? r ? t[r - 1] === e[s - 1] ? l[s - 1] : c(l[s] || _, a[s - 1] || _) + 1 : s + 1 : r + 1;
                for (c = [], h = [], g = [], r = f, s = d; r || s;) d = p[r][s] - 1, s && d === p[r][s - 1] ? h.push(c[c.length] = {
                  status: n,
                  value: e[--s],
                  index: s
                }) : r && d === p[r - 1][s] ? g.push(c[c.length] = {
                  status: i,
                  value: t[--r],
                  index: r
                }) : (--s, --r, o.sparse || c.push({
                  status: "retained",
                  value: e[s]
                }));
                return m.a.dc(g, h, !o.dontLimitMoves && 10 * f), c.reverse()
              }
              return function (e, n, i) {
                return i = "boolean" == typeof i ? {
                  dontLimitMoves: i
                } : i || {}, e = e || [], n = n || [], e.length < n.length ? t(e, n, "added", "deleted", i) : t(n, e, "deleted", "added", i)
              }
            }(), m.b("utils.compareArrays", m.a.ib),
            function () {
              function e(e, n, i, o, r) {
                var s = [],
                  a = m.B(function () {
                    var t = n(i, r, m.a.za(s, e)) || [];
                    0 < s.length && (m.a.qc(s, t), o && m.l.w(o, null, [i, t, r])), s.length = 0, m.a.ra(s, t)
                  }, null, {
                    i: e,
                    wa: function () {
                      return !m.a.Qb(s)
                    }
                  });
                return {
                  ca: s,
                  B: a.ba() ? a : t
                }
              }
              var n = m.a.e.I(),
                i = m.a.e.I();
              m.a.Bb = function (o, r, s, a, l) {
                function u(t, e) {
                  w = p[e], v !== e && (x[t] = w), w.qb(v++), m.a.za(w.ca, o), g.push(w), b.push(w)
                }

                function c(t, e) {
                  if (t)
                    for (var n = 0, i = e.length; n < i; n++) e[n] && m.a.q(e[n].ca, function (i) {
                      t(i, n, e[n].ja)
                    })
                }
                r = r || [], a = a || {};
                var h = m.a.e.get(o, n) === t,
                  p = m.a.e.get(o, n) || [],
                  f = m.a.fb(p, function (t) {
                    return t.ja
                  }),
                  d = m.a.ib(f, r, a.dontLimitMoves),
                  g = [],
                  _ = 0,
                  v = 0,
                  y = [],
                  b = [];
                r = [];
                for (var w, k, C, x = [], f = [], E = 0; k = d[E]; E++) switch (C = k.moved, k.status) {
                  case "deleted":
                    C === t && (w = p[_], w.B && (w.B.k(), w.B = t), m.a.za(w.ca, o).length && (a.beforeRemove && (g.push(w), b.push(w), w.ja === i ? w = null : r[E] = w), w && y.push.apply(y, w.ca))), _++;
                    break;
                  case "retained":
                    u(E, _++);
                    break;
                  case "added":
                    C !== t ? u(E, C) : (w = {
                      ja: k.value,
                      qb: m.N(v++)
                    }, g.push(w), b.push(w), h || (f[E] = w))
                }
                m.a.e.set(o, n, g), c(a.beforeMove, x), m.a.q(y, a.beforeRemove ? m.$ : m.removeNode);
                for (var L, E = 0, h = m.f.firstChild(o); w = b[E]; E++) {
                  for (w.ca || m.a.extend(w, e(o, s, w.ja, l, w.qb)), _ = 0; d = w.ca[_]; h = d.nextSibling, L = d, _++) d !== h && m.f.gc(o, d, L);
                  !w.Wc && l && (l(w.ja, w.ca, w.qb), w.Wc = !0)
                }
                for (c(a.beforeRemove, r), E = 0; E < r.length; ++E) r[E] && (r[E].ja = i);
                c(a.afterMove, x), c(a.afterAdd, f)
              }
            }(), m.b("utils.setDomNodeChildrenFromArrayMapping", m.a.Bb), m.W = function () {
              this.allowTemplateRewriting = !1
            }, m.W.prototype = new m.O, m.W.prototype.renderTemplateSource = function (t, e, n, i) {
              return (e = (9 > m.a.C ? 0 : t.nodes) ? t.nodes() : null) ? m.a.V(e.cloneNode(!0).childNodes) : (t = t.text(), m.a.ma(t, i))
            }, m.W.sb = new m.W, m.Db(m.W.sb), m.b("nativeTemplateEngine", m.W),
            function () {
              m.vb = function () {
                var t = this.$c = function () {
                  if (!r || !r.tmpl) return 0;
                  try {
                    if (0 <= r.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2
                  } catch (t) {}
                  return 1
                }();
                this.renderTemplateSource = function (e, n, o, s) {
                  if (s = s || i, o = o || {}, 2 > t) throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
                  var a = e.data("precompiled");
                  return a || (a = e.text() || "", a = r.template(null, "{{ko_with $item.koBindingContext}}" + a + "{{/ko_with}}"), e.data("precompiled", a)), e = [n.$data], n = r.extend({
                    koBindingContext: n
                  }, o.templateOptions), n = r.tmpl(a, e, n), n.appendTo(s.createElement("div")), r.fragments = {}, n
                }, this.createJavaScriptEvaluatorBlock = function (t) {
                  return "{{ko_code ((function() { return " + t + " })()) }}"
                }, this.addTemplate = function (t, e) {
                  i.write("<script type='text/html' id='" + t + "'>" + e + "</script>")
                }, 0 < t && (r.tmpl.tag.ko_code = {
                  open: "__.push($1 || '');"
                }, r.tmpl.tag.ko_with = {
                  open: "with($1) {",
                  close: "} "
                })
              }, m.vb.prototype = new m.O;
              var t = new m.vb;
              0 < t.$c && m.Db(t), m.b("jqueryTmplTemplateEngine", m.vb)
            }()
        })
      })()
    }(), ! function (t, i) {
      "use strict";

      function o(t, e) {
        if (!t || "object" != typeof t) throw new Error("When calling ko.track, you must pass an object as the first parameter.");
        var n;
        return c(e) ? (e.deep = e.deep || !1, e.fields = e.fields || Object.getOwnPropertyNames(t), e.lazy = e.lazy || !1, u(t, e.fields, e)) : (n = e || Object.getOwnPropertyNames(t), u(t, n, {})), t
      }

      function r(t) {
        return t.name ? t.name : (t.toString().trim().match(D) || [])[1]
      }

      function s(t) {
        return t && "object" == typeof t && "Object" === r(t.constructor)
      }

      function a(t, e, n) {
        var o = x.isObservable(t),
          r = !o && Array.isArray(t),
          s = o ? t : r ? x.observableArray(t) : x.observable(t);
        return n[e] = function () {
          return s
        }, (r || o && "push" in s) && d(x, s), {
          configurable: !0,
          enumerable: !0,
          get: s,
          set: x.isWriteableObservable(s) ? s : i
        }
      }

      function l(t, e, n) {
        function i(t, e) {
          return o ? e ? o(t) : o : Array.isArray(t) ? (o = x.observableArray(t), d(x, o), o) : o = x.observable(t)
        }
        if (x.isObservable(t)) return a(t, e, n);
        var o;
        return n[e] = function () {
          return i(t)
        }, {
          configurable: !0,
          enumerable: !0,
          get: function () {
            return i(t)()
          },
          set: function (t) {
            i(t, !0)
          }
        }
      }

      function u(t, e, n) {
        if (e.length) {
          var i = h(t, !0),
            o = {};
          e.forEach(function (e) {
            if (!(e in i) && Object.getOwnPropertyDescriptor(t, e).configurable !== !1) {
              var r = t[e];
              o[e] = (n.lazy ? l : a)(r, e, i), n.deep && s(r) && u(r, Object.keys(r), n)
            }
          }), Object.defineProperties(t, o)
        }
      }

      function c(t) {
        return !!t && "object" == typeof t && t.constructor === Object
      }

      function h(t, e) {
        E || (E = T());
        var n = E.get(t);
        return !n && e && (n = {}, E.set(t, n)), n
      }

      function p(t, e) {
        if (E)
          if (1 === arguments.length) E.delete(t);
          else {
            var n = h(t, !1);
            n && e.forEach(function (t) {
              delete n[t]
            })
          }
      }

      function f(t, e, n) {
        var i = this,
          r = {
            owner: t,
            deferEvaluation: !0
          };
        if ("function" == typeof n) r.read = n;
        else {
          if ("value" in n) throw new Error('For ko.defineProperty, you must not specify a "value" for the property. You must provide a "get" function.');
          if ("function" != typeof n.get) throw new Error('For ko.defineProperty, the third parameter must be either an evaluator function, or an options object containing a function called "get".');
          r.read = n.get, r.write = n.set
        }
        return t[e] = i.computed(r), o.call(i, t, [e]), t
      }

      function d(t, e) {
        var n = null;
        t.computed(function () {
          n && (n.dispose(), n = null);
          var i = e();
          i instanceof Array && (n = m(t, e, i))
        })
      }

      function m(t, e, n) {
        var i = g(t, n);
        return i.subscribe(e)
      }

      function g(t, e) {
        L || (L = T());
        var n = L.get(e);
        if (!n) {
          n = new t.subscribable, L.set(e, n);
          var i = {};
          _(e, n, i), v(t, e, n, i)
        }
        return n
      }

      function _(t, e, n) {
        ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"].forEach(function (i) {
          var o = t[i];
          t[i] = function () {
            var t = o.apply(this, arguments);
            return n.pause !== !0 && e.notifySubscribers(this), t
          }
        })
      }

      function v(t, e, n, i) {
        ["remove", "removeAll", "destroy", "destroyAll", "replace"].forEach(function (o) {
          Object.defineProperty(e, o, {
            enumerable: !1,
            value: function () {
              var r;
              i.pause = !0;
              try {
                r = t.observableArray.fn[o].apply(t.observableArray(e), arguments)
              } finally {
                i.pause = !1
              }
              return n.notifySubscribers(e), r
            }
          })
        })
      }

      function y(t, e) {
        if (!t || "object" != typeof t) return null;
        var n = h(t, !1);
        return n && e in n ? n[e]() : null
      }

      function b(t, e) {
        if (!t || "object" != typeof t) return !1;
        var n = h(t, !1);
        return !!n && e in n
      }

      function w(t, e) {
        var n = y(t, e);
        n && n.valueHasMutated()
      }

      function k(t) {
        t.track = o, t.untrack = p, t.getObservable = y, t.valueHasMutated = w, t.defineProperty = f, t.es5 = {
          getAllObservablesForObject: h,
          notifyWhenPresentOrFutureArrayValuesMutate: d,
          isTracked: b
        }
      }

      function C() {
        if ("object" == typeof exports && "object" == typeof module) {
          x = e("knockout");
          var i = e("../lib/weakmap");
          k(x), T = function () {
            return new i
          }, module.exports = x
        } else "function" == typeof n && n.amd ? n("KnockoutES5", ["knockout"], function (e) {
          return x = e, k(e), T = function () {
            return new t.WeakMap
          }, e
        }) : "ko" in t && (x = t.ko, k(t.ko), T = function () {
          return new t.WeakMap
        })
      }
      var x, E, L, T, D = /^function\s*([^\s(]+)/;
      C()
    }(this), void

  function (t, e, n) {
    function i(t, e, n) {
      return "function" == typeof e && (n = e, e = o(n).replace(/_$/, "")), u(t, e, {
        configurable: !0,
        writable: !0,
        value: n
      })
    }

    function o(t) {
      return "function" != typeof t ? "" : "_name" in t ? t._name : "name" in t ? t.name : c.call(t).match(f)[1]
    }

    function r(t, e) {
      return e._name = t, e
    }

    function s(t) {
      function e(e, o) {
        return o || 2 === arguments.length ? i.set(e, o) : (o = i.get(e), o === n && (o = t(e), i.set(e, o))), o
      }
      var i = new m;
      return t || (t = g), e
    }
    var a = Object.getOwnPropertyNames,
      l = "object" == typeof window ? Object.getOwnPropertyNames(window) : [],
      u = Object.defineProperty,
      c = Function.prototype.toString,
      h = Object.create,
      p = Object.prototype.hasOwnProperty,
      f = /^\n?function\s?(\w*)?_?\(/,
      d = function () {
        function t() {
          var t = s(),
            n = {};
          this.unlock = function (i) {
            var o = f(i);
            if (p.call(o, t)) return o[t](n);
            var r = h(null, e);
            return u(o, t, {
              value: function (t) {
                return t === n ? r : void 0
              }
            }), r
          }
        }
        var e = {
            value: {
              writable: !0,
              value: n
            }
          },
          o = h(null),
          s = function () {
            var t = Math.random().toString(36).slice(2);
            return t in o ? s() : o[t] = t
          },
          c = s(),
          f = function (t) {
            if (p.call(t, c)) return t[c];
            if (!Object.isExtensible(t)) throw new TypeError("Object must be extensible");
            var e = h(null);
            return u(t, c, {
              value: e
            }), e
          };
        return i(Object, r("getOwnPropertyNames", function (t) {
          var e, n = Object(t);
          if (n !== Window.prototype && "toString" in n && "[object Window]" === n.toString()) try {
            e = a(t)
          } catch (t) {
            e = l
          } else e = a(t);
          return p.call(t, c) && e.splice(e.indexOf(c), 1), e
        })), i(t.prototype, r("get", function (t) {
          return this.unlock(t).value
        })), i(t.prototype, r("set", function (t, e) {
          this.unlock(t).value = e
        })), t
      }(),
      m = function (s) {
        function a(e) {
          return this === t || null == this || this === a.prototype ? new a(e) : (m(this, new d), void _(this, e))
        }

        function l(t) {
          f(t);
          var i = g(this).get(t);
          return i === e ? n : i
        }

        function u(t, i) {
          f(t), g(this).set(t, i === n ? e : i)
        }

        function c(t) {
          return f(t), g(this).get(t) !== n
        }

        function h(t) {
          f(t);
          var e = g(this),
            i = e.get(t) !== n;
          return e.set(t, n), i
        }

        function p() {
          return g(this), "[object WeakMap]"
        }
        var f = function (t) {
            if (null == t || "object" != typeof t && "function" != typeof t) throw new TypeError("Invalid WeakMap key")
          },
          m = function (t, e) {
            var n = s.unlock(t);
            if (n.value) throw new TypeError("Object is already a WeakMap");
            n.value = e
          },
          g = function (t) {
            var e = s.unlock(t).value;
            if (!e) throw new TypeError("WeakMap is not generic");
            return e
          },
          _ = function (t, e) {
            null !== e && "object" == typeof e && "function" == typeof e.forEach && e.forEach(function (n, i) {
              n instanceof Array && 2 === n.length && u.call(t, e[i][0], e[i][1])
            })
          };
        l._name = "get", u._name = "set", c._name = "has", p._name = "toString";
        var v = ("" + Object).split("Object"),
          y = r("toString", function () {
            return v[0] + o(this) + v[1]
          });
        i(y, y);
        var b = {
          __proto__: []
        }
        instanceof Array ? function (t) {
          t.__proto__ = y
        } : function (t) {
          i(t, y)
        };
        return b(a), [p, l, u, c, h].forEach(function (t) {
          i(a.prototype, t), b(t)
        }), a
      }(new d),
      g = Object.create ? function () {
        return Object.create(null)
      } : function () {
        return {}
      };
    "undefined" != typeof module ? module.exports = m : "undefined" != typeof exports ? exports.WeakMap = m : "WeakMap" in t || (t.WeakMap = m), m.createStorage = s, t.WeakMap && (t.WeakMap.createStorage = s)
  }(function () {
    return this
  }()), ! function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof n && n.amd) n("markdown-it-sanitizer", [], t);
    else {
      var e;
      e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.markdownitSanitizer = t()
    }
  }(function () {
    return function t(n, i, o) {
      function r(a, l) {
        if (!i[a]) {
          if (!n[a]) {
            var u = "function" == typeof e && e;
            if (!l && u) return u(a, !0);
            if (s) return s(a, !0);
            var c = new Error("Cannot find module '" + a + "'");
            throw c.code = "MODULE_NOT_FOUND", c
          }
          var h = i[a] = {
            exports: {}
          };
          n[a][0].call(h.exports, function (t) {
            var e = n[a][1][t];
            return r(e ? e : t)
          }, h, h.exports, t, n, i, o)
        }
        return i[a].exports
      }
      for (var s = "function" == typeof e && e, a = 0; a < o.length; a++) r(o[a]);
      return r
    }({
      1: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e) {
          function n(t) {
            var e = s.match(t);
            return e && 1 === e.length && 0 === e[0].index && e[0].lastIndex === t.length ? e[0].url : null
          }

          function i(t) {
            var e = '<a\\shref="([^"<>]*)"(?:\\stitle="([^"<>]*)")?>',
              i = RegExp(e, "i"),
              o = '<images\\s([^<>]*src="[^"<>]*"[^<>]*)\\s?\\/?>',
              r = RegExp(o, "i");
            return t = t.replace(/<[^<>]*>?/gi, function (t) {
              var e, o, s, l, c;
              if (/(^<->|^<-\s|^<3\s)/.test(t)) return t;
              if (e = t.match(r)) {
                var g = e[1];
                if (o = n(g.match(/src="([^"<>]*)"/i)[1]), s = g.match(/alt="([^"<>]*)"/i), s = s && "undefined" != typeof s[1] ? s[1] : "", l = g.match(/title="([^"<>]*)"/i), l = l && "undefined" != typeof l[1] ? l[1] : "", o && /^https?:\/\//i.test(o)) return "" !== h ? '<images src="' + o + '" alt="' + s + '" title="' + l + '" class="' + h + '">' : '<images src="' + o + '" alt="' + s + '" title="' + l + '">'
              }
              return c = f.indexOf("a"), e = t.match(i), e && (l = "undefined" != typeof e[2] ? e[2] : "", o = n(e[1]), o && /^(?:https?:\/\/|ftp:\/\/|mailto:|xmpp:)/i.test(o)) ? (p = !0, d[c] += 1, '<a href="' + o + '" title="' + l + '" target="_blank">') : (e = /<\/a>/i.test(t)) ? (p = !0, d[c] -= 1, d[c] < 0 && (m[c] = !0), "</a>") : (e = t.match(/<(br|hr)\s?\/?>/i)) ? "<" + e[1].toLowerCase() + ">" : (e = t.match(/<(\/?)(b|blockquote|code|em|h[1-6]|li|ol(?: start="\d+")?|p|pre|s|sub|sup|strong|ul)>/i), e && !/<\/ol start="\d+"/i.test(t) ? (p = !0, c = f.indexOf(e[2].toLowerCase().split(" ")[0]), "/" === e[1] ? d[c] -= 1 : d[c] += 1, d[c] < 0 && (m[c] = !0), "<" + e[1] + e[2].toLowerCase() + ">") : u === !0 ? "" : a(t))
            })
          }

          function o(t) {
            var e, n, o;
            for (l = 0; l < f.length; l++) d[l] = 0;
            for (l = 0; l < f.length; l++) m[l] = !1;
            for (p = !1, n = 0; n < t.tokens.length; n++)
              if ("html_block" === t.tokens[n].type && (t.tokens[n].content = i(t.tokens[n].content)), "inline" === t.tokens[n].type)
                for (o = t.tokens[n].children, e = 0; e < o.length; e++) "html_inline" === o[e].type && (o[e].content = i(o[e].content))
          }

          function r(t) {
            function e(t, e) {
              var n, i;
              return n = "a" === e ? RegExp('<a href="[^"<>]*" title="[^"<>]*" target="_blank">', "g") : "ol" === e ? /<ol(?: start="\d+")?>/g : RegExp("<" + e + ">", "g"), i = RegExp("</" + e + ">", "g"), c === !0 ? (t = t.replace(n, ""), t = t.replace(i, "")) : (t = t.replace(n, function (t) {
                return a(t)
              }), t = t.replace(i, function (t) {
                return a(t)
              })), t
            }

            function n(t) {
              var n;
              for (n = 0; n < f.length; n++) m[n] === !0 && (t = e(t, f[n]));
              return t
            }
            if (p !== !1) {
              var i, o;
              for (l = 0; l < f.length; l++) 0 !== d[l] && (m[l] = !0);
              for (i = 0; i < t.tokens.length; i++)
                if ("html_block" !== t.tokens[i].type) {
                  if ("inline" === t.tokens[i].type)
                    for (o = t.tokens[i].children, l = 0; l < o.length; l++) "html_inline" === o[l].type && (o[l].content = n(o[l].content))
                } else t.tokens[i].content = n(t.tokens[i].content)
            }
          }
          var s = t.linkify,
            a = t.utils.escapeHtml;
          e = e ? e : {};
          var l, u = "undefined" != typeof e.removeUnknown && e.removeUnknown,
            c = "undefined" != typeof e.removeUnbalanced && e.removeUnbalanced,
            h = "undefined" != typeof e.imageClass ? e.imageClass : "",
            p = !1,
            f = ["a", "b", "blockquote", "code", "em", "h1", "h2", "h3", "h4", "h5", "h6", "li", "ol", "p", "pre", "s", "sub", "sup", "strong", "ul"],
            d = new Array(f.length),
            m = new Array(f.length);
          for (l = 0; l < f.length; l++) d[l] = 0;
          for (l = 0; l < f.length; l++) m[l] = !1;
          t.core.ruler.after("linkify", "sanitize_inline", o), t.core.ruler.after("sanitize_inline", "sanitize_balance", r)
        }
      }, {}]
    }, {}, [1])(1)
  }), ! function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof n && n.amd) n("markdown-it", [], t);
    else {
      var e;
      e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.markdownit = t()
    }
  }(function () {
    var t;
    return function t(n, i, o) {
      function r(a, l) {
        if (!i[a]) {
          if (!n[a]) {
            var u = "function" == typeof e && e;
            if (!l && u) return u(a, !0);
            if (s) return s(a, !0);
            var c = new Error("Cannot find module '" + a + "'");
            throw c.code = "MODULE_NOT_FOUND", c
          }
          var h = i[a] = {
            exports: {}
          };
          n[a][0].call(h.exports, function (t) {
            var e = n[a][1][t];
            return r(e ? e : t)
          }, h, h.exports, t, n, i, o)
        }
        return i[a].exports
      }
      for (var s = "function" == typeof e && e, a = 0; a < o.length; a++) r(o[a]);
      return r
    }({
      1: [function (t, e, n) {
        "use strict";
        e.exports = t("entities/maps/entities.json")
      }, {
        "entities/maps/entities.json": 53
      }],
      2: [function (t, e, n) {
        "use strict";
        e.exports = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "meta", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "pre", "section", "source", "title", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"]
      }, {}],
      3: [function (t, e, n) {
        "use strict";
        var i = "[a-zA-Z_:][a-zA-Z0-9:._-]*",
          o = "[^\"'=<>`\\x00-\\x20]+",
          r = "'[^']*'",
          s = '"[^"]*"',
          a = "(?:" + o + "|" + r + "|" + s + ")",
          l = "(?:\\s+" + i + "(?:\\s*=\\s*" + a + ")?)",
          u = "<[A-Za-z][A-Za-z0-9\\-]*" + l + "*\\s*\\/?>",
          c = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
          h = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->",
          p = "<[?].*?[?]>",
          f = "<![A-Z]+\\s+[^>]*>",
          d = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
          m = new RegExp("^(?:" + u + "|" + c + "|" + h + "|" + p + "|" + f + "|" + d + ")"),
          g = new RegExp("^(?:" + u + "|" + c + ")");
        e.exports.HTML_TAG_RE = m, e.exports.HTML_OPEN_CLOSE_TAG_RE = g
      }, {}],
      4: [function (t, e, n) {
        "use strict";

        function i(t) {
          return Object.prototype.toString.call(t)
        }

        function o(t) {
          return "[object String]" === i(t)
        }

        function r(t, e) {
          return w.call(t, e)
        }

        function s(t) {
          var e = Array.prototype.slice.call(arguments, 1);
          return e.forEach(function (e) {
            if (e) {
              if ("object" != typeof e) throw new TypeError(e + "must be object");
              Object.keys(e).forEach(function (n) {
                t[n] = e[n]
              })
            }
          }), t
        }

        function a(t, e, n) {
          return [].concat(t.slice(0, e), n, t.slice(e + 1))
        }

        function l(t) {
          return !(t >= 55296 && t <= 57343 || t >= 64976 && t <= 65007 || 65535 === (65535 & t) || 65534 === (65535 & t) || t >= 0 && t <= 8 || 11 === t || t >= 14 && t <= 31 || t >= 127 && t <= 159 || t > 1114111)
        }

        function u(t) {
          if (t > 65535) {
            t -= 65536;
            var e = 55296 + (t >> 10),
              n = 56320 + (1023 & t);
            return String.fromCharCode(e, n)
          }
          return String.fromCharCode(t)
        }

        function c(t, e) {
          var n = 0;
          return r(L, e) ? L[e] : 35 === e.charCodeAt(0) && E.test(e) && (n = "x" === e[1].toLowerCase() ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), l(n)) ? u(n) : t
        }

        function h(t) {
          return t.indexOf("\\") < 0 ? t : t.replace(k, "$1")
        }

        function p(t) {
          return t.indexOf("\\") < 0 && t.indexOf("&") < 0 ? t : t.replace(x, function (t, e, n) {
            return e ? e : c(t, n)
          })
        }

        function f(t) {
          return P[t]
        }

        function d(t) {
          return T.test(t) ? t.replace(D, f) : t
        }

        function m(t) {
          return t.replace(S, "\\$&")
        }

        function g(t) {
          switch (t) {
            case 9:
            case 32:
              return !0
          }
          return !1
        }

        function _(t) {
          if (t >= 8192 && t <= 8202) return !0;
          switch (t) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 32:
            case 160:
            case 5760:
            case 8239:
            case 8287:
            case 12288:
              return !0
          }
          return !1
        }

        function v(t) {
          return A.test(t)
        }

        function y(t) {
          switch (t) {
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
            case 123:
            case 124:
            case 125:
            case 126:
              return !0;
            default:
              return !1
          }
        }

        function b(t) {
          return t.trim().replace(/\s+/g, " ").toUpperCase()
        }
        var w = Object.prototype.hasOwnProperty,
          k = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
          C = /&([a-z#][a-z0-9]{1,31});/gi,
          x = new RegExp(k.source + "|" + C.source, "gi"),
          E = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
          L = t("./entities"),
          T = /[&<>"]/,
          D = /[&<>"]/g,
          P = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"
          },
          S = /[.?*+^$[\]\\(){}|-]/g,
          A = t("uc.micro/categories/P/regex");
        n.lib = {}, n.lib.mdurl = t("mdurl"), n.lib.ucmicro = t("uc.micro"), n.assign = s, n.isString = o, n.has = r, n.unescapeMd = h, n.unescapeAll = p, n.isValidEntityCode = l, n.fromCodePoint = u, n.escapeHtml = d, n.arrayReplaceAt = a, n.isSpace = g, n.isWhiteSpace = _, n.isMdAsciiPunct = y, n.isPunctChar = v, n.escapeRE = m, n.normalizeReference = b
      }, {
        "./entities": 1,
        mdurl: 59,
        "uc.micro": 65,
        "uc.micro/categories/P/regex": 63
      }],
      5: [function (t, e, n) {
        "use strict";
        n.parseLinkLabel = t("./parse_link_label"), n.parseLinkDestination = t("./parse_link_destination"), n.parseLinkTitle = t("./parse_link_title")
      }, {
        "./parse_link_destination": 6,
        "./parse_link_label": 7,
        "./parse_link_title": 8
      }],
      6: [function (t, e, n) {
        "use strict";
        var i = t("../common/utils").isSpace,
          o = t("../common/utils").unescapeAll;
        e.exports = function (t, e, n) {
          var r, s, a = 0,
            l = e,
            u = {
              ok: !1,
              pos: 0,
              lines: 0,
              str: ""
            };
          if (60 === t.charCodeAt(e)) {
            for (e++; e < n;) {
              if (r = t.charCodeAt(e), 10 === r || i(r)) return u;
              if (62 === r) return u.pos = e + 1, u.str = o(t.slice(l + 1, e)), u.ok = !0, u;
              92 === r && e + 1 < n ? e += 2 : e++
            }
            return u
          }
          for (s = 0; e < n && (r = t.charCodeAt(e), 32 !== r) && !(r < 32 || 127 === r);)
            if (92 === r && e + 1 < n) e += 2;
            else {
              if (40 === r && (s++, s > 1)) break;
              if (41 === r && (s--, s < 0)) break;
              e++
            } return l === e ? u : (u.str = o(t.slice(l, e)), u.lines = a, u.pos = e, u.ok = !0, u)
        }
      }, {
        "../common/utils": 4
      }],
      7: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e, n) {
          var i, o, r, s, a = -1,
            l = t.posMax,
            u = t.pos;
          for (t.pos = e + 1, i = 1; t.pos < l;) {
            if (r = t.src.charCodeAt(t.pos), 93 === r && (i--, 0 === i)) {
              o = !0;
              break
            }
            if (s = t.pos, t.md.inline.skipToken(t), 91 === r)
              if (s === t.pos - 1) i++;
              else if (n) return t.pos = u, -1
          }
          return o && (a = t.pos), t.pos = u, a
        }
      }, {}],
      8: [function (t, e, n) {
        "use strict";
        var i = t("../common/utils").unescapeAll;
        e.exports = function (t, e, n) {
          var o, r, s = 0,
            a = e,
            l = {
              ok: !1,
              pos: 0,
              lines: 0,
              str: ""
            };
          if (e >= n) return l;
          if (r = t.charCodeAt(e), 34 !== r && 39 !== r && 40 !== r) return l;
          for (e++, 40 === r && (r = 41); e < n;) {
            if (o = t.charCodeAt(e), o === r) return l.pos = e + 1, l.lines = s, l.str = i(t.slice(a + 1, e)), l.ok = !0, l;
            10 === o ? s++ : 92 === o && e + 1 < n && (e++, 10 === t.charCodeAt(e) && s++), e++
          }
          return l
        }
      }, {
        "../common/utils": 4
      }],
      9: [function (t, e, n) {
        "use strict";

        function i(t) {
          var e = t.trim().toLowerCase();
          return !_.test(e) || !!v.test(e)
        }

        function o(t) {
          var e = d.parse(t, !0);
          if (e.hostname && (!e.protocol || y.indexOf(e.protocol) >= 0)) try {
            e.hostname = m.toASCII(e.hostname)
          } catch (t) {}
          return d.encode(d.format(e))
        }

        function r(t) {
          var e = d.parse(t, !0);
          if (e.hostname && (!e.protocol || y.indexOf(e.protocol) >= 0)) try {
            e.hostname = m.toUnicode(e.hostname)
          } catch (t) {}
          return d.decode(d.format(e))
        }

        function s(t, e) {
          return this instanceof s ? (e || a.isString(t) || (e = t || {}, t = "default"), this.inline = new p, this.block = new h, this.core = new c, this.renderer = new u, this.linkify = new f, this.validateLink = i, this.normalizeLink = o, this.normalizeLinkText = r, this.utils = a, this.helpers = l, this.options = {}, this.configure(t), void(e && this.set(e))) : new s(t, e)
        }
        var a = t("./common/utils"),
          l = t("./helpers"),
          u = t("./renderer"),
          c = t("./parser_core"),
          h = t("./parser_block"),
          p = t("./parser_inline"),
          f = t("linkify-it"),
          d = t("mdurl"),
          m = t("punycode"),
          g = {
            default: t("./presets/default"),
            zero: t("./presets/zero"),
            commonmark: t("./presets/commonmark")
          },
          _ = /^(vbscript|javascript|file|data):/,
          v = /^data:image\/(gif|png|jpeg|webp);/,
          y = ["http:", "https:", "mailto:"];
        s.prototype.set = function (t) {
          return a.assign(this.options, t), this
        }, s.prototype.configure = function (t) {
          var e, n = this;
          if (a.isString(t) && (e = t, t = g[e], !t)) throw new Error('Wrong `markdown-it` preset "' + e + '", check name');
          if (!t) throw new Error("Wrong `markdown-it` preset, can't be empty");
          return t.options && n.set(t.options), t.components && Object.keys(t.components).forEach(function (e) {
            t.components[e].rules && n[e].ruler.enableOnly(t.components[e].rules), t.components[e].rules2 && n[e].ruler2.enableOnly(t.components[e].rules2)
          }), this
        }, s.prototype.enable = function (t, e) {
          var n = [];
          Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function (e) {
            n = n.concat(this[e].ruler.enable(t, !0))
          }, this), n = n.concat(this.inline.ruler2.enable(t, !0));
          var i = t.filter(function (t) {
            return n.indexOf(t) < 0
          });
          if (i.length && !e) throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + i);
          return this
        }, s.prototype.disable = function (t, e) {
          var n = [];
          Array.isArray(t) || (t = [t]), ["core", "block", "inline"].forEach(function (e) {
            n = n.concat(this[e].ruler.disable(t, !0))
          }, this), n = n.concat(this.inline.ruler2.disable(t, !0));
          var i = t.filter(function (t) {
            return n.indexOf(t) < 0
          });
          if (i.length && !e) throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + i);
          return this
        }, s.prototype.use = function (t) {
          var e = [this].concat(Array.prototype.slice.call(arguments, 1));
          return t.apply(t, e), this
        }, s.prototype.parse = function (t, e) {
          var n = new this.core.State(t, this, e);
          return this.core.process(n), n.tokens
        }, s.prototype.render = function (t, e) {
          return e = e || {}, this.renderer.render(this.parse(t, e), this.options, e)
        }, s.prototype.parseInline = function (t, e) {
          var n = new this.core.State(t, this, e);
          return n.inlineMode = !0, this.core.process(n), n.tokens
        }, s.prototype.renderInline = function (t, e) {
          return e = e || {}, this.renderer.render(this.parseInline(t, e), this.options, e)
        }, e.exports = s
      }, {
        "./common/utils": 4,
        "./helpers": 5,
        "./parser_block": 10,
        "./parser_core": 11,
        "./parser_inline": 12,
        "./presets/commonmark": 13,
        "./presets/default": 14,
        "./presets/zero": 15,
        "./renderer": 16,
        "linkify-it": 54,
        mdurl: 59,
        punycode: 52
      }],
      10: [function (t, e, n) {
        "use strict";

        function i() {
          this.ruler = new o;
          for (var t = 0; t < r.length; t++) this.ruler.push(r[t][0], r[t][1], {
            alt: (r[t][2] || []).slice()
          })
        }
        var o = t("./ruler"),
          r = [
            ["table", t("./rules_block/table"), ["paragraph", "reference"]],
            ["code", t("./rules_block/code")],
            ["fence", t("./rules_block/fence"), ["paragraph", "reference", "blockquote", "list"]],
            ["blockquote", t("./rules_block/blockquote"), ["paragraph", "reference", "list"]],
            ["hr", t("./rules_block/hr"), ["paragraph", "reference", "blockquote", "list"]],
            ["list", t("./rules_block/list"), ["paragraph", "reference", "blockquote"]],
            ["reference", t("./rules_block/reference")],
            ["heading", t("./rules_block/heading"), ["paragraph", "reference", "blockquote"]],
            ["lheading", t("./rules_block/lheading")],
            ["html_block", t("./rules_block/html_block"), ["paragraph", "reference", "blockquote"]],
            ["paragraph", t("./rules_block/paragraph")]
          ];
        i.prototype.tokenize = function (t, e, n) {
          for (var i, o, r = this.ruler.getRules(""), s = r.length, a = e, l = !1, u = t.md.options.maxNesting; a < n && (t.line = a = t.skipEmptyLines(a), !(a >= n)) && !(t.sCount[a] < t.blkIndent);) {
            if (t.level >= u) {
              t.line = n;
              break
            }
            for (o = 0; o < s && !(i = r[o](t, a, n, !1)); o++);
            if (t.tight = !l, t.isEmpty(t.line - 1) && (l = !0), a = t.line, a < n && t.isEmpty(a)) {
              if (l = !0, a++, a < n && "list" === t.parentType && t.isEmpty(a)) break;
              t.line = a
            }
          }
        }, i.prototype.parse = function (t, e, n, i) {
          var o;
          t && (o = new this.State(t, e, n, i), this.tokenize(o, o.line, o.lineMax))
        }, i.prototype.State = t("./rules_block/state_block"), e.exports = i
      }, {
        "./ruler": 17,
        "./rules_block/blockquote": 18,
        "./rules_block/code": 19,
        "./rules_block/fence": 20,
        "./rules_block/heading": 21,
        "./rules_block/hr": 22,
        "./rules_block/html_block": 23,
        "./rules_block/lheading": 24,
        "./rules_block/list": 25,
        "./rules_block/paragraph": 26,
        "./rules_block/reference": 27,
        "./rules_block/state_block": 28,
        "./rules_block/table": 29
      }],
      11: [function (t, e, n) {
        "use strict";

        function i() {
          this.ruler = new o;
          for (var t = 0; t < r.length; t++) this.ruler.push(r[t][0], r[t][1])
        }
        var o = t("./ruler"),
          r = [
            ["normalize", t("./rules_core/normalize")],
            ["block", t("./rules_core/block")],
            ["inline", t("./rules_core/inline")],
            ["linkify", t("./rules_core/linkify")],
            ["replacements", t("./rules_core/replacements")],
            ["smartquotes", t("./rules_core/smartquotes")]
          ];
        i.prototype.process = function (t) {
          var e, n, i;
          for (i = this.ruler.getRules(""), e = 0, n = i.length; e < n; e++) i[e](t)
        }, i.prototype.State = t("./rules_core/state_core"), e.exports = i
      }, {
        "./ruler": 17,
        "./rules_core/block": 30,
        "./rules_core/inline": 31,
        "./rules_core/linkify": 32,
        "./rules_core/normalize": 33,
        "./rules_core/replacements": 34,
        "./rules_core/smartquotes": 35,
        "./rules_core/state_core": 36
      }],
      12: [function (t, e, n) {
        "use strict";

        function i() {
          var t;
          for (this.ruler = new o, t = 0; t < r.length; t++) this.ruler.push(r[t][0], r[t][1]);
          for (this.ruler2 = new o, t = 0; t < s.length; t++) this.ruler2.push(s[t][0], s[t][1])
        }
        var o = t("./ruler"),
          r = [
            ["text", t("./rules_inline/text")],
            ["newline", t("./rules_inline/newline")],
            ["escape", t("./rules_inline/escape")],
            ["backticks", t("./rules_inline/backticks")],
            ["strikethrough", t("./rules_inline/strikethrough").tokenize],
            ["emphasis", t("./rules_inline/emphasis").tokenize],
            ["link", t("./rules_inline/link")],
            ["image", t("./rules_inline/image")],
            ["autolink", t("./rules_inline/autolink")],
            ["html_inline", t("./rules_inline/html_inline")],
            ["entity", t("./rules_inline/entity")]
          ],
          s = [
            ["balance_pairs", t("./rules_inline/balance_pairs")],
            ["strikethrough", t("./rules_inline/strikethrough").postProcess],
            ["emphasis", t("./rules_inline/emphasis").postProcess],
            ["text_collapse", t("./rules_inline/text_collapse")]
          ];
        i.prototype.skipToken = function (t) {
          var e, n, i = t.pos,
            o = this.ruler.getRules(""),
            r = o.length,
            s = t.md.options.maxNesting,
            a = t.cache;
          if ("undefined" != typeof a[i]) return void(t.pos = a[i]);
          if (t.level < s)
            for (n = 0; n < r && (t.level++, e = o[n](t, !0), t.level--, !e); n++);
          else t.pos = t.posMax;
          e || t.pos++, a[i] = t.pos
        }, i.prototype.tokenize = function (t) {
          for (var e, n, i = this.ruler.getRules(""), o = i.length, r = t.posMax, s = t.md.options.maxNesting; t.pos < r;) {
            if (t.level < s)
              for (n = 0; n < o && !(e = i[n](t, !1)); n++);
            if (e) {
              if (t.pos >= r) break
            } else t.pending += t.src[t.pos++]
          }
          t.pending && t.pushPending()
        }, i.prototype.parse = function (t, e, n, i) {
          var o, r, s, a = new this.State(t, e, n, i);
          for (this.tokenize(a), r = this.ruler2.getRules(""), s = r.length, o = 0; o < s; o++) r[o](a)
        }, i.prototype.State = t("./rules_inline/state_inline"), e.exports = i
      }, {
        "./ruler": 17,
        "./rules_inline/autolink": 37,
        "./rules_inline/backticks": 38,
        "./rules_inline/balance_pairs": 39,
        "./rules_inline/emphasis": 40,
        "./rules_inline/entity": 41,
        "./rules_inline/escape": 42,
        "./rules_inline/html_inline": 43,
        "./rules_inline/image": 44,
        "./rules_inline/link": 45,
        "./rules_inline/newline": 46,
        "./rules_inline/state_inline": 47,
        "./rules_inline/strikethrough": 48,
        "./rules_inline/text": 49,
        "./rules_inline/text_collapse": 50
      }],
      13: [function (t, e, n) {
        "use strict";
        e.exports = {
          options: {
            html: !0,
            xhtmlOut: !0,
            breaks: !1,
            langPrefix: "language-",
            linkify: !1,
            typographer: !1,
            quotes: "“”‘’",
            highlight: null,
            maxNesting: 20
          },
          components: {
            core: {
              rules: ["normalize", "block", "inline"]
            },
            block: {
              rules: ["blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph"]
            },
            inline: {
              rules: ["autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text"],
              rules2: ["balance_pairs", "emphasis", "text_collapse"]
            }
          }
        }
      }, {}],
      14: [function (t, e, n) {
        "use strict";
        e.exports = {
          options: {
            html: !1,
            xhtmlOut: !1,
            breaks: !1,
            langPrefix: "language-",
            linkify: !1,
            typographer: !1,
            quotes: "“”‘’",
            highlight: null,
            maxNesting: 100
          },
          components: {
            core: {},
            block: {},
            inline: {}
          }
        }
      }, {}],
      15: [function (t, e, n) {
        "use strict";
        e.exports = {
          options: {
            html: !1,
            xhtmlOut: !1,
            breaks: !1,
            langPrefix: "language-",
            linkify: !1,
            typographer: !1,
            quotes: "“”‘’",
            highlight: null,
            maxNesting: 20
          },
          components: {
            core: {
              rules: ["normalize", "block", "inline"]
            },
            block: {
              rules: ["paragraph"]
            },
            inline: {
              rules: ["text"],
              rules2: ["balance_pairs", "text_collapse"]
            }
          }
        }
      }, {}],
      16: [function (t, e, n) {
        "use strict";

        function i() {
          this.rules = o({}, a)
        }
        var o = t("./common/utils").assign,
          r = t("./common/utils").unescapeAll,
          s = t("./common/utils").escapeHtml,
          a = {};
        a.code_inline = function (t, e, n, i, o) {
          var r = t[e],
            a = o.renderAttrs(r);
          return "<code" + (a ? " " + a : "") + ">" + s(t[e].content) + "</code>"
        }, a.code_block = function (t, e, n, i, o) {
          var r = t[e],
            a = o.renderAttrs(r);
          return "<pre" + (a ? " " + a : "") + "><code>" + s(t[e].content) + "</code></pre>\n"
        }, a.fence = function (t, e, n, i, o) {
          var a, l, u, c, h = t[e],
            p = h.info ? r(h.info).trim() : "",
            f = "";
          return p && (f = p.split(/\s+/g)[0]), a = n.highlight ? n.highlight(h.content, f) || s(h.content) : s(h.content), 0 === a.indexOf("<pre") ? a + "\n" : p ? (l = h.attrIndex("class"), u = h.attrs ? h.attrs.slice() : [], l < 0 ? u.push(["class", n.langPrefix + f]) : u[l] += " " + n.langPrefix + f, c = {
            attrs: u
          }, "<pre><code" + o.renderAttrs(c) + ">" + a + "</code></pre>\n") : "<pre><code" + o.renderAttrs(h) + ">" + a + "</code></pre>\n"
        }, a.image = function (t, e, n, i, o) {
          var r = t[e];
          return r.attrs[r.attrIndex("alt")][1] = o.renderInlineAsText(r.children, n, i), o.renderToken(t, e, n)
        }, a.hardbreak = function (t, e, n) {
          return n.xhtmlOut ? "<br />\n" : "<br>\n"
        }, a.softbreak = function (t, e, n) {
          return n.breaks ? n.xhtmlOut ? "<br />\n" : "<br>\n" : "\n"
        }, a.text = function (t, e) {
          return s(t[e].content)
        }, a.html_block = function (t, e) {
          return t[e].content
        }, a.html_inline = function (t, e) {
          return t[e].content
        }, i.prototype.renderAttrs = function (t) {
          var e, n, i;
          if (!t.attrs) return "";
          for (i = "", e = 0, n = t.attrs.length; e < n; e++) i += " " + s(t.attrs[e][0]) + '="' + s(t.attrs[e][1]) + '"';
          return i
        }, i.prototype.renderToken = function (t, e, n) {
          var i, o = "",
            r = !1,
            s = t[e];
          return s.hidden ? "" : (s.block && s.nesting !== -1 && e && t[e - 1].hidden && (o += "\n"), o += (s.nesting === -1 ? "</" : "<") + s.tag, o += this.renderAttrs(s), 0 === s.nesting && n.xhtmlOut && (o += " /"), s.block && (r = !0, 1 === s.nesting && e + 1 < t.length && (i = t[e + 1], "inline" === i.type || i.hidden ? r = !1 : i.nesting === -1 && i.tag === s.tag && (r = !1))), o += r ? ">\n" : ">")
        }, i.prototype.renderInline = function (t, e, n) {
          for (var i, o = "", r = this.rules, s = 0, a = t.length; s < a; s++) i = t[s].type, o += "undefined" != typeof r[i] ? r[i](t, s, e, n, this) : this.renderToken(t, s, e);
          return o
        }, i.prototype.renderInlineAsText = function (t, e, n) {
          for (var i = "", o = 0, r = t.length; o < r; o++) "text" === t[o].type ? i += t[o].content : "image" === t[o].type && (i += this.renderInlineAsText(t[o].children, e, n));
          return i
        }, i.prototype.render = function (t, e, n) {
          var i, o, r, s = "",
            a = this.rules;
          for (i = 0, o = t.length; i < o; i++) r = t[i].type, s += "inline" === r ? this.renderInline(t[i].children, e, n) : "undefined" != typeof a[r] ? a[t[i].type](t, i, e, n, this) : this.renderToken(t, i, e, n);
          return s
        }, e.exports = i
      }, {
        "./common/utils": 4
      }],
      17: [function (t, e, n) {
        "use strict";

        function i() {
          this.__rules__ = [], this.__cache__ = null
        }
        i.prototype.__find__ = function (t) {
          for (var e = 0; e < this.__rules__.length; e++)
            if (this.__rules__[e].name === t) return e;
          return -1
        }, i.prototype.__compile__ = function () {
          var t = this,
            e = [""];
          t.__rules__.forEach(function (t) {
            t.enabled && t.alt.forEach(function (t) {
              e.indexOf(t) < 0 && e.push(t)
            })
          }), t.__cache__ = {}, e.forEach(function (e) {
            t.__cache__[e] = [], t.__rules__.forEach(function (n) {
              n.enabled && (e && n.alt.indexOf(e) < 0 || t.__cache__[e].push(n.fn))
            })
          })
        }, i.prototype.at = function (t, e, n) {
          var i = this.__find__(t),
            o = n || {};
          if (i === -1) throw new Error("Parser rule not found: " + t);
          this.__rules__[i].fn = e, this.__rules__[i].alt = o.alt || [], this.__cache__ = null
        }, i.prototype.before = function (t, e, n, i) {
          var o = this.__find__(t),
            r = i || {};
          if (o === -1) throw new Error("Parser rule not found: " + t);
          this.__rules__.splice(o, 0, {
            name: e,
            enabled: !0,
            fn: n,
            alt: r.alt || []
          }), this.__cache__ = null
        }, i.prototype.after = function (t, e, n, i) {
          var o = this.__find__(t),
            r = i || {};
          if (o === -1) throw new Error("Parser rule not found: " + t);
          this.__rules__.splice(o + 1, 0, {
            name: e,
            enabled: !0,
            fn: n,
            alt: r.alt || []
          }), this.__cache__ = null
        }, i.prototype.push = function (t, e, n) {
          var i = n || {};
          this.__rules__.push({
            name: t,
            enabled: !0,
            fn: e,
            alt: i.alt || []
          }), this.__cache__ = null
        }, i.prototype.enable = function (t, e) {
          Array.isArray(t) || (t = [t]);
          var n = [];
          return t.forEach(function (t) {
            var i = this.__find__(t);
            if (i < 0) {
              if (e) return;
              throw new Error("Rules manager: invalid rule name " + t)
            }
            this.__rules__[i].enabled = !0, n.push(t)
          }, this), this.__cache__ = null, n
        }, i.prototype.enableOnly = function (t, e) {
          Array.isArray(t) || (t = [t]), this.__rules__.forEach(function (t) {
            t.enabled = !1
          }), this.enable(t, e)
        }, i.prototype.disable = function (t, e) {
          Array.isArray(t) || (t = [t]);
          var n = [];
          return t.forEach(function (t) {
            var i = this.__find__(t);
            if (i < 0) {
              if (e) return;
              throw new Error("Rules manager: invalid rule name " + t)
            }
            this.__rules__[i].enabled = !1, n.push(t)
          }, this), this.__cache__ = null, n
        }, i.prototype.getRules = function (t) {
          return null === this.__cache__ && this.__compile__(), this.__cache__[t] || []
        }, e.exports = i
      }, {}],
      18: [function (t, e, n) {
        "use strict";
        var i = t("../common/utils").isSpace;
        e.exports = function (t, e, n, o) {
          var r, s, a, l, u, c, h, p, f, d, m, g, _, v, y, b, w = t.bMarks[e] + t.tShift[e],
            k = t.eMarks[e];
          if (62 !== t.src.charCodeAt(w++)) return !1;
          if (o) return !0;
          for (32 === t.src.charCodeAt(w) && w++, c = t.blkIndent, t.blkIndent = 0, f = d = t.sCount[e] + w - (t.bMarks[e] + t.tShift[e]), u = [t.bMarks[e]], t.bMarks[e] = w; w < k && (m = t.src.charCodeAt(w), i(m));) 9 === m ? d += 4 - d % 4 : d++, w++;
          for (s = w >= k, l = [t.sCount[e]], t.sCount[e] = d - f, a = [t.tShift[e]], t.tShift[e] = w - t.bMarks[e], g = t.md.block.ruler.getRules("blockquote"), r = e + 1; r < n && !(t.sCount[r] < c) && (w = t.bMarks[r] + t.tShift[r], k = t.eMarks[r], !(w >= k)); r++)
            if (62 !== t.src.charCodeAt(w++)) {
              if (s) break;
              for (b = !1, v = 0, y = g.length; v < y; v++)
                if (g[v](t, r, n, !0)) {
                  b = !0;
                  break
                } if (b) break;
              u.push(t.bMarks[r]), a.push(t.tShift[r]), l.push(t.sCount[r]), t.sCount[r] = -1
            } else {
              for (32 === t.src.charCodeAt(w) && w++, f = d = t.sCount[r] + w - (t.bMarks[r] + t.tShift[r]), u.push(t.bMarks[r]), t.bMarks[r] = w; w < k && (m = t.src.charCodeAt(w), i(m));) 9 === m ? d += 4 - d % 4 : d++, w++;
              s = w >= k, l.push(t.sCount[r]), t.sCount[r] = d - f, a.push(t.tShift[r]), t.tShift[r] = w - t.bMarks[r]
            } for (h = t.parentType, t.parentType = "blockquote", _ = t.push("blockquote_open", "blockquote", 1), _.markup = ">", _.map = p = [e, 0], t.md.block.tokenize(t, e, r), _ = t.push("blockquote_close", "blockquote", -1), _.markup = ">", t.parentType = h, p[1] = t.line, v = 0; v < a.length; v++) t.bMarks[v + e] = u[v], t.tShift[v + e] = a[v], t.sCount[v + e] = l[v];
          return t.blkIndent = c, !0
        }
      }, {
        "../common/utils": 4
      }],
      19: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e, n) {
          var i, o, r, s = 0;
          if (t.sCount[e] - t.blkIndent < 4) return !1;
          for (o = i = e + 1; i < n;)
            if (t.isEmpty(i)) {
              if (s++, s >= 2 && "list" === t.parentType) break;
              i++
            } else {
              if (s = 0, !(t.sCount[i] - t.blkIndent >= 4)) break;
              i++, o = i
            } return t.line = o, r = t.push("code_block", "code", 0), r.content = t.getLines(e, o, 4 + t.blkIndent, !0), r.map = [e, t.line], !0
        }
      }, {}],
      20: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e, n, i) {
          var o, r, s, a, l, u, c, h = !1,
            p = t.bMarks[e] + t.tShift[e],
            f = t.eMarks[e];
          if (p + 3 > f) return !1;
          if (o = t.src.charCodeAt(p), 126 !== o && 96 !== o) return !1;
          if (l = p, p = t.skipChars(p, o), r = p - l, r < 3) return !1;
          if (c = t.src.slice(l, p), s = t.src.slice(p, f), s.indexOf("`") >= 0) return !1;
          if (i) return !0;
          for (a = e; a++, !(a >= n || (p = l = t.bMarks[a] + t.tShift[a], f = t.eMarks[a], p < f && t.sCount[a] < t.blkIndent));)
            if (t.src.charCodeAt(p) === o && !(t.sCount[a] - t.blkIndent >= 4 || (p = t.skipChars(p, o), p - l < r || (p = t.skipSpaces(p), p < f)))) {
              h = !0;
              break
            } return r = t.sCount[e], t.line = a + (h ? 1 : 0), u = t.push("fence", "code", 0), u.info = s, u.content = t.getLines(e + 1, a, r, !0), u.markup = c, u.map = [e, t.line], !0
        }
      }, {}],
      21: [function (t, e, n) {
        "use strict";
        var i = t("../common/utils").isSpace;
        e.exports = function (t, e, n, o) {
          var r, s, a, l, u = t.bMarks[e] + t.tShift[e],
            c = t.eMarks[e];
          if (r = t.src.charCodeAt(u), 35 !== r || u >= c) return !1;
          for (s = 1, r = t.src.charCodeAt(++u); 35 === r && u < c && s <= 6;) s++, r = t.src.charCodeAt(++u);
          return !(s > 6 || u < c && 32 !== r || !o && (c = t.skipSpacesBack(c, u), a = t.skipCharsBack(c, 35, u), a > u && i(t.src.charCodeAt(a - 1)) && (c = a), t.line = e + 1, l = t.push("heading_open", "h" + String(s), 1), l.markup = "########".slice(0, s), l.map = [e, t.line], l = t.push("inline", "", 0), l.content = t.src.slice(u, c).trim(), l.map = [e, t.line], l.children = [], l = t.push("heading_close", "h" + String(s), -1), l.markup = "########".slice(0, s), 0))
        }
      }, {
        "../common/utils": 4
      }],
      22: [function (t, e, n) {
        "use strict";
        var i = t("../common/utils").isSpace;
        e.exports = function (t, e, n, o) {
          var r, s, a, l, u = t.bMarks[e] + t.tShift[e],
            c = t.eMarks[e];
          if (r = t.src.charCodeAt(u++), 42 !== r && 45 !== r && 95 !== r) return !1;
          for (s = 1; u < c;) {
            if (a = t.src.charCodeAt(u++), a !== r && !i(a)) return !1;
            a === r && s++
          }
          return !(s < 3 || !o && (t.line = e + 1, l = t.push("hr", "hr", 0), l.map = [e, t.line], l.markup = Array(s + 1).join(String.fromCharCode(r)), 0))
        }
      }, {
        "../common/utils": 4
      }],
      23: [function (t, e, n) {
        "use strict";
        var i = t("../common/html_blocks"),
          o = t("../common/html_re").HTML_OPEN_CLOSE_TAG_RE,
          r = [
            [/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, !0],
            [/^<!--/, /-->/, !0],
            [/^<\?/, /\?>/, !0],
            [/^<![A-Z]/, />/, !0],
            [/^<!\[CDATA\[/, /\]\]>/, !0],
            [new RegExp("^</?(" + i.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
            [new RegExp(o.source + "\\s*$"), /^$/, !1]
          ];
        e.exports = function (t, e, n, i) {
          var o, s, a, l, u = t.bMarks[e] + t.tShift[e],
            c = t.eMarks[e];
          if (!t.md.options.html) return !1;
          if (60 !== t.src.charCodeAt(u)) return !1;
          for (l = t.src.slice(u, c), o = 0; o < r.length && !r[o][0].test(l); o++);
          if (o === r.length) return !1;
          if (i) return r[o][2];
          if (s = e + 1, !r[o][1].test(l))
            for (; s < n && !(t.sCount[s] < t.blkIndent); s++)
              if (u = t.bMarks[s] + t.tShift[s], c = t.eMarks[s], l = t.src.slice(u, c), r[o][1].test(l)) {
                0 !== l.length && s++;
                break
              } return t.line = s, a = t.push("html_block", "", 0), a.map = [e, s], a.content = t.getLines(e, s, t.blkIndent, !0), !0
        }
      }, {
        "../common/html_blocks": 2,
        "../common/html_re": 3
      }],
      24: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e, n) {
          for (var i, o, r, s, a, l, u, c, h, p = e + 1, f = t.md.block.ruler.getRules("paragraph"); p < n && !t.isEmpty(p); p++)
            if (!(t.sCount[p] - t.blkIndent > 3)) {
              if (t.sCount[p] >= t.blkIndent && (l = t.bMarks[p] + t.tShift[p], u = t.eMarks[p], l < u && (h = t.src.charCodeAt(l), (45 === h || 61 === h) && (l = t.skipChars(l, h), l = t.skipSpaces(l), l >= u)))) {
                c = 61 === h ? 1 : 2;
                break
              }
              if (!(t.sCount[p] < 0)) {
                for (o = !1, r = 0, s = f.length; r < s; r++)
                  if (f[r](t, p, n, !0)) {
                    o = !0;
                    break
                  } if (o) break
              }
            } return !!c && (i = t.getLines(e, p, t.blkIndent, !1).trim(), t.line = p + 1, a = t.push("heading_open", "h" + String(c), 1), a.markup = String.fromCharCode(h), a.map = [e, t.line], a = t.push("inline", "", 0), a.content = i, a.map = [e, t.line - 1], a.children = [], a = t.push("heading_close", "h" + String(c), -1), a.markup = String.fromCharCode(h), !0)
        }
      }, {}],
      25: [function (t, e, n) {
        "use strict";

        function i(t, e) {
          var n, i, o, r;
          return i = t.bMarks[e] + t.tShift[e], o = t.eMarks[e], n = t.src.charCodeAt(i++), 42 !== n && 45 !== n && 43 !== n ? -1 : i < o && (r = t.src.charCodeAt(i), !s(r)) ? -1 : i
        }

        function o(t, e) {
          var n, i = t.bMarks[e] + t.tShift[e],
            o = i,
            r = t.eMarks[e];
          if (o + 1 >= r) return -1;
          if (n = t.src.charCodeAt(o++), n < 48 || n > 57) return -1;
          for (;;) {
            if (o >= r) return -1;
            if (n = t.src.charCodeAt(o++), !(n >= 48 && n <= 57)) {
              if (41 === n || 46 === n) break;
              return -1
            }
            if (o - i >= 10) return -1
          }
          return o < r && (n = t.src.charCodeAt(o), !s(n)) ? -1 : o
        }

        function r(t, e) {
          var n, i, o = t.level + 2;
          for (n = e + 2, i = t.tokens.length - 2; n < i; n++) t.tokens[n].level === o && "paragraph_open" === t.tokens[n].type && (t.tokens[n + 2].hidden = !0, t.tokens[n].hidden = !0, n += 2)
        }
        var s = t("../common/utils").isSpace;
        e.exports = function (t, e, n, a) {
          var l, u, c, h, p, f, d, m, g, _, v, y, b, w, k, C, x, E, L, T, D, P, S, A, M, z, O, N, I = !0;
          if ((v = o(t, e)) >= 0) E = !0;
          else {
            if (!((v = i(t, e)) >= 0)) return !1;
            E = !1
          }
          if (x = t.src.charCodeAt(v - 1), a) return !0;
          for (T = t.tokens.length, E ? (_ = t.bMarks[e] + t.tShift[e], C = Number(t.src.substr(_, v - _ - 1)), M = t.push("ordered_list_open", "ol", 1), 1 !== C && (M.attrs = [
              ["start", C]
            ])) : M = t.push("bullet_list_open", "ul", 1), M.map = P = [e, 0], M.markup = String.fromCharCode(x), l = e, D = !1, A = t.md.block.ruler.getRules("list"); l < n;) {
            for (b = v, w = t.eMarks[l], u = c = t.sCount[l] + v - (t.bMarks[e] + t.tShift[e]); b < w && (y = t.src.charCodeAt(b), s(y));) 9 === y ? c += 4 - c % 4 : c++, b++;
            if (L = b, k = L >= w ? 1 : c - u, k > 4 && (k = 1), h = u + k, M = t.push("list_item_open", "li", 1), M.markup = String.fromCharCode(x), M.map = S = [e, 0], f = t.blkIndent, m = t.tight, p = t.tShift[e], d = t.sCount[e], g = t.parentType, t.blkIndent = h, t.tight = !0, t.parentType = "list", t.tShift[e] = L - t.bMarks[e], t.sCount[e] = c, L >= w && t.isEmpty(e + 1) ? t.line = Math.min(t.line + 2, n) : t.md.block.tokenize(t, e, n, !0), t.tight && !D || (I = !1), D = t.line - e > 1 && t.isEmpty(t.line - 1), t.blkIndent = f, t.tShift[e] = p, t.sCount[e] = d, t.tight = m, t.parentType = g, M = t.push("list_item_close", "li", -1), M.markup = String.fromCharCode(x), l = e = t.line, S[1] = l, L = t.bMarks[e], l >= n) break;
            if (t.isEmpty(l)) break;
            if (t.sCount[l] < t.blkIndent) break;
            for (N = !1, z = 0, O = A.length; z < O; z++)
              if (A[z](t, l, n, !0)) {
                N = !0;
                break
              } if (N) break;
            if (E) {
              if (v = o(t, l), v < 0) break
            } else if (v = i(t, l), v < 0) break;
            if (x !== t.src.charCodeAt(v - 1)) break
          }
          return M = E ? t.push("ordered_list_close", "ol", -1) : t.push("bullet_list_close", "ul", -1), M.markup = String.fromCharCode(x), P[1] = l, t.line = l, I && r(t, T), !0
        }
      }, {
        "../common/utils": 4
      }],
      26: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e) {
          for (var n, i, o, r, s, a = e + 1, l = t.md.block.ruler.getRules("paragraph"), u = t.lineMax; a < u && !t.isEmpty(a); a++)
            if (!(t.sCount[a] - t.blkIndent > 3 || t.sCount[a] < 0)) {
              for (i = !1, o = 0, r = l.length; o < r; o++)
                if (l[o](t, a, u, !0)) {
                  i = !0;
                  break
                } if (i) break
            } return n = t.getLines(e, a, t.blkIndent, !1).trim(), t.line = a, s = t.push("paragraph_open", "p", 1), s.map = [e, t.line], s = t.push("inline", "", 0), s.content = n, s.map = [e, t.line], s.children = [], s = t.push("paragraph_close", "p", -1), !0
        }
      }, {}],
      27: [function (t, e, n) {
        "use strict";
        var i = t("../helpers/parse_link_destination"),
          o = t("../helpers/parse_link_title"),
          r = t("../common/utils").normalizeReference,
          s = t("../common/utils").isSpace;
        e.exports = function (t, e, n, a) {
          var l, u, c, h, p, f, d, m, g, _, v, y, b, w, k, C = 0,
            x = t.bMarks[e] + t.tShift[e],
            E = t.eMarks[e],
            L = e + 1;
          if (91 !== t.src.charCodeAt(x)) return !1;
          for (; ++x < E;)
            if (93 === t.src.charCodeAt(x) && 92 !== t.src.charCodeAt(x - 1)) {
              if (x + 1 === E) return !1;
              if (58 !== t.src.charCodeAt(x + 1)) return !1;
              break
            } for (h = t.lineMax, w = t.md.block.ruler.getRules("reference"); L < h && !t.isEmpty(L); L++)
            if (!(t.sCount[L] - t.blkIndent > 3 || t.sCount[L] < 0)) {
              for (b = !1, f = 0, d = w.length; f < d; f++)
                if (w[f](t, L, h, !0)) {
                  b = !0;
                  break
                } if (b) break
            } for (y = t.getLines(e, L, t.blkIndent, !1).trim(), E = y.length, x = 1; x < E; x++) {
            if (l = y.charCodeAt(x), 91 === l) return !1;
            if (93 === l) {
              g = x;
              break
            }
            10 === l ? C++ : 92 === l && (x++, x < E && 10 === y.charCodeAt(x) && C++)
          }
          if (g < 0 || 58 !== y.charCodeAt(g + 1)) return !1;
          for (x = g + 2; x < E; x++)
            if (l = y.charCodeAt(x), 10 === l) C++;
            else if (!s(l)) break;
          if (_ = i(y, x, E), !_.ok) return !1;
          if (p = t.md.normalizeLink(_.str), !t.md.validateLink(p)) return !1;
          for (x = _.pos, C += _.lines, u = x, c = C, v = x; x < E; x++)
            if (l = y.charCodeAt(x), 10 === l) C++;
            else if (!s(l)) break;
          for (_ = o(y, x, E), x < E && v !== x && _.ok ? (k = _.str, x = _.pos, C += _.lines) : (k = "", x = u, C = c); x < E && (l = y.charCodeAt(x), s(l));) x++;
          if (x < E && 10 !== y.charCodeAt(x) && k)
            for (k = "", x = u, C = c; x < E && (l = y.charCodeAt(x), s(l));) x++;
          return !(x < E && 10 !== y.charCodeAt(x) || !(m = r(y.slice(1, g))) || !a && ("undefined" == typeof t.env.references && (t.env.references = {}), "undefined" == typeof t.env.references[m] && (t.env.references[m] = {
            title: k,
            href: p
          }), t.line = e + C + 1, 0))
        }
      }, {
        "../common/utils": 4,
        "../helpers/parse_link_destination": 6,
        "../helpers/parse_link_title": 8
      }],
      28: [function (t, e, n) {
        "use strict";

        function i(t, e, n, i) {
          var o, s, a, l, u, c, h, p;
          for (this.src = t, this.md = e, this.env = n, this.tokens = i, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", s = this.src, p = !1, a = l = c = h = 0, u = s.length; l < u; l++) {
            if (o = s.charCodeAt(l), !p) {
              if (r(o)) {
                c++, 9 === o ? h += 4 - h % 4 : h++;
                continue
              }
              p = !0
            }
            10 !== o && l !== u - 1 || (10 !== o && l++, this.bMarks.push(a), this.eMarks.push(l), this.tShift.push(c), this.sCount.push(h), p = !1, c = 0, h = 0, a = l + 1)
          }
          this.bMarks.push(s.length), this.eMarks.push(s.length), this.tShift.push(0), this.sCount.push(0), this.lineMax = this.bMarks.length - 1
        }
        var o = t("../token"),
          r = t("../common/utils").isSpace;
        i.prototype.push = function (t, e, n) {
          var i = new o(t, e, n);
          return i.block = !0, n < 0 && this.level--, i.level = this.level, n > 0 && this.level++, this.tokens.push(i), i
        }, i.prototype.isEmpty = function (t) {
          return this.bMarks[t] + this.tShift[t] >= this.eMarks[t]
        }, i.prototype.skipEmptyLines = function (t) {
          for (var e = this.lineMax; t < e && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++);
          return t
        }, i.prototype.skipSpaces = function (t) {
          for (var e, n = this.src.length; t < n && (e = this.src.charCodeAt(t), r(e)); t++);
          return t
        }, i.prototype.skipSpacesBack = function (t, e) {
          if (t <= e) return t;
          for (; t > e;)
            if (!r(this.src.charCodeAt(--t))) return t + 1;
          return t
        }, i.prototype.skipChars = function (t, e) {
          for (var n = this.src.length; t < n && this.src.charCodeAt(t) === e; t++);
          return t
        }, i.prototype.skipCharsBack = function (t, e, n) {
          if (t <= n) return t;
          for (; t > n;)
            if (e !== this.src.charCodeAt(--t)) return t + 1;
          return t
        }, i.prototype.getLines = function (t, e, n, i) {
          var o, s, a, l, u, c, h, p = t;
          if (t >= e) return "";
          for (c = new Array(e - t), o = 0; p < e; p++, o++) {
            for (s = 0, h = l = this.bMarks[p], u = p + 1 < e || i ? this.eMarks[p] + 1 : this.eMarks[p]; l < u && s < n;) {
              if (a = this.src.charCodeAt(l), r(a)) 9 === a ? s += 4 - s % 4 : s++;
              else {
                if (!(l - h < this.tShift[p])) break;
                s++
              }
              l++
            }
            c[o] = this.src.slice(l, u)
          }
          return c.join("")
        }, i.prototype.Token = o, e.exports = i
      }, {
        "../common/utils": 4,
        "../token": 51
      }],
      29: [function (t, e, n) {
        "use strict";

        function i(t, e) {
          var n = t.bMarks[e] + t.blkIndent,
            i = t.eMarks[e];
          return t.src.substr(n, i - n)
        }

        function o(t) {
          var e, n = [],
            i = 0,
            o = t.length,
            r = 0,
            s = 0,
            a = !1,
            l = 0;
          for (e = t.charCodeAt(i); i < o;) 96 === e && r % 2 === 0 ? (a = !a, l = i) : 124 !== e || r % 2 !== 0 || a ? 92 === e ? r++ : r = 0 : (n.push(t.substring(s, i)), s = i + 1), i++, i === o && a && (a = !1, i = l + 1), e = t.charCodeAt(i);
          return n.push(t.substring(s)), n
        }
        e.exports = function (t, e, n, r) {
          var s, a, l, u, c, h, p, f, d, m, g, _;
          if (e + 2 > n) return !1;
          if (c = e + 1, t.sCount[c] < t.blkIndent) return !1;
          if (l = t.bMarks[c] + t.tShift[c], l >= t.eMarks[c]) return !1;
          if (s = t.src.charCodeAt(l), 124 !== s && 45 !== s && 58 !== s) return !1;
          if (a = i(t, e + 1), !/^[-:| ]+$/.test(a)) return !1;
          for (h = a.split("|"), d = [], u = 0; u < h.length; u++) {
            if (m = h[u].trim(), !m) {
              if (0 === u || u === h.length - 1) continue;
              return !1
            }
            if (!/^:?-+:?$/.test(m)) return !1;
            58 === m.charCodeAt(m.length - 1) ? d.push(58 === m.charCodeAt(0) ? "center" : "right") : 58 === m.charCodeAt(0) ? d.push("left") : d.push("")
          }
          if (a = i(t, e).trim(), a.indexOf("|") === -1) return !1;
          if (h = o(a.replace(/^\||\|$/g, "")), p = h.length, p > d.length) return !1;
          if (r) return !0;
          for (f = t.push("table_open", "table", 1), f.map = g = [e, 0], f = t.push("thead_open", "thead", 1), f.map = [e, e + 1], f = t.push("tr_open", "tr", 1), f.map = [e, e + 1], u = 0; u < h.length; u++) f = t.push("th_open", "th", 1), f.map = [e, e + 1], d[u] && (f.attrs = [
            ["style", "text-align:" + d[u]]
          ]), f = t.push("inline", "", 0), f.content = h[u].trim(), f.map = [e, e + 1], f.children = [], f = t.push("th_close", "th", -1);
          for (f = t.push("tr_close", "tr", -1), f = t.push("thead_close", "thead", -1), f = t.push("tbody_open", "tbody", 1), f.map = _ = [e + 2, 0], c = e + 2; c < n && !(t.sCount[c] < t.blkIndent) && (a = i(t, c), a.indexOf("|") !== -1); c++) {
            for (h = o(a.replace(/^\||\|\s*$/g, "")), f = t.push("tr_open", "tr", 1), u = 0; u < p; u++) f = t.push("td_open", "td", 1), d[u] && (f.attrs = [
              ["style", "text-align:" + d[u]]
            ]), f = t.push("inline", "", 0), f.content = h[u] ? h[u].trim() : "", f.children = [], f = t.push("td_close", "td", -1);
            f = t.push("tr_close", "tr", -1)
          }
          return f = t.push("tbody_close", "tbody", -1), f = t.push("table_close", "table", -1), g[1] = _[1] = c, t.line = c, !0
        }
      }, {}],
      30: [function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var e;
          t.inlineMode ? (e = new t.Token("inline", "", 0), e.content = t.src, e.map = [0, 1], e.children = [], t.tokens.push(e)) : t.md.block.parse(t.src, t.md, t.env, t.tokens)
        }
      }, {}],
      31: [function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var e, n, i, o = t.tokens;
          for (n = 0, i = o.length; n < i; n++) e = o[n], "inline" === e.type && t.md.inline.parse(e.content, t.md, t.env, e.children)
        }
      }, {}],
      32: [function (t, e, n) {
        "use strict";

        function i(t) {
          return /^<a[>\s]/i.test(t)
        }

        function o(t) {
          return /^<\/a\s*>/i.test(t)
        }
        var r = t("../common/utils").arrayReplaceAt;
        e.exports = function (t) {
          var e, n, s, a, l, u, c, h, p, f, d, m, g, _, v, y, b, w = t.tokens;
          if (t.md.options.linkify)
            for (n = 0, s = w.length; n < s; n++)
              if ("inline" === w[n].type && t.md.linkify.pretest(w[n].content))
                for (a = w[n].children, g = 0, e = a.length - 1; e >= 0; e--)
                  if (u = a[e], "link_close" !== u.type) {
                    if ("html_inline" === u.type && (i(u.content) && g > 0 && g--, o(u.content) && g++), !(g > 0) && "text" === u.type && t.md.linkify.test(u.content)) {
                      for (p = u.content, b = t.md.linkify.match(p), c = [], m = u.level, d = 0, h = 0; h < b.length; h++) _ = b[h].url, v = t.md.normalizeLink(_), t.md.validateLink(v) && (y = b[h].text, y = b[h].schema ? "mailto:" !== b[h].schema || /^mailto:/i.test(y) ? t.md.normalizeLinkText(y) : t.md.normalizeLinkText("mailto:" + y).replace(/^mailto:/, "") : t.md.normalizeLinkText("http://" + y).replace(/^http:\/\//, ""), f = b[h].index, f > d && (l = new t.Token("text", "", 0), l.content = p.slice(d, f), l.level = m, c.push(l)), l = new t.Token("link_open", "a", 1), l.attrs = [
                        ["href", v]
                      ], l.level = m++, l.markup = "linkify", l.info = "auto", c.push(l), l = new t.Token("text", "", 0), l.content = y, l.level = m, c.push(l), l = new t.Token("link_close", "a", -1), l.level = --m, l.markup = "linkify", l.info = "auto", c.push(l), d = b[h].lastIndex);
                      d < p.length && (l = new t.Token("text", "", 0), l.content = p.slice(d), l.level = m, c.push(l)), w[n].children = a = r(a, e, c)
                    }
                  } else
                    for (e--; a[e].level !== u.level && "link_open" !== a[e].type;) e--
        }
      }, {
        "../common/utils": 4
      }],
      33: [function (t, e, n) {
        "use strict";
        var i = /\r[\n\u0085]?|[\u2424\u2028\u0085]/g,
          o = /\u0000/g;
        e.exports = function (t) {
          var e;
          e = t.src.replace(i, "\n"), e = e.replace(o, "�"), t.src = e
        }
      }, {}],
      34: [function (t, e, n) {
        "use strict";

        function i(t, e) {
          return u[e.toLowerCase()]
        }

        function o(t) {
          var e, n;
          for (e = t.length - 1; e >= 0; e--) n = t[e], "text" === n.type && (n.content = n.content.replace(l, i))
        }

        function r(t) {
          var e, n;
          for (e = t.length - 1; e >= 0; e--) n = t[e], "text" === n.type && s.test(n.content) && (n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])\u2026/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2"))
        }
        var s = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
          a = /\((c|tm|r|p)\)/i,
          l = /\((c|tm|r|p)\)/gi,
          u = {
            c: "©",
            r: "®",
            p: "§",
            tm: "™"
          };
        e.exports = function (t) {
          var e;
          if (t.md.options.typographer)
            for (e = t.tokens.length - 1; e >= 0; e--) "inline" === t.tokens[e].type && (a.test(t.tokens[e].content) && o(t.tokens[e].children), s.test(t.tokens[e].content) && r(t.tokens[e].children))
        }
      }, {}],
      35: [function (t, e, n) {
        "use strict";

        function i(t, e, n) {
          return t.substr(0, e) + n + t.substr(e + 1)
        }

        function o(t, e) {
          var n, o, l, h, p, f, d, m, g, _, v, y, b, w, k, C, x, E, L, T, D;
          for (L = [], n = 0; n < t.length; n++) {
            for (o = t[n], d = t[n].level, x = L.length - 1; x >= 0 && !(L[x].level <= d); x--);
            if (L.length = x + 1, "text" === o.type) {
              l = o.content, p = 0, f = l.length;
              t: for (; p < f && (u.lastIndex = p, h = u.exec(l));) {
                if (k = C = !0, p = h.index + 1, E = "'" === h[0], g = 32, h.index - 1 >= 0) g = l.charCodeAt(h.index - 1);
                else
                  for (x = n - 1; x >= 0; x--)
                    if ("text" === t[x].type) {
                      g = t[x].content.charCodeAt(t[x].content.length - 1);
                      break
                    } if (_ = 32, p < f) _ = l.charCodeAt(p);
                else
                  for (x = n + 1; x < t.length; x++)
                    if ("text" === t[x].type) {
                      _ = t[x].content.charCodeAt(0);
                      break
                    } if (v = a(g) || s(String.fromCharCode(g)), y = a(_) || s(String.fromCharCode(_)), b = r(g), w = r(_), w ? k = !1 : y && (b || v || (k = !1)), b ? C = !1 : v && (w || y || (C = !1)), 34 === _ && '"' === h[0] && g >= 48 && g <= 57 && (C = k = !1), k && C && (k = !1, C = y), k || C) {
                  if (C)
                    for (x = L.length - 1; x >= 0 && (m = L[x], !(L[x].level < d)); x--)
                      if (m.single === E && L[x].level === d) {
                        m = L[x], E ? (T = e.md.options.quotes[2], D = e.md.options.quotes[3]) : (T = e.md.options.quotes[0], D = e.md.options.quotes[1]), o.content = i(o.content, h.index, D), t[m.token].content = i(t[m.token].content, m.pos, T), p += D.length - 1, m.token === n && (p += T.length - 1), l = o.content, f = l.length, L.length = x;
                        continue t
                      } k ? L.push({
                    token: n,
                    pos: h.index,
                    single: E,
                    level: d
                  }) : C && E && (o.content = i(o.content, h.index, c))
                } else E && (o.content = i(o.content, h.index, c))
              }
            }
          }
        }
        var r = t("../common/utils").isWhiteSpace,
          s = t("../common/utils").isPunctChar,
          a = t("../common/utils").isMdAsciiPunct,
          l = /['"]/,
          u = /['"]/g,
          c = "’";
        e.exports = function (t) {
          var e;
          if (t.md.options.typographer)
            for (e = t.tokens.length - 1; e >= 0; e--) "inline" === t.tokens[e].type && l.test(t.tokens[e].content) && o(t.tokens[e].children, t)
        }
      }, {
        "../common/utils": 4
      }],
      36: [function (t, e, n) {
        "use strict";

        function i(t, e, n) {
          this.src = t, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = e
        }
        var o = t("../token");
        i.prototype.Token = o, e.exports = i
      }, {
        "../token": 51
      }],
      37: [function (t, e, n) {
        "use strict";
        var i = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
          o = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;
        e.exports = function (t, e) {
          var n, r, s, a, l, u, c = t.pos;
          return 60 === t.src.charCodeAt(c) && (n = t.src.slice(c), !(n.indexOf(">") < 0 || (o.test(n) ? (r = n.match(o), a = r[0].slice(1, -1), l = t.md.normalizeLink(a), !t.md.validateLink(l) || (e || (u = t.push("link_open", "a", 1), u.attrs = [
            ["href", l]
          ], u.markup = "autolink", u.info = "auto", u = t.push("text", "", 0), u.content = t.md.normalizeLinkText(a), u = t.push("link_close", "a", -1), u.markup = "autolink", u.info = "auto"), t.pos += r[0].length, 0)) : !i.test(n) || (s = n.match(i), a = s[0].slice(1, -1), l = t.md.normalizeLink("mailto:" + a), !t.md.validateLink(l) || (e || (u = t.push("link_open", "a", 1), u.attrs = [
            ["href", l]
          ], u.markup = "autolink", u.info = "auto", u = t.push("text", "", 0), u.content = t.md.normalizeLinkText(a), u = t.push("link_close", "a", -1), u.markup = "autolink", u.info = "auto"), t.pos += s[0].length, 0)))))
        }
      }, {}],
      38: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e) {
          var n, i, o, r, s, a, l = t.pos,
            u = t.src.charCodeAt(l);
          if (96 !== u) return !1;
          for (n = l, l++, i = t.posMax; l < i && 96 === t.src.charCodeAt(l);) l++;
          for (o = t.src.slice(n, l), r = s = l;
            (r = t.src.indexOf("`", s)) !== -1;) {
            for (s = r + 1; s < i && 96 === t.src.charCodeAt(s);) s++;
            if (s - r === o.length) return e || (a = t.push("code_inline", "code", 0), a.markup = o, a.content = t.src.slice(l, r).replace(/[ \n]+/g, " ").trim()), t.pos = s, !0
          }
          return e || (t.pending += o), t.pos += o.length, !0
        }
      }, {}],
      39: [function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var e, n, i, o, r = t.delimiters,
            s = t.delimiters.length;
          for (e = 0; e < s; e++)
            if (i = r[e], i.close)
              for (n = e - i.jump - 1; n >= 0;) {
                if (o = r[n], o.open && o.marker === i.marker && o.end < 0 && o.level === i.level) {
                  i.jump = e - n, i.open = !1, o.end = e, o.jump = 0;
                  break
                }
                n -= o.jump + 1
              }
        }
      }, {}],
      40: [function (t, e, n) {
        "use strict";
        e.exports.tokenize = function (t, e) {
          var n, i, o, r = t.pos,
            s = t.src.charCodeAt(r);
          if (e) return !1;
          if (95 !== s && 42 !== s) return !1;
          for (i = t.scanDelims(t.pos, 42 === s), n = 0; n < i.length; n++) o = t.push("text", "", 0), o.content = String.fromCharCode(s), t.delimiters.push({
            marker: s,
            jump: n,
            token: t.tokens.length - 1,
            level: t.level,
            end: -1,
            open: i.can_open,
            close: i.can_close
          });
          return t.pos += i.length, !0
        }, e.exports.postProcess = function (t) {
          var e, n, i, o, r, s, a = t.delimiters,
            l = t.delimiters.length;
          for (e = 0; e < l; e++) n = a[e], 95 !== n.marker && 42 !== n.marker || n.end !== -1 && (i = a[n.end], s = e + 1 < l && a[e + 1].end === n.end - 1 && a[e + 1].token === n.token + 1 && a[n.end - 1].token === i.token - 1 && a[e + 1].marker === n.marker, r = String.fromCharCode(n.marker), o = t.tokens[n.token], o.type = s ? "strong_open" : "em_open", o.tag = s ? "strong" : "em", o.nesting = 1, o.markup = s ? r + r : r, o.content = "", o = t.tokens[i.token], o.type = s ? "strong_close" : "em_close", o.tag = s ? "strong" : "em", o.nesting = -1, o.markup = s ? r + r : r, o.content = "", s && (t.tokens[a[e + 1].token].content = "", t.tokens[a[n.end - 1].token].content = "", e++))
        }
      }, {}],
      41: [function (t, e, n) {
        "use strict";
        var i = t("../common/entities"),
          o = t("../common/utils").has,
          r = t("../common/utils").isValidEntityCode,
          s = t("../common/utils").fromCodePoint,
          a = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,
          l = /^&([a-z][a-z0-9]{1,31});/i;
        e.exports = function (t, e) {
          var n, u, c, h = t.pos,
            p = t.posMax;
          if (38 !== t.src.charCodeAt(h)) return !1;
          if (h + 1 < p)
            if (n = t.src.charCodeAt(h + 1), 35 === n) {
              if (c = t.src.slice(h).match(a)) return e || (u = "x" === c[1][0].toLowerCase() ? parseInt(c[1].slice(1), 16) : parseInt(c[1], 10), t.pending += s(r(u) ? u : 65533)), t.pos += c[0].length, !0
            } else if (c = t.src.slice(h).match(l), c && o(i, c[1])) return e || (t.pending += i[c[1]]), t.pos += c[0].length, !0;
          return e || (t.pending += "&"), t.pos++, !0
        }
      }, {
        "../common/entities": 1,
        "../common/utils": 4
      }],
      42: [function (t, e, n) {
        "use strict";
        for (var i = t("../common/utils").isSpace, o = [], r = 0; r < 256; r++) o.push(0);
        "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (t) {
          o[t.charCodeAt(0)] = 1
        }), e.exports = function (t, e) {
          var n, r = t.pos,
            s = t.posMax;
          if (92 !== t.src.charCodeAt(r)) return !1;
          if (r++, r < s) {
            if (n = t.src.charCodeAt(r), n < 256 && 0 !== o[n]) return e || (t.pending += t.src[r]), t.pos += 2, !0;
            if (10 === n) {
              for (e || t.push("hardbreak", "br", 0), r++; r < s && (n = t.src.charCodeAt(r), i(n));) r++;
              return t.pos = r, !0
            }
          }
          return e || (t.pending += "\\"), t.pos++, !0
        }
      }, {
        "../common/utils": 4
      }],
      43: [function (t, e, n) {
        "use strict";

        function i(t) {
          var e = 32 | t;
          return e >= 97 && e <= 122
        }
        var o = t("../common/html_re").HTML_TAG_RE;
        e.exports = function (t, e) {
          var n, r, s, a, l = t.pos;
          return !(!t.md.options.html || (s = t.posMax, 60 !== t.src.charCodeAt(l) || l + 2 >= s || (n = t.src.charCodeAt(l + 1), 33 !== n && 63 !== n && 47 !== n && !i(n) || !(r = t.src.slice(l).match(o)) || (e || (a = t.push("html_inline", "", 0), a.content = t.src.slice(l, l + r[0].length)), t.pos += r[0].length, 0))))
        }
      }, {
        "../common/html_re": 3
      }],
      44: [function (t, e, n) {
        "use strict";
        var i = t("../helpers/parse_link_label"),
          o = t("../helpers/parse_link_destination"),
          r = t("../helpers/parse_link_title"),
          s = t("../common/utils").normalizeReference,
          a = t("../common/utils").isSpace;
        e.exports = function (t, e) {
          var n, l, u, c, h, p, f, d, m, g, _, v, y, b = "",
            w = t.pos,
            k = t.posMax;
          if (33 !== t.src.charCodeAt(t.pos)) return !1;
          if (91 !== t.src.charCodeAt(t.pos + 1)) return !1;
          if (p = t.pos + 2, h = i(t, t.pos + 1, !1), h < 0) return !1;
          if (f = h + 1, f < k && 40 === t.src.charCodeAt(f)) {
            for (f++; f < k && (l = t.src.charCodeAt(f), a(l) || 10 === l); f++);
            if (f >= k) return !1;
            for (y = f, m = o(t.src, f, t.posMax), m.ok && (b = t.md.normalizeLink(m.str), t.md.validateLink(b) ? f = m.pos : b = ""), y = f; f < k && (l = t.src.charCodeAt(f), a(l) || 10 === l); f++);
            if (m = r(t.src, f, t.posMax), f < k && y !== f && m.ok)
              for (g = m.str, f = m.pos; f < k && (l = t.src.charCodeAt(f), a(l) || 10 === l); f++);
            else g = "";
            if (f >= k || 41 !== t.src.charCodeAt(f)) return t.pos = w, !1;
            f++
          } else {
            if ("undefined" == typeof t.env.references) return !1;
            if (f < k && 91 === t.src.charCodeAt(f) ? (y = f + 1, f = i(t, f), f >= 0 ? c = t.src.slice(y, f++) : f = h + 1) : f = h + 1, c || (c = t.src.slice(p, h)), d = t.env.references[s(c)], !d) return t.pos = w, !1;
            b = d.href, g = d.title
          }
          return e || (u = t.src.slice(p, h), t.md.inline.parse(u, t.md, t.env, v = []), _ = t.push("image", "images", 0), _.attrs = n = [
            ["src", b],
            ["alt", ""]
          ], _.children = v, _.content = u, g && n.push(["title", g])), t.pos = f, t.posMax = k, !0
        }
      }, {
        "../common/utils": 4,
        "../helpers/parse_link_destination": 6,
        "../helpers/parse_link_label": 7,
        "../helpers/parse_link_title": 8
      }],
      45: [function (t, e, n) {
        "use strict";
        var i = t("../helpers/parse_link_label"),
          o = t("../helpers/parse_link_destination"),
          r = t("../helpers/parse_link_title"),
          s = t("../common/utils").normalizeReference,
          a = t("../common/utils").isSpace;
        e.exports = function (t, e) {
          var n, l, u, c, h, p, f, d, m, g, _ = "",
            v = t.pos,
            y = t.posMax,
            b = t.pos;
          if (91 !== t.src.charCodeAt(t.pos)) return !1;
          if (h = t.pos + 1, c = i(t, t.pos, !0), c < 0) return !1;
          if (p = c + 1, p < y && 40 === t.src.charCodeAt(p)) {
            for (p++; p < y && (l = t.src.charCodeAt(p), a(l) || 10 === l); p++);
            if (p >= y) return !1;
            for (b = p, f = o(t.src, p, t.posMax), f.ok && (_ = t.md.normalizeLink(f.str), t.md.validateLink(_) ? p = f.pos : _ = ""), b = p; p < y && (l = t.src.charCodeAt(p), a(l) || 10 === l); p++);
            if (f = r(t.src, p, t.posMax), p < y && b !== p && f.ok)
              for (m = f.str, p = f.pos; p < y && (l = t.src.charCodeAt(p), a(l) || 10 === l); p++);
            else m = "";
            if (p >= y || 41 !== t.src.charCodeAt(p)) return t.pos = v, !1;
            p++
          } else {
            if ("undefined" == typeof t.env.references) return !1;
            if (p < y && 91 === t.src.charCodeAt(p) ? (b = p + 1, p = i(t, p), p >= 0 ? u = t.src.slice(b, p++) : p = c + 1) : p = c + 1, u || (u = t.src.slice(h, c)), d = t.env.references[s(u)], !d) return t.pos = v, !1;
            _ = d.href, m = d.title
          }
          return e || (t.pos = h, t.posMax = c, g = t.push("link_open", "a", 1), g.attrs = n = [
            ["href", _]
          ], m && n.push(["title", m]), t.md.inline.tokenize(t), g = t.push("link_close", "a", -1)), t.pos = p, t.posMax = y, !0
        }
      }, {
        "../common/utils": 4,
        "../helpers/parse_link_destination": 6,
        "../helpers/parse_link_label": 7,
        "../helpers/parse_link_title": 8
      }],
      46: [function (t, e, n) {
        "use strict";
        e.exports = function (t, e) {
          var n, i, o = t.pos;
          if (10 !== t.src.charCodeAt(o)) return !1;
          for (n = t.pending.length - 1, i = t.posMax, e || (n >= 0 && 32 === t.pending.charCodeAt(n) ? n >= 1 && 32 === t.pending.charCodeAt(n - 1) ? (t.pending = t.pending.replace(/ +$/, ""), t.push("hardbreak", "br", 0)) : (t.pending = t.pending.slice(0, -1), t.push("softbreak", "br", 0)) : t.push("softbreak", "br", 0)), o++; o < i && 32 === t.src.charCodeAt(o);) o++;
          return t.pos = o, !0
        }
      }, {}],
      47: [function (t, e, n) {
        "use strict";

        function i(t, e, n, i) {
          this.src = t, this.env = n, this.md = e, this.tokens = i, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = []
        }
        var o = t("../token"),
          r = t("../common/utils").isWhiteSpace,
          s = t("../common/utils").isPunctChar,
          a = t("../common/utils").isMdAsciiPunct;
        i.prototype.pushPending = function () {
          var t = new o("text", "", 0);
          return t.content = this.pending, t.level = this.pendingLevel, this.tokens.push(t), this.pending = "", t
        }, i.prototype.push = function (t, e, n) {
          this.pending && this.pushPending();
          var i = new o(t, e, n);
          return n < 0 && this.level--, i.level = this.level, n > 0 && this.level++, this.pendingLevel = this.level, this.tokens.push(i), i
        }, i.prototype.scanDelims = function (t, e) {
          var n, i, o, l, u, c, h, p, f, d = t,
            m = !0,
            g = !0,
            _ = this.posMax,
            v = this.src.charCodeAt(t);
          for (n = t > 0 ? this.src.charCodeAt(t - 1) : 32; d < _ && this.src.charCodeAt(d) === v;) d++;
          return o = d - t, i = d < _ ? this.src.charCodeAt(d) : 32, h = a(n) || s(String.fromCharCode(n)), f = a(i) || s(String.fromCharCode(i)), c = r(n), p = r(i), p ? m = !1 : f && (c || h || (m = !1)), c ? g = !1 : h && (p || f || (g = !1)), e ? (l = m, u = g) : (l = m && (!g || h), u = g && (!m || f)), {
            can_open: l,
            can_close: u,
            length: o
          }
        }, i.prototype.Token = o, e.exports = i
      }, {
        "../common/utils": 4,
        "../token": 51
      }],
      48: [function (t, e, n) {
        "use strict";
        e.exports.tokenize = function (t, e) {
          var n, i, o, r, s, a = t.pos,
            l = t.src.charCodeAt(a);
          if (e) return !1;
          if (126 !== l) return !1;
          if (i = t.scanDelims(t.pos, !0), r = i.length, s = String.fromCharCode(l), r < 2) return !1;
          for (r % 2 && (o = t.push("text", "", 0), o.content = s, r--), n = 0; n < r; n += 2) o = t.push("text", "", 0), o.content = s + s, t.delimiters.push({
            marker: l,
            jump: n,
            token: t.tokens.length - 1,
            level: t.level,
            end: -1,
            open: i.can_open,
            close: i.can_close
          });
          return t.pos += i.length, !0
        }, e.exports.postProcess = function (t) {
          var e, n, i, o, r, s = [],
            a = t.delimiters,
            l = t.delimiters.length;
          for (e = 0; e < l; e++) i = a[e], 126 === i.marker && i.end !== -1 && (o = a[i.end], r = t.tokens[i.token], r.type = "s_open", r.tag = "s", r.nesting = 1, r.markup = "~~", r.content = "", r = t.tokens[o.token], r.type = "s_close", r.tag = "s", r.nesting = -1, r.markup = "~~", r.content = "", "text" === t.tokens[o.token - 1].type && "~" === t.tokens[o.token - 1].content && s.push(o.token - 1));
          for (; s.length;) {
            for (e = s.pop(), n = e + 1; n < t.tokens.length && "s_close" === t.tokens[n].type;) n++;
            n--, e !== n && (r = t.tokens[n], t.tokens[n] = t.tokens[e], t.tokens[e] = r)
          }
        }
      }, {}],
      49: [function (t, e, n) {
        "use strict";

        function i(t) {
          switch (t) {
            case 10:
            case 33:
            case 35:
            case 36:
            case 37:
            case 38:
            case 42:
            case 43:
            case 45:
            case 58:
            case 60:
            case 61:
            case 62:
            case 64:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
            case 123:
            case 125:
            case 126:
              return !0;
            default:
              return !1
          }
        }
        e.exports = function (t, e) {
          for (var n = t.pos; n < t.posMax && !i(t.src.charCodeAt(n));) n++;
          return n !== t.pos && (e || (t.pending += t.src.slice(t.pos, n)), t.pos = n, !0)
        }
      }, {}],
      50: [function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var e, n, i = 0,
            o = t.tokens,
            r = t.tokens.length;
          for (e = n = 0; e < r; e++) i += o[e].nesting, o[e].level = i, "text" === o[e].type && e + 1 < r && "text" === o[e + 1].type ? o[e + 1].content = o[e].content + o[e + 1].content : (e !== n && (o[n] = o[e]), n++);
          e !== n && (o.length = n)
        }
      }, {}],
      51: [function (t, e, n) {
        "use strict";

        function i(t, e, n) {
          this.type = t, this.tag = e, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1
        }
        i.prototype.attrIndex = function (t) {
          var e, n, i;
          if (!this.attrs) return -1;
          for (e = this.attrs, n = 0, i = e.length; n < i; n++)
            if (e[n][0] === t) return n;
          return -1
        }, i.prototype.attrPush = function (t) {
          this.attrs ? this.attrs.push(t) : this.attrs = [t]
        }, i.prototype.attrSet = function (t, e) {
          var n = this.attrIndex(t),
            i = [t, e];
          n < 0 ? this.attrPush(i) : this.attrs[n] = i
        }, i.prototype.attrGet = function (t) {
          var e = this.attrIndex(t),
            n = null;
          return e >= 0 && (n = this.attrs[e][1]), n
        }, i.prototype.attrJoin = function (t, e) {
          var n = this.attrIndex(t);
          n < 0 ? this.attrPush([t, e]) : this.attrs[n][1] = this.attrs[n][1] + " " + e
        }, e.exports = i
      }, {}],
      52: [function (e, n, i) {
        (function (e) {
          ! function (o) {
            function r(t) {
              throw new RangeError(O[t])
            }

            function s(t, e) {
              for (var n = t.length, i = []; n--;) i[n] = e(t[n]);
              return i
            }

            function a(t, e) {
              var n = t.split("@"),
                i = "";
              n.length > 1 && (i = n[0] + "@", t = n[1]), t = t.replace(z, ".");
              var o = t.split("."),
                r = s(o, e).join(".");
              return i + r
            }

            function l(t) {
              for (var e, n, i = [], o = 0, r = t.length; o < r;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < r ? (n = t.charCodeAt(o++), 56320 == (64512 & n) ? i.push(((1023 & e) << 10) + (1023 & n) + 65536) : (i.push(e), o--)) : i.push(e);
              return i
            }

            function u(t) {
              return s(t, function (t) {
                var e = "";
                return t > 65535 && (t -= 65536, e += B(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += B(t)
              }).join("")
            }

            function c(t) {
              return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : C
            }

            function h(t, e) {
              return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
            }

            function p(t, e, n) {
              var i = 0;
              for (t = n ? I(t / T) : t >> 1, t += I(t / e); t > N * E >> 1; i += C) t = I(t / N);
              return I(i + (N + 1) * t / (t + L))
            }

            function f(t) {
              var e, n, i, o, s, a, l, h, f, d, m = [],
                g = t.length,
                _ = 0,
                v = P,
                y = D;
              for (n = t.lastIndexOf(S), n < 0 && (n = 0), i = 0; i < n; ++i) t.charCodeAt(i) >= 128 && r("not-basic"), m.push(t.charCodeAt(i));
              for (o = n > 0 ? n + 1 : 0; o < g;) {
                for (s = _, a = 1, l = C; o >= g && r("invalid-input"), h = c(t.charCodeAt(o++)), (h >= C || h > I((k - _) / a)) && r("overflow"), _ += h * a, f = l <= y ? x : l >= y + E ? E : l - y, !(h < f); l += C) d = C - f, a > I(k / d) && r("overflow"), a *= d;
                e = m.length + 1, y = p(_ - s, e, 0 == s), I(_ / e) > k - v && r("overflow"), v += I(_ / e), _ %= e, m.splice(_++, 0, v)
              }
              return u(m)
            }

            function d(t) {
              var e, n, i, o, s, a, u, c, f, d, m, g, _, v, y, b = [];
              for (t = l(t), g = t.length, e = P, n = 0, s = D, a = 0; a < g; ++a) m = t[a], m < 128 && b.push(B(m));
              for (i = o = b.length, o && b.push(S); i < g;) {
                for (u = k, a = 0; a < g; ++a) m = t[a], m >= e && m < u && (u = m);
                for (_ = i + 1, u - e > I((k - n) / _) && r("overflow"), n += (u - e) * _, e = u, a = 0; a < g; ++a)
                  if (m = t[a], m < e && ++n > k && r("overflow"), m == e) {
                    for (c = n, f = C; d = f <= s ? x : f >= s + E ? E : f - s, !(c < d); f += C) y = c - d, v = C - d, b.push(B(h(d + y % v, 0))), c = I(y / v);
                    b.push(B(h(c, 0))), s = p(n, _, i == o), n = 0, ++i
                  }++ n, ++e
              }
              return b.join("")
            }

            function m(t) {
              return a(t, function (t) {
                return A.test(t) ? f(t.slice(4).toLowerCase()) : t
              })
            }

            function g(t) {
              return a(t, function (t) {
                return M.test(t) ? "xn--" + d(t) : t
              })
            }
            var _ = "object" == typeof i && i && !i.nodeType && i,
              v = "object" == typeof n && n && !n.nodeType && n,
              y = "object" == typeof e && e;
            y.global !== y && y.window !== y && y.self !== y || (o = y);
            var b, w, k = 2147483647,
              C = 36,
              x = 1,
              E = 26,
              L = 38,
              T = 700,
              D = 72,
              P = 128,
              S = "-",
              A = /^xn--/,
              M = /[^\x20-\x7E]/,
              z = /[\x2E\u3002\uFF0E\uFF61]/g,
              O = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
              },
              N = C - x,
              I = Math.floor,
              B = String.fromCharCode;
            if (b = {
                version: "1.4.1",
                ucs2: {
                  decode: l,
                  encode: u
                },
                decode: f,
                encode: d,
                toASCII: g,
                toUnicode: m
              }, "function" == typeof t && "object" == typeof t.amd && t.amd) t("punycode", function () {
              return b
            });
            else if (_ && v)
              if (n.exports == _) v.exports = b;
              else
                for (w in b) b.hasOwnProperty(w) && (_[w] = b[w]);
            else o.punycode = b
          }(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
      }, {}],
      53: [function (t, e, n) {
        e.exports = {
          Aacute: "Á",
          aacute: "á",
          Abreve: "Ă",
          abreve: "ă",
          ac: "∾",
          acd: "∿",
          acE: "∾̳",
          Acirc: "Â",
          acirc: "â",
          acute: "´",
          Acy: "А",
          acy: "а",
          AElig: "Æ",
          aelig: "æ",
          af: "⁡",
          Afr: "𝔄",
          afr: "𝔞",
          Agrave: "À",
          agrave: "à",
          alefsym: "ℵ",
          aleph: "ℵ",
          Alpha: "Α",
          alpha: "α",
          Amacr: "Ā",
          amacr: "ā",
          amalg: "⨿",
          amp: "&",
          AMP: "&",
          andand: "⩕",
          And: "⩓",
          and: "∧",
          andd: "⩜",
          andslope: "⩘",
          andv: "⩚",
          ang: "∠",
          ange: "⦤",
          angle: "∠",
          angmsdaa: "⦨",
          angmsdab: "⦩",
          angmsdac: "⦪",
          angmsdad: "⦫",
          angmsdae: "⦬",
          angmsdaf: "⦭",
          angmsdag: "⦮",
          angmsdah: "⦯",
          angmsd: "∡",
          angrt: "∟",
          angrtvb: "⊾",
          angrtvbd: "⦝",
          angsph: "∢",
          angst: "Å",
          angzarr: "⍼",
          Aogon: "Ą",
          aogon: "ą",
          Aopf: "𝔸",
          aopf: "𝕒",
          apacir: "⩯",
          ap: "≈",
          apE: "⩰",
          ape: "≊",
          apid: "≋",
          apos: "'",
          ApplyFunction: "⁡",
          approx: "≈",
          approxeq: "≊",
          Aring: "Å",
          aring: "å",
          Ascr: "𝒜",
          ascr: "𝒶",
          Assign: "≔",
          ast: "*",
          asymp: "≈",
          asympeq: "≍",
          Atilde: "Ã",
          atilde: "ã",
          Auml: "Ä",
          auml: "ä",
          awconint: "∳",
          awint: "⨑",
          backcong: "≌",
          backepsilon: "϶",
          backprime: "‵",
          backsim: "∽",
          backsimeq: "⋍",
          Backslash: "∖",
          Barv: "⫧",
          barvee: "⊽",
          barwed: "⌅",
          Barwed: "⌆",
          barwedge: "⌅",
          bbrk: "⎵",
          bbrktbrk: "⎶",
          bcong: "≌",
          Bcy: "Б",
          bcy: "б",
          bdquo: "„",
          becaus: "∵",
          because: "∵",
          Because: "∵",
          bemptyv: "⦰",
          bepsi: "϶",
          bernou: "ℬ",
          Bernoullis: "ℬ",
          Beta: "Β",
          beta: "β",
          beth: "ℶ",
          between: "≬",
          Bfr: "𝔅",
          bfr: "𝔟",
          bigcap: "⋂",
          bigcirc: "◯",
          bigcup: "⋃",
          bigodot: "⨀",
          bigoplus: "⨁",
          bigotimes: "⨂",
          bigsqcup: "⨆",
          bigstar: "★",
          bigtriangledown: "▽",
          bigtriangleup: "△",
          biguplus: "⨄",
          bigvee: "⋁",
          bigwedge: "⋀",
          bkarow: "⤍",
          blacklozenge: "⧫",
          blacksquare: "▪",
          blacktriangle: "▴",
          blacktriangledown: "▾",
          blacktriangleleft: "◂",
          blacktriangleright: "▸",
          blank: "␣",
          blk12: "▒",
          blk14: "░",
          blk34: "▓",
          block: "█",
          bne: "=⃥",
          bnequiv: "≡⃥",
          bNot: "⫭",
          bnot: "⌐",
          Bopf: "𝔹",
          bopf: "𝕓",
          bot: "⊥",
          bottom: "⊥",
          bowtie: "⋈",
          boxbox: "⧉",
          boxdl: "┐",
          boxdL: "╕",
          boxDl: "╖",
          boxDL: "╗",
          boxdr: "┌",
          boxdR: "╒",
          boxDr: "╓",
          boxDR: "╔",
          boxh: "─",
          boxH: "═",
          boxhd: "┬",
          boxHd: "╤",
          boxhD: "╥",
          boxHD: "╦",
          boxhu: "┴",
          boxHu: "╧",
          boxhU: "╨",
          boxHU: "╩",
          boxminus: "⊟",
          boxplus: "⊞",
          boxtimes: "⊠",
          boxul: "┘",
          boxuL: "╛",
          boxUl: "╜",
          boxUL: "╝",
          boxur: "└",
          boxuR: "╘",
          boxUr: "╙",
          boxUR: "╚",
          boxv: "│",
          boxV: "║",
          boxvh: "┼",
          boxvH: "╪",
          boxVh: "╫",
          boxVH: "╬",
          boxvl: "┤",
          boxvL: "╡",
          boxVl: "╢",
          boxVL: "╣",
          boxvr: "├",
          boxvR: "╞",
          boxVr: "╟",
          boxVR: "╠",
          bprime: "‵",
          breve: "˘",
          Breve: "˘",
          brvbar: "¦",
          bscr: "𝒷",
          Bscr: "ℬ",
          bsemi: "⁏",
          bsim: "∽",
          bsime: "⋍",
          bsolb: "⧅",
          bsol: "\\",
          bsolhsub: "⟈",
          bull: "•",
          bullet: "•",
          bump: "≎",
          bumpE: "⪮",
          bumpe: "≏",
          Bumpeq: "≎",
          bumpeq: "≏",
          Cacute: "Ć",
          cacute: "ć",
          capand: "⩄",
          capbrcup: "⩉",
          capcap: "⩋",
          cap: "∩",
          Cap: "⋒",
          capcup: "⩇",
          capdot: "⩀",
          CapitalDifferentialD: "ⅅ",
          caps: "∩︀",
          caret: "⁁",
          caron: "ˇ",
          Cayleys: "ℭ",
          ccaps: "⩍",
          Ccaron: "Č",
          ccaron: "č",
          Ccedil: "Ç",
          ccedil: "ç",
          Ccirc: "Ĉ",
          ccirc: "ĉ",
          Cconint: "∰",
          ccups: "⩌",
          ccupssm: "⩐",
          Cdot: "Ċ",
          cdot: "ċ",
          cedil: "¸",
          Cedilla: "¸",
          cemptyv: "⦲",
          cent: "¢",
          centerdot: "·",
          CenterDot: "·",
          cfr: "𝔠",
          Cfr: "ℭ",
          CHcy: "Ч",
          chcy: "ч",
          check: "✓",
          checkmark: "✓",
          Chi: "Χ",
          chi: "χ",
          circ: "ˆ",
          circeq: "≗",
          circlearrowleft: "↺",
          circlearrowright: "↻",
          circledast: "⊛",
          circledcirc: "⊚",
          circleddash: "⊝",
          CircleDot: "⊙",
          circledR: "®",
          circledS: "Ⓢ",
          CircleMinus: "⊖",
          CirclePlus: "⊕",
          CircleTimes: "⊗",
          cir: "○",
          cirE: "⧃",
          cire: "≗",
          cirfnint: "⨐",
          cirmid: "⫯",
          cirscir: "⧂",
          ClockwiseContourIntegral: "∲",
          CloseCurlyDoubleQuote: "”",
          CloseCurlyQuote: "’",
          clubs: "♣",
          clubsuit: "♣",
          colon: ":",
          Colon: "∷",
          Colone: "⩴",
          colone: "≔",
          coloneq: "≔",
          comma: ",",
          commat: "@",
          comp: "∁",
          compfn: "∘",
          complement: "∁",
          complexes: "ℂ",
          cong: "≅",
          congdot: "⩭",
          Congruent: "≡",
          conint: "∮",
          Conint: "∯",
          ContourIntegral: "∮",
          copf: "𝕔",
          Copf: "ℂ",
          coprod: "∐",
          Coproduct: "∐",
          copy: "©",
          COPY: "©",
          copysr: "℗",
          CounterClockwiseContourIntegral: "∳",
          crarr: "↵",
          cross: "✗",
          Cross: "⨯",
          Cscr: "𝒞",
          cscr: "𝒸",
          csub: "⫏",
          csube: "⫑",
          csup: "⫐",
          csupe: "⫒",
          ctdot: "⋯",
          cudarrl: "⤸",
          cudarrr: "⤵",
          cuepr: "⋞",
          cuesc: "⋟",
          cularr: "↶",
          cularrp: "⤽",
          cupbrcap: "⩈",
          cupcap: "⩆",
          CupCap: "≍",
          cup: "∪",
          Cup: "⋓",
          cupcup: "⩊",
          cupdot: "⊍",
          cupor: "⩅",
          cups: "∪︀",
          curarr: "↷",
          curarrm: "⤼",
          curlyeqprec: "⋞",
          curlyeqsucc: "⋟",
          curlyvee: "⋎",
          curlywedge: "⋏",
          curren: "¤",
          curvearrowleft: "↶",
          curvearrowright: "↷",
          cuvee: "⋎",
          cuwed: "⋏",
          cwconint: "∲",
          cwint: "∱",
          cylcty: "⌭",
          dagger: "†",
          Dagger: "‡",
          daleth: "ℸ",
          darr: "↓",
          Darr: "↡",
          dArr: "⇓",
          dash: "‐",
          Dashv: "⫤",
          dashv: "⊣",
          dbkarow: "⤏",
          dblac: "˝",
          Dcaron: "Ď",
          dcaron: "ď",
          Dcy: "Д",
          dcy: "д",
          ddagger: "‡",
          ddarr: "⇊",
          DD: "ⅅ",
          dd: "ⅆ",
          DDotrahd: "⤑",
          ddotseq: "⩷",
          deg: "°",
          Del: "∇",
          Delta: "Δ",
          delta: "δ",
          demptyv: "⦱",
          dfisht: "⥿",
          Dfr: "𝔇",
          dfr: "𝔡",
          dHar: "⥥",
          dharl: "⇃",
          dharr: "⇂",
          DiacriticalAcute: "´",
          DiacriticalDot: "˙",
          DiacriticalDoubleAcute: "˝",
          DiacriticalGrave: "`",
          DiacriticalTilde: "˜",
          diam: "⋄",
          diamond: "⋄",
          Diamond: "⋄",
          diamondsuit: "♦",
          diams: "♦",
          die: "¨",
          DifferentialD: "ⅆ",
          digamma: "ϝ",
          disin: "⋲",
          div: "÷",
          divide: "÷",
          divideontimes: "⋇",
          divonx: "⋇",
          DJcy: "Ђ",
          djcy: "ђ",
          dlcorn: "⌞",
          dlcrop: "⌍",
          dollar: "$",
          Dopf: "𝔻",
          dopf: "𝕕",
          Dot: "¨",
          dot: "˙",
          DotDot: "⃜",
          doteq: "≐",
          doteqdot: "≑",
          DotEqual: "≐",
          dotminus: "∸",
          dotplus: "∔",
          dotsquare: "⊡",
          doublebarwedge: "⌆",
          DoubleContourIntegral: "∯",
          DoubleDot: "¨",
          DoubleDownArrow: "⇓",
          DoubleLeftArrow: "⇐",
          DoubleLeftRightArrow: "⇔",
          DoubleLeftTee: "⫤",
          DoubleLongLeftArrow: "⟸",
          DoubleLongLeftRightArrow: "⟺",
          DoubleLongRightArrow: "⟹",
          DoubleRightArrow: "⇒",
          DoubleRightTee: "⊨",
          DoubleUpArrow: "⇑",
          DoubleUpDownArrow: "⇕",
          DoubleVerticalBar: "∥",
          DownArrowBar: "⤓",
          downarrow: "↓",
          DownArrow: "↓",
          Downarrow: "⇓",
          DownArrowUpArrow: "⇵",
          DownBreve: "̑",
          downdownarrows: "⇊",
          downharpoonleft: "⇃",
          downharpoonright: "⇂",
          DownLeftRightVector: "⥐",
          DownLeftTeeVector: "⥞",
          DownLeftVectorBar: "⥖",
          DownLeftVector: "↽",
          DownRightTeeVector: "⥟",
          DownRightVectorBar: "⥗",
          DownRightVector: "⇁",
          DownTeeArrow: "↧",
          DownTee: "⊤",
          drbkarow: "⤐",
          drcorn: "⌟",
          drcrop: "⌌",
          Dscr: "𝒟",
          dscr: "𝒹",
          DScy: "Ѕ",
          dscy: "ѕ",
          dsol: "⧶",
          Dstrok: "Đ",
          dstrok: "đ",
          dtdot: "⋱",
          dtri: "▿",
          dtrif: "▾",
          duarr: "⇵",
          duhar: "⥯",
          dwangle: "⦦",
          DZcy: "Џ",
          dzcy: "џ",
          dzigrarr: "⟿",
          Eacute: "É",
          eacute: "é",
          easter: "⩮",
          Ecaron: "Ě",
          ecaron: "ě",
          Ecirc: "Ê",
          ecirc: "ê",
          ecir: "≖",
          ecolon: "≕",
          Ecy: "Э",
          ecy: "э",
          eDDot: "⩷",
          Edot: "Ė",
          edot: "ė",
          eDot: "≑",
          ee: "ⅇ",
          efDot: "≒",
          Efr: "𝔈",
          efr: "𝔢",
          eg: "⪚",
          Egrave: "È",
          egrave: "è",
          egs: "⪖",
          egsdot: "⪘",
          el: "⪙",
          Element: "∈",
          elinters: "⏧",
          ell: "ℓ",
          els: "⪕",
          elsdot: "⪗",
          Emacr: "Ē",
          emacr: "ē",
          empty: "∅",
          emptyset: "∅",
          EmptySmallSquare: "◻",
          emptyv: "∅",
          EmptyVerySmallSquare: "▫",
          emsp13: " ",
          emsp14: " ",
          emsp: " ",
          ENG: "Ŋ",
          eng: "ŋ",
          ensp: " ",
          Eogon: "Ę",
          eogon: "ę",
          Eopf: "𝔼",
          eopf: "𝕖",
          epar: "⋕",
          eparsl: "⧣",
          eplus: "⩱",
          epsi: "ε",
          Epsilon: "Ε",
          epsilon: "ε",
          epsiv: "ϵ",
          eqcirc: "≖",
          eqcolon: "≕",
          eqsim: "≂",
          eqslantgtr: "⪖",
          eqslantless: "⪕",
          Equal: "⩵",
          equals: "=",
          EqualTilde: "≂",
          equest: "≟",
          Equilibrium: "⇌",
          equiv: "≡",
          equivDD: "⩸",
          eqvparsl: "⧥",
          erarr: "⥱",
          erDot: "≓",
          escr: "ℯ",
          Escr: "ℰ",
          esdot: "≐",
          Esim: "⩳",
          esim: "≂",
          Eta: "Η",
          eta: "η",
          ETH: "Ð",
          eth: "ð",
          Euml: "Ë",
          euml: "ë",
          euro: "€",
          excl: "!",
          exist: "∃",
          Exists: "∃",
          expectation: "ℰ",
          exponentiale: "ⅇ",
          ExponentialE: "ⅇ",
          fallingdotseq: "≒",
          Fcy: "Ф",
          fcy: "ф",
          female: "♀",
          ffilig: "ﬃ",
          fflig: "ﬀ",
          ffllig: "ﬄ",
          Ffr: "𝔉",
          ffr: "𝔣",
          filig: "ﬁ",
          FilledSmallSquare: "◼",
          FilledVerySmallSquare: "▪",
          fjlig: "fj",
          flat: "♭",
          fllig: "ﬂ",
          fltns: "▱",
          fnof: "ƒ",
          Fopf: "𝔽",
          fopf: "𝕗",
          forall: "∀",
          ForAll: "∀",
          fork: "⋔",
          forkv: "⫙",
          Fouriertrf: "ℱ",
          fpartint: "⨍",
          frac12: "½",
          frac13: "⅓",
          frac14: "¼",
          frac15: "⅕",
          frac16: "⅙",
          frac18: "⅛",
          frac23: "⅔",
          frac25: "⅖",
          frac34: "¾",
          frac35: "⅗",
          frac38: "⅜",
          frac45: "⅘",
          frac56: "⅚",
          frac58: "⅝",
          frac78: "⅞",
          frasl: "⁄",
          frown: "⌢",
          fscr: "𝒻",
          Fscr: "ℱ",
          gacute: "ǵ",
          Gamma: "Γ",
          gamma: "γ",
          Gammad: "Ϝ",
          gammad: "ϝ",
          gap: "⪆",
          Gbreve: "Ğ",
          gbreve: "ğ",
          Gcedil: "Ģ",
          Gcirc: "Ĝ",
          gcirc: "ĝ",
          Gcy: "Г",
          gcy: "г",
          Gdot: "Ġ",
          gdot: "ġ",
          ge: "≥",
          gE: "≧",
          gEl: "⪌",
          gel: "⋛",
          geq: "≥",
          geqq: "≧",
          geqslant: "⩾",
          gescc: "⪩",
          ges: "⩾",
          gesdot: "⪀",
          gesdoto: "⪂",
          gesdotol: "⪄",
          gesl: "⋛︀",
          gesles: "⪔",
          Gfr: "𝔊",
          gfr: "𝔤",
          gg: "≫",
          Gg: "⋙",
          ggg: "⋙",
          gimel: "ℷ",
          GJcy: "Ѓ",
          gjcy: "ѓ",
          gla: "⪥",
          gl: "≷",
          glE: "⪒",
          glj: "⪤",
          gnap: "⪊",
          gnapprox: "⪊",
          gne: "⪈",
          gnE: "≩",
          gneq: "⪈",
          gneqq: "≩",
          gnsim: "⋧",
          Gopf: "𝔾",
          gopf: "𝕘",
          grave: "`",
          GreaterEqual: "≥",
          GreaterEqualLess: "⋛",
          GreaterFullEqual: "≧",
          GreaterGreater: "⪢",
          GreaterLess: "≷",
          GreaterSlantEqual: "⩾",
          GreaterTilde: "≳",
          Gscr: "𝒢",
          gscr: "ℊ",
          gsim: "≳",
          gsime: "⪎",
          gsiml: "⪐",
          gtcc: "⪧",
          gtcir: "⩺",
          gt: ">",
          GT: ">",
          Gt: "≫",
          gtdot: "⋗",
          gtlPar: "⦕",
          gtquest: "⩼",
          gtrapprox: "⪆",
          gtrarr: "⥸",
          gtrdot: "⋗",
          gtreqless: "⋛",
          gtreqqless: "⪌",
          gtrless: "≷",
          gtrsim: "≳",
          gvertneqq: "≩︀",
          gvnE: "≩︀",
          Hacek: "ˇ",
          hairsp: " ",
          half: "½",
          hamilt: "ℋ",
          HARDcy: "Ъ",
          hardcy: "ъ",
          harrcir: "⥈",
          harr: "↔",
          hArr: "⇔",
          harrw: "↭",
          Hat: "^",
          hbar: "ℏ",
          Hcirc: "Ĥ",
          hcirc: "ĥ",
          hearts: "♥",
          heartsuit: "♥",
          hellip: "…",
          hercon: "⊹",
          hfr: "𝔥",
          Hfr: "ℌ",
          HilbertSpace: "ℋ",
          hksearow: "⤥",
          hkswarow: "⤦",
          hoarr: "⇿",
          homtht: "∻",
          hookleftarrow: "↩",
          hookrightarrow: "↪",
          hopf: "𝕙",
          Hopf: "ℍ",
          horbar: "―",
          HorizontalLine: "─",
          hscr: "𝒽",
          Hscr: "ℋ",
          hslash: "ℏ",
          Hstrok: "Ħ",
          hstrok: "ħ",
          HumpDownHump: "≎",
          HumpEqual: "≏",
          hybull: "⁃",
          hyphen: "‐",
          Iacute: "Í",
          iacute: "í",
          ic: "⁣",
          Icirc: "Î",
          icirc: "î",
          Icy: "И",
          icy: "и",
          Idot: "İ",
          IEcy: "Е",
          iecy: "е",
          iexcl: "¡",
          iff: "⇔",
          ifr: "𝔦",
          Ifr: "ℑ",
          Igrave: "Ì",
          igrave: "ì",
          ii: "ⅈ",
          iiiint: "⨌",
          iiint: "∭",
          iinfin: "⧜",
          iiota: "℩",
          IJlig: "Ĳ",
          ijlig: "ĳ",
          Imacr: "Ī",
          imacr: "ī",
          image: "ℑ",
          ImaginaryI: "ⅈ",
          imagline: "ℐ",
          imagpart: "ℑ",
          imath: "ı",
          Im: "ℑ",
          imof: "⊷",
          imped: "Ƶ",
          Implies: "⇒",
          incare: "℅",
          in: "∈",
          infin: "∞",
          infintie: "⧝",
          inodot: "ı",
          intcal: "⊺",
          int: "∫",
          Int: "∬",
          integers: "ℤ",
          Integral: "∫",
          intercal: "⊺",
          Intersection: "⋂",
          intlarhk: "⨗",
          intprod: "⨼",
          InvisibleComma: "⁣",
          InvisibleTimes: "⁢",
          IOcy: "Ё",
          iocy: "ё",
          Iogon: "Į",
          iogon: "į",
          Iopf: "𝕀",
          iopf: "𝕚",
          Iota: "Ι",
          iota: "ι",
          iprod: "⨼",
          iquest: "¿",
          iscr: "𝒾",
          Iscr: "ℐ",
          isin: "∈",
          isindot: "⋵",
          isinE: "⋹",
          isins: "⋴",
          isinsv: "⋳",
          isinv: "∈",
          it: "⁢",
          Itilde: "Ĩ",
          itilde: "ĩ",
          Iukcy: "І",
          iukcy: "і",
          Iuml: "Ï",
          iuml: "ï",
          Jcirc: "Ĵ",
          jcirc: "ĵ",
          Jcy: "Й",
          jcy: "й",
          Jfr: "𝔍",
          jfr: "𝔧",
          jmath: "ȷ",
          Jopf: "𝕁",
          jopf: "𝕛",
          Jscr: "𝒥",
          jscr: "𝒿",
          Jsercy: "Ј",
          jsercy: "ј",
          Jukcy: "Є",
          jukcy: "є",
          Kappa: "Κ",
          kappa: "κ",
          kappav: "ϰ",
          Kcedil: "Ķ",
          kcedil: "ķ",
          Kcy: "К",
          kcy: "к",
          Kfr: "𝔎",
          kfr: "𝔨",
          kgreen: "ĸ",
          KHcy: "Х",
          khcy: "х",
          KJcy: "Ќ",
          kjcy: "ќ",
          Kopf: "𝕂",
          kopf: "𝕜",
          Kscr: "𝒦",
          kscr: "𝓀",
          lAarr: "⇚",
          Lacute: "Ĺ",
          lacute: "ĺ",
          laemptyv: "⦴",
          lagran: "ℒ",
          Lambda: "Λ",
          lambda: "λ",
          lang: "⟨",
          Lang: "⟪",
          langd: "⦑",
          langle: "⟨",
          lap: "⪅",
          Laplacetrf: "ℒ",
          laquo: "«",
          larrb: "⇤",
          larrbfs: "⤟",
          larr: "←",
          Larr: "↞",
          lArr: "⇐",
          larrfs: "⤝",
          larrhk: "↩",
          larrlp: "↫",
          larrpl: "⤹",
          larrsim: "⥳",
          larrtl: "↢",
          latail: "⤙",
          lAtail: "⤛",
          lat: "⪫",
          late: "⪭",
          lates: "⪭︀",
          lbarr: "⤌",
          lBarr: "⤎",
          lbbrk: "❲",
          lbrace: "{",
          lbrack: "[",
          lbrke: "⦋",
          lbrksld: "⦏",
          lbrkslu: "⦍",
          Lcaron: "Ľ",
          lcaron: "ľ",
          Lcedil: "Ļ",
          lcedil: "ļ",
          lceil: "⌈",
          lcub: "{",
          Lcy: "Л",
          lcy: "л",
          ldca: "⤶",
          ldquo: "“",
          ldquor: "„",
          ldrdhar: "⥧",
          ldrushar: "⥋",
          ldsh: "↲",
          le: "≤",
          lE: "≦",
          LeftAngleBracket: "⟨",
          LeftArrowBar: "⇤",
          leftarrow: "←",
          LeftArrow: "←",
          Leftarrow: "⇐",
          LeftArrowRightArrow: "⇆",
          leftarrowtail: "↢",
          LeftCeiling: "⌈",
          LeftDoubleBracket: "⟦",
          LeftDownTeeVector: "⥡",
          LeftDownVectorBar: "⥙",
          LeftDownVector: "⇃",
          LeftFloor: "⌊",
          leftharpoondown: "↽",
          leftharpoonup: "↼",
          leftleftarrows: "⇇",
          leftrightarrow: "↔",
          LeftRightArrow: "↔",
          Leftrightarrow: "⇔",
          leftrightarrows: "⇆",
          leftrightharpoons: "⇋",
          leftrightsquigarrow: "↭",
          LeftRightVector: "⥎",
          LeftTeeArrow: "↤",
          LeftTee: "⊣",
          LeftTeeVector: "⥚",
          leftthreetimes: "⋋",
          LeftTriangleBar: "⧏",
          LeftTriangle: "⊲",
          LeftTriangleEqual: "⊴",
          LeftUpDownVector: "⥑",
          LeftUpTeeVector: "⥠",
          LeftUpVectorBar: "⥘",
          LeftUpVector: "↿",
          LeftVectorBar: "⥒",
          LeftVector: "↼",
          lEg: "⪋",
          leg: "⋚",
          leq: "≤",
          leqq: "≦",
          leqslant: "⩽",
          lescc: "⪨",
          les: "⩽",
          lesdot: "⩿",
          lesdoto: "⪁",
          lesdotor: "⪃",
          lesg: "⋚︀",
          lesges: "⪓",
          lessapprox: "⪅",
          lessdot: "⋖",
          lesseqgtr: "⋚",
          lesseqqgtr: "⪋",
          LessEqualGreater: "⋚",
          LessFullEqual: "≦",
          LessGreater: "≶",
          lessgtr: "≶",
          LessLess: "⪡",
          lesssim: "≲",
          LessSlantEqual: "⩽",
          LessTilde: "≲",
          lfisht: "⥼",
          lfloor: "⌊",
          Lfr: "𝔏",
          lfr: "𝔩",
          lg: "≶",
          lgE: "⪑",
          lHar: "⥢",
          lhard: "↽",
          lharu: "↼",
          lharul: "⥪",
          lhblk: "▄",
          LJcy: "Љ",
          ljcy: "љ",
          llarr: "⇇",
          ll: "≪",
          Ll: "⋘",
          llcorner: "⌞",
          Lleftarrow: "⇚",
          llhard: "⥫",
          lltri: "◺",
          Lmidot: "Ŀ",
          lmidot: "ŀ",
          lmoustache: "⎰",
          lmoust: "⎰",
          lnap: "⪉",
          lnapprox: "⪉",
          lne: "⪇",
          lnE: "≨",
          lneq: "⪇",
          lneqq: "≨",
          lnsim: "⋦",
          loang: "⟬",
          loarr: "⇽",
          lobrk: "⟦",
          longleftarrow: "⟵",
          LongLeftArrow: "⟵",
          Longleftarrow: "⟸",
          longleftrightarrow: "⟷",
          LongLeftRightArrow: "⟷",
          Longleftrightarrow: "⟺",
          longmapsto: "⟼",
          longrightarrow: "⟶",
          LongRightArrow: "⟶",
          Longrightarrow: "⟹",
          looparrowleft: "↫",
          looparrowright: "↬",
          lopar: "⦅",
          Lopf: "𝕃",
          lopf: "𝕝",
          loplus: "⨭",
          lotimes: "⨴",
          lowast: "∗",
          lowbar: "_",
          LowerLeftArrow: "↙",
          LowerRightArrow: "↘",
          loz: "◊",
          lozenge: "◊",
          lozf: "⧫",
          lpar: "(",
          lparlt: "⦓",
          lrarr: "⇆",
          lrcorner: "⌟",
          lrhar: "⇋",
          lrhard: "⥭",
          lrm: "‎",
          lrtri: "⊿",
          lsaquo: "‹",
          lscr: "𝓁",
          Lscr: "ℒ",
          lsh: "↰",
          Lsh: "↰",
          lsim: "≲",
          lsime: "⪍",
          lsimg: "⪏",
          lsqb: "[",
          lsquo: "‘",
          lsquor: "‚",
          Lstrok: "Ł",
          lstrok: "ł",
          ltcc: "⪦",
          ltcir: "⩹",
          lt: "<",
          LT: "<",
          Lt: "≪",
          ltdot: "⋖",
          lthree: "⋋",
          ltimes: "⋉",
          ltlarr: "⥶",
          ltquest: "⩻",
          ltri: "◃",
          ltrie: "⊴",
          ltrif: "◂",
          ltrPar: "⦖",
          lurdshar: "⥊",
          luruhar: "⥦",
          lvertneqq: "≨︀",
          lvnE: "≨︀",
          macr: "¯",
          male: "♂",
          malt: "✠",
          maltese: "✠",
          Map: "⤅",
          map: "↦",
          mapsto: "↦",
          mapstodown: "↧",
          mapstoleft: "↤",
          mapstoup: "↥",
          marker: "▮",
          mcomma: "⨩",
          Mcy: "М",
          mcy: "м",
          mdash: "—",
          mDDot: "∺",
          measuredangle: "∡",
          MediumSpace: " ",
          Mellintrf: "ℳ",
          Mfr: "𝔐",
          mfr: "𝔪",
          mho: "℧",
          micro: "µ",
          midast: "*",
          midcir: "⫰",
          mid: "∣",
          middot: "·",
          minusb: "⊟",
          minus: "−",
          minusd: "∸",
          minusdu: "⨪",
          MinusPlus: "∓",
          mlcp: "⫛",
          mldr: "…",
          mnplus: "∓",
          models: "⊧",
          Mopf: "𝕄",
          mopf: "𝕞",
          mp: "∓",
          mscr: "𝓂",
          Mscr: "ℳ",
          mstpos: "∾",
          Mu: "Μ",
          mu: "μ",
          multimap: "⊸",
          mumap: "⊸",
          nabla: "∇",
          Nacute: "Ń",
          nacute: "ń",
          nang: "∠⃒",
          nap: "≉",
          napE: "⩰̸",
          napid: "≋̸",
          napos: "ŉ",
          napprox: "≉",
          natural: "♮",
          naturals: "ℕ",
          natur: "♮",
          nbsp: " ",
          nbump: "≎̸",
          nbumpe: "≏̸",
          ncap: "⩃",
          Ncaron: "Ň",
          ncaron: "ň",
          Ncedil: "Ņ",
          ncedil: "ņ",
          ncong: "≇",
          ncongdot: "⩭̸",
          ncup: "⩂",
          Ncy: "Н",
          ncy: "н",
          ndash: "–",
          nearhk: "⤤",
          nearr: "↗",
          neArr: "⇗",
          nearrow: "↗",
          ne: "≠",
          nedot: "≐̸",
          NegativeMediumSpace: "​",
          NegativeThickSpace: "​",
          NegativeThinSpace: "​",
          NegativeVeryThinSpace: "​",
          nequiv: "≢",
          nesear: "⤨",
          nesim: "≂̸",
          NestedGreaterGreater: "≫",
          NestedLessLess: "≪",
          NewLine: "\n",
          nexist: "∄",
          nexists: "∄",
          Nfr: "𝔑",
          nfr: "𝔫",
          ngE: "≧̸",
          nge: "≱",
          ngeq: "≱",
          ngeqq: "≧̸",
          ngeqslant: "⩾̸",
          nges: "⩾̸",
          nGg: "⋙̸",
          ngsim: "≵",
          nGt: "≫⃒",
          ngt: "≯",
          ngtr: "≯",
          nGtv: "≫̸",
          nharr: "↮",
          nhArr: "⇎",
          nhpar: "⫲",
          ni: "∋",
          nis: "⋼",
          nisd: "⋺",
          niv: "∋",
          NJcy: "Њ",
          njcy: "њ",
          nlarr: "↚",
          nlArr: "⇍",
          nldr: "‥",
          nlE: "≦̸",
          nle: "≰",
          nleftarrow: "↚",
          nLeftarrow: "⇍",
          nleftrightarrow: "↮",
          nLeftrightarrow: "⇎",
          nleq: "≰",
          nleqq: "≦̸",
          nleqslant: "⩽̸",
          nles: "⩽̸",
          nless: "≮",
          nLl: "⋘̸",
          nlsim: "≴",
          nLt: "≪⃒",
          nlt: "≮",
          nltri: "⋪",
          nltrie: "⋬",
          nLtv: "≪̸",
          nmid: "∤",
          NoBreak: "⁠",
          NonBreakingSpace: " ",
          nopf: "𝕟",
          Nopf: "ℕ",
          Not: "⫬",
          not: "¬",
          NotCongruent: "≢",
          NotCupCap: "≭",
          NotDoubleVerticalBar: "∦",
          NotElement: "∉",
          NotEqual: "≠",
          NotEqualTilde: "≂̸",
          NotExists: "∄",
          NotGreater: "≯",
          NotGreaterEqual: "≱",
          NotGreaterFullEqual: "≧̸",
          NotGreaterGreater: "≫̸",
          NotGreaterLess: "≹",
          NotGreaterSlantEqual: "⩾̸",
          NotGreaterTilde: "≵",
          NotHumpDownHump: "≎̸",
          NotHumpEqual: "≏̸",
          notin: "∉",
          notindot: "⋵̸",
          notinE: "⋹̸",
          notinva: "∉",
          notinvb: "⋷",
          notinvc: "⋶",
          NotLeftTriangleBar: "⧏̸",
          NotLeftTriangle: "⋪",
          NotLeftTriangleEqual: "⋬",
          NotLess: "≮",
          NotLessEqual: "≰",
          NotLessGreater: "≸",
          NotLessLess: "≪̸",
          NotLessSlantEqual: "⩽̸",
          NotLessTilde: "≴",
          NotNestedGreaterGreater: "⪢̸",
          NotNestedLessLess: "⪡̸",
          notni: "∌",
          notniva: "∌",
          notnivb: "⋾",
          notnivc: "⋽",
          NotPrecedes: "⊀",
          NotPrecedesEqual: "⪯̸",
          NotPrecedesSlantEqual: "⋠",
          NotReverseElement: "∌",
          NotRightTriangleBar: "⧐̸",
          NotRightTriangle: "⋫",
          NotRightTriangleEqual: "⋭",
          NotSquareSubset: "⊏̸",
          NotSquareSubsetEqual: "⋢",
          NotSquareSuperset: "⊐̸",
          NotSquareSupersetEqual: "⋣",
          NotSubset: "⊂⃒",
          NotSubsetEqual: "⊈",
          NotSucceeds: "⊁",
          NotSucceedsEqual: "⪰̸",
          NotSucceedsSlantEqual: "⋡",
          NotSucceedsTilde: "≿̸",
          NotSuperset: "⊃⃒",
          NotSupersetEqual: "⊉",
          NotTilde: "≁",
          NotTildeEqual: "≄",
          NotTildeFullEqual: "≇",
          NotTildeTilde: "≉",
          NotVerticalBar: "∤",
          nparallel: "∦",
          npar: "∦",
          nparsl: "⫽⃥",
          npart: "∂̸",
          npolint: "⨔",
          npr: "⊀",
          nprcue: "⋠",
          nprec: "⊀",
          npreceq: "⪯̸",
          npre: "⪯̸",
          nrarrc: "⤳̸",
          nrarr: "↛",
          nrArr: "⇏",
          nrarrw: "↝̸",
          nrightarrow: "↛",
          nRightarrow: "⇏",
          nrtri: "⋫",
          nrtrie: "⋭",
          nsc: "⊁",
          nsccue: "⋡",
          nsce: "⪰̸",
          Nscr: "𝒩",
          nscr: "𝓃",
          nshortmid: "∤",
          nshortparallel: "∦",
          nsim: "≁",
          nsime: "≄",
          nsimeq: "≄",
          nsmid: "∤",
          nspar: "∦",
          nsqsube: "⋢",
          nsqsupe: "⋣",
          nsub: "⊄",
          nsubE: "⫅̸",
          nsube: "⊈",
          nsubset: "⊂⃒",
          nsubseteq: "⊈",
          nsubseteqq: "⫅̸",
          nsucc: "⊁",
          nsucceq: "⪰̸",
          nsup: "⊅",
          nsupE: "⫆̸",
          nsupe: "⊉",
          nsupset: "⊃⃒",
          nsupseteq: "⊉",
          nsupseteqq: "⫆̸",
          ntgl: "≹",
          Ntilde: "Ñ",
          ntilde: "ñ",
          ntlg: "≸",
          ntriangleleft: "⋪",
          ntrianglelefteq: "⋬",
          ntriangleright: "⋫",
          ntrianglerighteq: "⋭",
          Nu: "Ν",
          nu: "ν",
          num: "#",
          numero: "№",
          numsp: " ",
          nvap: "≍⃒",
          nvdash: "⊬",
          nvDash: "⊭",
          nVdash: "⊮",
          nVDash: "⊯",
          nvge: "≥⃒",
          nvgt: ">⃒",
          nvHarr: "⤄",
          nvinfin: "⧞",
          nvlArr: "⤂",
          nvle: "≤⃒",
          nvlt: "<⃒",
          nvltrie: "⊴⃒",
          nvrArr: "⤃",
          nvrtrie: "⊵⃒",
          nvsim: "∼⃒",
          nwarhk: "⤣",
          nwarr: "↖",
          nwArr: "⇖",
          nwarrow: "↖",
          nwnear: "⤧",
          Oacute: "Ó",
          oacute: "ó",
          oast: "⊛",
          Ocirc: "Ô",
          ocirc: "ô",
          ocir: "⊚",
          Ocy: "О",
          ocy: "о",
          odash: "⊝",
          Odblac: "Ő",
          odblac: "ő",
          odiv: "⨸",
          odot: "⊙",
          odsold: "⦼",
          OElig: "Œ",
          oelig: "œ",
          ofcir: "⦿",
          Ofr: "𝔒",
          ofr: "𝔬",
          ogon: "˛",
          Ograve: "Ò",
          ograve: "ò",
          ogt: "⧁",
          ohbar: "⦵",
          ohm: "Ω",
          oint: "∮",
          olarr: "↺",
          olcir: "⦾",
          olcross: "⦻",
          oline: "‾",
          olt: "⧀",
          Omacr: "Ō",
          omacr: "ō",
          Omega: "Ω",
          omega: "ω",
          Omicron: "Ο",
          omicron: "ο",
          omid: "⦶",
          ominus: "⊖",
          Oopf: "𝕆",
          oopf: "𝕠",
          opar: "⦷",
          OpenCurlyDoubleQuote: "“",
          OpenCurlyQuote: "‘",
          operp: "⦹",
          oplus: "⊕",
          orarr: "↻",
          Or: "⩔",
          or: "∨",
          ord: "⩝",
          order: "ℴ",
          orderof: "ℴ",
          ordf: "ª",
          ordm: "º",
          origof: "⊶",
          oror: "⩖",
          orslope: "⩗",
          orv: "⩛",
          oS: "Ⓢ",
          Oscr: "𝒪",
          oscr: "ℴ",
          Oslash: "Ø",
          oslash: "ø",
          osol: "⊘",
          Otilde: "Õ",
          otilde: "õ",
          otimesas: "⨶",
          Otimes: "⨷",
          otimes: "⊗",
          Ouml: "Ö",
          ouml: "ö",
          ovbar: "⌽",
          OverBar: "‾",
          OverBrace: "⏞",
          OverBracket: "⎴",
          OverParenthesis: "⏜",
          para: "¶",
          parallel: "∥",
          par: "∥",
          parsim: "⫳",
          parsl: "⫽",
          part: "∂",
          PartialD: "∂",
          Pcy: "П",
          pcy: "п",
          percnt: "%",
          period: ".",
          permil: "‰",
          perp: "⊥",
          pertenk: "‱",
          Pfr: "𝔓",
          pfr: "𝔭",
          Phi: "Φ",
          phi: "φ",
          phiv: "ϕ",
          phmmat: "ℳ",
          phone: "☎",
          Pi: "Π",
          pi: "π",
          pitchfork: "⋔",
          piv: "ϖ",
          planck: "ℏ",
          planckh: "ℎ",
          plankv: "ℏ",
          plusacir: "⨣",
          plusb: "⊞",
          pluscir: "⨢",
          plus: "+",
          plusdo: "∔",
          plusdu: "⨥",
          pluse: "⩲",
          PlusMinus: "±",
          plusmn: "±",
          plussim: "⨦",
          plustwo: "⨧",
          pm: "±",
          Poincareplane: "ℌ",
          pointint: "⨕",
          popf: "𝕡",
          Popf: "ℙ",
          pound: "£",
          prap: "⪷",
          Pr: "⪻",
          pr: "≺",
          prcue: "≼",
          precapprox: "⪷",
          prec: "≺",
          preccurlyeq: "≼",
          Precedes: "≺",
          PrecedesEqual: "⪯",
          PrecedesSlantEqual: "≼",
          PrecedesTilde: "≾",
          preceq: "⪯",
          precnapprox: "⪹",
          precneqq: "⪵",
          precnsim: "⋨",
          pre: "⪯",
          prE: "⪳",
          precsim: "≾",
          prime: "′",
          Prime: "″",
          primes: "ℙ",
          prnap: "⪹",
          prnE: "⪵",
          prnsim: "⋨",
          prod: "∏",
          Product: "∏",
          profalar: "⌮",
          profline: "⌒",
          profsurf: "⌓",
          prop: "∝",
          Proportional: "∝",
          Proportion: "∷",
          propto: "∝",
          prsim: "≾",
          prurel: "⊰",
          Pscr: "𝒫",
          pscr: "𝓅",
          Psi: "Ψ",
          psi: "ψ",
          puncsp: " ",
          Qfr: "𝔔",
          qfr: "𝔮",
          qint: "⨌",
          qopf: "𝕢",
          Qopf: "ℚ",
          qprime: "⁗",
          Qscr: "𝒬",
          qscr: "𝓆",
          quaternions: "ℍ",
          quatint: "⨖",
          quest: "?",
          questeq: "≟",
          quot: '"',
          QUOT: '"',
          rAarr: "⇛",
          race: "∽̱",
          Racute: "Ŕ",
          racute: "ŕ",
          radic: "√",
          raemptyv: "⦳",
          rang: "⟩",
          Rang: "⟫",
          rangd: "⦒",
          range: "⦥",
          rangle: "⟩",
          raquo: "»",
          rarrap: "⥵",
          rarrb: "⇥",
          rarrbfs: "⤠",
          rarrc: "⤳",
          rarr: "→",
          Rarr: "↠",
          rArr: "⇒",
          rarrfs: "⤞",
          rarrhk: "↪",
          rarrlp: "↬",
          rarrpl: "⥅",
          rarrsim: "⥴",
          Rarrtl: "⤖",
          rarrtl: "↣",
          rarrw: "↝",
          ratail: "⤚",
          rAtail: "⤜",
          ratio: "∶",
          rationals: "ℚ",
          rbarr: "⤍",
          rBarr: "⤏",
          RBarr: "⤐",
          rbbrk: "❳",
          rbrace: "}",
          rbrack: "]",
          rbrke: "⦌",
          rbrksld: "⦎",
          rbrkslu: "⦐",
          Rcaron: "Ř",
          rcaron: "ř",
          Rcedil: "Ŗ",
          rcedil: "ŗ",
          rceil: "⌉",
          rcub: "}",
          Rcy: "Р",
          rcy: "р",
          rdca: "⤷",
          rdldhar: "⥩",
          rdquo: "”",
          rdquor: "”",
          rdsh: "↳",
          real: "ℜ",
          realine: "ℛ",
          realpart: "ℜ",
          reals: "ℝ",
          Re: "ℜ",
          rect: "▭",
          reg: "®",
          REG: "®",
          ReverseElement: "∋",
          ReverseEquilibrium: "⇋",
          ReverseUpEquilibrium: "⥯",
          rfisht: "⥽",
          rfloor: "⌋",
          rfr: "𝔯",
          Rfr: "ℜ",
          rHar: "⥤",
          rhard: "⇁",
          rharu: "⇀",
          rharul: "⥬",
          Rho: "Ρ",
          rho: "ρ",
          rhov: "ϱ",
          RightAngleBracket: "⟩",
          RightArrowBar: "⇥",
          rightarrow: "→",
          RightArrow: "→",
          Rightarrow: "⇒",
          RightArrowLeftArrow: "⇄",
          rightarrowtail: "↣",
          RightCeiling: "⌉",
          RightDoubleBracket: "⟧",
          RightDownTeeVector: "⥝",
          RightDownVectorBar: "⥕",
          RightDownVector: "⇂",
          RightFloor: "⌋",
          rightharpoondown: "⇁",
          rightharpoonup: "⇀",
          rightleftarrows: "⇄",
          rightleftharpoons: "⇌",
          rightrightarrows: "⇉",
          rightsquigarrow: "↝",
          RightTeeArrow: "↦",
          RightTee: "⊢",
          RightTeeVector: "⥛",
          rightthreetimes: "⋌",
          RightTriangleBar: "⧐",
          RightTriangle: "⊳",
          RightTriangleEqual: "⊵",
          RightUpDownVector: "⥏",
          RightUpTeeVector: "⥜",
          RightUpVectorBar: "⥔",
          RightUpVector: "↾",
          RightVectorBar: "⥓",
          RightVector: "⇀",
          ring: "˚",
          risingdotseq: "≓",
          rlarr: "⇄",
          rlhar: "⇌",
          rlm: "‏",
          rmoustache: "⎱",
          rmoust: "⎱",
          rnmid: "⫮",
          roang: "⟭",
          roarr: "⇾",
          robrk: "⟧",
          ropar: "⦆",
          ropf: "𝕣",
          Ropf: "ℝ",
          roplus: "⨮",
          rotimes: "⨵",
          RoundImplies: "⥰",
          rpar: ")",
          rpargt: "⦔",
          rppolint: "⨒",
          rrarr: "⇉",
          Rrightarrow: "⇛",
          rsaquo: "›",
          rscr: "𝓇",
          Rscr: "ℛ",
          rsh: "↱",
          Rsh: "↱",
          rsqb: "]",
          rsquo: "’",
          rsquor: "’",
          rthree: "⋌",
          rtimes: "⋊",
          rtri: "▹",
          rtrie: "⊵",
          rtrif: "▸",
          rtriltri: "⧎",
          RuleDelayed: "⧴",
          ruluhar: "⥨",
          rx: "℞",
          Sacute: "Ś",
          sacute: "ś",
          sbquo: "‚",
          scap: "⪸",
          Scaron: "Š",
          scaron: "š",
          Sc: "⪼",
          sc: "≻",
          sccue: "≽",
          sce: "⪰",
          scE: "⪴",
          Scedil: "Ş",
          scedil: "ş",
          Scirc: "Ŝ",
          scirc: "ŝ",
          scnap: "⪺",
          scnE: "⪶",
          scnsim: "⋩",
          scpolint: "⨓",
          scsim: "≿",
          Scy: "С",
          scy: "с",
          sdotb: "⊡",
          sdot: "⋅",
          sdote: "⩦",
          searhk: "⤥",
          searr: "↘",
          seArr: "⇘",
          searrow: "↘",
          sect: "§",
          semi: ";",
          seswar: "⤩",
          setminus: "∖",
          setmn: "∖",
          sext: "✶",
          Sfr: "𝔖",
          sfr: "𝔰",
          sfrown: "⌢",
          sharp: "♯",
          SHCHcy: "Щ",
          shchcy: "щ",
          SHcy: "Ш",
          shcy: "ш",
          ShortDownArrow: "↓",
          ShortLeftArrow: "←",
          shortmid: "∣",
          shortparallel: "∥",
          ShortRightArrow: "→",
          ShortUpArrow: "↑",
          shy: "­",
          Sigma: "Σ",
          sigma: "σ",
          sigmaf: "ς",
          sigmav: "ς",
          sim: "∼",
          simdot: "⩪",
          sime: "≃",
          simeq: "≃",
          simg: "⪞",
          simgE: "⪠",
          siml: "⪝",
          simlE: "⪟",
          simne: "≆",
          simplus: "⨤",
          simrarr: "⥲",
          slarr: "←",
          SmallCircle: "∘",
          smallsetminus: "∖",
          smashp: "⨳",
          smeparsl: "⧤",
          smid: "∣",
          smile: "⌣",
          smt: "⪪",
          smte: "⪬",
          smtes: "⪬︀",
          SOFTcy: "Ь",
          softcy: "ь",
          solbar: "⌿",
          solb: "⧄",
          sol: "/",
          Sopf: "𝕊",
          sopf: "𝕤",
          spades: "♠",
          spadesuit: "♠",
          spar: "∥",
          sqcap: "⊓",
          sqcaps: "⊓︀",
          sqcup: "⊔",
          sqcups: "⊔︀",
          Sqrt: "√",
          sqsub: "⊏",
          sqsube: "⊑",
          sqsubset: "⊏",
          sqsubseteq: "⊑",
          sqsup: "⊐",
          sqsupe: "⊒",
          sqsupset: "⊐",
          sqsupseteq: "⊒",
          square: "□",
          Square: "□",
          SquareIntersection: "⊓",
          SquareSubset: "⊏",
          SquareSubsetEqual: "⊑",
          SquareSuperset: "⊐",
          SquareSupersetEqual: "⊒",
          SquareUnion: "⊔",
          squarf: "▪",
          squ: "□",
          squf: "▪",
          srarr: "→",
          Sscr: "𝒮",
          sscr: "𝓈",
          ssetmn: "∖",
          ssmile: "⌣",
          sstarf: "⋆",
          Star: "⋆",
          star: "☆",
          starf: "★",
          straightepsilon: "ϵ",
          straightphi: "ϕ",
          strns: "¯",
          sub: "⊂",
          Sub: "⋐",
          subdot: "⪽",
          subE: "⫅",
          sube: "⊆",
          subedot: "⫃",
          submult: "⫁",
          subnE: "⫋",
          subne: "⊊",
          subplus: "⪿",
          subrarr: "⥹",
          subset: "⊂",
          Subset: "⋐",
          subseteq: "⊆",
          subseteqq: "⫅",
          SubsetEqual: "⊆",
          subsetneq: "⊊",
          subsetneqq: "⫋",
          subsim: "⫇",
          subsub: "⫕",
          subsup: "⫓",
          succapprox: "⪸",
          succ: "≻",
          succcurlyeq: "≽",
          Succeeds: "≻",
          SucceedsEqual: "⪰",
          SucceedsSlantEqual: "≽",
          SucceedsTilde: "≿",
          succeq: "⪰",
          succnapprox: "⪺",
          succneqq: "⪶",
          succnsim: "⋩",
          succsim: "≿",
          SuchThat: "∋",
          sum: "∑",
          Sum: "∑",
          sung: "♪",
          sup1: "¹",
          sup2: "²",
          sup3: "³",
          sup: "⊃",
          Sup: "⋑",
          supdot: "⪾",
          supdsub: "⫘",
          supE: "⫆",
          supe: "⊇",
          supedot: "⫄",
          Superset: "⊃",
          SupersetEqual: "⊇",
          suphsol: "⟉",
          suphsub: "⫗",
          suplarr: "⥻",
          supmult: "⫂",
          supnE: "⫌",
          supne: "⊋",
          supplus: "⫀",
          supset: "⊃",
          Supset: "⋑",
          supseteq: "⊇",
          supseteqq: "⫆",
          supsetneq: "⊋",
          supsetneqq: "⫌",
          supsim: "⫈",
          supsub: "⫔",
          supsup: "⫖",
          swarhk: "⤦",
          swarr: "↙",
          swArr: "⇙",
          swarrow: "↙",
          swnwar: "⤪",
          szlig: "ß",
          Tab: "\t",
          target: "⌖",
          Tau: "Τ",
          tau: "τ",
          tbrk: "⎴",
          Tcaron: "Ť",
          tcaron: "ť",
          Tcedil: "Ţ",
          tcedil: "ţ",
          Tcy: "Т",
          tcy: "т",
          tdot: "⃛",
          telrec: "⌕",
          Tfr: "𝔗",
          tfr: "𝔱",
          there4: "∴",
          therefore: "∴",
          Therefore: "∴",
          Theta: "Θ",
          theta: "θ",
          thetasym: "ϑ",
          thetav: "ϑ",
          thickapprox: "≈",
          thicksim: "∼",
          ThickSpace: "  ",
          ThinSpace: " ",
          thinsp: " ",
          thkap: "≈",
          thksim: "∼",
          THORN: "Þ",
          thorn: "þ",
          tilde: "˜",
          Tilde: "∼",
          TildeEqual: "≃",
          TildeFullEqual: "≅",
          TildeTilde: "≈",
          timesbar: "⨱",
          timesb: "⊠",
          times: "×",
          timesd: "⨰",
          tint: "∭",
          toea: "⤨",
          topbot: "⌶",
          topcir: "⫱",
          top: "⊤",
          Topf: "𝕋",
          topf: "𝕥",
          topfork: "⫚",
          tosa: "⤩",
          tprime: "‴",
          trade: "™",
          TRADE: "™",
          triangle: "▵",
          triangledown: "▿",
          triangleleft: "◃",
          trianglelefteq: "⊴",
          triangleq: "≜",
          triangleright: "▹",
          trianglerighteq: "⊵",
          tridot: "◬",
          trie: "≜",
          triminus: "⨺",
          TripleDot: "⃛",
          triplus: "⨹",
          trisb: "⧍",
          tritime: "⨻",
          trpezium: "⏢",
          Tscr: "𝒯",
          tscr: "𝓉",
          TScy: "Ц",
          tscy: "ц",
          TSHcy: "Ћ",
          tshcy: "ћ",
          Tstrok: "Ŧ",
          tstrok: "ŧ",
          twixt: "≬",
          twoheadleftarrow: "↞",
          twoheadrightarrow: "↠",
          Uacute: "Ú",
          uacute: "ú",
          uarr: "↑",
          Uarr: "↟",
          uArr: "⇑",
          Uarrocir: "⥉",
          Ubrcy: "Ў",
          ubrcy: "ў",
          Ubreve: "Ŭ",
          ubreve: "ŭ",
          Ucirc: "Û",
          ucirc: "û",
          Ucy: "У",
          ucy: "у",
          udarr: "⇅",
          Udblac: "Ű",
          udblac: "ű",
          udhar: "⥮",
          ufisht: "⥾",
          Ufr: "𝔘",
          ufr: "𝔲",
          Ugrave: "Ù",
          ugrave: "ù",
          uHar: "⥣",
          uharl: "↿",
          uharr: "↾",
          uhblk: "▀",
          ulcorn: "⌜",
          ulcorner: "⌜",
          ulcrop: "⌏",
          ultri: "◸",
          Umacr: "Ū",
          umacr: "ū",
          uml: "¨",
          UnderBar: "_",
          UnderBrace: "⏟",
          UnderBracket: "⎵",
          UnderParenthesis: "⏝",
          Union: "⋃",
          UnionPlus: "⊎",
          Uogon: "Ų",
          uogon: "ų",
          Uopf: "𝕌",
          uopf: "𝕦",
          UpArrowBar: "⤒",
          uparrow: "↑",
          UpArrow: "↑",
          Uparrow: "⇑",
          UpArrowDownArrow: "⇅",
          updownarrow: "↕",
          UpDownArrow: "↕",
          Updownarrow: "⇕",
          UpEquilibrium: "⥮",
          upharpoonleft: "↿",
          upharpoonright: "↾",
          uplus: "⊎",
          UpperLeftArrow: "↖",
          UpperRightArrow: "↗",
          upsi: "υ",
          Upsi: "ϒ",
          upsih: "ϒ",
          Upsilon: "Υ",
          upsilon: "υ",
          UpTeeArrow: "↥",
          UpTee: "⊥",
          upuparrows: "⇈",
          urcorn: "⌝",
          urcorner: "⌝",
          urcrop: "⌎",
          Uring: "Ů",
          uring: "ů",
          urtri: "◹",
          Uscr: "𝒰",
          uscr: "𝓊",
          utdot: "⋰",
          Utilde: "Ũ",
          utilde: "ũ",
          utri: "▵",
          utrif: "▴",
          uuarr: "⇈",
          Uuml: "Ü",
          uuml: "ü",
          uwangle: "⦧",
          vangrt: "⦜",
          varepsilon: "ϵ",
          varkappa: "ϰ",
          varnothing: "∅",
          varphi: "ϕ",
          varpi: "ϖ",
          varpropto: "∝",
          varr: "↕",
          vArr: "⇕",
          varrho: "ϱ",
          varsigma: "ς",
          varsubsetneq: "⊊︀",
          varsubsetneqq: "⫋︀",
          varsupsetneq: "⊋︀",
          varsupsetneqq: "⫌︀",
          vartheta: "ϑ",
          vartriangleleft: "⊲",
          vartriangleright: "⊳",
          vBar: "⫨",
          Vbar: "⫫",
          vBarv: "⫩",
          Vcy: "В",
          vcy: "в",
          vdash: "⊢",
          vDash: "⊨",
          Vdash: "⊩",
          VDash: "⊫",
          Vdashl: "⫦",
          veebar: "⊻",
          vee: "∨",
          Vee: "⋁",
          veeeq: "≚",
          vellip: "⋮",
          verbar: "|",
          Verbar: "‖",
          vert: "|",
          Vert: "‖",
          VerticalBar: "∣",
          VerticalLine: "|",
          VerticalSeparator: "❘",
          VerticalTilde: "≀",
          VeryThinSpace: " ",
          Vfr: "𝔙",
          vfr: "𝔳",
          vltri: "⊲",
          vnsub: "⊂⃒",
          vnsup: "⊃⃒",
          Vopf: "𝕍",
          vopf: "𝕧",
          vprop: "∝",
          vrtri: "⊳",
          Vscr: "𝒱",
          vscr: "𝓋",
          vsubnE: "⫋︀",
          vsubne: "⊊︀",
          vsupnE: "⫌︀",
          vsupne: "⊋︀",
          Vvdash: "⊪",
          vzigzag: "⦚",
          Wcirc: "Ŵ",
          wcirc: "ŵ",
          wedbar: "⩟",
          wedge: "∧",
          Wedge: "⋀",
          wedgeq: "≙",
          weierp: "℘",
          Wfr: "𝔚",
          wfr: "𝔴",
          Wopf: "𝕎",
          wopf: "𝕨",
          wp: "℘",
          wr: "≀",
          wreath: "≀",
          Wscr: "𝒲",
          wscr: "𝓌",
          xcap: "⋂",
          xcirc: "◯",
          xcup: "⋃",
          xdtri: "▽",
          Xfr: "𝔛",
          xfr: "𝔵",
          xharr: "⟷",
          xhArr: "⟺",
          Xi: "Ξ",
          xi: "ξ",
          xlarr: "⟵",
          xlArr: "⟸",
          xmap: "⟼",
          xnis: "⋻",
          xodot: "⨀",
          Xopf: "𝕏",
          xopf: "𝕩",
          xoplus: "⨁",
          xotime: "⨂",
          xrarr: "⟶",
          xrArr: "⟹",
          Xscr: "𝒳",
          xscr: "𝓍",
          xsqcup: "⨆",
          xuplus: "⨄",
          xutri: "△",
          xvee: "⋁",
          xwedge: "⋀",
          Yacute: "Ý",
          yacute: "ý",
          YAcy: "Я",
          yacy: "я",
          Ycirc: "Ŷ",
          ycirc: "ŷ",
          Ycy: "Ы",
          ycy: "ы",
          yen: "¥",
          Yfr: "𝔜",
          yfr: "𝔶",
          YIcy: "Ї",
          yicy: "ї",
          Yopf: "𝕐",
          yopf: "𝕪",
          Yscr: "𝒴",
          yscr: "𝓎",
          YUcy: "Ю",
          yucy: "ю",
          yuml: "ÿ",
          Yuml: "Ÿ",
          Zacute: "Ź",
          zacute: "ź",
          Zcaron: "Ž",
          zcaron: "ž",
          Zcy: "З",
          zcy: "з",
          Zdot: "Ż",
          zdot: "ż",
          zeetrf: "ℨ",
          ZeroWidthSpace: "​",
          Zeta: "Ζ",
          zeta: "ζ",
          zfr: "𝔷",
          Zfr: "ℨ",
          ZHcy: "Ж",
          zhcy: "ж",
          zigrarr: "⇝",
          zopf: "𝕫",
          Zopf: "ℤ",
          Zscr: "𝒵",
          zscr: "𝓏",
          zwj: "‍",
          zwnj: "‌"
        }
      }, {}],
      54: [function (t, e, n) {
        "use strict";

        function i(t) {
          var e = Array.prototype.slice.call(arguments, 1);
          return e.forEach(function (e) {
            e && Object.keys(e).forEach(function (n) {
              t[n] = e[n]
            })
          }), t
        }

        function o(t) {
          return Object.prototype.toString.call(t)
        }

        function r(t) {
          return "[object String]" === o(t)
        }

        function s(t) {
          return "[object Object]" === o(t)
        }

        function a(t) {
          return "[object RegExp]" === o(t)
        }

        function l(t) {
          return "[object Function]" === o(t)
        }

        function u(t) {
          return t.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
        }

        function c(t) {
          return Object.keys(t || {}).reduce(function (t, e) {
            return t || v.hasOwnProperty(e)
          }, !1)
        }

        function h(t) {
          t.__index__ = -1, t.__text_cache__ = ""
        }

        function p(t) {
          return function (e, n) {
            var i = e.slice(n);
            return t.test(i) ? i.match(t)[0].length : 0
          }
        }

        function f() {
          return function (t, e) {
            e.normalize(t)
          }
        }

        function d(e) {
          function n(t) {
            return t.replace("%TLDS%", o.src_tlds)
          }

          function i(t, e) {
            throw new Error('(LinkifyIt) Invalid schema "' + t + '": ' + e)
          }
          var o = e.re = t("./lib/re")(e.__opts__),
            c = e.__tlds__.slice();
          e.onCompile(), e.__tlds_replaced__ || c.push(b), c.push(o.src_xn), o.src_tlds = c.join("|"), o.email_fuzzy = RegExp(n(o.tpl_email_fuzzy), "i"), o.link_fuzzy = RegExp(n(o.tpl_link_fuzzy), "i"), o.link_no_ip_fuzzy = RegExp(n(o.tpl_link_no_ip_fuzzy), "i"), o.host_fuzzy_test = RegExp(n(o.tpl_host_fuzzy_test), "i");
          var d = [];
          e.__compiled__ = {}, Object.keys(e.__schemas__).forEach(function (t) {
            var n = e.__schemas__[t];
            if (null !== n) {
              var o = {
                validate: null,
                link: null
              };
              return e.__compiled__[t] = o, s(n) ? (a(n.validate) ? o.validate = p(n.validate) : l(n.validate) ? o.validate = n.validate : i(t, n), void(l(n.normalize) ? o.normalize = n.normalize : n.normalize ? i(t, n) : o.normalize = f())) : r(n) ? void d.push(t) : void i(t, n)
            }
          }), d.forEach(function (t) {
            e.__compiled__[e.__schemas__[t]] && (e.__compiled__[t].validate = e.__compiled__[e.__schemas__[t]].validate, e.__compiled__[t].normalize = e.__compiled__[e.__schemas__[t]].normalize)
          }), e.__compiled__[""] = {
            validate: null,
            normalize: f()
          };
          var m = Object.keys(e.__compiled__).filter(function (t) {
            return t.length > 0 && e.__compiled__[t]
          }).map(u).join("|");
          e.re.schema_test = RegExp("(^|(?!_)(?:[><]|" + o.src_ZPCc + "))(" + m + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><]|" + o.src_ZPCc + "))(" + m + ")", "ig"), e.re.pretest = RegExp("(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@", "i"), h(e)
        }

        function m(t, e) {
          var n = t.__index__,
            i = t.__last_index__,
            o = t.__text_cache__.slice(n, i);
          this.schema = t.__schema__.toLowerCase(), this.index = n + e, this.lastIndex = i + e, this.raw = o, this.text = o, this.url = o
        }

        function g(t, e) {
          var n = new m(t, e);
          return t.__compiled__[n.schema].normalize(n, t), n
        }

        function _(t, e) {
          return this instanceof _ ? (e || c(t) && (e = t, t = {}), this.__opts__ = i({}, v, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = i({}, y, t), this.__compiled__ = {}, this.__tlds__ = w, this.__tlds_replaced__ = !1, this.re = {}, void d(this)) : new _(t, e)
        }
        var v = {
            fuzzyLink: !0,
            fuzzyEmail: !0,
            fuzzyIP: !1
          },
          y = {
            "http:": {
              validate: function (t, e, n) {
                var i = t.slice(e);
                return n.re.http || (n.re.http = new RegExp("^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path, "i")), n.re.http.test(i) ? i.match(n.re.http)[0].length : 0
              }
            },
            "https:": "http:",
            "ftp:": "http:",
            "//": {
              validate: function (t, e, n) {
                var i = t.slice(e);
                return n.re.no_http || (n.re.no_http = new RegExp("^" + n.re.src_auth + "(?:localhost|(?:(?:" + n.re.src_domain + ")\\.)+" + n.re.src_domain_root + ")" + n.re.src_port + n.re.src_host_terminator + n.re.src_path, "i")), n.re.no_http.test(i) ? e >= 3 && ":" === t[e - 3] ? 0 : e >= 3 && "/" === t[e - 3] ? 0 : i.match(n.re.no_http)[0].length : 0
              }
            },
            "mailto:": {
              validate: function (t, e, n) {
                var i = t.slice(e);
                return n.re.mailto || (n.re.mailto = new RegExp("^" + n.re.src_email_name + "@" + n.re.src_host_strict, "i")), n.re.mailto.test(i) ? i.match(n.re.mailto)[0].length : 0
              }
            }
          },
          b = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
          w = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
        _.prototype.add = function (t, e) {
          return this.__schemas__[t] = e, d(this), this
        }, _.prototype.set = function (t) {
          return this.__opts__ = i(this.__opts__, t), this
        }, _.prototype.test = function (t) {
          if (this.__text_cache__ = t, this.__index__ = -1, !t.length) return !1;
          var e, n, i, o, r, s, a, l, u;
          if (this.re.schema_test.test(t))
            for (a = this.re.schema_search, a.lastIndex = 0; null !== (e = a.exec(t));)
              if (o = this.testSchemaAt(t, e[2], a.lastIndex)) {
                this.__schema__ = e[2], this.__index__ = e.index + e[1].length, this.__last_index__ = e.index + e[0].length + o;
                break
              } return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (l = t.search(this.re.host_fuzzy_test), l >= 0 && (this.__index__ < 0 || l < this.__index__) && null !== (n = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) && (r = n.index + n[1].length, (this.__index__ < 0 || r < this.__index__) && (this.__schema__ = "", this.__index__ = r, this.__last_index__ = n.index + n[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (u = t.indexOf("@"), u >= 0 && null !== (i = t.match(this.re.email_fuzzy)) && (r = i.index + i[1].length, s = i.index + i[0].length, (this.__index__ < 0 || r < this.__index__ || r === this.__index__ && s > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = r, this.__last_index__ = s))), this.__index__ >= 0
        }, _.prototype.pretest = function (t) {
          return this.re.pretest.test(t)
        }, _.prototype.testSchemaAt = function (t, e, n) {
          return this.__compiled__[e.toLowerCase()] ? this.__compiled__[e.toLowerCase()].validate(t, n, this) : 0
        }, _.prototype.match = function (t) {
          var e = 0,
            n = [];
          this.__index__ >= 0 && this.__text_cache__ === t && (n.push(g(this, e)), e = this.__last_index__);
          for (var i = e ? t.slice(e) : t; this.test(i);) n.push(g(this, e)), i = i.slice(this.__last_index__), e += this.__last_index__;
          return n.length ? n : null
        }, _.prototype.tlds = function (t, e) {
          return t = Array.isArray(t) ? t : [t], e ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function (t, e, n) {
            return t !== n[e - 1]
          }).reverse(), d(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, d(this), this)
        }, _.prototype.normalize = function (t) {
          t.schema || (t.url = "http://" + t.url), "mailto:" !== t.schema || /^mailto:/i.test(t.url) || (t.url = "mailto:" + t.url)
        }, _.prototype.onCompile = function () {}, e.exports = _
      }, {
        "./lib/re": 55
      }],
      55: [function (t, e, n) {
        "use strict";
        e.exports = function (e) {
          var n = {};
          return n.src_Any = t("uc.micro/properties/Any/regex").source, n.src_Cc = t("uc.micro/categories/Cc/regex").source, n.src_Z = t("uc.micro/categories/Z/regex").source, n.src_P = t("uc.micro/categories/P/regex").source, n.src_ZPCc = [n.src_Z, n.src_P, n.src_Cc].join("|"), n.src_ZCc = [n.src_Z, n.src_Cc].join("|"), n.src_pseudo_letter = "(?:(?!>|<|" + n.src_ZPCc + ")" + n.src_Any + ")", n.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", n.src_auth = "(?:(?:(?!" + n.src_ZCc + "|[@/]).)+@)?", n.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", n.src_host_terminator = "(?=$|>|<|" + n.src_ZPCc + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + n.src_ZPCc + "))", n.src_path = "(?:[/?#](?:(?!" + n.src_ZCc + "|[()[\\]{}.,\"'?!\\-<>]).|\\[(?:(?!" + n.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + n.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + n.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + n.src_ZCc + '|["]).)+\\"|\\\'(?:(?!' + n.src_ZCc + "|[']).)+\\'|\\'(?=" + n.src_pseudo_letter + "|[-]).|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + n.src_ZCc + "|[.]).|" + (e && e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + "\\,(?!" + n.src_ZCc + ").|\\!(?!" + n.src_ZCc + "|[!]).|\\?(?!" + n.src_ZCc + "|[?]).)+|\\/)?", n.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', n.src_xn = "xn--[a-z0-9\\-]{1,59}", n.src_domain_root = "(?:" + n.src_xn + "|" + n.src_pseudo_letter + "{1,63})", n.src_domain = "(?:" + n.src_xn + "|(?:" + n.src_pseudo_letter + ")|(?:" + n.src_pseudo_letter + "(?:-(?!-)|" + n.src_pseudo_letter + "){0,61}" + n.src_pseudo_letter + "))", n.src_host = "(?:(?:(?:(?:" + n.src_domain + ")\\.)*" + n.src_domain_root + "))", n.tpl_host_fuzzy = "(?:" + n.src_ip4 + "|(?:(?:(?:" + n.src_domain + ")\\.)+(?:%TLDS%)))", n.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + n.src_domain + ")\\.)+(?:%TLDS%))", n.src_host_strict = n.src_host + n.src_host_terminator, n.tpl_host_fuzzy_strict = n.tpl_host_fuzzy + n.src_host_terminator, n.src_host_port_strict = n.src_host + n.src_port + n.src_host_terminator, n.tpl_host_port_fuzzy_strict = n.tpl_host_fuzzy + n.src_port + n.src_host_terminator, n.tpl_host_port_no_ip_fuzzy_strict = n.tpl_host_no_ip_fuzzy + n.src_port + n.src_host_terminator, n.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + n.src_ZPCc + "|>|$))", n.tpl_email_fuzzy = "(^|<|>|\\(|" + n.src_ZCc + ")(" + n.src_email_name + "@" + n.tpl_host_fuzzy_strict + ")", n.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + n.src_ZPCc + "))((?![$+<=>^`|])" + n.tpl_host_port_fuzzy_strict + n.src_path + ")", n.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + n.src_ZPCc + "))((?![$+<=>^`|])" + n.tpl_host_port_no_ip_fuzzy_strict + n.src_path + ")", n
        }
      }, {
        "uc.micro/categories/Cc/regex": 61,
        "uc.micro/categories/P/regex": 63,
        "uc.micro/categories/Z/regex": 64,
        "uc.micro/properties/Any/regex": 66
      }],
      56: [function (t, e, n) {
        "use strict";

        function i(t) {
          var e, n, i = r[t];
          if (i) return i;
          for (i = r[t] = [], e = 0; e < 128; e++) n = String.fromCharCode(e), i.push(n);
          for (e = 0; e < t.length; e++) n = t.charCodeAt(e), i[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
          return i
        }

        function o(t, e) {
          var n;
          return "string" != typeof e && (e = o.defaultChars), n = i(e), t.replace(/(%[a-f0-9]{2})+/gi, function (t) {
            var e, i, o, r, s, a, l, u = "";
            for (e = 0, i = t.length; e < i; e += 3) o = parseInt(t.slice(e + 1, e + 3), 16), o < 128 ? u += n[o] : 192 === (224 & o) && e + 3 < i && (r = parseInt(t.slice(e + 4, e + 6), 16), 128 === (192 & r)) ? (l = o << 6 & 1984 | 63 & r, u += l < 128 ? "��" : String.fromCharCode(l), e += 3) : 224 === (240 & o) && e + 6 < i && (r = parseInt(t.slice(e + 4, e + 6), 16), s = parseInt(t.slice(e + 7, e + 9), 16), 128 === (192 & r) && 128 === (192 & s)) ? (l = o << 12 & 61440 | r << 6 & 4032 | 63 & s, u += l < 2048 || l >= 55296 && l <= 57343 ? "���" : String.fromCharCode(l), e += 6) : 240 === (248 & o) && e + 9 < i && (r = parseInt(t.slice(e + 4, e + 6), 16), s = parseInt(t.slice(e + 7, e + 9), 16), a = parseInt(t.slice(e + 10, e + 12), 16), 128 === (192 & r) && 128 === (192 & s) && 128 === (192 & a)) ? (l = o << 18 & 1835008 | r << 12 & 258048 | s << 6 & 4032 | 63 & a, l < 65536 || l > 1114111 ? u += "����" : (l -= 65536, u += String.fromCharCode(55296 + (l >> 10), 56320 + (1023 & l))), e += 9) : u += "�";
            return u
          })
        }
        var r = {};
        o.defaultChars = ";/?:@&=+$,#", o.componentChars = "", e.exports = o
      }, {}],
      57: [function (t, e, n) {
        "use strict";

        function i(t) {
          var e, n, i = r[t];
          if (i) return i;
          for (i = r[t] = [], e = 0; e < 128; e++) n = String.fromCharCode(e), /^[0-9a-z]$/i.test(n) ? i.push(n) : i.push("%" + ("0" + e.toString(16).toUpperCase()).slice(-2));
          for (e = 0; e < t.length; e++) i[t.charCodeAt(e)] = t[e];
          return i
        }

        function o(t, e, n) {
          var r, s, a, l, u, c = "";
          for ("string" != typeof e && (n = e, e = o.defaultChars), "undefined" == typeof n && (n = !0), u = i(e), r = 0, s = t.length; r < s; r++)
            if (a = t.charCodeAt(r), n && 37 === a && r + 2 < s && /^[0-9a-f]{2}$/i.test(t.slice(r + 1, r + 3))) c += t.slice(r, r + 3), r += 2;
            else if (a < 128) c += u[a];
          else if (a >= 55296 && a <= 57343) {
            if (a >= 55296 && a <= 56319 && r + 1 < s && (l = t.charCodeAt(r + 1), l >= 56320 && l <= 57343)) {
              c += encodeURIComponent(t[r] + t[r + 1]), r++;
              continue
            }
            c += "%EF%BF%BD"
          } else c += encodeURIComponent(t[r]);
          return c
        }
        var r = {};
        o.defaultChars = ";/?:@&=+$,-_.!~*'()#", o.componentChars = "-_.!~*'()", e.exports = o
      }, {}],
      58: [function (t, e, n) {
        "use strict";
        e.exports = function (t) {
          var e = "";
          return e += t.protocol || "", e += t.slashes ? "//" : "", e += t.auth ? t.auth + "@" : "", e += t.hostname && t.hostname.indexOf(":") !== -1 ? "[" + t.hostname + "]" : t.hostname || "", e += t.port ? ":" + t.port : "", e += t.pathname || "", e += t.search || "", e += t.hash || ""
        }
      }, {}],
      59: [function (t, e, n) {
        "use strict";
        e.exports.encode = t("./encode"), e.exports.decode = t("./decode"), e.exports.format = t("./format"), e.exports.parse = t("./parse")
      }, {
        "./decode": 56,
        "./encode": 57,
        "./format": 58,
        "./parse": 60
      }],
      60: [function (t, e, n) {
        "use strict";

        function i() {
          this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null
        }

        function o(t, e) {
          if (t && t instanceof i) return t;
          var n = new i;
          return n.parse(t, e), n
        }
        var r = /^([a-z0-9.+-]+:)/i,
          s = /:[0-9]*$/,
          a = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
          l = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
          u = ["{", "}", "|", "\\", "^", "`"].concat(l),
          c = ["'"].concat(u),
          h = ["%", "/", "?", ";", "#"].concat(c),
          p = ["/", "?", "#"],
          f = 255,
          d = /^[+a-z0-9A-Z_-]{0,63}$/,
          m = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
          g = {
            javascript: !0,
            "javascript:": !0
          },
          _ = {
            http: !0,
            https: !0,
            ftp: !0,
            gopher: !0,
            file: !0,
            "http:": !0,
            "https:": !0,
            "ftp:": !0,
            "gopher:": !0,
            "file:": !0
          };
        i.prototype.parse = function (t, e) {
          var n, i, o, s, l, u = t;
          if (u = u.trim(), !e && 1 === t.split("#").length) {
            var c = a.exec(u);
            if (c) return this.pathname = c[1], c[2] && (this.search = c[2]), this
          }
          var v = r.exec(u);
          if (v && (v = v[0], o = v.toLowerCase(), this.protocol = v, u = u.substr(v.length)), (e || v || u.match(/^\/\/[^@\/]+@[^@\/]+/)) && (l = "//" === u.substr(0, 2), !l || v && g[v] || (u = u.substr(2), this.slashes = !0)), !g[v] && (l || v && !_[v])) {
            var y = -1;
            for (n = 0; n < p.length; n++) s = u.indexOf(p[n]), s !== -1 && (y === -1 || s < y) && (y = s);
            var b, w;
            for (w = y === -1 ? u.lastIndexOf("@") : u.lastIndexOf("@", y), w !== -1 && (b = u.slice(0, w), u = u.slice(w + 1), this.auth = b), y = -1, n = 0; n < h.length; n++) s = u.indexOf(h[n]), s !== -1 && (y === -1 || s < y) && (y = s);
            y === -1 && (y = u.length), ":" === u[y - 1] && y--;
            var k = u.slice(0, y);
            u = u.slice(y), this.parseHost(k), this.hostname = this.hostname || "";
            var C = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!C) {
              var x = this.hostname.split(/\./);
              for (n = 0, i = x.length; n < i; n++) {
                var E = x[n];
                if (E && !E.match(d)) {
                  for (var L = "", T = 0, D = E.length; T < D; T++) L += E.charCodeAt(T) > 127 ? "x" : E[T];
                  if (!L.match(d)) {
                    var P = x.slice(0, n),
                      S = x.slice(n + 1),
                      A = E.match(m);
                    A && (P.push(A[1]), S.unshift(A[2])), S.length && (u = S.join(".") + u), this.hostname = P.join(".");
                    break
                  }
                }
              }
            }
            this.hostname.length > f && (this.hostname = ""), C && (this.hostname = this.hostname.substr(1, this.hostname.length - 2))
          }
          var M = u.indexOf("#");
          M !== -1 && (this.hash = u.substr(M), u = u.slice(0, M));
          var z = u.indexOf("?");
          return z !== -1 && (this.search = u.substr(z), u = u.slice(0, z)), u && (this.pathname = u), _[o] && this.hostname && !this.pathname && (this.pathname = ""), this
        }, i.prototype.parseHost = function (t) {
          var e = s.exec(t);
          e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
        }, e.exports = o
      }, {}],
      61: [function (t, e, n) {
        e.exports = /[\0-\x1F\x7F-\x9F]/
      }, {}],
      62: [function (t, e, n) {
        e.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804\uDCBD|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/
      }, {}],
      63: [function (t, e, n) {
        e.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/
      }, {}],
      64: [function (t, e, n) {
        e.exports = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/
      }, {}],
      65: [function (t, e, n) {
        e.exports.Any = t("./properties/Any/regex"), e.exports.Cc = t("./categories/Cc/regex"), e.exports.Cf = t("./categories/Cf/regex"), e.exports.P = t("./categories/P/regex"), e.exports.Z = t("./categories/Z/regex")
      }, {
        "./categories/Cc/regex": 61,
        "./categories/Cf/regex": 62,
        "./categories/P/regex": 63,
        "./categories/Z/regex": 64,
        "./properties/Any/regex": 66
      }],
      66: [function (t, e, n) {
        e.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/
      }, {}],
      67: [function (t, e, n) {
        "use strict";
        e.exports = t("./lib/")
      }, {
        "./lib/": 9
      }]
    }, {}, [67])(67)
  }), n("Core/KnockoutMarkdownBinding", ["markdown-it-sanitizer", "markdown-it"], function (t, e) {
      "use strict";

      function n(t) {
        if (t instanceof HTMLAnchorElement && (t.target = "_blank"), t.childNodes && t.childNodes.length > 0)
          for (var e = 0; e < t.childNodes.length; ++e) n(t.childNodes[e])
      }
      var i = /<html(.|\s)*>(.|\s)*<\/html>/im,
        o = new e({
          html: !0,
          linkify: !0
        });
      o.use(t, {
        imageClass: "",
        removeUnbalanced: !1,
        removeUnknown: !1
      });
      var r = {
        register: function (t) {
          t.bindingHandlers.markdown = {
            init: function () {
              return {
                controlsDescendantBindings: !0
              }
            },
            update: function (e, r) {
              for (; e.firstChild;) t.removeNode(e.firstChild);
              var s, a = t.unwrap(r());
              s = i.test(a) ? a : o.render(a);
              var l = t.utils.parseHtmlFragment(s, e);
              e.className = e.className + " markdown";
              for (var u = 0; u < l.length; ++u) {
                var c = l[u];
                n(c), e.appendChild(c)
              }
            }
          }
        }
      };
      return r
    }), ! function (t, e, i, o) {
      "use strict";

      function r(t, e, n) {
        return setTimeout(c(t, n), e)
      }

      function s(t, e, n) {
        return !!Array.isArray(t) && (a(t, n[e], n), !0)
      }

      function a(t, e, n) {
        var i;
        if (t)
          if (t.forEach) t.forEach(e, n);
          else if (t.length !== o)
          for (i = 0; i < t.length;) e.call(n, t[i], i, t), i++;
        else
          for (i in t) t.hasOwnProperty(i) && e.call(n, t[i], i, t)
      }

      function l(e, n, i) {
        var o = "DEPRECATED METHOD: " + n + "\n" + i + " AT \n";
        return function () {
          var n = new Error("get-stack-trace"),
            i = n && n.stack ? n.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace",
            r = t.console && (t.console.warn || t.console.log);
          return r && r.call(t.console, o, i), e.apply(this, arguments)
        }
      }

      function u(t, e, n) {
        var i, o = e.prototype;
        i = t.prototype = Object.create(o), i.constructor = t, i._super = o, n && pt(i, n)
      }

      function c(t, e) {
        return function () {
          return t.apply(e, arguments)
        }
      }

      function h(t, e) {
        return typeof t == mt ? t.apply(e ? e[0] || o : o, e) : t
      }

      function p(t, e) {
        return t === o ? e : t
      }

      function f(t, e, n) {
        a(_(e), function (e) {
          t.addEventListener(e, n, !1)
        })
      }

      function d(t, e, n) {
        a(_(e), function (e) {
          t.removeEventListener(e, n, !1)
        })
      }

      function m(t, e) {
        for (; t;) {
          if (t == e) return !0;
          t = t.parentNode
        }
        return !1
      }

      function g(t, e) {
        return t.indexOf(e) > -1
      }

      function _(t) {
        return t.trim().split(/\s+/g)
      }

      function v(t, e, n) {
        if (t.indexOf && !n) return t.indexOf(e);
        for (var i = 0; i < t.length;) {
          if (n && t[i][n] == e || !n && t[i] === e) return i;
          i++
        }
        return -1
      }

      function y(t) {
        return Array.prototype.slice.call(t, 0)
      }

      function b(t, e, n) {
        for (var i = [], o = [], r = 0; r < t.length;) {
          var s = e ? t[r][e] : t[r];
          v(o, s) < 0 && i.push(t[r]), o[r] = s, r++
        }
        return n && (i = e ? i.sort(function (t, n) {
          return t[e] > n[e]
        }) : i.sort()), i
      }

      function w(t, e) {
        for (var n, i, r = e[0].toUpperCase() + e.slice(1), s = 0; s < ft.length;) {
          if (n = ft[s], i = n ? n + r : e, i in t) return i;
          s++
        }
        return o
      }

      function k() {
        return wt++
      }

      function C(e) {
        var n = e.ownerDocument || e;
        return n.defaultView || n.parentWindow || t
      }

      function x(t, e) {
        var n = this;
        this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
          h(t.options.enable, [t]) && n.handler(e)
        }, this.init()
      }

      function E(t) {
        var e, n = t.options.inputClass;
        return new(e = n ? n : xt ? U : Et ? j : Ct ? V : R)(t, L)
      }

      function L(t, e, n) {
        var i = n.pointers.length,
          o = n.changedPointers.length,
          r = e & At && i - o === 0,
          s = e & (zt | Ot) && i - o === 0;
        n.isFirst = !!r, n.isFinal = !!s, r && (t.session = {}), n.eventType = e, T(t, n), t.emit("hammer.input", n), t.recognize(n), t.session.prevInput = n
      }

      function T(t, e) {
        var n = t.session,
          i = e.pointers,
          o = i.length;
        n.firstInput || (n.firstInput = S(e)), o > 1 && !n.firstMultiple ? n.firstMultiple = S(e) : 1 === o && (n.firstMultiple = !1);
        var r = n.firstInput,
          s = n.firstMultiple,
          a = s ? s.center : r.center,
          l = e.center = A(i);
        e.timeStamp = vt(), e.deltaTime = e.timeStamp - r.timeStamp, e.angle = N(a, l), e.distance = O(a, l), D(n, e), e.offsetDirection = z(e.deltaX, e.deltaY);
        var u = M(e.deltaTime, e.deltaX, e.deltaY);
        e.overallVelocityX = u.x, e.overallVelocityY = u.y, e.overallVelocity = _t(u.x) > _t(u.y) ? u.x : u.y, e.scale = s ? B(s.pointers, i) : 1, e.rotation = s ? I(s.pointers, i) : 0, e.maxPointers = n.prevInput ? e.pointers.length > n.prevInput.maxPointers ? e.pointers.length : n.prevInput.maxPointers : e.pointers.length, P(n, e);
        var c = t.element;
        m(e.srcEvent.target, c) && (c = e.srcEvent.target), e.target = c
      }

      function D(t, e) {
        var n = e.center,
          i = t.offsetDelta || {},
          o = t.prevDelta || {},
          r = t.prevInput || {};
        e.eventType !== At && r.eventType !== zt || (o = t.prevDelta = {
          x: r.deltaX || 0,
          y: r.deltaY || 0
        }, i = t.offsetDelta = {
          x: n.x,
          y: n.y
        }), e.deltaX = o.x + (n.x - i.x), e.deltaY = o.y + (n.y - i.y)
      }

      function P(t, e) {
        var n, i, r, s, a = t.lastInterval || e,
          l = e.timeStamp - a.timeStamp;
        if (e.eventType != Ot && (l > St || a.velocity === o)) {
          var u = e.deltaX - a.deltaX,
            c = e.deltaY - a.deltaY,
            h = M(l, u, c);
          i = h.x, r = h.y, n = _t(h.x) > _t(h.y) ? h.x : h.y, s = z(u, c), t.lastInterval = e
        } else n = a.velocity, i = a.velocityX, r = a.velocityY, s = a.direction;
        e.velocity = n, e.velocityX = i, e.velocityY = r, e.direction = s
      }

      function S(t) {
        for (var e = [], n = 0; n < t.pointers.length;) e[n] = {
          clientX: gt(t.pointers[n].clientX),
          clientY: gt(t.pointers[n].clientY)
        }, n++;
        return {
          timeStamp: vt(),
          pointers: e,
          center: A(e),
          deltaX: t.deltaX,
          deltaY: t.deltaY
        }
      }

      function A(t) {
        var e = t.length;
        if (1 === e) return {
          x: gt(t[0].clientX),
          y: gt(t[0].clientY)
        };
        for (var n = 0, i = 0, o = 0; e > o;) n += t[o].clientX, i += t[o].clientY, o++;
        return {
          x: gt(n / e),
          y: gt(i / e)
        }
      }

      function M(t, e, n) {
        return {
          x: e / t || 0,
          y: n / t || 0
        }
      }

      function z(t, e) {
        return t === e ? Nt : _t(t) >= _t(e) ? 0 > t ? It : Bt : 0 > e ? Rt : Ut
      }

      function O(t, e, n) {
        n || (n = Zt);
        var i = e[n[0]] - t[n[0]],
          o = e[n[1]] - t[n[1]];
        return Math.sqrt(i * i + o * o)
      }

      function N(t, e, n) {
        n || (n = Zt);
        var i = e[n[0]] - t[n[0]],
          o = e[n[1]] - t[n[1]];
        return 180 * Math.atan2(o, i) / Math.PI
      }

      function I(t, e) {
        return N(e[1], e[0], Vt) + N(t[1], t[0], Vt)
      }

      function B(t, e) {
        return O(e[0], e[1], Vt) / O(t[0], t[1], Vt)
      }

      function R() {
        this.evEl = Wt, this.evWin = Gt, this.pressed = !1, x.apply(this, arguments)
      }

      function U() {
        this.evEl = Yt, this.evWin = Xt, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
      }

      function F() {
        this.evTarget = Qt, this.evWin = te, this.started = !1, x.apply(this, arguments)
      }

      function q(t, e) {
        var n = y(t.touches),
          i = y(t.changedTouches);
        return e & (zt | Ot) && (n = b(n.concat(i), "identifier", !0)), [n, i]
      }

      function j() {
        this.evTarget = ne, this.targetIds = {}, x.apply(this, arguments)
      }

      function Z(t, e) {
        var n = y(t.touches),
          i = this.targetIds;
        if (e & (At | Mt) && 1 === n.length) return i[n[0].identifier] = !0, [n, n];
        var o, r, s = y(t.changedTouches),
          a = [],
          l = this.target;
        if (r = n.filter(function (t) {
            return m(t.target, l)
          }), e === At)
          for (o = 0; o < r.length;) i[r[o].identifier] = !0, o++;
        for (o = 0; o < s.length;) i[s[o].identifier] && a.push(s[o]), e & (zt | Ot) && delete i[s[o].identifier], o++;
        return a.length ? [b(r.concat(a), "identifier", !0), a] : void 0
      }

      function V() {
        x.apply(this, arguments);
        var t = c(this.handler, this);
        this.touch = new j(this.manager, t), this.mouse = new R(this.manager, t), this.primaryTouch = null, this.lastTouches = []
      }

      function H(t, e) {
        t & At ? (this.primaryTouch = e.changedPointers[0].identifier, W.call(this, e)) : t & (zt | Ot) && W.call(this, e)
      }

      function W(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
          var n = {
            x: e.clientX,
            y: e.clientY
          };
          this.lastTouches.push(n);
          var i = this.lastTouches,
            o = function () {
              var t = i.indexOf(n);
              t > -1 && i.splice(t, 1)
            };
          setTimeout(o, ie)
        }
      }

      function G(t) {
        for (var e = t.srcEvent.clientX, n = t.srcEvent.clientY, i = 0; i < this.lastTouches.length; i++) {
          var o = this.lastTouches[i],
            r = Math.abs(e - o.x),
            s = Math.abs(n - o.y);
          if (oe >= r && oe >= s) return !0
        }
        return !1
      }

      function $(t, e) {
        this.manager = t, this.set(e)
      }

      function J(t) {
        if (g(t, ce)) return ce;
        var e = g(t, he),
          n = g(t, pe);
        return e && n ? ce : e || n ? e ? he : pe : g(t, ue) ? ue : le
      }

      function Y() {
        if (!se) return !1;
        var e = {},
          n = t.CSS && t.CSS.supports;
        return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (i) {
          e[i] = !n || t.CSS.supports("touch-action", i)
        }), e
      }

      function X(t) {
        this.options = pt({}, this.defaults, t || {}), this.id = k(), this.manager = null, this.options.enable = p(this.options.enable, !0), this.state = de, this.simultaneous = {}, this.requireFail = []
      }

      function K(t) {
        return t & ye ? "cancel" : t & _e ? "end" : t & ge ? "move" : t & me ? "start" : ""
      }

      function Q(t) {
        return t == Ut ? "down" : t == Rt ? "up" : t == It ? "left" : t == Bt ? "right" : ""
      }

      function tt(t, e) {
        var n = e.manager;
        return n ? n.get(t) : t
      }

      function et() {
        X.apply(this, arguments)
      }

      function nt() {
        et.apply(this, arguments), this.pX = null, this.pY = null
      }

      function it() {
        et.apply(this, arguments)
      }

      function ot() {
        X.apply(this, arguments), this._timer = null, this._input = null
      }

      function rt() {
        et.apply(this, arguments)
      }

      function st() {
        et.apply(this, arguments)
      }

      function at() {
        X.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
      }

      function lt(t, e) {
        return e = e || {}, e.recognizers = p(e.recognizers, lt.defaults.preset), new ut(t, e)
      }

      function ut(t, e) {
        this.options = pt({}, lt.defaults, e || {}), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = t, this.input = E(this), this.touchAction = new $(this, this.options.touchAction), ct(this, !0), a(this.options.recognizers, function (t) {
          var e = this.add(new t[0](t[1]));
          t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
      }

      function ct(t, e) {
        var n = t.element;
        if (n.style) {
          var i;
          a(t.options.cssProps, function (o, r) {
            i = w(n.style, r), e ? (t.oldCssProps[i] = n.style[i], n.style[i] = o) : n.style[i] = t.oldCssProps[i] || ""
          }), e || (t.oldCssProps = {})
        }
      }

      function ht(t, n) {
        var i = e.createEvent("Event");
        i.initEvent(t, !0, !0), i.gesture = n, n.target.dispatchEvent(i)
      }
      var pt, ft = ["", "webkit", "Moz", "MS", "ms", "o"],
        dt = e.createElement("div"),
        mt = "function",
        gt = Math.round,
        _t = Math.abs,
        vt = Date.now;
      pt = "function" != typeof Object.assign ? function (t) {
        if (t === o || null === t) throw new TypeError("Cannot convert undefined or null to object");
        for (var e = Object(t), n = 1; n < arguments.length; n++) {
          var i = arguments[n];
          if (i !== o && null !== i)
            for (var r in i) i.hasOwnProperty(r) && (e[r] = i[r])
        }
        return e
      } : Object.assign;
      var yt = l(function (t, e, n) {
          for (var i = Object.keys(e), r = 0; r < i.length;)(!n || n && t[i[r]] === o) && (t[i[r]] = e[i[r]]), r++;
          return t
        }, "extend", "Use `assign`."),
        bt = l(function (t, e) {
          return yt(t, e, !0)
        }, "merge", "Use `assign`."),
        wt = 1,
        kt = /mobile|tablet|ip(ad|hone|od)|android/i,
        Ct = "ontouchstart" in t,
        xt = w(t, "PointerEvent") !== o,
        Et = Ct && kt.test(navigator.userAgent),
        Lt = "touch",
        Tt = "pen",
        Dt = "mouse",
        Pt = "kinect",
        St = 25,
        At = 1,
        Mt = 2,
        zt = 4,
        Ot = 8,
        Nt = 1,
        It = 2,
        Bt = 4,
        Rt = 8,
        Ut = 16,
        Ft = It | Bt,
        qt = Rt | Ut,
        jt = Ft | qt,
        Zt = ["x", "y"],
        Vt = ["clientX", "clientY"];
      x.prototype = {
        handler: function () {},
        init: function () {
          this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(C(this.element), this.evWin, this.domHandler)
        },
        destroy: function () {
          this.evEl && d(this.element, this.evEl, this.domHandler), this.evTarget && d(this.target, this.evTarget, this.domHandler), this.evWin && d(C(this.element), this.evWin, this.domHandler)
        }
      };
      var Ht = {
          mousedown: At,
          mousemove: Mt,
          mouseup: zt
        },
        Wt = "mousedown",
        Gt = "mousemove mouseup";
      u(R, x, {
        handler: function (t) {
          var e = Ht[t.type];
          e & At && 0 === t.button && (this.pressed = !0), e & Mt && 1 !== t.which && (e = zt), this.pressed && (e & zt && (this.pressed = !1), this.callback(this.manager, e, {
            pointers: [t],
            changedPointers: [t],
            pointerType: Dt,
            srcEvent: t
          }))
        }
      });
      var $t = {
          pointerdown: At,
          pointermove: Mt,
          pointerup: zt,
          pointercancel: Ot,
          pointerout: Ot
        },
        Jt = {
          2: Lt,
          3: Tt,
          4: Dt,
          5: Pt
        },
        Yt = "pointerdown",
        Xt = "pointermove pointerup pointercancel";
      t.MSPointerEvent && !t.PointerEvent && (Yt = "MSPointerDown", Xt = "MSPointerMove MSPointerUp MSPointerCancel"), u(U, x, {
        handler: function (t) {
          var e = this.store,
            n = !1,
            i = t.type.toLowerCase().replace("ms", ""),
            o = $t[i],
            r = Jt[t.pointerType] || t.pointerType,
            s = r == Lt,
            a = v(e, t.pointerId, "pointerId");
          o & At && (0 === t.button || s) ? 0 > a && (e.push(t), a = e.length - 1) : o & (zt | Ot) && (n = !0), 0 > a || (e[a] = t, this.callback(this.manager, o, {
            pointers: e,
            changedPointers: [t],
            pointerType: r,
            srcEvent: t
          }), n && e.splice(a, 1))
        }
      });
      var Kt = {
          touchstart: At,
          touchmove: Mt,
          touchend: zt,
          touchcancel: Ot
        },
        Qt = "touchstart",
        te = "touchstart touchmove touchend touchcancel";
      u(F, x, {
        handler: function (t) {
          var e = Kt[t.type];
          if (e === At && (this.started = !0), this.started) {
            var n = q.call(this, t, e);
            e & (zt | Ot) && n[0].length - n[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
              pointers: n[0],
              changedPointers: n[1],
              pointerType: Lt,
              srcEvent: t
            })
          }
        }
      });
      var ee = {
          touchstart: At,
          touchmove: Mt,
          touchend: zt,
          touchcancel: Ot
        },
        ne = "touchstart touchmove touchend touchcancel";
      u(j, x, {
        handler: function (t) {
          var e = ee[t.type],
            n = Z.call(this, t, e);
          n && this.callback(this.manager, e, {
            pointers: n[0],
            changedPointers: n[1],
            pointerType: Lt,
            srcEvent: t
          })
        }
      });
      var ie = 2500,
        oe = 25;
      u(V, x, {
        handler: function (t, e, n) {
          var i = n.pointerType == Lt,
            o = n.pointerType == Dt;
          if (!(o && n.sourceCapabilities && n.sourceCapabilities.firesTouchEvents)) {
            if (i) H.call(this, e, n);
            else if (o && G.call(this, n)) return;
            this.callback(t, e, n)
          }
        },
        destroy: function () {
          this.touch.destroy(), this.mouse.destroy()
        }
      });
      var re = w(dt.style, "touchAction"),
        se = re !== o,
        ae = "compute",
        le = "auto",
        ue = "manipulation",
        ce = "none",
        he = "pan-x",
        pe = "pan-y",
        fe = Y();
      $.prototype = {
        set: function (t) {
          t == ae && (t = this.compute()), se && this.manager.element.style && fe[t] && (this.manager.element.style[re] = t), this.actions = t.toLowerCase().trim()
        },
        update: function () {
          this.set(this.manager.options.touchAction)
        },
        compute: function () {
          var t = [];
          return a(this.manager.recognizers, function (e) {
            h(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
          }), J(t.join(" "))
        },
        preventDefaults: function (t) {
          var e = t.srcEvent,
            n = t.offsetDirection;
          if (this.manager.session.prevented) return void e.preventDefault();
          var i = this.actions,
            o = g(i, ce) && !fe[ce],
            r = g(i, pe) && !fe[pe],
            s = g(i, he) && !fe[he];
          if (o) {
            var a = 1 === t.pointers.length,
              l = t.distance < 2,
              u = t.deltaTime < 250;
            if (a && l && u) return
          }
          return s && r ? void 0 : o || r && n & Ft || s && n & qt ? this.preventSrc(e) : void 0
        },
        preventSrc: function (t) {
          this.manager.session.prevented = !0, t.preventDefault()
        }
      };
      var de = 1,
        me = 2,
        ge = 4,
        _e = 8,
        ve = _e,
        ye = 16,
        be = 32;
      X.prototype = {
        defaults: {},
        set: function (t) {
          return pt(this.options, t), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function (t) {
          if (s(t, "recognizeWith", this)) return this;
          var e = this.simultaneous;
          return t = tt(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
        },
        dropRecognizeWith: function (t) {
          return s(t, "dropRecognizeWith", this) ? this : (t = tt(t, this), delete this.simultaneous[t.id], this)
        },
        requireFailure: function (t) {
          if (s(t, "requireFailure", this)) return this;
          var e = this.requireFail;
          return t = tt(t, this), -1 === v(e, t) && (e.push(t), t.requireFailure(this)), this
        },
        dropRequireFailure: function (t) {
          if (s(t, "dropRequireFailure", this)) return this;
          t = tt(t, this);
          var e = v(this.requireFail, t);
          return e > -1 && this.requireFail.splice(e, 1), this
        },
        hasRequireFailures: function () {
          return this.requireFail.length > 0
        },
        canRecognizeWith: function (t) {
          return !!this.simultaneous[t.id]
        },
        emit: function (t) {
          function e(e) {
            n.manager.emit(e, t)
          }
          var n = this,
            i = this.state;
          _e > i && e(n.options.event + K(i)), e(n.options.event), t.additionalEvent && e(t.additionalEvent), i >= _e && e(n.options.event + K(i))
        },
        tryEmit: function (t) {
          return this.canEmit() ? this.emit(t) : void(this.state = be)
        },
        canEmit: function () {
          for (var t = 0; t < this.requireFail.length;) {
            if (!(this.requireFail[t].state & (be | de))) return !1;
            t++
          }
          return !0
        },
        recognize: function (t) {
          var e = pt({}, t);
          return h(this.options.enable, [this, e]) ? (this.state & (ve | ye | be) && (this.state = de), this.state = this.process(e), void(this.state & (me | ge | _e | ye) && this.tryEmit(e))) : (this.reset(), void(this.state = be))
        },
        process: function (t) {},
        getTouchAction: function () {},
        reset: function () {}
      }, u(et, X, {
        defaults: {
          pointers: 1
        },
        attrTest: function (t) {
          var e = this.options.pointers;
          return 0 === e || t.pointers.length === e
        },
        process: function (t) {
          var e = this.state,
            n = t.eventType,
            i = e & (me | ge),
            o = this.attrTest(t);
          return i && (n & Ot || !o) ? e | ye : i || o ? n & zt ? e | _e : e & me ? e | ge : me : be
        }
      }), u(nt, et, {
        defaults: {
          event: "pan",
          threshold: 10,
          pointers: 1,
          direction: jt
        },
        getTouchAction: function () {
          var t = this.options.direction,
            e = [];
          return t & Ft && e.push(pe), t & qt && e.push(he), e
        },
        directionTest: function (t) {
          var e = this.options,
            n = !0,
            i = t.distance,
            o = t.direction,
            r = t.deltaX,
            s = t.deltaY;
          return o & e.direction || (e.direction & Ft ? (o = 0 === r ? Nt : 0 > r ? It : Bt, n = r != this.pX, i = Math.abs(t.deltaX)) : (o = 0 === s ? Nt : 0 > s ? Rt : Ut, n = s != this.pY, i = Math.abs(t.deltaY))), t.direction = o, n && i > e.threshold && o & e.direction
        },
        attrTest: function (t) {
          return et.prototype.attrTest.call(this, t) && (this.state & me || !(this.state & me) && this.directionTest(t))
        },
        emit: function (t) {
          this.pX = t.deltaX, this.pY = t.deltaY;
          var e = Q(t.direction);
          e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t)
        }
      }), u(it, et, {
        defaults: {
          event: "pinch",
          threshold: 0,
          pointers: 2
        },
        getTouchAction: function () {
          return [ce]
        },
        attrTest: function (t) {
          return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & me)
        },
        emit: function (t) {
          if (1 !== t.scale) {
            var e = t.scale < 1 ? "in" : "out";
            t.additionalEvent = this.options.event + e
          }
          this._super.emit.call(this, t)
        }
      }), u(ot, X, {
        defaults: {
          event: "press",
          pointers: 1,
          time: 251,
          threshold: 9
        },
        getTouchAction: function () {
          return [le]
        },
        process: function (t) {
          var e = this.options,
            n = t.pointers.length === e.pointers,
            i = t.distance < e.threshold,
            o = t.deltaTime > e.time;
          if (this._input = t, !i || !n || t.eventType & (zt | Ot) && !o) this.reset();
          else if (t.eventType & At) this.reset(), this._timer = r(function () {
            this.state = ve, this.tryEmit()
          }, e.time, this);
          else if (t.eventType & zt) return ve;
          return be
        },
        reset: function () {
          clearTimeout(this._timer)
        },
        emit: function (t) {
          this.state === ve && (t && t.eventType & zt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = vt(), this.manager.emit(this.options.event, this._input)))
        }
      }), u(rt, et, {
        defaults: {
          event: "rotate",
          threshold: 0,
          pointers: 2
        },
        getTouchAction: function () {
          return [ce]
        },
        attrTest: function (t) {
          return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & me)
        }
      }), u(st, et, {
        defaults: {
          event: "swipe",
          threshold: 10,
          velocity: .3,
          direction: Ft | qt,
          pointers: 1
        },
        getTouchAction: function () {
          return nt.prototype.getTouchAction.call(this)
        },
        attrTest: function (t) {
          var e, n = this.options.direction;
          return n & (Ft | qt) ? e = t.overallVelocity : n & Ft ? e = t.overallVelocityX : n & qt && (e = t.overallVelocityY), this._super.attrTest.call(this, t) && n & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && _t(e) > this.options.velocity && t.eventType & zt
        },
        emit: function (t) {
          var e = Q(t.offsetDirection);
          e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }
      }), u(at, X, {
        defaults: {
          event: "tap",
          pointers: 1,
          taps: 1,
          interval: 300,
          time: 250,
          threshold: 9,
          posThreshold: 10
        },
        getTouchAction: function () {
          return [ue]
        },
        process: function (t) {
          var e = this.options,
            n = t.pointers.length === e.pointers,
            i = t.distance < e.threshold,
            o = t.deltaTime < e.time;
          if (this.reset(), t.eventType & At && 0 === this.count) return this.failTimeout();
          if (i && o && n) {
            if (t.eventType != zt) return this.failTimeout();
            var s = !this.pTime || t.timeStamp - this.pTime < e.interval,
              a = !this.pCenter || O(this.pCenter, t.center) < e.posThreshold;
            this.pTime = t.timeStamp, this.pCenter = t.center, a && s ? this.count += 1 : this.count = 1, this._input = t;
            var l = this.count % e.taps;
            if (0 === l) return this.hasRequireFailures() ? (this._timer = r(function () {
              this.state = ve, this.tryEmit()
            }, e.interval, this), me) : ve
          }
          return be
        },
        failTimeout: function () {
          return this._timer = r(function () {
            this.state = be
          }, this.options.interval, this), be
        },
        reset: function () {
          clearTimeout(this._timer)
        },
        emit: function () {
          this.state == ve && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
      }), lt.VERSION = "2.0.7", lt.defaults = {
        domEvents: !1,
        touchAction: ae,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
          [rt, {
            enable: !1
          }],
          [it, {
              enable: !1
            },
            ["rotate"]
          ],
          [st, {
            direction: Ft
          }],
          [nt, {
              direction: Ft
            },
            ["swipe"]
          ],
          [at],
          [at, {
              event: "doubletap",
              taps: 2
            },
            ["tap"]
          ],
          [ot]
        ],
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          contentZooming: "none",
          userDrag: "none",
          tapHighlightColor: "rgba(0,0,0,0)"
        }
      };
      var we = 1,
        ke = 2;
      ut.prototype = {
        set: function (t) {
          return pt(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },
        stop: function (t) {
          this.session.stopped = t ? ke : we
        },
        recognize: function (t) {
          var e = this.session;
          if (!e.stopped) {
            this.touchAction.preventDefaults(t);
            var n, i = this.recognizers,
              o = e.curRecognizer;
            (!o || o && o.state & ve) && (o = e.curRecognizer = null);
            for (var r = 0; r < i.length;) n = i[r], e.stopped === ke || o && n != o && !n.canRecognizeWith(o) ? n.reset() : n.recognize(t), !o && n.state & (me | ge | _e) && (o = e.curRecognizer = n), r++
          }
        },
        get: function (t) {
          if (t instanceof X) return t;
          for (var e = this.recognizers, n = 0; n < e.length; n++)
            if (e[n].options.event == t) return e[n];
          return null
        },
        add: function (t) {
          if (s(t, "add", this)) return this;
          var e = this.get(t.options.event);
          return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
        },
        remove: function (t) {
          if (s(t, "remove", this)) return this;
          if (t = this.get(t)) {
            var e = this.recognizers,
              n = v(e, t); - 1 !== n && (e.splice(n, 1), this.touchAction.update())
          }
          return this
        },
        on: function (t, e) {
          if (t !== o && e !== o) {
            var n = this.handlers;
            return a(_(t), function (t) {
              n[t] = n[t] || [], n[t].push(e)
            }), this
          }
        },
        off: function (t, e) {
          if (t !== o) {
            var n = this.handlers;
            return a(_(t), function (t) {
              e ? n[t] && n[t].splice(v(n[t], e), 1) : delete n[t]
            }), this
          }
        },
        emit: function (t, e) {
          this.options.domEvents && ht(t, e);
          var n = this.handlers[t] && this.handlers[t].slice();
          if (n && n.length) {
            e.type = t, e.preventDefault = function () {
              e.srcEvent.preventDefault()
            };
            for (var i = 0; i < n.length;) n[i](e), i++
          }
        },
        destroy: function () {
          this.element && ct(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
      }, pt(lt, {
        INPUT_START: At,
        INPUT_MOVE: Mt,
        INPUT_END: zt,
        INPUT_CANCEL: Ot,
        STATE_POSSIBLE: de,
        STATE_BEGAN: me,
        STATE_CHANGED: ge,
        STATE_ENDED: _e,
        STATE_RECOGNIZED: ve,
        STATE_CANCELLED: ye,
        STATE_FAILED: be,
        DIRECTION_NONE: Nt,
        DIRECTION_LEFT: It,
        DIRECTION_RIGHT: Bt,
        DIRECTION_UP: Rt,
        DIRECTION_DOWN: Ut,
        DIRECTION_HORIZONTAL: Ft,
        DIRECTION_VERTICAL: qt,
        DIRECTION_ALL: jt,
        Manager: ut,
        Input: x,
        TouchAction: $,
        TouchInput: j,
        MouseInput: R,
        PointerEventInput: U,
        TouchMouseInput: V,
        SingleTouchInput: F,
        Recognizer: X,
        AttrRecognizer: et,
        Tap: at,
        Pan: nt,
        Swipe: st,
        Pinch: it,
        Rotate: rt,
        Press: ot,
        on: f,
        off: d,
        each: a,
        merge: bt,
        extend: yt,
        assign: pt,
        inherit: u,
        bindFn: c,
        prefixed: w
      });
      var Ce = "undefined" != typeof t ? t : "undefined" != typeof self ? self : {};
      Ce.Hammer = lt, "function" == typeof n && n.amd ? n("Hammer", [], function () {
        return lt
      }) : "undefined" != typeof module && module.exports ? module.exports = lt : t[i] = lt
    }(window, document, "Hammer"), n("Core/KnockoutHammerBinding", ["KnockoutES5", "Hammer"], function (t, e) {
      "use strict";
      var n = {
        register: function (t) {
          t.bindingHandlers.swipeLeft = {
            init: function (n, i, o, r, s) {
              var a = t.unwrap(i());
              new e(n).on("swipeleft", function (t) {
                var e = s.$data;
                a.apply(e, arguments)
              })
            }
          }, t.bindingHandlers.swipeRight = {
            init: function (n, i, o, r, s) {
              var a = t.unwrap(i());
              new e(n).on("swiperight", function (t) {
                var e = s.$data;
                a.apply(e, arguments)
              })
            }
          }
        }
      };
      return n
    }), n("Core/registerKnockoutBindings", ["Cesium/Widgets/SvgPathBindingHandler", "KnockoutES5", "Core/KnockoutMarkdownBinding", "Core/KnockoutHammerBinding"], function (t, e, n, i) {
      "use strict";
      var o = function () {
        t.register(e), n.register(e), i.register(e), e.bindingHandlers.embeddedComponent = {
          init: function (t, n, i, o, r) {
            var s = e.unwrap(n());
            return s.show(t), {
              controlsDescendantBindings: !0
            }
          },
          update: function (t, e, n, i, o) {}
        }
      };
      return o
    }), n("Core/createFragmentFromTemplate", [], function () {
      "use strict";
      var t = function (t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        for (var n = document.createDocumentFragment(); e.firstChild;) n.appendChild(e.firstChild);
        return n
      };
      return t
    }), n("Core/loadView", ["Cesium/Widgets/getElement", "KnockoutES5", "Core/createFragmentFromTemplate"], function (t, e, n) {
      "use strict";
      var i = function (i, o, r) {
        o = t(o);
        var s, a = n(i),
          l = [];
        for (s = 0; s < a.childNodes.length; ++s) l.push(a.childNodes[s]);
        for (o.appendChild(a), s = 0; s < l.length; ++s) {
          var u = l[s];
          1 !== u.nodeType && 8 !== u.nodeType || e.applyBindings(r, u)
        }
        return l
      };
      return i
    }), ! function (t, e, i) {
      var o = t.L,
        r = {};
      r.version = "0.7.7", "object" == typeof module && "object" == typeof module.exports ? module.exports = r : "function" == typeof n && n.amd && n("leaflet", r), r.noConflict = function () {
          return t.L = o, this
        }, t.L = r, r.Util = {
          extend: function (t) {
            var e, n, i, o, r = Array.prototype.slice.call(arguments, 1);
            for (n = 0, i = r.length; i > n; n++) {
              o = r[n] || {};
              for (e in o) o.hasOwnProperty(e) && (t[e] = o[e])
            }
            return t
          },
          bind: function (t, e) {
            var n = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
            return function () {
              return t.apply(e, n || arguments)
            }
          },
          stamp: function () {
            var t = 0,
              e = "_leaflet_id";
            return function (n) {
              return n[e] = n[e] || ++t, n[e]
            }
          }(),
          invokeEach: function (t, e, n) {
            var i, o;
            if ("object" == typeof t) {
              o = Array.prototype.slice.call(arguments, 3);
              for (i in t) e.apply(n, [i, t[i]].concat(o));
              return !0
            }
            return !1
          },
          limitExecByInterval: function (t, e, n) {
            var i, o;
            return function r() {
              var s = arguments;
              return i ? void(o = !0) : (i = !0, setTimeout(function () {
                i = !1, o && (r.apply(n, s), o = !1)
              }, e), void t.apply(n, s))
            }
          },
          falseFn: function () {
            return !1
          },
          formatNum: function (t, e) {
            var n = Math.pow(10, e || 5);
            return Math.round(t * n) / n
          },
          trim: function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
          },
          splitWords: function (t) {
            return r.Util.trim(t).split(/\s+/)
          },
          setOptions: function (t, e) {
            return t.options = r.extend({}, t.options, e), t.options
          },
          getParamString: function (t, e, n) {
            var i = [];
            for (var o in t) i.push(encodeURIComponent(n ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
            return (e && -1 !== e.indexOf("?") ? "&" : "?") + i.join("&")
          },
          template: function (t, e) {
            return t.replace(/\{ *([\w_]+) *\}/g, function (t, n) {
              var o = e[n];
              if (o === i) throw new Error("No value provided for variable " + t);
              return "function" == typeof o && (o = o(e)), o
            })
          },
          isArray: Array.isArray || function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
          },
          emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        },
        function () {
          function e(e) {
            var n, i, o = ["webkit", "moz", "o", "ms"];
            for (n = 0; n < o.length && !i; n++) i = t[o[n] + e];
            return i
          }

          function n(e) {
            var n = +new Date,
              o = Math.max(0, 16 - (n - i));
            return i = n + o, t.setTimeout(e, o)
          }
          var i = 0,
            o = t.requestAnimationFrame || e("RequestAnimationFrame") || n,
            s = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function (e) {
              t.clearTimeout(e)
            };
          r.Util.requestAnimFrame = function (e, i, s, a) {
            return e = r.bind(e, i), s && o === n ? void e() : o.call(t, e, a)
          }, r.Util.cancelAnimFrame = function (e) {
            e && s.call(t, e)
          }
        }(), r.extend = r.Util.extend, r.bind = r.Util.bind, r.stamp = r.Util.stamp, r.setOptions = r.Util.setOptions, r.Class = function () {}, r.Class.extend = function (t) {
          var e = function () {
              this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
            },
            n = function () {};
          n.prototype = this.prototype;
          var i = new n;
          i.constructor = e, e.prototype = i;
          for (var o in this) this.hasOwnProperty(o) && "prototype" !== o && (e[o] = this[o]);
          t.statics && (r.extend(e, t.statics), delete t.statics), t.includes && (r.Util.extend.apply(null, [i].concat(t.includes)), delete t.includes), t.options && i.options && (t.options = r.extend({}, i.options, t.options)), r.extend(i, t), i._initHooks = [];
          var s = this;
          return e.__super__ = s.prototype, i.callInitHooks = function () {
            if (!this._initHooksCalled) {
              s.prototype.callInitHooks && s.prototype.callInitHooks.call(this),
                this._initHooksCalled = !0;
              for (var t = 0, e = i._initHooks.length; e > t; t++) i._initHooks[t].call(this)
            }
          }, e
        }, r.Class.include = function (t) {
          r.extend(this.prototype, t)
        }, r.Class.mergeOptions = function (t) {
          r.extend(this.prototype.options, t)
        }, r.Class.addInitHook = function (t) {
          var e = Array.prototype.slice.call(arguments, 1),
            n = "function" == typeof t ? t : function () {
              this[t].apply(this, e)
            };
          this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n)
        };
      var s = "_leaflet_events";
      r.Mixin = {}, r.Mixin.Events = {
          addEventListener: function (t, e, n) {
            if (r.Util.invokeEach(t, this.addEventListener, this, e, n)) return this;
            var i, o, a, l, u, c, h, p = this[s] = this[s] || {},
              f = n && n !== this && r.stamp(n);
            for (t = r.Util.splitWords(t), i = 0, o = t.length; o > i; i++) a = {
              action: e,
              context: n || this
            }, l = t[i], f ? (u = l + "_idx", c = u + "_len", h = p[u] = p[u] || {}, h[f] || (h[f] = [], p[c] = (p[c] || 0) + 1), h[f].push(a)) : (p[l] = p[l] || [], p[l].push(a));
            return this
          },
          hasEventListeners: function (t) {
            var e = this[s];
            return !!e && (t in e && e[t].length > 0 || t + "_idx" in e && e[t + "_idx_len"] > 0)
          },
          removeEventListener: function (t, e, n) {
            if (!this[s]) return this;
            if (!t) return this.clearAllEventListeners();
            if (r.Util.invokeEach(t, this.removeEventListener, this, e, n)) return this;
            var i, o, a, l, u, c, h, p, f, d = this[s],
              m = n && n !== this && r.stamp(n);
            for (t = r.Util.splitWords(t), i = 0, o = t.length; o > i; i++)
              if (a = t[i], c = a + "_idx", h = c + "_len", p = d[c], e) {
                if (l = m && p ? p[m] : d[a]) {
                  for (u = l.length - 1; u >= 0; u--) l[u].action !== e || n && l[u].context !== n || (f = l.splice(u, 1), f[0].action = r.Util.falseFn);
                  n && p && 0 === l.length && (delete p[m], d[h]--)
                }
              } else delete d[a], delete d[c], delete d[h];
            return this
          },
          clearAllEventListeners: function () {
            return delete this[s], this
          },
          fireEvent: function (t, e) {
            if (!this.hasEventListeners(t)) return this;
            var n, i, o, a, l, u = r.Util.extend({}, e, {
                type: t,
                target: this
              }),
              c = this[s];
            if (c[t])
              for (n = c[t].slice(), i = 0, o = n.length; o > i; i++) n[i].action.call(n[i].context, u);
            a = c[t + "_idx"];
            for (l in a)
              if (n = a[l].slice())
                for (i = 0, o = n.length; o > i; i++) n[i].action.call(n[i].context, u);
            return this
          },
          addOneTimeEventListener: function (t, e, n) {
            if (r.Util.invokeEach(t, this.addOneTimeEventListener, this, e, n)) return this;
            var i = r.bind(function () {
              this.removeEventListener(t, e, n).removeEventListener(t, i, n)
            }, this);
            return this.addEventListener(t, e, n).addEventListener(t, i, n)
          }
        }, r.Mixin.Events.on = r.Mixin.Events.addEventListener, r.Mixin.Events.off = r.Mixin.Events.removeEventListener, r.Mixin.Events.once = r.Mixin.Events.addOneTimeEventListener, r.Mixin.Events.fire = r.Mixin.Events.fireEvent,
        function () {
          var n = "ActiveXObject" in t,
            o = n && !e.addEventListener,
            s = navigator.userAgent.toLowerCase(),
            a = -1 !== s.indexOf("webkit"),
            l = -1 !== s.indexOf("chrome"),
            u = -1 !== s.indexOf("phantom"),
            c = -1 !== s.indexOf("android"),
            h = -1 !== s.search("android [23]"),
            p = -1 !== s.indexOf("gecko"),
            f = typeof orientation != i + "",
            d = !t.PointerEvent && t.MSPointerEvent,
            m = t.PointerEvent && t.navigator.pointerEnabled || d,
            g = "devicePixelRatio" in t && t.devicePixelRatio > 1 || "matchMedia" in t && t.matchMedia("(min-resolution:144dpi)") && t.matchMedia("(min-resolution:144dpi)").matches,
            _ = e.documentElement,
            v = n && "transition" in _.style,
            y = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !h,
            b = "MozPerspective" in _.style,
            w = "OTransition" in _.style,
            k = !t.L_DISABLE_3D && (v || y || b || w) && !u,
            C = !t.L_NO_TOUCH && !u && (m || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
          r.Browser = {
            ie: n,
            ielt9: o,
            webkit: a,
            gecko: p && !a && !t.opera && !n,
            android: c,
            android23: h,
            chrome: l,
            ie3d: v,
            webkit3d: y,
            gecko3d: b,
            opera3d: w,
            any3d: k,
            mobile: f,
            mobileWebkit: f && a,
            mobileWebkit3d: f && y,
            mobileOpera: f && t.opera,
            touch: C,
            msPointer: d,
            pointer: m,
            retina: g
          }
        }(), r.Point = function (t, e, n) {
          this.x = n ? Math.round(t) : t, this.y = n ? Math.round(e) : e
        }, r.Point.prototype = {
          clone: function () {
            return new r.Point(this.x, this.y)
          },
          add: function (t) {
            return this.clone()._add(r.point(t))
          },
          _add: function (t) {
            return this.x += t.x, this.y += t.y, this
          },
          subtract: function (t) {
            return this.clone()._subtract(r.point(t))
          },
          _subtract: function (t) {
            return this.x -= t.x, this.y -= t.y, this
          },
          divideBy: function (t) {
            return this.clone()._divideBy(t)
          },
          _divideBy: function (t) {
            return this.x /= t, this.y /= t, this
          },
          multiplyBy: function (t) {
            return this.clone()._multiplyBy(t)
          },
          _multiplyBy: function (t) {
            return this.x *= t, this.y *= t, this
          },
          round: function () {
            return this.clone()._round()
          },
          _round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
          },
          floor: function () {
            return this.clone()._floor()
          },
          _floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
          },
          distanceTo: function (t) {
            t = r.point(t);
            var e = t.x - this.x,
              n = t.y - this.y;
            return Math.sqrt(e * e + n * n)
          },
          equals: function (t) {
            return t = r.point(t), t.x === this.x && t.y === this.y
          },
          contains: function (t) {
            return t = r.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
          },
          toString: function () {
            return "Point(" + r.Util.formatNum(this.x) + ", " + r.Util.formatNum(this.y) + ")"
          }
        }, r.point = function (t, e, n) {
          return t instanceof r.Point ? t : r.Util.isArray(t) ? new r.Point(t[0], t[1]) : t === i || null === t ? t : new r.Point(t, e, n)
        }, r.Bounds = function (t, e) {
          if (t)
            for (var n = e ? [t, e] : t, i = 0, o = n.length; o > i; i++) this.extend(n[i])
        }, r.Bounds.prototype = {
          extend: function (t) {
            return t = r.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
          },
          getCenter: function (t) {
            return new r.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
          },
          getBottomLeft: function () {
            return new r.Point(this.min.x, this.max.y)
          },
          getTopRight: function () {
            return new r.Point(this.max.x, this.min.y)
          },
          getSize: function () {
            return this.max.subtract(this.min)
          },
          contains: function (t) {
            var e, n;
            return t = "number" == typeof t[0] || t instanceof r.Point ? r.point(t) : r.bounds(t), t instanceof r.Bounds ? (e = t.min, n = t.max) : e = n = t, e.x >= this.min.x && n.x <= this.max.x && e.y >= this.min.y && n.y <= this.max.y
          },
          intersects: function (t) {
            t = r.bounds(t);
            var e = this.min,
              n = this.max,
              i = t.min,
              o = t.max,
              s = o.x >= e.x && i.x <= n.x,
              a = o.y >= e.y && i.y <= n.y;
            return s && a
          },
          isValid: function () {
            return !(!this.min || !this.max)
          }
        }, r.bounds = function (t, e) {
          return !t || t instanceof r.Bounds ? t : new r.Bounds(t, e)
        }, r.Transformation = function (t, e, n, i) {
          this._a = t, this._b = e, this._c = n, this._d = i
        }, r.Transformation.prototype = {
          transform: function (t, e) {
            return this._transform(t.clone(), e)
          },
          _transform: function (t, e) {
            return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
          },
          untransform: function (t, e) {
            return e = e || 1, new r.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
          }
        }, r.DomUtil = {
          get: function (t) {
            return "string" == typeof t ? e.getElementById(t) : t
          },
          getStyle: function (t, n) {
            var i = t.style[n];
            if (!i && t.currentStyle && (i = t.currentStyle[n]), (!i || "auto" === i) && e.defaultView) {
              var o = e.defaultView.getComputedStyle(t, null);
              i = o ? o[n] : null
            }
            return "auto" === i ? null : i
          },
          getViewportOffset: function (t) {
            var n, i = 0,
              o = 0,
              s = t,
              a = e.body,
              l = e.documentElement;
            do {
              if (i += s.offsetTop || 0, o += s.offsetLeft || 0, i += parseInt(r.DomUtil.getStyle(s, "borderTopWidth"), 10) || 0, o += parseInt(r.DomUtil.getStyle(s, "borderLeftWidth"), 10) || 0, n = r.DomUtil.getStyle(s, "position"), s.offsetParent === a && "absolute" === n) break;
              if ("fixed" === n) {
                i += a.scrollTop || l.scrollTop || 0, o += a.scrollLeft || l.scrollLeft || 0;
                break
              }
              if ("relative" === n && !s.offsetLeft) {
                var u = r.DomUtil.getStyle(s, "width"),
                  c = r.DomUtil.getStyle(s, "max-width"),
                  h = s.getBoundingClientRect();
                ("none" !== u || "none" !== c) && (o += h.left + s.clientLeft), i += h.top + (a.scrollTop || l.scrollTop || 0);
                break
              }
              s = s.offsetParent
            } while (s);
            s = t;
            do {
              if (s === a) break;
              i -= s.scrollTop || 0, o -= s.scrollLeft || 0, s = s.parentNode
            } while (s);
            return new r.Point(o, i)
          },
          documentIsLtr: function () {
            return r.DomUtil._docIsLtrCached || (r.DomUtil._docIsLtrCached = !0, r.DomUtil._docIsLtr = "ltr" === r.DomUtil.getStyle(e.body, "direction")), r.DomUtil._docIsLtr
          },
          create: function (t, n, i) {
            var o = e.createElement(t);
            return o.className = n, i && i.appendChild(o), o
          },
          hasClass: function (t, e) {
            if (t.classList !== i) return t.classList.contains(e);
            var n = r.DomUtil._getClass(t);
            return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n)
          },
          addClass: function (t, e) {
            if (t.classList !== i)
              for (var n = r.Util.splitWords(e), o = 0, s = n.length; s > o; o++) t.classList.add(n[o]);
            else if (!r.DomUtil.hasClass(t, e)) {
              var a = r.DomUtil._getClass(t);
              r.DomUtil._setClass(t, (a ? a + " " : "") + e)
            }
          },
          removeClass: function (t, e) {
            t.classList !== i ? t.classList.remove(e) : r.DomUtil._setClass(t, r.Util.trim((" " + r.DomUtil._getClass(t) + " ").replace(" " + e + " ", " ")))
          },
          _setClass: function (t, e) {
            t.className.baseVal === i ? t.className = e : t.className.baseVal = e
          },
          _getClass: function (t) {
            return t.className.baseVal === i ? t.className : t.className.baseVal
          },
          setOpacity: function (t, e) {
            if ("opacity" in t.style) t.style.opacity = e;
            else if ("filter" in t.style) {
              var n = !1,
                i = "DXImageTransform.Microsoft.Alpha";
              try {
                n = t.filters.item(i)
              } catch (t) {
                if (1 === e) return
              }
              e = Math.round(100 * e), n ? (n.Enabled = 100 !== e, n.Opacity = e) : t.style.filter += " progid:" + i + "(opacity=" + e + ")"
            }
          },
          testProp: function (t) {
            for (var n = e.documentElement.style, i = 0; i < t.length; i++)
              if (t[i] in n) return t[i];
            return !1
          },
          getTranslateString: function (t) {
            var e = r.Browser.webkit3d,
              n = "translate" + (e ? "3d" : "") + "(",
              i = (e ? ",0" : "") + ")";
            return n + t.x + "px," + t.y + "px" + i
          },
          getScaleString: function (t, e) {
            var n = r.DomUtil.getTranslateString(e.add(e.multiplyBy(-1 * t))),
              i = " scale(" + t + ") ";
            return n + i
          },
          setPosition: function (t, e, n) {
            t._leaflet_pos = e, !n && r.Browser.any3d ? t.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
          },
          getPosition: function (t) {
            return t._leaflet_pos
          }
        }, r.DomUtil.TRANSFORM = r.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), r.DomUtil.TRANSITION = r.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), r.DomUtil.TRANSITION_END = "webkitTransition" === r.DomUtil.TRANSITION || "OTransition" === r.DomUtil.TRANSITION ? r.DomUtil.TRANSITION + "End" : "transitionend",
        function () {
          if ("onselectstart" in e) r.extend(r.DomUtil, {
            disableTextSelection: function () {
              r.DomEvent.on(t, "selectstart", r.DomEvent.preventDefault)
            },
            enableTextSelection: function () {
              r.DomEvent.off(t, "selectstart", r.DomEvent.preventDefault)
            }
          });
          else {
            var n = r.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            r.extend(r.DomUtil, {
              disableTextSelection: function () {
                if (n) {
                  var t = e.documentElement.style;
                  this._userSelect = t[n], t[n] = "none"
                }
              },
              enableTextSelection: function () {
                n && (e.documentElement.style[n] = this._userSelect, delete this._userSelect)
              }
            })
          }
          r.extend(r.DomUtil, {
            disableImageDrag: function () {
              r.DomEvent.on(t, "dragstart", r.DomEvent.preventDefault)
            },
            enableImageDrag: function () {
              r.DomEvent.off(t, "dragstart", r.DomEvent.preventDefault)
            }
          })
        }(), r.LatLng = function (t, e, n) {
          if (t = parseFloat(t), e = parseFloat(e), isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
          this.lat = t, this.lng = e, n !== i && (this.alt = parseFloat(n))
        }, r.extend(r.LatLng, {
          DEG_TO_RAD: Math.PI / 180,
          RAD_TO_DEG: 180 / Math.PI,
          MAX_MARGIN: 1e-9
        }), r.LatLng.prototype = {
          equals: function (t) {
            if (!t) return !1;
            t = r.latLng(t);
            var e = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
            return e <= r.LatLng.MAX_MARGIN
          },
          toString: function (t) {
            return "LatLng(" + r.Util.formatNum(this.lat, t) + ", " + r.Util.formatNum(this.lng, t) + ")"
          },
          distanceTo: function (t) {
            t = r.latLng(t);
            var e = 6378137,
              n = r.LatLng.DEG_TO_RAD,
              i = (t.lat - this.lat) * n,
              o = (t.lng - this.lng) * n,
              s = this.lat * n,
              a = t.lat * n,
              l = Math.sin(i / 2),
              u = Math.sin(o / 2),
              c = l * l + u * u * Math.cos(s) * Math.cos(a);
            return 2 * e * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c))
          },
          wrap: function (t, e) {
            var n = this.lng;
            return t = t || -180, e = e || 180, n = (n + e) % (e - t) + (t > n || n === e ? e : t), new r.LatLng(this.lat, n)
          }
        }, r.latLng = function (t, e) {
          return t instanceof r.LatLng ? t : r.Util.isArray(t) ? "number" == typeof t[0] || "string" == typeof t[0] ? new r.LatLng(t[0], t[1], t[2]) : null : t === i || null === t ? t : "object" == typeof t && "lat" in t ? new r.LatLng(t.lat, "lng" in t ? t.lng : t.lon) : e === i ? null : new r.LatLng(t, e)
        }, r.LatLngBounds = function (t, e) {
          if (t)
            for (var n = e ? [t, e] : t, i = 0, o = n.length; o > i; i++) this.extend(n[i])
        }, r.LatLngBounds.prototype = {
          extend: function (t) {
            if (!t) return this;
            var e = r.latLng(t);
            return t = null !== e ? e : r.latLngBounds(t), t instanceof r.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(t.lat, this._southWest.lat), this._southWest.lng = Math.min(t.lng, this._southWest.lng), this._northEast.lat = Math.max(t.lat, this._northEast.lat), this._northEast.lng = Math.max(t.lng, this._northEast.lng)) : (this._southWest = new r.LatLng(t.lat, t.lng), this._northEast = new r.LatLng(t.lat, t.lng)) : t instanceof r.LatLngBounds && (this.extend(t._southWest), this.extend(t._northEast)), this
          },
          pad: function (t) {
            var e = this._southWest,
              n = this._northEast,
              i = Math.abs(e.lat - n.lat) * t,
              o = Math.abs(e.lng - n.lng) * t;
            return new r.LatLngBounds(new r.LatLng(e.lat - i, e.lng - o), new r.LatLng(n.lat + i, n.lng + o))
          },
          getCenter: function () {
            return new r.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
          },
          getSouthWest: function () {
            return this._southWest
          },
          getNorthEast: function () {
            return this._northEast
          },
          getNorthWest: function () {
            return new r.LatLng(this.getNorth(), this.getWest())
          },
          getSouthEast: function () {
            return new r.LatLng(this.getSouth(), this.getEast())
          },
          getWest: function () {
            return this._southWest.lng
          },
          getSouth: function () {
            return this._southWest.lat
          },
          getEast: function () {
            return this._northEast.lng
          },
          getNorth: function () {
            return this._northEast.lat
          },
          contains: function (t) {
            t = "number" == typeof t[0] || t instanceof r.LatLng ? r.latLng(t) : r.latLngBounds(t);
            var e, n, i = this._southWest,
              o = this._northEast;
            return t instanceof r.LatLngBounds ? (e = t.getSouthWest(), n = t.getNorthEast()) : e = n = t, e.lat >= i.lat && n.lat <= o.lat && e.lng >= i.lng && n.lng <= o.lng
          },
          intersects: function (t) {
            t = r.latLngBounds(t);
            var e = this._southWest,
              n = this._northEast,
              i = t.getSouthWest(),
              o = t.getNorthEast(),
              s = o.lat >= e.lat && i.lat <= n.lat,
              a = o.lng >= e.lng && i.lng <= n.lng;
            return s && a
          },
          toBBoxString: function () {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
          },
          equals: function (t) {
            return !!t && (t = r.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
          },
          isValid: function () {
            return !(!this._southWest || !this._northEast)
          }
        }, r.latLngBounds = function (t, e) {
          return !t || t instanceof r.LatLngBounds ? t : new r.LatLngBounds(t, e)
        }, r.Projection = {}, r.Projection.SphericalMercator = {
          MAX_LATITUDE: 85.0511287798,
          project: function (t) {
            var e = r.LatLng.DEG_TO_RAD,
              n = this.MAX_LATITUDE,
              i = Math.max(Math.min(n, t.lat), -n),
              o = t.lng * e,
              s = i * e;
            return s = Math.log(Math.tan(Math.PI / 4 + s / 2)), new r.Point(o, s)
          },
          unproject: function (t) {
            var e = r.LatLng.RAD_TO_DEG,
              n = t.x * e,
              i = (2 * Math.atan(Math.exp(t.y)) - Math.PI / 2) * e;
            return new r.LatLng(i, n)
          }
        }, r.Projection.LonLat = {
          project: function (t) {
            return new r.Point(t.lng, t.lat)
          },
          unproject: function (t) {
            return new r.LatLng(t.y, t.x)
          }
        }, r.CRS = {
          latLngToPoint: function (t, e) {
            var n = this.projection.project(t),
              i = this.scale(e);
            return this.transformation._transform(n, i)
          },
          pointToLatLng: function (t, e) {
            var n = this.scale(e),
              i = this.transformation.untransform(t, n);
            return this.projection.unproject(i)
          },
          project: function (t) {
            return this.projection.project(t)
          },
          scale: function (t) {
            return 256 * Math.pow(2, t)
          },
          getSize: function (t) {
            var e = this.scale(t);
            return r.point(e, e)
          }
        }, r.CRS.Simple = r.extend({}, r.CRS, {
          projection: r.Projection.LonLat,
          transformation: new r.Transformation(1, 0, -1, 0),
          scale: function (t) {
            return Math.pow(2, t)
          }
        }), r.CRS.EPSG3857 = r.extend({}, r.CRS, {
          code: "EPSG:3857",
          projection: r.Projection.SphericalMercator,
          transformation: new r.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),
          project: function (t) {
            var e = this.projection.project(t),
              n = 6378137;
            return e.multiplyBy(n)
          }
        }), r.CRS.EPSG900913 = r.extend({}, r.CRS.EPSG3857, {
          code: "EPSG:900913"
        }), r.CRS.EPSG4326 = r.extend({}, r.CRS, {
          code: "EPSG:4326",
          projection: r.Projection.LonLat,
          transformation: new r.Transformation(1 / 360, .5, -1 / 360, .5)
        }), r.Map = r.Class.extend({
          includes: r.Mixin.Events,
          options: {
            crs: r.CRS.EPSG3857,
            fadeAnimation: r.DomUtil.TRANSITION && !r.Browser.android23,
            trackResize: !0,
            markerZoomAnimation: r.DomUtil.TRANSITION && r.Browser.any3d
          },
          initialize: function (t, e) {
            e = r.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = r.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.center && e.zoom !== i && this.setView(r.latLng(e.center), e.zoom, {
              reset: !0
            }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0, this.callInitHooks(), this._addLayers(e.layers)
          },
          setView: function (t, e) {
            return e = e === i ? this.getZoom() : e, this._resetView(r.latLng(t), this._limitZoom(e)), this
          },
          setZoom: function (t, e) {
            return this._loaded ? this.setView(this.getCenter(), t, {
              zoom: e
            }) : (this._zoom = this._limitZoom(t), this)
          },
          zoomIn: function (t, e) {
            return this.setZoom(this._zoom + (t || 1), e)
          },
          zoomOut: function (t, e) {
            return this.setZoom(this._zoom - (t || 1), e)
          },
          setZoomAround: function (t, e, n) {
            var i = this.getZoomScale(e),
              o = this.getSize().divideBy(2),
              s = t instanceof r.Point ? t : this.latLngToContainerPoint(t),
              a = s.subtract(o).multiplyBy(1 - 1 / i),
              l = this.containerPointToLatLng(o.add(a));
            return this.setView(l, e, {
              zoom: n
            })
          },
          fitBounds: function (t, e) {
            e = e || {}, t = t.getBounds ? t.getBounds() : r.latLngBounds(t);
            var n = r.point(e.paddingTopLeft || e.padding || [0, 0]),
              i = r.point(e.paddingBottomRight || e.padding || [0, 0]),
              o = this.getBoundsZoom(t, !1, n.add(i));
            o = e.maxZoom ? Math.min(e.maxZoom, o) : o;
            var s = i.subtract(n).divideBy(2),
              a = this.project(t.getSouthWest(), o),
              l = this.project(t.getNorthEast(), o),
              u = this.unproject(a.add(l).divideBy(2).add(s), o);
            return this.setView(u, o, e)
          },
          fitWorld: function (t) {
            return this.fitBounds([
              [-90, -180],
              [90, 180]
            ], t)
          },
          panTo: function (t, e) {
            return this.setView(t, this._zoom, {
              pan: e
            })
          },
          panBy: function (t) {
            return this.fire("movestart"), this._rawPanBy(r.point(t)), this.fire("move"), this.fire("moveend")
          },
          setMaxBounds: function (t) {
            return t = r.latLngBounds(t), this.options.maxBounds = t, t ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
          },
          panInsideBounds: function (t, e) {
            var n = this.getCenter(),
              i = this._limitCenter(n, this._zoom, t);
            return n.equals(i) ? this : this.panTo(i, e)
          },
          addLayer: function (t) {
            var e = r.stamp(t);
            return this._layers[e] ? this : (this._layers[e] = t, !t.options || isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[e] = t, this._updateZoomLevels()), this.options.zoomAnimation && r.TileLayer && t instanceof r.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, t.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(t), this)
          },
          removeLayer: function (t) {
            var e = r.stamp(t);
            return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && this.fire("layerremove", {
              layer: t
            }), this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels()), this.options.zoomAnimation && r.TileLayer && t instanceof r.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, t.off("load", this._onTileLayerLoad, this)), this) : this
          },
          hasLayer: function (t) {
            return !!t && r.stamp(t) in this._layers
          },
          eachLayer: function (t, e) {
            for (var n in this._layers) t.call(e, this._layers[n]);
            return this
          },
          invalidateSize: function (t) {
            if (!this._loaded) return this;
            t = r.extend({
              animate: !1,
              pan: !0
            }, t === !0 ? {
              animate: !0
            } : t);
            var e = this.getSize();
            this._sizeChanged = !0, this._initialCenter = null;
            var n = this.getSize(),
              i = e.divideBy(2).round(),
              o = n.divideBy(2).round(),
              s = i.subtract(o);
            return s.x || s.y ? (t.animate && t.pan ? this.panBy(s) : (t.pan && this._rawPanBy(s), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(r.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
              oldSize: e,
              newSize: n
            })) : this
          },
          addHandler: function (t, e) {
            if (!e) return this;
            var n = this[t] = new e(this);
            return this._handlers.push(n), this.options[t] && n.enable(), this
          },
          remove: function () {
            this._loaded && this.fire("unload"), this._initEvents("off");
            try {
              delete this._container._leaflet
            } catch (t) {
              this._container._leaflet = i
            }
            return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
          },
          getCenter: function () {
            return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
          },
          getZoom: function () {
            return this._zoom
          },
          getBounds: function () {
            var t = this.getPixelBounds(),
              e = this.unproject(t.getBottomLeft()),
              n = this.unproject(t.getTopRight());
            return new r.LatLngBounds(e, n)
          },
          getMinZoom: function () {
            return this.options.minZoom === i ? this._layersMinZoom === i ? 0 : this._layersMinZoom : this.options.minZoom
          },
          getMaxZoom: function () {
            return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
          },
          getBoundsZoom: function (t, e, n) {
            t = r.latLngBounds(t);
            var i, o = this.getMinZoom() - (e ? 1 : 0),
              s = this.getMaxZoom(),
              a = this.getSize(),
              l = t.getNorthWest(),
              u = t.getSouthEast(),
              c = !0;
            n = r.point(n || [0, 0]);
            do o++, i = this.project(u, o).subtract(this.project(l, o)).add(n), c = e ? i.x < a.x || i.y < a.y : a.contains(i); while (c && s >= o);
            return c && e ? null : e ? o : o - 1
          },
          getSize: function () {
            return (!this._size || this._sizeChanged) && (this._size = new r.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
          },
          getPixelBounds: function () {
            var t = this._getTopLeftPoint();
            return new r.Bounds(t, t.add(this.getSize()))
          },
          getPixelOrigin: function () {
            return this._checkIfLoaded(), this._initialTopLeftPoint
          },
          getPanes: function () {
            return this._panes
          },
          getContainer: function () {
            return this._container
          },
          getZoomScale: function (t) {
            var e = this.options.crs;
            return e.scale(t) / e.scale(this._zoom)
          },
          getScaleZoom: function (t) {
            return this._zoom + Math.log(t) / Math.LN2
          },
          project: function (t, e) {
            return e = e === i ? this._zoom : e, this.options.crs.latLngToPoint(r.latLng(t), e)
          },
          unproject: function (t, e) {
            return e = e === i ? this._zoom : e, this.options.crs.pointToLatLng(r.point(t), e)
          },
          layerPointToLatLng: function (t) {
            var e = r.point(t).add(this.getPixelOrigin());
            return this.unproject(e)
          },
          latLngToLayerPoint: function (t) {
            var e = this.project(r.latLng(t))._round();
            return e._subtract(this.getPixelOrigin())
          },
          containerPointToLayerPoint: function (t) {
            return r.point(t).subtract(this._getMapPanePos())
          },
          layerPointToContainerPoint: function (t) {
            return r.point(t).add(this._getMapPanePos())
          },
          containerPointToLatLng: function (t) {
            var e = this.containerPointToLayerPoint(r.point(t));
            return this.layerPointToLatLng(e)
          },
          latLngToContainerPoint: function (t) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(r.latLng(t)))
          },
          mouseEventToContainerPoint: function (t) {
            return r.DomEvent.getMousePosition(t, this._container)
          },
          mouseEventToLayerPoint: function (t) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
          },
          mouseEventToLatLng: function (t) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
          },
          _initContainer: function (t) {
            var e = this._container = r.DomUtil.get(t);
            if (!e) throw new Error("Map container not found.");
            if (e._leaflet) throw new Error("Map container is already initialized.");
            e._leaflet = !0
          },
          _initLayout: function () {
            var t = this._container;
            r.DomUtil.addClass(t, "leaflet-container" + (r.Browser.touch ? " leaflet-touch" : "") + (r.Browser.retina ? " leaflet-retina" : "") + (r.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
            var e = r.DomUtil.getStyle(t, "position");
            "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
          },
          _initPanes: function () {
            var t = this._panes = {};
            this._mapPane = t.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = t.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), t.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), t.shadowPane = this._createPane("leaflet-shadow-pane"), t.overlayPane = this._createPane("leaflet-overlay-pane"), t.markerPane = this._createPane("leaflet-marker-pane"), t.popupPane = this._createPane("leaflet-popup-pane");
            var e = " leaflet-zoom-hide";
            this.options.markerZoomAnimation || (r.DomUtil.addClass(t.markerPane, e), r.DomUtil.addClass(t.shadowPane, e), r.DomUtil.addClass(t.popupPane, e))
          },
          _createPane: function (t, e) {
            return r.DomUtil.create("div", t, e || this._panes.objectsPane)
          },
          _clearPanes: function () {
            this._container.removeChild(this._mapPane)
          },
          _addLayers: function (t) {
            t = t ? r.Util.isArray(t) ? t : [t] : [];
            for (var e = 0, n = t.length; n > e; e++) this.addLayer(t[e])
          },
          _resetView: function (t, e, n, i) {
            var o = this._zoom !== e;
            i || (this.fire("movestart"), o && this.fire("zoomstart")), this._zoom = e, this._initialCenter = t, this._initialTopLeftPoint = this._getNewTopLeftPoint(t), n ? this._initialTopLeftPoint._add(this._getMapPanePos()) : r.DomUtil.setPosition(this._mapPane, new r.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
            var s = !this._loaded;
            this._loaded = !0, this.fire("viewreset", {
              hard: !n
            }), s && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("move"), (o || i) && this.fire("zoomend"), this.fire("moveend", {
              hard: !n
            })
          },
          _rawPanBy: function (t) {
            r.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
          },
          _getZoomSpan: function () {
            return this.getMaxZoom() - this.getMinZoom()
          },
          _updateZoomLevels: function () {
            var t, e = 1 / 0,
              n = -(1 / 0),
              o = this._getZoomSpan();
            for (t in this._zoomBoundLayers) {
              var r = this._zoomBoundLayers[t];
              isNaN(r.options.minZoom) || (e = Math.min(e, r.options.minZoom)), isNaN(r.options.maxZoom) || (n = Math.max(n, r.options.maxZoom))
            }
            t === i ? this._layersMaxZoom = this._layersMinZoom = i : (this._layersMaxZoom = n, this._layersMinZoom = e), o !== this._getZoomSpan() && this.fire("zoomlevelschange")
          },
          _panInsideMaxBounds: function () {
            this.panInsideBounds(this.options.maxBounds)
          },
          _checkIfLoaded: function () {
            if (!this._loaded) throw new Error("Set map center and zoom first.")
          },
          _initEvents: function (e) {
            if (r.DomEvent) {
              e = e || "on", r.DomEvent[e](this._container, "click", this._onMouseClick, this);
              var n, i, o = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
              for (n = 0, i = o.length; i > n; n++) r.DomEvent[e](this._container, o[n], this._fireMouseEvent, this);
              this.options.trackResize && r.DomEvent[e](t, "resize", this._onResize, this)
            }
          },
          _onResize: function () {
            r.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = r.Util.requestAnimFrame(function () {
              this.invalidateSize({
                debounceMoveend: !0
              })
            }, this, !1, this._container)
          },
          _onMouseClick: function (t) {
            !this._loaded || !t._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || r.DomEvent._skipped(t) || (this.fire("preclick"), this._fireMouseEvent(t))
          },
          _fireMouseEvent: function (t) {
            if (this._loaded && !r.DomEvent._skipped(t)) {
              var e = t.type;
              if (e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e)) {
                "contextmenu" === e && r.DomEvent.preventDefault(t);
                var n = this.mouseEventToContainerPoint(t),
                  i = this.containerPointToLayerPoint(n),
                  o = this.layerPointToLatLng(i);
                this.fire(e, {
                  latlng: o,
                  layerPoint: i,
                  containerPoint: n,
                  originalEvent: t
                })
              }
            }
          },
          _onTileLayerLoad: function () {
            this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
          },
          _clearHandlers: function () {
            for (var t = 0, e = this._handlers.length; e > t; t++) this._handlers[t].disable()
          },
          whenReady: function (t, e) {
            return this._loaded ? t.call(e || this, this) : this.on("load", t, e), this
          },
          _layerAdd: function (t) {
            t.onAdd(this), this.fire("layeradd", {
              layer: t
            })
          },
          _getMapPanePos: function () {
            return r.DomUtil.getPosition(this._mapPane)
          },
          _moved: function () {
            var t = this._getMapPanePos();
            return t && !t.equals([0, 0])
          },
          _getTopLeftPoint: function () {
            return this.getPixelOrigin().subtract(this._getMapPanePos())
          },
          _getNewTopLeftPoint: function (t, e) {
            var n = this.getSize()._divideBy(2);
            return this.project(t, e)._subtract(n)._round()
          },
          _latLngToNewLayerPoint: function (t, e, n) {
            var i = this._getNewTopLeftPoint(n, e).add(this._getMapPanePos());
            return this.project(t, e)._subtract(i)
          },
          _getCenterLayerPoint: function () {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
          },
          _getCenterOffset: function (t) {
            return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
          },
          _limitCenter: function (t, e, n) {
            if (!n) return t;
            var i = this.project(t, e),
              o = this.getSize().divideBy(2),
              s = new r.Bounds(i.subtract(o), i.add(o)),
              a = this._getBoundsOffset(s, n, e);
            return this.unproject(i.add(a), e)
          },
          _limitOffset: function (t, e) {
            if (!e) return t;
            var n = this.getPixelBounds(),
              i = new r.Bounds(n.min.add(t), n.max.add(t));
            return t.add(this._getBoundsOffset(i, e))
          },
          _getBoundsOffset: function (t, e, n) {
            var i = this.project(e.getNorthWest(), n).subtract(t.min),
              o = this.project(e.getSouthEast(), n).subtract(t.max),
              s = this._rebound(i.x, -o.x),
              a = this._rebound(i.y, -o.y);
            return new r.Point(s, a)
          },
          _rebound: function (t, e) {
            return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
          },
          _limitZoom: function (t) {
            var e = this.getMinZoom(),
              n = this.getMaxZoom();
            return Math.max(e, Math.min(n, t))
          }
        }), r.map = function (t, e) {
          return new r.Map(t, e)
        }, r.Projection.Mercator = {
          MAX_LATITUDE: 85.0840591556,
          R_MINOR: 6356752.314245179,
          R_MAJOR: 6378137,
          project: function (t) {
            var e = r.LatLng.DEG_TO_RAD,
              n = this.MAX_LATITUDE,
              i = Math.max(Math.min(n, t.lat), -n),
              o = this.R_MAJOR,
              s = this.R_MINOR,
              a = t.lng * e * o,
              l = i * e,
              u = s / o,
              c = Math.sqrt(1 - u * u),
              h = c * Math.sin(l);
            h = Math.pow((1 - h) / (1 + h), .5 * c);
            var p = Math.tan(.5 * (.5 * Math.PI - l)) / h;
            return l = -o * Math.log(p), new r.Point(a, l)
          },
          unproject: function (t) {
            for (var e, n = r.LatLng.RAD_TO_DEG, i = this.R_MAJOR, o = this.R_MINOR, s = t.x * n / i, a = o / i, l = Math.sqrt(1 - a * a), u = Math.exp(-t.y / i), c = Math.PI / 2 - 2 * Math.atan(u), h = 15, p = 1e-7, f = h, d = .1; Math.abs(d) > p && --f > 0;) e = l * Math.sin(c), d = Math.PI / 2 - 2 * Math.atan(u * Math.pow((1 - e) / (1 + e), .5 * l)) - c, c += d;
            return new r.LatLng(c * n, s)
          }
        }, r.CRS.EPSG3395 = r.extend({}, r.CRS, {
          code: "EPSG:3395",
          projection: r.Projection.Mercator,
          transformation: function () {
            var t = r.Projection.Mercator,
              e = t.R_MAJOR,
              n = .5 / (Math.PI * e);
            return new r.Transformation(n, .5, -n, .5)
          }()
        }), r.TileLayer = r.Class.extend({
          includes: r.Mixin.Events,
          options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: "abc",
            errorTileUrl: "",
            attribution: "",
            zoomOffset: 0,
            opacity: 1,
            unloadInvisibleTiles: r.Browser.mobile,
            updateWhenIdle: r.Browser.mobile
          },
          initialize: function (t, e) {
            e = r.setOptions(this, e), e.detectRetina && r.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomOffset++, e.minZoom > 0 && e.minZoom--, this.options.maxZoom--), e.bounds && (e.bounds = r.latLngBounds(e.bounds)), this._url = t;
            var n = this.options.subdomains;
            "string" == typeof n && (this.options.subdomains = n.split(""))
          },
          onAdd: function (t) {
            this._map = t, this._animated = t._zoomAnimated, this._initContainer(), t.on({
              viewreset: this._reset,
              moveend: this._update
            }, this), this._animated && t.on({
              zoomanim: this._animateZoom,
              zoomend: this._endZoomAnim
            }, this), this.options.updateWhenIdle || (this._limitedUpdate = r.Util.limitExecByInterval(this._update, 150, this), t.on("move", this._limitedUpdate, this)), this._reset(), this._update()
          },
          addTo: function (t) {
            return t.addLayer(this), this
          },
          onRemove: function (t) {
            this._container.parentNode.removeChild(this._container), t.off({
              viewreset: this._reset,
              moveend: this._update
            }, this), this._animated && t.off({
              zoomanim: this._animateZoom,
              zoomend: this._endZoomAnim
            }, this), this.options.updateWhenIdle || t.off("move", this._limitedUpdate, this), this._container = null, this._map = null
          },
          bringToFront: function () {
            var t = this._map._panes.tilePane;
            return this._container && (t.appendChild(this._container), this._setAutoZIndex(t, Math.max)), this
          },
          bringToBack: function () {
            var t = this._map._panes.tilePane;
            return this._container && (t.insertBefore(this._container, t.firstChild), this._setAutoZIndex(t, Math.min)), this
          },
          getAttribution: function () {
            return this.options.attribution
          },
          getContainer: function () {
            return this._container
          },
          setOpacity: function (t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this
          },
          setZIndex: function (t) {
            return this.options.zIndex = t, this._updateZIndex(), this
          },
          setUrl: function (t, e) {
            return this._url = t, e || this.redraw(), this
          },
          redraw: function () {
            return this._map && (this._reset({
              hard: !0
            }), this._update()), this
          },
          _updateZIndex: function () {
            this._container && this.options.zIndex !== i && (this._container.style.zIndex = this.options.zIndex)
          },
          _setAutoZIndex: function (t, e) {
            var n, i, o, r = t.children,
              s = -e(1 / 0, -(1 / 0));
            for (i = 0, o = r.length; o > i; i++) r[i] !== this._container && (n = parseInt(r[i].style.zIndex, 10), isNaN(n) || (s = e(s, n)));
            this.options.zIndex = this._container.style.zIndex = (isFinite(s) ? s : 0) + e(1, -1)
          },
          _updateOpacity: function () {
            var t, e = this._tiles;
            if (r.Browser.ielt9)
              for (t in e) r.DomUtil.setOpacity(e[t], this.options.opacity);
            else r.DomUtil.setOpacity(this._container, this.options.opacity)
          },
          _initContainer: function () {
            var t = this._map._panes.tilePane;
            if (!this._container) {
              if (this._container = r.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
                var e = "leaflet-tile-container";
                this._bgBuffer = r.DomUtil.create("div", e, this._container), this._tileContainer = r.DomUtil.create("div", e, this._container)
              } else this._tileContainer = this._container;
              t.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
            }
          },
          _reset: function (t) {
            for (var e in this._tiles) this.fire("tileunload", {
              tile: this._tiles[e]
            });
            this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && t && t.hard && this._clearBgBuffer(), this._initContainer()
          },
          _getTileSize: function () {
            var t = this._map,
              e = t.getZoom() + this.options.zoomOffset,
              n = this.options.maxNativeZoom,
              i = this.options.tileSize;
            return n && e > n && (i = Math.round(t.getZoomScale(e) / t.getZoomScale(n) * i)), i
          },
          _update: function () {
            if (this._map) {
              var t = this._map,
                e = t.getPixelBounds(),
                n = t.getZoom(),
                i = this._getTileSize();
              if (!(n > this.options.maxZoom || n < this.options.minZoom)) {
                var o = r.bounds(e.min.divideBy(i)._floor(), e.max.divideBy(i)._floor());
                this._addTilesFromCenterOut(o), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(o)
              }
            }
          },
          _addTilesFromCenterOut: function (t) {
            var n, i, o, s = [],
              a = t.getCenter();
            for (n = t.min.y; n <= t.max.y; n++)
              for (i = t.min.x; i <= t.max.x; i++) o = new r.Point(i, n), this._tileShouldBeLoaded(o) && s.push(o);
            var l = s.length;
            if (0 !== l) {
              s.sort(function (t, e) {
                return t.distanceTo(a) - e.distanceTo(a)
              });
              var u = e.createDocumentFragment();
              for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += l, i = 0; l > i; i++) this._addTile(s[i], u);
              this._tileContainer.appendChild(u)
            }
          },
          _tileShouldBeLoaded: function (t) {
            if (t.x + ":" + t.y in this._tiles) return !1;
            var e = this.options;
            if (!e.continuousWorld) {
              var n = this._getWrapTileNum();
              if (e.noWrap && (t.x < 0 || t.x >= n.x) || t.y < 0 || t.y >= n.y) return !1
            }
            if (e.bounds) {
              var i = this._getTileSize(),
                o = t.multiplyBy(i),
                r = o.add([i, i]),
                s = this._map.unproject(o),
                a = this._map.unproject(r);
              if (e.continuousWorld || e.noWrap || (s = s.wrap(), a = a.wrap()), !e.bounds.intersects([s, a])) return !1
            }
            return !0
          },
          _removeOtherTiles: function (t) {
            var e, n, i, o;
            for (o in this._tiles) e = o.split(":"), n = parseInt(e[0], 10), i = parseInt(e[1], 10), (n < t.min.x || n > t.max.x || i < t.min.y || i > t.max.y) && this._removeTile(o)
          },
          _removeTile: function (t) {
            var e = this._tiles[t];
            this.fire("tileunload", {
              tile: e,
              url: e.src
            }), this.options.reuseTiles ? (r.DomUtil.removeClass(e, "leaflet-tile-loaded"), this._unusedTiles.push(e)) : e.parentNode === this._tileContainer && this._tileContainer.removeChild(e), r.Browser.android || (e.onload = null, e.src = r.Util.emptyImageUrl), delete this._tiles[t]
          },
          _addTile: function (t, e) {
            var n = this._getTilePos(t),
              i = this._getTile();
            r.DomUtil.setPosition(i, n, r.Browser.chrome), this._tiles[t.x + ":" + t.y] = i, this._loadTile(i, t), i.parentNode !== this._tileContainer && e.appendChild(i)
          },
          _getZoomForUrl: function () {
            var t = this.options,
              e = this._map.getZoom();
            return t.zoomReverse && (e = t.maxZoom - e), e += t.zoomOffset, t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
          },
          _getTilePos: function (t) {
            var e = this._map.getPixelOrigin(),
              n = this._getTileSize();
            return t.multiplyBy(n).subtract(e)
          },
          getTileUrl: function (t) {
            return r.Util.template(this._url, r.extend({
              s: this._getSubdomain(t),
              z: t.z,
              x: t.x,
              y: t.y
            }, this.options))
          },
          _getWrapTileNum: function () {
            var t = this._map.options.crs,
              e = t.getSize(this._map.getZoom());
            return e.divideBy(this._getTileSize())._floor()
          },
          _adjustTilePoint: function (t) {
            var e = this._getWrapTileNum();
            this.options.continuousWorld || this.options.noWrap || (t.x = (t.x % e.x + e.x) % e.x), this.options.tms && (t.y = e.y - t.y - 1), t.z = this._getZoomForUrl()
          },
          _getSubdomain: function (t) {
            var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[e]
          },
          _getTile: function () {
            if (this.options.reuseTiles && this._unusedTiles.length > 0) {
              var t = this._unusedTiles.pop();
              return this._resetTile(t), t
            }
            return this._createTile()
          },
          _resetTile: function () {},
          _createTile: function () {
            var t = r.DomUtil.create("images", "leaflet-tile");
            return t.style.width = t.style.height = this._getTileSize() + "px", t.galleryimg = "no", t.onselectstart = t.onmousemove = r.Util.falseFn, r.Browser.ielt9 && this.options.opacity !== i && r.DomUtil.setOpacity(t, this.options.opacity), r.Browser.mobileWebkit3d && (t.style.WebkitBackfaceVisibility = "hidden"), t
          },
          _loadTile: function (t, e) {
            t._layer = this, t.onload = this._tileOnLoad, t.onerror = this._tileOnError, this._adjustTilePoint(e), t.src = this.getTileUrl(e), this.fire("tileloadstart", {
              tile: t,
              url: t.src
            })
          },
          _tileLoaded: function () {
            this._tilesToLoad--, this._animated && r.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated"), this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(r.bind(this._clearBgBuffer, this), 500)))
          },
          _tileOnLoad: function () {
            var t = this._layer;
            this.src !== r.Util.emptyImageUrl && (r.DomUtil.addClass(this, "leaflet-tile-loaded"), t.fire("tileload", {
              tile: this,
              url: this.src
            })), t._tileLoaded()
          },
          _tileOnError: function () {
            var t = this._layer;
            t.fire("tileerror", {
              tile: this,
              url: this.src
            });
            var e = t.options.errorTileUrl;
            e && (this.src = e), t._tileLoaded()
          }
        }), r.tileLayer = function (t, e) {
          return new r.TileLayer(t, e)
        }, r.TileLayer.WMS = r.TileLayer.extend({
          defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            version: "1.1.1",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1
          },
          initialize: function (t, e) {
            this._url = t;
            var n = r.extend({}, this.defaultWmsParams),
              i = e.tileSize || this.options.tileSize;
            e.detectRetina && r.Browser.retina ? n.width = n.height = 2 * i : n.width = n.height = i;
            for (var o in e) this.options.hasOwnProperty(o) || "crs" === o || (n[o] = e[o]);
            this.wmsParams = n, r.setOptions(this, e)
          },
          onAdd: function (t) {
            this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[e] = this._crs.code, r.TileLayer.prototype.onAdd.call(this, t)
          },
          getTileUrl: function (t) {
            var e = this._map,
              n = this.options.tileSize,
              i = t.multiplyBy(n),
              o = i.add([n, n]),
              s = this._crs.project(e.unproject(i, t.z)),
              a = this._crs.project(e.unproject(o, t.z)),
              l = this._wmsVersion >= 1.3 && this._crs === r.CRS.EPSG4326 ? [a.y, s.x, s.y, a.x].join(",") : [s.x, a.y, a.x, s.y].join(","),
              u = r.Util.template(this._url, {
                s: this._getSubdomain(t)
              });
            return u + r.Util.getParamString(this.wmsParams, u, !0) + "&BBOX=" + l
          },
          setParams: function (t, e) {
            return r.extend(this.wmsParams, t), e || this.redraw(), this
          }
        }), r.tileLayer.wms = function (t, e) {
          return new r.TileLayer.WMS(t, e)
        }, r.TileLayer.Canvas = r.TileLayer.extend({
          options: {
            async: !1
          },
          initialize: function (t) {
            r.setOptions(this, t)
          },
          redraw: function () {
            this._map && (this._reset({
              hard: !0
            }), this._update());
            for (var t in this._tiles) this._redrawTile(this._tiles[t]);
            return this
          },
          _redrawTile: function (t) {
            this.drawTile(t, t._tilePoint, this._map._zoom)
          },
          _createTile: function () {
            var t = r.DomUtil.create("canvas", "leaflet-tile");
            return t.width = t.height = this.options.tileSize, t.onselectstart = t.onmousemove = r.Util.falseFn, t
          },
          _loadTile: function (t, e) {
            t._layer = this, t._tilePoint = e, this._redrawTile(t), this.options.async || this.tileDrawn(t)
          },
          drawTile: function () {},
          tileDrawn: function (t) {
            this._tileOnLoad.call(t)
          }
        }), r.tileLayer.canvas = function (t) {
          return new r.TileLayer.Canvas(t)
        }, r.ImageOverlay = r.Class.extend({
          includes: r.Mixin.Events,
          options: {
            opacity: 1
          },
          initialize: function (t, e, n) {
            this._url = t, this._bounds = r.latLngBounds(e), r.setOptions(this, n)
          },
          onAdd: function (t) {
            this._map = t, this._image || this._initImage(), t._panes.overlayPane.appendChild(this._image), t.on("viewreset", this._reset, this), t.options.zoomAnimation && r.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset()
          },
          onRemove: function (t) {
            t.getPanes().overlayPane.removeChild(this._image), t.off("viewreset", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this)
          },
          addTo: function (t) {
            return t.addLayer(this), this
          },
          setOpacity: function (t) {
            return this.options.opacity = t, this._updateOpacity(), this
          },
          bringToFront: function () {
            return this._image && this._map._panes.overlayPane.appendChild(this._image), this
          },
          bringToBack: function () {
            var t = this._map._panes.overlayPane;
            return this._image && t.insertBefore(this._image, t.firstChild), this
          },
          setUrl: function (t) {
            this._url = t, this._image.src = this._url
          },
          getAttribution: function () {
            return this.options.attribution
          },
          _initImage: function () {
            this._image = r.DomUtil.create("images", "leaflet-image-layer"), this._map.options.zoomAnimation && r.Browser.any3d ? r.DomUtil.addClass(this._image, "leaflet-zoom-animated") : r.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), r.extend(this._image, {
              galleryimg: "no",
              onselectstart: r.Util.falseFn,
              onmousemove: r.Util.falseFn,
              onload: r.bind(this._onImageLoad, this),
              src: this._url
            })
          },
          _animateZoom: function (t) {
            var e = this._map,
              n = this._image,
              i = e.getZoomScale(t.zoom),
              o = this._bounds.getNorthWest(),
              s = this._bounds.getSouthEast(),
              a = e._latLngToNewLayerPoint(o, t.zoom, t.center),
              l = e._latLngToNewLayerPoint(s, t.zoom, t.center)._subtract(a),
              u = a._add(l._multiplyBy(.5 * (1 - 1 / i)));
            n.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(u) + " scale(" + i + ") "
          },
          _reset: function () {
            var t = this._image,
              e = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
              n = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(e);
            r.DomUtil.setPosition(t, e), t.style.width = n.x + "px", t.style.height = n.y + "px"
          },
          _onImageLoad: function () {
            this.fire("load")
          },
          _updateOpacity: function () {
            r.DomUtil.setOpacity(this._image, this.options.opacity)
          }
        }), r.imageOverlay = function (t, e, n) {
          return new r.ImageOverlay(t, e, n)
        }, r.Icon = r.Class.extend({
          options: {
            className: ""
          },
          initialize: function (t) {
            r.setOptions(this, t)
          },
          createIcon: function (t) {
            return this._createIcon("icon", t)
          },
          createShadow: function (t) {
            return this._createIcon("shadow", t)
          },
          _createIcon: function (t, e) {
            var n = this._getIconUrl(t);
            if (!n) {
              if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
              return null
            }
            var i;
            return i = e && "IMG" === e.tagName ? this._createImg(n, e) : this._createImg(n), this._setIconStyles(i, t), i
          },
          _setIconStyles: function (t, e) {
            var n, i = this.options,
              o = r.point(i[e + "Size"]);
            n = "shadow" === e ? r.point(i.shadowAnchor || i.iconAnchor) : r.point(i.iconAnchor), !n && o && (n = o.divideBy(2, !0)), t.className = "leaflet-marker-" + e + " " + i.className, n && (t.style.marginLeft = -n.x + "px", t.style.marginTop = -n.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px")
          },
          _createImg: function (t, n) {
            return n = n || e.createElement("images"), n.src = t, n
          },
          _getIconUrl: function (t) {
            return r.Browser.retina && this.options[t + "RetinaUrl"] ? this.options[t + "RetinaUrl"] : this.options[t + "Url"]
          }
        }), r.icon = function (t) {
          return new r.Icon(t)
        }, r.Icon.Default = r.Icon.extend({
          options: {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          },
          _getIconUrl: function (t) {
            var e = t + "Url";
            if (this.options[e]) return this.options[e];
            r.Browser.retina && "icon" === t && (t += "-2x");
            var n = r.Icon.Default.imagePath;
            if (!n) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
            return n + "/marker-" + t + ".png"
          }
        }), r.Icon.Default.imagePath = function () {
          var t, n, i, o, r, s = e.getElementsByTagName("script"),
            a = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
          for (t = 0, n = s.length; n > t; t++)
            if (i = s[t].src, o = i.match(a)) return r = i.split(a)[0], (r ? r + "/" : "") + "images"
        }(), r.Marker = r.Class.extend({
          includes: r.Mixin.Events,
          options: {
            icon: new r.Icon.Default,
            title: "",
            alt: "",
            clickable: !0,
            draggable: !1,
            keyboard: !0,
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250
          },
          initialize: function (t, e) {
            r.setOptions(this, e), this._latlng = r.latLng(t)
          },
          onAdd: function (t) {
            this._map = t, t.on("viewreset", this.update, this), this._initIcon(), this.update(), this.fire("add"), t.options.zoomAnimation && t.options.markerZoomAnimation && t.on("zoomanim", this._animateZoom, this)
          },
          addTo: function (t) {
            return t.addLayer(this), this
          },
          onRemove: function (t) {
            this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow(), this.fire("remove"), t.off({
              viewreset: this.update,
              zoomanim: this._animateZoom
            }, this), this._map = null
          },
          getLatLng: function () {
            return this._latlng
          },
          setLatLng: function (t) {
            return this._latlng = r.latLng(t), this.update(), this.fire("move", {
              latlng: this._latlng
            })
          },
          setZIndexOffset: function (t) {
            return this.options.zIndexOffset = t, this.update(), this
          },
          setIcon: function (t) {
            return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
          },
          update: function () {
            return this._icon && this._setPos(this._map.latLngToLayerPoint(this._latlng).round()), this
          },
          _initIcon: function () {
            var t = this.options,
              e = this._map,
              n = e.options.zoomAnimation && e.options.markerZoomAnimation,
              i = n ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
              o = t.icon.createIcon(this._icon),
              s = !1;
            o !== this._icon && (this._icon && this._removeIcon(), s = !0, t.title && (o.title = t.title), t.alt && (o.alt = t.alt)), r.DomUtil.addClass(o, i), t.keyboard && (o.tabIndex = "0"), this._icon = o, this._initInteraction(), t.riseOnHover && r.DomEvent.on(o, "mouseover", this._bringToFront, this).on(o, "mouseout", this._resetZIndex, this);
            var a = t.icon.createShadow(this._shadow),
              l = !1;
            a !== this._shadow && (this._removeShadow(), l = !0), a && r.DomUtil.addClass(a, i), this._shadow = a, t.opacity < 1 && this._updateOpacity();
            var u = this._map._panes;
            s && u.markerPane.appendChild(this._icon), a && l && u.shadowPane.appendChild(this._shadow)
          },
          _removeIcon: function () {
            this.options.riseOnHover && r.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), this._map._panes.markerPane.removeChild(this._icon), this._icon = null
          },
          _removeShadow: function () {
            this._shadow && this._map._panes.shadowPane.removeChild(this._shadow), this._shadow = null
          },
          _setPos: function (t) {
            r.DomUtil.setPosition(this._icon, t), this._shadow && r.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
          },
          _updateZIndex: function (t) {
            this._icon.style.zIndex = this._zIndex + t
          },
          _animateZoom: function (t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
            this._setPos(e)
          },
          _initInteraction: function () {
            if (this.options.clickable) {
              var t = this._icon,
                e = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
              r.DomUtil.addClass(t, "leaflet-clickable"), r.DomEvent.on(t, "click", this._onMouseClick, this), r.DomEvent.on(t, "keypress", this._onKeyPress, this);
              for (var n = 0; n < e.length; n++) r.DomEvent.on(t, e[n], this._fireMouseEvent, this);
              r.Handler.MarkerDrag && (this.dragging = new r.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
            }
          },
          _onMouseClick: function (t) {
            var e = this.dragging && this.dragging.moved();
            (this.hasEventListeners(t.type) || e) && r.DomEvent.stopPropagation(t), e || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(t.type, {
              originalEvent: t,
              latlng: this._latlng
            })
          },
          _onKeyPress: function (t) {
            13 === t.keyCode && this.fire("click", {
              originalEvent: t,
              latlng: this._latlng
            })
          },
          _fireMouseEvent: function (t) {
            this.fire(t.type, {
              originalEvent: t,
              latlng: this._latlng
            }), "contextmenu" === t.type && this.hasEventListeners(t.type) && r.DomEvent.preventDefault(t), "mousedown" !== t.type ? r.DomEvent.stopPropagation(t) : r.DomEvent.preventDefault(t)
          },
          setOpacity: function (t) {
            return this.options.opacity = t, this._map && this._updateOpacity(), this
          },
          _updateOpacity: function () {
            r.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && r.DomUtil.setOpacity(this._shadow, this.options.opacity)
          },
          _bringToFront: function () {
            this._updateZIndex(this.options.riseOffset)
          },
          _resetZIndex: function () {
            this._updateZIndex(0)
          }
        }), r.marker = function (t, e) {
          return new r.Marker(t, e)
        }, r.DivIcon = r.Icon.extend({
          options: {
            iconSize: [12, 12],
            className: "leaflet-div-icon",
            html: !1
          },
          createIcon: function (t) {
            var n = t && "DIV" === t.tagName ? t : e.createElement("div"),
              i = this.options;
            return i.html !== !1 ? n.innerHTML = i.html : n.innerHTML = "", i.bgPos && (n.style.backgroundPosition = -i.bgPos.x + "px " + -i.bgPos.y + "px"), this._setIconStyles(n, "icon"), n
          },
          createShadow: function () {
            return null
          }
        }), r.divIcon = function (t) {
          return new r.DivIcon(t)
        }, r.Map.mergeOptions({
          closePopupOnClick: !0
        }), r.Popup = r.Class.extend({
          includes: r.Mixin.Events,
          options: {
            minWidth: 50,
            maxWidth: 300,
            autoPan: !0,
            closeButton: !0,
            offset: [0, 7],
            autoPanPadding: [5, 5],
            keepInView: !1,
            className: "",
            zoomAnimation: !0
          },
          initialize: function (t, e) {
            r.setOptions(this, t), this._source = e, this._animated = r.Browser.any3d && this.options.zoomAnimation, this._isOpen = !1
          },
          onAdd: function (t) {
            this._map = t, this._container || this._initLayout();
            var e = t.options.fadeAnimation;
            e && r.DomUtil.setOpacity(this._container, 0), t._panes.popupPane.appendChild(this._container), t.on(this._getEvents(), this), this.update(), e && r.DomUtil.setOpacity(this._container, 1), this.fire("open"), t.fire("popupopen", {
              popup: this
            }), this._source && this._source.fire("popupopen", {
              popup: this
            })
          },
          addTo: function (t) {
            return t.addLayer(this), this
          },
          openOn: function (t) {
            return t.openPopup(this), this
          },
          onRemove: function (t) {
            t._panes.popupPane.removeChild(this._container), r.Util.falseFn(this._container.offsetWidth), t.off(this._getEvents(), this), t.options.fadeAnimation && r.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), t.fire("popupclose", {
              popup: this
            }), this._source && this._source.fire("popupclose", {
              popup: this
            })
          },
          getLatLng: function () {
            return this._latlng
          },
          setLatLng: function (t) {
            return this._latlng = r.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
          },
          getContent: function () {
            return this._content
          },
          setContent: function (t) {
            return this._content = t, this.update(), this
          },
          update: function () {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
          },
          _getEvents: function () {
            var t = {
              viewreset: this._updatePosition
            };
            return this._animated && (t.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
          },
          _close: function () {
            this._map && this._map.closePopup(this)
          },
          _initLayout: function () {
            var t, e = "leaflet-popup",
              n = e + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"),
              i = this._container = r.DomUtil.create("div", n);
            this.options.closeButton && (t = this._closeButton = r.DomUtil.create("a", e + "-close-button", i), t.href = "#close", t.innerHTML = "&#215;", r.DomEvent.disableClickPropagation(t), r.DomEvent.on(t, "click", this._onCloseButtonClick, this));
            var o = this._wrapper = r.DomUtil.create("div", e + "-content-wrapper", i);
            r.DomEvent.disableClickPropagation(o), this._contentNode = r.DomUtil.create("div", e + "-content", o), r.DomEvent.disableScrollPropagation(this._contentNode), r.DomEvent.on(o, "contextmenu", r.DomEvent.stopPropagation), this._tipContainer = r.DomUtil.create("div", e + "-tip-container", i), this._tip = r.DomUtil.create("div", e + "-tip", this._tipContainer)
          },
          _updateContent: function () {
            if (this._content) {
              if ("string" == typeof this._content) this._contentNode.innerHTML = this._content;
              else {
                for (; this._contentNode.hasChildNodes();) this._contentNode.removeChild(this._contentNode.firstChild);
                this._contentNode.appendChild(this._content)
              }
              this.fire("contentupdate")
            }
          },
          _updateLayout: function () {
            var t = this._contentNode,
              e = t.style;
            e.width = "", e.whiteSpace = "nowrap";
            var n = t.offsetWidth;
            n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), e.width = n + 1 + "px", e.whiteSpace = "", e.height = "";
            var i = t.offsetHeight,
              o = this.options.maxHeight,
              s = "leaflet-popup-scrolled";
            o && i > o ? (e.height = o + "px", r.DomUtil.addClass(t, s)) : r.DomUtil.removeClass(t, s), this._containerWidth = this._container.offsetWidth
          },
          _updatePosition: function () {
            if (this._map) {
              var t = this._map.latLngToLayerPoint(this._latlng),
                e = this._animated,
                n = r.point(this.options.offset);
              e && r.DomUtil.setPosition(this._container, t), this._containerBottom = -n.y - (e ? 0 : t.y), this._containerLeft = -Math.round(this._containerWidth / 2) + n.x + (e ? 0 : t.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
            }
          },
          _zoomAnimation: function (t) {
            var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            r.DomUtil.setPosition(this._container, e)
          },
          _adjustPan: function () {
            if (this.options.autoPan) {
              var t = this._map,
                e = this._container.offsetHeight,
                n = this._containerWidth,
                i = new r.Point(this._containerLeft, -e - this._containerBottom);
              this._animated && i._add(r.DomUtil.getPosition(this._container));
              var o = t.layerPointToContainerPoint(i),
                s = r.point(this.options.autoPanPadding),
                a = r.point(this.options.autoPanPaddingTopLeft || s),
                l = r.point(this.options.autoPanPaddingBottomRight || s),
                u = t.getSize(),
                c = 0,
                h = 0;
              o.x + n + l.x > u.x && (c = o.x + n - u.x + l.x), o.x - c - a.x < 0 && (c = o.x - a.x), o.y + e + l.y > u.y && (h = o.y + e - u.y + l.y), o.y - h - a.y < 0 && (h = o.y - a.y), (c || h) && t.fire("autopanstart").panBy([c, h])
            }
          },
          _onCloseButtonClick: function (t) {
            this._close(), r.DomEvent.stop(t)
          }
        }), r.popup = function (t, e) {
          return new r.Popup(t, e)
        }, r.Map.include({
          openPopup: function (t, e, n) {
            if (this.closePopup(), !(t instanceof r.Popup)) {
              var i = t;
              t = new r.Popup(n).setLatLng(e).setContent(i)
            }
            return t._isOpen = !0, this._popup = t, this.addLayer(t)
          },
          closePopup: function (t) {
            return t && t !== this._popup || (t = this._popup, this._popup = null), t && (this.removeLayer(t), t._isOpen = !1), this
          }
        }), r.Marker.include({
          openPopup: function () {
            return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
          },
          closePopup: function () {
            return this._popup && this._popup._close(), this
          },
          togglePopup: function () {
            return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
          },
          bindPopup: function (t, e) {
            var n = r.point(this.options.icon.options.popupAnchor || [0, 0]);
            return n = n.add(r.Popup.prototype.options.offset), e && e.offset && (n = n.add(e.offset)), e = r.extend({
              offset: n
            }, e), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), t instanceof r.Popup ? (r.setOptions(t, e), this._popup = t, t._source = this) : this._popup = new r.Popup(e, this).setContent(t), this
          },
          setPopupContent: function (t) {
            return this._popup && this._popup.setContent(t), this
          },
          unbindPopup: function () {
            return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
          },
          getPopup: function () {
            return this._popup
          },
          _movePopup: function (t) {
            this._popup.setLatLng(t.latlng)
          }
        }), r.LayerGroup = r.Class.extend({
          initialize: function (t) {
            this._layers = {};
            var e, n;
            if (t)
              for (e = 0, n = t.length; n > e; e++) this.addLayer(t[e])
          },
          addLayer: function (t) {
            var e = this.getLayerId(t);
            return this._layers[e] = t, this._map && this._map.addLayer(t), this
          },
          removeLayer: function (t) {
            var e = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
          },
          hasLayer: function (t) {
            return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
          },
          clearLayers: function () {
            return this.eachLayer(this.removeLayer, this), this
          },
          invoke: function (t) {
            var e, n, i = Array.prototype.slice.call(arguments, 1);
            for (e in this._layers) n = this._layers[e], n[t] && n[t].apply(n, i);
            return this
          },
          onAdd: function (t) {
            this._map = t, this.eachLayer(t.addLayer, t)
          },
          onRemove: function (t) {
            this.eachLayer(t.removeLayer, t), this._map = null
          },
          addTo: function (t) {
            return t.addLayer(this), this
          },
          eachLayer: function (t, e) {
            for (var n in this._layers) t.call(e, this._layers[n]);
            return this
          },
          getLayer: function (t) {
            return this._layers[t]
          },
          getLayers: function () {
            var t = [];
            for (var e in this._layers) t.push(this._layers[e]);
            return t
          },
          setZIndex: function (t) {
            return this.invoke("setZIndex", t)
          },
          getLayerId: function (t) {
            return r.stamp(t)
          }
        }), r.layerGroup = function (t) {
          return new r.LayerGroup(t)
        }, r.FeatureGroup = r.LayerGroup.extend({
          includes: r.Mixin.Events,
          statics: {
            EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
          },
          addLayer: function (t) {
            return this.hasLayer(t) ? this : ("on" in t && t.on(r.FeatureGroup.EVENTS, this._propagateEvent, this), r.LayerGroup.prototype.addLayer.call(this, t), this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
              layer: t
            }))
          },
          removeLayer: function (t) {
            return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), "off" in t && t.off(r.FeatureGroup.EVENTS, this._propagateEvent, this), r.LayerGroup.prototype.removeLayer.call(this, t), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
              layer: t
            })) : this
          },
          bindPopup: function (t, e) {
            return this._popupContent = t, this._popupOptions = e, this.invoke("bindPopup", t, e)
          },
          openPopup: function (t) {
            for (var e in this._layers) {
              this._layers[e].openPopup(t);
              break
            }
            return this
          },
          setStyle: function (t) {
            return this.invoke("setStyle", t)
          },
          bringToFront: function () {
            return this.invoke("bringToFront")
          },
          bringToBack: function () {
            return this.invoke("bringToBack")
          },
          getBounds: function () {
            var t = new r.LatLngBounds;
            return this.eachLayer(function (e) {
              t.extend(e instanceof r.Marker ? e.getLatLng() : e.getBounds())
            }), t
          },
          _propagateEvent: function (t) {
            t = r.extend({
              layer: t.target,
              target: this
            }, t), this.fire(t.type, t)
          }
        }), r.featureGroup = function (t) {
          return new r.FeatureGroup(t)
        }, r.Path = r.Class.extend({
          includes: [r.Mixin.Events],
          statics: {
            CLIP_PADDING: function () {
              var e = r.Browser.mobile ? 1280 : 2e3,
                n = (e / Math.max(t.outerWidth, t.outerHeight) - 1) / 2;
              return Math.max(0, Math.min(.5, n))
            }()
          },
          options: {
            stroke: !0,
            color: "#0033ff",
            dashArray: null,
            lineCap: null,
            lineJoin: null,
            weight: 5,
            opacity: .5,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            clickable: !0
          },
          initialize: function (t) {
            r.setOptions(this, t)
          },
          onAdd: function (t) {
            this._map = t, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), t.on({
              viewreset: this.projectLatlngs,
              moveend: this._updatePath
            }, this)
          },
          addTo: function (t) {
            return t.addLayer(this), this
          },
          onRemove: function (t) {
            t._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, r.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), t.off({
              viewreset: this.projectLatlngs,
              moveend: this._updatePath
            }, this)
          },
          projectLatlngs: function () {},
          setStyle: function (t) {
            return r.setOptions(this, t), this._container && this._updateStyle(), this
          },
          redraw: function () {
            return this._map && (this.projectLatlngs(), this._updatePath()), this
          }
        }), r.Map.include({
          _updatePathViewport: function () {
            var t = r.Path.CLIP_PADDING,
              e = this.getSize(),
              n = r.DomUtil.getPosition(this._mapPane),
              i = n.multiplyBy(-1)._subtract(e.multiplyBy(t)._round()),
              o = i.add(e.multiplyBy(1 + 2 * t)._round());
            this._pathViewport = new r.Bounds(i, o)
          }
        }), r.Path.SVG_NS = "http://www.w3.org/2000/svg", r.Browser.svg = !(!e.createElementNS || !e.createElementNS(r.Path.SVG_NS, "svg").createSVGRect), r.Path = r.Path.extend({
          statics: {
            SVG: r.Browser.svg
          },
          bringToFront: function () {
            var t = this._map._pathRoot,
              e = this._container;
            return e && t.lastChild !== e && t.appendChild(e), this
          },
          bringToBack: function () {
            var t = this._map._pathRoot,
              e = this._container,
              n = t.firstChild;
            return e && n !== e && t.insertBefore(e, n), this
          },
          getPathString: function () {},
          _createElement: function (t) {
            return e.createElementNS(r.Path.SVG_NS, t)
          },
          _initElements: function () {
            this._map._initPathRoot(), this._initPath(), this._initStyle()
          },
          _initPath: function () {
            this._container = this._createElement("g"), this._path = this._createElement("path"), this.options.className && r.DomUtil.addClass(this._path, this.options.className), this._container.appendChild(this._path)
          },
          _initStyle: function () {
            this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
          },
          _updateStyle: function () {
            this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
          },
          _updatePath: function () {
            var t = this.getPathString();
            t || (t = "M0 0"), this._path.setAttribute("d", t)
          },
          _initEvents: function () {
            if (this.options.clickable) {
              (r.Browser.svg || !r.Browser.vml) && r.DomUtil.addClass(this._path, "leaflet-clickable"), r.DomEvent.on(this._container, "click", this._onMouseClick, this);
              for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], e = 0; e < t.length; e++) r.DomEvent.on(this._container, t[e], this._fireMouseEvent, this)
            }
          },
          _onMouseClick: function (t) {
            this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t)
          },
          _fireMouseEvent: function (t) {
            if (this._map && this.hasEventListeners(t.type)) {
              var e = this._map,
                n = e.mouseEventToContainerPoint(t),
                i = e.containerPointToLayerPoint(n),
                o = e.layerPointToLatLng(i);
              this.fire(t.type, {
                latlng: o,
                layerPoint: i,
                containerPoint: n,
                originalEvent: t
              }), "contextmenu" === t.type && r.DomEvent.preventDefault(t), "mousemove" !== t.type && r.DomEvent.stopPropagation(t)
            }
          }
        }), r.Map.include({
          _initPathRoot: function () {
            this._pathRoot || (this._pathRoot = r.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && r.Browser.any3d ? (r.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({
              zoomanim: this._animatePathZoom,
              zoomend: this._endPathZoom
            })) : r.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
          },
          _animatePathZoom: function (t) {
            var e = this.getZoomScale(t.zoom),
              n = this._getCenterOffset(t.center)._multiplyBy(-e)._add(this._pathViewport.min);
            this._pathRoot.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(n) + " scale(" + e + ") ", this._pathZooming = !0
          },
          _endPathZoom: function () {
            this._pathZooming = !1
          },
          _updateSvgViewport: function () {
            if (!this._pathZooming) {
              this._updatePathViewport();
              var t = this._pathViewport,
                e = t.min,
                n = t.max,
                i = n.x - e.x,
                o = n.y - e.y,
                s = this._pathRoot,
                a = this._panes.overlayPane;
              r.Browser.mobileWebkit && a.removeChild(s), r.DomUtil.setPosition(s, e), s.setAttribute("width", i), s.setAttribute("height", o), s.setAttribute("viewBox", [e.x, e.y, i, o].join(" ")), r.Browser.mobileWebkit && a.appendChild(s)
            }
          }
        }), r.Path.include({
          bindPopup: function (t, e) {
            return t instanceof r.Popup ? this._popup = t : ((!this._popup || e) && (this._popup = new r.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
          },
          unbindPopup: function () {
            return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
          },
          openPopup: function (t) {
            return this._popup && (t = t || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
              latlng: t
            })), this
          },
          closePopup: function () {
            return this._popup && this._popup._close(), this
          },
          _openPopup: function (t) {
            this._popup.setLatLng(t.latlng), this._map.openPopup(this._popup)
          }
        }), r.Browser.vml = !r.Browser.svg && function () {
          try {
            var t = e.createElement("div");
            t.innerHTML = '<v:shape adj="1"/>';
            var n = t.firstChild;
            return n.style.behavior = "url(#default#VML)", n && "object" == typeof n.adj
          } catch (t) {
            return !1
          }
        }(), r.Path = r.Browser.svg || !r.Browser.vml ? r.Path : r.Path.extend({
          statics: {
            VML: !0,
            CLIP_PADDING: .02
          },
          _createElement: function () {
            try {
              return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                function (t) {
                  return e.createElement("<lvml:" + t + ' class="lvml">')
                }
            } catch (t) {
              return function (t) {
                return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
              }
            }
          }(),
          _initPath: function () {
            var t = this._container = this._createElement("shape");
            r.DomUtil.addClass(t, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : "")), this.options.clickable && r.DomUtil.addClass(t, "leaflet-clickable"), t.coordsize = "1 1", this._path = this._createElement("path"), t.appendChild(this._path), this._map._pathRoot.appendChild(t)
          },
          _initStyle: function () {
            this._updateStyle()
          },
          _updateStyle: function () {
            var t = this._stroke,
              e = this._fill,
              n = this.options,
              i = this._container;
            i.stroked = n.stroke, i.filled = n.fill, n.stroke ? (t || (t = this._stroke = this._createElement("stroke"), t.endcap = "round", i.appendChild(t)), t.weight = n.weight + "px", t.color = n.color, t.opacity = n.opacity, n.dashArray ? t.dashStyle = r.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : t.dashStyle = "", n.lineCap && (t.endcap = n.lineCap.replace("butt", "flat")), n.lineJoin && (t.joinstyle = n.lineJoin)) : t && (i.removeChild(t),
              this._stroke = null), n.fill ? (e || (e = this._fill = this._createElement("fill"), i.appendChild(e)), e.color = n.fillColor || n.color, e.opacity = n.fillOpacity) : e && (i.removeChild(e), this._fill = null)
          },
          _updatePath: function () {
            var t = this._container.style;
            t.display = "none", this._path.v = this.getPathString() + " ", t.display = ""
          }
        }), r.Map.include(r.Browser.svg || !r.Browser.vml ? {} : {
          _initPathRoot: function () {
            if (!this._pathRoot) {
              var t = this._pathRoot = e.createElement("div");
              t.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(t), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
            }
          }
        }), r.Browser.canvas = function () {
          return !!e.createElement("canvas").getContext
        }(), r.Path = r.Path.SVG && !t.L_PREFER_CANVAS || !r.Browser.canvas ? r.Path : r.Path.extend({
          statics: {
            CANVAS: !0,
            SVG: !1
          },
          redraw: function () {
            return this._map && (this.projectLatlngs(), this._requestUpdate()), this
          },
          setStyle: function (t) {
            return r.setOptions(this, t), this._map && (this._updateStyle(), this._requestUpdate()), this
          },
          onRemove: function (t) {
            t.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this.fire("remove"), this._map = null
          },
          _requestUpdate: function () {
            this._map && !r.Path._updateRequest && (r.Path._updateRequest = r.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
          },
          _fireMapMoveEnd: function () {
            r.Path._updateRequest = null, this.fire("moveend")
          },
          _initElements: function () {
            this._map._initPathRoot(), this._ctx = this._map._canvasCtx
          },
          _updateStyle: function () {
            var t = this.options;
            t.stroke && (this._ctx.lineWidth = t.weight, this._ctx.strokeStyle = t.color), t.fill && (this._ctx.fillStyle = t.fillColor || t.color), t.lineCap && (this._ctx.lineCap = t.lineCap), t.lineJoin && (this._ctx.lineJoin = t.lineJoin)
          },
          _drawPath: function () {
            var t, e, n, i, o, s;
            for (this._ctx.beginPath(), t = 0, n = this._parts.length; n > t; t++) {
              for (e = 0, i = this._parts[t].length; i > e; e++) o = this._parts[t][e], s = (0 === e ? "move" : "line") + "To", this._ctx[s](o.x, o.y);
              this instanceof r.Polygon && this._ctx.closePath()
            }
          },
          _checkIfEmpty: function () {
            return !this._parts.length
          },
          _updatePath: function () {
            if (!this._checkIfEmpty()) {
              var t = this._ctx,
                e = this.options;
              this._drawPath(), t.save(), this._updateStyle(), e.fill && (t.globalAlpha = e.fillOpacity, t.fill(e.fillRule || "evenodd")), e.stroke && (t.globalAlpha = e.opacity, t.stroke()), t.restore()
            }
          },
          _initEvents: function () {
            this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click dblclick contextmenu", this._fireMouseEvent, this))
          },
          _fireMouseEvent: function (t) {
            this._containsPoint(t.layerPoint) && this.fire(t.type, t)
          },
          _onMouseMove: function (t) {
            this._map && !this._map._animatingZoom && (this._containsPoint(t.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", t)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", t)))
          }
        }), r.Map.include(r.Path.SVG && !t.L_PREFER_CANVAS || !r.Browser.canvas ? {} : {
          _initPathRoot: function () {
            var t, n = this._pathRoot;
            n || (n = this._pathRoot = e.createElement("canvas"), n.style.position = "absolute", t = this._canvasCtx = n.getContext("2d"), t.lineCap = "round", t.lineJoin = "round", this._panes.overlayPane.appendChild(n), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
          },
          _updateCanvasViewport: function () {
            if (!this._pathZooming) {
              this._updatePathViewport();
              var t = this._pathViewport,
                e = t.min,
                n = t.max.subtract(e),
                i = this._pathRoot;
              r.DomUtil.setPosition(i, e), i.width = n.x, i.height = n.y, i.getContext("2d").translate(-e.x, -e.y)
            }
          }
        }), r.LineUtil = {
          simplify: function (t, e) {
            if (!e || !t.length) return t.slice();
            var n = e * e;
            return t = this._reducePoints(t, n), t = this._simplifyDP(t, n)
          },
          pointToSegmentDistance: function (t, e, n) {
            return Math.sqrt(this._sqClosestPointOnSegment(t, e, n, !0))
          },
          closestPointOnSegment: function (t, e, n) {
            return this._sqClosestPointOnSegment(t, e, n)
          },
          _simplifyDP: function (t, e) {
            var n = t.length,
              o = typeof Uint8Array != i + "" ? Uint8Array : Array,
              r = new o(n);
            r[0] = r[n - 1] = 1, this._simplifyDPStep(t, r, e, 0, n - 1);
            var s, a = [];
            for (s = 0; n > s; s++) r[s] && a.push(t[s]);
            return a
          },
          _simplifyDPStep: function (t, e, n, i, o) {
            var r, s, a, l = 0;
            for (s = i + 1; o - 1 >= s; s++) a = this._sqClosestPointOnSegment(t[s], t[i], t[o], !0), a > l && (r = s, l = a);
            l > n && (e[r] = 1, this._simplifyDPStep(t, e, n, i, r), this._simplifyDPStep(t, e, n, r, o))
          },
          _reducePoints: function (t, e) {
            for (var n = [t[0]], i = 1, o = 0, r = t.length; r > i; i++) this._sqDist(t[i], t[o]) > e && (n.push(t[i]), o = i);
            return r - 1 > o && n.push(t[r - 1]), n
          },
          clipSegment: function (t, e, n, i) {
            var o, r, s, a = i ? this._lastCode : this._getBitCode(t, n),
              l = this._getBitCode(e, n);
            for (this._lastCode = l;;) {
              if (!(a | l)) return [t, e];
              if (a & l) return !1;
              o = a || l, r = this._getEdgeIntersection(t, e, o, n), s = this._getBitCode(r, n), o === a ? (t = r, a = s) : (e = r, l = s)
            }
          },
          _getEdgeIntersection: function (t, e, n, i) {
            var o = e.x - t.x,
              s = e.y - t.y,
              a = i.min,
              l = i.max;
            return 8 & n ? new r.Point(t.x + o * (l.y - t.y) / s, l.y) : 4 & n ? new r.Point(t.x + o * (a.y - t.y) / s, a.y) : 2 & n ? new r.Point(l.x, t.y + s * (l.x - t.x) / o) : 1 & n ? new r.Point(a.x, t.y + s * (a.x - t.x) / o) : void 0
          },
          _getBitCode: function (t, e) {
            var n = 0;
            return t.x < e.min.x ? n |= 1 : t.x > e.max.x && (n |= 2), t.y < e.min.y ? n |= 4 : t.y > e.max.y && (n |= 8), n
          },
          _sqDist: function (t, e) {
            var n = e.x - t.x,
              i = e.y - t.y;
            return n * n + i * i
          },
          _sqClosestPointOnSegment: function (t, e, n, i) {
            var o, s = e.x,
              a = e.y,
              l = n.x - s,
              u = n.y - a,
              c = l * l + u * u;
            return c > 0 && (o = ((t.x - s) * l + (t.y - a) * u) / c, o > 1 ? (s = n.x, a = n.y) : o > 0 && (s += l * o, a += u * o)), l = t.x - s, u = t.y - a, i ? l * l + u * u : new r.Point(s, a)
          }
        }, r.Polyline = r.Path.extend({
          initialize: function (t, e) {
            r.Path.prototype.initialize.call(this, e), this._latlngs = this._convertLatLngs(t)
          },
          options: {
            smoothFactor: 1,
            noClip: !1
          },
          projectLatlngs: function () {
            this._originalPoints = [];
            for (var t = 0, e = this._latlngs.length; e > t; t++) this._originalPoints[t] = this._map.latLngToLayerPoint(this._latlngs[t])
          },
          getPathString: function () {
            for (var t = 0, e = this._parts.length, n = ""; e > t; t++) n += this._getPathPartStr(this._parts[t]);
            return n
          },
          getLatLngs: function () {
            return this._latlngs
          },
          setLatLngs: function (t) {
            return this._latlngs = this._convertLatLngs(t), this.redraw()
          },
          addLatLng: function (t) {
            return this._latlngs.push(r.latLng(t)), this.redraw()
          },
          spliceLatLngs: function () {
            var t = [].splice.apply(this._latlngs, arguments);
            return this._convertLatLngs(this._latlngs, !0), this.redraw(), t
          },
          closestLayerPoint: function (t) {
            for (var e, n, i = 1 / 0, o = this._parts, s = null, a = 0, l = o.length; l > a; a++)
              for (var u = o[a], c = 1, h = u.length; h > c; c++) {
                e = u[c - 1], n = u[c];
                var p = r.LineUtil._sqClosestPointOnSegment(t, e, n, !0);
                i > p && (i = p, s = r.LineUtil._sqClosestPointOnSegment(t, e, n))
              }
            return s && (s.distance = Math.sqrt(i)), s
          },
          getBounds: function () {
            return new r.LatLngBounds(this.getLatLngs())
          },
          _convertLatLngs: function (t, e) {
            var n, i, o = e ? t : [];
            for (n = 0, i = t.length; i > n; n++) {
              if (r.Util.isArray(t[n]) && "number" != typeof t[n][0]) return;
              o[n] = r.latLng(t[n])
            }
            return o
          },
          _initEvents: function () {
            r.Path.prototype._initEvents.call(this)
          },
          _getPathPartStr: function (t) {
            for (var e, n = r.Path.VML, i = 0, o = t.length, s = ""; o > i; i++) e = t[i], n && e._round(), s += (i ? "L" : "M") + e.x + " " + e.y;
            return s
          },
          _clipPoints: function () {
            var t, e, n, i = this._originalPoints,
              o = i.length;
            if (this.options.noClip) return void(this._parts = [i]);
            this._parts = [];
            var s = this._parts,
              a = this._map._pathViewport,
              l = r.LineUtil;
            for (t = 0, e = 0; o - 1 > t; t++) n = l.clipSegment(i[t], i[t + 1], a, t), n && (s[e] = s[e] || [], s[e].push(n[0]), (n[1] !== i[t + 1] || t === o - 2) && (s[e].push(n[1]), e++))
          },
          _simplifyPoints: function () {
            for (var t = this._parts, e = r.LineUtil, n = 0, i = t.length; i > n; n++) t[n] = e.simplify(t[n], this.options.smoothFactor)
          },
          _updatePath: function () {
            this._map && (this._clipPoints(), this._simplifyPoints(), r.Path.prototype._updatePath.call(this))
          }
        }), r.polyline = function (t, e) {
          return new r.Polyline(t, e)
        }, r.PolyUtil = {}, r.PolyUtil.clipPolygon = function (t, e) {
          var n, i, o, s, a, l, u, c, h, p = [1, 4, 2, 8],
            f = r.LineUtil;
          for (i = 0, u = t.length; u > i; i++) t[i]._code = f._getBitCode(t[i], e);
          for (s = 0; 4 > s; s++) {
            for (c = p[s], n = [], i = 0, u = t.length, o = u - 1; u > i; o = i++) a = t[i], l = t[o], a._code & c ? l._code & c || (h = f._getEdgeIntersection(l, a, c, e), h._code = f._getBitCode(h, e), n.push(h)) : (l._code & c && (h = f._getEdgeIntersection(l, a, c, e), h._code = f._getBitCode(h, e), n.push(h)), n.push(a));
            t = n
          }
          return t
        }, r.Polygon = r.Polyline.extend({
          options: {
            fill: !0
          },
          initialize: function (t, e) {
            r.Polyline.prototype.initialize.call(this, t, e), this._initWithHoles(t)
          },
          _initWithHoles: function (t) {
            var e, n, i;
            if (t && r.Util.isArray(t[0]) && "number" != typeof t[0][0])
              for (this._latlngs = this._convertLatLngs(t[0]), this._holes = t.slice(1), e = 0, n = this._holes.length; n > e; e++) i = this._holes[e] = this._convertLatLngs(this._holes[e]), i[0].equals(i[i.length - 1]) && i.pop();
            t = this._latlngs, t.length >= 2 && t[0].equals(t[t.length - 1]) && t.pop()
          },
          projectLatlngs: function () {
            if (r.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) {
              var t, e, n, i;
              for (t = 0, n = this._holes.length; n > t; t++)
                for (this._holePoints[t] = [], e = 0, i = this._holes[t].length; i > e; e++) this._holePoints[t][e] = this._map.latLngToLayerPoint(this._holes[t][e])
            }
          },
          setLatLngs: function (t) {
            return t && r.Util.isArray(t[0]) && "number" != typeof t[0][0] ? (this._initWithHoles(t), this.redraw()) : r.Polyline.prototype.setLatLngs.call(this, t)
          },
          _clipPoints: function () {
            var t = this._originalPoints,
              e = [];
            if (this._parts = [t].concat(this._holePoints), !this.options.noClip) {
              for (var n = 0, i = this._parts.length; i > n; n++) {
                var o = r.PolyUtil.clipPolygon(this._parts[n], this._map._pathViewport);
                o.length && e.push(o)
              }
              this._parts = e
            }
          },
          _getPathPartStr: function (t) {
            var e = r.Polyline.prototype._getPathPartStr.call(this, t);
            return e + (r.Browser.svg ? "z" : "x")
          }
        }), r.polygon = function (t, e) {
          return new r.Polygon(t, e)
        },
        function () {
          function t(t) {
            return r.FeatureGroup.extend({
              initialize: function (t, e) {
                this._layers = {}, this._options = e, this.setLatLngs(t)
              },
              setLatLngs: function (e) {
                var n = 0,
                  i = e.length;
                for (this.eachLayer(function (t) {
                    i > n ? t.setLatLngs(e[n++]) : this.removeLayer(t)
                  }, this); i > n;) this.addLayer(new t(e[n++], this._options));
                return this
              },
              getLatLngs: function () {
                var t = [];
                return this.eachLayer(function (e) {
                  t.push(e.getLatLngs())
                }), t
              }
            })
          }
          r.MultiPolyline = t(r.Polyline), r.MultiPolygon = t(r.Polygon), r.multiPolyline = function (t, e) {
            return new r.MultiPolyline(t, e)
          }, r.multiPolygon = function (t, e) {
            return new r.MultiPolygon(t, e)
          }
        }(), r.Rectangle = r.Polygon.extend({
          initialize: function (t, e) {
            r.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
          },
          setBounds: function (t) {
            this.setLatLngs(this._boundsToLatLngs(t))
          },
          _boundsToLatLngs: function (t) {
            return t = r.latLngBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
          }
        }), r.rectangle = function (t, e) {
          return new r.Rectangle(t, e)
        }, r.Circle = r.Path.extend({
          initialize: function (t, e, n) {
            r.Path.prototype.initialize.call(this, n), this._latlng = r.latLng(t), this._mRadius = e
          },
          options: {
            fill: !0
          },
          setLatLng: function (t) {
            return this._latlng = r.latLng(t), this.redraw()
          },
          setRadius: function (t) {
            return this._mRadius = t, this.redraw()
          },
          projectLatlngs: function () {
            var t = this._getLngRadius(),
              e = this._latlng,
              n = this._map.latLngToLayerPoint([e.lat, e.lng - t]);
            this._point = this._map.latLngToLayerPoint(e), this._radius = Math.max(this._point.x - n.x, 1)
          },
          getBounds: function () {
            var t = this._getLngRadius(),
              e = this._mRadius / 40075017 * 360,
              n = this._latlng;
            return new r.LatLngBounds([n.lat - e, n.lng - t], [n.lat + e, n.lng + t])
          },
          getLatLng: function () {
            return this._latlng
          },
          getPathString: function () {
            var t = this._point,
              e = this._radius;
            return this._checkIfEmpty() ? "" : r.Browser.svg ? "M" + t.x + "," + (t.y - e) + "A" + e + "," + e + ",0,1,1," + (t.x - .1) + "," + (t.y - e) + " z" : (t._round(), e = Math.round(e), "AL " + t.x + "," + t.y + " " + e + "," + e + " 0,23592600")
          },
          getRadius: function () {
            return this._mRadius
          },
          _getLatRadius: function () {
            return this._mRadius / 40075017 * 360
          },
          _getLngRadius: function () {
            return this._getLatRadius() / Math.cos(r.LatLng.DEG_TO_RAD * this._latlng.lat)
          },
          _checkIfEmpty: function () {
            if (!this._map) return !1;
            var t = this._map._pathViewport,
              e = this._radius,
              n = this._point;
            return n.x - e > t.max.x || n.y - e > t.max.y || n.x + e < t.min.x || n.y + e < t.min.y
          }
        }), r.circle = function (t, e, n) {
          return new r.Circle(t, e, n)
        }, r.CircleMarker = r.Circle.extend({
          options: {
            radius: 10,
            weight: 2
          },
          initialize: function (t, e) {
            r.Circle.prototype.initialize.call(this, t, null, e), this._radius = this.options.radius
          },
          projectLatlngs: function () {
            this._point = this._map.latLngToLayerPoint(this._latlng)
          },
          _updateStyle: function () {
            r.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
          },
          setLatLng: function (t) {
            return r.Circle.prototype.setLatLng.call(this, t), this._popup && this._popup._isOpen && this._popup.setLatLng(t), this
          },
          setRadius: function (t) {
            return this.options.radius = this._radius = t, this.redraw()
          },
          getRadius: function () {
            return this._radius
          }
        }), r.circleMarker = function (t, e) {
          return new r.CircleMarker(t, e)
        }, r.Polyline.include(r.Path.CANVAS ? {
          _containsPoint: function (t, e) {
            var n, i, o, s, a, l, u, c = this.options.weight / 2;
            for (r.Browser.touch && (c += 10), n = 0, s = this._parts.length; s > n; n++)
              for (u = this._parts[n], i = 0, a = u.length, o = a - 1; a > i; o = i++)
                if ((e || 0 !== i) && (l = r.LineUtil.pointToSegmentDistance(t, u[o], u[i]), c >= l)) return !0;
            return !1
          }
        } : {}), r.Polygon.include(r.Path.CANVAS ? {
          _containsPoint: function (t) {
            var e, n, i, o, s, a, l, u, c = !1;
            if (r.Polyline.prototype._containsPoint.call(this, t, !0)) return !0;
            for (o = 0, l = this._parts.length; l > o; o++)
              for (e = this._parts[o], s = 0, u = e.length, a = u - 1; u > s; a = s++) n = e[s], i = e[a], n.y > t.y != i.y > t.y && t.x < (i.x - n.x) * (t.y - n.y) / (i.y - n.y) + n.x && (c = !c);
            return c
          }
        } : {}), r.Circle.include(r.Path.CANVAS ? {
          _drawPath: function () {
            var t = this._point;
            this._ctx.beginPath(), this._ctx.arc(t.x, t.y, this._radius, 0, 2 * Math.PI, !1)
          },
          _containsPoint: function (t) {
            var e = this._point,
              n = this.options.stroke ? this.options.weight / 2 : 0;
            return t.distanceTo(e) <= this._radius + n
          }
        } : {}), r.CircleMarker.include(r.Path.CANVAS ? {
          _updateStyle: function () {
            r.Path.prototype._updateStyle.call(this)
          }
        } : {}), r.GeoJSON = r.FeatureGroup.extend({
          initialize: function (t, e) {
            r.setOptions(this, e), this._layers = {}, t && this.addData(t)
          },
          addData: function (t) {
            var e, n, i, o = r.Util.isArray(t) ? t : t.features;
            if (o) {
              for (e = 0, n = o.length; n > e; e++) i = o[e], (i.geometries || i.geometry || i.features || i.coordinates) && this.addData(o[e]);
              return this
            }
            var s = this.options;
            if (!s.filter || s.filter(t)) {
              var a = r.GeoJSON.geometryToLayer(t, s.pointToLayer, s.coordsToLatLng, s);
              return a.feature = r.GeoJSON.asFeature(t), a.defaultOptions = a.options, this.resetStyle(a), s.onEachFeature && s.onEachFeature(t, a), this.addLayer(a)
            }
          },
          resetStyle: function (t) {
            var e = this.options.style;
            e && (r.Util.extend(t.options, t.defaultOptions), this._setLayerStyle(t, e))
          },
          setStyle: function (t) {
            this.eachLayer(function (e) {
              this._setLayerStyle(e, t)
            }, this)
          },
          _setLayerStyle: function (t, e) {
            "function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
          }
        }), r.extend(r.GeoJSON, {
          geometryToLayer: function (t, e, n, i) {
            var o, s, a, l, u = "Feature" === t.type ? t.geometry : t,
              c = u.coordinates,
              h = [];
            switch (n = n || this.coordsToLatLng, u.type) {
              case "Point":
                return o = n(c), e ? e(t, o) : new r.Marker(o);
              case "MultiPoint":
                for (a = 0, l = c.length; l > a; a++) o = n(c[a]), h.push(e ? e(t, o) : new r.Marker(o));
                return new r.FeatureGroup(h);
              case "LineString":
                return s = this.coordsToLatLngs(c, 0, n), new r.Polyline(s, i);
              case "Polygon":
                if (2 === c.length && !c[1].length) throw new Error("Invalid GeoJSON object.");
                return s = this.coordsToLatLngs(c, 1, n), new r.Polygon(s, i);
              case "MultiLineString":
                return s = this.coordsToLatLngs(c, 1, n), new r.MultiPolyline(s, i);
              case "MultiPolygon":
                return s = this.coordsToLatLngs(c, 2, n), new r.MultiPolygon(s, i);
              case "GeometryCollection":
                for (a = 0, l = u.geometries.length; l > a; a++) h.push(this.geometryToLayer({
                  geometry: u.geometries[a],
                  type: "Feature",
                  properties: t.properties
                }, e, n, i));
                return new r.FeatureGroup(h);
              default:
                throw new Error("Invalid GeoJSON object.")
            }
          },
          coordsToLatLng: function (t) {
            return new r.LatLng(t[1], t[0], t[2])
          },
          coordsToLatLngs: function (t, e, n) {
            var i, o, r, s = [];
            for (o = 0, r = t.length; r > o; o++) i = e ? this.coordsToLatLngs(t[o], e - 1, n) : (n || this.coordsToLatLng)(t[o]), s.push(i);
            return s
          },
          latLngToCoords: function (t) {
            var e = [t.lng, t.lat];
            return t.alt !== i && e.push(t.alt), e
          },
          latLngsToCoords: function (t) {
            for (var e = [], n = 0, i = t.length; i > n; n++) e.push(r.GeoJSON.latLngToCoords(t[n]));
            return e
          },
          getFeature: function (t, e) {
            return t.feature ? r.extend({}, t.feature, {
              geometry: e
            }) : r.GeoJSON.asFeature(e)
          },
          asFeature: function (t) {
            return "Feature" === t.type ? t : {
              type: "Feature",
              properties: {},
              geometry: t
            }
          }
        });
      var a = {
        toGeoJSON: function () {
          return r.GeoJSON.getFeature(this, {
            type: "Point",
            coordinates: r.GeoJSON.latLngToCoords(this.getLatLng())
          })
        }
      };
      r.Marker.include(a), r.Circle.include(a), r.CircleMarker.include(a), r.Polyline.include({
          toGeoJSON: function () {
            return r.GeoJSON.getFeature(this, {
              type: "LineString",
              coordinates: r.GeoJSON.latLngsToCoords(this.getLatLngs())
            })
          }
        }), r.Polygon.include({
          toGeoJSON: function () {
            var t, e, n, i = [r.GeoJSON.latLngsToCoords(this.getLatLngs())];
            if (i[0].push(i[0][0]), this._holes)
              for (t = 0, e = this._holes.length; e > t; t++) n = r.GeoJSON.latLngsToCoords(this._holes[t]), n.push(n[0]), i.push(n);
            return r.GeoJSON.getFeature(this, {
              type: "Polygon",
              coordinates: i
            })
          }
        }),
        function () {
          function t(t) {
            return function () {
              var e = [];
              return this.eachLayer(function (t) {
                e.push(t.toGeoJSON().geometry.coordinates)
              }), r.GeoJSON.getFeature(this, {
                type: t,
                coordinates: e
              })
            }
          }
          r.MultiPolyline.include({
            toGeoJSON: t("MultiLineString")
          }), r.MultiPolygon.include({
            toGeoJSON: t("MultiPolygon")
          }), r.LayerGroup.include({
            toGeoJSON: function () {
              var e, n = this.feature && this.feature.geometry,
                i = [];
              if (n && "MultiPoint" === n.type) return t("MultiPoint").call(this);
              var o = n && "GeometryCollection" === n.type;
              return this.eachLayer(function (t) {
                t.toGeoJSON && (e = t.toGeoJSON(), i.push(o ? e.geometry : r.GeoJSON.asFeature(e)))
              }), o ? r.GeoJSON.getFeature(this, {
                geometries: i,
                type: "GeometryCollection"
              }) : {
                type: "FeatureCollection",
                features: i
              }
            }
          })
        }(), r.geoJson = function (t, e) {
          return new r.GeoJSON(t, e)
        }, r.DomEvent = {
          addListener: function (t, e, n, i) {
            var o, s, a, l = r.stamp(n),
              u = "_leaflet_" + e + l;
            return t[u] ? this : (o = function (e) {
              return n.call(i || t, e || r.DomEvent._getEvent())
            }, r.Browser.pointer && 0 === e.indexOf("touch") ? this.addPointerListener(t, e, o, l) : (r.Browser.touch && "dblclick" === e && this.addDoubleTapListener && this.addDoubleTapListener(t, o, l), "addEventListener" in t ? "mousewheel" === e ? (t.addEventListener("DOMMouseScroll", o, !1), t.addEventListener(e, o, !1)) : "mouseenter" === e || "mouseleave" === e ? (s = o, a = "mouseenter" === e ? "mouseover" : "mouseout", o = function (e) {
              return r.DomEvent._checkMouse(t, e) ? s(e) : void 0
            }, t.addEventListener(a, o, !1)) : "click" === e && r.Browser.android ? (s = o, o = function (t) {
              return r.DomEvent._filterClick(t, s)
            }, t.addEventListener(e, o, !1)) : t.addEventListener(e, o, !1) : "attachEvent" in t && t.attachEvent("on" + e, o), t[u] = o, this))
          },
          removeListener: function (t, e, n) {
            var i = r.stamp(n),
              o = "_leaflet_" + e + i,
              s = t[o];
            return s ? (r.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, i) : r.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, i) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", s, !1), t.removeEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", s, !1) : t.removeEventListener(e, s, !1) : "detachEvent" in t && t.detachEvent("on" + e, s), t[o] = null, this) : this
          },
          stopPropagation: function (t) {
            return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, r.DomEvent._skipped(t), this
          },
          disableScrollPropagation: function (t) {
            var e = r.DomEvent.stopPropagation;
            return r.DomEvent.on(t, "mousewheel", e).on(t, "MozMousePixelScroll", e)
          },
          disableClickPropagation: function (t) {
            for (var e = r.DomEvent.stopPropagation, n = r.Draggable.START.length - 1; n >= 0; n--) r.DomEvent.on(t, r.Draggable.START[n], e);
            return r.DomEvent.on(t, "click", r.DomEvent._fakeStop).on(t, "dblclick", e)
          },
          preventDefault: function (t) {
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
          },
          stop: function (t) {
            return r.DomEvent.preventDefault(t).stopPropagation(t)
          },
          getMousePosition: function (t, e) {
            if (!e) return new r.Point(t.clientX, t.clientY);
            var n = e.getBoundingClientRect();
            return new r.Point(t.clientX - n.left - e.clientLeft, t.clientY - n.top - e.clientTop)
          },
          getWheelDelta: function (t) {
            var e = 0;
            return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
          },
          _skipEvents: {},
          _fakeStop: function (t) {
            r.DomEvent._skipEvents[t.type] = !0
          },
          _skipped: function (t) {
            var e = this._skipEvents[t.type];
            return this._skipEvents[t.type] = !1, e
          },
          _checkMouse: function (t, e) {
            var n = e.relatedTarget;
            if (!n) return !0;
            try {
              for (; n && n !== t;) n = n.parentNode
            } catch (t) {
              return !1
            }
            return n !== t
          },
          _getEvent: function () {
            var e = t.event;
            if (!e)
              for (var n = arguments.callee.caller; n && (e = n.arguments[0], !e || t.Event !== e.constructor);) n = n.caller;
            return e
          },
          _filterClick: function (t, e) {
            var n = t.timeStamp || t.originalEvent.timeStamp,
              i = r.DomEvent._lastClick && n - r.DomEvent._lastClick;
            return i && i > 100 && 500 > i || t.target._simulatedClick && !t._simulated ? void r.DomEvent.stop(t) : (r.DomEvent._lastClick = n, e(t))
          }
        }, r.DomEvent.on = r.DomEvent.addListener, r.DomEvent.off = r.DomEvent.removeListener, r.Draggable = r.Class.extend({
          includes: r.Mixin.Events,
          statics: {
            START: r.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {
              mousedown: "mouseup",
              touchstart: "touchend",
              pointerdown: "touchend",
              MSPointerDown: "touchend"
            },
            MOVE: {
              mousedown: "mousemove",
              touchstart: "touchmove",
              pointerdown: "touchmove",
              MSPointerDown: "touchmove"
            }
          },
          initialize: function (t, e) {
            this._element = t, this._dragStartTarget = e || t
          },
          enable: function () {
            if (!this._enabled) {
              for (var t = r.Draggable.START.length - 1; t >= 0; t--) r.DomEvent.on(this._dragStartTarget, r.Draggable.START[t], this._onDown, this);
              this._enabled = !0
            }
          },
          disable: function () {
            if (this._enabled) {
              for (var t = r.Draggable.START.length - 1; t >= 0; t--) r.DomEvent.off(this._dragStartTarget, r.Draggable.START[t], this._onDown, this);
              this._enabled = !1, this._moved = !1
            }
          },
          _onDown: function (t) {
            if (this._moved = !1, !t.shiftKey && (1 === t.which || 1 === t.button || t.touches) && (r.DomEvent.stopPropagation(t), !r.Draggable._disabled && (r.DomUtil.disableImageDrag(), r.DomUtil.disableTextSelection(), !this._moving))) {
              var n = t.touches ? t.touches[0] : t;
              this._startPoint = new r.Point(n.clientX, n.clientY), this._startPos = this._newPos = r.DomUtil.getPosition(this._element), r.DomEvent.on(e, r.Draggable.MOVE[t.type], this._onMove, this).on(e, r.Draggable.END[t.type], this._onUp, this)
            }
          },
          _onMove: function (t) {
            if (t.touches && t.touches.length > 1) return void(this._moved = !0);
            var n = t.touches && 1 === t.touches.length ? t.touches[0] : t,
              i = new r.Point(n.clientX, n.clientY),
              o = i.subtract(this._startPoint);
            (o.x || o.y) && (r.Browser.touch && Math.abs(o.x) + Math.abs(o.y) < 3 || (r.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = r.DomUtil.getPosition(this._element).subtract(o), r.DomUtil.addClass(e.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, r.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(o), this._moving = !0, r.Util.cancelAnimFrame(this._animRequest), this._animRequest = r.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
          },
          _updatePosition: function () {
            this.fire("predrag"), r.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
          },
          _onUp: function () {
            r.DomUtil.removeClass(e.body, "leaflet-dragging"), this._lastTarget && (r.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
            for (var t in r.Draggable.MOVE) r.DomEvent.off(e, r.Draggable.MOVE[t], this._onMove).off(e, r.Draggable.END[t], this._onUp);
            r.DomUtil.enableImageDrag(), r.DomUtil.enableTextSelection(), this._moved && this._moving && (r.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
              distance: this._newPos.distanceTo(this._startPos)
            })), this._moving = !1
          }
        }), r.Handler = r.Class.extend({
          initialize: function (t) {
            this._map = t
          },
          enable: function () {
            this._enabled || (this._enabled = !0, this.addHooks())
          },
          disable: function () {
            this._enabled && (this._enabled = !1, this.removeHooks())
          },
          enabled: function () {
            return !!this._enabled
          }
        }), r.Map.mergeOptions({
          dragging: !0,
          inertia: !r.Browser.android23,
          inertiaDeceleration: 3400,
          inertiaMaxSpeed: 1 / 0,
          inertiaThreshold: r.Browser.touch ? 32 : 18,
          easeLinearity: .25,
          worldCopyJump: !1
        }), r.Map.Drag = r.Handler.extend({
          addHooks: function () {
            if (!this._draggable) {
              var t = this._map;
              this._draggable = new r.Draggable(t._mapPane, t._container), this._draggable.on({
                dragstart: this._onDragStart,
                drag: this._onDrag,
                dragend: this._onDragEnd
              }, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), t.on("viewreset", this._onViewReset, this), t.whenReady(this._onViewReset, this))
            }
            this._draggable.enable()
          },
          removeHooks: function () {
            this._draggable.disable()
          },
          moved: function () {
            return this._draggable && this._draggable._moved
          },
          _onDragStart: function () {
            var t = this._map;
            t._panAnim && t._panAnim.stop(), t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
          },
          _onDrag: function () {
            if (this._map.options.inertia) {
              var t = this._lastTime = +new Date,
                e = this._lastPos = this._draggable._newPos;
              this._positions.push(e), this._times.push(t), t - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move").fire("drag")
          },
          _onViewReset: function () {
            var t = this._map.getSize()._divideBy(2),
              e = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.project([0, 180]).x
          },
          _onPreDrag: function () {
            var t = this._worldWidth,
              e = Math.round(t / 2),
              n = this._initialWorldOffset,
              i = this._draggable._newPos.x,
              o = (i - e + n) % t + e - n,
              r = (i + e + n) % t - e - n,
              s = Math.abs(o + n) < Math.abs(r + n) ? o : r;
            this._draggable._newPos.x = s
          },
          _onDragEnd: function (t) {
            var e = this._map,
              n = e.options,
              i = +new Date - this._lastTime,
              o = !n.inertia || i > n.inertiaThreshold || !this._positions[0];
            if (e.fire("dragend", t), o) e.fire("moveend");
            else {
              var s = this._lastPos.subtract(this._positions[0]),
                a = (this._lastTime + i - this._times[0]) / 1e3,
                l = n.easeLinearity,
                u = s.multiplyBy(l / a),
                c = u.distanceTo([0, 0]),
                h = Math.min(n.inertiaMaxSpeed, c),
                p = u.multiplyBy(h / c),
                f = h / (n.inertiaDeceleration * l),
                d = p.multiplyBy(-f / 2).round();
              d.x && d.y ? (d = e._limitOffset(d, e.options.maxBounds), r.Util.requestAnimFrame(function () {
                e.panBy(d, {
                  duration: f,
                  easeLinearity: l,
                  noMoveStart: !0
                })
              })) : e.fire("moveend")
            }
          }
        }), r.Map.addInitHook("addHandler", "dragging", r.Map.Drag), r.Map.mergeOptions({
          doubleClickZoom: !0
        }), r.Map.DoubleClickZoom = r.Handler.extend({
          addHooks: function () {
            this._map.on("dblclick", this._onDoubleClick, this)
          },
          removeHooks: function () {
            this._map.off("dblclick", this._onDoubleClick, this)
          },
          _onDoubleClick: function (t) {
            var e = this._map,
              n = e.getZoom() + (t.originalEvent.shiftKey ? -1 : 1);
            "center" === e.options.doubleClickZoom ? e.setZoom(n) : e.setZoomAround(t.containerPoint, n)
          }
        }), r.Map.addInitHook("addHandler", "doubleClickZoom", r.Map.DoubleClickZoom), r.Map.mergeOptions({
          scrollWheelZoom: !0
        }), r.Map.ScrollWheelZoom = r.Handler.extend({
          addHooks: function () {
            r.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), r.DomEvent.on(this._map._container, "MozMousePixelScroll", r.DomEvent.preventDefault), this._delta = 0
          },
          removeHooks: function () {
            r.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll), r.DomEvent.off(this._map._container, "MozMousePixelScroll", r.DomEvent.preventDefault)
          },
          _onWheelScroll: function (t) {
            var e = r.DomEvent.getWheelDelta(t);
            this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
            var n = Math.max(40 - (+new Date - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(r.bind(this._performZoom, this), n), r.DomEvent.preventDefault(t), r.DomEvent.stopPropagation(t)
          },
          _performZoom: function () {
            var t = this._map,
              e = this._delta,
              n = t.getZoom();
            e = e > 0 ? Math.ceil(e) : Math.floor(e), e = Math.max(Math.min(e, 4), -4), e = t._limitZoom(n + e) - n, this._delta = 0, this._startTime = null, e && ("center" === t.options.scrollWheelZoom ? t.setZoom(n + e) : t.setZoomAround(this._lastMousePos, n + e))
          }
        }), r.Map.addInitHook("addHandler", "scrollWheelZoom", r.Map.ScrollWheelZoom), r.extend(r.DomEvent, {
          _touchstart: r.Browser.msPointer ? "MSPointerDown" : r.Browser.pointer ? "pointerdown" : "touchstart",
          _touchend: r.Browser.msPointer ? "MSPointerUp" : r.Browser.pointer ? "pointerup" : "touchend",
          addDoubleTapListener: function (t, n, i) {
            function o(t) {
              var e;
              if (r.Browser.pointer ? (d.push(t.pointerId), e = d.length) : e = t.touches.length, !(e > 1)) {
                var n = Date.now(),
                  i = n - (a || n);
                l = t.touches ? t.touches[0] : t, u = i > 0 && c >= i, a = n
              }
            }

            function s(t) {
              if (r.Browser.pointer) {
                var e = d.indexOf(t.pointerId);
                if (-1 === e) return;
                d.splice(e, 1)
              }
              if (u) {
                if (r.Browser.pointer) {
                  var i, o = {};
                  for (var s in l) i = l[s], "function" == typeof i ? o[s] = i.bind(l) : o[s] = i;
                  l = o
                }
                l.type = "dblclick", n(l), a = null
              }
            }
            var a, l, u = !1,
              c = 250,
              h = "_leaflet_",
              p = this._touchstart,
              f = this._touchend,
              d = [];
            t[h + p + i] = o, t[h + f + i] = s;
            var m = r.Browser.pointer ? e.documentElement : t;
            return t.addEventListener(p, o, !1), m.addEventListener(f, s, !1), r.Browser.pointer && m.addEventListener(r.DomEvent.POINTER_CANCEL, s, !1), this
          },
          removeDoubleTapListener: function (t, n) {
            var i = "_leaflet_";
            return t.removeEventListener(this._touchstart, t[i + this._touchstart + n], !1), (r.Browser.pointer ? e.documentElement : t).removeEventListener(this._touchend, t[i + this._touchend + n], !1), r.Browser.pointer && e.documentElement.removeEventListener(r.DomEvent.POINTER_CANCEL, t[i + this._touchend + n], !1), this
          }
        }), r.extend(r.DomEvent, {
          POINTER_DOWN: r.Browser.msPointer ? "MSPointerDown" : "pointerdown",
          POINTER_MOVE: r.Browser.msPointer ? "MSPointerMove" : "pointermove",
          POINTER_UP: r.Browser.msPointer ? "MSPointerUp" : "pointerup",
          POINTER_CANCEL: r.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
          _pointers: [],
          _pointerDocumentListener: !1,
          addPointerListener: function (t, e, n, i) {
            switch (e) {
              case "touchstart":
                return this.addPointerListenerStart(t, e, n, i);
              case "touchend":
                return this.addPointerListenerEnd(t, e, n, i);
              case "touchmove":
                return this.addPointerListenerMove(t, e, n, i);
              default:
                throw "Unknown touch event type"
            }
          },
          addPointerListenerStart: function (t, n, i, o) {
            var s = "_leaflet_",
              a = this._pointers,
              l = function (t) {
                "mouse" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_MOUSE && r.DomEvent.preventDefault(t);
                for (var e = !1, n = 0; n < a.length; n++)
                  if (a[n].pointerId === t.pointerId) {
                    e = !0;
                    break
                  } e || a.push(t), t.touches = a.slice(), t.changedTouches = [t], i(t)
              };
            if (t[s + "touchstart" + o] = l, t.addEventListener(this.POINTER_DOWN, l, !1), !this._pointerDocumentListener) {
              var u = function (t) {
                for (var e = 0; e < a.length; e++)
                  if (a[e].pointerId === t.pointerId) {
                    a.splice(e, 1);
                    break
                  }
              };
              e.documentElement.addEventListener(this.POINTER_UP, u, !1), e.documentElement.addEventListener(this.POINTER_CANCEL, u, !1), this._pointerDocumentListener = !0
            }
            return this
          },
          addPointerListenerMove: function (t, e, n, i) {
            function o(t) {
              if (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) {
                for (var e = 0; e < s.length; e++)
                  if (s[e].pointerId === t.pointerId) {
                    s[e] = t;
                    break
                  } t.touches = s.slice(), t.changedTouches = [t], n(t)
              }
            }
            var r = "_leaflet_",
              s = this._pointers;
            return t[r + "touchmove" + i] = o, t.addEventListener(this.POINTER_MOVE, o, !1), this
          },
          addPointerListenerEnd: function (t, e, n, i) {
            var o = "_leaflet_",
              r = this._pointers,
              s = function (t) {
                for (var e = 0; e < r.length; e++)
                  if (r[e].pointerId === t.pointerId) {
                    r.splice(e, 1);
                    break
                  } t.touches = r.slice(), t.changedTouches = [t], n(t)
              };
            return t[o + "touchend" + i] = s, t.addEventListener(this.POINTER_UP, s, !1), t.addEventListener(this.POINTER_CANCEL, s, !1), this
          },
          removePointerListener: function (t, e, n) {
            var i = "_leaflet_",
              o = t[i + e + n];
            switch (e) {
              case "touchstart":
                t.removeEventListener(this.POINTER_DOWN, o, !1);
                break;
              case "touchmove":
                t.removeEventListener(this.POINTER_MOVE, o, !1);
                break;
              case "touchend":
                t.removeEventListener(this.POINTER_UP, o, !1), t.removeEventListener(this.POINTER_CANCEL, o, !1)
            }
            return this
          }
        }), r.Map.mergeOptions({
          touchZoom: r.Browser.touch && !r.Browser.android23,
          bounceAtZoomLimits: !0
        }), r.Map.TouchZoom = r.Handler.extend({
          addHooks: function () {
            r.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
          },
          removeHooks: function () {
            r.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
          },
          _onTouchStart: function (t) {
            var n = this._map;
            if (t.touches && 2 === t.touches.length && !n._animatingZoom && !this._zooming) {
              var i = n.mouseEventToLayerPoint(t.touches[0]),
                o = n.mouseEventToLayerPoint(t.touches[1]),
                s = n._getCenterLayerPoint();
              this._startCenter = i.add(o)._divideBy(2), this._startDist = i.distanceTo(o), this._moved = !1, this._zooming = !0, this._centerOffset = s.subtract(this._startCenter), n._panAnim && n._panAnim.stop(), r.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this), r.DomEvent.preventDefault(t)
            }
          },
          _onTouchMove: function (t) {
            var e = this._map;
            if (t.touches && 2 === t.touches.length && this._zooming) {
              var n = e.mouseEventToLayerPoint(t.touches[0]),
                i = e.mouseEventToLayerPoint(t.touches[1]);
              this._scale = n.distanceTo(i) / this._startDist, this._delta = n._add(i)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (e.options.bounceAtZoomLimits || !(e.getZoom() === e.getMinZoom() && this._scale < 1 || e.getZoom() === e.getMaxZoom() && this._scale > 1)) && (this._moved || (r.DomUtil.addClass(e._mapPane, "leaflet-touching"),
                e.fire("movestart").fire("zoomstart"), this._moved = !0), r.Util.cancelAnimFrame(this._animRequest), this._animRequest = r.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), r.DomEvent.preventDefault(t))
            }
          },
          _updateOnMove: function () {
            var t = this._map,
              e = this._getScaleOrigin(),
              n = t.layerPointToLatLng(e),
              i = t.getScaleZoom(this._scale);
            t._animateZoom(n, i, this._startCenter, this._scale, this._delta, !1, !0)
          },
          _onTouchEnd: function () {
            if (!this._moved || !this._zooming) return void(this._zooming = !1);
            var t = this._map;
            this._zooming = !1, r.DomUtil.removeClass(t._mapPane, "leaflet-touching"), r.Util.cancelAnimFrame(this._animRequest), r.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd);
            var n = this._getScaleOrigin(),
              i = t.layerPointToLatLng(n),
              o = t.getZoom(),
              s = t.getScaleZoom(this._scale) - o,
              a = s > 0 ? Math.ceil(s) : Math.floor(s),
              l = t._limitZoom(o + a),
              u = t.getZoomScale(l) / this._scale;
            t._animateZoom(i, l, n, u)
          },
          _getScaleOrigin: function () {
            var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
            return this._startCenter.add(t)
          }
        }), r.Map.addInitHook("addHandler", "touchZoom", r.Map.TouchZoom), r.Map.mergeOptions({
          tap: !0,
          tapTolerance: 15
        }), r.Map.Tap = r.Handler.extend({
          addHooks: function () {
            r.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
          },
          removeHooks: function () {
            r.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
          },
          _onDown: function (t) {
            if (t.touches) {
              if (r.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
              var n = t.touches[0],
                i = n.target;
              this._startPos = this._newPos = new r.Point(n.clientX, n.clientY), i.tagName && "a" === i.tagName.toLowerCase() && r.DomUtil.addClass(i, "leaflet-active"), this._holdTimeout = setTimeout(r.bind(function () {
                this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", n))
              }, this), 1e3), r.DomEvent.on(e, "touchmove", this._onMove, this).on(e, "touchend", this._onUp, this)
            }
          },
          _onUp: function (t) {
            if (clearTimeout(this._holdTimeout), r.DomEvent.off(e, "touchmove", this._onMove, this).off(e, "touchend", this._onUp, this), this._fireClick && t && t.changedTouches) {
              var n = t.changedTouches[0],
                i = n.target;
              i && i.tagName && "a" === i.tagName.toLowerCase() && r.DomUtil.removeClass(i, "leaflet-active"), this._isTapValid() && this._simulateEvent("click", n)
            }
          },
          _isTapValid: function () {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
          },
          _onMove: function (t) {
            var e = t.touches[0];
            this._newPos = new r.Point(e.clientX, e.clientY)
          },
          _simulateEvent: function (n, i) {
            var o = e.createEvent("MouseEvents");
            o._simulated = !0, i.target._simulatedClick = !0, o.initMouseEvent(n, !0, !0, t, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), i.target.dispatchEvent(o)
          }
        }), r.Browser.touch && !r.Browser.pointer && r.Map.addInitHook("addHandler", "tap", r.Map.Tap), r.Map.mergeOptions({
          boxZoom: !0
        }), r.Map.BoxZoom = r.Handler.extend({
          initialize: function (t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._moved = !1
          },
          addHooks: function () {
            r.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
          },
          removeHooks: function () {
            r.DomEvent.off(this._container, "mousedown", this._onMouseDown), this._moved = !1
          },
          moved: function () {
            return this._moved
          },
          _onMouseDown: function (t) {
            return this._moved = !1, !(!t.shiftKey || 1 !== t.which && 1 !== t.button) && (r.DomUtil.disableTextSelection(), r.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(t), void r.DomEvent.on(e, "mousemove", this._onMouseMove, this).on(e, "mouseup", this._onMouseUp, this).on(e, "keydown", this._onKeyDown, this))
          },
          _onMouseMove: function (t) {
            this._moved || (this._box = r.DomUtil.create("div", "leaflet-zoom-box", this._pane), r.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
            var e = this._startLayerPoint,
              n = this._box,
              i = this._map.mouseEventToLayerPoint(t),
              o = i.subtract(e),
              s = new r.Point(Math.min(i.x, e.x), Math.min(i.y, e.y));
            r.DomUtil.setPosition(n, s), this._moved = !0, n.style.width = Math.max(0, Math.abs(o.x) - 4) + "px", n.style.height = Math.max(0, Math.abs(o.y) - 4) + "px"
          },
          _finish: function () {
            this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = ""), r.DomUtil.enableTextSelection(), r.DomUtil.enableImageDrag(), r.DomEvent.off(e, "mousemove", this._onMouseMove).off(e, "mouseup", this._onMouseUp).off(e, "keydown", this._onKeyDown)
          },
          _onMouseUp: function (t) {
            this._finish();
            var e = this._map,
              n = e.mouseEventToLayerPoint(t);
            if (!this._startLayerPoint.equals(n)) {
              var i = new r.LatLngBounds(e.layerPointToLatLng(this._startLayerPoint), e.layerPointToLatLng(n));
              e.fitBounds(i), e.fire("boxzoomend", {
                boxZoomBounds: i
              })
            }
          },
          _onKeyDown: function (t) {
            27 === t.keyCode && this._finish()
          }
        }), r.Map.addInitHook("addHandler", "boxZoom", r.Map.BoxZoom), r.Map.mergeOptions({
          keyboard: !0,
          keyboardPanOffset: 80,
          keyboardZoomOffset: 1
        }), r.Map.Keyboard = r.Handler.extend({
          keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 173]
          },
          initialize: function (t) {
            this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
          },
          addHooks: function () {
            var t = this._map._container; - 1 === t.tabIndex && (t.tabIndex = "0"), r.DomEvent.on(t, "focus", this._onFocus, this).on(t, "blur", this._onBlur, this).on(t, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
          },
          removeHooks: function () {
            this._removeHooks();
            var t = this._map._container;
            r.DomEvent.off(t, "focus", this._onFocus, this).off(t, "blur", this._onBlur, this).off(t, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
          },
          _onMouseDown: function () {
            if (!this._focused) {
              var n = e.body,
                i = e.documentElement,
                o = n.scrollTop || i.scrollTop,
                r = n.scrollLeft || i.scrollLeft;
              this._map._container.focus(), t.scrollTo(r, o)
            }
          },
          _onFocus: function () {
            this._focused = !0, this._map.fire("focus")
          },
          _onBlur: function () {
            this._focused = !1, this._map.fire("blur")
          },
          _setPanOffset: function (t) {
            var e, n, i = this._panKeys = {},
              o = this.keyCodes;
            for (e = 0, n = o.left.length; n > e; e++) i[o.left[e]] = [-1 * t, 0];
            for (e = 0, n = o.right.length; n > e; e++) i[o.right[e]] = [t, 0];
            for (e = 0, n = o.down.length; n > e; e++) i[o.down[e]] = [0, t];
            for (e = 0, n = o.up.length; n > e; e++) i[o.up[e]] = [0, -1 * t]
          },
          _setZoomOffset: function (t) {
            var e, n, i = this._zoomKeys = {},
              o = this.keyCodes;
            for (e = 0, n = o.zoomIn.length; n > e; e++) i[o.zoomIn[e]] = t;
            for (e = 0, n = o.zoomOut.length; n > e; e++) i[o.zoomOut[e]] = -t
          },
          _addHooks: function () {
            r.DomEvent.on(e, "keydown", this._onKeyDown, this)
          },
          _removeHooks: function () {
            r.DomEvent.off(e, "keydown", this._onKeyDown, this)
          },
          _onKeyDown: function (t) {
            var e = t.keyCode,
              n = this._map;
            if (e in this._panKeys) {
              if (n._panAnim && n._panAnim._inProgress) return;
              n.panBy(this._panKeys[e]), n.options.maxBounds && n.panInsideBounds(n.options.maxBounds)
            } else {
              if (!(e in this._zoomKeys)) return;
              n.setZoom(n.getZoom() + this._zoomKeys[e])
            }
            r.DomEvent.stop(t)
          }
        }), r.Map.addInitHook("addHandler", "keyboard", r.Map.Keyboard), r.Handler.MarkerDrag = r.Handler.extend({
          initialize: function (t) {
            this._marker = t
          },
          addHooks: function () {
            var t = this._marker._icon;
            this._draggable || (this._draggable = new r.Draggable(t, t)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable(), r.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
          },
          removeHooks: function () {
            this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this), this._draggable.disable(), r.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
          },
          moved: function () {
            return this._draggable && this._draggable._moved
          },
          _onDragStart: function () {
            this._marker.closePopup().fire("movestart").fire("dragstart")
          },
          _onDrag: function () {
            var t = this._marker,
              e = t._shadow,
              n = r.DomUtil.getPosition(t._icon),
              i = t._map.layerPointToLatLng(n);
            e && r.DomUtil.setPosition(e, n), t._latlng = i, t.fire("move", {
              latlng: i
            }).fire("drag")
          },
          _onDragEnd: function (t) {
            this._marker.fire("moveend").fire("dragend", t)
          }
        }), r.Control = r.Class.extend({
          options: {
            position: "topright"
          },
          initialize: function (t) {
            r.setOptions(this, t)
          },
          getPosition: function () {
            return this.options.position
          },
          setPosition: function (t) {
            var e = this._map;
            return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
          },
          getContainer: function () {
            return this._container
          },
          addTo: function (t) {
            this._map = t;
            var e = this._container = this.onAdd(t),
              n = this.getPosition(),
              i = t._controlCorners[n];
            return r.DomUtil.addClass(e, "leaflet-control"), -1 !== n.indexOf("bottom") ? i.insertBefore(e, i.firstChild) : i.appendChild(e), this
          },
          removeFrom: function (t) {
            var e = this.getPosition(),
              n = t._controlCorners[e];
            return n.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(t), this
          },
          _refocusOnMap: function () {
            this._map && this._map.getContainer().focus()
          }
        }), r.control = function (t) {
          return new r.Control(t)
        }, r.Map.include({
          addControl: function (t) {
            return t.addTo(this), this
          },
          removeControl: function (t) {
            return t.removeFrom(this), this
          },
          _initControlPos: function () {
            function t(t, o) {
              var s = n + t + " " + n + o;
              e[t + o] = r.DomUtil.create("div", s, i)
            }
            var e = this._controlCorners = {},
              n = "leaflet-",
              i = this._controlContainer = r.DomUtil.create("div", n + "control-container", this._container);
            t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
          },
          _clearControlPos: function () {
            this._container.removeChild(this._controlContainer)
          }
        }), r.Control.Zoom = r.Control.extend({
          options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
          },
          onAdd: function (t) {
            var e = "leaflet-control-zoom",
              n = r.DomUtil.create("div", e + " leaflet-bar");
            return this._map = t, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, e + "-in", n, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, e + "-out", n, this._zoomOut, this), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), n
          },
          onRemove: function (t) {
            t.off("zoomend zoomlevelschange", this._updateDisabled, this)
          },
          _zoomIn: function (t) {
            this._map.zoomIn(t.shiftKey ? 3 : 1)
          },
          _zoomOut: function (t) {
            this._map.zoomOut(t.shiftKey ? 3 : 1)
          },
          _createButton: function (t, e, n, i, o, s) {
            var a = r.DomUtil.create("a", n, i);
            a.innerHTML = t, a.href = "#", a.title = e;
            var l = r.DomEvent.stopPropagation;
            return r.DomEvent.on(a, "click", l).on(a, "mousedown", l).on(a, "dblclick", l).on(a, "click", r.DomEvent.preventDefault).on(a, "click", o, s).on(a, "click", this._refocusOnMap, s), a
          },
          _updateDisabled: function () {
            var t = this._map,
              e = "leaflet-disabled";
            r.DomUtil.removeClass(this._zoomInButton, e), r.DomUtil.removeClass(this._zoomOutButton, e), t._zoom === t.getMinZoom() && r.DomUtil.addClass(this._zoomOutButton, e), t._zoom === t.getMaxZoom() && r.DomUtil.addClass(this._zoomInButton, e)
          }
        }), r.Map.mergeOptions({
          zoomControl: !0
        }), r.Map.addInitHook(function () {
          this.options.zoomControl && (this.zoomControl = new r.Control.Zoom, this.addControl(this.zoomControl))
        }), r.control.zoom = function (t) {
          return new r.Control.Zoom(t)
        }, r.Control.Attribution = r.Control.extend({
          options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
          },
          initialize: function (t) {
            r.setOptions(this, t), this._attributions = {}
          },
          onAdd: function (t) {
            this._container = r.DomUtil.create("div", "leaflet-control-attribution"), r.DomEvent.disableClickPropagation(this._container);
            for (var e in t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
            return t.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
          },
          onRemove: function (t) {
            t.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
          },
          setPrefix: function (t) {
            return this.options.prefix = t, this._update(), this
          },
          addAttribution: function (t) {
            return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : void 0
          },
          removeAttribution: function (t) {
            return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : void 0
          },
          _update: function () {
            if (this._map) {
              var t = [];
              for (var e in this._attributions) this._attributions[e] && t.push(e);
              var n = [];
              this.options.prefix && n.push(this.options.prefix), t.length && n.push(t.join(", ")), this._container.innerHTML = n.join(" | ")
            }
          },
          _onLayerAdd: function (t) {
            t.layer.getAttribution && this.addAttribution(t.layer.getAttribution())
          },
          _onLayerRemove: function (t) {
            t.layer.getAttribution && this.removeAttribution(t.layer.getAttribution())
          }
        }), r.Map.mergeOptions({
          attributionControl: !0
        }), r.Map.addInitHook(function () {
          this.options.attributionControl && (this.attributionControl = (new r.Control.Attribution).addTo(this))
        }), r.control.attribution = function (t) {
          return new r.Control.Attribution(t)
        }, r.Control.Scale = r.Control.extend({
          options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0,
            updateWhenIdle: !1
          },
          onAdd: function (t) {
            this._map = t;
            var e = "leaflet-control-scale",
              n = r.DomUtil.create("div", e),
              i = this.options;
            return this._addScales(i, e, n), t.on(i.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), n
          },
          onRemove: function (t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
          },
          _addScales: function (t, e, n) {
            t.metric && (this._mScale = r.DomUtil.create("div", e + "-line", n)), t.imperial && (this._iScale = r.DomUtil.create("div", e + "-line", n))
          },
          _update: function () {
            var t = this._map.getBounds(),
              e = t.getCenter().lat,
              n = 6378137 * Math.PI * Math.cos(e * Math.PI / 180),
              i = n * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
              o = this._map.getSize(),
              r = this.options,
              s = 0;
            o.x > 0 && (s = i * (r.maxWidth / o.x)), this._updateScales(r, s)
          },
          _updateScales: function (t, e) {
            t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
          },
          _updateMetric: function (t) {
            var e = this._getRoundNum(t);
            this._mScale.style.width = this._getScaleWidth(e / t) + "px", this._mScale.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
          },
          _updateImperial: function (t) {
            var e, n, i, o = 3.2808399 * t,
              r = this._iScale;
            o > 5280 ? (e = o / 5280, n = this._getRoundNum(e), r.style.width = this._getScaleWidth(n / e) + "px", r.innerHTML = n + " mi") : (i = this._getRoundNum(o), r.style.width = this._getScaleWidth(i / o) + "px", r.innerHTML = i + " ft")
          },
          _getScaleWidth: function (t) {
            return Math.round(this.options.maxWidth * t) - 10
          },
          _getRoundNum: function (t) {
            var e = Math.pow(10, (Math.floor(t) + "").length - 1),
              n = t / e;
            return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, e * n
          }
        }), r.control.scale = function (t) {
          return new r.Control.Scale(t)
        }, r.Control.Layers = r.Control.extend({
          options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0
          },
          initialize: function (t, e, n) {
            r.setOptions(this, n), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
            for (var i in t) this._addLayer(t[i], i);
            for (i in e) this._addLayer(e[i], i, !0)
          },
          onAdd: function (t) {
            return this._initLayout(), this._update(), t.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
          },
          onRemove: function (t) {
            t.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
          },
          addBaseLayer: function (t, e) {
            return this._addLayer(t, e), this._update(), this
          },
          addOverlay: function (t, e) {
            return this._addLayer(t, e, !0), this._update(), this
          },
          removeLayer: function (t) {
            var e = r.stamp(t);
            return delete this._layers[e], this._update(), this
          },
          _initLayout: function () {
            var t = "leaflet-control-layers",
              e = this._container = r.DomUtil.create("div", t);
            e.setAttribute("aria-haspopup", !0), r.Browser.touch ? r.DomEvent.on(e, "click", r.DomEvent.stopPropagation) : r.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
            var n = this._form = r.DomUtil.create("form", t + "-list");
            if (this.options.collapsed) {
              r.Browser.android || r.DomEvent.on(e, "mouseover", this._expand, this).on(e, "mouseout", this._collapse, this);
              var i = this._layersLink = r.DomUtil.create("a", t + "-toggle", e);
              i.href = "#", i.title = "Layers", r.Browser.touch ? r.DomEvent.on(i, "click", r.DomEvent.stop).on(i, "click", this._expand, this) : r.DomEvent.on(i, "focus", this._expand, this), r.DomEvent.on(n, "click", function () {
                setTimeout(r.bind(this._onInputClick, this), 0)
              }, this), this._map.on("click", this._collapse, this)
            } else this._expand();
            this._baseLayersList = r.DomUtil.create("div", t + "-base", n), this._separator = r.DomUtil.create("div", t + "-separator", n), this._overlaysList = r.DomUtil.create("div", t + "-overlays", n), e.appendChild(n)
          },
          _addLayer: function (t, e, n) {
            var i = r.stamp(t);
            this._layers[i] = {
              layer: t,
              name: e,
              overlay: n
            }, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
          },
          _update: function () {
            if (this._container) {
              this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
              var t, e, n = !1,
                i = !1;
              for (t in this._layers) e = this._layers[t], this._addItem(e), i = i || e.overlay, n = n || !e.overlay;
              this._separator.style.display = i && n ? "" : "none"
            }
          },
          _onLayerChange: function (t) {
            var e = this._layers[r.stamp(t.layer)];
            if (e) {
              this._handlingClick || this._update();
              var n = e.overlay ? "layeradd" === t.type ? "overlayadd" : "overlayremove" : "layeradd" === t.type ? "baselayerchange" : null;
              n && this._map.fire(n, e)
            }
          },
          _createRadioElement: function (t, n) {
            var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"';
            n && (i += ' checked="checked"'), i += "/>";
            var o = e.createElement("div");
            return o.innerHTML = i, o.firstChild
          },
          _addItem: function (t) {
            var n, i = e.createElement("label"),
              o = this._map.hasLayer(t.layer);
            t.overlay ? (n = e.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = o) : n = this._createRadioElement("leaflet-base-layers", o), n.layerId = r.stamp(t.layer), r.DomEvent.on(n, "click", this._onInputClick, this);
            var s = e.createElement("span");
            s.innerHTML = " " + t.name, i.appendChild(n), i.appendChild(s);
            var a = t.overlay ? this._overlaysList : this._baseLayersList;
            return a.appendChild(i), i
          },
          _onInputClick: function () {
            var t, e, n, i = this._form.getElementsByTagName("input"),
              o = i.length;
            for (this._handlingClick = !0, t = 0; o > t; t++) e = i[t], n = this._layers[e.layerId], e.checked && !this._map.hasLayer(n.layer) ? this._map.addLayer(n.layer) : !e.checked && this._map.hasLayer(n.layer) && this._map.removeLayer(n.layer);
            this._handlingClick = !1, this._refocusOnMap()
          },
          _expand: function () {
            r.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
          },
          _collapse: function () {
            this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
          }
        }), r.control.layers = function (t, e, n) {
          return new r.Control.Layers(t, e, n)
        }, r.PosAnimation = r.Class.extend({
          includes: r.Mixin.Events,
          run: function (t, e, n, i) {
            this.stop(), this._el = t, this._inProgress = !0, this._newPos = e, this.fire("start"), t.style[r.DomUtil.TRANSITION] = "all " + (n || .25) + "s cubic-bezier(0,0," + (i || .5) + ",1)", r.DomEvent.on(t, r.DomUtil.TRANSITION_END, this._onTransitionEnd, this), r.DomUtil.setPosition(t, e), r.Util.falseFn(t.offsetWidth), this._stepTimer = setInterval(r.bind(this._onStep, this), 50)
          },
          stop: function () {
            this._inProgress && (r.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), r.Util.falseFn(this._el.offsetWidth))
          },
          _onStep: function () {
            var t = this._getPos();
            return t ? (this._el._leaflet_pos = t, void this.fire("step")) : void this._onTransitionEnd()
          },
          _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
          _getPos: function () {
            var e, n, i, o = this._el,
              s = t.getComputedStyle(o);
            if (r.Browser.any3d) {
              if (i = s[r.DomUtil.TRANSFORM].match(this._transformRe), !i) return;
              e = parseFloat(i[1]), n = parseFloat(i[2])
            } else e = parseFloat(s.left), n = parseFloat(s.top);
            return new r.Point(e, n, !0)
          },
          _onTransitionEnd: function () {
            r.DomEvent.off(this._el, r.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[r.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
          }
        }), r.Map.include({
          setView: function (t, e, n) {
            if (e = e === i ? this._zoom : this._limitZoom(e), t = this._limitCenter(r.latLng(t), e, this.options.maxBounds), n = n || {}, this._panAnim && this._panAnim.stop(), this._loaded && !n.reset && n !== !0) {
              n.animate !== i && (n.zoom = r.extend({
                animate: n.animate
              }, n.zoom), n.pan = r.extend({
                animate: n.animate
              }, n.pan));
              var o = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
              if (o) return clearTimeout(this._sizeTimer), this
            }
            return this._resetView(t, e), this
          },
          panBy: function (t, e) {
            if (t = r.point(t).round(), e = e || {}, !t.x && !t.y) return this;
            if (this._panAnim || (this._panAnim = new r.PosAnimation, this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
              }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
              r.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
              var n = this._getMapPanePos().subtract(t);
              this._panAnim.run(this._mapPane, n, e.duration || .25, e.easeLinearity)
            } else this._rawPanBy(t), this.fire("move").fire("moveend");
            return this
          },
          _onPanTransitionStep: function () {
            this.fire("move")
          },
          _onPanTransitionEnd: function () {
            r.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
          },
          _tryAnimatedPan: function (t, e) {
            var n = this._getCenterOffset(t)._floor();
            return !((e && e.animate) !== !0 && !this.getSize().contains(n)) && (this.panBy(n, e), !0)
          }
        }), r.PosAnimation = r.DomUtil.TRANSITION ? r.PosAnimation : r.PosAnimation.extend({
          run: function (t, e, n, i) {
            this.stop(), this._el = t, this._inProgress = !0, this._duration = n || .25, this._easeOutPower = 1 / Math.max(i || .5, .2), this._startPos = r.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
          },
          stop: function () {
            this._inProgress && (this._step(), this._complete())
          },
          _animate: function () {
            this._animId = r.Util.requestAnimFrame(this._animate, this), this._step()
          },
          _step: function () {
            var t = +new Date - this._startTime,
              e = 1e3 * this._duration;
            e > t ? this._runFrame(this._easeOut(t / e)) : (this._runFrame(1), this._complete())
          },
          _runFrame: function (t) {
            var e = this._startPos.add(this._offset.multiplyBy(t));
            r.DomUtil.setPosition(this._el, e), this.fire("step")
          },
          _complete: function () {
            r.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
          },
          _easeOut: function (t) {
            return 1 - Math.pow(1 - t, this._easeOutPower)
          }
        }), r.Map.mergeOptions({
          zoomAnimation: !0,
          zoomAnimationThreshold: 4
        }), r.DomUtil.TRANSITION && r.Map.addInitHook(function () {
          this._zoomAnimated = this.options.zoomAnimation && r.DomUtil.TRANSITION && r.Browser.any3d && !r.Browser.android23 && !r.Browser.mobileOpera, this._zoomAnimated && r.DomEvent.on(this._mapPane, r.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
        }), r.Map.include(r.DomUtil.TRANSITION ? {
          _catchTransitionEnd: function (t) {
            this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
          },
          _nothingToAnimate: function () {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
          },
          _tryAnimatedZoom: function (t, e, n) {
            if (this._animatingZoom) return !0;
            if (n = n || {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
            var i = this.getZoomScale(e),
              o = this._getCenterOffset(t)._divideBy(1 - 1 / i),
              r = this._getCenterLayerPoint()._add(o);
            return !(n.animate !== !0 && !this.getSize().contains(o)) && (this.fire("movestart").fire("zoomstart"), this._animateZoom(t, e, r, i, null, !0), !0)
          },
          _animateZoom: function (t, e, n, i, o, s, a) {
            a || (this._animatingZoom = !0), r.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = t, this._animateToZoom = e, r.Draggable && (r.Draggable._disabled = !0), r.Util.requestAnimFrame(function () {
              this.fire("zoomanim", {
                center: t,
                zoom: e,
                origin: n,
                scale: i,
                delta: o,
                backwards: s
              }), setTimeout(r.bind(this._onZoomTransitionEnd, this), 250)
            }, this)
          },
          _onZoomTransitionEnd: function () {
            this._animatingZoom && (this._animatingZoom = !1, r.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), r.Util.requestAnimFrame(function () {
              this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), r.Draggable && (r.Draggable._disabled = !1)
            }, this))
          }
        } : {}), r.TileLayer.include({
          _animateZoom: function (t) {
            this._animating || (this._animating = !0, this._prepareBgBuffer());
            var e = this._bgBuffer,
              n = r.DomUtil.TRANSFORM,
              i = t.delta ? r.DomUtil.getTranslateString(t.delta) : e.style[n],
              o = r.DomUtil.getScaleString(t.scale, t.origin);
            e.style[n] = t.backwards ? o + " " + i : i + " " + o
          },
          _endZoomAnim: function () {
            var t = this._tileContainer,
              e = this._bgBuffer;
            t.style.visibility = "", t.parentNode.appendChild(t), r.Util.falseFn(e.offsetWidth);
            var n = this._map.getZoom();
            (n > this.options.maxZoom || n < this.options.minZoom) && this._clearBgBuffer(), this._animating = !1
          },
          _clearBgBuffer: function () {
            var t = this._map;
            !t || t._animatingZoom || t.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[r.DomUtil.TRANSFORM] = "")
          },
          _prepareBgBuffer: function () {
            var t = this._tileContainer,
              e = this._bgBuffer,
              n = this._getLoadedTilesPercentage(e),
              i = this._getLoadedTilesPercentage(t);
            return e && n > .5 && .5 > i ? (t.style.visibility = "hidden", void this._stopLoadingImages(t)) : (e.style.visibility = "hidden", e.style[r.DomUtil.TRANSFORM] = "", this._tileContainer = e, e = this._bgBuffer = t, this._stopLoadingImages(e), void clearTimeout(this._clearBgBufferTimer))
          },
          _getLoadedTilesPercentage: function (t) {
            var e, n, i = t.getElementsByTagName("images"),
              o = 0;
            for (e = 0, n = i.length; n > e; e++) i[e].complete && o++;
            return o / n
          },
          _stopLoadingImages: function (t) {
            var e, n, i, o = Array.prototype.slice.call(t.getElementsByTagName("images"));
            for (e = 0, n = o.length; n > e; e++) i = o[e], i.complete || (i.onload = r.Util.falseFn, i.onerror = r.Util.falseFn, i.src = r.Util.emptyImageUrl, i.parentNode.removeChild(i))
          }
        }), r.Map.include({
          _defaultLocateOptions: {
            watch: !1,
            setView: !1,
            maxZoom: 1 / 0,
            timeout: 1e4,
            maximumAge: 0,
            enableHighAccuracy: !1
          },
          locate: function (t) {
            if (t = this._locateOptions = r.extend(this._defaultLocateOptions, t), !navigator.geolocation) return this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            }), this;
            var e = r.bind(this._handleGeolocationResponse, this),
              n = r.bind(this._handleGeolocationError, this);
            return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, n, t) : navigator.geolocation.getCurrentPosition(e, n, t), this
          },
          stopLocate: function () {
            return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
          },
          _handleGeolocationError: function (t) {
            var e = t.code,
              n = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
              code: e,
              message: "Geolocation error: " + n + "."
            })
          },
          _handleGeolocationResponse: function (t) {
            var e = t.coords.latitude,
              n = t.coords.longitude,
              i = new r.LatLng(e, n),
              o = 180 * t.coords.accuracy / 40075017,
              s = o / Math.cos(r.LatLng.DEG_TO_RAD * e),
              a = r.latLngBounds([e - o, n - s], [e + o, n + s]),
              l = this._locateOptions;
            if (l.setView) {
              var u = Math.min(this.getBoundsZoom(a), l.maxZoom);
              this.setView(i, u)
            }
            var c = {
              latlng: i,
              bounds: a,
              timestamp: t.timestamp
            };
            for (var h in t.coords) "number" == typeof t.coords[h] && (c[h] = t.coords[h]);
            this.fire("locationfound", c)
          }
        })
    }(window, document), n("ViewModels/DistanceLegendViewModel", ["Cesium/Core/defined", "Cesium/Core/DeveloperError", "Cesium/Core/EllipsoidGeodesic", "Cesium/Core/Cartesian2", "Cesium/Core/getTimestamp", "Cesium/Core/EventHelper", "KnockoutES5", "Core/loadView", "leaflet"], function (t, e, n, i, o, r, s, a, l) {
      "use strict";

      function u(e, n) {
        var r = o();
        if (!(r < e._lastLegendUpdate + 250)) {
          e._lastLegendUpdate = r;
          var s = n.canvas.clientWidth,
            a = n.canvas.clientHeight,
            l = n.camera.getPickRay(new i(s / 2 | 0, a - 1)),
            u = n.camera.getPickRay(new i(1 + s / 2 | 0, a - 1)),
            c = n.globe,
            h = c.pick(l, n),
            d = c.pick(u, n);
          if (!t(h) || !t(d)) return e.barWidth = void 0, void(e.distanceLabel = void 0);
          var m = c.ellipsoid.cartesianToCartographic(h),
            g = c.ellipsoid.cartesianToCartographic(d);
          p.setEndPoints(m, g);
          for (var _, v = p.surfaceDistance, y = 100, b = f.length - 1; !t(_) && b >= 0; --b) f[b] / v < y && (_ = f[b]);
          if (t(_)) {
            var w;
            w = _ >= 1e3 ? (_ / 1e3).toString() + " km" : _.toString() + " m", e.barWidth = _ / v | 0, e.distanceLabel = w
          } else e.barWidth = void 0, e.distanceLabel = void 0
        }
      }

      function c(t, e) {
        var n = e.getSize().y / 2,
          i = 100,
          o = e.containerPointToLatLng([0, n]).distanceTo(e.containerPointToLatLng([i, n])),
          r = l.control.scale()._getRoundNum(o),
          s = r < 1e3 ? r + " m" : r / 1e3 + " km";
        t.barWidth = r / o * i, t.distanceLabel = s
      }
      var h = function (n) {
        function i() {
          if (t(o.terria)) {
            var e = o.terria.scene;
            o._removeSubscription = e.postRender.addEventListener(function () {
              u(this, e)
            }, o)
          } else if (t(o.terria.leaflet)) {
            var n = o.terria.leaflet.map,
              i = function () {
                c(o, n)
              };
            o._removeSubscription = function () {
              n.off("zoomend", i), n.off("moveend", i)
            }, n.on("zoomend", i), n.on("moveend", i), c(o, n)
          }
        }
        if (!t(n) || !t(n.terria)) throw new e("options.terria is required.");
        this.terria = n.terria, this._removeSubscription = void 0, this._lastLegendUpdate = void 0, this.eventHelper = new r, this.distanceLabel = void 0, this.barWidth = void 0, s.track(this, ["distanceLabel", "barWidth"]), this.eventHelper.add(this.terria.afterWidgetChanged, function () {
          t(this._removeSubscription) && (this._removeSubscription(), this._removeSubscription = void 0)
        }, this);
        var o = this;
        i(), this.eventHelper.add(this.terria.afterWidgetChanged, function () {
          i()
        }, this)
      };
      h.prototype.destroy = function () {
        this.eventHelper.removeAll()
      }, h.prototype.show = function (t) {
        var e = '<div class="distance-legend" data-bind="visible: distanceLabel && barWidth"><div class="distance-legend-label" data-bind="text: distanceLabel"></div><div class="distance-legend-scale-bar" data-bind="style: { width: barWidth + \'px\', left: (5 + (125 - barWidth) / 2) + \'px\' }"></div></div>';
        a(e, t, this)
      }, h.create = function (t) {
        var e = new h(t);
        return e.show(t.container), e
      };
      var p = new n,
        f = [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500, 1e3, 2e3, 3e3, 5e3, 1e4, 2e4, 3e4, 5e4, 1e5, 2e5, 3e5, 5e5, 1e6, 2e6, 3e6, 5e6, 1e7, 2e7, 3e7, 5e7];
      return h
    }), n("ViewModels/UserInterfaceControl", ["Cesium/Core/defined", "Cesium/Core/defineProperties", "Cesium/Core/DeveloperError", "KnockoutES5"], function (t, e, n, i) {
      "use strict";
      var o = function (e) {
        if (!t(e)) throw new n("terria is required");
        this._terria = e, this.name = "Unnamed Control", this.text = void 0, this.svgIcon = void 0, this.svgHeight = void 0, this.svgWidth = void 0, this.cssClass = void 0, this.isActive = !1, i.track(this, ["name", "svgIcon", "svgHeight", "svgWidth", "cssClass", "isActive"])
      };
      return e(o.prototype, {
        terria: {
          get: function () {
            return this._terria
          }
        },
        hasText: {
          get: function () {
            return t(this.text) && "string" == typeof this.text
          }
        }
      }), o.prototype.activate = function () {
        throw new n("activate must be implemented in the derived class.")
      }, o
    }), n("ViewModels/NavigationControl", ["ViewModels/UserInterfaceControl"], function (t) {
      "use strict";
      var e = function (e) {
        t.apply(this, arguments)
      };
      return e.prototype = Object.create(t.prototype), e
    }), n("SvgPaths/svgReset", [], function () {
      "use strict";
      return "M 7.5,0 C 3.375,0 0,3.375 0,7.5 0,11.625 3.375,15 7.5,15 c 3.46875,0 6.375,-2.4375 7.21875,-5.625 l -1.96875,0 C 12,11.53125 9.9375,13.125 7.5,13.125 4.40625,13.125 1.875,10.59375 1.875,7.5 1.875,4.40625 4.40625,1.875 7.5,1.875 c 1.59375,0 2.90625,0.65625 3.9375,1.6875 l -3,3 6.5625,0 L 15,0 12.75,2.25 C 11.4375,0.84375 9.5625,0 7.5,0 z"
    }), n("ViewModels/ResetViewNavigationControl", ["Cesium/Core/defined", "Cesium/Scene/Camera", "Cesium/Core/Rectangle", "Cesium/Core/Cartographic", "ViewModels/NavigationControl", "SvgPaths/svgReset"], function (t, e, n, i, o, r) {
      "use strict";
      var s = function (t) {
        o.apply(this, arguments), this.name = "重置", this.svgIcon = r, this.svgHeight = 15, this.svgWidth = 15, this.cssClass = "navigation-control-icon-reset"
      };
      return s.prototype = Object.create(o.prototype), s.prototype.resetView = function () {
        var o = this.terria.scene,
          r = o.screenSpaceCameraController;
        if (r.enableInputs) {
          this.isActive = !0;
          var s = o.camera;
          if (t(this.terria.trackedEntity)) {
            var a = this.terria.trackedEntity;
            this.terria.trackedEntity = void 0, this.terria.trackedEntity = a
          } else if (this.terria.options.defaultResetView) {
            if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof i) s.flyTo({
              destination: o.globe.ellipsoid.cartographicToCartesian(this.terria.options.defaultResetView)
            });
            else if (this.terria.options.defaultResetView && this.terria.options.defaultResetView instanceof n) try {
              n.validate(this.terria.options.defaultResetView), s.flyTo({
                destination: this.terria.options.defaultResetView
              })
            } catch (t) {
              console.log("Cesium-navigation/ResetViewNavigationControl:   options.defaultResetView Cesium rectangle is  invalid!")
            }
          } else "function" == typeof s.flyHome ? s.flyHome(1) : s.flyTo({
            destination: e.DEFAULT_VIEW_RECTANGLE,
            duration: 1
          });
          this.isActive = !1
        }
      }, s.prototype.activate = function () {
        this.resetView()
      }, s
    }), n("Core/Utils", ["Cesium/Core/defined", "Cesium/Core/Ray", "Cesium/Core/Cartesian3", "Cesium/Core/Cartographic", "Cesium/Core/ReferenceFrame", "Cesium/Scene/SceneMode"], function (t, e, n, i, o, r) {
      "use strict";
      var s = {},
        a = new i,
        l = new e;
      return s.getCameraFocus = function (e, i, o) {
        var s = e.scene,
          u = s.camera;
        if (s.mode != r.MORPHING && (t(o) || (o = new n), t(e.trackedEntity) ? o = e.trackedEntity.position.getValue(e.clock.currentTime, o) : (l.origin = u.positionWC,
            l.direction = u.directionWC, o = s.globe.pick(l, s, o)), t(o))) return s.mode == r.SCENE2D || s.mode == r.COLUMBUS_VIEW ? (o = u.worldToCameraCoordinatesPoint(o, o), i && (o = s.globe.ellipsoid.cartographicToCartesian(s.mapProjection.unproject(o, a), o))) : i || (o = u.worldToCameraCoordinatesPoint(o, o)), o
      }, s
    }), n("ViewModels/ZoomNavigationControl", ["Cesium/Core/defined", "Cesium/Core/Ray", "Cesium/Core/IntersectionTests", "Cesium/Core/Cartesian3", "Cesium/Scene/SceneMode", "ViewModels/NavigationControl", "Core/Utils"], function (t, e, n, i, o, r, s) {
      "use strict";
      var a = function (t, e) {
        r.apply(this, arguments), this.name = e ? "放大" : "缩小", this.text = e ? "+" : "-", this.cssClass = "navigation-control-icon-zoom-" + (e ? "in" : "out"), this.relativeAmount = 2, e && (this.relativeAmount = 1 / this.relativeAmount)
      };
      a.prototype.relativeAmount = 1, a.prototype = Object.create(r.prototype), a.prototype.activate = function () {
        this.zoom(this.relativeAmount)
      };
      var l = new i;
      return a.prototype.zoom = function (r) {
        if (this.isActive = !0, t(this.terria)) {
          var a = this.terria.scene,
            u = a.screenSpaceCameraController;
          if (!u.enableInputs || !u.enableZoom) return;
          var c, h = a.camera;
          switch (a.mode) {
            case o.MORPHING:
              break;
            case o.SCENE2D:
              h.zoomIn(h.positionCartographic.height * (1 - this.relativeAmount));
              break;
            default:
              var p;
              if (p = t(this.terria.trackedEntity) ? new i : s.getCameraFocus(this.terria, !1), t(p)) c = {
                direction: h.direction,
                up: h.up
              };
              else {
                var f = new e(h.worldToCameraCoordinatesPoint(a.globe.ellipsoid.cartographicToCartesian(h.positionCartographic)), h.directionWC);
                p = n.grazingAltitudeLocation(f, a.globe.ellipsoid), c = {
                  heading: h.heading,
                  pitch: h.pitch,
                  roll: h.roll
                }
              }
              var d = i.subtract(h.position, p, l),
                m = i.multiplyByScalar(d, r, d),
                g = i.add(p, m, p);
              t(this.terria.trackedEntity) || a.mode == o.COLUMBUS_VIEW ? h.position = g : h.flyTo({
                destination: g,
                orientation: c,
                duration: .5,
                convert: !1
              })
          }
        }
        this.isActive = !1
      }, a
    }), n("SvgPaths/svgCompassOuterRing", [], function () {
      "use strict";
      return "m 66.5625,0 0,15.15625 3.71875,0 0,-10.40625 5.5,10.40625 4.375,0 0,-15.15625 -3.71875,0 0,10.40625 L 70.9375,0 66.5625,0 z M 72.5,20.21875 c -28.867432,0 -52.28125,23.407738 -52.28125,52.28125 0,28.87351 23.413818,52.3125 52.28125,52.3125 28.86743,0 52.28125,-23.43899 52.28125,-52.3125 0,-28.873512 -23.41382,-52.28125 -52.28125,-52.28125 z m 0,1.75 c 13.842515,0 26.368948,5.558092 35.5,14.5625 l -11.03125,11 0.625,0.625 11.03125,-11 c 8.9199,9.108762 14.4375,21.579143 14.4375,35.34375 0,13.764606 -5.5176,26.22729 -14.4375,35.34375 l -11.03125,-11 -0.625,0.625 11.03125,11 c -9.130866,9.01087 -21.658601,14.59375 -35.5,14.59375 -13.801622,0 -26.321058,-5.53481 -35.4375,-14.5 l 11.125,-11.09375 c 6.277989,6.12179 14.857796,9.90625 24.3125,9.90625 19.241896,0 34.875,-15.629154 34.875,-34.875 0,-19.245847 -15.633104,-34.84375 -34.875,-34.84375 -9.454704,0 -18.034511,3.760884 -24.3125,9.875 L 37.0625,36.4375 C 46.179178,27.478444 58.696991,21.96875 72.5,21.96875 z m -0.875,0.84375 0,13.9375 1.75,0 0,-13.9375 -1.75,0 z M 36.46875,37.0625 47.5625,48.15625 C 41.429794,54.436565 37.65625,63.027539 37.65625,72.5 c 0,9.472461 3.773544,18.055746 9.90625,24.34375 L 36.46875,107.9375 c -8.96721,-9.1247 -14.5,-21.624886 -14.5,-35.4375 0,-13.812615 5.53279,-26.320526 14.5,-35.4375 z M 72.5,39.40625 c 18.297686,0 33.125,14.791695 33.125,33.09375 0,18.302054 -14.827314,33.125 -33.125,33.125 -18.297687,0 -33.09375,-14.822946 -33.09375,-33.125 0,-18.302056 14.796063,-33.09375 33.09375,-33.09375 z M 22.84375,71.625 l 0,1.75 13.96875,0 0,-1.75 -13.96875,0 z m 85.5625,0 0,1.75 14,0 0,-1.75 -14,0 z M 71.75,108.25 l 0,13.9375 1.71875,0 0,-13.9375 -1.71875,0 z"
    }), n("SvgPaths/svgCompassGyro", [], function () {
      "use strict";
      return "m 72.71875,54.375 c -0.476702,0 -0.908208,0.245402 -1.21875,0.5625 -0.310542,0.317098 -0.551189,0.701933 -0.78125,1.1875 -0.172018,0.363062 -0.319101,0.791709 -0.46875,1.25 -6.91615,1.075544 -12.313231,6.656514 -13,13.625 -0.327516,0.117495 -0.661877,0.244642 -0.9375,0.375 -0.485434,0.22959 -0.901634,0.471239 -1.21875,0.78125 -0.317116,0.310011 -0.5625,0.742111 -0.5625,1.21875 l 0.03125,0 c 0,0.476639 0.245384,0.877489 0.5625,1.1875 0.317116,0.310011 0.702066,0.58291 1.1875,0.8125 0.35554,0.168155 0.771616,0.32165 1.21875,0.46875 1.370803,6.10004 6.420817,10.834127 12.71875,11.8125 0.146999,0.447079 0.30025,0.863113 0.46875,1.21875 0.230061,0.485567 0.470708,0.870402 0.78125,1.1875 0.310542,0.317098 0.742048,0.5625 1.21875,0.5625 0.476702,0 0.876958,-0.245402 1.1875,-0.5625 0.310542,-0.317098 0.582439,-0.701933 0.8125,-1.1875 0.172018,-0.363062 0.319101,-0.791709 0.46875,-1.25 6.249045,-1.017063 11.256351,-5.7184 12.625,-11.78125 0.447134,-0.1471 0.86321,-0.300595 1.21875,-0.46875 0.485434,-0.22959 0.901633,-0.502489 1.21875,-0.8125 0.317117,-0.310011 0.5625,-0.710861 0.5625,-1.1875 l -0.03125,0 c 0,-0.476639 -0.245383,-0.908739 -0.5625,-1.21875 C 89.901633,71.846239 89.516684,71.60459 89.03125,71.375 88.755626,71.244642 88.456123,71.117495 88.125,71 87.439949,64.078341 82.072807,58.503735 75.21875,57.375 c -0.15044,-0.461669 -0.326927,-0.884711 -0.5,-1.25 -0.230061,-0.485567 -0.501958,-0.870402 -0.8125,-1.1875 -0.310542,-0.317098 -0.710798,-0.5625 -1.1875,-0.5625 z m -0.0625,1.40625 c 0.03595,-0.01283 0.05968,0 0.0625,0 0.0056,0 0.04321,-0.02233 0.1875,0.125 0.144288,0.147334 0.34336,0.447188 0.53125,0.84375 0.06385,0.134761 0.123901,0.309578 0.1875,0.46875 -0.320353,-0.01957 -0.643524,-0.0625 -0.96875,-0.0625 -0.289073,0 -0.558569,0.04702 -0.84375,0.0625 C 71.8761,57.059578 71.936151,56.884761 72,56.75 c 0.18789,-0.396562 0.355712,-0.696416 0.5,-0.84375 0.07214,-0.07367 0.120304,-0.112167 0.15625,-0.125 z m 0,2.40625 c 0.448007,0 0.906196,0.05436 1.34375,0.09375 0.177011,0.592256 0.347655,1.271044 0.5,2.03125 0.475097,2.370753 0.807525,5.463852 0.9375,8.9375 -0.906869,-0.02852 -1.834463,-0.0625 -2.78125,-0.0625 -0.92298,0 -1.802327,0.03537 -2.6875,0.0625 0.138529,-3.473648 0.493653,-6.566747 0.96875,-8.9375 0.154684,-0.771878 0.320019,-1.463985 0.5,-2.0625 0.405568,-0.03377 0.804291,-0.0625 1.21875,-0.0625 z m -2.71875,0.28125 c -0.129732,0.498888 -0.259782,0.987558 -0.375,1.5625 -0.498513,2.487595 -0.838088,5.693299 -0.96875,9.25 -3.21363,0.15162 -6.119596,0.480068 -8.40625,0.9375 -0.682394,0.136509 -1.275579,0.279657 -1.84375,0.4375 0.799068,-6.135482 5.504716,-11.036454 11.59375,-12.1875 z M 75.5,58.5 c 6.043169,1.18408 10.705093,6.052712 11.5,12.15625 -0.569435,-0.155806 -1.200273,-0.302525 -1.875,-0.4375 -2.262525,-0.452605 -5.108535,-0.783809 -8.28125,-0.9375 -0.130662,-3.556701 -0.470237,-6.762405 -0.96875,-9.25 C 75.761959,59.467174 75.626981,58.990925 75.5,58.5 z m -2.84375,12.09375 c 0.959338,0 1.895843,0.03282 2.8125,0.0625 C 75.48165,71.267751 75.5,71.871028 75.5,72.5 c 0,1.228616 -0.01449,2.438313 -0.0625,3.59375 -0.897358,0.0284 -1.811972,0.0625 -2.75,0.0625 -0.927373,0 -1.831062,-0.03473 -2.71875,-0.0625 -0.05109,-1.155437 -0.0625,-2.365134 -0.0625,-3.59375 0,-0.628972 0.01741,-1.232249 0.03125,-1.84375 0.895269,-0.02827 1.783025,-0.0625 2.71875,-0.0625 z M 68.5625,70.6875 c -0.01243,0.60601 -0.03125,1.189946 -0.03125,1.8125 0,1.22431 0.01541,2.407837 0.0625,3.5625 -3.125243,-0.150329 -5.92077,-0.471558 -8.09375,-0.90625 -0.784983,-0.157031 -1.511491,-0.316471 -2.125,-0.5 -0.107878,-0.704096 -0.1875,-1.422089 -0.1875,-2.15625 0,-0.115714 0.02849,-0.228688 0.03125,-0.34375 0.643106,-0.20284 1.389577,-0.390377 2.25,-0.5625 2.166953,-0.433487 4.97905,-0.75541 8.09375,-0.90625 z m 8.3125,0.03125 c 3.075121,0.15271 5.824455,0.446046 7.96875,0.875 0.857478,0.171534 1.630962,0.360416 2.28125,0.5625 0.0027,0.114659 0,0.228443 0,0.34375 0,0.735827 -0.07914,1.450633 -0.1875,2.15625 -0.598568,0.180148 -1.29077,0.34562 -2.0625,0.5 -2.158064,0.431708 -4.932088,0.754666 -8.03125,0.90625 0.04709,-1.154663 0.0625,-2.33819 0.0625,-3.5625 0,-0.611824 -0.01924,-1.185379 -0.03125,-1.78125 z M 57.15625,72.5625 c 0.0023,0.572772 0.06082,1.131112 0.125,1.6875 -0.125327,-0.05123 -0.266577,-0.10497 -0.375,-0.15625 -0.396499,-0.187528 -0.665288,-0.387337 -0.8125,-0.53125 -0.147212,-0.143913 -0.15625,-0.182756 -0.15625,-0.1875 0,-0.0047 -0.02221,-0.07484 0.125,-0.21875 0.147212,-0.143913 0.447251,-0.312472 0.84375,-0.5 0.07123,-0.03369 0.171867,-0.06006 0.25,-0.09375 z m 31.03125,0 c 0.08201,0.03503 0.175941,0.05872 0.25,0.09375 0.396499,0.187528 0.665288,0.356087 0.8125,0.5 0.14725,0.14391 0.15625,0.21405 0.15625,0.21875 0,0.0047 -0.009,0.04359 -0.15625,0.1875 -0.147212,0.143913 -0.416001,0.343722 -0.8125,0.53125 -0.09755,0.04613 -0.233314,0.07889 -0.34375,0.125 0.06214,-0.546289 0.09144,-1.094215 0.09375,-1.65625 z m -29.5,3.625 c 0.479308,0.123125 0.983064,0.234089 1.53125,0.34375 2.301781,0.460458 5.229421,0.787224 8.46875,0.9375 0.167006,2.84339 0.46081,5.433176 0.875,7.5 0.115218,0.574942 0.245268,1.063612 0.375,1.5625 -5.463677,-1.028179 -9.833074,-5.091831 -11.25,-10.34375 z m 27.96875,0 C 85.247546,81.408945 80.919274,85.442932 75.5,86.5 c 0.126981,-0.490925 0.261959,-0.967174 0.375,-1.53125 0.41419,-2.066824 0.707994,-4.65661 0.875,-7.5 3.204493,-0.15162 6.088346,-0.480068 8.375,-0.9375 0.548186,-0.109661 1.051942,-0.220625 1.53125,-0.34375 z M 70.0625,77.53125 c 0.865391,0.02589 1.723666,0.03125 2.625,0.03125 0.912062,0 1.782843,-0.0048 2.65625,-0.03125 -0.165173,2.736408 -0.453252,5.207651 -0.84375,7.15625 -0.152345,0.760206 -0.322989,1.438994 -0.5,2.03125 -0.437447,0.03919 -0.895856,0.0625 -1.34375,0.0625 -0.414943,0 -0.812719,-0.02881 -1.21875,-0.0625 -0.177011,-0.592256 -0.347655,-1.271044 -0.5,-2.03125 -0.390498,-1.948599 -0.700644,-4.419842 -0.875,-7.15625 z m 1.75,10.28125 c 0.284911,0.01545 0.554954,0.03125 0.84375,0.03125 0.325029,0 0.648588,-0.01171 0.96875,-0.03125 -0.05999,0.148763 -0.127309,0.31046 -0.1875,0.4375 -0.18789,0.396562 -0.386962,0.696416 -0.53125,0.84375 -0.144288,0.147334 -0.181857,0.125 -0.1875,0.125 -0.0056,0 -0.07446,0.02233 -0.21875,-0.125 C 72.355712,88.946416 72.18789,88.646562 72,88.25 71.939809,88.12296 71.872486,87.961263 71.8125,87.8125 z"
    }), n("SvgPaths/svgCompassRotationMarker", [], function () {
      "use strict";
      return "M 72.46875,22.03125 C 59.505873,22.050338 46.521615,27.004287 36.6875,36.875 L 47.84375,47.96875 C 61.521556,34.240041 83.442603,34.227389 97.125,47.90625 l 11.125,-11.125 C 98.401629,26.935424 85.431627,22.012162 72.46875,22.03125 z"
    }), n("ViewModels/NavigationViewModel", ["Cesium/Core/defined", "Cesium/Core/Math", "Cesium/Core/getTimestamp", "Cesium/Core/EventHelper", "Cesium/Core/Transforms", "Cesium/Scene/SceneMode", "Cesium/Core/Cartesian2", "Cesium/Core/Cartesian3", "Cesium/Core/Matrix4", "Cesium/Core/BoundingSphere", "Cesium/Core/HeadingPitchRange", "KnockoutES5", "Core/loadView", "ViewModels/ResetViewNavigationControl", "ViewModels/ZoomNavigationControl", "SvgPaths/svgCompassOuterRing", "SvgPaths/svgCompassGyro", "SvgPaths/svgCompassRotationMarker", "Core/Utils"], function (t, e, n, i, o, r, s, a, l, u, c, h, p, f, d, m, g, _, v) {
      "use strict";

      function y(i, u, c) {
        function h(t, n) {
          var o = Math.atan2(-t.y, t.x);
          i.orbitCursorAngle = e.zeroToTwoPi(o - e.PI_OVER_TWO);
          var r = s.magnitude(t),
            a = n / 2,
            l = Math.min(r / a, 1),
            u = .5 * l * l + .5;
          i.orbitCursorOpacity = u
        }
        var p = i.terria.scene,
          f = p.screenSpaceCameraController;
        if (p.mode != r.MORPHING && f.enableInputs) {
          switch (p.mode) {
            case r.COLUMBUS_VIEW:
              if (f.enableLook) break;
              if (!f.enableTranslate || !f.enableTilt) return;
              break;
            case r.SCENE3D:
              if (f.enableLook) break;
              if (!f.enableTilt || !f.enableRotate) return;
              break;
            case r.SCENE2D:
              if (!f.enableTranslate) return
          }
          document.removeEventListener("mousemove", i.orbitMouseMoveFunction, !1), document.removeEventListener("mouseup", i.orbitMouseUpFunction, !1), t(i.orbitTickFunction) && i.terria.clock.onTick.removeEventListener(i.orbitTickFunction), i.orbitMouseMoveFunction = void 0, i.orbitMouseUpFunction = void 0, i.orbitTickFunction = void 0, i.isOrbiting = !0, i.orbitLastTimestamp = n();
          var d = p.camera;
          if (t(i.terria.trackedEntity)) i.orbitFrame = void 0, i.orbitIsLook = !1;
          else {
            var m = v.getCameraFocus(i.terria, !0, E);
            t(m) ? (i.orbitFrame = o.eastNorthUpToFixedFrame(m, p.globe.ellipsoid, x), i.orbitIsLook = !1) : (i.orbitFrame = o.eastNorthUpToFixedFrame(d.positionWC, p.globe.ellipsoid, x), i.orbitIsLook = !0)
          }
          i.orbitTickFunction = function (o) {
            var s, u = n(),
              c = u - i.orbitLastTimestamp,
              h = 2.5 * (i.orbitCursorOpacity - .5) / 1e3,
              f = c * h,
              m = i.orbitCursorAngle + e.PI_OVER_TWO,
              g = Math.cos(m) * f,
              _ = Math.sin(m) * f;
            t(i.orbitFrame) && (s = l.clone(d.transform, C), d.lookAtTransform(i.orbitFrame)), p.mode == r.SCENE2D ? d.move(new a(g, _, 0), Math.max(p.canvas.clientWidth, p.canvas.clientHeight) / 100 * d.positionCartographic.height * f) : i.orbitIsLook ? (d.look(a.UNIT_Z, -g), d.look(d.right, -_)) : (d.rotateLeft(g), d.rotateUp(_)), t(i.orbitFrame) && d.lookAtTransform(s), i.orbitLastTimestamp = u
          }, i.orbitMouseMoveFunction = function (t) {
            var e = u.getBoundingClientRect(),
              n = new s((e.right - e.left) / 2, (e.bottom - e.top) / 2),
              i = new s(t.clientX - e.left, t.clientY - e.top),
              o = s.subtract(i, n, k);
            h(o, e.width)
          }, i.orbitMouseUpFunction = function (e) {
            i.isOrbiting = !1, document.removeEventListener("mousemove", i.orbitMouseMoveFunction, !1), document.removeEventListener("mouseup", i.orbitMouseUpFunction, !1), t(i.orbitTickFunction) && i.terria.clock.onTick.removeEventListener(i.orbitTickFunction), i.orbitMouseMoveFunction = void 0, i.orbitMouseUpFunction = void 0, i.orbitTickFunction = void 0
          }, document.addEventListener("mousemove", i.orbitMouseMoveFunction, !1), document.addEventListener("mouseup", i.orbitMouseUpFunction, !1), i.terria.clock.onTick.addEventListener(i.orbitTickFunction), h(c, u.getBoundingClientRect().width)
        }
      }

      function b(n, i, a) {
        var u = n.terria.scene,
          c = u.camera,
          h = u.screenSpaceCameraController;
        if (u.mode != r.MORPHING && u.mode != r.SCENE2D && h.enableInputs && (h.enableLook || u.mode != r.COLUMBUS_VIEW && (u.mode != r.SCENE3D || h.enableRotate))) {
          if (document.removeEventListener("mousemove", n.rotateMouseMoveFunction, !1), document.removeEventListener("mouseup", n.rotateMouseUpFunction, !1), n.rotateMouseMoveFunction = void 0, n.rotateMouseUpFunction = void 0, n.isRotating = !0, n.rotateInitialCursorAngle = Math.atan2(-a.y, a.x), t(n.terria.trackedEntity)) n.rotateFrame = void 0, n.rotateIsLook = !1;
          else {
            var p = v.getCameraFocus(n.terria, !0, E);
            t(p) && (u.mode != r.COLUMBUS_VIEW || h.enableLook || h.enableTranslate) ? (n.rotateFrame = o.eastNorthUpToFixedFrame(p, u.globe.ellipsoid, x), n.rotateIsLook = !1) : (n.rotateFrame = o.eastNorthUpToFixedFrame(c.positionWC, u.globe.ellipsoid, x), n.rotateIsLook = !0)
          }
          var f;
          t(n.rotateFrame) && (f = l.clone(c.transform, C), c.lookAtTransform(n.rotateFrame)), n.rotateInitialCameraAngle = -c.heading, t(n.rotateFrame) && c.lookAtTransform(f), n.rotateMouseMoveFunction = function (o) {
            var r, a = i.getBoundingClientRect(),
              u = new s((a.right - a.left) / 2, (a.bottom - a.top) / 2),
              c = new s(o.clientX - a.left, o.clientY - a.top),
              h = s.subtract(c, u, k),
              p = Math.atan2(-h.y, h.x),
              f = p - n.rotateInitialCursorAngle,
              d = e.zeroToTwoPi(n.rotateInitialCameraAngle - f),
              m = n.terria.scene.camera;
            t(n.rotateFrame) && (r = l.clone(m.transform, C), m.lookAtTransform(n.rotateFrame));
            var g = -m.heading;
            m.rotateRight(d - g), t(n.rotateFrame) && m.lookAtTransform(r)
          }, n.rotateMouseUpFunction = function (t) {
            n.isRotating = !1, document.removeEventListener("mousemove", n.rotateMouseMoveFunction, !1), document.removeEventListener("mouseup", n.rotateMouseUpFunction, !1), n.rotateMouseMoveFunction = void 0, n.rotateMouseUpFunction = void 0
          }, document.addEventListener("mousemove", n.rotateMouseMoveFunction, !1), document.addEventListener("mouseup", n.rotateMouseUpFunction, !1)
        }
      }
      var w = function (e) {
        function n() {
          t(o.terria) ? (o._unsubcribeFromPostRender && (o._unsubcribeFromPostRender(), o._unsubcribeFromPostRender = void 0), o.showCompass = !0, o._unsubcribeFromPostRender = o.terria.scene.postRender.addEventListener(function () {
            o.heading = o.terria.scene.camera.heading
          })) : (o._unsubcribeFromPostRender && (o._unsubcribeFromPostRender(), o._unsubcribeFromPostRender = void 0), o.showCompass = !1)
        }
        this.terria = e.terria, this.eventHelper = new i, this.controls = e.controls, t(this.controls) || (this.controls = [new d(this.terria, !0), new f(this.terria), new d(this.terria, !1)]), this.svgCompassOuterRing = m, this.svgCompassGyro = g, this.svgCompassRotationMarker = _, this.showCompass = t(this.terria), this.heading = this.showCompass ? this.terria.scene.camera.heading : 0, this.isOrbiting = !1, this.orbitCursorAngle = 0, this.orbitCursorOpacity = 0, this.orbitLastTimestamp = 0, this.orbitFrame = void 0, this.orbitIsLook = !1, this.orbitMouseMoveFunction = void 0, this.orbitMouseUpFunction = void 0, this.isRotating = !1, this.rotateInitialCursorAngle = void 0, this.rotateFrame = void 0, this.rotateIsLook = !1, this.rotateMouseMoveFunction = void 0, this.rotateMouseUpFunction = void 0, this._unsubcribeFromPostRender = void 0, h.track(this, ["controls", "showCompass", "heading", "isOrbiting", "orbitCursorAngle", "isRotating"]);
        var o = this;
        this.eventHelper.add(this.terria.afterWidgetChanged, n, this), n()
      };
      w.prototype.destroy = function () {
        this.eventHelper.removeAll()
      }, w.prototype.show = function (t) {
        var e = '<div class="compass" title="单击拖动陀螺仪:按轨道转动，还可以按住CTRL键并拖动地图；双击:重置视图。" data-bind="visible: showCompass, event: { mousedown: handleMouseDown, dblclick: handleDoubleClick }"><div class="compass-outer-ring-background"></div> <div class="compass-rotation-marker" data-bind="visible: isOrbiting, style: { transform: \'rotate(-\' + orbitCursorAngle + \'rad)\', \'-webkit-transform\': \'rotate(-\' + orbitCursorAngle + \'rad)\', opacity: orbitCursorOpacity }, cesiumSvgPath: { path: svgCompassRotationMarker, width: 145, height: 145 }"></div> <div class="compass-outer-ring" title="单击拖动旋转地球" data-bind="style: { transform: \'rotate(-\' + heading + \'rad)\', \'-webkit-transform\': \'rotate(-\' + heading + \'rad)\' }, cesiumSvgPath: { path: svgCompassOuterRing, width: 145, height: 145 }"></div> <div class="compass-gyro-background"></div> <div class="compass-gyro" data-bind="cesiumSvgPath: { path: svgCompassGyro, width: 145, height: 145 }, css: { \'compass-gyro-active\': isOrbiting }"></div></div><div class="navigation-controls"><!-- ko foreach: controls --><div data-bind="click: activate, attr: { title: $data.name }, css: $root.isLastControl($data) ? \'navigation-control-last\' : \'navigation-control\' ">   <!-- ko if: $data.hasText -->   <div data-bind="text: $data.text, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>   <!-- /ko -->  <!-- ko ifnot: $data.hasText -->  <div data-bind="cesiumSvgPath: { path: $data.svgIcon, width: $data.svgWidth, height: $data.svgHeight }, css: $data.isActive ?  \'navigation-control-icon-active \' + $data.cssClass : $data.cssClass"></div>  <!-- /ko --> </div> <!-- /ko --></div>';
        p(e, t, this)
      }, w.prototype.add = function (t) {
        this.controls.push(t)
      }, w.prototype.remove = function (t) {
        this.controls.remove(t)
      }, w.prototype.isLastControl = function (t) {
        return t === this.controls[this.controls.length - 1]
      };
      var k = new s;
      w.prototype.handleMouseDown = function (t, e) {
        var n = this.terria.scene;
        if (n.mode == r.MORPHING) return !0;
        var i = e.currentTarget,
          o = e.currentTarget.getBoundingClientRect(),
          a = o.width / 2,
          l = new s((o.right - o.left) / 2, (o.bottom - o.top) / 2),
          u = new s(e.clientX - o.left, e.clientY - o.top),
          c = s.subtract(u, l, k),
          h = s.magnitude(c),
          p = h / a,
          f = 145,
          d = 50;
        if (p < d / f) y(this, i, c);
        else {
          if (!(p < 1)) return !0;
          b(this, i, c)
        }
      };
      var C = new l,
        x = new l,
        E = new a;
      return w.prototype.handleDoubleClick = function (n, i) {
        var o = n.terria.scene,
          s = o.camera,
          l = o.screenSpaceCameraController;
        if (o.mode == r.MORPHING || !l.enableInputs) return !0;
        if (o.mode != r.COLUMBUS_VIEW || l.enableTranslate) {
          if (o.mode == r.SCENE3D || o.mode == r.COLUMBUS_VIEW) {
            if (!l.enableLook) return;
            if (o.mode == r.SCENE3D && !l.enableRotate) return
          }
          var h = v.getCameraFocus(n.terria, !0, E);
          if (!t(h)) return void this.controls[1].resetView();
          var p = o.globe.ellipsoid.cartographicToCartesian(s.positionCartographic, new a),
            f = o.globe.ellipsoid.geodeticSurfaceNormal(h),
            d = new u(h, 0);
          s.flyToBoundingSphere(d, {
            offset: new c(0, e.PI_OVER_TWO - a.angleBetween(f, s.directionWC), a.distance(p, h)),
            duration: 1.5
          })
        }
      }, w.create = function (t) {
        var e = new w(t);
        return e.show(t.container), e
      }, w
    }), n("CesiumNavigation", ["Cesium/Core/defined", "Cesium/Core/defineProperties", "Cesium/Core/Event", "KnockoutES5", "Core/registerKnockoutBindings", "ViewModels/DistanceLegendViewModel", "ViewModels/NavigationViewModel"], function (t, e, n, i, o, r, s) {
      "use strict";

      function a(e, i) {
        if (!t(e)) throw new DeveloperError("CesiumWidget or Viewer is required.");
        var a = t(e.cesiumWidget) ? e.cesiumWidget : e,
          l = document.createElement("div");
        l.className = "cesium-widget-cesiumNavigationContainer", a.container.appendChild(l), this.terria = e, this.terria.options = i, this.terria.afterWidgetChanged = new n, this.terria.beforeWidgetChanged = new n, this.container = l, this.navigationDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "navigationDiv"), this.distanceLegendDiv = document.createElement("div"), this.navigationDiv.setAttribute("id", "distanceLegendDiv"), l.appendChild(this.navigationDiv), l.appendChild(this.distanceLegendDiv), o(), this.distanceLegendViewModel = r.create({
          container: this.distanceLegendDiv,
          terria: this.terria,
          mapElement: l
        }), this.navigationViewModel = s.create({
          container: this.navigationDiv,
          terria: this.terria
        })
      }
      var l = function (t) {
        a.apply(this, arguments), this._onDestroyListeners = []
      };
      return l.prototype.distanceLegendViewModel = void 0, l.prototype.navigationViewModel = void 0, l.prototype.navigationDiv = void 0, l.prototype.distanceLegendDiv = void 0, l.prototype.terria = void 0, l.prototype.container = void 0, l.prototype._onDestroyListeners = void 0, l.prototype.destroy = function () {
        t(this.navigationViewModel) && this.navigationViewModel.destroy(), t(this.distanceLegendViewModel) && this.distanceLegendViewModel.destroy(), t(this.navigationDiv) && this.navigationDiv.parentNode.removeChild(this.navigationDiv), delete this.navigationDiv, t(this.distanceLegendDiv) && this.distanceLegendDiv.parentNode.removeChild(this.distanceLegendDiv), delete this.distanceLegendDiv, t(this.container) && this.container.parentNode.removeChild(this.container), delete this.container;
        for (var e = 0; e < this._onDestroyListeners.length; e++) this._onDestroyListeners[e]()
      }, l.prototype.addOnDestroyListener = function (t) {
        "function" == typeof t && this._onDestroyListeners.push(t)
      }, l
    }), n("dummy/require-less/less/dummy", [], function () {}), n("viewerCesiumNavigationMixin", ["Cesium/Core/defined", "Cesium/Core/defineProperties", "Cesium/Core/DeveloperError", "CesiumNavigation", "dummy/require-less/less/dummy"], function (t, e, n, i) {
      "use strict";

      function o(i, o) {
        if (!t(i)) throw new n("viewer is required.");
        var s = r(i, o);
        s.addOnDestroyListener(function (t) {
          return function () {
            delete t.cesiumNavigation
          }
        }(i)), e(i, {
          cesiumNavigation: {
            configurable: !0,
            get: function () {
              return i.cesiumWidget.cesiumNavigation
            }
          }
        })
      }
      o.mixinWidget = function (t, e) {
        return r.apply(void 0, arguments)
      };
      var r = function (n, o) {
        var r = new i(n, o),
          s = t(n.cesiumWidget) ? n.cesiumWidget : n;
        return e(s, {
          cesiumNavigation: {
            configurable: !0,
            get: function () {
              return r
            }
          }
        }), r.addOnDestroyListener(function (t) {
          return function () {
            delete t.cesiumNavigation
          }
        }(s)), r
      };
      return o
    }),
    function (t) {
      var e = document,
        n = "appendChild",
        i = "styleSheet",
        o = e.createElement("style");
      o.type = "text/css", e.getElementsByTagName("head")[0][n](o), o[i] ? o[i].cssText = t : o[n](e.createTextNode(t))
    }(".full-window,.modal,.modal-background{top:0;left:0;bottom:0;right:0}.markdown svg,.modal{max-height:100%}.markdown images,.modal{max-width:100%}.full-window{position:absolute;margin:0;overflow:hidden;padding:0;-webkit-transition:left .25s ease-out;transition:left .25s ease-out}.transparent-to-input{pointer-events:none}.modal-background,.opaque-to-input{pointer-events:auto}.clickable{cursor:pointer}.markdown a:hover,.markdown u,a:hover{text-decoration:underline}.modal-background{background-color:rgba(0,0,0,.5);z-index:1000;position:fixed}.modal,.modal-close-button{position:absolute;color:#fff}.modal{margin:auto;background-color:#2f353c;font-family:Roboto,sans-serif}.modal-header{background-color:rgba(0,0,0,.2);border-bottom:1px solid rgba(100,100,100,.6);font-size:15px;line-height:40px;margin:0}.modal-header h1{font-size:15px;color:#fff;margin-left:15px}.modal-content{margin-left:15px;margin-right:15px;margin-bottom:15px;padding-top:15px;overflow:auto}.modal-close-button{right:15px;cursor:pointer;font-size:18px}#ui{z-index:2100}@media print{.full-window{position:initial}.floating{display:none}}.markdown fieldset,.markdown input,.markdown select,.markdown textarea{font-family:inherit;font-size:1rem;-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:0;margin-bottom:0}.markdown label{vertical-align:middle}.markdown h1,.markdown h2,.markdown h3,.markdown h4,.markdown h5,.markdown h6{font-family:inherit;font-weight:700;line-height:1.25;margin-top:1em;margin-bottom:.5em}.markdown dl,.markdown ol,.markdown p,.markdown pre,.markdown ul{margin-top:0;margin-bottom:1rem}.markdown h1{font-size:2rem}.markdown h2{font-size:1.5rem}.markdown h3{font-size:1.25rem}.markdown h4{font-size:1rem}.markdown h5{font-size:.875rem}.markdown h6{font-size:.75rem}.markdown strong{font-weight:700}.markdown em{font-style:italic}.markdown small{font-size:80%}.markdown mark{color:#000;background:#ff0}.markdown s{text-decoration:line-through}.markdown ol{list-style:decimal inside}.markdown ul{list-style:disc inside}.markdown code,.markdown pre,.markdown samp{font-family:monospace;font-size:inherit}.markdown pre{overflow-x:scroll}.markdown a{color:#68adfe;text-decoration:none}.markdown code,.markdown pre{background-color:transparent;border-radius:3px}.markdown hr{border:0;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgba(0,0,0,.125)}.distance-legend,.floating,.floating-horizontal,.floating-vertical{border-radius:15px;position:absolute;pointer-events:auto;background-color:rgba(47,53,60,.8)}.markdown .left-align{text-align:left}.markdown .center{text-align:center}.markdown .right-align{text-align:right}.markdown .justify{text-align:justify}.markdown .truncate{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.markdown ol.upper-roman{list-style-type:upper-roman}.markdown ol.lower-alpha{list-style-type:lower-alpha}.markdown ul.circle{list-style-type:circle}.markdown ul.square{list-style-type:square}.markdown .list-reset{list-style:none;padding-left:0}.distance-legend,.floating-horizontal{padding-left:5px;padding-right:5px}.floating-vertical{padding-top:5px;padding-bottom:5px}.distance-legend{right:135px;bottom:30px;height:30px;width:125px;border:1px solid rgba(255,255,255,.1);-webkit-box-sizing:content-box;box-sizing:content-box}.distance-legend-label{display:inline-block;font-family:Roboto,sans-serif;font-size:14px;font-weight:lighter;line-height:30px;color:#fff;width:125px;text-align:center}.distance-legend-scale-bar{border-left:1px solid #fff;border-right:1px solid #fff;border-bottom:1px solid #fff;position:absolute;height:10px;top:15px}.navigation-controls{position:absolute;right:190px;top:210px;width:30px;border:1px solid rgba(255,255,255,.1);font-weight:300;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.navigation-control{cursor:pointer;border-bottom:1px solid #555}.naviagation-control:active{color:#fff}.navigation-control-last{cursor:pointer;border-bottom:0}.navigation-control-icon-zoom-in{padding-bottom:4px}.navigation-control-icon-zoom-in,.navigation-control-icon-zoom-out{position:relative;text-align:center;font-size:20px;color:#fff}.navigation-control-icon-reset{position:relative;left:10px;width:10px;height:10px;fill:rgba(255,255,255,.8);padding-top:6px;padding-bottom:6px;-webkit-box-sizing:content-box;box-sizing:content-box}.compass,.compass-outer-ring{position:absolute;width:95px;height:95px}.compass{pointer-events:auto;right:160px;overflow:hidden;top:100px}.compass-outer-ring{top:0;fill:rgba(255,255,255,.5)}.compass-outer-ring-background{position:absolute;top:14px;left:14px;width:44px;height:44px;border-radius:44px;border:12px solid rgba(47,53,60,.8);-webkit-box-sizing:content-box;box-sizing:content-box}.compass-gyro{pointer-events:none;position:absolute;top:0;width:95px;height:95px;fill:#ccc}.compass-gyro-active,.compass-gyro-background:hover+.compass-gyro{fill:#68adfe}.compass-gyro-background{position:absolute;top:30px;left:30px;width:33px;height:33px;border-radius:33px;background-color:rgba(47,53,60,.8);border:1px solid rgba(255,255,255,.2);-webkit-box-sizing:content-box;box-sizing:content-box}.compass-rotation-marker{position:absolute;top:0;width:95px;height:95px;fill:#68adfe}@media screen and (max-width:700px),screen and (max-height:420px){.compass,.distance-legend,.navigation-controls{display:none}}@media print{.compass,.distance-legend,.navigation-controls{display:none}}"), n("Cesium/Core/defined", function () {
      return Cesium.defined
    }), n("Cesium/Core/defineProperties", function () {
      return Cesium.defineProperties
    }), n("Cesium/Core/defaultValue", function () {
      return Cesium.defaultValue
    }), n("Cesium/Core/Event", function () {
      return Cesium.Event
    }), n("Cesium/Widgets/getElement", function () {
      return Cesium.getElement
    }), n("Cesium/Widgets/SvgPathBindingHandler", function () {
      return Cesium.SvgPathBindingHandler
    }), n("Cesium/Core/Ray", function () {
      return Cesium.Ray
    }), n("Cesium/Core/Cartesian3", function () {
      return Cesium.Cartesian3
    }), n("Cesium/Core/Cartographic", function () {
      return Cesium.Cartographic
    }), n("Cesium/Core/ReferenceFrame", function () {
      return Cesium.ReferenceFrame
    }), n("Cesium/Scene/SceneMode", function () {
      return Cesium.SceneMode
    }), n("Cesium/Core/DeveloperError", function () {
      return Cesium.DeveloperError
    }), n("Cesium/Core/EllipsoidGeodesic", function () {
      return Cesium.EllipsoidGeodesic
    }), n("Cesium/Core/Cartesian2", function () {
      return Cesium.Cartesian2
    }), n("Cesium/Core/getTimestamp", function () {
      return Cesium.getTimestamp
    }), n("Cesium/Core/EventHelper", function () {
      return Cesium.EventHelper
    }), n("Cesium/Core/Math", function () {
      return Cesium.Math
    }), n("Cesium/Core/Transforms", function () {
      return Cesium.Transforms
    }), n("Cesium/Core/Matrix4", function () {
      return Cesium.Matrix4
    }), n("Cesium/Core/BoundingSphere", function () {
      return Cesium.BoundingSphere
    }), n("Cesium/Core/HeadingPitchRange", function () {
      return Cesium.HeadingPitchRange
    }), n("Cesium/Scene/Camera", function () {
      return Cesium.Camera
    }), n("Cesium/Core/Rectangle", function () {
      return Cesium.Rectangle
    }), n("Cesium/Core/IntersectionTests", function () {
      return Cesium.IntersectionTests
    }), e("viewerCesiumNavigationMixin")
});