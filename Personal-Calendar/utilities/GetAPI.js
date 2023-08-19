(async function () {
    // console.log(await LayKeHoachDangKy())

    // const data = await LayDanhSachHocPhanDaDangKi()
    // const data = await LayTatCaKeHoach('4BBC0A2E858C4F0E982C5FFB69DE1859', "ec5b3742b43146408933ecaaf01b5bb3")

    // console.log(data)
})()

async function LayDuLieu(link) {
    // console.log("Fetching...", link)
    let authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjhERTVBOEZGMThDODQ3N0ZBNjI5M0I2N0U3OENENUU0Ozg4MzAzNmVhZjFiZDRkYzk4YmUzY2Q4ZDRmZGRlODc4OzIwMjMwODE2MTUxMjU0IiwibmJmIjoxNjkyMTczNTc0LCJleHAiOjE2OTQ4NTE5NzQsImlhdCI6MTY5MjE3MzU3NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.5ug-XHr3nin79BpZF6vy3OsC9ctLJoJBgMXXe_QcOIg"
    const data = await fetch(link, { headers: { authorization } }).then(data => data.json());
    return data
}
export async function LayKeHoach(maHS, maTG) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_KeHoachDangKy/LayDSKeHoachDangKyCaNhan?strDaoTao_ThoiGianDaoTao_Id=${maTG}&strQLSV_NguoiHoc_Id=${maHS}&strNguoiThucHien_Id=${maHS}`
    return await LayDuLieu(link)
}
export async function LayTatCaKeHoach(maHS) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_KeHoachDangKy/LayThoiGianDangKyCaNhan?strQLSV_NguoiHoc_Id=${maHS}&strNguoiThucHien_Id=${maHS}`
    const hk = (await LayDuLieu(link)).Data
    return await Promise.all(hk.map(({ ID }) => new Promise(async resolve => resolve(await LayKeHoach(maHS, ID)))))

}
export async function LayDuLieuLopThucHanh(maHocSinh, maNganh, maKeHoach, maHocPhan, maNhomLop) {
    let link = `"https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strMaNhomLop=${maNhomLop}&strQLSV_NguoiHoc_Id=${maHocSinh}&strDaoTao_ChuongTrinh_Id=${maNganh}&strDangKy_KeHoachDangKy_Id=${maKeHoach}&strDaoTao_HocPhan_Id=${maHocPhan}&strNguoiThucHien_Id=${maHocSinh}"`
    return await LayDuLieu(link)
}
export async function LayDuLieuHocSinh(maHocSinh) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayThongTinChuongTrinhHoc?strQLSV_NguoiHoc_Id=${maHocSinh}&strNguoiThucHien_Id=${maHocSinh}`
    return await LayDuLieu(link);
}

export async function LayKeHoachDangKy(maHocSinh, maNganh) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSKeHoachDangKyHoc?strDaoTao_ChuongTrinh_Id=${maNganh}&strQLSV_NguoiHoc_Id=${maHocSinh}&strNguoiThucHien_Id=${maHocSinh}`
    return await LayDuLieu(link)
}

export async function LayHocPhanToChuc(maHocSinh, maNganh, maKeHoach) {
    let link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSHocPhanDangToChuc?strDangKy_KeHoachDangKy_Id=${maKeHoach}&strDaoTao_ChuongTrinh_Id=${maNganh}&strQLSV_NguoiHoc_Id=${maHocSinh}&strNguoiThucHien_Id=${maHocSinh}`
    return await LayDuLieu(link)
}

export async function LayDanhSachHocPhanDaDangKi(maHocSinh, maKeHoach) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayKetQuaDangKyLopHocPhan?strDangKy_KeHoachDangKy_Id=${maKeHoach}&strQLSV_NguoiHoc_Id=${maHocSinh}&strNguoiThucHien_Id=${maHocSinh}`
    return await LayDuLieu(link)
}
export async function LayLichHoc(maHocSinh, maLop) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_LichTuanTheoLopHocPhan/LayLichTuanTheoLopHocPhan?strNguoiThucHien_Id=${maHocSinh}&strQLSV_NguoiHoc_Id=${maHocSinh}&strDangKy_LopHocPhan_Id=${maLop}`
    return await LayDuLieu(link)
}
export async function LayLopThucHanh(maHocSinh, maNganh, maKeHoach, maHocPhan, maNhomLop) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strMaNhomLop=${maNhomLop}&strQLSV_NguoiHoc_Id=${maHocSinh}&strDaoTao_ChuongTrinh_Id=${maNganh}&strDangKy_KeHoachDangKy_Id=${maKeHoach}&strDaoTao_HocPhan_Id=${maHocPhan}&strNguoiThucHien_Id=${maHocSinh}`
    return await LayDuLieu(link)
}

export async function LayLopHocPhanDangToChuc(maHocSinh, maNganh, maKeHoach, maHocPhan) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/dangkyhocapi/api/DKH_Chung/LayDSLopHocPhanDangToChuc?strQLSV_NguoiHoc_Id=${maHocSinh}&strDaoTao_ChuongTrinh_Id=${maNganh}&strDangKy_KeHoachDangKy_Id=${maKeHoach}&strDaoTao_HocPhan_Id=${maHocPhan}&strNguoiThucHien_Id=${maHocSinh}`
    return await LayDuLieu(link);
}
export async function LayLichCaNhan(maHS, ngayBD, ngayKT) {
    const link = `https://qldtbeta.phenikaa-uni.edu.vn/sinhvienapi/api/SV_ThongTin/LayDSLichCaNhan?strQLSV_NguoiHoc_Id=${maHS}&strNgayBatDau=${ngayBD.map(i => (i + '').padStart(2, '0')).join("%2F")}&strNgayKetThuc=${ngayKT.map(i => (i + '').padStart(2, '0')).join("%2F")}&strNguoiThucHien_Id=${maHS}`
    return await LayDuLieu(link);
}