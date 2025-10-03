
const CACHE_NAME = 'iron-knees-merged-v2';
const ASSETS = [
  '/ironknees/',
  '/ironknees/index.html',
  '/ironknees/app.html',
  '/ironknees/styles.css',
  '/ironknees/script.js',
  '/ironknees/manifest.json',
  '/ironknees/assets/leaderboard_728x90.png',
  '/ironknees/assets/medrect_300x250.png',
  '/ironknees/assets/skyscraper_160x600.png',
  '/ironknees/assets/sponsor_logo.png',
  '/ironknees/icons/icon-192.png',
  '/ironknees/icons/icon-512.png',
  '/ironknees/icons/maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(hit => hit || fetch(event.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
      return resp;
    }).catch(()=>caches.match('/ironknees/index.html')))
  );
});
