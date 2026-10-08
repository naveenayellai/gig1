/**
 * PeaklyyX Enterprise SaaS - Global Application Controller
 * Routing, Theme Toggle, Command Palette, Toasts & App Shell Lifecycle
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Toast System
  window.showToast = (type, title, message) => {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    } else {
      iconSvg = '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
      <div class="toast-close" onclick="this.parentElement.remove()">&times;</div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // View Navigation Router
  const switchView = (targetView) => {
    // Nav items
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === targetView);
    });

    // Content views
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.toggle('active', section.id === `view-${targetView}`);
    });

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    if (breadcrumbCurrent) {
      const titles = {
        'dashboard': 'Executive Dashboard',
        'tables': 'Client Projects & Tenancy',
        'states': 'System States Hub',
        'figma': 'Figma Design System',
        'submission': 'Peaklyy Proof of Work'
      };
      breadcrumbCurrent.textContent = titles[targetView] || 'Overview';
    }

    // Close mobile sidebar on select
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    // Trigger chart resize if navigating to dashboard
    if (targetView === 'dashboard' && window.peaklyyCharts) {
      setTimeout(() => {
        window.peaklyyCharts.resizeCanvas();
        window.peaklyyCharts.drawRevenueChart();
      }, 50);
    }
  };

  // Nav click handlers
  document.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', () => switchView(el.dataset.view));
  });

  // Theme Switching
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const initTheme = () => {
    const savedTheme = localStorage.getItem('peaklyy_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  };

  const updateThemeIcon = (theme) => {
    if (!themeToggleBtn) return;
    if (theme === 'light') {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.title = "Switch to Dark Mode";
    } else {
      themeToggleBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.title = "Switch to Light Mode";
    }
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('peaklyy_theme', nextTheme);
      updateThemeIcon(nextTheme);

      // Re-draw chart on theme change for contrast
      if (window.peaklyyCharts) {
        window.peaklyyCharts.drawRevenueChart();
      }
    });
  }

  initTheme();

  // Sidebar Collapse
  const sidebar = document.getElementById('sidebar');
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  if (sidebarCollapseBtn && sidebar) {
    sidebarCollapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      setTimeout(() => {
        if (window.peaklyyCharts) {
          window.peaklyyCharts.resizeCanvas();
          window.peaklyyCharts.drawRevenueChart();
        }
      }, 300);
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Activity Feed Render
  const renderActivityFeed = () => {
    const list = document.getElementById('activityFeedList');
    if (!list) return;

    list.innerHTML = PEAKLYY_DATA.activities.map(act => {
      return `
        <div class="activity-item">
          <div class="activity-icon-badge ${act.badge}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div class="activity-meta">
            <div class="activity-text">
              <strong>${act.user}</strong> ${act.action} <strong>${act.target}</strong>
            </div>
            <div class="activity-time">${act.time}</div>
          </div>
        </div>
      `;
    }).join('');
  };

  renderActivityFeed();

  // Command Palette (Cmd+K / Ctrl+K)
  const cmdPalette = document.getElementById('commandPalette');
  const cmdInput = document.getElementById('cmdSearchInput');
  const cmdResults = document.getElementById('cmdResultsList');

  const openCmdPalette = () => {
    if (!cmdPalette) return;
    cmdPalette.classList.add('open');
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
      filterCmdActions('');
    }
  };

  const closeCmdPalette = () => {
    if (cmdPalette) cmdPalette.classList.remove('open');
  };

  document.querySelectorAll('.trigger-cmd-k').forEach(el => {
    el.addEventListener('click', openCmdPalette);
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPalette && cmdPalette.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    }
    if (e.key === 'Escape' && cmdPalette && cmdPalette.classList.contains('open')) {
      closeCmdPalette();
    }
  });

  if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closeCmdPalette();
    });
  }

  const cmdActions = [
    { title: "Create New Client Project", category: "Actions", shortcut: "N", run: () => window.peaklyyForm.openModal() },
    { title: "Go to Executive Dashboard", category: "Navigation", shortcut: "G D", run: () => switchView('dashboard') },
    { title: "View Client Projects Table", category: "Navigation", shortcut: "G T", run: () => switchView('tables') },
    { title: "Explore System States (Skeleton, Empty, Error)", category: "Navigation", shortcut: "G S", run: () => switchView('states') },
    { title: "Explore Figma Design Tokens & Components", category: "Navigation", shortcut: "G F", run: () => switchView('figma') },
    { title: "View Peaklyy Proof of Work & Deliverables", category: "Navigation", shortcut: "G P", run: () => switchView('submission') },
    { title: "Export Client Projects to CSV", category: "Data", shortcut: "E", run: () => window.peaklyyTable.exportAllCSV() },
    { title: "Copy Figma Tokens Studio JSON", category: "Design", shortcut: "C", run: () => {
      navigator.clipboard.writeText(JSON.stringify(PEAKLYY_DATA.figmaTokens, null, 2));
      window.showToast('success', 'Tokens Copied', 'Figma tokens JSON copied to clipboard');
    }}
  ];

  const filterCmdActions = (query) => {
    if (!cmdResults) return;
    const filtered = cmdActions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
      cmdResults.innerHTML = '<div style="padding: 16px; color: var(--text-muted); text-align: center;">No matching actions</div>';
      return;
    }

    cmdResults.innerHTML = filtered.map((item, idx) => `
      <div class="cmd-item" data-idx="${idx}" onclick="window.runCmdAction(${idx})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <span>${item.title}</span>
        <span class="cmd-item-shortcut">${item.shortcut}</span>
      </div>
    `).join('');
  };

  window.runCmdAction = (idx) => {
    closeCmdPalette();
    if (cmdActions[idx]) cmdActions[idx].run();
  };

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => filterCmdActions(e.target.value.trim()));
  }

  // Initialize Subsystems
  window.peaklyyCharts = new PeaklyyCharts();
  window.peaklyyTable = new PeaklyyTable();
  window.peaklyyForm = new PeaklyyForm();
  window.peaklyyStates = new PeaklyyStates();
  window.peaklyyFigma = new PeaklyyFigmaSystem();

  // Welcome Toast
  setTimeout(() => {
    window.showToast('success', 'PeaklyyX Client Suite Active', 'Welcome to the PeaklyyX Projects Dashboard. Press Ctrl+K for quick commands.');
  }, 600);
});
