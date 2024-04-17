import{s as he,z as P,A as He,H as ze,B as Ne,b as A,C as Oe,f as _,D as Z,i as D,n as ee,E as te,O as Te,e as k,a as I,t as K,c as C,q,g as V,d as W,h as g,j as b,r as Ue,u as Ge,P as Pe,Q as Re,R as Qe,v as Fe,T as xe,M as Le,w as Je,l as ye,N as Ke,k as ge,m as We,y as we}from"../chunks/scheduler.6a9d17f6.js";import{S as me,i as _e,c as R,a as Q,m as F,t as M,d as z,f as ue,e as J,g as de,j as ke}from"../chunks/index.f8ec6462.js";import{e as se}from"../chunks/each.81050b20.js";import{b as j}from"../chunks/singletons.dcb5d507.js";import{c as Xe}from"../chunks/clickOutside.d00b6908.js";import{a as Ye,g as Ce}from"../chunks/navigation.bcbcd3d3.js";import{p as Ze}from"../chunks/stores.c2158893.js";import{u as et}from"../chunks/settings.053bb39b.js";import{C as tt}from"../chunks/close.5676f196.js";import{g as qe}from"../chunks/spread.84d39b6c.js";import{C as st}from"../chunks/checkmark.c1ac77be.js";import{A as at}from"../chunks/add.51f471f2.js";import{a as lt,f as rt}from"../chunks/index.e2b52378.js";function nt(a){let e,t,s='<path fill="currentColor" d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6H10z"/>',l=[{viewBox:"0 0 32 32"},{width:"1.2em"},{height:"1.2em"},a[0]],o={};for(let n=0;n<l.length;n+=1)o=P(o,l[n]);return{c(){e=He("svg"),t=new ze(!0),this.h()},l(n){e=Ne(n,"svg",{viewBox:!0,width:!0,height:!0});var f=A(e);t=Oe(f,!0),f.forEach(_),this.h()},h(){t.a=null,Z(e,o)},m(n,f){D(n,e,f),t.m(s,e)},p(n,[f]){Z(e,o=qe(l,[{viewBox:"0 0 32 32"},{width:"1.2em"},{height:"1.2em"},f&1&&n[0]]))},i:ee,o:ee,d(n){n&&_(e)}}}function it(a,e,t){return a.$$set=s=>{t(0,e=P(P({},e),te(s)))},e=te(e),[e]}class ot extends me{constructor(e){super(),_e(this,e,it,nt,he,{})}}function ft(a){let e,t,s='<path fill="currentColor" d="M16 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z"/>',l=[{viewBox:"0 0 32 32"},{width:"1.2em"},{height:"1.2em"},a[0]],o={};for(let n=0;n<l.length;n+=1)o=P(o,l[n]);return{c(){e=He("svg"),t=new ze(!0),this.h()},l(n){e=Ne(n,"svg",{viewBox:!0,width:!0,height:!0});var f=A(e);t=Oe(f,!0),f.forEach(_),this.h()},h(){t.a=null,Z(e,o)},m(n,f){D(n,e,f),t.m(s,e)},p(n,[f]){Z(e,o=qe(l,[{viewBox:"0 0 32 32"},{width:"1.2em"},{height:"1.2em"},f&1&&n[0]]))},i:ee,o:ee,d(n){n&&_(e)}}}function ct(a,e,t){return a.$$set=s=>{t(0,e=P(P({},e),te(s)))},e=te(e),[e]}class ut extends me{constructor(e){super(),_e(this,e,ct,ft,he,{})}}function $e(a,e,t){const s=a.slice();return s[11]=e[t],s}function Ee(a,e,t){const s=a.slice();return s[14]=e[t],s}function Se(a){let e,t="Active";return{c(){e=k("div"),e.textContent=t,this.h()},l(s){e=C(s,"DIV",{class:!0,"data-svelte-h":!0}),q(e)!=="svelte-w9dxal"&&(e.textContent=t),this.h()},h(){g(e,"class","ml-auto rounded-lg bg-black px-2 py-1.5 text-xs font-semibold leading-none text-white")},m(s,l){D(s,e,l)},d(s){s&&_(e)}}}function Ae(a){let e,t,s=a[14].displayName+"",l,o,n,f,d,c=a[14].id===a[4].activeModel&&Se();return{c(){e=k("a"),t=k("div"),l=K(s),o=I(),c&&c.c(),n=I(),this.h()},l(m){e=C(m,"A",{href:!0,class:!0});var p=A(e);t=C(p,"DIV",{class:!0});var u=A(t);l=W(u,s),u.forEach(_),o=V(p),c&&c.l(p),n=V(p),p.forEach(_),this.h()},h(){g(t,"class","truncate"),g(e,"href",f=j+"/settings/"+a[14].id),g(e,"class",d="group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl "+(a[14].id===a[3].params.model?"!bg-gray-100 !text-gray-800":""))},m(m,p){D(m,e,p),b(e,t),b(t,l),b(e,o),c&&c.m(e,null),b(e,n)},p(m,p){p&1&&s!==(s=m[14].displayName+"")&&ge(l,s),m[14].id===m[4].activeModel?c||(c=Se(),c.c(),c.m(e,n)):c&&(c.d(1),c=null),p&1&&f!==(f=j+"/settings/"+m[14].id)&&g(e,"href",f),p&9&&d!==(d="group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl "+(m[14].id===m[3].params.model?"!bg-gray-100 !text-gray-800":""))&&g(e,"class",d)},d(m){m&&_(e),c&&c.d()}}}function Ie(a){let e,t="Assistants",s,l,o,n,f,d,c,m="Browse Assistants",p,u=(!a[0].loginEnabled||a[0].loginEnabled&&!!a[0].user)&&Ve(a),y=se(a[0].assistants),r=[];for(let i=0;i<y.length;i+=1)r[i]=Me($e(a,y,i));return f=new ot({props:{class:"mr-1.5 shrink-0 text-xs "}}),{c(){e=k("h3"),e.textContent=t,s=I(),u&&u.c(),l=I();for(let i=0;i<r.length;i+=1)r[i].c();o=I(),n=k("a"),R(f.$$.fragment),d=I(),c=k("div"),c.textContent=m,this.h()},l(i){e=C(i,"H3",{class:!0,"data-svelte-h":!0}),q(e)!=="svelte-1amgeip"&&(e.textContent=t),s=V(i),u&&u.l(i),l=V(i);for(let x=0;x<r.length;x+=1)r[x].l(i);o=V(i),n=C(i,"A",{href:!0,class:!0});var v=A(n);Q(f.$$.fragment,v),d=V(v),c=C(v,"DIV",{class:!0,"data-svelte-h":!0}),q(c)!=="svelte-3higaq"&&(c.textContent=m),v.forEach(_),this.h()},h(){g(e,"class","pb-3 pl-3 pt-5 text-[.8rem] text-gray-800 sm:pl-1"),g(c,"class","truncate"),g(n,"href",j+"/assistants"),g(n,"class","group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl")},m(i,v){D(i,e,v),a[9](e),D(i,s,v),u&&u.m(i,v),D(i,l,v);for(let x=0;x<r.length;x+=1)r[x]&&r[x].m(i,v);D(i,o,v),D(i,n,v),F(f,n,null),b(n,d),b(n,c),p=!0},p(i,v){if(!i[0].loginEnabled||i[0].loginEnabled&&i[0].user?u?(u.p(i,v),v&1&&M(u,1)):(u=Ve(i),u.c(),M(u,1),u.m(l.parentNode,l)):u&&(de(),z(u,1,1,()=>{u=null}),ue()),v&25){y=se(i[0].assistants);let x;for(x=0;x<y.length;x+=1){const T=$e(i,y,x);r[x]?r[x].p(T,v):(r[x]=Me(T),r[x].c(),r[x].m(o.parentNode,o))}for(;x<r.length;x+=1)r[x].d(1);r.length=y.length}},i(i){p||(M(u),M(f.$$.fragment,i),p=!0)},o(i){z(u),z(f.$$.fragment,i),p=!1},d(i){i&&(_(e),_(s),_(l),_(o),_(n)),a[9](null),u&&u.d(i),Le(r,i),J(f)}}}function Ve(a){let e,t,s,l,o="Create new assistant",n,f;return t=new at({}),{c(){e=k("a"),R(t.$$.fragment),s=I(),l=k("div"),l.textContent=o,this.h()},l(d){e=C(d,"A",{href:!0,class:!0});var c=A(e);Q(t.$$.fragment,c),s=V(c),l=C(c,"DIV",{class:!0,"data-svelte-h":!0}),q(l)!=="svelte-1d46d2z"&&(l.textContent=o),c.forEach(_),this.h()},h(){g(l,"class","truncate"),g(e,"href",j+"/settings/assistants/new"),g(e,"class",n="group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl "+(a[3].url.pathname===`${j}/settings/assistants/new`?"!bg-gray-100 !text-gray-800":""))},m(d,c){D(d,e,c),F(t,e,null),b(e,s),b(e,l),f=!0},p(d,c){(!f||c&8&&n!==(n="group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl "+(d[3].url.pathname===`${j}/settings/assistants/new`?"!bg-gray-100 !text-gray-800":"")))&&g(e,"class",n)},i(d){f||(M(t.$$.fragment,d),f=!0)},o(d){z(t.$$.fragment,d),f=!1},d(d){d&&_(e),J(t)}}}function dt(a){let e,t=a[11].name[0]+"",s;return{c(){e=k("div"),s=K(t),this.h()},l(l){e=C(l,"DIV",{class:!0});var o=A(e);s=W(o,t),o.forEach(_),this.h()},h(){g(e,"class","flex size-6 items-center justify-center rounded-full bg-gray-300 font-bold uppercase text-gray-500")},m(l,o){D(l,e,o),b(e,s)},p(l,o){o&1&&t!==(t=l[11].name[0]+"")&&ge(s,t)},d(l){l&&_(e)}}}function ht(a){let e,t;return{c(){e=k("img"),this.h()},l(s){e=C(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){we(e.src,t=j+"/settings/assistants/"+a[11]._id.toString()+"/avatar.jpg?hash="+a[11].avatar)||g(e,"src",t),g(e,"alt","Avatar"),g(e,"class","h-6 w-6 rounded-full object-cover")},m(s,l){D(s,e,l)},p(s,l){l&1&&!we(e.src,t=j+"/settings/assistants/"+s[11]._id.toString()+"/avatar.jpg?hash="+s[11].avatar)&&g(e,"src",t)},d(s){s&&_(e)}}}function De(a){let e,t="Active";return{c(){e=k("div"),e.textContent=t,this.h()},l(s){e=C(s,"DIV",{class:!0,"data-svelte-h":!0}),q(e)!=="svelte-1eyowv1"&&(e.textContent=t),this.h()},h(){g(e,"class","ml-auto rounded-lg bg-black px-2 py-1.5 text-xs font-semibold leading-none text-white")},m(s,l){D(s,e,l)},d(s){s&&_(e)}}}function Me(a){let e,t,s,l=a[11].name+"",o,n,f=a[11]._id.toString()===a[4].activeModel,d,c;function m(r,i){return r[11].avatar?ht:dt}let p=m(a),u=p(a),y=f&&De();return{c(){e=k("a"),u.c(),t=I(),s=k("div"),o=K(l),n=I(),y&&y.c(),this.h()},l(r){e=C(r,"A",{href:!0,class:!0});var i=A(e);u.l(i),t=V(i),s=C(i,"DIV",{class:!0});var v=A(s);o=W(v,l),v.forEach(_),n=V(i),y&&y.l(i),i.forEach(_),this.h()},h(){g(s,"class","truncate"),g(e,"href",d=j+"/settings/assistants/"+a[11]._id.toString()),g(e,"class",c="group flex h-10 flex-none items-center gap-2 pl-2 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl "+(a[11]._id.toString()===a[3].params.assistantId?"!bg-gray-100 !text-gray-800":""))},m(r,i){D(r,e,i),u.m(e,null),b(e,t),b(e,s),b(s,o),b(e,n),y&&y.m(e,null)},p(r,i){p===(p=m(r))&&u?u.p(r,i):(u.d(1),u=p(r),u&&(u.c(),u.m(e,t))),i&1&&l!==(l=r[11].name+"")&&ge(o,l),i&17&&(f=r[11]._id.toString()===r[4].activeModel),f?y||(y=De(),y.c(),y.m(e,null)):y&&(y.d(1),y=null),i&1&&d!==(d=j+"/settings/assistants/"+r[11]._id.toString())&&g(e,"href",d),i&9&&c!==(c="group flex h-10 flex-none items-center gap-2 pl-2 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl "+(r[11]._id.toString()===r[3].params.assistantId?"!bg-gray-100 !text-gray-800":""))&&g(e,"class",c)},d(r){r&&_(e),u.d(),y&&y.d()}}}function Be(a){let e,t,s,l;return t=new st({props:{class:"text-green-500"}}),{c(){e=k("div"),R(t.$$.fragment),s=K(`
				Saved`),this.h()},l(o){e=C(o,"DIV",{class:!0});var n=A(e);Q(t.$$.fragment,n),s=W(n,`
				Saved`),n.forEach(_),this.h()},h(){g(e,"class","absolute bottom-4 right-4 m-2 flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-200 px-3 py-1 text-black")},m(o,n){D(o,e,n),F(t,e,null),b(e,s),l=!0},i(o){l||(M(t.$$.fragment,o),l=!0)},o(o){z(t.$$.fragment,o),l=!1},d(o){o&&_(e),J(t)}}}function gt(a){let e,t,s,l,o="Settings",n,f,d,c,m,p,u="Models",y,r,i,v,x,T,X,ae,U,le,Y,re,ne,O,ie,pe;d=new tt({props:{class:"text-xl text-gray-900 hover:text-black"}});let G=se(a[0].models.filter(je)),S=[];for(let h=0;h<G.length;h+=1)S[h]=Ae(Ee(a,G,h));let $=a[0].enableAssistants&&Ie(a);x=new ut({props:{class:"text-sm"}});const oe=a[7].default,H=Te(oe,a,a[6],null);let E=a[4].recentlySaved&&Be();return{c(){e=k("div"),t=k("dialog"),s=k("div"),l=k("h2"),l.textContent=o,n=I(),f=k("button"),R(d.$$.fragment),c=I(),m=k("div"),p=k("h3"),p.textContent=u,y=I();for(let h=0;h<S.length;h+=1)S[h].c();r=I(),$&&$.c(),i=I(),v=k("a"),R(x.$$.fragment),T=K(`
				Application Settings`),ae=I(),U=k("div"),H&&H.c(),le=I(),E&&E.c(),this.h()},l(h){e=C(h,"DIV",{class:!0});var B=A(e);t=C(B,"DIALOG",{class:!0});var w=A(t);s=C(w,"DIV",{class:!0});var L=A(s);l=C(L,"H2",{class:!0,"data-svelte-h":!0}),q(l)!=="svelte-n7oby1"&&(l.textContent=o),n=V(L),f=C(L,"BUTTON",{class:!0});var ve=A(f);Q(d.$$.fragment,ve),ve.forEach(_),L.forEach(_),c=V(w),m=C(w,"DIV",{class:!0});var N=A(m);p=C(N,"H3",{class:!0,"data-svelte-h":!0}),q(p)!=="svelte-165v8hs"&&(p.textContent=u),y=V(N);for(let ce=0;ce<S.length;ce+=1)S[ce].l(N);r=V(N),$&&$.l(N),i=V(N),v=C(N,"A",{href:!0,class:!0});var fe=A(v);Q(x.$$.fragment,fe),T=W(fe,`
				Application Settings`),fe.forEach(_),N.forEach(_),ae=V(w),U=C(w,"DIV",{class:!0});var be=A(U);H&&H.l(be),be.forEach(_),le=V(w),E&&E.l(w),w.forEach(_),B.forEach(_),this.h()},h(){g(l,"class","text-xl font-bold"),g(f,"class","btn rounded-lg"),g(s,"class","col-span-1 mb-4 flex items-center justify-between md:col-span-3"),g(p,"class","pb-3 pl-3 pt-2 text-[.8rem] text-gray-800 sm:pl-1"),g(v,"href",j+"/settings"),g(v,"class",X="group mt-auto flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 max-md:order-first md:rounded-xl "+(a[3].url.pathname===`${j}/settings`?"!bg-gray-100 !text-gray-800":"")),g(m,"class","col-span-1 flex flex-col overflow-y-auto whitespace-nowrap max-md:-mx-4 max-md:h-[245px] max-md:border max-md:border-b-2 md:pr-6"),g(U,"class","col-span-1 overflow-y-auto px-4 max-md:-mx-4 max-md:pt-6 md:col-span-2"),t.open=!0,g(t,"class","xl: z-10 grid h-[95dvh] w-[90dvw] grid-cols-1 content-start gap-x-8 overflow-hidden rounded-2xl bg-white p-4 shadow-2xl outline-none sm:h-[80dvh] md:grid-cols-3 md:grid-rows-[auto,1fr] md:p-8 xl:w-[1200px] 2xl:h-[70dvh]"),g(e,"class","fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm dark:bg-black/50")},m(h,B){D(h,e,B),b(e,t),b(t,s),b(s,l),b(s,n),b(s,f),F(d,f,null),b(t,c),b(t,m),b(m,p),b(m,y);for(let w=0;w<S.length;w+=1)S[w]&&S[w].m(m,null);b(m,r),$&&$.m(m,null),b(m,i),b(m,v),F(x,v,null),b(v,T),b(t,ae),b(t,U),H&&H.m(U,null),b(t,le),E&&E.m(t,null),O=!0,ie||(pe=[Ue(f,"click",a[8]),Ge(Y=Xe.call(null,t,a[10]))],ie=!0)},p(h,[B]){if(B&25){G=se(h[0].models.filter(je));let w;for(w=0;w<G.length;w+=1){const L=Ee(h,G,w);S[w]?S[w].p(L,B):(S[w]=Ae(L),S[w].c(),S[w].m(m,r))}for(;w<S.length;w+=1)S[w].d(1);S.length=G.length}h[0].enableAssistants?$?($.p(h,B),B&1&&M($,1)):($=Ie(h),$.c(),M($,1),$.m(m,i)):$&&(de(),z($,1,1,()=>{$=null}),ue()),(!O||B&8&&X!==(X="group mt-auto flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 max-md:order-first md:rounded-xl "+(h[3].url.pathname===`${j}/settings`?"!bg-gray-100 !text-gray-800":"")))&&g(v,"class",X),H&&H.p&&(!O||B&64)&&Pe(H,oe,h,h[6],O?Qe(oe,h[6],B,null):Re(h[6]),null),h[4].recentlySaved?E?B&16&&M(E,1):(E=Be(),E.c(),M(E,1),E.m(t,null)):E&&(de(),z(E,1,1,()=>{E=null}),ue()),Y&&Fe(Y.update)&&B&2&&Y.update.call(null,h[10])},i(h){O||(M(d.$$.fragment,h),M($),M(x.$$.fragment,h),M(H,h),M(E),h&&(re||xe(()=>{re=ke(t,lt,{y:100}),re.start()})),h&&(ne||xe(()=>{ne=ke(e,rt,{}),ne.start()})),O=!0)},o(h){z(d.$$.fragment,h),z($),z(x.$$.fragment,h),z(H,h),z(E),O=!1},d(h){h&&_(e),J(d),Le(S,h),$&&$.d(),J(x),H&&H.d(h),E&&E.d(),ie=!1,Je(pe)}}}const je=a=>!a.unlisted;function mt(a,e,t){let s,l;ye(a,Ze,r=>t(3,s=r));let{$$slots:o={},$$scope:n}=e,{data:f}=e,d=j,c;Ke(()=>{var r;(r=s.params)!=null&&r.assistantId&&c.scrollIntoView()}),Ye(({from:r})=>{r!=null&&r.url.pathname.includes("settings")||t(1,d=(r==null?void 0:r.url.toString())||d)});const m=et();ye(a,m,r=>t(4,l=r));const p=()=>{Ce(d)};function u(r){We[r?"unshift":"push"](()=>{c=r,t(2,c)})}const y=()=>{Ce(d)};return a.$$set=r=>{"data"in r&&t(0,f=r.data),"$$scope"in r&&t(6,n=r.$$scope)},[f,d,c,s,l,m,n,o,p,u,y]}class It extends me{constructor(e){super(),_e(this,e,mt,gt,he,{data:0})}}export{It as component};
