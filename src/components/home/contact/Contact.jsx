import { motion } from "framer-motion";
import "./Contact.css";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease },
  },
};

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <motion.div
        className="contact__inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
      >
        <motion.h2 id="contact-title" variants={reveal}>
          Lets have a chat...
        </motion.h2>

        <motion.div className="contact__actions" variants={reveal}>
          <button className="contact__action" type="button" data-cursor="link">
            Phone number
          </button>
          <a
            className="contact__action"
            href="mailto:gregorykago@gmail.com"
            data-cursor="link"
          >
            gregorykago@gmail.com
          </a>
          <a className="contact__action contact__action--back" href="#home" data-cursor="link">
            Back
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
