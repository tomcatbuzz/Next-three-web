"use client";
import styles from "@/styles/demo.module.scss";
import Page from "@/components/page";
import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import proLogo from "../../public/pro-logo.png";
import mainLogo from "../../public/logo.jpg";
import img1 from "../../public/img-1.jpg";
import img2 from "../../public/img-2.jpg";
import img3 from "../../public/img-3.jpg";
import img4 from "../../public/img-4.jpg";
import img5 from "../../public/img-5.jpg";
import img6 from "../../public/img-6.jpg";

const imagePairs = [
  { id: 1, leftImage: img1, rightImage: img2 },
  { id: 2, leftImage: img3, rightImage: img4 },
  { id: 3, leftImage: img5, rightImage: img6 },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef(null);
  const rowsRef = useRef([]);
  const logoRef = useRef(null);
  const linesRef = useRef([]);
  const buttonRef = useRef(null);

  // debug
  useEffect(() => {
    linesRef.current.forEach((line) => {
      if (line) {
        console.log("Line Element:", line); // Debug: Log element to verify it's correctly referenced
      }
    });
  }, []);

  useEffect(() => {
    const leftXValues = [-800, -900, -400];
    const rightXValues = [800, 900, 400];
    const leftRotationValues = [-30, -20, -35];
    const rightRotationValues = [30, 20, 35];
    const yValues = [100, -150, -400];

    rowsRef.current.forEach((row, index) => {
      const cardLeft = row.querySelector(`.${styles.cardLeft}`);
      const cardRight = row.querySelector(`.${styles.cardRight}`);

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
            cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
          },
        },
      });
    });

    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 25%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.to(linesRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 25%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      delay: 0.25,
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top 25%",
        toggleActions: "play reverse play reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Page>
      <ReactLenis root>
        <section className={styles.hero}>
          <div className={styles.img}>
            <Image src={proLogo} alt="Pro logo" width={100} height={100} />
          </div>
        </section>

        <section className={styles.main} ref={mainRef}>
          <div className={styles.mainContent}>
            <div className={styles.logo} ref={logoRef}>
              <Image src={mainLogo} alt="Main logo" width={100} height={100} />
            </div>
            <div className={styles.copy}>
              {["Delve into coding without clutter.", "One subscription. Endless web design.", "Take the fast lane to mastery."].map((text, i) => (
                <div className={styles.line} key={i} ref={(el) => linesRef.current[i] = el}>
                  <p className={styles.lineText}>{text || "fallback text"}</p>
                </div>
              ))}
            </div>
            <div className={styles.btn}>
              <button className={styles.demoButton} ref={buttonRef}>Get PRO</button>
            </div>
          </div>

          {imagePairs.map((pair, index) => (
            <div className={styles.row} key={pair.id} ref={(el) => rowsRef.current[index] = el}>
              <div className={`${styles.card} ${styles.cardLeft}`}>
                <Image src={pair.leftImage} alt="" width={100} height={100} />
              </div>
              <div className={`${styles.card} ${styles.cardRight}`}>
                <Image src={pair.rightImage} alt="" width={100} height={100} />
              </div>
            </div>
          ))}
        </section>

        <section className={styles.footer}>
          <Link href="https://youtube.com/codegrid">Link in description</Link>
        </section>
      </ReactLenis>
    </Page>
  );
}