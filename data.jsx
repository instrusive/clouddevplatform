/* Data — fictional product names, no real-brand references */

const OFFERINGS = [
  {
    id: "helix",
    name: "Helix",
    kind: "Internal PaaS",
    tile: "var(--tile-1)",
    badge: "H",
    blurb: "The flagship internal cloud platform. Reliable, secure, and scalable container orchestration with first-class developer ergonomics.",
    region: "Multi-region",
    status: "GA · v4.2",
  },
  {
    id: "aws",
    name: "AWS Public Cloud",
    kind: "Hyperscaler",
    tile: "var(--tile-2)",
    badge: "AW",
    blurb: "Sandboxed AWS landing zones with enterprise guardrails. Provision accounts, VPCs and IAM in minutes through golden paths.",
    region: "13 regions",
    status: "GA",
  },
  {
    id: "gcp",
    name: "GCP Public Cloud",
    kind: "Hyperscaler",
    tile: "var(--tile-3)",
    badge: "GC",
    blurb: "Next-gen data and ML workloads with managed BigQuery, Vertex AI and GKE. Tuned for analytics-heavy use cases.",
    region: "9 regions",
    status: "GA",
  },
  {
    id: "azure",
    name: "Azure Public Cloud",
    kind: "Hyperscaler",
    tile: "var(--tile-4)",
    badge: "AZ",
    blurb: "Secure Azure landing zones for distributed workloads. Cognitive services, Service Bus and AKS containers, governed by policy.",
    region: "11 regions",
    status: "Beta",
  },
];

const UTILITIES = [
  { id: "cost", name: "Cost Explorer", sub: "Spend analytics & chargeback", swatch: "var(--tile-1)", badge: "$" },
  { id: "chaos", name: "Chaos Lab", sub: "Fault injection & GameDay", swatch: "var(--tile-5)", badge: "⚡" },
  { id: "release", name: "Release Pilot", sub: "Pipeline orchestration", swatch: "var(--tile-3)", badge: "→" },
];

const DASHBOARDS = [
  { id: "pulse", name: "Pulse", sub: "Real-time service signals", swatch: "var(--tile-2)", badge: "▮" },
  { id: "ops", name: "Ops Console", sub: "Operations & on-call", swatch: "var(--tile-4)", badge: "◉" },
  { id: "health", name: "Health Monitor", sub: "Platform SLOs & uptime", swatch: "var(--tile-6)", badge: "♡" },
];

const ANNOUNCEMENTS = [
  {
    pill: "Action required",
    date: "May 26, 2026",
    title: "Helix v4 services must migrate to the updated Vault cluster endpoints by July 1st",
    body: "Existing and new Helix v4.x deployments will need to switch to the new Vault endpoints to manage secrets. The legacy endpoints will be decommissioned on July 14th.",
    tile: "var(--tile-1)",
  },
  {
    pill: "New release",
    date: "May 22, 2026",
    title: "Cost Explorer 3.0 ships with multi-account budgets and Slack alert hooks",
    body: "Set spend thresholds across business units and route alerts directly into a Slack channel. Available now in all production regions.",
    tile: "var(--tile-2)",
  },
  {
    pill: "Maintenance",
    date: "May 19, 2026",
    title: "Brief Pulse dashboard outage scheduled for Sunday at 02:00 UTC",
    body: "Pulse will be unavailable for approximately 20 minutes during a control-plane upgrade. Tickr ingestion will buffer and replay automatically.",
    tile: "var(--tile-3)",
  },
  {
    pill: "Programs",
    date: "May 14, 2026",
    title: "Cadence enrolment opens — design partner cohort for Q3 platform features",
    body: "Apply by June 5th to help shape the next generation of platform tooling. Cohorts run for eight weeks with weekly working sessions.",
    tile: "var(--tile-4)",
  },
  {
    pill: "Security",
    date: "May 09, 2026",
    title: "Rotation of long-lived CI tokens — automated rollout begins this week",
    body: "All long-lived CI tokens will be rotated automatically. No action required for teams using the platform's managed credentials provider.",
    tile: "var(--tile-5)",
  },
];

const PROGRAMS = [
  { id: "cadence", num: "01", name: "CADENCE", body: "Design-partner cohort program shaping the next quarter of platform features.", tile: "var(--tile-2)" },
  { id: "lumen",   num: "02", name: "LUMEN",   body: "Observability working group focused on tracing, profiling and golden signals.", tile: "var(--tile-3)" },
  { id: "beacon",  num: "03", name: "BEACON",  body: "Reliability council — incident review, postmortems, and shared learnings.", tile: "var(--tile-4)" },
  { id: "forge",   num: "04", name: "FORGE",   body: "Engineering residency — embed with the platform team for a six-week build.", tile: "var(--tile-1)" },
];

