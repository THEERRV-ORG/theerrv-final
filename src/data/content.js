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
  ],
  cta: { label: "Start Your Project", to: "/contact" },
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
        { label: "Custom Software", to: "/services" },
        { label: ".NET Development", to: "/services" },
        { label: "React Development", to: "/services" },
        { label: "API & Microservices", to: "/services" },
        { label: "Azure Cloud", to: "/services" },
        { label: "AI Solutions", to: "/services" },
        { label: "Data & Analytics", to: "/services" },
        { label: "DevOps & CI/CD", to: "/services" },
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
        { label: "Locations", to: "/locations" },
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

export const intro = {
  eyebrow: "Foundations",
  statement: ["Technology That", "Solves Problems", "and Creates Value."],
  body: "Businesses today need technology that is reliable, scalable, and aligned with real operational goals. We help organizations build new digital products, modernize existing systems, improve performance, automate manual processes, and unlock more value from data and AI — solutions that are technically strong, practical, and built for long-term success.",
};

export const capabilities = {
  eyebrow: "Core Services",
  heading: "Technology Services Designed Around Business Needs",
  items: [
    {
      index: "01",
      title: "Custom Software Development",
      description:
        "Tailored software that fits your business processes, improves operational efficiency, and supports future growth.",
    },
    {
      index: "02",
      title: "Web Design & Frontend",
      description:
        "Modern, responsive, user-focused web experiences that combine strong design with functionality and performance.",
    },
    {
      index: "03",
      title: "API & Backend Engineering",
      description:
        "Secure, scalable APIs and backend systems that support integrations, digital platforms, and business-critical workflows.",
    },
    {
      index: "04",
      title: "Azure Cloud Solutions",
      description:
        "Adopt and modernize with cloud technologies that improve flexibility, deployment efficiency, and scalability.",
    },
    {
      index: "05",
      title: "Application Modernization",
      description:
        "Upgrade legacy systems with a structured approach that improves maintainability, performance, and long-term value.",
    },
    {
      index: "06",
      title: "Data, Analytics & Reporting",
      description:
        "Transform business data into useful dashboards, reports, and insights that support better decision-making.",
    },
    {
      index: "07",
      title: "AI Solutions & Automation",
      description:
        "Integrate practical AI capabilities and workflow automation to improve efficiency and user experience.",
    },
    {
      index: "08",
      title: "DevOps & Performance",
      description:
        "Strengthen software delivery, improve release processes, and optimize system performance across your stack.",
    },
  ],
};

export const philosophy = {
  eyebrow: "Why Choose Theerrv",
  heading: ["A Modern Technology Partner", "for Growing Businesses."],
  lead: "We combine technical capability with a business-focused mindset. Every project is more than code — it is an investment in efficiency, customer experience, and future growth.",
  principles: [
    {
      index: "01",
      title: "End-to-End Ownership",
      description: "Full project ownership from planning through to deployment.",
    },
    {
      index: "02",
      title: "Modern Engineering",
      description: "Modern engineering practices and scalable architecture throughout.",
    },
    {
      index: "03",
      title: "Business-Aligned",
      description: "Digital solutions shaped around real operational goals.",
    },
    {
      index: "04",
      title: "Built to Last",
      description: "A focus on quality, maintainability, and long-term value.",
    },
    {
      index: "05",
      title: "Reliable Delivery",
      description: "A strong commitment to collaboration and dependable delivery.",
    },
  ],
};

export const technology = {
  eyebrow: "Specification",
  heading: "Engineered for What's Next.",
  stack: [
    { label: "Frontend", value: "React / Next.js" },
    { label: "Backend", value: "Node.js / Python / .NET" },
    { label: "Data", value: "SQL / Firebase" },
    { label: "Cloud", value: "Microsoft Azure" },
  ],
};

