"use client";

import FilterSection from "./_components/FilterSection";
import styles from "./styles.module.css";
import Banner from "../_components/Banner";
import RoomsSection from "./_components/RoomsSection";
import { Suspense, useState, useEffect } from "react";
import Loader from "../_ui/Loader";
import { db } from "../_lib/firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Rooms({ searchParams }) {
  const [allRooms, setAllRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const filter = searchParams?.sort ?? "default";
  const range = searchParams?.range ?? "";

  useEffect(() => {
    const getCollection = collection(db, "room_details");
    const unsubscribe = onSnapshot(
      getCollection,
      (snapshot) => {
        const roomData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllRooms(roomData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching rooms:", error);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Banner title={"Accomodation Options"} />

      <div className={`container ${styles.roomsHolder}`}>
        <FilterSection filters={{ filter, range }} />

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