const FEATURED = [
  { id: "private",  lbl: "Private Cloud",      sub: "Helix internal PaaS",         tile: "var(--tile-2)",  span: 4, ico: "cube",  href: "catalog.html?tab=private" },
  { id: "public",   lbl: "Public Cloud",       sub: "AWS · GCP · Azure",           tile: "var(--tile-3)",  span: 4, ico: "globe", href: "catalog.html?tab=public"  },
  { id: "api",      lbl: "API Gateway",        sub: "Edge & policy",               tile: "var(--surface)", span: 2, ico: "link" },
  { id: "ccli",     lbl: "Cloud CLI",          sub: "stratus ctl",                   tile: "var(--surface)", span: 2, ico: "term" },
  { id: "iac",      lbl: "Infrastructure as Code", sub: "Terraform & Crossplane",  tile: "var(--surface)", span: 2, ico: "code" },
  { id: "sandbox",  lbl: "AWS Sandbox",        sub: "Ephemeral accounts",          tile: "var(--surface)", span: 2, ico: "build" },
  { id: "cat-pub",  lbl: "Public Catalog",     sub: "Browse services",             tile: "var(--tile-4)",  span: 3, ico: "grid",  href: "catalog.html?tab=public"  },
  { id: "cat-priv", lbl: "Private Catalog",    sub: "Internal services",           tile: "var(--tile-1)",  span: 3, ico: "stack", href: "catalog.html?tab=private" },
  { id: "onboard",  lbl: "Start onboarding →", sub: "New to Stratus? Begin here.",   span: 2, ico: "bolt", cta: true },
];

const SUPPORT_LINKS = [
  { group: "GENERAL", items: [
    { name: "Service Desk", to: "#" },
    { name: "Support Directory", to: "#" },
    { name: "IT Help Desk", to: "#" },
    { name: "Status Page", to: "#" },
  ]},
  { group: "DOCS", items: [
    { name: "Troubleshooting Guides", to: "#" },
    { name: "FAQs", to: "#" },
    { name: "Runbooks", to: "#" },
  ]},
];

const SLACK_CHANNELS = ["#stratus-infra", "#cloud-engineering", "#it-help", "#helix-support", "#release-pilot"];

const GETTING_STARTED = [
  { group: "GET STARTED", items: [
    { name: "Quickstart", to: "#" },
    { name: "Sample Applications", to: "#" },
    { name: "How-To Articles", to: "#" },
    { name: "Stratus for Developers", to: "#" },
  ]},
  { group: "LEARN MORE", items: [
    { name: "Stratus University", to: "#" },
    { name: "Training Videos", to: "#" },
    { name: "Release Calendar", to: "#" },
    { name: "Release Notes", to: "#" },
  ]},
];

const CLOUD_MODEL = [
  { group: "OFFERINGS MODEL", items: [
    { name: "Continuous Integration / Delivery", to: "#" },
    { name: "Database as a Service (DBaaS)", to: "#" },
    { name: "Platform as a Service (PaaS)", to: "#" },
    { name: "Extended PaaS (xPaaS)", to: "#" },
  ]},
  { group: "HELPFUL LINKS", items: [
    { name: "Public Cloud Overview", to: "#" },
    { name: "Public Cloud Pricing", to: "#" },
    { name: "Private Cloud Overview", to: "#" },
    { name: "Cloud Governance", to: "#" },
  ]},
];

const SEARCH_INDEX = [
  { cat: "Platforms", name: "Helix · Internal PaaS", meta: "Platform" },
  { cat: "Platforms", name: "AWS Public Cloud", meta: "Platform" },
  { cat: "Platforms", name: "GCP Public Cloud", meta: "Platform" },
  { cat: "Platforms", name: "Azure Public Cloud", meta: "Platform" },
  { cat: "Utilities", name: "Cost Explorer", meta: "Utility" },
  { cat: "Utilities", name: "Chaos Lab", meta: "Utility" },
  { cat: "Utilities", name: "Release Pilot", meta: "Utility" },
  { cat: "Dashboards", name: "Pulse", meta: "Dashboard" },
  { cat: "Dashboards", name: "Ops Console", meta: "Dashboard" },
  { cat: "Dashboards", name: "Health Monitor", meta: "Dashboard" },
  { cat: "Tools", name: "Cloud CLI", meta: "Tool" },
  { cat: "Tools", name: "API Gateway", meta: "Tool" },
  { cat: "Tools", name: "Infrastructure as Code", meta: "Tool" },
  { cat: "Tools", name: "Approvals", meta: "Tool" },
  { cat: "Tools", name: "Suppression Management", meta: "Tool" },
  { cat: "Docs", name: "Quickstart guide", meta: "Doc" },
  { cat: "Docs", name: "Vault migration guide", meta: "Doc" },
  { cat: "Docs", name: "Onboarding playbook", meta: "Doc" },
  { cat: "Programs", name: "Cadence — design-partner cohort", meta: "Program" },
  { cat: "Programs", name: "Lumen — observability working group", meta: "Program" },
];

Object.assign(window, {
  OFFERINGS, UTILITIES, DASHBOARDS, ANNOUNCEMENTS, PROGRAMS, FEATURED,
  SUPPORT_LINKS, SLACK_CHANNELS, GETTING_STARTED, CLOUD_MODEL, SEARCH_INDEX
});