export const selectedWork = {
  eyebrow: "Business Solutions",
  heading: "Solutions That Create Real Impact",
  note: "We help businesses solve real operational and technology challenges through practical, outcome-focused solutions.",
  projects: [
    {
      index: "001",
      title: "Build a New Product",
      description: "Turn ideas into production-ready digital platforms.",
      tags: ["Product Engineering"],
    },
    {
      index: "002",
      title: "Modernize Applications",
      description: "Improve older systems without losing critical business value.",
      tags: ["Modernization"],
    },
    {
      index: "003",
      title: "Automate Workflows",
      description: "Reduce repetitive work and improve everyday productivity.",
      tags: ["Automation"],
    },
    {
      index: "004",
      title: "Improve Performance",
      description: "Identify bottlenecks and optimize for speed and stability.",
      tags: ["Optimization"],
    },
    {
      index: "005",
      title: "Add AI to Systems",
      description: "Introduce practical AI experiences and workflow intelligence.",
      tags: ["AI Integration"],
    },
  ],
};

export const finalCta = {
  title: ["Tell us the vision.", "We take the rest."],
  body: "We design, build, modernize and scale business software. Send one message and an engineer replies within a business day.",
  cta: { label: "Start a Conversation", to: "/contact" },
  secondary: { label: "See How We Work", to: "/solutions" },
  email: "info@theerrv.com",
};

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
      { id: "custom-software", index: "01", title: "Custom Software Development", outcome: "Software shaped around how your business actually works." },
      { id: "web-frontend", index: "02", title: "Web Design & Frontend Development", outcome: "Fast, accessible interfaces people genuinely enjoy using." },
      { id: "api-backend", index: "03", title: "API & Backend Engineering", outcome: "Secure services and integrations behind your platforms." },
      { id: "azure-cloud", index: "04", title: "Azure Cloud Solutions", outcome: "Azure environments built for scale, resilience and cost." },
      { id: "modernization", index: "05", title: "Application Modernization", outcome: "Legacy systems modernized without losing business value." },
      { id: "data-analytics", index: "06", title: "Data, Analytics & Reporting", outcome: "Operational data turned into decisions you can act on." },
      { id: "ai-automation", index: "07", title: "AI Solutions & Automation", outcome: "Practical AI and automation inside your products." },
      { id: "devops", index: "08", title: "DevOps & Performance Optimization", outcome: "Reliable delivery and performance, monitored at scale." },
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
  seoTitle: "Services | Custom Software, Cloud, AI, Web Design & DevOps | Theerrv Technologies",
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
        index: "01", icon: "software", tone: "ivory", slug: "custom-software",
        category: "Software Engineering", title: "Custom Software Development",
        description: "Web applications, enterprise systems, and internal tools built around your business and your users.",
        detail: {
          subtitle: "Software shaped around your operations, not the other way around.",
          stack: ["React", "TypeScript", ".NET / C#", "Node.js", "PostgreSQL", "REST & GraphQL", "Docker", "Azure"],
          overview: [
            "Off-the-shelf tools force your business to bend to their assumptions. We build custom software that fits your workflows, your data, and your goals — from the first planning session through architecture, development, testing, and long-term support.",
            "Every decision traces back to a real business outcome: less manual work, cleaner data, faster decisions, and a platform you own and can grow.",
          ],
          capabilities: [
            "Requirements discovery and technical planning",
            "System architecture and data modelling",
            "Full-stack development on modern, maintainable stacks",
            "Third-party and internal system integration",
            "Automated testing and QA",
            "Deployment, monitoring, and ongoing support",
          ],
          outcomes: [
            "A platform aligned to how your business actually works",
            "Reduced manual effort and fewer error-prone handoffs",
            "Architecture that scales instead of becoming tomorrow's problem",
            "Full ownership of the code and the roadmap",
          ],
        },
      },
      {
        index: "02", icon: "dotnet", tone: "coral", slug: "dotnet-development",
        category: "Enterprise Development", title: ".NET Development",
        description: "Scalable, secure, and maintainable applications using modern .NET technologies.",
        detail: {
          subtitle: "Reliable, scalable Microsoft-based development.",
          stack: [".NET / C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "xUnit", "Docker", "Azure"],
          overview: [
            "We build modern backend systems, enterprise applications, and business platforms on .NET — with a focus on maintainability, performance, and security that holds up as the system grows.",
            "From line-of-business applications to high-throughput services, we use the current .NET ecosystem and proven patterns so the codebase stays clean and easy to extend.",
          ],
          capabilities: [
            "ASP.NET Core web apps and Web APIs",
            "Enterprise application and business-platform development",
            "Entity Framework and SQL data layers",
            "Authentication, authorization, and security hardening",
            "Background processing and scheduled jobs",
            "Testing, CI, and maintainable architecture",
          ],
          outcomes: [
            "Secure, performant applications built to last",
            "A maintainable codebase that welcomes change",
            "Lower long-term cost of ownership",
            "A stack your team (or ours) can support with confidence",
          ],
        },
      },
      {
        index: "03", icon: "backend", tone: "violet", slug: "api-backend",
        category: "Backend Engineering", title: "API & Backend Engineering",
        description: "Robust APIs and microservices that power your products and integrations.",
        detail: {
          subtitle: "Secure integrations and strong application foundations.",
          stack: [".NET / Node.js", "REST", "GraphQL", "PostgreSQL", "Redis", "RabbitMQ / Service Bus", "OpenAPI"],
          overview: [
            "The reliability of your product depends on what sits behind it. We design and build APIs, business-logic layers, integrations, and backend services engineered for flexibility, performance, and future expansion.",
            "Whether it's a clean REST or GraphQL API for your frontend, or the connective tissue between systems that never spoke to each other, we build backends that stay stable under load.",
          ],
          capabilities: [
            "REST and GraphQL API design and development",
            "Business-logic and service-layer architecture",
            "Third-party integrations and webhooks",
            "Message queues and event-driven processing",
            "Authentication, rate limiting, and API security",
            "Documentation, versioning, and observability",
          ],
          outcomes: [
            "APIs your teams and partners can build on",
            "Systems that integrate instead of duplicating work",
            "Backends that stay reliable as traffic grows",
            "A foundation ready for the next product you ship",
          ],
        },
      },
      {
        index: "04", icon: "cloud", tone: "blue", slug: "azure-cloud",
        category: "Cloud & Infrastructure", title: "Azure Cloud Solutions",
        description: "Cloud architecture, migration, and managed services on Microsoft Azure.",
        detail: {
          subtitle: "Practical cloud services for modern business systems.",
          stack: ["Azure App Service", "Azure Functions", "Service Bus", "Blob Storage", "Azure SQL", "Bicep / Terraform", "Application Insights"],
          overview: [
            "We help businesses adopt and optimise Microsoft Azure for hosting, background processing, messaging, storage, and cloud-native delivery — with a focus on practical implementation and real operational value, not cloud for its own sake.",
            "From a first migration to a cost-tuned, resilient production environment, we design cloud setups that are secure, observable, and priced for what you actually use.",
          ],
          capabilities: [
            "Azure architecture and environment setup",
            "App Service, Functions, and container hosting",
            "Storage, databases, and messaging (Service Bus, Queues)",
            "Migration of existing applications to Azure",
            "Cost optimisation and right-sizing",
            "Monitoring, alerting, and resilience",
          ],
          outcomes: [
            "A cloud environment built for cost and resilience",
            "Smooth migration with minimal disruption",
            "Clear visibility into spend and performance",
            "Infrastructure that scales with demand",
          ],
        },
      },
      {
        index: "05", icon: "modernize", tone: "pink", slug: "application-modernization",
        category: "Modernization", title: "Application Modernization",
        description: "Modernize legacy systems for better performance, agility, and long-term scalability.",
        detail: {
          subtitle: "Upgrade legacy systems for better performance and flexibility.",
          stack: [".NET", "Docker", "Azure", "CI/CD", "SQL", "Automated testing"],
          overview: [
            "Legacy systems don't have to be rewritten from scratch to move forward. We modernise older applications through structured assessment, phased migration, and targeted technical improvements that reduce maintenance pain and prepare systems for growth.",
            "We protect the business logic that still works, retire what doesn't, and move you onto a foundation that's easier and cheaper to run.",
          ],
          capabilities: [
            "Legacy system assessment and modernisation roadmap",
            "Phased, low-risk migration planning",
            "Re-platforming and cloud readiness",
            "Codebase refactoring and dependency upgrades",
            "Data migration and integrity checks",
            "Performance and security improvements",
          ],
          outcomes: [
            "Lower maintenance cost and technical risk",
            "Better performance and security",
            "A system ready for cloud and future features",
            "Continuity — critical functionality preserved",
          ],
        },
      },
      {
        index: "06", icon: "data", tone: "gold", slug: "data-analytics",
        category: "Data & Intelligence", title: "Data, Analytics & Reporting",
        description: "Transform data into real-time insights that drive smarter business decisions.",
        detail: {
          subtitle: "Turn scattered operational data into decisions.",
          stack: ["SQL", "Power BI", "Python", "Azure Data Factory", "ETL pipelines", "Data warehousing"],
          overview: [
            "Most businesses already have the data they need — it's just trapped in disconnected systems and spreadsheets. We build the pipelines, dashboards, and reporting platforms that turn raw operational data into clear, real-time business intelligence.",
            "From KPI tracking to executive reporting, we help you see how the operation is actually performing and act on it with confidence.",
          ],
          capabilities: [
            "Data pipelines and integration across systems",
            "Dashboards and real-time reporting",
            "KPI tracking and executive reporting",
            "Data warehousing and modelling",
            "Automated, scheduled reports",
            "Data quality and validation",
          ],
          outcomes: [
            "One clear view of how the business is performing",
            "Faster, better-informed decisions",
            "Less time spent assembling reports by hand",
            "Trustworthy, consistent numbers",
          ],
        },
      },
      {
        index: "07", icon: "ai", tone: "violet", slug: "ai-automation",
        category: "AI & Automation", title: "AI Solutions & Automation",
        description: "Intelligent automation, machine learning, and AI solutions that create real impact.",
        detail: {
          subtitle: "Intelligence where the rules run out — with a human in the loop.",
          stack: ["Python", "LLM APIs", "scikit-learn / PyTorch", "Vector databases", ".NET / Node integration", "Workflow automation"],
          overview: [
            "AI should do more than demo well. We embed practical intelligence and automation into real business applications — useful, responsible, and with a human still in control where it matters.",
            "From automating repetitive workflows to adding machine learning where fixed rules fall short, we focus on the places where AI creates measurable value.",
          ],
          capabilities: [
            "Workflow and process automation",
            "AI features embedded in business applications",
            "Machine learning models for prediction and classification",
            "Document and data extraction",
            "LLM integration and assistants, with guardrails",
            "Human-in-the-loop review and oversight",
          ],
          outcomes: [
            "Repetitive work handled automatically",
            "Intelligence applied where rules can't reach",
            "Responsible AI you can actually trust in production",
            "Measurable time and cost savings",
          ],
        },
      },
      {
        index: "08", icon: "devops", tone: "ivory", slug: "devops",
        category: "Platform Engineering", title: "DevOps & Performance Optimization",
        description: "CI/CD, infrastructure automation, monitoring, and performance engineering at scale.",
        detail: {
          subtitle: "Make releases routine, not eventful.",
          stack: ["GitHub Actions", "Azure DevOps", "Docker", "Terraform / Bicep", "Kubernetes", "Grafana / App Insights"],
          overview: [
            "Shipping should be boring. We set up the pipelines, infrastructure automation, and monitoring that make releases routine and problems visible before your customers find them.",
            "From CI/CD and infrastructure-as-code to performance engineering, we help teams move faster with more confidence and fewer surprises.",
          ],
          capabilities: [
            "CI/CD pipeline design and automation",
            "Infrastructure as code",
            "Monitoring, logging, and alerting",
            "Performance profiling and optimisation",
            "Release and rollback strategy",
            "Security and reliability hardening",
          ],
          outcomes: [
            "Fast, repeatable, low-drama deployments",
            "Issues caught early through real observability",
            "Better performance under real-world load",
            "A platform your team can operate with confidence",
          ],
        },
      },
    ],
  },
  items: [
    {
      index: "01",
      title: "Custom Software Development",
      subtitle: "Tailored Software for Real Business Needs",
      description:
        "We develop custom software that aligns with your operations, workflows, and long-term goals. From planning and architecture to development and support, we create dependable applications that solve real problems and support growth.",
    },
    {
      index: "02",
      title: "Web Design & Frontend Development",
      subtitle: "Modern Digital Experiences That Strengthen Your Brand",
      description:
        "We create responsive, user-friendly websites and web applications with clear user journeys, strong visual appeal, and high usability — experiences that look professional and perform effectively across devices.",
    },
    {
      index: "03",
      title: ".NET Development",
      subtitle: "Reliable, Scalable Microsoft-Based Development",
      description:
        "We build modern backend systems, enterprise applications, and business platforms using .NET technologies, with a focus on maintainability, performance, security, and long-term scalability.",
    },
    {
      index: "04",
      title: "React Development",
      subtitle: "Interactive and High-Performance Frontend Applications",
      description:
        "We build modern frontend applications using React to deliver fast, responsive, engaging experiences — customer-facing platforms, portals, dashboards, and internal business tools.",
    },
    {
      index: "05",
      title: "API & Backend Engineering",
      subtitle: "Secure Integrations and Strong Application Foundations",
      description:
        "We design and build APIs, business logic layers, integrations, and backend services that support flexibility, performance, and future expansion — the systems behind your digital platforms.",
    },
    {
      index: "06",
      title: "Microservices & Distributed Systems",
      subtitle: "Scalable Architectures for Evolving Platforms",
      description:
        "For businesses that require modular, scalable, and resilient systems, we design microservices and distributed architectures that support growth, flexibility, and maintainability.",
    },
    {
      index: "07",
      title: "Azure Cloud Solutions",
      subtitle: "Practical Cloud Services for Modern Business Systems",
      description:
        "We help businesses adopt and optimize Microsoft Azure for hosting, background processing, messaging, storage, and cloud-native application delivery — focused on practical implementation and operational value.",
    },
    {
      index: "08",
      title: "Application Modernization",
      subtitle: "Upgrade Legacy Systems for Better Performance and Flexibility",
      description:
        "We modernize older applications through structured assessments, phased migration, and technical improvements that reduce maintenance challenges and prepare systems for future growth.",
    },
    {
      index: "09",
      title: "Data Engineering & Analytics",
      subtitle: "Turn Data into Visibility and Better Decisions",
      description:
        "We build ETL workflows, reporting systems, dashboards, and analytics solutions that help organizations understand performance, track KPIs, and make informed decisions based on reliable data.",
    },
    {
      index: "10",
      title: "DevOps & CI/CD",
      subtitle: "Improve Delivery Speed, Quality, and Reliability",
      description:
        "We implement modern DevOps practices, automated pipelines, and release workflows that help teams deploy more efficiently, reduce risk, and improve software quality.",
    },
    {
      index: "11",
      title: "Performance Optimization",
      subtitle: "Faster Applications, Better User Experience",
      description:
        "We analyze and improve software performance across databases, APIs, web applications, and infrastructure, helping businesses reduce bottlenecks and improve stability.",
    },
    {
      index: "12",
      title: "Security, Authentication & Authorization",
      subtitle: "Secure Access and Better Application Control",
      description:
        "We implement authentication, authorization, and role-based access approaches that strengthen application security and help ensure users access the right systems and data appropriately.",
    },
    {
      index: "13",
      title: "AI Solutions & Business Automation",
      subtitle: "Practical AI Integration for Modern Workflows",
      description:
        "We help businesses explore and implement AI capabilities that improve user experience, automate workflows, and add intelligent functionality to digital products and internal systems.",
    },
  ],
  cta: {
    heading: "Need a trusted technology partner for your next project?",
    body: "Let's discuss your requirements.",
    label: "Talk to Our Team",
    to: "/contact",
  },
  faqs: {
    eyebrow: "FAQ",
    heading: "Services Questions",
    items: [
      {
        q: "What software development services do you offer?",
        a: "Custom software development, .NET and React development, API and backend engineering, microservices, cloud solutions, application modernization, DevOps, data analytics, performance optimization, and AI integration.",
      },
      {
        q: "Do you develop custom web applications?",
        a: "Yes. We build custom web applications tailored to specific business needs, including portals, dashboards, internal systems, and customer-facing platforms.",
      },
      {
        q: "Can you modernize legacy applications?",
        a: "Yes. We help businesses modernize older applications through phased improvements, technology upgrades, cloud readiness, and architecture enhancements.",
      },
      {
        q: "Do you provide cloud services?",
        a: "Yes. We provide Azure cloud solutions, including hosting, serverless workflows, storage, messaging, and modernization support for cloud-based applications.",
      },
      {
        q: "What is included in your DevOps and CI/CD services?",
        a: "Automated pipelines, testing workflows, deployment processes, environment management, and release improvements that support faster, more reliable software delivery.",
      },
      {
        q: "Do you offer support for analytics and dashboards?",
        a: "Yes. We create data pipelines, dashboards, KPI reports, and analytics solutions that help businesses gain visibility and make better decisions.",
      },
    ],
  },
};

