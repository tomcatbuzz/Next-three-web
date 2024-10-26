import { useState, useEffect, useCallback } from 'react';

const useRecaptchaV3 = (siteKey) => {
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  
  useEffect(() => {
    const scriptId = 'recaptcha-v3-script';
    let script = document.getElementById(scriptId);

    const handleRecaptchaLoad = () => {
      window.grecaptcha.ready(() => {
        setIsRecaptchaReady(true);
      });
    };

    // If grecaptcha is already loaded and ready
    if (window.grecaptcha) {
      handleRecaptchaLoad();
      return;
    }

    // If script exists but grecaptcha isn't ready, just attach the onload handler
    if (script) {
      script.onload = handleRecaptchaLoad;
      return;
    }

    // If neither exists, create and append the script
    script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = handleRecaptchaLoad;
    script.onerror = () => {
      console.error('Error loading reCAPTCHA script');
    };

    document.head.appendChild(script);
    console.log('recaptcha script appended', script);

    // Cleanup function - but don't remove the script as it might be used by other components
    return () => {
      if (script) {
        script.onload = null;
        script.onerror = null;
      }
    };
  }, [siteKey]);

  const executeRecaptcha = useCallback(async (action) => {
    if (!isRecaptchaReady || !window.grecaptcha) {
      console.warn('reCAPTCHA is not ready yet');
      return null;
    }

    try {
      return await window.grecaptcha.execute(siteKey, { action });
    } catch (error) {
      console.error('Error executing reCAPTCHA:', error);
      throw error;
    }
  }, [isRecaptchaReady, siteKey]);

  return executeRecaptcha;
};

export default useRecaptchaV3;