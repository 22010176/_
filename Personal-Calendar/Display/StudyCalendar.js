import { CurrentDate, GetDayInMonth } from "../utilities/calendar.js";
import { GetCurrentSelect } from "./EventFunctions.js";
import { GetLHHPData, GetKQDK, GetLHCNData } from "../FetchData/FetchData.js";
import Container from "../utilities/Container.js";
import { CreateData } from './DisplayUI.js'

const calendar = document.querySelector(".main-calendar")

function GetDate(day) { return [day.getDate(), day.getMonth(), day.getFullYear()] }

export function GetFirstAndLastDayOfWeek(day) {
    const a = day.getDate() - day.getDay() + 1
    const b = day.getDate() + 7 - day.getDay()

    const preM = day.getMonth() || 12
    const curM = day.getMonth() + 1
    const nextM = (day.getMonth() + 2) % 12

    const pre = GetDayInMonth(preM)
    const cur = GetDayInMonth(curM)
    const next = GetDayInMonth(nextM)

    return [
        [a < 0 ? pre + a : a, a < 0 ? preM : curM, day.getFullYear()],
        [b > cur ? b % cur : b, b > cur ? nextM : curM, day.getFullYear()]
    ]
}
export const studyCalendar = new Container(calendar, data => {
    if (data.BUOIHOC == "Toi" || !data) return
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