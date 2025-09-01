import React, { useState } from "react";
import "./Toggle.css";

const Toggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "container dark" : "container light"}>
      <h1>{darkMode ? "Dark Mode 🌙" : "Light Mode ☀"}</h1>
      <button onClick={toggleTheme} className="toggle-btn">
        {darkMode ? "Switch to Light" : "Switch to Dark"}
      </button>
    </div>
  );
};

export default Toggle;