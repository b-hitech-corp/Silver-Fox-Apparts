"use client";
import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

function About() {
  const pathname = usePathname();
  return (
    <>
      <section className={styles.aboutSection}>
        <div className={`container ${styles.aboutContainer}`}>
          <div className={styles.description}>
            {pathname !== "/about" && <Heading>About Us</Heading>}
            <p>Welcome to Silver Fox Apartment, </p>
            <p>
              At Silver Fox Apartment, we blend hotel-style luxury with the
              comfort of home. Perfectly located in the heart of the city, our
              fully furnished apartments are ideal for short or long stays —
              whether you're here for business or leisure.
            </p>
            <p>
              Enjoy seamless online booking and a stress-free stay with modern
              amenities like high-speed Wi-Fi, fully equipped kitchens, cozy
              bedrooms, and professional housekeeping. Backed by exceptional
              customer service and 24/7 support, we’re committed to making your
              experience smooth, comfortable, and memorable.
            </p>
          </div>
          <div className={styles.gallery}>
            <div>
              <Image fill src="/bg-1.jpg" alt="" />
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
              ].map((item, index) => (
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
      )}
    </>
  );
}

export default About;
