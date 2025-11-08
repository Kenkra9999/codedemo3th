// Nội dung cho tệp: ui/User/assets/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Tìm vị trí của "Hello User1" trên thanh header
    const userMenuContainer = document.getElementById('login-link-container');

    if (!userMenuContainer) {
        // console.error("Không tìm thấy 'login-link-container'");
        return; // Dừng lại nếu không tìm thấy
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('loggedInUser');

    if (isLoggedIn === 'true' && username) {
        // ===== NẾU NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP =====

        // 1. Tạo HTML cho menu người dùng
        userMenuContainer.innerHTML = `
            <a href="#" class="header__navbar-user-link">
                <span>${username}</span>
            </a>
            <ul class="header__navbar-user-menu">
                <li><a href="#" id="logout-btn">Logout</a></li>
            </ul>
        `;

        // 2. Thêm CSS để menu thả xuống (dropdown) hoạt động
        const style = document.createElement('style');
        style.innerHTML = `
            .header__navbar-user {
                position: relative; /* Cần thiết để menu con hoạt động */
            }
            .header__navbar-user:hover .header__navbar-user-menu {
                display: block;
            }
            .header__navbar-user-menu {
                display: none;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: #fff;
                border: 1px solid #dbdbdb;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                list-style: none;
                padding-left: 0;
                z-index: 10;
                width: 150px; 
            }
            .header__navbar-user-menu li {
                padding: 8px 16px;
            }
            .header__navbar-user-menu li:hover {
                background-color: #f5f5f5;
            }
            .header__navbar-user-menu a {
                text-decoration: none;
                color: #333;
                font-size: 1.4rem; 
            }
        `;
        document.head.appendChild(style);

        // 3. Thêm logic cho nút Đăng xuất (Logout)
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();

            // Xóa trạng thái đăng nhập
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loggedInUser');

            // Chuyển hướng người dùng về trang đăng nhập
            // Đường dẫn ../../login.html đi từ ui/User/ ra ngoài 2 cấp
            window.location.href = '../../login.html';
        });

    } else {
        // ===== NẾU NGƯỜI DÙNG CHƯA ĐĂNG NHẬP =====
        // Hiển thị nút "Login" (hoặc "Login/Register")
        userMenuContainer.innerHTML = `
            <a href="../../login.html" class="header__navbar-user-link">Login</a>
        `;
    }
});