document.addEventListener("DOMContentLoaded", function () {

  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-item a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // Đánh dấu active cho trang cha (Products) khi ở trang con (add/edit-product)
    if (currentPage.includes("product") && linkPage.includes("products.html")) {
      link.classList.add("active");
      return;
    }

    if (currentPage === "" || currentPage === "index.html") {
      if (linkPage === "index.html") {
        link.classList.add("active");
      }
    } else {
      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    }
  });


  const profileMenu = document.getElementById("profile-menu-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");

  if (profileMenu && profileDropdown) {
    profileMenu.addEventListener("click", (e) => {
      e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
      profileDropdown.classList.toggle("active");
    });


    document.addEventListener("click", (e) => {
      if (
        profileDropdown.classList.contains("active") &&
        !profileMenu.contains(e.target) &&
        !profileDropdown.contains(e.target)
      ) {
        profileDropdown.classList.remove("active");
      }
    });
  }


  const overlay = document.getElementById("modal-overlay");
  const successToast = document.getElementById("success-toast");

  // Modals
  const formModal = document.getElementById("form-modal");
  const deleteModal = document.getElementById("delete-modal");
  const modalTitle = document.getElementById("modal-title");

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
    if (overlay) overlay.classList.add("active");
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("active");
    if (overlay && !document.querySelector(".modal.active")) {
      overlay.classList.remove("active");
    }
  }

  function showToast(message = "Action completed successfully!") {
    if (!successToast) return;
    const toastText = successToast.querySelector("span");
    if (toastText) toastText.innerText = message;

    successToast.classList.add("show");
    setTimeout(() => {
      successToast.classList.remove("show");
    }, 3000);
  }



  // A. Nút "Add" (CHỈ Category và Customer)
  const addCategoryBtn = document.getElementById("add-category-btn");
  const addCustomerBtn = document.getElementById("add-customer-btn");

  if (addCategoryBtn) {
    addCategoryBtn.addEventListener("click", () => {
      if (modalTitle) modalTitle.innerText = "Add New Category";
      openModal(formModal);
    });
  }
  if (addCustomerBtn) {
    addCustomerBtn.addEventListener("click", () => {
      if (modalTitle) modalTitle.innerText = "Add New Customer";
      openModal(formModal);
    });
  }


  const editBtns = document.querySelectorAll(
    ".action-icons .fa-pen:not(.product-edit-btn)"
  );
  editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (modalTitle) modalTitle.innerText = "Edit Item";
      openModal(formModal);
    });
  });


  const deleteBtns = document.querySelectorAll(".action-icons .fa-trash-can");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(deleteModal);
    });
  });


  const closeElements = document.querySelectorAll(
    '.modal-close, [data-dismiss="modal"], .modal-overlay'
  );
  closeElements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      let modalToClose =
        el.closest(".modal") || document.querySelector(".modal.active");
      if (modalToClose) {
        closeModal(modalToClose);
      }
    });
  });


  const saveBtn = document.getElementById("modal-save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      closeModal(formModal);
      showToast("Changes saved successfully!");
    });
  }


  const confirmDeleteBtn = document.getElementById("modal-delete-btn");
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      closeModal(deleteModal);
      showToast("Item deleted successfully!");
    });
  }


  const printBtns = document.querySelectorAll(".fa-print");
  printBtns.forEach((btn) =>
    btn.addEventListener("click", () => showToast("Printing document..."))
  );

  const copyBtns = document.querySelectorAll(".fa-copy");
  copyBtns.forEach((btn) =>
    btn.addEventListener("click", () => showToast("Item copied to clipboard!"))
  );

  const emailBtns = document.querySelectorAll(".fa-envelope");
  emailBtns.forEach((btn) =>
    btn.addEventListener("click", () => showToast("Opening email client..."))
  );

  const viewBtns = document.querySelectorAll(".fa-eye");
  viewBtns.forEach((btn) =>
    btn.addEventListener("click", () => showToast("Showing item details..."))
  );
});
