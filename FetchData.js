import { _HP, _HS, _KH, _KQDK, _LHP, _LHHP, _LHCN } from "./FetchAPI.js"
import { HPData, HSData, KHData, KQDKData, LHPData, LHHPData, LHCNData } from "./FetchDatabase.js"

const wait = 50
async function Wait(time) { return await new Promise(resolve => setTimeout(resolve, time)) }
function GetData(funcs = [], force) {
    return async function (params = [], f) {
        if (typeof force == 'function' && f) return force(...params)
        let data;
        await Promise.all([
            Wait(wait),
            new Promise(async resolve => {
                for (let i = 0; i < funcs.length; i++) {
                    // console.log({ func: func.name, data, params: params })
                    data = await funcs[i](...params)
                    console.log("testing", { i, data })
                    if (data) break;
                }
                return resolve(data)
            })
        ])
        return data;
    }
}

const GetHSData = GetData([HSData, _HS], _HS)
const GetKHData = GetData([KHData, _KH], _KH)
const GetHPData = GetData([HPData, _HP], _HP)
const GetLHPData = GetData([LHPData, _LHP], _LHP)
const GetKQDK = GetData([KQDKData, _KQDK], _KQDK)
const GetLHHPData = GetData([LHHPData, _LHHP], _LHHP)
const GetLHCNData = GetData([LHCNData, _LHCN], _LHCN)

export { GetHSData, GetKHData, GetHPData, GetLHPData, GetKQDK, GetLHHPData, GetLHCNData }