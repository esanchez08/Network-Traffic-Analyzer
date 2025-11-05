// ===== NETWORK TRAFFIC ANALYZER =====
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
        backgroundColor: 'rgba(8, 0, 255, 0.7)'
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

  
  const alertsList = document.getElementById("alerts");
  alertsList.innerHTML = "";
  data.alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert;
    alertsList.appendChild(li);
  });
}

setInterval(fetchData, 3000000);
fetchData();


// ===== THEME SWITCHER DROPDOWN =====
const themes = {
  dark: {
    name: 'Dark Cyber',
    bodyBg: 'radial-gradient(circle at top left, #021b17, #010a08)',
    textColor: '#d3f7ef',
    accentColor: '#8bbea4',
    containerBg: 'rgba(0, 20, 20, 0.35)',
    boxBg: 'rgba(0, 40, 35, 0.35)',
    borderColor: 'rgba(0, 255, 200, 0.15)',
    borderHover: 'rgba(0, 255, 200, 0.4)',
    glowColor: 'rgba(0, 255, 200, 0.05)',
    glowHover: 'rgba(0, 255, 200, 0.1)'
  },
  ocean: {
    name: 'Ocean Blue',
    bodyBg: 'radial-gradient(circle at top left, #0a1929, #001e3c)',
    textColor: '#b3e5fc',
    accentColor: '#64b5f6',
    containerBg: 'rgba(13, 27, 42, 0.35)',
    boxBg: 'rgba(21, 47, 78, 0.35)',
    borderColor: 'rgba(100, 181, 246, 0.15)',
    borderHover: 'rgba(100, 181, 246, 0.4)',
    glowColor: 'rgba(100, 181, 246, 0.05)',
    glowHover: 'rgba(100, 181, 246, 0.1)'
  },
  sunset: {
    name: 'Sunset',
    bodyBg: 'radial-gradient(circle at top left, #1a0a0f, #0f0506)',
    textColor: '#ffd1dc',
    accentColor: '#ff8fa3',
    containerBg: 'rgba(30, 10, 15, 0.35)',
    boxBg: 'rgba(45, 20, 30, 0.35)',
    borderColor: 'rgba(255, 143, 163, 0.15)',
    borderHover: 'rgba(255, 143, 163, 0.4)',
    glowColor: 'rgba(255, 143, 163, 0.05)',
    glowHover: 'rgba(255, 143, 163, 0.1)'
  },
  purple: {
    name: 'Purple Haze',
    bodyBg: 'radial-gradient(circle at top left, #1a0a2e, #0f0518)',
    textColor: '#e1d4f7',
    accentColor: '#b794f4',
    containerBg: 'rgba(26, 10, 46, 0.35)',
    boxBg: 'rgba(42, 20, 70, 0.35)',
    borderColor: 'rgba(183, 148, 244, 0.15)',
    borderHover: 'rgba(183, 148, 244, 0.4)',
    glowColor: 'rgba(183, 148, 244, 0.05)',
    glowHover: 'rgba(183, 148, 244, 0.1)'
  },
  forest: {
    name: 'Forest',
    bodyBg: 'radial-gradient(circle at top left, #0d1f0d, #040a04)',
    textColor: '#c8e6c9',
    accentColor: '#81c784',
    containerBg: 'rgba(13, 31, 13, 0.35)',
    boxBg: 'rgba(26, 50, 26, 0.35)',
    borderColor: 'rgba(129, 199, 132, 0.15)',
    borderHover: 'rgba(129, 199, 132, 0.4)',
    glowColor: 'rgba(129, 199, 132, 0.05)',
    glowHover: 'rgba(129, 199, 132, 0.1)'
  }
};

// Apply theme
function applyTheme(themeName) {
  const theme = themes[themeName];
  const root = document.documentElement;
  
  root.style.setProperty('--body-bg', theme.bodyBg);
  root.style.setProperty('--text-color', theme.textColor);
  root.style.setProperty('--accent-color', theme.accentColor);
  root.style.setProperty('--container-bg', theme.containerBg);
  root.style.setProperty('--box-bg', theme.boxBg);
  root.style.setProperty('--border-color', theme.borderColor);
  root.style.setProperty('--border-hover', theme.borderHover);
  root.style.setProperty('--glow-color', theme.glowColor);
  root.style.setProperty('--glow-hover', theme.glowHover);
  
  // Save to localStorage
  localStorage.setItem('selectedTheme', themeName);
  
  // Show theme name briefly
  showThemeNotification(theme.name);
}

// Show theme notification
function showThemeNotification(themeName) {
  const existing = document.querySelector('.theme-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = 'theme-notification';
  notification.textContent = `Theme: ${themeName}`;
  document.body.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 1500);
}

// Create dropdown menu
function createThemeDropdown() {
  const dropdown = document.createElement('div');
  dropdown.className = 'theme-dropdown';
  dropdown.id = 'themeDropdown';
  
  Object.keys(themes).forEach(themeKey => {
    const option = document.createElement('div');
    option.className = 'theme-option';
    option.textContent = themes[themeKey].name;
    option.dataset.theme = themeKey;
    
    // Check if this is the current theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    if (themeKey === savedTheme) {
      option.classList.add('active');
    }
    
    option.addEventListener('click', () => {
      applyTheme(themeKey);
      // Update active state
      document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      // Close dropdown
      dropdown.classList.remove('show');
    });
    
    dropdown.appendChild(option);
  });
  
  document.body.appendChild(dropdown);
  return dropdown;
}

// Toggle dropdown
function toggleDropdown(button, dropdown) {
  const isVisible = dropdown.classList.contains('show');
  
  if (isVisible) {
    dropdown.classList.remove('show');
  } else {
    // Position dropdown below button
    const rect = button.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + 10}px`;
    dropdown.style.right = `${window.innerWidth - rect.right}px`;
    dropdown.classList.add('show');
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Load saved theme or use default
  const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
  applyTheme(savedTheme);
  
  // Create dropdown menu
  const dropdown = createThemeDropdown();
  
  // Add click event to theme button
  const themeBtn = document.querySelector('.more-btn');
  if (themeBtn) {
    themeBtn.title = 'Change Theme';
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(themeBtn, dropdown);
    });
  }
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.theme-dropdown') && !e.target.closest('.more-btn')) {
      dropdown.classList.remove('show');
    }
  });
});