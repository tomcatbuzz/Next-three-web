import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
// import { analytics } from '../firebase';
import { analytics } from '../lib/firebase';

const FirebaseAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && analytics) {
      const handleRouteChange = (url) => {
        window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID, {
          page_path: url,
        });
      };
      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default FirebaseAnalytics;
