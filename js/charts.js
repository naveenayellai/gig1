/**
 * PeaklyyX Enterprise SaaS - Custom High-Performance Charts
 * Canvas & SVG Revenue Area Chart & Donut Distribution
 */

class PeaklyyCharts {
  constructor() {
    this.currentPeriod = 'monthly';
    this.initRevenueChart();
    this.initDonutChart();
  }

  initRevenueChart() {
    const canvas = document.getElementById('revenueChartCanvas');
    if (!canvas) return;

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.tooltip = document.getElementById('chartTooltip');

    // Handle high-DPI screens
    this.resizeCanvas();
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.drawRevenueChart();
    });

    // Mouse interaction for crosshair & tooltip
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => this.handleMouseLeave());

    this.drawRevenueChart();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 280 * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `280px`;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = 280;
  }

  setPeriod(period) {
    this.currentPeriod = period;
    document.querySelectorAll('.chart-time-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.period === period);
    });
    this.drawRevenueChart();
  }

  drawRevenueChart() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const padding = { top: 30, right: 20, bottom: 40, left: 60 };

    ctx.clearRect(0, 0, w, h);

    const data = PEAKLYY_DATA.chartData[this.currentPeriod];
    const labels = data.labels;
    const ent = data.enterprise;
    const grw = data.growth;

    const maxVal = Math.max(...ent) * 1.15;
    const plotW = w - padding.left - padding.right;
    const plotH = h - padding.top - padding.bottom;

    // Draw horizontal grid lines
    const gridSteps = 4;
    ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light' 
      ? 'rgba(0, 0, 0, 0.06)' 
      : 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridSteps; i++) {
      const yVal = (maxVal / gridSteps) * i;
      const yPos = padding.top + plotH - (i / gridSteps) * plotH;

      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(w - padding.right, yPos);
      ctx.stroke();

      ctx.fillText(`$${Math.round(yVal / 1000)}k`, padding.left - 10, yPos + 4);
    }

    // X-axis labels
    ctx.textAlign = 'center';
    const xStep = plotW / (labels.length - 1);
    this.dataPoints = [];

    labels.forEach((label, idx) => {
      const xPos = padding.left + idx * xStep;
      ctx.fillText(label, xPos, h - 14);

      // Save coordinate for tooltip detection
      const yVal = ent[idx];
      const yPos = padding.top + plotH - (yVal / maxVal) * plotH;
      this.dataPoints.push({ x: xPos, y: yPos, label: label, enterprise: yVal, growth: grw[idx] });
    });

    // Draw Gradient Area for Enterprise
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.08)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    ctx.beginPath();
    ctx.moveTo(this.dataPoints[0].x, this.dataPoints[0].y);
    for (let i = 1; i < this.dataPoints.length; i++) {
      const prev = this.dataPoints[i - 1];
      const curr = this.dataPoints[i];
      const cx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
    }
    ctx.lineTo(this.dataPoints[this.dataPoints.length - 1].x, padding.top + plotH);
    ctx.lineTo(this.dataPoints[0].x, padding.top + plotH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw Stroke Line
    ctx.beginPath();
    ctx.moveTo(this.dataPoints[0].x, this.dataPoints[0].y);
    for (let i = 1; i < this.dataPoints.length; i++) {
      const prev = this.dataPoints[i - 1];
      const curr = this.dataPoints[i];
      const cx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
    }
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Secondary Growth Line
    ctx.beginPath();
    const grwPoints = labels.map((l, idx) => {
      return {
        x: padding.left + idx * xStep,
        y: padding.top + plotH - (grw[idx] / maxVal) * plotH
      };
    });
    ctx.moveTo(grwPoints[0].x, grwPoints[0].y);
    for (let i = 1; i < grwPoints.length; i++) {
      const prev = grwPoints[i - 1];
      const curr = grwPoints[i];
      const cx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cx, prev.y, cx, curr.y, curr.x, curr.y);
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  handleMouseMove(e) {
    if (!this.dataPoints || this.dataPoints.length === 0) return;
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    // Find nearest point
    let closest = this.dataPoints[0];
    let minDiff = Math.abs(mouseX - closest.x);

    for (let pt of this.dataPoints) {
      const diff = Math.abs(mouseX - pt.x);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }

    if (minDiff < 40) {
      this.drawRevenueChart();
      const ctx = this.ctx;

      // Draw crosshair line
      ctx.beginPath();
      ctx.moveTo(closest.x, 30);
      ctx.lineTo(closest.x, this.height - 40);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw active glow point
      ctx.beginPath();
      ctx.arc(closest.x, closest.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Show floating tooltip
      if (this.tooltip) {
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = `${closest.x}px`;
        this.tooltip.style.top = `${closest.y - 12}px`;
        this.tooltip.innerHTML = `
          <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">${closest.label}</div>
          <div style="font-size: 13px; font-weight: 700; color: #a5b4fc; font-family: var(--font-mono);">$${closest.enterprise.toLocaleString()} <span style="font-size: 10px; font-weight: normal; color: var(--text-muted);">Enterprise</span></div>
          <div style="font-size: 12px; font-weight: 600; color: #22d3ee; font-family: var(--font-mono);">$${closest.growth.toLocaleString()} <span style="font-size: 10px; font-weight: normal; color: var(--text-muted);">Growth</span></div>
        `;
      }
    } else {
      this.handleMouseLeave();
    }
  }

  handleMouseLeave() {
    if (this.tooltip) this.tooltip.style.display = 'none';
    this.drawRevenueChart();
  }

  initDonutChart() {
    const container = document.getElementById('donutChartContainer');
    if (!container) return;

    const data = PEAKLYY_DATA.tiersDistribution;
    let total = data.reduce((acc, curr) => acc + curr.count, 0);

    // Build SVG donut
    let cumulative = 0;
    const radius = 64;
    const strokeWidth = 18;
    const circumference = 2 * Math.PI * radius;

    let svgPaths = '';
    data.forEach(item => {
      const sliceFraction = item.count / total;
      const strokeDash = sliceFraction * circumference;
      const strokeOffset = circumference - (cumulative * circumference);

      svgPaths += `
        <circle 
          cx="100" cy="100" r="${radius}"
          fill="transparent"
          stroke="${item.color}"
          stroke-width="${strokeWidth}"
          stroke-dasharray="${strokeDash} ${circumference - strokeDash}"
          stroke-dashoffset="${strokeOffset}"
          stroke-linecap="round"
          style="transition: stroke-width 0.2s; cursor: pointer;"
        />
      `;
      cumulative += sliceFraction;
    });

    container.innerHTML = `
      <svg width="200" height="200" viewBox="0 0 200 200" style="transform: rotate(-90deg);">
        ${svgPaths}
      </svg>
      <div class="donut-center-text">
        <div class="donut-center-val">${total}</div>
        <div class="donut-center-label">Tenants</div>
      </div>
    `;

    // Render legend
    const legendEl = document.getElementById('donutLegendList');
    if (legendEl) {
      legendEl.innerHTML = data.map(item => `
        <div class="legend-item">
          <div class="legend-left">
            <span class="legend-dot" style="background-color: ${item.color}"></span>
            <span>${item.name}</span>
          </div>
          <span class="legend-val">${item.percentage}%</span>
        </div>
      `).join('');
    }
  }
}

window.PeaklyyCharts = PeaklyyCharts;
