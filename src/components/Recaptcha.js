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
          // const response = await axios.post(
          //   RECAPTCHA_VERIFY_URL, 
          //   { token }, 
          //   { 
          //     headers: { 
          //       'Content-Type': 'application/json' 
          //     } 
          //   }
          // );
          const response = await axios({
            method: "POST",
            url: RECAPTCHA_VERIFY_URL,
            data: {token},
            headers: {
              'Content-Type': 'application/json'
            }
          });
          onVerify(response.data); 
        } catch (error) {
          console.error('recaptcha verification failed:', error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
          }
          onVerify({ error: 'verification failed'})
        }
        
      }
    };
    verifyCallback();
  }, [executeRecaptcha, onVerify]);

  return null; 
};

export default Recaptcha;
