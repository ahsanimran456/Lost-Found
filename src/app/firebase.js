// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhKpFhjtC5o9xsxzdryHHjUUBPTL0VMqA",
  authDomain: "lostfound-26b1e.firebaseapp.com",
  projectId: "lostfound-26b1e",
  storageBucket: "lostfound-26b1e.firebasestorage.app",
  messagingSenderId: "1039334417574",
  appId: "1:1039334417574:web:65efbb63b49a8a49fd0067",
  measurementId: "G-9HM7FVMM1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };