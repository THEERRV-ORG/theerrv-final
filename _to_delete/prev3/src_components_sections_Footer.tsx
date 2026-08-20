import { brand, footer } from "@/lib/content";
import { Logo } from "../Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ink footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo onInk />
          <p className="t-body-sm footer-blurb">{footer.blurb}</p>
          <p className="t-mono footer-tagline">{brand.tagline}</p>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="t-mono footer-col-title">{col.title}</h2>
            <ul className="footer-links">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container footer-base">
        <span className="t-body-sm">
          © {year} {brand.legalName}
        </span>
        <span className="t-body-sm">All rights reserved</span>
      </div>
    </footer>
  );
}
