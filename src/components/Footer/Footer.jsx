import { footer } from "../../data/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="company" className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>{footer.brand}</p>
          <p className={styles.tagline}>{footer.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className={styles.links}>
            {footer.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copyright}>{footer.copyright}</p>
      </div>
    </footer>
  );
}
