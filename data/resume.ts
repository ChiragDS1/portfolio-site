/**
 * Single source of truth for all site copy.
 * Edit this file to change wording — components never hardcode content.
 *
 * One coherent identity: Data Engineer. Streaming and batch pipelines for
 * regulated industries — real-time fraud/AML in banking, HL7-to-FHIR
 * interoperability in healthcare. Every section tells that one story.
 */

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const identity = {
  name: "Chirag Deepak Shinde",
  role: "Data Engineer",
  /** Small secondary line rendered under the role in the hero. */
  roleMeta: "3+ years · Banking & Healthcare",
  tagline:
    "I build streaming and batch pipelines for regulated industries: real-time fraud and AML detection in banking, HL7-to-FHIR interoperability in healthcare.",
  location: "Chicago, IL",
  email: "chiragshinde2702@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/chirag-d-shinde",
  linkedinLabel: "linkedin.com/in/chirag-d-shinde",
  githubUrl: "https://github.com/", // TODO: replace with your GitHub profile URL
} as const;

export const profile =
  "Data Engineer with 3+ years building streaming and batch pipelines across banking and healthcare: real-time fraud and AML detection, HL7-to-FHIR interoperability, and production-grade solutions that strengthen compliance and decision-making.";

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about: string[] = [
  "Data Engineer with 3+ years building streaming and batch pipelines across banking and healthcare: real-time fraud and AML detection, HL7-to-FHIR interoperability, and production-grade solutions that strengthen compliance and decision-making.",
  "I design distributed ETL and ELT pipelines with Python, SQL, Apache Spark, Kafka, and Airflow across AWS and Azure, turning raw data into clean, high-quality datasets for enterprise analytics and reporting.",
  "I also integrate ML and LLM-powered solutions like RAG and vector search into pipelines, automating insight extraction and cutting manual effort in regulated environments.",
  "I hold an M.S. in Computer Science from the University of Illinois at Chicago.",
];

/* ------------------------------------------------------------------ */
/* Stat chips — rendered beside each experience world                  */
/* ------------------------------------------------------------------ */

/**
 * Two shapes:
 *  - "count"      counts 0 -> value then renders `suffix` (`revealSuffix`
 *                 holds the unit back until the number lands).
 *  - "transition" a before/after: `before` strikes through, `after` is revealed.
 */
export type StatChip =
  | {
      kind: "count";
      value: number;
      suffix: string;
      revealSuffix?: boolean;
      label: string;
    }
  | { kind: "transition"; before: string; after: string; label: string };

/* ------------------------------------------------------------------ */
/* Worlds — the five explorable scenes, in scroll order                */
/* ------------------------------------------------------------------ */

export type WorldId =
  | "home"
  | "about"
  | "experience-bank-of-america"
  | "experience-accenture"
  | "projects";

export interface World {
  id: WorldId;
  /** Shown in the switcher and the menu. */
  label: string;
  /** Second line in the switcher, when a world needs qualifying. */
  sub?: string;
  /** The giant low-opacity word behind the scene. */
  ghost: string;
  /** Icon id resolved in components/worldIcons.tsx. */
  icon: "hub" | "about" | "bank" | "health" | "projects";
}

export const worlds: World[] = [
  { id: "home", label: "Home", ghost: identity.name.split(" ")[0], icon: "hub" },
  { id: "about", label: "About", ghost: "About", icon: "about" },
  {
    id: "experience-bank-of-america",
    label: "Experience",
    sub: "Bank of America",
    ghost: "Fraud & AML",
    icon: "bank",
  },
  {
    id: "experience-accenture",
    label: "Experience",
    sub: "Accenture",
    ghost: "HL7 → FHIR",
    icon: "health",
  },
  { id: "projects", label: "Projects", ghost: "Projects", icon: "projects" },
];

/* ------------------------------------------------------------------ */
/* Toolkit — the About world's grid                                    */
/* ------------------------------------------------------------------ */

/** Tools without a simple-icons mark render as a text badge instead. */
export const toolBadges: Record<string, string> = {
  Azure: "Az",
  "Data Factory": "DF",
  Synapse: "Sy",
};

export const toolkit: { group: string; items: string[] }[] = [
  {
    group: "Streaming & Processing",
    items: ["Kafka", "Spark", "Airflow", "dbt", "Databricks", "Python"],
  },
  {
    group: "Cloud & Warehouses",
    items: ["AWS", "Azure", "Data Factory", "Synapse", "Snowflake", "PostgreSQL"],
  },
  {
    group: "Platforms, MLOps & AI",
    items: ["Docker", "Kubernetes", "Terraform", "MLflow", "LangChain", "Redis"],
  },
];

export interface ToolUse {
  /** Which experience world this usage points at. */
  world: Extract<WorldId, "experience-bank-of-america" | "experience-accenture">;
  company: string;
  detail: string;
}

/**
 * Where each tool was actually used. Drawn from the experience bullets below —
 * a tool with no entry here simply has no usage dot and isn't interactive.
 */
