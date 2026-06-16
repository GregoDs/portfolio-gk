import { motion } from "framer-motion";
import bwPortrait from "../../../assets/profile/bw.jpg";
import colorPortrait from "../../../assets/profile/IMG_2241.jpg";
import widePortrait from "../../../assets/profile/cw.jpg";
import "./AboutPage.css";
import Footer from "../../footer/Footer";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const capabilityGroups = [
  {
    title: "Development",
    items: [
      "Mobile Development",
      "Frontend Engineering",
      "Backend Engineering",
      "API Integration",
      "Database Design",
      "Testing & QA",
    ],
  },
  {
    title: "Interface",
    items: [
      "UI/UX Design",
      "Micro-interaction",
      "Responsive Layouts",
      "Design Systems",
      "CSS Animation",
    ],
  },
  {
    title: "Technologies",
    items: [
      "Flutter",
      "React",
      "Firebase",
      "PostgreSQL",
      "Microsoft Azure",
      "Docker",
    ],
  },
  {
    title: "Others",
    items: [
      "Fintech Products",
      "Product Thinking",
      "CI/CD Pipelines",
      "Deployment",
      "Technical Architecture",
    ],
  },
];

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <motion.div
          className="about-hero__copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
          }}
        >
          <motion.span className="about-page__eyebrow" variants={reveal}>
            About
          </motion.span>
          <motion.h1 id="about-title" variants={reveal}>
            Gregory
            <br />
            Kago
          </motion.h1>
        </motion.div>

        <motion.div
          className="about-hero__bio"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.24 } },
          }}
        >
           <motion.p variants={reveal}>
            Hi There,
          </motion.p>
          <motion.p variants={reveal}>
            I&apos;m a software engineer working across mobile apps, web platforms,
            API integrations, and product interfaces for real business use.
          </motion.p>
          <motion.p variants={reveal}>
            A lot of my work sits around fintech: building experiences that make
            payments, savings, operations, and customer journeys feel simpler,
            faster, and more dependable.
          </motion.p>
          <motion.p variants={reveal}>
            I care about useful software, clear design, strong architecture, and
            products that can move from idea to launch without losing polish.
          </motion.p>
        </motion.div>

        <motion.div
          className="about-hero__photos"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.25, ease }}
          aria-label="Portraits of Gregory Kago"
        >
          <figure className="about-photo about-photo--bw">
            <img src={bwPortrait} alt="Black and white portrait of Gregory Kago" />
          </figure>
          <figure className="about-photo about-photo--color">
            <img src={colorPortrait} alt="Portrait of Gregory Kago" />
          </figure>
          <figure className="about-photo about-photo--wide">
            <img src={widePortrait} alt="Gregory Kago in front of a boxing photograph" />
          </figure>
        </motion.div>
      </section>

      <section className="about-capabilities" aria-labelledby="capabilities-title">
        <div className="about-capabilities__index">02/</div>

        <motion.div
          className="about-capabilities__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
        >
          <span className="about-page__eyebrow">Capabilities</span>
          <h2 id="capabilities-title">Capabilities</h2>
        </motion.div>

        <div className="about-capabilities__body">
          <motion.div
            className="about-capabilities__visual"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease }}
            aria-hidden="true"
          >
            <div className="rocket-scene">
              <span className="rocket-scene__orbit" />
              <span className="rocket-scene__trail rocket-scene__trail--one" />
              <span className="rocket-scene__trail rocket-scene__trail--two" />
              <span className="rocket">
                <i className="rocket__window" />
                <i className="rocket__fin rocket__fin--left" />
                <i className="rocket__fin rocket__fin--right" />
                <i className="rocket__flame" />
              </span>
            </div>
          </motion.div>

          <div className="about-capabilities__list">
            {capabilityGroups.map((group, index) => (
              <motion.article
                className="about-capability"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={reveal}
                key={group.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
     
      <Footer />
    </main>
    
  );
}

export default AboutPage;
