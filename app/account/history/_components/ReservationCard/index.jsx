import Image from "next/image";
import styles from "./styles.module.css";

import { reservationUpdateAction } from "@/app/_lib/actions";
import { db } from "@/app/_lib/firebase/firebase";
import Badge from "@/app/_ui/Badge";
import { formatToAbrFormat } from "@/app/utils/datetime";
import { isFuture, isPast } from "date-fns";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import ControlButtons from "../ControlButtons";

function ReservationCard({ reservation }) {
  const arrivalDate = formatToAbrFormat(reservation.check_in);
  const departureDate = formatToAbrFormat(reservation.check_out);

  const handleDelete = async () => {
    try {
      const bookingRef = doc(db, "room_bookings", reservation.id);
      const bookingSnap = await getDoc(bookingRef);

      if (!bookingSnap.exists()) {
        toast.error("Reservation not found.");
        return;
      }

      const bookingData = bookingSnap.data();

      // Condition: Cannot delete if already confirmed
      if (bookingData.status === "confirmed") {
        toast.error(
          "Cannot delete confirmed reservations. Please cancel it instead."
        );
        return;
      }

      // Additional condition: already canceled or finished
      if (
        bookingData.status === "canceled" ||
        bookingData.status === "finished"
      ) {
        toast.error("This reservation is already canceled or finished.");
        return;
      }

      await updateDoc(bookingRef, { status: "canceled" });
      toast.success("Reservation canceled successfully.");
    } catch (error) {
      console.error("Error canceling reservation:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <article className={styles.reservationItem}>
      <div className={styles.reservationThumbnail}>
        <Image fill src={reservation?.room?.room_img} />
      </div>

      <div className={styles.reservationInfos}>
        <div className={styles.reservationOverview}>
          <h2 className={styles.reservationTitle}>
            <span>{reservation.room_type}</span>

            {isPast(reservation.check_in) && isFuture(reservation.check_out) ? (
              <span
                className={`${styles.onGoing} ${styles.reservationEstimation}`}
              >
                ON GOING
              </span>
            ) : isFuture(reservation.check_in) ? (
              <span
                className={`${styles.future} ${styles.reservationEstimation}`}
              >
                FUTURE
              </span>
            ) : isPast(reservation.check_out) ? (
              <span
                className={`${styles.past} ${styles.reservationEstimation}`}
              >
                PAST
              </span>
            ) : (
              ""
            )}
          </h2>
          <p>
            {formatToAbrFormat(arrivalDate)} -{" "}
            {formatToAbrFormat(departureDate)}
          </p>

          <p>
            <span className={styles.price}>${reservation.room_price}</span> -{" "}
            {reservation.guests_count} Guest(s)
          </p>

          <Badge
            type={
              reservation.status == "unconfirmed"
                ? "warning"
                : reservation.status == "canceled" ||
                  reservation.status == "finished"
                ? "danger"
                : "success"
            }
          >
            {reservation.status}
          </Badge>
        </div>
        <div className={styles.reservationPriceContainer}>
          <ControlButtons
            reservationUpdateAction={reservationUpdateAction}
            deleteAction={handleDelete}
            reservation={reservation}
            reservationCancelAction={handleDelete}
          />
        </div>
      </div>
    </article>
  );
}

export default ReservationCard;
