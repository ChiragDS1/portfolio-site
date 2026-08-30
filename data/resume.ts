/**
 * Single source of truth for all site copy.
 * Edit this file to change wording — components never hardcode content.
 *
 * One coherent identity: Data Engineer & Data Scientist. Data engineering is the
 * foundation; data science / ML is the specialization built on top of it. Every
 * section tells that one story.
 */

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

export const identity = {
  name: "Chirag Deepak Shinde",
  role: "Data Engineer & Data Scientist",
  tagline:
    "I build the pipelines that make machine learning possible — turning raw, unstructured data into reliable, production-grade platforms and insight.",
  location: "Chicago, IL",
  email: "cshin29@uic.edu",
  linkedinUrl: "https://www.linkedin.com/in/chirag-d-shinde",
  linkedinLabel: "linkedin.com/in/chirag-d-shinde",
  githubUrl: "https://github.com/", // TODO: replace with your GitHub profile URL
} as const;

export const profile =
  "Data Engineer & Data Scientist experienced in building end-to-end ETL pipelines and ML-ready data platforms. Delivered automated Azure Data Factory and Databricks pipelines that reduced manual research effort by 60%, and built predictive models reaching 85% forecast accuracy through medallion-style Snowflake pipelines and Python ML workflows. Focused on turning raw, unstructured data into reliable, production-grade pipelines and insight.";

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about: string[] = [
  "My work starts at the pipeline. I design ingestion and transformation layers — Azure Data Factory, Databricks, Snowflake, PySpark — that pull messy JSON, CSV and web data into governed, well-modeled tables. Medallion architecture, schema governance, data-quality frameworks: the unglamorous foundation that everything downstream depends on.",
  "On top of that foundation I do the modeling. Time-series forecasting, regression, NLP and LLM workflows that turn the curated data into predictions and insight stakeholders can act on. Because I own both halves, the features my models train on are reliable by construction rather than patched together after the fact.",
  "I hold an M.S. in Computer Science from the University of Illinois at Chicago and I'm looking for roles where data engineering and data science sit close together.",
];

/* ------------------------------------------------------------------ */
/* Pipeline narrative — the signature hero element                     */
/* ------------------------------------------------------------------ */

export interface PipelineStage {
  key: string;
  label: string;
  blurb: string;
  /** icon id resolved in components/PipelineFlow.tsx */
  icon: "pipeline" | "feature" | "model" | "insight";
}

export const pipelineStages: PipelineStage[] = [
  { key: "pipeline", label: "Pipeline", blurb: "Ingest raw sources into governed tables", icon: "pipeline" },
  { key: "feature", label: "Feature", blurb: "Validate and shape ML-ready features", icon: "feature" },
  { key: "model", label: "Model", blurb: "Train forecasting and NLP models", icon: "model" },
  { key: "insight", label: "Insight", blurb: "Serve predictions and dashboards", icon: "insight" },
];

/* ------------------------------------------------------------------ */
/* Stat bar — real numbers from the resume, animated as count-ups      */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: number;
  suffix: string;
  trend: "up" | "down";
  label: string;
}

export const stats: Stat[] = [
  { value: 60, suffix: "%", trend: "down", label: "manual research effort" },
  { value: 85, suffix: "%", trend: "up", label: "forecast accuracy" },
  { value: 70, suffix: "%", trend: "down", label: "document search time" },
  { value: 30, suffix: "%", trend: "up", label: "processing efficiency" },
];

/* ------------------------------------------------------------------ */
/* Core Technologies strip                                             */
/* ------------------------------------------------------------------ */

export const coreTech: { group: string; items: string[] }[] = [
  {
    group: "Data Engineering",
    items: [
      "Azure Data Factory",
      "Databricks",
      "Snowflake",
      "Apache Spark",
      "Apache Airflow",
      "dbt",
      "Delta Lake",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    group: "Data Science & ML",
    items: [
      "Python",
      "pandas",
      "NumPy",
      "scikit-learn",
      "Hugging Face",
      "Google Gemini",
      "MLflow",
      "Power BI",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Résumé                                                              */
/* ------------------------------------------------------------------ */

/** Single résumé — the Data Engineer version. Path is base-path-prefixed at render. */
export const resume = {
  label: "Download Resume",
  href: "/resume/Chirag_Shinde_DataEngineer.pdf",
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
    id: "eng-cloud",
    title: "Data Engineering & Cloud",
    items: [
      "Databricks",
      "ETL / ELT",
      "Data Modeling",
      "Data Warehousing",
      "Azure Data Factory",
      "Delta Lake",
      "Azure Synapse",
      "Azure ADLS Gen2",
      "Snowflake",
      "Snowpark",
    ],
  },
  {
    id: "bigdata",
    title: "Big Data & Programming",
    items: [
      "PySpark",
      "Apache Spark",
      "SQL",
      "Python (Pandas, NumPy, Scikit-learn)",
      "Batch & Streaming Systems",
      "Distributed Processing",
    ],
  },
  {
    id: "devops",
    title: "Orchestration & DevOps",
    items: [
      "Dagster",
      "Airflow",
      "dbt",
      "Great Expectations",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Git",
      "MLflow",
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & AI",
    items: [
      "Scikit-learn",
      "NLP",
      "RoBERTa",
      "SentenceTransformers",
      "LLM Workflows (Gemini / OpenAI APIs)",
      "RAG Architectures",
      "Vector Databases (FAISS, PostgreSQL)",
    ],
  },
  {
    id: "stats",
    title: "Statistics & Analytics",
    items: [
      "Statistical Modeling",
      "Regression (OLS, Negative Binomial)",
      "ANOVA",
      "Time-Series Forecasting",
      "A/B Testing",
      "EDA",
      "Hypothesis Testing",
    ],
  },
  {
    id: "viz",
    title: "Visualization",
    items: ["Power BI (DAX, Semantic Modeling)", "Streamlit", "PostgreSQL"],
  },
];

/* ------------------------------------------------------------------ */
/* Experience — one title per role                                     */
/* ------------------------------------------------------------------ */

export interface ExperienceItem {
  company: string;
  location: string;
  period: string;
  title: string;
  project: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "University of Illinois at Chicago",
    location: "Chicago, IL",
    period: "Sep 2025 – May 2026",
    title: "Graduate Research Assistant",
    project: "Board Director Mortality Study & Research Outreach Automation",
    bullets: [
      "Reduced manual research / data-collection effort by 60% by engineering automated ETL pipelines with Azure Data Factory and the Gemini Flash LLM, extracting unstructured JSON/CSV web data into Azure Data Lake (ADLS Gen2).",
      "Improved dataset reliability and quality by building automated PySpark validation and transformation workflows on Azure Databricks, using Unity Catalog for governance and schema control.",
      "Accelerated analytics by profiling datasets, mapping entity relationships, and optimizing a normalized data model — cutting SQL query runtime and enabling direct integration with Azure Synapse and Power BI.",
      "Increased outreach workflow scalability by 50% by automating alumni / startup campaign pipelines with Power Automate integrated with Azure SQL.",
    ],
  },
  {
    company: "M.S Engineers",
    location: "Pune, India",
    period: "May 2023 – Jul 2024",
    title: "Data Engineer",
    project: "Sales Forecasting & Analytics Data Platform",
    bullets: [
      "Improved data processing efficiency by 30% by building ETL pipelines with PySpark / SQL in Snowflake (Snowpark) using a medallion-style architecture (Bronze / Silver / Gold).",
      "Increased sales forecast accuracy to 85% (a 15% improvement) via an Azure Event Hubs ingestion / transformation pipeline feeding clean time-series data to Python ML models.",
      "Designed Star Schema data models and data marts supporting scalable BI reporting and KPI analysis.",
      "Reduced manual deployment overhead by 50% with a containerized CI/CD DataOps pipeline (Docker, GitHub Actions, Git) automating schema validation and model retraining.",
      "Improved production data reliability with a Spark SQL quality framework — null checks, schema-drift detection, statistical threshold validation, and automated A/B comparisons.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ProjectItem {
  name: string;
  period: string;
  tags: string[];
  summary: string[];
}

// Static, informational cards only — not linked anywhere.
export const projects: ProjectItem[] = [
  {
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
    school: "SPPU University",
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
    date: "June 2026",
  },
];

/* ------------------------------------------------------------------ */
/* Nav sections                                                        */
/* ------------------------------------------------------------------ */

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
