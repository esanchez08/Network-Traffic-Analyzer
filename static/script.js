async function fetchData() {
  const res = await fetch("/data");
  const data = await res.json();
  
  // Update chart
  const ctx = document.getElementById("trafficChart").getContext("2d");
  const ips = Object.keys(data.packet_count);
  const counts = Object.values(data.packet_count);
  
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ips,
      datasets: [{
        label: "Packets per IP",
        data: counts,
      }]
    },
    options: {
      plugins: { legend: { labels: { color: "#eee" } } },
      scales: {
        x: { ticks: { color: "#eee" } },
        y: { ticks: { color: "#eee" } }
      }
    }
  });

  // Update alerts
  const alertsList = document.getElementById("alerts");
  alertsList.innerHTML = "";
  data.alerts.forEach(a => {
    const li = document.createElement("li");
    li.textContent = a;
    alertsList.appendChild(li);
  });
}

setInterval(fetchData, 3000);
fetchData();
