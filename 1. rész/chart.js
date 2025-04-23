// chart.js

let ctx = document.getElementById('lineChart').getContext('2d');
let chart;

document.querySelectorAll('#chartTable tbody tr').forEach(row => {
  row.addEventListener('click', () => {
    const data = Array.from(row.cells).slice(1).map(cell => Number(cell.textContent));
    drawChart(data);
  });
});

function drawChart(data) {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Kiválasztott sor adatai',
        data: data,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}
