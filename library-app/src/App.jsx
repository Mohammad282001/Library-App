import React from "react";
import Home from "./components/Home"
import About from "./pages/about";  
import Navbar from "./components/navbar";
import Contact from "./pages/contact";
import Signup from "./pages/signup";
import Footer from "./components/footer"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <>
   <BrowserRouter>
      
        <Navbar/>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <Footer/>

      </>
    
  );
}

export default App;
