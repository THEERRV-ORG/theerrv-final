import { Link } from "react-router-dom";
import { footer } from "../../data/content";
import styles from "./Footer.module.css";

/**
 * Footer, ported from theerrv-site: a rounded card floating on the page rather
 * than a full-bleed band, so it reads as a closing object. Brand column, link
 * columns, a contact column, and a base bar. Restyled onto a deep-indigo card
 * for the dark theme, with links held near-white since a footer is where people
 * go when they are actually looking for something.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className={styles.wrap}>
      <footer className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Theerrv Technologies, home">
              <img src="/logo-mark-ivory.png" alt="" aria-hidden="true" className={styles.logoMark} width="44" height="28" />
              <span className={styles.logoWord}>
                THEERR<span className={styles.logoV}>V</span>
              </span>
            </Link>

            <p className={styles.tagline}>
              {footer.tagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>

            <address className={styles.address}>
              {footer.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            {footer.closing && <p className={styles.closing}>{footer.closing}</p>}
            <p className={styles.signature}>{footer.signature}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className={styles.col}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul className={styles.links}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.col}>
            <h2 className={styles.colTitle}>Contact</h2>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${footer.email}`}>{footer.email}</a>
              </li>
              <li>
                <a href={`tel:${footer.phone.replace(/\s/g, "")}`}>{footer.phone}</a>
              </li>
            </ul>
            <ul className={`${styles.links} ${styles.social}`}>
              {footer.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.base}>
          <span>
            © {year} {footer.legalName} LLP. All rights reserved.
          </span>
          <a
            className={styles.whatsapp}
            href={footer.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Compact footer for small screens — shown in place of the full grid. */}
        <div className={styles.mini}>
          <Link to="/" className={styles.logo} aria-label="Theerrv Technologies, home">
            <img src="/logo-mark-ivory.png" alt="" aria-hidden="true" className={styles.logoMark} width="40" height="25" />
            <span className={styles.logoWord}>
              THEERR<span className={styles.logoV}>V</span>
            </span>
          </Link>

          <nav className={styles.miniLinks} aria-label="Footer">
            <Link to="/services">Services</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className={styles.miniContact}>
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
            <a href={`tel:${footer.phone.replace(/\s/g, "")}`}>{footer.phone}</a>
          </div>

          <ul className={styles.miniSocial}>
            {footer.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.miniLegal}>
            © {year} {footer.legalName} LLP.
          </p>
        </div>
      </footer>
    </div>
  );
}
