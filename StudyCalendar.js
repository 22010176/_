import { CurrentDate, GetDayInMonth } from "./utilities/calendar.js";
import { GetCurrentSelect } from "./index.js";
import { GetLHHPData, GetKQDK, GetLHCNData } from "./FetchData.js";
import Container from "./utilities/Container.js";
import { CreateData } from './DisplayUI.js'

const calendar = document.querySelector(".main-calendar")

function GetDate(day) { return [day.getDate(), day.getMonth(), day.getFullYear()] }

export function GetFirstAndLastDayOfWeek(day) {
    const a = day.getDate() - day.getDay() + 1
    const b = day.getDate() + 7 - day.getDay()
    const pre = GetDayInMonth(day.getMonth())
    const cur = GetDayInMonth(day.getMonth() + 1)
    const next = GetDayInMonth(day.getMonth() + 2)
    return [
        [
            a < 0 ? pre + a : a,
            a < 0 ? day.getMonth() : day.getMonth() + 1,
            day.getFullYear()
        ], [
            b > cur ? b % cur : b,
            b > cur ? day.getMonth() + 2 : day.getMonth() + 1,
            day.getFullYear()
        ]
    ]
}
export const studyCalendar = new Container(calendar, data => {
    if (data.BUOIHOC == "Toi" || !data) return
    console.log(data)
    const elem = CreateData()

    elem.style.gridColumn = `${data.THU - 1} / ${data.THU}`
    elem.style.gridRow = `${data.TIETBATDAU} / ${data.TIETKETTHUC + 1}`
    elem.innerText = `${data.TENHOCPHAN}\n${data.TENPHONGHOC || ''}`
    elem.setAttribute("data-id", data.IDLICHHOC)
    return elem
});


export async function RenderLHCN(hsID) {
    const data = await GetLHCNData([hsID, ...GetFirstAndLastDayOfWeek(CurrentDate())])

    studyCalendar.ReplaceData(data).Render()
}
// (async function () {
//     const data = await GetLHCNData(['4BBC0A2E858C4F0E982C5FFB69DE1859', ...GetFirstAndLastDayOfWeek(CurrentDate())])

//     studyCalendar.ReplaceData(data)
//     studyCalendar.Render()
// })()








// document.querySelector('.calendar-dates').addEventListener("click", async function (e) {
//     console.log("asfasf")
//     const data = GetCurrentSelect()
//     curDate = CurrentDate()
//     console.log(curDate.getDate(), curDate.getDay())

// })