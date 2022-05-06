//var tH = $("#time");
const dateStorageInput = document.querySelector(".dateStorage");
const timeStorageInput = document.querySelector(".timeStorage");
const button = document.querySelector(".button")

timeStorageInput.value = ((new Date().getHours() + 2) % 24).toString().padStart(2, "0") + ":00";
dateStorageInput.value = new Date().getFullYear().toString().padStart(4, "0") + "-" + 
(new Date().getMonth() + 1 + Math.floor(1)).toString().padStart(2, "0") + "-" + 
new Date().getDate().toString().padStart(2, "0");

var targetHour = 0;
var targetMinute = 0;

setInterval(() => {
    updateTime(), 1000
});
setInterval(() => {
    updateRemaining(), 1000
});
updateTarget();

function updateTime(){
    var today = new Date();
    var Time = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0") + ":" + today.getSeconds().toString().padStart(2, "0");
    document.getElementById("time").innerHTML = Time;
}

function updateRemaining(){
    var today = new Date();
    var totalTime = ((targetHour * 60) + targetMinute) - (today.getHours() * 60 + today.getMinutes());
    var Time;

    if (totalTime <= 0){
        Time = "Zeit abgelaufen";
    }
    else {
        if (totalTime <= 60){
            Time = "Noch " + totalTime.toString().padStart(2, "0") + "min";
        }
        else{
            Time = "Noch " + Math.floor(totalTime / 60).toString() + "h " + (totalTime % 60).toString().padStart(2, "0") + "min";
        }
    }
    document.getElementById("remaining").innerHTML = Time;
}

function updateTarget() {
    if (localStorage.getItem("targetDate")){
        const dateArray = localStorage.getItem("targetDate").split(":");
        targetHour = parseInt(dateArray[0]);
        targetMinute = parseInt(dateArray[1]);
    }
    else {
        targetHour = (new Date().getHours() + 2) % 24;
        targetMinute = 0;
    }
    document.getElementById("target").innerHTML = "Bis " + targetHour.toString().padStart(2, "0") + ":" + targetMinute.toString().padStart(2, "0");
}

const saveToLocalStorage = () => {
    localStorage.setItem("targetDate", timeStorageInput.value);
}

button.addEventListener("click", saveToLocalStorage);
button.addEventListener("click", updateTarget);