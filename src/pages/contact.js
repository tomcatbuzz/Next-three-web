import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import Cube from '@/components/Cube';
// import CubeScene from "@/components/CubeScene";
import CubeScene from "@/components/CubeScene2";


export default function Contact({isCanvasVisible}) {
  
    const cubes = [];
    const cubeSize = 0.5;
    const gap = 0.5;

    for (let x = -4; x < 4; x++) {
      for (let y = -4; y < 4; y++) {
        for (let z = -4; z < 4; z++) {
          const position = [
            x * (cubeSize + gap),
            y * (cubeSize + gap),
            z * (cubeSize + gap)
          ];
          cubes.push(
            <Cube
              key={`${x}-${y}-${z}`}
              position={position}
              cubeSize={cubeSize}
              gap={gap}
            />
          );
        }
      }
    }
  
  return (
    <Page>
      {/* <motion.div
        whileHover={{color: 'red', cursor: 'pointer'}}>
      <h1 className={styles.contactTag}>Contact page</h1>
      </motion.div> */}
      <>
      <div className={styles.myDiv}></div>
      <div className={styles.myDiv2}></div>
      <div className={styles.myDiv3}></div>
      <div className={styles.myDiv4}></div>
      <div className={styles.myDiv5}></div>
      <div className={styles.myDiv6}></div>
      <div className={styles.myDiv7}>
      <div style={{
        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke-width=\'2\' stroke=\'rgb(30 58 138 / 0.5)\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")'
      }} className={styles.svg}></div>
      <div className={styles.myDiv8}></div>
      </div>
      
      <Suspense fallback={null}>
      {/* <CubeScene /> */}
      {isCanvasVisible && 
        <Canvas
          camera={{ position: [0, 0, 20] }}
          style={{ width: '100vw', height: '100vh', zIndex: 11, cursor: 'pointer' }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          
          {cubes}
          <OrbitControls />
        </Canvas>
      }
      </Suspense>
      </>
    </Page>
  )
}