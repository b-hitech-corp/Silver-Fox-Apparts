"use client";

import { useState, useRef } from "react";
import styles from "./styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/_ui/SubmitButton";
import Alert from "@/app/_ui/Alert";
import Link from "next/link";

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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Name is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Invalid contact data");
      return;
    }

    const { email, fullname, phone, message } = formData;

    const mailtoLink = `mailto:silverfoxapparts@gmail.com?subject=Contact from ${fullname}&body=Name: ${fullname}%0DEmail: ${email}%0DPhone: ${phone}%0DMessage: ${message}`;

    // Open user's email client
    window.location.href = mailtoLink;

    // Reset form
    toast.success("Redirecting to your mail app...");
    setFormData(initialState);
    setErrors({});
    resetBtnRef.current?.click();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
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
          placeholder="Phone"
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
        <SubmitButton type="submit">Send</SubmitButton>
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
