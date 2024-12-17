// charts.js
const chartInstances = {};

function destroyAllCharts() {
    const CanvasIds = ["naturalChart", "adaptedChart", "comparisonChart"];

    CanvasIds.forEach(id => {
        if (chartInstances[id]) {
            chartInstances[id].destroy();
            delete chartInstances[id];
        }
    });
}

function createChart(canvasId, label, scores) {
    const chartLabels = ["Dominância", "Influência", "Estabilidade", "Conformidade"];
    const chartColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
    
    const chartData = [scores.D, scores.I, scores.S, scores.C];

    const ctx = document.getElementById(canvasId).getContext("2d");
    chartInstances[canvasId] = new Chart(ctx, {
        type: "bar",
        data: {
            labels: chartLabels,
            datasets: [{
                label: label,
                data: chartData,
                backgroundColor: chartColors
            }]
        },
        options: {
            // scales: {
            //     y: {
            //         min: 0,
            //         max: 100
            //     }
            // },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'start',
                    formatter: (value) => value,
                    color: '#444'
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

function createComparisonChart(canvasId, score_natural, score_adaptado) {
    const chartLabels = ["Dominância", "Influência", "Estabilidade", "Conformidade"];

    const chartData = [score_natural.D, score_natural.I, score_natural.S, score_natural.C];
    const chartData2 = [score_adaptado.D, score_adaptado.I, score_adaptado.S, score_adaptado.C];


    const ctx = document.getElementById(canvasId).getContext("2d");
    chartInstances[canvasId] = new Chart(ctx, {
        type: "radar",
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: "Comportamento Natural",
                    data: chartData,
                    backgroundColor: "rgba(5, 150, 0, 0.2)"
                },
                {
                    label: "Comportamento Adaptado",
                    data: chartData2,
                    backgroundColor: "rgba(0, 87, 168, 0.2)"
                }
            ]
        },
        options: {
            // scales: {
            //     r: {
            //         min: 0,
            //         max: 100
            //     }
            // },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}


export { destroyAllCharts, createChart, createComparisonChart};
