// components/GalleryModal.jsx
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./GalleryModal.module.css";

export default function GalleryModal({ isOpen, onClose, images, startIndex }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
          <Swiper
            initialSlide={startIndex}
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            className={styles.swiper}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.slideWrapper}>
                  <Image
                    src={item}
                    alt={`slide-${index}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
