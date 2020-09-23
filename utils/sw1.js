/**
 * in main.js
 * @example
 *  if ('serviceWorker' in navigator) {
 *      navigator.serviceWorker
 *          .register('./sw.js')
 *          .then(() => {
 *              console.log('ServiceWorker registrado');
 *          })
 *          .catch((err) => {
 *              console.warn(`Error al registrar el ServiceWorker: ${err}`);
 *          });
 *  }
 */

const CACHE_NAME = 'my_cache_v1';
const urlsToCache = [
  'https:fonts.googleapis.com/css?family=NotoSans:400,700',
  './style.css',
  './app.js',
  './img/img1.png',
  '...',
];

self.addEventListener('install', (e) => {
  // waitUntil = esperaHasta
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache).then(() => self.skipWaiting()))
      .catch((err) => {
        console.warn(`Falla al registrar el sw, error: ${err}`);
      })
  );
});
self.addEventListener('activate', (e) => {
  const CACHE_WHITE_LIST = [CACHE_NAME];
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          if (CACHE_WHITE_LIST.includes(cacheName)) caches.delete(cacheName);
        });
      })
      // Contamos que se termino de actualizar la cache
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWhith(
    caches.match(e.request).then((res) => {
      if (res) return res; // cuando el recurso si esta en cahce.
      return fetch(e.request); // sino pedimos del servidor.
    })
  );
});
// self.addEventListener('')
