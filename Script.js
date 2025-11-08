/* ====================
   KHỐI 1: CHUYỂN TAB VÀ HIỂN THỊ MẬT KHẨU
   (Giữ nguyên code gốc của bạn)
   ==================== */
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPassword = document.getElementById('loginPassword');

toggleLoginPassword.addEventListener('click', () => {
    if (loginPassword.type === 'password') {
        loginPassword.type = 'text';
        toggleLoginPassword.classList.remove('fa-eye-slash');
        toggleLoginPassword.classList.add('fa-eye');
    } else {
        loginPassword.type = 'password';
        toggleLoginPassword.classList.remove('fa-eye');
        toggleLoginPassword.classList.add('fa-eye-slash');
    }
});

const forgetLink = document.querySelector('.sign-in a');
forgetLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginPassword.type = 'text';
    toggleLoginPassword.classList.remove('fa-eye-slash');
    toggleLoginPassword.classList.add('fa-eye');
});

/* ====================
   KHỐI 2: VALIDATE CREATE ACCOUNT (ĐÃ SỬA)
   Thêm logic để lấy và lưu Username
   ==================== */
const signUpForm = document.querySelector('.sign-up form');
const usernameInput = signUpForm.querySelector('#signupUsername'); // Lấy ô username mới
const emailInput = signUpForm.querySelector('input[type="email"]');
const passwordInput = signUpForm.querySelectorAll('input[type="password"]')[0];
const confirmInput = signUpForm.querySelectorAll('input[type="password"]')[1];

const message = document.createElement('p');
message.style.marginTop = '10px';
signUpForm.appendChild(message);

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    // Kiểm tra Username
    if (username === '') {
        message.textContent = 'Please enter a username.';
        message.style.color = 'red';
        return;
    }

    // Kiểm tra xem username đã tồn tại chưa
    if (localStorage.getItem(username)) {
        message.textContent = 'Username already exists.';
        message.style.color = 'red';
        return;
    }

    // Kiểm tra email
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        message.textContent = 'Please enter a valid email.';
        message.style.color = 'red';
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
        message.textContent = 'Password must be at least 6 characters.';
        message.style.color = 'red';
        return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirm) {
        message.textContent = 'Passwords do not match.';
        message.style.color = 'red';
        return;
    }

    // Nếu hợp lệ: Lưu tài khoản
    // Chúng ta sẽ lưu mật khẩu bằng cách dùng "username" làm chìa khóa (key)
    localStorage.setItem(username, password);
    // Bạn cũng có thể lưu email nếu muốn, ví dụ: localStorage.setItem(username + "_email", email);

    message.textContent = 'Account created successfully!';
    message.style.color = 'green';

    // 1 giây sau chuyển sang tab Sign In
    setTimeout(() => {
        container.classList.remove('active');
        message.textContent = '';
        signUpForm.reset();
    }, 1000);
});


/* ====================
   KHỐI 3: VALIDATE SIGN IN (ĐÃ SỬA)
   Kiểm tra bằng Username và lưu trạng thái đăng nhập
   ==================== */
const signInForm = document.querySelector('.sign-in form');
const signInUsername = signInForm.querySelector('#loginUsername'); // Lấy ô username đăng nhập
const signInPassword = signInForm.querySelector('#loginPassword');

const signInMsg = document.createElement('p');
signInMsg.style.marginTop = '10px';
signInForm.appendChild(signInMsg);

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = signInUsername.value;
    const password = signInPassword.value;

    // Lấy mật khẩu đã lưu từ localStorage dựa trên username
    const storedPassword = localStorage.getItem(username);

    // ** Logic kiểm tra đăng nhập (Không còn đăng nhập bừa) **
    if (storedPassword && password === storedPassword) {

        // Thông báo thành công
        signInMsg.textContent = 'Login successful! Redirecting...';
        signInMsg.style.color = 'green';

        // ** QUAN TRỌNG: LƯU TRẠNG THÁI ĐĂNG NHẬP **
        // Chúng ta báo cho trình duyệt biết là đã đăng nhập
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', username); // Lưu tên user lại

        // Chuyển hướng
        setTimeout(() => {
            window.location.href = './ui/User/index.html';
        }, 1000);

    } else {
        // Sai tài khoản hoặc mật khẩu
        signInMsg.textContent = 'Invalid username or password.';
        signInMsg.style.color = 'red';
    }
});