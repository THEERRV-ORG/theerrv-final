import { useEffect, useState } from "react";
import { nav } from "../../data/content";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.solid : ""}`}>
      <div className={`${styles.inner} container`}>
        <a href="#top" className={styles.brandLink}>
          <img src="/logo-mark-ivory.png" alt="" className={styles.logoMark} width="34" height="21" />
          <span className={styles.brand}>{nav.brand}</span>
        </a>

        <ul className={styles.links}>
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a href={nav.cta.href} className={styles.cta}>
          {nav.cta.label} <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}
