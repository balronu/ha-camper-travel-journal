const P = globalThis, te = P.ShadowRoot && (P.ShadyCSS === void 0 || P.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = /* @__PURE__ */ Symbol(), oe = /* @__PURE__ */ new WeakMap();
let Ee = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (te && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = oe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && oe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (i) => new Ee(typeof i == "string" ? i : i + "", void 0, ie), O = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[n + 1], i[0]);
  return new Ee(t, i, ie);
}, Ne = (i, e) => {
  if (te) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = P.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, ce = te ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Pe(t);
})(i) : i;
const { is: Le, defineProperty: Oe, getOwnPropertyDescriptor: je, getOwnPropertyNames: He, getOwnPropertySymbols: ze, getPrototypeOf: qe } = Object, j = globalThis, le = j.trustedTypes, Ve = le ? le.emptyScript : "", Be = j.reactiveElementPolyfillSupport, k = (i, e) => i, X = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Ve : null;
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
} }, xe = (i, e) => !Le(i, e), de = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: xe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = de) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && Oe(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: n } = je(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const c = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? de;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const e = qe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const t = this.properties, s = [...He(t), ...ze(t)];
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
      for (const r of s) t.unshift(ce(r));
    } else e !== void 0 && t.push(ce(e));
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
    return Ne(e, this.constructor.elementStyles), e;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : X).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : X;
      this._$Em = r;
      const c = o.fromAttribute(t, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? xe)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: o } = n, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[k("elementProperties")] = /* @__PURE__ */ new Map(), A[k("finalized")] = /* @__PURE__ */ new Map(), Be?.({ ReactiveElement: A }), (j.reactiveElementVersions ??= []).push("2.1.2");
