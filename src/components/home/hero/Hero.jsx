import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import heroVisual from "../../../assets/profile/IMG_1603 2.jpg";
import "./Hero.css";

const introWords = ["THINK.", "BUILD.", "SHIP."];
let hasCompletedHeroIntro = false;

const roleTitles = [
  ["Software", "Engineer"],
  ["Flutter", "Engineer"],
  ["Mobile", "Developer"],
];

function FlipTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const title = roleTitles[titleIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTitleIndex((current) => (current + 1) % roleTitles.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <h1 className="hero__headline hero-reveal" aria-live="polite">
      {title.map((word, lineIndex) => (
        <span className="flip-title__line" key={lineIndex}>
          <span className="flip-title__shadow" aria-hidden="true">
            {word}
          </span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              className="flip-title__word"
              key={`${word}-${lineIndex}`}
              initial={{ rotateX: -88, y: "58%" }}
              animate={{ rotateX: 0, y: "0%" }}
              exit={{ rotateX: 88, y: "-58%" }}
              transition={{
                duration: 0.72,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <span>{word}</span>
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </h1>
  );
}

function Hero() {
  const [showIntro, setShowIntro] = useState(() => !hasCompletedHeroIntro);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);

  useEffect(() => {
    if (!showIntro) return undefined;

    document.body.classList.add("intro-active");
    const timer = window.setTimeout(() => {
      hasCompletedHeroIntro = true;
      setShowIntro(false);
    }, 3400);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("intro-active");
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro) document.body.classList.remove("intro-active");
  }, [showIntro]);

  const startDrag = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  const drag = (event) => {
    if (!dragState.current) return;
    setPosition({
      x: event.clientX - dragState.current.x,
      y: event.clientY - dragState.current.y,
    });
  };

  const stopDrag = () => {
    dragState.current = null;
  };

  return (
    <>
      {showIntro &&
        createPortal(
          <div className="hero-intro" aria-label="Software engineering portfolio">
            <div className="hero-intro__words">
              {introWords.map((word, index) => (
                <span key={word} style={{ "--word-index": index }}>
                  {word}
                </span>
              ))}
            </div>
            <div className="hero-intro__signature">
              <p>
                <span>with</span>
                Gregory
              </p>
              <i aria-hidden="true" />
            </div>
          </div>,
          document.body,
        )}

      <main className={`hero${showIntro ? " hero--entering" : ""}`} id="home">
        <div className="hero__location hero-reveal">
          <span>01/</span>
          <p>
            Nairobi, Kenya
            <br />
            
          </p>
        </div>

        <FlipTitle />

        <div
          className="hero__visual hero-reveal"
          data-cursor="drag"
          style={{ "--drag-x": `${position.x}px`, "--drag-y": `${position.y}px` }}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        >
          <img src={heroVisual} alt="Gregory Kago in front of a boxing photograph" />
        </div>

        <div className="hero__name hero-reveal">
          <h2>
            Gregory
            <br />
            Kago
          </h2>
          <p>© 2026 Portfolio</p>
        </div>

        <div className="hero__statement hero-reveal">
          <span aria-hidden="true">→</span>
          <p>
            I'm based in 
            <br></br>Nairobi,Kenya
            <br></br>Passionate in UI & Architecture.
          </p>
        </div>

        <p className="hero__credit hero-reveal">Ideas become interfaces ↘</p>
        <span className="hero__rule hero-reveal" aria-hidden="true" />
      </main>
    </>
  );
}

export default Hero;
