import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Hero from "./hero/Hero";
import Services from "./services/Services";
import Story from "./story/Story";
import Work from "./work/Work";
import {
  useHorizontalScrollDistance,
  useMediaQuery,
} from "./story/useHorizontalScroll";
import "./Home.css";
import Footer from "../footer/Footer";

function Home() {
  const journeyRef = useRef(null);
  const trackRef = useRef(null);
  const distance = useHorizontalScrollDistance(trackRef);
  const stacksVertically = useMediaQuery(
    "(max-width: 900px), (prefers-reduced-motion: reduce)",
  );
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <div className="home">
      <section
        className="home-journey"
        ref={journeyRef}
        style={{ "--journey-distance": `${distance}px` }}
      >
        <span className="home-journey__about-anchor" id="about" />
        <span className="home-journey__work-anchor" id="work" />
        <span className="home-journey__services-anchor" id="services" />

        <div className="home-journey__sticky">
          <motion.div
            className="home-journey__track"
            ref={trackRef}
            style={{ x: stacksVertically ? 0 : x }}
          >
            <Hero />
            <Story />
            <Work />
            <Services />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
