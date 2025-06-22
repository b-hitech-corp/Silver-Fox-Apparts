import Link from "next/link";
import styles from "./styles.module.css";
import { FaPhone, FaPhoneVolume } from "react-icons/fa6";
import { MdLocationOn, MdMail, MdPhoneIphone } from "react-icons/md";

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.footerMenu} container`}>
        <div>
          <h3>Contact Us</h3>
          <ul>
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdMail />
              SilverFoxApparts@gmail.com
            </li>
            {/* <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdPhoneIphone /> (+1)-510-847-1485
            </li>
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <FaPhoneVolume /> (228)-71-50-32-32
            </li>
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <FaPhone /> (228)-92-17-16-49
            </li> */}
            <li
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <MdLocationOn /> Novissi -Rue 42 HDN, Lomé- Togo.
            </li>
            <li className={styles.icons}></li>
          </ul>
        </div>

        <div>
          <h3>Link Menu</h3>
          <ul>
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/rooms">Rooms</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>

            {/* <li>Blog</li> */}
            <li>
              <Link href={"/contact"}>Contact Us</Link>
            </li>

            {/* <li>
              <Link href="/signin">Guest Area</Link>
            </li> */}
          </ul>
        </div>

        <div>
          <h3>Subscribe To Our Newsletter</h3>
          <li className={styles.newsletter}>
            <input type="text" placeholder="example@mail.com" />
            <button>SUBMIT</button>
          </li>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
