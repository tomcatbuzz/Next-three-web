import axios from 'axios';
import { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const RECAPTCHA_VERIFY_URL = 'https://us-central1-reactweb-b9752.cloudfunctions.net/checkRecaptchaV2';

const Recaptcha = ({ onVerify }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const verifyCallback = async () => {
      if (executeRecaptcha) {
        try {
          const token = await executeRecaptcha();
          const response = await axios.post(
            RECAPTCHA_VERIFY_URL, 
            { token }, 
            { 
              headers: { 
                'Content-Type': 'application/json' 
              } 
            }
          );
          onVerify(response.data); 
        } catch (error) {
          console.error('recaptcha verification failed:', error);
          onVerify({ error})
        }
        
      }
    };
    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null; 
};

export default Recaptcha;
