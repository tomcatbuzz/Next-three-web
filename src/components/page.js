import Header from "./Header";
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
      <Header />
      <FirebaseAnalytics />
      <main className={abril.className}>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
