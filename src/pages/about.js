import styles from '@/styles/about.module.scss'
import Page from "@/components/page";
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { React, useEffect, useRef } from 'react';
import Image from 'next/image';
import lady from '../../public/lady.jpg'

// gsap.registerPlugin(ScrollTrigger)

export default function About() {
  // const imageRef = useRef(null)

  // useEffect(() => {
  //   const imageElement = imageRef.current

  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: imageElement,
  //     start: 'bottom bottom',
  //     end: 'top top',
  //     scrub: true,
  //     pin: true,
  //     anticipatePin: 1
  //   }
  // });
  // tl.fromTo(
  //   imageElement,
  //   {
  //     height: 0,
  //     y: '100%'
  //   },
  //   {
  //     height: '80vh',
  //     y: 0,
  //     duration: 1
  //   },
  // )
  // }, [])

  // const imageStyle = {
  //   width: '500px',
  //   height: '800px',
  //   // objectFit: 'cover'
  //   display: 'block'
  // }
  
  return (
    <Page>
    <div className={styles.about_container}>
      <h1 className="about">About Page</h1>
      <p className={styles.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      <div style={{ width: '80%', margin: '0 auto', height: '1000px'}}>
      <div className={styles.imageStyle}></div>
      <Image
        // ref={imageRef}
        src={lady}
        alt='Curved Image'
        width={800}
        height={800}
        // style={imageStyle}
      />
    </div>
    </div>
    </Page>
  )
}