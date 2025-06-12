"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";

function Layout({ children }) {
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
    <section className={styles.accountLayout}>
      <aside className={styles.accountSidebar}>
        <ul className={styles.sidebarList}>
          <li>
            <Link href={"/account/history"} className={styles.sidebarLink}>
              <span>
                <FontAwesomeIcon icon={faHistory} />
              </span>
              <span>History</span>
            </Link>
          </li>
          <li>
            <Link href={"/account/profile"} className={styles.sidebarLink}>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <form action={signOutAction}>
              <button className={styles.sidebarButton}>
                <span>
                  <FontAwesomeIcon icon={faSignOut} />
                </span>
                <span>Sign out</span>
              </button>
            </form>
          </li>
        </ul>
      </aside>
      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default Layout;
