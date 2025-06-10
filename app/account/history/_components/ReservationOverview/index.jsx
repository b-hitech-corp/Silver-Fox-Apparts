"use client";
import Card from "@/app/_components/Card/Card";
import Image from "next/image";
import styles from "./styles.module.css";

import { formatToAbrFormat } from "@/app/utils/datetime";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CancelButton from "../CancelButton";
import DeleteForm from "../DeleteFrom";

import toast from "react-hot-toast";

function ReservationOverview({
  deleteAction,
  reservation,
  allowDelete = true,
  reservationCancelAction,
  children,
}) {
  const [showCancel, setShowCancel] = useState(false);

  const handleDelete = async () => {
    await deleteAction();
    setShowCancel(false);
    toast.success("Reservation canceled successfully.");
  };

  if (showCancel)
    return (
      <div className={styles.overviewContainer}>
        <Card>
          <Card.Thumbnail zoomOnHover={false}>
            <Image
              fill
              src={reservation?.room?.room_img}
              alt={`${reservation.room?.room_type} thumbnail`}
            />
          </Card.Thumbnail>
          <Card.Description className={styles.overviewDescription}>
            <h2>Are you sure to cancel this reservation?</h2>

            <div className={styles.actionsContainer}>
              <form action={handleDelete}>
                <CancelButton />
              </form>
              <button
                className={styles.backButton}
                onClick={() => setShowCancel(false)}
              >
                Go Back
              </button>
            </div>
          </Card.Description>
        </Card>
      </div>
    );

  return (
    <div className={styles.overviewContainer}>
      <Card>
        <Card.Thumbnail zoomOnHover={false}>
          <Image
            fill
            src={reservation?.room?.room_img}
            alt={`${reservation.room?.room_type} thumbnail`}
          />
          {/* <Image fill src={"/bg.png"} /> */}
        </Card.Thumbnail>

        <Card.Description className={styles.overviewDescription}>
          <h2>Deluxe Room</h2>
          <div className={styles.bookingSummary}>
            <h3>Booking Summary</h3>
            <p>
              <span>Arrival</span>
              <span>{formatToAbrFormat(new Date(reservation.check_in))}</span>
            </p>
            <p>
              <span>Departure</span>
              <span>{formatToAbrFormat(new Date(reservation.check_out))}</span>
            </p>
            <p>
              <span>Guests</span>
              <span>{String(reservation.guests_count).padStart(2, "0")}</span>
            </p>
            <p>
              <span>Reservation Date</span>
              <span>{formatToAbrFormat(new Date(reservation.created_at))}</span>
            </p>
            <p>
              <span>Total Price</span>
              <span>${Number(reservation.room_price).toFixed(2)}</span>
            </p>
          </div>

          <div className={styles.actionsContainer}>
            {/* <Link
              href={`/reservations/edit/${reservation.id}`}
              className={styles.editLink}
            >
              <span>
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span>Edit</span>
            </Link> */}

            {reservation.status !== "confirmed" &&
              reservation.status !== "canceled" && (
                <>
                  {allowDelete ? (
                    <DeleteForm deleteAction={deleteAction} showLabel={true} />
                  ) : (
                    <button
                      className={styles.cancelButton}
                      onClick={() => setShowCancel(true)}
                    >
                      <span>
                        <FontAwesomeIcon icon={faBan} />
                      </span>{" "}
                      <span>Cancel</span>
                    </button>
                  )}
                </>
              )}
          </div>
        </Card.Description>
        {children}
      </Card>
    </div>
  );
}

export default ReservationOverview;
