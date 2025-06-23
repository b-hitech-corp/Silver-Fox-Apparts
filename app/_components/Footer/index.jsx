"use client";
import { db } from "@/app/_lib/firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdLocationOn, MdMail, MdPhoneIphone } from "react-icons/md";
import styles from "./styles.module.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.(com|net|org|co|io|in|edu|gov|us)$/i.test(email);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter an email.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const q = query(
        collection(db, "newsletter_subscriptions"),
        where("email", "==", email.toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error("This email is already subscribed.");
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "newsletter_subscriptions"), {
        email: email.toLowerCase(),
        createdAt: Timestamp.now(),
      });

      setEmail("");
      toast.success("Thanks for subscribing!");
    } catch (error) {
      console.error("Error adding email:", error);
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerContent} container`}>
        {/* Contact Info */}
        <div className={styles.footerColumn}>
          <h3>Contact Us</h3>
          <ul>
            <li>
              <MdLocationOn /> Novissi -Rue 42 HDN, Lomé- Togo
            </li>
            <li>
              <MdPhoneIphone /> (+228) 71523232, (+228) 92171649
            </li>
            <li>
              <MdMail /> info@silverfoxapartments.com
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div className={styles.footerColumn}>
          <h3>Link Menu</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/rooms">Rooms</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div className={styles.footerColumn}>
          {/* <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div> */}

          <h3 className={styles.newsTitle}>Newsletter</h3>
          <p className={styles.subscribeText}>
            Subscribe to our newsletter for updates and special offers
          </p>
          <div className={styles.newsletter}>
            <input
              type="text"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © 2025 Silver Fox Apartments. All rights reserved. | Designed with care
        for your comfort.
      </div>
    </footer>
  );
}

export default Footer;
