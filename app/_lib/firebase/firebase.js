// lib/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCMuU3jANpYHEtE6KUP4L2tbGRr1scmjSE",
  // authDomain: "spider-space-3cf1b.firebaseapp.com",
  // projectId: "spider-space-3cf1b",
  // storageBucket: "spider-space-3cf1b.appspot.com",
  // messagingSenderId: "480458246603",
  // appId: "1:480458246603:web:6c76588594df51f124ce4e",
  // measurementId: "G-MWC6X56ZXW",

  apiKey: "AIzaSyAwEqC-6TwH8q4x7O2rBRncPX_K1Y3KxFc",
  authDomain: "silverfoxapparts.firebaseapp.com",
  projectId: "silverfoxapparts",
  storageBucket: "silverfoxapparts.firebasestorage.app",
  messagingSenderId: "814480623394",
  appId: "1:814480623394:web:724ea868c2f3e9805f477b",
  measurementId: "G-0QFTR3VL6G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

// Export
export { app, auth, db };
