export function ToggleClass(elem, cssClass) {
    if (elem.classList.contains(cssClass)) return
    elem.parentElement.querySelector(`.${cssClass}`)?.classList.remove(cssClass)
    elem.classList.add(cssClass)
}
export function LuuDuLieu(key, dulieu = "") { return localStorage.setItem(key, JSON.stringify(dulieu)), dulieu }
export function LayDuLieu(key) { return JSON.parse(localStorage.getItem(key)) }
export function FindUnDuplicate(src, dst, keys) { return src.filter(item => !dst.some(obj => CompareObject(item, obj, keys))) }
export function FindDuplicate(src, dst, keys) { return src.filter(item => dst.some(obj => CompareObject(item, obj, keys))) }
export function deleteObj(obj, avoid = []) { return Object.keys(obj).forEach(key => avoid.includes(key) || delete obj[key]), obj }

export function CompareObject(__A, __B, __K) {
    if (typeof __A == 'function') return __A(__B)
    if (typeof __B == 'function') return __B(__A)
    if (typeof __A != 'object' && typeof __B != 'object') return __A == __B
    const keys = __K || Object.keys(Object.assign({}, __A, __B))
    return keys.every(key => CompareObject(__A[key], __B[key]))
}

export function CheckElement(e, CSSclass) { return e.target.classList.contains(CSSclass) }

export function ToggleLeftContainer() { document.querySelector(".left-container").classList.toggle("select-none") }