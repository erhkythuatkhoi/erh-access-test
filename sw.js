/* ERH App Tong PWA installer only: scope /erh-access-test/cai-app-tong/.
   Do NOT cache or intercept app-tong-test.html, transport.js or Apps Script. */
const ERH_CACHE = 'erh-app-tong-installer-v1';
const ASSETS = ['./', './index.html', './pwa-start.html', './launcher-config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(ERH_CACHE);
    await cache.addAll(ASSETS);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('erh-app-tong-installer-') && k !== ERH_CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const scopePath = new URL(self.registration.scope).pathname;
  if (!new URL(req.url).pathname.startsWith(scopePath)) return;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});
