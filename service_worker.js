// Name of cache
const CACHE_NAME = 'task-force-cache-v1';

// Files to cache for offline use
const urlsToCache = [
  '/', // Main page
  '/index.html', // Home page
  '/styles.css', // CSS file for styling
  '/script.js', // Main JS file for app
  '/icons/icon-192x192.png', // Small app icon
  '/icons/icon-512x512.png' // Big app icon
];

// Install event - first time the service worker is installed
self.addEventListener('install', (event) => {
  // Wait until caching is finished
  event.waitUntil(
    caches.open(CACHE_NAME) // Open the cache
      .then((cache) => {
        return cache.addAll(urlsToCache); // Add files to cache
      })
  );
});

// Fetch event - happens when we request something (like visiting a page)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request) // Look for the request in the cache
      .then((response) => {
        return response || fetch(event.request); // Use cached if available, else go to the network
      })
  );
});

// Activate event - clears old caches when the service worker updates
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});