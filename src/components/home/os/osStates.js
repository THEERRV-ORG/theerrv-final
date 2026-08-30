/* ===========================================================================
 * The Theerrv Operating System — eight cells, six states.
 *
 * The renderer draws eight cells wherever the active state says. Each cell is
 * the same DOM node across states (index is identity), so the browser
 * interpolates it from one role to the next. Ported from the reference project
 * and adapted for this site's six home services — the state keys match the
 * service slugs in servicesPage.showcase.items.
 * =========================================================================== */

export const GRID_W = 120;
export const GRID_H = 160;

export const CAPABILITIES = [
  "Product",
  "Modernization",
  "Cloud",
  "Data",
  "Integration",
  "AI",
];

/* --- Shared lattices ------------------------------------------------------- */
const band = (i, x = 0, w = GRID_W) => ({ x, y: i * 22, w, h: 18 });
const statL = { x: 0, y: 134, w: 58, h: 22 };
const statR = { x: 62, y: 134, w: 58, h: 22 };
const cellAt = (col, row) => ({ x: col === 0 ? 0 : 62, y: row * 38, w: 58, h: 34 });

export const STATES = {
  /* 01 — Product Engineering & Custom Software (workflow) */
  "product-engineering": {
    capability: 0,
    cells: [
      { label: "Customer order", meta: "Received", flag: "mark", ...band(0) },
      { label: "AI validates request", meta: "12 rules passed", flag: "mark", ...band(1) },
      { label: "Work order created", meta: "WO-4471", flag: "mark", ...band(2) },
      { label: "Team assigned", meta: "3 engineers", flag: "mark", ...band(3) },
      { label: "Invoice generated", meta: "Sent to finance", ...band(4) },
      { label: "Dashboard updated", meta: "Live", ...band(5) },
      { label: "Orders today", value: "1,284", ...statL },
      { label: "Avg cycle", value: "42s", ...statR },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    coreLinks: 5,
  },

  /* 05 — APIs, Integrations, Reliability & Security (integration mesh) */
  "apis-integration": {
    capability: 4,
    cells: [
      { label: "Auth", meta: "Live", ...cellAt(0, 0) },
      { label: "Orders API", meta: "Live", ...cellAt(1, 0) },
      { label: "Payments", meta: "Live", ...cellAt(0, 1) },
      { label: "Inventory", meta: "Live", ...cellAt(1, 1) },
      { label: "Webhooks", meta: "Connected", ...cellAt(0, 2) },
      { label: "Queue", meta: "Connected", ...cellAt(1, 2) },
      { label: "Cache", meta: "Warm", ...cellAt(0, 3) },
      { label: "Gateway", meta: "Routing", ...cellAt(1, 3) },
    ],
    links: [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]],
    coreLinks: 3,
  },

  /* 03 — Cloud, DevOps & Scalable Platforms (stack) */
  "cloud-devops": {
    capability: 2,
    cells: [
      { label: "Azure", meta: "South India", ...band(0, 14, 92) },
      { label: "Load balancer", meta: "Healthy", flag: "mark", ...band(1, 14, 92) },
      { label: "App services", meta: "3 instances", flag: "mark", ...band(2, 14, 92) },
      { label: "Database", meta: "Primary + replica", flag: "mark", ...band(3, 14, 92) },
      { label: "Storage", meta: "Geo-redundant", flag: "mark", ...band(4, 14, 92) },
      { label: "Monitoring", meta: "Active", ...band(5, 14, 92) },
      { label: "Latency", value: "42ms", ...statL },
      { label: "Availability", value: "99.9%", ...statR },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    coreLinks: 5,
  },

  /* 02 — Modernization, Architecture & Performance (migration) */
  modernization: {
    capability: 1,
    cells: [
      { label: "Legacy system", meta: "Assessed", flag: "mark", ...band(0) },
      { label: "Dependencies mapped", meta: "142 modules", flag: "mark", ...band(1) },
      { label: "Core refactored", meta: "Phase 2 of 3", flag: "mark", ...band(2) },
      { label: "Cloud-ready", meta: "Containerized", flag: "mark", ...band(3) },
      { label: "Tests passing", meta: "98% coverage", ...band(4) },
      { label: "Deployed", meta: "Zero downtime", ...band(5) },
      { label: "Perf gain", value: "3.2×", ...statL },
      { label: "Cost saved", value: "38%", ...statR },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]],
    coreLinks: 5,
  },

  /* 04 — Data, Analytics & Business Automation (dashboard) */
  "data-automation": {
    capability: 3,
    cells: [
      { label: "Revenue", value: "₹4.82 Cr", meta: "+12% MoM", bar: 0.74, x: 0, y: 0, w: 76, h: 38 },
      { label: "Orders", value: "1,284", bar: 0.62, x: 80, y: 0, w: 40, h: 38 },
      { label: "Projects", value: "17", x: 0, y: 42, w: 40, h: 34 },
      { label: "Users", value: "3,940", x: 44, y: 42, w: 32, h: 34 },
      { label: "Alerts", value: "0", x: 80, y: 42, w: 40, h: 34 },
      { label: "Profit", value: "22.4%", bar: 0.55, x: 0, y: 80, w: 58, h: 34 },
      { label: "Tasks", value: "94 / 120", bar: 0.78, x: 62, y: 80, w: 58, h: 34 },
      { label: "AI status", meta: "Models healthy · 6 pipelines", x: 0, y: 118, w: 120, h: 34 },
    ],
    links: [[7, 0], [7, 1]],
    coreLinks: 2,
  },

  /* 06 — AI Solutions & Technical Consulting (pipeline) */
  "ai-consulting": {
    capability: 5,
    cells: [
      { label: "Data ingested", meta: "Streaming", ...cellAt(0, 0) },
      { label: "Model", value: "v4.2", ...cellAt(1, 0) },
      { label: "Inference API", value: "38ms", ...cellAt(0, 1) },
      { label: "Workflow triggers", meta: "Active", ...cellAt(1, 1) },
      { label: "Anomaly watch", meta: "Learning", ...cellAt(0, 2) },
      { label: "Auto-routing", meta: "On", ...cellAt(1, 2) },
      { label: "Human-in-loop", meta: "2 pending", ...cellAt(0, 3) },
      { label: "Impact", value: "+27%", ...cellAt(1, 3) },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 7], [4, 7]],
    coreLinks: 2,
  },

};

function centre(c) {
  return [c.x + c.w / 2, c.y + c.h / 2];
}

/** Orthogonal connector between two cells (straight drop when stacked). */
export function linkPath(a, b) {
  const [x1, y1] = centre(a);
  const [x2, y2] = centre(b);
  if (Math.abs(x1 - x2) < 0.5) return `M ${x1} ${y1} V ${y2}`;
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} V ${midY} H ${x2} V ${y2}`;
}