const se = globalThis, he = (i) => i, N = se.trustedTypes, ue = N ? N.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, we = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + $, Ke = `<${Ae}>`, x = document, I = () => x.createComment(""), U = (i) => i === null || typeof i != "object" && typeof i != "function", re = Array.isArray, Fe = (i) => re(i) || typeof i?.[Symbol.iterator] == "function", z = `[
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, ge = />/g, _ = RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^
\f\r"'\`<>=]|("|')|))|$)`, "g"), me = /'/g, ve = /"/g, Ce = /^(?:script|style|textarea|title)$/i, We = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), l = We(1), C = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), fe = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function De(i, e) {
  if (!re(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ue !== void 0 ? ue.createHTML(e) : e;
}
const Ge = (i, e) => {
  const t = i.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = S;
  for (let c = 0; c < t; c++) {
    const a = i[c];
    let u, p, d = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, p = o.exec(a), p !== null); ) m = o.lastIndex, o === S ? p[1] === "!--" ? o = pe : p[1] !== void 0 ? o = ge : p[2] !== void 0 ? (Ce.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = _) : p[3] !== void 0 && (o = _) : o === _ ? p[0] === ">" ? (o = r ?? S, d = -1) : p[1] === void 0 ? d = -2 : (d = o.lastIndex - p[2].length, u = p[1], o = p[3] === void 0 ? _ : p[3] === '"' ? ve : me) : o === ve || o === me ? o = _ : o === pe || o === ge ? o = S : (o = _, r = void 0);
    const f = o === _ && i[c + 1].startsWith("/>") ? " " : "";
    n += o === S ? a + Ke : d >= 0 ? (s.push(u), a.slice(0, d) + we + a.slice(d) + $ + f) : a + $ + (d === -2 ? c : f);
  }
  return [De(i, n + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class M {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = e.length - 1, a = this.parts, [u, p] = Ge(e, t);
    if (this.el = M.createElement(u, s), b.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = b.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(we)) {
          const m = p[o++], f = r.getAttribute(d).split($), w = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: w[2], strings: f, ctor: w[1] === "." ? Je : w[1] === "?" ? Xe : w[1] === "@" ? Qe : H }), r.removeAttribute(d);
        } else d.startsWith($) && (a.push({ type: 6, index: n }), r.removeAttribute(d));
        if (Ce.test(r.tagName)) {
          const d = r.textContent.split($), m = d.length - 1;
          if (m > 0) {
            r.textContent = N ? N.emptyScript : "";
            for (let f = 0; f < m; f++) r.append(d[f], I()), b.nextNode(), a.push({ type: 2, index: ++n });
            r.append(d[m], I());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ae) a.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf($, d + 1)) !== -1; ) a.push({ type: 7, index: n }), d += $.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = x.createElement("template");
    return s.innerHTML = e, s;
  }
}
function D(i, e, t = i, s) {
  if (e === C) return e;
  let r = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = U(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = r : t._$Cl = r), r !== void 0 && (e = D(i, r._$AS(i, e.values), r, s)), e;
}
class Ze {
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
    const { el: { content: t }, parts: s } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
    b.currentNode = r;
    let n = b.nextNode(), o = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new R(n, n.nextSibling, this, e) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (u = new Ye(n, this, e)), this._$AV.push(u), a = s[++c];
      }
      o !== a?.index && (n = b.nextNode(), o++);
    }
    return b.currentNode = x, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = D(this, e, t), U(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Fe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = M.createElement(De(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new Ze(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = fe.get(e.strings);
    return t === void 0 && fe.set(e.strings, t = new M(e)), t;
  }
  k(e) {
    re(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const n of e) r === t.length ? t.push(s = new R(this.O(I()), this.O(I()), this, this.options)) : s = t[r], s._$AI(n), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = he(e).nextSibling;
      he(e).remove(), e = s;
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
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = g;
  }
  _$AI(e, t = this, s, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = D(this, e, t, 0), o = !U(e) || e !== this._$AH && e !== C, o && (this._$AH = e);
    else {
      const c = e;
      let a, u;
      for (e = n[0], a = 0; a < n.length - 1; a++) u = D(this, c[s + a], t, a), u === C && (u = this._$AH[a]), o ||= !U(u) || u !== this._$AH[a], u === g ? e = g : e !== g && (e += (u ?? "") + n[a + 1]), this._$AH[a] = u;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Je extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Xe extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Qe extends H {
  constructor(e, t, s, r, n) {
    super(e, t, s, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = D(this, e, t, 0) ?? g) === C) return;
    const s = this._$AH, r = e === g && s !== g || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== g && (s === g || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ye {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    D(this, e);
  }
}
const et = se.litHtmlPolyfillSupport;
et?.(M, R), (se.litHtmlVersions ??= []).push("3.3.3");
const tt = (i, e, t) => {
  const s = t?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = r = new R(e.insertBefore(I(), n), n, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
const ne = globalThis;
class E extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = tt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return C;
  }
}
E._$litElement$ = !0, E.finalized = !0, ne.litElementHydrateSupport?.({ LitElement: E });
const it = ne.litElementPolyfillSupport;
it?.({ LitElement: E });
(ne.litElementVersions ??= []).push("4.2.2");
class ae extends E {
  _hass;
  config = {};
  static styles = O`
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
function Se(i, e) {
  customElements.get(i) || customElements.define(i, e);
}
async function v(i, e, t, s = {}) {
  return i.connection.sendMessagePromise({ type: e, vehicle_id: t, ...s });
}
const Q = (i, e, t) => v(i, "camper_travel_journal/list", e, t ? { trip_id: t } : {}), ke = (i, e, t, s) => v(i, "camper_travel_journal/transition_trip", e, { trip_id: t, status: s }), st = (i, e, t, s = "", r = "", n = "") => v(i, "camper_travel_journal/create_trip", e, { title: t, start_date: s || void 0, end_date: r || void 0, destination: n }), rt = (i, e, t, s) => v(i, "camper_travel_journal/update_trip", e, { trip_id: t, ...s }), nt = (i, e, t) => v(i, "camper_travel_journal/delete_trip", e, { trip_id: t }), at = (i, e, t, s) => v(i, "camper_travel_journal/unlink_drive", e, { trip_id: t, drive_id: s }), ot = (i, e, t, s) => v(i, "camper_travel_journal/link_drives", e, { trip_id: t, drive_ids: s }), ct = (i, e, t) => v(i, "camper_travel_journal/create_manual_drive", e, t), lt = (i, e, t, s) => v(i, "camper_travel_journal/create_expense", e, { trip_id: t, ...s }), dt = (i, e, t, s) => v(i, "camper_travel_journal/update_expense", e, { expense_id: t, ...s }), ht = (i, e, t) => v(i, "camper_travel_journal/delete_expense", e, { expense_id: t }), ut = async (i) => (await i.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], Te = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], q = Te, pt = {
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
  close: "Schließen",
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
  categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", other: "Sonstiges" },
  statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" },
  amountInvalid: "Bitte einen gültigen Betrag mit höchstens zwei Nachkommastellen eingeben.",
  categoryInvalid: "Bitte eine gültige Kostenkategorie auswählen.",
  mixedCurrency: "Mehrere Währungen",
  cancel: "Abbrechen",
  saving: "Speichern …",
  total: "Gesamt",
  editorVehicle: "Wohnmobil",
  editorChooseVehicle: "Wohnmobil auswählen",
  editorLoading: "Wohnmobile werden geladen …",
  editorNoVehicle: "Kein eingerichtetes Wohnmobil gefunden.",
  editorLoadError: "Wohnmobile konnten nicht geladen werden.",
  confirmDelete: "Nochmals zum Bestätigen klicken",
  startDate: "Beginn",
  endDate: "Ende",
  period: "Reisezeitraum",
  noDrives: "Noch keine Fahrten erfasst.",
  driveStart: "Start",
  driveEnd: "Ende",
  duration: "Dauer",
  sourceGps: "GPS-erkannt",
  sourceManual: "Manuell",
  startLocation: "Startort",
  endLocation: "Zielort",
  distanceKm: "Kilometer",
  durationMinutes: "Dauer in Minuten",
  manualDrive: "Manuelle Fahrt",
  createDrive: "Fahrt anlegen",
  driveCreateError: "Fahrt konnte nicht gespeichert werden.",
  dateInvalid: "Bitte gültige Daten eingeben."
}, gt = {
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
  close: "Close",
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
  categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", other: "Other" },
  statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" },
  amountInvalid: "Enter a valid amount with no more than two decimal places.",
  categoryInvalid: "Select a valid cost category.",
  mixedCurrency: "Multiple currencies",
  cancel: "Cancel",
  saving: "Saving …",
  total: "Total",
  editorVehicle: "Camper",
  editorChooseVehicle: "Select camper",
  editorLoading: "Loading campers …",
  editorNoVehicle: "No configured camper found.",
  editorLoadError: "Configured campers could not be loaded.",
  confirmDelete: "Click again to confirm",
  startDate: "Start",
  endDate: "End",
  period: "Travel period",
  noDrives: "No drives recorded yet.",
  driveStart: "Start",
  driveEnd: "End",
  duration: "Duration",
  sourceGps: "GPS detected",
  sourceManual: "Manual",
  startLocation: "Start location",
  endLocation: "Destination",
  distanceKm: "Distance in km",
  durationMinutes: "Duration in minutes",
  manualDrive: "Manual drive",
  createDrive: "Create drive",
  driveCreateError: "Drive could not be saved.",
  dateInvalid: "Enter valid dates."
};
function h(i) {
  return (i?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? pt : gt;
}
function L(i, e) {
  const t = (e?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Date(i).toLocaleDateString(t);
}
function $e(i, e) {
  const t = (e?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Date(i).toLocaleString(t, { dateStyle: "short", timeStyle: "short" });
}
function mt(i, e) {
  const t = Math.max(0, Math.round((i ?? 0) / 60));
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
function vt(i, e) {
  return i.start_date || i.end_date ? [i.start_date, i.end_date].filter(Boolean).join(" – ") || "" : i.started_at ? `${L(i.started_at, e)}${i.ended_at ? ` – ${L(i.ended_at, e)}` : ""}` : "";
}
function Ie(i, e) {
  return h(e).statuses[i] ?? i;
}
function V(i, e) {
  return h(e).categories[i] ?? i;
}
function B(i) {
  return Te.includes(i);
}
function T(i, e, t) {
  const s = (t?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(s, { style: "currency", currency: e, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(i / 100);
}
function _e(i) {
  const e = i.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(e)) return null;
  const [t, s = ""] = e.split("."), r = Number(t) * 100 + Number((s + "00").slice(0, 2));
  return Number.isSafeInteger(r) ? r : null;
}
const Y = "camper-travel-journal-expenses-changed", ee = "camper-travel-journal-data-changed";
function K(i) {
  window.dispatchEvent(new CustomEvent(Y, { detail: i }));
}
function y(i) {
  window.dispatchEvent(new CustomEvent(ee, { detail: i }));
}
class ft extends ae {
  snapshot;
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (e) => {
    e.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(Y, this.onDataChanged), window.addEventListener(ee, this.onDataChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(Y, this.onDataChanged), window.removeEventListener(ee, this.onDataChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const e = await Q(this.hass, this.vehicleId), t = e.trips[0];
      return this.snapshot = t ? await Q(this.hass, this.vehicleId, t.id) : e, this.loadError = "", !0;
    } catch {
      return this.loadError = h(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(e) {
    const t = this.snapshot?.trips[0];
    if (!(!this.hass || !t))
      try {
        await ke(this.hass, this.vehicleId, t.id, e), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = h(this.hass).statusError, this.requestUpdate();
      }
  }
  render() {
    const e = h(this.hass), t = this.snapshot?.trips[0], s = (this.snapshot?.drives ?? []).reduce((a, u) => a + u.distance_m, 0) / 1e3, r = this.snapshot?.expense_summary, n = r?.mixed_currency ? e.mixedCurrency : r?.total_minor !== void 0 && r.currency ? T(r.total_minor, r.currency, this.hass) : T(0, "EUR", this.hass), o = this.loadError || this.actionError, c = t ? [t.start_date, t.end_date].filter(Boolean).join(" – ") || (t.started_at ? `${L(t.started_at, this.hass)}${t.ended_at ? ` – ${L(t.ended_at, this.hass)}` : ""}` : "") : "";
    return l`<ha-card><h2>${t?.title ?? e.title}</h2>${o ? l`<p class="error" role="alert">${o}</p>` : t ? l`<p class="muted">${t.destination || e.noDestination} · ${Ie(t.status, this.hass)} · ${c}</p><div class="grid"><div class="metric"><span class="muted">${e.distance}</span><span class="value">${s.toFixed(1)} km</span></div><div class="metric"><span class="muted">${e.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${e.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${e.costs}</span><span class="value">${n}</span></div></div><div class="actions">${t.status === "planned" || t.status === "paused" ? l`<button @click=${() => this.setStatus("active")}>${e.resume}</button>` : ""}${t.status === "active" ? l`<button class="secondary" @click=${() => this.setStatus("paused")}>${e.pause}</button><button @click=${() => this.setStatus("completed")}>${e.complete}</button>` : ""}</div>` : l`<p class="muted">${e.noTrip}</p>`}${this.loading ? l`<p class="muted">${e.loading}</p>` : ""}</ha-card>`;
  }
}
Se("camper-travel-journal-summary-card", ft);
class Ue extends ae {
  snapshot;
  loadError = "";
  actionError = "";
  tripTitle = "";
  destination = "";
  tripStartDate = "";
  tripEndDate = "";
  editingTripId = "";
  editingTripTitle = "";
  editingDestination = "";
  editingStartDate = "";
  editingEndDate = "";
  confirmingTripId = "";
  confirmingExpenseId = "";
  amount = "";
  category = q[0];
  selected = "";
  editingExpenseId = "";
  editingAmount = "";
  editingCategory = "other";
  expenseSavingId = "";
  manualOccurredAt = "";
  manualStartLocation = "";
  manualEndLocation = "";
  manualDistanceKm = "";
  manualDurationMinutes = "";
  manualSaving = !1;
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
    if (!this.hass || !this.vehicleId) return !1;
    try {
      return this.snapshot = await Q(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = h(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(e) {
    this.actionError = e, this.requestUpdate();
  }
  setExpenseAmount(e) {
    this.amount = e, this.requestUpdate();
  }
  setEditingExpenseAmount(e) {
    this.editingAmount = e, this.requestUpdate();
  }
  setExpenseCategory(e) {
    if (!B(e)) return this.fail(h(this.hass).categoryInvalid);
    this.category = e, this.requestUpdate();
  }
  setEditingExpenseCategory(e) {
    if (!B(e)) return this.fail(h(this.hass).categoryInvalid);
    this.editingCategory = e, this.requestUpdate();
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(h(this.hass).dateInvalid);
      try {
        await st(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), y({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(h(this.hass).tripCreateError);
      }
    }
  }
  startTripEdit(e) {
    this.actionError = "", this.editingTripId = e.id, this.editingTripTitle = e.title, this.editingDestination = e.destination || "", this.editingStartDate = e.start_date || "", this.editingEndDate = e.end_date || "", this.requestUpdate();
  }
  cancelTripEdit() {
    this.editingTripId = "", this.actionError = "", this.requestUpdate();
  }
  async saveTrip(e) {
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail(h(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(h(this.hass).dateInvalid);
    try {
      await rt(this.hass, this.vehicleId, e.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), y({ vehicleId: this.vehicleId, tripId: e.id });
    } catch {
      this.fail(h(this.hass).tripEditError);
    }
  }
  async removeTrip(e) {
    if (this.hass) {
      if (this.confirmingTripId !== e) {
        this.confirmingTripId = e, this.requestUpdate();
        return;
      }
      try {
        await nt(this.hass, this.vehicleId, e), this.confirmingTripId = "", this.selected === e && (this.selected = ""), await this.refresh(), y({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(e, t) {
    if (this.hass)
      try {
        await ke(this.hass, this.vehicleId, e, t), this.actionError = "", await this.refresh(), y({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).statusError);
      }
  }
  async assignDrive(e, t) {
    if (this.hass)
      try {
        await ot(this.hass, this.vehicleId, e, [t]), this.actionError = "", await this.refresh(), y({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveAssignError);
      }
  }
  async unassignDrive(e, t) {
    if (this.hass)
      try {
        await at(this.hass, this.vehicleId, e, t), this.actionError = "", await this.refresh(), y({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(e) {
    this.selected = this.selected === e ? "" : e, this.selected ? this.refresh() : this.requestUpdate();
  }
  async addManualDrive(e) {
    if (!this.hass || this.manualSaving) return;
    const t = Number(this.manualDistanceKm.replace(",", ".")), s = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(t) || t < 0 || s !== void 0 && (!Number.isInteger(s) || s < 0)) return this.fail(h(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await ct(this.hass, this.vehicleId, { trip_id: e, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: t, ...s === void 0 ? {} : { duration_minutes: s } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), y({ vehicleId: this.vehicleId, tripId: e });
    } catch {
      this.fail(h(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  async addExpense(e) {
    if (!this.hass) return;
    const t = h(this.hass), s = _e(this.amount);
    if (s === null) return this.fail(t.amountInvalid);
    try {
      await lt(this.hass, this.vehicleId, e, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: s, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", K({ vehicleId: this.vehicleId, tripId: e }));
    } catch {
      this.fail(t.expenseCreateError);
    }
  }
  startExpenseEdit(e) {
    this.actionError = "", this.editingExpenseId = e.id, this.editingAmount = (e.amount_minor / 100).toFixed(2), this.editingCategory = e.category, this.requestUpdate();
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.actionError = "", this.requestUpdate();
  }
  async saveExpense(e) {
    if (!this.hass || this.expenseSavingId) return;
    const t = h(this.hass), s = _e(this.editingAmount);
    if (s === null) return this.fail(t.amountInvalid);
    if (!B(this.editingCategory)) return this.fail(t.categoryInvalid);
    this.expenseSavingId = e.id;
    try {
      await dt(this.hass, this.vehicleId, e.id, { amount_minor: s, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), K({ vehicleId: this.vehicleId, tripId: e.trip_id ?? this.selected }));
    } catch {
      this.fail(t.expenseEditError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  async removeExpense(e) {
    if (!(!this.hass || this.expenseSavingId)) {
      if (this.confirmingExpenseId !== e) {
        this.confirmingExpenseId = e, this.requestUpdate();
        return;
      }
      this.expenseSavingId = e;
      try {
        await ht(this.hass, this.vehicleId, e), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && K({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(h(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(e) {
    const t = [...q];
    return e && !t.includes(e) && t.unshift(e), t;
  }
  renderExpense(e, t) {
    const s = this.editingExpenseId === e.id, r = this.expenseSavingId === e.id;
    return l`<div class="expense-row">${s ? l`<form class="expense-form" @submit=${(n) => {
      n.preventDefault(), this.saveExpense(e);
    }}><select aria-label=${t.category} .value=${this.editingCategory} @change=${(n) => this.setEditingExpenseCategory(n.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((n) => l`<option value=${n}>${V(n, this.hass)}</option>`)}</select><input aria-label=${t.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(n) => this.setEditingExpenseAmount(n.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${r}>${r ? t.saving : t.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${r}>${t.cancel}</button></div></form>` : l`<span>${V(e.category, this.hass)}: ${T(e.amount_minor, e.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(e)} ?disabled=${!!this.expenseSavingId}>${t.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(e.id)}>${this.confirmingExpenseId === e.id ? t.confirmDelete : t.remove}</button></span>`}</div>`;
  }
  renderDrive(e, t, s) {
    const r = e.source === "manual" ? s.sourceManual : s.sourceGps, n = e.source === "manual" ? `${e.start_label || "—"} → ${e.end_label || "—"}` : `${s.driveStart}: ${$e(e.started_at, this.hass)} · ${s.driveEnd}: ${$e(e.ended_at, this.hass)}`;
    return l`<div class="drive-row"><div><strong>${r}</strong> · ${n}<br><span class="muted">${(e.distance_m / 1e3).toFixed(1)} km · ${mt(e.duration_seconds, this.hass)} · ${e.assignment_status === "assigned" ? s.assignedDrives : s.freeDrives}</span></div>${e.trip_id === t ? l`<button type="button" class="link" @click=${() => this.unassignDrive(t, e.id)}>${s.unassign}</button>` : l`<button type="button" class="link" @click=${() => this.assignDrive(t, e.id)}>${s.assign}</button>`}</div>`;
  }
  render() {
    const e = h(this.hass), t = this.snapshot?.trips ?? [], s = this.snapshot?.expenses ?? [], r = this.snapshot?.expense_summary, n = r?.mixed_currency ? e.mixedCurrency : r?.total_minor !== void 0 && r.currency ? T(r.total_minor, r.currency, this.hass) : T(0, "EUR", this.hass), o = this.loadError || this.actionError;
    return l`<ha-card><h2>${e.manager}</h2>${o ? l`<p class="error" role="alert">${o}</p>` : ""}<section><h3>${e.newTrip}</h3><div class="form-grid"><input aria-label=${e.tripName} placeholder=${e.tripName} .value=${this.tripTitle} @input=${(c) => this.tripTitle = c.target.value}><input aria-label=${e.destination} placeholder=${e.destination} .value=${this.destination} @input=${(c) => this.destination = c.target.value}><label>${e.startDate}<input type="date" .value=${this.tripStartDate} @input=${(c) => this.tripStartDate = c.currentTarget.value}></label><label>${e.endDate}<input type="date" .value=${this.tripEndDate} @input=${(c) => this.tripEndDate = c.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${e.create}</button></div></section><section><h3>${e.trips}</h3>${t.length ? t.map((c) => l`<article class="trip"><div class="row"><strong>${c.title}</strong><span class="muted">${c.destination || ""} · ${Ie(c.status, this.hass)} · ${vt(c, this.hass) || e.period}</span></div>${this.editingTripId === c.id ? l`<form class="form-grid" @submit=${(a) => {
      a.preventDefault(), this.saveTrip(c);
    }}><input aria-label=${e.tripName} .value=${this.editingTripTitle} @input=${(a) => this.editingTripTitle = a.currentTarget.value}><input aria-label=${e.destination} .value=${this.editingDestination} @input=${(a) => this.editingDestination = a.currentTarget.value}><label>${e.startDate}<input type="date" .value=${this.editingStartDate} @input=${(a) => this.editingStartDate = a.currentTarget.value}></label><label>${e.endDate}<input type="date" .value=${this.editingEndDate} @input=${(a) => this.editingEndDate = a.currentTarget.value}></label><button type="submit">${e.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${e.cancel}</button></form>` : l`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(c)}>${e.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(c.id)}>${this.confirmingTripId === c.id ? e.confirmDelete : e.remove}</button>${c.status === "planned" || c.status === "paused" ? l`<button type="button" @click=${() => this.changeStatus(c.id, "active")}>${e.resume}</button>` : ""}${c.status === "active" ? l`<button type="button" class="secondary" @click=${() => this.changeStatus(c.id, "paused")}>${e.pause}</button><button type="button" @click=${() => this.changeStatus(c.id, "completed")}>${e.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(c.id)}>${this.selected === c.id ? e.close : e.details}</button></div>`}${this.selected === c.id ? l`<div class="details"><h4>${e.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((a) => this.renderDrive(a, c.id, e)) : l`<p class="muted">${e.noDrives}</p>`}<h4>${e.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((a) => this.renderDrive(a, c.id, e)) : l`<p class="muted">${e.noDrives}</p>`}<h4>${e.manualDrive}</h4><div class="form-grid"><label>${e.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(a) => this.manualOccurredAt = a.currentTarget.value}></label><input aria-label=${e.startLocation} placeholder=${e.startLocation} .value=${this.manualStartLocation} @input=${(a) => this.manualStartLocation = a.currentTarget.value}><input aria-label=${e.endLocation} placeholder=${e.endLocation} .value=${this.manualEndLocation} @input=${(a) => this.manualEndLocation = a.currentTarget.value}><input aria-label=${e.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${e.distanceKm} .value=${this.manualDistanceKm} @input=${(a) => this.manualDistanceKm = a.currentTarget.value}><input aria-label=${e.durationMinutes} type="number" min="0" step="1" placeholder=${e.durationMinutes} .value=${this.manualDurationMinutes} @input=${(a) => this.manualDurationMinutes = a.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(c.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? e.saving : e.createDrive}</button></div><h4>${e.expenses}</h4><div class="expense-form create-form"><input aria-label=${e.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(a) => this.setExpenseAmount(a.currentTarget.value)}><select aria-label=${e.category} .value=${this.category} @change=${(a) => this.setExpenseCategory(a.currentTarget.value)}>${q.map((a) => l`<option value=${a}>${V(a, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(c.id)}>${e.save}</button></div>${s.map((a) => this.renderExpense(a, e))}<p class="total"><strong>${e.total}: ${n}</strong></p></div>` : ""}</article>`) : l`<p class="muted">${e.noTrip}</p>`}</section></ha-card>`;
  }
}
Ue.styles = [ae.styles, O`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
Se("camper-travel-journal-manager-card", Ue);
const $t = 1e4;
function F() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function W(i) {
  return i.length <= 8 ? "••••" : `${i.slice(0, 4)}…${i.slice(-4)}`;
}
function ye(i) {
  return i?.connection ? i.connection.connected === !0 ? "available" : i.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function _t(i) {
  const e = i, t = typeof e?.code == "string" ? e.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", s = typeof e?.message == "string" ? e.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: t, errorMessage: s };
}
function yt(i, e) {
  return new Promise((t, s) => {
    const r = setTimeout(() => s(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), e);
    i.then((n) => {
      clearTimeout(r), t(n);
    }, (n) => {
      clearTimeout(r), s(n);
    });
  });
}
async function G(i, e, t, s) {
  const r = F();
  try {
    const n = await yt(i.connection.sendMessagePromise(e), s);
    return { ...t(n), durationMs: Math.round(F() - r), value: n };
  } catch (n) {
    return { state: "failed", durationMs: Math.round(F() - r), ..._t(n) };
  }
}
function bt(i) {
  return i && typeof i == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function Et(i) {
  const e = i?.vehicles;
  return Array.isArray(e) && e.every((t) => t && typeof t == "object" && typeof t.vehicle_id == "string") ? { state: "success", structure: "ok", count: e.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function xt(i) {
  const e = i;
  return Array.isArray(e?.trips) && Array.isArray(e?.drives) && Array.isArray(e?.stops) ? { state: "success", structure: "ok", count: e.trips.length, drivesCount: e.drives.length, stopsCount: e.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function wt(i, e, t = $t) {
  const s = { state: "not_run", durationMs: null };
  if (!i?.connection) return { version: "0.1.0-beta.12", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: s, vehicles: s, trips: s, vehicleId: W(e) };
  const r = ye(i), n = await G(i, { type: "auth/current_user" }, bt, t), o = await G(i, { type: "camper_travel_journal/list_vehicles" }, Et, t), c = o.value?.vehicles?.filter((Re) => typeof Re.vehicle_id == "string") ?? [], a = c.length === 1 ? c[0].vehicle_id : void 0, p = await G(i, { type: "camper_travel_journal/list", vehicle_id: a ?? e }, xt, t), { value: d, ...m } = n, { value: f, ...w } = o, { value: Tt, ...Me } = p;
  return {
    version: "0.1.0-beta.12",
    connectionBefore: r,
    connectionAfter: ye(i),
    authentication: m,
    vehicles: w,
    trips: Me,
    vehicleId: W(e),
    ...a ? { resolvedVehicleId: W(a) } : {}
  };
}
function Z(i) {
  return JSON.stringify(i, null, 2);
}
function J(i) {
  return i.state === "success" ? "erfolgreich" : i.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const be = "01M4XW0KD3GQ0KASAYHQ29840P";
class At extends E {
  static styles = O`
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
  config = { vehicle_id: be };
  set hass(e) {
    this._hass = e, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(e) {
    this.config = { vehicle_id: e.vehicle_id || be };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await wt(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const e = Z(this.report);
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
    return l`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? l`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? l`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${e ? l`<dl>
        <dt>Version</dt><dd>${e.version}</dd>
        <dt>Verbindung vorher</dt><dd>${e.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${e.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${J(e.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${J(e.vehicles)}${e.vehicles.durationMs === null ? "" : ` (${e.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${J(e.trips)}${e.trips.durationMs === null ? "" : ` (${e.trips.durationMs} ms)`}${e.trips.state === "success" ? ` · ${e.trips.count ?? 0} Reisen / ${e.trips.drivesCount ?? 0} Fahrten / ${e.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${e.vehicles.structure === "ok" && e.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Z(e)}</pre>${this.manualCopy ? l`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Z(e)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${e ? "Diagnose wiederholen" : "Diagnose starten"}</button>${e ? l`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? l`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", At);
function Ct(i, e) {
  return i.vehicle_id || e.length !== 1 ? i : { ...i, vehicle_id: e[0].vehicle_id };
}
function Dt(i, e) {
  return i.type === e.type && i.vehicle_id === e.vehicle_id;
}
class St extends E {
  static styles = O`
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
    Dt(this._config, e) || (this._config = { ...e }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const e = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await ut(e), this.loadedConnection = e.connection;
        const t = Ct(this._config, this.vehicles);
        t.vehicle_id !== this._config.vehicle_id && (this._config = t, this.fireConfigChanged());
      } catch {
        this.error = h(e).editorLoadError;
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
    const e = h(this._hass);
    return l`
      <div class="field">
        <label for="vehicle">${e.editorVehicle}</label>
        ${this.loading ? l`<span class="muted">${e.editorLoading}</span>` : l`
          <select id="vehicle" aria-label=${e.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${e.editorChooseVehicle}</option>
            ${this.vehicles.map((t) => l`<option value=${t.vehicle_id} ?selected=${t.vehicle_id === this._config.vehicle_id}>${t.name || t.title}</option>`)}
          </select>
        `}
        ${this.error ? l`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? l`<span class="error" role="alert">${e.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", St);
const kt = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const i of kt) window.customCards.some((e) => e.type === i.type) || window.customCards.push(i);
