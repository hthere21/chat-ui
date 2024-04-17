var O=Object.defineProperty;var F=(t,e,n)=>e in t?O(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(F(t,typeof e!="symbol"?e+"":e,n),n);function H(){}const lt=t=>t;function G(t,e){for(const n in e)t[n]=e[n];return t}function at(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function I(t){return t()}function ut(){return Object.create(null)}function z(t){t.forEach(I)}function U(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function _t(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function dt(t){return Object.keys(t).length===0}function j(t,...e){if(t==null){for(const i of e)i(void 0);return H}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ht(t){let e;return j(t,n=>e=n)(),e}function mt(t,e,n){t.$$.on_destroy.push(j(e,n))}function pt(t,e,n,i){if(t){const s=L(t,e,n,i);return t[0](s)}}function L(t,e,n,i){return t[1]&&i?G(n.ctx.slice(),t[1](i(e))):n.ctx}function yt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const o=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)o[l]=e.dirty[l]|s[l];return o}return e.dirty|s}return e.dirty}function gt(t,e,n,i,s,o){if(s){const r=L(e,n,i,o);t.p(r,s)}}function bt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function xt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Et(t,e,n){return t.set(n),e}function Nt(t){return t&&U(t.destroy)?t.destroy:H}function Tt(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let g=!1;function vt(){g=!0}function wt(){g=!1}function W(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function J(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&c.push(u)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const a=e[c].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:W(1,s,R=>e[n[R]].claim_order,a))-1;i[c]=n[u]+1;const A=u+1;n[A]=c,s=Math.max(A,s)}const o=[],r=[];let l=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(o.push(e[c-1]);l>=c;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);o.reverse(),r.sort((c,a)=>c.claim_order-a.claim_order);for(let c=0,a=0;c<r.length;c++){for(;a<o.length&&r[c].claim_order>=o[a].claim_order;)a++;const u=a<o.length?o[a]:null;t.insertBefore(r[c],u)}}function K(t,e){t.appendChild(e)}function Q(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function kt(t){const e=w("style");return e.textContent="/* empty */",V(Q(t),e),e.sheet}function V(t,e){return K(t.head||t,e),e.sheet}function X(t,e){if(g){for(J(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Y(t,e,n){t.insertBefore(e,n||null)}function Z(t,e,n){g&&!n?X(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function N(t){t.parentNode&&t.parentNode.removeChild(t)}function At(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function M(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function k(t){return document.createTextNode(t)}function Ct(){return k(" ")}function Dt(){return k("")}function Ht(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function jt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Lt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function $(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Mt(t,e){for(const n in e)$(t,n,e[n])}function St(t){return t.dataset.svelteH}function Pt(t){return Array.from(t.childNodes)}function S(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,e,n,i,s=!1){S(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function q(t,e,n,i){return P(t,s=>s.nodeName===e,s=>{const o=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||o.push(l.name)}o.forEach(r=>s.removeAttribute(r))},()=>i(e))}function qt(t,e,n){return q(t,e,n,w)}function Bt(t,e,n){return q(t,e,n,M)}function tt(t,e){return P(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>k(e),!0)}function Rt(t){return tt(t," ")}function C(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Ot(t,e){const n=C(t,"HTML_TAG_START",0),i=C(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new b(e);S(t);const s=t.splice(n,i-n+1);N(s[0]),N(s[s.length-1]);const o=s.slice(1,s.length-1);if(o.length===0)return new b(e);for(const r of o)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new b(e,o)}function Ft(t,e){e=""+e,t.data!==e&&(t.data=e)}function Gt(t,e){t.value=e??""}function It(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function zt(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Ut(t){const e=t.querySelector(":checked");return e&&e.__value}function Wt(t,e,n){t.classList.toggle(e,!!n)}function et(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Jt(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const o=s.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(s)):o===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class nt{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=M(n.nodeName):this.e=w(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Y(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(N)}}class b extends nt{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)Z(this.t,this.n[i],n)}}function Kt(t,e){return new t(e)}let y;function x(t){y=t}function h(){if(!y)throw new Error("Function called outside component initialization");return y}function Qt(t){h().$$.on_mount.push(t)}function Vt(t){h().$$.after_update.push(t)}function Xt(t){h().$$.on_destroy.push(t)}function Yt(){const t=h();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const o=et(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,o)}),!o.defaultPrevented}return!0}}function Zt(t,e){return h().$$.context.set(t,e),e}function $t(t){return h().$$.context.get(t)}function te(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const m=[],D=[];let d=[];const T=[],B=Promise.resolve();let v=!1;function it(){v||(v=!0,B.then(rt))}function ee(){return it(),B}function st(t){d.push(t)}function ne(t){T.push(t)}const E=new Set;let _=0;function rt(){if(_!==0)return;const t=y;do{try{for(;_<m.length;){const e=m[_];_++,x(e),ct(e.$$)}}catch(e){throw m.length=0,_=0,e}for(x(null),m.length=0,_=0;D.length;)D.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];E.has(n)||(E.add(n),n())}d.length=0}while(m.length);for(;T.length;)T.pop()();v=!1,E.clear(),x(t)}function ct(t){if(t.fragment!==null){t.update(),z(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(st)}}function ie(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{ee as $,M as A,Bt as B,Ot as C,Mt as D,xt as E,Dt as F,jt as G,b as H,Yt as I,Lt as J,Wt as K,Gt as L,At as M,Qt as N,pt as O,gt as P,bt as Q,yt as R,Xt as S,st as T,lt as U,Tt as V,It as W,$t as X,ht as Y,Zt as Z,Vt as _,Ct as a,Kt as a0,te as a1,Q as a2,kt as a3,et as a4,ut as a5,rt as a6,dt as a7,ie as a8,y as a9,x as aa,I as ab,m as ac,it as ad,vt as ae,wt as af,zt as ag,Ut as ah,at as ai,h as aj,Pt as b,qt as c,tt as d,w as e,N as f,Rt as g,$ as h,Z as i,X as j,Ft as k,mt as l,D as m,H as n,Jt as o,ne as p,St as q,Ht as r,ft as s,k as t,Nt as u,U as v,z as w,Et as x,_t as y,G as z};
