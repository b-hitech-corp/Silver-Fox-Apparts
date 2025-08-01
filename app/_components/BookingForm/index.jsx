"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingButton from "../BookingButton";
import styles from "./index.module.css";
import { addDays, formatISO, isBefore } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

function BookingForm({ bookingSearchAction, children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(addDays(new Date(), 1)));

  function handleStartSelection(date) {
    setStartDate(date);
  }

  function handleEndSelection(date) {
    setEndDate(date);
  }

  async function handleSearch() {
    if (!startDate || !endDate) return;
    const arrival = formatISO(new Date(startDate), { representation: "date" });
    const departure = formatISO(new Date(endDate), { representation: "date" });
    const formatedRange = `${arrival}_${departure}`;

    if (!isBefore(arrival, departure)) {
      toast.error("Invalid date range!");
      return;
    }
    // await new Promise((res) => setTimeout(res, 5000));
    await bookingSearchAction(formatedRange);
    // router.push(`rooms?range=${formatedRange}`);
  }

  return (
    <form action={handleSearch}>
      <h1 className={styles.formHeading}>BOOK A ROOM ONLINE</h1>
      <div className={styles.bookingForm}>
        <div className={styles.formGroup}>
          <label htmlFor="checkIn">Check In</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartSelection(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.input}
            dateFormat={"dd/MM/yyyy"}
            excludeDateIntervals={[
              { start: new Date("01/01/1970"), end: new Date() },
            ]}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="checkOut">Check Out</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => handleEndSelection(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.input}
            dateFormat={"dd/MM/yyyy"}
            excludeDateIntervals={[
              { start: new Date("01/01/1970"), end: new Date() },
            ]}
          />
        </div>

        <div className={styles.actions}>
          <BookingButton />
          {children}
        </div>
      </div>
      <p className={styles.trustLine}>* 24/7 Support and Secure Booking</p>

      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default BookingForm;
