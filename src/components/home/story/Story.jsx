import { motion } from "framer-motion";
import { reveal, revealGroup } from "./animations";
import "./Story.css";

const skills = [
  { name: "Design", accent: false },
  { name: "Frontend", accent: true },
  { name: "Backend", accent: false },
  { name: "Fullstack", accent: false },
];

function Story() {
  return (
    <section className="story" aria-labelledby="story-title">
      <motion.span
        className="story__index"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        02/
      </motion.span>

      <motion.div
        className="story__intro"
        variants={revealGroup}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
      >
        <motion.p className="story__eyebrow" variants={reveal}>
          About
        </motion.p>
        <motion.h2 id="story-title" variants={reveal}>
          I build thoughtful
          <br />
          digital products.
        </motion.h2>
        <motion.p className="story__summary" variants={reveal}>
          Software engineer and Flutter developer focused on clear interfaces
          and reliable systems.
        </motion.p>
      </motion.div>

      <motion.div
        className="story__skills"
        variants={revealGroup}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        aria-label="Skills"
      >
        {skills.map((skill) => (
          <motion.p
            className={skill.accent ? "story__skill story__skill--accent" : "story__skill"}
            variants={reveal}
            key={skill.name}
          >
            {skill.name}
          </motion.p>
        ))}
      </motion.div>

      <div className="story-rocket" aria-hidden="true">
        <span className="story-rocket__path" />
        <span className="story-rocket__trail story-rocket__trail--one" />
        <span className="story-rocket__trail story-rocket__trail--two" />
        <span className="story-rocket__body">
          <i className="story-rocket__window" />
          <i className="story-rocket__fin story-rocket__fin--left" />
          <i className="story-rocket__fin story-rocket__fin--right" />
          <i className="story-rocket__flame" />
        </span>
      </div>

      <motion.a
        className="story__cta"
        href="/about"
        data-cursor="link"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        More about me
        <span aria-hidden="true">↗</span>
      </motion.a>

      
     
    </section>
  );
}

export default Story;
