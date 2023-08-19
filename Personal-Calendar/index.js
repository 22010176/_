import { RenderHS, ddkCon, hpCon, khCon, ldcCon, lhpCon, lhpthCon } from './Display/DisplayUI.js'
import Database from './utilities/Database.js'
import { CurrentDate, InitCalendar } from './utilities/calendar.js'
import { RenderLHCN } from './Display/StudyCalendar.js'
import { ChonLopE, ddkConE, formInputBtnE, hpConE, khConE, ldcConE, lhpConE, lhpthConE } from './Display/EventFunctions.js'

// Fetch And check 
Database.Load()

// Init Calendar
InitCalendar([
    _ => data.curHS && RenderLHCN(data.curHS.QLSV_NGUOIHOC_ID)
])

// Initialize user interface event
document.querySelector(".submit-button").addEventListener("click", formInputBtnE)
document.querySelector(".nut-chon-lop").addEventListener("click", ChonLopE)
khCon.addEvent("click", khConE)
hpCon.addEvent("click", hpConE)
lhpCon.addEvent("click", lhpConE)
lhpthCon.addEvent("click", lhpthConE)
ddkCon.addEvent("click", ddkConE)
ldcCon.addEvent("click", ldcConE)


