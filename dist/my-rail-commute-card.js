/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let r=class{constructor(t,e,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=a.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&a.set(i,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const a=1===t.length?t[0]:e.reduce((e,i,a)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new r(a,t,i)},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,m=_?_.emptyScript:"",g=u.reactiveElementPolyfillSupport,f=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);void 0!==a&&l(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:a,set(e){const n=a?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,a)=>{if(e)i.adoptedStyleSheets=a.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of a){const a=document.createElement("style"),r=t.litNonce;void 0!==r&&a.setAttribute("nonce",r),a.textContent=e.cssText,i.appendChild(a)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,a=i._$Eh.get(t);if(void 0!==a&&this._$Em!==a){const t=i.getPropertyOptions(a),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=a;const n=r.fromAttribute(e,t.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(t,e,i,a=!1,r){if(void 0!==t){const n=this.constructor;if(!1===a&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===a&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,g?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,k=w.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+E,D=`<${A}>`,T=document,R=()=>T.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,M="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,I=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,U=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,V=T.createTreeWalker(T,129);function G(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,a=[];let r,n=2===e?"<svg>":3===e?"<math>":"",s=O;for(let e=0;e<i;e++){const i=t[e];let o,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===O?"!--"===l[1]?s=z:void 0!==l[1]?s=I:void 0!==l[2]?(L.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=r??O,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,o=l[1],s=void 0===l[3]?N:'"'===l[3]?U:H):s===U||s===H?s=N:s===z||s===I?s=O:(s=N,r=void 0);const h=s===N&&t[e+1].startsWith("/>")?" ":"";n+=s===O?i+D:d>=0?(a.push(o),i.slice(0,d)+S+i.slice(d)+E+h):i+E+(-2===d?e:h)}return[G(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),a]};class K{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let r=0,n=0;const s=t.length-1,o=this.parts,[l,d]=J(t,e);if(this.el=K.createElement(l,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(a=V.nextNode())&&o.length<s;){if(1===a.nodeType){if(a.hasAttributes())for(const t of a.getAttributeNames())if(t.endsWith(S)){const e=d[n++],i=a.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);o.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?tt:"?"===s[1]?et:"@"===s[1]?it:Q}),a.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:r}),a.removeAttribute(t));if(L.test(a.tagName)){const t=a.textContent.split(E),e=t.length-1;if(e>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)a.append(t[i],R()),V.nextNode(),o.push({type:2,index:++r});a.append(t[e],R())}}}else if(8===a.nodeType)if(a.data===A)o.push({type:2,index:r});else{let t=-1;for(;-1!==(t=a.data.indexOf(E,t+1));)o.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,a){if(e===q)return e;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const n=j(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(e=Y(t,r._$AS(t,e.values),r,a)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=(t?.creationScope??T).importNode(e,!0);V.currentNode=a;let r=V.nextNode(),n=0,s=0,o=i[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new Z(r,r.nextSibling,this,t):1===o.type?e=new o.ctor(r,o.name,o.strings,this,t):6===o.type&&(e=new at(r,this,t)),this._$AV.push(e),o=i[++s]}n!==o?.index&&(r=V.nextNode(),n++)}return V.currentNode=T,a}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),j(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,a="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(e);else{const t=new X(a,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new K(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const r of t)a===e.length?e.push(i=new Z(this.O(R()),this.O(R()),this,this.options)):i=e[a],i._$AI(r),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,a){const r=this.strings;let n=!1;if(void 0===r)t=Y(this,t,e,0),n=!j(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const a=t;let s,o;for(t=r[0],s=0;s<r.length-1;s++)o=Y(this,a[i+s],e,s),o===q&&(o=this._$AH[s]),n||=!j(o)||o!==this._$AH[s],o===F?t=F:t!==F&&(t+=(o??"")+r[s+1]),this._$AH[s]=o}n&&!a&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends Q{constructor(t,e,i,a,r){super(t,e,i,a,r),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??F)===q)return;const i=this._$AH,a=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(K,Z),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class st extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const a=i?.renderBefore??e;let r=a._$litPart$;if(void 0===r){const t=i?.renderBefore??null;a._$litPart$=r=new Z(e.insertBefore(R(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}st._$litElement$=!0,st.finalized=!0,nt.litElementHydrateSupport?.({LitElement:st});const ot=nt.litElementPolyfillSupport;ot?.({LitElement:st}),(nt.litElementVersions??=[]).push("4.2.2");const lt=n`
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

  /* ==================== DESTINATION GROUPS (multi-destination mode) ==================== */

  .destination-group {
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
  }

  .destination-group:first-child {
    border-top: none;
  }

  .destination-group-header {
    display: flex;
    align-items: center;
    padding: 8px var(--card-padding) 4px;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--secondary-text-color, #757575);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
    border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
  }

  .destination-group-header .dest-arrow {
    opacity: 0.5;
    font-size: 0.9rem;
  }

  .destination-group-header .dest-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .destination-group-header .dest-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--status-on-time, #4caf50);
  }

  .destination-group-header .dest-status-dot.status-critical,
  .destination-group-header .dest-status-dot.status-severe {
    background: var(--status-cancelled, #d32f2f);
  }

  .destination-group-header .dest-status-dot.status-major {
    background: var(--status-major-delay, #f44336);
  }

  .destination-group-header .dest-status-dot.status-minor {
    background: var(--status-minor-delay, #ff9800);
  }

  .destination-group-header .dest-status-dot.status-normal {
    background: var(--status-on-time, #4caf50);
  }

  /* ==================== MULTI-LEG JOURNEYS ==================== */

  .leg-group-header .dest-arrow {
    font-weight: 700;
    opacity: 0.7;
  }

  .connection-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px var(--card-padding);
    font-size: 0.85rem;
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
    border-top: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.15));
    border-bottom: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.15));
  }

  .connection-icon {
    flex-shrink: 0;
    --mdc-icon-size: 20px;
  }

  .connection-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .connection-station {
    font-weight: 600;
    color: var(--primary-text-color, #212121);
  }

  .connection-detail,
  .connection-summary {
    font-size: 0.8rem;
    color: var(--secondary-text-color, #757575);
  }

  .connection-row.connection-normal .connection-icon,
  .connection-row.connection-normal .connection-station {
    color: var(--status-on-time, #4caf50);
  }

  .connection-row.connection-minor .connection-icon,
  .connection-row.connection-minor .connection-station {
    color: var(--status-minor-delay, #ff9800);
  }

  .connection-row.connection-major .connection-icon,
  .connection-row.connection-major .connection-station {
    color: var(--status-major-delay, #f44336);
  }

  .connection-row.connection-critical .connection-icon,
  .connection-row.connection-critical .connection-station {
    color: var(--status-cancelled, #d32f2f);
  }

  .not-catchable-badge {
    margin-left: 4px;
    opacity: 0.7;
    font-size: 0.8em;
  }

  .journey-infeasible-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px var(--card-padding);
    background: var(--status-cancelled, #d32f2f);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .journey-infeasible-banner ha-icon {
    --mdc-icon-size: 22px;
    color: #fff;
    flex-shrink: 0;
  }

  .board-leg-label {
    padding: 6px var(--card-padding) 2px;
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0.7;
    text-transform: uppercase;
  }

  .board-row.board-connection-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px var(--card-padding);
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.04);
    cursor: default;
  }

  .board-row.board-connection-row .connection-icon {
    --mdc-icon-size: 16px;
  }

  .board-row.board-connection-row.connection-normal .connection-icon {
    color: var(--status-on-time, #4caf50);
  }

  .board-row.board-connection-row.connection-minor .connection-icon {
    color: var(--status-minor-delay, #ff9800);
  }

  .board-row.board-connection-row.connection-major .connection-icon {
    color: var(--status-major-delay, #f44336);
  }

  .board-row.board-connection-row.connection-critical .connection-icon {
    color: var(--status-cancelled, #d32f2f);
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

  .train-destination {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    flex: 1 1 auto;
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

  .train-row-compact.with-destination {
    grid-template-columns: 60px 1fr 90px 70px;
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

  .train-row-compact .dest {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .next-train-destination {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    margin-top: -4px;
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

  .next-train-journey-time {
    font-size: 1rem;
    color: var(--secondary-text-color, #757575);
    margin: 8px 0;
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

  ha-card.departure-board .card-footer {
    background: #1a1a1a;
    border-color: #333;
    color: #999;
  }

  ha-card.departure-board .history-toggle,
  ha-card.departure-board .delay-repay-toggle {
    border-color: #555;
    color: #ffcc00;
  }

  ha-card.departure-board .history-toggle:hover,
  ha-card.departure-board .delay-repay-toggle:hover {
    background: #252525;
    color: #fff;
  }

  ha-card.departure-board .history-panel,
  ha-card.departure-board .delay-repay-panel {
    background: #111;
    border-color: #333;
    color: #ffcc00;
  }

  ha-card.departure-board .dr-details,
  ha-card.departure-board .dr-summary:hover {
    background: #1a1a1a;
  }

  /* ==================== FOOTER ==================== */

  .card-footer {
    padding: 8px var(--card-padding);
    border-top: 1px solid var(--divider-color, #e0e0e0);
    font-size: 0.8rem;
    color: var(--secondary-text-color, #757575);
    background: var(--card-background-color, #fff);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .last-updated {
    flex: 1;
    text-align: center;
  }

  .history-toggle {
    background: none;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color, #757575);
    padding: 0;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    --mdc-icon-size: 16px;
  }

  .history-toggle:hover {
    background: var(--secondary-background-color, #f5f5f5);
  }

  .history-toggle.active {
    background: var(--primary-color, #03a9f4);
    color: #fff;
    border-color: var(--primary-color, #03a9f4);
  }

  /* ==================== HISTORY PANEL ==================== */

  .history-panel {
    border-top: 1px solid var(--divider-color, #e0e0e0);
    padding: 12px var(--card-padding);
    background: var(--secondary-background-color, #f5f5f5);
  }

  .history-kpis {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }

  .kpi-pill {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 4px;
    border-radius: 8px;
    background: var(--card-background-color, #fff);
    border: 1px solid var(--divider-color, #e0e0e0);
    min-width: 0;
  }

  .kpi-value {
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
  }

  .kpi-label {
    font-size: 0.68rem;
    color: var(--secondary-text-color, #757575);
    margin-top: 2px;
    text-align: center;
    white-space: nowrap;
  }

  .kpi-pill.kpi-good .kpi-value { color: var(--status-on-time); }
  .kpi-pill.kpi-moderate .kpi-value { color: var(--status-minor-delay); }
  .kpi-pill.kpi-poor .kpi-value { color: var(--status-major-delay); }
  .kpi-pill.kpi-neutral .kpi-value { color: var(--secondary-text-color, #757575); }

  .history-days {
    display: flex;
    gap: 3px;
    overflow-x: auto;
    padding-bottom: 4px;
    margin-bottom: 10px;
    scrollbar-width: none;
  }

  .history-days::-webkit-scrollbar {
    display: none;
  }

  .day-sq {
    flex: 1 1 0;
    min-width: 26px;
    border-radius: 4px;
    padding: 5px 2px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    cursor: default;
  }

  .day-sq-label {
    font-size: 0.58rem;
    color: rgba(255,255,255,0.85);
    font-weight: 500;
    line-height: 1.1;
  }

  .day-sq-pct {
    font-size: 0.6rem;
    color: rgba(255,255,255,0.95);
    font-weight: 600;
    line-height: 1.1;
  }

  .day-sq.day-sq-good { background: var(--status-on-time, #4caf50); }
  .day-sq.day-sq-moderate { background: var(--status-minor-delay, #ff9800); }
  .day-sq.day-sq-poor { background: var(--status-major-delay, #f44336); }

  .day-sq.day-sq-nodata {
    background: var(--divider-color, #e0e0e0);
  }

  .day-sq.day-sq-nodata .day-sq-label {
    color: var(--secondary-text-color, #9e9e9e);
  }

  .day-sq.day-sq-nodata .day-sq-pct {
    color: var(--secondary-text-color, #9e9e9e);
  }

  .history-bestworst {
    display: flex;
    justify-content: space-between;
    font-size: 0.78rem;
    gap: 8px;
    flex-wrap: wrap;
  }

  .history-best {
    display: flex;
    align-items: center;
    gap: 3px;
    color: var(--status-on-time, #4caf50);
  }

  .history-worst {
    display: flex;
    align-items: center;
    gap: 3px;
    color: var(--status-major-delay, #f44336);
  }

  .history-best ha-icon,
  .history-worst ha-icon {
    --mdc-icon-size: 14px;
  }

  .history-empty {
    font-size: 0.85rem;
    color: var(--secondary-text-color, #757575);
    text-align: center;
    padding: 8px 0;
  }

  /* ==================== DELAY REPAY ==================== */

  .footer-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .delay-repay-toggle {
    position: relative;
    background: none;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 50%;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color, #757575);
    padding: 0;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    --mdc-icon-size: 16px;
  }

  .delay-repay-toggle:hover {
    background: var(--secondary-background-color, #f5f5f5);
  }

  .delay-repay-toggle.active {
    background: var(--primary-color, #03a9f4);
    color: #fff;
    border-color: var(--primary-color, #03a9f4);
  }

  .delay-repay-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--status-major-delay, #f44336);
    color: #fff;
    font-size: 0.65rem;
    font-weight: 600;
    line-height: 16px;
    text-align: center;
  }

  .claim-chip {
    margin-left: 6px;
    padding: 1px 8px;
    border: 1px solid var(--primary-color, #03a9f4);
    border-radius: 10px;
    background: none;
    color: var(--primary-color, #03a9f4);
    font: inherit;
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 1.4;
    cursor: pointer;
    vertical-align: middle;
  }

  .claim-chip:hover {
    background: var(--primary-color, #03a9f4);
    color: #fff;
  }

  .delay-repay-panel {
    border-top: 1px solid var(--divider-color, #e0e0e0);
    padding: 12px var(--card-padding);
    background: var(--secondary-background-color, #f5f5f5);
    font-size: 0.85rem;
  }

  .delay-repay-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 12px;
    margin-bottom: 8px;
  }

  .delay-repay-count {
    font-weight: 600;
  }

  .delay-repay-deadline,
  .delay-repay-note {
    font-size: 0.78rem;
    color: var(--secondary-text-color, #757575);
  }

  .delay-repay-note {
    margin-bottom: 8px;
  }

  .delay-repay-error {
    margin-bottom: 8px;
    padding: 6px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #fff;
    background: var(--status-cancelled, #d32f2f);
  }

  .delay-repay-empty {
    color: var(--secondary-text-color, #757575);
    text-align: center;
    padding: 8px 0;
  }

  .delay-repay-row {
    padding: 8px 0;
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }

  .delay-repay-row-main,
  .delay-repay-row-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 2px 10px;
  }

  .dr-when {
    font-weight: 500;
  }

  .dr-route {
    flex: 1 1 120px;
    min-width: 0;
  }

  .dr-delay {
    font-weight: 600;
  }

  .dr-delay.dr-minor { color: var(--status-minor-delay, #ff9800); }
  .dr-delay.dr-major { color: var(--status-major-delay, #f44336); }
  .dr-delay.dr-cancelled { color: var(--status-cancelled, #d32f2f); }

  .delay-repay-row-meta {
    margin-top: 2px;
    font-size: 0.78rem;
    color: var(--secondary-text-color, #757575);
  }

  .dr-summary {
    cursor: pointer;
    border-radius: 4px;
  }

  .dr-summary:hover {
    background: var(--card-background-color, #fff);
  }

  .dr-summary:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  .dr-chevron {
    margin-left: auto;
    color: var(--secondary-text-color, #757575);
    transition: transform 0.15s ease;
  }

  .dr-chevron.open {
    transform: rotate(180deg);
  }

  .dr-details {
    margin: 6px 0 2px;
    padding: 8px 10px;
    border-radius: 6px;
    background: var(--card-background-color, #fff);
    font-size: 0.8rem;
  }

  .dr-details-grid {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 2px 12px;
    margin: 0;
  }

  .dr-details-grid dt {
    color: var(--secondary-text-color, #757575);
  }

  .dr-details-grid dd {
    margin: 0;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .dr-details-note {
    margin-bottom: 6px;
    color: var(--secondary-text-color, #757575);
  }

  .dr-details-error {
    color: var(--status-cancelled, #d32f2f);
  }

  .dr-stops-title {
    margin: 8px 0 2px;
    font-weight: 600;
  }

  .dr-stops {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dr-stops li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 2px 0;
    border-top: 1px dotted var(--divider-color, #e0e0e0);
  }

  .dr-stop-cancelled {
    color: var(--status-cancelled, #d32f2f);
    text-decoration: line-through;
  }

  .dr-stop-time {
    white-space: nowrap;
  }

  .dr-estimated {
    padding: 0 6px;
    border: 1px dashed var(--status-minor-delay, #ff9800);
    border-radius: 8px;
    color: var(--status-minor-delay, #ff9800);
  }

  .dr-link {
    color: var(--primary-color, #03a9f4);
  }

  .delay-repay-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 6px;
  }

  .dr-btn {
    padding: 4px 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: none;
    color: var(--primary-text-color, #212121);
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
  }

  .dr-btn-primary {
    border-color: var(--primary-color, #03a9f4);
    color: var(--primary-color, #03a9f4);
  }

  .dr-btn:hover:not([disabled]) {
    background: var(--card-background-color, #fff);
  }

  .dr-btn[disabled] {
    opacity: 0.5;
    cursor: default;
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

  /* ==================== MORE INFO DIALOG ==================== */

  .train-details-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 16px;
    box-sizing: border-box;
  }

  .train-details-dialog {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    border-radius: var(--border-radius);
    max-width: 420px;
    width: 100%;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .train-details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    flex-shrink: 0;
  }

  .train-details-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .train-details-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    color: var(--secondary-text-color, #757575);
    border-radius: 50%;
  }

  .train-details-close:hover {
    background: var(--divider-color, #e0e0e0);
  }

  .train-details-content {
    padding: var(--card-padding);
    overflow-y: auto;
  }

  .train-details-status {
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 16px;
  }

  .train-details-status.on-time { color: var(--status-on-time); }
  .train-details-status.minor-delay { color: var(--status-minor-delay); }
  .train-details-status.major-delay { color: var(--status-major-delay); }
  .train-details-status.cancelled { color: var(--status-cancelled); }
  .train-details-status.no-service { color: var(--status-no-service); }

  .train-details-section {
    margin-top: 16px;
  }

  .train-details-section-title {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--secondary-text-color, #757575);
    margin-bottom: 8px;
  }

  .train-details-calling-points {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .train-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .train-details-field {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .train-details-field .field-label {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #757575);
  }

  .train-details-field .field-value {
    font-size: 0.9rem;
    font-weight: 500;
    word-break: break-word;
  }

  .train-details-footer {
    padding: 12px var(--card-padding);
    border-top: 1px solid var(--divider-color, #e0e0e0);
    flex-shrink: 0;
  }

  .train-details-history-link {
    display: flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-color, #03a9f4);
    font-size: 0.85rem;
    padding: 4px 0;
  }

  .train-details-history-link:hover {
    text-decoration: underline;
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

  :host([theme="dark"]) .train-details-dialog {
    background: #1e1e1e;
    color: #ffffff;
  }

  :host([theme="dark"]) .train-details-header,
  :host([theme="dark"]) .train-details-footer {
    border-color: #404040;
  }

  :host([theme="dark"]) .train-details-close:hover {
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


`;function dt(t){if(!t||"unknown"===t||"Unknown"===t)return"—";const e=String(t).trim();if(!e)return"—";const i=e.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);if(i)return`${i[1].padStart(2,"0")}:${i[2]}`;try{const t=new Date(e);return isNaN(t.getTime())?(console.warn("formatTime: unparseable value:",e),"—"):t.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit",hour12:!1})}catch(t){return console.warn("formatTime: could not parse time value:",e,t),"—"}}function ct(t,e){if(!t||!e)return null;try{const i=new Date(t),a=new Date(e);if(!isNaN(i.getTime())&&!isNaN(a.getTime())){const t=Math.round((a-i)/6e4);return t>0?t:null}}catch(i){console.warn("calculateJourneyDuration: could not parse as dates:",t,e,i)}const i=String(t).match(/(\d{1,2}):(\d{2})/),a=String(e).match(/(\d{1,2}):(\d{2})/);if(i&&a){let t=60*parseInt(i[1],10)+parseInt(i[2],10),e=60*parseInt(a[1],10)+parseInt(a[2],10);e<t&&(e+=1440);const r=e-t;return r>0?r:null}return null}function ht(t){return!(!t||!t.expected_departure)&&(t.expected_departure!==t.scheduled_departure&&!/\d{1,2}:\d{2}/.test(t.expected_departure))}function pt(t){return t?t.is_cancelled?"cancelled":t.is_no_service?"no-service":t.delay_minutes>=10?"major-delay":t.delay_minutes>0||ht(t)?"minor-delay":"on-time":"unknown"}function ut(t,e=!0){return e&&t?t.is_cancelled?"❌":t.is_no_service?"⊗":t.delay_minutes>=10?"🔴":t.delay_minutes>0||ht(t)?"⚠️":"✓":""}function _t(t){if(!t)return"";const e=t.cancel_reason||t.cancellation_reason||t["Cancel reason"]||t["Cancellation reason"]||"",i=t.delay_reason||t.reason||t["Delay reason"]||"";return t.is_cancelled&&e||i}function mt(t){return t?t.is_cancelled?"Cancelled":t.is_no_service?"No service":t.delay_minutes>0?`Delayed ${t.delay_minutes} min${1!==t.delay_minutes?"s":""}`:ht(t)?"Delayed":"On time":"Unknown"}function gt(t){return t?t.is_cancelled?"Cancelled":t.is_no_service?"No service":t.expected_departure&&t.expected_departure!==t.scheduled_departure?`Exp ${dt(t.expected_departure)}`:"On time":"Unknown"}function ft(t,e=3){if(!t||0===t.length)return"";const i=t.slice(0,e),a=t.length-e;let r=i.join(", ");return a>0&&(r+=` +${a} more`),r}function yt(t,e="Platform"){return t?/bus/i.test(t)?t:`${e} ${t}`:`${e} —`}function vt(t,e=!1){const i=Math.round(Number(t));if(!Number.isFinite(i))return"";if(i<60)return e?`${i}m`:`${i} mins`;const a=Math.floor(i/60),r=i%60;if(e)return r?`${a}h ${r}m`:`${a}h`;const n=1===a?"hr":"hrs";return r?`${a} ${n} ${r} mins`:`${a} ${n}`}function bt(t){if(!t)return"";if(t.length<=12)return t;const e={London:"Ldn",Street:"St",Bridge:"Bdg",Junction:"Jn",Central:"Cen",International:"Intl",Station:"Stn",Road:"Rd",Cross:"X",Park:"Pk"};let i=t;for(const[t,a]of Object.entries(e))i=i.replace(new RegExp(t,"g"),a);return i.length>12&&(i=i.substring(0,11)+"…"),i}function $t(t,e){if(!t||0===t.length)return[];let i=[...t];return e.hide_on_time_trains&&(i=i.filter(t=>t.is_cancelled||t.is_no_service||t.delay_minutes>0||ht(t))),e.min_delay_to_show>0&&(i=i.filter(t=>t.is_cancelled||t.is_no_service||ht(t)||t.delay_minutes>=e.min_delay_to_show)),i}function wt(t){return t&&0!==t.length?[...t].sort((t,e)=>{const i=new Date(t.scheduled_departure).getTime(),a=new Date(e.scheduled_departure).getTime(),r=!isNaN(i),n=!isNaN(a);return r||n?r?n?i-a:-1:1:0}):[]}function xt(t){const e=new Map;for(const i of t){const t=i.destination&&String(i.destination).trim()||"Unknown";e.has(t)||e.set(t,[]),e.get(t).push(i)}return e}function kt(t){if(!t||0===t.length)return"normal";if(t.some(t=>t.is_cancelled))return"critical";const e=Math.max(...t.map(t=>t.delay_minutes||0));return e>=15?"severe":e>=10?"major":e>0?"minor":"normal"}function Ct(t,e,i){return t?t.map((t,a)=>{const r=null!=t.train_number&&""!==t.train_number?String(t.train_number).toLowerCase().replace(/[^a-z0-9]/g,"_"):String(a+1),n=t.scheduled_departure,s=t.expected_departure,o=t.scheduled_arrival,l=t.estimated_arrival,d=/\d{1,2}:\d{2}/.test(String(s||"")),c=d?s:n,h=!d&&!!s&&s!==n&&!/^(on[\s-]?time|right\s*time)$/i.test(String(s||"").trim()),p=/\d{1,2}:\d{2}/.test(String(l||""))?l:o,u=null!=i?`leg_${i}_train_${r}`:`train_${r}`;return{...t,journey_duration:t.journey_duration||ct(c,p),journey_time_approx:t.journey_time_approx||h,train_id:`sensor.${e}_${u}`}}):[]}const St={"Missed Connection":"mdi:alert-octagon","Delayed Connection":"mdi:clock-alert","Tight Connection":"mdi:clock-alert-outline","Connection OK":"mdi:transit-connection-variant",Unknown:"mdi:help-circle-outline"};function Et(t){return St[t]||St.Unknown}const At={"Missed Connection":"connection-critical","Delayed Connection":"connection-major","Tight Connection":"connection-minor","Connection OK":"connection-normal",Unknown:"connection-normal"};function Dt(t){return At[t]||"connection-normal"}function Tt(t){const e=(t||"").toLowerCase();return e.includes("critical")||e.includes("severe")||e.includes("missed")?"status-critical":e.includes("major")||e.includes("delayed")?"status-major":e.includes("minor")||e.includes("tight")?"status-minor":"status-normal"}const Rt=new Set(["scheduled_departure","scheduled","departure","departure_time","std","aimed_departure_time","scheduled departure","expected_departure","expected","estimated","estimated_departure","etd","expected_arrival","expected departure","scheduled_arrival","sta","scheduled arrival","estimated_arrival","eta","estimated arrival","platform","operator","service_operator","is_cancelled","cancelled","is_no_service","no_service","delay_minutes","delay","minutes_late","delay minutes","delay_reason","reason","delay reason","cancel_reason","cancellation_reason","cancel reason","cancellation reason","calling_points","stops","calling_at","calling at","journey_duration","duration","journey_time_approx","service_type","type","train_number","train_id"]),jt=new Set(["attribution","icon","friendly_name","device_class","unit_of_measurement","supported_features","entity_picture","assumed_state","state_class","editable"]);function Pt(t){return t.replace(/[_-]+/g," ").trim().replace(/\b\w/g,t=>t.toUpperCase())}function Mt(t){if(null==t||""===t)return"—";if(Array.isArray(t))return t.length?t.join(", "):"—";if("boolean"==typeof t)return t?"Yes":"No";if("object"==typeof t)try{return JSON.stringify(t)}catch(e){return String(t)}return String(t)}customElements.define("my-rail-commute-card-editor",class extends st{static get properties(){return{hass:{type:Object},_config:{type:Object}}}static get styles(){return n`
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

      ha-textfield {
        width: 100%;
      }

      .native-select-label {
        display: block;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .native-select-container {
        position: relative;
        width: 100%;
      }

      .native-select-container select {
        width: 100%;
        height: 56px;
        padding: 0 36px 0 16px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.38));
        border-radius: 4px;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 1rem;
        font-family: inherit;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        box-sizing: border-box;
      }

      .native-select-container select:hover {
        border-color: var(--primary-text-color);
      }

      .native-select-container select:focus {
        outline: none;
        border-color: var(--primary-color);
        border-width: 2px;
        padding: 0 35px 0 15px;
      }

      .native-select-container::after {
        content: '';
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid var(--secondary-text-color, rgba(0,0,0,0.54));
        pointer-events: none;
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
          <span class="native-select-label">View Mode</span>
          <div class="native-select-container">
            <select @change=${this._viewChanged}>
              <option value="full" ?selected=${"full"===(this._config.view||"full")}>Full View</option>
              <option value="compact" ?selected=${"compact"===(this._config.view||"full")}>Compact View</option>
              <option value="next-only" ?selected=${"next-only"===(this._config.view||"full")}>Next Train Only</option>
              <option value="board" ?selected=${"board"===(this._config.view||"full")}>Departure Board</option>
            </select>
          </div>
          <div class="info">Choose how to display train information</div>
        </div>

        <div class="option">
          <span class="native-select-label">Theme</span>
          <div class="native-select-container">
            <select @change=${this._themeChanged}>
              <option value="auto" ?selected=${"auto"===(this._config.theme||"auto")}>Auto (Follow HA Theme)</option>
              <option value="light" ?selected=${"light"===(this._config.theme||"auto")}>Light</option>
              <option value="dark" ?selected=${"dark"===(this._config.theme||"auto")}>Dark</option>
            </select>
          </div>
        </div>

        <div class="option">
          <span class="native-select-label">Font Size</span>
          <div class="native-select-container">
            <select @change=${this._fontSizeChanged}>
              <option value="small" ?selected=${"small"===(this._config.font_size||"medium")}>Small</option>
              <option value="medium" ?selected=${"medium"===(this._config.font_size||"medium")}>Medium</option>
              <option value="large" ?selected=${"large"===(this._config.font_size||"medium")}>Large</option>
            </select>
          </div>
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

          ${this._isMultiDestinationSensor()?B`
            <ha-formfield label="Group Trains by Destination">
              <ha-switch
                .checked=${!1!==this._config.group_by_destination}
                @change=${this._toggleChanged("group_by_destination")}
              ></ha-switch>
            </ha-formfield>
          `:""}

          ${this._isMultiLegSensor()?B`
            <ha-formfield label="Show Connection Details">
              <ha-switch
                .checked=${!1!==this._config.show_connection_details}
                @change=${this._toggleChanged("show_connection_details")}
              ></ha-switch>
            </ha-formfield>

            <ha-formfield label="Show Non-Catchable Train Indicator">
              <ha-switch
                .checked=${!1!==this._config.show_non_catchable_indicator}
                @change=${this._toggleChanged("show_non_catchable_indicator")}
              ></ha-switch>
            </ha-formfield>
          `:""}

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

        <!-- Historical Reliability -->
        <div class="section-header">Historical Reliability</div>

        <div class="switches">
          <ha-formfield label="Show History Panel">
            <ha-switch
              .checked=${!0===this._config.show_history_panel}
              @change=${this._toggleChanged("show_history_panel")}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="info">When enabled, a chart-line button appears in the footer. Tap it to expand a panel showing on-time % KPIs and a colour-coded day-by-day timeline.</div>

        ${this._config.show_history_panel?B`
          <div class="option" style="margin-top: 12px;">
            <span class="native-select-label">History Window</span>
            <div class="native-select-container">
              <select @change=${this._historyDaysChanged}>
                <option value="7" ?selected=${7===(this._config.history_days||7)}>Last 7 days</option>
                <option value="14" ?selected=${14===(this._config.history_days||7)}>Last 14 days</option>
                <option value="30" ?selected=${30===(this._config.history_days||7)}>Last 30 days</option>
              </select>
            </div>
            <div class="info">Number of days shown in the day-by-day timeline.</div>
          </div>
        `:""}

        <!-- Delay Repay -->
        <div class="section-header">Delay Repay</div>

        <div class="switches">
          <ha-formfield label="Show Delay Repay Claims">
            <ha-switch
              .checked=${!0===this._config.show_delay_repay}
              @change=${this._toggleChanged("show_delay_repay")}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="info">When enabled, a cash-refund button with a badge appears in the footer, and late or cancelled trains get a "Claim" chip. Tap the button to review unclaimed journeys and mark them claimed or dismissed. Requires "Track Delay Repay claims" to be turned on in the integration options.</div>

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
          <span class="native-select-label">Tap Action</span>
          <div class="native-select-container">
            <select @change=${this._tapActionChanged}>
              <option value="more-info" ?selected=${"more-info"===(this._config.tap_action?.action||"more-info")}>Show More Info</option>
              <option value="train-details" ?selected=${"train-details"===(this._config.tap_action?.action||"more-info")}>Train Details</option>
              <option value="url" ?selected=${"url"===(this._config.tap_action?.action||"more-info")}>Open URL</option>
              <option value="navigate" ?selected=${"navigate"===(this._config.tap_action?.action||"more-info")}>Navigate</option>
              <option value="none" ?selected=${"none"===(this._config.tap_action?.action||"more-info")}>None</option>
            </select>
          </div>
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
          <span class="native-select-label">Hold Action</span>
          <div class="native-select-container">
            <select @change=${this._holdActionChanged}>
              <option value="refresh" ?selected=${"refresh"===(this._config.hold_action?.action||"refresh")}>Refresh Data</option>
              <option value="more-info" ?selected=${"more-info"===(this._config.hold_action?.action||"refresh")}>Show More Info</option>
              <option value="none" ?selected=${"none"===(this._config.hold_action?.action||"refresh")}>None</option>
            </select>
          </div>
        </div>
      </div>
    `:B``}_entityChanged(t){if(!this._config||!this._hass)return;const e=t.detail.value??"";e!==(this._config.entity??"")&&(this._config={...this._config,entity:e},this._fireConfigChanged())}_titleChanged(t){this._config&&this._hass&&(this._config={...this._config,title:t.target.value},this._fireConfigChanged())}_viewChanged(t){this._config&&this._hass&&(this._config={...this._config,view:t.target.value},this._fireConfigChanged())}_themeChanged(t){this._config&&this._hass&&(this._config={...this._config,theme:t.target.value},this._fireConfigChanged())}_fontSizeChanged(t){this._config&&this._hass&&(this._config={...this._config,font_size:t.target.value},this._fireConfigChanged())}_toggleChanged(t){return e=>{this._config&&this._hass&&(this._config={...this._config,[t]:e.target.checked},this._fireConfigChanged())}}_minDelayChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value,10)||0;this._config={...this._config,min_delay_to_show:e},this._fireConfigChanged()}_maxCallingPointsChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value,10)||3;this._config={...this._config,max_calling_points:e},this._fireConfigChanged()}_statusEntityChanged(t){this._config&&this._hass&&(this._config={...this._config,status_entity:t.detail.value},this._fireConfigChanged())}_refreshIntervalChanged(t){if(!this._config||!this._hass)return;const e=parseInt(t.target.value,10)||60;this._config={...this._config,refresh_interval:e},this._fireConfigChanged()}_tapActionChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{action:t.target.value}},this._fireConfigChanged())}_urlPathChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{...this._config.tap_action,url_path:t.target.value}},this._fireConfigChanged())}_navigationPathChanged(t){this._config&&this._hass&&(this._config={...this._config,tap_action:{...this._config.tap_action,navigation_path:t.target.value}},this._fireConfigChanged())}_holdActionChanged(t){this._config&&this._hass&&(this._config={...this._config,hold_action:{action:t.target.value}},this._fireConfigChanged())}_historyDaysChanged(t){this._config&&this._hass&&(this._config={...this._config,history_days:parseInt(t.target.value,10)},this._fireConfigChanged())}_isMultiDestinationSensor(){if(!this._hass||!this._config?.entity)return!1;const t=this._hass.states[this._config.entity];return!0===t?.attributes?.multi_destination}_isMultiLegSensor(){if(!this._hass||!this._config?.entity)return!1;const t=this._hass.states[this._config.entity];return!0===t?.attributes?.is_multi_leg}_fireConfigChanged(){const t=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(t)}}),console.info("%c MY-RAIL-COMMUTE-CARD \n%c Version 1.0.9 ","color: cyan; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");class Ot extends st{static get properties(){return{hass:{type:Object},config:{type:Object},_trains:{type:Array},_origin:{type:String},_destination:{type:String},_lastUpdated:{type:String},_hasDisruption:{type:Boolean},_disruptionSeverity:{type:String},_disruptionMessage:{type:String},_resolvedStatusEntityId:{type:String},_loading:{type:Boolean},_entityNotFound:{type:Boolean},_returnEntityId:{type:String},_showReturn:{type:Boolean},_historyPanelOpen:{type:Boolean},_histRelAttrs:{type:Object},_histDelAttrs:{type:Object},_delayRepayPanelOpen:{type:Boolean},_drAttrs:{type:Object},_drCount:{type:Number},_drBusy:{type:Object},_drExpanded:{type:Object},_drDetails:{type:Object},_drError:{type:String},_isMultiDestination:{type:Boolean},_servicesByDestination:{type:Object},_isMultiLeg:{type:Boolean},_legs:{type:Array},_connections:{type:Array},_journeyFeasible:{type:Boolean},_trainDetailsTrain:{type:Object}}}static get styles(){return lt}constructor(){super(),this._trains=[],this._origin="",this._destination="",this._lastUpdated="",this._hasDisruption=!1,this._disruptionSeverity="",this._disruptionMessage="",this._resolvedStatusEntityId="",this._loading=!0,this._entityNotFound=!1,this._toastTimer=null,this._toastElement=null,this._returnEntityId=null,this._showReturn=!1,this._returnEntityCacheKey=null,this._historyPanelOpen=!1,this._histRelAttrs=null,this._histDelAttrs=null,this._delayRepayPanelOpen=!1,this._drAttrs=null,this._drCount=0,this._drServiceIds=new Set,this._drDepartures=new Set,this._drPending=[],this._drBusy=new Set,this._drExpanded=new Set,this._drDetails={},this._drError="",this._drWarned=!1,this._drAvailable=!1,this._isMultiDestination=!1,this._servicesByDestination=null,this._isMultiLeg=!1,this._legs=[],this._connections=[],this._journeyFeasible=!0,this._trainDetailsTrain=null,this._trainDetailsEscHandler=null}setConfig(t){if(!t)throw new Error("Invalid configuration");this.config={view:"full",theme:"auto",show_header:!0,show_route:!0,show_last_updated:!1,show_platform:!0,show_operator:!0,show_calling_points:!1,show_delay_reason:!0,show_journey_time:!1,show_service_type:!1,max_calling_points:3,hide_on_time_trains:!1,only_show_disrupted:!1,min_delay_to_show:0,auto_refresh:!0,refresh_interval:60,card_style:"departure-board",font_size:"medium",compact_height:!1,show_animations:!0,status_icons:!0,show_history_panel:!1,history_days:7,show_delay_repay:!1,group_by_destination:!0,show_connection_details:!0,show_non_catchable_indicator:!0,...t},t.colors&&(t.colors.on_time&&this.style.setProperty("--custom-on-time-color",t.colors.on_time),t.colors.minor_delay&&this.style.setProperty("--custom-minor-delay-color",t.colors.minor_delay),t.colors.major_delay&&this.style.setProperty("--custom-major-delay-color",t.colors.major_delay),t.colors.cancelled&&this.style.setProperty("--custom-cancelled-color",t.colors.cancelled)),t.theme&&"auto"!==t.theme&&this.setAttribute("theme",t.theme),t.font_size&&this.setAttribute("font-size",t.font_size),!1===t.show_animations&&this.setAttribute("no-animations","")}set hass(t){if(this._hass=t,!this.config)return;if(!this.config.entity)return this._loading=!1,void(this._trains=[]);const e=t.states[this.config.entity];if(!e)return console.error("my-rail-commute-card: entity not found:",this.config.entity),this._entityNotFound=!0,this._loading=!1,void(this._trains=[]);this._entityNotFound=!1;const i=e.attributes.origin_name||e.attributes.origin||e.attributes.from_station||"",a=e.attributes.destination_name||e.attributes.destination||e.attributes.to_station||"",r=`${i}|${a}`;r!==this._returnEntityCacheKey?(this._returnEntityCacheKey=r,this._returnEntityId=this._findReturnEntity(t,i,a)):this._returnEntityId&&!t.states[this._returnEntityId]&&(this._returnEntityCacheKey=null,this._returnEntityId=this._findReturnEntity(t,i,a)),this._showReturn&&!this._returnEntityId&&(this._showReturn=!1);const n=this._showReturn&&this._returnEntityId?this._returnEntityId:this.config.entity,s=t.states[n];if(!s)return this._loading=!1,void(this._trains=[]);const o=n.replace("sensor.","").replace("_summary","").replace("_commute_summary","");let l;if(s.attributes.all_trains&&s.attributes.all_trains.length>0?this._trains=Ct(s.attributes.all_trains,o):this._trains=this._getTrainsFromIndividualSensors(t,n),this._isMultiDestination=!0===s.attributes.multi_destination,this._servicesByDestination=s.attributes.services_by_destination||null,this._isMultiLeg=!0===s.attributes.is_multi_leg,this._legs=this._isMultiLeg?(s.attributes.legs||[]).map((t,e)=>({...t,services:Ct(t.services||[],o,e+1)})):[],this._connections=this._isMultiLeg&&s.attributes.connections||[],this._journeyFeasible=!1!==s.attributes.journey_feasible,this._origin=this._showReturn?a:i,this._destination=this._isMultiDestination?null:this._showReturn?i:a,this._lastUpdated=s.attributes.last_updated||s.last_updated||s.last_changed||"",this._trains&&this._trains.length>0&&(this._trains=wt(this._trains)),this._hasDisruption=!1,this._disruptionSeverity="",this._disruptionMessage="",this._resolvedStatusEntityId="",this._showReturn&&this._returnEntityId){const e=`sensor.${this._returnEntityId.replace("sensor.","").replace("_summary","").replace("_commute_summary","")}_status`;t.states[e]&&(l=e)}else if(l=this.config.status_entity,!l){const e=`sensor.${this.config.entity.replace("sensor.","").replace("_summary","").replace("_commute_summary","")}_status`;t.states[e]&&(l=e)}if(l){this._resolvedStatusEntityId=l;const e=t.states[l];if(e){const t=(e.state||"").toLowerCase().trim();"normal"!==t&&"unknown"!==t&&"unavailable"!==t&&""!==t&&(this._hasDisruption=!0,t.includes("critical")?this._disruptionSeverity="critical":t.includes("severe")?this._disruptionSeverity="severe":t.includes("major")?this._disruptionSeverity="major":this._disruptionSeverity="minor",this._disruptionMessage=e.attributes.message||e.attributes.reason||e.attributes.disruption_message||"")}}if(this.config.show_history_panel){const e=n.replace("sensor.","").replace("_summary","").replace("_commute_summary",""),i=t.states[`sensor.${e}_historical_reliability`],a=t.states[`sensor.${e}_historical_delays`];i||a||console.warn("my-rail-commute-card: show_history_panel is enabled but no history sensors were found.",`Expected: sensor.${e}_historical_reliability / sensor.${e}_historical_delays`),this._histRelAttrs=i?i.attributes:null,this._histDelAttrs=a?a.attributes:null}this._discoverDelayRepay(t,n),this._trains&&this._trains.length>0&&(this._trains=$t(this._trains,this.config)),this._isMultiLeg&&(this._legs=this._legs.map(t=>({...t,services:$t(wt(t.services),this.config)}))),this._trainDetailsTrain&&(this._trainDetailsTrain=this._findTrainById(this._trainDetailsTrain.train_id)),this._loading=!1,this.requestUpdate()}_findTrainById(t){if(!t)return null;const e=(this._trains||[]).find(e=>e.train_id===t);if(e)return e;for(const e of this._legs||[]){const i=(e.services||[]).find(e=>e.train_id===t);if(i)return i}return null}_findReturnEntity(t,e,i){if(!e||!i||this._isMultiDestination)return null;const a=e.toLowerCase().trim(),r=i.toLowerCase().trim();for(const[e,i]of Object.entries(t.states)){if(e===this.config.entity)continue;if(!i.attributes)continue;const t=i.attributes;if(!(t.all_trains||t.origin_name||t.origin||t.from_station))continue;const n=(t.origin_name||t.origin||t.from_station||"").toLowerCase().trim(),s=(t.destination_name||t.destination||t.to_station||"").toLowerCase().trim();if(n&&s&&(n===r&&s===a))return e}return null}_toggleReturn(){this._showReturn=!this._showReturn,this._hass&&(this.hass=this._hass)}_toggleHistoryPanel(){this._historyPanelOpen=!this._historyPanelOpen}_toggleDelayRepayPanel(){this._delayRepayPanelOpen=!this._delayRepayPanelOpen,this._drError=""}_discoverDelayRepay(t,e){if(!this.config.show_delay_repay)return;const i=e.replace("sensor.","").replace("_summary","").replace("_commute_summary",""),a=t.states[`sensor.${i}_delay_repay_claims`],r=t.states[`binary_sensor.${i}_delay_repay_eligible`];a||r||this._drWarned||(this._drWarned=!0,console.warn("my-rail-commute-card: show_delay_repay is enabled but no Delay Repay sensors were found.",`Expected: sensor.${i}_delay_repay_claims / binary_sensor.${i}_delay_repay_eligible`,'(enable "Track Delay Repay claims" in the integration options)')),this._drAttrs=a?a.attributes||{}:null,this._drClaimsEntityId=a?`sensor.${i}_delay_repay_claims`:null;const n=a?parseInt(a.state,10):NaN;this._drCount=Number.isFinite(n)?n:0;const s=this._todayIso(),o=new Set,l=new Set,d=t=>{t&&(t.date&&t.date!==s||(t.service_id&&o.add(String(t.service_id)),t.scheduled_departure&&l.add(String(t.scheduled_departure))))};this._drPending=Array.isArray(this._drAttrs&&this._drAttrs.pending_claims)?this._drAttrs.pending_claims:[],(this._drAttrs&&this._drAttrs.claims||[]).forEach(d),this._drPending.forEach(d),d(r&&r.attributes?r.attributes.latest:null),this._drServiceIds=o,this._drDepartures=l,this._drAvailable=!(!a&&!r)}_todayIso(){const t=new Date,e=t=>String(t).padStart(2,"0");return`${t.getFullYear()}-${e(t.getMonth()+1)}-${e(t.getDate())}`}_isClaimable(t){return!(!0!==this.config.show_delay_repay||!this._drAvailable)&&(!(!t.service_id||!this._drServiceIds.has(String(t.service_id)))||!!t.scheduled_departure&&this._drDepartures.has(String(t.scheduled_departure)))}_renderClaimChip(t){if(!this._isClaimable(t))return"";const e=t.is_cancelled?"Cancelled - may be eligible for Delay Repay. Tap to open the claims panel.":"May be eligible for Delay Repay. Tap to open the claims panel.";return B`
      <button
        class="claim-chip"
        title="${e}"
        aria-label="${e}"
        @click="${t=>{t.stopPropagation(),this._openDelayRepayPanel()}}"
        @touchstart="${t=>t.stopPropagation()}"
        @touchend="${t=>t.stopPropagation()}"
      >Claim</button>
    `}_openDelayRepayPanel(){this._delayRepayPanelOpen=!0}_resolveDelayRepayEntryId(){const t=this._drAttrs&&this._drAttrs.entry_id;if(t)return t;const e=this._drClaimsEntityId,i=this._hass&&this._hass.entities&&e?this._hass.entities[e]:null;return i&&i.config_entry_id||null}async _fetchClaimDetails(t){const e=this._resolveDelayRepayEntryId(),i=e=>{this._drDetails={...this._drDetails,[t.key]:e}};if(!this._hass||!e)return void i({status:"error",claim:t,error:"Could not find the commute's config entry."});const a=this._drDetails[t.key];i({status:"loading",claim:a&&a.claim||t});try{const a=await this._hass.callWS({type:"call_service",domain:"my_rail_commute",service:"get_delay_repay_claims",service_data:{entry_id:e,journeys:[t.key]},return_response:!0}),r=a&&a.response&&Array.isArray(a.response.claims)?a.response.claims.find(e=>e.key===t.key):null;i({status:"ready",claim:r||t})}catch(e){const a=e&&e.message?e.message:"unknown error";i({status:"error",claim:t,error:`Could not load service details: ${a}`})}}_toggleClaimDetails(t){const e=new Set(this._drExpanded);if(e.has(t.key))return e.delete(t.key),void(this._drExpanded=e);e.add(t.key),this._drExpanded=e,this._fetchClaimDetails(t)}_onClaimSummaryKey(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleClaimDetails(e))}_formatStopTime(t,e){if(!t&&!e)return"";const i=t=>"string"==typeof t&&/^\d{2}:\d{2}$/.test(t);if(i(e)&&e!==t)return B`<s>${dt(t)}</s> <strong>${dt(e)}</strong>`;const a=t?dt(t):"";return e&&!i(e)&&"on time"!==String(e).toLowerCase()?B`${a} <em>${e}</em>`:a}_renderClaimDetails(t){const e=this._drDetails[t.key]||{status:"loading",claim:t},i=e.claim||t,a=i.details||null,r=a&&Array.isArray(a.calling_points)?a.calling_points:[],n=!0===i.is_cancelled,s="confirmed"===i.confirmation,o=i.arrival&&"On time"!==i.arrival?dt(i.arrival):null;return B`
      <div class="dr-details" role="region" aria-label="Service details">
        ${"loading"===e.status?B`<div class="dr-details-note">Loading service details…</div>`:""}
        ${"error"===e.status?B`<div class="dr-details-note dr-details-error">${e.error}</div>`:""}
        <dl class="dr-details-grid">
          <dt>Status</dt>
          <dd>${s?n?"Confirmed cancellation":"Confirmed against the actual arrival":"Estimated from the live forecast - verify before claiming"}</dd>
          ${i.operator?B`<dt>Operator</dt><dd>${i.operator}</dd>`:""}
          ${i.service_id?B`<dt>Service ID</dt><dd>${i.service_id}</dd>`:""}
          ${a&&a.platform?B`<dt>Platform</dt><dd>${a.platform}</dd>`:""}
          <dt>Departs</dt>
          <dd>${this._formatStopTime(i.scheduled_departure,a&&a.expected_departure)} from ${i.origin}</dd>
          ${i.scheduled_arrival?B`
            <dt>${s&&!n?"Arrived":"Arrives"}</dt>
            <dd>${n?`${dt(i.scheduled_arrival)} at ${i.destination} (cancelled)`:B`${this._formatStopTime(i.scheduled_arrival,o)} at ${i.destination}`}</dd>
          `:""}
          ${null==i.delay_minutes||n?"":B`<dt>Delay</dt><dd>${i.delay_minutes} min${i.tier?` (${i.tier}+ min band)`:""}</dd>`}
          ${i.delay_reason?B`<dt>Reason</dt><dd>${i.delay_reason}</dd>`:""}
          ${i.claim_deadline?B`<dt>Claim by</dt><dd>${this._formatHistoryDate(i.claim_deadline)}</dd>`:""}
        </dl>
        ${r.length?B`
          <div class="dr-stops-title">Calling at</div>
          <ol class="dr-stops">
            ${r.map(t=>B`
              <li class="${t.is_cancelled?"dr-stop-cancelled":""}">
                <span class="dr-stop-name">${t.name}</span>
                <span class="dr-stop-time">${t.is_cancelled?"Cancelled":this._formatStopTime(t.scheduled,t.expected)}</span>
              </li>
            `)}
          </ol>
        `:"ready"===e.status?B`
          <div class="dr-details-note">Stop details were not recorded for this journey.</div>
        `:""}
      </div>
    `}async _delayRepayAction(t,e){if(!this._hass||this._drBusy.has(e.key))return;const i=this._resolveDelayRepayEntryId();if(i){this._drError="",this._drBusy=new Set([...this._drBusy,e.key]);try{await this._hass.callService("my_rail_commute",t,{entry_id:i,journeys:[e.key]})}catch(e){const i=e&&e.message?e.message:"unknown error";this._drError=`Could not ${"dismiss_delay_repay"===t?"dismiss":"mark as claimed"}: ${i}`}finally{const t=new Set(this._drBusy);t.delete(e.key),this._drBusy=t}}else this._drError="Could not find the commute's config entry. Update the My Rail Commute integration to the latest version."}_safeClaimUrl(t){if(!t||"string"!=typeof t)return null;try{const e=new URL(t);return"https:"===e.protocol||"http:"===e.protocol?e.href:null}catch(t){return null}}_renderDelayRepayPanel(){if(!this.config.show_delay_repay||!this._delayRepayPanelOpen)return"";const t=this._drAttrs;if(!t)return B`
        <div class="delay-repay-panel">
          <div class="delay-repay-empty">Delay Repay sensors not found. Enable "Track Delay Repay claims" in the My Rail Commute integration options.</div>
        </div>
      `;const e=Array.isArray(t.claims)?t.claims:[],i=this._drPending||[],a=e.concat(i).some(t=>"estimated"===t.confirmation),r=t.oldest_claim_deadline;return B`
      <div class="delay-repay-panel">
        <div class="delay-repay-header">
          <span class="delay-repay-count">${this._drCount} to claim${i.length?` · ${i.length} in progress`:""}</span>
          ${r?B`<span class="delay-repay-deadline">claim by ${this._formatHistoryDate(r)}</span>`:""}
        </div>

        ${t.claims_truncated?B`
          <div class="delay-repay-note">Showing the latest ${e.length} of ${this._drCount} journeys.</div>
        `:""}

        ${a?B`
          <div class="delay-repay-note">Estimated times may differ from the official record - verify before claiming.</div>
        `:""}

        ${this._drError?B`<div class="delay-repay-error" role="alert">${this._drError}</div>`:""}

        ${0===e.length&&0===i.length?B`
          <div class="delay-repay-empty">Nothing to claim - you're all caught up</div>
        `:""}
        ${e.map(t=>this._renderClaimRow(t))}
        ${i.length?B`
          <div class="delay-repay-note">In progress - claimable once the journey has finished:</div>
          ${i.map(t=>this._renderClaimRow(t,!0))}
        `:""}
      </div>
    `}_renderClaimRow(t,e=!1){const i=this._drBusy.has(t.key),a=this._safeClaimUrl(t.claim_url),r=!0===t.is_cancelled,n=r?"Cancelled":null!=t.delay_minutes?`${t.delay_minutes} min late`:"Delayed",s=r?"dr-cancelled":(t.tier||t.delay_minutes||0)>=30?"dr-major":"dr-minor",o=this._drExpanded.has(t.key);return B`
      <div class="delay-repay-row">
        <div
          class="dr-summary"
          role="button"
          tabindex="0"
          aria-expanded="${o?"true":"false"}"
          aria-label="Service details for the ${dt(t.scheduled_departure)} ${t.origin} to ${t.destination}"
          @click="${()=>this._toggleClaimDetails(t)}"
          @keydown="${e=>this._onClaimSummaryKey(e,t)}"
        >
        <div class="delay-repay-row-main">
          <span class="dr-when">${this._formatHistoryDate(t.date)} ${dt(t.scheduled_departure)}</span>
          <span class="dr-route">${t.origin} → ${t.destination}</span>
          <span class="dr-delay ${s}">${n}</span>
          <span class="dr-chevron ${o?"open":""}" aria-hidden="true">▾</span>
        </div>
        <div class="delay-repay-row-meta">
          ${t.operator?B`<span class="dr-operator">${t.operator}</span>`:""}
          ${"estimated"===t.confirmation?B`
            <span class="dr-estimated" title="Estimated - verify before claiming">estimated</span>
          `:""}
          ${a&&!e?B`<a class="dr-link" href="${a}" target="_blank" rel="noopener noreferrer" @click="${t=>t.stopPropagation()}">Claim online</a>`:""}
        </div>
        </div>
        ${o?this._renderClaimDetails(t):""}
        ${e?"":B`<div class="delay-repay-actions">
          <button
            class="dr-btn dr-btn-primary"
            ?disabled="${i}"
            @click="${()=>this._delayRepayAction("mark_delay_repay_claimed",t)}"
          >Mark claimed</button>
          <button
            class="dr-btn"
            ?disabled="${i}"
            @click="${()=>this._delayRepayAction("dismiss_delay_repay",t)}"
          >Dismiss</button>
        </div>`}
      </div>
    `}_getTrainsFromIndividualSensors(t,e){const i=(e||this.config.entity).replace("sensor.","").replace("_summary","").replace("_commute_summary",""),a=[`sensor.${i}_train_`,`sensor.${i}_train`,`sensor.${i.replace(/_/g,"-")}_train_`,`sensor.${i.replace(/_/g,"")}_train_`];let r=[];for(const e of a){const i=Object.keys(t.states).filter(t=>t.startsWith(e));if(i.length>0){r=i;break}}r.sort((t,e)=>parseInt(t.match(/train[_-]?(\d+)$/i)?.[1]||"0",10)-parseInt(e.match(/train[_-]?(\d+)$/i)?.[1]||"0",10));const n=r.map(e=>{const i=t.states[e];if(!i)return console.warn(`my-rail-commute-card: train sensor not found: ${e}`),null;let a=i.attributes.calling_points||i.attributes.stops||i.attributes.calling_at||i.attributes["Calling at"]||[];"string"==typeof a&&(a=a.split(",").map(t=>t.trim()).filter(t=>t));const r=i.attributes.scheduled_departure||i.attributes.scheduled||i.attributes.departure||i.attributes.departure_time||i.attributes.std||i.attributes.aimed_departure_time||i.attributes["Scheduled Departure"]||i.state,n=i.attributes.expected_departure||i.attributes.expected||i.attributes.estimated||i.attributes.estimated_departure||i.attributes.etd||i.attributes.expected_arrival||i.attributes["Expected Departure"]||r,s=i.attributes.scheduled_arrival||i.attributes.sta||i.attributes["Scheduled Arrival"]||null,o=i.attributes.estimated_arrival||i.attributes.eta||i.attributes["Estimated Arrival"]||s,l=/\d{1,2}:\d{2}/.test(String(n)),d=l?n:r,c=!l&&!!n&&n!==r&&!/^(on[\s-]?time|right\s*time)$/i.test(String(n).trim()),h=/\d{1,2}:\d{2}/.test(String(o))?o:s;return{train_id:e,scheduled_departure:r,expected_departure:n,scheduled_arrival:s,estimated_arrival:o,platform:i.attributes.platform||i.attributes.Platform||"",operator:i.attributes.operator||i.attributes.service_operator||i.attributes.Operator||"",is_cancelled:i.attributes.is_cancelled||i.attributes.cancelled||"Cancelled"===i.state||"Canceled"===i.state||!1,is_no_service:i.attributes.is_no_service||i.attributes.no_service||"No service"===i.state||"No Service"===i.state||!1,delay_minutes:parseInt(i.attributes.delay_minutes||i.attributes.delay||i.attributes.minutes_late||i.attributes["Delay minutes"]||"0",10),delay_reason:i.attributes.delay_reason||i.attributes.reason||i.attributes["Delay reason"]||"",cancel_reason:i.attributes.cancel_reason||i.attributes.cancellation_reason||i.attributes["Cancel reason"]||i.attributes["Cancellation reason"]||"",calling_points:a,journey_duration:i.attributes.journey_duration||i.attributes.duration||ct(d,h),journey_time_approx:c,service_type:i.attributes.service_type||i.attributes.type||""}}).filter(t=>null!==t);return n}getCardSize(){if(!this.config)return 3;const t=this.config.view||"full",e=this._trains?.length||0,i=this._isMultiLeg&&this._connections?.length||0;switch(t){case"compact":return 1+Math.ceil(.5*e)+i;case"next-only":return this._isMultiLeg?2+(this._legs?.length||0)+i:3;default:return 2+e+i}}render(){return B`
      ${this._renderCard()}
      ${this._trainDetailsTrain?this._renderTrainDetailsDialog():""}
    `}_renderCard(){if(!this.config)return B``;if(!this.config.entity)return this._renderEmpty("No entity selected","Please select a rail commute summary sensor in the card configuration");if(this._loading)return this._renderLoading();if(t=this._hasDisruption,this.config.only_show_disrupted&&!t)return this._renderEmpty("No disruption detected","Trains will appear when there is disruption");var t;if(this._entityNotFound)return this._renderEmpty("Entity not found",`Cannot find entity: ${this.config.entity}`);if(!this._trains||0===this._trains.length)return this._renderEmpty();if(this._isMultiLeg)return this._renderMultiLeg();switch(this.config.view||"full"){case"compact":return this._renderCompact();case"next-only":return this._renderNextOnly();case"board":return this._renderBoard();default:return this._renderFull()}}_renderHeader(){const t=!1!==this.config.show_header,e=!1!==this.config.show_route;if(!t)return"";const i=String(this.config.title||"Rail Commute").replace(/<[^>]*>/g,"");return B`
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
        ${e&&this._origin?B`
          <div class="route">
            ${this._isMultiDestination?B`from ${this._origin}`:B`${this._origin} → ${this._destination}`}
          </div>
        `:""}
      </div>
    `}_renderDisruptionBanner(){if(!this._hasDisruption)return"";const t={minor:{cls:"disruption-minor",label:"Minor Delays",icon:"mdi:alert"},major:{cls:"disruption-major",label:"Major Delays",icon:"mdi:alert"},severe:{cls:"disruption-severe",label:"Severe Disruption",icon:"mdi:alert-circle"},critical:{cls:"disruption-critical",label:"Critical Disruption",icon:"mdi:alert-octagon"}},{cls:e,label:i,icon:a}=t[this._disruptionSeverity]||t.minor,r=!!this._resolvedStatusEntityId;return B`
      <div
        class="disruption-banner ${e} ${r?"disruption-clickable":""}"
        @click="${r?()=>this._showDisruptionMoreInfo():null}"
        role="${r?"button":"alert"}"
      >
        <ha-icon icon="${a}" class="disruption-icon"></ha-icon>
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
    `}_showDisruptionMoreInfo(){if(!this._resolvedStatusEntityId)return;const t=new Event("hass-more-info",{bubbles:!0,composed:!0});t.detail={entityId:this._resolvedStatusEntityId},this.dispatchEvent(t)}_renderFooter(){const t=!0===this.config.show_last_updated,e=!0===this.config.show_history_panel,i=!0===this.config.show_delay_repay;return t||e||i?B`
      <div class="card-footer">
        ${t?B`
          <span class="last-updated">
            Last updated: ${function(t){if(!t)return"Unknown";try{const e=new Date,i=new Date(t);if(isNaN(i.getTime()))return console.warn("getRelativeTime: invalid timestamp:",t),"Unknown";const a=Math.floor((e-i)/1e3);if(a<0)return"Just now";if(a<60)return"Just now";if(a<3600){const t=Math.floor(a/60);return`${t} minute${1!==t?"s":""} ago`}if(a<86400){const t=Math.floor(a/3600);return`${t} hour${1!==t?"s":""} ago`}const r=Math.floor(a/86400);return`${r} day${1!==r?"s":""} ago`}catch(t){return console.warn("getRelativeTime: error calculating relative time:",t),"Unknown"}}(this._lastUpdated)}
          </span>
        `:B`<span></span>`}
        <div class="footer-actions">
          ${i?B`
            <button
              class="delay-repay-toggle ${this._delayRepayPanelOpen?"active":""}"
              @click="${this._toggleDelayRepayPanel}"
              title="${this._delayRepayPanelOpen?"Hide Delay Repay claims":"Show Delay Repay claims"}"
              aria-label="${this._delayRepayPanelOpen?"Hide Delay Repay claims":"Show Delay Repay claims"}"
            >
              <ha-icon icon="mdi:cash-refund"></ha-icon>
              ${this._drCount>0?B`<span class="delay-repay-badge">${this._drCount>99?"99+":this._drCount}</span>`:""}
            </button>
          `:""}
          ${e?B`
            <button
              class="history-toggle ${this._historyPanelOpen?"active":""}"
              @click="${this._toggleHistoryPanel}"
              title="${this._historyPanelOpen?"Hide reliability history":"Show reliability history"}"
            >
              <ha-icon icon="mdi:chart-line"></ha-icon>
            </button>
          `:""}
        </div>
      </div>
    `:""}_renderHistoryPanel(){if(!this.config.show_history_panel||!this._historyPanelOpen)return"";const t=this._histRelAttrs,e=this._histDelAttrs;if(!t&&!e)return B`
        <div class="history-panel">
          <div class="history-empty">No reliability data available yet — check back after a few updates.</div>
        </div>
      `;const i=Math.min(this.config.history_days||7,30),a=(t?.daily_breakdown||[]).slice(-i),r=t?.on_time_pct_today??null,n=t?.on_time_pct_7day??null,s=t?.on_time_pct_30day??null,o=e?.avg_delay_7day??null,l=e?.best_day??null,d=e?.worst_day??null;return B`
      <div class="history-panel">
        <div class="history-kpis">
          ${this._renderKpiPill("Today",r,"%",!1)}
          ${this._renderKpiPill("7-day",n,"%",!1)}
          ${this._renderKpiPill("30-day",s,"%",!1)}
          ${this._renderKpiPill("Avg delay",o," min",!0)}
        </div>

        ${a.length>0?B`
          <div class="history-days">
            ${a.map(t=>this._renderDaySquare(t))}
          </div>
        `:""}

        ${l||d?B`
          <div class="history-bestworst">
            ${l?B`
              <span class="history-best">
                <ha-icon icon="mdi:thumb-up-outline"></ha-icon>
                Best: ${this._formatHistoryDate(l.date)} (${l.on_time_pct}%)
              </span>
            `:B`<span></span>`}
            ${d?B`
              <span class="history-worst">
                <ha-icon icon="mdi:thumb-down-outline"></ha-icon>
                Worst: ${this._formatHistoryDate(d.date)} (${d.on_time_pct}%)
              </span>
            `:""}
          </div>
        `:""}
      </div>
    `}_renderKpiPill(t,e,i,a){const r=a?"kpi-neutral":null==(n=e)?"kpi-neutral":n>=90?"kpi-good":n>=70?"kpi-moderate":"kpi-poor";var n;return B`
      <div class="kpi-pill ${r}">
        <span class="kpi-value">${null!=e?`${e}${i}`:"—"}</span>
        <span class="kpi-label">${t}</span>
      </div>
    `}_renderDaySquare(t){const e=t.on_time_pct;let i="day-sq-nodata";null!=e&&(i=e>=90?"day-sq-good":e>=70?"day-sq-moderate":"day-sq-poor");const[a,r,n]=t.date.split("-").map(Number),s=new Date(a,r-1,n).toLocaleDateString("en-GB",{weekday:"short"}),o=null!=e?`${Math.round(e)}%`:"—",l=null!=e?`${s} ${n}: ${e}% on-time${t.avg_delay_minutes?`, avg ${t.avg_delay_minutes} min late`:""}`:`${s} ${n}: No data`;return B`
      <div class="day-sq ${i}" title="${l}">
        <span class="day-sq-label">${s}</span>
        <span class="day-sq-pct">${o}</span>
      </div>
    `}_formatHistoryDate(t){if(!t)return"";const[e,i,a]=t.split("-").map(Number);return new Date(e,i-1,a).toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"})}_renderFull(){const t=this.config.compact_height?"compact-height":"",e=this._isMultiDestination&&!1!==this.config.group_by_destination;return B`
      <ha-card class="${t}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content">
          ${e?this._renderGroupedTrains():this._trains.map(t=>this._renderTrainRow(t,this._isMultiDestination))}
        </div>

        ${this._renderHistoryPanel()}
        ${this._renderDelayRepayPanel()}
        ${this._renderFooter()}
      </ha-card>
    `}_renderTrainRow(t,e=!1){const i=pt(t),a=!1!==this.config.status_icons?ut(t):"",r=!1!==this.config.show_platform,n=!1!==this.config.show_operator,s=!1!==this.config.show_delay_reason,o=!0===this.config.show_calling_points,l=!0===this.config.show_journey_time,d=!1!==this.config.show_non_catchable_indicator&&!1===t.catchable;return B`
      <div
        class="train-row ${i}"
        @click="${()=>this._handleTap(t)}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._handleTouchEnd}"
        @touchmove="${this._handleTouchMove}"
      >
        <div class="train-main">
          <div class="train-time">
            <ha-icon icon="${function(t){return t?t.is_cancelled?"mdi:close-circle":t.delay_minutes>0?"mdi:train-variant":"mdi:train":"mdi:train"}(t)}"></ha-icon>
            <span class="time">${dt(t.scheduled_departure)}</span>
            <span class="expected-time">${t.expected_departure&&t.expected_departure!==t.scheduled_departure?dt(t.expected_departure):""}</span>
          </div>

          ${e&&t.destination?B`
            <div class="train-destination">→ ${t.destination}</div>
          `:""}

          ${r?B`
            <div class="train-platform">
              ${yt(t.platform)}
            </div>
          `:""}

          <div class="train-status">
            ${a}
            ${mt(t)}
            ${d?B`<span class="not-catchable-badge" title="Won't make the next connection">✂</span>`:""}
            ${this._renderClaimChip(t)}
          </div>
        </div>

        <div class="train-details">
          ${n&&t.operator?B`
            <span class="operator">${t.operator}</span>
          `:""}

          ${s&&_t(t)?B`
            <div class="delay-reason">
              → ${_t(t)}
            </div>
          `:""}

          ${o&&t.calling_points&&t.calling_points.length>0?B`
            <div class="calling-points">
              Calling at: ${ft(t.calling_points,this.config.max_calling_points)}
            </div>
          `:""}

          ${l&&t.journey_duration?B`
            <div class="journey-time">
              Journey time: ${vt(t.journey_duration)}${t.journey_time_approx?"*":""}
            </div>
          `:""}
        </div>
      </div>
    `}_renderGroupedTrains(){const t=xt(this._trains);return B`
      ${[...t.entries()].map(([t,e])=>{const i=this._servicesByDestination&&this._servicesByDestination[t],a=i?.status?i.status.toLowerCase().replace(/\s+/g,"-"):kt(e);return B`
          <div class="destination-group">
            ${this._renderDestinationGroupHeader(t,a)}
            ${e.map(t=>this._renderTrainRow(t))}
          </div>
        `})}
    `}_renderDestinationGroupHeader(t,e){const i=Tt(e);return B`
      <div class="destination-group-header">
        <span class="dest-arrow">→</span>
        <span class="dest-name">${t}</span>
        <span class="dest-status-dot ${i}" title="${e}"></span>
      </div>
    `}_renderCompactRow(t,e=!1){const i=!0===this.config.show_journey_time,a=!1!==this.config.show_non_catchable_indicator&&!1===t.catchable;return B`
      <div
        class="train-row-compact ${e&&t.destination?"with-destination":""} ${pt(t)}"
        @click="${()=>this._handleTap(t)}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._handleTouchEnd}"
        @touchmove="${this._handleTouchMove}"
      >
        <span class="time">${dt(t.scheduled_departure)}</span>
        ${e&&t.destination?B`
          <span class="dest">→ ${bt(t.destination)}</span>
        `:""}
        <span class="platform">${yt(t.platform,"Plat")}${i&&t.journey_duration?B` · ${vt(t.journey_duration,!0)}${t.journey_time_approx?"*":""}`:""}</span>
        <span class="status">
          ${!1!==this.config.status_icons?B`<span class="status-icon">${ut(t)}</span>`:""}
          ${t.delay_minutes>0?B`<span class="delay-text">+${t.delay_minutes}m</span>`:""}
          ${a?B`<span class="not-catchable-badge" title="Won't make the next connection">✂</span>`:""}
        </span>
      </div>
    `}_renderCompact(){const t=this._isMultiDestination&&!1!==this.config.group_by_destination,e=e=>this._renderCompactRow(e,!t&&this._isMultiDestination),i=t?(()=>{const t=xt(this._trains);return B`
            ${[...t.entries()].map(([t,i])=>{const a=this._servicesByDestination&&this._servicesByDestination[t],r=a?.status?a.status.toLowerCase().replace(/\s+/g,"-"):kt(i);return B`
                <div class="destination-group">
                  ${this._renderDestinationGroupHeader(t,r)}
                  ${i.map(e)}
                </div>
              `})}
          `})():this._trains.map(e);return B`
      <ha-card class="${this.config.compact_height?"compact-height":""}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content compact">
          ${i}
        </div>

        ${this._renderHistoryPanel()}
        ${this._renderDelayRepayPanel()}
        ${this._renderFooter()}
      </ha-card>
    `}_renderNextOnly(){const t=this._trains[0];if(!t)return this._renderEmpty();const e=pt(t),i=!1!==this.config.status_icons?ut(t):"",a=!0===this.config.show_journey_time;return B`
      <ha-card class="${this.config.compact_height?"compact-height":""}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content next-only">
          <div class="next-train-time">
            ${dt(t.scheduled_departure)}
          </div>

          ${this._isMultiDestination&&t.destination?B`
            <div class="next-train-destination">
              → ${t.destination}
            </div>
          `:""}

          ${t.expected_departure&&t.expected_departure!==t.scheduled_departure?B`
            <div class="next-train-expected">
              Expected: ${dt(t.expected_departure)}
            </div>
          `:""}

          <div class="next-train-platform">
            ${yt(t.platform)}
          </div>

          <div class="next-train-status ${e}">
            ${i} ${mt(t)}
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

          ${a&&t.journey_duration?B`
            <div class="next-train-journey-time">
              Journey time: ${vt(t.journey_duration)}${t.journey_time_approx?"*":""}
            </div>
          `:""}

        </div>

        ${this._renderHistoryPanel()}
        ${this._renderDelayRepayPanel()}
        ${this._renderFooter()}
      </ha-card>
    `}_renderBoard(){const t=!0===this.config.show_journey_time;return B`
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

            ${this._trains.map(e=>B`
                <div
                  class="board-row ${pt(e)}"
                  @click="${()=>this._handleTap(e)}"
                  @touchstart="${this._handleTouchStart}"
                  @touchend="${this._handleTouchEnd}"
                  @touchmove="${this._handleTouchMove}"
                >
                  <span class="col-time">
                    ${dt(e.scheduled_departure)}
                  </span>
                  <span class="col-dest">
                    ${this._isMultiDestination?bt(e.destination||""):bt(this._destination||"")}
                  </span>
                  <span class="col-plat">
                    ${e.platform||"—"}
                  </span>
                  <span class="col-status">
                    ${gt(e)}${t&&e.journey_duration?` · ${vt(e.journey_duration,!0)}${e.journey_time_approx?"*":""}`:""}
                  </span>
                </div>
              `)}
          </div>
        </div>

        ${this._renderHistoryPanel()}
        ${this._renderDelayRepayPanel()}
        ${this._renderFooter()}
      </ha-card>
    `}_renderMultiLeg(){const t=this.config.view||"full";if("board"===t)return this._renderMultiLegBoard();const e=this.config.compact_height?"compact-height":"",i="compact"===t?t=>this._renderCompactRow(t):t=>this._renderTrainRow(t);return B`
      <ha-card class="${e}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}
        ${this._renderJourneyInfeasibleBanner()}

        <div class="card-content ${"compact"===t?"compact":""}">
          ${this._legs.map((e,a)=>B`
            ${this._renderLegGroup(e,a,i,t)}
            ${a<this._connections.length?this._renderConnectionRow(this._connections[a]):""}
          `)}
        </div>

        ${this._renderHistoryPanel()}
        ${this._renderDelayRepayPanel()}
        ${this._renderFooter()}
      </ha-card>
    `}_renderLegGroup(t,e,i,a){const r=Tt(t.overall_status),n="next-only"===a?t.services[0]?[t.services[0]]:[]:t.services;return B`
      <div class="destination-group leg-group">
        <div class="destination-group-header leg-group-header">
          <span class="dest-arrow">${e+1}.</span>
          <span class="dest-name">${t.origin_name} → ${t.destination_name}</span>
          <span class="dest-status-dot ${r}" title="${t.overall_status}"></span>
        </div>
        ${n.map(t=>i(t))}
      </div>
    `}_renderConnectionRow(t){const e=Dt(t.status),i=Et(t.status),a=!1!==this.config.show_connection_details;return B`
      <div class="connection-row ${e}">
        <ha-icon icon="${i}" class="connection-icon"></ha-icon>
        <div class="connection-content">
          <span class="connection-station">Change at ${t.station_name||t.station}</span>
          ${a?B`
            <span class="connection-detail">
              ${t.arrival_time?`Arr ${dt(t.arrival_time)}`:""}
              ${t.connecting_departure?` → Dep ${dt(t.connecting_departure)}`:""}
              ${null!=t.buffer_minutes?` (${t.buffer_minutes}m buffer)`:""}
            </span>
            ${t.connecting_summary?B`<span class="connection-summary">${t.connecting_summary}</span>`:""}
          `:""}
        </div>
      </div>
    `}_renderConnectionBoardRow(t){const e=Dt(t.status),i=Et(t.status),a=!1!==this.config.show_connection_details;return B`
      <div class="board-row board-connection-row ${e}">
        <ha-icon icon="${i}" class="connection-icon"></ha-icon>
        <span>
          Change at ${t.station_name||t.station}${a&&t.connecting_summary?` — ${t.connecting_summary}`:""}
        </span>
      </div>
    `}_renderJourneyInfeasibleBanner(){return!this._isMultiLeg||this._journeyFeasible?"":B`
      <div class="journey-infeasible-banner">
        <ha-icon icon="mdi:alert-octagon" class="disruption-icon"></ha-icon>
        <span>This journey is not currently achievable — a connection will be missed.</span>
      </div>
    `}_renderMultiLegBoard(){const t=!0===this.config.show_journey_time;return B`
      <ha-card class="departure-board">
        <div class="board-header">
          DEPARTURES  ${this._origin||""}
        </div>
        ${this._renderDisruptionBanner()}
        ${this._renderJourneyInfeasibleBanner()}

        <div class="board-content">
          ${this._legs.map((e,i)=>B`
            <div class="board-leg-label">Leg ${i+1}: ${e.origin_name} → ${e.destination_name}</div>
            <div class="board-table">
              <div class="board-row board-header-row">
                <span class="col-time">Time</span>
                <span class="col-dest">Dest</span>
                <span class="col-plat">Plat</span>
                <span class="col-status">Status</span>
              </div>

              ${e.services.map(i=>B`
                <div
                  class="board-row ${pt(i)}"
                  @click="${()=>this._handleTap(i)}"
                  @touchstart="${this._handleTouchStart}"
                  @touchend="${this._handleTouchEnd}"
                  @touchmove="${this._handleTouchMove}"
                >
                  <span class="col-time">
                    ${dt(i.scheduled_departure)}
                  </span>
                  <span class="col-dest">
                    ${bt(i.destination||e.destination_name||"")}
                  </span>
                  <span class="col-plat">
                    ${i.platform||"—"}
                  </span>
                  <span class="col-status">
                    ${gt(i)}${t&&i.journey_duration?` · ${vt(i.journey_duration,!0)}${i.journey_time_approx?"*":""}`:""}
                  </span>
                </div>
              `)}
            </div>
            ${i<this._connections.length?this._renderConnectionBoardRow(this._connections[i]):""}
          `)}
        </div>

        ${this._renderHistoryPanel()}
        ${this._renderDelayRepayPanel()}
        ${this._renderFooter()}
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
    `}_handleTap(t){switch(this.config.tap_action?.action||"more-info"){case"more-info":this._showMoreInfo(t);break;case"train-details":this._showTrainDetails(t);break;case"url":this._openUrl(t);break;case"navigate":this._navigate(t)}}_showMoreInfo(t){const e=new Event("hass-more-info",{bubbles:!0,composed:!0}),i=t?.train_id||this.config.entity;e.detail={entityId:i},this.dispatchEvent(e)}_showTrainDetails(t){t&&(this._trainDetailsTrain=t,this._trainDetailsEscHandler||(this._trainDetailsEscHandler=t=>{"Escape"===t.key&&this._closeTrainDetails()}),document.addEventListener("keydown",this._trainDetailsEscHandler))}_closeTrainDetails(){this._trainDetailsTrain=null,this._trainDetailsEscHandler&&document.removeEventListener("keydown",this._trainDetailsEscHandler)}_renderTrainDetailsDialog(){const t=this._trainDetailsTrain;if(!t)return"";const e=this._hass?.states?.[t.train_id],i=e?e.attributes:t,a=(r=i)?Object.entries(r).filter(([t])=>{const e=t.toLowerCase();return!Rt.has(e)&&!jt.has(e)}).map(([t,e])=>({key:t,label:Pt(t),value:Mt(e)})):[];var r;const n=mt(t),s=pt(t),o=/\d{1,2}:\d{2}/.test(String(t.expected_departure||"")),l=t.origin||t.origin_name||this._origin||"",d=this._isMultiDestination?t.destination||t.destination_name||"":this._destination;return B`
      <div class="train-details-overlay" @click="${this._closeTrainDetails}">
        <div
          class="train-details-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Train details"
          @click="${t=>t.stopPropagation()}"
        >
          <div class="train-details-header">
            <div class="train-details-title">
              <ha-icon icon="mdi:train"></ha-icon>
              <span>${dt(t.scheduled_departure)}${l?B` ${l}`:""}${d?B` → ${d}`:""}</span>
            </div>
            <button class="train-details-close" @click="${this._closeTrainDetails}" title="Close" aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="train-details-content">
            <div class="train-details-status ${s}">
              ${n}${_t(t)?B` — ${_t(t)}`:""}
            </div>

            <div class="train-details-grid">
              <div class="train-details-field">
                <span class="field-label">Scheduled departure</span>
                <span class="field-value">${dt(t.scheduled_departure)}</span>
              </div>
              <div class="train-details-field">
                <span class="field-label">Expected departure</span>
                <span class="field-value">${o?dt(t.expected_departure):t.expected_departure||"—"}</span>
              </div>
              ${t.scheduled_arrival?B`
                <div class="train-details-field">
                  <span class="field-label">Scheduled arrival</span>
                  <span class="field-value">${dt(t.scheduled_arrival)}</span>
                </div>
              `:""}
              ${t.estimated_arrival?B`
                <div class="train-details-field">
                  <span class="field-label">Estimated arrival</span>
                  <span class="field-value">${dt(t.estimated_arrival)}</span>
                </div>
              `:""}
              <div class="train-details-field">
                <span class="field-label">Platform</span>
                <span class="field-value">${t.platform||"—"}</span>
              </div>
              <div class="train-details-field">
                <span class="field-label">Operator</span>
                <span class="field-value">${t.operator||"—"}</span>
              </div>
              ${t.service_type?B`
                <div class="train-details-field">
                  <span class="field-label">Service type</span>
                  <span class="field-value">${t.service_type}</span>
                </div>
              `:""}
              ${t.journey_duration?B`
                <div class="train-details-field">
                  <span class="field-label">Journey time</span>
                  <span class="field-value">${vt(t.journey_duration)}${t.journey_time_approx?" (approx)":""}</span>
                </div>
              `:""}
            </div>

            ${t.calling_points&&t.calling_points.length?B`
              <div class="train-details-section">
                <div class="train-details-section-title">Calling at</div>
                <div class="train-details-calling-points">${ft(t.calling_points,t.calling_points.length)}</div>
              </div>
            `:""}

            ${a.length?B`
              <div class="train-details-section">
                <div class="train-details-section-title">Additional information</div>
                <div class="train-details-grid">
                  ${a.map(t=>B`
                    <div class="train-details-field">
                      <span class="field-label">${t.label}</span>
                      <span class="field-value">${t.value}</span>
                    </div>
                  `)}
                </div>
              </div>
            `:""}
          </div>

          ${e?B`
            <div class="train-details-footer">
              <button class="train-details-history-link" @click="${()=>this._showMoreInfo(t)}">
                <ha-icon icon="mdi:chart-line"></ha-icon>
                View sensor history
              </button>
            </div>
          `:""}
        </div>
      </div>
    `}_openUrl(t){const e=this.config.tap_action?.url_path;if(e)window.open(e,"_blank");else{const t=`https://www.nationalrail.co.uk/journey-planner/?from=${this._origin||""}&to=${this._destination||""}`;window.open(t,"_blank")}}_navigate(t){const e=this.config.tap_action?.navigation_path;if(e){window.history.pushState(null,"",e);const t=new Event("location-changed",{bubbles:!0,composed:!0});this.dispatchEvent(t)}}_handleTouchStart(t){const e=t.currentTarget;e._pressTimer=setTimeout(()=>{e._pressTimer=null,this._handleHold()},500)}_handleTouchEnd(t){const e=t.currentTarget;e._pressTimer&&(clearTimeout(e._pressTimer),e._pressTimer=null)}_handleTouchMove(t){const e=t.currentTarget;e._pressTimer&&(clearTimeout(e._pressTimer),e._pressTimer=null)}_handleHold(){"refresh"===(this.config.hold_action?.action||"refresh")&&this._refreshData()}_refreshData(){this._hass&&(this._hass.callService("homeassistant","update_entity",{entity_id:this.config.entity}),this._showRefreshFeedback())}_showRefreshFeedback(){this._toastTimer&&(clearTimeout(this._toastTimer),this._toastTimer=null),this._toastElement&&(this._toastElement.remove(),this._toastElement=null);const t=document.createElement("div");t.className="refresh-toast",t.textContent="Refreshing...",this.shadowRoot.appendChild(t),this._toastElement=t,this._toastTimer=setTimeout(()=>{this._toastTimer=null,this._toastElement=null,t.isConnected&&t.remove()},2e3)}disconnectedCallback(){super.disconnectedCallback(),this._toastTimer&&(clearTimeout(this._toastTimer),this._toastTimer=null),this._toastElement&&(this._toastElement.remove(),this._toastElement=null),this._trainDetailsEscHandler&&document.removeEventListener("keydown",this._trainDetailsEscHandler)}static getConfigElement(){return document.createElement("my-rail-commute-card-editor")}static getStubConfig(){return{entity:"",view:"full",show_platform:!0,show_operator:!0,show_calling_points:!1}}}customElements.define("my-rail-commute-card",Ot),window.customCards=window.customCards||[],window.customCards.push({type:"my-rail-commute-card",name:"My Rail Commute Card",description:"Display My Rail Commute departure information in a beautiful station-board interface",preview:!0,documentationURL:"https://github.com/adamf83/lovelace-my-rail-commute-card"});export{Ot as default};
