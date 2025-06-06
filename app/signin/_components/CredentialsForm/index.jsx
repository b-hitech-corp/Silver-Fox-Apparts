// "use client";

// import Alert from "@/app/_ui/Alert";
// import SignInButton from "../SignInButton";
// import styles from "./styles.module.css";
// import { useFormState } from "react-dom";
// import { usePathname } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import Link from "next/link";

// const initialState = {
//   email: "",
//   password: "",
//   criticalError: "",
// };

// function CredentialsForm({ authAction }) {
//   const [state, formAction] = useFormState(authAction, initialState);
//   const pathname = usePathname();

//   const errors = Object.values(state)?.filter((item) => item.length);
//   if (errors.length) errors.forEach((item) => toast.error(item ?? "Failed to sign in, please try again"));

//   return (
    
//   );
// }

// export default CredentialsForm;
