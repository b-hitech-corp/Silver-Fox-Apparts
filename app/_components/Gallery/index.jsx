import { getRoomImages } from "@/app/_lib/firebase/roomImages";
import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

async function Gallery() {
  const images = await getRoomImages();

  const galleryImages = images?.[0]?.images?.slice(0, 8) ?? [];

  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <Heading className="text-center">Gallery</Heading>
        <div className={styles.galleryGrid}>
          {galleryImages.map((item, index) => (
            <div key={index} className={styles.thumbnail}>
              <Image fill src={item} alt={`room-iamges-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
