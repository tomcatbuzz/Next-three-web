import styles from './style.module.scss'
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { gsap } from "gsap";

const PreLoader = ({onComplete}) => {
  const digit1 = useRef(null);
  const digit2 = useRef(null);
  const digit3 = useRef(null);
  const progressBar = useRef(null);

  const digitControls1 = useAnimation();
  const digitControls2 = useAnimation();
  const digitControls3 = useAnimation();
  const progressBarControls = useAnimation();

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const animateDigits = async (digitRef, digitControls, duration, delay = 1) => {
      if (digitRef.current) {
        const numHeight = digitRef.current.firstChild.clientHeight;
        const totalDistance = (digitRef.current.childNodes.length - 1) * numHeight;

        await digitControls.start({
          y: -totalDistance,
          transition: { duration: duration, delay: delay, ease: "easeInOut" },
        });
      }
    };

    animateDigits(digit3, digitControls3, 5);
    animateDigits(digit2, digitControls2, 6);
    animateDigits(digit1, digitControls1, 2, 5);

    // Start at 30% width after a delay of 7 seconds
    progressBarControls.start({
      width: "30%",
      transition: { duration: 2, delay: 7, ease: "easeInOut" }
    });

    // Animate to 100% width and fade out
    progressBarControls.start({
      width: "100%",
      opacity: 0,
      transition: { duration: 2, delay: 8.5, ease: "easeOut" }
    })
    // .then(() => {
    //   // Hide the preloader after the animation is complete
    //   progressBarControls.set({
    //     display: "none"
    //   });
    // });

    setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
  }, [digitControls1, digitControls2, digitControls3, progressBarControls, onComplete]);

  return (
    <AnimatePresence>
    {isAnimating && (
    <motion.div className={styles.preLoader}>
      <p>Loading</p>
      <div className={styles.counter}>
        <motion.div className={styles.digit1} ref={digit1} animate={digitControls1}>
          <div className={styles.num}>0</div>
          <div className={`${styles.num} ${styles.offset}`}>1</div>
        </motion.div>
        <motion.div className={styles.digit2} ref={digit2} animate={digitControls2}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className={styles.num}>
              {i}
            </div>
          ))}
          <div className={styles.num}>0</div>
        </motion.div>
        <motion.div className={styles.digit3} ref={digit3} animate={digitControls3}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className={styles.num}>
              {i % 10}
            </div>
          ))}
          <div className={styles.num}>0</div>
        </motion.div>
        <div className={styles.digit4}>%</div>
      </div>
      <motion.div className={styles.progressBar} ref={progressBar} animate={progressBarControls} initial={{ width: "0%" }}></motion.div>
    </motion.div>
    )}
    </AnimatePresence>
  );
};

export default PreLoader;
