import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { opacity } from './anim';
import styles from './style.module.scss';

const Digit = ({ value }) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {value}
    </motion.div>
  );
};

const Counter = () => {
  const [counter, setCounter] = useState(0)

  // const [digits, setDigits] = useState([0, 0, 0]);

  // useEffect(() => {
  //   const timeout1 = setTimeout(() => {
  //     setDigits([1, 0, 0]);
  //   }, 1000);

  //   const interval2 = setInterval(() => {
  //     setDigits((prevDigits) => {
  //       const [hundreds, tens, ones] = prevDigits;
  //       let newTens = tens - 1;
  //       let newOnes = ones - 1;
  //       if (newOnes < 0) newOnes = 9;
  //       if (newTens < 0) newTens = 9;
  //       return [hundreds, newTens, newOnes];
  //     });
  //   }, 100);

  //   const timeout2 = setTimeout(() => {
  //     clearInterval(interval2);
  //     setDigits([1, 0, 0]);
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timeout1);
  //     clearTimeout(timeout2);
  //     clearInterval(interval2);
  //   };
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < 100) {
        setCounter(counter + 1);
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust the interval duration as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [counter]);

  return (
    // <div style={{ display: 'flex', fontSize: '2rem' }}>
    //   {digits.map((digit, index) => (
    //     <Digit key={index} value={digit} />
    //   ))}
    // </div>

    <motion.div className={styles.counter} variants={opacity} initial="initial" animate="enter">{counter}%</motion.div>
  );
};

export default Counter;