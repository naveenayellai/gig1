/**
 * PeaklyyX Enterprise SaaS - System States Controller
 * Loaded, Skeleton Loading, Empty State, Error State
 */

class PeaklyyStates {
  constructor() {
    this.currentState = 'loaded';
    this.initEventListeners();
  }

  initEventListeners() {
    document.querySelectorAll('.state-switcher-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetState = btn.dataset.state;
        this.setState(targetState);
      });
    });
  }

  setState(state) {
    this.currentState = state;

    // Update switcher button highlights
    document.querySelectorAll('.state-switcher-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.state === state);
      if (btn.dataset.state === state) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-secondary');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
      }
    });

    const stage = document.getElementById('statePreviewStage');
    if (!stage) return;

    switch (state) {
      case 'loaded':
        this.renderLoadedState(stage);
        break;
      case 'loading':
        this.renderLoadingState(stage);
        break;
      case 'empty':
        this.renderEmptyState(stage);
        break;
      case 'error':
        this.renderErrorState(stage);
        break;
    }
  }

  renderLoadedState(stage) {
    stage.innerHTML = `
      <div style="animation: fadeIn 0.3s ease;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <h4 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Loaded Production State</h4>
            <p style="font-size: 13px; color: var(--text-muted);">Real-time live telemetry, active subscriptions, and active data streams.</p>
          </div>
          <span class="badge badge-success"><span class="badge-dot"></span> System Live & Operational</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
          <div class="card" style="padding: 16px;">
            <div style="font-size: 12px; color: var(--text-muted);">Monthly Active Tenancy</div>
            <div style="font-size: 22px; font-weight: 800; font-family: var(--font-mono); margin: 6px 0;">1,420 / 2,000</div>
            <span class="badge badge-brand">71% Quota</span>
          </div>
          <div class="card" style="padding: 16px;">
            <div style="font-size: 12px; color: var(--text-muted);">Ingestion Throughput</div>
            <div style="font-size: 22px; font-weight: 800; font-family: var(--font-mono); margin: 6px 0;">48.2 MB/s</div>
            <span class="badge badge-success">+14% vs avg</span>
          </div>
          <div class="card" style="padding: 16px;">
            <div style="font-size: 12px; color: var(--text-muted);">P99 API Latency</div>
            <div style="font-size: 22px; font-weight: 800; font-family: var(--font-mono); margin: 6px 0;">24.8 ms</div>
            <span class="badge badge-info">Edge Cached</span>
          </div>
        </div>

        <div class="card" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-weight: 600;">Live Subscription Stream</span>
            <button class="btn btn-outline btn-sm" onclick="window.showToast('info', 'Live Refresh', 'Stream synced with edge nodes')">Sync Now</button>
          </div>
          <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.8;">
            ✔ Vertex Quantum AI - Dedicated cluster healthy (US-East)<br/>
            ✔ Hyperion FinTech - PCI DSS compliance verified (AP-East)<br/>
            ✔ Krypton Cyber Defense - Zero trust token refreshed (US-GovCloud)
          </div>
        </div>
      </div>
    `;
  }

  renderLoadingState(stage) {
    stage.innerHTML = `
      <div style="animation: fadeIn 0.3s ease;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <div class="skeleton skeleton-title" style="width: 220px;"></div>
            <div class="skeleton skeleton-text" style="width: 320px;"></div>
          </div>
          <div class="skeleton" style="width: 140px; height: 28px; border-radius: 9999px;"></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
          <div class="card" style="padding: 16px;">
            <div class="skeleton skeleton-text" style="width: 80px;"></div>
            <div class="skeleton skeleton-title" style="width: 140px; margin: 8px 0;"></div>
            <div class="skeleton" style="width: 60px; height: 20px;"></div>
          </div>
          <div class="card" style="padding: 16px;">
            <div class="skeleton skeleton-text" style="width: 110px;"></div>
            <div class="skeleton skeleton-title" style="width: 130px; margin: 8px 0;"></div>
            <div class="skeleton" style="width: 70px; height: 20px;"></div>
          </div>
          <div class="card" style="padding: 16px;">
            <div class="skeleton skeleton-text" style="width: 95px;"></div>
            <div class="skeleton skeleton-title" style="width: 120px; margin: 8px 0;"></div>
            <div class="skeleton" style="width: 80px; height: 20px;"></div>
          </div>
        </div>

        <div class="card" style="padding: 20px;">
          <div class="skeleton" style="height: 140px; width: 100%; border-radius: 8px;"></div>
        </div>
      </div>
    `;
  }

  renderEmptyState(stage) {
    stage.innerHTML = `
      <div class="empty-state-view" style="animation: scaleUp 0.3s ease;">
        <div class="empty-state-illustration">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polygon points="12 2 2 7 12 12 22 7 12 2"><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <h3 class="empty-state-title">No Active Client Projects</h3>
        <p class="empty-state-desc">
          You haven't provisioned any client tenants in this workspace yet. Launch a new project or import configuration from PeaklyyX CLI to get started.
        </p>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-primary btn-md trigger-new-project-modal" onclick="window.peaklyyForm.openModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create First Project
          </button>
          <button class="btn btn-secondary btn-md" onclick="window.peaklyyStates.setState('loaded')">
            Reset to Sample Data
          </button>
        </div>
      </div>
    `;
  }

  renderErrorState(stage) {
    stage.innerHTML = `
      <div class="error-state-view" style="animation: scaleUp 0.3s ease;">
        <div class="error-state-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 class="empty-state-title" style="color: var(--color-accent-rose);">503 Service Temporarily Unavailable</h3>
        <p class="empty-state-desc">
          The PeaklyyX Telemetry Gateway encountered an upstream timeout while syncing cluster telemetry. Regional failover is active.
        </p>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-danger btn-md" onclick="window.peaklyyStates.retryConnection(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Retry Telemetry Sync
          </button>
          <button class="btn btn-secondary btn-md" onclick="window.peaklyyStates.setState('loaded')">
            Back to Safe Mode
          </button>
        </div>
      </div>
    `;
  }

  retryConnection(btn) {
    btn.classList.add('btn-loading');
    setTimeout(() => {
      btn.classList.remove('btn-loading');
      if (window.showToast) window.showToast('success', 'Gateway Reconnected', 'Connection re-established with edge telemetry proxy.');
      this.setState('loaded');
    }, 900);
  }
}

window.PeaklyyStates = PeaklyyStates;
