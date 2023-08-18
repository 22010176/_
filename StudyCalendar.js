import { GetCurerntSelectedDate } from "./utilities/calendar.js";
import { GetCurrentSelect } from "./index.js";
import { GetLHHPData, GetKQDK } from "./FetchData.js";

const calendar = document.querySelector(".main-calendar")
const currentDate = {}



document.querySelector('.calendar-dates').addEventListener("click", async function (e) {
    const data = GetCurrentSelect()
    const lh = await (await GetKQDK([data.curHS?.QLSV_NGUOIHOC_ID, data.curKH?.ID])).map(async obj => await GetLHHPData([obj.QLSV_NGUOIHOC_ID, obj.DANGKY_LOPHOCPHAN_ID]))
    console.log(lh)
    Object.assign(currentDate, GetCurerntSelectedDate())
})