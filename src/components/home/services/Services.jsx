import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "../story/useHorizontalScroll";
import "./Services.css";

const services = [
  "Mobile Development",
  "UI/UX Design",
  "Web Development",
  "API Integration",
  "DevOps & Deployment",
];

const skills = [
  { name: "Flutter", detail: "Dart", group: "mobile", position: "flutter" },
  { name: "Java", detail: "Android", group: "mobile", position: "java" },
  { name: "Microsoft Azure", detail: "Cloud", group: "cloud", position: "azure" },
  { name: "Firebase", detail: "Platform", group: "cloud", position: "firebase" },
  { name: "Docker", detail: "Containers", group: "devops", position: "docker" },
  { name: "CI/CD Pipelines", detail: "Delivery", group: "devops", position: "cicd" },
  { name: "PostgreSQL", detail: "Database", group: "data", position: "postgres" },
  {
    name: "Realtime Database",
    detail: "Firebase",
    group: "data",
    position: "realtime",
  },
  { name: "MVC", detail: "Architecture", group: "architecture", position: "mvc" },
  { name: "BLoC", detail: "State", group: "architecture", position: "bloc" },
  { name: "Provider", detail: "State", group: "architecture", position: "provider" },
  { name: "Riverpod", detail: "State", group: "architecture", position: "riverpod" },
  { name: "GetX", detail: "State", group: "architecture", position: "getx" },
];

const ease = [0.22, 1, 0.36, 1];

const skillReveal = {
  hidden: { opacity: 0, scale: 0.82, y: 24 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 + index * 0.055, ease },
  }),
};

function SkillItem({ skill, index, reduceMotion, constraintsRef, allowDrag }) {
  const drift = 4 + (index % 4) * 1.5;
  const duration = 5.5 + (index % 5) * 0.7;

  return (
    <motion.div
      className={`skill-item skill-item--${skill.position} skill-item--${skill.group}`}
      data-cursor={allowDrag ? "drag" : undefined}
      custom={index}
      variants={skillReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      drag={allowDrag}
      dragConstraints={constraintsRef}
      dragElastic={0.06}
      dragMomentum={false}
      whileDrag={{ scale: 1.06, zIndex: 8 }}
    >
      <motion.div
        className="skill-item__body"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -drift, 1, 0],
                rotate: [0, index % 2 ? 0.7 : -0.7, 0],
              }
        }
        transition={{
          duration,
          delay: index * 0.16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.07,
          rotate: 0,
          transition: { duration: 0.28, ease },
        }}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <strong>{skill.name}</strong>
        <small>{skill.detail}</small>
      </motion.div>
    </motion.div>
  );
}

function Services() {
  const reduceMotion = useReducedMotion();
  const compactLayout = useMediaQuery("(max-width: 900px)");
  const skillsRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 22 });
  const canvasX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const canvasY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);

  const moveCanvas = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetCanvas = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="services"
      aria-labelledby="services-title"
      onPointerMove={moveCanvas}
      onPointerLeave={resetCanvas}
    >
      <motion.div
        className="services__anchor"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.9, ease }}
      >
        <span>04/ Services + skills</span>
        <h2 id="services-title">
          Built across
          <br />
          the stack.
        </h2>
       
      </motion.div>

      <motion.div
        className="services__list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
        }}
        aria-label="Services offered"
      >
        <motion.h3
          variants={{
            hidden: { opacity: 0, x: -18 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
          }}
        >
          Services offered
        </motion.h3>
        {services.map((service, index) => (
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -18 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
            }}
            key={service}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {service}
          </motion.p>
        ))}
      </motion.div>

      <motion.div
        className="services__skills"
        ref={skillsRef}
        style={reduceMotion ? undefined : { x: canvasX, y: canvasY }}
        aria-label="Technical skills"
      >
        {skills.map((skill, index) => (
          <SkillItem
            skill={skill}
            index={index}
            reduceMotion={reduceMotion}
            constraintsRef={skillsRef}
            allowDrag={!compactLayout}
            key={skill.name}
          />
        ))}
      </motion.div>

      <p className="services__note">Engineering / design / delivery</p>
    </section>
  );
}

export default Services;
