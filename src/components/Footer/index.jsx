import styles from './style.module.scss'
import Content from '../NavContent'

export default function Footer() {
  return (
    // <div className={styles.footer} style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}>
    <div className={styles.footer}>
      {/* <div className={styles.innerFooter}> */}
        <div className={styles.stickyContent}>
          <Content />
        </div>
      {/* </div> */}
    </div>
  );
}