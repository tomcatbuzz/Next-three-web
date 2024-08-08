import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState, useRef } from "react";

export default function Contact() {

  return (
    <>
      <div className={styles.backGroundWrapper}>
        <div className={styles.backGround}>
          <div className={styles.myDiv7}>
            <div
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)' preserveAspectRatio='none'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
              }}
              className={styles.svg}
            ></div>
            <div className={styles.myDiv8}></div>
          </div>
        </div>
      </div>
    </>
  );
}