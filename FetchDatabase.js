import Database from "./utilities/database.js";

// ____________________________________________________________________________________________________________________________________________________________________________________________________________________________
// Database ____________________________________________________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________________
const HS = new Database("HS", ['QLSV_NGUOIHOC_ID'])
const KH = new Database("KH", ['ID'])
const HP = new Database("HP", ['ID'])
const LHP = new Database("LHP", ['ID'])
const KQDK = new Database("KQDK", ['DANGKY_LOPHOCPHAN_ID'])
const LHHP = new Database("LHHP")
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________________
// Get Data ____________________________________________________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________________________________________________

export function HSData(hsID) {
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    if (hs) return hs.data
}
export function KHData(hsID) {
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    if (!hs) return
    const hsC = Database.FindAllConnectFrom(hs).map(i => i.to)

    const result = KH._.filter(({ id }) => hsC.includes(id)).map(i => i.data)
    if (result.length) return result
}

export function HPData(hsID, ngID, khID) {
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    const kh = KH.GetOne({ ID: khID })
    if (!hs || !kh) return
    const khC = Database.FindAllConnectFrom(kh).map(i => i.to)
    const hsC = Database.FindAllConnectFrom(hs).map(i => i.to)

    const result = HP._.filter(({ id }) => khC.includes(id) && hsC.includes(id)).map(i => i.data)
    if (result.length) return result
}
export function LHPData(hsID, ngID, khID, hpID) {
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    const kh = KH.GetOne({ ID: khID })
    const hp = HP.GetOne({ ID: hpID })

    if (!hs || !kh || !hp) return
    const khC = Database.FindAllConnectFrom(kh).map(i => i.to)
    const hsC = Database.FindAllConnectFrom(hs).map(i => i.to)
    const hpC = Database.FindAllConnectFrom(hp).map(i => i.to)

    const result = LHP._.filter(({ id }) => khC.includes(id) && hsC.includes(id) && hpC.includes(id)).map(i => i.data)
    if (result.length) return result
}
export function KQDKData(hsID, khID) {
    const hs = HS.GetOne({ QLSV_NGUOIHOC_ID: hsID })
    const kh = KH.GetOne({ ID: khID })
    if (!hs || !kh) return
    const khC = Database.FindAllConnectFrom(kh).map(i => i.to)
    const hsC = Database.FindAllConnectFrom(hs).map(i => i.to)

    const result = KQDK._.filter(({ id }) => khC.includes(id) && hsC.includes(id)).map(i => i.data)
    if (result.length) return result
}
export function LHHPData(hsID, lhpID) {

}

// export function 
export { HS, KH, HP, LHP, KQDK, LHHP }