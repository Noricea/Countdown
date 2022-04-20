export default class showRemainingTime {
    constructor(root){
        root.innerHTML = showRemainingTime.getHTML();

        this.el = {
            hours: root.querySelector(".timerPartHours"),
            minutes: root.querySelector(".timerPartMinutes")
        }

        this.interval = null;
        this.remainingSeconds = 60;

        setInterval(() => { this.updateInterfaceTime(), 1000 });
    }

    updateInterfaceTime(){
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();

        this.el.hours.textContent = hours.toString().padStart(2, "0");
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    }

    static getHTML(){
        return `
        <span class="timerPart timerPartHours">00</span>
        <span class="timerPart">:</span>
        <span class="timerPart timerPartMinutes">00</span>
        `;
    }
}