const day_elm = document.getElementById("day")
const month_elm = document.getElementById("month")
const year_elm = document.getElementById("year")
const search_elm = document.getElementById("search")
const txt_canchi = document.getElementById("txtCanChi")
const txt_cung = document.getElementById("txtCung")
const resultBox = document.querySelector(".result");
const can_list =  ["Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân","Nhâm"]
const chi_list = ["Hợi", "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất"]
const img_congiap =document.querySelectorAll(".home_img img")[0]
const img_cung = document.querySelectorAll(".home_img img")[1]
const chi_img = {
  "Thân": "than.jfif",
  "Dậu": "dau.jfif",
  "Tuất": "tuat.jfif",
  "Hợi": "hoi.jfif",
  "Tý": "ty.jfif",
  "Sửu": "suu.jfif",
  "Dần": "dan.jfif",
  "Mão": "mao.jfif",
  "Thìn": "thin.jfif",
  "Tỵ": "ty.jfif",
  "Ngọ": "ngo.jfif",
  "Mùi": "mui.jfif"
};
const cung_img = {
  "Bạch Dương": "bach_duong.jfif",
  "Kim Ngưu": "kim_nguu.jfif",
  "Song Tử": "song_tu.jfif",
  "Cự Giải": "cu_giai.jfif",
  "Sư Tử": "su_tu.jfif",
  "Xử Nữ": "xu_nu.jfif",
  "Thiên Bình": "thien_binh.jfif",
  "Bọ Cạp": "bo_cap.jfif",
  "Nhân Mã": "nhan_ma.jfif",
  "Ma Kết": "ma_ket.jfif",
  "Bảo Bình": "bao_binh.jfif",
  "Song Ngư": "song_ngu.jfif"
};

function dropdown(){
    for(let i = 1; i <= 12; i++){
        month_elm.innerHTML += `<option value="${i}">${i}</option>`;
    }
    for(let j = 2027; j >= 1930; j--){
        year_elm.innerHTML += `<option value="${j}">${j}</option>`;
    }
    update_day();
}
function update_day() {
  const month = parseInt(month_elm.value) || 1;
  const year = parseInt(year_elm.value) || 2000;
  const currentDay = parseInt(day_elm.value) || 1;

  const total_day = new Date(year, month, 0).getDate();

  day_elm.innerHTML = "";
  for (let i = 1; i <= total_day; i++) {
    day_elm.innerHTML += `<option value="${i}">${i}</option>`;
  }
  day_elm.value = currentDay <= total_day ? currentDay : total_day;
}
function calc_day(day, month) {
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Bạch Dương";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Kim Ngưu";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) return "Song Tử";
    if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) return "Cự Giải";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Sư Tử";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Xử Nữ";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) return "Thiên Bình";
    if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) return "Bọ Cạp";
    if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) return "Nhân Mã";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Ma Kết";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Bảo Bình";
    return "Song Ngư";
}
search_elm.addEventListener("click", function () {
    resultBox.style.display = "block";
    const d = parseInt(day_elm.value);
    const m = parseInt(month_elm.value);
    const y = parseInt(year_elm.value);
    const can = can_list[(y - 3) % 10];
    const chi = chi_list[(y - 3) % 12];
    const canChi = `${can} ${chi}`;
    const cung = calc_day(d, m);
    txt_canchi.innerText = canChi;
    txt_cung.innerText = cung;
    img_congiap.src = `img/chi/${chi_img[chi]}`;
    img_cung.src = `img/cung/${cung_img[cung]}`;
});

dropdown();