/* ==========================================================================
   SOLUTIONS PAGE
   ========================================================================== */

export const solutionsPage = {
  seoTitle: "Solutions | Business Automation, Analytics, AI & Enterprise Applications | Theerrv Technologies",
  hero: {
    eyebrow: "Solutions",
    headline: ["Business", "Solutions."],
    lead: "Our solutions are designed around business outcomes. We help companies improve efficiency, modernize operations, make better decisions, and create stronger digital foundations through focused technology.",
  },
  items: [
    {
      index: "01",
      title: "Business Automation",
      subtitle: "Reduce Manual Work and Improve Operational Efficiency",
      description:
        "We help businesses automate repetitive tasks, streamline workflows, connect systems, and reduce dependency on manual processes — improving productivity, lowering error rates, and creating more efficient day-to-day operations.",
    },
    {
      index: "02",
      title: "Analytics & Reporting",
      subtitle: "Make Better Decisions with Clear, Actionable Data",
      description:
        "We deliver dashboards, reporting platforms, and real-time insights that turn raw operational data into useful business intelligence. From KPI tracking to executive reporting, we help businesses gain clarity and confidence.",
    },
    {
      index: "03",
      title: "AI Solutions",
      subtitle: "Add Intelligence to Digital Products and Workflows",
      description:
        "Our AI solutions focus on practical use cases — natural-language interfaces, intelligent search, chatbot experiences, workflow support, and AI-assisted automation — adopted in a way that is useful, responsible, and aligned with business goals.",
    },
    {
      index: "04",
      title: "Enterprise Applications",
      subtitle: "Scalable Systems for Critical Business Operations",
      description:
        "We design and build business applications that support operational workflows, internal teams, customer interactions, and long-term digital transformation — secure, reliable, and ready for growth.",
    },
  ],
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
  hero: {
    eyebrow: "Insights",
    headline: ["Insights", "& Articles."],
    lead: "Ideas, perspectives, and practical knowledge on software engineering, cloud modernization, product development, analytics, AI, automation, and digital transformation — content that helps teams think strategically and make better technology decisions.",
  },
  categories: [
    "Software Engineering",
    "Web Development",
    "Cloud & Azure",
    "DevOps & CI/CD",
    "Application Modernization",
    "Data & Analytics",
    "AI & Automation",
    "Product Engineering",
  ],
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
  hero: {
    eyebrow: "Contact",
    headline: ["Contact", "Us."],
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

export const locationsPage = {
  seoTitle: "Locations | Theerrv Technologies",
  hero: {
    eyebrow: "Locations",
    headline: ["Our", "Locations."],
    lead: "We serve businesses with responsive communication, professional collaboration, and dependable technology services. This page helps clients understand where we operate and how we can work together effectively.",
  },
  blocks: [
    {
      index: "01",
      title: "Headquarters",
      description:
        "Our main business base, supporting clients with structured planning and coordinated delivery. (Add your primary business address here.)",
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
        "Our team collaborates efficiently through digital communication, structured planning, and transparent project coordination, supporting businesses regardless of location.",
    },
  ],
  cta: {
    heading: "Need to know if we can support your business from your region?",
    body: "Contact us and we'll be happy to discuss how we can work together.",
    label: "Talk to Us",
    to: "/contact",
  },
};

/* ==========================================================================
   ABOUT PAGE — six sections, each a camera station for the 3D logo scene.
   ========================================================================== */

export const aboutPage = {
  seoTitle: "About Theerrv Technologies | Building Digital Solutions for a Smarter Tomorrow",
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
