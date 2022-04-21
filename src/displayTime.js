//var tH = $("#time");

var targetHour = new Date().getHours() + 2;
var targetMinute = 0;

setInterval(() => {
    updateTime(), 1000
});
setInterval(() => {
    updateRemaining(), 1000
});
displayTarget();

function displayTarget(){
    document.getElementById("target").innerHTML = "Bis " + targetHour.toString().padStart(2, "0") + ":" + targetMinute.toString().padStart(2, "0");
}

function updateTime(){
    var today = new Date();
    var Time = today.getHours().toString().padStart(2, "0") + ":" + today.getMinutes().toString().padStart(2, "0") + ":" + today.getSeconds().toString().padStart(2, "0");
    document.getElementById("time").innerHTML = Time;
}

function updateRemaining(){
    var today = new Date();
    var totalTime = ((targetHour * 60) + targetMinute) - (today.getHours() * 60 + today.getMinutes());
    var Time;

    if (totalTime < 0){
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