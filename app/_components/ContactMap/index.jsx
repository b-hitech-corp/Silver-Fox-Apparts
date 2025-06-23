"use client";
import dynamic from "next/dynamic";

import styles from "./styles.module.css";

const Map = dynamic((module) => import("../Map"), { ssr: false });

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
// import Map from "../Map";

// const initialCenter = [30.390245794565757, -9.556749533359007];
const initialCenter = [6.17748, 1.25358];

function ContactMap() {
  const [center, setCenter] = useState([...initialCenter]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const handleReset = () => setCenter([30.390245794565757, -9.556749533359007]);
  const handleReset = () => setCenter([6.17748, 1.25358]);

  if (!isMounted) return null;

  return (
    <div className={styles.mapWrapper}>
      {/* <button
        type="button"
        className={styles.goBackButton}
        onClick={handleReset}
      >
        Refresh
      </button> */}
      <Map initialCenter={initialCenter} center={center} />
    </div>
  );
}

export default ContactMap;
