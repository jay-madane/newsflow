import React from "react";
import { useLocation } from "react-router-dom";
import "./logo.css";

function Logo() {
  const location = useLocation();

  // Determine if the sidebar should be toggled based on the route
  const shouldDisableSidebar = ["/", "/login", "/register"].includes(
    location.pathname
  );

  // Handle sidebar toggle
  const handleToggleSideBar = () => {
    if (!shouldDisableSidebar) {
      document.body.classList.toggle("toggle-sidebar");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/dashboard" className="logo d-flex align-items-center">
        {/* <img src="" alt=""/> */}
        <span className="d-none d-lg-block">NewsFlow</span>
      </a>
      <i
        className="bi bi-list toggle-sidebar-btn"
        onClick={handleToggleSideBar}
      ></i>
    </div>
  );
}

export default Logo;
