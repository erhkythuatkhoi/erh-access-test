/* QLDA only – no changes to other apps, caches or registrations. */
const CACHE='erh-qlda-installer-v5';
const SCOPE='/erh-access-test/cai-app-qlda/';
const FILES=['./index.html','./index.html?source=pwa','./installer.js?v=5','./launcher-config.js?v=5','./manifest.webmanifest?v=4','./icon-192.png?v=4','./icon-512.png?v=4','./icon-maskable-512.png?v=4','./apple-touch-icon.png?v=4','./favicon.png?v=4'];
const allowed=new URL(self.registration.scope).pathname===SCOPE;
self.addEventListener('install',e=>{if(!allowed){e.waitUntil(Promise.reject(new Error('QLDA_WRONG_SCOPE')));return;}e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{if(allowed)e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(!allowed||e.request.method!=='GET'||u.origin!==self.location.origin||!u.pathname.startsWith(SCOPE))return;const asset=FILES.find(f=>new URL(f,self.registration.scope).href===u.href);if(!asset)return;e.respondWith(fetch(e.request).catch(async()=>{const c=await caches.open(CACHE);return (await c.match(e.request))||Response.error();}));});
