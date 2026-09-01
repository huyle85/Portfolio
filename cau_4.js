const API_KEY = "6674cd8327c398680c3465810d1e3d0e";
function removeVietnameseTones(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .trim();
}

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const tempEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");

async function fetchWeather() {
    const rawCity = cityInput.value.trim();
    const searchCity = removeVietnameseTones(rawCity).toLowerCase();

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`;
        const res = await fetch(url);
        if (!res.ok){
            if (res.status === 404) throw new Error("Không tìm thấy thành phố này!");
            throw new Error("Lỗi kết nối máy chủ thời tiết");
        }
        const data = await res.json();
        console.log(data)
        tempEl.innerText = `${data.main.temp}°C`;
        humidityEl.innerText = `${data.main.humidity}%`;

    } catch (err) {
        console.error("Lỗi:", err);
        alert("Không tìm thấy địa điểm! Do API OpenWeatherMap chỉ hỗ trợ tra cứu theo cấp Thành phố, vui lòng nhập tên đô thị trung tâm (Ví dụ: 'Biên Hòa' thay vì 'Đồng Nai', 'Thủ Dầu Một' cho Bình Dương).");
        humidityEl.innerText = "--";
    }
}
searchBtn.addEventListener("click", fetchWeather);
