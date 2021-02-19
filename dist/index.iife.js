var Router=function(){"use strict";function t(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function n(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function e(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}function r(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function a(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(t){if("string"==typeof t)return r(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?r(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var a=0,o=function(){};return{s:o,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,l=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return u=t.done,t},e:function(t){l=!0,i=t},f:function(){try{u||null==e.return||e.return()}finally{if(l)throw i}}}}var o=function(t){return t.length>1&&t.endsWith("/")?t.slice(0,-1):t},i=function(){function n(e,r){t(this,n),e=o(e),this.path=e,this.action=r,this.catchAll="*"===e;var a=this._parsePattern(e)||{},i=a.regExp,u=a.keys;this.regExp=i,this.keys=u}return e(n,[{key:"_parsePattern",value:function(t){var n,e=null===(n=t.match(/(:[^/]+)/g))||void 0===n?void 0:n.map((function(t){return t.substr(1)}));return e&&{keys:e,regExp:new RegExp("^"+t.replace(/(:[^/]+)/g,"([^/]+)")+"$")}}},{key:"match",value:function(t){return void 0!==t&&(this.regExp?this._getParams(t.match(this.regExp)):(this.catchAll||t===this.path)&&{})}},{key:"_getParams",value:function(t){if(t){var n={};return this.keys.forEach((function(e,r){return n[e]=t[r+1]})),n}}}]),n}();return function(){function n(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=r.routes,o=void 0===a?[]:a,i=r.scrollRestoration,u=void 0===i?"manual":i;t(this,n),this.routes=[],this.currentRoute=null,o.forEach((function(t){var n=t.path,r=t.action;return e.route(n,r)})),window.history.scrollRestoration=u,window.addEventListener("popstate",(function(){return e._handleChange(window.location.pathname)}))}return e(n,[{key:"route",value:function(t,n){this.routes.push(new i(t,n))}},{key:"push",value:function(t){window.history.pushState(null,null,o(t)),this._handleChange(t)}},{key:"replace",value:function(t){window.history.replaceState(null,null,o(t)),this._handleChange(t)}},{key:"init",value:function(){this._handleChange(window.location.pathname,!0)}},{key:"_handleChange",value:function(t){var n,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=a(this.routes);try{for(r.s();!(n=r.n()).done;){var o=n.value,i=o.match(t);if(i){this.currentRoute={path:t,params:i},o.action(i,e);break}}}catch(t){r.e(t)}finally{r.f()}}}]),n}()}();
//# sourceMappingURL=index.iife.js.map
