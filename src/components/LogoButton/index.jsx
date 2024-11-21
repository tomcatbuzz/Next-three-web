import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  const logoVariants = {
    initial: {width: "4rem", height: "4rem", borderRadius: "50%"}
  }
  const firstNameVariants = {
    initial: { width: 'auto' },
    hover: {
      width: 'auto',
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const lastNameVariants = {
    initial: { width: 'auto' },
    hover: {
      width: 'auto',
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, x: -5 },
    hover: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className={styles.logoWrap}>
      <motion.div
        className={styles.logo}
        // initial={{ width: "4rem", height: "4rem", borderRadius: "50%" }}
        initial="initial"
        variants={logoVariants}
        whileHover={{
          width: "16rem",
          borderRadius: "9999px",
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className={styles.logoInner}>
          <motion.div
            className={`${styles.logoName} ${styles.letterA}`}
            variants={firstNameVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            {/* <span style={{ opacity: 1 }}>A</span> */}
            <span className={styles.initialLetter}>A</span>
            <motion.span variants={letterVariants}>n</motion.span>
            <motion.span variants={letterVariants}>t</motion.span>
            <motion.span variants={letterVariants}>h</motion.span>
            <motion.span variants={letterVariants}>o</motion.span>
            <motion.span variants={letterVariants}>n</motion.span>
            <motion.span variants={letterVariants}>y</motion.span>
          </motion.div>

          <motion.div
            className={styles.logoName}
            variants={lastNameVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            {/* <span style={{ opacity: 1 }}>B</span> */}
            <span className={`${styles.initialLetter} ${styles.letterB}`}>B</span>
            <motion.span variants={letterVariants}>u</motion.span>
            <motion.span variants={letterVariants}>z</motion.span>
            <motion.span variants={letterVariants}>z</motion.span>
            <motion.span variants={letterVariants}>e</motion.span>
            <motion.span variants={letterVariants}>l</motion.span>
            <motion.span variants={letterVariants}>l</motion.span>
            <motion.span variants={letterVariants}>i</motion.span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;