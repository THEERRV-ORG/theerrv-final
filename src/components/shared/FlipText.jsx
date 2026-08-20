import styles from "./FlipText.module.css";

/**
 * Text that flips upward word-by-word on hover, revealing a duplicate
 * beneath — a staggered reveal rather than a static label.
 */
export default function FlipText({ text, className = "" }) {
  const words = text.split(" ");

  return (
    <span className={`${styles.flipText} ${className}`.trim()}>
      {words.map((word, i) => (
        <span key={i}>
          <span className={styles.word} style={{ transitionDelay: `${i * 45}ms` }}>
            <span className={styles.layerTop}>{word}</span>
            <span className={styles.layerBottom} aria-hidden="true">
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
