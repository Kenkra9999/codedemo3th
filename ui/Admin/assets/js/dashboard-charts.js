document.addEventListener("DOMContentLoaded", () => {
  // 1. Biểu đồ Cột (Revenue Trends)
  const revenueChartCtx = document.getElementById("revenueChart");
  if (revenueChartCtx) {
    new Chart(revenueChartCtx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [
              170000, 185000, 200000, 215000, 240000, 255000, 270000, 280000,
              275000, 290000, 310000, 295000,
            ],
            backgroundColor: "#3182ce",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` Revenue: $${context.parsed.y.toLocaleString()}`;
              },
            },
          },
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
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  // 2. Biểu đồ Tròn (Sales by Category)
  const categoryChartCtx = document.getElementById("categoryChart");
  if (categoryChartCtx) {
    new Chart(categoryChartCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Smartphones",
          "Laptops",
          "Accessories",
          "Smart Home",
          "Others",
        ],
        datasets: [
          {
            data: [35, 28, 20, 12, 5],
            backgroundColor: [
              "#3182ce",
              "#38a169",
              "#dd6b20",
              "#c53030",
              "#6b46c1",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
});
