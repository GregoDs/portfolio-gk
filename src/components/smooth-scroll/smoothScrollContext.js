import { createContext, useContext } from "react";

export const SmoothScrollContext = createContext({
  scrollTo: (target, options) => {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: options?.immediate ? "auto" : "smooth" });
      return;
    }

    target?.scrollIntoView?.({
      behavior: options?.immediate ? "auto" : "smooth",
      block: options?.block ?? "start",
    });
  },
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
