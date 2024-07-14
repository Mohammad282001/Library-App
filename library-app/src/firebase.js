// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNb4qzEkm38TAB1R8PejeWJF6-zfd4pCw",
  authDomain: "book-library-20eb4.firebaseapp.com",
  projectId: "book-library-20eb4",
  storageBucket: "book-library-20eb4.appspot.com",
  messagingSenderId: "974652545534",
  appId: "1:974652545534:web:62c4eee57a8709c3fb48af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
