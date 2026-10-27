const ri = globalThis, fn = ri.ShadowRoot && (ri.ShadyCSS === void 0 || ri.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, mn = /* @__PURE__ */ Symbol(), Mr = /* @__PURE__ */ new WeakMap();
let es = class {
  constructor(i, r, o) {
    if (this._$cssResult$ = !0, o !== mn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = i, this.t = r;
  }
  get styleSheet() {
    let i = this.o;
    const r = this.t;
    if (fn && i === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (i = Mr.get(r)), i === void 0 && ((this.o = i = new CSSStyleSheet()).replaceSync(this.cssText), o && Mr.set(r, i));
    }
    return i;
  }
  toString() {
    return this.cssText;
  }
};
const is = (d) => new es(typeof d == "string" ? d : d + "", void 0, mn), vt = (d, ...i) => {
  const r = d.length === 1 ? d[0] : i.reduce((o, l, c) => o + ((f) => {
    if (f._$cssResult$ === !0) return f.cssText;
    if (typeof f == "number") return f;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + f + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(l) + d[c + 1], d[0]);
  return new es(r, d, mn);
}, Wa = (d, i) => {
  if (fn) d.adoptedStyleSheets = i.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of i) {
    const o = document.createElement("style"), l = ri.litNonce;
    l !== void 0 && o.setAttribute("nonce", l), o.textContent = r.cssText, d.appendChild(o);
  }
}, zr = fn ? (d) => d : (d) => d instanceof CSSStyleSheet ? ((i) => {
  let r = "";
  for (const o of i.cssRules) r += o.cssText;
  return is(r);
})(d) : d;
const { is: qa, defineProperty: Ha, getOwnPropertyDescriptor: ja, getOwnPropertyNames: Ga, getOwnPropertySymbols: Ka, getPrototypeOf: Va } = Object, ci = globalThis, Or = ci.trustedTypes, Ja = Or ? Or.emptyScript : "", Ya = ci.reactiveElementPolyfillSupport, De = (d, i) => d, dn = { toAttribute(d, i) {
  switch (i) {
    case Boolean:
      d = d ? Ja : null;
      break;
    case Object:
    case Array:
      d = d == null ? d : JSON.stringify(d);
  }
  return d;
}, fromAttribute(d, i) {
  let r = d;
  switch (i) {
    case Boolean:
      r = d !== null;
      break;
    case Number:
      r = d === null ? null : Number(d);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(d);
      } catch {
        r = null;
      }
  }
  return r;
} }, ns = (d, i) => !qa(d, i), Rr = { attribute: !0, type: String, converter: dn, reflect: !1, useDefault: !1, hasChanged: ns };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ci.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let se = class extends HTMLElement {
  static addInitializer(i) {
    this._$Ei(), (this.l ??= []).push(i);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(i, r = Rr) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(i) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(i, r), !r.noAccessor) {
      const o = /* @__PURE__ */ Symbol(), l = this.getPropertyDescriptor(i, o, r);
      l !== void 0 && Ha(this.prototype, i, l);
    }
  }
  static getPropertyDescriptor(i, r, o) {
    const { get: l, set: c } = ja(this.prototype, i) ?? { get() {
      return this[r];
    }, set(f) {
      this[r] = f;
    } };
    return { get: l, set(f) {
      const y = l?.call(this);
      c?.call(this, f), this.requestUpdate(i, y, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(i) {
    return this.elementProperties.get(i) ?? Rr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(De("elementProperties"))) return;
    const i = Va(this);
    i.finalize(), i.l !== void 0 && (this.l = [...i.l]), this.elementProperties = new Map(i.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(De("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(De("properties"))) {
      const r = this.properties, o = [...Ga(r), ...Ka(r)];
      for (const l of o) this.createProperty(l, r[l]);
    }
    const i = this[Symbol.metadata];
    if (i !== null) {
      const r = litPropertyMetadata.get(i);
      if (r !== void 0) for (const [o, l] of r) this.elementProperties.set(o, l);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, o] of this.elementProperties) {
      const l = this._$Eu(r, o);
      l !== void 0 && this._$Eh.set(l, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(i) {
    const r = [];
    if (Array.isArray(i)) {
      const o = new Set(i.flat(1 / 0).reverse());
      for (const l of o) r.unshift(zr(l));
    } else i !== void 0 && r.push(zr(i));
    return r;
  }
  static _$Eu(i, r) {
    const o = r.attribute;
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
    const i = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const o of r.keys()) this.hasOwnProperty(o) && (i.set(o, this[o]), delete this[o]);
    i.size > 0 && (this._$Ep = i);
  }
  createRenderRoot() {
    const i = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Wa(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((i) => i.hostConnected?.());
  }
  enableUpdating(i) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((i) => i.hostDisconnected?.());
  }
  attributeChangedCallback(i, r, o) {
    this._$AK(i, o);
  }
  _$ET(i, r) {
    const o = this.constructor.elementProperties.get(i), l = this.constructor._$Eu(i, o);
    if (l !== void 0 && o.reflect === !0) {
      const c = (o.converter?.toAttribute !== void 0 ? o.converter : dn).toAttribute(r, o.type);
      this._$Em = i, c == null ? this.removeAttribute(l) : this.setAttribute(l, c), this._$Em = null;
    }
  }
  _$AK(i, r) {
    const o = this.constructor, l = o._$Eh.get(i);
    if (l !== void 0 && this._$Em !== l) {
      const c = o.getPropertyOptions(l), f = typeof c.converter == "function" ? { fromAttribute: c.converter } : c.converter?.fromAttribute !== void 0 ? c.converter : dn;
      this._$Em = l;
      const y = f.fromAttribute(r, c.type);
      this[l] = y ?? this._$Ej?.get(l) ?? y, this._$Em = null;
    }
  }
  requestUpdate(i, r, o, l = !1, c) {
    if (i !== void 0) {
      const f = this.constructor;
      if (l === !1 && (c = this[i]), o ??= f.getPropertyOptions(i), !((o.hasChanged ?? ns)(c, r) || o.useDefault && o.reflect && c === this._$Ej?.get(i) && !this.hasAttribute(f._$Eu(i, o)))) return;
      this.C(i, r, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(i, r, { useDefault: o, reflect: l, wrapped: c }, f) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(i) && (this._$Ej.set(i, f ?? r ?? this[i]), c !== !0 || f !== void 0) || (this._$AL.has(i) || (this.hasUpdated || o || (r = void 0), this._$AL.set(i, r)), l === !0 && this._$Em !== i && (this._$Eq ??= /* @__PURE__ */ new Set()).add(i));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
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
        for (const [l, c] of this._$Ep) this[l] = c;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [l, c] of o) {
        const { wrapped: f } = c, y = this[l];
        f !== !0 || this._$AL.has(l) || y === void 0 || this.C(l, void 0, c, y);
      }
    }
    let i = !1;
    const r = this._$AL;
    try {
      i = this.shouldUpdate(r), i ? (this.willUpdate(r), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(r)) : this._$EM();
    } catch (o) {
      throw i = !1, this._$EM(), o;
    }
    i && this._$AE(r);
  }
  willUpdate(i) {
  }
  _$AE(i) {
    this._$EO?.forEach((r) => r.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(i)), this.updated(i);
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
    this._$Eq &&= this._$Eq.forEach((r) => this._$ET(r, this[r])), this._$EM();
  }
  updated(i) {
  }
  firstUpdated(i) {
  }
};
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[De("elementProperties")] = /* @__PURE__ */ new Map(), se[De("finalized")] = /* @__PURE__ */ new Map(), Ya?.({ ReactiveElement: se }), (ci.reactiveElementVersions ??= []).push("2.1.2");
const gn = globalThis, Nr = (d) => d, oi = gn.trustedTypes, Br = oi ? oi.createPolicy("lit-html", { createHTML: (d) => d }) : void 0, rs = "$lit$", zt = `lit$${Math.random().toFixed(9).slice(2)}$`, ss = "?" + zt, Xa = `<${ss}>`, Vt = document, Ie = () => Vt.createComment(""), Le = (d) => d === null || typeof d != "object" && typeof d != "function", vn = Array.isArray, Qa = (d) => vn(d) || typeof d?.[Symbol.iterator] == "function", Qi = `[ \t
\f\r]`, Pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Fr = /-->/g, Zr = />/g, Ht = RegExp(`>|${Qi}(?:([^\\s"'>=/]+)(${Qi}*=${Qi}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ur = /'/g, Wr = /"/g, as = /^(?:script|style|textarea|title)$/i, to = (d) => (i, ...r) => ({ _$litType$: d, strings: i, values: r }), m = to(1), he = /* @__PURE__ */ Symbol.for("lit-noChange"), tt = /* @__PURE__ */ Symbol.for("lit-nothing"), qr = /* @__PURE__ */ new WeakMap(), jt = Vt.createTreeWalker(Vt, 129);
function os(d, i) {
  if (!vn(d) || !d.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Br !== void 0 ? Br.createHTML(i) : i;
}
const eo = (d, i) => {
  const r = d.length - 1, o = [];
  let l, c = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", f = Pe;
  for (let y = 0; y < r; y++) {
    const u = d[y];
    let v, T, b = -1, D = 0;
    for (; D < u.length && (f.lastIndex = D, T = f.exec(u), T !== null); ) D = f.lastIndex, f === Pe ? T[1] === "!--" ? f = Fr : T[1] !== void 0 ? f = Zr : T[2] !== void 0 ? (as.test(T[2]) && (l = RegExp("</" + T[2], "g")), f = Ht) : T[3] !== void 0 && (f = Ht) : f === Ht ? T[0] === ">" ? (f = l ?? Pe, b = -1) : T[1] === void 0 ? b = -2 : (b = f.lastIndex - T[2].length, v = T[1], f = T[3] === void 0 ? Ht : T[3] === '"' ? Wr : Ur) : f === Wr || f === Ur ? f = Ht : f === Fr || f === Zr ? f = Pe : (f = Ht, l = void 0);
    const $ = f === Ht && d[y + 1].startsWith("/>") ? " " : "";
    c += f === Pe ? u + Xa : b >= 0 ? (o.push(v), u.slice(0, b) + rs + u.slice(b) + zt + $) : u + zt + (b === -2 ? y : $);
  }
  return [os(d, c + (d[r] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), o];
};
class Ae {
  constructor({ strings: i, _$litType$: r }, o) {
    let l;
    this.parts = [];
    let c = 0, f = 0;
    const y = i.length - 1, u = this.parts, [v, T] = eo(i, r);
    if (this.el = Ae.createElement(v, o), jt.currentNode = this.el.content, r === 2 || r === 3) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (l = jt.nextNode()) !== null && u.length < y; ) {
      if (l.nodeType === 1) {
        if (l.hasAttributes()) for (const b of l.getAttributeNames()) if (b.endsWith(rs)) {
          const D = T[f++], $ = l.getAttribute(b).split(zt), A = /([.?@])?(.*)/.exec(D);
          u.push({ type: 1, index: c, name: A[2], strings: $, ctor: A[1] === "." ? no : A[1] === "?" ? ro : A[1] === "@" ? so : ui }), l.removeAttribute(b);
        } else b.startsWith(zt) && (u.push({ type: 6, index: c }), l.removeAttribute(b));
        if (as.test(l.tagName)) {
          const b = l.textContent.split(zt), D = b.length - 1;
          if (D > 0) {
            l.textContent = oi ? oi.emptyScript : "";
            for (let $ = 0; $ < D; $++) l.append(b[$], Ie()), jt.nextNode(), u.push({ type: 2, index: ++c });
            l.append(b[D], Ie());
          }
        }
      } else if (l.nodeType === 8) if (l.data === ss) u.push({ type: 2, index: c });
      else {
        let b = -1;
        for (; (b = l.data.indexOf(zt, b + 1)) !== -1; ) u.push({ type: 7, index: c }), b += zt.length - 1;
      }
      c++;
    }
  }
  static createElement(i, r) {
    const o = Vt.createElement("template");
    return o.innerHTML = i, o;
  }
}
function de(d, i, r = d, o) {
  if (i === he) return i;
  let l = o !== void 0 ? r._$Co?.[o] : r._$Cl;
  const c = Le(i) ? void 0 : i._$litDirective$;
  return l?.constructor !== c && (l?._$AO?.(!1), c === void 0 ? l = void 0 : (l = new c(d), l._$AT(d, r, o)), o !== void 0 ? (r._$Co ??= [])[o] = l : r._$Cl = l), l !== void 0 && (i = de(d, l._$AS(d, i.values), l, o)), i;
}
class io {
  constructor(i, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = i, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(i) {
    const { el: { content: r }, parts: o } = this._$AD, l = (i?.creationScope ?? Vt).importNode(r, !0);
    jt.currentNode = l;
    let c = jt.nextNode(), f = 0, y = 0, u = o[0];
    for (; u !== void 0; ) {
      if (f === u.index) {
        let v;
        u.type === 2 ? v = new Me(c, c.nextSibling, this, i) : u.type === 1 ? v = new u.ctor(c, u.name, u.strings, this, i) : u.type === 6 && (v = new ao(c, this, i)), this._$AV.push(v), u = o[++y];
      }
      f !== u?.index && (c = jt.nextNode(), f++);
    }
    return jt.currentNode = Vt, l;
  }
  p(i) {
    let r = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(i, o, r), r += o.strings.length - 2) : o._$AI(i[r])), r++;
  }
}
class Me {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(i, r, o, l) {
    this.type = 2, this._$AH = tt, this._$AN = void 0, this._$AA = i, this._$AB = r, this._$AM = o, this.options = l, this._$Cv = l?.isConnected ?? !0;
  }
  get parentNode() {
    let i = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && i?.nodeType === 11 && (i = r.parentNode), i;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(i, r = this) {
    i = de(this, i, r), Le(i) ? i === tt || i == null || i === "" ? (this._$AH !== tt && this._$AR(), this._$AH = tt) : i !== this._$AH && i !== he && this._(i) : i._$litType$ !== void 0 ? this.$(i) : i.nodeType !== void 0 ? this.T(i) : Qa(i) ? this.k(i) : this._(i);
  }
  O(i) {
    return this._$AA.parentNode.insertBefore(i, this._$AB);
  }
  T(i) {
    this._$AH !== i && (this._$AR(), this._$AH = this.O(i));
  }
  _(i) {
    this._$AH !== tt && Le(this._$AH) ? this._$AA.nextSibling.data = i : this.T(Vt.createTextNode(i)), this._$AH = i;
  }
  $(i) {
    const { values: r, _$litType$: o } = i, l = typeof o == "number" ? this._$AC(i) : (o.el === void 0 && (o.el = Ae.createElement(os(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === l) this._$AH.p(r);
    else {
      const c = new io(l, this), f = c.u(this.options);
      c.p(r), this.T(f), this._$AH = c;
    }
  }
  _$AC(i) {
    let r = qr.get(i.strings);
    return r === void 0 && qr.set(i.strings, r = new Ae(i)), r;
  }
  k(i) {
    vn(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, l = 0;
    for (const c of i) l === r.length ? r.push(o = new Me(this.O(Ie()), this.O(Ie()), this, this.options)) : o = r[l], o._$AI(c), l++;
    l < r.length && (this._$AR(o && o._$AB.nextSibling, l), r.length = l);
  }
  _$AR(i = this._$AA.nextSibling, r) {
    for (this._$AP?.(!1, !0, r); i !== this._$AB; ) {
      const o = Nr(i).nextSibling;
      Nr(i).remove(), i = o;
    }
  }
  setConnected(i) {
    this._$AM === void 0 && (this._$Cv = i, this._$AP?.(i));
  }
}
class ui {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(i, r, o, l, c) {
    this.type = 1, this._$AH = tt, this._$AN = void 0, this.element = i, this.name = r, this._$AM = l, this.options = c, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = tt;
  }
  _$AI(i, r = this, o, l) {
    const c = this.strings;
    let f = !1;
    if (c === void 0) i = de(this, i, r, 0), f = !Le(i) || i !== this._$AH && i !== he, f && (this._$AH = i);
    else {
      const y = i;
      let u, v;
      for (i = c[0], u = 0; u < c.length - 1; u++) v = de(this, y[o + u], r, u), v === he && (v = this._$AH[u]), f ||= !Le(v) || v !== this._$AH[u], v === tt ? i = tt : i !== tt && (i += (v ?? "") + c[u + 1]), this._$AH[u] = v;
    }
    f && !l && this.j(i);
  }
  j(i) {
    i === tt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, i ?? "");
  }
}
class no extends ui {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(i) {
    this.element[this.name] = i === tt ? void 0 : i;
  }
}
let ro = class extends ui {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(i) {
    this.element.toggleAttribute(this.name, !!i && i !== tt);
  }
};
class so extends ui {
  constructor(i, r, o, l, c) {
    super(i, r, o, l, c), this.type = 5;
  }
  _$AI(i, r = this) {
    if ((i = de(this, i, r, 0) ?? tt) === he) return;
    const o = this._$AH, l = i === tt && o !== tt || i.capture !== o.capture || i.once !== o.once || i.passive !== o.passive, c = i !== tt && (o === tt || l);
    l && this.element.removeEventListener(this.name, this, o), c && this.element.addEventListener(this.name, this, i), this._$AH = i;
  }
  handleEvent(i) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, i) : this._$AH.handleEvent(i);
  }
}
class ao {
  constructor(i, r, o) {
    this.element = i, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(i) {
    de(this, i);
  }
}
const oo = gn.litHtmlPolyfillSupport;
oo?.(Ae, Me), (gn.litHtmlVersions ??= []).push("3.3.3");
const lo = (d, i, r) => {
  const o = r?.renderBefore ?? i;
  let l = o._$litPart$;
  if (l === void 0) {
    const c = r?.renderBefore ?? null;
    o._$litPart$ = l = new Me(i.insertBefore(Ie(), c), c, void 0, r ?? {});
  }
  return l._$AI(d), l;
};
const _n = globalThis;
class Gt extends se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const i = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= i.firstChild, i;
  }
  update(i) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(i), this._$Do = lo(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return he;
  }
}
Gt._$litElement$ = !0, Gt.finalized = !0, _n.litElementHydrateSupport?.({ LitElement: Gt });
const ho = _n.litElementPolyfillSupport;
ho?.({ LitElement: Gt });
(_n.litElementVersions ??= []).push("4.2.2");
const ls = ["camping", "fuel", "toll", "parking", "food", "activities", "water_waste", "other"], co = ["electricity", "fresh_water", "grey_water", "toilet_cassette", "shower"], ei = ls, uo = {
  staySince: "Seit",
  stayOngoing: "Aufenthalt läuft",
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
}, po = {
  staySince: "Since",
  stayOngoing: "Stay ongoing",
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
}, Hr = {
  de: {
    editorModules: "Journal-Module",
    editorModulesHint: "Sichtbare Bereiche auswählen und ihre Reihenfolge festlegen.",
    moduleMoveUp: "Nach oben",
    moduleMoveDown: "Nach unten",
    modulePosition: "Position",
    moduleOf: "von",
    modulePlanned: "geplant",
    modulePlannedHint: "Dieses Modul ist für eine spätere Version vorgemerkt. In dieser Beta werden keine Tankdaten und keine Providerabfragen verwendet.",
    module_overview: "Reiseübersicht",
    module_drives: "Fahrten",
    module_stays: "Orte & Aufenthalte",
    module_expenses: "Kosten",
    module_map: "Reisekarte",
    module_gpx: "GPX",
    module_pdf: "PDF-Export",
    module_tankbook: "Tankbuch",
    categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", water_waste: "Ver- & Entsorgung", other: "Sonstiges" },
    services: "Leistungen (optional)",
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
    editorModules: "Journal modules",
    editorModulesHint: "Choose visible sections and arrange their order.",
    moduleMoveUp: "Move up",
    moduleMoveDown: "Move down",
    modulePosition: "Position",
    moduleOf: "of",
    modulePlanned: "planned",
    modulePlannedHint: "This module is reserved for a future release. No tank data or provider request is used in this beta.",
    module_overview: "Trip overview",
    module_drives: "Drives",
    module_stays: "Places & stays",
    module_expenses: "Costs",
    module_map: "Travel map",
    module_gpx: "GPX",
    module_pdf: "PDF export",
    module_tankbook: "Fuel log",
    categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", water_waste: "Water & waste services", other: "Other" },
    services: "Services (optional)",
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
function w(d) {
  const i = d?.locale?.language?.toLowerCase() ?? "de";
  return { ...i.startsWith("de") ? uo : po, ...i.startsWith("de") ? Hr.de : Hr.en };
}
function fo(d, i, r = !1) {
  if (!d) return;
  const o = (i?.locale?.language ?? "").toLowerCase().startsWith("de"), [l, c = ""] = d.split(":", 2), f = c.split(",").filter(Boolean).map((u) => ({
    start_boundary: o ? "am Intervallbeginn" : "at the interval start",
    end_boundary: o ? "am Intervallende" : "at the interval end",
    drive_boundary: o ? "bei einer Grenzfahrt" : "on a boundary-crossing drive"
  })[u] ?? (o ? "in einem Teilbereich" : "in part of the interval")), y = o ? {
    gps_distance_is_estimated: "Fahrstrecke anhand von GPS-Daten geschätzt",
    gps_coverage_incomplete: f.length ? `GPS-Daten unvollständig (${f.join(", ")})` : "GPS-Daten unvollständig",
    distance_missing: "Keine geeigneten GPS-Fahrten vorhanden",
    odometer_invalid: "Unplausible Kilometerstände"
  } : {
    gps_distance_is_estimated: "Distance estimated from GPS data",
    gps_coverage_incomplete: f.length ? `GPS data incomplete (${f.join(", ")})` : "GPS data incomplete",
    distance_missing: "No suitable GPS drives available",
    odometer_invalid: "Odometer readings are implausible"
  };
  return { prefix: r && l === "gps_distance_is_estimated" ? o ? "Hinweis" : "Note" : o ? "Grund" : "Reason", text: y[l] ?? (o ? "Verbrauch nicht zuverlässig bestimmbar" : "Consumption cannot be determined reliably") };
}
function mo(d) {
  return (d?.locale?.language ?? "").toLowerCase().startsWith("de") ? { label: "Fahrt löschen", title: "Fahrt löschen?", question: "Möchtest du diese Fahrt wirklich löschen?", confirm: "Fahrt löschen", effects: "Die Fahrt wird entfernt. GPS-Rohpunkte, Kosten, Aufenthalte und Reisen bleiben erhalten; dieselbe Fahrt wird nicht automatisch neu erzeugt.", date: "Datum / Uhrzeit" } : { label: "Delete drive", title: "Delete drive?", question: "Do you really want to delete this drive?", confirm: "Delete drive", effects: "The drive is removed. Raw GPS points, costs, stays, and trips remain; the same drive will not be recreated automatically.", date: "Date / time" };
}
function li(d) {
  return (d?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function ae(d, i) {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
  if (r) {
    const [, o, l, c] = r;
    return li(i).startsWith("de") ? `${c}.${l}.${o}` : `${l}/${c}/${o}`;
  }
  return new Date(d).toLocaleDateString(li(i));
}
function W(d, i) {
  return new Date(d).toLocaleString(li(i), { dateStyle: "short", timeStyle: "short" });
}
function hi(d, i) {
  return new Date(d).toLocaleTimeString(li(i), { hour: "2-digit", minute: "2-digit" });
}
function It(d, i) {
  const r = Math.max(0, Math.round((d ?? 0) / 60));
  return r < 60 ? `${r} min` : `${Math.floor(r / 60)} h ${r % 60} min`;
}
function Lt(d, i) {
  return d.start_date || d.end_date ? [d.start_date, d.end_date].filter(Boolean).map((r) => ae(r, i)).join(" – ") || "" : d.started_at ? `${ae(d.started_at, i)}${d.ended_at ? ` – ${ae(d.ended_at, i)}` : ""}` : "";
}
function go(d, i) {
  const r = d.start_date || d.started_at, o = d.end_date || d.ended_at;
  if (!r && !o) return "";
  const l = (v) => {
    const T = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    return T ? new Date(Number(T[1]), Number(T[2]) - 1, Number(T[3])) : new Date(v);
  }, c = l(r || o || ""), f = l(o || r || "");
  if (Number.isNaN(c.getTime()) || Number.isNaN(f.getTime())) return Lt(d, i);
  if (!(i?.locale?.language ?? "").toLowerCase().startsWith("de")) {
    const v = new Intl.DateTimeFormat("en-US", { month: "short" }), T = (D) => D.getDate(), b = (D) => D.getFullYear();
    return b(c) === b(f) && c.getMonth() === f.getMonth() ? `${v.format(c)} ${T(c)}–${T(f)}, ${b(c)}` : b(c) === b(f) ? `${v.format(c)} ${T(c)}–${v.format(f)} ${T(f)}, ${b(c)}` : `${v.format(c)} ${T(c)}, ${b(c)}–${v.format(f)} ${T(f)}, ${b(f)}`;
  }
  const u = (v) => `${String(v.getDate()).padStart(2, "0")}.${String(v.getMonth() + 1).padStart(2, "0")}.${String(v.getFullYear()).slice(-2)}`;
  return c.getFullYear() === f.getFullYear() && c.getMonth() === f.getMonth() ? `${String(c.getDate()).padStart(2, "0")}.–${u(f).slice(0, 2)}.${String(f.getMonth() + 1).padStart(2, "0")}.${String(f.getFullYear()).slice(-2)}` : `${u(c)}–${u(f)}`;
}
function Kt(d, i) {
  return w(i).statuses[d] ?? d;
}
function tn(d, i) {
  return w(i).categories[d] ?? d;
}
function jr(d, i) {
  return ((i?.locale?.language ?? "").toLowerCase().startsWith("de") ? { electricity: "Strom / Landstrom", fresh_water: "Frischwasser auffüllen", grey_water: "Grauwasser entsorgen", toilet_cassette: "Toilettenkassette entsorgen", shower: "Dusche" } : { electricity: "Electricity / shore power", fresh_water: "Refill fresh water", grey_water: "Dispose of grey water", toilet_cassette: "Dispose of toilet cassette", shower: "Shower" })[d] ?? d;
}
const vo = {
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
function _o(d) {
  const i = (d ?? "").trim();
  return vo[i] ?? i;
}
function yo(d, i) {
  const r = w(i), o = {
    other: r.placeOther,
    restaurant: r.placeRestaurant,
    fuel_stop: r.placeFuel,
    attraction: r.placeAttraction,
    ferry: r.placeFerry,
    campsite: r.placeCampsite,
    rv_site: r.placeRvSite,
    wild_camp: r.placeWildCamp,
    parking: bo(i) === "de" ? "Parkplatz" : "Parking",
    overnight: r.overnights
  };
  return d && o[d] || r.placeOther || d || "—";
}
function bo(d) {
  return (d?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de" : "en";
}
function xo(d) {
  return ls.includes(d);
}
function gt(d, i, r) {
  const o = (r?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(o, { style: "currency", currency: i, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(d / 100);
}
function Ot(d, i, r) {
  const o = (r?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(o, { minimumFractionDigits: i, maximumFractionDigits: i }).format(d);
}
function ii(d) {
  const i = d.trim().replace(/\s/g, "");
  if (!i) return null;
  const r = i.lastIndexOf(","), o = i.lastIndexOf(".");
  let l = i;
  if (r >= 0 && o >= 0) {
    const f = r > o ? "," : ".", y = f === "," ? "." : ",";
    l = i.replaceAll(y, "").replace(f, ".");
  } else r >= 0 && (l = i.replace(",", "."));
  if (!/^\d+(?:\.\d+)?$/.test(l)) return null;
  const c = Number(l);
  return Number.isFinite(c) ? c : null;
}
function Gr(d) {
  const i = d.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(i)) return null;
  const [r, o = ""] = i.split("."), l = Number(r) * 100 + Number((o + "00").slice(0, 2));
  return Number.isSafeInteger(l) ? l : null;
}
class Bt extends Gt {
  _hass;
  config = {};
  static styles = vt`
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
    const r = this._hass?.connection !== i?.connection;
    this._hass = i, r && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(i) {
    this.config.vehicle_id === i.vehicle_id && this.config.trip_id === i.trip_id && this.config.journal_section === i.journal_section && JSON.stringify(this.config.modules ?? null) === JSON.stringify(i.modules ?? null) && JSON.stringify(this.config.module_order ?? null) === JSON.stringify(i.module_order ?? null) || (this.config = { ...i }, this.onConfigChanged(), this.requestUpdate());
  }
  onHassConnectionChanged() {
  }
  onConfigChanged() {
  }
  updated() {
    if (this.tagName.toLowerCase().includes("journal-card") || this.config.journal_section || this.config.trip_id || this.shadowRoot?.querySelector(".migration-notice")) return;
    const i = this.shadowRoot?.querySelector("ha-card");
    if (!i) return;
    const r = w(this.hass), o = document.createElement("aside");
    o.className = "migration-notice", o.setAttribute("role", "note");
    const l = document.createElement("strong");
    l.textContent = r.migrationTitle ?? "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const c = document.createElement("p");
    c.textContent = r.migrationText ?? "Use the central journal card for new dashboards.";
    const f = document.createElement("a");
    f.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration", f.target = "_blank", f.rel = "noreferrer", f.textContent = r.migrationLink ?? "Migration guide", o.append(l, c, f), i.prepend(o);
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
    const i = w(this.hass);
    return m`<aside class="migration-notice" role="note"><strong>${i.migrationTitle}</strong><p>${i.migrationText}</p><a href="https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration" target="_blank" rel="noreferrer">${i.migrationLink}</a></aside>`;
  }
}
function pi(d, i) {
  customElements.get(d) || customElements.define(d, i);
}
async function F(d, i, r, o = {}) {
  return d.connection.sendMessagePromise({ type: i, vehicle_id: r, ...o });
}
const Nt = (d, i, r) => F(d, "camper_travel_journal/list", i, r ? { trip_id: r } : {}), wo = (d, i, r, o, l = 5e3) => F(d, "camper_travel_journal/route", i, { trip_id: r, drive_ids: o, max_points: l }), hs = (d, i, r, o) => F(d, "camper_travel_journal/transition_trip", i, { trip_id: r, status: o }), $o = (d, i, r, o = "", l = "", c = "") => F(d, "camper_travel_journal/create_trip", i, { title: r, start_date: o || void 0, end_date: l || void 0, destination: c }), ko = (d, i, r, o) => F(d, "camper_travel_journal/update_trip", i, { trip_id: r, ...o }), To = (d, i, r) => F(d, "camper_travel_journal/delete_trip", i, { trip_id: r }), Eo = (d, i, r, o) => F(d, "camper_travel_journal/unlink_drive", i, { trip_id: r, drive_id: o }), Po = (d, i, r, o) => F(d, "camper_travel_journal/link_drives", i, { trip_id: r, drive_ids: o }), So = (d, i, r) => F(d, "camper_travel_journal/create_manual_drive", i, r), Do = (d, i, r, o) => F(d, "camper_travel_journal/update_manual_drive", i, { drive_id: r, ...o }), ds = (d, i, r) => F(d, "camper_travel_journal/delete_drive", i, { drive_id: r }), Io = (d, i, r, o) => F(d, "camper_travel_journal/create_expense", i, { trip_id: r, ...o }), Lo = (d, i, r, o) => F(d, "camper_travel_journal/update_expense", i, { expense_id: r, ...o }), cs = (d, i, r, o) => F(d, "camper_travel_journal/create_stop", i, { trip_id: r, ...o }), Ao = (d, i, r, o) => F(d, "camper_travel_journal/update_stop", i, { stop_id: r, ...o }), Co = (d, i, r) => F(d, "camper_travel_journal/delete_stop", i, { stop_id: r }), cn = (d, i, r, o, l, c) => F(d, "camper_travel_journal/assign_interruption", i, { trip_id: r, interruption_id: o, status: l, stop_id: c }), us = (d, i, r, o, l) => F(d, "camper_travel_journal/create_stop_from_interruption", i, { trip_id: r, interruption_id: o, ...l }), Mo = (d, i, r, o) => F(d, "camper_travel_journal/update_overnight", i, { place_id: r, ...o }), zo = (d, i, r, o) => F(d, "camper_travel_journal/update_rating", i, { place_id: r, ...o }), Oo = (d, i, r) => F(d, "camper_travel_journal/delete_rating", i, { place_id: r }), Ro = (d, i, r) => F(d, "camper_travel_journal/generate_stop_suggestions", i, { trip_id: r, historical_only: !0 }), No = (d, i, r, o, l, c) => F(d, "camper_travel_journal/accept_stop_suggestion", i, { suggestion_id: r, trip_id: o, name: l, place_type: c }), Bo = (d, i, r) => F(d, "camper_travel_journal/dismiss_stop_suggestion", i, { suggestion_id: r }), Fo = (d, i, r) => F(d, "camper_travel_journal/delete_expense", i, { expense_id: r }), Zo = (d, i, r) => F(d, "camper_travel_journal/export_pdf", i, { trip_id: r }), fi = async (d) => (await d.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], Uo = (d, i, r) => F(d, "camper_travel_journal/analyze_gpx", i, { content_base64: r }), Wo = (d, i, r, o, l, c) => F(d, "camper_travel_journal/import_gpx", i, { content_base64: r, file_hash: o, drive_keys: l, trip_id: c }), ni = (d, i) => F(d, "camper_travel_journal/list_tankbook", i), qo = async (d, i) => (await F(d, "camper_travel_journal/list_fuel_expenses", i)).expenses, Ho = (d, i, r) => F(d, "camper_travel_journal/create_tank_event", i, r), jo = (d, i, r, o) => F(d, "camper_travel_journal/update_tank_event", i, { event_id: r, ...o }), Go = (d, i, r) => F(d, "camper_travel_journal/delete_tank_event", i, { event_id: r }), Ko = (d, i, r) => F(d, "camper_travel_journal/unlink_tank_event", i, { event_id: r, confirmed: !0 }), un = "camper-travel-journal-expenses-changed", Ce = "camper-travel-journal-data-changed";
function en(d) {
  window.dispatchEvent(new CustomEvent(un, { detail: d }));
}
function Q(d) {
  window.dispatchEvent(new CustomEvent(Ce, { detail: d }));
}
const wt = "camper-travel-journal-active-trip-changed";
function yn(d) {
  return `camper-travel-journal:${typeof window < "u" && window.location.pathname || "/"}:${d}`;
}
function mi(d) {
  if (!d || typeof window > "u") return "";
  try {
    return window.sessionStorage.getItem(yn(d)) ?? "";
  } catch {
    return "";
  }
}
function Rt(d) {
  if (!(!d.vehicleId || !d.tripId || typeof window > "u")) {
    try {
      window.sessionStorage.setItem(yn(d.vehicleId), d.tripId);
    } catch {
    }
    window.dispatchEvent(new CustomEvent(wt, { detail: d }));
  }
}
function Kr(d, i = "journal") {
  if (!(!d || typeof window > "u")) {
    try {
      window.sessionStorage.removeItem(yn(d));
    } catch {
    }
    window.dispatchEvent(new CustomEvent(wt, { detail: { vehicleId: d, tripId: "", source: i } }));
  }
}
class ps extends Bt {
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
    const r = i.detail;
    r?.vehicleId !== this.vehicleId || r.tripId === this.selectedTripId || (this.selectedTripId = r.tripId, this.refresh());
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(un, this.onDataChanged), window.addEventListener(Ce, this.onDataChanged), window.addEventListener(wt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(un, this.onDataChanged), window.removeEventListener(Ce, this.onDataChanged), window.removeEventListener(wt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(i) {
    const r = (o, l) => (l.started_at || "").localeCompare(o.started_at || "") || l.id.localeCompare(o.id);
    return i.filter((o) => o.status === "active").sort(r)[0] ?? [...i].sort(r)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const i = await Nt(this.hass, this.vehicleId);
      this.trips = i.trips;
      const r = mi(this.vehicleId), l = i.trips.find((f) => f.id === (r || this.selectedTripId)) ?? this.chooseDefaultTrip(i.trips);
      this.selectedTripId = l?.id ?? "", l && Rt({ vehicleId: this.vehicleId, tripId: l.id, source: "summary" });
      const c = l ? await Nt(this.hass, this.vehicleId, l.id) : i;
      return this.snapshot = l ? { ...c, trips: [l] } : c, this.loadError = "", !0;
    } catch {
      return this.loadError = w(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(i) {
    const r = this.snapshot?.trips[0];
    if (!(!this.hass || !r))
      try {
        await hs(this.hass, this.vehicleId, r.id, i), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = w(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(i) {
    !this.hass || this.loading || !this.trips.some((r) => r.id === i) || (this.selectedTripId = i, Rt({ vehicleId: this.vehicleId, tripId: i, source: "summary" }), await this.refresh());
  }
  render() {
    const i = w(this.hass), r = this.snapshot?.trips[0], o = this.trips, l = (this.snapshot?.drives ?? []).reduce((b, D) => b + D.distance_m, 0) / 1e3, f = (this.snapshot?.stops ?? []).filter((b) => b.confirmed !== !1).filter((b) => ["campsite", "rv_site", "wild_camp", "overnight"].includes(b.place_kind || b.place_type || b.stop_type)).length, y = this.snapshot?.expense_summary, u = y?.mixed_currency ? i.mixedCurrency : y?.total_minor !== void 0 && y.currency ? gt(y.total_minor, y.currency, this.hass) : gt(0, "EUR", this.hass), v = this.loadError || this.actionError, T = r ? Lt(r, this.hass) : "";
    return m`<ha-card><h2>${r?.title ?? i.title}</h2>${o.length ? m`<label class="trip-selector">${i.summaryChooseTrip}<select aria-label=${i.summaryTrip} @change=${(b) => {
      this.selectTrip(b.currentTarget.value);
    }} ?disabled=${this.loading}>${o.map((b) => m`<option value=${b.id} ?selected=${b.id === this.selectedTripId}>${b.title} · ${Kt(b.status, this.hass)} · ${Lt(b, this.hass)}</option>`)}</select></label>` : ""}${v ? m`<p class="error" role="alert">${v}</p>` : r ? m`<p class="muted">${r.destination || i.noDestination} · ${Kt(r.status, this.hass)} · ${T}</p><div class="grid"><div class="metric"><span class="muted">${i.distance}</span><span class="value">${Ot(l, 1, this.hass)} km</span></div><div class="metric"><span class="muted">${i.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${i.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${i.overnights ?? "Übernachtungsplätze"}</span><span class="value">${f}</span></div><div class="metric"><span class="muted">${i.costs}</span><span class="value">${u}</span></div></div><div class="actions">${r.status === "planned" ? m`<button @click=${() => this.setStatus("active")}>${i.start}</button>` : r.status === "paused" ? m`<button @click=${() => this.setStatus("active")}>${i.resume}</button>` : ""}${r.status === "active" ? m`<button class="secondary" @click=${() => this.setStatus("paused")}>${i.pause}</button><button @click=${() => this.setStatus("completed")}>${i.complete}</button>` : ""}</div>` : m`<p class="muted">${i.noTrip}</p>`}${this.loading ? m`<p class="muted">${i.loading}</p>` : ""}</ha-card>`;
  }
}
ps.styles = [Bt.styles, vt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px}.metric{min-width:0;min-height:3.7rem;padding:10px;border-radius:9px;background:var(--secondary-background-color);display:flex;flex-direction:column;justify-content:center}.metric .muted{min-width:0;overflow-wrap:anywhere;word-break:normal;line-height:1.2}.metric .value{margin-top:3px;white-space:nowrap}@media(max-width:420px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.metric{padding:8px;font-size:.9em}}`];
pi("camper-travel-journal-summary-card", ps);
function oe(d) {
  const i = d.trim().replace(",", ".");
  if (!i) return null;
  const r = Number(i);
  return Number.isFinite(r) && r >= 0 ? r : null;
}
function nn(d, i, r, o) {
  const l = { ...d, [i]: r };
  o.add(i);
  const c = oe(l.amount), f = oe(l.liters), y = oe(l.price);
  return c !== null && f !== null && f > 0 && !o.has("price") ? l.price = (c / f).toFixed(3) : c !== null && y !== null && y > 0 && !o.has("liters") ? l.liters = (c / y).toFixed(3) : f !== null && y !== null && f > 0 && y > 0 && !o.has("amount") && (l.amount = (Math.round(f * y * 100) / 100).toFixed(2)), l;
}
function Vr(d) {
  const i = oe(d.amount), r = oe(d.liters), o = oe(d.price);
  return {
    ...i === null ? {} : { amount_minor: Math.round(i * 100) },
    fuel_liters: r,
    fuel_price_per_liter: o
  };
}
class $t extends Bt {
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
  category = ei[0];
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
  expenseServices = [];
  editingExpenseServices = [];
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
  deletingDrive;
  deletingDriveTripId = "";
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
  suggestionsBusy = !1;
  suggestionStatus = "";
  embeddedTripId() {
    return this.config.trip_id ?? "";
  }
  embeddedSection() {
    return this.config.journal_section ?? "all";
  }
  onActiveTripChanged = (i) => {
    const r = i.detail;
    r?.vehicleId !== this.vehicleId || r.tripId === this.activeTripId || (this.activeTripId = r.tripId, this.selected = "", this.refresh());
  };
  async refreshSuggestions(i) {
    if (!(!this.hass || this.suggestionsBusy)) {
      this.suggestionsBusy = !0, this.suggestionStatus = "", this.actionError = "", this.requestUpdate();
      try {
        const r = await Ro(this.hass, this.vehicleId, i);
        if (await this.refreshAfterWrite()) {
          const o = this.snapshot?.stop_suggestions?.length ?? r.suggestions.length;
          this.suggestionStatus = o ? `Vorschläge aktualisiert: ${o}` : "Keine neuen offenen Vorschläge";
        }
      } catch {
        this.fail(w(this.hass).loadError);
      } finally {
        this.suggestionsBusy = !1, this.requestUpdate();
      }
    }
  }
  async acceptSuggestion(i, r) {
    if (this.hass) {
      if (this.suggestionEditingId !== i.id) {
        this.suggestionEditingId = i.id, this.suggestionName = "GPS-Stopp", this.suggestionType = "other", this.requestUpdate();
        return;
      }
      try {
        await No(this.hass, this.vehicleId, i.id, r, this.suggestionName, this.suggestionType), this.suggestionEditingId = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
      } catch {
        this.fail(w(this.hass).loadError);
      }
    }
  }
  async dismissSuggestion(i, r) {
    if (this.hass)
      try {
        await Bo(this.hass, this.vehicleId, i.id), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
      } catch {
        this.fail(w(this.hass).loadError);
      }
  }
  resetPlaceForm() {
    this.placeName = "", this.placeType = "other", this.placeArrived = "", this.placeDeparted = "", this.placeLatitude = "", this.placeLongitude = "", this.placeDescription = "", this.placeAddress = "", this.placeWebsite = "", this.editingPlaceId = "", this.interruptionDriveId = "", this.interruptionId = "";
  }
  nowLocalDateTime() {
    const i = /* @__PURE__ */ new Date(), r = (o) => String(o).padStart(2, "0");
    return `${i.getFullYear()}-${r(i.getMonth() + 1)}-${r(i.getDate())}T${r(i.getHours())}:${r(i.getMinutes())}`;
  }
  todayLocalDate() {
    return this.nowLocalDateTime().slice(0, 10);
  }
  openEditor(i, r) {
    this.editorKind = i, this.editorTripId = r, this.editorDirty = !1, this.discardPrompt = !1, this.actionError = "", this.requestUpdate();
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
    this.onEditorUpdated(), this.syncTripDeleteDialog(), this.syncDriveDeleteDialog();
  }
  syncDriveDeleteDialog() {
    const i = this.renderRoot.querySelector("dialog.drive-delete-dialog");
    i && (this.deletingDrive && !i.open && i.showModal(), !this.deletingDrive && i.open && i.close());
  }
  syncTripDeleteDialog() {
    const i = this.renderRoot.querySelector("dialog.trip-delete-dialog");
    i && (this.deletingTrip && !i.open && i.showModal(), !this.deletingTrip && i.open && i.close());
  }
  placePayload() {
    const i = (r) => r.trim() ? Number(r.replace(",", ".")) : void 0;
    return { name: this.placeName.trim(), place_type: this.placeType, category: this.placeType, drive_id: this.interruptionDriveId || void 0, occurred_at: new Date(this.placeArrived).toISOString(), arrived_at: new Date(this.placeArrived).toISOString(), departed_at: this.placeDeparted ? new Date(this.placeDeparted).toISOString() : void 0, latitude: i(this.placeLatitude), longitude: i(this.placeLongitude), address: this.placeAddress, description: this.placeDescription };
  }
  editPlace(i) {
    this.editingPlaceId = i.id, this.placeName = i.name, this.placeType = i.place_type || i.stop_type, this.placeArrived = i.arrived_at ? this.placeLocalDateTime(i.arrived_at) : this.placeLocalDateTime(i.occurred_at), this.placeDeparted = i.departed_at ? this.placeLocalDateTime(i.departed_at) : "", this.placeLatitude = i.latitude == null ? "" : String(i.latitude), this.placeLongitude = i.longitude == null ? "" : String(i.longitude), this.placeDescription = i.description || "", this.placeAddress = i.address || "", this.placeWebsite = i.website_url || "", this.openEditor("place-edit", this.activeTripId);
  }
  placeLocalDateTime(i) {
    const r = new Date(i), o = (l) => String(l).padStart(2, "0");
    return `${r.getFullYear()}-${o(r.getMonth() + 1)}-${o(r.getDate())}T${o(r.getHours())}:${o(r.getMinutes())}`;
  }
  async assignExistingInterruption(i, r = i.existing_place_id || "") {
    if (!(!this.hass || !r || this.placeSaving)) {
      this.placeSaving = !0;
      try {
        const o = (this.snapshot?.stops ?? []).find((y) => y.id === r), l = o?.place_kind || o?.place_type || o?.stop_type, c = i.existing_places?.find((y) => y.id === r), f = c?.place_kind || c?.place_type || c?.stop_type;
        await cn(this.hass, this.vehicleId, this.activeTripId, i.id, ["campsite", "rv_site", "wild_camp", "overnight"].includes(l || f || "") ? "overnight" : "stop", r), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: this.activeTripId }));
      } catch {
        this.fail(w(this.hass).placeSaveError ?? w(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  startInterruption(i) {
    this.editingPlaceId = "", this.interruptionId = i.id, this.interruptionDriveId = i.previous_drive_id, this.placeName = "", this.placeType = "other", this.placeArrived = this.placeLocalDateTime(i.started_at), this.placeDeparted = this.placeLocalDateTime(i.ended_at);
    const r = i.previous_end_point;
    this.placeLatitude = r ? String(r.latitude) : "", this.placeLongitude = r ? String(r.longitude) : "", this.placeDescription = "", this.placeAddress = "", this.placeWebsite = "", this.selected = this.activeTripId, this.openEditor("place-create", this.activeTripId);
  }
  async savePlace(i) {
    if (!this.hass || this.placeSaving || !this.placeName.trim() || !this.placeArrived) return this.fail(w(this.hass).placeSaveError ?? w(this.hass).dateInvalid);
    this.placeSaving = !0;
    try {
      const r = this.placePayload();
      let o = this.editingPlaceId;
      o ? await Ao(this.hass, this.vehicleId, o, r) : this.interruptionId ? o = (await us(this.hass, this.vehicleId, i, this.interruptionId, { name: this.placeName.trim(), place_type: this.placeType, overnight: ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType), address: this.placeAddress.trim(), description: this.placeDescription.trim(), website_url: this.placeWebsite.trim() || void 0 })).stop_id : o = (await cs(this.hass, this.vehicleId, i, r)).stop_id, !this.interruptionId && ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType) && await Mo(this.hass, this.vehicleId, o, { place_kind: this.placeType, website_url: this.placeWebsite }), this.resetPlaceForm(), this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(w(this.hass).placeSaveError ?? w(this.hass).loadError);
    } finally {
      this.placeSaving = !1, this.requestUpdate();
    }
  }
  async removePlace(i, r) {
    if (!(!this.hass || this.placeSaving)) {
      if (this.confirmingPlaceId !== i.id) {
        this.confirmingPlaceId = i.id, this.requestUpdate();
        return;
      }
      this.placeSaving = !0;
      try {
        await Co(this.hass, this.vehicleId, i.id), this.confirmingPlaceId = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
      } catch {
        this.fail(w(this.hass).placeDeleteError ?? w(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  async saveRating(i, r) {
    if (!this.hass || this.ratingSaving) return;
    const o = [this.ratingOverall, this.ratingAccess, this.ratingSpace, this.ratingFacilities, this.ratingSurroundings];
    if (!this.ratingOverall || o.slice(1).some((l) => l && (!/^\d$/.test(l) || Number(l) < 1 || Number(l) > 5))) return this.fail(w(this.hass).ratingInvalid ?? w(this.hass).dateInvalid);
    this.ratingSaving = !0;
    try {
      await zo(this.hass, this.vehicleId, i, { overall: Number(this.ratingOverall), large_rv_access: this.ratingAccess ? Number(this.ratingAccess) : void 0, space_maneuvering: this.ratingSpace ? Number(this.ratingSpace) : void 0, facilities: this.ratingFacilities ? Number(this.ratingFacilities) : void 0, surroundings: this.ratingSurroundings ? Number(this.ratingSurroundings) : void 0, review_text: this.ratingText }), this.ratingPlaceId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
    } catch {
      this.fail(w(this.hass).ratingSaveError ?? w(this.hass).loadError);
    } finally {
      this.ratingSaving = !1, this.requestUpdate();
    }
  }
  async removeRating(i, r) {
    if (!(!this.hass || this.ratingSaving)) {
      this.ratingSaving = !0;
      try {
        await Oo(this.hass, this.vehicleId, i), this.ratingPlaceId = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
      } catch {
        this.fail(w(this.hass).ratingSaveError ?? w(this.hass).loadError);
      } finally {
        this.ratingSaving = !1, this.requestUpdate();
      }
    }
  }
  startRating(i) {
    this.ratingPlaceId = i.id, this.ratingOverall = i.rating_overall ? String(i.rating_overall) : "", this.ratingAccess = i.large_rv_access ? String(i.large_rv_access) : "", this.ratingSpace = i.space_maneuvering ? String(i.space_maneuvering) : "", this.ratingFacilities = i.facilities ? String(i.facilities) : "", this.ratingSurroundings = i.surroundings ? String(i.surroundings) : "", this.ratingText = i.review_text || "", this.openEditor("rating-edit", this.activeTripId);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(wt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(wt, this.onActiveTripChanged), super.disconnectedCallback();
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
      const i = this.embeddedTripId() || mi(this.vehicleId);
      this.activeTripId || (this.activeTripId = i);
      let r = await Nt(this.hass, this.vehicleId, this.activeTripId || void 0);
      const o = r.trips.find((l) => l.id === this.activeTripId) ?? r.trips.find((l) => l.status === "active") ?? r.trips[0];
      o && this.activeTripId !== o.id ? (this.activeTripId = o.id, this.embeddedTripId() || Rt({ vehicleId: this.vehicleId, tripId: this.activeTripId, source: "manager" }), r = await Nt(this.hass, this.vehicleId, this.activeTripId)) : o && !this.embeddedTripId() && Rt({ vehicleId: this.vehicleId, tripId: o.id, source: "manager" }), this.snapshot = r;
      try {
        const l = await fi(this.hass);
        this.vehicleName = l.find((c) => c.vehicle_id === this.vehicleId)?.name || "";
      } catch {
        this.vehicleName = "";
      }
      return this.loadError = "", this.actionError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = w(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(i) {
    this.actionError = i, this.requestUpdate();
  }
  async refreshAfterWrite(i) {
    return await this.refresh() ? (i?.(), !0) : (this.actionError = w(this.hass).savedRefreshError, this.requestUpdate(), !1);
  }
  async readGPX(i) {
    const r = i.currentTarget.files?.[0];
    if (!(!r || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = r.name;
      try {
        const o = new Uint8Array(await r.arrayBuffer());
        let l = "";
        o.forEach((c) => {
          l += String.fromCharCode(c);
        }), this.gpxContent = btoa(l), this.gpxPreview = await Uo(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((c) => c.key)), this.gpxTripId = this.activeTripId;
      } catch {
        this.gpxError = w(this.hass).gpxAnalyzeError;
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
        await Wo(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], i), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i ?? "" }));
      } catch {
        this.gpxError = w(this.hass).gpxImportError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  setExpenseAmount(i) {
    this.amount = i, this.fuel = nn(this.fuel, "amount", i, this.fuelManual), this.requestUpdate();
  }
  setEditingExpenseAmount(i) {
    this.editingAmount = i, this.requestUpdate();
  }
  setExpenseCategory(i) {
    if (!xo(i)) return this.fail(w(this.hass).categoryInvalid);
    this.category = i, i !== "fuel" && (this.fuel = { amount: this.amount, liters: "", price: "" }), this.requestUpdate();
  }
  setEditingExpenseCategory(i) {
    if (!i.trim()) return this.fail(w(this.hass).categoryInvalid);
    this.editingCategory = i, i !== "fuel" && (this.editingFuel = { amount: this.editingAmount, liters: "", price: "" }), this.requestUpdate();
  }
  setFuel(i, r, o) {
    o ? this.editingFuel = nn(this.editingFuel, i, r, this.editingFuelManual) : (this.fuel = nn(this.fuel, i, r, this.fuelManual), this.amount = this.fuel.amount), this.markEditorDirty();
  }
  gpxPeriod() {
    const i = (this.gpxPreview?.points ?? []).map((r) => r.recorded_at).sort();
    return i.length ? { start: i[0], end: i[i.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((i) => this.gpxSelected.has(i.key)).reduce((i, r) => i + r.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(i) {
    const r = this.gpxPeriod();
    if (!r || !i || !i.start_date && !i.end_date) return !1;
    const o = r.start.slice(0, 10), l = r.end.slice(0, 10);
    return !!(i.start_date && o < i.start_date || i.end_date && l > i.end_date);
  }
  async addTrip() {
    if (this.hass) {
      if (!this.tripTitle.trim()) return this.fail(w(this.hass).tripCreateError);
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(w(this.hass).dateInvalid);
      if (!this.tripSaving) {
        this.tripSaving = !0, this.requestUpdate();
        try {
          const r = (await $o(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination)).trip_id;
          this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", this.closeEditor(!0), await this.refreshAfterWrite(() => {
            Q({ vehicleId: this.vehicleId, tripId: r ?? this.activeTripId }), this.dispatchEvent(new CustomEvent("trip-created", { detail: { tripId: r }, bubbles: !0, composed: !0 }));
          });
        } catch {
          this.fail(w(this.hass).tripCreateError);
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
    if (!this.hass || this.tripSaving || !this.editingTripTitle.trim()) return this.fail(w(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(w(this.hass).dateInvalid);
    this.tripSaving = !0, this.requestUpdate();
    try {
      await ko(this.hass, this.vehicleId, i.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i.id }));
    } catch {
      this.fail(w(this.hass).tripEditError);
    } finally {
      this.tripSaving = !1, this.requestUpdate();
    }
  }
  removeTrip(i) {
    const r = this.snapshot?.trips.find((o) => o.id === i);
    r && (this.deletingTrip = r, this.requestUpdate());
  }
  cancelTripDelete() {
    this.deletingTrip = void 0, this.requestUpdate();
  }
  async confirmTripDelete() {
    if (!this.hass || !this.deletingTrip) return;
    const i = this.deletingTrip.id;
    try {
      await To(this.hass, this.vehicleId, i), this.deletingTrip = void 0, this.selected === i && (this.selected = ""), this.activeTripId === i && (this.activeTripId = ""), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(w(this.hass).tripDeleteError);
    }
  }
  async changeStatus(i, r) {
    if (this.hass)
      try {
        await hs(this.hass, this.vehicleId, i, r), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(w(this.hass).statusError);
      }
  }
  switchTrip() {
    this.dispatchEvent(new CustomEvent("trip-switch", { bubbles: !0, composed: !0 }));
  }
  renderTripActions(i, r) {
    return m`<section class="trip-actions" aria-label=${i.tripActions ?? "Reiseaktionen"}><div class="trip-actions-grid">
      ${r.status === "planned" ? m`<button type="button" class="trip-action trip-action-primary" data-trip-action="start" @click=${() => this.changeStatus(r.id, "active")}>${i.start}</button>` : ""}
      ${r.status === "active" ? m`<button type="button" class="trip-action trip-action-secondary" data-trip-action="pause" @click=${() => this.changeStatus(r.id, "paused")}>${i.pause}</button><button type="button" class="trip-action trip-action-secondary" data-trip-action="complete" @click=${() => this.changeStatus(r.id, "completed")}>${i.complete}</button>` : ""}
      ${r.status === "paused" ? m`<button type="button" class="trip-action trip-action-primary" data-trip-action="resume" @click=${() => this.changeStatus(r.id, "active")}>${i.resume}</button><button type="button" class="trip-action trip-action-secondary" data-trip-action="complete" @click=${() => this.changeStatus(r.id, "completed")}>${i.complete}</button>` : ""}
      ${r.status === "completed" ? m`<button type="button" class="trip-action trip-action-primary" data-trip-action="reactivate" @click=${() => this.changeStatus(r.id, "active")}>${i.tripReactivate ?? i.resume}</button>` : ""}
      <button type="button" class="trip-action trip-action-secondary" data-trip-action="edit" @click=${() => this.startTripEdit(r)}>${i.edit}</button>
      <button type="button" class="trip-action trip-action-secondary" data-trip-action="switch" @click=${() => this.switchTrip()}>${i.journalClose ?? "Reise wechseln"}</button>
    </div><div class="trip-delete-action"><button type="button" class="trip-action danger" data-trip-action="delete" @click=${() => this.removeTrip(r.id)}>${i.remove}</button></div></section>${this.renderTripDeleteDialog(i)}`;
  }
  renderTripDeleteDialog(i) {
    return this.deletingTrip ? m`<dialog class="trip-delete-dialog" aria-labelledby="trip-delete-title" @cancel=${(r) => {
      r.preventDefault(), this.cancelTripDelete();
    }}><form method="dialog" @submit=${(r) => {
      r.preventDefault(), this.confirmTripDelete();
    }}><h3 id="trip-delete-title">${i.tripDeleteTitle ?? "Reise löschen?"}</h3><p>${i.tripDeleteConfirm ?? "Die Reise wird gelöscht."}</p><ul><li>${i.tripDeleteDrives ?? "Zugeordnete Fahrten bleiben erhalten."}</li><li>${i.tripDeleteLinkedData ?? "Kosten und Orte bleiben erhalten, verlieren aber ihre Reisezuordnung."}</li></ul><div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.cancelTripDelete()}>${i.cancel}</button><button type="submit" class="danger">${i.remove}</button></div></form></dialog>` : "";
  }
  async assignDrive(i, r) {
    if (this.hass)
      try {
        await Po(this.hass, this.vehicleId, i, [r]), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(w(this.hass).driveAssignError);
      }
  }
  async unassignDrive(i, r) {
    if (this.hass)
      try {
        await Eo(this.hass, this.vehicleId, i, r), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
      } catch {
        this.fail(w(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(i) {
    this.selected = this.selected === i ? "" : i, this.selected ? (this.activeTripId = i, Rt({ vehicleId: this.vehicleId, tripId: i, source: "manager" }), this.refresh()) : this.requestUpdate();
  }
  async addManualDrive(i) {
    if (!this.hass || this.manualSaving) return;
    const r = Number(this.manualDistanceKm.replace(",", ".")), o = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(r) || r < 0 || o !== void 0 && (!Number.isInteger(o) || o < 0)) return this.fail(w(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await So(this.hass, this.vehicleId, { trip_id: i, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: r, ...o === void 0 ? {} : { duration_minutes: o } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(w(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(i) {
    const r = new Date(i), o = (l) => String(l).padStart(2, "0");
    return `${r.getFullYear()}-${o(r.getMonth() + 1)}-${o(r.getDate())}T${o(r.getHours())}:${o(r.getMinutes())}`;
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
  async saveManualDrive(i, r) {
    if (!this.hass || this.driveSavingId) return;
    const o = Number(this.editingDriveDistanceKm.replace(",", ".")), l = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(o) || o < 0 || l !== void 0 && (!Number.isInteger(l) || l < 0)) return this.fail(w(this.hass).dateInvalid);
    this.driveSavingId = i.id;
    try {
      await Do(this.hass, this.vehicleId, i.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: o, ...l === void 0 ? {} : { duration_minutes: l } }), this.actionError = "", this.editingDriveId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
    } catch {
      this.fail(w(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(i, r) {
    const o = (this.snapshot?.drives ?? []).find((l) => l.id === r) ?? (this.snapshot?.available_drives ?? []).find((l) => l.id === r);
    o && this.openDriveDeleteDialog(o, i);
  }
  openDriveDeleteDialog(i, r) {
    this.deletingDrive = i, this.deletingDriveTripId = r, this.requestUpdate();
  }
  closeDriveDeleteDialog() {
    this.deletingDrive = void 0, this.deletingDriveTripId = "", this.requestUpdate();
  }
  async confirmDriveDelete() {
    if (!this.hass || !this.deletingDrive || this.driveSavingId) return;
    const i = this.deletingDrive, r = this.deletingDriveTripId;
    this.driveSavingId = i.id;
    try {
      await ds(this.hass, this.vehicleId, i.id), this.closeDriveDeleteDialog(), this.actionError = "", await this.refreshAfterWrite(() => Q({ vehicleId: this.vehicleId, tripId: r }));
    } catch {
      this.fail(w(this.hass).driveDeleteError ?? w(this.hass).loadError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async addExpense(i) {
    if (!this.hass || this.expenseSavingId) return;
    const r = w(this.hass), o = this.category === "fuel" ? Vr(this.fuel) : { amount_minor: Gr(this.amount) };
    if (o.amount_minor === void 0) return this.fail(r.amountInvalid);
    const l = this.expenseDate || this.todayLocalDate();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(l)) return this.fail(r.dateInvalid);
    this.expenseSavingId = "__create__";
    try {
      await Io(this.hass, this.vehicleId, i, { occurred_on: l, ...this.expenseTimeEnabled && this.expenseTime ? { occurred_time: this.expenseTime } : {}, category: this.category, services: this.category === "water_waste" ? this.expenseServices : [], currency: "EUR", note: this.expenseNote.trim() || void 0, ...o }), this.actionError = "", this.amount = "", this.expenseNote = "", this.closeEditor(!0), await this.refreshAfterWrite(() => en({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(r.expenseCreateError);
    } finally {
      this.expenseSavingId = "", this.requestUpdate();
    }
  }
  startExpenseCreate(i) {
    this.amount = "", this.expenseNote = "", this.expenseServices = [], this.fuel = { amount: "", liters: "", price: "" }, this.fuelManual = /* @__PURE__ */ new Set(), this.category = ei[0], this.expenseDate = this.todayLocalDate(), this.expenseTime = "", this.expenseTimeEnabled = !1, this.openEditor("expense-create", i);
  }
  startExpenseEdit(i) {
    this.editingExpenseId = i.id, this.editingAmount = (i.amount_minor / 100).toFixed(2), this.editingCategory = _o(i.category), this.editingExpenseServices = [...i.services ?? []], this.editingExpenseNote = i.note ?? "", this.editingFuel = { amount: this.editingAmount, liters: i.fuel_liters == null ? "" : String(i.fuel_liters), price: i.fuel_price_per_liter == null ? "" : String(i.fuel_price_per_liter) }, this.editingFuelManual = /* @__PURE__ */ new Set(["amount", ...i.fuel_liters == null ? [] : ["liters"], ...i.fuel_price_per_liter == null ? [] : ["price"]]), this.editingExpenseDate = i.occurred_on ?? "", this.editingExpenseTime = i.occurred_time ?? "", this.editingExpenseTimeEnabled = !!i.occurred_time, this.openEditor("expense-edit", i.trip_id ?? this.activeTripId);
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.editingExpenseServices = [], this.editingExpenseNote = "", this.editingExpenseDate = "", this.editingExpenseTime = "", this.editingExpenseTimeEnabled = !1, this.closeEditor();
  }
  async saveExpense(i) {
    if (!this.hass || this.expenseSavingId) return;
    const r = w(this.hass), o = this.editingCategory === "fuel" ? Vr(this.editingFuel) : { amount_minor: Gr(this.editingAmount) };
    if (o.amount_minor === void 0) return this.fail(r.amountInvalid);
    if (!this.editingCategory.trim()) return this.fail(r.categoryInvalid);
    if (this.editingExpenseDate && !/^\d{4}-\d{2}-\d{2}$/.test(this.editingExpenseDate)) return this.fail(r.dateInvalid);
    this.expenseSavingId = i.id;
    try {
      await Lo(this.hass, this.vehicleId, i.id, { category: this.editingCategory, services: this.editingCategory === "water_waste" ? this.editingExpenseServices : [], note: this.editingExpenseNote.trim() || null, ...this.editingExpenseDate ? { occurred_on: this.editingExpenseDate } : {}, occurred_time: this.editingExpenseTimeEnabled && this.editingExpenseTime ? this.editingExpenseTime : null, ...o }), this.actionError = "", this.editingExpenseId = "", this.closeEditor(!0), await this.refreshAfterWrite(() => en({ vehicleId: this.vehicleId, tripId: i.trip_id ?? this.activeTripId }));
    } catch {
      this.fail(r.expenseEditError);
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
        await Fo(this.hass, this.vehicleId, i), this.confirmingExpenseId = "", this.actionError = "", await this.refreshAfterWrite(() => en({ vehicleId: this.vehicleId, tripId: this.activeTripId }));
      } catch {
        this.fail(w(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(i) {
    const r = [...ei];
    return i && !r.includes(i) && r.unshift(i), r;
  }
  async downloadPdf(i) {
    if (!(!this.hass || this.pdfBusyTripId)) {
      this.pdfBusyTripId = i.id, this.actionError = "", this.requestUpdate();
      try {
        const r = await Zo(this.hass, this.vehicleId, i.id), o = atob(r.pdf_base64), l = Uint8Array.from(o, (y) => y.charCodeAt(0)), c = URL.createObjectURL(new Blob([l], { type: r.content_type })), f = document.createElement("a");
        f.href = c, f.download = r.filename, f.click(), window.setTimeout(() => URL.revokeObjectURL(c), 1e3);
      } catch {
        this.fail(w(this.hass).pdfExportError);
      } finally {
        this.pdfBusyTripId = "", this.requestUpdate();
      }
    }
  }
  renderExpense(i, r) {
    const o = i.occurred_on ? `${ae(i.occurred_on, this.hass)}${i.occurred_time ? ` ${i.occurred_time}` : ""}` : r.expenseDateUnknown ?? "Ausgabendatum unbekannt";
    return m`<div class="expense-row"><div class="expense-info"><span class="expense-date">${o}</span><strong>${tn(i.category, this.hass)}</strong><span class="expense-amount">${gt(i.amount_minor, i.currency, this.hass)}</span>${i.tank_event_id ? m`<span class="linked-label">Mit Tankbuch verknüpft</span>` : ""}${i.category === "water_waste" && i.services?.length ? m`<span class="expense-services">${i.services.map((l) => jr(l, this.hass)).join(" · ")}</span>` : ""}${i.category === "fuel" && (i.fuel_liters != null || i.fuel_price_per_liter != null) ? m`<span class="fuel-details">${i.fuel_liters == null ? "" : `${i.fuel_liters.toFixed(3)} l`}${i.fuel_liters != null && i.fuel_price_per_liter != null ? " · " : ""}${i.fuel_price_per_liter == null ? "" : `${i.fuel_price_per_liter.toFixed(3)} €/l`}</span>` : ""}${i.note ? m`<span class="expense-note">${i.note}</span>` : ""}</div><span class="actions expense-actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(i)} ?disabled=${!!this.expenseSavingId}>${r.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(i.id)}>${this.confirmingExpenseId === i.id ? r.confirmDelete : r.remove}</button></span></div>`;
  }
  renderDrive(i, r, o) {
    const l = i.source === "manual" ? o.sourceManual : i.source === "gpx" ? o.sourceGpx ?? o.sourceGps : o.sourceGps, c = `${o.driveStart}: ${W(i.started_at, this.hass)} · ${o.driveEnd}: ${i.ended_at ? W(i.ended_at, this.hass) : "–"}`, f = i.trip_id === r ? m`<button type="button" class="link" @click=${() => this.unassignDrive(r, i.id)}>${o.unassign}</button>` : m`<button type="button" class="link" @click=${() => this.assignDrive(r, i.id)}>${o.assign}</button>`, y = m`${i.source === "manual" ? m`<button type="button" class="link" @click=${() => this.startManualDriveEdit(i)} ?disabled=${!!this.driveSavingId}>${o.edit}</button>` : ""}<button type="button" class="link danger-link" @click=${() => this.openDriveDeleteDialog(i, r)} ?disabled=${!!this.driveSavingId}>${o.driveDelete ?? o.remove}</button>`;
    return m`<div class="drive-row"><div><strong>${l}</strong> · ${c}${i.start_label || i.end_label ? m`<br><span class="muted">${i.start_label || "–"} → ${i.end_label || "–"}</span>` : ""}<br><span class="muted">${(i.distance_m / 1e3).toFixed(1)} km · ${i.duration_seconds ? It(i.duration_seconds, this.hass) : "–"} · ${i.assignment_status === "assigned" ? o.assignedDrives : o.freeDrives}</span></div><span class="actions">${y}${f}</span></div>`;
  }
  renderDriveDeleteDialog(i) {
    const r = this.deletingDrive, l = (this.hass?.locale?.language ?? "").toLowerCase().startsWith("de") ? { title: "Fahrt löschen?", question: "Möchtest du diese Fahrt wirklich löschen?", date: "Datum", distance: "Entfernung", effects: "Die Fahrt wird entfernt. GPS-Rohpunkte, Kosten, Aufenthalte und Reisen bleiben erhalten; dieselbe Fahrt wird nicht automatisch neu erzeugt.", confirm: "Fahrt löschen" } : { title: "Delete drive?", question: "Do you really want to delete this drive?", date: "Date", distance: "Distance", effects: "The drive is removed. Raw GPS points, costs, stays, and trips remain; the same drive will not be recreated automatically.", confirm: "Delete drive" };
    return m`<dialog class="drive-delete-dialog" @cancel=${(c) => {
      c.preventDefault(), this.closeDriveDeleteDialog();
    }}><form method="dialog" @submit=${(c) => {
      c.preventDefault(), this.confirmDriveDelete();
    }}><h3>${l.title}</h3>${r ? m`<p>${l.question}</p><dl><dt>${l.date}</dt><dd>${W(r.started_at, this.hass)}</dd><dt>${i.driveStart ?? "Start"}</dt><dd>${W(r.started_at, this.hass)}</dd><dt>${i.driveEnd ?? "Ende"}</dt><dd>${r.ended_at ? W(r.ended_at, this.hass) : "–"}</dd><dt>${l.distance}</dt><dd>${(r.distance_m / 1e3).toFixed(1)} km</dd></dl><p class="muted">${l.effects}</p>` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeDriveDeleteDialog()}>${i.cancel}</button><button type="submit" class="danger" ?disabled=${!!this.driveSavingId}>${this.driveSavingId ? i.saving : l.confirm}</button></div></form></dialog>`;
  }
  renderInterruptions(i, r) {
    const o = (this.snapshot?.interruptions ?? []).filter((l) => l.status === "unassigned");
    return m`<section class="place-section"><details open><summary><strong>${i.unassignedInterruptions ?? "Nicht zugeordnete Fahrtunterbrechungen"}</strong><span>${o.length}</span></summary>${o.length ? o.map((l) => m`<article class="interruption-row"><div class="interruption-copy"><strong>${W(l.started_at, this.hass)} → ${W(l.ended_at, this.hass)}</strong><span class="muted">${It(l.duration_seconds, this.hass)} · ${i.interruptionUnconfirmed ?? "Nicht als Aufenthalt nachgewiesen"}</span>${l.existing_places?.length ? m`<span class="candidate-label">Vorhandener Aufenthalt: ${l.existing_places.map((c) => c.name).join(", ")}</span>` : ""}</div><div class="actions compact-actions">${l.existing_places?.map((c) => m`<button type="button" class="link" @click=${() => {
      this.assignExistingInterruption(l, c.id);
    }} ?disabled=${this.placeSaving}>${i.assign ?? "Zuordnen"}: ${c.name}</button>`)}<button type="button" @click=${() => this.startInterruption(l)}>${i.recordInterruption ?? "Neuen Aufenthalt erfassen"}</button></div></article>`) : m`<p class="muted">${i.noPlaces ?? "Keine Unterbrechungen zwischen Fahrten."}</p>`}</details></section>`;
  }
  renderGpx(i, r, o) {
    const l = !!this.embeddedTripId(), c = r.find((u) => u.id === this.gpxTripId), f = this.gpxPeriod(), y = this.gpxTripPeriodWarning(c);
    return m`<section class="gpx-import gpx-explicit"><h3>${i.gpxImport}</h3><p class="muted"><strong>${l ? i.gpxTargetTrip ?? "Reise" : i.gpxVehicle}:</strong> ${l ? c?.title || "" : this.vehicleName || i.editorVehicle}</p>${l ? "" : m`<label>${i.gpxTargetTrip}<select aria-label=${i.gpxTargetTrip} .value=${this.gpxTripId} @change=${(u) => {
      this.gpxTripId = u.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.gpxNoTrip}</option>${r.map((u) => m`<option value=${u.id}>${u.title} · ${Kt(u.status, this.hass)} · ${Lt(u, this.hass) || i.period}</option>`)}</select></label>`}<input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(u) => this.readGPX(u)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || i.gpxPrivacy}</p>${this.gpxError ? m`<p class="error" role="alert">${this.gpxError}</p>` : ""}${o ? m`<div class="gpx-preview"><strong>${o.drives.length} ${i.gpxSections}, ${o.points.length} ${i.gpxPoints}</strong>${f ? m`<p class="muted">${i.gpxPeriod}: ${W(f.start, this.hass)} – ${W(f.end, this.hass)}</p>` : ""}${y ? m`<p class="warning" role="alert">${i.gpxPeriodWarning}</p>` : ""}<h3>${i.gpxSummary}</h3><p class="muted">${o.points.length} ${i.gpxPoints}, ${this.gpxSelected.size} ${i.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${i.gpxDistance}, ${c?.title || i.gpxNoTrip}</p><div class="gpx-drive-list">${o.drives.map((u) => m`<label><input type="checkbox" .checked=${this.gpxSelected.has(u.key)} @change=${(v) => {
      v.currentTarget.checked ? this.gpxSelected.add(u.key) : this.gpxSelected.delete(u.key), this.requestUpdate();
    }}> ${W(u.started_at, this.hass)} – ${W(u.ended_at, this.hass)} · ${(u.distance_m / 1e3).toFixed(1)} km · ${It(u.duration_seconds, this.hass)}</label>`)}</div>${o.warnings.length ? m`<p class="muted">${i.gpxWarnings}: ${o.warnings.map((u) => u === "gpx_gap_possible_drive_boundary" ? i.gpxGapBoundary : u).join(", ")}</p>` : ""}${o.conflicts.duplicate_file ? m`<p class="error" role="alert">${i.gpxDuplicate}</p>` : m`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? i.saving : i.gpxConfirm}</button>`}</div>` : ""}</section>`;
  }
  renderPdfExport(i, r) {
    if (!r.length) return "";
    const o = r.some((c) => c.id === this.activeTripId) ? this.activeTripId : r[0].id, l = r.find((c) => c.id === o) ?? r[0];
    return m`<section class="pdf-export"><h3>${i.pdfExportTitle}</h3><p class="muted">${l.title} · ${Lt(l, this.hass)}</p><div class="pdf-export-row"><button type="button" @click=${() => {
      this.downloadPdf(l);
    }} ?disabled=${!!this.pdfBusyTripId}>${this.pdfBusyTripId ? i.pdfExporting : i.pdfExport}</button></div></section>`;
  }
  renderSuggestions(i, r) {
    const o = this.snapshot?.stop_suggestions ?? [], l = this.actionError || this.loadError, c = (f) => f.departed_at ? `${W(f.arrived_at, this.hass)} – ${W(f.departed_at, this.hass)}` : `${i.staySince ?? "Seit"} ${hi(f.arrived_at, this.hass)} · ${i.stayOngoing ?? "Aufenthalt läuft"}`;
    return m`<section class="place-section"><h3>${i.gpsSuggestions ?? "GPS-Stoppvorschläge"}</h3><button type="button" ?disabled=${this.suggestionsBusy} aria-busy=${this.suggestionsBusy ? "true" : "false"} @click=${() => {
      this.refreshSuggestions(r);
    }}>${this.suggestionsBusy ? "Vorschläge werden aktualisiert …" : i.generateSuggestions ?? "Vorschläge aktualisieren"}</button>${this.suggestionStatus ? m`<p class="muted" role="status">${this.suggestionStatus}</p>` : ""}${l ? m`<p class="error" role="alert">${l}</p>` : ""}${o.length ? m`<ul>${o.map((f) => m`<li>${c(f)}${this.suggestionEditingId === f.id ? m`<div class="form-grid"><input aria-label=${i.placeName ?? "Name"} .value=${this.suggestionName} @input=${(y) => this.suggestionName = y.currentTarget.value}><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.suggestionType} @change=${(y) => this.suggestionType = y.currentTarget.value}><option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option></select></div>` : ""} <button type="button" @click=${() => {
      this.acceptSuggestion(f, r);
    }}>${this.suggestionEditingId === f.id ? i.save ?? "Speichern" : i.accept ?? "Übernehmen"}</button><button type="button" class="secondary" @click=${() => {
      this.dismissSuggestion(f, r);
    }}>${i.dismiss ?? "Verwerfen"}</button></li>`)}</ul>` : m`<p class="muted">${i.noSuggestions ?? "Keine offenen Vorschläge."}</p>`}</section>`;
  }
  starPicker(i, r, o) {
    return m`<fieldset class="star-picker"><legend>${i}</legend><div role="radiogroup" aria-label=${i}>${[1, 2, 3, 4, 5].map((l) => m`<button type="button" class="star-button" role="radio" aria-label=${`${l}/5`} aria-checked=${r === String(l)} ?data-selected=${r === String(l)} @click=${() => {
      o(String(l)), this.requestUpdate();
    }} @keydown=${(c) => {
      (c.key === "ArrowRight" || c.key === "ArrowUp") && (c.preventDefault(), o(String(Math.min(5, l + 1))), this.requestUpdate()), (c.key === "ArrowLeft" || c.key === "ArrowDown") && (c.preventDefault(), o(String(Math.max(1, l - 1))), this.requestUpdate());
    }}>${r && Number(r) >= l ? "★" : "☆"}</button>`)}</div></fieldset>`;
  }
  renderPlacesLegacy(i, r) {
    const o = this.snapshot?.stops ?? [], l = m`<option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option>`;
    return m`<section class="place-section"><details open><summary><strong>${i.places ?? "Orte und Zwischenstopps"}</strong><span>${o.length}</span></summary><form class="form-grid" @submit=${(c) => {
      c.preventDefault(), this.savePlace(r);
    }}><input aria-label=${i.placeName ?? "Name"} placeholder=${i.placeName ?? "Name"} .value=${this.placeName} @input=${(c) => this.placeName = c.currentTarget.value} required><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.placeType} @change=${(c) => this.placeType = c.currentTarget.value}>${l}</select><label>${i.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.placeArrived} @input=${(c) => this.placeArrived = c.currentTarget.value} required></label><label>${i.placeDeparted ?? "Abfahrt"}<input type="datetime-local" .value=${this.placeDeparted} @input=${(c) => this.placeDeparted = c.currentTarget.value}></label><input aria-label=${i.placeAddress ?? "Adresse"} placeholder=${i.placeAddress ?? "Adresse"} .value=${this.placeAddress} @input=${(c) => this.placeAddress = c.currentTarget.value}><input aria-label=${i.placeWebsite ?? "Webseite"} type="url" placeholder=${i.placeWebsite ?? "Webseite (optional)"} .value=${this.placeWebsite} @input=${(c) => this.placeWebsite = c.currentTarget.value}><input aria-label="Latitude" inputmode="decimal" placeholder="Latitude" .value=${this.placeLatitude} @input=${(c) => this.placeLatitude = c.currentTarget.value}><input aria-label="Longitude" inputmode="decimal" placeholder="Longitude" .value=${this.placeLongitude} @input=${(c) => this.placeLongitude = c.currentTarget.value}><textarea aria-label=${i.placeDescription ?? "Notizen"} placeholder=${i.placeDescription ?? "Beschreibung und Notizen"} .value=${this.placeDescription} @input=${(c) => this.placeDescription = c.currentTarget.value}></textarea><div class="actions"><button type="submit" ?disabled=${this.placeSaving}>${this.placeSaving ? i.saving : this.editingPlaceId ? i.save : i.create ?? "Anlegen"}</button>${this.editingPlaceId ? m`<button type="button" class="secondary" @click=${() => this.resetPlaceForm()}>${i.cancel}</button>` : ""}</div></form>${o.length ? m`<div class="place-list">${o.map((c) => m`<article class="place-row"><div><strong>${c.name}</strong><span class="muted">${c.place_type || c.stop_type} · ${W(c.arrived_at || c.occurred_at, this.hass)}${c.duration_seconds ? ` · ${It(c.duration_seconds, this.hass)}` : ""}${c.rating_overall ? ` · ${c.rating_overall}/5` : ""}</span><span>${c.description || ""}</span>${c.website_url ? m`<a href=${c.website_url} target="_blank" rel="noopener noreferrer">${i.placeWebsiteOpen ?? "Webseite öffnen"}</a>` : ""}</div><div class="actions"><button type="button" class="link" @click=${() => this.editPlace(c)}>${i.edit}</button><button type="button" class="link" @click=${() => {
      this.removePlace(c, r);
    }}>${this.confirmingPlaceId === c.id ? i.confirmDelete : i.remove}</button><button type="button" class="link" @click=${() => this.startRating(c)}>${c.rating_overall ? i.ratingEdit ?? "Bewertung" : i.ratingAdd ?? "Bewerten"}</button></div>${this.ratingPlaceId === c.id ? m`<div class="rating-form form-grid">${this.starPicker(i.ratingOverall ?? "Gesamt", this.ratingOverall, (f) => this.ratingOverall = f)}${this.starPicker(i.ratingAccess ?? "Anfahrt", this.ratingAccess, (f) => this.ratingAccess = f)}${this.starPicker(i.ratingSpace ?? "Platzgröße", this.ratingSpace, (f) => this.ratingSpace = f)}${this.starPicker(i.ratingFacilities ?? "Ausstattung", this.ratingFacilities, (f) => this.ratingFacilities = f)}${this.starPicker(i.ratingSurroundings ?? "Umgebung", this.ratingSurroundings, (f) => this.ratingSurroundings = f)}<textarea aria-label=${i.ratingComment ?? "Kommentar"} .value=${this.ratingText} @input=${(f) => this.ratingText = f.currentTarget.value}></textarea><button type="button" @click=${() => {
      this.saveRating(c.id, r);
    }}>${i.save}</button></div>` : ""}</article>`)}</div>` : m`<p class="muted">${i.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details></section>`;
  }
  renderPlaces(i, r) {
    const o = this.snapshot?.stops ?? [], l = /* @__PURE__ */ new Set(["campsite", "rv_site", "wild_camp", "overnight"]), c = o.filter((v) => l.has(v.place_kind || v.place_type || v.stop_type)), f = o.filter((v) => !l.has(v.place_kind || v.place_type || v.stop_type)), y = (v) => {
      const T = v.departed_at == null ? `${i.staySince ?? "Seit"} ${hi(v.arrived_at || v.occurred_at, this.hass)} · ${i.stayOngoing ?? "Aufenthalt läuft"}` : `${W(v.arrived_at || v.occurred_at, this.hass)}${v.duration_seconds ? ` · ${It(v.duration_seconds, this.hass)}` : ""}`;
      return m`<article class="place-row"><div><strong>${v.name}</strong><span class="muted">${yo(v.place_kind || v.place_type || v.stop_type, this.hass)} · ${T}${v.rating_overall ? ` · ${v.rating_overall}/5` : ""}</span>${v.address ? m`<span class="muted">${v.address}</span>` : ""}${v.description ? m`<span>${v.description}</span>` : ""}${v.website_url ? m`<a href=${v.website_url} target="_blank" rel="noopener noreferrer">${i.placeWebsiteOpen ?? "Webseite öffnen"}</a>` : ""}</div><div class="actions compact-actions"><button type="button" class="link" @click=${() => this.editPlace(v)}>${i.edit}</button><button type="button" class="link" @click=${() => {
        this.removePlace(v, r);
      }}>${this.confirmingPlaceId === v.id ? i.confirmDelete : i.remove}</button><button type="button" class="link" @click=${() => this.startRating(v)}>${v.rating_overall ? i.ratingEdit ?? "Bewertung" : i.ratingAdd ?? "Bewerten"}</button></div></article>`;
    }, u = (v, T) => m`<details class="stay-group" open><summary><strong>${v}</strong><span>${T.length}</span></summary>${T.length ? m`<div class="place-list">${T.map(y)}</div>` : m`<p class="muted">${i.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details>`;
    return m`<section class="place-section stay-management"><div class="actions compact-actions"><button type="button" @click=${() => {
      this.resetPlaceForm(), this.placeArrived = this.nowLocalDateTime(), this.openEditor("place-create", r);
    }}>${i.create ?? "Hinzufügen"}</button></div>${u(i.overnightPlaces ?? "Übernachtungsplätze", c)}${u(i.places ?? "Zwischenstopps", f)}${this.renderInterruptions(i, r)}${this.renderSuggestions(i, r)}</section>`;
  }
  renderRatingActions(i, r) {
    const o = (this.snapshot?.stops ?? []).filter((l) => l.rating_overall);
    return o.length ? m`<section class="place-section"><details><summary><strong>${i.ratingEdit ?? "Bewertungen"}</strong><span>${o.length}</span></summary>${o.map((l) => m`<div class="row"><span>${l.name} · ${l.rating_overall}/5</span><button type="button" class="link" @click=${() => {
      this.removeRating(l.id, r);
    }}>${i.ratingRemove ?? "Bewertung löschen"}</button></div>`)}</details></section>` : "";
  }
  renderEditorDialog(i, r) {
    if (!this.editorKind) return "";
    const o = this.editorKind === "trip-edit", l = this.editorKind === "drive-edit", c = this.editorKind === "place-edit", f = this.editorKind === "expense-edit", y = this.editorKind === "rating-edit", u = o ? i.edit : this.editorKind === "trip-create" ? i.newTrip : l ? i.edit : this.editorKind === "drive-create" ? i.manualDrive : c ? i.edit : this.editorKind === "place-create" ? i.places ?? "Ort hinzufügen" : f ? i.edit : this.editorKind === "expense-create" ? i.expenses : i.ratingEdit ?? "Bewertung", v = this.actionError || this.loadError, T = () => this.closeEditor();
    return m`<dialog class="editor-dialog" aria-labelledby="editor-dialog-title" @cancel=${(b) => {
      b.preventDefault(), T();
    }}>
      <form @submit=${(b) => {
      if (b.preventDefault(), this.editorKind === "trip-create") this.addTrip();
      else if (o) {
        const D = this.snapshot?.trips.find(($) => $.id === this.editingTripId);
        D && this.saveTrip(D);
      } else if (this.editorKind === "drive-create") this.addManualDrive(r);
      else if (l) {
        const D = [...this.snapshot?.drives ?? [], ...this.snapshot?.available_drives ?? []].find(($) => $.id === this.editingDriveId);
        D && this.saveManualDrive(D, r);
      } else if (this.editorKind === "place-create" || c) this.savePlace(r);
      else if (this.editorKind === "expense-create") this.addExpense(r);
      else if (f) {
        const D = (this.snapshot?.expenses ?? []).find(($) => $.id === this.editingExpenseId);
        D && this.saveExpense(D);
      } else y && this.ratingPlaceId && this.saveRating(this.ratingPlaceId, r);
    }}>
        <h3 id="editor-dialog-title">${u}</h3>
        ${this.discardPrompt ? m`<div class="warning" role="alert"><strong>${i.unsavedTripChange ?? "Ungespeicherte Änderungen verwerfen?"}</strong><div class="actions"><button type="button" @click=${() => {
      this.discardPrompt = !1, this.requestUpdate();
    }}>${i.cancel}</button><button type="button" class="secondary" @click=${() => {
      this.editingTripId = "", this.editingDriveId = "", this.editingExpenseId = "", this.resetPlaceForm(), this.ratingPlaceId = "", this.closeEditor(!0);
    }}>${i.confirmDelete ?? "Verwerfen"}</button></div></div>` : m`
          ${v ? m`<p class="error" role="alert">${v}</p>` : ""}
          ${this.editorKind === "trip-create" ? m`<label>${i.tripName}<input required .value=${this.tripTitle} @input=${(b) => {
      this.tripTitle = b.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.destination}<input .value=${this.destination} @input=${(b) => {
      this.destination = b.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.startDate}<input type="date" .value=${this.tripStartDate} @input=${(b) => {
      this.tripStartDate = b.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.endDate}<input type="date" .value=${this.tripEndDate} @input=${(b) => {
      this.tripEndDate = b.currentTarget.value, this.markEditorDirty();
    }}></label>` : ""}
          ${o ? m`<label>${i.tripName}<input required .value=${this.editingTripTitle} @input=${(b) => {
      this.editingTripTitle = b.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.destination}<input .value=${this.editingDestination} @input=${(b) => {
      this.editingDestination = b.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.startDate}<input type="date" .value=${this.editingStartDate} @input=${(b) => {
      this.editingStartDate = b.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.endDate}<input type="date" .value=${this.editingEndDate} @input=${(b) => {
      this.editingEndDate = b.currentTarget.value, this.markEditorDirty();
    }}></label>` : ""}
          ${this.editorKind === "drive-create" ? this.renderDriveEditorFields(i, !1) : l ? this.renderDriveEditorFields(i, !0) : ""}
          ${this.editorKind === "place-create" || c ? this.renderPlaceEditorFields(i) : ""}
          ${this.editorKind === "expense-create" ? this.renderExpenseEditorFields(i, !1) : f ? this.renderExpenseEditorFields(i, !0) : ""}
          ${y ? m`${this.starPicker(i.ratingOverall ?? "Gesamt", this.ratingOverall, (b) => {
      this.ratingOverall = b, this.markEditorDirty();
    })}${this.starPicker(i.ratingAccess ?? "Anfahrt", this.ratingAccess, (b) => {
      this.ratingAccess = b, this.markEditorDirty();
    })}${this.starPicker(i.ratingSpace ?? "Platzgröße", this.ratingSpace, (b) => {
      this.ratingSpace = b, this.markEditorDirty();
    })}${this.starPicker(i.ratingFacilities ?? "Ausstattung", this.ratingFacilities, (b) => {
      this.ratingFacilities = b, this.markEditorDirty();
    })}${this.starPicker(i.ratingSurroundings ?? "Umgebung", this.ratingSurroundings, (b) => {
      this.ratingSurroundings = b, this.markEditorDirty();
    })}<label>${i.ratingComment ?? "Kommentar"}<textarea .value=${this.ratingText} @input=${(b) => {
      this.ratingText = b.currentTarget.value, this.markEditorDirty();
    }}></textarea></label>` : ""}
          <div class="dialog-actions"><button type="button" class="secondary" @click=${T}>${i.cancel}</button><button type="submit" ?disabled=${this.placeSaving || this.manualSaving || this.tripSaving || !!this.driveSavingId || !!this.expenseSavingId}>${this.tripSaving ? i.saving : i.save}</button></div>
        `}
      </form>
    </dialog>`;
  }
  renderDriveEditorFields(i, r) {
    const o = r ? this.editingDriveOccurredAt : this.manualOccurredAt;
    return m`<label>${i.driveStart}<input type="datetime-local" required .value=${o} @input=${(l) => {
      r ? this.editingDriveOccurredAt = l.currentTarget.value : this.manualOccurredAt = l.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.startLocation}<input required .value=${r ? this.editingDriveStartLocation : this.manualStartLocation} @input=${(l) => {
      r ? this.editingDriveStartLocation = l.currentTarget.value : this.manualStartLocation = l.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.endLocation}<input required .value=${r ? this.editingDriveEndLocation : this.manualEndLocation} @input=${(l) => {
      r ? this.editingDriveEndLocation = l.currentTarget.value : this.manualEndLocation = l.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.distanceKm}<input required type="number" min="0" step="0.1" inputmode="decimal" .value=${r ? this.editingDriveDistanceKm : this.manualDistanceKm} @input=${(l) => {
      r ? this.editingDriveDistanceKm = l.currentTarget.value : this.manualDistanceKm = l.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.durationMinutes}<input type="number" min="0" step="1" .value=${r ? this.editingDriveDurationMinutes : this.manualDurationMinutes} @input=${(l) => {
      r ? this.editingDriveDurationMinutes = l.currentTarget.value : this.manualDurationMinutes = l.currentTarget.value, this.markEditorDirty();
    }}></label>`;
  }
  renderPlaceEditorFields(i) {
    const r = m`<option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option>`;
    return m`<label>${i.placeName ?? "Name"}<input required .value=${this.placeName} @input=${(o) => {
      this.placeName = o.currentTarget.value, this.markEditorDirty();
    }}></label><label>${i.placeCategory ?? "Kategorie"}<select .value=${this.placeType} @change=${(o) => {
      this.placeType = o.currentTarget.value, this.markEditorDirty();
    }}>${r}</select></label><label>${i.placeArrived ?? "Ankunft"}<input required type="datetime-local" .value=${this.placeArrived} @input=${(o) => {
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
  renderExpenseEditorFields(i, r) {
    const o = r ? this.editingExpenseDate : this.expenseDate, l = r ? this.editingExpenseTime : this.expenseTime, c = r ? this.editingExpenseTimeEnabled : this.expenseTimeEnabled, f = r ? this.editingCategory : this.category, y = r ? this.editingFuel : this.fuel, u = f === "fuel", v = r ? this.editingExpenseServices : this.expenseServices, T = f === "water_waste", b = r ? this.editingExpenseNote : this.expenseNote, D = ($, A) => {
      const R = A ? [.../* @__PURE__ */ new Set([...v, $])] : v.filter((E) => E !== $);
      r ? this.editingExpenseServices = R : this.expenseServices = R, this.markEditorDirty(), this.requestUpdate();
    };
    return m`<label>${i.amount}<input ${u ? "" : "required"} type="number" min="0" step="0.01" inputmode="decimal" .value=${y.amount} @input=${($) => {
      u ? this.setFuel("amount", $.currentTarget.value, r) : r ? (this.editingAmount = $.currentTarget.value, this.markEditorDirty()) : this.setExpenseAmount($.currentTarget.value);
    }}></label>${u ? m`<label>${i.fuelLiters ?? "Getankte Liter (l)"}<input type="text" inputmode="decimal" .value=${y.liters} @input=${($) => this.setFuel("liters", $.currentTarget.value, r)}></label><label>${i.fuelPrice ?? "Literpreis (€/l)"}<input type="text" inputmode="decimal" .value=${y.price} @input=${($) => this.setFuel("price", $.currentTarget.value, r)}></label>` : ""}<label>${i.category}<select .value=${f} @change=${($) => {
      const A = $.currentTarget.value;
      r ? this.setEditingExpenseCategory(A) : this.setExpenseCategory(A), this.markEditorDirty();
    }}>${this.categoryOptions(f).map(($) => m`<option value=${$} ?selected=${$ === f}>${tn($, this.hass)}</option>`)}</select></label>${T ? m`<fieldset class="expense-services"><legend>${i.services ?? "Leistungen (optional)"}</legend>${co.map(($) => m`<label class="inline-check"><input type="checkbox" .checked=${v.includes($)} @change=${(A) => D($, A.currentTarget.checked)}> ${jr($, this.hass)}</label>`)}</fieldset>` : ""}<label>${i.expenseNote ?? "Bemerkung (optional)"}<textarea rows="4" maxlength="2000" aria-describedby="expense-note-hint" .value=${b} @input=${($) => {
      r ? this.editingExpenseNote = $.currentTarget.value : this.expenseNote = $.currentTarget.value, this.markEditorDirty();
    }}></textarea><small id="expense-note-hint" class="muted">${i.expenseNoteHint ?? "Bis zu 2.000 Zeichen, Zeilenumbrüche sind möglich."}</small></label><label>${i.expenseDate ?? "Tatsächliches Ausgabendatum"}<input type="date" ?required=${!r || !!o} .value=${o} @input=${($) => {
      r ? this.editingExpenseDate = $.currentTarget.value : this.expenseDate = $.currentTarget.value, this.markEditorDirty();
    }}></label><label class="inline-check"><input type="checkbox" .checked=${c} @change=${($) => {
      const A = $.currentTarget.checked;
      r ? this.editingExpenseTimeEnabled = A : this.expenseTimeEnabled = A, this.markEditorDirty();
    }}> ${i.expenseTime ?? "Uhrzeit erfassen"}</label>${c ? m`<label>${i.time ?? "Uhrzeit"}<input type="time" .value=${l} @input=${($) => {
      r ? this.editingExpenseTime = $.currentTarget.value : this.expenseTime = $.currentTarget.value, this.markEditorDirty();
    }}></label>` : ""}`;
  }
  render() {
    const i = w(this.hass), r = this.snapshot?.trips ?? [];
    if (this.embeddedSection() === "trip-create") return m`${this.renderEditorDialog(i, "")}`;
    if (!this.embeddedTripId()) return m`${this.renderGpx(i, r, this.gpxPreview)}${this.renderPdfExport(i, r)}${this.activeTripId ? this.renderPlaces(i, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(i, this.activeTripId) : ""}${this.renderLegacy()}${this.renderEditorDialog(i, this.activeTripId)}${this.renderTripDeleteDialog(i)}`;
    const o = this.embeddedSection(), l = r.find((c) => c.id === this.embeddedTripId());
    return m`${o === "trip-actions" && l ? this.renderTripActions(i, l) : ""}${o === "gpx" ? this.renderGpx(i, r, this.gpxPreview) : ""}${o === "pdf" ? this.renderPdfExport(i, r) : ""}${o === "places" ? m`${this.activeTripId ? this.renderPlaces(i, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(i, this.activeTripId) : ""}` : ""}${o === "expenses" ? this.renderEmbeddedExpenses(i) : ""}${this.renderEditorDialog(i, this.embeddedTripId())}`;
  }
  renderEmbeddedExpenses(i) {
    const r = this.snapshot?.expenses ?? [], o = this.snapshot?.expense_summary?.total_minor !== void 0 && this.snapshot.expense_summary.currency ? gt(this.snapshot.expense_summary.total_minor, this.snapshot.expense_summary.currency, this.hass) : gt(0, "EUR", this.hass);
    return m`<div class="embedded-expenses"><div class="actions compact-actions"><button type="button" @click=${() => this.startExpenseCreate(this.embeddedTripId())}>${i.create ?? "Hinzufügen"}</button></div>${r.map((l) => this.renderExpense(l, i))}<p class="total"><strong>${i.total}: ${o}</strong></p></div>`;
  }
  renderLegacySource() {
    const i = w(this.hass), r = this.snapshot?.trips ?? [], o = this.snapshot?.expenses ?? [], l = this.snapshot?.expense_summary, c = l?.mixed_currency ? i.mixedCurrency : l?.total_minor !== void 0 && l.currency ? gt(l.total_minor, l.currency, this.hass) : gt(0, "EUR", this.hass), f = this.actionError || this.loadError, y = this.gpxPreview;
    return m`<ha-card><h2>${i.manager}</h2>${f ? m`<p class="error" role="alert">${f}</p>` : ""}<section class="gpx-import"><h3>${i.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(u) => this.readGPX(u)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || i.gpxPrivacy}</p>${this.gpxError ? m`<p class="error" role="alert">${this.gpxError}</p>` : ""}${y ? m`<div class="gpx-preview"><strong>${y.drives.length} ${i.gpxSections}, ${y.points.length} ${i.gpxPoints}</strong><ul>${y.drives.map((u) => m`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(u.key)} @change=${(v) => {
      v.currentTarget.checked ? this.gpxSelected.add(u.key) : this.gpxSelected.delete(u.key), this.requestUpdate();
    }}> ${W(u.started_at, this.hass)} – ${W(u.ended_at, this.hass)} · ${(u.distance_m / 1e3).toFixed(1)} km · ${It(u.duration_seconds, this.hass)}</label></li>`)}</ul>${y.warnings.length ? m`<p class="muted">${i.gpxWarnings}: ${y.warnings.join(", ")}</p>` : ""}${y.conflicts.duplicate_file ? m`<p class="error" role="alert">${i.gpxDuplicate}</p>` : m`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? i.saving : i.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${i.newTrip}</h3><div class="form-grid"><input aria-label=${i.tripName} placeholder=${i.tripName} .value=${this.tripTitle} @input=${(u) => this.tripTitle = u.target.value}><input aria-label=${i.destination} placeholder=${i.destination} .value=${this.destination} @input=${(u) => this.destination = u.target.value}><label>${i.startDate}<input type="date" .value=${this.tripStartDate} @input=${(u) => this.tripStartDate = u.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.tripEndDate} @input=${(u) => this.tripEndDate = u.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${i.create}</button></div></section><section><h3>${i.trips}</h3>${r.length ? r.map((u) => m`<article class="trip"><div class="row"><strong>${u.title}</strong><span class="muted">${u.destination || ""} · ${Kt(u.status, this.hass)} · ${Lt(u, this.hass) || i.period}</span></div>${this.editingTripId === u.id ? m`<form class="form-grid" @submit=${(v) => {
      v.preventDefault(), this.saveTrip(u);
    }}><input aria-label=${i.tripName} .value=${this.editingTripTitle} @input=${(v) => this.editingTripTitle = v.currentTarget.value}><input aria-label=${i.destination} .value=${this.editingDestination} @input=${(v) => this.editingDestination = v.currentTarget.value}><label>${i.startDate}<input type="date" .value=${this.editingStartDate} @input=${(v) => this.editingStartDate = v.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.editingEndDate} @input=${(v) => this.editingEndDate = v.currentTarget.value}></label><button type="submit">${i.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${i.cancel}</button></form>` : m`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(u)}>${i.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(u.id)}>${this.confirmingTripId === u.id ? i.confirmDelete : i.remove}</button>${u.status === "planned" || u.status === "paused" ? m`<button type="button" @click=${() => this.changeStatus(u.id, "active")}>${i.resume}</button>` : ""}${u.status === "active" ? m`<button type="button" class="secondary" @click=${() => this.changeStatus(u.id, "paused")}>${i.pause}</button><button type="button" @click=${() => this.changeStatus(u.id, "completed")}>${i.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(u.id)}>${this.selected === u.id ? i.close : i.details}</button></div>`}${this.selected === u.id ? m`<div class="details"><h4>${i.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((v) => this.renderDrive(v, u.id, i)) : m`<p class="muted">${i.noDrives}</p>`}<h4>${i.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((v) => this.renderDrive(v, u.id, i)) : m`<p class="muted">${i.noDrives}</p>`}<h4>${i.manualDrive}</h4><div class="form-grid"><label>${i.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(v) => this.manualOccurredAt = v.currentTarget.value}></label><input aria-label=${i.startLocation} placeholder=${i.startLocation} .value=${this.manualStartLocation} @input=${(v) => this.manualStartLocation = v.currentTarget.value}><input aria-label=${i.endLocation} placeholder=${i.endLocation} .value=${this.manualEndLocation} @input=${(v) => this.manualEndLocation = v.currentTarget.value}><input aria-label=${i.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${i.distanceKm} .value=${this.manualDistanceKm} @input=${(v) => this.manualDistanceKm = v.currentTarget.value}><input aria-label=${i.durationMinutes} type="number" min="0" step="1" placeholder=${i.durationMinutes} .value=${this.manualDurationMinutes} @input=${(v) => this.manualDurationMinutes = v.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(u.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? i.saving : i.createDrive}</button></div><h4>${i.expenses}</h4><div class="expense-form create-form"><input aria-label=${i.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(v) => this.setExpenseAmount(v.currentTarget.value)}><select aria-label=${i.category} .value=${this.category} @change=${(v) => this.setExpenseCategory(v.currentTarget.value)}>${ei.map((v) => m`<option value=${v}>${tn(v, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(u.id)}>${i.save}</button></div>${o.map((v) => this.renderExpense(v, i))}<p class="total"><strong>${i.total}: ${c}</strong></p></div>` : ""}</article>`) : m`<p class="muted">${i.noTrip}</p>`}</section></ha-card>`;
  }
  renderLegacyOld() {
    const i = w(this.hass), r = this.snapshot?.trips ?? [];
    return m`<ha-card><h2>${i.manager}</h2>${this.actionError || this.loadError ? m`<p class="error" role="alert">${this.actionError || this.loadError}</p>` : ""}<section><h3>${i.trips}</h3>${r.length ? r.map((o) => m`<article class="trip"><div class="row"><strong>${o.title}</strong><span class="muted">${o.destination || ""} · ${Kt(o.status, this.hass)} · ${Lt(o, this.hass) || i.period}</span></div><div class="actions compact-actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(o)}>${i.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(o.id)}>${this.confirmingTripId === o.id ? i.confirmDelete : i.remove}</button><button type="button" class="secondary" @click=${() => this.toggleTripDetails(o.id)}>${this.selected === o.id ? i.close : i.details}</button></div>${this.selected === o.id ? m`<div class="details"><h4>${i.assignedDrives}</h4>${(this.snapshot?.drives ?? []).map((l) => this.renderDrive(l, o.id, i))}<h4>${i.expenses}</h4>${(this.snapshot?.expenses ?? []).map((l) => this.renderExpense(l, i))}<p class="total"><strong>${i.total}: ${gt(this.snapshot?.expense_summary?.total_minor ?? 0, this.snapshot?.expense_summary?.currency ?? "EUR", this.hass)}</strong></p></div>` : ""}</article>`) : m`<p class="muted">${i.noTrip}</p>`}</section></ha-card>`;
  }
  renderLegacy() {
    const i = w(this.hass);
    return m`<div class="manager-shell"><div class="editor-toolbar"><button type="button" @click=${() => this.startTripCreate()}>${i.newTrip ?? "Reise hinzufügen"}</button>${this.activeTripId ? m`<button type="button" class="secondary" @click=${() => this.startManualDriveCreate(this.activeTripId)}>${i.createDrive ?? "Fahrt hinzufügen"}</button><button type="button" class="secondary" @click=${() => this.startExpenseCreate(this.activeTripId)}>${i.expenses ?? "Kosten hinzufügen"}</button>` : ""}</div>${this.renderLegacyOld()}${this.renderDriveDeleteDialog(i)}</div>`;
  }
}
$t.styles = [Bt.styles, vt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.expense-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid var(--divider-color);min-width:0}.expense-info{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:8px;align-items:baseline;min-width:0;overflow-wrap:anywhere}.expense-date{color:var(--secondary-text-color);font-size:.88em}.expense-amount{white-space:nowrap}.expense-actions{margin-top:0;justify-content:flex-end}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.inline-check{display:flex!important;align-items:center;gap:6px;min-height:40px}.inline-check input{width:1.1rem!important;min-height:1.1rem!important;flex:0 0 auto}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}.editor-toolbar,.compact-actions{display:flex;flex-wrap:wrap;gap:8px}.editor-dialog{width:min(36rem,calc(100vw - 2rem));max-height:calc(100dvh - 2rem);overflow:hidden;padding:0;border:0;border-radius:12px;color:var(--primary-text-color);background:var(--card-background-color)}.editor-dialog::backdrop{background:rgb(0 0 0 / .5)}.editor-dialog form{display:grid;gap:12px;padding:18px;max-height:calc(100dvh - 2rem);overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}.editor-dialog label{display:grid;gap:5px}.editor-dialog input,.editor-dialog select,.editor-dialog textarea{box-sizing:border-box;width:100%;min-height:40px;padding:8px;color:var(--primary-text-color);background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:7px;font:inherit}.editor-dialog textarea{min-height:5rem}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap}.editor-dialog button:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px}@media(max-width:650px){.editor-toolbar button,.dialog-actions button{flex:1 1 100%}.editor-dialog{width:calc(100vw - 1rem);max-height:calc(100dvh - 1rem)}.editor-dialog form{padding:14px;max-height:calc(100dvh - 1rem)}.expense-row{grid-template-columns:1fr;gap:6px}.expense-info{grid-template-columns:minmax(0,1fr) auto}.expense-date{grid-column:1 / -1}.expense-actions{justify-content:flex-start}.total{text-align:left}}`];
$t.styles = [...$t.styles, vt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.interruption-row{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--divider-color)}.interruption-row>div{display:grid;gap:4px;min-width:0}.interruption-copy{overflow-wrap:anywhere}.interruption-row>.actions{margin-top:0;justify-content:flex-end}.candidate-label{font-size:.9em}.stay-management{display:grid;gap:10px}.stay-group{border:1px solid var(--divider-color);border-radius:8px;padding:8px}.stay-group>summary,.place-section details>summary{cursor:pointer;display:flex;justify-content:space-between;gap:10px;align-items:baseline}.place-list{display:grid;gap:8px}.place-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:start;padding:10px 0;border-bottom:1px solid var(--divider-color);min-width:0}.place-row>div:first-child{display:grid;gap:4px;min-width:0;overflow-wrap:anywhere}.place-row strong,.place-row span,.place-row a{overflow-wrap:anywhere}.place-row .actions{margin-top:0;align-items:start;justify-content:flex-end}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}.star-picker{border:0;padding:0;margin:0;min-width:0}.star-picker legend{font-size:.9em;color:var(--secondary-text-color)}.star-picker [role=radiogroup]{display:flex;gap:2px}.star-button{min-height:38px;min-width:38px;padding:2px;background:transparent;color:var(--secondary-text-color);font-size:1.6rem;line-height:1}.star-button[data-selected]{color:var(--primary-color)}.star-button:hover{color:var(--primary-color)}@media(max-width:500px){.form-grid{grid-template-columns:1fr}.form-grid textarea{min-height:5rem}.place-section .form-grid{gap:10px}.place-section .actions{display:grid;grid-template-columns:1fr}.place-section .actions button{width:100%}.stay-management>.compact-actions,.stay-management .place-row .compact-actions{display:flex;grid-template-columns:none}.stay-management>.compact-actions button,.stay-management .place-row .compact-actions button{width:auto;min-height:38px}.place-row{grid-template-columns:1fr;gap:8px}.place-row .actions{justify-content:flex-start;flex-wrap:wrap}.interruption-row{align-items:stretch;flex-direction:column}.interruption-row>.actions{justify-content:flex-start}.interruption-row button{width:auto;min-height:38px}.pdf-export-row button{width:100%}}`];
$t.styles = [...$t.styles, vt`.trip-management{margin-top:12px}.trip-actions{margin-top:0}.trip-actions-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:0}.trip-action{box-sizing:border-box;width:100%;min-width:0;min-height:44px;padding:10px 12px;border-radius:8px;font:inherit;font-size:.95rem;line-height:1.2;overflow-wrap:anywhere;white-space:normal}.trip-action-primary{color:var(--text-primary-color,#fff);background:var(--primary-color)}.trip-action-secondary{color:var(--primary-text-color);background:var(--secondary-background-color);border:1px solid var(--divider-color)}.trip-delete-action{margin-top:10px;padding-top:10px;border-top:1px solid var(--divider-color)}.trip-delete-action .trip-action{color:var(--text-primary-color,#fff)!important;background:var(--error-color,#c62828)!important;border-color:transparent}.trip-delete-dialog{width:min(34rem,calc(100vw - 2rem));max-width:calc(100vw - 2rem);padding:0;border:0;border-radius:12px;color:var(--primary-text-color);background:var(--card-background-color)}.trip-delete-dialog::backdrop{background:rgb(0 0 0 / .5)}.trip-delete-dialog form{display:grid;gap:12px;padding:18px}.trip-delete-dialog ul{margin:0;padding-inline-start:1.2rem}.trip-delete-dialog .dialog-actions{margin-top:4px}@media(max-width:420px){.trip-actions-grid{grid-template-columns:1fr}}@media(max-width:650px){.trip-delete-dialog{width:calc(100vw - 1rem);max-width:calc(100vw - 1rem)}}`];
$t.styles = [...$t.styles, vt`.drive-delete-dialog{width:min(34rem,calc(100vw - 2rem));max-width:calc(100vw - 2rem);padding:0;border:0;border-radius:12px;color:var(--primary-text-color);background:var(--card-background-color)}.drive-delete-dialog::backdrop{background:rgb(0 0 0 / .5)}.drive-delete-dialog form{display:grid;gap:12px;padding:18px}.drive-delete-dialog dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;margin:0}.drive-delete-dialog dt{color:var(--secondary-text-color)}.drive-delete-dialog dd{margin:0}.danger-link{color:var(--error-color,#c62828)}.danger{color:var(--text-primary-color,#fff);background:var(--error-color,#c62828)}@media(max-width:650px){.drive-delete-dialog{width:calc(100vw - 1rem);max-width:calc(100vw - 1rem)}}`];
$t.styles = [...$t.styles || [], vt`.expense-note{grid-column:1 / -1;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--primary-text-color);line-height:1.35}`];
pi("camper-travel-journal-manager-card", $t);
const Vo = 1e4;
function rn() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function sn(d) {
  return d.length <= 8 ? "••••" : `${d.slice(0, 4)}…${d.slice(-4)}`;
}
function Jr(d) {
  return d?.connection ? d.connection.connected === !0 ? "available" : d.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function Jo(d) {
  const i = d, r = typeof i?.code == "string" ? i.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", o = typeof i?.message == "string" ? i.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: r, errorMessage: o };
}
function Yo(d, i) {
  return new Promise((r, o) => {
    const l = setTimeout(() => o(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), i);
    d.then((c) => {
      clearTimeout(l), r(c);
    }, (c) => {
      clearTimeout(l), o(c);
    });
  });
}
async function an(d, i, r, o) {
  const l = rn();
  try {
    const c = await Yo(d.connection.sendMessagePromise(i), o);
    return { ...r(c), durationMs: Math.round(rn() - l), value: c };
  } catch (c) {
    return { state: "failed", durationMs: Math.round(rn() - l), ...Jo(c) };
  }
}
function Xo(d) {
  return d && typeof d == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function Qo(d) {
  const i = d?.vehicles;
  return Array.isArray(i) && i.every((r) => r && typeof r == "object" && typeof r.vehicle_id == "string") ? { state: "success", structure: "ok", count: i.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function tl(d) {
  const i = d;
  return Array.isArray(i?.trips) && Array.isArray(i?.drives) && Array.isArray(i?.stops) ? { state: "success", structure: "ok", count: i.trips.length, drivesCount: i.drives.length, stopsCount: i.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function el(d, i, r = Vo) {
  const o = { state: "not_run", durationMs: null };
  if (!d?.connection) return { version: "0.4.1", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: o, vehicles: o, trips: o, vehicleId: sn(i) };
  const l = Jr(d), c = await an(d, { type: "auth/current_user" }, Xo, r), f = await an(d, { type: "camper_travel_journal/list_vehicles" }, Qo, r), y = f.value?.vehicles?.filter((H) => typeof H.vehicle_id == "string") ?? [], u = y.length === 1 ? y[0].vehicle_id : void 0, T = await an(d, { type: "camper_travel_journal/list", vehicle_id: u ?? i }, tl, r), { value: b, ...D } = c, { value: $, ...A } = f, { value: R, ...E } = T;
  return {
    version: "0.4.1",
    connectionBefore: l,
    connectionAfter: Jr(d),
    authentication: D,
    vehicles: A,
    trips: E,
    vehicleId: sn(i),
    ...u ? { resolvedVehicleId: sn(u) } : {}
  };
}
function on(d) {
  return JSON.stringify(d, null, 2);
}
function ln(d) {
  return d.state === "success" ? "erfolgreich" : d.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const Yr = "01M4XW0KD3GQ0KASAYHQ29840P";
class il extends Gt {
  static styles = vt`
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
  config = { vehicle_id: Yr };
  set hass(i) {
    this._hass = i, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(i) {
    this.config = { vehicle_id: i.vehicle_id || Yr };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await el(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const i = on(this.report);
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
    const r = document.createElement("aside");
    r.className = "migration-notice", r.setAttribute("role", "note");
    const o = document.createElement("strong");
    o.textContent = "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const l = document.createElement("p");
    l.textContent = "Use the central Camper Travel Journal card for new dashboards. This legacy card remains supported for compatibility.";
    const c = document.createElement("a");
    c.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration", c.target = "_blank", c.rel = "noreferrer", c.textContent = "Migration guide", r.append(o, l, c), i.prepend(r);
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
        <dt>Authentifizierung</dt><dd>${ln(i.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${ln(i.vehicles)}${i.vehicles.durationMs === null ? "" : ` (${i.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${ln(i.trips)}${i.trips.durationMs === null ? "" : ` (${i.trips.durationMs} ms)`}${i.trips.state === "success" ? ` · ${i.trips.count ?? 0} Reisen / ${i.trips.drivesCount ?? 0} Fahrten / ${i.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${i.vehicles.structure === "ok" && i.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${on(i)}</pre>${this.manualCopy ? m`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${on(i)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${i ? "Diagnose wiederholen" : "Diagnose starten"}</button>${i ? m`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? m`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", il);
var Se = { exports: {} };
var nl = Se.exports, Xr;
function rl() {
  return Xr || (Xr = 1, (function(d, i) {
    (function(r, o) {
      o(i);
    })(nl, (function(r) {
      var o = "1.9.4";
      function l(t) {
        var e, n, s, a;
        for (n = 1, s = arguments.length; n < s; n++) {
          a = arguments[n];
          for (e in a)
            t[e] = a[e];
        }
        return t;
      }
      var c = Object.create || /* @__PURE__ */ (function() {
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
        var s = n.call(arguments, 2);
        return function() {
          return t.apply(e, s.length ? s.concat(n.call(arguments)) : arguments);
        };
      }
      var y = 0;
      function u(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++y), t._leaflet_id;
      }
      function v(t, e, n) {
        var s, a, h, p;
        return p = function() {
          s = !1, a && (h.apply(n, a), a = !1);
        }, h = function() {
          s ? a = arguments : (t.apply(n, arguments), setTimeout(p, e), s = !0);
        }, h;
      }
      function T(t, e, n) {
        var s = e[1], a = e[0], h = s - a;
        return t === s && n ? t : ((t - a) % h + h) % h + a;
      }
      function b() {
        return !1;
      }
      function D(t, e) {
        if (e === !1)
          return t;
        var n = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * n) / n;
      }
      function $(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function A(t) {
        return $(t).split(/\s+/);
      }
      function R(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? c(t.options) : {});
        for (var n in e)
          t.options[n] = e[n];
        return t.options;
      }
      function E(t, e, n) {
        var s = [];
        for (var a in t)
          s.push(encodeURIComponent(n ? a.toUpperCase() : a) + "=" + encodeURIComponent(t[a]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + s.join("&");
      }
      var H = /\{ *([\w_ -]+) *\}/g;
      function ce(t, e) {
        return t.replace(H, function(n, s) {
          var a = e[s];
          if (a === void 0)
            throw new Error("No value provided for variable " + n);
          return typeof a == "function" && (a = a(e)), a;
        });
      }
      var it = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function gi(t, e) {
        for (var n = 0; n < t.length; n++)
          if (t[n] === e)
            return n;
        return -1;
      }
      var ze = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function vi(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var bn = 0;
      function xn(t) {
        var e = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (e - bn));
        return bn = e + n, window.setTimeout(t, n);
      }
      var _i = window.requestAnimationFrame || vi("RequestAnimationFrame") || xn, wn = window.cancelAnimationFrame || vi("CancelAnimationFrame") || vi("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function rt(t, e, n) {
        if (n && _i === xn)
          t.call(e);
        else
          return _i.call(window, f(t, e));
      }
      function ht(t) {
        t && wn.call(window, t);
      }
      var vs = {
        __proto__: null,
        extend: l,
        create: c,
        bind: f,
        get lastId() {
          return y;
        },
        stamp: u,
        throttle: v,
        wrapNum: T,
        falseFn: b,
        formatNum: D,
        trim: $,
        splitWords: A,
        setOptions: R,
        getParamString: E,
        template: ce,
        isArray: it,
        indexOf: gi,
        emptyImageUrl: ze,
        requestFn: _i,
        cancelFn: wn,
        requestAnimFrame: rt,
        cancelAnimFrame: ht
      };
      function kt() {
      }
      kt.extend = function(t) {
        var e = function() {
          R(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, n = e.__super__ = this.prototype, s = c(n);
        s.constructor = e, e.prototype = s;
        for (var a in this)
          Object.prototype.hasOwnProperty.call(this, a) && a !== "prototype" && a !== "__super__" && (e[a] = this[a]);
        return t.statics && l(e, t.statics), t.includes && (_s(t.includes), l.apply(null, [s].concat(t.includes))), l(s, t), delete s.statics, delete s.includes, s.options && (s.options = n.options ? c(n.options) : {}, l(s.options, t.options)), s._initHooks = [], s.callInitHooks = function() {
          if (!this._initHooksCalled) {
            n.callInitHooks && n.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var h = 0, p = s._initHooks.length; h < p; h++)
              s._initHooks[h].call(this);
          }
        }, e;
      }, kt.include = function(t) {
        var e = this.prototype.options;
        return l(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, kt.mergeOptions = function(t) {
        return l(this.prototype.options, t), this;
      }, kt.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), n = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
      };
      function _s(t) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          t = it(t) ? t : [t];
          for (var e = 0; e < t.length; e++)
            t[e] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
        }
      }
      var lt = {
        /* @method on(type: String, fn: Function, context?: Object): this
         * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
         *
         * @alternative
         * @method on(eventMap: Object): this
         * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
         */
        on: function(t, e, n) {
          if (typeof t == "object")
            for (var s in t)
              this._on(s, t[s], e);
          else {
            t = A(t);
            for (var a = 0, h = t.length; a < h; a++)
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
            for (var s in t)
              this._off(s, t[s], e);
          else {
            t = A(t);
            for (var a = arguments.length === 1, h = 0, p = t.length; h < p; h++)
              a ? this._off(t[h]) : this._off(t[h], e, n);
          }
          return this;
        },
        // attach listener (without syntactic sugar now)
        _on: function(t, e, n, s) {
          if (typeof e != "function") {
            console.warn("wrong listener type: " + typeof e);
            return;
          }
          if (this._listens(t, e, n) === !1) {
            n === this && (n = void 0);
            var a = { fn: e, ctx: n };
            s && (a.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(a);
          }
        },
        _off: function(t, e, n) {
          var s, a, h;
          if (this._events && (s = this._events[t], !!s)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (a = 0, h = s.length; a < h; a++)
                  s[a].fn = b;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var p = this._listens(t, e, n);
            if (p !== !1) {
              var g = s[p];
              this._firingCount && (g.fn = b, this._events[t] = s = s.slice()), s.splice(p, 1);
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
          var s = l({}, e, {
            type: t,
            target: this,
            sourceTarget: e && e.sourceTarget || this
          });
          if (this._events) {
            var a = this._events[t];
            if (a) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var h = 0, p = a.length; h < p; h++) {
                var g = a[h], _ = g.fn;
                g.once && this.off(t, _, g.ctx), _.call(g.ctx || this, s);
              }
              this._firingCount--;
            }
          }
          return n && this._propagateEvent(s), this;
        },
        // @method listens(type: String, propagate?: Boolean): Boolean
        // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
        // Returns `true` if a particular event type has any listeners attached to it.
        // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
        listens: function(t, e, n, s) {
          typeof t != "string" && console.warn('"string" type argument expected');
          var a = e;
          typeof e != "function" && (s = !!e, a = void 0, n = void 0);
          var h = this._events && this._events[t];
          if (h && h.length && this._listens(t, a, n) !== !1)
            return !0;
          if (s) {
            for (var p in this._eventParents)
              if (this._eventParents[p].listens(t, e, n, s))
                return !0;
          }
          return !1;
        },
        // returns the index (number) or false
        _listens: function(t, e, n) {
          if (!this._events)
            return !1;
          var s = this._events[t] || [];
          if (!e)
            return !!s.length;
          n === this && (n = void 0);
          for (var a = 0, h = s.length; a < h; a++)
            if (s[a].fn === e && s[a].ctx === n)
              return a;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(t, e, n) {
          if (typeof t == "object")
            for (var s in t)
              this._on(s, t[s], e, !0);
          else {
            t = A(t);
            for (var a = 0, h = t.length; a < h; a++)
              this._on(t[a], e, n, !0);
          }
          return this;
        },
        // @method addEventParent(obj: Evented): this
        // Adds an event parent - an `Evented` that will receive propagated events
        addEventParent: function(t) {
          return this._eventParents = this._eventParents || {}, this._eventParents[u(t)] = t, this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(t) {
          return this._eventParents && delete this._eventParents[u(t)], this;
        },
        _propagateEvent: function(t) {
          for (var e in this._eventParents)
            this._eventParents[e].fire(t.type, l({
              layer: t.target,
              propagatedFrom: t.target
            }, t), !0);
        }
      };
      lt.addEventListener = lt.on, lt.removeEventListener = lt.clearAllEventListeners = lt.off, lt.addOneTimeEventListener = lt.once, lt.fireEvent = lt.fire, lt.hasEventListeners = lt.listens;
      var ue = kt.extend(lt);
      function C(t, e, n) {
        this.x = n ? Math.round(t) : t, this.y = n ? Math.round(e) : e;
      }
      var $n = Math.trunc || function(t) {
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
          return this.clone()._add(I(t));
        },
        _add: function(t) {
          return this.x += t.x, this.y += t.y, this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(t) {
          return this.clone()._subtract(I(t));
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
          return this.x = $n(this.x), this.y = $n(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(t) {
          t = I(t);
          var e = t.x - this.x, n = t.y - this.y;
          return Math.sqrt(e * e + n * n);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(t) {
          return t = I(t), t.x === this.x && t.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(t) {
          return t = I(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + D(this.x) + ", " + D(this.y) + ")";
        }
      };
      function I(t, e, n) {
        return t instanceof C ? t : it(t) ? new C(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new C(t.x, t.y) : new C(t, e, n);
      }
      function j(t, e) {
        if (t)
          for (var n = e ? [t, e] : t, s = 0, a = n.length; s < a; s++)
            this.extend(n[s]);
      }
      j.prototype = {
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
            e = n = I(t);
          else if (t = st(t), e = t.min, n = t.max, !e || !n)
            return this;
          return !this.min && !this.max ? (this.min = e.clone(), this.max = n.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(t) {
          return I(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            t
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return I(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return I(this.max.x, this.min.y);
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
          return typeof t[0] == "number" || t instanceof C ? t = I(t) : t = st(t), t instanceof j ? (e = t.min, n = t.max) : e = n = t, e.x >= this.min.x && n.x <= this.max.x && e.y >= this.min.y && n.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = st(t);
          var e = this.min, n = this.max, s = t.min, a = t.max, h = a.x >= e.x && s.x <= n.x, p = a.y >= e.y && s.y <= n.y;
          return h && p;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = st(t);
          var e = this.min, n = this.max, s = t.min, a = t.max, h = a.x > e.x && s.x < n.x, p = a.y > e.y && s.y < n.y;
          return h && p;
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
          var e = this.min, n = this.max, s = Math.abs(e.x - n.x) * t, a = Math.abs(e.y - n.y) * t;
          return st(
            I(e.x - s, e.y - a),
            I(n.x + s, n.y + a)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(t) {
          return t ? (t = st(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
        }
      };
      function st(t, e) {
        return !t || t instanceof j ? t : new j(t, e);
      }
      function at(t, e) {
        if (t)
          for (var n = e ? [t, e] : t, s = 0, a = n.length; s < a; s++)
            this.extend(n[s]);
      }
      at.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, n = this._northEast, s, a;
          if (t instanceof U)
            s = t, a = t;
          else if (t instanceof at) {
            if (s = t._southWest, a = t._northEast, !s || !a)
              return this;
          } else
            return t ? this.extend(N(t) || V(t)) : this;
          return !e && !n ? (this._southWest = new U(s.lat, s.lng), this._northEast = new U(a.lat, a.lng)) : (e.lat = Math.min(s.lat, e.lat), e.lng = Math.min(s.lng, e.lng), n.lat = Math.max(a.lat, n.lat), n.lng = Math.max(a.lng, n.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, n = this._northEast, s = Math.abs(e.lat - n.lat) * t, a = Math.abs(e.lng - n.lng) * t;
          return new at(
            new U(e.lat - s, e.lng - a),
            new U(n.lat + s, n.lng + a)
          );
        },
        // @method getCenter(): LatLng
        // Returns the center point of the bounds.
        getCenter: function() {
          return new U(
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
          return new U(this.getNorth(), this.getWest());
        },
        // @method getSouthEast(): LatLng
        // Returns the south-east point of the bounds.
        getSouthEast: function() {
          return new U(this.getSouth(), this.getEast());
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
          typeof t[0] == "number" || t instanceof U || "lat" in t ? t = N(t) : t = V(t);
          var e = this._southWest, n = this._northEast, s, a;
          return t instanceof at ? (s = t.getSouthWest(), a = t.getNorthEast()) : s = a = t, s.lat >= e.lat && a.lat <= n.lat && s.lng >= e.lng && a.lng <= n.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = V(t);
          var e = this._southWest, n = this._northEast, s = t.getSouthWest(), a = t.getNorthEast(), h = a.lat >= e.lat && s.lat <= n.lat, p = a.lng >= e.lng && s.lng <= n.lng;
          return h && p;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = V(t);
          var e = this._southWest, n = this._northEast, s = t.getSouthWest(), a = t.getNorthEast(), h = a.lat > e.lat && s.lat < n.lat, p = a.lng > e.lng && s.lng < n.lng;
          return h && p;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          return t ? (t = V(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function V(t, e) {
        return t instanceof at ? t : new at(t, e);
      }
      function U(t, e, n) {
        if (isNaN(t) || isNaN(e))
          throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
        this.lat = +t, this.lng = +e, n !== void 0 && (this.alt = +n);
      }
      U.prototype = {
        // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
        // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          if (!t)
            return !1;
          t = N(t);
          var n = Math.max(
            Math.abs(this.lat - t.lat),
            Math.abs(this.lng - t.lng)
          );
          return n <= (e === void 0 ? 1e-9 : e);
        },
        // @method toString(): String
        // Returns a string representation of the point (for debugging purposes).
        toString: function(t) {
          return "LatLng(" + D(this.lat, t) + ", " + D(this.lng, t) + ")";
        },
        // @method distanceTo(otherLatLng: LatLng): Number
        // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
        distanceTo: function(t) {
          return At.distance(this, N(t));
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
          return V(
            [this.lat - e, this.lng - n],
            [this.lat + e, this.lng + n]
          );
        },
        clone: function() {
          return new U(this.lat, this.lng, this.alt);
        }
      };
      function N(t, e, n) {
        return t instanceof U ? t : it(t) && typeof t[0] != "object" ? t.length === 3 ? new U(t[0], t[1], t[2]) : t.length === 2 ? new U(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new U(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new U(t, e, n);
      }
      var Tt = {
        // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
        // Projects geographical coordinates into pixel coordinates for a given zoom.
        latLngToPoint: function(t, e) {
          var n = this.projection.project(t), s = this.scale(e);
          return this.transformation._transform(n, s);
        },
        // @method pointToLatLng(point: Point, zoom: Number): LatLng
        // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
        // zoom into geographical coordinates.
        pointToLatLng: function(t, e) {
          var n = this.scale(e), s = this.transformation.untransform(t, n);
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
          var e = this.projection.bounds, n = this.scale(t), s = this.transformation.transform(e.min, n), a = this.transformation.transform(e.max, n);
          return new j(s, a);
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
          var e = this.wrapLng ? T(t.lng, this.wrapLng, !0) : t.lng, n = this.wrapLat ? T(t.lat, this.wrapLat, !0) : t.lat, s = t.alt;
          return new U(n, e, s);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), n = this.wrapLatLng(e), s = e.lat - n.lat, a = e.lng - n.lng;
          if (s === 0 && a === 0)
            return t;
          var h = t.getSouthWest(), p = t.getNorthEast(), g = new U(h.lat - s, h.lng - a), _ = new U(p.lat - s, p.lng - a);
          return new at(g, _);
        }
      }, At = l({}, Tt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(t, e) {
          var n = Math.PI / 180, s = t.lat * n, a = e.lat * n, h = Math.sin((e.lat - t.lat) * n / 2), p = Math.sin((e.lng - t.lng) * n / 2), g = h * h + Math.cos(s) * Math.cos(a) * p * p, _ = 2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g));
          return this.R * _;
        }
      }), kn = 6378137, yi = {
        R: kn,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, n = this.MAX_LATITUDE, s = Math.max(Math.min(n, t.lat), -n), a = Math.sin(s * e);
          return new C(
            this.R * t.lng * e,
            this.R * Math.log((1 + a) / (1 - a)) / 2
          );
        },
        unproject: function(t) {
          var e = 180 / Math.PI;
          return new U(
            (2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e,
            t.x * e / this.R
          );
        },
        bounds: (function() {
          var t = kn * Math.PI;
          return new j([-t, -t], [t, t]);
        })()
      };
      function bi(t, e, n, s) {
        if (it(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = n, this._d = s;
      }
      bi.prototype = {
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
      function pe(t, e, n, s) {
        return new bi(t, e, n, s);
      }
      var xi = l({}, At, {
        code: "EPSG:3857",
        projection: yi,
        transformation: (function() {
          var t = 0.5 / (Math.PI * yi.R);
          return pe(t, 0.5, -t, 0.5);
        })()
      }), ys = l({}, xi, {
        code: "EPSG:900913"
      });
      function Tn(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function En(t, e) {
        var n = "", s, a, h, p, g, _;
        for (s = 0, h = t.length; s < h; s++) {
          for (g = t[s], a = 0, p = g.length; a < p; a++)
            _ = g[a], n += (a ? "L" : "M") + _.x + " " + _.y;
          n += e ? P.svg ? "z" : "x" : "";
        }
        return n || "M0 0";
      }
      var wi = document.documentElement.style, Oe = "ActiveXObject" in window, bs = Oe && !document.addEventListener, Pn = "msLaunchUri" in navigator && !("documentMode" in document), $i = _t("webkit"), Sn = _t("android"), Dn = _t("android 2") || _t("android 3"), xs = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), ws = Sn && _t("Google") && xs < 537 && !("AudioNode" in window), ki = !!window.opera, In = !Pn && _t("chrome"), Ln = _t("gecko") && !$i && !ki && !Oe, $s = !In && _t("safari"), An = _t("phantom"), Cn = "OTransition" in wi, ks = navigator.platform.indexOf("Win") === 0, Mn = Oe && "transition" in wi, Ti = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !Dn, zn = "MozPerspective" in wi, Ts = !window.L_DISABLE_3D && (Mn || Ti || zn) && !Cn && !An, fe = typeof orientation < "u" || _t("mobile"), Es = fe && $i, Ps = fe && Ti, On = !window.PointerEvent && window.MSPointerEvent, Rn = !!(window.PointerEvent || On), Nn = "ontouchstart" in window || !!window.TouchEvent, Ss = !window.L_NO_TOUCH && (Nn || Rn), Ds = fe && ki, Is = fe && Ln, Ls = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, As = (function() {
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
      })(), Cs = (function() {
        return !!document.createElement("canvas").getContext;
      })(), Ei = !!(document.createElementNS && Tn("svg").createSVGRect), Ms = !!Ei && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), zs = !Ei && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), Os = navigator.platform.indexOf("Mac") === 0, Rs = navigator.platform.indexOf("Linux") === 0;
      function _t(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var P = {
        ie: Oe,
        ielt9: bs,
        edge: Pn,
        webkit: $i,
        android: Sn,
        android23: Dn,
        androidStock: ws,
        opera: ki,
        chrome: In,
        gecko: Ln,
        safari: $s,
        phantom: An,
        opera12: Cn,
        win: ks,
        ie3d: Mn,
        webkit3d: Ti,
        gecko3d: zn,
        any3d: Ts,
        mobile: fe,
        mobileWebkit: Es,
        mobileWebkit3d: Ps,
        msPointer: On,
        pointer: Rn,
        touch: Ss,
        touchNative: Nn,
        mobileOpera: Ds,
        mobileGecko: Is,
        retina: Ls,
        passiveEvents: As,
        canvas: Cs,
        svg: Ei,
        vml: zs,
        inlineSvg: Ms,
        mac: Os,
        linux: Rs
      }, Bn = P.msPointer ? "MSPointerDown" : "pointerdown", Fn = P.msPointer ? "MSPointerMove" : "pointermove", Zn = P.msPointer ? "MSPointerUp" : "pointerup", Un = P.msPointer ? "MSPointerCancel" : "pointercancel", Pi = {
        touchstart: Bn,
        touchmove: Fn,
        touchend: Zn,
        touchcancel: Un
      }, Wn = {
        touchstart: Ws,
        touchmove: Re,
        touchend: Re,
        touchcancel: Re
      }, Jt = {}, qn = !1;
      function Ns(t, e, n) {
        return e === "touchstart" && Us(), Wn[e] ? (n = Wn[e].bind(this, n), t.addEventListener(Pi[e], n, !1), n) : (console.warn("wrong event specified:", e), b);
      }
      function Bs(t, e, n) {
        if (!Pi[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(Pi[e], n, !1);
      }
      function Fs(t) {
        Jt[t.pointerId] = t;
      }
      function Zs(t) {
        Jt[t.pointerId] && (Jt[t.pointerId] = t);
      }
      function Hn(t) {
        delete Jt[t.pointerId];
      }
      function Us() {
        qn || (document.addEventListener(Bn, Fs, !0), document.addEventListener(Fn, Zs, !0), document.addEventListener(Zn, Hn, !0), document.addEventListener(Un, Hn, !0), qn = !0);
      }
      function Re(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var n in Jt)
            e.touches.push(Jt[n]);
          e.changedTouches = [e], t(e);
        }
      }
      function Ws(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && et(e), Re(t, e);
      }
      function qs(t) {
        var e = {}, n, s;
        for (s in t)
          n = t[s], e[s] = n && n.bind ? n.bind(t) : n;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var Hs = 200;
      function js(t, e) {
        t.addEventListener("dblclick", e);
        var n = 0, s;
        function a(h) {
          if (h.detail !== 1) {
            s = h.detail;
            return;
          }
          if (!(h.pointerType === "mouse" || h.sourceCapabilities && !h.sourceCapabilities.firesTouchEvents)) {
            var p = Jn(h);
            if (!(p.some(function(_) {
              return _ instanceof HTMLLabelElement && _.attributes.for;
            }) && !p.some(function(_) {
              return _ instanceof HTMLInputElement || _ instanceof HTMLSelectElement;
            }))) {
              var g = Date.now();
              g - n <= Hs ? (s++, s === 2 && e(qs(h))) : s = 1, n = g;
            }
          }
        }
        return t.addEventListener("click", a), {
          dblclick: e,
          simDblclick: a
        };
      }
      function Gs(t, e) {
        t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
      }
      var Si = Fe(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), me = Fe(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), jn = me === "webkitTransition" || me === "OTransition" ? me + "End" : "transitionend";
      function Gn(t) {
        return typeof t == "string" ? document.getElementById(t) : t;
      }
      function ge(t, e) {
        var n = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!n || n === "auto") && document.defaultView) {
          var s = document.defaultView.getComputedStyle(t, null);
          n = s ? s[e] : null;
        }
        return n === "auto" ? null : n;
      }
      function Z(t, e, n) {
        var s = document.createElement(t);
        return s.className = e || "", n && n.appendChild(s), s;
      }
      function G(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function Ne(t) {
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
      function Di(t, e) {
        if (t.classList !== void 0)
          return t.classList.contains(e);
        var n = Be(t);
        return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n);
      }
      function z(t, e) {
        if (t.classList !== void 0)
          for (var n = A(e), s = 0, a = n.length; s < a; s++)
            t.classList.add(n[s]);
        else if (!Di(t, e)) {
          var h = Be(t);
          Ii(t, (h ? h + " " : "") + e);
        }
      }
      function K(t, e) {
        t.classList !== void 0 ? t.classList.remove(e) : Ii(t, $((" " + Be(t) + " ").replace(" " + e + " ", " ")));
      }
      function Ii(t, e) {
        t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
      }
      function Be(t) {
        return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
      }
      function dt(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && Ks(t, e);
      }
      function Ks(t, e) {
        var n = !1, s = "DXImageTransform.Microsoft.Alpha";
        try {
          n = t.filters.item(s);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), n ? (n.Enabled = e !== 100, n.Opacity = e) : t.style.filter += " progid:" + s + "(opacity=" + e + ")";
      }
      function Fe(t) {
        for (var e = document.documentElement.style, n = 0; n < t.length; n++)
          if (t[n] in e)
            return t[n];
        return !1;
      }
      function Ft(t, e, n) {
        var s = e || new C(0, 0);
        t.style[Si] = (P.ie3d ? "translate(" + s.x + "px," + s.y + "px)" : "translate3d(" + s.x + "px," + s.y + "px,0)") + (n ? " scale(" + n + ")" : "");
      }
      function J(t, e) {
        t._leaflet_pos = e, P.any3d ? Ft(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
      }
      function Zt(t) {
        return t._leaflet_pos || new C(0, 0);
      }
      var ve, _e, Li;
      if ("onselectstart" in document)
        ve = function() {
          M(window, "selectstart", et);
        }, _e = function() {
          q(window, "selectstart", et);
        };
      else {
        var ye = Fe(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        ve = function() {
          if (ye) {
            var t = document.documentElement.style;
            Li = t[ye], t[ye] = "none";
          }
        }, _e = function() {
          ye && (document.documentElement.style[ye] = Li, Li = void 0);
        };
      }
      function Ai() {
        M(window, "dragstart", et);
      }
      function Ci() {
        q(window, "dragstart", et);
      }
      var Ze, Mi;
      function zi(t) {
        for (; t.tabIndex === -1; )
          t = t.parentNode;
        t.style && (Ue(), Ze = t, Mi = t.style.outlineStyle, t.style.outlineStyle = "none", M(window, "keydown", Ue));
      }
      function Ue() {
        Ze && (Ze.style.outlineStyle = Mi, Ze = void 0, Mi = void 0, q(window, "keydown", Ue));
      }
      function Kn(t) {
        do
          t = t.parentNode;
        while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
        return t;
      }
      function Oi(t) {
        var e = t.getBoundingClientRect();
        return {
          x: e.width / t.offsetWidth || 1,
          y: e.height / t.offsetHeight || 1,
          boundingClientRect: e
        };
      }
      var Vs = {
        __proto__: null,
        TRANSFORM: Si,
        TRANSITION: me,
        TRANSITION_END: jn,
        get: Gn,
        getStyle: ge,
        create: Z,
        remove: G,
        empty: Ne,
        toFront: Yt,
        toBack: Xt,
        hasClass: Di,
        addClass: z,
        removeClass: K,
        setClass: Ii,
        getClass: Be,
        setOpacity: dt,
        testProp: Fe,
        setTransform: Ft,
        setPosition: J,
        getPosition: Zt,
        get disableTextSelection() {
          return ve;
        },
        get enableTextSelection() {
          return _e;
        },
        disableImageDrag: Ai,
        enableImageDrag: Ci,
        preventOutline: zi,
        restoreOutline: Ue,
        getSizedParentNode: Kn,
        getScale: Oi
      };
      function M(t, e, n, s) {
        if (e && typeof e == "object")
          for (var a in e)
            Ni(t, a, e[a], n);
        else {
          e = A(e);
          for (var h = 0, p = e.length; h < p; h++)
            Ni(t, e[h], n, s);
        }
        return this;
      }
      var yt = "_leaflet_events";
      function q(t, e, n, s) {
        if (arguments.length === 1)
          Vn(t), delete t[yt];
        else if (e && typeof e == "object")
          for (var a in e)
            Bi(t, a, e[a], n);
        else if (e = A(e), arguments.length === 2)
          Vn(t, function(g) {
            return gi(e, g) !== -1;
          });
        else
          for (var h = 0, p = e.length; h < p; h++)
            Bi(t, e[h], n, s);
        return this;
      }
      function Vn(t, e) {
        for (var n in t[yt]) {
          var s = n.split(/\d/)[0];
          (!e || e(s)) && Bi(t, s, null, null, n);
        }
      }
      var Ri = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function Ni(t, e, n, s) {
        var a = e + u(n) + (s ? "_" + u(s) : "");
        if (t[yt] && t[yt][a])
          return this;
        var h = function(g) {
          return n.call(s || t, g || window.event);
        }, p = h;
        !P.touchNative && P.pointer && e.indexOf("touch") === 0 ? h = Ns(t, e, h) : P.touch && e === "dblclick" ? h = js(t, h) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(Ri[e] || e, h, P.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (h = function(g) {
          g = g || window.event, Zi(t, g) && p(g);
        }, t.addEventListener(Ri[e], h, !1)) : t.addEventListener(e, p, !1) : t.attachEvent("on" + e, h), t[yt] = t[yt] || {}, t[yt][a] = h;
      }
      function Bi(t, e, n, s, a) {
        a = a || e + u(n) + (s ? "_" + u(s) : "");
        var h = t[yt] && t[yt][a];
        if (!h)
          return this;
        !P.touchNative && P.pointer && e.indexOf("touch") === 0 ? Bs(t, e, h) : P.touch && e === "dblclick" ? Gs(t, h) : "removeEventListener" in t ? t.removeEventListener(Ri[e] || e, h, !1) : t.detachEvent("on" + e, h), t[yt][a] = null;
      }
      function Ut(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
      }
      function Fi(t) {
        return Ni(t, "wheel", Ut), this;
      }
      function be(t) {
        return M(t, "mousedown touchstart dblclick contextmenu", Ut), t._leaflet_disable_click = !0, this;
      }
      function et(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
      }
      function Wt(t) {
        return et(t), Ut(t), this;
      }
      function Jn(t) {
        if (t.composedPath)
          return t.composedPath();
        for (var e = [], n = t.target; n; )
          e.push(n), n = n.parentNode;
        return e;
      }
      function Yn(t, e) {
        if (!e)
          return new C(t.clientX, t.clientY);
        var n = Oi(e), s = n.boundingClientRect;
        return new C(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - s.left) / n.x - e.clientLeft,
          (t.clientY - s.top) / n.y - e.clientTop
        );
      }
      var Js = P.linux && P.chrome ? window.devicePixelRatio : P.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function Xn(t) {
        return P.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / Js : (
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
      function Zi(t, e) {
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
      var Ys = {
        __proto__: null,
        on: M,
        off: q,
        stopPropagation: Ut,
        disableScrollPropagation: Fi,
        disableClickPropagation: be,
        preventDefault: et,
        stop: Wt,
        getPropagationPath: Jn,
        getMousePosition: Yn,
        getWheelDelta: Xn,
        isExternalTarget: Zi,
        addListener: M,
        removeListener: q
      }, Qn = ue.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(t, e, n, s) {
          this.stop(), this._el = t, this._inProgress = !0, this._duration = n || 0.25, this._easeOutPower = 1 / Math.max(s || 0.5, 0.2), this._startPos = Zt(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function() {
          this._animId = rt(this._animate, this), this._step();
        },
        _step: function(t) {
          var e = +/* @__PURE__ */ new Date() - this._startTime, n = this._duration * 1e3;
          e < n ? this._runFrame(this._easeOut(e / n), t) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(t, e) {
          var n = this._startPos.add(this._offset.multiplyBy(t));
          e && n._round(), J(this._el, n), this.fire("step");
        },
        _complete: function() {
          ht(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      }), B = ue.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: xi,
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
          e = R(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = f(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(N(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = me && P.any3d && !P.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), M(this._proxy, jn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(t, e, n) {
          if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(N(t), e, this.options.maxBounds), n = n || {}, this._stop(), this._loaded && !n.reset && n !== !0) {
            n.animate !== void 0 && (n.zoom = l({ animate: n.animate }, n.zoom), n.pan = l({ animate: n.animate, duration: n.duration }, n.pan));
            var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
            if (s)
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
        setZoomAround: function(t, e, n) {
          var s = this.getZoomScale(e), a = this.getSize().divideBy(2), h = t instanceof C ? t : this.latLngToContainerPoint(t), p = h.subtract(a).multiplyBy(1 - 1 / s), g = this.containerPointToLatLng(a.add(p));
          return this.setView(g, e, { zoom: n });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : V(t);
          var n = I(e.paddingTopLeft || e.padding || [0, 0]), s = I(e.paddingBottomRight || e.padding || [0, 0]), a = this.getBoundsZoom(t, !1, n.add(s));
          if (a = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, a) : a, a === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: a
            };
          var h = s.subtract(n).divideBy(2), p = this.project(t.getSouthWest(), a), g = this.project(t.getNorthEast(), a), _ = this.unproject(p.add(g).divideBy(2).add(h), a);
          return {
            center: _,
            zoom: a
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = V(t), !t.isValid())
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
          if (t = I(t).round(), e = e || {}, !t.x && !t.y)
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new Qn(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
            z(this._mapPane, "leaflet-pan-anim");
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
          if (n = n || {}, n.animate === !1 || !P.any3d)
            return this.setView(t, e, n);
          this._stop();
          var s = this.project(this.getCenter()), a = this.project(t), h = this.getSize(), p = this._zoom;
          t = N(t), e = e === void 0 ? p : e;
          var g = Math.max(h.x, h.y), _ = g * this.getZoomScale(p, e), x = a.distanceTo(s) || 1, k = 1.42, S = k * k;
          function O(Y) {
            var ti = Y ? -1 : 1, Ba = Y ? _ : g, Fa = _ * _ - g * g + ti * S * S * x * x, Za = 2 * Ba * S * x, Xi = Fa / Za, Cr = Math.sqrt(Xi * Xi + 1) - Xi, Ua = Cr < 1e-9 ? -18 : Math.log(Cr);
            return Ua;
          }
          function nt(Y) {
            return (Math.exp(Y) - Math.exp(-Y)) / 2;
          }
          function X(Y) {
            return (Math.exp(Y) + Math.exp(-Y)) / 2;
          }
          function ut(Y) {
            return nt(Y) / X(Y);
          }
          var ot = O(0);
          function re(Y) {
            return g * (X(ot) / X(ot + k * Y));
          }
          function za(Y) {
            return g * (X(ot) * ut(ot + k * Y) - nt(ot)) / S;
          }
          function Oa(Y) {
            return 1 - Math.pow(1 - Y, 1.5);
          }
          var Ra = Date.now(), Lr = (O(1) - ot) / k, Na = n.duration ? 1e3 * n.duration : 1e3 * Lr * 0.8;
          function Ar() {
            var Y = (Date.now() - Ra) / Na, ti = Oa(Y) * Lr;
            Y <= 1 ? (this._flyToFrame = rt(Ar, this), this._move(
              this.unproject(s.add(a.subtract(s).multiplyBy(za(ti) / x)), p),
              this.getScaleZoom(g / re(ti), p),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, n.noMoveStart), Ar.call(this), this;
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
          return t = V(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
          var n = this.getCenter(), s = this._limitCenter(n, this._zoom, V(t));
          return n.equals(s) || this.panTo(s, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var n = I(e.paddingTopLeft || e.padding || [0, 0]), s = I(e.paddingBottomRight || e.padding || [0, 0]), a = this.project(this.getCenter()), h = this.project(t), p = this.getPixelBounds(), g = st([p.min.add(n), p.max.subtract(s)]), _ = g.getSize();
          if (!g.contains(h)) {
            this._enforcingBounds = !0;
            var x = h.subtract(g.getCenter()), k = g.extend(h).getSize().subtract(_);
            a.x += x.x < 0 ? -k.x : k.x, a.y += x.y < 0 ? -k.y : k.y, this.panTo(this.unproject(a), e), this._enforcingBounds = !1;
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
          t = l({
            animate: !1,
            pan: !0
          }, t === !0 ? { animate: !0 } : t);
          var e = this.getSize();
          this._sizeChanged = !0, this._lastCenter = null;
          var n = this.getSize(), s = e.divideBy(2).round(), a = n.divideBy(2).round(), h = s.subtract(a);
          return !h.x && !h.y ? this : (t.animate && t.pan ? this.panBy(h) : (t.pan && this._rawPanBy(h), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(f(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
          if (t = this._locateOptions = l({
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
            var e = t.coords.latitude, n = t.coords.longitude, s = new U(e, n), a = s.toBounds(t.coords.accuracy * 2), h = this._locateOptions;
            if (h.setView) {
              var p = this.getBoundsZoom(a);
              this.setView(s, h.maxZoom ? Math.min(p, h.maxZoom) : p);
            }
            var g = {
              latlng: s,
              bounds: a,
              timestamp: t.timestamp
            };
            for (var _ in t.coords)
              typeof t.coords[_] == "number" && (g[_] = t.coords[_]);
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
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), G(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ht(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
          var t;
          for (t in this._layers)
            this._layers[t].remove();
          for (t in this._panes)
            G(this._panes[t]);
          return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
        },
        // @section Other Methods
        // @method createPane(name: String, container?: HTMLElement): HTMLElement
        // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
        // then returns it. The pane is created as a child of `container`, or
        // as a child of the main map pane if not set.
        createPane: function(t, e) {
          var n = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), s = Z("div", n, e || this._mapPane);
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
          var t = this.getPixelBounds(), e = this.unproject(t.getBottomLeft()), n = this.unproject(t.getTopRight());
          return new at(e, n);
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
          t = V(t), n = I(n || [0, 0]);
          var s = this.getZoom() || 0, a = this.getMinZoom(), h = this.getMaxZoom(), p = t.getNorthWest(), g = t.getSouthEast(), _ = this.getSize().subtract(n), x = st(this.project(g, s), this.project(p, s)).getSize(), k = P.any3d ? this.options.zoomSnap : 1, S = _.x / x.x, O = _.y / x.y, nt = e ? Math.max(S, O) : Math.min(S, O);
          return s = this.getScaleZoom(nt, s), k && (s = Math.round(s / (k / 100)) * (k / 100), s = e ? Math.ceil(s / k) * k : Math.floor(s / k) * k), Math.max(a, Math.min(h, s));
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
          return new j(n, n.add(this.getSize()));
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
          var s = n.zoom(t * n.scale(e));
          return isNaN(s) ? 1 / 0 : s;
        },
        // @method project(latlng: LatLng, zoom: Number): Point
        // Projects a geographical coordinate `LatLng` according to the projection
        // of the map's CRS, then scales it according to `zoom` and the CRS's
        // `Transformation`. The result is pixel coordinate relative to
        // the CRS origin.
        project: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(N(t), e);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng(I(t), e);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(t) {
          var e = I(t).add(this.getPixelOrigin());
          return this.unproject(e);
        },
        // @method latLngToLayerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the [origin pixel](#map-getpixelorigin).
        latLngToLayerPoint: function(t) {
          var e = this.project(N(t))._round();
          return e._subtract(this.getPixelOrigin());
        },
        // @method wrapLatLng(latlng: LatLng): LatLng
        // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
        // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
        // CRS's bounds.
        // By default this means longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees.
        wrapLatLng: function(t) {
          return this.options.crs.wrapLatLng(N(t));
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring that
        // its center is within the CRS's bounds.
        // By default this means the center longitude is wrapped around the dateline so its
        // value is between -180 and +180 degrees, and the majority of the bounds
        // overlaps the CRS's bounds.
        wrapLatLngBounds: function(t) {
          return this.options.crs.wrapLatLngBounds(V(t));
        },
        // @method distance(latlng1: LatLng, latlng2: LatLng): Number
        // Returns the distance between two geographical coordinates according to
        // the map's CRS. By default this measures distance in meters.
        distance: function(t, e) {
          return this.options.crs.distance(N(t), N(e));
        },
        // @method containerPointToLayerPoint(point: Point): Point
        // Given a pixel coordinate relative to the map container, returns the corresponding
        // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
        containerPointToLayerPoint: function(t) {
          return I(t).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(t) {
          return I(t).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(t) {
          var e = this.containerPointToLayerPoint(I(t));
          return this.layerPointToLatLng(e);
        },
        // @method latLngToContainerPoint(latlng: LatLng): Point
        // Given a geographical coordinate, returns the corresponding pixel coordinate
        // relative to the map container.
        latLngToContainerPoint: function(t) {
          return this.layerPointToContainerPoint(this.latLngToLayerPoint(N(t)));
        },
        // @method mouseEventToContainerPoint(ev: MouseEvent): Point
        // Given a MouseEvent object, returns the pixel coordinate relative to the
        // map container where the event took place.
        mouseEventToContainerPoint: function(t) {
          return Yn(t, this._container);
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
          var e = this._container = Gn(t);
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          M(e, "scroll", this._onScroll, this), this._containerId = u(e);
        },
        _initLayout: function() {
          var t = this._container;
          this._fadeAnimated = this.options.fadeAnimation && P.any3d, z(t, "leaflet-container" + (P.touch ? " leaflet-touch" : "") + (P.retina ? " leaflet-retina" : "") + (P.ielt9 ? " leaflet-oldie" : "") + (P.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var e = ge(t, "position");
          e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var t = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), J(this._mapPane, new C(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (z(t.markerPane, "leaflet-zoom-hide"), z(t.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(t, e, n) {
          J(this._mapPane, new C(0, 0));
          var s = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var a = this._zoom !== e;
          this._moveStart(a, n)._move(t, e)._moveEnd(a), this.fire("viewreset"), s && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, n, s) {
          e === void 0 && (e = this._zoom);
          var a = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), s ? n && n.pinch && this.fire("zoom", n) : ((a || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
        },
        _moveEnd: function(t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return ht(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(t) {
          J(this._mapPane, this._getMapPanePos().subtract(t));
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
          this._targets = {}, this._targets[u(this._container)] = this;
          var e = t ? q : M;
          e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), P.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function() {
          ht(this._resizeRequest), this._resizeRequest = rt(
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
          for (var n = [], s, a = e === "mouseout" || e === "mouseover", h = t.target || t.srcElement, p = !1; h; ) {
            if (s = this._targets[u(h)], s && (e === "click" || e === "preclick") && this._draggableMoved(s)) {
              p = !0;
              break;
            }
            if (s && s.listens(e, !0) && (a && !Zi(h, t) || (n.push(s), a)) || h === this._container)
              break;
            h = h.parentNode;
          }
          return !n.length && !p && !a && this.listens(e, !0) && (n = [this]), n;
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
            n === "mousedown" && zi(e), this._fireDOMEvent(t, n);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, n) {
          if (t.type === "click") {
            var s = l({}, t);
            s.type = "preclick", this._fireDOMEvent(s, s.type, n);
          }
          var a = this._findEventTargets(t, e);
          if (n) {
            for (var h = [], p = 0; p < n.length; p++)
              n[p].listens(e, !0) && h.push(n[p]);
            a = h.concat(a);
          }
          if (a.length) {
            e === "contextmenu" && et(t);
            var g = a[0], _ = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var x = g.getLatLng && (!g._radius || g._radius <= 10);
              _.containerPoint = x ? this.latLngToContainerPoint(g.getLatLng()) : this.mouseEventToContainerPoint(t), _.layerPoint = this.containerPointToLayerPoint(_.containerPoint), _.latlng = x ? g.getLatLng() : this.layerPointToLatLng(_.layerPoint);
            }
            for (p = 0; p < a.length; p++)
              if (a[p].fire(e, _, !0), _.originalEvent._stopped || a[p].options.bubblingMouseEvents === !1 && gi(this._mouseEvents, e) !== -1)
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
          var s = this._getNewPixelOrigin(n, e);
          return this.project(t, e)._subtract(s);
        },
        _latLngBoundsToNewLayerBounds: function(t, e, n) {
          var s = this._getNewPixelOrigin(n, e);
          return st([
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
        _limitCenter: function(t, e, n) {
          if (!n)
            return t;
          var s = this.project(t, e), a = this.getSize().divideBy(2), h = new j(s.subtract(a), s.add(a)), p = this._getBoundsOffset(h, n, e);
          return Math.abs(p.x) <= 1 && Math.abs(p.y) <= 1 ? t : this.unproject(s.add(p), e);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(t, e) {
          if (!e)
            return t;
          var n = this.getPixelBounds(), s = new j(n.min.add(t), n.max.add(t));
          return t.add(this._getBoundsOffset(s, e));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(t, e, n) {
          var s = st(
            this.project(e.getNorthEast(), n),
            this.project(e.getSouthWest(), n)
          ), a = s.min.subtract(t.min), h = s.max.subtract(t.max), p = this._rebound(a.x, -h.x), g = this._rebound(a.y, -h.y);
          return new C(p, g);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), n = this.getMaxZoom(), s = P.any3d ? this.options.zoomSnap : 1;
          return s && (t = Math.round(t / s) * s), Math.max(e, Math.min(n, t));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          K(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(t, e) {
          var n = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, e), !0);
        },
        _createAnimProxy: function() {
          var t = this._proxy = Z("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var n = Si, s = this._proxy.style[n];
            Ft(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), s === this._proxy.style[n] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          G(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var t = this.getCenter(), e = this.getZoom();
          Ft(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
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
          var s = this.getZoomScale(e), a = this._getCenterOffset(t)._divideBy(1 - 1 / s);
          return n.animate !== !0 && !this.getSize().contains(a) ? !1 : (rt(function() {
            this._moveStart(!0, n.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, n, s) {
          this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, z(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: s
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(f(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && K(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Xs(t, e) {
        return new B(t, e);
      }
      var pt = kt.extend({
        // @section
        // @aka Control Options
        options: {
          // @option position: String = 'topright'
          // The position of the control (one of the map corners). Possible values are `'topleft'`,
          // `'topright'`, `'bottomleft'` or `'bottomright'`
          position: "topright"
        },
        initialize: function(t) {
          R(this, t);
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
          var e = this._container = this.onAdd(t), n = this.getPosition(), s = t._controlCorners[n];
          return z(e, "leaflet-control"), n.indexOf("bottom") !== -1 ? s.insertBefore(e, s.firstChild) : s.appendChild(e), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (G(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(t) {
          this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
        }
      }), xe = function(t) {
        return new pt(t);
      };
      B.include({
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
          var t = this._controlCorners = {}, e = "leaflet-", n = this._controlContainer = Z("div", e + "control-container", this._container);
          function s(a, h) {
            var p = e + a + " " + e + h;
            t[a + h] = Z("div", p, n);
          }
          s("top", "left"), s("top", "right"), s("bottom", "left"), s("bottom", "right");
        },
        _clearControlPos: function() {
          for (var t in this._controlCorners)
            G(this._controlCorners[t]);
          G(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var tr = pt.extend({
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
          sortFunction: function(t, e, n, s) {
            return n < s ? -1 : s < n ? 1 : 0;
          }
        },
        initialize: function(t, e, n) {
          R(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
          return pt.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
          var e = this._getLayer(u(t));
          return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          z(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return t < this._section.clientHeight ? (z(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : K(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return K(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var t = "leaflet-control-layers", e = this._container = Z("div", t), n = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), be(e), Fi(e);
          var s = this._section = Z("section", t + "-list");
          n && (this._map.on("click", this.collapse, this), M(e, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var a = this._layersLink = Z("a", t + "-toggle", e);
          a.href = "#", a.title = "Layers", a.setAttribute("role", "button"), M(a, {
            keydown: function(h) {
              h.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(h) {
              et(h), this._expandSafely();
            }
          }, this), n || this.expand(), this._baseLayersList = Z("div", t + "-base", s), this._separator = Z("div", t + "-separator", s), this._overlaysList = Z("div", t + "-overlays", s), e.appendChild(s);
        },
        _getLayer: function(t) {
          for (var e = 0; e < this._layers.length; e++)
            if (this._layers[e] && u(this._layers[e].layer) === t)
              return this._layers[e];
        },
        _addLayer: function(t, e, n) {
          this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: t,
            name: e,
            overlay: n
          }), this.options.sortLayers && this._layers.sort(f(function(s, a) {
            return this.options.sortFunction(s.layer, a.layer, s.name, a.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Ne(this._baseLayersList), Ne(this._overlaysList), this._layerControlInputs = [];
          var t, e, n, s, a = 0;
          for (n = 0; n < this._layers.length; n++)
            s = this._layers[n], this._addItem(s), e = e || s.overlay, t = t || !s.overlay, a += s.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && a > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
        },
        _onLayerChange: function(t) {
          this._handlingClick || this._update();
          var e = this._getLayer(u(t.target)), n = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
          n && this._map.fire(n, e);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(t, e) {
          var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", s = document.createElement("div");
          return s.innerHTML = n, s.firstChild;
        },
        _addItem: function(t) {
          var e = document.createElement("label"), n = this._map.hasLayer(t.layer), s;
          t.overlay ? (s = document.createElement("input"), s.type = "checkbox", s.className = "leaflet-control-layers-selector", s.defaultChecked = n) : s = this._createRadioElement("leaflet-base-layers_" + u(this), n), this._layerControlInputs.push(s), s.layerId = u(t.layer), M(s, "click", this._onInputClick, this);
          var a = document.createElement("span");
          a.innerHTML = " " + t.name;
          var h = document.createElement("span");
          e.appendChild(h), h.appendChild(s), h.appendChild(a);
          var p = t.overlay ? this._overlaysList : this._baseLayersList;
          return p.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, n, s = [], a = [];
            this._handlingClick = !0;
            for (var h = t.length - 1; h >= 0; h--)
              e = t[h], n = this._getLayer(e.layerId).layer, e.checked ? s.push(n) : e.checked || a.push(n);
            for (h = 0; h < a.length; h++)
              this._map.hasLayer(a[h]) && this._map.removeLayer(a[h]);
            for (h = 0; h < s.length; h++)
              this._map.hasLayer(s[h]) || this._map.addLayer(s[h]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, n, s = this._map.getZoom(), a = t.length - 1; a >= 0; a--)
            e = t[a], n = this._getLayer(e.layerId).layer, e.disabled = n.options.minZoom !== void 0 && s < n.options.minZoom || n.options.maxZoom !== void 0 && s > n.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var t = this._section;
          this._preventClick = !0, M(t, "click", et), this.expand();
          var e = this;
          setTimeout(function() {
            q(t, "click", et), e._preventClick = !1;
          });
        }
      }), Qs = function(t, e, n) {
        return new tr(t, e, n);
      }, Ui = pt.extend({
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
          var e = "leaflet-control-zoom", n = Z("div", e + " leaflet-bar"), s = this.options;
          return this._zoomInButton = this._createButton(
            s.zoomInText,
            s.zoomInTitle,
            e + "-in",
            n,
            this._zoomIn
          ), this._zoomOutButton = this._createButton(
            s.zoomOutText,
            s.zoomOutTitle,
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
        _createButton: function(t, e, n, s, a) {
          var h = Z("a", n, s);
          return h.innerHTML = t, h.href = "#", h.title = e, h.setAttribute("role", "button"), h.setAttribute("aria-label", e), be(h), M(h, "click", Wt), M(h, "click", a, this), M(h, "click", this._refocusOnMap, this), h;
        },
        _updateDisabled: function() {
          var t = this._map, e = "leaflet-disabled";
          K(this._zoomInButton, e), K(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (z(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (z(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      B.mergeOptions({
        zoomControl: !0
      }), B.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new Ui(), this.addControl(this.zoomControl));
      });
      var ta = function(t) {
        return new Ui(t);
      }, er = pt.extend({
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
          var e = "leaflet-control-scale", n = Z("div", e), s = this.options;
          return this._addScales(s, e + "-line", n), t.on(s.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), n;
        },
        onRemove: function(t) {
          t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(t, e, n) {
          t.metric && (this._mScale = Z("div", e, n)), t.imperial && (this._iScale = Z("div", e, n));
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
          var e = t * 3.2808399, n, s, a;
          e > 5280 ? (n = e / 5280, s = this._getRoundNum(n), this._updateScale(this._iScale, s + " mi", s / n)) : (a = this._getRoundNum(e), this._updateScale(this._iScale, a + " ft", a / e));
        },
        _updateScale: function(t, e, n) {
          t.style.width = Math.round(this.options.maxWidth * n) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), n = t / e;
          return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, e * n;
        }
      }), ea = function(t) {
        return new er(t);
      }, ia = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Wi = pt.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (P.inlineSvg ? ia + " " : "") + "Leaflet</a>"
        },
        initialize: function(t) {
          R(this, t), this._attributions = {};
        },
        onAdd: function(t) {
          t.attributionControl = this, this._container = Z("div", "leaflet-control-attribution"), be(this._container);
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
      B.mergeOptions({
        attributionControl: !0
      }), B.addInitHook(function() {
        this.options.attributionControl && new Wi().addTo(this);
      });
      var na = function(t) {
        return new Wi(t);
      };
      pt.Layers = tr, pt.Zoom = Ui, pt.Scale = er, pt.Attribution = Wi, xe.layers = Qs, xe.zoom = ta, xe.scale = ea, xe.attribution = na;
      var bt = kt.extend({
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
      bt.addTo = function(t, e) {
        return t.addHandler(e, this), this;
      };
      var ra = { Events: lt }, ir = P.touch ? "touchstart mousedown" : "mousedown", Ct = ue.extend({
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
        initialize: function(t, e, n, s) {
          R(this, s), this._element = t, this._dragStartTarget = e || t, this._preventOutline = n;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (M(this._dragStartTarget, ir, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (Ct._dragging === this && this.finishDrag(!0), q(this._dragStartTarget, ir, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(t) {
          if (this._enabled && (this._moved = !1, !Di(this._element, "leaflet-zoom-anim"))) {
            if (t.touches && t.touches.length !== 1) {
              Ct._dragging === this && this.finishDrag();
              return;
            }
            if (!(Ct._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (Ct._dragging = this, this._preventOutline && zi(this._element), Ai(), ve(), !this._moving)) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t, n = Kn(this._element);
              this._startPoint = new C(e.clientX, e.clientY), this._startPos = Zt(this._element), this._parentScale = Oi(n);
              var s = t.type === "mousedown";
              M(document, s ? "mousemove" : "touchmove", this._onMove, this), M(document, s ? "mouseup" : "touchend touchcancel", this._onUp, this);
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
            !n.x && !n.y || Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, et(t), this._moved || (this.fire("dragstart"), this._moved = !0, z(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), z(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = t, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var t = { originalEvent: this._lastEvent };
          this.fire("predrag", t), J(this._element, this._newPos), this.fire("drag", t);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(t) {
          K(document.body, "leaflet-dragging"), this._lastTarget && (K(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), q(document, "mousemove touchmove", this._onMove, this), q(document, "mouseup touchend touchcancel", this._onUp, this), Ci(), _e();
          var e = this._moved && this._moving;
          this._moving = !1, Ct._dragging = !1, e && this.fire("dragend", {
            noInertia: t,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function nr(t, e, n) {
        var s, a = [1, 4, 2, 8], h, p, g, _, x, k, S, O;
        for (h = 0, k = t.length; h < k; h++)
          t[h]._code = qt(t[h], e);
        for (g = 0; g < 4; g++) {
          for (S = a[g], s = [], h = 0, k = t.length, p = k - 1; h < k; p = h++)
            _ = t[h], x = t[p], _._code & S ? x._code & S || (O = We(x, _, S, e, n), O._code = qt(O, e), s.push(O)) : (x._code & S && (O = We(x, _, S, e, n), O._code = qt(O, e), s.push(O)), s.push(_));
          t = s;
        }
        return t;
      }
      function rr(t, e) {
        var n, s, a, h, p, g, _, x, k;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        ct(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var S = N([0, 0]), O = V(t), nt = O.getNorthWest().distanceTo(O.getSouthWest()) * O.getNorthEast().distanceTo(O.getNorthWest());
        nt < 1700 && (S = qi(t));
        var X = t.length, ut = [];
        for (n = 0; n < X; n++) {
          var ot = N(t[n]);
          ut.push(e.project(N([ot.lat - S.lat, ot.lng - S.lng])));
        }
        for (g = _ = x = 0, n = 0, s = X - 1; n < X; s = n++)
          a = ut[n], h = ut[s], p = a.y * h.x - h.y * a.x, _ += (a.x + h.x) * p, x += (a.y + h.y) * p, g += p * 3;
        g === 0 ? k = ut[0] : k = [_ / g, x / g];
        var re = e.unproject(I(k));
        return N([re.lat + S.lat, re.lng + S.lng]);
      }
      function qi(t) {
        for (var e = 0, n = 0, s = 0, a = 0; a < t.length; a++) {
          var h = N(t[a]);
          e += h.lat, n += h.lng, s++;
        }
        return N([e / s, n / s]);
      }
      var sa = {
        __proto__: null,
        clipPolygon: nr,
        polygonCenter: rr,
        centroid: qi
      };
      function sr(t, e) {
        if (!e || !t.length)
          return t.slice();
        var n = e * e;
        return t = la(t, n), t = oa(t, n), t;
      }
      function ar(t, e, n) {
        return Math.sqrt(we(t, e, n, !0));
      }
      function aa(t, e, n) {
        return we(t, e, n);
      }
      function oa(t, e) {
        var n = t.length, s = typeof Uint8Array < "u" ? Uint8Array : Array, a = new s(n);
        a[0] = a[n - 1] = 1, Hi(t, a, e, 0, n - 1);
        var h, p = [];
        for (h = 0; h < n; h++)
          a[h] && p.push(t[h]);
        return p;
      }
      function Hi(t, e, n, s, a) {
        var h = 0, p, g, _;
        for (g = s + 1; g <= a - 1; g++)
          _ = we(t[g], t[s], t[a], !0), _ > h && (p = g, h = _);
        h > n && (e[p] = 1, Hi(t, e, n, s, p), Hi(t, e, n, p, a));
      }
      function la(t, e) {
        for (var n = [t[0]], s = 1, a = 0, h = t.length; s < h; s++)
          ha(t[s], t[a]) > e && (n.push(t[s]), a = s);
        return a < h - 1 && n.push(t[h - 1]), n;
      }
      var or;
      function lr(t, e, n, s, a) {
        var h = s ? or : qt(t, n), p = qt(e, n), g, _, x;
        for (or = p; ; ) {
          if (!(h | p))
            return [t, e];
          if (h & p)
            return !1;
          g = h || p, _ = We(t, e, g, n, a), x = qt(_, n), g === h ? (t = _, h = x) : (e = _, p = x);
        }
      }
      function We(t, e, n, s, a) {
        var h = e.x - t.x, p = e.y - t.y, g = s.min, _ = s.max, x, k;
        return n & 8 ? (x = t.x + h * (_.y - t.y) / p, k = _.y) : n & 4 ? (x = t.x + h * (g.y - t.y) / p, k = g.y) : n & 2 ? (x = _.x, k = t.y + p * (_.x - t.x) / h) : n & 1 && (x = g.x, k = t.y + p * (g.x - t.x) / h), new C(x, k, a);
      }
      function qt(t, e) {
        var n = 0;
        return t.x < e.min.x ? n |= 1 : t.x > e.max.x && (n |= 2), t.y < e.min.y ? n |= 4 : t.y > e.max.y && (n |= 8), n;
      }
      function ha(t, e) {
        var n = e.x - t.x, s = e.y - t.y;
        return n * n + s * s;
      }
      function we(t, e, n, s) {
        var a = e.x, h = e.y, p = n.x - a, g = n.y - h, _ = p * p + g * g, x;
        return _ > 0 && (x = ((t.x - a) * p + (t.y - h) * g) / _, x > 1 ? (a = n.x, h = n.y) : x > 0 && (a += p * x, h += g * x)), p = t.x - a, g = t.y - h, s ? p * p + g * g : new C(a, h);
      }
      function ct(t) {
        return !it(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function hr(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ct(t);
      }
      function dr(t, e) {
        var n, s, a, h, p, g, _, x;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        ct(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var k = N([0, 0]), S = V(t), O = S.getNorthWest().distanceTo(S.getSouthWest()) * S.getNorthEast().distanceTo(S.getNorthWest());
        O < 1700 && (k = qi(t));
        var nt = t.length, X = [];
        for (n = 0; n < nt; n++) {
          var ut = N(t[n]);
          X.push(e.project(N([ut.lat - k.lat, ut.lng - k.lng])));
        }
        for (n = 0, s = 0; n < nt - 1; n++)
          s += X[n].distanceTo(X[n + 1]) / 2;
        if (s === 0)
          x = X[0];
        else
          for (n = 0, h = 0; n < nt - 1; n++)
            if (p = X[n], g = X[n + 1], a = p.distanceTo(g), h += a, h > s) {
              _ = (h - s) / a, x = [
                g.x - _ * (g.x - p.x),
                g.y - _ * (g.y - p.y)
              ];
              break;
            }
        var ot = e.unproject(I(x));
        return N([ot.lat + k.lat, ot.lng + k.lng]);
      }
      var da = {
        __proto__: null,
        simplify: sr,
        pointToSegmentDistance: ar,
        closestPointOnSegment: aa,
        clipSegment: lr,
        _getEdgeIntersection: We,
        _getBitCode: qt,
        _sqClosestPointOnSegment: we,
        isFlat: ct,
        _flat: hr,
        polylineCenter: dr
      }, ji = {
        project: function(t) {
          return new C(t.lng, t.lat);
        },
        unproject: function(t) {
          return new U(t.y, t.x);
        },
        bounds: new j([-180, -90], [180, 90])
      }, Gi = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new j([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, n = this.R, s = t.lat * e, a = this.R_MINOR / n, h = Math.sqrt(1 - a * a), p = h * Math.sin(s), g = Math.tan(Math.PI / 4 - s / 2) / Math.pow((1 - p) / (1 + p), h / 2);
          return s = -n * Math.log(Math.max(g, 1e-10)), new C(t.lng * e * n, s);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, n = this.R, s = this.R_MINOR / n, a = Math.sqrt(1 - s * s), h = Math.exp(-t.y / n), p = Math.PI / 2 - 2 * Math.atan(h), g = 0, _ = 0.1, x; g < 15 && Math.abs(_) > 1e-7; g++)
            x = a * Math.sin(p), x = Math.pow((1 - x) / (1 + x), a / 2), _ = Math.PI / 2 - 2 * Math.atan(h * x) - p, p += _;
          return new U(p * e, t.x * e / n);
        }
      }, ca = {
        __proto__: null,
        LonLat: ji,
        Mercator: Gi,
        SphericalMercator: yi
      }, ua = l({}, At, {
        code: "EPSG:3395",
        projection: Gi,
        transformation: (function() {
          var t = 0.5 / (Math.PI * Gi.R);
          return pe(t, 0.5, -t, 0.5);
        })()
      }), cr = l({}, At, {
        code: "EPSG:4326",
        projection: ji,
        transformation: pe(1 / 180, 1, -1 / 180, 0.5)
      }), pa = l({}, Tt, {
        projection: ji,
        transformation: pe(1, 0, -1, 0),
        scale: function(t) {
          return Math.pow(2, t);
        },
        zoom: function(t) {
          return Math.log(t) / Math.LN2;
        },
        distance: function(t, e) {
          var n = e.lng - t.lng, s = e.lat - t.lat;
          return Math.sqrt(n * n + s * s);
        },
        infinite: !0
      });
      Tt.Earth = At, Tt.EPSG3395 = ua, Tt.EPSG3857 = xi, Tt.EPSG900913 = ys, Tt.EPSG4326 = cr, Tt.Simple = pa;
      var ft = ue.extend({
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
          return this._map._targets[u(t)] = this, this;
        },
        removeInteractiveTarget: function(t) {
          return delete this._map._targets[u(t)], this;
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
      B.include({
        // @method addLayer(layer: Layer): this
        // Adds the given layer to the map
        addLayer: function(t) {
          if (!t._layerAdd)
            throw new Error("The provided object is not a Layer.");
          var e = u(t);
          return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(t) {
          var e = u(t);
          return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(t) {
          return u(t) in this._layers;
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
          t = t ? it(t) ? t : [t] : [];
          for (var e = 0, n = t.length; e < n; e++)
            this.addLayer(t[e]);
        },
        _addZoomLimit: function(t) {
          (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[u(t)] = t, this._updateZoomLevels());
        },
        _removeZoomLimit: function(t) {
          var e = u(t);
          this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
          var t = 1 / 0, e = -1 / 0, n = this._getZoomSpan();
          for (var s in this._zoomBoundLayers) {
            var a = this._zoomBoundLayers[s].options;
            t = a.minZoom === void 0 ? t : Math.min(t, a.minZoom), e = a.maxZoom === void 0 ? e : Math.max(e, a.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Qt = ft.extend({
        initialize: function(t, e) {
          R(this, e), this._layers = {};
          var n, s;
          if (t)
            for (n = 0, s = t.length; n < s; n++)
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
          var e = Array.prototype.slice.call(arguments, 1), n, s;
          for (n in this._layers)
            s = this._layers[n], s[t] && s[t].apply(s, e);
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
          return u(t);
        }
      }), fa = function(t, e) {
        return new Qt(t, e);
      }, Et = Qt.extend({
        addLayer: function(t) {
          return this.hasLayer(t) ? this : (t.addEventParent(this), Qt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
        },
        removeLayer: function(t) {
          return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Qt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
          var t = new at();
          for (var e in this._layers) {
            var n = this._layers[e];
            t.extend(n.getBounds ? n.getBounds() : n.getLatLng());
          }
          return t;
        }
      }), ma = function(t, e) {
        return new Et(t, e);
      }, te = kt.extend({
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
          R(this, t);
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
          var s = this._createImg(n, e && e.tagName === "IMG" ? e : null);
          return this._setIconStyles(s, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), s;
        },
        _setIconStyles: function(t, e) {
          var n = this.options, s = n[e + "Size"];
          typeof s == "number" && (s = [s, s]);
          var a = I(s), h = I(e === "shadow" && n.shadowAnchor || n.iconAnchor || a && a.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (n.className || ""), h && (t.style.marginLeft = -h.x + "px", t.style.marginTop = -h.y + "px"), a && (t.style.width = a.x + "px", t.style.height = a.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return P.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function ga(t) {
        return new te(t);
      }
      var $e = te.extend({
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
          return typeof $e.imagePath != "string" && ($e.imagePath = this._detectIconPath()), (this.options.imagePath || $e.imagePath) + te.prototype._getIconUrl.call(this, t);
        },
        _stripUrl: function(t) {
          var e = function(n, s, a) {
            var h = s.exec(n);
            return h && h[a];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = Z("div", "leaflet-default-icon-path", document.body), e = ge(t, "background-image") || ge(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var n = document.querySelector('link[href$="leaflet.css"]');
          return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
        }
      }), ur = bt.extend({
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
          }, this).enable(), z(t, "leaflet-marker-draggable");
        },
        removeHooks: function() {
          this._draggable.off({
            dragstart: this._onDragStart,
            predrag: this._onPreDrag,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this).disable(), this._marker._icon && K(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(t) {
          var e = this._marker, n = e._map, s = this._marker.options.autoPanSpeed, a = this._marker.options.autoPanPadding, h = Zt(e._icon), p = n.getPixelBounds(), g = n.getPixelOrigin(), _ = st(
            p.min._subtract(g).add(a),
            p.max._subtract(g).subtract(a)
          );
          if (!_.contains(h)) {
            var x = I(
              (Math.max(_.max.x, h.x) - _.max.x) / (p.max.x - _.max.x) - (Math.min(_.min.x, h.x) - _.min.x) / (p.min.x - _.min.x),
              (Math.max(_.max.y, h.y) - _.max.y) / (p.max.y - _.max.y) - (Math.min(_.min.y, h.y) - _.min.y) / (p.min.y - _.min.y)
            ).multiplyBy(s);
            n.panBy(x, { animate: !1 }), this._draggable._newPos._add(x), this._draggable._startPos._add(x), J(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = rt(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (ht(this._panRequest), this._panRequest = rt(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, n = e._shadow, s = Zt(e._icon), a = e._map.layerPointToLatLng(s);
          n && J(n, s), e._latlng = a, t.latlng = a, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          ht(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
        }
      }), qe = ft.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new $e(),
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
          R(this, e), this._latlng = N(t);
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
          return this._latlng = N(t), this.update(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
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
          var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = t.icon.createIcon(this._icon), s = !1;
          n !== this._icon && (this._icon && this._removeIcon(), s = !0, t.title && (n.title = t.title), n.tagName === "IMG" && (n.alt = t.alt || "")), z(n, e), t.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && M(n, "focus", this._panOnFocus, this);
          var a = t.icon.createShadow(this._shadow), h = !1;
          a !== this._shadow && (this._removeShadow(), h = !0), a && (z(a, e), a.alt = ""), this._shadow = a, t.opacity < 1 && this._updateOpacity(), s && this.getPane().appendChild(this._icon), this._initInteraction(), a && h && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && q(this._icon, "focus", this._panOnFocus, this), G(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && G(this._shadow), this._shadow = null;
        },
        _setPos: function(t) {
          this._icon && J(this._icon, t), this._shadow && J(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(t) {
          this._icon && (this._icon.style.zIndex = this._zIndex + t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
          this._setPos(e);
        },
        _initInteraction: function() {
          if (this.options.interactive && (z(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), ur)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new ur(this), t && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(t) {
          return this.options.opacity = t, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var t = this.options.opacity;
          this._icon && dt(this._icon, t), this._shadow && dt(this._shadow, t);
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
            var e = this.options.icon.options, n = e.iconSize ? I(e.iconSize) : I(0, 0), s = e.iconAnchor ? I(e.iconAnchor) : I(0, 0);
            t.panInside(this._latlng, {
              paddingTopLeft: s,
              paddingBottomRight: n.subtract(s)
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
      function va(t, e) {
        return new qe(t, e);
      }
      var Mt = ft.extend({
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
          return R(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t && Object.prototype.hasOwnProperty.call(t, "weight") && this._updateBounds()), this;
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
      }), He = Mt.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(t, e) {
          R(this, e), this._latlng = N(t), this._radius = this.options.radius;
        },
        // @method setLatLng(latLng: LatLng): this
        // Sets the position of a circle marker to a new location.
        setLatLng: function(t) {
          var e = this._latlng;
          return this._latlng = N(t), this.redraw(), this.fire("move", { oldLatLng: e, latlng: this._latlng });
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
          return Mt.prototype.setStyle.call(this, t), this.setRadius(e), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var t = this._radius, e = this._radiusY || t, n = this._clickTolerance(), s = [t + n, e + n];
          this._pxBounds = new j(this._point.subtract(s), this._point.add(s));
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
      function _a(t, e) {
        return new He(t, e);
      }
      var Ki = He.extend({
        initialize: function(t, e, n) {
          if (typeof e == "number" && (e = l({}, n, { radius: e })), R(this, e), this._latlng = N(t), isNaN(this.options.radius))
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
          return new at(
            this._map.layerPointToLatLng(this._point.subtract(t)),
            this._map.layerPointToLatLng(this._point.add(t))
          );
        },
        setStyle: Mt.prototype.setStyle,
        _project: function() {
          var t = this._latlng.lng, e = this._latlng.lat, n = this._map, s = n.options.crs;
          if (s.distance === At.distance) {
            var a = Math.PI / 180, h = this._mRadius / At.R / a, p = n.project([e + h, t]), g = n.project([e - h, t]), _ = p.add(g).divideBy(2), x = n.unproject(_).lat, k = Math.acos((Math.cos(h * a) - Math.sin(e * a) * Math.sin(x * a)) / (Math.cos(e * a) * Math.cos(x * a))) / a;
            (isNaN(k) || k === 0) && (k = h / Math.cos(Math.PI / 180 * e)), this._point = _.subtract(n.getPixelOrigin()), this._radius = isNaN(k) ? 0 : _.x - n.project([x, t - k]).x, this._radiusY = _.y - p.y;
          } else {
            var S = s.unproject(s.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(S).x;
          }
          this._updateBounds();
        }
      });
      function ya(t, e, n) {
        return new Ki(t, e, n);
      }
      var Pt = Mt.extend({
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
          R(this, e), this._setLatLngs(t);
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
          for (var e = 1 / 0, n = null, s = we, a, h, p = 0, g = this._parts.length; p < g; p++)
            for (var _ = this._parts[p], x = 1, k = _.length; x < k; x++) {
              a = _[x - 1], h = _[x];
              var S = s(t, a, h, !0);
              S < e && (e = S, n = s(t, a, h));
            }
          return n && (n.distance = Math.sqrt(e)), n;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return dr(this._defaultShape(), this._map.options.crs);
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
          return e = e || this._defaultShape(), t = N(t), e.push(t), this._bounds.extend(t), this.redraw();
        },
        _setLatLngs: function(t) {
          this._bounds = new at(), this._latlngs = this._convertLatLngs(t);
        },
        _defaultShape: function() {
          return ct(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(t) {
          for (var e = [], n = ct(t), s = 0, a = t.length; s < a; s++)
            n ? (e[s] = N(t[s]), this._bounds.extend(e[s])) : e[s] = this._convertLatLngs(t[s]);
          return e;
        },
        _project: function() {
          var t = new j();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
        },
        _updateBounds: function() {
          var t = this._clickTolerance(), e = new C(t, t);
          this._rawPxBounds && (this._pxBounds = new j([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(t, e, n) {
          var s = t[0] instanceof U, a = t.length, h, p;
          if (s) {
            for (p = [], h = 0; h < a; h++)
              p[h] = this._map.latLngToLayerPoint(t[h]), n.extend(p[h]);
            e.push(p);
          } else
            for (h = 0; h < a; h++)
              this._projectLatlngs(t[h], e, n);
        },
        // clip polyline by renderer bounds so that we have less to render for performance
        _clipPoints: function() {
          var t = this._renderer._bounds;
          if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            var e = this._parts, n, s, a, h, p, g, _;
            for (n = 0, a = 0, h = this._rings.length; n < h; n++)
              for (_ = this._rings[n], s = 0, p = _.length; s < p - 1; s++)
                g = lr(_[s], _[s + 1], t, s, !0), g && (e[a] = e[a] || [], e[a].push(g[0]), (g[1] !== _[s + 1] || s === p - 2) && (e[a].push(g[1]), a++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var t = this._parts, e = this.options.smoothFactor, n = 0, s = t.length; n < s; n++)
            t[n] = sr(t[n], e);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t, e) {
          var n, s, a, h, p, g, _ = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (n = 0, h = this._parts.length; n < h; n++)
            for (g = this._parts[n], s = 0, p = g.length, a = p - 1; s < p; a = s++)
              if (!(!e && s === 0) && ar(t, g[a], g[s]) <= _)
                return !0;
          return !1;
        }
      });
      function ba(t, e) {
        return new Pt(t, e);
      }
      Pt._flat = hr;
      var ee = Pt.extend({
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
          return rr(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(t) {
          var e = Pt.prototype._convertLatLngs.call(this, t), n = e.length;
          return n >= 2 && e[0] instanceof U && e[0].equals(e[n - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          Pt.prototype._setLatLngs.call(this, t), ct(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return ct(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, n = new C(e, e);
          if (t = new j(t.min.subtract(n), t.max.add(n)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var s = 0, a = this._rings.length, h; s < a; s++)
              h = nr(this._rings[s], t, !0), h.length && this._parts.push(h);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, n, s, a, h, p, g, _, x;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (h = 0, _ = this._parts.length; h < _; h++)
            for (n = this._parts[h], p = 0, x = n.length, g = x - 1; p < x; g = p++)
              s = n[p], a = n[g], s.y > t.y != a.y > t.y && t.x < (a.x - s.x) * (t.y - s.y) / (a.y - s.y) + s.x && (e = !e);
          return e || Pt.prototype._containsPoint.call(this, t, !0);
        }
      });
      function xa(t, e) {
        return new ee(t, e);
      }
      var St = Et.extend({
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
          R(this, e), this._layers = {}, t && this.addData(t);
        },
        // @method addData( <GeoJSON> data ): this
        // Adds a GeoJSON object to the layer.
        addData: function(t) {
          var e = it(t) ? t : t.features, n, s, a;
          if (e) {
            for (n = 0, s = e.length; n < s; n++)
              a = e[n], (a.geometries || a.geometry || a.features || a.coordinates) && this.addData(a);
            return this;
          }
          var h = this.options;
          if (h.filter && !h.filter(t))
            return this;
          var p = je(t, h);
          return p ? (p.feature = Ve(t), p.defaultOptions = p.options, this.resetStyle(p), h.onEachFeature && h.onEachFeature(t, p), this.addLayer(p)) : this;
        },
        // @method resetStyle( <Path> layer? ): this
        // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
        // If `layer` is omitted, the style of all features in the current layer is reset.
        resetStyle: function(t) {
          return t === void 0 ? this.eachLayer(this.resetStyle, this) : (t.options = l({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this);
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
      function je(t, e) {
        var n = t.type === "Feature" ? t.geometry : t, s = n ? n.coordinates : null, a = [], h = e && e.pointToLayer, p = e && e.coordsToLatLng || Vi, g, _, x, k;
        if (!s && !n)
          return null;
        switch (n.type) {
          case "Point":
            return g = p(s), pr(h, t, g, e);
          case "MultiPoint":
            for (x = 0, k = s.length; x < k; x++)
              g = p(s[x]), a.push(pr(h, t, g, e));
            return new Et(a);
          case "LineString":
          case "MultiLineString":
            return _ = Ge(s, n.type === "LineString" ? 0 : 1, p), new Pt(_, e);
          case "Polygon":
          case "MultiPolygon":
            return _ = Ge(s, n.type === "Polygon" ? 1 : 2, p), new ee(_, e);
          case "GeometryCollection":
            for (x = 0, k = n.geometries.length; x < k; x++) {
              var S = je({
                geometry: n.geometries[x],
                type: "Feature",
                properties: t.properties
              }, e);
              S && a.push(S);
            }
            return new Et(a);
          case "FeatureCollection":
            for (x = 0, k = n.features.length; x < k; x++) {
              var O = je(n.features[x], e);
              O && a.push(O);
            }
            return new Et(a);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function pr(t, e, n, s) {
        return t ? t(e, n) : new qe(n, s && s.markersInheritOptions && s);
      }
      function Vi(t) {
        return new U(t[1], t[0], t[2]);
      }
      function Ge(t, e, n) {
        for (var s = [], a = 0, h = t.length, p; a < h; a++)
          p = e ? Ge(t[a], e - 1, n) : (n || Vi)(t[a]), s.push(p);
        return s;
      }
      function Ji(t, e) {
        return t = N(t), t.alt !== void 0 ? [D(t.lng, e), D(t.lat, e), D(t.alt, e)] : [D(t.lng, e), D(t.lat, e)];
      }
      function Ke(t, e, n, s) {
        for (var a = [], h = 0, p = t.length; h < p; h++)
          a.push(e ? Ke(t[h], ct(t[h]) ? 0 : e - 1, n, s) : Ji(t[h], s));
        return !e && n && a.length > 0 && a.push(a[0].slice()), a;
      }
      function ie(t, e) {
        return t.feature ? l({}, t.feature, { geometry: e }) : Ve(e);
      }
      function Ve(t) {
        return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        };
      }
      var Yi = {
        toGeoJSON: function(t) {
          return ie(this, {
            type: "Point",
            coordinates: Ji(this.getLatLng(), t)
          });
        }
      };
      qe.include(Yi), Ki.include(Yi), He.include(Yi), Pt.include({
        toGeoJSON: function(t) {
          var e = !ct(this._latlngs), n = Ke(this._latlngs, e ? 1 : 0, !1, t);
          return ie(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: n
          });
        }
      }), ee.include({
        toGeoJSON: function(t) {
          var e = !ct(this._latlngs), n = e && !ct(this._latlngs[0]), s = Ke(this._latlngs, n ? 2 : e ? 1 : 0, !0, t);
          return e || (s = [s]), ie(this, {
            type: (n ? "Multi" : "") + "Polygon",
            coordinates: s
          });
        }
      }), Qt.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(n) {
            e.push(n.toGeoJSON(t).geometry.coordinates);
          }), ie(this, {
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
          var n = e === "GeometryCollection", s = [];
          return this.eachLayer(function(a) {
            if (a.toGeoJSON) {
              var h = a.toGeoJSON(t);
              if (n)
                s.push(h.geometry);
              else {
                var p = Ve(h);
                p.type === "FeatureCollection" ? s.push.apply(s, p.features) : s.push(p);
              }
            }
          }), n ? ie(this, {
            geometries: s,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: s
          };
        }
      });
      function fr(t, e) {
        return new St(t, e);
      }
      var wa = fr, Je = ft.extend({
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
          this._url = t, this._bounds = V(e), R(this, n);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (z(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
        },
        onRemove: function() {
          G(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
          return this._bounds = V(t), this._map && this._reset(), this;
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
          var t = this._url.tagName === "IMG", e = this._image = t ? this._url : Z("img");
          if (z(e, "leaflet-image-layer"), this._zoomAnimated && z(e, "leaflet-zoom-animated"), this.options.className && z(e, this.options.className), e.onselectstart = b, e.onmousemove = b, e.onload = f(this.fire, this, "load"), e.onerror = f(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
            this._url = e.src;
            return;
          }
          e.src = this._url, e.alt = this.options.alt;
        },
        _animateZoom: function(t) {
          var e = this._map.getZoomScale(t.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
          Ft(this._image, n, e);
        },
        _reset: function() {
          var t = this._image, e = new j(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), n = e.getSize();
          J(t, e.min), t.style.width = n.x + "px", t.style.height = n.y + "px";
        },
        _updateOpacity: function() {
          dt(this._image, this.options.opacity);
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
      }), $a = function(t, e, n) {
        return new Je(t, e, n);
      }, mr = Je.extend({
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
          var t = this._url.tagName === "VIDEO", e = this._image = t ? this._url : Z("video");
          if (z(e, "leaflet-image-layer"), this._zoomAnimated && z(e, "leaflet-zoom-animated"), this.options.className && z(e, this.options.className), e.onselectstart = b, e.onmousemove = b, e.onloadeddata = f(this.fire, this, "load"), t) {
            for (var n = e.getElementsByTagName("source"), s = [], a = 0; a < n.length; a++)
              s.push(n[a].src);
            this._url = n.length > 0 ? s : [e.src];
            return;
          }
          it(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
          for (var h = 0; h < this._url.length; h++) {
            var p = Z("source");
            p.src = this._url[h], e.appendChild(p);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function ka(t, e, n) {
        return new mr(t, e, n);
      }
      var gr = Je.extend({
        _initImage: function() {
          var t = this._image = this._url;
          z(t, "leaflet-image-layer"), this._zoomAnimated && z(t, "leaflet-zoom-animated"), this.options.className && z(t, this.options.className), t.onselectstart = b, t.onmousemove = b;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function Ta(t, e, n) {
        return new gr(t, e, n);
      }
      var xt = ft.extend({
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
          t && (t instanceof U || it(t)) ? (this._latlng = N(t), R(this, e)) : (R(this, t), this._source = e), this.options.content && (this._content = this.options.content);
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
          this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && dt(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && dt(this._container, 1), this.bringToFront(), this.options.interactive && (z(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(t) {
          t._fadeAnimated ? (dt(this._container, 0), this._removeTimeout = setTimeout(f(G, void 0, this._container), 200)) : G(this._container), this.options.interactive && (K(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
          return this._latlng = N(t), this._map && (this._updatePosition(), this._adjustPan()), this;
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
          if (e instanceof Et) {
            e = null;
            var n = this._source._layers;
            for (var s in n)
              if (n[s]._map) {
                e = n[s];
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
            var t = this._map.latLngToLayerPoint(this._latlng), e = I(this.options.offset), n = this._getAnchor();
            this._zoomAnimated ? J(this._container, t.add(n)) : e = e.add(t).add(n);
            var s = this._containerBottom = -e.y, a = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = s + "px", this._container.style.left = a + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      B.include({
        _initOverlay: function(t, e, n, s) {
          var a = e;
          return a instanceof t || (a = new t(s).setContent(e)), n && a.setLatLng(n), a;
        }
      }), ft.include({
        _initOverlay: function(t, e, n, s) {
          var a = n;
          return a instanceof t ? (R(a, s), a._source = this) : (a = e && !s ? e : new t(s, this), a.setContent(n)), a;
        }
      });
      var Ye = xt.extend({
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
          return t = arguments.length ? t : this._source._map, !t.hasLayer(this) && t._popup && t._popup.options.autoClose && t.removeLayer(t._popup), t._popup = this, xt.prototype.openOn.call(this, t);
        },
        onAdd: function(t) {
          xt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Mt || this._source.on("preclick", Ut));
        },
        onRemove: function(t) {
          xt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Mt || this._source.off("preclick", Ut));
        },
        getEvents: function() {
          var t = xt.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
        },
        _initLayout: function() {
          var t = "leaflet-popup", e = this._container = Z(
            "div",
            t + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), n = this._wrapper = Z("div", t + "-content-wrapper", e);
          if (this._contentNode = Z("div", t + "-content", n), be(e), Fi(this._contentNode), M(e, "contextmenu", Ut), this._tipContainer = Z("div", t + "-tip-container", e), this._tip = Z("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var s = this._closeButton = Z("a", t + "-close-button", e);
            s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close popup"), s.href = "#close", s.innerHTML = '<span aria-hidden="true">&#215;</span>', M(s, "click", function(a) {
              et(a), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var n = t.offsetWidth;
          n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), e.width = n + 1 + "px", e.whiteSpace = "", e.height = "";
          var s = t.offsetHeight, a = this.options.maxHeight, h = "leaflet-popup-scrolled";
          a && s > a ? (e.height = a + "px", z(t, h)) : K(t, h), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), n = this._getAnchor();
          J(this._container, e.add(n));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var t = this._map, e = parseInt(ge(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + e, s = this._containerWidth, a = new C(this._containerLeft, -n - this._containerBottom);
            a._add(Zt(this._container));
            var h = t.layerPointToContainerPoint(a), p = I(this.options.autoPanPadding), g = I(this.options.autoPanPaddingTopLeft || p), _ = I(this.options.autoPanPaddingBottomRight || p), x = t.getSize(), k = 0, S = 0;
            h.x + s + _.x > x.x && (k = h.x + s - x.x + _.x), h.x - k - g.x < 0 && (k = h.x - g.x), h.y + n + _.y > x.y && (S = h.y + n - x.y + _.y), h.y - S - g.y < 0 && (S = h.y - g.y), (k || S) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([k, S]));
          }
        },
        _getAnchor: function() {
          return I(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), Ea = function(t, e) {
        return new Ye(t, e);
      };
      B.mergeOptions({
        closePopupOnClick: !0
      }), B.include({
        // @method openPopup(popup: Popup): this
        // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
        // @alternative
        // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
        // Creates a popup with the specified content and options and opens it in the given point on a map.
        openPopup: function(t, e, n) {
          return this._initOverlay(Ye, t, e, n).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(t) {
          return t = arguments.length ? t : this._popup, t && t.close(), this;
        }
      }), ft.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(t, e) {
          return this._popup = this._initOverlay(Ye, this._popup, t, e), this._popupHandlersAdded || (this.on({
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
          return this._popup && (this instanceof Et || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
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
            Wt(t);
            var e = t.layer || t.target;
            if (this._popup._source === e && !(e instanceof Mt)) {
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
      var Xe = xt.extend({
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
          xt.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
        },
        onRemove: function(t) {
          xt.prototype.onRemove.call(this, t), t.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
        },
        getEvents: function() {
          var t = xt.prototype.getEvents.call(this);
          return this.options.permanent || (t.preclick = this.close), t;
        },
        _initLayout: function() {
          var t = "leaflet-tooltip", e = t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
          this._contentNode = this._container = Z("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + u(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(t) {
          var e, n, s = this._map, a = this._container, h = s.latLngToContainerPoint(s.getCenter()), p = s.layerPointToContainerPoint(t), g = this.options.direction, _ = a.offsetWidth, x = a.offsetHeight, k = I(this.options.offset), S = this._getAnchor();
          g === "top" ? (e = _ / 2, n = x) : g === "bottom" ? (e = _ / 2, n = 0) : g === "center" ? (e = _ / 2, n = x / 2) : g === "right" ? (e = 0, n = x / 2) : g === "left" ? (e = _, n = x / 2) : p.x < h.x ? (g = "right", e = 0, n = x / 2) : (g = "left", e = _ + (k.x + S.x) * 2, n = x / 2), t = t.subtract(I(e, n, !0)).add(k).add(S), K(a, "leaflet-tooltip-right"), K(a, "leaflet-tooltip-left"), K(a, "leaflet-tooltip-top"), K(a, "leaflet-tooltip-bottom"), z(a, "leaflet-tooltip-" + g), J(a, t);
        },
        _updatePosition: function() {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function(t) {
          this.options.opacity = t, this._container && dt(this._container, t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
          this._setPosition(e);
        },
        _getAnchor: function() {
          return I(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), Pa = function(t, e) {
        return new Xe(t, e);
      };
      B.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, n) {
          return this._initOverlay(Xe, t, e, n).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(t) {
          return t.close(), this;
        }
      }), ft.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(t, e) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Xe, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
          return this._tooltip && (this instanceof Et || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
          e && (M(e, "focus", function() {
            this._tooltip._source = t, this.openTooltip();
          }, this), M(e, "blur", this.closeTooltip, this));
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
          var e = t.latlng, n, s;
          this._tooltip.options.sticky && t.originalEvent && (n = this._map.mouseEventToContainerPoint(t.originalEvent), s = this._map.containerPointToLayerPoint(n), e = this._map.layerPointToLatLng(s)), this._tooltip.setLatLng(e);
        }
      });
      var vr = te.extend({
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
          if (n.html instanceof Element ? (Ne(e), e.appendChild(n.html)) : e.innerHTML = n.html !== !1 ? n.html : "", n.bgPos) {
            var s = I(n.bgPos);
            e.style.backgroundPosition = -s.x + "px " + -s.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function Sa(t) {
        return new vr(t);
      }
      te.Default = $e;
      var ke = ft.extend({
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
          R(this, t);
        },
        onAdd: function() {
          this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
        },
        beforeAdd: function(t) {
          t._addZoomLimit(this);
        },
        onRemove: function(t) {
          this._removeAllTiles(), G(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
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
          for (var e = this.getPane().children, n = -t(-1 / 0, 1 / 0), s = 0, a = e.length, h; s < a; s++)
            h = e[s].style.zIndex, e[s] !== this._container && h && (n = t(n, +h));
          isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !P.ielt9) {
            dt(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, n = !1;
            for (var s in this._tiles) {
              var a = this._tiles[s];
              if (!(!a.current || !a.loaded)) {
                var h = Math.min(1, (t - a.loaded) / 200);
                dt(a.el, h), h < 1 ? e = !0 : (a.active ? n = !0 : this._onOpaqueTile(a), a.active = !0);
              }
            }
            n && !this._noPrune && this._pruneTiles(), e && (ht(this._fadeFrame), this._fadeFrame = rt(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: b,
        _initContainer: function() {
          this._container || (this._container = Z("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var t = this._tileZoom, e = this.options.maxZoom;
          if (t !== void 0) {
            for (var n in this._levels)
              n = Number(n), this._levels[n].el.children.length || n === t ? (this._levels[n].el.style.zIndex = e - Math.abs(t - n), this._onUpdateLevel(n)) : (G(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
            var s = this._levels[t], a = this._map;
            return s || (s = this._levels[t] = {}, s.el = Z("div", "leaflet-tile-container leaflet-zoom-animated", this._container), s.el.style.zIndex = e, s.origin = a.project(a.unproject(a.getPixelOrigin()), t).round(), s.zoom = t, this._setZoomTransform(s, a.getCenter(), a.getZoom()), b(s.el.offsetWidth), this._onCreateLevel(s)), this._level = s, s;
          }
        },
        _onUpdateLevel: b,
        _onRemoveLevel: b,
        _onCreateLevel: b,
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
            G(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(t, e, n, s) {
          var a = Math.floor(t / 2), h = Math.floor(e / 2), p = n - 1, g = new C(+a, +h);
          g.z = +p;
          var _ = this._tileCoordsToKey(g), x = this._tiles[_];
          return x && x.active ? (x.retain = !0, !0) : (x && x.loaded && (x.retain = !0), p > s ? this._retainParent(a, h, p, s) : !1);
        },
        _retainChildren: function(t, e, n, s) {
          for (var a = 2 * t; a < 2 * t + 2; a++)
            for (var h = 2 * e; h < 2 * e + 2; h++) {
              var p = new C(a, h);
              p.z = n + 1;
              var g = this._tileCoordsToKey(p), _ = this._tiles[g];
              if (_ && _.active) {
                _.retain = !0;
                continue;
              } else _ && _.loaded && (_.retain = !0);
              n + 1 < s && this._retainChildren(a, h, n + 1, s);
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
        _setView: function(t, e, n, s) {
          var a = Math.round(e);
          this.options.maxZoom !== void 0 && a > this.options.maxZoom || this.options.minZoom !== void 0 && a < this.options.minZoom ? a = void 0 : a = this._clampZoom(a);
          var h = this.options.updateWhenZooming && a !== this._tileZoom;
          (!s || h) && (this._tileZoom = a, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), a !== void 0 && this._update(t), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var n in this._levels)
            this._setZoomTransform(this._levels[n], t, e);
        },
        _setZoomTransform: function(t, e, n) {
          var s = this._map.getZoomScale(n, t.zoom), a = t.origin.multiplyBy(s).subtract(this._map._getNewPixelOrigin(e, n)).round();
          P.any3d ? Ft(t.el, a, s) : J(t.el, a);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, n = this._tileSize = this.getTileSize(), s = this._tileZoom, a = this._map.getPixelWorldBounds(this._tileZoom);
          a && (this._globalTileRange = this._pxBoundsToTileRange(a)), this._wrapX = e.wrapLng && !this.options.noWrap && [
            Math.floor(t.project([0, e.wrapLng[0]], s).x / n.x),
            Math.ceil(t.project([0, e.wrapLng[1]], s).x / n.y)
          ], this._wrapY = e.wrapLat && !this.options.noWrap && [
            Math.floor(t.project([e.wrapLat[0], 0], s).y / n.x),
            Math.ceil(t.project([e.wrapLat[1], 0], s).y / n.y)
          ];
        },
        _onMoveEnd: function() {
          !this._map || this._map._animatingZoom || this._update();
        },
        _getTiledPixelBounds: function(t) {
          var e = this._map, n = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), s = e.getZoomScale(n, this._tileZoom), a = e.project(t, this._tileZoom).floor(), h = e.getSize().divideBy(s * 2);
          return new j(a.subtract(h), a.add(h));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var n = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var s = this._getTiledPixelBounds(t), a = this._pxBoundsToTileRange(s), h = a.getCenter(), p = [], g = this.options.keepBuffer, _ = new j(
                a.getBottomLeft().subtract([g, -g]),
                a.getTopRight().add([g, -g])
              );
              if (!(isFinite(a.min.x) && isFinite(a.min.y) && isFinite(a.max.x) && isFinite(a.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var x in this._tiles) {
                var k = this._tiles[x].coords;
                (k.z !== this._tileZoom || !_.contains(new C(k.x, k.y))) && (this._tiles[x].current = !1);
              }
              if (Math.abs(n - this._tileZoom) > 1) {
                this._setView(t, n);
                return;
              }
              for (var S = a.min.y; S <= a.max.y; S++)
                for (var O = a.min.x; O <= a.max.x; O++) {
                  var nt = new C(O, S);
                  if (nt.z = this._tileZoom, !!this._isValidTile(nt)) {
                    var X = this._tiles[this._tileCoordsToKey(nt)];
                    X ? X.current = !0 : p.push(nt);
                  }
                }
              if (p.sort(function(ot, re) {
                return ot.distanceTo(h) - re.distanceTo(h);
              }), p.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var ut = document.createDocumentFragment();
                for (O = 0; O < p.length; O++)
                  this._addTile(p[O], ut);
                this._level.el.appendChild(ut);
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
          var s = this._tileCoordsToBounds(t);
          return V(this.options.bounds).overlaps(s);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, n = this.getTileSize(), s = t.scaleBy(n), a = s.add(n), h = e.unproject(s, t.z), p = e.unproject(a, t.z);
          return [h, p];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(t) {
          var e = this._tileCoordsToNwSe(t), n = new at(e[0], e[1]);
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
          e && (G(e.el), delete this._tiles[t], this.fire("tileunload", {
            tile: e.el,
            coords: this._keyToTileCoords(t)
          }));
        },
        _initTile: function(t) {
          z(t, "leaflet-tile");
          var e = this.getTileSize();
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = b, t.onmousemove = b, P.ielt9 && this.options.opacity < 1 && dt(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var n = this._getTilePos(t), s = this._tileCoordsToKey(t), a = this.createTile(this._wrapCoords(t), f(this._tileReady, this, t));
          this._initTile(a), this.createTile.length < 2 && rt(f(this._tileReady, this, t, null, a)), J(a, n), this._tiles[s] = {
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
          var s = this._tileCoordsToKey(t);
          n = this._tiles[s], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (dt(n.el, 0), ht(this._fadeFrame), this._fadeFrame = rt(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), e || (z(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: n.el,
            coords: t
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), P.ielt9 || !this._map._fadeAnimated ? rt(this._pruneTiles, this) : setTimeout(f(this._pruneTiles, this), 250)));
        },
        _getTilePos: function(t) {
          return t.scaleBy(this.getTileSize()).subtract(this._level.origin);
        },
        _wrapCoords: function(t) {
          var e = new C(
            this._wrapX ? T(t.x, this._wrapX) : t.x,
            this._wrapY ? T(t.y, this._wrapY) : t.y
          );
          return e.z = t.z, e;
        },
        _pxBoundsToTileRange: function(t) {
          var e = this.getTileSize();
          return new j(
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
      function Da(t) {
        return new ke(t);
      }
      var ne = ke.extend({
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
          this._url = t, e = R(this, e), e.detectRetina && P.retina && e.maxZoom > 0 ? (e.tileSize = Math.floor(e.tileSize / 2), e.zoomReverse ? (e.zoomOffset--, e.minZoom = Math.min(e.maxZoom, e.minZoom + 1)) : (e.zoomOffset++, e.maxZoom = Math.max(e.minZoom, e.maxZoom - 1)), e.minZoom = Math.max(0, e.minZoom)) : e.zoomReverse ? e.minZoom = Math.min(e.maxZoom, e.minZoom) : e.maxZoom = Math.max(e.minZoom, e.maxZoom), typeof e.subdomains == "string" && (e.subdomains = e.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
          return M(n, "load", f(this._tileOnLoad, this, e, n)), M(n, "error", f(this._tileOnError, this, e, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(t), n;
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
            var n = this._globalTileRange.max.y - t.y;
            this.options.tms && (e.y = n), e["-y"] = n;
          }
          return ce(this._url, l(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          P.ielt9 ? setTimeout(f(t, this, null, e), 0) : t(null, e);
        },
        _tileOnError: function(t, e, n) {
          var s = this.options.errorTileUrl;
          s && e.getAttribute("src") !== s && (e.src = s), t(n, e);
        },
        _onTileRemove: function(t) {
          t.tile.onload = null;
        },
        _getZoomForUrl: function() {
          var t = this._tileZoom, e = this.options.maxZoom, n = this.options.zoomReverse, s = this.options.zoomOffset;
          return n && (t = e - t), t + s;
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
              e.src = ze;
              var n = this._tiles[t].coords;
              G(e), delete this._tiles[t], this.fire("tileabort", {
                tile: e,
                coords: n
              });
            }
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          if (e)
            return e.el.setAttribute("src", ze), ke.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, n) {
          if (!(!this._map || n && n.getAttribute("src") === ze))
            return ke.prototype._tileReady.call(this, t, e, n);
        }
      });
      function _r(t, e) {
        return new ne(t, e);
      }
      var yr = ne.extend({
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
          var n = l({}, this.defaultWmsParams);
          for (var s in e)
            s in this.options || (n[s] = e[s]);
          e = R(this, e);
          var a = e.detectRetina && P.retina ? 2 : 1, h = this.getTileSize();
          n.width = h.x * a, n.height = h.y * a, this.wmsParams = n;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, ne.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), n = this._crs, s = st(n.project(e[0]), n.project(e[1])), a = s.min, h = s.max, p = (this._wmsVersion >= 1.3 && this._crs === cr ? [a.y, a.x, h.y, h.x] : [a.x, a.y, h.x, h.y]).join(","), g = ne.prototype.getTileUrl.call(this, t);
          return g + E(this.wmsParams, g, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + p;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return l(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function Ia(t, e) {
        return new yr(t, e);
      }
      ne.WMS = yr, _r.wms = Ia;
      var Dt = ft.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(t) {
          R(this, t), u(this), this._layers = this._layers || {};
        },
        onAdd: function() {
          this._container || (this._initContainer(), z(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
          var n = this._map.getZoomScale(e, this._zoom), s = this._map.getSize().multiplyBy(0.5 + this.options.padding), a = this._map.project(this._center, e), h = s.multiplyBy(-n).add(a).subtract(this._map._getNewPixelOrigin(t, e));
          P.any3d ? Ft(this._container, h, n) : J(this._container, h);
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
          this._bounds = new j(n, n.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), br = Dt.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var t = Dt.prototype.getEvents.call(this);
          return t.viewprereset = this._onViewPreReset, t;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          Dt.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var t = this._container = document.createElement("canvas");
          M(t, "mousemove", this._onMouseMove, this), M(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), M(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
        },
        _destroyContainer: function() {
          ht(this._redrawRequest), delete this._ctx, G(this._container), q(this._container), delete this._container;
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
            Dt.prototype._update.call(this);
            var t = this._bounds, e = this._container, n = t.getSize(), s = P.retina ? 2 : 1;
            J(e, t.min), e.width = s * n.x, e.height = s * n.y, e.style.width = n.x + "px", e.style.height = n.y + "px", P.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
          }
        },
        _reset: function() {
          Dt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
        },
        _initPath: function(t) {
          this._updateDashArray(t), this._layers[u(t)] = t;
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
          var e = t._order, n = e.next, s = e.prev;
          n ? n.prev = s : this._drawLast = s, s ? s.next = n : this._drawFirst = n, delete t._order, delete this._layers[u(t)], this._requestRedraw(t);
        },
        _updatePath: function(t) {
          this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
        },
        _updateStyle: function(t) {
          this._updateDashArray(t), this._requestRedraw(t);
        },
        _updateDashArray: function(t) {
          if (typeof t.options.dashArray == "string") {
            var e = t.options.dashArray.split(/[, ]+/), n = [], s, a;
            for (a = 0; a < e.length; a++) {
              if (s = Number(e[a]), isNaN(s))
                return;
              n.push(s);
            }
            t.options._dashArray = n;
          } else
            t.options._dashArray = t.options.dashArray;
        },
        _requestRedraw: function(t) {
          this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || rt(this._redraw, this));
        },
        _extendRedrawBounds: function(t) {
          if (t._pxBounds) {
            var e = (t.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new j(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
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
          for (var s = this._drawFirst; s; s = s.next)
            t = s.layer, (!e || t._pxBounds && t._pxBounds.intersects(e)) && t._updatePath();
          this._drawing = !1, this._ctx.restore();
        },
        _updatePoly: function(t, e) {
          if (this._drawing) {
            var n, s, a, h, p = t._parts, g = p.length, _ = this._ctx;
            if (g) {
              for (_.beginPath(), n = 0; n < g; n++) {
                for (s = 0, a = p[n].length; s < a; s++)
                  h = p[n][s], _[s ? "lineTo" : "moveTo"](h.x, h.y);
                e && _.closePath();
              }
              this._fillStroke(_, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, n = this._ctx, s = Math.max(Math.round(t._radius), 1), a = (Math.max(Math.round(t._radiusY), 1) || s) / s;
            a !== 1 && (n.save(), n.scale(1, a)), n.beginPath(), n.arc(e.x, e.y / a, s, 0, Math.PI * 2, !1), a !== 1 && n.restore(), this._fillStroke(n, t);
          }
        },
        _fillStroke: function(t, e) {
          var n = e.options;
          n.fill && (t.globalAlpha = n.fillOpacity, t.fillStyle = n.fillColor || n.color, t.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = n.opacity, t.lineWidth = n.weight, t.strokeStyle = n.color, t.lineCap = n.lineCap, t.lineJoin = n.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), n, s, a = this._drawFirst; a; a = a.next)
            n = a.layer, n.options.interactive && n._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(n)) && (s = n);
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
          e && (K(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var n, s, a = this._drawFirst; a; a = a.next)
              n = a.layer, n.options.interactive && n._containsPoint(e) && (s = n);
            s !== this._hoveredLayer && (this._handleMouseOut(t), s && (z(this._container, "leaflet-interactive"), this._fireEvent([s], t, "mouseover"), this._hoveredLayer = s)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(f(function() {
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
            var n = e.next, s = e.prev;
            if (n)
              n.prev = s;
            else
              return;
            s ? s.next = n : n && (this._drawFirst = n), e.prev = this._drawLast, this._drawLast.next = e, e.next = null, this._drawLast = e, this._requestRedraw(t);
          }
        },
        _bringToBack: function(t) {
          var e = t._order;
          if (e) {
            var n = e.next, s = e.prev;
            if (s)
              s.next = n;
            else
              return;
            n ? n.prev = s : s && (this._drawLast = s), e.prev = null, e.next = this._drawFirst, this._drawFirst.prev = e, this._drawFirst = e, this._requestRedraw(t);
          }
        }
      });
      function xr(t) {
        return P.canvas ? new br(t) : null;
      }
      var Te = (function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
            return document.createElement("<lvml:" + t + ' class="lvml">');
          };
        } catch {
        }
        return function(t) {
          return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })(), La = {
        _initContainer: function() {
          this._container = Z("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (Dt.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(t) {
          var e = t._container = Te("shape");
          z(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = Te("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[u(t)] = t;
        },
        _addPath: function(t) {
          var e = t._container;
          this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
        },
        _removePath: function(t) {
          var e = t._container;
          G(e), t.removeInteractiveTarget(e), delete this._layers[u(t)];
        },
        _updateStyle: function(t) {
          var e = t._stroke, n = t._fill, s = t.options, a = t._container;
          a.stroked = !!s.stroke, a.filled = !!s.fill, s.stroke ? (e || (e = t._stroke = Te("stroke")), a.appendChild(e), e.weight = s.weight + "px", e.color = s.color, e.opacity = s.opacity, s.dashArray ? e.dashStyle = it(s.dashArray) ? s.dashArray.join(" ") : s.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = s.lineCap.replace("butt", "flat"), e.joinstyle = s.lineJoin) : e && (a.removeChild(e), t._stroke = null), s.fill ? (n || (n = t._fill = Te("fill")), a.appendChild(n), n.color = s.fillColor || s.color, n.opacity = s.fillOpacity) : n && (a.removeChild(n), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), n = Math.round(t._radius), s = Math.round(t._radiusY || n);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + n + "," + s + " 0," + 65535 * 360);
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
      }, Qe = P.vml ? Te : Tn, Ee = Dt.extend({
        _initContainer: function() {
          this._container = Qe("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Qe("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          G(this._container), q(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            Dt.prototype._update.call(this);
            var t = this._bounds, e = t.getSize(), n = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, n.setAttribute("width", e.x), n.setAttribute("height", e.y)), J(n, t.min), n.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(t) {
          var e = t._path = Qe("path");
          t.options.className && z(e, t.options.className), t.options.interactive && z(e, "leaflet-interactive"), this._updateStyle(t), this._layers[u(t)] = t;
        },
        _addPath: function(t) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
        },
        _removePath: function(t) {
          G(t._path), t.removeInteractiveTarget(t._path), delete this._layers[u(t)];
        },
        _updatePath: function(t) {
          t._project(), t._update();
        },
        _updateStyle: function(t) {
          var e = t._path, n = t.options;
          e && (n.stroke ? (e.setAttribute("stroke", n.color), e.setAttribute("stroke-opacity", n.opacity), e.setAttribute("stroke-width", n.weight), e.setAttribute("stroke-linecap", n.lineCap), e.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? e.setAttribute("stroke-dasharray", n.dashArray) : e.removeAttribute("stroke-dasharray"), n.dashOffset ? e.setAttribute("stroke-dashoffset", n.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), n.fill ? (e.setAttribute("fill", n.fillColor || n.color), e.setAttribute("fill-opacity", n.fillOpacity), e.setAttribute("fill-rule", n.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
        },
        _updatePoly: function(t, e) {
          this._setPath(t, En(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, n = Math.max(Math.round(t._radius), 1), s = Math.max(Math.round(t._radiusY), 1) || n, a = "a" + n + "," + s + " 0 1,0 ", h = t._empty() ? "M0 0" : "M" + (e.x - n) + "," + e.y + a + n * 2 + ",0 " + a + -n * 2 + ",0 ";
          this._setPath(t, h);
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
      P.vml && Ee.include(La);
      function wr(t) {
        return P.svg || P.vml ? new Ee(t) : null;
      }
      B.include({
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
          return this.options.preferCanvas && xr(t) || wr(t);
        }
      });
      var $r = ee.extend({
        initialize: function(t, e) {
          ee.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(t) {
          return this.setLatLngs(this._boundsToLatLngs(t));
        },
        _boundsToLatLngs: function(t) {
          return t = V(t), [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast()
          ];
        }
      });
      function Aa(t, e) {
        return new $r(t, e);
      }
      Ee.create = Qe, Ee.pointsToPath = En, St.geometryToLayer = je, St.coordsToLatLng = Vi, St.coordsToLatLngs = Ge, St.latLngToCoords = Ji, St.latLngsToCoords = Ke, St.getFeature = ie, St.asFeature = Ve, B.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var kr = bt.extend({
        initialize: function(t) {
          this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
        },
        addHooks: function() {
          M(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          q(this._container, "mousedown", this._onMouseDown, this);
        },
        moved: function() {
          return this._moved;
        },
        _destroy: function() {
          G(this._pane), delete this._pane;
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
          this._clearDeferredResetState(), this._resetState(), ve(), Ai(), this._startPoint = this._map.mouseEventToContainerPoint(t), M(document, {
            contextmenu: Wt,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(t) {
          this._moved || (this._moved = !0, this._box = Z("div", "leaflet-zoom-box", this._container), z(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
          var e = new j(this._point, this._startPoint), n = e.getSize();
          J(this._box, e.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
        },
        _finish: function() {
          this._moved && (G(this._box), K(this._container, "leaflet-crosshair")), _e(), Ci(), q(document, {
            contextmenu: Wt,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(t) {
          if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(f(this._resetState, this), 0);
            var e = new at(
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
      B.addInitHook("addHandler", "boxZoom", kr), B.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var Tr = bt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, n = e.getZoom(), s = e.options.zoomDelta, a = t.originalEvent.shiftKey ? n - s : n + s;
          e.options.doubleClickZoom === "center" ? e.setZoom(a) : e.setZoomAround(t.containerPoint, a);
        }
      });
      B.addInitHook("addHandler", "doubleClickZoom", Tr), B.mergeOptions({
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
      var Er = bt.extend({
        addHooks: function() {
          if (!this._draggable) {
            var t = this._map;
            this._draggable = new Ct(t._mapPane, t._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
          }
          z(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
        },
        removeHooks: function() {
          K(this._map._container, "leaflet-grab"), K(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
            var e = V(this._map.options.maxBounds);
            this._offsetLimit = st(
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
          var t = this._worldWidth, e = Math.round(t / 2), n = this._initialWorldOffset, s = this._draggable._newPos.x, a = (s - e + n) % t + e - n, h = (s + e + n) % t - e - n, p = Math.abs(a + n) < Math.abs(h + n) ? a : h;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = p;
        },
        _onDragEnd: function(t) {
          var e = this._map, n = e.options, s = !n.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), s)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var a = this._lastPos.subtract(this._positions[0]), h = (this._lastTime - this._times[0]) / 1e3, p = n.easeLinearity, g = a.multiplyBy(p / h), _ = g.distanceTo([0, 0]), x = Math.min(n.inertiaMaxSpeed, _), k = g.multiplyBy(x / _), S = x / (n.inertiaDeceleration * p), O = k.multiplyBy(-S / 2).round();
            !O.x && !O.y ? e.fire("moveend") : (O = e._limitOffset(O, e.options.maxBounds), rt(function() {
              e.panBy(O, {
                duration: S,
                easeLinearity: p,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      B.addInitHook("addHandler", "dragging", Er), B.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var Pr = bt.extend({
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
          t.tabIndex <= 0 && (t.tabIndex = "0"), M(t, {
            focus: this._onFocus,
            blur: this._onBlur,
            mousedown: this._onMouseDown
          }, this), this._map.on({
            focus: this._addHooks,
            blur: this._removeHooks
          }, this);
        },
        removeHooks: function() {
          this._removeHooks(), q(this._map._container, {
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
            var t = document.body, e = document.documentElement, n = t.scrollTop || e.scrollTop, s = t.scrollLeft || e.scrollLeft;
            this._map._container.focus(), window.scrollTo(s, n);
          }
        },
        _onFocus: function() {
          this._focused = !0, this._map.fire("focus");
        },
        _onBlur: function() {
          this._focused = !1, this._map.fire("blur");
        },
        _setPanDelta: function(t) {
          var e = this._panKeys = {}, n = this.keyCodes, s, a;
          for (s = 0, a = n.left.length; s < a; s++)
            e[n.left[s]] = [-1 * t, 0];
          for (s = 0, a = n.right.length; s < a; s++)
            e[n.right[s]] = [t, 0];
          for (s = 0, a = n.down.length; s < a; s++)
            e[n.down[s]] = [0, t];
          for (s = 0, a = n.up.length; s < a; s++)
            e[n.up[s]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, n = this.keyCodes, s, a;
          for (s = 0, a = n.zoomIn.length; s < a; s++)
            e[n.zoomIn[s]] = t;
          for (s = 0, a = n.zoomOut.length; s < a; s++)
            e[n.zoomOut[s]] = -t;
        },
        _addHooks: function() {
          M(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          q(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, n = this._map, s;
            if (e in this._panKeys) {
              if (!n._panAnim || !n._panAnim._inProgress)
                if (s = this._panKeys[e], t.shiftKey && (s = I(s).multiplyBy(3)), n.options.maxBounds && (s = n._limitOffset(I(s), n.options.maxBounds)), n.options.worldCopyJump) {
                  var a = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(s)));
                  n.panTo(a);
                } else
                  n.panBy(s);
            } else if (e in this._zoomKeys)
              n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
            else if (e === 27 && n._popup && n._popup.options.closeOnEscapeKey)
              n.closePopup();
            else
              return;
            Wt(t);
          }
        }
      });
      B.addInitHook("addHandler", "keyboard", Pr), B.mergeOptions({
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
      var Sr = bt.extend({
        addHooks: function() {
          M(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          q(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = Xn(t), n = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var s = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(f(this._performZoom, this), s), Wt(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), n = this._map.options.zoomSnap || 0;
          t._stop();
          var s = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), a = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(s)))) / Math.LN2, h = n ? Math.ceil(a / n) * n : a, p = t._limitZoom(e + (this._delta > 0 ? h : -h)) - e;
          this._delta = 0, this._startTime = null, p && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + p) : t.setZoomAround(this._lastMousePos, e + p));
        }
      });
      B.addInitHook("addHandler", "scrollWheelZoom", Sr);
      var Ca = 600;
      B.mergeOptions({
        // @section Touch interaction options
        // @option tapHold: Boolean
        // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
        tapHold: P.touchNative && P.safari && P.mobile,
        // @option tapTolerance: Number = 15
        // The max number of pixels a user can shift his finger during touch
        // for it to be considered a valid tap.
        tapTolerance: 15
      });
      var Dr = bt.extend({
        addHooks: function() {
          M(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          q(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(t) {
          if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
            var e = t.touches[0];
            this._startPos = this._newPos = new C(e.clientX, e.clientY), this._holdTimeout = setTimeout(f(function() {
              this._cancel(), this._isTapValid() && (M(document, "touchend", et), M(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
            }, this), Ca), M(document, "touchend touchcancel contextmenu", this._cancel, this), M(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function t() {
          q(document, "touchend", et), q(document, "touchend touchcancel", t);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), q(document, "touchend touchcancel contextmenu", this._cancel, this), q(document, "touchmove", this._onMove, this);
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
      B.addInitHook("addHandler", "tapHold", Dr), B.mergeOptions({
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
      var Ir = bt.extend({
        addHooks: function() {
          z(this._map._container, "leaflet-touch-zoom"), M(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          K(this._map._container, "leaflet-touch-zoom"), q(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var n = e.mouseEventToContainerPoint(t.touches[0]), s = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(n.add(s)._divideBy(2))), this._startDist = n.distanceTo(s), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), M(document, "touchmove", this._onTouchMove, this), M(document, "touchend touchcancel", this._onTouchEnd, this), et(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, n = e.mouseEventToContainerPoint(t.touches[0]), s = e.mouseEventToContainerPoint(t.touches[1]), a = n.distanceTo(s) / this._startDist;
            if (this._zoom = e.getScaleZoom(a, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && a < 1 || this._zoom > e.getMaxZoom() && a > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, a === 1)
                return;
            } else {
              var h = n._add(s)._divideBy(2)._subtract(this._centerPoint);
              if (a === 1 && h.x === 0 && h.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(h), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), ht(this._animRequest);
            var p = f(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = rt(p, this, !0), et(t);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, ht(this._animRequest), q(document, "touchmove", this._onTouchMove, this), q(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      B.addInitHook("addHandler", "touchZoom", Ir), B.BoxZoom = kr, B.DoubleClickZoom = Tr, B.Drag = Er, B.Keyboard = Pr, B.ScrollWheelZoom = Sr, B.TapHold = Dr, B.TouchZoom = Ir, r.Bounds = j, r.Browser = P, r.CRS = Tt, r.Canvas = br, r.Circle = Ki, r.CircleMarker = He, r.Class = kt, r.Control = pt, r.DivIcon = vr, r.DivOverlay = xt, r.DomEvent = Ys, r.DomUtil = Vs, r.Draggable = Ct, r.Evented = ue, r.FeatureGroup = Et, r.GeoJSON = St, r.GridLayer = ke, r.Handler = bt, r.Icon = te, r.ImageOverlay = Je, r.LatLng = U, r.LatLngBounds = at, r.Layer = ft, r.LayerGroup = Qt, r.LineUtil = da, r.Map = B, r.Marker = qe, r.Mixin = ra, r.Path = Mt, r.Point = C, r.PolyUtil = sa, r.Polygon = ee, r.Polyline = Pt, r.Popup = Ye, r.PosAnimation = Qn, r.Projection = ca, r.Rectangle = $r, r.Renderer = Dt, r.SVG = Ee, r.SVGOverlay = gr, r.TileLayer = ne, r.Tooltip = Xe, r.Transformation = bi, r.Util = vs, r.VideoOverlay = mr, r.bind = f, r.bounds = st, r.canvas = xr, r.circle = ya, r.circleMarker = _a, r.control = xe, r.divIcon = Sa, r.extend = l, r.featureGroup = ma, r.geoJSON = fr, r.geoJson = wa, r.gridLayer = Da, r.icon = ga, r.imageOverlay = $a, r.latLng = N, r.latLngBounds = V, r.layerGroup = fa, r.map = Xs, r.marker = va, r.point = I, r.polygon = xa, r.polyline = ba, r.popup = Ea, r.rectangle = Aa, r.setOptions = R, r.stamp = u, r.svg = wr, r.svgOverlay = Ta, r.tileLayer = _r, r.tooltip = Pa, r.transformation = pe, r.version = o, r.videoOverlay = ka;
      var Ma = window.L;
      r.noConflict = function() {
        return window.L = Ma, this;
      }, window.L = r;
    }));
  })(Se, Se.exports)), Se.exports;
}
var mt = rl();
const sl = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function al(d) {
  return [...d].sort((i, r) => {
    const o = i.started_at ? Date.parse(i.started_at) : Number.POSITIVE_INFINITY, l = r.started_at ? Date.parse(r.started_at) : Number.POSITIVE_INFINITY;
    return o !== l ? o - l : i.id.localeCompare(r.id);
  });
}
const Qr = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], ol = sl.replace(/\s+/g, " ").trim();
function si(d, i) {
  return typeof d == "number" && typeof i == "number" && Number.isFinite(d) && Number.isFinite(i) && d >= -90 && d <= 90 && i >= -180 && i <= 180;
}
function hn(d) {
  return si(d?.latitude, d?.longitude);
}
class fs extends Bt {
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
    const r = i.detail;
    r?.vehicleId !== this.vehicleId || r.tripId === this.selectedTripId || (this.selectedTripId = r.tripId, this.selectedDriveIds = [], this.driveSelectionInitialized = !1, this.refresh(!0));
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(wt, this.onActiveTripChanged), this.driveSectionsOpen = typeof window < "u" && window.matchMedia("(min-width: 700px)").matches, this.refresh(!0);
  }
  disconnectedCallback() {
    this.map?.remove(), this.map = void 0, this.tileLayer = void 0, window.removeEventListener(wt, this.onActiveTripChanged), super.disconnectedCallback();
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
        const r = await fi(this.hass);
        this.vehicleName = r.find((u) => u.vehicle_id === this.vehicleId)?.name ?? "";
        const o = await Nt(this.hass, this.vehicleId);
        this.mapConfig = o.map_config, this.trips = o.trips;
        const l = this.config.trip_id ?? "", c = mi(this.vehicleId);
        l && this.trips.some((u) => u.id === l) ? this.selectedTripId = l : c && this.trips.some((u) => u.id === c) && (this.selectedTripId = c), (!this.selectedTripId || !this.trips.some((u) => u.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((u) => u.status === "active")?.id ?? this.trips[0]?.id ?? ""), this.selectedTripId && !l && Rt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" });
        const f = this.selectedTripId ? await Nt(this.hass, this.vehicleId, this.selectedTripId) : o;
        this.mapConfig = f.map_config ?? this.mapConfig, this.drives = al(f.drives), this.places = f.stops ?? [];
        const y = new Set(this.drives.map((u) => u.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((u) => y.has(u)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((u) => u.id), this.driveSelectionInitialized = !0), this.data = await wo(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
      } catch {
        this.error = w(this.hass).loadError, this.data = void 0;
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
    this.map || (this.map = mt.map(i, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5)), this.map.off("click", this.onMapClick), this.addPlaceMode && this.map.on("click", this.onMapClick);
    const r = this.config, o = r.tile_url ?? this.mapConfig?.tile_url ?? void 0, l = r.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (o && !this.tileError && !this.tileLayer) {
      const y = l || (o.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = mt.tileLayer(o, { maxZoom: 19, attribution: y }).on("tileerror", () => {
        this.tileError = !0, this.tileLayer?.remove(), this.tileLayer = void 0, this.requestUpdate();
      }).addTo(this.map);
    }
    for (const y of this.layers) y.remove();
    this.layers = [];
    const c = mt.latLngBounds([]), f = w(this.hass);
    for (const [y, u] of (this.data?.segments ?? []).entries()) {
      const v = [];
      let T = [];
      for (const $ of u.points)
        hn($) ? T.push($) : T.length && (v.push(T), T = []);
      if (T.length && v.push(T), !v.length) continue;
      const b = this.drives.findIndex(($) => $.id === u.drive_id), D = this.driveColor(b >= 0 ? b : y);
      for (const $ of v) {
        const A = $.map((H) => mt.latLng(H.latitude, H.longitude));
        A.length > 1 && this.layers.push(mt.polyline(A, { color: D, weight: 4, opacity: 0.85 }).addTo(this.map)), A.forEach((H) => c.extend(H));
        const R = mt.circleMarker(A[0], { radius: 6, color: D, fillOpacity: 1 }).bindTooltip(f.mapStart).bindPopup(this.endpointPopup(f.mapStart, $[0])).addTo(this.map), E = mt.circleMarker(A[A.length - 1], { radius: 6, color: "#111", fillColor: D, fillOpacity: 1 }).bindTooltip(f.mapEnd).bindPopup(this.endpointPopup(f.mapEnd, $[$.length - 1])).addTo(this.map);
        this.layers.push(R, E);
      }
      for (const $ of u.gaps) {
        const A = v.find((H) => H.length);
        if (!A) continue;
        const R = mt.latLng(A[Math.max(0, Math.floor(A.length / 2))].latitude, A[Math.max(0, Math.floor(A.length / 2))].longitude), E = mt.circleMarker(R, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${f.mapGap}: ${$.seconds}s`).addTo(this.map);
        this.layers.push(E);
      }
    }
    for (const y of this.places) {
      if (!this.showPlaces || y.confirmed === !1 || !si(y.latitude, y.longitude)) continue;
      const u = y.latitude, v = y.longitude, T = ["campsite", "rv_site", "wild_camp", "overnight"].includes(y.place_kind || y.place_type || y.stop_type), b = mt.circleMarker([u, v], { radius: T ? 9 : 7, color: T ? "#7b1fa2" : "#455a64", fillColor: T ? "#ce93d8" : "#90a4ae", fillOpacity: 0.95, weight: 2 }), D = y.rating_overall ? ` · ${y.rating_overall}/5` : "", $ = document.createElement("div"), A = document.createElement("strong");
      A.textContent = y.name || "Ort", $.append(A, document.createElement("br")), $.append(document.createTextNode(`${y.place_type || y.stop_type}${D}`), document.createElement("br")), $.append(document.createTextNode(y.description || "")), b.bindPopup($), b.addTo(this.map), this.layers.push(b), c.extend([u, v]);
    }
    if (this.draftPoint && si(this.draftPoint.latitude, this.draftPoint.longitude)) {
      const y = this.draftPoint.latitude, u = this.draftPoint.longitude, v = mt.circleMarker([y, u], { radius: 10, color: "#f57c00", fillColor: "#ffcc80", fillOpacity: 0.9, weight: 3 }).bindTooltip(f.mapAddPlace ?? "Ort hinzufügen").addTo(this.map);
      this.layers.push(v), c.extend([y, u]);
    }
    if (this.fitMapPending && c.isValid()) {
      const y = this.map;
      setTimeout(() => {
        !this.map || this.map !== y || !c.isValid() || (this.map.invalidateSize({ pan: !1 }), this.fitMapPending && (this.map.fitBounds(c.pad(0.08), { animate: !1, maxZoom: 15 }), this.fitMapPending = !1));
      }, 0);
    } else
      setTimeout(() => this.map?.invalidateSize({ pan: !1 }), 0);
  }
  onMapClick = (i) => {
    if (!this.addPlaceMode) return;
    const r = this.nearestRoutePoint(i.latlng.lat, i.latlng.lng);
    this.draftPoint = { latitude: i.latlng.lat, longitude: i.latlng.lng, recorded_at: r?.recorded_at }, !this.draftArrived && r?.recorded_at && (this.draftArrived = this.localDateTime(r.recorded_at)), this.requestUpdate(), this.queueMapRender();
  };
  endpointPopup(i, r) {
    const o = document.createElement("div");
    o.append(document.createTextNode(`${i}: ${W(r.recorded_at, this.hass)}`), document.createElement("br"));
    const l = document.createElement("button");
    return l.type = "button", l.textContent = w(this.hass).mapAddPlace ?? "Ort hinzufügen", l.addEventListener("click", () => this.startMapPlace(r.latitude, r.longitude, r.recorded_at)), o.append(l), o;
  }
  startMapPlace(i, r, o) {
    this.addPlaceMode = !0, this.draftPoint = { latitude: i, longitude: r, recorded_at: o }, !this.draftArrived && o && (this.draftArrived = this.localDateTime(o)), this.requestUpdate(), this.queueMapRender();
  }
  nearestRoutePoint(i, r) {
    return (this.data?.segments ?? []).flatMap((l) => l.points).filter(hn).reduce((l, c) => {
      if (!l) return c;
      const f = (c.latitude - i) ** 2 + (c.longitude - r) ** 2, y = (l.latitude - i) ** 2 + (l.longitude - r) ** 2;
      return f < y ? c : l;
    }, void 0);
  }
  localDateTime(i) {
    const r = new Date(i), o = (l) => String(l).padStart(2, "0");
    return `${r.getFullYear()}-${o(r.getMonth() + 1)}-${o(r.getDate())}T${o(r.getHours())}:${o(r.getMinutes())}`;
  }
  toggleAddPlace() {
    this.addPlaceMode = !this.addPlaceMode, this.addPlaceMode || (this.draftPoint = void 0, this.draftName = "", this.draftArrived = "", this.draftDescription = ""), this.requestUpdate(), this.queueMapRender();
  }
  async saveDraftPlace() {
    if (!(!this.hass || !this.selectedTripId || !this.draftPoint || !this.draftName.trim() || !this.draftArrived || this.draftSaving)) {
      this.draftSaving = !0;
      try {
        await cs(this.hass, this.vehicleId, this.selectedTripId, {
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
        this.error = w(this.hass).placeSaveError ?? w(this.hass).loadError;
      } finally {
        this.draftSaving = !1, this.requestUpdate();
      }
    }
  }
  driveColor(i) {
    return Qr[i % Qr.length];
  }
  selectedTrip() {
    return this.trips.find((i) => i.id === this.selectedTripId);
  }
  selectedDrives() {
    return this.drives.filter((i) => this.selectedDriveIds.includes(i.id));
  }
  async selectTrip(i) {
    this.selectedTripId = i.currentTarget.value, Rt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" }), this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh(!0);
  }
  async toggleDrive(i) {
    const r = i.currentTarget;
    this.selectedDriveIds = r.checked ? [.../* @__PURE__ */ new Set([...this.selectedDriveIds, r.value])] : this.selectedDriveIds.filter((o) => o !== r.value), await this.refresh(!0);
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
  driveRow(i, r) {
    const o = w(this.hass), l = i.source === "manual" ? o.sourceManual : i.source === "gpx" ? o.sourceGpx ?? o.sourceGps : o.sourceGps;
    return m`<label class="drive-row" style=${`--drive-color:${this.driveColor(r)}`}>
      <input type="checkbox" value=${i.id} .checked=${this.selectedDriveIds.includes(i.id)} @change=${(c) => {
      this.toggleDrive(c);
    }}>
      <span class="drive-info"><strong>${ae(i.started_at, this.hass)} · ${hi(i.started_at, this.hass)} → ${i.ended_at ? `${ae(i.ended_at, this.hass)} · ${hi(i.ended_at, this.hass)}` : "–"}</strong><span>${Ot(i.distance_m / 1e3, 1, this.hass)} km · ${i.duration_seconds ? It(i.duration_seconds, this.hass) : "–"} · ${l}</span></span>
    </label>`;
  }
  renderPlaceCapture(i, r) {
    return r ? this.addPlaceMode ? this.draftPoint ? m`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${i.mapPlaceHint}</p><form class="form-grid" @submit=${(o) => {
      o.preventDefault(), this.saveDraftPlace();
    }}><input aria-label=${i.placeName ?? "Name"} placeholder=${i.placeName ?? "Name"} .value=${this.draftName} @input=${(o) => this.draftName = o.currentTarget.value} required><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.draftType} @change=${(o) => this.draftType = o.currentTarget.value}><option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option></select><label>${i.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.draftArrived} @input=${(o) => this.draftArrived = o.currentTarget.value} required></label><textarea aria-label=${i.placeDescription ?? "Beschreibung"} placeholder=${i.placeDescription ?? "Beschreibung"} .value=${this.draftDescription} @input=${(o) => this.draftDescription = o.currentTarget.value}></textarea><button type="submit" ?disabled=${this.draftSaving}>${this.draftSaving ? i.saving : i.save}</button></form></section>` : m`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${i.mapPlaceHint}</p></section>` : m`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapAddPlace ?? "Ort hinzufügen"}</button></section>` : "";
  }
  render() {
    const i = w(this.hass), r = this.config, o = this.selectedTrip(), l = this.selectedDrives(), c = l.reduce((v, T) => v + T.distance_m, 0) / 1e3, f = r.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0, y = (this.data?.segments ?? []).some((v) => v.points.some(hn)), u = this.showPlaces && this.places.some((v) => v.confirmed !== !1 && si(v.latitude, v.longitude));
    return m`<ha-card>
      <header class="map-header">
        <div><h2>${i.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || i.mapVehicle}</p></div>
        ${this.trips.length && !r.trip_id ? m`<label class="trip-picker"><span>${i.mapTrip}</span><select @change=${(v) => {
      this.selectTrip(v);
    }} .value=${this.selectedTripId}>${this.trips.map((v) => m`<option value=${v.id}>${v.title}</option>`)}</select></label>` : ""}
      </header>
      ${o ? m`<div class="metrics" aria-label=${i.mapTrip}>
        <div class="metric"><span>${i.mapTotalDistance}</span><strong>${Ot(c, 1, this.hass)} km</strong></div>
        <div class="metric"><span>${i.mapSelectedDrives}</span><strong>${l.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${i.mapTripPeriod}</span><strong>${go(o, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? m`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(v) => this.onDriveSectionsToggle(v)}>
        <summary><span>${i.mapDriveSegments}</span><span class="summary-count">${l.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => {
      this.selectAllDrives();
    }}>${i.mapSelectAll}</button><button class="secondary" type="button" @click=${() => {
      this.selectNoDrives();
    }}>${i.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((v, T) => this.driveRow(v, T))}</div>
      </details>` : ""}
      <label class="place-filter"><input type="checkbox" .checked=${this.showPlaces} @change=${(v) => {
      this.showPlaces = v.currentTarget.checked, this.queueMapRender(), this.requestUpdate();
    }}> ${i.mapPlaces ?? "Orte anzeigen"}</label>
      ${this.renderPlaceCapture(i, o)}
      ${this.error ? m`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? m`<p class="error" role="alert">${w(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !r.tile_url && !this.mapConfig?.tile_url ? m`<p class="muted" role="status">${w(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? m`<p class="muted">${i.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !y ? m`<p class="muted" role="status">${u ? i.mapNoRouteWithPlaces ?? "No valid GPS route is available; saved places are shown." : i.mapNoValidPoints ?? "No valid GPS points are available for this trip."}</p>` : ""}
      <div class="map" role="img" aria-label=${i.mapRouteImageAlt}></div>
      ${f ? m`<p class="attribution">${f}</p>` : ""}
      ${this.loading ? m`<p class="muted">${i.loading}</p>` : ""}
    </ha-card>`;
  }
}
fs.styles = [Bt.styles, is(ol), vt`
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
pi("camper-travel-journal-map-card", fs);
const ms = [
  "overview",
  "drives",
  "stays",
  "expenses",
  "map",
  "gpx",
  "pdf",
  "tankbook"
], ll = [
  "overview",
  "drives",
  "stays",
  "expenses",
  "map",
  "gpx",
  "pdf"
];
function pn(d) {
  return Array.isArray(d) ? [...new Set(d.filter(
    (i) => typeof i == "string" && ms.includes(i)
  ))] : [];
}
function le(d, i) {
  const r = pn(d), o = pn(i), l = r.length ? r : o;
  return [...l, ...ms.filter((c) => !l.includes(c))];
}
function ai(d) {
  return Array.isArray(d) ? pn(d) : [...ll];
}
function di(d, i) {
  const r = new Set(ai(d));
  return le(i, d).filter((o) => r.has(o));
}
function hl(d, i, r, o) {
  const l = le(d, r), c = le(i, o);
  return l.length === c.length && l.every((f, y) => f === c[y]);
}
function dl(d, i, r, o) {
  const l = di(d, r), c = di(i, o);
  return l.length === c.length && l.every((f, y) => f === c[y]);
}
const ts = /* @__PURE__ */ new Set(["campsite", "rv_site", "wild_camp", "overnight"]);
class gs extends Bt {
  overview;
  detail;
  openTripId = "";
  selectedTripId = "";
  loading = !1;
  error = "";
  onActiveTripChanged = (i) => {
    const r = i.detail;
    r?.vehicleId !== this.vehicleId || !r.tripId || r.tripId === this.openTripId || this.openTripId && this.openTrip(r.tripId);
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
  deletingDrive;
  driveDeleting = !1;
  overviewRequest = 0;
  detailRequest = 0;
  tankbook;
  fuelExpenses = [];
  fuelImportDialogOpen = !1;
  tankbookExpenseId = "";
  tankbookEditingId = "";
  tankbookSaving = !1;
  tankbookForm = { occurred_at: "", fuel_type: "diesel", liters: "", price_per_liter: "", amount_minor: "", odometer_km: "", fill_level: "unknown", station: "", note: "" };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(wt, this.onActiveTripChanged), window.addEventListener(Ce, this.onTravelDataChanged), this.refreshOverview();
  }
  disconnectedCallback() {
    window.removeEventListener(wt, this.onActiveTripChanged), window.removeEventListener(Ce, this.onTravelDataChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refreshOverview();
  }
  onConfigChanged() {
    this.closeTrip(!1), this.tankbook = void 0, this.refreshOverview();
  }
  updated() {
    const i = this.renderRoot.querySelector("dialog.interruption-dialog");
    i && (this.interruptionDialog && !i.open && i.showModal(), !this.interruptionDialog && i.open && i.close());
    const r = this.renderRoot.querySelector("dialog.drive-delete-dialog");
    r && (this.deletingDrive && !r.open && r.showModal(), !this.deletingDrive && r.open && r.close());
    const o = this.renderRoot.querySelector("dialog.fuel-import-dialog");
    o && (this.fuelImportDialogOpen && !o.open && o.showModal(), !this.fuelImportDialogOpen && o.open && o.close());
  }
  async refreshOverview() {
    if (!this.hass || !this.vehicleId) return !1;
    const i = ++this.overviewRequest;
    this.loading = !0, this.error = "", this.requestUpdate();
    try {
      const r = await Nt(this.hass, this.vehicleId);
      if (i !== this.overviewRequest) return !1;
      this.overview = r, this.openTripId && !r.trips.some((l) => l.id === this.openTripId) && (this.openTripId = "", this.detail = void 0, Kr(this.vehicleId, "journal"));
      try {
        this.vehicleName = (await fi(this.hass)).find((l) => l.vehicle_id === this.vehicleId)?.name ?? "";
      } catch {
        this.vehicleName = "";
      }
      const o = mi(this.vehicleId);
      return this.selectedTripId = this.overview.trips.some((l) => l.id === (this.openTripId || o)) ? this.openTripId || o : "", this.openTripId && this.overview.trips.some((l) => l.id === this.openTripId) && await this.loadDetail(this.openTripId), !0;
    } catch {
      return i === this.overviewRequest && (this.error = w(this.hass).loadError), !1;
    } finally {
      i === this.overviewRequest && (this.loading = !1, this.requestUpdate());
    }
  }
  async loadDetail(i) {
    if (!this.hass || !i) return;
    const r = ++this.detailRequest, o = await Nt(this.hass, this.vehicleId, i), l = this.tankbookEnabled() ? await ni(this.hass, this.vehicleId) : void 0;
    r === this.detailRequest && this.openTripId === i && (this.detail = o, this.tankbook = l);
  }
  tankbookEnabled() {
    return di(this.config.modules, this.config.module_order).includes("tankbook");
  }
  editTankEvent(i) {
    this.tankbookEditingId = i.id, this.tankbookExpenseId = i.expense_id ?? "", this.tankbookForm = { occurred_at: i.occurred_at.slice(0, 16), fuel_type: i.fuel_type, liters: String(i.liters), price_per_liter: i.price_per_liter == null ? "" : String(i.price_per_liter), amount_minor: i.amount_minor == null ? "" : String(i.amount_minor / 100), odometer_km: i.odometer_km == null ? "" : String(i.odometer_km), fill_level: i.fill_level, station: i.station ?? "", note: i.note ?? "" }, this.requestUpdate();
  }
  resetTankEventForm() {
    this.tankbookEditingId = "", this.tankbookExpenseId = "", this.tankbookForm = { occurred_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 16), fuel_type: "diesel", liters: "", price_per_liter: "", amount_minor: "", odometer_km: "", fill_level: "unknown", station: "", note: "" };
  }
  async saveTankEvent() {
    if (!this.hass || this.tankbookSaving || !this.tankbookForm.occurred_at) return;
    this.tankbookSaving = !0, this.requestUpdate();
    const i = ii(this.tankbookForm.liters), r = this.tankbookForm.price_per_liter ? ii(this.tankbookForm.price_per_liter) : null, o = this.tankbookForm.amount_minor ? ii(this.tankbookForm.amount_minor) : null, l = this.tankbookForm.odometer_km ? ii(this.tankbookForm.odometer_km) : null;
    if (i === null || i <= 0 || this.tankbookForm.price_per_liter && r === null || this.tankbookForm.amount_minor && o === null || this.tankbookForm.odometer_km && l === null) {
      this.tankbookSaving = !1, this.error = w(this.hass).amountInvalid, this.requestUpdate();
      return;
    }
    const c = { occurred_at: new Date(this.tankbookForm.occurred_at).toISOString(), fuel_type: this.tankbookForm.fuel_type, liters: i, fill_level: this.tankbookForm.fill_level, price_per_liter: r ?? void 0, amount_minor: o == null ? void 0 : Math.round(o * 100), odometer_km: l ?? void 0, station: this.tankbookForm.station.trim() || void 0, note: this.tankbookForm.note.trim() || void 0, expense_id: this.tankbookExpenseId || void 0 };
    try {
      this.tankbookEditingId ? await jo(this.hass, this.vehicleId, this.tankbookEditingId, c) : await Ho(this.hass, this.vehicleId, c), this.tankbook = await ni(this.hass, this.vehicleId), this.resetTankEventForm();
    } catch (f) {
      this.error = f instanceof Error ? f.message : w(this.hass).loadError;
    } finally {
      this.tankbookSaving = !1, this.requestUpdate();
    }
  }
  async openFuelImportDialog() {
    if (!(!this.hass || this.fuelImportDialogOpen)) {
      this.fuelImportDialogOpen = !0, this.fuelExpenses = [], this.requestUpdate();
      try {
        this.fuelExpenses = await qo(this.hass, this.vehicleId);
      } catch (i) {
        this.error = i instanceof Error ? i.message : w(this.hass).loadError, this.fuelImportDialogOpen = !1;
      } finally {
        this.requestUpdate();
      }
    }
  }
  closeFuelImportDialog() {
    this.fuelImportDialogOpen = !1, this.requestUpdate();
  }
  importFuelExpense(i) {
    const r = i.occurred_on || i.occurred_at.slice(0, 10), o = i.occurred_time || i.occurred_at.slice(11, 16);
    this.tankbookExpenseId = i.id, this.tankbookForm = { occurred_at: `${r}T${o}`, fuel_type: "other", liters: i.fuel_liters == null ? "" : String(i.fuel_liters), price_per_liter: i.fuel_price_per_liter == null ? "" : String(i.fuel_price_per_liter), amount_minor: String(i.amount_minor / 100), odometer_km: i.odometer_km == null ? "" : String(i.odometer_km), fill_level: "unknown", station: "", note: i.note ?? "" }, this.closeFuelImportDialog();
  }
  async unlinkTankEventLink(i) {
    if (!(!this.hass || !i.expense_id || !window.confirm("Verknüpfung zwischen Kosten und Tankbuch wirklich lösen?")))
      try {
        await Ko(this.hass, this.vehicleId, i.id), this.tankbook = await ni(this.hass, this.vehicleId), this.tankbookExpenseId = "", this.requestUpdate();
      } catch (r) {
        this.error = r instanceof Error ? r.message : w(this.hass).loadError, this.requestUpdate();
      }
  }
  async removeTankEvent(i) {
    if (!(!this.hass || !window.confirm(`Tankvorgang vom ${W(i.occurred_at, this.hass)} löschen?`)))
      try {
        await Go(this.hass, this.vehicleId, i.id), this.tankbook = await ni(this.hass, this.vehicleId), this.tankbookEditingId === i.id && this.resetTankEventForm(), this.requestUpdate();
      } catch (r) {
        this.error = r instanceof Error ? r.message : w(this.hass).loadError, this.requestUpdate();
      }
  }
  async openTrip(i = this.selectedTripId) {
    if (!(!i || !this.overview?.trips.some((r) => r.id === i))) {
      this.loading = !0, this.error = "", this.openTripId = i, this.selectedTripId = i;
      try {
        await this.loadDetail(i), Rt({ vehicleId: this.vehicleId, tripId: i, source: "journal" });
      } catch {
        this.error = w(this.hass).loadError, this.openTripId = "";
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  closeTrip(i = !0) {
    this.openTripId = "", this.detail = void 0, Kr(this.vehicleId, "journal"), this.requestUpdate();
  }
  openDriveDeleteDialog(i) {
    this.driveDeleting || (this.deletingDrive = i, this.requestUpdate());
  }
  closeDriveDeleteDialog() {
    this.driveDeleting || (this.deletingDrive = void 0, this.requestUpdate());
  }
  async confirmDriveDelete() {
    if (!this.hass || !this.deletingDrive || this.driveDeleting || !this.openTripId) return;
    const i = this.deletingDrive;
    this.driveDeleting = !0, this.requestUpdate();
    try {
      if (await ds(this.hass, this.vehicleId, i.id), this.deletingDrive = void 0, !await this.refreshOverview()) throw new Error("refresh_failed");
      Q({ vehicleId: this.vehicleId, tripId: this.openTripId });
    } catch {
      this.error = w(this.hass).driveDeleteError ?? w(this.hass).loadError;
    } finally {
      this.driveDeleting = !1, this.requestUpdate();
    }
  }
  trip() {
    return this.overview?.trips.find((i) => i.id === this.openTripId) ?? this.detail?.trips.find((i) => i.id === this.openTripId);
  }
  async onTripCreated(i) {
    const r = i.detail?.tripId;
    await this.refreshOverview(), r && await this.openTrip(r);
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
          await cn(this.hass, this.vehicleId, this.openTripId, i.id, this.interruptionAction, this.interruptionPlaceId);
        else {
          if (!this.interruptionName.trim()) throw new Error("place_name_required");
          await us(this.hass, this.vehicleId, this.openTripId, i.id, { name: this.interruptionName.trim(), place_type: this.interruptionType, overnight: this.interruptionAction === "overnight", address: this.interruptionAddress.trim(), description: this.interruptionDescription.trim(), website_url: this.interruptionWebsite.trim() || void 0 });
        }
      else
        await cn(this.hass, this.vehicleId, this.openTripId, i.id, this.interruptionAction);
      if (!await this.refreshOverview()) {
        this.error = "Aufenthalt gespeichert, aber die Reiseübersicht konnte nicht aktualisiert werden. Bitte später erneut laden.", this.interruptionSaving = !1, this.requestUpdate();
        return;
      }
      this.closeInterruptionDialog();
    } catch (r) {
      const o = r instanceof Error ? r.message : "", l = {
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
      this.error = o === "place_name_required" ? "Bitte einen Namen eingeben." : `Aufenthalt konnte nicht gespeichert werden${l[o] ? `: ${l[o]}` : ". Bitte Eingaben prüfen und erneut versuchen."}`, this.interruptionSaving = !1, this.requestUpdate();
    }
  }
  section(i, r, o, l, c = !1) {
    return m`<section class="journal-section"><details ?open=${c} @toggle=${(f) => this.onSectionToggle(f)}><summary><span class="section-title"><span aria-hidden="true">${r}</span><strong>${i}</strong></span>${o === void 0 ? "" : m`<span class="count">${o}</span>`}</summary><div class="section-content">${l}</div></details></section>`;
  }
  onSectionToggle(i) {
    const r = i.currentTarget;
    r.open && this.shadowRoot?.querySelectorAll(".journal-section details").forEach((o) => {
      o !== r && (o.open = !1);
    });
  }
  renderTankbook(i) {
    const r = this.tankbook?.events ?? [], o = this.tankbook?.consumption?.intervals?.diesel ?? [], l = (this.hass?.locale?.language ?? "").toLowerCase().startsWith("en"), c = (u) => u === "measured" ? "gemessen" : u === "estimated" ? "geschätzt" : u === "incomplete" ? "unvollständig" : "nicht berechenbar", f = (u) => l ? u === "odometer" ? "Distance from odometer" : u === "gps_drives" ? "Distance from GPS drives" : u === "gps_drives_incomplete" ? "GPS drives · incomplete coverage" : "No GPS driving distance" : u === "odometer" ? "Strecke aus Kilometerständen" : u === "gps_drives" ? "Strecke aus GPS-Fahrten" : u === "gps_drives_incomplete" ? "GPS-Fahrten · Abdeckung unvollständig" : "Keine GPS-Fahrstrecke", y = (u) => l ? u === "measured" ? "measured" : u === "estimated" ? "estimated" : u === "incomplete" ? "incomplete" : "not calculable" : c(u);
    return m`<div class="tankbook"><form class="form-grid tankbook-form" @submit=${(u) => {
      u.preventDefault(), this.saveTankEvent();
    }}><div class="actions full-width"><button type="button" class="secondary" @click=${() => {
      this.openFuelImportDialog();
    }}>Aus Kosten übernehmen</button>${this.tankbookExpenseId ? m`<span class="muted">Aus Kosten übernommen</span>` : ""}</div><label>Datum/Zeit<input type="datetime-local" .value=${this.tankbookForm.occurred_at} @input=${(u) => this.tankbookForm.occurred_at = u.currentTarget.value} required></label><label>Betriebsstoff<select .value=${this.tankbookForm.fuel_type} @change=${(u) => this.tankbookForm.fuel_type = u.currentTarget.value}><option value="diesel">Diesel</option><option value="adblue">AdBlue</option><option value="other">Sonstiges</option></select></label><label>Liter<input type="text" inputmode="decimal" .value=${this.tankbookForm.liters} @input=${(u) => this.tankbookForm.liters = u.currentTarget.value} required></label><label>Füllstand<select .value=${this.tankbookForm.fill_level} @change=${(u) => this.tankbookForm.fill_level = u.currentTarget.value}><option value="full">Volltankung</option><option value="partial">Teilbetankung</option><option value="unknown">Unbekannt</option></select></label><label>Kilometerstand<input type="text" inputmode="decimal" .value=${this.tankbookForm.odometer_km} @input=${(u) => this.tankbookForm.odometer_km = u.currentTarget.value}></label><label>Preis/Liter<input type="text" inputmode="decimal" .value=${this.tankbookForm.price_per_liter} @input=${(u) => this.tankbookForm.price_per_liter = u.currentTarget.value}></label><label>Gesamtbetrag €<input type="text" inputmode="decimal" .value=${this.tankbookForm.amount_minor} @input=${(u) => this.tankbookForm.amount_minor = u.currentTarget.value}></label><label>Tankstelle<input .value=${this.tankbookForm.station} @input=${(u) => this.tankbookForm.station = u.currentTarget.value}></label><label class="full-width">Bemerkung<textarea .value=${this.tankbookForm.note} @input=${(u) => this.tankbookForm.note = u.currentTarget.value}></textarea></label><div class="actions full-width"><button type="submit" ?disabled=${this.tankbookSaving}>${this.tankbookEditingId ? "Tankvorgang aktualisieren" : "Tankvorgang hinzufügen"}</button>${this.tankbookEditingId ? m`<button type="button" class="secondary" @click=${() => {
      this.resetTankEventForm(), this.requestUpdate();
    }}>Abbrechen</button>` : ""}</div></form><p class="muted">Tankausgaben werden nicht automatisch als neue Kosten gebucht. Heizungsverbrauch: unbekannt, solange keine belastbaren Webasto-Daten hinterlegt sind.</p>${o.map((u) => {
      const v = fo(u.note, this.hass, u.combined_l_per_100km != null);
      return m`<article class="tankbook-interval"><strong>${u.combined_l_per_100km == null ? l ? "Consumption not reliably calculable" : "Verbrauch nicht zuverlässig berechenbar" : `${l ? "Estimated combined consumption" : "Geschätzter kombinierter Verbrauch"}: ${Ot(u.combined_l_per_100km, 2, this.hass)} l/100 km`}</strong><span>${f(u.distance_source)} · ${y(u.quality)}</span><span>${l ? "Measured diesel quantity" : "Gemessene Dieselmenge"}: ${Ot(u.liters, 3, this.hass)} l · ${u.distance_km == null ? l ? "No sufficient GPS distance" : "Keine ausreichende GPS-Strecke" : `${l ? "Distance" : "Strecke"}: ${Ot(u.distance_km, 1, this.hass)} km`} · ${u.heater_quality === "unknown" ? l ? "Heating consumption unknown" : "Heizungsverbrauch unbekannt" : l ? "Heating consumption estimated" : "Heizungsverbrauch geschätzt"}</span>${v ? m`<span class="muted">${v.prefix}: ${v.text}</span>` : ""}</article>`;
    })}<div class="tankbook-events">${r.map((u) => m`<article class="tankbook-event"><div><strong>${u.fuel_type === "diesel" ? "Diesel" : u.fuel_type === "adblue" ? "AdBlue" : "Sonstiges"} · ${Ot(u.liters, 3, this.hass)} l</strong><span>${W(u.occurred_at, this.hass)} · ${u.fill_level === "full" ? "Volltankung" : u.fill_level === "partial" ? "Teilbetankung" : "Füllstand unbekannt"}</span><span>${u.odometer_km == null ? "Kilometerstand fehlt" : `${Ot(u.odometer_km, 1, this.hass)} km`}${u.amount_minor == null ? " · Belegbetrag fehlt" : ` · ${gt(u.amount_minor, "EUR", this.hass)}`}</span>${u.expense_id ? m`<span>Aus Kosten übernommen</span>` : ""}</div><span class="actions"><button type="button" class="secondary" data-action="edit" @click=${() => this.editTankEvent(u)}>Bearbeiten</button>${u.expense_id ? m`<button type="button" class="secondary" data-action="unlink" @click=${() => {
      this.unlinkTankEventLink(u);
    }}>Verknüpfung lösen</button>` : ""}<button type="button" class="danger" data-action="delete" @click=${() => {
      this.removeTankEvent(u);
    }}>Löschen</button></span></article>`)}</div>${this.renderFuelImportDialog()}</div>`;
  }
  renderFuelImportDialog() {
    return m`<dialog class="fuel-import-dialog" @cancel=${(i) => {
      i.preventDefault(), this.closeFuelImportDialog();
    }}><form @submit=${(i) => i.preventDefault()}><h3>Aus Kosten übernehmen</h3><p class="muted">Vorhandene Kraftstoffausgaben des Fahrzeugs. Bereits übernommene Einträge sind sichtbar, aber nicht erneut auswählbar.</p><div class="fuel-expense-list">${this.fuelExpenses.length ? this.fuelExpenses.map((i) => m`<article><div><strong>${i.occurred_on || i.occurred_at.slice(0, 10)}${i.occurred_time ? ` · ${i.occurred_time}` : ""}</strong><span>${i.fuel_liters == null ? "Liter fehlen" : `${i.fuel_liters.toFixed(3)} l`} · ${i.fuel_price_per_liter == null ? "Literpreis fehlt" : `${i.fuel_price_per_liter.toFixed(3)} €/l`} · ${(i.amount_minor / 100).toFixed(2)} €</span><span>${i.note || ""}${i.tank_event_id ? " · Bereits übernommen" : ""}</span></div><button type="button" ?disabled=${!!i.tank_event_id} @click=${() => this.importFuelExpense(i)}>${i.tank_event_id ? "Bereits übernommen" : "Übernehmen"}</button></article>`) : m`<p class="muted">Keine Kraftstoffausgaben gefunden.</p>`}</div><div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeFuelImportDialog()}>Abbrechen</button></div></form></dialog>`;
  }
  renderModule(i, r, o, l, c) {
    const f = {
      overview: [r.journalOverview ?? "Trip overview", "▣"],
      drives: [r.journalDrives ?? "Drives and interruptions", "↔"],
      stays: [r.placesAndStays ?? "Places & stays", "●"],
      expenses: [r.expenses, "€"],
      map: [r.mapTitle ?? "Travel map", "⌖"],
      gpx: [r.gpxImport, "⇧"],
      pdf: [r.pdfExportTitle, "▤"],
      tankbook: [r.module_tankbook ?? "Fuel log", "⛽"]
    }, [y, u] = f[i];
    if (i === "tankbook") return this.section(y, u, c[i], this.renderTankbook(r));
    const v = l;
    return this.section(y, u, c[i], v[i]);
  }
  renderDriveDeleteDialog(i) {
    const r = this.deletingDrive, o = mo(this.hass);
    return m`<dialog class="drive-delete-dialog" @cancel=${(l) => {
      l.preventDefault(), this.closeDriveDeleteDialog();
    }}><form method="dialog" @submit=${(l) => {
      l.preventDefault(), this.confirmDriveDelete();
    }}><h3>${o.title}</h3>${r ? m`<p>${o.question}</p><dl><dt>${o.date}</dt><dd>${W(r.started_at, this.hass)}${r.ended_at ? ` → ${W(r.ended_at, this.hass)}` : ""}</dd><dt>${i.distance}</dt><dd>${(r.distance_m / 1e3).toFixed(1)} km</dd></dl><p class="muted">${o.effects}</p>` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeDriveDeleteDialog()}>${i.cancel}</button><button type="submit" class="danger" ?disabled=${this.driveDeleting}>${this.driveDeleting ? i.saving : o.confirm}</button></div></form></dialog>`;
  }
  renderPicker(i) {
    const r = this.overview?.trips ?? [];
    return m`<section class="entry" aria-label=${i.journalSelect ?? "Reise auswählen"}><label class="picker-label">${i.journalSelect ?? "Reise auswählen"}<select aria-label=${i.journalSelect ?? "Reise auswählen"} .value=${this.selectedTripId} ?disabled=${!r.length || this.loading} @change=${(o) => {
      this.selectedTripId = o.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.journalChoose ?? "Bitte auswählen …"}</option>${r.map((o) => m`<option value=${o.id}>${o.title} · ${Kt(o.status, this.hass)} · ${Lt(o, this.hass)}</option>`)}</select></label><div class="actions"><button type="button" @click=${() => {
      this.openTrip();
    }} ?disabled=${!this.selectedTripId || this.loading}>${i.journalOpen ?? "Reise öffnen"}</button><button type="button" class="secondary" @click=${() => this.openTripCreateDialog()}>${i.newTrip}</button></div><camper-travel-journal-manager-card .config=${{ vehicle_id: this.vehicleId, journal_section: "trip-create" }} .hass=${this.hass} @trip-created=${(o) => {
      this.onTripCreated(o);
    }}></camper-travel-journal-manager-card></section>`;
  }
  renderOpenTrip(i, r) {
    const o = this.detail, l = (o?.stops ?? []).filter((E) => E.confirmed !== !1), c = l.filter((E) => ts.has(E.place_kind || E.place_type || E.stop_type)), f = (o?.drives ?? []).reduce((E, H) => E + H.distance_m, 0) / 1e3, y = o?.expense_summary, u = y?.mixed_currency ? i.mixedCurrency : y?.total_minor !== void 0 && y.currency ? gt(y.total_minor, y.currency, this.hass) : gt(0, "EUR", this.hass), v = (E) => m`<camper-travel-journal-manager-card .config=${{ vehicle_id: this.vehicleId, trip_id: r.id, journal_section: E }} .hass=${this.hass}></camper-travel-journal-manager-card>`, T = m`<camper-travel-journal-map-card .config=${{ vehicle_id: this.vehicleId, trip_id: r.id }} .hass=${this.hass}></camper-travel-journal-map-card>`, b = o?.interruptions ?? [], D = [...o?.drives ?? []].sort((E, H) => E.started_at.localeCompare(H.started_at)).flatMap((E) => {
      const H = b.find((it) => it.previous_drive_id === E.id), ce = (o?.stops ?? []).find((it) => it.id === H?.existing_place_id);
      return [m`<article class="drive-item"><div class="drive-heading"><strong>${i.drive ?? "Fahrt"}</strong><button type="button" class="drive-delete-icon" aria-label=${i.driveDelete ?? "Fahrt löschen"} title=${i.driveDelete ?? "Fahrt löschen"} ?disabled=${this.driveDeleting} @click=${() => this.openDriveDeleteDialog(E)}>🗑️</button></div><span>${W(E.started_at, this.hass)} → ${E.ended_at ? W(E.ended_at, this.hass) : i.notAvailable ?? "Nicht verfügbar"}</span><span>${(E.distance_m / 1e3).toFixed(1)} km · ${E.duration_seconds ? It(E.duration_seconds, this.hass) : "–"} · ${E.source === "gpx" ? i.sourceGpx ?? "GPX-importiert" : E.source === "manual" ? i.sourceManual : i.sourceGps}</span></article>`, ...H ? [m`<article class="interruption-item"><strong>${H.status === "pause" ? i.drivePause ?? "Fahrtpause" : H.status === "ignored" ? i.interruptionIgnored ?? "Ignoriert" : ce ? `${i.assignedStay ?? "Aufenthalt"}: ${ce.name}` : i.interruptionUnassigned ?? "Nicht zugeordnet"}</strong><span>${W(H.started_at, this.hass)} → ${W(H.ended_at, this.hass)} · ${It(H.duration_seconds, this.hass)}</span>${H.status === "unassigned" ? m`<button type="button" class="compact-action" @click=${() => this.openInterruptionDialog(H)}>${i.assignStay ?? "Aufenthalt zuordnen"}</button>` : ""}</article>`] : []];
    }), $ = {
      overview: m`<div class="metric-grid"><div><span>${i.distance}</span><strong>${f.toFixed(1)} km</strong></div><div><span>${i.drives}</span><strong>${o?.drives.length ?? 0}</strong></div><div><span>${i.stops}</span><strong>${l.filter((E) => !ts.has(E.place_kind || E.place_type || E.stop_type)).length}</strong></div><div><span>${i.overnights ?? "Übernachtungsplätze"}</span><strong>${c.length}</strong></div><div><span>${i.costs}</span><strong>${u}</strong></div></div>`,
      drives: m`${D.length ? D : m`<p class="muted">${i.noDrives ?? "Keine Fahrten erfasst."}</p>`}`,
      stays: m`<p class="muted">${i.journalStopsHint ?? "Bestätigte Aufenthalte dieser Reise."}</p>${v("places")}`,
      expenses: m`${v("expenses")}`,
      map: T,
      gpx: m`${v("gpx")}`,
      pdf: m`${v("pdf")}`,
      tankbook: this.renderTankbook(i)
    }, A = di(this.config.modules, this.config.module_order), R = {
      drives: (o?.drives.length ?? 0) + b.length,
      stays: l.length,
      expenses: o?.expenses?.length ?? 0,
      tankbook: this.tankbook?.events.length ?? 0
    };
    return m`<header class="trip-header"><div><p class="eyebrow">${i.journalOpenTrip ?? "Geöffnete Reise"}</p><h2>${r.title}</h2><p class="muted">${r.destination || i.noDestination} · ${Lt(r, this.hass)} · ${Kt(r.status, this.hass)}${this.vehicleName ? ` · ${this.vehicleName}` : ""}</p><div class="trip-management" @trip-switch=${() => this.closeTrip()}>${v("trip-actions")}</div></div></header>
      ${A.map((E) => this.renderModule(E, i, r, $, R))}
      ${this.error ? m`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading ? m`<p class="muted" role="status">${i.loading}</p>` : ""}
      <dialog class="interruption-dialog" @cancel=${(E) => {
      E.preventDefault(), this.closeInterruptionDialog();
    }}><form method="dialog" @submit=${(E) => {
      E.preventDefault(), this.saveInterruption();
    }}><h3>${i.assignStay ?? "Aufenthalt zuordnen"}</h3><p class="muted">${this.interruptionDialog ? `${W(this.interruptionDialog.started_at, this.hass)} → ${W(this.interruptionDialog.ended_at, this.hass)}` : ""}</p><label>${i.interruptionAction ?? "Aktion"}<select .value=${this.interruptionAction} @change=${(E) => {
      this.interruptionAction = E.currentTarget.value, this.requestUpdate();
    }}><option value="stop">${i.assignStop ?? "Zwischenstopp zuordnen"}</option><option value="overnight">${i.assignOvernight ?? "Übernachtungsplatz zuordnen"}</option><option value="pause">${i.drivePause ?? "Als Fahrtpause kennzeichnen"}</option><option value="ignored">${i.interruptionIgnored ?? "Als nicht relevant markieren"}</option></select></label>${this.interruptionAction === "stop" || this.interruptionAction === "overnight" ? m`<label>${i.existingPlace ?? "Bestehender Ort"}<select .value=${this.interruptionPlaceId} @change=${(E) => {
      this.interruptionPlaceId = E.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.createNewPlace ?? "Neuen Eintrag erstellen …"}</option>${l.map((E) => m`<option value=${E.id}>${E.name}</option>`)}</select></label>${this.interruptionPlaceId ? "" : m`<input aria-label=${i.placeName} placeholder=${i.placeName} .value=${this.interruptionName} @input=${(E) => this.interruptionName = E.currentTarget.value} required><select aria-label=${i.placeCategory} .value=${this.interruptionType} @change=${(E) => this.interruptionType = E.currentTarget.value}><option value="other">${i.placeOther}</option><option value="rv_site">${i.placeRvSite}</option><option value="parking">${i.placeParking ?? "Raststätte / Parkplatz"}</option></select><input aria-label=${i.placeAddress} placeholder=${i.placeAddress} .value=${this.interruptionAddress} @input=${(E) => this.interruptionAddress = E.currentTarget.value}><input aria-label=${i.placeWebsite ?? "Webseite"} type="url" placeholder=${i.placeWebsite ?? "Webseite (optional)"} .value=${this.interruptionWebsite} @input=${(E) => this.interruptionWebsite = E.currentTarget.value}><textarea aria-label=${i.placeDescription} placeholder=${i.placeDescription} .value=${this.interruptionDescription} @input=${(E) => this.interruptionDescription = E.currentTarget.value}></textarea>`}` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeInterruptionDialog()}>${i.cancel}</button><button type="submit" ?disabled=${this.interruptionSaving}>${this.interruptionSaving ? i.saving : i.save}</button></div></form></dialog>`;
  }
  vehicleName = "";
  render() {
    const i = w(this.hass), r = this.trip();
    return m`<ha-card><h1>${i.title}</h1>${r ? this.renderOpenTrip(i, r) : this.renderPicker(i)}${this.error && !r ? m`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading && !r ? m`<p class="muted" role="status">${i.loading}</p>` : ""}</ha-card>${this.renderDriveDeleteDialog(i)}`;
  }
}
gs.styles = [Bt.styles, vt`
  :host { min-width: 0; } ha-card { padding: 0; overflow: hidden; } h1 { margin: 0; padding: 14px 18px 8px; font-size: 1.35rem; } h2 { margin: 0; } .entry, .trip-header { padding: 8px 18px 16px; } .entry { text-align: left; } .picker-label { display: grid; gap: 6px; text-align: left; margin: 0; } select, input, textarea { box-sizing: border-box; min-width: 0; width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; } select, button { min-height: 44px; } .trip-header { display: flex; justify-content: space-between; gap: 14px; align-items: start; border-block: 1px solid var(--divider-color); background: var(--secondary-background-color); } .eyebrow { margin: 0 0 4px; color: var(--secondary-text-color); font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; } .muted { color: var(--secondary-text-color); } .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(9rem,1fr)); gap: 10px; align-items: end; } .form-grid label { display: grid; gap: 5px; text-align: left; } .new-trip { margin-top: 16px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 10px; text-align: left; } .journal-section { border-bottom: 1px solid var(--divider-color); } .journal-section details { padding: 0 18px; } .journal-section summary { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; list-style: none; } .journal-section summary::-webkit-details-marker { display:none; } .section-title { display: flex; gap: 9px; align-items: center; } .section-title span { color: var(--primary-color); width: 1.2em; text-align: center; } .count { color: var(--secondary-text-color); } .section-content { padding: 0 0 16px; min-width: 0; } .metric-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(7rem,1fr)); gap: 8px; } .metric-grid > div { min-width: 0; padding: 10px; border-radius: 9px; background: var(--secondary-background-color); } .metric-grid span, .metric-grid strong { display: block; min-width: 0; overflow-wrap: anywhere; word-break: normal; } .metric-grid span { color: var(--secondary-text-color); font-size: .78rem; line-height: 1.2; } .metric-grid strong { margin-top: 3px; } .drive-item, .interruption-item { display: grid; gap: 3px; padding: 10px; margin-bottom: 7px; border-radius: 8px; background: var(--secondary-background-color); } .interruption-item { border-inline-start: 4px solid var(--warning-color, #f57c00); } camper-travel-journal-manager-card, camper-travel-journal-map-card { display: block; min-width: 0; } button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; } @media (max-width: 600px) { h1 { padding: 12px 14px 6px; } .entry, .trip-header { padding: 6px 14px 12px; } .trip-header { flex-direction: column; } .trip-header button { width: 100%; } .entry .actions { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); } .entry .actions button { min-width: 0; white-space: normal; } .journal-section details { padding-inline: 14px; } .form-grid { grid-template-columns: 1fr; } .metric-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
  .compact-action { justify-self: start; padding: 5px 8px; font-size: .85em; }
  .drive-heading { display:flex; justify-content:space-between; align-items:center; gap:8px; }
  .drive-delete-icon { min-height:32px; min-width:32px; padding:4px; border-radius:50%; color:var(--secondary-text-color); background:transparent; font-size:1rem; line-height:1; }
  .drive-delete-icon:hover, .drive-delete-icon:focus-visible { color:var(--error-color,#c62828); background:var(--secondary-background-color); }
  .drive-delete-dialog { width:min(34rem,calc(100vw - 2rem)); max-width:calc(100vw - 2rem); padding:0; border:0; border-radius:12px; color:var(--primary-text-color); background:var(--card-background-color); }
  .drive-delete-dialog::backdrop { background:rgb(0 0 0 / .5); }
  .drive-delete-dialog form { display:grid; gap:12px; padding:18px; }
  .drive-delete-dialog dl { display:grid; grid-template-columns:auto minmax(0,1fr); gap:4px 12px; margin:0; }
  .drive-delete-dialog dt { color:var(--secondary-text-color); }
  .drive-delete-dialog dd { margin:0; }
  .danger { color:var(--text-primary-color,#fff); background:var(--error-color,#c62828); }
  @media(max-width:650px) { .drive-delete-dialog { width:calc(100vw - 1rem); max-width:calc(100vw - 1rem); } .drive-delete-dialog .dialog-actions { flex-direction:column-reverse; } .drive-delete-dialog .dialog-actions button { width:100%; } }
  dialog { max-width: min(32rem, calc(100vw - 2rem)); width: calc(100% - 2rem); max-height: calc(100dvh - 2rem); overflow: hidden; border: 0; border-radius: 12px; padding: 0; color: var(--primary-text-color); background: var(--card-background-color); }
  dialog::backdrop { background: rgb(0 0 0 / .48); }
  dialog form { display: grid; gap: 12px; padding: 18px; max-height: calc(100dvh - 2rem); overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable; }
  dialog label { display: grid; gap: 5px; }
  dialog textarea { min-height: 4rem; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
  .tankbook { display:grid; gap:12px; min-width:0; }
  .fuel-import-dialog { width:min(38rem,calc(100vw - 1rem)); max-width:calc(100vw - 1rem); max-height:calc(100dvh - 1rem); overflow:hidden; border:0; border-radius:12px; padding:0; color:var(--primary-text-color); background:var(--card-background-color); }
  .fuel-import-dialog::backdrop { background:rgb(0 0 0 / .48); }
  .fuel-import-dialog form { display:grid; gap:12px; padding:16px; max-height:calc(100dvh - 1rem); overflow-y:auto; overscroll-behavior:contain; scrollbar-gutter:stable; }
  .fuel-expense-list { display:grid; gap:8px; }
  .fuel-expense-list article { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; padding:10px; border-radius:9px; background:var(--secondary-background-color); }
  .fuel-expense-list article > div { display:grid; gap:3px; min-width:0; }
  .fuel-expense-list span { color:var(--secondary-text-color); overflow-wrap:anywhere; }
  .tankbook-form { padding:12px; border:1px solid var(--divider-color); border-radius:10px; }
  .tankbook-event, .tankbook-interval { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; padding:10px; margin-top:7px; border-radius:9px; background:var(--secondary-background-color); }
  .tankbook-event > div, .tankbook-interval { display:grid; gap:3px; min-width:0; }
  .tankbook-event span, .tankbook-interval span { color:var(--secondary-text-color); font-size:.88em; overflow-wrap:anywhere; }
  .full-width { grid-column:1/-1; }
  @media(max-width:600px) { .tankbook-event { flex-direction:column; } .tankbook-event .actions { width:100%; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; } .tankbook-event .actions button { min-height:44px; min-width:0; white-space:normal; line-height:1.2; } .tankbook-event .actions [data-action="edit"] { grid-column:1/-1; } .tankbook-event .actions .danger { color:var(--error-color,#c62828); background:transparent; border:1px solid var(--error-color,#c62828); } .fuel-expense-list article { flex-direction:column; } .fuel-expense-list article button { width:100%; } }
`];
pi("camper-travel-journal-journal-card", gs);
function cl(d, i) {
  return d.vehicle_id || i.length !== 1 ? d : { ...d, vehicle_id: i[0].vehicle_id };
}
function ul(d, i) {
  return d.type === i.type && d.vehicle_id === i.vehicle_id && dl(d.modules, i.modules, d.module_order, i.module_order) && hl(d.module_order, i.module_order, d.modules, i.modules);
}
class pl extends Gt {
  static styles = vt`
    :host { display: block; color: var(--primary-text-color); }
    .field { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
    label { font-weight: 500; }
    select { min-height: 44px; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; background: var(--card-background-color, var(--primary-background-color)); color: var(--primary-text-color); }
    .module-list { display:grid; gap:6px; margin-top:6px; }
    .module-row { display:grid; grid-template-columns:minmax(0,1fr) auto auto; gap:6px; align-items:center; padding:8px; border:1px solid var(--divider-color); border-radius:8px; }
    .module-row.moved { animation: module-moved 900ms ease-out; border-color:var(--primary-color); box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color) 25%,transparent); }
    .module-position { color:var(--secondary-text-color); font-size:.85em; white-space:nowrap; }
    .module-row label { min-width:0; font-weight:400; }
    .module-row button { min-width:40px; min-height:40px; border:1px solid var(--divider-color); border-radius:6px; background:var(--secondary-background-color); color:var(--primary-text-color); font:inherit; cursor:pointer; }
    .module-row button:disabled { opacity:.45; cursor:default; }
    .planned { color:var(--secondary-text-color); font-size:.85em; }
    .error { color: var(--error-color); }
    .muted { color: var(--secondary-text-color); }
    @keyframes module-moved { from { background:color-mix(in srgb,var(--primary-color) 16%,transparent); } to { background:transparent; } }
  `;
  _hass;
  _config = {};
  vehicles = [];
  loading = !1;
  error = "";
  loadedConnection;
  loadingPromise;
  highlightedModule;
  set hass(i) {
    const r = this._hass?.connection !== i?.connection;
    this._hass = i, r && i && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(i) {
    ul(this._config, i) || (this._config = { ...i }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const i = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await fi(i), this.loadedConnection = i.connection;
        const r = cl(this._config, this.vehicles);
        r.vehicle_id !== this._config.vehicle_id && (this._config = r, this.fireConfigChanged());
      } catch {
        this.error = w(i).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(i) {
    const r = i.target.value;
    this._config = { ...this._config, vehicle_id: r }, this.fireConfigChanged();
  }
  toggleModule(i, r) {
    const o = r.currentTarget.checked, l = le(this._config.module_order, this._config.modules), c = ai(this._config.modules), f = o ? [...c, i] : c.filter((y) => y !== i);
    this._config = { ...this._config, modules: l.filter((y) => f.includes(y)), module_order: l }, this.fireConfigChanged(), this.requestUpdate();
  }
  moveModule(i, r) {
    const o = le(this._config.module_order, this._config.modules), l = o.indexOf(i), c = l + r;
    if (l < 0 || c < 0 || c >= o.length) return;
    [o[l], o[c]] = [o[c], o[l]];
    const f = ai(this._config.modules);
    this._config = { ...this._config, modules: o.filter((y) => f.includes(y)), module_order: o }, this.highlightedModule = i, this.fireConfigChanged(), this.requestUpdate(), this.updateComplete.then(() => {
      const y = this.renderRoot.querySelector(`.module-row[data-module="${i}"]`);
      y && (y.focus({ preventScroll: !0 }), y.scrollIntoView({ block: "nearest", inline: "nearest" }), window.setTimeout(() => {
        this.highlightedModule === i && (this.highlightedModule = void 0, this.requestUpdate());
      }, 900));
    });
  }
  render() {
    const i = w(this._hass), r = ai(this._config.modules), o = le(this._config.module_order, this._config.modules);
    return m`
      <div class="field">
        <label for="vehicle">${i.editorVehicle}</label>
        ${this.loading ? m`<span class="muted">${i.editorLoading}</span>` : m`
          <select id="vehicle" aria-label=${i.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${i.editorChooseVehicle}</option>
            ${this.vehicles.map((l) => m`<option value=${l.vehicle_id} ?selected=${l.vehicle_id === this._config.vehicle_id}>${l.name || l.title}</option>`)}
          </select>
        `}
        ${this.error ? m`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? m`<span class="error" role="alert">${i.editorNoVehicle}</span>` : ""}
      </div>
      <div class="field">
        <label>${i.editorModules ?? "Journal modules"}</label>
        <span class="muted">${i.editorModulesHint ?? "Choose visible sections and arrange their order."}</span>
        <div class="module-list" role="list">
          ${o.map((l, c) => {
      const f = r.includes(l);
      return m`<div class="module-row ${this.highlightedModule === l ? "moved" : ""}" data-module=${l} role="listitem" tabindex="-1">
              <label><input type="checkbox" .checked=${f} @change=${(y) => this.toggleModule(l, y)}> ${i[`module_${l}`] ?? l}</label>
              <span class="module-position" aria-label=${`${i.modulePosition ?? "Position"}: ${c + 1} ${i.moduleOf ?? "of"} ${o.length}`}>${c + 1} ${i.moduleOf ?? "of"} ${o.length}</span>
              <span><button type="button" aria-label=${i.moduleMoveUp ?? "Move up"} title=${i.moduleMoveUp ?? "Move up"} ?disabled=${c <= 0} @click=${() => this.moveModule(l, -1)}>↑</button>
              <button type="button" aria-label=${i.moduleMoveDown ?? "Move down"} title=${i.moduleMoveDown ?? "Move down"} ?disabled=${c >= o.length - 1} @click=${() => this.moveModule(l, 1)}>↓</button></span>
            </div>`;
    })}
        </div>
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", pl);
const fl = [
  { type: "camper-travel-journal-journal-card", name: "Camper Travel Journal – Journal", description: "Zentraler Einstieg: Reise öffnen und alle Funktionen in einem Reisebereich nutzen.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Eigenständige Diagnosekarte für die Verbindung und Datenanbindung.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const d of fl) window.customCards.some((i) => i.type === d.type) || window.customCards.push(d);
