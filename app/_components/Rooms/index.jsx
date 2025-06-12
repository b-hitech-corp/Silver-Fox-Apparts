"use client";
import Heading from "@/app/_ui/Heading";

import { useEffect, useState } from "react";
import RoomCard from "../RoomCard";
import styles from "./styles.module.css";
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/app/_lib/firebase/firebase";
import Loading from "@/app/loading";

async function Rooms() {
  const [allRooms, setAllRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRooms("default");
  }, []);

  const fetchRooms = async (sortRooms) => {
    const roomRef = collection(db, "room_details");
    const queryRef =
      sortRooms === "default"
        ? roomRef
        : query(roomRef, orderBy("price", sortRooms));
    const querySnapshot = await getDocs(queryRef);
    setAllRooms(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
    setIsLoading(false);
  };

  return (
    <section className={styles.roomsSection}>
      <div className="container">
        <Heading className="text-center">Our Rooms</Heading>
        <p className="text-center">
          Lorem Ipsum is available, but the majority have suffered
        </p>
        <div className={styles.roomsGrid}>
          {isLoading ? (
            <Loading />
          ) : (
            allRooms.map((item, index) => <RoomCard key={index} room={item} />)
          )}
        </div>
      </div>
    </section>
  );
}

export default Rooms;
