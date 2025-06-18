"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/_lib/firebase/firebase";
import styles from "./SuccessPage.module.css";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || hasFetchedRef.current) return;

    hasFetchedRef.current = true;

    fetch("/api/checkout-session?session_id=" + sessionId)
      .then((res) => res.json())
      .then(async (data) => {
        const meta = data?.metadata;
        if (!meta) return;

        const bookingData = {
          roomId: meta.roomId,
          user_id: meta.user_id,
          guests_count: parseInt(meta.guests_count),
          room_type: meta.room_type,
          check_in: meta.check_in,
          check_out: meta.check_out,
          payment_mode: meta.payment_mode,
          room_price: meta.room_price,
          created_at: new Date().toISOString(),
          status: meta.payment_mode === "online" ? "confirmed" : "pending",
        };

        if (meta.payment_mode === "online") {
          bookingData.payment_details = {
            session_id: data.id,
            payment_intent: data.payment_intent,
            payment_status: data.payment_status,
            amount_total: data.amount_total / 100,
            currency: data.currency,
          };
        }

        await addDoc(collection(db, "room_bookings"), bookingData);

        setTimeout(() => {
          router.push("/account/history");
        }, 1000);
      });
  }, [sessionId]);

  return (
    <div className={styles.container}>
      <div className={styles.emoji}>🎉</div>
      <h1 className={styles.heading}>Booking Confirmed!</h1>
      <p className={styles.subtext}>
        Your payment was successful, and your room is ready for you.
      </p>
      <button className={styles.button} onClick={() => router.push("/")}>
        Back to Home
      </button>
    </div>
  );
}
