/**
 * PeaklyyX Enterprise SaaS - Data Table Controller
 * Search, Multi-Filter, Sort, Bulk Selection, Pagination & Export
 */

class PeaklyyTable {
  constructor() {
    this.projects = [...PEAKLYY_DATA.projects];
    this.filteredProjects = [...this.projects];
    this.selectedIds = new Set();
    this.currentPage = 1;
    this.pageSize = 6;
    this.currentSort = { field: 'mrr', dir: 'desc' };
    this.currentFilterStatus = 'all';
    this.currentFilterTier = 'all';
    this.searchQuery = '';

    this.tableBody = document.getElementById('tableBody');
    this.selectAllCheckbox = document.getElementById('selectAllCheckbox');
    this.bulkActionBar = document.getElementById('bulkActionBar');
    this.bulkSelectedCount = document.getElementById('bulkSelectedCount');

    this.initEventListeners();
    this.render();
  }

  initEventListeners() {
    // Search input with debounce
    const searchInput = document.getElementById('tableSearchInput');
    if (searchInput) {
      let timeout = null;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.currentPage = 1;
          this.applyFilters();
        }, 150);
      });
    }

    // Status Filter Pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentFilterStatus = pill.dataset.status;
        this.currentPage = 1;
        this.applyFilters();
      });
    });

    // Tier Dropdown Filter
    const tierSelect = document.getElementById('tierFilterSelect');
    if (tierSelect) {
      tierSelect.addEventListener('change', (e) => {
        this.currentFilterTier = e.target.value;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Sortable Headers
    document.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const field = th.dataset.sort;
        if (this.currentSort.field === field) {
          this.currentSort.dir = this.currentSort.dir === 'asc' ? 'desc' : 'asc';
        } else {
          this.currentSort.field = field;
          this.currentSort.dir = 'asc';
        }
        this.applySort();
        this.render();
      });
    });

    // Select All Checkbox
    if (this.selectAllCheckbox) {
      this.selectAllCheckbox.addEventListener('click', () => {
        const pageItems = this.getCurrentPageItems();
        const allChecked = pageItems.every(p => this.selectedIds.has(p.id));

        if (allChecked) {
          pageItems.forEach(p => this.selectedIds.delete(p.id));
        } else {
          pageItems.forEach(p => this.selectedIds.add(p.id));
        }
        this.updateBulkActionBar();
        this.render();
      });
    }

    // Bulk Export
    const bulkExportBtn = document.getElementById('bulkExportBtn');
    if (bulkExportBtn) {
      bulkExportBtn.addEventListener('click', () => this.exportSelectedCSV());
    }

    // Bulk Delete
    const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
    if (bulkDeleteBtn) {
      bulkDeleteBtn.addEventListener('click', () => this.deleteSelected());
    }

    // Clear Bulk Selection
    const bulkCloseBtn = document.getElementById('bulkCloseBtn');
    if (bulkCloseBtn) {
      bulkCloseBtn.addEventListener('click', () => {
        this.selectedIds.clear();
        this.updateBulkActionBar();
        this.render();
      });
    }

    // Global Export CSV Button in View Header
    const exportTableBtn = document.getElementById('exportTableBtn');
    if (exportTableBtn) {
      exportTableBtn.addEventListener('click', () => this.exportAllCSV());
    }
  }

  applyFilters() {
    this.filteredProjects = this.projects.filter(p => {
      // Search check
      const matchesSearch = !this.searchQuery || 
        p.client.toLowerCase().includes(this.searchQuery) ||
        p.domain.toLowerCase().includes(this.searchQuery) ||
        p.owner.toLowerCase().includes(this.searchQuery) ||
        p.id.toLowerCase().includes(this.searchQuery);

      // Status check
      const matchesStatus = this.currentFilterStatus === 'all' || 
        p.status.toLowerCase() === this.currentFilterStatus.toLowerCase();

      // Tier check
      const matchesTier = this.currentFilterTier === 'all' || 
        p.tier.toLowerCase() === this.currentFilterTier.toLowerCase();

      return matchesSearch && matchesStatus && matchesTier;
    });

    this.applySort();
    this.render();
  }

  applySort() {
    const { field, dir } = this.currentSort;
    this.filteredProjects.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return dir === 'asc' ? -1 : 1;
      if (valA > valB) return dir === 'asc' ? 1 : -1;
      return 0;
    });
  }

  getCurrentPageItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProjects.slice(start, start + this.pageSize);
  }

  updateBulkActionBar() {
    if (!this.bulkActionBar) return;
    const count = this.selectedIds.size;
    if (count > 0) {
      this.bulkActionBar.classList.add('visible');
      if (this.bulkSelectedCount) this.bulkSelectedCount.textContent = `${count} selected`;
    } else {
      this.bulkActionBar.classList.remove('visible');
    }
  }

  toggleSelect(id) {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
    } else {
      this.selectedIds.add(id);
    }
    this.updateBulkActionBar();
    this.render();
  }

  deleteProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.selectedIds.delete(id);
    this.applyFilters();
    if (window.showToast) window.showToast('info', 'Project Removed', `Project ${id} was deleted successfully.`);
  }

  deleteSelected() {
    const count = this.selectedIds.size;
    this.projects = this.projects.filter(p => !this.selectedIds.has(p.id));
    this.selectedIds.clear();
    this.updateBulkActionBar();
    this.applyFilters();
    if (window.showToast) window.showToast('info', 'Batch Removal', `${count} projects removed successfully.`);
  }

  exportSelectedCSV() {
    const selectedList = this.projects.filter(p => this.selectedIds.has(p.id));
    this.generateCSV(selectedList, 'peaklyyx-selected-clients.csv');
  }

  exportAllCSV() {
    this.generateCSV(this.filteredProjects, 'peaklyyx-all-clients.csv');
  }

  generateCSV(list, filename) {
    const headers = ["ID", "Client", "Domain", "Tier", "MRR", "Status", "Health", "Milestone", "Deadline", "Owner"];
    const rows = list.map(p => [
      p.id,
      `"${p.client}"`,
      p.domain,
      p.tier,
      p.mrr,
      p.status,
      `${p.healthScore}%`,
      `"${p.milestone}"`,
      p.deadline,
      `"${p.owner}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.showToast) window.showToast('success', 'Export Complete', `Downloaded ${list.length} records to ${filename}`);
  }

  getStatusBadgeClass(status) {
    switch (status) {
      case 'Active': return 'badge-success';
      case 'In Review': return 'badge-warning';
      case 'Deploying': return 'badge-info';
      case 'Suspended': return 'badge-danger';
      default: return 'badge-neutral';
    }
  }

  getHealthColor(score) {
    if (score >= 90) return 'var(--color-accent-emerald)';
    if (score >= 70) return 'var(--color-accent-amber)';
    return 'var(--color-accent-rose)';
  }

  render() {
    if (!this.tableBody) return;

    const pageItems = this.getCurrentPageItems();

    if (pageItems.length === 0) {
      this.tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 48px 16px;">
            <div style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">No projects found</div>
            <div style="font-size: 13px; color: var(--text-muted);">Try adjusting your search filters or status selection</div>
          </td>
        </tr>
      `;
      this.renderPagination();
      return;
    }

    this.tableBody.innerHTML = pageItems.map(p => {
      const isSelected = this.selectedIds.has(p.id);
      const statusClass = this.getStatusBadgeClass(p.status);
      const healthColor = this.getHealthColor(p.healthScore);

      return `
        <tr class="${isSelected ? 'selected' : ''}">
          <td style="width: 40px;">
            <div class="custom-checkbox ${isSelected ? 'checked' : ''}" onclick="window.peaklyyTable.toggleSelect('${p.id}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </td>
          <td>
            <div class="client-cell">
              <div class="client-avatar" style="background: ${p.avatarBg};">${p.avatarInitials}</div>
              <div>
                <div class="client-name">${p.client}</div>
                <div class="client-domain">${p.domain} • <span style="font-family: var(--font-mono);">${p.id}</span></div>
              </div>
            </div>
          </td>
          <td>
            <span class="badge ${p.tier === 'Enterprise' ? 'badge-brand' : p.tier === 'Scale' ? 'badge-info' : 'badge-neutral'}">
              ${p.tier}
            </span>
          </td>
          <td class="currency-cell">$${p.mrr.toLocaleString()}</td>
          <td>
            <span class="badge ${statusClass}">
              <span class="badge-dot"></span>
              ${p.status}
            </span>
          </td>
          <td>
            <div class="health-meter-wrap">
              <div class="health-bar-track">
                <div class="health-bar-fill" style="width: ${p.healthScore}%; background-color: ${healthColor};"></div>
              </div>
              <span class="health-score-val">${p.healthScore}% SLA</span>
            </div>
          </td>
          <td>
            <div style="font-size: 12px; font-weight: 600; color: var(--text-primary);">${p.milestone}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${p.deadline}</div>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button class="btn btn-ghost btn-sm" onclick="window.peaklyyTable.viewDetails('${p.id}')" title="View Details">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button class="btn btn-ghost btn-sm" onclick="window.peaklyyTable.deleteProject('${p.id}')" title="Delete">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Check all state
    if (this.selectAllCheckbox) {
      const allSelected = pageItems.length > 0 && pageItems.every(p => this.selectedIds.has(p.id));
      this.selectAllCheckbox.classList.toggle('checked', allSelected);
    }

    this.renderPagination();
  }

  viewDetails(id) {
    const p = this.projects.find(x => x.id === id);
    if (!p) return;
    if (window.showToast) {
      window.showToast('info', `${p.client} (${p.id})`, `Tier: ${p.tier} | MRR: $${p.mrr.toLocaleString()} | Health: ${p.healthScore}% | Owner: ${p.owner}`);
    }
  }

  renderPagination() {
    const total = this.filteredProjects.length;
    const totalPages = Math.ceil(total / this.pageSize) || 1;
    const startIdx = total === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const endIdx = Math.min(this.currentPage * this.pageSize, total);

    const infoEl = document.getElementById('paginationInfo');
    if (infoEl) {
      infoEl.textContent = `Showing ${startIdx} to ${endIdx} of ${total} client projects`;
    }

    const controlsEl = document.getElementById('paginationControls');
    if (controlsEl) {
      let btnsHtml = `
        <button class="page-btn" ${this.currentPage === 1 ? 'disabled style="opacity: 0.4;"' : ''} onclick="window.peaklyyTable.goToPage(${this.currentPage - 1})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      `;

      for (let i = 1; i <= totalPages; i++) {
        btnsHtml += `
          <button class="page-btn ${this.currentPage === i ? 'active' : ''}" onclick="window.peaklyyTable.goToPage(${i})">${i}</button>
        `;
      }

      btnsHtml += `
        <button class="page-btn" ${this.currentPage === totalPages ? 'disabled style="opacity: 0.4;"' : ''} onclick="window.peaklyyTable.goToPage(${this.currentPage + 1})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      `;

      controlsEl.innerHTML = btnsHtml;
    }
  }

  goToPage(page) {
    const totalPages = Math.ceil(this.filteredProjects.length / this.pageSize) || 1;
    if (page < 1 || page > totalPages) return;
    this.currentPage = page;
    this.render();
  }

  addNewProject(newProj) {
    this.projects.unshift(newProj);
    this.applyFilters();
  }
}

window.PeaklyyTable = PeaklyyTable;
