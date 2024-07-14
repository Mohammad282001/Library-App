import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const buttonStyle = {
    padding: "10px 20px",
    margin: "0 5px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "rgb(0, 123, 255)",
    color: "white",
    cursor: "pointer",
  };

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setIsLogin(true);
    }
  }, []);

  function logoutFunc() {
    localStorage.removeItem("email");
    setIsLogin(false);
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link to={"/bookcatalog"}>Book Catalog</Link>
          </li>
          <div className="nav-buttons">
            <li>
              {!isLogin && (
                <Link to={"/signup"}>
                  <button style={buttonStyle}>Sign up</button>
                </Link>
              )}
              {isLogin && (
                <button style={buttonStyle} onClick={logoutFunc}>
                  Logout
                </button>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
