"use client";
import { useEffect, useState } from "react";
import { listenToRoomImages } from "@/app/_lib/firebase/roomImages";
import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToRoomImages((images) => {
      const latestImages = images?.[0]?.images?.slice(0, 8) ?? [];
      setGalleryImages(latestImages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <Heading className="text-center">Gallery</Heading>
        <div className={styles.galleryGrid}>
          {galleryImages.map((item, index) => (
            <div key={index} className={styles.thumbnail}>
              <Image
                fill
                src={item}
                alt={`room-image-${index}`}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