export const toolUsage: Record<string, ToolUse[]> = {
  Kafka: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "Fault-tolerant ingestion for 5M+ daily transactions into an S3 data lake",
    },
  ],
  Spark: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "Moved fraud scoring from batch to Spark Structured Streaming",
    },
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "Distributed cleansing and deduplication of clinical datasets",
    },
  ],
  Airflow: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "Orchestrated distributed jobs on AWS, lowering operating cost 25%",
    },
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "Orchestrated ingestion and transformation into Azure Synapse",
    },
  ],
  Databricks: [
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "Spark on Databricks, 35% faster curated data delivery",
    },
  ],
  Python: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "ETL/ELT pipelines and data models for transaction records",
    },
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "HL7 → FHIR R4 transformation logic",
    },
  ],
  AWS: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "S3 data lake, Lambda event triggers, Airflow on AWS",
    },
  ],
  Azure: [
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "Data Factory → Databricks → Synapse healthcare pipeline",
    },
  ],
  "Data Factory": [
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "Configurable pipelines ingesting batch HL7 v2 clinical messages",
    },
  ],
  Synapse: [
    {
      world: "experience-accenture",
      company: "Accenture",
      detail: "Curated FHIR datasets for clinical reporting teams",
    },
  ],
  MLflow: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "Tracked model versions, parameters and metrics",
    },
  ],
  Redis: [
    {
      world: "experience-bank-of-america",
      company: "Bank of America",
      detail: "Low-latency feature lookups for real-time fraud scoring",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Résumé                                                              */
/* ------------------------------------------------------------------ */

/** Single résumé PDF. Path is base-path-prefixed at render (see lib/site.ts). */
export const resume = {
  label: "Download Resume",
  href: "/resume/Chirag_Shinde_Resume.pdf",
  /** Filename the browser saves it as. */
  filename: "Chirag_Shinde_Resume.pdf",
};

/* ------------------------------------------------------------------ */
/* Skills — grouped superset, fixed order (DE foundation → DS)          */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Programming Languages",
    items: ["Python", "SQL", "Scala", "Java", "Bash"],
  },
  {
    id: "data-eng",
    title: "Data Engineering",
    items: [
      "ETL/ELT pipeline design",
      "Apache Spark",
      "dbt",
      "Data warehousing",
      "Data modeling",
      "Data quality frameworks",
    ],
  },
  {
    id: "orchestration",
    title: "Orchestration & Streaming",
    items: [
      "Apache Airflow",
      "Apache Kafka",
      "Spark Structured Streaming",
      "Batch & real-time processing",
    ],
  },
  {
    id: "cloud",
    title: "Cloud Platforms",
    items: [
      "AWS (S3, Lambda, EMR, Glue, SageMaker)",
      "Azure (Data Factory, Synapse, Azure ML)",
    ],
  },
  {
    id: "databases",
    title: "Databases & Warehouses",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Snowflake", "Redis", "Pinecone / vector DBs"],
  },
  {
    id: "mlops",
    title: "Platforms & MLOps",
    items: [
      "Databricks",
      "Docker",
      "Kubernetes",
      "MLflow",
      "Terraform",
      "CI/CD",
      "Model deployment & monitoring",
    ],
  },
  {
    id: "llm",
    title: "LLM / Generative AI",
    items: [
      "RAG pipelines",
      "LangChain",
      "Embeddings",
      "Vector search",
      "Prompt engineering",
      "LLM evaluation",
    ],
  },
  {
    id: "tools",
    title: "Version Control & Tools",
    items: ["Git", "GitHub/GitLab", "Jira", "Linux"],
  },
];

/* ------------------------------------------------------------------ */
/* Experience — one title per role                                     */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  /** The world this role owns. */
  world: Extract<WorldId, "experience-bank-of-america" | "experience-accenture">;
  company: string;
  location: string;
  period: string;
  title: string;
  project: string;
  /** Marks the role as ongoing — renders a "Current" pill next to the dates. */
  current?: boolean;
  bullets: string[];
  /** Headline figures for this role, drawn from the bullets below. */
  chips: StatChip[];
}

