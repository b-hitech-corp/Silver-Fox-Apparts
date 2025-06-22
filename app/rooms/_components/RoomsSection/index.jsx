"use client";
import RoomCard from "@/app/_components/RoomCard";
import styles from "./styles.module.css";

function RoomsSection({ filter, range, allRooms }) {
  console.log("allRooms", allRooms);

  return (
    <div className={styles.roomsGrid}>
      {allRooms?.length > 0 &&
        allRooms?.map((item, index) => <RoomCard key={index} room={item} />)}
    </div>
  );
}

export default RoomsSection;
