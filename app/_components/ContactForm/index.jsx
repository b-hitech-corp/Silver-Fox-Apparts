"use client";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import Alert from "@/app/_ui/Alert";
import SubmitButton from "@/app/_ui/SubmitButton";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./styles.module.css";
import { db } from "@/app/_lib/firebase/firebase";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const resetBtnRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.fullname.trim()) newErrors.fullname = "Name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Enter a 10-digit phone number";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors");
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "contact_us"), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      toast.success("Your message has been submitted!");
      setFormData(initialState);
      setErrors({});
      resetBtnRef.current?.click();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      {errors.critical && <Alert type="danger">{errors.critical}</Alert>}

      <div>
        <input
          name="fullname"
          type="text"
          placeholder="Name"
          value={formData.fullname}
          onChange={handleChange}
        />
        {errors.fullname && (
          <span className={styles.errorMessage}>{errors.fullname}</span>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email}</span>
        )}
      </div>

      <div>
        <input
          name="phone"
          type="tel"
          placeholder="Phone (10 digits)"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <span className={styles.errorMessage}>{errors.phone}</span>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        {errors.message && (
          <span className={styles.errorMessage}>{errors.message}</span>
        )}
      </div>

      <div>
        <SubmitButton
          type="submit"
          isLoading={isSubmitting}
          className={styles.sendBtn}
        >
          Send
        </SubmitButton>
        <button
          type="reset"
          className={styles.resetButton}
          ref={resetBtnRef}
        ></button>
      </div>

      <Toaster position="top-center" />
    </form>
  );
};

export default ContactForm;
