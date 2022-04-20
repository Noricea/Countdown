export default class cDatePart {
    constructor(root){
        root.innerHTML = cDatePart.getHTML();

        this.el = {
            hours: root.querySelector(".cDatePartHours"),
            minutes: root.querySelector(".cDatePartMinutes"),
            seconds: root.querySelector(".cDatePartSeconds")
        }

        this.interval = null;

        setInterval(() => { this.updateInterfaceTime(), 1000 });
    }

    updateInterfaceTime(){
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();

        this.el.hours.textContent = hours.toString().padStart(2, "0");
        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    static getHTML(){
        return `
        <span class="cDatePart cDatePartHours">00</span><span class="cDatePart">:</span><span class="cDatePart cDatePartMinutes">00</span><span class="cDatePart">:</span><span class="cDatePart cDatePartSeconds">00</span>
        `;
    }
}