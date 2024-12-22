// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhKpFhjtC5o9xsxzdryHHjUUBPTL0VMqA",
  authDomain: "lostfound-26b1e.firebaseapp.com",
  projectId: "lostfound-26b1e",
  storageBucket: "lostfound-26b1e.app",
  messagingSenderId: "1039334417574",
  appId: "1:1039334417574:web:65efbb63b49a8a49fd0067",
  measurementId: "G-9HM7FVMM1D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