export const experience: ExperienceItem[] = [
  {
    world: "experience-bank-of-america",
    company: "Bank of America",
    location: "Chicago, IL",
    period: "Sep 2025 – Present",
    title: "Data Engineer",
    project: "Fraud & AML Streaming Platform",
    current: true,
    bullets: [
      "Developed a scalable transaction streaming pipeline supporting fraud and AML monitoring, processing 5M+ daily transactions across multiple business lines, enabling near-instant suspicious-activity detection and real-time analytics for enterprise risk and compliance teams.",
      "Built fault-tolerant, distributed Apache Kafka ingestion for high-throughput transaction events, persisting raw data to Amazon S3 as a centralized data lake so batch backfills and streaming jobs read one shared source.",
      "Engineered modular ETL and ELT pipelines and data models with SQL and Python, structuring raw transaction, customer, and account records into clean, standardized datasets that strengthened the accuracy of downstream fraud and AML detection logic.",
      "Moved fraud scoring from batch to Spark Structured Streaming, integrating Redis for low-latency feature lookups, reducing fraud-alert latency from roughly 15 minutes to near real time.",
      "Orchestrated distributed data-processing jobs with Apache Airflow on AWS, using AWS Lambda for event-driven triggers, lowering operational costs by 25% through improved pipeline scheduling.",
      "Automated data-quality checks (schema, null, and range validation) in CI/CD pipelines and tracked model versions, parameters, and metrics with MLflow for reproducible deployments and end-to-end observability.",
      "Built the data pipeline feeding an LLM alert-summarization tool, preparing and indexing case data for retrieval-augmented generation, adopted by fraud and compliance teams to speed up alert triage.",
    ],
    chips: [
      { kind: "count", value: 5, suffix: "M+", revealSuffix: true, label: "daily transactions" },
      { kind: "transition", before: "~15 min", after: "real time", label: "fraud-alert latency" },
      { kind: "count", value: 25, suffix: "%", label: "lower pipeline cost" },
    ],
  },
  {
    world: "experience-accenture",
    company: "Accenture",
    location: "Pune, India",
    period: "Jun 2022 – Jul 2024",
    title: "Data Engineer",
    project: "Healthcare Data Ingestion & FHIR Interoperability",
    bullets: [
      "Implemented an end-to-end healthcare data ingestion and FHIR interoperability pipeline, reducing manual data-integration effort by 45% and enabling standardized, compliant patient-record exchange across clinical systems for a large US healthcare client.",
      "Delivered configurable Azure Data Factory pipelines ingesting batch HL7 v2 clinical messages, mapping patient, encounter, and lab data from hospital EHR and laboratory systems into schema-validated datasets.",
      "Created ETL and ELT transformation logic with Python and SQL, mapping and validating raw HL7 data into FHIR R4 resources for patient, condition, and observation records.",
      "Used Apache Spark on Databricks for distributed cleansing and deduplication of clinical datasets, accelerating curated data delivery by 35%.",
      "Supported pipeline orchestration with Apache Airflow across ingestion and transformation jobs, loading curated FHIR datasets into Azure Synapse for clinical reporting teams.",
      "Designed a RAG pipeline with embeddings and semantic vector search, applying prompt engineering and LLM evaluation, improving FHIR field-extraction accuracy from unstructured clinical notes by 30% over the prior keyword-based method.",
      "Implemented PHI de-identification using HIPAA Safe Harbor with validation controls, reducing data-compliance review effort by 40%.",
    ],
    chips: [
      { kind: "count", value: 45, suffix: "%", label: "less manual integration" },
      { kind: "count", value: 35, suffix: "%", label: "faster curated delivery" },
      { kind: "count", value: 30, suffix: "%", label: "better field extraction" },
      { kind: "count", value: 40, suffix: "%", label: "less compliance review" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ProjectItem {
  /** Decorative vignette resolved in components/worlds/ProjectsWorld.tsx. */
  vignette: "rag" | "youtube";
  name: string;
  period: string;
  tags: string[];
  summary: string[];
}

// Static, informational cards only — not linked anywhere.
export const projects: ProjectItem[] = [
  {
    vignette: "rag",
    name: "RAG-based Q&A System with Vector DB",
    period: "Aug 2025 – Dec 2025",
    tags: ["PySpark", "FAISS", "PostgreSQL", "Gemini LLM", "Streamlit", "Dagster"],
    summary: [
      "Cut manual document-search time by 70% with an end-to-end ingestion / transformation pipeline (PySpark, distributed text processing).",
      "Designed structured metadata plus high-dimensional vector indexing (FAISS HNSW/IVF) with PostgreSQL for citation-grounded semantic search, scaled to large-scale PDF ingestion with OCR-derived text extraction.",
      "Shipped a production-ready app: Gemini LLM backend, Streamlit frontend, Dagster orchestration.",
    ],
  },
  {
    vignette: "youtube",
    name: "YouTube Mental Health Recovery Analysis",
    period: "Jan 2025 – May 2025",
    tags: ["YouTube API", "PySpark", "Dagster", "RoBERTa / Gemini", "Statistical Modeling", "Power BI"],
    summary: [
      "Automated extraction of 80+ structured features via an ETL pipeline (YouTube API, PySpark, Dagster, RoBERTa / Gemini LLM workflows).",
      "Applied Negative Binomial Regression, ANOVA, and OLS modeling to link emotional indicators with audience-engagement metrics.",
      "Integrated the structured datasets with Power BI dashboards for scalable reporting.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Education & Certifications                                           */
/* ------------------------------------------------------------------ */

export interface EducationItem {
  school: string;
  degree: string;
  location: string;
  period: string;
  /** Optional completion marker, e.g. "Graduated". */
  status?: string;
}

export const education: EducationItem[] = [
  {
    school: "University of Illinois at Chicago (UIC)",
    degree: "M.S. Computer Science",
    location: "Chicago, IL",
    period: "Aug 2024 – May 2026",
    status: "Graduated",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "B.E. Computer Engineering",
    location: "Pune, India",
    period: "Aug 2019 – May 2023",
  },
];

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
}

export const certifications: CertificationItem[] = [
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    date: "Jun 2026",
  },
];
