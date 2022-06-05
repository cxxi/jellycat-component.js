"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e={};function t(e){return{with:(...t)=>t.reduce(((e,t)=>t(e)),e||class{})}}e.abstract=function(e){return class extends e{static define(e,t){window.Jellycat.components[this.name]={template:e,cache:{}},void 0===customElements.get(`${t}-${this.name.toLowerCase()}`)&&customElements.define(`${t}-${this.name.toLowerCase()}`,this,this._tag?{extends:this._tag}:{})}get methods(){const e=Reflect.getPrototypeOf(this);return Reflect.ownKeys(e).filter((e=>"constructor"!==e))}}},e.lifeCycling=function(e){return class extends e{get keyLifeCycle(){return["down","init","render","behavior","up"]}get currentLifeCycleIndex(){return this.keyLifeCycle.indexOf(this.currentLifeCycle)}async _runLifeCycle(e="down"){try{const t=this.keyLifeCycle;this.currentLifeCycle??=t[0];const n=c(this);function*c(e){yield,yield e._runStep(t[1]),yield e._runStep(t[2]),yield e._runStep(t[3])}let s=n.next();for(;!s.done;)if(this.currentLifeCycle=t[this.currentLifeCycleIndex+1],s=n.next(),s.value&&!0!==await s.value)throw new Error(`LifeCycle ${this.currentLifeCycle} function of ${this.name} does not return true`)}catch(o){console.log(o)}}async _runStep(e){return new Promise((async(t,n)=>{const c=await this[`_${e}`]();t(!this.methods.includes(e)||await this[e](...c))}))}async _init(){return[Jellycat.options]}async _render(){return this.constructor.name in Jellycat.components&&(this.children.length>0&&(this.innerHTML=""),this.appendChild(await this.draw())),[Jellycat.components[this.constructor.name].cache]}async _behavior(){return[Jellycat.globalScope]}}},e.rendering=function(e){return class extends e{get template(){return this.getAttribute("template")}set template(e){return this.setAttribute("template",e),!0}async draw(e="root"){if(this.currentLifeCycleIndex<this.keyLifeCycle.indexOf("render"))throw new Error(`You cannot use draw method before render step (current state: ${this.currentLifeCycle}) of lifeCycle of ${this.constructor.name}`);if(0===Object.keys(Jellycat.components[this.constructor.name].cache).length){let e=await fetch(Jellycat.components[this.constructor.name].template);if(200!=e.status)throw new Error(`Template ${e.statusText} (${e.url})`);const t=await e.text(),n=(new DOMParser).parseFromString(t,"text/html"),c=Array.from(n.querySelectorAll("template")).reduce(((e,t)=>({...e,[t.id]:t})),{});Jellycat.components[this.constructor.name].cache=c}return Jellycat.components[this.constructor.name].cache[null!=this.template?this.template:e].content}drawElement(e,t={},n=[]){const c=document.createElement(e);for(const[e,n]of Object.entries(t))c.setAttribute(e,n);return n.forEach((e=>"string"==typeof e?c.textContent=e:c.appendChild(e))),c}drawFaIcon(e){const t=document.querySelector("body").className.includes("fontawesome"),n=Array.from(document.styleSheets).filter((e=>e.href.includes("font-awesome"))).length>0;if(!t&&!n)throw new Error("FontAwesome is not available on this page, you cannot use drawFaIcon()");const c=document.createElement("i");return c.classList.add("fa-solid",e),c}}},e.providing=function(e){return class extends e{get loading(){return this.hasAttribute("loading")}set loading(e){return e?this.setAttribute("loading",""):this.removeAttribute("loading"),!0}async fetchData(e,t="GET",n=!1){try{if(this.currentLifeCycleIndex<this.keyLifeCycle.indexOf("init"))throw new Error(`You cannot use fetchData method before init step (current state: ${this.currentLifeCycle}) of lifeCycle of ${this.name}`);const n=await fetch(e,{method:t,headers:new Headers({"X-Requested-With":"XMLHttpRequest",accept:"application/json"})});if(n.status>=300)throw new Error(`Fetch error : ${args[0]}`);return await n.json()}catch(e){console.log(e)}}}},window.Jellycat??=new class{constructor(){this.components={},this.globalScope={},this.options={debug:!1},this.factory={JcComponent:class extends(t(HTMLElement).with(...Object.values(e))){constructor(){super(),this._tag=!1}async connectedCallback(){this._runLifeCycle()}},JcDivComponent:class extends(t(HTMLDivElement).with(...Object.values(e))){constructor(){super(),this._tag="div"}async connectedCallback(){this._runLifeCycle()}},JcSpanComponent:class extends(t(HTMLSpanElement).with(...Object.values(e))){constructor(){super(),this._tag="span"}async connectedCallback(){this._runLifeCycle()}},JcUlComponent:class extends(t(HTMLUListElement).with(...Object.values(e))){constructor(){super(),this._tag="ul"}async connectedCallback(){this._runLifeCycle()}},JcLiComponent:class extends(t(HTMLLIElement).with(...Object.values(e))){constructor(){super(),this._tag="li"}async connectedCallback(){this._runLifeCycle()}},JcPComponent:class extends(t(HTMLParagraphElement).with(...Object.values(e))){constructor(){super(),this._tag="p"}async connectedCallback(){this._runLifeCycle()}},JcLabelComponent:class extends(t(HTMLLabelElement).with(...Object.values(e))){constructor(){super(),this._tag="label"}async connectedCallback(){this._runLifeCycle()}}}}};const{JcComponent:n,JcDivComponent:c,JcSpanComponent:s,JcUlComponent:o,JcLiComponent:r,JcPComponent:i,JcLabelComponent:a}=window.Jellycat.factory;exports.JcComponent=n,exports.JcDivComponent=c,exports.JcLabelComponent=a,exports.JcLiComponent=r,exports.JcPComponent=i,exports.JcSpanComponent=s,exports.JcUlComponent=o;
