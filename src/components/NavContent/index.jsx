import styles from './style.module.scss'

export default function Content() { 
  return ( 
    <div className={styles.content}>  
      <Section1 /> 
      <Section2 /> 
    </div> 
  ); 
} 

const Section1 = () => { 
  return ( 
    <div> 
      <Nav /> 
    </div> 
  ); 
} 

const Section2 = () => { 
  return ( 
    <div className={styles.section2}> 
      <h1 className={styles.heading}>Sticky Footer</h1> 
        <p className={styles.headParagraph}>©copyright</p> 
    </div> ); 
} 

const Nav = () => { 
  return ( 
    <div className={styles.nav}> 
      <div className={styles.navItem}> 
        <h3 className={styles.navHeading}>About</h3> 
          <p>Home</p> 
          <p>Projects</p> 
          <p>Our Mission</p> 
          <p>Contact Us</p> 
      </div> 
        <div className={styles.navItem}> 
          <h3 className={styles.navHeading}>Education</h3> 
            <p>News</p>  
            <p>Learn</p> 
            <p>Certification</p> 
            <p>Publications</p> 
        </div> 
    </div> 
  );
}