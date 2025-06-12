import Image from "next/image";
import Card from "../Card/Card";
import styles from "./styles.module.css";

function RoomCard({ room }) {
  return (
    <Card>
      <Card.Thumbnail>
        <Image fill src={room.room_img} alt="room-images" />
      </Card.Thumbnail>

      <Card.Description className={styles.roomDescription}>
        <h2>{room.room_type}</h2>

        {/* <p>{room.room_details}</p> */}
      </Card.Description>
    </Card>
  );
}

export default RoomCard;
