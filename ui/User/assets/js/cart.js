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

    // Giả sử bạn có 1 thẻ <span> với id="cart-item-count" cạnh chữ "Cart"
    const cartIcon = document.getElementById('cart-item-count');
    if (cartIcon) {
        cartIcon.textContent = `(${totalItems})`;
    }
}

// --- HÀM HIỂN THỊ GIỎ HÀNG (DÙNG Ở TRANG CHECKOUT) ---
function loadCheckoutCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || "[]");
    const cartContainer = document.getElementById('cart-items-container'); // Vị trí để chèn HTML
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');

    if (!cartContainer) return; // Chỉ chạy nếu ở đúng trang checkout

    cartContainer.innerHTML = ""; // Xóa các sản phẩm tĩnh
    let subtotalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='color: white; text-align: center;'>Your cart is empty.</p>";
        subtotalEl.textContent = "$0";
        totalEl.textContent = "$0";
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
                        <span class="product-price">$ ${item.price}</span>
                        <span class="quantity">&times; ${item.quantity}</span>
                    </div>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHtml;
    });

    // Cập nhật tổng tiền (giả sử phí ship 35000)
    // Lưu ý: Giá sản phẩm đang là $, phí ship là VND. Cần đồng nhất!
    // Tạm thời bỏ qua phí ship để tính cho đúng

    const shippingFee = 0; // Tạm cho phí ship = 0
    const totalPrice = subtotalPrice + shippingFee;

    subtotalEl.textContent = `$ ${subtotalPrice.toFixed(2)}`;
    totalEl.textContent = `$ ${totalPrice.toFixed(2)}`;
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
        window.location.href = '../../login.html';
        return;
    }

    // 1. Lấy danh sách đơn hàng đã có
    let orders = JSON.parse(localStorage.getItem('orders') || "[]");

    // 2. Tạo đơn hàng mới
    const newOrder = {
        orderId: new Date().getTime(), // Tạo ID đơn hàng bằng thời gian
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
});