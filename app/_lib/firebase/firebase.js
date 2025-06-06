// lib/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getFunctions } from "firebase/functions"; // Optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMuU3jANpYHEtE6KUP4L2tbGRr1scmjSE",
  authDomain: "spider-space-3cf1b.firebaseapp.com",
  projectId: "spider-space-3cf1b",
  storageBucket: "spider-space-3cf1b.appspot.com",
  messagingSenderId: "480458246603",
  appId: "1:480458246603:web:6c76588594df51f124ce4e",
  measurementId: "G-MWC6X56ZXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

// Export
export { app, auth, db };
