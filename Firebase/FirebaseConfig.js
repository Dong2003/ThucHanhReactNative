// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzorzh05JFhnN7R9PeTSkBQtckwdtVsNQ",
  authDomain: "demoreactnativefb-cefff.firebaseapp.com",
  projectId: "demoreactnativefb-cefff",
  storageBucket: "demoreactnativefb-cefff.firebasestorage.app",
  messagingSenderId: "382994572671",
  appId: "1:382994572671:web:b2723a249ff43d5a62e64a",
  measurementId: "G-XLLDMGTRX0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };