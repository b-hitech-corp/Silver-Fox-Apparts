// @/app/_lib/firebase/roomImages.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getRoomImages() {
  const querySnapshot = await getDocs(collection(db, "room_images"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
