import { LayDuLieuHocSinh, LayHocPhanToChuc, LayLopHocPhanDangToChuc, LayDanhSachHocPhanDaDangKi, LayTatCaKeHoach, LayLichHoc } from "./utilities/GetAPI.js"
import { HS, KH, HP, LHP, KQDK, LHHP } from './FetchDatabase.js'
import Database from "./utilities/database.js"

export async function _HS(hsID) {
    const data = (await LayDuLieuHocSinh(hsID)).Data
    HS.Add(...data)
    return data[0]
}
export async function _KH(hsID) {
    const data = (await LayTatCaKeHoach(hsID)).map(i => i.Data).flat()
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    if (hs) KH.Add(...data).forEach(element => Database.CreateConnection(hs, element))
    return data
}
export async function _HP(hsID, ngID, khID) {
    const data = (await LayHocPhanToChuc(hsID, ngID, khID)).Data
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID }), kh = KH.GetOne({ ID: khID })
    if (hs && kh) HP.Add(...data).forEach(obj => {
        Database.CreateConnection(hs, obj)
        Database.CreateConnection(kh, obj)
    })
    return data
}
export async function _LHP(hsID, ngID, khID, hpID) {
    const data = (await LayLopHocPhanDangToChuc(hsID, ngID, khID, hpID)).Data.rs
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID }), kh = KH.GetOne({ ID: khID }), hp = HP.GetOne({ ID: hpID })

    if (hs && kh && hp) LHP.Add(...data).forEach(obj => {
        Database.CreateConnection(hs, obj)
        Database.CreateConnection(kh, obj)
        Database.CreateConnection(hp, obj)
    })
    return data
}
export async function _KQDK(hsID, khID) {
    const data = (await LayDanhSachHocPhanDaDangKi(hsID, khID)).Data
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    const kh = KH.GetOne({ ID: khID })

    if (hs) KQDK.Add(...data).forEach(elem => {
        Database.CreateConnection(hs, elem)
        Database.CreateConnection(kh, elem)
    })
    return data
}

export async function _LHHP(hsID, lhpID) {
    const data = (await LayLichHoc(hsID, lhpID)).Data
    const hp = LHP.GetOne({ ID: lhpID })

    if (hp) LHHP.Add(...data).forEach(elem => Database.CreateConnection(hp, elem))
    return data
}

// let mahs = "8DE5A8FF18C8477FA6293B67E78CD5E4"
// let maNg = "B9705BFAC46B4652BA01851044AC8CD2"
// let maKH = "41EC02E0F35B4C0B9C377102C5846460"
// let maHP = "4B545C2BD20240CBB8510A7CBAD8744D"

// _HS(mahs)
// _KH(mahs, maNg)
// _HP(mahs, maNg, maKH)
// _LHP(mahs, maNg, maKH, maHP)
// _KHDK(mahs, maKH)