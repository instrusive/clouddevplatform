/* Cloud Catalog data — fictional services, no real branding. */

const CAT_CATEGORIES = [
  { id: "all", name: "All" },
  { id: "analytics", name: "Analytics" },
  { id: "caching", name: "Caching" },
  { id: "containers", name: "Containers" },
  { id: "database", name: "Database" },
  { id: "devtools", name: "Developer Tools" },
  { id: "monitoring", name: "Logging & Monitoring" },
  { id: "memory", name: "Memory Computing" },
  { id: "messaging", name: "Messaging & Streaming" },
  { id: "search", name: "Search & Index" },
  { id: "ml", name: "AI / ML" },
  { id: "security", name: "Security" },
];

const CAT_PROVIDERS = [
  { id: "all", name: "All providers", code: "ALL" },
  { id: "aws", name: "Amazon Web Services", code: "AWS" },
  { id: "azure", name: "Azure", code: "AZ" },
  { id: "gcp", name: "Google Cloud Platform", code: "GCP" },
];

/* Each product has: id, name, category, provider (or 'helix' for private),
   blurb, eligible (bool), accent color, glyph (single char). */

const PRIVATE_PRODUCTS = [
  { id: "p1",  name: "Helix Cache",        cat: "caching",    blurb: "In-memory key-value store built on a managed cluster, tuned for low-latency stateful workloads.",            eligible: true,  tile: "var(--tile-1)", glyph: "K" },
  { id: "p2",  name: "Helix Containers",   cat: "containers", blurb: "Managed Kubernetes with policy guardrails and zero-touch image promotion across environments.",              eligible: true,  tile: "var(--tile-2)", glyph: "C" },
  { id: "p3",  name: "Helix Postgres",     cat: "database",   blurb: "Highly-available PostgreSQL with automated backups, point-in-time restore and read replicas.",               eligible: true,  tile: "var(--tile-3)", glyph: "P" },
  { id: "p4",  name: "Helix Mongo",        cat: "database",   blurb: "Managed document database with built-in sharding, encryption-at-rest, and automated failover.",              eligible: true,  tile: "var(--tile-3)", glyph: "M" },
  { id: "p5",  name: "Helix Stream",       cat: "messaging",  blurb: "Durable event streaming with at-least-once delivery, schema registry, and replay.",                          eligible: true,  tile: "var(--tile-4)", glyph: "S" },
  { id: "p6",  name: "Helix Search",       cat: "search",     blurb: "Full-text search and analytics engine with vector and keyword retrieval modes.",                              eligible: true,  tile: "var(--tile-5)", glyph: "Q" },
  { id: "p7",  name: "Helix Metrics",      cat: "monitoring", blurb: "Time-series ingestion, retention and alerting with Prometheus-compatible query API.",                         eligible: true,  tile: "var(--tile-6)", glyph: "▮" },
  { id: "p8",  name: "Helix Logs",         cat: "monitoring", blurb: "Centralised log ingestion with structured search, retention tiers and on-call routing.",                      eligible: true,  tile: "var(--tile-6)", glyph: "L" },
  { id: "p9",  name: "Helix Functions",    cat: "containers", blurb: "Event-triggered serverless runtime for lightweight workloads with cold-start under 200ms.",                   eligible: false, tile: "var(--tile-2)", glyph: "λ" },
  { id: "p10", name: "Helix Secrets",      cat: "security",   blurb: "Multi-tenant secrets vault with automatic rotation and audit-grade access logging.",                          eligible: true,  tile: "var(--tile-4)", glyph: "♦" },
  { id: "p11", name: "Helix Cache+",       cat: "memory",     blurb: "Distributed in-memory data grid with persistence, suitable for session and feature stores.",                   eligible: true,  tile: "var(--tile-1)", glyph: "M" },
  { id: "p12", name: "Helix Notebooks",    cat: "devtools",   blurb: "Managed notebook environments with GPU pools and shared, versioned workspaces.",                              eligible: true,  tile: "var(--tile-5)", glyph: "N" },
  { id: "p13", name: "Helix Pipelines",    cat: "devtools",   blurb: "Pipeline-as-code orchestrator with built-in approvals and progressive delivery support.",                     eligible: true,  tile: "var(--tile-5)", glyph: "→" },
  { id: "p14", name: "Helix Vault",        cat: "security",   blurb: "Centralised credentials broker with short-lived tokens and policy-driven access.",                            eligible: true,  tile: "var(--tile-4)", glyph: "🔒" },
  { id: "p15", name: "Helix Lake",         cat: "analytics",  blurb: "Object-store backed data lake with table format support and managed compaction.",                              eligible: false, tile: "var(--tile-3)", glyph: "≋" },
  { id: "p16", name: "Helix AI Endpoints", cat: "ml",         blurb: "Hosted inference for foundation models with autoscaling and per-request observability.",                     eligible: true,  tile: "var(--tile-6)", glyph: "∞" },
];

