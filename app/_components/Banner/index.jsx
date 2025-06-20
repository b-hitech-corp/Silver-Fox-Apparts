"use client";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

function Banner({ title }) {
  const pathname = usePathname();
  return (
    <div className={pathname === "/rooms" ? styles.banner : styles.contact}>
      <div className={styles.overlay}>
        <h1 className={styles.bannerHeading}>{title}</h1>
      </div>
    </div>
  );
}

export default Banner;
