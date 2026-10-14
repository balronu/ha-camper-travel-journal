const U = globalThis, j = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, I = /* @__PURE__ */ Symbol(), q = /* @__PURE__ */ new WeakMap();
let et = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== I) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (j && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const pt = (r) => new et(typeof r == "string" ? r : r + "", void 0, I), st = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new et(e, r, I);
}, ut = (r, t) => {
  if (j) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = U.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, K = j ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return pt(e);
})(r) : r;
const { is: $t, defineProperty: mt, getOwnPropertyDescriptor: _t, getOwnPropertyNames: ft, getOwnPropertySymbols: gt, getPrototypeOf: vt } = Object, N = globalThis, V = N.trustedTypes, yt = V ? V.emptyScript : "", bt = N.reactiveElementPolyfillSupport, E = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? yt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, it = (r, t) => !$t(r, t), W = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), N.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = W) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && mt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = _t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const l = i?.call(this);
      n?.call(this, a), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? W;
  }
  static _$Ei() {
    if (this.hasOwnProperty(E("elementProperties"))) return;
    const t = vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(E("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(E("properties"))) {
      const e = this.properties, s = [...ft(e), ...gt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(K(i));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ut(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : D;
      this._$Em = i;
      const l = a.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), s ??= a.getPropertyOptions(t), !((s.hasChanged ?? it)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), n !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: a } = n, l = this[i];
        a !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[E("elementProperties")] = /* @__PURE__ */ new Map(), b[E("finalized")] = /* @__PURE__ */ new Map(), bt?.({ ReactiveElement: b }), (N.reactiveElementVersions ??= []).push("2.1.2");
const z = globalThis, Z = (r) => r, O = z.trustedTypes, J = O ? O.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, rt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, nt = "?" + f, At = `<${nt}>`, y = document, k = () => y.createComment(""), C = (r) => r === null || typeof r != "object" && typeof r != "function", L = Array.isArray, wt = (r) => L(r) || typeof r?.[Symbol.iterator] == "function", H = `[ \t
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, G = /-->/g, Q = />/g, g = RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), X = /'/g, Y = /"/g, at = /^(?:script|style|textarea|title)$/i, xt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), c = xt(1), A = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), tt = /* @__PURE__ */ new WeakMap(), v = y.createTreeWalker(y, 129);
function ot(r, t) {
  if (!L(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return J !== void 0 ? J.createHTML(t) : t;
}
const Et = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = x;
  for (let l = 0; l < e; l++) {
    const o = r[l];
    let d, u, h = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, u = a.exec(o), u !== null); ) m = a.lastIndex, a === x ? u[1] === "!--" ? a = G : u[1] !== void 0 ? a = Q : u[2] !== void 0 ? (at.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = g) : u[3] !== void 0 && (a = g) : a === g ? u[0] === ">" ? (a = i ?? x, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? g : u[3] === '"' ? Y : X) : a === Y || a === X ? a = g : a === G || a === Q ? a = x : (a = g, i = void 0);
    const _ = a === g && r[l + 1].startsWith("/>") ? " " : "";
    n += a === x ? o + At : h >= 0 ? (s.push(d), o.slice(0, h) + rt + o.slice(h) + f + _) : o + f + (h === -2 ? l : _);
  }
  return [ot(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const l = t.length - 1, o = this.parts, [d, u] = Et(t, e);
    if (this.el = R.createElement(d, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = v.nextNode()) !== null && o.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(rt)) {
          const m = u[a++], _ = i.getAttribute(h).split(f), T = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: n, name: T[2], strings: _, ctor: T[1] === "." ? kt : T[1] === "?" ? Ct : T[1] === "@" ? Rt : M }), i.removeAttribute(h);
        } else h.startsWith(f) && (o.push({ type: 6, index: n }), i.removeAttribute(h));
        if (at.test(i.tagName)) {
          const h = i.textContent.split(f), m = h.length - 1;
          if (m > 0) {
            i.textContent = O ? O.emptyScript : "";
            for (let _ = 0; _ < m; _++) i.append(h[_], k()), v.nextNode(), o.push({ type: 2, index: ++n });
            i.append(h[m], k());
          }
        }
      } else if (i.nodeType === 8) if (i.data === nt) o.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(f, h + 1)) !== -1; ) o.push({ type: 7, index: n }), h += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(r, t, e = r, s) {
  if (t === A) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = C(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = w(r, i._$AS(r, t.values), i, s)), t;
}
class St {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? y).importNode(e, !0);
    v.currentNode = i;
    let n = v.nextNode(), a = 0, l = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new P(n, n.nextSibling, this, t) : o.type === 1 ? d = new o.ctor(n, o.name, o.strings, this, t) : o.type === 6 && (d = new Pt(n, this, t)), this._$AV.push(d), o = s[++l];
      }
      a !== o?.index && (n = v.nextNode(), a++);
    }
    return v.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class P {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = w(this, t, e), C(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : wt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && C(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = R.createElement(ot(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new St(i, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = tt.get(t.strings);
    return e === void 0 && tt.set(t.strings, e = new R(t)), e;
  }
  k(t) {
    L(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new P(this.O(k()), this.O(k()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Z(t).nextSibling;
      Z(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) t = w(this, t, e, 0), a = !C(t) || t !== this._$AH && t !== A, a && (this._$AH = t);
    else {
      const l = t;
      let o, d;
      for (t = n[0], o = 0; o < n.length - 1; o++) d = w(this, l[s + o], e, o), d === A && (d = this._$AH[o]), a ||= !C(d) || d !== this._$AH[o], d === p ? t = p : t !== p && (t += (d ?? "") + n[o + 1]), this._$AH[o] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class kt extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Ct extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Rt extends M {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? p) === A) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Pt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    w(this, t);
  }
}
const Tt = z.litHtmlPolyfillSupport;
Tt?.(R, P), (z.litHtmlVersions ??= []).push("3.3.3");
const Ut = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new P(t.insertBefore(k(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const B = globalThis;
class S extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ut(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
}
S._$litElement$ = !0, S.finalized = !0, B.litElementHydrateSupport?.({ LitElement: S });
const Ot = B.litElementPolyfillSupport;
Ot?.({ LitElement: S });
(B.litElementVersions ??= []).push("4.2.2");
class F extends S {
  hass;
  config = {};
  static styles = st`
    :host { display:block; color:var(--primary-text-color); } ha-card { padding:16px; background:var(--ha-card-background,var(--card-background-color)); }
    h2,h3 { margin:0 0 12px; } .muted { color:var(--secondary-text-color); } .error { color:var(--error-color); }
    button { min-height:40px; border:0; border-radius:8px; padding:8px 12px; cursor:pointer; color:var(--text-primary-color,#fff); background:var(--primary-color); }
    button.secondary { color:var(--primary-text-color); background:var(--secondary-background-color); } .actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; } .metric { padding:10px; border-radius:8px; background:var(--secondary-background-color); }
    .value { display:block; font-size:1.25rem; font-weight:600; } input { min-height:38px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:6px; padding:8px; background:var(--card-background-color); color:var(--primary-text-color); }
    @media (max-width:500px) { ha-card { padding:12px; } }
  `;
  setConfig(t) {
    this.config = t;
  }
  get vehicleId() {
    return this.config.vehicle_id ?? "";
  }
}
function ht(r, t) {
  customElements.get(r) || customElements.define(r, t);
}
async function $(r, t, e, s = {}) {
  return r.connection.sendMessagePromise({ type: t, vehicle_id: e, ...s });
}
const ct = (r, t, e) => $(r, "camper_travel_journal/list", t, e ? { trip_id: e } : {}), lt = (r, t, e, s) => $(r, "camper_travel_journal/transition_trip", t, { trip_id: e, status: s }), Nt = (r, t, e, s, i = "") => $(r, "camper_travel_journal/create_trip", t, { title: e, started_at: s, destination: i }), Mt = (r, t, e, s) => $(r, "camper_travel_journal/update_trip", t, { trip_id: e, ...s }), Ht = (r, t, e) => $(r, "camper_travel_journal/delete_trip", t, { trip_id: e }), Dt = (r, t, e, s) => $(r, "camper_travel_journal/unlink_drive", t, { trip_id: e, drive_id: s }), jt = (r, t, e, s) => $(r, "camper_travel_journal/link_drives", t, { trip_id: e, drive_ids: s }), It = (r, t, e, s) => $(r, "camper_travel_journal/create_expense", t, { trip_id: e, ...s }), zt = (r, t, e, s) => $(r, "camper_travel_journal/update_expense", t, { expense_id: e, ...s }), Lt = (r, t, e) => $(r, "camper_travel_journal/delete_expense", t, { expense_id: e });
class Bt extends F {
  snapshot;
  loading = !1;
  error = "";
  connectedCallback() {
    super.connectedCallback(), this.refresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  async refresh() {
    if (!(!this.hass || !this.vehicleId)) {
      this.loading = !0, this.requestUpdate();
      try {
        this.snapshot = await ct(this.hass, this.vehicleId);
      } catch {
        this.error = "Reisedaten konnten nicht geladen werden.";
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  async setStatus(t) {
    const e = this.snapshot?.trips[0];
    if (!(!this.hass || !e))
      try {
        await lt(this.hass, this.vehicleId, e.id, t), await this.refresh();
      } catch {
        this.error = "Reisestatus konnte nicht geändert werden.", this.requestUpdate();
      }
  }
  render() {
    const t = this.snapshot?.trips[0], e = (this.snapshot?.drives ?? []).reduce((i, n) => i + n.distance_m, 0) / 1e3, s = (this.snapshot?.expense_summary?.total_minor ?? 0) / 100;
    return c`<ha-card><h2>${t?.title ?? "Reisetagebuch"}</h2>${this.error ? c`<p class="error">${this.error}</p>` : t ? c`<p class="muted">${t.destination || "Kein Reiseziel"} · ${t.status} · ${new Date(t.started_at).toLocaleDateString()}${t.ended_at ? ` – ${new Date(t.ended_at).toLocaleDateString()}` : ""}</p><div class="grid"><div class="metric"><span class="muted">Strecke</span><span class="value">${e.toFixed(1)} km</span></div><div class="metric"><span class="muted">Fahrten</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">Zwischenstopps</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">Kosten</span><span class="value">${s.toFixed(2)} €</span></div></div><div class="actions">${t.status === "planned" || t.status === "paused" ? c`<button @click=${() => this.setStatus("active")}>Reise fortsetzen</button>` : ""}${t.status === "active" ? c`<button class="secondary" @click=${() => this.setStatus("paused")}>Pausieren</button><button @click=${() => this.setStatus("completed")}>Abschließen</button>` : ""}</div>` : c`<p class="muted">Noch keine Reise angelegt.</p>`}${this.loading ? c`<p class="muted">Lade Reisedaten …</p>` : ""}</ha-card>`;
  }
}
ht("camper-travel-journal-summary-card", Bt);
const Ft = ["camping", "fuel", "toll", "parking", "food", "activities", "other"];
class dt extends F {
  snapshot;
  error = "";
  tripTitle = "";
  destination = "";
  amount = "";
  category = "other";
  selected = "";
  connectedCallback() {
    super.connectedCallback(), this.refresh();
  }
  async refresh() {
    if (!(!this.hass || !this.vehicleId))
      try {
        this.snapshot = await ct(this.hass, this.vehicleId, this.selected || void 0), this.requestUpdate();
      } catch {
        this.error = "Reisedaten konnten nicht geladen werden.", this.requestUpdate();
      }
  }
  fail(t) {
    this.error = t, this.requestUpdate();
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim()))
      try {
        await Nt(this.hass, this.vehicleId, this.tripTitle, (/* @__PURE__ */ new Date()).toISOString(), this.destination), this.tripTitle = "", this.destination = "", await this.refresh();
      } catch {
        this.fail("Reise konnte nicht gespeichert werden.");
      }
  }
  async editTrip(t) {
    if (!this.hass) return;
    const e = window.prompt("Reisename", t.title);
    if (!(e === null || !e.trim()))
      try {
        await Mt(this.hass, this.vehicleId, t.id, { title: e }), await this.refresh();
      } catch {
        this.fail("Reise konnte nicht bearbeitet werden.");
      }
  }
  async removeTrip(t) {
    if (!(!this.hass || !window.confirm("Reise löschen? Fahrten bleiben erhalten.")))
      try {
        await Ht(this.hass, this.vehicleId, t), this.selected === t && (this.selected = ""), await this.refresh();
      } catch {
        this.fail("Reise konnte nicht gelöscht werden.");
      }
  }
  async changeStatus(t, e) {
    if (this.hass)
      try {
        await lt(this.hass, this.vehicleId, t, e), await this.refresh();
      } catch {
        this.fail("Reisestatus konnte nicht geändert werden.");
      }
  }
  async assignDrive(t, e) {
    if (this.hass)
      try {
        await jt(this.hass, this.vehicleId, t, [e]), await this.refresh();
      } catch {
        this.fail("Fahrt konnte nicht zugeordnet werden.");
      }
  }
  async addExpense(t) {
    if (!(!this.hass || !this.amount))
      try {
        await It(this.hass, this.vehicleId, t, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: Math.round(Number(this.amount) * 100), currency: "EUR" }), this.amount = "", await this.refresh();
      } catch {
        this.fail("Ausgabe konnte nicht gespeichert werden.");
      }
  }
  async removeExpense(t) {
    if (!(!this.hass || !window.confirm("Kosten löschen?")))
      try {
        await Lt(this.hass, this.vehicleId, t), await this.refresh();
      } catch {
        this.fail("Kosten konnten nicht gelöscht werden.");
      }
  }
  async editExpense(t) {
    if (!this.hass) return;
    const e = window.prompt("Betrag in EUR", (t.amount_minor / 100).toFixed(2));
    if (e === null) return;
    const s = Math.round(Number(e) * 100);
    if (!(!Number.isFinite(s) || s < 0))
      try {
        await zt(this.hass, this.vehicleId, t.id, { amount_minor: s }), await this.refresh();
      } catch {
        this.fail("Kosten konnten nicht bearbeitet werden.");
      }
  }
  render() {
    const t = this.snapshot?.trips ?? [], e = this.snapshot?.expenses ?? [];
    return c`<ha-card><h2>Reiseverwaltung</h2>${this.error ? c`<p class="error" role="alert">${this.error}</p>` : ""}<section><h3>Neue Reise</h3><div class="actions"><input aria-label="Reisename" placeholder="Reisename" .value=${this.tripTitle} @input=${(s) => this.tripTitle = s.target.value}><input aria-label="Reiseziel" placeholder="Reiseziel" .value=${this.destination} @input=${(s) => this.destination = s.target.value}><button @click=${() => this.addTrip()}>Anlegen</button></div></section><section><h3>Reisen</h3>${t.length ? t.map((s) => c`<article class="trip"><div class="row"><strong>${s.title}</strong><span class="muted">${s.destination || ""} · ${s.status}</span></div><div class="actions"><button class="secondary" @click=${() => this.editTrip(s)}>Bearbeiten</button><button class="secondary" @click=${() => this.removeTrip(s.id)}>Löschen</button>${s.status === "planned" || s.status === "paused" ? c`<button @click=${() => this.changeStatus(s.id, "active")}>Fortsetzen</button>` : ""}${s.status === "active" ? c`<button class="secondary" @click=${() => this.changeStatus(s.id, "paused")}>Pausieren</button><button @click=${() => this.changeStatus(s.id, "completed")}>Abschließen</button>` : ""}<button class="secondary" @click=${() => {
      this.selected = s.id, this.refresh();
    }}>Details</button></div>${this.selected === s.id ? c`<div class="details"><h4>Fahrten dieser Reise</h4>${(this.snapshot?.drives ?? []).map((i) => c`<div class="row"><span>${new Date(i.started_at).toLocaleString()} · ${(i.distance_m / 1e3).toFixed(1)} km</span>${i.trip_id === s.id ? c`<button class="link" @click=${() => this.hass && Dt(this.hass, this.vehicleId, s.id, i.id).then(() => this.refresh())}>Zuordnung lösen</button>` : ""}</div>`)}${(this.snapshot?.available_drives ?? []).length ? c`<h4>Freie Fahrten</h4>${this.snapshot?.available_drives?.map((i) => c`<div class="row"><span>${new Date(i.started_at).toLocaleString()} · ${(i.distance_m / 1e3).toFixed(1)} km</span><button class="link" @click=${() => this.assignDrive(s.id, i.id)}>Zuordnen</button></div>`)}` : ""}<h4>Kosten</h4><div class="actions"><input aria-label="Betrag" type="number" min="0" step="0.01" placeholder="EUR" .value=${this.amount} @input=${(i) => this.amount = i.target.value}><select aria-label="Kategorie" .value=${this.category} @change=${(i) => this.category = i.target.value}>${Ft.map((i) => c`<option value=${i}>${i}</option>`)}</select><button @click=${() => this.addExpense(s.id)}>Speichern</button></div>${e.map((i) => c`<div class="row"><span>${i.category}: ${(i.amount_minor / 100).toFixed(2)} ${i.currency}</span><span><button class="link" @click=${() => this.editExpense(i)}>Bearbeiten</button><button class="link" @click=${() => this.removeExpense(i.id)}>Löschen</button></span></div>`)}</div>` : ""}</article>`) : c`<p class="muted">Noch keine Reise angelegt.</p>`}</section></ha-card>`;
  }
}
dt.styles = [F.styles, st`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}`];
ht("camper-travel-journal-manager-card", dt);
const qt = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal Übersicht", description: "Kompakte Reiseübersicht" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal Verwaltung", description: "Reiseverwaltung" }
];
window.customCards ??= [];
for (const r of qt) window.customCards.some((t) => t.type === r.type) || window.customCards.push(r);
