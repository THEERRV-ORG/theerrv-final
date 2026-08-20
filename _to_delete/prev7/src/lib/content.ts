/**
 * Single source of truth for all site copy.
 *
 * Written to the design system's voice rules: confident, plain,
 * engineering-literate. Sentence case for headings and body. Outcomes lead,
 * the stack appears as supporting proof. Numerals stay numerals. No emoji, no
 * exclamation marks, no hype adjectives.
 */

export const brand = {
  name: "Theerrv",
  legalName: "Theerrv Technologies",
  tagline: "Dome for your vision.",
  positioning:
    "We design, build, modernize and scale business software — from product engineering and cloud platforms to data, automation and AI.",
} as const;

export const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "How we work", href: "#modern" },
  { label: "About", href: "#about" },
  { label: "Story", href: "#story" },
] as const;

/**
 * The hero is the tagline and nothing else — no eyebrow, no buttons. The
 * conversion path is the nav's persistent "Start a project" pill, which stays
 * visible at every scroll position and on every width.
 */
export const hero = {
  headline: ["Dome for", "your vision"],
  body: brand.positioning,
  scrollCue: "Scroll",
} as const;

/**
 * The six scroll stations inside the cinematic block.
 *
 * Station 0 is the hero itself. Stations 1–5 are the five differentiators from
 * the catalogue positioning — the structural equivalent of the reference site's
 * value carousel, driven by scroll rather than prev/next controls.
 */
export const stations = [
  {
    id: "modern",
    marker: "01",
    key: "Modern approach",
    title: "We build with a forward-thinking mindset",
    body: "Solutions that are relevant, scalable, and aligned with where the business is going — not only where it is today.",
  },
  {
    id: "quality",
    marker: "02",
    key: "Quality first",
    title: "The standard does not move",
    body: "High standards hold across every stage, from concept to delivery. Quality is a process we run, not an inspection at the end.",
  },
  {
    id: "purpose",
    marker: "03",
    key: "Business-focused",
    title: "We design and develop with purpose",
    body: "Every decision traces back to a real business goal. Technology that serves growth, rather than technology for its own sake.",
  },
  {
    id: "innovation",
    marker: "04",
    key: "Innovation with value",
    title: "Technology should do more than function",
    body: "Novelty on its own is not progress. We pursue the ideas that create meaningful, measurable impact for the people who use them.",
  },
  {
    id: "trust",
    marker: "05",
    key: "Trusted collaboration",
    title: "We take ownership, end to end",
    body: "One engineering partner across the stack reduces hand-off friction. Open about progress, honest about trade-offs, invested in the outcome.",
  },
] as const;

export const capabilities = {
  title: "One engineering partner across the stack",
  lede: "We own delivery from discovery and architecture through implementation, quality, deployment and ongoing improvement.",
  items: [
    {
      marker: "01",
      title: "Product engineering",
      body: "Full-stack delivery on .NET and React — from first architecture to a product in production.",
    },
    {
      marker: "02",
      title: "Cloud platforms",
      body: "Azure environments built for cost, resilience and scale, with infrastructure defined as code.",
    },
    {
      marker: "03",
      title: "Data and ETL",
      body: "SQL Server and pipeline work that turns scattered operational data into something the business can act on.",
    },
    {
      marker: "04",
      title: "Automation",
      body: "Removing the manual steps between systems so teams spend their time on work that needs judgement.",
    },
    {
      marker: "05",
      title: "AI inside products",
      body: "AI features around existing business applications, instead of treating AI as a standalone experiment.",
      accent: true,
    },
    {
      marker: "06",
      title: "DevOps and observability",
      body: "Pipelines, monitoring and security practice that make releases routine rather than eventful.",
    },
  ],
} as const;

