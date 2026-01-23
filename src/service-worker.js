const CACHE_NAME = "static-cache-v1";
const API_CACHE = "api-cache-v1";
const STATIC_FILES = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  // add other static files here if needed
];

// Install event - cache static files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_FILES)),
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== API_CACHE)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch event - handle requests
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // 1️⃣ Handle API requests
  if (request.url.includes("/api/")) {
    event.respondWith(
      caches.open(API_CACHE).then(
        (cache) =>
          fetch(request)
            .then((response) => {
              cache.put(request, response.clone()); // save latest response
              return response;
            })
            .catch(() => cache.match(request)), // fallback if offline
      ),
    );
    return;
  }

  // 2️⃣ Handle static files
  event.respondWith(
    caches
      .match(request)
      .then((cachedResponse) => cachedResponse || fetch(request)),
  );
});
