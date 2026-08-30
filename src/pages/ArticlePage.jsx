import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Reveal from "../components/shared/Reveal";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { getArticle, relatedArticles } from "../data/insights";
import styles from "./ArticlePage.module.css";

/**
 * One insights article — the cinematic editorial template. Every post rendered
 * here comes from a markdown file in src/content/insights, so the layout is
 * written once and every future article inherits it.
 */
export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  const barRef = useRef(null);
  const bodyRef = useRef(null);

  // Reading progress across the article body only — a bar that fills while the
  // hero is still on screen reads as broken.
  useEffect(() => {
    if (!article) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = bodyRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const start = el.offsetTop;
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? (window.scrollY - start) / total : 0;
      bar.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [article]);

  // Description meta for search engines, restored on unmount.
  useEffect(() => {
    if (!article?.description) return;
    let tag = document.querySelector('meta[name="description"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    const previous = tag.getAttribute("content");
    tag.setAttribute("content", article.description);
    return () => {
      if (created) tag.remove();
      else if (previous !== null) tag.setAttribute("content", previous);
    };
  }, [article]);

  usePageTitle(article ? `${article.title} | Theerrv Technologies` : undefined);

  if (!article) return <Navigate to="/insights" replace />;

  const related = relatedArticles(article.slug);

  return (
    <>
      <div className={styles.progressTrack} aria-hidden="true">
        <span ref={barRef} className={styles.progressBar} />
      </div>

      <Link to="/insights" className={styles.backSide}>
        <span className={styles.backArrow} aria-hidden="true">←</span>
        <span className={styles.backText}>All insights</span>
      </Link>

      <article>
        <header className={styles.hero} data-nav-hero>
          <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true" />
          <div className={`${styles.orb} ${styles.orbCoral}`} aria-hidden="true" />

          <div className={`${styles.heroInner} container`}>
            <Reveal as="p" className={styles.category}>{article.category}</Reveal>
            <Reveal as="h1" delay={60} className={styles.title}>{article.title}</Reveal>
            <Reveal as="div" delay={140} className={styles.meta}>
              {article.dateLabel && <span>{article.dateLabel}</span>}
              {article.dateLabel && <span className={styles.dot} aria-hidden="true" />}
              <span>{article.readTime}</span>
              {article.client && <span className={styles.dot} aria-hidden="true" />}
              {article.client && <span>{article.client}</span>}
            </Reveal>
          </div>
        </header>

        <div ref={bodyRef} className={styles.body}>
          <div className="container">
            <div className={styles.col}>
              {article.excerpt && <p className={styles.lede}>{article.excerpt}</p>}
              <div className={styles.rule} aria-hidden="true" />
              <div
                className={styles.prose}
                /* Content is authored by us in the repo, not user input. */
                dangerouslySetInnerHTML={{ __html: article.html }}
              />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className={styles.more}>
          <div className="container">
            <p className={styles.moreLabel}>Keep reading</p>
            <div className={styles.moreGrid}>
              {related.map((r) => (
                <Link key={r.slug} to={`/insights/${r.slug}`} className={styles.moreCard}>
                  <span className={styles.moreCat}>{r.category}</span>
                  <span className={styles.moreTitle}>{r.title}</span>
                  <span className={styles.moreMeta}>{r.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        heading="Have a project that deserves the same care?"
        body="Tell us what you're building or improving, and we'll map out a practical way forward."
        label="Start Your Project"
        to="/contact"
      />
    </>
  );
}
