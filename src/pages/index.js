import styles from '@/styles/home.module.scss'
import Page from "@/components/page";
import { motion } from "framer-motion";
import Image from 'next/image'
import testImage from '../../public/next.svg'
import AnimatedTextCharacter from "@/components/AnimatedTextCharacter";
import ScrambleText from "@/components/ScrambleText";
import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import FadingImage from "@/components/HoverImage";

export default function Home({isCanvasVisible}) {
  return (
    <Page>
      <div className={styles.homeContainer}>
        <AnimatedTextCharacter text="Tomcatbuzz" />
        <div>
        <ScrambleText text="Hello" />
        <ScrambleText text="World" />
        </div>
        <motion.h1 className={styles.homeText}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >Home</motion.h1>
        <ScrambleText text="Big words right" />
        
        <Suspense fallback={<div>...Loading</div>}>
        {isCanvasVisible && (
          <Canvas className={styles.canvas} camera={{ position: [0, 0, 2], fov: 20 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            
            <FadingImage />
            
          </Canvas>
        )}
        </Suspense>
      
      <div className={styles.backgroundText}><ScrambleText text="creative developer" /></div>
      </div>
      
      

    
    </Page>
  )
}