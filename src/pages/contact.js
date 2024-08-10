import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState, useCallback } from "react";
import { database } from '../lib/firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const RECAPTCHA_VERIFY_URL = 'https://us-central1-reactweb-b9752.cloudfunctions.net/checkRecaptcha';

const ContactFormContent = () => {
  const database = getDatabase()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const validateForm = useCallback(() => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const phoneRegex = /^\+?[\d\s-]{10,14}$/;

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) errors.email = 'Invalid email address';
    // if (!phoneRegex.test(formData.phone)) errors.phone = 'Invalid phone number';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }

      setIsSubmitting(true);
      try {
        // Execute reCAPTCHA
        const token = await executeRecaptcha('contact_form');

        // Verify reCAPTCHA token before function url
        // const verifyRecaptcha = httpsCallable(functions, 'verifyRecaptcha');
        // const result = await verifyRecaptcha({ token });

        // Verify recaptcha token
        const response = await fetch(RECAPTCHA_VERIFY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        const { score } = await response.json
        if (response.ok && score >= 0.5) {
          // reCAPTCHA verification successful, proceed with form submission
          await set(ref(database, 'contacts'), {
            ...formData,
            timestamp: new Date(),
          });
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          alert('reCAPTCHA verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
      setIsSubmitting(false);
    }
  }, [database, executeRecaptcha, formData, validateForm]);

  return (
    <div className={styles.content}>
    <h1>Contact Us</h1>
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Form fields remain the same */}
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? styles.inputError : ''}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? styles.inputError : ''}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? styles.inputError : ''}
        />
        {errors.subject && <span className={styles.error}>{errors.subject}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? styles.inputError : ''}
        ></textarea>
        {errors.message && <span className={styles.error}>{errors.message}</span>}
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit'}
      </button>
    </form>
    </div>
  );
};

// const ContactForm = () => {
//   return (
//     <GoogleReCaptchaProvider reCaptchaKey="YOUR_RECAPTCHA_SITE_KEY">
//       <ContactFormContent />
//     </GoogleReCaptchaProvider>
//   );
// };

// export default ContactForm;

export default function Contact() {

  return (
    <Page>
      <>
        <GoogleReCaptchaProvider reCaptchaKey="6Lc5l8gpAAAAAFQXvzUkcbYTXVvj4UZKkJB_NwV-">
          <ContactFormContent />
        </GoogleReCaptchaProvider>
      </>
    </Page>
  );
}