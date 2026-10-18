const je = globalThis, Xi = je.ShadowRoot && (je.ShadyCSS === void 0 || je.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ji = /* @__PURE__ */ Symbol(), bs = /* @__PURE__ */ new WeakMap();
let Bs = class {
  constructor(n, o, h) {
    if (this._$cssResult$ = !0, h !== Ji) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = n, this.t = o;
  }
  get styleSheet() {
    let n = this.o;
    const o = this.t;
    if (Xi && n === void 0) {
      const h = o !== void 0 && o.length === 1;
      h && (n = bs.get(o)), n === void 0 && ((this.o = n = new CSSStyleSheet()).replaceSync(this.cssText), h && bs.set(o, n));
    }
    return n;
  }
  toString() {
    return this.cssText;
  }
};
const Ns = (c) => new Bs(typeof c == "string" ? c : c + "", void 0, Ji), Nt = (c, ...n) => {
  const o = c.length === 1 ? c[0] : n.reduce((h, l, u) => h + ((f) => {
    if (f._$cssResult$ === !0) return f.cssText;
    if (typeof f == "number") return f;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + f + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(l) + c[u + 1], c[0]);
  return new Bs(o, c, Ji);
}, To = (c, n) => {
  if (Xi) c.adoptedStyleSheets = n.map((o) => o instanceof CSSStyleSheet ? o : o.styleSheet);
  else for (const o of n) {
    const h = document.createElement("style"), l = je.litNonce;
    l !== void 0 && h.setAttribute("nonce", l), h.textContent = o.cssText, c.appendChild(h);
  }
}, ws = Xi ? (c) => c : (c) => c instanceof CSSStyleSheet ? ((n) => {
  let o = "";
  for (const h of n.cssRules) o += h.cssText;
  return Ns(o);
})(c) : c;
const { is: Po, defineProperty: So, getOwnPropertyDescriptor: Eo, getOwnPropertyNames: $o, getOwnPropertySymbols: Lo, getPrototypeOf: Co } = Object, Qe = globalThis, Ts = Qe.trustedTypes, ko = Ts ? Ts.emptyScript : "", Ao = Qe.reactiveElementPolyfillSupport, xe = (c, n) => c, Vi = { toAttribute(c, n) {
  switch (n) {
    case Boolean:
      c = c ? ko : null;
      break;
    case Object:
    case Array:
      c = c == null ? c : JSON.stringify(c);
  }
  return c;
}, fromAttribute(c, n) {
  let o = c;
  switch (n) {
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
} }, Zs = (c, n) => !Po(c, n), Ps = { attribute: !0, type: String, converter: Vi, reflect: !1, useDefault: !1, hasChanged: Zs };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Qe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Yt = class extends HTMLElement {
  static addInitializer(n) {
    this._$Ei(), (this.l ??= []).push(n);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(n, o = Ps) {
    if (o.state && (o.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(n) && ((o = Object.create(o)).wrapped = !0), this.elementProperties.set(n, o), !o.noAccessor) {
      const h = /* @__PURE__ */ Symbol(), l = this.getPropertyDescriptor(n, h, o);
      l !== void 0 && So(this.prototype, n, l);
    }
  }
  static getPropertyDescriptor(n, o, h) {
    const { get: l, set: u } = Eo(this.prototype, n) ?? { get() {
      return this[o];
    }, set(f) {
      this[o] = f;
    } };
    return { get: l, set(f) {
      const v = l?.call(this);
      u?.call(this, f), this.requestUpdate(n, v, h);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(n) {
    return this.elementProperties.get(n) ?? Ps;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xe("elementProperties"))) return;
    const n = Co(this);
    n.finalize(), n.l !== void 0 && (this.l = [...n.l]), this.elementProperties = new Map(n.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xe("properties"))) {
      const o = this.properties, h = [...$o(o), ...Lo(o)];
      for (const l of h) this.createProperty(l, o[l]);
    }
    const n = this[Symbol.metadata];
    if (n !== null) {
      const o = litPropertyMetadata.get(n);
      if (o !== void 0) for (const [h, l] of o) this.elementProperties.set(h, l);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [o, h] of this.elementProperties) {
      const l = this._$Eu(o, h);
      l !== void 0 && this._$Eh.set(l, o);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(n) {
    const o = [];
    if (Array.isArray(n)) {
      const h = new Set(n.flat(1 / 0).reverse());
      for (const l of h) o.unshift(ws(l));
    } else n !== void 0 && o.push(ws(n));
    return o;
  }
  static _$Eu(n, o) {
    const h = o.attribute;
    return h === !1 ? void 0 : typeof h == "string" ? h : typeof n == "string" ? n.toLowerCase() : void 0;
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
    const n = /* @__PURE__ */ new Map(), o = this.constructor.elementProperties;
    for (const h of o.keys()) this.hasOwnProperty(h) && (n.set(h, this[h]), delete this[h]);
    n.size > 0 && (this._$Ep = n);
  }
  createRenderRoot() {
    const n = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return To(n, this.constructor.elementStyles), n;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((n) => n.hostConnected?.());
  }
  enableUpdating(n) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((n) => n.hostDisconnected?.());
  }
  attributeChangedCallback(n, o, h) {
    this._$AK(n, h);
  }
  _$ET(n, o) {
    const h = this.constructor.elementProperties.get(n), l = this.constructor._$Eu(n, h);
    if (l !== void 0 && h.reflect === !0) {
      const u = (h.converter?.toAttribute !== void 0 ? h.converter : Vi).toAttribute(o, h.type);
      this._$Em = n, u == null ? this.removeAttribute(l) : this.setAttribute(l, u), this._$Em = null;
    }
  }
  _$AK(n, o) {
    const h = this.constructor, l = h._$Eh.get(n);
    if (l !== void 0 && this._$Em !== l) {
      const u = h.getPropertyOptions(l), f = typeof u.converter == "function" ? { fromAttribute: u.converter } : u.converter?.fromAttribute !== void 0 ? u.converter : Vi;
      this._$Em = l;
      const v = f.fromAttribute(o, u.type);
      this[l] = v ?? this._$Ej?.get(l) ?? v, this._$Em = null;
    }
  }
  requestUpdate(n, o, h, l = !1, u) {
    if (n !== void 0) {
      const f = this.constructor;
      if (l === !1 && (u = this[n]), h ??= f.getPropertyOptions(n), !((h.hasChanged ?? Zs)(u, o) || h.useDefault && h.reflect && u === this._$Ej?.get(n) && !this.hasAttribute(f._$Eu(n, h)))) return;
      this.C(n, o, h);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(n, o, { useDefault: h, reflect: l, wrapped: u }, f) {
    h && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(n) && (this._$Ej.set(n, f ?? o ?? this[n]), u !== !0 || f !== void 0) || (this._$AL.has(n) || (this.hasUpdated || h || (o = void 0), this._$AL.set(n, o)), l === !0 && this._$Em !== n && (this._$Eq ??= /* @__PURE__ */ new Set()).add(n));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (o) {
      Promise.reject(o);
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
        for (const [l, u] of this._$Ep) this[l] = u;
        this._$Ep = void 0;
      }
      const h = this.constructor.elementProperties;
      if (h.size > 0) for (const [l, u] of h) {
        const { wrapped: f } = u, v = this[l];
        f !== !0 || this._$AL.has(l) || v === void 0 || this.C(l, void 0, u, v);
      }
    }
    let n = !1;
    const o = this._$AL;
    try {
      n = this.shouldUpdate(o), n ? (this.willUpdate(o), this._$EO?.forEach((h) => h.hostUpdate?.()), this.update(o)) : this._$EM();
    } catch (h) {
      throw n = !1, this._$EM(), h;
    }
    n && this._$AE(o);
  }
  willUpdate(n) {
  }
  _$AE(n) {
    this._$EO?.forEach((o) => o.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(n)), this.updated(n);
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
    this._$Eq &&= this._$Eq.forEach((o) => this._$ET(o, this[o])), this._$EM();
  }
  updated(n) {
  }
  firstUpdated(n) {
  }
};
Yt.elementStyles = [], Yt.shadowRootOptions = { mode: "open" }, Yt[xe("elementProperties")] = /* @__PURE__ */ new Map(), Yt[xe("finalized")] = /* @__PURE__ */ new Map(), Ao?.({ ReactiveElement: Yt }), (Qe.reactiveElementVersions ??= []).push("2.1.2");
const Qi = globalThis, Ss = (c) => c, Ke = Qi.trustedTypes, Es = Ke ? Ke.createPolicy("lit-html", { createHTML: (c) => c }) : void 0, Fs = "$lit$", $t = `lit$${Math.random().toFixed(9).slice(2)}$`, Us = "?" + $t, Io = `<${Us}>`, Rt = document, we = () => Rt.createComment(""), Te = (c) => c === null || typeof c != "object" && typeof c != "function", tn = Array.isArray, Do = (c) => tn(c) || typeof c?.[Symbol.iterator] == "function", Bi = `[ \t
\f\r]`, ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $s = /-->/g, Ls = />/g, Dt = RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ \t
\f\r"'\`<>=]|("|')|))|$)`, "g"), Cs = /'/g, ks = /"/g, Hs = /^(?:script|style|textarea|title)$/i, Mo = (c) => (n, ...o) => ({ _$litType$: c, strings: n, values: o }), y = Mo(1), Jt = /* @__PURE__ */ Symbol.for("lit-noChange"), V = /* @__PURE__ */ Symbol.for("lit-nothing"), As = /* @__PURE__ */ new WeakMap(), Mt = Rt.createTreeWalker(Rt, 129);
function Ws(c, n) {
  if (!tn(c) || !c.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Es !== void 0 ? Es.createHTML(n) : n;
}
const zo = (c, n) => {
  const o = c.length - 1, h = [];
  let l, u = n === 2 ? "<svg>" : n === 3 ? "<math>" : "", f = ve;
  for (let v = 0; v < o; v++) {
    const m = c[v];
    let x, T, w = -1, R = 0;
    for (; R < m.length && (f.lastIndex = R, T = f.exec(m), T !== null); ) R = f.lastIndex, f === ve ? T[1] === "!--" ? f = $s : T[1] !== void 0 ? f = Ls : T[2] !== void 0 ? (Hs.test(T[2]) && (l = RegExp("</" + T[2], "g")), f = Dt) : T[3] !== void 0 && (f = Dt) : f === Dt ? T[0] === ">" ? (f = l ?? ve, w = -1) : T[1] === void 0 ? w = -2 : (w = f.lastIndex - T[2].length, x = T[1], f = T[3] === void 0 ? Dt : T[3] === '"' ? ks : Cs) : f === ks || f === Cs ? f = Dt : f === $s || f === Ls ? f = ve : (f = Dt, l = void 0);
    const J = f === Dt && c[v + 1].startsWith("/>") ? " " : "";
    u += f === ve ? m + Io : w >= 0 ? (h.push(x), m.slice(0, w) + Fs + m.slice(w) + $t + J) : m + $t + (w === -2 ? v : J);
  }
  return [Ws(c, u + (c[o] || "<?>") + (n === 2 ? "</svg>" : n === 3 ? "</math>" : "")), h];
};
class Pe {
  constructor({ strings: n, _$litType$: o }, h) {
    let l;
    this.parts = [];
    let u = 0, f = 0;
    const v = n.length - 1, m = this.parts, [x, T] = zo(n, o);
    if (this.el = Pe.createElement(x, h), Mt.currentNode = this.el.content, o === 2 || o === 3) {
      const w = this.el.content.firstChild;
      w.replaceWith(...w.childNodes);
    }
    for (; (l = Mt.nextNode()) !== null && m.length < v; ) {
      if (l.nodeType === 1) {
        if (l.hasAttributes()) for (const w of l.getAttributeNames()) if (w.endsWith(Fs)) {
          const R = T[f++], J = l.getAttribute(w).split($t), Y = /([.?@])?(.*)/.exec(R);
          m.push({ type: 1, index: u, name: Y[2], strings: J, ctor: Y[1] === "." ? Ro : Y[1] === "?" ? Bo : Y[1] === "@" ? No : ti }), l.removeAttribute(w);
        } else w.startsWith($t) && (m.push({ type: 6, index: u }), l.removeAttribute(w));
        if (Hs.test(l.tagName)) {
          const w = l.textContent.split($t), R = w.length - 1;
          if (R > 0) {
            l.textContent = Ke ? Ke.emptyScript : "";
            for (let J = 0; J < R; J++) l.append(w[J], we()), Mt.nextNode(), m.push({ type: 2, index: ++u });
            l.append(w[R], we());
          }
        }
      } else if (l.nodeType === 8) if (l.data === Us) m.push({ type: 2, index: u });
      else {
        let w = -1;
        for (; (w = l.data.indexOf($t, w + 1)) !== -1; ) m.push({ type: 7, index: u }), w += $t.length - 1;
      }
      u++;
    }
  }
  static createElement(n, o) {
    const h = Rt.createElement("template");
    return h.innerHTML = n, h;
  }
}
function Qt(c, n, o = c, h) {
  if (n === Jt) return n;
  let l = h !== void 0 ? o._$Co?.[h] : o._$Cl;
  const u = Te(n) ? void 0 : n._$litDirective$;
  return l?.constructor !== u && (l?._$AO?.(!1), u === void 0 ? l = void 0 : (l = new u(c), l._$AT(c, o, h)), h !== void 0 ? (o._$Co ??= [])[h] = l : o._$Cl = l), l !== void 0 && (n = Qt(c, l._$AS(c, n.values), l, h)), n;
}
class Oo {
  constructor(n, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = n, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(n) {
    const { el: { content: o }, parts: h } = this._$AD, l = (n?.creationScope ?? Rt).importNode(o, !0);
    Mt.currentNode = l;
    let u = Mt.nextNode(), f = 0, v = 0, m = h[0];
    for (; m !== void 0; ) {
      if (f === m.index) {
        let x;
        m.type === 2 ? x = new Se(u, u.nextSibling, this, n) : m.type === 1 ? x = new m.ctor(u, m.name, m.strings, this, n) : m.type === 6 && (x = new Zo(u, this, n)), this._$AV.push(x), m = h[++v];
      }
      f !== m?.index && (u = Mt.nextNode(), f++);
    }
    return Mt.currentNode = Rt, l;
  }
  p(n) {
    let o = 0;
    for (const h of this._$AV) h !== void 0 && (h.strings !== void 0 ? (h._$AI(n, h, o), o += h.strings.length - 2) : h._$AI(n[o])), o++;
  }
}
class Se {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(n, o, h, l) {
    this.type = 2, this._$AH = V, this._$AN = void 0, this._$AA = n, this._$AB = o, this._$AM = h, this.options = l, this._$Cv = l?.isConnected ?? !0;
  }
  get parentNode() {
    let n = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && n?.nodeType === 11 && (n = o.parentNode), n;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(n, o = this) {
    n = Qt(this, n, o), Te(n) ? n === V || n == null || n === "" ? (this._$AH !== V && this._$AR(), this._$AH = V) : n !== this._$AH && n !== Jt && this._(n) : n._$litType$ !== void 0 ? this.$(n) : n.nodeType !== void 0 ? this.T(n) : Do(n) ? this.k(n) : this._(n);
  }
  O(n) {
    return this._$AA.parentNode.insertBefore(n, this._$AB);
  }
  T(n) {
    this._$AH !== n && (this._$AR(), this._$AH = this.O(n));
  }
  _(n) {
    this._$AH !== V && Te(this._$AH) ? this._$AA.nextSibling.data = n : this.T(Rt.createTextNode(n)), this._$AH = n;
  }
  $(n) {
    const { values: o, _$litType$: h } = n, l = typeof h == "number" ? this._$AC(n) : (h.el === void 0 && (h.el = Pe.createElement(Ws(h.h, h.h[0]), this.options)), h);
    if (this._$AH?._$AD === l) this._$AH.p(o);
    else {
      const u = new Oo(l, this), f = u.u(this.options);
      u.p(o), this.T(f), this._$AH = u;
    }
  }
  _$AC(n) {
    let o = As.get(n.strings);
    return o === void 0 && As.set(n.strings, o = new Pe(n)), o;
  }
  k(n) {
    tn(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let h, l = 0;
    for (const u of n) l === o.length ? o.push(h = new Se(this.O(we()), this.O(we()), this, this.options)) : h = o[l], h._$AI(u), l++;
    l < o.length && (this._$AR(h && h._$AB.nextSibling, l), o.length = l);
  }
  _$AR(n = this._$AA.nextSibling, o) {
    for (this._$AP?.(!1, !0, o); n !== this._$AB; ) {
      const h = Ss(n).nextSibling;
      Ss(n).remove(), n = h;
    }
  }
  setConnected(n) {
    this._$AM === void 0 && (this._$Cv = n, this._$AP?.(n));
  }
}
class ti {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(n, o, h, l, u) {
    this.type = 1, this._$AH = V, this._$AN = void 0, this.element = n, this.name = o, this._$AM = l, this.options = u, h.length > 2 || h[0] !== "" || h[1] !== "" ? (this._$AH = Array(h.length - 1).fill(new String()), this.strings = h) : this._$AH = V;
  }
  _$AI(n, o = this, h, l) {
    const u = this.strings;
    let f = !1;
    if (u === void 0) n = Qt(this, n, o, 0), f = !Te(n) || n !== this._$AH && n !== Jt, f && (this._$AH = n);
    else {
      const v = n;
      let m, x;
      for (n = u[0], m = 0; m < u.length - 1; m++) x = Qt(this, v[h + m], o, m), x === Jt && (x = this._$AH[m]), f ||= !Te(x) || x !== this._$AH[m], x === V ? n = V : n !== V && (n += (x ?? "") + u[m + 1]), this._$AH[m] = x;
    }
    f && !l && this.j(n);
  }
  j(n) {
    n === V ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, n ?? "");
  }
}
class Ro extends ti {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(n) {
    this.element[this.name] = n === V ? void 0 : n;
  }
}
let Bo = class extends ti {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(n) {
    this.element.toggleAttribute(this.name, !!n && n !== V);
  }
};
class No extends ti {
  constructor(n, o, h, l, u) {
    super(n, o, h, l, u), this.type = 5;
  }
  _$AI(n, o = this) {
    if ((n = Qt(this, n, o, 0) ?? V) === Jt) return;
    const h = this._$AH, l = n === V && h !== V || n.capture !== h.capture || n.once !== h.once || n.passive !== h.passive, u = n !== V && (h === V || l);
    l && this.element.removeEventListener(this.name, this, h), u && this.element.addEventListener(this.name, this, n), this._$AH = n;
  }
  handleEvent(n) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, n) : this._$AH.handleEvent(n);
  }
}
class Zo {
  constructor(n, o, h) {
    this.element = n, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = h;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(n) {
    Qt(this, n);
  }
}
const Fo = Qi.litHtmlPolyfillSupport;
Fo?.(Pe, Se), (Qi.litHtmlVersions ??= []).push("3.3.3");
const Uo = (c, n, o) => {
  const h = o?.renderBefore ?? n;
  let l = h._$litPart$;
  if (l === void 0) {
    const u = o?.renderBefore ?? null;
    h._$litPart$ = l = new Se(n.insertBefore(we(), u), u, void 0, o ?? {});
  }
  return l._$AI(c), l;
};
const en = globalThis;
class zt extends Yt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const n = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= n.firstChild, n;
  }
  update(n) {
    const o = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(n), this._$Do = Uo(o, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Jt;
  }
}
zt._$litElement$ = !0, zt.finalized = !0, en.litElementHydrateSupport?.({ LitElement: zt });
const Ho = en.litElementPolyfillSupport;
Ho?.({ LitElement: zt });
(en.litElementVersions ??= []).push("4.2.2");
class ee extends zt {
  _hass;
  config = {};
  static styles = Nt`
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
    const o = this._hass?.connection !== n?.connection;
    this._hass = n, o && this.onHassConnectionChanged(), this.requestUpdate();
  }
  setConfig(n) {
    this.config.vehicle_id !== n.vehicle_id && (this.config = { ...n }, this.onConfigChanged(), this.requestUpdate());
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
function nn(c, n) {
  customElements.get(c) || customElements.define(c, n);
}
async function Z(c, n, o, h = {}) {
  return c.connection.sendMessagePromise({ type: n, vehicle_id: o, ...h });
}
const te = (c, n, o) => Z(c, "camper_travel_journal/list", n, o ? { trip_id: o } : {}), Wo = (c, n, o, h, l = 5e3) => Z(c, "camper_travel_journal/route", n, { trip_id: o, drive_ids: h, max_points: l }), qs = (c, n, o, h) => Z(c, "camper_travel_journal/transition_trip", n, { trip_id: o, status: h }), qo = (c, n, o, h = "", l = "", u = "") => Z(c, "camper_travel_journal/create_trip", n, { title: o, start_date: h || void 0, end_date: l || void 0, destination: u }), Go = (c, n, o, h) => Z(c, "camper_travel_journal/update_trip", n, { trip_id: o, ...h }), jo = (c, n, o) => Z(c, "camper_travel_journal/delete_trip", n, { trip_id: o }), Vo = (c, n, o, h) => Z(c, "camper_travel_journal/unlink_drive", n, { trip_id: o, drive_id: h }), Ko = (c, n, o, h) => Z(c, "camper_travel_journal/link_drives", n, { trip_id: o, drive_ids: h }), Yo = (c, n, o) => Z(c, "camper_travel_journal/create_manual_drive", n, o), Xo = (c, n, o, h) => Z(c, "camper_travel_journal/update_manual_drive", n, { drive_id: o, ...h }), Jo = (c, n, o) => Z(c, "camper_travel_journal/delete_manual_drive", n, { drive_id: o }), Qo = (c, n, o, h) => Z(c, "camper_travel_journal/create_expense", n, { trip_id: o, ...h }), ta = (c, n, o, h) => Z(c, "camper_travel_journal/update_expense", n, { expense_id: o, ...h }), ea = (c, n, o, h) => Z(c, "camper_travel_journal/create_stop", n, { trip_id: o, ...h }), ia = (c, n, o, h) => Z(c, "camper_travel_journal/update_stop", n, { stop_id: o, ...h }), na = (c, n, o) => Z(c, "camper_travel_journal/delete_stop", n, { stop_id: o }), sa = (c, n, o, h) => Z(c, "camper_travel_journal/update_overnight", n, { place_id: o, ...h }), ra = (c, n, o, h) => Z(c, "camper_travel_journal/update_rating", n, { place_id: o, ...h }), oa = (c, n, o) => Z(c, "camper_travel_journal/delete_rating", n, { place_id: o }), aa = (c, n, o) => Z(c, "camper_travel_journal/generate_stop_suggestions", n, { trip_id: o }), ha = (c, n, o, h, l, u) => Z(c, "camper_travel_journal/accept_stop_suggestion", n, { suggestion_id: o, trip_id: h, name: l, place_type: u }), la = (c, n, o) => Z(c, "camper_travel_journal/dismiss_stop_suggestion", n, { suggestion_id: o }), ca = (c, n, o) => Z(c, "camper_travel_journal/delete_expense", n, { expense_id: o }), da = (c, n, o) => Z(c, "camper_travel_journal/export_pdf", n, { trip_id: o }), sn = async (c) => (await c.connection.sendMessagePromise({ type: "camper_travel_journal/list_vehicles" })).vehicles ?? [], ua = (c, n, o) => Z(c, "camper_travel_journal/analyze_gpx", n, { content_base64: o }), pa = (c, n, o, h, l, u) => Z(c, "camper_travel_journal/import_gpx", n, { content_base64: o, file_hash: h, drive_keys: l, trip_id: u }), Gs = ["camping", "fuel", "toll", "parking", "food", "activities", "other"], Ni = Gs, fa = {
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
}, ma = {
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
}, Is = {
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
    mapSelectNone: "Alle abwählen"
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
    mapSelectNone: "Select none"
  }
};
function S(c) {
  const n = c?.locale?.language?.toLowerCase() ?? "de";
  return { ...n.startsWith("de") ? fa : ma, ...n.startsWith("de") ? Is.de : Is.en };
}
function Ye(c) {
  return (c?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}
function Ve(c, n) {
  const o = /^(\d{4})-(\d{2})-(\d{2})$/.exec(c);
  if (o) {
    const [, h, l, u] = o;
    return Ye(n).startsWith("de") ? `${u}.${l}.${h}` : `${l}/${u}/${h}`;
  }
  return new Date(c).toLocaleDateString(Ye(n));
}
function ut(c, n) {
  return new Date(c).toLocaleString(Ye(n), { dateStyle: "short", timeStyle: "short" });
}
function ga(c, n) {
  return new Date(c).toLocaleTimeString(Ye(n), { hour: "2-digit", minute: "2-digit" });
}
function Ge(c, n) {
  const o = Math.max(0, Math.round((c ?? 0) / 60));
  return o < 60 ? `${o} min` : `${Math.floor(o / 60)} h ${o % 60} min`;
}
function Xt(c, n) {
  return c.start_date || c.end_date ? [c.start_date, c.end_date].filter(Boolean).map((o) => Ve(o, n)).join(" – ") || "" : c.started_at ? `${Ve(c.started_at, n)}${c.ended_at ? ` – ${Ve(c.ended_at, n)}` : ""}` : "";
}
function _a(c, n) {
  const o = c.start_date || c.started_at, h = c.end_date || c.ended_at;
  if (!o && !h) return "";
  const l = (x) => {
    const T = /^(\d{4})-(\d{2})-(\d{2})$/.exec(x);
    return T ? new Date(Number(T[1]), Number(T[2]) - 1, Number(T[3])) : new Date(x);
  }, u = l(o || h || ""), f = l(h || o || "");
  if (Number.isNaN(u.getTime()) || Number.isNaN(f.getTime())) return Xt(c, n);
  if (!(n?.locale?.language ?? "").toLowerCase().startsWith("de")) {
    const x = new Intl.DateTimeFormat("en-US", { month: "short" }), T = (R) => R.getDate(), w = (R) => R.getFullYear();
    return w(u) === w(f) && u.getMonth() === f.getMonth() ? `${x.format(u)} ${T(u)}–${T(f)}, ${w(u)}` : w(u) === w(f) ? `${x.format(u)} ${T(u)}–${x.format(f)} ${T(f)}, ${w(u)}` : `${x.format(u)} ${T(u)}, ${w(u)}–${x.format(f)} ${T(f)}, ${w(f)}`;
  }
  const m = (x) => `${String(x.getDate()).padStart(2, "0")}.${String(x.getMonth() + 1).padStart(2, "0")}.${String(x.getFullYear()).slice(-2)}`;
  return u.getFullYear() === f.getFullYear() && u.getMonth() === f.getMonth() ? `${String(u.getDate()).padStart(2, "0")}.–${m(f).slice(0, 2)}.${String(f.getMonth() + 1).padStart(2, "0")}.${String(f.getFullYear()).slice(-2)}` : `${m(u)}–${m(f)}`;
}
function Xe(c, n) {
  return S(n).statuses[c] ?? c;
}
function Zi(c, n) {
  return S(n).categories[c] ?? c;
}
function Fi(c) {
  return Gs.includes(c);
}
function be(c, n, o) {
  const h = (o?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(h, { style: "currency", currency: n, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c / 100);
}
function Ds(c) {
  const n = c.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(n)) return null;
  const [o, h = ""] = n.split("."), l = Number(o) * 100 + Number((h + "00").slice(0, 2));
  return Number.isSafeInteger(l) ? l : null;
}
const Ki = "camper-travel-journal-expenses-changed", Yi = "camper-travel-journal-data-changed";
function Ui(c) {
  window.dispatchEvent(new CustomEvent(Ki, { detail: c }));
}
function X(c) {
  window.dispatchEvent(new CustomEvent(Yi, { detail: c }));
}
const Bt = "camper-travel-journal-active-trip-changed";
function js(c) {
  return `camper-travel-journal:${typeof window < "u" && window.location.pathname || "/"}:${c}`;
}
function rn(c) {
  if (!c || typeof window > "u") return "";
  try {
    return window.sessionStorage.getItem(js(c)) ?? "";
  } catch {
    return "";
  }
}
function Ot(c) {
  if (!(!c.vehicleId || !c.tripId || typeof window > "u")) {
    try {
      window.sessionStorage.setItem(js(c.vehicleId), c.tripId);
    } catch {
    }
    window.dispatchEvent(new CustomEvent(Bt, { detail: c }));
  }
}
class Vs extends ee {
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
    const o = n.detail;
    o?.vehicleId !== this.vehicleId || o.tripId === this.selectedTripId || (this.selectedTripId = o.tripId, this.refresh());
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(Ki, this.onDataChanged), window.addEventListener(Yi, this.onDataChanged), window.addEventListener(Bt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(Ki, this.onDataChanged), window.removeEventListener(Yi, this.onDataChanged), window.removeEventListener(Bt, this.onActiveTripChanged), super.disconnectedCallback();
  }
  onHassConnectionChanged() {
    this.refresh();
  }
  onConfigChanged() {
    this.refresh();
  }
  chooseDefaultTrip(n) {
    const o = (h, l) => (l.started_at || "").localeCompare(h.started_at || "") || l.id.localeCompare(h.id);
    return n.filter((h) => h.status === "active").sort(o)[0] ?? [...n].sort(o)[0];
  }
  async refresh() {
    if (!this.hass || !this.vehicleId) return !1;
    this.loading = !0, this.requestUpdate();
    try {
      const n = await te(this.hass, this.vehicleId);
      this.trips = n.trips;
      const o = rn(this.vehicleId), l = n.trips.find((f) => f.id === (o || this.selectedTripId)) ?? this.chooseDefaultTrip(n.trips);
      this.selectedTripId = l?.id ?? "", l && Ot({ vehicleId: this.vehicleId, tripId: l.id, source: "summary" });
      const u = l ? await te(this.hass, this.vehicleId, l.id) : n;
      return this.snapshot = l ? { ...u, trips: [l] } : u, this.loadError = "", !0;
    } catch {
      return this.loadError = S(this.hass).loadError, !1;
    } finally {
      this.loading = !1, this.requestUpdate();
    }
  }
  async setStatus(n) {
    const o = this.snapshot?.trips[0];
    if (!(!this.hass || !o))
      try {
        await qs(this.hass, this.vehicleId, o.id, n), this.actionError = "", await this.refresh();
      } catch {
        this.actionError = S(this.hass).statusError, this.requestUpdate();
      }
  }
  async selectTrip(n) {
    !this.hass || this.loading || !this.trips.some((o) => o.id === n) || (this.selectedTripId = n, Ot({ vehicleId: this.vehicleId, tripId: n, source: "summary" }), await this.refresh());
  }
  render() {
    const n = S(this.hass), o = this.snapshot?.trips[0], h = this.trips, l = (this.snapshot?.drives ?? []).reduce((T, w) => T + w.distance_m, 0) / 1e3;
    (this.snapshot?.stops ?? []).filter((T) => T.confirmed !== !1).filter((T) => ["campsite", "rv_site", "wild_camp", "overnight"].includes(T.place_kind || T.place_type || T.stop_type)).length;
    const f = this.snapshot?.expense_summary, v = f?.mixed_currency ? n.mixedCurrency : f?.total_minor !== void 0 && f.currency ? be(f.total_minor, f.currency, this.hass) : be(0, "EUR", this.hass), m = this.loadError || this.actionError, x = o ? Xt(o, this.hass) : "";
    return y`<ha-card><h2>${o?.title ?? n.title}</h2>${h.length ? y`<label class="trip-selector">${n.summaryChooseTrip}<select aria-label=${n.summaryTrip} @change=${(T) => {
      this.selectTrip(T.currentTarget.value);
    }} ?disabled=${this.loading}>${h.map((T) => y`<option value=${T.id} ?selected=${T.id === this.selectedTripId}>${T.title} · ${Xe(T.status, this.hass)} · ${Xt(T, this.hass)}</option>`)}</select></label>` : ""}${m ? y`<p class="error" role="alert">${m}</p>` : o ? y`<p class="muted">${o.destination || n.noDestination} · ${Xe(o.status, this.hass)} · ${x}</p><div class="grid"><div class="metric"><span class="muted">${n.distance}</span><span class="value">${l.toFixed(1)} km</span></div><div class="metric"><span class="muted">${n.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${n.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${n.costs}</span><span class="value">${v}</span></div></div><div class="actions">${o.status === "planned" ? y`<button @click=${() => this.setStatus("active")}>${n.start}</button>` : o.status === "paused" ? y`<button @click=${() => this.setStatus("active")}>${n.resume}</button>` : ""}${o.status === "active" ? y`<button class="secondary" @click=${() => this.setStatus("paused")}>${n.pause}</button><button @click=${() => this.setStatus("completed")}>${n.complete}</button>` : ""}</div>` : y`<p class="muted">${n.noTrip}</p>`}${this.loading ? y`<p class="muted">${n.loading}</p>` : ""}</ha-card>`;
  }
}
Vs.styles = [ee.styles, Nt`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}`];
nn("camper-travel-journal-summary-card", Vs);
class Je extends ee {
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
  category = Ni[0];
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
  suggestionEditingId = "";
  suggestionName = "GPS-Stopp";
  suggestionType = "other";
  onActiveTripChanged = (n) => {
    const o = n.detail;
    o?.vehicleId !== this.vehicleId || o.tripId === this.activeTripId || (this.activeTripId = o.tripId, this.selected = "", this.refresh());
  };
  async refreshSuggestions(n) {
    if (this.hass)
      try {
        await aa(this.hass, this.vehicleId, n), await this.refresh();
      } catch {
        this.fail(S(this.hass).loadError);
      }
  }
  async acceptSuggestion(n, o) {
    if (this.hass) {
      if (this.suggestionEditingId !== n.id) {
        this.suggestionEditingId = n.id, this.suggestionName = "GPS-Stopp", this.suggestionType = "other", this.requestUpdate();
        return;
      }
      try {
        await ha(this.hass, this.vehicleId, n.id, o, this.suggestionName, this.suggestionType), this.suggestionEditingId = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: o });
      } catch {
        this.fail(S(this.hass).loadError);
      }
    }
  }
  async dismissSuggestion(n, o) {
    if (this.hass)
      try {
        await la(this.hass, this.vehicleId, n.id), await this.refresh(), X({ vehicleId: this.vehicleId, tripId: o });
      } catch {
        this.fail(S(this.hass).loadError);
      }
  }
  resetPlaceForm() {
    this.placeName = "", this.placeType = "other", this.placeArrived = "", this.placeDeparted = "", this.placeLatitude = "", this.placeLongitude = "", this.placeDescription = "", this.placeAddress = "", this.editingPlaceId = "";
  }
  placePayload() {
    const n = (o) => o.trim() ? Number(o.replace(",", ".")) : void 0;
    return { name: this.placeName.trim(), place_type: this.placeType, category: this.placeType, occurred_at: new Date(this.placeArrived).toISOString(), arrived_at: new Date(this.placeArrived).toISOString(), departed_at: this.placeDeparted ? new Date(this.placeDeparted).toISOString() : void 0, latitude: n(this.placeLatitude), longitude: n(this.placeLongitude), address: this.placeAddress, description: this.placeDescription };
  }
  editPlace(n) {
    this.editingPlaceId = n.id, this.placeName = n.name, this.placeType = n.place_type || n.stop_type, this.placeArrived = n.arrived_at ? this.placeLocalDateTime(n.arrived_at) : this.placeLocalDateTime(n.occurred_at), this.placeDeparted = n.departed_at ? this.placeLocalDateTime(n.departed_at) : "", this.placeLatitude = n.latitude == null ? "" : String(n.latitude), this.placeLongitude = n.longitude == null ? "" : String(n.longitude), this.placeDescription = n.description || "", this.placeAddress = n.address || "", this.requestUpdate();
  }
  placeLocalDateTime(n) {
    const o = new Date(n), h = (l) => String(l).padStart(2, "0");
    return `${o.getFullYear()}-${h(o.getMonth() + 1)}-${h(o.getDate())}T${h(o.getHours())}:${h(o.getMinutes())}`;
  }
  async savePlace(n) {
    if (!(!this.hass || this.placeSaving || !this.placeName.trim() || !this.placeArrived)) {
      this.placeSaving = !0;
      try {
        const o = this.placePayload();
        if (this.editingPlaceId) await ia(this.hass, this.vehicleId, this.editingPlaceId, o);
        else {
          const h = await ea(this.hass, this.vehicleId, n, o);
          ["campsite", "rv_site", "wild_camp", "overnight"].includes(this.placeType) && await sa(this.hass, this.vehicleId, h.stop_id, { place_kind: this.placeType });
        }
        this.resetPlaceForm(), await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail(S(this.hass).placeSaveError ?? S(this.hass).loadError);
      } finally {
        this.placeSaving = !1, this.requestUpdate();
      }
    }
  }
  async removePlace(n, o) {
    if (this.hass) {
      if (this.confirmingPlaceId !== n.id) {
        this.confirmingPlaceId = n.id, this.requestUpdate();
        return;
      }
      try {
        await na(this.hass, this.vehicleId, n.id), this.confirmingPlaceId = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: o });
      } catch {
        this.fail(S(this.hass).placeDeleteError ?? S(this.hass).loadError);
      }
    }
  }
  async saveRating(n, o) {
    if (!this.hass) return;
    const h = [this.ratingOverall, this.ratingAccess, this.ratingSpace, this.ratingFacilities, this.ratingSurroundings];
    if (!this.ratingOverall || h.slice(1).some((l) => l && (!/^\d$/.test(l) || Number(l) < 1 || Number(l) > 5))) return this.fail(S(this.hass).ratingInvalid ?? S(this.hass).dateInvalid);
    try {
      await ra(this.hass, this.vehicleId, n, { overall: Number(this.ratingOverall), large_rv_access: this.ratingAccess ? Number(this.ratingAccess) : void 0, space_maneuvering: this.ratingSpace ? Number(this.ratingSpace) : void 0, facilities: this.ratingFacilities ? Number(this.ratingFacilities) : void 0, surroundings: this.ratingSurroundings ? Number(this.ratingSurroundings) : void 0, review_text: this.ratingText }), this.ratingPlaceId = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: o });
    } catch {
      this.fail(S(this.hass).ratingSaveError ?? S(this.hass).loadError);
    }
  }
  async removeRating(n, o) {
    if (this.hass)
      try {
        await oa(this.hass, this.vehicleId, n), this.ratingPlaceId = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: o });
      } catch {
        this.fail(S(this.hass).ratingSaveError ?? S(this.hass).loadError);
      }
  }
  startRating(n) {
    this.ratingPlaceId = n.id, this.ratingOverall = n.rating_overall ? String(n.rating_overall) : "", this.ratingAccess = n.large_rv_access ? String(n.large_rv_access) : "", this.ratingSpace = n.space_maneuvering ? String(n.space_maneuvering) : "", this.ratingFacilities = n.facilities ? String(n.facilities) : "", this.ratingSurroundings = n.surroundings ? String(n.surroundings) : "", this.ratingText = n.review_text || "", this.requestUpdate();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(Bt, this.onActiveTripChanged), this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(Bt, this.onActiveTripChanged), super.disconnectedCallback();
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
      const n = rn(this.vehicleId);
      this.activeTripId || (this.activeTripId = n);
      let o = await te(this.hass, this.vehicleId, this.activeTripId || void 0);
      const h = o.trips.find((l) => l.id === this.activeTripId) ?? o.trips.find((l) => l.status === "active") ?? o.trips[0];
      h && this.activeTripId !== h.id ? (this.activeTripId = h.id, Ot({ vehicleId: this.vehicleId, tripId: this.activeTripId, source: "manager" }), o = await te(this.hass, this.vehicleId, this.activeTripId)) : h && Ot({ vehicleId: this.vehicleId, tripId: h.id, source: "manager" }), this.snapshot = o;
      try {
        const l = await sn(this.hass);
        this.vehicleName = l.find((u) => u.vehicle_id === this.vehicleId)?.name || "";
      } catch {
        this.vehicleName = "";
      }
      return this.loadError = "", this.requestUpdate(), !0;
    } catch {
      return this.loadError = S(this.hass).loadError, this.requestUpdate(), !1;
    }
  }
  fail(n) {
    this.actionError = n, this.requestUpdate();
  }
  async readGPX(n) {
    const o = n.currentTarget.files?.[0];
    if (!(!o || !this.hass)) {
      this.gpxBusy = !0, this.gpxError = "", this.gpxPreview = void 0, this.gpxName = o.name;
      try {
        const h = new Uint8Array(await o.arrayBuffer());
        let l = "";
        h.forEach((u) => {
          l += String.fromCharCode(u);
        }), this.gpxContent = btoa(l), this.gpxPreview = await ua(this.hass, this.vehicleId, this.gpxContent), this.gpxSelected = new Set(this.gpxPreview.drives.map((u) => u.key)), this.gpxTripId = this.activeTripId;
      } catch {
        this.gpxError = S(this.hass).gpxAnalyzeError;
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
        await pa(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], n), this.gpxPreview = void 0, this.gpxContent = "", this.gpxSelected.clear(), this.gpxTripId = "", this.actionError = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n ?? "" });
      } catch {
        this.gpxError = S(this.hass).gpxImportError;
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
    if (!Fi(n)) return this.fail(S(this.hass).categoryInvalid);
    this.category = n, this.requestUpdate();
  }
  setEditingExpenseCategory(n) {
    if (!Fi(n)) return this.fail(S(this.hass).categoryInvalid);
    this.editingCategory = n, this.requestUpdate();
  }
  gpxPeriod() {
    const n = (this.gpxPreview?.points ?? []).map((o) => o.recorded_at).sort();
    return n.length ? { start: n[0], end: n[n.length - 1] } : void 0;
  }
  gpxSelectedDistanceKm() {
    return (this.gpxPreview?.drives ?? []).filter((n) => this.gpxSelected.has(n.key)).reduce((n, o) => n + o.distance_m, 0) / 1e3;
  }
  gpxTripPeriodWarning(n) {
    const o = this.gpxPeriod();
    if (!o || !n || !n.start_date && !n.end_date) return !1;
    const h = o.start.slice(0, 10), l = o.end.slice(0, 10);
    return !!(n.start_date && h < n.start_date || n.end_date && l > n.end_date);
  }
  async addTrip() {
    if (!(!this.hass || !this.tripTitle.trim())) {
      if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(S(this.hass).dateInvalid);
      try {
        await qo(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination), this.actionError = "", this.tripTitle = "", this.destination = "", this.tripStartDate = "", this.tripEndDate = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: this.activeTripId });
      } catch {
        this.fail(S(this.hass).tripCreateError);
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
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail(S(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(S(this.hass).dateInvalid);
    try {
      await Go(this.hass, this.vehicleId, n.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }), this.actionError = "", this.editingTripId = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n.id });
    } catch {
      this.fail(S(this.hass).tripEditError);
    }
  }
  async removeTrip(n) {
    if (this.hass) {
      if (this.confirmingTripId !== n) {
        this.confirmingTripId = n, this.requestUpdate();
        return;
      }
      try {
        await jo(this.hass, this.vehicleId, n), this.confirmingTripId = "", this.selected === n && (this.selected = ""), this.activeTripId === n && (this.activeTripId = ""), await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail(S(this.hass).tripDeleteError);
      }
    }
  }
  async changeStatus(n, o) {
    if (this.hass)
      try {
        await qs(this.hass, this.vehicleId, n, o), this.actionError = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail(S(this.hass).statusError);
      }
  }
  async assignDrive(n, o) {
    if (this.hass)
      try {
        await Ko(this.hass, this.vehicleId, n, [o]), this.actionError = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail(S(this.hass).driveAssignError);
      }
  }
  async unassignDrive(n, o) {
    if (this.hass)
      try {
        await Vo(this.hass, this.vehicleId, n, o), this.actionError = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail(S(this.hass).driveAssignError);
      }
  }
  toggleTripDetails(n) {
    this.selected = this.selected === n ? "" : n, this.selected ? (this.activeTripId = n, Ot({ vehicleId: this.vehicleId, tripId: n, source: "manager" }), this.refresh()) : this.requestUpdate();
  }
  async addManualDrive(n) {
    if (!this.hass || this.manualSaving) return;
    const o = Number(this.manualDistanceKm.replace(",", ".")), h = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : void 0;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(o) || o < 0 || h !== void 0 && (!Number.isInteger(h) || h < 0)) return this.fail(S(this.hass).dateInvalid);
    this.manualSaving = !0;
    try {
      await Yo(this.hass, this.vehicleId, { trip_id: n, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: o, ...h === void 0 ? {} : { duration_minutes: h } }), this.actionError = "", this.manualStartLocation = "", this.manualEndLocation = "", this.manualDistanceKm = "", this.manualDurationMinutes = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
    } catch {
      this.fail(S(this.hass).driveCreateError);
    } finally {
      this.manualSaving = !1, this.requestUpdate();
    }
  }
  localDateTime(n) {
    const o = new Date(n), h = (l) => String(l).padStart(2, "0");
    return `${o.getFullYear()}-${h(o.getMonth() + 1)}-${h(o.getDate())}T${h(o.getHours())}:${h(o.getMinutes())}`;
  }
  startManualDriveEdit(n) {
    this.actionError = "", this.editingDriveId = n.id, this.editingDriveOccurredAt = this.localDateTime(n.started_at), this.editingDriveStartLocation = n.start_label || "", this.editingDriveEndLocation = n.end_label || "", this.editingDriveDistanceKm = (n.distance_m / 1e3).toFixed(1), this.editingDriveDurationMinutes = n.duration_seconds ? String(Math.round(n.duration_seconds / 60)) : "", this.requestUpdate();
  }
  cancelManualDriveEdit() {
    this.editingDriveId = "", this.actionError = "", this.requestUpdate();
  }
  async saveManualDrive(n, o) {
    if (!this.hass || this.driveSavingId) return;
    const h = Number(this.editingDriveDistanceKm.replace(",", ".")), l = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : void 0;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(h) || h < 0 || l !== void 0 && (!Number.isInteger(l) || l < 0)) return this.fail(S(this.hass).dateInvalid);
    this.driveSavingId = n.id;
    try {
      await Xo(this.hass, this.vehicleId, n.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: h, ...l === void 0 ? {} : { duration_minutes: l } }), this.actionError = "", this.cancelManualDriveEdit(), await this.refresh(), X({ vehicleId: this.vehicleId, tripId: o });
    } catch {
      this.fail(S(this.hass).driveEditError);
    } finally {
      this.driveSavingId = "", this.requestUpdate();
    }
  }
  async removeManualDrive(n, o) {
    if (!(!this.hass || this.driveSavingId)) {
      if (this.confirmingDriveId !== o) {
        this.confirmingDriveId = o, this.requestUpdate();
        return;
      }
      this.driveSavingId = o;
      try {
        await Jo(this.hass, this.vehicleId, o), this.confirmingDriveId = "", this.actionError = "", await this.refresh(), X({ vehicleId: this.vehicleId, tripId: n });
      } catch {
        this.fail(S(this.hass).driveDeleteError);
      } finally {
        this.driveSavingId = "", this.requestUpdate();
      }
    }
  }
  async addExpense(n) {
    if (!this.hass) return;
    const o = S(this.hass), h = Ds(this.amount);
    if (h === null) return this.fail(o.amountInvalid);
    try {
      await Qo(this.hass, this.vehicleId, n, { occurred_at: (/* @__PURE__ */ new Date()).toISOString(), category: this.category, amount_minor: h, currency: "EUR" }), this.actionError = "", await this.refresh() && (this.amount = "", Ui({ vehicleId: this.vehicleId, tripId: n }));
    } catch {
      this.fail(o.expenseCreateError);
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
    const o = S(this.hass), h = Ds(this.editingAmount);
    if (h === null) return this.fail(o.amountInvalid);
    if (!Fi(this.editingCategory)) return this.fail(o.categoryInvalid);
    this.expenseSavingId = n.id;
    try {
      await ta(this.hass, this.vehicleId, n.id, { amount_minor: h, category: this.editingCategory }), this.actionError = "", await this.refresh() && (this.cancelExpenseEdit(), Ui({ vehicleId: this.vehicleId, tripId: n.trip_id ?? this.activeTripId }));
    } catch {
      this.fail(o.expenseEditError);
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
        await ca(this.hass, this.vehicleId, n), this.confirmingExpenseId = "", this.actionError = "", await this.refresh() && Ui({ vehicleId: this.vehicleId, tripId: this.activeTripId });
      } catch {
        this.fail(S(this.hass).expenseDeleteError);
      } finally {
        this.expenseSavingId = "", this.requestUpdate();
      }
    }
  }
  categoryOptions(n) {
    const o = [...Ni];
    return n && !o.includes(n) && o.unshift(n), o;
  }
  async downloadPdf(n) {
    if (!(!this.hass || this.pdfBusyTripId)) {
      this.pdfBusyTripId = n.id, this.actionError = "", this.requestUpdate();
      try {
        const o = await da(this.hass, this.vehicleId, n.id), h = atob(o.pdf_base64), l = Uint8Array.from(h, (v) => v.charCodeAt(0)), u = URL.createObjectURL(new Blob([l], { type: o.content_type })), f = document.createElement("a");
        f.href = u, f.download = o.filename, f.click(), window.setTimeout(() => URL.revokeObjectURL(u), 1e3);
      } catch {
        this.fail(S(this.hass).pdfExportError);
      } finally {
        this.pdfBusyTripId = "", this.requestUpdate();
      }
    }
  }
  renderExpense(n, o) {
    const h = this.editingExpenseId === n.id, l = this.expenseSavingId === n.id;
    return y`<div class="expense-row">${h ? y`<form class="expense-form" @submit=${(u) => {
      u.preventDefault(), this.saveExpense(n);
    }}><select aria-label=${o.category} .value=${this.editingCategory} @change=${(u) => this.setEditingExpenseCategory(u.currentTarget.value)}>${this.categoryOptions(this.editingCategory).map((u) => y`<option value=${u}>${Zi(u, this.hass)}</option>`)}</select><input aria-label=${o.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(u) => this.setEditingExpenseAmount(u.currentTarget.value)}><div class="actions"><button type="submit" ?disabled=${l}>${l ? o.saving : o.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${l}>${o.cancel}</button></div></form>` : y`<span>${Zi(n.category, this.hass)}: ${be(n.amount_minor, n.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(n)} ?disabled=${!!this.expenseSavingId}>${o.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(n.id)}>${this.confirmingExpenseId === n.id ? o.confirmDelete : o.remove}</button></span>`}</div>`;
  }
  renderDrive(n, o, h) {
    const l = n.source === "manual" ? h.sourceManual : h.sourceGps, u = n.source === "manual" ? `${n.start_label || "—"} → ${n.end_label || "—"}` : `${h.driveStart}: ${ut(n.started_at, this.hass)} · ${h.driveEnd}: ${ut(n.ended_at, this.hass)}`;
    if (this.editingDriveId === n.id) return y`<form class="form-grid drive-edit-form" @submit=${(m) => {
      m.preventDefault(), this.saveManualDrive(n, o);
    }}><label>${h.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(m) => this.editingDriveOccurredAt = m.currentTarget.value}></label><input aria-label=${h.startLocation} .value=${this.editingDriveStartLocation} @input=${(m) => this.editingDriveStartLocation = m.currentTarget.value}><input aria-label=${h.endLocation} .value=${this.editingDriveEndLocation} @input=${(m) => this.editingDriveEndLocation = m.currentTarget.value}><input aria-label=${h.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(m) => this.editingDriveDistanceKm = m.currentTarget.value}><input aria-label=${h.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(m) => this.editingDriveDurationMinutes = m.currentTarget.value}><button type="submit" ?disabled=${this.driveSavingId === n.id}>${this.driveSavingId === n.id ? h.saving : h.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${!!this.driveSavingId}>${h.cancel}</button></form>`;
    const f = n.trip_id === o ? y`<button type="button" class="link" @click=${() => this.unassignDrive(o, n.id)}>${h.unassign}</button>` : y`<button type="button" class="link" @click=${() => this.assignDrive(o, n.id)}>${h.assign}</button>`, v = n.source === "manual" ? y`<button type="button" class="link" @click=${() => this.startManualDriveEdit(n)} ?disabled=${!!this.driveSavingId}>${h.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(o, n.id)} ?disabled=${!!this.driveSavingId}>${this.confirmingDriveId === n.id ? h.confirmDelete : h.remove}</button>` : "";
    return y`<div class="drive-row"><div><strong>${l}</strong> · ${u}<br><span class="muted">${(n.distance_m / 1e3).toFixed(1)} km · ${Ge(n.duration_seconds, this.hass)} · ${n.assignment_status === "assigned" ? h.assignedDrives : h.freeDrives}</span></div><span class="actions">${v}${f}</span></div>`;
  }
  renderGpx(n, o, h) {
    const l = o.find((v) => v.id === this.gpxTripId), u = this.gpxPeriod(), f = this.gpxTripPeriodWarning(l);
    return y`<ha-card><section class="gpx-import gpx-explicit"><h2>${n.gpxImport}</h2><p class="muted"><strong>${n.gpxVehicle}:</strong> ${this.vehicleName || n.editorVehicle}</p><label>${n.gpxTargetTrip}<select aria-label=${n.gpxTargetTrip} .value=${this.gpxTripId} @change=${(v) => {
      this.gpxTripId = v.currentTarget.value, this.requestUpdate();
    }}><option value="">${n.gpxNoTrip}</option>${o.map((v) => y`<option value=${v.id}>${v.title} · ${Xe(v.status, this.hass)} · ${Xt(v, this.hass) || n.period}</option>`)}</select></label><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(v) => this.readGPX(v)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || n.gpxPrivacy}</p>${this.gpxError ? y`<p class="error" role="alert">${this.gpxError}</p>` : ""}${h ? y`<div class="gpx-preview"><strong>${h.drives.length} ${n.gpxSections}, ${h.points.length} ${n.gpxPoints}</strong>${u ? y`<p class="muted">${n.gpxPeriod}: ${ut(u.start, this.hass)} – ${ut(u.end, this.hass)}</p>` : ""}${f ? y`<p class="warning" role="alert">${n.gpxPeriodWarning}</p>` : ""}<h3>${n.gpxSummary}</h3><p class="muted">${h.points.length} ${n.gpxPoints}, ${this.gpxSelected.size} ${n.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${n.gpxDistance}, ${l?.title || n.gpxNoTrip}</p><div class="gpx-drive-list">${h.drives.map((v) => y`<label><input type="checkbox" .checked=${this.gpxSelected.has(v.key)} @change=${(m) => {
      m.currentTarget.checked ? this.gpxSelected.add(v.key) : this.gpxSelected.delete(v.key), this.requestUpdate();
    }}> ${ut(v.started_at, this.hass)} – ${ut(v.ended_at, this.hass)} · ${(v.distance_m / 1e3).toFixed(1)} km · ${Ge(v.duration_seconds, this.hass)}</label>`)}</div>${h.warnings.length ? y`<p class="muted">${n.gpxWarnings}: ${h.warnings.map((v) => v === "gpx_gap_possible_drive_boundary" ? n.gpxGapBoundary : v).join(", ")}</p>` : ""}${h.conflicts.duplicate_file ? y`<p class="error" role="alert">${n.gpxDuplicate}</p>` : y`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? n.saving : n.gpxConfirm}</button>`}</div>` : ""}</section></ha-card>`;
  }
  renderPdfExport(n, o) {
    if (!o.length) return "";
    const h = o.some((u) => u.id === this.activeTripId) ? this.activeTripId : o[0].id, l = o.find((u) => u.id === h) ?? o[0];
    return y`<section class="pdf-export"><h3>${n.pdfExportTitle}</h3><p class="muted">${l.title} · ${Xt(l, this.hass)}</p><div class="pdf-export-row"><button type="button" @click=${() => {
      this.downloadPdf(l);
    }} ?disabled=${!!this.pdfBusyTripId}>${this.pdfBusyTripId ? n.pdfExporting : n.pdfExport}</button></div></section>`;
  }
  renderSuggestions(n, o) {
    const h = this.snapshot?.stop_suggestions ?? [];
    return y`<section class="place-section"><h3>${n.gpsSuggestions ?? "GPS-Stoppvorschläge"}</h3><button type="button" @click=${() => {
      this.refreshSuggestions(o);
    }}>${n.generateSuggestions ?? "Vorschläge aktualisieren"}</button>${h.length ? y`<ul>${h.map((l) => y`<li>${ut(l.arrived_at, this.hass)} – ${ut(l.departed_at || l.arrived_at, this.hass)}${this.suggestionEditingId === l.id ? y`<div class="form-grid"><input aria-label=${n.placeName ?? "Name"} .value=${this.suggestionName} @input=${(u) => this.suggestionName = u.currentTarget.value}><select aria-label=${n.placeCategory ?? "Kategorie"} .value=${this.suggestionType} @change=${(u) => this.suggestionType = u.currentTarget.value}><option value="other">${n.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${n.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${n.placeFuel ?? "Tankpause"}</option><option value="campsite">${n.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${n.placeRvSite ?? "Wohnmobilstellplatz"}</option></select></div>` : ""} <button type="button" @click=${() => {
      this.acceptSuggestion(l, o);
    }}>${this.suggestionEditingId === l.id ? n.save ?? "Speichern" : n.accept ?? "Übernehmen"}</button><button type="button" class="secondary" @click=${() => {
      this.dismissSuggestion(l, o);
    }}>${n.dismiss ?? "Verwerfen"}</button></li>`)}</ul>` : y`<p class="muted">${n.noSuggestions ?? "Keine offenen Vorschläge."}</p>`}</section>`;
  }
  renderPlaces(n, o) {
    const h = this.snapshot?.stops ?? [], l = y`<option value="other">${n.placeOther ?? "Sonstiger Ort"}</option><option value="restaurant">${n.placeRestaurant ?? "Restaurant"}</option><option value="fuel_stop">${n.placeFuel ?? "Tankpause"}</option><option value="attraction">${n.placeAttraction ?? "Sehenswürdigkeit"}</option><option value="ferry">${n.placeFerry ?? "Fähre"}</option><option value="campsite">${n.placeCampsite ?? "Campingplatz"}</option><option value="rv_site">${n.placeRvSite ?? "Wohnmobilstellplatz"}</option><option value="wild_camp">${n.placeWildCamp ?? "Freistehplatz"}</option>`;
    return y`<section class="place-section"><details open><summary><strong>${n.places ?? "Orte und Zwischenstopps"}</strong><span>${h.length}</span></summary><form class="form-grid" @submit=${(u) => {
      u.preventDefault(), this.savePlace(o);
    }}><input aria-label=${n.placeName ?? "Name"} placeholder=${n.placeName ?? "Name"} .value=${this.placeName} @input=${(u) => this.placeName = u.currentTarget.value} required><select aria-label=${n.placeCategory ?? "Kategorie"} .value=${this.placeType} @change=${(u) => this.placeType = u.currentTarget.value}>${l}</select><label>${n.placeArrived ?? "Ankunft"}<input type="datetime-local" .value=${this.placeArrived} @input=${(u) => this.placeArrived = u.currentTarget.value} required></label><label>${n.placeDeparted ?? "Abfahrt"}<input type="datetime-local" .value=${this.placeDeparted} @input=${(u) => this.placeDeparted = u.currentTarget.value}></label><input aria-label=${n.placeAddress ?? "Adresse"} placeholder=${n.placeAddress ?? "Adresse"} .value=${this.placeAddress} @input=${(u) => this.placeAddress = u.currentTarget.value}><input aria-label="Latitude" inputmode="decimal" placeholder="Latitude" .value=${this.placeLatitude} @input=${(u) => this.placeLatitude = u.currentTarget.value}><input aria-label="Longitude" inputmode="decimal" placeholder="Longitude" .value=${this.placeLongitude} @input=${(u) => this.placeLongitude = u.currentTarget.value}><textarea aria-label=${n.placeDescription ?? "Notizen"} placeholder=${n.placeDescription ?? "Beschreibung und Notizen"} .value=${this.placeDescription} @input=${(u) => this.placeDescription = u.currentTarget.value}></textarea><div class="actions"><button type="submit" ?disabled=${this.placeSaving}>${this.placeSaving ? n.saving : this.editingPlaceId ? n.save : n.create ?? "Anlegen"}</button>${this.editingPlaceId ? y`<button type="button" class="secondary" @click=${() => this.resetPlaceForm()}>${n.cancel}</button>` : ""}</div></form>${h.length ? y`<div class="place-list">${h.map((u) => y`<article class="place-row"><div><strong>${u.name}</strong><span class="muted">${u.place_type || u.stop_type} · ${ut(u.arrived_at || u.occurred_at, this.hass)}${u.duration_seconds ? ` · ${Ge(u.duration_seconds, this.hass)}` : ""}${u.rating_overall ? ` · ${u.rating_overall}/5` : ""}</span><span>${u.description || ""}</span></div><div class="actions"><button type="button" class="link" @click=${() => this.editPlace(u)}>${n.edit}</button><button type="button" class="link" @click=${() => {
      this.removePlace(u, o);
    }}>${this.confirmingPlaceId === u.id ? n.confirmDelete : n.remove}</button><button type="button" class="link" @click=${() => this.startRating(u)}>${u.rating_overall ? n.ratingEdit ?? "Bewertung" : n.ratingAdd ?? "Bewerten"}</button></div>${this.ratingPlaceId === u.id ? y`<div class="rating-form form-grid"><label>${n.ratingOverall ?? "Gesamt"}<input type="number" min="1" max="5" .value=${this.ratingOverall} @input=${(f) => this.ratingOverall = f.currentTarget.value} required></label><label>${n.ratingAccess ?? "Anfahrt"}<input type="number" min="1" max="5" .value=${this.ratingAccess} @input=${(f) => this.ratingAccess = f.currentTarget.value}></label><label>${n.ratingSpace ?? "Platzgröße"}<input type="number" min="1" max="5" .value=${this.ratingSpace} @input=${(f) => this.ratingSpace = f.currentTarget.value}></label><label>${n.ratingFacilities ?? "Ausstattung"}<input type="number" min="1" max="5" .value=${this.ratingFacilities} @input=${(f) => this.ratingFacilities = f.currentTarget.value}></label><label>${n.ratingSurroundings ?? "Umgebung"}<input type="number" min="1" max="5" .value=${this.ratingSurroundings} @input=${(f) => this.ratingSurroundings = f.currentTarget.value}></label><textarea aria-label=${n.ratingComment ?? "Kommentar"} .value=${this.ratingText} @input=${(f) => this.ratingText = f.currentTarget.value}></textarea><button type="button" @click=${() => {
      this.saveRating(u.id, o);
    }}>${n.save}</button></div>` : ""}</article>`)}</div>` : y`<p class="muted">${n.noPlaces ?? "Keine Orte gespeichert."}</p>`}</details></section>`;
  }
  renderRatingActions(n, o) {
    const h = (this.snapshot?.stops ?? []).filter((l) => l.rating_overall);
    return h.length ? y`<section class="place-section"><details><summary><strong>${n.ratingEdit ?? "Bewertungen"}</strong><span>${h.length}</span></summary>${h.map((l) => y`<div class="row"><span>${l.name} · ${l.rating_overall}/5</span><button type="button" class="link" @click=${() => {
      this.removeRating(l.id, o);
    }}>${n.ratingRemove ?? "Bewertung löschen"}</button></div>`)}</details></section>` : "";
  }
  render() {
    const n = S(this.hass), o = this.snapshot?.trips ?? [];
    return y`${this.renderGpx(n, o, this.gpxPreview)}${this.renderPdfExport(n, o)}${this.selected ? this.renderSuggestions(n, this.activeTripId) : ""}${this.selected ? this.renderPlaces(n, this.activeTripId) : ""}${this.selected ? this.renderRatingActions(n, this.activeTripId) : ""}${this.renderLegacy()}`;
  }
  renderLegacy() {
    const n = S(this.hass), o = this.snapshot?.trips ?? [], h = this.snapshot?.expenses ?? [], l = this.snapshot?.expense_summary, u = l?.mixed_currency ? n.mixedCurrency : l?.total_minor !== void 0 && l.currency ? be(l.total_minor, l.currency, this.hass) : be(0, "EUR", this.hass), f = this.loadError || this.actionError, v = this.gpxPreview;
    return y`<ha-card><h2>${n.manager}</h2>${f ? y`<p class="error" role="alert">${f}</p>` : ""}<section class="gpx-import"><h3>${n.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(m) => this.readGPX(m)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || n.gpxPrivacy}</p>${this.gpxError ? y`<p class="error" role="alert">${this.gpxError}</p>` : ""}${v ? y`<div class="gpx-preview"><strong>${v.drives.length} ${n.gpxSections}, ${v.points.length} ${n.gpxPoints}</strong><ul>${v.drives.map((m) => y`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(m.key)} @change=${(x) => {
      x.currentTarget.checked ? this.gpxSelected.add(m.key) : this.gpxSelected.delete(m.key), this.requestUpdate();
    }}> ${ut(m.started_at, this.hass)} – ${ut(m.ended_at, this.hass)} · ${(m.distance_m / 1e3).toFixed(1)} km · ${Ge(m.duration_seconds, this.hass)}</label></li>`)}</ul>${v.warnings.length ? y`<p class="muted">${n.gpxWarnings}: ${v.warnings.join(", ")}</p>` : ""}${v.conflicts.duplicate_file ? y`<p class="error" role="alert">${n.gpxDuplicate}</p>` : y`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? n.saving : n.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${n.newTrip}</h3><div class="form-grid"><input aria-label=${n.tripName} placeholder=${n.tripName} .value=${this.tripTitle} @input=${(m) => this.tripTitle = m.target.value}><input aria-label=${n.destination} placeholder=${n.destination} .value=${this.destination} @input=${(m) => this.destination = m.target.value}><label>${n.startDate}<input type="date" .value=${this.tripStartDate} @input=${(m) => this.tripStartDate = m.currentTarget.value}></label><label>${n.endDate}<input type="date" .value=${this.tripEndDate} @input=${(m) => this.tripEndDate = m.currentTarget.value}></label><button type="button" @click=${() => this.addTrip()}>${n.create}</button></div></section><section><h3>${n.trips}</h3>${o.length ? o.map((m) => y`<article class="trip"><div class="row"><strong>${m.title}</strong><span class="muted">${m.destination || ""} · ${Xe(m.status, this.hass)} · ${Xt(m, this.hass) || n.period}</span></div>${this.editingTripId === m.id ? y`<form class="form-grid" @submit=${(x) => {
      x.preventDefault(), this.saveTrip(m);
    }}><input aria-label=${n.tripName} .value=${this.editingTripTitle} @input=${(x) => this.editingTripTitle = x.currentTarget.value}><input aria-label=${n.destination} .value=${this.editingDestination} @input=${(x) => this.editingDestination = x.currentTarget.value}><label>${n.startDate}<input type="date" .value=${this.editingStartDate} @input=${(x) => this.editingStartDate = x.currentTarget.value}></label><label>${n.endDate}<input type="date" .value=${this.editingEndDate} @input=${(x) => this.editingEndDate = x.currentTarget.value}></label><button type="submit">${n.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${n.cancel}</button></form>` : y`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(m)}>${n.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(m.id)}>${this.confirmingTripId === m.id ? n.confirmDelete : n.remove}</button>${m.status === "planned" || m.status === "paused" ? y`<button type="button" @click=${() => this.changeStatus(m.id, "active")}>${n.resume}</button>` : ""}${m.status === "active" ? y`<button type="button" class="secondary" @click=${() => this.changeStatus(m.id, "paused")}>${n.pause}</button><button type="button" @click=${() => this.changeStatus(m.id, "completed")}>${n.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(m.id)}>${this.selected === m.id ? n.close : n.details}</button></div>`}${this.selected === m.id ? y`<div class="details"><h4>${n.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((x) => this.renderDrive(x, m.id, n)) : y`<p class="muted">${n.noDrives}</p>`}<h4>${n.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((x) => this.renderDrive(x, m.id, n)) : y`<p class="muted">${n.noDrives}</p>`}<h4>${n.manualDrive}</h4><div class="form-grid"><label>${n.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(x) => this.manualOccurredAt = x.currentTarget.value}></label><input aria-label=${n.startLocation} placeholder=${n.startLocation} .value=${this.manualStartLocation} @input=${(x) => this.manualStartLocation = x.currentTarget.value}><input aria-label=${n.endLocation} placeholder=${n.endLocation} .value=${this.manualEndLocation} @input=${(x) => this.manualEndLocation = x.currentTarget.value}><input aria-label=${n.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${n.distanceKm} .value=${this.manualDistanceKm} @input=${(x) => this.manualDistanceKm = x.currentTarget.value}><input aria-label=${n.durationMinutes} type="number" min="0" step="1" placeholder=${n.durationMinutes} .value=${this.manualDurationMinutes} @input=${(x) => this.manualDurationMinutes = x.currentTarget.value}><button type="button" @click=${() => this.addManualDrive(m.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? n.saving : n.createDrive}</button></div><h4>${n.expenses}</h4><div class="expense-form create-form"><input aria-label=${n.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(x) => this.setExpenseAmount(x.currentTarget.value)}><select aria-label=${n.category} .value=${this.category} @change=${(x) => this.setExpenseCategory(x.currentTarget.value)}>${Ni.map((x) => y`<option value=${x}>${Zi(x, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(m.id)}>${n.save}</button></div>${h.map((x) => this.renderExpense(x, n))}<p class="total"><strong>${n.total}: ${u}</strong></p></div>` : ""}</article>`) : y`<p class="muted">${n.noTrip}</p>`}</section></ha-card>`;
  }
}
Je.styles = [ee.styles, Nt`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`];
Je.styles = [...Je.styles, Nt`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}@media(max-width:500px){.form-grid{grid-template-columns:1fr}.form-grid textarea{min-height:5rem}.place-section .form-grid{gap:10px}.place-section .actions{display:grid;grid-template-columns:1fr}.place-section .actions button{width:100%}.pdf-export-row button{width:100%}}`];
nn("camper-travel-journal-manager-card", Je);
const va = 1e4;
function Hi() {
  return typeof performance < "u" ? performance.now() : Date.now();
}
function Wi(c) {
  return c.length <= 8 ? "••••" : `${c.slice(0, 4)}…${c.slice(-4)}`;
}
function Ms(c) {
  return c?.connection ? c.connection.connected === !0 ? "available" : c.connection.connected === !1 ? "unavailable" : "unknown" : "unavailable";
}
function ya(c) {
  const n = c, o = typeof n?.code == "string" ? n.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected", h = typeof n?.message == "string" ? n.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240) : "Die Anfrage wurde abgelehnt.";
  return { errorCode: o, errorMessage: h };
}
function xa(c, n) {
  return new Promise((o, h) => {
    const l = setTimeout(() => h(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), n);
    c.then((u) => {
      clearTimeout(l), o(u);
    }, (u) => {
      clearTimeout(l), h(u);
    });
  });
}
async function qi(c, n, o, h) {
  const l = Hi();
  try {
    const u = await xa(c.connection.sendMessagePromise(n), h);
    return { ...o(u), durationMs: Math.round(Hi() - l), value: u };
  } catch (u) {
    return { state: "failed", durationMs: Math.round(Hi() - l), ...ya(u) };
  }
}
function ba(c) {
  return c && typeof c == "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}
function wa(c) {
  const n = c?.vehicles;
  return Array.isArray(n) && n.every((o) => o && typeof o == "object" && typeof o.vehicle_id == "string") ? { state: "success", structure: "ok", count: n.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}
function Ta(c) {
  const n = c;
  return Array.isArray(n?.trips) && Array.isArray(n?.drives) && Array.isArray(n?.stops) ? { state: "success", structure: "ok", count: n.trips.length, drivesCount: n.drives.length, stopsCount: n.stops.length } : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}
async function Pa(c, n, o = va) {
  const h = { state: "not_run", durationMs: null };
  if (!c?.connection) return { version: "0.3.0-beta.2", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: h, vehicles: h, trips: h, vehicleId: Wi(n) };
  const l = Ms(c), u = await qi(c, { type: "auth/current_user" }, ba, o), f = await qi(c, { type: "camper_travel_journal/list_vehicles" }, wa, o), v = f.value?.vehicles?.filter((ie) => typeof ie.vehicle_id == "string") ?? [], m = v.length === 1 ? v[0].vehicle_id : void 0, T = await qi(c, { type: "camper_travel_journal/list", vehicle_id: m ?? n }, Ta, o), { value: w, ...R } = u, { value: J, ...Y } = f, { value: D, ...Zt } = T;
  return {
    version: "0.3.0-beta.2",
    connectionBefore: l,
    connectionAfter: Ms(c),
    authentication: R,
    vehicles: Y,
    trips: Zt,
    vehicleId: Wi(n),
    ...m ? { resolvedVehicleId: Wi(m) } : {}
  };
}
function Gi(c) {
  return JSON.stringify(c, null, 2);
}
function ji(c) {
  return c.state === "success" ? "erfolgreich" : c.state === "failed" ? "fehlgeschlagen" : "nicht geprüft";
}
const zs = "01M4XW0KD3GQ0KASAYHQ29840P";
class Sa extends zt {
  static styles = Nt`
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
  config = { vehicle_id: zs };
  set hass(n) {
    this._hass = n, this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(n) {
    this.config = { vehicle_id: n.vehicle_id || zs };
  }
  async start() {
    if (!this._hass || this.running) {
      this.error = "Keine aktive Home-Assistant-Verbindung verfügbar.", this.requestUpdate();
      return;
    }
    this.running = !0, this.error = "", this.manualCopy = !1, this.requestUpdate();
    try {
      this.report = await Pa(this._hass, this.config.vehicle_id);
    } catch {
      this.error = "Diagnose konnte nicht gestartet werden.";
    } finally {
      this.running = !1, this.requestUpdate();
    }
  }
  async copyReport() {
    if (!this.report) return;
    const n = Gi(this.report);
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
    return y`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? y`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? y`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${n ? y`<dl>
        <dt>Version</dt><dd>${n.version}</dd>
        <dt>Verbindung vorher</dt><dd>${n.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${n.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${ji(n.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${ji(n.vehicles)}${n.vehicles.durationMs === null ? "" : ` (${n.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${ji(n.trips)}${n.trips.durationMs === null ? "" : ` (${n.trips.durationMs} ms)`}${n.trips.state === "success" ? ` · ${n.trips.count ?? 0} Reisen / ${n.trips.drivesCount ?? 0} Fahrten / ${n.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${n.vehicles.structure === "ok" && n.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${Gi(n)}</pre>${this.manualCopy ? y`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${Gi(n)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${n ? "Diagnose wiederholen" : "Diagnose starten"}</button>${n ? y`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? y`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-diagnostics-card") && customElements.define("camper-travel-journal-diagnostics-card", Sa);
var ye = { exports: {} };
var Ea = ye.exports, Os;
function $a() {
  return Os || (Os = 1, (function(c, n) {
    (function(o, h) {
      h(n);
    })(Ea, (function(o) {
      var h = "1.9.4";
      function l(t) {
        var e, i, s, r;
        for (i = 1, s = arguments.length; i < s; i++) {
          r = arguments[i];
          for (e in r)
            t[e] = r[e];
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
      function f(t, e) {
        var i = Array.prototype.slice;
        if (t.bind)
          return t.bind.apply(t, i.call(arguments, 1));
        var s = i.call(arguments, 2);
        return function() {
          return t.apply(e, s.length ? s.concat(i.call(arguments)) : arguments);
        };
      }
      var v = 0;
      function m(t) {
        return "_leaflet_id" in t || (t._leaflet_id = ++v), t._leaflet_id;
      }
      function x(t, e, i) {
        var s, r, a, d;
        return d = function() {
          s = !1, r && (a.apply(i, r), r = !1);
        }, a = function() {
          s ? r = arguments : (t.apply(i, arguments), setTimeout(d, e), s = !0);
        }, a;
      }
      function T(t, e, i) {
        var s = e[1], r = e[0], a = s - r;
        return t === s && i ? t : ((t - r) % a + a) % a + r;
      }
      function w() {
        return !1;
      }
      function R(t, e) {
        if (e === !1)
          return t;
        var i = Math.pow(10, e === void 0 ? 6 : e);
        return Math.round(t * i) / i;
      }
      function J(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
      }
      function Y(t) {
        return J(t).split(/\s+/);
      }
      function D(t, e) {
        Object.prototype.hasOwnProperty.call(t, "options") || (t.options = t.options ? u(t.options) : {});
        for (var i in e)
          t.options[i] = e[i];
        return t.options;
      }
      function Zt(t, e, i) {
        var s = [];
        for (var r in t)
          s.push(encodeURIComponent(i ? r.toUpperCase() : r) + "=" + encodeURIComponent(t[r]));
        return (!e || e.indexOf("?") === -1 ? "?" : "&") + s.join("&");
      }
      var ie = /\{ *([\w_ -]+) *\}/g;
      function on(t, e) {
        return t.replace(ie, function(i, s) {
          var r = e[s];
          if (r === void 0)
            throw new Error("No value provided for variable " + i);
          return typeof r == "function" && (r = r(e)), r;
        });
      }
      var lt = Array.isArray || function(t) {
        return Object.prototype.toString.call(t) === "[object Array]";
      };
      function ei(t, e) {
        for (var i = 0; i < t.length; i++)
          if (t[i] === e)
            return i;
        return -1;
      }
      var Ee = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      function ii(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t];
      }
      var an = 0;
      function hn(t) {
        var e = +/* @__PURE__ */ new Date(), i = Math.max(0, 16 - (e - an));
        return an = e + i, window.setTimeout(t, i);
      }
      var ni = window.requestAnimationFrame || ii("RequestAnimationFrame") || hn, ln = window.cancelAnimationFrame || ii("CancelAnimationFrame") || ii("CancelRequestAnimationFrame") || function(t) {
        window.clearTimeout(t);
      };
      function tt(t, e, i) {
        if (i && ni === hn)
          t.call(e);
        else
          return ni.call(window, f(t, e));
      }
      function rt(t) {
        t && ln.call(window, t);
      }
      var Ys = {
        __proto__: null,
        extend: l,
        create: u,
        bind: f,
        get lastId() {
          return v;
        },
        stamp: m,
        throttle: x,
        wrapNum: T,
        falseFn: w,
        formatNum: R,
        trim: J,
        splitWords: Y,
        setOptions: D,
        getParamString: Zt,
        template: on,
        isArray: lt,
        indexOf: ei,
        emptyImageUrl: Ee,
        requestFn: ni,
        cancelFn: ln,
        requestAnimFrame: tt,
        cancelAnimFrame: rt
      };
      function _t() {
      }
      _t.extend = function(t) {
        var e = function() {
          D(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
        }, i = e.__super__ = this.prototype, s = u(i);
        s.constructor = e, e.prototype = s;
        for (var r in this)
          Object.prototype.hasOwnProperty.call(this, r) && r !== "prototype" && r !== "__super__" && (e[r] = this[r]);
        return t.statics && l(e, t.statics), t.includes && (Xs(t.includes), l.apply(null, [s].concat(t.includes))), l(s, t), delete s.statics, delete s.includes, s.options && (s.options = i.options ? u(i.options) : {}, l(s.options, t.options)), s._initHooks = [], s.callInitHooks = function() {
          if (!this._initHooksCalled) {
            i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
            for (var a = 0, d = s._initHooks.length; a < d; a++)
              s._initHooks[a].call(this);
          }
        }, e;
      }, _t.include = function(t) {
        var e = this.prototype.options;
        return l(this.prototype, t), t.options && (this.prototype.options = e, this.mergeOptions(t.options)), this;
      }, _t.mergeOptions = function(t) {
        return l(this.prototype.options, t), this;
      }, _t.addInitHook = function(t) {
        var e = Array.prototype.slice.call(arguments, 1), i = typeof t == "function" ? t : function() {
          this[t].apply(this, e);
        };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i), this;
      };
      function Xs(t) {
        if (!(typeof L > "u" || !L || !L.Mixin)) {
          t = lt(t) ? t : [t];
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
        on: function(t, e, i) {
          if (typeof t == "object")
            for (var s in t)
              this._on(s, t[s], e);
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
            for (var s in t)
              this._off(s, t[s], e);
          else {
            t = Y(t);
            for (var r = arguments.length === 1, a = 0, d = t.length; a < d; a++)
              r ? this._off(t[a]) : this._off(t[a], e, i);
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
            var r = { fn: e, ctx: i };
            s && (r.once = !0), this._events = this._events || {}, this._events[t] = this._events[t] || [], this._events[t].push(r);
          }
        },
        _off: function(t, e, i) {
          var s, r, a;
          if (this._events && (s = this._events[t], !!s)) {
            if (arguments.length === 1) {
              if (this._firingCount)
                for (r = 0, a = s.length; r < a; r++)
                  s[r].fn = w;
              delete this._events[t];
              return;
            }
            if (typeof e != "function") {
              console.warn("wrong listener type: " + typeof e);
              return;
            }
            var d = this._listens(t, e, i);
            if (d !== !1) {
              var p = s[d];
              this._firingCount && (p.fn = w, this._events[t] = s = s.slice()), s.splice(d, 1);
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
          var s = l({}, e, {
            type: t,
            target: this,
            sourceTarget: e && e.sourceTarget || this
          });
          if (this._events) {
            var r = this._events[t];
            if (r) {
              this._firingCount = this._firingCount + 1 || 1;
              for (var a = 0, d = r.length; a < d; a++) {
                var p = r[a], g = p.fn;
                p.once && this.off(t, g, p.ctx), g.call(p.ctx || this, s);
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
          var r = e;
          typeof e != "function" && (s = !!e, r = void 0, i = void 0);
          var a = this._events && this._events[t];
          if (a && a.length && this._listens(t, r, i) !== !1)
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
          for (var r = 0, a = s.length; r < a; r++)
            if (s[r].fn === e && s[r].ctx === i)
              return r;
          return !1;
        },
        // @method once(…): this
        // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
        once: function(t, e, i) {
          if (typeof t == "object")
            for (var s in t)
              this._on(s, t[s], e, !0);
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
          return this._eventParents = this._eventParents || {}, this._eventParents[m(t)] = t, this;
        },
        // @method removeEventParent(obj: Evented): this
        // Removes an event parent, so it will stop receiving propagated events
        removeEventParent: function(t) {
          return this._eventParents && delete this._eventParents[m(t)], this;
        },
        _propagateEvent: function(t) {
          for (var e in this._eventParents)
            this._eventParents[e].fire(t.type, l({
              layer: t.target,
              propagatedFrom: t.target
            }, t), !0);
        }
      };
      st.addEventListener = st.on, st.removeEventListener = st.clearAllEventListeners = st.off, st.addOneTimeEventListener = st.once, st.fireEvent = st.fire, st.hasEventListeners = st.listens;
      var ne = _t.extend(st);
      function C(t, e, i) {
        this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e;
      }
      var cn = Math.trunc || function(t) {
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
          return this.clone()._add($(t));
        },
        _add: function(t) {
          return this.x += t.x, this.y += t.y, this;
        },
        // @method subtract(otherPoint: Point): Point
        // Returns the result of subtraction of the given point from the current.
        subtract: function(t) {
          return this.clone()._subtract($(t));
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
          return this.x = cn(this.x), this.y = cn(this.y), this;
        },
        // @method distanceTo(otherPoint: Point): Number
        // Returns the cartesian distance between the current and the given points.
        distanceTo: function(t) {
          t = $(t);
          var e = t.x - this.x, i = t.y - this.y;
          return Math.sqrt(e * e + i * i);
        },
        // @method equals(otherPoint: Point): Boolean
        // Returns `true` if the given point has the same coordinates.
        equals: function(t) {
          return t = $(t), t.x === this.x && t.y === this.y;
        },
        // @method contains(otherPoint: Point): Boolean
        // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
        contains: function(t) {
          return t = $(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y);
        },
        // @method toString(): String
        // Returns a string representation of the point for debugging purposes.
        toString: function() {
          return "Point(" + R(this.x) + ", " + R(this.y) + ")";
        }
      };
      function $(t, e, i) {
        return t instanceof C ? t : lt(t) ? new C(t[0], t[1]) : t == null ? t : typeof t == "object" && "x" in t && "y" in t ? new C(t.x, t.y) : new C(t, e, i);
      }
      function F(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, s = 0, r = i.length; s < r; s++)
            this.extend(i[s]);
      }
      F.prototype = {
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
            e = i = $(t);
          else if (t = et(t), e = t.min, i = t.max, !e || !i)
            return this;
          return !this.min && !this.max ? (this.min = e.clone(), this.max = i.clone()) : (this.min.x = Math.min(e.x, this.min.x), this.max.x = Math.max(i.x, this.max.x), this.min.y = Math.min(e.y, this.min.y), this.max.y = Math.max(i.y, this.max.y)), this;
        },
        // @method getCenter(round?: Boolean): Point
        // Returns the center point of the bounds.
        getCenter: function(t) {
          return $(
            (this.min.x + this.max.x) / 2,
            (this.min.y + this.max.y) / 2,
            t
          );
        },
        // @method getBottomLeft(): Point
        // Returns the bottom-left point of the bounds.
        getBottomLeft: function() {
          return $(this.min.x, this.max.y);
        },
        // @method getTopRight(): Point
        // Returns the top-right point of the bounds.
        getTopRight: function() {
          return $(this.max.x, this.min.y);
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
          return typeof t[0] == "number" || t instanceof C ? t = $(t) : t = et(t), t instanceof F ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y;
        },
        // @method intersects(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds
        // intersect if they have at least one point in common.
        intersects: function(t) {
          t = et(t);
          var e = this.min, i = this.max, s = t.min, r = t.max, a = r.x >= e.x && s.x <= i.x, d = r.y >= e.y && s.y <= i.y;
          return a && d;
        },
        // @method overlaps(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds
        // overlap if their intersection is an area.
        overlaps: function(t) {
          t = et(t);
          var e = this.min, i = this.max, s = t.min, r = t.max, a = r.x > e.x && s.x < i.x, d = r.y > e.y && s.y < i.y;
          return a && d;
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
          var e = this.min, i = this.max, s = Math.abs(e.x - i.x) * t, r = Math.abs(e.y - i.y) * t;
          return et(
            $(e.x - s, e.y - r),
            $(i.x + s, i.y + r)
          );
        },
        // @method equals(otherBounds: Bounds): Boolean
        // Returns `true` if the rectangle is equivalent to the given bounds.
        equals: function(t) {
          return t ? (t = et(t), this.min.equals(t.getTopLeft()) && this.max.equals(t.getBottomRight())) : !1;
        }
      };
      function et(t, e) {
        return !t || t instanceof F ? t : new F(t, e);
      }
      function it(t, e) {
        if (t)
          for (var i = e ? [t, e] : t, s = 0, r = i.length; s < r; s++)
            this.extend(i[s]);
      }
      it.prototype = {
        // @method extend(latlng: LatLng): this
        // Extend the bounds to contain the given point
        // @alternative
        // @method extend(otherBounds: LatLngBounds): this
        // Extend the bounds to contain the given bounds
        extend: function(t) {
          var e = this._southWest, i = this._northEast, s, r;
          if (t instanceof B)
            s = t, r = t;
          else if (t instanceof it) {
            if (s = t._southWest, r = t._northEast, !s || !r)
              return this;
          } else
            return t ? this.extend(M(t) || W(t)) : this;
          return !e && !i ? (this._southWest = new B(s.lat, s.lng), this._northEast = new B(r.lat, r.lng)) : (e.lat = Math.min(s.lat, e.lat), e.lng = Math.min(s.lng, e.lng), i.lat = Math.max(r.lat, i.lat), i.lng = Math.max(r.lng, i.lng)), this;
        },
        // @method pad(bufferRatio: Number): LatLngBounds
        // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
        // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
        // Negative values will retract the bounds.
        pad: function(t) {
          var e = this._southWest, i = this._northEast, s = Math.abs(e.lat - i.lat) * t, r = Math.abs(e.lng - i.lng) * t;
          return new it(
            new B(e.lat - s, e.lng - r),
            new B(i.lat + s, i.lng + r)
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
          typeof t[0] == "number" || t instanceof B || "lat" in t ? t = M(t) : t = W(t);
          var e = this._southWest, i = this._northEast, s, r;
          return t instanceof it ? (s = t.getSouthWest(), r = t.getNorthEast()) : s = r = t, s.lat >= e.lat && r.lat <= i.lat && s.lng >= e.lng && r.lng <= i.lng;
        },
        // @method intersects(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
        intersects: function(t) {
          t = W(t);
          var e = this._southWest, i = this._northEast, s = t.getSouthWest(), r = t.getNorthEast(), a = r.lat >= e.lat && s.lat <= i.lat, d = r.lng >= e.lng && s.lng <= i.lng;
          return a && d;
        },
        // @method overlaps(otherBounds: LatLngBounds): Boolean
        // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
        overlaps: function(t) {
          t = W(t);
          var e = this._southWest, i = this._northEast, s = t.getSouthWest(), r = t.getNorthEast(), a = r.lat > e.lat && s.lat < i.lat, d = r.lng > e.lng && s.lng < i.lng;
          return a && d;
        },
        // @method toBBoxString(): String
        // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
        toBBoxString: function() {
          return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
        },
        // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
        // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
        equals: function(t, e) {
          return t ? (t = W(t), this._southWest.equals(t.getSouthWest(), e) && this._northEast.equals(t.getNorthEast(), e)) : !1;
        },
        // @method isValid(): Boolean
        // Returns `true` if the bounds are properly initialized.
        isValid: function() {
          return !!(this._southWest && this._northEast);
        }
      };
      function W(t, e) {
        return t instanceof it ? t : new it(t, e);
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
          return W(
            [this.lat - e, this.lng - i],
            [this.lat + e, this.lng + i]
          );
        },
        clone: function() {
          return new B(this.lat, this.lng, this.alt);
        }
      };
      function M(t, e, i) {
        return t instanceof B ? t : lt(t) && typeof t[0] != "object" ? t.length === 3 ? new B(t[0], t[1], t[2]) : t.length === 2 ? new B(t[0], t[1]) : null : t == null ? t : typeof t == "object" && "lat" in t ? new B(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : e === void 0 ? null : new B(t, e, i);
      }
      var vt = {
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
          var e = this.projection.bounds, i = this.scale(t), s = this.transformation.transform(e.min, i), r = this.transformation.transform(e.max, i);
          return new F(s, r);
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
          var e = this.wrapLng ? T(t.lng, this.wrapLng, !0) : t.lng, i = this.wrapLat ? T(t.lat, this.wrapLat, !0) : t.lat, s = t.alt;
          return new B(i, e, s);
        },
        // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
        // Returns a `LatLngBounds` with the same size as the given one, ensuring
        // that its center is within the CRS's bounds.
        // Only accepts actual `L.LatLngBounds` instances, not arrays.
        wrapLatLngBounds: function(t) {
          var e = t.getCenter(), i = this.wrapLatLng(e), s = e.lat - i.lat, r = e.lng - i.lng;
          if (s === 0 && r === 0)
            return t;
          var a = t.getSouthWest(), d = t.getNorthEast(), p = new B(a.lat - s, a.lng - r), g = new B(d.lat - s, d.lng - r);
          return new it(p, g);
        }
      }, Pt = l({}, vt, {
        wrapLng: [-180, 180],
        // Mean Earth Radius, as recommended for use by
        // the International Union of Geodesy and Geophysics,
        // see https://rosettacode.org/wiki/Haversine_formula
        R: 6371e3,
        // distance between two geographical points using spherical law of cosines approximation
        distance: function(t, e) {
          var i = Math.PI / 180, s = t.lat * i, r = e.lat * i, a = Math.sin((e.lat - t.lat) * i / 2), d = Math.sin((e.lng - t.lng) * i / 2), p = a * a + Math.cos(s) * Math.cos(r) * d * d, g = 2 * Math.atan2(Math.sqrt(p), Math.sqrt(1 - p));
          return this.R * g;
        }
      }), dn = 6378137, si = {
        R: dn,
        MAX_LATITUDE: 85.0511287798,
        project: function(t) {
          var e = Math.PI / 180, i = this.MAX_LATITUDE, s = Math.max(Math.min(i, t.lat), -i), r = Math.sin(s * e);
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
          var t = dn * Math.PI;
          return new F([-t, -t], [t, t]);
        })()
      };
      function ri(t, e, i, s) {
        if (lt(t)) {
          this._a = t[0], this._b = t[1], this._c = t[2], this._d = t[3];
          return;
        }
        this._a = t, this._b = e, this._c = i, this._d = s;
      }
      ri.prototype = {
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
      function se(t, e, i, s) {
        return new ri(t, e, i, s);
      }
      var oi = l({}, Pt, {
        code: "EPSG:3857",
        projection: si,
        transformation: (function() {
          var t = 0.5 / (Math.PI * si.R);
          return se(t, 0.5, -t, 0.5);
        })()
      }), Js = l({}, oi, {
        code: "EPSG:900913"
      });
      function un(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function pn(t, e) {
        var i = "", s, r, a, d, p, g;
        for (s = 0, a = t.length; s < a; s++) {
          for (p = t[s], r = 0, d = p.length; r < d; r++)
            g = p[r], i += (r ? "L" : "M") + g.x + " " + g.y;
          i += e ? P.svg ? "z" : "x" : "";
        }
        return i || "M0 0";
      }
      var ai = document.documentElement.style, $e = "ActiveXObject" in window, Qs = $e && !document.addEventListener, fn = "msLaunchUri" in navigator && !("documentMode" in document), hi = pt("webkit"), mn = pt("android"), gn = pt("android 2") || pt("android 3"), tr = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), er = mn && pt("Google") && tr < 537 && !("AudioNode" in window), li = !!window.opera, _n = !fn && pt("chrome"), vn = pt("gecko") && !hi && !li && !$e, ir = !_n && pt("safari"), yn = pt("phantom"), xn = "OTransition" in ai, nr = navigator.platform.indexOf("Win") === 0, bn = $e && "transition" in ai, ci = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !gn, wn = "MozPerspective" in ai, sr = !window.L_DISABLE_3D && (bn || ci || wn) && !xn && !yn, re = typeof orientation < "u" || pt("mobile"), rr = re && hi, or = re && ci, Tn = !window.PointerEvent && window.MSPointerEvent, Pn = !!(window.PointerEvent || Tn), Sn = "ontouchstart" in window || !!window.TouchEvent, ar = !window.L_NO_TOUCH && (Sn || Pn), hr = re && li, lr = re && vn, cr = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, dr = (function() {
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
      })(), ur = (function() {
        return !!document.createElement("canvas").getContext;
      })(), di = !!(document.createElementNS && un("svg").createSVGRect), pr = !!di && (function() {
        var t = document.createElement("div");
        return t.innerHTML = "<svg/>", (t.firstChild && t.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
      })(), fr = !di && (function() {
        try {
          var t = document.createElement("div");
          t.innerHTML = '<v:shape adj="1"/>';
          var e = t.firstChild;
          return e.style.behavior = "url(#default#VML)", e && typeof e.adj == "object";
        } catch {
          return !1;
        }
      })(), mr = navigator.platform.indexOf("Mac") === 0, gr = navigator.platform.indexOf("Linux") === 0;
      function pt(t) {
        return navigator.userAgent.toLowerCase().indexOf(t) >= 0;
      }
      var P = {
        ie: $e,
        ielt9: Qs,
        edge: fn,
        webkit: hi,
        android: mn,
        android23: gn,
        androidStock: er,
        opera: li,
        chrome: _n,
        gecko: vn,
        safari: ir,
        phantom: yn,
        opera12: xn,
        win: nr,
        ie3d: bn,
        webkit3d: ci,
        gecko3d: wn,
        any3d: sr,
        mobile: re,
        mobileWebkit: rr,
        mobileWebkit3d: or,
        msPointer: Tn,
        pointer: Pn,
        touch: ar,
        touchNative: Sn,
        mobileOpera: hr,
        mobileGecko: lr,
        retina: cr,
        passiveEvents: dr,
        canvas: ur,
        svg: di,
        vml: fr,
        inlineSvg: pr,
        mac: mr,
        linux: gr
      }, En = P.msPointer ? "MSPointerDown" : "pointerdown", $n = P.msPointer ? "MSPointerMove" : "pointermove", Ln = P.msPointer ? "MSPointerUp" : "pointerup", Cn = P.msPointer ? "MSPointerCancel" : "pointercancel", ui = {
        touchstart: En,
        touchmove: $n,
        touchend: Ln,
        touchcancel: Cn
      }, kn = {
        touchstart: wr,
        touchmove: Le,
        touchend: Le,
        touchcancel: Le
      }, Ft = {}, An = !1;
      function _r(t, e, i) {
        return e === "touchstart" && br(), kn[e] ? (i = kn[e].bind(this, i), t.addEventListener(ui[e], i, !1), i) : (console.warn("wrong event specified:", e), w);
      }
      function vr(t, e, i) {
        if (!ui[e]) {
          console.warn("wrong event specified:", e);
          return;
        }
        t.removeEventListener(ui[e], i, !1);
      }
      function yr(t) {
        Ft[t.pointerId] = t;
      }
      function xr(t) {
        Ft[t.pointerId] && (Ft[t.pointerId] = t);
      }
      function In(t) {
        delete Ft[t.pointerId];
      }
      function br() {
        An || (document.addEventListener(En, yr, !0), document.addEventListener($n, xr, !0), document.addEventListener(Ln, In, !0), document.addEventListener(Cn, In, !0), An = !0);
      }
      function Le(t, e) {
        if (e.pointerType !== (e.MSPOINTER_TYPE_MOUSE || "mouse")) {
          e.touches = [];
          for (var i in Ft)
            e.touches.push(Ft[i]);
          e.changedTouches = [e], t(e);
        }
      }
      function wr(t, e) {
        e.MSPOINTER_TYPE_TOUCH && e.pointerType === e.MSPOINTER_TYPE_TOUCH && K(e), Le(t, e);
      }
      function Tr(t) {
        var e = {}, i, s;
        for (s in t)
          i = t[s], e[s] = i && i.bind ? i.bind(t) : i;
        return t = e, e.type = "dblclick", e.detail = 2, e.isTrusted = !1, e._simulated = !0, e;
      }
      var Pr = 200;
      function Sr(t, e) {
        t.addEventListener("dblclick", e);
        var i = 0, s;
        function r(a) {
          if (a.detail !== 1) {
            s = a.detail;
            return;
          }
          if (!(a.pointerType === "mouse" || a.sourceCapabilities && !a.sourceCapabilities.firesTouchEvents)) {
            var d = Rn(a);
            if (!(d.some(function(g) {
              return g instanceof HTMLLabelElement && g.attributes.for;
            }) && !d.some(function(g) {
              return g instanceof HTMLInputElement || g instanceof HTMLSelectElement;
            }))) {
              var p = Date.now();
              p - i <= Pr ? (s++, s === 2 && e(Tr(a))) : s = 1, i = p;
            }
          }
        }
        return t.addEventListener("click", r), {
          dblclick: e,
          simDblclick: r
        };
      }
      function Er(t, e) {
        t.removeEventListener("dblclick", e.dblclick), t.removeEventListener("click", e.simDblclick);
      }
      var pi = Ae(
        ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
      ), oe = Ae(
        ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
      ), Dn = oe === "webkitTransition" || oe === "OTransition" ? oe + "End" : "transitionend";
      function Mn(t) {
        return typeof t == "string" ? document.getElementById(t) : t;
      }
      function ae(t, e) {
        var i = t.style[e] || t.currentStyle && t.currentStyle[e];
        if ((!i || i === "auto") && document.defaultView) {
          var s = document.defaultView.getComputedStyle(t, null);
          i = s ? s[e] : null;
        }
        return i === "auto" ? null : i;
      }
      function O(t, e, i) {
        var s = document.createElement(t);
        return s.className = e || "", i && i.appendChild(s), s;
      }
      function U(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }
      function Ce(t) {
        for (; t.firstChild; )
          t.removeChild(t.firstChild);
      }
      function Ut(t) {
        var e = t.parentNode;
        e && e.lastChild !== t && e.appendChild(t);
      }
      function Ht(t) {
        var e = t.parentNode;
        e && e.firstChild !== t && e.insertBefore(t, e.firstChild);
      }
      function fi(t, e) {
        if (t.classList !== void 0)
          return t.classList.contains(e);
        var i = ke(t);
        return i.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(i);
      }
      function A(t, e) {
        if (t.classList !== void 0)
          for (var i = Y(e), s = 0, r = i.length; s < r; s++)
            t.classList.add(i[s]);
        else if (!fi(t, e)) {
          var a = ke(t);
          mi(t, (a ? a + " " : "") + e);
        }
      }
      function H(t, e) {
        t.classList !== void 0 ? t.classList.remove(e) : mi(t, J((" " + ke(t) + " ").replace(" " + e + " ", " ")));
      }
      function mi(t, e) {
        t.className.baseVal === void 0 ? t.className = e : t.className.baseVal = e;
      }
      function ke(t) {
        return t.correspondingElement && (t = t.correspondingElement), t.className.baseVal === void 0 ? t.className : t.className.baseVal;
      }
      function ot(t, e) {
        "opacity" in t.style ? t.style.opacity = e : "filter" in t.style && $r(t, e);
      }
      function $r(t, e) {
        var i = !1, s = "DXImageTransform.Microsoft.Alpha";
        try {
          i = t.filters.item(s);
        } catch {
          if (e === 1)
            return;
        }
        e = Math.round(e * 100), i ? (i.Enabled = e !== 100, i.Opacity = e) : t.style.filter += " progid:" + s + "(opacity=" + e + ")";
      }
      function Ae(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
          if (t[i] in e)
            return t[i];
        return !1;
      }
      function Lt(t, e, i) {
        var s = e || new C(0, 0);
        t.style[pi] = (P.ie3d ? "translate(" + s.x + "px," + s.y + "px)" : "translate3d(" + s.x + "px," + s.y + "px,0)") + (i ? " scale(" + i + ")" : "");
      }
      function q(t, e) {
        t._leaflet_pos = e, P.any3d ? Lt(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px");
      }
      function Ct(t) {
        return t._leaflet_pos || new C(0, 0);
      }
      var he, le, gi;
      if ("onselectstart" in document)
        he = function() {
          k(window, "selectstart", K);
        }, le = function() {
          N(window, "selectstart", K);
        };
      else {
        var ce = Ae(
          ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
        );
        he = function() {
          if (ce) {
            var t = document.documentElement.style;
            gi = t[ce], t[ce] = "none";
          }
        }, le = function() {
          ce && (document.documentElement.style[ce] = gi, gi = void 0);
        };
      }
      function _i() {
        k(window, "dragstart", K);
      }
      function vi() {
        N(window, "dragstart", K);
      }
      var Ie, yi;
      function xi(t) {
        for (; t.tabIndex === -1; )
          t = t.parentNode;
        t.style && (De(), Ie = t, yi = t.style.outlineStyle, t.style.outlineStyle = "none", k(window, "keydown", De));
      }
      function De() {
        Ie && (Ie.style.outlineStyle = yi, Ie = void 0, yi = void 0, N(window, "keydown", De));
      }
      function zn(t) {
        do
          t = t.parentNode;
        while ((!t.offsetWidth || !t.offsetHeight) && t !== document.body);
        return t;
      }
      function bi(t) {
        var e = t.getBoundingClientRect();
        return {
          x: e.width / t.offsetWidth || 1,
          y: e.height / t.offsetHeight || 1,
          boundingClientRect: e
        };
      }
      var Lr = {
        __proto__: null,
        TRANSFORM: pi,
        TRANSITION: oe,
        TRANSITION_END: Dn,
        get: Mn,
        getStyle: ae,
        create: O,
        remove: U,
        empty: Ce,
        toFront: Ut,
        toBack: Ht,
        hasClass: fi,
        addClass: A,
        removeClass: H,
        setClass: mi,
        getClass: ke,
        setOpacity: ot,
        testProp: Ae,
        setTransform: Lt,
        setPosition: q,
        getPosition: Ct,
        get disableTextSelection() {
          return he;
        },
        get enableTextSelection() {
          return le;
        },
        disableImageDrag: _i,
        enableImageDrag: vi,
        preventOutline: xi,
        restoreOutline: De,
        getSizedParentNode: zn,
        getScale: bi
      };
      function k(t, e, i, s) {
        if (e && typeof e == "object")
          for (var r in e)
            Ti(t, r, e[r], i);
        else {
          e = Y(e);
          for (var a = 0, d = e.length; a < d; a++)
            Ti(t, e[a], i, s);
        }
        return this;
      }
      var ft = "_leaflet_events";
      function N(t, e, i, s) {
        if (arguments.length === 1)
          On(t), delete t[ft];
        else if (e && typeof e == "object")
          for (var r in e)
            Pi(t, r, e[r], i);
        else if (e = Y(e), arguments.length === 2)
          On(t, function(p) {
            return ei(e, p) !== -1;
          });
        else
          for (var a = 0, d = e.length; a < d; a++)
            Pi(t, e[a], i, s);
        return this;
      }
      function On(t, e) {
        for (var i in t[ft]) {
          var s = i.split(/\d/)[0];
          (!e || e(s)) && Pi(t, s, null, null, i);
        }
      }
      var wi = {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        wheel: !("onwheel" in window) && "mousewheel"
      };
      function Ti(t, e, i, s) {
        var r = e + m(i) + (s ? "_" + m(s) : "");
        if (t[ft] && t[ft][r])
          return this;
        var a = function(p) {
          return i.call(s || t, p || window.event);
        }, d = a;
        !P.touchNative && P.pointer && e.indexOf("touch") === 0 ? a = _r(t, e, a) : P.touch && e === "dblclick" ? a = Sr(t, a) : "addEventListener" in t ? e === "touchstart" || e === "touchmove" || e === "wheel" || e === "mousewheel" ? t.addEventListener(wi[e] || e, a, P.passiveEvents ? { passive: !1 } : !1) : e === "mouseenter" || e === "mouseleave" ? (a = function(p) {
          p = p || window.event, Ei(t, p) && d(p);
        }, t.addEventListener(wi[e], a, !1)) : t.addEventListener(e, d, !1) : t.attachEvent("on" + e, a), t[ft] = t[ft] || {}, t[ft][r] = a;
      }
      function Pi(t, e, i, s, r) {
        r = r || e + m(i) + (s ? "_" + m(s) : "");
        var a = t[ft] && t[ft][r];
        if (!a)
          return this;
        !P.touchNative && P.pointer && e.indexOf("touch") === 0 ? vr(t, e, a) : P.touch && e === "dblclick" ? Er(t, a) : "removeEventListener" in t ? t.removeEventListener(wi[e] || e, a, !1) : t.detachEvent("on" + e, a), t[ft][r] = null;
      }
      function kt(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, this;
      }
      function Si(t) {
        return Ti(t, "wheel", kt), this;
      }
      function de(t) {
        return k(t, "mousedown touchstart dblclick contextmenu", kt), t._leaflet_disable_click = !0, this;
      }
      function K(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this;
      }
      function At(t) {
        return K(t), kt(t), this;
      }
      function Rn(t) {
        if (t.composedPath)
          return t.composedPath();
        for (var e = [], i = t.target; i; )
          e.push(i), i = i.parentNode;
        return e;
      }
      function Bn(t, e) {
        if (!e)
          return new C(t.clientX, t.clientY);
        var i = bi(e), s = i.boundingClientRect;
        return new C(
          // offset.left/top values are in page scale (like clientX/Y),
          // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
          (t.clientX - s.left) / i.x - e.clientLeft,
          (t.clientY - s.top) / i.y - e.clientTop
        );
      }
      var Cr = P.linux && P.chrome ? window.devicePixelRatio : P.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
      function Nn(t) {
        return P.edge ? t.wheelDeltaY / 2 : (
          // Don't trust window-geometry-based delta
          t.deltaY && t.deltaMode === 0 ? -t.deltaY / Cr : (
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
      function Ei(t, e) {
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
      var kr = {
        __proto__: null,
        on: k,
        off: N,
        stopPropagation: kt,
        disableScrollPropagation: Si,
        disableClickPropagation: de,
        preventDefault: K,
        stop: At,
        getPropagationPath: Rn,
        getMousePosition: Bn,
        getWheelDelta: Nn,
        isExternalTarget: Ei,
        addListener: k,
        removeListener: N
      }, Zn = ne.extend({
        // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
        // Run an animation of a given element to a new position, optionally setting
        // duration in seconds (`0.25` by default) and easing linearity factor (3rd
        // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
        // `0.5` by default).
        run: function(t, e, i, s) {
          this.stop(), this._el = t, this._inProgress = !0, this._duration = i || 0.25, this._easeOutPower = 1 / Math.max(s || 0.5, 0.2), this._startPos = Ct(t), this._offset = e.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
        },
        // @method stop()
        // Stops the animation (if currently running).
        stop: function() {
          this._inProgress && (this._step(!0), this._complete());
        },
        _animate: function() {
          this._animId = tt(this._animate, this), this._step();
        },
        _step: function(t) {
          var e = +/* @__PURE__ */ new Date() - this._startTime, i = this._duration * 1e3;
          e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete());
        },
        _runFrame: function(t, e) {
          var i = this._startPos.add(this._offset.multiplyBy(t));
          e && i._round(), q(this._el, i), this.fire("step");
        },
        _complete: function() {
          rt(this._animId), this._inProgress = !1, this.fire("end");
        },
        _easeOut: function(t) {
          return 1 - Math.pow(1 - t, this._easeOutPower);
        }
      }), z = ne.extend({
        options: {
          // @section Map State Options
          // @option crs: CRS = L.CRS.EPSG3857
          // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
          // sure what it means.
          crs: oi,
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
          e = D(this, e), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = f(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== void 0 && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== void 0 && this.setView(M(e.center), e.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = oe && P.any3d && !P.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), k(this._proxy, Dn, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
        },
        // @section Methods for modifying map state
        // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
        // Sets the view of the map (geographical center and zoom) with the given
        // animation options.
        setView: function(t, e, i) {
          if (e = e === void 0 ? this._zoom : this._limitZoom(e), t = this._limitCenter(M(t), e, this.options.maxBounds), i = i || {}, this._stop(), this._loaded && !i.reset && i !== !0) {
            i.animate !== void 0 && (i.zoom = l({ animate: i.animate }, i.zoom), i.pan = l({ animate: i.animate, duration: i.duration }, i.pan));
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
          var s = this.getZoomScale(e), r = this.getSize().divideBy(2), a = t instanceof C ? t : this.latLngToContainerPoint(t), d = a.subtract(r).multiplyBy(1 - 1 / s), p = this.containerPointToLatLng(r.add(d));
          return this.setView(p, e, { zoom: i });
        },
        _getBoundsCenterZoom: function(t, e) {
          e = e || {}, t = t.getBounds ? t.getBounds() : W(t);
          var i = $(e.paddingTopLeft || e.padding || [0, 0]), s = $(e.paddingBottomRight || e.padding || [0, 0]), r = this.getBoundsZoom(t, !1, i.add(s));
          if (r = typeof e.maxZoom == "number" ? Math.min(e.maxZoom, r) : r, r === 1 / 0)
            return {
              center: t.getCenter(),
              zoom: r
            };
          var a = s.subtract(i).divideBy(2), d = this.project(t.getSouthWest(), r), p = this.project(t.getNorthEast(), r), g = this.unproject(d.add(p).divideBy(2).add(a), r);
          return {
            center: g,
            zoom: r
          };
        },
        // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
        // Sets a map view that contains the given geographical bounds with the
        // maximum zoom level possible.
        fitBounds: function(t, e) {
          if (t = W(t), !t.isValid())
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
          if (t = $(t).round(), e = e || {}, !t.x && !t.y)
            return this.fire("moveend");
          if (e.animate !== !0 && !this.getSize().contains(t))
            return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
          if (this._panAnim || (this._panAnim = new Zn(), this._panAnim.on({
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
          if (i = i || {}, i.animate === !1 || !P.any3d)
            return this.setView(t, e, i);
          this._stop();
          var s = this.project(this.getCenter()), r = this.project(t), a = this.getSize(), d = this._zoom;
          t = M(t), e = e === void 0 ? d : e;
          var p = Math.max(a.x, a.y), g = p * this.getZoomScale(d, e), _ = r.distanceTo(s) || 1, b = 1.42, E = b * b;
          function I(G) {
            var qe = G ? -1 : 1, yo = G ? g : p, xo = g * g - p * p + qe * E * E * _ * _, bo = 2 * yo * E * _, Ri = xo / bo, xs = Math.sqrt(Ri * Ri + 1) - Ri, wo = xs < 1e-9 ? -18 : Math.log(xs);
            return wo;
          }
          function Q(G) {
            return (Math.exp(G) - Math.exp(-G)) / 2;
          }
          function j(G) {
            return (Math.exp(G) + Math.exp(-G)) / 2;
          }
          function ht(G) {
            return Q(G) / j(G);
          }
          var nt = I(0);
          function Kt(G) {
            return p * (j(nt) / j(nt + b * G));
          }
          function mo(G) {
            return p * (j(nt) * ht(nt + b * G) - Q(nt)) / E;
          }
          function go(G) {
            return 1 - Math.pow(1 - G, 1.5);
          }
          var _o = Date.now(), vs = (I(1) - nt) / b, vo = i.duration ? 1e3 * i.duration : 1e3 * vs * 0.8;
          function ys() {
            var G = (Date.now() - _o) / vo, qe = go(G) * vs;
            G <= 1 ? (this._flyToFrame = tt(ys, this), this._move(
              this.unproject(s.add(r.subtract(s).multiplyBy(mo(qe) / _)), d),
              this.getScaleZoom(p / Kt(qe), d),
              { flyTo: !0 }
            )) : this._move(t, e)._moveEnd(!0);
          }
          return this._moveStart(!0, i.noMoveStart), ys.call(this), this;
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
          return t = W(t), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), t.isValid() ? (this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
          var i = this.getCenter(), s = this._limitCenter(i, this._zoom, W(t));
          return i.equals(s) || this.panTo(s, e), this._enforcingBounds = !1, this;
        },
        // @method panInside(latlng: LatLng, options?: padding options): this
        // Pans the map the minimum amount to make the `latlng` visible. Use
        // padding options to fit the display to more restricted bounds.
        // If `latlng` is already within the (optionally padded) display bounds,
        // the map will not be panned.
        panInside: function(t, e) {
          e = e || {};
          var i = $(e.paddingTopLeft || e.padding || [0, 0]), s = $(e.paddingBottomRight || e.padding || [0, 0]), r = this.project(this.getCenter()), a = this.project(t), d = this.getPixelBounds(), p = et([d.min.add(i), d.max.subtract(s)]), g = p.getSize();
          if (!p.contains(a)) {
            this._enforcingBounds = !0;
            var _ = a.subtract(p.getCenter()), b = p.extend(a).getSize().subtract(g);
            r.x += _.x < 0 ? -b.x : b.x, r.y += _.y < 0 ? -b.y : b.y, this.panTo(this.unproject(r), e), this._enforcingBounds = !1;
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
          var i = this.getSize(), s = e.divideBy(2).round(), r = i.divideBy(2).round(), a = s.subtract(r);
          return !a.x && !a.y ? this : (t.animate && t.pan ? this.panBy(a) : (t.pan && this._rawPanBy(a), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(f(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
          var e = f(this._handleGeolocationResponse, this), i = f(this._handleGeolocationError, this);
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
            var e = t.coords.latitude, i = t.coords.longitude, s = new B(e, i), r = s.toBounds(t.coords.accuracy * 2), a = this._locateOptions;
            if (a.setView) {
              var d = this.getBoundsZoom(r);
              this.setView(s, a.maxZoom ? Math.min(d, a.maxZoom) : d);
            }
            var p = {
              latlng: s,
              bounds: r,
              timestamp: t.timestamp
            };
            for (var g in t.coords)
              typeof t.coords[g] == "number" && (p[g] = t.coords[g]);
            this.fire("locationfound", p);
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
          this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), U(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (rt(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
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
          var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), s = O("div", i, e || this._mapPane);
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
          return new it(e, i);
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
          t = W(t), i = $(i || [0, 0]);
          var s = this.getZoom() || 0, r = this.getMinZoom(), a = this.getMaxZoom(), d = t.getNorthWest(), p = t.getSouthEast(), g = this.getSize().subtract(i), _ = et(this.project(p, s), this.project(d, s)).getSize(), b = P.any3d ? this.options.zoomSnap : 1, E = g.x / _.x, I = g.y / _.y, Q = e ? Math.max(E, I) : Math.min(E, I);
          return s = this.getScaleZoom(Q, s), b && (s = Math.round(s / (b / 100)) * (b / 100), s = e ? Math.ceil(s / b) * b : Math.floor(s / b) * b), Math.max(r, Math.min(a, s));
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
          return new F(i, i.add(this.getSize()));
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
          return e = e === void 0 ? this._zoom : e, this.options.crs.latLngToPoint(M(t), e);
        },
        // @method unproject(point: Point, zoom: Number): LatLng
        // Inverse of [`project`](#map-project).
        unproject: function(t, e) {
          return e = e === void 0 ? this._zoom : e, this.options.crs.pointToLatLng($(t), e);
        },
        // @method layerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding geographical coordinate (for the current zoom level).
        layerPointToLatLng: function(t) {
          var e = $(t).add(this.getPixelOrigin());
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
          return this.options.crs.wrapLatLngBounds(W(t));
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
          return $(t).subtract(this._getMapPanePos());
        },
        // @method layerPointToContainerPoint(point: Point): Point
        // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
        // returns the corresponding pixel coordinate relative to the map container.
        layerPointToContainerPoint: function(t) {
          return $(t).add(this._getMapPanePos());
        },
        // @method containerPointToLatLng(point: Point): LatLng
        // Given a pixel coordinate relative to the map container, returns
        // the corresponding geographical coordinate (for the current zoom level).
        containerPointToLatLng: function(t) {
          var e = this.containerPointToLayerPoint($(t));
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
          return Bn(t, this._container);
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
          var e = this._container = Mn(t);
          if (e) {
            if (e._leaflet_id)
              throw new Error("Map container is already initialized.");
          } else throw new Error("Map container not found.");
          k(e, "scroll", this._onScroll, this), this._containerId = m(e);
        },
        _initLayout: function() {
          var t = this._container;
          this._fadeAnimated = this.options.fadeAnimation && P.any3d, A(t, "leaflet-container" + (P.touch ? " leaflet-touch" : "") + (P.retina ? " leaflet-retina" : "") + (P.ielt9 ? " leaflet-oldie" : "") + (P.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
          var e = ae(t, "position");
          e !== "absolute" && e !== "relative" && e !== "fixed" && e !== "sticky" && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
        },
        _initPanes: function() {
          var t = this._panes = {};
          this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), q(this._mapPane, new C(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (A(t.markerPane, "leaflet-zoom-hide"), A(t.shadowPane, "leaflet-zoom-hide"));
        },
        // private methods that modify map state
        // @section Map state change events
        _resetView: function(t, e, i) {
          q(this._mapPane, new C(0, 0));
          var s = !this._loaded;
          this._loaded = !0, e = this._limitZoom(e), this.fire("viewprereset");
          var r = this._zoom !== e;
          this._moveStart(r, i)._move(t, e)._moveEnd(r), this.fire("viewreset"), s && this.fire("load");
        },
        _moveStart: function(t, e) {
          return t && this.fire("zoomstart"), e || this.fire("movestart"), this;
        },
        _move: function(t, e, i, s) {
          e === void 0 && (e = this._zoom);
          var r = this._zoom !== e;
          return this._zoom = e, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), s ? i && i.pinch && this.fire("zoom", i) : ((r || i && i.pinch) && this.fire("zoom", i), this.fire("move", i)), this;
        },
        _moveEnd: function(t) {
          return t && this.fire("zoomend"), this.fire("moveend");
        },
        _stop: function() {
          return rt(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
        },
        _rawPanBy: function(t) {
          q(this._mapPane, this._getMapPanePos().subtract(t));
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
          this._targets = {}, this._targets[m(this._container)] = this;
          var e = t ? N : k;
          e(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && e(window, "resize", this._onResize, this), P.any3d && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
        },
        _onResize: function() {
          rt(this._resizeRequest), this._resizeRequest = tt(
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
          for (var i = [], s, r = e === "mouseout" || e === "mouseover", a = t.target || t.srcElement, d = !1; a; ) {
            if (s = this._targets[m(a)], s && (e === "click" || e === "preclick") && this._draggableMoved(s)) {
              d = !0;
              break;
            }
            if (s && s.listens(e, !0) && (r && !Ei(a, t) || (i.push(s), r)) || a === this._container)
              break;
            a = a.parentNode;
          }
          return !i.length && !d && !r && this.listens(e, !0) && (i = [this]), i;
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
            i === "mousedown" && xi(e), this._fireDOMEvent(t, i);
          }
        },
        _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
        _fireDOMEvent: function(t, e, i) {
          if (t.type === "click") {
            var s = l({}, t);
            s.type = "preclick", this._fireDOMEvent(s, s.type, i);
          }
          var r = this._findEventTargets(t, e);
          if (i) {
            for (var a = [], d = 0; d < i.length; d++)
              i[d].listens(e, !0) && a.push(i[d]);
            r = a.concat(r);
          }
          if (r.length) {
            e === "contextmenu" && K(t);
            var p = r[0], g = {
              originalEvent: t
            };
            if (t.type !== "keypress" && t.type !== "keydown" && t.type !== "keyup") {
              var _ = p.getLatLng && (!p._radius || p._radius <= 10);
              g.containerPoint = _ ? this.latLngToContainerPoint(p.getLatLng()) : this.mouseEventToContainerPoint(t), g.layerPoint = this.containerPointToLayerPoint(g.containerPoint), g.latlng = _ ? p.getLatLng() : this.layerPointToLatLng(g.layerPoint);
            }
            for (d = 0; d < r.length; d++)
              if (r[d].fire(e, g, !0), g.originalEvent._stopped || r[d].options.bubblingMouseEvents === !1 && ei(this._mouseEvents, e) !== -1)
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
          return Ct(this._mapPane) || new C(0, 0);
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
          return et([
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
          var s = this.project(t, e), r = this.getSize().divideBy(2), a = new F(s.subtract(r), s.add(r)), d = this._getBoundsOffset(a, i, e);
          return Math.abs(d.x) <= 1 && Math.abs(d.y) <= 1 ? t : this.unproject(s.add(d), e);
        },
        // adjust offset for view to get inside bounds
        _limitOffset: function(t, e) {
          if (!e)
            return t;
          var i = this.getPixelBounds(), s = new F(i.min.add(t), i.max.add(t));
          return t.add(this._getBoundsOffset(s, e));
        },
        // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
        _getBoundsOffset: function(t, e, i) {
          var s = et(
            this.project(e.getNorthEast(), i),
            this.project(e.getSouthWest(), i)
          ), r = s.min.subtract(t.min), a = s.max.subtract(t.max), d = this._rebound(r.x, -a.x), p = this._rebound(r.y, -a.y);
          return new C(d, p);
        },
        _rebound: function(t, e) {
          return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e));
        },
        _limitZoom: function(t) {
          var e = this.getMinZoom(), i = this.getMaxZoom(), s = P.any3d ? this.options.zoomSnap : 1;
          return s && (t = Math.round(t / s) * s), Math.max(e, Math.min(i, t));
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
          var t = this._proxy = O("div", "leaflet-proxy leaflet-zoom-animated");
          this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
            var i = pi, s = this._proxy.style[i];
            Lt(this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1)), s === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd();
          }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
        },
        _destroyAnimProxy: function() {
          U(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
        },
        _animMoveEnd: function() {
          var t = this.getCenter(), e = this.getZoom();
          Lt(this._proxy, this.project(t, e), this.getZoomScale(e, 1));
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
          var s = this.getZoomScale(e), r = this._getCenterOffset(t)._divideBy(1 - 1 / s);
          return i.animate !== !0 && !this.getSize().contains(r) ? !1 : (tt(function() {
            this._moveStart(!0, i.noMoveStart || !1)._animateZoom(t, e, !0);
          }, this), !0);
        },
        _animateZoom: function(t, e, i, s) {
          this._mapPane && (i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, A(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
            center: t,
            zoom: e,
            noUpdate: s
          }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(f(this._onZoomTransitionEnd, this), 250));
        },
        _onZoomTransitionEnd: function() {
          this._animatingZoom && (this._mapPane && H(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
        }
      });
      function Ar(t, e) {
        return new z(t, e);
      }
      var ct = _t.extend({
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
          var e = this._container = this.onAdd(t), i = this.getPosition(), s = t._controlCorners[i];
          return A(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? s.insertBefore(e, s.firstChild) : s.appendChild(e), this._map.on("unload", this.remove, this), this;
        },
        // @method remove: this
        // Removes the control from the map it is currently active on.
        remove: function() {
          return this._map ? (U(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
        },
        _refocusOnMap: function(t) {
          this._map && t && t.screenX > 0 && t.screenY > 0 && this._map.getContainer().focus();
        }
      }), ue = function(t) {
        return new ct(t);
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
          function s(r, a) {
            var d = e + r + " " + e + a;
            t[r + a] = O("div", d, i);
          }
          s("top", "left"), s("top", "right"), s("bottom", "left"), s("bottom", "right");
        },
        _clearControlPos: function() {
          for (var t in this._controlCorners)
            U(this._controlCorners[t]);
          U(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
        }
      });
      var Fn = ct.extend({
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
          D(this, i), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
          return ct.prototype.addTo.call(this, t), this._expandIfNotCollapsed();
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
          var e = this._getLayer(m(t));
          return e && this._layers.splice(this._layers.indexOf(e), 1), this._map ? this._update() : this;
        },
        // @method expand(): this
        // Expand the control container if collapsed.
        expand: function() {
          A(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
          var t = this._map.getSize().y - (this._container.offsetTop + 50);
          return t < this._section.clientHeight ? (A(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : H(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
        },
        // @method collapse(): this
        // Collapse the control container if expanded.
        collapse: function() {
          return H(this._container, "leaflet-control-layers-expanded"), this;
        },
        _initLayout: function() {
          var t = "leaflet-control-layers", e = this._container = O("div", t), i = this.options.collapsed;
          e.setAttribute("aria-haspopup", !0), de(e), Si(e);
          var s = this._section = O("section", t + "-list");
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
              K(a), this._expandSafely();
            }
          }, this), i || this.expand(), this._baseLayersList = O("div", t + "-base", s), this._separator = O("div", t + "-separator", s), this._overlaysList = O("div", t + "-overlays", s), e.appendChild(s);
        },
        _getLayer: function(t) {
          for (var e = 0; e < this._layers.length; e++)
            if (this._layers[e] && m(this._layers[e].layer) === t)
              return this._layers[e];
        },
        _addLayer: function(t, e, i) {
          this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
            layer: t,
            name: e,
            overlay: i
          }), this.options.sortLayers && this._layers.sort(f(function(s, r) {
            return this.options.sortFunction(s.layer, r.layer, s.name, r.name);
          }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
        },
        _update: function() {
          if (!this._container)
            return this;
          Ce(this._baseLayersList), Ce(this._overlaysList), this._layerControlInputs = [];
          var t, e, i, s, r = 0;
          for (i = 0; i < this._layers.length; i++)
            s = this._layers[i], this._addItem(s), e = e || s.overlay, t = t || !s.overlay, r += s.overlay ? 0 : 1;
          return this.options.hideSingleBase && (t = t && r > 1, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = e && t ? "" : "none", this;
        },
        _onLayerChange: function(t) {
          this._handlingClick || this._update();
          var e = this._getLayer(m(t.target)), i = e.overlay ? t.type === "add" ? "overlayadd" : "overlayremove" : t.type === "add" ? "baselayerchange" : null;
          i && this._map.fire(i, e);
        },
        // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
        _createRadioElement: function(t, e) {
          var i = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (e ? ' checked="checked"' : "") + "/>", s = document.createElement("div");
          return s.innerHTML = i, s.firstChild;
        },
        _addItem: function(t) {
          var e = document.createElement("label"), i = this._map.hasLayer(t.layer), s;
          t.overlay ? (s = document.createElement("input"), s.type = "checkbox", s.className = "leaflet-control-layers-selector", s.defaultChecked = i) : s = this._createRadioElement("leaflet-base-layers_" + m(this), i), this._layerControlInputs.push(s), s.layerId = m(t.layer), k(s, "click", this._onInputClick, this);
          var r = document.createElement("span");
          r.innerHTML = " " + t.name;
          var a = document.createElement("span");
          e.appendChild(a), a.appendChild(s), a.appendChild(r);
          var d = t.overlay ? this._overlaysList : this._baseLayersList;
          return d.appendChild(e), this._checkDisabledLayers(), e;
        },
        _onInputClick: function() {
          if (!this._preventClick) {
            var t = this._layerControlInputs, e, i, s = [], r = [];
            this._handlingClick = !0;
            for (var a = t.length - 1; a >= 0; a--)
              e = t[a], i = this._getLayer(e.layerId).layer, e.checked ? s.push(i) : e.checked || r.push(i);
            for (a = 0; a < r.length; a++)
              this._map.hasLayer(r[a]) && this._map.removeLayer(r[a]);
            for (a = 0; a < s.length; a++)
              this._map.hasLayer(s[a]) || this._map.addLayer(s[a]);
            this._handlingClick = !1, this._refocusOnMap();
          }
        },
        _checkDisabledLayers: function() {
          for (var t = this._layerControlInputs, e, i, s = this._map.getZoom(), r = t.length - 1; r >= 0; r--)
            e = t[r], i = this._getLayer(e.layerId).layer, e.disabled = i.options.minZoom !== void 0 && s < i.options.minZoom || i.options.maxZoom !== void 0 && s > i.options.maxZoom;
        },
        _expandIfNotCollapsed: function() {
          return this._map && !this.options.collapsed && this.expand(), this;
        },
        _expandSafely: function() {
          var t = this._section;
          this._preventClick = !0, k(t, "click", K), this.expand();
          var e = this;
          setTimeout(function() {
            N(t, "click", K), e._preventClick = !1;
          });
        }
      }), Ir = function(t, e, i) {
        return new Fn(t, e, i);
      }, $i = ct.extend({
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
          var e = "leaflet-control-zoom", i = O("div", e + " leaflet-bar"), s = this.options;
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
        _createButton: function(t, e, i, s, r) {
          var a = O("a", i, s);
          return a.innerHTML = t, a.href = "#", a.title = e, a.setAttribute("role", "button"), a.setAttribute("aria-label", e), de(a), k(a, "click", At), k(a, "click", r, this), k(a, "click", this._refocusOnMap, this), a;
        },
        _updateDisabled: function() {
          var t = this._map, e = "leaflet-disabled";
          H(this._zoomInButton, e), H(this._zoomOutButton, e), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || t._zoom === t.getMinZoom()) && (A(this._zoomOutButton, e), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || t._zoom === t.getMaxZoom()) && (A(this._zoomInButton, e), this._zoomInButton.setAttribute("aria-disabled", "true"));
        }
      });
      z.mergeOptions({
        zoomControl: !0
      }), z.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new $i(), this.addControl(this.zoomControl));
      });
      var Dr = function(t) {
        return new $i(t);
      }, Un = ct.extend({
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
          var e = "leaflet-control-scale", i = O("div", e), s = this.options;
          return this._addScales(s, e + "-line", i), t.on(s.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i;
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
          var e = t * 3.2808399, i, s, r;
          e > 5280 ? (i = e / 5280, s = this._getRoundNum(i), this._updateScale(this._iScale, s + " mi", s / i)) : (r = this._getRoundNum(e), this._updateScale(this._iScale, r + " ft", r / e));
        },
        _updateScale: function(t, e, i) {
          t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e;
        },
        _getRoundNum: function(t) {
          var e = Math.pow(10, (Math.floor(t) + "").length - 1), i = t / e;
          return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i;
        }
      }), Mr = function(t) {
        return new Un(t);
      }, zr = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Li = ct.extend({
        // @section
        // @aka Control.Attribution options
        options: {
          position: "bottomright",
          // @option prefix: String|false = 'Leaflet'
          // The HTML text shown before the attributions. Pass `false` to disable.
          prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (P.inlineSvg ? zr + " " : "") + "Leaflet</a>"
        },
        initialize: function(t) {
          D(this, t), this._attributions = {};
        },
        onAdd: function(t) {
          t.attributionControl = this, this._container = O("div", "leaflet-control-attribution"), de(this._container);
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
        this.options.attributionControl && new Li().addTo(this);
      });
      var Or = function(t) {
        return new Li(t);
      };
      ct.Layers = Fn, ct.Zoom = $i, ct.Scale = Un, ct.Attribution = Li, ue.layers = Ir, ue.zoom = Dr, ue.scale = Mr, ue.attribution = Or;
      var mt = _t.extend({
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
      var Rr = { Events: st }, Hn = P.touch ? "touchstart mousedown" : "mousedown", St = ne.extend({
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
          D(this, s), this._element = t, this._dragStartTarget = e || t, this._preventOutline = i;
        },
        // @method enable()
        // Enables the dragging ability
        enable: function() {
          this._enabled || (k(this._dragStartTarget, Hn, this._onDown, this), this._enabled = !0);
        },
        // @method disable()
        // Disables the dragging ability
        disable: function() {
          this._enabled && (St._dragging === this && this.finishDrag(!0), N(this._dragStartTarget, Hn, this._onDown, this), this._enabled = !1, this._moved = !1);
        },
        _onDown: function(t) {
          if (this._enabled && (this._moved = !1, !fi(this._element, "leaflet-zoom-anim"))) {
            if (t.touches && t.touches.length !== 1) {
              St._dragging === this && this.finishDrag();
              return;
            }
            if (!(St._dragging || t.shiftKey || t.which !== 1 && t.button !== 1 && !t.touches) && (St._dragging = this, this._preventOutline && xi(this._element), _i(), he(), !this._moving)) {
              this.fire("down");
              var e = t.touches ? t.touches[0] : t, i = zn(this._element);
              this._startPoint = new C(e.clientX, e.clientY), this._startPos = Ct(this._element), this._parentScale = bi(i);
              var s = t.type === "mousedown";
              k(document, s ? "mousemove" : "touchmove", this._onMove, this), k(document, s ? "mouseup" : "touchend touchcancel", this._onUp, this);
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
            !i.x && !i.y || Math.abs(i.x) + Math.abs(i.y) < this.options.clickTolerance || (i.x /= this._parentScale.x, i.y /= this._parentScale.y, K(t), this._moved || (this.fire("dragstart"), this._moved = !0, A(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), A(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, this._lastEvent = t, this._updatePosition());
          }
        },
        _updatePosition: function() {
          var t = { originalEvent: this._lastEvent };
          this.fire("predrag", t), q(this._element, this._newPos), this.fire("drag", t);
        },
        _onUp: function() {
          this._enabled && this.finishDrag();
        },
        finishDrag: function(t) {
          H(document.body, "leaflet-dragging"), this._lastTarget && (H(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), N(document, "mousemove touchmove", this._onMove, this), N(document, "mouseup touchend touchcancel", this._onUp, this), vi(), le();
          var e = this._moved && this._moving;
          this._moving = !1, St._dragging = !1, e && this.fire("dragend", {
            noInertia: t,
            distance: this._newPos.distanceTo(this._startPos)
          });
        }
      });
      function Wn(t, e, i) {
        var s, r = [1, 4, 2, 8], a, d, p, g, _, b, E, I;
        for (a = 0, b = t.length; a < b; a++)
          t[a]._code = It(t[a], e);
        for (p = 0; p < 4; p++) {
          for (E = r[p], s = [], a = 0, b = t.length, d = b - 1; a < b; d = a++)
            g = t[a], _ = t[d], g._code & E ? _._code & E || (I = Me(_, g, E, e, i), I._code = It(I, e), s.push(I)) : (_._code & E && (I = Me(_, g, E, e, i), I._code = It(I, e), s.push(I)), s.push(g));
          t = s;
        }
        return t;
      }
      function qn(t, e) {
        var i, s, r, a, d, p, g, _, b;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        at(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var E = M([0, 0]), I = W(t), Q = I.getNorthWest().distanceTo(I.getSouthWest()) * I.getNorthEast().distanceTo(I.getNorthWest());
        Q < 1700 && (E = Ci(t));
        var j = t.length, ht = [];
        for (i = 0; i < j; i++) {
          var nt = M(t[i]);
          ht.push(e.project(M([nt.lat - E.lat, nt.lng - E.lng])));
        }
        for (p = g = _ = 0, i = 0, s = j - 1; i < j; s = i++)
          r = ht[i], a = ht[s], d = r.y * a.x - a.y * r.x, g += (r.x + a.x) * d, _ += (r.y + a.y) * d, p += d * 3;
        p === 0 ? b = ht[0] : b = [g / p, _ / p];
        var Kt = e.unproject($(b));
        return M([Kt.lat + E.lat, Kt.lng + E.lng]);
      }
      function Ci(t) {
        for (var e = 0, i = 0, s = 0, r = 0; r < t.length; r++) {
          var a = M(t[r]);
          e += a.lat, i += a.lng, s++;
        }
        return M([e / s, i / s]);
      }
      var Br = {
        __proto__: null,
        clipPolygon: Wn,
        polygonCenter: qn,
        centroid: Ci
      };
      function Gn(t, e) {
        if (!e || !t.length)
          return t.slice();
        var i = e * e;
        return t = Fr(t, i), t = Zr(t, i), t;
      }
      function jn(t, e, i) {
        return Math.sqrt(pe(t, e, i, !0));
      }
      function Nr(t, e, i) {
        return pe(t, e, i);
      }
      function Zr(t, e) {
        var i = t.length, s = typeof Uint8Array < "u" ? Uint8Array : Array, r = new s(i);
        r[0] = r[i - 1] = 1, ki(t, r, e, 0, i - 1);
        var a, d = [];
        for (a = 0; a < i; a++)
          r[a] && d.push(t[a]);
        return d;
      }
      function ki(t, e, i, s, r) {
        var a = 0, d, p, g;
        for (p = s + 1; p <= r - 1; p++)
          g = pe(t[p], t[s], t[r], !0), g > a && (d = p, a = g);
        a > i && (e[d] = 1, ki(t, e, i, s, d), ki(t, e, i, d, r));
      }
      function Fr(t, e) {
        for (var i = [t[0]], s = 1, r = 0, a = t.length; s < a; s++)
          Ur(t[s], t[r]) > e && (i.push(t[s]), r = s);
        return r < a - 1 && i.push(t[a - 1]), i;
      }
      var Vn;
      function Kn(t, e, i, s, r) {
        var a = s ? Vn : It(t, i), d = It(e, i), p, g, _;
        for (Vn = d; ; ) {
          if (!(a | d))
            return [t, e];
          if (a & d)
            return !1;
          p = a || d, g = Me(t, e, p, i, r), _ = It(g, i), p === a ? (t = g, a = _) : (e = g, d = _);
        }
      }
      function Me(t, e, i, s, r) {
        var a = e.x - t.x, d = e.y - t.y, p = s.min, g = s.max, _, b;
        return i & 8 ? (_ = t.x + a * (g.y - t.y) / d, b = g.y) : i & 4 ? (_ = t.x + a * (p.y - t.y) / d, b = p.y) : i & 2 ? (_ = g.x, b = t.y + d * (g.x - t.x) / a) : i & 1 && (_ = p.x, b = t.y + d * (p.x - t.x) / a), new C(_, b, r);
      }
      function It(t, e) {
        var i = 0;
        return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i;
      }
      function Ur(t, e) {
        var i = e.x - t.x, s = e.y - t.y;
        return i * i + s * s;
      }
      function pe(t, e, i, s) {
        var r = e.x, a = e.y, d = i.x - r, p = i.y - a, g = d * d + p * p, _;
        return g > 0 && (_ = ((t.x - r) * d + (t.y - a) * p) / g, _ > 1 ? (r = i.x, a = i.y) : _ > 0 && (r += d * _, a += p * _)), d = t.x - r, p = t.y - a, s ? d * d + p * p : new C(r, a);
      }
      function at(t) {
        return !lt(t[0]) || typeof t[0][0] != "object" && typeof t[0][0] < "u";
      }
      function Yn(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), at(t);
      }
      function Xn(t, e) {
        var i, s, r, a, d, p, g, _;
        if (!t || t.length === 0)
          throw new Error("latlngs not passed");
        at(t) || (console.warn("latlngs are not flat! Only the first ring will be used"), t = t[0]);
        var b = M([0, 0]), E = W(t), I = E.getNorthWest().distanceTo(E.getSouthWest()) * E.getNorthEast().distanceTo(E.getNorthWest());
        I < 1700 && (b = Ci(t));
        var Q = t.length, j = [];
        for (i = 0; i < Q; i++) {
          var ht = M(t[i]);
          j.push(e.project(M([ht.lat - b.lat, ht.lng - b.lng])));
        }
        for (i = 0, s = 0; i < Q - 1; i++)
          s += j[i].distanceTo(j[i + 1]) / 2;
        if (s === 0)
          _ = j[0];
        else
          for (i = 0, a = 0; i < Q - 1; i++)
            if (d = j[i], p = j[i + 1], r = d.distanceTo(p), a += r, a > s) {
              g = (a - s) / r, _ = [
                p.x - g * (p.x - d.x),
                p.y - g * (p.y - d.y)
              ];
              break;
            }
        var nt = e.unproject($(_));
        return M([nt.lat + b.lat, nt.lng + b.lng]);
      }
      var Hr = {
        __proto__: null,
        simplify: Gn,
        pointToSegmentDistance: jn,
        closestPointOnSegment: Nr,
        clipSegment: Kn,
        _getEdgeIntersection: Me,
        _getBitCode: It,
        _sqClosestPointOnSegment: pe,
        isFlat: at,
        _flat: Yn,
        polylineCenter: Xn
      }, Ai = {
        project: function(t) {
          return new C(t.lng, t.lat);
        },
        unproject: function(t) {
          return new B(t.y, t.x);
        },
        bounds: new F([-180, -90], [180, 90])
      }, Ii = {
        R: 6378137,
        R_MINOR: 6356752314245179e-9,
        bounds: new F([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
        project: function(t) {
          var e = Math.PI / 180, i = this.R, s = t.lat * e, r = this.R_MINOR / i, a = Math.sqrt(1 - r * r), d = a * Math.sin(s), p = Math.tan(Math.PI / 4 - s / 2) / Math.pow((1 - d) / (1 + d), a / 2);
          return s = -i * Math.log(Math.max(p, 1e-10)), new C(t.lng * e * i, s);
        },
        unproject: function(t) {
          for (var e = 180 / Math.PI, i = this.R, s = this.R_MINOR / i, r = Math.sqrt(1 - s * s), a = Math.exp(-t.y / i), d = Math.PI / 2 - 2 * Math.atan(a), p = 0, g = 0.1, _; p < 15 && Math.abs(g) > 1e-7; p++)
            _ = r * Math.sin(d), _ = Math.pow((1 - _) / (1 + _), r / 2), g = Math.PI / 2 - 2 * Math.atan(a * _) - d, d += g;
          return new B(d * e, t.x * e / i);
        }
      }, Wr = {
        __proto__: null,
        LonLat: Ai,
        Mercator: Ii,
        SphericalMercator: si
      }, qr = l({}, Pt, {
        code: "EPSG:3395",
        projection: Ii,
        transformation: (function() {
          var t = 0.5 / (Math.PI * Ii.R);
          return se(t, 0.5, -t, 0.5);
        })()
      }), Jn = l({}, Pt, {
        code: "EPSG:4326",
        projection: Ai,
        transformation: se(1 / 180, 1, -1 / 180, 0.5)
      }), Gr = l({}, vt, {
        projection: Ai,
        transformation: se(1, 0, -1, 0),
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
      vt.Earth = Pt, vt.EPSG3395 = qr, vt.EPSG3857 = oi, vt.EPSG900913 = Js, vt.EPSG4326 = Jn, vt.Simple = Gr;
      var dt = ne.extend({
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
          return this._map._targets[m(t)] = this, this;
        },
        removeInteractiveTarget: function(t) {
          return delete this._map._targets[m(t)], this;
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
          var e = m(t);
          return this._layers[e] ? this : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this);
        },
        // @method removeLayer(layer: Layer): this
        // Removes the given layer from the map.
        removeLayer: function(t) {
          var e = m(t);
          return this._layers[e] ? (this._loaded && t.onRemove(this), delete this._layers[e], this._loaded && (this.fire("layerremove", { layer: t }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this;
        },
        // @method hasLayer(layer: Layer): Boolean
        // Returns `true` if the given layer is currently added to the map
        hasLayer: function(t) {
          return m(t) in this._layers;
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
          t = t ? lt(t) ? t : [t] : [];
          for (var e = 0, i = t.length; e < i; e++)
            this.addLayer(t[e]);
        },
        _addZoomLimit: function(t) {
          (!isNaN(t.options.maxZoom) || !isNaN(t.options.minZoom)) && (this._zoomBoundLayers[m(t)] = t, this._updateZoomLevels());
        },
        _removeZoomLimit: function(t) {
          var e = m(t);
          this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels());
        },
        _updateZoomLevels: function() {
          var t = 1 / 0, e = -1 / 0, i = this._getZoomSpan();
          for (var s in this._zoomBoundLayers) {
            var r = this._zoomBoundLayers[s].options;
            t = r.minZoom === void 0 ? t : Math.min(t, r.minZoom), e = r.maxZoom === void 0 ? e : Math.max(e, r.maxZoom);
          }
          this._layersMaxZoom = e === -1 / 0 ? void 0 : e, this._layersMinZoom = t === 1 / 0 ? void 0 : t, i !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
        }
      });
      var Wt = dt.extend({
        initialize: function(t, e) {
          D(this, e), this._layers = {};
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
          return m(t);
        }
      }), jr = function(t, e) {
        return new Wt(t, e);
      }, yt = Wt.extend({
        addLayer: function(t) {
          return this.hasLayer(t) ? this : (t.addEventParent(this), Wt.prototype.addLayer.call(this, t), this.fire("layeradd", { layer: t }));
        },
        removeLayer: function(t) {
          return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Wt.prototype.removeLayer.call(this, t), this.fire("layerremove", { layer: t })) : this;
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
          var t = new it();
          for (var e in this._layers) {
            var i = this._layers[e];
            t.extend(i.getBounds ? i.getBounds() : i.getLatLng());
          }
          return t;
        }
      }), Vr = function(t, e) {
        return new yt(t, e);
      }, qt = _t.extend({
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
          var s = this._createImg(i, e && e.tagName === "IMG" ? e : null);
          return this._setIconStyles(s, t), (this.options.crossOrigin || this.options.crossOrigin === "") && (s.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), s;
        },
        _setIconStyles: function(t, e) {
          var i = this.options, s = i[e + "Size"];
          typeof s == "number" && (s = [s, s]);
          var r = $(s), a = $(e === "shadow" && i.shadowAnchor || i.iconAnchor || r && r.divideBy(2, !0));
          t.className = "leaflet-marker-" + e + " " + (i.className || ""), a && (t.style.marginLeft = -a.x + "px", t.style.marginTop = -a.y + "px"), r && (t.style.width = r.x + "px", t.style.height = r.y + "px");
        },
        _createImg: function(t, e) {
          return e = e || document.createElement("img"), e.src = t, e;
        },
        _getIconUrl: function(t) {
          return P.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"];
        }
      });
      function Kr(t) {
        return new qt(t);
      }
      var fe = qt.extend({
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
          return typeof fe.imagePath != "string" && (fe.imagePath = this._detectIconPath()), (this.options.imagePath || fe.imagePath) + qt.prototype._getIconUrl.call(this, t);
        },
        _stripUrl: function(t) {
          var e = function(i, s, r) {
            var a = s.exec(i);
            return a && a[r];
          };
          return t = e(t, /^url\((['"])?(.+)\1\)$/, 2), t && e(t, /^(.*)marker-icon\.png$/, 1);
        },
        _detectIconPath: function() {
          var t = O("div", "leaflet-default-icon-path", document.body), e = ae(t, "background-image") || ae(t, "backgroundImage");
          if (document.body.removeChild(t), e = this._stripUrl(e), e)
            return e;
          var i = document.querySelector('link[href$="leaflet.css"]');
          return i ? i.href.substring(0, i.href.length - 11 - 1) : "";
        }
      }), Qn = mt.extend({
        initialize: function(t) {
          this._marker = t;
        },
        addHooks: function() {
          var t = this._marker._icon;
          this._draggable || (this._draggable = new St(t, t, !0)), this._draggable.on({
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
          }, this).disable(), this._marker._icon && H(this._marker._icon, "leaflet-marker-draggable");
        },
        moved: function() {
          return this._draggable && this._draggable._moved;
        },
        _adjustPan: function(t) {
          var e = this._marker, i = e._map, s = this._marker.options.autoPanSpeed, r = this._marker.options.autoPanPadding, a = Ct(e._icon), d = i.getPixelBounds(), p = i.getPixelOrigin(), g = et(
            d.min._subtract(p).add(r),
            d.max._subtract(p).subtract(r)
          );
          if (!g.contains(a)) {
            var _ = $(
              (Math.max(g.max.x, a.x) - g.max.x) / (d.max.x - g.max.x) - (Math.min(g.min.x, a.x) - g.min.x) / (d.min.x - g.min.x),
              (Math.max(g.max.y, a.y) - g.max.y) / (d.max.y - g.max.y) - (Math.min(g.min.y, a.y) - g.min.y) / (d.min.y - g.min.y)
            ).multiplyBy(s);
            i.panBy(_, { animate: !1 }), this._draggable._newPos._add(_), this._draggable._startPos._add(_), q(e._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = tt(this._adjustPan.bind(this, t));
          }
        },
        _onDragStart: function() {
          this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
        },
        _onPreDrag: function(t) {
          this._marker.options.autoPan && (rt(this._panRequest), this._panRequest = tt(this._adjustPan.bind(this, t)));
        },
        _onDrag: function(t) {
          var e = this._marker, i = e._shadow, s = Ct(e._icon), r = e._map.layerPointToLatLng(s);
          i && q(i, s), e._latlng = r, t.latlng = r, t.oldLatLng = this._oldLatLng, e.fire("move", t).fire("drag", t);
        },
        _onDragEnd: function(t) {
          rt(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t);
        }
      }), ze = dt.extend({
        // @section
        // @aka Marker options
        options: {
          // @option icon: Icon = *
          // Icon instance to use for rendering the marker.
          // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
          // If not specified, a common instance of `L.Icon.Default` is used.
          icon: new fe(),
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
          D(this, e), this._latlng = M(t);
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
          var t = this.options, e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), i = t.icon.createIcon(this._icon), s = !1;
          i !== this._icon && (this._icon && this._removeIcon(), s = !0, t.title && (i.title = t.title), i.tagName === "IMG" && (i.alt = t.alt || "")), A(i, e), t.keyboard && (i.tabIndex = "0", i.setAttribute("role", "button")), this._icon = i, t.riseOnHover && this.on({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && k(i, "focus", this._panOnFocus, this);
          var r = t.icon.createShadow(this._shadow), a = !1;
          r !== this._shadow && (this._removeShadow(), a = !0), r && (A(r, e), r.alt = ""), this._shadow = r, t.opacity < 1 && this._updateOpacity(), s && this.getPane().appendChild(this._icon), this._initInteraction(), r && a && this.getPane(t.shadowPane).appendChild(this._shadow);
        },
        _removeIcon: function() {
          this.options.riseOnHover && this.off({
            mouseover: this._bringToFront,
            mouseout: this._resetZIndex
          }), this.options.autoPanOnFocus && N(this._icon, "focus", this._panOnFocus, this), U(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
        },
        _removeShadow: function() {
          this._shadow && U(this._shadow), this._shadow = null;
        },
        _setPos: function(t) {
          this._icon && q(this._icon, t), this._shadow && q(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex();
        },
        _updateZIndex: function(t) {
          this._icon && (this._icon.style.zIndex = this._zIndex + t);
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
          this._setPos(e);
        },
        _initInteraction: function() {
          if (this.options.interactive && (A(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Qn)) {
            var t = this.options.draggable;
            this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Qn(this), t && this.dragging.enable();
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
            var e = this.options.icon.options, i = e.iconSize ? $(e.iconSize) : $(0, 0), s = e.iconAnchor ? $(e.iconAnchor) : $(0, 0);
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
      function Yr(t, e) {
        return new ze(t, e);
      }
      var Et = dt.extend({
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
      }), Oe = Et.extend({
        // @section
        // @aka CircleMarker options
        options: {
          fill: !0,
          // @option radius: Number = 10
          // Radius of the circle marker, in pixels
          radius: 10
        },
        initialize: function(t, e) {
          D(this, e), this._latlng = M(t), this._radius = this.options.radius;
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
          return Et.prototype.setStyle.call(this, t), this.setRadius(e), this;
        },
        _project: function() {
          this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
        },
        _updateBounds: function() {
          var t = this._radius, e = this._radiusY || t, i = this._clickTolerance(), s = [t + i, e + i];
          this._pxBounds = new F(this._point.subtract(s), this._point.add(s));
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
      function Xr(t, e) {
        return new Oe(t, e);
      }
      var Di = Oe.extend({
        initialize: function(t, e, i) {
          if (typeof e == "number" && (e = l({}, i, { radius: e })), D(this, e), this._latlng = M(t), isNaN(this.options.radius))
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
          return new it(
            this._map.layerPointToLatLng(this._point.subtract(t)),
            this._map.layerPointToLatLng(this._point.add(t))
          );
        },
        setStyle: Et.prototype.setStyle,
        _project: function() {
          var t = this._latlng.lng, e = this._latlng.lat, i = this._map, s = i.options.crs;
          if (s.distance === Pt.distance) {
            var r = Math.PI / 180, a = this._mRadius / Pt.R / r, d = i.project([e + a, t]), p = i.project([e - a, t]), g = d.add(p).divideBy(2), _ = i.unproject(g).lat, b = Math.acos((Math.cos(a * r) - Math.sin(e * r) * Math.sin(_ * r)) / (Math.cos(e * r) * Math.cos(_ * r))) / r;
            (isNaN(b) || b === 0) && (b = a / Math.cos(Math.PI / 180 * e)), this._point = g.subtract(i.getPixelOrigin()), this._radius = isNaN(b) ? 0 : g.x - i.project([_, t - b]).x, this._radiusY = g.y - d.y;
          } else {
            var E = s.unproject(s.project(this._latlng).subtract([this._mRadius, 0]));
            this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(E).x;
          }
          this._updateBounds();
        }
      });
      function Jr(t, e, i) {
        return new Di(t, e, i);
      }
      var xt = Et.extend({
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
          for (var e = 1 / 0, i = null, s = pe, r, a, d = 0, p = this._parts.length; d < p; d++)
            for (var g = this._parts[d], _ = 1, b = g.length; _ < b; _++) {
              r = g[_ - 1], a = g[_];
              var E = s(t, r, a, !0);
              E < e && (e = E, i = s(t, r, a));
            }
          return i && (i.distance = Math.sqrt(e)), i;
        },
        // @method getCenter(): LatLng
        // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
        getCenter: function() {
          if (!this._map)
            throw new Error("Must add layer to map before using getCenter()");
          return Xn(this._defaultShape(), this._map.options.crs);
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
          this._bounds = new it(), this._latlngs = this._convertLatLngs(t);
        },
        _defaultShape: function() {
          return at(this._latlngs) ? this._latlngs : this._latlngs[0];
        },
        // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
        _convertLatLngs: function(t) {
          for (var e = [], i = at(t), s = 0, r = t.length; s < r; s++)
            i ? (e[s] = M(t[s]), this._bounds.extend(e[s])) : e[s] = this._convertLatLngs(t[s]);
          return e;
        },
        _project: function() {
          var t = new F();
          this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds());
        },
        _updateBounds: function() {
          var t = this._clickTolerance(), e = new C(t, t);
          this._rawPxBounds && (this._pxBounds = new F([
            this._rawPxBounds.min.subtract(e),
            this._rawPxBounds.max.add(e)
          ]));
        },
        // recursively turns latlngs into a set of rings with projected coordinates
        _projectLatlngs: function(t, e, i) {
          var s = t[0] instanceof B, r = t.length, a, d;
          if (s) {
            for (d = [], a = 0; a < r; a++)
              d[a] = this._map.latLngToLayerPoint(t[a]), i.extend(d[a]);
            e.push(d);
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
            var e = this._parts, i, s, r, a, d, p, g;
            for (i = 0, r = 0, a = this._rings.length; i < a; i++)
              for (g = this._rings[i], s = 0, d = g.length; s < d - 1; s++)
                p = Kn(g[s], g[s + 1], t, s, !0), p && (e[r] = e[r] || [], e[r].push(p[0]), (p[1] !== g[s + 1] || s === d - 2) && (e[r].push(p[1]), r++));
          }
        },
        // simplify each clipped part of the polyline for performance
        _simplifyPoints: function() {
          for (var t = this._parts, e = this.options.smoothFactor, i = 0, s = t.length; i < s; i++)
            t[i] = Gn(t[i], e);
        },
        _update: function() {
          this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
        },
        _updatePath: function() {
          this._renderer._updatePoly(this);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t, e) {
          var i, s, r, a, d, p, g = this._clickTolerance();
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (i = 0, a = this._parts.length; i < a; i++)
            for (p = this._parts[i], s = 0, d = p.length, r = d - 1; s < d; r = s++)
              if (!(!e && s === 0) && jn(t, p[r], p[s]) <= g)
                return !0;
          return !1;
        }
      });
      function Qr(t, e) {
        return new xt(t, e);
      }
      xt._flat = Yn;
      var Gt = xt.extend({
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
          return qn(this._defaultShape(), this._map.options.crs);
        },
        _convertLatLngs: function(t) {
          var e = xt.prototype._convertLatLngs.call(this, t), i = e.length;
          return i >= 2 && e[0] instanceof B && e[0].equals(e[i - 1]) && e.pop(), e;
        },
        _setLatLngs: function(t) {
          xt.prototype._setLatLngs.call(this, t), at(this._latlngs) && (this._latlngs = [this._latlngs]);
        },
        _defaultShape: function() {
          return at(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
        },
        _clipPoints: function() {
          var t = this._renderer._bounds, e = this.options.weight, i = new C(e, e);
          if (t = new F(t.min.subtract(i), t.max.add(i)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(t))) {
            if (this.options.noClip) {
              this._parts = this._rings;
              return;
            }
            for (var s = 0, r = this._rings.length, a; s < r; s++)
              a = Wn(this._rings[s], t, !0), a.length && this._parts.push(a);
          }
        },
        _updatePath: function() {
          this._renderer._updatePoly(this, !0);
        },
        // Needed by the `Canvas` renderer for interactivity
        _containsPoint: function(t) {
          var e = !1, i, s, r, a, d, p, g, _;
          if (!this._pxBounds || !this._pxBounds.contains(t))
            return !1;
          for (a = 0, g = this._parts.length; a < g; a++)
            for (i = this._parts[a], d = 0, _ = i.length, p = _ - 1; d < _; p = d++)
              s = i[d], r = i[p], s.y > t.y != r.y > t.y && t.x < (r.x - s.x) * (t.y - s.y) / (r.y - s.y) + s.x && (e = !e);
          return e || xt.prototype._containsPoint.call(this, t, !0);
        }
      });
      function to(t, e) {
        return new Gt(t, e);
      }
      var bt = yt.extend({
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
          var e = lt(t) ? t : t.features, i, s, r;
          if (e) {
            for (i = 0, s = e.length; i < s; i++)
              r = e[i], (r.geometries || r.geometry || r.features || r.coordinates) && this.addData(r);
            return this;
          }
          var a = this.options;
          if (a.filter && !a.filter(t))
            return this;
          var d = Re(t, a);
          return d ? (d.feature = Ze(t), d.defaultOptions = d.options, this.resetStyle(d), a.onEachFeature && a.onEachFeature(t, d), this.addLayer(d)) : this;
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
      function Re(t, e) {
        var i = t.type === "Feature" ? t.geometry : t, s = i ? i.coordinates : null, r = [], a = e && e.pointToLayer, d = e && e.coordsToLatLng || Mi, p, g, _, b;
        if (!s && !i)
          return null;
        switch (i.type) {
          case "Point":
            return p = d(s), ts(a, t, p, e);
          case "MultiPoint":
            for (_ = 0, b = s.length; _ < b; _++)
              p = d(s[_]), r.push(ts(a, t, p, e));
            return new yt(r);
          case "LineString":
          case "MultiLineString":
            return g = Be(s, i.type === "LineString" ? 0 : 1, d), new xt(g, e);
          case "Polygon":
          case "MultiPolygon":
            return g = Be(s, i.type === "Polygon" ? 1 : 2, d), new Gt(g, e);
          case "GeometryCollection":
            for (_ = 0, b = i.geometries.length; _ < b; _++) {
              var E = Re({
                geometry: i.geometries[_],
                type: "Feature",
                properties: t.properties
              }, e);
              E && r.push(E);
            }
            return new yt(r);
          case "FeatureCollection":
            for (_ = 0, b = i.features.length; _ < b; _++) {
              var I = Re(i.features[_], e);
              I && r.push(I);
            }
            return new yt(r);
          default:
            throw new Error("Invalid GeoJSON object.");
        }
      }
      function ts(t, e, i, s) {
        return t ? t(e, i) : new ze(i, s && s.markersInheritOptions && s);
      }
      function Mi(t) {
        return new B(t[1], t[0], t[2]);
      }
      function Be(t, e, i) {
        for (var s = [], r = 0, a = t.length, d; r < a; r++)
          d = e ? Be(t[r], e - 1, i) : (i || Mi)(t[r]), s.push(d);
        return s;
      }
      function zi(t, e) {
        return t = M(t), t.alt !== void 0 ? [R(t.lng, e), R(t.lat, e), R(t.alt, e)] : [R(t.lng, e), R(t.lat, e)];
      }
      function Ne(t, e, i, s) {
        for (var r = [], a = 0, d = t.length; a < d; a++)
          r.push(e ? Ne(t[a], at(t[a]) ? 0 : e - 1, i, s) : zi(t[a], s));
        return !e && i && r.length > 0 && r.push(r[0].slice()), r;
      }
      function jt(t, e) {
        return t.feature ? l({}, t.feature, { geometry: e }) : Ze(e);
      }
      function Ze(t) {
        return t.type === "Feature" || t.type === "FeatureCollection" ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        };
      }
      var Oi = {
        toGeoJSON: function(t) {
          return jt(this, {
            type: "Point",
            coordinates: zi(this.getLatLng(), t)
          });
        }
      };
      ze.include(Oi), Di.include(Oi), Oe.include(Oi), xt.include({
        toGeoJSON: function(t) {
          var e = !at(this._latlngs), i = Ne(this._latlngs, e ? 1 : 0, !1, t);
          return jt(this, {
            type: (e ? "Multi" : "") + "LineString",
            coordinates: i
          });
        }
      }), Gt.include({
        toGeoJSON: function(t) {
          var e = !at(this._latlngs), i = e && !at(this._latlngs[0]), s = Ne(this._latlngs, i ? 2 : e ? 1 : 0, !0, t);
          return e || (s = [s]), jt(this, {
            type: (i ? "Multi" : "") + "Polygon",
            coordinates: s
          });
        }
      }), Wt.include({
        toMultiPoint: function(t) {
          var e = [];
          return this.eachLayer(function(i) {
            e.push(i.toGeoJSON(t).geometry.coordinates);
          }), jt(this, {
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
          return this.eachLayer(function(r) {
            if (r.toGeoJSON) {
              var a = r.toGeoJSON(t);
              if (i)
                s.push(a.geometry);
              else {
                var d = Ze(a);
                d.type === "FeatureCollection" ? s.push.apply(s, d.features) : s.push(d);
              }
            }
          }), i ? jt(this, {
            geometries: s,
            type: "GeometryCollection"
          }) : {
            type: "FeatureCollection",
            features: s
          };
        }
      });
      function es(t, e) {
        return new bt(t, e);
      }
      var eo = es, Fe = dt.extend({
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
          this._url = t, this._bounds = W(e), D(this, i);
        },
        onAdd: function() {
          this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (A(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
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
          return this._map && Ut(this._image), this;
        },
        // @method bringToBack(): this
        // Brings the layer to the bottom of all overlays.
        bringToBack: function() {
          return this._map && Ht(this._image), this;
        },
        // @method setUrl(url: String): this
        // Changes the URL of the image.
        setUrl: function(t) {
          return this._url = t, this._image && (this._image.src = t), this;
        },
        // @method setBounds(bounds: LatLngBounds): this
        // Update the bounds that this ImageOverlay covers
        setBounds: function(t) {
          return this._bounds = W(t), this._map && this._reset(), this;
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
          if (A(e, "leaflet-image-layer"), this._zoomAnimated && A(e, "leaflet-zoom-animated"), this.options.className && A(e, this.options.className), e.onselectstart = w, e.onmousemove = w, e.onload = f(this.fire, this, "load"), e.onerror = f(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (e.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t) {
            this._url = e.src;
            return;
          }
          e.src = this._url, e.alt = this.options.alt;
        },
        _animateZoom: function(t) {
          var e = this._map.getZoomScale(t.zoom), i = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
          Lt(this._image, i, e);
        },
        _reset: function() {
          var t = this._image, e = new F(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())
          ), i = e.getSize();
          q(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px";
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
      }), io = function(t, e, i) {
        return new Fe(t, e, i);
      }, is = Fe.extend({
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
          if (A(e, "leaflet-image-layer"), this._zoomAnimated && A(e, "leaflet-zoom-animated"), this.options.className && A(e, this.options.className), e.onselectstart = w, e.onmousemove = w, e.onloadeddata = f(this.fire, this, "load"), t) {
            for (var i = e.getElementsByTagName("source"), s = [], r = 0; r < i.length; r++)
              s.push(i[r].src);
            this._url = i.length > 0 ? s : [e.src];
            return;
          }
          lt(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(e.style, "objectFit") && (e.style.objectFit = "fill"), e.autoplay = !!this.options.autoplay, e.loop = !!this.options.loop, e.muted = !!this.options.muted, e.playsInline = !!this.options.playsInline;
          for (var a = 0; a < this._url.length; a++) {
            var d = O("source");
            d.src = this._url[a], e.appendChild(d);
          }
        }
        // @method getElement(): HTMLVideoElement
        // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
        // used by this overlay.
      });
      function no(t, e, i) {
        return new is(t, e, i);
      }
      var ns = Fe.extend({
        _initImage: function() {
          var t = this._image = this._url;
          A(t, "leaflet-image-layer"), this._zoomAnimated && A(t, "leaflet-zoom-animated"), this.options.className && A(t, this.options.className), t.onselectstart = w, t.onmousemove = w;
        }
        // @method getElement(): SVGElement
        // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
        // used by this overlay.
      });
      function so(t, e, i) {
        return new ns(t, e, i);
      }
      var gt = dt.extend({
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
          t && (t instanceof B || lt(t)) ? (this._latlng = M(t), D(this, e)) : (D(this, t), this._source = e), this.options.content && (this._content = this.options.content);
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
          t._fadeAnimated ? (ot(this._container, 0), this._removeTimeout = setTimeout(f(U, void 0, this._container), 200)) : U(this._container), this.options.interactive && (H(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
          return this._map && Ut(this._container), this;
        },
        // @method bringToBack: this
        // Brings this overlay to the back of other overlays (in the same map pane).
        bringToBack: function() {
          return this._map && Ht(this._container), this;
        },
        // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
        _prepareOpen: function(t) {
          var e = this._source;
          if (!e._map)
            return !1;
          if (e instanceof yt) {
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
            var t = this._map.latLngToLayerPoint(this._latlng), e = $(this.options.offset), i = this._getAnchor();
            this._zoomAnimated ? q(this._container, t.add(i)) : e = e.add(t).add(i);
            var s = this._containerBottom = -e.y, r = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
            this._container.style.bottom = s + "px", this._container.style.left = r + "px";
          }
        },
        _getAnchor: function() {
          return [0, 0];
        }
      });
      z.include({
        _initOverlay: function(t, e, i, s) {
          var r = e;
          return r instanceof t || (r = new t(s).setContent(e)), i && r.setLatLng(i), r;
        }
      }), dt.include({
        _initOverlay: function(t, e, i, s) {
          var r = i;
          return r instanceof t ? (D(r, s), r._source = this) : (r = e && !s ? e : new t(s, this), r.setContent(i)), r;
        }
      });
      var Ue = gt.extend({
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
          gt.prototype.onAdd.call(this, t), t.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Et || this._source.on("preclick", kt));
        },
        onRemove: function(t) {
          gt.prototype.onRemove.call(this, t), t.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Et || this._source.off("preclick", kt));
        },
        getEvents: function() {
          var t = gt.prototype.getEvents.call(this);
          return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this.close), this.options.keepInView && (t.moveend = this._adjustPan), t;
        },
        _initLayout: function() {
          var t = "leaflet-popup", e = this._container = O(
            "div",
            t + " " + (this.options.className || "") + " leaflet-zoom-animated"
          ), i = this._wrapper = O("div", t + "-content-wrapper", e);
          if (this._contentNode = O("div", t + "-content", i), de(e), Si(this._contentNode), k(e, "contextmenu", kt), this._tipContainer = O("div", t + "-tip-container", e), this._tip = O("div", t + "-tip", this._tipContainer), this.options.closeButton) {
            var s = this._closeButton = O("a", t + "-close-button", e);
            s.setAttribute("role", "button"), s.setAttribute("aria-label", "Close popup"), s.href = "#close", s.innerHTML = '<span aria-hidden="true">&#215;</span>', k(s, "click", function(r) {
              K(r), this.close();
            }, this);
          }
        },
        _updateLayout: function() {
          var t = this._contentNode, e = t.style;
          e.width = "", e.whiteSpace = "nowrap";
          var i = t.offsetWidth;
          i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
          var s = t.offsetHeight, r = this.options.maxHeight, a = "leaflet-popup-scrolled";
          r && s > r ? (e.height = r + "px", A(t, a)) : H(t, a), this._containerWidth = this._container.offsetWidth;
        },
        _animateZoom: function(t) {
          var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center), i = this._getAnchor();
          q(this._container, e.add(i));
        },
        _adjustPan: function() {
          if (this.options.autoPan) {
            if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
              this._autopanning = !1;
              return;
            }
            var t = this._map, e = parseInt(ae(this._container, "marginBottom"), 10) || 0, i = this._container.offsetHeight + e, s = this._containerWidth, r = new C(this._containerLeft, -i - this._containerBottom);
            r._add(Ct(this._container));
            var a = t.layerPointToContainerPoint(r), d = $(this.options.autoPanPadding), p = $(this.options.autoPanPaddingTopLeft || d), g = $(this.options.autoPanPaddingBottomRight || d), _ = t.getSize(), b = 0, E = 0;
            a.x + s + g.x > _.x && (b = a.x + s - _.x + g.x), a.x - b - p.x < 0 && (b = a.x - p.x), a.y + i + g.y > _.y && (E = a.y + i - _.y + g.y), a.y - E - p.y < 0 && (E = a.y - p.y), (b || E) && (this.options.keepInView && (this._autopanning = !0), t.fire("autopanstart").panBy([b, E]));
          }
        },
        _getAnchor: function() {
          return $(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
        }
      }), ro = function(t, e) {
        return new Ue(t, e);
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
          return this._initOverlay(Ue, t, e, i).openOn(this), this;
        },
        // @method closePopup(popup?: Popup): this
        // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
        closePopup: function(t) {
          return t = arguments.length ? t : this._popup, t && t.close(), this;
        }
      }), dt.include({
        // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
        // Binds a popup to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindPopup: function(t, e) {
          return this._popup = this._initOverlay(Ue, this._popup, t, e), this._popupHandlersAdded || (this.on({
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
          return this._popup && (this instanceof yt || (this._popup._source = this), this._popup._prepareOpen(t || this._latlng) && this._popup.openOn(this._map)), this;
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
            if (this._popup._source === e && !(e instanceof Et)) {
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
      var He = gt.extend({
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
          this._contentNode = this._container = O("div", e), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + m(this));
        },
        _updateLayout: function() {
        },
        _adjustPan: function() {
        },
        _setPosition: function(t) {
          var e, i, s = this._map, r = this._container, a = s.latLngToContainerPoint(s.getCenter()), d = s.layerPointToContainerPoint(t), p = this.options.direction, g = r.offsetWidth, _ = r.offsetHeight, b = $(this.options.offset), E = this._getAnchor();
          p === "top" ? (e = g / 2, i = _) : p === "bottom" ? (e = g / 2, i = 0) : p === "center" ? (e = g / 2, i = _ / 2) : p === "right" ? (e = 0, i = _ / 2) : p === "left" ? (e = g, i = _ / 2) : d.x < a.x ? (p = "right", e = 0, i = _ / 2) : (p = "left", e = g + (b.x + E.x) * 2, i = _ / 2), t = t.subtract($(e, i, !0)).add(b).add(E), H(r, "leaflet-tooltip-right"), H(r, "leaflet-tooltip-left"), H(r, "leaflet-tooltip-top"), H(r, "leaflet-tooltip-bottom"), A(r, "leaflet-tooltip-" + p), q(r, t);
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
          return $(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
        }
      }), oo = function(t, e) {
        return new He(t, e);
      };
      z.include({
        // @method openTooltip(tooltip: Tooltip): this
        // Opens the specified tooltip.
        // @alternative
        // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
        // Creates a tooltip with the specified content and options and open it.
        openTooltip: function(t, e, i) {
          return this._initOverlay(He, t, e, i).openOn(this), this;
        },
        // @method closeTooltip(tooltip: Tooltip): this
        // Closes the tooltip given as parameter.
        closeTooltip: function(t) {
          return t.close(), this;
        }
      }), dt.include({
        // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
        // Binds a tooltip to the layer with the passed `content` and sets up the
        // necessary event listeners. If a `Function` is passed it will receive
        // the layer as the first argument and should return a `String` or `HTMLElement`.
        bindTooltip: function(t, e) {
          return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(He, this._tooltip, t, e), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
          return this._tooltip && (this instanceof yt || (this._tooltip._source = this), this._tooltip._prepareOpen(t) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
          var e = t.latlng, i, s;
          this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), s = this._map.containerPointToLayerPoint(i), e = this._map.layerPointToLatLng(s)), this._tooltip.setLatLng(e);
        }
      });
      var ss = qt.extend({
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
          if (i.html instanceof Element ? (Ce(e), e.appendChild(i.html)) : e.innerHTML = i.html !== !1 ? i.html : "", i.bgPos) {
            var s = $(i.bgPos);
            e.style.backgroundPosition = -s.x + "px " + -s.y + "px";
          }
          return this._setIconStyles(e, "icon"), e;
        },
        createShadow: function() {
          return null;
        }
      });
      function ao(t) {
        return new ss(t);
      }
      qt.Default = fe;
      var me = dt.extend({
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
          return this._map && (Ut(this._container), this._setAutoZIndex(Math.max)), this;
        },
        // @method bringToBack: this
        // Brings the tile layer to the bottom of all tile layers.
        bringToBack: function() {
          return this._map && (Ht(this._container), this._setAutoZIndex(Math.min)), this;
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
          return this.options.updateWhenIdle || (this._onMove || (this._onMove = x(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t;
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
          for (var e = this.getPane().children, i = -t(-1 / 0, 1 / 0), s = 0, r = e.length, a; s < r; s++)
            a = e[s].style.zIndex, e[s] !== this._container && a && (i = t(i, +a));
          isFinite(i) && (this.options.zIndex = i + t(-1, 1), this._updateZIndex());
        },
        _updateOpacity: function() {
          if (this._map && !P.ielt9) {
            ot(this._container, this.options.opacity);
            var t = +/* @__PURE__ */ new Date(), e = !1, i = !1;
            for (var s in this._tiles) {
              var r = this._tiles[s];
              if (!(!r.current || !r.loaded)) {
                var a = Math.min(1, (t - r.loaded) / 200);
                ot(r.el, a), a < 1 ? e = !0 : (r.active ? i = !0 : this._onOpaqueTile(r), r.active = !0);
              }
            }
            i && !this._noPrune && this._pruneTiles(), e && (rt(this._fadeFrame), this._fadeFrame = tt(this._updateOpacity, this));
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
            var s = this._levels[t], r = this._map;
            return s || (s = this._levels[t] = {}, s.el = O("div", "leaflet-tile-container leaflet-zoom-animated", this._container), s.el.style.zIndex = e, s.origin = r.project(r.unproject(r.getPixelOrigin()), t).round(), s.zoom = t, this._setZoomTransform(s, r.getCenter(), r.getZoom()), w(s.el.offsetWidth), this._onCreateLevel(s)), this._level = s, s;
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
            U(this._levels[t].el), this._onRemoveLevel(Number(t)), delete this._levels[t];
          this._removeAllTiles(), this._tileZoom = void 0;
        },
        _retainParent: function(t, e, i, s) {
          var r = Math.floor(t / 2), a = Math.floor(e / 2), d = i - 1, p = new C(+r, +a);
          p.z = +d;
          var g = this._tileCoordsToKey(p), _ = this._tiles[g];
          return _ && _.active ? (_.retain = !0, !0) : (_ && _.loaded && (_.retain = !0), d > s ? this._retainParent(r, a, d, s) : !1);
        },
        _retainChildren: function(t, e, i, s) {
          for (var r = 2 * t; r < 2 * t + 2; r++)
            for (var a = 2 * e; a < 2 * e + 2; a++) {
              var d = new C(r, a);
              d.z = i + 1;
              var p = this._tileCoordsToKey(d), g = this._tiles[p];
              if (g && g.active) {
                g.retain = !0;
                continue;
              } else g && g.loaded && (g.retain = !0);
              i + 1 < s && this._retainChildren(r, a, i + 1, s);
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
          var r = Math.round(e);
          this.options.maxZoom !== void 0 && r > this.options.maxZoom || this.options.minZoom !== void 0 && r < this.options.minZoom ? r = void 0 : r = this._clampZoom(r);
          var a = this.options.updateWhenZooming && r !== this._tileZoom;
          (!s || a) && (this._tileZoom = r, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), r !== void 0 && this._update(t), i || this._pruneTiles(), this._noPrune = !!i), this._setZoomTransforms(t, e);
        },
        _setZoomTransforms: function(t, e) {
          for (var i in this._levels)
            this._setZoomTransform(this._levels[i], t, e);
        },
        _setZoomTransform: function(t, e, i) {
          var s = this._map.getZoomScale(i, t.zoom), r = t.origin.multiplyBy(s).subtract(this._map._getNewPixelOrigin(e, i)).round();
          P.any3d ? Lt(t.el, r, s) : q(t.el, r);
        },
        _resetGrid: function() {
          var t = this._map, e = t.options.crs, i = this._tileSize = this.getTileSize(), s = this._tileZoom, r = this._map.getPixelWorldBounds(this._tileZoom);
          r && (this._globalTileRange = this._pxBoundsToTileRange(r)), this._wrapX = e.wrapLng && !this.options.noWrap && [
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
          var e = this._map, i = e._animatingZoom ? Math.max(e._animateToZoom, e.getZoom()) : e.getZoom(), s = e.getZoomScale(i, this._tileZoom), r = e.project(t, this._tileZoom).floor(), a = e.getSize().divideBy(s * 2);
          return new F(r.subtract(a), r.add(a));
        },
        // Private method to load tiles in the grid's active zoom level according to map bounds
        _update: function(t) {
          var e = this._map;
          if (e) {
            var i = this._clampZoom(e.getZoom());
            if (t === void 0 && (t = e.getCenter()), this._tileZoom !== void 0) {
              var s = this._getTiledPixelBounds(t), r = this._pxBoundsToTileRange(s), a = r.getCenter(), d = [], p = this.options.keepBuffer, g = new F(
                r.getBottomLeft().subtract([p, -p]),
                r.getTopRight().add([p, -p])
              );
              if (!(isFinite(r.min.x) && isFinite(r.min.y) && isFinite(r.max.x) && isFinite(r.max.y)))
                throw new Error("Attempted to load an infinite number of tiles");
              for (var _ in this._tiles) {
                var b = this._tiles[_].coords;
                (b.z !== this._tileZoom || !g.contains(new C(b.x, b.y))) && (this._tiles[_].current = !1);
              }
              if (Math.abs(i - this._tileZoom) > 1) {
                this._setView(t, i);
                return;
              }
              for (var E = r.min.y; E <= r.max.y; E++)
                for (var I = r.min.x; I <= r.max.x; I++) {
                  var Q = new C(I, E);
                  if (Q.z = this._tileZoom, !!this._isValidTile(Q)) {
                    var j = this._tiles[this._tileCoordsToKey(Q)];
                    j ? j.current = !0 : d.push(Q);
                  }
                }
              if (d.sort(function(nt, Kt) {
                return nt.distanceTo(a) - Kt.distanceTo(a);
              }), d.length !== 0) {
                this._loading || (this._loading = !0, this.fire("loading"));
                var ht = document.createDocumentFragment();
                for (I = 0; I < d.length; I++)
                  this._addTile(d[I], ht);
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
          return W(this.options.bounds).overlaps(s);
        },
        _keyToBounds: function(t) {
          return this._tileCoordsToBounds(this._keyToTileCoords(t));
        },
        _tileCoordsToNwSe: function(t) {
          var e = this._map, i = this.getTileSize(), s = t.scaleBy(i), r = s.add(i), a = e.unproject(s, t.z), d = e.unproject(r, t.z);
          return [a, d];
        },
        // converts tile coordinates to its geographical bounds
        _tileCoordsToBounds: function(t) {
          var e = this._tileCoordsToNwSe(t), i = new it(e[0], e[1]);
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
          A(t, "leaflet-tile");
          var e = this.getTileSize();
          t.style.width = e.x + "px", t.style.height = e.y + "px", t.onselectstart = w, t.onmousemove = w, P.ielt9 && this.options.opacity < 1 && ot(t, this.options.opacity);
        },
        _addTile: function(t, e) {
          var i = this._getTilePos(t), s = this._tileCoordsToKey(t), r = this.createTile(this._wrapCoords(t), f(this._tileReady, this, t));
          this._initTile(r), this.createTile.length < 2 && tt(f(this._tileReady, this, t, null, r)), q(r, i), this._tiles[s] = {
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
          var s = this._tileCoordsToKey(t);
          i = this._tiles[s], i && (i.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (ot(i.el, 0), rt(this._fadeFrame), this._fadeFrame = tt(this._updateOpacity, this)) : (i.active = !0, this._pruneTiles()), e || (A(i.el, "leaflet-tile-loaded"), this.fire("tileload", {
            tile: i.el,
            coords: t
          })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), P.ielt9 || !this._map._fadeAnimated ? tt(this._pruneTiles, this) : setTimeout(f(this._pruneTiles, this), 250)));
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
          return new F(
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
      function ho(t) {
        return new me(t);
      }
      var Vt = me.extend({
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
          return k(i, "load", f(this._tileOnLoad, this, e, i)), k(i, "error", f(this._tileOnError, this, e, i)), (this.options.crossOrigin || this.options.crossOrigin === "") && (i.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (i.referrerPolicy = this.options.referrerPolicy), i.alt = "", i.src = this.getTileUrl(t), i;
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
          return on(this._url, l(e, this.options));
        },
        _tileOnLoad: function(t, e) {
          P.ielt9 ? setTimeout(f(t, this, null, e), 0) : t(null, e);
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
            if (this._tiles[t].coords.z !== this._tileZoom && (e = this._tiles[t].el, e.onload = w, e.onerror = w, !e.complete)) {
              e.src = Ee;
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
            return e.el.setAttribute("src", Ee), me.prototype._removeTile.call(this, t);
        },
        _tileReady: function(t, e, i) {
          if (!(!this._map || i && i.getAttribute("src") === Ee))
            return me.prototype._tileReady.call(this, t, e, i);
        }
      });
      function rs(t, e) {
        return new Vt(t, e);
      }
      var os = Vt.extend({
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
          var i = l({}, this.defaultWmsParams);
          for (var s in e)
            s in this.options || (i[s] = e[s]);
          e = D(this, e);
          var r = e.detectRetina && P.retina ? 2 : 1, a = this.getTileSize();
          i.width = a.x * r, i.height = a.y * r, this.wmsParams = i;
        },
        onAdd: function(t) {
          this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
          var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
          this.wmsParams[e] = this._crs.code, Vt.prototype.onAdd.call(this, t);
        },
        getTileUrl: function(t) {
          var e = this._tileCoordsToNwSe(t), i = this._crs, s = et(i.project(e[0]), i.project(e[1])), r = s.min, a = s.max, d = (this._wmsVersion >= 1.3 && this._crs === Jn ? [r.y, r.x, a.y, a.x] : [r.x, r.y, a.x, a.y]).join(","), p = Vt.prototype.getTileUrl.call(this, t);
          return p + Zt(this.wmsParams, p, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + d;
        },
        // @method setParams(params: Object, noRedraw?: Boolean): this
        // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
        setParams: function(t, e) {
          return l(this.wmsParams, t), e || this.redraw(), this;
        }
      });
      function lo(t, e) {
        return new os(t, e);
      }
      Vt.WMS = os, rs.wms = lo;
      var wt = dt.extend({
        // @section
        // @aka Renderer options
        options: {
          // @option padding: Number = 0.1
          // How much to extend the clip area around the map view (relative to its size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1
        },
        initialize: function(t) {
          D(this, t), m(this), this._layers = this._layers || {};
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
          var i = this._map.getZoomScale(e, this._zoom), s = this._map.getSize().multiplyBy(0.5 + this.options.padding), r = this._map.project(this._center, e), a = s.multiplyBy(-i).add(r).subtract(this._map._getNewPixelOrigin(t, e));
          P.any3d ? Lt(this._container, a, i) : q(this._container, a);
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
          this._bounds = new F(i, i.add(e.multiplyBy(1 + t * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
        }
      }), as = wt.extend({
        // @section
        // @aka Canvas options
        options: {
          // @option tolerance: Number = 0
          // How much to extend the click tolerance around a path/object on the map.
          tolerance: 0
        },
        getEvents: function() {
          var t = wt.prototype.getEvents.call(this);
          return t.viewprereset = this._onViewPreReset, t;
        },
        _onViewPreReset: function() {
          this._postponeUpdatePaths = !0;
        },
        onAdd: function() {
          wt.prototype.onAdd.call(this), this._draw();
        },
        _initContainer: function() {
          var t = this._container = document.createElement("canvas");
          k(t, "mousemove", this._onMouseMove, this), k(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), k(t, "mouseout", this._handleMouseOut, this), t._leaflet_disable_events = !0, this._ctx = t.getContext("2d");
        },
        _destroyContainer: function() {
          rt(this._redrawRequest), delete this._ctx, U(this._container), N(this._container), delete this._container;
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
            wt.prototype._update.call(this);
            var t = this._bounds, e = this._container, i = t.getSize(), s = P.retina ? 2 : 1;
            q(e, t.min), e.width = s * i.x, e.height = s * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", P.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update");
          }
        },
        _reset: function() {
          wt.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
        },
        _initPath: function(t) {
          this._updateDashArray(t), this._layers[m(t)] = t;
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
          i ? i.prev = s : this._drawLast = s, s ? s.next = i : this._drawFirst = i, delete t._order, delete this._layers[m(t)], this._requestRedraw(t);
        },
        _updatePath: function(t) {
          this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t);
        },
        _updateStyle: function(t) {
          this._updateDashArray(t), this._requestRedraw(t);
        },
        _updateDashArray: function(t) {
          if (typeof t.options.dashArray == "string") {
            var e = t.options.dashArray.split(/[, ]+/), i = [], s, r;
            for (r = 0; r < e.length; r++) {
              if (s = Number(e[r]), isNaN(s))
                return;
              i.push(s);
            }
            t.options._dashArray = i;
          } else
            t.options._dashArray = t.options.dashArray;
        },
        _requestRedraw: function(t) {
          this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || tt(this._redraw, this));
        },
        _extendRedrawBounds: function(t) {
          if (t._pxBounds) {
            var e = (t.options.weight || 0) + 1;
            this._redrawBounds = this._redrawBounds || new F(), this._redrawBounds.extend(t._pxBounds.min.subtract([e, e])), this._redrawBounds.extend(t._pxBounds.max.add([e, e]));
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
            var i, s, r, a, d = t._parts, p = d.length, g = this._ctx;
            if (p) {
              for (g.beginPath(), i = 0; i < p; i++) {
                for (s = 0, r = d[i].length; s < r; s++)
                  a = d[i][s], g[s ? "lineTo" : "moveTo"](a.x, a.y);
                e && g.closePath();
              }
              this._fillStroke(g, t);
            }
          }
        },
        _updateCircle: function(t) {
          if (!(!this._drawing || t._empty())) {
            var e = t._point, i = this._ctx, s = Math.max(Math.round(t._radius), 1), r = (Math.max(Math.round(t._radiusY), 1) || s) / s;
            r !== 1 && (i.save(), i.scale(1, r)), i.beginPath(), i.arc(e.x, e.y / r, s, 0, Math.PI * 2, !1), r !== 1 && i.restore(), this._fillStroke(i, t);
          }
        },
        _fillStroke: function(t, e) {
          var i = e.options;
          i.fill && (t.globalAlpha = i.fillOpacity, t.fillStyle = i.fillColor || i.color, t.fill(i.fillRule || "evenodd")), i.stroke && i.weight !== 0 && (t.setLineDash && t.setLineDash(e.options && e.options._dashArray || []), t.globalAlpha = i.opacity, t.lineWidth = i.weight, t.strokeStyle = i.color, t.lineCap = i.lineCap, t.lineJoin = i.lineJoin, t.stroke());
        },
        // Canvas obviously doesn't have mouse events for individual drawn objects,
        // so we emulate that by calculating what's under the mouse on mousemove/click manually
        _onClick: function(t) {
          for (var e = this._map.mouseEventToLayerPoint(t), i, s, r = this._drawFirst; r; r = r.next)
            i = r.layer, i.options.interactive && i._containsPoint(e) && (!(t.type === "click" || t.type === "preclick") || !this._map._draggableMoved(i)) && (s = i);
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
          e && (H(this._container, "leaflet-interactive"), this._fireEvent([e], t, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
        },
        _handleMouseHover: function(t, e) {
          if (!this._mouseHoverThrottled) {
            for (var i, s, r = this._drawFirst; r; r = r.next)
              i = r.layer, i.options.interactive && i._containsPoint(e) && (s = i);
            s !== this._hoveredLayer && (this._handleMouseOut(t), s && (A(this._container, "leaflet-interactive"), this._fireEvent([s], t, "mouseover"), this._hoveredLayer = s)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, t), this._mouseHoverThrottled = !0, setTimeout(f(function() {
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
      function hs(t) {
        return P.canvas ? new as(t) : null;
      }
      var ge = (function() {
        try {
          return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(t) {
            return document.createElement("<lvml:" + t + ' class="lvml">');
          };
        } catch {
        }
        return function(t) {
          return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
        };
      })(), co = {
        _initContainer: function() {
          this._container = O("div", "leaflet-vml-container");
        },
        _update: function() {
          this._map._animatingZoom || (wt.prototype._update.call(this), this.fire("update"));
        },
        _initPath: function(t) {
          var e = t._container = ge("shape");
          A(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = ge("path"), e.appendChild(t._path), this._updateStyle(t), this._layers[m(t)] = t;
        },
        _addPath: function(t) {
          var e = t._container;
          this._container.appendChild(e), t.options.interactive && t.addInteractiveTarget(e);
        },
        _removePath: function(t) {
          var e = t._container;
          U(e), t.removeInteractiveTarget(e), delete this._layers[m(t)];
        },
        _updateStyle: function(t) {
          var e = t._stroke, i = t._fill, s = t.options, r = t._container;
          r.stroked = !!s.stroke, r.filled = !!s.fill, s.stroke ? (e || (e = t._stroke = ge("stroke")), r.appendChild(e), e.weight = s.weight + "px", e.color = s.color, e.opacity = s.opacity, s.dashArray ? e.dashStyle = lt(s.dashArray) ? s.dashArray.join(" ") : s.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = s.lineCap.replace("butt", "flat"), e.joinstyle = s.lineJoin) : e && (r.removeChild(e), t._stroke = null), s.fill ? (i || (i = t._fill = ge("fill")), r.appendChild(i), i.color = s.fillColor || s.color, i.opacity = s.fillOpacity) : i && (r.removeChild(i), t._fill = null);
        },
        _updateCircle: function(t) {
          var e = t._point.round(), i = Math.round(t._radius), s = Math.round(t._radiusY || i);
          this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + s + " 0," + 65535 * 360);
        },
        _setPath: function(t, e) {
          t._path.v = e;
        },
        _bringToFront: function(t) {
          Ut(t._container);
        },
        _bringToBack: function(t) {
          Ht(t._container);
        }
      }, We = P.vml ? ge : un, _e = wt.extend({
        _initContainer: function() {
          this._container = We("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = We("g"), this._container.appendChild(this._rootGroup);
        },
        _destroyContainer: function() {
          U(this._container), N(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
        },
        _update: function() {
          if (!(this._map._animatingZoom && this._bounds)) {
            wt.prototype._update.call(this);
            var t = this._bounds, e = t.getSize(), i = this._container;
            (!this._svgSize || !this._svgSize.equals(e)) && (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), q(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" ")), this.fire("update");
          }
        },
        // methods below are called by vector layers implementations
        _initPath: function(t) {
          var e = t._path = We("path");
          t.options.className && A(e, t.options.className), t.options.interactive && A(e, "leaflet-interactive"), this._updateStyle(t), this._layers[m(t)] = t;
        },
        _addPath: function(t) {
          this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path);
        },
        _removePath: function(t) {
          U(t._path), t.removeInteractiveTarget(t._path), delete this._layers[m(t)];
        },
        _updatePath: function(t) {
          t._project(), t._update();
        },
        _updateStyle: function(t) {
          var e = t._path, i = t.options;
          e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"));
        },
        _updatePoly: function(t, e) {
          this._setPath(t, pn(t._parts, e));
        },
        _updateCircle: function(t) {
          var e = t._point, i = Math.max(Math.round(t._radius), 1), s = Math.max(Math.round(t._radiusY), 1) || i, r = "a" + i + "," + s + " 0 1,0 ", a = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + r + i * 2 + ",0 " + r + -i * 2 + ",0 ";
          this._setPath(t, a);
        },
        _setPath: function(t, e) {
          t._path.setAttribute("d", e);
        },
        // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
        _bringToFront: function(t) {
          Ut(t._path);
        },
        _bringToBack: function(t) {
          Ht(t._path);
        }
      });
      P.vml && _e.include(co);
      function ls(t) {
        return P.svg || P.vml ? new _e(t) : null;
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
          return this.options.preferCanvas && hs(t) || ls(t);
        }
      });
      var cs = Gt.extend({
        initialize: function(t, e) {
          Gt.prototype.initialize.call(this, this._boundsToLatLngs(t), e);
        },
        // @method setBounds(latLngBounds: LatLngBounds): this
        // Redraws the rectangle with the passed bounds.
        setBounds: function(t) {
          return this.setLatLngs(this._boundsToLatLngs(t));
        },
        _boundsToLatLngs: function(t) {
          return t = W(t), [
            t.getSouthWest(),
            t.getNorthWest(),
            t.getNorthEast(),
            t.getSouthEast()
          ];
        }
      });
      function uo(t, e) {
        return new cs(t, e);
      }
      _e.create = We, _e.pointsToPath = pn, bt.geometryToLayer = Re, bt.coordsToLatLng = Mi, bt.coordsToLatLngs = Be, bt.latLngToCoords = zi, bt.latLngsToCoords = Ne, bt.getFeature = jt, bt.asFeature = Ze, z.mergeOptions({
        // @option boxZoom: Boolean = true
        // Whether the map can be zoomed to a rectangular area specified by
        // dragging the mouse while pressing the shift key.
        boxZoom: !0
      });
      var ds = mt.extend({
        initialize: function(t) {
          this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this);
        },
        addHooks: function() {
          k(this._container, "mousedown", this._onMouseDown, this);
        },
        removeHooks: function() {
          N(this._container, "mousedown", this._onMouseDown, this);
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
          this._clearDeferredResetState(), this._resetState(), he(), _i(), this._startPoint = this._map.mouseEventToContainerPoint(t), k(document, {
            contextmenu: At,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseMove: function(t) {
          this._moved || (this._moved = !0, this._box = O("div", "leaflet-zoom-box", this._container), A(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
          var e = new F(this._point, this._startPoint), i = e.getSize();
          q(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px";
        },
        _finish: function() {
          this._moved && (U(this._box), H(this._container, "leaflet-crosshair")), le(), vi(), N(document, {
            contextmenu: At,
            mousemove: this._onMouseMove,
            mouseup: this._onMouseUp,
            keydown: this._onKeyDown
          }, this);
        },
        _onMouseUp: function(t) {
          if (!(t.which !== 1 && t.button !== 1) && (this._finish(), !!this._moved)) {
            this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(f(this._resetState, this), 0);
            var e = new it(
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
      z.addInitHook("addHandler", "boxZoom", ds), z.mergeOptions({
        // @option doubleClickZoom: Boolean|String = true
        // Whether the map can be zoomed in by double clicking on it and
        // zoomed out by double clicking while holding shift. If passed
        // `'center'`, double-click zoom will zoom to the center of the
        //  view regardless of where the mouse was.
        doubleClickZoom: !0
      });
      var us = mt.extend({
        addHooks: function() {
          this._map.on("dblclick", this._onDoubleClick, this);
        },
        removeHooks: function() {
          this._map.off("dblclick", this._onDoubleClick, this);
        },
        _onDoubleClick: function(t) {
          var e = this._map, i = e.getZoom(), s = e.options.zoomDelta, r = t.originalEvent.shiftKey ? i - s : i + s;
          e.options.doubleClickZoom === "center" ? e.setZoom(r) : e.setZoomAround(t.containerPoint, r);
        }
      });
      z.addInitHook("addHandler", "doubleClickZoom", us), z.mergeOptions({
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
      var ps = mt.extend({
        addHooks: function() {
          if (!this._draggable) {
            var t = this._map;
            this._draggable = new St(t._mapPane, t._container), this._draggable.on({
              dragstart: this._onDragStart,
              drag: this._onDrag,
              dragend: this._onDragEnd
            }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this));
          }
          A(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
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
            var e = W(this._map.options.maxBounds);
            this._offsetLimit = et(
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
          var t = this._worldWidth, e = Math.round(t / 2), i = this._initialWorldOffset, s = this._draggable._newPos.x, r = (s - e + i) % t + e - i, a = (s + e + i) % t - e - i, d = Math.abs(r + i) < Math.abs(a + i) ? r : a;
          this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = d;
        },
        _onDragEnd: function(t) {
          var e = this._map, i = e.options, s = !i.inertia || t.noInertia || this._times.length < 2;
          if (e.fire("dragend", t), s)
            e.fire("moveend");
          else {
            this._prunePositions(+/* @__PURE__ */ new Date());
            var r = this._lastPos.subtract(this._positions[0]), a = (this._lastTime - this._times[0]) / 1e3, d = i.easeLinearity, p = r.multiplyBy(d / a), g = p.distanceTo([0, 0]), _ = Math.min(i.inertiaMaxSpeed, g), b = p.multiplyBy(_ / g), E = _ / (i.inertiaDeceleration * d), I = b.multiplyBy(-E / 2).round();
            !I.x && !I.y ? e.fire("moveend") : (I = e._limitOffset(I, e.options.maxBounds), tt(function() {
              e.panBy(I, {
                duration: E,
                easeLinearity: d,
                noMoveStart: !0,
                animate: !0
              });
            }));
          }
        }
      });
      z.addInitHook("addHandler", "dragging", ps), z.mergeOptions({
        // @option keyboard: Boolean = true
        // Makes the map focusable and allows users to navigate the map with keyboard
        // arrows and `+`/`-` keys.
        keyboard: !0,
        // @option keyboardPanDelta: Number = 80
        // Amount of pixels to pan when pressing an arrow key.
        keyboardPanDelta: 80
      });
      var fs = mt.extend({
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
          this._removeHooks(), N(this._map._container, {
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
          var e = this._panKeys = {}, i = this.keyCodes, s, r;
          for (s = 0, r = i.left.length; s < r; s++)
            e[i.left[s]] = [-1 * t, 0];
          for (s = 0, r = i.right.length; s < r; s++)
            e[i.right[s]] = [t, 0];
          for (s = 0, r = i.down.length; s < r; s++)
            e[i.down[s]] = [0, t];
          for (s = 0, r = i.up.length; s < r; s++)
            e[i.up[s]] = [0, -1 * t];
        },
        _setZoomDelta: function(t) {
          var e = this._zoomKeys = {}, i = this.keyCodes, s, r;
          for (s = 0, r = i.zoomIn.length; s < r; s++)
            e[i.zoomIn[s]] = t;
          for (s = 0, r = i.zoomOut.length; s < r; s++)
            e[i.zoomOut[s]] = -t;
        },
        _addHooks: function() {
          k(document, "keydown", this._onKeyDown, this);
        },
        _removeHooks: function() {
          N(document, "keydown", this._onKeyDown, this);
        },
        _onKeyDown: function(t) {
          if (!(t.altKey || t.ctrlKey || t.metaKey)) {
            var e = t.keyCode, i = this._map, s;
            if (e in this._panKeys) {
              if (!i._panAnim || !i._panAnim._inProgress)
                if (s = this._panKeys[e], t.shiftKey && (s = $(s).multiplyBy(3)), i.options.maxBounds && (s = i._limitOffset($(s), i.options.maxBounds)), i.options.worldCopyJump) {
                  var r = i.wrapLatLng(i.unproject(i.project(i.getCenter()).add(s)));
                  i.panTo(r);
                } else
                  i.panBy(s);
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
      z.addInitHook("addHandler", "keyboard", fs), z.mergeOptions({
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
      var ms = mt.extend({
        addHooks: function() {
          k(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
        },
        removeHooks: function() {
          N(this._map._container, "wheel", this._onWheelScroll, this);
        },
        _onWheelScroll: function(t) {
          var e = Nn(t), i = this._map.options.wheelDebounceTime;
          this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
          var s = Math.max(i - (+/* @__PURE__ */ new Date() - this._startTime), 0);
          clearTimeout(this._timer), this._timer = setTimeout(f(this._performZoom, this), s), At(t);
        },
        _performZoom: function() {
          var t = this._map, e = t.getZoom(), i = this._map.options.zoomSnap || 0;
          t._stop();
          var s = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), r = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(s)))) / Math.LN2, a = i ? Math.ceil(r / i) * i : r, d = t._limitZoom(e + (this._delta > 0 ? a : -a)) - e;
          this._delta = 0, this._startTime = null, d && (t.options.scrollWheelZoom === "center" ? t.setZoom(e + d) : t.setZoomAround(this._lastMousePos, e + d));
        }
      });
      z.addInitHook("addHandler", "scrollWheelZoom", ms);
      var po = 600;
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
      var gs = mt.extend({
        addHooks: function() {
          k(this._map._container, "touchstart", this._onDown, this);
        },
        removeHooks: function() {
          N(this._map._container, "touchstart", this._onDown, this);
        },
        _onDown: function(t) {
          if (clearTimeout(this._holdTimeout), t.touches.length === 1) {
            var e = t.touches[0];
            this._startPos = this._newPos = new C(e.clientX, e.clientY), this._holdTimeout = setTimeout(f(function() {
              this._cancel(), this._isTapValid() && (k(document, "touchend", K), k(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", e));
            }, this), po), k(document, "touchend touchcancel contextmenu", this._cancel, this), k(document, "touchmove", this._onMove, this);
          }
        },
        _cancelClickPrevent: function t() {
          N(document, "touchend", K), N(document, "touchend touchcancel", t);
        },
        _cancel: function() {
          clearTimeout(this._holdTimeout), N(document, "touchend touchcancel contextmenu", this._cancel, this), N(document, "touchmove", this._onMove, this);
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
      z.addInitHook("addHandler", "tapHold", gs), z.mergeOptions({
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
      var _s = mt.extend({
        addHooks: function() {
          A(this._map._container, "leaflet-touch-zoom"), k(this._map._container, "touchstart", this._onTouchStart, this);
        },
        removeHooks: function() {
          H(this._map._container, "leaflet-touch-zoom"), N(this._map._container, "touchstart", this._onTouchStart, this);
        },
        _onTouchStart: function(t) {
          var e = this._map;
          if (!(!t.touches || t.touches.length !== 2 || e._animatingZoom || this._zooming)) {
            var i = e.mouseEventToContainerPoint(t.touches[0]), s = e.mouseEventToContainerPoint(t.touches[1]);
            this._centerPoint = e.getSize()._divideBy(2), this._startLatLng = e.containerPointToLatLng(this._centerPoint), e.options.touchZoom !== "center" && (this._pinchStartLatLng = e.containerPointToLatLng(i.add(s)._divideBy(2))), this._startDist = i.distanceTo(s), this._startZoom = e.getZoom(), this._moved = !1, this._zooming = !0, e._stop(), k(document, "touchmove", this._onTouchMove, this), k(document, "touchend touchcancel", this._onTouchEnd, this), K(t);
          }
        },
        _onTouchMove: function(t) {
          if (!(!t.touches || t.touches.length !== 2 || !this._zooming)) {
            var e = this._map, i = e.mouseEventToContainerPoint(t.touches[0]), s = e.mouseEventToContainerPoint(t.touches[1]), r = i.distanceTo(s) / this._startDist;
            if (this._zoom = e.getScaleZoom(r, this._startZoom), !e.options.bounceAtZoomLimits && (this._zoom < e.getMinZoom() && r < 1 || this._zoom > e.getMaxZoom() && r > 1) && (this._zoom = e._limitZoom(this._zoom)), e.options.touchZoom === "center") {
              if (this._center = this._startLatLng, r === 1)
                return;
            } else {
              var a = i._add(s)._divideBy(2)._subtract(this._centerPoint);
              if (r === 1 && a.x === 0 && a.y === 0)
                return;
              this._center = e.unproject(e.project(this._pinchStartLatLng, this._zoom).subtract(a), this._zoom);
            }
            this._moved || (e._moveStart(!0, !1), this._moved = !0), rt(this._animRequest);
            var d = f(e._move, e, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
            this._animRequest = tt(d, this, !0), K(t);
          }
        },
        _onTouchEnd: function() {
          if (!this._moved || !this._zooming) {
            this._zooming = !1;
            return;
          }
          this._zooming = !1, rt(this._animRequest), N(document, "touchmove", this._onTouchMove, this), N(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
        }
      });
      z.addInitHook("addHandler", "touchZoom", _s), z.BoxZoom = ds, z.DoubleClickZoom = us, z.Drag = ps, z.Keyboard = fs, z.ScrollWheelZoom = ms, z.TapHold = gs, z.TouchZoom = _s, o.Bounds = F, o.Browser = P, o.CRS = vt, o.Canvas = as, o.Circle = Di, o.CircleMarker = Oe, o.Class = _t, o.Control = ct, o.DivIcon = ss, o.DivOverlay = gt, o.DomEvent = kr, o.DomUtil = Lr, o.Draggable = St, o.Evented = ne, o.FeatureGroup = yt, o.GeoJSON = bt, o.GridLayer = me, o.Handler = mt, o.Icon = qt, o.ImageOverlay = Fe, o.LatLng = B, o.LatLngBounds = it, o.Layer = dt, o.LayerGroup = Wt, o.LineUtil = Hr, o.Map = z, o.Marker = ze, o.Mixin = Rr, o.Path = Et, o.Point = C, o.PolyUtil = Br, o.Polygon = Gt, o.Polyline = xt, o.Popup = Ue, o.PosAnimation = Zn, o.Projection = Wr, o.Rectangle = cs, o.Renderer = wt, o.SVG = _e, o.SVGOverlay = ns, o.TileLayer = Vt, o.Tooltip = He, o.Transformation = ri, o.Util = Ys, o.VideoOverlay = is, o.bind = f, o.bounds = et, o.canvas = hs, o.circle = Jr, o.circleMarker = Xr, o.control = ue, o.divIcon = ao, o.extend = l, o.featureGroup = Vr, o.geoJSON = es, o.geoJson = eo, o.gridLayer = ho, o.icon = Kr, o.imageOverlay = io, o.latLng = M, o.latLngBounds = W, o.layerGroup = jr, o.map = Ar, o.marker = Yr, o.point = $, o.polygon = to, o.polyline = Qr, o.popup = ro, o.rectangle = uo, o.setOptions = D, o.stamp = m, o.svg = ls, o.svgOverlay = so, o.tileLayer = rs, o.tooltip = oo, o.transformation = se, o.version = h, o.videoOverlay = no;
      var fo = window.L;
      o.noConflict = function() {
        return window.L = fo, this;
      }, window.L = o;
    }));
  })(ye, ye.exports)), ye.exports;
}
var Tt = $a();
const La = '.leaflet-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-container,.leaflet-pane>svg,.leaflet-pane>canvas,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-tile::selection{background:transparent}.leaflet-safari .leaflet-tile{image-rendering:-webkit-optimize-contrast}.leaflet-safari .leaflet-tile-container{width:1600px;height:1600px;-webkit-transform-origin:0 0}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container .leaflet-overlay-pane svg{max-width:none!important;max-height:none!important}.leaflet-container .leaflet-marker-pane img,.leaflet-container .leaflet-shadow-pane img,.leaflet-container .leaflet-tile-pane img,.leaflet-container img.leaflet-image-layer,.leaflet-container .leaflet-tile{max-width:none!important;max-height:none!important;width:auto;padding:0}.leaflet-container img.leaflet-tile{mix-blend-mode:plus-lighter}.leaflet-container.leaflet-touch-zoom{-ms-touch-action:pan-x pan-y;touch-action:pan-x pan-y}.leaflet-container.leaflet-touch-drag{-ms-touch-action:pinch-zoom;touch-action:none;touch-action:pinch-zoom}.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom{-ms-touch-action:none;touch-action:none}.leaflet-container{-webkit-tap-highlight-color:transparent}.leaflet-container a{-webkit-tap-highlight-color:rgba(51,181,229,.4)}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0;-moz-box-sizing:border-box;box-sizing:border-box;z-index:800}.leaflet-overlay-pane svg{-moz-user-select:none}.leaflet-pane{z-index:400}.leaflet-tile-pane{z-index:200}.leaflet-overlay-pane{z-index:400}.leaflet-shadow-pane{z-index:500}.leaflet-marker-pane{z-index:600}.leaflet-tooltip-pane{z-index:650}.leaflet-popup-pane{z-index:700}.leaflet-map-pane canvas{z-index:100}.leaflet-map-pane svg{z-index:200}.leaflet-vml-shape{width:1px;height:1px}.lvml{behavior:url(#default#VML);display:inline-block;position:absolute}.leaflet-control{position:relative;z-index:800;pointer-events:visiblePainted;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-animated{-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0}svg.leaflet-zoom-animated{will-change:transform}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile{-webkit-transition:none;-moz-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-interactive{cursor:pointer}.leaflet-grab{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.leaflet-crosshair,.leaflet-crosshair .leaflet-interactive{cursor:crosshair}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging .leaflet-grab,.leaflet-dragging .leaflet-grab .leaflet-interactive,.leaflet-dragging .leaflet-marker-draggable{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-image-layer,.leaflet-pane>svg path,.leaflet-tile-container{pointer-events:none}.leaflet-marker-icon.leaflet-interactive,.leaflet-image-layer.leaflet-interactive,.leaflet-pane>svg path.leaflet-interactive,svg.leaflet-image-layer.leaflet-interactive path{pointer-events:visiblePainted;pointer-events:auto}.leaflet-container{background:#ddd;outline-offset:1px}.leaflet-container a{color:#0078a8}.leaflet-zoom-box{border:2px dotted #38f;background:#ffffff80}.leaflet-container{font-family:Helvetica Neue,Arial,Helvetica,sans-serif;font-size:12px;font-size:.75rem;line-height:1.5}.leaflet-bar{box-shadow:0 1px 5px #000000a6;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover,.leaflet-bar a:focus{background-color:#f4f4f4}.leaflet-bar a:first-child{border-top-left-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-bottom:none}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar a{width:30px;height:30px;line-height:30px}.leaflet-touch .leaflet-bar a:first-child{border-top-left-radius:2px;border-top-right-radius:2px}.leaflet-touch .leaflet-bar a:last-child{border-bottom-left-radius:2px;border-bottom-right-radius:2px}.leaflet-control-zoom-in,.leaflet-control-zoom-out{font:700 18px Lucida Console,Monaco,monospace;text-indent:1px}.leaflet-touch .leaflet-control-zoom-in,.leaflet-touch .leaflet-control-zoom-out{font-size:22px}.leaflet-control-layers{box-shadow:0 1px 5px #0006;background:#fff;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAQAAAADQ4RFAAACf0lEQVR4AY1UM3gkARTePdvdoTxXKc+qTl3aU5U6b2Kbkz3Gtq3Zw6ziLGNPzrYx7946Tr6/ee/XeCQ4D3ykPtL5tHno4n0d/h3+xfuWHGLX81cn7r0iTNzjr7LrlxCqPtkbTQEHeqOrTy4Yyt3VCi/IOB0v7rVC7q45Q3Gr5K6jt+3Gl5nCoDD4MtO+j96Wu8atmhGqcNGHObuf8OM/x3AMx38+4Z2sPqzCxRFK2aF2e5Jol56XTLyggAMTL56XOMoS1W4pOyjUcGGQdZxU6qRh7B9Zp+PfpOFlqt0zyDZckPi1ttmIp03jX8gyJ8a/PG2yutpS/Vol7peZIbZcKBAEEheEIAgFbDkz5H6Zrkm2hVWGiXKiF4Ycw0RWKdtC16Q7qe3X4iOMxruonzegJzWaXFrU9utOSsLUmrc0YjeWYjCW4PDMADElpJSSQ0vQvA1Tm6/JlKnqFs1EGyZiFCqnRZTEJJJiKRYzVYzJck2Rm6P4iH+cmSY0YzimYa8l0EtTODFWhcMIMVqdsI2uiTvKmTisIDHJ3od5GILVhBCarCfVRmo4uTjkhrhzkiBV7SsaqS+TzrzM1qpGGUFt28pIySQHR6h7F6KSwGWm97ay+Z+ZqMcEjEWebE7wxCSQwpkhJqoZA5ivCdZDjJepuJ9IQjGGUmuXJdBFUygxVqVsxFsLMbDe8ZbDYVCGKxs+W080max1hFCarCfV+C1KATwcnvE9gRRuMP2prdbWGowm1KB1y+zwMMENkM755cJ2yPDtqhTI6ED1M/82yIDtC/4j4BijjeObflpO9I9MwXTCsSX8jWAFeHr05WoLTJ5G8IQVS/7vwR6ohirYM7f6HzYpogfS3R2OAAAAAElFTkSuQmCC);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAQAAABvcdNgAAAEsklEQVR4AWL4TydIhpZK1kpWOlg0w3ZXP6D2soBtG42jeI6ZmQTHzAxiTbSJsYLjO9HhP+WOmcuhciVnmHVQcJnp7DFvScowZorad/+V/fVzMdMT2g9Cv9guXGv/7pYOrXh2U+RRR3dSd9JRx6bIFc/ekqHI29JC6pJ5ZEh1yWkhkbcFeSjxgx3L2m1cb1C7bceyxA+CNjT/Ifff+/kDk2u/w/33/IeCMOSaWZ4glosqT3DNnNZQ7Cs58/3Ce5HL78iZH/vKVIaYlqzfdLu8Vi7dnvUbEza5Idt36tquZFldl6N5Z/POLof0XLK61mZCmJSWjVF9tEjUluu74IUXvgttuVIHE7YxSkaYhJZam7yiM9Pv82JYfl9nptxZaxMJE4YSPty+vF0+Y2up9d3wwijfjZbabqm/3bZ9ecKHsiGmRflnn1MW4pjHf9oLufyn2z3y1D6n8g8TZhxyzipLNPnAUpsOiuWimg52psrTZYnOWYNDTMuWBWa0tJb4rgq1UvmutpaYEbZlwU3CLJm/ayYjHW5/h7xWLn9Hh1vepDkyf7dE7MtT5LR4e7yYpHrkhOUpEfssBLq2pPhAqoSWKUkk7EDqkmK6RrCEzqDjhNDWNE+XSMvkJRDWlZTmCW0l0PHQGRZY5t1L83kT0Y3l2SItk5JAWHl2dCOBm+fPu3fo5/3v61RMCO9Jx2EEYYhb0rmNQMX/vm7gqOEJLcXTGw3CAuRNeyaPWwjR8PRqKQ1PDA/dpv+on9Shox52WFnx0KY8onHayrJzm87i5h9xGw/tfkev0jGsQizqezUKjk12hBMKJ4kbCqGPVNXudyyrShovGw5CgxsRICxF6aRmSjlBnHRzg7Gx8fKqEubI2rahQYdR1YgDIRQO7JvQyD52hoIQx0mxa0ODtW2Iozn1le2iIRdzwWewedyZzewidueOGqlsn1MvcnQpuVwLGG3/IR1hIKxCjelIDZ8ldqWz25jWAsnldEnK0Zxro19TGVb2ffIZEsIO89EIEDvKMPrzmBOQcKQ+rroye6NgRRxqR4U8EAkz0CL6uSGOm6KQCdWjvjRiSP1BPalCRS5iQYiEIvxuBMJEWgzSoHADcVMuN7IuqqTeyUPq22qFimFtxDyBBJEwNyt6TM88blFHao/6tWWhuuOM4SAK4EI4QmFHA+SEyWlp4EQoJ13cYGzMu7yszEIBOm2rVmHUNqwAIQabISNMRstmdhNWcFLsSm+0tjJH1MdRxO5Nx0WDMhCtgD6OKgZeljJqJKc9po8juskR9XN0Y1lZ3mWjLR9JCO1jRDMd0fpYC2VnvjBSEFg7wBENc0R9HFlb0xvF1+TBEpF68d+DHR6IOWVv2BECtxo46hOFUBd/APU57WIoEwJhIi2CdpyZX0m93BZicktMj1AS9dClteUFAUNUIEygRZCtik5zSxI9MubTBH1GOiHsiLJ3OCoSZkILa9PxiN0EbvhsAo8tdAf9Seepd36lGWHmtNANTv5Jd0z4QYyeo/UEJqxKRpg5LZx6btLPsOaEmdMyxYdlc8LMaJnikDlhclqmPiQnTEpLUIZEwkRagjYkEibQErwhkTAKCLQEbUgkzJQWc/0PstHHcfEdQ+UAAAAASUVORK5CYII=);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-scrollbar{overflow-y:scroll;overflow-x:hidden;padding-right:5px}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block;font-size:13px;font-size:1.08333em}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-default-icon-path{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=)}.leaflet-container .leaflet-control-attribution{background:#fff;background:#fffc;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333;line-height:1.4}.leaflet-control-attribution a{text-decoration:none}.leaflet-control-attribution a:hover,.leaflet-control-attribution a:focus{text-decoration:underline}.leaflet-attribution-flag{display:inline!important;vertical-align:baseline!important;width:1em;height:.6669em}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:none;line-height:1.1;padding:2px 5px 1px;white-space:nowrap;-moz-box-sizing:border-box;box-sizing:border-box;background:#fffc;text-shadow:1px 1px #fff}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:none;margin-top:-2px}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-bar{border:2px solid rgba(0,0,0,.2);background-clip:padding-box}.leaflet-popup{position:absolute;text-align:center;margin-bottom:20px}.leaflet-popup-content-wrapper{padding:1px;text-align:left;border-radius:12px}.leaflet-popup-content{margin:13px 24px 13px 20px;line-height:1.3;font-size:13px;font-size:1.08333em;min-height:1px}.leaflet-popup-content p{margin:1.3em 0}.leaflet-popup-tip-container{width:40px;height:20px;position:absolute;left:50%;margin-top:-1px;margin-left:-20px;overflow:hidden;pointer-events:none}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;pointer-events:auto;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;color:#333;box-shadow:0 3px 14px #0006}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;border:none;text-align:center;width:24px;height:24px;font:16px/24px Tahoma,Verdana,sans-serif;color:#757575;text-decoration:none;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover,.leaflet-container a.leaflet-popup-close-button:focus{color:#585858}.leaflet-popup-scrolled{overflow:auto}.leaflet-oldie .leaflet-popup-content-wrapper{-ms-zoom:1}.leaflet-oldie .leaflet-popup-tip{width:24px;margin:0 auto;-ms-filter:"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)";filter:progid:DXImageTransform.Microsoft.Matrix(M11=.70710678,M12=.70710678,M21=-.70710678,M22=.70710678)}.leaflet-oldie .leaflet-control-zoom,.leaflet-oldie .leaflet-control-layers,.leaflet-oldie .leaflet-popup-content-wrapper,.leaflet-oldie .leaflet-popup-tip{border:1px solid #999}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-tooltip{position:absolute;padding:6px;background-color:#fff;border:1px solid #fff;border-radius:3px;color:#222;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;box-shadow:0 1px 3px #0006}.leaflet-tooltip.leaflet-interactive{cursor:pointer;pointer-events:auto}.leaflet-tooltip-top:before,.leaflet-tooltip-bottom:before,.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{position:absolute;pointer-events:none;border:6px solid transparent;background:transparent;content:""}.leaflet-tooltip-bottom{margin-top:6px}.leaflet-tooltip-top{margin-top:-6px}.leaflet-tooltip-bottom:before,.leaflet-tooltip-top:before{left:50%;margin-left:-6px}.leaflet-tooltip-top:before{bottom:0;margin-bottom:-12px;border-top-color:#fff}.leaflet-tooltip-bottom:before{top:0;margin-top:-12px;margin-left:-6px;border-bottom-color:#fff}.leaflet-tooltip-left{margin-left:-6px}.leaflet-tooltip-right{margin-left:6px}.leaflet-tooltip-left:before,.leaflet-tooltip-right:before{top:50%;margin-top:-6px}.leaflet-tooltip-left:before{right:0;margin-right:-12px;border-left-color:#fff}.leaflet-tooltip-right:before{left:0;margin-left:-12px;border-right-color:#fff}@media print{.leaflet-control{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
function Ca(c) {
  return [...c].sort((n, o) => {
    const h = n.started_at ? Date.parse(n.started_at) : Number.POSITIVE_INFINITY, l = o.started_at ? Date.parse(o.started_at) : Number.POSITIVE_INFINITY;
    return h !== l ? h - l : n.id.localeCompare(o.id);
  });
}
const Rs = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"], ka = La.replace(/\s+/g, " ").trim();
class Ks extends ee {
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
  onActiveTripChanged = (n) => {
    const o = n.detail;
    o?.vehicleId !== this.vehicleId || o.tripId === this.selectedTripId || (this.selectedTripId = o.tripId, this.selectedDriveIds = [], this.driveSelectionInitialized = !1, this.refresh(!0));
  };
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(Bt, this.onActiveTripChanged), this.driveSectionsOpen = typeof window < "u" && window.matchMedia("(min-width: 700px)").matches, this.refresh(!0);
  }
  disconnectedCallback() {
    this.map?.remove(), this.map = void 0, this.tileLayer = void 0, window.removeEventListener(Bt, this.onActiveTripChanged), super.disconnectedCallback();
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
        const o = await sn(this.hass);
        this.vehicleName = o.find((v) => v.vehicle_id === this.vehicleId)?.name ?? "";
        const h = await te(this.hass, this.vehicleId);
        this.mapConfig = h.map_config, this.trips = h.trips;
        const l = rn(this.vehicleId);
        l && this.trips.some((v) => v.id === l) && (this.selectedTripId = l), (!this.selectedTripId || !this.trips.some((v) => v.id === this.selectedTripId)) && (this.selectedTripId = this.trips.find((v) => v.status === "active")?.id ?? this.trips[0]?.id ?? ""), this.selectedTripId && Ot({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" });
        const u = this.selectedTripId ? await te(this.hass, this.vehicleId, this.selectedTripId) : h;
        this.mapConfig = u.map_config ?? this.mapConfig, this.drives = Ca(u.drives), this.places = u.stops ?? [];
        const f = new Set(this.drives.map((v) => v.id));
        this.selectedDriveIds = this.selectedDriveIds.filter((v) => f.has(v)), this.driveSelectionInitialized || (this.selectedDriveIds = this.drives.map((v) => v.id), this.driveSelectionInitialized = !0), this.data = await Wo(this.hass, this.vehicleId, this.selectedTripId || void 0, this.selectedDriveIds);
      } catch {
        this.error = S(this.hass).loadError, this.data = void 0;
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
    this.map || (this.map = Tt.map(n, { zoomControl: !0, attributionControl: !0 }), this.map.setView([51, 10], 5));
    const o = this.config, h = o.tile_url ?? this.mapConfig?.tile_url ?? void 0, l = o.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    if (h && !this.tileError && !this.tileLayer) {
      const f = l || (h.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = Tt.tileLayer(h, { maxZoom: 19, attribution: f }).on("tileerror", () => {
        this.tileError = !0, this.tileLayer?.remove(), this.tileLayer = void 0, this.requestUpdate();
      }).addTo(this.map);
    }
    for (const f of this.layers) f.remove();
    this.layers = [];
    const u = Tt.latLngBounds([]);
    for (const [f, v] of (this.data?.segments ?? []).entries()) {
      const m = v.points.map((D) => Tt.latLng(D.latitude, D.longitude));
      if (!m.length) continue;
      const x = this.drives.findIndex((D) => D.id === v.drive_id), T = this.driveColor(x >= 0 ? x : f), w = Tt.polyline(m, { color: T, weight: 4, opacity: 0.85 }).addTo(this.map);
      this.layers.push(w), m.forEach((D) => u.extend(D));
      const R = S(this.hass), J = Tt.circleMarker(m[0], { radius: 6, color: T, fillOpacity: 1 }).bindTooltip(R.mapStart).addTo(this.map), Y = Tt.circleMarker(m[m.length - 1], { radius: 6, color: "#111", fillColor: T, fillOpacity: 1 }).bindTooltip(R.mapEnd).addTo(this.map);
      this.layers.push(J, Y);
      for (const D of v.gaps) {
        const Zt = m[Math.max(0, Math.floor(m.length / 2))], ie = Tt.circleMarker(Zt, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${R.mapGap}: ${D.seconds}s`).addTo(this.map);
        this.layers.push(ie);
      }
    }
    for (const f of this.places) {
      if (!this.showPlaces || f.latitude == null || f.longitude == null || f.confirmed === !1) continue;
      const v = ["campsite", "rv_site", "wild_camp", "overnight"].includes(f.place_kind || f.place_type || f.stop_type), m = Tt.circleMarker([f.latitude, f.longitude], { radius: v ? 9 : 7, color: v ? "#7b1fa2" : "#455a64", fillColor: v ? "#ce93d8" : "#90a4ae", fillOpacity: 0.95, weight: 2 }), x = f.rating_overall ? ` · ${f.rating_overall}/5` : "", T = document.createElement("div"), w = document.createElement("strong");
      w.textContent = f.name || "Ort", T.append(w, document.createElement("br")), T.append(document.createTextNode(`${f.place_type || f.stop_type}${x}`), document.createElement("br")), T.append(document.createTextNode(f.description || "")), m.bindPopup(T), m.addTo(this.map), this.layers.push(m), u.extend([f.latitude, f.longitude]);
    }
    this.fitMapPending && u.isValid() && (this.map.fitBounds(u.pad(0.08)), this.fitMapPending = !1), setTimeout(() => this.map?.invalidateSize(), 0);
  }
  driveColor(n) {
    return Rs[n % Rs.length];
  }
  selectedTrip() {
    return this.trips.find((n) => n.id === this.selectedTripId);
  }
  selectedDrives() {
    return this.drives.filter((n) => this.selectedDriveIds.includes(n.id));
  }
  async selectTrip(n) {
    this.selectedTripId = n.currentTarget.value, Ot({ vehicleId: this.vehicleId, tripId: this.selectedTripId, source: "map" }), this.selectedDriveIds = [], this.driveSelectionInitialized = !1, await this.refresh(!0);
  }
  async toggleDrive(n) {
    const o = n.currentTarget;
    this.selectedDriveIds = o.checked ? [.../* @__PURE__ */ new Set([...this.selectedDriveIds, o.value])] : this.selectedDriveIds.filter((h) => h !== o.value), await this.refresh(!0);
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
  driveRow(n, o) {
    const h = S(this.hass);
    return y`<label class="drive-row" style=${`--drive-color:${this.driveColor(o)}`}>
      <input type="checkbox" value=${n.id} .checked=${this.selectedDriveIds.includes(n.id)} @change=${(l) => {
      this.toggleDrive(l);
    }}>
      <span class="drive-info"><strong>${Ve(n.started_at, this.hass)} · ${ga(n.started_at, this.hass)}</strong><span>${(n.distance_m / 1e3).toFixed(1)} km · ${n.source === "manual" ? h.sourceManual : h.sourceGps}</span></span>
    </label>`;
  }
  render() {
    const n = S(this.hass), o = this.config, h = this.selectedTrip(), l = this.selectedDrives(), u = l.reduce((v, m) => v + m.distance_m, 0) / 1e3, f = o.tile_attribution ?? this.mapConfig?.tile_attribution ?? void 0;
    return y`<ha-card>
      <header class="map-header">
        <div><h2>${n.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || n.mapVehicle}</p></div>
        ${this.trips.length ? y`<label class="trip-picker"><span>${n.mapTrip}</span><select @change=${(v) => {
      this.selectTrip(v);
    }} .value=${this.selectedTripId}>${this.trips.map((v) => y`<option value=${v.id}>${v.title}</option>`)}</select></label>` : ""}
      </header>
      ${h ? y`<div class="metrics" aria-label=${n.mapTrip}>
        <div class="metric"><span>${n.mapTotalDistance}</span><strong>${u.toFixed(1)} km</strong></div>
        <div class="metric"><span>${n.mapSelectedDrives}</span><strong>${l.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${n.mapTripPeriod}</span><strong>${_a(h, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? y`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(v) => this.onDriveSectionsToggle(v)}>
        <summary><span>${n.mapDriveSegments}</span><span class="summary-count">${l.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => {
      this.selectAllDrives();
    }}>${n.mapSelectAll}</button><button class="secondary" type="button" @click=${() => {
      this.selectNoDrives();
    }}>${n.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((v, m) => this.driveRow(v, m))}</div>
      </details>` : ""}
      <label class="place-filter"><input type="checkbox" .checked=${this.showPlaces} @change=${(v) => {
      this.showPlaces = v.currentTarget.checked, this.queueMapRender(), this.requestUpdate();
    }}> ${n.mapPlaces ?? "Orte anzeigen"}</label>
      ${this.error ? y`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? y`<p class="error" role="alert">${S(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !o.tile_url && !this.mapConfig?.tile_url ? y`<p class="muted" role="status">${S(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? y`<p class="muted">${n.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? y`<p class="muted">${n.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${n.mapRouteImageAlt}></div>
      ${f ? y`<p class="attribution">${f}</p>` : ""}
      ${this.loading ? y`<p class="muted">${n.loading}</p>` : ""}
    </ha-card>`;
  }
}
Ks.styles = [ee.styles, Ns(ka), Nt`
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
nn("camper-travel-journal-map-card", Ks);
function Aa(c, n) {
  return c.vehicle_id || n.length !== 1 ? c : { ...c, vehicle_id: n[0].vehicle_id };
}
function Ia(c, n) {
  return c.type === n.type && c.vehicle_id === n.vehicle_id;
}
class Da extends zt {
  static styles = Nt`
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
    const o = this._hass?.connection !== n?.connection;
    this._hass = n, o && n && this.loadVehicles(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  setConfig(n) {
    Ia(this._config, n) || (this._config = { ...n }, this._hass && !this.loadedConnection && this.loadVehicles(), this.requestUpdate());
  }
  async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = !0, this.error = "", this.requestUpdate();
    const n = this._hass;
    return this.loadingPromise = (async () => {
      try {
        this.vehicles = await sn(n), this.loadedConnection = n.connection;
        const o = Aa(this._config, this.vehicles);
        o.vehicle_id !== this._config.vehicle_id && (this._config = o, this.fireConfigChanged());
      } catch {
        this.error = S(n).editorLoadError;
      } finally {
        this.loading = !1, this.loadingPromise = void 0, this.requestUpdate();
      }
    })(), this.loadingPromise;
  }
  fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: !0, composed: !0, detail: { config: { ...this._config } } }));
  }
  selectVehicle(n) {
    const o = n.target.value;
    this._config = { ...this._config, vehicle_id: o }, this.fireConfigChanged();
  }
  render() {
    const n = S(this._hass);
    return y`
      <div class="field">
        <label for="vehicle">${n.editorVehicle}</label>
        ${this.loading ? y`<span class="muted">${n.editorLoading}</span>` : y`
          <select id="vehicle" aria-label=${n.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${n.editorChooseVehicle}</option>
            ${this.vehicles.map((o) => y`<option value=${o.vehicle_id} ?selected=${o.vehicle_id === this._config.vehicle_id}>${o.name || o.title}</option>`)}
          </select>
        `}
        ${this.error ? y`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? y`<span class="error" role="alert">${n.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}
typeof customElements < "u" && !customElements.get("camper-travel-journal-card-editor") && customElements.define("camper-travel-journal-card-editor", Da);
const Ma = [
  { type: "camper-travel-journal-summary-card", name: "Camper Travel Journal – Reiseübersicht", description: "Zeigt die aktuelle Reise, Fahrten, Strecke und Reisekosten kompakt an.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-manager-card", name: "Camper Travel Journal – Reiseverwaltung", description: "Reisen erstellen, bearbeiten und verwalten.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-diagnostics-card", name: "Camper Travel Journal – Diagnose", description: "Startet manuell eine bereinigte, ausschließlich lesende WebSocket-Diagnose.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" },
  { type: "camper-travel-journal-map-card", name: "Camper Travel Journal – GPS-Karte", description: "Zeigt gespeicherte GPS-Fahrten nach Reise und Fahrtabschnitt.", documentationURL: "https://github.com/balronu/ha-camper-travel-journal" }
];
window.customCards ??= [];
for (const c of Ma) window.customCards.some((n) => n.type === c.type) || window.customCards.push(c);
