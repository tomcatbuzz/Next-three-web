import { motion, cubicBezier } from "framer-motion";
import { opacity } from "./Grid/anim";

const AnimatedTextCharacter = ({ text }) => {
  const letters = Array.from(text)

  // Container variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        ease: cubicBezier(0.190, 1.000, 0.220, 1.000),
        // staggerChildren: 0.03,
        // delayChildren: 0.04 * i
        staggerChildren: 0.08,
        delayChildren: 0.05 * i
      }
    }),
    exit: { opacity: 0 }
  }

  // Letter variants
  const child = {
    visible: {
      delay: 2,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ease: cubicBezier(0.190, 1.000, 0.220, 1.000)
        // type: "spring", 
        // damping: 12,
        // stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      // x: -20,
      x: 0,
      y: -100,
      transition: {
        ease: cubicBezier(0.190, 1.000, 0.220, 1.000)
        // type: "spring",
        // damping: 12,
        // stiffness: 100
      }
    }, 
    // exit: {
    //   opacity: 0,
    //   x: 0,
    //   y: 100,
    //   transition: {
    //     type: "inertia", 
    //     velocity: 500
    //   }
    // }
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", fontSize: "5em" }}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
      >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedTextCharacter