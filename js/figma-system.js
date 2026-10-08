/**
 * PeaklyyX Enterprise SaaS - Reusable Figma Components & Design System Explorer
 * Color Tokens, Typography Scale, Component Matrix & Figma Studio Token Export
 */

class PeaklyyFigmaSystem {
  constructor() {
    this.initColorSwatches();
    this.initComponentPlayground();
    this.initTokensJsonViewer();
    this.initTabs();
  }

  initTabs() {
    document.querySelectorAll('.figma-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.figma-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.dataset.tab;
        document.querySelectorAll('.figma-tab-content').forEach(content => {
          content.style.display = content.id === `figmaTab-${tab}` ? 'block' : 'none';
        });
      });
    });
  }

  initColorSwatches() {
    const grid = document.getElementById('figmaColorGrid');
    if (!grid) return;

    const colors = [
      { name: "Brand Primary 500", hex: "#6366f1", cssVar: "--color-primary-500", desc: "Main brand actions & active states" },
      { name: "Brand Indigo 600", hex: "#4f46e5", cssVar: "--color-primary-600", desc: "Interactive hover & dark accent" },
      { name: "Cyber Cyan Accent", hex: "#06b6d4", cssVar: "--color-accent-cyan", desc: "Telemetry highlights & graphs" },
      { name: "Vivid Violet", hex: "#a855f7", cssVar: "--color-accent-purple", desc: "Gradients & enterprise tiers" },
      { name: "Emerald Operational", hex: "#10b981", cssVar: "--color-accent-emerald", desc: "Success, uptime & healthy SLA" },
      { name: "Warning Amber", hex: "#f59e0b", cssVar: "--color-accent-amber", desc: "SLA warnings & pending reviews" },
      { name: "Destructive Rose", hex: "#f43f5e", cssVar: "--color-accent-rose", desc: "Errors, cancellations & alerts" },
      { name: "Obsidian Deep", hex: "#080b11", cssVar: "--bg-app", desc: "Core dark mode app canvas" },
      { name: "Surface Elevated", hex: "#161e31", cssVar: "--bg-surface-elevated", desc: "Modals, toolbars & popovers" },
      { name: "Porcelain Light", hex: "#f8fafc", cssVar: "--bg-app (light)", desc: "Light theme high-contrast canvas" }
    ];

    grid.innerHTML = colors.map(c => `
      <div class="color-swatch-card" onclick="window.peaklyyFigma.copyColor('${c.hex}', '${c.name}')">
        <div class="color-swatch-box" style="background-color: ${c.hex};"></div>
        <div class="color-swatch-details">
          <div class="color-swatch-name">${c.name}</div>
          <div class="color-swatch-hex">${c.hex} • <code>${c.cssVar}</code></div>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${c.desc}</div>
        </div>
      </div>
    `).join('');
  }

  copyColor(hex, name) {
    navigator.clipboard.writeText(hex).then(() => {
      if (window.showToast) window.showToast('success', 'Token Copied', `Copied ${name} (${hex}) to clipboard!`);
    }).catch(() => {
      if (window.showToast) window.showToast('info', 'Token Selected', `${name}: ${hex}`);
    });
  }

  initComponentPlayground() {
    const updatePreview = () => {
      const variant = document.getElementById('playgroundVariantSelect')?.value || 'primary';
      const size = document.getElementById('playgroundSizeSelect')?.value || 'md';
      const isDisabled = document.getElementById('playgroundDisabledCheck')?.checked || false;
      const isLoading = document.getElementById('playgroundLoadingCheck')?.checked || false;
      const label = document.getElementById('playgroundLabelInput')?.value || 'Interactive Button';

      const previewBtn = document.getElementById('playgroundPreviewBtn');
      if (previewBtn) {
        previewBtn.className = `btn btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${isDisabled ? 'disabled' : ''}`;
        previewBtn.disabled = isDisabled;
        previewBtn.textContent = label;
      }

      // Update snippet
      const codeSnippet = document.getElementById('playgroundCodeSnippet');
      if (codeSnippet) {
        codeSnippet.textContent = `<button class="btn btn-${variant} btn-${size}${isLoading ? ' btn-loading' : ''}"${isDisabled ? ' disabled' : ''}>\n  ${label}\n</button>`;
      }
    };

    ['playgroundVariantSelect', 'playgroundSizeSelect', 'playgroundDisabledCheck', 'playgroundLoadingCheck', 'playgroundLabelInput'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updatePreview);
    });

    updatePreview();
  }

  initTokensJsonViewer() {
    const codeEl = document.getElementById('figmaTokensJsonCode');
    if (codeEl) {
      codeEl.textContent = JSON.stringify(PEAKLYY_DATA.figmaTokens, null, 2);
    }

    const copyBtn = document.getElementById('copyFigmaTokensBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = JSON.stringify(PEAKLYY_DATA.figmaTokens, null, 2);
        navigator.clipboard.writeText(text).then(() => {
          if (window.showToast) window.showToast('success', 'Figma Tokens Copied', 'JSON ready to paste into Tokens Studio for Figma!');
        });
      });
    }

    const downloadBtn = document.getElementById('downloadFigmaTokensBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PEAKLYY_DATA.figmaTokens, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", "peaklyyx-tokens.json");
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
        if (window.showToast) window.showToast('success', 'Tokens File Downloaded', 'peaklyyx-tokens.json is ready for Figma import.');
      });
    }
  }
}

window.PeaklyyFigmaSystem = PeaklyyFigmaSystem;
