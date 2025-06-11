// @/app/_lib/firebase/roomImages.js
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Sets up a real-time listener for room images.
 * @param {function} callback - Function to handle snapshot data.
 * @returns {function} unsubscribe - Call this to stop listening.
 */
export function listenToRoomImages(callback) {
  const unsubscribe = onSnapshot(collection(db, "room_images"), (snapshot) => {
    const roomImages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(roomImages);
  });

  return unsubscribe;
}