export const about = {
  title: "Every venture begins with a clear vision",
  paragraphs: [
    "At Theerrv Technologies we believe every successful venture begins with a clear vision and the determination to bring it to life. Founded in July 2026, the company was created to deliver innovative and dependable digital solutions that support business growth in an increasingly technology-driven world.",
    "As a modern startup focused on software engineering, tool development and web design, we build solutions that are functional, scalable and future-ready. Our approach combines creativity, precision and a strong understanding of evolving business needs.",
    "What defines us is not only what we build, but how we build it — with collaboration, professionalism and a commitment to quality.",
  ],
} as const;

export const missionVision = {
  items: [
    {
      marker: "Mission",
      body: "To deliver innovative, reliable and impactful digital solutions that help businesses grow, adapt and succeed in a rapidly changing world.",
    },
    {
      marker: "Vision",
      body: "To become a trusted technology partner known for excellence, innovation and integrity, building digital solutions that contribute to a smarter and more connected future.",
    },
  ],
} as const;

export const story = {
  title: "Five friends, one long-held idea",
  paragraphs: [
    "Theerrv Technologies began with a shared dream among five school friends who always envisioned building something meaningful together. Over the years that dream continued to grow, shaped by friendship, trust, and a common ambition to create a business with purpose.",
    "After completing our graduation in 2022, we moved into the next stage of the journey — gaining experience and preparing for the future we had long imagined.",
    "In July 2026 that vision became a reality with the launch of Theerrv Technologies. Today the company stands as the result of that shared journey: a modern technology startup built on commitment, collaboration, and the belief that great ideas become lasting impact when supported by the right vision and dedication.",
  ],
  markers: [
    { year: "2022", label: "Graduated, and began building experience" },
    { year: "2026", label: "Theerrv Technologies launches" },
  ],
} as const;

export const closing = {
  title: ["Tell us the vision.", "We take the rest."],
  body: "We are committed to building digital solutions that empower businesses, inspire progress and create long-term value.",
  // Matches the footer. The placeholder hello@ address I had used earlier was
  // invented; this is the real one from the brand's own footer.
  cta: { label: "Start a conversation", href: "mailto:info@theerrv.com" },
  secondary: { label: "info@theerrv.com", href: "mailto:info@theerrv.com" },
} as const;

/**
 * Footer.
 *
 * NOTE ON HREFS: entries marked `pending` have no page behind them yet and
 * point at "#". They are listed because the footer is where a visitor looks for
 * them, but every one needs a real route before launch — a nav link that goes
 * nowhere is worse than an absent one.
 */
export const footer = {
  tagline: ["Custom software,", "engineered to hold."],
  address: ["Theerrv Technologies LLP", "Vellore, Tamil Nadu", "India 632001"],
  signature: "Dome for your vision",
  email: "info@theerrv.com",
  phone: "+91 63693 72124",
  /** Derived from the number above. */
  whatsapp: "https://wa.me/916369372124",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Custom Software", href: "#capabilities" },
        { label: ".NET Development", href: "#capabilities" },
        { label: "React Development", href: "#capabilities" },
        { label: "API & Microservices", href: "#capabilities" },
        { label: "Azure Cloud", href: "#capabilities" },
        { label: "AI Solutions", href: "#capabilities" },
        { label: "Data & Analytics", href: "#capabilities" },
        { label: "DevOps & CI/CD", href: "#capabilities" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Business Automation", href: "#capabilities" },
        { label: "Analytics", href: "#capabilities" },
        { label: "AI", href: "#capabilities" },
        { label: "Enterprise Applications", href: "#capabilities" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Case Studies", href: "#", pending: true },
        { label: "Insights", href: "#", pending: true },
        { label: "Careers", href: "#", pending: true },
        { label: "Locations", href: "#", pending: true },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#", pending: true },
        { label: "Terms", href: "#", pending: true },
      ],
    },
  ],
  social: [
    { label: "LinkedIn", href: "#", pending: true },
    { label: "Instagram", href: "#", pending: true },
    { label: "WhatsApp", href: "https://wa.me/916369372124" },
  ],
} as const;
