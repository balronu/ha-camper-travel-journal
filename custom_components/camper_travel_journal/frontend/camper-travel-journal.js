const Xe = globalThis, en = Xe.ShadowRoot && (Xe.ShadyCSS === void 0 || Xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nn = /* @__PURE__ */ Symbol(), Ts = /* @__PURE__ */ new WeakMap();
let Us = class {
  constructor(n, r, o) {
    if (this._$cssResult$ = !0, o !== nn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = n, this.t = r;
  }
  get styleSheet() {
    let n = this.o;
    const r = this.t;
    if (en && n === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (n = Ts.get(r)), n === void 0 && ((this.o = n = new CSSStyleSheet()).replaceSync(this.cssText), o && Ts.set(r, n));
    }
    return n;
  }
  toString() {
    return this.cssText;
  }
};
const Hs = (c) => new Us(typeof c == "string" ? c : c + "", void 0, nn), Mt = (c, ...n) => {
  const r = c.length === 1 ? c[0] : n.reduce((o, h, u) => o + ((m) => {
    if (m._$cssResult$ === !0) return m.cssText;
    if (typeof m == "number") return m;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + m + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(h) + c[u + 1], c[0]);
  return new Us(r, c, nn);
}, La = (c, n) => {
  if (en) c.adoptedStyleSheets = n.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of n) {
    const o = document.createElement("style"), h = Xe.litNonce;
    h !== void 0 && o.setAttribute("nonce", h), o.textContent = r.cssText, c.appendChild(o);
  }
}, $s = en ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((n) => {
  let r = "";
  for (const o of n.cssRules) r += o.cssText;
  return Hs(r);
})(c) : c;
const { is: ka, defineProperty: Ia, getOwnPropertyDescriptor: Ca, getOwnPropertyNames: Aa, getOwnPropertySymbols: Da, getPrototypeOf: Ma } = Object, ei = globalThis, Ps = ei.trustedTypes, za = Ps ? Ps.emptyScript : "", Oa = ei.reactiveElementPolyfillSupport, Te = (c, n) => c, Ji = { toAttribute(c, n) {
  switch (n) {
    case Boolean:
      c = c ? za : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, n) {
  let r = c;
  switch (n) {
    case Boolean:
      r = c !== null;
      break;
    case Number:
      r = c === null ? null : Number(c);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(c);
      } catch {
        r = null;
      }
  }
  return r;
} }, js = (c, n) => !ka(c, n), Ss = { attribute: !0, type: String, converter: Ji, reflect: !1, useDefault: !1, hasChanged: js };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ei.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ee = class extends HTMLElement {
  static addInitializer(n) {
    this._$Ei(), (this.l ??= []).push(n);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(n, r = Ss) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(n) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(n, r), !r.noAccessor) {
      const o = /* @__PURE__ */ Symbol(), h = this.getPropertyDescriptor(n, o, r);
      h !== void 0 && Ia(this.prototype, n, h);
    }
  }
  static getPropertyDescriptor(n, r, o) {
    const { get: h, set: u } = Ca(this.prototype, n) ?? { get() {
      return this[r];
    }, set(m) {
      this[r] = m;
    } };
    return { get: h, set(m) {
      const x = h?.call(this);
      u?.call(this, m), this.requestUpdate(n, x, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(n) {
    return this.elementProperties.get(n) ?? Ss;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Te("elementProperties"))) return;
    const n = Ma(this);
    n.finalize(), n.l !== void 0 && (this.l = [...n.l]), this.elementProperties = new Map(n.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Te("properties"))) {
      const r = this.properties, o = [...Aa(r), ...Da(r)];
      for (const h of o) this.createProperty(h, r[h]);
    }
    const n = this[Symbol.metadata];
    if (n !== null) {
      const r = litPropertyMetadata.get(n);
      if (r !== void 0) for (const [o, h] of r) this.elementProperties.set(o, h);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, o] of this.elementProperties) {
      const h = this._$Eu(r, o);
      h !== void 0 && this._$Eh.set(h, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(n) {
    const r = [];
    if (Array.isArray(n)) {
      const o = new Set(n.flat(1 / 0).reverse());
      for (const h of o) r.unshift($s(h));
    } else n !== void 0 && r.push($s(n));
    return r;
  }
  static _$Eu(n, r) {
    const o = r.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof n == "string" ? n.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((n) => n(this));
  }
  addController(n) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(n), this.renderRoot !== void 0 && this.isConnected && n.hostConnected?.();
  }
  removeController(n) {
    this._$EO?.delete(n);
  }
  _$E_() {
    const n = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const o of r.keys()) this.hasOwnProperty(o) && (n.set(o, this[o]), delete this[o]);
    n.size > 0 && (this._$Ep = n);
  }
  createRenderRoot() {
    const n = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return La(n, this.constructor.elementStyles), n;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((n) => n.hostConnected?.());
  }
  enableUpdating(n) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((n) => n.hostDisconnected?.());
  }
  attributeChangedCallback(n, r, o) {
    this._$AK(n, o);
  }
  _$ET(n, r) {
    const o = this.constructor.elementProperties.get(n), h = this.constructor._$Eu(n, o);
    if (h !== void 0 && o.reflect === !0) {
      const u = (o.converter?.toAttribute !== void 0 ? o.converter : Ji).toAttribute(r, o.type);
      this._$Em = n, u == null ? this.removeAttribute(h) : this.setAttribute(h, u), this._$Em = null;
    }
  }
  _$AK(n, r) {
    const o = this.constructor, h = o._$Eh.get(n);
    if (h !== void 0 && this._$Em !== h) {
      const u = o.getPropertyOptions(h), m = typeof u.converter == "function" ? { fromAttribute: u.converter } : u.converter?.fromAttribute !== void 0 ? u.converter : Ji;
      this._$Em = h;
      const x = m.fromAttribute(r, u.type);
      this[h] = x ?? this._$Ej?.get(h) ?? x, this._$Em = null;
    }
  }
  requestUpdate(n, r, o, h = !1, u) {
    if (n !== void 0) {
      const m = this.constructor;
      if (h === !1 && (u = this[n]), o ??= m.getPropertyOptions(n), !((o.hasChanged ?? js)(u, r) || o.useDefault && o.reflect && u === this._$Ej?.get(n) && !this.hasAttribute(m._$Eu(n, o)))) return;
      this.C(n, r, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(n, r, { useDefault: o, reflect: h, wrapped: u }, m) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(n) && (this._$Ej.set(n, m ?? r ?? this[n]), u !== !0 || m !== void 0) || (this._$AL.has(n) || (this.hasUpdated || o || (r = void 0), this._$AL.set(n, r)), h === !0 && this._$Em !== n && (this._$Eq ??= /* @__PURE__ */ new Set()).add(n));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const n = this.scheduleUpdate();
    return n != null && await n, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [h, u] of this._$Ep) this[h] = u;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [h, u] of o) {
        const { wrapped: m } = u, x = this[h];
        m !== !0 || this._$AL.has(h) || x === void 0 || this.C(h, void 0, u, x);
      }
    }
    let n = !1;
    const r = this._$AL;
    try {
      n = this.shouldUpdate(r), n ? (this.willUpdate(r), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (o) {
      throw n = !1, this._$EM(), o;
    }
    n && this._$AE(r);
  }
  willUpdate(n) {
  }
  _$AE(n) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(n)), this.updated(n);
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
  shouldUpdate(n) {
    return !0;
  }
  update(n) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(n) {
  }
  firstUpdated(n) {
  }
};
ee.elementStyles = [], ee.shadowRootOptions = { mode: "open" }, ee[Te("elementProperties")] = /* @__PURE__ */ new Map(), ee[Te("finalized")] = /* @__PURE__ */ new Map(), Oa?.({ ReactiveElement: ee }), (ei.reactiveElementVersions ??= []).push("2.1.2");
const sn = globalThis, Es = (c) => c, Je = sn.trustedTypes, Ls = Je ? Je.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, Ws = "$lit$", It = `lit$${Math.random().toFixed(9).slice(2)}$`, qs = "?" + It, Na = `<${qs}>`, jt = document, Pe = () => jt.createComment(""), Se = (c) => c === null || typeof c != "object" && typeof c != "function", rn = Array.isArray, Ra = (c) => rn(c) || typeof c?.[Symbol.iterator] == "function", Hi = `[ \t
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ks = /-->/g, Is = />/g, Ft = RegExp(`>|${Hi}(?:([^\\s"'>=/]+)(${Hi}*=${Hi}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cs = /'/g, As = /"/g, Gs = /^(?:script|style|textarea|title)$/i, Ba = (c) => (n, ...r) => ({ _$litType$: c, strings: n, values: r }), _ = Ba(1), ie = /* @__PURE__ */ Symbol.for("lit-noChange"), X = /* @__PURE__ */ Symbol.for("lit-nothing"), Ds = /* @__PURE__ */ new WeakMap(), Ut = jt.createTreeWalker(jt, 129);
function Vs(c, n) {
  if (!rn(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ls !== void 0 ? Ls.createHTML(n) : n;
}
const Za = (c, n) => {
  const r = c.length - 1, o = [];
  let h, u = n === 2 ? "<svg>" : n === 3 ? "<math>" : "", m = be;
  for (let x = 0; x < r; x++) {
    const p = c[x];
    let y, P, b = -1, z = 0;
    for (; z < p.length && (m.lastIndex = z, P = m.exec(p), P !== null); ) z = m.lastIndex, m === be ? P[1] === "!--" ? m = ks : P[1] !== void 0 ? m = Is : P[2] !== void 0 ? (Gs.test(P[2]) && (h = RegExp("</" + P[2], "g")), m = Ft) : P[3] !== void 0 && (m = Ft) : m === Ft ? P[0] === ">" ? (m = h ?? be, b = -1) : P[1] === void 0 ? b = -2 : (b = m.lastIndex - P[2].length, y = P[1], m = P[3] === void 0 ? Ft : P[3] === '"' ? As : Cs) : m === As || m === Cs ? m = Ft : m === ks || m === Is ? m = be : (m = Ft, h = void 0);
    const T = m === Ft && c[x + 1].startsWith("/>") ? " " : "";
    u += m === be ? p + Na : b >= 0 ? (o.push(y), p.slice(0, b) + Ws + p.slice(b) + It + T) : p + It + (b === -2 ? x : T);
  }
  return [Vs(c, u + (c[r] || "<?>") + (n === 2 ? "</svg>" : n === 3 ? "</math>" : "")), o];
};
class Ee {
  constructor({ strings: n, _$litType$: r }, o) {
    let h;
    this.parts = [];
    let u = 0, m = 0;
    const x = n.length - 1, p = this.parts, [y, P] = Za(n, r);
    if (this.el = Ee.createElement(y, o), Ut.currentNode = this.el.content, r === 2 || r === 3) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (h = Ut.nextNode()) !== null && p.length < x; ) {
      if (h.nodeType === 1) {
        if (h.hasAttributes()) for (const b of h.getAttributeNames()) if (b.endsWith(Ws)) {
          const z = P[m++], T = h.getAttribute(b).split(It), F = /([.?@])?(.*)/.exec(z);
          p.push({ type: 1, index: u, name: F[2], strings: T, ctor: F[1] === "." ? Ua : F[1] === "?" ? Ha : F[1] === "@" ? ja : ii }), h.removeAttribute(b);
        } else b.startsWith(It) && (p.push({ type: 6, index: u }), h.removeAttribute(b));
        if (Gs.test(h.tagName)) {
          const b = h.textContent.split(It), z = b.length - 1;
          if (z > 0) {
            h.textContent = Je ? Je.emptyScript : "";
            for (let T = 0; T < z; T++) h.append(b[T], Pe()), Ut.nextNode(), p.push({ type: 2, index: ++u });
            h.append(b[z], Pe());
          }
        }
      } else if (h.nodeType === 8) if (h.data === qs) p.push({ type: 2, index: u });
      else {
        let b = -1;
        for (; (b = h.data.indexOf(It, b + 1)) !== -1; ) p.push({ type: 7, index: u }), b += It.length - 1;
      }
      u++;
    }
  }
  static createElement(n, r) {
    const o = jt.createElement("template");
    return o.innerHTML = n, o;
  }
}
function ne(c, n, r = c, o) {
  if (n === ie) return n;
  let h = o !== void 0 ? r._$Co?.[o] : r._$Cl;
  const u = Se(n) ? void 0 : n._$litDirective$;
  return h?.constructor !== u && (h?._$AO?.(!1), u === void 0 ? h = void 0 : (h = new u(c), h._$AT(c, r, o)), o !== void 0 ? (r._$Co ??= [])[o] = h : r._$Cl = h), h !== void 0 && (n = ne(c, h._$AS(c, n.values), h, o)), n;
}
class Fa {
  constructor(n, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = n, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(n) {
    const { el: { content: r }, parts: o } = this._$AD, h = (n?.creationScope ?? jt).importNode(r, !0);
    Ut.currentNode = h;
    let u = Ut.nextNode(), m = 0, x = 0, p = o[0];
    for (; p !== void 0; ) {
      if (m === p.index) {
        let y;
        p.type === 2 ? y = new Le(u, u.nextSibling, this, n) : p.type === 1 ? y = new p.ctor(u, p.name, p.strings, this, n) : p.type === 6 && (y = new Wa(u, this, n)), this._$AV.push(y), p = o[++x];
      }
      m !== p?.index && (u = Ut.nextNode(), m++);
    }
    return Ut.currentNode = jt, h;
  }
  p(n) {
    let r = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(n, o, r), r += o.strings.length - 2) : o._$AI(n[r])), r++;
  }
}
class Le {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(n, r, o, h) {
    this.type = 2, this._$AH = X, this._$AN = void 0, this._$AA = n, this._$AB = r, this._$AM = o, this.options = h, this._$Cv = h?.isConnected ?? !0;
  }
  get parentNode() {
    let n = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && n?.nodeType === 11 && (n = r.parentNode), n;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(n, r = this) {
    n = ne(this, n, r), Se(n) ? n === X || n == null || n === "" ? (this._$AH !== X && this._$AR(), this._$AH = X) : n !== this._$AH && n !== ie && this._(n) : n._$litType$ !== void 0 ? this.$(n) : n.nodeType !== void 0 ? this.T(n) : Ra(n) ? this.k(n) : this._(n);
  }
  O(n) {
    return this._$AA.parentNode.insertBefore(n, this._$AB);
  }
  T(n) {
    this._$AH !== n && (this._$AR(), this._$AH = this.O(n));
  }
  _(n) {
    this._$AH !== X && Se(this._$AH) ? this._$AA.nextSibling.data = n : this.T(jt.createTextNode(n)), this._$AH = n;
  }
  $(n) {
    const { values: r, _$litType$: o } = n, h = typeof o == "number" ? this._$AC(n) : (o.el === void 0 && (o.el = Ee.createElement(Vs(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === h) this._$AH.p(r);
    else {
      const u = new Fa(h, this), m = u.u(this.options);
      u.p(r), this.T(m), this._$AH = u;
    }
  }
  _$AC(n) {
    let r = Ds.get(n.strings);
    return r === void 0 && Ds.set(n.strings, r = new Ee(n)), r;
  }
  k(n) {
    rn(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, h = 0;
    for (const u of n) h === r.length ? r.push(o = new Le(this.O(Pe()), this.O(Pe()), this, this.options)) : o = r[h], o._$AI(u), h++;
    h < r.length && (this._$AR(o && o._$AB.nextSibling, h), r.length = h);
  }
  _$AR(n = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); n !== this._$AB; ) {
      const o = Es(n).nextSibling;
      Es(n).remove(), n = o;
    }
  }
  setConnected(n) {
    this._$AM === void 0 && (this._$Cv = n, this._$AP?.(n));
  }
}
class ii {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(n, r, o, h, u) {
    this.type = 1, this._$AH = X, this._$AN = void 0, this.element = n, this.name = r, this._$AM = h, this.options = u, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = X;
  }
  _$AI(n, r = this, o, h) {
    const u = this.strings;
    let m = !1;
    if (u === void 0) n = ne(this, n, r, 0), m = !Se(n) || n !== this._$AH && n !== ie, m && (this._$AH = n);
    else {
      const x = n;
      let p, y;
      for (n = u[0], p = 0; p < u.length - 1; p++) y = ne(this, x[o + p], r, p), y === ie && (y = this._$AH[p]), m ||= !Se(y) || y !== this._$AH[p], y === X ? n = X : n !== X && (n += (y ?? "") + u[p + 1]), this._$AH[p] = y;
    }
    m && !h && this.j(n);
  }
  j(n) {
    n === X ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, n ?? "");
  }
}
class Ua extends ii {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(n) {
    this.element[this.name] = n === X ? void 0 : n;
  }
}
let Ha = class extends ii {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(n) {
    this.element.toggleAttribute(this.name, !!n && n !== X);
  }
};
class ja extends ii {
  constructor(n, r, o, h, u) {
    super(n, r, o, h, u), this.type = 5;
  }
  _$AI(n, r = this) {
    if ((n = ne(this, n, r, 0) ?? X) === ie) return;
    const o = this._$AH, h = n === X && o !== X || n.capture !== o.capture || n.once !== o.once || n.passive !== o.passive, u = n !== X && (o === X || h);
    h && this.element.removeEventListener(this.name, this, o), u && this.element.addEventListener(this.name, this, n), this._$AH = n;
  }
  handleEvent(n) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, n) : this._$AH.handleEvent(n);
  }
}
class Wa {
  constructor(n, r, o) {
    this.element = n, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(n) {
    ne(this, n);
  }
}
const qa = sn.litHtmlPolyfillSupport;
qa?.(Ee, Le), (sn.litHtmlVersions ??= []).push("3.3.3");
const Ga = (c, n, r) => {
  const o = r?.renderBefore ?? n;
  let h = o._$litPart$;
  if (h === void 0) {
    const u = r?.renderBefore ?? null;
    o._$litPart$ = h = new Le(n.insertBefore(Pe(), u), u, void 0, r ?? {});
  }
  return h._$AI(c), h;
};
const an = globalThis;
class Ht extends ee {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const n = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= n.firstChild, n;
  }
  update(n) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(n), this._$Do = Ga(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ie;
  }
}
Ht._$litElement$ = !0, Ht.finalized = !0, an.litElementHydrateSupport?.({ LitElement: Ht });
const Va = an.litElementPolyfillSupport;
Va?.({ LitElement: Ht });
(an.litElementVersions ??= []).push("4.2.2");
class zt extends Ht {
  _hass;
  config = {};
  static styles = Mt`
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
  set hass(n) {
    const r = this._hass?.connection !== n?.connection;
    this._hass = n, r && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(n) {
    this.config.vehicle_id === n.vehicle_id && this.config.trip_id === n.trip_id && this.config.journal_section === n.journal_section || (this.config = { ...n }, this.onConfigChanged(), this.requestUpdate());
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
function ni(c, n) {
  customElements.get(c) || customElements.define(c, n);
}
async function Z(c, n, r, o = {}) {
  return c.connection.sendMessagePromise({ type: n, vehicle_id: r, ...o });
}
const St = (c, n, r) => Z(c, "camper_travel_journal/list", n, r ? { trip_id: r } : {}), Ka = (c, n, r, o, h = 5e3) => Z(c, "camper_travel_journal/route", n, { trip_id: r, drive_ids: o, max_points: h }), Ks = (c, n, r, o) => Z(c, "camper_travel_journal/transition_trip", n, { trip_id: r, status: o }), Ys = (c, n, r, o = "", h = "", u = "") => Z(c, "camper_travel_journal/create_trip", n, { title: r, start_date: o || void 0, end_date: h || void 0, destination: u }), Ya = (c, n, r, o) => Z(c, "camper_travel_journal/update_trip", n, { trip_id: r, ...o }), Xa = (c, n, r) => Z(c, "camper_travel_journal/delete_trip", n, { trip_id: r }), Ja = (c, n, r, o) => Z(c, "camper_travel_journal/unlink_drive", n, { trip_id: r, drive_id: o }), Qa = (c, n, r, o) => Z(c, "camper_travel_journal/link_drives", n, { trip_id: r, drive_ids: o }), to = (c, n, r) => Z(c, "camper_travel_journal/create_manual_drive", n, r), eo = (c, n, r, o) => Z(c, "camper_travel_journal/update_manual_drive", n, { drive_id: r, ...o }), io = (c, n, r) => Z(c, "camper_travel_journal/delete_manual_drive", n, { drive_id: r }), no = (c, n, r, o) => Z(c, "camper_travel_journal/create_expense", n, { trip_id: r, ...o }), so = (c, n, r, o) => Z(c, "camper_travel_journal/update_expense", n, { expense_id: r, ...o }), Xs = (c, n, r, o) => Z(c, "camper_travel_journal/create_stop", n, { trip_id: r, ...o }), ro = (c, n, r, o) => Z(c, "camper_travel_journal/update_stop", n, { stop_id: r, ...o }), ao = (c, n, r) => Z(c, "camper_travel_journal/delete_stop", n, { stop_id: r }), Ms = (c, n, r, o, h, u) => Z(c, "camper_travel_journal/assign_interruption", n, { trip_id: r, interruption_id: o, status: h, stop_id: u }), oo = (c, n, r, o, h) => Z(c, "camper_travel_journal/create_stop_from_interruption", n, { trip_id: r, interruption_id: o, ...h }), lo = (c, n, r, o) => Z(c, "camper_travel_journal/update_overnight", n, { place_id: r, ...o }), ho = (c, n, r, o) => Z(c, "camper_travel_journal/update_rating", n, { place_id: r, ...o }), co = (c, n, r) => Z(c, "camper_travel_journal/delete_rating", n, { place_id: r }), uo = (c, n, r) => Z(c, "camper_travel_journal/generate_stop_suggestions", n, { trip_id: r }), po = (c, n, r, o, h, u) => Z(c, "camper_travel_journal/accept_stop_suggestion", n, { suggestion_id: r, trip_id: o, name: h, place_type: u }), fo = (c, n, r) => Z(c, "camper_travel_journal/dismiss_stop_suggestion", n, { suggestion_id: r }), mo = (c, n, r) => Z(c, "camper_travel_journal/delete_expense", n, { expense_id: r }), go = (c, n, r) => Z(c, "camper_travel_journal/export_pdf", n, { trip_id: r }), si = async (c) => (await c.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], _o = (c, n, r) => Z(c, "camper_travel_journal/analyze_gpx", n, { content_base64: r }), vo = (c, n, r, o, h, u) => Z(c, "camper_travel_journal/import_gpx", n, { content_base64: r, file_hash: o, drive_keys: h, trip_id: u }), Js = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], Ke = Js, yo = {
  title: "Reisetagebuch",
  noDestination: "Kein Reiseziel",
  loading: "Reisedaten werden geladen …",
  noTrip: "Noch keine Reise angelegt.",
  summaryTrip: "Reise",
  summaryChooseTrip: "Reise auswählen",
  journalEntry: "Reise auswählen oder neu anlegen",
  journalEntryHint: "Öffne eine Reise, um ihre Fahrten, Orte, Karte und Exporte zu sehen.",
  journalSelect: "Reise auswählen",
  journalChoose: "Bitte auswählen …",
  journalOpen: "Reise öffnen",
  journalOpenTrip: "Geöffnete Reise",
  journalClose: "Reise schließen / wechseln",
  journalOverview: "Reiseübersicht",
  journalDrives: "Fahrten und Unterbrechungen",
  journalStopsHint: "Bestätigte Zwischenstopps dieser Reise.",
  journalOvernightHint: "Übernachtungsplätze und ihre Bewertungen werden im Ortsbereich verwaltet.",
  noInterruptions: "Keine Unterbrechungen zwischen Fahrten.",
  notAvailable: "Nicht verfügbar",
  unsavedTripChange: "Ungespeicherte Änderungen verwerfen?",
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
  pdfExportTitle: "PDF-Reisebericht",
  pdfExportTrip: "Reise für PDF auswählen",
  pdfExport: "PDF exportieren",
  pdfExporting: "PDF wird erstellt …",
  pdfExportError: "PDF-Reisebericht konnte nicht erstellt werden.",
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
  gpxGapBoundary: "Mögliche neue Fahrt nach längerer GPS-Lücke",
  mapTitle: "Camper Travel Journal – Karte",
  mapDriveSegments: "Fahrtabschnitte",
  mapStart: "Start",
  mapEnd: "Ende",
  mapGap: "GPS-Lücke",
  mapTruncated: "Route gekürzt",
  mapNoPoints: "Keine zugeordneten GPS-Punkte für diese Reise.",
  mapRouteImageAlt: "GPS-Routenkarte",
  mapAttribution: "© OpenStreetMap-Mitwirkende · GPS-Route, keine Straßenberechnung"
}, xo = {
  title: "Travel journal",
  noDestination: "No destination",
  loading: "Loading travel data …",
  noTrip: "No trip created yet.",
  summaryTrip: "Trip",
  summaryChooseTrip: "Select trip",
  journalEntry: "Select or create a trip",
  journalEntryHint: "Open a trip to see its drives, places, map and exports.",
  journalSelect: "Select trip",
  journalChoose: "Choose …",
  journalOpen: "Open trip",
  journalOpenTrip: "Open trip",
  journalClose: "Close / switch trip",
  journalOverview: "Trip overview",
  journalDrives: "Drives and interruptions",
  journalStopsHint: "Confirmed stops belonging to this trip.",
  journalOvernightHint: "Overnight places and their ratings are managed in the places area.",
  noInterruptions: "No gaps between drives.",
  notAvailable: "Not available",
  unsavedTripChange: "Discard unsaved changes?",
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
  pdfExportTitle: "PDF travel report",
  pdfExportTrip: "Select trip for PDF",
  pdfExport: "Export PDF",
  pdfExporting: "Creating PDF …",
  pdfExportError: "The PDF travel report could not be created.",
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
  gpxGapBoundary: "Possible new drive after a long GPS gap",
  mapTitle: "Camper Travel Journal – Map",
  mapDriveSegments: "Drive segments",
  mapStart: "Start",
  mapEnd: "End",
  mapGap: "GPS gap",
  mapTruncated: "Route truncated",
  mapNoPoints: "No associated GPS points for this trip.",
  mapRouteImageAlt: "GPS route map",
  mapAttribution: "© OpenStreetMap contributors · GPS track, no road routing"
}, zs = {
  de: {
    mapTitle: "Reisekarte",
    mapVehicle: "Fahrzeug",
    mapTrip: "Reise",
    mapTotalDistance: "Kilometer",
    mapSelectedDrives: "Fahrtabschnitte",
    mapTripPeriod: "Reisezeitraum",
    mapPlaces: "Orte anzeigen",
    mapExpandSegments: "Fahrtabschnitte aufklappen",
    overnights: "Übernachtungsplätze",
    gpsSuggestions: "GPS-Stoppvorschläge",
    generateSuggestions: "Vorschläge aktualisieren",
    accept: "Übernehmen",
    dismiss: "Verwerfen",
    noSuggestions: "Keine offenen Vorschläge.",
    places: "Orte und Zwischenstopps",
    noPlaces: "Keine Orte gespeichert.",
    placeName: "Name",
    placeCategory: "Kategorie",
    placeArrived: "Ankunft",
    placeDeparted: "Abfahrt",
    placeAddress: "Adresse",
    placeDescription: "Beschreibung und Notizen",
    placeOther: "Sonstiger Ort",
    placeRestaurant: "Restaurant",
    placeFuel: "Tankpause",
    placeAttraction: "Sehenswürdigkeit",
    placeFerry: "Fähre",
    placeCampsite: "Campingplatz",
    placeRvSite: "Wohnmobilstellplatz",
    placeWildCamp: "Freistehplatz",
    ratingAdd: "Bewerten",
    ratingEdit: "Bewertung bearbeiten",
    ratingOverall: "Gesamtbewertung",
    ratingAccess: "Anfahrt",
    ratingSpace: "Platzgröße",
    ratingFacilities: "Ausstattung",
    ratingSurroundings: "Umgebung",
    ratingComment: "Kommentar",
    placeSaveError: "Ort konnte nicht gespeichert werden.",
    placeDeleteError: "Ort konnte nicht gelöscht werden.",
    ratingInvalid: "Bewertung muss zwischen 1 und 5 liegen.",
    ratingSaveError: "Bewertung konnte nicht gespeichert werden.",
    mapCollapseSegments: "Fahrtabschnitte zuklappen",
    mapSelectAll: "Alle auswählen",
    mapSelectNone: "Alle abwählen",
    sourceGpx: "GPX-importiert",
    mapAddPlace: "Ort hinzufügen",
    mapCancelPlace: "Ortserfassung abbrechen",
    mapPlaceHint: "Kartenpunkt auswählen; erst nach ausdrücklichem Speichern wird ein Ort angelegt.",
    interruption: "Unterbrechung zwischen Fahrten",
    interruptionUnconfirmed: "Nicht als Aufenthalt nachgewiesen",
    recordInterruption: "Als Aufenthalt erfassen",
    suggestedPosition: "Vorgeschlagene Position"
  },
  en: {
    mapTitle: "Travel map",
    mapVehicle: "Camper",
    mapTrip: "Trip",
    mapTotalDistance: "Kilometers",
    mapSelectedDrives: "Drive sections",
    mapTripPeriod: "Trip period",
    mapPlaces: "Show places",
    mapExpandSegments: "Expand drive sections",
    overnights: "Overnight places",
    gpsSuggestions: "GPS stop suggestions",
    generateSuggestions: "Refresh suggestions",
    accept: "Accept",
    dismiss: "Dismiss",
    noSuggestions: "No open suggestions.",
    places: "Places and stops",
    noPlaces: "No places saved.",
    placeName: "Name",
    placeCategory: "Category",
    placeArrived: "Arrival",
    placeDeparted: "Departure",
    placeAddress: "Address",
    placeDescription: "Description and notes",
    placeOther: "Other place",
    placeRestaurant: "Restaurant",
    placeFuel: "Fuel stop",
    placeAttraction: "Attraction",
    placeFerry: "Ferry",
    placeCampsite: "Campsite",
    placeRvSite: "RV site",
    placeWildCamp: "Wild camping",
    ratingAdd: "Rate",
    ratingEdit: "Edit rating",
    ratingOverall: "Overall rating",
    ratingAccess: "Access",
    ratingSpace: "Space",
    ratingFacilities: "Facilities",
    ratingSurroundings: "Surroundings",
    ratingComment: "Comment",
    placeSaveError: "Place could not be saved.",
    placeDeleteError: "Place could not be deleted.",
    ratingInvalid: "Rating must be between 1 and 5.",
    ratingSaveError: "Rating could not be saved.",
    mapCollapseSegments: "Collapse drive sections",
    mapSelectAll: "Select all",
    mapSelectNone: "Select none",
    sourceGpx: "GPX imported",
    mapAddPlace: "Add place",
    mapCancelPlace: "Cancel place capture",
    mapPlaceHint: "Select a map point; a place is created only after explicit saving.",
    interruption: "Gap between drives",
    interruptionUnconfirmed: "Not proven to be a stay",
    recordInterruption: "Record as stay",
    suggestedPosition: "Suggested position"
  }
};
function $(c) {
  const n = c?.locale?.language?.toLowerCase() ?? "de";
  return { ...n.startsWith("de") ? yo : xo, ...n.startsWith("de") ? zs.de : zs.en };
}
function Qe(c) {
  return (c?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function $e(c, n) {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c);
  if (r) {
    const [, o, h, u] = r;
    return Qe(n).startsWith("de") ? `${u}.${h}.${o}` : `${h}/${u}/${o}`;
  }
  return new Date(c).toLocaleDateString(Qe(n));
}
function K(c, n) {
  return new Date(c).toLocaleString(Qe(n), { dateStyle: "short", timeStyle: "short" });
}
function Os(c, n) {
  return new Date(c).toLocaleTimeString(Qe(n), { hour: "2-digit", minute: "2-digit" });
}
function Ct(c, n) {
  const r = Math.max(0, Math.round((c ?? 0) / 60));
  return r < 60 ? `${r} min` : `${Math.floor(r / 60)} h ${r % 60} min`;
}
function At(c, n) {
  return c.start_date || c.end_date ? [c.start_date, c.end_date].filter(Boolean).map((r) => $e(r, n)).join(" – ") || "" : c.started_at ? `${$e(c.started_at, n)}${c.ended_at ? ` – ${$e(c.ended_at, n)}` : ""}` : "";
}
function bo(c, n) {
  const r = c.start_date || c.started_at, o = c.end_date || c.ended_at;
  if (!r && !o) return "";
  const h = (y) => {
    const P = /^(\d{4})-(\d{2})-(\d{2})$/.exec(y);
    return P ? new Date(Number(P[1]), Number(P[2]) - 1, Number(P[3])) : new Date(y);
  }, u = h(r || o || ""), m = h(o || r || "");
  if (Number.isNaN(u.getTime()) || Number.isNaN(m.getTime())) return At(c, n);
  if (!(n?.locale?.language ?? "").toLowerCase().startsWith("de")) {
    const y = new Intl.DateTimeFormat("en-US", { month: "short" }), P = (z) => z.getDate(), b = (z) => z.getFullYear();
    return b(u) === b(m) && u.getMonth() === m.getMonth() ? `${y.format(u)} ${P(u)}–${P(m)}, ${b(u)}` : b(u) === b(m) ? `${y.format(u)} ${P(u)}–${y.format(m)} ${P(m)}, ${b(u)}` : `${y.format(u)} ${P(u)}, ${b(u)}–${y.format(m)} ${P(m)}, ${b(m)}`;
  }
  const p = (y) => `${String(y.getDate()).padStart(2, "0")}.${String(y.getMonth() + 1).padStart(2, "0")}.${String(y.getFullYear()).slice(-2)}`;
  return u.getFullYear() === m.getFullYear() && u.getMonth() === m.getMonth() ? `${String(u.getDate()).padStart(2, "0")}.–${p(m).slice(0, 2)}.${String(m.getMonth() + 1).padStart(2, "0")}.${String(m.getFullYear()).slice(-2)}` : `${p(u)}–${p(m)}`;
}
function se(c, n) {
  return $(n).statuses[c] ?? c;
}
function Ye(c, n) {
  return $(n).categories[c] ?? c;
}
function ji(c) {
  return Js.includes(c);
}
function Pt(c, n, r) {
  const o = (r?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(o, { style: "currency", currency: n, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100);
}
function Ns(c) {
  const n = c.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(n)) return null;
  const [r, o = ""] = n.split("."), h = Number(r) * 100 + Number((o + "00").slice(0, 2));
  return Number.isSafeInteger(h) ? h : null;
}
const Qi = "camper-travel-journal-expenses-changed", tn = "camper-travel-journal-data-changed";
function Wi(c) {
  window.dispatchEvent(new CustomEvent(Qi, { detail: c }));
}
function Q(c) {
  window.dispatchEvent(new CustomEvent(tn, { detail: c }));
}
const vt = "camper-travel-journal-active-trip-changed";
function on(c) {
  return `camper-travel-journal:${typeof window < "u" && window.location.pathname || "/"}:${c}`;
}
function ri(c) {
  if (!c || typeof window > "u") return "";
  try {
    return window.sessionStorage.getItem(on(c)) ?? "";
  } catch {
    return "";
  }
}
function Dt(c) {
  if (!(!c.vehicleId || !c.tripId || typeof window > "u")) {
    try {
      window.sessionStorage.setItem(on(c.vehicleId), c.tripId);
    } catch {
    }
    window.dispatchEvent(new CustomEvent(vt, { detail: c }));
  }
}
function wo(c, n = "journal") {
  if (!(!c || typeof window > "u")) {
    try {
      window.sessionStorage.removeItem(on(c));
    } catch {
    }
    window.dispatchEvent(new CustomEvent(vt, { detail: { vehicleId: c, tripId: "", source: n } }));
  }
}
class Qs extends zt {
  snapshot;
  trips = [];
  selectedTripId = "";
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (n) => {
    n.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  onActiveTripChanged = (n) => {
    const r = n.detail;
    r?.vehicleId !== this.vehicleId || r.tripId === this.selectedTripId || (this.selectedTripId = r.tripId, this.refresh());
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(Qi, this.onDataChanged), window.addEventListener(tn, this.onDataChanged), window.addEventListener(vt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(Qi, this.onDataChanged), window.removeEventListener(tn, this.onDataChanged), window.removeEventListener(vt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(n) {
    const r = (o, h) => (h.started_at || "").localeCompare(o.started_at || "") || h.id.localeCompare(o.id);
    return n.filter((o) => o.status === "active").sort(r)[0] ?? [...n].sort(r)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const n = await St(this.hass, this.vehicleId);
      this.trips = n.trips;
      const r = ri(this.vehicleId), h = n.trips.find((m) => m.id === (r || this.selectedTripId)) ?? this.chooseDefaultTrip(n.trips);
      this.selectedTripId = h?.id ?? "", h && Dt({ vehicleId: this.vehicleId, tripId: h.id, source: "summary" });
      const u = h ? await St(this.hass, this.vehicleId, h.id) : n;
      return this.snapshot = h ? { ...u, trips: [h] } : u, this.loadError = "", !0;
    } catch {
      return this.loadError = $(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(n) {
    const r = this.snapshot?.trips[0];
    if (!(!this.hass || !r))
      try {
        await Ks(this.hass, this.vehicleId, r.id, n), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = $(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(n) {
    !this.hass || this.loading || !this.trips.some((r) => r.id === n) || (this.selectedTripId = n, Dt({ vehicleId: this.vehicleId, tripId: n, source: "summary" }), await this.refresh());
  }
  render() {
    const n = $(this.hass), r = this.snapshot?.trips[0], o = this.trips, h = (this.snapshot?.drives ?? []).reduce((P, b) => P + b.distance_m, 0) / 1e3;
    (this.snapshot?.stops ?? []).filter((P) => P.confirmed !== !1).filter((P) => ["campsite", "rv_site", "wild_camp", "overnight"].includes(P.place_kind || P.place_type || P.stop_type)).length;
    const m = this.snapshot?.expense_summary, x = m?.mixed_currency ? n.mixedCurrency : m?.total_minor !== void 0 && m.currency ? Pt(m.total_minor, m.currency, this.hass) : Pt(0, "EUR", this.hass), p = this.loadError || this.actionError, y = r ? At(r, this.hass) : "";
    return _`<ha-card><h2>${r?.title ?? n.title}</h2>${o.length ? _`<label class="trip-selector">${n.summaryChooseTrip}<select aria-label=${n.summaryTrip} @change=${(P) => {
      this.selectTrip(P.currentTarget.value);
    }} ?disabled=${this.loading}>${o.map((P) => _`<option value=${P.id} ?selected=${P.id === this.selectedTripId}>${P.title} · ${se(P.status, this.hass)} · ${At(P, this.hass)}</option>`)}</select></label>` : ""}${p ? _`<p class="error" role="alert">${p}</p>` : r ? _`<p class="muted">${r.destination || n.noDestination} · ${se(r.status, this.hass)} · ${y}</p><div class="grid"><div class="metric"><span class="muted">${n.distance}</span><span class="value">${h.toFixed(1)} km</span></div><div class="metric"><span class="muted">${n.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${n.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${n.costs}</span><span class="value">${x}</span></div></div><div class="actions">${r.status === "planned" ? _`<button @click=${() => this.setStatus("active")}>${n.start}</button>` : r.status === "paused" ? _`<button @click=${() => this.setStatus("active")}>${n.resume}</button>` : ""}${r.status === "active" ? _`<button class="secondary" @click=${() => this.setStatus("paused")}>${n.pause}</button><button @click=${() => this.setStatus("completed")}>${n.complete}</button>` : ""}</div>` : _`<p class="muted">${n.noTrip}</p>`}${this.loading ? _`<p class="muted">${n.loading}</p>` : ""}</ha-card>`;
  }
}
Qs.styles = [zt.styles, Mt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}`];
ni("camper-travel-journal-summary-card", Qs);
class ti extends zt {
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
  category = Ke[0];
  activeTripId = "";
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
  pdfBusyTripId = "";
  vehicleName = "";
  placeName = "";
  placeType = "other";
  placeArrived = "";
  placeDeparted = "";
  placeLatitude = "";
  placeLongitude = "";
  placeDescription = "";
  placeAddress = "";
  placeSaving = !1;
  editingPlaceId = "";
  confirmingPlaceId = "";
  ratingPlaceId = "";
  ratingOverall = "";
  ratingAccess = "";
  ratingSpace = "";
  ratingFacilities = "";
  ratingSurroundings = "";
  ratingText = "";
  interruptionDriveId = "";
  suggestionEditingId = "";
  suggestionName = "GPS-Stopp";
  suggestionType = "other";
  embeddedTripId() {
    return this.config.trip_id ?? "";
  }
  embeddedSection() {
    return this.config.journal_section ?? "all";
  }
  onActiveTripChanged = (n) => {
    const r = n.detail;
    r?.vehicleId !== this.vehicleId || r.tripId === this.activeTripId || (this.activeTripId = r.tripId, this.selected = "", this.refresh());
  };
  async refreshSuggestions(n) {
    if (this.hass)
      try {
        await uo(this.hass, this.vehicleId, n), await this.refresh();
      } catch {
        this.fail($(this.hass).loadError);
      }
  }
  async acceptSuggestion(n, r) {
    if (this.hass) {
      if (this.suggestionEditingId !== n.id) {
        this.suggestionEditingId = n.id, this.suggestionName = "GPS-Stopp", this.suggestionType = "other", this.requestUpdate();
        return;
      }
      try {
        await po(this.hass, this.vehicleId, n.id, r, this.suggestionName, this.suggestionType), this.suggestionEditingId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: r });
      } catch {
        this.fail($(this.hass).loadError);
      }
    }
  }
  async dismissSuggestion(n, r) {
    if (this.hass)
      try {
        await fo(this.hass, this.vehicleId, n.id), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: r });
      } catch {
        this.fail($(this.hass).loadError);
      }
  }
  resetPlaceForm() {
    this.placeName = "", this.placeType = "other", this.placeArrived = "", this.placeDeparted = "", this.placeLatitude = "", this.placeLongitude = "", this.placeDescription = "", this.placeAddress = "", this.editingPlaceId = "", this.interruptionDriveId = "";
  }
  placePayload() {
    const n = (r) => r.trim() ? Number(r.replace(",", ".")) : void 0;
    return { name: this.placeName.trim(), place_type: this.placeType, category: this.placeType, drive_id: this.interruptionDriveId || void 0, occurred_at: new Date(this.placeArrived).toISOString(), arrived_at: new Date(this.placeArrived).toISOString(), departed_at: this.placeDeparted ? new Date(this.placeDeparted).toISOString() : void 0, latitude: n(this.placeLatitude), longitude: n(this.placeLongitude), address: this.placeAddress, description: this.placeDescription };
  }
  editPlace(n) {
    this.editingPlaceId = n.id, this.placeName = n.name, this.placeType = n.place_type || n.stop_type, this.placeArrived = n.arrived_at ? this.placeLocalDateTime(n.arrived_at) : this.placeLocalDateTime(n.occurred_at), this.placeDeparted = n.departed_at ? this.placeLocalDateTime(n.departed_at) : "", this.placeLatitude = n.latitude == null ? "" : String(n.latitude), this.placeLongitude = n.longitude == null ? "" : String(n.longitude), this.placeDescription = n.description || "", this.placeAddress = n.address || "", this.requestUpdate();
  }
  placeLocalDateTime(n) {
    const r = new Date(n), o = (h) => String(h).padStart(2, "0");
    return `${r.getFullYear()}-${o(r.getMonth() + 1)}-${o(r.getDate())}T${o(r.getHours())}:${o(r.getMinutes())}`;
  }
  startInterruption(n) {
    if (n.existing_place_id) {
      const o = (this.snapshot?.stops ?? []).find((h) => h.id === n.existing_place_id);
      o && this.editPlace(o);
      return;
    }
    this.editingPlaceId = "", this.interruptionDriveId = n.previous_drive_id, this.placeName = "", this.placeType = "other", this.placeArrived = this.placeLocalDateTime(n.started_at), this.placeDeparted = this.placeLocalDateTime(n.ended_at);
    const r = n.previous_end_point;
    this.placeLatitude = r ? String(r.latitude) : "", this.placeLongitude = r ? String(r.longitude) : "", this.placeDescription = "", this.placeAddress = "", this.selected = this.activeTripId, this.requestUpdate();
  }
  async savePlace(n) {
    if (!(!this.hass || this.placeSaving || !this.placeName.trim() || !this.placeArrived)) {
      this.placeSaving = !0;
      try {
        const r = this.placePayload();
        if (this.editingPlaceId) await ro(this.hass, this.vehicleId, this.editingPlaceId, r);
        else {
          const o = await Xs(this.hass, this.vehicleId, n, r);
          ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType) && await lo(this.hass, this.vehicleId, o.stop_id, { place_kind: this.placeType });
        }
        this.resetPlaceForm(), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail($(this.hass).placeSaveError ?? $(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  async removePlace(n, r) {
    if (this.hass) {
      if (this.confirmingPlaceId !== n.id) {
        this.confirmingPlaceId = n.id, this.requestUpdate();
        return;
      }
      try {
        await ao(this.hass, this.vehicleId, n.id), this.confirmingPlaceId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: r });
      } catch {
        this.fail($(this.hass).placeDeleteError ?? $(this.hass).loadError);
      }
    }
  }
  async saveRating(n, r) {
    if (!this.hass) return;
    const o = [this.ratingOverall, this.ratingAccess, this.ratingSpace, this.ratingFacilities, this.ratingSurroundings];
    if (!this.ratingOverall || o.slice(1).some((h) => h && (!/^\d$/.test(h) || Number(h) < 1 || Number(h) > 5))) return this.fail($(this.hass).ratingInvalid ?? $(this.hass).dateInvalid);
    try {
      await ho(this.hass, this.vehicleId, n, { overall: Number(this.ratingOverall), large_rv_access: this.ratingAccess ? Number(this.ratingAccess) : void 0, space_maneuvering: this.ratingSpace ? Number(this.ratingSpace) : void 0, facilities: this.ratingFacilities ? Number(this.ratingFacilities) : void 0, surroundings: this.ratingSurroundings ? Number(this.ratingSurroundings) : void 0, review_text: this.ratingText }), this.ratingPlaceId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: r });
    } catch {
      this.fail($(this.hass).ratingSaveError ?? $(this.hass).loadError);
    }
  }
  async removeRating(n, r) {
    if (this.hass)
      try {
        await co(this.hass, this.vehicleId, n), this.ratingPlaceId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: r });
      } catch {
        this.fail($(this.hass).ratingSaveError ?? $(this.hass).loadError);
      }
  }
  startRating(n) {
    this.ratingPlaceId = n.id, this.ratingOverall = n.rating_overall ? String(n.rating_overall) : "", this.ratingAccess = n.large_rv_access ? String(n.large_rv_access) : "", this.ratingSpace = n.space_maneuvering ? String(n.space_maneuvering) : "", this.ratingFacilities = n.facilities ? String(n.facilities) : "", this.ratingSurroundings = n.surroundings ? String(n.surroundings) : "", this.ratingText = n.review_text || "", this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(vt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(vt, this.onActiveTripChanged), super.disconnectedCallback();
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
      const n = this.embeddedTripId() || ri(this.vehicleId);
      this.activeTripId || (this.activeTripId = n);
      let r = await St(this.hass, this.vehicleId, this.activeTripId || void 0);
      const o = r.trips.find((h) => h.id === this.activeTripId) ?? r.trips.find((h) => h.status === "active") ?? r.trips[0];
      o && this.activeTripId !== o.id ? (this.activeTripId = o.id, this.embeddedTripId() || Dt({ vehicleId: this.vehicleId, tripId: this.activeTripId, source: "manager" }), r = await St(this.hass, this.vehicleId, this.activeTripId)) : o && !this.embeddedTripId() && Dt({ vehicleId: this.vehicleId, tripId: o.id, source: "manager" }), this.snapshot = r;
      try {
        const h = await si(this.hass);
        this.vehicleName = h.find((u) => u.vehicle_id === this.vehicleId)?.name || "";
      } catch {
        this.vehicleName = "";
      }
      return this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = $(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(n) {
    this.actionError = n, this.requestUpdate();
  }
  async readGPX(n) {
    const r = n.currentTarget.files?.[0];
    if (!(!r || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = r.name;
      try {
        const o = new Uint8Array(await r.arrayBuffer());
        let h = "";
        o.forEach((u) => {
          h += String.fromCharCode(u);
        }), this.gpxContent = btoa(h), this.gpxPreview = await _o(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((u) => u.key)), this.gpxTripId = this.activeTripId;
      } catch {
        this.gpxError = $(this.hass).gpxAnalyzeError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  async confirmGPX() {
    if (!(!this.hass || !this.gpxPreview || this.gpxBusy || this.gpxPreview.conflicts.duplicate_file)) {
      this.gpxBusy = !0, this.gpxError = "";
      try {
        const n = this.gpxTripId || void 0;
        await vo(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], n), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n ?? "" });
      } catch {
        this.gpxError = $(this.hass).gpxImportError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  setExpenseAmount(n) {
    this.amount = n, this.requestUpdate();
  }
  setEditingExpenseAmount(n) {
    this.editingAmount = n, this.requestUpdate();
  }
  setExpenseCategory(n) {
    if (!ji(n)) return this.fail($(this.hass).categoryInvalid);
    this.category = n, this.requestUpdate();
  }
  setEditingExpenseCategory(n) {
    if (!ji(n)) return this.fail($(this.hass).categoryInvalid);
    this.editingCategory = n, this.requestUpdate();
  }
  gpxPeriod() {
    const n = (this.gpxPreview?.points ?? []).map((r) => r.recorded_at).sort();
    return n.length ? { start: n[0], end: n[n.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((n) => this.gpxSelected.has(n.key)).reduce((n, r) => n + r.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(n) {
    const r = this.gpxPeriod();
    if (!r || !n || !n.start_date && !n.end_date) return !1;
    const o = r.start.slice(0, 10), h = r.end.slice(0, 10);
    return !!(n.start_date && o < n.start_date || n.end_date && h > n.end_date);
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail($(this.hass).dateInvalid);
      try {
        await Ys(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: this.activeTripId });
      } catch {
        this.fail($(this.hass).tripCreateError);
      }
    }
  }
  startTripEdit(n) {
    this.actionError = "", this.editingTripId = n.id, this.editingTripTitle = n.title, this.editingDestination = n.destination || "", this.editingStartDate = n.start_date || "", this.editingEndDate = n.end_date || "", this.requestUpdate();
  }
  cancelTripEdit() {
    this.editingTripId = "", this.actionError = "", this.requestUpdate();
  }
  async saveTrip(n) {
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail($(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail($(this.hass).dateInvalid);
    try {
      await Ya(this.hass, this.vehicleId, n.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n.id });
    } catch {
      this.fail($(this.hass).tripEditError);
    }
  }
  async removeTrip(n) {
    if (this.hass) {
      if (this.confirmingTripId !== n) {
        this.confirmingTripId = n, this.requestUpdate();
        return;
      }
      try {
        await Xa(this.hass, this.vehicleId, n), this.confirmingTripId = "", this.selected === n && (this.selected = ""), this.activeTripId === n && (this.activeTripId = ""), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail($(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(n, r) {
    if (this.hass)
      try {
        await Ks(this.hass, this.vehicleId, n, r), this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail($(this.hass).statusError);
      }
  }
  async assignDrive(n, r) {
    if (this.hass)
      try {
        await Qa(this.hass, this.vehicleId, n, [r]), this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail($(this.hass).driveAssignError);
      }
  }
  async unassignDrive(n, r) {
    if (this.hass)
      try {
        await Ja(this.hass, this.vehicleId, n, r), this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail($(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(n) {
    this.selected = this.selected === n ? "" : n, this.selected ? (this.activeTripId = n, Dt({ vehicleId: this.vehicleId, tripId: n, source: "manager" }), this.refresh()) : this.requestUpdate();
  }
  async addManualDrive(n) {
    if (!this.hass || this.manualSaving) return;
    const r = Number(this.manualDistanceKm.replace(",", ".")), o = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(r) || r < 0 || o !== void 0 && (!Number.isInteger(o) || o < 0)) return this.fail($(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await to(this.hass, this.vehicleId, { trip_id: n, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: r, ...o === void 0 ? {} : { duration_minutes: o } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
    } catch {
      this.fail($(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(n) {
    const r = new Date(n), o = (h) => String(h).padStart(2, "0");
    return `${r.getFullYear()}-${o(r.getMonth() + 1)}-${o(r.getDate())}T${o(r.getHours())}:${o(r.getMinutes())}`;
  }
  startManualDriveEdit(n) {
    this.actionError = "", this.editingDriveId = n.id, this.editingDriveOccurredAt = this.localDateTime(n.started_at), this.editingDriveStartLocation = n.start_label || "", this.editingDriveEndLocation = n.end_label || "", this.editingDriveDistanceKm = (n.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = n.duration_seconds ? String(Math.round(n.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(n, r) {
    if (!this.hass || this.driveSavingId) return;
    const o = Number(this.editingDriveDistanceKm.replace(",", ".")), h = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(o) || o < 0 || h !== void 0 && (!Number.isInteger(h) || h < 0)) return this.fail($(this.hass).dateInvalid);
    this.driveSavingId = n.id;
    try {
      await eo(this.hass, this.vehicleId, n.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: o, ...h === void 0 ? {} : { duration_minutes: h } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: r });
    } catch {
      this.fail($(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(n, r) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== r) {
        this.confirmingDriveId = r, this.requestUpdate();
        return;
      }
      this.driveSavingId = r;
      try {
        await io(this.hass, this.vehicleId, r), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail($(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(n) {
    if (!this.hass) return;
    const r = $(this.hass), o = Ns(this.amount);
    if (o === null) return this.fail(r.amountInvalid);
    try {
      await no(this.hass, this.vehicleId, n, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: o, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", Wi({ vehicleId: this.vehicleId, tripId: n }));
    } catch {
      this.fail(r.expenseCreateError);
    }
  }
  startExpenseEdit(n) {
    this.actionError = "", this.editingExpenseId = n.id, this.editingAmount = (n.amount_minor / 100).toFixed(2), this.editingCategory = n.category, this.requestUpdate();
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.actionError = "", this.requestUpdate();
  }
  async saveExpense(n) {
    if (!this.hass || this.expenseSavingId) return;
    const r = $(this.hass), o = Ns(this.editingAmount);
    if (o === null) return this.fail(r.amountInvalid);
    if (!ji(this.editingCategory)) return this.fail(r.categoryInvalid);
    this.expenseSavingId = n.id;
    try {
      await so(this.hass, this.vehicleId, n.id, { amount_minor: o, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), Wi({ vehicleId: this.vehicleId, tripId: n.trip_id ?? this.activeTripId }));
    } catch {
      this.fail(r.expenseEditError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  async removeExpense(n) {
    if (!(!this.hass || this.expenseSavingId)) {
      if (this.confirmingExpenseId !== n) {
        this.confirmingExpenseId = n, this.requestUpdate();
        return;
      }
      this.expenseSavingId = n;
      try {
        await mo(this.hass, this.vehicleId, n), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && Wi({ vehicleId: this.vehicleId, tripId: this.activeTripId });
      } catch {
        this.fail($(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(n) {
    const r = [...Ke];
    return n && !r.includes(n) && r.unshift(n), r;
  }
  async downloadPdf(n) {
    if (!(!this.hass || this.pdfBusyTripId)) {
      this.pdfBusyTripId = n.id, this.actionError = "", this.requestUpdate();
      try {
        const r = await go(this.hass, this.vehicleId, n.id), o = atob(r.pdf_base64), h = Uint8Array.from(o, (x) => x.charCodeAt(0)), u = URL.createObjectURL(new Blob([h], { type: r.content_type })), m = document.createElement("a");
        m.href = u, m.download = r.filename, m.click(), window.setTimeout(() => URL.revokeObjectURL(u), 1e3);
      } catch {
        this.fail($(this.hass).pdfExportError);
      } finally {
        this.pdfBusyTripId = "", this.requestUpdate();
      }
    }
  }
  renderExpense(n, r) {
    const o = this.editingExpenseId === n.id, h = this.expenseSavingId === n.id;
    return _`<div class="expense-row">${o ? _`<form class="expense-form" @submit=${(u) => {
      u.preventDefault(), this.saveExpense(n);
    }}><select aria-label=${r.category} .value=${this.editingCategory} @change=${(u) => this.setEditingExpenseCategory(u.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((u) => _`<option value=${u}>${Ye(u, this.hass)}</option>`)}</select><input aria-label=${r.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(u) => this.setEditingExpenseAmount(u.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${h}>${h ? r.saving : r.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${h}>${r.cancel}</button></div></form>` : _`<span>${Ye(n.category, this.hass)}: ${Pt(n.amount_minor, n.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(n)} ?disabled=${!!this.expenseSavingId}>${r.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(n.id)}>${this.confirmingExpenseId === n.id ? r.confirmDelete : r.remove}</button></span>`}</div>`;
  }
  renderDrive(n, r, o) {
    const h = n.source === "manual" ? o.sourceManual : n.source === "gpx" ? o.sourceGpx ?? o.sourceGps : o.sourceGps, u = `${o.driveStart}: ${K(n.started_at, this.hass)} · ${o.driveEnd}: ${n.ended_at ? K(n.ended_at, this.hass) : "–"}`;
    if (this.editingDriveId === n.id) return _`<form class="form-grid drive-edit-form" @submit=${(p) => {
      p.preventDefault(), this.saveManualDrive(n, r);
    }}><label>${o.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(p) => this.editingDriveOccurredAt = p.currentTarget.value}></label><input aria-label=${o.startLocation} .value=${this.editingDriveStartLocation} @input=${(p) => this.editingDriveStartLocation = p.currentTarget.value}><input aria-label=${o.endLocation} .value=${this.editingDriveEndLocation} @input=${(p) => this.editingDriveEndLocation = p.currentTarget.value}><input aria-label=${o.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(p) => this.editingDriveDistanceKm = p.currentTarget.value}><input aria-label=${o.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(p) => this.editingDriveDurationMinutes = p.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === n.id}>${this.driveSavingId === n.id ? o.saving : o.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${o.cancel}</button></form>`;
    const m = n.trip_id === r ? _`<button type="button" class="link" @click=${() => this.unassignDrive(r, n.id)}>${o.unassign}</button>` : _`<button type="button" class="link" @click=${() => this.assignDrive(r, n.id)}>${o.assign}</button>`, x = n.source === "manual" ? _`<button type="button" class="link" @click=${() => this.startManualDriveEdit(n)} ?disabled=${!!this.driveSavingId}>${o.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(r, n.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === n.id ? o.confirmDelete : o.remove}</button>` : "";
    return _`<div class="drive-row"><div><strong>${h}</strong> · ${u}${n.start_label || n.end_label ? _`<br><span class="muted">${n.start_label || "–"} → ${n.end_label || "–"}</span>` : ""}<br><span class="muted">${(n.distance_m / 1e3).toFixed(1)} km · ${n.duration_seconds ? Ct(n.duration_seconds, this.hass) : "–"} · ${n.assignment_status === "assigned" ? o.assignedDrives : o.freeDrives}</span></div><span class="actions">${x}${m}</span></div>`;
  }
  renderInterruptions(n, r) {
    const o = this.snapshot?.interruptions ?? [];
    return _`<section class="place-section"><details open><summary><strong>${n.interruption ?? "Unterbrechungen zwischen Fahrten"}</strong><span>${o.length}</span></summary>${o.length ? o.map((h) => _`<article class="interruption-row"><div><strong>${K(h.started_at, this.hass)} → ${K(h.ended_at, this.hass)}</strong><span class="muted">${Ct(h.duration_seconds, this.hass)} · ${n.interruptionUnconfirmed ?? "Nicht als Aufenthalt nachgewiesen"}</span></div>${h.existing_place_id ? _`<button type="button" class="link" @click=${() => this.startInterruption(h)}>${n.edit}</button>` : _`<button type="button" @click=${() => this.startInterruption(h)}>${n.recordInterruption ?? "Als Aufenthalt erfassen"}</button>`}</article>`) : _`<p class="muted">${n.noPlaces ?? "Keine Unterbrechungen zwischen Fahrten."}</p>`}</details></section>`;
  }
  renderGpx(n, r, o) {
    const h = !!this.embeddedTripId(), u = r.find((p) => p.id === this.gpxTripId), m = this.gpxPeriod(), x = this.gpxTripPeriodWarning(u);
    return _`<section class="gpx-import gpx-explicit"><h3>${n.gpxImport}</h3><p class="muted"><strong>${h ? n.gpxTargetTrip ?? "Reise" : n.gpxVehicle}:</strong> ${h ? u?.title || "" : this.vehicleName || n.editorVehicle}</p>${h ? "" : _`<label>${n.gpxTargetTrip}<select aria-label=${n.gpxTargetTrip} .value=${this.gpxTripId} @change=${(p) => {
      this.gpxTripId = p.currentTarget.value, this.requestUpdate();
    }}><option value="">${n.gpxNoTrip}</option>${r.map((p) => _`<option value=${p.id}>${p.title} · ${se(p.status, this.hass)} · ${At(p, this.hass) || n.period}</option>`)}</select></label>`}<input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(p) => this.readGPX(p)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || n.gpxPrivacy}</p>${this.gpxError ? _`<p class="error" role="alert">${this.gpxError}</p>` : ""}${o ? _`<div class="gpx-preview"><strong>${o.drives.length} ${n.gpxSections}, ${o.points.length} ${n.gpxPoints}</strong>${m ? _`<p class="muted">${n.gpxPeriod}: ${K(m.start, this.hass)} – ${K(m.end, this.hass)}</p>` : ""}${x ? _`<p class="warning" role="alert">${n.gpxPeriodWarning}</p>` : ""}<h3>${n.gpxSummary}</h3><p class="muted">${o.points.length} ${n.gpxPoints}, ${this.gpxSelected.size} ${n.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${n.gpxDistance}, ${u?.title || n.gpxNoTrip}</p><div class="gpx-drive-list">${o.drives.map((p) => _`<label><input type="checkbox" .checked=${this.gpxSelected.has(p.key)} @change=${(y) => {
      y.currentTarget.checked ? this.gpxSelected.add(p.key) : this.gpxSelected.delete(p.key), this.requestUpdate();
    }}> ${K(p.started_at, this.hass)} – ${K(p.ended_at, this.hass)} · ${(p.distance_m / 1e3).toFixed(1)} km · ${Ct(p.duration_seconds, this.hass)}</label>`)}</div>${o.warnings.length ? _`<p class="muted">${n.gpxWarnings}: ${o.warnings.map((p) => p === "gpx_gap_possible_drive_boundary" ? n.gpxGapBoundary : p).join(", ")}</p>` : ""}${o.conflicts.duplicate_file ? _`<p class="error" role="alert">${n.gpxDuplicate}</p>` : _`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? n.saving : n.gpxConfirm}</button>`}</div>` : ""}</section>`;
  }
  renderPdfExport(n, r) {
    if (!r.length) return "";
    const o = r.some((u) => u.id === this.activeTripId) ? this.activeTripId : r[0].id, h = r.find((u) => u.id === o) ?? r[0];
    return _`<section class="pdf-export"><h3>${n.pdfExportTitle}</h3><p class="muted">${h.title} · ${At(h, this.hass)}</p><div class="pdf-export-row"><button type="button" @click=${() => {
      this.downloadPdf(h);
    }} ?disabled=${!!this.pdfBusyTripId}>${this.pdfBusyTripId ? n.pdfExporting : n.pdfExport}</button></div></section>`;
  }
  renderSuggestions(n, r) {
    const o = this.snapshot?.stop_suggestions ?? [];
    return _`<section class="place-section"><h3>${n.gpsSuggestions ?? "GPS-Stoppvorschläge"}</h3><button type="button" @click=${() => {
      this.refreshSuggestions(r);
    }}>${n.generateSuggestions ?? "Vorschläge aktualisieren"}</button>${o.length ? _`<ul>${o.map((h) => _`<li>${K(h.arrived_at, this.hass)} – ${K(h.departed_at || h.arrived_at, this.hass)}${this.suggestionEditingId === h.id ? _`<div class="form-grid"><input aria-label=${n.placeName ?? "Name"} .value=${this.suggestionName} @input=${(u) => this.suggestionName = u.currentTarget.value}><select aria-label=${n.placeCategory ?? "Kategorie"} .value=${this.suggestionType} @change=${(u) => this.suggestionType = u.currentTarget.value}><option value="other">${n.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${n.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${n.placeFuel ?? "Tankpause"}</option><option value="campsite">${n.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${n.placeRvSite ?? "Wohnmobilstellplatz"}</option></select></div>` : ""} <button type="button" @click=${() => {
      this.acceptSuggestion(h, r);
    }}>${this.suggestionEditingId === h.id ? n.save ?? "Speichern" : n.accept ?? "Übernehmen"}</button><button type="button" class="secondary" @click=${() => {
      this.dismissSuggestion(h, r);
    }}>${n.dismiss ?? "Verwerfen"}</button></li>`)}</ul>` : _`<p class="muted">${n.noSuggestions ?? "Keine offenen Vorschläge."}</p>`}</section>`;
  }
  starPicker(n, r, o) {
    return _`<fieldset class="star-picker"><legend>${n}</legend><div role="radiogroup" aria-label=${n}>${[1, 2, 3, 4, 5].map((h) => _`<button type="button" class="star-button" role="radio" aria-label=${`${h}/5`} aria-checked=${r === String(h)} ?data-selected=${r === String(h)} @click=${() => {
      o(String(h)), this.requestUpdate();
    }} @keydown=${(u) => {
      (u.key === "ArrowRight" || u.key === "ArrowUp") && (u.preventDefault(), o(String(Math.min(5, h + 1))), this.requestUpdate()), (u.key === "ArrowLeft" || u.key === "ArrowDown") && (u.preventDefault(), o(String(Math.max(1, h - 1))), this.requestUpdate());
    }}>${r && Number(r) >= h ? "★" : "☆"}</button>`)}</div></fieldset>`;
  }
  renderPlaces(n, r) {
    const o = this.snapshot?.stops ?? [], h = _`<option value="other">${n.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${n.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${n.placeFuel ?? "Tankpause"}</option><option value="attraction">${n.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${n.placeFerry ?? "Fähre"}</option><option value="campsite">${n.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${n.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${n.placeWildCamp ?? "Freistehplatz"}</option>`;
    return _`<section class="place-section"><details open><summary><strong>${n.places ?? "Orte und Zwischenstopps"}</strong><span>${o.length}</span></summary><form class="form-grid" @submit=${(u) => {
      u.preventDefault(), this.savePlace(r);
    }}><input aria-label=${n.placeName ?? "Name"} placeholder=${n.placeName ?? "Name"} .value=${this.placeName} @input=${(u) => this.placeName = u.currentTarget.value} required><select aria-label=${n.placeCategory ?? "Kategorie"} .value=${this.placeType} @change=${(u) => this.placeType = u.currentTarget.value}>${h}</select><label>${n.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.placeArrived} @input=${(u) => this.placeArrived = u.currentTarget.value} required></label><label>${n.placeDeparted ?? "Abfahrt"}<input type="datetime-local" .value=${this.placeDeparted} @input=${(u) => this.placeDeparted = u.currentTarget.value}></label><input aria-label=${n.placeAddress ?? "Adresse"} placeholder=${n.placeAddress ?? "Adresse"} .value=${this.placeAddress} @input=${(u) => this.placeAddress = u.currentTarget.value}><input aria-label="Latitude" inputmode="decimal" placeholder="Latitude" .value=${this.placeLatitude} @input=${(u) => this.placeLatitude = u.currentTarget.value}><input aria-label="Longitude" inputmode="decimal" placeholder="Longitude" .value=${this.placeLongitude} @input=${(u) => this.placeLongitude = u.currentTarget.value}><textarea aria-label=${n.placeDescription ?? "Notizen"} placeholder=${n.placeDescription ?? "Beschreibung und Notizen"} .value=${this.placeDescription} @input=${(u) => this.placeDescription = u.currentTarget.value}></textarea><div class="actions"><button type="submit" ?disabled=${this.placeSaving}>${this.placeSaving ? n.saving : this.editingPlaceId ? n.save : n.create ?? "Anlegen"}</button>${this.editingPlaceId ? _`<button type="button" class="secondary" @click=${() => this.resetPlaceForm()}>${n.cancel}</button>` : ""}</div></form>${o.length ? _`<div class="place-list">${o.map((u) => _`<article class="place-row"><div><strong>${u.name}</strong><span class="muted">${u.place_type || u.stop_type} · ${K(u.arrived_at || u.occurred_at, this.hass)}${u.duration_seconds ? ` · ${Ct(u.duration_seconds, this.hass)}` : ""}${u.rating_overall ? ` · ${u.rating_overall}/5` : ""}</span><span>${u.description || ""}</span></div><div class="actions"><button type="button" class="link" @click=${() => this.editPlace(u)}>${n.edit}</button><button type="button" class="link" @click=${() => {
      this.removePlace(u, r);
    }}>${this.confirmingPlaceId === u.id ? n.confirmDelete : n.remove}</button><button type="button" class="link" @click=${() => this.startRating(u)}>${u.rating_overall ? n.ratingEdit ?? "Bewertung" : n.ratingAdd ?? "Bewerten"}</button></div>${this.ratingPlaceId === u.id ? _`<div class="rating-form form-grid">${this.starPicker(n.ratingOverall ?? "Gesamt", this.ratingOverall, (m) => this.ratingOverall = m)}${this.starPicker(n.ratingAccess ?? "Anfahrt", this.ratingAccess, (m) => this.ratingAccess = m)}${this.starPicker(n.ratingSpace ?? "Platzgröße", this.ratingSpace, (m) => this.ratingSpace = m)}${this.starPicker(n.ratingFacilities ?? "Ausstattung", this.ratingFacilities, (m) => this.ratingFacilities = m)}${this.starPicker(n.ratingSurroundings ?? "Umgebung", this.ratingSurroundings, (m) => this.ratingSurroundings = m)}<textarea aria-label=${n.ratingComment ?? "Kommentar"} .value=${this.ratingText} @input=${(m) => this.ratingText = m.currentTarget.value}></textarea><button type="button" @click=${() => {
      this.saveRating(u.id, r);
    }}>${n.save}</button></div>` : ""}</article>`)}</div>` : _`<p class="muted">${n.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details></section>`;
  }
  renderRatingActions(n, r) {
    const o = (this.snapshot?.stops ?? []).filter((h) => h.rating_overall);
    return o.length ? _`<section class="place-section"><details><summary><strong>${n.ratingEdit ?? "Bewertungen"}</strong><span>${o.length}</span></summary>${o.map((h) => _`<div class="row"><span>${h.name} · ${h.rating_overall}/5</span><button type="button" class="link" @click=${() => {
      this.removeRating(h.id, r);
    }}>${n.ratingRemove ?? "Bewertung löschen"}</button></div>`)}</details></section>` : "";
  }
  render() {
    const n = $(this.hass), r = this.snapshot?.trips ?? [];
    if (!this.embeddedTripId()) return _`${this.renderGpx(n, r, this.gpxPreview)}${this.renderPdfExport(n, r)}${this.activeTripId ? this.renderInterruptions(n, this.activeTripId) : ""}${this.activeTripId ? this.renderSuggestions(n, this.activeTripId) : ""}${this.activeTripId ? this.renderPlaces(n, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(n, this.activeTripId) : ""}${this.renderLegacy()}`;
    const o = this.embeddedSection();
    return _`${o === "gpx" ? this.renderGpx(n, r, this.gpxPreview) : ""}${o === "pdf" ? this.renderPdfExport(n, r) : ""}${o === "places" ? _`${this.activeTripId ? this.renderInterruptions(n, this.activeTripId) : ""}${this.activeTripId ? this.renderSuggestions(n, this.activeTripId) : ""}${this.activeTripId ? this.renderPlaces(n, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(n, this.activeTripId) : ""}` : ""}${o === "expenses" ? this.renderEmbeddedExpenses(n) : ""}`;
  }
  renderEmbeddedExpenses(n) {
    const r = this.snapshot?.expenses ?? [], o = this.snapshot?.expense_summary?.total_minor !== void 0 && this.snapshot.expense_summary.currency ? Pt(this.snapshot.expense_summary.total_minor, this.snapshot.expense_summary.currency, this.hass) : Pt(0, "EUR", this.hass);
    return _`<section class="place-section"><details><summary><strong>${n.expenses}</strong><span>${r.length}</span></summary><div class="expense-form create-form"><input aria-label=${n.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(h) => this.setExpenseAmount(h.currentTarget.value)}><select aria-label=${n.category} .value=${this.category} @change=${(h) => this.setExpenseCategory(h.currentTarget.value)}>${Ke.map((h) => _`<option value=${h}>${Ye(h, this.hass)}</option>`)}</select><button type="button" @click=${() => {
      this.addExpense(this.embeddedTripId());
    }}>${n.save}</button></div>${r.map((h) => this.renderExpense(h, n))}<p class="total"><strong>${n.total}: ${o}</strong></p></details></section>`;
  }
  renderLegacy() {
    const n = $(this.hass), r = this.snapshot?.trips ?? [], o = this.snapshot?.expenses ?? [], h = this.snapshot?.expense_summary, u = h?.mixed_currency ? n.mixedCurrency : h?.total_minor !== void 0 && h.currency ? Pt(h.total_minor, h.currency, this.hass) : Pt(0, "EUR", this.hass), m = this.loadError || this.actionError, x = this.gpxPreview;
    return _`<ha-card><h2>${n.manager}</h2>${m ? _`<p class="error" role="alert">${m}</p>` : ""}<section class="gpx-import"><h3>${n.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(p) => this.readGPX(p)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || n.gpxPrivacy}</p>${this.gpxError ? _`<p class="error" role="alert">${this.gpxError}</p>` : ""}${x ? _`<div class="gpx-preview"><strong>${x.drives.length} ${n.gpxSections}, ${x.points.length} ${n.gpxPoints}</strong><ul>${x.drives.map((p) => _`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(p.key)} @change=${(y) => {
      y.currentTarget.checked ? this.gpxSelected.add(p.key) : this.gpxSelected.delete(p.key), this.requestUpdate();
    }}> ${K(p.started_at, this.hass)} – ${K(p.ended_at, this.hass)} · ${(p.distance_m / 1e3).toFixed(1)} km · ${Ct(p.duration_seconds, this.hass)}</label></li>`)}</ul>${x.warnings.length ? _`<p class="muted">${n.gpxWarnings}: ${x.warnings.join(", ")}</p>` : ""}${x.conflicts.duplicate_file ? _`<p class="error" role="alert">${n.gpxDuplicate}</p>` : _`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? n.saving : n.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${n.newTrip}</h3><div class="form-grid"><input aria-label=${n.tripName} placeholder=${n.tripName} .value=${this.tripTitle} @input=${(p) => this.tripTitle = p.target.value}><input aria-label=${n.destination} placeholder=${n.destination} .value=${this.destination} @input=${(p) => this.destination = p.target.value}><label>${n.startDate}<input type="date" .value=${this.tripStartDate} @input=${(p) => this.tripStartDate = p.currentTarget.value}></label><label>${n.endDate}<input type="date" .value=${this.tripEndDate} @input=${(p) => this.tripEndDate = p.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${n.create}</button></div></section><section><h3>${n.trips}</h3>${r.length ? r.map((p) => _`<article class="trip"><div class="row"><strong>${p.title}</strong><span class="muted">${p.destination || ""} · ${se(p.status, this.hass)} · ${At(p, this.hass) || n.period}</span></div>${this.editingTripId === p.id ? _`<form class="form-grid" @submit=${(y) => {
      y.preventDefault(), this.saveTrip(p);
    }}><input aria-label=${n.tripName} .value=${this.editingTripTitle} @input=${(y) => this.editingTripTitle = y.currentTarget.value}><input aria-label=${n.destination} .value=${this.editingDestination} @input=${(y) => this.editingDestination = y.currentTarget.value}><label>${n.startDate}<input type="date" .value=${this.editingStartDate} @input=${(y) => this.editingStartDate = y.currentTarget.value}></label><label>${n.endDate}<input type="date" .value=${this.editingEndDate} @input=${(y) => this.editingEndDate = y.currentTarget.value}></label><button type="submit">${n.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${n.cancel}</button></form>` : _`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(p)}>${n.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(p.id)}>${this.confirmingTripId === p.id ? n.confirmDelete : n.remove}</button>${p.status === "planned" || p.status === "paused" ? _`<button type="button" @click=${() => this.changeStatus(p.id, "active")}>${n.resume}</button>` : ""}${p.status === "active" ? _`<button type="button" class="secondary" @click=${() => this.changeStatus(p.id, "paused")}>${n.pause}</button><button type="button" @click=${() => this.changeStatus(p.id, "completed")}>${n.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(p.id)}>${this.selected === p.id ? n.close : n.details}</button></div>`}${this.selected === p.id ? _`<div class="details"><h4>${n.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((y) => this.renderDrive(y, p.id, n)) : _`<p class="muted">${n.noDrives}</p>`}<h4>${n.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((y) => this.renderDrive(y, p.id, n)) : _`<p class="muted">${n.noDrives}</p>`}<h4>${n.manualDrive}</h4><div class="form-grid"><label>${n.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(y) => this.manualOccurredAt = y.currentTarget.value}></label><input aria-label=${n.startLocation} placeholder=${n.startLocation} .value=${this.manualStartLocation} @input=${(y) => this.manualStartLocation = y.currentTarget.value}><input aria-label=${n.endLocation} placeholder=${n.endLocation} .value=${this.manualEndLocation} @input=${(y) => this.manualEndLocation = y.currentTarget.value}><input aria-label=${n.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${n.distanceKm} .value=${this.manualDistanceKm} @input=${(y) => this.manualDistanceKm = y.currentTarget.value}><input aria-label=${n.durationMinutes} type="number" min="0" step="1" placeholder=${n.durationMinutes} .value=${this.manualDurationMinutes} @input=${(y) => this.manualDurationMinutes = y.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(p.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? n.saving : n.createDrive}</button></div><h4>${n.expenses}</h4><div class="expense-form create-form"><input aria-label=${n.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(y) => this.setExpenseAmount(y.currentTarget.value)}><select aria-label=${n.category} .value=${this.category} @change=${(y) => this.setExpenseCategory(y.currentTarget.value)}>${Ke.map((y) => _`<option value=${y}>${Ye(y, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(p.id)}>${n.save}</button></div>${o.map((y) => this.renderExpense(y, n))}<p class="total"><strong>${n.total}: ${u}</strong></p></div>` : ""}</article>`) : _`<p class="muted">${n.noTrip}</p>`}</section></ha-card>`;
  }
}
ti.styles = [zt.styles, Mt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
ti.styles = [...ti.styles, Mt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.interruption-row{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid var(--divider-color)}.interruption-row>div{display:grid;gap:3px;min-width:0}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}.star-picker{border:0;padding:0;margin:0;min-width:0}.star-picker legend{font-size:.9em;color:var(--secondary-text-color)}.star-picker [role=radiogroup]{display:flex;gap:2px}.star-button{min-height:38px;min-width:38px;padding:2px;background:transparent;color:var(--secondary-text-color);font-size:1.6rem;line-height:1}.star-button[data-selected]{color:var(--primary-color)}.star-button:hover{color:var(--primary-color)}@media(max-width:500px){.form-grid{grid-template-columns:1fr}.form-grid textarea{min-height:5rem}.place-section .form-grid{gap:10px}.place-section .actions{display:grid;grid-template-columns:1fr}.place-section .actions button{width:100%}.interruption-row{align-items:stretch;flex-direction:column}.interruption-row button{width:100%}.pdf-export-row button{width:100%}}`];
ni("camper-travel-journal-manager-card", ti);
const To = 1e4;
function qi() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Gi(c) {
  return c.length <= 8 ? "••••" : `${c.slice(0, 4)}…${c.slice(-4)}`;
}
function Rs(c) {
  return c?.connection ? c.connection.connected === !0 ? "available" : c.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function $o(c) {
  const n = c, r = typeof n?.code == "string" ? n.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", o = typeof n?.message == "string" ? n.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: r, errorMessage: o };
}
function Po(c, n) {
  return new Promise((r, o) => {
    const h = setTimeout(() => o(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), n);
    c.then((u) => {
      clearTimeout(h), r(u);
    }, (u) => {
      clearTimeout(h), o(u);
    });
  });
}
async function Vi(c, n, r, o) {
  const h = qi();
  try {
    const u = await Po(c.connection.sendMessagePromise(n), o);
    return { ...r(u), durationMs: Math.round(qi() - h), value: u };
  } catch (u) {
    return { state: "failed", durationMs: Math.round(qi() - h), ...$o(u) };
  }
}
function So(c) {
  return c && typeof c == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function Eo(c) {
  const n = c?.vehicles;
  return Array.isArray(n) && n.every((r) => r && typeof r == "object" && typeof r.vehicle_id == "string") ? { state: "success", structure: "ok", count: n.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function Lo(c) {
  const n = c;
  return Array.isArray(n?.trips) && Array.isArray(n?.drives) && Array.isArray(n?.stops) ? { state: "success", structure: "ok", count: n.trips.length, drivesCount: n.drives.length, stopsCount: n.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function ko(c, n, r = To) {
  const o = { state: "not_run", durationMs: null };
  if (!c?.connection) return { version: "0.3.0-beta.4", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: o, vehicles: o, trips: o, vehicleId: Gi(n) };
  const h = Rs(c), u = await Vi(c, { type: "auth/current_user" }, So, r), m = await Vi(c, { type: "camper_travel_journal/list_vehicles" }, Eo, r), x = m.value?.vehicles?.filter((re) => typeof re.vehicle_id == "string") ?? [], p = x.length === 1 ? x[0].vehicle_id : void 0, P = await Vi(c, { type: "camper_travel_journal/list", vehicle_id: p ?? n }, Lo, r), { value: b, ...z } = u, { value: T, ...F } = m, { value: M, ...Wt } = P;
  return {
    version: "0.3.0-beta.4",
    connectionBefore: h,
    connectionAfter: Rs(c),
    authentication: z,
    vehicles: F,
    trips: Wt,
    vehicleId: Gi(n),
    ...p ? { resolvedVehicleId: Gi(p) } : {}
  };
}
function Ki(c) {
  return JSON.stringify(c, null, 2);
}
function Yi(c) {
  return c.state === "success" ? "erfolgreich" : c.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const Bs = "01M4XW0KD3GQ0KASAYHQ29840P";
class Io extends Ht {
  static styles = Mt`
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
  config = { vehicle_id: Bs };
  set hass(n) {
    this._hass = n, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(n) {
    this.config = { vehicle_id: n.vehicle_id || Bs };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await ko(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const n = Ki(this.report);
    if (!navigator.clipboard?.writeText) {
      this.manualCopy = !0, this.error = "Bitte den eingeblendeten Bericht manuell auswählen und kopieren.", this.requestUpdate();
      return;
    }
    try {
      await navigator.clipboard.writeText(n), this.manualCopy = !1, this.error = "";
    } catch {
      this.manualCopy = !0, this.error = "Automatisches Kopieren ist in diesem Browser nicht verfügbar. Bitte den Bericht manuell auswählen und kopieren.";
    }
    this.requestUpdate();
  }
  selectReport() {
    this.shadowRoot?.querySelector('textarea[aria-label="Diagnosebericht zum manuellen Kopieren"]')?.select();
  }
  render() {
    const n = this.report;
    return _`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? _`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? _`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${n ? _`<dl>
        <dt>Version</dt><dd>${n.version}</dd>
        <dt>Verbindung vorher</dt><dd>${n.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${n.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${Yi(n.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${Yi(n.vehicles)}${n.vehicles.durationMs === null ? "" : ` (${n.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${Yi(n.trips)}${n.trips.durationMs === null ? "" : ` (${n.trips.durationMs} ms)`}${n.trips.state === "success" ? ` · ${n.trips.count ?? 0} Reisen / ${n.trips.drivesCount ?? 0} Fahrten / ${n.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${n.vehicles.structure === "ok" && n.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Ki(n)}</pre>${this.manualCopy ? _`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Ki(n)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${n ? "Diagnose wiederholen" : "Diagnose starten"}</button>${n ? _`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? _`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", Io);
var we = { exports: {} };
var Co = we.exports, Zs;
function Ao() {
  return Zs || (Zs = 1, (function(c, n) {
    (function(r, o) {
      o(n);
    })(Co, (function(r) {
      var o = "1.9.4";
      function h(t) {
        var e, i, s, a;
        for (i = 1, s = arguments.length; i < s; i++) {
          a = arguments[i];
          for (e in a)
            t[e] = a[e];
        }
        return t;
      }
      var u = Object.create || /* @__PURE__ */ (function() {
        function t() {
        }
        return function(e) {
          return t.prototype = e, new t();
        };
      })();
      function m(t, e) {
        var i = Array.prototype.slice;
        if (t.bind)
          return t.bind.apply(t, i.call(arguments, 1));
        var s = i.call(arguments, 2);
        return function() {
          return t.apply(e, s.length ? s.concat(i.call(arguments)) : arguments);
        };
      }
      var x = 0;
      function p(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++x), t._leaflet_id;
      }
      function y(t, e, i) {
        var s, a, l, d;
        return d = function() {
          s = !1, a && (l.apply(i, a), a = !1);
        }, l = function() {
          s ? a = arguments : (t.apply(i, arguments), setTimeout(d, e), s = !0);
        }, l;
      }
      function P(t, e, i) {
        var s = e[1], a = e[0], l = s - a;
        return t === s && i ? t : ((t - a) % l + l) % l + a;
      }
      function b() {
        return !1;
      }
      function z(t, e) {
        if (e === !1)
          return t;
        var i = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * i) / i;
      }
      function T(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function F(t) {
        return T(t).split(/\s+/);
      }
      function M(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? u(t.options) : {});
        for (var i in e)
          t.options[i] = e[i];
        return t.options;
      }
      function Wt(t, e, i) {
        var s = [];
        for (var a in t)
          s.push(encodeURIComponent(i ? a.toUpperCase() : a) + "=" + encodeURIComponent(t[a]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + s.join("&");
      }
      var re = /\{ *([\w_ -]+) *\}/g;
      function ln(t, e) {
        return t.replace(re, function(i, s) {
          var a = e[s];
          if (a === void 0)
            throw new Error("No value provided for variable " + i);
          return typeof a == "function" && (a = a(e)), a;
        });
      }
      var ct = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function ai(t, e) {
        for (var i = 0; i < t.length; i++)
          if (t[i] === e)
            return i;
        return -1;
      }
      var ke = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function oi(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var hn = 0;
      function cn(t) {
        var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - hn));
        return hn = e + i, window.setTimeout(t, i);
      }
      var li = window.requestAnimationFrame || oi("RequestAnimationFrame") || cn, dn = window.cancelAnimationFrame || oi("CancelAnimationFrame") || oi("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function et(t, e, i) {
        if (i && li === cn)
          t.call(e);
        else
          return li.call(window, m(t, e));
      }
      function at(t) {
        t && dn.call(window, t);
      }
      var ir = {
        __proto__: null,
        extend: h,
        create: u,
        bind: m,
        get lastId() {
          return x;
        },
        stamp: p,
        throttle: y,
        wrapNum: P,
        falseFn: b,
        formatNum: z,
        trim: T,
        splitWords: F,
        setOptions: M,
        getParamString: Wt,
        template: ln,
        isArray: ct,
        indexOf: ai,
        emptyImageUrl: ke,
        requestFn: li,
        cancelFn: dn,
        requestAnimFrame: et,
        cancelAnimFrame: at
      };
      function yt() {
      }
      yt.extend = function(t) {
        var e = function() {
          M(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, i = e.__super__ = this.prototype, s = u(i);
        s.constructor = e, e.prototype = s;
        for (var a in this)
          Object.prototype.hasOwnProperty.call(this, a) && a !== "prototype" && a !== "__super__" && (e[a] = this[a]);
        return t.statics && h(e, t.statics), t.includes && (nr(t.includes), h.apply(null, [s].concat(t.includes))), h(s, t), delete s.statics, delete s.includes, s.options && (s.options = i.options ? u(i.options) : {}, h(s.options, t.options)), s._initHooks = [], s.callInitHooks = function() {
          if (!this._initHooksCalled) {
            i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var l = 0, d = s._initHooks.length; l < d; l++)
              s._initHooks[l].call(this);
          }
        }, e;
      }, yt.include = function(t) {
        var e = this.prototype.options;
        return h(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, yt.mergeOptions = function(t) {
        return h(this.prototype.options, t), this;
      }, yt.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
      };
      function nr(t) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          t = ct(t) ? t : [t];
          for (var e = 0; e < t.length; e++)
            t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
      var rt = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(t, e, i) {
          if (typeof t == "object")
            for (var s in t)
              this._on(s, t[s], e);
          else {
            t = F(t);
            for (var a = 0, l = t.length; a < l; a++)
              this._on(t[a], e, i);
          }
          return this;
        },
        /* @method off(type: String, fn?: Function, context?: Object): this
         * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
         *
         * @alternative
         * @method off(eventMap: Object): this
         * Removes a set of type/listener pairs.
         *
         * @alternative
         * @method off: this
         * Removes all listeners to all events on the object. This includes implicitly attached events.
         */
        off: function(t, e, i) {
          if (!arguments.length)
            delete this._events;
          else if (typeof t == "object")
            for (var s in t)
              this._off(s, t[s], e);
          else {
            t = F(t);
            for (var a = arguments.length === 1, l = 0, d = t.length; l < d; l++)
              a ? this._off(t[l]) : this._off(t[l], e, i);
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(t, e, i, s) {
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          if (this._listens(t, e, i) === !1) {
            i === this && (i = void 0);
            var a = { fn: e, ctx: i };
            s && (a.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(a);
          }
        },
        _off: function(t, e, i) {
          var s, a, l;
          if (this._events && (s = this._events[t], !!s)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (a = 0, l = s.length; a < l; a++)
                  s[a].fn = b;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var d = this._listens(t, e, i);
            if (d !== !1) {
              var f = s[d];
              this._firingCount && (f.fn = b, this._events[t] = s = s.slice()), s.splice(d, 1);
            }
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(t, e, i) {
          if (!this.listens(t, i))
            return this;
          var s = h({}, e, {
            type: t,
            target: this,
            sourceTarget: e && e.sourceTarget || this
          });
          if (this._events) {
            var a = this._events[t];
            if (a) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var l = 0, d = a.length; l < d; l++) {
                var f = a[l], g = f.fn;
                f.once && this.off(t, g, f.ctx), g.call(f.ctx || this, s);
              }
              this._firingCount--;
            }
          }
          return i && this._propagateEvent(s), this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(t, e, i, s) {
          typeof t != "string" && console.warn('"string" type argument expected');
          var a = e;
          typeof e != "function" && (s = !!e, a = void 0, i = void 0);
          var l = this._events && this._events[t];
          if (l && l.length && this._listens(t, a, i) !== !1)
            return !0;
          if (s) {
            for (var d in this._eventParents)
              if (this._eventParents[d].listens(t, e, i, s))
                return !0;
          }
          return !1;
        },
        // returns the index (number) or false
        _listens: function(t, e, i) {
          if (!this._events)
            return !1;
          var s = this._events[t] || [];
          if (!e)
            return !!s.length;
          i === this && (i = void 0);
          for (var a = 0, l = s.length; a < l; a++)
            if (s[a].fn === e && s[a].ctx === i)
              return a;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(t, e, i) {
          if (typeof t == "object")
            for (var s in t)
              this._on(s, t[s], e, !0);
          else {
            t = F(t);
            for (var a = 0, l = t.length; a < l; a++)
              this._on(t[a], e, i, !0);
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(t) {
          return this._eventParents = this._eventParents || {}, this._eventParents[p(t)] = t, this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(t) {
          return this._eventParents && delete this._eventParents[p(t)], this;
        },
        _propagateEvent: function(t) {
          for (var e in this._eventParents)
            this._eventParents[e].fire(t.type, h({
              layer: t.target,
              propagatedFrom: t.target
            }, t), !0);
        }
      };
      rt.addEventListener = rt.on, rt.removeEventListener = rt.clearAllEventListeners = rt.off, rt.addOneTimeEventListener = rt.once, rt.fireEvent = rt.fire, rt.hasEventListeners = rt.listens;
      var ae = yt.extend(rt);
      function I(t, e, i) {
        this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
      }
      var un = Math.trunc || function(t) {
        return t > 0 ? Math.floor(t) : Math.ceil(t);
      };
      I.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new I(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(t) {
          return this.clone()._add(k(t));
        },
        _add: function(t) {
          return this.x += t.x, this.y += t.y, this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(t) {
          return this.clone()._subtract(k(t));
        },
        _subtract: function(t) {
          return this.x -= t.x, this.y -= t.y, this;
        },
        // @method divideBy(num: Number): Point
        // Returns the result of division of the current point by the given number.
        divideBy: function(t) {
          return this.clone()._divideBy(t);
        },
        _divideBy: function(t) {
          return this.x /= t, this.y /= t, this;
        },
        // @method multiplyBy(num: Number): Point
        // Returns the result of multiplication of the current point by the given number.
        multiplyBy: function(t) {
          return this.clone()._multiplyBy(t);
        },
        _multiplyBy: function(t) {
          return this.x *= t, this.y *= t, this;
        },
        // @method scaleBy(scale: Point): Point
        // Multiply each coordinate of the current point by each coordinate of
        // `scale`. In linear algebra terms, multiply the point by the
        // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
        // defined by `scale`.
        scaleBy: function(t) {
          return new I(this.x * t.x, this.y * t.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(t) {
          return new I(this.x / t.x, this.y / t.y);
        },
        // @method round(): Point
        // Returns a copy of the current point with rounded coordinates.
        round: function() {
          return this.clone()._round();
        },
        _round: function() {
          return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
        },
        // @method floor(): Point
        // Returns a copy of the current point with floored coordinates (rounded down).
        floor: function() {
          return this.clone()._floor();
        },
        _floor: function() {
          return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
        },
        // @method ceil(): Point
        // Returns a copy of the current point with ceiled coordinates (rounded up).
        ceil: function() {
          return this.clone()._ceil();
        },
        _ceil: function() {
          return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
        },
        // @method trunc(): Point
        // Returns a copy of the current point with truncated coordinates (rounded towards zero).
        trunc: function() {
          return this.clone()._trunc();
        },
        _trunc: function() {
          return this.x = un(this.x), this.y = un(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(t) {
          t = k(t);
          var e = t.x - this.x, i = t.y - this.y;
          return Math.sqrt(e * e + i * i);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(t) {
          return t = k(t), t.x === this.x && t.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(t) {
          return t = k(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + z(this.x) + ", " + z(this.y) + ")";
        }
      };
      function k(t, e, i) {
        return t instanceof I ? t : ct(t) ? new I(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new I(t.x, t.y) : new I(t, e, i);
      }
      function H(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, s = 0, a = i.length; s < a; s++)
            this.extend(i[s]);
      }
      H.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e, i;
          if (!t)
            return this;
          if (t instanceof I || typeof t[0] == "number" || "x" in t)
            e = i = k(t);
          else if (t = it(t), e = t.min, i = t.max, !e || !i)
            return this;
          return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(t) {
          return k(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            t
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return k(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return k(this.max.x, this.min.y);
        },
        // @method getTopLeft(): Point
        // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
        getTopLeft: function() {
          return this.min;
        },
        // @method getBottomRight(): Point
        // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
        getBottomRight: function() {
          return this.max;
        },
        // @method getSize(): Point
        // Returns the size of the given bounds
        getSize: function() {
          return this.max.subtract(this.min);
        },
        // @method contains(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains(point: Point): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(t) {
          var e, i;
          return typeof t[0] == "number" || t instanceof I ? t = k(t) : t = it(t), t instanceof H ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = it(t);
          var e = this.min, i = this.max, s = t.min, a = t.max, l = a.x >= e.x && s.x <= i.x, d = a.y >= e.y && s.y <= i.y;
          return l && d;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = it(t);
          var e = this.min, i = this.max, s = t.min, a = t.max, l = a.x > e.x && s.x < i.x, d = a.y > e.y && s.y < i.y;
          return l && d;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this.min && this.max);
        },
        // @method pad(bufferRatio: Number): Bounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this.min, i = this.max, s = Math.abs(e.x - i.x) * t, a = Math.abs(e.y - i.y) * t;
          return it(
            k(e.x - s, e.y - a),
            k(i.x + s, i.y + a)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(t) {
          return t ? (t = it(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
        }
      };
      function it(t, e) {
        return !t || t instanceof H ? t : new H(t, e);
      }
      function nt(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, s = 0, a = i.length; s < a; s++)
            this.extend(i[s]);
      }
      nt.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, i = this._northEast, s, a;
          if (t instanceof B)
            s = t, a = t;
          else if (t instanceof nt) {
            if (s = t._southWest, a = t._northEast, !s || !a)
              return this;
          } else
            return t ? this.extend(O(t) || q(t)) : this;
          return !e && !i ? (this._southWest = new B(s.lat, s.lng), this._northEast = new B(a.lat, a.lng)) : (e.lat = Math.min(s.lat, e.lat), e.lng = Math.min(s.lng, e.lng), i.lat = Math.max(a.lat, i.lat), i.lng = Math.max(a.lng, i.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, i = this._northEast, s = Math.abs(e.lat - i.lat) * t, a = Math.abs(e.lng - i.lng) * t;
          return new nt(
            new B(e.lat - s, e.lng - a),
            new B(i.lat + s, i.lng + a)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new B(
            (this._southWest.lat + this._northEast.lat) / 2,
            (this._southWest.lng + this._northEast.lng) / 2
          );
        },
        // @method getSouthWest(): LatLng
        // Returns the south-west point of the bounds.
        getSouthWest: function() {
          return this._southWest;
        },
        // @method getNorthEast(): LatLng
        // Returns the north-east point of the bounds.
        getNorthEast: function() {
          return this._northEast;
        },
        // @method getNorthWest(): LatLng
        // Returns the north-west point of the bounds.
        getNorthWest: function() {
          return new B(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new B(this.getSouth(), this.getEast());
        },
        // @method getWest(): Number
        // Returns the west longitude of the bounds
        getWest: function() {
          return this._southWest.lng;
        },
        // @method getSouth(): Number
        // Returns the south latitude of the bounds
        getSouth: function() {
          return this._southWest.lat;
        },
        // @method getEast(): Number
        // Returns the east longitude of the bounds
        getEast: function() {
          return this._northEast.lng;
        },
        // @method getNorth(): Number
        // Returns the north latitude of the bounds
        getNorth: function() {
          return this._northEast.lat;
        },
        // @method contains(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle contains the given one.
        // @alternative
        // @method contains (latlng: LatLng): Boolean
        // Returns `true` if the rectangle contains the given point.
        contains: function(t) {
          typeof t[0] == "number" || t instanceof B || "lat" in t ? t = O(t) : t = q(t);
          var e = this._southWest, i = this._northEast, s, a;
          return t instanceof nt ? (s = t.getSouthWest(), a = t.getNorthEast()) : s = a = t, s.lat >= e.lat && a.lat <= i.lat && s.lng >= e.lng && a.lng <= i.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = q(t);
          var e = this._southWest, i = this._northEast, s = t.getSouthWest(), a = t.getNorthEast(), l = a.lat >= e.lat && s.lat <= i.lat, d = a.lng >= e.lng && s.lng <= i.lng;
          return l && d;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = q(t);
          var e = this._southWest, i = this._northEast, s = t.getSouthWest(), a = t.getNorthEast(), l = a.lat > e.lat && s.lat < i.lat, d = a.lng > e.lng && s.lng < i.lng;
          return l && d;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          return t ? (t = q(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function q(t, e) {
        return t instanceof nt ? t : new nt(t, e);
      }
      function B(t, e, i) {
        if (isNaN(t) || isNaN(e))
          throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = +t, this.lng = +e, i !== void 0 && (this.alt = +i);
      }
      B.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          if (!t)
            return !1;
          t = O(t);
          var i = Math.max(
            Math.abs(this.lat - t.lat),
            Math.abs(this.lng - t.lng)
          );
          return i <= (e === void 0 ? 1e-9 : e);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(t) {
          return "LatLng(" + z(this.lat, t) + ", " + z(this.lng, t) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(t) {
          return Et.distance(this, O(t));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Et.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(t) {
          var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
          return q(
            [this.lat - e, this.lng - i],
            [this.lat + e, this.lng + i]
          );
        },
        clone: function() {
          return new B(this.lat, this.lng, this.alt);
        }
      };
      function O(t, e, i) {
        return t instanceof B ? t : ct(t) && typeof t[0] != "object" ? t.length === 3 ? new B(t[0], t[1], t[2]) : t.length === 2 ? new B(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new B(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new B(t, e, i);
      }
      var xt = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(t, e) {
          var i = this.projection.project(t), s = this.scale(e);
          return this.transformation._transform(i, s);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(t, e) {
          var i = this.scale(e), s = this.transformation.untransform(t, i);
          return this.projection.unproject(s);
        },
        // @method project(latlng: LatLng): Point
        // Projects geographical coordinates into coordinates in units accepted for
        // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
        project: function(t) {
          return this.projection.project(t);
        },
        // @method unproject(point: Point): LatLng
        // Given a projected coordinate returns the corresponding LatLng.
        // The inverse of `project`.
        unproject: function(t) {
          return this.projection.unproject(t);
        },
        // @method scale(zoom: Number): Number
        // Returns the scale used when transforming projected coordinates into
        // pixel coordinates for a particular zoom. For example, it returns
        // `256 * 2^zoom` for Mercator-based CRS.
        scale: function(t) {
          return 256 * Math.pow(2, t);
        },
        // @method zoom(scale: Number): Number
        // Inverse of `scale()`, returns the zoom level corresponding to a scale
        // factor of `scale`.
        zoom: function(t) {
          return Math.log(t / 256) / Math.LN2;
        },
        // @method getProjectedBounds(zoom: Number): Bounds
        // Returns the projection's bounds scaled and transformed for the provided `zoom`.
        getProjectedBounds: function(t) {
          if (this.infinite)
            return null;
          var e = this.projection.bounds, i = this.scale(t), s = this.transformation.transform(e.min, i), a = this.transformation.transform(e.max, i);
          return new H(s, a);
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates.
        // @property code: String
        // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
        //
        // @property wrapLng: Number[]
        // An array of two numbers defining whether the longitude (horizontal) coordinate
        // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
        // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
        //
        // @property wrapLat: Number[]
        // Like `wrapLng`, but for the latitude (vertical) axis.
        // wrapLng: [min, max],
        // wrapLat: [min, max],
        // @property infinite: Boolean
        // If true, the coordinate space will be unbounded (infinite in both axes)
        infinite: !1,
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where lat and lng has been wrapped according to the
        // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
        wrapLatLng: function(t) {
          var e = this.wrapLng ? P(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? P(t.lat, this.wrapLat, !0) : t.lat, s = t.alt;
          return new B(i, e, s);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), i = this.wrapLatLng(e), s = e.lat - i.lat, a = e.lng - i.lng;
          if (s === 0 && a === 0)
            return t;
          var l = t.getSouthWest(), d = t.getNorthEast(), f = new B(l.lat - s, l.lng - a), g = new B(d.lat - s, d.lng - a);
          return new nt(f, g);
        }
      }, Et = h({}, xt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(t, e) {
          var i = Math.PI / 180, s = t.lat * i, a = e.lat * i, l = Math.sin((e.lat - t.lat) * i / 2), d = Math.sin((e.lng - t.lng) * i / 2), f = l * l + Math.cos(s) * Math.cos(a) * d * d, g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));
          return this.R * g;
        }
      }), pn = 6378137, hi = {
        R: pn,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, i = this.MAX_LATITUDE, s = Math.max(Math.min(i, t.lat), -i), a = Math.sin(s * e);
          return new I(
            this.R * t.lng * e,
            this.R * Math.log((1 + a) / (1 - a)) / 2
          );
        },
        unproject: function(t) {
          var e = 180 / Math.PI;
          return new B(
            (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
            t.x * e / this.R
          );
        },
        bounds: (function() {
          var t = pn * Math.PI;
          return new H([-t, -t], [t, t]);
        })()
      };
      function ci(t, e, i, s) {
        if (ct(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = i, this._d = s;
      }
      ci.prototype = {
        // @method transform(point: Point, scale?: Number): Point
        // Returns a transformed point, optionally multiplied by the given scale.
        // Only accepts actual `L.Point` instances, not arrays.
        transform: function(t, e) {
          return this._transform(t.clone(), e);
        },
        // destructive transform (faster)
        _transform: function(t, e) {
          return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t;
        },
        // @method untransform(point: Point, scale?: Number): Point
        // Returns the reverse transformation of the given point, optionally divided
        // by the given scale. Only accepts actual `L.Point` instances, not arrays.
        untransform: function(t, e) {
          return e = e || 1, new I(
            (t.x / e - this._b) / this._a,
            (t.y / e - this._d) / this._c
          );
        }
      };
      function oe(t, e, i, s) {
        return new ci(t, e, i, s);
      }
      var di = h({}, Et, {
        code: "EPSG:3857",
        projection: hi,
        transformation: (function() {
          var t = 0.5 / (Math.PI * hi.R);
          return oe(t, 0.5, -t, 0.5);
        })()
      }), sr = h({}, di, {
        code: "EPSG:900913"
      });
      function fn(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function mn(t, e) {
        var i = "", s, a, l, d, f, g;
        for (s = 0, l = t.length; s < l; s++) {
          for (f = t[s], a = 0, d = f.length; a < d; a++)
            g = f[a], i += (a ? "L" : "M") + g.x + " " + g.y;
          i += e ? S.svg ? "z" : "x" : "";
        }
        return i || "M0 0";
      }
      var ui = document.documentElement.style, Ie = "ActiveXObject" in window, rr = Ie && !document.addEventListener, gn = "msLaunchUri" in navigator && !("documentMode" in document), pi = pt("webkit"), _n = pt("android"), vn = pt("android 2") || pt("android 3"), ar = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), or = _n && pt("Google") && ar < 537 && !("AudioNode" in window), fi = !!window.opera, yn = !gn && pt("chrome"), xn = pt("gecko") && !pi && !fi && !Ie, lr = !yn && pt("safari"), bn = pt("phantom"), wn = "OTransition" in ui, hr = navigator.platform.indexOf("Win") === 0, Tn = Ie && "transition" in ui, mi = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !vn, $n = "MozPerspective" in ui, cr = !window.L_DISABLE_3D && (Tn || mi || $n) && !wn && !bn, le = typeof orientation < "u" || pt("mobile"), dr = le && pi, ur = le && mi, Pn = !window.PointerEvent && window.MSPointerEvent, Sn = !!(window.PointerEvent || Pn), En = "ontouchstart" in window || !!window.TouchEvent, pr = !window.L_NO_TOUCH && (En || Sn), fr = le && fi, mr = le && xn, gr = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, _r = (function() {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function() {
              t = !0;
            }
          });
          window.addEventListener("testPassiveEventSupport", b, e), window.removeEventListener("testPassiveEventSupport", b, e);
        } catch {
        }
        return t;
      })(), vr = (function() {
        return !!document.createElement("canvas").getContext;
      })(), gi = !!(document.createElementNS && fn("svg").createSVGRect), yr = !!gi && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), xr = !gi && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), br = navigator.platform.indexOf("Mac") === 0, wr = navigator.platform.indexOf("Linux") === 0;
      function pt(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var S = {
        ie: Ie,
        ielt9: rr,
        edge: gn,
        webkit: pi,
        android: _n,
        android23: vn,
        androidStock: or,
        opera: fi,
        chrome: yn,
        gecko: xn,
        safari: lr,
        phantom: bn,
        opera12: wn,
        win: hr,
        ie3d: Tn,
        webkit3d: mi,
        gecko3d: $n,
        any3d: cr,
        mobile: le,
        mobileWebkit: dr,
        mobileWebkit3d: ur,
        msPointer: Pn,
        pointer: Sn,
        touch: pr,
        touchNative: En,
        mobileOpera: fr,
        mobileGecko: mr,
        retina: gr,
        passiveEvents: _r,
        canvas: vr,
        svg: gi,
        vml: xr,
        inlineSvg: yr,
        mac: br,
        linux: wr
      }, Ln = S.msPointer ? "MSPointerDown" : "pointerdown", kn = S.msPointer ? "MSPointerMove" : "pointermove", In = S.msPointer ? "MSPointerUp" : "pointerup", Cn = S.msPointer ? "MSPointerCancel" : "pointercancel", _i = {
        touchstart: Ln,
        touchmove: kn,
        touchend: In,
        touchcancel: Cn
      }, An = {
        touchstart: Lr,
        touchmove: Ce,
        touchend: Ce,
        touchcancel: Ce
      }, qt = {}, Dn = !1;
      function Tr(t, e, i) {
        return e === "touchstart" && Er(), An[e] ? (i = An[e].bind(this, i), t.addEventListener(_i[e], i, !1), i) : (console.warn("wrong event specified:", e), b);
      }
      function $r(t, e, i) {
        if (!_i[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(_i[e], i, !1);
      }
      function Pr(t) {
        qt[t.pointerId] = t;
      }
      function Sr(t) {
        qt[t.pointerId] && (qt[t.pointerId] = t);
      }
      function Mn(t) {
        delete qt[t.pointerId];
      }
      function Er() {
        Dn || (document.addEventListener(Ln, Pr, !0), document.addEventListener(kn, Sr, !0), document.addEventListener(In, Mn, !0), document.addEventListener(Cn, Mn, !0), Dn = !0);
      }
      function Ce(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var i in qt)
            e.touches.push(qt[i]);
          e.changedTouches = [e], t(e);
        }
      }
      function Lr(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && J(e), Ce(t, e);
      }
      function kr(t) {
        var e = {}, i, s;
        for (s in t)
          i = t[s], e[s] = i && i.bind ? i.bind(t) : i;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var Ir = 200;
      function Cr(t, e) {
        t.addEventListener("dblclick", e);
        var i = 0, s;
        function a(l) {
          if (l.detail !== 1) {
            s = l.detail;
            return;
          }
          if (!(l.pointerType === "mouse" || l.sourceCapabilities && !l.sourceCapabilities.firesTouchEvents)) {
            var d = Bn(l);
            if (!(d.some(function(g) {
              return g instanceof HTMLLabelElement && g.attributes.for;
            }) && !d.some(function(g) {
              return g instanceof HTMLInputElement || g instanceof HTMLSelectElement;
            }))) {
              var f = Date.now();
              f - i <= Ir ? (s++, s === 2 && e(kr(l))) : s = 1, i = f;
            }
          }
        }
        return t.addEventListener("click", a), {
          dblclick: e,
          simDblclick: a
        };
      }
      function Ar(t, e) {
        t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
      }
      var vi = Me(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), he = Me(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), zn = he === "webkitTransition" || he === "OTransition" ? he + "End" : "transitionend";
      function On(t) {
        return typeof t == "string" ? document.getElementById(t) : t;
      }
      function ce(t, e) {
        var i = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!i || i === "auto") && document.defaultView) {
          var s = document.defaultView.getComputedStyle(t, null);
          i = s ? s[e] : null;
        }
        return i === "auto" ? null : i;
      }
      function R(t, e, i) {
        var s = document.createElement(t);
        return s.className = e || "", i && i.appendChild(s), s;
      }
      function j(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function Ae(t) {
        for (; t.firstChild; )
          t.removeChild(t.firstChild);
      }
      function Gt(t) {
        var e = t.parentNode;
        e && e.lastChild !== t && e.appendChild(t);
      }
      function Vt(t) {
        var e = t.parentNode;
        e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
      }
      function yi(t, e) {
        if (t.classList !== void 0)
          return t.classList.contains(e);
        var i = De(t);
        return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
      }
      function A(t, e) {
        if (t.classList !== void 0)
          for (var i = F(e), s = 0, a = i.length; s < a; s++)
            t.classList.add(i[s]);
        else if (!yi(t, e)) {
          var l = De(t);
          xi(t, (l ? l + " " : "") + e);
        }
      }
      function W(t, e) {
        t.classList !== void 0 ? t.classList.remove(e) : xi(t, T((" " + De(t) + " ").replace(" " + e + " ", " ")));
      }
      function xi(t, e) {
        t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
      }
      function De(t) {
        return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
      }
      function ot(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && Dr(t, e);
      }
      function Dr(t, e) {
        var i = !1, s = "DXImageTransform.Microsoft.Alpha";
        try {
          i = t.filters.item(s);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + s + "(opacity=" + e + ")";
      }
      function Me(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
          if (t[i] in e)
            return t[i];
        return !1;
      }
      function Ot(t, e, i) {
        var s = e || new I(0, 0);
        t.style[vi] = (S.ie3d ? "translate(" + s.x + "px," + s.y + "px)" : "translate3d(" + s.x + "px," + s.y + "px,0)") + (i ? " scale(" + i + ")" : "");
      }
      function G(t, e) {
        t._leaflet_pos = e, S.any3d ? Ot(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
      }
      function Nt(t) {
        return t._leaflet_pos || new I(0, 0);
      }
      var de, ue, bi;
      if ("onselectstart" in document)
        de = function() {
          C(window, "selectstart", J);
        }, ue = function() {
          U(window, "selectstart", J);
        };
      else {
        var pe = Me(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        de = function() {
          if (pe) {
            var t = document.documentElement.style;
            bi = t[pe], t[pe] = "none";
          }
        }, ue = function() {
          pe && (document.documentElement.style[pe] = bi, bi = void 0);
        };
      }
      function wi() {
        C(window, "dragstart", J);
      }
      function Ti() {
        U(window, "dragstart", J);
      }
      var ze, $i;
      function Pi(t) {
        for (; t.tabIndex === -1; )
          t = t.parentNode;
        t.style && (Oe(), ze = t, $i = t.style.outlineStyle, t.style.outlineStyle = "none", C(window, "keydown", Oe));
      }
      function Oe() {
        ze && (ze.style.outlineStyle = $i, ze = void 0, $i = void 0, U(window, "keydown", Oe));
      }
      function Nn(t) {
        do
          t = t.parentNode;
        while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
        return t;
      }
      function Si(t) {
        var e = t.getBoundingClientRect();
        return {
          x: e.width / t.offsetWidth || 1,
          y: e.height / t.offsetHeight || 1,
          boundingClientRect: e
        };
      }
      var Mr = {
        __proto__: null,
        TRANSFORM: vi,
        TRANSITION: he,
        TRANSITION_END: zn,
        get: On,
        getStyle: ce,
        create: R,
        remove: j,
        empty: Ae,
        toFront: Gt,
        toBack: Vt,
        hasClass: yi,
        addClass: A,
        removeClass: W,
        setClass: xi,
        getClass: De,
        setOpacity: ot,
        testProp: Me,
        setTransform: Ot,
        setPosition: G,
        getPosition: Nt,
        get disableTextSelection() {
          return de;
        },
        get enableTextSelection() {
          return ue;
        },
        disableImageDrag: wi,
        enableImageDrag: Ti,
        preventOutline: Pi,
        restoreOutline: Oe,
        getSizedParentNode: Nn,
        getScale: Si
      };
      function C(t, e, i, s) {
        if (e && typeof e == "object")
          for (var a in e)
            Li(t, a, e[a], i);
        else {
          e = F(e);
          for (var l = 0, d = e.length; l < d; l++)
            Li(t, e[l], i, s);
        }
        return this;
      }
      var ft = "_leaflet_events";
      function U(t, e, i, s) {
        if (arguments.length === 1)
          Rn(t), delete t[ft];
        else if (e && typeof e == "object")
          for (var a in e)
            ki(t, a, e[a], i);
        else if (e = F(e), arguments.length === 2)
          Rn(t, function(f) {
            return ai(e, f) !== -1;
          });
        else
          for (var l = 0, d = e.length; l < d; l++)
            ki(t, e[l], i, s);
        return this;
      }
      function Rn(t, e) {
        for (var i in t[ft]) {
          var s = i.split(/\d/)[0];
          (!e || e(s)) && ki(t, s, null, null, i);
        }
      }
      var Ei = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function Li(t, e, i, s) {
        var a = e + p(i) + (s ? "_" + p(s) : "");
        if (t[ft] && t[ft][a])
          return this;
        var l = function(f) {
          return i.call(s || t, f || window.event);
        }, d = l;
        !S.touchNative && S.pointer && e.indexOf("touch") === 0 ? l = Tr(t, e, l) : S.touch && e === "dblclick" ? l = Cr(t, l) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(Ei[e] || e, l, S.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (l = function(f) {
          f = f || window.event, Ci(t, f) && d(f);
        }, t.addEventListener(Ei[e], l, !1)) : t.addEventListener(e, d, !1) : t.attachEvent("on" + e, l), t[ft] = t[ft] || {}, t[ft][a] = l;
      }
      function ki(t, e, i, s, a) {
        a = a || e + p(i) + (s ? "_" + p(s) : "");
        var l = t[ft] && t[ft][a];
        if (!l)
          return this;
        !S.touchNative && S.pointer && e.indexOf("touch") === 0 ? $r(t, e, l) : S.touch && e === "dblclick" ? Ar(t, l) : "removeEventListener" in t ? t.removeEventListener(Ei[e] || e, l, !1) : t.detachEvent("on" + e, l), t[ft][a] = null;
      }
      function Rt(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
      }
      function Ii(t) {
        return Li(t, "wheel", Rt), this;
      }
      function fe(t) {
        return C(t, "mousedown touchstart dblclick contextmenu", Rt), t._leaflet_disable_click = !0, this;
      }
      function J(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
      }
      function Bt(t) {
        return J(t), Rt(t), this;
      }
      function Bn(t) {
        if (t.composedPath)
          return t.composedPath();
        for (var e = [], i = t.target; i; )
          e.push(i), i = i.parentNode;
        return e;
      }
      function Zn(t, e) {
        if (!e)
          return new I(t.clientX, t.clientY);
        var i = Si(e), s = i.boundingClientRect;
        return new I(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - s.left) / i.x - e.clientLeft,
          (t.clientY - s.top) / i.y - e.clientTop
        );
      }
      var zr = S.linux && S.chrome ? window.devicePixelRatio : S.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function Fn(t) {
        return S.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / zr : (
            // Pixels
            t.deltaY && t.deltaMode === 1 ? -t.deltaY * 20 : (
              // Lines
              t.deltaY && t.deltaMode === 2 ? -t.deltaY * 60 : (
                // Pages
                t.deltaX || t.deltaZ ? 0 : (
                  // Skip horizontal/depth wheel events
                  t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : (
                    // Legacy IE pixels
                    t.detail && Math.abs(t.detail) < 32765 ? -t.detail * 20 : (
                      // Legacy Moz lines
                      t.detail ? t.detail / -32765 * 60 : (
                        // Legacy Moz pages
                        0
                      )
                    )
                  )
                )
              )
            )
          )
        );
      }
      function Ci(t, e) {
        var i = e.relatedTarget;
        if (!i)
          return !0;
        try {
          for (; i && i !== t; )
            i = i.parentNode;
        } catch {
          return !1;
        }
        return i !== t;
      }
      var Or = {
        __proto__: null,
        on: C,
        off: U,
        stopPropagation: Rt,
        disableScrollPropagation: Ii,
        disableClickPropagation: fe,
        preventDefault: J,
        stop: Bt,
        getPropagationPath: Bn,
        getMousePosition: Zn,
        getWheelDelta: Fn,
        isExternalTarget: Ci,
        addListener: C,
        removeListener: U
      }, Un = ae.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(t, e, i, s) {
          this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(s || 0.5, 0.2), this._startPos = Nt(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function() {
          this._animId = et(this._animate, this), this._step();
        },
        _step: function(t) {
          var e = +/* @__PURE__ */ new Date() - this._startTime, i = this._duration * 1e3;
          e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(t, e) {
          var i = this._startPos.add(this._offset.multiplyBy(t));
          e && i._round(), G(this._el, i), this.fire("step");
        },
        _complete: function() {
          at(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      }), N = ae.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: di,
          // @option center: LatLng = undefined
          // Initial geographic center of the map
          center: void 0,
          // @option zoom: Number = undefined
          // Initial map zoom level
          zoom: void 0,
          // @option minZoom: Number = *
          // Minimum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the lowest of their `minZoom` options will be used instead.
          minZoom: void 0,
          // @option maxZoom: Number = *
          // Maximum zoom level of the map.
          // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
          // the highest of their `maxZoom` options will be used instead.
          maxZoom: void 0,
          // @option layers: Layer[] = []
          // Array of layers that will be added to the map initially
          layers: [],
          // @option maxBounds: LatLngBounds = null
          // When this option is set, the map restricts the view to the given
          // geographical bounds, bouncing the user back if the user tries to pan
          // outside the view. To set the restriction dynamically, use
          // [`setMaxBounds`](#map-setmaxbounds) method.
          maxBounds: void 0,
          // @option renderer: Renderer = *
          // The default method for drawing vector layers on the map. `L.SVG`
          // or `L.Canvas` by default depending on browser support.
          renderer: void 0,
          // @section Animation Options
          // @option zoomAnimation: Boolean = true
          // Whether the map zoom animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          zoomAnimation: !0,
          // @option zoomAnimationThreshold: Number = 4
          // Won't animate zoom if the zoom difference exceeds this value.
          zoomAnimationThreshold: 4,
          // @option fadeAnimation: Boolean = true
          // Whether the tile fade animation is enabled. By default it's enabled
          // in all browsers that support CSS3 Transitions except Android.
          fadeAnimation: !0,
          // @option markerZoomAnimation: Boolean = true
          // Whether markers animate their zoom with the zoom animation, if disabled
          // they will disappear for the length of the animation. By default it's
          // enabled in all browsers that support CSS3 Transitions except Android.
          markerZoomAnimation: !0,
          // @option transform3DLimit: Number = 2^23
          // Defines the maximum size of a CSS translation transform. The default
          // value should not be changed unless a web browser positions layers in
          // the wrong place after doing a large `panBy`.
          transform3DLimit: 8388608,
          // Precision limit of a 32-bit float
          // @section Interaction Options
          // @option zoomSnap: Number = 1
          // Forces the map's zoom level to always be a multiple of this, particularly
          // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
          // By default, the zoom level snaps to the nearest integer; lower values
          // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
          // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
          zoomSnap: 1,
          // @option zoomDelta: Number = 1
          // Controls how much the map's zoom level will change after a
          // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
          // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
          // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
          zoomDelta: 1,
          // @option trackResize: Boolean = true
          // Whether the map automatically handles browser window resize to update itself.
          trackResize: !0
        },
        initialize: function(t, e) {
          e = M(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = m(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(O(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = he && S.any3d && !S.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), C(this._proxy, zn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(t, e, i) {
          if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(O(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
            i.animate !== void 0 && (i.zoom = h({ animate: i.animate }, i.zoom), i.pan = h({ animate: i.animate, duration: i.duration }, i.pan));
            var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
            if (s)
              return clearTimeout(this._sizeTimer), this;
          }
          return this._resetView(t, e, i.pan && i.pan.noMoveStart), this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(t, e) {
          return this._loaded ? this.setView(this.getCenter(), t, { zoom: e }) : (this._zoom = t, this);
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(t, e) {
          return t = t || (S.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(t, e) {
          return t = t || (S.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(t, e, i) {
          var s = this.getZoomScale(e), a = this.getSize().divideBy(2), l = t instanceof I ? t : this.latLngToContainerPoint(t), d = l.subtract(a).multiplyBy(1 - 1 / s), f = this.containerPointToLatLng(a.add(d));
          return this.setView(f, e, { zoom: i });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : q(t);
          var i = k(e.paddingTopLeft || e.padding || [0, 0]), s = k(e.paddingBottomRight || e.padding || [0, 0]), a = this.getBoundsZoom(t, !1, i.add(s));
          if (a = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, a) : a, a === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: a
            };
          var l = s.subtract(i).divideBy(2), d = this.project(t.getSouthWest(), a), f = this.project(t.getNorthEast(), a), g = this.unproject(d.add(f).divideBy(2).add(l), a);
          return {
            center: g,
            zoom: a
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = q(t), !t.isValid())
            throw new Error("Bounds are not valid.");
          var i = this._getBoundsCenterZoom(t, e);
          return this.setView(i.center, i.zoom, e);
        },
        // @method fitWorld(options?: fitBounds options): this
        // Sets a map view that mostly contains the whole world with the maximum
        // zoom level possible.
        fitWorld: function(t) {
          return this.fitBounds([[-90, -180], [90, 180]], t);
        },
        // @method panTo(latlng: LatLng, options?: Pan options): this
        // Pans the map to a given center.
        panTo: function(t, e) {
          return this.setView(t, this._zoom, { pan: e });
        },
        // @method panBy(offset: Point, options?: Pan options): this
        // Pans the map by a given number of pixels (animated).
        panBy: function(t, e) {
          if (t = k(t).round(), e = e || {}, !t.x && !t.y)
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new Un(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
            A(this._mapPane, "leaflet-pan-anim");
            var i = this._getMapPanePos().subtract(t).round();
            this._panAnim.run(this._mapPane, i, e.duration || 0.25, e.easeLinearity);
          } else
            this._rawPanBy(t), this.fire("move").fire("moveend");
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(t, e, i) {
          if (i = i || {}, i.animate === !1 || !S.any3d)
            return this.setView(t, e, i);
          this._stop();
          var s = this.project(this.getCenter()), a = this.project(t), l = this.getSize(), d = this._zoom;
          t = O(t), e = e === void 0 ? d : e;
          var f = Math.max(l.x, l.y), g = f * this.getZoomScale(d, e), v = a.distanceTo(s) || 1, w = 1.42, E = w * w;
          function D(V) {
            var Ve = V ? -1 : 1, $a = V ? g : f, Pa = g * g - f * f + Ve * E * E * v * v, Sa = 2 * $a * E * v, Ui = Pa / Sa, ws = Math.sqrt(Ui * Ui + 1) - Ui, Ea = ws < 1e-9 ? -18 : Math.log(ws);
            return Ea;
          }
          function tt(V) {
            return (Math.exp(V) - Math.exp(-V)) / 2;
          }
          function Y(V) {
            return (Math.exp(V) + Math.exp(-V)) / 2;
          }
          function ht(V) {
            return tt(V) / Y(V);
          }
          var st = D(0);
          function te(V) {
            return f * (Y(st) / Y(st + w * V));
          }
          function xa(V) {
            return f * (Y(st) * ht(st + w * V) - tt(st)) / E;
          }
          function ba(V) {
            return 1 - Math.pow(1 - V, 1.5);
          }
          var wa = Date.now(), xs = (D(1) - st) / w, Ta = i.duration ? 1e3 * i.duration : 1e3 * xs * 0.8;
          function bs() {
            var V = (Date.now() - wa) / Ta, Ve = ba(V) * xs;
            V <= 1 ? (this._flyToFrame = et(bs, this), this._move(
              this.unproject(s.add(a.subtract(s).multiplyBy(xa(Ve) / v)), d),
              this.getScaleZoom(f / te(Ve), d),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, i.noMoveStart), bs.call(this), this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(t, e) {
          var i = this._getBoundsCenterZoom(t, e);
          return this.flyTo(i.center, i.zoom, e);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(t) {
          return t = q(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
        },
        // @method setMinZoom(zoom: Number): this
        // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
        setMinZoom: function(t) {
          var e = this.options.minZoom;
          return this.options.minZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this;
        },
        // @method setMaxZoom(zoom: Number): this
        // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
        setMaxZoom: function(t) {
          var e = this.options.maxZoom;
          return this.options.maxZoom = t, this._loaded && e !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this;
        },
        // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
        // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
        panInsideBounds: function(t, e) {
          this._enforcingBounds = !0;
          var i = this.getCenter(), s = this._limitCenter(i, this._zoom, q(t));
          return i.equals(s) || this.panTo(s, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var i = k(e.paddingTopLeft || e.padding || [0, 0]), s = k(e.paddingBottomRight || e.padding || [0, 0]), a = this.project(this.getCenter()), l = this.project(t), d = this.getPixelBounds(), f = it([d.min.add(i), d.max.subtract(s)]), g = f.getSize();
          if (!f.contains(l)) {
            this._enforcingBounds = !0;
            var v = l.subtract(f.getCenter()), w = f.extend(l).getSize().subtract(g);
            a.x += v.x < 0 ? -w.x : w.x, a.y += v.y < 0 ? -w.y : w.y, this.panTo(this.unproject(a), e), this._enforcingBounds = !1;
          }
          return this;
        },
        // @method invalidateSize(options: Zoom/pan options): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default. If `options.pan` is `false`, panning will not occur.
        // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
        // that it doesn't happen often even if the method is called many
        // times in a row.
        // @alternative
        // @method invalidateSize(animate: Boolean): this
        // Checks if the map container size changed and updates the map if so —
        // call it after you've changed the map size dynamically, also animating
        // pan by default.
        invalidateSize: function(t) {
          if (!this._loaded)
            return this;
          t = h({
            animate: !1,
            pan: !0
          }, t === !0 ? { animate: !0 } : t);
          var e = this.getSize();
          this._sizeChanged = !0, this._lastCenter = null;
          var i = this.getSize(), s = e.divideBy(2).round(), a = i.divideBy(2).round(), l = s.subtract(a);
          return !l.x && !l.y ? this : (t.animate && t.pan ? this.panBy(l) : (t.pan && this._rawPanBy(l), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(m(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
            oldSize: e,
            newSize: i
          }));
        },
        // @section Methods for modifying map state
        // @method stop(): this
        // Stops the currently running `panTo` or `flyTo` animation, if any.
        stop: function() {
          return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
        },
        // @section Geolocation methods
        // @method locate(options?: Locate options): this
        // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
        // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
        // and optionally sets the map view to the user's location with respect to
        // detection accuracy (or to the world view if geolocation failed).
        // Note that, if your page doesn't use HTTPS, this method will fail in
        // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
        // See `Locate options` for more details.
        locate: function(t) {
          if (t = this._locateOptions = h({
            timeout: 1e4,
            watch: !1
            // setView: false
            // maxZoom: <Number>
            // maximumAge: 0
            // enableHighAccuracy: false
          }, t), !("geolocation" in navigator))
            return this._handleGeolocationError({
              code: 0,
              message: "Geolocation not supported."
            }), this;
          var e = m(this._handleGeolocationResponse, this), i = m(this._handleGeolocationError, this);
          return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this;
        },
        // @method stopLocate(): this
        // Stops watching location previously initiated by `map.locate({watch: true})`
        // and aborts resetting the map view if map.locate was called with
        // `{setView: true}`.
        stopLocate: function() {
          return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
        },
        _handleGeolocationError: function(t) {
          if (this._container._leaflet_id) {
            var e = t.code, i = t.message || (e === 1 ? "permission denied" : e === 2 ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
              code: e,
              message: "Geolocation error: " + i + "."
            });
          }
        },
        _handleGeolocationResponse: function(t) {
          if (this._container._leaflet_id) {
            var e = t.coords.latitude, i = t.coords.longitude, s = new B(e, i), a = s.toBounds(t.coords.accuracy * 2), l = this._locateOptions;
            if (l.setView) {
              var d = this.getBoundsZoom(a);
              this.setView(s, l.maxZoom ? Math.min(d, l.maxZoom) : d);
            }
            var f = {
              latlng: s,
              bounds: a,
              timestamp: t.timestamp
            };
            for (var g in t.coords)
              typeof t.coords[g] == "number" && (f[g] = t.coords[g]);
            this.fire("locationfound", f);
          }
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(t, e) {
          if (!e)
            return this;
          var i = this[t] = new e(this);
          return this._handlers.push(i), this.options[t] && i.enable(), this;
        },
        // @method remove(): this
        // Destroys the map and clears all related event listeners.
        remove: function() {
          if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
            throw new Error("Map container is being reused by another instance");
          try {
            delete this._container._leaflet_id, delete this._containerId;
          } catch {
            this._container._leaflet_id = void 0, this._containerId = void 0;
          }
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), j(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (at(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
          var t;
          for (t in this._layers)
            this._layers[t].remove();
          for (t in this._panes)
            j(this._panes[t]);
          return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(t, e) {
          var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), s = R("div", i, e || this._mapPane);
          return t && (this._panes[t] = s), s;
        },
        // @section Methods for Getting Map State
        // @method getCenter(): LatLng
        // Returns the geographical center of the map view
        getCenter: function() {
          return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
        },
        // @method getZoom(): Number
        // Returns the current zoom level of the map view
        getZoom: function() {
          return this._zoom;
        },
        // @method getBounds(): LatLngBounds
        // Returns the geographical bounds visible in the current map view
        getBounds: function() {
          var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), i = this.unproject(t.getTopRight());
          return new nt(e, i);
        },
        // @method getMinZoom(): Number
        // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
        getMinZoom: function() {
          return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
        },
        // @method getMaxZoom(): Number
        // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
        getMaxZoom: function() {
          return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
        },
        // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
        // Returns the maximum zoom level on which the given bounds fit to the map
        // view in its entirety. If `inside` (optional) is set to `true`, the method
        // instead returns the minimum zoom level on which the map view fits into
        // the given bounds in its entirety.
        getBoundsZoom: function(t, e, i) {
          t = q(t), i = k(i || [0, 0]);
          var s = this.getZoom() || 0, a = this.getMinZoom(), l = this.getMaxZoom(), d = t.getNorthWest(), f = t.getSouthEast(), g = this.getSize().subtract(i), v = it(this.project(f, s), this.project(d, s)).getSize(), w = S.any3d ? this.options.zoomSnap : 1, E = g.x / v.x, D = g.y / v.y, tt = e ? Math.max(E, D) : Math.min(E, D);
          return s = this.getScaleZoom(tt, s), w && (s = Math.round(s / (w / 100)) * (w / 100), s = e ? Math.ceil(s / w) * w : Math.floor(s / w) * w), Math.max(a, Math.min(l, s));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          return (!this._size || this._sizeChanged) && (this._size = new I(
            this._container.clientWidth || 0,
            this._container.clientHeight || 0
          ), this._sizeChanged = !1), this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(t, e) {
          var i = this._getTopLeftPoint(t, e);
          return new H(i, i.add(this.getSize()));
        },
        // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
        // the map pane? "left point of the map layer" can be confusing, specially
        // since there can be negative offsets.
        // @method getPixelOrigin(): Point
        // Returns the projected pixel coordinates of the top left point of
        // the map layer (useful in custom layer and overlay implementations).
        getPixelOrigin: function() {
          return this._checkIfLoaded(), this._pixelOrigin;
        },
        // @method getPixelWorldBounds(zoom?: Number): Bounds
        // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
        // If `zoom` is omitted, the map's current zoom level is used.
        getPixelWorldBounds: function(t) {
          return this.options.crs.getProjectedBounds(t === void 0 ? this.getZoom() : t);
        },
        // @section Other Methods
        // @method getPane(pane: String|HTMLElement): HTMLElement
        // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
        getPane: function(t) {
          return typeof t == "string" ? this._panes[t] : t;
        },
        // @method getPanes(): Object
        // Returns a plain object containing the names of all [panes](#map-pane) as keys and
        // the panes as values.
        getPanes: function() {
          return this._panes;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the map.
        getContainer: function() {
          return this._container;
        },
        // @section Conversion Methods
        // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
        // Returns the scale factor to be applied to a map transition from zoom level
        // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
        getZoomScale: function(t, e) {
          var i = this.options.crs;
          return e = e === void 0 ? this._zoom : e, i.scale(t) / i.scale(e);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(t, e) {
          var i = this.options.crs;
          e = e === void 0 ? this._zoom : e;
          var s = i.zoom(t * i.scale(e));
          return isNaN(s) ? 1 / 0 : s;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(O(t), e);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(k(t), e);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(t) {
          var e = k(t).add(this.getPixelOrigin());
          return this.unproject(e);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(t) {
          var e = this.project(O(t))._round();
          return e._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(t) {
          return this.options.crs.wrapLatLng(O(t));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(t) {
          return this.options.crs.wrapLatLngBounds(q(t));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(t, e) {
          return this.options.crs.distance(O(t), O(e));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(t) {
          return k(t).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(t) {
          return k(t).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(t) {
          var e = this.containerPointToLayerPoint(k(t));
          return this.layerPointToLatLng(e);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(t) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(O(t)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(t) {
          return Zn(t, this._container);
        },
        // @method mouseEventToLayerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to
        // the [origin pixel](#map-getpixelorigin) where the event took place.
        mouseEventToLayerPoint: function(t) {
          return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));
        },
        // @method mouseEventToLatLng(ev: MouseEvent): LatLng
        // Given a MouseEvent object, returns geographical coordinate where the
        // event took place.
        mouseEventToLatLng: function(t) {
          return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));
        },
        // map initialization methods
        _initContainer: function(t) {
          var e = this._container = On(t);
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          C(e, "scroll", this._onScroll, this), this._containerId = p(e);
        },
        _initLayout: function() {
          var t = this._container;
          this._fadeAnimated = this.options.fadeAnimation && S.any3d, A(t, "leaflet-container" + (S.touch ? " leaflet-touch" : "") + (S.retina ? " leaflet-retina" : "") + (S.ielt9 ? " leaflet-oldie" : "") + (S.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var e = ce(t, "position");
          e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var t = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), G(this._mapPane, new I(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (A(t.markerPane, "leaflet-zoom-hide"), A(t.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(t, e, i) {
          G(this._mapPane, new I(0, 0));
          var s = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var a = this._zoom !== e;
          this._moveStart(a, i)._move(t, e)._moveEnd(a), this.fire("viewreset"), s && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, i, s) {
          e === void 0 && (e = this._zoom);
          var a = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), s ? i && i.pinch && this.fire("zoom", i) : ((a || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
        },
        _moveEnd: function(t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return at(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(t) {
          G(this._mapPane, this._getMapPanePos().subtract(t));
        },
        _getZoomSpan: function() {
          return this.getMaxZoom() - this.getMinZoom();
        },
        _panInsideMaxBounds: function() {
          this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
        },
        _checkIfLoaded: function() {
          if (!this._loaded)
            throw new Error("Set map center and zoom first.");
        },
        // DOM event handling
        // @section Interaction events
        _initEvents: function(t) {
          this._targets = {}, this._targets[p(this._container)] = this;
          var e = t ? U : C;
          e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), S.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function() {
          at(this._resizeRequest), this._resizeRequest = et(
            function() {
              this.invalidateSize({ debounceMoveend: !0 });
            },
            this
          );
        },
        _onScroll: function() {
          this._container.scrollTop = 0, this._container.scrollLeft = 0;
        },
        _onMoveEnd: function() {
          var t = this._getMapPanePos();
          Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
        },
        _findEventTargets: function(t, e) {
          for (var i = [], s, a = e === "mouseout" || e === "mouseover", l = t.target || t.srcElement, d = !1; l; ) {
            if (s = this._targets[p(l)], s && (e === "click" || e === "preclick") && this._draggableMoved(s)) {
              d = !0;
              break;
            }
            if (s && s.listens(e, !0) && (a && !Ci(l, t) || (i.push(s), a)) || l === this._container)
              break;
            l = l.parentNode;
          }
          return !i.length && !d && !a && this.listens(e, !0) && (i = [this]), i;
        },
        _isClickDisabled: function(t) {
          for (; t && t !== this._container; ) {
            if (t._leaflet_disable_click)
              return !0;
            t = t.parentNode;
          }
        },
        _handleDOMEvent: function(t) {
          var e = t.target || t.srcElement;
          if (!(!this._loaded || e._leaflet_disable_events || t.type === "click" && this._isClickDisabled(e))) {
            var i = t.type;
            i === "mousedown" && Pi(e), this._fireDOMEvent(t, i);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, i) {
          if (t.type === "click") {
            var s = h({}, t);
            s.type = "preclick", this._fireDOMEvent(s, s.type, i);
          }
          var a = this._findEventTargets(t, e);
          if (i) {
            for (var l = [], d = 0; d < i.length; d++)
              i[d].listens(e, !0) && l.push(i[d]);
            a = l.concat(a);
          }
          if (a.length) {
            e === "contextmenu" && J(t);
            var f = a[0], g = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var v = f.getLatLng && (!f._radius || f._radius <= 10);
              g.containerPoint = v ? this.latLngToContainerPoint(f.getLatLng()) : this.mouseEventToContainerPoint(t), g.layerPoint = this.containerPointToLayerPoint(g.containerPoint), g.latlng = v ? f.getLatLng() : this.layerPointToLatLng(g.layerPoint);
            }
            for (d = 0; d < a.length; d++)
              if (a[d].fire(e, g, !0), g.originalEvent._stopped || a[d].options.bubblingMouseEvents === !1 && ai(this._mouseEvents, e) !== -1)
                return;
          }
        },
        _draggableMoved: function(t) {
          return t = t.dragging && t.dragging.enabled() ? t : this, t.dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved();
        },
        _clearHandlers: function() {
          for (var t = 0, e = this._handlers.length; t < e; t++)
            this._handlers[t].disable();
        },
        // @section Other Methods
        // @method whenReady(fn: Function, context?: Object): this
        // Runs the given function `fn` when the map gets initialized with
        // a view (center and zoom) and at least one layer, or immediately
        // if it's already initialized, optionally passing a function context.
        whenReady: function(t, e) {
          return this._loaded ? t.call(e || this, { target: this }) : this.on("load", t, e), this;
        },
        // private methods for getting map state
        _getMapPanePos: function() {
          return Nt(this._mapPane) || new I(0, 0);
        },
        _moved: function() {
          var t = this._getMapPanePos();
          return t && !t.equals([0, 0]);
        },
        _getTopLeftPoint: function(t, e) {
          var i = t && e !== void 0 ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
          return i.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(t, e) {
          var i = this.getSize()._divideBy(2);
          return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(t, e, i) {
          var s = this._getNewPixelOrigin(i, e);
          return this.project(t, e)._subtract(s);
        },
        _latLngBoundsToNewLayerBounds: function(t, e, i) {
          var s = this._getNewPixelOrigin(i, e);
          return it([
            this.project(t.getSouthWest(), e)._subtract(s),
            this.project(t.getNorthWest(), e)._subtract(s),
            this.project(t.getSouthEast(), e)._subtract(s),
            this.project(t.getNorthEast(), e)._subtract(s)
          ]);
        },
        // layer point of the current center
        _getCenterLayerPoint: function() {
          return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
        },
        // offset of the specified place to the current center in pixels
        _getCenterOffset: function(t) {
          return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());
        },
        // adjust center for view to get inside bounds
        _limitCenter: function(t, e, i) {
          if (!i)
            return t;
          var s = this.project(t, e), a = this.getSize().divideBy(2), l = new H(s.subtract(a), s.add(a)), d = this._getBoundsOffset(l, i, e);
          return Math.abs(d.x) <= 1 && Math.abs(d.y) <= 1 ? t : this.unproject(s.add(d), e);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(t, e) {
          if (!e)
            return t;
          var i = this.getPixelBounds(), s = new H(i.min.add(t), i.max.add(t));
          return t.add(this._getBoundsOffset(s, e));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(t, e, i) {
          var s = it(
            this.project(e.getNorthEast(), i),
            this.project(e.getSouthWest(), i)
          ), a = s.min.subtract(t.min), l = s.max.subtract(t.max), d = this._rebound(a.x, -l.x), f = this._rebound(a.y, -l.y);
          return new I(d, f);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), i = this.getMaxZoom(), s = S.any3d ? this.options.zoomSnap : 1;
          return s && (t = Math.round(t / s) * s), Math.max(e, Math.min(i, t));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          W(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(t, e) {
          var i = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
        },
        _createAnimProxy: function() {
          var t = this._proxy = R("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var i = vi, s = this._proxy.style[i];
            Ot(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), s === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          j(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var t = this.getCenter(), e = this.getZoom();
          Ot(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
        },
        _catchTransitionEnd: function(t) {
          this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(t, e, i) {
          if (this._animatingZoom)
            return !0;
          if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
            return !1;
          var s = this.getZoomScale(e), a = this._getCenterOffset(t)._divideBy(1 - 1 / s);
          return i.animate !== !0 && !this.getSize().contains(a) ? !1 : (et(function() {
            this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, i, s) {
          this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, A(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: s
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(m(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && W(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Nr(t, e) {
        return new N(t, e);
      }
      var dt = yt.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(t) {
          M(this, t);
        },
        /* @section
         * Classes extending L.Control will inherit the following methods:
         *
         * @method getPosition: string
         * Returns the position of the control.
         */
        getPosition: function() {
          return this.options.position;
        },
        // @method setPosition(position: string): this
        // Sets the position of the control.
        setPosition: function(t) {
          var e = this._map;
          return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTMLElement that contains the control.
        getContainer: function() {
          return this._container;
        },
        // @method addTo(map: Map): this
        // Adds the control to the given map.
        addTo: function(t) {
          this.remove(), this._map = t;
          var e = this._container = this.onAdd(t), i = this.getPosition(), s = t._controlCorners[i];
          return A(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? s.insertBefore(e, s.firstChild) : s.appendChild(e), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (j(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(t) {
          this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
        }
      }), me = function(t) {
        return new dt(t);
      };
      N.include({
        // @method addControl(control: Control): this
        // Adds the given control to the map
        addControl: function(t) {
          return t.addTo(this), this;
        },
        // @method removeControl(control: Control): this
        // Removes the given control from the map
        removeControl: function(t) {
          return t.remove(), this;
        },
        _initControlPos: function() {
          var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = R("div", e + "control-container", this._container);
          function s(a, l) {
            var d = e + a + " " + e + l;
            t[a + l] = R("div", d, i);
          }
          s("top", "left"), s("top", "right"), s("bottom", "left"), s("bottom", "right");
        },
        _clearControlPos: function() {
          for (var t in this._controlCorners)
            j(this._controlCorners[t]);
          j(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var Hn = dt.extend({
        // @section
        // @aka Control.Layers options
        options: {
          // @option collapsed: Boolean = true
          // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
          collapsed: !0,
          position: "topright",
          // @option autoZIndex: Boolean = true
          // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
          autoZIndex: !0,
          // @option hideSingleBase: Boolean = false
          // If `true`, the base layers in the control will be hidden when there is only one.
          hideSingleBase: !1,
          // @option sortLayers: Boolean = false
          // Whether to sort the layers. When `false`, layers will keep the order
          // in which they were added to the control.
          sortLayers: !1,
          // @option sortFunction: Function = *
          // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
          // that will be used for sorting the layers, when `sortLayers` is `true`.
          // The function receives both the `L.Layer` instances and their names, as in
          // `sortFunction(layerA, layerB, nameA, nameB)`.
          // By default, it sorts layers alphabetically by their name.
          sortFunction: function(t, e, i, s) {
            return i < s ? -1 : s < i ? 1 : 0;
          }
        },
        initialize: function(t, e, i) {
          M(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
          for (var s in t)
            this._addLayer(t[s], s);
          for (s in e)
            this._addLayer(e[s], s, !0);
        },
        onAdd: function(t) {
          this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
          for (var e = 0; e < this._layers.length; e++)
            this._layers[e].layer.on("add remove", this._onLayerChange, this);
          return this._container;
        },
        addTo: function(t) {
          return dt.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
        },
        onRemove: function() {
          this._map.off("zoomend", this._checkDisabledLayers, this);
          for (var t = 0; t < this._layers.length; t++)
            this._layers[t].layer.off("add remove", this._onLayerChange, this);
        },
        // @method addBaseLayer(layer: Layer, name: String): this
        // Adds a base layer (radio button entry) with the given name to the control.
        addBaseLayer: function(t, e) {
          return this._addLayer(t, e), this._map ? this._update() : this;
        },
        // @method addOverlay(layer: Layer, name: String): this
        // Adds an overlay (checkbox entry) with the given name to the control.
        addOverlay: function(t, e) {
          return this._addLayer(t, e, !0), this._map ? this._update() : this;
        },
        // @method removeLayer(layer: Layer): this
        // Remove the given layer from the control.
        removeLayer: function(t) {
          t.off("add remove", this._onLayerChange, this);
          var e = this._getLayer(p(t));
          return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          A(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return t < this._section.clientHeight ? (A(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : W(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return W(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var t = "leaflet-control-layers", e = this._container = R("div", t), i = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), fe(e), Ii(e);
          var s = this._section = R("section", t + "-list");
          i && (this._map.on("click", this.collapse, this), C(e, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var a = this._layersLink = R("a", t + "-toggle", e);
          a.href = "#", a.title = "Layers", a.setAttribute("role", "button"), C(a, {
            keydown: function(l) {
              l.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(l) {
              J(l), this._expandSafely();
            }
          }, this), i || this.expand(), this._baseLayersList = R("div", t + "-base", s), this._separator = R("div", t + "-separator", s), this._overlaysList = R("div", t + "-overlays", s), e.appendChild(s);
        },
        _getLayer: function(t) {
          for (var e = 0; e < this._layers.length; e++)
            if (this._layers[e] && p(this._layers[e].layer) === t)
              return this._layers[e];
        },
        _addLayer: function(t, e, i) {
          this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: t,
            name: e,
            overlay: i
          }), this.options.sortLayers && this._layers.sort(m(function(s, a) {
            return this.options.sortFunction(s.layer, a.layer, s.name, a.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Ae(this._baseLayersList), Ae(this._overlaysList), this._layerControlInputs = [];
          var t, e, i, s, a = 0;
          for (i = 0; i < this._layers.length; i++)
            s = this._layers[i], this._addItem(s), e = e || s.overlay, t = t || !s.overlay, a += s.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && a > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
        },
        _onLayerChange: function(t) {
          this._handlingClick || this._update();
          var e = this._getLayer(p(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
          i && this._map.fire(i, e);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(t, e) {
          var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", s = document.createElement("div");
          return s.innerHTML = i, s.firstChild;
        },
        _addItem: function(t) {
          var e = document.createElement("label"), i = this._map.hasLayer(t.layer), s;
          t.overlay ? (s = document.createElement("input"), s.type = "checkbox", s.className = "leaflet-control-layers-selector", s.defaultChecked = i) : s = this._createRadioElement("leaflet-base-layers_" + p(this), i), this._layerControlInputs.push(s), s.layerId = p(t.layer), C(s, "click", this._onInputClick, this);
          var a = document.createElement("span");
          a.innerHTML = " " + t.name;
          var l = document.createElement("span");
          e.appendChild(l), l.appendChild(s), l.appendChild(a);
          var d = t.overlay ? this._overlaysList : this._baseLayersList;
          return d.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, i, s = [], a = [];
            this._handlingClick = !0;
            for (var l = t.length - 1; l >= 0; l--)
              e = t[l], i = this._getLayer(e.layerId).layer, e.checked ? s.push(i) : e.checked || a.push(i);
            for (l = 0; l < a.length; l++)
              this._map.hasLayer(a[l]) && this._map.removeLayer(a[l]);
            for (l = 0; l < s.length; l++)
              this._map.hasLayer(s[l]) || this._map.addLayer(s[l]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, i, s = this._map.getZoom(), a = t.length - 1; a >= 0; a--)
            e = t[a], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && s < i.options.minZoom || i.options.maxZoom !== void 0 && s > i.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var t = this._section;
          this._preventClick = !0, C(t, "click", J), this.expand();
          var e = this;
          setTimeout(function() {
            U(t, "click", J), e._preventClick = !1;
          });
        }
      }), Rr = function(t, e, i) {
        return new Hn(t, e, i);
      }, Ai = dt.extend({
        // @section
        // @aka Control.Zoom options
        options: {
          position: "topleft",
          // @option zoomInText: String = '<span aria-hidden="true">+</span>'
          // The text set on the 'zoom in' button.
          zoomInText: '<span aria-hidden="true">+</span>',
          // @option zoomInTitle: String = 'Zoom in'
          // The title set on the 'zoom in' button.
          zoomInTitle: "Zoom in",
          // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
          // The text set on the 'zoom out' button.
          zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
          // @option zoomOutTitle: String = 'Zoom out'
          // The title set on the 'zoom out' button.
          zoomOutTitle: "Zoom out"
        },
        onAdd: function(t) {
          var e = "leaflet-control-zoom", i = R("div", e + " leaflet-bar"), s = this.options;
          return this._zoomInButton = this._createButton(
            s.zoomInText,
            s.zoomInTitle,
            e + "-in",
            i,
            this._zoomIn
          ), this._zoomOutButton = this._createButton(
            s.zoomOutText,
            s.zoomOutTitle,
            e + "-out",
            i,
            this._zoomOut
          ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i;
        },
        onRemove: function(t) {
          t.off("zoomend zoomlevelschange", this._updateDisabled, this);
        },
        disable: function() {
          return this._disabled = !0, this._updateDisabled(), this;
        },
        enable: function() {
          return this._disabled = !1, this._updateDisabled(), this;
        },
        _zoomIn: function(t) {
          !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
        },
        _zoomOut: function(t) {
          !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1));
        },
        _createButton: function(t, e, i, s, a) {
          var l = R("a", i, s);
          return l.innerHTML = t, l.href = "#", l.title = e, l.setAttribute("role", "button"), l.setAttribute("aria-label", e), fe(l), C(l, "click", Bt), C(l, "click", a, this), C(l, "click", this._refocusOnMap, this), l;
        },
        _updateDisabled: function() {
          var t = this._map, e = "leaflet-disabled";
          W(this._zoomInButton, e), W(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (A(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (A(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      N.mergeOptions({
        zoomControl: !0
      }), N.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new Ai(), this.addControl(this.zoomControl));
      });
      var Br = function(t) {
        return new Ai(t);
      }, jn = dt.extend({
        // @section
        // @aka Control.Scale options
        options: {
          position: "bottomleft",
          // @option maxWidth: Number = 100
          // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
          maxWidth: 100,
          // @option metric: Boolean = True
          // Whether to show the metric scale line (m/km).
          metric: !0,
          // @option imperial: Boolean = True
          // Whether to show the imperial scale line (mi/ft).
          imperial: !0
          // @option updateWhenIdle: Boolean = false
          // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
        },
        onAdd: function(t) {
          var e = "leaflet-control-scale", i = R("div", e), s = this.options;
          return this._addScales(s, e + "-line", i), t.on(s.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
        },
        onRemove: function(t) {
          t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(t, e, i) {
          t.metric && (this._mScale = R("div", e, i)), t.imperial && (this._iScale = R("div", e, i));
        },
        _update: function() {
          var t = this._map, e = t.getSize().y / 2, i = t.distance(
            t.containerPointToLatLng([0, e]),
            t.containerPointToLatLng([this.options.maxWidth, e])
          );
          this._updateScales(i);
        },
        _updateScales: function(t) {
          this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
        },
        _updateMetric: function(t) {
          var e = this._getRoundNum(t), i = e < 1e3 ? e + " m" : e / 1e3 + " km";
          this._updateScale(this._mScale, i, e / t);
        },
        _updateImperial: function(t) {
          var e = t * 3.2808399, i, s, a;
          e > 5280 ? (i = e / 5280, s = this._getRoundNum(i), this._updateScale(this._iScale, s + " mi", s / i)) : (a = this._getRoundNum(e), this._updateScale(this._iScale, a + " ft", a / e));
        },
        _updateScale: function(t, e, i) {
          t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
          return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
        }
      }), Zr = function(t) {
        return new jn(t);
      }, Fr = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Di = dt.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (S.inlineSvg ? Fr + " " : "") + "Leaflet</a>"
        },
        initialize: function(t) {
          M(this, t), this._attributions = {};
        },
        onAdd: function(t) {
          t.attributionControl = this, this._container = R("div", "leaflet-control-attribution"), fe(this._container);
          for (var e in t._layers)
            t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
          return this._update(), t.on("layeradd", this._addAttribution, this), this._container;
        },
        onRemove: function(t) {
          t.off("layeradd", this._addAttribution, this);
        },
        _addAttribution: function(t) {
          t.layer.getAttribution && (this.addAttribution(t.layer.getAttribution()), t.layer.once("remove", function() {
            this.removeAttribution(t.layer.getAttribution());
          }, this));
        },
        // @method setPrefix(prefix: String|false): this
        // The HTML text shown before the attributions. Pass `false` to disable.
        setPrefix: function(t) {
          return this.options.prefix = t, this._update(), this;
        },
        // @method addAttribution(text: String): this
        // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
        addAttribution: function(t) {
          return t ? (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this) : this;
        },
        // @method removeAttribution(text: String): this
        // Removes an attribution text.
        removeAttribution: function(t) {
          return t ? (this._attributions[t] && (this._attributions[t]--, this._update()), this) : this;
        },
        _update: function() {
          if (this._map) {
            var t = [];
            for (var e in this._attributions)
              this._attributions[e] && t.push(e);
            var i = [];
            this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(' <span aria-hidden="true">|</span> ');
          }
        }
      });
      N.mergeOptions({
        attributionControl: !0
      }), N.addInitHook(function() {
        this.options.attributionControl && new Di().addTo(this);
      });
      var Ur = function(t) {
        return new Di(t);
      };
      dt.Layers = Hn, dt.Zoom = Ai, dt.Scale = jn, dt.Attribution = Di, me.layers = Rr, me.zoom = Br, me.scale = Zr, me.attribution = Ur;
      var mt = yt.extend({
        initialize: function(t) {
          this._map = t;
        },
        // @method enable(): this
        // Enables the handler
        enable: function() {
          return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
        },
        // @method disable(): this
        // Disables the handler
        disable: function() {
          return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
        },
        // @method enabled(): Boolean
        // Returns `true` if the handler is enabled
        enabled: function() {
          return !!this._enabled;
        }
        // @section Extension methods
        // Classes inheriting from `Handler` must implement the two following methods:
        // @method addHooks()
        // Called when the handler is enabled, should add event hooks.
        // @method removeHooks()
        // Called when the handler is disabled, should remove the event hooks added previously.
      });
      mt.addTo = function(t, e) {
        return t.addHandler(e, this), this;
      };
      var Hr = { Events: rt }, Wn = S.touch ? "touchstart mousedown" : "mousedown", Lt = ae.extend({
        options: {
          // @section
          // @aka Draggable options
          // @option clickTolerance: Number = 3
          // The max number of pixels a user can shift the mouse pointer during a click
          // for it to be considered a valid click (as opposed to a mouse drag).
          clickTolerance: 3
        },
        // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
        // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
        initialize: function(t, e, i, s) {
          M(this, s), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (C(this._dragStartTarget, Wn, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Lt._dragging === this && this.finishDrag(!0), U(this._dragStartTarget, Wn, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(t) {
          if (this._enabled && (this._moved = !1, !yi(this._element, "leaflet-zoom-anim"))) {
            if (t.touches && t.touches.length !== 1) {
              Lt._dragging === this && this.finishDrag();
              return;
            }
            if (!(Lt._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Lt._dragging = this, this._preventOutline && Pi(this._element), wi(), de(), !this._moving)) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t, i = Nn(this._element);
              this._startPoint = new I(e.clientX, e.clientY), this._startPos = Nt(this._element), this._parentScale = Si(i);
              var s = t.type === "mousedown";
              C(document, s ? "mousemove" : "touchmove", this._onMove, this), C(document, s ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(t) {
          if (this._enabled) {
            if (t.touches && t.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new I(e.clientX, e.clientY)._subtract(this._startPoint);
            !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, J(t), this._moved || (this.fire("dragstart"), this._moved = !0, A(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), A(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var t = { originalEvent: this._lastEvent };
          this.fire("predrag", t), G(this._element, this._newPos), this.fire("drag", t);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(t) {
          W(document.body, "leaflet-dragging"), this._lastTarget && (W(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), U(document, "mousemove touchmove", this._onMove, this), U(document, "mouseup touchend touchcancel", this._onUp, this), Ti(), ue();
          var e = this._moved && this._moving;
          this._moving = !1, Lt._dragging = !1, e && this.fire("dragend", {
            noInertia: t,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function qn(t, e, i) {
        var s, a = [1, 4, 2, 8], l, d, f, g, v, w, E, D;
        for (l = 0, w = t.length; l < w; l++)
          t[l]._code = Zt(t[l], e);
        for (f = 0; f < 4; f++) {
          for (E = a[f], s = [], l = 0, w = t.length, d = w - 1; l < w; d = l++)
            g = t[l], v = t[d], g._code & E ? v._code & E || (D = Ne(v, g, E, e, i), D._code = Zt(D, e), s.push(D)) : (v._code & E && (D = Ne(v, g, E, e, i), D._code = Zt(D, e), s.push(D)), s.push(g));
          t = s;
        }
        return t;
      }
      function Gn(t, e) {
        var i, s, a, l, d, f, g, v, w;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        lt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var E = O([0, 0]), D = q(t), tt = D.getNorthWest().distanceTo(D.getSouthWest()) * D.getNorthEast().distanceTo(D.getNorthWest());
        tt < 1700 && (E = Mi(t));
        var Y = t.length, ht = [];
        for (i = 0; i < Y; i++) {
          var st = O(t[i]);
          ht.push(e.project(O([st.lat - E.lat, st.lng - E.lng])));
        }
        for (f = g = v = 0, i = 0, s = Y - 1; i < Y; s = i++)
          a = ht[i], l = ht[s], d = a.y * l.x - l.y * a.x, g += (a.x + l.x) * d, v += (a.y + l.y) * d, f += d * 3;
        f === 0 ? w = ht[0] : w = [g / f, v / f];
        var te = e.unproject(k(w));
        return O([te.lat + E.lat, te.lng + E.lng]);
      }
      function Mi(t) {
        for (var e = 0, i = 0, s = 0, a = 0; a < t.length; a++) {
          var l = O(t[a]);
          e += l.lat, i += l.lng, s++;
        }
        return O([e / s, i / s]);
      }
      var jr = {
        __proto__: null,
        clipPolygon: qn,
        polygonCenter: Gn,
        centroid: Mi
      };
      function Vn(t, e) {
        if (!e || !t.length)
          return t.slice();
        var i = e * e;
        return t = Gr(t, i), t = qr(t, i), t;
      }
      function Kn(t, e, i) {
        return Math.sqrt(ge(t, e, i, !0));
      }
      function Wr(t, e, i) {
        return ge(t, e, i);
      }
      function qr(t, e) {
        var i = t.length, s = typeof Uint8Array < "u" ? Uint8Array : Array, a = new s(i);
        a[0] = a[i - 1] = 1, zi(t, a, e, 0, i - 1);
        var l, d = [];
        for (l = 0; l < i; l++)
          a[l] && d.push(t[l]);
        return d;
      }
      function zi(t, e, i, s, a) {
        var l = 0, d, f, g;
        for (f = s + 1; f <= a - 1; f++)
          g = ge(t[f], t[s], t[a], !0), g > l && (d = f, l = g);
        l > i && (e[d] = 1, zi(t, e, i, s, d), zi(t, e, i, d, a));
      }
      function Gr(t, e) {
        for (var i = [t[0]], s = 1, a = 0, l = t.length; s < l; s++)
          Vr(t[s], t[a]) > e && (i.push(t[s]), a = s);
        return a < l - 1 && i.push(t[l - 1]), i;
      }
      var Yn;
      function Xn(t, e, i, s, a) {
        var l = s ? Yn : Zt(t, i), d = Zt(e, i), f, g, v;
        for (Yn = d; ; ) {
          if (!(l | d))
            return [t, e];
          if (l & d)
            return !1;
          f = l || d, g = Ne(t, e, f, i, a), v = Zt(g, i), f === l ? (t = g, l = v) : (e = g, d = v);
        }
      }
      function Ne(t, e, i, s, a) {
        var l = e.x - t.x, d = e.y - t.y, f = s.min, g = s.max, v, w;
        return i & 8 ? (v = t.x + l * (g.y - t.y) / d, w = g.y) : i & 4 ? (v = t.x + l * (f.y - t.y) / d, w = f.y) : i & 2 ? (v = g.x, w = t.y + d * (g.x - t.x) / l) : i & 1 && (v = f.x, w = t.y + d * (f.x - t.x) / l), new I(v, w, a);
      }
      function Zt(t, e) {
        var i = 0;
        return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
      }
      function Vr(t, e) {
        var i = e.x - t.x, s = e.y - t.y;
        return i * i + s * s;
      }
      function ge(t, e, i, s) {
        var a = e.x, l = e.y, d = i.x - a, f = i.y - l, g = d * d + f * f, v;
        return g > 0 && (v = ((t.x - a) * d + (t.y - l) * f) / g, v > 1 ? (a = i.x, l = i.y) : v > 0 && (a += d * v, l += f * v)), d = t.x - a, f = t.y - l, s ? d * d + f * f : new I(a, l);
      }
      function lt(t) {
        return !ct(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function Jn(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), lt(t);
      }
      function Qn(t, e) {
        var i, s, a, l, d, f, g, v;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        lt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var w = O([0, 0]), E = q(t), D = E.getNorthWest().distanceTo(E.getSouthWest()) * E.getNorthEast().distanceTo(E.getNorthWest());
        D < 1700 && (w = Mi(t));
        var tt = t.length, Y = [];
        for (i = 0; i < tt; i++) {
          var ht = O(t[i]);
          Y.push(e.project(O([ht.lat - w.lat, ht.lng - w.lng])));
        }
        for (i = 0, s = 0; i < tt - 1; i++)
          s += Y[i].distanceTo(Y[i + 1]) / 2;
        if (s === 0)
          v = Y[0];
        else
          for (i = 0, l = 0; i < tt - 1; i++)
            if (d = Y[i], f = Y[i + 1], a = d.distanceTo(f), l += a, l > s) {
              g = (l - s) / a, v = [
                f.x - g * (f.x - d.x),
                f.y - g * (f.y - d.y)
              ];
              break;
            }
        var st = e.unproject(k(v));
        return O([st.lat + w.lat, st.lng + w.lng]);
      }
      var Kr = {
        __proto__: null,
        simplify: Vn,
        pointToSegmentDistance: Kn,
        closestPointOnSegment: Wr,
        clipSegment: Xn,
        _getEdgeIntersection: Ne,
        _getBitCode: Zt,
        _sqClosestPointOnSegment: ge,
        isFlat: lt,
        _flat: Jn,
        polylineCenter: Qn
      }, Oi = {
        project: function(t) {
          return new I(t.lng, t.lat);
        },
        unproject: function(t) {
          return new B(t.y, t.x);
        },
        bounds: new H([-180, -90], [180, 90])
      }, Ni = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new H([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, i = this.R, s = t.lat * e, a = this.R_MINOR / i, l = Math.sqrt(1 - a * a), d = l * Math.sin(s), f = Math.tan(Math.PI / 4 - s / 2) / Math.pow((1 - d) / (1 + d), l / 2);
          return s = -i * Math.log(Math.max(f, 1e-10)), new I(t.lng * e * i, s);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, i = this.R, s = this.R_MINOR / i, a = Math.sqrt(1 - s * s), l = Math.exp(-t.y / i), d = Math.PI / 2 - 2 * Math.atan(l), f = 0, g = 0.1, v; f < 15 && Math.abs(g) > 1e-7; f++)
            v = a * Math.sin(d), v = Math.pow((1 - v) / (1 + v), a / 2), g = Math.PI / 2 - 2 * Math.atan(l * v) - d, d += g;
          return new B(d * e, t.x * e / i);
        }
      }, Yr = {
        __proto__: null,
        LonLat: Oi,
        Mercator: Ni,
        SphericalMercator: hi
      }, Xr = h({}, Et, {
        code: "EPSG:3395",
        projection: Ni,
        transformation: (function() {
          var t = 0.5 / (Math.PI * Ni.R);
          return oe(t, 0.5, -t, 0.5);
        })()
      }), ts = h({}, Et, {
        code: "EPSG:4326",
        projection: Oi,
        transformation: oe(1 / 180, 1, -1 / 180, 0.5)
      }), Jr = h({}, xt, {
        projection: Oi,
        transformation: oe(1, 0, -1, 0),
        scale: function(t) {
          return Math.pow(2, t);
        },
        zoom: function(t) {
          return Math.log(t) / Math.LN2;
        },
        distance: function(t, e) {
          var i = e.lng - t.lng, s = e.lat - t.lat;
          return Math.sqrt(i * i + s * s);
        },
        infinite: !0
      });
      xt.Earth = Et, xt.EPSG3395 = Xr, xt.EPSG3857 = di, xt.EPSG900913 = sr, xt.EPSG4326 = ts, xt.Simple = Jr;
      var ut = ae.extend({
        // Classes extending `L.Layer` will inherit the following options:
        options: {
          // @option pane: String = 'overlayPane'
          // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
          pane: "overlayPane",
          // @option attribution: String = null
          // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
          attribution: null,
          bubblingMouseEvents: !0
        },
        /* @section
         * Classes extending `L.Layer` will inherit the following methods:
         *
         * @method addTo(map: Map|LayerGroup): this
         * Adds the layer to the given map or layer group.
         */
        addTo: function(t) {
          return t.addLayer(this), this;
        },
        // @method remove: this
        // Removes the layer from the map it is currently active on.
        remove: function() {
          return this.removeFrom(this._map || this._mapToAdd);
        },
        // @method removeFrom(map: Map): this
        // Removes the layer from the given map
        //
        // @alternative
        // @method removeFrom(group: LayerGroup): this
        // Removes the layer from the given `LayerGroup`
        removeFrom: function(t) {
          return t && t.removeLayer(this), this;
        },
        // @method getPane(name? : String): HTMLElement
        // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
        getPane: function(t) {
          return this._map.getPane(t ? this.options[t] || t : this.options.pane);
        },
        addInteractiveTarget: function(t) {
          return this._map._targets[p(t)] = this, this;
        },
        removeInteractiveTarget: function(t) {
          return delete this._map._targets[p(t)], this;
        },
        // @method getAttribution: String
        // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
        getAttribution: function() {
          return this.options.attribution;
        },
        _layerAdd: function(t) {
          var e = t.target;
          if (e.hasLayer(this)) {
            if (this._map = e, this._zoomAnimated = e._zoomAnimated, this.getEvents) {
              var i = this.getEvents();
              e.on(i, this), this.once("remove", function() {
                e.off(i, this);
              }, this);
            }
            this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
          }
        }
      });
      N.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(t) {
          if (!t._layerAdd)
            throw new Error("The provided object is not a Layer.");
          var e = p(t);
          return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(t) {
          var e = p(t);
          return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(t) {
          return p(t) in this._layers;
        },
        /* @method eachLayer(fn: Function, context?: Object): this
         * Iterates over the layers of the map, optionally specifying context of the iterator function.
         * ```
         * map.eachLayer(function(layer){
         *     layer.bindPopup('Hello');
         * });
         * ```
         */
        eachLayer: function(t, e) {
          for (var i in this._layers)
            t.call(e, this._layers[i]);
          return this;
        },
        _addLayers: function(t) {
          t = t ? ct(t) ? t : [t] : [];
          for (var e = 0, i = t.length; e < i; e++)
            this.addLayer(t[e]);
        },
        _addZoomLimit: function(t) {
          (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[p(t)] = t, this._updateZoomLevels());
        },
        _removeZoomLimit: function(t) {
          var e = p(t);
          this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
          var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
          for (var s in this._zoomBoundLayers) {
            var a = this._zoomBoundLayers[s].options;
            t = a.minZoom === void 0 ? t : Math.min(t, a.minZoom), e = a.maxZoom === void 0 ? e : Math.max(e, a.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Kt = ut.extend({
        initialize: function(t, e) {
          M(this, e), this._layers = {};
          var i, s;
          if (t)
            for (i = 0, s = t.length; i < s; i++)
              this.addLayer(t[i]);
        },
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the group.
        addLayer: function(t) {
          var e = this.getLayerId(t);
          return this._layers[e] = t, this._map && this._map.addLayer(t), this;
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the group.
        // @alternative
        // @method removeLayer(id: Number): this
        // Removes the layer with the given internal ID from the group.
        removeLayer: function(t) {
          var e = t in this._layers ? t : this.getLayerId(t);
          return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the group.
        // @alternative
        // @method hasLayer(id: Number): Boolean
        // Returns `true` if the given internal ID is currently added to the group.
        hasLayer: function(t) {
          var e = typeof t == "number" ? t : this.getLayerId(t);
          return e in this._layers;
        },
        // @method clearLayers(): this
        // Removes all the layers from the group.
        clearLayers: function() {
          return this.eachLayer(this.removeLayer, this);
        },
        // @method invoke(methodName: String, …): this
        // Calls `methodName` on every layer contained in this group, passing any
        // additional parameters. Has no effect if the layers contained do not
        // implement `methodName`.
        invoke: function(t) {
          var e = Array.prototype.slice.call(arguments, 1), i, s;
          for (i in this._layers)
            s = this._layers[i], s[t] && s[t].apply(s, e);
          return this;
        },
        onAdd: function(t) {
          this.eachLayer(t.addLayer, t);
        },
        onRemove: function(t) {
          this.eachLayer(t.removeLayer, t);
        },
        // @method eachLayer(fn: Function, context?: Object): this
        // Iterates over the layers of the group, optionally specifying context of the iterator function.
        // ```js
        // group.eachLayer(function (layer) {
        // 	layer.bindPopup('Hello');
        // });
        // ```
        eachLayer: function(t, e) {
          for (var i in this._layers)
            t.call(e, this._layers[i]);
          return this;
        },
        // @method getLayer(id: Number): Layer
        // Returns the layer with the given internal ID.
        getLayer: function(t) {
          return this._layers[t];
        },
        // @method getLayers(): Layer[]
        // Returns an array of all the layers added to the group.
        getLayers: function() {
          var t = [];
          return this.eachLayer(t.push, t), t;
        },
        // @method setZIndex(zIndex: Number): this
        // Calls `setZIndex` on every layer contained in this group, passing the z-index.
        setZIndex: function(t) {
          return this.invoke("setZIndex", t);
        },
        // @method getLayerId(layer: Layer): Number
        // Returns the internal ID for a layer
        getLayerId: function(t) {
          return p(t);
        }
      }), Qr = function(t, e) {
        return new Kt(t, e);
      }, bt = Kt.extend({
        addLayer: function(t) {
          return this.hasLayer(t) ? this : (t.addEventParent(this), Kt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
        },
        removeLayer: function(t) {
          return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Kt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
        },
        // @method setStyle(style: Path options): this
        // Sets the given path options to each layer of the group that has a `setStyle` method.
        setStyle: function(t) {
          return this.invoke("setStyle", t);
        },
        // @method bringToFront(): this
        // Brings the layer group to the top of all other layers
        bringToFront: function() {
          return this.invoke("bringToFront");
        },
        // @method bringToBack(): this
        // Brings the layer group to the back of all other layers
        bringToBack: function() {
          return this.invoke("bringToBack");
        },
        // @method getBounds(): LatLngBounds
        // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
        getBounds: function() {
          var t = new nt();
          for (var e in this._layers) {
            var i = this._layers[e];
            t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
          }
          return t;
        }
      }), ta = function(t, e) {
        return new bt(t, e);
      }, Yt = yt.extend({
        /* @section
         * @aka Icon options
         *
         * @option iconUrl: String = null
         * **(required)** The URL to the icon image (absolute or relative to your script path).
         *
         * @option iconRetinaUrl: String = null
         * The URL to a retina sized version of the icon image (absolute or relative to your
         * script path). Used for Retina screen devices.
         *
         * @option iconSize: Point = null
         * Size of the icon image in pixels.
         *
         * @option iconAnchor: Point = null
         * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
         * will be aligned so that this point is at the marker's geographical location. Centered
         * by default if size is specified, also can be set in CSS with negative margins.
         *
         * @option popupAnchor: Point = [0, 0]
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         *
         * @option tooltipAnchor: Point = [0, 0]
         * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
         *
         * @option shadowUrl: String = null
         * The URL to the icon shadow image. If not specified, no shadow image will be created.
         *
         * @option shadowRetinaUrl: String = null
         *
         * @option shadowSize: Point = null
         * Size of the shadow image in pixels.
         *
         * @option shadowAnchor: Point = null
         * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
         * as iconAnchor if not specified).
         *
         * @option className: String = ''
         * A custom class name to assign to both icon and shadow images. Empty by default.
         */
        options: {
          popupAnchor: [0, 0],
          tooltipAnchor: [0, 0],
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: !1
        },
        initialize: function(t) {
          M(this, t);
        },
        // @method createIcon(oldIcon?: HTMLElement): HTMLElement
        // Called internally when the icon has to be shown, returns a `<img>` HTML element
        // styled according to the options.
        createIcon: function(t) {
          return this._createIcon("icon", t);
        },
        // @method createShadow(oldIcon?: HTMLElement): HTMLElement
        // As `createIcon`, but for the shadow beneath it.
        createShadow: function(t) {
          return this._createIcon("shadow", t);
        },
        _createIcon: function(t, e) {
          var i = this._getIconUrl(t);
          if (!i) {
            if (t === "icon")
              throw new Error("iconUrl not set in Icon options (see the docs).");
            return null;
          }
          var s = this._createImg(i, e && e.tagName === "IMG" ? e : null);
          return this._setIconStyles(s, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), s;
        },
        _setIconStyles: function(t, e) {
          var i = this.options, s = i[e + "Size"];
          typeof s == "number" && (s = [s, s]);
          var a = k(s), l = k(e === "shadow" && i.shadowAnchor || i.iconAnchor || a && a.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (i.className || ""), l && (t.style.marginLeft = -l.x + "px", t.style.marginTop = -l.y + "px"), a && (t.style.width = a.x + "px", t.style.height = a.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return S.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function ea(t) {
        return new Yt(t);
      }
      var _e = Yt.extend({
        options: {
          iconUrl: "marker-icon.png",
          iconRetinaUrl: "marker-icon-2x.png",
          shadowUrl: "marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        },
        _getIconUrl: function(t) {
          return typeof _e.imagePath != "string" && (_e.imagePath = this._detectIconPath()), (this.options.imagePath || _e.imagePath) + Yt.prototype._getIconUrl.call(this, t);
        },
        _stripUrl: function(t) {
          var e = function(i, s, a) {
            var l = s.exec(i);
            return l && l[a];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = R("div", "leaflet-default-icon-path", document.body), e = ce(t, "background-image") || ce(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var i = document.querySelector('link[href$="leaflet.css"]');
          return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
        }
      }), es = mt.extend({
        initialize: function(t) {
          this._marker = t;
        },
        addHooks: function() {
          var t = this._marker._icon;
          this._draggable || (this._draggable = new Lt(t, t, !0)), this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable(), A(t, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && W(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(t) {
          var e = this._marker, i = e._map, s = this._marker.options.autoPanSpeed, a = this._marker.options.autoPanPadding, l = Nt(e._icon), d = i.getPixelBounds(), f = i.getPixelOrigin(), g = it(
            d.min._subtract(f).add(a),
            d.max._subtract(f).subtract(a)
          );
          if (!g.contains(l)) {
            var v = k(
              (Math.max(g.max.x, l.x) - g.max.x) / (d.max.x - g.max.x) - (Math.min(g.min.x, l.x) - g.min.x) / (d.min.x - g.min.x),
              (Math.max(g.max.y, l.y) - g.max.y) / (d.max.y - g.max.y) - (Math.min(g.min.y, l.y) - g.min.y) / (d.min.y - g.min.y)
            ).multiplyBy(s);
            i.panBy(v, { animate: !1 }), this._draggable._newPos._add(v), this._draggable._startPos._add(v), G(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = et(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (at(this._panRequest), this._panRequest = et(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, i = e._shadow, s = Nt(e._icon), a = e._map.layerPointToLatLng(s);
          i && G(i, s), e._latlng = a, t.latlng = a, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          at(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
        }
      }), Re = ut.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new _e(),
          // Option inherited from "Interactive layer" abstract class
          interactive: !0,
          // @option keyboard: Boolean = true
          // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
          keyboard: !0,
          // @option title: String = ''
          // Text for the browser tooltip that appear on marker hover (no tooltip by default).
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          title: "",
          // @option alt: String = 'Marker'
          // Text for the `alt` attribute of the icon image.
          // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
          alt: "Marker",
          // @option zIndexOffset: Number = 0
          // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
          zIndexOffset: 0,
          // @option opacity: Number = 1.0
          // The opacity of the marker.
          opacity: 1,
          // @option riseOnHover: Boolean = false
          // If `true`, the marker will get on top of others when you hover the mouse over it.
          riseOnHover: !1,
          // @option riseOffset: Number = 250
          // The z-index offset used for the `riseOnHover` feature.
          riseOffset: 250,
          // @option pane: String = 'markerPane'
          // `Map pane` where the markers icon will be added.
          pane: "markerPane",
          // @option shadowPane: String = 'shadowPane'
          // `Map pane` where the markers shadow will be added.
          shadowPane: "shadowPane",
          // @option bubblingMouseEvents: Boolean = false
          // When `true`, a mouse event on this marker will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: !1,
          // @option autoPanOnFocus: Boolean = true
          // When `true`, the map will pan whenever the marker is focused (via
          // e.g. pressing `tab` on the keyboard) to ensure the marker is
          // visible within the map's bounds
          autoPanOnFocus: !0,
          // @section Draggable marker options
          // @option draggable: Boolean = false
          // Whether the marker is draggable with mouse/touch or not.
          draggable: !1,
          // @option autoPan: Boolean = false
          // Whether to pan the map when dragging this marker near its edge or not.
          autoPan: !1,
          // @option autoPanPadding: Point = Point(50, 50)
          // Distance (in pixels to the left/right and to the top/bottom) of the
          // map edge to start panning the map.
          autoPanPadding: [50, 50],
          // @option autoPanSpeed: Number = 10
          // Number of pixels the map should pan by.
          autoPanSpeed: 10
        },
        /* @section
         *
         * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
         */
        initialize: function(t, e) {
          M(this, e), this._latlng = O(t);
        },
        onAdd: function(t) {
          this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
        },
        onRemove: function(t) {
          this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
        },
        getEvents: function() {
          return {
            zoom: this.update,
            viewreset: this.update
          };
        },
        // @method getLatLng: LatLng
        // Returns the current geographical position of the marker.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Changes the marker position to the given point.
        setLatLng: function(t) {
          var e = this._latlng;
          return this._latlng = O(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
        },
        // @method setZIndexOffset(offset: Number): this
        // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
        setZIndexOffset: function(t) {
          return this.options.zIndexOffset = t, this.update();
        },
        // @method getIcon: Icon
        // Returns the current icon used by the marker
        getIcon: function() {
          return this.options.icon;
        },
        // @method setIcon(icon: Icon): this
        // Changes the marker icon.
        setIcon: function(t) {
          return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
        },
        getElement: function() {
          return this._icon;
        },
        update: function() {
          if (this._icon && this._map) {
            var t = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(t);
          }
          return this;
        },
        _initIcon: function() {
          var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), s = !1;
          i !== this._icon && (this._icon && this._removeIcon(), s = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), A(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && C(i, "focus", this._panOnFocus, this);
          var a = t.icon.createShadow(this._shadow), l = !1;
          a !== this._shadow && (this._removeShadow(), l = !0), a && (A(a, e), a.alt = ""), this._shadow = a, t.opacity < 1 && this._updateOpacity(), s && this.getPane().appendChild(this._icon), this._initInteraction(), a && l && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && U(this._icon, "focus", this._panOnFocus, this), j(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && j(this._shadow), this._shadow = null;
        },
        _setPos: function(t) {
          this._icon && G(this._icon, t), this._shadow && G(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(t) {
          this._icon && (this._icon.style.zIndex = this._zIndex + t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
          this._setPos(e);
        },
        _initInteraction: function() {
          if (this.options.interactive && (A(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), es)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new es(this), t && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(t) {
          return this.options.opacity = t, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var t = this.options.opacity;
          this._icon && ot(this._icon, t), this._shadow && ot(this._shadow, t);
        },
        _bringToFront: function() {
          this._updateZIndex(this.options.riseOffset);
        },
        _resetZIndex: function() {
          this._updateZIndex(0);
        },
        _panOnFocus: function() {
          var t = this._map;
          if (t) {
            var e = this.options.icon.options, i = e.iconSize ? k(e.iconSize) : k(0, 0), s = e.iconAnchor ? k(e.iconAnchor) : k(0, 0);
            t.panInside(this._latlng, {
              paddingTopLeft: s,
              paddingBottomRight: i.subtract(s)
            });
          }
        },
        _getPopupAnchor: function() {
          return this.options.icon.options.popupAnchor;
        },
        _getTooltipAnchor: function() {
          return this.options.icon.options.tooltipAnchor;
        }
      });
      function ia(t, e) {
        return new Re(t, e);
      }
      var kt = ut.extend({
        // @section
        // @aka Path options
        options: {
          // @option stroke: Boolean = true
          // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
          stroke: !0,
          // @option color: String = '#3388ff'
          // Stroke color
          color: "#3388ff",
          // @option weight: Number = 3
          // Stroke width in pixels
          weight: 3,
          // @option opacity: Number = 1.0
          // Stroke opacity
          opacity: 1,
          // @option lineCap: String= 'round'
          // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
          lineCap: "round",
          // @option lineJoin: String = 'round'
          // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
          lineJoin: "round",
          // @option dashArray: String = null
          // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashArray: null,
          // @option dashOffset: String = null
          // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
          dashOffset: null,
          // @option fill: Boolean = depends
          // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
          fill: !1,
          // @option fillColor: String = *
          // Fill color. Defaults to the value of the [`color`](#path-color) option
          fillColor: null,
          // @option fillOpacity: Number = 0.2
          // Fill opacity.
          fillOpacity: 0.2,
          // @option fillRule: String = 'evenodd'
          // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
          fillRule: "evenodd",
          // className: '',
          // Option inherited from "Interactive layer" abstract class
          interactive: !0,
          // @option bubblingMouseEvents: Boolean = true
          // When `true`, a mouse event on this path will trigger the same event on the map
          // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
          bubblingMouseEvents: !0
        },
        beforeAdd: function(t) {
          this._renderer = t.getRenderer(this);
        },
        onAdd: function() {
          this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
        },
        onRemove: function() {
          this._renderer._removePath(this);
        },
        // @method redraw(): this
        // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
        redraw: function() {
          return this._map && this._renderer._updatePath(this), this;
        },
        // @method setStyle(style: Path options): this
        // Changes the appearance of a Path based on the options in the `Path options` object.
        setStyle: function(t) {
          return M(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all path layers.
        bringToFront: function() {
          return this._renderer && this._renderer._bringToFront(this), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all path layers.
        bringToBack: function() {
          return this._renderer && this._renderer._bringToBack(this), this;
        },
        getElement: function() {
          return this._path;
        },
        _reset: function() {
          this._project(), this._update();
        },
        _clickTolerance: function() {
          return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
        }
      }), Be = kt.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(t, e) {
          M(this, e), this._latlng = O(t), this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(t) {
          var e = this._latlng;
          return this._latlng = O(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
        },
        // @method getLatLng(): LatLng
        // Returns the current geographical position of the circle marker
        getLatLng: function() {
          return this._latlng;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle marker. Units are in pixels.
        setRadius: function(t) {
          return this.options.radius = this._radius = t, this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of the circle
        getRadius: function() {
          return this._radius;
        },
        setStyle: function(t) {
          var e = t && t.radius || this._radius;
          return kt.prototype.setStyle.call(this, t), this.setRadius(e), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), s = [t + i, e + i];
          this._pxBounds = new H(this._point.subtract(s), this._point.add(s));
        },
        _update: function() {
          this._map && this._updatePath();
        },
        _updatePath: function() {
          this._renderer._updateCircle(this);
        },
        _empty: function() {
          return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          return t.distanceTo(this._point) <= this._radius + this._clickTolerance();
        }
      });
      function na(t, e) {
        return new Be(t, e);
      }
      var Ri = Be.extend({
        initialize: function(t, e, i) {
          if (typeof e == "number" && (e = h({}, i, { radius: e })), M(this, e), this._latlng = O(t), isNaN(this.options.radius))
            throw new Error("Circle radius cannot be NaN");
          this._mRadius = this.options.radius;
        },
        // @method setRadius(radius: Number): this
        // Sets the radius of a circle. Units are in meters.
        setRadius: function(t) {
          return this._mRadius = t, this.redraw();
        },
        // @method getRadius(): Number
        // Returns the current radius of a circle. Units are in meters.
        getRadius: function() {
          return this._mRadius;
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          var t = [this._radius, this._radiusY || this._radius];
          return new nt(
            this._map.layerPointToLatLng(this._point.subtract(t)),
            this._map.layerPointToLatLng(this._point.add(t))
          );
        },
        setStyle: kt.prototype.setStyle,
        _project: function() {
          var t = this._latlng.lng, e = this._latlng.lat, i = this._map, s = i.options.crs;
          if (s.distance === Et.distance) {
            var a = Math.PI / 180, l = this._mRadius / Et.R / a, d = i.project([e + l, t]), f = i.project([e - l, t]), g = d.add(f).divideBy(2), v = i.unproject(g).lat, w = Math.acos((Math.cos(l * a) - Math.sin(e * a) * Math.sin(v * a)) / (Math.cos(e * a) * Math.cos(v * a))) / a;
            (isNaN(w) || w === 0) && (w = l / Math.cos(Math.PI / 180 * e)), this._point = g.subtract(i.getPixelOrigin()), this._radius = isNaN(w) ? 0 : g.x - i.project([v, t - w]).x, this._radiusY = g.y - d.y;
          } else {
            var E = s.unproject(s.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(E).x;
          }
          this._updateBounds();
        }
      });
      function sa(t, e, i) {
        return new Ri(t, e, i);
      }
      var wt = kt.extend({
        // @section
        // @aka Polyline options
        options: {
          // @option smoothFactor: Number = 1.0
          // How much to simplify the polyline on each zoom level. More means
          // better performance and smoother look, and less means more accurate representation.
          smoothFactor: 1,
          // @option noClip: Boolean = false
          // Disable polyline clipping.
          noClip: !1
        },
        initialize: function(t, e) {
          M(this, e), this._setLatLngs(t);
        },
        // @method getLatLngs(): LatLng[]
        // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
        getLatLngs: function() {
          return this._latlngs;
        },
        // @method setLatLngs(latlngs: LatLng[]): this
        // Replaces all the points in the polyline with the given array of geographical points.
        setLatLngs: function(t) {
          return this._setLatLngs(t), this.redraw();
        },
        // @method isEmpty(): Boolean
        // Returns `true` if the Polyline has no LatLngs.
        isEmpty: function() {
          return !this._latlngs.length;
        },
        // @method closestLayerPoint(p: Point): Point
        // Returns the point closest to `p` on the Polyline.
        closestLayerPoint: function(t) {
          for (var e = 1 / 0, i = null, s = ge, a, l, d = 0, f = this._parts.length; d < f; d++)
            for (var g = this._parts[d], v = 1, w = g.length; v < w; v++) {
              a = g[v - 1], l = g[v];
              var E = s(t, a, l, !0);
              E < e && (e = E, i = s(t, a, l));
            }
          return i && (i.distance = Math.sqrt(e)), i;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return Qn(this._defaultShape(), this._map.options.crs);
        },
        // @method getBounds(): LatLngBounds
        // Returns the `LatLngBounds` of the path.
        getBounds: function() {
          return this._bounds;
        },
        // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
        // Adds a given point to the polyline. By default, adds to the first ring of
        // the polyline in case of a multi-polyline, but can be overridden by passing
        // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
        addLatLng: function(t, e) {
          return e = e || this._defaultShape(), t = O(t), e.push(t), this._bounds.extend(t), this.redraw();
        },
        _setLatLngs: function(t) {
          this._bounds = new nt(), this._latlngs = this._convertLatLngs(t);
        },
        _defaultShape: function() {
          return lt(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(t) {
          for (var e = [], i = lt(t), s = 0, a = t.length; s < a; s++)
            i ? (e[s] = O(t[s]), this._bounds.extend(e[s])) : e[s] = this._convertLatLngs(t[s]);
          return e;
        },
        _project: function() {
          var t = new H();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
        },
        _updateBounds: function() {
          var t = this._clickTolerance(), e = new I(t, t);
          this._rawPxBounds && (this._pxBounds = new H([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(t, e, i) {
          var s = t[0] instanceof B, a = t.length, l, d;
          if (s) {
            for (d = [], l = 0; l < a; l++)
              d[l] = this._map.latLngToLayerPoint(t[l]), i.extend(d[l]);
            e.push(d);
          } else
            for (l = 0; l < a; l++)
              this._projectLatlngs(t[l], e, i);
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var t = this._renderer._bounds;
          if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var e = this._parts, i, s, a, l, d, f, g;
            for (i = 0, a = 0, l = this._rings.length; i < l; i++)
              for (g = this._rings[i], s = 0, d = g.length; s < d - 1; s++)
                f = Xn(g[s], g[s + 1], t, s, !0), f && (e[a] = e[a] || [], e[a].push(f[0]), (f[1] !== g[s + 1] || s === d - 2) && (e[a].push(f[1]), a++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var t = this._parts, e = this.options.smoothFactor, i = 0, s = t.length; i < s; i++)
            t[i] = Vn(t[i], e);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t, e) {
          var i, s, a, l, d, f, g = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (i = 0, l = this._parts.length; i < l; i++)
            for (f = this._parts[i], s = 0, d = f.length, a = d - 1; s < d; a = s++)
              if (!(!e && s === 0) && Kn(t, f[a], f[s]) <= g)
                return !0;
          return !1;
        }
      });
      function ra(t, e) {
        return new wt(t, e);
      }
      wt._flat = Jn;
      var Xt = wt.extend({
        options: {
          fill: !0
        },
        isEmpty: function() {
          return !this._latlngs.length || !this._latlngs[0].length;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return Gn(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(t) {
          var e = wt.prototype._convertLatLngs.call(this, t), i = e.length;
          return i >= 2 && e[0] instanceof B && e[0].equals(e[i - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          wt.prototype._setLatLngs.call(this, t), lt(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return lt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, i = new I(e, e);
          if (t = new H(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var s = 0, a = this._rings.length, l; s < a; s++)
              l = qn(this._rings[s], t, !0), l.length && this._parts.push(l);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, i, s, a, l, d, f, g, v;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (l = 0, g = this._parts.length; l < g; l++)
            for (i = this._parts[l], d = 0, v = i.length, f = v - 1; d < v; f = d++)
              s = i[d], a = i[f], s.y > t.y != a.y > t.y && t.x < (a.x - s.x) * (t.y - s.y) / (a.y - s.y) + s.x && (e = !e);
          return e || wt.prototype._containsPoint.call(this, t, !0);
        }
      });
      function aa(t, e) {
        return new Xt(t, e);
      }
      var Tt = bt.extend({
        /* @section
         * @aka GeoJSON options
         *
         * @option pointToLayer: Function = *
         * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
         * called when data is added, passing the GeoJSON point feature and its `LatLng`.
         * The default is to spawn a default `Marker`:
         * ```js
         * function(geoJsonPoint, latlng) {
         * 	return L.marker(latlng);
         * }
         * ```
         *
         * @option style: Function = *
         * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
         * called internally when data is added.
         * The default value is to not override any defaults:
         * ```js
         * function (geoJsonFeature) {
         * 	return {}
         * }
         * ```
         *
         * @option onEachFeature: Function = *
         * A `Function` that will be called once for each created `Feature`, after it has
         * been created and styled. Useful for attaching events and popups to features.
         * The default is to do nothing with the newly created layers:
         * ```js
         * function (feature, layer) {}
         * ```
         *
         * @option filter: Function = *
         * A `Function` that will be used to decide whether to include a feature or not.
         * The default is to include all features:
         * ```js
         * function (geoJsonFeature) {
         * 	return true;
         * }
         * ```
         * Note: dynamically changing the `filter` option will have effect only on newly
         * added data. It will _not_ re-evaluate already included features.
         *
         * @option coordsToLatLng: Function = *
         * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
         * The default is the `coordsToLatLng` static method.
         *
         * @option markersInheritOptions: Boolean = false
         * Whether default Markers for "Point" type Features inherit from group options.
         */
        initialize: function(t, e) {
          M(this, e), this._layers = {}, t && this.addData(t);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(t) {
          var e = ct(t) ? t : t.features, i, s, a;
          if (e) {
            for (i = 0, s = e.length; i < s; i++)
              a = e[i], (a.geometries || a.geometry || a.features || a.coordinates) && this.addData(a);
            return this;
          }
          var l = this.options;
          if (l.filter && !l.filter(t))
            return this;
          var d = Ze(t, l);
          return d ? (d.feature = He(t), d.defaultOptions = d.options, this.resetStyle(d), l.onEachFeature && l.onEachFeature(t, d), this.addLayer(d)) : this;
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(t) {
          return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = h({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
        },
        // @method setStyle( <Function> style ): this
        // Changes styles of GeoJSON vector layers with the given style function.
        setStyle: function(t) {
          return this.eachLayer(function(e) {
            this._setLayerStyle(e, t);
          }, this);
        },
        _setLayerStyle: function(t, e) {
          t.setStyle && (typeof e == "function" && (e = e(t.feature)), t.setStyle(e));
        }
      });
      function Ze(t, e) {
        var i = t.type === "Feature" ? t.geometry : t, s = i ? i.coordinates : null, a = [], l = e && e.pointToLayer, d = e && e.coordsToLatLng || Bi, f, g, v, w;
        if (!s && !i)
          return null;
        switch (i.type) {
          case "Point":
            return f = d(s), is(l, t, f, e);
          case "MultiPoint":
            for (v = 0, w = s.length; v < w; v++)
              f = d(s[v]), a.push(is(l, t, f, e));
            return new bt(a);
          case "LineString":
          case "MultiLineString":
            return g = Fe(s, i.type === "LineString" ? 0 : 1, d), new wt(g, e);
          case "Polygon":
          case "MultiPolygon":
            return g = Fe(s, i.type === "Polygon" ? 1 : 2, d), new Xt(g, e);
          case "GeometryCollection":
            for (v = 0, w = i.geometries.length; v < w; v++) {
              var E = Ze({
                geometry: i.geometries[v],
                type: "Feature",
                properties: t.properties
              }, e);
              E && a.push(E);
            }
            return new bt(a);
          case "FeatureCollection":
            for (v = 0, w = i.features.length; v < w; v++) {
              var D = Ze(i.features[v], e);
              D && a.push(D);
            }
            return new bt(a);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function is(t, e, i, s) {
        return t ? t(e, i) : new Re(i, s && s.markersInheritOptions && s);
      }
      function Bi(t) {
        return new B(t[1], t[0], t[2]);
      }
      function Fe(t, e, i) {
        for (var s = [], a = 0, l = t.length, d; a < l; a++)
          d = e ? Fe(t[a], e - 1, i) : (i || Bi)(t[a]), s.push(d);
        return s;
      }
      function Zi(t, e) {
        return t = O(t), t.alt !== void 0 ? [z(t.lng, e), z(t.lat, e), z(t.alt, e)] : [z(t.lng, e), z(t.lat, e)];
      }
      function Ue(t, e, i, s) {
        for (var a = [], l = 0, d = t.length; l < d; l++)
          a.push(e ? Ue(t[l], lt(t[l]) ? 0 : e - 1, i, s) : Zi(t[l], s));
        return !e && i && a.length > 0 && a.push(a[0].slice()), a;
      }
      function Jt(t, e) {
        return t.feature ? h({}, t.feature, { geometry: e }) : He(e);
      }
      function He(t) {
        return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        };
      }
      var Fi = {
        toGeoJSON: function(t) {
          return Jt(this, {
            type: "Point",
            coordinates: Zi(this.getLatLng(), t)
          });
        }
      };
      Re.include(Fi), Ri.include(Fi), Be.include(Fi), wt.include({
        toGeoJSON: function(t) {
          var e = !lt(this._latlngs), i = Ue(this._latlngs, e ? 1 : 0, !1, t);
          return Jt(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: i
          });
        }
      }), Xt.include({
        toGeoJSON: function(t) {
          var e = !lt(this._latlngs), i = e && !lt(this._latlngs[0]), s = Ue(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
          return e || (s = [s]), Jt(this, {
            type: (i ? "Multi" : "") + "Polygon",
            coordinates: s
          });
        }
      }), Kt.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(i) {
            e.push(i.toGeoJSON(t).geometry.coordinates);
          }), Jt(this, {
            type: "MultiPoint",
            coordinates: e
          });
        },
        // @method toGeoJSON(precision?: Number|false): Object
        // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
        // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
        toGeoJSON: function(t) {
          var e = this.feature && this.feature.geometry && this.feature.geometry.type;
          if (e === "MultiPoint")
            return this.toMultiPoint(t);
          var i = e === "GeometryCollection", s = [];
          return this.eachLayer(function(a) {
            if (a.toGeoJSON) {
              var l = a.toGeoJSON(t);
              if (i)
                s.push(l.geometry);
              else {
                var d = He(l);
                d.type === "FeatureCollection" ? s.push.apply(s, d.features) : s.push(d);
              }
            }
          }), i ? Jt(this, {
            geometries: s,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: s
          };
        }
      });
      function ns(t, e) {
        return new Tt(t, e);
      }
      var oa = ns, je = ut.extend({
        // @section
        // @aka ImageOverlay options
        options: {
          // @option opacity: Number = 1.0
          // The opacity of the image overlay.
          opacity: 1,
          // @option alt: String = ''
          // Text for the `alt` attribute of the image (useful for accessibility).
          alt: "",
          // @option interactive: Boolean = false
          // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
          interactive: !1,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the image.
          // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: !1,
          // @option errorOverlayUrl: String = ''
          // URL to the overlay image to show in place of the overlay that failed to load.
          errorOverlayUrl: "",
          // @option zIndex: Number = 1
          // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
          zIndex: 1,
          // @option className: String = ''
          // A custom class name to assign to the image. Empty by default.
          className: ""
        },
        initialize: function(t, e, i) {
          this._url = t, this._bounds = q(e), M(this, i);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (A(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
        },
        onRemove: function() {
          j(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
        },
        // @method setOpacity(opacity: Number): this
        // Sets the opacity of the overlay.
        setOpacity: function(t) {
          return this.options.opacity = t, this._image && this._updateOpacity(), this;
        },
        setStyle: function(t) {
          return t.opacity && this.setOpacity(t.opacity), this;
        },
        // @method bringToFront(): this
        // Brings the layer to the top of all overlays.
        bringToFront: function() {
          return this._map && Gt(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && Vt(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(t) {
          return this._url = t, this._image && (this._image.src = t), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(t) {
          return this._bounds = q(t), this._map && this._reset(), this;
        },
        getEvents: function() {
          var t = {
            zoom: this._reset,
            viewreset: this._reset
          };
          return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
        },
        // @method setZIndex(value: Number): this
        // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
        setZIndex: function(t) {
          return this.options.zIndex = t, this._updateZIndex(), this;
        },
        // @method getBounds(): LatLngBounds
        // Get the bounds that this ImageOverlay covers
        getBounds: function() {
          return this._bounds;
        },
        // @method getElement(): HTMLElement
        // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
        // used by this overlay.
        getElement: function() {
          return this._image;
        },
        _initImage: function() {
          var t = this._url.tagName === "IMG", e = this._image = t ? this._url : R("img");
          if (A(e, "leaflet-image-layer"), this._zoomAnimated && A(e, "leaflet-zoom-animated"), this.options.className && A(e, this.options.className), e.onselectstart = b, e.onmousemove = b, e.onload = m(this.fire, this, "load"), e.onerror = m(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
            this._url = e.src;
            return;
          }
          e.src = this._url, e.alt = this.options.alt;
        },
        _animateZoom: function(t) {
          var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
          Ot(this._image, i, e);
        },
        _reset: function() {
          var t = this._image, e = new H(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), i = e.getSize();
          G(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
        },
        _updateOpacity: function() {
          ot(this._image, this.options.opacity);
        },
        _updateZIndex: function() {
          this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
        },
        _overlayOnError: function() {
          this.fire("error");
          var t = this.options.errorOverlayUrl;
          t && this._url !== t && (this._url = t, this._image.src = t);
        },
        // @method getCenter(): LatLng
        // Returns the center of the ImageOverlay.
        getCenter: function() {
          return this._bounds.getCenter();
        }
      }), la = function(t, e, i) {
        return new je(t, e, i);
      }, ss = je.extend({
        // @section
        // @aka VideoOverlay options
        options: {
          // @option autoplay: Boolean = true
          // Whether the video starts playing automatically when loaded.
          // On some browsers autoplay will only work with `muted: true`
          autoplay: !0,
          // @option loop: Boolean = true
          // Whether the video will loop back to the beginning when played.
          loop: !0,
          // @option keepAspectRatio: Boolean = true
          // Whether the video will save aspect ratio after the projection.
          // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
          keepAspectRatio: !0,
          // @option muted: Boolean = false
          // Whether the video starts on mute when loaded.
          muted: !1,
          // @option playsInline: Boolean = true
          // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
          playsInline: !0
        },
        _initImage: function() {
          var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : R("video");
          if (A(e, "leaflet-image-layer"), this._zoomAnimated && A(e, "leaflet-zoom-animated"), this.options.className && A(e, this.options.className), e.onselectstart = b, e.onmousemove = b, e.onloadeddata = m(this.fire, this, "load"), t) {
            for (var i = e.getElementsByTagName("source"), s = [], a = 0; a < i.length; a++)
              s.push(i[a].src);
            this._url = i.length > 0 ? s : [e.src];
            return;
          }
          ct(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
          for (var l = 0; l < this._url.length; l++) {
            var d = R("source");
            d.src = this._url[l], e.appendChild(d);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function ha(t, e, i) {
        return new ss(t, e, i);
      }
      var rs = je.extend({
        _initImage: function() {
          var t = this._image = this._url;
          A(t, "leaflet-image-layer"), this._zoomAnimated && A(t, "leaflet-zoom-animated"), this.options.className && A(t, this.options.className), t.onselectstart = b, t.onmousemove = b;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function ca(t, e, i) {
        return new rs(t, e, i);
      }
      var gt = ut.extend({
        // @section
        // @aka DivOverlay options
        options: {
          // @option interactive: Boolean = false
          // If true, the popup/tooltip will listen to the mouse events.
          interactive: !1,
          // @option offset: Point = Point(0, 0)
          // The offset of the overlay position.
          offset: [0, 0],
          // @option className: String = ''
          // A custom CSS class name to assign to the overlay.
          className: "",
          // @option pane: String = undefined
          // `Map pane` where the overlay will be added.
          pane: void 0,
          // @option content: String|HTMLElement|Function = ''
          // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
          // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
          content: ""
        },
        initialize: function(t, e) {
          t && (t instanceof B || ct(t)) ? (this._latlng = O(t), M(this, e)) : (M(this, t), this._source = e), this.options.content && (this._content = this.options.content);
        },
        // @method openOn(map: Map): this
        // Adds the overlay to the map.
        // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
        openOn: function(t) {
          return t = arguments.length ? t : this._source._map, t.hasLayer(this) || t.addLayer(this), this;
        },
        // @method close(): this
        // Closes the overlay.
        // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
        // and `layer.closePopup()`/`.closeTooltip()`.
        close: function() {
          return this._map && this._map.removeLayer(this), this;
        },
        // @method toggle(layer?: Layer): this
        // Opens or closes the overlay bound to layer depending on its current state.
        // Argument may be omitted only for overlay bound to layer.
        // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
        toggle: function(t) {
          return this._map ? this.close() : (arguments.length ? this._source = t : t = this._source, this._prepareOpen(), this.openOn(t._map)), this;
        },
        onAdd: function(t) {
          this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && ot(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && ot(this._container, 1), this.bringToFront(), this.options.interactive && (A(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(t) {
          t._fadeAnimated ? (ot(this._container, 0), this._removeTimeout = setTimeout(m(j, void 0, this._container), 200)) : j(this._container), this.options.interactive && (W(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
        },
        // @namespace DivOverlay
        // @method getLatLng: LatLng
        // Returns the geographical point of the overlay.
        getLatLng: function() {
          return this._latlng;
        },
        // @method setLatLng(latlng: LatLng): this
        // Sets the geographical point where the overlay will open.
        setLatLng: function(t) {
          return this._latlng = O(t), this._map && (this._updatePosition(), this._adjustPan()), this;
        },
        // @method getContent: String|HTMLElement
        // Returns the content of the overlay.
        getContent: function() {
          return this._content;
        },
        // @method setContent(htmlContent: String|HTMLElement|Function): this
        // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
        // The function should return a `String` or `HTMLElement` to be used in the overlay.
        setContent: function(t) {
          return this._content = t, this.update(), this;
        },
        // @method getElement: String|HTMLElement
        // Returns the HTML container of the overlay.
        getElement: function() {
          return this._container;
        },
        // @method update: null
        // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
        update: function() {
          this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
        },
        getEvents: function() {
          var t = {
            zoom: this._updatePosition,
            viewreset: this._updatePosition
          };
          return this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
        },
        // @method isOpen: Boolean
        // Returns `true` when the overlay is visible on the map.
        isOpen: function() {
          return !!this._map && this._map.hasLayer(this);
        },
        // @method bringToFront: this
        // Brings this overlay in front of other overlays (in the same map pane).
        bringToFront: function() {
          return this._map && Gt(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && Vt(this._container), this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(t) {
          var e = this._source;
          if (!e._map)
            return !1;
          if (e instanceof bt) {
            e = null;
            var i = this._source._layers;
            for (var s in i)
              if (i[s]._map) {
                e = i[s];
                break;
              }
            if (!e)
              return !1;
            this._source = e;
          }
          if (!t)
            if (e.getCenter)
              t = e.getCenter();
            else if (e.getLatLng)
              t = e.getLatLng();
            else if (e.getBounds)
              t = e.getBounds().getCenter();
            else
              throw new Error("Unable to get source layer LatLng.");
          return this.setLatLng(t), this._map && this.update(), !0;
        },
        _updateContent: function() {
          if (this._content) {
            var t = this._contentNode, e = typeof this._content == "function" ? this._content(this._source || this) : this._content;
            if (typeof e == "string")
              t.innerHTML = e;
            else {
              for (; t.hasChildNodes(); )
                t.removeChild(t.firstChild);
              t.appendChild(e);
            }
            this.fire("contentupdate");
          }
        },
        _updatePosition: function() {
          if (this._map) {
            var t = this._map.latLngToLayerPoint(this._latlng), e = k(this.options.offset), i = this._getAnchor();
            this._zoomAnimated ? G(this._container, t.add(i)) : e = e.add(t).add(i);
            var s = this._containerBottom = -e.y, a = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = s + "px", this._container.style.left = a + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      N.include({
        _initOverlay: function(t, e, i, s) {
          var a = e;
          return a instanceof t || (a = new t(s).setContent(e)), i && a.setLatLng(i), a;
        }
      }), ut.include({
        _initOverlay: function(t, e, i, s) {
          var a = i;
          return a instanceof t ? (M(a, s), a._source = this) : (a = e && !s ? e : new t(s, this), a.setContent(i)), a;
        }
      });
      var We = gt.extend({
        // @section
        // @aka Popup options
        options: {
          // @option pane: String = 'popupPane'
          // `Map pane` where the popup will be added.
          pane: "popupPane",
          // @option offset: Point = Point(0, 7)
          // The offset of the popup position.
          offset: [0, 7],
          // @option maxWidth: Number = 300
          // Max width of the popup, in pixels.
          maxWidth: 300,
          // @option minWidth: Number = 50
          // Min width of the popup, in pixels.
          minWidth: 50,
          // @option maxHeight: Number = null
          // If set, creates a scrollable container of the given height
          // inside a popup if its content exceeds it.
          // The scrollable container can be styled using the
          // `leaflet-popup-scrolled` CSS class selector.
          maxHeight: null,
          // @option autoPan: Boolean = true
          // Set it to `false` if you don't want the map to do panning animation
          // to fit the opened popup.
          autoPan: !0,
          // @option autoPanPaddingTopLeft: Point = null
          // The margin between the popup and the top left corner of the map
          // view after autopanning was performed.
          autoPanPaddingTopLeft: null,
          // @option autoPanPaddingBottomRight: Point = null
          // The margin between the popup and the bottom right corner of the map
          // view after autopanning was performed.
          autoPanPaddingBottomRight: null,
          // @option autoPanPadding: Point = Point(5, 5)
          // Equivalent of setting both top left and bottom right autopan padding to the same value.
          autoPanPadding: [5, 5],
          // @option keepInView: Boolean = false
          // Set it to `true` if you want to prevent users from panning the popup
          // off of the screen while it is open.
          keepInView: !1,
          // @option closeButton: Boolean = true
          // Controls the presence of a close button in the popup.
          closeButton: !0,
          // @option autoClose: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the popup closing when another popup is opened.
          autoClose: !0,
          // @option closeOnEscapeKey: Boolean = true
          // Set it to `false` if you want to override the default behavior of
          // the ESC key for closing of the popup.
          closeOnEscapeKey: !0,
          // @option closeOnClick: Boolean = *
          // Set it if you want to override the default behavior of the popup closing when user clicks
          // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
          // @option className: String = ''
          // A custom CSS class name to assign to the popup.
          className: ""
        },
        // @namespace Popup
        // @method openOn(map: Map): this
        // Alternative to `map.openPopup(popup)`.
        // Adds the popup to the map and closes the previous one.
        openOn: function(t) {
          return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, gt.prototype.openOn.call(this, t);
        },
        onAdd: function(t) {
          gt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof kt || this._source.on("preclick", Rt));
        },
        onRemove: function(t) {
          gt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof kt || this._source.off("preclick", Rt));
        },
        getEvents: function() {
          var t = gt.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
        },
        _initLayout: function() {
          var t = "leaflet-popup", e = this._container = R(
            "div",
            t + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), i = this._wrapper = R("div", t + "-content-wrapper", e);
          if (this._contentNode = R("div", t + "-content", i), fe(e), Ii(this._contentNode), C(e, "contextmenu", Rt), this._tipContainer = R("div", t + "-tip-container", e), this._tip = R("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var s = this._closeButton = R("a", t + "-close-button", e);
            s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close popup"), s.href = "#close", s.innerHTML = '<span aria-hidden="true">&#215;</span>', C(s, "click", function(a) {
              J(a), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var i = t.offsetWidth;
          i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
          var s = t.offsetHeight, a = this.options.maxHeight, l = "leaflet-popup-scrolled";
          a && s > a ? (e.height = a + "px", A(t, l)) : W(t, l), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
          G(this._container, e.add(i));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var t = this._map, e = parseInt(ce(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, s = this._containerWidth, a = new I(this._containerLeft, -i - this._containerBottom);
            a._add(Nt(this._container));
            var l = t.layerPointToContainerPoint(a), d = k(this.options.autoPanPadding), f = k(this.options.autoPanPaddingTopLeft || d), g = k(this.options.autoPanPaddingBottomRight || d), v = t.getSize(), w = 0, E = 0;
            l.x + s + g.x > v.x && (w = l.x + s - v.x + g.x), l.x - w - f.x < 0 && (w = l.x - f.x), l.y + i + g.y > v.y && (E = l.y + i - v.y + g.y), l.y - E - f.y < 0 && (E = l.y - f.y), (w || E) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([w, E]));
          }
        },
        _getAnchor: function() {
          return k(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), da = function(t, e) {
        return new We(t, e);
      };
      N.mergeOptions({
        closePopupOnClick: !0
      }), N.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(t, e, i) {
          return this._initOverlay(We, t, e, i).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(t) {
          return t = arguments.length ? t : this._popup, t && t.close(), this;
        }
      }), ut.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(t, e) {
          return this._popup = this._initOverlay(We, this._popup, t, e), this._popupHandlersAdded || (this.on({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          }), this._popupHandlersAdded = !0), this;
        },
        // @method unbindPopup(): this
        // Removes the popup previously bound with `bindPopup`.
        unbindPopup: function() {
          return this._popup && (this.off({
            click: this._openPopup,
            keypress: this._onKeyPress,
            remove: this.closePopup,
            move: this._movePopup
          }), this._popupHandlersAdded = !1, this._popup = null), this;
        },
        // @method openPopup(latlng?: LatLng): this
        // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
        openPopup: function(t) {
          return this._popup && (this instanceof bt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
        },
        // @method closePopup(): this
        // Closes the popup bound to this layer if it is open.
        closePopup: function() {
          return this._popup && this._popup.close(), this;
        },
        // @method togglePopup(): this
        // Opens or closes the popup bound to this layer depending on its current state.
        togglePopup: function() {
          return this._popup && this._popup.toggle(this), this;
        },
        // @method isPopupOpen(): boolean
        // Returns `true` if the popup bound to this layer is currently open.
        isPopupOpen: function() {
          return this._popup ? this._popup.isOpen() : !1;
        },
        // @method setPopupContent(content: String|HTMLElement|Popup): this
        // Sets the content of the popup bound to this layer.
        setPopupContent: function(t) {
          return this._popup && this._popup.setContent(t), this;
        },
        // @method getPopup(): Popup
        // Returns the popup bound to this layer.
        getPopup: function() {
          return this._popup;
        },
        _openPopup: function(t) {
          if (!(!this._popup || !this._map)) {
            Bt(t);
            var e = t.layer || t.target;
            if (this._popup._source === e && !(e instanceof kt)) {
              this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(t.latlng);
              return;
            }
            this._popup._source = e, this.openPopup(t.latlng);
          }
        },
        _movePopup: function(t) {
          this._popup.setLatLng(t.latlng);
        },
        _onKeyPress: function(t) {
          t.originalEvent.keyCode === 13 && this._openPopup(t);
        }
      });
      var qe = gt.extend({
        // @section
        // @aka Tooltip options
        options: {
          // @option pane: String = 'tooltipPane'
          // `Map pane` where the tooltip will be added.
          pane: "tooltipPane",
          // @option offset: Point = Point(0, 0)
          // Optional offset of the tooltip position.
          offset: [0, 0],
          // @option direction: String = 'auto'
          // Direction where to open the tooltip. Possible values are: `right`, `left`,
          // `top`, `bottom`, `center`, `auto`.
          // `auto` will dynamically switch between `right` and `left` according to the tooltip
          // position on the map.
          direction: "auto",
          // @option permanent: Boolean = false
          // Whether to open the tooltip permanently or only on mouseover.
          permanent: !1,
          // @option sticky: Boolean = false
          // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          sticky: !1,
          // @option opacity: Number = 0.9
          // Tooltip container opacity.
          opacity: 0.9
        },
        onAdd: function(t) {
          gt.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function(t) {
          gt.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function() {
          var t = gt.prototype.getEvents.call(this);
          return this.options.permanent || (t.preclick = this.close), t;
        },
        _initLayout: function() {
          var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = R("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + p(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(t) {
          var e, i, s = this._map, a = this._container, l = s.latLngToContainerPoint(s.getCenter()), d = s.layerPointToContainerPoint(t), f = this.options.direction, g = a.offsetWidth, v = a.offsetHeight, w = k(this.options.offset), E = this._getAnchor();
          f === "top" ? (e = g / 2, i = v) : f === "bottom" ? (e = g / 2, i = 0) : f === "center" ? (e = g / 2, i = v / 2) : f === "right" ? (e = 0, i = v / 2) : f === "left" ? (e = g, i = v / 2) : d.x < l.x ? (f = "right", e = 0, i = v / 2) : (f = "left", e = g + (w.x + E.x) * 2, i = v / 2), t = t.subtract(k(e, i, !0)).add(w).add(E), W(a, "leaflet-tooltip-right"), W(a, "leaflet-tooltip-left"), W(a, "leaflet-tooltip-top"), W(a, "leaflet-tooltip-bottom"), A(a, "leaflet-tooltip-" + f), G(a, t);
        },
        _updatePosition: function() {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function(t) {
          this.options.opacity = t, this._container && ot(this._container, t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
          this._setPosition(e);
        },
        _getAnchor: function() {
          return k(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), ua = function(t, e) {
        return new qe(t, e);
      };
      N.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, i) {
          return this._initOverlay(qe, t, e, i).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(t) {
          return t.close(), this;
        }
      }), ut.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(t, e) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(qe, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
        },
        _initTooltipInteractions: function(t) {
          if (!(!t && this._tooltipHandlersAdded)) {
            var e = t ? "off" : "on", i = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            this._tooltip.options.permanent ? i.add = this._openTooltip : (i.mouseover = this._openTooltip, i.mouseout = this.closeTooltip, i.click = this._openTooltip, this._map ? this._addFocusListeners() : i.add = this._addFocusListeners), this._tooltip.options.sticky && (i.mousemove = this._moveTooltip), this[e](i), this._tooltipHandlersAdded = !t;
          }
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(t) {
          return this._tooltip && (this instanceof bt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
        },
        // @method closeTooltip(): this
        // Closes the tooltip bound to this layer if it is open.
        closeTooltip: function() {
          if (this._tooltip)
            return this._tooltip.close();
        },
        // @method toggleTooltip(): this
        // Opens or closes the tooltip bound to this layer depending on its current state.
        toggleTooltip: function() {
          return this._tooltip && this._tooltip.toggle(this), this;
        },
        // @method isTooltipOpen(): boolean
        // Returns `true` if the tooltip bound to this layer is currently open.
        isTooltipOpen: function() {
          return this._tooltip.isOpen();
        },
        // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
        // Sets the content of the tooltip bound to this layer.
        setTooltipContent: function(t) {
          return this._tooltip && this._tooltip.setContent(t), this;
        },
        // @method getTooltip(): Tooltip
        // Returns the tooltip bound to this layer.
        getTooltip: function() {
          return this._tooltip;
        },
        _addFocusListeners: function() {
          this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
        },
        _addFocusListenersOnLayer: function(t) {
          var e = typeof t.getElement == "function" && t.getElement();
          e && (C(e, "focus", function() {
            this._tooltip._source = t, this.openTooltip();
          }, this), C(e, "blur", this.closeTooltip, this));
        },
        _setAriaDescribedByOnLayer: function(t) {
          var e = typeof t.getElement == "function" && t.getElement();
          e && e.setAttribute("aria-describedby", this._tooltip._container.id);
        },
        _openTooltip: function(t) {
          if (!(!this._tooltip || !this._map)) {
            if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
              this._openOnceFlag = !0;
              var e = this;
              this._map.once("moveend", function() {
                e._openOnceFlag = !1, e._openTooltip(t);
              });
              return;
            }
            this._tooltip._source = t.layer || t.target, this.openTooltip(this._tooltip.options.sticky ? t.latlng : void 0);
          }
        },
        _moveTooltip: function(t) {
          var e = t.latlng, i, s;
          this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), s = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(s)), this._tooltip.setLatLng(e);
        }
      });
      var as = Yt.extend({
        options: {
          // @section
          // @aka DivIcon options
          iconSize: [12, 12],
          // also can be set through CSS
          // iconAnchor: (Point),
          // popupAnchor: (Point),
          // @option html: String|HTMLElement = ''
          // Custom HTML code to put inside the div element, empty by default. Alternatively,
          // an instance of `HTMLElement`.
          html: !1,
          // @option bgPos: Point = [0, 0]
          // Optional relative position of the background, in pixels
          bgPos: null,
          className: "leaflet-div-icon"
        },
        createIcon: function(t) {
          var e = t && t.tagName === "DIV" ? t : document.createElement("div"), i = this.options;
          if (i.html instanceof Element ? (Ae(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
            var s = k(i.bgPos);
            e.style.backgroundPosition = -s.x + "px " + -s.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function pa(t) {
        return new as(t);
      }
      Yt.Default = _e;
      var ve = ut.extend({
        // @section
        // @aka GridLayer options
        options: {
          // @option tileSize: Number|Point = 256
          // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
          tileSize: 256,
          // @option opacity: Number = 1.0
          // Opacity of the tiles. Can be used in the `createTile()` function.
          opacity: 1,
          // @option updateWhenIdle: Boolean = (depends)
          // Load new tiles only when panning ends.
          // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
          // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
          // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
          updateWhenIdle: S.mobile,
          // @option updateWhenZooming: Boolean = true
          // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
          updateWhenZooming: !0,
          // @option updateInterval: Number = 200
          // Tiles will not update more than once every `updateInterval` milliseconds when panning.
          updateInterval: 200,
          // @option zIndex: Number = 1
          // The explicit zIndex of the tile layer.
          zIndex: 1,
          // @option bounds: LatLngBounds = undefined
          // If set, tiles will only be loaded inside the set `LatLngBounds`.
          bounds: null,
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = undefined
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: void 0,
          // @option maxNativeZoom: Number = undefined
          // Maximum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
          // from `maxNativeZoom` level and auto-scaled.
          maxNativeZoom: void 0,
          // @option minNativeZoom: Number = undefined
          // Minimum zoom number the tile source has available. If it is specified,
          // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
          // from `minNativeZoom` level and auto-scaled.
          minNativeZoom: void 0,
          // @option noWrap: Boolean = false
          // Whether the layer is wrapped around the antimeridian. If `true`, the
          // GridLayer will only be displayed once at low zoom levels. Has no
          // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
          // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
          // tiles outside the CRS limits.
          noWrap: !1,
          // @option pane: String = 'tilePane'
          // `Map pane` where the grid layer will be added.
          pane: "tilePane",
          // @option className: String = ''
          // A custom class name to assign to the tile layer. Empty by default.
          className: "",
          // @option keepBuffer: Number = 2
          // When panning the map, keep this many rows and columns of tiles before unloading them.
          keepBuffer: 2
        },
        initialize: function(t) {
          M(this, t);
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
        },
        beforeAdd: function(t) {
          t._addZoomLimit(this);
        },
        onRemove: function(t) {
          this._removeAllTiles(), j(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          return this._map && (Gt(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (Vt(this._container), this._setAutoZIndex(Math.min)), this;
        },
        // @method getContainer: HTMLElement
        // Returns the HTML element that contains the tiles for this layer.
        getContainer: function() {
          return this._container;
        },
        // @method setOpacity(opacity: Number): this
        // Changes the [opacity](#gridlayer-opacity) of the grid layer.
        setOpacity: function(t) {
          return this.options.opacity = t, this._updateOpacity(), this;
        },
        // @method setZIndex(zIndex: Number): this
        // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
        setZIndex: function(t) {
          return this.options.zIndex = t, this._updateZIndex(), this;
        },
        // @method isLoading: Boolean
        // Returns `true` if any tile in the grid layer has not finished loading.
        isLoading: function() {
          return this._loading;
        },
        // @method redraw: this
        // Causes the layer to clear all the tiles and request them again.
        redraw: function() {
          if (this._map) {
            this._removeAllTiles();
            var t = this._clampZoom(this._map.getZoom());
            t !== this._tileZoom && (this._tileZoom = t, this._updateLevels()), this._update();
          }
          return this;
        },
        getEvents: function() {
          var t = {
            viewprereset: this._invalidateAll,
            viewreset: this._resetView,
            zoom: this._resetView,
            moveend: this._onMoveEnd
          };
          return this.options.updateWhenIdle || (this._onMove || (this._onMove = y(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
        },
        // @section Extension methods
        // Layers extending `GridLayer` shall reimplement the following method.
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, must be overridden by classes extending `GridLayer`.
        // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
        // is specified, it must be called when the tile has finished loading and drawing.
        createTile: function() {
          return document.createElement("div");
        },
        // @section
        // @method getTileSize: Point
        // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
        getTileSize: function() {
          var t = this.options.tileSize;
          return t instanceof I ? t : new I(t, t);
        },
        _updateZIndex: function() {
          this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function(t) {
          for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), s = 0, a = e.length, l; s < a; s++)
            l = e[s].style.zIndex, e[s] !== this._container && l && (i = t(i, +l));
          isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !S.ielt9) {
            ot(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
            for (var s in this._tiles) {
              var a = this._tiles[s];
              if (!(!a.current || !a.loaded)) {
                var l = Math.min(1, (t - a.loaded) / 200);
                ot(a.el, l), l < 1 ? e = !0 : (a.active ? i = !0 : this._onOpaqueTile(a), a.active = !0);
              }
            }
            i && !this._noPrune && this._pruneTiles(), e && (at(this._fadeFrame), this._fadeFrame = et(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: b,
        _initContainer: function() {
          this._container || (this._container = R("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var t = this._tileZoom, e = this.options.maxZoom;
          if (t !== void 0) {
            for (var i in this._levels)
              i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (j(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
            var s = this._levels[t], a = this._map;
            return s || (s = this._levels[t] = {}, s.el = R("div", "leaflet-tile-container leaflet-zoom-animated", this._container), s.el.style.zIndex = e, s.origin = a.project(a.unproject(a.getPixelOrigin()), t).round(), s.zoom = t, this._setZoomTransform(s, a.getCenter(), a.getZoom()), b(s.el.offsetWidth), this._onCreateLevel(s)), this._level = s, s;
          }
        },
        _onUpdateLevel: b,
        _onRemoveLevel: b,
        _onCreateLevel: b,
        _pruneTiles: function() {
          if (this._map) {
            var t, e, i = this._map.getZoom();
            if (i > this.options.maxZoom || i < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (t in this._tiles)
              e = this._tiles[t], e.retain = e.current;
            for (t in this._tiles)
              if (e = this._tiles[t], e.current && !e.active) {
                var s = e.coords;
                this._retainParent(s.x, s.y, s.z, s.z - 5) || this._retainChildren(s.x, s.y, s.z, s.z + 2);
              }
            for (t in this._tiles)
              this._tiles[t].retain || this._removeTile(t);
          }
        },
        _removeTilesAtZoom: function(t) {
          for (var e in this._tiles)
            this._tiles[e].coords.z === t && this._removeTile(e);
        },
        _removeAllTiles: function() {
          for (var t in this._tiles)
            this._removeTile(t);
        },
        _invalidateAll: function() {
          for (var t in this._levels)
            j(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(t, e, i, s) {
          var a = Math.floor(t / 2), l = Math.floor(e / 2), d = i - 1, f = new I(+a, +l);
          f.z = +d;
          var g = this._tileCoordsToKey(f), v = this._tiles[g];
          return v && v.active ? (v.retain = !0, !0) : (v && v.loaded && (v.retain = !0), d > s ? this._retainParent(a, l, d, s) : !1);
        },
        _retainChildren: function(t, e, i, s) {
          for (var a = 2 * t; a < 2 * t + 2; a++)
            for (var l = 2 * e; l < 2 * e + 2; l++) {
              var d = new I(a, l);
              d.z = i + 1;
              var f = this._tileCoordsToKey(d), g = this._tiles[f];
              if (g && g.active) {
                g.retain = !0;
                continue;
              } else g && g.loaded && (g.retain = !0);
              i + 1 < s && this._retainChildren(a, l, i + 1, s);
            }
        },
        _resetView: function(t) {
          var e = t && (t.pinch || t.flyTo);
          this._setView(this._map.getCenter(), this._map.getZoom(), e, e);
        },
        _animateZoom: function(t) {
          this._setView(t.center, t.zoom, !0, t.noUpdate);
        },
        _clampZoom: function(t) {
          var e = this.options;
          return e.minNativeZoom !== void 0 && t < e.minNativeZoom ? e.minNativeZoom : e.maxNativeZoom !== void 0 && e.maxNativeZoom < t ? e.maxNativeZoom : t;
        },
        _setView: function(t, e, i, s) {
          var a = Math.round(e);
          this.options.maxZoom !== void 0 && a > this.options.maxZoom || this.options.minZoom !== void 0 && a < this.options.minZoom ? a = void 0 : a = this._clampZoom(a);
          var l = this.options.updateWhenZooming && a !== this._tileZoom;
          (!s || l) && (this._tileZoom = a, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), a !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var i in this._levels)
            this._setZoomTransform(this._levels[i], t, e);
        },
        _setZoomTransform: function(t, e, i) {
          var s = this._map.getZoomScale(i, t.zoom), a = t.origin.multiplyBy(s).subtract(this._map._getNewPixelOrigin(e, i)).round();
          S.any3d ? Ot(t.el, a, s) : G(t.el, a);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), s = this._tileZoom, a = this._map.getPixelWorldBounds(this._tileZoom);
          a && (this._globalTileRange = this._pxBoundsToTileRange(a)), this._wrapX = e.wrapLng && !this.options.noWrap && [
            Math.floor(t.project([0, e.wrapLng[0]], s).x / i.x),
            Math.ceil(t.project([0, e.wrapLng[1]], s).x / i.y)
          ], this._wrapY = e.wrapLat && !this.options.noWrap && [
            Math.floor(t.project([e.wrapLat[0], 0], s).y / i.x),
            Math.ceil(t.project([e.wrapLat[1], 0], s).y / i.y)
          ];
        },
        _onMoveEnd: function() {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function(t) {
          var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), s = e.getZoomScale(i, this._tileZoom), a = e.project(t, this._tileZoom).floor(), l = e.getSize().divideBy(s * 2);
          return new H(a.subtract(l), a.add(l));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var i = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var s = this._getTiledPixelBounds(t), a = this._pxBoundsToTileRange(s), l = a.getCenter(), d = [], f = this.options.keepBuffer, g = new H(
                a.getBottomLeft().subtract([f, -f]),
                a.getTopRight().add([f, -f])
              );
              if (!(isFinite(a.min.x) && isFinite(a.min.y) && isFinite(a.max.x) && isFinite(a.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var v in this._tiles) {
                var w = this._tiles[v].coords;
                (w.z !== this._tileZoom || !g.contains(new I(w.x, w.y))) && (this._tiles[v].current = !1);
              }
              if (Math.abs(i - this._tileZoom) > 1) {
                this._setView(t, i);
                return;
              }
              for (var E = a.min.y; E <= a.max.y; E++)
                for (var D = a.min.x; D <= a.max.x; D++) {
                  var tt = new I(D, E);
                  if (tt.z = this._tileZoom, !!this._isValidTile(tt)) {
                    var Y = this._tiles[this._tileCoordsToKey(tt)];
                    Y ? Y.current = !0 : d.push(tt);
                  }
                }
              if (d.sort(function(st, te) {
                return st.distanceTo(l) - te.distanceTo(l);
              }), d.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var ht = document.createDocumentFragment();
                for (D = 0; D < d.length; D++)
                  this._addTile(d[D], ht);
                this._level.el.appendChild(ht);
              }
            }
          }
        },
        _isValidTile: function(t) {
          var e = this._map.options.crs;
          if (!e.infinite) {
            var i = this._globalTileRange;
            if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y))
              return !1;
          }
          if (!this.options.bounds)
            return !0;
          var s = this._tileCoordsToBounds(t);
          return q(this.options.bounds).overlaps(s);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, i = this.getTileSize(), s = t.scaleBy(i), a = s.add(i), l = e.unproject(s, t.z), d = e.unproject(a, t.z);
          return [l, d];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(t) {
          var e = this._tileCoordsToNwSe(t), i = new nt(e[0], e[1]);
          return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(t) {
          return t.x + ":" + t.y + ":" + t.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(t) {
          var e = t.split(":"), i = new I(+e[0], +e[1]);
          return i.z = +e[2], i;
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          e && (j(e.el), delete this._tiles[t], this.fire("tileunload", {
            tile: e.el,
            coords: this._keyToTileCoords(t)
          }));
        },
        _initTile: function(t) {
          A(t, "leaflet-tile");
          var e = this.getTileSize();
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = b, t.onmousemove = b, S.ielt9 && this.options.opacity < 1 && ot(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var i = this._getTilePos(t), s = this._tileCoordsToKey(t), a = this.createTile(this._wrapCoords(t), m(this._tileReady, this, t));
          this._initTile(a), this.createTile.length < 2 && et(m(this._tileReady, this, t, null, a)), G(a, i), this._tiles[s] = {
            el: a,
            coords: t,
            current: !0
          }, e.appendChild(a), this.fire("tileloadstart", {
            tile: a,
            coords: t
          });
        },
        _tileReady: function(t, e, i) {
          e && this.fire("tileerror", {
            error: e,
            tile: i,
            coords: t
          });
          var s = this._tileCoordsToKey(t);
          i = this._tiles[s], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ot(i.el, 0), at(this._fadeFrame), this._fadeFrame = et(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (A(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: i.el,
            coords: t
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), S.ielt9 || !this._map._fadeAnimated ? et(this._pruneTiles, this) : setTimeout(m(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(t) {
          return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(t) {
          var e = new I(
            this._wrapX ? P(t.x, this._wrapX) : t.x,
            this._wrapY ? P(t.y, this._wrapY) : t.y
          );
          return e.z = t.z, e;
        },
        _pxBoundsToTileRange: function(t) {
          var e = this.getTileSize();
          return new H(
            t.min.unscaleBy(e).floor(),
            t.max.unscaleBy(e).ceil().subtract([1, 1])
          );
        },
        _noTilesToLoad: function() {
          for (var t in this._tiles)
            if (!this._tiles[t].loaded)
              return !1;
          return !0;
        }
      });
      function fa(t) {
        return new ve(t);
      }
      var Qt = ve.extend({
        // @section
        // @aka TileLayer options
        options: {
          // @option minZoom: Number = 0
          // The minimum zoom level down to which this layer will be displayed (inclusive).
          minZoom: 0,
          // @option maxZoom: Number = 18
          // The maximum zoom level up to which this layer will be displayed (inclusive).
          maxZoom: 18,
          // @option subdomains: String|String[] = 'abc'
          // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
          subdomains: "abc",
          // @option errorTileUrl: String = ''
          // URL to the tile image to show in place of the tile that failed to load.
          errorTileUrl: "",
          // @option zoomOffset: Number = 0
          // The zoom number used in tile URLs will be offset with this value.
          zoomOffset: 0,
          // @option tms: Boolean = false
          // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
          tms: !1,
          // @option zoomReverse: Boolean = false
          // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
          zoomReverse: !1,
          // @option detectRetina: Boolean = false
          // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
          detectRetina: !1,
          // @option crossOrigin: Boolean|String = false
          // Whether the crossOrigin attribute will be added to the tiles.
          // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
          // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
          crossOrigin: !1,
          // @option referrerPolicy: Boolean|String = false
          // Whether the referrerPolicy attribute will be added to the tiles.
          // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
          // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
          // (e.g. to validate an API token).
          // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
          referrerPolicy: !1
        },
        initialize: function(t, e) {
          this._url = t, e = M(this, e), e.detectRetina && S.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
        },
        // @method setUrl(url: String, noRedraw?: Boolean): this
        // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
        // If the URL does not change, the layer will not be redrawn unless
        // the noRedraw parameter is set to false.
        setUrl: function(t, e) {
          return this._url === t && e === void 0 && (e = !0), this._url = t, e || this.redraw(), this;
        },
        // @method createTile(coords: Object, done?: Function): HTMLElement
        // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
        // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
        // callback is called when the tile has been loaded.
        createTile: function(t, e) {
          var i = document.createElement("img");
          return C(i, "load", m(this._tileOnLoad, this, e, i)), C(i, "error", m(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(t) {
          var e = {
            r: S.retina ? "@2x" : "",
            s: this._getSubdomain(t),
            x: t.x,
            y: t.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var i = this._globalTileRange.max.y - t.y;
            this.options.tms && (e.y = i), e["-y"] = i;
          }
          return ln(this._url, h(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          S.ielt9 ? setTimeout(m(t, this, null, e), 0) : t(null, e);
        },
        _tileOnError: function(t, e, i) {
          var s = this.options.errorTileUrl;
          s && e.getAttribute("src") !== s && (e.src = s), t(i, e);
        },
        _onTileRemove: function(t) {
          t.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var t = this._tileZoom, e = this.options.maxZoom, i = this.options.zoomReverse, s = this.options.zoomOffset;
          return i && (t = e - t), t + s;
        },
        _getSubdomain: function(t) {
          var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
          return this.options.subdomains[e];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var t, e;
          for (t in this._tiles)
            if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = b, e.onerror = b, !e.complete)) {
              e.src = ke;
              var i = this._tiles[t].coords;
              j(e), delete this._tiles[t], this.fire("tileabort", {
                tile: e,
                coords: i
              });
            }
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          if (e)
            return e.el.setAttribute("src", ke), ve.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, i) {
          if (!(!this._map || i && i.getAttribute("src") === ke))
            return ve.prototype._tileReady.call(this, t, e, i);
        }
      });
      function os(t, e) {
        return new Qt(t, e);
      }
      var ls = Qt.extend({
        // @section
        // @aka TileLayer.WMS options
        // If any custom options not documented here are used, they will be sent to the
        // WMS server as extra parameters in each request URL. This can be useful for
        // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
        defaultWmsParams: {
          service: "WMS",
          request: "GetMap",
          // @option layers: String = ''
          // **(required)** Comma-separated list of WMS layers to show.
          layers: "",
          // @option styles: String = ''
          // Comma-separated list of WMS styles.
          styles: "",
          // @option format: String = 'image/jpeg'
          // WMS image format (use `'image/png'` for layers with transparency).
          format: "image/jpeg",
          // @option transparent: Boolean = false
          // If `true`, the WMS service will return images with transparency.
          transparent: !1,
          // @option version: String = '1.1.1'
          // Version of the WMS service to use
          version: "1.1.1"
        },
        options: {
          // @option crs: CRS = null
          // Coordinate Reference System to use for the WMS requests, defaults to
          // map CRS. Don't change this if you're not sure what it means.
          crs: null,
          // @option uppercase: Boolean = false
          // If `true`, WMS request parameter keys will be uppercase.
          uppercase: !1
        },
        initialize: function(t, e) {
          this._url = t;
          var i = h({}, this.defaultWmsParams);
          for (var s in e)
            s in this.options || (i[s] = e[s]);
          e = M(this, e);
          var a = e.detectRetina && S.retina ? 2 : 1, l = this.getTileSize();
          i.width = l.x * a, i.height = l.y * a, this.wmsParams = i;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, Qt.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), i = this._crs, s = it(i.project(e[0]), i.project(e[1])), a = s.min, l = s.max, d = (this._wmsVersion >= 1.3 && this._crs === ts ? [a.y, a.x, l.y, l.x] : [a.x, a.y, l.x, l.y]).join(","), f = Qt.prototype.getTileUrl.call(this, t);
          return f + Wt(this.wmsParams, f, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + d;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return h(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function ma(t, e) {
        return new ls(t, e);
      }
      Qt.WMS = ls, os.wms = ma;
      var $t = ut.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(t) {
          M(this, t), p(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), A(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
        },
        onRemove: function() {
          this.off("update", this._updatePaths, this), this._destroyContainer();
        },
        getEvents: function() {
          var t = {
            viewreset: this._reset,
            zoom: this._onZoom,
            moveend: this._update,
            zoomend: this._onZoomEnd
          };
          return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t;
        },
        _onAnimZoom: function(t) {
          this._updateTransform(t.center, t.zoom);
        },
        _onZoom: function() {
          this._updateTransform(this._map.getCenter(), this._map.getZoom());
        },
        _updateTransform: function(t, e) {
          var i = this._map.getZoomScale(e, this._zoom), s = this._map.getSize().multiplyBy(0.5 + this.options.padding), a = this._map.project(this._center, e), l = s.multiplyBy(-i).add(a).subtract(this._map._getNewPixelOrigin(t, e));
          S.any3d ? Ot(this._container, l, i) : G(this._container, l);
        },
        _reset: function() {
          this._update(), this._updateTransform(this._center, this._zoom);
          for (var t in this._layers)
            this._layers[t]._reset();
        },
        _onZoomEnd: function() {
          for (var t in this._layers)
            this._layers[t]._project();
        },
        _updatePaths: function() {
          for (var t in this._layers)
            this._layers[t]._update();
        },
        _update: function() {
          var t = this.options.padding, e = this._map.getSize(), i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
          this._bounds = new H(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), hs = $t.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var t = $t.prototype.getEvents.call(this);
          return t.viewprereset = this._onViewPreReset, t;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          $t.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var t = this._container = document.createElement("canvas");
          C(t, "mousemove", this._onMouseMove, this), C(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), C(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
        },
        _destroyContainer: function() {
          at(this._redrawRequest), delete this._ctx, j(this._container), U(this._container), delete this._container;
        },
        _updatePaths: function() {
          if (!this._postponeUpdatePaths) {
            var t;
            this._redrawBounds = null;
            for (var e in this._layers)
              t = this._layers[e], t._update();
            this._redraw();
          }
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            $t.prototype._update.call(this);
            var t = this._bounds, e = this._container, i = t.getSize(), s = S.retina ? 2 : 1;
            G(e, t.min), e.width = s * i.x, e.height = s * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", S.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
          }
        },
        _reset: function() {
          $t.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
        },
        _initPath: function(t) {
          this._updateDashArray(t), this._layers[p(t)] = t;
          var e = t._order = {
            layer: t,
            prev: this._drawLast,
            next: null
          };
          this._drawLast && (this._drawLast.next = e), this._drawLast = e, this._drawFirst = this._drawFirst || this._drawLast;
        },
        _addPath: function(t) {
          this._requestRedraw(t);
        },
        _removePath: function(t) {
          var e = t._order, i = e.next, s = e.prev;
          i ? i.prev = s : this._drawLast = s, s ? s.next = i : this._drawFirst = i, delete t._order, delete this._layers[p(t)], this._requestRedraw(t);
        },
        _updatePath: function(t) {
          this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
        },
        _updateStyle: function(t) {
          this._updateDashArray(t), this._requestRedraw(t);
        },
        _updateDashArray: function(t) {
          if (typeof t.options.dashArray == "string") {
            var e = t.options.dashArray.split(/[, ]+/), i = [], s, a;
            for (a = 0; a < e.length; a++) {
              if (s = Number(e[a]), isNaN(s))
                return;
              i.push(s);
            }
            t.options._dashArray = i;
          } else
            t.options._dashArray = t.options.dashArray;
        },
        _requestRedraw: function(t) {
          this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || et(this._redraw, this));
        },
        _extendRedrawBounds: function(t) {
          if (t._pxBounds) {
            var e = (t.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new H(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
          }
        },
        _redraw: function() {
          this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
        },
        _clear: function() {
          var t = this._redrawBounds;
          if (t) {
            var e = t.getSize();
            this._ctx.clearRect(t.min.x, t.min.y, e.x, e.y);
          } else
            this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
        },
        _draw: function() {
          var t, e = this._redrawBounds;
          if (this._ctx.save(), e) {
            var i = e.getSize();
            this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, i.x, i.y), this._ctx.clip();
          }
          this._drawing = !0;
          for (var s = this._drawFirst; s; s = s.next)
            t = s.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
          this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(t, e) {
          if (this._drawing) {
            var i, s, a, l, d = t._parts, f = d.length, g = this._ctx;
            if (f) {
              for (g.beginPath(), i = 0; i < f; i++) {
                for (s = 0, a = d[i].length; s < a; s++)
                  l = d[i][s], g[s ? "lineTo" : "moveTo"](l.x, l.y);
                e && g.closePath();
              }
              this._fillStroke(g, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, i = this._ctx, s = Math.max(Math.round(t._radius), 1), a = (Math.max(Math.round(t._radiusY), 1) || s) / s;
            a !== 1 && (i.save(), i.scale(1, a)), i.beginPath(), i.arc(e.x, e.y / a, s, 0, Math.PI * 2, !1), a !== 1 && i.restore(), this._fillStroke(i, t);
          }
        },
        _fillStroke: function(t, e) {
          var i = e.options;
          i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), i, s, a = this._drawFirst; a; a = a.next)
            i = a.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (s = i);
          this._fireEvent(s ? [s] : !1, t);
        },
        _onMouseMove: function(t) {
          if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
            var e = this._map.mouseEventToLayerPoint(t);
            this._handleMouseHover(t, e);
          }
        },
        _handleMouseOut: function(t) {
          var e = this._hoveredLayer;
          e && (W(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var i, s, a = this._drawFirst; a; a = a.next)
              i = a.layer, i.options.interactive && i._containsPoint(e) && (s = i);
            s !== this._hoveredLayer && (this._handleMouseOut(t), s && (A(this._container, "leaflet-interactive"), this._fireEvent([s], t, "mouseover"), this._hoveredLayer = s)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(m(function() {
              this._mouseHoverThrottled = !1;
            }, this), 32);
          }
        },
        _fireEvent: function(t, e, i) {
          this._map._fireDOMEvent(e, i || e.type, t);
        },
        _bringToFront: function(t) {
          var e = t._order;
          if (e) {
            var i = e.next, s = e.prev;
            if (i)
              i.prev = s;
            else
              return;
            s ? s.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
          }
        },
        _bringToBack: function(t) {
          var e = t._order;
          if (e) {
            var i = e.next, s = e.prev;
            if (s)
              s.next = i;
            else
              return;
            i ? i.prev = s : s && (this._drawLast = s), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
          }
        }
      });
      function cs(t) {
        return S.canvas ? new hs(t) : null;
      }
      var ye = (function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
            return document.createElement("<lvml:" + t + ' class="lvml">');
          };
        } catch {
        }
        return function(t) {
          return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })(), ga = {
        _initContainer: function() {
          this._container = R("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || ($t.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(t) {
          var e = t._container = ye("shape");
          A(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = ye("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[p(t)] = t;
        },
        _addPath: function(t) {
          var e = t._container;
          this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
        },
        _removePath: function(t) {
          var e = t._container;
          j(e), t.removeInteractiveTarget(e), delete this._layers[p(t)];
        },
        _updateStyle: function(t) {
          var e = t._stroke, i = t._fill, s = t.options, a = t._container;
          a.stroked = !!s.stroke, a.filled = !!s.fill, s.stroke ? (e || (e = t._stroke = ye("stroke")), a.appendChild(e), e.weight = s.weight + "px", e.color = s.color, e.opacity = s.opacity, s.dashArray ? e.dashStyle = ct(s.dashArray) ? s.dashArray.join(" ") : s.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = s.lineCap.replace("butt", "flat"), e.joinstyle = s.lineJoin) : e && (a.removeChild(e), t._stroke = null), s.fill ? (i || (i = t._fill = ye("fill")), a.appendChild(i), i.color = s.fillColor || s.color, i.opacity = s.fillOpacity) : i && (a.removeChild(i), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), i = Math.round(t._radius), s = Math.round(t._radiusY || i);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + s + " 0," + 65535 * 360);
        },
        _setPath: function(t, e) {
          t._path.v = e;
        },
        _bringToFront: function(t) {
          Gt(t._container);
        },
        _bringToBack: function(t) {
          Vt(t._container);
        }
      }, Ge = S.vml ? ye : fn, xe = $t.extend({
        _initContainer: function() {
          this._container = Ge("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Ge("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          j(this._container), U(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            $t.prototype._update.call(this);
            var t = this._bounds, e = t.getSize(), i = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), G(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(t) {
          var e = t._path = Ge("path");
          t.options.className && A(e, t.options.className), t.options.interactive && A(e, "leaflet-interactive"), this._updateStyle(t), this._layers[p(t)] = t;
        },
        _addPath: function(t) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
        },
        _removePath: function(t) {
          j(t._path), t.removeInteractiveTarget(t._path), delete this._layers[p(t)];
        },
        _updatePath: function(t) {
          t._project(), t._update();
        },
        _updateStyle: function(t) {
          var e = t._path, i = t.options;
          e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
        },
        _updatePoly: function(t, e) {
          this._setPath(t, mn(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, i = Math.max(Math.round(t._radius), 1), s = Math.max(Math.round(t._radiusY), 1) || i, a = "a" + i + "," + s + " 0 1,0 ", l = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + a + i * 2 + ",0 " + a + -i * 2 + ",0 ";
          this._setPath(t, l);
        },
        _setPath: function(t, e) {
          t._path.setAttribute("d", e);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(t) {
          Gt(t._path);
        },
        _bringToBack: function(t) {
          Vt(t._path);
        }
      });
      S.vml && xe.include(ga);
      function ds(t) {
        return S.svg || S.vml ? new xe(t) : null;
      }
      N.include({
        // @namespace Map; @method getRenderer(layer: Path): Renderer
        // Returns the instance of `Renderer` that should be used to render the given
        // `Path`. It will ensure that the `renderer` options of the map and paths
        // are respected, and that the renderers do exist on the map.
        getRenderer: function(t) {
          var e = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
          return e || (e = this._renderer = this._createRenderer()), this.hasLayer(e) || this.addLayer(e), e;
        },
        _getPaneRenderer: function(t) {
          if (t === "overlayPane" || t === void 0)
            return !1;
          var e = this._paneRenderers[t];
          return e === void 0 && (e = this._createRenderer({ pane: t }), this._paneRenderers[t] = e), e;
        },
        _createRenderer: function(t) {
          return this.options.preferCanvas && cs(t) || ds(t);
        }
      });
      var us = Xt.extend({
        initialize: function(t, e) {
          Xt.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(t) {
          return this.setLatLngs(this._boundsToLatLngs(t));
        },
        _boundsToLatLngs: function(t) {
          return t = q(t), [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast()
          ];
        }
      });
      function _a(t, e) {
        return new us(t, e);
      }
      xe.create = Ge, xe.pointsToPath = mn, Tt.geometryToLayer = Ze, Tt.coordsToLatLng = Bi, Tt.coordsToLatLngs = Fe, Tt.latLngToCoords = Zi, Tt.latLngsToCoords = Ue, Tt.getFeature = Jt, Tt.asFeature = He, N.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var ps = mt.extend({
        initialize: function(t) {
          this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
        },
        addHooks: function() {
          C(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          U(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          j(this._pane), delete this._pane;
        },
        _resetState: function() {
          this._resetStateTimeout = 0, this._moved = !1;
        },
        _clearDeferredResetState: function() {
          this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
        },
        _onMouseDown: function(t) {
          if (!t.shiftKey || t.which !== 1 && t.button !== 1)
            return !1;
          this._clearDeferredResetState(), this._resetState(), de(), wi(), this._startPoint = this._map.mouseEventToContainerPoint(t), C(document, {
            contextmenu: Bt,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(t) {
          this._moved || (this._moved = !0, this._box = R("div", "leaflet-zoom-box", this._container), A(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
          var e = new H(this._point, this._startPoint), i = e.getSize();
          G(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
        },
        _finish: function() {
          this._moved && (j(this._box), W(this._container, "leaflet-crosshair")), ue(), Ti(), U(document, {
            contextmenu: Bt,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(t) {
          if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(m(this._resetState, this), 0);
            var e = new nt(
              this._map.containerPointToLatLng(this._startPoint),
              this._map.containerPointToLatLng(this._point)
            );
            this._map.fitBounds(e).fire("boxzoomend", { boxZoomBounds: e });
          }
        },
        _onKeyDown: function(t) {
          t.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
        }
      });
      N.addInitHook("addHandler", "boxZoom", ps), N.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var fs = mt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, i = e.getZoom(), s = e.options.zoomDelta, a = t.originalEvent.shiftKey ? i - s : i + s;
          e.options.doubleClickZoom === "center" ? e.setZoom(a) : e.setZoomAround(t.containerPoint, a);
        }
      });
      N.addInitHook("addHandler", "doubleClickZoom", fs), N.mergeOptions({
        // @option dragging: Boolean = true
        // Whether the map is draggable with mouse/touch or not.
        dragging: !0,
        // @section Panning Inertia Options
        // @option inertia: Boolean = *
        // If enabled, panning of the map will have an inertia effect where
        // the map builds momentum while dragging and continues moving in
        // the same direction for some time. Feels especially nice on touch
        // devices. Enabled by default.
        inertia: !0,
        // @option inertiaDeceleration: Number = 3000
        // The rate with which the inertial movement slows down, in pixels/second².
        inertiaDeceleration: 3400,
        // px/s^2
        // @option inertiaMaxSpeed: Number = Infinity
        // Max speed of the inertial movement, in pixels/second.
        inertiaMaxSpeed: 1 / 0,
        // px/s
        // @option easeLinearity: Number = 0.2
        easeLinearity: 0.2,
        // TODO refactor, move to CRS
        // @option worldCopyJump: Boolean = false
        // With this option enabled, the map tracks when you pan to another "copy"
        // of the world and seamlessly jumps to the original one so that all overlays
        // like markers and vector layers are still visible.
        worldCopyJump: !1,
        // @option maxBoundsViscosity: Number = 0.0
        // If `maxBounds` is set, this option will control how solid the bounds
        // are when dragging the map around. The default value of `0.0` allows the
        // user to drag outside the bounds at normal speed, higher values will
        // slow down map dragging outside bounds, and `1.0` makes the bounds fully
        // solid, preventing the user from dragging outside the bounds.
        maxBoundsViscosity: 0
      });
      var ms = mt.extend({
        addHooks: function() {
          if (!this._draggable) {
            var t = this._map;
            this._draggable = new Lt(t._mapPane, t._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
          }
          A(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          W(this._map._container, "leaflet-grab"), W(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        moving: function() {
          return this._draggable && this._draggable._moving;
        },
        _onDragStart: function() {
          var t = this._map;
          if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
            var e = q(this._map.options.maxBounds);
            this._offsetLimit = it(
              this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),
              this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
            ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
          } else
            this._offsetLimit = null;
          t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = []);
        },
        _onDrag: function(t) {
          if (this._map.options.inertia) {
            var e = this._lastTime = +/* @__PURE__ */ new Date(), i = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(i), this._times.push(e), this._prunePositions(e);
          }
          this._map.fire("move", t).fire("drag", t);
        },
        _prunePositions: function(t) {
          for (; this._positions.length > 1 && t - this._times[0] > 50; )
            this._positions.shift(), this._times.shift();
        },
        _onZoomEnd: function() {
          var t = this._map.getSize().divideBy(2), e = this._map.latLngToLayerPoint([0, 0]);
          this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
        },
        _viscousLimit: function(t, e) {
          return t - (t - e) * this._viscosity;
        },
        _onPreDragLimit: function() {
          if (!(!this._viscosity || !this._offsetLimit)) {
            var t = this._draggable._newPos.subtract(this._draggable._startPos), e = this._offsetLimit;
            t.x < e.min.x && (t.x = this._viscousLimit(t.x, e.min.x)), t.y < e.min.y && (t.y = this._viscousLimit(t.y, e.min.y)), t.x > e.max.x && (t.x = this._viscousLimit(t.x, e.max.x)), t.y > e.max.y && (t.y = this._viscousLimit(t.y, e.max.y)), this._draggable._newPos = this._draggable._startPos.add(t);
          }
        },
        _onPreDragWrap: function() {
          var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, s = this._draggable._newPos.x, a = (s - e + i) % t + e - i, l = (s + e + i) % t - e - i, d = Math.abs(a + i) < Math.abs(l + i) ? a : l;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = d;
        },
        _onDragEnd: function(t) {
          var e = this._map, i = e.options, s = !i.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), s)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var a = this._lastPos.subtract(this._positions[0]), l = (this._lastTime - this._times[0]) / 1e3, d = i.easeLinearity, f = a.multiplyBy(d / l), g = f.distanceTo([0, 0]), v = Math.min(i.inertiaMaxSpeed, g), w = f.multiplyBy(v / g), E = v / (i.inertiaDeceleration * d), D = w.multiplyBy(-E / 2).round();
            !D.x && !D.y ? e.fire("moveend") : (D = e._limitOffset(D, e.options.maxBounds), et(function() {
              e.panBy(D, {
                duration: E,
                easeLinearity: d,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      N.addInitHook("addHandler", "dragging", ms), N.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var gs = mt.extend({
        keyCodes: {
          left: [37],
          right: [39],
          down: [40],
          up: [38],
          zoomIn: [187, 107, 61, 171],
          zoomOut: [189, 109, 54, 173]
        },
        initialize: function(t) {
          this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta);
        },
        addHooks: function() {
          var t = this._map._container;
          t.tabIndex <= 0 && (t.tabIndex = "0"), C(t, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks(), U(this._map._container, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.off({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        _onMouseDown: function() {
          if (!this._focused) {
            var t = document.body, e = document.documentElement, i = t.scrollTop || e.scrollTop, s = t.scrollLeft || e.scrollLeft;
            this._map._container.focus(), window.scrollTo(s, i);
          }
        },
        _onFocus: function() {
          this._focused = !0, this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = !1, this._map.fire("blur");
        },
        _setPanDelta: function(t) {
          var e = this._panKeys = {}, i = this.keyCodes, s, a;
          for (s = 0, a = i.left.length; s < a; s++)
            e[i.left[s]] = [-1 * t, 0];
          for (s = 0, a = i.right.length; s < a; s++)
            e[i.right[s]] = [t, 0];
          for (s = 0, a = i.down.length; s < a; s++)
            e[i.down[s]] = [0, t];
          for (s = 0, a = i.up.length; s < a; s++)
            e[i.up[s]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, i = this.keyCodes, s, a;
          for (s = 0, a = i.zoomIn.length; s < a; s++)
            e[i.zoomIn[s]] = t;
          for (s = 0, a = i.zoomOut.length; s < a; s++)
            e[i.zoomOut[s]] = -t;
        },
        _addHooks: function() {
          C(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          U(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, i = this._map, s;
            if (e in this._panKeys) {
              if (!i._panAnim || !i._panAnim._inProgress)
                if (s = this._panKeys[e], t.shiftKey && (s = k(s).multiplyBy(3)), i.options.maxBounds && (s = i._limitOffset(k(s), i.options.maxBounds)), i.options.worldCopyJump) {
                  var a = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(s)));
                  i.panTo(a);
                } else
                  i.panBy(s);
            } else if (e in this._zoomKeys)
              i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
            else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
              i.closePopup();
            else
              return;
            Bt(t);
          }
        }
      });
      N.addInitHook("addHandler", "keyboard", gs), N.mergeOptions({
        // @section Mouse wheel options
        // @option scrollWheelZoom: Boolean|String = true
        // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
        // it will zoom to the center of the view regardless of where the mouse was.
        scrollWheelZoom: !0,
        // @option wheelDebounceTime: Number = 40
        // Limits the rate at which a wheel can fire (in milliseconds). By default
        // user can't zoom via wheel more often than once per 40 ms.
        wheelDebounceTime: 40,
        // @option wheelPxPerZoomLevel: Number = 60
        // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
        // mean a change of one full zoom level. Smaller values will make wheel-zooming
        // faster (and vice versa).
        wheelPxPerZoomLevel: 60
      });
      var _s = mt.extend({
        addHooks: function() {
          C(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          U(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = Fn(t), i = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var s = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(m(this._performZoom, this), s), Bt(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
          t._stop();
          var s = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), a = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(s)))) / Math.LN2, l = i ? Math.ceil(a / i) * i : a, d = t._limitZoom(e + (this._delta > 0 ? l : -l)) - e;
          this._delta = 0, this._startTime = null, d && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + d) : t.setZoomAround(this._lastMousePos, e + d));
        }
      });
      N.addInitHook("addHandler", "scrollWheelZoom", _s);
      var va = 600;
      N.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: S.touchNative && S.safari && S.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var vs = mt.extend({
        addHooks: function() {
          C(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          U(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(t) {
          if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
            var e = t.touches[0];
            this._startPos = this._newPos = new I(e.clientX, e.clientY), this._holdTimeout = setTimeout(m(function() {
              this._cancel(), this._isTapValid() && (C(document, "touchend", J), C(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
            }, this), va), C(document, "touchend touchcancel contextmenu", this._cancel, this), C(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function t() {
          U(document, "touchend", J), U(document, "touchend touchcancel", t);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), U(document, "touchend touchcancel contextmenu", this._cancel, this), U(document, "touchmove", this._onMove, this);
        },
        _onMove: function(t) {
          var e = t.touches[0];
          this._newPos = new I(e.clientX, e.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(t, e) {
          var i = new MouseEvent(t, {
            bubbles: !0,
            cancelable: !0,
            view: window,
            // detail: 1,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY
            // button: 2,
            // buttons: 2
          });
          i._simulated = !0, e.target.dispatchEvent(i);
        }
      });
      N.addInitHook("addHandler", "tapHold", vs), N.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: S.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: !0
      });
      var ys = mt.extend({
        addHooks: function() {
          A(this._map._container, "leaflet-touch-zoom"), C(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          W(this._map._container, "leaflet-touch-zoom"), U(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var i = e.mouseEventToContainerPoint(t.touches[0]), s = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(s)._divideBy(2))), this._startDist = i.distanceTo(s), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), C(document, "touchmove", this._onTouchMove, this), C(document, "touchend touchcancel", this._onTouchEnd, this), J(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), s = e.mouseEventToContainerPoint(t.touches[1]), a = i.distanceTo(s) / this._startDist;
            if (this._zoom = e.getScaleZoom(a, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && a < 1 || this._zoom > e.getMaxZoom() && a > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, a === 1)
                return;
            } else {
              var l = i._add(s)._divideBy(2)._subtract(this._centerPoint);
              if (a === 1 && l.x === 0 && l.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(l), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), at(this._animRequest);
            var d = m(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = et(d, this, !0), J(t);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, at(this._animRequest), U(document, "touchmove", this._onTouchMove, this), U(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      N.addInitHook("addHandler", "touchZoom", ys), N.BoxZoom = ps, N.DoubleClickZoom = fs, N.Drag = ms, N.Keyboard = gs, N.ScrollWheelZoom = _s, N.TapHold = vs, N.TouchZoom = ys, r.Bounds = H, r.Browser = S, r.CRS = xt, r.Canvas = hs, r.Circle = Ri, r.CircleMarker = Be, r.Class = yt, r.Control = dt, r.DivIcon = as, r.DivOverlay = gt, r.DomEvent = Or, r.DomUtil = Mr, r.Draggable = Lt, r.Evented = ae, r.FeatureGroup = bt, r.GeoJSON = Tt, r.GridLayer = ve, r.Handler = mt, r.Icon = Yt, r.ImageOverlay = je, r.LatLng = B, r.LatLngBounds = nt, r.Layer = ut, r.LayerGroup = Kt, r.LineUtil = Kr, r.Map = N, r.Marker = Re, r.Mixin = Hr, r.Path = kt, r.Point = I, r.PolyUtil = jr, r.Polygon = Xt, r.Polyline = wt, r.Popup = We, r.PosAnimation = Un, r.Projection = Yr, r.Rectangle = us, r.Renderer = $t, r.SVG = xe, r.SVGOverlay = rs, r.TileLayer = Qt, r.Tooltip = qe, r.Transformation = ci, r.Util = ir, r.VideoOverlay = ss, r.bind = m, r.bounds = it, r.canvas = cs, r.circle = sa, r.circleMarker = na, r.control = me, r.divIcon = pa, r.extend = h, r.featureGroup = ta, r.geoJSON = ns, r.geoJson = oa, r.gridLayer = fa, r.icon = ea, r.imageOverlay = la, r.latLng = O, r.latLngBounds = q, r.layerGroup = Qr, r.map = Nr, r.marker = ia, r.point = k, r.polygon = aa, r.polyline = ra, r.popup = da, r.rectangle = _a, r.setOptions = M, r.stamp = p, r.svg = ds, r.svgOverlay = ca, r.tileLayer = os, r.tooltip = ua, r.transformation = oe, r.version = o, r.videoOverlay = ha;
      var ya = window.L;
      r.noConflict = function() {
        return window.L = ya, this;
      }, window.L = r;
    }));
  })(we, we.exports)), we.exports;
}
var _t = Ao();
const Do = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function Mo(c) {
  return [...c].sort((n, r) => {
    const o = n.started_at ? Date.parse(n.started_at) : Number.POSITIVE_INFINITY, h = r.started_at ? Date.parse(r.started_at) : Number.POSITIVE_INFINITY;
    return o !== h ? o - h : n.id.localeCompare(r.id);
  });
}
const Fs = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], zo = Do.replace(/\s+/g, " ").trim();
class tr extends zt {
  trips = [];
  selectedTripId = "";
  drives = [];
  places = [];
  selectedDriveIds = [];
  driveSelectionInitialized = !1;
  data;
  map;
  layers = [];
  loading = !1;
  error = "";
  tileError = !1;
  tileLayer;
  renderQueued = !1;
  mapConfig;
  vehicleName = "";
  driveSectionsOpen = !1;
  fitMapPending = !0;
  showPlaces = !0;
  addPlaceMode = !1;
  draftPoint;
  draftName = "";
  draftType = "other";
  draftArrived = "";
  draftDescription = "";
  draftSaving = !1;
  onActiveTripChanged = (n) => {
    const r = n.detail;
    r?.vehicleId !== this.vehicleId || r.tripId === this.selectedTripId || (this.selectedTripId = r.tripId, this.selectedDriveIds = [], this.driveSelectionInitialized = !1, this.refresh(!0));
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(vt, this.onActiveTripChanged), this.driveSectionsOpen = typeof window < "u" && window.matchMedia("(min-width: 700px)").matches, this.refresh(!0);
  }
  disconnectedCallback() {
    this.map?.remove(), this.map = void 0, this.tileLayer = void 0, window.removeEventListener(vt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh(!0);
  }
  onConfigChanged() {
    this.tileLayer?.remove(), this.tileLayer = void 0, this.tileError = !1, this.fitMapPending = !0, this.refresh(!0);
  }
  async refresh(n = !1) {
    if (!(!this.hass || !this.vehicleId)) {
      this.fitMapPending ||= n, this.loading = !0, this.error = "", this.requestUpdate();
      try {
        const r = await si(this.hass);
        this.vehicleName = r.find((p) => p.vehicle_id === this.vehicleId)?.name ?? "";
        const o = await St(this.hass, this.vehicleId);
        this.mapConfig = o.map_config, this.trips = o.trips;
        const h = this.config.trip_id ?? "", u = ri(this.vehicleId);
        h && this.trips.some((p) => p.id === h) ? this.selectedTripId = h : u && this.trips.some((p) => p.id === u) && (this.selectedTripId = u), (!this.selectedTripId || !this.trips.some((p) => p.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((p) => p.status === "active")?.id ?? this.trips[0]?.id ?? ""), this.selectedTripId && !h && Dt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" });
        const m = this.selectedTripId ? await St(this.hass, this.vehicleId, this.selectedTripId) : o;
        this.mapConfig = m.map_config ?? this.mapConfig, this.drives = Mo(m.drives), this.places = m.stops ?? [];
        const x = new Set(this.drives.map((p) => p.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((p) => x.has(p)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((p) => p.id), this.driveSelectionInitialized = !0), this.data = await Ka(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
      } catch {
        this.error = $(this.hass).loadError, this.data = void 0;
      } finally {
        this.loading = !1, this.requestUpdate(), this.queueMapRender();
      }
    }
  }
  queueMapRender() {
    this.renderQueued || (this.renderQueued = !0, this.updateComplete.then(() => {
      this.renderQueued = !1, this.renderMap();
    }));
  }
  renderMap() {
    const n = this.shadowRoot?.querySelector(".map");
    if (!n) return;
    this.map || (this.map = _t.map(n, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5)), this.map.off("click", this.onMapClick), this.addPlaceMode && this.map.on("click", this.onMapClick);
    const r = this.config, o = r.tile_url ?? this.mapConfig?.tile_url ?? void 0, h = r.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (o && !this.tileError && !this.tileLayer) {
      const x = h || (o.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = _t.tileLayer(o, { maxZoom: 19, attribution: x }).on("tileerror", () => {
        this.tileError = !0, this.tileLayer?.remove(), this.tileLayer = void 0, this.requestUpdate();
      }).addTo(this.map);
    }
    for (const x of this.layers) x.remove();
    this.layers = [];
    const u = _t.latLngBounds([]), m = $(this.hass);
    for (const [x, p] of (this.data?.segments ?? []).entries()) {
      const y = p.points.map((M) => _t.latLng(M.latitude, M.longitude));
      if (!y.length) continue;
      const P = this.drives.findIndex((M) => M.id === p.drive_id), b = this.driveColor(P >= 0 ? P : x), z = _t.polyline(y, { color: b, weight: 4, opacity: 0.85 }).addTo(this.map);
      this.layers.push(z), y.forEach((M) => u.extend(M));
      const T = _t.circleMarker(y[0], { radius: 6, color: b, fillOpacity: 1 }).bindTooltip(m.mapStart).bindPopup(this.endpointPopup(m.mapStart, p.points[0])).addTo(this.map), F = _t.circleMarker(y[y.length - 1], { radius: 6, color: "#111", fillColor: b, fillOpacity: 1 }).bindTooltip(m.mapEnd).bindPopup(this.endpointPopup(m.mapEnd, p.points[p.points.length - 1])).addTo(this.map);
      this.layers.push(T, F);
      for (const M of p.gaps) {
        const Wt = y[Math.max(0, Math.floor(y.length / 2))], re = _t.circleMarker(Wt, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${m.mapGap}: ${M.seconds}s`).addTo(this.map);
        this.layers.push(re);
      }
    }
    for (const x of this.places) {
      if (!this.showPlaces || x.latitude == null || x.longitude == null || x.confirmed === !1) continue;
      const p = ["campsite", "rv_site", "wild_camp", "overnight"].includes(x.place_kind || x.place_type || x.stop_type), y = _t.circleMarker([x.latitude, x.longitude], { radius: p ? 9 : 7, color: p ? "#7b1fa2" : "#455a64", fillColor: p ? "#ce93d8" : "#90a4ae", fillOpacity: 0.95, weight: 2 }), P = x.rating_overall ? ` · ${x.rating_overall}/5` : "", b = document.createElement("div"), z = document.createElement("strong");
      z.textContent = x.name || "Ort", b.append(z, document.createElement("br")), b.append(document.createTextNode(`${x.place_type || x.stop_type}${P}`), document.createElement("br")), b.append(document.createTextNode(x.description || "")), y.bindPopup(b), y.addTo(this.map), this.layers.push(y), u.extend([x.latitude, x.longitude]);
    }
    if (this.draftPoint) {
      const x = _t.circleMarker([this.draftPoint.latitude, this.draftPoint.longitude], { radius: 10, color: "#f57c00", fillColor: "#ffcc80", fillOpacity: 0.9, weight: 3 }).bindTooltip(m.mapAddPlace ?? "Ort hinzufügen").addTo(this.map);
      this.layers.push(x), u.extend([this.draftPoint.latitude, this.draftPoint.longitude]);
    }
    this.fitMapPending && u.isValid() && (this.map.fitBounds(u.pad(0.08)), this.fitMapPending = !1), setTimeout(() => this.map?.invalidateSize(), 0);
  }
  onMapClick = (n) => {
    if (!this.addPlaceMode) return;
    const r = this.nearestRoutePoint(n.latlng.lat, n.latlng.lng);
    this.draftPoint = { latitude: n.latlng.lat, longitude: n.latlng.lng, recorded_at: r?.recorded_at }, !this.draftArrived && r?.recorded_at && (this.draftArrived = this.localDateTime(r.recorded_at)), this.requestUpdate(), this.queueMapRender();
  };
  endpointPopup(n, r) {
    const o = document.createElement("div");
    o.append(document.createTextNode(`${n}: ${K(r.recorded_at, this.hass)}`), document.createElement("br"));
    const h = document.createElement("button");
    return h.type = "button", h.textContent = $(this.hass).mapAddPlace ?? "Ort hinzufügen", h.addEventListener("click", () => this.startMapPlace(r.latitude, r.longitude, r.recorded_at)), o.append(h), o;
  }
  startMapPlace(n, r, o) {
    this.addPlaceMode = !0, this.draftPoint = { latitude: n, longitude: r, recorded_at: o }, !this.draftArrived && o && (this.draftArrived = this.localDateTime(o)), this.requestUpdate(), this.queueMapRender();
  }
  nearestRoutePoint(n, r) {
    return (this.data?.segments ?? []).flatMap((h) => h.points).reduce((h, u) => {
      if (!h) return u;
      const m = (u.latitude - n) ** 2 + (u.longitude - r) ** 2, x = (h.latitude - n) ** 2 + (h.longitude - r) ** 2;
      return m < x ? u : h;
    }, void 0);
  }
  localDateTime(n) {
    const r = new Date(n), o = (h) => String(h).padStart(2, "0");
    return `${r.getFullYear()}-${o(r.getMonth() + 1)}-${o(r.getDate())}T${o(r.getHours())}:${o(r.getMinutes())}`;
  }
  toggleAddPlace() {
    this.addPlaceMode = !this.addPlaceMode, this.addPlaceMode || (this.draftPoint = void 0, this.draftName = "", this.draftArrived = "", this.draftDescription = ""), this.requestUpdate(), this.queueMapRender();
  }
  async saveDraftPlace() {
    if (!(!this.hass || !this.selectedTripId || !this.draftPoint || !this.draftName.trim() || !this.draftArrived || this.draftSaving)) {
      this.draftSaving = !0;
      try {
        await Xs(this.hass, this.vehicleId, this.selectedTripId, {
          name: this.draftName.trim(),
          place_type: this.draftType,
          category: this.draftType,
          occurred_at: new Date(this.draftArrived).toISOString(),
          arrived_at: new Date(this.draftArrived).toISOString(),
          latitude: this.draftPoint.latitude,
          longitude: this.draftPoint.longitude,
          description: this.draftDescription
        }), this.toggleAddPlace(), await this.refresh(!0);
      } catch {
        this.error = $(this.hass).placeSaveError ?? $(this.hass).loadError;
      } finally {
        this.draftSaving = !1, this.requestUpdate();
      }
    }
  }
  driveColor(n) {
    return Fs[n % Fs.length];
  }
  selectedTrip() {
    return this.trips.find((n) => n.id === this.selectedTripId);
  }
  selectedDrives() {
    return this.drives.filter((n) => this.selectedDriveIds.includes(n.id));
  }
  async selectTrip(n) {
    this.selectedTripId = n.currentTarget.value, Dt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" }), this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh(!0);
  }
  async toggleDrive(n) {
    const r = n.currentTarget;
    this.selectedDriveIds = r.checked ? [.../* @__PURE__ */ new Set([...this.selectedDriveIds, r.value])] : this.selectedDriveIds.filter((o) => o !== r.value), await this.refresh(!0);
  }
  async selectAllDrives() {
    this.selectedDriveIds = this.drives.map((n) => n.id), await this.refresh(!0);
  }
  async selectNoDrives() {
    this.selectedDriveIds = [], await this.refresh(!0);
  }
  onDriveSectionsToggle(n) {
    this.driveSectionsOpen = n.currentTarget.open;
  }
  driveRow(n, r) {
    const o = $(this.hass), h = n.source === "manual" ? o.sourceManual : n.source === "gpx" ? o.sourceGpx ?? o.sourceGps : o.sourceGps;
    return _`<label class="drive-row" style=${`--drive-color:${this.driveColor(r)}`}>
      <input type="checkbox" value=${n.id} .checked=${this.selectedDriveIds.includes(n.id)} @change=${(u) => {
      this.toggleDrive(u);
    }}>
      <span class="drive-info"><strong>${$e(n.started_at, this.hass)} · ${Os(n.started_at, this.hass)} → ${n.ended_at ? `${$e(n.ended_at, this.hass)} · ${Os(n.ended_at, this.hass)}` : "–"}</strong><span>${(n.distance_m / 1e3).toFixed(1)} km · ${n.duration_seconds ? Ct(n.duration_seconds, this.hass) : "–"} · ${h}</span></span>
    </label>`;
  }
  renderPlaceCapture(n, r) {
    return r ? this.addPlaceMode ? this.draftPoint ? _`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${n.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${n.mapPlaceHint}</p><form class="form-grid" @submit=${(o) => {
      o.preventDefault(), this.saveDraftPlace();
    }}><input aria-label=${n.placeName ?? "Name"} placeholder=${n.placeName ?? "Name"} .value=${this.draftName} @input=${(o) => this.draftName = o.currentTarget.value} required><select aria-label=${n.placeCategory ?? "Kategorie"} .value=${this.draftType} @change=${(o) => this.draftType = o.currentTarget.value}><option value="other">${n.placeOther ?? "Sonstiger Ort"}</option><option value="fuel_stop">${n.placeFuel ?? "Tankpause"}</option><option value="restaurant">${n.placeRestaurant ?? "Restaurant"}</option><option value="attraction">${n.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${n.placeFerry ?? "Fähre"}</option><option value="campsite">${n.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${n.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${n.placeWildCamp ?? "Freistehplatz"}</option></select><label>${n.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.draftArrived} @input=${(o) => this.draftArrived = o.currentTarget.value} required></label><textarea aria-label=${n.placeDescription ?? "Beschreibung"} placeholder=${n.placeDescription ?? "Beschreibung"} .value=${this.draftDescription} @input=${(o) => this.draftDescription = o.currentTarget.value}></textarea><button type="submit" ?disabled=${this.draftSaving}>${this.draftSaving ? n.saving : n.save}</button></form></section>` : _`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${n.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${n.mapPlaceHint}</p></section>` : _`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${n.mapAddPlace ?? "Ort hinzufügen"}</button></section>` : "";
  }
  render() {
    const n = $(this.hass), r = this.config, o = this.selectedTrip(), h = this.selectedDrives(), u = h.reduce((x, p) => x + p.distance_m, 0) / 1e3, m = r.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    return _`<ha-card>
      <header class="map-header">
        <div><h2>${n.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || n.mapVehicle}</p></div>
        ${this.trips.length && !r.trip_id ? _`<label class="trip-picker"><span>${n.mapTrip}</span><select @change=${(x) => {
      this.selectTrip(x);
    }} .value=${this.selectedTripId}>${this.trips.map((x) => _`<option value=${x.id}>${x.title}</option>`)}</select></label>` : ""}
      </header>
      ${o ? _`<div class="metrics" aria-label=${n.mapTrip}>
        <div class="metric"><span>${n.mapTotalDistance}</span><strong>${u.toFixed(1)} km</strong></div>
        <div class="metric"><span>${n.mapSelectedDrives}</span><strong>${h.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${n.mapTripPeriod}</span><strong>${bo(o, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? _`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(x) => this.onDriveSectionsToggle(x)}>
        <summary><span>${n.mapDriveSegments}</span><span class="summary-count">${h.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => {
      this.selectAllDrives();
    }}>${n.mapSelectAll}</button><button class="secondary" type="button" @click=${() => {
      this.selectNoDrives();
    }}>${n.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((x, p) => this.driveRow(x, p))}</div>
      </details>` : ""}
      <label class="place-filter"><input type="checkbox" .checked=${this.showPlaces} @change=${(x) => {
      this.showPlaces = x.currentTarget.checked, this.queueMapRender(), this.requestUpdate();
    }}> ${n.mapPlaces ?? "Orte anzeigen"}</label>
      ${this.renderPlaceCapture(n, o)}
      ${this.error ? _`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? _`<p class="error" role="alert">${$(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !r.tile_url && !this.mapConfig?.tile_url ? _`<p class="muted" role="status">${$(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? _`<p class="muted">${n.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? _`<p class="muted">${n.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${n.mapRouteImageAlt}></div>
      ${m ? _`<p class="attribution">${m}</p>` : ""}
      ${this.loading ? _`<p class="muted">${n.loading}</p>` : ""}
    </ha-card>`;
  }
}
tr.styles = [zt.styles, Hs(zo), Mt`
  :host { min-width: 0; }
  ha-card { overflow: hidden; }
  .map-header { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
  h2 { margin: 0 0 3px; font-size: 1.25rem; }
  .vehicle-context { margin: 0; color: var(--secondary-text-color); font-size: .86rem; }
  .trip-picker { display: grid; gap: 3px; min-width: min(260px, 50%); font-size: .78rem; color: var(--secondary-text-color); }
  select { min-height: 38px; max-width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 7px 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; }
  .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 10px; }
  .metric { min-width: 0; padding: 8px 9px; border-radius: 9px; background: var(--secondary-background-color); }
  .metric span, .metric strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .metric span { color: var(--secondary-text-color); font-size: .72rem; }
  .metric strong { margin-top: 3px; font-size: .95rem; }
  .drive-details { margin: 0 0 10px; border-block: 1px solid var(--divider-color); }
  summary { display: flex; justify-content: space-between; gap: 8px; cursor: pointer; padding: 10px 2px; font-weight: 600; list-style-position: inside; }
  .summary-count { color: var(--secondary-text-color); font-size: .85rem; font-weight: 400; }
  .drive-actions { display: flex; gap: 7px; flex-wrap: wrap; padding: 0 0 8px 20px; }
  .drive-actions button { min-height: 34px; padding: 6px 10px; font-size: .82rem; }
  .drive-list { display: grid; gap: 5px; padding: 0 0 8px 20px; }
  .drive-row { display: flex; align-items: center; gap: 8px; min-height: 38px; padding: 5px 7px; border-inline-start: 4px solid var(--drive-color); border-radius: 4px; background: var(--secondary-background-color); cursor: pointer; }
  .drive-row input { flex: 0 0 auto; min-height: 20px; width: 20px; accent-color: var(--drive-color); }
  .drive-info { display: grid; gap: 2px; min-width: 0; font-size: .83rem; }
  .drive-info span { color: var(--secondary-text-color); font-size: .76rem; }
  .map { height: clamp(300px, 58vh, 620px); min-height: 280px; border-radius: 9px; overflow: hidden; background: var(--secondary-background-color); }
  .map-place-capture { display: grid; gap: 8px; margin: 10px 0; padding: 10px; border: 1px solid var(--divider-color); border-radius: 8px; }
  .map-place-capture .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: 8px; }
  .map-place-capture input, .map-place-capture select, .map-place-capture textarea { box-sizing: border-box; min-width: 0; width: 100%; }
  .map-place-capture textarea { min-height: 4rem; }
  .attribution { margin: 6px 0 0; color: var(--secondary-text-color); font-size: .72rem; }
  button:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
  @media (max-width: 600px) {
    .map-header { align-items: stretch; flex-direction: column; }
    .trip-picker { min-width: 0; }
    .metrics { gap: 5px; }
    .metric { padding: 7px; }
    .metric strong { font-size: .85rem; }
    .map { height: clamp(300px, 62vh, 560px); }
  }
`];
ni("camper-travel-journal-map-card", tr);
const Xi = /* @__PURE__ */ new Set(["campsite", "rv_site", "wild_camp", "overnight"]);
class er extends zt {
  overview;
  detail;
  openTripId = "";
  selectedTripId = "";
  showNewTrip = !1;
  newTitle = "";
  newDestination = "";
  newStart = "";
  newEnd = "";
  loading = !1;
  error = "";
  dirty = !1;
  onActiveTripChanged = (n) => {
    const r = n.detail;
    r?.vehicleId !== this.vehicleId || !r.tripId || r.tripId === this.openTripId || this.openTripId && this.openTrip(r.tripId);
  };
  interruptionDialog;
  interruptionAction = "stop";
  interruptionPlaceId = "";
  interruptionName = "";
  interruptionType = "other";
  interruptionAddress = "";
  interruptionDescription = "";
  interruptionSaving = !1;
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(vt, this.onActiveTripChanged), this.refreshOverview();
  }
  disconnectedCallback() {
    window.removeEventListener(vt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refreshOverview();
  }
  onConfigChanged() {
    this.closeTrip(!1), this.refreshOverview();
  }
  updated() {
    const n = this.renderRoot.querySelector("dialog.interruption-dialog");
    n && (this.interruptionDialog && !n.open && n.showModal(), !this.interruptionDialog && n.open && n.close());
  }
  async refreshOverview() {
    if (!(!this.hass || !this.vehicleId)) {
      this.loading = !0, this.error = "", this.requestUpdate();
      try {
        this.overview = await St(this.hass, this.vehicleId);
        try {
          this.vehicleName = (await si(this.hass)).find((r) => r.vehicle_id === this.vehicleId)?.name ?? "";
        } catch {
          this.vehicleName = "";
        }
        const n = ri(this.vehicleId);
        this.selectedTripId = this.overview.trips.some((r) => r.id === (this.openTripId || n)) ? this.openTripId || n : "", this.openTripId && this.overview.trips.some((r) => r.id === this.openTripId) && await this.loadDetail(this.openTripId);
      } catch {
        this.error = $(this.hass).loadError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  async loadDetail(n) {
    !this.hass || !n || (this.detail = await St(this.hass, this.vehicleId, n));
  }
  async openTrip(n = this.selectedTripId) {
    if (!(!n || !this.overview?.trips.some((r) => r.id === n)) && !(this.dirty && !window.confirm($(this.hass).unsavedTripChange ?? "Ungespeicherte Änderungen verwerfen?"))) {
      this.loading = !0, this.error = "", this.dirty = !1, this.openTripId = n, this.selectedTripId = n;
      try {
        await this.loadDetail(n), Dt({ vehicleId: this.vehicleId, tripId: n, source: "journal" });
      } catch {
        this.error = $(this.hass).loadError, this.openTripId = "";
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  closeTrip(n = !0) {
    n && this.dirty && !window.confirm($(this.hass).unsavedTripChange ?? "Ungespeicherte Änderungen verwerfen?") || (this.openTripId = "", this.detail = void 0, this.dirty = !1, wo(this.vehicleId, "journal"), this.requestUpdate());
  }
  async createAndOpenTrip() {
    if (!(!this.hass || !this.newTitle.trim())) {
      if (this.newStart && this.newEnd && this.newEnd < this.newStart) {
        this.error = $(this.hass).dateInvalid;
        return;
      }
      this.loading = !0, this.error = "";
      try {
        const n = this.newTitle.trim(), r = await Ys(this.hass, this.vehicleId, n, this.newStart, this.newEnd, this.newDestination.trim());
        this.showNewTrip = !1, this.newTitle = "", this.newDestination = "", this.newStart = "", this.newEnd = "", this.overview = await St(this.hass, this.vehicleId);
        const o = r.trip_id || this.overview.trips.find((h) => h.title === n)?.id || this.overview.trips[0]?.id;
        o && await this.openTrip(o);
      } catch {
        this.error = $(this.hass).tripCreateError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  trip() {
    return this.overview?.trips.find((n) => n.id === this.openTripId) ?? this.detail?.trips.find((n) => n.id === this.openTripId);
  }
  markDirty() {
    this.dirty = !0;
  }
  openInterruptionDialog(n) {
    this.interruptionDialog = n, this.interruptionAction = n.status === "unassigned" ? "stop" : n.status === "overnight" ? "overnight" : n.status === "stop" ? "stop" : n.status, this.interruptionPlaceId = n.existing_place_id ?? "", this.interruptionName = "", this.interruptionType = "other", this.interruptionAddress = "", this.interruptionDescription = "", this.requestUpdate();
  }
  closeInterruptionDialog() {
    this.interruptionDialog = void 0, this.interruptionSaving = !1, this.requestUpdate();
  }
  async saveInterruption() {
    if (!this.hass || !this.openTripId || !this.interruptionDialog) return;
    const n = this.interruptionDialog;
    this.interruptionSaving = !0, this.requestUpdate();
    try {
      if (this.interruptionAction === "stop" || this.interruptionAction === "overnight")
        if (this.interruptionPlaceId)
          await Ms(this.hass, this.vehicleId, this.openTripId, n.id, this.interruptionAction, this.interruptionPlaceId);
        else {
          if (!this.interruptionName.trim()) throw new Error("place_name_required");
          await oo(this.hass, this.vehicleId, this.openTripId, n.id, { name: this.interruptionName.trim(), place_type: this.interruptionType, overnight: this.interruptionAction === "overnight", address: this.interruptionAddress.trim(), description: this.interruptionDescription.trim() });
        }
      else
        await Ms(this.hass, this.vehicleId, this.openTripId, n.id, this.interruptionAction);
      await this.loadDetail(this.openTripId), this.closeInterruptionDialog();
    } catch (r) {
      this.error = r instanceof Error && r.message === "place_name_required" ? "Bitte einen Namen eingeben." : $(this.hass).loadError, this.interruptionSaving = !1, this.requestUpdate();
    }
  }
  section(n, r, o, h, u = !1) {
    return _`<section class="journal-section"><details ?open=${u}><summary><span class="section-title"><span aria-hidden="true">${r}</span><strong>${n}</strong></span>${o === void 0 ? "" : _`<span class="count">${o}</span>`}</summary><div class="section-content">${h}</div></details></section>`;
  }
  renderPicker(n) {
    const r = this.overview?.trips ?? [];
    return _`<section class="entry" aria-labelledby="journal-entry-title"><div class="entry-icon" aria-hidden="true">🚐</div><h2 id="journal-entry-title">${n.journalEntry ?? "Reise auswählen oder neu anlegen"}</h2><p class="muted">${n.journalEntryHint ?? "Öffne eine Reise, um ihre Fahrten, Orte, Karte und Exporte zu sehen."}</p>${r.length ? _`<label class="picker-label">${n.journalSelect ?? "Reise auswählen"}<select aria-label=${n.journalSelect ?? "Reise auswählen"} .value=${this.selectedTripId} @change=${(o) => {
      this.selectedTripId = o.currentTarget.value, this.requestUpdate();
    }}><option value="">${n.journalChoose ?? "Bitte auswählen …"}</option>${r.map((o) => _`<option value=${o.id}>${o.title} · ${se(o.status, this.hass)} · ${At(o, this.hass)}</option>`)}</select></label>` : _`<p class="muted">${n.noTrip}</p>`}<div class="actions"><button type="button" @click=${() => {
      this.openTrip();
    }} ?disabled=${!this.selectedTripId || this.loading}>${n.journalOpen ?? "Reise öffnen"}</button><button type="button" class="secondary" @click=${() => {
      this.showNewTrip = !this.showNewTrip, this.requestUpdate();
    }}>${n.newTrip}</button></div>${this.showNewTrip ? _`<form class="new-trip form-grid" @submit=${(o) => {
      o.preventDefault(), this.createAndOpenTrip();
    }}><input aria-label=${n.tripName} placeholder=${n.tripName} .value=${this.newTitle} @input=${(o) => {
      this.newTitle = o.currentTarget.value, this.markDirty();
    }} required><input aria-label=${n.destination} placeholder=${n.destination} .value=${this.newDestination} @input=${(o) => this.newDestination = o.currentTarget.value}><label>${n.startDate}<input type="date" .value=${this.newStart} @input=${(o) => this.newStart = o.currentTarget.value}></label><label>${n.endDate}<input type="date" .value=${this.newEnd} @input=${(o) => this.newEnd = o.currentTarget.value}></label><div class="actions"><button type="submit" ?disabled=${this.loading}>${n.create}</button><button type="button" class="secondary" @click=${() => {
      this.showNewTrip = !1, this.requestUpdate();
    }}>${n.cancel}</button></div></form>` : ""}</section>`;
  }
  renderOpenTrip(n, r) {
    const o = this.detail, h = (o?.stops ?? []).filter((T) => T.confirmed !== !1), u = h.filter((T) => Xi.has(T.place_kind || T.place_type || T.stop_type)), m = (o?.drives ?? []).reduce((T, F) => T + F.distance_m, 0) / 1e3, x = o?.expense_summary, p = x?.mixed_currency ? n.mixedCurrency : x?.total_minor !== void 0 && x.currency ? Pt(x.total_minor, x.currency, this.hass) : Pt(0, "EUR", this.hass), y = (T) => _`<camper-travel-journal-manager-card .hass=${this.hass} .config=${{ vehicle_id: this.vehicleId, trip_id: r.id, journal_section: T }}></camper-travel-journal-manager-card>`, P = _`<camper-travel-journal-map-card .hass=${this.hass} .config=${{ vehicle_id: this.vehicleId, trip_id: r.id }}></camper-travel-journal-map-card>`, b = o?.interruptions ?? [], z = (o?.drives ?? []).flatMap((T) => {
      const F = b.find((M) => M.previous_drive_id === T.id);
      return [_`<article class="drive-item"><strong>${n.drive ?? "Fahrt"}</strong><span>${K(T.started_at, this.hass)} → ${T.ended_at ? K(T.ended_at, this.hass) : n.notAvailable ?? "Nicht verfügbar"}</span><span>${(T.distance_m / 1e3).toFixed(1)} km · ${T.duration_seconds ? Ct(T.duration_seconds, this.hass) : "–"} · ${T.source === "gpx" ? n.sourceGpx ?? "GPX-importiert" : T.source === "manual" ? n.sourceManual : n.sourceGps}</span></article>`, ...F ? [_`<article class="interruption-item"><strong>${F.status === "pause" ? n.drivePause ?? "Fahrtpause" : F.status === "ignored" ? n.interruptionIgnored ?? "Ignoriert" : F.existing_place_id ? n.assignedStay ?? "Aufenthalt" : n.interruptionUnassigned ?? "Nicht zugeordnet"}</strong><span>${K(F.started_at, this.hass)} → ${K(F.ended_at, this.hass)} · ${Ct(F.duration_seconds, this.hass)}</span><button type="button" class="compact-action" @click=${() => this.openInterruptionDialog(F)}>${n.assignStay ?? "Aufenthalt zuordnen"}</button></article>`] : []];
    });
    return _`<header class="trip-header"><div><p class="eyebrow">${n.journalOpenTrip ?? "Geöffnete Reise"}</p><h2>${r.title}</h2><p class="muted">${r.destination || n.noDestination} · ${At(r, this.hass)} · ${se(r.status, this.hass)}${this.vehicleName ? ` · ${this.vehicleName}` : ""}</p></div><button type="button" class="secondary" @click=${() => this.closeTrip()}>${n.journalClose ?? "Reise schließen / wechseln"}</button></header>
      ${this.section(n.journalOverview ?? "Reiseübersicht", "▣", void 0, _`<div class="metric-grid"><div><span>${n.distance}</span><strong>${m.toFixed(1)} km</strong></div><div><span>${n.drives}</span><strong>${o?.drives.length ?? 0}</strong></div><div><span>${n.stops}</span><strong>${h.filter((T) => !Xi.has(T.place_kind || T.place_type || T.stop_type)).length}</strong></div><div><span>${n.overnights ?? "Übernachtungsplätze"}</span><strong>${u.length}</strong></div><div><span>${n.costs}</span><strong>${p}</strong></div></div>`, !0)}
      ${this.section(n.journalDrives ?? "Fahrten und Unterbrechungen", "↔", (o?.drives.length ?? 0) + b.length, _`${z.length ? z : _`<p class="muted">${n.noDrives ?? "Keine Fahrten erfasst."}</p>`}`)}
      ${this.section(n.places ?? "Zwischenstopps", "●", h.filter((T) => !Xi.has(T.place_kind || T.place_type || T.stop_type)).length, _`<p class="muted">${n.journalStopsHint ?? "Bestätigte Zwischenstopps dieser Reise."}</p>${y("places")}`)}
      ${this.section(n.overnights ?? "Übernachtungsplätze", "⌂", u.length, _`<p class="muted">${n.journalOvernightHint ?? "Übernachtungsplätze und ihre Bewertungen werden im Ortsbereich verwaltet."}</p>`)}
      ${this.section(n.expenses, "€", o?.expenses?.length ?? 0, _`${y("expenses")}`)}
      ${this.section(n.mapTitle ?? "Reisekarte", "⌖", void 0, P)}
      ${this.section(n.gpxImport, "⇧", void 0, _`${y("gpx")}`)}
      ${this.section(n.pdfExportTitle, "▤", void 0, _`${y("pdf")}`)}
      ${this.error ? _`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading ? _`<p class="muted" role="status">${n.loading}</p>` : ""}
      <dialog class="interruption-dialog" @cancel=${(T) => {
      T.preventDefault(), this.closeInterruptionDialog();
    }}><form method="dialog" @submit=${(T) => {
      T.preventDefault(), this.saveInterruption();
    }}><h3>${n.assignStay ?? "Aufenthalt zuordnen"}</h3><p class="muted">${this.interruptionDialog ? `${K(this.interruptionDialog.started_at, this.hass)} → ${K(this.interruptionDialog.ended_at, this.hass)}` : ""}</p><label>${n.interruptionAction ?? "Aktion"}<select .value=${this.interruptionAction} @change=${(T) => {
      this.interruptionAction = T.currentTarget.value, this.requestUpdate();
    }}><option value="stop">${n.assignStop ?? "Zwischenstopp zuordnen"}</option><option value="overnight">${n.assignOvernight ?? "Übernachtungsplatz zuordnen"}</option><option value="pause">${n.drivePause ?? "Als Fahrtpause kennzeichnen"}</option><option value="ignored">${n.interruptionIgnored ?? "Als nicht relevant markieren"}</option></select></label>${this.interruptionAction === "stop" || this.interruptionAction === "overnight" ? _`<label>${n.existingPlace ?? "Bestehender Ort"}<select .value=${this.interruptionPlaceId} @change=${(T) => {
      this.interruptionPlaceId = T.currentTarget.value, this.requestUpdate();
    }}><option value="">${n.createNewPlace ?? "Neuen Eintrag erstellen …"}</option>${h.map((T) => _`<option value=${T.id}>${T.name}</option>`)}</select></label>${this.interruptionPlaceId ? "" : _`<input aria-label=${n.placeName} placeholder=${n.placeName} .value=${this.interruptionName} @input=${(T) => this.interruptionName = T.currentTarget.value} required><select aria-label=${n.placeCategory} .value=${this.interruptionType} @change=${(T) => this.interruptionType = T.currentTarget.value}><option value="other">${n.placeOther}</option><option value="rv_site">${n.placeRvSite}</option><option value="parking">${n.placeParking ?? "Raststätte / Parkplatz"}</option></select><input aria-label=${n.placeAddress} placeholder=${n.placeAddress} .value=${this.interruptionAddress} @input=${(T) => this.interruptionAddress = T.currentTarget.value}><textarea aria-label=${n.placeDescription} placeholder=${n.placeDescription} .value=${this.interruptionDescription} @input=${(T) => this.interruptionDescription = T.currentTarget.value}></textarea>`}` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeInterruptionDialog()}>${n.cancel}</button><button type="submit" ?disabled=${this.interruptionSaving}>${this.interruptionSaving ? n.saving : n.save}</button></div></form></dialog>`;
  }
  vehicleName = "";
  render() {
    const n = $(this.hass), r = this.trip();
    return _`<ha-card><h1>${n.title}</h1>${r ? this.renderOpenTrip(n, r) : this.renderPicker(n)}${this.error && !r ? _`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading && !r ? _`<p class="muted" role="status">${n.loading}</p>` : ""}</ha-card>`;
  }
}
er.styles = [zt.styles, Mt`
  :host { min-width: 0; } ha-card { padding: 0; overflow: hidden; } h1 { margin: 0; padding: 18px 18px 12px; font-size: 1.35rem; } h2 { margin: 0; } .entry, .trip-header { padding: 18px; } .entry { text-align: center; } .entry-icon { font-size: 2.4rem; } .entry h2 { margin: 8px 0; } .picker-label { display: grid; gap: 6px; text-align: left; margin: 18px 0 0; } select, input, textarea { box-sizing: border-box; min-width: 0; width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; } .trip-header { display: flex; justify-content: space-between; gap: 14px; align-items: start; border-block: 1px solid var(--divider-color); background: var(--secondary-background-color); } .eyebrow { margin: 0 0 4px; color: var(--secondary-text-color); font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; } .muted { color: var(--secondary-text-color); } .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(9rem,1fr)); gap: 10px; align-items: end; } .form-grid label { display: grid; gap: 5px; text-align: left; } .new-trip { margin-top: 16px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 10px; text-align: left; } .journal-section { border-bottom: 1px solid var(--divider-color); } .journal-section details { padding: 0 18px; } .journal-section summary { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; list-style: none; } .journal-section summary::-webkit-details-marker { display:none; } .section-title { display: flex; gap: 9px; align-items: center; } .section-title span { color: var(--primary-color); width: 1.2em; text-align: center; } .count { color: var(--secondary-text-color); } .section-content { padding: 0 0 16px; min-width: 0; } .metric-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(7rem,1fr)); gap: 8px; } .metric-grid > div { padding: 10px; border-radius: 9px; background: var(--secondary-background-color); } .metric-grid span, .metric-grid strong { display: block; } .metric-grid span { color: var(--secondary-text-color); font-size: .78rem; } .metric-grid strong { margin-top: 3px; } .drive-item, .interruption-item { display: grid; gap: 3px; padding: 10px; margin-bottom: 7px; border-radius: 8px; background: var(--secondary-background-color); } .interruption-item { border-inline-start: 4px solid var(--warning-color, #f57c00); } camper-travel-journal-manager-card, camper-travel-journal-map-card { display: block; min-width: 0; } button:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; } @media (max-width: 600px) { h1 { padding: 14px; } .entry, .trip-header { padding: 14px; } .trip-header { flex-direction: column; } .trip-header button { width: 100%; } .journal-section details { padding-inline: 14px; } .form-grid { grid-template-columns: 1fr; } .metric-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
  .compact-action { justify-self: start; padding: 5px 8px; font-size: .85em; }
  dialog { max-width: min(32rem, calc(100vw - 2rem)); width: calc(100% - 2rem); border: 0; border-radius: 12px; padding: 0; color: var(--primary-text-color); background: var(--card-background-color); }
  dialog::backdrop { background: rgb(0 0 0 / .48); }
  dialog form { display: grid; gap: 12px; padding: 18px; }
  dialog label { display: grid; gap: 5px; }
  dialog textarea { min-height: 4rem; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
`];
ni("camper-travel-journal-journal-card", er);
function Oo(c, n) {
  return c.vehicle_id || n.length !== 1 ? c : { ...c, vehicle_id: n[0].vehicle_id };
}
function No(c, n) {
  return c.type === n.type && c.vehicle_id === n.vehicle_id;
}
class Ro extends Ht {
  static styles = Mt`
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
  set hass(n) {
    const r = this._hass?.connection !== n?.connection;
    this._hass = n, r && n && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(n) {
    No(this._config, n) || (this._config = { ...n }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const n = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await si(n), this.loadedConnection = n.connection;
        const r = Oo(this._config, this.vehicles);
        r.vehicle_id !== this._config.vehicle_id && (this._config = r, this.fireConfigChanged());
      } catch {
        this.error = $(n).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(n) {
    const r = n.target.value;
    this._config = { ...this._config, vehicle_id: r }, this.fireConfigChanged();
  }
  render() {
    const n = $(this._hass);
    return _`
      <div class="field">
        <label for="vehicle">${n.editorVehicle}</label>
        ${this.loading ? _`<span class="muted">${n.editorLoading}</span>` : _`
          <select id="vehicle" aria-label=${n.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${n.editorChooseVehicle}</option>
            ${this.vehicles.map((r) => _`<option value=${r.vehicle_id} ?selected=${r.vehicle_id === this._config.vehicle_id}>${r.name || r.title}</option>`)}
          </select>
        `}
        ${this.error ? _`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? _`<span class="error" role="alert">${n.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Ro);
const Bo = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-map-card", name: "Camper Travel Journal – GPS-Karte", description: "Zeigt gespeicherte GPS-Fahrten nach Reise und Fahrtabschnitt.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-journal-card", name: "Camper Travel Journal – Journal", description: "Zentraler Einstieg: Reise öffnen und alle Funktionen in einem Reisebereich nutzen.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const c of Bo) window.customCards.some((n) => n.type === c.type) || window.customCards.push(c);
