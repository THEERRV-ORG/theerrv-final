import { selectedWork } from "../../data/content";
import Reveal from "../shared/Reveal";
import ProjectGlyph from "./ProjectGlyph";
import styles from "./SelectedWork.module.css";

export default function SelectedWork() {
  return (
    <section id="work" className={styles.work} data-bg="#0a1630">
      <div className="container">
        <div className={styles.header}>
          <div>
            <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
              {selectedWork.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className={styles.heading}>
              {selectedWork.heading}
            </Reveal>
          </div>
          <Reveal as="p" delay={140} className={styles.note}>
            {selectedWork.note}
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {selectedWork.projects.map((project, i) => (
            <Reveal as="li" key={project.index} delay={i * 100} className={styles.card}>
              <div className={styles.iconTile}>
                <ProjectGlyph index={i} />
              </div>
              <span className={styles.index}>PROJECT {project.index}</span>
              <h3 className={styles.title}>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <ul className={styles.tags}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
