// Content is kept separate from layout so copy can be edited without touching
// components. Structure mirrors the site's page routes; home-page sections keep
// their original named exports so the existing home components stay untouched.

/* ==========================================================================
   GLOBAL — navigation + footer
   ========================================================================== */

// Two items open a mega panel; the rest are direct links. Panel copy is short —
// a menu is scanned, not read. `to` values are real router routes.
export const nav = {
  brand: "THEERRV",
  links: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Solutions", to: "/solutions" },
    // { label: "Case Studies", to: "/case-studies" }, // temporarily hidden
    { label: "Insights", to: "/insights" },
    // { label: "Careers", to: "/careers" }, // temporarily hidden
    { label: "Contact", to: "/contact" },
  ],
};

export const footer = {
  brand: "THEERRV",
  legalName: "Theerrv Technologies",
  tagline: ["Custom software,", "engineered to hold."],
  closing: "Built for what comes next.",
  address: ["Theerrv Technologies LLP", "Vellore, Tamil Nadu", "India 632001"],
  signature: "Dome for your Vision",
  email: "info@theerrv.com",
  phone: "+91 63693 72124",
  whatsapp: "https://wa.me/916369372124",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Product Engineering", to: "/services/product-engineering" },
        { label: "Modernization", to: "/services/modernization" },
        { label: "Cloud & DevOps", to: "/services/cloud-devops" },
        { label: "Data & Automation", to: "/services/data-automation" },
        { label: "APIs & Security", to: "/services/apis-integration" },
        { label: "AI & Consulting", to: "/services/ai-consulting" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Business Automation", to: "/solutions" },
        { label: "Analytics", to: "/solutions" },
        { label: "AI", to: "/solutions" },
        { label: "Enterprise Apps", to: "/solutions" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        // { label: "Case Studies", to: "/case-studies" }, // temporarily hidden
        { label: "Insights", to: "/insights" },
        // { label: "Careers", to: "/careers" }, // temporarily hidden
        { label: "Locations", to: "/contact#location" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/theerrv-technologies/" },
    { label: "Instagram", href: "https://www.instagram.com/theerrv_technologies" },
    { label: "WhatsApp", href: "https://wa.me/916369372124" },
  ],
};

/* ==========================================================================
   HOME PAGE
   ========================================================================== */

export const hero = {
  eyebrow: "Theerrv Technologies",
  tagline: "Dome for your vision",
  scrollCue: "Scroll to explore",
  headline: ["Build, Modernize,", "and Scale with", "Theerrv Technologies."],
  subline:
    "Software engineering, digital products, cloud solutions, automation, and AI — built to help your business move forward.",
  ctas: [
    { label: "Explore Our Services", to: "/services", primary: true },
    { label: "Contact Us", to: "/contact", primary: false },
  ],
};

// NOTE: The homepage renders entirely from `homeStory` (below) via the Story
// component. The older flat home sections (intro, capabilities, philosophy,
// technology, selectedWork, finalCta) and their components were retired — the
// six-service `homeStory.services` list is the single source of truth now.

export const homeFaqs = {
  eyebrow: "FAQ",
  heading: "Common Questions",
  items: [
    {
      q: "What does Theerrv Technologies do?",
      a: "We provide software development, web design, cloud solutions, application modernization, automation, analytics, and AI integration services for businesses looking to improve their digital capabilities.",
    },
    {
      q: "What industries does Theerrv Technologies work with?",
      a: "Our services support businesses across a wide range of industries that need custom software, web applications, automation, data solutions, or cloud modernization.",
    },
    {
      q: "Can Theerrv Technologies help build a new software product?",
      a: "Yes. We support businesses from planning and architecture through development, testing, deployment, and ongoing improvement.",
    },
    {
      q: "Do you work on existing software systems?",
      a: "Yes. We modernize legacy applications, improve performance, enhance architecture, and integrate new features or technologies into existing systems.",
    },
    {
      q: "Does Theerrv Technologies provide AI solutions?",
      a: "Yes. We offer practical AI solutions such as chatbots, natural-language interfaces, intelligent workflows, and AI integration into existing applications.",
    },
    {
      q: "How can I contact Theerrv Technologies for a project?",
      a: "You can reach us through our website contact form, email, or phone to discuss your project, business goals, or digital transformation needs.",
    },
  ],
};

/* ==========================================================================
   HOME — SCROLL STORY (7-scene cinematic homepage over the 3D mark)
   ========================================================================== */

export const homeStory = {
  // 02 — INTRO (editorial manifesto)
  intro: {
    eyebrow: "Our Philosophy",
    lead: ["Technology should", "solve problems."],
    paragraphs: [
      "We build solutions that simplify complexity, accelerate growth, and create lasting impact.",
      "Every product. Every process. Every decision — designed to move your business forward.",
    ],
    words: [
      { word: "Build", note: "Turn ideas into reality.", tone: "build" },
      { word: "Modernize", note: "Evolve without disruption.", tone: "modernize" },
      { word: "Automate", note: "Do more with less effort.", tone: "automate" },
      { word: "Optimize", note: "Make every step better.", tone: "optimize" },
      { word: "Grow", note: "Scale with confidence.", tone: "grow" },
    ],
  },

  // 03 — CORE SERVICES (the live operating system)
  services: {
    eyebrow: "Our Core Services",
    heading: "Technology Services Designed Around Business Needs",
    lead: "We engineer whole systems, not isolated features. Move through the services and watch the operating system beside them redraw itself for each one.",
    items: [
      { id: "product-engineering", index: "01", title: "Product Engineering & Custom Software", outcome: "Software built around how your business actually works." },
      { id: "modernization", index: "02", title: "Modernization, Architecture & Performance", outcome: "Existing systems made faster, stabler and cheaper to maintain." },
      { id: "cloud-devops", index: "03", title: "Cloud, DevOps & Scalable Platforms", outcome: "Reliable hosting and automated releases that scale with you." },
      { id: "data-automation", index: "04", title: "Data, Analytics & Business Automation", outcome: "Scattered data and manual work turned into clear, automated flows." },
      { id: "apis-integration", index: "05", title: "APIs, Integrations, Reliability & Security", outcome: "Systems connected, secure and dependable — even under load." },
      { id: "ai-consulting", index: "06", title: "AI Solutions & Technical Consulting", outcome: "Practical AI, plus senior engineering guidance you can trust." },
    ],
  },

  // 04 — BUSINESS TRANSFORMATION (the engagement arc, as a pinned timeline)
  transform: {
    eyebrow: "Business Transformation",
    heading: "What should technology do for your business?",
    lead: "Five outcomes we design and engineer for — the questions every serious technology decision should answer.",
    phases: [
      {
        id: "build",
        index: "01",
        title: "Build",
        summary: "Turn ideas into production-ready digital platforms.",
        detail: "From first architecture to a product in production — engineered to be owned, extended, and scaled.",
        deliverables: ["Product architecture", "Full-stack delivery", "Launch-ready release", "Handover & support"],
      },
      {
        id: "modernize",
        index: "02",
        title: "Modernize",
        summary: "Improve older systems without losing critical business value.",
        detail: "Phased assessment and migration that reduces maintenance load and prepares legacy systems for what's next.",
        deliverables: ["System assessment", "Phased migration", "Performance uplift", "Cloud readiness"],
      },
      {
        id: "automate",
        index: "03",
        title: "Automate",
        summary: "Reduce repetitive work and improve productivity.",
        detail: "Manual handoffs replaced by systems that talk to each other, so teams spend time on work that needs judgement.",
        deliverables: ["Workflow mapping", "System integrations", "Automated pipelines", "Fewer manual steps"],
      },
      {
        id: "optimize",
        index: "04",
        title: "Optimize",
        summary: "Identify bottlenecks and improve speed and stability.",
        detail: "Targeted work across databases, APIs and infrastructure that removes friction and holds up under load.",
        deliverables: ["Performance audit", "Query & API tuning", "Scalable architecture", "Monitoring in place"],
      },
      {
        id: "ai",
        index: "05",
        title: "Add AI",
        summary: "Introduce practical intelligence and workflow intelligence.",
        detail: "AI features embedded in real business applications — useful, responsible, and with a human still in the loop.",
        deliverables: ["Use-case scoping", "Model integration", "Intelligent workflows", "Human-in-the-loop"],
      },
    ],
  },

  // 05 — WHY THEERRV
  why: {
    eyebrow: "Why Theerrv",
    lead: ["More than a", "technology vendor."],
    sub: "A partner for what's next.",
    intro: "At Theerrv Technologies, we combine technical capability with a business-focused mindset. We understand that every project is more than code — it is an investment in efficiency, customer experience, and future growth.",
    points: [
      { index: "01", statement: "We own the outcome.", detail: "From planning to deployment." },
      { index: "02", statement: "We build for change.", detail: "Architecture that doesn't become tomorrow's problem." },
      { index: "03", statement: "We start from the business.", detail: "Every decision traces back to a real goal." },
      { index: "04", statement: "We build to last.", detail: "Quality, maintainability and long-term value." },
      { index: "05", statement: "We deliver, reliably.", detail: "Open about progress, honest about trade-offs." },
    ],
  },

  // 06 — IMPACT / RESULTS
  impact: {
    eyebrow: "From technology to real impact",
    words: [
      { word: "Efficiency", note: "Less friction. More output." },
      { word: "Performance", note: "Systems that move with your business." },
      { word: "Automation", note: "Less repetition. More focus." },
      { word: "Better Data", note: "Decisions backed by clarity." },
      { word: "Growth", note: "Technology built for what's next." },
    ],
  },

  // 08 — FINAL CTA
  cta: {
    statement: "At Theerrv Technologies, we are committed to building software and digital experiences that help businesses adapt, grow, and lead with confidence.",
    title: ["Let's build", "what's next."],
    body: "Technology that works for your future.",
    primary: { label: "Start Your Project", to: "/contact" },
  },
};

/* ==========================================================================
   SERVICES PAGE
   ========================================================================== */

export const servicesPage = {
  seoTitle: "Services | Product Engineering, Modernization, Cloud, Data & AI | Theerrv Technologies",
  seoDescription:
    "Six software services covering a project end to end — product engineering and custom software, modernization, cloud & DevOps, data & automation, APIs & security, and practical AI.",
  hero: {
    eyebrow: "Services",
    headline: ["Our", "Services."],
    lead: "A comprehensive range of software and technology services designed to help businesses build, improve, and scale their digital capabilities — built around practical outcomes and long-term value.",
  },
  // Two-column editorial showcase: left intro, right numbered icon list.
  showcase: {
    eyebrow: "Services",
    headline: ["Engineering", "solutions that"],
    accent: "build, modernize, and transform businesses",
    lead: "From product engineering to cloud, data, and AI — we deliver the capabilities you need to innovate, operate smarter, and stay ahead.",
    items: [
      {
        index: "01", slug: "product-engineering",
        category: "Software Engineering", title: "Product Engineering & Custom Software",
        description: "Software built around how your business actually works — not the other way round.",
        detail: {
          subtitle: "Software built around how your business actually works — not the other way round.",
          overview: [
            "Off-the-shelf tools force you to change your process to fit them. We build applications that fit your process, so your team keeps working the way it already knows.",
            "We provide end-to-end product engineering across frontend, backend, databases, integrations, testing, deployment and ongoing support — one team owning the whole path from technical design to post-launch enhancement.",
          ],
          capabilities: [
            "Custom web applications, customer portals, admin applications and internal business tools",
            "Full-stack product development using React, TypeScript, C#, ASP.NET Core and SQL Server",
            "API design, business logic, database architecture and third-party integrations",
            "Reusable UI components, dashboards, forms, role-based experiences and responsive applications",
            "Background processing, asynchronous workflows and event-driven functionality",
            "Incremental delivery, so features release without waiting for one large launch",
            "Technical design, implementation, testing, production release and post-launch enhancement",
          ],
          outcomes: [
            "Custom web apps, customer portals and internal tools built to your exact workflow",
            "Dashboards, forms and role-based access so each person sees only what they need",
            "Your new software connected to the tools and systems you already use",
            "Features shipped in stages, so you see value early instead of waiting for one big launch",
          ],
        },
      },
      {
        index: "02", slug: "modernization",
        category: "Modernization", title: "Modernization, Architecture & Performance",
        description: "Make your existing software faster, more stable, and cheaper to maintain — without a risky rebuild.",
        detail: {
          subtitle: "Make your existing software faster, more stable, and cheaper to maintain — without a risky rebuild.",
          overview: [
            "Your current system doesn't have to be thrown away to get better. We fix the slow, fragile parts and leave you with a platform that's easier to grow.",
            "We assess the architecture, identify technical debt and performance bottlenecks, and create a controlled path toward a more maintainable, scalable and efficient platform.",
            "The result is lower maintenance risk, better developer productivity, stronger application performance and a safer path for future growth.",
          ],
          capabilities: [
            "Legacy application assessment and technical debt identification",
            "AngularJS and older frontend migration toward React and modern component architecture",
            "Legacy .NET modernization toward current ASP.NET Core services",
            "Monolith-to-modular or monolith-to-service decomposition based on business value",
            "API extraction, integration-layer modernization and service boundary design",
            "Architecture reviews, with Clean Architecture, DDD and CQRS applicability assessment",
            "SQL Server query, indexing, stored procedure and execution-plan optimization",
            "Backend API profiling, caching, repeated-call reduction and concurrency-aware tuning",
            "React performance work including lazy loading, code splitting and render optimization",
            "Before-and-after performance measurement to demonstrate measurable improvement",
          ],
          outcomes: [
            "Slow applications and databases sped up, with clear before-and-after proof",
            "Ageing code untangled so new features ship faster and break less",
            "Outdated frontends and legacy systems migrated to modern, supported versions",
            "Reduced risk and cost of maintaining an old system",
          ],
        },
      },
      {
        index: "03", slug: "cloud-devops",
        category: "Cloud & Platform", title: "Cloud, DevOps & Scalable Platforms",
        description: "Software that's reliable to run, quick to update, and ready to scale as you grow.",
        detail: {
          subtitle: "Software that's reliable to run, quick to update, and ready to scale as you grow.",
          overview: [
            "Slow, manual releases hold teams back and invite mistakes. We set up cloud hosting and automated delivery so updates go out safely and often.",
            "We help teams adopt Azure, improve deployment processes, and build platforms that are easier to release, monitor and scale.",
          ],
          capabilities: [
            "Azure application hosting and cloud architecture using App Service, Functions and WebJobs",
            "Azure Service Bus, Storage and event-driven application patterns",
            "Docker-based application packaging and containerized deployments",
            "CI/CD pipelines for .NET, React and supporting services",
            "Automated build, unit and integration testing, and deployment workflows",
            "Environment-specific configuration and promotion across development, staging and production",
            "Git branching and repository workflow guidance",
            "Quality gates, deployment validation and rollback-oriented practices",
            "Cloud readiness, application refactoring and modernization",
            "Independent deployment paths for distributed services and microservices",
          ],
          outcomes: [
            "Applications hosted on Azure for reliability and room to grow",
            "Automated releases, so updates ship faster with fewer errors",
            "Separate test and live environments to catch problems before customers do",
            "Safe rollback when something goes wrong, with monitoring built in",
          ],
        },
      },
      {
        index: "04", slug: "data-automation",
        category: "Data & Automation", title: "Data, Analytics & Business Automation",
        description: "Turn scattered data and manual work into clear reports and automated processes.",
        detail: {
          subtitle: "Turn scattered data and manual work into clear reports and automated processes.",
          overview: [
            "Manual reporting and copying data between systems eats time and creates errors. We connect your data and automate the repetitive work, so your team gets answers instead of spreadsheets.",
            "We connect operational data, databases, APIs and reporting tools to reduce manual work and give teams better visibility into their business.",
            "The result is less manual effort, more consistent data, and operational information you can actually act on.",
          ],
          capabilities: [
            "Data engineering and source-to-target pipeline design",
            "ETL automation, extraction, transformation and validation",
            "Scheduled and asynchronous processing using C#, Azure Functions and WebJobs",
            "Database staging, import patterns, data-quality checks and reprocessing workflows",
            "Replacement of repetitive manual reporting and data-extraction processes",
            "SQL Server schema, data-model and query optimization",
            "KPI dashboards, executive reporting and operational analytics",
            "Interactive filters, drill-downs and trend visualizations",
            "Power BI integration and data-driven reporting",
            "Real-time dashboards and live updates using SignalR",
            "Forecasting and anomaly-oriented presentation where the data model supports it",
          ],
          outcomes: [
            "The repetitive reporting and data entry your team does by hand, automated",
            "Data from different systems brought into one reliable place",
            "KPI and executive dashboards with filters, drill-downs and trends, including Power BI",
            "Live dashboards that update in real time as your business changes",
          ],
        },
      },
      {
        index: "05", slug: "apis-integration",
        category: "Integration & Security", title: "APIs, Integrations, Reliability & Security",
        description: "Keep your systems connected, secure, and dependable — even under load.",
        detail: {
          subtitle: "Keep your systems connected, secure, and dependable — even under load.",
          overview: [
            "As you add tools, they need to talk to each other safely and stay up when it matters. We build the connections and safeguards that keep everything running.",
            "We engineer APIs, integrations and distributed services with reliability, observability and application-level security built into the design.",
            "That means earlier failure detection, faster troubleshooting, stronger access control and more confidence in production.",
          ],
          capabilities: [
            "REST API design, versioning, validation, documentation and error handling",
            "Domain and service-layer architecture with clear separation of concerns",
            "Third-party API integrations and secure API-to-API communication",
            "Microservices, bounded contexts and event-driven communication where appropriate",
            "Queues, publish/subscribe patterns, background workers and asynchronous workflows",
            "Retry, timeout, circuit-breaker and graceful-degradation strategies",
            "Structured logging, health checks, dependency checks and operational monitoring",
            "Failure detection, alerting and root-cause investigation",
            "OAuth 2.0, JWT authentication and role-based authorization",
            "Enterprise identity integration, including Active Directory where applicable",
            "Security-focused architecture and code reviews",
            "Authentication and authorization test coverage",
          ],
          outcomes: [
            "Your software connected securely to third-party tools and services",
            "Safeguards built in, so one failure doesn't take everything down",
            "Problems caught early with monitoring, health checks and alerts",
            "Access protected with secure logins and role-based permissions",
          ],
        },
      },
      {
        index: "06", slug: "ai-consulting",
        category: "AI & Consulting", title: "AI Solutions & Technical Consulting",
        description: "Add practical AI to your business, and get senior technical guidance you can trust.",
        detail: {
          subtitle: "Add practical AI to your business, and get senior technical guidance you can trust.",
          overview: [
            "AI is only useful when it solves a real problem. We add AI where it creates measurable value, and advise you honestly on the engineering decisions behind it.",
            "We add practical AI capabilities to existing products while providing senior technical guidance on architecture, modernization and engineering decisions.",
            "Best fit: startups validating a technical direction, businesses modernizing existing systems, and teams that need experienced technical leadership without building a large engineering team.",
          ],
          capabilities: [
            "AI chatbots and natural-language interfaces for internal and customer-facing workflows",
            "LLM integration into existing web applications and APIs",
            "RAG-style knowledge experiences where suitable data and retrieval architecture exist",
            "AI-assisted document, data and workflow processing",
            "Natural-language query experiences over structured business data",
            "AI-assisted development workflows for code generation, refactoring and test creation",
            "AI proof-of-concepts followed by production-oriented architecture",
            "Architecture assessments and solution reviews",
            "Technical debt assessment and prioritization",
            "Performance and scalability assessments",
            "Codebase and engineering-practice reviews",
            "Technical roadmaps and mentoring for internal development teams",
          ],
          outcomes: [
            "AI chatbots and assistants for customer and internal workflows",
            "Staff and customers asking questions in plain language over your own data",
            "Document, data and workflow processing automated with AI",
            "Senior technical reviews, roadmaps and mentoring — without hiring a full team",
          ],
        },
      },
    ],
  },
  cta: {
    heading: "Not sure which service fits?",
    body: "Tell us your problem — we'll point you to the right one.",
    label: "Talk to us",
    to: "/contact",
  },
  faqs: {
    eyebrow: "FAQ",
    heading: "Services Questions",
    items: [
      {
        q: "What services do you offer?",
        a: "Six, and they cover a project end to end: product engineering and custom software, modernization and performance, cloud and DevOps, data and business automation, APIs and security, and AI solutions with technical consulting. Most engagements draw on two or three of them.",
      },
      {
        q: "Do I have to rebuild my existing system to improve it?",
        a: "No. We assess the architecture, find the technical debt and the real bottlenecks, then fix the slow and fragile parts in controlled stages — so you get a faster, cheaper-to-maintain platform without the risk of a full rewrite.",
      },
      {
        q: "Which technologies do you work with?",
        a: "Our core stack is .NET 8, C#, ASP.NET Core, React, TypeScript, SQL Server, Azure, Docker and Power BI, alongside Clean Architecture, DDD, CQRS, CI/CD and modern testing practices. We take on other technologies where a project calls for it.",
      },
      {
        q: "Can you automate our manual reporting and data entry?",
        a: "Yes. We build the pipelines that bring data from different systems into one reliable place, replace the repetitive reporting your team does by hand, and deliver KPI and executive dashboards with filters, drill-downs and live updates.",
      },
      {
        q: "How do you keep releases safe and systems reliable?",
        a: "Automated CI/CD pipelines, separate test and live environments, quality gates and rollback-oriented practices — plus health checks, structured logging, alerting and retry and circuit-breaker patterns so one failure doesn't take everything down.",
      },
      {
        q: "Is your AI work practical or experimental?",
        a: "Practical. We add AI where it creates measurable value — chatbots and natural-language interfaces, LLM integration into existing apps, and AI-assisted document and workflow processing — and we'll tell you honestly when AI isn't the right answer.",
      },
      {
        q: "Do you provide technical guidance without building the whole product?",
        a: "Yes. Architecture assessments, technical debt prioritization, performance reviews, roadmaps and mentoring for your internal team — senior engineering guidance without you hiring a full team.",
      },
      {
        q: "Do you deliver everything in one large launch?",
        a: "No. We ship in stages so you see value early instead of waiting for one big release, with technical design, testing, production release and post-launch enhancement all covered.",
      },
    ],
  },
};

/* ==========================================================================
   SOLUTIONS PAGE
   ========================================================================== */

export const solutionsPage = {
  seoTitle: "Solutions | Business Automation, Analytics, AI & Enterprise Applications | Theerrv Technologies",
  seoDescription:
    "Business automation, analytics and reporting, practical AI, and enterprise applications — outcome-driven solutions engineered around your operations and long-term growth.",
  hero: {
    eyebrow: "Solutions",
    headline: ["Business", "Solutions."],
    lead: "At Theerrv Technologies, our solutions are designed to address real business and technology challenges through practical, scalable, and outcome-driven implementation. We help organizations improve operational efficiency, modernize critical systems, strengthen decision-making through data, and introduce intelligent capabilities that support long-term digital growth.",
    support:
      "Our approach combines software engineering, cloud enablement, integration, automation, analytics, and AI to deliver solutions that are not only technically robust, but also aligned with business goals, operational workflows, and future scalability. Whether the need is process optimization, better visibility into data, modernization of core applications, or the introduction of AI-powered experiences, we focus on building solutions that create measurable value and sustainable impact.",
  },
  items: [
    {
      index: "01",
      title: "Business Automation",
      subtitle: "Process Automation for Greater Efficiency and Control",
      paragraphs: [
        "Modern businesses often lose time and productivity to repetitive manual tasks, disconnected systems, and inefficient operational workflows. Our Business Automation solutions are designed to reduce manual effort, improve consistency, and enable faster execution across business processes.",
        "We build automation solutions that connect applications, streamline approvals, move data between systems, validate inputs, trigger background operations, and eliminate repetitive tasks that slow down teams. These solutions can include workflow-based applications, backend process automation, scheduled jobs, ETL pipelines, and cloud-based event-driven services.",
        "By introducing automation into operational processes, businesses can reduce error rates, improve turnaround times, increase visibility, and create more reliable day-to-day execution.",
      ],
      includesLabel: "What our automation solutions can include",
      includes: [
        "Workflow automation for internal business processes",
        "System-to-system integration and data synchronization",
        "Background processing and scheduled task execution",
        "ETL and data preparation pipelines",
        "Validation and exception-handling workflows",
        "Operational dashboards for process visibility",
      ],
    },
    {
      index: "02",
      title: "Analytics & Reporting",
      subtitle: "Data Platforms, Dashboards, and Reporting for Better Decision-Making",
      paragraphs: [
        "Data becomes valuable when it is structured, accessible, and connected to business decisions. Our Analytics & Reporting solutions help organizations transform raw operational data into meaningful insight through reporting systems, KPI dashboards, and real-time visibility tools.",
        "We design and implement data flows, reporting layers, and dashboard experiences that help stakeholders monitor performance, identify trends, and act with greater confidence. Our solutions can support executive reporting, operational dashboards, management KPIs, and near real-time visibility across departments or business functions.",
        "In addition to presentation, we also focus on the underlying data quality and engineering required to make analytics reliable. This includes data extraction, transformation, validation, storage optimization, and query performance improvements where needed.",
      ],
      includesLabel: "What our analytics solutions can include",
      includes: [
        "KPI dashboards and executive reporting",
        "Operational and performance monitoring dashboards",
        "Real-time and near real-time reporting experiences",
        "Data extraction, transformation, and validation pipelines",
        "SQL optimization for reporting workloads",
        "Decision-support systems and business visibility tools",
      ],
    },
    {
      index: "03",
      title: "AI Solutions",
      subtitle: "Practical AI Integration for Business Systems and Digital Products",
      paragraphs: [
        "Artificial intelligence creates the most value when it is applied to real workflows, real data, and real user needs. Our AI Solutions focus on practical implementation that enhances business applications, improves user interaction, and supports smarter decision-making and automation.",
        "We help organizations integrate AI capabilities into existing or new systems through intelligent search, chatbot interfaces, natural-language interactions, AI-assisted workflows, and business process support. Depending on the use case, this may involve document interaction, knowledge retrieval experiences, prompt-driven workflows, or AI-powered assistants embedded into digital platforms.",
        "Our approach emphasizes controlled, purposeful adoption — ensuring that AI functionality is aligned with business goals, integrated with the right systems, and implemented in a way that supports usability, reliability, and maintainability.",
      ],
      includesLabel: "What our AI solutions can include",
      includes: [
        "AI chatbot and assistant experiences",
        "Natural-language interfaces for business applications",
        "Intelligent search and knowledge retrieval",
        "AI-assisted process workflows",
        "Document and content interaction experiences",
        "AI integration into existing products and platforms",
      ],
    },
    {
      index: "04",
      title: "Enterprise Applications",
      subtitle: "Scalable, Secure, and Business-Critical Software Solutions",
      paragraphs: [
        "Enterprise applications are at the core of how organizations manage operations, users, data, and digital services. Our Enterprise Applications solutions are focused on designing and building secure, scalable, and maintainable software systems that support critical business functions and long-term transformation.",
        "We develop applications that support internal operations, customer-facing services, partner interactions, workflow management, and integrated business processes. These systems are built with a focus on architecture, performance, security, maintainability, and adaptability — ensuring they can evolve with business growth and changing operational demands.",
        "Whether building a new enterprise platform or enhancing an existing one, we focus on creating systems that provide strong technical foundations, support integration across the business ecosystem, and enable stable day-to-day usage at scale.",
      ],
      includesLabel: "What our enterprise application solutions can include",
      includes: [
        "Internal business applications and operational platforms",
        "Customer and partner portals",
        "Secure workflow and transaction systems",
        "API-connected and integration-ready platforms",
        "Role-based access and authentication-enabled applications",
        "Scalable architectures for long-term growth",
      ],
    },
  ],
  closing: {
    statement:
      "At Theerrv Technologies, our solutions are built to bridge business needs and modern technology capabilities. We focus on delivering systems that are practical, scalable, and engineered for long-term value — helping organizations operate more efficiently, make smarter decisions, and move forward with confidence in a digital-first environment.",
  },
  cta: {
    heading: "Looking for a solution tailored to your business goals?",
    body: "We can help you plan the right approach.",
    label: "Request a Consultation",
    to: "/contact",
  },
  faqs: {
    eyebrow: "FAQ",
    heading: "Solutions Questions",
    items: [
      {
        q: "What business solutions does Theerrv Technologies provide?",
        a: "Business automation, analytics and reporting, AI solutions, and enterprise application solutions designed to improve efficiency, visibility, and business growth.",
      },
      {
        q: "How can automation help my business?",
        a: "Automation can reduce repetitive manual work, improve consistency, lower operational errors, and help teams focus on higher-value tasks.",
      },
      {
        q: "What types of analytics solutions do you offer?",
        a: "Dashboards, KPI tracking, reporting systems, ETL workflows, and decision-support tools that help businesses better understand performance and operations.",
      },
      {
        q: "Can AI be added to existing business systems?",
        a: "Yes. We help businesses integrate AI into existing applications and workflows, including chatbot experiences, natural-language capabilities, and intelligent automation.",
      },
      {
        q: "What are enterprise applications?",
        a: "Software systems designed to support important business operations, internal processes, customer interactions, and long-term digital transformation.",
      },
      {
        q: "How do I know which solution is right for my business?",
        a: "We recommend starting with a consultation so we can understand your goals, challenges, and current systems before suggesting the most suitable solution.",
      },
    ],
  },
};

/* ==========================================================================
   CASE STUDIES PAGE
   ========================================================================== */

export const caseStudiesPage = {
  seoTitle: "Case Studies | Software, Cloud, Automation & AI Projects | Theerrv Technologies",
  seoDescription:
    "How Theerrv approaches real projects — new product builds, legacy modernization, data and reporting, and AI automation — with a focus on practical, measurable results.",
  hero: {
    eyebrow: "Case Studies",
    headline: ["Case", "Studies."],
    lead: "How we approach real business and technology challenges — from building new platforms and improving performance to modernizing legacy systems and enabling automation. Our focus is always on practical results, stronger systems, and measurable value.",
  },
  note: "If your company is at the beginning of its journey, this page also presents capability examples and solution stories until full client case studies are published.",
  blocks: [
    {
      index: "001",
      title: "New Product Development",
      description:
        "How we support businesses in turning ideas into scalable digital products through planning, engineering, testing, and deployment.",
      tags: ["Product", "Engineering"],
    },
    {
      index: "002",
      title: "Legacy Modernization",
      description:
        "How we help organizations improve maintainability, performance, and cloud readiness without losing critical business functionality.",
      tags: ["Modernization", "Cloud"],
    },
    {
      index: "003",
      title: "Data & Reporting Improvements",
      description:
        "How we create dashboards, reporting systems, and data workflows that improve operational visibility.",
      tags: ["Data", "Analytics"],
    },
    {
      index: "004",
      title: "AI & Automation Enablement",
      description:
        "How we integrate intelligent functionality and automation into workflows to reduce manual effort and improve user experience.",
      tags: ["AI", "Automation"],
    },
  ],
  cta: {
    heading: "Want to discuss a project with similar goals?",
    body: "Let's talk about your business challenge.",
    label: "Contact Us",
    to: "/contact",
  },
};

/* ==========================================================================
   BLOG / INSIGHTS PAGE
   ========================================================================== */

export const insightsPage = {
  seoTitle: "Insights & Blog | Software, Cloud, AI, Analytics and Development Ideas | Theerrv Technologies",
  seoDescription:
    "Practical articles on software engineering, cloud modernization, product development, analytics, AI and automation — ideas to help teams make better technology decisions.",
  hero: {
    eyebrow: "Insights",
    headline: ["Ideas worth", "writing down."],
    lead: "Ideas, perspectives, and practical knowledge on software engineering, cloud modernization, product development, analytics, AI, automation, and digital transformation — content that helps teams think strategically and make better technology decisions.",
  },
  featuredIntro:
    "Explore articles on building scalable applications, improving software performance, modernizing legacy systems, adopting cloud technologies, and using AI in practical business scenarios.",
  cta: {
    heading: "Looking for expert guidance on a technology topic?",
    body: "Reach out to our team for a conversation.",
    label: "Get in Touch",
    to: "/contact",
  },
};

/* ==========================================================================
   CAREERS PAGE
   ========================================================================== */

export const careersPage = {
  seoTitle: "Careers | Join Theerrv Technologies",
  seoDescription:
    "Join Theerrv Technologies — a learning-focused software startup hiring across development, frontend, backend engineering, cloud & DevOps, and QA.",
  hero: {
    eyebrow: "Careers",
    headline: ["Careers at", "Theerrv."],
    lead: "Great technology is built by passionate people working together with purpose. We are creating a culture centered on collaboration, learning, innovation, and professional growth — and we welcome individuals committed to building, learning, and growing with us.",
  },
  why: {
    eyebrow: "Why Work With Us",
    heading: "A Culture Built on Growth and Collaboration",
    body: "We value curiosity, ownership, professionalism, and teamwork. Team members contribute to meaningful projects, explore modern technologies, and grow in a supportive environment.",
    expect: [
      "Exposure to modern software and web technologies",
      "Opportunities to work on real business challenges",
      "A culture of collaboration and continuous improvement",
      "A learning-focused work environment",
      "Career development through practical experience",
    ],
  },
  openRoles: {
    eyebrow: "Open Opportunities",
    heading: "Areas We're Hiring For",
    roles: [
      "Software Development",
      "Web Design & Frontend Development",
      "Backend Engineering",
      "Cloud & DevOps",
      "QA & Testing",
      "Business and Operations Support",
    ],
  },
  cta: {
    heading: "Interested in joining our journey?",
    body: "Send us your profile and tell us how you can contribute.",
    label: "Apply Now",
    to: "/contact",
  },
};

/* ==========================================================================
   CONTACT PAGE
   ========================================================================== */

export const contactPage = {
  seoTitle: "Contact Theerrv Technologies | Get in Touch",
  seoDescription:
    "Tell us about your project — new software, modernization, cloud, analytics, or AI. Based in Vellore, Tamil Nadu; an engineer replies within a business day.",
  hero: {
    eyebrow: "Contact",
    headline: ["Tell us what", "you're building."],
    lead: "Whether you're planning a new product, modernizing an existing application, improving your digital presence, or exploring AI and automation, we're here to help. Tell us about your goals and our team will get back to you.",
  },
  reachOut: {
    eyebrow: "Let's Start the Conversation",
    heading: "Reach out to us for",
    items: [
      "New software development projects",
      "Website and web application requirements",
      "Application modernization initiatives",
      "Cloud and DevOps support",
      "Analytics, reporting, and automation solutions",
      "AI integration opportunities",
    ],
  },
  form: {
    heading: "Send Us a Message",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "company", label: "Company Name", type: "text", required: false },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: false },
      { name: "service", label: "Service Required", type: "text", required: false },
      { name: "details", label: "Project Details", type: "textarea", required: true },
    ],
    submit: "Send Message",
  },
  /* Folded in from the retired /locations page — the footer's "Locations"
     link now points at #location on this page. */
  location: {
    eyebrow: "Where to find us",
    heading: ["Vellore,", "and wherever you are."],
    lead: "We serve businesses with responsive communication, professional collaboration, and dependable technology services — from our base in Tamil Nadu to teams anywhere.",
    address: ["Theerrv Technologies LLP", "Vellore, Tamil Nadu", "India 632001"],
    email: "info@theerrv.com",
    phone: "+91 63693 72124",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vellore%2C+Tamil+Nadu+632001",
    mapEmbedUrl: "https://www.google.com/maps?q=Vellore%2C+Tamil+Nadu+632001&z=12&output=embed",
    mapLabel: "Open in Google Maps",
    blocks: [
      {
        index: "01",
        title: "Headquarters",
        description:
          "Our main business base in Vellore, Tamil Nadu, supporting clients with structured planning and coordinated delivery.",
      },
      {
        index: "02",
        title: "Service Availability",
        description:
          "We support clients through flexible collaboration models — remote engagement, online consultations, and project-based delivery across locations.",
      },
      {
        index: "03",
        title: "How We Work",
        description:
          "Our team collaborates through digital communication, structured planning, and transparent project coordination, supporting businesses regardless of location.",
      },
    ],
  },
  cta: {
    heading: "Ready to build something valuable with the right technology partner?",
    body: "We'd be glad to hear from you.",
  },
  faqs: {
    eyebrow: "FAQ",
    heading: "Contact Questions",
    items: [
      {
        q: "How can I contact Theerrv Technologies?",
        a: "Through the contact form on our website or through the contact details provided on this page.",
      },
      {
        q: "What information should I include when contacting you?",
        a: "Your name, company name, contact details, the service you're interested in, and a brief description of your project or requirement.",
      },
      {
        q: "Can I contact you for a consultation?",
        a: "Yes. We welcome consultations for new software projects, website development, modernization, cloud solutions, automation, analytics, and AI opportunities.",
      },
      {
        q: "Do you work with startups and growing businesses?",
        a: "Yes. We work with startups, growing businesses, and organizations looking for dependable digital solutions and technology support.",
      },
      {
        q: "Can I reach out even if my project is still in the idea stage?",
        a: "Yes. If your project is still an idea, we can help you think through the requirements, possible approaches, and next steps.",
      },
      {
        q: "How quickly will your team respond?",
        a: "Response time may vary, but we aim to reply as promptly as possible to understand your inquiry and guide the next steps.",
      },
    ],
  },
};

