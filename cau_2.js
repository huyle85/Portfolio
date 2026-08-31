const API_URL = "https://randomuser.me/api/?results=10";
const userContainer = document.getElementById("userContainer");

async function fetchRandomUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Dữ liệu nhận về:", data);
        const users = data.results; 
        renderUsers(users);
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}

function renderUsers(users) {
    const htmlContent = users.map(user => {
        const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        const email = user.email;
        const country = user.location.country;
        const avatarUrl = user.picture.large;

        return `
            <div class="card">
                <img class="avt_image" src="${avatarUrl}" alt="${fullName}">
                <div class="name">Tên: ${fullName}</div>
                <div class="email">Email: ${email}</div>
                <div class="country"> Quốc gia: ${country}</div>
            </div>
        `;
    }).join("");
    userContainer.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", fetchRandomUsers);