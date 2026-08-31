import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import FAQ from "../components/page/FAQ";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { contactPage } from "../data/content";
import { db, firebaseReady } from "../lib/firebase";
import styles from "./ContactPage.module.css";

/**
 * Contact — on the same cinematic ground as about / solutions / insights: a
 * fixed lit backdrop, a full-height hero, then the conversation panel and form
 * side by side, and the location section (folded in from the retired
 * /locations page, anchored at #location for the footer link).
 */
export default function ContactPage() {
  usePageTitle(contactPage.seoTitle);
  const { hero, reachOut, form, location, cta, faqs } = contactPage;
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const sent = status === "sent";

  // Persist the submission to Firestore. Fields are uncontrolled — read them
  // straight off the form via their `name` attributes rather than mirroring
  // each into state.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const formEl = e.currentTarget;
    const data = Object.fromEntries(new FormData(formEl).entries());

    // Without config the write would throw an opaque error; fail loudly in dev
    // and tell the visitor to use the email link instead.
    if (!firebaseReady || !db) {
      console.error(
        "Firebase is not configured — set VITE_FIREBASE_* in .env.local (see .env.example).",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await addDoc(collection(db, "contactSubmissions"), {
        fullName: data.fullName ?? "",
        company: data.company ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        service: data.service ?? "",
        details: data.details ?? "",
        createdAt: serverTimestamp(),
      });
      formEl.reset();
      setStatus("sent");
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  };

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

        {/* Conversation + form */}
        <section className={styles.section}>
          <div className={`${styles.grid} container`}>
            <div className={styles.aside}>
              <Reveal as="p" className={`eyebrow ${styles.asideEyebrow}`}>
                {reachOut.eyebrow}
              </Reveal>
              <Reveal as="h2" delay={80} className={styles.heading}>
                {reachOut.heading}
              </Reveal>
              <ul className={styles.reachList}>
                {reachOut.items.map((item, i) => (
                  <Reveal as="li" key={item} delay={120 + i * 40} className={styles.reachItem}>
                    {item}
                  </Reveal>
                ))}
              </ul>

              <Reveal as="div" delay={200} className={styles.direct}>
                <a href={`mailto:${location.email}`} className={styles.directLink}>
                  {location.email}
                </a>
                <a href={`tel:${location.phone.replace(/\s/g, "")}`} className={styles.directLink}>
                  {location.phone}
                </a>
              </Reveal>
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
                  <button type="submit" className={styles.submit} disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : form.submit}{" "}
                    <span aria-hidden="true">→</span>
                  </button>

                  {status === "error" && (
                    <p className={styles.formError} role="alert">
                      Something went wrong sending your message. Please try again, or
                      email us directly at{" "}
                      <a href={`mailto:${location.email}`}>{location.email}</a>.
                    </p>
                  )}
                </form>
              )}
            </Reveal>
          </div>
        </section>

        {/* Location — the footer's "Locations" link lands here. */}
        <section id="location" className={styles.locationSection}>
          <div className="container">
            <div className={styles.locationHead}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{location.eyebrow}</Reveal>
              <Reveal as="h2" delay={60} className={styles.locationHeading}>
                <span className={styles.headLine1}>{location.heading[0]}</span>
                <span className={styles.headLine2}>{location.heading[1]}</span>
              </Reveal>
              <Reveal as="p" delay={120} className={styles.locationLead}>{location.lead}</Reveal>
            </div>

            <div className={styles.locationGrid}>
              <Reveal as="div" className={styles.addressCard}>
                <span className={styles.cardLabel}>Address</span>
                <address className={styles.address}>
                  {location.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <a
                  className={styles.mapLink}
                  href={location.mapUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {location.mapLabel} <span aria-hidden="true">→</span>
                </a>

                {/* Fills the remaining height so this card matches the column
                    of blocks beside it. */}
                <div className={styles.mapFrame}>
                  <iframe
                    className={styles.map}
                    src={location.mapEmbedUrl}
                    title="Theerrv Technologies location, Vellore, Tamil Nadu"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Reveal>

              <ul className={styles.blocks}>
                {location.blocks.map((b, i) => (
                  <Reveal as="li" key={b.index} delay={60 + i * 60} className={styles.block}>
                    <span className={styles.blockTitle}>{b.title}</span>
                    <span className={styles.blockText}>{b.description}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <FAQ eyebrow={faqs.eyebrow} heading={faqs.heading} items={faqs.items} />
        <CTABand heading={cta.heading} body={cta.body} label="Start Your Project" to="/contact" />
      </div>
    </div>
  );
}
