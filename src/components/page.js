import Header from "./Header";
import Head from "next/head";
import FirebaseAnalytics from "@/components/Analytics";
import { Abril_Fatface } from 'next/font/google';
// import Footer from "./Footer";
const abril = Abril_Fatface({
  subsets: ['latin'],
  weight: ['400']
})
export default function Page({ children }) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/_next/static/media/9f705a8904cabecc-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Header />
      <FirebaseAnalytics />
      <main className={abril.className}>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
