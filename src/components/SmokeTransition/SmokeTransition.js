import { useEffect, useRef } from 'react';
import { useSmoke } from './smoke';
import styles from './smoke.module.scss';

const SmokeTransition = ({ isEntering, isLeaving, onAnimationComplete }) => {
  const containerRef = useRef(null);
  const { enterAnimation, leaveAnimation } = useSmoke();

  useEffect(() => {
    if (!containerRef.current) return;
    if (isEntering) {
      enterAnimation(containerRef.current, onAnimationComplete);
    } else if (isLeaving) {
      leaveAnimation(containerRef.current, onAnimationComplete);
    }
  }, [isEntering, isLeaving, onAnimationComplete, enterAnimation, leaveAnimation]);

  return (
    <div ref={containerRef} className={styles.smokeTransitionCanvas} />
  );
};

export default SmokeTransition;