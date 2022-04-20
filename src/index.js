if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("ServiceWorker registered!");
        console.log(registration);
    }).catch(error => {
        console.log("ServiceWorker registration failed!");
        console.log(error);
    })
}