import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      navigate("/home");
    }
  }, [isSubmitted, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("email", JSON.stringify(email));
    alert("Login Successfully");
    setIsSubmitted(true);
  }

  return (
    <section>
      <h1>Sign Up</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Mohammad Abdallah"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Book@books.com"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
