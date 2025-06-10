import { db } from "@/app/_lib/firebase/firebase";
import Heading from "@/app/_ui/Heading";
import NotFound from "@/app/not-found";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import BookingPolicy from "../BookingPolicy";
import Facilities from "../Facilities";
import Features from "../Features";
import RoomBookingForm from "../RoomBookingForm";
import RoomDescription from "../RoomDescription";
import RoomSlider from "../RoomSlider";
import styles from "./styles.module.css";
import { getAuth } from "firebase/auth";
import { redirect } from "next/navigation";

async function RoomContainer({ params, roomDetails }) {
  if (!roomDetails) NotFound();

  async function bookingAction(prevState, formData) {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log("user:::", user);

    // Redirect if not logged in
    if (!user) {
      redirect("/signin"); // make sure this path matches your login route
    }

    console.log("prevState :::", prevState);
    console.log("formData :::", formData);

    prevState = { ...prevState, isBooking: true };
    const start_date = formData.get("start_date");
    const end_date = formData.get("end_date");
    const guests_count = parseInt(formData.get("guests_count"));
    const room_id = formData.get("room_id");

    console.log("start_date :::", start_date);
    console.log("end_date :::", end_date);
    console.log("guests_count :::", guests_count);
    console.log("room_id :::", room_id);

    // FORM VALIDATION
    let isValid = true;

    if (isValid) {
      try {
        await addDoc(collection(db, "room_bookings"), {
          check_in: start_date,
          check_out: end_date,
          guests_count,
          room_id,
          room_type: roomDetails?.room_type,
          room_price: roomDetails?.price,
          user_id: user.uid, // <-- store user reference
          user_email: user.email, // optional
          status: "pending",
          created_at: new Date().toISOString(),
        });
        toast.success("Room booked sucessfully");

        return { ...prevState, isBooking: false, success: true };
      } catch (error) {
        console.error("Firestore write error:", error);
        return { ...prevState, isBooking: false, error: "Booking failed." };
      }
    }

    return { ...prevState, isBooking: false };
  }

  return (
    <>
      <Heading className={styles.heading}>{roomDetails?.room_type}</Heading>
      <Features room={roomDetails} />
      <RoomSlider images={[roomDetails?.room_img]} />
      <RoomBookingForm bookingAction={bookingAction} room={roomDetails} />
      <RoomDescription />
      <Facilities />
      {/* <BookingPolicy /> */}
    </>
  );
}

export default RoomContainer;
