import cDatePart from "./cDatePart.js";
import showTargetTime from "./showTargetTime.js";
import showRemainingTime from "./showRemainingTime.js";

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

var func = 20;

new showTargetTime(
    document.querySelector(".showTargetTime", 21)
);

new showRemainingTime(
    document.querySelector(".showRemainingTime")
);