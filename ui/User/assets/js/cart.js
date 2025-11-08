// Nội dung cho tệp: ui/User/assets/js/cart.js

// --- HÀM THÊM VÀO GIỎ HÀNG (DÙNG Ở TRANG PRODUCTDETAIL) ---
function addToCart() {
    console.log("Hàm addToCart đã được gọi!"); // Dòng này để kiểm tra

    // 1. Lấy thông tin sản phẩm (chúng ta lấy tạm thông tin tĩnh trên trang)
    // (Trong dự án thật, bạn sẽ truyền ID, tên, giá... vào hàm này)
    const productName = document.querySelector(".product-info h2").textContent;
    const productPrice = document.querySelector(".product-info .price").textContent;
    const productImage = document.querySelector(".product-image img").src;

    // Xử lý giá, loại bỏ ký tự $ và chuyển sang số
    const price = parseFloat(productPrice.replace('$', ''));

    const product = {
        id: productName, // Dùng tạm tên làm ID cho đơn giản
        name: productName,
        price: price,
        image: productImage,
        quantity: 1 // Mặc định thêm 1 sản phẩm
    };

    // 2. Lấy giỏ hàng hiện tại từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || "[]");

    // 3. Kiểm tra xem sản phẩm đã có trong giỏ chưa
    let existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // Nếu đã có, chỉ tăng số lượng
        existingProduct.quantity += 1;
    } else {
        // Nếu chưa có, thêm vào giỏ hàng
        cart.push(product);
    }

    // 4. Lưu giỏ hàng mới (đã cập nhật) trở lại localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 5. Thông báo cho người dùng (có thể dùng lại hàm success của bạn)
    // alert('Đã thêm vào giỏ hàng!');

    // 6. Cập nhật số lượng trên icon giỏ hàng (nếu có)
    updateCartIcon();
}

// --- HÀM CẬP NHẬT SỐ LƯỢNG TRÊN ICON GIỎ HÀNG (DÙNG Ở MỌI TRANG) ---
function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart') || "[]");
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });

    // Tìm link Cart
    const cartLink = document.querySelector('a[href="./checkout.html"]');
    if (cartLink) {
        // Xóa số đếm cũ (nếu có)
        const oldCounter = cartLink.querySelector('span');
        if (oldCounter) {
            oldCounter.remove();
        }

        // Thêm số đếm mới
        if (totalItems > 0) {
            const counterSpan = document.createElement('span');
            counterSpan.textContent = ` (${totalItems})`;
            counterSpan.style.color = "#00b3ff"; // Cho màu nổi bật
            cartLink.appendChild(counterSpan);
        }
    }
}


// --- HÀM HIỂN THỊ GIỎ HÀNG (DÙNG Ở TRANG CHECKOUT) ---
function loadCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    // CẬP NHẬT: Tìm .body bên trong .oder-wrapper
    const cartContainer = document.querySelector(".oder-wrapper .body");
    const subtotalEl = document.querySelector(".detail-price .subtotal");
    const totalEl = document.querySelector(".total span:last-child");

    if (!cartContainer) return; // Chỉ chạy nếu ở đúng trang checkout

    cartContainer.innerHTML = ""; // Xóa các sản phẩm tĩnh
    let subtotalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='no-product'>Your cart is empty.</p>"; // Dùng class 'no-product'
        if (subtotalEl) subtotalEl.textContent = "$0";
        if (totalEl) totalEl.textContent = "$0"; // Giả sử ship = 0
        return;
    }

    cart.forEach(item => {
        const itemPrice = item.price * item.quantity;
        subtotalPrice += itemPrice;

        const itemHtml = `
            <div class="card-wrapper">
                <img src="${item.image}" alt="${item.name}">
                <div class="info">
                    <h2 class="product-name">${item.name}</h2>
                    <div class="price-quatity">
                        <span class="product-price">$ ${item.price.toFixed(2)}</span>
                        <span class="quantity">&times; ${item.quantity}</span>
                    </div>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHtml;
    });

    // Cập nhật tổng tiền (giả sử phí ship 35000)
    // CẢNH BÁO: Phí ship đang là VND, Tổng tiền là USD. Tạm thời tính phí ship = 0
    const shippingFee = 0;
    const totalPrice = subtotalPrice + shippingFee;

    if (subtotalEl) subtotalEl.textContent = `$ ${subtotalPrice.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$ ${totalPrice.toFixed(2)}`;
}

// --- HÀM ĐẶT HÀNG (DÙNG Ở TRANG CHECKOUT) ---
function placeOrder(event) {
    event.preventDefault(); // Ngăn form submit

    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const user = localStorage.getItem('loggedInUser');

    if (cart.length === 0) {
        alert("Your cart is empty. Cannot place order.");
        return;
    }

    // Kiểm tra xem đã đăng nhập chưa
    if (!user) {
        alert("Please login to place an order.");
        // Chuyển về trang login
        window.location.href = '../../login.html';
        return;
    }

    // 1. Lấy danh sách đơn hàng đã có
    let orders = JSON.parse(localStorage.getItem('orders') || "[]");

    // 2. Tạo đơn hàng mới
    const newOrder = {
        orderId: "ORD-" + new Date().getTime(), // Tạo ID đơn hàng
        user: user, // Lấy tên user đang đăng nhập
        items: cart,
        date: new Date().toLocaleString()
    };

    // 3. Thêm đơn hàng mới vào danh sách
    orders.push(newOrder);

    // 4. Lưu lại danh sách đơn hàng
    localStorage.setItem('orders', JSON.stringify(orders));

    // 5. XÓA giỏ hàng
    localStorage.removeItem('cart');

    // 6. Thông báo và chuyển hướng
    alert("Order placed successfully!");
    window.location.href = './index.html'; // Chuyển về trang chủ
}

// --- TỰ ĐỘNG CHẠY CÁC HÀM NÀY ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon(); // Cập nhật icon giỏ hàng ở mọi trang
    loadCheckoutCart(); // Chỉ chạy ở trang checkout (vì có id 'cart-items-container')

    // CẬP NHẬT: Tự động gắn sự kiện 'submit' cho form checkout
    const checkoutForm = document.querySelector(".block-left form");
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', placeOrder);
    }
});