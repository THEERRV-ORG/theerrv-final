import { marked } from "marked";

/**
 * Insights article loader.
 *
 * Drop a `.md` file into `src/content/insights/` and it becomes a published
 * article automatically — the filename is the URL slug. No registration step,
 * no code change. Every file is read at build time by Vite's glob import, so
 * there is no runtime fetch and articles are fully static.
 *
 * Frontmatter (all optional except `title`):
 *
 *   ---
 *   title:       How we built X
 *   category:    Case Study
 *   client:      Acme Trust
 *   date:        2026-08-15
 *   readTime:    6 min read        # omit and it is estimated from word count
 *   featured:    true              # pins it to the top of the index
 *   excerpt:     One-line summary shown on the index card
 *   description: <meta name="description"> for search engines
 *   keywords:    comma, separated, keywords
 *   cover:       /insights/cover.jpg
 *   ---
 *
 * Body is ordinary markdown. Two conventions are given special treatment:
 *   - a list item beginning "✅" renders as a coral outcome check
 *   - "> quote" renders as the full-width accent pull quote
 */

const files = import.meta.glob("../content/insights/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const LIST_KEYS = new Set(["keywords"]);

/** Split `---` frontmatter off the top of a file and parse its key: value pairs. */
function parseFrontmatter(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim().replace(/^["']|["']$/g, "");
    if (!key) continue;
    if (LIST_KEYS.has(key)) meta[key] = value.split(",").map((v) => v.trim()).filter(Boolean);
    else if (value === "true" || value === "false") meta[key] = value === "true";
    else meta[key] = value;
  }
  return { meta, body: match[2] };
}

/** ~200 wpm, rounded up — close enough to be useful, never zero. */
function estimateReadTime(body) {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Tag the two authoring conventions so the stylesheet can style them. */
function decorate(html) {
  return html
    .replace(/<li>\s*(?:✅|✅)\s*/g, '<li class="check">')
    .replace(/<blockquote>/g, '<blockquote class="pull">');
}

export const articles = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title ?? slug,
      category: meta.category ?? "Article",
      client: meta.client ?? "",
      date: meta.date ?? "",
      dateLabel: formatDate(meta.date),
      readTime: meta.readTime ?? estimateReadTime(body),
      featured: meta.featured === true,
      excerpt: meta.excerpt ?? "",
      description: meta.description ?? meta.excerpt ?? "",
      keywords: meta.keywords ?? [],
      cover: meta.cover ?? "",
      html: decorate(marked.parse(body)),
      headings: [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim()),
    };
  })
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return String(b.date).localeCompare(String(a.date));
  });

export function getArticle(slug) {
  return articles.find((a) => a.slug === slug);
}

/** Everything except `slug`, newest first — used for "keep reading". */
export function relatedArticles(slug, limit = 2) {
  return articles.filter((a) => a.slug !== slug).slice(0, limit);
}
