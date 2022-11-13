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


const dynamicCache = 'site-dynamic v1'
self.addEventListener('fetch', evt =>{
    evt.respondWith(
        caches.match(evt.request).then(cacheRes =>{
            return cacheRes || fetch(evt.request).then(fetchRes =>{
                return caches.open(dynamicCache).then(cache =>{
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    )
});














// const CACHE_NAME = "version 1.0";
// const urlsToCache =[ "forgot.ejs", "login.ejs", "news.ejs", "newsSearch.ejs", "newsSingle.ejs", "news-website.code-workspace", "app.js", "aos.css", "bootstrap", "style.css",  "bootstrap-datepicker.css","offline.html", "bootstrap.min.css.mapp", "jquery-ui.css", "jquery.fancybox.min.css", "jquery.mb.YTPlayer.min.css", "magnific-popup.css", "mediaelmentplayer.css", "owl.carousel.min.css", "owl.theme.default.min.css", "style_.css", "style.css.map", "styles.scss", ""];

// this.addEventListener('install', (event)=>{
//     event.waitUnitl(
//         caches.open(CACHE_NAME).then((cache)=>{
//             console.log("Opened Cache");
//             return cache.addAll(urlsToCache);

//         })
//     )
// })

// this.addEventListener("fetch", (event)=>{
//     event.respondWith(
//         caches.match(event.request).then((res)=>{
//             return fetch(event.request).catch(()=>caches.match('offline.html'))
//         })
//     )
// })

// this.addEventListener('activate', (event)=>{
//     const cacheWhiteList =[]
//     cacheWhiteList.push(CACHE_NAME)
//     event.waitUnitl(caches.keys().then((cacheNames)=> Promise.all(
//         cacheNames.map((cacheName)=>{
//             if(!cacheWhiteList.includes(cacheName)){
//                 return caches.delete(cacheName);
//             }
//         })
//     )))
// })



// const staticCacheName = 'site';
// const assets = [
//     '/',
//     aos.css',
//     '/css/bootstrap-datepicker.css',
//     '/css/bootstrap.min.css',
//     '/css/bootstrap.min.css.map',
//     '/css/jquery-ui.css',
//     '/css/jquery.fancybox.min.css',
//     "/src/views.login.ejs",
//     "/src/views.login.ejs",
//     "/src/views.login.ejs"

// ]

// self.addEventListener("install", e=>{
//     e.waitUntil(
//         caches.open(staticCacheName).then(caches =>{
//             console.log('caching shell assets')
//             return cache.addAll([assets]);
//         })
//     );
// });

// self.addEventListener("fetch", e=>{
//     console.log(`Intercepting fetch request for: ${e.request.url}`);
// })








// const KEY = 'key';

// self.addEventListener('install', (event) => {
//     event.waitUntil(self.skipWaiting());
// });

// self.addEventListener('message', (event) => {
//     if (event.data.type === 'CACHE_URLS') {
//         event.waitUntil(
//             caches.open(KEY)
//                 .then( (cache) => {
//                     return cache.addAll(event.data.payload);
//                 })
//         );
//     }
// });

// self.addEventListener("fetch", e=>{
//     console.log(`Intercepting fetch request for: ${e.request.url}`);
// })