// self.addEventListener("install", e=>{
//     e.waitUntil(
//         caches.open("static").then(caches =>{
//             return cache.addAll(["/", "/src/views/index.ejs"]);
//         })
//     );
// });

// self.addEventListener("fetch", e=>{
//     console.log(`Intercepting fetch request for: ${e.request.url}`);
// })


const KEY = 'key';

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(KEY)
                .then( (cache) => {
                    return cache.addAll(event.data.payload);
                })
        );
    }
});

self.addEventListener("fetch", e=>{
    console.log(`Intercepting fetch request for: ${e.request.url}`);
})