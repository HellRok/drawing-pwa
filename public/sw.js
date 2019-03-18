const version = '0.0.1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(`sw-cache-${version}`).then(function(cache) {
      cache.add('/');
      cache.add('/javascripts/application.js');
      cache.add('/stylesheets/application.css');
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
