import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";
import Image from "next/image";

function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.description}>
          <Heading>About Us</Heading>
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
  );
}

export default About;
