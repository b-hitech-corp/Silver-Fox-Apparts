"use client";
import { useFormStatus } from "react-dom";
import styles from "./styles.module.css";

function SubmitButton({
  onClick = null,
  type = "button",
  className = "",
  content = { pending: "Loading...", base: "Submit" },
  isLoading = false,
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      onClick={onClick ? () => onClick() : null}
      disabled={pending || isLoading}
      className={`${styles.sendBtn} ${className}`}
    >
      {pending || isLoading ? content.pending : content.base}
    </button>
  );
}

export default SubmitButton;
