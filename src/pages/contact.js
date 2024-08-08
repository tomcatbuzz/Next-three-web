import styles from "@/styles/contact.module.scss";
import Page from "@/components/page";
import { motion } from "framer-motion";
import { Suspense, useEffect, useState, useCallback } from "react";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ContactFormContent = () => {
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
    const phoneRegex = /^\+?[\d\s-]{10,14}$/;

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) errors.email = 'Invalid email address';
    if (!phoneRegex.test(formData.phone)) errors.phone = 'Invalid phone number';
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

        // Verify reCAPTCHA token
        const verifyRecaptcha = httpsCallable(functions, 'verifyRecaptcha');
        const result = await verifyRecaptcha({ token });
        
        if (result.data.success) {
          // reCAPTCHA verification successful, proceed with form submission
          await addDoc(collection(db, 'contacts'), {
            ...formData,
            timestamp: new Date(),
          });
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
          alert('reCAPTCHA verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
      setIsSubmitting(false);
    }
  }, [executeRecaptcha, formData, validateForm]);

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
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? styles.inputError : ''}
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
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
        <GoogleReCaptchaProvider reCaptchaKey="YOUR_RECAPTCHA_SITE_KEY">
          <ContactFormContent />
        </GoogleReCaptchaProvider>
      </>
    </Page>
  );
}