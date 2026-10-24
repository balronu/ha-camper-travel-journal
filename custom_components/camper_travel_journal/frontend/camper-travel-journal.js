const Qe = globalThis, sn = Qe.ShadowRoot && (Qe.ShadyCSS === void 0 || Qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, an = /* @__PURE__ */ Symbol(), Er = /* @__PURE__ */ new WeakMap();
let Gr = class {
  constructor(i, s, o) {
    if (this._$cssResult$ = !0, o !== an) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = i, this.t = s;
  }
  get styleSheet() {
    let i = this.o;
    const s = this.t;
    if (sn && i === void 0) {
      const o = s !== void 0 && s.length === 1;
      o && (i = Er.get(s)), i === void 0 && ((this.o = i = new CSSStyleSheet()).replaceSync(this.cssText), o && Er.set(s, i));
    }
    return i;
  }
  toString() {
    return this.cssText;
  }
};
const Kr = (c) => new Gr(typeof c == "string" ? c : c + "", void 0, an), wt = (c, ...i) => {
  const s = c.length === 1 ? c[0] : i.reduce((o, h, d) => o + ((f) => {
    if (f._$cssResult$ === !0) return f.cssText;
    if (typeof f == "number") return f;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + f + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(h) + c[d + 1], c[0]);
  return new Gr(s, c, an);
}, Ia = (c, i) => {
  if (sn) c.adoptedStyleSheets = i.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of i) {
    const o = document.createElement("style"), h = Qe.litNonce;
    h !== void 0 && o.setAttribute("nonce", h), o.textContent = s.cssText, c.appendChild(o);
  }
}, Sr = sn ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((i) => {
  let s = "";
  for (const o of i.cssRules) s += o.cssText;
  return Kr(s);
})(c) : c;
const { is: Ma, defineProperty: za, getOwnPropertyDescriptor: Oa, getOwnPropertyNames: Ra, getOwnPropertySymbols: Na, getPrototypeOf: Ba } = Object, ni = globalThis, kr = ni.trustedTypes, Za = kr ? kr.emptyScript : "", Fa = ni.reactiveElementPolyfillSupport, Ee = (c, i) => c, en = { toAttribute(c, i) {
  switch (i) {
    case Boolean:
      c = c ? Za : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, i) {
  let s = c;
  switch (i) {
    case Boolean:
      s = c !== null;
      break;
    case Number:
      s = c === null ? null : Number(c);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(c);
      } catch {
        s = null;
      }
  }
  return s;
} }, Vr = (c, i) => !Ma(c, i), Dr = { attribute: !0, type: String, converter: en, reflect: !1, useDefault: !1, hasChanged: Vr };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ni.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let re = class extends HTMLElement {
  static addInitializer(i) {
    this._$Ei(), (this.l ??= []).push(i);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(i, s = Dr) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(i) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(i, s), !s.noAccessor) {
      const o = /* @__PURE__ */ Symbol(), h = this.getPropertyDescriptor(i, o, s);
      h !== void 0 && za(this.prototype, i, h);
    }
  }
  static getPropertyDescriptor(i, s, o) {
    const { get: h, set: d } = Oa(this.prototype, i) ?? { get() {
      return this[s];
    }, set(f) {
      this[s] = f;
    } };
    return { get: h, set(f) {
      const b = h?.call(this);
      d?.call(this, f), this.requestUpdate(i, b, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(i) {
    return this.elementProperties.get(i) ?? Dr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ee("elementProperties"))) return;
    const i = Ba(this);
    i.finalize(), i.l !== void 0 && (this.l = [...i.l]), this.elementProperties = new Map(i.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ee("properties"))) {
      const s = this.properties, o = [...Ra(s), ...Na(s)];
      for (const h of o) this.createProperty(h, s[h]);
    }
    const i = this[Symbol.metadata];
    if (i !== null) {
      const s = litPropertyMetadata.get(i);
      if (s !== void 0) for (const [o, h] of s) this.elementProperties.set(o, h);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, o] of this.elementProperties) {
      const h = this._$Eu(s, o);
      h !== void 0 && this._$Eh.set(h, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const o = new Set(i.flat(1 / 0).reverse());
      for (const h of o) s.unshift(Sr(h));
    } else i !== void 0 && s.push(Sr(i));
    return s;
  }
  static _$Eu(i, s) {
    const o = s.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof i == "string" ? i.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((i) => i(this));
  }
  addController(i) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(i), this.renderRoot !== void 0 && this.isConnected && i.hostConnected?.();
  }
  removeController(i) {
    this._$EO?.delete(i);
  }
  _$E_() {
    const i = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const o of s.keys()) this.hasOwnProperty(o) && (i.set(o, this[o]), delete this[o]);
    i.size > 0 && (this._$Ep = i);
  }
  createRenderRoot() {
    const i = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ia(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((i) => i.hostConnected?.());
  }
  enableUpdating(i) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((i) => i.hostDisconnected?.());
  }
  attributeChangedCallback(i, s, o) {
    this._$AK(i, o);
  }
  _$ET(i, s) {
    const o = this.constructor.elementProperties.get(i), h = this.constructor._$Eu(i, o);
    if (h !== void 0 && o.reflect === !0) {
      const d = (o.converter?.toAttribute !== void 0 ? o.converter : en).toAttribute(s, o.type);
      this._$Em = i, d == null ? this.removeAttribute(h) : this.setAttribute(h, d), this._$Em = null;
    }
  }
  _$AK(i, s) {
    const o = this.constructor, h = o._$Eh.get(i);
    if (h !== void 0 && this._$Em !== h) {
      const d = o.getPropertyOptions(h), f = typeof d.converter == "function" ? { fromAttribute: d.converter } : d.converter?.fromAttribute !== void 0 ? d.converter : en;
      this._$Em = h;
      const b = f.fromAttribute(s, d.type);
      this[h] = b ?? this._$Ej?.get(h) ?? b, this._$Em = null;
    }
  }
  requestUpdate(i, s, o, h = !1, d) {
    if (i !== void 0) {
      const f = this.constructor;
      if (h === !1 && (d = this[i]), o ??= f.getPropertyOptions(i), !((o.hasChanged ?? Vr)(d, s) || o.useDefault && o.reflect && d === this._$Ej?.get(i) && !this.hasAttribute(f._$Eu(i, o)))) return;
      this.C(i, s, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(i, s, { useDefault: o, reflect: h, wrapped: d }, f) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(i) && (this._$Ej.set(i, f ?? s ?? this[i]), d !== !0 || f !== void 0) || (this._$AL.has(i) || (this.hasUpdated || o || (s = void 0), this._$AL.set(i, s)), h === !0 && this._$Em !== i && (this._$Eq ??= /* @__PURE__ */ new Set()).add(i));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const i = this.scheduleUpdate();
    return i != null && await i, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [h, d] of this._$Ep) this[h] = d;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [h, d] of o) {
        const { wrapped: f } = d, b = this[h];
        f !== !0 || this._$AL.has(h) || b === void 0 || this.C(h, void 0, d, b);
      }
    }
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (o) {
      throw i = !1, this._$EM(), o;
    }
    i && this._$AE(s);
  }
  willUpdate(i) {
  }
  _$AE(i) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(i)), this.updated(i);
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
  shouldUpdate(i) {
    return !0;
  }
  update(i) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(i) {
  }
  firstUpdated(i) {
  }
};
re.elementStyles = [], re.shadowRootOptions = { mode: "open" }, re[Ee("elementProperties")] = /* @__PURE__ */ new Map(), re[Ee("finalized")] = /* @__PURE__ */ new Map(), Fa?.({ ReactiveElement: re }), (ni.reactiveElementVersions ??= []).push("2.1.2");
const on = globalThis, Lr = (c) => c, ei = on.trustedTypes, Ar = ei ? ei.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, Yr = "$lit$", Mt = `lit$${Math.random().toFixed(9).slice(2)}$`, Xr = "?" + Mt, Ua = `<${Xr}>`, Kt = document, Se = () => Kt.createComment(""), ke = (c) => c === null || typeof c != "object" && typeof c != "function", ln = Array.isArray, Wa = (c) => ln(c) || typeof c?.[Symbol.iterator] == "function", qi = `[ \t
\f\r]`, Te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Cr = /-->/g, Ir = />/g, Ht = RegExp(`>|${qi}(?:([^\\s"'>=/]+)(${qi}*=${qi}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), Mr = /'/g, zr = /"/g, Jr = /^(?:script|style|textarea|title)$/i, Ha = (c) => (i, ...s) => ({ _$litType$: c, strings: i, values: s }), m = Ha(1), oe = /* @__PURE__ */ Symbol.for("lit-noChange"), X = /* @__PURE__ */ Symbol.for("lit-nothing"), Or = /* @__PURE__ */ new WeakMap(), qt = Kt.createTreeWalker(Kt, 129);
function Qr(c, i) {
  if (!ln(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ar !== void 0 ? Ar.createHTML(i) : i;
}
const qa = (c, i) => {
  const s = c.length - 1, o = [];
  let h, d = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", f = Te;
  for (let b = 0; b < s; b++) {
    const p = c[b];
    let _, w, y = -1, k = 0;
    for (; k < p.length && (f.lastIndex = k, w = f.exec(p), w !== null); ) k = f.lastIndex, f === Te ? w[1] === "!--" ? f = Cr : w[1] !== void 0 ? f = Ir : w[2] !== void 0 ? (Jr.test(w[2]) && (h = RegExp("</" + w[2], "g")), f = Ht) : w[3] !== void 0 && (f = Ht) : f === Ht ? w[0] === ">" ? (f = h ?? Te, y = -1) : w[1] === void 0 ? y = -2 : (y = f.lastIndex - w[2].length, _ = w[1], f = w[3] === void 0 ? Ht : w[3] === '"' ? zr : Mr) : f === zr || f === Mr ? f = Ht : f === Cr || f === Ir ? f = Te : (f = Ht, h = void 0);
    const $ = f === Ht && c[b + 1].startsWith("/>") ? " " : "";
    d += f === Te ? p + Ua : y >= 0 ? (o.push(_), p.slice(0, y) + Yr + p.slice(y) + Mt + $) : p + Mt + (y === -2 ? b : $);
  }
  return [Qr(c, d + (c[s] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), o];
};
class De {
  constructor({ strings: i, _$litType$: s }, o) {
    let h;
    this.parts = [];
    let d = 0, f = 0;
    const b = i.length - 1, p = this.parts, [_, w] = qa(i, s);
    if (this.el = De.createElement(_, o), qt.currentNode = this.el.content, s === 2 || s === 3) {
      const y = this.el.content.firstChild;
      y.replaceWith(...y.childNodes);
    }
    for (; (h = qt.nextNode()) !== null && p.length < b; ) {
      if (h.nodeType === 1) {
        if (h.hasAttributes()) for (const y of h.getAttributeNames()) if (y.endsWith(Yr)) {
          const k = w[f++], $ = h.getAttribute(y).split(Mt), D = /([.?@])?(.*)/.exec(k);
          p.push({ type: 1, index: d, name: D[2], strings: $, ctor: D[1] === "." ? Ga : D[1] === "?" ? Ka : D[1] === "@" ? Va : ri }), h.removeAttribute(y);
        } else y.startsWith(Mt) && (p.push({ type: 6, index: d }), h.removeAttribute(y));
        if (Jr.test(h.tagName)) {
          const y = h.textContent.split(Mt), k = y.length - 1;
          if (k > 0) {
            h.textContent = ei ? ei.emptyScript : "";
            for (let $ = 0; $ < k; $++) h.append(y[$], Se()), qt.nextNode(), p.push({ type: 2, index: ++d });
            h.append(y[k], Se());
          }
        }
      } else if (h.nodeType === 8) if (h.data === Xr) p.push({ type: 2, index: d });
      else {
        let y = -1;
        for (; (y = h.data.indexOf(Mt, y + 1)) !== -1; ) p.push({ type: 7, index: d }), y += Mt.length - 1;
      }
      d++;
    }
  }
  static createElement(i, s) {
    const o = Kt.createElement("template");
    return o.innerHTML = i, o;
  }
}
function le(c, i, s = c, o) {
  if (i === oe) return i;
  let h = o !== void 0 ? s._$Co?.[o] : s._$Cl;
  const d = ke(i) ? void 0 : i._$litDirective$;
  return h?.constructor !== d && (h?._$AO?.(!1), d === void 0 ? h = void 0 : (h = new d(c), h._$AT(c, s, o)), o !== void 0 ? (s._$Co ??= [])[o] = h : s._$Cl = h), h !== void 0 && (i = le(c, h._$AS(c, i.values), h, o)), i;
}
class ja {
  constructor(i, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = i, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(i) {
    const { el: { content: s }, parts: o } = this._$AD, h = (i?.creationScope ?? Kt).importNode(s, !0);
    qt.currentNode = h;
    let d = qt.nextNode(), f = 0, b = 0, p = o[0];
    for (; p !== void 0; ) {
      if (f === p.index) {
        let _;
        p.type === 2 ? _ = new Ae(d, d.nextSibling, this, i) : p.type === 1 ? _ = new p.ctor(d, p.name, p.strings, this, i) : p.type === 6 && (_ = new Ya(d, this, i)), this._$AV.push(_), p = o[++b];
      }
      f !== p?.index && (d = qt.nextNode(), f++);
    }
    return qt.currentNode = Kt, h;
  }
  p(i) {
    let s = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(i, o, s), s += o.strings.length - 2) : o._$AI(i[s])), s++;
  }
}
class Ae {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(i, s, o, h) {
    this.type = 2, this._$AH = X, this._$AN = void 0, this._$AA = i, this._$AB = s, this._$AM = o, this.options = h, this._$Cv = h?.isConnected ?? !0;
  }
  get parentNode() {
    let i = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && i?.nodeType === 11 && (i = s.parentNode), i;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(i, s = this) {
    i = le(this, i, s), ke(i) ? i === X || i == null || i === "" ? (this._$AH !== X && this._$AR(), this._$AH = X) : i !== this._$AH && i !== oe && this._(i) : i._$litType$ !== void 0 ? this.$(i) : i.nodeType !== void 0 ? this.T(i) : Wa(i) ? this.k(i) : this._(i);
  }
  O(i) {
    return this._$AA.parentNode.insertBefore(i, this._$AB);
  }
  T(i) {
    this._$AH !== i && (this._$AR(), this._$AH = this.O(i));
  }
  _(i) {
    this._$AH !== X && ke(this._$AH) ? this._$AA.nextSibling.data = i : this.T(Kt.createTextNode(i)), this._$AH = i;
  }
  $(i) {
    const { values: s, _$litType$: o } = i, h = typeof o == "number" ? this._$AC(i) : (o.el === void 0 && (o.el = De.createElement(Qr(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === h) this._$AH.p(s);
    else {
      const d = new ja(h, this), f = d.u(this.options);
      d.p(s), this.T(f), this._$AH = d;
    }
  }
  _$AC(i) {
    let s = Or.get(i.strings);
    return s === void 0 && Or.set(i.strings, s = new De(i)), s;
  }
  k(i) {
    ln(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let o, h = 0;
    for (const d of i) h === s.length ? s.push(o = new Ae(this.O(Se()), this.O(Se()), this, this.options)) : o = s[h], o._$AI(d), h++;
    h < s.length && (this._$AR(o && o._$AB.nextSibling, h), s.length = h);
  }
  _$AR(i = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); i !== this._$AB; ) {
      const o = Lr(i).nextSibling;
      Lr(i).remove(), i = o;
    }
  }
  setConnected(i) {
    this._$AM === void 0 && (this._$Cv = i, this._$AP?.(i));
  }
}
class ri {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(i, s, o, h, d) {
    this.type = 1, this._$AH = X, this._$AN = void 0, this.element = i, this.name = s, this._$AM = h, this.options = d, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = X;
  }
  _$AI(i, s = this, o, h) {
    const d = this.strings;
    let f = !1;
    if (d === void 0) i = le(this, i, s, 0), f = !ke(i) || i !== this._$AH && i !== oe, f && (this._$AH = i);
    else {
      const b = i;
      let p, _;
      for (i = d[0], p = 0; p < d.length - 1; p++) _ = le(this, b[o + p], s, p), _ === oe && (_ = this._$AH[p]), f ||= !ke(_) || _ !== this._$AH[p], _ === X ? i = X : i !== X && (i += (_ ?? "") + d[p + 1]), this._$AH[p] = _;
    }
    f && !h && this.j(i);
  }
  j(i) {
    i === X ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, i ?? "");
  }
}
class Ga extends ri {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(i) {
    this.element[this.name] = i === X ? void 0 : i;
  }
}
let Ka = class extends ri {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(i) {
    this.element.toggleAttribute(this.name, !!i && i !== X);
  }
};
class Va extends ri {
  constructor(i, s, o, h, d) {
    super(i, s, o, h, d), this.type = 5;
  }
  _$AI(i, s = this) {
    if ((i = le(this, i, s, 0) ?? X) === oe) return;
    const o = this._$AH, h = i === X && o !== X || i.capture !== o.capture || i.once !== o.once || i.passive !== o.passive, d = i !== X && (o === X || h);
    h && this.element.removeEventListener(this.name, this, o), d && this.element.addEventListener(this.name, this, i), this._$AH = i;
  }
  handleEvent(i) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, i) : this._$AH.handleEvent(i);
  }
}
class Ya {
  constructor(i, s, o) {
    this.element = i, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(i) {
    le(this, i);
  }
}
const Xa = on.litHtmlPolyfillSupport;
Xa?.(De, Ae), (on.litHtmlVersions ??= []).push("3.3.3");
const Ja = (c, i, s) => {
  const o = s?.renderBefore ?? i;
  let h = o._$litPart$;
  if (h === void 0) {
    const d = s?.renderBefore ?? null;
    o._$litPart$ = h = new Ae(i.insertBefore(Se(), d), d, void 0, s ?? {});
  }
  return h._$AI(c), h;
};
const hn = globalThis;
class jt extends re {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const i = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= i.firstChild, i;
  }
  update(i) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(i), this._$Do = Ja(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return oe;
  }
}
jt._$litElement$ = !0, jt.finalized = !0, hn.litElementHydrateSupport?.({ LitElement: jt });
const Qa = hn.litElementPolyfillSupport;
Qa?.({ LitElement: jt });
(hn.litElementVersions ??= []).push("4.2.2");
const ts = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], Je = ts, to = {
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
  journalClose: "Reise wechseln",
  journalOverview: "Reiseübersicht",
  journalDrives: "Fahrten und Unterbrechungen",
  journalStopsHint: "Bestätigte Zwischenstopps dieser Reise.",
  journalOvernightHint: "Übernachtungsplätze und ihre Bewertungen werden im Ortsbereich verwaltet.",
  noInterruptions: "Keine Unterbrechungen zwischen Fahrten.",
  notAvailable: "Nicht verfügbar",
  unsavedTripChange: "Ungespeicherte Änderungen verwerfen?",
  migrationTitle: "WICHTIG: DIE LOVELACE-KARTEN HABEN SICH GEÄNDERT!",
  migrationText: "Ab Version 0.3.0 werden neue Dashboards mit der zentralen Karte Camper Travel Journal – Reisetagebuch eingerichtet. Diese bisherige Karte bleibt aus Kompatibilitätsgründen funktionsfähig, wird aber nicht mehr für neue Dashboards empfohlen.",
  migrationLink: "Migrationsanleitung",
  tripActions: "Reiseaktionen",
  tripReactivate: "Reise wieder aktivieren",
  tripDeleteTitle: "Reise löschen?",
  tripDeleteDrives: "Zugeordnete Fahrten bleiben erhalten.",
  tripDeleteLinkedData: "Kosten und Orte bleiben erhalten, verlieren aber ihre Reisezuordnung.",
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
  tripDeleteConfirm: "Die Reise wird gelöscht. Dieser Vorgang kann nicht rückgängig gemacht werden.",
  expenseDeleteConfirm: "Kosten löschen?",
  tripCreateError: "Reise konnte nicht gespeichert werden.",
  tripEditError: "Reise konnte nicht bearbeitet werden.",
  tripDeleteError: "Reise konnte nicht gelöscht werden.",
  expenseCreateError: "Ausgabe konnte nicht gespeichert werden.",
  expenseEditError: "Kosten konnten nicht bearbeitet werden.",
  expenseDeleteError: "Kosten konnten nicht gelöscht werden.",
  driveAssignError: "Fahrt konnte nicht zugeordnet werden.",
  savedRefreshError: "Gespeichert. Die Ansicht konnte anschließend nicht aktualisiert werden. Bitte später erneut laden.",
  categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", other: "Sonstiges" },
  statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" },
  amountInvalid: "Bitte einen gültigen Betrag mit höchstens zwei Nachkommastellen eingeben.",
  categoryInvalid: "Bitte eine gültige Kostenkategorie auswählen.",
  mixedCurrency: "Mehrere Währungen",
  cancel: "Abbrechen",
  saving: "Speichern …",
  total: "Gesamt",
  expenseDate: "Tatsächliches Ausgabendatum",
  expenseDateUnknown: "Ausgabendatum unbekannt",
  expenseTime: "Uhrzeit erfassen",
  time: "Uhrzeit",
  fuelLiters: "Getankte Liter (l)",
  fuelPrice: "Literpreis (€/l)",
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
}, eo = {
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
  journalClose: "Switch trip",
  journalOverview: "Trip overview",
  journalDrives: "Drives and interruptions",
  journalStopsHint: "Confirmed stops belonging to this trip.",
  journalOvernightHint: "Overnight places and their ratings are managed in the places area.",
  noInterruptions: "No gaps between drives.",
  notAvailable: "Not available",
  unsavedTripChange: "Discard unsaved changes?",
  migrationTitle: "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!",
  migrationText: "From version 0.3.0, new dashboards should use the central Camper Travel Journal card. This legacy card remains functional for compatibility, but is no longer recommended for new dashboards.",
  migrationLink: "Migration guide",
  tripActions: "Trip actions",
  tripReactivate: "Reactivate trip",
  tripDeleteTitle: "Delete trip?",
  tripDeleteDrives: "Assigned drives will be kept.",
  tripDeleteLinkedData: "Costs and places will be kept but lose their trip assignment.",
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
  tripDeleteConfirm: "The trip will be deleted. This cannot be undone.",
  expenseDeleteConfirm: "Delete cost?",
  tripCreateError: "Trip could not be saved.",
  tripEditError: "Trip could not be edited.",
  tripDeleteError: "Trip could not be deleted.",
  expenseCreateError: "Cost could not be saved.",
  expenseEditError: "Cost could not be edited.",
  expenseDeleteError: "Cost could not be deleted.",
  driveAssignError: "Drive could not be assigned.",
  savedRefreshError: "Saved, but the view could not be refreshed. Please reload later.",
  categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", other: "Other" },
  statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" },
  amountInvalid: "Enter a valid amount with no more than two decimal places.",
  categoryInvalid: "Select a valid cost category.",
  mixedCurrency: "Multiple currencies",
  cancel: "Cancel",
  saving: "Saving …",
  total: "Total",
  expenseDate: "Actual expense date",
  expenseDateUnknown: "Expense date unknown",
  expenseTime: "Record time",
  time: "Time",
  fuelLiters: "Fuel quantity (l)",
  fuelPrice: "Price per liter (€/l)",
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
}, Rr = {
  de: {
    mapNoValidPoints: "Für diese Reise sind keine gültigen GPS-Punkte verfügbar.",
    mapNoRouteWithPlaces: "Keine gültige GPS-Route verfügbar; gespeicherte Orte werden angezeigt.",
    mapTitle: "Reisekarte",
    mapVehicle: "Fahrzeug",
    mapTrip: "Reise",
    mapTotalDistance: "Kilometer",
    mapSelectedDrives: "Fahrtabschnitte",
    mapTripPeriod: "Reisezeitraum",
    mapPlaces: "Orte anzeigen",
    mapExpandSegments: "Fahrtabschnitte aufklappen",
    overnights: "Übernachtungen",
    overnightPlaces: "Übernachtungsplätze",
    gpsSuggestions: "GPS-Stoppvorschläge",
    generateSuggestions: "Vorschläge aktualisieren",
    accept: "Übernehmen",
    dismiss: "Verwerfen",
    noSuggestions: "Keine offenen Vorschläge.",
    places: "Orte und Zwischenstopps",
    placesAndStays: "Orte & Aufenthalte",
    unassignedInterruptions: "Nicht zugeordnete Fahrtunterbrechungen",
    noPlaces: "Keine Orte gespeichert.",
    placeName: "Name",
    placeCategory: "Kategorie",
    placeArrived: "Ankunft",
    placeDeparted: "Abfahrt",
    placeAddress: "Adresse",
    placeWebsite: "Webseite (optional)",
    placeWebsiteOpen: "Webseite öffnen",
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
    suggestedPosition: "Vorgeschlagene Position",
    expenseNote: "Bemerkung (optional)",
    expenseNoteHint: "Bis zu 2.000 Zeichen, Zeilenumbrüche sind möglich."
  },
  en: {
    mapNoValidPoints: "No valid GPS points are available for this trip.",
    mapNoRouteWithPlaces: "No valid GPS route is available; saved places are shown.",
    mapTitle: "Travel map",
    mapVehicle: "Camper",
    mapTrip: "Trip",
    mapTotalDistance: "Kilometers",
    mapSelectedDrives: "Drive sections",
    mapTripPeriod: "Trip period",
    mapPlaces: "Show places",
    mapExpandSegments: "Expand drive sections",
    overnights: "Overnights",
    overnightPlaces: "Overnight places",
    gpsSuggestions: "GPS stop suggestions",
    generateSuggestions: "Refresh suggestions",
    accept: "Accept",
    dismiss: "Dismiss",
    noSuggestions: "No open suggestions.",
    places: "Places and stops",
    placesAndStays: "Places & stays",
    unassignedInterruptions: "Unassigned drive interruptions",
    noPlaces: "No places saved.",
    placeName: "Name",
    placeCategory: "Category",
    placeArrived: "Arrival",
    placeDeparted: "Departure",
    placeAddress: "Address",
    placeWebsite: "Website (optional)",
    placeWebsiteOpen: "Open website",
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
    suggestedPosition: "Suggested position",
    expenseNote: "Note (optional)",
    expenseNoteHint: "Up to 2,000 characters; line breaks are supported."
  }
};
function P(c) {
  const i = c?.locale?.language?.toLowerCase() ?? "de";
  return { ...i.startsWith("de") ? to : eo, ...i.startsWith("de") ? Rr.de : Rr.en };
}
function ii(c) {
  return (c?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function se(c, i) {
  const s = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c);
  if (s) {
    const [, o, h, d] = s;
    return ii(i).startsWith("de") ? `${d}.${h}.${o}` : `${h}/${d}/${o}`;
  }
  return new Date(c).toLocaleDateString(ii(i));
}
function j(c, i) {
  return new Date(c).toLocaleString(ii(i), { dateStyle: "short", timeStyle: "short" });
}
function Nr(c, i) {
  return new Date(c).toLocaleTimeString(ii(i), { hour: "2-digit", minute: "2-digit" });
}
function Dt(c, i) {
  const s = Math.max(0, Math.round((c ?? 0) / 60));
  return s < 60 ? `${s} min` : `${Math.floor(s / 60)} h ${s % 60} min`;
}
function Lt(c, i) {
  return c.start_date || c.end_date ? [c.start_date, c.end_date].filter(Boolean).map((s) => se(s, i)).join(" – ") || "" : c.started_at ? `${se(c.started_at, i)}${c.ended_at ? ` – ${se(c.ended_at, i)}` : ""}` : "";
}
function io(c, i) {
  const s = c.start_date || c.started_at, o = c.end_date || c.ended_at;
  if (!s && !o) return "";
  const h = (_) => {
    const w = /^(\d{4})-(\d{2})-(\d{2})$/.exec(_);
    return w ? new Date(Number(w[1]), Number(w[2]) - 1, Number(w[3])) : new Date(_);
  }, d = h(s || o || ""), f = h(o || s || "");
  if (Number.isNaN(d.getTime()) || Number.isNaN(f.getTime())) return Lt(c, i);
  if (!(i?.locale?.language ?? "").toLowerCase().startsWith("de")) {
    const _ = new Intl.DateTimeFormat("en-US", { month: "short" }), w = (k) => k.getDate(), y = (k) => k.getFullYear();
    return y(d) === y(f) && d.getMonth() === f.getMonth() ? `${_.format(d)} ${w(d)}–${w(f)}, ${y(d)}` : y(d) === y(f) ? `${_.format(d)} ${w(d)}–${_.format(f)} ${w(f)}, ${y(d)}` : `${_.format(d)} ${w(d)}, ${y(d)}–${_.format(f)} ${w(f)}, ${y(f)}`;
  }
  const p = (_) => `${String(_.getDate()).padStart(2, "0")}.${String(_.getMonth() + 1).padStart(2, "0")}.${String(_.getFullYear()).slice(-2)}`;
  return d.getFullYear() === f.getFullYear() && d.getMonth() === f.getMonth() ? `${String(d.getDate()).padStart(2, "0")}.–${p(f).slice(0, 2)}.${String(f.getMonth() + 1).padStart(2, "0")}.${String(f.getFullYear()).slice(-2)}` : `${p(d)}–${p(f)}`;
}
function Gt(c, i) {
  return P(i).statuses[c] ?? c;
}
function ji(c, i) {
  return P(i).categories[c] ?? c;
}
const no = {
  "Stellplatz/Campingplatz": "camping",
  Campingplatz: "camping",
  "Camping site": "camping",
  camping: "camping",
  Kraftstoff: "fuel",
  Fuel: "fuel",
  fuel: "fuel",
  Maut: "toll",
  Toll: "toll",
  toll: "toll",
  Parkplatz: "parking",
  Parkgebühren: "parking",
  Parking: "parking",
  "Parking fees": "parking",
  parking: "parking",
  Essen: "food",
  Verpflegung: "food",
  Food: "food",
  food: "food",
  Aktivitäten: "activities",
  Activities: "activities",
  activities: "activities",
  Sonstiges: "other",
  Other: "other",
  other: "other"
};
function ro(c) {
  const i = (c ?? "").trim();
  return no[i] ?? i;
}
function so(c, i) {
  const s = P(i), o = {
    other: s.placeOther,
    restaurant: s.placeRestaurant,
    fuel_stop: s.placeFuel,
    attraction: s.placeAttraction,
    ferry: s.placeFerry,
    campsite: s.placeCampsite,
    rv_site: s.placeRvSite,
    wild_camp: s.placeWildCamp,
    parking: ao(i) === "de" ? "Parkplatz" : "Parking",
    overnight: s.overnights
  };
  return c && o[c] || s.placeOther || c || "—";
}
function ao(c) {
  return (c?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de" : "en";
}
function oo(c) {
  return ts.includes(c);
}
function bt(c, i, s) {
  const o = (s?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(o, { style: "currency", currency: i, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100);
}
function Br(c) {
  const i = c.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(i)) return null;
  const [s, o = ""] = i.split("."), h = Number(s) * 100 + Number((o + "00").slice(0, 2));
  return Number.isSafeInteger(h) ? h : null;
}
class Nt extends jt {
  _hass;
  config = {};
  static styles = wt`
    :host { display:block; color:var(--primary-text-color); } ha-card { padding:16px; background:var(--ha-card-background,var(--card-background-color)); }
    h2,h3 { margin:0 0 12px; } .muted { color:var(--secondary-text-color); } .error { color:var(--error-color); }
    button { min-height:40px; border:0; border-radius:8px; padding:8px 12px; cursor:pointer; color:var(--text-primary-color,#fff); background:var(--primary-color); }
    button.secondary { color:var(--primary-text-color); background:var(--secondary-background-color); } .actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; } .metric { padding:10px; border-radius:8px; background:var(--secondary-background-color); }
    .value { display:block; font-size:1.25rem; font-weight:600; } input { min-height:38px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:6px; padding:8px; background:var(--card-background-color); color:var(--primary-text-color); } .migration-notice { margin:0 0 12px; padding:12px; border:1px solid var(--warning-color,#f57c00); border-inline-start:5px solid var(--warning-color,#f57c00); border-radius:8px; background:color-mix(in srgb,var(--warning-color,#f57c00) 12%,var(--card-background-color)); } .migration-notice strong { display:block; color:var(--primary-text-color); } .migration-notice p { margin:6px 0; color:var(--primary-text-color); } .migration-notice a { color:var(--primary-color); }
    @media (max-width:500px) { ha-card { padding:12px; } }
  `;
  get hass() {
    return this._hass;
  }
  set hass(i) {
    const s = this._hass?.connection !== i?.connection;
    this._hass = i, s && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(i) {
    this.config.vehicle_id === i.vehicle_id && this.config.trip_id === i.trip_id && this.config.journal_section === i.journal_section || (this.config = { ...i }, this.onConfigChanged(), this.requestUpdate());
  }
  onHassConnectionChanged() {
  }
  onConfigChanged() {
  }
  updated() {
    if (this.tagName.toLowerCase().includes("journal-card") || this.config.journal_section || this.config.trip_id || this.shadowRoot?.querySelector(".migration-notice")) return;
    const i = this.shadowRoot?.querySelector("ha-card");
    if (!i) return;
    const s = P(this.hass), o = document.createElement("aside");
    o.className = "migration-notice", o.setAttribute("role", "note");
    const h = document.createElement("strong");
    h.textContent = s.migrationTitle ?? "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const d = document.createElement("p");
    d.textContent = s.migrationText ?? "Use the central journal card for new dashboards.";
    const f = document.createElement("a");
    f.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration", f.target = "_blank", f.rel = "noreferrer", f.textContent = s.migrationLink ?? "Migration guide", o.append(h, d, f), i.prepend(o);
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
  migrationNotice() {
    const i = P(this.hass);
    return m`<aside class="migration-notice" role="note"><strong>${i.migrationTitle}</strong><p>${i.migrationText}</p><a href="https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration" target="_blank" rel="noreferrer">${i.migrationLink}</a></aside>`;
  }
}
function si(c, i) {
  customElements.get(c) || customElements.define(c, i);
}
async function F(c, i, s, o = {}) {
  return c.connection.sendMessagePromise({ type: i, vehicle_id: s, ...o });
}
const Ot = (c, i, s) => F(c, "camper_travel_journal/list", i, s ? { trip_id: s } : {}), lo = (c, i, s, o, h = 5e3) => F(c, "camper_travel_journal/route", i, { trip_id: s, drive_ids: o, max_points: h }), es = (c, i, s, o) => F(c, "camper_travel_journal/transition_trip", i, { trip_id: s, status: o }), ho = (c, i, s, o = "", h = "", d = "") => F(c, "camper_travel_journal/create_trip", i, { title: s, start_date: o || void 0, end_date: h || void 0, destination: d }), co = (c, i, s, o) => F(c, "camper_travel_journal/update_trip", i, { trip_id: s, ...o }), uo = (c, i, s) => F(c, "camper_travel_journal/delete_trip", i, { trip_id: s }), po = (c, i, s, o) => F(c, "camper_travel_journal/unlink_drive", i, { trip_id: s, drive_id: o }), fo = (c, i, s, o) => F(c, "camper_travel_journal/link_drives", i, { trip_id: s, drive_ids: o }), mo = (c, i, s) => F(c, "camper_travel_journal/create_manual_drive", i, s), go = (c, i, s, o) => F(c, "camper_travel_journal/update_manual_drive", i, { drive_id: s, ...o }), _o = (c, i, s) => F(c, "camper_travel_journal/delete_manual_drive", i, { drive_id: s }), vo = (c, i, s, o) => F(c, "camper_travel_journal/create_expense", i, { trip_id: s, ...o }), yo = (c, i, s, o) => F(c, "camper_travel_journal/update_expense", i, { expense_id: s, ...o }), is = (c, i, s, o) => F(c, "camper_travel_journal/create_stop", i, { trip_id: s, ...o }), bo = (c, i, s, o) => F(c, "camper_travel_journal/update_stop", i, { stop_id: s, ...o }), xo = (c, i, s) => F(c, "camper_travel_journal/delete_stop", i, { stop_id: s }), nn = (c, i, s, o, h, d) => F(c, "camper_travel_journal/assign_interruption", i, { trip_id: s, interruption_id: o, status: h, stop_id: d }), ns = (c, i, s, o, h) => F(c, "camper_travel_journal/create_stop_from_interruption", i, { trip_id: s, interruption_id: o, ...h }), wo = (c, i, s, o) => F(c, "camper_travel_journal/update_overnight", i, { place_id: s, ...o }), $o = (c, i, s, o) => F(c, "camper_travel_journal/update_rating", i, { place_id: s, ...o }), To = (c, i, s) => F(c, "camper_travel_journal/delete_rating", i, { place_id: s }), Po = (c, i, s) => F(c, "camper_travel_journal/generate_stop_suggestions", i, { trip_id: s }), Eo = (c, i, s, o, h, d) => F(c, "camper_travel_journal/accept_stop_suggestion", i, { suggestion_id: s, trip_id: o, name: h, place_type: d }), So = (c, i, s) => F(c, "camper_travel_journal/dismiss_stop_suggestion", i, { suggestion_id: s }), ko = (c, i, s) => F(c, "camper_travel_journal/delete_expense", i, { expense_id: s }), Do = (c, i, s) => F(c, "camper_travel_journal/export_pdf", i, { trip_id: s }), ai = async (c) => (await c.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], Lo = (c, i, s) => F(c, "camper_travel_journal/analyze_gpx", i, { content_base64: s }), Ao = (c, i, s, o, h, d) => F(c, "camper_travel_journal/import_gpx", i, { content_base64: s, file_hash: o, drive_keys: h, trip_id: d }), rn = "camper-travel-journal-expenses-changed", Le = "camper-travel-journal-data-changed";
function Gi(c) {
  window.dispatchEvent(new CustomEvent(rn, { detail: c }));
}
function Q(c) {
  window.dispatchEvent(new CustomEvent(Le, { detail: c }));
}
const xt = "camper-travel-journal-active-trip-changed";
function cn(c) {
  return `camper-travel-journal:${typeof window < "u" && window.location.pathname || "/"}:${c}`;
}
function oi(c) {
  if (!c || typeof window > "u") return "";
  try {
    return window.sessionStorage.getItem(cn(c)) ?? "";
  } catch {
    return "";
  }
}
function zt(c) {
  if (!(!c.vehicleId || !c.tripId || typeof window > "u")) {
    try {
      window.sessionStorage.setItem(cn(c.vehicleId), c.tripId);
    } catch {
    }
    window.dispatchEvent(new CustomEvent(xt, { detail: c }));
  }
}
function Zr(c, i = "journal") {
  if (!(!c || typeof window > "u")) {
    try {
      window.sessionStorage.removeItem(cn(c));
    } catch {
    }
    window.dispatchEvent(new CustomEvent(xt, { detail: { vehicleId: c, tripId: "", source: i } }));
  }
}
class rs extends Nt {
  snapshot;
  trips = [];
  selectedTripId = "";
  loading = !1;
  loadError = "";
  actionError = "";
  onDataChanged = (i) => {
    i.detail?.vehicleId === this.vehicleId && this.refresh();
  };
  onActiveTripChanged = (i) => {
    const s = i.detail;
    s?.vehicleId !== this.vehicleId || s.tripId === this.selectedTripId || (this.selectedTripId = s.tripId, this.refresh());
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(rn, this.onDataChanged), window.addEventListener(Le, this.onDataChanged), window.addEventListener(xt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(rn, this.onDataChanged), window.removeEventListener(Le, this.onDataChanged), window.removeEventListener(xt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(i) {
    const s = (o, h) => (h.started_at || "").localeCompare(o.started_at || "") || h.id.localeCompare(o.id);
    return i.filter((o) => o.status === "active").sort(s)[0] ?? [...i].sort(s)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const i = await Ot(this.hass, this.vehicleId);
      this.trips = i.trips;
      const s = oi(this.vehicleId), h = i.trips.find((f) => f.id === (s || this.selectedTripId)) ?? this.chooseDefaultTrip(i.trips);
      this.selectedTripId = h?.id ?? "", h && zt({ vehicleId: this.vehicleId, tripId: h.id, source: "summary" });
      const d = h ? await Ot(this.hass, this.vehicleId, h.id) : i;
      return this.snapshot = h ? { ...d, trips: [h] } : d, this.loadError = "", !0;
    } catch {
      return this.loadError = P(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(i) {
    const s = this.snapshot?.trips[0];
    if (!(!this.hass || !s))
      try {
        await es(this.hass, this.vehicleId, s.id, i), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = P(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(i) {
    !this.hass || this.loading || !this.trips.some((s) => s.id === i) || (this.selectedTripId = i, zt({ vehicleId: this.vehicleId, tripId: i, source: "summary" }), await this.refresh());
  }
  render() {
    const i = P(this.hass), s = this.snapshot?.trips[0], o = this.trips, h = (this.snapshot?.drives ?? []).reduce((y, k) => y + k.distance_m, 0) / 1e3, f = (this.snapshot?.stops ?? []).filter((y) => y.confirmed !== !1).filter((y) => ["campsite", "rv_site", "wild_camp", "overnight"].includes(y.place_kind || y.place_type || y.stop_type)).length, b = this.snapshot?.expense_summary, p = b?.mixed_currency ? i.mixedCurrency : b?.total_minor !== void 0 && b.currency ? bt(b.total_minor, b.currency, this.hass) : bt(0, "EUR", this.hass), _ = this.loadError || this.actionError, w = s ? Lt(s, this.hass) : "";
    return m`<ha-card><h2>${s?.title ?? i.title}</h2>${o.length ? m`<label class="trip-selector">${i.summaryChooseTrip}<select aria-label=${i.summaryTrip} @change=${(y) => {
      this.selectTrip(y.currentTarget.value);
    }} ?disabled=${this.loading}>${o.map((y) => m`<option value=${y.id} ?selected=${y.id === this.selectedTripId}>${y.title} · ${Gt(y.status, this.hass)} · ${Lt(y, this.hass)}</option>`)}</select></label>` : ""}${_ ? m`<p class="error" role="alert">${_}</p>` : s ? m`<p class="muted">${s.destination || i.noDestination} · ${Gt(s.status, this.hass)} · ${w}</p><div class="grid"><div class="metric"><span class="muted">${i.distance}</span><span class="value">${h.toFixed(1)} km</span></div><div class="metric"><span class="muted">${i.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${i.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${i.overnights ?? "Übernachtungsplätze"}</span><span class="value">${f}</span></div><div class="metric"><span class="muted">${i.costs}</span><span class="value">${p}</span></div></div><div class="actions">${s.status === "planned" ? m`<button @click=${() => this.setStatus("active")}>${i.start}</button>` : s.status === "paused" ? m`<button @click=${() => this.setStatus("active")}>${i.resume}</button>` : ""}${s.status === "active" ? m`<button class="secondary" @click=${() => this.setStatus("paused")}>${i.pause}</button><button @click=${() => this.setStatus("completed")}>${i.complete}</button>` : ""}</div>` : m`<p class="muted">${i.noTrip}</p>`}${this.loading ? m`<p class="muted">${i.loading}</p>` : ""}</ha-card>`;
  }
}
rs.styles = [Nt.styles, wt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px}.metric{min-width:0;min-height:3.7rem;padding:10px;border-radius:9px;background:var(--secondary-background-color);display:flex;flex-direction:column;justify-content:center}.metric .muted{min-width:0;overflow-wrap:anywhere;word-break:normal;line-height:1.2}.metric .value{margin-top:3px;white-space:nowrap}@media(max-width:420px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.metric{padding:8px;font-size:.9em}}`];
si("camper-travel-journal-summary-card", rs);
function ae(c) {
  const i = c.trim().replace(",", ".");
  if (!i) return null;
  const s = Number(i);
  return Number.isFinite(s) && s >= 0 ? s : null;
}
function Ki(c, i, s, o) {
  const h = { ...c, [i]: s };
  o.add(i);
  const d = ae(h.amount), f = ae(h.liters), b = ae(h.price);
  return d !== null && f !== null && f > 0 && !o.has("price") ? h.price = (d / f).toFixed(3) : d !== null && b !== null && b > 0 && !o.has("liters") ? h.liters = (d / b).toFixed(3) : f !== null && b !== null && f > 0 && b > 0 && !o.has("amount") && (h.amount = (Math.round(f * b * 100) / 100).toFixed(2)), h;
}
function Fr(c) {
  const i = ae(c.amount), s = ae(c.liters), o = ae(c.price);
  return {
    ...i === null ? {} : { amount_minor: Math.round(i * 100) },
    fuel_liters: s,
    fuel_price_per_liter: o
  };
}
class Rt extends Nt {
  editorKind = "";
  editorTripId = "";
  editorDirty = !1;
  discardPrompt = !1;
  tripSaving = !1;
  ratingSaving = !1;
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
  deletingTrip;
  confirmingExpenseId = "";
  amount = "";
  category = Je[0];
  expenseDate = "";
  expenseTime = "";
  expenseTimeEnabled = !1;
  activeTripId = "";
  selected = "";
  editingExpenseId = "";
  editingAmount = "";
  editingCategory = "other";
  expenseNote = "";
  editingExpenseNote = "";
  editingExpenseDate = "";
  editingExpenseTime = "";
  editingExpenseTimeEnabled = !1;
  expenseSavingId = "";
  fuel = { amount: "", liters: "", price: "" };
  editingFuel = { amount: "", liters: "", price: "" };
  fuelManual = /* @__PURE__ */ new Set();
  editingFuelManual = /* @__PURE__ */ new Set();
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
  placeWebsite = "";
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
  interruptionId = "";
  suggestionEditingId = "";
  suggestionName = "GPS-Stopp";
  suggestionType = "other";
  embeddedTripId() {
    return this.config.trip_id ?? "";
  }
  embeddedSection() {
    return this.config.journal_section ?? "all";
  }
  onActiveTripChanged = (i) => {
    const s = i.detail;
    s?.vehicleId !== this.vehicleId || s.tripId === this.activeTripId || (this.activeTripId = s.tripId, this.selected = "", this.refresh());
  };
  async refreshSuggestions(i) {
    if (this.hass)
      try {
        await Po(this.hass, this.vehicleId, i), await this.refreshAfterWrite();
      } catch {
        this.fail(P(this.hass).loadError);
      }
  }
  async acceptSuggestion(i, s) {
    if (this.hass) {
      if (this.suggestionEditingId !== i.id) {
        this.suggestionEditingId = i.id, this.suggestionName = "GPS-Stopp", this.suggestionType = "other", this.requestUpdate();
        return;
      }
      try {
        await Eo(this.hass, this.vehicleId, i.id, s, this.suggestionName, this.suggestionType), this.suggestionEditingId = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: s }));
      } catch {
        this.fail(P(this.hass).loadError);
      }
    }
  }
  async dismissSuggestion(i, s) {
    if (this.hass)
      try {
        await So(this.hass, this.vehicleId, i.id), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: s }));
      } catch {
        this.fail(P(this.hass).loadError);
      }
  }
  resetPlaceForm() {
    this.placeName = "", this.placeType = "other", this.placeArrived = "", this.placeDeparted = "", this.placeLatitude = "", this.placeLongitude = "", this.placeDescription = "", this.placeAddress = "", this.placeWebsite = "", this.editingPlaceId = "", this.interruptionDriveId = "", this.interruptionId = "";
  }
  nowLocalDateTime() {
    const i = /* @__PURE__ */ new Date(), s = (o) => String(o).padStart(2, "0");
    return `${i.getFullYear()}-${s(i.getMonth() + 1)}-${s(i.getDate())}T${s(i.getHours())}:${s(i.getMinutes())}`;
  }
  todayLocalDate() {
    return this.nowLocalDateTime().slice(0, 10);
  }
  openEditor(i, s) {
    this.editorKind = i, this.editorTripId = s, this.editorDirty = !1, this.discardPrompt = !1, this.actionError = "", this.requestUpdate();
  }
  markEditorDirty() {
    this.editorDirty = !0, this.discardPrompt = !1;
  }
  closeEditor(i = !1) {
    if (!i && this.editorDirty) {
      this.discardPrompt = !0, this.requestUpdate();
      return;
    }
    this.editorKind = "", this.editorTripId = "", this.editorDirty = !1, this.discardPrompt = !1, this.actionError = "", this.requestUpdate();
  }
  async onEditorUpdated() {
    const i = this.renderRoot.querySelector("dialog.editor-dialog");
    i && !i.open && i.showModal();
  }
  updated() {
    this.onEditorUpdated(), this.syncTripDeleteDialog();
  }
  syncTripDeleteDialog() {
    const i = this.renderRoot.querySelector("dialog.trip-delete-dialog");
    i && (this.deletingTrip && !i.open && i.showModal(), !this.deletingTrip && i.open && i.close());
  }
  placePayload() {
    const i = (s) => s.trim() ? Number(s.replace(",", ".")) : void 0;
    return { name: this.placeName.trim(), place_type: this.placeType, category: this.placeType, drive_id: this.interruptionDriveId || void 0, occurred_at: new Date(this.placeArrived).toISOString(), arrived_at: new Date(this.placeArrived).toISOString(), departed_at: this.placeDeparted ? new Date(this.placeDeparted).toISOString() : void 0, latitude: i(this.placeLatitude), longitude: i(this.placeLongitude), address: this.placeAddress, description: this.placeDescription };
  }
  editPlace(i) {
    this.editingPlaceId = i.id, this.placeName = i.name, this.placeType = i.place_type || i.stop_type, this.placeArrived = i.arrived_at ? this.placeLocalDateTime(i.arrived_at) : this.placeLocalDateTime(i.occurred_at), this.placeDeparted = i.departed_at ? this.placeLocalDateTime(i.departed_at) : "", this.placeLatitude = i.latitude == null ? "" : String(i.latitude), this.placeLongitude = i.longitude == null ? "" : String(i.longitude), this.placeDescription = i.description || "", this.placeAddress = i.address || "", this.placeWebsite = i.website_url || "", this.openEditor("place-edit", this.activeTripId);
  }
  placeLocalDateTime(i) {
    const s = new Date(i), o = (h) => String(h).padStart(2, "0");
    return `${s.getFullYear()}-${o(s.getMonth() + 1)}-${o(s.getDate())}T${o(s.getHours())}:${o(s.getMinutes())}`;
  }
  async assignExistingInterruption(i, s = i.existing_place_id || "") {
    if (!(!this.hass || !s || this.placeSaving)) {
      this.placeSaving = !0;
      try {
        const o = (this.snapshot?.stops ?? []).find((b) => b.id === s), h = o?.place_kind || o?.place_type || o?.stop_type, d = i.existing_places?.find((b) => b.id === s), f = d?.place_kind || d?.place_type || d?.stop_type;
        await nn(this.hass, this.vehicleId, this.activeTripId, i.id, ["campsite", "rv_site", "wild_camp", "overnight"].includes(h || f || "") ? "overnight" : "stop", s), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: this.activeTripId }));
      } catch {
        this.fail(P(this.hass).placeSaveError ?? P(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  startInterruption(i) {
    this.editingPlaceId = "", this.interruptionId = i.id, this.interruptionDriveId = i.previous_drive_id, this.placeName = "", this.placeType = "other", this.placeArrived = this.placeLocalDateTime(i.started_at), this.placeDeparted = this.placeLocalDateTime(i.ended_at);
    const s = i.previous_end_point;
    this.placeLatitude = s ? String(s.latitude) : "", this.placeLongitude = s ? String(s.longitude) : "", this.placeDescription = "", this.placeAddress = "", this.placeWebsite = "", this.selected = this.activeTripId, this.openEditor("place-create", this.activeTripId);
  }
  async savePlace(i) {
    if (!this.hass || this.placeSaving || !this.placeName.trim() || !this.placeArrived) return this.fail(P(this.hass).placeSaveError ?? P(this.hass).dateInvalid);
    this.placeSaving = !0;
    try {
      const s = this.placePayload();
      let o = this.editingPlaceId;
      o ? await bo(this.hass, this.vehicleId, o, s) : this.interruptionId ? o = (await ns(this.hass, this.vehicleId, i, this.interruptionId, { name: this.placeName.trim(), place_type: this.placeType, overnight: ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType), address: this.placeAddress.trim(), description: this.placeDescription.trim(), website_url: this.placeWebsite.trim() || void 0 })).stop_id : o = (await is(this.hass, this.vehicleId, i, s)).stop_id, !this.interruptionId && ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType) && await wo(this.hass, this.vehicleId, o, { place_kind: this.placeType, website_url: this.placeWebsite }), this.resetPlaceForm(), this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(P(this.hass).placeSaveError ?? P(this.hass).loadError);
    } finally {
      this.placeSaving = !1, this.requestUpdate();
    }
  }
  async removePlace(i, s) {
    if (!(!this.hass || this.placeSaving)) {
      if (this.confirmingPlaceId !== i.id) {
        this.confirmingPlaceId = i.id, this.requestUpdate();
        return;
      }
      this.placeSaving = !0;
      try {
        await xo(this.hass, this.vehicleId, i.id), this.confirmingPlaceId = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: s }));
      } catch {
        this.fail(P(this.hass).placeDeleteError ?? P(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  async saveRating(i, s) {
    if (!this.hass || this.ratingSaving) return;
    const o = [this.ratingOverall, this.ratingAccess, this.ratingSpace, this.ratingFacilities, this.ratingSurroundings];
    if (!this.ratingOverall || o.slice(1).some((h) => h && (!/^\d$/.test(h) || Number(h) < 1 || Number(h) > 5))) return this.fail(P(this.hass).ratingInvalid ?? P(this.hass).dateInvalid);
    this.ratingSaving = !0;
    try {
      await $o(this.hass, this.vehicleId, i, { overall: Number(this.ratingOverall), large_rv_access: this.ratingAccess ? Number(this.ratingAccess) : void 0, space_maneuvering: this.ratingSpace ? Number(this.ratingSpace) : void 0, facilities: this.ratingFacilities ? Number(this.ratingFacilities) : void 0, surroundings: this.ratingSurroundings ? Number(this.ratingSurroundings) : void 0, review_text: this.ratingText }), this.ratingPlaceId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: s }));
    } catch {
      this.fail(P(this.hass).ratingSaveError ?? P(this.hass).loadError);
    } finally {
      this.ratingSaving = !1, this.requestUpdate();
    }
  }
  async removeRating(i, s) {
    if (!(!this.hass || this.ratingSaving)) {
      this.ratingSaving = !0;
      try {
        await To(this.hass, this.vehicleId, i), this.ratingPlaceId = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: s }));
      } catch {
        this.fail(P(this.hass).ratingSaveError ?? P(this.hass).loadError);
      } finally {
        this.ratingSaving = !1, this.requestUpdate();
      }
    }
  }
  startRating(i) {
    this.ratingPlaceId = i.id, this.ratingOverall = i.rating_overall ? String(i.rating_overall) : "", this.ratingAccess = i.large_rv_access ? String(i.large_rv_access) : "", this.ratingSpace = i.space_maneuvering ? String(i.space_maneuvering) : "", this.ratingFacilities = i.facilities ? String(i.facilities) : "", this.ratingSurroundings = i.surroundings ? String(i.surroundings) : "", this.ratingText = i.review_text || "", this.openEditor("rating-edit", this.activeTripId);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(xt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(xt, this.onActiveTripChanged), super.disconnectedCallback();
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
      const i = this.embeddedTripId() || oi(this.vehicleId);
      this.activeTripId || (this.activeTripId = i);
      let s = await Ot(this.hass, this.vehicleId, this.activeTripId || void 0);
      const o = s.trips.find((h) => h.id === this.activeTripId) ?? s.trips.find((h) => h.status === "active") ?? s.trips[0];
      o && this.activeTripId !== o.id ? (this.activeTripId = o.id, this.embeddedTripId() || zt({ vehicleId: this.vehicleId, tripId: this.activeTripId, source: "manager" }), s = await Ot(this.hass, this.vehicleId, this.activeTripId)) : o && !this.embeddedTripId() && zt({ vehicleId: this.vehicleId, tripId: o.id, source: "manager" }), this.snapshot = s;
      try {
        const h = await ai(this.hass);
        this.vehicleName = h.find((d) => d.vehicle_id === this.vehicleId)?.name || "";
      } catch {
        this.vehicleName = "";
      }
      return this.loadError = "", this.actionError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = P(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(i) {
    this.actionError = i, this.requestUpdate();
  }
  async refreshAfterWrite(i) {
    return await this.refresh() ? (i?.(), !0) : (this.actionError = P(this.hass).savedRefreshError, this.requestUpdate(), !1);
  }
  async readGPX(i) {
    const s = i.currentTarget.files?.[0];
    if (!(!s || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = s.name;
      try {
        const o = new Uint8Array(await s.arrayBuffer());
        let h = "";
        o.forEach((d) => {
          h += String.fromCharCode(d);
        }), this.gpxContent = btoa(h), this.gpxPreview = await Lo(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((d) => d.key)), this.gpxTripId = this.activeTripId;
      } catch {
        this.gpxError = P(this.hass).gpxAnalyzeError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  async confirmGPX() {
    if (!(!this.hass || !this.gpxPreview || this.gpxBusy || this.gpxPreview.conflicts.duplicate_file)) {
      this.gpxBusy = !0, this.gpxError = "";
      try {
        const i = this.gpxTripId || void 0;
        await Ao(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], i), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i ?? "" }));
      } catch {
        this.gpxError = P(this.hass).gpxImportError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  setExpenseAmount(i) {
    this.amount = i, this.fuel = Ki(this.fuel, "amount", i, this.fuelManual), this.requestUpdate();
  }
  setEditingExpenseAmount(i) {
    this.editingAmount = i, this.requestUpdate();
  }
  setExpenseCategory(i) {
    if (!oo(i)) return this.fail(P(this.hass).categoryInvalid);
    this.category = i, i !== "fuel" && (this.fuel = { amount: this.amount, liters: "", price: "" }), this.requestUpdate();
  }
  setEditingExpenseCategory(i) {
    if (!i.trim()) return this.fail(P(this.hass).categoryInvalid);
    this.editingCategory = i, i !== "fuel" && (this.editingFuel = { amount: this.editingAmount, liters: "", price: "" }), this.requestUpdate();
  }
  setFuel(i, s, o) {
    o ? this.editingFuel = Ki(this.editingFuel, i, s, this.editingFuelManual) : (this.fuel = Ki(this.fuel, i, s, this.fuelManual), this.amount = this.fuel.amount), this.markEditorDirty();
  }
  gpxPeriod() {
    const i = (this.gpxPreview?.points ?? []).map((s) => s.recorded_at).sort();
    return i.length ? { start: i[0], end: i[i.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((i) => this.gpxSelected.has(i.key)).reduce((i, s) => i + s.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(i) {
    const s = this.gpxPeriod();
    if (!s || !i || !i.start_date && !i.end_date) return !1;
    const o = s.start.slice(0, 10), h = s.end.slice(0, 10);
    return !!(i.start_date && o < i.start_date || i.end_date && h > i.end_date);
  }
  async addTrip() {
    if (this.hass) {
      if (!this.tripTitle.trim()) return this.fail(P(this.hass).tripCreateError);
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(P(this.hass).dateInvalid);
      if (!this.tripSaving) {
        this.tripSaving = !0, this.requestUpdate();
        try {
          const s = (await ho(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination)).trip_id;
          this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", this.closeEditor(!0), await this.refreshAfterWrite(() => {
            Q({ vehicleId: this.vehicleId, tripId: s ?? this.activeTripId }), this.dispatchEvent(new CustomEvent("trip-created", { detail: { tripId: s }, bubbles: !0, composed: !0 }));
          });
        } catch {
          this.fail(P(this.hass).tripCreateError);
        } finally {
          this.tripSaving = !1, this.requestUpdate();
        }
      }
    }
  }
  startTripCreate() {
    this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", this.openEditor("trip-create", this.activeTripId);
  }
  openTripCreate() {
    this.startTripCreate();
  }
  startTripEdit(i) {
    this.editingTripId = i.id, this.editingTripTitle = i.title, this.editingDestination = i.destination || "", this.editingStartDate = i.start_date || "", this.editingEndDate = i.end_date || "", this.openEditor("trip-edit", i.id);
  }
  cancelTripEdit() {
    this.editingTripId = "", this.closeEditor();
  }
  async saveTrip(i) {
    if (!this.hass || this.tripSaving || !this.editingTripTitle.trim()) return this.fail(P(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(P(this.hass).dateInvalid);
    this.tripSaving = !0, this.requestUpdate();
    try {
      await co(this.hass, this.vehicleId, i.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i.id }));
    } catch {
      this.fail(P(this.hass).tripEditError);
    } finally {
      this.tripSaving = !1, this.requestUpdate();
    }
  }
  removeTrip(i) {
    const s = this.snapshot?.trips.find((o) => o.id === i);
    s && (this.deletingTrip = s, this.requestUpdate());
  }
  cancelTripDelete() {
    this.deletingTrip = void 0, this.requestUpdate();
  }
  async confirmTripDelete() {
    if (!this.hass || !this.deletingTrip) return;
    const i = this.deletingTrip.id;
    try {
      await uo(this.hass, this.vehicleId, i), this.deletingTrip = void 0, this.selected === i && (this.selected = ""), this.activeTripId === i && (this.activeTripId = ""), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(P(this.hass).tripDeleteError);
    }
  }
  async changeStatus(i, s) {
    if (this.hass)
      try {
        await es(this.hass, this.vehicleId, i, s), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(P(this.hass).statusError);
      }
  }
  switchTrip() {
    this.dispatchEvent(new CustomEvent("trip-switch", { bubbles: !0, composed: !0 }));
  }
  renderTripActions(i, s) {
    return m`<section class="trip-actions" aria-label=${i.tripActions ?? "Reiseaktionen"}><div class="trip-actions-grid">
      ${s.status === "planned" ? m`<button type="button" class="trip-action trip-action-primary" data-trip-action="start" @click=${() => this.changeStatus(s.id, "active")}>${i.start}</button>` : ""}
      ${s.status === "active" ? m`<button type="button" class="trip-action trip-action-secondary" data-trip-action="pause" @click=${() => this.changeStatus(s.id, "paused")}>${i.pause}</button><button type="button" class="trip-action trip-action-secondary" data-trip-action="complete" @click=${() => this.changeStatus(s.id, "completed")}>${i.complete}</button>` : ""}
      ${s.status === "paused" ? m`<button type="button" class="trip-action trip-action-primary" data-trip-action="resume" @click=${() => this.changeStatus(s.id, "active")}>${i.resume}</button><button type="button" class="trip-action trip-action-secondary" data-trip-action="complete" @click=${() => this.changeStatus(s.id, "completed")}>${i.complete}</button>` : ""}
      ${s.status === "completed" ? m`<button type="button" class="trip-action trip-action-primary" data-trip-action="reactivate" @click=${() => this.changeStatus(s.id, "active")}>${i.tripReactivate ?? i.resume}</button>` : ""}
      <button type="button" class="trip-action trip-action-secondary" data-trip-action="edit" @click=${() => this.startTripEdit(s)}>${i.edit}</button>
      <button type="button" class="trip-action trip-action-secondary" data-trip-action="switch" @click=${() => this.switchTrip()}>${i.journalClose ?? "Reise wechseln"}</button>
    </div><div class="trip-delete-action"><button type="button" class="trip-action danger" data-trip-action="delete" @click=${() => this.removeTrip(s.id)}>${i.remove}</button></div></section>${this.renderTripDeleteDialog(i)}`;
  }
  renderTripDeleteDialog(i) {
    return this.deletingTrip ? m`<dialog class="trip-delete-dialog" aria-labelledby="trip-delete-title" @cancel=${(s) => {
      s.preventDefault(), this.cancelTripDelete();
    }}><form method="dialog" @submit=${(s) => {
      s.preventDefault(), this.confirmTripDelete();
    }}><h3 id="trip-delete-title">${i.tripDeleteTitle ?? "Reise löschen?"}</h3><p>${i.tripDeleteConfirm ?? "Die Reise wird gelöscht."}</p><ul><li>${i.tripDeleteDrives ?? "Zugeordnete Fahrten bleiben erhalten."}</li><li>${i.tripDeleteLinkedData ?? "Kosten und Orte bleiben erhalten, verlieren aber ihre Reisezuordnung."}</li></ul><div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.cancelTripDelete()}>${i.cancel}</button><button type="submit" class="danger">${i.remove}</button></div></form></dialog>` : "";
  }
  async assignDrive(i, s) {
    if (this.hass)
      try {
        await fo(this.hass, this.vehicleId, i, [s]), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(P(this.hass).driveAssignError);
      }
  }
  async unassignDrive(i, s) {
    if (this.hass)
      try {
        await po(this.hass, this.vehicleId, i, s), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(P(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(i) {
    this.selected = this.selected === i ? "" : i, this.selected ? (this.activeTripId = i, zt({ vehicleId: this.vehicleId, tripId: i, source: "manager" }), this.refresh()) : this.requestUpdate();
  }
  async addManualDrive(i) {
    if (!this.hass || this.manualSaving) return;
    const s = Number(this.manualDistanceKm.replace(",", ".")), o = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(s) || s < 0 || o !== void 0 && (!Number.isInteger(o) || o < 0)) return this.fail(P(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await mo(this.hass, this.vehicleId, { trip_id: i, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: s, ...o === void 0 ? {} : { duration_minutes: o } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(P(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(i) {
    const s = new Date(i), o = (h) => String(h).padStart(2, "0");
    return `${s.getFullYear()}-${o(s.getMonth() + 1)}-${o(s.getDate())}T${o(s.getHours())}:${o(s.getMinutes())}`;
  }
  startManualDriveCreate(i) {
    this.manualOccurredAt = this.nowLocalDateTime(), this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", this.openEditor("drive-create", i);
  }
  startManualDriveEdit(i) {
    this.editingDriveId = i.id, this.editingDriveOccurredAt = this.localDateTime(i.started_at), this.editingDriveStartLocation = i.start_label || "", this.editingDriveEndLocation = i.end_label || "", this.editingDriveDistanceKm = (i.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = i.duration_seconds ? String(Math.round(i.duration_seconds / 60)) : "", this.openEditor("drive-edit", i.trip_id || this.activeTripId);
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.closeEditor();
  }
  async saveManualDrive(i, s) {
    if (!this.hass || this.driveSavingId) return;
    const o = Number(this.editingDriveDistanceKm.replace(",", ".")), h = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(o) || o < 0 || h !== void 0 && (!Number.isInteger(h) || h < 0)) return this.fail(P(this.hass).dateInvalid);
    this.driveSavingId = i.id;
    try {
      await go(this.hass, this.vehicleId, i.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: o, ...h === void 0 ? {} : { duration_minutes: h } }), this.actionError = "", this.editingDriveId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: s }));
    } catch {
      this.fail(P(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(i, s) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== s) {
        this.confirmingDriveId = s, this.requestUpdate();
        return;
      }
      this.driveSavingId = s;
      try {
        await _o(this.hass, this.vehicleId, s), this.confirmingDriveId = "", this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(P(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(i) {
    if (!this.hass || this.expenseSavingId) return;
    const s = P(this.hass), o = this.category === "fuel" ? Fr(this.fuel) : { amount_minor: Br(this.amount) };
    if (o.amount_minor === void 0) return this.fail(s.amountInvalid);
    const h = this.expenseDate || this.todayLocalDate();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(h)) return this.fail(s.dateInvalid);
    this.expenseSavingId = "__create__";
    try {
      await vo(this.hass, this.vehicleId, i, { occurred_on: h, ...this.expenseTimeEnabled && this.expenseTime ? { occurred_time: this.expenseTime } : {}, category: this.category, currency: "EUR", note: this.expenseNote.trim() || void 0, ...o }), this.actionError = "", this.amount = "", this.expenseNote = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Gi({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(s.expenseCreateError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  startExpenseCreate(i) {
    this.amount = "", this.expenseNote = "", this.fuel = { amount: "", liters: "", price: "" }, this.fuelManual = /* @__PURE__ */ new Set(), this.category = Je[0], this.expenseDate = this.todayLocalDate(), this.expenseTime = "", this.expenseTimeEnabled = !1, this.openEditor("expense-create", i);
  }
  startExpenseEdit(i) {
    this.editingExpenseId = i.id, this.editingAmount = (i.amount_minor / 100).toFixed(2), this.editingCategory = ro(i.category), this.editingExpenseNote = i.note ?? "", this.editingFuel = { amount: this.editingAmount, liters: i.fuel_liters == null ? "" : String(i.fuel_liters), price: i.fuel_price_per_liter == null ? "" : String(i.fuel_price_per_liter) }, this.editingFuelManual = /* @__PURE__ */ new Set(["amount", ...i.fuel_liters == null ? [] : ["liters"], ...i.fuel_price_per_liter == null ? [] : ["price"]]), this.editingExpenseDate = i.occurred_on ?? "", this.editingExpenseTime = i.occurred_time ?? "", this.editingExpenseTimeEnabled = !!i.occurred_time, this.openEditor("expense-edit", i.trip_id ?? this.activeTripId);
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.editingExpenseNote = "", this.editingExpenseDate = "", this.editingExpenseTime = "", this.editingExpenseTimeEnabled = !1, this.closeEditor();
  }
  async saveExpense(i) {
    if (!this.hass || this.expenseSavingId) return;
    const s = P(this.hass), o = this.editingCategory === "fuel" ? Fr(this.editingFuel) : { amount_minor: Br(this.editingAmount) };
    if (o.amount_minor === void 0) return this.fail(s.amountInvalid);
    if (!this.editingCategory.trim()) return this.fail(s.categoryInvalid);
    if (this.editingExpenseDate && !/^\d{4}-\d{2}-\d{2}$/.test(this.editingExpenseDate)) return this.fail(s.dateInvalid);
    this.expenseSavingId = i.id;
    try {
      await yo(this.hass, this.vehicleId, i.id, { category: this.editingCategory, note: this.editingExpenseNote.trim() || null, ...this.editingExpenseDate ? { occurred_on: this.editingExpenseDate } : {}, occurred_time: this.editingExpenseTimeEnabled && this.editingExpenseTime ? this.editingExpenseTime : null, ...o }), this.actionError = "", this.editingExpenseId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Gi({ vehicleId: this.vehicleId, tripId: i.trip_id ?? this.activeTripId }));
    } catch {
      this.fail(s.expenseEditError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  async removeExpense(i) {
    if (!(!this.hass || this.expenseSavingId)) {
      if (this.confirmingExpenseId !== i) {
        this.confirmingExpenseId = i, this.requestUpdate();
        return;
      }
      this.expenseSavingId = i;
      try {
        await ko(this.hass, this.vehicleId, i), this.confirmingExpenseId = "", this.actionError = "", await this.refreshAfterWrite(() => Gi({ vehicleId: this.vehicleId, tripId: this.activeTripId }));
      } catch {
        this.fail(P(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(i) {
    const s = [...Je];
    return i && !s.includes(i) && s.unshift(i), s;
  }
  async downloadPdf(i) {
    if (!(!this.hass || this.pdfBusyTripId)) {
      this.pdfBusyTripId = i.id, this.actionError = "", this.requestUpdate();
      try {
        const s = await Do(this.hass, this.vehicleId, i.id), o = atob(s.pdf_base64), h = Uint8Array.from(o, (b) => b.charCodeAt(0)), d = URL.createObjectURL(new Blob([h], { type: s.content_type })), f = document.createElement("a");
        f.href = d, f.download = s.filename, f.click(), window.setTimeout(() => URL.revokeObjectURL(d), 1e3);
      } catch {
        this.fail(P(this.hass).pdfExportError);
      } finally {
        this.pdfBusyTripId = "", this.requestUpdate();
      }
    }
  }
  renderExpense(i, s) {
    const o = i.occurred_on ? `${se(i.occurred_on, this.hass)}${i.occurred_time ? ` ${i.occurred_time}` : ""}` : s.expenseDateUnknown ?? "Ausgabendatum unbekannt";
    return m`<div class="expense-row"><div class="expense-info"><span class="expense-date">${o}</span><strong>${ji(i.category, this.hass)}</strong><span class="expense-amount">${bt(i.amount_minor, i.currency, this.hass)}</span>${i.category === "fuel" && (i.fuel_liters != null || i.fuel_price_per_liter != null) ? m`<span class="fuel-details">${i.fuel_liters == null ? "" : `${i.fuel_liters.toFixed(3)} l`}${i.fuel_liters != null && i.fuel_price_per_liter != null ? " · " : ""}${i.fuel_price_per_liter == null ? "" : `${i.fuel_price_per_liter.toFixed(3)} €/l`}</span>` : ""}${i.note ? m`<span class="expense-note">${i.note}</span>` : ""}</div><span class="actions expense-actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(i)} ?disabled=${!!this.expenseSavingId}>${s.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(i.id)}>${this.confirmingExpenseId === i.id ? s.confirmDelete : s.remove}</button></span></div>`;
  }
  renderDrive(i, s, o) {
    const h = i.source === "manual" ? o.sourceManual : i.source === "gpx" ? o.sourceGpx ?? o.sourceGps : o.sourceGps, d = `${o.driveStart}: ${j(i.started_at, this.hass)} · ${o.driveEnd}: ${i.ended_at ? j(i.ended_at, this.hass) : "–"}`, f = i.trip_id === s ? m`<button type="button" class="link" @click=${() => this.unassignDrive(s, i.id)}>${o.unassign}</button>` : m`<button type="button" class="link" @click=${() => this.assignDrive(s, i.id)}>${o.assign}</button>`, b = i.source === "manual" ? m`<button type="button" class="link" @click=${() => this.startManualDriveEdit(i)} ?disabled=${!!this.driveSavingId}>${o.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(s, i.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === i.id ? o.confirmDelete : o.remove}</button>` : "";
    return m`<div class="drive-row"><div><strong>${h}</strong> · ${d}${i.start_label || i.end_label ? m`<br><span class="muted">${i.start_label || "–"} → ${i.end_label || "–"}</span>` : ""}<br><span class="muted">${(i.distance_m / 1e3).toFixed(1)} km · ${i.duration_seconds ? Dt(i.duration_seconds, this.hass) : "–"} · ${i.assignment_status === "assigned" ? o.assignedDrives : o.freeDrives}</span></div><span class="actions">${b}${f}</span></div>`;
  }
  renderInterruptions(i, s) {
    const o = (this.snapshot?.interruptions ?? []).filter((h) => h.status === "unassigned");
    return m`<section class="place-section"><details open><summary><strong>${i.unassignedInterruptions ?? "Nicht zugeordnete Fahrtunterbrechungen"}</strong><span>${o.length}</span></summary>${o.length ? o.map((h) => m`<article class="interruption-row"><div class="interruption-copy"><strong>${j(h.started_at, this.hass)} → ${j(h.ended_at, this.hass)}</strong><span class="muted">${Dt(h.duration_seconds, this.hass)} · ${i.interruptionUnconfirmed ?? "Nicht als Aufenthalt nachgewiesen"}</span>${h.existing_places?.length ? m`<span class="candidate-label">Vorhandener Aufenthalt: ${h.existing_places.map((d) => d.name).join(", ")}</span>` : ""}</div><div class="actions compact-actions">${h.existing_places?.map((d) => m`<button type="button" class="link" @click=${() => {
      this.assignExistingInterruption(h, d.id);
    }} ?disabled=${this.placeSaving}>${i.assign ?? "Zuordnen"}: ${d.name}</button>`)}<button type="button" @click=${() => this.startInterruption(h)}>${i.recordInterruption ?? "Neuen Aufenthalt erfassen"}</button></div></article>`) : m`<p class="muted">${i.noPlaces ?? "Keine Unterbrechungen zwischen Fahrten."}</p>`}</details></section>`;
  }
  renderGpx(i, s, o) {
    const h = !!this.embeddedTripId(), d = s.find((p) => p.id === this.gpxTripId), f = this.gpxPeriod(), b = this.gpxTripPeriodWarning(d);
    return m`<section class="gpx-import gpx-explicit"><h3>${i.gpxImport}</h3><p class="muted"><strong>${h ? i.gpxTargetTrip ?? "Reise" : i.gpxVehicle}:</strong> ${h ? d?.title || "" : this.vehicleName || i.editorVehicle}</p>${h ? "" : m`<label>${i.gpxTargetTrip}<select aria-label=${i.gpxTargetTrip} .value=${this.gpxTripId} @change=${(p) => {
      this.gpxTripId = p.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.gpxNoTrip}</option>${s.map((p) => m`<option value=${p.id}>${p.title} · ${Gt(p.status, this.hass)} · ${Lt(p, this.hass) || i.period}</option>`)}</select></label>`}<input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(p) => this.readGPX(p)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || i.gpxPrivacy}</p>${this.gpxError ? m`<p class="error" role="alert">${this.gpxError}</p>` : ""}${o ? m`<div class="gpx-preview"><strong>${o.drives.length} ${i.gpxSections}, ${o.points.length} ${i.gpxPoints}</strong>${f ? m`<p class="muted">${i.gpxPeriod}: ${j(f.start, this.hass)} – ${j(f.end, this.hass)}</p>` : ""}${b ? m`<p class="warning" role="alert">${i.gpxPeriodWarning}</p>` : ""}<h3>${i.gpxSummary}</h3><p class="muted">${o.points.length} ${i.gpxPoints}, ${this.gpxSelected.size} ${i.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${i.gpxDistance}, ${d?.title || i.gpxNoTrip}</p><div class="gpx-drive-list">${o.drives.map((p) => m`<label><input type="checkbox" .checked=${this.gpxSelected.has(p.key)} @change=${(_) => {
      _.currentTarget.checked ? this.gpxSelected.add(p.key) : this.gpxSelected.delete(p.key), this.requestUpdate();
    }}> ${j(p.started_at, this.hass)} – ${j(p.ended_at, this.hass)} · ${(p.distance_m / 1e3).toFixed(1)} km · ${Dt(p.duration_seconds, this.hass)}</label>`)}</div>${o.warnings.length ? m`<p class="muted">${i.gpxWarnings}: ${o.warnings.map((p) => p === "gpx_gap_possible_drive_boundary" ? i.gpxGapBoundary : p).join(", ")}</p>` : ""}${o.conflicts.duplicate_file ? m`<p class="error" role="alert">${i.gpxDuplicate}</p>` : m`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? i.saving : i.gpxConfirm}</button>`}</div>` : ""}</section>`;
  }
  renderPdfExport(i, s) {
    if (!s.length) return "";
    const o = s.some((d) => d.id === this.activeTripId) ? this.activeTripId : s[0].id, h = s.find((d) => d.id === o) ?? s[0];
    return m`<section class="pdf-export"><h3>${i.pdfExportTitle}</h3><p class="muted">${h.title} · ${Lt(h, this.hass)}</p><div class="pdf-export-row"><button type="button" @click=${() => {
      this.downloadPdf(h);
    }} ?disabled=${!!this.pdfBusyTripId}>${this.pdfBusyTripId ? i.pdfExporting : i.pdfExport}</button></div></section>`;
  }
  renderSuggestions(i, s) {
    const o = this.snapshot?.stop_suggestions ?? [];
    return m`<section class="place-section"><h3>${i.gpsSuggestions ?? "GPS-Stoppvorschläge"}</h3><button type="button" @click=${() => {
      this.refreshSuggestions(s);
    }}>${i.generateSuggestions ?? "Vorschläge aktualisieren"}</button>${o.length ? m`<ul>${o.map((h) => m`<li>${j(h.arrived_at, this.hass)} – ${j(h.departed_at || h.arrived_at, this.hass)}${this.suggestionEditingId === h.id ? m`<div class="form-grid"><input aria-label=${i.placeName ?? "Name"} .value=${this.suggestionName} @input=${(d) => this.suggestionName = d.currentTarget.value}><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.suggestionType} @change=${(d) => this.suggestionType = d.currentTarget.value}><option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option></select></div>` : ""} <button type="button" @click=${() => {
      this.acceptSuggestion(h, s);
    }}>${this.suggestionEditingId === h.id ? i.save ?? "Speichern" : i.accept ?? "Übernehmen"}</button><button type="button" class="secondary" @click=${() => {
      this.dismissSuggestion(h, s);
    }}>${i.dismiss ?? "Verwerfen"}</button></li>`)}</ul>` : m`<p class="muted">${i.noSuggestions ?? "Keine offenen Vorschläge."}</p>`}</section>`;
  }
  starPicker(i, s, o) {
    return m`<fieldset class="star-picker"><legend>${i}</legend><div role="radiogroup" aria-label=${i}>${[1, 2, 3, 4, 5].map((h) => m`<button type="button" class="star-button" role="radio" aria-label=${`${h}/5`} aria-checked=${s === String(h)} ?data-selected=${s === String(h)} @click=${() => {
      o(String(h)), this.requestUpdate();
    }} @keydown=${(d) => {
      (d.key === "ArrowRight" || d.key === "ArrowUp") && (d.preventDefault(), o(String(Math.min(5, h + 1))), this.requestUpdate()), (d.key === "ArrowLeft" || d.key === "ArrowDown") && (d.preventDefault(), o(String(Math.max(1, h - 1))), this.requestUpdate());
    }}>${s && Number(s) >= h ? "★" : "☆"}</button>`)}</div></fieldset>`;
  }
  renderPlacesLegacy(i, s) {
    const o = this.snapshot?.stops ?? [], h = m`<option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option>`;
    return m`<section class="place-section"><details open><summary><strong>${i.places ?? "Orte und Zwischenstopps"}</strong><span>${o.length}</span></summary><form class="form-grid" @submit=${(d) => {
      d.preventDefault(), this.savePlace(s);
    }}><input aria-label=${i.placeName ?? "Name"} placeholder=${i.placeName ?? "Name"} .value=${this.placeName} @input=${(d) => this.placeName = d.currentTarget.value} required><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.placeType} @change=${(d) => this.placeType = d.currentTarget.value}>${h}</select><label>${i.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.placeArrived} @input=${(d) => this.placeArrived = d.currentTarget.value} required></label><label>${i.placeDeparted ?? "Abfahrt"}<input type="datetime-local" .value=${this.placeDeparted} @input=${(d) => this.placeDeparted = d.currentTarget.value}></label><input aria-label=${i.placeAddress ?? "Adresse"} placeholder=${i.placeAddress ?? "Adresse"} .value=${this.placeAddress} @input=${(d) => this.placeAddress = d.currentTarget.value}><input aria-label=${i.placeWebsite ?? "Webseite"} type="url" placeholder=${i.placeWebsite ?? "Webseite (optional)"} .value=${this.placeWebsite} @input=${(d) => this.placeWebsite = d.currentTarget.value}><input aria-label="Latitude" inputmode="decimal" placeholder="Latitude" .value=${this.placeLatitude} @input=${(d) => this.placeLatitude = d.currentTarget.value}><input aria-label="Longitude" inputmode="decimal" placeholder="Longitude" .value=${this.placeLongitude} @input=${(d) => this.placeLongitude = d.currentTarget.value}><textarea aria-label=${i.placeDescription ?? "Notizen"} placeholder=${i.placeDescription ?? "Beschreibung und Notizen"} .value=${this.placeDescription} @input=${(d) => this.placeDescription = d.currentTarget.value}></textarea><div class="actions"><button type="submit" ?disabled=${this.placeSaving}>${this.placeSaving ? i.saving : this.editingPlaceId ? i.save : i.create ?? "Anlegen"}</button>${this.editingPlaceId ? m`<button type="button" class="secondary" @click=${() => this.resetPlaceForm()}>${i.cancel}</button>` : ""}</div></form>${o.length ? m`<div class="place-list">${o.map((d) => m`<article class="place-row"><div><strong>${d.name}</strong><span class="muted">${d.place_type || d.stop_type} · ${j(d.arrived_at || d.occurred_at, this.hass)}${d.duration_seconds ? ` · ${Dt(d.duration_seconds, this.hass)}` : ""}${d.rating_overall ? ` · ${d.rating_overall}/5` : ""}</span><span>${d.description || ""}</span>${d.website_url ? m`<a href=${d.website_url} target="_blank" rel="noopener noreferrer">${i.placeWebsiteOpen ?? "Webseite öffnen"}</a>` : ""}</div><div class="actions"><button type="button" class="link" @click=${() => this.editPlace(d)}>${i.edit}</button><button type="button" class="link" @click=${() => {
      this.removePlace(d, s);
    }}>${this.confirmingPlaceId === d.id ? i.confirmDelete : i.remove}</button><button type="button" class="link" @click=${() => this.startRating(d)}>${d.rating_overall ? i.ratingEdit ?? "Bewertung" : i.ratingAdd ?? "Bewerten"}</button></div>${this.ratingPlaceId === d.id ? m`<div class="rating-form form-grid">${this.starPicker(i.ratingOverall ?? "Gesamt", this.ratingOverall, (f) => this.ratingOverall = f)}${this.starPicker(i.ratingAccess ?? "Anfahrt", this.ratingAccess, (f) => this.ratingAccess = f)}${this.starPicker(i.ratingSpace ?? "Platzgröße", this.ratingSpace, (f) => this.ratingSpace = f)}${this.starPicker(i.ratingFacilities ?? "Ausstattung", this.ratingFacilities, (f) => this.ratingFacilities = f)}${this.starPicker(i.ratingSurroundings ?? "Umgebung", this.ratingSurroundings, (f) => this.ratingSurroundings = f)}<textarea aria-label=${i.ratingComment ?? "Kommentar"} .value=${this.ratingText} @input=${(f) => this.ratingText = f.currentTarget.value}></textarea><button type="button" @click=${() => {
      this.saveRating(d.id, s);
    }}>${i.save}</button></div>` : ""}</article>`)}</div>` : m`<p class="muted">${i.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details></section>`;
  }
  renderPlaces(i, s) {
    const o = this.snapshot?.stops ?? [], h = /* @__PURE__ */ new Set(["campsite", "rv_site", "wild_camp", "overnight"]), d = o.filter((_) => h.has(_.place_kind || _.place_type || _.stop_type)), f = o.filter((_) => !h.has(_.place_kind || _.place_type || _.stop_type)), b = (_) => m`<article class="place-row"><div><strong>${_.name}</strong><span class="muted">${so(_.place_kind || _.place_type || _.stop_type, this.hass)} · ${j(_.arrived_at || _.occurred_at, this.hass)}${_.duration_seconds ? ` · ${Dt(_.duration_seconds, this.hass)}` : ""}${_.rating_overall ? ` · ${_.rating_overall}/5` : ""}</span>${_.address ? m`<span class="muted">${_.address}</span>` : ""}${_.description ? m`<span>${_.description}</span>` : ""}${_.website_url ? m`<a href=${_.website_url} target="_blank" rel="noopener noreferrer">${i.placeWebsiteOpen ?? "Webseite öffnen"}</a>` : ""}</div><div class="actions compact-actions"><button type="button" class="link" @click=${() => this.editPlace(_)}>${i.edit}</button><button type="button" class="link" @click=${() => {
      this.removePlace(_, s);
    }}>${this.confirmingPlaceId === _.id ? i.confirmDelete : i.remove}</button><button type="button" class="link" @click=${() => this.startRating(_)}>${_.rating_overall ? i.ratingEdit ?? "Bewertung" : i.ratingAdd ?? "Bewerten"}</button></div></article>`, p = (_, w) => m`<details class="stay-group" open><summary><strong>${_}</strong><span>${w.length}</span></summary>${w.length ? m`<div class="place-list">${w.map(b)}</div>` : m`<p class="muted">${i.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details>`;
    return m`<section class="place-section stay-management"><div class="actions compact-actions"><button type="button" @click=${() => {
      this.resetPlaceForm(), this.placeArrived = this.nowLocalDateTime(), this.openEditor("place-create", s);
    }}>${i.create ?? "Hinzufügen"}</button></div>${p(i.overnightPlaces ?? "Übernachtungsplätze", d)}${p(i.places ?? "Zwischenstopps", f)}${this.renderInterruptions(i, s)}${this.renderSuggestions(i, s)}</section>`;
  }
  renderRatingActions(i, s) {
    const o = (this.snapshot?.stops ?? []).filter((h) => h.rating_overall);
    return o.length ? m`<section class="place-section"><details><summary><strong>${i.ratingEdit ?? "Bewertungen"}</strong><span>${o.length}</span></summary>${o.map((h) => m`<div class="row"><span>${h.name} · ${h.rating_overall}/5</span><button type="button" class="link" @click=${() => {
      this.removeRating(h.id, s);
    }}>${i.ratingRemove ?? "Bewertung löschen"}</button></div>`)}</details></section>` : "";
  }
  renderEditorDialog(i, s) {
    if (!this.editorKind) return "";
    const o = this.editorKind === "trip-edit", h = this.editorKind === "drive-edit", d = this.editorKind === "place-edit", f = this.editorKind === "expense-edit", b = this.editorKind === "rating-edit", p = o ? i.edit : this.editorKind === "trip-create" ? i.newTrip : h ? i.edit : this.editorKind === "drive-create" ? i.manualDrive : d ? i.edit : this.editorKind === "place-create" ? i.places ?? "Ort hinzufügen" : f ? i.edit : this.editorKind === "expense-create" ? i.expenses : i.ratingEdit ?? "Bewertung", _ = this.actionError || this.loadError, w = () => this.closeEditor();
    return m`<dialog class="editor-dialog" aria-labelledby="editor-dialog-title" @cancel=${(y) => {
      y.preventDefault(), w();
    }}>
      <form @submit=${(y) => {
      if (y.preventDefault(), this.editorKind === "trip-create") this.addTrip();
      else if (o) {
        const k = this.snapshot?.trips.find(($) => $.id === this.editingTripId);
        k && this.saveTrip(k);
      } else if (this.editorKind === "drive-create") this.addManualDrive(s);
      else if (h) {
        const k = [...this.snapshot?.drives ?? [], ...this.snapshot?.available_drives ?? []].find(($) => $.id === this.editingDriveId);
        k && this.saveManualDrive(k, s);
      } else if (this.editorKind === "place-create" || d) this.savePlace(s);
      else if (this.editorKind === "expense-create") this.addExpense(s);
      else if (f) {
        const k = (this.snapshot?.expenses ?? []).find(($) => $.id === this.editingExpenseId);
        k && this.saveExpense(k);
      } else b && this.ratingPlaceId && this.saveRating(this.ratingPlaceId, s);
    }}>
        <h3 id="editor-dialog-title">${p}</h3>
        ${this.discardPrompt ? m`<div class="warning" role="alert"><strong>${i.unsavedTripChange ?? "Ungespeicherte Änderungen verwerfen?"}</strong><div class="actions"><button type="button" @click=${() => {
      this.discardPrompt = !1, this.requestUpdate();
    }}>${i.cancel}</button><button type="button" class="secondary" @click=${() => {
      this.editingTripId = "", this.editingDriveId = "", this.editingExpenseId = "", this.resetPlaceForm(), this.ratingPlaceId = "", this.closeEditor(!0);
    }}>${i.confirmDelete ?? "Verwerfen"}</button></div></div>` : m`
          ${_ ? m`<p class="error" role="alert">${_}</p>` : ""}
          ${this.editorKind === "trip-create" ? m`<label>${i.tripName}<input required .value=${this.tripTitle} @input=${(y) => {
      this.tripTitle = y.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.destination}<input .value=${this.destination} @input=${(y) => {
      this.destination = y.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.startDate}<input type="date" .value=${this.tripStartDate} @input=${(y) => {
      this.tripStartDate = y.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.endDate}<input type="date" .value=${this.tripEndDate} @input=${(y) => {
      this.tripEndDate = y.currentTarget.value, this.markEditorDirty();
    }}></label>` : ""}
          ${o ? m`<label>${i.tripName}<input required .value=${this.editingTripTitle} @input=${(y) => {
      this.editingTripTitle = y.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.destination}<input .value=${this.editingDestination} @input=${(y) => {
      this.editingDestination = y.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.startDate}<input type="date" .value=${this.editingStartDate} @input=${(y) => {
      this.editingStartDate = y.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.endDate}<input type="date" .value=${this.editingEndDate} @input=${(y) => {
      this.editingEndDate = y.currentTarget.value, this.markEditorDirty();
    }}></label>` : ""}
          ${this.editorKind === "drive-create" ? this.renderDriveEditorFields(i, !1) : h ? this.renderDriveEditorFields(i, !0) : ""}
          ${this.editorKind === "place-create" || d ? this.renderPlaceEditorFields(i) : ""}
          ${this.editorKind === "expense-create" ? this.renderExpenseEditorFields(i, !1) : f ? this.renderExpenseEditorFields(i, !0) : ""}
          ${b ? m`${this.starPicker(i.ratingOverall ?? "Gesamt", this.ratingOverall, (y) => {
      this.ratingOverall = y, this.markEditorDirty();
    })}${this.starPicker(i.ratingAccess ?? "Anfahrt", this.ratingAccess, (y) => {
      this.ratingAccess = y, this.markEditorDirty();
    })}${this.starPicker(i.ratingSpace ?? "Platzgröße", this.ratingSpace, (y) => {
      this.ratingSpace = y, this.markEditorDirty();
    })}${this.starPicker(i.ratingFacilities ?? "Ausstattung", this.ratingFacilities, (y) => {
      this.ratingFacilities = y, this.markEditorDirty();
    })}${this.starPicker(i.ratingSurroundings ?? "Umgebung", this.ratingSurroundings, (y) => {
      this.ratingSurroundings = y, this.markEditorDirty();
    })}<label>${i.ratingComment ?? "Kommentar"}<textarea .value=${this.ratingText} @input=${(y) => {
      this.ratingText = y.currentTarget.value, this.markEditorDirty();
    }}></textarea></label>` : ""}
          <div class="dialog-actions"><button type="button" class="secondary" @click=${w}>${i.cancel}</button><button type="submit" ?disabled=${this.placeSaving || this.manualSaving || this.tripSaving || !!this.driveSavingId || !!this.expenseSavingId}>${this.tripSaving ? i.saving : i.save}</button></div>
        `}
      </form>
    </dialog>`;
  }
  renderDriveEditorFields(i, s) {
    const o = s ? this.editingDriveOccurredAt : this.manualOccurredAt;
    return m`<label>${i.driveStart}<input type="datetime-local" required .value=${o} @input=${(h) => {
      s ? this.editingDriveOccurredAt = h.currentTarget.value : this.manualOccurredAt = h.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.startLocation}<input required .value=${s ? this.editingDriveStartLocation : this.manualStartLocation} @input=${(h) => {
      s ? this.editingDriveStartLocation = h.currentTarget.value : this.manualStartLocation = h.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.endLocation}<input required .value=${s ? this.editingDriveEndLocation : this.manualEndLocation} @input=${(h) => {
      s ? this.editingDriveEndLocation = h.currentTarget.value : this.manualEndLocation = h.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.distanceKm}<input required type="number" min="0" step="0.1" inputmode="decimal" .value=${s ? this.editingDriveDistanceKm : this.manualDistanceKm} @input=${(h) => {
      s ? this.editingDriveDistanceKm = h.currentTarget.value : this.manualDistanceKm = h.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.durationMinutes}<input type="number" min="0" step="1" .value=${s ? this.editingDriveDurationMinutes : this.manualDurationMinutes} @input=${(h) => {
      s ? this.editingDriveDurationMinutes = h.currentTarget.value : this.manualDurationMinutes = h.currentTarget.value, this.markEditorDirty();
    }}></label>`;
  }
  renderPlaceEditorFields(i) {
    const s = m`<option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option>`;
    return m`<label>${i.placeName ?? "Name"}<input required .value=${this.placeName} @input=${(o) => {
      this.placeName = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.placeCategory ?? "Kategorie"}<select .value=${this.placeType} @change=${(o) => {
      this.placeType = o.currentTarget.value, this.markEditorDirty();
    }}>${s}</select></label><label>${i.placeArrived ?? "Ankunft"}<input required type="datetime-local" .value=${this.placeArrived} @input=${(o) => {
      this.placeArrived = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.placeDeparted ?? "Abfahrt"}<input type="datetime-local" .value=${this.placeDeparted} @input=${(o) => {
      this.placeDeparted = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.placeWebsite ?? "Webseite"}<input type="url" .value=${this.placeWebsite} @input=${(o) => {
      this.placeWebsite = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.placeAddress ?? "Adresse"}<input .value=${this.placeAddress} @input=${(o) => {
      this.placeAddress = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>Latitude<input inputmode="decimal" .value=${this.placeLatitude} @input=${(o) => {
      this.placeLatitude = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>Longitude<input inputmode="decimal" .value=${this.placeLongitude} @input=${(o) => {
      this.placeLongitude = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.placeDescription ?? "Notizen"}<textarea .value=${this.placeDescription} @input=${(o) => {
      this.placeDescription = o.currentTarget.value, this.markEditorDirty();
    }}></textarea></label>`;
  }
  renderExpenseEditorFields(i, s) {
    const o = s ? this.editingExpenseDate : this.expenseDate, h = s ? this.editingExpenseTime : this.expenseTime, d = s ? this.editingExpenseTimeEnabled : this.expenseTimeEnabled, f = s ? this.editingCategory : this.category, b = s ? this.editingFuel : this.fuel, p = f === "fuel", _ = s ? this.editingExpenseNote : this.expenseNote;
    return m`<label>${i.amount}<input ${p ? "" : "required"} type="number" min="0" step="0.01" inputmode="decimal" .value=${b.amount} @input=${(w) => {
      p ? this.setFuel("amount", w.currentTarget.value, s) : s ? (this.editingAmount = w.currentTarget.value, this.markEditorDirty()) : this.setExpenseAmount(w.currentTarget.value);
    }}></label>${p ? m`<label>${i.fuelLiters ?? "Getankte Liter (l)"}<input type="text" inputmode="decimal" .value=${b.liters} @input=${(w) => this.setFuel("liters", w.currentTarget.value, s)}></label><label>${i.fuelPrice ?? "Literpreis (€/l)"}<input type="text" inputmode="decimal" .value=${b.price} @input=${(w) => this.setFuel("price", w.currentTarget.value, s)}></label>` : ""}<label>${i.category}<select .value=${f} @change=${(w) => {
      const y = w.currentTarget.value;
      s ? this.setEditingExpenseCategory(y) : this.setExpenseCategory(y), this.markEditorDirty();
    }}>${this.categoryOptions(f).map((w) => m`<option value=${w} ?selected=${w === f}>${ji(w, this.hass)}</option>`)}</select></label><label>${i.expenseNote ?? "Bemerkung (optional)"}<textarea rows="4" maxlength="2000" aria-describedby="expense-note-hint" .value=${_} @input=${(w) => {
      s ? this.editingExpenseNote = w.currentTarget.value : this.expenseNote = w.currentTarget.value, this.markEditorDirty();
    }}></textarea><small id="expense-note-hint" class="muted">${i.expenseNoteHint ?? "Bis zu 2.000 Zeichen, Zeilenumbrüche sind möglich."}</small></label><label>${i.expenseDate ?? "Tatsächliches Ausgabendatum"}<input type="date" ?required=${!s || !!o} .value=${o} @input=${(w) => {
      s ? this.editingExpenseDate = w.currentTarget.value : this.expenseDate = w.currentTarget.value, this.markEditorDirty();
    }}></label><label class="inline-check"><input type="checkbox" .checked=${d} @change=${(w) => {
      const y = w.currentTarget.checked;
      s ? this.editingExpenseTimeEnabled = y : this.expenseTimeEnabled = y, this.markEditorDirty();
    }}> ${i.expenseTime ?? "Uhrzeit erfassen"}</label>${d ? m`<label>${i.time ?? "Uhrzeit"}<input type="time" .value=${h} @input=${(w) => {
      s ? this.editingExpenseTime = w.currentTarget.value : this.expenseTime = w.currentTarget.value, this.markEditorDirty();
    }}></label>` : ""}`;
  }
  render() {
    const i = P(this.hass), s = this.snapshot?.trips ?? [];
    if (this.embeddedSection() === "trip-create") return m`${this.renderEditorDialog(i, "")}`;
    if (!this.embeddedTripId()) return m`${this.renderGpx(i, s, this.gpxPreview)}${this.renderPdfExport(i, s)}${this.activeTripId ? this.renderPlaces(i, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(i, this.activeTripId) : ""}${this.renderLegacy()}${this.renderEditorDialog(i, this.activeTripId)}${this.renderTripDeleteDialog(i)}`;
    const o = this.embeddedSection(), h = s.find((d) => d.id === this.embeddedTripId());
    return m`${o === "trip-actions" && h ? this.renderTripActions(i, h) : ""}${o === "gpx" ? this.renderGpx(i, s, this.gpxPreview) : ""}${o === "pdf" ? this.renderPdfExport(i, s) : ""}${o === "places" ? m`${this.activeTripId ? this.renderPlaces(i, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(i, this.activeTripId) : ""}` : ""}${o === "expenses" ? this.renderEmbeddedExpenses(i) : ""}${this.renderEditorDialog(i, this.embeddedTripId())}`;
  }
  renderEmbeddedExpenses(i) {
    const s = this.snapshot?.expenses ?? [], o = this.snapshot?.expense_summary?.total_minor !== void 0 && this.snapshot.expense_summary.currency ? bt(this.snapshot.expense_summary.total_minor, this.snapshot.expense_summary.currency, this.hass) : bt(0, "EUR", this.hass);
    return m`<div class="embedded-expenses"><div class="actions compact-actions"><button type="button" @click=${() => this.startExpenseCreate(this.embeddedTripId())}>${i.create ?? "Hinzufügen"}</button></div>${s.map((h) => this.renderExpense(h, i))}<p class="total"><strong>${i.total}: ${o}</strong></p></div>`;
  }
  renderLegacySource() {
    const i = P(this.hass), s = this.snapshot?.trips ?? [], o = this.snapshot?.expenses ?? [], h = this.snapshot?.expense_summary, d = h?.mixed_currency ? i.mixedCurrency : h?.total_minor !== void 0 && h.currency ? bt(h.total_minor, h.currency, this.hass) : bt(0, "EUR", this.hass), f = this.actionError || this.loadError, b = this.gpxPreview;
    return m`<ha-card><h2>${i.manager}</h2>${f ? m`<p class="error" role="alert">${f}</p>` : ""}<section class="gpx-import"><h3>${i.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(p) => this.readGPX(p)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || i.gpxPrivacy}</p>${this.gpxError ? m`<p class="error" role="alert">${this.gpxError}</p>` : ""}${b ? m`<div class="gpx-preview"><strong>${b.drives.length} ${i.gpxSections}, ${b.points.length} ${i.gpxPoints}</strong><ul>${b.drives.map((p) => m`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(p.key)} @change=${(_) => {
      _.currentTarget.checked ? this.gpxSelected.add(p.key) : this.gpxSelected.delete(p.key), this.requestUpdate();
    }}> ${j(p.started_at, this.hass)} – ${j(p.ended_at, this.hass)} · ${(p.distance_m / 1e3).toFixed(1)} km · ${Dt(p.duration_seconds, this.hass)}</label></li>`)}</ul>${b.warnings.length ? m`<p class="muted">${i.gpxWarnings}: ${b.warnings.join(", ")}</p>` : ""}${b.conflicts.duplicate_file ? m`<p class="error" role="alert">${i.gpxDuplicate}</p>` : m`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? i.saving : i.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${i.newTrip}</h3><div class="form-grid"><input aria-label=${i.tripName} placeholder=${i.tripName} .value=${this.tripTitle} @input=${(p) => this.tripTitle = p.target.value}><input aria-label=${i.destination} placeholder=${i.destination} .value=${this.destination} @input=${(p) => this.destination = p.target.value}><label>${i.startDate}<input type="date" .value=${this.tripStartDate} @input=${(p) => this.tripStartDate = p.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.tripEndDate} @input=${(p) => this.tripEndDate = p.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${i.create}</button></div></section><section><h3>${i.trips}</h3>${s.length ? s.map((p) => m`<article class="trip"><div class="row"><strong>${p.title}</strong><span class="muted">${p.destination || ""} · ${Gt(p.status, this.hass)} · ${Lt(p, this.hass) || i.period}</span></div>${this.editingTripId === p.id ? m`<form class="form-grid" @submit=${(_) => {
      _.preventDefault(), this.saveTrip(p);
    }}><input aria-label=${i.tripName} .value=${this.editingTripTitle} @input=${(_) => this.editingTripTitle = _.currentTarget.value}><input aria-label=${i.destination} .value=${this.editingDestination} @input=${(_) => this.editingDestination = _.currentTarget.value}><label>${i.startDate}<input type="date" .value=${this.editingStartDate} @input=${(_) => this.editingStartDate = _.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.editingEndDate} @input=${(_) => this.editingEndDate = _.currentTarget.value}></label><button type="submit">${i.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${i.cancel}</button></form>` : m`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(p)}>${i.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(p.id)}>${this.confirmingTripId === p.id ? i.confirmDelete : i.remove}</button>${p.status === "planned" || p.status === "paused" ? m`<button type="button" @click=${() => this.changeStatus(p.id, "active")}>${i.resume}</button>` : ""}${p.status === "active" ? m`<button type="button" class="secondary" @click=${() => this.changeStatus(p.id, "paused")}>${i.pause}</button><button type="button" @click=${() => this.changeStatus(p.id, "completed")}>${i.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(p.id)}>${this.selected === p.id ? i.close : i.details}</button></div>`}${this.selected === p.id ? m`<div class="details"><h4>${i.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((_) => this.renderDrive(_, p.id, i)) : m`<p class="muted">${i.noDrives}</p>`}<h4>${i.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((_) => this.renderDrive(_, p.id, i)) : m`<p class="muted">${i.noDrives}</p>`}<h4>${i.manualDrive}</h4><div class="form-grid"><label>${i.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(_) => this.manualOccurredAt = _.currentTarget.value}></label><input aria-label=${i.startLocation} placeholder=${i.startLocation} .value=${this.manualStartLocation} @input=${(_) => this.manualStartLocation = _.currentTarget.value}><input aria-label=${i.endLocation} placeholder=${i.endLocation} .value=${this.manualEndLocation} @input=${(_) => this.manualEndLocation = _.currentTarget.value}><input aria-label=${i.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${i.distanceKm} .value=${this.manualDistanceKm} @input=${(_) => this.manualDistanceKm = _.currentTarget.value}><input aria-label=${i.durationMinutes} type="number" min="0" step="1" placeholder=${i.durationMinutes} .value=${this.manualDurationMinutes} @input=${(_) => this.manualDurationMinutes = _.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(p.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? i.saving : i.createDrive}</button></div><h4>${i.expenses}</h4><div class="expense-form create-form"><input aria-label=${i.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(_) => this.setExpenseAmount(_.currentTarget.value)}><select aria-label=${i.category} .value=${this.category} @change=${(_) => this.setExpenseCategory(_.currentTarget.value)}>${Je.map((_) => m`<option value=${_}>${ji(_, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(p.id)}>${i.save}</button></div>${o.map((_) => this.renderExpense(_, i))}<p class="total"><strong>${i.total}: ${d}</strong></p></div>` : ""}</article>`) : m`<p class="muted">${i.noTrip}</p>`}</section></ha-card>`;
  }
  renderLegacyOld() {
    const i = P(this.hass), s = this.snapshot?.trips ?? [];
    return m`<ha-card><h2>${i.manager}</h2>${this.actionError || this.loadError ? m`<p class="error" role="alert">${this.actionError || this.loadError}</p>` : ""}<section><h3>${i.trips}</h3>${s.length ? s.map((o) => m`<article class="trip"><div class="row"><strong>${o.title}</strong><span class="muted">${o.destination || ""} · ${Gt(o.status, this.hass)} · ${Lt(o, this.hass) || i.period}</span></div><div class="actions compact-actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(o)}>${i.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(o.id)}>${this.confirmingTripId === o.id ? i.confirmDelete : i.remove}</button><button type="button" class="secondary" @click=${() => this.toggleTripDetails(o.id)}>${this.selected === o.id ? i.close : i.details}</button></div>${this.selected === o.id ? m`<div class="details"><h4>${i.assignedDrives}</h4>${(this.snapshot?.drives ?? []).map((h) => this.renderDrive(h, o.id, i))}<h4>${i.expenses}</h4>${(this.snapshot?.expenses ?? []).map((h) => this.renderExpense(h, i))}<p class="total"><strong>${i.total}: ${bt(this.snapshot?.expense_summary?.total_minor ?? 0, this.snapshot?.expense_summary?.currency ?? "EUR", this.hass)}</strong></p></div>` : ""}</article>`) : m`<p class="muted">${i.noTrip}</p>`}</section></ha-card>`;
  }
  renderLegacy() {
    const i = P(this.hass);
    return m`<div class="manager-shell"><div class="editor-toolbar"><button type="button" @click=${() => this.startTripCreate()}>${i.newTrip ?? "Reise hinzufügen"}</button>${this.activeTripId ? m`<button type="button" class="secondary" @click=${() => this.startManualDriveCreate(this.activeTripId)}>${i.createDrive ?? "Fahrt hinzufügen"}</button><button type="button" class="secondary" @click=${() => this.startExpenseCreate(this.activeTripId)}>${i.expenses ?? "Kosten hinzufügen"}</button>` : ""}</div>${this.renderLegacyOld()}</div>`;
  }
}
Rt.styles = [Nt.styles, wt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.expense-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--divider-color);min-width:0}.expense-info{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px;align-items:baseline;min-width:0;overflow-wrap:anywhere}.expense-date{color:var(--secondary-text-color);font-size:.88em}.expense-amount{white-space:nowrap}.expense-actions{margin-top:0;justify-content:flex-end}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.inline-check{display:flex!important;align-items:center;gap:6px;min-height:40px}.inline-check input{width:1.1rem!important;min-height:1.1rem!important;flex:0 0 auto}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}.editor-toolbar,.compact-actions{display:flex;flex-wrap:wrap;gap:8px}.editor-dialog{width:min(36rem,calc(100vw - 2rem));max-height:calc(100dvh - 2rem);padding:0;border:0;border-radius:12px;color:var(--primary-text-color);background:var(--card-background-color)}.editor-dialog::backdrop{background:rgb(0 0 0 / .5)}.editor-dialog form{display:grid;gap:12px;padding:18px;max-height:calc(100dvh - 2rem);overflow:auto}.editor-dialog label{display:grid;gap:5px}.editor-dialog input,.editor-dialog select,.editor-dialog textarea{box-sizing:border-box;width:100%;min-height:40px;padding:8px;color:var(--primary-text-color);background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:7px;font:inherit}.editor-dialog textarea{min-height:5rem}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}.editor-dialog button:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}@media(max-width:650px){.editor-toolbar button,.dialog-actions button{flex:1 1 100%}.editor-dialog{width:calc(100vw - 1rem);max-height:calc(100dvh - 1rem)}.editor-dialog form{padding:14px;max-height:calc(100dvh - 1rem)}.expense-row{grid-template-columns:1fr;gap:6px}.expense-info{grid-template-columns:minmax(0,1fr) auto}.expense-date{grid-column:1 / -1}.expense-actions{justify-content:flex-start}.total{text-align:left}}`];
Rt.styles = [...Rt.styles, wt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.interruption-row{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--divider-color)}.interruption-row>div{display:grid;gap:4px;min-width:0}.interruption-copy{overflow-wrap:anywhere}.interruption-row>.actions{margin-top:0;justify-content:flex-end}.candidate-label{font-size:.9em}.stay-management{display:grid;gap:10px}.stay-group{border:1px solid var(--divider-color);border-radius:8px;padding:8px}.stay-group>summary,.place-section details>summary{cursor:pointer;display:flex;justify-content:space-between;gap:10px;align-items:baseline}.place-list{display:grid;gap:8px}.place-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:start;padding:10px 0;border-bottom:1px solid var(--divider-color);min-width:0}.place-row>div:first-child{display:grid;gap:4px;min-width:0;overflow-wrap:anywhere}.place-row strong,.place-row span,.place-row a{overflow-wrap:anywhere}.place-row .actions{margin-top:0;align-items:start;justify-content:flex-end}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}.star-picker{border:0;padding:0;margin:0;min-width:0}.star-picker legend{font-size:.9em;color:var(--secondary-text-color)}.star-picker [role=radiogroup]{display:flex;gap:2px}.star-button{min-height:38px;min-width:38px;padding:2px;background:transparent;color:var(--secondary-text-color);font-size:1.6rem;line-height:1}.star-button[data-selected]{color:var(--primary-color)}.star-button:hover{color:var(--primary-color)}@media(max-width:500px){.form-grid{grid-template-columns:1fr}.form-grid textarea{min-height:5rem}.place-section .form-grid{gap:10px}.place-section .actions{display:grid;grid-template-columns:1fr}.place-section .actions button{width:100%}.stay-management>.compact-actions,.stay-management .place-row .compact-actions{display:flex;grid-template-columns:none}.stay-management>.compact-actions button,.stay-management .place-row .compact-actions button{width:auto;min-height:38px}.place-row{grid-template-columns:1fr;gap:8px}.place-row .actions{justify-content:flex-start;flex-wrap:wrap}.interruption-row{align-items:stretch;flex-direction:column}.interruption-row>.actions{justify-content:flex-start}.interruption-row button{width:auto;min-height:38px}.pdf-export-row button{width:100%}}`];
Rt.styles = [...Rt.styles, wt`.trip-management{margin-top:12px}.trip-actions{margin-top:0}.trip-actions-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:0}.trip-action{box-sizing:border-box;width:100%;min-width:0;min-height:44px;padding:10px 12px;border-radius:8px;font:inherit;font-size:.95rem;line-height:1.2;overflow-wrap:anywhere;white-space:normal}.trip-action-primary{color:var(--text-primary-color,#fff);background:var(--primary-color)}.trip-action-secondary{color:var(--primary-text-color);background:var(--secondary-background-color);border:1px solid var(--divider-color)}.trip-delete-action{margin-top:10px;padding-top:10px;border-top:1px solid var(--divider-color)}.trip-delete-action .trip-action{color:var(--text-primary-color,#fff)!important;background:var(--error-color,#c62828)!important;border-color:transparent}.trip-delete-dialog{width:min(34rem,calc(100vw - 2rem));max-width:calc(100vw - 2rem);padding:0;border:0;border-radius:12px;color:var(--primary-text-color);background:var(--card-background-color)}.trip-delete-dialog::backdrop{background:rgb(0 0 0 / .5)}.trip-delete-dialog form{display:grid;gap:12px;padding:18px}.trip-delete-dialog ul{margin:0;padding-inline-start:1.2rem}.trip-delete-dialog .dialog-actions{margin-top:4px}@media(max-width:420px){.trip-actions-grid{grid-template-columns:1fr}}@media(max-width:650px){.trip-delete-dialog{width:calc(100vw - 1rem);max-width:calc(100vw - 1rem)}}`];
Rt.styles = [...Rt.styles || [], wt`.expense-note{grid-column:1 / -1;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--primary-text-color);line-height:1.35}`];
si("camper-travel-journal-manager-card", Rt);
const Co = 1e4;
function Vi() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Yi(c) {
  return c.length <= 8 ? "••••" : `${c.slice(0, 4)}…${c.slice(-4)}`;
}
function Ur(c) {
  return c?.connection ? c.connection.connected === !0 ? "available" : c.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function Io(c) {
  const i = c, s = typeof i?.code == "string" ? i.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", o = typeof i?.message == "string" ? i.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: s, errorMessage: o };
}
function Mo(c, i) {
  return new Promise((s, o) => {
    const h = setTimeout(() => o(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), i);
    c.then((d) => {
      clearTimeout(h), s(d);
    }, (d) => {
      clearTimeout(h), o(d);
    });
  });
}
async function Xi(c, i, s, o) {
  const h = Vi();
  try {
    const d = await Mo(c.connection.sendMessagePromise(i), o);
    return { ...s(d), durationMs: Math.round(Vi() - h), value: d };
  } catch (d) {
    return { state: "failed", durationMs: Math.round(Vi() - h), ...Io(d) };
  }
}
function zo(c) {
  return c && typeof c == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function Oo(c) {
  const i = c?.vehicles;
  return Array.isArray(i) && i.every((s) => s && typeof s == "object" && typeof s.vehicle_id == "string") ? { state: "success", structure: "ok", count: i.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function Ro(c) {
  const i = c;
  return Array.isArray(i?.trips) && Array.isArray(i?.drives) && Array.isArray(i?.stops) ? { state: "success", structure: "ok", count: i.trips.length, drivesCount: i.drives.length, stopsCount: i.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function No(c, i, s = Co) {
  const o = { state: "not_run", durationMs: null };
  if (!c?.connection) return { version: "0.3.4", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: o, vehicles: o, trips: o, vehicleId: Yi(i) };
  const h = Ur(c), d = await Xi(c, { type: "auth/current_user" }, zo, s), f = await Xi(c, { type: "camper_travel_journal/list_vehicles" }, Oo, s), b = f.value?.vehicles?.filter((mt) => typeof mt.vehicle_id == "string") ?? [], p = b.length === 1 ? b[0].vehicle_id : void 0, w = await Xi(c, { type: "camper_travel_journal/list", vehicle_id: p ?? i }, Ro, s), { value: y, ...k } = d, { value: $, ...D } = f, { value: N, ...at } = w;
  return {
    version: "0.3.4",
    connectionBefore: h,
    connectionAfter: Ur(c),
    authentication: k,
    vehicles: D,
    trips: at,
    vehicleId: Yi(i),
    ...p ? { resolvedVehicleId: Yi(p) } : {}
  };
}
function Ji(c) {
  return JSON.stringify(c, null, 2);
}
function Qi(c) {
  return c.state === "success" ? "erfolgreich" : c.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const Wr = "01M4XW0KD3GQ0KASAYHQ29840P";
class Bo extends jt {
  static styles = wt`
    :host { display: block; color: var(--primary-text-color); }
    ha-card { padding: 16px; }
    h2 { margin: 0 0 12px; }
    dl { display: grid; grid-template-columns: minmax(10rem, 1fr) auto; gap: 8px; margin: 0 0 16px; }
    dt { color: var(--secondary-text-color); } dd { margin: 0; text-align: right; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    button { min-height: 40px; border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; color: var(--text-primary-color, #fff); background: var(--primary-color); }
    button.secondary { color: var(--primary-text-color); background: var(--secondary-background-color); }
    .error { color: var(--error-color); } .muted { color: var(--secondary-text-color); }
    .migration-notice { margin:0 0 12px; padding:12px; border:1px solid var(--warning-color,#f57c00); border-inline-start:5px solid var(--warning-color,#f57c00); border-radius:8px; background:color-mix(in srgb,var(--warning-color,#f57c00) 12%,var(--card-background-color)); }
    .migration-notice strong { display:block; } .migration-notice p { margin:6px 0; } .migration-notice a { color:var(--primary-color); }
    pre, textarea { max-height: 16rem; width: 100%; box-sizing: border-box; overflow: auto; white-space: pre-wrap; font-size: .78rem; background: var(--secondary-background-color); padding: 8px; }
  `;
  _hass;
  report;
  running = !1;
  error = "";
  manualCopy = !1;
  config = { vehicle_id: Wr };
  set hass(i) {
    this._hass = i, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(i) {
    this.config = { vehicle_id: i.vehicle_id || Wr };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await No(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const i = Ji(this.report);
    if (!navigator.clipboard?.writeText) {
      this.manualCopy = !0, this.error = "Bitte den eingeblendeten Bericht manuell auswählen und kopieren.", this.requestUpdate();
      return;
    }
    try {
      await navigator.clipboard.writeText(i), this.manualCopy = !1, this.error = "";
    } catch {
      this.manualCopy = !0, this.error = "Automatisches Kopieren ist in diesem Browser nicht verfügbar. Bitte den Bericht manuell auswählen und kopieren.";
    }
    this.requestUpdate();
  }
  selectReport() {
    this.shadowRoot?.querySelector('textarea[aria-label="Diagnosebericht zum manuellen Kopieren"]')?.select();
  }
  updated() {
    if (this.shadowRoot?.querySelector(".migration-notice")) return;
    const i = this.shadowRoot?.querySelector("ha-card");
    if (!i) return;
    const s = document.createElement("aside");
    s.className = "migration-notice", s.setAttribute("role", "note");
    const o = document.createElement("strong");
    o.textContent = "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const h = document.createElement("p");
    h.textContent = "Use the central Camper Travel Journal card for new dashboards. This legacy card remains supported for compatibility.";
    const d = document.createElement("a");
    d.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration", d.target = "_blank", d.rel = "noreferrer", d.textContent = "Migration guide", s.append(o, h, d), i.prepend(s);
  }
  render() {
    const i = this.report;
    return m`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? m`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? m`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${i ? m`<dl>
        <dt>Version</dt><dd>${i.version}</dd>
        <dt>Verbindung vorher</dt><dd>${i.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${i.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${Qi(i.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${Qi(i.vehicles)}${i.vehicles.durationMs === null ? "" : ` (${i.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${Qi(i.trips)}${i.trips.durationMs === null ? "" : ` (${i.trips.durationMs} ms)`}${i.trips.state === "success" ? ` · ${i.trips.count ?? 0} Reisen / ${i.trips.drivesCount ?? 0} Fahrten / ${i.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${i.vehicles.structure === "ok" && i.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Ji(i)}</pre>${this.manualCopy ? m`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Ji(i)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${i ? "Diagnose wiederholen" : "Diagnose starten"}</button>${i ? m`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? m`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", Bo);
var Pe = { exports: {} };
var Zo = Pe.exports, Hr;
function Fo() {
  return Hr || (Hr = 1, (function(c, i) {
    (function(s, o) {
      o(i);
    })(Zo, (function(s) {
      var o = "1.9.4";
      function h(t) {
        var e, n, r, a;
        for (n = 1, r = arguments.length; n < r; n++) {
          a = arguments[n];
          for (e in a)
            t[e] = a[e];
        }
        return t;
      }
      var d = Object.create || /* @__PURE__ */ (function() {
        function t() {
        }
        return function(e) {
          return t.prototype = e, new t();
        };
      })();
      function f(t, e) {
        var n = Array.prototype.slice;
        if (t.bind)
          return t.bind.apply(t, n.call(arguments, 1));
        var r = n.call(arguments, 2);
        return function() {
          return t.apply(e, r.length ? r.concat(n.call(arguments)) : arguments);
        };
      }
      var b = 0;
      function p(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++b), t._leaflet_id;
      }
      function _(t, e, n) {
        var r, a, l, u;
        return u = function() {
          r = !1, a && (l.apply(n, a), a = !1);
        }, l = function() {
          r ? a = arguments : (t.apply(n, arguments), setTimeout(u, e), r = !0);
        }, l;
      }
      function w(t, e, n) {
        var r = e[1], a = e[0], l = r - a;
        return t === r && n ? t : ((t - a) % l + l) % l + a;
      }
      function y() {
        return !1;
      }
      function k(t, e) {
        if (e === !1)
          return t;
        var n = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * n) / n;
      }
      function $(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function D(t) {
        return $(t).split(/\s+/);
      }
      function N(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? d(t.options) : {});
        for (var n in e)
          t.options[n] = e[n];
        return t.options;
      }
      function at(t, e, n) {
        var r = [];
        for (var a in t)
          r.push(encodeURIComponent(n ? a.toUpperCase() : a) + "=" + encodeURIComponent(t[a]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + r.join("&");
      }
      var mt = /\{ *([\w_ -]+) *\}/g;
      function dn(t, e) {
        return t.replace(mt, function(n, r) {
          var a = e[r];
          if (a === void 0)
            throw new Error("No value provided for variable " + n);
          return typeof a == "function" && (a = a(e)), a;
        });
      }
      var dt = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function li(t, e) {
        for (var n = 0; n < t.length; n++)
          if (t[n] === e)
            return n;
        return -1;
      }
      var Ce = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function hi(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var un = 0;
      function pn(t) {
        var e = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (e - un));
        return un = e + n, window.setTimeout(t, n);
      }
      var ci = window.requestAnimationFrame || hi("RequestAnimationFrame") || pn, fn = window.cancelAnimationFrame || hi("CancelAnimationFrame") || hi("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function et(t, e, n) {
        if (n && ci === pn)
          t.call(e);
        else
          return ci.call(window, f(t, e));
      }
      function ot(t) {
        t && fn.call(window, t);
      }
      var os = {
        __proto__: null,
        extend: h,
        create: d,
        bind: f,
        get lastId() {
          return b;
        },
        stamp: p,
        throttle: _,
        wrapNum: w,
        falseFn: y,
        formatNum: k,
        trim: $,
        splitWords: D,
        setOptions: N,
        getParamString: at,
        template: dn,
        isArray: dt,
        indexOf: li,
        emptyImageUrl: Ce,
        requestFn: ci,
        cancelFn: fn,
        requestAnimFrame: et,
        cancelAnimFrame: ot
      };
      function $t() {
      }
      $t.extend = function(t) {
        var e = function() {
          N(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, n = e.__super__ = this.prototype, r = d(n);
        r.constructor = e, e.prototype = r;
        for (var a in this)
          Object.prototype.hasOwnProperty.call(this, a) && a !== "prototype" && a !== "__super__" && (e[a] = this[a]);
        return t.statics && h(e, t.statics), t.includes && (ls(t.includes), h.apply(null, [r].concat(t.includes))), h(r, t), delete r.statics, delete r.includes, r.options && (r.options = n.options ? d(n.options) : {}, h(r.options, t.options)), r._initHooks = [], r.callInitHooks = function() {
          if (!this._initHooksCalled) {
            n.callInitHooks && n.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var l = 0, u = r._initHooks.length; l < u; l++)
              r._initHooks[l].call(this);
          }
        }, e;
      }, $t.include = function(t) {
        var e = this.prototype.options;
        return h(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, $t.mergeOptions = function(t) {
        return h(this.prototype.options, t), this;
      }, $t.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), n = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
      };
      function ls(t) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          t = dt(t) ? t : [t];
          for (var e = 0; e < t.length; e++)
            t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
      var st = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(t, e, n) {
          if (typeof t == "object")
            for (var r in t)
              this._on(r, t[r], e);
          else {
            t = D(t);
            for (var a = 0, l = t.length; a < l; a++)
              this._on(t[a], e, n);
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
        off: function(t, e, n) {
          if (!arguments.length)
            delete this._events;
          else if (typeof t == "object")
            for (var r in t)
              this._off(r, t[r], e);
          else {
            t = D(t);
            for (var a = arguments.length === 1, l = 0, u = t.length; l < u; l++)
              a ? this._off(t[l]) : this._off(t[l], e, n);
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(t, e, n, r) {
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          if (this._listens(t, e, n) === !1) {
            n === this && (n = void 0);
            var a = { fn: e, ctx: n };
            r && (a.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(a);
          }
        },
        _off: function(t, e, n) {
          var r, a, l;
          if (this._events && (r = this._events[t], !!r)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (a = 0, l = r.length; a < l; a++)
                  r[a].fn = y;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var u = this._listens(t, e, n);
            if (u !== !1) {
              var g = r[u];
              this._firingCount && (g.fn = y, this._events[t] = r = r.slice()), r.splice(u, 1);
            }
          }
        },
        // @method fire(type: String, data?: Object, propagate?: Boolean): this
        // Fires an event of the specified type. You can optionally provide a data
        // object — the first argument of the listener function will contain its
        // properties. The event can optionally be propagated to event parents.
        fire: function(t, e, n) {
          if (!this.listens(t, n))
            return this;
          var r = h({}, e, {
            type: t,
            target: this,
            sourceTarget: e && e.sourceTarget || this
          });
          if (this._events) {
            var a = this._events[t];
            if (a) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var l = 0, u = a.length; l < u; l++) {
                var g = a[l], v = g.fn;
                g.once && this.off(t, v, g.ctx), v.call(g.ctx || this, r);
              }
              this._firingCount--;
            }
          }
          return n && this._propagateEvent(r), this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(t, e, n, r) {
          typeof t != "string" && console.warn('"string" type argument expected');
          var a = e;
          typeof e != "function" && (r = !!e, a = void 0, n = void 0);
          var l = this._events && this._events[t];
          if (l && l.length && this._listens(t, a, n) !== !1)
            return !0;
          if (r) {
            for (var u in this._eventParents)
              if (this._eventParents[u].listens(t, e, n, r))
                return !0;
          }
          return !1;
        },
        // returns the index (number) or false
        _listens: function(t, e, n) {
          if (!this._events)
            return !1;
          var r = this._events[t] || [];
          if (!e)
            return !!r.length;
          n === this && (n = void 0);
          for (var a = 0, l = r.length; a < l; a++)
            if (r[a].fn === e && r[a].ctx === n)
              return a;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(t, e, n) {
          if (typeof t == "object")
            for (var r in t)
              this._on(r, t[r], e, !0);
          else {
            t = D(t);
            for (var a = 0, l = t.length; a < l; a++)
              this._on(t[a], e, n, !0);
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
      st.addEventListener = st.on, st.removeEventListener = st.clearAllEventListeners = st.off, st.addOneTimeEventListener = st.once, st.fireEvent = st.fire, st.hasEventListeners = st.listens;
      var he = $t.extend(st);
      function C(t, e, n) {
        this.x = n ? Math.round(t) : t, this.y = n ? Math.round(e) : e;
      }
      var mn = Math.trunc || function(t) {
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
          return this.clone()._add(A(t));
        },
        _add: function(t) {
          return this.x += t.x, this.y += t.y, this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(t) {
          return this.clone()._subtract(A(t));
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
          return this.x = mn(this.x), this.y = mn(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(t) {
          t = A(t);
          var e = t.x - this.x, n = t.y - this.y;
          return Math.sqrt(e * e + n * n);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(t) {
          return t = A(t), t.x === this.x && t.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(t) {
          return t = A(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + k(this.x) + ", " + k(this.y) + ")";
        }
      };
      function A(t, e, n) {
        return t instanceof C ? t : dt(t) ? new C(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new C(t.x, t.y) : new C(t, e, n);
      }
      function W(t, e) {
        if (t)
          for (var n = e ? [t, e] : t, r = 0, a = n.length; r < a; r++)
            this.extend(n[r]);
      }
      W.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e, n;
          if (!t)
            return this;
          if (t instanceof C || typeof t[0] == "number" || "x" in t)
            e = n = A(t);
          else if (t = it(t), e = t.min, n = t.max, !e || !n)
            return this;
          return !this.min && !this.max ? (this.min = e.clone(), this.max = n.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(t) {
          return A(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            t
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return A(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return A(this.max.x, this.min.y);
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
          var e, n;
          return typeof t[0] == "number" || t instanceof C ? t = A(t) : t = it(t), t instanceof W ? (e = t.min, n = t.max) : e = n = t, e.x >= this.min.x && n.x <= this.max.x && e.y >= this.min.y && n.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = it(t);
          var e = this.min, n = this.max, r = t.min, a = t.max, l = a.x >= e.x && r.x <= n.x, u = a.y >= e.y && r.y <= n.y;
          return l && u;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = it(t);
          var e = this.min, n = this.max, r = t.min, a = t.max, l = a.x > e.x && r.x < n.x, u = a.y > e.y && r.y < n.y;
          return l && u;
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
          var e = this.min, n = this.max, r = Math.abs(e.x - n.x) * t, a = Math.abs(e.y - n.y) * t;
          return it(
            A(e.x - r, e.y - a),
            A(n.x + r, n.y + a)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(t) {
          return t ? (t = it(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
        }
      };
      function it(t, e) {
        return !t || t instanceof W ? t : new W(t, e);
      }
      function nt(t, e) {
        if (t)
          for (var n = e ? [t, e] : t, r = 0, a = n.length; r < a; r++)
            this.extend(n[r]);
      }
      nt.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, n = this._northEast, r, a;
          if (t instanceof Z)
            r = t, a = t;
          else if (t instanceof nt) {
            if (r = t._southWest, a = t._northEast, !r || !a)
              return this;
          } else
            return t ? this.extend(O(t) || G(t)) : this;
          return !e && !n ? (this._southWest = new Z(r.lat, r.lng), this._northEast = new Z(a.lat, a.lng)) : (e.lat = Math.min(r.lat, e.lat), e.lng = Math.min(r.lng, e.lng), n.lat = Math.max(a.lat, n.lat), n.lng = Math.max(a.lng, n.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, n = this._northEast, r = Math.abs(e.lat - n.lat) * t, a = Math.abs(e.lng - n.lng) * t;
          return new nt(
            new Z(e.lat - r, e.lng - a),
            new Z(n.lat + r, n.lng + a)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new Z(
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
          return new Z(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new Z(this.getSouth(), this.getEast());
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
          typeof t[0] == "number" || t instanceof Z || "lat" in t ? t = O(t) : t = G(t);
          var e = this._southWest, n = this._northEast, r, a;
          return t instanceof nt ? (r = t.getSouthWest(), a = t.getNorthEast()) : r = a = t, r.lat >= e.lat && a.lat <= n.lat && r.lng >= e.lng && a.lng <= n.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = G(t);
          var e = this._southWest, n = this._northEast, r = t.getSouthWest(), a = t.getNorthEast(), l = a.lat >= e.lat && r.lat <= n.lat, u = a.lng >= e.lng && r.lng <= n.lng;
          return l && u;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = G(t);
          var e = this._southWest, n = this._northEast, r = t.getSouthWest(), a = t.getNorthEast(), l = a.lat > e.lat && r.lat < n.lat, u = a.lng > e.lng && r.lng < n.lng;
          return l && u;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          return t ? (t = G(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function G(t, e) {
        return t instanceof nt ? t : new nt(t, e);
      }
      function Z(t, e, n) {
        if (isNaN(t) || isNaN(e))
          throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = +t, this.lng = +e, n !== void 0 && (this.alt = +n);
      }
      Z.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          if (!t)
            return !1;
          t = O(t);
          var n = Math.max(
            Math.abs(this.lat - t.lat),
            Math.abs(this.lng - t.lng)
          );
          return n <= (e === void 0 ? 1e-9 : e);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(t) {
          return "LatLng(" + k(this.lat, t) + ", " + k(this.lng, t) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(t) {
          return At.distance(this, O(t));
        },
        // @method wrap(): LatLng
        // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
        wrap: function() {
          return At.wrapLatLng(this);
        },
        // @method toBounds(sizeInMeters: Number): LatLngBounds
        // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
        toBounds: function(t) {
          var e = 180 * t / 40075017, n = e / Math.cos(Math.PI / 180 * this.lat);
          return G(
            [this.lat - e, this.lng - n],
            [this.lat + e, this.lng + n]
          );
        },
        clone: function() {
          return new Z(this.lat, this.lng, this.alt);
        }
      };
      function O(t, e, n) {
        return t instanceof Z ? t : dt(t) && typeof t[0] != "object" ? t.length === 3 ? new Z(t[0], t[1], t[2]) : t.length === 2 ? new Z(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new Z(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new Z(t, e, n);
      }
      var Tt = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(t, e) {
          var n = this.projection.project(t), r = this.scale(e);
          return this.transformation._transform(n, r);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(t, e) {
          var n = this.scale(e), r = this.transformation.untransform(t, n);
          return this.projection.unproject(r);
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
          var e = this.projection.bounds, n = this.scale(t), r = this.transformation.transform(e.min, n), a = this.transformation.transform(e.max, n);
          return new W(r, a);
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
          var e = this.wrapLng ? w(t.lng, this.wrapLng, !0) : t.lng, n = this.wrapLat ? w(t.lat, this.wrapLat, !0) : t.lat, r = t.alt;
          return new Z(n, e, r);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), n = this.wrapLatLng(e), r = e.lat - n.lat, a = e.lng - n.lng;
          if (r === 0 && a === 0)
            return t;
          var l = t.getSouthWest(), u = t.getNorthEast(), g = new Z(l.lat - r, l.lng - a), v = new Z(u.lat - r, u.lng - a);
          return new nt(g, v);
        }
      }, At = h({}, Tt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(t, e) {
          var n = Math.PI / 180, r = t.lat * n, a = e.lat * n, l = Math.sin((e.lat - t.lat) * n / 2), u = Math.sin((e.lng - t.lng) * n / 2), g = l * l + Math.cos(r) * Math.cos(a) * u * u, v = 2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g));
          return this.R * v;
        }
      }), gn = 6378137, di = {
        R: gn,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, t.lat), -n), a = Math.sin(r * e);
          return new C(
            this.R * t.lng * e,
            this.R * Math.log((1 + a) / (1 - a)) / 2
          );
        },
        unproject: function(t) {
          var e = 180 / Math.PI;
          return new Z(
            (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
            t.x * e / this.R
          );
        },
        bounds: (function() {
          var t = gn * Math.PI;
          return new W([-t, -t], [t, t]);
        })()
      };
      function ui(t, e, n, r) {
        if (dt(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = n, this._d = r;
      }
      ui.prototype = {
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
      function ce(t, e, n, r) {
        return new ui(t, e, n, r);
      }
      var pi = h({}, At, {
        code: "EPSG:3857",
        projection: di,
        transformation: (function() {
          var t = 0.5 / (Math.PI * di.R);
          return ce(t, 0.5, -t, 0.5);
        })()
      }), hs = h({}, pi, {
        code: "EPSG:900913"
      });
      function _n(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function vn(t, e) {
        var n = "", r, a, l, u, g, v;
        for (r = 0, l = t.length; r < l; r++) {
          for (g = t[r], a = 0, u = g.length; a < u; a++)
            v = g[a], n += (a ? "L" : "M") + v.x + " " + v.y;
          n += e ? E.svg ? "z" : "x" : "";
        }
        return n || "M0 0";
      }
      var fi = document.documentElement.style, Ie = "ActiveXObject" in window, cs = Ie && !document.addEventListener, yn = "msLaunchUri" in navigator && !("documentMode" in document), mi = gt("webkit"), bn = gt("android"), xn = gt("android 2") || gt("android 3"), ds = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), us = bn && gt("Google") && ds < 537 && !("AudioNode" in window), gi = !!window.opera, wn = !yn && gt("chrome"), $n = gt("gecko") && !mi && !gi && !Ie, ps = !wn && gt("safari"), Tn = gt("phantom"), Pn = "OTransition" in fi, fs = navigator.platform.indexOf("Win") === 0, En = Ie && "transition" in fi, _i = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !xn, Sn = "MozPerspective" in fi, ms = !window.L_DISABLE_3D && (En || _i || Sn) && !Pn && !Tn, de = typeof orientation < "u" || gt("mobile"), gs = de && mi, _s = de && _i, kn = !window.PointerEvent && window.MSPointerEvent, Dn = !!(window.PointerEvent || kn), Ln = "ontouchstart" in window || !!window.TouchEvent, vs = !window.L_NO_TOUCH && (Ln || Dn), ys = de && gi, bs = de && $n, xs = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, ws = (function() {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function() {
              t = !0;
            }
          });
          window.addEventListener("testPassiveEventSupport", y, e), window.removeEventListener("testPassiveEventSupport", y, e);
        } catch {
        }
        return t;
      })(), $s = (function() {
        return !!document.createElement("canvas").getContext;
      })(), vi = !!(document.createElementNS && _n("svg").createSVGRect), Ts = !!vi && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), Ps = !vi && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), Es = navigator.platform.indexOf("Mac") === 0, Ss = navigator.platform.indexOf("Linux") === 0;
      function gt(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var E = {
        ie: Ie,
        ielt9: cs,
        edge: yn,
        webkit: mi,
        android: bn,
        android23: xn,
        androidStock: us,
        opera: gi,
        chrome: wn,
        gecko: $n,
        safari: ps,
        phantom: Tn,
        opera12: Pn,
        win: fs,
        ie3d: En,
        webkit3d: _i,
        gecko3d: Sn,
        any3d: ms,
        mobile: de,
        mobileWebkit: gs,
        mobileWebkit3d: _s,
        msPointer: kn,
        pointer: Dn,
        touch: vs,
        touchNative: Ln,
        mobileOpera: ys,
        mobileGecko: bs,
        retina: xs,
        passiveEvents: ws,
        canvas: $s,
        svg: vi,
        vml: Ps,
        inlineSvg: Ts,
        mac: Es,
        linux: Ss
      }, An = E.msPointer ? "MSPointerDown" : "pointerdown", Cn = E.msPointer ? "MSPointerMove" : "pointermove", In = E.msPointer ? "MSPointerUp" : "pointerup", Mn = E.msPointer ? "MSPointerCancel" : "pointercancel", yi = {
        touchstart: An,
        touchmove: Cn,
        touchend: In,
        touchcancel: Mn
      }, zn = {
        touchstart: Is,
        touchmove: Me,
        touchend: Me,
        touchcancel: Me
      }, Vt = {}, On = !1;
      function ks(t, e, n) {
        return e === "touchstart" && Cs(), zn[e] ? (n = zn[e].bind(this, n), t.addEventListener(yi[e], n, !1), n) : (console.warn("wrong event specified:", e), y);
      }
      function Ds(t, e, n) {
        if (!yi[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(yi[e], n, !1);
      }
      function Ls(t) {
        Vt[t.pointerId] = t;
      }
      function As(t) {
        Vt[t.pointerId] && (Vt[t.pointerId] = t);
      }
      function Rn(t) {
        delete Vt[t.pointerId];
      }
      function Cs() {
        On || (document.addEventListener(An, Ls, !0), document.addEventListener(Cn, As, !0), document.addEventListener(In, Rn, !0), document.addEventListener(Mn, Rn, !0), On = !0);
      }
      function Me(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var n in Vt)
            e.touches.push(Vt[n]);
          e.changedTouches = [e], t(e);
        }
      }
      function Is(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && J(e), Me(t, e);
      }
      function Ms(t) {
        var e = {}, n, r;
        for (r in t)
          n = t[r], e[r] = n && n.bind ? n.bind(t) : n;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var zs = 200;
      function Os(t, e) {
        t.addEventListener("dblclick", e);
        var n = 0, r;
        function a(l) {
          if (l.detail !== 1) {
            r = l.detail;
            return;
          }
          if (!(l.pointerType === "mouse" || l.sourceCapabilities && !l.sourceCapabilities.firesTouchEvents)) {
            var u = Un(l);
            if (!(u.some(function(v) {
              return v instanceof HTMLLabelElement && v.attributes.for;
            }) && !u.some(function(v) {
              return v instanceof HTMLInputElement || v instanceof HTMLSelectElement;
            }))) {
              var g = Date.now();
              g - n <= zs ? (r++, r === 2 && e(Ms(l))) : r = 1, n = g;
            }
          }
        }
        return t.addEventListener("click", a), {
          dblclick: e,
          simDblclick: a
        };
      }
      function Rs(t, e) {
        t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
      }
      var bi = Re(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), ue = Re(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), Nn = ue === "webkitTransition" || ue === "OTransition" ? ue + "End" : "transitionend";
      function Bn(t) {
        return typeof t == "string" ? document.getElementById(t) : t;
      }
      function pe(t, e) {
        var n = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!n || n === "auto") && document.defaultView) {
          var r = document.defaultView.getComputedStyle(t, null);
          n = r ? r[e] : null;
        }
        return n === "auto" ? null : n;
      }
      function B(t, e, n) {
        var r = document.createElement(t);
        return r.className = e || "", n && n.appendChild(r), r;
      }
      function H(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function ze(t) {
        for (; t.firstChild; )
          t.removeChild(t.firstChild);
      }
      function Yt(t) {
        var e = t.parentNode;
        e && e.lastChild !== t && e.appendChild(t);
      }
      function Xt(t) {
        var e = t.parentNode;
        e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
      }
      function xi(t, e) {
        if (t.classList !== void 0)
          return t.classList.contains(e);
        var n = Oe(t);
        return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n);
      }
      function M(t, e) {
        if (t.classList !== void 0)
          for (var n = D(e), r = 0, a = n.length; r < a; r++)
            t.classList.add(n[r]);
        else if (!xi(t, e)) {
          var l = Oe(t);
          wi(t, (l ? l + " " : "") + e);
        }
      }
      function q(t, e) {
        t.classList !== void 0 ? t.classList.remove(e) : wi(t, $((" " + Oe(t) + " ").replace(" " + e + " ", " ")));
      }
      function wi(t, e) {
        t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
      }
      function Oe(t) {
        return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
      }
      function lt(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && Ns(t, e);
      }
      function Ns(t, e) {
        var n = !1, r = "DXImageTransform.Microsoft.Alpha";
        try {
          n = t.filters.item(r);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), n ? (n.Enabled = e !== 100, n.Opacity = e) : t.style.filter += " progid:" + r + "(opacity=" + e + ")";
      }
      function Re(t) {
        for (var e = document.documentElement.style, n = 0; n < t.length; n++)
          if (t[n] in e)
            return t[n];
        return !1;
      }
      function Bt(t, e, n) {
        var r = e || new C(0, 0);
        t.style[bi] = (E.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
      }
      function K(t, e) {
        t._leaflet_pos = e, E.any3d ? Bt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
      }
      function Zt(t) {
        return t._leaflet_pos || new C(0, 0);
      }
      var fe, me, $i;
      if ("onselectstart" in document)
        fe = function() {
          I(window, "selectstart", J);
        }, me = function() {
          U(window, "selectstart", J);
        };
      else {
        var ge = Re(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        fe = function() {
          if (ge) {
            var t = document.documentElement.style;
            $i = t[ge], t[ge] = "none";
          }
        }, me = function() {
          ge && (document.documentElement.style[ge] = $i, $i = void 0);
        };
      }
      function Ti() {
        I(window, "dragstart", J);
      }
      function Pi() {
        U(window, "dragstart", J);
      }
      var Ne, Ei;
      function Si(t) {
        for (; t.tabIndex === -1; )
          t = t.parentNode;
        t.style && (Be(), Ne = t, Ei = t.style.outlineStyle, t.style.outlineStyle = "none", I(window, "keydown", Be));
      }
      function Be() {
        Ne && (Ne.style.outlineStyle = Ei, Ne = void 0, Ei = void 0, U(window, "keydown", Be));
      }
      function Zn(t) {
        do
          t = t.parentNode;
        while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
        return t;
      }
      function ki(t) {
        var e = t.getBoundingClientRect();
        return {
          x: e.width / t.offsetWidth || 1,
          y: e.height / t.offsetHeight || 1,
          boundingClientRect: e
        };
      }
      var Bs = {
        __proto__: null,
        TRANSFORM: bi,
        TRANSITION: ue,
        TRANSITION_END: Nn,
        get: Bn,
        getStyle: pe,
        create: B,
        remove: H,
        empty: ze,
        toFront: Yt,
        toBack: Xt,
        hasClass: xi,
        addClass: M,
        removeClass: q,
        setClass: wi,
        getClass: Oe,
        setOpacity: lt,
        testProp: Re,
        setTransform: Bt,
        setPosition: K,
        getPosition: Zt,
        get disableTextSelection() {
          return fe;
        },
        get enableTextSelection() {
          return me;
        },
        disableImageDrag: Ti,
        enableImageDrag: Pi,
        preventOutline: Si,
        restoreOutline: Be,
        getSizedParentNode: Zn,
        getScale: ki
      };
      function I(t, e, n, r) {
        if (e && typeof e == "object")
          for (var a in e)
            Li(t, a, e[a], n);
        else {
          e = D(e);
          for (var l = 0, u = e.length; l < u; l++)
            Li(t, e[l], n, r);
        }
        return this;
      }
      var _t = "_leaflet_events";
      function U(t, e, n, r) {
        if (arguments.length === 1)
          Fn(t), delete t[_t];
        else if (e && typeof e == "object")
          for (var a in e)
            Ai(t, a, e[a], n);
        else if (e = D(e), arguments.length === 2)
          Fn(t, function(g) {
            return li(e, g) !== -1;
          });
        else
          for (var l = 0, u = e.length; l < u; l++)
            Ai(t, e[l], n, r);
        return this;
      }
      function Fn(t, e) {
        for (var n in t[_t]) {
          var r = n.split(/\d/)[0];
          (!e || e(r)) && Ai(t, r, null, null, n);
        }
      }
      var Di = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function Li(t, e, n, r) {
        var a = e + p(n) + (r ? "_" + p(r) : "");
        if (t[_t] && t[_t][a])
          return this;
        var l = function(g) {
          return n.call(r || t, g || window.event);
        }, u = l;
        !E.touchNative && E.pointer && e.indexOf("touch") === 0 ? l = ks(t, e, l) : E.touch && e === "dblclick" ? l = Os(t, l) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(Di[e] || e, l, E.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (l = function(g) {
          g = g || window.event, Ii(t, g) && u(g);
        }, t.addEventListener(Di[e], l, !1)) : t.addEventListener(e, u, !1) : t.attachEvent("on" + e, l), t[_t] = t[_t] || {}, t[_t][a] = l;
      }
      function Ai(t, e, n, r, a) {
        a = a || e + p(n) + (r ? "_" + p(r) : "");
        var l = t[_t] && t[_t][a];
        if (!l)
          return this;
        !E.touchNative && E.pointer && e.indexOf("touch") === 0 ? Ds(t, e, l) : E.touch && e === "dblclick" ? Rs(t, l) : "removeEventListener" in t ? t.removeEventListener(Di[e] || e, l, !1) : t.detachEvent("on" + e, l), t[_t][a] = null;
      }
      function Ft(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
      }
      function Ci(t) {
        return Li(t, "wheel", Ft), this;
      }
      function _e(t) {
        return I(t, "mousedown touchstart dblclick contextmenu", Ft), t._leaflet_disable_click = !0, this;
      }
      function J(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
      }
      function Ut(t) {
        return J(t), Ft(t), this;
      }
      function Un(t) {
        if (t.composedPath)
          return t.composedPath();
        for (var e = [], n = t.target; n; )
          e.push(n), n = n.parentNode;
        return e;
      }
      function Wn(t, e) {
        if (!e)
          return new C(t.clientX, t.clientY);
        var n = ki(e), r = n.boundingClientRect;
        return new C(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - r.left) / n.x - e.clientLeft,
          (t.clientY - r.top) / n.y - e.clientTop
        );
      }
      var Zs = E.linux && E.chrome ? window.devicePixelRatio : E.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function Hn(t) {
        return E.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / Zs : (
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
      function Ii(t, e) {
        var n = e.relatedTarget;
        if (!n)
          return !0;
        try {
          for (; n && n !== t; )
            n = n.parentNode;
        } catch {
          return !1;
        }
        return n !== t;
      }
      var Fs = {
        __proto__: null,
        on: I,
        off: U,
        stopPropagation: Ft,
        disableScrollPropagation: Ci,
        disableClickPropagation: _e,
        preventDefault: J,
        stop: Ut,
        getPropagationPath: Un,
        getMousePosition: Wn,
        getWheelDelta: Hn,
        isExternalTarget: Ii,
        addListener: I,
        removeListener: U
      }, qn = he.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(t, e, n, r) {
          this.stop(), this._el = t, this._inProgress = !0, this._duration = n || 0.25, this._easeOutPower = 1 / Math.max(r || 0.5, 0.2), this._startPos = Zt(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
          var e = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
          e < n ? this._runFrame(this._easeOut(e / n), t) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(t, e) {
          var n = this._startPos.add(this._offset.multiplyBy(t));
          e && n._round(), K(this._el, n), this.fire("step");
        },
        _complete: function() {
          ot(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      }), R = he.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: pi,
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
          e = N(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = f(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(O(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = ue && E.any3d && !E.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), I(this._proxy, Nn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(t, e, n) {
          if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(O(t), e, this.options.maxBounds), n = n || {}, this._stop(), this._loaded && !n.reset && n !== !0) {
            n.animate !== void 0 && (n.zoom = h({ animate: n.animate }, n.zoom), n.pan = h({ animate: n.animate, duration: n.duration }, n.pan));
            var r = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
            if (r)
              return clearTimeout(this._sizeTimer), this;
          }
          return this._resetView(t, e, n.pan && n.pan.noMoveStart), this;
        },
        // @method setZoom(zoom: Number, options?: Zoom/pan options): this
        // Sets the zoom of the map.
        setZoom: function(t, e) {
          return this._loaded ? this.setView(this.getCenter(), t, { zoom: e }) : (this._zoom = t, this);
        },
        // @method zoomIn(delta?: Number, options?: Zoom options): this
        // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomIn: function(t, e) {
          return t = t || (E.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, e);
        },
        // @method zoomOut(delta?: Number, options?: Zoom options): this
        // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
        zoomOut: function(t, e) {
          return t = t || (E.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, e);
        },
        // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified geographical point on the map
        // stationary (e.g. used internally for scroll zoom and double-click zoom).
        // @alternative
        // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
        // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
        setZoomAround: function(t, e, n) {
          var r = this.getZoomScale(e), a = this.getSize().divideBy(2), l = t instanceof C ? t : this.latLngToContainerPoint(t), u = l.subtract(a).multiplyBy(1 - 1 / r), g = this.containerPointToLatLng(a.add(u));
          return this.setView(g, e, { zoom: n });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : G(t);
          var n = A(e.paddingTopLeft || e.padding || [0, 0]), r = A(e.paddingBottomRight || e.padding || [0, 0]), a = this.getBoundsZoom(t, !1, n.add(r));
          if (a = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, a) : a, a === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: a
            };
          var l = r.subtract(n).divideBy(2), u = this.project(t.getSouthWest(), a), g = this.project(t.getNorthEast(), a), v = this.unproject(u.add(g).divideBy(2).add(l), a);
          return {
            center: v,
            zoom: a
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = G(t), !t.isValid())
            throw new Error("Bounds are not valid.");
          var n = this._getBoundsCenterZoom(t, e);
          return this.setView(n.center, n.zoom, e);
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
          if (t = A(t).round(), e = e || {}, !t.x && !t.y)
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new qn(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
            M(this._mapPane, "leaflet-pan-anim");
            var n = this._getMapPanePos().subtract(t).round();
            this._panAnim.run(this._mapPane, n, e.duration || 0.25, e.easeLinearity);
          } else
            this._rawPanBy(t), this.fire("move").fire("moveend");
          return this;
        },
        // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) performing a smooth
        // pan-zoom animation.
        flyTo: function(t, e, n) {
          if (n = n || {}, n.animate === !1 || !E.any3d)
            return this.setView(t, e, n);
          this._stop();
          var r = this.project(this.getCenter()), a = this.project(t), l = this.getSize(), u = this._zoom;
          t = O(t), e = e === void 0 ? u : e;
          var g = Math.max(l.x, l.y), v = g * this.getZoomScale(u, e), x = a.distanceTo(r) || 1, T = 1.42, S = T * T;
          function z(V) {
            var Xe = V ? -1 : 1, Da = V ? v : g, La = v * v - g * g + Xe * S * S * x * x, Aa = 2 * Da * S * x, Hi = La / Aa, Pr = Math.sqrt(Hi * Hi + 1) - Hi, Ca = Pr < 1e-9 ? -18 : Math.log(Pr);
            return Ca;
          }
          function tt(V) {
            return (Math.exp(V) - Math.exp(-V)) / 2;
          }
          function Y(V) {
            return (Math.exp(V) + Math.exp(-V)) / 2;
          }
          function ct(V) {
            return tt(V) / Y(V);
          }
          var rt = z(0);
          function ne(V) {
            return g * (Y(rt) / Y(rt + T * V));
          }
          function Pa(V) {
            return g * (Y(rt) * ct(rt + T * V) - tt(rt)) / S;
          }
          function Ea(V) {
            return 1 - Math.pow(1 - V, 1.5);
          }
          var Sa = Date.now(), $r = (z(1) - rt) / T, ka = n.duration ? 1e3 * n.duration : 1e3 * $r * 0.8;
          function Tr() {
            var V = (Date.now() - Sa) / ka, Xe = Ea(V) * $r;
            V <= 1 ? (this._flyToFrame = et(Tr, this), this._move(
              this.unproject(r.add(a.subtract(r).multiplyBy(Pa(Xe) / x)), u),
              this.getScaleZoom(g / ne(Xe), u),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, n.noMoveStart), Tr.call(this), this;
        },
        // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
        // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
        flyToBounds: function(t, e) {
          var n = this._getBoundsCenterZoom(t, e);
          return this.flyTo(n.center, n.zoom, e);
        },
        // @method setMaxBounds(bounds: LatLngBounds): this
        // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
        setMaxBounds: function(t) {
          return t = G(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
          var n = this.getCenter(), r = this._limitCenter(n, this._zoom, G(t));
          return n.equals(r) || this.panTo(r, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var n = A(e.paddingTopLeft || e.padding || [0, 0]), r = A(e.paddingBottomRight || e.padding || [0, 0]), a = this.project(this.getCenter()), l = this.project(t), u = this.getPixelBounds(), g = it([u.min.add(n), u.max.subtract(r)]), v = g.getSize();
          if (!g.contains(l)) {
            this._enforcingBounds = !0;
            var x = l.subtract(g.getCenter()), T = g.extend(l).getSize().subtract(v);
            a.x += x.x < 0 ? -T.x : T.x, a.y += x.y < 0 ? -T.y : T.y, this.panTo(this.unproject(a), e), this._enforcingBounds = !1;
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
          var n = this.getSize(), r = e.divideBy(2).round(), a = n.divideBy(2).round(), l = r.subtract(a);
          return !l.x && !l.y ? this : (t.animate && t.pan ? this.panBy(l) : (t.pan && this._rawPanBy(l), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(f(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
            oldSize: e,
            newSize: n
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
          var e = f(this._handleGeolocationResponse, this), n = f(this._handleGeolocationError, this);
          return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, n, t) : navigator.geolocation.getCurrentPosition(e, n, t), this;
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
            var e = t.code, n = t.message || (e === 1 ? "permission denied" : e === 2 ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
              code: e,
              message: "Geolocation error: " + n + "."
            });
          }
        },
        _handleGeolocationResponse: function(t) {
          if (this._container._leaflet_id) {
            var e = t.coords.latitude, n = t.coords.longitude, r = new Z(e, n), a = r.toBounds(t.coords.accuracy * 2), l = this._locateOptions;
            if (l.setView) {
              var u = this.getBoundsZoom(a);
              this.setView(r, l.maxZoom ? Math.min(u, l.maxZoom) : u);
            }
            var g = {
              latlng: r,
              bounds: a,
              timestamp: t.timestamp
            };
            for (var v in t.coords)
              typeof t.coords[v] == "number" && (g[v] = t.coords[v]);
            this.fire("locationfound", g);
          }
        },
        // TODO Appropriate docs section?
        // @section Other Methods
        // @method addHandler(name: String, HandlerClass: Function): this
        // Adds a new `Handler` to the map, given its name and constructor function.
        addHandler: function(t, e) {
          if (!e)
            return this;
          var n = this[t] = new e(this);
          return this._handlers.push(n), this.options[t] && n.enable(), this;
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
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), H(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ot(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
          var t;
          for (t in this._layers)
            this._layers[t].remove();
          for (t in this._panes)
            H(this._panes[t]);
          return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(t, e) {
          var n = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), r = B("div", n, e || this._mapPane);
          return t && (this._panes[t] = r), r;
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
          var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), n = this.unproject(t.getTopRight());
          return new nt(e, n);
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
        getBoundsZoom: function(t, e, n) {
          t = G(t), n = A(n || [0, 0]);
          var r = this.getZoom() || 0, a = this.getMinZoom(), l = this.getMaxZoom(), u = t.getNorthWest(), g = t.getSouthEast(), v = this.getSize().subtract(n), x = it(this.project(g, r), this.project(u, r)).getSize(), T = E.any3d ? this.options.zoomSnap : 1, S = v.x / x.x, z = v.y / x.y, tt = e ? Math.max(S, z) : Math.min(S, z);
          return r = this.getScaleZoom(tt, r), T && (r = Math.round(r / (T / 100)) * (T / 100), r = e ? Math.ceil(r / T) * T : Math.floor(r / T) * T), Math.max(a, Math.min(l, r));
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
          var n = this._getTopLeftPoint(t, e);
          return new W(n, n.add(this.getSize()));
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
          var n = this.options.crs;
          return e = e === void 0 ? this._zoom : e, n.scale(t) / n.scale(e);
        },
        // @method getScaleZoom(scale: Number, fromZoom: Number): Number
        // Returns the zoom level that the map would end up at, if it is at `fromZoom`
        // level and everything is scaled by a factor of `scale`. Inverse of
        // [`getZoomScale`](#map-getZoomScale).
        getScaleZoom: function(t, e) {
          var n = this.options.crs;
          e = e === void 0 ? this._zoom : e;
          var r = n.zoom(t * n.scale(e));
          return isNaN(r) ? 1 / 0 : r;
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
          return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(A(t), e);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(t) {
          var e = A(t).add(this.getPixelOrigin());
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
          return this.options.crs.wrapLatLngBounds(G(t));
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
          return A(t).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(t) {
          return A(t).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(t) {
          var e = this.containerPointToLayerPoint(A(t));
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
          return Wn(t, this._container);
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
          var e = this._container = Bn(t);
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          I(e, "scroll", this._onScroll, this), this._containerId = p(e);
        },
        _initLayout: function() {
          var t = this._container;
          this._fadeAnimated = this.options.fadeAnimation && E.any3d, M(t, "leaflet-container" + (E.touch ? " leaflet-touch" : "") + (E.retina ? " leaflet-retina" : "") + (E.ielt9 ? " leaflet-oldie" : "") + (E.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var e = pe(t, "position");
          e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var t = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), K(this._mapPane, new C(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (M(t.markerPane, "leaflet-zoom-hide"), M(t.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(t, e, n) {
          K(this._mapPane, new C(0, 0));
          var r = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var a = this._zoom !== e;
          this._moveStart(a, n)._move(t, e)._moveEnd(a), this.fire("viewreset"), r && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, n, r) {
          e === void 0 && (e = this._zoom);
          var a = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), r ? n && n.pinch && this.fire("zoom", n) : ((a || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
        },
        _moveEnd: function(t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return ot(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(t) {
          K(this._mapPane, this._getMapPanePos().subtract(t));
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
          var e = t ? U : I;
          e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), E.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function() {
          ot(this._resizeRequest), this._resizeRequest = et(
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
          for (var n = [], r, a = e === "mouseout" || e === "mouseover", l = t.target || t.srcElement, u = !1; l; ) {
            if (r = this._targets[p(l)], r && (e === "click" || e === "preclick") && this._draggableMoved(r)) {
              u = !0;
              break;
            }
            if (r && r.listens(e, !0) && (a && !Ii(l, t) || (n.push(r), a)) || l === this._container)
              break;
            l = l.parentNode;
          }
          return !n.length && !u && !a && this.listens(e, !0) && (n = [this]), n;
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
            var n = t.type;
            n === "mousedown" && Si(e), this._fireDOMEvent(t, n);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, n) {
          if (t.type === "click") {
            var r = h({}, t);
            r.type = "preclick", this._fireDOMEvent(r, r.type, n);
          }
          var a = this._findEventTargets(t, e);
          if (n) {
            for (var l = [], u = 0; u < n.length; u++)
              n[u].listens(e, !0) && l.push(n[u]);
            a = l.concat(a);
          }
          if (a.length) {
            e === "contextmenu" && J(t);
            var g = a[0], v = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var x = g.getLatLng && (!g._radius || g._radius <= 10);
              v.containerPoint = x ? this.latLngToContainerPoint(g.getLatLng()) : this.mouseEventToContainerPoint(t), v.layerPoint = this.containerPointToLayerPoint(v.containerPoint), v.latlng = x ? g.getLatLng() : this.layerPointToLatLng(v.layerPoint);
            }
            for (u = 0; u < a.length; u++)
              if (a[u].fire(e, v, !0), v.originalEvent._stopped || a[u].options.bubblingMouseEvents === !1 && li(this._mouseEvents, e) !== -1)
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
          return Zt(this._mapPane) || new C(0, 0);
        },
        _moved: function() {
          var t = this._getMapPanePos();
          return t && !t.equals([0, 0]);
        },
        _getTopLeftPoint: function(t, e) {
          var n = t && e !== void 0 ? this._getNewPixelOrigin(t, e) : this.getPixelOrigin();
          return n.subtract(this._getMapPanePos());
        },
        _getNewPixelOrigin: function(t, e) {
          var n = this.getSize()._divideBy(2);
          return this.project(t, e)._subtract(n)._add(this._getMapPanePos())._round();
        },
        _latLngToNewLayerPoint: function(t, e, n) {
          var r = this._getNewPixelOrigin(n, e);
          return this.project(t, e)._subtract(r);
        },
        _latLngBoundsToNewLayerBounds: function(t, e, n) {
          var r = this._getNewPixelOrigin(n, e);
          return it([
            this.project(t.getSouthWest(), e)._subtract(r),
            this.project(t.getNorthWest(), e)._subtract(r),
            this.project(t.getSouthEast(), e)._subtract(r),
            this.project(t.getNorthEast(), e)._subtract(r)
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
        _limitCenter: function(t, e, n) {
          if (!n)
            return t;
          var r = this.project(t, e), a = this.getSize().divideBy(2), l = new W(r.subtract(a), r.add(a)), u = this._getBoundsOffset(l, n, e);
          return Math.abs(u.x) <= 1 && Math.abs(u.y) <= 1 ? t : this.unproject(r.add(u), e);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(t, e) {
          if (!e)
            return t;
          var n = this.getPixelBounds(), r = new W(n.min.add(t), n.max.add(t));
          return t.add(this._getBoundsOffset(r, e));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(t, e, n) {
          var r = it(
            this.project(e.getNorthEast(), n),
            this.project(e.getSouthWest(), n)
          ), a = r.min.subtract(t.min), l = r.max.subtract(t.max), u = this._rebound(a.x, -l.x), g = this._rebound(a.y, -l.y);
          return new C(u, g);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), n = this.getMaxZoom(), r = E.any3d ? this.options.zoomSnap : 1;
          return r && (t = Math.round(t / r) * r), Math.max(e, Math.min(n, t));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          q(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(t, e) {
          var n = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, e), !0);
        },
        _createAnimProxy: function() {
          var t = this._proxy = B("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var n = bi, r = this._proxy.style[n];
            Bt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), r === this._proxy.style[n] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          H(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var t = this.getCenter(), e = this.getZoom();
          Bt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
        },
        _catchTransitionEnd: function(t) {
          this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
        },
        _nothingToAnimate: function() {
          return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
        },
        _tryAnimatedZoom: function(t, e, n) {
          if (this._animatingZoom)
            return !0;
          if (n = n || {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
            return !1;
          var r = this.getZoomScale(e), a = this._getCenterOffset(t)._divideBy(1 - 1 / r);
          return n.animate !== !0 && !this.getSize().contains(a) ? !1 : (et(function() {
            this._moveStart(!0, n.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, n, r) {
          this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, M(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: r
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(f(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && q(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Us(t, e) {
        return new R(t, e);
      }
      var ut = $t.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(t) {
          N(this, t);
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
          var e = this._container = this.onAdd(t), n = this.getPosition(), r = t._controlCorners[n];
          return M(e, "leaflet-control"), n.indexOf("bottom") !== -1 ? r.insertBefore(e, r.firstChild) : r.appendChild(e), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (H(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(t) {
          this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
        }
      }), ve = function(t) {
        return new ut(t);
      };
      R.include({
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
          var t = this._controlCorners = {}, e = "leaflet-", n = this._controlContainer = B("div", e + "control-container", this._container);
          function r(a, l) {
            var u = e + a + " " + e + l;
            t[a + l] = B("div", u, n);
          }
          r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
        },
        _clearControlPos: function() {
          for (var t in this._controlCorners)
            H(this._controlCorners[t]);
          H(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var jn = ut.extend({
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
          sortFunction: function(t, e, n, r) {
            return n < r ? -1 : r < n ? 1 : 0;
          }
        },
        initialize: function(t, e, n) {
          N(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
          for (var r in t)
            this._addLayer(t[r], r);
          for (r in e)
            this._addLayer(e[r], r, !0);
        },
        onAdd: function(t) {
          this._initLayout(), this._update(), this._map = t, t.on("zoomend", this._checkDisabledLayers, this);
          for (var e = 0; e < this._layers.length; e++)
            this._layers[e].layer.on("add remove", this._onLayerChange, this);
          return this._container;
        },
        addTo: function(t) {
          return ut.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
          M(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return t < this._section.clientHeight ? (M(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : q(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return q(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var t = "leaflet-control-layers", e = this._container = B("div", t), n = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), _e(e), Ci(e);
          var r = this._section = B("section", t + "-list");
          n && (this._map.on("click", this.collapse, this), I(e, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var a = this._layersLink = B("a", t + "-toggle", e);
          a.href = "#", a.title = "Layers", a.setAttribute("role", "button"), I(a, {
            keydown: function(l) {
              l.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(l) {
              J(l), this._expandSafely();
            }
          }, this), n || this.expand(), this._baseLayersList = B("div", t + "-base", r), this._separator = B("div", t + "-separator", r), this._overlaysList = B("div", t + "-overlays", r), e.appendChild(r);
        },
        _getLayer: function(t) {
          for (var e = 0; e < this._layers.length; e++)
            if (this._layers[e] && p(this._layers[e].layer) === t)
              return this._layers[e];
        },
        _addLayer: function(t, e, n) {
          this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: t,
            name: e,
            overlay: n
          }), this.options.sortLayers && this._layers.sort(f(function(r, a) {
            return this.options.sortFunction(r.layer, a.layer, r.name, a.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          ze(this._baseLayersList), ze(this._overlaysList), this._layerControlInputs = [];
          var t, e, n, r, a = 0;
          for (n = 0; n < this._layers.length; n++)
            r = this._layers[n], this._addItem(r), e = e || r.overlay, t = t || !r.overlay, a += r.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && a > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
        },
        _onLayerChange: function(t) {
          this._handlingClick || this._update();
          var e = this._getLayer(p(t.target)), n = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
          n && this._map.fire(n, e);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(t, e) {
          var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", r = document.createElement("div");
          return r.innerHTML = n, r.firstChild;
        },
        _addItem: function(t) {
          var e = document.createElement("label"), n = this._map.hasLayer(t.layer), r;
          t.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + p(this), n), this._layerControlInputs.push(r), r.layerId = p(t.layer), I(r, "click", this._onInputClick, this);
          var a = document.createElement("span");
          a.innerHTML = " " + t.name;
          var l = document.createElement("span");
          e.appendChild(l), l.appendChild(r), l.appendChild(a);
          var u = t.overlay ? this._overlaysList : this._baseLayersList;
          return u.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, n, r = [], a = [];
            this._handlingClick = !0;
            for (var l = t.length - 1; l >= 0; l--)
              e = t[l], n = this._getLayer(e.layerId).layer, e.checked ? r.push(n) : e.checked || a.push(n);
            for (l = 0; l < a.length; l++)
              this._map.hasLayer(a[l]) && this._map.removeLayer(a[l]);
            for (l = 0; l < r.length; l++)
              this._map.hasLayer(r[l]) || this._map.addLayer(r[l]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, n, r = this._map.getZoom(), a = t.length - 1; a >= 0; a--)
            e = t[a], n = this._getLayer(e.layerId).layer, e.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var t = this._section;
          this._preventClick = !0, I(t, "click", J), this.expand();
          var e = this;
          setTimeout(function() {
            U(t, "click", J), e._preventClick = !1;
          });
        }
      }), Ws = function(t, e, n) {
        return new jn(t, e, n);
      }, Mi = ut.extend({
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
          var e = "leaflet-control-zoom", n = B("div", e + " leaflet-bar"), r = this.options;
          return this._zoomInButton = this._createButton(
            r.zoomInText,
            r.zoomInTitle,
            e + "-in",
            n,
            this._zoomIn
          ), this._zoomOutButton = this._createButton(
            r.zoomOutText,
            r.zoomOutTitle,
            e + "-out",
            n,
            this._zoomOut
          ), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), n;
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
        _createButton: function(t, e, n, r, a) {
          var l = B("a", n, r);
          return l.innerHTML = t, l.href = "#", l.title = e, l.setAttribute("role", "button"), l.setAttribute("aria-label", e), _e(l), I(l, "click", Ut), I(l, "click", a, this), I(l, "click", this._refocusOnMap, this), l;
        },
        _updateDisabled: function() {
          var t = this._map, e = "leaflet-disabled";
          q(this._zoomInButton, e), q(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (M(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (M(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      R.mergeOptions({
        zoomControl: !0
      }), R.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new Mi(), this.addControl(this.zoomControl));
      });
      var Hs = function(t) {
        return new Mi(t);
      }, Gn = ut.extend({
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
          var e = "leaflet-control-scale", n = B("div", e), r = this.options;
          return this._addScales(r, e + "-line", n), t.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), n;
        },
        onRemove: function(t) {
          t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(t, e, n) {
          t.metric && (this._mScale = B("div", e, n)), t.imperial && (this._iScale = B("div", e, n));
        },
        _update: function() {
          var t = this._map, e = t.getSize().y / 2, n = t.distance(
            t.containerPointToLatLng([0, e]),
            t.containerPointToLatLng([this.options.maxWidth, e])
          );
          this._updateScales(n);
        },
        _updateScales: function(t) {
          this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t);
        },
        _updateMetric: function(t) {
          var e = this._getRoundNum(t), n = e < 1e3 ? e + " m" : e / 1e3 + " km";
          this._updateScale(this._mScale, n, e / t);
        },
        _updateImperial: function(t) {
          var e = t * 3.2808399, n, r, a;
          e > 5280 ? (n = e / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (a = this._getRoundNum(e), this._updateScale(this._iScale, a + " ft", a / e));
        },
        _updateScale: function(t, e, n) {
          t.style.width = Math.round(this.options.maxWidth * n) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), n = t / e;
          return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, e * n;
        }
      }), qs = function(t) {
        return new Gn(t);
      }, js = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', zi = ut.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (E.inlineSvg ? js + " " : "") + "Leaflet</a>"
        },
        initialize: function(t) {
          N(this, t), this._attributions = {};
        },
        onAdd: function(t) {
          t.attributionControl = this, this._container = B("div", "leaflet-control-attribution"), _e(this._container);
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
            var n = [];
            this.options.prefix && n.push(this.options.prefix), t.length && n.push(t.join(", ")), this._container.innerHTML = n.join(' <span aria-hidden="true">|</span> ');
          }
        }
      });
      R.mergeOptions({
        attributionControl: !0
      }), R.addInitHook(function() {
        this.options.attributionControl && new zi().addTo(this);
      });
      var Gs = function(t) {
        return new zi(t);
      };
      ut.Layers = jn, ut.Zoom = Mi, ut.Scale = Gn, ut.Attribution = zi, ve.layers = Ws, ve.zoom = Hs, ve.scale = qs, ve.attribution = Gs;
      var vt = $t.extend({
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
      vt.addTo = function(t, e) {
        return t.addHandler(e, this), this;
      };
      var Ks = { Events: st }, Kn = E.touch ? "touchstart mousedown" : "mousedown", Ct = he.extend({
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
        initialize: function(t, e, n, r) {
          N(this, r), this._element = t, this._dragStartTarget = e || t, this._preventOutline = n;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (I(this._dragStartTarget, Kn, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Ct._dragging === this && this.finishDrag(!0), U(this._dragStartTarget, Kn, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(t) {
          if (this._enabled && (this._moved = !1, !xi(this._element, "leaflet-zoom-anim"))) {
            if (t.touches && t.touches.length !== 1) {
              Ct._dragging === this && this.finishDrag();
              return;
            }
            if (!(Ct._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Ct._dragging = this, this._preventOutline && Si(this._element), Ti(), fe(), !this._moving)) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t, n = Zn(this._element);
              this._startPoint = new C(e.clientX, e.clientY), this._startPos = Zt(this._element), this._parentScale = ki(n);
              var r = t.type === "mousedown";
              I(document, r ? "mousemove" : "touchmove", this._onMove, this), I(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(t) {
          if (this._enabled) {
            if (t.touches && t.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, n = new C(e.clientX, e.clientY)._subtract(this._startPoint);
            !n.x && !n.y || Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, J(t), this._moved || (this.fire("dragstart"), this._moved = !0, M(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), M(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = t, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var t = { originalEvent: this._lastEvent };
          this.fire("predrag", t), K(this._element, this._newPos), this.fire("drag", t);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(t) {
          q(document.body, "leaflet-dragging"), this._lastTarget && (q(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), U(document, "mousemove touchmove", this._onMove, this), U(document, "mouseup touchend touchcancel", this._onUp, this), Pi(), me();
          var e = this._moved && this._moving;
          this._moving = !1, Ct._dragging = !1, e && this.fire("dragend", {
            noInertia: t,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function Vn(t, e, n) {
        var r, a = [1, 4, 2, 8], l, u, g, v, x, T, S, z;
        for (l = 0, T = t.length; l < T; l++)
          t[l]._code = Wt(t[l], e);
        for (g = 0; g < 4; g++) {
          for (S = a[g], r = [], l = 0, T = t.length, u = T - 1; l < T; u = l++)
            v = t[l], x = t[u], v._code & S ? x._code & S || (z = Ze(x, v, S, e, n), z._code = Wt(z, e), r.push(z)) : (x._code & S && (z = Ze(x, v, S, e, n), z._code = Wt(z, e), r.push(z)), r.push(v));
          t = r;
        }
        return t;
      }
      function Yn(t, e) {
        var n, r, a, l, u, g, v, x, T;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        ht(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var S = O([0, 0]), z = G(t), tt = z.getNorthWest().distanceTo(z.getSouthWest()) * z.getNorthEast().distanceTo(z.getNorthWest());
        tt < 1700 && (S = Oi(t));
        var Y = t.length, ct = [];
        for (n = 0; n < Y; n++) {
          var rt = O(t[n]);
          ct.push(e.project(O([rt.lat - S.lat, rt.lng - S.lng])));
        }
        for (g = v = x = 0, n = 0, r = Y - 1; n < Y; r = n++)
          a = ct[n], l = ct[r], u = a.y * l.x - l.y * a.x, v += (a.x + l.x) * u, x += (a.y + l.y) * u, g += u * 3;
        g === 0 ? T = ct[0] : T = [v / g, x / g];
        var ne = e.unproject(A(T));
        return O([ne.lat + S.lat, ne.lng + S.lng]);
      }
      function Oi(t) {
        for (var e = 0, n = 0, r = 0, a = 0; a < t.length; a++) {
          var l = O(t[a]);
          e += l.lat, n += l.lng, r++;
        }
        return O([e / r, n / r]);
      }
      var Vs = {
        __proto__: null,
        clipPolygon: Vn,
        polygonCenter: Yn,
        centroid: Oi
      };
      function Xn(t, e) {
        if (!e || !t.length)
          return t.slice();
        var n = e * e;
        return t = Js(t, n), t = Xs(t, n), t;
      }
      function Jn(t, e, n) {
        return Math.sqrt(ye(t, e, n, !0));
      }
      function Ys(t, e, n) {
        return ye(t, e, n);
      }
      function Xs(t, e) {
        var n = t.length, r = typeof Uint8Array < "u" ? Uint8Array : Array, a = new r(n);
        a[0] = a[n - 1] = 1, Ri(t, a, e, 0, n - 1);
        var l, u = [];
        for (l = 0; l < n; l++)
          a[l] && u.push(t[l]);
        return u;
      }
      function Ri(t, e, n, r, a) {
        var l = 0, u, g, v;
        for (g = r + 1; g <= a - 1; g++)
          v = ye(t[g], t[r], t[a], !0), v > l && (u = g, l = v);
        l > n && (e[u] = 1, Ri(t, e, n, r, u), Ri(t, e, n, u, a));
      }
      function Js(t, e) {
        for (var n = [t[0]], r = 1, a = 0, l = t.length; r < l; r++)
          Qs(t[r], t[a]) > e && (n.push(t[r]), a = r);
        return a < l - 1 && n.push(t[l - 1]), n;
      }
      var Qn;
      function tr(t, e, n, r, a) {
        var l = r ? Qn : Wt(t, n), u = Wt(e, n), g, v, x;
        for (Qn = u; ; ) {
          if (!(l | u))
            return [t, e];
          if (l & u)
            return !1;
          g = l || u, v = Ze(t, e, g, n, a), x = Wt(v, n), g === l ? (t = v, l = x) : (e = v, u = x);
        }
      }
      function Ze(t, e, n, r, a) {
        var l = e.x - t.x, u = e.y - t.y, g = r.min, v = r.max, x, T;
        return n & 8 ? (x = t.x + l * (v.y - t.y) / u, T = v.y) : n & 4 ? (x = t.x + l * (g.y - t.y) / u, T = g.y) : n & 2 ? (x = v.x, T = t.y + u * (v.x - t.x) / l) : n & 1 && (x = g.x, T = t.y + u * (g.x - t.x) / l), new C(x, T, a);
      }
      function Wt(t, e) {
        var n = 0;
        return t.x < e.min.x ? n |= 1 : t.x > e.max.x && (n |= 2), t.y < e.min.y ? n |= 4 : t.y > e.max.y && (n |= 8), n;
      }
      function Qs(t, e) {
        var n = e.x - t.x, r = e.y - t.y;
        return n * n + r * r;
      }
      function ye(t, e, n, r) {
        var a = e.x, l = e.y, u = n.x - a, g = n.y - l, v = u * u + g * g, x;
        return v > 0 && (x = ((t.x - a) * u + (t.y - l) * g) / v, x > 1 ? (a = n.x, l = n.y) : x > 0 && (a += u * x, l += g * x)), u = t.x - a, g = t.y - l, r ? u * u + g * g : new C(a, l);
      }
      function ht(t) {
        return !dt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function er(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ht(t);
      }
      function ir(t, e) {
        var n, r, a, l, u, g, v, x;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        ht(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var T = O([0, 0]), S = G(t), z = S.getNorthWest().distanceTo(S.getSouthWest()) * S.getNorthEast().distanceTo(S.getNorthWest());
        z < 1700 && (T = Oi(t));
        var tt = t.length, Y = [];
        for (n = 0; n < tt; n++) {
          var ct = O(t[n]);
          Y.push(e.project(O([ct.lat - T.lat, ct.lng - T.lng])));
        }
        for (n = 0, r = 0; n < tt - 1; n++)
          r += Y[n].distanceTo(Y[n + 1]) / 2;
        if (r === 0)
          x = Y[0];
        else
          for (n = 0, l = 0; n < tt - 1; n++)
            if (u = Y[n], g = Y[n + 1], a = u.distanceTo(g), l += a, l > r) {
              v = (l - r) / a, x = [
                g.x - v * (g.x - u.x),
                g.y - v * (g.y - u.y)
              ];
              break;
            }
        var rt = e.unproject(A(x));
        return O([rt.lat + T.lat, rt.lng + T.lng]);
      }
      var ta = {
        __proto__: null,
        simplify: Xn,
        pointToSegmentDistance: Jn,
        closestPointOnSegment: Ys,
        clipSegment: tr,
        _getEdgeIntersection: Ze,
        _getBitCode: Wt,
        _sqClosestPointOnSegment: ye,
        isFlat: ht,
        _flat: er,
        polylineCenter: ir
      }, Ni = {
        project: function(t) {
          return new C(t.lng, t.lat);
        },
        unproject: function(t) {
          return new Z(t.y, t.x);
        },
        bounds: new W([-180, -90], [180, 90])
      }, Bi = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new W([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, n = this.R, r = t.lat * e, a = this.R_MINOR / n, l = Math.sqrt(1 - a * a), u = l * Math.sin(r), g = Math.tan(Math.PI / 4 - r / 2) / Math.pow((1 - u) / (1 + u), l / 2);
          return r = -n * Math.log(Math.max(g, 1e-10)), new C(t.lng * e * n, r);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, a = Math.sqrt(1 - r * r), l = Math.exp(-t.y / n), u = Math.PI / 2 - 2 * Math.atan(l), g = 0, v = 0.1, x; g < 15 && Math.abs(v) > 1e-7; g++)
            x = a * Math.sin(u), x = Math.pow((1 - x) / (1 + x), a / 2), v = Math.PI / 2 - 2 * Math.atan(l * x) - u, u += v;
          return new Z(u * e, t.x * e / n);
        }
      }, ea = {
        __proto__: null,
        LonLat: Ni,
        Mercator: Bi,
        SphericalMercator: di
      }, ia = h({}, At, {
        code: "EPSG:3395",
        projection: Bi,
        transformation: (function() {
          var t = 0.5 / (Math.PI * Bi.R);
          return ce(t, 0.5, -t, 0.5);
        })()
      }), nr = h({}, At, {
        code: "EPSG:4326",
        projection: Ni,
        transformation: ce(1 / 180, 1, -1 / 180, 0.5)
      }), na = h({}, Tt, {
        projection: Ni,
        transformation: ce(1, 0, -1, 0),
        scale: function(t) {
          return Math.pow(2, t);
        },
        zoom: function(t) {
          return Math.log(t) / Math.LN2;
        },
        distance: function(t, e) {
          var n = e.lng - t.lng, r = e.lat - t.lat;
          return Math.sqrt(n * n + r * r);
        },
        infinite: !0
      });
      Tt.Earth = At, Tt.EPSG3395 = ia, Tt.EPSG3857 = pi, Tt.EPSG900913 = hs, Tt.EPSG4326 = nr, Tt.Simple = na;
      var pt = he.extend({
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
              var n = this.getEvents();
              e.on(n, this), this.once("remove", function() {
                e.off(n, this);
              }, this);
            }
            this.onAdd(e), this.fire("add"), e.fire("layeradd", { layer: this });
          }
        }
      });
      R.include({
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
          for (var n in this._layers)
            t.call(e, this._layers[n]);
          return this;
        },
        _addLayers: function(t) {
          t = t ? dt(t) ? t : [t] : [];
          for (var e = 0, n = t.length; e < n; e++)
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
          var t = 1 / 0, e = -1 / 0, n = this._getZoomSpan();
          for (var r in this._zoomBoundLayers) {
            var a = this._zoomBoundLayers[r].options;
            t = a.minZoom === void 0 ? t : Math.min(t, a.minZoom), e = a.maxZoom === void 0 ? e : Math.max(e, a.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Jt = pt.extend({
        initialize: function(t, e) {
          N(this, e), this._layers = {};
          var n, r;
          if (t)
            for (n = 0, r = t.length; n < r; n++)
              this.addLayer(t[n]);
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
          var e = Array.prototype.slice.call(arguments, 1), n, r;
          for (n in this._layers)
            r = this._layers[n], r[t] && r[t].apply(r, e);
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
          for (var n in this._layers)
            t.call(e, this._layers[n]);
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
      }), ra = function(t, e) {
        return new Jt(t, e);
      }, Pt = Jt.extend({
        addLayer: function(t) {
          return this.hasLayer(t) ? this : (t.addEventParent(this), Jt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
        },
        removeLayer: function(t) {
          return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Jt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
            var n = this._layers[e];
            t.extend(n.getBounds ? n.getBounds() : n.getLatLng());
          }
          return t;
        }
      }), sa = function(t, e) {
        return new Pt(t, e);
      }, Qt = $t.extend({
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
          N(this, t);
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
          var n = this._getIconUrl(t);
          if (!n) {
            if (t === "icon")
              throw new Error("iconUrl not set in Icon options (see the docs).");
            return null;
          }
          var r = this._createImg(n, e && e.tagName === "IMG" ? e : null);
          return this._setIconStyles(r, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (r.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), r;
        },
        _setIconStyles: function(t, e) {
          var n = this.options, r = n[e + "Size"];
          typeof r == "number" && (r = [r, r]);
          var a = A(r), l = A(e === "shadow" && n.shadowAnchor || n.iconAnchor || a && a.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (n.className || ""), l && (t.style.marginLeft = -l.x + "px", t.style.marginTop = -l.y + "px"), a && (t.style.width = a.x + "px", t.style.height = a.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return E.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function aa(t) {
        return new Qt(t);
      }
      var be = Qt.extend({
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
          return typeof be.imagePath != "string" && (be.imagePath = this._detectIconPath()), (this.options.imagePath || be.imagePath) + Qt.prototype._getIconUrl.call(this, t);
        },
        _stripUrl: function(t) {
          var e = function(n, r, a) {
            var l = r.exec(n);
            return l && l[a];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = B("div", "leaflet-default-icon-path", document.body), e = pe(t, "background-image") || pe(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var n = document.querySelector('link[href$="leaflet.css"]');
          return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
        }
      }), rr = vt.extend({
        initialize: function(t) {
          this._marker = t;
        },
        addHooks: function() {
          var t = this._marker._icon;
          this._draggable || (this._draggable = new Ct(t, t, !0)), this._draggable.on({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).enable(), M(t, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && q(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(t) {
          var e = this._marker, n = e._map, r = this._marker.options.autoPanSpeed, a = this._marker.options.autoPanPadding, l = Zt(e._icon), u = n.getPixelBounds(), g = n.getPixelOrigin(), v = it(
            u.min._subtract(g).add(a),
            u.max._subtract(g).subtract(a)
          );
          if (!v.contains(l)) {
            var x = A(
              (Math.max(v.max.x, l.x) - v.max.x) / (u.max.x - v.max.x) - (Math.min(v.min.x, l.x) - v.min.x) / (u.min.x - v.min.x),
              (Math.max(v.max.y, l.y) - v.max.y) / (u.max.y - v.max.y) - (Math.min(v.min.y, l.y) - v.min.y) / (u.min.y - v.min.y)
            ).multiplyBy(r);
            n.panBy(x, { animate: !1 }), this._draggable._newPos._add(x), this._draggable._startPos._add(x), K(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = et(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (ot(this._panRequest), this._panRequest = et(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, n = e._shadow, r = Zt(e._icon), a = e._map.layerPointToLatLng(r);
          n && K(n, r), e._latlng = a, t.latlng = a, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          ot(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
        }
      }), Fe = pt.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new be(),
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
          N(this, e), this._latlng = O(t);
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
          var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = t.icon.createIcon(this._icon), r = !1;
          n !== this._icon && (this._icon && this._removeIcon(), r = !0, t.title && (n.title = t.title), n.tagName === "IMG" && (n.alt = t.alt || "")), M(n, e), t.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && I(n, "focus", this._panOnFocus, this);
          var a = t.icon.createShadow(this._shadow), l = !1;
          a !== this._shadow && (this._removeShadow(), l = !0), a && (M(a, e), a.alt = ""), this._shadow = a, t.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), a && l && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && U(this._icon, "focus", this._panOnFocus, this), H(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && H(this._shadow), this._shadow = null;
        },
        _setPos: function(t) {
          this._icon && K(this._icon, t), this._shadow && K(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(t) {
          this._icon && (this._icon.style.zIndex = this._zIndex + t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
          this._setPos(e);
        },
        _initInteraction: function() {
          if (this.options.interactive && (M(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), rr)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new rr(this), t && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(t) {
          return this.options.opacity = t, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var t = this.options.opacity;
          this._icon && lt(this._icon, t), this._shadow && lt(this._shadow, t);
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
            var e = this.options.icon.options, n = e.iconSize ? A(e.iconSize) : A(0, 0), r = e.iconAnchor ? A(e.iconAnchor) : A(0, 0);
            t.panInside(this._latlng, {
              paddingTopLeft: r,
              paddingBottomRight: n.subtract(r)
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
      function oa(t, e) {
        return new Fe(t, e);
      }
      var It = pt.extend({
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
          return N(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
      }), Ue = It.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(t, e) {
          N(this, e), this._latlng = O(t), this._radius = this.options.radius;
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
          return It.prototype.setStyle.call(this, t), this.setRadius(e), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var t = this._radius, e = this._radiusY || t, n = this._clickTolerance(), r = [t + n, e + n];
          this._pxBounds = new W(this._point.subtract(r), this._point.add(r));
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
      function la(t, e) {
        return new Ue(t, e);
      }
      var Zi = Ue.extend({
        initialize: function(t, e, n) {
          if (typeof e == "number" && (e = h({}, n, { radius: e })), N(this, e), this._latlng = O(t), isNaN(this.options.radius))
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
        setStyle: It.prototype.setStyle,
        _project: function() {
          var t = this._latlng.lng, e = this._latlng.lat, n = this._map, r = n.options.crs;
          if (r.distance === At.distance) {
            var a = Math.PI / 180, l = this._mRadius / At.R / a, u = n.project([e + l, t]), g = n.project([e - l, t]), v = u.add(g).divideBy(2), x = n.unproject(v).lat, T = Math.acos((Math.cos(l * a) - Math.sin(e * a) * Math.sin(x * a)) / (Math.cos(e * a) * Math.cos(x * a))) / a;
            (isNaN(T) || T === 0) && (T = l / Math.cos(Math.PI / 180 * e)), this._point = v.subtract(n.getPixelOrigin()), this._radius = isNaN(T) ? 0 : v.x - n.project([x, t - T]).x, this._radiusY = v.y - u.y;
          } else {
            var S = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(S).x;
          }
          this._updateBounds();
        }
      });
      function ha(t, e, n) {
        return new Zi(t, e, n);
      }
      var Et = It.extend({
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
          N(this, e), this._setLatLngs(t);
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
          for (var e = 1 / 0, n = null, r = ye, a, l, u = 0, g = this._parts.length; u < g; u++)
            for (var v = this._parts[u], x = 1, T = v.length; x < T; x++) {
              a = v[x - 1], l = v[x];
              var S = r(t, a, l, !0);
              S < e && (e = S, n = r(t, a, l));
            }
          return n && (n.distance = Math.sqrt(e)), n;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return ir(this._defaultShape(), this._map.options.crs);
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
          return ht(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(t) {
          for (var e = [], n = ht(t), r = 0, a = t.length; r < a; r++)
            n ? (e[r] = O(t[r]), this._bounds.extend(e[r])) : e[r] = this._convertLatLngs(t[r]);
          return e;
        },
        _project: function() {
          var t = new W();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
        },
        _updateBounds: function() {
          var t = this._clickTolerance(), e = new C(t, t);
          this._rawPxBounds && (this._pxBounds = new W([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(t, e, n) {
          var r = t[0] instanceof Z, a = t.length, l, u;
          if (r) {
            for (u = [], l = 0; l < a; l++)
              u[l] = this._map.latLngToLayerPoint(t[l]), n.extend(u[l]);
            e.push(u);
          } else
            for (l = 0; l < a; l++)
              this._projectLatlngs(t[l], e, n);
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var t = this._renderer._bounds;
          if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var e = this._parts, n, r, a, l, u, g, v;
            for (n = 0, a = 0, l = this._rings.length; n < l; n++)
              for (v = this._rings[n], r = 0, u = v.length; r < u - 1; r++)
                g = tr(v[r], v[r + 1], t, r, !0), g && (e[a] = e[a] || [], e[a].push(g[0]), (g[1] !== v[r + 1] || r === u - 2) && (e[a].push(g[1]), a++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var t = this._parts, e = this.options.smoothFactor, n = 0, r = t.length; n < r; n++)
            t[n] = Xn(t[n], e);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t, e) {
          var n, r, a, l, u, g, v = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (n = 0, l = this._parts.length; n < l; n++)
            for (g = this._parts[n], r = 0, u = g.length, a = u - 1; r < u; a = r++)
              if (!(!e && r === 0) && Jn(t, g[a], g[r]) <= v)
                return !0;
          return !1;
        }
      });
      function ca(t, e) {
        return new Et(t, e);
      }
      Et._flat = er;
      var te = Et.extend({
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
          return Yn(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(t) {
          var e = Et.prototype._convertLatLngs.call(this, t), n = e.length;
          return n >= 2 && e[0] instanceof Z && e[0].equals(e[n - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          Et.prototype._setLatLngs.call(this, t), ht(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return ht(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, n = new C(e, e);
          if (t = new W(t.min.subtract(n), t.max.add(n)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var r = 0, a = this._rings.length, l; r < a; r++)
              l = Vn(this._rings[r], t, !0), l.length && this._parts.push(l);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, n, r, a, l, u, g, v, x;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (l = 0, v = this._parts.length; l < v; l++)
            for (n = this._parts[l], u = 0, x = n.length, g = x - 1; u < x; g = u++)
              r = n[u], a = n[g], r.y > t.y != a.y > t.y && t.x < (a.x - r.x) * (t.y - r.y) / (a.y - r.y) + r.x && (e = !e);
          return e || Et.prototype._containsPoint.call(this, t, !0);
        }
      });
      function da(t, e) {
        return new te(t, e);
      }
      var St = Pt.extend({
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
          N(this, e), this._layers = {}, t && this.addData(t);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(t) {
          var e = dt(t) ? t : t.features, n, r, a;
          if (e) {
            for (n = 0, r = e.length; n < r; n++)
              a = e[n], (a.geometries || a.geometry || a.features || a.coordinates) && this.addData(a);
            return this;
          }
          var l = this.options;
          if (l.filter && !l.filter(t))
            return this;
          var u = We(t, l);
          return u ? (u.feature = je(t), u.defaultOptions = u.options, this.resetStyle(u), l.onEachFeature && l.onEachFeature(t, u), this.addLayer(u)) : this;
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
      function We(t, e) {
        var n = t.type === "Feature" ? t.geometry : t, r = n ? n.coordinates : null, a = [], l = e && e.pointToLayer, u = e && e.coordsToLatLng || Fi, g, v, x, T;
        if (!r && !n)
          return null;
        switch (n.type) {
          case "Point":
            return g = u(r), sr(l, t, g, e);
          case "MultiPoint":
            for (x = 0, T = r.length; x < T; x++)
              g = u(r[x]), a.push(sr(l, t, g, e));
            return new Pt(a);
          case "LineString":
          case "MultiLineString":
            return v = He(r, n.type === "LineString" ? 0 : 1, u), new Et(v, e);
          case "Polygon":
          case "MultiPolygon":
            return v = He(r, n.type === "Polygon" ? 1 : 2, u), new te(v, e);
          case "GeometryCollection":
            for (x = 0, T = n.geometries.length; x < T; x++) {
              var S = We({
                geometry: n.geometries[x],
                type: "Feature",
                properties: t.properties
              }, e);
              S && a.push(S);
            }
            return new Pt(a);
          case "FeatureCollection":
            for (x = 0, T = n.features.length; x < T; x++) {
              var z = We(n.features[x], e);
              z && a.push(z);
            }
            return new Pt(a);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function sr(t, e, n, r) {
        return t ? t(e, n) : new Fe(n, r && r.markersInheritOptions && r);
      }
      function Fi(t) {
        return new Z(t[1], t[0], t[2]);
      }
      function He(t, e, n) {
        for (var r = [], a = 0, l = t.length, u; a < l; a++)
          u = e ? He(t[a], e - 1, n) : (n || Fi)(t[a]), r.push(u);
        return r;
      }
      function Ui(t, e) {
        return t = O(t), t.alt !== void 0 ? [k(t.lng, e), k(t.lat, e), k(t.alt, e)] : [k(t.lng, e), k(t.lat, e)];
      }
      function qe(t, e, n, r) {
        for (var a = [], l = 0, u = t.length; l < u; l++)
          a.push(e ? qe(t[l], ht(t[l]) ? 0 : e - 1, n, r) : Ui(t[l], r));
        return !e && n && a.length > 0 && a.push(a[0].slice()), a;
      }
      function ee(t, e) {
        return t.feature ? h({}, t.feature, { geometry: e }) : je(e);
      }
      function je(t) {
        return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        };
      }
      var Wi = {
        toGeoJSON: function(t) {
          return ee(this, {
            type: "Point",
            coordinates: Ui(this.getLatLng(), t)
          });
        }
      };
      Fe.include(Wi), Zi.include(Wi), Ue.include(Wi), Et.include({
        toGeoJSON: function(t) {
          var e = !ht(this._latlngs), n = qe(this._latlngs, e ? 1 : 0, !1, t);
          return ee(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: n
          });
        }
      }), te.include({
        toGeoJSON: function(t) {
          var e = !ht(this._latlngs), n = e && !ht(this._latlngs[0]), r = qe(this._latlngs, n ? 2 : e ? 1 : 0, !0, t);
          return e || (r = [r]), ee(this, {
            type: (n ? "Multi" : "") + "Polygon",
            coordinates: r
          });
        }
      }), Jt.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(n) {
            e.push(n.toGeoJSON(t).geometry.coordinates);
          }), ee(this, {
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
          var n = e === "GeometryCollection", r = [];
          return this.eachLayer(function(a) {
            if (a.toGeoJSON) {
              var l = a.toGeoJSON(t);
              if (n)
                r.push(l.geometry);
              else {
                var u = je(l);
                u.type === "FeatureCollection" ? r.push.apply(r, u.features) : r.push(u);
              }
            }
          }), n ? ee(this, {
            geometries: r,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: r
          };
        }
      });
      function ar(t, e) {
        return new St(t, e);
      }
      var ua = ar, Ge = pt.extend({
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
        initialize: function(t, e, n) {
          this._url = t, this._bounds = G(e), N(this, n);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (M(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
        },
        onRemove: function() {
          H(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
          return this._map && Yt(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && Xt(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(t) {
          return this._url = t, this._image && (this._image.src = t), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(t) {
          return this._bounds = G(t), this._map && this._reset(), this;
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
          var t = this._url.tagName === "IMG", e = this._image = t ? this._url : B("img");
          if (M(e, "leaflet-image-layer"), this._zoomAnimated && M(e, "leaflet-zoom-animated"), this.options.className && M(e, this.options.className), e.onselectstart = y, e.onmousemove = y, e.onload = f(this.fire, this, "load"), e.onerror = f(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
            this._url = e.src;
            return;
          }
          e.src = this._url, e.alt = this.options.alt;
        },
        _animateZoom: function(t) {
          var e = this._map.getZoomScale(t.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
          Bt(this._image, n, e);
        },
        _reset: function() {
          var t = this._image, e = new W(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), n = e.getSize();
          K(t, e.min), t.style.width = n.x + "px", t.style.height = n.y + "px";
        },
        _updateOpacity: function() {
          lt(this._image, this.options.opacity);
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
      }), pa = function(t, e, n) {
        return new Ge(t, e, n);
      }, or = Ge.extend({
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
          var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : B("video");
          if (M(e, "leaflet-image-layer"), this._zoomAnimated && M(e, "leaflet-zoom-animated"), this.options.className && M(e, this.options.className), e.onselectstart = y, e.onmousemove = y, e.onloadeddata = f(this.fire, this, "load"), t) {
            for (var n = e.getElementsByTagName("source"), r = [], a = 0; a < n.length; a++)
              r.push(n[a].src);
            this._url = n.length > 0 ? r : [e.src];
            return;
          }
          dt(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
          for (var l = 0; l < this._url.length; l++) {
            var u = B("source");
            u.src = this._url[l], e.appendChild(u);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function fa(t, e, n) {
        return new or(t, e, n);
      }
      var lr = Ge.extend({
        _initImage: function() {
          var t = this._image = this._url;
          M(t, "leaflet-image-layer"), this._zoomAnimated && M(t, "leaflet-zoom-animated"), this.options.className && M(t, this.options.className), t.onselectstart = y, t.onmousemove = y;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function ma(t, e, n) {
        return new lr(t, e, n);
      }
      var yt = pt.extend({
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
          t && (t instanceof Z || dt(t)) ? (this._latlng = O(t), N(this, e)) : (N(this, t), this._source = e), this.options.content && (this._content = this.options.content);
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
          this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && lt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && lt(this._container, 1), this.bringToFront(), this.options.interactive && (M(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(t) {
          t._fadeAnimated ? (lt(this._container, 0), this._removeTimeout = setTimeout(f(H, void 0, this._container), 200)) : H(this._container), this.options.interactive && (q(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
          return this._map && Yt(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && Xt(this._container), this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(t) {
          var e = this._source;
          if (!e._map)
            return !1;
          if (e instanceof Pt) {
            e = null;
            var n = this._source._layers;
            for (var r in n)
              if (n[r]._map) {
                e = n[r];
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
            var t = this._map.latLngToLayerPoint(this._latlng), e = A(this.options.offset), n = this._getAnchor();
            this._zoomAnimated ? K(this._container, t.add(n)) : e = e.add(t).add(n);
            var r = this._containerBottom = -e.y, a = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = r + "px", this._container.style.left = a + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      R.include({
        _initOverlay: function(t, e, n, r) {
          var a = e;
          return a instanceof t || (a = new t(r).setContent(e)), n && a.setLatLng(n), a;
        }
      }), pt.include({
        _initOverlay: function(t, e, n, r) {
          var a = n;
          return a instanceof t ? (N(a, r), a._source = this) : (a = e && !r ? e : new t(r, this), a.setContent(n)), a;
        }
      });
      var Ke = yt.extend({
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
          return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, yt.prototype.openOn.call(this, t);
        },
        onAdd: function(t) {
          yt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof It || this._source.on("preclick", Ft));
        },
        onRemove: function(t) {
          yt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof It || this._source.off("preclick", Ft));
        },
        getEvents: function() {
          var t = yt.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
        },
        _initLayout: function() {
          var t = "leaflet-popup", e = this._container = B(
            "div",
            t + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), n = this._wrapper = B("div", t + "-content-wrapper", e);
          if (this._contentNode = B("div", t + "-content", n), _e(e), Ci(this._contentNode), I(e, "contextmenu", Ft), this._tipContainer = B("div", t + "-tip-container", e), this._tip = B("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var r = this._closeButton = B("a", t + "-close-button", e);
            r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = '<span aria-hidden="true">&#215;</span>', I(r, "click", function(a) {
              J(a), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var n = t.offsetWidth;
          n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), e.width = n + 1 + "px", e.whiteSpace = "", e.height = "";
          var r = t.offsetHeight, a = this.options.maxHeight, l = "leaflet-popup-scrolled";
          a && r > a ? (e.height = a + "px", M(t, l)) : q(t, l), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), n = this._getAnchor();
          K(this._container, e.add(n));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var t = this._map, e = parseInt(pe(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + e, r = this._containerWidth, a = new C(this._containerLeft, -n - this._containerBottom);
            a._add(Zt(this._container));
            var l = t.layerPointToContainerPoint(a), u = A(this.options.autoPanPadding), g = A(this.options.autoPanPaddingTopLeft || u), v = A(this.options.autoPanPaddingBottomRight || u), x = t.getSize(), T = 0, S = 0;
            l.x + r + v.x > x.x && (T = l.x + r - x.x + v.x), l.x - T - g.x < 0 && (T = l.x - g.x), l.y + n + v.y > x.y && (S = l.y + n - x.y + v.y), l.y - S - g.y < 0 && (S = l.y - g.y), (T || S) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([T, S]));
          }
        },
        _getAnchor: function() {
          return A(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), ga = function(t, e) {
        return new Ke(t, e);
      };
      R.mergeOptions({
        closePopupOnClick: !0
      }), R.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(t, e, n) {
          return this._initOverlay(Ke, t, e, n).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(t) {
          return t = arguments.length ? t : this._popup, t && t.close(), this;
        }
      }), pt.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(t, e) {
          return this._popup = this._initOverlay(Ke, this._popup, t, e), this._popupHandlersAdded || (this.on({
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
          return this._popup && (this instanceof Pt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
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
            Ut(t);
            var e = t.layer || t.target;
            if (this._popup._source === e && !(e instanceof It)) {
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
      var Ve = yt.extend({
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
          yt.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function(t) {
          yt.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function() {
          var t = yt.prototype.getEvents.call(this);
          return this.options.permanent || (t.preclick = this.close), t;
        },
        _initLayout: function() {
          var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = B("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + p(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(t) {
          var e, n, r = this._map, a = this._container, l = r.latLngToContainerPoint(r.getCenter()), u = r.layerPointToContainerPoint(t), g = this.options.direction, v = a.offsetWidth, x = a.offsetHeight, T = A(this.options.offset), S = this._getAnchor();
          g === "top" ? (e = v / 2, n = x) : g === "bottom" ? (e = v / 2, n = 0) : g === "center" ? (e = v / 2, n = x / 2) : g === "right" ? (e = 0, n = x / 2) : g === "left" ? (e = v, n = x / 2) : u.x < l.x ? (g = "right", e = 0, n = x / 2) : (g = "left", e = v + (T.x + S.x) * 2, n = x / 2), t = t.subtract(A(e, n, !0)).add(T).add(S), q(a, "leaflet-tooltip-right"), q(a, "leaflet-tooltip-left"), q(a, "leaflet-tooltip-top"), q(a, "leaflet-tooltip-bottom"), M(a, "leaflet-tooltip-" + g), K(a, t);
        },
        _updatePosition: function() {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function(t) {
          this.options.opacity = t, this._container && lt(this._container, t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
          this._setPosition(e);
        },
        _getAnchor: function() {
          return A(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), _a = function(t, e) {
        return new Ve(t, e);
      };
      R.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, n) {
          return this._initOverlay(Ve, t, e, n).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(t) {
          return t.close(), this;
        }
      }), pt.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(t, e) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Ve, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
        },
        // @method unbindTooltip(): this
        // Removes the tooltip previously bound with `bindTooltip`.
        unbindTooltip: function() {
          return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
        },
        _initTooltipInteractions: function(t) {
          if (!(!t && this._tooltipHandlersAdded)) {
            var e = t ? "off" : "on", n = {
              remove: this.closeTooltip,
              move: this._moveTooltip
            };
            this._tooltip.options.permanent ? n.add = this._openTooltip : (n.mouseover = this._openTooltip, n.mouseout = this.closeTooltip, n.click = this._openTooltip, this._map ? this._addFocusListeners() : n.add = this._addFocusListeners), this._tooltip.options.sticky && (n.mousemove = this._moveTooltip), this[e](n), this._tooltipHandlersAdded = !t;
          }
        },
        // @method openTooltip(latlng?: LatLng): this
        // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
        openTooltip: function(t) {
          return this._tooltip && (this instanceof Pt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
          e && (I(e, "focus", function() {
            this._tooltip._source = t, this.openTooltip();
          }, this), I(e, "blur", this.closeTooltip, this));
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
          var e = t.latlng, n, r;
          this._tooltip.options.sticky && t.originalEvent && (n = this._map.mouseEventToContainerPoint(t.originalEvent), r = this._map.containerPointToLayerPoint(n), e = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(e);
        }
      });
      var hr = Qt.extend({
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
          var e = t && t.tagName === "DIV" ? t : document.createElement("div"), n = this.options;
          if (n.html instanceof Element ? (ze(e), e.appendChild(n.html)) : e.innerHTML = n.html !== !1 ? n.html : "", n.bgPos) {
            var r = A(n.bgPos);
            e.style.backgroundPosition = -r.x + "px " + -r.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function va(t) {
        return new hr(t);
      }
      Qt.Default = be;
      var xe = pt.extend({
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
          updateWhenIdle: E.mobile,
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
          N(this, t);
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
        },
        beforeAdd: function(t) {
          t._addZoomLimit(this);
        },
        onRemove: function(t) {
          this._removeAllTiles(), H(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
        },
        // @method bringToFront: this
        // Brings the tile layer to the top of all tile layers.
        bringToFront: function() {
          return this._map && (Yt(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (Xt(this._container), this._setAutoZIndex(Math.min)), this;
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
          return this.options.updateWhenIdle || (this._onMove || (this._onMove = _(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
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
          for (var e = this.getPane().children, n = -t(-1 / 0, 1 / 0), r = 0, a = e.length, l; r < a; r++)
            l = e[r].style.zIndex, e[r] !== this._container && l && (n = t(n, +l));
          isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !E.ielt9) {
            lt(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, n = !1;
            for (var r in this._tiles) {
              var a = this._tiles[r];
              if (!(!a.current || !a.loaded)) {
                var l = Math.min(1, (t - a.loaded) / 200);
                lt(a.el, l), l < 1 ? e = !0 : (a.active ? n = !0 : this._onOpaqueTile(a), a.active = !0);
              }
            }
            n && !this._noPrune && this._pruneTiles(), e && (ot(this._fadeFrame), this._fadeFrame = et(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: y,
        _initContainer: function() {
          this._container || (this._container = B("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var t = this._tileZoom, e = this.options.maxZoom;
          if (t !== void 0) {
            for (var n in this._levels)
              n = Number(n), this._levels[n].el.children.length || n === t ? (this._levels[n].el.style.zIndex = e - Math.abs(t - n), this._onUpdateLevel(n)) : (H(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
            var r = this._levels[t], a = this._map;
            return r || (r = this._levels[t] = {}, r.el = B("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = e, r.origin = a.project(a.unproject(a.getPixelOrigin()), t).round(), r.zoom = t, this._setZoomTransform(r, a.getCenter(), a.getZoom()), y(r.el.offsetWidth), this._onCreateLevel(r)), this._level = r, r;
          }
        },
        _onUpdateLevel: y,
        _onRemoveLevel: y,
        _onCreateLevel: y,
        _pruneTiles: function() {
          if (this._map) {
            var t, e, n = this._map.getZoom();
            if (n > this.options.maxZoom || n < this.options.minZoom) {
              this._removeAllTiles();
              return;
            }
            for (t in this._tiles)
              e = this._tiles[t], e.retain = e.current;
            for (t in this._tiles)
              if (e = this._tiles[t], e.current && !e.active) {
                var r = e.coords;
                this._retainParent(r.x, r.y, r.z, r.z - 5) || this._retainChildren(r.x, r.y, r.z, r.z + 2);
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
            H(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(t, e, n, r) {
          var a = Math.floor(t / 2), l = Math.floor(e / 2), u = n - 1, g = new C(+a, +l);
          g.z = +u;
          var v = this._tileCoordsToKey(g), x = this._tiles[v];
          return x && x.active ? (x.retain = !0, !0) : (x && x.loaded && (x.retain = !0), u > r ? this._retainParent(a, l, u, r) : !1);
        },
        _retainChildren: function(t, e, n, r) {
          for (var a = 2 * t; a < 2 * t + 2; a++)
            for (var l = 2 * e; l < 2 * e + 2; l++) {
              var u = new C(a, l);
              u.z = n + 1;
              var g = this._tileCoordsToKey(u), v = this._tiles[g];
              if (v && v.active) {
                v.retain = !0;
                continue;
              } else v && v.loaded && (v.retain = !0);
              n + 1 < r && this._retainChildren(a, l, n + 1, r);
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
        _setView: function(t, e, n, r) {
          var a = Math.round(e);
          this.options.maxZoom !== void 0 && a > this.options.maxZoom || this.options.minZoom !== void 0 && a < this.options.minZoom ? a = void 0 : a = this._clampZoom(a);
          var l = this.options.updateWhenZooming && a !== this._tileZoom;
          (!r || l) && (this._tileZoom = a, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), a !== void 0 && this._update(t), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var n in this._levels)
            this._setZoomTransform(this._levels[n], t, e);
        },
        _setZoomTransform: function(t, e, n) {
          var r = this._map.getZoomScale(n, t.zoom), a = t.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(e, n)).round();
          E.any3d ? Bt(t.el, a, r) : K(t.el, a);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, a = this._map.getPixelWorldBounds(this._tileZoom);
          a && (this._globalTileRange = this._pxBoundsToTileRange(a)), this._wrapX = e.wrapLng && !this.options.noWrap && [
            Math.floor(t.project([0, e.wrapLng[0]], r).x / n.x),
            Math.ceil(t.project([0, e.wrapLng[1]], r).x / n.y)
          ], this._wrapY = e.wrapLat && !this.options.noWrap && [
            Math.floor(t.project([e.wrapLat[0], 0], r).y / n.x),
            Math.ceil(t.project([e.wrapLat[1], 0], r).y / n.y)
          ];
        },
        _onMoveEnd: function() {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function(t) {
          var e = this._map, n = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), r = e.getZoomScale(n, this._tileZoom), a = e.project(t, this._tileZoom).floor(), l = e.getSize().divideBy(r * 2);
          return new W(a.subtract(l), a.add(l));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var n = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var r = this._getTiledPixelBounds(t), a = this._pxBoundsToTileRange(r), l = a.getCenter(), u = [], g = this.options.keepBuffer, v = new W(
                a.getBottomLeft().subtract([g, -g]),
                a.getTopRight().add([g, -g])
              );
              if (!(isFinite(a.min.x) && isFinite(a.min.y) && isFinite(a.max.x) && isFinite(a.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var x in this._tiles) {
                var T = this._tiles[x].coords;
                (T.z !== this._tileZoom || !v.contains(new C(T.x, T.y))) && (this._tiles[x].current = !1);
              }
              if (Math.abs(n - this._tileZoom) > 1) {
                this._setView(t, n);
                return;
              }
              for (var S = a.min.y; S <= a.max.y; S++)
                for (var z = a.min.x; z <= a.max.x; z++) {
                  var tt = new C(z, S);
                  if (tt.z = this._tileZoom, !!this._isValidTile(tt)) {
                    var Y = this._tiles[this._tileCoordsToKey(tt)];
                    Y ? Y.current = !0 : u.push(tt);
                  }
                }
              if (u.sort(function(rt, ne) {
                return rt.distanceTo(l) - ne.distanceTo(l);
              }), u.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var ct = document.createDocumentFragment();
                for (z = 0; z < u.length; z++)
                  this._addTile(u[z], ct);
                this._level.el.appendChild(ct);
              }
            }
          }
        },
        _isValidTile: function(t) {
          var e = this._map.options.crs;
          if (!e.infinite) {
            var n = this._globalTileRange;
            if (!e.wrapLng && (t.x < n.min.x || t.x > n.max.x) || !e.wrapLat && (t.y < n.min.y || t.y > n.max.y))
              return !1;
          }
          if (!this.options.bounds)
            return !0;
          var r = this._tileCoordsToBounds(t);
          return G(this.options.bounds).overlaps(r);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, n = this.getTileSize(), r = t.scaleBy(n), a = r.add(n), l = e.unproject(r, t.z), u = e.unproject(a, t.z);
          return [l, u];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(t) {
          var e = this._tileCoordsToNwSe(t), n = new nt(e[0], e[1]);
          return this.options.noWrap || (n = this._map.wrapLatLngBounds(n)), n;
        },
        // converts tile coordinates to key for the tile cache
        _tileCoordsToKey: function(t) {
          return t.x + ":" + t.y + ":" + t.z;
        },
        // converts tile cache key to coordinates
        _keyToTileCoords: function(t) {
          var e = t.split(":"), n = new C(+e[0], +e[1]);
          return n.z = +e[2], n;
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          e && (H(e.el), delete this._tiles[t], this.fire("tileunload", {
            tile: e.el,
            coords: this._keyToTileCoords(t)
          }));
        },
        _initTile: function(t) {
          M(t, "leaflet-tile");
          var e = this.getTileSize();
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = y, t.onmousemove = y, E.ielt9 && this.options.opacity < 1 && lt(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var n = this._getTilePos(t), r = this._tileCoordsToKey(t), a = this.createTile(this._wrapCoords(t), f(this._tileReady, this, t));
          this._initTile(a), this.createTile.length < 2 && et(f(this._tileReady, this, t, null, a)), K(a, n), this._tiles[r] = {
            el: a,
            coords: t,
            current: !0
          }, e.appendChild(a), this.fire("tileloadstart", {
            tile: a,
            coords: t
          });
        },
        _tileReady: function(t, e, n) {
          e && this.fire("tileerror", {
            error: e,
            tile: n,
            coords: t
          });
          var r = this._tileCoordsToKey(t);
          n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (lt(n.el, 0), ot(this._fadeFrame), this._fadeFrame = et(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), e || (M(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: n.el,
            coords: t
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), E.ielt9 || !this._map._fadeAnimated ? et(this._pruneTiles, this) : setTimeout(f(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(t) {
          return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(t) {
          var e = new C(
            this._wrapX ? w(t.x, this._wrapX) : t.x,
            this._wrapY ? w(t.y, this._wrapY) : t.y
          );
          return e.z = t.z, e;
        },
        _pxBoundsToTileRange: function(t) {
          var e = this.getTileSize();
          return new W(
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
      function ya(t) {
        return new xe(t);
      }
      var ie = xe.extend({
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
          this._url = t, e = N(this, e), e.detectRetina && E.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
          var n = document.createElement("img");
          return I(n, "load", f(this._tileOnLoad, this, e, n)), I(n, "error", f(this._tileOnError, this, e, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(t), n;
        },
        // @section Extension methods
        // @uninheritable
        // Layers extending `TileLayer` might reimplement the following method.
        // @method getTileUrl(coords: Object): String
        // Called only internally, returns the URL for a tile given its coordinates.
        // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
        getTileUrl: function(t) {
          var e = {
            r: E.retina ? "@2x" : "",
            s: this._getSubdomain(t),
            x: t.x,
            y: t.y,
            z: this._getZoomForUrl()
          };
          if (this._map && !this._map.options.crs.infinite) {
            var n = this._globalTileRange.max.y - t.y;
            this.options.tms && (e.y = n), e["-y"] = n;
          }
          return dn(this._url, h(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          E.ielt9 ? setTimeout(f(t, this, null, e), 0) : t(null, e);
        },
        _tileOnError: function(t, e, n) {
          var r = this.options.errorTileUrl;
          r && e.getAttribute("src") !== r && (e.src = r), t(n, e);
        },
        _onTileRemove: function(t) {
          t.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var t = this._tileZoom, e = this.options.maxZoom, n = this.options.zoomReverse, r = this.options.zoomOffset;
          return n && (t = e - t), t + r;
        },
        _getSubdomain: function(t) {
          var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
          return this.options.subdomains[e];
        },
        // stops loading all tiles in the background layer
        _abortLoading: function() {
          var t, e;
          for (t in this._tiles)
            if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = y, e.onerror = y, !e.complete)) {
              e.src = Ce;
              var n = this._tiles[t].coords;
              H(e), delete this._tiles[t], this.fire("tileabort", {
                tile: e,
                coords: n
              });
            }
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          if (e)
            return e.el.setAttribute("src", Ce), xe.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, n) {
          if (!(!this._map || n && n.getAttribute("src") === Ce))
            return xe.prototype._tileReady.call(this, t, e, n);
        }
      });
      function cr(t, e) {
        return new ie(t, e);
      }
      var dr = ie.extend({
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
          var n = h({}, this.defaultWmsParams);
          for (var r in e)
            r in this.options || (n[r] = e[r]);
          e = N(this, e);
          var a = e.detectRetina && E.retina ? 2 : 1, l = this.getTileSize();
          n.width = l.x * a, n.height = l.y * a, this.wmsParams = n;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, ie.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), n = this._crs, r = it(n.project(e[0]), n.project(e[1])), a = r.min, l = r.max, u = (this._wmsVersion >= 1.3 && this._crs === nr ? [a.y, a.x, l.y, l.x] : [a.x, a.y, l.x, l.y]).join(","), g = ie.prototype.getTileUrl.call(this, t);
          return g + at(this.wmsParams, g, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + u;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return h(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function ba(t, e) {
        return new dr(t, e);
      }
      ie.WMS = dr, cr.wms = ba;
      var kt = pt.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(t) {
          N(this, t), p(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), M(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
          var n = this._map.getZoomScale(e, this._zoom), r = this._map.getSize().multiplyBy(0.5 + this.options.padding), a = this._map.project(this._center, e), l = r.multiplyBy(-n).add(a).subtract(this._map._getNewPixelOrigin(t, e));
          E.any3d ? Bt(this._container, l, n) : K(this._container, l);
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
          var t = this.options.padding, e = this._map.getSize(), n = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
          this._bounds = new W(n, n.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), ur = kt.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var t = kt.prototype.getEvents.call(this);
          return t.viewprereset = this._onViewPreReset, t;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          kt.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var t = this._container = document.createElement("canvas");
          I(t, "mousemove", this._onMouseMove, this), I(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), I(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
        },
        _destroyContainer: function() {
          ot(this._redrawRequest), delete this._ctx, H(this._container), U(this._container), delete this._container;
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
            kt.prototype._update.call(this);
            var t = this._bounds, e = this._container, n = t.getSize(), r = E.retina ? 2 : 1;
            K(e, t.min), e.width = r * n.x, e.height = r * n.y, e.style.width = n.x + "px", e.style.height = n.y + "px", E.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
          }
        },
        _reset: function() {
          kt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
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
          var e = t._order, n = e.next, r = e.prev;
          n ? n.prev = r : this._drawLast = r, r ? r.next = n : this._drawFirst = n, delete t._order, delete this._layers[p(t)], this._requestRedraw(t);
        },
        _updatePath: function(t) {
          this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
        },
        _updateStyle: function(t) {
          this._updateDashArray(t), this._requestRedraw(t);
        },
        _updateDashArray: function(t) {
          if (typeof t.options.dashArray == "string") {
            var e = t.options.dashArray.split(/[, ]+/), n = [], r, a;
            for (a = 0; a < e.length; a++) {
              if (r = Number(e[a]), isNaN(r))
                return;
              n.push(r);
            }
            t.options._dashArray = n;
          } else
            t.options._dashArray = t.options.dashArray;
        },
        _requestRedraw: function(t) {
          this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || et(this._redraw, this));
        },
        _extendRedrawBounds: function(t) {
          if (t._pxBounds) {
            var e = (t.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new W(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
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
            var n = e.getSize();
            this._ctx.beginPath(), this._ctx.rect(e.min.x, e.min.y, n.x, n.y), this._ctx.clip();
          }
          this._drawing = !0;
          for (var r = this._drawFirst; r; r = r.next)
            t = r.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
          this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(t, e) {
          if (this._drawing) {
            var n, r, a, l, u = t._parts, g = u.length, v = this._ctx;
            if (g) {
              for (v.beginPath(), n = 0; n < g; n++) {
                for (r = 0, a = u[n].length; r < a; r++)
                  l = u[n][r], v[r ? "lineTo" : "moveTo"](l.x, l.y);
                e && v.closePath();
              }
              this._fillStroke(v, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, n = this._ctx, r = Math.max(Math.round(t._radius), 1), a = (Math.max(Math.round(t._radiusY), 1) || r) / r;
            a !== 1 && (n.save(), n.scale(1, a)), n.beginPath(), n.arc(e.x, e.y / a, r, 0, Math.PI * 2, !1), a !== 1 && n.restore(), this._fillStroke(n, t);
          }
        },
        _fillStroke: function(t, e) {
          var n = e.options;
          n.fill && (t.globalAlpha = n.fillOpacity, t.fillStyle = n.fillColor || n.color, t.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = n.opacity, t.lineWidth = n.weight, t.strokeStyle = n.color, t.lineCap = n.lineCap, t.lineJoin = n.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), n, r, a = this._drawFirst; a; a = a.next)
            n = a.layer, n.options.interactive && n._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(n)) && (r = n);
          this._fireEvent(r ? [r] : !1, t);
        },
        _onMouseMove: function(t) {
          if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
            var e = this._map.mouseEventToLayerPoint(t);
            this._handleMouseHover(t, e);
          }
        },
        _handleMouseOut: function(t) {
          var e = this._hoveredLayer;
          e && (q(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var n, r, a = this._drawFirst; a; a = a.next)
              n = a.layer, n.options.interactive && n._containsPoint(e) && (r = n);
            r !== this._hoveredLayer && (this._handleMouseOut(t), r && (M(this._container, "leaflet-interactive"), this._fireEvent([r], t, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(f(function() {
              this._mouseHoverThrottled = !1;
            }, this), 32);
          }
        },
        _fireEvent: function(t, e, n) {
          this._map._fireDOMEvent(e, n || e.type, t);
        },
        _bringToFront: function(t) {
          var e = t._order;
          if (e) {
            var n = e.next, r = e.prev;
            if (n)
              n.prev = r;
            else
              return;
            r ? r.next = n : n && (this._drawFirst = n), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
          }
        },
        _bringToBack: function(t) {
          var e = t._order;
          if (e) {
            var n = e.next, r = e.prev;
            if (r)
              r.next = n;
            else
              return;
            n ? n.prev = r : r && (this._drawLast = r), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
          }
        }
      });
      function pr(t) {
        return E.canvas ? new ur(t) : null;
      }
      var we = (function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
            return document.createElement("<lvml:" + t + ' class="lvml">');
          };
        } catch {
        }
        return function(t) {
          return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })(), xa = {
        _initContainer: function() {
          this._container = B("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (kt.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(t) {
          var e = t._container = we("shape");
          M(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = we("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[p(t)] = t;
        },
        _addPath: function(t) {
          var e = t._container;
          this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
        },
        _removePath: function(t) {
          var e = t._container;
          H(e), t.removeInteractiveTarget(e), delete this._layers[p(t)];
        },
        _updateStyle: function(t) {
          var e = t._stroke, n = t._fill, r = t.options, a = t._container;
          a.stroked = !!r.stroke, a.filled = !!r.fill, r.stroke ? (e || (e = t._stroke = we("stroke")), a.appendChild(e), e.weight = r.weight + "px", e.color = r.color, e.opacity = r.opacity, r.dashArray ? e.dashStyle = dt(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = r.lineCap.replace("butt", "flat"), e.joinstyle = r.lineJoin) : e && (a.removeChild(e), t._stroke = null), r.fill ? (n || (n = t._fill = we("fill")), a.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (a.removeChild(n), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), n = Math.round(t._radius), r = Math.round(t._radiusY || n);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + n + "," + r + " 0," + 65535 * 360);
        },
        _setPath: function(t, e) {
          t._path.v = e;
        },
        _bringToFront: function(t) {
          Yt(t._container);
        },
        _bringToBack: function(t) {
          Xt(t._container);
        }
      }, Ye = E.vml ? we : _n, $e = kt.extend({
        _initContainer: function() {
          this._container = Ye("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Ye("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          H(this._container), U(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            kt.prototype._update.call(this);
            var t = this._bounds, e = t.getSize(), n = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, n.setAttribute("width", e.x), n.setAttribute("height", e.y)), K(n, t.min), n.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(t) {
          var e = t._path = Ye("path");
          t.options.className && M(e, t.options.className), t.options.interactive && M(e, "leaflet-interactive"), this._updateStyle(t), this._layers[p(t)] = t;
        },
        _addPath: function(t) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
        },
        _removePath: function(t) {
          H(t._path), t.removeInteractiveTarget(t._path), delete this._layers[p(t)];
        },
        _updatePath: function(t) {
          t._project(), t._update();
        },
        _updateStyle: function(t) {
          var e = t._path, n = t.options;
          e && (n.stroke ? (e.setAttribute("stroke", n.color), e.setAttribute("stroke-opacity", n.opacity), e.setAttribute("stroke-width", n.weight), e.setAttribute("stroke-linecap", n.lineCap), e.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? e.setAttribute("stroke-dasharray", n.dashArray) : e.removeAttribute("stroke-dasharray"), n.dashOffset ? e.setAttribute("stroke-dashoffset", n.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), n.fill ? (e.setAttribute("fill", n.fillColor || n.color), e.setAttribute("fill-opacity", n.fillOpacity), e.setAttribute("fill-rule", n.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
        },
        _updatePoly: function(t, e) {
          this._setPath(t, vn(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, n = Math.max(Math.round(t._radius), 1), r = Math.max(Math.round(t._radiusY), 1) || n, a = "a" + n + "," + r + " 0 1,0 ", l = t._empty() ? "M0 0" : "M" + (e.x - n) + "," + e.y + a + n * 2 + ",0 " + a + -n * 2 + ",0 ";
          this._setPath(t, l);
        },
        _setPath: function(t, e) {
          t._path.setAttribute("d", e);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(t) {
          Yt(t._path);
        },
        _bringToBack: function(t) {
          Xt(t._path);
        }
      });
      E.vml && $e.include(xa);
      function fr(t) {
        return E.svg || E.vml ? new $e(t) : null;
      }
      R.include({
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
          return this.options.preferCanvas && pr(t) || fr(t);
        }
      });
      var mr = te.extend({
        initialize: function(t, e) {
          te.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(t) {
          return this.setLatLngs(this._boundsToLatLngs(t));
        },
        _boundsToLatLngs: function(t) {
          return t = G(t), [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast()
          ];
        }
      });
      function wa(t, e) {
        return new mr(t, e);
      }
      $e.create = Ye, $e.pointsToPath = vn, St.geometryToLayer = We, St.coordsToLatLng = Fi, St.coordsToLatLngs = He, St.latLngToCoords = Ui, St.latLngsToCoords = qe, St.getFeature = ee, St.asFeature = je, R.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var gr = vt.extend({
        initialize: function(t) {
          this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
        },
        addHooks: function() {
          I(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          U(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          H(this._pane), delete this._pane;
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
          this._clearDeferredResetState(), this._resetState(), fe(), Ti(), this._startPoint = this._map.mouseEventToContainerPoint(t), I(document, {
            contextmenu: Ut,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(t) {
          this._moved || (this._moved = !0, this._box = B("div", "leaflet-zoom-box", this._container), M(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
          var e = new W(this._point, this._startPoint), n = e.getSize();
          K(this._box, e.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
        },
        _finish: function() {
          this._moved && (H(this._box), q(this._container, "leaflet-crosshair")), me(), Pi(), U(document, {
            contextmenu: Ut,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(t) {
          if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(f(this._resetState, this), 0);
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
      R.addInitHook("addHandler", "boxZoom", gr), R.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var _r = vt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, n = e.getZoom(), r = e.options.zoomDelta, a = t.originalEvent.shiftKey ? n - r : n + r;
          e.options.doubleClickZoom === "center" ? e.setZoom(a) : e.setZoomAround(t.containerPoint, a);
        }
      });
      R.addInitHook("addHandler", "doubleClickZoom", _r), R.mergeOptions({
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
      var vr = vt.extend({
        addHooks: function() {
          if (!this._draggable) {
            var t = this._map;
            this._draggable = new Ct(t._mapPane, t._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
          }
          M(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          q(this._map._container, "leaflet-grab"), q(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
            var e = G(this._map.options.maxBounds);
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
            var e = this._lastTime = +/* @__PURE__ */ new Date(), n = this._lastPos = this._draggable._absPos || this._draggable._newPos;
            this._positions.push(n), this._times.push(e), this._prunePositions(e);
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
          var t = this._worldWidth, e = Math.round(t / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, a = (r - e + n) % t + e - n, l = (r + e + n) % t - e - n, u = Math.abs(a + n) < Math.abs(l + n) ? a : l;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = u;
        },
        _onDragEnd: function(t) {
          var e = this._map, n = e.options, r = !n.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), r)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var a = this._lastPos.subtract(this._positions[0]), l = (this._lastTime - this._times[0]) / 1e3, u = n.easeLinearity, g = a.multiplyBy(u / l), v = g.distanceTo([0, 0]), x = Math.min(n.inertiaMaxSpeed, v), T = g.multiplyBy(x / v), S = x / (n.inertiaDeceleration * u), z = T.multiplyBy(-S / 2).round();
            !z.x && !z.y ? e.fire("moveend") : (z = e._limitOffset(z, e.options.maxBounds), et(function() {
              e.panBy(z, {
                duration: S,
                easeLinearity: u,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      R.addInitHook("addHandler", "dragging", vr), R.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var yr = vt.extend({
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
          t.tabIndex <= 0 && (t.tabIndex = "0"), I(t, {
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
            var t = document.body, e = document.documentElement, n = t.scrollTop || e.scrollTop, r = t.scrollLeft || e.scrollLeft;
            this._map._container.focus(), window.scrollTo(r, n);
          }
        },
        _onFocus: function() {
          this._focused = !0, this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = !1, this._map.fire("blur");
        },
        _setPanDelta: function(t) {
          var e = this._panKeys = {}, n = this.keyCodes, r, a;
          for (r = 0, a = n.left.length; r < a; r++)
            e[n.left[r]] = [-1 * t, 0];
          for (r = 0, a = n.right.length; r < a; r++)
            e[n.right[r]] = [t, 0];
          for (r = 0, a = n.down.length; r < a; r++)
            e[n.down[r]] = [0, t];
          for (r = 0, a = n.up.length; r < a; r++)
            e[n.up[r]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, n = this.keyCodes, r, a;
          for (r = 0, a = n.zoomIn.length; r < a; r++)
            e[n.zoomIn[r]] = t;
          for (r = 0, a = n.zoomOut.length; r < a; r++)
            e[n.zoomOut[r]] = -t;
        },
        _addHooks: function() {
          I(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          U(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, n = this._map, r;
            if (e in this._panKeys) {
              if (!n._panAnim || !n._panAnim._inProgress)
                if (r = this._panKeys[e], t.shiftKey && (r = A(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(A(r), n.options.maxBounds)), n.options.worldCopyJump) {
                  var a = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
                  n.panTo(a);
                } else
                  n.panBy(r);
            } else if (e in this._zoomKeys)
              n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
            else if (e === 27 && n._popup && n._popup.options.closeOnEscapeKey)
              n.closePopup();
            else
              return;
            Ut(t);
          }
        }
      });
      R.addInitHook("addHandler", "keyboard", yr), R.mergeOptions({
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
      var br = vt.extend({
        addHooks: function() {
          I(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          U(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = Hn(t), n = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(f(this._performZoom, this), r), Ut(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), n = this._map.options.zoomSnap || 0;
          t._stop();
          var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), a = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, l = n ? Math.ceil(a / n) * n : a, u = t._limitZoom(e + (this._delta > 0 ? l : -l)) - e;
          this._delta = 0, this._startTime = null, u && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + u) : t.setZoomAround(this._lastMousePos, e + u));
        }
      });
      R.addInitHook("addHandler", "scrollWheelZoom", br);
      var $a = 600;
      R.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: E.touchNative && E.safari && E.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var xr = vt.extend({
        addHooks: function() {
          I(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          U(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(t) {
          if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
            var e = t.touches[0];
            this._startPos = this._newPos = new C(e.clientX, e.clientY), this._holdTimeout = setTimeout(f(function() {
              this._cancel(), this._isTapValid() && (I(document, "touchend", J), I(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
            }, this), $a), I(document, "touchend touchcancel contextmenu", this._cancel, this), I(document, "touchmove", this._onMove, this);
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
          this._newPos = new C(e.clientX, e.clientY);
        },
        _isTapValid: function() {
          return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
        },
        _simulateEvent: function(t, e) {
          var n = new MouseEvent(t, {
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
          n._simulated = !0, e.target.dispatchEvent(n);
        }
      });
      R.addInitHook("addHandler", "tapHold", xr), R.mergeOptions({
        // @section Touch interaction options
        // @option touchZoom: Boolean|String = *
        // Whether the map can be zoomed by touch-dragging with two fingers. If
        // passed `'center'`, it will zoom to the center of the view regardless of
        // where the touch events (fingers) were. Enabled for touch-capable web
        // browsers.
        touchZoom: E.touch,
        // @option bounceAtZoomLimits: Boolean = true
        // Set it to false if you don't want the map to zoom beyond min/max zoom
        // and then bounce back when pinch-zooming.
        bounceAtZoomLimits: !0
      });
      var wr = vt.extend({
        addHooks: function() {
          M(this._map._container, "leaflet-touch-zoom"), I(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          q(this._map._container, "leaflet-touch-zoom"), U(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var n = e.mouseEventToContainerPoint(t.touches[0]), r = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), I(document, "touchmove", this._onTouchMove, this), I(document, "touchend touchcancel", this._onTouchEnd, this), J(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, n = e.mouseEventToContainerPoint(t.touches[0]), r = e.mouseEventToContainerPoint(t.touches[1]), a = n.distanceTo(r) / this._startDist;
            if (this._zoom = e.getScaleZoom(a, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && a < 1 || this._zoom > e.getMaxZoom() && a > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, a === 1)
                return;
            } else {
              var l = n._add(r)._divideBy(2)._subtract(this._centerPoint);
              if (a === 1 && l.x === 0 && l.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(l), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), ot(this._animRequest);
            var u = f(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = et(u, this, !0), J(t);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, ot(this._animRequest), U(document, "touchmove", this._onTouchMove, this), U(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      R.addInitHook("addHandler", "touchZoom", wr), R.BoxZoom = gr, R.DoubleClickZoom = _r, R.Drag = vr, R.Keyboard = yr, R.ScrollWheelZoom = br, R.TapHold = xr, R.TouchZoom = wr, s.Bounds = W, s.Browser = E, s.CRS = Tt, s.Canvas = ur, s.Circle = Zi, s.CircleMarker = Ue, s.Class = $t, s.Control = ut, s.DivIcon = hr, s.DivOverlay = yt, s.DomEvent = Fs, s.DomUtil = Bs, s.Draggable = Ct, s.Evented = he, s.FeatureGroup = Pt, s.GeoJSON = St, s.GridLayer = xe, s.Handler = vt, s.Icon = Qt, s.ImageOverlay = Ge, s.LatLng = Z, s.LatLngBounds = nt, s.Layer = pt, s.LayerGroup = Jt, s.LineUtil = ta, s.Map = R, s.Marker = Fe, s.Mixin = Ks, s.Path = It, s.Point = C, s.PolyUtil = Vs, s.Polygon = te, s.Polyline = Et, s.Popup = Ke, s.PosAnimation = qn, s.Projection = ea, s.Rectangle = mr, s.Renderer = kt, s.SVG = $e, s.SVGOverlay = lr, s.TileLayer = ie, s.Tooltip = Ve, s.Transformation = ui, s.Util = os, s.VideoOverlay = or, s.bind = f, s.bounds = it, s.canvas = pr, s.circle = ha, s.circleMarker = la, s.control = ve, s.divIcon = va, s.extend = h, s.featureGroup = sa, s.geoJSON = ar, s.geoJson = ua, s.gridLayer = ya, s.icon = aa, s.imageOverlay = pa, s.latLng = O, s.latLngBounds = G, s.layerGroup = ra, s.map = Us, s.marker = oa, s.point = A, s.polygon = da, s.polyline = ca, s.popup = ga, s.rectangle = wa, s.setOptions = N, s.stamp = p, s.svg = fr, s.svgOverlay = ma, s.tileLayer = cr, s.tooltip = _a, s.transformation = ce, s.version = o, s.videoOverlay = fa;
      var Ta = window.L;
      s.noConflict = function() {
        return window.L = Ta, this;
      }, window.L = s;
    }));
  })(Pe, Pe.exports)), Pe.exports;
}
var ft = Fo();
const Uo = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function Wo(c) {
  return [...c].sort((i, s) => {
    const o = i.started_at ? Date.parse(i.started_at) : Number.POSITIVE_INFINITY, h = s.started_at ? Date.parse(s.started_at) : Number.POSITIVE_INFINITY;
    return o !== h ? o - h : i.id.localeCompare(s.id);
  });
}
const qr = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], Ho = Uo.replace(/\s+/g, " ").trim();
function ti(c, i) {
  return typeof c == "number" && typeof i == "number" && Number.isFinite(c) && Number.isFinite(i) && c >= -90 && c <= 90 && i >= -180 && i <= 180;
}
function tn(c) {
  return ti(c?.latitude, c?.longitude);
}
class ss extends Nt {
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
  onActiveTripChanged = (i) => {
    const s = i.detail;
    s?.vehicleId !== this.vehicleId || s.tripId === this.selectedTripId || (this.selectedTripId = s.tripId, this.selectedDriveIds = [], this.driveSelectionInitialized = !1, this.refresh(!0));
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(xt, this.onActiveTripChanged), this.driveSectionsOpen = typeof window < "u" && window.matchMedia("(min-width: 700px)").matches, this.refresh(!0);
  }
  disconnectedCallback() {
    this.map?.remove(), this.map = void 0, this.tileLayer = void 0, window.removeEventListener(xt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh(!0);
  }
  onConfigChanged() {
    this.tileLayer?.remove(), this.tileLayer = void 0, this.tileError = !1, this.fitMapPending = !0, this.refresh(!0);
  }
  async refresh(i = !1) {
    if (!(!this.hass || !this.vehicleId)) {
      this.fitMapPending ||= i, this.loading = !0, this.error = "", this.requestUpdate();
      try {
        const s = await ai(this.hass);
        this.vehicleName = s.find((p) => p.vehicle_id === this.vehicleId)?.name ?? "";
        const o = await Ot(this.hass, this.vehicleId);
        this.mapConfig = o.map_config, this.trips = o.trips;
        const h = this.config.trip_id ?? "", d = oi(this.vehicleId);
        h && this.trips.some((p) => p.id === h) ? this.selectedTripId = h : d && this.trips.some((p) => p.id === d) && (this.selectedTripId = d), (!this.selectedTripId || !this.trips.some((p) => p.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((p) => p.status === "active")?.id ?? this.trips[0]?.id ?? ""), this.selectedTripId && !h && zt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" });
        const f = this.selectedTripId ? await Ot(this.hass, this.vehicleId, this.selectedTripId) : o;
        this.mapConfig = f.map_config ?? this.mapConfig, this.drives = Wo(f.drives), this.places = f.stops ?? [];
        const b = new Set(this.drives.map((p) => p.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((p) => b.has(p)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((p) => p.id), this.driveSelectionInitialized = !0), this.data = await lo(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
      } catch {
        this.error = P(this.hass).loadError, this.data = void 0;
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
    const i = this.shadowRoot?.querySelector(".map");
    if (!i) return;
    this.map || (this.map = ft.map(i, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5)), this.map.off("click", this.onMapClick), this.addPlaceMode && this.map.on("click", this.onMapClick);
    const s = this.config, o = s.tile_url ?? this.mapConfig?.tile_url ?? void 0, h = s.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (o && !this.tileError && !this.tileLayer) {
      const b = h || (o.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = ft.tileLayer(o, { maxZoom: 19, attribution: b }).on("tileerror", () => {
        this.tileError = !0, this.tileLayer?.remove(), this.tileLayer = void 0, this.requestUpdate();
      }).addTo(this.map);
    }
    for (const b of this.layers) b.remove();
    this.layers = [];
    const d = ft.latLngBounds([]), f = P(this.hass);
    for (const [b, p] of (this.data?.segments ?? []).entries()) {
      const _ = [];
      let w = [];
      for (const $ of p.points)
        tn($) ? w.push($) : w.length && (_.push(w), w = []);
      if (w.length && _.push(w), !_.length) continue;
      const y = this.drives.findIndex(($) => $.id === p.drive_id), k = this.driveColor(y >= 0 ? y : b);
      for (const $ of _) {
        const D = $.map((mt) => ft.latLng(mt.latitude, mt.longitude));
        D.length > 1 && this.layers.push(ft.polyline(D, { color: k, weight: 4, opacity: 0.85 }).addTo(this.map)), D.forEach((mt) => d.extend(mt));
        const N = ft.circleMarker(D[0], { radius: 6, color: k, fillOpacity: 1 }).bindTooltip(f.mapStart).bindPopup(this.endpointPopup(f.mapStart, $[0])).addTo(this.map), at = ft.circleMarker(D[D.length - 1], { radius: 6, color: "#111", fillColor: k, fillOpacity: 1 }).bindTooltip(f.mapEnd).bindPopup(this.endpointPopup(f.mapEnd, $[$.length - 1])).addTo(this.map);
        this.layers.push(N, at);
      }
      for (const $ of p.gaps) {
        const D = _.find((mt) => mt.length);
        if (!D) continue;
        const N = ft.latLng(D[Math.max(0, Math.floor(D.length / 2))].latitude, D[Math.max(0, Math.floor(D.length / 2))].longitude), at = ft.circleMarker(N, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${f.mapGap}: ${$.seconds}s`).addTo(this.map);
        this.layers.push(at);
      }
    }
    for (const b of this.places) {
      if (!this.showPlaces || b.confirmed === !1 || !ti(b.latitude, b.longitude)) continue;
      const p = b.latitude, _ = b.longitude, w = ["campsite", "rv_site", "wild_camp", "overnight"].includes(b.place_kind || b.place_type || b.stop_type), y = ft.circleMarker([p, _], { radius: w ? 9 : 7, color: w ? "#7b1fa2" : "#455a64", fillColor: w ? "#ce93d8" : "#90a4ae", fillOpacity: 0.95, weight: 2 }), k = b.rating_overall ? ` · ${b.rating_overall}/5` : "", $ = document.createElement("div"), D = document.createElement("strong");
      D.textContent = b.name || "Ort", $.append(D, document.createElement("br")), $.append(document.createTextNode(`${b.place_type || b.stop_type}${k}`), document.createElement("br")), $.append(document.createTextNode(b.description || "")), y.bindPopup($), y.addTo(this.map), this.layers.push(y), d.extend([p, _]);
    }
    if (this.draftPoint && ti(this.draftPoint.latitude, this.draftPoint.longitude)) {
      const b = this.draftPoint.latitude, p = this.draftPoint.longitude, _ = ft.circleMarker([b, p], { radius: 10, color: "#f57c00", fillColor: "#ffcc80", fillOpacity: 0.9, weight: 3 }).bindTooltip(f.mapAddPlace ?? "Ort hinzufügen").addTo(this.map);
      this.layers.push(_), d.extend([b, p]);
    }
    if (this.fitMapPending && d.isValid()) {
      const b = this.map;
      setTimeout(() => {
        !this.map || this.map !== b || !d.isValid() || (this.map.invalidateSize({ pan: !1 }), this.fitMapPending && (this.map.fitBounds(d.pad(0.08), { animate: !1, maxZoom: 15 }), this.fitMapPending = !1));
      }, 0);
    } else
      setTimeout(() => this.map?.invalidateSize({ pan: !1 }), 0);
  }
  onMapClick = (i) => {
    if (!this.addPlaceMode) return;
    const s = this.nearestRoutePoint(i.latlng.lat, i.latlng.lng);
    this.draftPoint = { latitude: i.latlng.lat, longitude: i.latlng.lng, recorded_at: s?.recorded_at }, !this.draftArrived && s?.recorded_at && (this.draftArrived = this.localDateTime(s.recorded_at)), this.requestUpdate(), this.queueMapRender();
  };
  endpointPopup(i, s) {
    const o = document.createElement("div");
    o.append(document.createTextNode(`${i}: ${j(s.recorded_at, this.hass)}`), document.createElement("br"));
    const h = document.createElement("button");
    return h.type = "button", h.textContent = P(this.hass).mapAddPlace ?? "Ort hinzufügen", h.addEventListener("click", () => this.startMapPlace(s.latitude, s.longitude, s.recorded_at)), o.append(h), o;
  }
  startMapPlace(i, s, o) {
    this.addPlaceMode = !0, this.draftPoint = { latitude: i, longitude: s, recorded_at: o }, !this.draftArrived && o && (this.draftArrived = this.localDateTime(o)), this.requestUpdate(), this.queueMapRender();
  }
  nearestRoutePoint(i, s) {
    return (this.data?.segments ?? []).flatMap((h) => h.points).filter(tn).reduce((h, d) => {
      if (!h) return d;
      const f = (d.latitude - i) ** 2 + (d.longitude - s) ** 2, b = (h.latitude - i) ** 2 + (h.longitude - s) ** 2;
      return f < b ? d : h;
    }, void 0);
  }
  localDateTime(i) {
    const s = new Date(i), o = (h) => String(h).padStart(2, "0");
    return `${s.getFullYear()}-${o(s.getMonth() + 1)}-${o(s.getDate())}T${o(s.getHours())}:${o(s.getMinutes())}`;
  }
  toggleAddPlace() {
    this.addPlaceMode = !this.addPlaceMode, this.addPlaceMode || (this.draftPoint = void 0, this.draftName = "", this.draftArrived = "", this.draftDescription = ""), this.requestUpdate(), this.queueMapRender();
  }
  async saveDraftPlace() {
    if (!(!this.hass || !this.selectedTripId || !this.draftPoint || !this.draftName.trim() || !this.draftArrived || this.draftSaving)) {
      this.draftSaving = !0;
      try {
        await is(this.hass, this.vehicleId, this.selectedTripId, {
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
        this.error = P(this.hass).placeSaveError ?? P(this.hass).loadError;
      } finally {
        this.draftSaving = !1, this.requestUpdate();
      }
    }
  }
  driveColor(i) {
    return qr[i % qr.length];
  }
  selectedTrip() {
    return this.trips.find((i) => i.id === this.selectedTripId);
  }
  selectedDrives() {
    return this.drives.filter((i) => this.selectedDriveIds.includes(i.id));
  }
  async selectTrip(i) {
    this.selectedTripId = i.currentTarget.value, zt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" }), this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh(!0);
  }
  async toggleDrive(i) {
    const s = i.currentTarget;
    this.selectedDriveIds = s.checked ? [.../* @__PURE__ */ new Set([...this.selectedDriveIds, s.value])] : this.selectedDriveIds.filter((o) => o !== s.value), await this.refresh(!0);
  }
  async selectAllDrives() {
    this.selectedDriveIds = this.drives.map((i) => i.id), await this.refresh(!0);
  }
  async selectNoDrives() {
    this.selectedDriveIds = [], await this.refresh(!0);
  }
  onDriveSectionsToggle(i) {
    this.driveSectionsOpen = i.currentTarget.open;
  }
  driveRow(i, s) {
    const o = P(this.hass), h = i.source === "manual" ? o.sourceManual : i.source === "gpx" ? o.sourceGpx ?? o.sourceGps : o.sourceGps;
    return m`<label class="drive-row" style=${`--drive-color:${this.driveColor(s)}`}>
      <input type="checkbox" value=${i.id} .checked=${this.selectedDriveIds.includes(i.id)} @change=${(d) => {
      this.toggleDrive(d);
    }}>
      <span class="drive-info"><strong>${se(i.started_at, this.hass)} · ${Nr(i.started_at, this.hass)} → ${i.ended_at ? `${se(i.ended_at, this.hass)} · ${Nr(i.ended_at, this.hass)}` : "–"}</strong><span>${(i.distance_m / 1e3).toFixed(1)} km · ${i.duration_seconds ? Dt(i.duration_seconds, this.hass) : "–"} · ${h}</span></span>
    </label>`;
  }
  renderPlaceCapture(i, s) {
    return s ? this.addPlaceMode ? this.draftPoint ? m`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${i.mapPlaceHint}</p><form class="form-grid" @submit=${(o) => {
      o.preventDefault(), this.saveDraftPlace();
    }}><input aria-label=${i.placeName ?? "Name"} placeholder=${i.placeName ?? "Name"} .value=${this.draftName} @input=${(o) => this.draftName = o.currentTarget.value} required><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.draftType} @change=${(o) => this.draftType = o.currentTarget.value}><option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option></select><label>${i.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.draftArrived} @input=${(o) => this.draftArrived = o.currentTarget.value} required></label><textarea aria-label=${i.placeDescription ?? "Beschreibung"} placeholder=${i.placeDescription ?? "Beschreibung"} .value=${this.draftDescription} @input=${(o) => this.draftDescription = o.currentTarget.value}></textarea><button type="submit" ?disabled=${this.draftSaving}>${this.draftSaving ? i.saving : i.save}</button></form></section>` : m`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${i.mapPlaceHint}</p></section>` : m`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapAddPlace ?? "Ort hinzufügen"}</button></section>` : "";
  }
  render() {
    const i = P(this.hass), s = this.config, o = this.selectedTrip(), h = this.selectedDrives(), d = h.reduce((_, w) => _ + w.distance_m, 0) / 1e3, f = s.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0, b = (this.data?.segments ?? []).some((_) => _.points.some(tn)), p = this.showPlaces && this.places.some((_) => _.confirmed !== !1 && ti(_.latitude, _.longitude));
    return m`<ha-card>
      <header class="map-header">
        <div><h2>${i.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || i.mapVehicle}</p></div>
        ${this.trips.length && !s.trip_id ? m`<label class="trip-picker"><span>${i.mapTrip}</span><select @change=${(_) => {
      this.selectTrip(_);
    }} .value=${this.selectedTripId}>${this.trips.map((_) => m`<option value=${_.id}>${_.title}</option>`)}</select></label>` : ""}
      </header>
      ${o ? m`<div class="metrics" aria-label=${i.mapTrip}>
        <div class="metric"><span>${i.mapTotalDistance}</span><strong>${d.toFixed(1)} km</strong></div>
        <div class="metric"><span>${i.mapSelectedDrives}</span><strong>${h.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${i.mapTripPeriod}</span><strong>${io(o, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? m`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(_) => this.onDriveSectionsToggle(_)}>
        <summary><span>${i.mapDriveSegments}</span><span class="summary-count">${h.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => {
      this.selectAllDrives();
    }}>${i.mapSelectAll}</button><button class="secondary" type="button" @click=${() => {
      this.selectNoDrives();
    }}>${i.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((_, w) => this.driveRow(_, w))}</div>
      </details>` : ""}
      <label class="place-filter"><input type="checkbox" .checked=${this.showPlaces} @change=${(_) => {
      this.showPlaces = _.currentTarget.checked, this.queueMapRender(), this.requestUpdate();
    }}> ${i.mapPlaces ?? "Orte anzeigen"}</label>
      ${this.renderPlaceCapture(i, o)}
      ${this.error ? m`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? m`<p class="error" role="alert">${P(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !s.tile_url && !this.mapConfig?.tile_url ? m`<p class="muted" role="status">${P(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? m`<p class="muted">${i.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !b ? m`<p class="muted" role="status">${p ? i.mapNoRouteWithPlaces ?? "No valid GPS route is available; saved places are shown." : i.mapNoValidPoints ?? "No valid GPS points are available for this trip."}</p>` : ""}
      <div class="map" role="img" aria-label=${i.mapRouteImageAlt}></div>
      ${f ? m`<p class="attribution">${f}</p>` : ""}
      ${this.loading ? m`<p class="muted">${i.loading}</p>` : ""}
    </ha-card>`;
  }
}
ss.styles = [Nt.styles, Kr(Ho), wt`
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
si("camper-travel-journal-map-card", ss);
const jr = /* @__PURE__ */ new Set(["campsite", "rv_site", "wild_camp", "overnight"]);
class as extends Nt {
  overview;
  detail;
  openTripId = "";
  selectedTripId = "";
  loading = !1;
  error = "";
  onActiveTripChanged = (i) => {
    const s = i.detail;
    s?.vehicleId !== this.vehicleId || !s.tripId || s.tripId === this.openTripId || this.openTripId && this.openTrip(s.tripId);
  };
  onTravelDataChanged = (i) => {
    i.detail?.vehicleId === this.vehicleId && this.refreshOverview();
  };
  interruptionDialog;
  interruptionAction = "stop";
  interruptionPlaceId = "";
  interruptionName = "";
  interruptionType = "other";
  interruptionAddress = "";
  interruptionDescription = "";
  interruptionWebsite = "";
  interruptionSaving = !1;
  overviewRequest = 0;
  detailRequest = 0;
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(xt, this.onActiveTripChanged), window.addEventListener(Le, this.onTravelDataChanged), this.refreshOverview();
  }
  disconnectedCallback() {
    window.removeEventListener(xt, this.onActiveTripChanged), window.removeEventListener(Le, this.onTravelDataChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refreshOverview();
  }
  onConfigChanged() {
    this.closeTrip(!1), this.refreshOverview();
  }
  updated() {
    const i = this.renderRoot.querySelector("dialog.interruption-dialog");
    i && (this.interruptionDialog && !i.open && i.showModal(), !this.interruptionDialog && i.open && i.close());
  }
  async refreshOverview() {
    if (!this.hass || !this.vehicleId) return !1;
    const i = ++this.overviewRequest;
    this.loading = !0, this.error = "", this.requestUpdate();
    try {
      const s = await Ot(this.hass, this.vehicleId);
      if (i !== this.overviewRequest) return !1;
      this.overview = s, this.openTripId && !s.trips.some((h) => h.id === this.openTripId) && (this.openTripId = "", this.detail = void 0, Zr(this.vehicleId, "journal"));
      try {
        this.vehicleName = (await ai(this.hass)).find((h) => h.vehicle_id === this.vehicleId)?.name ?? "";
      } catch {
        this.vehicleName = "";
      }
      const o = oi(this.vehicleId);
      return this.selectedTripId = this.overview.trips.some((h) => h.id === (this.openTripId || o)) ? this.openTripId || o : "", this.openTripId && this.overview.trips.some((h) => h.id === this.openTripId) && await this.loadDetail(this.openTripId), !0;
    } catch {
      return i === this.overviewRequest && (this.error = P(this.hass).loadError), !1;
    } finally {
      i === this.overviewRequest && (this.loading = !1, this.requestUpdate());
    }
  }
  async loadDetail(i) {
    if (!this.hass || !i) return;
    const s = ++this.detailRequest, o = await Ot(this.hass, this.vehicleId, i);
    s === this.detailRequest && this.openTripId === i && (this.detail = o);
  }
  async openTrip(i = this.selectedTripId) {
    if (!(!i || !this.overview?.trips.some((s) => s.id === i))) {
      this.loading = !0, this.error = "", this.openTripId = i, this.selectedTripId = i;
      try {
        await this.loadDetail(i), zt({ vehicleId: this.vehicleId, tripId: i, source: "journal" });
      } catch {
        this.error = P(this.hass).loadError, this.openTripId = "";
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  closeTrip(i = !0) {
    this.openTripId = "", this.detail = void 0, Zr(this.vehicleId, "journal"), this.requestUpdate();
  }
  trip() {
    return this.overview?.trips.find((i) => i.id === this.openTripId) ?? this.detail?.trips.find((i) => i.id === this.openTripId);
  }
  async onTripCreated(i) {
    const s = i.detail?.tripId;
    await this.refreshOverview(), s && await this.openTrip(s);
  }
  openTripCreateDialog() {
    this.renderRoot.querySelector("camper-travel-journal-manager-card")?.openTripCreate?.();
  }
  openInterruptionDialog(i) {
    this.interruptionDialog = i, this.interruptionAction = i.status === "unassigned" ? "stop" : i.status === "overnight" ? "overnight" : i.status === "stop" ? "stop" : i.status, this.interruptionPlaceId = i.existing_place_id ?? "", this.interruptionName = "", this.interruptionType = "other", this.interruptionAddress = "", this.interruptionDescription = "", this.interruptionWebsite = "", this.requestUpdate();
  }
  closeInterruptionDialog() {
    this.interruptionDialog = void 0, this.interruptionSaving = !1, this.requestUpdate();
  }
  async saveInterruption() {
    if (!this.hass || !this.openTripId || !this.interruptionDialog) return;
    const i = this.interruptionDialog;
    this.interruptionSaving = !0, this.requestUpdate();
    try {
      if (this.interruptionAction === "stop" || this.interruptionAction === "overnight")
        if (this.interruptionPlaceId)
          await nn(this.hass, this.vehicleId, this.openTripId, i.id, this.interruptionAction, this.interruptionPlaceId);
        else {
          if (!this.interruptionName.trim()) throw new Error("place_name_required");
          await ns(this.hass, this.vehicleId, this.openTripId, i.id, { name: this.interruptionName.trim(), place_type: this.interruptionType, overnight: this.interruptionAction === "overnight", address: this.interruptionAddress.trim(), description: this.interruptionDescription.trim(), website_url: this.interruptionWebsite.trim() || void 0 });
        }
      else
        await nn(this.hass, this.vehicleId, this.openTripId, i.id, this.interruptionAction);
      if (!await this.refreshOverview()) {
        this.error = "Aufenthalt gespeichert, aber die Reiseübersicht konnte nicht aktualisiert werden. Bitte später erneut laden.", this.interruptionSaving = !1, this.requestUpdate();
        return;
      }
      this.closeInterruptionDialog();
    } catch (s) {
      const o = s instanceof Error ? s.message : "", h = {
        invalid_input: "Die Eingaben sind ungültig.",
        timestamp_invalid: "Bitte Datum und Uhrzeit prüfen.",
        permission_denied: "Die Berechtigung zum Speichern fehlt.",
        conflict: "Der Datensatz wurde zwischenzeitlich geändert. Bitte neu laden.",
        database_error: "Der Server konnte die Änderung nicht speichern.",
        request_failed: "Der Server konnte die Änderung nicht verarbeiten.",
        interruption_not_found: "Die Unterbrechung existiert nicht mehr.",
        interruption_place_required: "Bitte einen Ort auswählen.",
        trip_not_found: "Die Reise existiert nicht mehr.",
        vehicle_mismatch: "Reise und Fahrzeug passen nicht zusammen.",
        website_url_invalid: "Die Webseite muss mit http:// oder https:// beginnen."
      };
      this.error = o === "place_name_required" ? "Bitte einen Namen eingeben." : `Aufenthalt konnte nicht gespeichert werden${h[o] ? `: ${h[o]}` : ". Bitte Eingaben prüfen und erneut versuchen."}`, this.interruptionSaving = !1, this.requestUpdate();
    }
  }
  section(i, s, o, h, d = !1) {
    return m`<section class="journal-section"><details ?open=${d} @toggle=${(f) => this.onSectionToggle(f)}><summary><span class="section-title"><span aria-hidden="true">${s}</span><strong>${i}</strong></span>${o === void 0 ? "" : m`<span class="count">${o}</span>`}</summary><div class="section-content">${h}</div></details></section>`;
  }
  onSectionToggle(i) {
    const s = i.currentTarget;
    s.open && this.shadowRoot?.querySelectorAll(".journal-section details").forEach((o) => {
      o !== s && (o.open = !1);
    });
  }
  renderPicker(i) {
    const s = this.overview?.trips ?? [];
    return m`<section class="entry" aria-labelledby="journal-entry-title"><div class="entry-icon" aria-hidden="true">🚐</div><h2 id="journal-entry-title">${i.journalEntry ?? "Reise auswählen oder neu anlegen"}</h2><p class="muted">${i.journalEntryHint ?? "Öffne eine Reise, um ihre Fahrten, Orte, Karte und Exporte zu sehen."}</p>${s.length ? m`<label class="picker-label">${i.journalSelect ?? "Reise auswählen"}<select aria-label=${i.journalSelect ?? "Reise auswählen"} .value=${this.selectedTripId} @change=${(o) => {
      this.selectedTripId = o.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.journalChoose ?? "Bitte auswählen …"}</option>${s.map((o) => m`<option value=${o.id}>${o.title} · ${Gt(o.status, this.hass)} · ${Lt(o, this.hass)}</option>`)}</select></label>` : m`<p class="muted">${i.noTrip}</p>`}<div class="actions"><button type="button" @click=${() => {
      this.openTrip();
    }} ?disabled=${!this.selectedTripId || this.loading}>${i.journalOpen ?? "Reise öffnen"}</button><button type="button" class="secondary" @click=${() => this.openTripCreateDialog()}>${i.newTrip}</button></div><camper-travel-journal-manager-card .config=${{ vehicle_id: this.vehicleId, journal_section: "trip-create" }} .hass=${this.hass} @trip-created=${(o) => {
      this.onTripCreated(o);
    }}></camper-travel-journal-manager-card></section>`;
  }
  renderOpenTrip(i, s) {
    const o = this.detail, h = (o?.stops ?? []).filter(($) => $.confirmed !== !1), d = h.filter(($) => jr.has($.place_kind || $.place_type || $.stop_type)), f = (o?.drives ?? []).reduce(($, D) => $ + D.distance_m, 0) / 1e3, b = o?.expense_summary, p = b?.mixed_currency ? i.mixedCurrency : b?.total_minor !== void 0 && b.currency ? bt(b.total_minor, b.currency, this.hass) : bt(0, "EUR", this.hass), _ = ($) => m`<camper-travel-journal-manager-card .config=${{ vehicle_id: this.vehicleId, trip_id: s.id, journal_section: $ }} .hass=${this.hass}></camper-travel-journal-manager-card>`, w = m`<camper-travel-journal-map-card .config=${{ vehicle_id: this.vehicleId, trip_id: s.id }} .hass=${this.hass}></camper-travel-journal-map-card>`, y = o?.interruptions ?? [], k = [...o?.drives ?? []].sort(($, D) => $.started_at.localeCompare(D.started_at)).flatMap(($) => {
      const D = y.find((at) => at.previous_drive_id === $.id), N = (o?.stops ?? []).find((at) => at.id === D?.existing_place_id);
      return [m`<article class="drive-item"><strong>${i.drive ?? "Fahrt"}</strong><span>${j($.started_at, this.hass)} → ${$.ended_at ? j($.ended_at, this.hass) : i.notAvailable ?? "Nicht verfügbar"}</span><span>${($.distance_m / 1e3).toFixed(1)} km · ${$.duration_seconds ? Dt($.duration_seconds, this.hass) : "–"} · ${$.source === "gpx" ? i.sourceGpx ?? "GPX-importiert" : $.source === "manual" ? i.sourceManual : i.sourceGps}</span></article>`, ...D ? [m`<article class="interruption-item"><strong>${D.status === "pause" ? i.drivePause ?? "Fahrtpause" : D.status === "ignored" ? i.interruptionIgnored ?? "Ignoriert" : N ? `${i.assignedStay ?? "Aufenthalt"}: ${N.name}` : i.interruptionUnassigned ?? "Nicht zugeordnet"}</strong><span>${j(D.started_at, this.hass)} → ${j(D.ended_at, this.hass)} · ${Dt(D.duration_seconds, this.hass)}</span>${D.status === "unassigned" ? m`<button type="button" class="compact-action" @click=${() => this.openInterruptionDialog(D)}>${i.assignStay ?? "Aufenthalt zuordnen"}</button>` : ""}</article>`] : []];
    });
    return m`<header class="trip-header"><div><p class="eyebrow">${i.journalOpenTrip ?? "Geöffnete Reise"}</p><h2>${s.title}</h2><p class="muted">${s.destination || i.noDestination} · ${Lt(s, this.hass)} · ${Gt(s.status, this.hass)}${this.vehicleName ? ` · ${this.vehicleName}` : ""}</p><div class="trip-management" @trip-switch=${() => this.closeTrip()}>${_("trip-actions")}</div></div></header>
      ${this.section(i.journalOverview ?? "Reiseübersicht", "▣", void 0, m`<div class="metric-grid"><div><span>${i.distance}</span><strong>${f.toFixed(1)} km</strong></div><div><span>${i.drives}</span><strong>${o?.drives.length ?? 0}</strong></div><div><span>${i.stops}</span><strong>${h.filter(($) => !jr.has($.place_kind || $.place_type || $.stop_type)).length}</strong></div><div><span>${i.overnights ?? "Übernachtungsplätze"}</span><strong>${d.length}</strong></div><div><span>${i.costs}</span><strong>${p}</strong></div></div>`)}
      ${this.section(i.journalDrives ?? "Fahrten und Unterbrechungen", "↔", (o?.drives.length ?? 0) + y.length, m`${k.length ? k : m`<p class="muted">${i.noDrives ?? "Keine Fahrten erfasst."}</p>`}`)}
      ${this.section(i.placesAndStays ?? "Orte & Aufenthalte", "●", h.length, m`<p class="muted">${i.journalStopsHint ?? "Bestätigte Aufenthalte dieser Reise."}</p>${_("places")}`)}
      ${this.section(i.expenses, "€", o?.expenses?.length ?? 0, m`${_("expenses")}`)}
      ${this.section(i.mapTitle ?? "Reisekarte", "⌖", void 0, w)}
      ${this.section(i.gpxImport, "⇧", void 0, m`${_("gpx")}`)}
      ${this.section(i.pdfExportTitle, "▤", void 0, m`${_("pdf")}`)}
      ${this.error ? m`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading ? m`<p class="muted" role="status">${i.loading}</p>` : ""}
      <dialog class="interruption-dialog" @cancel=${($) => {
      $.preventDefault(), this.closeInterruptionDialog();
    }}><form method="dialog" @submit=${($) => {
      $.preventDefault(), this.saveInterruption();
    }}><h3>${i.assignStay ?? "Aufenthalt zuordnen"}</h3><p class="muted">${this.interruptionDialog ? `${j(this.interruptionDialog.started_at, this.hass)} → ${j(this.interruptionDialog.ended_at, this.hass)}` : ""}</p><label>${i.interruptionAction ?? "Aktion"}<select .value=${this.interruptionAction} @change=${($) => {
      this.interruptionAction = $.currentTarget.value, this.requestUpdate();
    }}><option value="stop">${i.assignStop ?? "Zwischenstopp zuordnen"}</option><option value="overnight">${i.assignOvernight ?? "Übernachtungsplatz zuordnen"}</option><option value="pause">${i.drivePause ?? "Als Fahrtpause kennzeichnen"}</option><option value="ignored">${i.interruptionIgnored ?? "Als nicht relevant markieren"}</option></select></label>${this.interruptionAction === "stop" || this.interruptionAction === "overnight" ? m`<label>${i.existingPlace ?? "Bestehender Ort"}<select .value=${this.interruptionPlaceId} @change=${($) => {
      this.interruptionPlaceId = $.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.createNewPlace ?? "Neuen Eintrag erstellen …"}</option>${h.map(($) => m`<option value=${$.id}>${$.name}</option>`)}</select></label>${this.interruptionPlaceId ? "" : m`<input aria-label=${i.placeName} placeholder=${i.placeName} .value=${this.interruptionName} @input=${($) => this.interruptionName = $.currentTarget.value} required><select aria-label=${i.placeCategory} .value=${this.interruptionType} @change=${($) => this.interruptionType = $.currentTarget.value}><option value="other">${i.placeOther}</option><option value="rv_site">${i.placeRvSite}</option><option value="parking">${i.placeParking ?? "Raststätte / Parkplatz"}</option></select><input aria-label=${i.placeAddress} placeholder=${i.placeAddress} .value=${this.interruptionAddress} @input=${($) => this.interruptionAddress = $.currentTarget.value}><input aria-label=${i.placeWebsite ?? "Webseite"} type="url" placeholder=${i.placeWebsite ?? "Webseite (optional)"} .value=${this.interruptionWebsite} @input=${($) => this.interruptionWebsite = $.currentTarget.value}><textarea aria-label=${i.placeDescription} placeholder=${i.placeDescription} .value=${this.interruptionDescription} @input=${($) => this.interruptionDescription = $.currentTarget.value}></textarea>`}` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeInterruptionDialog()}>${i.cancel}</button><button type="submit" ?disabled=${this.interruptionSaving}>${this.interruptionSaving ? i.saving : i.save}</button></div></form></dialog>`;
  }
  vehicleName = "";
  render() {
    const i = P(this.hass), s = this.trip();
    return m`<ha-card><h1>${i.title}</h1>${s ? this.renderOpenTrip(i, s) : this.renderPicker(i)}${this.error && !s ? m`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading && !s ? m`<p class="muted" role="status">${i.loading}</p>` : ""}</ha-card>`;
  }
}
as.styles = [Nt.styles, wt`
  :host { min-width: 0; } ha-card { padding: 0; overflow: hidden; } h1 { margin: 0; padding: 18px 18px 12px; font-size: 1.35rem; } h2 { margin: 0; } .entry, .trip-header { padding: 18px; } .entry { text-align: center; } .entry-icon { font-size: 2.4rem; } .entry h2 { margin: 8px 0; } .picker-label { display: grid; gap: 6px; text-align: left; margin: 18px 0 0; } select, input, textarea { box-sizing: border-box; min-width: 0; width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; } .trip-header { display: flex; justify-content: space-between; gap: 14px; align-items: start; border-block: 1px solid var(--divider-color); background: var(--secondary-background-color); } .eyebrow { margin: 0 0 4px; color: var(--secondary-text-color); font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; } .muted { color: var(--secondary-text-color); } .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(9rem,1fr)); gap: 10px; align-items: end; } .form-grid label { display: grid; gap: 5px; text-align: left; } .new-trip { margin-top: 16px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 10px; text-align: left; } .journal-section { border-bottom: 1px solid var(--divider-color); } .journal-section details { padding: 0 18px; } .journal-section summary { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; list-style: none; } .journal-section summary::-webkit-details-marker { display:none; } .section-title { display: flex; gap: 9px; align-items: center; } .section-title span { color: var(--primary-color); width: 1.2em; text-align: center; } .count { color: var(--secondary-text-color); } .section-content { padding: 0 0 16px; min-width: 0; } .metric-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(7rem,1fr)); gap: 8px; } .metric-grid > div { min-width: 0; padding: 10px; border-radius: 9px; background: var(--secondary-background-color); } .metric-grid span, .metric-grid strong { display: block; min-width: 0; overflow-wrap: anywhere; word-break: normal; } .metric-grid span { color: var(--secondary-text-color); font-size: .78rem; line-height: 1.2; } .metric-grid strong { margin-top: 3px; } .drive-item, .interruption-item { display: grid; gap: 3px; padding: 10px; margin-bottom: 7px; border-radius: 8px; background: var(--secondary-background-color); } .interruption-item { border-inline-start: 4px solid var(--warning-color, #f57c00); } camper-travel-journal-manager-card, camper-travel-journal-map-card { display: block; min-width: 0; } button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; } @media (max-width: 600px) { h1 { padding: 14px; } .entry, .trip-header { padding: 14px; } .trip-header { flex-direction: column; } .trip-header button { width: 100%; } .journal-section details { padding-inline: 14px; } .form-grid { grid-template-columns: 1fr; } .metric-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
  .compact-action { justify-self: start; padding: 5px 8px; font-size: .85em; }
  dialog { max-width: min(32rem, calc(100vw - 2rem)); width: calc(100% - 2rem); border: 0; border-radius: 12px; padding: 0; color: var(--primary-text-color); background: var(--card-background-color); }
  dialog::backdrop { background: rgb(0 0 0 / .48); }
  dialog form { display: grid; gap: 12px; padding: 18px; }
  dialog label { display: grid; gap: 5px; }
  dialog textarea { min-height: 4rem; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
`];
si("camper-travel-journal-journal-card", as);
function qo(c, i) {
  return c.vehicle_id || i.length !== 1 ? c : { ...c, vehicle_id: i[0].vehicle_id };
}
function jo(c, i) {
  return c.type === i.type && c.vehicle_id === i.vehicle_id;
}
class Go extends jt {
  static styles = wt`
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
  set hass(i) {
    const s = this._hass?.connection !== i?.connection;
    this._hass = i, s && i && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(i) {
    jo(this._config, i) || (this._config = { ...i }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const i = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await ai(i), this.loadedConnection = i.connection;
        const s = qo(this._config, this.vehicles);
        s.vehicle_id !== this._config.vehicle_id && (this._config = s, this.fireConfigChanged());
      } catch {
        this.error = P(i).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(i) {
    const s = i.target.value;
    this._config = { ...this._config, vehicle_id: s }, this.fireConfigChanged();
  }
  render() {
    const i = P(this._hass);
    return m`
      <div class="field">
        <label for="vehicle">${i.editorVehicle}</label>
        ${this.loading ? m`<span class="muted">${i.editorLoading}</span>` : m`
          <select id="vehicle" aria-label=${i.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${i.editorChooseVehicle}</option>
            ${this.vehicles.map((s) => m`<option value=${s.vehicle_id} ?selected=${s.vehicle_id === this._config.vehicle_id}>${s.name || s.title}</option>`)}
          </select>
        `}
        ${this.error ? m`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? m`<span class="error" role="alert">${i.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Go);
const Ko = [
  { type: "camper-travel-journal-journal-card", name: "Camper Travel Journal – Journal", description: "Zentraler Einstieg: Reise öffnen und alle Funktionen in einem Reisebereich nutzen.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Eigenständige Diagnosekarte für die Verbindung und Datenanbindung.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const c of Ko) window.customCards.some((i) => i.type === c.type) || window.customCards.push(c);
