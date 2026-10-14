const U = globalThis, z = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L = /* @__PURE__ */ Symbol(), V = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== L) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = V.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && V.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (r) => new rt(typeof r == "string" ? r : r + "", void 0, L), nt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new rt(e, r, L);
}, ft = (r, t) => {
  if (z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = U.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, W = z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return gt(e);
})(r) : r;
const { is: vt, defineProperty: _t, getOwnPropertyDescriptor: yt, getOwnPropertyNames: bt, getOwnPropertySymbols: At, getPrototypeOf: Et } = Object, M = globalThis, Z = M.trustedTypes, wt = Z ? Z.emptyScript : "", xt = M.reactiveElementPolyfillSupport, S = (r, t) => r, I = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? wt : null;
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
} }, at = (r, t) => !vt(r, t), J = { attribute: !0, type: String, converter: I, reflect: !1, useDefault: !1, hasChanged: at };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), M.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = J) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && _t(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = yt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const c = i?.call(this);
      n?.call(this, a), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(S("elementProperties"))) return;
    const t = Et(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(S("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(S("properties"))) {
      const e = this.properties, s = [...bt(e), ...At(e)];
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
      for (const i of s) e.unshift(W(i));
    } else t !== void 0 && e.push(W(t));
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
    return ft(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : I).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : I;
      this._$Em = i;
      const c = a.fromAttribute(e, n.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (n = this[t]), s ??= a.getPropertyOptions(t), !((s.hasChanged ?? at)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, s)))) return;
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
        const { wrapped: a } = n, c = this[i];
        a !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, n, c);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[S("elementProperties")] = /* @__PURE__ */ new Map(), A[S("finalized")] = /* @__PURE__ */ new Map(), xt?.({ ReactiveElement: A }), (M.reactiveElementVersions ??= []).push("2.1.2");
