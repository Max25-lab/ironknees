const CACHE_NAME = 'iron-knees-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // Agrega aquí más rutas si usas CSS/JS/imagenes externas a index.html
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Estrategia cache-first para GET
  if (req.method === 'GET' && (req.destination === 'document' || req.destination === 'script' || req.destination === 'style' || req.destination === 'image' || req.destination === 'font')) {
    event.respondWith(
      caches.match(req).then(cached => {
        return cached || fetch(req).then(resp => {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return resp;
        }).catch(() => caches.match('./index.html'));
      })
    );
  }
});