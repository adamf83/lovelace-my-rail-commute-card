/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,_=p.trustedTypes,m=_?_.emptyScript:"",g=p.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??y)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,g?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,C=w.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+A,T=`<${k}>`,R=document,O=()=>R.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,I="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,z=/>/g,j=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,H=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,q=R.createTreeWalker(R,129);function J(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",a=D;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,d=0;for(;d<i.length&&(a.lastIndex=d,c=a.exec(i),null!==c);)d=a.lastIndex,a===D?"!--"===c[1]?a=M:void 0!==c[1]?a=z:void 0!==c[2]?(L.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=j):void 0!==c[3]&&(a=j):a===j?">"===c[0]?(a=r??D,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?j:'"'===c[3]?H:U):a===H||a===U?a=j:a===M||a===z?a=D:(a=j,r=void 0);const h=a===j&&t[e+1].startsWith("/>")?" ":"";n+=a===D?i+T:l>=0?(s.push(o),i.slice(0,l)+S+i.slice(l)+A+h):i+A+(-2===l?e:h)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class X{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const a=t.length-1,o=this.parts,[c,l]=K(t,e);if(this.el=X.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&o.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[n++],i=s.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(A)&&(o.push({type:6,index:r}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(A),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),q.nextNode(),o.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===k)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(A,t+1));)o.push({type:7,index:r}),t+=A.length-1}r++}}static createElement(t,e){const i=R.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=P(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);q.currentNode=s;let r=q.nextNode(),n=0,a=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Z(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new st(r,this,t)),this._$AV.push(e),o=i[++a]}n!==o?.index&&(r=q.nextNode(),n++)}return q.currentNode=R,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new X(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Z(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=G(this,t,e,0),n=!P(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let a,o;for(t=r[0],a=0;a<r.length-1;a++)o=G(this,s[i+a],e,a),o===F&&(o=this._$AH[a]),n||=!P(o)||o!==this._$AH[a],o===V?t=V:t!==V&&(t+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(X,Z),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct=n`
  :host {
    --status-on-time: var(--custom-on-time-color, #4caf50);
    --status-minor-delay: var(--custom-minor-delay-color, #ff9800);
    --status-major-delay: var(--custom-major-delay-color, #f44336);
    --status-cancelled: var(--custom-cancelled-color, #d32f2f);
    --status-no-service: var(--custom-no-service-color, #9e9e9e);
    --status-unknown: #9e9e9e;

    --card-padding: 16px;
    --row-padding: 12px;
    --border-radius: 8px;

    display: block;
  }

  ha-card {
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  /* ==================== HEADER ==================== */

  .card-header {
    padding: var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .header-title {
    flex: 1;
  }

  .route {
    margin-top: 4px;
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
  }

  .return-toggle {
    background: none;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color, #757575);
    padding: 0;
    margin-left: auto;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .return-toggle:hover {
    background: var(--secondary-background-color, #f5f5f5);
  }

  .return-toggle.active {
    background: var(--primary-color, #03a9f4);
    color: #fff;
    border-color: var(--primary-color, #03a9f4);
  }

  /* ==================== DISRUPTION BANNER ==================== */

  .disruption-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px var(--card-padding);
    background: var(--status-major-delay);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
    border-left: 4px solid rgba(0, 0, 0, 0.25);
    transition: filter 0.15s ease;
  }

  .disruption-banner.disruption-minor {
    background: var(--status-minor-delay);
    border-left-color: rgba(0, 0, 0, 0.2);
  }

  .disruption-banner.disruption-major {
    background: #e65100;
    border-left-color: rgba(0, 0, 0, 0.25);
  }

  .disruption-banner.disruption-severe {
    background: var(--status-major-delay);
    border-left-color: rgba(0, 0, 0, 0.25);
  }

  .disruption-banner.disruption-critical {
    background: #7f0000;
    border-left-color: rgba(0, 0, 0, 0.35);
  }

  .disruption-banner.disruption-clickable {
    cursor: pointer;
  }

  .disruption-banner.disruption-clickable:hover {
    filter: brightness(1.1);
  }

  .disruption-icon {
    --mdc-icon-size: 22px;
    color: #fff;
    flex-shrink: 0;
  }

  .disruption-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .disruption-label {
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .disruption-message {
    font-size: 0.82rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .disruption-chevron {
    --mdc-icon-size: 18px;
    color: rgba(255, 255, 255, 0.75);
    flex-shrink: 0;
  }

  ha-card.departure-board .disruption-banner {
    background: #b71c1c;
    color: #ffcc00;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 1px;
    border-left-color: rgba(0, 0, 0, 0.4);
  }

  ha-card.departure-board .disruption-banner.disruption-minor {
    background: #e65100;
    color: #ffcc00;
  }

  ha-card.departure-board .disruption-banner.disruption-major {
    background: #bf360c;
    color: #ffcc00;
  }

  ha-card.departure-board .disruption-banner.disruption-severe {
    background: #b71c1c;
    color: #ffcc00;
  }

  ha-card.departure-board .disruption-banner.disruption-critical {
    background: #4a0000;
    color: #ffcc00;
  }

  ha-card.departure-board .disruption-icon {
    color: #ffcc00;
  }

  ha-card.departure-board .disruption-chevron {
    color: rgba(255, 204, 0, 0.7);
  }

  /* ==================== CONTENT ==================== */

  .card-content {
    padding: 0;
  }

  /* ==================== FULL VIEW ==================== */

  .train-row {
    padding: var(--row-padding) var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .train-row:hover {
    background-color: var(--secondary-background-color, #f5f5f5);
  }

  .train-row:last-child {
    border-bottom: none;
  }

  .train-main {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 4px;
  }

  .train-time {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }

  .train-time ha-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color, #757575);
  }

  .time {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--primary-text-color, #212121);
  }

  .expected-time {
    font-size: 1rem;
    color: var(--status-minor-delay);
    margin-left: 4px;
    min-width: 3.5rem;
  }

  .train-platform {
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
    flex: 0 0 auto;
  }

  .train-status {
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .train-details {
    margin-left: 32px;
    font-size: 0.85rem;
    color: var(--secondary-text-color, #757575);
  }

  .operator {
    font-weight: 500;
  }

  .delay-reason {
    margin-top: 4px;
    font-style: italic;
    color: var(--status-minor-delay);
  }

  .calling-points {
    margin-top: 4px;
  }

  .journey-time {
    margin-top: 4px;
    font-size: 0.8rem;
  }

  /* ==================== STATUS COLORS ==================== */

  .train-row.on-time .train-status {
    color: var(--status-on-time);
  }

  .train-row.minor-delay .train-status {
    color: var(--status-minor-delay);
  }

  .train-row.major-delay .train-status {
    color: var(--status-major-delay);
  }

  .train-row.cancelled {
    opacity: 0.6;
  }

  .train-row.cancelled .train-status {
    color: var(--status-cancelled);
  }

  .train-row.cancelled .time {
    text-decoration: line-through;
  }

  .train-row.no-service {
    opacity: 0.6;
  }

  .train-row.no-service .train-status {
    color: var(--status-no-service);
  }

  /* ==================== COMPACT VIEW ==================== */

  .card-content.compact {
    padding: 8px 0;
  }

  .train-row-compact {
    display: grid;
    grid-template-columns: 60px 1fr 70px;
    align-items: center;
    padding: 8px var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .train-row-compact:hover {
    background-color: var(--secondary-background-color, #f5f5f5);
  }

  .train-row-compact:last-child {
    border-bottom: none;
  }

  .train-row-compact .time {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .train-row-compact .platform {
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
    text-align: center;
  }

  .train-row-compact .status {
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
  }

  .train-row-compact .status .status-icon {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .train-row-compact .status .delay-text {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .train-row-compact.on-time .status {
    color: var(--status-on-time);
  }

  .train-row-compact.minor-delay .status {
    color: var(--status-minor-delay);
  }

  .train-row-compact.major-delay .status {
    color: var(--status-major-delay);
  }

  .train-row-compact.cancelled .status {
    color: var(--status-cancelled);
  }

  .train-row-compact.cancelled .time {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .train-row-compact.no-service .status {
    color: var(--status-no-service);
  }

  .train-row-compact.no-service .time {
    opacity: 0.6;
  }

  /* ==================== NEXT-ONLY VIEW ==================== */

  .card-content.next-only {
    padding: var(--card-padding);
    text-align: center;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .next-train-time {
    font-size: 3rem;
    font-weight: 700;
    margin: 16px 0;
    color: var(--primary-text-color, #212121);
  }

  .next-train-expected {
    font-size: 1rem;
    color: var(--status-minor-delay);
    margin-bottom: 16px;
  }

  .next-train-platform {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 12px 0;
    color: var(--primary-text-color, #212121);
  }

  .next-train-status {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .next-train-status.on-time {
    color: var(--status-on-time);
  }

  .next-train-status.minor-delay {
    color: var(--status-minor-delay);
  }

  .next-train-status.major-delay {
    color: var(--status-major-delay);
  }

  .next-train-status.cancelled {
    color: var(--status-cancelled);
  }

  .next-train-status.no-service {
    color: var(--status-no-service);
  }

  .next-train-operator {
    font-size: 1rem;
    color: var(--secondary-text-color, #757575);
    margin: 12px 0;
  }

  .next-train-calling {
    margin-top: 16px;
    font-size: 0.9rem;
    text-align: left;
    padding: 12px;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: var(--border-radius);
    color: var(--primary-text-color, #212121);
  }

  .next-train-calling strong {
    display: block;
    margin-bottom: 8px;
  }

  /* ==================== DEPARTURE BOARD VIEW ==================== */

  ha-card.departure-board {
    background: #1a1a1a;
    color: #ffcc00;
    font-family: 'Courier New', Courier, monospace;
  }

  .board-header {
    padding: var(--card-padding);
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    border-bottom: 2px solid #333;
    letter-spacing: 2px;
  }

  .board-content {
    padding: 0;
  }

  .board-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }

  .board-row {
    display: table-row;
  }

  .board-row > span {
    display: table-cell;
    padding: 8px 12px;
    border-bottom: 1px solid #333;
    vertical-align: middle;
  }

  .board-header-row {
    font-weight: 700;
    border-bottom: 2px solid #ffcc00;
  }

  .board-header-row > span {
    border-bottom: 2px solid #ffcc00;
  }

  .board-row:not(.board-header-row) {
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .board-row:not(.board-header-row):hover {
    background-color: #252525;
  }

  .col-time {
    width: 20%;
  }

  .col-dest {
    width: 40%;
  }

  .col-plat {
    width: 15%;
    text-align: center;
  }

  .col-status {
    width: 25%;
  }

  .board-row.cancelled {
    opacity: 0.5;
    text-decoration: line-through;
  }

  .board-row.no-service {
    opacity: 0.5;
  }

  .board-row.major-delay .col-status {
    animation: flash 1s infinite;
  }

  @keyframes flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.5; }
  }

  /* ==================== FOOTER ==================== */

  .card-footer {
    padding: 8px var(--card-padding);
    border-top: 1px solid var(--divider-color, #e0e0e0);
    font-size: 0.8rem;
    color: var(--secondary-text-color, #757575);
    text-align: center;
    background: var(--card-background-color, #fff);
  }

  /* ==================== EMPTY STATE ==================== */

  .card-content.empty {
    padding: 48px var(--card-padding);
    text-align: center;
  }

  .empty-icon {
    --mdc-icon-size: 64px;
    color: var(--disabled-text-color, #bdbdbd);
    margin-bottom: 16px;
  }

  .empty-message {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--primary-text-color, #212121);
  }

  .empty-submessage {
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
  }

  /* ==================== LOADING STATE ==================== */

  .card-content.loading {
    padding: 48px var(--card-padding);
    text-align: center;
  }

  .loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid var(--divider-color, #e0e0e0);
    border-top-color: var(--primary-color, #03a9f4);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-message {
    margin-top: 16px;
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
  }

  /* ==================== REFRESH TOAST ==================== */

  .refresh-toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 24px;
    font-size: 0.9rem;
    animation: fadeInOut 2s ease-in-out;
    pointer-events: none;
    z-index: 1000;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }

  /* ==================== ANIMATIONS ==================== */

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .train-row,
  .train-row-compact {
    animation: slideIn 0.3s ease-out;
  }

  /* Disable animations if user prefers reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ==================== RESPONSIVE ==================== */

  @media (max-width: 600px) {
    .train-main {
      flex-wrap: wrap;
    }

    .time {
      font-size: 1.3rem;
    }

    .next-train-time {
      font-size: 2.5rem;
    }

    .board-row > span {
      padding: 6px 8px;
      font-size: 0.85rem;
    }

    .col-dest {
      width: 35%;
    }

    .col-status {
      width: 30%;
    }
  }

  @media (max-width: 400px) {
    .train-platform {
      flex-basis: 100%;
      margin-left: 32px;
    }

    .card-padding {
      --card-padding: 12px;
    }
  }

  /* ==================== COMPACT HEIGHT MODE ==================== */

  ha-card.compact-height .train-row {
    padding: 8px var(--card-padding);
  }

  ha-card.compact-height .train-main {
    margin-bottom: 0;
  }

  ha-card.compact-height .train-details {
    display: none;
  }

  ha-card.compact-height .card-content.next-only {
    min-height: 150px;
    padding: 12px;
  }

  ha-card.compact-height .next-train-time {
    font-size: 2rem;
    margin: 8px 0;
  }

  /* ==================== CUSTOM THEME OVERRIDES ==================== */

  :host([theme="light"]) ha-card {
    background: #ffffff;
    color: #212121;
  }

  :host([theme="dark"]) ha-card {
    background: #1e1e1e;
    color: #ffffff;
  }

  :host([theme="dark"]) .card-header,
  :host([theme="dark"]) .card-footer {
    background: #2c2c2c;
    border-color: #404040;
  }

  :host([theme="dark"]) .train-row:hover,
  :host([theme="dark"]) .train-row-compact:hover {
    background-color: #2c2c2c;
  }

  :host([theme="dark"]) .train-row,
  :host([theme="dark"]) .train-row-compact {
    border-color: #404040;
  }

  :host([theme="dark"]) .next-train-calling {
    background: #2c2c2c;
  }

  /* ==================== FONT SIZE VARIANTS ==================== */

  :host([font-size="small"]) .time {
    font-size: 1.2rem;
  }

  :host([font-size="small"]) .next-train-time {
    font-size: 2.5rem;
  }

  :host([font-size="large"]) .time {
    font-size: 1.8rem;
  }

  :host([font-size="large"]) .next-train-time {
    font-size: 3.5rem;
  }

  :host([font-size="large"]) .train-details,
  :host([font-size="large"]) .operator {
    font-size: 1rem;
  }

  /* ==================== NO ANIMATIONS MODE ==================== */

  :host([no-animations]) .train-row,
  :host([no-animations]) .train-row-compact,
  :host([no-animations]) * {
    animation: none !important;
    transition: none !important;
  }


`;function lt(t){if(!t||"unknown"===t||"Unknown"===t)return"—";const e=String(t).trim();if(!e)return"—";const i=e.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);if(i)return`${i[1].padStart(2,"0")}:${i[2]}`;try{const t=new Date(e);return isNaN(t.getTime())?(console.warn("formatTime: unparseable value:",e),"—"):t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}catch(t){return console.warn("formatTime: could not parse time value:",e,t),"—"}}function dt(t,e){if(!t||!e)return null;const i=new Date(t),s=new Date(e);if(!isNaN(i.getTime())&&!isNaN(s.getTime())){const t=Math.round((s-i)/6e4);return t>0?t:null}const r=String(t).match(/(\d{1,2}):(\d{2})/),n=String(e).match(/(\d{1,2}):(\d{2})/);if(r&&n){let t=60*parseInt(r[1],10)+parseInt(r[2],10),e=60*parseInt(n[1],10)+parseInt(n[2],10);e<t&&(e+=1440);const i=e-t;return i>0?i:null}return null}function ht(t){return!(!t||!t.expected_departure)&&(t.expected_departure!==t.scheduled_departure&&!/\d{1,2}:\d{2}/.test(t.expected_departure))}function ut(t){return t?t.is_cancelled?"cancelled":t.is_no_service?"no-service":t.delay_minutes>=10?"major-delay":t.delay_minutes>0||ht(t)?"minor-delay":"on-time":"unknown"}function pt(t,e=!0){return e&&t?t.is_cancelled?"❌":t.is_no_service?"⊗":t.delay_minutes>=10?"🔴":t.delay_minutes>0||ht(t)?"⚠️":"✓":""}function _t(t){return t?t.is_cancelled?"Cancelled":t.is_no_service?"No service":t.delay_minutes>0?`Delayed ${t.delay_minutes} min${1!==t.delay_minutes?"s":""}`:ht(t)?"Delayed":"On time":"Unknown"}customElements.define("my-rail-commute-card-editor",class extends at{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return n`
      .card-config {
        padding: 16px;
      }

      .option {
        margin-bottom: 16px;
      }

      .option-label {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .section-header {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 24px 0 12px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .section-header:first-child {
        margin-top: 0;
      }

      ha-textfield,
      ha-select {
        width: 100%;
      }

      .switches {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      ha-formfield {
        display: block;
        padding: 8px 0;
      }

      .info {
        font-size: 0.9rem;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
    `}setConfig(t){this._config={...t},this.requestUpdate()}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}_filterSummaryEntities(t){const e=this._hass.states[t.entity_id];if("my_rail_commute"===e?.attributes?.integration)return!0;const i=t.entity_id.toLowerCase();return i.endsWith("_summary")||i.includes("commute")||i.includes("rail")||i.includes("train")}render(){return this._hass&&this._config?B`
      <div class="card-config">
        <!-- Basic Configuration -->
        <div class="section-header">Basic Configuration</div>

        <div class="option">
          <ha-entity-picker
            label="Summary Entity (Required)"
            .hass=${this._hass}
            .value=${this._config.entity||""}
            .includeDomains=${["sensor"]}
            .entityFilter=${this._filterSummaryEntities.bind(this)}
            @value-changed=${this._entityChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="info">Select your My Rail Commute summary sensor (from my_rail_commute integration)</div>
        </div>

        <div class="option">
          <ha-textfield
            label="Title (Optional)"
            .value=${this._config.title||""}
            @input=${this._titleChanged}
          ></ha-textfield>
        </div>

        <!-- View & Display -->
        <div class="section-header">View & Display</div>

        <div class="option">
          <ha-select
            label="View Mode"
            .value=${this._config.view||"full"}
            @value-changed=${this._viewChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <ha-list-item value="full">Full View</ha-list-item>
            <ha-list-item value="compact">Compact View</ha-list-item>
            <ha-list-item value="next-only">Next Train Only</ha-list-item>
            <ha-list-item value="board">Departure Board</ha-list-item>
          </ha-select>
          <div class="info">Choose how to display train information</div>
        </div>

        <div class="option">
          <ha-select
            label="Theme"
            .value=${this._config.theme||"auto"}
            @value-changed=${this._themeChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <ha-list-item value="auto">Auto (Follow HA Theme)</ha-list-item>
            <ha-list-item value="light">Light</ha-list-item>
            <ha-list-item value="dark">Dark</ha-list-item>
          </ha-select>
        </div>

        <div class="option">
          <ha-select
            label="Font Size"
            .value=${this._config.font_size||"medium"}
            @value-changed=${this._fontSizeChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <ha-list-item value="small">Small</ha-list-item>
            <ha-list-item value="medium">Medium</ha-list-item>
            <ha-list-item value="large">Large</ha-list-item>
          </ha-select>
        </div>

        <!-- Display Options -->
        <div class="section-header">Display Options</div>

        <div class="switches">
          <ha-formfield label="Show Card Header">
            <ha-switch
              .checked=${!1!==this._config.show_header}
              @change=${this._toggleChanged("show_header")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Route Information">
            <ha-switch
              .checked=${!1!==this._config.show_route}
              @change=${this._toggleChanged("show_route")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Last Updated Time">
            <ha-switch
              .checked=${!0===this._config.show_last_updated}
              @change=${this._toggleChanged("show_last_updated")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Platform Numbers">
            <ha-switch
              .checked=${!1!==this._config.show_platform}
              @change=${this._toggleChanged("show_platform")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Train Operator">
            <ha-switch
              .checked=${!1!==this._config.show_operator}
              @change=${this._toggleChanged("show_operator")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Calling Points">
            <ha-switch
              .checked=${!0===this._config.show_calling_points}
              @change=${this._toggleChanged("show_calling_points")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Delay Reasons">
            <ha-switch
              .checked=${!1!==this._config.show_delay_reason}
              @change=${this._toggleChanged("show_delay_reason")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Journey Time">
            <ha-switch
              .checked=${!0===this._config.show_journey_time}
              @change=${this._toggleChanged("show_journey_time")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Status Icons">
            <ha-switch
              .checked=${!1!==this._config.status_icons}
              @change=${this._toggleChanged("status_icons")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Compact Height Mode">
            <ha-switch
              .checked=${!0===this._config.compact_height}
              @change=${this._toggleChanged("compact_height")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Animations">
            <ha-switch
              .checked=${!1!==this._config.show_animations}
              @change=${this._toggleChanged("show_animations")}
            ></ha-switch>
          </ha-formfield>

        </div>

        <!-- Filtering Options -->
        <div class="section-header">Filtering Options</div>

        <div class="switches">
          <ha-formfield label="Hide On-Time Trains">
            <ha-switch
              .checked=${!0===this._config.hide_on_time_trains}
              @change=${this._toggleChanged("hide_on_time_trains")}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-textfield
            label="Minimum Delay to Show (minutes)"
            type="number"
            min="0"
            .value=${this._config.min_delay_to_show||0}
            @input=${this._minDelayChanged}
          ></ha-textfield>
          <div class="info">Only show trains delayed by at least this many minutes (0 = show all)</div>
        </div>

        <div class="option">
          <ha-textfield
            label="Max Calling Points to Display"
            type="number"
            min="1"
            max="20"
            .value=${this._config.max_calling_points||3}
            @input=${this._maxCallingPointsChanged}
          ></ha-textfield>
        </div>

        <!-- Advanced Options -->
        <div class="section-header">Advanced Options</div>

        <div class="option">
          <ha-entity-picker
            label="Status Sensor (Optional)"
            .hass=${this._hass}
            .value=${this._config.status_entity||""}
            .includeDomains=${["sensor"]}
            @value-changed=${this._statusEntityChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="info">Sensor whose state drives the disruption banner. Expected states: Normal, Minor Delays, Major Delays, Severe Disruption, Critical. Auto-discovered from the summary entity name if not set.</div>
        </div>

        <div class="switches">
          <ha-formfield label="Only Show When Disrupted">
            <ha-switch
              .checked=${!0===this._config.only_show_disrupted}
              @change=${this._toggleChanged("only_show_disrupted")}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-textfield
            label="Auto Refresh Interval (seconds)"
            type="number"
            min="10"
            max="600"
            .value=${this._config.refresh_interval||60}
            @input=${this._refreshIntervalChanged}
          ></ha-textfield>
        </div>

        <!-- Tap Actions -->
        <div class="section-header">Interaction</div>

        <div class="option">
          <ha-select
            label="Tap Action"
            .value=${this._config.tap_action?.action||"more-info"}
            @value-changed=${this._tapActionChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <ha-list-item value="more-info">Show More Info</ha-list-item>
            <ha-list-item value="url">Open URL</ha-list-item>
            <ha-list-item value="navigate">Navigate</ha-list-item>
            <ha-list-item value="none">None</ha-list-item>
          </ha-select>
        </div>

        ${"url"===this._config.tap_action?.action?B`
          <div class="option">
            <ha-textfield
              label="URL Path"
              .value=${this._config.tap_action?.url_path||""}
              @input=${this._urlPathChanged}
            ></ha-textfield>
          </div>
        `:""}

        ${"navigate"===this._config.tap_action?.action?B`
          <div class="option">
            <ha-textfield
              label="Navigation Path"
              .value=${this._config.tap_action?.navigation_path||""}
              @input=${this._navigationPathChanged}
            ></ha-textfield>
          </div>
        `:""}

        <div class="option">
          <ha-select
            label="Hold Action"
            .value=${this._config.hold_action?.action||"refresh"}
            @value-changed=${this._holdActionChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <ha-list-item value="refresh">Refresh Data</ha-list-item>
            <ha-list-item value="more-info">Show More Info</ha-list-item>
            <ha-list-item value="none">None</ha-list-item>
          </ha-select>
        </div>
      </div>
    `:B``}_entityChanged(t){this._config&&this._hass&&(this._config={...this._config,entity:t.detail.value},this._fireConfigChanged())}_titleChanged(t){this._config&&this._hass&&(this._config={...this._config,title:t.target.value},this._fireConfigChanged())}_viewChanged(t){this._config&&this._hass&&(this._config={...this._config,view:t.detail.value},this._fireConfigChanged())}_themeChanged(t){this._config&&this._hass&&(this._config={...this._config,theme:t.detail.value},this._fireConfigChanged())}_fontSizeChanged(t){this._config&&this._hass&&(this._config={...this._config,font_size:t.detail.value},this._fireConfigChanged())}_toggleChanged(t){return e=>{this._config&&this._hass&&(this._config={...this._config,[t]:e.target.checked},this._fireConfigChanged())}}_minDelayChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value,10)||0;this._config={...this._config,min_delay_to_show:e},this._fireConfigChanged()}_maxCallingPointsChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value,10)||3;this._config={...this._config,max_calling_points:e},this._fireConfigChanged()}_statusEntityChanged(t){this._config&&this._hass&&(this._config={...this._config,status_entity:t.detail.value},this._fireConfigChanged())}_refreshIntervalChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value,10)||60;this._config={...this._config,refresh_interval:e},this._fireConfigChanged()}_tapActionChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{action:t.detail.value}},this._fireConfigChanged())}_urlPathChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{...this._config.tap_action,url_path:t.target.value}},this._fireConfigChanged())}_navigationPathChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{...this._config.tap_action,navigation_path:t.target.value}},this._fireConfigChanged())}_holdActionChanged(t){this._config&&this._hass&&(this._config={...this._config,hold_action:{action:t.detail.value}},this._fireConfigChanged())}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}}),console.info("%c MY-RAIL-COMMUTE-CARD \n%c Version 1.0.0 ","color: cyan; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");class mt extends at{static get properties(){return{hass:{type:Object},config:{type:Object},_trains:{type:Array},_origin:{type:String},_destination:{type:String},_lastUpdated:{type:String},_hasDisruption:{type:Boolean},_disruptionSeverity:{type:String},_disruptionMessage:{type:String},_resolvedStatusEntityId:{type:String},_loading:{type:Boolean},_entityNotFound:{type:Boolean},_returnEntityId:{type:String},_showReturn:{type:Boolean}}}static get styles(){return ct}constructor(){super(),this._trains=[],this._origin="",this._destination="",this._lastUpdated="",this._hasDisruption=!1,this._disruptionSeverity="",this._disruptionMessage="",this._resolvedStatusEntityId="",this._loading=!0,this._entityNotFound=!1,this._toastTimer=null,this._returnEntityId=null,this._showReturn=!1,this._returnEntityCacheKey=null}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity&&""!==t.entity)throw new Error("Please select a rail commute summary sensor");this.config={view:"full",theme:"auto",show_header:!0,show_route:!0,show_last_updated:!1,show_platform:!0,show_operator:!0,show_calling_points:!1,show_delay_reason:!0,show_journey_time:!1,show_service_type:!1,max_calling_points:3,hide_on_time_trains:!1,only_show_disrupted:!1,min_delay_to_show:0,auto_refresh:!0,refresh_interval:60,card_style:"departure-board",font_size:"medium",compact_height:!1,show_animations:!0,status_icons:!0,...t},t.colors&&(t.colors.on_time&&this.style.setProperty("--custom-on-time-color",t.colors.on_time),t.colors.minor_delay&&this.style.setProperty("--custom-minor-delay-color",t.colors.minor_delay),t.colors.major_delay&&this.style.setProperty("--custom-major-delay-color",t.colors.major_delay),t.colors.cancelled&&this.style.setProperty("--custom-cancelled-color",t.colors.cancelled)),t.theme&&"auto"!==t.theme&&this.setAttribute("theme",t.theme),t.font_size&&this.setAttribute("font-size",t.font_size),!1===t.show_animations&&this.setAttribute("no-animations","")}set hass(t){if(this._hass=t,!this.config.entity)return this._loading=!1,void(this._trains=[]);const e=t.states[this.config.entity];if(!e)return console.error("my-rail-commute-card: entity not found:",this.config.entity),this._entityNotFound=!0,this._loading=!1,void(this._trains=[]);this._entityNotFound=!1;const i=e.attributes.origin_name||e.attributes.origin||e.attributes.from_station||"",s=e.attributes.destination_name||e.attributes.destination||e.attributes.to_station||"",r=`${i}|${s}`;r!==this._returnEntityCacheKey?(this._returnEntityCacheKey=r,this._returnEntityId=this._findReturnEntity(t,i,s)):this._returnEntityId&&!t.states[this._returnEntityId]&&(this._returnEntityCacheKey=null,this._returnEntityId=this._findReturnEntity(t,i,s)),this._showReturn&&!this._returnEntityId&&(this._showReturn=!1);const n=this._showReturn&&this._returnEntityId?this._returnEntityId:this.config.entity,a=t.states[n];if(!a)return this._loading=!1,void(this._trains=[]);if(a.attributes.all_trains&&a.attributes.all_trains.length>0){const t=n.replace("sensor.","").replace("_summary","").replace("_commute_summary","");this._trains=a.attributes.all_trains.map((e,i)=>{const s=null!=e.train_number&&""!==e.train_number?String(e.train_number).toLowerCase().replace(/[^a-z0-9]/g,"_"):String(i+1),r=e.scheduled_departure,n=e.expected_departure,a=e.scheduled_arrival,o=e.estimated_arrival,c=/\d{1,2}:\d{2}/.test(String(n||"")),l=c?n:r,d=!c&&!!n&&n!==r&&!/^(on[\s-]?time|right\s*time)$/i.test(String(n||"").trim()),h=/\d{1,2}:\d{2}/.test(String(o||""))?o:a;return{...e,journey_duration:e.journey_duration||dt(l,h),journey_time_approx:e.journey_time_approx||d,train_id:`sensor.${t}_train_${s}`}})}else this._trains=this._getTrainsFromIndividualSensors(t,n);var o;let c;if(this._origin=this._showReturn?s:i,this._destination=this._showReturn?i:s,this._lastUpdated=a.attributes.last_updated||a.last_updated||a.last_changed||"",this._trains&&this._trains.length>0&&(this._trains=(o=this._trains)&&0!==o.length?[...o].sort((t,e)=>{const i=new Date(t.scheduled_departure).getTime(),s=new Date(e.scheduled_departure).getTime(),r=!isNaN(i),n=!isNaN(s);return r||n?r?n?i-s:-1:1:0}):[]),this._hasDisruption=!1,this._disruptionSeverity="",this._disruptionMessage="",this._resolvedStatusEntityId="",this._showReturn&&this._returnEntityId){const e=`sensor.${this._returnEntityId.replace("sensor.","").replace("_summary","").replace("_commute_summary","")}_status`;t.states[e]&&(c=e)}else if(c=this.config.status_entity,!c){const e=`sensor.${this.config.entity.replace("sensor.","").replace("_summary","").replace("_commute_summary","")}_status`;t.states[e]&&(c=e)}if(c){this._resolvedStatusEntityId=c;const e=t.states[c];if(e){const t=(e.state||"").toLowerCase().trim();"normal"!==t&&"unknown"!==t&&"unavailable"!==t&&""!==t&&(this._hasDisruption=!0,t.includes("critical")?this._disruptionSeverity="critical":t.includes("severe")?this._disruptionSeverity="severe":t.includes("major")?this._disruptionSeverity="major":this._disruptionSeverity="minor",this._disruptionMessage=e.attributes.message||e.attributes.reason||e.attributes.disruption_message||"")}}this._trains&&this._trains.length>0&&(this._trains=function(t,e){if(!t||0===t.length)return[];let i=[...t];return e.hide_on_time_trains&&(i=i.filter(t=>t.is_cancelled||t.is_no_service||t.delay_minutes>0||ht(t))),e.min_delay_to_show>0&&(i=i.filter(t=>t.is_cancelled||t.is_no_service||ht(t)||t.delay_minutes>=e.min_delay_to_show)),i}(this._trains,this.config)),this._loading=!1,this.requestUpdate()}_findReturnEntity(t,e,i){if(!e||!i)return null;const s=e.toLowerCase().trim(),r=i.toLowerCase().trim();for(const[e,i]of Object.entries(t.states)){if(e===this.config.entity)continue;if(!i.attributes)continue;const t=i.attributes;if(!(t.all_trains||t.origin_name||t.origin||t.from_station))continue;const n=(t.origin_name||t.origin||t.from_station||"").toLowerCase().trim(),a=(t.destination_name||t.destination||t.to_station||"").toLowerCase().trim();if(n&&a&&(n===r&&a===s))return e}return null}_toggleReturn(){this._showReturn=!this._showReturn,this._hass&&(this.hass=this._hass)}_getTrainsFromIndividualSensors(t,e){const i=(e||this.config.entity).replace("sensor.","").replace("_summary","").replace("_commute_summary",""),s=[`sensor.${i}_train_`,`sensor.${i}_train`,`sensor.${i.replace(/_/g,"-")}_train_`,`sensor.${i.replace(/_/g,"")}_train_`];let r=[];for(const e of s){const i=Object.keys(t.states).filter(t=>t.startsWith(e));if(i.length>0){r=i;break}}r.sort((t,e)=>parseInt(t.match(/train[_-]?(\d+)$/i)?.[1]||"0",10)-parseInt(e.match(/train[_-]?(\d+)$/i)?.[1]||"0",10));const n=r.map(e=>{const i=t.states[e];if(!i)return console.warn(`my-rail-commute-card: train sensor not found: ${e}`),null;let s=i.attributes.calling_points||i.attributes.stops||i.attributes.calling_at||i.attributes["Calling at"]||[];"string"==typeof s&&(s=s.split(",").map(t=>t.trim()).filter(t=>t));const r=i.attributes.scheduled_departure||i.attributes.scheduled||i.attributes.departure||i.attributes.departure_time||i.attributes.std||i.attributes.aimed_departure_time||i.attributes["Scheduled Departure"]||i.state,n=i.attributes.expected_departure||i.attributes.expected||i.attributes.estimated||i.attributes.estimated_departure||i.attributes.etd||i.attributes.expected_arrival||i.attributes["Expected Departure"]||r,a=i.attributes.scheduled_arrival||i.attributes.sta||i.attributes["Scheduled Arrival"]||null,o=i.attributes.estimated_arrival||i.attributes.eta||i.attributes["Estimated Arrival"]||a,c=/\d{1,2}:\d{2}/.test(String(n)),l=c?n:r,d=!c&&!!n&&n!==r&&!/^(on[\s-]?time|right\s*time)$/i.test(String(n).trim()),h=/\d{1,2}:\d{2}/.test(String(o))?o:a;return{train_id:e,scheduled_departure:r,expected_departure:n,platform:i.attributes.platform||i.attributes.Platform||"",operator:i.attributes.operator||i.attributes.service_operator||i.attributes.Operator||"",is_cancelled:i.attributes.is_cancelled||i.attributes.cancelled||"Cancelled"===i.state||"Canceled"===i.state||!1,is_no_service:i.attributes.is_no_service||i.attributes.no_service||"No service"===i.state||"No Service"===i.state||!1,delay_minutes:parseInt(i.attributes.delay_minutes||i.attributes.delay||i.attributes.minutes_late||i.attributes["Delay minutes"]||"0",10),delay_reason:i.attributes.delay_reason||i.attributes.reason||i.attributes["Delay reason"]||"",calling_points:s,journey_duration:i.attributes.journey_duration||i.attributes.duration||dt(l,h),journey_time_approx:d,service_type:i.attributes.service_type||i.attributes.type||""}}).filter(t=>null!==t);return n}getCardSize(){const t=this.config.view||"full",e=this._trains?.length||0;switch(t){case"compact":return 1+Math.ceil(.5*e);case"next-only":return 3;default:return 2+e}}render(){if(!this.config.entity)return this._renderEmpty("No entity selected","Please select a rail commute summary sensor in the card configuration");if(this._loading)return this._renderLoading();if(t=this._hasDisruption,this.config.only_show_disrupted&&!t)return this._renderEmpty("No disruption detected","Trains will appear when there is disruption");var t;if(this._entityNotFound)return this._renderEmpty("Entity not found",`Cannot find entity: ${this.config.entity}`);if(!this._trains||0===this._trains.length)return this._renderEmpty();switch(this.config.view||"full"){case"compact":return this._renderCompact();case"next-only":return this._renderNextOnly();case"board":return this._renderBoard();default:return this._renderFull()}}_renderHeader(){const t=!1!==this.config.show_header,e=!1!==this.config.show_route;if(!t)return"";const i=this.config.title||"Rail Commute";return B`
      <div class="card-header">
        <div class="header-content">
          <ha-icon icon="mdi:train"></ha-icon>
          <span class="header-title">${i}</span>
          ${this._returnEntityId?B`
            <button
              class="return-toggle ${this._showReturn?"active":""}"
              @click="${this._toggleReturn}"
              title="${this._showReturn?"Show outbound journey":"Show return journey"}"
            >
              <ha-icon icon="mdi:swap-horizontal"></ha-icon>
            </button>
          `:""}
        </div>
        ${e&&this._origin&&this._destination?B`
          <div class="route">
            ${this._origin} → ${this._destination}
          </div>
        `:""}
      </div>
    `}_renderDisruptionBanner(){if(!this._hasDisruption)return"";const t={minor:{cls:"disruption-minor",label:"Minor Delays",icon:"mdi:alert"},major:{cls:"disruption-major",label:"Major Delays",icon:"mdi:alert"},severe:{cls:"disruption-severe",label:"Severe Disruption",icon:"mdi:alert-circle"},critical:{cls:"disruption-critical",label:"Critical Disruption",icon:"mdi:alert-octagon"}},{cls:e,label:i,icon:s}=t[this._disruptionSeverity]||t.minor,r=!!this._resolvedStatusEntityId;return B`
      <div
        class="disruption-banner ${e} ${r?"disruption-clickable":""}"
        @click="${r?()=>this._showDisruptionMoreInfo():null}"
        role="${r?"button":"alert"}"
      >
        <ha-icon icon="${s}" class="disruption-icon"></ha-icon>
        <div class="disruption-content">
          <span class="disruption-label">${i} on this route</span>
          ${this._disruptionMessage?B`
            <span class="disruption-message">${this._disruptionMessage}</span>
          `:""}
        </div>
        ${r?B`
          <ha-icon icon="mdi:chevron-right" class="disruption-chevron"></ha-icon>
        `:""}
      </div>
    `}_showDisruptionMoreInfo(){if(!this._resolvedStatusEntityId)return;const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:this._resolvedStatusEntityId},this.dispatchEvent(t)}_renderFooter(){return!1===this.config.show_last_updated?"":B`
      <div class="card-footer">
        <span class="last-updated">
          Last updated: ${function(t){if(!t)return"Unknown";try{const e=new Date,i=new Date(t);if(isNaN(i.getTime()))return console.warn("getRelativeTime: invalid timestamp:",t),"Unknown";const s=Math.floor((e-i)/1e3);if(s<0)return"Just now";if(s<60)return"Just now";if(s<3600){const t=Math.floor(s/60);return`${t} minute${1!==t?"s":""} ago`}if(s<86400){const t=Math.floor(s/3600);return`${t} hour${1!==t?"s":""} ago`}const r=Math.floor(s/86400);return`${r} day${1!==r?"s":""} ago`}catch(t){return console.warn("getRelativeTime: error calculating relative time:",t),"Unknown"}}(this._lastUpdated)}
        </span>
      </div>
    `}_renderFull(){const t=this.config.compact_height?"compact-height":"";return B`
      <ha-card class="${t}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content">
          ${this._trains.map(t=>this._renderTrainRow(t))}
        </div>

        ${this._renderFooter()}
      </ha-card>
    `}_renderTrainRow(t){const e=ut(t),i=!1!==this.config.status_icons?pt(t):"",s=!1!==this.config.show_platform,r=!1!==this.config.show_operator,n=!1!==this.config.show_delay_reason,a=!0===this.config.show_calling_points,o=!0===this.config.show_journey_time;return B`
      <div
        class="train-row ${e}"
        @click="${()=>this._handleTap(t)}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._handleTouchEnd}"
        @touchmove="${this._handleTouchMove}"
      >
        <div class="train-main">
          <div class="train-time">
            <ha-icon icon="${function(t){return t?t.is_cancelled?"mdi:close-circle":t.delay_minutes>0?"mdi:train-variant":"mdi:train":"mdi:train"}(t)}"></ha-icon>
            <span class="time">${lt(t.scheduled_departure)}</span>
            <span class="expected-time">${t.expected_departure&&t.expected_departure!==t.scheduled_departure?lt(t.expected_departure):""}</span>
          </div>

          ${s?B`
            <div class="train-platform">
              Platform ${t.platform||"—"}
            </div>
          `:""}

          <div class="train-status">
            ${i}
            ${_t(t)}
          </div>
        </div>

        <div class="train-details">
          ${r&&t.operator?B`
            <span class="operator">${t.operator}</span>
          `:""}

          ${n&&t.delay_reason?B`
            <div class="delay-reason">
              → ${t.delay_reason}
            </div>
          `:""}

          ${a&&t.calling_points&&t.calling_points.length>0?B`
            <div class="calling-points">
              Calling at: ${function(t,e=3){if(!t||0===t.length)return"";const i=t.slice(0,e),s=t.length-e;let r=i.join(", ");return s>0&&(r+=` +${s} more`),r}(t.calling_points,this.config.max_calling_points)}
            </div>
          `:""}

          ${o&&t.journey_duration?B`
            <div class="journey-time">
              Journey time: ${t.journey_duration} mins${t.journey_time_approx?"*":""}
            </div>
          `:""}
        </div>
      </div>
    `}_renderCompact(){return B`
      <ha-card class="${this.config.compact_height?"compact-height":""}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content compact">
          ${this._trains.map(t=>B`
              <div
                class="train-row-compact ${ut(t)}"
                @click="${()=>this._handleTap(t)}"
                @touchstart="${this._handleTouchStart}"
                @touchend="${this._handleTouchEnd}"
                @touchmove="${this._handleTouchMove}"
              >
                <span class="time">${lt(t.scheduled_departure)}</span>
                <span class="platform">Plat ${t.platform||"—"}</span>
                <span class="status">
                  ${!1!==this.config.status_icons?B`<span class="status-icon">${pt(t)}</span>`:""}
                  ${t.delay_minutes>0?B`<span class="delay-text">+${t.delay_minutes}m</span>`:""}
                </span>
              </div>
            `)}
        </div>

        ${this._renderFooter()}
      </ha-card>
    `}_renderNextOnly(){const t=this._trains[0];if(!t)return this._renderEmpty();const e=ut(t),i=!1!==this.config.status_icons?pt(t):"";return B`
      <ha-card class="${this.config.compact_height?"compact-height":""}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content next-only">
          <div class="next-train-time">
            ${lt(t.scheduled_departure)}
          </div>

          ${t.expected_departure&&t.expected_departure!==t.scheduled_departure?B`
            <div class="next-train-expected">
              Expected: ${lt(t.expected_departure)}
            </div>
          `:""}

          <div class="next-train-platform">
            Platform ${t.platform||"—"}
          </div>

          <div class="next-train-status ${e}">
            ${i} ${_t(t)}
          </div>

          ${t.operator?B`
            <div class="next-train-operator">
              ${t.operator}
            </div>
          `:""}

          ${t.calling_points&&t.calling_points.length>0?B`
            <div class="next-train-calling">
              <strong>Calling at:</strong><br>
              ${t.calling_points.join(", ")}
            </div>
          `:""}

        </div>

        ${this._renderFooter()}
      </ha-card>
    `}_renderBoard(){return B`
      <ha-card class="departure-board">
        <div class="board-header">
          DEPARTURES  ${this._origin||""}
        </div>
        ${this._renderDisruptionBanner()}

        <div class="board-content">
          <div class="board-table">
            <div class="board-row board-header-row">
              <span class="col-time">Time</span>
              <span class="col-dest">Dest</span>
              <span class="col-plat">Plat</span>
              <span class="col-status">Status</span>
            </div>

            ${this._trains.map(t=>B`
                <div
                  class="board-row ${ut(t)}"
                  @click="${()=>this._handleTap(t)}"
                  @touchstart="${this._handleTouchStart}"
                  @touchend="${this._handleTouchEnd}"
                  @touchmove="${this._handleTouchMove}"
                >
                  <span class="col-time">
                    ${lt(t.scheduled_departure)}
                  </span>
                  <span class="col-dest">
                    ${function(t){if(!t)return"";if(t.length<=12)return t;const e={London:"Ldn",Street:"St",Bridge:"Bdg",Junction:"Jn",Central:"Cen",International:"Intl",Station:"Stn",Road:"Rd",Cross:"X",Park:"Pk"};let i=t;for(const[t,s]of Object.entries(e))i=i.replace(new RegExp(t,"g"),s);return i.length>12&&(i=i.substring(0,11)+"…"),i}(this._destination||"")}
                  </span>
                  <span class="col-plat">
                    ${t.platform||"—"}
                  </span>
                  <span class="col-status">
                    ${function(t){return t?t.is_cancelled?"Cancelled":t.is_no_service?"No service":t.expected_departure&&t.expected_departure!==t.scheduled_departure?`Exp ${lt(t.expected_departure)}`:"On time":"Unknown"}(t)}
                  </span>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}_renderEmpty(t="No trains found",e="Check your time window or station codes"){return B`
      <ha-card>
        ${this._renderHeader()}

        <div class="card-content empty">
          <ha-icon icon="mdi:train-variant" class="empty-icon"></ha-icon>
          <div class="empty-message">${t}</div>
          <div class="empty-submessage">${e}</div>
        </div>
      </ha-card>
    `}_renderLoading(){return B`
      <ha-card>
        ${this._renderHeader()}

        <div class="card-content loading">
          <div class="loading-spinner"></div>
          <div class="loading-message">Loading train information...</div>
        </div>
      </ha-card>
    `}_handleTap(t){switch(this.config.tap_action?.action||"more-info"){case"more-info":this._showMoreInfo(t);break;case"url":this._openUrl(t);break;case"navigate":this._navigate(t)}}_showMoreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0}),i=t?.train_id||this.config.entity;e.detail={entityId:i},this.dispatchEvent(e)}_openUrl(t){const e=this.config.tap_action?.url_path;if(e)window.open(e,"_blank");else{const t=`https://www.nationalrail.co.uk/journey-planner/?from=${this._origin||""}&to=${this._destination||""}`;window.open(t,"_blank")}}_navigate(t){const e=this.config.tap_action?.navigation_path;if(e){window.history.pushState(null,"",e);const t=new Event("location-changed",{bubbles:!0,composed:!0});this.dispatchEvent(t)}}_handleTouchStart(t){const e=t.currentTarget;e._pressTimer=setTimeout(()=>{e._pressTimer=null,this._handleHold()},500)}_handleTouchEnd(t){const e=t.currentTarget;e._pressTimer&&(clearTimeout(e._pressTimer),e._pressTimer=null)}_handleTouchMove(t){const e=t.currentTarget;e._pressTimer&&(clearTimeout(e._pressTimer),e._pressTimer=null)}_handleHold(){"refresh"===(this.config.hold_action?.action||"refresh")&&this._refreshData()}_refreshData(){this._hass&&(this._hass.callService("homeassistant","update_entity",{entity_id:this.config.entity}),this._showRefreshFeedback())}_showRefreshFeedback(){const t=document.createElement("div");t.className="refresh-toast",t.textContent="Refreshing...",this.shadowRoot.appendChild(t),this._toastTimer=setTimeout(()=>{this._toastTimer=null,t.isConnected&&t.remove()},2e3)}disconnectedCallback(){super.disconnectedCallback(),this._toastTimer&&(clearTimeout(this._toastTimer),this._toastTimer=null)}static getConfigElement(){return document.createElement("my-rail-commute-card-editor")}static getStubConfig(){return{entity:"",view:"full",show_platform:!0,show_operator:!0,show_calling_points:!1}}}customElements.define("my-rail-commute-card",mt),window.customCards=window.customCards||[],window.customCards.push({type:"my-rail-commute-card",name:"My Rail Commute Card",description:"Display My Rail Commute departure information in a beautiful station-board interface",preview:!0,documentationURL:"https://github.com/adamf83/lovelace-my-rail-commute-card"});export{mt as default};
