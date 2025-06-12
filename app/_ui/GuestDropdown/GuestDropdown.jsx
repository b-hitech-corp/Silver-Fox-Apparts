import React, { useState } from "react";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";

const GuestDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (e.target.closest(`.${styles.avatarContainer}`)) return;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, []);

  async function signOutAction() {
    const auth = getAuth();

    try {
      await signOut(auth);
      // Redirect to home page after sign out
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div className={styles.avatarContainer} onClick={toggleDropdown}>
      <img
        src={
          user.photoURL
            ? user.photoURL
            : `https://ui-avatars.com/api/?name=${user?.photoURL?.replace(
                " ",
                "+"
              )}&background=161616&color=F1F1F1`
        }
        alt={`${user.email} avatar`}
        className={styles.avatar}
      />
      <span className={styles.name}>
        <FontAwesomeIcon icon={faCaretDown} />
      </span>
      <div className={`${styles.dropdown} ${isOpen ? styles.active : ""}`}>
        <div className={styles.dropdownItem}>
          <Link className={styles.dropdownOption} href="/account/history">
            History
          </Link>
        </div>
        <div className={styles.dropdownItem}>
          <Link className={styles.dropdownOption} href="/account/profile">
            Profile
          </Link>
        </div>
        <div className={styles.dropdownItem}>
          <form action={signOutAction}>
            <button type="submit" className={styles.dropdownOption}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestDropdown;
