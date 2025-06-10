"use client";

import { Suspense, useEffect, useState } from "react";
import RoomContainer from "./_components/RoomContainer";
import LoadingSpinner from "@/app/_ui/LoadingSpinner";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/_lib/firebase/firebase";

// export const metadata = {
//   title: "Room Details",
//   description: "Discover and book a room at the Hotel Booking App ",
// };

function RoomDetails({ params }) {
  const { room_slug } = useParams();
  console.log("room_slug", room_slug);
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomRef = doc(db, "room_details", room_slug);
        const roomSnap = await getDoc(roomRef);

        console.log("roomSnap :::", roomSnap);

        if (roomSnap.exists()) {
          setRoomDetails({ id: roomSnap.id, ...roomSnap.data() });
        } else {
          console.log("No such room exists!");
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    room_slug && fetchRoomDetails();
  }, [room_slug]);

  return (
    <section className="container">
      <Suspense
        fallback={
          <div className="global-loading">
            <LoadingSpinner />
          </div>
        }
      >
        <RoomContainer params={params} roomDetails={roomDetails} />
      </Suspense>
    </section>
  );
}

export default RoomDetails;
