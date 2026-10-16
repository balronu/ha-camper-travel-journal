const Fe = globalThis, Yi = Fe.ShadowRoot && (Fe.ShadyCSS === void 0 || Fe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xi = /* @__PURE__ */ Symbol(), vs = /* @__PURE__ */ new WeakMap();
let Is = class {
  constructor(s, r, h) {
    if (this._$cssResult$ = !0, h !== Xi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = r;
  }
  get styleSheet() {
    let s = this.o;
    const r = this.t;
    if (Yi && s === void 0) {
      const h = r !== void 0 && r.length === 1;
      h && (s = vs.get(r)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), h && vs.set(r, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
};
const zs = (u) => new Is(typeof u == "string" ? u : u + "", void 0, Xi), Zt = (u, ...s) => {
  const r = u.length === 1 ? u[0] : s.reduce((h, c, m) => h + ((g) => {
    if (g._$cssResult$ === !0) return g.cssText;
    if (typeof g == "number") return g;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + g + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(c) + u[m + 1], u[0]);
  return new Is(r, u, Xi);
}, gr = (u, s) => {
  if (Yi) u.adoptedStyleSheets = s.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of s) {
    const h = document.createElement("style"), c = Fe.litNonce;
    c !== void 0 && h.setAttribute("nonce", c), h.textContent = r.cssText, u.appendChild(h);
  }
}, ys = Yi ? (u) => u : (u) => u instanceof CSSStyleSheet ? ((s) => {
  let r = "";
  for (const h of s.cssRules) r += h.cssText;
  return zs(r);
})(u) : u;
const { is: vr, defineProperty: yr, getOwnPropertyDescriptor: xr, getOwnPropertyNames: br, getOwnPropertySymbols: wr, getPrototypeOf: Pr } = Object, je = globalThis, xs = je.trustedTypes, Tr = xs ? xs.emptyScript : "", Lr = je.reactiveElementPolyfillSupport, me = (u, s) => u, Gi = { toAttribute(u, s) {
  switch (s) {
    case Boolean:
      u = u ? Tr : null;
      break;
    case Object:
    case Array:
      u = u == null ? u : JSON.stringify(u);
  }
  return u;
}, fromAttribute(u, s) {
  let r = u;
  switch (s) {
    case Boolean:
      r = u !== null;
      break;
    case Number:
      r = u === null ? null : Number(u);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(u);
      } catch {
        r = null;
      }
  }
  return r;
} }, Ds = (u, s) => !vr(u, s), bs = { attribute: !0, type: String, converter: Gi, reflect: !1, useDefault: !1, hasChanged: Ds };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), je.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let jt = class extends HTMLElement {
  static addInitializer(s) {
    this._$Ei(), (this.l ??= []).push(s);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(s, r = bs) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(s) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(s, r), !r.noAccessor) {
      const h = /* @__PURE__ */ Symbol(), c = this.getPropertyDescriptor(s, h, r);
      c !== void 0 && yr(this.prototype, s, c);
    }
  }
  static getPropertyDescriptor(s, r, h) {
    const { get: c, set: m } = xr(this.prototype, s) ?? { get() {
      return this[r];
    }, set(g) {
      this[r] = g;
    } };
    return { get: c, set(g) {
      const b = c?.call(this);
      m?.call(this, g), this.requestUpdate(s, b, h);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(s) {
    return this.elementProperties.get(s) ?? bs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(me("elementProperties"))) return;
    const s = Pr(this);
    s.finalize(), s.l !== void 0 && (this.l = [...s.l]), this.elementProperties = new Map(s.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(me("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(me("properties"))) {
      const r = this.properties, h = [...br(r), ...wr(r)];
      for (const c of h) this.createProperty(c, r[c]);
    }
    const s = this[Symbol.metadata];
    if (s !== null) {
      const r = litPropertyMetadata.get(s);
      if (r !== void 0) for (const [h, c] of r) this.elementProperties.set(h, c);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, h] of this.elementProperties) {
      const c = this._$Eu(r, h);
      c !== void 0 && this._$Eh.set(c, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s) {
    const r = [];
    if (Array.isArray(s)) {
      const h = new Set(s.flat(1 / 0).reverse());
      for (const c of h) r.unshift(ys(c));
    } else s !== void 0 && r.push(ys(s));
    return r;
  }
  static _$Eu(s, r) {
    const h = r.attribute;
    return h === !1 ? void 0 : typeof h == "string" ? h : typeof s == "string" ? s.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((s) => this.enableUpdating = s), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((s) => s(this));
  }
  addController(s) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(s), this.renderRoot !== void 0 && this.isConnected && s.hostConnected?.();
  }
  removeController(s) {
    this._$EO?.delete(s);
  }
  _$E_() {
    const s = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const h of r.keys()) this.hasOwnProperty(h) && (s.set(h, this[h]), delete this[h]);
    s.size > 0 && (this._$Ep = s);
  }
  createRenderRoot() {
    const s = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return gr(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((s) => s.hostConnected?.());
  }
  enableUpdating(s) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((s) => s.hostDisconnected?.());
  }
  attributeChangedCallback(s, r, h) {
    this._$AK(s, h);
  }
  _$ET(s, r) {
    const h = this.constructor.elementProperties.get(s), c = this.constructor._$Eu(s, h);
    if (c !== void 0 && h.reflect === !0) {
      const m = (h.converter?.toAttribute !== void 0 ? h.converter : Gi).toAttribute(r, h.type);
      this._$Em = s, m == null ? this.removeAttribute(c) : this.setAttribute(c, m), this._$Em = null;
    }
  }
  _$AK(s, r) {
    const h = this.constructor, c = h._$Eh.get(s);
    if (c !== void 0 && this._$Em !== c) {
      const m = h.getPropertyOptions(c), g = typeof m.converter == "function" ? { fromAttribute: m.converter } : m.converter?.fromAttribute !== void 0 ? m.converter : Gi;
      this._$Em = c;
      const b = g.fromAttribute(r, m.type);
      this[c] = b ?? this._$Ej?.get(c) ?? b, this._$Em = null;
    }
  }
  requestUpdate(s, r, h, c = !1, m) {
    if (s !== void 0) {
      const g = this.constructor;
      if (c === !1 && (m = this[s]), h ??= g.getPropertyOptions(s), !((h.hasChanged ?? Ds)(m, r) || h.useDefault && h.reflect && m === this._$Ej?.get(s) && !this.hasAttribute(g._$Eu(s, h)))) return;
      this.C(s, r, h);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(s, r, { useDefault: h, reflect: c, wrapped: m }, g) {
    h && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(s) && (this._$Ej.set(s, g ?? r ?? this[s]), m !== !0 || g !== void 0) || (this._$AL.has(s) || (this.hasUpdated || h || (r = void 0), this._$AL.set(s, r)), c === !0 && this._$Em !== s && (this._$Eq ??= /* @__PURE__ */ new Set()).add(s));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const s = this.scheduleUpdate();
    return s != null && await s, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [c, m] of this._$Ep) this[c] = m;
        this._$Ep = void 0;
      }
      const h = this.constructor.elementProperties;
      if (h.size > 0) for (const [c, m] of h) {
        const { wrapped: g } = m, b = this[c];
        g !== !0 || this._$AL.has(c) || b === void 0 || this.C(c, void 0, m, b);
      }
    }
    let s = !1;
    const r = this._$AL;
    try {
      s = this.shouldUpdate(r), s ? (this.willUpdate(r), this._$EO?.forEach((h) => h.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (h) {
      throw s = !1, this._$EM(), h;
    }
    s && this._$AE(r);
  }
  willUpdate(s) {
  }
  _$AE(s) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(s)), this.updated(s);
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
  shouldUpdate(s) {
    return !0;
  }
  update(s) {
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(s) {
  }
  firstUpdated(s) {
  }
};
jt.elementStyles = [], jt.shadowRootOptions = { mode: "open" }, jt[me("elementProperties")] = /* @__PURE__ */ new Map(), jt[me("finalized")] = /* @__PURE__ */ new Map(), Lr?.({ ReactiveElement: jt }), (je.reactiveElementVersions ??= []).push("2.1.2");
const Ji = globalThis, ws = (u) => u, We = Ji.trustedTypes, Ps = We ? We.createPolicy("lit-html", { createHTML: (u) => u }) : void 0, Os = "$lit$", St = `lit$${Math.random().toFixed(9).slice(2)}$`, Zs = "?" + St, Er = `<${Zs}>`, Ot = document, ge = () => Ot.createComment(""), ve = (u) => u === null || typeof u != "object" && typeof u != "function", Qi = Array.isArray, Sr = (u) => Qi(u) || typeof u?.[Symbol.iterator] == "function", zi = `[ 	
\f\r]`, pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ts = /-->/g, Ls = />/g, It = RegExp(`>|${zi}(?:([^\\s"'>=/]+)(${zi}*=${zi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Es = /'/g, Ss = /"/g, Bs = /^(?:script|style|textarea|title)$/i, Cr = (u) => (s, ...r) => ({ _$litType$: u, strings: s, values: r }), y = Cr(1), Kt = /* @__PURE__ */ Symbol.for("lit-noChange"), V = /* @__PURE__ */ Symbol.for("lit-nothing"), Cs = /* @__PURE__ */ new WeakMap(), zt = Ot.createTreeWalker(Ot, 129);
function Rs(u, s) {
  if (!Qi(u) || !u.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ps !== void 0 ? Ps.createHTML(s) : s;
}
const kr = (u, s) => {
  const r = u.length - 1, h = [];
  let c, m = s === 2 ? "<svg>" : s === 3 ? "<math>" : "", g = pe;
  for (let b = 0; b < r; b++) {
    const f = u[b];
    let v, D, P = -1, R = 0;
    for (; R < f.length && (g.lastIndex = R, D = g.exec(f), D !== null); ) R = g.lastIndex, g === pe ? D[1] === "!--" ? g = Ts : D[1] !== void 0 ? g = Ls : D[2] !== void 0 ? (Bs.test(D[2]) && (c = RegExp("</" + D[2], "g")), g = It) : D[3] !== void 0 && (g = It) : g === It ? D[0] === ">" ? (g = c ?? pe, P = -1) : D[1] === void 0 ? P = -2 : (P = g.lastIndex - D[2].length, v = D[1], g = D[3] === void 0 ? It : D[3] === '"' ? Ss : Es) : g === Ss || g === Es ? g = It : g === Ts || g === Ls ? g = pe : (g = It, c = void 0);
    const j = g === It && u[b + 1].startsWith("/>") ? " " : "";
    m += g === pe ? f + Er : P >= 0 ? (h.push(v), f.slice(0, P) + Os + f.slice(P) + St + j) : f + St + (P === -2 ? b : j);
  }
  return [Rs(u, m + (u[r] || "<?>") + (s === 2 ? "</svg>" : s === 3 ? "</math>" : "")), h];
};
class ye {
  constructor({ strings: s, _$litType$: r }, h) {
    let c;
    this.parts = [];
    let m = 0, g = 0;
    const b = s.length - 1, f = this.parts, [v, D] = kr(s, r);
    if (this.el = ye.createElement(v, h), zt.currentNode = this.el.content, r === 2 || r === 3) {
      const P = this.el.content.firstChild;
      P.replaceWith(...P.childNodes);
    }
    for (; (c = zt.nextNode()) !== null && f.length < b; ) {
      if (c.nodeType === 1) {
        if (c.hasAttributes()) for (const P of c.getAttributeNames()) if (P.endsWith(Os)) {
          const R = D[g++], j = c.getAttribute(P).split(St), Y = /([.?@])?(.*)/.exec(R);
          f.push({ type: 1, index: m, name: Y[2], strings: j, ctor: Y[1] === "." ? Ar : Y[1] === "?" ? Mr : Y[1] === "@" ? Ir : Ke }), c.removeAttribute(P);
        } else P.startsWith(St) && (f.push({ type: 6, index: m }), c.removeAttribute(P));
        if (Bs.test(c.tagName)) {
          const P = c.textContent.split(St), R = P.length - 1;
          if (R > 0) {
            c.textContent = We ? We.emptyScript : "";
            for (let j = 0; j < R; j++) c.append(P[j], ge()), zt.nextNode(), f.push({ type: 2, index: ++m });
            c.append(P[R], ge());
          }
        }
      } else if (c.nodeType === 8) if (c.data === Zs) f.push({ type: 2, index: m });
      else {
        let P = -1;
        for (; (P = c.data.indexOf(St, P + 1)) !== -1; ) f.push({ type: 7, index: m }), P += St.length - 1;
      }
      m++;
    }
  }
  static createElement(s, r) {
    const h = Ot.createElement("template");
    return h.innerHTML = s, h;
  }
}
function Yt(u, s, r = u, h) {
  if (s === Kt) return s;
  let c = h !== void 0 ? r._$Co?.[h] : r._$Cl;
  const m = ve(s) ? void 0 : s._$litDirective$;
  return c?.constructor !== m && (c?._$AO?.(!1), m === void 0 ? c = void 0 : (c = new m(u), c._$AT(u, r, h)), h !== void 0 ? (r._$Co ??= [])[h] = c : r._$Cl = c), c !== void 0 && (s = Yt(u, c._$AS(u, s.values), c, h)), s;
}
class $r {
  constructor(s, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = s, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(s) {
    const { el: { content: r }, parts: h } = this._$AD, c = (s?.creationScope ?? Ot).importNode(r, !0);
    zt.currentNode = c;
    let m = zt.nextNode(), g = 0, b = 0, f = h[0];
    for (; f !== void 0; ) {
      if (g === f.index) {
        let v;
        f.type === 2 ? v = new be(m, m.nextSibling, this, s) : f.type === 1 ? v = new f.ctor(m, f.name, f.strings, this, s) : f.type === 6 && (v = new zr(m, this, s)), this._$AV.push(v), f = h[++b];
      }
      g !== f?.index && (m = zt.nextNode(), g++);
    }
    return zt.currentNode = Ot, c;
  }
  p(s) {
    let r = 0;
    for (const h of this._$AV) h !== void 0 && (h.strings !== void 0 ? (h._$AI(s, h, r), r += h.strings.length - 2) : h._$AI(s[r])), r++;
  }
}
class be {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(s, r, h, c) {
    this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = s, this._$AB = r, this._$AM = h, this.options = c, this._$Cv = c?.isConnected ?? !0;
  }
  get parentNode() {
    let s = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && s?.nodeType === 11 && (s = r.parentNode), s;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(s, r = this) {
    s = Yt(this, s, r), ve(s) ? s === V || s == null || s === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : s !== this._$AH && s !== Kt && this._(s) : s._$litType$ !== void 0 ? this.$(s) : s.nodeType !== void 0 ? this.T(s) : Sr(s) ? this.k(s) : this._(s);
  }
  O(s) {
    return this._$AA.parentNode.insertBefore(s, this._$AB);
  }
  T(s) {
    this._$AH !== s && (this._$AR(), this._$AH = this.O(s));
  }
  _(s) {
    this._$AH !== V && ve(this._$AH) ? this._$AA.nextSibling.data = s : this.T(Ot.createTextNode(s)), this._$AH = s;
  }
  $(s) {
    const { values: r, _$litType$: h } = s, c = typeof h == "number" ? this._$AC(s) : (h.el === void 0 && (h.el = ye.createElement(Rs(h.h, h.h[0]), this.options)), h);
    if (this._$AH?._$AD === c) this._$AH.p(r);
    else {
      const m = new $r(c, this), g = m.u(this.options);
      m.p(r), this.T(g), this._$AH = m;
    }
  }
  _$AC(s) {
    let r = Cs.get(s.strings);
    return r === void 0 && Cs.set(s.strings, r = new ye(s)), r;
  }
  k(s) {
    Qi(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let h, c = 0;
    for (const m of s) c === r.length ? r.push(h = new be(this.O(ge()), this.O(ge()), this, this.options)) : h = r[c], h._$AI(m), c++;
    c < r.length && (this._$AR(h && h._$AB.nextSibling, c), r.length = c);
  }
  _$AR(s = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); s !== this._$AB; ) {
      const h = ws(s).nextSibling;
      ws(s).remove(), s = h;
    }
  }
  setConnected(s) {
    this._$AM === void 0 && (this._$Cv = s, this._$AP?.(s));
  }
}
class Ke {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(s, r, h, c, m) {
    this.type = 1, this._$AH = V, this._$AN = void 0, this.element = s, this.name = r, this._$AM = c, this.options = m, h.length > 2 || h[0] !== "" || h[1] !== "" ? (this._$AH = Array(h.length - 1).fill(new String()), this.strings = h) : this._$AH = V;
  }
  _$AI(s, r = this, h, c) {
    const m = this.strings;
    let g = !1;
    if (m === void 0) s = Yt(this, s, r, 0), g = !ve(s) || s !== this._$AH && s !== Kt, g && (this._$AH = s);
    else {
      const b = s;
      let f, v;
      for (s = m[0], f = 0; f < m.length - 1; f++) v = Yt(this, b[h + f], r, f), v === Kt && (v = this._$AH[f]), g ||= !ve(v) || v !== this._$AH[f], v === V ? s = V : s !== V && (s += (v ?? "") + m[f + 1]), this._$AH[f] = v;
    }
    g && !c && this.j(s);
  }
  j(s) {
    s === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, s ?? "");
  }
}
class Ar extends Ke {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(s) {
    this.element[this.name] = s === V ? void 0 : s;
  }
}
let Mr = class extends Ke {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(s) {
    this.element.toggleAttribute(this.name, !!s && s !== V);
  }
};
class Ir extends Ke {
  constructor(s, r, h, c, m) {
    super(s, r, h, c, m), this.type = 5;
  }
  _$AI(s, r = this) {
    if ((s = Yt(this, s, r, 0) ?? V) === Kt) return;
    const h = this._$AH, c = s === V && h !== V || s.capture !== h.capture || s.once !== h.once || s.passive !== h.passive, m = s !== V && (h === V || c);
    c && this.element.removeEventListener(this.name, this, h), m && this.element.addEventListener(this.name, this, s), this._$AH = s;
  }
  handleEvent(s) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, s) : this._$AH.handleEvent(s);
  }
}
class zr {
  constructor(s, r, h) {
    this.element = s, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = h;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s) {
    Yt(this, s);
  }
}
const Dr = Ji.litHtmlPolyfillSupport;
Dr?.(ye, be), (Ji.litHtmlVersions ??= []).push("3.3.3");
const Or = (u, s, r) => {
  const h = r?.renderBefore ?? s;
  let c = h._$litPart$;
  if (c === void 0) {
    const m = r?.renderBefore ?? null;
    h._$litPart$ = c = new be(s.insertBefore(ge(), m), m, void 0, r ?? {});
  }
  return c._$AI(u), c;
};
const tn = globalThis;
class Dt extends jt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const s = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= s.firstChild, s;
  }
  update(s) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(s), this._$Do = Or(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Kt;
  }
}
Dt._$litElement$ = !0, Dt.finalized = !0, tn.litElementHydrateSupport?.({ LitElement: Dt });
const Zr = tn.litElementPolyfillSupport;
Zr?.({ LitElement: Dt });
(tn.litElementVersions ??= []).push("4.2.2");
class Xt extends Dt {
  _hass;
  config = {};
  static styles = Zt`
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
  set hass(s) {
    const r = this._hass?.connection !== s?.connection;
    this._hass = s, r && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(s) {
    this.config.vehicle_id !== s.vehicle_id && (this.config = { ...s }, this.onConfigChanged(), this.requestUpdate());
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
function en(u, s) {
  customElements.get(u) || customElements.define(u, s);
}
async function X(u, s, r, h = {}) {
  return u.connection.sendMessagePromise({ type: s, vehicle_id: r, ...h });
}
const xe = (u, s, r) => X(u, "camper_travel_journal/list", s, r ? { trip_id: r } : {}), Br = (u, s, r, h, c = 5e3) => X(u, "camper_travel_journal/route", s, { trip_id: r, drive_ids: h, max_points: c }), Ns = (u, s, r, h) => X(u, "camper_travel_journal/transition_trip", s, { trip_id: r, status: h }), Rr = (u, s, r, h = "", c = "", m = "") => X(u, "camper_travel_journal/create_trip", s, { title: r, start_date: h || void 0, end_date: c || void 0, destination: m }), Nr = (u, s, r, h) => X(u, "camper_travel_journal/update_trip", s, { trip_id: r, ...h }), Ur = (u, s, r) => X(u, "camper_travel_journal/delete_trip", s, { trip_id: r }), Hr = (u, s, r, h) => X(u, "camper_travel_journal/unlink_drive", s, { trip_id: r, drive_id: h }), Fr = (u, s, r, h) => X(u, "camper_travel_journal/link_drives", s, { trip_id: r, drive_ids: h }), Wr = (u, s, r) => X(u, "camper_travel_journal/create_manual_drive", s, r), qr = (u, s, r, h) => X(u, "camper_travel_journal/update_manual_drive", s, { drive_id: r, ...h }), Gr = (u, s, r) => X(u, "camper_travel_journal/delete_manual_drive", s, { drive_id: r }), Vr = (u, s, r, h) => X(u, "camper_travel_journal/create_expense", s, { trip_id: r, ...h }), jr = (u, s, r, h) => X(u, "camper_travel_journal/update_expense", s, { expense_id: r, ...h }), Kr = (u, s, r) => X(u, "camper_travel_journal/delete_expense", s, { expense_id: r }), Yr = async (u) => (await u.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], Xr = (u, s, r) => X(u, "camper_travel_journal/analyze_gpx", s, { content_base64: r }), Jr = (u, s, r, h, c, m) => X(u, "camper_travel_journal/import_gpx", s, { content_base64: r, file_hash: h, drive_keys: c, trip_id: m }), Us = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], Di = Us, Qr = {
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
}, ta = {
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
};
function A(u) {
  return (u?.locale?.language?.toLowerCase() ?? "de").startsWith("de") ? Qr : ta;
}
function Vi(u) {
  return (u?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function Oi(u, s) {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(u);
  if (r) {
    const [, h, c, m] = r;
    return Vi(s).startsWith("de") ? `${m}.${c}.${h}` : `${c}/${m}/${h}`;
  }
  return new Date(u).toLocaleDateString(Vi(s));
}
function wt(u, s) {
  return new Date(u).toLocaleString(Vi(s), { dateStyle: "short", timeStyle: "short" });
}
function Zi(u, s) {
  const r = Math.max(0, Math.round((u ?? 0) / 60));
  return r < 60 ? `${r} min` : `${Math.floor(r / 60)} h ${r % 60} min`;
}
function qe(u, s) {
  return u.start_date || u.end_date ? [u.start_date, u.end_date].filter(Boolean).map((r) => Oi(r, s)).join(" – ") || "" : u.started_at ? `${Oi(u.started_at, s)}${u.ended_at ? ` – ${Oi(u.ended_at, s)}` : ""}` : "";
}
function Ge(u, s) {
  return A(s).statuses[u] ?? u;
}
function Bi(u, s) {
  return A(s).categories[u] ?? u;
}
function Ri(u) {
  return Us.includes(u);
}
function _e(u, s, r) {
  const h = (r?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(h, { style: "currency", currency: s, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(u / 100);
}
function ks(u) {
  const s = u.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(s)) return null;
  const [r, h = ""] = s.split("."), c = Number(r) * 100 + Number((h + "00").slice(0, 2));
  return Number.isSafeInteger(c) ? c : null;
}
const ji = "camper-travel-journal-expenses-changed", Ki = "camper-travel-journal-data-changed";
function Ni(u) {
  window.dispatchEvent(new CustomEvent(ji, { detail: u }));
}
function mt(u) {
  window.dispatchEvent(new CustomEvent(Ki, { detail: u }));
}
class Hs extends Xt {
  snapshot;
  trips = [];
  selectedTripId = "";
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (s) => {
    s.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(ji, this.onDataChanged), window.addEventListener(Ki, this.onDataChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(ji, this.onDataChanged), window.removeEventListener(Ki, this.onDataChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(s) {
    const r = (h, c) => (c.started_at || "").localeCompare(h.started_at || "") || c.id.localeCompare(h.id);
    return s.filter((h) => h.status === "active").sort(r)[0] ?? [...s].sort(r)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const s = await xe(this.hass, this.vehicleId);
      this.trips = s.trips;
      const h = s.trips.find((m) => m.id === this.selectedTripId) ?? this.chooseDefaultTrip(s.trips);
      this.selectedTripId = h?.id ?? "";
      const c = h ? await xe(this.hass, this.vehicleId, h.id) : s;
      return this.snapshot = h ? { ...c, trips: [h] } : c, this.loadError = "", !0;
    } catch {
      return this.loadError = A(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(s) {
    const r = this.snapshot?.trips[0];
    if (!(!this.hass || !r))
      try {
        await Ns(this.hass, this.vehicleId, r.id, s), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = A(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(s) {
    !this.hass || this.loading || !this.trips.some((r) => r.id === s) || (this.selectedTripId = s, await this.refresh());
  }
  render() {
    const s = A(this.hass), r = this.snapshot?.trips[0], h = this.trips, c = (this.snapshot?.drives ?? []).reduce((v, D) => v + D.distance_m, 0) / 1e3, m = this.snapshot?.expense_summary, g = m?.mixed_currency ? s.mixedCurrency : m?.total_minor !== void 0 && m.currency ? _e(m.total_minor, m.currency, this.hass) : _e(0, "EUR", this.hass), b = this.loadError || this.actionError, f = r ? qe(r, this.hass) : "";
    return y`<ha-card><h2>${r?.title ?? s.title}</h2>${h.length ? y`<label class="trip-selector">${s.summaryChooseTrip}<select aria-label=${s.summaryTrip} @change=${(v) => {
      this.selectTrip(v.currentTarget.value);
    }} ?disabled=${this.loading}>${h.map((v) => y`<option value=${v.id} ?selected=${v.id === this.selectedTripId}>${v.title} · ${Ge(v.status, this.hass)} · ${qe(v, this.hass)}</option>`)}</select></label>` : ""}${b ? y`<p class="error" role="alert">${b}</p>` : r ? y`<p class="muted">${r.destination || s.noDestination} · ${Ge(r.status, this.hass)} · ${f}</p><div class="grid"><div class="metric"><span class="muted">${s.distance}</span><span class="value">${c.toFixed(1)} km</span></div><div class="metric"><span class="muted">${s.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${s.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${s.costs}</span><span class="value">${g}</span></div></div><div class="actions">${r.status === "planned" ? y`<button @click=${() => this.setStatus("active")}>${s.start}</button>` : r.status === "paused" ? y`<button @click=${() => this.setStatus("active")}>${s.resume}</button>` : ""}${r.status === "active" ? y`<button class="secondary" @click=${() => this.setStatus("paused")}>${s.pause}</button><button @click=${() => this.setStatus("completed")}>${s.complete}</button>` : ""}</div>` : y`<p class="muted">${s.noTrip}</p>`}${this.loading ? y`<p class="muted">${s.loading}</p>` : ""}</ha-card>`;
  }
}
Hs.styles = [Xt.styles, Zt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}`];
en("camper-travel-journal-summary-card", Hs);
class Ve extends Xt {
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
  category = Di[0];
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
      return this.snapshot = await xe(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = A(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(s) {
    this.actionError = s, this.requestUpdate();
  }
  async readGPX(s) {
    const r = s.currentTarget.files?.[0];
    if (!(!r || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = r.name;
      try {
        const h = new Uint8Array(await r.arrayBuffer());
        let c = "";
        h.forEach((m) => {
          c += String.fromCharCode(m);
        }), this.gpxContent = btoa(c), this.gpxPreview = await Xr(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((m) => m.key)), this.gpxTripId = this.selected;
      } catch {
        this.gpxError = A(this.hass).gpxAnalyzeError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  async confirmGPX() {
    if (!(!this.hass || !this.gpxPreview || this.gpxBusy || this.gpxPreview.conflicts.duplicate_file)) {
      this.gpxBusy = !0, this.gpxError = "";
      try {
        const s = this.gpxTripId || void 0;
        await Jr(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], s), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s ?? "" });
      } catch {
        this.gpxError = A(this.hass).gpxImportError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  setExpenseAmount(s) {
    this.amount = s, this.requestUpdate();
  }
  setEditingExpenseAmount(s) {
    this.editingAmount = s, this.requestUpdate();
  }
  setExpenseCategory(s) {
    if (!Ri(s)) return this.fail(A(this.hass).categoryInvalid);
    this.category = s, this.requestUpdate();
  }
  setEditingExpenseCategory(s) {
    if (!Ri(s)) return this.fail(A(this.hass).categoryInvalid);
    this.editingCategory = s, this.requestUpdate();
  }
  gpxPeriod() {
    const s = (this.gpxPreview?.points ?? []).map((r) => r.recorded_at).sort();
    return s.length ? { start: s[0], end: s[s.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((s) => this.gpxSelected.has(s.key)).reduce((s, r) => s + r.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(s) {
    const r = this.gpxPeriod();
    if (!r || !s || !s.start_date && !s.end_date) return !1;
    const h = r.start.slice(0, 10), c = r.end.slice(0, 10);
    return !!(s.start_date && h < s.start_date || s.end_date && c > s.end_date);
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(A(this.hass).dateInvalid);
      try {
        await Rr(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(A(this.hass).tripCreateError);
      }
    }
  }
  startTripEdit(s) {
    this.actionError = "", this.editingTripId = s.id, this.editingTripTitle = s.title, this.editingDestination = s.destination || "", this.editingStartDate = s.start_date || "", this.editingEndDate = s.end_date || "", this.requestUpdate();
  }
  cancelTripEdit() {
    this.editingTripId = "", this.actionError = "", this.requestUpdate();
  }
  async saveTrip(s) {
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail(A(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(A(this.hass).dateInvalid);
    try {
      await Nr(this.hass, this.vehicleId, s.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s.id });
    } catch {
      this.fail(A(this.hass).tripEditError);
    }
  }
  async removeTrip(s) {
    if (this.hass) {
      if (this.confirmingTripId !== s) {
        this.confirmingTripId = s, this.requestUpdate();
        return;
      }
      try {
        await Ur(this.hass, this.vehicleId, s), this.confirmingTripId = "", this.selected === s && (this.selected = ""), await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(A(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(s, r) {
    if (this.hass)
      try {
        await Ns(this.hass, this.vehicleId, s, r), this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(A(this.hass).statusError);
      }
  }
  async assignDrive(s, r) {
    if (this.hass)
      try {
        await Fr(this.hass, this.vehicleId, s, [r]), this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(A(this.hass).driveAssignError);
      }
  }
  async unassignDrive(s, r) {
    if (this.hass)
      try {
        await Hr(this.hass, this.vehicleId, s, r), this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(A(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(s) {
    this.selected = this.selected === s ? "" : s, this.selected ? this.refresh() : this.requestUpdate();
  }
  async addManualDrive(s) {
    if (!this.hass || this.manualSaving) return;
    const r = Number(this.manualDistanceKm.replace(",", ".")), h = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(r) || r < 0 || h !== void 0 && (!Number.isInteger(h) || h < 0)) return this.fail(A(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await Wr(this.hass, this.vehicleId, { trip_id: s, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: r, ...h === void 0 ? {} : { duration_minutes: h } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
    } catch {
      this.fail(A(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(s) {
    const r = new Date(s), h = (c) => String(c).padStart(2, "0");
    return `${r.getFullYear()}-${h(r.getMonth() + 1)}-${h(r.getDate())}T${h(r.getHours())}:${h(r.getMinutes())}`;
  }
  startManualDriveEdit(s) {
    this.actionError = "", this.editingDriveId = s.id, this.editingDriveOccurredAt = this.localDateTime(s.started_at), this.editingDriveStartLocation = s.start_label || "", this.editingDriveEndLocation = s.end_label || "", this.editingDriveDistanceKm = (s.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = s.duration_seconds ? String(Math.round(s.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(s, r) {
    if (!this.hass || this.driveSavingId) return;
    const h = Number(this.editingDriveDistanceKm.replace(",", ".")), c = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(h) || h < 0 || c !== void 0 && (!Number.isInteger(c) || c < 0)) return this.fail(A(this.hass).dateInvalid);
    this.driveSavingId = s.id;
    try {
      await qr(this.hass, this.vehicleId, s.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: h, ...c === void 0 ? {} : { duration_minutes: c } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: r });
    } catch {
      this.fail(A(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(s, r) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== r) {
        this.confirmingDriveId = r, this.requestUpdate();
        return;
      }
      this.driveSavingId = r;
      try {
        await Gr(this.hass, this.vehicleId, r), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(A(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(s) {
    if (!this.hass) return;
    const r = A(this.hass), h = ks(this.amount);
    if (h === null) return this.fail(r.amountInvalid);
    try {
      await Vr(this.hass, this.vehicleId, s, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: h, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", Ni({ vehicleId: this.vehicleId, tripId: s }));
    } catch {
      this.fail(r.expenseCreateError);
    }
  }
  startExpenseEdit(s) {
    this.actionError = "", this.editingExpenseId = s.id, this.editingAmount = (s.amount_minor / 100).toFixed(2), this.editingCategory = s.category, this.requestUpdate();
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.actionError = "", this.requestUpdate();
  }
  async saveExpense(s) {
    if (!this.hass || this.expenseSavingId) return;
    const r = A(this.hass), h = ks(this.editingAmount);
    if (h === null) return this.fail(r.amountInvalid);
    if (!Ri(this.editingCategory)) return this.fail(r.categoryInvalid);
    this.expenseSavingId = s.id;
    try {
      await jr(this.hass, this.vehicleId, s.id, { amount_minor: h, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), Ni({ vehicleId: this.vehicleId, tripId: s.trip_id ?? this.selected }));
    } catch {
      this.fail(r.expenseEditError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  async removeExpense(s) {
    if (!(!this.hass || this.expenseSavingId)) {
      if (this.confirmingExpenseId !== s) {
        this.confirmingExpenseId = s, this.requestUpdate();
        return;
      }
      this.expenseSavingId = s;
      try {
        await Kr(this.hass, this.vehicleId, s), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && Ni({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(A(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(s) {
    const r = [...Di];
    return s && !r.includes(s) && r.unshift(s), r;
  }
  renderExpense(s, r) {
    const h = this.editingExpenseId === s.id, c = this.expenseSavingId === s.id;
    return y`<div class="expense-row">${h ? y`<form class="expense-form" @submit=${(m) => {
      m.preventDefault(), this.saveExpense(s);
    }}><select aria-label=${r.category} .value=${this.editingCategory} @change=${(m) => this.setEditingExpenseCategory(m.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((m) => y`<option value=${m}>${Bi(m, this.hass)}</option>`)}</select><input aria-label=${r.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(m) => this.setEditingExpenseAmount(m.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${c}>${c ? r.saving : r.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${c}>${r.cancel}</button></div></form>` : y`<span>${Bi(s.category, this.hass)}: ${_e(s.amount_minor, s.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(s)} ?disabled=${!!this.expenseSavingId}>${r.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(s.id)}>${this.confirmingExpenseId === s.id ? r.confirmDelete : r.remove}</button></span>`}</div>`;
  }
  renderDrive(s, r, h) {
    const c = s.source === "manual" ? h.sourceManual : h.sourceGps, m = s.source === "manual" ? `${s.start_label || "—"} → ${s.end_label || "—"}` : `${h.driveStart}: ${wt(s.started_at, this.hass)} · ${h.driveEnd}: ${wt(s.ended_at, this.hass)}`;
    if (this.editingDriveId === s.id) return y`<form class="form-grid drive-edit-form" @submit=${(f) => {
      f.preventDefault(), this.saveManualDrive(s, r);
    }}><label>${h.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(f) => this.editingDriveOccurredAt = f.currentTarget.value}></label><input aria-label=${h.startLocation} .value=${this.editingDriveStartLocation} @input=${(f) => this.editingDriveStartLocation = f.currentTarget.value}><input aria-label=${h.endLocation} .value=${this.editingDriveEndLocation} @input=${(f) => this.editingDriveEndLocation = f.currentTarget.value}><input aria-label=${h.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(f) => this.editingDriveDistanceKm = f.currentTarget.value}><input aria-label=${h.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(f) => this.editingDriveDurationMinutes = f.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === s.id}>${this.driveSavingId === s.id ? h.saving : h.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${h.cancel}</button></form>`;
    const g = s.trip_id === r ? y`<button type="button" class="link" @click=${() => this.unassignDrive(r, s.id)}>${h.unassign}</button>` : y`<button type="button" class="link" @click=${() => this.assignDrive(r, s.id)}>${h.assign}</button>`, b = s.source === "manual" ? y`<button type="button" class="link" @click=${() => this.startManualDriveEdit(s)} ?disabled=${!!this.driveSavingId}>${h.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(r, s.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === s.id ? h.confirmDelete : h.remove}</button>` : "";
    return y`<div class="drive-row"><div><strong>${c}</strong> · ${m}<br><span class="muted">${(s.distance_m / 1e3).toFixed(1)} km · ${Zi(s.duration_seconds, this.hass)} · ${s.assignment_status === "assigned" ? h.assignedDrives : h.freeDrives}</span></div><span class="actions">${b}${g}</span></div>`;
  }
  renderGpx(s, r, h) {
    const c = r.find((b) => b.id === this.gpxTripId), m = this.gpxPeriod(), g = this.gpxTripPeriodWarning(c);
    return y`<ha-card><section class="gpx-import gpx-explicit"><h2>${s.gpxImport}</h2><p class="muted"><strong>${s.gpxVehicle}:</strong> ${this.vehicleId} (${s.gpxVehicleFixed})</p><label>${s.gpxTargetTrip}<select aria-label=${s.gpxTargetTrip} .value=${this.gpxTripId} @change=${(b) => {
      this.gpxTripId = b.currentTarget.value, this.requestUpdate();
    }}><option value="">${s.gpxNoTrip}</option>${r.map((b) => y`<option value=${b.id}>${b.title} · ${Ge(b.status, this.hass)} · ${qe(b, this.hass) || s.period}</option>`)}</select></label><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(b) => this.readGPX(b)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || s.gpxPrivacy}</p>${this.gpxError ? y`<p class="error" role="alert">${this.gpxError}</p>` : ""}${h ? y`<div class="gpx-preview"><strong>${h.drives.length} ${s.gpxSections}, ${h.points.length} ${s.gpxPoints}</strong>${m ? y`<p class="muted">${s.gpxPeriod}: ${wt(m.start, this.hass)} – ${wt(m.end, this.hass)}</p>` : ""}${g ? y`<p class="warning" role="alert">${s.gpxPeriodWarning}</p>` : ""}<h3>${s.gpxSummary}</h3><p class="muted">${h.points.length} ${s.gpxPoints}, ${this.gpxSelected.size} ${s.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${s.gpxDistance}, ${c?.title || s.gpxNoTrip}</p><div class="gpx-drive-list">${h.drives.map((b) => y`<label><input type="checkbox" .checked=${this.gpxSelected.has(b.key)} @change=${(f) => {
      f.currentTarget.checked ? this.gpxSelected.add(b.key) : this.gpxSelected.delete(b.key), this.requestUpdate();
    }}> ${wt(b.started_at, this.hass)} – ${wt(b.ended_at, this.hass)} · ${(b.distance_m / 1e3).toFixed(1)} km · ${Zi(b.duration_seconds, this.hass)}</label>`)}</div>${h.warnings.length ? y`<p class="muted">${s.gpxWarnings}: ${h.warnings.map((b) => b === "gpx_gap_possible_drive_boundary" ? s.gpxGapBoundary : b).join(", ")}</p>` : ""}${h.conflicts.duplicate_file ? y`<p class="error" role="alert">${s.gpxDuplicate}</p>` : y`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? s.saving : s.gpxConfirm}</button>`}</div>` : ""}</section></ha-card>`;
  }
  render() {
    const s = A(this.hass), r = this.snapshot?.trips ?? [];
    return y`${this.renderGpx(s, r, this.gpxPreview)}${this.renderLegacy()}`;
  }
  renderLegacy() {
    const s = A(this.hass), r = this.snapshot?.trips ?? [], h = this.snapshot?.expenses ?? [], c = this.snapshot?.expense_summary, m = c?.mixed_currency ? s.mixedCurrency : c?.total_minor !== void 0 && c.currency ? _e(c.total_minor, c.currency, this.hass) : _e(0, "EUR", this.hass), g = this.loadError || this.actionError, b = this.gpxPreview;
    return y`<ha-card><h2>${s.manager}</h2>${g ? y`<p class="error" role="alert">${g}</p>` : ""}<section class="gpx-import"><h3>${s.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(f) => this.readGPX(f)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || s.gpxPrivacy}</p>${this.gpxError ? y`<p class="error" role="alert">${this.gpxError}</p>` : ""}${b ? y`<div class="gpx-preview"><strong>${b.drives.length} ${s.gpxSections}, ${b.points.length} ${s.gpxPoints}</strong><ul>${b.drives.map((f) => y`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(f.key)} @change=${(v) => {
      v.currentTarget.checked ? this.gpxSelected.add(f.key) : this.gpxSelected.delete(f.key), this.requestUpdate();
    }}> ${wt(f.started_at, this.hass)} – ${wt(f.ended_at, this.hass)} · ${(f.distance_m / 1e3).toFixed(1)} km · ${Zi(f.duration_seconds, this.hass)}</label></li>`)}</ul>${b.warnings.length ? y`<p class="muted">${s.gpxWarnings}: ${b.warnings.join(", ")}</p>` : ""}${b.conflicts.duplicate_file ? y`<p class="error" role="alert">${s.gpxDuplicate}</p>` : y`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? s.saving : s.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${s.newTrip}</h3><div class="form-grid"><input aria-label=${s.tripName} placeholder=${s.tripName} .value=${this.tripTitle} @input=${(f) => this.tripTitle = f.target.value}><input aria-label=${s.destination} placeholder=${s.destination} .value=${this.destination} @input=${(f) => this.destination = f.target.value}><label>${s.startDate}<input type="date" .value=${this.tripStartDate} @input=${(f) => this.tripStartDate = f.currentTarget.value}></label><label>${s.endDate}<input type="date" .value=${this.tripEndDate} @input=${(f) => this.tripEndDate = f.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${s.create}</button></div></section><section><h3>${s.trips}</h3>${r.length ? r.map((f) => y`<article class="trip"><div class="row"><strong>${f.title}</strong><span class="muted">${f.destination || ""} · ${Ge(f.status, this.hass)} · ${qe(f, this.hass) || s.period}</span></div>${this.editingTripId === f.id ? y`<form class="form-grid" @submit=${(v) => {
      v.preventDefault(), this.saveTrip(f);
    }}><input aria-label=${s.tripName} .value=${this.editingTripTitle} @input=${(v) => this.editingTripTitle = v.currentTarget.value}><input aria-label=${s.destination} .value=${this.editingDestination} @input=${(v) => this.editingDestination = v.currentTarget.value}><label>${s.startDate}<input type="date" .value=${this.editingStartDate} @input=${(v) => this.editingStartDate = v.currentTarget.value}></label><label>${s.endDate}<input type="date" .value=${this.editingEndDate} @input=${(v) => this.editingEndDate = v.currentTarget.value}></label><button type="submit">${s.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${s.cancel}</button></form>` : y`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(f)}>${s.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(f.id)}>${this.confirmingTripId === f.id ? s.confirmDelete : s.remove}</button>${f.status === "planned" || f.status === "paused" ? y`<button type="button" @click=${() => this.changeStatus(f.id, "active")}>${s.resume}</button>` : ""}${f.status === "active" ? y`<button type="button" class="secondary" @click=${() => this.changeStatus(f.id, "paused")}>${s.pause}</button><button type="button" @click=${() => this.changeStatus(f.id, "completed")}>${s.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(f.id)}>${this.selected === f.id ? s.close : s.details}</button></div>`}${this.selected === f.id ? y`<div class="details"><h4>${s.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((v) => this.renderDrive(v, f.id, s)) : y`<p class="muted">${s.noDrives}</p>`}<h4>${s.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((v) => this.renderDrive(v, f.id, s)) : y`<p class="muted">${s.noDrives}</p>`}<h4>${s.manualDrive}</h4><div class="form-grid"><label>${s.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(v) => this.manualOccurredAt = v.currentTarget.value}></label><input aria-label=${s.startLocation} placeholder=${s.startLocation} .value=${this.manualStartLocation} @input=${(v) => this.manualStartLocation = v.currentTarget.value}><input aria-label=${s.endLocation} placeholder=${s.endLocation} .value=${this.manualEndLocation} @input=${(v) => this.manualEndLocation = v.currentTarget.value}><input aria-label=${s.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${s.distanceKm} .value=${this.manualDistanceKm} @input=${(v) => this.manualDistanceKm = v.currentTarget.value}><input aria-label=${s.durationMinutes} type="number" min="0" step="1" placeholder=${s.durationMinutes} .value=${this.manualDurationMinutes} @input=${(v) => this.manualDurationMinutes = v.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(f.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? s.saving : s.createDrive}</button></div><h4>${s.expenses}</h4><div class="expense-form create-form"><input aria-label=${s.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(v) => this.setExpenseAmount(v.currentTarget.value)}><select aria-label=${s.category} .value=${this.category} @change=${(v) => this.setExpenseCategory(v.currentTarget.value)}>${Di.map((v) => y`<option value=${v}>${Bi(v, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(f.id)}>${s.save}</button></div>${h.map((v) => this.renderExpense(v, s))}<p class="total"><strong>${s.total}: ${m}</strong></p></div>` : ""}</article>`) : y`<p class="muted">${s.noTrip}</p>`}</section></ha-card>`;
  }
}
Ve.styles = [Xt.styles, Zt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
Ve.styles = [...Ve.styles, Zt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}`];
en("camper-travel-journal-manager-card", Ve);
const ea = 1e4;
function Ui() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Hi(u) {
  return u.length <= 8 ? "••••" : `${u.slice(0, 4)}…${u.slice(-4)}`;
}
function $s(u) {
  return u?.connection ? u.connection.connected === !0 ? "available" : u.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function ia(u) {
  const s = u, r = typeof s?.code == "string" ? s.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", h = typeof s?.message == "string" ? s.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: r, errorMessage: h };
}
function na(u, s) {
  return new Promise((r, h) => {
    const c = setTimeout(() => h(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), s);
    u.then((m) => {
      clearTimeout(c), r(m);
    }, (m) => {
      clearTimeout(c), h(m);
    });
  });
}
async function Fi(u, s, r, h) {
  const c = Ui();
  try {
    const m = await na(u.connection.sendMessagePromise(s), h);
    return { ...r(m), durationMs: Math.round(Ui() - c), value: m };
  } catch (m) {
    return { state: "failed", durationMs: Math.round(Ui() - c), ...ia(m) };
  }
}
function sa(u) {
  return u && typeof u == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function oa(u) {
  const s = u?.vehicles;
  return Array.isArray(s) && s.every((r) => r && typeof r == "object" && typeof r.vehicle_id == "string") ? { state: "success", structure: "ok", count: s.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function ra(u) {
  const s = u;
  return Array.isArray(s?.trips) && Array.isArray(s?.drives) && Array.isArray(s?.stops) ? { state: "success", structure: "ok", count: s.trips.length, drivesCount: s.drives.length, stopsCount: s.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function aa(u, s, r = ea) {
  const h = { state: "not_run", durationMs: null };
  if (!u?.connection) return { version: "0.2.0-beta.4", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: h, vehicles: h, trips: h, vehicleId: Hi(s) };
  const c = $s(u), m = await Fi(u, { type: "auth/current_user" }, sa, r), g = await Fi(u, { type: "camper_travel_journal/list_vehicles" }, oa, r), b = g.value?.vehicles?.filter((Ye) => typeof Ye.vehicle_id == "string") ?? [], f = b.length === 1 ? b[0].vehicle_id : void 0, D = await Fi(u, { type: "camper_travel_journal/list", vehicle_id: f ?? s }, ra, r), { value: P, ...R } = m, { value: j, ...Y } = g, { value: Z, ...we } = D;
  return {
    version: "0.2.0-beta.4",
    connectionBefore: c,
    connectionAfter: $s(u),
    authentication: R,
    vehicles: Y,
    trips: we,
    vehicleId: Hi(s),
    ...f ? { resolvedVehicleId: Hi(f) } : {}
  };
}
function Wi(u) {
  return JSON.stringify(u, null, 2);
}
function qi(u) {
  return u.state === "success" ? "erfolgreich" : u.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const As = "01M4XW0KD3GQ0KASAYHQ29840P";
class ha extends Dt {
  static styles = Zt`
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
  config = { vehicle_id: As };
  set hass(s) {
    this._hass = s, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(s) {
    this.config = { vehicle_id: s.vehicle_id || As };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await aa(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const s = Wi(this.report);
    if (!navigator.clipboard?.writeText) {
      this.manualCopy = !0, this.error = "Bitte den eingeblendeten Bericht manuell auswählen und kopieren.", this.requestUpdate();
      return;
    }
    try {
      await navigator.clipboard.writeText(s), this.manualCopy = !1, this.error = "";
    } catch {
      this.manualCopy = !0, this.error = "Automatisches Kopieren ist in diesem Browser nicht verfügbar. Bitte den Bericht manuell auswählen und kopieren.";
    }
    this.requestUpdate();
  }
  selectReport() {
    this.shadowRoot?.querySelector('textarea[aria-label="Diagnosebericht zum manuellen Kopieren"]')?.select();
  }
  render() {
    const s = this.report;
    return y`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? y`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? y`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${s ? y`<dl>
        <dt>Version</dt><dd>${s.version}</dd>
        <dt>Verbindung vorher</dt><dd>${s.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${s.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${qi(s.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${qi(s.vehicles)}${s.vehicles.durationMs === null ? "" : ` (${s.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${qi(s.trips)}${s.trips.durationMs === null ? "" : ` (${s.trips.durationMs} ms)`}${s.trips.state === "success" ? ` · ${s.trips.count ?? 0} Reisen / ${s.trips.drivesCount ?? 0} Fahrten / ${s.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${s.vehicles.structure === "ok" && s.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Wi(s)}</pre>${this.manualCopy ? y`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Wi(s)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${s ? "Diagnose wiederholen" : "Diagnose starten"}</button>${s ? y`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? y`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", ha);
var fe = { exports: {} };
var la = fe.exports, Ms;
function ca() {
  return Ms || (Ms = 1, (function(u, s) {
    (function(r, h) {
      h(s);
    })(la, (function(r) {
      var h = "1.9.4";
      function c(t) {
        var e, i, n, o;
        for (i = 1, n = arguments.length; i < n; i++) {
          o = arguments[i];
          for (e in o)
            t[e] = o[e];
        }
        return t;
      }
      var m = Object.create || /* @__PURE__ */ (function() {
        function t() {
        }
        return function(e) {
          return t.prototype = e, new t();
        };
      })();
      function g(t, e) {
        var i = Array.prototype.slice;
        if (t.bind)
          return t.bind.apply(t, i.call(arguments, 1));
        var n = i.call(arguments, 2);
        return function() {
          return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
        };
      }
      var b = 0;
      function f(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++b), t._leaflet_id;
      }
      function v(t, e, i) {
        var n, o, a, l;
        return l = function() {
          n = !1, o && (a.apply(i, o), o = !1);
        }, a = function() {
          n ? o = arguments : (t.apply(i, arguments), setTimeout(l, e), n = !0);
        }, a;
      }
      function D(t, e, i) {
        var n = e[1], o = e[0], a = n - o;
        return t === n && i ? t : ((t - o) % a + a) % a + o;
      }
      function P() {
        return !1;
      }
      function R(t, e) {
        if (e === !1)
          return t;
        var i = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * i) / i;
      }
      function j(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function Y(t) {
        return j(t).split(/\s+/);
      }
      function Z(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? m(t.options) : {});
        for (var i in e)
          t.options[i] = e[i];
        return t.options;
      }
      function we(t, e, i) {
        var n = [];
        for (var o in t)
          n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
      }
      var Ye = /\{ *([\w_ -]+) *\}/g;
      function nn(t, e) {
        return t.replace(Ye, function(i, n) {
          var o = e[n];
          if (o === void 0)
            throw new Error("No value provided for variable " + i);
          return typeof o == "function" && (o = o(e)), o;
        });
      }
      var ht = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function Xe(t, e) {
        for (var i = 0; i < t.length; i++)
          if (t[i] === e)
            return i;
        return -1;
      }
      var Pe = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function Je(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var sn = 0;
      function on(t) {
        var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - sn));
        return sn = e + i, window.setTimeout(t, i);
      }
      var Qe = window.requestAnimationFrame || Je("RequestAnimationFrame") || on, rn = window.cancelAnimationFrame || Je("CancelAnimationFrame") || Je("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function Q(t, e, i) {
        if (i && Qe === on)
          t.call(e);
        else
          return Qe.call(window, g(t, e));
      }
      function st(t) {
        t && rn.call(window, t);
      }
      var Ws = {
        __proto__: null,
        extend: c,
        create: m,
        bind: g,
        get lastId() {
          return b;
        },
        stamp: f,
        throttle: v,
        wrapNum: D,
        falseFn: P,
        formatNum: R,
        trim: j,
        splitWords: Y,
        setOptions: Z,
        getParamString: we,
        template: nn,
        isArray: ht,
        indexOf: Xe,
        emptyImageUrl: Pe,
        requestFn: Qe,
        cancelFn: rn,
        requestAnimFrame: Q,
        cancelAnimFrame: st
      };
      function _t() {
      }
      _t.extend = function(t) {
        var e = function() {
          Z(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, i = e.__super__ = this.prototype, n = m(i);
        n.constructor = e, e.prototype = n;
        for (var o in this)
          Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (e[o] = this[o]);
        return t.statics && c(e, t.statics), t.includes && (qs(t.includes), c.apply(null, [n].concat(t.includes))), c(n, t), delete n.statics, delete n.includes, n.options && (n.options = i.options ? m(i.options) : {}, c(n.options, t.options)), n._initHooks = [], n.callInitHooks = function() {
          if (!this._initHooksCalled) {
            i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var a = 0, l = n._initHooks.length; a < l; a++)
              n._initHooks[a].call(this);
          }
        }, e;
      }, _t.include = function(t) {
        var e = this.prototype.options;
        return c(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, _t.mergeOptions = function(t) {
        return c(this.prototype.options, t), this;
      }, _t.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
      };
      function qs(t) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          t = ht(t) ? t : [t];
          for (var e = 0; e < t.length; e++)
            t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
      var nt = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(t, e, i) {
          if (typeof t == "object")
            for (var n in t)
              this._on(n, t[n], e);
          else {
            t = Y(t);
            for (var o = 0, a = t.length; o < a; o++)
              this._on(t[o], e, i);
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
            for (var n in t)
              this._off(n, t[n], e);
          else {
            t = Y(t);
            for (var o = arguments.length === 1, a = 0, l = t.length; a < l; a++)
              o ? this._off(t[a]) : this._off(t[a], e, i);
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(t, e, i, n) {
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          if (this._listens(t, e, i) === !1) {
            i === this && (i = void 0);
            var o = { fn: e, ctx: i };
            n && (o.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(o);
          }
        },
        _off: function(t, e, i) {
          var n, o, a;
          if (this._events && (n = this._events[t], !!n)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (o = 0, a = n.length; o < a; o++)
                  n[o].fn = P;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var l = this._listens(t, e, i);
            if (l !== !1) {
              var d = n[l];
              this._firingCount && (d.fn = P, this._events[t] = n = n.slice()), n.splice(l, 1);
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
          var n = c({}, e, {
            type: t,
            target: this,
            sourceTarget: e && e.sourceTarget || this
          });
          if (this._events) {
            var o = this._events[t];
            if (o) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var a = 0, l = o.length; a < l; a++) {
                var d = o[a], p = d.fn;
                d.once && this.off(t, p, d.ctx), p.call(d.ctx || this, n);
              }
              this._firingCount--;
            }
          }
          return i && this._propagateEvent(n), this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(t, e, i, n) {
          typeof t != "string" && console.warn('"string" type argument expected');
          var o = e;
          typeof e != "function" && (n = !!e, o = void 0, i = void 0);
          var a = this._events && this._events[t];
          if (a && a.length && this._listens(t, o, i) !== !1)
            return !0;
          if (n) {
            for (var l in this._eventParents)
              if (this._eventParents[l].listens(t, e, i, n))
                return !0;
          }
          return !1;
        },
        // returns the index (number) or false
        _listens: function(t, e, i) {
          if (!this._events)
            return !1;
          var n = this._events[t] || [];
          if (!e)
            return !!n.length;
          i === this && (i = void 0);
          for (var o = 0, a = n.length; o < a; o++)
            if (n[o].fn === e && n[o].ctx === i)
              return o;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(t, e, i) {
          if (typeof t == "object")
            for (var n in t)
              this._on(n, t[n], e, !0);
          else {
            t = Y(t);
            for (var o = 0, a = t.length; o < a; o++)
              this._on(t[o], e, i, !0);
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(t) {
          return this._eventParents = this._eventParents || {}, this._eventParents[f(t)] = t, this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(t) {
          return this._eventParents && delete this._eventParents[f(t)], this;
        },
        _propagateEvent: function(t) {
          for (var e in this._eventParents)
            this._eventParents[e].fire(t.type, c({
              layer: t.target,
              propagatedFrom: t.target
            }, t), !0);
        }
      };
      nt.addEventListener = nt.on, nt.removeEventListener = nt.clearAllEventListeners = nt.off, nt.addOneTimeEventListener = nt.once, nt.fireEvent = nt.fire, nt.hasEventListeners = nt.listens;
      var Jt = _t.extend(nt);
      function S(t, e, i) {
        this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
      }
      var an = Math.trunc || function(t) {
        return t > 0 ? Math.floor(t) : Math.ceil(t);
      };
      S.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new S(this.x, this.y);
        },
        // @method add(otherPoint: Point): Point
        // Returns the result of addition of the current and the given points.
        add: function(t) {
          return this.clone()._add(E(t));
        },
        _add: function(t) {
          return this.x += t.x, this.y += t.y, this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(t) {
          return this.clone()._subtract(E(t));
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
          return new S(this.x * t.x, this.y * t.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(t) {
          return new S(this.x / t.x, this.y / t.y);
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
          return this.x = an(this.x), this.y = an(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(t) {
          t = E(t);
          var e = t.x - this.x, i = t.y - this.y;
          return Math.sqrt(e * e + i * i);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(t) {
          return t = E(t), t.x === this.x && t.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(t) {
          return t = E(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + R(this.x) + ", " + R(this.y) + ")";
        }
      };
      function E(t, e, i) {
        return t instanceof S ? t : ht(t) ? new S(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new S(t.x, t.y) : new S(t, e, i);
      }
      function N(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
            this.extend(i[n]);
      }
      N.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e, i;
          if (!t)
            return this;
          if (t instanceof S || typeof t[0] == "number" || "x" in t)
            e = i = E(t);
          else if (t = tt(t), e = t.min, i = t.max, !e || !i)
            return this;
          return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(t) {
          return E(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            t
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return E(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return E(this.max.x, this.min.y);
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
          return typeof t[0] == "number" || t instanceof S ? t = E(t) : t = tt(t), t instanceof N ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = tt(t);
          var e = this.min, i = this.max, n = t.min, o = t.max, a = o.x >= e.x && n.x <= i.x, l = o.y >= e.y && n.y <= i.y;
          return a && l;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = tt(t);
          var e = this.min, i = this.max, n = t.min, o = t.max, a = o.x > e.x && n.x < i.x, l = o.y > e.y && n.y < i.y;
          return a && l;
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
          var e = this.min, i = this.max, n = Math.abs(e.x - i.x) * t, o = Math.abs(e.y - i.y) * t;
          return tt(
            E(e.x - n, e.y - o),
            E(i.x + n, i.y + o)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(t) {
          return t ? (t = tt(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
        }
      };
      function tt(t, e) {
        return !t || t instanceof N ? t : new N(t, e);
      }
      function et(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++)
            this.extend(i[n]);
      }
      et.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, i = this._northEast, n, o;
          if (t instanceof O)
            n = t, o = t;
          else if (t instanceof et) {
            if (n = t._southWest, o = t._northEast, !n || !o)
              return this;
          } else
            return t ? this.extend(M(t) || F(t)) : this;
          return !e && !i ? (this._southWest = new O(n.lat, n.lng), this._northEast = new O(o.lat, o.lng)) : (e.lat = Math.min(n.lat, e.lat), e.lng = Math.min(n.lng, e.lng), i.lat = Math.max(o.lat, i.lat), i.lng = Math.max(o.lng, i.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, i = this._northEast, n = Math.abs(e.lat - i.lat) * t, o = Math.abs(e.lng - i.lng) * t;
          return new et(
            new O(e.lat - n, e.lng - o),
            new O(i.lat + n, i.lng + o)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new O(
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
          return new O(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new O(this.getSouth(), this.getEast());
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
          typeof t[0] == "number" || t instanceof O || "lat" in t ? t = M(t) : t = F(t);
          var e = this._southWest, i = this._northEast, n, o;
          return t instanceof et ? (n = t.getSouthWest(), o = t.getNorthEast()) : n = o = t, n.lat >= e.lat && o.lat <= i.lat && n.lng >= e.lng && o.lng <= i.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = F(t);
          var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), a = o.lat >= e.lat && n.lat <= i.lat, l = o.lng >= e.lng && n.lng <= i.lng;
          return a && l;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = F(t);
          var e = this._southWest, i = this._northEast, n = t.getSouthWest(), o = t.getNorthEast(), a = o.lat > e.lat && n.lat < i.lat, l = o.lng > e.lng && n.lng < i.lng;
          return a && l;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          return t ? (t = F(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function F(t, e) {
        return t instanceof et ? t : new et(t, e);
      }
      function O(t, e, i) {
        if (isNaN(t) || isNaN(e))
          throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = +t, this.lng = +e, i !== void 0 && (this.alt = +i);
      }
      O.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          if (!t)
            return !1;
          t = M(t);
          var i = Math.max(
            Math.abs(this.lat - t.lat),
            Math.abs(this.lng - t.lng)
          );
          return i <= (e === void 0 ? 1e-9 : e);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(t) {
          return "LatLng(" + R(this.lat, t) + ", " + R(this.lng, t) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(t) {
          return Pt.distance(this, M(t));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return Pt.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(t) {
          var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
          return F(
            [this.lat - e, this.lng - i],
            [this.lat + e, this.lng + i]
          );
        },
        clone: function() {
          return new O(this.lat, this.lng, this.alt);
        }
      };
      function M(t, e, i) {
        return t instanceof O ? t : ht(t) && typeof t[0] != "object" ? t.length === 3 ? new O(t[0], t[1], t[2]) : t.length === 2 ? new O(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new O(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new O(t, e, i);
      }
      var gt = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(t, e) {
          var i = this.projection.project(t), n = this.scale(e);
          return this.transformation._transform(i, n);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(t, e) {
          var i = this.scale(e), n = this.transformation.untransform(t, i);
          return this.projection.unproject(n);
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
          var e = this.projection.bounds, i = this.scale(t), n = this.transformation.transform(e.min, i), o = this.transformation.transform(e.max, i);
          return new N(n, o);
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
          var e = this.wrapLng ? D(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? D(t.lat, this.wrapLat, !0) : t.lat, n = t.alt;
          return new O(i, e, n);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), i = this.wrapLatLng(e), n = e.lat - i.lat, o = e.lng - i.lng;
          if (n === 0 && o === 0)
            return t;
          var a = t.getSouthWest(), l = t.getNorthEast(), d = new O(a.lat - n, a.lng - o), p = new O(l.lat - n, l.lng - o);
          return new et(d, p);
        }
      }, Pt = c({}, gt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(t, e) {
          var i = Math.PI / 180, n = t.lat * i, o = e.lat * i, a = Math.sin((e.lat - t.lat) * i / 2), l = Math.sin((e.lng - t.lng) * i / 2), d = a * a + Math.cos(n) * Math.cos(o) * l * l, p = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
          return this.R * p;
        }
      }), hn = 6378137, ti = {
        R: hn,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, i = this.MAX_LATITUDE, n = Math.max(Math.min(i, t.lat), -i), o = Math.sin(n * e);
          return new S(
            this.R * t.lng * e,
            this.R * Math.log((1 + o) / (1 - o)) / 2
          );
        },
        unproject: function(t) {
          var e = 180 / Math.PI;
          return new O(
            (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
            t.x * e / this.R
          );
        },
        bounds: (function() {
          var t = hn * Math.PI;
          return new N([-t, -t], [t, t]);
        })()
      };
      function ei(t, e, i, n) {
        if (ht(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = i, this._d = n;
      }
      ei.prototype = {
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
          return e = e || 1, new S(
            (t.x / e - this._b) / this._a,
            (t.y / e - this._d) / this._c
          );
        }
      };
      function Qt(t, e, i, n) {
        return new ei(t, e, i, n);
      }
      var ii = c({}, Pt, {
        code: "EPSG:3857",
        projection: ti,
        transformation: (function() {
          var t = 0.5 / (Math.PI * ti.R);
          return Qt(t, 0.5, -t, 0.5);
        })()
      }), Gs = c({}, ii, {
        code: "EPSG:900913"
      });
      function ln(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function cn(t, e) {
        var i = "", n, o, a, l, d, p;
        for (n = 0, a = t.length; n < a; n++) {
          for (d = t[n], o = 0, l = d.length; o < l; o++)
            p = d[o], i += (o ? "L" : "M") + p.x + " " + p.y;
          i += e ? w.svg ? "z" : "x" : "";
        }
        return i || "M0 0";
      }
      var ni = document.documentElement.style, Te = "ActiveXObject" in window, Vs = Te && !document.addEventListener, un = "msLaunchUri" in navigator && !("documentMode" in document), si = ut("webkit"), dn = ut("android"), pn = ut("android 2") || ut("android 3"), js = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Ks = dn && ut("Google") && js < 537 && !("AudioNode" in window), oi = !!window.opera, fn = !un && ut("chrome"), mn = ut("gecko") && !si && !oi && !Te, Ys = !fn && ut("safari"), _n = ut("phantom"), gn = "OTransition" in ni, Xs = navigator.platform.indexOf("Win") === 0, vn = Te && "transition" in ni, ri = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !pn, yn = "MozPerspective" in ni, Js = !window.L_DISABLE_3D && (vn || ri || yn) && !gn && !_n, te = typeof orientation < "u" || ut("mobile"), Qs = te && si, to = te && ri, xn = !window.PointerEvent && window.MSPointerEvent, bn = !!(window.PointerEvent || xn), wn = "ontouchstart" in window || !!window.TouchEvent, eo = !window.L_NO_TOUCH && (wn || bn), io = te && oi, no = te && mn, so = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, oo = (function() {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function() {
              t = !0;
            }
          });
          window.addEventListener("testPassiveEventSupport", P, e), window.removeEventListener("testPassiveEventSupport", P, e);
        } catch {
        }
        return t;
      })(), ro = (function() {
        return !!document.createElement("canvas").getContext;
      })(), ai = !!(document.createElementNS && ln("svg").createSVGRect), ao = !!ai && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), ho = !ai && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), lo = navigator.platform.indexOf("Mac") === 0, co = navigator.platform.indexOf("Linux") === 0;
      function ut(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var w = {
        ie: Te,
        ielt9: Vs,
        edge: un,
        webkit: si,
        android: dn,
        android23: pn,
        androidStock: Ks,
        opera: oi,
        chrome: fn,
        gecko: mn,
        safari: Ys,
        phantom: _n,
        opera12: gn,
        win: Xs,
        ie3d: vn,
        webkit3d: ri,
        gecko3d: yn,
        any3d: Js,
        mobile: te,
        mobileWebkit: Qs,
        mobileWebkit3d: to,
        msPointer: xn,
        pointer: bn,
        touch: eo,
        touchNative: wn,
        mobileOpera: io,
        mobileGecko: no,
        retina: so,
        passiveEvents: oo,
        canvas: ro,
        svg: ai,
        vml: ho,
        inlineSvg: ao,
        mac: lo,
        linux: co
      }, Pn = w.msPointer ? "MSPointerDown" : "pointerdown", Tn = w.msPointer ? "MSPointerMove" : "pointermove", Ln = w.msPointer ? "MSPointerUp" : "pointerup", En = w.msPointer ? "MSPointerCancel" : "pointercancel", hi = {
        touchstart: Pn,
        touchmove: Tn,
        touchend: Ln,
        touchcancel: En
      }, Sn = {
        touchstart: go,
        touchmove: Le,
        touchend: Le,
        touchcancel: Le
      }, Bt = {}, Cn = !1;
      function uo(t, e, i) {
        return e === "touchstart" && _o(), Sn[e] ? (i = Sn[e].bind(this, i), t.addEventListener(hi[e], i, !1), i) : (console.warn("wrong event specified:", e), P);
      }
      function po(t, e, i) {
        if (!hi[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(hi[e], i, !1);
      }
      function fo(t) {
        Bt[t.pointerId] = t;
      }
      function mo(t) {
        Bt[t.pointerId] && (Bt[t.pointerId] = t);
      }
      function kn(t) {
        delete Bt[t.pointerId];
      }
      function _o() {
        Cn || (document.addEventListener(Pn, fo, !0), document.addEventListener(Tn, mo, !0), document.addEventListener(Ln, kn, !0), document.addEventListener(En, kn, !0), Cn = !0);
      }
      function Le(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var i in Bt)
            e.touches.push(Bt[i]);
          e.changedTouches = [e], t(e);
        }
      }
      function go(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && K(e), Le(t, e);
      }
      function vo(t) {
        var e = {}, i, n;
        for (n in t)
          i = t[n], e[n] = i && i.bind ? i.bind(t) : i;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var yo = 200;
      function xo(t, e) {
        t.addEventListener("dblclick", e);
        var i = 0, n;
        function o(a) {
          if (a.detail !== 1) {
            n = a.detail;
            return;
          }
          if (!(a.pointerType === "mouse" || a.sourceCapabilities && !a.sourceCapabilities.firesTouchEvents)) {
            var l = zn(a);
            if (!(l.some(function(p) {
              return p instanceof HTMLLabelElement && p.attributes.for;
            }) && !l.some(function(p) {
              return p instanceof HTMLInputElement || p instanceof HTMLSelectElement;
            }))) {
              var d = Date.now();
              d - i <= yo ? (n++, n === 2 && e(vo(a))) : n = 1, i = d;
            }
          }
        }
        return t.addEventListener("click", o), {
          dblclick: e,
          simDblclick: o
        };
      }
      function bo(t, e) {
        t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
      }
      var li = Ce(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), ee = Ce(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), $n = ee === "webkitTransition" || ee === "OTransition" ? ee + "End" : "transitionend";
      function An(t) {
        return typeof t == "string" ? document.getElementById(t) : t;
      }
      function ie(t, e) {
        var i = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!i || i === "auto") && document.defaultView) {
          var n = document.defaultView.getComputedStyle(t, null);
          i = n ? n[e] : null;
        }
        return i === "auto" ? null : i;
      }
      function z(t, e, i) {
        var n = document.createElement(t);
        return n.className = e || "", i && i.appendChild(n), n;
      }
      function U(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function Ee(t) {
        for (; t.firstChild; )
          t.removeChild(t.firstChild);
      }
      function Rt(t) {
        var e = t.parentNode;
        e && e.lastChild !== t && e.appendChild(t);
      }
      function Nt(t) {
        var e = t.parentNode;
        e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
      }
      function ci(t, e) {
        if (t.classList !== void 0)
          return t.classList.contains(e);
        var i = Se(t);
        return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
      }
      function k(t, e) {
        if (t.classList !== void 0)
          for (var i = Y(e), n = 0, o = i.length; n < o; n++)
            t.classList.add(i[n]);
        else if (!ci(t, e)) {
          var a = Se(t);
          ui(t, (a ? a + " " : "") + e);
        }
      }
      function H(t, e) {
        t.classList !== void 0 ? t.classList.remove(e) : ui(t, j((" " + Se(t) + " ").replace(" " + e + " ", " ")));
      }
      function ui(t, e) {
        t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
      }
      function Se(t) {
        return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
      }
      function ot(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && wo(t, e);
      }
      function wo(t, e) {
        var i = !1, n = "DXImageTransform.Microsoft.Alpha";
        try {
          i = t.filters.item(n);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
      }
      function Ce(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
          if (t[i] in e)
            return t[i];
        return !1;
      }
      function Ct(t, e, i) {
        var n = e || new S(0, 0);
        t.style[li] = (w.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "");
      }
      function W(t, e) {
        t._leaflet_pos = e, w.any3d ? Ct(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
      }
      function kt(t) {
        return t._leaflet_pos || new S(0, 0);
      }
      var ne, se, di;
      if ("onselectstart" in document)
        ne = function() {
          C(window, "selectstart", K);
        }, se = function() {
          B(window, "selectstart", K);
        };
      else {
        var oe = Ce(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        ne = function() {
          if (oe) {
            var t = document.documentElement.style;
            di = t[oe], t[oe] = "none";
          }
        }, se = function() {
          oe && (document.documentElement.style[oe] = di, di = void 0);
        };
      }
      function pi() {
        C(window, "dragstart", K);
      }
      function fi() {
        B(window, "dragstart", K);
      }
      var ke, mi;
      function _i(t) {
        for (; t.tabIndex === -1; )
          t = t.parentNode;
        t.style && ($e(), ke = t, mi = t.style.outlineStyle, t.style.outlineStyle = "none", C(window, "keydown", $e));
      }
      function $e() {
        ke && (ke.style.outlineStyle = mi, ke = void 0, mi = void 0, B(window, "keydown", $e));
      }
      function Mn(t) {
        do
          t = t.parentNode;
        while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
        return t;
      }
      function gi(t) {
        var e = t.getBoundingClientRect();
        return {
          x: e.width / t.offsetWidth || 1,
          y: e.height / t.offsetHeight || 1,
          boundingClientRect: e
        };
      }
      var Po = {
        __proto__: null,
        TRANSFORM: li,
        TRANSITION: ee,
        TRANSITION_END: $n,
        get: An,
        getStyle: ie,
        create: z,
        remove: U,
        empty: Ee,
        toFront: Rt,
        toBack: Nt,
        hasClass: ci,
        addClass: k,
        removeClass: H,
        setClass: ui,
        getClass: Se,
        setOpacity: ot,
        testProp: Ce,
        setTransform: Ct,
        setPosition: W,
        getPosition: kt,
        get disableTextSelection() {
          return ne;
        },
        get enableTextSelection() {
          return se;
        },
        disableImageDrag: pi,
        enableImageDrag: fi,
        preventOutline: _i,
        restoreOutline: $e,
        getSizedParentNode: Mn,
        getScale: gi
      };
      function C(t, e, i, n) {
        if (e && typeof e == "object")
          for (var o in e)
            yi(t, o, e[o], i);
        else {
          e = Y(e);
          for (var a = 0, l = e.length; a < l; a++)
            yi(t, e[a], i, n);
        }
        return this;
      }
      var dt = "_leaflet_events";
      function B(t, e, i, n) {
        if (arguments.length === 1)
          In(t), delete t[dt];
        else if (e && typeof e == "object")
          for (var o in e)
            xi(t, o, e[o], i);
        else if (e = Y(e), arguments.length === 2)
          In(t, function(d) {
            return Xe(e, d) !== -1;
          });
        else
          for (var a = 0, l = e.length; a < l; a++)
            xi(t, e[a], i, n);
        return this;
      }
      function In(t, e) {
        for (var i in t[dt]) {
          var n = i.split(/\d/)[0];
          (!e || e(n)) && xi(t, n, null, null, i);
        }
      }
      var vi = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function yi(t, e, i, n) {
        var o = e + f(i) + (n ? "_" + f(n) : "");
        if (t[dt] && t[dt][o])
          return this;
        var a = function(d) {
          return i.call(n || t, d || window.event);
        }, l = a;
        !w.touchNative && w.pointer && e.indexOf("touch") === 0 ? a = uo(t, e, a) : w.touch && e === "dblclick" ? a = xo(t, a) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(vi[e] || e, a, w.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (a = function(d) {
          d = d || window.event, wi(t, d) && l(d);
        }, t.addEventListener(vi[e], a, !1)) : t.addEventListener(e, l, !1) : t.attachEvent("on" + e, a), t[dt] = t[dt] || {}, t[dt][o] = a;
      }
      function xi(t, e, i, n, o) {
        o = o || e + f(i) + (n ? "_" + f(n) : "");
        var a = t[dt] && t[dt][o];
        if (!a)
          return this;
        !w.touchNative && w.pointer && e.indexOf("touch") === 0 ? po(t, e, a) : w.touch && e === "dblclick" ? bo(t, a) : "removeEventListener" in t ? t.removeEventListener(vi[e] || e, a, !1) : t.detachEvent("on" + e, a), t[dt][o] = null;
      }
      function $t(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
      }
      function bi(t) {
        return yi(t, "wheel", $t), this;
      }
      function re(t) {
        return C(t, "mousedown touchstart dblclick contextmenu", $t), t._leaflet_disable_click = !0, this;
      }
      function K(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
      }
      function At(t) {
        return K(t), $t(t), this;
      }
      function zn(t) {
        if (t.composedPath)
          return t.composedPath();
        for (var e = [], i = t.target; i; )
          e.push(i), i = i.parentNode;
        return e;
      }
      function Dn(t, e) {
        if (!e)
          return new S(t.clientX, t.clientY);
        var i = gi(e), n = i.boundingClientRect;
        return new S(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - n.left) / i.x - e.clientLeft,
          (t.clientY - n.top) / i.y - e.clientTop
        );
      }
      var To = w.linux && w.chrome ? window.devicePixelRatio : w.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function On(t) {
        return w.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / To : (
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
      function wi(t, e) {
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
      var Lo = {
        __proto__: null,
        on: C,
        off: B,
        stopPropagation: $t,
        disableScrollPropagation: bi,
        disableClickPropagation: re,
        preventDefault: K,
        stop: At,
        getPropagationPath: zn,
        getMousePosition: Dn,
        getWheelDelta: On,
        isExternalTarget: wi,
        addListener: C,
        removeListener: B
      }, Zn = Jt.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(t, e, i, n) {
          this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(n || 0.5, 0.2), this._startPos = kt(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function() {
          this._animId = Q(this._animate, this), this._step();
        },
        _step: function(t) {
          var e = +/* @__PURE__ */ new Date() - this._startTime, i = this._duration * 1e3;
          e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(t, e) {
          var i = this._startPos.add(this._offset.multiplyBy(t));
          e && i._round(), W(this._el, i), this.fire("step");
        },
        _complete: function() {
          st(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      }), I = Jt.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: ii,
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
          e = Z(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = g(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(M(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = ee && w.any3d && !w.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), C(this._proxy, $n, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(t, e, i) {
          if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(M(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
            i.animate !== void 0 && (i.zoom = c({ animate: i.animate }, i.zoom), i.pan = c({ animate: i.animate, duration: i.duration }, i.pan));
            var n = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, i.zoom) : this._tryAnimatedPan(t, i.pan);
            if (n)
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
          return t = t || (w.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(t, e) {
          return t = t || (w.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(t, e, i) {
          var n = this.getZoomScale(e), o = this.getSize().divideBy(2), a = t instanceof S ? t : this.latLngToContainerPoint(t), l = a.subtract(o).multiplyBy(1 - 1 / n), d = this.containerPointToLatLng(o.add(l));
          return this.setView(d, e, { zoom: i });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : F(t);
          var i = E(e.paddingTopLeft || e.padding || [0, 0]), n = E(e.paddingBottomRight || e.padding || [0, 0]), o = this.getBoundsZoom(t, !1, i.add(n));
          if (o = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, o) : o, o === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: o
            };
          var a = n.subtract(i).divideBy(2), l = this.project(t.getSouthWest(), o), d = this.project(t.getNorthEast(), o), p = this.unproject(l.add(d).divideBy(2).add(a), o);
          return {
            center: p,
            zoom: o
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = F(t), !t.isValid())
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
          if (t = E(t).round(), e = e || {}, !t.x && !t.y)
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new Zn(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
            k(this._mapPane, "leaflet-pan-anim");
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
          if (i = i || {}, i.animate === !1 || !w.any3d)
            return this.setView(t, e, i);
          this._stop();
          var n = this.project(this.getCenter()), o = this.project(t), a = this.getSize(), l = this._zoom;
          t = M(t), e = e === void 0 ? l : e;
          var d = Math.max(a.x, a.y), p = d * this.getZoomScale(l, e), _ = o.distanceTo(n) || 1, x = 1.42, T = x * x;
          function $(q) {
            var He = q ? -1 : 1, pr = q ? p : d, fr = p * p - d * d + He * T * T * _ * _, mr = 2 * pr * T * _, Ii = fr / mr, gs = Math.sqrt(Ii * Ii + 1) - Ii, _r = gs < 1e-9 ? -18 : Math.log(gs);
            return _r;
          }
          function J(q) {
            return (Math.exp(q) - Math.exp(-q)) / 2;
          }
          function G(q) {
            return (Math.exp(q) + Math.exp(-q)) / 2;
          }
          function at(q) {
            return J(q) / G(q);
          }
          var it = $(0);
          function Gt(q) {
            return d * (G(it) / G(it + x * q));
          }
          function lr(q) {
            return d * (G(it) * at(it + x * q) - J(it)) / T;
          }
          function cr(q) {
            return 1 - Math.pow(1 - q, 1.5);
          }
          var ur = Date.now(), ms = ($(1) - it) / x, dr = i.duration ? 1e3 * i.duration : 1e3 * ms * 0.8;
          function _s() {
            var q = (Date.now() - ur) / dr, He = cr(q) * ms;
            q <= 1 ? (this._flyToFrame = Q(_s, this), this._move(
              this.unproject(n.add(o.subtract(n).multiplyBy(lr(He) / _)), l),
              this.getScaleZoom(d / Gt(He), l),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, i.noMoveStart), _s.call(this), this;
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
          return t = F(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
          var i = this.getCenter(), n = this._limitCenter(i, this._zoom, F(t));
          return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var i = E(e.paddingTopLeft || e.padding || [0, 0]), n = E(e.paddingBottomRight || e.padding || [0, 0]), o = this.project(this.getCenter()), a = this.project(t), l = this.getPixelBounds(), d = tt([l.min.add(i), l.max.subtract(n)]), p = d.getSize();
          if (!d.contains(a)) {
            this._enforcingBounds = !0;
            var _ = a.subtract(d.getCenter()), x = d.extend(a).getSize().subtract(p);
            o.x += _.x < 0 ? -x.x : x.x, o.y += _.y < 0 ? -x.y : x.y, this.panTo(this.unproject(o), e), this._enforcingBounds = !1;
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
          t = c({
            animate: !1,
            pan: !0
          }, t === !0 ? { animate: !0 } : t);
          var e = this.getSize();
          this._sizeChanged = !0, this._lastCenter = null;
          var i = this.getSize(), n = e.divideBy(2).round(), o = i.divideBy(2).round(), a = n.subtract(o);
          return !a.x && !a.y ? this : (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(g(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
          if (t = this._locateOptions = c({
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
          var e = g(this._handleGeolocationResponse, this), i = g(this._handleGeolocationError, this);
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
            var e = t.coords.latitude, i = t.coords.longitude, n = new O(e, i), o = n.toBounds(t.coords.accuracy * 2), a = this._locateOptions;
            if (a.setView) {
              var l = this.getBoundsZoom(o);
              this.setView(n, a.maxZoom ? Math.min(l, a.maxZoom) : l);
            }
            var d = {
              latlng: n,
              bounds: o,
              timestamp: t.timestamp
            };
            for (var p in t.coords)
              typeof t.coords[p] == "number" && (d[p] = t.coords[p]);
            this.fire("locationfound", d);
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
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), U(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (st(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
          var t;
          for (t in this._layers)
            this._layers[t].remove();
          for (t in this._panes)
            U(this._panes[t]);
          return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(t, e) {
          var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), n = z("div", i, e || this._mapPane);
          return t && (this._panes[t] = n), n;
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
          return new et(e, i);
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
          t = F(t), i = E(i || [0, 0]);
          var n = this.getZoom() || 0, o = this.getMinZoom(), a = this.getMaxZoom(), l = t.getNorthWest(), d = t.getSouthEast(), p = this.getSize().subtract(i), _ = tt(this.project(d, n), this.project(l, n)).getSize(), x = w.any3d ? this.options.zoomSnap : 1, T = p.x / _.x, $ = p.y / _.y, J = e ? Math.max(T, $) : Math.min(T, $);
          return n = this.getScaleZoom(J, n), x && (n = Math.round(n / (x / 100)) * (x / 100), n = e ? Math.ceil(n / x) * x : Math.floor(n / x) * x), Math.max(o, Math.min(a, n));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          return (!this._size || this._sizeChanged) && (this._size = new S(
            this._container.clientWidth || 0,
            this._container.clientHeight || 0
          ), this._sizeChanged = !1), this._size.clone();
        },
        // @method getPixelBounds(): Bounds
        // Returns the bounds of the current map view in projected pixel
        // coordinates (sometimes useful in layer and overlay implementations).
        getPixelBounds: function(t, e) {
          var i = this._getTopLeftPoint(t, e);
          return new N(i, i.add(this.getSize()));
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
          var n = i.zoom(t * i.scale(e));
          return isNaN(n) ? 1 / 0 : n;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(M(t), e);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(E(t), e);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(t) {
          var e = E(t).add(this.getPixelOrigin());
          return this.unproject(e);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(t) {
          var e = this.project(M(t))._round();
          return e._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(t) {
          return this.options.crs.wrapLatLng(M(t));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(t) {
          return this.options.crs.wrapLatLngBounds(F(t));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(t, e) {
          return this.options.crs.distance(M(t), M(e));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(t) {
          return E(t).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(t) {
          return E(t).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(t) {
          var e = this.containerPointToLayerPoint(E(t));
          return this.layerPointToLatLng(e);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(t) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(M(t)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(t) {
          return Dn(t, this._container);
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
          var e = this._container = An(t);
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          C(e, "scroll", this._onScroll, this), this._containerId = f(e);
        },
        _initLayout: function() {
          var t = this._container;
          this._fadeAnimated = this.options.fadeAnimation && w.any3d, k(t, "leaflet-container" + (w.touch ? " leaflet-touch" : "") + (w.retina ? " leaflet-retina" : "") + (w.ielt9 ? " leaflet-oldie" : "") + (w.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var e = ie(t, "position");
          e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var t = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), W(this._mapPane, new S(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (k(t.markerPane, "leaflet-zoom-hide"), k(t.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(t, e, i) {
          W(this._mapPane, new S(0, 0));
          var n = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var o = this._zoom !== e;
          this._moveStart(o, i)._move(t, e)._moveEnd(o), this.fire("viewreset"), n && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, i, n) {
          e === void 0 && (e = this._zoom);
          var o = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), n ? i && i.pinch && this.fire("zoom", i) : ((o || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
        },
        _moveEnd: function(t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return st(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(t) {
          W(this._mapPane, this._getMapPanePos().subtract(t));
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
          this._targets = {}, this._targets[f(this._container)] = this;
          var e = t ? B : C;
          e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), w.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function() {
          st(this._resizeRequest), this._resizeRequest = Q(
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
          for (var i = [], n, o = e === "mouseout" || e === "mouseover", a = t.target || t.srcElement, l = !1; a; ) {
            if (n = this._targets[f(a)], n && (e === "click" || e === "preclick") && this._draggableMoved(n)) {
              l = !0;
              break;
            }
            if (n && n.listens(e, !0) && (o && !wi(a, t) || (i.push(n), o)) || a === this._container)
              break;
            a = a.parentNode;
          }
          return !i.length && !l && !o && this.listens(e, !0) && (i = [this]), i;
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
            i === "mousedown" && _i(e), this._fireDOMEvent(t, i);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, i) {
          if (t.type === "click") {
            var n = c({}, t);
            n.type = "preclick", this._fireDOMEvent(n, n.type, i);
          }
          var o = this._findEventTargets(t, e);
          if (i) {
            for (var a = [], l = 0; l < i.length; l++)
              i[l].listens(e, !0) && a.push(i[l]);
            o = a.concat(o);
          }
          if (o.length) {
            e === "contextmenu" && K(t);
            var d = o[0], p = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var _ = d.getLatLng && (!d._radius || d._radius <= 10);
              p.containerPoint = _ ? this.latLngToContainerPoint(d.getLatLng()) : this.mouseEventToContainerPoint(t), p.layerPoint = this.containerPointToLayerPoint(p.containerPoint), p.latlng = _ ? d.getLatLng() : this.layerPointToLatLng(p.layerPoint);
            }
            for (l = 0; l < o.length; l++)
              if (o[l].fire(e, p, !0), p.originalEvent._stopped || o[l].options.bubblingMouseEvents === !1 && Xe(this._mouseEvents, e) !== -1)
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
          return kt(this._mapPane) || new S(0, 0);
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
          var n = this._getNewPixelOrigin(i, e);
          return this.project(t, e)._subtract(n);
        },
        _latLngBoundsToNewLayerBounds: function(t, e, i) {
          var n = this._getNewPixelOrigin(i, e);
          return tt([
            this.project(t.getSouthWest(), e)._subtract(n),
            this.project(t.getNorthWest(), e)._subtract(n),
            this.project(t.getSouthEast(), e)._subtract(n),
            this.project(t.getNorthEast(), e)._subtract(n)
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
          var n = this.project(t, e), o = this.getSize().divideBy(2), a = new N(n.subtract(o), n.add(o)), l = this._getBoundsOffset(a, i, e);
          return Math.abs(l.x) <= 1 && Math.abs(l.y) <= 1 ? t : this.unproject(n.add(l), e);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(t, e) {
          if (!e)
            return t;
          var i = this.getPixelBounds(), n = new N(i.min.add(t), i.max.add(t));
          return t.add(this._getBoundsOffset(n, e));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(t, e, i) {
          var n = tt(
            this.project(e.getNorthEast(), i),
            this.project(e.getSouthWest(), i)
          ), o = n.min.subtract(t.min), a = n.max.subtract(t.max), l = this._rebound(o.x, -a.x), d = this._rebound(o.y, -a.y);
          return new S(l, d);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), i = this.getMaxZoom(), n = w.any3d ? this.options.zoomSnap : 1;
          return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          H(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(t, e) {
          var i = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
        },
        _createAnimProxy: function() {
          var t = this._proxy = z("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var i = li, n = this._proxy.style[i];
            Ct(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), n === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          U(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var t = this.getCenter(), e = this.getZoom();
          Ct(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
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
          var n = this.getZoomScale(e), o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
          return i.animate !== !0 && !this.getSize().contains(o) ? !1 : (Q(function() {
            this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, i, n) {
          this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, k(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: n
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(g(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && H(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Eo(t, e) {
        return new I(t, e);
      }
      var lt = _t.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(t) {
          Z(this, t);
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
          var e = this._container = this.onAdd(t), i = this.getPosition(), n = t._controlCorners[i];
          return k(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (U(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(t) {
          this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
        }
      }), ae = function(t) {
        return new lt(t);
      };
      I.include({
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
          var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = z("div", e + "control-container", this._container);
          function n(o, a) {
            var l = e + o + " " + e + a;
            t[o + a] = z("div", l, i);
          }
          n("top", "left"), n("top", "right"), n("bottom", "left"), n("bottom", "right");
        },
        _clearControlPos: function() {
          for (var t in this._controlCorners)
            U(this._controlCorners[t]);
          U(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var Bn = lt.extend({
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
          sortFunction: function(t, e, i, n) {
            return i < n ? -1 : n < i ? 1 : 0;
          }
        },
        initialize: function(t, e, i) {
          Z(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
          for (var n in t)
            this._addLayer(t[n], n);
          for (n in e)
            this._addLayer(e[n], n, !0);
        },
        onAdd: function(t) {
          this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
          for (var e = 0; e < this._layers.length; e++)
            this._layers[e].layer.on("add remove", this._onLayerChange, this);
          return this._container;
        },
        addTo: function(t) {
          return lt.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
          var e = this._getLayer(f(t));
          return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          k(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return t < this._section.clientHeight ? (k(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : H(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return H(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var t = "leaflet-control-layers", e = this._container = z("div", t), i = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), re(e), bi(e);
          var n = this._section = z("section", t + "-list");
          i && (this._map.on("click", this.collapse, this), C(e, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var o = this._layersLink = z("a", t + "-toggle", e);
          o.href = "#", o.title = "Layers", o.setAttribute("role", "button"), C(o, {
            keydown: function(a) {
              a.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(a) {
              K(a), this._expandSafely();
            }
          }, this), i || this.expand(), this._baseLayersList = z("div", t + "-base", n), this._separator = z("div", t + "-separator", n), this._overlaysList = z("div", t + "-overlays", n), e.appendChild(n);
        },
        _getLayer: function(t) {
          for (var e = 0; e < this._layers.length; e++)
            if (this._layers[e] && f(this._layers[e].layer) === t)
              return this._layers[e];
        },
        _addLayer: function(t, e, i) {
          this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: t,
            name: e,
            overlay: i
          }), this.options.sortLayers && this._layers.sort(g(function(n, o) {
            return this.options.sortFunction(n.layer, o.layer, n.name, o.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Ee(this._baseLayersList), Ee(this._overlaysList), this._layerControlInputs = [];
          var t, e, i, n, o = 0;
          for (i = 0; i < this._layers.length; i++)
            n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
        },
        _onLayerChange: function(t) {
          this._handlingClick || this._update();
          var e = this._getLayer(f(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
          i && this._map.fire(i, e);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(t, e) {
          var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", n = document.createElement("div");
          return n.innerHTML = i, n.firstChild;
        },
        _addItem: function(t) {
          var e = document.createElement("label"), i = this._map.hasLayer(t.layer), n;
          t.overlay ? (n = document.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = i) : n = this._createRadioElement("leaflet-base-layers_" + f(this), i), this._layerControlInputs.push(n), n.layerId = f(t.layer), C(n, "click", this._onInputClick, this);
          var o = document.createElement("span");
          o.innerHTML = " " + t.name;
          var a = document.createElement("span");
          e.appendChild(a), a.appendChild(n), a.appendChild(o);
          var l = t.overlay ? this._overlaysList : this._baseLayersList;
          return l.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, i, n = [], o = [];
            this._handlingClick = !0;
            for (var a = t.length - 1; a >= 0; a--)
              e = t[a], i = this._getLayer(e.layerId).layer, e.checked ? n.push(i) : e.checked || o.push(i);
            for (a = 0; a < o.length; a++)
              this._map.hasLayer(o[a]) && this._map.removeLayer(o[a]);
            for (a = 0; a < n.length; a++)
              this._map.hasLayer(n[a]) || this._map.addLayer(n[a]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, i, n = this._map.getZoom(), o = t.length - 1; o >= 0; o--)
            e = t[o], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && n < i.options.minZoom || i.options.maxZoom !== void 0 && n > i.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var t = this._section;
          this._preventClick = !0, C(t, "click", K), this.expand();
          var e = this;
          setTimeout(function() {
            B(t, "click", K), e._preventClick = !1;
          });
        }
      }), So = function(t, e, i) {
        return new Bn(t, e, i);
      }, Pi = lt.extend({
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
          var e = "leaflet-control-zoom", i = z("div", e + " leaflet-bar"), n = this.options;
          return this._zoomInButton = this._createButton(
            n.zoomInText,
            n.zoomInTitle,
            e + "-in",
            i,
            this._zoomIn
          ), this._zoomOutButton = this._createButton(
            n.zoomOutText,
            n.zoomOutTitle,
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
        _createButton: function(t, e, i, n, o) {
          var a = z("a", i, n);
          return a.innerHTML = t, a.href = "#", a.title = e, a.setAttribute("role", "button"), a.setAttribute("aria-label", e), re(a), C(a, "click", At), C(a, "click", o, this), C(a, "click", this._refocusOnMap, this), a;
        },
        _updateDisabled: function() {
          var t = this._map, e = "leaflet-disabled";
          H(this._zoomInButton, e), H(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (k(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (k(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      I.mergeOptions({
        zoomControl: !0
      }), I.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new Pi(), this.addControl(this.zoomControl));
      });
      var Co = function(t) {
        return new Pi(t);
      }, Rn = lt.extend({
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
          var e = "leaflet-control-scale", i = z("div", e), n = this.options;
          return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
        },
        onRemove: function(t) {
          t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(t, e, i) {
          t.metric && (this._mScale = z("div", e, i)), t.imperial && (this._iScale = z("div", e, i));
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
          var e = t * 3.2808399, i, n, o;
          e > 5280 ? (i = e / 5280, n = this._getRoundNum(i), this._updateScale(this._iScale, n + " mi", n / i)) : (o = this._getRoundNum(e), this._updateScale(this._iScale, o + " ft", o / e));
        },
        _updateScale: function(t, e, i) {
          t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
          return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
        }
      }), ko = function(t) {
        return new Rn(t);
      }, $o = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Ti = lt.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (w.inlineSvg ? $o + " " : "") + "Leaflet</a>"
        },
        initialize: function(t) {
          Z(this, t), this._attributions = {};
        },
        onAdd: function(t) {
          t.attributionControl = this, this._container = z("div", "leaflet-control-attribution"), re(this._container);
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
      I.mergeOptions({
        attributionControl: !0
      }), I.addInitHook(function() {
        this.options.attributionControl && new Ti().addTo(this);
      });
      var Ao = function(t) {
        return new Ti(t);
      };
      lt.Layers = Bn, lt.Zoom = Pi, lt.Scale = Rn, lt.Attribution = Ti, ae.layers = So, ae.zoom = Co, ae.scale = ko, ae.attribution = Ao;
      var pt = _t.extend({
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
      pt.addTo = function(t, e) {
        return t.addHandler(e, this), this;
      };
      var Mo = { Events: nt }, Nn = w.touch ? "touchstart mousedown" : "mousedown", Tt = Jt.extend({
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
        initialize: function(t, e, i, n) {
          Z(this, n), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (C(this._dragStartTarget, Nn, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Tt._dragging === this && this.finishDrag(!0), B(this._dragStartTarget, Nn, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(t) {
          if (this._enabled && (this._moved = !1, !ci(this._element, "leaflet-zoom-anim"))) {
            if (t.touches && t.touches.length !== 1) {
              Tt._dragging === this && this.finishDrag();
              return;
            }
            if (!(Tt._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Tt._dragging = this, this._preventOutline && _i(this._element), pi(), ne(), !this._moving)) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t, i = Mn(this._element);
              this._startPoint = new S(e.clientX, e.clientY), this._startPos = kt(this._element), this._parentScale = gi(i);
              var n = t.type === "mousedown";
              C(document, n ? "mousemove" : "touchmove", this._onMove, this), C(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(t) {
          if (this._enabled) {
            if (t.touches && t.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new S(e.clientX, e.clientY)._subtract(this._startPoint);
            !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, K(t), this._moved || (this.fire("dragstart"), this._moved = !0, k(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), k(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var t = { originalEvent: this._lastEvent };
          this.fire("predrag", t), W(this._element, this._newPos), this.fire("drag", t);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(t) {
          H(document.body, "leaflet-dragging"), this._lastTarget && (H(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), B(document, "mousemove touchmove", this._onMove, this), B(document, "mouseup touchend touchcancel", this._onUp, this), fi(), se();
          var e = this._moved && this._moving;
          this._moving = !1, Tt._dragging = !1, e && this.fire("dragend", {
            noInertia: t,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function Un(t, e, i) {
        var n, o = [1, 4, 2, 8], a, l, d, p, _, x, T, $;
        for (a = 0, x = t.length; a < x; a++)
          t[a]._code = Mt(t[a], e);
        for (d = 0; d < 4; d++) {
          for (T = o[d], n = [], a = 0, x = t.length, l = x - 1; a < x; l = a++)
            p = t[a], _ = t[l], p._code & T ? _._code & T || ($ = Ae(_, p, T, e, i), $._code = Mt($, e), n.push($)) : (_._code & T && ($ = Ae(_, p, T, e, i), $._code = Mt($, e), n.push($)), n.push(p));
          t = n;
        }
        return t;
      }
      function Hn(t, e) {
        var i, n, o, a, l, d, p, _, x;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        rt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var T = M([0, 0]), $ = F(t), J = $.getNorthWest().distanceTo($.getSouthWest()) * $.getNorthEast().distanceTo($.getNorthWest());
        J < 1700 && (T = Li(t));
        var G = t.length, at = [];
        for (i = 0; i < G; i++) {
          var it = M(t[i]);
          at.push(e.project(M([it.lat - T.lat, it.lng - T.lng])));
        }
        for (d = p = _ = 0, i = 0, n = G - 1; i < G; n = i++)
          o = at[i], a = at[n], l = o.y * a.x - a.y * o.x, p += (o.x + a.x) * l, _ += (o.y + a.y) * l, d += l * 3;
        d === 0 ? x = at[0] : x = [p / d, _ / d];
        var Gt = e.unproject(E(x));
        return M([Gt.lat + T.lat, Gt.lng + T.lng]);
      }
      function Li(t) {
        for (var e = 0, i = 0, n = 0, o = 0; o < t.length; o++) {
          var a = M(t[o]);
          e += a.lat, i += a.lng, n++;
        }
        return M([e / n, i / n]);
      }
      var Io = {
        __proto__: null,
        clipPolygon: Un,
        polygonCenter: Hn,
        centroid: Li
      };
      function Fn(t, e) {
        if (!e || !t.length)
          return t.slice();
        var i = e * e;
        return t = Oo(t, i), t = Do(t, i), t;
      }
      function Wn(t, e, i) {
        return Math.sqrt(he(t, e, i, !0));
      }
      function zo(t, e, i) {
        return he(t, e, i);
      }
      function Do(t, e) {
        var i = t.length, n = typeof Uint8Array < "u" ? Uint8Array : Array, o = new n(i);
        o[0] = o[i - 1] = 1, Ei(t, o, e, 0, i - 1);
        var a, l = [];
        for (a = 0; a < i; a++)
          o[a] && l.push(t[a]);
        return l;
      }
      function Ei(t, e, i, n, o) {
        var a = 0, l, d, p;
        for (d = n + 1; d <= o - 1; d++)
          p = he(t[d], t[n], t[o], !0), p > a && (l = d, a = p);
        a > i && (e[l] = 1, Ei(t, e, i, n, l), Ei(t, e, i, l, o));
      }
      function Oo(t, e) {
        for (var i = [t[0]], n = 1, o = 0, a = t.length; n < a; n++)
          Zo(t[n], t[o]) > e && (i.push(t[n]), o = n);
        return o < a - 1 && i.push(t[a - 1]), i;
      }
      var qn;
      function Gn(t, e, i, n, o) {
        var a = n ? qn : Mt(t, i), l = Mt(e, i), d, p, _;
        for (qn = l; ; ) {
          if (!(a | l))
            return [t, e];
          if (a & l)
            return !1;
          d = a || l, p = Ae(t, e, d, i, o), _ = Mt(p, i), d === a ? (t = p, a = _) : (e = p, l = _);
        }
      }
      function Ae(t, e, i, n, o) {
        var a = e.x - t.x, l = e.y - t.y, d = n.min, p = n.max, _, x;
        return i & 8 ? (_ = t.x + a * (p.y - t.y) / l, x = p.y) : i & 4 ? (_ = t.x + a * (d.y - t.y) / l, x = d.y) : i & 2 ? (_ = p.x, x = t.y + l * (p.x - t.x) / a) : i & 1 && (_ = d.x, x = t.y + l * (d.x - t.x) / a), new S(_, x, o);
      }
      function Mt(t, e) {
        var i = 0;
        return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
      }
      function Zo(t, e) {
        var i = e.x - t.x, n = e.y - t.y;
        return i * i + n * n;
      }
      function he(t, e, i, n) {
        var o = e.x, a = e.y, l = i.x - o, d = i.y - a, p = l * l + d * d, _;
        return p > 0 && (_ = ((t.x - o) * l + (t.y - a) * d) / p, _ > 1 ? (o = i.x, a = i.y) : _ > 0 && (o += l * _, a += d * _)), l = t.x - o, d = t.y - a, n ? l * l + d * d : new S(o, a);
      }
      function rt(t) {
        return !ht(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function Vn(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), rt(t);
      }
      function jn(t, e) {
        var i, n, o, a, l, d, p, _;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        rt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var x = M([0, 0]), T = F(t), $ = T.getNorthWest().distanceTo(T.getSouthWest()) * T.getNorthEast().distanceTo(T.getNorthWest());
        $ < 1700 && (x = Li(t));
        var J = t.length, G = [];
        for (i = 0; i < J; i++) {
          var at = M(t[i]);
          G.push(e.project(M([at.lat - x.lat, at.lng - x.lng])));
        }
        for (i = 0, n = 0; i < J - 1; i++)
          n += G[i].distanceTo(G[i + 1]) / 2;
        if (n === 0)
          _ = G[0];
        else
          for (i = 0, a = 0; i < J - 1; i++)
            if (l = G[i], d = G[i + 1], o = l.distanceTo(d), a += o, a > n) {
              p = (a - n) / o, _ = [
                d.x - p * (d.x - l.x),
                d.y - p * (d.y - l.y)
              ];
              break;
            }
        var it = e.unproject(E(_));
        return M([it.lat + x.lat, it.lng + x.lng]);
      }
      var Bo = {
        __proto__: null,
        simplify: Fn,
        pointToSegmentDistance: Wn,
        closestPointOnSegment: zo,
        clipSegment: Gn,
        _getEdgeIntersection: Ae,
        _getBitCode: Mt,
        _sqClosestPointOnSegment: he,
        isFlat: rt,
        _flat: Vn,
        polylineCenter: jn
      }, Si = {
        project: function(t) {
          return new S(t.lng, t.lat);
        },
        unproject: function(t) {
          return new O(t.y, t.x);
        },
        bounds: new N([-180, -90], [180, 90])
      }, Ci = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new N([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, i = this.R, n = t.lat * e, o = this.R_MINOR / i, a = Math.sqrt(1 - o * o), l = a * Math.sin(n), d = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - l) / (1 + l), a / 2);
          return n = -i * Math.log(Math.max(d, 1e-10)), new S(t.lng * e * i, n);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, i = this.R, n = this.R_MINOR / i, o = Math.sqrt(1 - n * n), a = Math.exp(-t.y / i), l = Math.PI / 2 - 2 * Math.atan(a), d = 0, p = 0.1, _; d < 15 && Math.abs(p) > 1e-7; d++)
            _ = o * Math.sin(l), _ = Math.pow((1 - _) / (1 + _), o / 2), p = Math.PI / 2 - 2 * Math.atan(a * _) - l, l += p;
          return new O(l * e, t.x * e / i);
        }
      }, Ro = {
        __proto__: null,
        LonLat: Si,
        Mercator: Ci,
        SphericalMercator: ti
      }, No = c({}, Pt, {
        code: "EPSG:3395",
        projection: Ci,
        transformation: (function() {
          var t = 0.5 / (Math.PI * Ci.R);
          return Qt(t, 0.5, -t, 0.5);
        })()
      }), Kn = c({}, Pt, {
        code: "EPSG:4326",
        projection: Si,
        transformation: Qt(1 / 180, 1, -1 / 180, 0.5)
      }), Uo = c({}, gt, {
        projection: Si,
        transformation: Qt(1, 0, -1, 0),
        scale: function(t) {
          return Math.pow(2, t);
        },
        zoom: function(t) {
          return Math.log(t) / Math.LN2;
        },
        distance: function(t, e) {
          var i = e.lng - t.lng, n = e.lat - t.lat;
          return Math.sqrt(i * i + n * n);
        },
        infinite: !0
      });
      gt.Earth = Pt, gt.EPSG3395 = No, gt.EPSG3857 = ii, gt.EPSG900913 = Gs, gt.EPSG4326 = Kn, gt.Simple = Uo;
      var ct = Jt.extend({
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
          return this._map._targets[f(t)] = this, this;
        },
        removeInteractiveTarget: function(t) {
          return delete this._map._targets[f(t)], this;
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
      I.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(t) {
          if (!t._layerAdd)
            throw new Error("The provided object is not a Layer.");
          var e = f(t);
          return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(t) {
          var e = f(t);
          return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(t) {
          return f(t) in this._layers;
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
          t = t ? ht(t) ? t : [t] : [];
          for (var e = 0, i = t.length; e < i; e++)
            this.addLayer(t[e]);
        },
        _addZoomLimit: function(t) {
          (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[f(t)] = t, this._updateZoomLevels());
        },
        _removeZoomLimit: function(t) {
          var e = f(t);
          this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
          var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
          for (var n in this._zoomBoundLayers) {
            var o = this._zoomBoundLayers[n].options;
            t = o.minZoom === void 0 ? t : Math.min(t, o.minZoom), e = o.maxZoom === void 0 ? e : Math.max(e, o.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Ut = ct.extend({
        initialize: function(t, e) {
          Z(this, e), this._layers = {};
          var i, n;
          if (t)
            for (i = 0, n = t.length; i < n; i++)
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
          var e = Array.prototype.slice.call(arguments, 1), i, n;
          for (i in this._layers)
            n = this._layers[i], n[t] && n[t].apply(n, e);
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
          return f(t);
        }
      }), Ho = function(t, e) {
        return new Ut(t, e);
      }, vt = Ut.extend({
        addLayer: function(t) {
          return this.hasLayer(t) ? this : (t.addEventParent(this), Ut.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
        },
        removeLayer: function(t) {
          return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Ut.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
          var t = new et();
          for (var e in this._layers) {
            var i = this._layers[e];
            t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
          }
          return t;
        }
      }), Fo = function(t, e) {
        return new vt(t, e);
      }, Ht = _t.extend({
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
          Z(this, t);
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
          var n = this._createImg(i, e && e.tagName === "IMG" ? e : null);
          return this._setIconStyles(n, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), n;
        },
        _setIconStyles: function(t, e) {
          var i = this.options, n = i[e + "Size"];
          typeof n == "number" && (n = [n, n]);
          var o = E(n), a = E(e === "shadow" && i.shadowAnchor || i.iconAnchor || o && o.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (i.className || ""), a && (t.style.marginLeft = -a.x + "px", t.style.marginTop = -a.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return w.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function Wo(t) {
        return new Ht(t);
      }
      var le = Ht.extend({
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
          return typeof le.imagePath != "string" && (le.imagePath = this._detectIconPath()), (this.options.imagePath || le.imagePath) + Ht.prototype._getIconUrl.call(this, t);
        },
        _stripUrl: function(t) {
          var e = function(i, n, o) {
            var a = n.exec(i);
            return a && a[o];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = z("div", "leaflet-default-icon-path", document.body), e = ie(t, "background-image") || ie(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var i = document.querySelector('link[href$="leaflet.css"]');
          return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
        }
      }), Yn = pt.extend({
        initialize: function(t) {
          this._marker = t;
        },
        addHooks: function() {
          var t = this._marker._icon;
          this._draggable || (this._draggable = new Tt(t, t, !0)), this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable(), k(t, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && H(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(t) {
          var e = this._marker, i = e._map, n = this._marker.options.autoPanSpeed, o = this._marker.options.autoPanPadding, a = kt(e._icon), l = i.getPixelBounds(), d = i.getPixelOrigin(), p = tt(
            l.min._subtract(d).add(o),
            l.max._subtract(d).subtract(o)
          );
          if (!p.contains(a)) {
            var _ = E(
              (Math.max(p.max.x, a.x) - p.max.x) / (l.max.x - p.max.x) - (Math.min(p.min.x, a.x) - p.min.x) / (l.min.x - p.min.x),
              (Math.max(p.max.y, a.y) - p.max.y) / (l.max.y - p.max.y) - (Math.min(p.min.y, a.y) - p.min.y) / (l.min.y - p.min.y)
            ).multiplyBy(n);
            i.panBy(_, { animate: !1 }), this._draggable._newPos._add(_), this._draggable._startPos._add(_), W(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Q(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (st(this._panRequest), this._panRequest = Q(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, i = e._shadow, n = kt(e._icon), o = e._map.layerPointToLatLng(n);
          i && W(i, n), e._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          st(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
        }
      }), Me = ct.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new le(),
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
          Z(this, e), this._latlng = M(t);
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
          return this._latlng = M(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
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
          var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), n = !1;
          i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), k(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && C(i, "focus", this._panOnFocus, this);
          var o = t.icon.createShadow(this._shadow), a = !1;
          o !== this._shadow && (this._removeShadow(), a = !0), o && (k(o, e), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && a && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && B(this._icon, "focus", this._panOnFocus, this), U(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && U(this._shadow), this._shadow = null;
        },
        _setPos: function(t) {
          this._icon && W(this._icon, t), this._shadow && W(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(t) {
          this._icon && (this._icon.style.zIndex = this._zIndex + t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
          this._setPos(e);
        },
        _initInteraction: function() {
          if (this.options.interactive && (k(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Yn)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Yn(this), t && this.dragging.enable();
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
            var e = this.options.icon.options, i = e.iconSize ? E(e.iconSize) : E(0, 0), n = e.iconAnchor ? E(e.iconAnchor) : E(0, 0);
            t.panInside(this._latlng, {
              paddingTopLeft: n,
              paddingBottomRight: i.subtract(n)
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
      function qo(t, e) {
        return new Me(t, e);
      }
      var Lt = ct.extend({
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
          return Z(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
      }), Ie = Lt.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(t, e) {
          Z(this, e), this._latlng = M(t), this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(t) {
          var e = this._latlng;
          return this._latlng = M(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
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
          return Lt.prototype.setStyle.call(this, t), this.setRadius(e), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), n = [t + i, e + i];
          this._pxBounds = new N(this._point.subtract(n), this._point.add(n));
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
      function Go(t, e) {
        return new Ie(t, e);
      }
      var ki = Ie.extend({
        initialize: function(t, e, i) {
          if (typeof e == "number" && (e = c({}, i, { radius: e })), Z(this, e), this._latlng = M(t), isNaN(this.options.radius))
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
          return new et(
            this._map.layerPointToLatLng(this._point.subtract(t)),
            this._map.layerPointToLatLng(this._point.add(t))
          );
        },
        setStyle: Lt.prototype.setStyle,
        _project: function() {
          var t = this._latlng.lng, e = this._latlng.lat, i = this._map, n = i.options.crs;
          if (n.distance === Pt.distance) {
            var o = Math.PI / 180, a = this._mRadius / Pt.R / o, l = i.project([e + a, t]), d = i.project([e - a, t]), p = l.add(d).divideBy(2), _ = i.unproject(p).lat, x = Math.acos((Math.cos(a * o) - Math.sin(e * o) * Math.sin(_ * o)) / (Math.cos(e * o) * Math.cos(_ * o))) / o;
            (isNaN(x) || x === 0) && (x = a / Math.cos(Math.PI / 180 * e)), this._point = p.subtract(i.getPixelOrigin()), this._radius = isNaN(x) ? 0 : p.x - i.project([_, t - x]).x, this._radiusY = p.y - l.y;
          } else {
            var T = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(T).x;
          }
          this._updateBounds();
        }
      });
      function Vo(t, e, i) {
        return new ki(t, e, i);
      }
      var yt = Lt.extend({
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
          Z(this, e), this._setLatLngs(t);
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
          for (var e = 1 / 0, i = null, n = he, o, a, l = 0, d = this._parts.length; l < d; l++)
            for (var p = this._parts[l], _ = 1, x = p.length; _ < x; _++) {
              o = p[_ - 1], a = p[_];
              var T = n(t, o, a, !0);
              T < e && (e = T, i = n(t, o, a));
            }
          return i && (i.distance = Math.sqrt(e)), i;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return jn(this._defaultShape(), this._map.options.crs);
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
          return e = e || this._defaultShape(), t = M(t), e.push(t), this._bounds.extend(t), this.redraw();
        },
        _setLatLngs: function(t) {
          this._bounds = new et(), this._latlngs = this._convertLatLngs(t);
        },
        _defaultShape: function() {
          return rt(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(t) {
          for (var e = [], i = rt(t), n = 0, o = t.length; n < o; n++)
            i ? (e[n] = M(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
          return e;
        },
        _project: function() {
          var t = new N();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
        },
        _updateBounds: function() {
          var t = this._clickTolerance(), e = new S(t, t);
          this._rawPxBounds && (this._pxBounds = new N([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(t, e, i) {
          var n = t[0] instanceof O, o = t.length, a, l;
          if (n) {
            for (l = [], a = 0; a < o; a++)
              l[a] = this._map.latLngToLayerPoint(t[a]), i.extend(l[a]);
            e.push(l);
          } else
            for (a = 0; a < o; a++)
              this._projectLatlngs(t[a], e, i);
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var t = this._renderer._bounds;
          if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var e = this._parts, i, n, o, a, l, d, p;
            for (i = 0, o = 0, a = this._rings.length; i < a; i++)
              for (p = this._rings[i], n = 0, l = p.length; n < l - 1; n++)
                d = Gn(p[n], p[n + 1], t, n, !0), d && (e[o] = e[o] || [], e[o].push(d[0]), (d[1] !== p[n + 1] || n === l - 2) && (e[o].push(d[1]), o++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++)
            t[i] = Fn(t[i], e);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t, e) {
          var i, n, o, a, l, d, p = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (i = 0, a = this._parts.length; i < a; i++)
            for (d = this._parts[i], n = 0, l = d.length, o = l - 1; n < l; o = n++)
              if (!(!e && n === 0) && Wn(t, d[o], d[n]) <= p)
                return !0;
          return !1;
        }
      });
      function jo(t, e) {
        return new yt(t, e);
      }
      yt._flat = Vn;
      var Ft = yt.extend({
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
          return Hn(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(t) {
          var e = yt.prototype._convertLatLngs.call(this, t), i = e.length;
          return i >= 2 && e[0] instanceof O && e[0].equals(e[i - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          yt.prototype._setLatLngs.call(this, t), rt(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return rt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, i = new S(e, e);
          if (t = new N(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var n = 0, o = this._rings.length, a; n < o; n++)
              a = Un(this._rings[n], t, !0), a.length && this._parts.push(a);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, i, n, o, a, l, d, p, _;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (a = 0, p = this._parts.length; a < p; a++)
            for (i = this._parts[a], l = 0, _ = i.length, d = _ - 1; l < _; d = l++)
              n = i[l], o = i[d], n.y > t.y != o.y > t.y && t.x < (o.x - n.x) * (t.y - n.y) / (o.y - n.y) + n.x && (e = !e);
          return e || yt.prototype._containsPoint.call(this, t, !0);
        }
      });
      function Ko(t, e) {
        return new Ft(t, e);
      }
      var xt = vt.extend({
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
          Z(this, e), this._layers = {}, t && this.addData(t);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(t) {
          var e = ht(t) ? t : t.features, i, n, o;
          if (e) {
            for (i = 0, n = e.length; i < n; i++)
              o = e[i], (o.geometries || o.geometry || o.features || o.coordinates) && this.addData(o);
            return this;
          }
          var a = this.options;
          if (a.filter && !a.filter(t))
            return this;
          var l = ze(t, a);
          return l ? (l.feature = Ze(t), l.defaultOptions = l.options, this.resetStyle(l), a.onEachFeature && a.onEachFeature(t, l), this.addLayer(l)) : this;
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(t) {
          return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = c({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
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
      function ze(t, e) {
        var i = t.type === "Feature" ? t.geometry : t, n = i ? i.coordinates : null, o = [], a = e && e.pointToLayer, l = e && e.coordsToLatLng || $i, d, p, _, x;
        if (!n && !i)
          return null;
        switch (i.type) {
          case "Point":
            return d = l(n), Xn(a, t, d, e);
          case "MultiPoint":
            for (_ = 0, x = n.length; _ < x; _++)
              d = l(n[_]), o.push(Xn(a, t, d, e));
            return new vt(o);
          case "LineString":
          case "MultiLineString":
            return p = De(n, i.type === "LineString" ? 0 : 1, l), new yt(p, e);
          case "Polygon":
          case "MultiPolygon":
            return p = De(n, i.type === "Polygon" ? 1 : 2, l), new Ft(p, e);
          case "GeometryCollection":
            for (_ = 0, x = i.geometries.length; _ < x; _++) {
              var T = ze({
                geometry: i.geometries[_],
                type: "Feature",
                properties: t.properties
              }, e);
              T && o.push(T);
            }
            return new vt(o);
          case "FeatureCollection":
            for (_ = 0, x = i.features.length; _ < x; _++) {
              var $ = ze(i.features[_], e);
              $ && o.push($);
            }
            return new vt(o);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function Xn(t, e, i, n) {
        return t ? t(e, i) : new Me(i, n && n.markersInheritOptions && n);
      }
      function $i(t) {
        return new O(t[1], t[0], t[2]);
      }
      function De(t, e, i) {
        for (var n = [], o = 0, a = t.length, l; o < a; o++)
          l = e ? De(t[o], e - 1, i) : (i || $i)(t[o]), n.push(l);
        return n;
      }
      function Ai(t, e) {
        return t = M(t), t.alt !== void 0 ? [R(t.lng, e), R(t.lat, e), R(t.alt, e)] : [R(t.lng, e), R(t.lat, e)];
      }
      function Oe(t, e, i, n) {
        for (var o = [], a = 0, l = t.length; a < l; a++)
          o.push(e ? Oe(t[a], rt(t[a]) ? 0 : e - 1, i, n) : Ai(t[a], n));
        return !e && i && o.length > 0 && o.push(o[0].slice()), o;
      }
      function Wt(t, e) {
        return t.feature ? c({}, t.feature, { geometry: e }) : Ze(e);
      }
      function Ze(t) {
        return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        };
      }
      var Mi = {
        toGeoJSON: function(t) {
          return Wt(this, {
            type: "Point",
            coordinates: Ai(this.getLatLng(), t)
          });
        }
      };
      Me.include(Mi), ki.include(Mi), Ie.include(Mi), yt.include({
        toGeoJSON: function(t) {
          var e = !rt(this._latlngs), i = Oe(this._latlngs, e ? 1 : 0, !1, t);
          return Wt(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: i
          });
        }
      }), Ft.include({
        toGeoJSON: function(t) {
          var e = !rt(this._latlngs), i = e && !rt(this._latlngs[0]), n = Oe(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
          return e || (n = [n]), Wt(this, {
            type: (i ? "Multi" : "") + "Polygon",
            coordinates: n
          });
        }
      }), Ut.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(i) {
            e.push(i.toGeoJSON(t).geometry.coordinates);
          }), Wt(this, {
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
          var i = e === "GeometryCollection", n = [];
          return this.eachLayer(function(o) {
            if (o.toGeoJSON) {
              var a = o.toGeoJSON(t);
              if (i)
                n.push(a.geometry);
              else {
                var l = Ze(a);
                l.type === "FeatureCollection" ? n.push.apply(n, l.features) : n.push(l);
              }
            }
          }), i ? Wt(this, {
            geometries: n,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: n
          };
        }
      });
      function Jn(t, e) {
        return new xt(t, e);
      }
      var Yo = Jn, Be = ct.extend({
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
          this._url = t, this._bounds = F(e), Z(this, i);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (k(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
        },
        onRemove: function() {
          U(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
          return this._map && Rt(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && Nt(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(t) {
          return this._url = t, this._image && (this._image.src = t), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(t) {
          return this._bounds = F(t), this._map && this._reset(), this;
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
          var t = this._url.tagName === "IMG", e = this._image = t ? this._url : z("img");
          if (k(e, "leaflet-image-layer"), this._zoomAnimated && k(e, "leaflet-zoom-animated"), this.options.className && k(e, this.options.className), e.onselectstart = P, e.onmousemove = P, e.onload = g(this.fire, this, "load"), e.onerror = g(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
            this._url = e.src;
            return;
          }
          e.src = this._url, e.alt = this.options.alt;
        },
        _animateZoom: function(t) {
          var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
          Ct(this._image, i, e);
        },
        _reset: function() {
          var t = this._image, e = new N(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), i = e.getSize();
          W(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
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
      }), Xo = function(t, e, i) {
        return new Be(t, e, i);
      }, Qn = Be.extend({
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
          var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : z("video");
          if (k(e, "leaflet-image-layer"), this._zoomAnimated && k(e, "leaflet-zoom-animated"), this.options.className && k(e, this.options.className), e.onselectstart = P, e.onmousemove = P, e.onloadeddata = g(this.fire, this, "load"), t) {
            for (var i = e.getElementsByTagName("source"), n = [], o = 0; o < i.length; o++)
              n.push(i[o].src);
            this._url = i.length > 0 ? n : [e.src];
            return;
          }
          ht(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
          for (var a = 0; a < this._url.length; a++) {
            var l = z("source");
            l.src = this._url[a], e.appendChild(l);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function Jo(t, e, i) {
        return new Qn(t, e, i);
      }
      var ts = Be.extend({
        _initImage: function() {
          var t = this._image = this._url;
          k(t, "leaflet-image-layer"), this._zoomAnimated && k(t, "leaflet-zoom-animated"), this.options.className && k(t, this.options.className), t.onselectstart = P, t.onmousemove = P;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function Qo(t, e, i) {
        return new ts(t, e, i);
      }
      var ft = ct.extend({
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
          t && (t instanceof O || ht(t)) ? (this._latlng = M(t), Z(this, e)) : (Z(this, t), this._source = e), this.options.content && (this._content = this.options.content);
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
          this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && ot(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && ot(this._container, 1), this.bringToFront(), this.options.interactive && (k(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(t) {
          t._fadeAnimated ? (ot(this._container, 0), this._removeTimeout = setTimeout(g(U, void 0, this._container), 200)) : U(this._container), this.options.interactive && (H(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
          return this._latlng = M(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
          return this._map && Rt(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && Nt(this._container), this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(t) {
          var e = this._source;
          if (!e._map)
            return !1;
          if (e instanceof vt) {
            e = null;
            var i = this._source._layers;
            for (var n in i)
              if (i[n]._map) {
                e = i[n];
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
            var t = this._map.latLngToLayerPoint(this._latlng), e = E(this.options.offset), i = this._getAnchor();
            this._zoomAnimated ? W(this._container, t.add(i)) : e = e.add(t).add(i);
            var n = this._containerBottom = -e.y, o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = n + "px", this._container.style.left = o + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      I.include({
        _initOverlay: function(t, e, i, n) {
          var o = e;
          return o instanceof t || (o = new t(n).setContent(e)), i && o.setLatLng(i), o;
        }
      }), ct.include({
        _initOverlay: function(t, e, i, n) {
          var o = i;
          return o instanceof t ? (Z(o, n), o._source = this) : (o = e && !n ? e : new t(n, this), o.setContent(i)), o;
        }
      });
      var Re = ft.extend({
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
          return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, ft.prototype.openOn.call(this, t);
        },
        onAdd: function(t) {
          ft.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Lt || this._source.on("preclick", $t));
        },
        onRemove: function(t) {
          ft.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Lt || this._source.off("preclick", $t));
        },
        getEvents: function() {
          var t = ft.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
        },
        _initLayout: function() {
          var t = "leaflet-popup", e = this._container = z(
            "div",
            t + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), i = this._wrapper = z("div", t + "-content-wrapper", e);
          if (this._contentNode = z("div", t + "-content", i), re(e), bi(this._contentNode), C(e, "contextmenu", $t), this._tipContainer = z("div", t + "-tip-container", e), this._tip = z("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var n = this._closeButton = z("a", t + "-close-button", e);
            n.setAttribute("role", "button"), n.setAttribute("aria-label", "Close popup"), n.href = "#close", n.innerHTML = '<span aria-hidden="true">&#215;</span>', C(n, "click", function(o) {
              K(o), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var i = t.offsetWidth;
          i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
          var n = t.offsetHeight, o = this.options.maxHeight, a = "leaflet-popup-scrolled";
          o && n > o ? (e.height = o + "px", k(t, a)) : H(t, a), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
          W(this._container, e.add(i));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var t = this._map, e = parseInt(ie(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, n = this._containerWidth, o = new S(this._containerLeft, -i - this._containerBottom);
            o._add(kt(this._container));
            var a = t.layerPointToContainerPoint(o), l = E(this.options.autoPanPadding), d = E(this.options.autoPanPaddingTopLeft || l), p = E(this.options.autoPanPaddingBottomRight || l), _ = t.getSize(), x = 0, T = 0;
            a.x + n + p.x > _.x && (x = a.x + n - _.x + p.x), a.x - x - d.x < 0 && (x = a.x - d.x), a.y + i + p.y > _.y && (T = a.y + i - _.y + p.y), a.y - T - d.y < 0 && (T = a.y - d.y), (x || T) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([x, T]));
          }
        },
        _getAnchor: function() {
          return E(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), tr = function(t, e) {
        return new Re(t, e);
      };
      I.mergeOptions({
        closePopupOnClick: !0
      }), I.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(t, e, i) {
          return this._initOverlay(Re, t, e, i).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(t) {
          return t = arguments.length ? t : this._popup, t && t.close(), this;
        }
      }), ct.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(t, e) {
          return this._popup = this._initOverlay(Re, this._popup, t, e), this._popupHandlersAdded || (this.on({
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
          return this._popup && (this instanceof vt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
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
            At(t);
            var e = t.layer || t.target;
            if (this._popup._source === e && !(e instanceof Lt)) {
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
      var Ne = ft.extend({
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
          ft.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function(t) {
          ft.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function() {
          var t = ft.prototype.getEvents.call(this);
          return this.options.permanent || (t.preclick = this.close), t;
        },
        _initLayout: function() {
          var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = z("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + f(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(t) {
          var e, i, n = this._map, o = this._container, a = n.latLngToContainerPoint(n.getCenter()), l = n.layerPointToContainerPoint(t), d = this.options.direction, p = o.offsetWidth, _ = o.offsetHeight, x = E(this.options.offset), T = this._getAnchor();
          d === "top" ? (e = p / 2, i = _) : d === "bottom" ? (e = p / 2, i = 0) : d === "center" ? (e = p / 2, i = _ / 2) : d === "right" ? (e = 0, i = _ / 2) : d === "left" ? (e = p, i = _ / 2) : l.x < a.x ? (d = "right", e = 0, i = _ / 2) : (d = "left", e = p + (x.x + T.x) * 2, i = _ / 2), t = t.subtract(E(e, i, !0)).add(x).add(T), H(o, "leaflet-tooltip-right"), H(o, "leaflet-tooltip-left"), H(o, "leaflet-tooltip-top"), H(o, "leaflet-tooltip-bottom"), k(o, "leaflet-tooltip-" + d), W(o, t);
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
          return E(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), er = function(t, e) {
        return new Ne(t, e);
      };
      I.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, i) {
          return this._initOverlay(Ne, t, e, i).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(t) {
          return t.close(), this;
        }
      }), ct.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(t, e) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Ne, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
          return this._tooltip && (this instanceof vt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
          var e = t.latlng, i, n;
          this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), n = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(n)), this._tooltip.setLatLng(e);
        }
      });
      var es = Ht.extend({
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
          if (i.html instanceof Element ? (Ee(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
            var n = E(i.bgPos);
            e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function ir(t) {
        return new es(t);
      }
      Ht.Default = le;
      var ce = ct.extend({
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
          updateWhenIdle: w.mobile,
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
          Z(this, t);
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
        },
        beforeAdd: function(t) {
          t._addZoomLimit(this);
        },
        onRemove: function(t) {
          this._removeAllTiles(), U(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          return this._map && (Rt(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (Nt(this._container), this._setAutoZIndex(Math.min)), this;
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
          return this.options.updateWhenIdle || (this._onMove || (this._onMove = v(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
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
          return t instanceof S ? t : new S(t, t);
        },
        _updateZIndex: function() {
          this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function(t) {
          for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), n = 0, o = e.length, a; n < o; n++)
            a = e[n].style.zIndex, e[n] !== this._container && a && (i = t(i, +a));
          isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !w.ielt9) {
            ot(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
            for (var n in this._tiles) {
              var o = this._tiles[n];
              if (!(!o.current || !o.loaded)) {
                var a = Math.min(1, (t - o.loaded) / 200);
                ot(o.el, a), a < 1 ? e = !0 : (o.active ? i = !0 : this._onOpaqueTile(o), o.active = !0);
              }
            }
            i && !this._noPrune && this._pruneTiles(), e && (st(this._fadeFrame), this._fadeFrame = Q(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: P,
        _initContainer: function() {
          this._container || (this._container = z("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var t = this._tileZoom, e = this.options.maxZoom;
          if (t !== void 0) {
            for (var i in this._levels)
              i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (U(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
            var n = this._levels[t], o = this._map;
            return n || (n = this._levels[t] = {}, n.el = z("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), P(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n, n;
          }
        },
        _onUpdateLevel: P,
        _onRemoveLevel: P,
        _onCreateLevel: P,
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
                var n = e.coords;
                this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2);
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
            U(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(t, e, i, n) {
          var o = Math.floor(t / 2), a = Math.floor(e / 2), l = i - 1, d = new S(+o, +a);
          d.z = +l;
          var p = this._tileCoordsToKey(d), _ = this._tiles[p];
          return _ && _.active ? (_.retain = !0, !0) : (_ && _.loaded && (_.retain = !0), l > n ? this._retainParent(o, a, l, n) : !1);
        },
        _retainChildren: function(t, e, i, n) {
          for (var o = 2 * t; o < 2 * t + 2; o++)
            for (var a = 2 * e; a < 2 * e + 2; a++) {
              var l = new S(o, a);
              l.z = i + 1;
              var d = this._tileCoordsToKey(l), p = this._tiles[d];
              if (p && p.active) {
                p.retain = !0;
                continue;
              } else p && p.loaded && (p.retain = !0);
              i + 1 < n && this._retainChildren(o, a, i + 1, n);
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
        _setView: function(t, e, i, n) {
          var o = Math.round(e);
          this.options.maxZoom !== void 0 && o > this.options.maxZoom || this.options.minZoom !== void 0 && o < this.options.minZoom ? o = void 0 : o = this._clampZoom(o);
          var a = this.options.updateWhenZooming && o !== this._tileZoom;
          (!n || a) && (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), o !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var i in this._levels)
            this._setZoomTransform(this._levels[i], t, e);
        },
        _setZoomTransform: function(t, e, i) {
          var n = this._map.getZoomScale(i, t.zoom), o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
          w.any3d ? Ct(t.el, o, n) : W(t.el, o);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), n = this._tileZoom, o = this._map.getPixelWorldBounds(this._tileZoom);
          o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && !this.options.noWrap && [
            Math.floor(t.project([0, e.wrapLng[0]], n).x / i.x),
            Math.ceil(t.project([0, e.wrapLng[1]], n).x / i.y)
          ], this._wrapY = e.wrapLat && !this.options.noWrap && [
            Math.floor(t.project([e.wrapLat[0], 0], n).y / i.x),
            Math.ceil(t.project([e.wrapLat[1], 0], n).y / i.y)
          ];
        },
        _onMoveEnd: function() {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function(t) {
          var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), n = e.getZoomScale(i, this._tileZoom), o = e.project(t, this._tileZoom).floor(), a = e.getSize().divideBy(n * 2);
          return new N(o.subtract(a), o.add(a));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var i = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var n = this._getTiledPixelBounds(t), o = this._pxBoundsToTileRange(n), a = o.getCenter(), l = [], d = this.options.keepBuffer, p = new N(
                o.getBottomLeft().subtract([d, -d]),
                o.getTopRight().add([d, -d])
              );
              if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var _ in this._tiles) {
                var x = this._tiles[_].coords;
                (x.z !== this._tileZoom || !p.contains(new S(x.x, x.y))) && (this._tiles[_].current = !1);
              }
              if (Math.abs(i - this._tileZoom) > 1) {
                this._setView(t, i);
                return;
              }
              for (var T = o.min.y; T <= o.max.y; T++)
                for (var $ = o.min.x; $ <= o.max.x; $++) {
                  var J = new S($, T);
                  if (J.z = this._tileZoom, !!this._isValidTile(J)) {
                    var G = this._tiles[this._tileCoordsToKey(J)];
                    G ? G.current = !0 : l.push(J);
                  }
                }
              if (l.sort(function(it, Gt) {
                return it.distanceTo(a) - Gt.distanceTo(a);
              }), l.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var at = document.createDocumentFragment();
                for ($ = 0; $ < l.length; $++)
                  this._addTile(l[$], at);
                this._level.el.appendChild(at);
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
          var n = this._tileCoordsToBounds(t);
          return F(this.options.bounds).overlaps(n);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, i = this.getTileSize(), n = t.scaleBy(i), o = n.add(i), a = e.unproject(n, t.z), l = e.unproject(o, t.z);
          return [a, l];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(t) {
          var e = this._tileCoordsToNwSe(t), i = new et(e[0], e[1]);
          return this.options.noWrap || (i = this._map.wrapLatLngBounds(i)), i;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(t) {
          return t.x + ":" + t.y + ":" + t.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(t) {
          var e = t.split(":"), i = new S(+e[0], +e[1]);
          return i.z = +e[2], i;
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          e && (U(e.el), delete this._tiles[t], this.fire("tileunload", {
            tile: e.el,
            coords: this._keyToTileCoords(t)
          }));
        },
        _initTile: function(t) {
          k(t, "leaflet-tile");
          var e = this.getTileSize();
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = P, t.onmousemove = P, w.ielt9 && this.options.opacity < 1 && ot(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var i = this._getTilePos(t), n = this._tileCoordsToKey(t), o = this.createTile(this._wrapCoords(t), g(this._tileReady, this, t));
          this._initTile(o), this.createTile.length < 2 && Q(g(this._tileReady, this, t, null, o)), W(o, i), this._tiles[n] = {
            el: o,
            coords: t,
            current: !0
          }, e.appendChild(o), this.fire("tileloadstart", {
            tile: o,
            coords: t
          });
        },
        _tileReady: function(t, e, i) {
          e && this.fire("tileerror", {
            error: e,
            tile: i,
            coords: t
          });
          var n = this._tileCoordsToKey(t);
          i = this._tiles[n], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ot(i.el, 0), st(this._fadeFrame), this._fadeFrame = Q(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (k(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: i.el,
            coords: t
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), w.ielt9 || !this._map._fadeAnimated ? Q(this._pruneTiles, this) : setTimeout(g(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(t) {
          return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(t) {
          var e = new S(
            this._wrapX ? D(t.x, this._wrapX) : t.x,
            this._wrapY ? D(t.y, this._wrapY) : t.y
          );
          return e.z = t.z, e;
        },
        _pxBoundsToTileRange: function(t) {
          var e = this.getTileSize();
          return new N(
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
      function nr(t) {
        return new ce(t);
      }
      var qt = ce.extend({
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
          this._url = t, e = Z(this, e), e.detectRetina && w.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
          return C(i, "load", g(this._tileOnLoad, this, e, i)), C(i, "error", g(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(t) {
          var e = {
            r: w.retina ? "@2x" : "",
            s: this._getSubdomain(t),
            x: t.x,
            y: t.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var i = this._globalTileRange.max.y - t.y;
            this.options.tms && (e.y = i), e["-y"] = i;
          }
          return nn(this._url, c(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          w.ielt9 ? setTimeout(g(t, this, null, e), 0) : t(null, e);
        },
        _tileOnError: function(t, e, i) {
          var n = this.options.errorTileUrl;
          n && e.getAttribute("src") !== n && (e.src = n), t(i, e);
        },
        _onTileRemove: function(t) {
          t.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var t = this._tileZoom, e = this.options.maxZoom, i = this.options.zoomReverse, n = this.options.zoomOffset;
          return i && (t = e - t), t + n;
        },
        _getSubdomain: function(t) {
          var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
          return this.options.subdomains[e];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var t, e;
          for (t in this._tiles)
            if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = P, e.onerror = P, !e.complete)) {
              e.src = Pe;
              var i = this._tiles[t].coords;
              U(e), delete this._tiles[t], this.fire("tileabort", {
                tile: e,
                coords: i
              });
            }
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          if (e)
            return e.el.setAttribute("src", Pe), ce.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, i) {
          if (!(!this._map || i && i.getAttribute("src") === Pe))
            return ce.prototype._tileReady.call(this, t, e, i);
        }
      });
      function is(t, e) {
        return new qt(t, e);
      }
      var ns = qt.extend({
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
          var i = c({}, this.defaultWmsParams);
          for (var n in e)
            n in this.options || (i[n] = e[n]);
          e = Z(this, e);
          var o = e.detectRetina && w.retina ? 2 : 1, a = this.getTileSize();
          i.width = a.x * o, i.height = a.y * o, this.wmsParams = i;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, qt.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), i = this._crs, n = tt(i.project(e[0]), i.project(e[1])), o = n.min, a = n.max, l = (this._wmsVersion >= 1.3 && this._crs === Kn ? [o.y, o.x, a.y, a.x] : [o.x, o.y, a.x, a.y]).join(","), d = qt.prototype.getTileUrl.call(this, t);
          return d + we(this.wmsParams, d, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + l;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return c(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function sr(t, e) {
        return new ns(t, e);
      }
      qt.WMS = ns, is.wms = sr;
      var bt = ct.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(t) {
          Z(this, t), f(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), k(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
          var i = this._map.getZoomScale(e, this._zoom), n = this._map.getSize().multiplyBy(0.5 + this.options.padding), o = this._map.project(this._center, e), a = n.multiplyBy(-i).add(o).subtract(this._map._getNewPixelOrigin(t, e));
          w.any3d ? Ct(this._container, a, i) : W(this._container, a);
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
          this._bounds = new N(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), ss = bt.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var t = bt.prototype.getEvents.call(this);
          return t.viewprereset = this._onViewPreReset, t;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          bt.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var t = this._container = document.createElement("canvas");
          C(t, "mousemove", this._onMouseMove, this), C(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), C(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
        },
        _destroyContainer: function() {
          st(this._redrawRequest), delete this._ctx, U(this._container), B(this._container), delete this._container;
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
            bt.prototype._update.call(this);
            var t = this._bounds, e = this._container, i = t.getSize(), n = w.retina ? 2 : 1;
            W(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", w.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
          }
        },
        _reset: function() {
          bt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
        },
        _initPath: function(t) {
          this._updateDashArray(t), this._layers[f(t)] = t;
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
          var e = t._order, i = e.next, n = e.prev;
          i ? i.prev = n : this._drawLast = n, n ? n.next = i : this._drawFirst = i, delete t._order, delete this._layers[f(t)], this._requestRedraw(t);
        },
        _updatePath: function(t) {
          this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
        },
        _updateStyle: function(t) {
          this._updateDashArray(t), this._requestRedraw(t);
        },
        _updateDashArray: function(t) {
          if (typeof t.options.dashArray == "string") {
            var e = t.options.dashArray.split(/[, ]+/), i = [], n, o;
            for (o = 0; o < e.length; o++) {
              if (n = Number(e[o]), isNaN(n))
                return;
              i.push(n);
            }
            t.options._dashArray = i;
          } else
            t.options._dashArray = t.options.dashArray;
        },
        _requestRedraw: function(t) {
          this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || Q(this._redraw, this));
        },
        _extendRedrawBounds: function(t) {
          if (t._pxBounds) {
            var e = (t.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new N(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
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
          for (var n = this._drawFirst; n; n = n.next)
            t = n.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
          this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(t, e) {
          if (this._drawing) {
            var i, n, o, a, l = t._parts, d = l.length, p = this._ctx;
            if (d) {
              for (p.beginPath(), i = 0; i < d; i++) {
                for (n = 0, o = l[i].length; n < o; n++)
                  a = l[i][n], p[n ? "lineTo" : "moveTo"](a.x, a.y);
                e && p.closePath();
              }
              this._fillStroke(p, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, i = this._ctx, n = Math.max(Math.round(t._radius), 1), o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
            o !== 1 && (i.save(), i.scale(1, o)), i.beginPath(), i.arc(e.x, e.y / o, n, 0, Math.PI * 2, !1), o !== 1 && i.restore(), this._fillStroke(i, t);
          }
        },
        _fillStroke: function(t, e) {
          var i = e.options;
          i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), i, n, o = this._drawFirst; o; o = o.next)
            i = o.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (n = i);
          this._fireEvent(n ? [n] : !1, t);
        },
        _onMouseMove: function(t) {
          if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
            var e = this._map.mouseEventToLayerPoint(t);
            this._handleMouseHover(t, e);
          }
        },
        _handleMouseOut: function(t) {
          var e = this._hoveredLayer;
          e && (H(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var i, n, o = this._drawFirst; o; o = o.next)
              i = o.layer, i.options.interactive && i._containsPoint(e) && (n = i);
            n !== this._hoveredLayer && (this._handleMouseOut(t), n && (k(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(g(function() {
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
            var i = e.next, n = e.prev;
            if (i)
              i.prev = n;
            else
              return;
            n ? n.next = i : i && (this._drawFirst = i), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
          }
        },
        _bringToBack: function(t) {
          var e = t._order;
          if (e) {
            var i = e.next, n = e.prev;
            if (n)
              n.next = i;
            else
              return;
            i ? i.prev = n : n && (this._drawLast = n), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
          }
        }
      });
      function os(t) {
        return w.canvas ? new ss(t) : null;
      }
      var ue = (function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
            return document.createElement("<lvml:" + t + ' class="lvml">');
          };
        } catch {
        }
        return function(t) {
          return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })(), or = {
        _initContainer: function() {
          this._container = z("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (bt.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(t) {
          var e = t._container = ue("shape");
          k(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = ue("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[f(t)] = t;
        },
        _addPath: function(t) {
          var e = t._container;
          this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
        },
        _removePath: function(t) {
          var e = t._container;
          U(e), t.removeInteractiveTarget(e), delete this._layers[f(t)];
        },
        _updateStyle: function(t) {
          var e = t._stroke, i = t._fill, n = t.options, o = t._container;
          o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = ue("stroke")), o.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = ht(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (o.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = ue("fill")), o.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (o.removeChild(i), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), i = Math.round(t._radius), n = Math.round(t._radiusY || i);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360);
        },
        _setPath: function(t, e) {
          t._path.v = e;
        },
        _bringToFront: function(t) {
          Rt(t._container);
        },
        _bringToBack: function(t) {
          Nt(t._container);
        }
      }, Ue = w.vml ? ue : ln, de = bt.extend({
        _initContainer: function() {
          this._container = Ue("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Ue("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          U(this._container), B(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            bt.prototype._update.call(this);
            var t = this._bounds, e = t.getSize(), i = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), W(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(t) {
          var e = t._path = Ue("path");
          t.options.className && k(e, t.options.className), t.options.interactive && k(e, "leaflet-interactive"), this._updateStyle(t), this._layers[f(t)] = t;
        },
        _addPath: function(t) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
        },
        _removePath: function(t) {
          U(t._path), t.removeInteractiveTarget(t._path), delete this._layers[f(t)];
        },
        _updatePath: function(t) {
          t._project(), t._update();
        },
        _updateStyle: function(t) {
          var e = t._path, i = t.options;
          e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
        },
        _updatePoly: function(t, e) {
          this._setPath(t, cn(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, i = Math.max(Math.round(t._radius), 1), n = Math.max(Math.round(t._radiusY), 1) || i, o = "a" + i + "," + n + " 0 1,0 ", a = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + o + i * 2 + ",0 " + o + -i * 2 + ",0 ";
          this._setPath(t, a);
        },
        _setPath: function(t, e) {
          t._path.setAttribute("d", e);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(t) {
          Rt(t._path);
        },
        _bringToBack: function(t) {
          Nt(t._path);
        }
      });
      w.vml && de.include(or);
      function rs(t) {
        return w.svg || w.vml ? new de(t) : null;
      }
      I.include({
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
          return this.options.preferCanvas && os(t) || rs(t);
        }
      });
      var as = Ft.extend({
        initialize: function(t, e) {
          Ft.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(t) {
          return this.setLatLngs(this._boundsToLatLngs(t));
        },
        _boundsToLatLngs: function(t) {
          return t = F(t), [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast()
          ];
        }
      });
      function rr(t, e) {
        return new as(t, e);
      }
      de.create = Ue, de.pointsToPath = cn, xt.geometryToLayer = ze, xt.coordsToLatLng = $i, xt.coordsToLatLngs = De, xt.latLngToCoords = Ai, xt.latLngsToCoords = Oe, xt.getFeature = Wt, xt.asFeature = Ze, I.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var hs = pt.extend({
        initialize: function(t) {
          this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
        },
        addHooks: function() {
          C(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          B(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          U(this._pane), delete this._pane;
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
          this._clearDeferredResetState(), this._resetState(), ne(), pi(), this._startPoint = this._map.mouseEventToContainerPoint(t), C(document, {
            contextmenu: At,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(t) {
          this._moved || (this._moved = !0, this._box = z("div", "leaflet-zoom-box", this._container), k(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
          var e = new N(this._point, this._startPoint), i = e.getSize();
          W(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
        },
        _finish: function() {
          this._moved && (U(this._box), H(this._container, "leaflet-crosshair")), se(), fi(), B(document, {
            contextmenu: At,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(t) {
          if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(g(this._resetState, this), 0);
            var e = new et(
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
      I.addInitHook("addHandler", "boxZoom", hs), I.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var ls = pt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, i = e.getZoom(), n = e.options.zoomDelta, o = t.originalEvent.shiftKey ? i - n : i + n;
          e.options.doubleClickZoom === "center" ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o);
        }
      });
      I.addInitHook("addHandler", "doubleClickZoom", ls), I.mergeOptions({
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
      var cs = pt.extend({
        addHooks: function() {
          if (!this._draggable) {
            var t = this._map;
            this._draggable = new Tt(t._mapPane, t._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
          }
          k(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          H(this._map._container, "leaflet-grab"), H(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
            var e = F(this._map.options.maxBounds);
            this._offsetLimit = tt(
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
          var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, n = this._draggable._newPos.x, o = (n - e + i) % t + e - i, a = (n + e + i) % t - e - i, l = Math.abs(o + i) < Math.abs(a + i) ? o : a;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = l;
        },
        _onDragEnd: function(t) {
          var e = this._map, i = e.options, n = !i.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), n)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var o = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, l = i.easeLinearity, d = o.multiplyBy(l / a), p = d.distanceTo([0, 0]), _ = Math.min(i.inertiaMaxSpeed, p), x = d.multiplyBy(_ / p), T = _ / (i.inertiaDeceleration * l), $ = x.multiplyBy(-T / 2).round();
            !$.x && !$.y ? e.fire("moveend") : ($ = e._limitOffset($, e.options.maxBounds), Q(function() {
              e.panBy($, {
                duration: T,
                easeLinearity: l,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      I.addInitHook("addHandler", "dragging", cs), I.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var us = pt.extend({
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
          this._removeHooks(), B(this._map._container, {
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
            var t = document.body, e = document.documentElement, i = t.scrollTop || e.scrollTop, n = t.scrollLeft || e.scrollLeft;
            this._map._container.focus(), window.scrollTo(n, i);
          }
        },
        _onFocus: function() {
          this._focused = !0, this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = !1, this._map.fire("blur");
        },
        _setPanDelta: function(t) {
          var e = this._panKeys = {}, i = this.keyCodes, n, o;
          for (n = 0, o = i.left.length; n < o; n++)
            e[i.left[n]] = [-1 * t, 0];
          for (n = 0, o = i.right.length; n < o; n++)
            e[i.right[n]] = [t, 0];
          for (n = 0, o = i.down.length; n < o; n++)
            e[i.down[n]] = [0, t];
          for (n = 0, o = i.up.length; n < o; n++)
            e[i.up[n]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, i = this.keyCodes, n, o;
          for (n = 0, o = i.zoomIn.length; n < o; n++)
            e[i.zoomIn[n]] = t;
          for (n = 0, o = i.zoomOut.length; n < o; n++)
            e[i.zoomOut[n]] = -t;
        },
        _addHooks: function() {
          C(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          B(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, i = this._map, n;
            if (e in this._panKeys) {
              if (!i._panAnim || !i._panAnim._inProgress)
                if (n = this._panKeys[e], t.shiftKey && (n = E(n).multiplyBy(3)), i.options.maxBounds && (n = i._limitOffset(E(n), i.options.maxBounds)), i.options.worldCopyJump) {
                  var o = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));
                  i.panTo(o);
                } else
                  i.panBy(n);
            } else if (e in this._zoomKeys)
              i.setZoom(i.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
            else if (e === 27 && i._popup && i._popup.options.closeOnEscapeKey)
              i.closePopup();
            else
              return;
            At(t);
          }
        }
      });
      I.addInitHook("addHandler", "keyboard", us), I.mergeOptions({
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
      var ds = pt.extend({
        addHooks: function() {
          C(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          B(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = On(t), i = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var n = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(g(this._performZoom, this), n), At(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
          t._stop();
          var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2, a = i ? Math.ceil(o / i) * i : o, l = t._limitZoom(e + (this._delta > 0 ? a : -a)) - e;
          this._delta = 0, this._startTime = null, l && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + l) : t.setZoomAround(this._lastMousePos, e + l));
        }
      });
      I.addInitHook("addHandler", "scrollWheelZoom", ds);
      var ar = 600;
      I.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: w.touchNative && w.safari && w.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var ps = pt.extend({
        addHooks: function() {
          C(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          B(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(t) {
          if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
            var e = t.touches[0];
            this._startPos = this._newPos = new S(e.clientX, e.clientY), this._holdTimeout = setTimeout(g(function() {
              this._cancel(), this._isTapValid() && (C(document, "touchend", K), C(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
            }, this), ar), C(document, "touchend touchcancel contextmenu", this._cancel, this), C(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function t() {
          B(document, "touchend", K), B(document, "touchend touchcancel", t);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), B(document, "touchend touchcancel contextmenu", this._cancel, this), B(document, "touchmove", this._onMove, this);
        },
        _onMove: function(t) {
          var e = t.touches[0];
          this._newPos = new S(e.clientX, e.clientY);
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
      I.addInitHook("addHandler", "tapHold", ps), I.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: w.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: !0
      });
      var fs = pt.extend({
        addHooks: function() {
          k(this._map._container, "leaflet-touch-zoom"), C(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          H(this._map._container, "leaflet-touch-zoom"), B(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))), this._startDist = i.distanceTo(n), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), C(document, "touchmove", this._onTouchMove, this), C(document, "touchend touchcancel", this._onTouchEnd, this), K(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]), o = i.distanceTo(n) / this._startDist;
            if (this._zoom = e.getScaleZoom(o, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && o < 1 || this._zoom > e.getMaxZoom() && o > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, o === 1)
                return;
            } else {
              var a = i._add(n)._divideBy(2)._subtract(this._centerPoint);
              if (o === 1 && a.x === 0 && a.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(a), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), st(this._animRequest);
            var l = g(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = Q(l, this, !0), K(t);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, st(this._animRequest), B(document, "touchmove", this._onTouchMove, this), B(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      I.addInitHook("addHandler", "touchZoom", fs), I.BoxZoom = hs, I.DoubleClickZoom = ls, I.Drag = cs, I.Keyboard = us, I.ScrollWheelZoom = ds, I.TapHold = ps, I.TouchZoom = fs, r.Bounds = N, r.Browser = w, r.CRS = gt, r.Canvas = ss, r.Circle = ki, r.CircleMarker = Ie, r.Class = _t, r.Control = lt, r.DivIcon = es, r.DivOverlay = ft, r.DomEvent = Lo, r.DomUtil = Po, r.Draggable = Tt, r.Evented = Jt, r.FeatureGroup = vt, r.GeoJSON = xt, r.GridLayer = ce, r.Handler = pt, r.Icon = Ht, r.ImageOverlay = Be, r.LatLng = O, r.LatLngBounds = et, r.Layer = ct, r.LayerGroup = Ut, r.LineUtil = Bo, r.Map = I, r.Marker = Me, r.Mixin = Mo, r.Path = Lt, r.Point = S, r.PolyUtil = Io, r.Polygon = Ft, r.Polyline = yt, r.Popup = Re, r.PosAnimation = Zn, r.Projection = Ro, r.Rectangle = as, r.Renderer = bt, r.SVG = de, r.SVGOverlay = ts, r.TileLayer = qt, r.Tooltip = Ne, r.Transformation = ei, r.Util = Ws, r.VideoOverlay = Qn, r.bind = g, r.bounds = tt, r.canvas = os, r.circle = Vo, r.circleMarker = Go, r.control = ae, r.divIcon = ir, r.extend = c, r.featureGroup = Fo, r.geoJSON = Jn, r.geoJson = Yo, r.gridLayer = nr, r.icon = Wo, r.imageOverlay = Xo, r.latLng = M, r.latLngBounds = F, r.layerGroup = Ho, r.map = Eo, r.marker = qo, r.point = E, r.polygon = Ko, r.polyline = jo, r.popup = tr, r.rectangle = rr, r.setOptions = Z, r.stamp = f, r.svg = rs, r.svgOverlay = Qo, r.tileLayer = is, r.tooltip = er, r.transformation = Qt, r.version = h, r.videoOverlay = Jo;
      var hr = window.L;
      r.noConflict = function() {
        return window.L = hr, this;
      }, window.L = r;
    }));
  })(fe, fe.exports)), fe.exports;
}
var Et = ca();
const ua = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function da(u) {
  return [...u].sort((s, r) => {
    const h = s.started_at ? Date.parse(s.started_at) : Number.POSITIVE_INFINITY, c = r.started_at ? Date.parse(r.started_at) : Number.POSITIVE_INFINITY;
    return h !== c ? h - c : s.id.localeCompare(r.id);
  });
}
const Vt = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], pa = ua.replace(/\s+/g, " ").trim();
class Fs extends Xt {
  trips = [];
  selectedTripId = "";
  drives = [];
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
  connectedCallback() {
    super.connectedCallback(), this.refresh();
  }
  disconnectedCallback() {
    this.map?.remove(), this.map = void 0, super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.tileLayer?.remove(), this.tileLayer = void 0, this.tileError = !1, this.refresh();
  }
  async refresh() {
    if (!(!this.hass || !this.vehicleId)) {
      this.loading = !0, this.error = "", this.requestUpdate();
      try {
        const s = await xe(this.hass, this.vehicleId);
        this.mapConfig = s.map_config, this.trips = s.trips, (!this.selectedTripId || !this.trips.some((c) => c.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((c) => c.status === "active")?.id ?? this.trips[0]?.id ?? "");
        const r = this.selectedTripId ? await xe(this.hass, this.vehicleId, this.selectedTripId) : s;
        this.mapConfig = r.map_config ?? this.mapConfig, this.drives = da(r.drives);
        const h = new Set(this.drives.map((c) => c.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((c) => h.has(c)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((c) => c.id), this.driveSelectionInitialized = !0), this.data = await Br(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
      } catch {
        this.error = A(this.hass).loadError, this.data = void 0;
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
    const s = this.shadowRoot?.querySelector(".map");
    if (!s) return;
    this.map || (this.map = Et.map(s, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5));
    const r = this.config, h = r.tile_url ?? this.mapConfig?.tile_url ?? void 0, c = r.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (h && !this.tileError && !this.tileLayer) {
      const g = c || (h.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = Et.tileLayer(h, { maxZoom: 19, attribution: g }).on("tileerror", () => {
        this.tileError = !0, this.tileLayer?.remove(), this.tileLayer = void 0, this.requestUpdate();
      }).addTo(this.map);
    }
    for (const g of this.layers) g.remove();
    this.layers = [];
    const m = Et.latLngBounds([]);
    for (const [g, b] of (this.data?.segments ?? []).entries()) {
      const f = b.points.map((v) => Et.latLng(v.latitude, v.longitude));
      if (f.length) {
        const v = Et.polyline(f, { color: Vt[g % Vt.length], weight: 4, opacity: 0.85 }).addTo(this.map);
        this.layers.push(v), f.forEach((j) => m.extend(j));
        const D = A(this.hass), P = Et.circleMarker(f[0], { radius: 6, color: Vt[g % Vt.length], fillOpacity: 1 }).bindTooltip(D.mapStart).addTo(this.map), R = Et.circleMarker(f[f.length - 1], { radius: 6, color: "#111", fillColor: Vt[g % Vt.length], fillOpacity: 1 }).bindTooltip(D.mapEnd).addTo(this.map);
        this.layers.push(P, R);
        for (const j of b.gaps) {
          const Y = f[Math.max(0, Math.floor(f.length / 2))], Z = Et.circleMarker(Y, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${D.mapGap}: ${j.seconds}s`).addTo(this.map);
          this.layers.push(Z);
        }
      }
    }
    m.isValid() && this.map.fitBounds(m.pad(0.08)), setTimeout(() => this.map?.invalidateSize(), 0);
  }
  async selectTrip(s) {
    this.selectedTripId = s.currentTarget.value, this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh();
  }
  async toggleDrive(s) {
    const r = s.currentTarget;
    this.selectedDriveIds = r.checked ? [...this.selectedDriveIds, r.value] : this.selectedDriveIds.filter((h) => h !== r.value), await this.refresh();
  }
  render() {
    const s = A(this.hass), h = this.config.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    return y`<ha-card><h2>${s.mapTitle}</h2>
      ${this.trips.length ? y`<label class="selector">${s.summaryChooseTrip}<select @change=${(c) => {
      this.selectTrip(c);
    }} .value=${this.selectedTripId}>${this.trips.map((c) => y`<option value=${c.id}>${c.title} · ${c.status}</option>`)}</select></label>` : ""}
      ${this.drives.length ? y`<fieldset class="drives"><legend>${s.mapDriveSegments}</legend>${this.drives.map((c) => y`<label><input type="checkbox" value=${c.id} .checked=${this.selectedDriveIds.includes(c.id)} @change=${(m) => {
      this.toggleDrive(m);
    }}> ${wt(c.started_at, this.hass)} · ${(c.distance_m / 1e3).toFixed(1)} km</label>`)}</fieldset>` : ""}
      ${this.error ? y`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? y`<p class="error" role="alert">${A(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !this.config.tile_url && !this.mapConfig?.tile_url ? y`<p class="muted" role="status">${A(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? y`<p class="muted">${s.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? y`<p class="muted">${s.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${s.mapRouteImageAlt}></div>
      ${h ? y`<p class="attribution">${h}</p>` : ""}
      ${this.loading ? y`<p class="muted">${s.loading}</p>` : ""}
    </ha-card>`;
  }
}
Fs.styles = [Xt.styles, zs(pa), Zt`.map{height:420px;min-height:240px;border-radius:8px;overflow:hidden;background:var(--secondary-background-color)}.selector{display:grid;gap:4px;margin:12px 0}.selector select{padding:8px;background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.drives{display:grid;gap:6px;border:1px solid var(--divider-color);border-radius:6px;margin:10px 0;padding:8px}.drives label{font-size:.85em}.attribution{font-size:.75rem;color:var(--secondary-text-color);margin:6px 0 0}.muted{color:var(--secondary-text-color)}@media(max-width:500px){.map{height:300px}}`];
en("camper-travel-journal-map-card", Fs);
function fa(u, s) {
  return u.vehicle_id || s.length !== 1 ? u : { ...u, vehicle_id: s[0].vehicle_id };
}
function ma(u, s) {
  return u.type === s.type && u.vehicle_id === s.vehicle_id;
}
class _a extends Dt {
  static styles = Zt`
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
  set hass(s) {
    const r = this._hass?.connection !== s?.connection;
    this._hass = s, r && s && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(s) {
    ma(this._config, s) || (this._config = { ...s }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const s = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await Yr(s), this.loadedConnection = s.connection;
        const r = fa(this._config, this.vehicles);
        r.vehicle_id !== this._config.vehicle_id && (this._config = r, this.fireConfigChanged());
      } catch {
        this.error = A(s).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(s) {
    const r = s.target.value;
    this._config = { ...this._config, vehicle_id: r }, this.fireConfigChanged();
  }
  render() {
    const s = A(this._hass);
    return y`
      <div class="field">
        <label for="vehicle">${s.editorVehicle}</label>
        ${this.loading ? y`<span class="muted">${s.editorLoading}</span>` : y`
          <select id="vehicle" aria-label=${s.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${s.editorChooseVehicle}</option>
            ${this.vehicles.map((r) => y`<option value=${r.vehicle_id} ?selected=${r.vehicle_id === this._config.vehicle_id}>${r.name || r.title}</option>`)}
          </select>
        `}
        ${this.error ? y`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? y`<span class="error" role="alert">${s.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", _a);
const ga = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-map-card", name: "Camper Travel Journal – GPS-Karte", description: "Zeigt gespeicherte GPS-Fahrten nach Reise und Fahrtabschnitt.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const u of ga) window.customCards.some((s) => s.type === u.type) || window.customCards.push(u);
