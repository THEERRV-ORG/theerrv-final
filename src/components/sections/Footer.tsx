import { brand, footer } from "@/lib/content";
import { Logo } from "../Logo";

/**
 * Footer.
 *
 * A rounded card floating on the light page rather than a full-bleed band —
 * it reads as a closing object, and the inset lets the page breathe around it.
 * The gradient runs bright at the top centre into deep indigo at the bottom,
 * which lifts the brand column and lets the link grid recede slightly without
 * ever going dim.
 *
 * Link text is held near-white on purpose. A footer is where people go when
 * they are actually looking for something, so this is the one dense block on
 * the page that should not be styled as secondary.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="footer-wrap">
      <footer className="footer-card">
        <div className="footer-inner">
          <div className="footer-brand">
            <Logo mark onInk className="footer-logo" />

            <p className="footer-tagline">
              {footer.tagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>

            <address className="footer-address">
              {footer.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <p className="footer-signature t-mono">{footer.signature}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="footer-col">
              <h2 className="footer-col-title">{col.title}</h2>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-col">
            <h2 className="footer-col-title">Contact</h2>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${footer.email}`}>{footer.email}</a>
              </li>
              <li>
                <a href={`tel:${footer.phone.replace(/\s/g, "")}`}>{footer.phone}</a>
              </li>
            </ul>
            <ul className="footer-links footer-social">
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

        <div className="footer-base">
          <span>
            © {year} {brand.legalName} LLP. All rights reserved.
          </span>
          <a
            className="footer-whatsapp"
            href={footer.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
          >
            Chat on WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
