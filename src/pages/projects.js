import styles from '@/styles/projects.module.scss'
import Page from "@/components/page";
import { motion } from "framer-motion";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import lady from '../../public/lady.jpg';
import lady2 from '../../public/image01.jpg';
import lady3 from '../../public/img3.jpg';

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: 1, title: "Project 1", image: lady },
  { id: 2, title: "Project 2", image: lady2 },
  { id: 3, title: "Project 3", image: lady3 },
]

export default function Projects() {
  const carouselRef = useRef(null);
  // const imageRef = useRef(null);

  useGSAP(() => {
    gsap.to(carouselRef.current, {
      rotateY: 360, // Rotate carousel on Y-axis
      ease: "none",
      scrollTrigger: {
        trigger: carouselRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true, // Smooth scroll effect
      },
    });
  }, [])

  
  return (
    <Page>
      <div className={styles.projectsContainer}>
      <div className={styles.carousel} ref={carouselRef}>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: project.id * 0.1, // Staggers cards for smoother effect
            }}
          >
            <Image className={styles.cardImage}
              src={project.image} 
              alt={project.title}
              fill // Makes the image fill the parent container
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  />
            <h3 className={styles.cardTitle}>{project.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
    </Page>
  );
}