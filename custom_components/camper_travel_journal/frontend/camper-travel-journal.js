const We = globalThis, Ki = We.ShadowRoot && (We.ShadyCSS === void 0 || We.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yi = /* @__PURE__ */ Symbol(), gs = /* @__PURE__ */ new WeakMap();
let Is = class {
  constructor(s, o, h) {
    if (this._$cssResult$ = !0, h !== Yi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = s, this.t = o;
  }
  get styleSheet() {
    let s = this.o;
    const o = this.t;
    if (Ki && s === void 0) {
      const h = o !== void 0 && o.length === 1;
      h && (s = gs.get(o)), s === void 0 && ((this.o = s = new CSSStyleSheet()).replaceSync(this.cssText), h && gs.set(o, s));
    }
    return s;
  }
  toString() {
    return this.cssText;
  }
};
const zs = (c) => new Is(typeof c == "string" ? c : c + "", void 0, Yi), Zt = (c, ...s) => {
  const o = c.length === 1 ? c[0] : s.reduce((h, d, p) => h + ((_) => {
    if (_._$cssResult$ === !0) return _.cssText;
    if (typeof _ == "number") return _;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + _ + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(d) + c[p + 1], c[0]);
  return new Is(o, c, Yi);
}, yo = (c, s) => {
  if (Ki) c.adoptedStyleSheets = s.map((o) => o instanceof CSSStyleSheet ? o : o.styleSheet);
  else for (const o of s) {
    const h = document.createElement("style"), d = We.litNonce;
    d !== void 0 && h.setAttribute("nonce", d), h.textContent = o.cssText, c.appendChild(h);
  }
}, vs = Ki ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((s) => {
  let o = "";
  for (const h of s.cssRules) o += h.cssText;
  return zs(o);
})(c) : c;
const { is: xo, defineProperty: bo, getOwnPropertyDescriptor: wo, getOwnPropertyNames: Po, getOwnPropertySymbols: To, getPrototypeOf: Eo } = Object, Ye = globalThis, ys = Ye.trustedTypes, Lo = ys ? ys.emptyScript : "", So = Ye.reactiveElementPolyfillSupport, _e = (c, s) => c, Gi = { toAttribute(c, s) {
  switch (s) {
    case Boolean:
      c = c ? Lo : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, s) {
  let o = c;
  switch (s) {
    case Boolean:
      o = c !== null;
      break;
    case Number:
      o = c === null ? null : Number(c);
      break;
    case Object:
    case Array:
      try {
        o = JSON.parse(c);
      } catch {
        o = null;
      }
  }
  return o;
} }, Os = (c, s) => !xo(c, s), xs = { attribute: !0, type: String, converter: Gi, reflect: !1, useDefault: !1, hasChanged: Os };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ye.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Vt = class extends HTMLElement {
  static addInitializer(s) {
    this._$Ei(), (this.l ??= []).push(s);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(s, o = xs) {
    if (o.state && (o.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(s) && ((o = Object.create(o)).wrapped = !0), this.elementProperties.set(s, o), !o.noAccessor) {
      const h = /* @__PURE__ */ Symbol(), d = this.getPropertyDescriptor(s, h, o);
      d !== void 0 && bo(this.prototype, s, d);
    }
  }
  static getPropertyDescriptor(s, o, h) {
    const { get: d, set: p } = wo(this.prototype, s) ?? { get() {
      return this[o];
    }, set(_) {
      this[o] = _;
    } };
    return { get: d, set(_) {
      const y = d?.call(this);
      p?.call(this, _), this.requestUpdate(s, y, h);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(s) {
    return this.elementProperties.get(s) ?? xs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const s = Eo(this);
    s.finalize(), s.l !== void 0 && (this.l = [...s.l]), this.elementProperties = new Map(s.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const o = this.properties, h = [...Po(o), ...To(o)];
      for (const d of h) this.createProperty(d, o[d]);
    }
    const s = this[Symbol.metadata];
    if (s !== null) {
      const o = litPropertyMetadata.get(s);
      if (o !== void 0) for (const [h, d] of o) this.elementProperties.set(h, d);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [o, h] of this.elementProperties) {
      const d = this._$Eu(o, h);
      d !== void 0 && this._$Eh.set(d, o);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s) {
    const o = [];
    if (Array.isArray(s)) {
      const h = new Set(s.flat(1 / 0).reverse());
      for (const d of h) o.unshift(vs(d));
    } else s !== void 0 && o.push(vs(s));
    return o;
  }
  static _$Eu(s, o) {
    const h = o.attribute;
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
    const s = /* @__PURE__ */ new Map(), o = this.constructor.elementProperties;
    for (const h of o.keys()) this.hasOwnProperty(h) && (s.set(h, this[h]), delete this[h]);
    s.size > 0 && (this._$Ep = s);
  }
  createRenderRoot() {
    const s = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return yo(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((s) => s.hostConnected?.());
  }
  enableUpdating(s) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((s) => s.hostDisconnected?.());
  }
  attributeChangedCallback(s, o, h) {
    this._$AK(s, h);
  }
  _$ET(s, o) {
    const h = this.constructor.elementProperties.get(s), d = this.constructor._$Eu(s, h);
    if (d !== void 0 && h.reflect === !0) {
      const p = (h.converter?.toAttribute !== void 0 ? h.converter : Gi).toAttribute(o, h.type);
      this._$Em = s, p == null ? this.removeAttribute(d) : this.setAttribute(d, p), this._$Em = null;
    }
  }
  _$AK(s, o) {
    const h = this.constructor, d = h._$Eh.get(s);
    if (d !== void 0 && this._$Em !== d) {
      const p = h.getPropertyOptions(d), _ = typeof p.converter == "function" ? { fromAttribute: p.converter } : p.converter?.fromAttribute !== void 0 ? p.converter : Gi;
      this._$Em = d;
      const y = _.fromAttribute(o, p.type);
      this[d] = y ?? this._$Ej?.get(d) ?? y, this._$Em = null;
    }
  }
  requestUpdate(s, o, h, d = !1, p) {
    if (s !== void 0) {
      const _ = this.constructor;
      if (d === !1 && (p = this[s]), h ??= _.getPropertyOptions(s), !((h.hasChanged ?? Os)(p, o) || h.useDefault && h.reflect && p === this._$Ej?.get(s) && !this.hasAttribute(_._$Eu(s, h)))) return;
      this.C(s, o, h);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(s, o, { useDefault: h, reflect: d, wrapped: p }, _) {
    h && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(s) && (this._$Ej.set(s, _ ?? o ?? this[s]), p !== !0 || _ !== void 0) || (this._$AL.has(s) || (this.hasUpdated || h || (o = void 0), this._$AL.set(s, o)), d === !0 && this._$Em !== s && (this._$Eq ??= /* @__PURE__ */ new Set()).add(s));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (o) {
      Promise.reject(o);
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
        for (const [d, p] of this._$Ep) this[d] = p;
        this._$Ep = void 0;
      }
      const h = this.constructor.elementProperties;
      if (h.size > 0) for (const [d, p] of h) {
        const { wrapped: _ } = p, y = this[d];
        _ !== !0 || this._$AL.has(d) || y === void 0 || this.C(d, void 0, p, y);
      }
    }
    let s = !1;
    const o = this._$AL;
    try {
      s = this.shouldUpdate(o), s ? (this.willUpdate(o), this._$EO?.forEach((h) => h.hostUpdate?.()), this.update(o)) : this._$EM();
    } catch (h) {
      throw s = !1, this._$EM(), h;
    }
    s && this._$AE(o);
  }
  willUpdate(s) {
  }
  _$AE(s) {
    this._$EO?.forEach((o) => o.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(s)), this.updated(s);
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
    this._$Eq &&= this._$Eq.forEach((o) => this._$ET(o, this[o])), this._$EM();
  }
  updated(s) {
  }
  firstUpdated(s) {
  }
};
Vt.elementStyles = [], Vt.shadowRootOptions = { mode: "open" }, Vt[_e("elementProperties")] = /* @__PURE__ */ new Map(), Vt[_e("finalized")] = /* @__PURE__ */ new Map(), So?.({ ReactiveElement: Vt }), (Ye.reactiveElementVersions ??= []).push("2.1.2");
const Xi = globalThis, bs = (c) => c, Ge = Xi.trustedTypes, ws = Ge ? Ge.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, Zs = "$lit$", St = `lit$${Math.random().toFixed(9).slice(2)}$`, Bs = "?" + St, Co = `<${Bs}>`, Ot = document, ve = () => Ot.createComment(""), ye = (c) => c === null || typeof c != "object" && typeof c != "function", Ji = Array.isArray, ko = (c) => Ji(c) || typeof c?.[Symbol.iterator] == "function", zi = `[ \t
\f\r]`, fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ps = /-->/g, Ts = />/g, Dt = RegExp(`>|${zi}(?:([^\\s"'>=/]+)(${zi}*=${zi}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), Es = /'/g, Ls = /"/g, Rs = /^(?:script|style|textarea|title)$/i, $o = (c) => (s, ...o) => ({ _$litType$: c, strings: s, values: o }), x = $o(1), Kt = /* @__PURE__ */ Symbol.for("lit-noChange"), j = /* @__PURE__ */ Symbol.for("lit-nothing"), Ss = /* @__PURE__ */ new WeakMap(), It = Ot.createTreeWalker(Ot, 129);
function Ns(c, s) {
  if (!Ji(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ws !== void 0 ? ws.createHTML(s) : s;
}
const Ao = (c, s) => {
  const o = c.length - 1, h = [];
  let d, p = s === 2 ? "<svg>" : s === 3 ? "<math>" : "", _ = fe;
  for (let y = 0; y < o; y++) {
    const f = c[y];
    let v, S, w = -1, Z = 0;
    for (; Z < f.length && (_.lastIndex = Z, S = _.exec(f), S !== null); ) Z = _.lastIndex, _ === fe ? S[1] === "!--" ? _ = Ps : S[1] !== void 0 ? _ = Ts : S[2] !== void 0 ? (Rs.test(S[2]) && (d = RegExp("</" + S[2], "g")), _ = Dt) : S[3] !== void 0 && (_ = Dt) : _ === Dt ? S[0] === ">" ? (_ = d ?? fe, w = -1) : S[1] === void 0 ? w = -2 : (w = _.lastIndex - S[2].length, v = S[1], _ = S[3] === void 0 ? Dt : S[3] === '"' ? Ls : Es) : _ === Ls || _ === Es ? _ = Dt : _ === Ps || _ === Ts ? _ = fe : (_ = Dt, d = void 0);
    const X = _ === Dt && c[y + 1].startsWith("/>") ? " " : "";
    p += _ === fe ? f + Co : w >= 0 ? (h.push(v), f.slice(0, w) + Zs + f.slice(w) + St + X) : f + St + (w === -2 ? y : X);
  }
  return [Ns(c, p + (c[o] || "<?>") + (s === 2 ? "</svg>" : s === 3 ? "</math>" : "")), h];
};
class xe {
  constructor({ strings: s, _$litType$: o }, h) {
    let d;
    this.parts = [];
    let p = 0, _ = 0;
    const y = s.length - 1, f = this.parts, [v, S] = Ao(s, o);
    if (this.el = xe.createElement(v, h), It.currentNode = this.el.content, o === 2 || o === 3) {
      const w = this.el.content.firstChild;
      w.replaceWith(...w.childNodes);
    }
    for (; (d = It.nextNode()) !== null && f.length < y; ) {
      if (d.nodeType === 1) {
        if (d.hasAttributes()) for (const w of d.getAttributeNames()) if (w.endsWith(Zs)) {
          const Z = S[_++], X = d.getAttribute(w).split(St), Y = /([.?@])?(.*)/.exec(Z);
          f.push({ type: 1, index: p, name: Y[2], strings: X, ctor: Y[1] === "." ? Do : Y[1] === "?" ? Io : Y[1] === "@" ? zo : Xe }), d.removeAttribute(w);
        } else w.startsWith(St) && (f.push({ type: 6, index: p }), d.removeAttribute(w));
        if (Rs.test(d.tagName)) {
          const w = d.textContent.split(St), Z = w.length - 1;
          if (Z > 0) {
            d.textContent = Ge ? Ge.emptyScript : "";
            for (let X = 0; X < Z; X++) d.append(w[X], ve()), It.nextNode(), f.push({ type: 2, index: ++p });
            d.append(w[Z], ve());
          }
        }
      } else if (d.nodeType === 8) if (d.data === Bs) f.push({ type: 2, index: p });
      else {
        let w = -1;
        for (; (w = d.data.indexOf(St, w + 1)) !== -1; ) f.push({ type: 7, index: p }), w += St.length - 1;
      }
      p++;
    }
  }
  static createElement(s, o) {
    const h = Ot.createElement("template");
    return h.innerHTML = s, h;
  }
}
function Yt(c, s, o = c, h) {
  if (s === Kt) return s;
  let d = h !== void 0 ? o._$Co?.[h] : o._$Cl;
  const p = ye(s) ? void 0 : s._$litDirective$;
  return d?.constructor !== p && (d?._$AO?.(!1), p === void 0 ? d = void 0 : (d = new p(c), d._$AT(c, o, h)), h !== void 0 ? (o._$Co ??= [])[h] = d : o._$Cl = d), d !== void 0 && (s = Yt(c, d._$AS(c, s.values), d, h)), s;
}
class Mo {
  constructor(s, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = s, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(s) {
    const { el: { content: o }, parts: h } = this._$AD, d = (s?.creationScope ?? Ot).importNode(o, !0);
    It.currentNode = d;
    let p = It.nextNode(), _ = 0, y = 0, f = h[0];
    for (; f !== void 0; ) {
      if (_ === f.index) {
        let v;
        f.type === 2 ? v = new Pe(p, p.nextSibling, this, s) : f.type === 1 ? v = new f.ctor(p, f.name, f.strings, this, s) : f.type === 6 && (v = new Oo(p, this, s)), this._$AV.push(v), f = h[++y];
      }
      _ !== f?.index && (p = It.nextNode(), _++);
    }
    return It.currentNode = Ot, d;
  }
  p(s) {
    let o = 0;
    for (const h of this._$AV) h !== void 0 && (h.strings !== void 0 ? (h._$AI(s, h, o), o += h.strings.length - 2) : h._$AI(s[o])), o++;
  }
}
class Pe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(s, o, h, d) {
    this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = s, this._$AB = o, this._$AM = h, this.options = d, this._$Cv = d?.isConnected ?? !0;
  }
  get parentNode() {
    let s = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && s?.nodeType === 11 && (s = o.parentNode), s;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(s, o = this) {
    s = Yt(this, s, o), ye(s) ? s === j || s == null || s === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : s !== this._$AH && s !== Kt && this._(s) : s._$litType$ !== void 0 ? this.$(s) : s.nodeType !== void 0 ? this.T(s) : ko(s) ? this.k(s) : this._(s);
  }
  O(s) {
    return this._$AA.parentNode.insertBefore(s, this._$AB);
  }
  T(s) {
    this._$AH !== s && (this._$AR(), this._$AH = this.O(s));
  }
  _(s) {
    this._$AH !== j && ye(this._$AH) ? this._$AA.nextSibling.data = s : this.T(Ot.createTextNode(s)), this._$AH = s;
  }
  $(s) {
    const { values: o, _$litType$: h } = s, d = typeof h == "number" ? this._$AC(s) : (h.el === void 0 && (h.el = xe.createElement(Ns(h.h, h.h[0]), this.options)), h);
    if (this._$AH?._$AD === d) this._$AH.p(o);
    else {
      const p = new Mo(d, this), _ = p.u(this.options);
      p.p(o), this.T(_), this._$AH = p;
    }
  }
  _$AC(s) {
    let o = Ss.get(s.strings);
    return o === void 0 && Ss.set(s.strings, o = new xe(s)), o;
  }
  k(s) {
    Ji(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let h, d = 0;
    for (const p of s) d === o.length ? o.push(h = new Pe(this.O(ve()), this.O(ve()), this, this.options)) : h = o[d], h._$AI(p), d++;
    d < o.length && (this._$AR(h && h._$AB.nextSibling, d), o.length = d);
  }
  _$AR(s = this._$AA.nextSibling, o) {
    for (this._$AP?.(!1, !0, o); s !== this._$AB; ) {
      const h = bs(s).nextSibling;
      bs(s).remove(), s = h;
    }
  }
  setConnected(s) {
    this._$AM === void 0 && (this._$Cv = s, this._$AP?.(s));
  }
}
class Xe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(s, o, h, d, p) {
    this.type = 1, this._$AH = j, this._$AN = void 0, this.element = s, this.name = o, this._$AM = d, this.options = p, h.length > 2 || h[0] !== "" || h[1] !== "" ? (this._$AH = Array(h.length - 1).fill(new String()), this.strings = h) : this._$AH = j;
  }
  _$AI(s, o = this, h, d) {
    const p = this.strings;
    let _ = !1;
    if (p === void 0) s = Yt(this, s, o, 0), _ = !ye(s) || s !== this._$AH && s !== Kt, _ && (this._$AH = s);
    else {
      const y = s;
      let f, v;
      for (s = p[0], f = 0; f < p.length - 1; f++) v = Yt(this, y[h + f], o, f), v === Kt && (v = this._$AH[f]), _ ||= !ye(v) || v !== this._$AH[f], v === j ? s = j : s !== j && (s += (v ?? "") + p[f + 1]), this._$AH[f] = v;
    }
    _ && !d && this.j(s);
  }
  j(s) {
    s === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, s ?? "");
  }
}
class Do extends Xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(s) {
    this.element[this.name] = s === j ? void 0 : s;
  }
}
let Io = class extends Xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(s) {
    this.element.toggleAttribute(this.name, !!s && s !== j);
  }
};
class zo extends Xe {
  constructor(s, o, h, d, p) {
    super(s, o, h, d, p), this.type = 5;
  }
  _$AI(s, o = this) {
    if ((s = Yt(this, s, o, 0) ?? j) === Kt) return;
    const h = this._$AH, d = s === j && h !== j || s.capture !== h.capture || s.once !== h.once || s.passive !== h.passive, p = s !== j && (h === j || d);
    d && this.element.removeEventListener(this.name, this, h), p && this.element.addEventListener(this.name, this, s), this._$AH = s;
  }
  handleEvent(s) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, s) : this._$AH.handleEvent(s);
  }
}
class Oo {
  constructor(s, o, h) {
    this.element = s, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = h;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(s) {
    Yt(this, s);
  }
}
const Zo = Xi.litHtmlPolyfillSupport;
Zo?.(xe, Pe), (Xi.litHtmlVersions ??= []).push("3.3.3");
const Bo = (c, s, o) => {
  const h = o?.renderBefore ?? s;
  let d = h._$litPart$;
  if (d === void 0) {
    const p = o?.renderBefore ?? null;
    h._$litPart$ = d = new Pe(s.insertBefore(ve(), p), p, void 0, o ?? {});
  }
  return d._$AI(c), d;
};
const Qi = globalThis;
class zt extends Vt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const s = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= s.firstChild, s;
  }
  update(s) {
    const o = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(s), this._$Do = Bo(o, this.renderRoot, this.renderOptions);
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
zt._$litElement$ = !0, zt.finalized = !0, Qi.litElementHydrateSupport?.({ LitElement: zt });
const Ro = Qi.litElementPolyfillSupport;
Ro?.({ LitElement: zt });
(Qi.litElementVersions ??= []).push("4.2.2");
class Xt extends zt {
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
    const o = this._hass?.connection !== s?.connection;
    this._hass = s, o && this.onHassConnectionChanged(), this.requestUpdate();
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
function tn(c, s) {
  customElements.get(c) || customElements.define(c, s);
}
async function K(c, s, o, h = {}) {
  return c.connection.sendMessagePromise({ type: s, vehicle_id: o, ...h });
}
const be = (c, s, o) => K(c, "camper_travel_journal/list", s, o ? { trip_id: o } : {}), No = (c, s, o, h, d = 5e3) => K(c, "camper_travel_journal/route", s, { trip_id: o, drive_ids: h, max_points: d }), Us = (c, s, o, h) => K(c, "camper_travel_journal/transition_trip", s, { trip_id: o, status: h }), Uo = (c, s, o, h = "", d = "", p = "") => K(c, "camper_travel_journal/create_trip", s, { title: o, start_date: h || void 0, end_date: d || void 0, destination: p }), Fo = (c, s, o, h) => K(c, "camper_travel_journal/update_trip", s, { trip_id: o, ...h }), Ho = (c, s, o) => K(c, "camper_travel_journal/delete_trip", s, { trip_id: o }), Wo = (c, s, o, h) => K(c, "camper_travel_journal/unlink_drive", s, { trip_id: o, drive_id: h }), qo = (c, s, o, h) => K(c, "camper_travel_journal/link_drives", s, { trip_id: o, drive_ids: h }), Go = (c, s, o) => K(c, "camper_travel_journal/create_manual_drive", s, o), jo = (c, s, o, h) => K(c, "camper_travel_journal/update_manual_drive", s, { drive_id: o, ...h }), Vo = (c, s, o) => K(c, "camper_travel_journal/delete_manual_drive", s, { drive_id: o }), Ko = (c, s, o, h) => K(c, "camper_travel_journal/create_expense", s, { trip_id: o, ...h }), Yo = (c, s, o, h) => K(c, "camper_travel_journal/update_expense", s, { expense_id: o, ...h }), Xo = (c, s, o) => K(c, "camper_travel_journal/delete_expense", s, { expense_id: o }), Jo = (c, s, o) => K(c, "camper_travel_journal/export_pdf", s, { trip_id: o }), Fs = async (c) => (await c.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], Qo = (c, s, o) => K(c, "camper_travel_journal/analyze_gpx", s, { content_base64: o }), ta = (c, s, o, h, d, p) => K(c, "camper_travel_journal/import_gpx", s, { content_base64: o, file_hash: h, drive_keys: d, trip_id: p }), Hs = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], Oi = Hs, ea = {
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
}, ia = {
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
}, Cs = {
  de: {
    mapTitle: "Reisekarte",
    mapVehicle: "Fahrzeug",
    mapTrip: "Reise",
    mapTotalDistance: "Kilometer",
    mapSelectedDrives: "Fahrtabschnitte",
    mapTripPeriod: "Reisezeitraum",
    mapExpandSegments: "Fahrtabschnitte aufklappen",
    mapCollapseSegments: "Fahrtabschnitte zuklappen",
    mapSelectAll: "Alle auswählen",
    mapSelectNone: "Alle abwählen"
  },
  en: {
    mapTitle: "Travel map",
    mapVehicle: "Camper",
    mapTrip: "Trip",
    mapTotalDistance: "Kilometers",
    mapSelectedDrives: "Drive sections",
    mapTripPeriod: "Trip period",
    mapExpandSegments: "Expand drive sections",
    mapCollapseSegments: "Collapse drive sections",
    mapSelectAll: "Select all",
    mapSelectNone: "Select none"
  }
};
function M(c) {
  const s = c?.locale?.language?.toLowerCase() ?? "de";
  return { ...s.startsWith("de") ? ea : ia, ...s.startsWith("de") ? Cs.de : Cs.en };
}
function je(c) {
  return (c?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function qe(c, s) {
  const o = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c);
  if (o) {
    const [, h, d, p] = o;
    return je(s).startsWith("de") ? `${p}.${d}.${h}` : `${d}/${p}/${h}`;
  }
  return new Date(c).toLocaleDateString(je(s));
}
function Et(c, s) {
  return new Date(c).toLocaleString(je(s), { dateStyle: "short", timeStyle: "short" });
}
function na(c, s) {
  return new Date(c).toLocaleTimeString(je(s), { hour: "2-digit", minute: "2-digit" });
}
function Zi(c, s) {
  const o = Math.max(0, Math.round((c ?? 0) / 60));
  return o < 60 ? `${o} min` : `${Math.floor(o / 60)} h ${o % 60} min`;
}
function we(c, s) {
  return c.start_date || c.end_date ? [c.start_date, c.end_date].filter(Boolean).map((o) => qe(o, s)).join(" – ") || "" : c.started_at ? `${qe(c.started_at, s)}${c.ended_at ? ` – ${qe(c.ended_at, s)}` : ""}` : "";
}
function sa(c, s) {
  const o = c.start_date || c.started_at, h = c.end_date || c.ended_at;
  if (!o && !h) return "";
  const d = (v) => {
    const S = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    return S ? new Date(Number(S[1]), Number(S[2]) - 1, Number(S[3])) : new Date(v);
  }, p = d(o || h || ""), _ = d(h || o || "");
  if (Number.isNaN(p.getTime()) || Number.isNaN(_.getTime())) return we(c, s);
  if (!(s?.locale?.language ?? "").toLowerCase().startsWith("de")) {
    const v = new Intl.DateTimeFormat("en-US", { month: "short" }), S = (Z) => Z.getDate(), w = (Z) => Z.getFullYear();
    return w(p) === w(_) && p.getMonth() === _.getMonth() ? `${v.format(p)} ${S(p)}–${S(_)}, ${w(p)}` : w(p) === w(_) ? `${v.format(p)} ${S(p)}–${v.format(_)} ${S(_)}, ${w(p)}` : `${v.format(p)} ${S(p)}, ${w(p)}–${v.format(_)} ${S(_)}, ${w(_)}`;
  }
  const f = (v) => `${String(v.getDate()).padStart(2, "0")}.${String(v.getMonth() + 1).padStart(2, "0")}.${String(v.getFullYear()).slice(-2)}`;
  return p.getFullYear() === _.getFullYear() && p.getMonth() === _.getMonth() ? `${String(p.getDate()).padStart(2, "0")}.–${f(_).slice(0, 2)}.${String(_.getMonth() + 1).padStart(2, "0")}.${String(_.getFullYear()).slice(-2)}` : `${f(p)}–${f(_)}`;
}
function Ve(c, s) {
  return M(s).statuses[c] ?? c;
}
function Bi(c, s) {
  return M(s).categories[c] ?? c;
}
function Ri(c) {
  return Hs.includes(c);
}
function ge(c, s, o) {
  const h = (o?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(h, { style: "currency", currency: s, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100);
}
function ks(c) {
  const s = c.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(s)) return null;
  const [o, h = ""] = s.split("."), d = Number(o) * 100 + Number((h + "00").slice(0, 2));
  return Number.isSafeInteger(d) ? d : null;
}
const ji = "camper-travel-journal-expenses-changed", Vi = "camper-travel-journal-data-changed";
function Ni(c) {
  window.dispatchEvent(new CustomEvent(ji, { detail: c }));
}
function mt(c) {
  window.dispatchEvent(new CustomEvent(Vi, { detail: c }));
}
class Ws extends Xt {
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
    super.connectedCallback(), window.addEventListener(ji, this.onDataChanged), window.addEventListener(Vi, this.onDataChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(ji, this.onDataChanged), window.removeEventListener(Vi, this.onDataChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(s) {
    const o = (h, d) => (d.started_at || "").localeCompare(h.started_at || "") || d.id.localeCompare(h.id);
    return s.filter((h) => h.status === "active").sort(o)[0] ?? [...s].sort(o)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const s = await be(this.hass, this.vehicleId);
      this.trips = s.trips;
      const h = s.trips.find((p) => p.id === this.selectedTripId) ?? this.chooseDefaultTrip(s.trips);
      this.selectedTripId = h?.id ?? "";
      const d = h ? await be(this.hass, this.vehicleId, h.id) : s;
      return this.snapshot = h ? { ...d, trips: [h] } : d, this.loadError = "", !0;
    } catch {
      return this.loadError = M(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(s) {
    const o = this.snapshot?.trips[0];
    if (!(!this.hass || !o))
      try {
        await Us(this.hass, this.vehicleId, o.id, s), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = M(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(s) {
    !this.hass || this.loading || !this.trips.some((o) => o.id === s) || (this.selectedTripId = s, await this.refresh());
  }
  render() {
    const s = M(this.hass), o = this.snapshot?.trips[0], h = this.trips, d = (this.snapshot?.drives ?? []).reduce((v, S) => v + S.distance_m, 0) / 1e3, p = this.snapshot?.expense_summary, _ = p?.mixed_currency ? s.mixedCurrency : p?.total_minor !== void 0 && p.currency ? ge(p.total_minor, p.currency, this.hass) : ge(0, "EUR", this.hass), y = this.loadError || this.actionError, f = o ? we(o, this.hass) : "";
    return x`<ha-card><h2>${o?.title ?? s.title}</h2>${h.length ? x`<label class="trip-selector">${s.summaryChooseTrip}<select aria-label=${s.summaryTrip} @change=${(v) => {
      this.selectTrip(v.currentTarget.value);
    }} ?disabled=${this.loading}>${h.map((v) => x`<option value=${v.id} ?selected=${v.id === this.selectedTripId}>${v.title} · ${Ve(v.status, this.hass)} · ${we(v, this.hass)}</option>`)}</select></label>` : ""}${y ? x`<p class="error" role="alert">${y}</p>` : o ? x`<p class="muted">${o.destination || s.noDestination} · ${Ve(o.status, this.hass)} · ${f}</p><div class="grid"><div class="metric"><span class="muted">${s.distance}</span><span class="value">${d.toFixed(1)} km</span></div><div class="metric"><span class="muted">${s.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${s.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${s.costs}</span><span class="value">${_}</span></div></div><div class="actions">${o.status === "planned" ? x`<button @click=${() => this.setStatus("active")}>${s.start}</button>` : o.status === "paused" ? x`<button @click=${() => this.setStatus("active")}>${s.resume}</button>` : ""}${o.status === "active" ? x`<button class="secondary" @click=${() => this.setStatus("paused")}>${s.pause}</button><button @click=${() => this.setStatus("completed")}>${s.complete}</button>` : ""}</div>` : x`<p class="muted">${s.noTrip}</p>`}${this.loading ? x`<p class="muted">${s.loading}</p>` : ""}</ha-card>`;
  }
}
Ws.styles = [Xt.styles, Zt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}`];
tn("camper-travel-journal-summary-card", Ws);
class Ke extends Xt {
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
  category = Oi[0];
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
  pdfSelectedTripId = "";
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
      return this.snapshot = await be(this.hass, this.vehicleId, this.selected || void 0), this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = M(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(s) {
    this.actionError = s, this.requestUpdate();
  }
  async readGPX(s) {
    const o = s.currentTarget.files?.[0];
    if (!(!o || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = o.name;
      try {
        const h = new Uint8Array(await o.arrayBuffer());
        let d = "";
        h.forEach((p) => {
          d += String.fromCharCode(p);
        }), this.gpxContent = btoa(d), this.gpxPreview = await Qo(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((p) => p.key)), this.gpxTripId = this.selected;
      } catch {
        this.gpxError = M(this.hass).gpxAnalyzeError;
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
        await ta(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], s), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s ?? "" });
      } catch {
        this.gpxError = M(this.hass).gpxImportError;
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
    if (!Ri(s)) return this.fail(M(this.hass).categoryInvalid);
    this.category = s, this.requestUpdate();
  }
  setEditingExpenseCategory(s) {
    if (!Ri(s)) return this.fail(M(this.hass).categoryInvalid);
    this.editingCategory = s, this.requestUpdate();
  }
  gpxPeriod() {
    const s = (this.gpxPreview?.points ?? []).map((o) => o.recorded_at).sort();
    return s.length ? { start: s[0], end: s[s.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((s) => this.gpxSelected.has(s.key)).reduce((s, o) => s + o.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(s) {
    const o = this.gpxPeriod();
    if (!o || !s || !s.start_date && !s.end_date) return !1;
    const h = o.start.slice(0, 10), d = o.end.slice(0, 10);
    return !!(s.start_date && h < s.start_date || s.end_date && d > s.end_date);
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(M(this.hass).dateInvalid);
      try {
        await Uo(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(M(this.hass).tripCreateError);
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
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail(M(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(M(this.hass).dateInvalid);
    try {
      await Fo(this.hass, this.vehicleId, s.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s.id });
    } catch {
      this.fail(M(this.hass).tripEditError);
    }
  }
  async removeTrip(s) {
    if (this.hass) {
      if (this.confirmingTripId !== s) {
        this.confirmingTripId = s, this.requestUpdate();
        return;
      }
      try {
        await Ho(this.hass, this.vehicleId, s), this.confirmingTripId = "", this.selected === s && (this.selected = ""), await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(M(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(s, o) {
    if (this.hass)
      try {
        await Us(this.hass, this.vehicleId, s, o), this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(M(this.hass).statusError);
      }
  }
  async assignDrive(s, o) {
    if (this.hass)
      try {
        await qo(this.hass, this.vehicleId, s, [o]), this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(M(this.hass).driveAssignError);
      }
  }
  async unassignDrive(s, o) {
    if (this.hass)
      try {
        await Wo(this.hass, this.vehicleId, s, o), this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(M(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(s) {
    this.selected = this.selected === s ? "" : s, this.selected ? this.refresh() : this.requestUpdate();
  }
  async addManualDrive(s) {
    if (!this.hass || this.manualSaving) return;
    const o = Number(this.manualDistanceKm.replace(",", ".")), h = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(o) || o < 0 || h !== void 0 && (!Number.isInteger(h) || h < 0)) return this.fail(M(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await Go(this.hass, this.vehicleId, { trip_id: s, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: o, ...h === void 0 ? {} : { duration_minutes: h } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
    } catch {
      this.fail(M(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(s) {
    const o = new Date(s), h = (d) => String(d).padStart(2, "0");
    return `${o.getFullYear()}-${h(o.getMonth() + 1)}-${h(o.getDate())}T${h(o.getHours())}:${h(o.getMinutes())}`;
  }
  startManualDriveEdit(s) {
    this.actionError = "", this.editingDriveId = s.id, this.editingDriveOccurredAt = this.localDateTime(s.started_at), this.editingDriveStartLocation = s.start_label || "", this.editingDriveEndLocation = s.end_label || "", this.editingDriveDistanceKm = (s.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = s.duration_seconds ? String(Math.round(s.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(s, o) {
    if (!this.hass || this.driveSavingId) return;
    const h = Number(this.editingDriveDistanceKm.replace(",", ".")), d = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(h) || h < 0 || d !== void 0 && (!Number.isInteger(d) || d < 0)) return this.fail(M(this.hass).dateInvalid);
    this.driveSavingId = s.id;
    try {
      await jo(this.hass, this.vehicleId, s.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: h, ...d === void 0 ? {} : { duration_minutes: d } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: o });
    } catch {
      this.fail(M(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(s, o) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== o) {
        this.confirmingDriveId = o, this.requestUpdate();
        return;
      }
      this.driveSavingId = o;
      try {
        await Vo(this.hass, this.vehicleId, o), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), mt({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail(M(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(s) {
    if (!this.hass) return;
    const o = M(this.hass), h = ks(this.amount);
    if (h === null) return this.fail(o.amountInvalid);
    try {
      await Ko(this.hass, this.vehicleId, s, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: h, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", Ni({ vehicleId: this.vehicleId, tripId: s }));
    } catch {
      this.fail(o.expenseCreateError);
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
    const o = M(this.hass), h = ks(this.editingAmount);
    if (h === null) return this.fail(o.amountInvalid);
    if (!Ri(this.editingCategory)) return this.fail(o.categoryInvalid);
    this.expenseSavingId = s.id;
    try {
      await Yo(this.hass, this.vehicleId, s.id, { amount_minor: h, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), Ni({ vehicleId: this.vehicleId, tripId: s.trip_id ?? this.selected }));
    } catch {
      this.fail(o.expenseEditError);
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
        await Xo(this.hass, this.vehicleId, s), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && Ni({ vehicleId: this.vehicleId, tripId: this.selected });
      } catch {
        this.fail(M(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(s) {
    const o = [...Oi];
    return s && !o.includes(s) && o.unshift(s), o;
  }
  async downloadPdf(s) {
    if (!(!this.hass || this.pdfBusyTripId)) {
      this.pdfBusyTripId = s.id, this.actionError = "", this.requestUpdate();
      try {
        const o = await Jo(this.hass, this.vehicleId, s.id), h = atob(o.pdf_base64), d = Uint8Array.from(h, (y) => y.charCodeAt(0)), p = URL.createObjectURL(new Blob([d], { type: o.content_type })), _ = document.createElement("a");
        _.href = p, _.download = o.filename, _.click(), window.setTimeout(() => URL.revokeObjectURL(p), 1e3);
      } catch {
        this.fail(M(this.hass).pdfExportError);
      } finally {
        this.pdfBusyTripId = "", this.requestUpdate();
      }
    }
  }
  renderExpense(s, o) {
    const h = this.editingExpenseId === s.id, d = this.expenseSavingId === s.id;
    return x`<div class="expense-row">${h ? x`<form class="expense-form" @submit=${(p) => {
      p.preventDefault(), this.saveExpense(s);
    }}><select aria-label=${o.category} .value=${this.editingCategory} @change=${(p) => this.setEditingExpenseCategory(p.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((p) => x`<option value=${p}>${Bi(p, this.hass)}</option>`)}</select><input aria-label=${o.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(p) => this.setEditingExpenseAmount(p.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${d}>${d ? o.saving : o.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${d}>${o.cancel}</button></div></form>` : x`<span>${Bi(s.category, this.hass)}: ${ge(s.amount_minor, s.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(s)} ?disabled=${!!this.expenseSavingId}>${o.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(s.id)}>${this.confirmingExpenseId === s.id ? o.confirmDelete : o.remove}</button></span>`}</div>`;
  }
  renderDrive(s, o, h) {
    const d = s.source === "manual" ? h.sourceManual : h.sourceGps, p = s.source === "manual" ? `${s.start_label || "—"} → ${s.end_label || "—"}` : `${h.driveStart}: ${Et(s.started_at, this.hass)} · ${h.driveEnd}: ${Et(s.ended_at, this.hass)}`;
    if (this.editingDriveId === s.id) return x`<form class="form-grid drive-edit-form" @submit=${(f) => {
      f.preventDefault(), this.saveManualDrive(s, o);
    }}><label>${h.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(f) => this.editingDriveOccurredAt = f.currentTarget.value}></label><input aria-label=${h.startLocation} .value=${this.editingDriveStartLocation} @input=${(f) => this.editingDriveStartLocation = f.currentTarget.value}><input aria-label=${h.endLocation} .value=${this.editingDriveEndLocation} @input=${(f) => this.editingDriveEndLocation = f.currentTarget.value}><input aria-label=${h.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(f) => this.editingDriveDistanceKm = f.currentTarget.value}><input aria-label=${h.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(f) => this.editingDriveDurationMinutes = f.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === s.id}>${this.driveSavingId === s.id ? h.saving : h.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${h.cancel}</button></form>`;
    const _ = s.trip_id === o ? x`<button type="button" class="link" @click=${() => this.unassignDrive(o, s.id)}>${h.unassign}</button>` : x`<button type="button" class="link" @click=${() => this.assignDrive(o, s.id)}>${h.assign}</button>`, y = s.source === "manual" ? x`<button type="button" class="link" @click=${() => this.startManualDriveEdit(s)} ?disabled=${!!this.driveSavingId}>${h.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(o, s.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === s.id ? h.confirmDelete : h.remove}</button>` : "";
    return x`<div class="drive-row"><div><strong>${d}</strong> · ${p}<br><span class="muted">${(s.distance_m / 1e3).toFixed(1)} km · ${Zi(s.duration_seconds, this.hass)} · ${s.assignment_status === "assigned" ? h.assignedDrives : h.freeDrives}</span></div><span class="actions">${y}${_}</span></div>`;
  }
  renderGpx(s, o, h) {
    const d = o.find((y) => y.id === this.gpxTripId), p = this.gpxPeriod(), _ = this.gpxTripPeriodWarning(d);
    return x`<ha-card><section class="gpx-import gpx-explicit"><h2>${s.gpxImport}</h2><p class="muted"><strong>${s.gpxVehicle}:</strong> ${this.vehicleId} (${s.gpxVehicleFixed})</p><label>${s.gpxTargetTrip}<select aria-label=${s.gpxTargetTrip} .value=${this.gpxTripId} @change=${(y) => {
      this.gpxTripId = y.currentTarget.value, this.requestUpdate();
    }}><option value="">${s.gpxNoTrip}</option>${o.map((y) => x`<option value=${y.id}>${y.title} · ${Ve(y.status, this.hass)} · ${we(y, this.hass) || s.period}</option>`)}</select></label><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(y) => this.readGPX(y)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || s.gpxPrivacy}</p>${this.gpxError ? x`<p class="error" role="alert">${this.gpxError}</p>` : ""}${h ? x`<div class="gpx-preview"><strong>${h.drives.length} ${s.gpxSections}, ${h.points.length} ${s.gpxPoints}</strong>${p ? x`<p class="muted">${s.gpxPeriod}: ${Et(p.start, this.hass)} – ${Et(p.end, this.hass)}</p>` : ""}${_ ? x`<p class="warning" role="alert">${s.gpxPeriodWarning}</p>` : ""}<h3>${s.gpxSummary}</h3><p class="muted">${h.points.length} ${s.gpxPoints}, ${this.gpxSelected.size} ${s.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${s.gpxDistance}, ${d?.title || s.gpxNoTrip}</p><div class="gpx-drive-list">${h.drives.map((y) => x`<label><input type="checkbox" .checked=${this.gpxSelected.has(y.key)} @change=${(f) => {
      f.currentTarget.checked ? this.gpxSelected.add(y.key) : this.gpxSelected.delete(y.key), this.requestUpdate();
    }}> ${Et(y.started_at, this.hass)} – ${Et(y.ended_at, this.hass)} · ${(y.distance_m / 1e3).toFixed(1)} km · ${Zi(y.duration_seconds, this.hass)}</label>`)}</div>${h.warnings.length ? x`<p class="muted">${s.gpxWarnings}: ${h.warnings.map((y) => y === "gpx_gap_possible_drive_boundary" ? s.gpxGapBoundary : y).join(", ")}</p>` : ""}${h.conflicts.duplicate_file ? x`<p class="error" role="alert">${s.gpxDuplicate}</p>` : x`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? s.saving : s.gpxConfirm}</button>`}</div>` : ""}</section></ha-card>`;
  }
  renderPdfExport(s, o) {
    if (!o.length) return "";
    const h = o.some((p) => p.id === this.pdfSelectedTripId) ? this.pdfSelectedTripId : this.selected || o[0].id, d = o.find((p) => p.id === h) ?? o[0];
    return x`<section class="pdf-export"><h3>${s.pdfExportTitle}</h3><div class="pdf-export-row"><select aria-label=${s.pdfExportTrip} .value=${d.id} @change=${(p) => {
      this.pdfSelectedTripId = p.currentTarget.value, this.requestUpdate();
    }}>${o.map((p) => x`<option value=${p.id}>${p.title}</option>`)}</select><button type="button" @click=${() => {
      this.downloadPdf(d);
    }} ?disabled=${!!this.pdfBusyTripId}>${this.pdfBusyTripId ? s.pdfExporting : s.pdfExport}</button></div></section>`;
  }
  render() {
    const s = M(this.hass), o = this.snapshot?.trips ?? [];
    return x`${this.renderGpx(s, o, this.gpxPreview)}${this.renderPdfExport(s, o)}${this.renderLegacy()}`;
  }
  renderLegacy() {
    const s = M(this.hass), o = this.snapshot?.trips ?? [], h = this.snapshot?.expenses ?? [], d = this.snapshot?.expense_summary, p = d?.mixed_currency ? s.mixedCurrency : d?.total_minor !== void 0 && d.currency ? ge(d.total_minor, d.currency, this.hass) : ge(0, "EUR", this.hass), _ = this.loadError || this.actionError, y = this.gpxPreview;
    return x`<ha-card><h2>${s.manager}</h2>${_ ? x`<p class="error" role="alert">${_}</p>` : ""}<section class="gpx-import"><h3>${s.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(f) => this.readGPX(f)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || s.gpxPrivacy}</p>${this.gpxError ? x`<p class="error" role="alert">${this.gpxError}</p>` : ""}${y ? x`<div class="gpx-preview"><strong>${y.drives.length} ${s.gpxSections}, ${y.points.length} ${s.gpxPoints}</strong><ul>${y.drives.map((f) => x`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(f.key)} @change=${(v) => {
      v.currentTarget.checked ? this.gpxSelected.add(f.key) : this.gpxSelected.delete(f.key), this.requestUpdate();
    }}> ${Et(f.started_at, this.hass)} – ${Et(f.ended_at, this.hass)} · ${(f.distance_m / 1e3).toFixed(1)} km · ${Zi(f.duration_seconds, this.hass)}</label></li>`)}</ul>${y.warnings.length ? x`<p class="muted">${s.gpxWarnings}: ${y.warnings.join(", ")}</p>` : ""}${y.conflicts.duplicate_file ? x`<p class="error" role="alert">${s.gpxDuplicate}</p>` : x`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? s.saving : s.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${s.newTrip}</h3><div class="form-grid"><input aria-label=${s.tripName} placeholder=${s.tripName} .value=${this.tripTitle} @input=${(f) => this.tripTitle = f.target.value}><input aria-label=${s.destination} placeholder=${s.destination} .value=${this.destination} @input=${(f) => this.destination = f.target.value}><label>${s.startDate}<input type="date" .value=${this.tripStartDate} @input=${(f) => this.tripStartDate = f.currentTarget.value}></label><label>${s.endDate}<input type="date" .value=${this.tripEndDate} @input=${(f) => this.tripEndDate = f.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${s.create}</button></div></section><section><h3>${s.trips}</h3>${o.length ? o.map((f) => x`<article class="trip"><div class="row"><strong>${f.title}</strong><span class="muted">${f.destination || ""} · ${Ve(f.status, this.hass)} · ${we(f, this.hass) || s.period}</span></div>${this.editingTripId === f.id ? x`<form class="form-grid" @submit=${(v) => {
      v.preventDefault(), this.saveTrip(f);
    }}><input aria-label=${s.tripName} .value=${this.editingTripTitle} @input=${(v) => this.editingTripTitle = v.currentTarget.value}><input aria-label=${s.destination} .value=${this.editingDestination} @input=${(v) => this.editingDestination = v.currentTarget.value}><label>${s.startDate}<input type="date" .value=${this.editingStartDate} @input=${(v) => this.editingStartDate = v.currentTarget.value}></label><label>${s.endDate}<input type="date" .value=${this.editingEndDate} @input=${(v) => this.editingEndDate = v.currentTarget.value}></label><button type="submit">${s.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${s.cancel}</button></form>` : x`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(f)}>${s.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(f.id)}>${this.confirmingTripId === f.id ? s.confirmDelete : s.remove}</button>${f.status === "planned" || f.status === "paused" ? x`<button type="button" @click=${() => this.changeStatus(f.id, "active")}>${s.resume}</button>` : ""}${f.status === "active" ? x`<button type="button" class="secondary" @click=${() => this.changeStatus(f.id, "paused")}>${s.pause}</button><button type="button" @click=${() => this.changeStatus(f.id, "completed")}>${s.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(f.id)}>${this.selected === f.id ? s.close : s.details}</button></div>`}${this.selected === f.id ? x`<div class="details"><h4>${s.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((v) => this.renderDrive(v, f.id, s)) : x`<p class="muted">${s.noDrives}</p>`}<h4>${s.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((v) => this.renderDrive(v, f.id, s)) : x`<p class="muted">${s.noDrives}</p>`}<h4>${s.manualDrive}</h4><div class="form-grid"><label>${s.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(v) => this.manualOccurredAt = v.currentTarget.value}></label><input aria-label=${s.startLocation} placeholder=${s.startLocation} .value=${this.manualStartLocation} @input=${(v) => this.manualStartLocation = v.currentTarget.value}><input aria-label=${s.endLocation} placeholder=${s.endLocation} .value=${this.manualEndLocation} @input=${(v) => this.manualEndLocation = v.currentTarget.value}><input aria-label=${s.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${s.distanceKm} .value=${this.manualDistanceKm} @input=${(v) => this.manualDistanceKm = v.currentTarget.value}><input aria-label=${s.durationMinutes} type="number" min="0" step="1" placeholder=${s.durationMinutes} .value=${this.manualDurationMinutes} @input=${(v) => this.manualDurationMinutes = v.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(f.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? s.saving : s.createDrive}</button></div><h4>${s.expenses}</h4><div class="expense-form create-form"><input aria-label=${s.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(v) => this.setExpenseAmount(v.currentTarget.value)}><select aria-label=${s.category} .value=${this.category} @change=${(v) => this.setExpenseCategory(v.currentTarget.value)}>${Oi.map((v) => x`<option value=${v}>${Bi(v, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(f.id)}>${s.save}</button></div>${h.map((v) => this.renderExpense(v, s))}<p class="total"><strong>${s.total}: ${p}</strong></p></div>` : ""}</article>`) : x`<p class="muted">${s.noTrip}</p>`}</section></ha-card>`;
  }
}
Ke.styles = [Xt.styles, Zt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
Ke.styles = [...Ke.styles, Zt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.pdf-export-row select{min-width:0;flex:1 1 14rem;padding:8px;border:1px solid var(--divider-color);border-radius:6px;background:var(--card-background-color);color:var(--primary-text-color)}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}`];
tn("camper-travel-journal-manager-card", Ke);
const ra = 1e4;
function Ui() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Fi(c) {
  return c.length <= 8 ? "••••" : `${c.slice(0, 4)}…${c.slice(-4)}`;
}
function $s(c) {
  return c?.connection ? c.connection.connected === !0 ? "available" : c.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function oa(c) {
  const s = c, o = typeof s?.code == "string" ? s.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", h = typeof s?.message == "string" ? s.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: o, errorMessage: h };
}
function aa(c, s) {
  return new Promise((o, h) => {
    const d = setTimeout(() => h(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), s);
    c.then((p) => {
      clearTimeout(d), o(p);
    }, (p) => {
      clearTimeout(d), h(p);
    });
  });
}
async function Hi(c, s, o, h) {
  const d = Ui();
  try {
    const p = await aa(c.connection.sendMessagePromise(s), h);
    return { ...o(p), durationMs: Math.round(Ui() - d), value: p };
  } catch (p) {
    return { state: "failed", durationMs: Math.round(Ui() - d), ...oa(p) };
  }
}
function ha(c) {
  return c && typeof c == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function la(c) {
  const s = c?.vehicles;
  return Array.isArray(s) && s.every((o) => o && typeof o == "object" && typeof o.vehicle_id == "string") ? { state: "success", structure: "ok", count: s.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function ca(c) {
  const s = c;
  return Array.isArray(s?.trips) && Array.isArray(s?.drives) && Array.isArray(s?.stops) ? { state: "success", structure: "ok", count: s.trips.length, drivesCount: s.drives.length, stopsCount: s.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function da(c, s, o = ra) {
  const h = { state: "not_run", durationMs: null };
  if (!c?.connection) return { version: "0.2.0-beta.5", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: h, vehicles: h, trips: h, vehicleId: Fi(s) };
  const d = $s(c), p = await Hi(c, { type: "auth/current_user" }, ha, o), _ = await Hi(c, { type: "camper_travel_journal/list_vehicles" }, la, o), y = _.value?.vehicles?.filter((Jt) => typeof Jt.vehicle_id == "string") ?? [], f = y.length === 1 ? y[0].vehicle_id : void 0, S = await Hi(c, { type: "camper_travel_journal/list", vehicle_id: f ?? s }, ca, o), { value: w, ...Z } = p, { value: X, ...Y } = _, { value: D, ...Bt } = S;
  return {
    version: "0.2.0-beta.5",
    connectionBefore: d,
    connectionAfter: $s(c),
    authentication: Z,
    vehicles: Y,
    trips: Bt,
    vehicleId: Fi(s),
    ...f ? { resolvedVehicleId: Fi(f) } : {}
  };
}
function Wi(c) {
  return JSON.stringify(c, null, 2);
}
function qi(c) {
  return c.state === "success" ? "erfolgreich" : c.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const As = "01M4XW0KD3GQ0KASAYHQ29840P";
class ua extends zt {
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
      this.report = await da(this._hass, this.config.vehicle_id);
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
    return x`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? x`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? x`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${s ? x`<dl>
        <dt>Version</dt><dd>${s.version}</dd>
        <dt>Verbindung vorher</dt><dd>${s.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${s.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${qi(s.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${qi(s.vehicles)}${s.vehicles.durationMs === null ? "" : ` (${s.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${qi(s.trips)}${s.trips.durationMs === null ? "" : ` (${s.trips.durationMs} ms)`}${s.trips.state === "success" ? ` · ${s.trips.count ?? 0} Reisen / ${s.trips.drivesCount ?? 0} Fahrten / ${s.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${s.vehicles.structure === "ok" && s.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Wi(s)}</pre>${this.manualCopy ? x`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Wi(s)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${s ? "Diagnose wiederholen" : "Diagnose starten"}</button>${s ? x`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? x`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", ua);
var me = { exports: {} };
var pa = me.exports, Ms;
function fa() {
  return Ms || (Ms = 1, (function(c, s) {
    (function(o, h) {
      h(s);
    })(pa, (function(o) {
      var h = "1.9.4";
      function d(t) {
        var e, i, n, r;
        for (i = 1, n = arguments.length; i < n; i++) {
          r = arguments[i];
          for (e in r)
            t[e] = r[e];
        }
        return t;
      }
      var p = Object.create || /* @__PURE__ */ (function() {
        function t() {
        }
        return function(e) {
          return t.prototype = e, new t();
        };
      })();
      function _(t, e) {
        var i = Array.prototype.slice;
        if (t.bind)
          return t.bind.apply(t, i.call(arguments, 1));
        var n = i.call(arguments, 2);
        return function() {
          return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments);
        };
      }
      var y = 0;
      function f(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++y), t._leaflet_id;
      }
      function v(t, e, i) {
        var n, r, a, l;
        return l = function() {
          n = !1, r && (a.apply(i, r), r = !1);
        }, a = function() {
          n ? r = arguments : (t.apply(i, arguments), setTimeout(l, e), n = !0);
        }, a;
      }
      function S(t, e, i) {
        var n = e[1], r = e[0], a = n - r;
        return t === n && i ? t : ((t - r) % a + a) % a + r;
      }
      function w() {
        return !1;
      }
      function Z(t, e) {
        if (e === !1)
          return t;
        var i = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * i) / i;
      }
      function X(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function Y(t) {
        return X(t).split(/\s+/);
      }
      function D(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? p(t.options) : {});
        for (var i in e)
          t.options[i] = e[i];
        return t.options;
      }
      function Bt(t, e, i) {
        var n = [];
        for (var r in t)
          n.push(encodeURIComponent(i ? r.toUpperCase() : r) + "=" + encodeURIComponent(t[r]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + n.join("&");
      }
      var Jt = /\{ *([\w_ -]+) *\}/g;
      function en(t, e) {
        return t.replace(Jt, function(i, n) {
          var r = e[n];
          if (r === void 0)
            throw new Error("No value provided for variable " + i);
          return typeof r == "function" && (r = r(e)), r;
        });
      }
      var ht = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function Je(t, e) {
        for (var i = 0; i < t.length; i++)
          if (t[i] === e)
            return i;
        return -1;
      }
      var Te = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function Qe(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var nn = 0;
      function sn(t) {
        var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - nn));
        return nn = e + i, window.setTimeout(t, i);
      }
      var ti = window.requestAnimationFrame || Qe("RequestAnimationFrame") || sn, rn = window.cancelAnimationFrame || Qe("CancelAnimationFrame") || Qe("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function Q(t, e, i) {
        if (i && ti === sn)
          t.call(e);
        else
          return ti.call(window, _(t, e));
      }
      function st(t) {
        t && rn.call(window, t);
      }
      var Gs = {
        __proto__: null,
        extend: d,
        create: p,
        bind: _,
        get lastId() {
          return y;
        },
        stamp: f,
        throttle: v,
        wrapNum: S,
        falseFn: w,
        formatNum: Z,
        trim: X,
        splitWords: Y,
        setOptions: D,
        getParamString: Bt,
        template: en,
        isArray: ht,
        indexOf: Je,
        emptyImageUrl: Te,
        requestFn: ti,
        cancelFn: rn,
        requestAnimFrame: Q,
        cancelAnimFrame: st
      };
      function _t() {
      }
      _t.extend = function(t) {
        var e = function() {
          D(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, i = e.__super__ = this.prototype, n = p(i);
        n.constructor = e, e.prototype = n;
        for (var r in this)
          Object.prototype.hasOwnProperty.call(this, r) && r !== "prototype" && r !== "__super__" && (e[r] = this[r]);
        return t.statics && d(e, t.statics), t.includes && (js(t.includes), d.apply(null, [n].concat(t.includes))), d(n, t), delete n.statics, delete n.includes, n.options && (n.options = i.options ? p(i.options) : {}, d(n.options, t.options)), n._initHooks = [], n.callInitHooks = function() {
          if (!this._initHooksCalled) {
            i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var a = 0, l = n._initHooks.length; a < l; a++)
              n._initHooks[a].call(this);
          }
        }, e;
      }, _t.include = function(t) {
        var e = this.prototype.options;
        return d(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, _t.mergeOptions = function(t) {
        return d(this.prototype.options, t), this;
      }, _t.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
      };
      function js(t) {
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
            for (var r = 0, a = t.length; r < a; r++)
              this._on(t[r], e, i);
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
            for (var r = arguments.length === 1, a = 0, l = t.length; a < l; a++)
              r ? this._off(t[a]) : this._off(t[a], e, i);
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
            var r = { fn: e, ctx: i };
            n && (r.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(r);
          }
        },
        _off: function(t, e, i) {
          var n, r, a;
          if (this._events && (n = this._events[t], !!n)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (r = 0, a = n.length; r < a; r++)
                  n[r].fn = w;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var l = this._listens(t, e, i);
            if (l !== !1) {
              var u = n[l];
              this._firingCount && (u.fn = w, this._events[t] = n = n.slice()), n.splice(l, 1);
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
          var n = d({}, e, {
            type: t,
            target: this,
            sourceTarget: e && e.sourceTarget || this
          });
          if (this._events) {
            var r = this._events[t];
            if (r) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var a = 0, l = r.length; a < l; a++) {
                var u = r[a], m = u.fn;
                u.once && this.off(t, m, u.ctx), m.call(u.ctx || this, n);
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
          var r = e;
          typeof e != "function" && (n = !!e, r = void 0, i = void 0);
          var a = this._events && this._events[t];
          if (a && a.length && this._listens(t, r, i) !== !1)
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
          for (var r = 0, a = n.length; r < a; r++)
            if (n[r].fn === e && n[r].ctx === i)
              return r;
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
            for (var r = 0, a = t.length; r < a; r++)
              this._on(t[r], e, i, !0);
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
            this._eventParents[e].fire(t.type, d({
              layer: t.target,
              propagatedFrom: t.target
            }, t), !0);
        }
      };
      nt.addEventListener = nt.on, nt.removeEventListener = nt.clearAllEventListeners = nt.off, nt.addOneTimeEventListener = nt.once, nt.fireEvent = nt.fire, nt.hasEventListeners = nt.listens;
      var Qt = _t.extend(nt);
      function C(t, e, i) {
        this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
      }
      var on = Math.trunc || function(t) {
        return t > 0 ? Math.floor(t) : Math.ceil(t);
      };
      C.prototype = {
        // @method clone(): Point
        // Returns a copy of the current point.
        clone: function() {
          return new C(this.x, this.y);
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
          return new C(this.x * t.x, this.y * t.y);
        },
        // @method unscaleBy(scale: Point): Point
        // Inverse of `scaleBy`. Divide each coordinate of the current point by
        // each coordinate of `scale`.
        unscaleBy: function(t) {
          return new C(this.x / t.x, this.y / t.y);
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
          return this.x = on(this.x), this.y = on(this.y), this;
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
          return "Point(" + Z(this.x) + ", " + Z(this.y) + ")";
        }
      };
      function E(t, e, i) {
        return t instanceof C ? t : ht(t) ? new C(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new C(t.x, t.y) : new C(t, e, i);
      }
      function N(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, n = 0, r = i.length; n < r; n++)
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
          if (t instanceof C || typeof t[0] == "number" || "x" in t)
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
          return typeof t[0] == "number" || t instanceof C ? t = E(t) : t = tt(t), t instanceof N ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = tt(t);
          var e = this.min, i = this.max, n = t.min, r = t.max, a = r.x >= e.x && n.x <= i.x, l = r.y >= e.y && n.y <= i.y;
          return a && l;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = tt(t);
          var e = this.min, i = this.max, n = t.min, r = t.max, a = r.x > e.x && n.x < i.x, l = r.y > e.y && n.y < i.y;
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
          var e = this.min, i = this.max, n = Math.abs(e.x - i.x) * t, r = Math.abs(e.y - i.y) * t;
          return tt(
            E(e.x - n, e.y - r),
            E(i.x + n, i.y + r)
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
          for (var i = e ? [t, e] : t, n = 0, r = i.length; n < r; n++)
            this.extend(i[n]);
      }
      et.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, i = this._northEast, n, r;
          if (t instanceof B)
            n = t, r = t;
          else if (t instanceof et) {
            if (n = t._southWest, r = t._northEast, !n || !r)
              return this;
          } else
            return t ? this.extend(I(t) || H(t)) : this;
          return !e && !i ? (this._southWest = new B(n.lat, n.lng), this._northEast = new B(r.lat, r.lng)) : (e.lat = Math.min(n.lat, e.lat), e.lng = Math.min(n.lng, e.lng), i.lat = Math.max(r.lat, i.lat), i.lng = Math.max(r.lng, i.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, i = this._northEast, n = Math.abs(e.lat - i.lat) * t, r = Math.abs(e.lng - i.lng) * t;
          return new et(
            new B(e.lat - n, e.lng - r),
            new B(i.lat + n, i.lng + r)
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
          typeof t[0] == "number" || t instanceof B || "lat" in t ? t = I(t) : t = H(t);
          var e = this._southWest, i = this._northEast, n, r;
          return t instanceof et ? (n = t.getSouthWest(), r = t.getNorthEast()) : n = r = t, n.lat >= e.lat && r.lat <= i.lat && n.lng >= e.lng && r.lng <= i.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = H(t);
          var e = this._southWest, i = this._northEast, n = t.getSouthWest(), r = t.getNorthEast(), a = r.lat >= e.lat && n.lat <= i.lat, l = r.lng >= e.lng && n.lng <= i.lng;
          return a && l;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = H(t);
          var e = this._southWest, i = this._northEast, n = t.getSouthWest(), r = t.getNorthEast(), a = r.lat > e.lat && n.lat < i.lat, l = r.lng > e.lng && n.lng < i.lng;
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
          return t ? (t = H(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function H(t, e) {
        return t instanceof et ? t : new et(t, e);
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
          t = I(t);
          var i = Math.max(
            Math.abs(this.lat - t.lat),
            Math.abs(this.lng - t.lng)
          );
          return i <= (e === void 0 ? 1e-9 : e);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(t) {
          return "LatLng(" + Z(this.lat, t) + ", " + Z(this.lng, t) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(t) {
          return wt.distance(this, I(t));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return wt.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(t) {
          var e = 180 * t / 40075017, i = e / Math.cos(Math.PI / 180 * this.lat);
          return H(
            [this.lat - e, this.lng - i],
            [this.lat + e, this.lng + i]
          );
        },
        clone: function() {
          return new B(this.lat, this.lng, this.alt);
        }
      };
      function I(t, e, i) {
        return t instanceof B ? t : ht(t) && typeof t[0] != "object" ? t.length === 3 ? new B(t[0], t[1], t[2]) : t.length === 2 ? new B(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new B(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new B(t, e, i);
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
          var e = this.projection.bounds, i = this.scale(t), n = this.transformation.transform(e.min, i), r = this.transformation.transform(e.max, i);
          return new N(n, r);
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
          var e = this.wrapLng ? S(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? S(t.lat, this.wrapLat, !0) : t.lat, n = t.alt;
          return new B(i, e, n);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), i = this.wrapLatLng(e), n = e.lat - i.lat, r = e.lng - i.lng;
          if (n === 0 && r === 0)
            return t;
          var a = t.getSouthWest(), l = t.getNorthEast(), u = new B(a.lat - n, a.lng - r), m = new B(l.lat - n, l.lng - r);
          return new et(u, m);
        }
      }, wt = d({}, gt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(t, e) {
          var i = Math.PI / 180, n = t.lat * i, r = e.lat * i, a = Math.sin((e.lat - t.lat) * i / 2), l = Math.sin((e.lng - t.lng) * i / 2), u = a * a + Math.cos(n) * Math.cos(r) * l * l, m = 2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u));
          return this.R * m;
        }
      }), an = 6378137, ei = {
        R: an,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, i = this.MAX_LATITUDE, n = Math.max(Math.min(i, t.lat), -i), r = Math.sin(n * e);
          return new C(
            this.R * t.lng * e,
            this.R * Math.log((1 + r) / (1 - r)) / 2
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
          var t = an * Math.PI;
          return new N([-t, -t], [t, t]);
        })()
      };
      function ii(t, e, i, n) {
        if (ht(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = i, this._d = n;
      }
      ii.prototype = {
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
          return e = e || 1, new C(
            (t.x / e - this._b) / this._a,
            (t.y / e - this._d) / this._c
          );
        }
      };
      function te(t, e, i, n) {
        return new ii(t, e, i, n);
      }
      var ni = d({}, wt, {
        code: "EPSG:3857",
        projection: ei,
        transformation: (function() {
          var t = 0.5 / (Math.PI * ei.R);
          return te(t, 0.5, -t, 0.5);
        })()
      }), Vs = d({}, ni, {
        code: "EPSG:900913"
      });
      function hn(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function ln(t, e) {
        var i = "", n, r, a, l, u, m;
        for (n = 0, a = t.length; n < a; n++) {
          for (u = t[n], r = 0, l = u.length; r < l; r++)
            m = u[r], i += (r ? "L" : "M") + m.x + " " + m.y;
          i += e ? P.svg ? "z" : "x" : "";
        }
        return i || "M0 0";
      }
      var si = document.documentElement.style, Ee = "ActiveXObject" in window, Ks = Ee && !document.addEventListener, cn = "msLaunchUri" in navigator && !("documentMode" in document), ri = dt("webkit"), dn = dt("android"), un = dt("android 2") || dt("android 3"), Ys = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), Xs = dn && dt("Google") && Ys < 537 && !("AudioNode" in window), oi = !!window.opera, pn = !cn && dt("chrome"), fn = dt("gecko") && !ri && !oi && !Ee, Js = !pn && dt("safari"), mn = dt("phantom"), _n = "OTransition" in si, Qs = navigator.platform.indexOf("Win") === 0, gn = Ee && "transition" in si, ai = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !un, vn = "MozPerspective" in si, tr = !window.L_DISABLE_3D && (gn || ai || vn) && !_n && !mn, ee = typeof orientation < "u" || dt("mobile"), er = ee && ri, ir = ee && ai, yn = !window.PointerEvent && window.MSPointerEvent, xn = !!(window.PointerEvent || yn), bn = "ontouchstart" in window || !!window.TouchEvent, nr = !window.L_NO_TOUCH && (bn || xn), sr = ee && oi, rr = ee && fn, or = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, ar = (function() {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function() {
              t = !0;
            }
          });
          window.addEventListener("testPassiveEventSupport", w, e), window.removeEventListener("testPassiveEventSupport", w, e);
        } catch {
        }
        return t;
      })(), hr = (function() {
        return !!document.createElement("canvas").getContext;
      })(), hi = !!(document.createElementNS && hn("svg").createSVGRect), lr = !!hi && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), cr = !hi && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), dr = navigator.platform.indexOf("Mac") === 0, ur = navigator.platform.indexOf("Linux") === 0;
      function dt(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var P = {
        ie: Ee,
        ielt9: Ks,
        edge: cn,
        webkit: ri,
        android: dn,
        android23: un,
        androidStock: Xs,
        opera: oi,
        chrome: pn,
        gecko: fn,
        safari: Js,
        phantom: mn,
        opera12: _n,
        win: Qs,
        ie3d: gn,
        webkit3d: ai,
        gecko3d: vn,
        any3d: tr,
        mobile: ee,
        mobileWebkit: er,
        mobileWebkit3d: ir,
        msPointer: yn,
        pointer: xn,
        touch: nr,
        touchNative: bn,
        mobileOpera: sr,
        mobileGecko: rr,
        retina: or,
        passiveEvents: ar,
        canvas: hr,
        svg: hi,
        vml: cr,
        inlineSvg: lr,
        mac: dr,
        linux: ur
      }, wn = P.msPointer ? "MSPointerDown" : "pointerdown", Pn = P.msPointer ? "MSPointerMove" : "pointermove", Tn = P.msPointer ? "MSPointerUp" : "pointerup", En = P.msPointer ? "MSPointerCancel" : "pointercancel", li = {
        touchstart: wn,
        touchmove: Pn,
        touchend: Tn,
        touchcancel: En
      }, Ln = {
        touchstart: vr,
        touchmove: Le,
        touchend: Le,
        touchcancel: Le
      }, Rt = {}, Sn = !1;
      function pr(t, e, i) {
        return e === "touchstart" && gr(), Ln[e] ? (i = Ln[e].bind(this, i), t.addEventListener(li[e], i, !1), i) : (console.warn("wrong event specified:", e), w);
      }
      function fr(t, e, i) {
        if (!li[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(li[e], i, !1);
      }
      function mr(t) {
        Rt[t.pointerId] = t;
      }
      function _r(t) {
        Rt[t.pointerId] && (Rt[t.pointerId] = t);
      }
      function Cn(t) {
        delete Rt[t.pointerId];
      }
      function gr() {
        Sn || (document.addEventListener(wn, mr, !0), document.addEventListener(Pn, _r, !0), document.addEventListener(Tn, Cn, !0), document.addEventListener(En, Cn, !0), Sn = !0);
      }
      function Le(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var i in Rt)
            e.touches.push(Rt[i]);
          e.changedTouches = [e], t(e);
        }
      }
      function vr(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && V(e), Le(t, e);
      }
      function yr(t) {
        var e = {}, i, n;
        for (n in t)
          i = t[n], e[n] = i && i.bind ? i.bind(t) : i;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var xr = 200;
      function br(t, e) {
        t.addEventListener("dblclick", e);
        var i = 0, n;
        function r(a) {
          if (a.detail !== 1) {
            n = a.detail;
            return;
          }
          if (!(a.pointerType === "mouse" || a.sourceCapabilities && !a.sourceCapabilities.firesTouchEvents)) {
            var l = Dn(a);
            if (!(l.some(function(m) {
              return m instanceof HTMLLabelElement && m.attributes.for;
            }) && !l.some(function(m) {
              return m instanceof HTMLInputElement || m instanceof HTMLSelectElement;
            }))) {
              var u = Date.now();
              u - i <= xr ? (n++, n === 2 && e(yr(a))) : n = 1, i = u;
            }
          }
        }
        return t.addEventListener("click", r), {
          dblclick: e,
          simDblclick: r
        };
      }
      function wr(t, e) {
        t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
      }
      var ci = ke(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), ie = ke(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), kn = ie === "webkitTransition" || ie === "OTransition" ? ie + "End" : "transitionend";
      function $n(t) {
        return typeof t == "string" ? document.getElementById(t) : t;
      }
      function ne(t, e) {
        var i = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!i || i === "auto") && document.defaultView) {
          var n = document.defaultView.getComputedStyle(t, null);
          i = n ? n[e] : null;
        }
        return i === "auto" ? null : i;
      }
      function O(t, e, i) {
        var n = document.createElement(t);
        return n.className = e || "", i && i.appendChild(n), n;
      }
      function U(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function Se(t) {
        for (; t.firstChild; )
          t.removeChild(t.firstChild);
      }
      function Nt(t) {
        var e = t.parentNode;
        e && e.lastChild !== t && e.appendChild(t);
      }
      function Ut(t) {
        var e = t.parentNode;
        e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
      }
      function di(t, e) {
        if (t.classList !== void 0)
          return t.classList.contains(e);
        var i = Ce(t);
        return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
      }
      function $(t, e) {
        if (t.classList !== void 0)
          for (var i = Y(e), n = 0, r = i.length; n < r; n++)
            t.classList.add(i[n]);
        else if (!di(t, e)) {
          var a = Ce(t);
          ui(t, (a ? a + " " : "") + e);
        }
      }
      function F(t, e) {
        t.classList !== void 0 ? t.classList.remove(e) : ui(t, X((" " + Ce(t) + " ").replace(" " + e + " ", " ")));
      }
      function ui(t, e) {
        t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
      }
      function Ce(t) {
        return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
      }
      function rt(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && Pr(t, e);
      }
      function Pr(t, e) {
        var i = !1, n = "DXImageTransform.Microsoft.Alpha";
        try {
          i = t.filters.item(n);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")";
      }
      function ke(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
          if (t[i] in e)
            return t[i];
        return !1;
      }
      function Ct(t, e, i) {
        var n = e || new C(0, 0);
        t.style[ci] = (P.ie3d ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (i ? " scale(" + i + ")" : "");
      }
      function W(t, e) {
        t._leaflet_pos = e, P.any3d ? Ct(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
      }
      function kt(t) {
        return t._leaflet_pos || new C(0, 0);
      }
      var se, re, pi;
      if ("onselectstart" in document)
        se = function() {
          k(window, "selectstart", V);
        }, re = function() {
          R(window, "selectstart", V);
        };
      else {
        var oe = ke(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        se = function() {
          if (oe) {
            var t = document.documentElement.style;
            pi = t[oe], t[oe] = "none";
          }
        }, re = function() {
          oe && (document.documentElement.style[oe] = pi, pi = void 0);
        };
      }
      function fi() {
        k(window, "dragstart", V);
      }
      function mi() {
        R(window, "dragstart", V);
      }
      var $e, _i;
      function gi(t) {
        for (; t.tabIndex === -1; )
          t = t.parentNode;
        t.style && (Ae(), $e = t, _i = t.style.outlineStyle, t.style.outlineStyle = "none", k(window, "keydown", Ae));
      }
      function Ae() {
        $e && ($e.style.outlineStyle = _i, $e = void 0, _i = void 0, R(window, "keydown", Ae));
      }
      function An(t) {
        do
          t = t.parentNode;
        while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
        return t;
      }
      function vi(t) {
        var e = t.getBoundingClientRect();
        return {
          x: e.width / t.offsetWidth || 1,
          y: e.height / t.offsetHeight || 1,
          boundingClientRect: e
        };
      }
      var Tr = {
        __proto__: null,
        TRANSFORM: ci,
        TRANSITION: ie,
        TRANSITION_END: kn,
        get: $n,
        getStyle: ne,
        create: O,
        remove: U,
        empty: Se,
        toFront: Nt,
        toBack: Ut,
        hasClass: di,
        addClass: $,
        removeClass: F,
        setClass: ui,
        getClass: Ce,
        setOpacity: rt,
        testProp: ke,
        setTransform: Ct,
        setPosition: W,
        getPosition: kt,
        get disableTextSelection() {
          return se;
        },
        get enableTextSelection() {
          return re;
        },
        disableImageDrag: fi,
        enableImageDrag: mi,
        preventOutline: gi,
        restoreOutline: Ae,
        getSizedParentNode: An,
        getScale: vi
      };
      function k(t, e, i, n) {
        if (e && typeof e == "object")
          for (var r in e)
            xi(t, r, e[r], i);
        else {
          e = Y(e);
          for (var a = 0, l = e.length; a < l; a++)
            xi(t, e[a], i, n);
        }
        return this;
      }
      var ut = "_leaflet_events";
      function R(t, e, i, n) {
        if (arguments.length === 1)
          Mn(t), delete t[ut];
        else if (e && typeof e == "object")
          for (var r in e)
            bi(t, r, e[r], i);
        else if (e = Y(e), arguments.length === 2)
          Mn(t, function(u) {
            return Je(e, u) !== -1;
          });
        else
          for (var a = 0, l = e.length; a < l; a++)
            bi(t, e[a], i, n);
        return this;
      }
      function Mn(t, e) {
        for (var i in t[ut]) {
          var n = i.split(/\d/)[0];
          (!e || e(n)) && bi(t, n, null, null, i);
        }
      }
      var yi = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function xi(t, e, i, n) {
        var r = e + f(i) + (n ? "_" + f(n) : "");
        if (t[ut] && t[ut][r])
          return this;
        var a = function(u) {
          return i.call(n || t, u || window.event);
        }, l = a;
        !P.touchNative && P.pointer && e.indexOf("touch") === 0 ? a = pr(t, e, a) : P.touch && e === "dblclick" ? a = br(t, a) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(yi[e] || e, a, P.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (a = function(u) {
          u = u || window.event, Pi(t, u) && l(u);
        }, t.addEventListener(yi[e], a, !1)) : t.addEventListener(e, l, !1) : t.attachEvent("on" + e, a), t[ut] = t[ut] || {}, t[ut][r] = a;
      }
      function bi(t, e, i, n, r) {
        r = r || e + f(i) + (n ? "_" + f(n) : "");
        var a = t[ut] && t[ut][r];
        if (!a)
          return this;
        !P.touchNative && P.pointer && e.indexOf("touch") === 0 ? fr(t, e, a) : P.touch && e === "dblclick" ? wr(t, a) : "removeEventListener" in t ? t.removeEventListener(yi[e] || e, a, !1) : t.detachEvent("on" + e, a), t[ut][r] = null;
      }
      function $t(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
      }
      function wi(t) {
        return xi(t, "wheel", $t), this;
      }
      function ae(t) {
        return k(t, "mousedown touchstart dblclick contextmenu", $t), t._leaflet_disable_click = !0, this;
      }
      function V(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
      }
      function At(t) {
        return V(t), $t(t), this;
      }
      function Dn(t) {
        if (t.composedPath)
          return t.composedPath();
        for (var e = [], i = t.target; i; )
          e.push(i), i = i.parentNode;
        return e;
      }
      function In(t, e) {
        if (!e)
          return new C(t.clientX, t.clientY);
        var i = vi(e), n = i.boundingClientRect;
        return new C(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - n.left) / i.x - e.clientLeft,
          (t.clientY - n.top) / i.y - e.clientTop
        );
      }
      var Er = P.linux && P.chrome ? window.devicePixelRatio : P.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function zn(t) {
        return P.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / Er : (
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
      function Pi(t, e) {
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
      var Lr = {
        __proto__: null,
        on: k,
        off: R,
        stopPropagation: $t,
        disableScrollPropagation: wi,
        disableClickPropagation: ae,
        preventDefault: V,
        stop: At,
        getPropagationPath: Dn,
        getMousePosition: In,
        getWheelDelta: zn,
        isExternalTarget: Pi,
        addListener: k,
        removeListener: R
      }, On = Qt.extend({
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
      }), z = Qt.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: ni,
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
          e = D(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = _(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(I(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = ie && P.any3d && !P.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), k(this._proxy, kn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(t, e, i) {
          if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(I(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
            i.animate !== void 0 && (i.zoom = d({ animate: i.animate }, i.zoom), i.pan = d({ animate: i.animate, duration: i.duration }, i.pan));
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
          return t = t || (P.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(t, e) {
          return t = t || (P.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(t, e, i) {
          var n = this.getZoomScale(e), r = this.getSize().divideBy(2), a = t instanceof C ? t : this.latLngToContainerPoint(t), l = a.subtract(r).multiplyBy(1 - 1 / n), u = this.containerPointToLatLng(r.add(l));
          return this.setView(u, e, { zoom: i });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : H(t);
          var i = E(e.paddingTopLeft || e.padding || [0, 0]), n = E(e.paddingBottomRight || e.padding || [0, 0]), r = this.getBoundsZoom(t, !1, i.add(n));
          if (r = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, r) : r, r === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: r
            };
          var a = n.subtract(i).divideBy(2), l = this.project(t.getSouthWest(), r), u = this.project(t.getNorthEast(), r), m = this.unproject(l.add(u).divideBy(2).add(a), r);
          return {
            center: m,
            zoom: r
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = H(t), !t.isValid())
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
          if (this._panAnim || (this._panAnim = new On(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
            $(this._mapPane, "leaflet-pan-anim");
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
          if (i = i || {}, i.animate === !1 || !P.any3d)
            return this.setView(t, e, i);
          this._stop();
          var n = this.project(this.getCenter()), r = this.project(t), a = this.getSize(), l = this._zoom;
          t = I(t), e = e === void 0 ? l : e;
          var u = Math.max(a.x, a.y), m = u * this.getZoomScale(l, e), g = r.distanceTo(n) || 1, b = 1.42, T = b * b;
          function A(q) {
            var He = q ? -1 : 1, mo = q ? m : u, _o = m * m - u * u + He * T * T * g * g, go = 2 * mo * T * g, Ii = _o / go, _s = Math.sqrt(Ii * Ii + 1) - Ii, vo = _s < 1e-9 ? -18 : Math.log(_s);
            return vo;
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
          var it = A(0);
          function jt(q) {
            return u * (G(it) / G(it + b * q));
          }
          function co(q) {
            return u * (G(it) * at(it + b * q) - J(it)) / T;
          }
          function uo(q) {
            return 1 - Math.pow(1 - q, 1.5);
          }
          var po = Date.now(), fs = (A(1) - it) / b, fo = i.duration ? 1e3 * i.duration : 1e3 * fs * 0.8;
          function ms() {
            var q = (Date.now() - po) / fo, He = uo(q) * fs;
            q <= 1 ? (this._flyToFrame = Q(ms, this), this._move(
              this.unproject(n.add(r.subtract(n).multiplyBy(co(He) / g)), l),
              this.getScaleZoom(u / jt(He), l),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, i.noMoveStart), ms.call(this), this;
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
          return t = H(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
          var i = this.getCenter(), n = this._limitCenter(i, this._zoom, H(t));
          return i.equals(n) || this.panTo(n, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var i = E(e.paddingTopLeft || e.padding || [0, 0]), n = E(e.paddingBottomRight || e.padding || [0, 0]), r = this.project(this.getCenter()), a = this.project(t), l = this.getPixelBounds(), u = tt([l.min.add(i), l.max.subtract(n)]), m = u.getSize();
          if (!u.contains(a)) {
            this._enforcingBounds = !0;
            var g = a.subtract(u.getCenter()), b = u.extend(a).getSize().subtract(m);
            r.x += g.x < 0 ? -b.x : b.x, r.y += g.y < 0 ? -b.y : b.y, this.panTo(this.unproject(r), e), this._enforcingBounds = !1;
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
          t = d({
            animate: !1,
            pan: !0
          }, t === !0 ? { animate: !0 } : t);
          var e = this.getSize();
          this._sizeChanged = !0, this._lastCenter = null;
          var i = this.getSize(), n = e.divideBy(2).round(), r = i.divideBy(2).round(), a = n.subtract(r);
          return !a.x && !a.y ? this : (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(_(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
          if (t = this._locateOptions = d({
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
          var e = _(this._handleGeolocationResponse, this), i = _(this._handleGeolocationError, this);
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
            var e = t.coords.latitude, i = t.coords.longitude, n = new B(e, i), r = n.toBounds(t.coords.accuracy * 2), a = this._locateOptions;
            if (a.setView) {
              var l = this.getBoundsZoom(r);
              this.setView(n, a.maxZoom ? Math.min(l, a.maxZoom) : l);
            }
            var u = {
              latlng: n,
              bounds: r,
              timestamp: t.timestamp
            };
            for (var m in t.coords)
              typeof t.coords[m] == "number" && (u[m] = t.coords[m]);
            this.fire("locationfound", u);
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
          var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), n = O("div", i, e || this._mapPane);
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
          t = H(t), i = E(i || [0, 0]);
          var n = this.getZoom() || 0, r = this.getMinZoom(), a = this.getMaxZoom(), l = t.getNorthWest(), u = t.getSouthEast(), m = this.getSize().subtract(i), g = tt(this.project(u, n), this.project(l, n)).getSize(), b = P.any3d ? this.options.zoomSnap : 1, T = m.x / g.x, A = m.y / g.y, J = e ? Math.max(T, A) : Math.min(T, A);
          return n = this.getScaleZoom(J, n), b && (n = Math.round(n / (b / 100)) * (b / 100), n = e ? Math.ceil(n / b) * b : Math.floor(n / b) * b), Math.max(r, Math.min(a, n));
        },
        // @method getSize(): Point
        // Returns the current size of the map container (in pixels).
        getSize: function() {
          return (!this._size || this._sizeChanged) && (this._size = new C(
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
          return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(I(t), e);
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
          var e = this.project(I(t))._round();
          return e._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(t) {
          return this.options.crs.wrapLatLng(I(t));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(t) {
          return this.options.crs.wrapLatLngBounds(H(t));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(t, e) {
          return this.options.crs.distance(I(t), I(e));
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
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(I(t)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(t) {
          return In(t, this._container);
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
          var e = this._container = $n(t);
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          k(e, "scroll", this._onScroll, this), this._containerId = f(e);
        },
        _initLayout: function() {
          var t = this._container;
          this._fadeAnimated = this.options.fadeAnimation && P.any3d, $(t, "leaflet-container" + (P.touch ? " leaflet-touch" : "") + (P.retina ? " leaflet-retina" : "") + (P.ielt9 ? " leaflet-oldie" : "") + (P.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var e = ne(t, "position");
          e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var t = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), W(this._mapPane, new C(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || ($(t.markerPane, "leaflet-zoom-hide"), $(t.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(t, e, i) {
          W(this._mapPane, new C(0, 0));
          var n = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var r = this._zoom !== e;
          this._moveStart(r, i)._move(t, e)._moveEnd(r), this.fire("viewreset"), n && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, i, n) {
          e === void 0 && (e = this._zoom);
          var r = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), n ? i && i.pinch && this.fire("zoom", i) : ((r || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
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
          var e = t ? R : k;
          e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), P.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
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
          for (var i = [], n, r = e === "mouseout" || e === "mouseover", a = t.target || t.srcElement, l = !1; a; ) {
            if (n = this._targets[f(a)], n && (e === "click" || e === "preclick") && this._draggableMoved(n)) {
              l = !0;
              break;
            }
            if (n && n.listens(e, !0) && (r && !Pi(a, t) || (i.push(n), r)) || a === this._container)
              break;
            a = a.parentNode;
          }
          return !i.length && !l && !r && this.listens(e, !0) && (i = [this]), i;
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
            i === "mousedown" && gi(e), this._fireDOMEvent(t, i);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, i) {
          if (t.type === "click") {
            var n = d({}, t);
            n.type = "preclick", this._fireDOMEvent(n, n.type, i);
          }
          var r = this._findEventTargets(t, e);
          if (i) {
            for (var a = [], l = 0; l < i.length; l++)
              i[l].listens(e, !0) && a.push(i[l]);
            r = a.concat(r);
          }
          if (r.length) {
            e === "contextmenu" && V(t);
            var u = r[0], m = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var g = u.getLatLng && (!u._radius || u._radius <= 10);
              m.containerPoint = g ? this.latLngToContainerPoint(u.getLatLng()) : this.mouseEventToContainerPoint(t), m.layerPoint = this.containerPointToLayerPoint(m.containerPoint), m.latlng = g ? u.getLatLng() : this.layerPointToLatLng(m.layerPoint);
            }
            for (l = 0; l < r.length; l++)
              if (r[l].fire(e, m, !0), m.originalEvent._stopped || r[l].options.bubblingMouseEvents === !1 && Je(this._mouseEvents, e) !== -1)
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
          return kt(this._mapPane) || new C(0, 0);
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
          var n = this.project(t, e), r = this.getSize().divideBy(2), a = new N(n.subtract(r), n.add(r)), l = this._getBoundsOffset(a, i, e);
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
          ), r = n.min.subtract(t.min), a = n.max.subtract(t.max), l = this._rebound(r.x, -a.x), u = this._rebound(r.y, -a.y);
          return new C(l, u);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), i = this.getMaxZoom(), n = P.any3d ? this.options.zoomSnap : 1;
          return n && (t = Math.round(t / n) * n), Math.max(e, Math.min(i, t));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          F(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(t, e) {
          var i = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(i) ? !1 : (this.panBy(i, e), !0);
        },
        _createAnimProxy: function() {
          var t = this._proxy = O("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var i = ci, n = this._proxy.style[i];
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
          var n = this.getZoomScale(e), r = this._getCenterOffset(t)._divideBy(1 - 1 / n);
          return i.animate !== !0 && !this.getSize().contains(r) ? !1 : (Q(function() {
            this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, i, n) {
          this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, $(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: n
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(_(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && F(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Sr(t, e) {
        return new z(t, e);
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
          D(this, t);
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
          return $(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (U(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(t) {
          this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
        }
      }), he = function(t) {
        return new lt(t);
      };
      z.include({
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
          var t = this._controlCorners = {}, e = "leaflet-", i = this._controlContainer = O("div", e + "control-container", this._container);
          function n(r, a) {
            var l = e + r + " " + e + a;
            t[r + a] = O("div", l, i);
          }
          n("top", "left"), n("top", "right"), n("bottom", "left"), n("bottom", "right");
        },
        _clearControlPos: function() {
          for (var t in this._controlCorners)
            U(this._controlCorners[t]);
          U(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var Zn = lt.extend({
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
          D(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
          $(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return t < this._section.clientHeight ? ($(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : F(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return F(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var t = "leaflet-control-layers", e = this._container = O("div", t), i = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), ae(e), wi(e);
          var n = this._section = O("section", t + "-list");
          i && (this._map.on("click", this.collapse, this), k(e, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var r = this._layersLink = O("a", t + "-toggle", e);
          r.href = "#", r.title = "Layers", r.setAttribute("role", "button"), k(r, {
            keydown: function(a) {
              a.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(a) {
              V(a), this._expandSafely();
            }
          }, this), i || this.expand(), this._baseLayersList = O("div", t + "-base", n), this._separator = O("div", t + "-separator", n), this._overlaysList = O("div", t + "-overlays", n), e.appendChild(n);
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
          }), this.options.sortLayers && this._layers.sort(_(function(n, r) {
            return this.options.sortFunction(n.layer, r.layer, n.name, r.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Se(this._baseLayersList), Se(this._overlaysList), this._layerControlInputs = [];
          var t, e, i, n, r = 0;
          for (i = 0; i < this._layers.length; i++)
            n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay, r += n.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && r > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
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
          t.overlay ? (n = document.createElement("input"), n.type = "checkbox", n.className = "leaflet-control-layers-selector", n.defaultChecked = i) : n = this._createRadioElement("leaflet-base-layers_" + f(this), i), this._layerControlInputs.push(n), n.layerId = f(t.layer), k(n, "click", this._onInputClick, this);
          var r = document.createElement("span");
          r.innerHTML = " " + t.name;
          var a = document.createElement("span");
          e.appendChild(a), a.appendChild(n), a.appendChild(r);
          var l = t.overlay ? this._overlaysList : this._baseLayersList;
          return l.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, i, n = [], r = [];
            this._handlingClick = !0;
            for (var a = t.length - 1; a >= 0; a--)
              e = t[a], i = this._getLayer(e.layerId).layer, e.checked ? n.push(i) : e.checked || r.push(i);
            for (a = 0; a < r.length; a++)
              this._map.hasLayer(r[a]) && this._map.removeLayer(r[a]);
            for (a = 0; a < n.length; a++)
              this._map.hasLayer(n[a]) || this._map.addLayer(n[a]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, i, n = this._map.getZoom(), r = t.length - 1; r >= 0; r--)
            e = t[r], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && n < i.options.minZoom || i.options.maxZoom !== void 0 && n > i.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var t = this._section;
          this._preventClick = !0, k(t, "click", V), this.expand();
          var e = this;
          setTimeout(function() {
            R(t, "click", V), e._preventClick = !1;
          });
        }
      }), Cr = function(t, e, i) {
        return new Zn(t, e, i);
      }, Ti = lt.extend({
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
          var e = "leaflet-control-zoom", i = O("div", e + " leaflet-bar"), n = this.options;
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
        _createButton: function(t, e, i, n, r) {
          var a = O("a", i, n);
          return a.innerHTML = t, a.href = "#", a.title = e, a.setAttribute("role", "button"), a.setAttribute("aria-label", e), ae(a), k(a, "click", At), k(a, "click", r, this), k(a, "click", this._refocusOnMap, this), a;
        },
        _updateDisabled: function() {
          var t = this._map, e = "leaflet-disabled";
          F(this._zoomInButton, e), F(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && ($(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && ($(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      z.mergeOptions({
        zoomControl: !0
      }), z.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new Ti(), this.addControl(this.zoomControl));
      });
      var kr = function(t) {
        return new Ti(t);
      }, Bn = lt.extend({
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
          var e = "leaflet-control-scale", i = O("div", e), n = this.options;
          return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
        },
        onRemove: function(t) {
          t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(t, e, i) {
          t.metric && (this._mScale = O("div", e, i)), t.imperial && (this._iScale = O("div", e, i));
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
          var e = t * 3.2808399, i, n, r;
          e > 5280 ? (i = e / 5280, n = this._getRoundNum(i), this._updateScale(this._iScale, n + " mi", n / i)) : (r = this._getRoundNum(e), this._updateScale(this._iScale, r + " ft", r / e));
        },
        _updateScale: function(t, e, i) {
          t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
          return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
        }
      }), $r = function(t) {
        return new Bn(t);
      }, Ar = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Ei = lt.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (P.inlineSvg ? Ar + " " : "") + "Leaflet</a>"
        },
        initialize: function(t) {
          D(this, t), this._attributions = {};
        },
        onAdd: function(t) {
          t.attributionControl = this, this._container = O("div", "leaflet-control-attribution"), ae(this._container);
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
      z.mergeOptions({
        attributionControl: !0
      }), z.addInitHook(function() {
        this.options.attributionControl && new Ei().addTo(this);
      });
      var Mr = function(t) {
        return new Ei(t);
      };
      lt.Layers = Zn, lt.Zoom = Ti, lt.Scale = Bn, lt.Attribution = Ei, he.layers = Cr, he.zoom = kr, he.scale = $r, he.attribution = Mr;
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
      var Dr = { Events: nt }, Rn = P.touch ? "touchstart mousedown" : "mousedown", Pt = Qt.extend({
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
          D(this, n), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (k(this._dragStartTarget, Rn, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Pt._dragging === this && this.finishDrag(!0), R(this._dragStartTarget, Rn, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(t) {
          if (this._enabled && (this._moved = !1, !di(this._element, "leaflet-zoom-anim"))) {
            if (t.touches && t.touches.length !== 1) {
              Pt._dragging === this && this.finishDrag();
              return;
            }
            if (!(Pt._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Pt._dragging = this, this._preventOutline && gi(this._element), fi(), se(), !this._moving)) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t, i = An(this._element);
              this._startPoint = new C(e.clientX, e.clientY), this._startPos = kt(this._element), this._parentScale = vi(i);
              var n = t.type === "mousedown";
              k(document, n ? "mousemove" : "touchmove", this._onMove, this), k(document, n ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(t) {
          if (this._enabled) {
            if (t.touches && t.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, i = new C(e.clientX, e.clientY)._subtract(this._startPoint);
            !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, V(t), this._moved || (this.fire("dragstart"), this._moved = !0, $(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), $(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
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
          F(document.body, "leaflet-dragging"), this._lastTarget && (F(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), R(document, "mousemove touchmove", this._onMove, this), R(document, "mouseup touchend touchcancel", this._onUp, this), mi(), re();
          var e = this._moved && this._moving;
          this._moving = !1, Pt._dragging = !1, e && this.fire("dragend", {
            noInertia: t,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function Nn(t, e, i) {
        var n, r = [1, 4, 2, 8], a, l, u, m, g, b, T, A;
        for (a = 0, b = t.length; a < b; a++)
          t[a]._code = Mt(t[a], e);
        for (u = 0; u < 4; u++) {
          for (T = r[u], n = [], a = 0, b = t.length, l = b - 1; a < b; l = a++)
            m = t[a], g = t[l], m._code & T ? g._code & T || (A = Me(g, m, T, e, i), A._code = Mt(A, e), n.push(A)) : (g._code & T && (A = Me(g, m, T, e, i), A._code = Mt(A, e), n.push(A)), n.push(m));
          t = n;
        }
        return t;
      }
      function Un(t, e) {
        var i, n, r, a, l, u, m, g, b;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        ot(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var T = I([0, 0]), A = H(t), J = A.getNorthWest().distanceTo(A.getSouthWest()) * A.getNorthEast().distanceTo(A.getNorthWest());
        J < 1700 && (T = Li(t));
        var G = t.length, at = [];
        for (i = 0; i < G; i++) {
          var it = I(t[i]);
          at.push(e.project(I([it.lat - T.lat, it.lng - T.lng])));
        }
        for (u = m = g = 0, i = 0, n = G - 1; i < G; n = i++)
          r = at[i], a = at[n], l = r.y * a.x - a.y * r.x, m += (r.x + a.x) * l, g += (r.y + a.y) * l, u += l * 3;
        u === 0 ? b = at[0] : b = [m / u, g / u];
        var jt = e.unproject(E(b));
        return I([jt.lat + T.lat, jt.lng + T.lng]);
      }
      function Li(t) {
        for (var e = 0, i = 0, n = 0, r = 0; r < t.length; r++) {
          var a = I(t[r]);
          e += a.lat, i += a.lng, n++;
        }
        return I([e / n, i / n]);
      }
      var Ir = {
        __proto__: null,
        clipPolygon: Nn,
        polygonCenter: Un,
        centroid: Li
      };
      function Fn(t, e) {
        if (!e || !t.length)
          return t.slice();
        var i = e * e;
        return t = Zr(t, i), t = Or(t, i), t;
      }
      function Hn(t, e, i) {
        return Math.sqrt(le(t, e, i, !0));
      }
      function zr(t, e, i) {
        return le(t, e, i);
      }
      function Or(t, e) {
        var i = t.length, n = typeof Uint8Array < "u" ? Uint8Array : Array, r = new n(i);
        r[0] = r[i - 1] = 1, Si(t, r, e, 0, i - 1);
        var a, l = [];
        for (a = 0; a < i; a++)
          r[a] && l.push(t[a]);
        return l;
      }
      function Si(t, e, i, n, r) {
        var a = 0, l, u, m;
        for (u = n + 1; u <= r - 1; u++)
          m = le(t[u], t[n], t[r], !0), m > a && (l = u, a = m);
        a > i && (e[l] = 1, Si(t, e, i, n, l), Si(t, e, i, l, r));
      }
      function Zr(t, e) {
        for (var i = [t[0]], n = 1, r = 0, a = t.length; n < a; n++)
          Br(t[n], t[r]) > e && (i.push(t[n]), r = n);
        return r < a - 1 && i.push(t[a - 1]), i;
      }
      var Wn;
      function qn(t, e, i, n, r) {
        var a = n ? Wn : Mt(t, i), l = Mt(e, i), u, m, g;
        for (Wn = l; ; ) {
          if (!(a | l))
            return [t, e];
          if (a & l)
            return !1;
          u = a || l, m = Me(t, e, u, i, r), g = Mt(m, i), u === a ? (t = m, a = g) : (e = m, l = g);
        }
      }
      function Me(t, e, i, n, r) {
        var a = e.x - t.x, l = e.y - t.y, u = n.min, m = n.max, g, b;
        return i & 8 ? (g = t.x + a * (m.y - t.y) / l, b = m.y) : i & 4 ? (g = t.x + a * (u.y - t.y) / l, b = u.y) : i & 2 ? (g = m.x, b = t.y + l * (m.x - t.x) / a) : i & 1 && (g = u.x, b = t.y + l * (u.x - t.x) / a), new C(g, b, r);
      }
      function Mt(t, e) {
        var i = 0;
        return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
      }
      function Br(t, e) {
        var i = e.x - t.x, n = e.y - t.y;
        return i * i + n * n;
      }
      function le(t, e, i, n) {
        var r = e.x, a = e.y, l = i.x - r, u = i.y - a, m = l * l + u * u, g;
        return m > 0 && (g = ((t.x - r) * l + (t.y - a) * u) / m, g > 1 ? (r = i.x, a = i.y) : g > 0 && (r += l * g, a += u * g)), l = t.x - r, u = t.y - a, n ? l * l + u * u : new C(r, a);
      }
      function ot(t) {
        return !ht(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function Gn(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ot(t);
      }
      function jn(t, e) {
        var i, n, r, a, l, u, m, g;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        ot(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var b = I([0, 0]), T = H(t), A = T.getNorthWest().distanceTo(T.getSouthWest()) * T.getNorthEast().distanceTo(T.getNorthWest());
        A < 1700 && (b = Li(t));
        var J = t.length, G = [];
        for (i = 0; i < J; i++) {
          var at = I(t[i]);
          G.push(e.project(I([at.lat - b.lat, at.lng - b.lng])));
        }
        for (i = 0, n = 0; i < J - 1; i++)
          n += G[i].distanceTo(G[i + 1]) / 2;
        if (n === 0)
          g = G[0];
        else
          for (i = 0, a = 0; i < J - 1; i++)
            if (l = G[i], u = G[i + 1], r = l.distanceTo(u), a += r, a > n) {
              m = (a - n) / r, g = [
                u.x - m * (u.x - l.x),
                u.y - m * (u.y - l.y)
              ];
              break;
            }
        var it = e.unproject(E(g));
        return I([it.lat + b.lat, it.lng + b.lng]);
      }
      var Rr = {
        __proto__: null,
        simplify: Fn,
        pointToSegmentDistance: Hn,
        closestPointOnSegment: zr,
        clipSegment: qn,
        _getEdgeIntersection: Me,
        _getBitCode: Mt,
        _sqClosestPointOnSegment: le,
        isFlat: ot,
        _flat: Gn,
        polylineCenter: jn
      }, Ci = {
        project: function(t) {
          return new C(t.lng, t.lat);
        },
        unproject: function(t) {
          return new B(t.y, t.x);
        },
        bounds: new N([-180, -90], [180, 90])
      }, ki = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new N([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, i = this.R, n = t.lat * e, r = this.R_MINOR / i, a = Math.sqrt(1 - r * r), l = a * Math.sin(n), u = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - l) / (1 + l), a / 2);
          return n = -i * Math.log(Math.max(u, 1e-10)), new C(t.lng * e * i, n);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, i = this.R, n = this.R_MINOR / i, r = Math.sqrt(1 - n * n), a = Math.exp(-t.y / i), l = Math.PI / 2 - 2 * Math.atan(a), u = 0, m = 0.1, g; u < 15 && Math.abs(m) > 1e-7; u++)
            g = r * Math.sin(l), g = Math.pow((1 - g) / (1 + g), r / 2), m = Math.PI / 2 - 2 * Math.atan(a * g) - l, l += m;
          return new B(l * e, t.x * e / i);
        }
      }, Nr = {
        __proto__: null,
        LonLat: Ci,
        Mercator: ki,
        SphericalMercator: ei
      }, Ur = d({}, wt, {
        code: "EPSG:3395",
        projection: ki,
        transformation: (function() {
          var t = 0.5 / (Math.PI * ki.R);
          return te(t, 0.5, -t, 0.5);
        })()
      }), Vn = d({}, wt, {
        code: "EPSG:4326",
        projection: Ci,
        transformation: te(1 / 180, 1, -1 / 180, 0.5)
      }), Fr = d({}, gt, {
        projection: Ci,
        transformation: te(1, 0, -1, 0),
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
      gt.Earth = wt, gt.EPSG3395 = Ur, gt.EPSG3857 = ni, gt.EPSG900913 = Vs, gt.EPSG4326 = Vn, gt.Simple = Fr;
      var ct = Qt.extend({
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
      z.include({
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
            var r = this._zoomBoundLayers[n].options;
            t = r.minZoom === void 0 ? t : Math.min(t, r.minZoom), e = r.maxZoom === void 0 ? e : Math.max(e, r.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Ft = ct.extend({
        initialize: function(t, e) {
          D(this, e), this._layers = {};
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
      }), Hr = function(t, e) {
        return new Ft(t, e);
      }, vt = Ft.extend({
        addLayer: function(t) {
          return this.hasLayer(t) ? this : (t.addEventParent(this), Ft.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
        },
        removeLayer: function(t) {
          return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Ft.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
      }), Wr = function(t, e) {
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
          D(this, t);
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
          var r = E(n), a = E(e === "shadow" && i.shadowAnchor || i.iconAnchor || r && r.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (i.className || ""), a && (t.style.marginLeft = -a.x + "px", t.style.marginTop = -a.y + "px"), r && (t.style.width = r.x + "px", t.style.height = r.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return P.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function qr(t) {
        return new Ht(t);
      }
      var ce = Ht.extend({
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
          return typeof ce.imagePath != "string" && (ce.imagePath = this._detectIconPath()), (this.options.imagePath || ce.imagePath) + Ht.prototype._getIconUrl.call(this, t);
        },
        _stripUrl: function(t) {
          var e = function(i, n, r) {
            var a = n.exec(i);
            return a && a[r];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = O("div", "leaflet-default-icon-path", document.body), e = ne(t, "background-image") || ne(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var i = document.querySelector('link[href$="leaflet.css"]');
          return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
        }
      }), Kn = pt.extend({
        initialize: function(t) {
          this._marker = t;
        },
        addHooks: function() {
          var t = this._marker._icon;
          this._draggable || (this._draggable = new Pt(t, t, !0)), this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable(), $(t, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && F(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(t) {
          var e = this._marker, i = e._map, n = this._marker.options.autoPanSpeed, r = this._marker.options.autoPanPadding, a = kt(e._icon), l = i.getPixelBounds(), u = i.getPixelOrigin(), m = tt(
            l.min._subtract(u).add(r),
            l.max._subtract(u).subtract(r)
          );
          if (!m.contains(a)) {
            var g = E(
              (Math.max(m.max.x, a.x) - m.max.x) / (l.max.x - m.max.x) - (Math.min(m.min.x, a.x) - m.min.x) / (l.min.x - m.min.x),
              (Math.max(m.max.y, a.y) - m.max.y) / (l.max.y - m.max.y) - (Math.min(m.min.y, a.y) - m.min.y) / (l.min.y - m.min.y)
            ).multiplyBy(n);
            i.panBy(g, { animate: !1 }), this._draggable._newPos._add(g), this._draggable._startPos._add(g), W(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = Q(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (st(this._panRequest), this._panRequest = Q(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, i = e._shadow, n = kt(e._icon), r = e._map.layerPointToLatLng(n);
          i && W(i, n), e._latlng = r, t.latlng = r, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          st(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
        }
      }), De = ct.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new ce(),
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
          D(this, e), this._latlng = I(t);
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
          return this._latlng = I(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
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
          i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), $(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && k(i, "focus", this._panOnFocus, this);
          var r = t.icon.createShadow(this._shadow), a = !1;
          r !== this._shadow && (this._removeShadow(), a = !0), r && ($(r, e), r.alt = ""), this._shadow = r, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), r && a && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && R(this._icon, "focus", this._panOnFocus, this), U(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
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
          if (this.options.interactive && ($(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Kn)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Kn(this), t && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(t) {
          return this.options.opacity = t, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var t = this.options.opacity;
          this._icon && rt(this._icon, t), this._shadow && rt(this._shadow, t);
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
      function Gr(t, e) {
        return new De(t, e);
      }
      var Tt = ct.extend({
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
          return D(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
      }), Ie = Tt.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(t, e) {
          D(this, e), this._latlng = I(t), this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(t) {
          var e = this._latlng;
          return this._latlng = I(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
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
          return Tt.prototype.setStyle.call(this, t), this.setRadius(e), this;
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
      function jr(t, e) {
        return new Ie(t, e);
      }
      var $i = Ie.extend({
        initialize: function(t, e, i) {
          if (typeof e == "number" && (e = d({}, i, { radius: e })), D(this, e), this._latlng = I(t), isNaN(this.options.radius))
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
        setStyle: Tt.prototype.setStyle,
        _project: function() {
          var t = this._latlng.lng, e = this._latlng.lat, i = this._map, n = i.options.crs;
          if (n.distance === wt.distance) {
            var r = Math.PI / 180, a = this._mRadius / wt.R / r, l = i.project([e + a, t]), u = i.project([e - a, t]), m = l.add(u).divideBy(2), g = i.unproject(m).lat, b = Math.acos((Math.cos(a * r) - Math.sin(e * r) * Math.sin(g * r)) / (Math.cos(e * r) * Math.cos(g * r))) / r;
            (isNaN(b) || b === 0) && (b = a / Math.cos(Math.PI / 180 * e)), this._point = m.subtract(i.getPixelOrigin()), this._radius = isNaN(b) ? 0 : m.x - i.project([g, t - b]).x, this._radiusY = m.y - l.y;
          } else {
            var T = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(T).x;
          }
          this._updateBounds();
        }
      });
      function Vr(t, e, i) {
        return new $i(t, e, i);
      }
      var yt = Tt.extend({
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
          D(this, e), this._setLatLngs(t);
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
          for (var e = 1 / 0, i = null, n = le, r, a, l = 0, u = this._parts.length; l < u; l++)
            for (var m = this._parts[l], g = 1, b = m.length; g < b; g++) {
              r = m[g - 1], a = m[g];
              var T = n(t, r, a, !0);
              T < e && (e = T, i = n(t, r, a));
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
          return e = e || this._defaultShape(), t = I(t), e.push(t), this._bounds.extend(t), this.redraw();
        },
        _setLatLngs: function(t) {
          this._bounds = new et(), this._latlngs = this._convertLatLngs(t);
        },
        _defaultShape: function() {
          return ot(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(t) {
          for (var e = [], i = ot(t), n = 0, r = t.length; n < r; n++)
            i ? (e[n] = I(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
          return e;
        },
        _project: function() {
          var t = new N();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
        },
        _updateBounds: function() {
          var t = this._clickTolerance(), e = new C(t, t);
          this._rawPxBounds && (this._pxBounds = new N([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(t, e, i) {
          var n = t[0] instanceof B, r = t.length, a, l;
          if (n) {
            for (l = [], a = 0; a < r; a++)
              l[a] = this._map.latLngToLayerPoint(t[a]), i.extend(l[a]);
            e.push(l);
          } else
            for (a = 0; a < r; a++)
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
            var e = this._parts, i, n, r, a, l, u, m;
            for (i = 0, r = 0, a = this._rings.length; i < a; i++)
              for (m = this._rings[i], n = 0, l = m.length; n < l - 1; n++)
                u = qn(m[n], m[n + 1], t, n, !0), u && (e[r] = e[r] || [], e[r].push(u[0]), (u[1] !== m[n + 1] || n === l - 2) && (e[r].push(u[1]), r++));
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
          var i, n, r, a, l, u, m = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (i = 0, a = this._parts.length; i < a; i++)
            for (u = this._parts[i], n = 0, l = u.length, r = l - 1; n < l; r = n++)
              if (!(!e && n === 0) && Hn(t, u[r], u[n]) <= m)
                return !0;
          return !1;
        }
      });
      function Kr(t, e) {
        return new yt(t, e);
      }
      yt._flat = Gn;
      var Wt = yt.extend({
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
          return Un(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(t) {
          var e = yt.prototype._convertLatLngs.call(this, t), i = e.length;
          return i >= 2 && e[0] instanceof B && e[0].equals(e[i - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          yt.prototype._setLatLngs.call(this, t), ot(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return ot(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, i = new C(e, e);
          if (t = new N(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var n = 0, r = this._rings.length, a; n < r; n++)
              a = Nn(this._rings[n], t, !0), a.length && this._parts.push(a);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, i, n, r, a, l, u, m, g;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (a = 0, m = this._parts.length; a < m; a++)
            for (i = this._parts[a], l = 0, g = i.length, u = g - 1; l < g; u = l++)
              n = i[l], r = i[u], n.y > t.y != r.y > t.y && t.x < (r.x - n.x) * (t.y - n.y) / (r.y - n.y) + n.x && (e = !e);
          return e || yt.prototype._containsPoint.call(this, t, !0);
        }
      });
      function Yr(t, e) {
        return new Wt(t, e);
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
          D(this, e), this._layers = {}, t && this.addData(t);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(t) {
          var e = ht(t) ? t : t.features, i, n, r;
          if (e) {
            for (i = 0, n = e.length; i < n; i++)
              r = e[i], (r.geometries || r.geometry || r.features || r.coordinates) && this.addData(r);
            return this;
          }
          var a = this.options;
          if (a.filter && !a.filter(t))
            return this;
          var l = ze(t, a);
          return l ? (l.feature = Be(t), l.defaultOptions = l.options, this.resetStyle(l), a.onEachFeature && a.onEachFeature(t, l), this.addLayer(l)) : this;
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(t) {
          return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = d({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
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
        var i = t.type === "Feature" ? t.geometry : t, n = i ? i.coordinates : null, r = [], a = e && e.pointToLayer, l = e && e.coordsToLatLng || Ai, u, m, g, b;
        if (!n && !i)
          return null;
        switch (i.type) {
          case "Point":
            return u = l(n), Yn(a, t, u, e);
          case "MultiPoint":
            for (g = 0, b = n.length; g < b; g++)
              u = l(n[g]), r.push(Yn(a, t, u, e));
            return new vt(r);
          case "LineString":
          case "MultiLineString":
            return m = Oe(n, i.type === "LineString" ? 0 : 1, l), new yt(m, e);
          case "Polygon":
          case "MultiPolygon":
            return m = Oe(n, i.type === "Polygon" ? 1 : 2, l), new Wt(m, e);
          case "GeometryCollection":
            for (g = 0, b = i.geometries.length; g < b; g++) {
              var T = ze({
                geometry: i.geometries[g],
                type: "Feature",
                properties: t.properties
              }, e);
              T && r.push(T);
            }
            return new vt(r);
          case "FeatureCollection":
            for (g = 0, b = i.features.length; g < b; g++) {
              var A = ze(i.features[g], e);
              A && r.push(A);
            }
            return new vt(r);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function Yn(t, e, i, n) {
        return t ? t(e, i) : new De(i, n && n.markersInheritOptions && n);
      }
      function Ai(t) {
        return new B(t[1], t[0], t[2]);
      }
      function Oe(t, e, i) {
        for (var n = [], r = 0, a = t.length, l; r < a; r++)
          l = e ? Oe(t[r], e - 1, i) : (i || Ai)(t[r]), n.push(l);
        return n;
      }
      function Mi(t, e) {
        return t = I(t), t.alt !== void 0 ? [Z(t.lng, e), Z(t.lat, e), Z(t.alt, e)] : [Z(t.lng, e), Z(t.lat, e)];
      }
      function Ze(t, e, i, n) {
        for (var r = [], a = 0, l = t.length; a < l; a++)
          r.push(e ? Ze(t[a], ot(t[a]) ? 0 : e - 1, i, n) : Mi(t[a], n));
        return !e && i && r.length > 0 && r.push(r[0].slice()), r;
      }
      function qt(t, e) {
        return t.feature ? d({}, t.feature, { geometry: e }) : Be(e);
      }
      function Be(t) {
        return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        };
      }
      var Di = {
        toGeoJSON: function(t) {
          return qt(this, {
            type: "Point",
            coordinates: Mi(this.getLatLng(), t)
          });
        }
      };
      De.include(Di), $i.include(Di), Ie.include(Di), yt.include({
        toGeoJSON: function(t) {
          var e = !ot(this._latlngs), i = Ze(this._latlngs, e ? 1 : 0, !1, t);
          return qt(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: i
          });
        }
      }), Wt.include({
        toGeoJSON: function(t) {
          var e = !ot(this._latlngs), i = e && !ot(this._latlngs[0]), n = Ze(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
          return e || (n = [n]), qt(this, {
            type: (i ? "Multi" : "") + "Polygon",
            coordinates: n
          });
        }
      }), Ft.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(i) {
            e.push(i.toGeoJSON(t).geometry.coordinates);
          }), qt(this, {
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
          return this.eachLayer(function(r) {
            if (r.toGeoJSON) {
              var a = r.toGeoJSON(t);
              if (i)
                n.push(a.geometry);
              else {
                var l = Be(a);
                l.type === "FeatureCollection" ? n.push.apply(n, l.features) : n.push(l);
              }
            }
          }), i ? qt(this, {
            geometries: n,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: n
          };
        }
      });
      function Xn(t, e) {
        return new xt(t, e);
      }
      var Xr = Xn, Re = ct.extend({
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
          this._url = t, this._bounds = H(e), D(this, i);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && ($(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
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
          return this._map && Nt(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && Ut(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(t) {
          return this._url = t, this._image && (this._image.src = t), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(t) {
          return this._bounds = H(t), this._map && this._reset(), this;
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
          var t = this._url.tagName === "IMG", e = this._image = t ? this._url : O("img");
          if ($(e, "leaflet-image-layer"), this._zoomAnimated && $(e, "leaflet-zoom-animated"), this.options.className && $(e, this.options.className), e.onselectstart = w, e.onmousemove = w, e.onload = _(this.fire, this, "load"), e.onerror = _(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
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
          rt(this._image, this.options.opacity);
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
      }), Jr = function(t, e, i) {
        return new Re(t, e, i);
      }, Jn = Re.extend({
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
          var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : O("video");
          if ($(e, "leaflet-image-layer"), this._zoomAnimated && $(e, "leaflet-zoom-animated"), this.options.className && $(e, this.options.className), e.onselectstart = w, e.onmousemove = w, e.onloadeddata = _(this.fire, this, "load"), t) {
            for (var i = e.getElementsByTagName("source"), n = [], r = 0; r < i.length; r++)
              n.push(i[r].src);
            this._url = i.length > 0 ? n : [e.src];
            return;
          }
          ht(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
          for (var a = 0; a < this._url.length; a++) {
            var l = O("source");
            l.src = this._url[a], e.appendChild(l);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function Qr(t, e, i) {
        return new Jn(t, e, i);
      }
      var Qn = Re.extend({
        _initImage: function() {
          var t = this._image = this._url;
          $(t, "leaflet-image-layer"), this._zoomAnimated && $(t, "leaflet-zoom-animated"), this.options.className && $(t, this.options.className), t.onselectstart = w, t.onmousemove = w;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function to(t, e, i) {
        return new Qn(t, e, i);
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
          t && (t instanceof B || ht(t)) ? (this._latlng = I(t), D(this, e)) : (D(this, t), this._source = e), this.options.content && (this._content = this.options.content);
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
          this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && rt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && rt(this._container, 1), this.bringToFront(), this.options.interactive && ($(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(t) {
          t._fadeAnimated ? (rt(this._container, 0), this._removeTimeout = setTimeout(_(U, void 0, this._container), 200)) : U(this._container), this.options.interactive && (F(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
          return this._latlng = I(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
          return this._map && Nt(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && Ut(this._container), this;
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
            var n = this._containerBottom = -e.y, r = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = n + "px", this._container.style.left = r + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      z.include({
        _initOverlay: function(t, e, i, n) {
          var r = e;
          return r instanceof t || (r = new t(n).setContent(e)), i && r.setLatLng(i), r;
        }
      }), ct.include({
        _initOverlay: function(t, e, i, n) {
          var r = i;
          return r instanceof t ? (D(r, n), r._source = this) : (r = e && !n ? e : new t(n, this), r.setContent(i)), r;
        }
      });
      var Ne = ft.extend({
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
          ft.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Tt || this._source.on("preclick", $t));
        },
        onRemove: function(t) {
          ft.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Tt || this._source.off("preclick", $t));
        },
        getEvents: function() {
          var t = ft.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
        },
        _initLayout: function() {
          var t = "leaflet-popup", e = this._container = O(
            "div",
            t + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), i = this._wrapper = O("div", t + "-content-wrapper", e);
          if (this._contentNode = O("div", t + "-content", i), ae(e), wi(this._contentNode), k(e, "contextmenu", $t), this._tipContainer = O("div", t + "-tip-container", e), this._tip = O("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var n = this._closeButton = O("a", t + "-close-button", e);
            n.setAttribute("role", "button"), n.setAttribute("aria-label", "Close popup"), n.href = "#close", n.innerHTML = '<span aria-hidden="true">&#215;</span>', k(n, "click", function(r) {
              V(r), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var i = t.offsetWidth;
          i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
          var n = t.offsetHeight, r = this.options.maxHeight, a = "leaflet-popup-scrolled";
          r && n > r ? (e.height = r + "px", $(t, a)) : F(t, a), this._containerWidth = this._container.offsetWidth;
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
            var t = this._map, e = parseInt(ne(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, n = this._containerWidth, r = new C(this._containerLeft, -i - this._containerBottom);
            r._add(kt(this._container));
            var a = t.layerPointToContainerPoint(r), l = E(this.options.autoPanPadding), u = E(this.options.autoPanPaddingTopLeft || l), m = E(this.options.autoPanPaddingBottomRight || l), g = t.getSize(), b = 0, T = 0;
            a.x + n + m.x > g.x && (b = a.x + n - g.x + m.x), a.x - b - u.x < 0 && (b = a.x - u.x), a.y + i + m.y > g.y && (T = a.y + i - g.y + m.y), a.y - T - u.y < 0 && (T = a.y - u.y), (b || T) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([b, T]));
          }
        },
        _getAnchor: function() {
          return E(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), eo = function(t, e) {
        return new Ne(t, e);
      };
      z.mergeOptions({
        closePopupOnClick: !0
      }), z.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(t, e, i) {
          return this._initOverlay(Ne, t, e, i).openOn(this), this;
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
          return this._popup = this._initOverlay(Ne, this._popup, t, e), this._popupHandlersAdded || (this.on({
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
            if (this._popup._source === e && !(e instanceof Tt)) {
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
      var Ue = ft.extend({
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
          this._contentNode = this._container = O("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + f(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(t) {
          var e, i, n = this._map, r = this._container, a = n.latLngToContainerPoint(n.getCenter()), l = n.layerPointToContainerPoint(t), u = this.options.direction, m = r.offsetWidth, g = r.offsetHeight, b = E(this.options.offset), T = this._getAnchor();
          u === "top" ? (e = m / 2, i = g) : u === "bottom" ? (e = m / 2, i = 0) : u === "center" ? (e = m / 2, i = g / 2) : u === "right" ? (e = 0, i = g / 2) : u === "left" ? (e = m, i = g / 2) : l.x < a.x ? (u = "right", e = 0, i = g / 2) : (u = "left", e = m + (b.x + T.x) * 2, i = g / 2), t = t.subtract(E(e, i, !0)).add(b).add(T), F(r, "leaflet-tooltip-right"), F(r, "leaflet-tooltip-left"), F(r, "leaflet-tooltip-top"), F(r, "leaflet-tooltip-bottom"), $(r, "leaflet-tooltip-" + u), W(r, t);
        },
        _updatePosition: function() {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function(t) {
          this.options.opacity = t, this._container && rt(this._container, t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
          this._setPosition(e);
        },
        _getAnchor: function() {
          return E(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), io = function(t, e) {
        return new Ue(t, e);
      };
      z.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, i) {
          return this._initOverlay(Ue, t, e, i).openOn(this), this;
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
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Ue, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
          e && (k(e, "focus", function() {
            this._tooltip._source = t, this.openTooltip();
          }, this), k(e, "blur", this.closeTooltip, this));
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
      var ts = Ht.extend({
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
          if (i.html instanceof Element ? (Se(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
            var n = E(i.bgPos);
            e.style.backgroundPosition = -n.x + "px " + -n.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function no(t) {
        return new ts(t);
      }
      Ht.Default = ce;
      var de = ct.extend({
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
          updateWhenIdle: P.mobile,
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
          D(this, t);
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
          return this._map && (Nt(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (Ut(this._container), this._setAutoZIndex(Math.min)), this;
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
          return t instanceof C ? t : new C(t, t);
        },
        _updateZIndex: function() {
          this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
        },
        _setAutoZIndex: function(t) {
          for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), n = 0, r = e.length, a; n < r; n++)
            a = e[n].style.zIndex, e[n] !== this._container && a && (i = t(i, +a));
          isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !P.ielt9) {
            rt(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
            for (var n in this._tiles) {
              var r = this._tiles[n];
              if (!(!r.current || !r.loaded)) {
                var a = Math.min(1, (t - r.loaded) / 200);
                rt(r.el, a), a < 1 ? e = !0 : (r.active ? i = !0 : this._onOpaqueTile(r), r.active = !0);
              }
            }
            i && !this._noPrune && this._pruneTiles(), e && (st(this._fadeFrame), this._fadeFrame = Q(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: w,
        _initContainer: function() {
          this._container || (this._container = O("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var t = this._tileZoom, e = this.options.maxZoom;
          if (t !== void 0) {
            for (var i in this._levels)
              i = Number(i), this._levels[i].el.children.length || i === t ? (this._levels[i].el.style.zIndex = e - Math.abs(t - i), this._onUpdateLevel(i)) : (U(this._levels[i].el), this._removeTilesAtZoom(i), this._onRemoveLevel(i), delete this._levels[i]);
            var n = this._levels[t], r = this._map;
            return n || (n = this._levels[t] = {}, n.el = O("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = e, n.origin = r.project(r.unproject(r.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, r.getCenter(), r.getZoom()), w(n.el.offsetWidth), this._onCreateLevel(n)), this._level = n, n;
          }
        },
        _onUpdateLevel: w,
        _onRemoveLevel: w,
        _onCreateLevel: w,
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
          var r = Math.floor(t / 2), a = Math.floor(e / 2), l = i - 1, u = new C(+r, +a);
          u.z = +l;
          var m = this._tileCoordsToKey(u), g = this._tiles[m];
          return g && g.active ? (g.retain = !0, !0) : (g && g.loaded && (g.retain = !0), l > n ? this._retainParent(r, a, l, n) : !1);
        },
        _retainChildren: function(t, e, i, n) {
          for (var r = 2 * t; r < 2 * t + 2; r++)
            for (var a = 2 * e; a < 2 * e + 2; a++) {
              var l = new C(r, a);
              l.z = i + 1;
              var u = this._tileCoordsToKey(l), m = this._tiles[u];
              if (m && m.active) {
                m.retain = !0;
                continue;
              } else m && m.loaded && (m.retain = !0);
              i + 1 < n && this._retainChildren(r, a, i + 1, n);
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
          var r = Math.round(e);
          this.options.maxZoom !== void 0 && r > this.options.maxZoom || this.options.minZoom !== void 0 && r < this.options.minZoom ? r = void 0 : r = this._clampZoom(r);
          var a = this.options.updateWhenZooming && r !== this._tileZoom;
          (!n || a) && (this._tileZoom = r, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), r !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var i in this._levels)
            this._setZoomTransform(this._levels[i], t, e);
        },
        _setZoomTransform: function(t, e, i) {
          var n = this._map.getZoomScale(i, t.zoom), r = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
          P.any3d ? Ct(t.el, r, n) : W(t.el, r);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), n = this._tileZoom, r = this._map.getPixelWorldBounds(this._tileZoom);
          r && (this._globalTileRange = this._pxBoundsToTileRange(r)), this._wrapX = e.wrapLng && !this.options.noWrap && [
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
          var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), n = e.getZoomScale(i, this._tileZoom), r = e.project(t, this._tileZoom).floor(), a = e.getSize().divideBy(n * 2);
          return new N(r.subtract(a), r.add(a));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var i = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var n = this._getTiledPixelBounds(t), r = this._pxBoundsToTileRange(n), a = r.getCenter(), l = [], u = this.options.keepBuffer, m = new N(
                r.getBottomLeft().subtract([u, -u]),
                r.getTopRight().add([u, -u])
              );
              if (!(isFinite(r.min.x) && isFinite(r.min.y) && isFinite(r.max.x) && isFinite(r.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var g in this._tiles) {
                var b = this._tiles[g].coords;
                (b.z !== this._tileZoom || !m.contains(new C(b.x, b.y))) && (this._tiles[g].current = !1);
              }
              if (Math.abs(i - this._tileZoom) > 1) {
                this._setView(t, i);
                return;
              }
              for (var T = r.min.y; T <= r.max.y; T++)
                for (var A = r.min.x; A <= r.max.x; A++) {
                  var J = new C(A, T);
                  if (J.z = this._tileZoom, !!this._isValidTile(J)) {
                    var G = this._tiles[this._tileCoordsToKey(J)];
                    G ? G.current = !0 : l.push(J);
                  }
                }
              if (l.sort(function(it, jt) {
                return it.distanceTo(a) - jt.distanceTo(a);
              }), l.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var at = document.createDocumentFragment();
                for (A = 0; A < l.length; A++)
                  this._addTile(l[A], at);
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
          return H(this.options.bounds).overlaps(n);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, i = this.getTileSize(), n = t.scaleBy(i), r = n.add(i), a = e.unproject(n, t.z), l = e.unproject(r, t.z);
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
          var e = t.split(":"), i = new C(+e[0], +e[1]);
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
          $(t, "leaflet-tile");
          var e = this.getTileSize();
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = w, t.onmousemove = w, P.ielt9 && this.options.opacity < 1 && rt(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var i = this._getTilePos(t), n = this._tileCoordsToKey(t), r = this.createTile(this._wrapCoords(t), _(this._tileReady, this, t));
          this._initTile(r), this.createTile.length < 2 && Q(_(this._tileReady, this, t, null, r)), W(r, i), this._tiles[n] = {
            el: r,
            coords: t,
            current: !0
          }, e.appendChild(r), this.fire("tileloadstart", {
            tile: r,
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
          i = this._tiles[n], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (rt(i.el, 0), st(this._fadeFrame), this._fadeFrame = Q(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || ($(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: i.el,
            coords: t
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), P.ielt9 || !this._map._fadeAnimated ? Q(this._pruneTiles, this) : setTimeout(_(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(t) {
          return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(t) {
          var e = new C(
            this._wrapX ? S(t.x, this._wrapX) : t.x,
            this._wrapY ? S(t.y, this._wrapY) : t.y
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
      function so(t) {
        return new de(t);
      }
      var Gt = de.extend({
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
          this._url = t, e = D(this, e), e.detectRetina && P.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
          return k(i, "load", _(this._tileOnLoad, this, e, i)), k(i, "error", _(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(t) {
          var e = {
            r: P.retina ? "@2x" : "",
            s: this._getSubdomain(t),
            x: t.x,
            y: t.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var i = this._globalTileRange.max.y - t.y;
            this.options.tms && (e.y = i), e["-y"] = i;
          }
          return en(this._url, d(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          P.ielt9 ? setTimeout(_(t, this, null, e), 0) : t(null, e);
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
            if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = w, e.onerror = w, !e.complete)) {
              e.src = Te;
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
            return e.el.setAttribute("src", Te), de.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, i) {
          if (!(!this._map || i && i.getAttribute("src") === Te))
            return de.prototype._tileReady.call(this, t, e, i);
        }
      });
      function es(t, e) {
        return new Gt(t, e);
      }
      var is = Gt.extend({
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
          var i = d({}, this.defaultWmsParams);
          for (var n in e)
            n in this.options || (i[n] = e[n]);
          e = D(this, e);
          var r = e.detectRetina && P.retina ? 2 : 1, a = this.getTileSize();
          i.width = a.x * r, i.height = a.y * r, this.wmsParams = i;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, Gt.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), i = this._crs, n = tt(i.project(e[0]), i.project(e[1])), r = n.min, a = n.max, l = (this._wmsVersion >= 1.3 && this._crs === Vn ? [r.y, r.x, a.y, a.x] : [r.x, r.y, a.x, a.y]).join(","), u = Gt.prototype.getTileUrl.call(this, t);
          return u + Bt(this.wmsParams, u, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + l;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return d(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function ro(t, e) {
        return new is(t, e);
      }
      Gt.WMS = is, es.wms = ro;
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
          D(this, t), f(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), $(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
          var i = this._map.getZoomScale(e, this._zoom), n = this._map.getSize().multiplyBy(0.5 + this.options.padding), r = this._map.project(this._center, e), a = n.multiplyBy(-i).add(r).subtract(this._map._getNewPixelOrigin(t, e));
          P.any3d ? Ct(this._container, a, i) : W(this._container, a);
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
      }), ns = bt.extend({
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
          k(t, "mousemove", this._onMouseMove, this), k(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), k(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
        },
        _destroyContainer: function() {
          st(this._redrawRequest), delete this._ctx, U(this._container), R(this._container), delete this._container;
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
            var t = this._bounds, e = this._container, i = t.getSize(), n = P.retina ? 2 : 1;
            W(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", P.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
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
            var e = t.options.dashArray.split(/[, ]+/), i = [], n, r;
            for (r = 0; r < e.length; r++) {
              if (n = Number(e[r]), isNaN(n))
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
            var i, n, r, a, l = t._parts, u = l.length, m = this._ctx;
            if (u) {
              for (m.beginPath(), i = 0; i < u; i++) {
                for (n = 0, r = l[i].length; n < r; n++)
                  a = l[i][n], m[n ? "lineTo" : "moveTo"](a.x, a.y);
                e && m.closePath();
              }
              this._fillStroke(m, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, i = this._ctx, n = Math.max(Math.round(t._radius), 1), r = (Math.max(Math.round(t._radiusY), 1) || n) / n;
            r !== 1 && (i.save(), i.scale(1, r)), i.beginPath(), i.arc(e.x, e.y / r, n, 0, Math.PI * 2, !1), r !== 1 && i.restore(), this._fillStroke(i, t);
          }
        },
        _fillStroke: function(t, e) {
          var i = e.options;
          i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), i, n, r = this._drawFirst; r; r = r.next)
            i = r.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (n = i);
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
          e && (F(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var i, n, r = this._drawFirst; r; r = r.next)
              i = r.layer, i.options.interactive && i._containsPoint(e) && (n = i);
            n !== this._hoveredLayer && (this._handleMouseOut(t), n && ($(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(_(function() {
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
      function ss(t) {
        return P.canvas ? new ns(t) : null;
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
      })(), oo = {
        _initContainer: function() {
          this._container = O("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (bt.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(t) {
          var e = t._container = ue("shape");
          $(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = ue("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[f(t)] = t;
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
          var e = t._stroke, i = t._fill, n = t.options, r = t._container;
          r.stroked = !!n.stroke, r.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = ue("stroke")), r.appendChild(e), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = ht(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (r.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = ue("fill")), r.appendChild(i), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (r.removeChild(i), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), i = Math.round(t._radius), n = Math.round(t._radiusY || i);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0," + 65535 * 360);
        },
        _setPath: function(t, e) {
          t._path.v = e;
        },
        _bringToFront: function(t) {
          Nt(t._container);
        },
        _bringToBack: function(t) {
          Ut(t._container);
        }
      }, Fe = P.vml ? ue : hn, pe = bt.extend({
        _initContainer: function() {
          this._container = Fe("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Fe("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          U(this._container), R(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
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
          var e = t._path = Fe("path");
          t.options.className && $(e, t.options.className), t.options.interactive && $(e, "leaflet-interactive"), this._updateStyle(t), this._layers[f(t)] = t;
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
          this._setPath(t, ln(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, i = Math.max(Math.round(t._radius), 1), n = Math.max(Math.round(t._radiusY), 1) || i, r = "a" + i + "," + n + " 0 1,0 ", a = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + r + i * 2 + ",0 " + r + -i * 2 + ",0 ";
          this._setPath(t, a);
        },
        _setPath: function(t, e) {
          t._path.setAttribute("d", e);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(t) {
          Nt(t._path);
        },
        _bringToBack: function(t) {
          Ut(t._path);
        }
      });
      P.vml && pe.include(oo);
      function rs(t) {
        return P.svg || P.vml ? new pe(t) : null;
      }
      z.include({
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
          return this.options.preferCanvas && ss(t) || rs(t);
        }
      });
      var os = Wt.extend({
        initialize: function(t, e) {
          Wt.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(t) {
          return this.setLatLngs(this._boundsToLatLngs(t));
        },
        _boundsToLatLngs: function(t) {
          return t = H(t), [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast()
          ];
        }
      });
      function ao(t, e) {
        return new os(t, e);
      }
      pe.create = Fe, pe.pointsToPath = ln, xt.geometryToLayer = ze, xt.coordsToLatLng = Ai, xt.coordsToLatLngs = Oe, xt.latLngToCoords = Mi, xt.latLngsToCoords = Ze, xt.getFeature = qt, xt.asFeature = Be, z.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var as = pt.extend({
        initialize: function(t) {
          this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
        },
        addHooks: function() {
          k(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          R(this._container, "mousedown", this._onMouseDown, this);
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
          this._clearDeferredResetState(), this._resetState(), se(), fi(), this._startPoint = this._map.mouseEventToContainerPoint(t), k(document, {
            contextmenu: At,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(t) {
          this._moved || (this._moved = !0, this._box = O("div", "leaflet-zoom-box", this._container), $(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
          var e = new N(this._point, this._startPoint), i = e.getSize();
          W(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
        },
        _finish: function() {
          this._moved && (U(this._box), F(this._container, "leaflet-crosshair")), re(), mi(), R(document, {
            contextmenu: At,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(t) {
          if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(_(this._resetState, this), 0);
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
      z.addInitHook("addHandler", "boxZoom", as), z.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var hs = pt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, i = e.getZoom(), n = e.options.zoomDelta, r = t.originalEvent.shiftKey ? i - n : i + n;
          e.options.doubleClickZoom === "center" ? e.setZoom(r) : e.setZoomAround(t.containerPoint, r);
        }
      });
      z.addInitHook("addHandler", "doubleClickZoom", hs), z.mergeOptions({
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
      var ls = pt.extend({
        addHooks: function() {
          if (!this._draggable) {
            var t = this._map;
            this._draggable = new Pt(t._mapPane, t._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
          }
          $(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          F(this._map._container, "leaflet-grab"), F(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
            var e = H(this._map.options.maxBounds);
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
          var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, n = this._draggable._newPos.x, r = (n - e + i) % t + e - i, a = (n + e + i) % t - e - i, l = Math.abs(r + i) < Math.abs(a + i) ? r : a;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = l;
        },
        _onDragEnd: function(t) {
          var e = this._map, i = e.options, n = !i.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), n)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var r = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, l = i.easeLinearity, u = r.multiplyBy(l / a), m = u.distanceTo([0, 0]), g = Math.min(i.inertiaMaxSpeed, m), b = u.multiplyBy(g / m), T = g / (i.inertiaDeceleration * l), A = b.multiplyBy(-T / 2).round();
            !A.x && !A.y ? e.fire("moveend") : (A = e._limitOffset(A, e.options.maxBounds), Q(function() {
              e.panBy(A, {
                duration: T,
                easeLinearity: l,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      z.addInitHook("addHandler", "dragging", ls), z.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var cs = pt.extend({
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
          t.tabIndex <= 0 && (t.tabIndex = "0"), k(t, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks(), R(this._map._container, {
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
          var e = this._panKeys = {}, i = this.keyCodes, n, r;
          for (n = 0, r = i.left.length; n < r; n++)
            e[i.left[n]] = [-1 * t, 0];
          for (n = 0, r = i.right.length; n < r; n++)
            e[i.right[n]] = [t, 0];
          for (n = 0, r = i.down.length; n < r; n++)
            e[i.down[n]] = [0, t];
          for (n = 0, r = i.up.length; n < r; n++)
            e[i.up[n]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, i = this.keyCodes, n, r;
          for (n = 0, r = i.zoomIn.length; n < r; n++)
            e[i.zoomIn[n]] = t;
          for (n = 0, r = i.zoomOut.length; n < r; n++)
            e[i.zoomOut[n]] = -t;
        },
        _addHooks: function() {
          k(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          R(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, i = this._map, n;
            if (e in this._panKeys) {
              if (!i._panAnim || !i._panAnim._inProgress)
                if (n = this._panKeys[e], t.shiftKey && (n = E(n).multiplyBy(3)), i.options.maxBounds && (n = i._limitOffset(E(n), i.options.maxBounds)), i.options.worldCopyJump) {
                  var r = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(n)));
                  i.panTo(r);
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
      z.addInitHook("addHandler", "keyboard", cs), z.mergeOptions({
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
          k(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          R(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = zn(t), i = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var n = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(_(this._performZoom, this), n), At(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
          t._stop();
          var n = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), r = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2, a = i ? Math.ceil(r / i) * i : r, l = t._limitZoom(e + (this._delta > 0 ? a : -a)) - e;
          this._delta = 0, this._startTime = null, l && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + l) : t.setZoomAround(this._lastMousePos, e + l));
        }
      });
      z.addInitHook("addHandler", "scrollWheelZoom", ds);
      var ho = 600;
      z.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: P.touchNative && P.safari && P.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var us = pt.extend({
        addHooks: function() {
          k(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          R(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(t) {
          if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
            var e = t.touches[0];
            this._startPos = this._newPos = new C(e.clientX, e.clientY), this._holdTimeout = setTimeout(_(function() {
              this._cancel(), this._isTapValid() && (k(document, "touchend", V), k(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
            }, this), ho), k(document, "touchend touchcancel contextmenu", this._cancel, this), k(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function t() {
          R(document, "touchend", V), R(document, "touchend touchcancel", t);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), R(document, "touchend touchcancel contextmenu", this._cancel, this), R(document, "touchmove", this._onMove, this);
        },
        _onMove: function(t) {
          var e = t.touches[0];
          this._newPos = new C(e.clientX, e.clientY);
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
      z.addInitHook("addHandler", "tapHold", us), z.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: P.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: !0
      });
      var ps = pt.extend({
        addHooks: function() {
          $(this._map._container, "leaflet-touch-zoom"), k(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          F(this._map._container, "leaflet-touch-zoom"), R(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(n)._divideBy(2))), this._startDist = i.distanceTo(n), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), k(document, "touchmove", this._onTouchMove, this), k(document, "touchend touchcancel", this._onTouchEnd, this), V(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), n = e.mouseEventToContainerPoint(t.touches[1]), r = i.distanceTo(n) / this._startDist;
            if (this._zoom = e.getScaleZoom(r, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && r < 1 || this._zoom > e.getMaxZoom() && r > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, r === 1)
                return;
            } else {
              var a = i._add(n)._divideBy(2)._subtract(this._centerPoint);
              if (r === 1 && a.x === 0 && a.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(a), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), st(this._animRequest);
            var l = _(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = Q(l, this, !0), V(t);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, st(this._animRequest), R(document, "touchmove", this._onTouchMove, this), R(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      z.addInitHook("addHandler", "touchZoom", ps), z.BoxZoom = as, z.DoubleClickZoom = hs, z.Drag = ls, z.Keyboard = cs, z.ScrollWheelZoom = ds, z.TapHold = us, z.TouchZoom = ps, o.Bounds = N, o.Browser = P, o.CRS = gt, o.Canvas = ns, o.Circle = $i, o.CircleMarker = Ie, o.Class = _t, o.Control = lt, o.DivIcon = ts, o.DivOverlay = ft, o.DomEvent = Lr, o.DomUtil = Tr, o.Draggable = Pt, o.Evented = Qt, o.FeatureGroup = vt, o.GeoJSON = xt, o.GridLayer = de, o.Handler = pt, o.Icon = Ht, o.ImageOverlay = Re, o.LatLng = B, o.LatLngBounds = et, o.Layer = ct, o.LayerGroup = Ft, o.LineUtil = Rr, o.Map = z, o.Marker = De, o.Mixin = Dr, o.Path = Tt, o.Point = C, o.PolyUtil = Ir, o.Polygon = Wt, o.Polyline = yt, o.Popup = Ne, o.PosAnimation = On, o.Projection = Nr, o.Rectangle = os, o.Renderer = bt, o.SVG = pe, o.SVGOverlay = Qn, o.TileLayer = Gt, o.Tooltip = Ue, o.Transformation = ii, o.Util = Gs, o.VideoOverlay = Jn, o.bind = _, o.bounds = tt, o.canvas = ss, o.circle = Vr, o.circleMarker = jr, o.control = he, o.divIcon = no, o.extend = d, o.featureGroup = Wr, o.geoJSON = Xn, o.geoJson = Xr, o.gridLayer = so, o.icon = qr, o.imageOverlay = Jr, o.latLng = I, o.latLngBounds = H, o.layerGroup = Hr, o.map = Sr, o.marker = Gr, o.point = E, o.polygon = Yr, o.polyline = Kr, o.popup = eo, o.rectangle = ao, o.setOptions = D, o.stamp = f, o.svg = rs, o.svgOverlay = to, o.tileLayer = es, o.tooltip = io, o.transformation = te, o.version = h, o.videoOverlay = Qr;
      var lo = window.L;
      o.noConflict = function() {
        return window.L = lo, this;
      }, window.L = o;
    }));
  })(me, me.exports)), me.exports;
}
var Lt = fa();
const ma = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function _a(c) {
  return [...c].sort((s, o) => {
    const h = s.started_at ? Date.parse(s.started_at) : Number.POSITIVE_INFINITY, d = o.started_at ? Date.parse(o.started_at) : Number.POSITIVE_INFINITY;
    return h !== d ? h - d : s.id.localeCompare(o.id);
  });
}
const Ds = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], ga = ma.replace(/\s+/g, " ").trim();
class qs extends Xt {
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
  vehicleName = "";
  driveSectionsOpen = !1;
  fitMapPending = !0;
  connectedCallback() {
    super.connectedCallback(), this.driveSectionsOpen = typeof window < "u" && window.matchMedia("(min-width: 700px)").matches, this.refresh(!0);
  }
  disconnectedCallback() {
    this.map?.remove(), this.map = void 0, this.tileLayer = void 0, super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh(!0);
  }
  onConfigChanged() {
    this.tileLayer?.remove(), this.tileLayer = void 0, this.tileError = !1, this.fitMapPending = !0, this.refresh(!0);
  }
  async refresh(s = !1) {
    if (!(!this.hass || !this.vehicleId)) {
      this.fitMapPending ||= s, this.loading = !0, this.error = "", this.requestUpdate();
      try {
        const o = await Fs(this.hass);
        this.vehicleName = o.find((_) => _.vehicle_id === this.vehicleId)?.name ?? "";
        const h = await be(this.hass, this.vehicleId);
        this.mapConfig = h.map_config, this.trips = h.trips, (!this.selectedTripId || !this.trips.some((_) => _.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((_) => _.status === "active")?.id ?? this.trips[0]?.id ?? "");
        const d = this.selectedTripId ? await be(this.hass, this.vehicleId, this.selectedTripId) : h;
        this.mapConfig = d.map_config ?? this.mapConfig, this.drives = _a(d.drives);
        const p = new Set(this.drives.map((_) => _.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((_) => p.has(_)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((_) => _.id), this.driveSelectionInitialized = !0), this.data = await No(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
      } catch {
        this.error = M(this.hass).loadError, this.data = void 0;
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
    this.map || (this.map = Lt.map(s, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5));
    const o = this.config, h = o.tile_url ?? this.mapConfig?.tile_url ?? void 0, d = o.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (h && !this.tileError && !this.tileLayer) {
      const _ = d || (h.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = Lt.tileLayer(h, { maxZoom: 19, attribution: _ }).on("tileerror", () => {
        this.tileError = !0, this.tileLayer?.remove(), this.tileLayer = void 0, this.requestUpdate();
      }).addTo(this.map);
    }
    for (const _ of this.layers) _.remove();
    this.layers = [];
    const p = Lt.latLngBounds([]);
    for (const [_, y] of (this.data?.segments ?? []).entries()) {
      const f = y.points.map((D) => Lt.latLng(D.latitude, D.longitude));
      if (!f.length) continue;
      const v = this.drives.findIndex((D) => D.id === y.drive_id), S = this.driveColor(v >= 0 ? v : _), w = Lt.polyline(f, { color: S, weight: 4, opacity: 0.85 }).addTo(this.map);
      this.layers.push(w), f.forEach((D) => p.extend(D));
      const Z = M(this.hass), X = Lt.circleMarker(f[0], { radius: 6, color: S, fillOpacity: 1 }).bindTooltip(Z.mapStart).addTo(this.map), Y = Lt.circleMarker(f[f.length - 1], { radius: 6, color: "#111", fillColor: S, fillOpacity: 1 }).bindTooltip(Z.mapEnd).addTo(this.map);
      this.layers.push(X, Y);
      for (const D of y.gaps) {
        const Bt = f[Math.max(0, Math.floor(f.length / 2))], Jt = Lt.circleMarker(Bt, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${Z.mapGap}: ${D.seconds}s`).addTo(this.map);
        this.layers.push(Jt);
      }
    }
    this.fitMapPending && p.isValid() && (this.map.fitBounds(p.pad(0.08)), this.fitMapPending = !1), setTimeout(() => this.map?.invalidateSize(), 0);
  }
  driveColor(s) {
    return Ds[s % Ds.length];
  }
  selectedTrip() {
    return this.trips.find((s) => s.id === this.selectedTripId);
  }
  selectedDrives() {
    return this.drives.filter((s) => this.selectedDriveIds.includes(s.id));
  }
  async selectTrip(s) {
    this.selectedTripId = s.currentTarget.value, this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh(!0);
  }
  async toggleDrive(s) {
    const o = s.currentTarget;
    this.selectedDriveIds = o.checked ? [.../* @__PURE__ */ new Set([...this.selectedDriveIds, o.value])] : this.selectedDriveIds.filter((h) => h !== o.value), await this.refresh(!0);
  }
  async selectAllDrives() {
    this.selectedDriveIds = this.drives.map((s) => s.id), await this.refresh(!0);
  }
  async selectNoDrives() {
    this.selectedDriveIds = [], await this.refresh(!0);
  }
  onDriveSectionsToggle(s) {
    this.driveSectionsOpen = s.currentTarget.open;
  }
  driveRow(s, o) {
    const h = M(this.hass);
    return x`<label class="drive-row" style=${`--drive-color:${this.driveColor(o)}`}>
      <input type="checkbox" value=${s.id} .checked=${this.selectedDriveIds.includes(s.id)} @change=${(d) => {
      this.toggleDrive(d);
    }}>
      <span class="drive-info"><strong>${qe(s.started_at, this.hass)} · ${na(s.started_at, this.hass)}</strong><span>${(s.distance_m / 1e3).toFixed(1)} km · ${s.source === "manual" ? h.sourceManual : h.sourceGps}</span></span>
    </label>`;
  }
  render() {
    const s = M(this.hass), o = this.config, h = this.selectedTrip(), d = this.selectedDrives(), p = d.reduce((y, f) => y + f.distance_m, 0) / 1e3, _ = o.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    return x`<ha-card>
      <header class="map-header">
        <div><h2>${s.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || s.mapVehicle}</p></div>
        ${this.trips.length ? x`<label class="trip-picker"><span>${s.mapTrip}</span><select @change=${(y) => {
      this.selectTrip(y);
    }} .value=${this.selectedTripId}>${this.trips.map((y) => x`<option value=${y.id}>${y.title}</option>`)}</select></label>` : ""}
      </header>
      ${h ? x`<div class="metrics" aria-label=${s.mapTrip}>
        <div class="metric"><span>${s.mapTotalDistance}</span><strong>${p.toFixed(1)} km</strong></div>
        <div class="metric"><span>${s.mapSelectedDrives}</span><strong>${d.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${s.mapTripPeriod}</span><strong>${sa(h, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? x`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(y) => this.onDriveSectionsToggle(y)}>
        <summary><span>${s.mapDriveSegments}</span><span class="summary-count">${d.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => {
      this.selectAllDrives();
    }}>${s.mapSelectAll}</button><button class="secondary" type="button" @click=${() => {
      this.selectNoDrives();
    }}>${s.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((y, f) => this.driveRow(y, f))}</div>
      </details>` : ""}
      ${this.error ? x`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? x`<p class="error" role="alert">${M(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !o.tile_url && !this.mapConfig?.tile_url ? x`<p class="muted" role="status">${M(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? x`<p class="muted">${s.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? x`<p class="muted">${s.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${s.mapRouteImageAlt}></div>
      ${_ ? x`<p class="attribution">${_}</p>` : ""}
      ${this.loading ? x`<p class="muted">${s.loading}</p>` : ""}
    </ha-card>`;
  }
}
qs.styles = [Xt.styles, zs(ga), Zt`
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
tn("camper-travel-journal-map-card", qs);
function va(c, s) {
  return c.vehicle_id || s.length !== 1 ? c : { ...c, vehicle_id: s[0].vehicle_id };
}
function ya(c, s) {
  return c.type === s.type && c.vehicle_id === s.vehicle_id;
}
class xa extends zt {
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
    const o = this._hass?.connection !== s?.connection;
    this._hass = s, o && s && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(s) {
    ya(this._config, s) || (this._config = { ...s }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const s = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await Fs(s), this.loadedConnection = s.connection;
        const o = va(this._config, this.vehicles);
        o.vehicle_id !== this._config.vehicle_id && (this._config = o, this.fireConfigChanged());
      } catch {
        this.error = M(s).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(s) {
    const o = s.target.value;
    this._config = { ...this._config, vehicle_id: o }, this.fireConfigChanged();
  }
  render() {
    const s = M(this._hass);
    return x`
      <div class="field">
        <label for="vehicle">${s.editorVehicle}</label>
        ${this.loading ? x`<span class="muted">${s.editorLoading}</span>` : x`
          <select id="vehicle" aria-label=${s.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${s.editorChooseVehicle}</option>
            ${this.vehicles.map((o) => x`<option value=${o.vehicle_id} ?selected=${o.vehicle_id === this._config.vehicle_id}>${o.name || o.title}</option>`)}
          </select>
        `}
        ${this.error ? x`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? x`<span class="error" role="alert">${s.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", xa);
const ba = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-map-card", name: "Camper Travel Journal – GPS-Karte", description: "Zeigt gespeicherte GPS-Fahrten nach Reise und Fahrtabschnitt.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const c of ba) window.customCards.some((s) => s.type === c.type) || window.customCards.push(c);
