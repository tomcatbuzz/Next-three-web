import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";


export default function Contact() {
  return (
    <Page>
      <motion.div
        whileHover={{color: 'red', cursor: 'pointer'}}>
      <h1 className={styles.contactTag}>Contact page</h1>
      </motion.div>
    </Page>
  )
}