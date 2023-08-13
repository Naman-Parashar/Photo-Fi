// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSBf2jLUOMmBVe2GRjpNY6kVfuqsfPtr4",
  authDomain: "photo-fi-app.firebaseapp.com",
  projectId: "photo-fi-app",
  storageBucket: "photo-fi-app.appspot.com",
  messagingSenderId: "324080728371",
  appId: "1:324080728371:web:4d807b3798c68d5ee16646"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};