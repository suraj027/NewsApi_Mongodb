if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("SW Registered!");
        console.log(registration);
    }).catch(error =>{
        console.log("SW Registration Failed!");
        console.log(error);
    })
}

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js', { scope: '/' })
//         .then((registration) => {
//             const data = {
//                 type: 'CACHE_URLS',
//                 payload: [
//                     location.href,
//                     ...performance.getEntriesByType('resource').map((r) => r.name)
//                 ]
//             };
//             registration.installing.postMessage(data);
//         })
//         .catch((err) => console.log('SW registration FAIL:', err));
// }