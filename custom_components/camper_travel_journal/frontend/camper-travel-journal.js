const N = globalThis, ce = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = /* @__PURE__ */ Symbol(), pe = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ce && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = pe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && pe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Be = (s) => new Ce(typeof s == "string" ? s : s + "", void 0, de), T = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new Ce(t, s, de);
}, je = (s, e) => {
  if (ce) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = N.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  }
}, ge = ce ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Be(t);
})(s) : s;
const { is: ze, defineProperty: qe, getOwnPropertyDescriptor: He, getOwnPropertyNames: Fe, getOwnPropertySymbols: Ve, getPrototypeOf: Ge } = Object, q = globalThis, me = q.trustedTypes, Ke = me ? me.emptyScript : "", We = q.reactiveElementPolyfillSupport, I = (s, e) => s, se = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? Ke : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ae = (s, e) => !ze(s, e), ve = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: Ae };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), q.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let S = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ve) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && qe(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: n } = He(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const l = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ve;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = Ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const t = this.properties, i = [...Fe(t), ...Ve(t)];
      for (const r of i) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, r] of t) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const r = this._$Eu(t, i);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) t.unshift(ge(r));
    } else e !== void 0 && t.push(ge(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return je(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : se).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : se;
      this._$Em = r;
      const l = o.fromAttribute(t, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? Ae)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, l = this[r];
        o !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
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
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[I("elementProperties")] = /* @__PURE__ */ new Map(), S[I("finalized")] = /* @__PURE__ */ new Map(), We?.({ ReactiveElement: S }), (q.reactiveElementVersions ??= []).push("2.1.2");
const le = globalThis, $e = (s) => s, O = le.trustedTypes, fe = O ? O.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Te = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + x, Xe = `<${ke}>`, D = document, M = () => D.createComment(""), U = (s) => s === null || typeof s != "object" && typeof s != "function", he = Array.isArray, Ze = (s) => he(s) || typeof s?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ye = /-->/g, xe = />/g, b = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, _e = /"/g, Ie = /^(?:script|style|textarea|title)$/i, Je = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), d = Je(1), C = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), Ee = /* @__PURE__ */ new WeakMap(), _ = D.createTreeWalker(D, 129);
function Pe(s, e) {
  if (!he(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(e) : e;
}
const Ye = (s, e) => {
  const t = s.length - 1, i = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = k;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, p, u = -1, v = 0;
    for (; v < a.length && (o.lastIndex = v, p = o.exec(a), p !== null); ) v = o.lastIndex, o === k ? p[1] === "!--" ? o = ye : p[1] !== void 0 ? o = xe : p[2] !== void 0 ? (Ie.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = b) : p[3] !== void 0 && (o = b) : o === b ? p[0] === ">" ? (o = r ?? k, u = -1) : p[1] === void 0 ? u = -2 : (u = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? b : p[3] === '"' ? _e : be) : o === _e || o === be ? o = b : o === ye || o === xe ? o = k : (o = b, r = void 0);
    const f = o === b && s[l + 1].startsWith("/>") ? " " : "";
    n += o === k ? a + Xe : u >= 0 ? (i.push(c), a.slice(0, u) + Te + a.slice(u) + x + f) : a + x + (u === -2 ? l : f);
  }
  return [Pe(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class R {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const l = e.length - 1, a = this.parts, [c, p] = Ye(e, t);
    if (this.el = R.createElement(c, i), _.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = _.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Te)) {
          const v = p[o++], f = r.getAttribute(u).split(x), w = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: n, name: w[2], strings: f, ctor: w[1] === "." ? et : w[1] === "?" ? tt : w[1] === "@" ? it : H }), r.removeAttribute(u);
        } else u.startsWith(x) && (a.push({ type: 6, index: n }), r.removeAttribute(u));
        if (Ie.test(r.tagName)) {
          const u = r.textContent.split(x), v = u.length - 1;
          if (v > 0) {
            r.textContent = O ? O.emptyScript : "";
            for (let f = 0; f < v; f++) r.append(u[f], M()), _.nextNode(), a.push({ type: 2, index: ++n });
            r.append(u[v], M());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ke) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(x, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += x.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = D.createElement("template");
    return i.innerHTML = e, i;
  }
}
function A(s, e, t = s, i) {
  if (e === C) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const n = U(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = A(s, r._$AS(s, e.values), r, i)), e;
}
class Qe {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? D).importNode(t, !0);
    _.currentNode = r;
    let n = _.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new L(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new st(n, this, e)), this._$AV.push(c), a = i[++l];
      }
      o !== a?.index && (n = _.nextNode(), o++);
    }
    return _.currentNode = D, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, i, r) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = A(this, e, t), U(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== C && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && U(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = R.createElement(Pe(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new Qe(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Ee.get(e.strings);
    return t === void 0 && Ee.set(e.strings, t = new R(e)), t;
  }
  k(e) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const n of e) r === t.length ? t.push(i = new L(this.O(M()), this.O(M()), this, this.options)) : i = t[r], i._$AI(n), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = $e(e).nextSibling;
      $e(e).remove(), e = i;
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
  constructor(e, t, i, r, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(e, t = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = A(this, e, t, 0), o = !U(e) || e !== this._$AH && e !== C, o && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = A(this, l[i + a], t, a), c === C && (c = this._$AH[a]), o ||= !U(c) || c !== this._$AH[a], c === g ? e = g : e !== g && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class et extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class tt extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class it extends H {
  constructor(e, t, i, r, n) {
    super(e, t, i, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = A(this, e, t, 0) ?? g) === C) return;
    const i = this._$AH, r = e === g && i !== g || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== g && (i === g || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class st {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    A(this, e);
  }
}
const rt = le.litHtmlPolyfillSupport;
rt?.(R, L), (le.litHtmlVersions ??= []).push("3.3.3");
const nt = (s, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    i._$litPart$ = r = new L(e.insertBefore(M(), n), n, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
const ue = globalThis;
class E extends S {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = nt(t, this.renderRoot, this.renderOptions);
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
E._$litElement$ = !0, E.finalized = !0, ue.litElementHydrateSupport?.({ LitElement: E });
const at = ue.litElementPolyfillSupport;
at?.({ LitElement: E });
(ue.litElementVersions ??= []).push("4.2.2");
class F extends E {
  _hass;
  config = {};
  static styles = T`
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
function Me(s, e) {
  customElements.get(s) || customElements.define(s, e);
}
async function m(s, e, t, i = {}) {
  return s.connection.sendMessagePromise({ type: e, vehicle_id: t, ...i });
}
const re = (s, e, t) => m(s, "camper_travel_journal/list", e, t ? { trip_id: t } : {}), Ue = (s, e, t, i) => m(s, "camper_travel_journal/transition_trip", e, { trip_id: t, status: i }), ot = (s, e, t, i = "", r = "", n = "") => m(s, "camper_travel_journal/create_trip", e, { title: t, start_date: i || void 0, end_date: r || void 0, destination: n }), ct = (s, e, t, i) => m(s, "camper_travel_journal/update_trip", e, { trip_id: t, ...i }), dt = (s, e, t) => m(s, "camper_travel_journal/delete_trip", e, { trip_id: t }), lt = (s, e, t, i) => m(s, "camper_travel_journal/unlink_drive", e, { trip_id: t, drive_id: i }), ht = (s, e, t, i) => m(s, "camper_travel_journal/link_drives", e, { trip_id: t, drive_ids: i }), ut = (s, e, t) => m(s, "camper_travel_journal/create_manual_drive", e, t), pt = (s, e, t, i) => m(s, "camper_travel_journal/update_manual_drive", e, { drive_id: t, ...i }), gt = (s, e, t) => m(s, "camper_travel_journal/delete_manual_drive", e, { drive_id: t }), mt = (s, e, t, i) => m(s, "camper_travel_journal/create_expense", e, { trip_id: t, ...i }), vt = (s, e, t, i) => m(s, "camper_travel_journal/update_expense", e, { expense_id: t, ...i }), $t = (s, e, t) => m(s, "camper_travel_journal/delete_expense", e, { expense_id: t }), ft = async (s) => (await s.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], yt = (s, e, t) => m(s, "camper_travel_journal/analyze_gpx", e, { content_base64: t }), xt = (s, e, t, i, r, n) => m(s, "camper_travel_journal/import_gpx", e, { content_base64: t, file_hash: i, drive_keys: r, trip_id: n }), Re = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], G = Re, bt = {
  title: "Reisetagebuch",
  noDestination: "Kein Reiseziel",
  loading: "Reisedaten werden geladen …",
  noTrip: "Noch keine Reise angelegt.",
  summaryTrip: "Reise",
  summaryChooseTrip: "Reise auswählen",
  loadError: "Reisedaten konnten nicht geladen werden.",
  statusError: "Reisestatus konnte nicht geändert werden.",
  distance: "Strecke",
  drives: "Fahrten",
  stops: "Zwischenstopps",
  costs: "Kosten",
  start: "Reise starten",
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
  driveEditError: "Manuelle Fahrt konnte nicht bearbeitet werden.",
  driveDeleteError: "Manuelle Fahrt konnte nicht gelöscht werden.",
  dateInvalid: "Bitte gültige Daten eingeben.",
  gpxImport: "GPX importieren",
  gpxPrivacy: "Die Datei wird lokal analysiert; erst die Bestätigung schreibt Daten.",
  gpxAnalyzeError: "GPX-Datei konnte nicht analysiert werden.",
  gpxImportError: "GPX-Import konnte nicht abgeschlossen werden.",
  gpxConfirm: "GPX-Fahrten importieren",
  gpxDuplicate: "Diese Datei wurde bereits importiert.",
  gpxSections: "Fahrtabschnitte",
  gpxPoints: "GPS-Punkte",
  gpxWarnings: "Hinweise",
  gpxVehicle: "Fahrzeug",
  gpxVehicleFixed: "durch diese Karte festgelegt",
  gpxTargetTrip: "Zielreise",
  gpxNoTrip: "Keine Reise – freie Fahrten",
  gpxSelectTrip: "Reise auswählen …",
  gpxSummary: "Zusammenfassung",
  gpxSelectedDrives: "ausgewählte Fahrten",
  gpxDistance: "Kilometer",
  gpxPeriod: "GPX-Zeitraum",
  gpxPeriodWarning: "Der GPX-Zeitraum liegt teilweise außerhalb des Reisezeitraums.",
  gpxGapBoundary: "Mögliche neue Fahrt nach längerer GPS-Lücke"
}, _t = {
  title: "Travel journal",
  noDestination: "No destination",
  loading: "Loading travel data …",
  noTrip: "No trip created yet.",
  summaryTrip: "Trip",
  summaryChooseTrip: "Select trip",
  loadError: "Travel data could not be loaded.",
  statusError: "Trip status could not be changed.",
  distance: "Distance",
  drives: "Drives",
  stops: "Stops",
  costs: "Costs",
  start: "Start trip",
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
  durationMinutes: "Duration",
  manualDrive: "Manual drive",
  createDrive: "Create drive",
  driveCreateError: "Drive could not be saved.",
  driveEditError: "Manual drive could not be edited.",
  driveDeleteError: "Drive could not be deleted.",
  dateInvalid: "Enter valid dates.",
  gpxImport: "Import GPX",
  gpxPrivacy: "The file is analyzed locally; data is written only after confirmation.",
  gpxAnalyzeError: "The GPX file could not be analyzed.",
  gpxImportError: "The GPX import could not be completed.",
  gpxConfirm: "Import GPX drives",
  gpxDuplicate: "This file was already imported.",
  gpxSections: "drive sections",
  gpxPoints: "GPS points",
  gpxWarnings: "Notes",
  gpxVehicle: "Camper",
  gpxVehicleFixed: "fixed by this card",
  gpxTargetTrip: "Target trip",
  gpxNoTrip: "No trip – unassigned drives",
  gpxSelectTrip: "Select trip …",
  gpxSummary: "Summary",
  gpxSelectedDrives: "selected drives",
  gpxDistance: "kilometers",
  gpxPeriod: "GPX period",
  gpxPeriodWarning: "The GPX period is partly outside the trip period.",
  gpxGapBoundary: "Possible new drive after a long GPS gap"
};
function h(s) {
  return (s?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? bt : _t;
}
function ne(s) {
  return (s?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function K(s, e) {
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (t) {
    const [, i, r, n] = t;
    return ne(e).startsWith("de") ? `${n}.${r}.${i}` : `${r}/${n}/${i}`;
  }
  return new Date(s).toLocaleDateString(ne(e));
}
function y(s, e) {
  return new Date(s).toLocaleString(ne(e), { dateStyle: "short", timeStyle: "short" });
}
function W(s, e) {
  const t = Math.max(0, Math.round((s ?? 0) / 60));
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
function B(s, e) {
  return s.start_date || s.end_date ? [s.start_date, s.end_date].filter(Boolean).map((t) => K(t, e)).join(" – ") || "" : s.started_at ? `${K(s.started_at, e)}${s.ended_at ? ` – ${K(s.ended_at, e)}` : ""}` : "";
}
function j(s, e) {
  return h(e).statuses[s] ?? s;
}
function X(s, e) {
  return h(e).categories[s] ?? s;
}
function Z(s) {
  return Re.includes(s);
}
function P(s, e, t) {
  const i = (t?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(i, { style: "currency", currency: e, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(s / 100);
}
function De(s) {
  const e = s.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(e)) return null;
  const [t, i = ""] = e.split("."), r = Number(t) * 100 + Number((i + "00").slice(0, 2));
  return Number.isSafeInteger(r) ? r : null;
}
const ae = "camper-travel-journal-expenses-changed", oe = "camper-travel-journal-data-changed";
function J(s) {
  window.dispatchEvent(new CustomEvent(ae, { detail: s }));
}
function $(s) {
  window.dispatchEvent(new CustomEvent(oe, { detail: s }));
}
class Le extends F {
  snapshot;
  trips = [];
  selectedTripId = "";
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (e) => {
    e.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(ae, this.onDataChanged), window.addEventListener(oe, this.onDataChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(ae, this.onDataChanged), window.removeEventListener(oe, this.onDataChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(e) {
    const t = (i, r) => (r.started_at || "").localeCompare(i.started_at || "") || r.id.localeCompare(i.id);
    return e.filter((i) => i.status === "active").sort(t)[0] ?? [...e].sort(t)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const e = await re(this.hass, this.vehicleId);
      this.trips = e.trips;
      const i = e.trips.find((n) => n.id === this.selectedTripId) ?? this.chooseDefaultTrip(e.trips);
      this.selectedTripId = i?.id ?? "";
      const r = i ? await re(this.hass, this.vehicleId, i.id) : e;
      return this.snapshot = i ? { ...r, trips: [i] } : r, this.loadError = "", !0;
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
        await Ue(this.hass, this.vehicleId, t.id, e), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = h(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(e) {
    !this.hass || this.loading || !this.trips.some((t) => t.id === e) || (this.selectedTripId = e, await this.refresh());
  }
  render() {
    const e = h(this.hass), t = this.snapshot?.trips[0], i = this.trips, r = (this.snapshot?.drives ?? []).reduce((c, p) => c + p.distance_m, 0) / 1e3, n = this.snapshot?.expense_summary, o = n?.mixed_currency ? e.mixedCurrency : n?.total_minor !== void 0 && n.currency ? P(n.total_minor, n.currency, this.hass) : P(0, "EUR", this.hass), l = this.loadError || this.actionError, a = t ? B(t, this.hass) : "";
    return d`<ha-card><h2>${t?.title ?? e.title}</h2>${i.length ? d`<label class="trip-selector">${e.summaryChooseTrip}<select aria-label=${e.summaryTrip} @change=${(c) => {
      this.selectTrip(c.currentTarget.value);
    }} ?disabled=${this.loading}>${i.map((c) => d`<option value=${c.id} ?selected=${c.id === this.selectedTripId}>${c.title} · ${j(c.status, this.hass)} · ${B(c, this.hass)}</option>`)}</select></label>` : ""}${l ? d`<p class="error" role="alert">${l}</p>` : t ? d`<p class="muted">${t.destination || e.noDestination} · ${j(t.status, this.hass)} · ${a}</p><div class="grid"><div class="metric"><span class="muted">${e.distance}</span><span class="value">${r.toFixed(1)} km</span></div><div class="metric"><span class="muted">${e.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${e.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${e.costs}</span><span class="value">${o}</span></div></div><div class="actions">${t.status === "planned" ? d`<button @click=${() => this.setStatus("active")}>${e.start}</button>` : t.status === "paused" ? d`<button @click=${() => this.setStatus("active")}>${e.resume}</button>` : ""}${t.status === "active" ? d`<button class="secondary" @click=${() => this.setStatus("paused")}>${e.pause}</button><button @click=${() => this.setStatus("completed")}>${e.complete}</button>` : ""}</div>` : d`<p class="muted">${e.noTrip}</p>`}${this.loading ? d`<p class="muted">${e.loading}</p>` : ""}</ha-card>`;
  }
}
Le.styles = [F.styles, T`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}`];
Me("camper-travel-journal-summary-card", Le);
class z extends F {
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
  category = G[0];
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
  editingDriveId = "";
  editingDriveOccurredAt = "";
  editingDriveStartLocation = "";
  editingDriveEndLocation = "";
  editingDriveDistanceKm = "";
  editingDriveDurationMinutes = "";
  driveSavingId = "";
  confirmingDriveId = "";
  gpxContent = "";
  gpxName = "";
  gpxPreview;
  gpxSelected = /* @__PURE__ */ new Set();
  gpxTripId = "";
  gpxBusy = !1;
  gpxError = "";
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
      return this.snapshot = await re(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = h(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(e) {
    this.actionError = e, this.requestUpdate();
  }
  async readGPX(e) {
    const t = e.currentTarget.files?.[0];
    if (!(!t || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = t.name;
      try {
        const i = new Uint8Array(await t.arrayBuffer());
        let r = "";
        i.forEach((n) => {
          r += String.fromCharCode(n);
        }), this.gpxContent = btoa(r), this.gpxPreview = await yt(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((n) => n.key)), this.gpxTripId = this.selected;
      } catch {
        this.gpxError = h(this.hass).gpxAnalyzeError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  async confirmGPX() {
    if (!(!this.hass || !this.gpxPreview || this.gpxBusy || this.gpxPreview.conflicts.duplicate_file)) {
      this.gpxBusy = !0, this.gpxError = "";
      try {
        const e = this.gpxTripId || void 0;
        await xt(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], e), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e ?? "" });
      } catch {
        this.gpxError = h(this.hass).gpxImportError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  setExpenseAmount(e) {
    this.amount = e, this.requestUpdate();
  }
  setEditingExpenseAmount(e) {
    this.editingAmount = e, this.requestUpdate();
  }
  setExpenseCategory(e) {
    if (!Z(e)) return this.fail(h(this.hass).categoryInvalid);
    this.category = e, this.requestUpdate();
  }
  setEditingExpenseCategory(e) {
    if (!Z(e)) return this.fail(h(this.hass).categoryInvalid);
    this.editingCategory = e, this.requestUpdate();
  }
  gpxPeriod() {
    const e = (this.gpxPreview?.points ?? []).map((t) => t.recorded_at).sort();
    return e.length ? { start: e[0], end: e[e.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((e) => this.gpxSelected.has(e.key)).reduce((e, t) => e + t.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(e) {
    const t = this.gpxPeriod();
    if (!t || !e || !e.start_date && !e.end_date) return !1;
    const i = t.start.slice(0, 10), r = t.end.slice(0, 10);
    return !!(e.start_date && i < e.start_date || e.end_date && r > e.end_date);
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(h(this.hass).dateInvalid);
      try {
        await ot(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: this.selected });
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
      await ct(this.hass, this.vehicleId, e.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e.id });
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
        await dt(this.hass, this.vehicleId, e), this.confirmingTripId = "", this.selected === e && (this.selected = ""), await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(e, t) {
    if (this.hass)
      try {
        await Ue(this.hass, this.vehicleId, e, t), this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).statusError);
      }
  }
  async assignDrive(e, t) {
    if (this.hass)
      try {
        await ht(this.hass, this.vehicleId, e, [t]), this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveAssignError);
      }
  }
  async unassignDrive(e, t) {
    if (this.hass)
      try {
        await lt(this.hass, this.vehicleId, e, t), this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(e) {
    this.selected = this.selected === e ? "" : e, this.selected ? this.refresh() : this.requestUpdate();
  }
  async addManualDrive(e) {
    if (!this.hass || this.manualSaving) return;
    const t = Number(this.manualDistanceKm.replace(",", ".")), i = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(t) || t < 0 || i !== void 0 && (!Number.isInteger(i) || i < 0)) return this.fail(h(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await ut(this.hass, this.vehicleId, { trip_id: e, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: t, ...i === void 0 ? {} : { duration_minutes: i } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
    } catch {
      this.fail(h(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(e) {
    const t = new Date(e), i = (r) => String(r).padStart(2, "0");
    return `${t.getFullYear()}-${i(t.getMonth() + 1)}-${i(t.getDate())}T${i(t.getHours())}:${i(t.getMinutes())}`;
  }
  startManualDriveEdit(e) {
    this.actionError = "", this.editingDriveId = e.id, this.editingDriveOccurredAt = this.localDateTime(e.started_at), this.editingDriveStartLocation = e.start_label || "", this.editingDriveEndLocation = e.end_label || "", this.editingDriveDistanceKm = (e.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = e.duration_seconds ? String(Math.round(e.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(e, t) {
    if (!this.hass || this.driveSavingId) return;
    const i = Number(this.editingDriveDistanceKm.replace(",", ".")), r = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(i) || i < 0 || r !== void 0 && (!Number.isInteger(r) || r < 0)) return this.fail(h(this.hass).dateInvalid);
    this.driveSavingId = e.id;
    try {
      await pt(this.hass, this.vehicleId, e.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: i, ...r === void 0 ? {} : { duration_minutes: r } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
    } catch {
      this.fail(h(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(e, t) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== t) {
        this.confirmingDriveId = t, this.requestUpdate();
        return;
      }
      this.driveSavingId = t;
      try {
        await gt(this.hass, this.vehicleId, t), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(e) {
    if (!this.hass) return;
    const t = h(this.hass), i = De(this.amount);
    if (i === null) return this.fail(t.amountInvalid);
    try {
      await mt(this.hass, this.vehicleId, e, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: i, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", J({ vehicleId: this.vehicleId, tripId: e }));
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
    const t = h(this.hass), i = De(this.editingAmount);
    if (i === null) return this.fail(t.amountInvalid);
    if (!Z(this.editingCategory)) return this.fail(t.categoryInvalid);
    this.expenseSavingId = e.id;
    try {
      await vt(this.hass, this.vehicleId, e.id, { amount_minor: i, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), J({ vehicleId: this.vehicleId, tripId: e.trip_id ?? this.selected }));
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
        await $t(this.hass, this.vehicleId, e), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && J({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(h(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(e) {
    const t = [...G];
    return e && !t.includes(e) && t.unshift(e), t;
  }
  renderExpense(e, t) {
    const i = this.editingExpenseId === e.id, r = this.expenseSavingId === e.id;
    return d`<div class="expense-row">${i ? d`<form class="expense-form" @submit=${(n) => {
      n.preventDefault(), this.saveExpense(e);
    }}><select aria-label=${t.category} .value=${this.editingCategory} @change=${(n) => this.setEditingExpenseCategory(n.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((n) => d`<option value=${n}>${X(n, this.hass)}</option>`)}</select><input aria-label=${t.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(n) => this.setEditingExpenseAmount(n.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${r}>${r ? t.saving : t.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${r}>${t.cancel}</button></div></form>` : d`<span>${X(e.category, this.hass)}: ${P(e.amount_minor, e.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(e)} ?disabled=${!!this.expenseSavingId}>${t.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(e.id)}>${this.confirmingExpenseId === e.id ? t.confirmDelete : t.remove}</button></span>`}</div>`;
  }
  renderDrive(e, t, i) {
    const r = e.source === "manual" ? i.sourceManual : i.sourceGps, n = e.source === "manual" ? `${e.start_label || "—"} → ${e.end_label || "—"}` : `${i.driveStart}: ${y(e.started_at, this.hass)} · ${i.driveEnd}: ${y(e.ended_at, this.hass)}`;
    if (this.editingDriveId === e.id) return d`<form class="form-grid drive-edit-form" @submit=${(a) => {
      a.preventDefault(), this.saveManualDrive(e, t);
    }}><label>${i.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(a) => this.editingDriveOccurredAt = a.currentTarget.value}></label><input aria-label=${i.startLocation} .value=${this.editingDriveStartLocation} @input=${(a) => this.editingDriveStartLocation = a.currentTarget.value}><input aria-label=${i.endLocation} .value=${this.editingDriveEndLocation} @input=${(a) => this.editingDriveEndLocation = a.currentTarget.value}><input aria-label=${i.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(a) => this.editingDriveDistanceKm = a.currentTarget.value}><input aria-label=${i.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(a) => this.editingDriveDurationMinutes = a.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === e.id}>${this.driveSavingId === e.id ? i.saving : i.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${i.cancel}</button></form>`;
    const o = e.trip_id === t ? d`<button type="button" class="link" @click=${() => this.unassignDrive(t, e.id)}>${i.unassign}</button>` : d`<button type="button" class="link" @click=${() => this.assignDrive(t, e.id)}>${i.assign}</button>`, l = e.source === "manual" ? d`<button type="button" class="link" @click=${() => this.startManualDriveEdit(e)} ?disabled=${!!this.driveSavingId}>${i.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(t, e.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === e.id ? i.confirmDelete : i.remove}</button>` : "";
    return d`<div class="drive-row"><div><strong>${r}</strong> · ${n}<br><span class="muted">${(e.distance_m / 1e3).toFixed(1)} km · ${W(e.duration_seconds, this.hass)} · ${e.assignment_status === "assigned" ? i.assignedDrives : i.freeDrives}</span></div><span class="actions">${l}${o}</span></div>`;
  }
  renderGpx(e, t, i) {
    const r = t.find((l) => l.id === this.gpxTripId), n = this.gpxPeriod(), o = this.gpxTripPeriodWarning(r);
    return d`<ha-card><section class="gpx-import gpx-explicit"><h2>${e.gpxImport}</h2><p class="muted"><strong>${e.gpxVehicle}:</strong> ${this.vehicleId} (${e.gpxVehicleFixed})</p><label>${e.gpxTargetTrip}<select aria-label=${e.gpxTargetTrip} .value=${this.gpxTripId} @change=${(l) => {
      this.gpxTripId = l.currentTarget.value, this.requestUpdate();
    }}><option value="">${e.gpxNoTrip}</option>${t.map((l) => d`<option value=${l.id}>${l.title} · ${j(l.status, this.hass)} · ${B(l, this.hass) || e.period}</option>`)}</select></label><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(l) => this.readGPX(l)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || e.gpxPrivacy}</p>${this.gpxError ? d`<p class="error" role="alert">${this.gpxError}</p>` : ""}${i ? d`<div class="gpx-preview"><strong>${i.drives.length} ${e.gpxSections}, ${i.points.length} ${e.gpxPoints}</strong>${n ? d`<p class="muted">${e.gpxPeriod}: ${y(n.start, this.hass)} – ${y(n.end, this.hass)}</p>` : ""}${o ? d`<p class="warning" role="alert">${e.gpxPeriodWarning}</p>` : ""}<h3>${e.gpxSummary}</h3><p class="muted">${i.points.length} ${e.gpxPoints}, ${this.gpxSelected.size} ${e.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${e.gpxDistance}, ${r?.title || e.gpxNoTrip}</p><div class="gpx-drive-list">${i.drives.map((l) => d`<label><input type="checkbox" .checked=${this.gpxSelected.has(l.key)} @change=${(a) => {
      a.currentTarget.checked ? this.gpxSelected.add(l.key) : this.gpxSelected.delete(l.key), this.requestUpdate();
    }}> ${y(l.started_at, this.hass)} – ${y(l.ended_at, this.hass)} · ${(l.distance_m / 1e3).toFixed(1)} km · ${W(l.duration_seconds, this.hass)}</label>`)}</div>${i.warnings.length ? d`<p class="muted">${e.gpxWarnings}: ${i.warnings.map((l) => l === "gpx_gap_possible_drive_boundary" ? e.gpxGapBoundary : l).join(", ")}</p>` : ""}${i.conflicts.duplicate_file ? d`<p class="error" role="alert">${e.gpxDuplicate}</p>` : d`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? e.saving : e.gpxConfirm}</button>`}</div>` : ""}</section></ha-card>`;
  }
  render() {
    const e = h(this.hass), t = this.snapshot?.trips ?? [];
    return d`${this.renderGpx(e, t, this.gpxPreview)}${this.renderLegacy()}`;
  }
  renderLegacy() {
    const e = h(this.hass), t = this.snapshot?.trips ?? [], i = this.snapshot?.expenses ?? [], r = this.snapshot?.expense_summary, n = r?.mixed_currency ? e.mixedCurrency : r?.total_minor !== void 0 && r.currency ? P(r.total_minor, r.currency, this.hass) : P(0, "EUR", this.hass), o = this.loadError || this.actionError, l = this.gpxPreview;
    return d`<ha-card><h2>${e.manager}</h2>${o ? d`<p class="error" role="alert">${o}</p>` : ""}<section class="gpx-import"><h3>${e.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(a) => this.readGPX(a)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || e.gpxPrivacy}</p>${this.gpxError ? d`<p class="error" role="alert">${this.gpxError}</p>` : ""}${l ? d`<div class="gpx-preview"><strong>${l.drives.length} ${e.gpxSections}, ${l.points.length} ${e.gpxPoints}</strong><ul>${l.drives.map((a) => d`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(a.key)} @change=${(c) => {
      c.currentTarget.checked ? this.gpxSelected.add(a.key) : this.gpxSelected.delete(a.key), this.requestUpdate();
    }}> ${y(a.started_at, this.hass)} – ${y(a.ended_at, this.hass)} · ${(a.distance_m / 1e3).toFixed(1)} km · ${W(a.duration_seconds, this.hass)}</label></li>`)}</ul>${l.warnings.length ? d`<p class="muted">${e.gpxWarnings}: ${l.warnings.join(", ")}</p>` : ""}${l.conflicts.duplicate_file ? d`<p class="error" role="alert">${e.gpxDuplicate}</p>` : d`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? e.saving : e.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${e.newTrip}</h3><div class="form-grid"><input aria-label=${e.tripName} placeholder=${e.tripName} .value=${this.tripTitle} @input=${(a) => this.tripTitle = a.target.value}><input aria-label=${e.destination} placeholder=${e.destination} .value=${this.destination} @input=${(a) => this.destination = a.target.value}><label>${e.startDate}<input type="date" .value=${this.tripStartDate} @input=${(a) => this.tripStartDate = a.currentTarget.value}></label><label>${e.endDate}<input type="date" .value=${this.tripEndDate} @input=${(a) => this.tripEndDate = a.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${e.create}</button></div></section><section><h3>${e.trips}</h3>${t.length ? t.map((a) => d`<article class="trip"><div class="row"><strong>${a.title}</strong><span class="muted">${a.destination || ""} · ${j(a.status, this.hass)} · ${B(a, this.hass) || e.period}</span></div>${this.editingTripId === a.id ? d`<form class="form-grid" @submit=${(c) => {
      c.preventDefault(), this.saveTrip(a);
    }}><input aria-label=${e.tripName} .value=${this.editingTripTitle} @input=${(c) => this.editingTripTitle = c.currentTarget.value}><input aria-label=${e.destination} .value=${this.editingDestination} @input=${(c) => this.editingDestination = c.currentTarget.value}><label>${e.startDate}<input type="date" .value=${this.editingStartDate} @input=${(c) => this.editingStartDate = c.currentTarget.value}></label><label>${e.endDate}<input type="date" .value=${this.editingEndDate} @input=${(c) => this.editingEndDate = c.currentTarget.value}></label><button type="submit">${e.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${e.cancel}</button></form>` : d`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(a)}>${e.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(a.id)}>${this.confirmingTripId === a.id ? e.confirmDelete : e.remove}</button>${a.status === "planned" || a.status === "paused" ? d`<button type="button" @click=${() => this.changeStatus(a.id, "active")}>${e.resume}</button>` : ""}${a.status === "active" ? d`<button type="button" class="secondary" @click=${() => this.changeStatus(a.id, "paused")}>${e.pause}</button><button type="button" @click=${() => this.changeStatus(a.id, "completed")}>${e.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(a.id)}>${this.selected === a.id ? e.close : e.details}</button></div>`}${this.selected === a.id ? d`<div class="details"><h4>${e.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((c) => this.renderDrive(c, a.id, e)) : d`<p class="muted">${e.noDrives}</p>`}<h4>${e.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((c) => this.renderDrive(c, a.id, e)) : d`<p class="muted">${e.noDrives}</p>`}<h4>${e.manualDrive}</h4><div class="form-grid"><label>${e.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(c) => this.manualOccurredAt = c.currentTarget.value}></label><input aria-label=${e.startLocation} placeholder=${e.startLocation} .value=${this.manualStartLocation} @input=${(c) => this.manualStartLocation = c.currentTarget.value}><input aria-label=${e.endLocation} placeholder=${e.endLocation} .value=${this.manualEndLocation} @input=${(c) => this.manualEndLocation = c.currentTarget.value}><input aria-label=${e.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${e.distanceKm} .value=${this.manualDistanceKm} @input=${(c) => this.manualDistanceKm = c.currentTarget.value}><input aria-label=${e.durationMinutes} type="number" min="0" step="1" placeholder=${e.durationMinutes} .value=${this.manualDurationMinutes} @input=${(c) => this.manualDurationMinutes = c.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(a.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? e.saving : e.createDrive}</button></div><h4>${e.expenses}</h4><div class="expense-form create-form"><input aria-label=${e.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(c) => this.setExpenseAmount(c.currentTarget.value)}><select aria-label=${e.category} .value=${this.category} @change=${(c) => this.setExpenseCategory(c.currentTarget.value)}>${G.map((c) => d`<option value=${c}>${X(c, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(a.id)}>${e.save}</button></div>${i.map((c) => this.renderExpense(c, e))}<p class="total"><strong>${e.total}: ${n}</strong></p></div>` : ""}</article>`) : d`<p class="muted">${e.noTrip}</p>`}</section></ha-card>`;
  }
}
z.styles = [F.styles, T`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
z.styles = [...z.styles, T`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}`];
Me("camper-travel-journal-manager-card", z);
const Et = 1e4;
function Y() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Q(s) {
  return s.length <= 8 ? "••••" : `${s.slice(0, 4)}…${s.slice(-4)}`;
}
function we(s) {
  return s?.connection ? s.connection.connected === !0 ? "available" : s.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function Dt(s) {
  const e = s, t = typeof e?.code == "string" ? e.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", i = typeof e?.message == "string" ? e.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: t, errorMessage: i };
}
function wt(s, e) {
  return new Promise((t, i) => {
    const r = setTimeout(() => i(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), e);
    s.then((n) => {
      clearTimeout(r), t(n);
    }, (n) => {
      clearTimeout(r), i(n);
    });
  });
}
async function ee(s, e, t, i) {
  const r = Y();
  try {
    const n = await wt(s.connection.sendMessagePromise(e), i);
    return { ...t(n), durationMs: Math.round(Y() - r), value: n };
  } catch (n) {
    return { state: "failed", durationMs: Math.round(Y() - r), ...Dt(n) };
  }
}
function St(s) {
  return s && typeof s == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function Ct(s) {
  const e = s?.vehicles;
  return Array.isArray(e) && e.every((t) => t && typeof t == "object" && typeof t.vehicle_id == "string") ? { state: "success", structure: "ok", count: e.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function At(s) {
  const e = s;
  return Array.isArray(e?.trips) && Array.isArray(e?.drives) && Array.isArray(e?.stops) ? { state: "success", structure: "ok", count: e.trips.length, drivesCount: e.drives.length, stopsCount: e.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function Tt(s, e, t = Et) {
  const i = { state: "not_run", durationMs: null };
  if (!s?.connection) return { version: "0.1.0", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: i, vehicles: i, trips: i, vehicleId: Q(e) };
  const r = we(s), n = await ee(s, { type: "auth/current_user" }, St, t), o = await ee(s, { type: "camper_travel_journal/list_vehicles" }, Ct, t), l = o.value?.vehicles?.filter((Oe) => typeof Oe.vehicle_id == "string") ?? [], a = l.length === 1 ? l[0].vehicle_id : void 0, p = await ee(s, { type: "camper_travel_journal/list", vehicle_id: a ?? e }, At, t), { value: u, ...v } = n, { value: f, ...w } = o, { value: Rt, ...Ne } = p;
  return {
    version: "0.1.0",
    connectionBefore: r,
    connectionAfter: we(s),
    authentication: v,
    vehicles: w,
    trips: Ne,
    vehicleId: Q(e),
    ...a ? { resolvedVehicleId: Q(a) } : {}
  };
}
function te(s) {
  return JSON.stringify(s, null, 2);
}
function ie(s) {
  return s.state === "success" ? "erfolgreich" : s.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const Se = "01M4XW0KD3GQ0KASAYHQ29840P";
class kt extends E {
  static styles = T`
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
  config = { vehicle_id: Se };
  set hass(e) {
    this._hass = e, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(e) {
    this.config = { vehicle_id: e.vehicle_id || Se };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await Tt(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const e = te(this.report);
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
    return d`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? d`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? d`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${e ? d`<dl>
        <dt>Version</dt><dd>${e.version}</dd>
        <dt>Verbindung vorher</dt><dd>${e.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${e.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${ie(e.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${ie(e.vehicles)}${e.vehicles.durationMs === null ? "" : ` (${e.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${ie(e.trips)}${e.trips.durationMs === null ? "" : ` (${e.trips.durationMs} ms)`}${e.trips.state === "success" ? ` · ${e.trips.count ?? 0} Reisen / ${e.trips.drivesCount ?? 0} Fahrten / ${e.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${e.vehicles.structure === "ok" && e.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${te(e)}</pre>${this.manualCopy ? d`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${te(e)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${e ? "Diagnose wiederholen" : "Diagnose starten"}</button>${e ? d`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? d`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", kt);
function It(s, e) {
  return s.vehicle_id || e.length !== 1 ? s : { ...s, vehicle_id: e[0].vehicle_id };
}
function Pt(s, e) {
  return s.type === e.type && s.vehicle_id === e.vehicle_id;
}
class Mt extends E {
  static styles = T`
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
    Pt(this._config, e) || (this._config = { ...e }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const e = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await ft(e), this.loadedConnection = e.connection;
        const t = It(this._config, this.vehicles);
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
    return d`
      <div class="field">
        <label for="vehicle">${e.editorVehicle}</label>
        ${this.loading ? d`<span class="muted">${e.editorLoading}</span>` : d`
          <select id="vehicle" aria-label=${e.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${e.editorChooseVehicle}</option>
            ${this.vehicles.map((t) => d`<option value=${t.vehicle_id} ?selected=${t.vehicle_id === this._config.vehicle_id}>${t.name || t.title}</option>`)}
          </select>
        `}
        ${this.error ? d`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? d`<span class="error" role="alert">${e.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Mt);
const Ut = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const s of Ut) window.customCards.some((e) => e.type === s.type) || window.customCards.push(s);
