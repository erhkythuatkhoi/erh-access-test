/* QLDA V8 activation: only this directory; no other cache/registration modifications. */
const SCOPE='/erh-access-test/cai-app-qlda/';
const CACHE='erh-qlda-installer-v8-icons';
const ICONS=['./icon-192.png?v=4','./icon-512.png?v=4','./icon-maskable-512.png?v=4','./apple-touch-icon.png?v=4','./favicon.png?v=4'];
const allowed=new URL(self.registration.scope).pathname===SCOPE;
self.addEventListener('install',e=>{if(!allowed){e.waitUntil(Promise.reject(new Error('QLDA_WRONG_SCOPE')));return;}e.waitUntil(self.skipWaiting());});
self.addEventListener('activate',e=>{if(allowed)e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(!allowed||e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(SCOPE))return;
 if(!ICONS.some(f=>new URL(f,self.registration.scope).href===u.href))return;
 e.respondWith((async()=>{try{const r=await fetch(e.request);if(r.ok){try{const c=await caches.open(CACHE);await c.put(e.request,r.clone());}catch(_){} }return r;}catch(_){const c=await caches.open(CACHE);return (await c.match(e.request))||Response.error();}})());
});
