var e=typeof globalThis!=="undefined"?globalThis:typeof window!=="undefined"?window:typeof global!=="undefined"?global:typeof self!=="undefined"?self:{};function n(e,n,o){return o={path:n,exports:{},require:function(e,n){return t()}},e(o,o.exports),o.exports}function t(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var o=n((function(n){(function(e,t){if(n.exports){n.exports=t()}else{e.log=t()}})(e,(function(){var e=function(){};var n="undefined";var t=typeof window!==n&&typeof window.navigator!==n&&/Trident\/|MSIE /.test(window.navigator.userAgent);var o=["trace","debug","info","warn","error"];function i(e,n){var t=e[n];if(typeof t.bind==="function"){return t.bind(e)}else{try{return Function.prototype.bind.call(t,e)}catch(n){return function(){return Function.prototype.apply.apply(t,[e,arguments])}}}}function r(){if(console.log){if(console.log.apply){console.log.apply(console,arguments)}else{Function.prototype.apply.apply(console.log,[console,arguments])}}if(console.trace)console.trace()}function s(o){if(o==="debug"){o="log"}if(typeof console===n){return false}else if(o==="trace"&&t){return r}else if(console[o]!==undefined){return i(console,o)}else if(console.log!==undefined){return i(console,"log")}else{return e}}function c(n,t){for(var i=0;i<o.length;i++){var r=o[i];this[r]=i<n?e:this.methodFactory(r,n,t)}this.log=this.debug}function u(e,t,o){return function(){if(typeof console!==n){c.call(this,t,o);this[e].apply(this,arguments)}}}function a(e,n,t){return s(e)||u.apply(this,arguments)}function f(e,t,i){var r=this;var s;t=t==null?"WARN":t;var u="loglevel";if(typeof e==="string"){u+=":"+e}else if(typeof e==="symbol"){u=undefined}function f(e){var t=(o[e]||"silent").toUpperCase();if(typeof window===n||!u)return;try{window.localStorage[u]=t;return}catch(e){}try{window.document.cookie=encodeURIComponent(u)+"="+t+";"}catch(e){}}function d(){var e;if(typeof window===n||!u)return;try{e=window.localStorage[u]}catch(e){}if(typeof e===n){try{var t=window.document.cookie;var o=t.indexOf(encodeURIComponent(u)+"=");if(o!==-1){e=/^([^;]+)/.exec(t.slice(o))[1]}}catch(e){}}if(r.levels[e]===undefined){e=undefined}return e}function l(){if(typeof window===n||!u)return;try{window.localStorage.removeItem(u);return}catch(e){}try{window.document.cookie=encodeURIComponent(u)+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC"}catch(e){}}r.name=e;r.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5};r.methodFactory=i||a;r.getLevel=function(){return s};r.setLevel=function(t,o){if(typeof t==="string"&&r.levels[t.toUpperCase()]!==undefined){t=r.levels[t.toUpperCase()]}if(typeof t==="number"&&t>=0&&t<=r.levels.SILENT){s=t;if(o!==false){f(t)}c.call(r,t,e);if(typeof console===n&&t<r.levels.SILENT){return"No console available for logging"}}else{throw"log.setLevel() called with invalid level: "+t}};r.setDefaultLevel=function(e){t=e;if(!d()){r.setLevel(e,false)}};r.resetLevel=function(){r.setLevel(t,false);l()};r.enableAll=function(e){r.setLevel(r.levels.TRACE,e)};r.disableAll=function(e){r.setLevel(r.levels.SILENT,e)};var w=d();if(w==null){w=t}r.setLevel(w,false)}var d=new f;var l={};d.getLogger=function e(n){if(typeof n!=="symbol"&&typeof n!=="string"||n===""){throw new TypeError("You must supply a name when creating a logger.")}var t=l[n];if(!t){t=l[n]=new f(n,d.getLevel(),d.methodFactory)}return t};var w=typeof window!==n?window.log:undefined;d.noConflict=function(){if(typeof window!==n&&window.log===d){window.log=w}return d};d.getLoggers=function e(){return l};d["default"]=d;return d}))}));class i{constructor(){this.i18n=new Map}static getInstance(){if(!i.instance){i.instance=new i}return i.instance}set(e){Object.entries(e).forEach((([e,n])=>this.i18n.set(e,n)));o.info(`[CatI18nRegistry] Registered messages`,e);window.dispatchEvent(this.buildEvent("cat-i18n-set",{messages:e}))}clear(){this.i18n.clear();o.info(`[CatI18nRegistry] Cleared messages`);window.dispatchEvent(this.buildEvent("cat-i18n-clear"))}t(e,n){const t=this.i18n.get(e);if(t===undefined){o.error(`[CatI18nRegistry] Unknown message key: ${e}`);return e}return t.replace(/{{\s*([-a-zA-Z._]+)\s*}}/g,((e,t)=>{var o;return`${(o=n===null||n===void 0?void 0:n[t])!==null&&o!==void 0?o:""}`}))}buildEvent(e,n){return new CustomEvent(e,{bubbles:true,composed:true,detail:n})}}const r=i.getInstance();class s{constructor(){this.icons=new Map}static getInstance(){if(!s.instance){s.instance=new s}return s.instance}getIcon(e,n){const t=this.icons.get(this.buildName(e,n));if(!t){o.error(`[CatIconRegistry] Unknown icon${n?` in set ${n}`:""}: ${e}`)}return t}addIcon(e,n,t){this.icons.set(this.buildName(e,t),n);o.info(`[CatIconRegistry] Added icon${t?` to set ${t}`:""}: ${e}`);window.dispatchEvent(this.buildEvent("cat-icon-added",{name:e,setName:t}));return this}addIcons(e,n){Object.entries(e).forEach((([e,t])=>this.icons.set(this.buildName(e,n),t)));o.info(`[CatIconRegistry] Added icons${n?` to set ${n}`:""}: ${Object.keys(e).concat(", ")}`);window.dispatchEvent(this.buildEvent("cat-icons-added",{names:Object.keys(e),setName:n}));return this}removeIcon(e,n){this.icons.delete(this.buildName(e,n));o.info(`[CatIconRegistry] Removed icon${n?` from set ${n}`:""}: ${e}`);window.dispatchEvent(this.buildEvent("cat-icon-removed",{name:e,setName:n}));return this}removeIcons(e,n){e.forEach((e=>this.icons.delete(this.buildName(e,n))));o.info(`[CatIconRegistry] Removed icons${n?` from set ${n}`:""}: ${e.concat(", ")}`);window.dispatchEvent(this.buildEvent("cat-icons-removed",{names:e,setName:n}));return this}buildName(e,n){return n?`${n}:name`:e}buildEvent(e,n){return new CustomEvent(e,{bubbles:true,composed:true,detail:n})}}const c=s.getInstance();export{i as C,e as a,r as b,n as c,c as d,s as e,o as l};
//# sourceMappingURL=p-5865f232.js.map