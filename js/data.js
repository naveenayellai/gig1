/**
 * PeaklyyX Enterprise SaaS - Seed Database & Data Models
 */

const PEAKLYY_DATA = {
  // KPI Metrics
  kpis: {
    mrr: { value: "$184,920", trend: "+18.4%", direction: "up", period: "vs last month" },
    activeProjects: { value: "142", trend: "+12.1%", direction: "up", period: "vs last quarter" },
    netRetention: { value: "118.6%", trend: "+2.3%", direction: "up", period: "enterprise benchmark" },
    uptimeSla: { value: "99.98%", trend: "-0.01%", direction: "up", period: "30-day trailing" }
  },

  // Revenue Chart Historical Data
  chartData: {
    monthly: {
      labels: ["Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26", "Oct 26"],
      enterprise: [65000, 72000, 81000, 88000, 94000, 102000, 114000, 122000, 134000, 142000, 156000, 184920],
      growth: [24000, 27000, 31000, 34000, 37000, 41000, 46000, 49000, 53000, 58000, 62000, 68400]
    },
    weekly: {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
      enterprise: [142000, 146000, 151000, 155000, 160000, 168000, 175000, 184920],
      growth: [55000, 57000, 59000, 61000, 63000, 64500, 66000, 68400]
    }
  },

  // Plan Distribution Breakdown
  tiersDistribution: [
    { name: "Enterprise Dedicated", percentage: 54, count: 68, color: "#6366f1" },
    { name: "Scale Accelerator", percentage: 32, count: 47, color: "#06b6d4" },
    { name: "Growth Seed", percentage: 14, count: 27, color: "#a855f7" }
  ],

  // Client Projects Dataset (20+ Rich Records)
  projects: [
    {
      id: "PRJ-9041",
      client: "Vertex Quantum AI",
      domain: "vertexquantum.io",
      avatarBg: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      avatarInitials: "VQ",
      tier: "Enterprise",
      mrr: 18500,
      status: "Active",
      healthScore: 98,
      milestone: "Q4 Infrastructure Scale",
      deadline: "2026-11-15",
      owner: "Elena Rostova",
      region: "US-East (N. Virginia)"
    },
    {
      id: "PRJ-9042",
      client: "Aetheria Cloud Fabric",
      domain: "aetheria.cloud",
      avatarBg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      avatarInitials: "AC",
      tier: "Enterprise",
      mrr: 24000,
      status: "Active",
      healthScore: 95,
      milestone: "Multi-Region VPC Deploy",
      deadline: "2026-10-30",
      owner: "Devon Vance",
      region: "EU-West (Frankfurt)"
    },
    {
      id: "PRJ-9043",
      client: "Synthetix BioTech",
      domain: "synthetixbio.org",
      avatarBg: "linear-gradient(135deg, #10b981, #059669)",
      avatarInitials: "SB",
      tier: "Scale",
      mrr: 9200,
      status: "In Review",
      healthScore: 82,
      milestone: "HIPAA Compliance Audit",
      deadline: "2026-10-24",
      owner: "Marcus Thorne",
      region: "US-West (Oregon)"
    },
    {
      id: "PRJ-9044",
      client: "Hyperion FinTech Core",
      domain: "hyperionpay.global",
      avatarBg: "linear-gradient(135deg, #f59e0b, #d97706)",
      avatarInitials: "HF",
      tier: "Enterprise",
      mrr: 31500,
      status: "Active",
      healthScore: 99,
      milestone: "PCI-DSS Level 1 Cert",
      deadline: "2026-12-01",
      owner: "Elena Rostova",
      region: "AP-East (Tokyo)"
    },
    {
      id: "PRJ-9045",
      client: "Solaria Clean Energy",
      domain: "solariagrid.net",
      avatarBg: "linear-gradient(135deg, #ec4899, #8b5cf6)",
      avatarInitials: "SC",
      tier: "Scale",
      mrr: 7800,
      status: "Deploying",
      healthScore: 74,
      milestone: "IoT Telemetry Pipeline",
      deadline: "2026-11-05",
      owner: "Sarah Jenkins",
      region: "EU-Central (Zurich)"
    },
    {
      id: "PRJ-9046",
      client: "NeuroPulse Dynamics",
      domain: "neuropulse.ai",
      avatarBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
      avatarInitials: "ND",
      tier: "Enterprise",
      mrr: 16400,
      status: "Active",
      healthScore: 91,
      milestone: "LLM Pipeline Optimization",
      deadline: "2026-10-28",
      owner: "Devon Vance",
      region: "US-East (N. Virginia)"
    },
    {
      id: "PRJ-9047",
      client: "OmniLogix Supply Fleet",
      domain: "omnilogix.com",
      avatarBg: "linear-gradient(135deg, #64748b, #334155)",
      avatarInitials: "OL",
      tier: "Starter",
      mrr: 3400,
      status: "Suspended",
      healthScore: 48,
      milestone: "Billing Account Settlement",
      deadline: "2026-10-18",
      owner: "Marcus Thorne",
      region: "US-Central (Iowa)"
    },
    {
      id: "PRJ-9048",
      client: "Krypton Cyber Defense",
      domain: "kryptonsec.io",
      avatarBg: "linear-gradient(135deg, #ef4444, #991b1b)",
      avatarInitials: "KC",
      tier: "Enterprise",
      mrr: 28000,
      status: "Active",
      healthScore: 100,
      milestone: "Zero Trust Mesh Migration",
      deadline: "2026-11-12",
      owner: "Elena Rostova",
      region: "US-GovCloud"
    },
    {
      id: "PRJ-9049",
      client: "Prism Visual Media",
      domain: "prismmedia.tv",
      avatarBg: "linear-gradient(135deg, #8b5cf6, #c084fc)",
      avatarInitials: "PV",
      tier: "Scale",
      mrr: 8400,
      status: "Active",
      healthScore: 88,
      milestone: "CDN Edge Edge Transcode",
      deadline: "2026-11-20",
      owner: "Sarah Jenkins",
      region: "EU-West (London)"
    },
    {
      id: "PRJ-9050",
      client: "Chronos TimeSeries DB",
      domain: "chronosdb.dev",
      avatarBg: "linear-gradient(135deg, #06b6d4, #0891b2)",
      avatarInitials: "CT",
      tier: "Scale",
      mrr: 11200,
      status: "In Review",
      healthScore: 86,
      milestone: "Benchmarking 10M IOPS",
      deadline: "2026-10-29",
      owner: "Devon Vance",
      region: "US-West (Oregon)"
    },
    {
      id: "PRJ-9051",
      client: "Aura Robotics Labs",
      domain: "aurarobotics.tech",
      avatarBg: "linear-gradient(135deg, #f97316, #ea580c)",
      avatarInitials: "AR",
      tier: "Enterprise",
      mrr: 21900,
      status: "Active",
      healthScore: 94,
      milestone: "Fleet Digital Twin Sync",
      deadline: "2026-12-10",
      owner: "Marcus Thorne",
      region: "AP-Southeast (Singapore)"
    },
    {
      id: "PRJ-9052",
      client: "Velox Payments Network",
      domain: "veloxpay.com",
      avatarBg: "linear-gradient(135deg, #10b981, #047857)",
      avatarInitials: "VP",
      tier: "Starter",
      mrr: 4100,
      status: "Deploying",
      healthScore: 68,
      milestone: "Sandbox Webhook Testing",
      deadline: "2026-10-22",
      owner: "Sarah Jenkins",
      region: "EU-North (Stockholm)"
    }
  ],

  // Activity Feed
  activities: [
    {
      user: "Elena Rostova",
      action: "promoted cluster to production",
      target: "Vertex Quantum AI",
      time: "8 mins ago",
      icon: "rocket",
      badge: "badge-success"
    },
    {
      user: "System Watchdog",
      action: "automated SSL certificate auto-renewed for",
      target: "Hyperion FinTech Core",
      time: "32 mins ago",
      icon: "shield",
      badge: "badge-brand"
    },
    {
      user: "Devon Vance",
      action: "merged PR #318: SLA threshold adjustments for",
      target: "Aetheria Cloud Fabric",
      time: "2 hours ago",
      icon: "code",
      badge: "badge-info"
    },
    {
      user: "Sarah Jenkins",
      action: "provisioned new tenant sandbox for",
      target: "Velox Payments Network",
      time: "4 hours ago",
      icon: "database",
      badge: "badge-warning"
    },
    {
      user: "Marcus Thorne",
      action: "updated enterprise SLA terms to 99.99% for",
      target: "Krypton Cyber Defense",
      time: "6 hours ago",
      icon: "file",
      badge: "badge-brand"
    }
  ],

  // Design Tokens Studio Export
  figmaTokens: {
    name: "PeaklyyX-Design-System-2026",
    version: "2.4.0",
    color: {
      primary: {
        50: { value: "#eef2ff", type: "color" },
        100: { value: "#e0e7ff", type: "color" },
        500: { value: "#6366f1", type: "color" },
        600: { value: "#4f46e5", type: "color" },
        900: { value: "#312e81", type: "color" }
      },
      accent: {
        cyan: { value: "#06b6d4", type: "color" },
        purple: { value: "#a855f7", type: "color" },
        emerald: { value: "#10b981", type: "color" },
        amber: { value: "#f59e0b", type: "color" },
        rose: { value: "#f43f5e", type: "color" }
      },
      surfaces: {
        darkBg: { value: "#080b11", type: "color" },
        darkSurface: { value: "#111726", type: "color" },
        darkElevated: { value: "#161e31", type: "color" },
        lightBg: { value: "#f8fafc", type: "color" },
        lightSurface: { value: "#ffffff", type: "color" }
      }
    },
    typography: {
      fontFamily: {
        sans: { value: "Plus Jakarta Sans, sans-serif", type: "fontFamilies" },
        mono: { value: "JetBrains Mono, monospace", type: "fontFamilies" }
      },
      scale: {
        xs: { value: "12px", type: "fontSizes" },
        sm: { value: "13.5px", type: "fontSizes" },
        base: { value: "15px", type: "fontSizes" },
        lg: { value: "20px", type: "fontSizes" },
        xl: { value: "24px", type: "fontSizes" },
        "2xl": { value: "30px", type: "fontSizes" }
      }
    },
    borderRadius: {
      sm: { value: "8px", type: "borderRadius" },
      md: { value: "12px", type: "borderRadius" },
      lg: { value: "16px", type: "borderRadius" },
      full: { value: "9999px", type: "borderRadius" }
    }
  }
};
