"use client";
import { listenToRoomImages } from "@/app/_lib/firebase/roomImages";
import Heading from "@/app/_ui/Heading";
import Loading from "@/app/loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import GalleryModal from "../common/GalleryModal";

function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set app element after the DOM is ready
    // if (typeof window !== "undefined") {
    //   Modal.setAppElement("#__next");
    // }

    const unsubscribe = listenToRoomImages((images) => {
      const latestImages = images?.[0]?.images?.slice(0, 10) ?? [];
      setGalleryImages(latestImages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openSlider = (index) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) return;
    setStartIndex(index);
    setIsOpen(true);
  };

  const closeSlider = () => {
    setIsOpen(false);
  };

  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <Heading className="text-center">Gallery</Heading>
        <div className={styles.galleryGrid}>
          {isLoading ? (
            <Loading />
          ) : (
            galleryImages.map((item, index) => (
              <div
                key={index}
                className={styles.thumbnail}
                onClick={() => openSlider(index)}
              >
                <Image
                  fill
                  src={item}
                  alt={`room-image-${index}`}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))
          )}
        </div>
        <GalleryModal
          isOpen={isOpen}
          images={galleryImages}
          startIndex={startIndex}
          onClose={closeSlider}
        />
      </div>
    </section>
  );
}

export default Gallery;
