(function(){"use strict";var e={8259:function(e,t,n){n.d(t,{_v:function(){return a},d8:function(){return r},ej:function(){return o},lm:function(){return s},nJ:function(){return i}});const r=(e,t,n)=>{let r="";if(n){let e=new Date;e.setTime(e.getTime()+n),r="; expires="+e.toUTCString()}document.cookie=e+"="+(t||"")+r+"; path=/"},o=e=>{let t=e+"=",n=document.cookie.split(";");for(let r=0;r<n.length;r++){let e=n[r];while(" "==e.charAt(0))e=e.substring(1,e.length);if(0==e.indexOf(t))return e.substring(t.length,e.length)}return null},i=e=>{document.cookie=e+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"},a=e=>new Promise((t=>setTimeout(t,e))),s=e=>/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(e)},7441:function(e,t,n){var r=n(9242),o=n(2483),i=n(3396);function a(e,t,n,r,o,a){const s=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(s)}var s=n(8259),u=n(4870),c=n(1921);const l=(0,u.qj)({user:null,time:0,inited:!1,get isLoggedIn(){return!!this.user}}),f=()=>new Promise((async(e,t)=>{try{const t=(await c.Z.getMyInfo()).data;l.user=t,e(t)}catch(n){t(n)}l.inited=!0})),d=async(e=!1)=>{if(!e||confirm("로그아웃 하겠습니까?")){try{c.Z.logout()}catch(t){}await(0,s._v)(100),(0,s.nJ)("authorization"),location.reload()}};var p={state:(0,u.OT)(l),updateUser:f,logout:d},h={provide:{core:p}},g=n(89);const m=(0,g.Z)(h,[["render",a]]);var v=m,b=n(9907);(0,b.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});const y=(0,o.p7)({history:(0,o.PO)("/"),routes:[{path:"/",name:"마이페이지",component:()=>n.e(237).then(n.bind(n,237)),meta:{loginGuard:!0}},{path:"/auth/login",name:"로그인",component:()=>n.e(410).then(n.bind(n,8410))},{path:"/auth/reset-password",name:"비밀번호 재설정",component:()=>n.e(973).then(n.bind(n,973))}]});y.beforeEach((async(e,t,n)=>{document.title=e.name;const r=p.updateUser();if(e.matched.some((e=>e.meta.loginGuard))){if(!p.state.inited)try{await r}catch(o){}if(!p.state.isLoggedIn)return void n("/auth/login")}n()})),(0,r.ri)(v).use(y).mount("#app")},1921:function(e,t,n){var r=n(2482),o=(n(6699),n(8259)),i=n(6265),a=n.n(i);class s{constructor(){(0,r.Z)(this,"axios",void 0),(0,r.Z)(this,"apiUrl","https://ably-frontend-assignment-server.vercel.app/api"),this.axios=a().create(),this.axios.interceptors.request.use((e=>{e.headers={"Content-Type":"application/json",...e.headers};const t=(0,o.ej)("authorization");return t&&(e.headers["Authorization"]=t),e})),this.axios.interceptors.response.use((e=>e),(e=>(![401].includes(e.response.status)&&e&&e.response&&e.response.data&&e.response.data.error&&e.response.data.error.message&&alert(e.response.data.error.message),e)))}login(e){return this.axios.post(`${this.apiUrl}/login`,e)}logout(){return this.axios.post(`${this.apiUrl}/logout`)}getMyInfo(){return this.axios.get(`${this.apiUrl}/user`)}resetPw1(e){return this.axios.get(`${this.apiUrl}/reset-password`,{params:{email:e.email}})}resetPw2(e){return this.axios.post(`${this.apiUrl}/reset-password`,e)}resetPw3(e){return this.axios.patch(`${this.apiUrl}/reset-password`,e)}}t["Z"]=new s}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var a=1/0;for(l=0;l<e.length;l++){r=e[l][0],o=e[l][1],i=e[l][2];for(var s=!0,u=0;u<r.length;u++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(s=!1,i<a&&(a=i));if(s){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{237:"02b61068",410:"9323d995",973:"47c49d59"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{237:"8ef8270a",410:"655b5949",973:"56a951b3"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="vue:";n.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var s,u;if(void 0!==i)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var f=c[l];if(f.getAttribute("src")==r||f.getAttribute("data-webpack")==t+i){s=f;break}}s||(u=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=r),e[r]=[o];var d=function(t,n){s.onerror=s.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=d.bind(null,s.onerror),s.onload=d.bind(null,s.onload),u&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=a,u.request=s,o.parentNode.removeChild(o),r(u)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var a=n.miniCssF(r),s=n.p+a;if(t(a,s))return o();e(r,s,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={237:1,410:1,973:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var a=n.p+n.u(t),s=new Error,u=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,o[1](s)}};n.l(a,u,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,a=r[0],s=r[1],u=r[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(u)var l=u(n)}for(t&&t(r);c<a.length;c++)i=a[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},r=self["webpackChunkvue"]=self["webpackChunkvue"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(7441)}));r=n.O(r)})();
//# sourceMappingURL=app.db6de384.js.map