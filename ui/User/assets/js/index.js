// Hàm này CHỈ CHẠY trên trang Product Detail
function initProductDetailPage() {
    // Tìm các yếu tố của trang chi tiết
    const productImg = document.querySelector(".product-image img");
    const btnLeft = document.querySelector(".next-btn.left");
    const btnRight = document.querySelector(".next-btn.right");
    const addBtn = document.querySelector(".btn-add");
    const buyBtn = document.querySelector(".btn-buy");

    // Chỉ chạy code nếu TÌM THẤY TẤT CẢ các yếu tố này
    if (productImg && btnLeft && btnRight && addBtn && buyBtn) {
        // 1. CHUYỂN ẢNH
        const images = [
            "https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1171",
            "https://images.unsplash.com/photo-1664454217818-11e5baf60205?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
            "https://images.unsplash.com/photo-1669723008519-3b5043b5b826?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1180",
        ];
        let currentIndex = 0;

        function updateImage() {
            productImg.style.opacity = 0;
            setTimeout(() => {
                productImg.src = images[currentIndex];
                productImg.style.opacity = 1;
            }, 200);
        }

        btnRight.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
        });

        btnLeft.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
        });

        // 2. HIỆU ỨNG NÚT ADD & BUY
        function handleButtonSuccess(button) {
            const originalText = button.textContent;
            button.classList.add("loading");

            setTimeout(() => {
                button.classList.remove("loading");
                button.innerHTML = '<i class="fa fa-check"></i> Success';
                button.classList.add("success");

                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove("success");
                }, 2000);
            }, 1000);
        }

        addBtn.addEventListener("click", () => handleButtonSuccess(addBtn));
        buyBtn.addEventListener("click", () => handleButtonSuccess(buyBtn));
    }
}

// Hàm này CHẠY TRÊN TẤT CẢ CÁC TRANG
function initGlobalScripts() {
    // 3. NAVBAR SCROLL
    let lastScrollTop = 0;
    const navbar = document.querySelector(".navbar-wrapper");

    // Chỉ chạy nếu có navbar
    if (navbar) {
        window.addEventListener("scroll", function () {
            const currentScroll =
                window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Cuộn xuống: ẩn
                navbar.classList.add("hidden");
            } else {
                // Cuộn lên: hiện
                navbar.classList.remove("hidden");
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }

    // (Phần submenu dùng CSS :hover nên không cần JS)
}

// Chạy các hàm này khi tài liệu đã tải xong
document.addEventListener("DOMContentLoaded", function () {
    initProductDetailPage(); // Thử chạy code của trang chi tiết
    initGlobalScripts(); // Luôn chạy code chung (navbar)
});
