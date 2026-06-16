import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import flexpayVisual from "../../../assets/work/flexpayapp.png";
import flexpromoterVisual from "../../../assets/work/flexpromoter.png";
import leerandVisual from "../../../assets/work/leerandwebsite.png";
import "./Work.css";

const projects = [
  {
    number: "01",
    name: "FlexPay App",
    category: "Mobile application",
    description: "A flexible savings experience built around everyday goals.",
    href: "https://play.google.com/store/apps/details?id=ke.co.flexpay.app&hl=en",
    image: flexpayVisual,
    className: "work-card--flexpay",
    frame: "phone",
  },
  {
    number: "02",
    name: "FlexPromoter",
    category: "Mobile application",
    description: "A focused toolkit for promoters managing customers and bookings.",
    href: "https://play.google.com/store/apps/details?id=com.flexpay.flexpromoter",
    image: flexpromoterVisual,
    className: "work-card--promoter",
    frame: "phone",
  },
  {
    number: "03",
    name: "Leerand Schools",
    category: "Website",
    description: "A confident digital home shaped around learning and school life.",
    href: "https://leerandschools.vercel.app/",
    image: leerandVisual,
    className: "work-card--leerand",
    frame: "browser",
  },
];

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.12 + index * 0.12, ease },
  }),
};

function ProjectCard({ project, index, parallaxY }) {
  return (
    <motion.a
      className={`work-card ${project.className}`}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="link"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease }}
      aria-label={`View ${project.name}`}
    >
      <div className={`work-card__visual work-card__visual--${project.frame}`}>
        <motion.img
          src={project.image}
          alt={`${project.name} interface`}
          loading="lazy"
          decoding="async"
          style={{ y: parallaxY }}
        />
        <span className="work-card__open" aria-hidden="true">
          ↗
        </span>
      </div>

      <div className="work-card__meta">
        <span>{project.number} / {project.category}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </motion.a>
  );
}

function Work() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const browserY = useTransform(scrollYProgress, [0, 1], [3, -3]);

  return (
    <section className="work" ref={sectionRef} aria-labelledby="work-title">
      <motion.div
        className="work__heading"
        initial={{ opacity: 0, x: -34 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease }}
      >
        <span>03/ Selected work</span>
        <h2 id="work-title">
          Built for
          <br />
          real use.
        </h2>
        <p>Some of the digital products shaped from interface to implementation.</p>
      </motion.div>

      <div className="work__projects">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            parallaxY={project.frame === "browser" ? browserY : phoneY}
            key={project.name}
          />
        ))}
      </div>

      <motion.div
        className="work__cta-wrap"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
      >
        <svg className="work__arrow work__arrow--one" viewBox="0 0 150 70" aria-hidden="true">
          <path d="M2 5 C45 5 58 62 132 50" />
          <path d="m120 40 13 10-14 7" />
        </svg>
        <svg className="work__arrow work__arrow--two" viewBox="0 0 130 80" aria-hidden="true">
          <path d="M4 76 C18 30 78 73 116 18" />
          <path d="m103 22 14-5-1 15" />
        </svg>
        <a className="work__cta" href="/work" data-cursor="link">
          More work
          <span aria-hidden="true">↗</span>
        </a>
      </motion.div>
    </section>
  );
}

export default Work;
