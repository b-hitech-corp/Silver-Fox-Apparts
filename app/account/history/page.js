"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { db } from "@/app/_lib/firebase/firebase";
import Heading from "@/app/_ui/Heading";
import Loading from "@/app/loading";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReservationCard from "./_components/ReservationCard";
import styles from "./style.module.css";

export const listenToUserReservationsWithRoomDetails = (
  userId,
  onDataUpdate
) => {
  const bookingsRef = collection(db, "room_bookings");
  const q = query(bookingsRef, where("user_id", "==", userId));

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const reservations = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const reservationData = docSnap.data();
        const roomId = reservationData.room_id;

        let roomData = null;
        try {
          const roomRef = doc(db, "room_details", roomId);
          const roomSnap = await getDoc(roomRef);
          roomData = roomSnap.exists() ? roomSnap.data() : null;
        } catch (error) {
          console.error("Error fetching room details:", error);
        }

        return {
          id: docSnap.id,
          ...reservationData,
          room: roomData,
        };
      })
    );

    // ✅ Pass data back via callback
    onDataUpdate(reservations);
  });

  return unsubscribe;
};

function History() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);

    const unsubscribe = listenToUserReservationsWithRoomDetails(
      user.uid,
      (data) => {
        setReservations(data);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount
  }, [user]);

  if (!user) {
    return (
      <>
        <Heading textClassName={styles.heading}>Your History</Heading>
        <p>Please sign in to view your booking history.</p>
      </>
    );
  }

  return (
    <>
      <Heading textClassName={styles.heading}>Your History</Heading>
      <div>
        {loading ? (
          <Loading />
        ) : reservations?.length ? (
          reservations
            .reverse()
            .map((item) => <ReservationCard key={item.id} reservation={item} />)
        ) : (
          <div>
            <p>You have no booked room.</p>
            <Link href={"/rooms"}>View Rooms</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default History;
