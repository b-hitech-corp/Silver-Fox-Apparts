"use client";

import styles from "./styles.module.css";
import Alert from "@/app/_ui/Alert";
import SignUpButton from "../SignUpButton";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/app/_lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const newErrors = {};

    if (!formData.fullname.trim())
      newErrors.fullname = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.confirm_password)
      newErrors.confirm_password = "Confirm your password.";
    else if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors and try again.");
      return;
    }
    console.log("formData", formData);
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("res", res);
      const user = res.user;

      // Reference to Firestore document
      const userRef = doc(db, "hotel_users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Store user data if it doesn't exist
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          createdAt: new Date(),
          fullname: formData.fullname,
        });
        <Alert>user sign in successfully</Alert>;
        console.log("User document created in Firestore.");
      } else {
        console.log("User already exists in Firestore.");
      }
      router.push("/signin");
    } catch (error) {
      <Alert>{error.message}</Alert>;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.formSection} container`}>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.loginHeading}>Sign Up</h2>

        {/* {critical && <Alert>{critical}</Alert>} */}

        <div className={styles.formControl}>
          <label className={styles.loginLabel}>Fullname</label>
          <input
            type="text"
            name="fullname"
            className={styles.loginInput}
            value={formData.fullname}
            onChange={handleChange}
          />
          {errors.fullname && (
            <span className={styles.errorMessage}>{errors.fullname}</span>
          )}
        </div>

        <div className={styles.formControl}>
          <label className={styles.loginLabel}>Email Address</label>
          <input
            type="email"
            name="email"
            className={styles.loginInput}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formControl}>
          <label className={styles.loginLabel}>Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={styles.loginInput}
              value={formData.password}
              onChange={handleChange}
              minLength={6}
            />
            <button
              type="button"
              className={styles.pwdToggler}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password}</span>
          )}
        </div>

        <div className={styles.formControl}>
          <label className={styles.loginLabel}>Confirm Password</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              className={styles.loginInput}
              value={formData.confirm_password}
              onChange={handleChange}
              minLength={6}
            />
            <button
              type="button"
              className={styles.pwdToggler}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.confirm_password && (
            <span className={styles.errorMessage}>
              {errors.confirm_password}
            </span>
          )}
        </div>

        <SignUpButton isLoading={isLoading} />

        <br />
        <p className={styles.signinLink}>
          Already have an account? <Link href="/signin">Sign In</Link>
        </p>
        <Toaster position="top-center" reverseOrder={false} />
      </form>
    </div>
  );
}

export default SignUpForm;
