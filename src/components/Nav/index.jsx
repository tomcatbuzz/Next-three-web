import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from './anim';
import Link from 'next/link';

export default function index() {
	return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {
          links.map((link, i) => {
            const { title, href } = link;
            return (
              <Link key={`b_${i}`} href={href} className={styles.linkContainer}>
              <motion.div
              // href={href}
              custom={i}
              variants={perspective}
              initial='initial'
              animate='enter'
              exit='exit'
              >
                {/* <a> */}
                  {title}
                {/* </a> */}
              </motion.div>
              </Link>
            )
          })
        }
      </div>
      <motion.div className={styles.footer}>
        {
          footerLinks.map((link, i) => {
            const { title, href } = link;
            return (
              <motion.a 
                variants={slideIn}
                custom={i}
                initial='initial'
                animate='enter'
                exit='exit'
                key={`f_${i}`}  
                href={href}>
              {title}
              </motion.a>
            )
          })
        }
      </motion.div>
    </div>
  );
}  
