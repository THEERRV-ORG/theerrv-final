import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import {
  aboutPage,
  caseStudiesPage,
  contactPage,
  insightsPage,
  servicesPage,
  solutionsPage,
} from './src/data/content.js'

const SITE = 'https://www.theerrv.com'
const BRAND = 'Theerrv Technologies'

/** Reads the frontmatter fields the build needs from every article in src/content/insights. */
function readArticles() {
  const dir = resolve(__dirname, 'src/content/insights')
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(resolve(dir, f), 'utf8')
      const front = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw.trim())?.[1] ?? ''
      const meta = {}
      for (const line of front.split(/\r?\n/)) {
        const at = line.indexOf(':')
        if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim().replace(/^["']|["']$/g, '')
      }
      return {
        slug: f.replace(/\.md$/, ''),
        title: meta.title ?? f,
        description: meta.description || meta.excerpt || '',
        cover: meta.cover ?? '',
        date: meta.date ?? '',
      }
    })
}

/**
 * Every route with its own head: title and description mirror what the page sets at runtime
 * through usePageTitle, so crawlers that don't run JavaScript (WhatsApp, LinkedIn, Slack…)
 * see the same thing Google does.
 */
function routes() {
  const page = (path, p) => ({ path, title: p.seoTitle, description: p.seoDescription })
  return [
    page('/about', aboutPage),
    page('/services', servicesPage),
    page('/solutions', solutionsPage),
    page('/case-studies', caseStudiesPage),
    page('/insights', insightsPage),
    page('/contact', contactPage),
    ...servicesPage.showcase.items.map((s) => ({
      path: `/services/${s.slug}`,
      title: `${s.title} | ${BRAND}`,
      description: s.description,
    })),
    ...readArticles().map((a) => ({
      path: `/insights/${a.slug}`,
      title: `${a.title} | ${BRAND}`,
      description: a.description,
      image: a.cover ? `${SITE}${a.cover}` : null,
      type: 'article',
    })),
  ]
}

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Rewrites the homepage defaults in index.html's <head> for one route. */
function headFor(template, { path, title, description, image, type }) {
  const url = `${SITE}${path}`
  const setMeta = (html, attr, name, value) =>
    html.replace(
      new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`),
      `$1${escapeAttr(value)}$2`,
    )
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'name', 'twitter:title', title)
  if (description) {
    html = setMeta(html, 'name', 'description', description)
    html = setMeta(html, 'property', 'og:description', description)
    html = setMeta(html, 'name', 'twitter:description', description)
  }
  if (image) {
    html = setMeta(html, 'property', 'og:image', image)
    html = setMeta(html, 'name', 'twitter:image', image)
  }
  if (type) html = setMeta(html, 'property', 'og:type', type)
  return html
}

/**
 * After the build, writes dist/<route>/index.html for every route — the same app shell as
 * index.html, but with that page's title, description, canonical URL and share image.
 * vercel.json rewrites each route to its file, so link previews show the right page.
 */
function perRouteHtml() {
  return {
    name: 'per-route-html',
    closeBundle() {
      const template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf8')
      for (const route of routes()) {
        const file = resolve(__dirname, `dist${route.path}/index.html`)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, headFor(template, route))
      }
    },
  }
}

/**
 * Emits sitemap.xml from the real routes. Article URLs come from the markdown files, so a
 * new post appears on the next build. Only articles carry a <lastmod> — their publish date;
 * a build date on every page would tell search engines nothing.
 */
function sitemap() {
  const build = () => {
    const articles = readArticles()
    const urls = [
      { loc: '/', priority: '1.0' },
      { loc: '/about', priority: '0.8' },
      { loc: '/services', priority: '0.9' },
      { loc: '/solutions', priority: '0.9' },
      { loc: '/case-studies', priority: '0.8' },
      { loc: '/insights', priority: '0.7' },
      { loc: '/contact', priority: '0.8' },
      ...servicesPage.showcase.items.map((s) => ({ loc: `/services/${s.slug}`, priority: '0.7' })),
      ...articles.map((a) => ({
        loc: `/insights/${a.slug}`,
        priority: '0.6',
        lastmod: /^\d{4}-\d{2}-\d{2}$/.test(a.date) ? a.date : null,
      })),
    ]

    const body = urls
      .map(
        ({ loc, priority, lastmod }) =>
          `  <url>\n    <loc>${SITE}${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
      )
      .join('\n')

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  }

  return {
    name: 'generate-sitemap',
    // Write into the final build output so it ships to production.
    closeBundle() {
      writeFileSync(resolve(__dirname, 'dist/sitemap.xml'), build())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap(), perRouteHtml()],
  build: {
    // Minify CSS with lightningcss, not esbuild. esbuild's minifier collapses a
    // `backdrop-filter` + `-webkit-backdrop-filter` pair down to whichever was
    // declared last, dropping the other — and where the standard property was
    // dropped, current Chrome/Edge (which no longer accept the `-webkit-` alias)
    // lost the blur entirely in production while dev looked fine. lightningcss
    // does correct, browserslist-driven prefixing and keeps both.
    cssMinify: 'lightningcss',
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      // Explicit targets so lightningcss emits the right vendor prefixes.
      // Firefox needs unprefixed `backdrop-filter`; Safari ≤17 needs the
      // `-webkit-` one — including both makes lightningcss ship both, fixing the
      // production-only lost-blur bug. Versions are encoded major << 16.
      targets: {
        chrome: 90 << 16,
        edge: 90 << 16,
        firefox: 103 << 16,
        safari: 15 << 16,
      },
    },
  },
})
