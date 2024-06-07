import styles from './style.module.scss'
import React from 'react';
import { motion } from 'framer-motion';

const letters = "LOADING".split("");

const Loading = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      rotateX: 90,
      opacity: 0,
    },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className={styles.loadingContainer}>
      <motion.div
        className={styles.lettersContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.div
            className={styles.letterBox}
            key={index}
            variants={letterVariants}
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;