const PUBLIC_PRODUCTS = [
  /* AWS */
  { id: "a1",  name: "S3 Object Storage",     provider: "aws", cat: "database",   blurb: "Durable object storage for any amount of data with strong consistency and lifecycle rules.",  eligible: true,  tile: "var(--tile-1)", glyph: "S3" },
  { id: "a2",  name: "Lambda Functions",      provider: "aws", cat: "containers", blurb: "Run code without provisioning servers, with sub-second billing and event triggers.",          eligible: true,  tile: "var(--tile-2)", glyph: "λ" },
  { id: "a3",  name: "ElastiCache (Redis)",   provider: "aws", cat: "caching",    blurb: "Managed Redis with cluster-mode, automatic failover and TLS in-transit.",                    eligible: true,  tile: "var(--tile-3)", glyph: "R" },
  { id: "a4",  name: "RDS PostgreSQL",        provider: "aws", cat: "database",   blurb: "Managed Postgres with multi-AZ failover, read replicas and point-in-time recovery.",          eligible: true,  tile: "var(--tile-3)", glyph: "P" },
  { id: "a5",  name: "Kinesis Data Streams",  provider: "aws", cat: "messaging",  blurb: "Real-time data streaming with shard-based throughput and 365-day retention.",                eligible: false, tile: "var(--tile-4)", glyph: "≋" },
  { id: "a6",  name: "OpenSearch",            provider: "aws", cat: "search",     blurb: "Managed search, log analytics and observability built on the OpenSearch project.",            eligible: true,  tile: "var(--tile-5)", glyph: "Q" },
  { id: "a7",  name: "Bedrock",               provider: "aws", cat: "ml",         blurb: "Foundation-model API for text, embeddings and image generation with bring-your-own data.",   eligible: true,  tile: "var(--tile-6)", glyph: "∞" },
  { id: "a8",  name: "EKS Containers",        provider: "aws", cat: "containers", blurb: "Managed Kubernetes control plane with autoscaling node groups and IAM-bound pods.",          eligible: true,  tile: "var(--tile-2)", glyph: "K" },

  /* GCP */
  { id: "g1",  name: "BigQuery",              provider: "gcp", cat: "analytics",  blurb: "Serverless multi-cloud data warehouse with built-in ML and streaming ingestion.",            eligible: true,  tile: "var(--tile-3)", glyph: "BQ" },
  { id: "g2",  name: "Cloud Spanner",         provider: "gcp", cat: "database",   blurb: "Horizontally-scalable, strongly-consistent SQL database with five-nines SLA.",               eligible: false, tile: "var(--tile-3)", glyph: "SP" },
  { id: "g3",  name: "Vertex AI",             provider: "gcp", cat: "ml",         blurb: "Unified ML platform for training, tuning and serving models at scale.",                       eligible: true,  tile: "var(--tile-6)", glyph: "V" },
  { id: "g4",  name: "GKE Autopilot",         provider: "gcp", cat: "containers", blurb: "Fully-managed Kubernetes with per-pod billing and Google-tuned defaults.",                   eligible: true,  tile: "var(--tile-2)", glyph: "K" },
  { id: "g5",  name: "Pub/Sub",               provider: "gcp", cat: "messaging",  blurb: "Global messaging service with push and pull delivery, replay and dead-letter topics.",       eligible: true,  tile: "var(--tile-4)", glyph: "P" },
  { id: "g6",  name: "Memorystore",           provider: "gcp", cat: "caching",    blurb: "Managed Redis and Memcached for sub-millisecond in-memory caching.",                          eligible: true,  tile: "var(--tile-1)", glyph: "M" },

  /* Azure */
  { id: "z1",  name: "AKS Containers",        provider: "azure", cat: "containers", blurb: "Managed Kubernetes service tightly integrated with Entra ID and Defender for Cloud.",     eligible: true,  tile: "var(--tile-2)", glyph: "K" },
  { id: "z2",  name: "Cosmos DB",             provider: "azure", cat: "database",   blurb: "Globally-distributed multi-model database with five consistency levels.",                  eligible: true,  tile: "var(--tile-3)", glyph: "C" },
  { id: "z3",  name: "Service Bus",           provider: "azure", cat: "messaging",  blurb: "Enterprise messaging with topics, queues, and transactional sessions.",                   eligible: true,  tile: "var(--tile-4)", glyph: "B" },
  { id: "z4",  name: "Azure OpenAI",          provider: "azure", cat: "ml",         blurb: "Hosted access to leading language models with private networking and content filters.",   eligible: false, tile: "var(--tile-6)", glyph: "∞" },
  { id: "z5",  name: "Azure Cache (Redis)",   provider: "azure", cat: "caching",    blurb: "Managed Redis with clustering, zone redundancy and private endpoints.",                   eligible: true,  tile: "var(--tile-1)", glyph: "R" },
  { id: "z6",  name: "Functions",             provider: "azure", cat: "containers", blurb: "Event-driven serverless compute with built-in bindings to Azure services.",                eligible: true,  tile: "var(--tile-2)", glyph: "λ" },
];

const ONBOARD_HINT = "You must onboard a CAR ID before you can provision public cloud products. If you've already onboarded, check your status.";

Object.assign(window, {
  CAT_CATEGORIES, CAT_PROVIDERS,
  PRIVATE_PRODUCTS, PUBLIC_PRODUCTS,
  ONBOARD_HINT
});
