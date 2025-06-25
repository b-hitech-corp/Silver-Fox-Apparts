import { db } from "@/app/_lib/firebase/firebase";
import Heading from "@/app/_ui/Heading";
import NotFound from "@/app/not-found";
import { loadStripe } from "@stripe/stripe-js";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import Facilities from "../Facilities";
import Features from "../Features";
import RoomBookingForm from "../RoomBookingForm";
import RoomDescription from "../RoomDescription";
import RoomSlider from "../RoomSlider";
import styles from "./styles.module.css";

async function RoomContainer({ params, roomDetails }) {
  if (!roomDetails) NotFound();

  // inside bookingAction
  async function bookingAction(prevState, formData) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      redirect("/signin");
    }

    const payment_mode = formData.get("payment_mode");
    const check_in = new Date(formData.get("start_date"));
    const check_out = new Date(formData.get("end_date"));
    const room_id = formData.get("room_id");

    // 🔍 Check for existing bookings
    // const bookingsRef = collection(db, "room_bookings");
    // const bookingsQuery = query(
    //   bookingsRef,
    //   where("roomId", "==", room_id),
    //   where("status", "!=", "cancelled")
    // );

    // try {
    //   const snapshot = await getDocs(bookingsQuery);
    //   const overlap = snapshot.docs.some((doc) => {
    //     const existing = doc.data();
    //     const existingCheckIn = new Date(existing.check_in);
    //     const existingCheckOut = new Date(existing.check_out);

    // Check if selected date overlaps with any existing booking
    //     return check_in <= existingCheckOut && check_out >= existingCheckIn;
    //   });

    //   if (overlap) {
    //     toast.error("The selected date is already booked for this room.");
    //     return { ...prevState, isBooking: false, error: "Already booked." };
    //   }
    // } catch (error) {
    //   console.log("Error checking existing bookings:", error);
    //   toast.error("Failed to verify room availability.");
    //   return { ...prevState, isBooking: false, error: "Booking check failed." };
    // }

    const bookingData = {
      roomId: room_id,
      user_id: user.uid,
      guests_count: parseInt(formData.get("guests_count")),
      room_type: roomDetails?.room_type,
      room_price: roomDetails?.price,
      check_in: check_in.toISOString(),
      check_out: check_out.toISOString(),
      payment_mode,
      created_at: new Date().toISOString(),
      status: payment_mode === "online" ? "confirmed" : "pending",
    };

    // ✅ COD FLOW
    if (payment_mode === "cod") {
      try {
        await addDoc(collection(db, "room_bookings"), bookingData);
        toast.success("Room booked successfully with Cash on Arrival.");
        return { ...prevState, isBooking: false, success: true };
      } catch (error) {
        console.error("Firestore error:", error);
        toast.error("Booking failed.");
        return { ...prevState, isBooking: false, error: "Booking failed." };
      }
    }

    // ✅ ONLINE PAYMENT FLOW
    if (payment_mode === "online") {
      const body = {
        user: {
          uid: user.uid,
          email: user.email,
        },
        roomDetails,
        formData: {
          start_date: formData.get("start_date"),
          end_date: formData.get("end_date"),
          guests_count: parseInt(formData.get("guests_count")),
          roomId: room_id,
          payment_mode,
        },
      };

      try {
        const res = await fetch("/api/create-checkout-session", {
          method: "POST",
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (data.sessionId) {
          const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
          );
          await stripe?.redirectToCheckout({ sessionId: data.sessionId });
        }
      } catch (error) {
        console.error("Stripe Error:", error);
        toast.error("Payment initiation failed.");
      }

      return { ...prevState, isBooking: false };
    }

    return { ...prevState, isBooking: false };
  }

  return (
    <>
      <Heading className={styles.heading}>{roomDetails?.room_type}</Heading>
      <Features room={roomDetails} />
      <RoomSlider images={[roomDetails?.room_img]} />
      <RoomBookingForm bookingAction={bookingAction} room={roomDetails} />
      <RoomDescription room={roomDetails} />
      <Facilities />
      {/* <BookingPolicy /> */}
    </>
  );
}

export default RoomContainer;
