import { motion } from "framer-motion";
import benzVisual from "../../../assets/work/benzshop.png";
import flexpayVisual from "../../../assets/work/flexpayapp.png";
import flexpromoterVisual from "../../../assets/work/flexpromoter.png";
import leerandVisual from "../../../assets/work/leerandwebsite.png";
import Footer from "../../footer/Footer";
import "./WorkPage.css";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const projects = [
  {
    number: "01",
    name: "FlexPay App",
    type: "Mobile application",
    year: "Fintech",
    href: "https://play.google.com/store/apps/details?id=ke.co.flexpay.app&hl=en",
    image: flexpayVisual,
    frame: "phone",
    summary:
      "A flexible savings and payments experience built around everyday goals, purchase planning, and clear customer journeys.",
    role: "Mobile development, interface implementation, product flows",
    stack: ["Flutter", "Dart", "Firebase", "API Integration"],
  },
  {
    number: "02",
    name: "FlexPromoter",
    type: "Mobile application",
    year: "Operations",
    href: "https://play.google.com/store/apps/details?id=com.flexpay.flexpromoter",
    image: flexpromoterVisual,
    frame: "phone",
    summary:
      "A focused promoter toolkit for customer onboarding, bookings, follow-ups, and field team workflows.",
    role: "Mobile engineering, workflow design, data handling",
    stack: ["Flutter", "Dart", "State Management", "REST APIs"],
  },
  {
    number: "03",
    name: "Leerand Schools",
    type: "Website",
    year: "Education",
    href: "https://leerandschools.vercel.app/",
    image: leerandVisual,
    frame: "browser",
    summary:
      "A confident school website shaped around trust, learning culture, admissions, and clear parent-facing information.",
    role: "Web design, frontend build, responsive layout",
    stack: ["React", "CSS", "Responsive UI", "Deployment"],
  },
  {
    number: "04",
    name: "Benz By Greg",
    type: "Commerce website",
    year: "Retail",
    href: "https://benzbygreg.vercel.app/",
    image: benzVisual,
    frame: "browser",
    summary:
      "A stylish online storefront concept for browsing automotive-inspired products with a cleaner shopping feel.",
    role: "Creative direction, interface design, frontend build",
    stack: ["React", "Vite", "CSS Animation", "Vercel"],
  },
];

function WorkPage() {
  return (
    <main className="work-page">
      <section className="work-page__hero" aria-labelledby="work-page-title">
        <motion.span
          className="work-page__index"
          initial="hidden"
          animate="visible"
          variants={reveal}
        >
          Work
        </motion.span>
        <motion.h1
          id="work-page-title"
          initial="hidden"
          animate="visible"
          variants={reveal}
        >
          Works
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={reveal}>
          Some of the work I&apos;ve designed and built across fintech, mobile
          products, web experiences, and interface systems.
        </motion.p>
      </section>

      <section className="work-page__projects" aria-label="Project case studies">
        {projects.map((project) => (
          <motion.article
            className={`project-row project-row--${project.frame}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={reveal}
            key={project.name}
          >
            <div className="project-row__number">{project.number}</div>

            <a
              className="project-row__visual"
              href={project.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              aria-label={`Open ${project.name}`}
            >
              <img src={project.image} alt={`${project.name} project preview`} />
              <span aria-hidden="true">↗</span>
            </a>

            <div className="project-row__content">
              <div className="project-row__meta">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>{project.stack.join(" / ")}</dd>
                </div>
              </dl>
              <a
                className="project-row__link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
              >
                View project
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="project-row__tags" aria-label={`${project.name} technologies`}>
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </section>

      <Footer />
    </main>
  );
}

export default WorkPage;
