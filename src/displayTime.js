const dateStorageInput = document.querySelector(".dateStorage");
const timeStorageInput = document.querySelector(".timeStorage");
const saveBtn = document.querySelector(".saveBtn")
const resetBtn = document.querySelector(".resetBtn")
const menuBtn = document.querySelector(".menu");

//Easy to calculate with time-changer (especially for midnight-cases)
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

//Creating all needed Variables
timeStorageInput.value = new Date().addHours(2).getHours().toString().padStart(2, "0") + ":00";
dateStorageInput.value = new Date().getFullYear().toString().padStart(4, "0") + "-" +
    (new Date().getMonth() + 1).toString().padStart(2, "0") + "-" +
    new Date().getDate().toString().padStart(2, "0");

var switchFlick = false;
var topBarPos = 0;
var startDate, totalTime;
var targetHour, targetMinute, targetDay, targetMonth, targetYear = 0;

//Setting up all the needed Timer
setInterval(() => {
    updateTime(), 1000
});
setInterval(() => {
    updateRemaining(), 1000
});
updateTarget();

setInterval(() => {
    var el = document.getElementById("remaining");
    if (totalTime == 1 || totalTime == 5 || totalTime == 10 || totalTime % 15 == 0) {
        if (switchFlick == false) {
            displayNotification();
        }
        switchFlick = true;
        el.style.color = "red";
        el.style.visibility = (el.style.visibility == "hidden" ? "" : "hidden");
    }
    else if (totalTime == 0) {
        if (switchFlick == true) {
            displayNotification();
        }
        switchFlick = false;
        el.style.color = "red";
        el.style.visibility = (el.style.visibility == "hidden" ? "" : "hidden");
    }
    else {
        switchFlick = false;
        el.style.color = "inherit";
        el.style.visibility = "";
    }
}, 500);

//Grant permission for push-notifications
Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
})

//Notify via Push-Notification at regulated times
function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            if (totalTime <= 0) {
                reg.showNotification("Zeit abgelaufen");
            }
            else {
                if (totalTime <= 60) {
                    reg.showNotification("Verbleibende Zeit: " + (totalTime % 60).toString().padStart(2, "0") + "min");
                }
                else {
                    reg.showNotification("Verbleibende Zeit: " + Math.floor(totalTime / 60).toString() + "h " + (totalTime % 60).toString().padStart(2, "0") + "min");
                }
            }
        });
    }
}

//Shows current time
function updateTime() {
    var today = new Date();
    var Time = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0") + ":" + today.getSeconds().toString().padStart(2, "0");
    document.getElementById("time").innerHTML = Time;
}

//Shows remaining time 
function updateRemaining() {
    var startTime = new Date();
    var prog = document.getElementById("progress-bar");
    var endTime = new Date(targetYear + "/" + targetMonth + "/" + targetDay + " " + targetHour + ":" + targetMinute);

    totalTime = Math.ceil((endTime.getTime() - startTime.getTime()) / 60000);
    var Time;

    if (totalTime <= 0) {
        Time = "Zeit abgelaufen";
    }
    else {
        if (totalTime <= 60) {
            Time = "Noch " + totalTime.toString().padStart(2, "0") + "min";
        }
        else {
            Time = "Noch " + Math.floor(totalTime / 60).toString() + "h " + (totalTime % 60).toString().padStart(2, "0") + "min";
        }
    }

    document.getElementById("remaining").innerHTML = Time;
    prog.style.width = 100 * ((endTime - new Date()) / (endTime - startDate)) + "%";
}

//Adjusts for changes in the target time
function updateTarget() {
    if (localStorage.getItem("targetTime") && localStorage.getItem("targetDate")) {
        const timeArray = localStorage.getItem("targetTime").split(":");
        const dateArray = localStorage.getItem("targetDate").split("-");
        targetHour = parseInt(timeArray[0]);
        targetMinute = parseInt(timeArray[1]);
        targetYear = parseInt(dateArray[0]);
        targetMonth = parseInt(dateArray[1]);
        targetDay = parseInt(dateArray[2]);
    }
    else {
        var time = new Date().addHours(2);
        targetMinute = 0
        targetHour = time.getHours();
        targetDay = time.getDate();
        targetMonth = time.getMonth() + 1;
        targetYear = time.getFullYear();
    }
    document.getElementById("target").innerHTML = "Bis " + targetHour.toString().padStart(2, "0") + ":" + targetMinute.toString().padStart(2, "0");
}

//Have set time values stored locally
const saveToLocalStorage = () => {
    localStorage.setItem("targetTime", timeStorageInput.value);
    localStorage.setItem("targetDate", dateStorageInput.value);
}

//Needed for progress bar -> sets start point
const updateStartDate = () => {
    startDate = new Date();
}

//Empties local storage on click
const clearClick = () => {
    localStorage.clear();
}

//Folds and unfolds topbar
const openMenu = () => {
    const topbar = document.getElementById("topbar");
    topBarPos = 100 - topBarPos;
    topbar.style.left = topBarPos + "%";
}

//All the required click listeners
menuBtn.addEventListener("click", openMenu);
saveBtn.addEventListener("click", saveToLocalStorage);
saveBtn.addEventListener("click", updateTarget);
saveBtn.addEventListener("click", updateStartDate);
resetBtn.addEventListener("click", clearClick);
resetBtn.addEventListener("click", updateTarget);
resetBtn.addEventListener("click", updateStartDate);