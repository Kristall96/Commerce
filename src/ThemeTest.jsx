import React from "react";
import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./Theme.css";
function ThemeTest() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply theme on mount and toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isRegisterActive, setIsRegisterActive] = useState(true);

  return (
    <>
      <nav>
        <span>
          <button>
            {" "}
            <a href="">Logo</a>
          </button>
        </span>
        <span className="center">
          <button>Home</button>
          <button>Shop</button>
          <button>About</button>
          <button>Contact</button>
          <button>Blog</button>
        </span>

        <span className="right">
          {/* Theme Toggle Button */}
          <div
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className={`toggle-slider ${isDarkMode ? "dark" : ""}`}>
              {isDarkMode ? (
                <FaMoon className="icon" />
              ) : (
                <FaSun className="icon" />
              )}
            </div>
          </div>
          <button
            onClick={
              isRegisterActive
                ? () => setIsRegisterActive(false)
                : () => setIsRegisterActive(true)
            }
          >
            Register
          </button>
          <button
            className="LoginToggle"
            onClick={
              isLoginActive
                ? () => setIsLoginActive(false)
                : () => setIsLoginActive(true)
            }
          >
            Login
          </button>
        </span>
      </nav>
      {/* Login Form */}
      <div className={`loginForm ${isLoginActive ? "active" : ""}`}>
        <button
          className="closeForm"
          onClick={
            isLoginActive
              ? () => setIsLoginActive(false)
              : () => setIsLoginActive(true)
          }
        >
          X
        </button>
        Hello Div
      </div>

      {/* Login Form */}
      <div
        className={`RegisterForm ${isRegisterActive ? "activeRegister" : ""}`}
      >
        <button
          className="closeForm"
          onClick={
            isRegisterActive
              ? () => setIsRegisterActive(false)
              : () => setIsRegisterActive(true)
          }
        >
          X
        </button>
        Hello Div
      </div>
    </>
  );
}

export default ThemeTest;
