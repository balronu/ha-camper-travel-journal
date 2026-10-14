const R = globalThis, I = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = /* @__PURE__ */ Symbol(), K = /* @__PURE__ */ new WeakMap();
let ne = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (I && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = K.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && K.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const me = (r) => new ne(typeof r == "string" ? r : r + "", void 0, V), z = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new ne(t, r, V);
}, fe = (r, e) => {
  if (I) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = R.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, Z = I ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return me(t);
})(r) : r;
const { is: ve, defineProperty: _e, getOwnPropertyDescriptor: ye, getOwnPropertyNames: be, getOwnPropertySymbols: Ee, getPrototypeOf: Ae } = Object, H = globalThis, J = H.trustedTypes, we = J ? J.emptyScript : "", xe = H.reactiveElementPolyfillSupport, S = (r, e) => r, L = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? we : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, ae = (r, e) => !ve(r, e), G = { attribute: !0, type: String, converter: L, reflect: !1, useDefault: !1, hasChanged: ae };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), H.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let E = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = G) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && _e(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: n } = ye(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const c = i?.call(this);
      n?.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? G;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const e = Ae(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const t = this.properties, s = [...be(t), ...Ee(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(Z(i));
    } else e !== void 0 && t.push(Z(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return fe(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : L).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : L;
      this._$Em = i;
      const c = a.fromAttribute(t, n.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[e]), s ??= a.getPropertyOptions(e), !((s.hasChanged ?? ae)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
        const { wrapped: a } = n, c = this[i];
        a !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, n, c);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
E.elementStyles = [], E.shadowRootOptions = { mode: "open" }, E[S("elementProperties")] = /* @__PURE__ */ new Map(), E[S("finalized")] = /* @__PURE__ */ new Map(), xe?.({ ReactiveElement: E }), (H.reactiveElementVersions ??= []).push("2.1.2");
const q = globalThis, Q = (r) => r, N = q.trustedTypes, X = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, oe = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, he = "?" + v, Ce = `<${he}>`, b = document, k = () => b.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", F = Array.isArray, Se = (r) => F(r) || typeof r?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, ee = />/g, _ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), te = /'/g, se = /"/g, le = /^(?:script|style|textarea|title)$/i, ke = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), h = ke(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ie = /* @__PURE__ */ new WeakMap(), y = b.createTreeWalker(b, 129);
function ce(r, e) {
  if (!F(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(e) : e;
}
const Te = (r, e) => {
  const t = r.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = C;
  for (let c = 0; c < t; c++) {
    const o = r[c];
    let d, u, l = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, u = a.exec(o), u !== null); ) m = a.lastIndex, a === C ? u[1] === "!--" ? a = Y : u[1] !== void 0 ? a = ee : u[2] !== void 0 ? (le.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = _) : u[3] !== void 0 && (a = _) : a === _ ? u[0] === ">" ? (a = i ?? C, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? _ : u[3] === '"' ? se : te) : a === se || a === te ? a = _ : a === Y || a === ee ? a = C : (a = _, i = void 0);
    const f = a === _ && r[c + 1].startsWith("/>") ? " " : "";
    n += a === C ? o + Ce : l >= 0 ? (s.push(d), o.slice(0, l) + oe + o.slice(l) + v + f) : o + v + (l === -2 ? c : f);
  }
  return [ce(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class P {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const c = e.length - 1, o = this.parts, [d, u] = Te(e, t);
    if (this.el = P.createElement(d, s), y.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = y.nextNode()) !== null && o.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(oe)) {
          const m = u[a++], f = i.getAttribute(l).split(v), D = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: n, name: D[2], strings: f, ctor: D[1] === "." ? Ue : D[1] === "?" ? De : D[1] === "@" ? Re : M }), i.removeAttribute(l);
        } else l.startsWith(v) && (o.push({ type: 6, index: n }), i.removeAttribute(l));
        if (le.test(i.tagName)) {
          const l = i.textContent.split(v), m = l.length - 1;
          if (m > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let f = 0; f < m; f++) i.append(l[f], k()), y.nextNode(), o.push({ type: 2, index: ++n });
            i.append(l[m], k());
          }
        }
      } else if (i.nodeType === 8) if (i.data === he) o.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(v, l + 1)) !== -1; ) o.push({ type: 7, index: n }), l += v.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = b.createElement("template");
    return s.innerHTML = e, s;
  }
}
function x(r, e, t = r, s) {
  if (e === w) return e;
  let i = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = T(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = i : t._$Cl = i), i !== void 0 && (e = x(r, i._$AS(r, e.values), i, s)), e;
}
class Pe {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = (e?.creationScope ?? b).importNode(t, !0);
    y.currentNode = i;
    let n = y.nextNode(), a = 0, c = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new U(n, n.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(n, o.name, o.strings, this, e) : o.type === 6 && (d = new Ne(n, this, e)), this._$AV.push(d), o = s[++c];
      }
      a !== o?.index && (n = y.nextNode(), a++);
    }
    return y.currentNode = b, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = x(this, e, t), T(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== w && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Se(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && T(this._$AH) ? this._$AA.nextSibling.data = e : this.T(b.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = P.createElement(ce(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new Pe(i, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = ie.get(e.strings);
    return t === void 0 && ie.set(e.strings, t = new P(e)), t;
  }
  k(e) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new U(this.O(k()), this.O(k()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = Q(e).nextSibling;
      Q(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class M {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, i) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = x(this, e, t, 0), a = !T(e) || e !== this._$AH && e !== w, a && (this._$AH = e);
    else {
      const c = e;
      let o, d;
      for (e = n[0], o = 0; o < n.length - 1; o++) d = x(this, c[s + o], t, o), d === w && (d = this._$AH[o]), a ||= !T(d) || d !== this._$AH[o], d === p ? e = p : e !== p && (e += (d ?? "") + n[o + 1]), this._$AH[o] = d;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ue extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class De extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Re extends M {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = x(this, e, t, 0) ?? p) === w) return;
    const s = this._$AH, i = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ne {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    x(this, e);
  }
}
const Oe = q.litHtmlPolyfillSupport;
Oe?.(P, U), (q.litHtmlVersions ??= []).push("3.3.3");
const He = (r, e, t) => {
  const s = t?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = i = new U(e.insertBefore(k(), n), n, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
const B = globalThis;
class A extends E {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = He(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
A._$litElement$ = !0, A.finalized = !0, B.litElementHydrateSupport?.({ LitElement: A });
const Me = B.litElementPolyfillSupport;
Me?.({ LitElement: A });
(B.litElementVersions ??= []).push("4.2.2");
class W extends A {
  _hass;
  config = {};
  static styles = z`
    :host { display:block; color:var(--primary-text-color); } ha-card { padding:16px; background:var(--ha-card-background,var(--card-background-color)); }
    h2,h3 { margin:0 0 12px; } .muted { color:var(--secondary-text-color); } .error { color:var(--error-color); }
    button { min-height:40px; border:0; border-radius:8px; padding:8px 12px; cursor:pointer; color:var(--text-primary-color,#fff); background:var(--primary-color); }
    button.secondary { color:var(--primary-text-color); background:var(--secondary-background-color); } .actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; } .metric { padding:10px; border-radius:8px; background:var(--secondary-background-color); }
    .value { display:block; font-size:1.25rem; font-weight:600; } input { min-height:38px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:6px; padding:8px; background:var(--card-background-color); color:var(--primary-text-color); }
    @media (max-width:500px) { ha-card { padding:12px; } }
  `;
  get hass() {
    return this._hass;
  }
  set hass(e) {
    const t = this._hass?.connection !== e?.connection;
    this._hass = e, t && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(e) {
    this.config.vehicle_id !== e.vehicle_id && (this.config = { ...e }, this.onConfigChanged(), this.requestUpdate());
  }
  onHassConnectionChanged() {
  }
  onConfigChanged() {
  }
  static getConfigElement() {
    return document.createElement("camper-travel-journal-card-editor");
  }
  static getStubConfig() {
    return { vehicle_id: "" };
  }
  get vehicleId() {
    return this.config.vehicle_id ?? "";
  }
}
function de(r, e) {
  customElements.get(r) || customElements.define(r, e);
}
async function $(r, e, t, s = {}) {
  return r.connection.sendMessagePromise({ type: e, vehicle_id: t, ...s });
}
const pe = (r, e, t) => $(r, "camper_travel_journal/list", e, t ? { trip_id: t } : {}), ue = (r, e, t, s) => $(r, "camper_travel_journal/transition_trip", e, { trip_id: t, status: s }), je = (r, e, t, s, i = "") => $(r, "camper_travel_journal/create_trip", e, { title: t, started_at: s, destination: i }), Le = (r, e, t, s) => $(r, "camper_travel_journal/update_trip", e, { trip_id: t, ...s }), Ie = (r, e, t) => $(r, "camper_travel_journal/delete_trip", e, { trip_id: t }), Ve = (r, e, t, s) => $(r, "camper_travel_journal/unlink_drive", e, { trip_id: t, drive_id: s }), ze = (r, e, t, s) => $(r, "camper_travel_journal/link_drives", e, { trip_id: t, drive_ids: s }), qe = (r, e, t, s) => $(r, "camper_travel_journal/create_expense", e, { trip_id: t, ...s }), Fe = (r, e, t, s) => $(r, "camper_travel_journal/update_expense", e, { expense_id: t, ...s }), Be = (r, e, t) => $(r, "camper_travel_journal/delete_expense", e, { expense_id: t }), We = async (r) => (await r.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], Ke = {
  title: "Reisetagebuch",
  noDestination: "Kein Reiseziel",
  loading: "Reisedaten werden geladen …",
  noTrip: "Noch keine Reise angelegt.",
  loadError: "Reisedaten konnten nicht geladen werden.",
  statusError: "Reisestatus konnte nicht geändert werden.",
  distance: "Strecke",
  drives: "Fahrten",
  stops: "Zwischenstopps",
  costs: "Kosten",
  resume: "Reise fortsetzen",
  pause: "Pausieren",
  complete: "Abschließen",
  manager: "Reiseverwaltung",
  newTrip: "Neue Reise",
  tripName: "Reisename",
  destination: "Reiseziel",
  create: "Anlegen",
  trips: "Reisen",
  edit: "Bearbeiten",
  remove: "Löschen",
  details: "Details",
  assignedDrives: "Fahrten dieser Reise",
  freeDrives: "Freie Fahrten",
  assign: "Zuordnen",
  unassign: "Zuordnung lösen",
  expenses: "Kosten",
  amount: "Betrag",
  category: "Kategorie",
  save: "Speichern",
  deleteCost: "Kosten löschen?",
  tripDeleteConfirm: "Reise löschen? Zugehörige Fahrten bleiben erhalten.",
  expenseDeleteConfirm: "Kosten löschen?",
  tripCreateError: "Reise konnte nicht gespeichert werden.",
  tripEditError: "Reise konnte nicht bearbeitet werden.",
  tripDeleteError: "Reise konnte nicht gelöscht werden.",
  expenseCreateError: "Ausgabe konnte nicht gespeichert werden.",
  expenseEditError: "Kosten konnten nicht bearbeitet werden.",
  expenseDeleteError: "Kosten konnten nicht gelöscht werden.",
  driveAssignError: "Fahrt konnte nicht zugeordnet werden.",
  categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parken", food: "Verpflegung", activities: "Aktivitäten", other: "Sonstiges" },
  statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" },
  editorVehicle: "Wohnmobil",
  editorChooseVehicle: "Wohnmobil auswählen",
  editorLoading: "Wohnmobile werden geladen …",
  editorNoVehicle: "Kein eingerichtetes Wohnmobil gefunden.",
  editorLoadError: "Wohnmobile konnten nicht geladen werden."
}, Ze = {
  title: "Travel journal",
  noDestination: "No destination",
  loading: "Loading travel data …",
  noTrip: "No trip created yet.",
  loadError: "Travel data could not be loaded.",
  statusError: "Trip status could not be changed.",
  distance: "Distance",
  drives: "Drives",
  stops: "Stops",
  costs: "Costs",
  resume: "Resume trip",
  pause: "Pause",
  complete: "Complete",
  manager: "Trip management",
  newTrip: "New trip",
  tripName: "Trip name",
  destination: "Destination",
  create: "Create",
  trips: "Trips",
  edit: "Edit",
  remove: "Delete",
  details: "Details",
  assignedDrives: "Drives in this trip",
  freeDrives: "Unassigned drives",
  assign: "Assign",
  unassign: "Unassign",
  expenses: "Costs",
  amount: "Amount",
  category: "Category",
  save: "Save",
  deleteCost: "Delete cost?",
  tripDeleteConfirm: "Delete trip? Assigned drives will be kept.",
  expenseDeleteConfirm: "Delete cost?",
  tripCreateError: "Trip could not be saved.",
  tripEditError: "Trip could not be edited.",
  tripDeleteError: "Trip could not be deleted.",
  expenseCreateError: "Cost could not be saved.",
  expenseEditError: "Cost could not be edited.",
  expenseDeleteError: "Cost could not be deleted.",
  driveAssignError: "Drive could not be assigned.",
  categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking", food: "Food", activities: "Activities", other: "Other" },
  statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" },
  editorVehicle: "Camper",
  editorChooseVehicle: "Select camper",
  editorLoading: "Loading campers …",
  editorNoVehicle: "No configured camper found.",
  editorLoadError: "Configured campers could not be loaded."
};
function g(r) {
  return (r?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? Ke : Ze;
}
function O(r, e) {
  const t = (e?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Date(r).toLocaleDateString(t);
}
function ge(r, e) {
  return g(e).statuses[r] ?? r;
}
function re(r, e) {
  return g(e).categories[r] ?? r;
}
class Je extends W {
  snapshot;
  loading = !1;
  error = "";
  connectedCallback() {
    super.connectedCallback(), this.refresh();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  async refresh() {
    if (!(!this.hass || !this.vehicleId)) {
      this.loading = !0, this.requestUpdate();
      try {
        this.snapshot = await pe(this.hass, this.vehicleId);
      } catch {
        this.error = g(this.hass).loadError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  async setStatus(e) {
    const t = this.snapshot?.trips[0];
    if (!(!this.hass || !t))
      try {
        await ue(this.hass, this.vehicleId, t.id, e), await this.refresh();
      } catch {
        this.error = g(this.hass).statusError, this.requestUpdate();
      }
  }
  render() {
    const e = g(this.hass), t = this.snapshot?.trips[0], s = (this.snapshot?.drives ?? []).reduce((n, a) => n + a.distance_m, 0) / 1e3, i = (this.snapshot?.expense_summary?.total_minor ?? 0) / 100;
    return h`<ha-card><h2>${t?.title ?? e.title}</h2>${this.error ? h`<p class="error" role="alert">${this.error}</p>` : t ? h`<p class="muted">${t.destination || e.noDestination} · ${ge(t.status, this.hass)} · ${O(t.started_at, this.hass)}${t.ended_at ? ` – ${O(t.ended_at, this.hass)}` : ""}</p><div class="grid"><div class="metric"><span class="muted">${e.distance}</span><span class="value">${s.toFixed(1)} km</span></div><div class="metric"><span class="muted">${e.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${e.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${e.costs}</span><span class="value">${i.toFixed(2)} €</span></div></div><div class="actions">${t.status === "planned" || t.status === "paused" ? h`<button @click=${() => this.setStatus("active")}>${e.resume}</button>` : ""}${t.status === "active" ? h`<button class="secondary" @click=${() => this.setStatus("paused")}>${e.pause}</button><button @click=${() => this.setStatus("completed")}>${e.complete}</button>` : ""}</div>` : h`<p class="muted">${e.noTrip}</p>`}${this.loading ? h`<p class="muted">${e.loading}</p>` : ""}</ha-card>`;
  }
}
de("camper-travel-journal-summary-card", Je);
const Ge = ["camping", "fuel", "toll", "parking", "food", "activities", "other"];
class $e extends W {
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
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  async refresh() {
    if (!(!this.hass || !this.vehicleId))
      try {
        this.snapshot = await pe(this.hass, this.vehicleId, this.selected || void 0), this.requestUpdate();
      } catch {
        this.error = "Reisedaten konnten nicht geladen werden.", this.requestUpdate();
      }
  }
  fail(e) {
    this.error = e, this.requestUpdate();
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim()))
      try {
        await je(this.hass, this.vehicleId, this.tripTitle, (/* @__PURE__ */ new Date()).toISOString(), this.destination), this.tripTitle = "", this.destination = "", await this.refresh();
      } catch {
        this.fail(g(this.hass).tripCreateError);
      }
  }
  async editTrip(e) {
    if (!this.hass) return;
    const t = g(this.hass), s = window.prompt(t.tripName, e.title);
    if (!(s === null || !s.trim()))
      try {
        await Le(this.hass, this.vehicleId, e.id, { title: s }), await this.refresh();
      } catch {
        this.fail(t.tripEditError);
      }
  }
  async removeTrip(e) {
    if (!this.hass) return;
    const t = g(this.hass);
    if (window.confirm(t.tripDeleteConfirm))
      try {
        await Ie(this.hass, this.vehicleId, e), this.selected === e && (this.selected = ""), await this.refresh();
      } catch {
        this.fail(t.tripDeleteError);
      }
  }
  async changeStatus(e, t) {
    if (this.hass)
      try {
        await ue(this.hass, this.vehicleId, e, t), await this.refresh();
      } catch {
        this.fail(g(this.hass).statusError);
      }
  }
  async assignDrive(e, t) {
    if (this.hass)
      try {
        await ze(this.hass, this.vehicleId, e, [t]), await this.refresh();
      } catch {
        this.fail(g(this.hass).driveAssignError);
      }
  }
  async addExpense(e) {
    if (!(!this.hass || !this.amount))
      try {
        await qe(this.hass, this.vehicleId, e, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: Math.round(Number(this.amount) * 100), currency: "EUR" }), this.amount = "", await this.refresh();
      } catch {
        this.fail(g(this.hass).expenseCreateError);
      }
  }
  async removeExpense(e) {
    if (!this.hass) return;
    const t = g(this.hass);
    if (window.confirm(t.expenseDeleteConfirm))
      try {
        await Be(this.hass, this.vehicleId, e), await this.refresh();
      } catch {
        this.fail(t.expenseDeleteError);
      }
  }
  async editExpense(e) {
    if (!this.hass) return;
    const t = g(this.hass), s = window.prompt(t.amount, (e.amount_minor / 100).toFixed(2));
    if (s === null) return;
    const i = Math.round(Number(s) * 100);
    if (!(!Number.isFinite(i) || i < 0))
      try {
        await Fe(this.hass, this.vehicleId, e.id, { amount_minor: i }), await this.refresh();
      } catch {
        this.fail(t.expenseEditError);
      }
  }
  render() {
    const e = g(this.hass), t = this.snapshot?.trips ?? [], s = this.snapshot?.expenses ?? [];
    return h`<ha-card><h2>${e.manager}</h2>${this.error ? h`<p class="error" role="alert">${this.error}</p>` : ""}<section><h3>${e.newTrip}</h3><div class="actions"><input aria-label=${e.tripName} placeholder=${e.tripName} .value=${this.tripTitle} @input=${(i) => this.tripTitle = i.target.value}><input aria-label=${e.destination} placeholder=${e.destination} .value=${this.destination} @input=${(i) => this.destination = i.target.value}><button @click=${() => this.addTrip()}>${e.create}</button></div></section><section><h3>${e.trips}</h3>${t.length ? t.map((i) => h`<article class="trip"><div class="row"><strong>${i.title}</strong><span class="muted">${i.destination || ""} · ${ge(i.status, this.hass)}</span></div><div class="actions"><button class="secondary" @click=${() => this.editTrip(i)}>${e.edit}</button><button class="secondary" @click=${() => this.removeTrip(i.id)}>${e.remove}</button>${i.status === "planned" || i.status === "paused" ? h`<button @click=${() => this.changeStatus(i.id, "active")}>${e.resume}</button>` : ""}${i.status === "active" ? h`<button class="secondary" @click=${() => this.changeStatus(i.id, "paused")}>${e.pause}</button><button @click=${() => this.changeStatus(i.id, "completed")}>${e.complete}</button>` : ""}<button class="secondary" @click=${() => {
      this.selected = i.id, this.refresh();
    }}>${e.details}</button></div>${this.selected === i.id ? h`<div class="details"><h4>${e.assignedDrives}</h4>${(this.snapshot?.drives ?? []).map((n) => h`<div class="row"><span>${O(n.started_at, this.hass)} · ${(n.distance_m / 1e3).toFixed(1)} km</span>${n.trip_id === i.id ? h`<button class="link" @click=${() => this.hass && Ve(this.hass, this.vehicleId, i.id, n.id).then(() => this.refresh())}>${e.unassign}</button>` : ""}</div>`)}${(this.snapshot?.available_drives ?? []).length ? h`<h4>${e.freeDrives}</h4>${this.snapshot?.available_drives?.map((n) => h`<div class="row"><span>${O(n.started_at, this.hass)} · ${(n.distance_m / 1e3).toFixed(1)} km</span><button class="link" @click=${() => this.assignDrive(i.id, n.id)}>${e.assign}</button></div>`)}` : ""}<h4>${e.expenses}</h4><div class="actions"><input aria-label=${e.amount} type="number" min="0" step="0.01" placeholder="EUR" .value=${this.amount} @input=${(n) => this.amount = n.target.value}><select aria-label=${e.category} .value=${this.category} @change=${(n) => this.category = n.target.value}>${Ge.map((n) => h`<option value=${n}>${re(n, this.hass)}</option>`)}</select><button @click=${() => this.addExpense(i.id)}>${e.save}</button></div>${s.map((n) => h`<div class="row"><span>${re(n.category, this.hass)}: ${(n.amount_minor / 100).toFixed(2)} ${n.currency}</span><span><button class="link" @click=${() => this.editExpense(n)}>${e.edit}</button><button class="link" @click=${() => this.removeExpense(n.id)}>${e.remove}</button></span></div>`)}</div>` : ""}</article>`) : h`<p class="muted">${e.noTrip}</p>`}</section></ha-card>`;
  }
}
$e.styles = [W.styles, z`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}`];
de("camper-travel-journal-manager-card", $e);
function Qe(r, e) {
  return r.vehicle_id || e.length !== 1 ? r : { ...r, vehicle_id: e[0].vehicle_id };
}
function Xe(r, e) {
  return r.type === e.type && r.vehicle_id === e.vehicle_id;
}
class Ye extends A {
  static styles = z`
    :host { display: block; color: var(--primary-text-color); }
    .field { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
    label { font-weight: 500; }
    select { min-height: 44px; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; background: var(--card-background-color, var(--primary-background-color)); color: var(--primary-text-color); }
    .error { color: var(--error-color); }
    .muted { color: var(--secondary-text-color); }
  `;
  _hass;
  _config = {};
  vehicles = [];
  loading = !1;
  error = "";
  loadedConnection;
  loadingPromise;
  set hass(e) {
    const t = this._hass?.connection !== e?.connection;
    this._hass = e, t && e && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(e) {
    Xe(this._config, e) || (this._config = { ...e }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const e = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await We(e), this.loadedConnection = e.connection;
        const t = Qe(this._config, this.vehicles);
        t.vehicle_id !== this._config.vehicle_id && (this._config = t, this.fireConfigChanged());
      } catch {
        this.error = g(e).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(e) {
    const t = e.target.value;
    this._config = { ...this._config, vehicle_id: t }, this.fireConfigChanged();
  }
  render() {
    const e = g(this._hass);
    return h`
      <div class="field">
        <label for="vehicle">${e.editorVehicle}</label>
        ${this.loading ? h`<span class="muted">${e.editorLoading}</span>` : h`
          <select id="vehicle" aria-label=${e.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${e.editorChooseVehicle}</option>
            ${this.vehicles.map((t) => h`<option value=${t.vehicle_id} ?selected=${t.vehicle_id === this._config.vehicle_id}>${t.name || t.title}</option>`)}
          </select>
        `}
        ${this.error ? h`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? h`<span class="error" role="alert">${e.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Ye);
const et = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const r of et) window.customCards.some((e) => e.type === r.type) || window.customCards.push(r);
