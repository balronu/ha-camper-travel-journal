const P = globalThis, K = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = /* @__PURE__ */ Symbol(), X = /* @__PURE__ */ new WeakMap();
let ue = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (K && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = X.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && X.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xe = (i) => new ue(typeof i == "string" ? i : i + "", void 0, W), j = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new ue(t, i, W);
}, Ce = (i, e) => {
  if (K) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = P.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, Y = K ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return xe(t);
})(i) : i;
const { is: ke, defineProperty: Se, getOwnPropertyDescriptor: Te, getOwnPropertyNames: De, getOwnPropertySymbols: Re, getPrototypeOf: Ue } = Object, O = globalThis, ee = O.trustedTypes, Pe = ee ? ee.emptyScript : "", Me = O.reactiveElementPolyfillSupport, S = (i, e) => i, F = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Pe : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, pe = (i, e) => !ke(i, e), te = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: pe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), O.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = te) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && Se(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: n } = Te(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const h = r?.call(this);
      n?.call(this, a), this.requestUpdate(e, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? te;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const e = Ue(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const t = this.properties, s = [...De(t), ...Re(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(Y(r));
    } else e !== void 0 && t.push(Y(e));
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
    return Ce(e, this.constructor.elementStyles), e;
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
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : F).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : F;
      this._$Em = r;
      const h = a.fromAttribute(t, n.type);
      this[r] = h ?? this._$Ej?.get(r) ?? h, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), s ??= a.getPropertyOptions(e), !((s.hasChanged ?? pe)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, h = this[r];
        a !== !0 || this._$AL.has(r) || h === void 0 || this.C(r, void 0, n, h);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[S("elementProperties")] = /* @__PURE__ */ new Map(), A[S("finalized")] = /* @__PURE__ */ new Map(), Me?.({ ReactiveElement: A }), (O.reactiveElementVersions ??= []).push("2.1.2");
const Z = globalThis, se = (i) => i, M = Z.trustedTypes, ie = M ? M.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ge = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, me = "?" + $, Ne = `<${me}>`, E = document, T = () => E.createComment(""), D = (i) => i === null || typeof i != "object" && typeof i != "function", J = Array.isArray, je = (i) => J(i) || typeof i?.[Symbol.iterator] == "function", L = `[ \t
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, re = /-->/g, ne = />/g, _ = RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), ae = /'/g, oe = /"/g, fe = /^(?:script|style|textarea|title)$/i, Oe = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), c = Oe(1), x = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), ce = /* @__PURE__ */ new WeakMap(), y = E.createTreeWalker(E, 129);
function ve(i, e) {
  if (!J(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ie !== void 0 ? ie.createHTML(e) : e;
}
const He = (i, e) => {
  const t = i.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = k;
  for (let h = 0; h < t; h++) {
    const o = i[h];
    let d, u, l = -1, m = 0;
    for (; m < o.length && (a.lastIndex = m, u = a.exec(o), u !== null); ) m = a.lastIndex, a === k ? u[1] === "!--" ? a = re : u[1] !== void 0 ? a = ne : u[2] !== void 0 ? (fe.test(u[2]) && (r = RegExp("</" + u[2], "g")), a = _) : u[3] !== void 0 && (a = _) : a === _ ? u[0] === ">" ? (a = r ?? k, l = -1) : u[1] === void 0 ? l = -2 : (l = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? _ : u[3] === '"' ? oe : ae) : a === oe || a === ae ? a = _ : a === re || a === ne ? a = k : (a = _, r = void 0);
    const v = a === _ && i[h + 1].startsWith("/>") ? " " : "";
    n += a === k ? o + Ne : l >= 0 ? (s.push(d), o.slice(0, l) + ge + o.slice(l) + $ + v) : o + $ + (l === -2 ? h : v);
  }
  return [ve(i, n + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class R {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const h = e.length - 1, o = this.parts, [d, u] = He(e, t);
    if (this.el = R.createElement(d, s), y.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = y.nextNode()) !== null && o.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(ge)) {
          const m = u[a++], v = r.getAttribute(l).split($), w = /([.?@])?(.*)/.exec(m);
          o.push({ type: 1, index: n, name: w[2], strings: v, ctor: w[1] === "." ? Ie : w[1] === "?" ? Ve : w[1] === "@" ? ze : H }), r.removeAttribute(l);
        } else l.startsWith($) && (o.push({ type: 6, index: n }), r.removeAttribute(l));
        if (fe.test(r.tagName)) {
          const l = r.textContent.split($), m = l.length - 1;
          if (m > 0) {
            r.textContent = M ? M.emptyScript : "";
            for (let v = 0; v < m; v++) r.append(l[v], T()), y.nextNode(), o.push({ type: 2, index: ++n });
            r.append(l[m], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === me) o.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = r.data.indexOf($, l + 1)) !== -1; ) o.push({ type: 7, index: n }), l += $.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = E.createElement("template");
    return s.innerHTML = e, s;
  }
}
function C(i, e, t = i, s) {
  if (e === x) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = D(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = C(i, r._$AS(i, e.values), r, s)), e;
}
class Le {
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
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? E).importNode(t, !0);
    y.currentNode = r;
    let n = y.nextNode(), a = 0, h = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new U(n, n.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(n, o.name, o.strings, this, e) : o.type === 6 && (d = new Be(n, this, e)), this._$AV.push(d), o = s[++h];
      }
      a !== o?.index && (n = y.nextNode(), a++);
    }
    return y.currentNode = E, r;
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
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = C(this, e, t), D(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== x && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : je(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = R.createElement(ve(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new Le(r, this), a = n.u(this.options);
      n.p(t), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = ce.get(e.strings);
    return t === void 0 && ce.set(e.strings, t = new R(e)), t;
  }
  k(e) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const n of e) r === t.length ? t.push(s = new U(this.O(T()), this.O(T()), this, this.options)) : s = t[r], s._$AI(n), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = se(e).nextSibling;
      se(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, r, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(e, t = this, s, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = C(this, e, t, 0), a = !D(e) || e !== this._$AH && e !== x, a && (this._$AH = e);
    else {
      const h = e;
      let o, d;
      for (e = n[0], o = 0; o < n.length - 1; o++) d = C(this, h[s + o], t, o), d === x && (d = this._$AH[o]), a ||= !D(d) || d !== this._$AH[o], d === p ? e = p : e !== p && (e += (d ?? "") + n[o + 1]), this._$AH[o] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ie extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Ve extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class ze extends H {
  constructor(e, t, s, r, n) {
    super(e, t, s, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? p) === x) return;
    const s = this._$AH, r = e === p && s !== p || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Be {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const qe = Z.litHtmlPolyfillSupport;
qe?.(R, U), (Z.litHtmlVersions ??= []).push("3.3.3");
const Fe = (i, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = r = new U(e.insertBefore(T(), n), n, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
const Q = globalThis;
class b extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fe(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return x;
  }
}
b._$litElement$ = !0, b.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: b });
const Ke = Q.litElementPolyfillSupport;
Ke?.({ LitElement: b });
(Q.litElementVersions ??= []).push("4.2.2");
class G extends b {
  _hass;
  config = {};
  static styles = j`
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
function $e(i, e) {
  customElements.get(i) || customElements.define(i, e);
}
async function f(i, e, t, s = {}) {
  return i.connection.sendMessagePromise({ type: e, vehicle_id: t, ...s });
}
const _e = (i, e, t) => f(i, "camper_travel_journal/list", e, t ? { trip_id: t } : {}), ye = (i, e, t, s) => f(i, "camper_travel_journal/transition_trip", e, { trip_id: t, status: s }), We = (i, e, t, s, r = "") => f(i, "camper_travel_journal/create_trip", e, { title: t, started_at: s, destination: r }), Ze = (i, e, t, s) => f(i, "camper_travel_journal/update_trip", e, { trip_id: t, ...s }), Je = (i, e, t) => f(i, "camper_travel_journal/delete_trip", e, { trip_id: t }), Qe = (i, e, t, s) => f(i, "camper_travel_journal/unlink_drive", e, { trip_id: t, drive_id: s }), Ge = (i, e, t, s) => f(i, "camper_travel_journal/link_drives", e, { trip_id: t, drive_ids: s }), Xe = (i, e, t, s) => f(i, "camper_travel_journal/create_expense", e, { trip_id: t, ...s }), Ye = (i, e, t, s) => f(i, "camper_travel_journal/update_expense", e, { expense_id: t, ...s }), et = (i, e, t) => f(i, "camper_travel_journal/delete_expense", e, { expense_id: t }), tt = async (i) => (await i.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], st = {
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
}, it = {
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
function g(i) {
  return (i?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? st : it;
}
function N(i, e) {
  const t = (e?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Date(i).toLocaleDateString(t);
}
function be(i, e) {
  return g(e).statuses[i] ?? i;
}
function le(i, e) {
  return g(e).categories[i] ?? i;
}
class rt extends G {
  snapshot;
  loading = !1;
  loadError = "";
  actionError = "";
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
        this.snapshot = await _e(this.hass, this.vehicleId), this.loadError = "";
      } catch {
        this.loadError = g(this.hass).loadError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  async setStatus(e) {
    const t = this.snapshot?.trips[0];
    if (!(!this.hass || !t))
      try {
        await ye(this.hass, this.vehicleId, t.id, e), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = g(this.hass).statusError, this.requestUpdate();
      }
  }
  render() {
    const e = g(this.hass), t = this.snapshot?.trips[0], s = (this.snapshot?.drives ?? []).reduce((a, h) => a + h.distance_m, 0) / 1e3, r = (this.snapshot?.expense_summary?.total_minor ?? 0) / 100, n = this.loadError || this.actionError;
    return c`<ha-card><h2>${t?.title ?? e.title}</h2>${n ? c`<p class="error" role="alert">${n}</p>` : t ? c`<p class="muted">${t.destination || e.noDestination} · ${be(t.status, this.hass)} · ${N(t.started_at, this.hass)}${t.ended_at ? ` – ${N(t.ended_at, this.hass)}` : ""}</p><div class="grid"><div class="metric"><span class="muted">${e.distance}</span><span class="value">${s.toFixed(1)} km</span></div><div class="metric"><span class="muted">${e.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${e.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${e.costs}</span><span class="value">${r.toFixed(2)} €</span></div></div><div class="actions">${t.status === "planned" || t.status === "paused" ? c`<button @click=${() => this.setStatus("active")}>${e.resume}</button>` : ""}${t.status === "active" ? c`<button class="secondary" @click=${() => this.setStatus("paused")}>${e.pause}</button><button @click=${() => this.setStatus("completed")}>${e.complete}</button>` : ""}</div>` : c`<p class="muted">${e.noTrip}</p>`}${this.loading ? c`<p class="muted">${e.loading}</p>` : ""}</ha-card>`;
  }
}
$e("camper-travel-journal-summary-card", rt);
const nt = ["camping", "fuel", "toll", "parking", "food", "activities", "other"];
class Ee extends G {
  snapshot;
  loadError = "";
  actionError = "";
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
        this.snapshot = await _e(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate();
      } catch {
        this.loadError = "Reisedaten konnten nicht geladen werden.", this.requestUpdate();
      }
  }
  fail(e) {
    this.actionError = e, this.requestUpdate();
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      try {
        await We(this.hass, this.vehicleId, this.tripTitle, (/* @__PURE__ */ new Date()).toISOString(), this.destination);
      } catch {
        this.fail(g(this.hass).tripCreateError);
        return;
      }
      this.actionError = "", this.tripTitle = "", this.destination = "", await this.refresh();
    }
  }
  async editTrip(e) {
    if (!this.hass) return;
    const t = g(this.hass), s = window.prompt(t.tripName, e.title);
    if (!(s === null || !s.trim()))
      try {
        await Ze(this.hass, this.vehicleId, e.id, { title: s }), await this.refresh();
      } catch {
        this.fail(t.tripEditError);
      }
  }
  async removeTrip(e) {
    if (!this.hass) return;
    const t = g(this.hass);
    if (window.confirm(t.tripDeleteConfirm))
      try {
        await Je(this.hass, this.vehicleId, e), this.selected === e && (this.selected = ""), await this.refresh();
      } catch {
        this.fail(t.tripDeleteError);
      }
  }
  async changeStatus(e, t) {
    if (this.hass)
      try {
        await ye(this.hass, this.vehicleId, e, t), await this.refresh();
      } catch {
        this.fail(g(this.hass).statusError);
      }
  }
  async assignDrive(e, t) {
    if (this.hass)
      try {
        await Ge(this.hass, this.vehicleId, e, [t]), await this.refresh();
      } catch {
        this.fail(g(this.hass).driveAssignError);
      }
  }
  async addExpense(e) {
    if (!(!this.hass || !this.amount))
      try {
        await Xe(this.hass, this.vehicleId, e, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: Math.round(Number(this.amount) * 100), currency: "EUR" }), this.amount = "", await this.refresh();
      } catch {
        this.fail(g(this.hass).expenseCreateError);
      }
  }
  async removeExpense(e) {
    if (!this.hass) return;
    const t = g(this.hass);
    if (window.confirm(t.expenseDeleteConfirm))
      try {
        await et(this.hass, this.vehicleId, e), await this.refresh();
      } catch {
        this.fail(t.expenseDeleteError);
      }
  }
  async editExpense(e) {
    if (!this.hass) return;
    const t = g(this.hass), s = window.prompt(t.amount, (e.amount_minor / 100).toFixed(2));
    if (s === null) return;
    const r = Math.round(Number(s) * 100);
    if (!(!Number.isFinite(r) || r < 0))
      try {
        await Ye(this.hass, this.vehicleId, e.id, { amount_minor: r }), await this.refresh();
      } catch {
        this.fail(t.expenseEditError);
      }
  }
  render() {
    const e = g(this.hass), t = this.snapshot?.trips ?? [], s = this.snapshot?.expenses ?? [], r = this.loadError || this.actionError;
    return c`<ha-card><h2>${e.manager}</h2>${r ? c`<p class="error" role="alert">${r}</p>` : ""}<section><h3>${e.newTrip}</h3><div class="actions"><input aria-label=${e.tripName} placeholder=${e.tripName} .value=${this.tripTitle} @input=${(n) => this.tripTitle = n.target.value}><input aria-label=${e.destination} placeholder=${e.destination} .value=${this.destination} @input=${(n) => this.destination = n.target.value}><button @click=${() => this.addTrip()}>${e.create}</button></div></section><section><h3>${e.trips}</h3>${t.length ? t.map((n) => c`<article class="trip"><div class="row"><strong>${n.title}</strong><span class="muted">${n.destination || ""} · ${be(n.status, this.hass)}</span></div><div class="actions"><button class="secondary" @click=${() => this.editTrip(n)}>${e.edit}</button><button class="secondary" @click=${() => this.removeTrip(n.id)}>${e.remove}</button>${n.status === "planned" || n.status === "paused" ? c`<button @click=${() => this.changeStatus(n.id, "active")}>${e.resume}</button>` : ""}${n.status === "active" ? c`<button class="secondary" @click=${() => this.changeStatus(n.id, "paused")}>${e.pause}</button><button @click=${() => this.changeStatus(n.id, "completed")}>${e.complete}</button>` : ""}<button class="secondary" @click=${() => {
      this.selected = n.id, this.refresh();
    }}>${e.details}</button></div>${this.selected === n.id ? c`<div class="details"><h4>${e.assignedDrives}</h4>${(this.snapshot?.drives ?? []).map((a) => c`<div class="row"><span>${N(a.started_at, this.hass)} · ${(a.distance_m / 1e3).toFixed(1)} km</span>${a.trip_id === n.id ? c`<button class="link" @click=${() => this.hass && Qe(this.hass, this.vehicleId, n.id, a.id).then(() => this.refresh())}>${e.unassign}</button>` : ""}</div>`)}${(this.snapshot?.available_drives ?? []).length ? c`<h4>${e.freeDrives}</h4>${this.snapshot?.available_drives?.map((a) => c`<div class="row"><span>${N(a.started_at, this.hass)} · ${(a.distance_m / 1e3).toFixed(1)} km</span><button class="link" @click=${() => this.assignDrive(n.id, a.id)}>${e.assign}</button></div>`)}` : ""}<h4>${e.expenses}</h4><div class="actions"><input aria-label=${e.amount} type="number" min="0" step="0.01" placeholder="EUR" .value=${this.amount} @input=${(a) => this.amount = a.target.value}><select aria-label=${e.category} .value=${this.category} @change=${(a) => this.category = a.target.value}>${nt.map((a) => c`<option value=${a}>${le(a, this.hass)}</option>`)}</select><button @click=${() => this.addExpense(n.id)}>${e.save}</button></div>${s.map((a) => c`<div class="row"><span>${le(a.category, this.hass)}: ${(a.amount_minor / 100).toFixed(2)} ${a.currency}</span><span><button class="link" @click=${() => this.editExpense(a)}>${e.edit}</button><button class="link" @click=${() => this.removeExpense(a.id)}>${e.remove}</button></span></div>`)}</div>` : ""}</article>`) : c`<p class="muted">${e.noTrip}</p>`}</section></ha-card>`;
  }
}
Ee.styles = [G.styles, j`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}`];
$e("camper-travel-journal-manager-card", Ee);
const at = 1e4;
function I() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function V(i) {
  return i.length <= 8 ? "••••" : `${i.slice(0, 4)}…${i.slice(-4)}`;
}
function he(i) {
  return i?.connection ? i.connection.connected === !0 ? "available" : i.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function ot(i) {
  const e = i, t = typeof e?.code == "string" ? e.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", s = typeof e?.message == "string" ? e.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: t, errorMessage: s };
}
function ct(i, e) {
  return new Promise((t, s) => {
    const r = setTimeout(() => s(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), e);
    i.then((n) => {
      clearTimeout(r), t(n);
    }, (n) => {
      clearTimeout(r), s(n);
    });
  });
}
async function z(i, e, t, s) {
  const r = I();
  try {
    const n = await ct(i.connection.sendMessagePromise(e), s);
    return { ...t(n), durationMs: Math.round(I() - r), value: n };
  } catch (n) {
    return { state: "failed", durationMs: Math.round(I() - r), ...ot(n) };
  }
}
function lt(i) {
  return i && typeof i == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function ht(i) {
  const e = i?.vehicles;
  return Array.isArray(e) && e.every((t) => t && typeof t == "object" && typeof t.vehicle_id == "string") ? { state: "success", structure: "ok", count: e.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function dt(i) {
  const e = i;
  return Array.isArray(e?.trips) && Array.isArray(e?.drives) && Array.isArray(e?.stops) ? { state: "success", structure: "ok", count: e.trips.length, drivesCount: e.drives.length, stopsCount: e.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function ut(i, e, t = at) {
  const s = { state: "not_run", durationMs: null };
  if (!i?.connection) return { version: "0.1.0-beta.9", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: s, vehicles: s, trips: s, vehicleId: V(e) };
  const r = he(i), n = await z(i, { type: "auth/current_user" }, lt, t), a = await z(i, { type: "camper_travel_journal/list_vehicles" }, ht, t), h = a.value?.vehicles?.filter((Ae) => typeof Ae.vehicle_id == "string") ?? [], o = h.length === 1 ? h[0].vehicle_id : void 0, u = await z(i, { type: "camper_travel_journal/list", vehicle_id: o ?? e }, dt, t), { value: l, ...m } = n, { value: v, ...w } = a, { value: $t, ...we } = u;
  return {
    version: "0.1.0-beta.9",
    connectionBefore: r,
    connectionAfter: he(i),
    authentication: m,
    vehicles: w,
    trips: we,
    vehicleId: V(e),
    ...o ? { resolvedVehicleId: V(o) } : {}
  };
}
function B(i) {
  return JSON.stringify(i, null, 2);
}
function q(i) {
  return i.state === "success" ? "erfolgreich" : i.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const de = "01M4XW0KD3GQ0KASAYHQ29840P";
class pt extends b {
  static styles = j`
    :host { display: block; color: var(--primary-text-color); }
    ha-card { padding: 16px; }
    h2 { margin: 0 0 12px; }
    dl { display: grid; grid-template-columns: minmax(10rem, 1fr) auto; gap: 8px; margin: 0 0 16px; }
    dt { color: var(--secondary-text-color); } dd { margin: 0; text-align: right; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    button { min-height: 40px; border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; color: var(--text-primary-color, #fff); background: var(--primary-color); }
    button.secondary { color: var(--primary-text-color); background: var(--secondary-background-color); }
    .error { color: var(--error-color); } .muted { color: var(--secondary-text-color); }
    pre, textarea { max-height: 16rem; width: 100%; box-sizing: border-box; overflow: auto; white-space: pre-wrap; font-size: .78rem; background: var(--secondary-background-color); padding: 8px; }
  `;
  _hass;
  report;
  running = !1;
  error = "";
  manualCopy = !1;
  config = { vehicle_id: de };
  set hass(e) {
    this._hass = e, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(e) {
    this.config = { vehicle_id: e.vehicle_id || de };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await ut(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const e = B(this.report);
    if (!navigator.clipboard?.writeText) {
      this.manualCopy = !0, this.error = "Bitte den eingeblendeten Bericht manuell auswählen und kopieren.", this.requestUpdate();
      return;
    }
    try {
      await navigator.clipboard.writeText(e), this.manualCopy = !1, this.error = "";
    } catch {
      this.manualCopy = !0, this.error = "Automatisches Kopieren ist in diesem Browser nicht verfügbar. Bitte den Bericht manuell auswählen und kopieren.";
    }
    this.requestUpdate();
  }
  selectReport() {
    this.shadowRoot?.querySelector('textarea[aria-label="Diagnosebericht zum manuellen Kopieren"]')?.select();
  }
  render() {
    const e = this.report;
    return c`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? c`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? c`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${e ? c`<dl>
        <dt>Version</dt><dd>${e.version}</dd>
        <dt>Verbindung vorher</dt><dd>${e.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${e.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${q(e.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${q(e.vehicles)}${e.vehicles.durationMs === null ? "" : ` (${e.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${q(e.trips)}${e.trips.durationMs === null ? "" : ` (${e.trips.durationMs} ms)`}${e.trips.state === "success" ? ` · ${e.trips.count ?? 0} Reisen / ${e.trips.drivesCount ?? 0} Fahrten / ${e.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${e.vehicles.structure === "ok" && e.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${B(e)}</pre>${this.manualCopy ? c`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${B(e)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${e ? "Diagnose wiederholen" : "Diagnose starten"}</button>${e ? c`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? c`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", pt);
function gt(i, e) {
  return i.vehicle_id || e.length !== 1 ? i : { ...i, vehicle_id: e[0].vehicle_id };
}
function mt(i, e) {
  return i.type === e.type && i.vehicle_id === e.vehicle_id;
}
class ft extends b {
  static styles = j`
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
    mt(this._config, e) || (this._config = { ...e }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const e = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await tt(e), this.loadedConnection = e.connection;
        const t = gt(this._config, this.vehicles);
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
    return c`
      <div class="field">
        <label for="vehicle">${e.editorVehicle}</label>
        ${this.loading ? c`<span class="muted">${e.editorLoading}</span>` : c`
          <select id="vehicle" aria-label=${e.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${e.editorChooseVehicle}</option>
            ${this.vehicles.map((t) => c`<option value=${t.vehicle_id} ?selected=${t.vehicle_id === this._config.vehicle_id}>${t.name || t.title}</option>`)}
          </select>
        `}
        ${this.error ? c`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? c`<span class="error" role="alert">${e.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", ft);
const vt = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const i of vt) window.customCards.some((e) => e.type === i.type) || window.customCards.push(i);
