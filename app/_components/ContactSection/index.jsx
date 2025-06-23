import Heading from "@/app/_ui/Heading";
import ContactForm from "../ContactForm";
import ContactMap from "../ContactMap";
import ContactInfo from "../ContactInfo";
import styles from "./styles.module.css";

function ContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <Heading className={`text-center ${styles.heading}`}>
          Contact <span style={{ color: "#4f46e5" }}>Us</span>
        </Heading>
        <div className={styles.contactContainer}>
          <ContactForm />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <ContactInfo />
            <ContactMap />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
