import styles from './style.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from '../Nav';
import useMediaQuery from '../../hooks/mediaQuery'



const menu = {
  open: {
    width: "480px",
    height: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
  }
}


export default function Header() {
// const Header = () => {
  const router = useRouter()
  const [isActive, setIsActive] = useState(false)
  const isMobile = useMediaQuery('(max-width: 799px)');
  const isDesktop = useMediaQuery('(min-width: 800px)');

  return (
    <div className={styles.header}>
      {isDesktop && 
      <div className={styles.headerItems}>
      <div className={styles.logo}>
        {/* <Link href="/">Tomcatbuzz</Link> */}
        <button type="button" onClick={() => router.push('/')}>
          Tomcatbuzz
        </button>
      </div>
        <div
          className={`${router.pathname == "/" ? styles.active : ""} ${
            styles.headerItem} ${styles.hover}`}
        >
          <Link href="/">Home</Link>
        </div>
        <div
          className={`${router.pathname == "/about" ? styles.active : ""} ${
            styles.headerItem} ${styles.hover}`}
        >
          <Link href="/about">About</Link>
        </div>
        <div
          className={`${router.pathname == "/contact" ? styles.active : ""} ${
            styles.headerItem} ${styles.hover}`}
        >
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    }

      {isMobile && 
      <div className={styles.headerItem}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && <Nav />}
        </AnimatePresence>
      </motion.div>
      
      <Button
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
      />
      </div>
    }
    </div>
  );
}

// export default Header;