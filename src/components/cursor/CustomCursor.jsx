import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const ringPosition = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const frame = useRef(null);
  const scrollTimer = useRef(null);
  const [mode, setMode] = useState("idle");

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;

    const animate = () => {
      ringPosition.current.x += (target.current.x - ringPosition.current.x) * 0.14;
      ringPosition.current.y += (target.current.y - ringPosition.current.y) * 0.14;
      ring.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0)`;
      dot.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      frame.current = window.requestAnimationFrame(animate);
    };

    const move = (event) => {
      target.current = { x: event.clientX, y: event.clientY };
      const interactive = event.target.closest("a, [data-cursor]");
      setMode(interactive?.dataset.cursor || (interactive ? "link" : "idle"));
    };

    const press = () => setMode("pressed");
    const release = (event) => {
      const interactive = event.target.closest("a, [data-cursor]");
      setMode(interactive?.dataset.cursor || (interactive ? "link" : "idle"));
    };
    const leave = () => setMode("hidden");
    const enter = () => setMode("idle");
    const scroll = () => {
      setMode("scrolling");
      window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(() => setMode("idle"), 350);
    };

    frame.current = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    window.addEventListener("wheel", scroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame.current);
      window.clearTimeout(scrollTimer.current);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      window.removeEventListener("wheel", scroll);
    };
  }, []);

  return (
    <div className={`cursor-layer cursor-layer--${mode}`} aria-hidden="true">
      <span className="cursor-ring" ref={ringRef} />
      <span className="cursor-dot" ref={dotRef} />
    </div>
  );
}

export default CustomCursor;
