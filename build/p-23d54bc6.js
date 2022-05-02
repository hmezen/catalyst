var e=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof global!=="undefined"?global:typeof self!=="undefined"?self:{};function n(e,n,o){return o={path:n,exports:{},require:function(e,n){return t()}},e(o,o.exports),o.exports}function t(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var o=n((function(n){(function(e,t){if(n.exports){n.exports=t()}else{e.log=t()}})(e,(function(){var e=function(){};var n="undefined";var t=typeof window!==n&&typeof window.navigator!==n&&/Trident\/|MSIE /.test(window.navigator.userAgent);var o=["trace","debug","info","warn","error"];function i(e,n){var t=e[n];if(typeof t.bind==="function"){return t.bind(e)}else{try{return Function.prototype.bind.call(t,e)}catch(n){return function(){return Function.prototype.apply.apply(t,[e,arguments])}}}}function r(){if(console.log){if(console.log.apply){console.log.apply(console,arguments)}else{Function.prototype.apply.apply(console.log,[console,arguments])}}if(console.trace)console.trace()}function s(o){if(o==="debug"){o="log"}if(typeof console===n){return false}else if(o==="trace"&&t){return r}else if(console[o]!==undefined){return i(console,o)}else if(console.log!==undefined){return i(console,"log")}else{return e}}function a(n,t){for(var i=0;i<o.length;i++){var r=o[i];this[r]=i<n?e:this.methodFactory(r,n,t)}this.log=this.debug}function c(e,t,o){return function(){if(typeof console!==n){a.call(this,t,o);this[e].apply(this,arguments)}}}function u(e,n,t){return s(e)||c.apply(this,arguments)}function f(e,t,i){var r=this;var s;t=t==null?"WARN":t;var c="loglevel";if(typeof e==="string"){c+=":"+e}else if(typeof e==="symbol"){c=undefined}function f(e){var t=(o[e]||"silent").toUpperCase();if(typeof window===n||!c)return;try{window.localStorage[c]=t;return}catch(e){}try{window.document.cookie=encodeURIComponent(c)+"="+t+";"}catch(e){}}function d(){var e;if(typeof window===n||!c)return;try{e=window.localStorage[c]}catch(e){}if(typeof e===n){try{var t=window.document.cookie;var o=t.indexOf(encodeURIComponent(c)+"=");if(o!==-1){e=/^([^;]+)/.exec(t.slice(o))[1]}}catch(e){}}if(r.levels[e]===undefined){e=undefined}return e}function l(){if(typeof window===n||!c)return;try{window.localStorage.removeItem(c);return}catch(e){}try{window.document.cookie=encodeURIComponent(c)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}r.name=e;r.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5};r.methodFactory=i||u;r.getLevel=function(){return s};r.setLevel=function(t,o){if(typeof t==="string"&&r.levels[t.toUpperCase()]!==undefined){t=r.levels[t.toUpperCase()]}if(typeof t==="number"&&t>=0&&t<=r.levels.SILENT){s=t;if(o!==false){f(t)}a.call(r,t,e);if(typeof console===n&&t<r.levels.SILENT){return"No console available for logging"}}else{throw"log.setLevel() called with invalid level: "+t}};r.setDefaultLevel=function(e){t=e;if(!d()){r.setLevel(e,false)}};r.resetLevel=function(){r.setLevel(t,false);l()};r.enableAll=function(e){r.setLevel(r.levels.TRACE,e)};r.disableAll=function(e){r.setLevel(r.levels.SILENT,e)};var w=d();if(w==null){w=t}r.setLevel(w,false)}var d=new f;var l={};d.getLogger=function e(n){if(typeof n!=="symbol"&&typeof n!=="string"||n===""){throw new TypeError("You must supply a name when creating a logger.")}var t=l[n];if(!t){t=l[n]=new f(n,d.getLevel(),d.methodFactory)}return t};var w=typeof window!==n?window.log:undefined;d.noConflict=function(){if(typeof window!==n&&window.log===d){window.log=w}return d};d.getLoggers=function e(){return l};d["default"]=d;return d}))}));class i{constructor(){this.lang="en";this.messages=new Map}static getInstance(){if(!i.instance){i.instance=new i}return i.instance}getLanguage(){return this.lang}setLanguage(e){this.lang=e}getMessage(e){var n;const t=(n=this.messages.get(this.lang))===null||n===void 0?void 0:n.get(e);if(!t){o.error(`[CatI18nRegistry] Unknown message for lang ${this.lang}: ${e}`)}return t}addMessage(e,n,t){this.getDict(e).set(n,t);o.info(`[CatI18nRegistry] Added message for lang ${e}: ${n}`);window.dispatchEvent(this.buildEvent("cat-i18n-added",{lang:e,key:n}));return this}addMessages(e,n){this.messages.set(e,Object.assign(Object.assign({},this.getDict(e)),n));o.info(`[CatI18nRegistry] Added message for lang ${e}: ${Object.keys(n).concat(", ")}`);window.dispatchEvent(this.buildEvent("cat-i18n-added",{lang:e,keys:Object.keys(n)}));return this}removeMessage(e,n){this.getDict(e).delete(n);o.info(`[CatI18nRegistry] Removed message for lang ${e}: ${n}`);window.dispatchEvent(this.buildEvent("cat-i18n-removed",{lang:e,key:n}));return this}removeMessages(e,n){const t=this.getDict(e);n.forEach((e=>t.delete(e)));o.info(`[CatI18nRegistry] Removed messages for lang ${e}: ${n.concat(", ")}`);window.dispatchEvent(this.buildEvent("cat-i18n-added",{lang:e,keys:n}));return this}buildEvent(e,n){return new CustomEvent(e,{bubbles:true,composed:true,detail:n})}getDict(e){let n=this.messages.get(e);if(!n){n=new Map;this.messages.set(e,n)}return n}}class r{constructor(){this.icons=new Map}static getInstance(){if(!r.instance){r.instance=new r}return r.instance}getIcon(e,n){const t=this.icons.get(this.buildName(e,n));if(!t){o.error(`[CatIconRegistry] Unknown icon${n?` in set ${n}`:""}: ${e}`)}return t}addIcon(e,n,t){this.icons.set(this.buildName(e,t),n);o.info(`[CatIconRegistry] Added icon${t?` to set ${t}`:""}: ${e}`);window.dispatchEvent(this.buildEvent("cat-icon-added",{name:e,setName:t}));return this}addIcons(e,n){Object.entries(e).forEach((([e,t])=>this.icons.set(this.buildName(e,n),t)));o.info(`[CatIconRegistry] Added icons${n?` to set ${n}`:""}: ${Object.keys(e).concat(", ")}`);window.dispatchEvent(this.buildEvent("cat-icons-added",{names:Object.keys(e),setName:n}));return this}removeIcon(e,n){this.icons.delete(this.buildName(e,n));o.info(`[CatIconRegistry] Removed icon${n?` from set ${n}`:""}: ${e}`);window.dispatchEvent(this.buildEvent("cat-icon-removed",{name:e,setName:n}));return this}removeIcons(e,n){e.forEach((e=>this.icons.delete(this.buildName(e,n))));o.info(`[CatIconRegistry] Removed icons${n?` from set ${n}`:""}: ${e.concat(", ")}`);window.dispatchEvent(this.buildEvent("cat-icons-removed",{names:e,setName:n}));return this}buildName(e,n){return n?`${n}:name`:e}buildEvent(e,n){return new CustomEvent(e,{bubbles:true,composed:true,detail:n})}}export{r as C,i as a,o as l};
//# sourceMappingURL=p-23d54bc6.js.map