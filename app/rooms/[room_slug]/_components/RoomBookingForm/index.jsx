"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faBed, faCalendar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { formatISO } from "date-fns";
import FormDayPicker from "../FormDayPicker";

import { useFormState } from "react-dom";
import ReservationButton from "../ReservationButton";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  dateError: "",
  guestsError: "",
  criticalError: "",
  isBooking: false,
  success: false,
};

function RoomBookingForm({ bookingAction, room }) {
  const [state, formAction] = useFormState(bookingAction, initialState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickerResetKey, setPickerResetKey] = useState(0);

  const [guests, setGuests] = useState("");

  const handleDateSelection = useCallback((range) => {
    if (!range) return;
    const from = formatISO(range?.from, { representation: "date" });
    const to = formatISO(range?.to, { representation: "date" });

    console.log({ from, to });

    setStartDate(from);
    setEndDate(to);
  }, []);

  function handleSubmit() {
    if (!(startDate && endDate)) {
      toast.error("Please select a date range from the calendar");
      return;
    }

    if (
      !guests ||
      parseInt(guests) < 1 ||
      parseInt(guests) > room?.room_capacity
    ) {
      toast.error("Please provide guests number");
      return;
    }

    const newForm = new FormData();
    newForm.set("start_date", startDate);
    newForm.set("end_date", endDate);
    newForm.set("guests_count", guests);
    newForm.set("room_id", room.id);
    formAction(newForm);
  }

  useEffect(() => {
    console.log("stated:::62", state);
    if (state.success) {
      setStartDate("");
      setEndDate("");
      setGuests("");
      setPickerResetKey((prev) => prev + 1); // trigger FormDayPicker re-render
    }
  }, [state.success]);

  return (
    <form action={handleSubmit} className={styles.roomBookingForm}>
      <FormDayPicker
        key={pickerResetKey} // force re-render
        endDate={endDate}
        handleDateSelection={handleDateSelection}
      />

      <div className={styles.formItem}>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faBed} />
          </div>
          <div className={styles.formControl}>
            <label>Room Type</label>
            <input type="text" value={room?.room_type} readOnly disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check In</label>
            <input type="date" value={startDate} disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <div className={styles.formControl}>
            <label>Check Out</label>
            <input type="date" value={endDate} disabled />
          </div>
        </div>
        <div className={styles.formInput}>
          <div className={styles.formIcon}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className={styles.formControl}>
            <label>Guests</label>
            <select name="" id="" onChange={(e) => setGuests(e.target.value)}>
              <option value="">Select guests number</option>
              {Array.from(Array(room?.room_capacity ?? 0)).map(
                (item, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <ReservationButton />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </form>
  );
}

export default RoomBookingForm;
