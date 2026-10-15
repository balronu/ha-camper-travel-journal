const R = globalThis, se = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, re = /* @__PURE__ */ Symbol(), le = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (se && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = le.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && le.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Oe = (s) => new De(typeof s == "string" ? s : s + "", void 0, re), O = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new De(t, s, re);
}, je = (s, e) => {
  if (se) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = t.cssText, s.appendChild(i);
  }
}, de = se ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Oe(t);
})(s) : s;
const { is: ze, defineProperty: Be, getOwnPropertyDescriptor: He, getOwnPropertyNames: qe, getOwnPropertySymbols: Ve, getPrototypeOf: Fe } = Object, j = globalThis, he = j.trustedTypes, Ke = he ? he.emptyScript : "", Ge = j.reactiveElementPolyfillSupport, k = (s, e) => s, Y = { toAttribute(s, e) {
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
} }, we = (s, e) => !ze(s, e), ue = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: we };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ue) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(e, i, t);
      r !== void 0 && Be(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: r, set: n } = He(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: r, set(o) {
      const d = r?.call(this);
      n?.call(this, o), this.requestUpdate(e, d, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const e = Fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const t = this.properties, i = [...qe(t), ...Ve(t)];
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
      for (const r of i) t.unshift(de(r));
    } else e !== void 0 && t.push(de(e));
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
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : Y).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Y;
      this._$Em = r;
      const d = o.fromAttribute(t, n.type);
      this[r] = d ?? this._$Ej?.get(r) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, r = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[e]), i ??= o.getPropertyOptions(e), !((i.hasChanged ?? we)(n, t) || i.useDefault && i.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, i)))) return;
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
        const { wrapped: o } = n, d = this[r];
        o !== !0 || this._$AL.has(r) || d === void 0 || this.C(r, void 0, n, d);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[k("elementProperties")] = /* @__PURE__ */ new Map(), w[k("finalized")] = /* @__PURE__ */ new Map(), Ge?.({ ReactiveElement: w }), (j.reactiveElementVersions ??= []).push("2.1.2");
