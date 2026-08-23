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
    {
      label: "Services",
      to: "/services",
      mega: {
        eyebrow: "Services",
        title: ["Engineering", "solutions that", "drive real impact"],
        body: "End-to-end engineering across products, data, cloud and automation to help you build, scale and grow.",
        cta: { label: "Explore all services", to: "/services" },
        items: [
          { label: "Product Engineering", to: "/services", body: "Full-stack delivery on .NET and React, architecture to production." },
          { label: "Cloud Platforms", to: "/services", body: "Azure environments built for cost, resilience and scale." },
          { label: "Data & Analytics", to: "/services", body: "Pipelines that turn scattered operational data into something usable." },
          { label: "Automation", to: "/services", body: "Removing the manual steps between systems that eat a team's week." },
          { label: "AI Inside Products", to: "/services", body: "AI features embedded in business applications, not run as experiments." },
          { label: "DevOps & CI/CD", to: "/services", body: "Pipelines and monitoring that make releases routine rather than eventful." },
        ],
      },
    },
    {
      label: "Solutions",
      to: "/solutions",
      mega: {
        eyebrow: "Solutions",
        title: ["Outcomes, not", "a list of", "technologies"],
        body: "We start from the result the business needs, then choose the stack that gets there and stays maintainable.",
        cta: { label: "How we work", to: "/solutions" },
        items: [
          { label: "Business Automation", to: "/solutions", body: "Manual handoffs replaced by systems that talk to each other." },
          { label: "Analytics & Reporting", to: "/solutions", body: "Live visibility into how the operation is actually performing." },
          { label: "AI Solutions", to: "/solutions", body: "Intelligence where the rules run out, with a human still in the loop." },
          { label: "Enterprise Applications", to: "/solutions", body: "The internal platforms an operation runs on, built to be owned." },
        ],
      },
    },
    { label: "Case Studies", to: "/case-studies" },
    { label: "Insights", to: "/insights" },
    { label: "Careers", to: "/careers" },
  ],
  cta: { label: "Start Your Project", to: "/contact" },
};

export const footer = {
  brand: "THEERRV",
  legalName: "Theerrv Technologies",
  tagline: ["Custom software,", "engineered to hold."],
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
        { label: "Case Studies", to: "/case-studies" },
        { label: "Insights", to: "/insights" },
        { label: "Careers", to: "/careers" },
        { label: "Locations", to: "/locations" },
        { label: "Contact", to: "/contact" },
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "WhatsApp", href: "https://wa.me/916369372124" },
  ],
};

/* ==========================================================================
   HOME PAGE
   ========================================================================== */

export const hero = {
  eyebrow: "Theerrv Technologies — Dome for your Vision",
  headline: ["Build, Modernize", "and Scale."],
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
   SERVICES PAGE
   ========================================================================== */

export const servicesPage = {
  seoTitle: "Services | Custom Software, Cloud, AI, Web Design & DevOps | Theerrv Technologies",
  hero: {
    eyebrow: "Services",
    headline: ["Our", "Services."],
    lead: "A comprehensive range of software and technology services designed to help businesses build, improve, and scale their digital capabilities — built around practical outcomes and long-term value.",
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
