export default class showRemainingTime {
    constructor(root){
        root.innerHTML = showRemainingTime.getHTML();

        this.tHours = 0;
        this.tMinutes = 0;
        this.el = {
            hours: root.querySelector(".showRemainingTimeHours"),
            minutes: root.querySelector(".showRemainingTimeMinutes")
        }

        this.interval = null;

        setInterval(() => { this.updateInterfaceTime(), 1000 });
    }

    updateInterfaceTime(){
        const hours = (new Date().getHours() + 2) % 24 - new Date().getHours() - 1;
        const minutes = 60 - new Date().getMinutes() % 59;

        if(hours > 1 || hours == 1 && minutes > 0) {
            this.el.hours.textContent = "Noch " + hours.toString().padStart(2, "0") + "h ";
            this.el.minutes.textContent = minutes.toString().padStart(2, "0") + "min"
        }
        else if(hours == 1 && minutes == 0) {
            this.el.minutes.textContent = "Noch 60min"
        }
        else if(hours == 0 && minutes < 60) {
            this.el.minutes.textContent = "Noch " + minutes.toString().padStart(2, "0") + "min";
        }
        else {
            this.el.minutes.textContent = "Zeit abgelaufen"
        }
    }

    static getHTML(){
        return `
        <span class="showRemainingTime showRemainingTimeHours"></span><span class="showRemainingTime showRemainingTimeMinutes">00</span>
        `;
    }
}