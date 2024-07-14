import React, { useEffect } from "react";
import Home from "./components/Home";
import About from "./pages/about";
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import Signup from "./pages/signup";
import Footer from "./components/footer";
import BookCatalog from "./pages/bookcatalog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "./firebase";
import booksData from "./books.json";
import { collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore functions

function App() {
  useEffect(() => {
    const importBooks = async () => {
      const booksCollection = collection(db, "books");

      // Check if books already exist in the collection
      const snapshot = await getDocs(booksCollection);
      if (snapshot.empty) {
        booksData.forEach(async (book) => {
          await addDoc(booksCollection, book);
        });
      } else {
        console.log("Books already imported.");
      }
    };

    importBooks();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="bookcatalog" element={<BookCatalog />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
