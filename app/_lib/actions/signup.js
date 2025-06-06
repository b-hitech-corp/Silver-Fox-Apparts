"use server";

import { auth } from "@/auth";
import { signIn } from "next-auth/react";
import { createGuest, getGuestByEmail } from "../supabase/guests";
import { signupSchema } from "../zodSchemas";
import { hashSync } from "bcryptjs";

export async function signupAction(prevState, formData) {
  prevState = {};
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirm_password = formData.get("confirm_password");

  try {
    const z_validation = signupSchema.parse({
      fullname,
      email,
      password,
      confirm_password,
    });
  } catch (err) {
    err.errors.forEach((element) => {
      prevState[element?.path[0] ?? "unknown"] = element.message;
    });
    return { ...prevState };
  }

  const does_email_exists = await getGuestByEmail(email);

  if (does_email_exists)
    return { ...prevState, critical: "Email address already exists!" };

  const avatar = `https://ui-avatars.com/api/?name=${fullname.replace(
    " ",
    "+"
  )}&background=161616&color=F1F1F1`;
  
  try {
    await createGuest(fullname, email, avatar, hashSync(password, 10));
    
    return {
      success: true,
    };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      critical: "An error occurred during signup. Please try again.",
    };
  }
} 