"use client";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Banner from "../_components/Banner";
import { db } from "../_lib/firebase/firebase";
import Loader from "../_ui/Loader";
import FilterSection from "./_components/FilterSection";
import RoomsSection from "./_components/RoomsSection";
import styles from "./styles.module.css";

function Rooms({ searchParams }) {
  const [allRooms, setAllRooms] = useState([]);
  const [sortRooms, setSortRooms] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const filter = searchParams?.sort ?? "default";
  const range = searchParams?.range ?? "";

  useEffect(() => {
    fetchRooms(sortRooms);
  }, [sortRooms]);

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
    <>
      <Banner title={"Accomodation Options"} />

      <div className={`container ${styles.roomsHolder}`}>
        <FilterSection setSortRooms={setSortRooms} />

        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <RoomsSection filter={filter} range={range} allRooms={allRooms} />
        )}
      </div>
    </>
  );
}

export default Rooms;
