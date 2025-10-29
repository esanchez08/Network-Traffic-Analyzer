let chart;

async function fetchData() {
  const res = await fetch("/data");
  const data = await res.json();

  const ctx = document.getElementById("trafficChart").getContext("2d");
  const ips = Object.keys(data.packet_count);
  const counts = Object.values(data.packet_count);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ips,
      datasets: [{
        label: 'Packets per IP',
        data: counts,
        backgroundColor: 'rgba(0, 200, 255, 0.7)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#eee" } }
      },
      scales: {
        x: { ticks: { color: "#eee" } },
        y: { ticks: { color: "#eee" } }
      }
    }
  });

  // Update alerts
  const alertsList = document.getElementById("alerts");
  alertsList.innerHTML = "";
  data.alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert;
    alertsList.appendChild(li);
  });
}

setInterval(fetchData, 3000);
fetchData();