const ne = globalThis, pe = (s) => s, N = ne.trustedTypes, ge = N ? N.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Se = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + y, We = `<${Ae}>`, x = document, I = () => x.createComment(""), M = (s) => s === null || typeof s != "object" && typeof s != "function", ae = Array.isArray, Xe = (s) => ae(s) || typeof s?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, ve = />/g, _ = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), fe = /'/g, $e = /"/g, Ce = /^(?:script|style|textarea|title)$/i, Ze = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), l = Ze(1), S = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function ke(s, e) {
  if (!ae(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ge !== void 0 ? ge.createHTML(e) : e;
}
const Je = (s, e) => {
  const t = s.length - 1, i = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = C;
  for (let d = 0; d < t; d++) {
    const a = s[d];
    let c, p, u = -1, v = 0;
    for (; v < a.length && (o.lastIndex = v, p = o.exec(a), p !== null); ) v = o.lastIndex, o === C ? p[1] === "!--" ? o = me : p[1] !== void 0 ? o = ve : p[2] !== void 0 ? (Ce.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = _) : p[3] !== void 0 && (o = _) : o === _ ? p[0] === ">" ? (o = r ?? C, u = -1) : p[1] === void 0 ? u = -2 : (u = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? _ : p[3] === '"' ? $e : fe) : o === $e || o === fe ? o = _ : o === me || o === ve ? o = C : (o = _, r = void 0);
    const $ = o === _ && s[d + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + We : u >= 0 ? (i.push(c), a.slice(0, u) + Se + a.slice(u) + y + $) : a + y + (u === -2 ? d : $);
  }
  return [ke(s, n + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class P {
  constructor({ strings: e, _$litType$: t }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const d = e.length - 1, a = this.parts, [c, p] = Je(e, t);
    if (this.el = P.createElement(c, i), b.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = b.nextNode()) !== null && a.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Se)) {
          const v = p[o++], $ = r.getAttribute(u).split(y), D = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: n, name: D[2], strings: $, ctor: D[1] === "." ? Qe : D[1] === "?" ? et : D[1] === "@" ? tt : z }), r.removeAttribute(u);
        } else u.startsWith(y) && (a.push({ type: 6, index: n }), r.removeAttribute(u));
        if (Ce.test(r.tagName)) {
          const u = r.textContent.split(y), v = u.length - 1;
          if (v > 0) {
            r.textContent = N ? N.emptyScript : "";
            for (let $ = 0; $ < v; $++) r.append(u[$], I()), b.nextNode(), a.push({ type: 2, index: ++n });
            r.append(u[v], I());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ae) a.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(y, u + 1)) !== -1; ) a.push({ type: 7, index: n }), u += y.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const i = x.createElement("template");
    return i.innerHTML = e, i;
  }
}
function A(s, e, t = s, i) {
  if (e === S) return e;
  let r = i !== void 0 ? t._$Co?.[i] : t._$Cl;
  const n = M(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, t, i)), i !== void 0 ? (t._$Co ??= [])[i] = r : t._$Cl = r), r !== void 0 && (e = A(s, r._$AS(s, e.values), r, i)), e;
}
class Ye {
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
    const { el: { content: t }, parts: i } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
    b.currentNode = r;
    let n = b.nextNode(), o = 0, d = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new U(n, n.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, e) : a.type === 6 && (c = new it(n, this, e)), this._$AV.push(c), a = i[++d];
      }
      o !== a?.index && (n = b.nextNode(), o++);
    }
    return b.currentNode = x, r;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class U {
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
    e = A(this, e, t), M(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== S && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Xe(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && M(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = P.createElement(ke(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(t);
    else {
      const n = new Ye(r, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = ye.get(e.strings);
    return t === void 0 && ye.set(e.strings, t = new P(e)), t;
  }
  k(e) {
    ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, r = 0;
    for (const n of e) r === t.length ? t.push(i = new U(this.O(I()), this.O(I()), this, this.options)) : i = t[r], i._$AI(n), r++;
    r < t.length && (this._$AR(i && i._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const i = pe(e).nextSibling;
      pe(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class z {
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
    if (n === void 0) e = A(this, e, t, 0), o = !M(e) || e !== this._$AH && e !== S, o && (this._$AH = e);
    else {
      const d = e;
      let a, c;
      for (e = n[0], a = 0; a < n.length - 1; a++) c = A(this, d[i + a], t, a), c === S && (c = this._$AH[a]), o ||= !M(c) || c !== this._$AH[a], c === g ? e = g : e !== g && (e += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !r && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qe extends z {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class et extends z {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class tt extends z {
  constructor(e, t, i, r, n) {
    super(e, t, i, r, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = A(this, e, t, 0) ?? g) === S) return;
    const i = this._$AH, r = e === g && i !== g || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, n = e !== g && (i === g || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class it {
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
const st = ne.litHtmlPolyfillSupport;
st?.(P, U), (ne.litHtmlVersions ??= []).push("3.3.3");
const rt = (s, e, t) => {
  const i = t?.renderBefore ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = t?.renderBefore ?? null;
    i._$litPart$ = r = new U(e.insertBefore(I(), n), n, void 0, t ?? {});
  }
  return r._$AI(s), r;
};
const oe = globalThis;
class E extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return S;
  }
}
E._$litElement$ = !0, E.finalized = !0, oe.litElementHydrateSupport?.({ LitElement: E });
const nt = oe.litElementPolyfillSupport;
nt?.({ LitElement: E });
(oe.litElementVersions ??= []).push("4.2.2");
class ce extends E {
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
function Te(s, e) {
  customElements.get(s) || customElements.define(s, e);
}
async function m(s, e, t, i = {}) {
  return s.connection.sendMessagePromise({ type: e, vehicle_id: t, ...i });
}
const Q = (s, e, t) => m(s, "camper_travel_journal/list", e, t ? { trip_id: t } : {}), Ie = (s, e, t, i) => m(s, "camper_travel_journal/transition_trip", e, { trip_id: t, status: i }), at = (s, e, t, i = "", r = "", n = "") => m(s, "camper_travel_journal/create_trip", e, { title: t, start_date: i || void 0, end_date: r || void 0, destination: n }), ot = (s, e, t, i) => m(s, "camper_travel_journal/update_trip", e, { trip_id: t, ...i }), ct = (s, e, t) => m(s, "camper_travel_journal/delete_trip", e, { trip_id: t }), lt = (s, e, t, i) => m(s, "camper_travel_journal/unlink_drive", e, { trip_id: t, drive_id: i }), dt = (s, e, t, i) => m(s, "camper_travel_journal/link_drives", e, { trip_id: t, drive_ids: i }), ht = (s, e, t) => m(s, "camper_travel_journal/create_manual_drive", e, t), ut = (s, e, t, i) => m(s, "camper_travel_journal/update_manual_drive", e, { drive_id: t, ...i }), pt = (s, e, t) => m(s, "camper_travel_journal/delete_manual_drive", e, { drive_id: t }), gt = (s, e, t, i) => m(s, "camper_travel_journal/create_expense", e, { trip_id: t, ...i }), mt = (s, e, t, i) => m(s, "camper_travel_journal/update_expense", e, { expense_id: t, ...i }), vt = (s, e, t) => m(s, "camper_travel_journal/delete_expense", e, { expense_id: t }), ft = async (s) => (await s.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], $t = (s, e, t) => m(s, "camper_travel_journal/analyze_gpx", e, { content_base64: t }), yt = (s, e, t, i, r, n) => m(s, "camper_travel_journal/import_gpx", e, { content_base64: t, file_hash: i, drive_keys: r, trip_id: n }), Me = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], H = Me, _t = {
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
  gpxWarnings: "Hinweise"
}, bt = {
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
  driveEditError: "Manual drive could not be edited.",
  driveDeleteError: "Manual drive could not be deleted.",
  dateInvalid: "Enter valid dates.",
  gpxImport: "Import GPX",
  gpxPrivacy: "The file is analyzed locally; data is written only after confirmation.",
  gpxAnalyzeError: "The GPX file could not be analyzed.",
  gpxImportError: "The GPX import could not be completed.",
  gpxConfirm: "Import GPX drives",
  gpxDuplicate: "This file was already imported.",
  gpxSections: "drive sections",
  gpxPoints: "GPS points",
  gpxWarnings: "Notes"
};
function h(s) {
  return (s?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? _t : bt;
}
function ee(s) {
  return (s?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function q(s, e) {
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (t) {
    const [, i, r, n] = t;
    return ee(e).startsWith("de") ? `${n}.${r}.${i}` : `${r}/${n}/${i}`;
  }
  return new Date(s).toLocaleDateString(ee(e));
}
function L(s, e) {
  return new Date(s).toLocaleString(ee(e), { dateStyle: "short", timeStyle: "short" });
}
function _e(s, e) {
  const t = Math.max(0, Math.round((s ?? 0) / 60));
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
function Pe(s, e) {
  return s.start_date || s.end_date ? [s.start_date, s.end_date].filter(Boolean).map((t) => q(t, e)).join(" – ") || "" : s.started_at ? `${q(s.started_at, e)}${s.ended_at ? ` – ${q(s.ended_at, e)}` : ""}` : "";
}
function Ue(s, e) {
  return h(e).statuses[s] ?? s;
}
function V(s, e) {
  return h(e).categories[s] ?? s;
}
function F(s) {
  return Me.includes(s);
}
function T(s, e, t) {
  const i = (t?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(i, { style: "currency", currency: e, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(s / 100);
}
function be(s) {
  const e = s.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(e)) return null;
  const [t, i = ""] = e.split("."), r = Number(t) * 100 + Number((i + "00").slice(0, 2));
  return Number.isSafeInteger(r) ? r : null;
}
const te = "camper-travel-journal-expenses-changed", ie = "camper-travel-journal-data-changed";
function K(s) {
  window.dispatchEvent(new CustomEvent(te, { detail: s }));
}
function f(s) {
  window.dispatchEvent(new CustomEvent(ie, { detail: s }));
}
class Et extends ce {
  snapshot;
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (e) => {
    e.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(te, this.onDataChanged), window.addEventListener(ie, this.onDataChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(te, this.onDataChanged), window.removeEventListener(ie, this.onDataChanged), super.disconnectedCallback();
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
        await Ie(this.hass, this.vehicleId, t.id, e), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = h(this.hass).statusError, this.requestUpdate();
      }
  }
  render() {
    const e = h(this.hass), t = this.snapshot?.trips[0], i = (this.snapshot?.drives ?? []).reduce((a, c) => a + c.distance_m, 0) / 1e3, r = this.snapshot?.expense_summary, n = r?.mixed_currency ? e.mixedCurrency : r?.total_minor !== void 0 && r.currency ? T(r.total_minor, r.currency, this.hass) : T(0, "EUR", this.hass), o = this.loadError || this.actionError, d = t ? Pe(t, this.hass) : "";
    return l`<ha-card><h2>${t?.title ?? e.title}</h2>${o ? l`<p class="error" role="alert">${o}</p>` : t ? l`<p class="muted">${t.destination || e.noDestination} · ${Ue(t.status, this.hass)} · ${d}</p><div class="grid"><div class="metric"><span class="muted">${e.distance}</span><span class="value">${i.toFixed(1)} km</span></div><div class="metric"><span class="muted">${e.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${e.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${e.costs}</span><span class="value">${n}</span></div></div><div class="actions">${t.status === "planned" || t.status === "paused" ? l`<button @click=${() => this.setStatus("active")}>${e.resume}</button>` : ""}${t.status === "active" ? l`<button class="secondary" @click=${() => this.setStatus("paused")}>${e.pause}</button><button @click=${() => this.setStatus("completed")}>${e.complete}</button>` : ""}</div>` : l`<p class="muted">${e.noTrip}</p>`}${this.loading ? l`<p class="muted">${e.loading}</p>` : ""}</ha-card>`;
  }
}
Te("camper-travel-journal-summary-card", Et);
class Le extends ce {
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
  category = H[0];
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
      return this.snapshot = await Q(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate(), !0;
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
        }), this.gpxContent = btoa(r), this.gpxPreview = await $t(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((n) => n.key));
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
        await yt(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], this.selected || void 0), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.actionError = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: this.selected });
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
    if (!F(e)) return this.fail(h(this.hass).categoryInvalid);
    this.category = e, this.requestUpdate();
  }
  setEditingExpenseCategory(e) {
    if (!F(e)) return this.fail(h(this.hass).categoryInvalid);
    this.editingCategory = e, this.requestUpdate();
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(h(this.hass).dateInvalid);
      try {
        await at(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: this.selected });
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
      await ot(this.hass, this.vehicleId, e.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e.id });
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
        await ct(this.hass, this.vehicleId, e), this.confirmingTripId = "", this.selected === e && (this.selected = ""), await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(e, t) {
    if (this.hass)
      try {
        await Ie(this.hass, this.vehicleId, e, t), this.actionError = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).statusError);
      }
  }
  async assignDrive(e, t) {
    if (this.hass)
      try {
        await dt(this.hass, this.vehicleId, e, [t]), this.actionError = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveAssignError);
      }
  }
  async unassignDrive(e, t) {
    if (this.hass)
      try {
        await lt(this.hass, this.vehicleId, e, t), this.actionError = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e });
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
      await ht(this.hass, this.vehicleId, { trip_id: e, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: t, ...i === void 0 ? {} : { duration_minutes: i } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e });
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
      await ut(this.hass, this.vehicleId, e.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: i, ...r === void 0 ? {} : { duration_minutes: r } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), f({ vehicleId: this.vehicleId, tripId: t });
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
        await pt(this.hass, this.vehicleId, t), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), f({ vehicleId: this.vehicleId, tripId: e });
      } catch {
        this.fail(h(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(e) {
    if (!this.hass) return;
    const t = h(this.hass), i = be(this.amount);
    if (i === null) return this.fail(t.amountInvalid);
    try {
      await gt(this.hass, this.vehicleId, e, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: i, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", K({ vehicleId: this.vehicleId, tripId: e }));
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
    const t = h(this.hass), i = be(this.editingAmount);
    if (i === null) return this.fail(t.amountInvalid);
    if (!F(this.editingCategory)) return this.fail(t.categoryInvalid);
    this.expenseSavingId = e.id;
    try {
      await mt(this.hass, this.vehicleId, e.id, { amount_minor: i, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), K({ vehicleId: this.vehicleId, tripId: e.trip_id ?? this.selected }));
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
        await vt(this.hass, this.vehicleId, e), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && K({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(h(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(e) {
    const t = [...H];
    return e && !t.includes(e) && t.unshift(e), t;
  }
  renderExpense(e, t) {
    const i = this.editingExpenseId === e.id, r = this.expenseSavingId === e.id;
    return l`<div class="expense-row">${i ? l`<form class="expense-form" @submit=${(n) => {
      n.preventDefault(), this.saveExpense(e);
    }}><select aria-label=${t.category} .value=${this.editingCategory} @change=${(n) => this.setEditingExpenseCategory(n.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((n) => l`<option value=${n}>${V(n, this.hass)}</option>`)}</select><input aria-label=${t.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(n) => this.setEditingExpenseAmount(n.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${r}>${r ? t.saving : t.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${r}>${t.cancel}</button></div></form>` : l`<span>${V(e.category, this.hass)}: ${T(e.amount_minor, e.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(e)} ?disabled=${!!this.expenseSavingId}>${t.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(e.id)}>${this.confirmingExpenseId === e.id ? t.confirmDelete : t.remove}</button></span>`}</div>`;
  }
  renderDrive(e, t, i) {
    const r = e.source === "manual" ? i.sourceManual : i.sourceGps, n = e.source === "manual" ? `${e.start_label || "—"} → ${e.end_label || "—"}` : `${i.driveStart}: ${L(e.started_at, this.hass)} · ${i.driveEnd}: ${L(e.ended_at, this.hass)}`;
    if (this.editingDriveId === e.id) return l`<form class="form-grid drive-edit-form" @submit=${(a) => {
      a.preventDefault(), this.saveManualDrive(e, t);
    }}><label>${i.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(a) => this.editingDriveOccurredAt = a.currentTarget.value}></label><input aria-label=${i.startLocation} .value=${this.editingDriveStartLocation} @input=${(a) => this.editingDriveStartLocation = a.currentTarget.value}><input aria-label=${i.endLocation} .value=${this.editingDriveEndLocation} @input=${(a) => this.editingDriveEndLocation = a.currentTarget.value}><input aria-label=${i.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(a) => this.editingDriveDistanceKm = a.currentTarget.value}><input aria-label=${i.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(a) => this.editingDriveDurationMinutes = a.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === e.id}>${this.driveSavingId === e.id ? i.saving : i.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${i.cancel}</button></form>`;
    const o = e.trip_id === t ? l`<button type="button" class="link" @click=${() => this.unassignDrive(t, e.id)}>${i.unassign}</button>` : l`<button type="button" class="link" @click=${() => this.assignDrive(t, e.id)}>${i.assign}</button>`, d = e.source === "manual" ? l`<button type="button" class="link" @click=${() => this.startManualDriveEdit(e)} ?disabled=${!!this.driveSavingId}>${i.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(t, e.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === e.id ? i.confirmDelete : i.remove}</button>` : "";
    return l`<div class="drive-row"><div><strong>${r}</strong> · ${n}<br><span class="muted">${(e.distance_m / 1e3).toFixed(1)} km · ${_e(e.duration_seconds, this.hass)} · ${e.assignment_status === "assigned" ? i.assignedDrives : i.freeDrives}</span></div><span class="actions">${d}${o}</span></div>`;
  }
  render() {
    const e = h(this.hass), t = this.snapshot?.trips ?? [], i = this.snapshot?.expenses ?? [], r = this.snapshot?.expense_summary, n = r?.mixed_currency ? e.mixedCurrency : r?.total_minor !== void 0 && r.currency ? T(r.total_minor, r.currency, this.hass) : T(0, "EUR", this.hass), o = this.loadError || this.actionError, d = this.gpxPreview;
    return l`<ha-card><h2>${e.manager}</h2>${o ? l`<p class="error" role="alert">${o}</p>` : ""}<section class="gpx-import"><h3>${e.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(a) => this.readGPX(a)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || e.gpxPrivacy}</p>${this.gpxError ? l`<p class="error" role="alert">${this.gpxError}</p>` : ""}${d ? l`<div class="gpx-preview"><strong>${d.drives.length} ${e.gpxSections}, ${d.points.length} ${e.gpxPoints}</strong><ul>${d.drives.map((a) => l`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(a.key)} @change=${(c) => {
      c.currentTarget.checked ? this.gpxSelected.add(a.key) : this.gpxSelected.delete(a.key), this.requestUpdate();
    }}> ${L(a.started_at, this.hass)} – ${L(a.ended_at, this.hass)} · ${(a.distance_m / 1e3).toFixed(1)} km · ${_e(a.duration_seconds, this.hass)}</label></li>`)}</ul>${d.warnings.length ? l`<p class="muted">${e.gpxWarnings}: ${d.warnings.join(", ")}</p>` : ""}${d.conflicts.duplicate_file ? l`<p class="error" role="alert">${e.gpxDuplicate}</p>` : l`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? e.saving : e.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${e.newTrip}</h3><div class="form-grid"><input aria-label=${e.tripName} placeholder=${e.tripName} .value=${this.tripTitle} @input=${(a) => this.tripTitle = a.target.value}><input aria-label=${e.destination} placeholder=${e.destination} .value=${this.destination} @input=${(a) => this.destination = a.target.value}><label>${e.startDate}<input type="date" .value=${this.tripStartDate} @input=${(a) => this.tripStartDate = a.currentTarget.value}></label><label>${e.endDate}<input type="date" .value=${this.tripEndDate} @input=${(a) => this.tripEndDate = a.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${e.create}</button></div></section><section><h3>${e.trips}</h3>${t.length ? t.map((a) => l`<article class="trip"><div class="row"><strong>${a.title}</strong><span class="muted">${a.destination || ""} · ${Ue(a.status, this.hass)} · ${Pe(a, this.hass) || e.period}</span></div>${this.editingTripId === a.id ? l`<form class="form-grid" @submit=${(c) => {
      c.preventDefault(), this.saveTrip(a);
    }}><input aria-label=${e.tripName} .value=${this.editingTripTitle} @input=${(c) => this.editingTripTitle = c.currentTarget.value}><input aria-label=${e.destination} .value=${this.editingDestination} @input=${(c) => this.editingDestination = c.currentTarget.value}><label>${e.startDate}<input type="date" .value=${this.editingStartDate} @input=${(c) => this.editingStartDate = c.currentTarget.value}></label><label>${e.endDate}<input type="date" .value=${this.editingEndDate} @input=${(c) => this.editingEndDate = c.currentTarget.value}></label><button type="submit">${e.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${e.cancel}</button></form>` : l`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(a)}>${e.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(a.id)}>${this.confirmingTripId === a.id ? e.confirmDelete : e.remove}</button>${a.status === "planned" || a.status === "paused" ? l`<button type="button" @click=${() => this.changeStatus(a.id, "active")}>${e.resume}</button>` : ""}${a.status === "active" ? l`<button type="button" class="secondary" @click=${() => this.changeStatus(a.id, "paused")}>${e.pause}</button><button type="button" @click=${() => this.changeStatus(a.id, "completed")}>${e.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(a.id)}>${this.selected === a.id ? e.close : e.details}</button></div>`}${this.selected === a.id ? l`<div class="details"><h4>${e.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((c) => this.renderDrive(c, a.id, e)) : l`<p class="muted">${e.noDrives}</p>`}<h4>${e.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((c) => this.renderDrive(c, a.id, e)) : l`<p class="muted">${e.noDrives}</p>`}<h4>${e.manualDrive}</h4><div class="form-grid"><label>${e.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(c) => this.manualOccurredAt = c.currentTarget.value}></label><input aria-label=${e.startLocation} placeholder=${e.startLocation} .value=${this.manualStartLocation} @input=${(c) => this.manualStartLocation = c.currentTarget.value}><input aria-label=${e.endLocation} placeholder=${e.endLocation} .value=${this.manualEndLocation} @input=${(c) => this.manualEndLocation = c.currentTarget.value}><input aria-label=${e.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${e.distanceKm} .value=${this.manualDistanceKm} @input=${(c) => this.manualDistanceKm = c.currentTarget.value}><input aria-label=${e.durationMinutes} type="number" min="0" step="1" placeholder=${e.durationMinutes} .value=${this.manualDurationMinutes} @input=${(c) => this.manualDurationMinutes = c.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(a.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? e.saving : e.createDrive}</button></div><h4>${e.expenses}</h4><div class="expense-form create-form"><input aria-label=${e.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(c) => this.setExpenseAmount(c.currentTarget.value)}><select aria-label=${e.category} .value=${this.category} @change=${(c) => this.setExpenseCategory(c.currentTarget.value)}>${H.map((c) => l`<option value=${c}>${V(c, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(a.id)}>${e.save}</button></div>${i.map((c) => this.renderExpense(c, e))}<p class="total"><strong>${e.total}: ${n}</strong></p></div>` : ""}</article>`) : l`<p class="muted">${e.noTrip}</p>`}</section></ha-card>`;
  }
}
Le.styles = [ce.styles, O`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
Te("camper-travel-journal-manager-card", Le);
const xt = 1e4;
function G() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function W(s) {
  return s.length <= 8 ? "••••" : `${s.slice(0, 4)}…${s.slice(-4)}`;
}
function Ee(s) {
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
async function X(s, e, t, i) {
  const r = G();
  try {
    const n = await wt(s.connection.sendMessagePromise(e), i);
    return { ...t(n), durationMs: Math.round(G() - r), value: n };
  } catch (n) {
    return { state: "failed", durationMs: Math.round(G() - r), ...Dt(n) };
  }
}
function St(s) {
  return s && typeof s == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function At(s) {
  const e = s?.vehicles;
  return Array.isArray(e) && e.every((t) => t && typeof t == "object" && typeof t.vehicle_id == "string") ? { state: "success", structure: "ok", count: e.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function Ct(s) {
  const e = s;
  return Array.isArray(e?.trips) && Array.isArray(e?.drives) && Array.isArray(e?.stops) ? { state: "success", structure: "ok", count: e.trips.length, drivesCount: e.drives.length, stopsCount: e.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function kt(s, e, t = xt) {
  const i = { state: "not_run", durationMs: null };
  if (!s?.connection) return { version: "0.1.0-beta.15", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: i, vehicles: i, trips: i, vehicleId: W(e) };
  const r = Ee(s), n = await X(s, { type: "auth/current_user" }, St, t), o = await X(s, { type: "camper_travel_journal/list_vehicles" }, At, t), d = o.value?.vehicles?.filter((Ne) => typeof Ne.vehicle_id == "string") ?? [], a = d.length === 1 ? d[0].vehicle_id : void 0, p = await X(s, { type: "camper_travel_journal/list", vehicle_id: a ?? e }, Ct, t), { value: u, ...v } = n, { value: $, ...D } = o, { value: Lt, ...Re } = p;
  return {
    version: "0.1.0-beta.15",
    connectionBefore: r,
    connectionAfter: Ee(s),
    authentication: v,
    vehicles: D,
    trips: Re,
    vehicleId: W(e),
    ...a ? { resolvedVehicleId: W(a) } : {}
  };
}
function Z(s) {
  return JSON.stringify(s, null, 2);
}
function J(s) {
  return s.state === "success" ? "erfolgreich" : s.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const xe = "01M4XW0KD3GQ0KASAYHQ29840P";
class Tt extends E {
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
  config = { vehicle_id: xe };
  set hass(e) {
    this._hass = e, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(e) {
    this.config = { vehicle_id: e.vehicle_id || xe };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await kt(this._hass, this.config.vehicle_id);
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
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", Tt);
function It(s, e) {
  return s.vehicle_id || e.length !== 1 ? s : { ...s, vehicle_id: e[0].vehicle_id };
}
function Mt(s, e) {
  return s.type === e.type && s.vehicle_id === e.vehicle_id;
}
class Pt extends E {
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
    Mt(this._config, e) || (this._config = { ...e }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
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
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Pt);
const Ut = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const s of Ut) window.customCards.some((e) => e.type === s.type) || window.customCards.push(s);
