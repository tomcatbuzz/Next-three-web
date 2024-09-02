import Header from "./Header";
import FirebaseAnalytics from "@/components/Analytics";
// import Footer from "./Footer";

export default function Page({ children }) {
  return (
    <>
      <Header />
      <FirebaseAnalytics />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}
