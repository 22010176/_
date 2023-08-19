import { RenderHS, ddkCon, hpCon, ldcCon, khCon, lhpCon, lhpthCon } from './DisplayUI.js'
import { ToggleClass, ToggleLeftContainer, deleteObj, CheckElement } from '../utilities/Utilities.js'
import { GetHPData, GetHSData, GetKHData, GetKQDK, GetLHCNData, GetLHHPData, GetLHPData } from '../FetchData/FetchData.js'
import { RenderLHCN } from './StudyCalendar.js'
import Database from '../utilities/Database.js'
import { KH, HS, HP, LHP, KQDK, LHHP } from '../FetchData/FetchDatabase.js'

const data = { curHS: null, curKH: null, curHP: null, curLHP: null, curLHPTH: null }

const formInput = document.querySelector("#maHocSinh")
const formSubmitButton = document.querySelector(".submit-button")
const chonLop = document.querySelector(".nut-chon-lop")


export async function formInputBtnE(e) {
    e.preventDefault()
    // Reset Display

    deleteObj(data)

    // Reset Render
    hpCon.ReplaceData().Render()
    lhpCon.ReplaceData().Render()
    lhpthCon.ReplaceData().Render()
    ldcCon.ReplaceData().Render()

    // Fetch Data
    const [hs, kh] = await Promise.all([
        new Promise(async resolve => resolve(await GetHSData([formInput.value]))),
        new Promise(async resolve => resolve(await GetKHData([formInput.value])))
    ])
    data.curHS = hs;
    khCon.ReplaceData(kh)
    Database.Save()

    // Render display
    RenderHS(data.curHS)
    RenderLHCN(hs.QLSV_NGUOIHOC_ID)
    khCon.Render()
}
export async function khConE(e) {
    // Checking
    if (!CheckElement(e, 'du-lieu')) return
    const elem = e.target
    deleteObj(data, ['curHS'])
    ToggleClass(elem, 'active')

    // Reset Render
    lhpCon.ReplaceData().Render()
    lhpthCon.ReplaceData().Render()
    ldcCon.ReplaceData().Render()

    // Get Data
    ToggleLeftContainer()
    data.curKH = KH.GetOne({ ID: elem.getAttribute("data-id") }).data
    await Promise.all([
        new Promise(async resolve => resolve(await GetHPData([data.curHS.QLSV_NGUOIHOC_ID, data.curHS.DAOTAO_TOCHUCCHUONGTRINH_ID, data.curKH.ID])))
            .then(hpCon.ReplaceData.bind(hpCon)),
        new Promise(async resolve => resolve(await GetKQDK([data.curHS.QLSV_NGUOIHOC_ID, data.curKH.ID])))
            .then(ddkCon.ReplaceData.bind(ddkCon)),
    ])
    Database.Save()
    ToggleLeftContainer()

    // Render Data
    hpCon.Render()
    ddkCon.Render()
}

export async function hpConE(e) {
    // Checking
    if (!CheckElement(e, 'du-lieu')) return
    const elem = e.target
    deleteObj(data, ['curHS', 'curKH'])
    ToggleClass(elem, 'active')

    // Reset Render
    lhpthCon.ReplaceData().Render()

    // Get Data
    ToggleLeftContainer()
    data.curHP = HP.GetOne({ ID: elem.getAttribute("data-id") }).data
    const lhpData = await GetLHPData([data.curHS.QLSV_NGUOIHOC_ID, data.curHS.DAOTAO_TOCHUCCHUONGTRINH_ID, data.curKH.ID, data.curHP.ID])
    lhpCon.ReplaceData(lhpData.filter(data => data.THUOCTINHLOP_MA != 'TH'))
    if (!lhpCon.data.length) lhpthCon.ReplaceData(lhpData.filter(data => data.THUOCTINHLOP_MA == 'TH'))
    Database.Save()
    ToggleLeftContainer()

    // Render Data
    lhpCon.Render()
    lhpthCon.Render()
}

export async function lhpConE(e) {
    if (!CheckElement(e, 'du-lieu')) return
    const elem = e.target
    deleteObj(data, ['curHS', 'curKH', 'curHP'])
    ToggleClass(elem, 'active')

    // Reset Render
    lhpthCon.ReplaceData().Render()

    // Get Data
    ToggleLeftContainer()
    const lhp = await GetLHPData([data.curHS.QLSV_NGUOIHOC_ID, data.curHS.DAOTAO_TOCHUCCHUONGTRINH_ID, data.curKH.ID, data.curHP.ID])
    data.curLHP = LHP.GetOne({ ID: elem.getAttribute("data-id") }).data
    lhpthCon.ReplaceData(lhp.filter(obj => obj.THUOCTINHLOP_MA == "TH" && obj.MANHOMLOP == data.curLHP.MANHOMLOP))
    Database.Save()
    ToggleLeftContainer()

    // Render Data
    lhpthCon.Render()
}


export async function lhpthConE(e) {
    // Checking
    if (!CheckElement(e, 'du-lieu')) return
    const elem = e.target
    deleteObj(data, ['curHS', 'curKH', 'curHP', 'curLHP'])
    ToggleClass(elem, 'active')

    // Reset Render

    // Get Data
    data.curLHPTH = LHP.GetOne({ ID: elem.getAttribute("data-id") }).data
    Database.Save()

    // Render Data
}


export async function ChonLopE(e) {
    if (!!lhpCon.data.length != !!data.curLHP) return
    if (!!lhpthCon.data.length != !!data.curLHPTH) return

    const lop = [data.curLHP, data.curLHPTH].filter(_ => _)
    ldcCon.ReplaceData(ldcCon.data.filter(data => !lop.every(obj => obj.DAOTAO_HOCPHAN_ID == data.DAOTAO_HOCPHAN_ID)).concat(...lop)).Render()
}

export async function ldcConE(e) {
    // Checking
    if (!CheckElement(e, 'du-lieu')) return
    const elem = e.target

    const maNhom = elem.getAttribute('data-nhomlop'), id = elem.getAttribute("data-id")
    ldcCon.ReplaceData(ldcCon.data.filter(data => !(data.ID == id || maNhom && maNhom == data.MANHOMLOP))).Render()
}

export async function ddkConE(e) {
    if (!CheckElement(e, 'lop-da-dangki')) return
    const elem = e.target
    const maNhom = elem.getAttribute('data-nhomlop')

    if (maNhom) return document.querySelectorAll(`.lop-da-dangki[data-nhomlop = "${maNhom}"]`).forEach(elem => elem.classList.toggle('dulieu-huydangki'))
    elem.classList.toggle("dulieu-huydangki")
}
export function GetCurrentSelect() { return data }