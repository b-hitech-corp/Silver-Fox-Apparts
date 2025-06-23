import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import styles from "./styles.module.css";

function ContactInfo() {
  return (
    <div className={styles.infoCard}>
      <h3>Contact Information</h3>
      <p>
        <FaMapMarkerAlt /> Novissi -Rue 42 HDN, Lomé- Togo
      </p>
      <p>
        <MdPhoneIphone /> (+228) 71523232, (+228) 92171649
      </p>
      <p>
        <FaEnvelope /> info@silverfoxapartments.com
      </p>
    </div>
  );
}

export default ContactInfo;
