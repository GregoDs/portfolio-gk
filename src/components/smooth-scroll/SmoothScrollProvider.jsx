import Lenis from "lenis";
import { useEffect, useMemo, useRef } from "react";
import { SmoothScrollContext } from "./smoothScrollContext";

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.05,
      syncTouch: false,
      autoResize: true,
    });

    lenisRef.current = lenis;

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollTo: (target, options = {}) => {
        const lenis = lenisRef.current;
        const immediate = options.immediate ?? false;
        const offset = options.offset ?? 0;

        if (lenis) {
          lenis.scrollTo(target, {
            immediate,
            offset,
            duration: immediate ? 0 : 1.05,
            lock: Boolean(options.lock),
          });
          return;
        }

        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
          return;
        }

        target?.scrollIntoView?.({
          behavior: immediate ? "auto" : "smooth",
          block: options.block ?? "start",
        });
      },
    }),
    [],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
