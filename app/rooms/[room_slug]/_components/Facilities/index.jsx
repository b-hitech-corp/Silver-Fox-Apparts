import Heading from "@/app/_ui/Heading";
import {
  faWheelchair,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

function Facilities() {
  return (
    <div className={styles.BookingPolicySection}>
      <Heading className="text-center">Facilities</Heading>
      <hr className="decriptionDivider" />
      <table className={styles.facilitiesTable}>
        <tbody>
          <tr>
            <td>
              <span>
                <FontAwesomeIcon
                  className={styles.facilitiyIcon}
                  icon={faWifi}
                />
                <span>High speed in-room wifi</span>
              </span>
            </td>
            <td>
              <span>
                <FontAwesomeIcon
                  className={styles.facilitiyIcon}
                  icon={faWheelchair}
                />
                <span>Wheelchair access</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Facilities;
