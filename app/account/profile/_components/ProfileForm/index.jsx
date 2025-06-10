"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import toast, { Toaster } from "react-hot-toast";
import SubmitButton from "@/app/_ui/SubmitButton";

function ProfileForm({ guestUpdateAction, guest }) {
  const [formData, setFormData] = useState({
    fullname: guest.fullname || "",
    email: guest.email || "",
    phone: guest.phone || "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Clear errors

    const form = new FormData();
    form.append("fullname", formData.fullname);
    form.append("email", formData.email);
    form.append("phone", formData.phone);

    const result = await guestUpdateAction(form);

    if (result.success) {
      toast.success("Profile updated successfully!");
    } else {
      Object.values(result).forEach((err) => {
        if (err) toast.error(err);
      });
      setErrors(result);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.profileFormInputs}>
        <div>
          <label className={styles.formLabel}>Fullname</label>
          <input
            className={styles.formControl}
            type="text"
            name="fullname"
            placeholder="Alaoui Hassan"
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <span className={styles.errorMessage}>{errors.fullname}</span>
          )}
        </div>

        <div>
          <label className={styles.formLabel}>Email Address</label>
          <input
            className={styles.formControl}
            type="email"
            name="email"
            placeholder="john.doe@mail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div>
          <label className={styles.formLabel}>Phone Number</label>
          <input
            className={styles.formControl}
            type="tel"
            name="phone"
            placeholder="+212 6 879900830"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className={styles.errorMessage}>{errors.phone}</span>
          )}
        </div>
      </div>

      <div className={styles.formButtonContainer}>
        <SubmitButton
          type="submit"
          className={styles.formButton}
          content={{
            pending: "Saving...",
            base: "Save",
          }}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default ProfileForm;
