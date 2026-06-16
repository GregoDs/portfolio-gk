export const ease = [0.76, 0, 0.24, 1];
export const softEase = [0.22, 1, 0.36, 1];

export const pageSequence = (reduceMotion) => ({
  hidden: {},
  visible: {
    transition: reduceMotion
      ? { duration: 0 }
      : { delayChildren: 2.25, staggerChildren: 0.09 },
  },
});

export const navContainer = (reduceMotion) => ({
  hidden: {},
  visible: {
    transition: reduceMotion
      ? { duration: 0 }
      : { delayChildren: 2.45, staggerChildren: 0.09 },
  },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: softEase } },
};

export const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: softEase },
  },
};

export const portraitReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)", scale: 1.04 },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    scale: 1,
    transition: { duration: 1.25, ease },
  },
};

export const loaderExit = {
  initial: { clipPath: "inset(0 0 0 0)" },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.85, ease },
  },
};

export const loaderLetter = {
  hidden: { opacity: 0, y: "75%", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: softEase },
  },
};
