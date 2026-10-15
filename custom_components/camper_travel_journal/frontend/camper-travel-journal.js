const R = globalThis, it = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, st = /* @__PURE__ */ Symbol(), ct = /* @__PURE__ */ new WeakMap();
let Dt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== st) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (it && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (s) => new Dt(typeof s == "string" ? s : s + "", void 0, st), P = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, r, n) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + s[n + 1], s[0]);
  return new Dt(e, s, st);
}, Ot = (s, t) => {
  if (it) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = R.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, dt = it ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Pt(e);
})(s) : s;
const { is: jt, defineProperty: Ht, getOwnPropertyDescriptor: qt, getOwnPropertyNames: zt, getOwnPropertySymbols: Bt, getPrototypeOf: Vt } = Object, O = globalThis, lt = O.trustedTypes, Kt = lt ? lt.emptyScript : "", Ft = O.reactiveElementPolyfillSupport, k = (s, t) => s, X = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Kt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, xt = (s, t) => !jt(s, t), ht = { attribute: !0, type: String, converter: X, reflect: !1, useDefault: !1, hasChanged: xt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), O.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ht) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && Ht(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: n } = qt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: r, set(o) {
      const c = r?.call(this);
      n?.call(this, o), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ht;
  }
  static _$Ei() {
    if (this.hasOwnProperty(k("elementProperties"))) return;
    const t = Vt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(k("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(k("properties"))) {
      const e = this.properties, i = [...zt(e), ...Bt(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(dt(r));
    } else t !== void 0 && e.push(dt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : X).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const n = i.getPropertyOptions(r), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : X;
      this._$Em = r;
      const c = o.fromAttribute(e, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, r = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (r === !1 && (n = this[t]), i ??= o.getPropertyOptions(t), !((i.hasChanged ?? xt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: r, wrapped: n }, o) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [r, n] of i) {
        const { wrapped: o } = n, c = this[r];
        o !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[k("elementProperties")] = /* @__PURE__ */ new Map(), w[k("finalized")] = /* @__PURE__ */ new Map(), Ft?.({ ReactiveElement: w }), (O.reactiveElementVersions ??= []).push("2.1.2");
const rt = globalThis, ut = (s) => s, N = rt.trustedTypes, pt = N ? N.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, wt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + _, Wt = `<${At}>`, D = document, I = () => D.createComment(""), M = (s) => s === null || typeof s != "object" && typeof s != "function", nt = Array.isArray, Gt = (s) => nt(s) || typeof s?.[Symbol.iterator] == "function", H = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gt = /-->/g, mt = />/g, b = RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vt = /'/g, ft = /"/g, St = /^(?:script|style|textarea|title)$/i, Zt = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), d = Zt(1), A = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), $t = /* @__PURE__ */ new WeakMap(), y = D.createTreeWalker(D, 129);
function Ct(s, t) {
  if (!nt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return pt !== void 0 ? pt.createHTML(t) : t;
}
const Jt = (s, t) => {
  const e = s.length - 1, i = [];
  let r, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = C;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let u, p, h = -1, v = 0;
    for (; v < a.length && (o.lastIndex = v, p = o.exec(a), p !== null); ) v = o.lastIndex, o === C ? p[1] === "!--" ? o = gt : p[1] !== void 0 ? o = mt : p[2] !== void 0 ? (St.test(p[2]) && (r = RegExp("</" + p[2], "g")), o = b) : p[3] !== void 0 && (o = b) : o === b ? p[0] === ">" ? (o = r ?? C, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, u = p[1], o = p[3] === void 0 ? b : p[3] === '"' ? ft : vt) : o === ft || o === vt ? o = b : o === gt || o === mt ? o = C : (o = b, r = void 0);
    const f = o === b && s[c + 1].startsWith("/>") ? " " : "";
    n += o === C ? a + Wt : h >= 0 ? (i.push(u), a.slice(0, h) + wt + a.slice(h) + _ + f) : a + _ + (h === -2 ? c : f);
  }
  return [Ct(s, n + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let n = 0, o = 0;
    const c = t.length - 1, a = this.parts, [u, p] = Jt(t, e);
    if (this.el = U.createElement(u, i), y.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = y.nextNode()) !== null && a.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(wt)) {
          const v = p[o++], f = r.getAttribute(h).split(_), x = /([.?@])?(.*)/.exec(v);
          a.push({ type: 1, index: n, name: x[2], strings: f, ctor: x[1] === "." ? Yt : x[1] === "?" ? Qt : x[1] === "@" ? te : j }), r.removeAttribute(h);
        } else h.startsWith(_) && (a.push({ type: 6, index: n }), r.removeAttribute(h));
        if (St.test(r.tagName)) {
          const h = r.textContent.split(_), v = h.length - 1;
          if (v > 0) {
            r.textContent = N ? N.emptyScript : "";
            for (let f = 0; f < v; f++) r.append(h[f], I()), y.nextNode(), a.push({ type: 2, index: ++n });
            r.append(h[v], I());
          }
        }
      } else if (r.nodeType === 8) if (r.data === At) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(_, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = D.createElement("template");
    return i.innerHTML = t, i;
  }
}
function S(s, t, e = s, i) {
  if (t === A) return t;
  let r = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = M(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = r : e._$Cl = r), r !== void 0 && (t = S(s, r._$AS(s, t.values), r, i)), t;
}
class Xt {
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
    const { el: { content: e }, parts: i } = this._$AD, r = (t?.creationScope ?? D).importNode(e, !0);
    y.currentNode = r;
    let n = y.nextNode(), o = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let u;
        a.type === 2 ? u = new L(n, n.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (u = new ee(n, this, t)), this._$AV.push(u), a = i[++c];
      }
      o !== a?.index && (n = y.nextNode(), o++);
    }
    return y.currentNode = D, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class L {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    t = S(this, t, e), M(t) ? t === g || t == null || t === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Gt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== g && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(D.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = U.createElement(Ct(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const n = new Xt(r, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = $t.get(t.strings);
    return e === void 0 && $t.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    nt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const n of t) r === e.length ? e.push(i = new L(this.O(I()), this.O(I()), this, this.options)) : i = e[r], i._$AI(n), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ut(t).nextSibling;
      ut(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, n) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(t, e = this, i, r) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = S(this, t, e, 0), o = !M(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const c = t;
      let a, u;
      for (t = n[0], a = 0; a < n.length - 1; a++) u = S(this, c[i + a], e, a), u === A && (u = this._$AH[a]), o ||= !M(u) || u !== this._$AH[a], u === g ? t = g : t !== g && (t += (u ?? "") + n[a + 1]), this._$AH[a] = u;
    }
    o && !r && this.j(t);
  }
  j(t) {
    t === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Yt extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === g ? void 0 : t;
  }
}
class Qt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== g);
  }
}
class te extends j {
  constructor(t, e, i, r, n) {
    super(t, e, i, r, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? g) === A) return;
    const i = this._$AH, r = t === g && i !== g || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== g && (i === g || r);
    r && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ee {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const ie = rt.litHtmlPolyfillSupport;
ie?.(U, L), (rt.litHtmlVersions ??= []).push("3.3.3");
const se = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let r = i._$litPart$;
  if (r === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = r = new L(t.insertBefore(I(), n), n, void 0, e ?? {});
  }
  return r._$AI(s), r;
};
const at = globalThis;
class E extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = se(e, this.renderRoot, this.renderOptions);
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
E._$litElement$ = !0, E.finalized = !0, at.litElementHydrateSupport?.({ LitElement: E });
const re = at.litElementPolyfillSupport;
re?.({ LitElement: E });
(at.litElementVersions ??= []).push("4.2.2");
class ot extends E {
  _hass;
  config = {};
  static styles = P`
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
  set hass(t) {
    const e = this._hass?.connection !== t?.connection;
    this._hass = t, e && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(t) {
    this.config.vehicle_id !== t.vehicle_id && (this.config = { ...t }, this.onConfigChanged(), this.requestUpdate());
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
function kt(s, t) {
  customElements.get(s) || customElements.define(s, t);
}
async function m(s, t, e, i = {}) {
  return s.connection.sendMessagePromise({ type: t, vehicle_id: e, ...i });
}
const Y = (s, t, e) => m(s, "camper_travel_journal/list", t, e ? { trip_id: e } : {}), Tt = (s, t, e, i) => m(s, "camper_travel_journal/transition_trip", t, { trip_id: e, status: i }), ne = (s, t, e, i = "", r = "", n = "") => m(s, "camper_travel_journal/create_trip", t, { title: e, start_date: i || void 0, end_date: r || void 0, destination: n }), ae = (s, t, e, i) => m(s, "camper_travel_journal/update_trip", t, { trip_id: e, ...i }), oe = (s, t, e) => m(s, "camper_travel_journal/delete_trip", t, { trip_id: e }), ce = (s, t, e, i) => m(s, "camper_travel_journal/unlink_drive", t, { trip_id: e, drive_id: i }), de = (s, t, e, i) => m(s, "camper_travel_journal/link_drives", t, { trip_id: e, drive_ids: i }), le = (s, t, e) => m(s, "camper_travel_journal/create_manual_drive", t, e), he = (s, t, e, i) => m(s, "camper_travel_journal/update_manual_drive", t, { drive_id: e, ...i }), ue = (s, t, e) => m(s, "camper_travel_journal/delete_manual_drive", t, { drive_id: e }), pe = (s, t, e, i) => m(s, "camper_travel_journal/create_expense", t, { trip_id: e, ...i }), ge = (s, t, e, i) => m(s, "camper_travel_journal/update_expense", t, { expense_id: e, ...i }), me = (s, t, e) => m(s, "camper_travel_journal/delete_expense", t, { expense_id: e }), ve = async (s) => (await s.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], It = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], q = It, fe = {
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
  dateInvalid: "Bitte gültige Daten eingeben."
}, $e = {
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
  dateInvalid: "Enter valid dates."
};
function l(s) {
  return (s?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? fe : $e;
}
function Q(s) {
  return (s?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function z(s, t) {
  const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (e) {
    const [, i, r, n] = e;
    return Q(t).startsWith("de") ? `${n}.${r}.${i}` : `${r}/${n}/${i}`;
  }
  return new Date(s).toLocaleDateString(Q(t));
}
function _t(s, t) {
  return new Date(s).toLocaleString(Q(t), { dateStyle: "short", timeStyle: "short" });
}
function _e(s, t) {
  const e = Math.max(0, Math.round((s ?? 0) / 60));
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
function Mt(s, t) {
  return s.start_date || s.end_date ? [s.start_date, s.end_date].filter(Boolean).map((e) => z(e, t)).join(" – ") || "" : s.started_at ? `${z(s.started_at, t)}${s.ended_at ? ` – ${z(s.ended_at, t)}` : ""}` : "";
}
function Ut(s, t) {
  return l(t).statuses[s] ?? s;
}
function B(s, t) {
  return l(t).categories[s] ?? s;
}
function V(s) {
  return It.includes(s);
}
function T(s, t, e) {
  const i = (e?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(i, { style: "currency", currency: t, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(s / 100);
}
function bt(s) {
  const t = s.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(t)) return null;
  const [e, i = ""] = t.split("."), r = Number(e) * 100 + Number((i + "00").slice(0, 2));
  return Number.isSafeInteger(r) ? r : null;
}
const tt = "camper-travel-journal-expenses-changed", et = "camper-travel-journal-data-changed";
function K(s) {
  window.dispatchEvent(new CustomEvent(tt, { detail: s }));
}
function $(s) {
  window.dispatchEvent(new CustomEvent(et, { detail: s }));
}
class be extends ot {
  snapshot;
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (t) => {
    t.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(tt, this.onDataChanged), window.addEventListener(et, this.onDataChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(tt, this.onDataChanged), window.removeEventListener(et, this.onDataChanged), super.disconnectedCallback();
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
      const t = await Y(this.hass, this.vehicleId), e = t.trips[0];
      return this.snapshot = e ? await Y(this.hass, this.vehicleId, e.id) : t, this.loadError = "", !0;
    } catch {
      return this.loadError = l(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(t) {
    const e = this.snapshot?.trips[0];
    if (!(!this.hass || !e))
      try {
        await Tt(this.hass, this.vehicleId, e.id, t), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = l(this.hass).statusError, this.requestUpdate();
      }
  }
  render() {
    const t = l(this.hass), e = this.snapshot?.trips[0], i = (this.snapshot?.drives ?? []).reduce((a, u) => a + u.distance_m, 0) / 1e3, r = this.snapshot?.expense_summary, n = r?.mixed_currency ? t.mixedCurrency : r?.total_minor !== void 0 && r.currency ? T(r.total_minor, r.currency, this.hass) : T(0, "EUR", this.hass), o = this.loadError || this.actionError, c = e ? Mt(e, this.hass) : "";
    return d`<ha-card><h2>${e?.title ?? t.title}</h2>${o ? d`<p class="error" role="alert">${o}</p>` : e ? d`<p class="muted">${e.destination || t.noDestination} · ${Ut(e.status, this.hass)} · ${c}</p><div class="grid"><div class="metric"><span class="muted">${t.distance}</span><span class="value">${i.toFixed(1)} km</span></div><div class="metric"><span class="muted">${t.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${t.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${t.costs}</span><span class="value">${n}</span></div></div><div class="actions">${e.status === "planned" || e.status === "paused" ? d`<button @click=${() => this.setStatus("active")}>${t.resume}</button>` : ""}${e.status === "active" ? d`<button class="secondary" @click=${() => this.setStatus("paused")}>${t.pause}</button><button @click=${() => this.setStatus("completed")}>${t.complete}</button>` : ""}</div>` : d`<p class="muted">${t.noTrip}</p>`}${this.loading ? d`<p class="muted">${t.loading}</p>` : ""}</ha-card>`;
  }
}
kt("camper-travel-journal-summary-card", be);
class Lt extends ot {
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
  editingDriveId = "";
  editingDriveOccurredAt = "";
  editingDriveStartLocation = "";
  editingDriveEndLocation = "";
  editingDriveDistanceKm = "";
  editingDriveDurationMinutes = "";
  driveSavingId = "";
  confirmingDriveId = "";
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
      return this.snapshot = await Y(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = l(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(t) {
    this.actionError = t, this.requestUpdate();
  }
  setExpenseAmount(t) {
    this.amount = t, this.requestUpdate();
  }
  setEditingExpenseAmount(t) {
    this.editingAmount = t, this.requestUpdate();
  }
  setExpenseCategory(t) {
    if (!V(t)) return this.fail(l(this.hass).categoryInvalid);
    this.category = t, this.requestUpdate();
  }
  setEditingExpenseCategory(t) {
    if (!V(t)) return this.fail(l(this.hass).categoryInvalid);
    this.editingCategory = t, this.requestUpdate();
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(l(this.hass).dateInvalid);
      try {
        await ne(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(l(this.hass).tripCreateError);
      }
    }
  }
  startTripEdit(t) {
    this.actionError = "", this.editingTripId = t.id, this.editingTripTitle = t.title, this.editingDestination = t.destination || "", this.editingStartDate = t.start_date || "", this.editingEndDate = t.end_date || "", this.requestUpdate();
  }
  cancelTripEdit() {
    this.editingTripId = "", this.actionError = "", this.requestUpdate();
  }
  async saveTrip(t) {
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail(l(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(l(this.hass).dateInvalid);
    try {
      await ae(this.hass, this.vehicleId, t.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t.id });
    } catch {
      this.fail(l(this.hass).tripEditError);
    }
  }
  async removeTrip(t) {
    if (this.hass) {
      if (this.confirmingTripId !== t) {
        this.confirmingTripId = t, this.requestUpdate();
        return;
      }
      try {
        await oe(this.hass, this.vehicleId, t), this.confirmingTripId = "", this.selected === t && (this.selected = ""), await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
      } catch {
        this.fail(l(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(t, e) {
    if (this.hass)
      try {
        await Tt(this.hass, this.vehicleId, t, e), this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
      } catch {
        this.fail(l(this.hass).statusError);
      }
  }
  async assignDrive(t, e) {
    if (this.hass)
      try {
        await de(this.hass, this.vehicleId, t, [e]), this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
      } catch {
        this.fail(l(this.hass).driveAssignError);
      }
  }
  async unassignDrive(t, e) {
    if (this.hass)
      try {
        await ce(this.hass, this.vehicleId, t, e), this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
      } catch {
        this.fail(l(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(t) {
    this.selected = this.selected === t ? "" : t, this.selected ? this.refresh() : this.requestUpdate();
  }
  async addManualDrive(t) {
    if (!this.hass || this.manualSaving) return;
    const e = Number(this.manualDistanceKm.replace(",", ".")), i = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(e) || e < 0 || i !== void 0 && (!Number.isInteger(i) || i < 0)) return this.fail(l(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await le(this.hass, this.vehicleId, { trip_id: t, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: e, ...i === void 0 ? {} : { duration_minutes: i } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
    } catch {
      this.fail(l(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(t) {
    const e = new Date(t), i = (r) => String(r).padStart(2, "0");
    return `${e.getFullYear()}-${i(e.getMonth() + 1)}-${i(e.getDate())}T${i(e.getHours())}:${i(e.getMinutes())}`;
  }
  startManualDriveEdit(t) {
    this.actionError = "", this.editingDriveId = t.id, this.editingDriveOccurredAt = this.localDateTime(t.started_at), this.editingDriveStartLocation = t.start_label || "", this.editingDriveEndLocation = t.end_label || "", this.editingDriveDistanceKm = (t.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = t.duration_seconds ? String(Math.round(t.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(t, e) {
    if (!this.hass || this.driveSavingId) return;
    const i = Number(this.editingDriveDistanceKm.replace(",", ".")), r = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(i) || i < 0 || r !== void 0 && (!Number.isInteger(r) || r < 0)) return this.fail(l(this.hass).dateInvalid);
    this.driveSavingId = t.id;
    try {
      await he(this.hass, this.vehicleId, t.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: i, ...r === void 0 ? {} : { duration_minutes: r } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), $({ vehicleId: this.vehicleId, tripId: e });
    } catch {
      this.fail(l(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(t, e) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== e) {
        this.confirmingDriveId = e, this.requestUpdate();
        return;
      }
      this.driveSavingId = e;
      try {
        await ue(this.hass, this.vehicleId, e), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), $({ vehicleId: this.vehicleId, tripId: t });
      } catch {
        this.fail(l(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(t) {
    if (!this.hass) return;
    const e = l(this.hass), i = bt(this.amount);
    if (i === null) return this.fail(e.amountInvalid);
    try {
      await pe(this.hass, this.vehicleId, t, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: i, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", K({ vehicleId: this.vehicleId, tripId: t }));
    } catch {
      this.fail(e.expenseCreateError);
    }
  }
  startExpenseEdit(t) {
    this.actionError = "", this.editingExpenseId = t.id, this.editingAmount = (t.amount_minor / 100).toFixed(2), this.editingCategory = t.category, this.requestUpdate();
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.actionError = "", this.requestUpdate();
  }
  async saveExpense(t) {
    if (!this.hass || this.expenseSavingId) return;
    const e = l(this.hass), i = bt(this.editingAmount);
    if (i === null) return this.fail(e.amountInvalid);
    if (!V(this.editingCategory)) return this.fail(e.categoryInvalid);
    this.expenseSavingId = t.id;
    try {
      await ge(this.hass, this.vehicleId, t.id, { amount_minor: i, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), K({ vehicleId: this.vehicleId, tripId: t.trip_id ?? this.selected }));
    } catch {
      this.fail(e.expenseEditError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  async removeExpense(t) {
    if (!(!this.hass || this.expenseSavingId)) {
      if (this.confirmingExpenseId !== t) {
        this.confirmingExpenseId = t, this.requestUpdate();
        return;
      }
      this.expenseSavingId = t;
      try {
        await me(this.hass, this.vehicleId, t), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && K({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(l(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(t) {
    const e = [...q];
    return t && !e.includes(t) && e.unshift(t), e;
  }
  renderExpense(t, e) {
    const i = this.editingExpenseId === t.id, r = this.expenseSavingId === t.id;
    return d`<div class="expense-row">${i ? d`<form class="expense-form" @submit=${(n) => {
      n.preventDefault(), this.saveExpense(t);
    }}><select aria-label=${e.category} .value=${this.editingCategory} @change=${(n) => this.setEditingExpenseCategory(n.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((n) => d`<option value=${n}>${B(n, this.hass)}</option>`)}</select><input aria-label=${e.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(n) => this.setEditingExpenseAmount(n.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${r}>${r ? e.saving : e.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${r}>${e.cancel}</button></div></form>` : d`<span>${B(t.category, this.hass)}: ${T(t.amount_minor, t.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(t)} ?disabled=${!!this.expenseSavingId}>${e.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(t.id)}>${this.confirmingExpenseId === t.id ? e.confirmDelete : e.remove}</button></span>`}</div>`;
  }
  renderDrive(t, e, i) {
    const r = t.source === "manual" ? i.sourceManual : i.sourceGps, n = t.source === "manual" ? `${t.start_label || "—"} → ${t.end_label || "—"}` : `${i.driveStart}: ${_t(t.started_at, this.hass)} · ${i.driveEnd}: ${_t(t.ended_at, this.hass)}`;
    if (this.editingDriveId === t.id) return d`<form class="form-grid drive-edit-form" @submit=${(a) => {
      a.preventDefault(), this.saveManualDrive(t, e);
    }}><label>${i.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(a) => this.editingDriveOccurredAt = a.currentTarget.value}></label><input aria-label=${i.startLocation} .value=${this.editingDriveStartLocation} @input=${(a) => this.editingDriveStartLocation = a.currentTarget.value}><input aria-label=${i.endLocation} .value=${this.editingDriveEndLocation} @input=${(a) => this.editingDriveEndLocation = a.currentTarget.value}><input aria-label=${i.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(a) => this.editingDriveDistanceKm = a.currentTarget.value}><input aria-label=${i.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(a) => this.editingDriveDurationMinutes = a.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === t.id}>${this.driveSavingId === t.id ? i.saving : i.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${i.cancel}</button></form>`;
    const o = t.trip_id === e ? d`<button type="button" class="link" @click=${() => this.unassignDrive(e, t.id)}>${i.unassign}</button>` : d`<button type="button" class="link" @click=${() => this.assignDrive(e, t.id)}>${i.assign}</button>`, c = t.source === "manual" ? d`<button type="button" class="link" @click=${() => this.startManualDriveEdit(t)} ?disabled=${!!this.driveSavingId}>${i.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(e, t.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === t.id ? i.confirmDelete : i.remove}</button>` : "";
    return d`<div class="drive-row"><div><strong>${r}</strong> · ${n}<br><span class="muted">${(t.distance_m / 1e3).toFixed(1)} km · ${_e(t.duration_seconds, this.hass)} · ${t.assignment_status === "assigned" ? i.assignedDrives : i.freeDrives}</span></div><span class="actions">${c}${o}</span></div>`;
  }
  render() {
    const t = l(this.hass), e = this.snapshot?.trips ?? [], i = this.snapshot?.expenses ?? [], r = this.snapshot?.expense_summary, n = r?.mixed_currency ? t.mixedCurrency : r?.total_minor !== void 0 && r.currency ? T(r.total_minor, r.currency, this.hass) : T(0, "EUR", this.hass), o = this.loadError || this.actionError;
    return d`<ha-card><h2>${t.manager}</h2>${o ? d`<p class="error" role="alert">${o}</p>` : ""}<section><h3>${t.newTrip}</h3><div class="form-grid"><input aria-label=${t.tripName} placeholder=${t.tripName} .value=${this.tripTitle} @input=${(c) => this.tripTitle = c.target.value}><input aria-label=${t.destination} placeholder=${t.destination} .value=${this.destination} @input=${(c) => this.destination = c.target.value}><label>${t.startDate}<input type="date" .value=${this.tripStartDate} @input=${(c) => this.tripStartDate = c.currentTarget.value}></label><label>${t.endDate}<input type="date" .value=${this.tripEndDate} @input=${(c) => this.tripEndDate = c.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${t.create}</button></div></section><section><h3>${t.trips}</h3>${e.length ? e.map((c) => d`<article class="trip"><div class="row"><strong>${c.title}</strong><span class="muted">${c.destination || ""} · ${Ut(c.status, this.hass)} · ${Mt(c, this.hass) || t.period}</span></div>${this.editingTripId === c.id ? d`<form class="form-grid" @submit=${(a) => {
      a.preventDefault(), this.saveTrip(c);
    }}><input aria-label=${t.tripName} .value=${this.editingTripTitle} @input=${(a) => this.editingTripTitle = a.currentTarget.value}><input aria-label=${t.destination} .value=${this.editingDestination} @input=${(a) => this.editingDestination = a.currentTarget.value}><label>${t.startDate}<input type="date" .value=${this.editingStartDate} @input=${(a) => this.editingStartDate = a.currentTarget.value}></label><label>${t.endDate}<input type="date" .value=${this.editingEndDate} @input=${(a) => this.editingEndDate = a.currentTarget.value}></label><button type="submit">${t.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${t.cancel}</button></form>` : d`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(c)}>${t.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(c.id)}>${this.confirmingTripId === c.id ? t.confirmDelete : t.remove}</button>${c.status === "planned" || c.status === "paused" ? d`<button type="button" @click=${() => this.changeStatus(c.id, "active")}>${t.resume}</button>` : ""}${c.status === "active" ? d`<button type="button" class="secondary" @click=${() => this.changeStatus(c.id, "paused")}>${t.pause}</button><button type="button" @click=${() => this.changeStatus(c.id, "completed")}>${t.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(c.id)}>${this.selected === c.id ? t.close : t.details}</button></div>`}${this.selected === c.id ? d`<div class="details"><h4>${t.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((a) => this.renderDrive(a, c.id, t)) : d`<p class="muted">${t.noDrives}</p>`}<h4>${t.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((a) => this.renderDrive(a, c.id, t)) : d`<p class="muted">${t.noDrives}</p>`}<h4>${t.manualDrive}</h4><div class="form-grid"><label>${t.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(a) => this.manualOccurredAt = a.currentTarget.value}></label><input aria-label=${t.startLocation} placeholder=${t.startLocation} .value=${this.manualStartLocation} @input=${(a) => this.manualStartLocation = a.currentTarget.value}><input aria-label=${t.endLocation} placeholder=${t.endLocation} .value=${this.manualEndLocation} @input=${(a) => this.manualEndLocation = a.currentTarget.value}><input aria-label=${t.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${t.distanceKm} .value=${this.manualDistanceKm} @input=${(a) => this.manualDistanceKm = a.currentTarget.value}><input aria-label=${t.durationMinutes} type="number" min="0" step="1" placeholder=${t.durationMinutes} .value=${this.manualDurationMinutes} @input=${(a) => this.manualDurationMinutes = a.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(c.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? t.saving : t.createDrive}</button></div><h4>${t.expenses}</h4><div class="expense-form create-form"><input aria-label=${t.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(a) => this.setExpenseAmount(a.currentTarget.value)}><select aria-label=${t.category} .value=${this.category} @change=${(a) => this.setExpenseCategory(a.currentTarget.value)}>${q.map((a) => d`<option value=${a}>${B(a, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(c.id)}>${t.save}</button></div>${i.map((a) => this.renderExpense(a, t))}<p class="total"><strong>${t.total}: ${n}</strong></p></div>` : ""}</article>`) : d`<p class="muted">${t.noTrip}</p>`}</section></ha-card>`;
  }
}
Lt.styles = [ot.styles, P`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
kt("camper-travel-journal-manager-card", Lt);
const ye = 1e4;
function F() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function W(s) {
  return s.length <= 8 ? "••••" : `${s.slice(0, 4)}…${s.slice(-4)}`;
}
function yt(s) {
  return s?.connection ? s.connection.connected === !0 ? "available" : s.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function Ee(s) {
  const t = s, e = typeof t?.code == "string" ? t.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", i = typeof t?.message == "string" ? t.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: e, errorMessage: i };
}
function De(s, t) {
  return new Promise((e, i) => {
    const r = setTimeout(() => i(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), t);
    s.then((n) => {
      clearTimeout(r), e(n);
    }, (n) => {
      clearTimeout(r), i(n);
    });
  });
}
async function G(s, t, e, i) {
  const r = F();
  try {
    const n = await De(s.connection.sendMessagePromise(t), i);
    return { ...e(n), durationMs: Math.round(F() - r), value: n };
  } catch (n) {
    return { state: "failed", durationMs: Math.round(F() - r), ...Ee(n) };
  }
}
function xe(s) {
  return s && typeof s == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function we(s) {
  const t = s?.vehicles;
  return Array.isArray(t) && t.every((e) => e && typeof e == "object" && typeof e.vehicle_id == "string") ? { state: "success", structure: "ok", count: t.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function Ae(s) {
  const t = s;
  return Array.isArray(t?.trips) && Array.isArray(t?.drives) && Array.isArray(t?.stops) ? { state: "success", structure: "ok", count: t.trips.length, drivesCount: t.drives.length, stopsCount: t.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function Se(s, t, e = ye) {
  const i = { state: "not_run", durationMs: null };
  if (!s?.connection) return { version: "0.1.0-beta.13", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: i, vehicles: i, trips: i, vehicleId: W(t) };
  const r = yt(s), n = await G(s, { type: "auth/current_user" }, xe, e), o = await G(s, { type: "camper_travel_journal/list_vehicles" }, we, e), c = o.value?.vehicles?.filter((Nt) => typeof Nt.vehicle_id == "string") ?? [], a = c.length === 1 ? c[0].vehicle_id : void 0, p = await G(s, { type: "camper_travel_journal/list", vehicle_id: a ?? t }, Ae, e), { value: h, ...v } = n, { value: f, ...x } = o, { value: Ue, ...Rt } = p;
  return {
    version: "0.1.0-beta.13",
    connectionBefore: r,
    connectionAfter: yt(s),
    authentication: v,
    vehicles: x,
    trips: Rt,
    vehicleId: W(t),
    ...a ? { resolvedVehicleId: W(a) } : {}
  };
}
function Z(s) {
  return JSON.stringify(s, null, 2);
}
function J(s) {
  return s.state === "success" ? "erfolgreich" : s.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const Et = "01M4XW0KD3GQ0KASAYHQ29840P";
class Ce extends E {
  static styles = P`
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
  config = { vehicle_id: Et };
  set hass(t) {
    this._hass = t, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(t) {
    this.config = { vehicle_id: t.vehicle_id || Et };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await Se(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const t = Z(this.report);
    if (!navigator.clipboard?.writeText) {
      this.manualCopy = !0, this.error = "Bitte den eingeblendeten Bericht manuell auswählen und kopieren.", this.requestUpdate();
      return;
    }
    try {
      await navigator.clipboard.writeText(t), this.manualCopy = !1, this.error = "";
    } catch {
      this.manualCopy = !0, this.error = "Automatisches Kopieren ist in diesem Browser nicht verfügbar. Bitte den Bericht manuell auswählen und kopieren.";
    }
    this.requestUpdate();
  }
  selectReport() {
    this.shadowRoot?.querySelector('textarea[aria-label="Diagnosebericht zum manuellen Kopieren"]')?.select();
  }
  render() {
    const t = this.report;
    return d`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? d`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? d`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${t ? d`<dl>
        <dt>Version</dt><dd>${t.version}</dd>
        <dt>Verbindung vorher</dt><dd>${t.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${t.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${J(t.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${J(t.vehicles)}${t.vehicles.durationMs === null ? "" : ` (${t.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${J(t.trips)}${t.trips.durationMs === null ? "" : ` (${t.trips.durationMs} ms)`}${t.trips.state === "success" ? ` · ${t.trips.count ?? 0} Reisen / ${t.trips.drivesCount ?? 0} Fahrten / ${t.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${t.vehicles.structure === "ok" && t.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Z(t)}</pre>${this.manualCopy ? d`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Z(t)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${t ? "Diagnose wiederholen" : "Diagnose starten"}</button>${t ? d`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? d`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", Ce);
function ke(s, t) {
  return s.vehicle_id || t.length !== 1 ? s : { ...s, vehicle_id: t[0].vehicle_id };
}
function Te(s, t) {
  return s.type === t.type && s.vehicle_id === t.vehicle_id;
}
class Ie extends E {
  static styles = P`
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
  set hass(t) {
    const e = this._hass?.connection !== t?.connection;
    this._hass = t, e && t && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(t) {
    Te(this._config, t) || (this._config = { ...t }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const t = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await ve(t), this.loadedConnection = t.connection;
        const e = ke(this._config, this.vehicles);
        e.vehicle_id !== this._config.vehicle_id && (this._config = e, this.fireConfigChanged());
      } catch {
        this.error = l(t).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(t) {
    const e = t.target.value;
    this._config = { ...this._config, vehicle_id: e }, this.fireConfigChanged();
  }
  render() {
    const t = l(this._hass);
    return d`
      <div class="field">
        <label for="vehicle">${t.editorVehicle}</label>
        ${this.loading ? d`<span class="muted">${t.editorLoading}</span>` : d`
          <select id="vehicle" aria-label=${t.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${t.editorChooseVehicle}</option>
            ${this.vehicles.map((e) => d`<option value=${e.vehicle_id} ?selected=${e.vehicle_id === this._config.vehicle_id}>${e.name || e.title}</option>`)}
          </select>
        `}
        ${this.error ? d`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? d`<span class="error" role="alert">${t.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Ie);
const Me = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const s of Me) window.customCards.some((t) => t.type === s.type) || window.customCards.push(s);
