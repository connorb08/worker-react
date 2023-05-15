if ('serviceWorker' in navigator) {
    let _registration: ServiceWorkerRegistration

    const registerServiceWorker = async () => {
        _registration = await navigator.serviceWorker.register('./service-worker.js')
    }

    registerServiceWorker()
}

// console.log('service worker allowed, attempting to fetch new')

// const currentlyControlled = navigator.serviceWorker.controller
// // const currentWorker = await navigator.serviceWorker.getRegistration('/')

// if (!currentlyControlled) {
//     navigator.serviceWorker.register('./service-worker.js', { scope: '/' }).then((registration) => {
//         console.log('Service Worker Registered')
//     })
// } else {
//     // currentWorker
//     //     .unregister()
//     //     .then((success) => {
//     //         if (success) {
//     //             console.log('Service Worker Unregistered')
//     //             navigator.serviceWorker.register('./service-worker.js', { scope: '/' }).then((registration) => {
//     //                 console.log('Service Worker Registered')
//     //             })
//     //         }
//     //     })
//     //     .catch((error) => {
//     //         console.log(error)
//     //     })
// }
