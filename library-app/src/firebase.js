// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeCb7uDdWktP084lnAMi-DL4EwWjctj3E",
  authDomain: "booking-259c4.firebaseapp.com",
  projectId: "booking-259c4",
  storageBucket: "booking-259c4.appspot.com",
  messagingSenderId: "333202038313",
  appId: "1:333202038313:web:e191e25faefd58aa0dc638",
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };




  
