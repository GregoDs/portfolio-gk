import { motion, useTransform } from "framer-motion";
import "./ContactPull.css";

function ContactPull({ journeyProgress }) {
  const pullX = useTransform(journeyProgress, [0.76, 0.9, 1], ["-10vw", "0vw", "3vw"]);
  const fieldScale = useTransform(journeyProgress, [0.76, 0.9, 1], [0.9, 1.06, 1.02]);
  const pinkScale = useTransform(journeyProgress, [0.75, 0.84, 1], [0.24, 1.08, 1.16]);
  const amberScale = useTransform(journeyProgress, [0.81, 0.92, 1], [0.08, 0.98, 1.16]);
  const blackScale = useTransform(journeyProgress, [0.89, 1], [0.08, 1.12]);
  const pinkCurve = useTransform(journeyProgress, [0.75, 1], ["84%", "46%"]);
  const amberCurve = useTransform(journeyProgress, [0.81, 1], ["88%", "40%"]);
  const blackCurve = useTransform(journeyProgress, [0.89, 1], ["90%", "34%"]);

  return (
    <section className="contact-pull" aria-hidden="true">
      <motion.div className="contact-pull__field" style={{ x: pullX, scaleX: fieldScale }}>
        <motion.span
          className="contact-pull__layer contact-pull__layer--pink"
          style={{
            scaleX: pinkScale,
            borderTopLeftRadius: pinkCurve,
            borderBottomLeftRadius: pinkCurve,
          }}
        />
        <motion.span
          className="contact-pull__layer contact-pull__layer--amber"
          style={{
            scaleX: amberScale,
            borderTopLeftRadius: amberCurve,
            borderBottomLeftRadius: amberCurve,
          }}
        />
        <motion.span
          className="contact-pull__layer contact-pull__layer--black"
          style={{
            scaleX: blackScale,
            borderTopLeftRadius: blackCurve,
            borderBottomLeftRadius: blackCurve,
          }}
        />
      </motion.div>
      <span className="contact-pull__grain" />
    </section>
  );
}

export default ContactPull;
