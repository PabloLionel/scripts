const VERSION = /* string */ 'v1';
const RESOURCES = /* string[] */ [];
const getCache = (() => {
  let CACHE;
  return async () => {
    if (CACHE) {
      return CACHE;
    }
    CACHE = await caches.open(VERSION);
    return CACHE;
  };
})();
const preCache = async () => {
  const cache = await getCache();
  return cache.addAll(RESOURCES);
};
const cachedResponse = async (request) => {
  const cache = await getCache();
  const response = await cache.match(request);
  return response || fetch(request);
};
const updateCache = async (request) => {
  const cache = await getCache();
  const response = await fetch(request);
  return cache.put(request, response);
};
self.addEventListener('install', (e) => e.waitUntil(preCache()));
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const { method } = request;
  if (method !== 'GET') {
    return;
  }
  // buscar en cache
  e.respodWith(cachedResponse(request));
  // actualizar en cache
  e.waitUntil(updateCache(request));
});
