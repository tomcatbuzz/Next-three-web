import { cubicBezier } from "framer-motion"

export const expand = {
  initial: {
    top: 0,
  },

  enter: (i) => ({
    // top: "100vh",
    top: "100%",

    transition: {
      duration: 0.4,

      delay: 0.05 * i,

      ease: [0.215, 0.61, 0.355, 1],
    },

    transitionEnd: { height: "0", top: "0" },
  }),

  exit: (i) => ({
    // height: "100vh",
    height: "100%",

    transition: {
      duration: 0.4,

      delay: 0.05 * i,

      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const opacity = {
  initial: {
    opacity: 0.5,
  },

  enter: {
    opacity: 0,
  },

  exit: {
    opacity: 0.5,
  },
};