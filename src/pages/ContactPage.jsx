import { useState } from "react";
import PageHero from "../components/page/PageHero";
import FAQ from "../components/page/FAQ";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { contactPage } from "../data/content";
import styles from "./ContactPage.module.css";

export default function ContactPage() {
  usePageTitle(contactPage.seoTitle);
  const { hero, reachOut, form, cta, faqs } = contactPage;
  const [sent, setSent] = useState(false);

  // No backend is wired up yet — acknowledge locally so the form is usable
  // without sending any personal data to an external service.
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} lead={hero.lead} />

      <section className={styles.section}>
        <div className={`${styles.grid} container`}>
          <div className={styles.aside}>
            <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
              {reachOut.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className={styles.heading}>
              {reachOut.heading}
            </Reveal>
            <ul className={styles.reachList}>
              {reachOut.items.map((item, i) => (
                <Reveal as="li" key={item} delay={120 + i * 40} className={styles.reachItem}>
                  <span className={styles.mark} aria-hidden="true" />
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal as="div" delay={100} className={styles.formCard}>
            <h2 className={styles.formHeading}>{form.heading}</h2>

            {sent ? (
              <div className={styles.thanks} role="status">
                <p className={styles.thanksTitle}>Thank you.</p>
                <p className={styles.thanksBody}>
                  Your message has been received. Our team will get back to you as promptly as possible.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                {form.fields.map((field) => (
                  <div
                    key={field.name}
                    className={`${styles.field} ${field.type === "textarea" ? styles.fieldFull : ""}`}
                  >
                    <label htmlFor={field.name} className={styles.label}>
                      {field.label}
                      {field.required && <span className={styles.req} aria-hidden="true"> *</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        required={field.required}
                        className={styles.input}
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        className={styles.input}
                      />
                    )}
                  </div>
                ))}
                <button type="submit" className={styles.submit}>
                  {form.submit} <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <FAQ eyebrow={faqs.eyebrow} heading={faqs.heading} items={faqs.items} />
      <CTABand heading={cta.heading} body={cta.body} label="Start Your Project" to="/contact" />
    </>
  );
}
