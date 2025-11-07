document.addEventListener("DOMContentLoaded", () => {

  const salesTrendCtx = document.getElementById("salesTrendChart");
  if (salesTrendCtx) {
    new Chart(salesTrendCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [45000, 52000, 48000, 61000, 55000, 67000],
            borderColor: "#3182ce",
            backgroundColor: "rgba(49, 130, 206, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "$" + value / 1000 + "k";
              },
            },
          },
        },
      },
    });
  }


  const salesCategoryCtx = document.getElementById("salesCategoryChart");
  if (salesCategoryCtx) {
    new Chart(salesCategoryCtx, {
      type: "pie",
      data: {
        labels: [   "Smartphones",
            "Laptops",
            "Accessories",
            "Smart Home",
            "Others"],
        datasets: [
          {
            data: [35, 25, 25, 15],
            backgroundColor: ["#3182ce", "#38a169", "#dd6b20", "#c53030"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
  }
});
