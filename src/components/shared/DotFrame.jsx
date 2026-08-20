import styles from "./DotFrame.module.css";

/**
 * A framed tag with corner registration marks — a small technical/engineering
 * accent (schematic annotation) rather than a plain pill.
 */
export default function DotFrame({ children, className = "" }) {
  return (
    <div className={`${styles.frame} ${className}`.trim()}>
      <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
      <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />

      <span className={styles.content}>{children}</span>
    </div>
  );
}
