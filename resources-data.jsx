/* Resources data — fictional articles & how-to guides */

const RES_TYPES = [
  { id: "all", name: "All", count: 0 },
  { id: "guide", name: "How-to guides" },
  { id: "tutorial", name: "Tutorials" },
  { id: "concept", name: "Concepts" },
  { id: "reference", name: "Reference" },
  { id: "release", name: "Release notes" },
];

const RES_TOPICS = [
  { id: "all", name: "All topics" },
  { id: "getting-started", name: "Getting started" },
  { id: "compute", name: "Compute" },
  { id: "data", name: "Data & databases" },
  { id: "networking", name: "Networking" },
  { id: "security", name: "Security & secrets" },
  { id: "observability", name: "Observability" },
  { id: "cicd", name: "CI / CD" },
  { id: "ai", name: "AI / ML" },
  { id: "cost", name: "Cost & FinOps" },
];

const RES_LEVELS = [
  { id: "all", name: "All levels" },
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];

/* Article entry shape:
   { id, type, topic, level, title, blurb, author, updated, readTime, featured? } */

const RES_ARTICLES = [
  /* Featured */
  { id: "r01", type: "guide", topic: "getting-started", level: "beginner",
    title: "Your first 30 minutes on Atlas",
    blurb: "A guided walk through workspace setup, CLI install, and pushing a sample service end-to-end.",
    author: "Platform Team", updated: "May 18, 2026", readTime: "8 min", featured: true },

  { id: "r02", type: "tutorial", topic: "compute", level: "intermediate",
    title: "Deploy a Helix container with autoscaling and zero downtime",
    blurb: "Step through a production deploy: rolling updates, health checks, and HPA tuned for spiky traffic.",
    author: "Helix Working Group", updated: "May 14, 2026", readTime: "14 min", featured: true },

  { id: "r03", type: "concept", topic: "security", level: "beginner",
    title: "Secrets, tokens, and the Vault model — explained",
    blurb: "How Atlas issues short-lived credentials, who can read what, and why long-lived tokens are going away.",
    author: "Security Engineering", updated: "May 09, 2026", readTime: "6 min", featured: true },

  /* Getting started */
  { id: "r10", type: "guide", topic: "getting-started", level: "beginner",
    title: "Install and configure the Atlas CLI",
    blurb: "Install the CLI on macOS, Linux and Windows. Authenticate, set context, and verify your install.",
    author: "DX Team", updated: "May 17, 2026", readTime: "4 min" },

  { id: "r11", type: "guide", topic: "getting-started", level: "beginner",
    title: "Create your first workspace and invite teammates",
    blurb: "Spin up a workspace, set roles, and invite collaborators. Includes a permissions cheat-sheet.",
    author: "Platform Team", updated: "May 11, 2026", readTime: "5 min" },

  { id: "r12", type: "tutorial", topic: "getting-started", level: "beginner",
    title: "Ship a sample app from a template",
    blurb: "Pick a template, push a branch, and watch the deploy pipeline run. Comes with rollback steps.",
    author: "DX Team", updated: "May 05, 2026", readTime: "10 min" },

  /* Compute */
  { id: "r20", type: "guide", topic: "compute", level: "intermediate",
    title: "Set up a Helix Containers cluster with policy guardrails",
    blurb: "Configure namespaces, network policies, and pod security standards aligned with org defaults.",
    author: "Helix Working Group", updated: "May 13, 2026", readTime: "12 min" },

  { id: "r21", type: "reference", topic: "compute", level: "advanced",
    title: "Helix Functions runtime reference",
    blurb: "Cold-start budgets, supported runtimes, memory/CPU shapes, environment variables, and triggers.",
    author: "Platform Team", updated: "May 02, 2026", readTime: "9 min" },

  { id: "r22", type: "tutorial", topic: "compute", level: "intermediate",
    title: "Migrate a workload from EC2 to Helix Containers",
    blurb: "A pragmatic migration recipe: image rebuild, secrets handoff, traffic cutover, and rollback gates.",
    author: "Migration Squad", updated: "Apr 28, 2026", readTime: "16 min" },

  /* Data */
  { id: "r30", type: "guide", topic: "data", level: "intermediate",
    title: "Provision a Helix Postgres cluster with backups",
    blurb: "Choose tier, region, and backup window. Set up point-in-time recovery and read replicas.",
    author: "Data Platform", updated: "May 12, 2026", readTime: "8 min" },

  { id: "r31", type: "concept", topic: "data", level: "intermediate",
    title: "When to choose Postgres vs Mongo vs Cosmos",
    blurb: "A decision matrix for picking the right managed database. Includes cost and operability notes.",
    author: "Data Platform", updated: "May 04, 2026", readTime: "7 min" },

  { id: "r32", type: "tutorial", topic: "data", level: "advanced",
    title: "Build a real-time pipeline with Helix Stream and BigQuery",
    blurb: "Stream events from Helix Stream to BigQuery, with schema evolution and dead-letter handling.",
    author: "Analytics Guild", updated: "Apr 30, 2026", readTime: "18 min" },

  /* Security */
  { id: "r40", type: "guide", topic: "security", level: "beginner",
    title: "Rotate a service credential without downtime",
    blurb: "Cutover a service from a long-lived key to a managed credential, with a verified rollback path.",
    author: "Security Engineering", updated: "May 16, 2026", readTime: "5 min" },

  { id: "r41", type: "reference", topic: "security", level: "intermediate",
    title: "IAM roles and permissions cheat-sheet",
    blurb: "Every built-in role, what it can do, and how to compose custom roles for your team's needs.",
    author: "Security Engineering", updated: "May 07, 2026", readTime: "6 min" },

  { id: "r42", type: "guide", topic: "security", level: "intermediate",
    title: "Migrate to the new Vault cluster endpoints",
    blurb: "Required steps for all Helix v4 services before the July 1 cutover. Includes verification commands.",
    author: "Security Engineering", updated: "May 01, 2026", readTime: "9 min" },

  /* Observability */
  { id: "r50", type: "guide", topic: "observability", level: "beginner",
    title: "Wire up logs, metrics and traces in a Helix service",
    blurb: "Drop-in agents for the big three signals. Includes dashboards you can clone and adapt.",
    author: "Observability Guild", updated: "May 15, 2026", readTime: "10 min" },

  { id: "r51", type: "tutorial", topic: "observability", level: "intermediate",
    title: "Create golden-signals dashboards for any service",
    blurb: "Latency, traffic, errors, saturation — wired up in 20 minutes. Templates included.",
    author: "Observability Guild", updated: "May 08, 2026", readTime: "12 min" },

  { id: "r52", type: "concept", topic: "observability", level: "intermediate",
    title: "SLOs in practice: from definition to alert routing",
    blurb: "How to write meaningful SLOs, set error budgets, and route alerts without burning out on-call.",
    author: "Reliability Council", updated: "Apr 26, 2026", readTime: "11 min" },

  /* CI / CD */
  { id: "r60", type: "tutorial", topic: "cicd", level: "intermediate",
    title: "Set up Release Pilot with progressive delivery",
    blurb: "Configure canary rollout with automatic rollback. Includes test gates and approval flow.",
    author: "Release Pilot Team", updated: "May 10, 2026", readTime: "13 min" },

  { id: "r61", type: "guide", topic: "cicd", level: "beginner",
    title: "Move a project to pipeline-as-code",
    blurb: "Convert a hand-built pipeline into a versioned, reviewable manifest. Comes with a starter file.",
    author: "DX Team", updated: "Apr 22, 2026", readTime: "7 min" },

  /* AI / ML */
  { id: "r70", type: "tutorial", topic: "ai", level: "intermediate",
    title: "Serve a fine-tuned model with Helix AI Endpoints",
    blurb: "Package a model, deploy with autoscaling, and add per-request observability and cost limits.",
    author: "ML Platform", updated: "May 06, 2026", readTime: "15 min" },

  { id: "r71", type: "concept", topic: "ai", level: "beginner",
    title: "Managed vs self-hosted inference — making the call",
    blurb: "When the managed endpoint is the right call, when it isn't, and what the cost cross-over looks like.",
    author: "ML Platform", updated: "Apr 20, 2026", readTime: "8 min" },

  /* Cost / FinOps */
  { id: "r80", type: "guide", topic: "cost", level: "beginner",
    title: "Set budgets and alerts in Cost Explorer",
    blurb: "Slice spend by business unit, set monthly budgets, and route threshold alerts to Slack.",
    author: "FinOps Guild", updated: "May 03, 2026", readTime: "6 min" },

  { id: "r81", type: "concept", topic: "cost", level: "intermediate",
    title: "Right-sizing playbook for Helix workloads",
    blurb: "A repeatable method for finding over-provisioned workloads and reclaiming spend without risk.",
    author: "FinOps Guild", updated: "Apr 14, 2026", readTime: "10 min" },

  /* Networking */
  { id: "r90", type: "guide", topic: "networking", level: "intermediate",
    title: "Expose a service via API Gateway with auth",
    blurb: "Front a private Helix service with API Gateway, add an auth policy, and enable rate limiting.",
    author: "Edge Team", updated: "May 06, 2026", readTime: "9 min" },

  { id: "r91", type: "reference", topic: "networking", level: "advanced",
    title: "Private networking topology reference",
    blurb: "The full layout — VPCs, transit gateways, and DNS — with diagrams and routing examples.",
    author: "Network Engineering", updated: "Apr 18, 2026", readTime: "12 min" },

  /* Release notes */
  { id: "r99", type: "release", topic: "compute", level: "beginner",
    title: "Helix v4.2 release notes",
    blurb: "What's new, what's deprecated, and the migration steps you'll need before July 1.",
    author: "Helix Working Group", updated: "May 18, 2026", readTime: "5 min" },
];

/* Curated learning paths — sequenced guides */
const RES_PATHS = [
  {
    id: "newcomer",
    title: "Ship your first service",
    sub: "From zero to a running service in one afternoon.",
    steps: ["r10", "r11", "r12", "r50"],
    duration: "≈ 1 hr",
    level: "Beginner",
  },
  {
    id: "production",
    title: "Make a service production-ready",
    sub: "Reliability, observability, and rollback for a real workload.",
    steps: ["r20", "r50", "r51", "r52"],
    duration: "≈ 2 hr",
    level: "Intermediate",
  },
  {
    id: "secure",
    title: "Lock down secrets and identity",
    sub: "Move off long-lived credentials and adopt the Vault model.",
    steps: ["r03", "r40", "r41", "r42"],
    duration: "≈ 1.5 hr",
    level: "Intermediate",
  },
  {
    id: "data",
    title: "Build a real-time data path",
    sub: "Choose the right store, stream events, and land them in analytics.",
    steps: ["r31", "r30", "r32"],
    duration: "≈ 2.5 hr",
    level: "Advanced",
  },
];

Object.assign(window, { RES_TYPES, RES_TOPICS, RES_LEVELS, RES_ARTICLES, RES_PATHS });
