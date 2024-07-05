import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './style.module.scss'

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationState, setAnimationState] = useState('initial');

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState('digits'), 100);
    const timer2 = setTimeout(() => setAnimationState('progress30'), 7000);
    const timer3 = setTimeout(() => setAnimationState('progress100'), 9000);
    const timer4 = setTimeout(() => setIsVisible(false), 11000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const containerVariants = {
    visible: { opacity: 1, display: 'flex' },
    hidden: { opacity: 0, display: 'none', transition: { duration: 2.5 } },
  };

  const progressVariants = {
    initial: { width: 0 },
    progress30: { width: '30%', transition: { duration: 2 } },
    progress100: { width: '100%', opacity: 0, transition: { duration: 2 } },
  };

  return (
    <>
    <div className={styles.wrapper}>
    <motion.div 
      className={styles['pre-loader']}
      variants={containerVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
    >
      <p>Loading</p>
      <div className={styles.counter}>
        <Digit numbers={[0, 1]} duration={2} delay={5} animate={animationState === 'digits'} />
        <Digit numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} duration={6} animate={animationState === 'digits'} />
        <Digit numbers={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} duration={5} animate={animationState === 'digits'} />
        <div className={styles['digit-4']}>%</div>
      </div>
      <motion.div 
        className={styles['progress-bar']}
        variants={progressVariants}
        initial="initial"
        animate={animationState}
      />
    </motion.div>
    </div>
    </>
  );
};

const Digit = ({ numbers, duration, delay = 1, animate }) => {
  const totalDistance = -(numbers.length - 1) * 100;

  const digitVariants = {
    initial: { y: 0 },
    animate: {
      y: totalDistance,
      transition: { duration, delay, ease: 'easeInOut' }
    }
  };

  return (
    <motion.div 
      className={styles[`digit-${numbers.length <= 2 ? '1' : '2'}`]}
      variants={digitVariants}
      initial="initial"
      animate={animate ? "animate" : "initial"}
    >
      {numbers.map((num, index) => (
        <div key={index} className={`${styles.num} ${index === 1 ? styles.offset : ''}`}>
          {num}
        </div>
      ))}
    </motion.div>
  );
};

export default Preloader;