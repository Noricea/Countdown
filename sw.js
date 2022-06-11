self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./index.html",
                "./manifest.json",
                "./src/index.js",
                "./src/displayTime.js",
                "./src/master.css",
                "./images/bg_fox1.png",
                "./images/logo192.png"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});