const Xe = globalThis, en = Xe.ShadowRoot && (Xe.ShadyCSS === void 0 || Xe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, nn = /* @__PURE__ */ Symbol(), Tr = /* @__PURE__ */ new WeakMap();
let Ur = class {
  constructor(i, s, a) {
    if (this._$cssResult$ = !0, a !== nn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = i, this.t = s;
  }
  get styleSheet() {
    let i = this.o;
    const s = this.t;
    if (en && i === void 0) {
      const a = s !== void 0 && s.length === 1;
      a && (i = Tr.get(s)), i === void 0 && ((this.o = i = new CSSStyleSheet()).replaceSync(this.cssText), a && Tr.set(s, i));
    }
    return i;
  }
  toString() {
    return this.cssText;
  }
};
const Hr = (c) => new Ur(typeof c == "string" ? c : c + "", void 0, nn), Mt = (c, ...i) => {
  const s = c.length === 1 ? c[0] : i.reduce((a, h, u) => a + ((m) => {
    if (m._$cssResult$ === !0) return m.cssText;
    if (typeof m == "number") return m;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + m + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(h) + c[u + 1], c[0]);
  return new Ur(s, c, nn);
}, ko = (c, i) => {
  if (en) c.adoptedStyleSheets = i.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of i) {
    const a = document.createElement("style"), h = Xe.litNonce;
    h !== void 0 && a.setAttribute("nonce", h), a.textContent = s.cssText, c.appendChild(a);
  }
}, $r = en ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((i) => {
  let s = "";
  for (const a of i.cssRules) s += a.cssText;
  return Hr(s);
})(c) : c;
const { is: Io, defineProperty: Co, getOwnPropertyDescriptor: Ao, getOwnPropertyNames: Do, getOwnPropertySymbols: Mo, getPrototypeOf: zo } = Object, ei = globalThis, Pr = ei.trustedTypes, Oo = Pr ? Pr.emptyScript : "", No = ei.reactiveElementPolyfillSupport, Te = (c, i) => c, Ji = { toAttribute(c, i) {
  switch (i) {
    case Boolean:
      c = c ? Oo : null;
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
} }, jr = (c, i) => !Io(c, i), Sr = { attribute: !0, type: String, converter: Ji, reflect: !1, useDefault: !1, hasChanged: jr };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ei.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ee = class extends HTMLElement {
  static addInitializer(i) {
    this._$Ei(), (this.l ??= []).push(i);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(i, s = Sr) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(i) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(i, s), !s.noAccessor) {
      const a = /* @__PURE__ */ Symbol(), h = this.getPropertyDescriptor(i, a, s);
      h !== void 0 && Co(this.prototype, i, h);
    }
  }
  static getPropertyDescriptor(i, s, a) {
    const { get: h, set: u } = Ao(this.prototype, i) ?? { get() {
      return this[s];
    }, set(m) {
      this[s] = m;
    } };
    return { get: h, set(m) {
      const x = h?.call(this);
      u?.call(this, m), this.requestUpdate(i, x, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(i) {
    return this.elementProperties.get(i) ?? Sr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Te("elementProperties"))) return;
    const i = zo(this);
    i.finalize(), i.l !== void 0 && (this.l = [...i.l]), this.elementProperties = new Map(i.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Te("properties"))) {
      const s = this.properties, a = [...Do(s), ...Mo(s)];
      for (const h of a) this.createProperty(h, s[h]);
    }
    const i = this[Symbol.metadata];
    if (i !== null) {
      const s = litPropertyMetadata.get(i);
      if (s !== void 0) for (const [a, h] of s) this.elementProperties.set(a, h);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, a] of this.elementProperties) {
      const h = this._$Eu(s, a);
      h !== void 0 && this._$Eh.set(h, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const a = new Set(i.flat(1 / 0).reverse());
      for (const h of a) s.unshift($r(h));
    } else i !== void 0 && s.push($r(i));
    return s;
  }
  static _$Eu(i, s) {
    const a = s.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof i == "string" ? i.toLowerCase() : void 0;
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
    for (const a of s.keys()) this.hasOwnProperty(a) && (i.set(a, this[a]), delete this[a]);
    i.size > 0 && (this._$Ep = i);
  }
  createRenderRoot() {
    const i = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ko(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((i) => i.hostConnected?.());
  }
  enableUpdating(i) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((i) => i.hostDisconnected?.());
  }
  attributeChangedCallback(i, s, a) {
    this._$AK(i, a);
  }
  _$ET(i, s) {
    const a = this.constructor.elementProperties.get(i), h = this.constructor._$Eu(i, a);
    if (h !== void 0 && a.reflect === !0) {
      const u = (a.converter?.toAttribute !== void 0 ? a.converter : Ji).toAttribute(s, a.type);
      this._$Em = i, u == null ? this.removeAttribute(h) : this.setAttribute(h, u), this._$Em = null;
    }
  }
  _$AK(i, s) {
    const a = this.constructor, h = a._$Eh.get(i);
    if (h !== void 0 && this._$Em !== h) {
      const u = a.getPropertyOptions(h), m = typeof u.converter == "function" ? { fromAttribute: u.converter } : u.converter?.fromAttribute !== void 0 ? u.converter : Ji;
      this._$Em = h;
      const x = m.fromAttribute(s, u.type);
      this[h] = x ?? this._$Ej?.get(h) ?? x, this._$Em = null;
    }
  }
  requestUpdate(i, s, a, h = !1, u) {
    if (i !== void 0) {
      const m = this.constructor;
      if (h === !1 && (u = this[i]), a ??= m.getPropertyOptions(i), !((a.hasChanged ?? jr)(u, s) || a.useDefault && a.reflect && u === this._$Ej?.get(i) && !this.hasAttribute(m._$Eu(i, a)))) return;
      this.C(i, s, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(i, s, { useDefault: a, reflect: h, wrapped: u }, m) {
    a && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(i) && (this._$Ej.set(i, m ?? s ?? this[i]), u !== !0 || m !== void 0) || (this._$AL.has(i) || (this.hasUpdated || a || (s = void 0), this._$AL.set(i, s)), h === !0 && this._$Em !== i && (this._$Eq ??= /* @__PURE__ */ new Set()).add(i));
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
        for (const [h, u] of this._$Ep) this[h] = u;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [h, u] of a) {
        const { wrapped: m } = u, x = this[h];
        m !== !0 || this._$AL.has(h) || x === void 0 || this.C(h, void 0, u, x);
      }
    }
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), this._$EO?.forEach((a) => a.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (a) {
      throw i = !1, this._$EM(), a;
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
ee.elementStyles = [], ee.shadowRootOptions = { mode: "open" }, ee[Te("elementProperties")] = /* @__PURE__ */ new Map(), ee[Te("finalized")] = /* @__PURE__ */ new Map(), No?.({ ReactiveElement: ee }), (ei.reactiveElementVersions ??= []).push("2.1.2");
const rn = globalThis, Er = (c) => c, Je = rn.trustedTypes, Lr = Je ? Je.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, Wr = "$lit$", It = `lit$${Math.random().toFixed(9).slice(2)}$`, qr = "?" + It, Ro = `<${qr}>`, jt = document, Pe = () => jt.createComment(""), Se = (c) => c === null || typeof c != "object" && typeof c != "function", sn = Array.isArray, Bo = (c) => sn(c) || typeof c?.[Symbol.iterator] == "function", Hi = `[ \t
\f\r]`, be = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, kr = /-->/g, Ir = />/g, Ft = RegExp(`>|${Hi}(?:([^\\s"'>=/]+)(${Hi}*=${Hi}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cr = /'/g, Ar = /"/g, Gr = /^(?:script|style|textarea|title)$/i, Zo = (c) => (i, ...s) => ({ _$litType$: c, strings: i, values: s }), _ = Zo(1), ie = /* @__PURE__ */ Symbol.for("lit-noChange"), X = /* @__PURE__ */ Symbol.for("lit-nothing"), Dr = /* @__PURE__ */ new WeakMap(), Ut = jt.createTreeWalker(jt, 129);
function Vr(c, i) {
  if (!sn(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lr !== void 0 ? Lr.createHTML(i) : i;
}
const Fo = (c, i) => {
  const s = c.length - 1, a = [];
  let h, u = i === 2 ? "<svg>" : i === 3 ? "<math>" : "", m = be;
  for (let x = 0; x < s; x++) {
    const p = c[x];
    let y, P, b = -1, z = 0;
    for (; z < p.length && (m.lastIndex = z, P = m.exec(p), P !== null); ) z = m.lastIndex, m === be ? P[1] === "!--" ? m = kr : P[1] !== void 0 ? m = Ir : P[2] !== void 0 ? (Gr.test(P[2]) && (h = RegExp("</" + P[2], "g")), m = Ft) : P[3] !== void 0 && (m = Ft) : m === Ft ? P[0] === ">" ? (m = h ?? be, b = -1) : P[1] === void 0 ? b = -2 : (b = m.lastIndex - P[2].length, y = P[1], m = P[3] === void 0 ? Ft : P[3] === '"' ? Ar : Cr) : m === Ar || m === Cr ? m = Ft : m === kr || m === Ir ? m = be : (m = Ft, h = void 0);
    const T = m === Ft && c[x + 1].startsWith("/>") ? " " : "";
    u += m === be ? p + Ro : b >= 0 ? (a.push(y), p.slice(0, b) + Wr + p.slice(b) + It + T) : p + It + (b === -2 ? x : T);
  }
  return [Vr(c, u + (c[s] || "<?>") + (i === 2 ? "</svg>" : i === 3 ? "</math>" : "")), a];
};
class Ee {
  constructor({ strings: i, _$litType$: s }, a) {
    let h;
    this.parts = [];
    let u = 0, m = 0;
    const x = i.length - 1, p = this.parts, [y, P] = Fo(i, s);
    if (this.el = Ee.createElement(y, a), Ut.currentNode = this.el.content, s === 2 || s === 3) {
      const b = this.el.content.firstChild;
      b.replaceWith(...b.childNodes);
    }
    for (; (h = Ut.nextNode()) !== null && p.length < x; ) {
      if (h.nodeType === 1) {
        if (h.hasAttributes()) for (const b of h.getAttributeNames()) if (b.endsWith(Wr)) {
          const z = P[m++], T = h.getAttribute(b).split(It), B = /([.?@])?(.*)/.exec(z);
          p.push({ type: 1, index: u, name: B[2], strings: T, ctor: B[1] === "." ? Ho : B[1] === "?" ? jo : B[1] === "@" ? Wo : ii }), h.removeAttribute(b);
        } else b.startsWith(It) && (p.push({ type: 6, index: u }), h.removeAttribute(b));
        if (Gr.test(h.tagName)) {
          const b = h.textContent.split(It), z = b.length - 1;
          if (z > 0) {
            h.textContent = Je ? Je.emptyScript : "";
            for (let T = 0; T < z; T++) h.append(b[T], Pe()), Ut.nextNode(), p.push({ type: 2, index: ++u });
            h.append(b[z], Pe());
          }
        }
      } else if (h.nodeType === 8) if (h.data === qr) p.push({ type: 2, index: u });
      else {
        let b = -1;
        for (; (b = h.data.indexOf(It, b + 1)) !== -1; ) p.push({ type: 7, index: u }), b += It.length - 1;
      }
      u++;
    }
  }
  static createElement(i, s) {
    const a = jt.createElement("template");
    return a.innerHTML = i, a;
  }
}
function ne(c, i, s = c, a) {
  if (i === ie) return i;
  let h = a !== void 0 ? s._$Co?.[a] : s._$Cl;
  const u = Se(i) ? void 0 : i._$litDirective$;
  return h?.constructor !== u && (h?._$AO?.(!1), u === void 0 ? h = void 0 : (h = new u(c), h._$AT(c, s, a)), a !== void 0 ? (s._$Co ??= [])[a] = h : s._$Cl = h), h !== void 0 && (i = ne(c, h._$AS(c, i.values), h, a)), i;
}
class Uo {
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
    const { el: { content: s }, parts: a } = this._$AD, h = (i?.creationScope ?? jt).importNode(s, !0);
    Ut.currentNode = h;
    let u = Ut.nextNode(), m = 0, x = 0, p = a[0];
    for (; p !== void 0; ) {
      if (m === p.index) {
        let y;
        p.type === 2 ? y = new Le(u, u.nextSibling, this, i) : p.type === 1 ? y = new p.ctor(u, p.name, p.strings, this, i) : p.type === 6 && (y = new qo(u, this, i)), this._$AV.push(y), p = a[++x];
      }
      m !== p?.index && (u = Ut.nextNode(), m++);
    }
    return Ut.currentNode = jt, h;
  }
  p(i) {
    let s = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(i, a, s), s += a.strings.length - 2) : a._$AI(i[s])), s++;
  }
}
class Le {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(i, s, a, h) {
    this.type = 2, this._$AH = X, this._$AN = void 0, this._$AA = i, this._$AB = s, this._$AM = a, this.options = h, this._$Cv = h?.isConnected ?? !0;
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
    i = ne(this, i, s), Se(i) ? i === X || i == null || i === "" ? (this._$AH !== X && this._$AR(), this._$AH = X) : i !== this._$AH && i !== ie && this._(i) : i._$litType$ !== void 0 ? this.$(i) : i.nodeType !== void 0 ? this.T(i) : Bo(i) ? this.k(i) : this._(i);
  }
  O(i) {
    return this._$AA.parentNode.insertBefore(i, this._$AB);
  }
  T(i) {
    this._$AH !== i && (this._$AR(), this._$AH = this.O(i));
  }
  _(i) {
    this._$AH !== X && Se(this._$AH) ? this._$AA.nextSibling.data = i : this.T(jt.createTextNode(i)), this._$AH = i;
  }
  $(i) {
    const { values: s, _$litType$: a } = i, h = typeof a == "number" ? this._$AC(i) : (a.el === void 0 && (a.el = Ee.createElement(Vr(a.h, a.h[0]), this.options)), a);
    if (this._$AH?._$AD === h) this._$AH.p(s);
    else {
      const u = new Uo(h, this), m = u.u(this.options);
      u.p(s), this.T(m), this._$AH = u;
    }
  }
  _$AC(i) {
    let s = Dr.get(i.strings);
    return s === void 0 && Dr.set(i.strings, s = new Ee(i)), s;
  }
  k(i) {
    sn(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let a, h = 0;
    for (const u of i) h === s.length ? s.push(a = new Le(this.O(Pe()), this.O(Pe()), this, this.options)) : a = s[h], a._$AI(u), h++;
    h < s.length && (this._$AR(a && a._$AB.nextSibling, h), s.length = h);
  }
  _$AR(i = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); i !== this._$AB; ) {
      const a = Er(i).nextSibling;
      Er(i).remove(), i = a;
    }
  }
  setConnected(i) {
    this._$AM === void 0 && (this._$Cv = i, this._$AP?.(i));
  }
}
class ii {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(i, s, a, h, u) {
    this.type = 1, this._$AH = X, this._$AN = void 0, this.element = i, this.name = s, this._$AM = h, this.options = u, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = X;
  }
  _$AI(i, s = this, a, h) {
    const u = this.strings;
    let m = !1;
    if (u === void 0) i = ne(this, i, s, 0), m = !Se(i) || i !== this._$AH && i !== ie, m && (this._$AH = i);
    else {
      const x = i;
      let p, y;
      for (i = u[0], p = 0; p < u.length - 1; p++) y = ne(this, x[a + p], s, p), y === ie && (y = this._$AH[p]), m ||= !Se(y) || y !== this._$AH[p], y === X ? i = X : i !== X && (i += (y ?? "") + u[p + 1]), this._$AH[p] = y;
    }
    m && !h && this.j(i);
  }
  j(i) {
    i === X ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, i ?? "");
  }
}
class Ho extends ii {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(i) {
    this.element[this.name] = i === X ? void 0 : i;
  }
}
let jo = class extends ii {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(i) {
    this.element.toggleAttribute(this.name, !!i && i !== X);
  }
};
class Wo extends ii {
  constructor(i, s, a, h, u) {
    super(i, s, a, h, u), this.type = 5;
  }
  _$AI(i, s = this) {
    if ((i = ne(this, i, s, 0) ?? X) === ie) return;
    const a = this._$AH, h = i === X && a !== X || i.capture !== a.capture || i.once !== a.once || i.passive !== a.passive, u = i !== X && (a === X || h);
    h && this.element.removeEventListener(this.name, this, a), u && this.element.addEventListener(this.name, this, i), this._$AH = i;
  }
  handleEvent(i) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, i) : this._$AH.handleEvent(i);
  }
}
class qo {
  constructor(i, s, a) {
    this.element = i, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(i) {
    ne(this, i);
  }
}
const Go = rn.litHtmlPolyfillSupport;
Go?.(Ee, Le), (rn.litHtmlVersions ??= []).push("3.3.3");
const Vo = (c, i, s) => {
  const a = s?.renderBefore ?? i;
  let h = a._$litPart$;
  if (h === void 0) {
    const u = s?.renderBefore ?? null;
    a._$litPart$ = h = new Le(i.insertBefore(Pe(), u), u, void 0, s ?? {});
  }
  return h._$AI(c), h;
};
const on = globalThis;
class Ht extends ee {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const i = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= i.firstChild, i;
  }
  update(i) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(i), this._$Do = Vo(s, this.renderRoot, this.renderOptions);
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
Ht._$litElement$ = !0, Ht.finalized = !0, on.litElementHydrateSupport?.({ LitElement: Ht });
const Ko = on.litElementPolyfillSupport;
Ko?.({ LitElement: Ht });
(on.litElementVersions ??= []).push("4.2.2");
const Kr = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], Ke = Kr, Yo = {
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
  migrationTitle: "WICHTIG: DIE LOVELACE-KARTEN HABEN SICH GEÄNDERT!",
  migrationText: "Ab Version 0.3.0 werden neue Dashboards mit der zentralen Karte Camper Travel Journal – Reisetagebuch eingerichtet. Diese bisherige Karte bleibt aus Kompatibilitätsgründen funktionsfähig, wird aber nicht mehr für neue Dashboards empfohlen.",
  migrationLink: "Migrationsanleitung",
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
}, Xo = {
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
  migrationTitle: "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!",
  migrationText: "From version 0.3.0, new dashboards should use the central Camper Travel Journal card. This legacy card remains functional for compatibility, but is no longer recommended for new dashboards.",
  migrationLink: "Migration guide",
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
}, Mr = {
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
  const i = c?.locale?.language?.toLowerCase() ?? "de";
  return { ...i.startsWith("de") ? Yo : Xo, ...i.startsWith("de") ? Mr.de : Mr.en };
}
function Qe(c) {
  return (c?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function $e(c, i) {
  const s = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c);
  if (s) {
    const [, a, h, u] = s;
    return Qe(i).startsWith("de") ? `${u}.${h}.${a}` : `${h}/${u}/${a}`;
  }
  return new Date(c).toLocaleDateString(Qe(i));
}
function K(c, i) {
  return new Date(c).toLocaleString(Qe(i), { dateStyle: "short", timeStyle: "short" });
}
function zr(c, i) {
  return new Date(c).toLocaleTimeString(Qe(i), { hour: "2-digit", minute: "2-digit" });
}
function Ct(c, i) {
  const s = Math.max(0, Math.round((c ?? 0) / 60));
  return s < 60 ? `${s} min` : `${Math.floor(s / 60)} h ${s % 60} min`;
}
function At(c, i) {
  return c.start_date || c.end_date ? [c.start_date, c.end_date].filter(Boolean).map((s) => $e(s, i)).join(" – ") || "" : c.started_at ? `${$e(c.started_at, i)}${c.ended_at ? ` – ${$e(c.ended_at, i)}` : ""}` : "";
}
function Jo(c, i) {
  const s = c.start_date || c.started_at, a = c.end_date || c.ended_at;
  if (!s && !a) return "";
  const h = (y) => {
    const P = /^(\d{4})-(\d{2})-(\d{2})$/.exec(y);
    return P ? new Date(Number(P[1]), Number(P[2]) - 1, Number(P[3])) : new Date(y);
  }, u = h(s || a || ""), m = h(a || s || "");
  if (Number.isNaN(u.getTime()) || Number.isNaN(m.getTime())) return At(c, i);
  if (!(i?.locale?.language ?? "").toLowerCase().startsWith("de")) {
    const y = new Intl.DateTimeFormat("en-US", { month: "short" }), P = (z) => z.getDate(), b = (z) => z.getFullYear();
    return b(u) === b(m) && u.getMonth() === m.getMonth() ? `${y.format(u)} ${P(u)}–${P(m)}, ${b(u)}` : b(u) === b(m) ? `${y.format(u)} ${P(u)}–${y.format(m)} ${P(m)}, ${b(u)}` : `${y.format(u)} ${P(u)}, ${b(u)}–${y.format(m)} ${P(m)}, ${b(m)}`;
  }
  const p = (y) => `${String(y.getDate()).padStart(2, "0")}.${String(y.getMonth() + 1).padStart(2, "0")}.${String(y.getFullYear()).slice(-2)}`;
  return u.getFullYear() === m.getFullYear() && u.getMonth() === m.getMonth() ? `${String(u.getDate()).padStart(2, "0")}.–${p(m).slice(0, 2)}.${String(m.getMonth() + 1).padStart(2, "0")}.${String(m.getFullYear()).slice(-2)}` : `${p(u)}–${p(m)}`;
}
function re(c, i) {
  return $(i).statuses[c] ?? c;
}
function Ye(c, i) {
  return $(i).categories[c] ?? c;
}
function ji(c) {
  return Kr.includes(c);
}
function Pt(c, i, s) {
  const a = (s?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(a, { style: "currency", currency: i, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100);
}
function Or(c) {
  const i = c.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(i)) return null;
  const [s, a = ""] = i.split("."), h = Number(s) * 100 + Number((a + "00").slice(0, 2));
  return Number.isSafeInteger(h) ? h : null;
}
class zt extends Ht {
  _hass;
  config = {};
  static styles = Mt`
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
    if (this.tagName.toLowerCase().includes("journal-card") || this.shadowRoot?.querySelector(".migration-notice")) return;
    const i = this.shadowRoot?.querySelector("ha-card");
    if (!i) return;
    const s = $(this.hass), a = document.createElement("aside");
    a.className = "migration-notice", a.setAttribute("role", "note");
    const h = document.createElement("strong");
    h.textContent = s.migrationTitle ?? "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const u = document.createElement("p");
    u.textContent = s.migrationText ?? "Use the central journal card for new dashboards.";
    const m = document.createElement("a");
    m.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration", m.target = "_blank", m.rel = "noreferrer", m.textContent = s.migrationLink ?? "Migration guide", a.append(h, u, m), i.prepend(a);
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
    const i = $(this.hass);
    return _`<aside class="migration-notice" role="note"><strong>${i.migrationTitle}</strong><p>${i.migrationText}</p><a href="https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration" target="_blank" rel="noreferrer">${i.migrationLink}</a></aside>`;
  }
}
function ni(c, i) {
  customElements.get(c) || customElements.define(c, i);
}
async function F(c, i, s, a = {}) {
  return c.connection.sendMessagePromise({ type: i, vehicle_id: s, ...a });
}
const St = (c, i, s) => F(c, "camper_travel_journal/list", i, s ? { trip_id: s } : {}), Qo = (c, i, s, a, h = 5e3) => F(c, "camper_travel_journal/route", i, { trip_id: s, drive_ids: a, max_points: h }), Yr = (c, i, s, a) => F(c, "camper_travel_journal/transition_trip", i, { trip_id: s, status: a }), Xr = (c, i, s, a = "", h = "", u = "") => F(c, "camper_travel_journal/create_trip", i, { title: s, start_date: a || void 0, end_date: h || void 0, destination: u }), ta = (c, i, s, a) => F(c, "camper_travel_journal/update_trip", i, { trip_id: s, ...a }), ea = (c, i, s) => F(c, "camper_travel_journal/delete_trip", i, { trip_id: s }), ia = (c, i, s, a) => F(c, "camper_travel_journal/unlink_drive", i, { trip_id: s, drive_id: a }), na = (c, i, s, a) => F(c, "camper_travel_journal/link_drives", i, { trip_id: s, drive_ids: a }), ra = (c, i, s) => F(c, "camper_travel_journal/create_manual_drive", i, s), sa = (c, i, s, a) => F(c, "camper_travel_journal/update_manual_drive", i, { drive_id: s, ...a }), oa = (c, i, s) => F(c, "camper_travel_journal/delete_manual_drive", i, { drive_id: s }), aa = (c, i, s, a) => F(c, "camper_travel_journal/create_expense", i, { trip_id: s, ...a }), la = (c, i, s, a) => F(c, "camper_travel_journal/update_expense", i, { expense_id: s, ...a }), Jr = (c, i, s, a) => F(c, "camper_travel_journal/create_stop", i, { trip_id: s, ...a }), ha = (c, i, s, a) => F(c, "camper_travel_journal/update_stop", i, { stop_id: s, ...a }), ca = (c, i, s) => F(c, "camper_travel_journal/delete_stop", i, { stop_id: s }), Nr = (c, i, s, a, h, u) => F(c, "camper_travel_journal/assign_interruption", i, { trip_id: s, interruption_id: a, status: h, stop_id: u }), da = (c, i, s, a, h) => F(c, "camper_travel_journal/create_stop_from_interruption", i, { trip_id: s, interruption_id: a, ...h }), ua = (c, i, s, a) => F(c, "camper_travel_journal/update_overnight", i, { place_id: s, ...a }), pa = (c, i, s, a) => F(c, "camper_travel_journal/update_rating", i, { place_id: s, ...a }), fa = (c, i, s) => F(c, "camper_travel_journal/delete_rating", i, { place_id: s }), ma = (c, i, s) => F(c, "camper_travel_journal/generate_stop_suggestions", i, { trip_id: s }), ga = (c, i, s, a, h, u) => F(c, "camper_travel_journal/accept_stop_suggestion", i, { suggestion_id: s, trip_id: a, name: h, place_type: u }), _a = (c, i, s) => F(c, "camper_travel_journal/dismiss_stop_suggestion", i, { suggestion_id: s }), va = (c, i, s) => F(c, "camper_travel_journal/delete_expense", i, { expense_id: s }), ya = (c, i, s) => F(c, "camper_travel_journal/export_pdf", i, { trip_id: s }), ri = async (c) => (await c.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], xa = (c, i, s) => F(c, "camper_travel_journal/analyze_gpx", i, { content_base64: s }), ba = (c, i, s, a, h, u) => F(c, "camper_travel_journal/import_gpx", i, { content_base64: s, file_hash: a, drive_keys: h, trip_id: u }), Qi = "camper-travel-journal-expenses-changed", tn = "camper-travel-journal-data-changed";
function Wi(c) {
  window.dispatchEvent(new CustomEvent(Qi, { detail: c }));
}
function Q(c) {
  window.dispatchEvent(new CustomEvent(tn, { detail: c }));
}
const vt = "camper-travel-journal-active-trip-changed";
function an(c) {
  return `camper-travel-journal:${typeof window < "u" && window.location.pathname || "/"}:${c}`;
}
function si(c) {
  if (!c || typeof window > "u") return "";
  try {
    return window.sessionStorage.getItem(an(c)) ?? "";
  } catch {
    return "";
  }
}
function Dt(c) {
  if (!(!c.vehicleId || !c.tripId || typeof window > "u")) {
    try {
      window.sessionStorage.setItem(an(c.vehicleId), c.tripId);
    } catch {
    }
    window.dispatchEvent(new CustomEvent(vt, { detail: c }));
  }
}
function wa(c, i = "journal") {
  if (!(!c || typeof window > "u")) {
    try {
      window.sessionStorage.removeItem(an(c));
    } catch {
    }
    window.dispatchEvent(new CustomEvent(vt, { detail: { vehicleId: c, tripId: "", source: i } }));
  }
}
class Qr extends zt {
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
  chooseDefaultTrip(i) {
    const s = (a, h) => (h.started_at || "").localeCompare(a.started_at || "") || h.id.localeCompare(a.id);
    return i.filter((a) => a.status === "active").sort(s)[0] ?? [...i].sort(s)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const i = await St(this.hass, this.vehicleId);
      this.trips = i.trips;
      const s = si(this.vehicleId), h = i.trips.find((m) => m.id === (s || this.selectedTripId)) ?? this.chooseDefaultTrip(i.trips);
      this.selectedTripId = h?.id ?? "", h && Dt({ vehicleId: this.vehicleId, tripId: h.id, source: "summary" });
      const u = h ? await St(this.hass, this.vehicleId, h.id) : i;
      return this.snapshot = h ? { ...u, trips: [h] } : u, this.loadError = "", !0;
    } catch {
      return this.loadError = $(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(i) {
    const s = this.snapshot?.trips[0];
    if (!(!this.hass || !s))
      try {
        await Yr(this.hass, this.vehicleId, s.id, i), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = $(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(i) {
    !this.hass || this.loading || !this.trips.some((s) => s.id === i) || (this.selectedTripId = i, Dt({ vehicleId: this.vehicleId, tripId: i, source: "summary" }), await this.refresh());
  }
  render() {
    const i = $(this.hass), s = this.snapshot?.trips[0], a = this.trips, h = (this.snapshot?.drives ?? []).reduce((P, b) => P + b.distance_m, 0) / 1e3;
    (this.snapshot?.stops ?? []).filter((P) => P.confirmed !== !1).filter((P) => ["campsite", "rv_site", "wild_camp", "overnight"].includes(P.place_kind || P.place_type || P.stop_type)).length;
    const m = this.snapshot?.expense_summary, x = m?.mixed_currency ? i.mixedCurrency : m?.total_minor !== void 0 && m.currency ? Pt(m.total_minor, m.currency, this.hass) : Pt(0, "EUR", this.hass), p = this.loadError || this.actionError, y = s ? At(s, this.hass) : "";
    return _`<ha-card><h2>${s?.title ?? i.title}</h2>${a.length ? _`<label class="trip-selector">${i.summaryChooseTrip}<select aria-label=${i.summaryTrip} @change=${(P) => {
      this.selectTrip(P.currentTarget.value);
    }} ?disabled=${this.loading}>${a.map((P) => _`<option value=${P.id} ?selected=${P.id === this.selectedTripId}>${P.title} · ${re(P.status, this.hass)} · ${At(P, this.hass)}</option>`)}</select></label>` : ""}${p ? _`<p class="error" role="alert">${p}</p>` : s ? _`<p class="muted">${s.destination || i.noDestination} · ${re(s.status, this.hass)} · ${y}</p><div class="grid"><div class="metric"><span class="muted">${i.distance}</span><span class="value">${h.toFixed(1)} km</span></div><div class="metric"><span class="muted">${i.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${i.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${i.costs}</span><span class="value">${x}</span></div></div><div class="actions">${s.status === "planned" ? _`<button @click=${() => this.setStatus("active")}>${i.start}</button>` : s.status === "paused" ? _`<button @click=${() => this.setStatus("active")}>${i.resume}</button>` : ""}${s.status === "active" ? _`<button class="secondary" @click=${() => this.setStatus("paused")}>${i.pause}</button><button @click=${() => this.setStatus("completed")}>${i.complete}</button>` : ""}</div>` : _`<p class="muted">${i.noTrip}</p>`}${this.loading ? _`<p class="muted">${i.loading}</p>` : ""}</ha-card>`;
  }
}
Qr.styles = [zt.styles, Mt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}`];
ni("camper-travel-journal-summary-card", Qr);
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
  onActiveTripChanged = (i) => {
    const s = i.detail;
    s?.vehicleId !== this.vehicleId || s.tripId === this.activeTripId || (this.activeTripId = s.tripId, this.selected = "", this.refresh());
  };
  async refreshSuggestions(i) {
    if (this.hass)
      try {
        await ma(this.hass, this.vehicleId, i), await this.refresh();
      } catch {
        this.fail($(this.hass).loadError);
      }
  }
  async acceptSuggestion(i, s) {
    if (this.hass) {
      if (this.suggestionEditingId !== i.id) {
        this.suggestionEditingId = i.id, this.suggestionName = "GPS-Stopp", this.suggestionType = "other", this.requestUpdate();
        return;
      }
      try {
        await ga(this.hass, this.vehicleId, i.id, s, this.suggestionName, this.suggestionType), this.suggestionEditingId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail($(this.hass).loadError);
      }
    }
  }
  async dismissSuggestion(i, s) {
    if (this.hass)
      try {
        await _a(this.hass, this.vehicleId, i.id), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail($(this.hass).loadError);
      }
  }
  resetPlaceForm() {
    this.placeName = "", this.placeType = "other", this.placeArrived = "", this.placeDeparted = "", this.placeLatitude = "", this.placeLongitude = "", this.placeDescription = "", this.placeAddress = "", this.editingPlaceId = "", this.interruptionDriveId = "";
  }
  placePayload() {
    const i = (s) => s.trim() ? Number(s.replace(",", ".")) : void 0;
    return { name: this.placeName.trim(), place_type: this.placeType, category: this.placeType, drive_id: this.interruptionDriveId || void 0, occurred_at: new Date(this.placeArrived).toISOString(), arrived_at: new Date(this.placeArrived).toISOString(), departed_at: this.placeDeparted ? new Date(this.placeDeparted).toISOString() : void 0, latitude: i(this.placeLatitude), longitude: i(this.placeLongitude), address: this.placeAddress, description: this.placeDescription };
  }
  editPlace(i) {
    this.editingPlaceId = i.id, this.placeName = i.name, this.placeType = i.place_type || i.stop_type, this.placeArrived = i.arrived_at ? this.placeLocalDateTime(i.arrived_at) : this.placeLocalDateTime(i.occurred_at), this.placeDeparted = i.departed_at ? this.placeLocalDateTime(i.departed_at) : "", this.placeLatitude = i.latitude == null ? "" : String(i.latitude), this.placeLongitude = i.longitude == null ? "" : String(i.longitude), this.placeDescription = i.description || "", this.placeAddress = i.address || "", this.requestUpdate();
  }
  placeLocalDateTime(i) {
    const s = new Date(i), a = (h) => String(h).padStart(2, "0");
    return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
  }
  startInterruption(i) {
    if (i.existing_place_id) {
      const a = (this.snapshot?.stops ?? []).find((h) => h.id === i.existing_place_id);
      a && this.editPlace(a);
      return;
    }
    this.editingPlaceId = "", this.interruptionDriveId = i.previous_drive_id, this.placeName = "", this.placeType = "other", this.placeArrived = this.placeLocalDateTime(i.started_at), this.placeDeparted = this.placeLocalDateTime(i.ended_at);
    const s = i.previous_end_point;
    this.placeLatitude = s ? String(s.latitude) : "", this.placeLongitude = s ? String(s.longitude) : "", this.placeDescription = "", this.placeAddress = "", this.selected = this.activeTripId, this.requestUpdate();
  }
  async savePlace(i) {
    if (!(!this.hass || this.placeSaving || !this.placeName.trim() || !this.placeArrived)) {
      this.placeSaving = !0;
      try {
        const s = this.placePayload();
        if (this.editingPlaceId) await ha(this.hass, this.vehicleId, this.editingPlaceId, s);
        else {
          const a = await Jr(this.hass, this.vehicleId, i, s);
          ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType) && await ua(this.hass, this.vehicleId, a.stop_id, { place_kind: this.placeType });
        }
        this.resetPlaceForm(), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
      } catch {
        this.fail($(this.hass).placeSaveError ?? $(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  async removePlace(i, s) {
    if (this.hass) {
      if (this.confirmingPlaceId !== i.id) {
        this.confirmingPlaceId = i.id, this.requestUpdate();
        return;
      }
      try {
        await ca(this.hass, this.vehicleId, i.id), this.confirmingPlaceId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail($(this.hass).placeDeleteError ?? $(this.hass).loadError);
      }
    }
  }
  async saveRating(i, s) {
    if (!this.hass) return;
    const a = [this.ratingOverall, this.ratingAccess, this.ratingSpace, this.ratingFacilities, this.ratingSurroundings];
    if (!this.ratingOverall || a.slice(1).some((h) => h && (!/^\d$/.test(h) || Number(h) < 1 || Number(h) > 5))) return this.fail($(this.hass).ratingInvalid ?? $(this.hass).dateInvalid);
    try {
      await pa(this.hass, this.vehicleId, i, { overall: Number(this.ratingOverall), large_rv_access: this.ratingAccess ? Number(this.ratingAccess) : void 0, space_maneuvering: this.ratingSpace ? Number(this.ratingSpace) : void 0, facilities: this.ratingFacilities ? Number(this.ratingFacilities) : void 0, surroundings: this.ratingSurroundings ? Number(this.ratingSurroundings) : void 0, review_text: this.ratingText }), this.ratingPlaceId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: s });
    } catch {
      this.fail($(this.hass).ratingSaveError ?? $(this.hass).loadError);
    }
  }
  async removeRating(i, s) {
    if (this.hass)
      try {
        await fa(this.hass, this.vehicleId, i), this.ratingPlaceId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: s });
      } catch {
        this.fail($(this.hass).ratingSaveError ?? $(this.hass).loadError);
      }
  }
  startRating(i) {
    this.ratingPlaceId = i.id, this.ratingOverall = i.rating_overall ? String(i.rating_overall) : "", this.ratingAccess = i.large_rv_access ? String(i.large_rv_access) : "", this.ratingSpace = i.space_maneuvering ? String(i.space_maneuvering) : "", this.ratingFacilities = i.facilities ? String(i.facilities) : "", this.ratingSurroundings = i.surroundings ? String(i.surroundings) : "", this.ratingText = i.review_text || "", this.requestUpdate();
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
      const i = this.embeddedTripId() || si(this.vehicleId);
      this.activeTripId || (this.activeTripId = i);
      let s = await St(this.hass, this.vehicleId, this.activeTripId || void 0);
      const a = s.trips.find((h) => h.id === this.activeTripId) ?? s.trips.find((h) => h.status === "active") ?? s.trips[0];
      a && this.activeTripId !== a.id ? (this.activeTripId = a.id, this.embeddedTripId() || Dt({ vehicleId: this.vehicleId, tripId: this.activeTripId, source: "manager" }), s = await St(this.hass, this.vehicleId, this.activeTripId)) : a && !this.embeddedTripId() && Dt({ vehicleId: this.vehicleId, tripId: a.id, source: "manager" }), this.snapshot = s;
      try {
        const h = await ri(this.hass);
        this.vehicleName = h.find((u) => u.vehicle_id === this.vehicleId)?.name || "";
      } catch {
        this.vehicleName = "";
      }
      return this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = $(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(i) {
    this.actionError = i, this.requestUpdate();
  }
  async readGPX(i) {
    const s = i.currentTarget.files?.[0];
    if (!(!s || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = s.name;
      try {
        const a = new Uint8Array(await s.arrayBuffer());
        let h = "";
        a.forEach((u) => {
          h += String.fromCharCode(u);
        }), this.gpxContent = btoa(h), this.gpxPreview = await xa(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((u) => u.key)), this.gpxTripId = this.activeTripId;
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
        const i = this.gpxTripId || void 0;
        await ba(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], i), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i ?? "" });
      } catch {
        this.gpxError = $(this.hass).gpxImportError;
      } finally {
        this.gpxBusy = !1, this.requestUpdate();
      }
    }
  }
  setExpenseAmount(i) {
    this.amount = i, this.requestUpdate();
  }
  setEditingExpenseAmount(i) {
    this.editingAmount = i, this.requestUpdate();
  }
  setExpenseCategory(i) {
    if (!ji(i)) return this.fail($(this.hass).categoryInvalid);
    this.category = i, this.requestUpdate();
  }
  setEditingExpenseCategory(i) {
    if (!ji(i)) return this.fail($(this.hass).categoryInvalid);
    this.editingCategory = i, this.requestUpdate();
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
    const a = s.start.slice(0, 10), h = s.end.slice(0, 10);
    return !!(i.start_date && a < i.start_date || i.end_date && h > i.end_date);
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail($(this.hass).dateInvalid);
      try {
        await Xr(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: this.activeTripId });
      } catch {
        this.fail($(this.hass).tripCreateError);
      }
    }
  }
  startTripEdit(i) {
    this.actionError = "", this.editingTripId = i.id, this.editingTripTitle = i.title, this.editingDestination = i.destination || "", this.editingStartDate = i.start_date || "", this.editingEndDate = i.end_date || "", this.requestUpdate();
  }
  cancelTripEdit() {
    this.editingTripId = "", this.actionError = "", this.requestUpdate();
  }
  async saveTrip(i) {
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail($(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail($(this.hass).dateInvalid);
    try {
      await ta(this.hass, this.vehicleId, i.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i.id });
    } catch {
      this.fail($(this.hass).tripEditError);
    }
  }
  async removeTrip(i) {
    if (this.hass) {
      if (this.confirmingTripId !== i) {
        this.confirmingTripId = i, this.requestUpdate();
        return;
      }
      try {
        await ea(this.hass, this.vehicleId, i), this.confirmingTripId = "", this.selected === i && (this.selected = ""), this.activeTripId === i && (this.activeTripId = ""), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
      } catch {
        this.fail($(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(i, s) {
    if (this.hass)
      try {
        await Yr(this.hass, this.vehicleId, i, s), this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
      } catch {
        this.fail($(this.hass).statusError);
      }
  }
  async assignDrive(i, s) {
    if (this.hass)
      try {
        await na(this.hass, this.vehicleId, i, [s]), this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
      } catch {
        this.fail($(this.hass).driveAssignError);
      }
  }
  async unassignDrive(i, s) {
    if (this.hass)
      try {
        await ia(this.hass, this.vehicleId, i, s), this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
      } catch {
        this.fail($(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(i) {
    this.selected = this.selected === i ? "" : i, this.selected ? (this.activeTripId = i, Dt({ vehicleId: this.vehicleId, tripId: i, source: "manager" }), this.refresh()) : this.requestUpdate();
  }
  async addManualDrive(i) {
    if (!this.hass || this.manualSaving) return;
    const s = Number(this.manualDistanceKm.replace(",", ".")), a = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(s) || s < 0 || a !== void 0 && (!Number.isInteger(a) || a < 0)) return this.fail($(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await ra(this.hass, this.vehicleId, { trip_id: i, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: s, ...a === void 0 ? {} : { duration_minutes: a } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
    } catch {
      this.fail($(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(i) {
    const s = new Date(i), a = (h) => String(h).padStart(2, "0");
    return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
  }
  startManualDriveEdit(i) {
    this.actionError = "", this.editingDriveId = i.id, this.editingDriveOccurredAt = this.localDateTime(i.started_at), this.editingDriveStartLocation = i.start_label || "", this.editingDriveEndLocation = i.end_label || "", this.editingDriveDistanceKm = (i.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = i.duration_seconds ? String(Math.round(i.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(i, s) {
    if (!this.hass || this.driveSavingId) return;
    const a = Number(this.editingDriveDistanceKm.replace(",", ".")), h = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(a) || a < 0 || h !== void 0 && (!Number.isInteger(h) || h < 0)) return this.fail($(this.hass).dateInvalid);
    this.driveSavingId = i.id;
    try {
      await sa(this.hass, this.vehicleId, i.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: a, ...h === void 0 ? {} : { duration_minutes: h } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: s });
    } catch {
      this.fail($(this.hass).driveEditError);
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
        await oa(this.hass, this.vehicleId, s), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), Q({ vehicleId: this.vehicleId, tripId: i });
      } catch {
        this.fail($(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(i) {
    if (!this.hass) return;
    const s = $(this.hass), a = Or(this.amount);
    if (a === null) return this.fail(s.amountInvalid);
    try {
      await aa(this.hass, this.vehicleId, i, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: a, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", Wi({ vehicleId: this.vehicleId, tripId: i }));
    } catch {
      this.fail(s.expenseCreateError);
    }
  }
  startExpenseEdit(i) {
    this.actionError = "", this.editingExpenseId = i.id, this.editingAmount = (i.amount_minor / 100).toFixed(2), this.editingCategory = i.category, this.requestUpdate();
  }
  cancelExpenseEdit() {
    this.editingExpenseId = "", this.editingAmount = "", this.editingCategory = "other", this.actionError = "", this.requestUpdate();
  }
  async saveExpense(i) {
    if (!this.hass || this.expenseSavingId) return;
    const s = $(this.hass), a = Or(this.editingAmount);
    if (a === null) return this.fail(s.amountInvalid);
    if (!ji(this.editingCategory)) return this.fail(s.categoryInvalid);
    this.expenseSavingId = i.id;
    try {
      await la(this.hass, this.vehicleId, i.id, { amount_minor: a, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), Wi({ vehicleId: this.vehicleId, tripId: i.trip_id ?? this.activeTripId }));
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
        await va(this.hass, this.vehicleId, i), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && Wi({ vehicleId: this.vehicleId, tripId: this.activeTripId });
      } catch {
        this.fail($(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(i) {
    const s = [...Ke];
    return i && !s.includes(i) && s.unshift(i), s;
  }
  async downloadPdf(i) {
    if (!(!this.hass || this.pdfBusyTripId)) {
      this.pdfBusyTripId = i.id, this.actionError = "", this.requestUpdate();
      try {
        const s = await ya(this.hass, this.vehicleId, i.id), a = atob(s.pdf_base64), h = Uint8Array.from(a, (x) => x.charCodeAt(0)), u = URL.createObjectURL(new Blob([h], { type: s.content_type })), m = document.createElement("a");
        m.href = u, m.download = s.filename, m.click(), window.setTimeout(() => URL.revokeObjectURL(u), 1e3);
      } catch {
        this.fail($(this.hass).pdfExportError);
      } finally {
        this.pdfBusyTripId = "", this.requestUpdate();
      }
    }
  }
  renderExpense(i, s) {
    const a = this.editingExpenseId === i.id, h = this.expenseSavingId === i.id;
    return _`<div class="expense-row">${a ? _`<form class="expense-form" @submit=${(u) => {
      u.preventDefault(), this.saveExpense(i);
    }}><select aria-label=${s.category} .value=${this.editingCategory} @change=${(u) => this.setEditingExpenseCategory(u.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((u) => _`<option value=${u}>${Ye(u, this.hass)}</option>`)}</select><input aria-label=${s.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(u) => this.setEditingExpenseAmount(u.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${h}>${h ? s.saving : s.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${h}>${s.cancel}</button></div></form>` : _`<span>${Ye(i.category, this.hass)}: ${Pt(i.amount_minor, i.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(i)} ?disabled=${!!this.expenseSavingId}>${s.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(i.id)}>${this.confirmingExpenseId === i.id ? s.confirmDelete : s.remove}</button></span>`}</div>`;
  }
  renderDrive(i, s, a) {
    const h = i.source === "manual" ? a.sourceManual : i.source === "gpx" ? a.sourceGpx ?? a.sourceGps : a.sourceGps, u = `${a.driveStart}: ${K(i.started_at, this.hass)} · ${a.driveEnd}: ${i.ended_at ? K(i.ended_at, this.hass) : "–"}`;
    if (this.editingDriveId === i.id) return _`<form class="form-grid drive-edit-form" @submit=${(p) => {
      p.preventDefault(), this.saveManualDrive(i, s);
    }}><label>${a.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(p) => this.editingDriveOccurredAt = p.currentTarget.value}></label><input aria-label=${a.startLocation} .value=${this.editingDriveStartLocation} @input=${(p) => this.editingDriveStartLocation = p.currentTarget.value}><input aria-label=${a.endLocation} .value=${this.editingDriveEndLocation} @input=${(p) => this.editingDriveEndLocation = p.currentTarget.value}><input aria-label=${a.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(p) => this.editingDriveDistanceKm = p.currentTarget.value}><input aria-label=${a.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(p) => this.editingDriveDurationMinutes = p.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === i.id}>${this.driveSavingId === i.id ? a.saving : a.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${a.cancel}</button></form>`;
    const m = i.trip_id === s ? _`<button type="button" class="link" @click=${() => this.unassignDrive(s, i.id)}>${a.unassign}</button>` : _`<button type="button" class="link" @click=${() => this.assignDrive(s, i.id)}>${a.assign}</button>`, x = i.source === "manual" ? _`<button type="button" class="link" @click=${() => this.startManualDriveEdit(i)} ?disabled=${!!this.driveSavingId}>${a.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(s, i.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === i.id ? a.confirmDelete : a.remove}</button>` : "";
    return _`<div class="drive-row"><div><strong>${h}</strong> · ${u}${i.start_label || i.end_label ? _`<br><span class="muted">${i.start_label || "–"} → ${i.end_label || "–"}</span>` : ""}<br><span class="muted">${(i.distance_m / 1e3).toFixed(1)} km · ${i.duration_seconds ? Ct(i.duration_seconds, this.hass) : "–"} · ${i.assignment_status === "assigned" ? a.assignedDrives : a.freeDrives}</span></div><span class="actions">${x}${m}</span></div>`;
  }
  renderInterruptions(i, s) {
    const a = this.snapshot?.interruptions ?? [];
    return _`<section class="place-section"><details open><summary><strong>${i.interruption ?? "Unterbrechungen zwischen Fahrten"}</strong><span>${a.length}</span></summary>${a.length ? a.map((h) => _`<article class="interruption-row"><div><strong>${K(h.started_at, this.hass)} → ${K(h.ended_at, this.hass)}</strong><span class="muted">${Ct(h.duration_seconds, this.hass)} · ${i.interruptionUnconfirmed ?? "Nicht als Aufenthalt nachgewiesen"}</span></div>${h.existing_place_id ? _`<button type="button" class="link" @click=${() => this.startInterruption(h)}>${i.edit}</button>` : _`<button type="button" @click=${() => this.startInterruption(h)}>${i.recordInterruption ?? "Als Aufenthalt erfassen"}</button>`}</article>`) : _`<p class="muted">${i.noPlaces ?? "Keine Unterbrechungen zwischen Fahrten."}</p>`}</details></section>`;
  }
  renderGpx(i, s, a) {
    const h = !!this.embeddedTripId(), u = s.find((p) => p.id === this.gpxTripId), m = this.gpxPeriod(), x = this.gpxTripPeriodWarning(u);
    return _`<section class="gpx-import gpx-explicit"><h3>${i.gpxImport}</h3><p class="muted"><strong>${h ? i.gpxTargetTrip ?? "Reise" : i.gpxVehicle}:</strong> ${h ? u?.title || "" : this.vehicleName || i.editorVehicle}</p>${h ? "" : _`<label>${i.gpxTargetTrip}<select aria-label=${i.gpxTargetTrip} .value=${this.gpxTripId} @change=${(p) => {
      this.gpxTripId = p.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.gpxNoTrip}</option>${s.map((p) => _`<option value=${p.id}>${p.title} · ${re(p.status, this.hass)} · ${At(p, this.hass) || i.period}</option>`)}</select></label>`}<input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(p) => this.readGPX(p)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || i.gpxPrivacy}</p>${this.gpxError ? _`<p class="error" role="alert">${this.gpxError}</p>` : ""}${a ? _`<div class="gpx-preview"><strong>${a.drives.length} ${i.gpxSections}, ${a.points.length} ${i.gpxPoints}</strong>${m ? _`<p class="muted">${i.gpxPeriod}: ${K(m.start, this.hass)} – ${K(m.end, this.hass)}</p>` : ""}${x ? _`<p class="warning" role="alert">${i.gpxPeriodWarning}</p>` : ""}<h3>${i.gpxSummary}</h3><p class="muted">${a.points.length} ${i.gpxPoints}, ${this.gpxSelected.size} ${i.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${i.gpxDistance}, ${u?.title || i.gpxNoTrip}</p><div class="gpx-drive-list">${a.drives.map((p) => _`<label><input type="checkbox" .checked=${this.gpxSelected.has(p.key)} @change=${(y) => {
      y.currentTarget.checked ? this.gpxSelected.add(p.key) : this.gpxSelected.delete(p.key), this.requestUpdate();
    }}> ${K(p.started_at, this.hass)} – ${K(p.ended_at, this.hass)} · ${(p.distance_m / 1e3).toFixed(1)} km · ${Ct(p.duration_seconds, this.hass)}</label>`)}</div>${a.warnings.length ? _`<p class="muted">${i.gpxWarnings}: ${a.warnings.map((p) => p === "gpx_gap_possible_drive_boundary" ? i.gpxGapBoundary : p).join(", ")}</p>` : ""}${a.conflicts.duplicate_file ? _`<p class="error" role="alert">${i.gpxDuplicate}</p>` : _`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? i.saving : i.gpxConfirm}</button>`}</div>` : ""}</section>`;
  }
  renderPdfExport(i, s) {
    if (!s.length) return "";
    const a = s.some((u) => u.id === this.activeTripId) ? this.activeTripId : s[0].id, h = s.find((u) => u.id === a) ?? s[0];
    return _`<section class="pdf-export"><h3>${i.pdfExportTitle}</h3><p class="muted">${h.title} · ${At(h, this.hass)}</p><div class="pdf-export-row"><button type="button" @click=${() => {
      this.downloadPdf(h);
    }} ?disabled=${!!this.pdfBusyTripId}>${this.pdfBusyTripId ? i.pdfExporting : i.pdfExport}</button></div></section>`;
  }
  renderSuggestions(i, s) {
    const a = this.snapshot?.stop_suggestions ?? [];
    return _`<section class="place-section"><h3>${i.gpsSuggestions ?? "GPS-Stoppvorschläge"}</h3><button type="button" @click=${() => {
      this.refreshSuggestions(s);
    }}>${i.generateSuggestions ?? "Vorschläge aktualisieren"}</button>${a.length ? _`<ul>${a.map((h) => _`<li>${K(h.arrived_at, this.hass)} – ${K(h.departed_at || h.arrived_at, this.hass)}${this.suggestionEditingId === h.id ? _`<div class="form-grid"><input aria-label=${i.placeName ?? "Name"} .value=${this.suggestionName} @input=${(u) => this.suggestionName = u.currentTarget.value}><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.suggestionType} @change=${(u) => this.suggestionType = u.currentTarget.value}><option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option></select></div>` : ""} <button type="button" @click=${() => {
      this.acceptSuggestion(h, s);
    }}>${this.suggestionEditingId === h.id ? i.save ?? "Speichern" : i.accept ?? "Übernehmen"}</button><button type="button" class="secondary" @click=${() => {
      this.dismissSuggestion(h, s);
    }}>${i.dismiss ?? "Verwerfen"}</button></li>`)}</ul>` : _`<p class="muted">${i.noSuggestions ?? "Keine offenen Vorschläge."}</p>`}</section>`;
  }
  starPicker(i, s, a) {
    return _`<fieldset class="star-picker"><legend>${i}</legend><div role="radiogroup" aria-label=${i}>${[1, 2, 3, 4, 5].map((h) => _`<button type="button" class="star-button" role="radio" aria-label=${`${h}/5`} aria-checked=${s === String(h)} ?data-selected=${s === String(h)} @click=${() => {
      a(String(h)), this.requestUpdate();
    }} @keydown=${(u) => {
      (u.key === "ArrowRight" || u.key === "ArrowUp") && (u.preventDefault(), a(String(Math.min(5, h + 1))), this.requestUpdate()), (u.key === "ArrowLeft" || u.key === "ArrowDown") && (u.preventDefault(), a(String(Math.max(1, h - 1))), this.requestUpdate());
    }}>${s && Number(s) >= h ? "★" : "☆"}</button>`)}</div></fieldset>`;
  }
  renderPlaces(i, s) {
    const a = this.snapshot?.stops ?? [], h = _`<option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option>`;
    return _`<section class="place-section"><details open><summary><strong>${i.places ?? "Orte und Zwischenstopps"}</strong><span>${a.length}</span></summary><form class="form-grid" @submit=${(u) => {
      u.preventDefault(), this.savePlace(s);
    }}><input aria-label=${i.placeName ?? "Name"} placeholder=${i.placeName ?? "Name"} .value=${this.placeName} @input=${(u) => this.placeName = u.currentTarget.value} required><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.placeType} @change=${(u) => this.placeType = u.currentTarget.value}>${h}</select><label>${i.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.placeArrived} @input=${(u) => this.placeArrived = u.currentTarget.value} required></label><label>${i.placeDeparted ?? "Abfahrt"}<input type="datetime-local" .value=${this.placeDeparted} @input=${(u) => this.placeDeparted = u.currentTarget.value}></label><input aria-label=${i.placeAddress ?? "Adresse"} placeholder=${i.placeAddress ?? "Adresse"} .value=${this.placeAddress} @input=${(u) => this.placeAddress = u.currentTarget.value}><input aria-label="Latitude" inputmode="decimal" placeholder="Latitude" .value=${this.placeLatitude} @input=${(u) => this.placeLatitude = u.currentTarget.value}><input aria-label="Longitude" inputmode="decimal" placeholder="Longitude" .value=${this.placeLongitude} @input=${(u) => this.placeLongitude = u.currentTarget.value}><textarea aria-label=${i.placeDescription ?? "Notizen"} placeholder=${i.placeDescription ?? "Beschreibung und Notizen"} .value=${this.placeDescription} @input=${(u) => this.placeDescription = u.currentTarget.value}></textarea><div class="actions"><button type="submit" ?disabled=${this.placeSaving}>${this.placeSaving ? i.saving : this.editingPlaceId ? i.save : i.create ?? "Anlegen"}</button>${this.editingPlaceId ? _`<button type="button" class="secondary" @click=${() => this.resetPlaceForm()}>${i.cancel}</button>` : ""}</div></form>${a.length ? _`<div class="place-list">${a.map((u) => _`<article class="place-row"><div><strong>${u.name}</strong><span class="muted">${u.place_type || u.stop_type} · ${K(u.arrived_at || u.occurred_at, this.hass)}${u.duration_seconds ? ` · ${Ct(u.duration_seconds, this.hass)}` : ""}${u.rating_overall ? ` · ${u.rating_overall}/5` : ""}</span><span>${u.description || ""}</span></div><div class="actions"><button type="button" class="link" @click=${() => this.editPlace(u)}>${i.edit}</button><button type="button" class="link" @click=${() => {
      this.removePlace(u, s);
    }}>${this.confirmingPlaceId === u.id ? i.confirmDelete : i.remove}</button><button type="button" class="link" @click=${() => this.startRating(u)}>${u.rating_overall ? i.ratingEdit ?? "Bewertung" : i.ratingAdd ?? "Bewerten"}</button></div>${this.ratingPlaceId === u.id ? _`<div class="rating-form form-grid">${this.starPicker(i.ratingOverall ?? "Gesamt", this.ratingOverall, (m) => this.ratingOverall = m)}${this.starPicker(i.ratingAccess ?? "Anfahrt", this.ratingAccess, (m) => this.ratingAccess = m)}${this.starPicker(i.ratingSpace ?? "Platzgröße", this.ratingSpace, (m) => this.ratingSpace = m)}${this.starPicker(i.ratingFacilities ?? "Ausstattung", this.ratingFacilities, (m) => this.ratingFacilities = m)}${this.starPicker(i.ratingSurroundings ?? "Umgebung", this.ratingSurroundings, (m) => this.ratingSurroundings = m)}<textarea aria-label=${i.ratingComment ?? "Kommentar"} .value=${this.ratingText} @input=${(m) => this.ratingText = m.currentTarget.value}></textarea><button type="button" @click=${() => {
      this.saveRating(u.id, s);
    }}>${i.save}</button></div>` : ""}</article>`)}</div>` : _`<p class="muted">${i.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details></section>`;
  }
  renderRatingActions(i, s) {
    const a = (this.snapshot?.stops ?? []).filter((h) => h.rating_overall);
    return a.length ? _`<section class="place-section"><details><summary><strong>${i.ratingEdit ?? "Bewertungen"}</strong><span>${a.length}</span></summary>${a.map((h) => _`<div class="row"><span>${h.name} · ${h.rating_overall}/5</span><button type="button" class="link" @click=${() => {
      this.removeRating(h.id, s);
    }}>${i.ratingRemove ?? "Bewertung löschen"}</button></div>`)}</details></section>` : "";
  }
  render() {
    const i = $(this.hass), s = this.snapshot?.trips ?? [];
    if (!this.embeddedTripId()) return _`${this.renderGpx(i, s, this.gpxPreview)}${this.renderPdfExport(i, s)}${this.activeTripId ? this.renderInterruptions(i, this.activeTripId) : ""}${this.activeTripId ? this.renderSuggestions(i, this.activeTripId) : ""}${this.activeTripId ? this.renderPlaces(i, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(i, this.activeTripId) : ""}${this.renderLegacy()}`;
    const a = this.embeddedSection();
    return _`${a === "gpx" ? this.renderGpx(i, s, this.gpxPreview) : ""}${a === "pdf" ? this.renderPdfExport(i, s) : ""}${a === "places" ? _`${this.activeTripId ? this.renderInterruptions(i, this.activeTripId) : ""}${this.activeTripId ? this.renderSuggestions(i, this.activeTripId) : ""}${this.activeTripId ? this.renderPlaces(i, this.activeTripId) : ""}${this.activeTripId ? this.renderRatingActions(i, this.activeTripId) : ""}` : ""}${a === "expenses" ? this.renderEmbeddedExpenses(i) : ""}`;
  }
  renderEmbeddedExpenses(i) {
    const s = this.snapshot?.expenses ?? [], a = this.snapshot?.expense_summary?.total_minor !== void 0 && this.snapshot.expense_summary.currency ? Pt(this.snapshot.expense_summary.total_minor, this.snapshot.expense_summary.currency, this.hass) : Pt(0, "EUR", this.hass);
    return _`<section class="place-section"><details><summary><strong>${i.expenses}</strong><span>${s.length}</span></summary><div class="expense-form create-form"><input aria-label=${i.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(h) => this.setExpenseAmount(h.currentTarget.value)}><select aria-label=${i.category} .value=${this.category} @change=${(h) => this.setExpenseCategory(h.currentTarget.value)}>${Ke.map((h) => _`<option value=${h}>${Ye(h, this.hass)}</option>`)}</select><button type="button" @click=${() => {
      this.addExpense(this.embeddedTripId());
    }}>${i.save}</button></div>${s.map((h) => this.renderExpense(h, i))}<p class="total"><strong>${i.total}: ${a}</strong></p></details></section>`;
  }
  renderLegacy() {
    const i = $(this.hass), s = this.snapshot?.trips ?? [], a = this.snapshot?.expenses ?? [], h = this.snapshot?.expense_summary, u = h?.mixed_currency ? i.mixedCurrency : h?.total_minor !== void 0 && h.currency ? Pt(h.total_minor, h.currency, this.hass) : Pt(0, "EUR", this.hass), m = this.loadError || this.actionError, x = this.gpxPreview;
    return _`<ha-card><h2>${i.manager}</h2>${m ? _`<p class="error" role="alert">${m}</p>` : ""}<section class="gpx-import"><h3>${i.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(p) => this.readGPX(p)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || i.gpxPrivacy}</p>${this.gpxError ? _`<p class="error" role="alert">${this.gpxError}</p>` : ""}${x ? _`<div class="gpx-preview"><strong>${x.drives.length} ${i.gpxSections}, ${x.points.length} ${i.gpxPoints}</strong><ul>${x.drives.map((p) => _`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(p.key)} @change=${(y) => {
      y.currentTarget.checked ? this.gpxSelected.add(p.key) : this.gpxSelected.delete(p.key), this.requestUpdate();
    }}> ${K(p.started_at, this.hass)} – ${K(p.ended_at, this.hass)} · ${(p.distance_m / 1e3).toFixed(1)} km · ${Ct(p.duration_seconds, this.hass)}</label></li>`)}</ul>${x.warnings.length ? _`<p class="muted">${i.gpxWarnings}: ${x.warnings.join(", ")}</p>` : ""}${x.conflicts.duplicate_file ? _`<p class="error" role="alert">${i.gpxDuplicate}</p>` : _`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? i.saving : i.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${i.newTrip}</h3><div class="form-grid"><input aria-label=${i.tripName} placeholder=${i.tripName} .value=${this.tripTitle} @input=${(p) => this.tripTitle = p.target.value}><input aria-label=${i.destination} placeholder=${i.destination} .value=${this.destination} @input=${(p) => this.destination = p.target.value}><label>${i.startDate}<input type="date" .value=${this.tripStartDate} @input=${(p) => this.tripStartDate = p.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.tripEndDate} @input=${(p) => this.tripEndDate = p.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${i.create}</button></div></section><section><h3>${i.trips}</h3>${s.length ? s.map((p) => _`<article class="trip"><div class="row"><strong>${p.title}</strong><span class="muted">${p.destination || ""} · ${re(p.status, this.hass)} · ${At(p, this.hass) || i.period}</span></div>${this.editingTripId === p.id ? _`<form class="form-grid" @submit=${(y) => {
      y.preventDefault(), this.saveTrip(p);
    }}><input aria-label=${i.tripName} .value=${this.editingTripTitle} @input=${(y) => this.editingTripTitle = y.currentTarget.value}><input aria-label=${i.destination} .value=${this.editingDestination} @input=${(y) => this.editingDestination = y.currentTarget.value}><label>${i.startDate}<input type="date" .value=${this.editingStartDate} @input=${(y) => this.editingStartDate = y.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.editingEndDate} @input=${(y) => this.editingEndDate = y.currentTarget.value}></label><button type="submit">${i.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${i.cancel}</button></form>` : _`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(p)}>${i.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(p.id)}>${this.confirmingTripId === p.id ? i.confirmDelete : i.remove}</button>${p.status === "planned" || p.status === "paused" ? _`<button type="button" @click=${() => this.changeStatus(p.id, "active")}>${i.resume}</button>` : ""}${p.status === "active" ? _`<button type="button" class="secondary" @click=${() => this.changeStatus(p.id, "paused")}>${i.pause}</button><button type="button" @click=${() => this.changeStatus(p.id, "completed")}>${i.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(p.id)}>${this.selected === p.id ? i.close : i.details}</button></div>`}${this.selected === p.id ? _`<div class="details"><h4>${i.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((y) => this.renderDrive(y, p.id, i)) : _`<p class="muted">${i.noDrives}</p>`}<h4>${i.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((y) => this.renderDrive(y, p.id, i)) : _`<p class="muted">${i.noDrives}</p>`}<h4>${i.manualDrive}</h4><div class="form-grid"><label>${i.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(y) => this.manualOccurredAt = y.currentTarget.value}></label><input aria-label=${i.startLocation} placeholder=${i.startLocation} .value=${this.manualStartLocation} @input=${(y) => this.manualStartLocation = y.currentTarget.value}><input aria-label=${i.endLocation} placeholder=${i.endLocation} .value=${this.manualEndLocation} @input=${(y) => this.manualEndLocation = y.currentTarget.value}><input aria-label=${i.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${i.distanceKm} .value=${this.manualDistanceKm} @input=${(y) => this.manualDistanceKm = y.currentTarget.value}><input aria-label=${i.durationMinutes} type="number" min="0" step="1" placeholder=${i.durationMinutes} .value=${this.manualDurationMinutes} @input=${(y) => this.manualDurationMinutes = y.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(p.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? i.saving : i.createDrive}</button></div><h4>${i.expenses}</h4><div class="expense-form create-form"><input aria-label=${i.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(y) => this.setExpenseAmount(y.currentTarget.value)}><select aria-label=${i.category} .value=${this.category} @change=${(y) => this.setExpenseCategory(y.currentTarget.value)}>${Ke.map((y) => _`<option value=${y}>${Ye(y, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(p.id)}>${i.save}</button></div>${a.map((y) => this.renderExpense(y, i))}<p class="total"><strong>${i.total}: ${u}</strong></p></div>` : ""}</article>`) : _`<p class="muted">${i.noTrip}</p>`}</section></ha-card>`;
  }
}
ti.styles = [zt.styles, Mt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
ti.styles = [...ti.styles, Mt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.interruption-row{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid var(--divider-color)}.interruption-row>div{display:grid;gap:3px;min-width:0}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}.star-picker{border:0;padding:0;margin:0;min-width:0}.star-picker legend{font-size:.9em;color:var(--secondary-text-color)}.star-picker [role=radiogroup]{display:flex;gap:2px}.star-button{min-height:38px;min-width:38px;padding:2px;background:transparent;color:var(--secondary-text-color);font-size:1.6rem;line-height:1}.star-button[data-selected]{color:var(--primary-color)}.star-button:hover{color:var(--primary-color)}@media(max-width:500px){.form-grid{grid-template-columns:1fr}.form-grid textarea{min-height:5rem}.place-section .form-grid{gap:10px}.place-section .actions{display:grid;grid-template-columns:1fr}.place-section .actions button{width:100%}.interruption-row{align-items:stretch;flex-direction:column}.interruption-row button{width:100%}.pdf-export-row button{width:100%}}`];
ni("camper-travel-journal-manager-card", ti);
const Ta = 1e4;
function qi() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Gi(c) {
  return c.length <= 8 ? "••••" : `${c.slice(0, 4)}…${c.slice(-4)}`;
}
function Rr(c) {
  return c?.connection ? c.connection.connected === !0 ? "available" : c.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function $a(c) {
  const i = c, s = typeof i?.code == "string" ? i.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", a = typeof i?.message == "string" ? i.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: s, errorMessage: a };
}
function Pa(c, i) {
  return new Promise((s, a) => {
    const h = setTimeout(() => a(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), i);
    c.then((u) => {
      clearTimeout(h), s(u);
    }, (u) => {
      clearTimeout(h), a(u);
    });
  });
}
async function Vi(c, i, s, a) {
  const h = qi();
  try {
    const u = await Pa(c.connection.sendMessagePromise(i), a);
    return { ...s(u), durationMs: Math.round(qi() - h), value: u };
  } catch (u) {
    return { state: "failed", durationMs: Math.round(qi() - h), ...$a(u) };
  }
}
function Sa(c) {
  return c && typeof c == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function Ea(c) {
  const i = c?.vehicles;
  return Array.isArray(i) && i.every((s) => s && typeof s == "object" && typeof s.vehicle_id == "string") ? { state: "success", structure: "ok", count: i.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function La(c) {
  const i = c;
  return Array.isArray(i?.trips) && Array.isArray(i?.drives) && Array.isArray(i?.stops) ? { state: "success", structure: "ok", count: i.trips.length, drivesCount: i.drives.length, stopsCount: i.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function ka(c, i, s = Ta) {
  const a = { state: "not_run", durationMs: null };
  if (!c?.connection) return { version: "0.3.0-beta.5", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: a, vehicles: a, trips: a, vehicleId: Gi(i) };
  const h = Rr(c), u = await Vi(c, { type: "auth/current_user" }, Sa, s), m = await Vi(c, { type: "camper_travel_journal/list_vehicles" }, Ea, s), x = m.value?.vehicles?.filter((se) => typeof se.vehicle_id == "string") ?? [], p = x.length === 1 ? x[0].vehicle_id : void 0, P = await Vi(c, { type: "camper_travel_journal/list", vehicle_id: p ?? i }, La, s), { value: b, ...z } = u, { value: T, ...B } = m, { value: M, ...Wt } = P;
  return {
    version: "0.3.0-beta.5",
    connectionBefore: h,
    connectionAfter: Rr(c),
    authentication: z,
    vehicles: B,
    trips: Wt,
    vehicleId: Gi(i),
    ...p ? { resolvedVehicleId: Gi(p) } : {}
  };
}
function Ki(c) {
  return JSON.stringify(c, null, 2);
}
function Yi(c) {
  return c.state === "success" ? "erfolgreich" : c.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const Br = "01M4XW0KD3GQ0KASAYHQ29840P";
class Ia extends Ht {
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
    .migration-notice { margin:0 0 12px; padding:12px; border:1px solid var(--warning-color,#f57c00); border-inline-start:5px solid var(--warning-color,#f57c00); border-radius:8px; background:color-mix(in srgb,var(--warning-color,#f57c00) 12%,var(--card-background-color)); }
    .migration-notice strong { display:block; } .migration-notice p { margin:6px 0; } .migration-notice a { color:var(--primary-color); }
    pre, textarea { max-height: 16rem; width: 100%; box-sizing: border-box; overflow: auto; white-space: pre-wrap; font-size: .78rem; background: var(--secondary-background-color); padding: 8px; }
  `;
  _hass;
  report;
  running = !1;
  error = "";
  manualCopy = !1;
  config = { vehicle_id: Br };
  set hass(i) {
    this._hass = i, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(i) {
    this.config = { vehicle_id: i.vehicle_id || Br };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await ka(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const i = Ki(this.report);
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
    const a = document.createElement("strong");
    a.textContent = "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const h = document.createElement("p");
    h.textContent = "Use the central Camper Travel Journal card for new dashboards. This legacy card remains supported for compatibility.";
    const u = document.createElement("a");
    u.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration", u.target = "_blank", u.rel = "noreferrer", u.textContent = "Migration guide", s.append(a, h, u), i.prepend(s);
  }
  render() {
    const i = this.report;
    return _`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? _`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? _`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${i ? _`<dl>
        <dt>Version</dt><dd>${i.version}</dd>
        <dt>Verbindung vorher</dt><dd>${i.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${i.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${Yi(i.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${Yi(i.vehicles)}${i.vehicles.durationMs === null ? "" : ` (${i.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${Yi(i.trips)}${i.trips.durationMs === null ? "" : ` (${i.trips.durationMs} ms)`}${i.trips.state === "success" ? ` · ${i.trips.count ?? 0} Reisen / ${i.trips.drivesCount ?? 0} Fahrten / ${i.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${i.vehicles.structure === "ok" && i.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Ki(i)}</pre>${this.manualCopy ? _`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Ki(i)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${i ? "Diagnose wiederholen" : "Diagnose starten"}</button>${i ? _`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? _`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", Ia);
var we = { exports: {} };
var Ca = we.exports, Zr;
function Aa() {
  return Zr || (Zr = 1, (function(c, i) {
    (function(s, a) {
      a(i);
    })(Ca, (function(s) {
      var a = "1.9.4";
      function h(t) {
        var e, n, r, o;
        for (n = 1, r = arguments.length; n < r; n++) {
          o = arguments[n];
          for (e in o)
            t[e] = o[e];
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
        var n = Array.prototype.slice;
        if (t.bind)
          return t.bind.apply(t, n.call(arguments, 1));
        var r = n.call(arguments, 2);
        return function() {
          return t.apply(e, r.length ? r.concat(n.call(arguments)) : arguments);
        };
      }
      var x = 0;
      function p(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++x), t._leaflet_id;
      }
      function y(t, e, n) {
        var r, o, l, d;
        return d = function() {
          r = !1, o && (l.apply(n, o), o = !1);
        }, l = function() {
          r ? o = arguments : (t.apply(n, arguments), setTimeout(d, e), r = !0);
        }, l;
      }
      function P(t, e, n) {
        var r = e[1], o = e[0], l = r - o;
        return t === r && n ? t : ((t - o) % l + l) % l + o;
      }
      function b() {
        return !1;
      }
      function z(t, e) {
        if (e === !1)
          return t;
        var n = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * n) / n;
      }
      function T(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function B(t) {
        return T(t).split(/\s+/);
      }
      function M(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? u(t.options) : {});
        for (var n in e)
          t.options[n] = e[n];
        return t.options;
      }
      function Wt(t, e, n) {
        var r = [];
        for (var o in t)
          r.push(encodeURIComponent(n ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + r.join("&");
      }
      var se = /\{ *([\w_ -]+) *\}/g;
      function ln(t, e) {
        return t.replace(se, function(n, r) {
          var o = e[r];
          if (o === void 0)
            throw new Error("No value provided for variable " + n);
          return typeof o == "function" && (o = o(e)), o;
        });
      }
      var ct = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function oi(t, e) {
        for (var n = 0; n < t.length; n++)
          if (t[n] === e)
            return n;
        return -1;
      }
      var ke = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function ai(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var hn = 0;
      function cn(t) {
        var e = +/* @__PURE__ */ new Date(), n = Math.max(0, 16 - (e - hn));
        return hn = e + n, window.setTimeout(t, n);
      }
      var li = window.requestAnimationFrame || ai("RequestAnimationFrame") || cn, dn = window.cancelAnimationFrame || ai("CancelAnimationFrame") || ai("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function et(t, e, n) {
        if (n && li === cn)
          t.call(e);
        else
          return li.call(window, m(t, e));
      }
      function ot(t) {
        t && dn.call(window, t);
      }
      var is = {
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
        splitWords: B,
        setOptions: M,
        getParamString: Wt,
        template: ln,
        isArray: ct,
        indexOf: oi,
        emptyImageUrl: ke,
        requestFn: li,
        cancelFn: dn,
        requestAnimFrame: et,
        cancelAnimFrame: ot
      };
      function yt() {
      }
      yt.extend = function(t) {
        var e = function() {
          M(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, n = e.__super__ = this.prototype, r = u(n);
        r.constructor = e, e.prototype = r;
        for (var o in this)
          Object.prototype.hasOwnProperty.call(this, o) && o !== "prototype" && o !== "__super__" && (e[o] = this[o]);
        return t.statics && h(e, t.statics), t.includes && (ns(t.includes), h.apply(null, [r].concat(t.includes))), h(r, t), delete r.statics, delete r.includes, r.options && (r.options = n.options ? u(n.options) : {}, h(r.options, t.options)), r._initHooks = [], r.callInitHooks = function() {
          if (!this._initHooksCalled) {
            n.callInitHooks && n.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var l = 0, d = r._initHooks.length; l < d; l++)
              r._initHooks[l].call(this);
          }
        }, e;
      }, yt.include = function(t) {
        var e = this.prototype.options;
        return h(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, yt.mergeOptions = function(t) {
        return h(this.prototype.options, t), this;
      }, yt.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), n = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(n), this;
      };
      function ns(t) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          t = ct(t) ? t : [t];
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
            t = B(t);
            for (var o = 0, l = t.length; o < l; o++)
              this._on(t[o], e, n);
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
            t = B(t);
            for (var o = arguments.length === 1, l = 0, d = t.length; l < d; l++)
              o ? this._off(t[l]) : this._off(t[l], e, n);
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
            var o = { fn: e, ctx: n };
            r && (o.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(o);
          }
        },
        _off: function(t, e, n) {
          var r, o, l;
          if (this._events && (r = this._events[t], !!r)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (o = 0, l = r.length; o < l; o++)
                  r[o].fn = b;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var d = this._listens(t, e, n);
            if (d !== !1) {
              var f = r[d];
              this._firingCount && (f.fn = b, this._events[t] = r = r.slice()), r.splice(d, 1);
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
            var o = this._events[t];
            if (o) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var l = 0, d = o.length; l < d; l++) {
                var f = o[l], g = f.fn;
                f.once && this.off(t, g, f.ctx), g.call(f.ctx || this, r);
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
          var o = e;
          typeof e != "function" && (r = !!e, o = void 0, n = void 0);
          var l = this._events && this._events[t];
          if (l && l.length && this._listens(t, o, n) !== !1)
            return !0;
          if (r) {
            for (var d in this._eventParents)
              if (this._eventParents[d].listens(t, e, n, r))
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
          for (var o = 0, l = r.length; o < l; o++)
            if (r[o].fn === e && r[o].ctx === n)
              return o;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(t, e, n) {
          if (typeof t == "object")
            for (var r in t)
              this._on(r, t[r], e, !0);
          else {
            t = B(t);
            for (var o = 0, l = t.length; o < l; o++)
              this._on(t[o], e, n, !0);
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
      var oe = yt.extend(st);
      function I(t, e, n) {
        this.x = n ? Math.round(t) : t, this.y = n ? Math.round(e) : e;
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
          var e = t.x - this.x, n = t.y - this.y;
          return Math.sqrt(e * e + n * n);
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
      function k(t, e, n) {
        return t instanceof I ? t : ct(t) ? new I(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new I(t.x, t.y) : new I(t, e, n);
      }
      function H(t, e) {
        if (t)
          for (var n = e ? [t, e] : t, r = 0, o = n.length; r < o; r++)
            this.extend(n[r]);
      }
      H.prototype = {
        // @method extend(point: Point): this
        // Extends the bounds to contain the given point.
        // @alternative
        // @method extend(otherBounds: Bounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e, n;
          if (!t)
            return this;
          if (t instanceof I || typeof t[0] == "number" || "x" in t)
            e = n = k(t);
          else if (t = it(t), e = t.min, n = t.max, !e || !n)
            return this;
          return !this.min && !this.max ? (this.min = e.clone(), this.max = n.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)), this;
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
          var e, n;
          return typeof t[0] == "number" || t instanceof I ? t = k(t) : t = it(t), t instanceof H ? (e = t.min, n = t.max) : e = n = t, e.x >= this.min.x && n.x <= this.max.x && e.y >= this.min.y && n.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = it(t);
          var e = this.min, n = this.max, r = t.min, o = t.max, l = o.x >= e.x && r.x <= n.x, d = o.y >= e.y && r.y <= n.y;
          return l && d;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = it(t);
          var e = this.min, n = this.max, r = t.min, o = t.max, l = o.x > e.x && r.x < n.x, d = o.y > e.y && r.y < n.y;
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
          var e = this.min, n = this.max, r = Math.abs(e.x - n.x) * t, o = Math.abs(e.y - n.y) * t;
          return it(
            k(e.x - r, e.y - o),
            k(n.x + r, n.y + o)
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
          for (var n = e ? [t, e] : t, r = 0, o = n.length; r < o; r++)
            this.extend(n[r]);
      }
      nt.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, n = this._northEast, r, o;
          if (t instanceof Z)
            r = t, o = t;
          else if (t instanceof nt) {
            if (r = t._southWest, o = t._northEast, !r || !o)
              return this;
          } else
            return t ? this.extend(O(t) || q(t)) : this;
          return !e && !n ? (this._southWest = new Z(r.lat, r.lng), this._northEast = new Z(o.lat, o.lng)) : (e.lat = Math.min(r.lat, e.lat), e.lng = Math.min(r.lng, e.lng), n.lat = Math.max(o.lat, n.lat), n.lng = Math.max(o.lng, n.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, n = this._northEast, r = Math.abs(e.lat - n.lat) * t, o = Math.abs(e.lng - n.lng) * t;
          return new nt(
            new Z(e.lat - r, e.lng - o),
            new Z(n.lat + r, n.lng + o)
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
          typeof t[0] == "number" || t instanceof Z || "lat" in t ? t = O(t) : t = q(t);
          var e = this._southWest, n = this._northEast, r, o;
          return t instanceof nt ? (r = t.getSouthWest(), o = t.getNorthEast()) : r = o = t, r.lat >= e.lat && o.lat <= n.lat && r.lng >= e.lng && o.lng <= n.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = q(t);
          var e = this._southWest, n = this._northEast, r = t.getSouthWest(), o = t.getNorthEast(), l = o.lat >= e.lat && r.lat <= n.lat, d = o.lng >= e.lng && r.lng <= n.lng;
          return l && d;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = q(t);
          var e = this._southWest, n = this._northEast, r = t.getSouthWest(), o = t.getNorthEast(), l = o.lat > e.lat && r.lat < n.lat, d = o.lng > e.lng && r.lng < n.lng;
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
          var e = 180 * t / 40075017, n = e / Math.cos(Math.PI / 180 * this.lat);
          return q(
            [this.lat - e, this.lng - n],
            [this.lat + e, this.lng + n]
          );
        },
        clone: function() {
          return new Z(this.lat, this.lng, this.alt);
        }
      };
      function O(t, e, n) {
        return t instanceof Z ? t : ct(t) && typeof t[0] != "object" ? t.length === 3 ? new Z(t[0], t[1], t[2]) : t.length === 2 ? new Z(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new Z(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new Z(t, e, n);
      }
      var xt = {
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
          var e = this.projection.bounds, n = this.scale(t), r = this.transformation.transform(e.min, n), o = this.transformation.transform(e.max, n);
          return new H(r, o);
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
          var e = this.wrapLng ? P(t.lng, this.wrapLng, !0) : t.lng, n = this.wrapLat ? P(t.lat, this.wrapLat, !0) : t.lat, r = t.alt;
          return new Z(n, e, r);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), n = this.wrapLatLng(e), r = e.lat - n.lat, o = e.lng - n.lng;
          if (r === 0 && o === 0)
            return t;
          var l = t.getSouthWest(), d = t.getNorthEast(), f = new Z(l.lat - r, l.lng - o), g = new Z(d.lat - r, d.lng - o);
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
          var n = Math.PI / 180, r = t.lat * n, o = e.lat * n, l = Math.sin((e.lat - t.lat) * n / 2), d = Math.sin((e.lng - t.lng) * n / 2), f = l * l + Math.cos(r) * Math.cos(o) * d * d, g = 2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f));
          return this.R * g;
        }
      }), pn = 6378137, hi = {
        R: pn,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, n = this.MAX_LATITUDE, r = Math.max(Math.min(n, t.lat), -n), o = Math.sin(r * e);
          return new I(
            this.R * t.lng * e,
            this.R * Math.log((1 + o) / (1 - o)) / 2
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
          var t = pn * Math.PI;
          return new H([-t, -t], [t, t]);
        })()
      };
      function ci(t, e, n, r) {
        if (ct(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = n, this._d = r;
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
      function ae(t, e, n, r) {
        return new ci(t, e, n, r);
      }
      var di = h({}, Et, {
        code: "EPSG:3857",
        projection: hi,
        transformation: (function() {
          var t = 0.5 / (Math.PI * hi.R);
          return ae(t, 0.5, -t, 0.5);
        })()
      }), rs = h({}, di, {
        code: "EPSG:900913"
      });
      function fn(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function mn(t, e) {
        var n = "", r, o, l, d, f, g;
        for (r = 0, l = t.length; r < l; r++) {
          for (f = t[r], o = 0, d = f.length; o < d; o++)
            g = f[o], n += (o ? "L" : "M") + g.x + " " + g.y;
          n += e ? S.svg ? "z" : "x" : "";
        }
        return n || "M0 0";
      }
      var ui = document.documentElement.style, Ie = "ActiveXObject" in window, ss = Ie && !document.addEventListener, gn = "msLaunchUri" in navigator && !("documentMode" in document), pi = pt("webkit"), _n = pt("android"), vn = pt("android 2") || pt("android 3"), os = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), as = _n && pt("Google") && os < 537 && !("AudioNode" in window), fi = !!window.opera, yn = !gn && pt("chrome"), xn = pt("gecko") && !pi && !fi && !Ie, ls = !yn && pt("safari"), bn = pt("phantom"), wn = "OTransition" in ui, hs = navigator.platform.indexOf("Win") === 0, Tn = Ie && "transition" in ui, mi = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !vn, $n = "MozPerspective" in ui, cs = !window.L_DISABLE_3D && (Tn || mi || $n) && !wn && !bn, le = typeof orientation < "u" || pt("mobile"), ds = le && pi, us = le && mi, Pn = !window.PointerEvent && window.MSPointerEvent, Sn = !!(window.PointerEvent || Pn), En = "ontouchstart" in window || !!window.TouchEvent, ps = !window.L_NO_TOUCH && (En || Sn), fs = le && fi, ms = le && xn, gs = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, _s = (function() {
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
      })(), vs = (function() {
        return !!document.createElement("canvas").getContext;
      })(), gi = !!(document.createElementNS && fn("svg").createSVGRect), ys = !!gi && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), xs = !gi && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), bs = navigator.platform.indexOf("Mac") === 0, ws = navigator.platform.indexOf("Linux") === 0;
      function pt(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var S = {
        ie: Ie,
        ielt9: ss,
        edge: gn,
        webkit: pi,
        android: _n,
        android23: vn,
        androidStock: as,
        opera: fi,
        chrome: yn,
        gecko: xn,
        safari: ls,
        phantom: bn,
        opera12: wn,
        win: hs,
        ie3d: Tn,
        webkit3d: mi,
        gecko3d: $n,
        any3d: cs,
        mobile: le,
        mobileWebkit: ds,
        mobileWebkit3d: us,
        msPointer: Pn,
        pointer: Sn,
        touch: ps,
        touchNative: En,
        mobileOpera: fs,
        mobileGecko: ms,
        retina: gs,
        passiveEvents: _s,
        canvas: vs,
        svg: gi,
        vml: xs,
        inlineSvg: ys,
        mac: bs,
        linux: ws
      }, Ln = S.msPointer ? "MSPointerDown" : "pointerdown", kn = S.msPointer ? "MSPointerMove" : "pointermove", In = S.msPointer ? "MSPointerUp" : "pointerup", Cn = S.msPointer ? "MSPointerCancel" : "pointercancel", _i = {
        touchstart: Ln,
        touchmove: kn,
        touchend: In,
        touchcancel: Cn
      }, An = {
        touchstart: Ls,
        touchmove: Ce,
        touchend: Ce,
        touchcancel: Ce
      }, qt = {}, Dn = !1;
      function Ts(t, e, n) {
        return e === "touchstart" && Es(), An[e] ? (n = An[e].bind(this, n), t.addEventListener(_i[e], n, !1), n) : (console.warn("wrong event specified:", e), b);
      }
      function $s(t, e, n) {
        if (!_i[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(_i[e], n, !1);
      }
      function Ps(t) {
        qt[t.pointerId] = t;
      }
      function Ss(t) {
        qt[t.pointerId] && (qt[t.pointerId] = t);
      }
      function Mn(t) {
        delete qt[t.pointerId];
      }
      function Es() {
        Dn || (document.addEventListener(Ln, Ps, !0), document.addEventListener(kn, Ss, !0), document.addEventListener(In, Mn, !0), document.addEventListener(Cn, Mn, !0), Dn = !0);
      }
      function Ce(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var n in qt)
            e.touches.push(qt[n]);
          e.changedTouches = [e], t(e);
        }
      }
      function Ls(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && J(e), Ce(t, e);
      }
      function ks(t) {
        var e = {}, n, r;
        for (r in t)
          n = t[r], e[r] = n && n.bind ? n.bind(t) : n;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var Is = 200;
      function Cs(t, e) {
        t.addEventListener("dblclick", e);
        var n = 0, r;
        function o(l) {
          if (l.detail !== 1) {
            r = l.detail;
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
              f - n <= Is ? (r++, r === 2 && e(ks(l))) : r = 1, n = f;
            }
          }
        }
        return t.addEventListener("click", o), {
          dblclick: e,
          simDblclick: o
        };
      }
      function As(t, e) {
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
        var n = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!n || n === "auto") && document.defaultView) {
          var r = document.defaultView.getComputedStyle(t, null);
          n = r ? r[e] : null;
        }
        return n === "auto" ? null : n;
      }
      function R(t, e, n) {
        var r = document.createElement(t);
        return r.className = e || "", n && n.appendChild(r), r;
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
        var n = De(t);
        return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n);
      }
      function A(t, e) {
        if (t.classList !== void 0)
          for (var n = B(e), r = 0, o = n.length; r < o; r++)
            t.classList.add(n[r]);
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
      function at(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && Ds(t, e);
      }
      function Ds(t, e) {
        var n = !1, r = "DXImageTransform.Microsoft.Alpha";
        try {
          n = t.filters.item(r);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), n ? (n.Enabled = e !== 100, n.Opacity = e) : t.style.filter += " progid:" + r + "(opacity=" + e + ")";
      }
      function Me(t) {
        for (var e = document.documentElement.style, n = 0; n < t.length; n++)
          if (t[n] in e)
            return t[n];
        return !1;
      }
      function Ot(t, e, n) {
        var r = e || new I(0, 0);
        t.style[vi] = (S.ie3d ? "translate(" + r.x + "px," + r.y + "px)" : "translate3d(" + r.x + "px," + r.y + "px,0)") + (n ? " scale(" + n + ")" : "");
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
      var Ms = {
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
        setOpacity: at,
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
      function C(t, e, n, r) {
        if (e && typeof e == "object")
          for (var o in e)
            Li(t, o, e[o], n);
        else {
          e = B(e);
          for (var l = 0, d = e.length; l < d; l++)
            Li(t, e[l], n, r);
        }
        return this;
      }
      var ft = "_leaflet_events";
      function U(t, e, n, r) {
        if (arguments.length === 1)
          Rn(t), delete t[ft];
        else if (e && typeof e == "object")
          for (var o in e)
            ki(t, o, e[o], n);
        else if (e = B(e), arguments.length === 2)
          Rn(t, function(f) {
            return oi(e, f) !== -1;
          });
        else
          for (var l = 0, d = e.length; l < d; l++)
            ki(t, e[l], n, r);
        return this;
      }
      function Rn(t, e) {
        for (var n in t[ft]) {
          var r = n.split(/\d/)[0];
          (!e || e(r)) && ki(t, r, null, null, n);
        }
      }
      var Ei = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function Li(t, e, n, r) {
        var o = e + p(n) + (r ? "_" + p(r) : "");
        if (t[ft] && t[ft][o])
          return this;
        var l = function(f) {
          return n.call(r || t, f || window.event);
        }, d = l;
        !S.touchNative && S.pointer && e.indexOf("touch") === 0 ? l = Ts(t, e, l) : S.touch && e === "dblclick" ? l = Cs(t, l) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(Ei[e] || e, l, S.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (l = function(f) {
          f = f || window.event, Ci(t, f) && d(f);
        }, t.addEventListener(Ei[e], l, !1)) : t.addEventListener(e, d, !1) : t.attachEvent("on" + e, l), t[ft] = t[ft] || {}, t[ft][o] = l;
      }
      function ki(t, e, n, r, o) {
        o = o || e + p(n) + (r ? "_" + p(r) : "");
        var l = t[ft] && t[ft][o];
        if (!l)
          return this;
        !S.touchNative && S.pointer && e.indexOf("touch") === 0 ? $s(t, e, l) : S.touch && e === "dblclick" ? As(t, l) : "removeEventListener" in t ? t.removeEventListener(Ei[e] || e, l, !1) : t.detachEvent("on" + e, l), t[ft][o] = null;
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
        for (var e = [], n = t.target; n; )
          e.push(n), n = n.parentNode;
        return e;
      }
      function Zn(t, e) {
        if (!e)
          return new I(t.clientX, t.clientY);
        var n = Si(e), r = n.boundingClientRect;
        return new I(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - r.left) / n.x - e.clientLeft,
          (t.clientY - r.top) / n.y - e.clientTop
        );
      }
      var zs = S.linux && S.chrome ? window.devicePixelRatio : S.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function Fn(t) {
        return S.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / zs : (
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
      var Os = {
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
      }, Un = oe.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(t, e, n, r) {
          this.stop(), this._el = t, this._inProgress = !0, this._duration = n || 0.25, this._easeOutPower = 1 / Math.max(r || 0.5, 0.2), this._startPos = Nt(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
          e && n._round(), G(this._el, n), this.fire("step");
        },
        _complete: function() {
          ot(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      }), N = oe.extend({
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
        setZoomAround: function(t, e, n) {
          var r = this.getZoomScale(e), o = this.getSize().divideBy(2), l = t instanceof I ? t : this.latLngToContainerPoint(t), d = l.subtract(o).multiplyBy(1 - 1 / r), f = this.containerPointToLatLng(o.add(d));
          return this.setView(f, e, { zoom: n });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : q(t);
          var n = k(e.paddingTopLeft || e.padding || [0, 0]), r = k(e.paddingBottomRight || e.padding || [0, 0]), o = this.getBoundsZoom(t, !1, n.add(r));
          if (o = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, o) : o, o === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: o
            };
          var l = r.subtract(n).divideBy(2), d = this.project(t.getSouthWest(), o), f = this.project(t.getNorthEast(), o), g = this.unproject(d.add(f).divideBy(2).add(l), o);
          return {
            center: g,
            zoom: o
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = q(t), !t.isValid())
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
          if (t = k(t).round(), e = e || {}, !t.x && !t.y)
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new Un(), this._panAnim.on({
            step: this._onPanTransitionStep,
            end: this._onPanTransitionEnd
          }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
            A(this._mapPane, "leaflet-pan-anim");
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
          if (n = n || {}, n.animate === !1 || !S.any3d)
            return this.setView(t, e, n);
          this._stop();
          var r = this.project(this.getCenter()), o = this.project(t), l = this.getSize(), d = this._zoom;
          t = O(t), e = e === void 0 ? d : e;
          var f = Math.max(l.x, l.y), g = f * this.getZoomScale(d, e), v = o.distanceTo(r) || 1, w = 1.42, E = w * w;
          function D(V) {
            var Ve = V ? -1 : 1, Po = V ? g : f, So = g * g - f * f + Ve * E * E * v * v, Eo = 2 * Po * E * v, Ui = So / Eo, wr = Math.sqrt(Ui * Ui + 1) - Ui, Lo = wr < 1e-9 ? -18 : Math.log(wr);
            return Lo;
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
          var rt = D(0);
          function te(V) {
            return f * (Y(rt) / Y(rt + w * V));
          }
          function bo(V) {
            return f * (Y(rt) * ht(rt + w * V) - tt(rt)) / E;
          }
          function wo(V) {
            return 1 - Math.pow(1 - V, 1.5);
          }
          var To = Date.now(), xr = (D(1) - rt) / w, $o = n.duration ? 1e3 * n.duration : 1e3 * xr * 0.8;
          function br() {
            var V = (Date.now() - To) / $o, Ve = wo(V) * xr;
            V <= 1 ? (this._flyToFrame = et(br, this), this._move(
              this.unproject(r.add(o.subtract(r).multiplyBy(bo(Ve) / v)), d),
              this.getScaleZoom(f / te(Ve), d),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, n.noMoveStart), br.call(this), this;
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
          var n = this.getCenter(), r = this._limitCenter(n, this._zoom, q(t));
          return n.equals(r) || this.panTo(r, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var n = k(e.paddingTopLeft || e.padding || [0, 0]), r = k(e.paddingBottomRight || e.padding || [0, 0]), o = this.project(this.getCenter()), l = this.project(t), d = this.getPixelBounds(), f = it([d.min.add(n), d.max.subtract(r)]), g = f.getSize();
          if (!f.contains(l)) {
            this._enforcingBounds = !0;
            var v = l.subtract(f.getCenter()), w = f.extend(l).getSize().subtract(g);
            o.x += v.x < 0 ? -w.x : w.x, o.y += v.y < 0 ? -w.y : w.y, this.panTo(this.unproject(o), e), this._enforcingBounds = !1;
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
          var n = this.getSize(), r = e.divideBy(2).round(), o = n.divideBy(2).round(), l = r.subtract(o);
          return !l.x && !l.y ? this : (t.animate && t.pan ? this.panBy(l) : (t.pan && this._rawPanBy(l), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(m(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
          var e = m(this._handleGeolocationResponse, this), n = m(this._handleGeolocationError, this);
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
            var e = t.coords.latitude, n = t.coords.longitude, r = new Z(e, n), o = r.toBounds(t.coords.accuracy * 2), l = this._locateOptions;
            if (l.setView) {
              var d = this.getBoundsZoom(o);
              this.setView(r, l.maxZoom ? Math.min(d, l.maxZoom) : d);
            }
            var f = {
              latlng: r,
              bounds: o,
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
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), j(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (ot(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
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
          var n = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), r = R("div", n, e || this._mapPane);
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
          t = q(t), n = k(n || [0, 0]);
          var r = this.getZoom() || 0, o = this.getMinZoom(), l = this.getMaxZoom(), d = t.getNorthWest(), f = t.getSouthEast(), g = this.getSize().subtract(n), v = it(this.project(f, r), this.project(d, r)).getSize(), w = S.any3d ? this.options.zoomSnap : 1, E = g.x / v.x, D = g.y / v.y, tt = e ? Math.max(E, D) : Math.min(E, D);
          return r = this.getScaleZoom(tt, r), w && (r = Math.round(r / (w / 100)) * (w / 100), r = e ? Math.ceil(r / w) * w : Math.floor(r / w) * w), Math.max(o, Math.min(l, r));
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
          var n = this._getTopLeftPoint(t, e);
          return new H(n, n.add(this.getSize()));
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
        _resetView: function(t, e, n) {
          G(this._mapPane, new I(0, 0));
          var r = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var o = this._zoom !== e;
          this._moveStart(o, n)._move(t, e)._moveEnd(o), this.fire("viewreset"), r && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, n, r) {
          e === void 0 && (e = this._zoom);
          var o = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), r ? n && n.pinch && this.fire("zoom", n) : ((o || n && n.pinch) && this.fire("zoom", n), this.fire("move", n)), this;
        },
        _moveEnd: function(t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return ot(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
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
          for (var n = [], r, o = e === "mouseout" || e === "mouseover", l = t.target || t.srcElement, d = !1; l; ) {
            if (r = this._targets[p(l)], r && (e === "click" || e === "preclick") && this._draggableMoved(r)) {
              d = !0;
              break;
            }
            if (r && r.listens(e, !0) && (o && !Ci(l, t) || (n.push(r), o)) || l === this._container)
              break;
            l = l.parentNode;
          }
          return !n.length && !d && !o && this.listens(e, !0) && (n = [this]), n;
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
            n === "mousedown" && Pi(e), this._fireDOMEvent(t, n);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, n) {
          if (t.type === "click") {
            var r = h({}, t);
            r.type = "preclick", this._fireDOMEvent(r, r.type, n);
          }
          var o = this._findEventTargets(t, e);
          if (n) {
            for (var l = [], d = 0; d < n.length; d++)
              n[d].listens(e, !0) && l.push(n[d]);
            o = l.concat(o);
          }
          if (o.length) {
            e === "contextmenu" && J(t);
            var f = o[0], g = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var v = f.getLatLng && (!f._radius || f._radius <= 10);
              g.containerPoint = v ? this.latLngToContainerPoint(f.getLatLng()) : this.mouseEventToContainerPoint(t), g.layerPoint = this.containerPointToLayerPoint(g.containerPoint), g.latlng = v ? f.getLatLng() : this.layerPointToLatLng(g.layerPoint);
            }
            for (d = 0; d < o.length; d++)
              if (o[d].fire(e, g, !0), g.originalEvent._stopped || o[d].options.bubblingMouseEvents === !1 && oi(this._mouseEvents, e) !== -1)
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
          var r = this.project(t, e), o = this.getSize().divideBy(2), l = new H(r.subtract(o), r.add(o)), d = this._getBoundsOffset(l, n, e);
          return Math.abs(d.x) <= 1 && Math.abs(d.y) <= 1 ? t : this.unproject(r.add(d), e);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(t, e) {
          if (!e)
            return t;
          var n = this.getPixelBounds(), r = new H(n.min.add(t), n.max.add(t));
          return t.add(this._getBoundsOffset(r, e));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(t, e, n) {
          var r = it(
            this.project(e.getNorthEast(), n),
            this.project(e.getSouthWest(), n)
          ), o = r.min.subtract(t.min), l = r.max.subtract(t.max), d = this._rebound(o.x, -l.x), f = this._rebound(o.y, -l.y);
          return new I(d, f);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), n = this.getMaxZoom(), r = S.any3d ? this.options.zoomSnap : 1;
          return r && (t = Math.round(t / r) * r), Math.max(e, Math.min(n, t));
        },
        _onPanTransitionStep: function() {
          this.fire("move");
        },
        _onPanTransitionEnd: function() {
          W(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
        },
        _tryAnimatedPan: function(t, e) {
          var n = this._getCenterOffset(t)._trunc();
          return (e && e.animate) !== !0 && !this.getSize().contains(n) ? !1 : (this.panBy(n, e), !0);
        },
        _createAnimProxy: function() {
          var t = this._proxy = R("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var n = vi, r = this._proxy.style[n];
            Ot(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), r === this._proxy.style[n] && this._animatingZoom && this._onZoomTransitionEnd();
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
        _tryAnimatedZoom: function(t, e, n) {
          if (this._animatingZoom)
            return !0;
          if (n = n || {}, !this._zoomAnimated || n.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold)
            return !1;
          var r = this.getZoomScale(e), o = this._getCenterOffset(t)._divideBy(1 - 1 / r);
          return n.animate !== !0 && !this.getSize().contains(o) ? !1 : (et(function() {
            this._moveStart(!0, n.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, n, r) {
          this._mapPane && (n && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, A(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: r
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(m(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && W(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Ns(t, e) {
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
          var e = this._container = this.onAdd(t), n = this.getPosition(), r = t._controlCorners[n];
          return A(e, "leaflet-control"), n.indexOf("bottom") !== -1 ? r.insertBefore(e, r.firstChild) : r.appendChild(e), this._map.on("unload", this.remove, this), this;
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
          var t = this._controlCorners = {}, e = "leaflet-", n = this._controlContainer = R("div", e + "control-container", this._container);
          function r(o, l) {
            var d = e + o + " " + e + l;
            t[o + l] = R("div", d, n);
          }
          r("top", "left"), r("top", "right"), r("bottom", "left"), r("bottom", "right");
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
          sortFunction: function(t, e, n, r) {
            return n < r ? -1 : r < n ? 1 : 0;
          }
        },
        initialize: function(t, e, n) {
          M(this, n), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
          var t = "leaflet-control-layers", e = this._container = R("div", t), n = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), fe(e), Ii(e);
          var r = this._section = R("section", t + "-list");
          n && (this._map.on("click", this.collapse, this), C(e, {
            mouseenter: this._expandSafely,
            mouseleave: this.collapse
          }, this));
          var o = this._layersLink = R("a", t + "-toggle", e);
          o.href = "#", o.title = "Layers", o.setAttribute("role", "button"), C(o, {
            keydown: function(l) {
              l.keyCode === 13 && this._expandSafely();
            },
            // Certain screen readers intercept the key event and instead send a click event
            click: function(l) {
              J(l), this._expandSafely();
            }
          }, this), n || this.expand(), this._baseLayersList = R("div", t + "-base", r), this._separator = R("div", t + "-separator", r), this._overlaysList = R("div", t + "-overlays", r), e.appendChild(r);
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
          }), this.options.sortLayers && this._layers.sort(m(function(r, o) {
            return this.options.sortFunction(r.layer, o.layer, r.name, o.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Ae(this._baseLayersList), Ae(this._overlaysList), this._layerControlInputs = [];
          var t, e, n, r, o = 0;
          for (n = 0; n < this._layers.length; n++)
            r = this._layers[n], this._addItem(r), e = e || r.overlay, t = t || !r.overlay, o += r.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && o > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
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
          t.overlay ? (r = document.createElement("input"), r.type = "checkbox", r.className = "leaflet-control-layers-selector", r.defaultChecked = n) : r = this._createRadioElement("leaflet-base-layers_" + p(this), n), this._layerControlInputs.push(r), r.layerId = p(t.layer), C(r, "click", this._onInputClick, this);
          var o = document.createElement("span");
          o.innerHTML = " " + t.name;
          var l = document.createElement("span");
          e.appendChild(l), l.appendChild(r), l.appendChild(o);
          var d = t.overlay ? this._overlaysList : this._baseLayersList;
          return d.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, n, r = [], o = [];
            this._handlingClick = !0;
            for (var l = t.length - 1; l >= 0; l--)
              e = t[l], n = this._getLayer(e.layerId).layer, e.checked ? r.push(n) : e.checked || o.push(n);
            for (l = 0; l < o.length; l++)
              this._map.hasLayer(o[l]) && this._map.removeLayer(o[l]);
            for (l = 0; l < r.length; l++)
              this._map.hasLayer(r[l]) || this._map.addLayer(r[l]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, n, r = this._map.getZoom(), o = t.length - 1; o >= 0; o--)
            e = t[o], n = this._getLayer(e.layerId).layer, e.disabled = n.options.minZoom !== void 0 && r < n.options.minZoom || n.options.maxZoom !== void 0 && r > n.options.maxZoom;
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
      }), Rs = function(t, e, n) {
        return new Hn(t, e, n);
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
          var e = "leaflet-control-zoom", n = R("div", e + " leaflet-bar"), r = this.options;
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
        _createButton: function(t, e, n, r, o) {
          var l = R("a", n, r);
          return l.innerHTML = t, l.href = "#", l.title = e, l.setAttribute("role", "button"), l.setAttribute("aria-label", e), fe(l), C(l, "click", Bt), C(l, "click", o, this), C(l, "click", this._refocusOnMap, this), l;
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
      var Bs = function(t) {
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
          var e = "leaflet-control-scale", n = R("div", e), r = this.options;
          return this._addScales(r, e + "-line", n), t.on(r.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), n;
        },
        onRemove: function(t) {
          t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
        },
        _addScales: function(t, e, n) {
          t.metric && (this._mScale = R("div", e, n)), t.imperial && (this._iScale = R("div", e, n));
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
          var e = t * 3.2808399, n, r, o;
          e > 5280 ? (n = e / 5280, r = this._getRoundNum(n), this._updateScale(this._iScale, r + " mi", r / n)) : (o = this._getRoundNum(e), this._updateScale(this._iScale, o + " ft", o / e));
        },
        _updateScale: function(t, e, n) {
          t.style.width = Math.round(this.options.maxWidth * n) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), n = t / e;
          return n = n >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : 1, e * n;
        }
      }), Zs = function(t) {
        return new jn(t);
      }, Fs = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Di = dt.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (S.inlineSvg ? Fs + " " : "") + "Leaflet</a>"
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
            var n = [];
            this.options.prefix && n.push(this.options.prefix), t.length && n.push(t.join(", ")), this._container.innerHTML = n.join(' <span aria-hidden="true">|</span> ');
          }
        }
      });
      N.mergeOptions({
        attributionControl: !0
      }), N.addInitHook(function() {
        this.options.attributionControl && new Di().addTo(this);
      });
      var Us = function(t) {
        return new Di(t);
      };
      dt.Layers = Hn, dt.Zoom = Ai, dt.Scale = jn, dt.Attribution = Di, me.layers = Rs, me.zoom = Bs, me.scale = Zs, me.attribution = Us;
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
      var Hs = { Events: st }, Wn = S.touch ? "touchstart mousedown" : "mousedown", Lt = oe.extend({
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
          M(this, r), this._element = t, this._dragStartTarget = e || t, this._preventOutline = n;
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
              var e = t.touches ? t.touches[0] : t, n = Nn(this._element);
              this._startPoint = new I(e.clientX, e.clientY), this._startPos = Nt(this._element), this._parentScale = Si(n);
              var r = t.type === "mousedown";
              C(document, r ? "mousemove" : "touchmove", this._onMove, this), C(document, r ? "mouseup" : "touchend touchcancel", this._onUp, this);
            }
          }
        },
        _onMove: function(t) {
          if (this._enabled) {
            if (t.touches && t.touches.length > 1) {
              this._moved = !0;
              return;
            }
            var e = t.touches && t.touches.length === 1 ? t.touches[0] : t, n = new I(e.clientX, e.clientY)._subtract(this._startPoint);
            !n.x && !n.y || Math.abs(n.x) + Math.abs(n.y) < this.options.clickTolerance || (n.x /= this._parentScale.x, n.y /= this._parentScale.y, J(t), this._moved || (this.fire("dragstart"), this._moved = !0, A(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), A(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(n), this._moving = !0, this._lastEvent = t, this._updatePosition());
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
      function qn(t, e, n) {
        var r, o = [1, 4, 2, 8], l, d, f, g, v, w, E, D;
        for (l = 0, w = t.length; l < w; l++)
          t[l]._code = Zt(t[l], e);
        for (f = 0; f < 4; f++) {
          for (E = o[f], r = [], l = 0, w = t.length, d = w - 1; l < w; d = l++)
            g = t[l], v = t[d], g._code & E ? v._code & E || (D = Ne(v, g, E, e, n), D._code = Zt(D, e), r.push(D)) : (v._code & E && (D = Ne(v, g, E, e, n), D._code = Zt(D, e), r.push(D)), r.push(g));
          t = r;
        }
        return t;
      }
      function Gn(t, e) {
        var n, r, o, l, d, f, g, v, w;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        lt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var E = O([0, 0]), D = q(t), tt = D.getNorthWest().distanceTo(D.getSouthWest()) * D.getNorthEast().distanceTo(D.getNorthWest());
        tt < 1700 && (E = Mi(t));
        var Y = t.length, ht = [];
        for (n = 0; n < Y; n++) {
          var rt = O(t[n]);
          ht.push(e.project(O([rt.lat - E.lat, rt.lng - E.lng])));
        }
        for (f = g = v = 0, n = 0, r = Y - 1; n < Y; r = n++)
          o = ht[n], l = ht[r], d = o.y * l.x - l.y * o.x, g += (o.x + l.x) * d, v += (o.y + l.y) * d, f += d * 3;
        f === 0 ? w = ht[0] : w = [g / f, v / f];
        var te = e.unproject(k(w));
        return O([te.lat + E.lat, te.lng + E.lng]);
      }
      function Mi(t) {
        for (var e = 0, n = 0, r = 0, o = 0; o < t.length; o++) {
          var l = O(t[o]);
          e += l.lat, n += l.lng, r++;
        }
        return O([e / r, n / r]);
      }
      var js = {
        __proto__: null,
        clipPolygon: qn,
        polygonCenter: Gn,
        centroid: Mi
      };
      function Vn(t, e) {
        if (!e || !t.length)
          return t.slice();
        var n = e * e;
        return t = Gs(t, n), t = qs(t, n), t;
      }
      function Kn(t, e, n) {
        return Math.sqrt(ge(t, e, n, !0));
      }
      function Ws(t, e, n) {
        return ge(t, e, n);
      }
      function qs(t, e) {
        var n = t.length, r = typeof Uint8Array < "u" ? Uint8Array : Array, o = new r(n);
        o[0] = o[n - 1] = 1, zi(t, o, e, 0, n - 1);
        var l, d = [];
        for (l = 0; l < n; l++)
          o[l] && d.push(t[l]);
        return d;
      }
      function zi(t, e, n, r, o) {
        var l = 0, d, f, g;
        for (f = r + 1; f <= o - 1; f++)
          g = ge(t[f], t[r], t[o], !0), g > l && (d = f, l = g);
        l > n && (e[d] = 1, zi(t, e, n, r, d), zi(t, e, n, d, o));
      }
      function Gs(t, e) {
        for (var n = [t[0]], r = 1, o = 0, l = t.length; r < l; r++)
          Vs(t[r], t[o]) > e && (n.push(t[r]), o = r);
        return o < l - 1 && n.push(t[l - 1]), n;
      }
      var Yn;
      function Xn(t, e, n, r, o) {
        var l = r ? Yn : Zt(t, n), d = Zt(e, n), f, g, v;
        for (Yn = d; ; ) {
          if (!(l | d))
            return [t, e];
          if (l & d)
            return !1;
          f = l || d, g = Ne(t, e, f, n, o), v = Zt(g, n), f === l ? (t = g, l = v) : (e = g, d = v);
        }
      }
      function Ne(t, e, n, r, o) {
        var l = e.x - t.x, d = e.y - t.y, f = r.min, g = r.max, v, w;
        return n & 8 ? (v = t.x + l * (g.y - t.y) / d, w = g.y) : n & 4 ? (v = t.x + l * (f.y - t.y) / d, w = f.y) : n & 2 ? (v = g.x, w = t.y + d * (g.x - t.x) / l) : n & 1 && (v = f.x, w = t.y + d * (f.x - t.x) / l), new I(v, w, o);
      }
      function Zt(t, e) {
        var n = 0;
        return t.x < e.min.x ? n |= 1 : t.x > e.max.x && (n |= 2), t.y < e.min.y ? n |= 4 : t.y > e.max.y && (n |= 8), n;
      }
      function Vs(t, e) {
        var n = e.x - t.x, r = e.y - t.y;
        return n * n + r * r;
      }
      function ge(t, e, n, r) {
        var o = e.x, l = e.y, d = n.x - o, f = n.y - l, g = d * d + f * f, v;
        return g > 0 && (v = ((t.x - o) * d + (t.y - l) * f) / g, v > 1 ? (o = n.x, l = n.y) : v > 0 && (o += d * v, l += f * v)), d = t.x - o, f = t.y - l, r ? d * d + f * f : new I(o, l);
      }
      function lt(t) {
        return !ct(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function Jn(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), lt(t);
      }
      function Qn(t, e) {
        var n, r, o, l, d, f, g, v;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        lt(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var w = O([0, 0]), E = q(t), D = E.getNorthWest().distanceTo(E.getSouthWest()) * E.getNorthEast().distanceTo(E.getNorthWest());
        D < 1700 && (w = Mi(t));
        var tt = t.length, Y = [];
        for (n = 0; n < tt; n++) {
          var ht = O(t[n]);
          Y.push(e.project(O([ht.lat - w.lat, ht.lng - w.lng])));
        }
        for (n = 0, r = 0; n < tt - 1; n++)
          r += Y[n].distanceTo(Y[n + 1]) / 2;
        if (r === 0)
          v = Y[0];
        else
          for (n = 0, l = 0; n < tt - 1; n++)
            if (d = Y[n], f = Y[n + 1], o = d.distanceTo(f), l += o, l > r) {
              g = (l - r) / o, v = [
                f.x - g * (f.x - d.x),
                f.y - g * (f.y - d.y)
              ];
              break;
            }
        var rt = e.unproject(k(v));
        return O([rt.lat + w.lat, rt.lng + w.lng]);
      }
      var Ks = {
        __proto__: null,
        simplify: Vn,
        pointToSegmentDistance: Kn,
        closestPointOnSegment: Ws,
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
          return new Z(t.y, t.x);
        },
        bounds: new H([-180, -90], [180, 90])
      }, Ni = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new H([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, n = this.R, r = t.lat * e, o = this.R_MINOR / n, l = Math.sqrt(1 - o * o), d = l * Math.sin(r), f = Math.tan(Math.PI / 4 - r / 2) / Math.pow((1 - d) / (1 + d), l / 2);
          return r = -n * Math.log(Math.max(f, 1e-10)), new I(t.lng * e * n, r);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, n = this.R, r = this.R_MINOR / n, o = Math.sqrt(1 - r * r), l = Math.exp(-t.y / n), d = Math.PI / 2 - 2 * Math.atan(l), f = 0, g = 0.1, v; f < 15 && Math.abs(g) > 1e-7; f++)
            v = o * Math.sin(d), v = Math.pow((1 - v) / (1 + v), o / 2), g = Math.PI / 2 - 2 * Math.atan(l * v) - d, d += g;
          return new Z(d * e, t.x * e / n);
        }
      }, Ys = {
        __proto__: null,
        LonLat: Oi,
        Mercator: Ni,
        SphericalMercator: hi
      }, Xs = h({}, Et, {
        code: "EPSG:3395",
        projection: Ni,
        transformation: (function() {
          var t = 0.5 / (Math.PI * Ni.R);
          return ae(t, 0.5, -t, 0.5);
        })()
      }), tr = h({}, Et, {
        code: "EPSG:4326",
        projection: Oi,
        transformation: ae(1 / 180, 1, -1 / 180, 0.5)
      }), Js = h({}, xt, {
        projection: Oi,
        transformation: ae(1, 0, -1, 0),
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
      xt.Earth = Et, xt.EPSG3395 = Xs, xt.EPSG3857 = di, xt.EPSG900913 = rs, xt.EPSG4326 = tr, xt.Simple = Js;
      var ut = oe.extend({
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
          for (var n in this._layers)
            t.call(e, this._layers[n]);
          return this;
        },
        _addLayers: function(t) {
          t = t ? ct(t) ? t : [t] : [];
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
            var o = this._zoomBoundLayers[r].options;
            t = o.minZoom === void 0 ? t : Math.min(t, o.minZoom), e = o.maxZoom === void 0 ? e : Math.max(e, o.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Kt = ut.extend({
        initialize: function(t, e) {
          M(this, e), this._layers = {};
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
      }), Qs = function(t, e) {
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
            var n = this._layers[e];
            t.extend(n.getBounds ? n.getBounds() : n.getLatLng());
          }
          return t;
        }
      }), to = function(t, e) {
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
          var o = k(r), l = k(e === "shadow" && n.shadowAnchor || n.iconAnchor || o && o.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (n.className || ""), l && (t.style.marginLeft = -l.x + "px", t.style.marginTop = -l.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return S.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function eo(t) {
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
          var e = function(n, r, o) {
            var l = r.exec(n);
            return l && l[o];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = R("div", "leaflet-default-icon-path", document.body), e = ce(t, "background-image") || ce(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var n = document.querySelector('link[href$="leaflet.css"]');
          return n ? n.href.substring(0, n.href.length - 11 - 1) : "";
        }
      }), er = mt.extend({
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
          var e = this._marker, n = e._map, r = this._marker.options.autoPanSpeed, o = this._marker.options.autoPanPadding, l = Nt(e._icon), d = n.getPixelBounds(), f = n.getPixelOrigin(), g = it(
            d.min._subtract(f).add(o),
            d.max._subtract(f).subtract(o)
          );
          if (!g.contains(l)) {
            var v = k(
              (Math.max(g.max.x, l.x) - g.max.x) / (d.max.x - g.max.x) - (Math.min(g.min.x, l.x) - g.min.x) / (d.min.x - g.min.x),
              (Math.max(g.max.y, l.y) - g.max.y) / (d.max.y - g.max.y) - (Math.min(g.min.y, l.y) - g.min.y) / (d.min.y - g.min.y)
            ).multiplyBy(r);
            n.panBy(v, { animate: !1 }), this._draggable._newPos._add(v), this._draggable._startPos._add(v), G(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = et(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (ot(this._panRequest), this._panRequest = et(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, n = e._shadow, r = Nt(e._icon), o = e._map.layerPointToLatLng(r);
          n && G(n, r), e._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          ot(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
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
          var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), n = t.icon.createIcon(this._icon), r = !1;
          n !== this._icon && (this._icon && this._removeIcon(), r = !0, t.title && (n.title = t.title), n.tagName === "IMG" && (n.alt = t.alt || "")), A(n, e), t.keyboard && (n.tabIndex = "0", n.setAttribute("role", "button")), this._icon = n, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && C(n, "focus", this._panOnFocus, this);
          var o = t.icon.createShadow(this._shadow), l = !1;
          o !== this._shadow && (this._removeShadow(), l = !0), o && (A(o, e), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), r && this.getPane().appendChild(this._icon), this._initInteraction(), o && l && this.getPane(t.shadowPane).appendChild(this._shadow);
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
          if (this.options.interactive && (A(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), er)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new er(this), t && this.dragging.enable();
          }
        },
        // @method setOpacity(opacity: Number): this
        // Changes the opacity of the marker.
        setOpacity: function(t) {
          return this.options.opacity = t, this._map && this._updateOpacity(), this;
        },
        _updateOpacity: function() {
          var t = this.options.opacity;
          this._icon && at(this._icon, t), this._shadow && at(this._shadow, t);
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
            var e = this.options.icon.options, n = e.iconSize ? k(e.iconSize) : k(0, 0), r = e.iconAnchor ? k(e.iconAnchor) : k(0, 0);
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
      function io(t, e) {
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
          var t = this._radius, e = this._radiusY || t, n = this._clickTolerance(), r = [t + n, e + n];
          this._pxBounds = new H(this._point.subtract(r), this._point.add(r));
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
      function no(t, e) {
        return new Be(t, e);
      }
      var Ri = Be.extend({
        initialize: function(t, e, n) {
          if (typeof e == "number" && (e = h({}, n, { radius: e })), M(this, e), this._latlng = O(t), isNaN(this.options.radius))
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
          var t = this._latlng.lng, e = this._latlng.lat, n = this._map, r = n.options.crs;
          if (r.distance === Et.distance) {
            var o = Math.PI / 180, l = this._mRadius / Et.R / o, d = n.project([e + l, t]), f = n.project([e - l, t]), g = d.add(f).divideBy(2), v = n.unproject(g).lat, w = Math.acos((Math.cos(l * o) - Math.sin(e * o) * Math.sin(v * o)) / (Math.cos(e * o) * Math.cos(v * o))) / o;
            (isNaN(w) || w === 0) && (w = l / Math.cos(Math.PI / 180 * e)), this._point = g.subtract(n.getPixelOrigin()), this._radius = isNaN(w) ? 0 : g.x - n.project([v, t - w]).x, this._radiusY = g.y - d.y;
          } else {
            var E = r.unproject(r.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = n.latLngToLayerPoint(this._latlng), this._radius = this._point.x - n.latLngToLayerPoint(E).x;
          }
          this._updateBounds();
        }
      });
      function ro(t, e, n) {
        return new Ri(t, e, n);
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
          for (var e = 1 / 0, n = null, r = ge, o, l, d = 0, f = this._parts.length; d < f; d++)
            for (var g = this._parts[d], v = 1, w = g.length; v < w; v++) {
              o = g[v - 1], l = g[v];
              var E = r(t, o, l, !0);
              E < e && (e = E, n = r(t, o, l));
            }
          return n && (n.distance = Math.sqrt(e)), n;
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
          for (var e = [], n = lt(t), r = 0, o = t.length; r < o; r++)
            n ? (e[r] = O(t[r]), this._bounds.extend(e[r])) : e[r] = this._convertLatLngs(t[r]);
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
        _projectLatlngs: function(t, e, n) {
          var r = t[0] instanceof Z, o = t.length, l, d;
          if (r) {
            for (d = [], l = 0; l < o; l++)
              d[l] = this._map.latLngToLayerPoint(t[l]), n.extend(d[l]);
            e.push(d);
          } else
            for (l = 0; l < o; l++)
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
            var e = this._parts, n, r, o, l, d, f, g;
            for (n = 0, o = 0, l = this._rings.length; n < l; n++)
              for (g = this._rings[n], r = 0, d = g.length; r < d - 1; r++)
                f = Xn(g[r], g[r + 1], t, r, !0), f && (e[o] = e[o] || [], e[o].push(f[0]), (f[1] !== g[r + 1] || r === d - 2) && (e[o].push(f[1]), o++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var t = this._parts, e = this.options.smoothFactor, n = 0, r = t.length; n < r; n++)
            t[n] = Vn(t[n], e);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t, e) {
          var n, r, o, l, d, f, g = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (n = 0, l = this._parts.length; n < l; n++)
            for (f = this._parts[n], r = 0, d = f.length, o = d - 1; r < d; o = r++)
              if (!(!e && r === 0) && Kn(t, f[o], f[r]) <= g)
                return !0;
          return !1;
        }
      });
      function so(t, e) {
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
          var e = wt.prototype._convertLatLngs.call(this, t), n = e.length;
          return n >= 2 && e[0] instanceof Z && e[0].equals(e[n - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          wt.prototype._setLatLngs.call(this, t), lt(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return lt(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, n = new I(e, e);
          if (t = new H(t.min.subtract(n), t.max.add(n)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var r = 0, o = this._rings.length, l; r < o; r++)
              l = qn(this._rings[r], t, !0), l.length && this._parts.push(l);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, n, r, o, l, d, f, g, v;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (l = 0, g = this._parts.length; l < g; l++)
            for (n = this._parts[l], d = 0, v = n.length, f = v - 1; d < v; f = d++)
              r = n[d], o = n[f], r.y > t.y != o.y > t.y && t.x < (o.x - r.x) * (t.y - r.y) / (o.y - r.y) + r.x && (e = !e);
          return e || wt.prototype._containsPoint.call(this, t, !0);
        }
      });
      function oo(t, e) {
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
          var e = ct(t) ? t : t.features, n, r, o;
          if (e) {
            for (n = 0, r = e.length; n < r; n++)
              o = e[n], (o.geometries || o.geometry || o.features || o.coordinates) && this.addData(o);
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
        var n = t.type === "Feature" ? t.geometry : t, r = n ? n.coordinates : null, o = [], l = e && e.pointToLayer, d = e && e.coordsToLatLng || Bi, f, g, v, w;
        if (!r && !n)
          return null;
        switch (n.type) {
          case "Point":
            return f = d(r), ir(l, t, f, e);
          case "MultiPoint":
            for (v = 0, w = r.length; v < w; v++)
              f = d(r[v]), o.push(ir(l, t, f, e));
            return new bt(o);
          case "LineString":
          case "MultiLineString":
            return g = Fe(r, n.type === "LineString" ? 0 : 1, d), new wt(g, e);
          case "Polygon":
          case "MultiPolygon":
            return g = Fe(r, n.type === "Polygon" ? 1 : 2, d), new Xt(g, e);
          case "GeometryCollection":
            for (v = 0, w = n.geometries.length; v < w; v++) {
              var E = Ze({
                geometry: n.geometries[v],
                type: "Feature",
                properties: t.properties
              }, e);
              E && o.push(E);
            }
            return new bt(o);
          case "FeatureCollection":
            for (v = 0, w = n.features.length; v < w; v++) {
              var D = Ze(n.features[v], e);
              D && o.push(D);
            }
            return new bt(o);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function ir(t, e, n, r) {
        return t ? t(e, n) : new Re(n, r && r.markersInheritOptions && r);
      }
      function Bi(t) {
        return new Z(t[1], t[0], t[2]);
      }
      function Fe(t, e, n) {
        for (var r = [], o = 0, l = t.length, d; o < l; o++)
          d = e ? Fe(t[o], e - 1, n) : (n || Bi)(t[o]), r.push(d);
        return r;
      }
      function Zi(t, e) {
        return t = O(t), t.alt !== void 0 ? [z(t.lng, e), z(t.lat, e), z(t.alt, e)] : [z(t.lng, e), z(t.lat, e)];
      }
      function Ue(t, e, n, r) {
        for (var o = [], l = 0, d = t.length; l < d; l++)
          o.push(e ? Ue(t[l], lt(t[l]) ? 0 : e - 1, n, r) : Zi(t[l], r));
        return !e && n && o.length > 0 && o.push(o[0].slice()), o;
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
          var e = !lt(this._latlngs), n = Ue(this._latlngs, e ? 1 : 0, !1, t);
          return Jt(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: n
          });
        }
      }), Xt.include({
        toGeoJSON: function(t) {
          var e = !lt(this._latlngs), n = e && !lt(this._latlngs[0]), r = Ue(this._latlngs, n ? 2 : e ? 1 : 0, !0, t);
          return e || (r = [r]), Jt(this, {
            type: (n ? "Multi" : "") + "Polygon",
            coordinates: r
          });
        }
      }), Kt.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(n) {
            e.push(n.toGeoJSON(t).geometry.coordinates);
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
          var n = e === "GeometryCollection", r = [];
          return this.eachLayer(function(o) {
            if (o.toGeoJSON) {
              var l = o.toGeoJSON(t);
              if (n)
                r.push(l.geometry);
              else {
                var d = He(l);
                d.type === "FeatureCollection" ? r.push.apply(r, d.features) : r.push(d);
              }
            }
          }), n ? Jt(this, {
            geometries: r,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: r
          };
        }
      });
      function nr(t, e) {
        return new Tt(t, e);
      }
      var ao = nr, je = ut.extend({
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
          this._url = t, this._bounds = q(e), M(this, n);
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
          var e = this._map.getZoomScale(t.zoom), n = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
          Ot(this._image, n, e);
        },
        _reset: function() {
          var t = this._image, e = new H(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), n = e.getSize();
          G(t, e.min), t.style.width = n.x + "px", t.style.height = n.y + "px";
        },
        _updateOpacity: function() {
          at(this._image, this.options.opacity);
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
      }), lo = function(t, e, n) {
        return new je(t, e, n);
      }, rr = je.extend({
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
            for (var n = e.getElementsByTagName("source"), r = [], o = 0; o < n.length; o++)
              r.push(n[o].src);
            this._url = n.length > 0 ? r : [e.src];
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
      function ho(t, e, n) {
        return new rr(t, e, n);
      }
      var sr = je.extend({
        _initImage: function() {
          var t = this._image = this._url;
          A(t, "leaflet-image-layer"), this._zoomAnimated && A(t, "leaflet-zoom-animated"), this.options.className && A(t, this.options.className), t.onselectstart = b, t.onmousemove = b;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function co(t, e, n) {
        return new sr(t, e, n);
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
          t && (t instanceof Z || ct(t)) ? (this._latlng = O(t), M(this, e)) : (M(this, t), this._source = e), this.options.content && (this._content = this.options.content);
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
          this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && at(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && at(this._container, 1), this.bringToFront(), this.options.interactive && (A(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
        },
        onRemove: function(t) {
          t._fadeAnimated ? (at(this._container, 0), this._removeTimeout = setTimeout(m(j, void 0, this._container), 200)) : j(this._container), this.options.interactive && (W(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
            var t = this._map.latLngToLayerPoint(this._latlng), e = k(this.options.offset), n = this._getAnchor();
            this._zoomAnimated ? G(this._container, t.add(n)) : e = e.add(t).add(n);
            var r = this._containerBottom = -e.y, o = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = r + "px", this._container.style.left = o + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      N.include({
        _initOverlay: function(t, e, n, r) {
          var o = e;
          return o instanceof t || (o = new t(r).setContent(e)), n && o.setLatLng(n), o;
        }
      }), ut.include({
        _initOverlay: function(t, e, n, r) {
          var o = n;
          return o instanceof t ? (M(o, r), o._source = this) : (o = e && !r ? e : new t(r, this), o.setContent(n)), o;
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
          ), n = this._wrapper = R("div", t + "-content-wrapper", e);
          if (this._contentNode = R("div", t + "-content", n), fe(e), Ii(this._contentNode), C(e, "contextmenu", Rt), this._tipContainer = R("div", t + "-tip-container", e), this._tip = R("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var r = this._closeButton = R("a", t + "-close-button", e);
            r.setAttribute("role", "button"), r.setAttribute("aria-label", "Close popup"), r.href = "#close", r.innerHTML = '<span aria-hidden="true">&#215;</span>', C(r, "click", function(o) {
              J(o), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var n = t.offsetWidth;
          n = Math.min(n, this.options.maxWidth), n = Math.max(n, this.options.minWidth), e.width = n + 1 + "px", e.whiteSpace = "", e.height = "";
          var r = t.offsetHeight, o = this.options.maxHeight, l = "leaflet-popup-scrolled";
          o && r > o ? (e.height = o + "px", A(t, l)) : W(t, l), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), n = this._getAnchor();
          G(this._container, e.add(n));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var t = this._map, e = parseInt(ce(this._container, "marginBottom"), 10) || 0, n = this._container.offsetHeight + e, r = this._containerWidth, o = new I(this._containerLeft, -n - this._containerBottom);
            o._add(Nt(this._container));
            var l = t.layerPointToContainerPoint(o), d = k(this.options.autoPanPadding), f = k(this.options.autoPanPaddingTopLeft || d), g = k(this.options.autoPanPaddingBottomRight || d), v = t.getSize(), w = 0, E = 0;
            l.x + r + g.x > v.x && (w = l.x + r - v.x + g.x), l.x - w - f.x < 0 && (w = l.x - f.x), l.y + n + g.y > v.y && (E = l.y + n - v.y + g.y), l.y - E - f.y < 0 && (E = l.y - f.y), (w || E) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([w, E]));
          }
        },
        _getAnchor: function() {
          return k(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), uo = function(t, e) {
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
        openPopup: function(t, e, n) {
          return this._initOverlay(We, t, e, n).openOn(this), this;
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
          var e, n, r = this._map, o = this._container, l = r.latLngToContainerPoint(r.getCenter()), d = r.layerPointToContainerPoint(t), f = this.options.direction, g = o.offsetWidth, v = o.offsetHeight, w = k(this.options.offset), E = this._getAnchor();
          f === "top" ? (e = g / 2, n = v) : f === "bottom" ? (e = g / 2, n = 0) : f === "center" ? (e = g / 2, n = v / 2) : f === "right" ? (e = 0, n = v / 2) : f === "left" ? (e = g, n = v / 2) : d.x < l.x ? (f = "right", e = 0, n = v / 2) : (f = "left", e = g + (w.x + E.x) * 2, n = v / 2), t = t.subtract(k(e, n, !0)).add(w).add(E), W(o, "leaflet-tooltip-right"), W(o, "leaflet-tooltip-left"), W(o, "leaflet-tooltip-top"), W(o, "leaflet-tooltip-bottom"), A(o, "leaflet-tooltip-" + f), G(o, t);
        },
        _updatePosition: function() {
          var t = this._map.latLngToLayerPoint(this._latlng);
          this._setPosition(t);
        },
        setOpacity: function(t) {
          this.options.opacity = t, this._container && at(this._container, t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
          this._setPosition(e);
        },
        _getAnchor: function() {
          return k(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), po = function(t, e) {
        return new qe(t, e);
      };
      N.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, n) {
          return this._initOverlay(qe, t, e, n).openOn(this), this;
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
          var e = t.latlng, n, r;
          this._tooltip.options.sticky && t.originalEvent && (n = this._map.mouseEventToContainerPoint(t.originalEvent), r = this._map.containerPointToLayerPoint(n), e = this._map.layerPointToLatLng(r)), this._tooltip.setLatLng(e);
        }
      });
      var or = Yt.extend({
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
          if (n.html instanceof Element ? (Ae(e), e.appendChild(n.html)) : e.innerHTML = n.html !== !1 ? n.html : "", n.bgPos) {
            var r = k(n.bgPos);
            e.style.backgroundPosition = -r.x + "px " + -r.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function fo(t) {
        return new or(t);
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
          for (var e = this.getPane().children, n = -t(-1 / 0, 1 / 0), r = 0, o = e.length, l; r < o; r++)
            l = e[r].style.zIndex, e[r] !== this._container && l && (n = t(n, +l));
          isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !S.ielt9) {
            at(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, n = !1;
            for (var r in this._tiles) {
              var o = this._tiles[r];
              if (!(!o.current || !o.loaded)) {
                var l = Math.min(1, (t - o.loaded) / 200);
                at(o.el, l), l < 1 ? e = !0 : (o.active ? n = !0 : this._onOpaqueTile(o), o.active = !0);
              }
            }
            n && !this._noPrune && this._pruneTiles(), e && (ot(this._fadeFrame), this._fadeFrame = et(this._updateOpacity, this));
          }
        },
        _onOpaqueTile: b,
        _initContainer: function() {
          this._container || (this._container = R("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
        },
        _updateLevels: function() {
          var t = this._tileZoom, e = this.options.maxZoom;
          if (t !== void 0) {
            for (var n in this._levels)
              n = Number(n), this._levels[n].el.children.length || n === t ? (this._levels[n].el.style.zIndex = e - Math.abs(t - n), this._onUpdateLevel(n)) : (j(this._levels[n].el), this._removeTilesAtZoom(n), this._onRemoveLevel(n), delete this._levels[n]);
            var r = this._levels[t], o = this._map;
            return r || (r = this._levels[t] = {}, r.el = R("div", "leaflet-tile-container leaflet-zoom-animated", this._container), r.el.style.zIndex = e, r.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), r.zoom = t, this._setZoomTransform(r, o.getCenter(), o.getZoom()), b(r.el.offsetWidth), this._onCreateLevel(r)), this._level = r, r;
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
            j(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(t, e, n, r) {
          var o = Math.floor(t / 2), l = Math.floor(e / 2), d = n - 1, f = new I(+o, +l);
          f.z = +d;
          var g = this._tileCoordsToKey(f), v = this._tiles[g];
          return v && v.active ? (v.retain = !0, !0) : (v && v.loaded && (v.retain = !0), d > r ? this._retainParent(o, l, d, r) : !1);
        },
        _retainChildren: function(t, e, n, r) {
          for (var o = 2 * t; o < 2 * t + 2; o++)
            for (var l = 2 * e; l < 2 * e + 2; l++) {
              var d = new I(o, l);
              d.z = n + 1;
              var f = this._tileCoordsToKey(d), g = this._tiles[f];
              if (g && g.active) {
                g.retain = !0;
                continue;
              } else g && g.loaded && (g.retain = !0);
              n + 1 < r && this._retainChildren(o, l, n + 1, r);
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
          var o = Math.round(e);
          this.options.maxZoom !== void 0 && o > this.options.maxZoom || this.options.minZoom !== void 0 && o < this.options.minZoom ? o = void 0 : o = this._clampZoom(o);
          var l = this.options.updateWhenZooming && o !== this._tileZoom;
          (!r || l) && (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), o !== void 0 && this._update(t), n || this._pruneTiles(), this._noPrune = !!n), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var n in this._levels)
            this._setZoomTransform(this._levels[n], t, e);
        },
        _setZoomTransform: function(t, e, n) {
          var r = this._map.getZoomScale(n, t.zoom), o = t.origin.multiplyBy(r).subtract(this._map._getNewPixelOrigin(e, n)).round();
          S.any3d ? Ot(t.el, o, r) : G(t.el, o);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, n = this._tileSize = this.getTileSize(), r = this._tileZoom, o = this._map.getPixelWorldBounds(this._tileZoom);
          o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && !this.options.noWrap && [
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
          var e = this._map, n = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), r = e.getZoomScale(n, this._tileZoom), o = e.project(t, this._tileZoom).floor(), l = e.getSize().divideBy(r * 2);
          return new H(o.subtract(l), o.add(l));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var n = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var r = this._getTiledPixelBounds(t), o = this._pxBoundsToTileRange(r), l = o.getCenter(), d = [], f = this.options.keepBuffer, g = new H(
                o.getBottomLeft().subtract([f, -f]),
                o.getTopRight().add([f, -f])
              );
              if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var v in this._tiles) {
                var w = this._tiles[v].coords;
                (w.z !== this._tileZoom || !g.contains(new I(w.x, w.y))) && (this._tiles[v].current = !1);
              }
              if (Math.abs(n - this._tileZoom) > 1) {
                this._setView(t, n);
                return;
              }
              for (var E = o.min.y; E <= o.max.y; E++)
                for (var D = o.min.x; D <= o.max.x; D++) {
                  var tt = new I(D, E);
                  if (tt.z = this._tileZoom, !!this._isValidTile(tt)) {
                    var Y = this._tiles[this._tileCoordsToKey(tt)];
                    Y ? Y.current = !0 : d.push(tt);
                  }
                }
              if (d.sort(function(rt, te) {
                return rt.distanceTo(l) - te.distanceTo(l);
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
            var n = this._globalTileRange;
            if (!e.wrapLng && (t.x < n.min.x || t.x > n.max.x) || !e.wrapLat && (t.y < n.min.y || t.y > n.max.y))
              return !1;
          }
          if (!this.options.bounds)
            return !0;
          var r = this._tileCoordsToBounds(t);
          return q(this.options.bounds).overlaps(r);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, n = this.getTileSize(), r = t.scaleBy(n), o = r.add(n), l = e.unproject(r, t.z), d = e.unproject(o, t.z);
          return [l, d];
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
          var e = t.split(":"), n = new I(+e[0], +e[1]);
          return n.z = +e[2], n;
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
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = b, t.onmousemove = b, S.ielt9 && this.options.opacity < 1 && at(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var n = this._getTilePos(t), r = this._tileCoordsToKey(t), o = this.createTile(this._wrapCoords(t), m(this._tileReady, this, t));
          this._initTile(o), this.createTile.length < 2 && et(m(this._tileReady, this, t, null, o)), G(o, n), this._tiles[r] = {
            el: o,
            coords: t,
            current: !0
          }, e.appendChild(o), this.fire("tileloadstart", {
            tile: o,
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
          n = this._tiles[r], n && (n.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (at(n.el, 0), ot(this._fadeFrame), this._fadeFrame = et(this._updateOpacity, this)) : (n.active = !0, this._pruneTiles()), e || (A(n.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: n.el,
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
      function mo(t) {
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
          var n = document.createElement("img");
          return C(n, "load", m(this._tileOnLoad, this, e, n)), C(n, "error", m(this._tileOnError, this, e, n)), (this.options.crossOrigin || this.options.crossOrigin === "") && (n.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (n.referrerPolicy = this.options.referrerPolicy), n.alt = "", n.src = this.getTileUrl(t), n;
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
            var n = this._globalTileRange.max.y - t.y;
            this.options.tms && (e.y = n), e["-y"] = n;
          }
          return ln(this._url, h(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          S.ielt9 ? setTimeout(m(t, this, null, e), 0) : t(null, e);
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
            if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = b, e.onerror = b, !e.complete)) {
              e.src = ke;
              var n = this._tiles[t].coords;
              j(e), delete this._tiles[t], this.fire("tileabort", {
                tile: e,
                coords: n
              });
            }
        },
        _removeTile: function(t) {
          var e = this._tiles[t];
          if (e)
            return e.el.setAttribute("src", ke), ve.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, n) {
          if (!(!this._map || n && n.getAttribute("src") === ke))
            return ve.prototype._tileReady.call(this, t, e, n);
        }
      });
      function ar(t, e) {
        return new Qt(t, e);
      }
      var lr = Qt.extend({
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
          e = M(this, e);
          var o = e.detectRetina && S.retina ? 2 : 1, l = this.getTileSize();
          n.width = l.x * o, n.height = l.y * o, this.wmsParams = n;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, Qt.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), n = this._crs, r = it(n.project(e[0]), n.project(e[1])), o = r.min, l = r.max, d = (this._wmsVersion >= 1.3 && this._crs === tr ? [o.y, o.x, l.y, l.x] : [o.x, o.y, l.x, l.y]).join(","), f = Qt.prototype.getTileUrl.call(this, t);
          return f + Wt(this.wmsParams, f, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + d;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return h(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function go(t, e) {
        return new lr(t, e);
      }
      Qt.WMS = lr, ar.wms = go;
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
          var n = this._map.getZoomScale(e, this._zoom), r = this._map.getSize().multiplyBy(0.5 + this.options.padding), o = this._map.project(this._center, e), l = r.multiplyBy(-n).add(o).subtract(this._map._getNewPixelOrigin(t, e));
          S.any3d ? Ot(this._container, l, n) : G(this._container, l);
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
          this._bounds = new H(n, n.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), hr = $t.extend({
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
          ot(this._redrawRequest), delete this._ctx, j(this._container), U(this._container), delete this._container;
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
            var t = this._bounds, e = this._container, n = t.getSize(), r = S.retina ? 2 : 1;
            G(e, t.min), e.width = r * n.x, e.height = r * n.y, e.style.width = n.x + "px", e.style.height = n.y + "px", S.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
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
            var e = t.options.dashArray.split(/[, ]+/), n = [], r, o;
            for (o = 0; o < e.length; o++) {
              if (r = Number(e[o]), isNaN(r))
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
            var n, r, o, l, d = t._parts, f = d.length, g = this._ctx;
            if (f) {
              for (g.beginPath(), n = 0; n < f; n++) {
                for (r = 0, o = d[n].length; r < o; r++)
                  l = d[n][r], g[r ? "lineTo" : "moveTo"](l.x, l.y);
                e && g.closePath();
              }
              this._fillStroke(g, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, n = this._ctx, r = Math.max(Math.round(t._radius), 1), o = (Math.max(Math.round(t._radiusY), 1) || r) / r;
            o !== 1 && (n.save(), n.scale(1, o)), n.beginPath(), n.arc(e.x, e.y / o, r, 0, Math.PI * 2, !1), o !== 1 && n.restore(), this._fillStroke(n, t);
          }
        },
        _fillStroke: function(t, e) {
          var n = e.options;
          n.fill && (t.globalAlpha = n.fillOpacity, t.fillStyle = n.fillColor || n.color, t.fill(n.fillRule || "evenodd")), n.stroke && n.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = n.opacity, t.lineWidth = n.weight, t.strokeStyle = n.color, t.lineCap = n.lineCap, t.lineJoin = n.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), n, r, o = this._drawFirst; o; o = o.next)
            n = o.layer, n.options.interactive && n._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(n)) && (r = n);
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
          e && (W(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var n, r, o = this._drawFirst; o; o = o.next)
              n = o.layer, n.options.interactive && n._containsPoint(e) && (r = n);
            r !== this._hoveredLayer && (this._handleMouseOut(t), r && (A(this._container, "leaflet-interactive"), this._fireEvent([r], t, "mouseover"), this._hoveredLayer = r)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(m(function() {
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
      function cr(t) {
        return S.canvas ? new hr(t) : null;
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
      })(), _o = {
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
          var e = t._stroke, n = t._fill, r = t.options, o = t._container;
          o.stroked = !!r.stroke, o.filled = !!r.fill, r.stroke ? (e || (e = t._stroke = ye("stroke")), o.appendChild(e), e.weight = r.weight + "px", e.color = r.color, e.opacity = r.opacity, r.dashArray ? e.dashStyle = ct(r.dashArray) ? r.dashArray.join(" ") : r.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = r.lineCap.replace("butt", "flat"), e.joinstyle = r.lineJoin) : e && (o.removeChild(e), t._stroke = null), r.fill ? (n || (n = t._fill = ye("fill")), o.appendChild(n), n.color = r.fillColor || r.color, n.opacity = r.fillOpacity) : n && (o.removeChild(n), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), n = Math.round(t._radius), r = Math.round(t._radiusY || n);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + n + "," + r + " 0," + 65535 * 360);
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
            var t = this._bounds, e = t.getSize(), n = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, n.setAttribute("width", e.x), n.setAttribute("height", e.y)), G(n, t.min), n.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
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
          var e = t._path, n = t.options;
          e && (n.stroke ? (e.setAttribute("stroke", n.color), e.setAttribute("stroke-opacity", n.opacity), e.setAttribute("stroke-width", n.weight), e.setAttribute("stroke-linecap", n.lineCap), e.setAttribute("stroke-linejoin", n.lineJoin), n.dashArray ? e.setAttribute("stroke-dasharray", n.dashArray) : e.removeAttribute("stroke-dasharray"), n.dashOffset ? e.setAttribute("stroke-dashoffset", n.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), n.fill ? (e.setAttribute("fill", n.fillColor || n.color), e.setAttribute("fill-opacity", n.fillOpacity), e.setAttribute("fill-rule", n.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
        },
        _updatePoly: function(t, e) {
          this._setPath(t, mn(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, n = Math.max(Math.round(t._radius), 1), r = Math.max(Math.round(t._radiusY), 1) || n, o = "a" + n + "," + r + " 0 1,0 ", l = t._empty() ? "M0 0" : "M" + (e.x - n) + "," + e.y + o + n * 2 + ",0 " + o + -n * 2 + ",0 ";
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
      S.vml && xe.include(_o);
      function dr(t) {
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
          return this.options.preferCanvas && cr(t) || dr(t);
        }
      });
      var ur = Xt.extend({
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
      function vo(t, e) {
        return new ur(t, e);
      }
      xe.create = Ge, xe.pointsToPath = mn, Tt.geometryToLayer = Ze, Tt.coordsToLatLng = Bi, Tt.coordsToLatLngs = Fe, Tt.latLngToCoords = Zi, Tt.latLngsToCoords = Ue, Tt.getFeature = Jt, Tt.asFeature = He, N.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var pr = mt.extend({
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
          var e = new H(this._point, this._startPoint), n = e.getSize();
          G(this._box, e.min), this._box.style.width = n.x + "px", this._box.style.height = n.y + "px";
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
      N.addInitHook("addHandler", "boxZoom", pr), N.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var fr = mt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, n = e.getZoom(), r = e.options.zoomDelta, o = t.originalEvent.shiftKey ? n - r : n + r;
          e.options.doubleClickZoom === "center" ? e.setZoom(o) : e.setZoomAround(t.containerPoint, o);
        }
      });
      N.addInitHook("addHandler", "doubleClickZoom", fr), N.mergeOptions({
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
      var mr = mt.extend({
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
          var t = this._worldWidth, e = Math.round(t / 2), n = this._initialWorldOffset, r = this._draggable._newPos.x, o = (r - e + n) % t + e - n, l = (r + e + n) % t - e - n, d = Math.abs(o + n) < Math.abs(l + n) ? o : l;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = d;
        },
        _onDragEnd: function(t) {
          var e = this._map, n = e.options, r = !n.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), r)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var o = this._lastPos.subtract(this._positions[0]), l = (this._lastTime - this._times[0]) / 1e3, d = n.easeLinearity, f = o.multiplyBy(d / l), g = f.distanceTo([0, 0]), v = Math.min(n.inertiaMaxSpeed, g), w = f.multiplyBy(v / g), E = v / (n.inertiaDeceleration * d), D = w.multiplyBy(-E / 2).round();
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
      N.addInitHook("addHandler", "dragging", mr), N.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var gr = mt.extend({
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
          var e = this._panKeys = {}, n = this.keyCodes, r, o;
          for (r = 0, o = n.left.length; r < o; r++)
            e[n.left[r]] = [-1 * t, 0];
          for (r = 0, o = n.right.length; r < o; r++)
            e[n.right[r]] = [t, 0];
          for (r = 0, o = n.down.length; r < o; r++)
            e[n.down[r]] = [0, t];
          for (r = 0, o = n.up.length; r < o; r++)
            e[n.up[r]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, n = this.keyCodes, r, o;
          for (r = 0, o = n.zoomIn.length; r < o; r++)
            e[n.zoomIn[r]] = t;
          for (r = 0, o = n.zoomOut.length; r < o; r++)
            e[n.zoomOut[r]] = -t;
        },
        _addHooks: function() {
          C(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          U(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, n = this._map, r;
            if (e in this._panKeys) {
              if (!n._panAnim || !n._panAnim._inProgress)
                if (r = this._panKeys[e], t.shiftKey && (r = k(r).multiplyBy(3)), n.options.maxBounds && (r = n._limitOffset(k(r), n.options.maxBounds)), n.options.worldCopyJump) {
                  var o = n.wrapLatLng(n.unproject(n.project(n.getCenter()).add(r)));
                  n.panTo(o);
                } else
                  n.panBy(r);
            } else if (e in this._zoomKeys)
              n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
            else if (e === 27 && n._popup && n._popup.options.closeOnEscapeKey)
              n.closePopup();
            else
              return;
            Bt(t);
          }
        }
      });
      N.addInitHook("addHandler", "keyboard", gr), N.mergeOptions({
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
      var _r = mt.extend({
        addHooks: function() {
          C(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          U(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = Fn(t), n = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var r = Math.max(n - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(m(this._performZoom, this), r), Bt(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), n = this._map.options.zoomSnap || 0;
          t._stop();
          var r = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(r)))) / Math.LN2, l = n ? Math.ceil(o / n) * n : o, d = t._limitZoom(e + (this._delta > 0 ? l : -l)) - e;
          this._delta = 0, this._startTime = null, d && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + d) : t.setZoomAround(this._lastMousePos, e + d));
        }
      });
      N.addInitHook("addHandler", "scrollWheelZoom", _r);
      var yo = 600;
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
      var vr = mt.extend({
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
            }, this), yo), C(document, "touchend touchcancel contextmenu", this._cancel, this), C(document, "touchmove", this._onMove, this);
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
      N.addInitHook("addHandler", "tapHold", vr), N.mergeOptions({
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
      var yr = mt.extend({
        addHooks: function() {
          A(this._map._container, "leaflet-touch-zoom"), C(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          W(this._map._container, "leaflet-touch-zoom"), U(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var n = e.mouseEventToContainerPoint(t.touches[0]), r = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(n.add(r)._divideBy(2))), this._startDist = n.distanceTo(r), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), C(document, "touchmove", this._onTouchMove, this), C(document, "touchend touchcancel", this._onTouchEnd, this), J(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, n = e.mouseEventToContainerPoint(t.touches[0]), r = e.mouseEventToContainerPoint(t.touches[1]), o = n.distanceTo(r) / this._startDist;
            if (this._zoom = e.getScaleZoom(o, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && o < 1 || this._zoom > e.getMaxZoom() && o > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, o === 1)
                return;
            } else {
              var l = n._add(r)._divideBy(2)._subtract(this._centerPoint);
              if (o === 1 && l.x === 0 && l.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(l), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), ot(this._animRequest);
            var d = m(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = et(d, this, !0), J(t);
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
      N.addInitHook("addHandler", "touchZoom", yr), N.BoxZoom = pr, N.DoubleClickZoom = fr, N.Drag = mr, N.Keyboard = gr, N.ScrollWheelZoom = _r, N.TapHold = vr, N.TouchZoom = yr, s.Bounds = H, s.Browser = S, s.CRS = xt, s.Canvas = hr, s.Circle = Ri, s.CircleMarker = Be, s.Class = yt, s.Control = dt, s.DivIcon = or, s.DivOverlay = gt, s.DomEvent = Os, s.DomUtil = Ms, s.Draggable = Lt, s.Evented = oe, s.FeatureGroup = bt, s.GeoJSON = Tt, s.GridLayer = ve, s.Handler = mt, s.Icon = Yt, s.ImageOverlay = je, s.LatLng = Z, s.LatLngBounds = nt, s.Layer = ut, s.LayerGroup = Kt, s.LineUtil = Ks, s.Map = N, s.Marker = Re, s.Mixin = Hs, s.Path = kt, s.Point = I, s.PolyUtil = js, s.Polygon = Xt, s.Polyline = wt, s.Popup = We, s.PosAnimation = Un, s.Projection = Ys, s.Rectangle = ur, s.Renderer = $t, s.SVG = xe, s.SVGOverlay = sr, s.TileLayer = Qt, s.Tooltip = qe, s.Transformation = ci, s.Util = is, s.VideoOverlay = rr, s.bind = m, s.bounds = it, s.canvas = cr, s.circle = ro, s.circleMarker = no, s.control = me, s.divIcon = fo, s.extend = h, s.featureGroup = to, s.geoJSON = nr, s.geoJson = ao, s.gridLayer = mo, s.icon = eo, s.imageOverlay = lo, s.latLng = O, s.latLngBounds = q, s.layerGroup = Qs, s.map = Ns, s.marker = io, s.point = k, s.polygon = oo, s.polyline = so, s.popup = uo, s.rectangle = vo, s.setOptions = M, s.stamp = p, s.svg = dr, s.svgOverlay = co, s.tileLayer = ar, s.tooltip = po, s.transformation = ae, s.version = a, s.videoOverlay = ho;
      var xo = window.L;
      s.noConflict = function() {
        return window.L = xo, this;
      }, window.L = s;
    }));
  })(we, we.exports)), we.exports;
}
var _t = Aa();
const Da = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function Ma(c) {
  return [...c].sort((i, s) => {
    const a = i.started_at ? Date.parse(i.started_at) : Number.POSITIVE_INFINITY, h = s.started_at ? Date.parse(s.started_at) : Number.POSITIVE_INFINITY;
    return a !== h ? a - h : i.id.localeCompare(s.id);
  });
}
const Fr = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], za = Da.replace(/\s+/g, " ").trim();
class ts extends zt {
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
  async refresh(i = !1) {
    if (!(!this.hass || !this.vehicleId)) {
      this.fitMapPending ||= i, this.loading = !0, this.error = "", this.requestUpdate();
      try {
        const s = await ri(this.hass);
        this.vehicleName = s.find((p) => p.vehicle_id === this.vehicleId)?.name ?? "";
        const a = await St(this.hass, this.vehicleId);
        this.mapConfig = a.map_config, this.trips = a.trips;
        const h = this.config.trip_id ?? "", u = si(this.vehicleId);
        h && this.trips.some((p) => p.id === h) ? this.selectedTripId = h : u && this.trips.some((p) => p.id === u) && (this.selectedTripId = u), (!this.selectedTripId || !this.trips.some((p) => p.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((p) => p.status === "active")?.id ?? this.trips[0]?.id ?? ""), this.selectedTripId && !h && Dt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" });
        const m = this.selectedTripId ? await St(this.hass, this.vehicleId, this.selectedTripId) : a;
        this.mapConfig = m.map_config ?? this.mapConfig, this.drives = Ma(m.drives), this.places = m.stops ?? [];
        const x = new Set(this.drives.map((p) => p.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((p) => x.has(p)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((p) => p.id), this.driveSelectionInitialized = !0), this.data = await Qo(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
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
    const i = this.shadowRoot?.querySelector(".map");
    if (!i) return;
    this.map || (this.map = _t.map(i, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5)), this.map.off("click", this.onMapClick), this.addPlaceMode && this.map.on("click", this.onMapClick);
    const s = this.config, a = s.tile_url ?? this.mapConfig?.tile_url ?? void 0, h = s.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (a && !this.tileError && !this.tileLayer) {
      const x = h || (a.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = _t.tileLayer(a, { maxZoom: 19, attribution: x }).on("tileerror", () => {
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
      const T = _t.circleMarker(y[0], { radius: 6, color: b, fillOpacity: 1 }).bindTooltip(m.mapStart).bindPopup(this.endpointPopup(m.mapStart, p.points[0])).addTo(this.map), B = _t.circleMarker(y[y.length - 1], { radius: 6, color: "#111", fillColor: b, fillOpacity: 1 }).bindTooltip(m.mapEnd).bindPopup(this.endpointPopup(m.mapEnd, p.points[p.points.length - 1])).addTo(this.map);
      this.layers.push(T, B);
      for (const M of p.gaps) {
        const Wt = y[Math.max(0, Math.floor(y.length / 2))], se = _t.circleMarker(Wt, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${m.mapGap}: ${M.seconds}s`).addTo(this.map);
        this.layers.push(se);
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
  onMapClick = (i) => {
    if (!this.addPlaceMode) return;
    const s = this.nearestRoutePoint(i.latlng.lat, i.latlng.lng);
    this.draftPoint = { latitude: i.latlng.lat, longitude: i.latlng.lng, recorded_at: s?.recorded_at }, !this.draftArrived && s?.recorded_at && (this.draftArrived = this.localDateTime(s.recorded_at)), this.requestUpdate(), this.queueMapRender();
  };
  endpointPopup(i, s) {
    const a = document.createElement("div");
    a.append(document.createTextNode(`${i}: ${K(s.recorded_at, this.hass)}`), document.createElement("br"));
    const h = document.createElement("button");
    return h.type = "button", h.textContent = $(this.hass).mapAddPlace ?? "Ort hinzufügen", h.addEventListener("click", () => this.startMapPlace(s.latitude, s.longitude, s.recorded_at)), a.append(h), a;
  }
  startMapPlace(i, s, a) {
    this.addPlaceMode = !0, this.draftPoint = { latitude: i, longitude: s, recorded_at: a }, !this.draftArrived && a && (this.draftArrived = this.localDateTime(a)), this.requestUpdate(), this.queueMapRender();
  }
  nearestRoutePoint(i, s) {
    return (this.data?.segments ?? []).flatMap((h) => h.points).reduce((h, u) => {
      if (!h) return u;
      const m = (u.latitude - i) ** 2 + (u.longitude - s) ** 2, x = (h.latitude - i) ** 2 + (h.longitude - s) ** 2;
      return m < x ? u : h;
    }, void 0);
  }
  localDateTime(i) {
    const s = new Date(i), a = (h) => String(h).padStart(2, "0");
    return `${s.getFullYear()}-${a(s.getMonth() + 1)}-${a(s.getDate())}T${a(s.getHours())}:${a(s.getMinutes())}`;
  }
  toggleAddPlace() {
    this.addPlaceMode = !this.addPlaceMode, this.addPlaceMode || (this.draftPoint = void 0, this.draftName = "", this.draftArrived = "", this.draftDescription = ""), this.requestUpdate(), this.queueMapRender();
  }
  async saveDraftPlace() {
    if (!(!this.hass || !this.selectedTripId || !this.draftPoint || !this.draftName.trim() || !this.draftArrived || this.draftSaving)) {
      this.draftSaving = !0;
      try {
        await Jr(this.hass, this.vehicleId, this.selectedTripId, {
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
  driveColor(i) {
    return Fr[i % Fr.length];
  }
  selectedTrip() {
    return this.trips.find((i) => i.id === this.selectedTripId);
  }
  selectedDrives() {
    return this.drives.filter((i) => this.selectedDriveIds.includes(i.id));
  }
  async selectTrip(i) {
    this.selectedTripId = i.currentTarget.value, Dt({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" }), this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh(!0);
  }
  async toggleDrive(i) {
    const s = i.currentTarget;
    this.selectedDriveIds = s.checked ? [.../* @__PURE__ */ new Set([...this.selectedDriveIds, s.value])] : this.selectedDriveIds.filter((a) => a !== s.value), await this.refresh(!0);
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
    const a = $(this.hass), h = i.source === "manual" ? a.sourceManual : i.source === "gpx" ? a.sourceGpx ?? a.sourceGps : a.sourceGps;
    return _`<label class="drive-row" style=${`--drive-color:${this.driveColor(s)}`}>
      <input type="checkbox" value=${i.id} .checked=${this.selectedDriveIds.includes(i.id)} @change=${(u) => {
      this.toggleDrive(u);
    }}>
      <span class="drive-info"><strong>${$e(i.started_at, this.hass)} · ${zr(i.started_at, this.hass)} → ${i.ended_at ? `${$e(i.ended_at, this.hass)} · ${zr(i.ended_at, this.hass)}` : "–"}</strong><span>${(i.distance_m / 1e3).toFixed(1)} km · ${i.duration_seconds ? Ct(i.duration_seconds, this.hass) : "–"} · ${h}</span></span>
    </label>`;
  }
  renderPlaceCapture(i, s) {
    return s ? this.addPlaceMode ? this.draftPoint ? _`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${i.mapPlaceHint}</p><form class="form-grid" @submit=${(a) => {
      a.preventDefault(), this.saveDraftPlace();
    }}><input aria-label=${i.placeName ?? "Name"} placeholder=${i.placeName ?? "Name"} .value=${this.draftName} @input=${(a) => this.draftName = a.currentTarget.value} required><select aria-label=${i.placeCategory ?? "Kategorie"} .value=${this.draftType} @change=${(a) => this.draftType = a.currentTarget.value}><option value="other">${i.placeOther ?? "Sonstiger Ort"}</option><option value="fuel_stop">${i.placeFuel ?? "Tankpause"}</option><option value="restaurant">${i.placeRestaurant ?? "Restaurant"}</option><option value="attraction">${i.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${i.placeFerry ?? "Fähre"}</option><option value="campsite">${i.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${i.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${i.placeWildCamp ?? "Freistehplatz"}</option></select><label>${i.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.draftArrived} @input=${(a) => this.draftArrived = a.currentTarget.value} required></label><textarea aria-label=${i.placeDescription ?? "Beschreibung"} placeholder=${i.placeDescription ?? "Beschreibung"} .value=${this.draftDescription} @input=${(a) => this.draftDescription = a.currentTarget.value}></textarea><button type="submit" ?disabled=${this.draftSaving}>${this.draftSaving ? i.saving : i.save}</button></form></section>` : _`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapCancelPlace ?? "Ortserfassung abbrechen"}</button><p class="muted">${i.mapPlaceHint}</p></section>` : _`<section class="map-place-capture"><button type="button" @click=${() => this.toggleAddPlace()}>${i.mapAddPlace ?? "Ort hinzufügen"}</button></section>` : "";
  }
  render() {
    const i = $(this.hass), s = this.config, a = this.selectedTrip(), h = this.selectedDrives(), u = h.reduce((x, p) => x + p.distance_m, 0) / 1e3, m = s.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    return _`<ha-card>
      <header class="map-header">
        <div><h2>${i.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || i.mapVehicle}</p></div>
        ${this.trips.length && !s.trip_id ? _`<label class="trip-picker"><span>${i.mapTrip}</span><select @change=${(x) => {
      this.selectTrip(x);
    }} .value=${this.selectedTripId}>${this.trips.map((x) => _`<option value=${x.id}>${x.title}</option>`)}</select></label>` : ""}
      </header>
      ${a ? _`<div class="metrics" aria-label=${i.mapTrip}>
        <div class="metric"><span>${i.mapTotalDistance}</span><strong>${u.toFixed(1)} km</strong></div>
        <div class="metric"><span>${i.mapSelectedDrives}</span><strong>${h.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${i.mapTripPeriod}</span><strong>${Jo(a, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? _`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(x) => this.onDriveSectionsToggle(x)}>
        <summary><span>${i.mapDriveSegments}</span><span class="summary-count">${h.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => {
      this.selectAllDrives();
    }}>${i.mapSelectAll}</button><button class="secondary" type="button" @click=${() => {
      this.selectNoDrives();
    }}>${i.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((x, p) => this.driveRow(x, p))}</div>
      </details>` : ""}
      <label class="place-filter"><input type="checkbox" .checked=${this.showPlaces} @change=${(x) => {
      this.showPlaces = x.currentTarget.checked, this.queueMapRender(), this.requestUpdate();
    }}> ${i.mapPlaces ?? "Orte anzeigen"}</label>
      ${this.renderPlaceCapture(i, a)}
      ${this.error ? _`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? _`<p class="error" role="alert">${$(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !s.tile_url && !this.mapConfig?.tile_url ? _`<p class="muted" role="status">${$(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? _`<p class="muted">${i.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? _`<p class="muted">${i.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${i.mapRouteImageAlt}></div>
      ${m ? _`<p class="attribution">${m}</p>` : ""}
      ${this.loading ? _`<p class="muted">${i.loading}</p>` : ""}
    </ha-card>`;
  }
}
ts.styles = [zt.styles, Hr(za), Mt`
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
ni("camper-travel-journal-map-card", ts);
const Xi = /* @__PURE__ */ new Set(["campsite", "rv_site", "wild_camp", "overnight"]);
class es extends zt {
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
  onActiveTripChanged = (i) => {
    const s = i.detail;
    s?.vehicleId !== this.vehicleId || !s.tripId || s.tripId === this.openTripId || this.openTripId && this.openTrip(s.tripId);
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
    const i = this.renderRoot.querySelector("dialog.interruption-dialog");
    i && (this.interruptionDialog && !i.open && i.showModal(), !this.interruptionDialog && i.open && i.close());
  }
  async refreshOverview() {
    if (!(!this.hass || !this.vehicleId)) {
      this.loading = !0, this.error = "", this.requestUpdate();
      try {
        this.overview = await St(this.hass, this.vehicleId);
        try {
          this.vehicleName = (await ri(this.hass)).find((s) => s.vehicle_id === this.vehicleId)?.name ?? "";
        } catch {
          this.vehicleName = "";
        }
        const i = si(this.vehicleId);
        this.selectedTripId = this.overview.trips.some((s) => s.id === (this.openTripId || i)) ? this.openTripId || i : "", this.openTripId && this.overview.trips.some((s) => s.id === this.openTripId) && await this.loadDetail(this.openTripId);
      } catch {
        this.error = $(this.hass).loadError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  async loadDetail(i) {
    !this.hass || !i || (this.detail = await St(this.hass, this.vehicleId, i));
  }
  async openTrip(i = this.selectedTripId) {
    if (!(!i || !this.overview?.trips.some((s) => s.id === i)) && !(this.dirty && !window.confirm($(this.hass).unsavedTripChange ?? "Ungespeicherte Änderungen verwerfen?"))) {
      this.loading = !0, this.error = "", this.dirty = !1, this.openTripId = i, this.selectedTripId = i;
      try {
        await this.loadDetail(i), Dt({ vehicleId: this.vehicleId, tripId: i, source: "journal" });
      } catch {
        this.error = $(this.hass).loadError, this.openTripId = "";
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  closeTrip(i = !0) {
    i && this.dirty && !window.confirm($(this.hass).unsavedTripChange ?? "Ungespeicherte Änderungen verwerfen?") || (this.openTripId = "", this.detail = void 0, this.dirty = !1, wa(this.vehicleId, "journal"), this.requestUpdate());
  }
  async createAndOpenTrip() {
    if (!(!this.hass || !this.newTitle.trim())) {
      if (this.newStart && this.newEnd && this.newEnd < this.newStart) {
        this.error = $(this.hass).dateInvalid;
        return;
      }
      this.loading = !0, this.error = "";
      try {
        const i = this.newTitle.trim(), s = await Xr(this.hass, this.vehicleId, i, this.newStart, this.newEnd, this.newDestination.trim());
        this.showNewTrip = !1, this.newTitle = "", this.newDestination = "", this.newStart = "", this.newEnd = "", this.overview = await St(this.hass, this.vehicleId);
        const a = s.trip_id || this.overview.trips.find((h) => h.title === i)?.id || this.overview.trips[0]?.id;
        a && await this.openTrip(a);
      } catch {
        this.error = $(this.hass).tripCreateError;
      } finally {
        this.loading = !1, this.requestUpdate();
      }
    }
  }
  trip() {
    return this.overview?.trips.find((i) => i.id === this.openTripId) ?? this.detail?.trips.find((i) => i.id === this.openTripId);
  }
  markDirty() {
    this.dirty = !0;
  }
  openInterruptionDialog(i) {
    this.interruptionDialog = i, this.interruptionAction = i.status === "unassigned" ? "stop" : i.status === "overnight" ? "overnight" : i.status === "stop" ? "stop" : i.status, this.interruptionPlaceId = i.existing_place_id ?? "", this.interruptionName = "", this.interruptionType = "other", this.interruptionAddress = "", this.interruptionDescription = "", this.requestUpdate();
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
          await Nr(this.hass, this.vehicleId, this.openTripId, i.id, this.interruptionAction, this.interruptionPlaceId);
        else {
          if (!this.interruptionName.trim()) throw new Error("place_name_required");
          await da(this.hass, this.vehicleId, this.openTripId, i.id, { name: this.interruptionName.trim(), place_type: this.interruptionType, overnight: this.interruptionAction === "overnight", address: this.interruptionAddress.trim(), description: this.interruptionDescription.trim() });
        }
      else
        await Nr(this.hass, this.vehicleId, this.openTripId, i.id, this.interruptionAction);
      await this.loadDetail(this.openTripId), this.closeInterruptionDialog();
    } catch (s) {
      this.error = s instanceof Error && s.message === "place_name_required" ? "Bitte einen Namen eingeben." : $(this.hass).loadError, this.interruptionSaving = !1, this.requestUpdate();
    }
  }
  section(i, s, a, h, u = !1) {
    return _`<section class="journal-section"><details ?open=${u} @toggle=${(m) => this.onSectionToggle(m)}><summary><span class="section-title"><span aria-hidden="true">${s}</span><strong>${i}</strong></span>${a === void 0 ? "" : _`<span class="count">${a}</span>`}</summary><div class="section-content">${h}</div></details></section>`;
  }
  onSectionToggle(i) {
    const s = i.currentTarget;
    s.open && this.shadowRoot?.querySelectorAll(".journal-section details").forEach((a) => {
      a !== s && (a.open = !1);
    });
  }
  renderPicker(i) {
    const s = this.overview?.trips ?? [];
    return _`<section class="entry" aria-labelledby="journal-entry-title"><div class="entry-icon" aria-hidden="true">🚐</div><h2 id="journal-entry-title">${i.journalEntry ?? "Reise auswählen oder neu anlegen"}</h2><p class="muted">${i.journalEntryHint ?? "Öffne eine Reise, um ihre Fahrten, Orte, Karte und Exporte zu sehen."}</p>${s.length ? _`<label class="picker-label">${i.journalSelect ?? "Reise auswählen"}<select aria-label=${i.journalSelect ?? "Reise auswählen"} .value=${this.selectedTripId} @change=${(a) => {
      this.selectedTripId = a.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.journalChoose ?? "Bitte auswählen …"}</option>${s.map((a) => _`<option value=${a.id}>${a.title} · ${re(a.status, this.hass)} · ${At(a, this.hass)}</option>`)}</select></label>` : _`<p class="muted">${i.noTrip}</p>`}<div class="actions"><button type="button" @click=${() => {
      this.openTrip();
    }} ?disabled=${!this.selectedTripId || this.loading}>${i.journalOpen ?? "Reise öffnen"}</button><button type="button" class="secondary" @click=${() => {
      this.showNewTrip = !this.showNewTrip, this.requestUpdate();
    }}>${i.newTrip}</button></div>${this.showNewTrip ? _`<form class="new-trip form-grid" @submit=${(a) => {
      a.preventDefault(), this.createAndOpenTrip();
    }}><input aria-label=${i.tripName} placeholder=${i.tripName} .value=${this.newTitle} @input=${(a) => {
      this.newTitle = a.currentTarget.value, this.markDirty();
    }} required><input aria-label=${i.destination} placeholder=${i.destination} .value=${this.newDestination} @input=${(a) => this.newDestination = a.currentTarget.value}><label>${i.startDate}<input type="date" .value=${this.newStart} @input=${(a) => this.newStart = a.currentTarget.value}></label><label>${i.endDate}<input type="date" .value=${this.newEnd} @input=${(a) => this.newEnd = a.currentTarget.value}></label><div class="actions"><button type="submit" ?disabled=${this.loading}>${i.create}</button><button type="button" class="secondary" @click=${() => {
      this.showNewTrip = !1, this.requestUpdate();
    }}>${i.cancel}</button></div></form>` : ""}</section>`;
  }
  renderOpenTrip(i, s) {
    const a = this.detail, h = (a?.stops ?? []).filter((T) => T.confirmed !== !1), u = h.filter((T) => Xi.has(T.place_kind || T.place_type || T.stop_type)), m = (a?.drives ?? []).reduce((T, B) => T + B.distance_m, 0) / 1e3, x = a?.expense_summary, p = x?.mixed_currency ? i.mixedCurrency : x?.total_minor !== void 0 && x.currency ? Pt(x.total_minor, x.currency, this.hass) : Pt(0, "EUR", this.hass), y = (T) => _`<camper-travel-journal-manager-card .hass=${this.hass} .config=${{ vehicle_id: this.vehicleId, trip_id: s.id, journal_section: T }}></camper-travel-journal-manager-card>`, P = _`<camper-travel-journal-map-card .hass=${this.hass} .config=${{ vehicle_id: this.vehicleId, trip_id: s.id }}></camper-travel-journal-map-card>`, b = a?.interruptions ?? [], z = [...a?.drives ?? []].sort((T, B) => T.started_at.localeCompare(B.started_at)).flatMap((T) => {
      const B = b.find((M) => M.previous_drive_id === T.id);
      return [_`<article class="drive-item"><strong>${i.drive ?? "Fahrt"}</strong><span>${K(T.started_at, this.hass)} → ${T.ended_at ? K(T.ended_at, this.hass) : i.notAvailable ?? "Nicht verfügbar"}</span><span>${(T.distance_m / 1e3).toFixed(1)} km · ${T.duration_seconds ? Ct(T.duration_seconds, this.hass) : "–"} · ${T.source === "gpx" ? i.sourceGpx ?? "GPX-importiert" : T.source === "manual" ? i.sourceManual : i.sourceGps}</span></article>`, ...B ? [_`<article class="interruption-item"><strong>${B.status === "pause" ? i.drivePause ?? "Fahrtpause" : B.status === "ignored" ? i.interruptionIgnored ?? "Ignoriert" : B.existing_place_id ? i.assignedStay ?? "Aufenthalt" : i.interruptionUnassigned ?? "Nicht zugeordnet"}</strong><span>${K(B.started_at, this.hass)} → ${K(B.ended_at, this.hass)} · ${Ct(B.duration_seconds, this.hass)}</span><button type="button" class="compact-action" @click=${() => this.openInterruptionDialog(B)}>${i.assignStay ?? "Aufenthalt zuordnen"}</button></article>`] : []];
    });
    return _`<header class="trip-header"><div><p class="eyebrow">${i.journalOpenTrip ?? "Geöffnete Reise"}</p><h2>${s.title}</h2><p class="muted">${s.destination || i.noDestination} · ${At(s, this.hass)} · ${re(s.status, this.hass)}${this.vehicleName ? ` · ${this.vehicleName}` : ""}</p></div><button type="button" class="secondary" @click=${() => this.closeTrip()}>${i.journalClose ?? "Reise schließen / wechseln"}</button></header>
      ${this.section(i.journalOverview ?? "Reiseübersicht", "▣", void 0, _`<div class="metric-grid"><div><span>${i.distance}</span><strong>${m.toFixed(1)} km</strong></div><div><span>${i.drives}</span><strong>${a?.drives.length ?? 0}</strong></div><div><span>${i.stops}</span><strong>${h.filter((T) => !Xi.has(T.place_kind || T.place_type || T.stop_type)).length}</strong></div><div><span>${i.overnights ?? "Übernachtungsplätze"}</span><strong>${u.length}</strong></div><div><span>${i.costs}</span><strong>${p}</strong></div></div>`)}
      ${this.section(i.journalDrives ?? "Fahrten und Unterbrechungen", "↔", (a?.drives.length ?? 0) + b.length, _`${z.length ? z : _`<p class="muted">${i.noDrives ?? "Keine Fahrten erfasst."}</p>`}`)}
      ${this.section(i.places ?? "Zwischenstopps", "●", h.filter((T) => !Xi.has(T.place_kind || T.place_type || T.stop_type)).length, _`<p class="muted">${i.journalStopsHint ?? "Bestätigte Zwischenstopps dieser Reise."}</p>${y("places")}`)}
      ${this.section(i.overnights ?? "Übernachtungsplätze", "⌂", u.length, _`<p class="muted">${i.journalOvernightHint ?? "Übernachtungsplätze und ihre Bewertungen werden im Ortsbereich verwaltet."}</p>`)}
      ${this.section(i.expenses, "€", a?.expenses?.length ?? 0, _`${y("expenses")}`)}
      ${this.section(i.mapTitle ?? "Reisekarte", "⌖", void 0, P)}
      ${this.section(i.gpxImport, "⇧", void 0, _`${y("gpx")}`)}
      ${this.section(i.pdfExportTitle, "▤", void 0, _`${y("pdf")}`)}
      ${this.error ? _`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading ? _`<p class="muted" role="status">${i.loading}</p>` : ""}
      <dialog class="interruption-dialog" @cancel=${(T) => {
      T.preventDefault(), this.closeInterruptionDialog();
    }}><form method="dialog" @submit=${(T) => {
      T.preventDefault(), this.saveInterruption();
    }}><h3>${i.assignStay ?? "Aufenthalt zuordnen"}</h3><p class="muted">${this.interruptionDialog ? `${K(this.interruptionDialog.started_at, this.hass)} → ${K(this.interruptionDialog.ended_at, this.hass)}` : ""}</p><label>${i.interruptionAction ?? "Aktion"}<select .value=${this.interruptionAction} @change=${(T) => {
      this.interruptionAction = T.currentTarget.value, this.requestUpdate();
    }}><option value="stop">${i.assignStop ?? "Zwischenstopp zuordnen"}</option><option value="overnight">${i.assignOvernight ?? "Übernachtungsplatz zuordnen"}</option><option value="pause">${i.drivePause ?? "Als Fahrtpause kennzeichnen"}</option><option value="ignored">${i.interruptionIgnored ?? "Als nicht relevant markieren"}</option></select></label>${this.interruptionAction === "stop" || this.interruptionAction === "overnight" ? _`<label>${i.existingPlace ?? "Bestehender Ort"}<select .value=${this.interruptionPlaceId} @change=${(T) => {
      this.interruptionPlaceId = T.currentTarget.value, this.requestUpdate();
    }}><option value="">${i.createNewPlace ?? "Neuen Eintrag erstellen …"}</option>${h.map((T) => _`<option value=${T.id}>${T.name}</option>`)}</select></label>${this.interruptionPlaceId ? "" : _`<input aria-label=${i.placeName} placeholder=${i.placeName} .value=${this.interruptionName} @input=${(T) => this.interruptionName = T.currentTarget.value} required><select aria-label=${i.placeCategory} .value=${this.interruptionType} @change=${(T) => this.interruptionType = T.currentTarget.value}><option value="other">${i.placeOther}</option><option value="rv_site">${i.placeRvSite}</option><option value="parking">${i.placeParking ?? "Raststätte / Parkplatz"}</option></select><input aria-label=${i.placeAddress} placeholder=${i.placeAddress} .value=${this.interruptionAddress} @input=${(T) => this.interruptionAddress = T.currentTarget.value}><textarea aria-label=${i.placeDescription} placeholder=${i.placeDescription} .value=${this.interruptionDescription} @input=${(T) => this.interruptionDescription = T.currentTarget.value}></textarea>`}` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeInterruptionDialog()}>${i.cancel}</button><button type="submit" ?disabled=${this.interruptionSaving}>${this.interruptionSaving ? i.saving : i.save}</button></div></form></dialog>`;
  }
  vehicleName = "";
  render() {
    const i = $(this.hass), s = this.trip();
    return _`<ha-card><h1>${i.title}</h1>${s ? this.renderOpenTrip(i, s) : this.renderPicker(i)}${this.error && !s ? _`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading && !s ? _`<p class="muted" role="status">${i.loading}</p>` : ""}</ha-card>`;
  }
}
es.styles = [zt.styles, Mt`
  :host { min-width: 0; } ha-card { padding: 0; overflow: hidden; } h1 { margin: 0; padding: 18px 18px 12px; font-size: 1.35rem; } h2 { margin: 0; } .entry, .trip-header { padding: 18px; } .entry { text-align: center; } .entry-icon { font-size: 2.4rem; } .entry h2 { margin: 8px 0; } .picker-label { display: grid; gap: 6px; text-align: left; margin: 18px 0 0; } select, input, textarea { box-sizing: border-box; min-width: 0; width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; } .trip-header { display: flex; justify-content: space-between; gap: 14px; align-items: start; border-block: 1px solid var(--divider-color); background: var(--secondary-background-color); } .eyebrow { margin: 0 0 4px; color: var(--secondary-text-color); font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; } .muted { color: var(--secondary-text-color); } .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(9rem,1fr)); gap: 10px; align-items: end; } .form-grid label { display: grid; gap: 5px; text-align: left; } .new-trip { margin-top: 16px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 10px; text-align: left; } .journal-section { border-bottom: 1px solid var(--divider-color); } .journal-section details { padding: 0 18px; } .journal-section summary { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; list-style: none; } .journal-section summary::-webkit-details-marker { display:none; } .section-title { display: flex; gap: 9px; align-items: center; } .section-title span { color: var(--primary-color); width: 1.2em; text-align: center; } .count { color: var(--secondary-text-color); } .section-content { padding: 0 0 16px; min-width: 0; } .metric-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(7rem,1fr)); gap: 8px; } .metric-grid > div { padding: 10px; border-radius: 9px; background: var(--secondary-background-color); } .metric-grid span, .metric-grid strong { display: block; } .metric-grid span { color: var(--secondary-text-color); font-size: .78rem; } .metric-grid strong { margin-top: 3px; } .drive-item, .interruption-item { display: grid; gap: 3px; padding: 10px; margin-bottom: 7px; border-radius: 8px; background: var(--secondary-background-color); } .interruption-item { border-inline-start: 4px solid var(--warning-color, #f57c00); } camper-travel-journal-manager-card, camper-travel-journal-map-card { display: block; min-width: 0; } button:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; } @media (max-width: 600px) { h1 { padding: 14px; } .entry, .trip-header { padding: 14px; } .trip-header { flex-direction: column; } .trip-header button { width: 100%; } .journal-section details { padding-inline: 14px; } .form-grid { grid-template-columns: 1fr; } .metric-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
  .compact-action { justify-self: start; padding: 5px 8px; font-size: .85em; }
  dialog { max-width: min(32rem, calc(100vw - 2rem)); width: calc(100% - 2rem); border: 0; border-radius: 12px; padding: 0; color: var(--primary-text-color); background: var(--card-background-color); }
  dialog::backdrop { background: rgb(0 0 0 / .48); }
  dialog form { display: grid; gap: 12px; padding: 18px; }
  dialog label { display: grid; gap: 5px; }
  dialog textarea { min-height: 4rem; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
`];
ni("camper-travel-journal-journal-card", es);
function Oa(c, i) {
  return c.vehicle_id || i.length !== 1 ? c : { ...c, vehicle_id: i[0].vehicle_id };
}
function Na(c, i) {
  return c.type === i.type && c.vehicle_id === i.vehicle_id;
}
class Ra extends Ht {
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
  set hass(i) {
    const s = this._hass?.connection !== i?.connection;
    this._hass = i, s && i && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(i) {
    Na(this._config, i) || (this._config = { ...i }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const i = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await ri(i), this.loadedConnection = i.connection;
        const s = Oa(this._config, this.vehicles);
        s.vehicle_id !== this._config.vehicle_id && (this._config = s, this.fireConfigChanged());
      } catch {
        this.error = $(i).editorLoadError;
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
    const i = $(this._hass);
    return _`
      <div class="field">
        <label for="vehicle">${i.editorVehicle}</label>
        ${this.loading ? _`<span class="muted">${i.editorLoading}</span>` : _`
          <select id="vehicle" aria-label=${i.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${i.editorChooseVehicle}</option>
            ${this.vehicles.map((s) => _`<option value=${s.vehicle_id} ?selected=${s.vehicle_id === this._config.vehicle_id}>${s.name || s.title}</option>`)}
          </select>
        `}
        ${this.error ? _`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? _`<span class="error" role="alert">${i.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Ra);
const Ba = [
  { type: "camper-travel-journal-journal-card", name: "Camper Travel Journal – Journal", description: "Zentraler Einstieg: Reise öffnen und alle Funktionen in einem Reisebereich nutzen.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const c of Ba) window.customCards.some((i) => i.type === c.type) || window.customCards.push(c);
