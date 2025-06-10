"use client";
import styles from "./styles.module.css";
import Link from "next/link";

function RoomItem({ id, imgPath, price, title }) {
  console.log("imgPath", imgPath);
  return (
    <div className={styles.roomsGrid}>
      <div className={styles.roomItem}>
        <div className={styles.imgOverlay}>
          <img fill src={imgPath} alt="" />
        </div>
        <div className={styles.roomDescription}>
          <div>
            <h2 className={styles.roomTitle}>{title}</h2>
            <Link href={`rooms/${id}`}>From {price} FCFA/ Nightly</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomItem;
