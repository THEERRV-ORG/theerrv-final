import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE = 'https://www.theerrv.com'

// The six service detail slugs — stable, defined in src/data/content.js.
const SERVICE_SLUGS = [
  'product-engineering',
  'modernization',
  'cloud-devops',
  'data-automation',
  'apis-integration',
  'ai-consulting',
]

/**
 * Emits a sitemap.xml at build time from the real routes. Static pages and the
 * service slugs are listed explicitly; article URLs are read from the markdown
 * files in src/content/insights, so a new post appears in the sitemap on the
 * next build with no manual edit.
 */
function sitemap() {
  const build = () => {
    const articleSlugs = readdirSync(resolve(__dirname, 'src/content/insights'))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))

    const urls = [
      { loc: '/', priority: '1.0' },
      { loc: '/about', priority: '0.8' },
      { loc: '/services', priority: '0.9' },
      { loc: '/solutions', priority: '0.9' },
      { loc: '/insights', priority: '0.7' },
      { loc: '/contact', priority: '0.8' },
      ...SERVICE_SLUGS.map((s) => ({ loc: `/services/${s}`, priority: '0.7' })),
      ...articleSlugs.map((s) => ({ loc: `/insights/${s}`, priority: '0.6' })),
    ]

    const today = new Date().toISOString().slice(0, 10)
    const body = urls
      .map(
        ({ loc, priority }) =>
          `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
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
  plugins: [react(), sitemap()],
})
