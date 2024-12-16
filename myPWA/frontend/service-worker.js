const CACHE_NAME = 'recipe-cache-v1';
const urlsToCache = [
     '/',
    
   
    '/css/styleminify.css',
    '/css/recipe.css',
    '/css/login.css',
    '/css/responsive.css',
 
    '/manifest.json',
    '/js/indexminify.js',
    '/js/login.js',
    
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',

    '/img/cheesepizza.webp',
    '/img/cookies-6.webp',
    '/img/nacho.webp',
    '/img/shrimp.webp',
    '/img/cookies-7.webp',
    '/img/recipe/mexicanpasta.webp',
    '/img/recipe/bruschetta.webp',
    '/img/recipe/periperichicken.webp',
    '/img/asian.webp',

 



];


// Install the service worker
// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});




// Fetch requests
// Fetch and serve cached files
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });

  


// Activate the service worker


// Activate and clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

