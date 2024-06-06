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
    <div className="loading-container">
      <motion.div
        className="letters-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.div
            className="letter-box"
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