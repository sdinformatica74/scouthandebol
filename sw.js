// Scout Handebol - Service Worker
// v167
const CACHE_NAME = 'scout-handebol-v167';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo-scout-handmar.png',
  './handmar.png',
  './athlete-marker.png',
  './game-ball.png',
  './goalie.png',
  './goalkeeper-marker.png',
  './player-red.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // O documento principal é obrigatório; recursos ausentes não invalidam os demais.
      await cache.add('./index.html');
      await Promise.all(APP_SHELL.filter(path => path !== './index.html').map(async (path) => {
        try{ await cache.add(path); }
        catch(error){ console.warn('Recurso indisponível para uso offline:', path, error); }
      }));
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('scout-handebol-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navegação e index: tenta a rede primeiro para não prender o usuário
  // em uma versão antiga; se estiver offline, usa o index salvo.
  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', clone));
          }
          return response;
        })
        .catch(async () => {
          return (await caches.match(request)) ||
                 (await caches.match('./index.html')) ||
                 (await caches.match('./'));
        })
    );
    return;
  }

  // Arquivos locais: resposta rápida pelo cache e atualização silenciosa
  // em segundo plano quando houver rede.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
