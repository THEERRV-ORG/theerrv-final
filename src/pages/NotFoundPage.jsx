import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import styles from "./NotFoundPage.module.css";

/**
 * 404 — a standalone hero-only page (no navbar, CTA, or footer), rendered
 * outside the Layout so it is a pixel match for the static public/404.html that
 * Vercel serves on direct-loaded unknown URLs. Keep the two in sync.
 */
export default function NotFoundPage() {
  usePageTitle(
    "Page Not Found | Theerrv Technologies",
    "The page you're looking for doesn't exist or may have moved. Head back home to find what you need.",
  );

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Error 404</p>
        <h1 className={styles.headline}>
          <span className={styles.line}>Page</span>
          <span className={`${styles.line} ${styles.accent}`}>Not Found.</span>
        </h1>
        <p className={styles.lead}>
          The page you're looking for doesn't exist or may have moved. Let's get
          you back on track.
        </p>
        <Link to="/" className={styles.home}>
          Back to Home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
