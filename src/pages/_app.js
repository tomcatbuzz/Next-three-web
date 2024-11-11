import { useRouter } from "next/router";
import '@/styles/styles.scss'
import { motion, AnimatePresence } from "framer-motion";
// import Preloader from "@/components/Preloader";
// import Preloader from "@/components/Preloader2";
import Preloader from "@/components/Preloader3";
import { useState, useEffect, useLayoutEffect } from "react";
// import Grid from "@/components/Grid";
import { opacity, expand } from "@/components/Grid/anim";
// import SmokeTransition from "@/components/SmokeTransition/SmokeTransition";
import SmokeTransition from "@/components/SmokeTransition/smoke2"
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Background from "@/components/Background/index";
import BackgroundSvg from '@/components/BackgroundSvg'
import * as THREE from 'three';
// import FirebaseAnalytics from "@/components/Analytics";
import Head from 'next/head';
// import Script from 'next/script'

const App = ({ Component, pageProps}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const [isNavExiting, setIsNavExiting] = useState(false);
  // original working
  // useEffect(() => {
  //   (
  //     async () => {
  //       // add locomotive//???????????????
  //         // const LocomotiveScroll = (await import('locomotive-scroll')).default
  //         // const locomotiveScroll = new LocomotiveScroll();

  //         setTimeout( () => {
  //           setIsLoading(false);
  //           setIsEntering(true);
  //           setCanvasVisible(true)
  //           document.body.style.cursor = 'default'
  //           window.scrollTo(0,0);
  //         }, 20000)
  //     }
  //   )()
  // }, [])

  // useEffect(() => {
  //   if (isLoading) {
  //     // Apply styles when loading
  //     document.documentElement.style.setProperty('overflow', 'hidden');
  //     document.documentElement.style.setProperty('padding-right', '0px');
      
  //     // Cleanup function
  //     return () => {
  //       // Remove styles when loading is complete
  //       document.documentElement.style.removeProperty('overflow');
  //       document.documentElement.style.removeProperty('padding-right');
  //     };
  //   }
  // }, [isLoading]);

  // useLayoutEffect(() => {
  //   if (isLoading) {
  //     // Apply styles when loading
  //     document.documentElement.style.setProperty('overflow', 'hidden');
  //     // document.documentElement.style.setProperty('padding-right', '0px');
      
  //     // Cleanup function
  //     return () => {
  //       // Remove styles when loading is complete
  //       document.documentElement.style.removeProperty('overflow');
  //       // document.documentElement.style.removeProperty('padding-right');
  //     };
  //   }
  // }, [isLoading]);

  useLayoutEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        overflow: hidden !important;
        padding-right: 0px !important;
        margin-right: 0px !important;
      }
    `;
    
    if (isLoading) {
      // Add style element to head
      document.head.appendChild(style);
    }
    
    return () => {
      // Smooth transition for scroll bar
      const transition = document.createElement('style');
      transition.innerHTML = `
        html, body {
          transition: padding-right 0.2s ease;
        }
      `;
      document.head.appendChild(transition);
      
      // Remove the no-scroll styles
      style.remove();
      
      // Remove transition after it completes
      setTimeout(() => {
        transition.remove();
      }, 200);
    };
  }, [isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setCanvasVisible(true)
    document.body.style.cursor = 'default'
    window.scrollTo(0,0);
  }
  

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setCanvasVisible(false);
      setIsNavExiting(true);
    };

    const handleRouteChangeComplete = () => {
      setTimeout(() => {
        setCanvasVisible(true);
      }, 1000); // Adjust delay as needed
      setIsNavExiting(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    // console.log(router.events.on, "router event??")

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  
  const nbOfSquares = 5
  const anim = (variants, custom=null) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants,
        custom
    }
}

  return (
    <>
      <Head>
        <title>Anthony Buzzelli</title>
        <meta name="description" content="My Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      {/* <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence> */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={router.pathname}>
        
        {/* <div className="backgroundCanvas">
        <Canvas>
        <Background />
        </Canvas>
        </div> */}
          {/* <FirebaseAnalytics /> */}
          <Component {...pageProps} isCanvasVisible={isCanvasVisible} isNavExiting={isNavExiting} />
          {/* <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="lazyOnload" /> */}
          {/* <Component {...pageProps} isCanvasVisible={isCanvasVisible} /> */}
          {/* <div className="backgroundWrapper"> */}
            <BackgroundSvg />
          {/* </div> */}
          <div className="grid">           
            <motion.div {...anim(opacity)} className="transition-background" />
            <div className="transition-container">
              {[...Array(nbOfSquares)].map((_, i) => {
                return (
                  <motion.div key={i} {...anim(expand, nbOfSquares - i)} />
                );
              })}
            </div>
          </div>
          
          </motion.div>
        
      </AnimatePresence>
      
    </>
  );
};

export default App;