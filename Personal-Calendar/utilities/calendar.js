import { ToggleClass } from "./Utilities.js";

const dateCalendar = document.querySelector(".calendar-dates")
const calenderElem = document.querySelector(".date-calendar")
const monthDisplay = document.querySelector(".month-display")
const yearDisplay = document.querySelector(".year-display")

const currentDate = new Date();
let thangHientai = currentDate.getMonth(), namHientai = currentDate.getFullYear();

export function InitCalendar(funcs = []) {
    monthDisplay.innerText = thangHientai + 1
    yearDisplay.innerText = namHientai
    InitCalendarUIEvent(funcs)
    RenderMonthDays(new Date(namHientai, thangHientai, 1).getDay(), thangHientai + 1)
    document.querySelector(`.calendar-day[data-day="${currentDate.getDate()}"]`).classList.add("active")
}

function RenderMonthDays(firstDate, month) {
    dateCalendar.innerHTML = ""
    for (let i = 0; i < firstDate; i++) dateCalendar.appendChild(CreateDayElem(0));
    const days = GetDayInMonth(month);
    for (let i = 1; i <= days; i++) dateCalendar.appendChild(CreateDayElem(1, i));
    let maximum = days + firstDate > 35 ? 42 : 35;
    for (let i = 0; i < maximum - days - firstDate; i++) dateCalendar.appendChild(CreateDayElem(0));

    if (thangHientai != currentDate.getMonth() || namHientai != currentDate.getFullYear()) return
    const current = document.querySelector(`.calendar-day[data-day="${currentDate.getDate()}"]`)
    current.classList.add('active2')
}
function ChangeMonth(value) {
    thangHientai += value;
    if (thangHientai == 12) {
        thangHientai = 0;
        namHientai++
    } else if (thangHientai == -1) {
        thangHientai = 11;
        namHientai--;
    }
    RenderMonthDays(new Date(namHientai, thangHientai, 1).getDay(), thangHientai + 1);
    yearDisplay.innerText = namHientai
    yearDisplay.setAttribute("data-nam", namHientai)
    monthDisplay.innerText = thangHientai + 1
    monthDisplay.setAttribute("data-thang", thangHientai + 1)
}
function InitCalendarUIEvent(funcs = []) {
    calenderElem.addEventListener("click", function (e) {
        const elem = e.target
        if (elem.classList.contains("doi-thang")) return ChangeMonth(+elem.getAttribute("data-thang-thaydoi"))
        if (elem.classList.contains("calendar-day")) return ToggleClass(elem, "active")
    })
    funcs.forEach(funcs => {
        if (typeof funcs != 'function') return
        calenderElem.addEventListener("click", funcs)
    })
}
function CreateDayElem(empty, day = 0) {
    const elem = document.createElement('div')
    elem.classList.add(empty ? "calendar-day" : "calendar-day-empty");
    elem.setAttribute("data-day", day)
    elem.innerText = day ? day : " ";

    return elem
}
function leapyear(year) { return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0); }
export function GetDayInMonth(month) {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2: return leapyear(namHientai) ? 29 : 28
        default: return 0;
    }
}

export function CurrentDate() {
    return new Date(namHientai, thangHientai, +document.querySelector(".calendar-day.active").getAttribute('data-day'))
}
