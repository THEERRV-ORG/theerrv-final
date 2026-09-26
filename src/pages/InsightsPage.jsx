import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { insightsPage } from "../data/content";
import { articles } from "../data/insights";
import styles from "./InsightsPage.module.css";

/**
 * Insights — a blog index modelled on the Vercel blog's structure, in Theerrv's
 * dark brand: category filter tabs, a "Featured" strip of large image-forward
 * cards, then a grid of posts with author bylines. Case studies live on their
 * own page, so this shows only blog posts (not tagged `category: Case Study`).
 * Covers use a post's `cover` image when present, otherwise a themed gradient.
 */

function Byline({ post }) {
  return (
    <span className={styles.byline}>
      <img className={styles.avatar} src="/logo-mark-ivory-sm.webp" alt="" aria-hidden="true" />
      <span className={styles.bylineText}>
        <span className={styles.author}>{post.author}</span>
        {(post.authorRole || post.dateLabel) && (
          <span className={styles.bylineMeta}>
            {post.authorRole || post.dateLabel}
          </span>
        )}
      </span>
    </span>
  );
}

// Themed gradient covers used when a post has no `cover` image. Assigned by
// index in JS (not CSS :nth-child) so each card is stable regardless of how the
// list is wrapped.
const TONES = [
  "linear-gradient(135deg, #1a2c4d, #0a1630)",
  "linear-gradient(135deg, #4a2f22, #1a1210)",
  "linear-gradient(135deg, #2a3a2c, #10201a)",
  "linear-gradient(135deg, #3a2540, #180f22)",
  "linear-gradient(135deg, #14324a, #06131f)",
  "linear-gradient(135deg, #402a2a, #1f1212)",
];

function Cover({ post, index = 0 }) {
  const backgroundImage = post.cover ? `url(${post.cover})` : TONES[index % TONES.length];
  return (
    <span className={styles.cover} style={{ backgroundImage }}>
      <span className={styles.chip}>{post.category}</span>
    </span>
  );
}

export default function InsightsPage() {
  usePageTitle(insightsPage.seoTitle, insightsPage.seoDescription);
  const { hero, featuredIntro, cta } = insightsPage;

  const posts = useMemo(
    () => articles.filter((a) => a.category !== "Case Study"),
    [],
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );

  const [tab, setTab] = useState("All");
  const isAll = tab === "All";

  const featured = posts.filter((p) => p.featured);
  const inGrid = isAll ? posts.filter((p) => !p.featured) : posts.filter((p) => p.category === tab);
  const showFeatured = isAll && featured.length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.lights} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content}>
        {/* Hero */}
        <section className={styles.hero} data-nav-hero>
          <div className="container">
            <div className={styles.heroInner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</Reveal>
              <Reveal as="h1" delay={60} className={styles.heroHead}>
                <span className={styles.headLine1}>{hero.headline[0]}</span>
                <span className={styles.headLine2}>{hero.headline[1]}</span>
              </Reveal>
              <Reveal as="p" delay={140} className={styles.lead}>{hero.lead}</Reveal>
            </div>
          </div>
        </section>

        {posts.length > 0 ? (
          <section className={styles.section}>
            <div className="container">
              {/* Filter tabs */}
              {categories.length > 2 && (
                <div className={styles.tabs} role="tablist" aria-label="Filter posts by topic">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={tab === c}
                      className={`${styles.tab} ${tab === c ? styles.tabOn : ""}`}
                      onClick={() => setTab(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Featured strip */}
              {showFeatured && (
                <>
                  <p className={styles.sectionLabel}>Featured</p>
                  <ul className={styles.featGrid}>
                    {featured.map((p, i) => (
                      <Reveal as="li" key={p.slug} delay={i * 70}>
                        <Link to={`/insights/${p.slug}`} className={`${styles.card} ${styles.featCard}`}>
                          <Cover post={p} index={i} />
                          <span className={styles.cardBody}>
                            <span className={styles.metaRow}>
                              <span>{p.dateLabel}</span>
                              <span className={styles.dot} aria-hidden="true" />
                              <span>{p.readTime}</span>
                            </span>
                            <span className={styles.featTitle}>{p.title}</span>
                            {p.excerpt && <span className={styles.excerpt}>{p.excerpt}</span>}
                            <Byline post={p} />
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </>
              )}

              {/* Posts grid */}
              <p className={styles.sectionLabel}>{isAll ? "Latest posts" : tab}</p>
              {inGrid.length > 0 ? (
                <ul className={styles.postGrid}>
                  {inGrid.map((p, i) => (
                    <Reveal as="li" key={p.slug} delay={(i % 3) * 70}>
                      <Link to={`/insights/${p.slug}`} className={styles.card}>
                        <Cover post={p} index={i} />
                        <span className={styles.cardBody}>
                          <span className={styles.metaRow}>
                            <span>{p.dateLabel}</span>
                            <span className={styles.dot} aria-hidden="true" />
                            <span>{p.readTime}</span>
                          </span>
                          <span className={styles.postTitle}>{p.title}</span>
                          <Byline post={p} />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <p className={styles.soon}>No posts in this topic yet.</p>
              )}
            </div>
          </section>
        ) : (
          <section className={styles.section}>
            <div className="container">
              <Reveal as="div" className={styles.featured}>
                <p className={styles.featuredIntro}>{featuredIntro}</p>
                <p className={styles.soon}>
                  Articles are on the way — check back soon, or reach out with a
                  topic you'd like us to cover.
                </p>
              </Reveal>
            </div>
          </section>
        )}

        <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
      </div>
    </div>
  );
}
