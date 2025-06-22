"use client";
import Modal from "@/app/_components/Modal/Modal";
import BookingForm from "../BookingForm";
import Slider from "../Slider";
import styles from "./index.module.css";
import BookingButton from "../BookingButton";

const images = ["/bg-2.jpg", "/img-1.jpg", "/img-28.jpg", "/img-10.jpg"];

function HeroSection({ bookingSearchAction }) {
  return (
    <Slider images={images}>
      <div className={styles.heroContainer}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            Find Comfort in a{" "}
            <span className={styles.highlight}>Foreign Land</span> With Us
          </h1>
          <p className={styles.subHeading}>
            Book Now, Pay On Arrival - Experience luxury and comfort in our
            premium apartments
          </p>

          <div className={styles.formWrapper}>
            <BookingForm bookingSearchAction={bookingSearchAction} />
          </div>
          <div className={styles.heroCTA}>
            <Modal>
              <Modal.ToggleOpen>
                <BookingButton />
              </Modal.ToggleOpen>
              <Modal.Overlay>
                <Modal.Wrapper>
                  <BookingForm bookingSearchAction={bookingSearchAction}>
                    <div style={{ width: "100%" }}>
                      <Modal.ToggleClose>
                        <button type="button" className={styles.closeButton}>
                          Cancel
                        </button>
                      </Modal.ToggleClose>
                    </div>
                  </BookingForm>
                </Modal.Wrapper>
              </Modal.Overlay>
            </Modal>
          </div>
        </div>
      </div>
    </Slider>
  );
}

export default HeroSection;
