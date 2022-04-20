import cDatePart from "./cDatePart.js";
import showTargetTime from "./showTargetTime.js";

if ("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("ServiceWorker registered!");
        console.log(registration);
    }).catch(error => {
        console.log("ServiceWorker registration failed!");
        console.log(error);
    })
}

new cDatePart(
    document.querySelector(".showCurrentDate")
);

new showTargetTime(
    document.querySelector(".showTargetTime")
);

new showRemainingTime(
    document.querySelector(".showRemainingTime")
);