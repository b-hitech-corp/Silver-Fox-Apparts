import styles from "./styles.module.css";
import { useFormStatus } from "react-dom";

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button className={styles.formButton} disabled={pending} type="submit">
      {pending ? "Checking..." : "Sign In"}
    </button>
  );
}

export default SignInButton;