const F = globalThis, G = (r) => r, N = F.trustedTypes, Q = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ot = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, ht = "?" + v, St = `<${ht}>`, b = document, k = () => b.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", B = Array.isArray, Ct = (r) => B(r) || typeof r?.[Symbol.iterator] == "function", j = `[ \t
\f\r]`, x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, X = /-->/g, Y = />/g, _ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), tt = /'/g, et = /"/g, lt = /^(?:script|style|textarea|title)$/i, kt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), l = kt(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), y = b.createTreeWalker(b, 129);
function ct(r, t) {
  if (!B(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Q !== void 0 ? Q.createHTML(t) : t;
}
const Tt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = x;
  for (let c = 0; c < e; c++) {
    const o = r[c];
    let d, u, h = -1, g = 0;
    for (; g < o.length && (a.lastIndex = g, u = a.exec(o), u !== null); ) g = a.lastIndex, a === x ? u[1] === "!--" ? a = X : u[1] !== void 0 ? a = Y : u[2] !== void 0 ? (lt.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = _) : u[3] !== void 0 && (a = _) : a === _ ? u[0] === ">" ? (a = i ?? x, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, d = u[1], a = u[3] === void 0 ? _ : u[3] === '"' ? et : tt) : a === et || a === tt ? a = _ : a === X || a === Y ? a = x : (a = _, i = void 0);
    const f = a === _ && r[c + 1].startsWith("/>") ? " " : "";
    n += a === x ? o + St : h >= 0 ? (s.push(d), o.slice(0, h) + ot + o.slice(h) + v + f) : o + v + (h === -2 ? c : f);
  }
  return [ct(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class D {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, a = 0;
    const c = t.length - 1, o = this.parts, [d, u] = Tt(t, e);
    if (this.el = D.createElement(d, s), y.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = y.nextNode()) !== null && o.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ot)) {
          const g = u[a++], f = i.getAttribute(h).split(v), R = /([.?@])?(.*)/.exec(g);
          o.push({ type: 1, index: n, name: R[2], strings: f, ctor: R[1] === "." ? Pt : R[1] === "?" ? Rt : R[1] === "@" ? Ut : H }), i.removeAttribute(h);
        } else h.startsWith(v) && (o.push({ type: 6, index: n }), i.removeAttribute(h));
        if (lt.test(i.tagName)) {
          const h = i.textContent.split(v), g = h.length - 1;
          if (g > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let f = 0; f < g; f++) i.append(h[f], k()), y.nextNode(), o.push({ type: 2, index: ++n });
            i.append(h[g], k());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ht) o.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(v, h + 1)) !== -1; ) o.push({ type: 7, index: n }), h += v.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function w(r, t, e = r, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = w(r, i._$AS(r, t.values), i, s)), t;
}
class Dt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? b).importNode(e, !0);
    y.currentNode = i;
    let n = y.nextNode(), a = 0, c = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let d;
        o.type === 2 ? d = new P(n, n.nextSibling, this, t) : o.type === 1 ? d = new o.ctor(n, o.name, o.strings, this, t) : o.type === 6 && (d = new Nt(n, this, t)), this._$AV.push(d), o = s[++c];
      }
      a !== o?.index && (n = y.nextNode(), a++);
    }
    return y.currentNode = b, i;
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
    t = w(this, t, e), T(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ct(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = D.createElement(ct(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new Dt(i, this), a = n.u(this.options);
      n.p(e), this.T(a), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new D(t)), e;
  }
  k(t) {
    B(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new P(this.O(k()), this.O(k()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = G(t).nextSibling;
      G(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class H {
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
    if (n === void 0) t = w(this, t, e, 0), a = !T(t) || t !== this._$AH && t !== E, a && (this._$AH = t);
    else {
      const c = t;
      let o, d;
      for (t = n[0], o = 0; o < n.length - 1; o++) d = w(this, c[s + o], e, o), d === E && (d = this._$AH[o]), a ||= !T(d) || d !== this._$AH[o], d === p ? t = p : t !== p && (t += (d ?? "") + n[o + 1]), this._$AH[o] = d;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pt extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Rt extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Ut extends H {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = w(this, t, e, 0) ?? p) === E) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
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
const Ot = F.litHtmlPolyfillSupport;
Ot?.(D, P), (F.litHtmlVersions ??= []).push("3.3.3");
const Mt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new P(t.insertBefore(k(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const q = globalThis;
class C extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Mt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
C._$litElement$ = !0, C.finalized = !0, q.litElementHydrateSupport?.({ LitElement: C });
const Ht = q.litElementPolyfillSupport;
Ht?.({ LitElement: C });
(q.litElementVersions ??= []).push("4.2.2");
class K extends C {
  hass;
  config = {};
  static styles = nt`
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
function dt(r, t) {
  customElements.get(r) || customElements.define(r, t);
}
async function m(r, t, e, s = {}) {
  return r.connection.sendMessagePromise({ type: t, vehicle_id: e, ...s });
}
const pt = (r, t, e) => m(r, "camper_travel_journal/list", t, e ? { trip_id: e } : {}), ut = (r, t, e, s) => m(r, "camper_travel_journal/transition_trip", t, { trip_id: e, status: s }), jt = (r, t, e, s, i = "") => m(r, "camper_travel_journal/create_trip", t, { title: e, started_at: s, destination: i }), It = (r, t, e, s) => m(r, "camper_travel_journal/update_trip", t, { trip_id: e, ...s }), zt = (r, t, e) => m(r, "camper_travel_journal/delete_trip", t, { trip_id: e }), Lt = (r, t, e, s) => m(r, "camper_travel_journal/unlink_drive", t, { trip_id: e, drive_id: s }), Ft = (r, t, e, s) => m(r, "camper_travel_journal/link_drives", t, { trip_id: e, drive_ids: s }), Bt = (r, t, e, s) => m(r, "camper_travel_journal/create_expense", t, { trip_id: e, ...s }), qt = (r, t, e, s) => m(r, "camper_travel_journal/update_expense", t, { expense_id: e, ...s }), Kt = (r, t, e) => m(r, "camper_travel_journal/delete_expense", t, { expense_id: e }), Vt = {
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
  statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" }
}, Wt = {
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
  statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" }
};
function $(r) {
  return (r?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? Vt : Wt;
}
function O(r, t) {
  const e = (t?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Date(r).toLocaleDateString(e);
}
function $t(r, t) {
  return $(t).statuses[r] ?? r;
}
function it(r, t) {
  return $(t).categories[r] ?? r;
}
class Zt extends K {
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
        this.snapshot = await pt(this.hass, this.vehicleId);
      } catch {
        this.error = $(this.hass).loadError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  async setStatus(t) {
    const e = this.snapshot?.trips[0];
    if (!(!this.hass || !e))
      try {
        await ut(this.hass, this.vehicleId, e.id, t), await this.refresh();
      } catch {
        this.error = $(this.hass).statusError, this.requestUpdate();
      }
  }
  render() {
    const t = $(this.hass), e = this.snapshot?.trips[0], s = (this.snapshot?.drives ?? []).reduce((n, a) => n + a.distance_m, 0) / 1e3, i = (this.snapshot?.expense_summary?.total_minor ?? 0) / 100;
    return l`<ha-card><h2>${e?.title ?? t.title}</h2>${this.error ? l`<p class="error" role="alert">${this.error}</p>` : e ? l`<p class="muted">${e.destination || t.noDestination} · ${$t(e.status, this.hass)} · ${O(e.started_at, this.hass)}${e.ended_at ? ` – ${O(e.ended_at, this.hass)}` : ""}</p><div class="grid"><div class="metric"><span class="muted">${t.distance}</span><span class="value">${s.toFixed(1)} km</span></div><div class="metric"><span class="muted">${t.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${t.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${t.costs}</span><span class="value">${i.toFixed(2)} €</span></div></div><div class="actions">${e.status === "planned" || e.status === "paused" ? l`<button @click=${() => this.setStatus("active")}>${t.resume}</button>` : ""}${e.status === "active" ? l`<button class="secondary" @click=${() => this.setStatus("paused")}>${t.pause}</button><button @click=${() => this.setStatus("completed")}>${t.complete}</button>` : ""}</div>` : l`<p class="muted">${t.noTrip}</p>`}${this.loading ? l`<p class="muted">${t.loading}</p>` : ""}</ha-card>`;
  }
}
dt("camper-travel-journal-summary-card", Zt);
const Jt = ["camping", "fuel", "toll", "parking", "food", "activities", "other"];
class mt extends K {
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
        this.snapshot = await pt(this.hass, this.vehicleId, this.selected || void 0), this.requestUpdate();
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
        await jt(this.hass, this.vehicleId, this.tripTitle, (/* @__PURE__ */ new Date()).toISOString(), this.destination), this.tripTitle = "", this.destination = "", await this.refresh();
      } catch {
        this.fail($(this.hass).tripCreateError);
      }
  }
  async editTrip(t) {
    if (!this.hass) return;
    const e = $(this.hass), s = window.prompt(e.tripName, t.title);
    if (!(s === null || !s.trim()))
      try {
        await It(this.hass, this.vehicleId, t.id, { title: s }), await this.refresh();
      } catch {
        this.fail(e.tripEditError);
      }
  }
  async removeTrip(t) {
    if (!this.hass) return;
    const e = $(this.hass);
    if (window.confirm(e.tripDeleteConfirm))
      try {
        await zt(this.hass, this.vehicleId, t), this.selected === t && (this.selected = ""), await this.refresh();
      } catch {
        this.fail(e.tripDeleteError);
      }
  }
  async changeStatus(t, e) {
    if (this.hass)
      try {
        await ut(this.hass, this.vehicleId, t, e), await this.refresh();
      } catch {
        this.fail($(this.hass).statusError);
      }
  }
  async assignDrive(t, e) {
    if (this.hass)
      try {
        await Ft(this.hass, this.vehicleId, t, [e]), await this.refresh();
      } catch {
        this.fail($(this.hass).driveAssignError);
      }
  }
  async addExpense(t) {
    if (!(!this.hass || !this.amount))
      try {
        await Bt(this.hass, this.vehicleId, t, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: Math.round(Number(this.amount) * 100), currency: "EUR" }), this.amount = "", await this.refresh();
      } catch {
        this.fail($(this.hass).expenseCreateError);
      }
  }
  async removeExpense(t) {
    if (!this.hass) return;
    const e = $(this.hass);
    if (window.confirm(e.expenseDeleteConfirm))
      try {
        await Kt(this.hass, this.vehicleId, t), await this.refresh();
      } catch {
        this.fail(e.expenseDeleteError);
      }
  }
  async editExpense(t) {
    if (!this.hass) return;
    const e = $(this.hass), s = window.prompt(e.amount, (t.amount_minor / 100).toFixed(2));
    if (s === null) return;
    const i = Math.round(Number(s) * 100);
    if (!(!Number.isFinite(i) || i < 0))
      try {
        await qt(this.hass, this.vehicleId, t.id, { amount_minor: i }), await this.refresh();
      } catch {
        this.fail(e.expenseEditError);
      }
  }
  render() {
    const t = $(this.hass), e = this.snapshot?.trips ?? [], s = this.snapshot?.expenses ?? [];
    return l`<ha-card><h2>${t.manager}</h2>${this.error ? l`<p class="error" role="alert">${this.error}</p>` : ""}<section><h3>${t.newTrip}</h3><div class="actions"><input aria-label=${t.tripName} placeholder=${t.tripName} .value=${this.tripTitle} @input=${(i) => this.tripTitle = i.target.value}><input aria-label=${t.destination} placeholder=${t.destination} .value=${this.destination} @input=${(i) => this.destination = i.target.value}><button @click=${() => this.addTrip()}>${t.create}</button></div></section><section><h3>${t.trips}</h3>${e.length ? e.map((i) => l`<article class="trip"><div class="row"><strong>${i.title}</strong><span class="muted">${i.destination || ""} · ${$t(i.status, this.hass)}</span></div><div class="actions"><button class="secondary" @click=${() => this.editTrip(i)}>${t.edit}</button><button class="secondary" @click=${() => this.removeTrip(i.id)}>${t.remove}</button>${i.status === "planned" || i.status === "paused" ? l`<button @click=${() => this.changeStatus(i.id, "active")}>${t.resume}</button>` : ""}${i.status === "active" ? l`<button class="secondary" @click=${() => this.changeStatus(i.id, "paused")}>${t.pause}</button><button @click=${() => this.changeStatus(i.id, "completed")}>${t.complete}</button>` : ""}<button class="secondary" @click=${() => {
      this.selected = i.id, this.refresh();
    }}>${t.details}</button></div>${this.selected === i.id ? l`<div class="details"><h4>${t.assignedDrives}</h4>${(this.snapshot?.drives ?? []).map((n) => l`<div class="row"><span>${O(n.started_at, this.hass)} · ${(n.distance_m / 1e3).toFixed(1)} km</span>${n.trip_id === i.id ? l`<button class="link" @click=${() => this.hass && Lt(this.hass, this.vehicleId, i.id, n.id).then(() => this.refresh())}>${t.unassign}</button>` : ""}</div>`)}${(this.snapshot?.available_drives ?? []).length ? l`<h4>${t.freeDrives}</h4>${this.snapshot?.available_drives?.map((n) => l`<div class="row"><span>${O(n.started_at, this.hass)} · ${(n.distance_m / 1e3).toFixed(1)} km</span><button class="link" @click=${() => this.assignDrive(i.id, n.id)}>${t.assign}</button></div>`)}` : ""}<h4>${t.expenses}</h4><div class="actions"><input aria-label=${t.amount} type="number" min="0" step="0.01" placeholder="EUR" .value=${this.amount} @input=${(n) => this.amount = n.target.value}><select aria-label=${t.category} .value=${this.category} @change=${(n) => this.category = n.target.value}>${Jt.map((n) => l`<option value=${n}>${it(n, this.hass)}</option>`)}</select><button @click=${() => this.addExpense(i.id)}>${t.save}</button></div>${s.map((n) => l`<div class="row"><span>${it(n.category, this.hass)}: ${(n.amount_minor / 100).toFixed(2)} ${n.currency}</span><span><button class="link" @click=${() => this.editExpense(n)}>${t.edit}</button><button class="link" @click=${() => this.removeExpense(n.id)}>${t.remove}</button></span></div>`)}</div>` : ""}</article>`) : l`<p class="muted">${t.noTrip}</p>`}</section></ha-card>`;
  }
}
mt.styles = [K.styles, nt`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}`];
dt("camper-travel-journal-manager-card", mt);
const Gt = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal Übersicht", description: "Kompakte Reiseübersicht" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal Verwaltung", description: "Reiseverwaltung" }
];
window.customCards ??= [];
for (const r of Gt) window.customCards.some((t) => t.type === r.type) || window.customCards.push(r);
