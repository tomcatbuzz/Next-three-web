import { motion } from 'framer-motion';
import styles from './style.module.scss';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const Logo = () => {
  const wrapperRef = useRef(null);
  const animationRef = useRef(gsap.timeline());

  // try "center" and "edges"
  useEffect(() => {
    let split;
    const init = () => {
      gsap.set(wrapperRef.current, { autoAlpha: 1 });
      split = new SplitText(wrapperRef.current.querySelector("h1"), {
        type: "chars",
      });
      animationRef.current.from(split.chars, {
        opacity: 0,
        // y: 50,
        x: 10,
        ease: "back(4)",
        stagger: { from: "start", each: 0.05 },
      });
      // GSDevTools.create({ animation: animationRef.current });
    };
    init();
    return () => {
      if (split) {
        split.revert();
      }
    };
  }, []);

  return (
    // <motion.div
    //   className={styles.logo}
    //   initial={{ width: "64px" }}
    //   whileHover={{ width: "300px" }}
    //   transition={{ type: "spring", stiffness: 300, damping: 20 }}
    // >
    <div className={styles.wrapper} ref={wrapperRef}>
      <h1 className={styles.name}>Anthony Buzzelli</h1>
    </div>
    // {/* </motion.div> */}
  )
};

export default Logo;