/* ==========================================================================
   LOCATIONS PAGE
   ========================================================================== */

/* ==========================================================================
   ABOUT PAGE — six sections, each a camera station for the 3D logo scene.
   ========================================================================== */

export const aboutPage = {
  seoTitle: "About Theerrv Technologies | Building Digital Solutions for a Smarter Tomorrow",
  seoDescription:
    "Theerrv Technologies is a modern software studio founded by five engineers, building custom software, cloud, data and AI solutions for growing businesses from Tamil Nadu.",
  hero: {
    eyebrow: "About Us",
    headline: ["Building digital solutions", "for a smarter tomorrow."],
    lead: "Driven by vision, powered by innovation, and built on trust, Theerrv Technologies creates modern software, digital tools, and web experiences that help businesses grow in a digital-first world.",
  },
  about: {
    eyebrow: "About Us",
    heading: "Vision, brought to life.",
    paragraphs: [
      "At Theerrv Technologies, we believe every successful venture begins with a clear vision and the determination to bring it to life. Founded in July 2026, our company was created to deliver innovative and dependable digital solutions that support business growth in an increasingly technology-driven world.",
      "As a modern startup focused on software engineering, tool development, and web design, we are committed to building solutions that are functional, scalable, and future-ready. Our approach combines creativity, precision, and a strong understanding of evolving business needs to create meaningful digital experiences.",
      "What defines us is not only what we build, but also how we build it — with collaboration, professionalism, and a commitment to quality. At Theerrv Technologies, we aim to create lasting value for businesses through thoughtful solutions that drive progress and support long-term success.",
    ],
  },
  missionVision: {
    eyebrow: "Mission & Vision",
    items: [
      {
        label: "Our Mission",
        body: "To deliver innovative, reliable, and impactful digital solutions that help businesses grow, adapt, and succeed in a rapidly changing world.",
      },
      {
        label: "Our Vision",
        body: "To become a trusted technology partner known for excellence, innovation, and integrity, building digital solutions that contribute to a smarter and more connected future.",
      },
    ],
  },
  why: {
    eyebrow: "Why Choose Us",
    heading: "Why Theerrv Technologies",
    points: [
      { index: "01", title: "Modern Approach", body: "We build with a forward-thinking mindset, creating solutions that are relevant, scalable, and aligned with future needs." },
      { index: "02", title: "Quality First", body: "We maintain high standards across every stage of our work, from concept to delivery." },
      { index: "03", title: "Business-Focused Solutions", body: "We design and develop with purpose, ensuring our solutions support real business goals and long-term growth." },
      { index: "04", title: "Innovation with Value", body: "We believe technology should do more than function — it should create meaningful impact." },
      { index: "05", title: "Trusted Collaboration", body: "We value strong relationships, transparent communication, and a collaborative approach to every project." },
    ],
  },
  story: {
    eyebrow: "Our Story",
    heading: "Five friends, one vision.",
    paragraphs: [
      "Theerrv Technologies began with a shared dream among five school friends who always envisioned building something meaningful together. Over the years, that dream continued to grow, shaped by friendship, trust, and a common ambition to create a business with purpose.",
      "After completing our graduation in 2022, we moved into the next stage of our journey, gaining experience and preparing ourselves for the future we had long imagined. In July 2026, that vision became a reality with the launch of Theerrv Technologies.",
      "Today, our company stands as the result of that shared journey — a modern technology startup built on commitment, collaboration, and the belief that great ideas can become lasting impact when supported by the right vision and dedication.",
    ],
  },
  closing: {
    statement: "At Theerrv Technologies, we are committed to building digital solutions that empower businesses, inspire progress, and create long-term value.",
    tagline: ["Built on trust.", "Driven by innovation.", "Focused on the future."],
    cta: { label: "Start Your Project", to: "/contact" },
  },
};
