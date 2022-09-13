(function populate() {
    const ctx = document.getElementById("myChart");
    fetch("./data.json")
      .then((weeklySpending) => {
        return weeklySpending.json();
      })
      .then((weeklySpending) => {
        const myChart = new Chart (ctx, {
            type: "bar",
            data: {
                datasets: [
                    {
                    data: [... weeklySpending],
                },
            ],
            },
            options: {
                responsive: true,
                parsing: {
                    xAxisKey: "day",
                    yAxisKey: "amount",
                },
                scales: {
                    x: {
                        ticks: {
                            display: true,
                            color: "hsl(28, 10%, 53%)",
                        },
                      grid: { display: false, drawBorder: false, offset: true},
                    },
                    y: {
                      grid: { display: false, drawBorder: false },
                      ticks: { display: false },
                    },
                  },
            plugins: {
             legend: {
                display: false,
             labels: {
                font: {
                    size: 123,
                    family:  "'DM Sans', sans-serif",
                },
             },
            },
            tooltip: {
                xAlign: "center",
                callbacks: {
                    title: function (context) {
                        context = "$" + context[0].formattedValue;
                        return context;
                    },
                    label: function (context) {
                        context = "";
                        return context;
                    }
                },
                backgroundColor: "hsl(25, 47%, 15%)",
                titleColor: "hsl(27, 66%, 92%)",
                titleMarginBottom: 0,
                padding: 8,
                caretSize: 0,
            },   
            },
            elements: {
                bar: {
                    backgroundColor: function (context) {
                        const today = new Date().getDay() - 1;
                        const index = context.dataIndex;
                        return index === today ? 'hsl(186, 34%, 60%)': 'hsl(10, 79%, 65%)';
                    },
                    hoverBackgroundColor: function (context) {
                        const today = new Date().getDay() - 1;
                        const index = context.dataIndex;
                        return index === today ? "#b4dfe5":  "#ff9b87";
                    },
                    borderRadius: 4,
                    borderSkipped: false,
                    datalabels: {
                        display: true,
                    }
                },
            },
            layout: {
                padding: {
                    left: -20,
                    bottom: -5,
                },
            },
        },
        });
});
})();