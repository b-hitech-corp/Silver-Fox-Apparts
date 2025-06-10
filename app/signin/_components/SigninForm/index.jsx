"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import SignInButton from "../SignInButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/_lib/firebase/firebase";
import Alert from "@/app/_ui/Alert";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SigninForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        console.log("Form submitted:", formData);
        // await authAction(formData);
        const res = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        router.push("/");
      } catch (error) {
        console.log("error====>", error);
        alert(error.message);
        // <Alert>{error.message}</Alert>;
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.formSection} container`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.loginHeading}>Login</h2>

        {/* {state.criticalError && <Alert>{state.criticalError}</Alert>} */}
        {/* {pathname === "/reservations/checkout" && (
          <Alert type="warning">
            Please sign in before confirming your booking!
          </Alert>
        )} */}

        <div className={styles.formControl}>
          <label htmlFor="email" className={styles.loginLabel}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.loginInput}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="password" className={styles.loginLabel}>
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.loginInput}
          />
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}
        </div>

        <SignInButton isLoading={isLoading} />

        <br />
        <p className={styles.signupLink}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
          {/* <Link href="/signup">Sign Up</Link> */}
        </p>
        <Toaster position="top-center" reverseOrder={false} />
      </form>
      {/* <OAuthProviderButtons /> */}
    </div>
  );
}

export default SigninForm;
