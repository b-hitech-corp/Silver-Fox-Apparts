import styles from "./styles.module.css";
import { useFormStatus } from "react-dom";

function SignUpButton({ isLoading }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={styles.formButton}
      disabled={pending || isLoading}
      type="submit"
    >
      {isLoading ? "Loading..." : "Sign Up"}
    </button>
  );
}

export default SignUpButton;
