var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'product.js',
    'style.css',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.png',

];

self.addEventListener('install', (e)=>{
    console.log('[service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[service Worker] caching all files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            return r || fetch (e.request).then(function(response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                })
                
            })
        })
    )
});

