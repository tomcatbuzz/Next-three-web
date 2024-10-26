import styles from '@/styles/home.module.scss'
import Page from "@/components/page";
import { motion } from "framer-motion";
import Image from 'next/image';
import testImage from '../../public/next.svg';
import capsule from '../../public/lady.jpg';
import footerImage from '../../public/joel-filipe-k8apfKm-Md4-unsplash.jpg';
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter/AnimatedTextCharacter";
import ScrambleText from "@/components/ScrambleText";
import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import FadingImage from "@/components/HoverImage";
import Footer from '@/components/Footer';

export default function Home({isCanvasVisible}) {
  return (
    <Page>
      <div className={styles.homeContainer}>
        <div className={`${styles.heroContainer} ${styles.borderGradient}`}>
        
          
        <AnimatedTextCharacter text="Tomcatbuzz" />
        <p className={styles.textParagraph}>From Concept to Deployment: Full Stack Solutions for Tomorrow’s Web
          <span className={styles.imageSpan}><Image className={styles.spanImage} src={capsule} alt="test image" /></span></p><p>Innovating Web Development: Where Functionality Meets Creativity.
          Transforming Ideas into Reality with Full Stack Expertise</p>
        <div>
        <ScrambleText text="Hello" />
        <ScrambleText text="World" />
        </div>
        <motion.h1 className={styles.homeText}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >Home</motion.h1>
        <ScrambleText text="Big words right" />
        </div>
        <div className={styles.imageContainer}>
          <Image 
            className={styles.image} 
            src={testImage} 
            alt="test image"
            fetchpriority="high" />
        </div>
        <Suspense fallback={<div>...Loading</div>}>
        {isCanvasVisible && (
          
          <motion.div>
          <Canvas className={styles.canvas} camera={{ position: [0, 0, 2], fov: 20 }}>
            <ambientLight intensity={1.0}/>
            <pointLight position={[10, 10, 10]} />
            
            <FadingImage />
            
          </Canvas>
          </motion.div>
        )}
        </Suspense>
      
      <div className={styles.backgroundText}><ScrambleText text="creative developer" /></div>
      <div className={styles.bottomImageContainer}>
        <Image 
          className={styles.footerImage} 
          src={footerImage} 
          alt="test image"
          fetchpriority="high" />
      </div>
      <div className={styles.footer}>
      {/* <Footer /> */}
      </div>
      </div>
      
    </Page>
  )
}