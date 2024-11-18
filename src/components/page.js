import Header from "./Header";
import Head from "next/head";
import FirebaseAnalytics from "@/components/Analytics";
import { Abril_Fatface, Poppins } from 'next/font/google';
import Footer from "./Footer";
const abril = Abril_Fatface({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-abril',
  display: 'swap'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
});
// AWS code help suggested
// export const fontClasses = {
//   abril: abril.className,
//   poppins: poppins.className
// };

export default function Page({ children }) {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={`${abril.variable} ${poppins.variable}`}>
      <Header />
      <FirebaseAnalytics />
      <main>{children}</main>
      <Footer />
      </div>
    </>
  )
}
