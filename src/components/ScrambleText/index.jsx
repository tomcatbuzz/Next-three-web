import { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

function getRandomCharacter() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars[Math.floor(Math.random() * chars.length)];
}

export default function ShuffleAnimation({text}) {
  useEffect(() => {
    const items = document.querySelectorAll('.item');

    items.forEach((item) => {
      item.addEventListener('mouseenter', shuffleAnimation);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseenter', shuffleAnimation);
      });
    };
  }, []);

  function shuffleAnimation(event) {
    const target = event.currentTarget;

    if (target.dataset.animating) {
      return;
    }

    target.dataset.animating = true;

    const words = target.querySelectorAll('.word');
    const originalWords = Array.from(words).map((word) => word.textContent);

    let shuffles = 0;
    const maxShuffles = 10;
    const intervalDuration = 500 / maxShuffles;

    let animationInterval = setInterval(() => {
      if (shuffles >= maxShuffles) {
        clearInterval(animationInterval);
        words.forEach((word, index) => {
          word.textContent = originalWords[index];
        });

        delete target.dataset.animating;
      } else {
        words.forEach((word) => {
          const length = word.textContent.length;
          let shuffledText = '';
          for (let i = 0; i < length; i++) {
            shuffledText += getRandomCharacter();
          }
          word.textContent = shuffledText;
        });
        shuffles++;
      }
    }, intervalDuration);
  }

  return (
    <div>
      {/* Your HTML structure with class names */}
      {/* Ensure that elements with the class "item" and "word" exist */}
      {/* Replace 'div' with the appropriate HTML elements */}
      <motion.div className="item" whileHover={{ scale: 1.1 }}>
        <span className={styles.word}>{text}</span>
        {/* <span className="word">{text}</span> */}
        {/* Add more words as needed */}
      </motion.div>
      {/* Add more items as needed */}
    </div>
  );
}