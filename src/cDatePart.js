export default class cDatePart {
    constructor(root){
        root.innerHTML = cDatePart.getHTML();

        this.el = {
            hours: root.querySelector(".cDatePartHours"),
            minutes: root.querySelector(".cDatePartMinutes"),
            seconds: root.querySelector(".cDatePartSeconds")
        }
    }

    static getHTML(){
        return `
        <span class="cDatePart cDatePartHours">00</span>
        <span class="cDatePart">:</span>
        <span class="cDatePart cDatePartMinutes">00</span>
        <span class="cDatePart">:</span>
        <span class="cDatePart cDatePartSeconds">00</span>
        `;
    }
}