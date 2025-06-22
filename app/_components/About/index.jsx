"use client";
import Heading from "@/app/_ui/Heading";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";
import GalleryModal from "../common/GalleryModal";

function About() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

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
    <>
      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutContainer}`}>
          <div className={styles.description}>
            {pathname !== "/about" && (
              <Heading className={styles.aboutHeading}>
                About <span className={styles.highlight}>Us</span>
              </Heading>
            )}
            <p>
              Welcome to Silver Fox Apartment. At Silver Fox Apartment, we blend
              hotel-style luxury with the comfort of home. Perfectly located in
              the heart of the city, our fully furnished apartments are ideal
              for short or long stays — whether you're here for business or
              leisure.
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              Enjoy seamless online booking and a stress-free stay with modern
              amenities like high-speed Wi-Fi, fully equipped kitchens, cozy
              bedrooms, and professional housekeeping. Backed by exceptional
              customer service and 24/7 support, we’re committed to making your
              experience smooth, comfortable, and memorable.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✅</span> 24/7 Support
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>📶</span> High-Speed Wi-Fi
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🛎️</span> Professional
                Service
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🛋️</span> Fully Furnished
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>⭐</span> Premium Quality
              </div>
            </div>
          </div>

          <div
            className={pathname !== "/about" ? styles.gallery : styles.about}
          >
            <div className={styles.imageWrapper}>
              <Image
                fill
                src={pathname !== "/about" ? "/img-21.jpg" : "/logo-hotal.jpg"}
                alt="Luxury apartment view"
              />
            </div>
          </div>
        </div>
      </section>

      {pathname === "/about" && (
        <section className={styles.gallerySection}>
          <div className="container">
            <Heading className="text-center">About Gallery</Heading>
            <div className={styles.galleryGrid}>
              {[
                "/img-10.jpg",
                "/img-11.jpg",
                "/img-12.jpg",
                "/img-13.jpg",
                "/img-14.jpg",
                "/img-15.jpg",
                "/img-16.jpg",
                "/img-17.jpg",
                "/img-18.jpg",
                "/img-19.jpg",
                "/img-31.jpg",
                "/img-29.jpg",
              ].map((item, index) => (
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
              ))}
            </div>
          </div>
        </section>
      )}

      <GalleryModal
        isOpen={isOpen}
        images={[
          "/img-10.jpg",
          "/img-11.jpg",
          "/img-12.jpg",
          "/img-13.jpg",
          "/img-14.jpg",
          "/img-15.jpg",
          "/img-16.jpg",
          "/img-17.jpg",
          "/img-18.jpg",
          "/img-19.jpg",
          "/img-31.jpg",
          "/img-29.jpg",
        ]}
        startIndex={startIndex}
        onClose={closeSlider}
      />
    </>
  );
}

export default About;
