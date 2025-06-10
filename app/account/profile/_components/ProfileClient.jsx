"use client";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileForm from "./ProfileForm";
import { useAuth } from "@/app/_context/AuthContext";
import { db } from "@/app/_lib/firebase/firebase";
import Loading from "@/app/loading";

export default function ProfileClient() {
  const { user } = useAuth();
  const router = useRouter();
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "hotel_users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGuest(docSnap.data());
        } else {
          console.warn("User document not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

  async function guestUpdateAction(formData) {
    const fullname = formData.get("fullname")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";

    const errors = {
      fullname: fullname ? "" : "Fullname is required",
      email: email ? "" : "Email is required",
      phone: phone ? "" : "Phone is required",
    };

    const hasErrors = Object.values(errors).some((err) => err.length);
    if (hasErrors) return errors;

    try {
      const uid = user.uid;
      if (!uid) return { email: "Unauthorized. UID not found." };

      const docRef = doc(db, "hotel_users", uid);
      await updateDoc(docRef, {
        fullname,
        email,
        phone,
      });

      // This success message will be shown via client toast
      return { success: true };
    } catch (error) {
      console.error("Update failed:", error);
      return { email: "Something went wrong. Please try again." };
    }
  }

  if (loading) return <Loading />;

  return guest ? (
    <ProfileForm guest={guest} guestUpdateAction={guestUpdateAction} />
  ) : (
    <div>User data not found.</div>
  );
}
