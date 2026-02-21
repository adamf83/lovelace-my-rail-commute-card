/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,m=u.trustedTypes,_=m?m.emptyScript:"",g=u.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,g?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,C=w.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,k="?"+E,T=`<${k}>`,O=document,M=()=>O.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,R="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,U=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,q=O.createTreeWalker(O,129);function J(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===z?"!--"===c[1]?n=N:void 0!==c[1]?n=U:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=o??z,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?I:'"'===c[3]?j:H):n===j||n===H?n=I:n===N||n===U?n=z:(n=I,o=void 0);const h=n===I&&t[e+1].startsWith("/>")?" ":"";r+=n===z?i+T:l>=0?(s.push(a),i.slice(0,l)+S+i.slice(l)+E+h):i+E+(-2===l?e:h)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=X(t,e);if(this.el=G.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Q}),s.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),q.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===k)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)a.push({type:7,index:o}),t+=E.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===F)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=P(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);q.currentNode=s;let o=q.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new K(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=q.nextNode(),r++)}return q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),P(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new G(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new K(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!P(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),r||=!P(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends Q{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(G,K),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new K(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const ct=r`
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
`;function lt(t){if(!t||"unknown"===t||"Unknown"===t)return"—";const e=String(t).trim();if(!e)return"—";const i=e.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);if(i)return`${i[1].padStart(2,"0")}:${i[2]}`;try{const t=new Date(e);return isNaN(t.getTime())?e:t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}catch(t){return e}}function dt(t){return t?t.is_cancelled?"cancelled":t.is_no_service?"no-service":t.delay_minutes>=10?"major-delay":t.delay_minutes>0?"minor-delay":"on-time":"unknown"}function ht(t,e=!0){return e&&t?t.is_cancelled?"❌":t.is_no_service?"⊗":t.delay_minutes>=10?"🔴":t.delay_minutes>0?"⚠️":"✓":""}function pt(t){return t?t.is_cancelled?"Cancelled":t.is_no_service?"No service":t.delay_minutes>0?`Delayed ${t.delay_minutes} min${1!==t.delay_minutes?"s":""}`:"On time":"Unknown"}customElements.define("my-rail-commute-card-editor",class extends nt{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return r`
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
            @selected=${this._viewChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="full">Full View</mwc-list-item>
            <mwc-list-item value="compact">Compact View</mwc-list-item>
            <mwc-list-item value="next-only">Next Train Only</mwc-list-item>
            <mwc-list-item value="board">Departure Board</mwc-list-item>
          </ha-select>
          <div class="info">Choose how to display train information</div>
        </div>

        <div class="option">
          <ha-select
            label="Theme"
            .value=${this._config.theme||"auto"}
            @selected=${this._themeChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="auto">Auto (Follow HA Theme)</mwc-list-item>
            <mwc-list-item value="light">Light</mwc-list-item>
            <mwc-list-item value="dark">Dark</mwc-list-item>
          </ha-select>
        </div>

        <div class="option">
          <ha-select
            label="Font Size"
            .value=${this._config.font_size||"medium"}
            @selected=${this._fontSizeChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="small">Small</mwc-list-item>
            <mwc-list-item value="medium">Medium</mwc-list-item>
            <mwc-list-item value="large">Large</mwc-list-item>
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
            label="Disruption Sensor (Optional)"
            .hass=${this._hass}
            .value=${this._config.disruption_entity||""}
            .includeDomains=${["binary_sensor"]}
            @value-changed=${this._disruptionEntityChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="info">Binary sensor for severe disruption detection</div>
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
            @selected=${this._tapActionChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="url">Open URL</mwc-list-item>
            <mwc-list-item value="navigate">Navigate</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
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
            @selected=${this._holdActionChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="refresh">Refresh Data</mwc-list-item>
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
          </ha-select>
        </div>
      </div>
    `:B``}_entityChanged(t){this._config&&this._hass&&(this._config={...this._config,entity:t.detail.value},this._fireConfigChanged())}_titleChanged(t){this._config&&this._hass&&(this._config={...this._config,title:t.target.value},this._fireConfigChanged())}_viewChanged(t){this._config&&this._hass&&(this._config={...this._config,view:t.target.value},this._fireConfigChanged())}_themeChanged(t){this._config&&this._hass&&(this._config={...this._config,theme:t.target.value},this._fireConfigChanged())}_fontSizeChanged(t){this._config&&this._hass&&(this._config={...this._config,font_size:t.target.value},this._fireConfigChanged())}_toggleChanged(t){return e=>{this._config&&this._hass&&(this._config={...this._config,[t]:e.target.checked},this._fireConfigChanged())}}_minDelayChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value)||0;this._config={...this._config,min_delay_to_show:e},this._fireConfigChanged()}_maxCallingPointsChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value)||3;this._config={...this._config,max_calling_points:e},this._fireConfigChanged()}_disruptionEntityChanged(t){this._config&&this._hass&&(this._config={...this._config,disruption_entity:t.detail.value},this._fireConfigChanged())}_refreshIntervalChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value)||60;this._config={...this._config,refresh_interval:e},this._fireConfigChanged()}_tapActionChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{action:t.target.value}},this._fireConfigChanged())}_urlPathChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{...this._config.tap_action,url_path:t.target.value}},this._fireConfigChanged())}_navigationPathChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{...this._config.tap_action,navigation_path:t.target.value}},this._fireConfigChanged())}_holdActionChanged(t){this._config&&this._hass&&(this._config={...this._config,hold_action:{action:t.target.value}},this._fireConfigChanged())}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}}),console.info("%c MY-RAIL-COMMUTE-CARD \n%c Version 1.0.0 ","color: cyan; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");class ut extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},_trains:{type:Array},_origin:{type:String},_destination:{type:String},_lastUpdated:{type:String},_hasDisruption:{type:Boolean},_disruptionSeverity:{type:String},_disruptionMessage:{type:String},_loading:{type:Boolean}}}static get styles(){return ct}constructor(){super(),this._trains=[],this._origin="",this._destination="",this._lastUpdated="",this._hasDisruption=!1,this._disruptionSeverity="severe",this._disruptionMessage="",this._loading=!0,this._pressTimer=null}_isActiveState(t){if(null==t)return!1;if("boolean"==typeof t)return t;const e=String(t).toLowerCase().trim();return"on"===e||"yes"===e||"true"===e||"1"===e}setConfig(t){if(!t)throw new Error("Invalid configuration");if(!t.entity&&""!==t.entity)throw new Error("Please select a rail commute summary sensor");this.config={view:"full",theme:"auto",show_header:!0,show_route:!0,show_last_updated:!1,show_platform:!0,show_operator:!0,show_calling_points:!1,show_delay_reason:!0,show_journey_time:!1,show_service_type:!1,max_calling_points:3,hide_on_time_trains:!1,only_show_disrupted:!1,min_delay_to_show:0,auto_refresh:!0,refresh_interval:60,card_style:"departure-board",font_size:"medium",compact_height:!1,show_animations:!0,status_icons:!0,...t},t.colors&&(t.colors.on_time&&this.style.setProperty("--custom-on-time-color",t.colors.on_time),t.colors.minor_delay&&this.style.setProperty("--custom-minor-delay-color",t.colors.minor_delay),t.colors.major_delay&&this.style.setProperty("--custom-major-delay-color",t.colors.major_delay),t.colors.cancelled&&this.style.setProperty("--custom-cancelled-color",t.colors.cancelled)),t.theme&&"auto"!==t.theme&&this.setAttribute("theme",t.theme),t.font_size&&this.setAttribute("font-size",t.font_size),!1===t.show_animations&&this.setAttribute("no-animations","")}set hass(t){if(this._hass=t,!this.config.entity)return this._loading=!1,void(this._trains=[]);const e=t.states[this.config.entity];if(!e)return console.error("Entity not found:",this.config.entity),this._loading=!1,void(this._trains=[]);if(e.attributes.all_trains&&e.attributes.all_trains.length>0){const t=this.config.entity.replace("sensor.","").replace("_summary","").replace("_commute_summary","");this._trains=e.attributes.all_trains.map((e,i)=>({...e,train_id:`sensor.${t}_train_${e.train_number||i+1}`}))}else this._trains=this._getTrainsFromIndividualSensors(t);var i;if(this._origin=e.attributes.origin_name||e.attributes.origin||e.attributes.from_station||"",this._destination=e.attributes.destination_name||e.attributes.destination||e.attributes.to_station||"",this._lastUpdated=e.attributes.last_updated||e.last_updated||e.last_changed||"",this._trains&&this._trains.length>0&&(this._trains=(i=this._trains)&&0!==i.length?[...i].sort((t,e)=>new Date(t.scheduled_departure).getTime()-new Date(e.scheduled_departure).getTime()):[]),this._hasDisruption=this._isActiveState(e.attributes.has_disruption),this._disruptionSeverity=e.attributes.disruption_severity||e.attributes.disruption_level||e.attributes.severity||"severe",this._disruptionMessage=e.attributes.disruption_message||e.attributes.disruption_reason||e.attributes.reason||"",console.debug("[MyRailCommuteCard] Disruption detection start:",{entity:this.config.entity,has_disruption_attr:e.attributes.has_disruption,hasDisruptionFromSummary:this._hasDisruption,configured_disruption_entity:this.config.disruption_entity||"(none)"}),this.config.disruption_entity){const e=t.states[this.config.disruption_entity];console.debug("[MyRailCommuteCard] Configured disruption_entity:",{entity_id:this.config.disruption_entity,found:!!e,state:e?.state,isActive:!!e&&this._isActiveState(e.state)}),e&&this._isActiveState(e.state)&&(this._hasDisruption=!0,this._disruptionMessage||(this._disruptionMessage=e.attributes.message||e.attributes.reason||e.attributes.disruption_message||e.attributes.disruption_reason||""),this._disruptionSeverity=e.attributes.severity||e.attributes.disruption_severity||e.attributes.level||e.attributes.disruption_level||this._disruptionSeverity||"severe")}if(!this._hasDisruption&&!this.config.disruption_entity){const e=this.config.entity.replace("sensor.","").replace("_commute_summary","").replace("_summary",""),i=[`binary_sensor.${e}_severe_disruption`,`binary_sensor.${e}_disruption`,`binary_sensor.${e}_has_disruption`];console.debug("[MyRailCommuteCard] No disruption_entity configured, trying auto-discovery:",i);for(const e of i){const i=t.states[e];if(i){console.debug(`[MyRailCommuteCard] Auto-discovered disruption entity: ${e}, state: ${i.state}`),this._isActiveState(i.state)&&(this._hasDisruption=!0,this._disruptionMessage=i.attributes.message||i.attributes.reason||i.attributes.disruption_message||i.attributes.disruption_reason||this._disruptionMessage||"",this._disruptionSeverity=i.attributes.severity||i.attributes.disruption_severity||i.attributes.level||i.attributes.disruption_level||this._disruptionSeverity||"severe");break}}}console.debug("[MyRailCommuteCard] Disruption detection result:",{_hasDisruption:this._hasDisruption,_disruptionSeverity:this._disruptionSeverity,_disruptionMessage:this._disruptionMessage}),this._trains&&this._trains.length>0&&(this._trains=function(t,e){if(!t||0===t.length)return[];let i=[...t];return e.hide_on_time_trains&&(i=i.filter(t=>t.is_cancelled||t.is_no_service||t.delay_minutes>0)),e.min_delay_to_show>0&&(i=i.filter(t=>t.is_cancelled||t.delay_minutes>=e.min_delay_to_show)),i}(this._trains,this.config)),this._loading=!1,this.requestUpdate()}_getTrainsFromIndividualSensors(t){const e=this.config.entity.replace("sensor.","").replace("_summary","").replace("_commute_summary",""),i=[`sensor.${e}_train_`,`sensor.${e}_train`,`sensor.${e.replace(/_/g,"-")}_train_`,`sensor.${e.replace(/_/g,"")}_train_`];let s=[];for(const e of i){const i=Object.keys(t.states).filter(t=>t.startsWith(e));if(i.length>0){s=i;break}}s.sort((t,e)=>parseInt(t.match(/train[_-]?(\d+)$/i)?.[1]||"0")-parseInt(e.match(/train[_-]?(\d+)$/i)?.[1]||"0"));const o=s.map(e=>{const i=t.states[e];if(!i)return null;let s=i.attributes.calling_points||i.attributes.stops||i.attributes.calling_at||i.attributes["Calling at"]||[];"string"==typeof s&&(s=s.split(",").map(t=>t.trim()).filter(t=>t));const o=i.attributes.scheduled_departure||i.attributes.scheduled||i.attributes.departure||i.attributes.departure_time||i.attributes.std||i.attributes.aimed_departure_time||i.attributes["Scheduled Departure"]||i.state;return{train_id:e,scheduled_departure:o,expected_departure:i.attributes.expected_departure||i.attributes.expected||i.attributes.estimated||i.attributes.estimated_departure||i.attributes.etd||i.attributes.expected_arrival||i.attributes["Expected Departure"]||o,platform:i.attributes.platform||i.attributes.Platform||"",operator:i.attributes.operator||i.attributes.service_operator||i.attributes.Operator||"",is_cancelled:i.attributes.is_cancelled||i.attributes.cancelled||"Cancelled"===i.state||"Canceled"===i.state||!1,is_no_service:i.attributes.is_no_service||i.attributes.no_service||"No service"===i.state||"No Service"===i.state||!1,delay_minutes:parseInt(i.attributes.delay_minutes||i.attributes.delay||i.attributes.minutes_late||i.attributes["Delay minutes"]||"0"),delay_reason:i.attributes.delay_reason||i.attributes.reason||i.attributes["Delay reason"]||"",calling_points:s,journey_duration:i.attributes.journey_duration||i.attributes.duration||"",service_type:i.attributes.service_type||i.attributes.type||""}}).filter(t=>null!==t);return o}getCardSize(){const t=this.config.view||"full",e=this._trains?.length||0;switch(t){case"compact":return 1+Math.ceil(.5*e);case"next-only":return 3;default:return 2+e}}render(){if(!this.config.entity)return this._renderEmpty("No entity selected","Please select a rail commute summary sensor in the card configuration");if(this._loading)return this._renderLoading();if(t=this._hasDisruption,this.config.only_show_disrupted&&!t)return this._renderEmpty("No disruption detected","Trains will appear when there is disruption");var t;if(!this._trains||0===this._trains.length)return this._renderEmpty();switch(this.config.view||"full"){case"compact":return this._renderCompact();case"next-only":return this._renderNextOnly();case"board":return this._renderBoard();default:return this._renderFull()}}_renderHeader(){const t=!1!==this.config.show_header,e=!1!==this.config.show_route;if(!t)return"";const i=this.config.title||"Rail Commute";return B`
      <div class="card-header">
        <div class="header-content">
          <ha-icon icon="mdi:train"></ha-icon>
          <span class="header-title">${i}</span>
        </div>
        ${e&&this._origin&&this._destination?B`
          <div class="route">
            ${this._origin} → ${this._destination}
          </div>
        `:""}
      </div>
    `}_renderDisruptionBanner(){if(!this._hasDisruption)return"";const t=(this._disruptionSeverity||"severe").toLowerCase(),e=t.includes("minor")||t.includes("light")||t.includes("low"),i=e?"disruption-minor":"disruption-severe",s=e?"Minor disruption":"Severe disruption",o=e?"mdi:alert":"mdi:alert-circle",r=!!this.config.disruption_entity;return B`
      <div
        class="disruption-banner ${i} ${r?"disruption-clickable":""}"
        @click="${r?()=>this._showDisruptionMoreInfo():null}"
        role="${r?"button":"alert"}"
      >
        <ha-icon icon="${o}" class="disruption-icon"></ha-icon>
        <div class="disruption-content">
          <span class="disruption-label">${s} on this route</span>
          ${this._disruptionMessage?B`
            <span class="disruption-message">${this._disruptionMessage}</span>
          `:""}
        </div>
        ${r?B`
          <ha-icon icon="mdi:chevron-right" class="disruption-chevron"></ha-icon>
        `:""}
      </div>
    `}_showDisruptionMoreInfo(){if(!this.config.disruption_entity)return;const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:this.config.disruption_entity},this.dispatchEvent(t)}_renderFooter(){return!1===this.config.show_last_updated?"":B`
      <div class="card-footer">
        <span class="last-updated">
          Last updated: ${function(t){if(!t)return"Unknown";try{const e=new Date,i=new Date(t),s=Math.floor((e-i)/1e3);if(s<0)return"Just now";if(s<60)return"Just now";if(s<3600){const t=Math.floor(s/60);return`${t} minute${1!==t?"s":""} ago`}if(s<86400){const t=Math.floor(s/3600);return`${t} hour${1!==t?"s":""} ago`}const o=Math.floor(s/86400);return`${o} day${1!==o?"s":""} ago`}catch(t){return console.error("Error calculating relative time:",t),"Unknown"}}(this._lastUpdated)}
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
    `}_renderTrainRow(t){const e=dt(t),i=!1!==this.config.status_icons?ht(t):"",s=!1!==this.config.show_platform,o=!1!==this.config.show_operator,r=!1!==this.config.show_delay_reason,n=!0===this.config.show_calling_points,a=!0===this.config.show_journey_time;return B`
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
            ${pt(t)}
          </div>
        </div>

        <div class="train-details">
          ${o&&t.operator?B`
            <span class="operator">${t.operator}</span>
          `:""}

          ${r&&t.delay_reason?B`
            <div class="delay-reason">
              → ${t.delay_reason}
            </div>
          `:""}

          ${n&&t.calling_points&&t.calling_points.length>0?B`
            <div class="calling-points">
              Calling at: ${function(t,e=3){if(!t||0===t.length)return"";const i=t.slice(0,e),s=t.length-e;let o=i.join(", ");return s>0&&(o+=` +${s} more`),o}(t.calling_points,this.config.max_calling_points)}
            </div>
          `:""}

          ${a&&t.journey_duration?B`
            <div class="journey-time">
              Journey time: ${t.journey_duration} mins
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
              class="train-row-compact ${dt(t)}"
              @click="${()=>this._handleTap(t)}"
              @touchstart="${this._handleTouchStart}"
              @touchend="${this._handleTouchEnd}"
              @touchmove="${this._handleTouchMove}"
            >
              <span class="time">${lt(t.scheduled_departure)}</span>
              <span class="platform">Plat ${t.platform||"—"}</span>
              <span class="status">
                ${!1!==this.config.status_icons?B`<span class="status-icon">${ht(t)}</span>`:""}
                ${t.delay_minutes>0?B`<span class="delay-text">+${t.delay_minutes}m</span>`:""}
              </span>
            </div>
          `)}
        </div>

        ${this._renderFooter()}
      </ha-card>
    `}_renderNextOnly(){const t=this._trains[0];if(!t)return this._renderEmpty();const e=dt(t),i=!1!==this.config.status_icons?ht(t):"";return B`
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
            ${i} ${pt(t)}
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
                class="board-row ${dt(t)}"
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
    `}_handleTap(t){switch(this.config.tap_action?.action||"more-info"){case"more-info":this._showMoreInfo(t);break;case"url":this._openUrl(t);break;case"navigate":this._navigate(t)}}_showMoreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0}),i=t?.train_id||this.config.entity;e.detail={entityId:i},this.dispatchEvent(e)}_openUrl(t){const e=this.config.tap_action?.url_path;if(e)window.open(e,"_blank");else{const t=`https://www.nationalrail.co.uk/journey-planner/?from=${this._origin||""}&to=${this._destination||""}`;window.open(t,"_blank")}}_navigate(t){const e=this.config.tap_action?.navigation_path;if(e){window.history.pushState(null,"",e);const t=new Event("location-changed",{bubbles:!0,composed:!0});this.dispatchEvent(t)}}_handleTouchStart(t){this._pressTimer=setTimeout(()=>{this._handleHold()},500)}_handleTouchEnd(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null)}_handleTouchMove(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null)}_handleHold(){"refresh"===(this.config.hold_action?.action||"refresh")&&this._refreshData()}_refreshData(){this._hass&&(this._hass.callService("homeassistant","update_entity",{entity_id:this.config.entity}),this._showRefreshFeedback())}_showRefreshFeedback(){const t=document.createElement("div");t.className="refresh-toast",t.textContent="Refreshing...",this.shadowRoot.appendChild(t),setTimeout(()=>{t.remove()},2e3)}static getConfigElement(){return document.createElement("my-rail-commute-card-editor")}static getStubConfig(){return{entity:"",view:"full",show_platform:!0,show_operator:!0,show_calling_points:!1}}}customElements.define("my-rail-commute-card",ut),window.customCards=window.customCards||[],window.customCards.push({type:"my-rail-commute-card",name:"My Rail Commute Card",description:"Display My Rail Commute departure information in a beautiful station-board interface",preview:!0,documentationURL:"https://github.com/adamf83/lovelace-my-rail-commute-card"});export{ut as default};
