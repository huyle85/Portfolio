const API_BASE_V2 = "https://provinces.open-api.vn/api/v2/";
const provinceSelect = document.getElementById("province");
const wardSelect = document.getElementById("ward");
const residenceForm = document.getElementById("residenceForm");

async function loadProvinces() {
    try {
        const res = await fetch(`${API_BASE_V2}p/`);
        if (!res.ok) throw new Error("Lỗi kết nối API");
        const provinces = await res.json();
        console.log("Tỉnh", provinces)
        provinceSelect.innerHTML = `<option value="">-- Chọn Tỉnh / Thành phố --</option>` +
            provinces.map(p => `<option value="${p.code}">${p.name}</option>`).join("");
    } catch (err) {
        console.error("Lỗi tải tỉnh:", err);
        provinceSelect.innerHTML = `<option value="">Không tải được danh sách tỉnh!</option>`;
    }
}

provinceSelect.addEventListener("change", async function () {
    const provinceCode = this.value;
    if (!provinceCode) {
        wardSelect.innerHTML = `<option value="">-- Vui lòng chọn Tỉnh/Thành trước --</option>`;
        wardSelect.disabled = true;
        return;
    }
    wardSelect.innerHTML = `<option value="">Đang tải danh sách Xã/Phường...</option>`;
    wardSelect.disabled = true;

    try {
        let res = await fetch(`${API_BASE_V2}p/${provinceCode}?depth=2`);
        if (!res.ok) throw new Error("Lỗi tải dữ liệu tỉnh");
        let data = await res.json();
        console.log(data) //in ra để kiểm tra xã của tỉnh
        let wardsList = [];
        if (data.wards && Array.isArray(data.wards) && data.wards.length > 0) {
            wardsList = data.wards;
        } 
        if (wardsList.length > 0) {
            wardSelect.innerHTML = `<option value="">-- Chọn Xã / Phường  --</option>` +
                wardsList.map(w => `<option value="${w.code}">${w.name}</option>`).join("");
            wardSelect.disabled = false;
        } 
    } catch (err) {
        console.error("Lỗi tải Xã/Phường:", err);
        wardSelect.innerHTML = `<option value="">Không tải được danh sách xã/phường</option>`;
    }
});


residenceForm.addEventListener("submit", function (e) {
    e.preventDefault()
    alert(
        `Đăng ký thành công`
    );
});
document.addEventListener("DOMContentLoaded", loadProvinces);