import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import Cube from '@/components/Cube';
// import CubeScene from "@/components/CubeScene";
import CubeScene from "@/components/CubeScene2";

export default function Contact({isCanvasVisible}) {
  const safePositions = [
    { top: 10, left: 20 },
    { top: 30, left: 50 },
    { top: 50, left: 80 },
    { top: 70, left: 30 },
    { top: 20, left: 70 },
    { top: 60, left: 10 },
    // Add more positions as needed
  ];

  
  const Line = () => {
    const [style, setStyle] = useState({});
    const lineRef = useRef(null);

    // useEffect(() => {
      const updateLinePositions = () => {
      if (lineRef.current) {
      // const timer = setInterval(() => {
        // const top = Math.random() * 100;
        // const left = Math.random() * 100;
        
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const lineHeight = lineRef.current.offsetHeight;
      const lineWidth = lineRef.current.offsetWidth;
      const position = safePositions[Math.floor(Math.random() * safePositions.length)];
      // console.log(position, 'position')
      // const top = (position.top / 100) * (viewportHeight / lineHeight);
      const top = (position.top / viewportHeight) * lineHeight * 5;
      // working below, but resize issue
      let left;
      // const left= (position.left / viewportWidth) * lineHeight * 30
      // const left= calculateLeftPosition(position, viewportWidth, lineHeight)

      // console.log(viewportWidth, 'width')

      if (viewportWidth <= 1600) {
        left = (position.left / viewportWidth) * lineHeight * 20
        // console.log(left, "left")
        
      } else if(viewportWidth <= 768) {
        left = (position.left / viewportWidth) * lineHeight * 10
      }
      else {
        left = (position.left / viewportWidth) * lineHeight * 30
      } 

      // const top = Math.min(Math.max(Math.random() * 70, 0), 70);
      // const left = Math.min(Math.max(Math.random() * 90, 0), 90);
        setStyle({
          top: `${top}vh`,
          right: `${left}vw`
        });
      }
      // }, Math.random() * 10000);
      
      // return () => clearInterval(timer);
    }

    // }, []);

    useEffect(() => {
      const timer = setInterval(updateLinePositions, Math.random() * 10000);
      window.addEventListener('resize', updateLinePositions);

      return () => {
        clearInterval(timer);
        window.removeEventListener('resize', updateLinePositions);
      }
    }, []);

    return <div className={styles.line} style={style} ref={lineRef}></div>;
  }

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
      <div className={styles.backGroundWrapper}>
      <div className={styles.backGround}>
      <div className={styles.myDiv7}>
      <div style={{
        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\' width=\'32\' height=\'32\' fill=\'none\' stroke-width=\'2\' stroke=\'rgb(30 58 138 / 0.5)\' preserveAspectRatio=\'none\'%3e%3cpath d=\'M0 .5H31.5V32\'/%3e%3c/svg%3e")'
      }} className={styles.svg}></div>
      <div className={styles.myDiv8}></div>
      </div>
      <div className={styles.content}>
        <h1>Contact Me</h1>
        <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi voluptatum corrupti itaque, fugiat animi mollitia, placeat veniam inventore nihil assumenda, unde sit neque labore nesciunt.</p>
      </div>
      </div>
      <div>
        {[...Array(6)].map((_, i) => (
          <Line key={i} />
        ))}
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
      </div>
      </>
    </Page>
  )
}