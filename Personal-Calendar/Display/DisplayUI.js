import Container from '../utilities/Container.js'

const danhSachKeHoach = document.querySelector(".ke-hoach")
const danhSachHocPhan = document.querySelector(".hoc-phan")
const danhSachLopHocPhan = document.querySelector(".lop-hoc-phan")
const danhSachLopHocPhanThucHanh = document.querySelector(".lop-hoc-phan-thuc-hanh")
const danhSachLopDaDangKi = document.querySelector(".lop-da-dang-ki")
const danhSachLopDaChon = document.querySelector(".lop-da-chon")

const thongTinMHS = document.querySelector(".info-list-content[data-field='ma-sinh-vien']")
const thongTinTHS = document.querySelector(".info-list-content[data-field='ten-sinh-vien']")
const thongTinKhoaHoc = document.querySelector(".info-list-content[data-field='khoa']")
const thongTinNganhHoc = document.querySelector(".info-list-content[data-field='nganh-hoc']")

export function CreateData(cssClass = ['du-lieu']) {
    const elem = document.createElement("div");
    cssClass.forEach(cl => elem.classList.add(cl));
    return elem
}

function CreateLHP(data) {
    const elem = CreateData()
    elem.setAttribute('data-id', data.ID)
    if (data.MANHOMLOP) elem.setAttribute("data-nhomlop", data.MANHOMLOP)
    const ten = data.TENLOP
    elem.innerText = ten.slice(ten.indexOf('('))
    return elem
}

const khCon = new Container(danhSachKeHoach, data => {
    const elem = CreateData()
    elem.setAttribute('data-id', data.ID)
    elem.innerText = data.TENKEHOACH
    return elem
})
const hpCon = new Container(danhSachHocPhan, data => {
    const elem = CreateData()
    elem.setAttribute('data-id', data.ID)
    const ten = data.DAOTAO_HOCPHAN_TEN
    elem.innerText = ten.slice(0, ten.indexOf('('))
    return elem
})
const lhpCon = new Container(danhSachLopHocPhan, CreateLHP)
const lhpthCon = new Container(danhSachLopHocPhanThucHanh, CreateLHP)
const ddkCon = new Container(danhSachLopDaDangKi, data => {
    const elem = CreateData()
    elem.setAttribute('data-id', data.DANGKY_LOPHOCPHAN_ID)
    elem.classList.add("lop-da-dangki")
    if (data.MANHOMLOP) elem.setAttribute('data-nhomlop', data.MANHOMLOP)
    elem.innerText = data.DANGKY_LOPHOCPHAN_TEN
    return elem
})
const ldcCon = new Container(danhSachLopDaChon, data => {
    const elem = CreateData()
    if (data.MANHOMLOP) elem.setAttribute('data-nhomlop', data.MANHOMLOP)

    elem.setAttribute('data-id', data.ID)
    elem.classList.add('dulieu-lop-da-chon')
    elem.innerText = data.TENLOP
    return elem
})

function RenderHS(data) {
    if (!data) return
    thongTinMHS.textContent = data.QLSV_NGUOIHOC_MASO
    thongTinTHS.textContent = `${data.QLSV_NGUOIHOC_HODEM} ${data.QLSV_NGUOIHOC_TEN}`
    thongTinKhoaHoc.textContent = data.DAOTAO_KHOAQUANLY_TEN
    thongTinNganhHoc.textContent = data.DAOTAO_CHUONGTRINH_TEN
}


export { khCon, hpCon, lhpCon, lhpthCon, ddkCon, ldcCon, RenderHS }