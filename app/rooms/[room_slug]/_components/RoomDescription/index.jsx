import Heading from "@/app/_ui/Heading";
import styles from "./styles.module.css";

function RoomDescription({ room }) {
  return (
    <div className={styles.description}>
      <Heading className="text-center">Room Description</Heading>

      <hr className="decriptionDivider" />

      <div className={styles.descriptionContent}>
        <p>
          Step into comfort and space in our Room, thoughtfully designed for
          travelers who appreciate a blend of modern elegance and cozy
          relaxation. This room offers ample space to unwind after a long day of
          travel, business, or exploration.
        </p>
        <p>
          The room features a king-size bed with premium bedding to ensure a
          restful night’s sleep. Natural light pours in through large windows,
          offering views of the city skyline or tranquil garden surroundings,
          depending on the hotel’s location.
        </p>
        <p>
          Whether you’re traveling for work or leisure, you’ll find everything
          you need — a dedicated workspace, high-speed Wi-Fi, and a smart TV for
          your entertainment. The private en-suite bathroom includes a walk-in
          shower, along with complimentary toiletries, fresh towels, and a
          hairdryer.
        </p>
        <p>
          Other thoughtful touches include a coffee/tea maker, mini-fridge,
          in-room safe, and climate control system, ensuring your stay is as
          comfortable as possible. Ideal for solo travelers, couples, or small
          families, the Large Room provides a perfect balance of comfort,
          convenience, and value.
        </p>
      </div>
    </div>
  );
}

export default RoomDescription;
