"use client";
import styles from "./styles.module.css";
import Modal from "@/app/_components/Modal/Modal";
import ReservationOverview from "../ReservationOverview";
import DeleteForm from "../DeleteFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

function ControlButtons({
  deleteAction,
  reservation,
  reservationCancelAction,
}) {
  const closeBtnRef = useRef();

  const handleDelete = async () => {
    const result = await deleteAction();
    closeBtnRef.current?.click();
  };

  return (
    <div className={styles.buttonsContainer}>
      <Modal>
        <Modal.ToggleOpen>
          <button className={styles.overviewButton}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </Modal.ToggleOpen>
        <Modal.Overlay hideOnLargerScreens={false}>
          <Modal.Wrapper hideOnLargerScreens={false}>
            <ReservationOverview
              reservation={reservation}
              allowDelete={false}
              reservationCancelAction={reservationCancelAction}
              deleteAction={deleteAction}
            >
              <Modal.ToggleClose>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className={styles.closeButton}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </Modal.ToggleClose>
            </ReservationOverview>
          </Modal.Wrapper>
        </Modal.Overlay>
        {reservation.status !== "confirmed" &&
          reservation.status !== "canceled" && (
            <DeleteForm deleteAction={handleDelete} />
          )}
      </Modal>
    </div>
  );
}

export default ControlButtons;
