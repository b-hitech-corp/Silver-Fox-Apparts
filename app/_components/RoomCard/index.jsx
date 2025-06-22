import Image from "next/image";
import Card from "../Card/Card";
import styles from "./styles.module.css";
import { FaUserFriends, FaBed } from "react-icons/fa";
import Link from "next/link";

function RoomCard({ room }) {
  return (
    <Card className={styles.roomCard}>
      <Card.Thumbnail>
        <Image fill src={room.room_img} alt="room-images" />
        <div className={styles.hoverInfo}>
          <span className={styles.price}>{room.price} FCFA/night</span>
        </div>
      </Card.Thumbnail>

      <Card.Description className={styles.roomDescription}>
        <h2>{room.room_type}</h2>
        <div className={styles.meta}>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaUserFriends /> {room.room_capacity} Guests
          </span>
        </div>
        <div className={styles.amenities}>
          {room?.amenities?.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
        <Link href={`/rooms/${room?.id}`} className={styles.bookBtn}>
          Book Now
        </Link>
      </Card.Description>
    </Card>
  );
}

export default RoomCard;
