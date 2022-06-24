self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        return preloadResponse;
      }

      const networkResponse = await fetch(event.request);
      return networkResponse;
    })());
  }
});
