var CACHE_VERSION = 1;
var CacheKey = {
    reqJokes: 'reqJokes-v' + CACHE_VERSION,
};
self.addEventListener('activate', function (event) {
    // When a new service worker is activate we will clear the existing cache
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName.includes(CacheKey.reqJokes)) {
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    // console.log('Handling fetch event for', event.request.url);

    event.respondWith(
        caches.open(CacheKey.reqJokes).then(function (cache) {
            return cache
                .match(event.request)
                .then(function (response) {
                    if (response) {
                        console.log(' Found response in cache:', response);
                        return response;
                    }
                    return fetch(event.request.clone()).then(function (
                        response
                    ) {
            

                        if (
                            response.status < 400 &&
                            response.url.includes('jokeapi')
                        ) {
                            console.log(
                                '  Caching the response to',
                                event.request.url
                            );
                            cache.put(event.request, response.clone());
                        } 

                        return response;
                    });
                })
                .catch(function (error) {
                    console.error('  Error in fetch handler:', error);

                    throw error;
                });
        })
    );
});
