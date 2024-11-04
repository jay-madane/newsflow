import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./main.css";
import PageTitle from "./PageTitle";
import Dashboard from "./Dashboard";
import AllNews from "./AllNews";
import Contact from "./Contact";
import FAQ from "./FAQ";
import Settings from "./Settings";
import LandingHero from "./LandingHero";
import Notices from "./Notices";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";

function Main() {
  const location = useLocation();
  let pageTitle = "";
  let icon = "";
  let disableSidebar = false;
  let showHeader = true;
  let showPageTitle = true; // Default to show PageTitle

  // Determine page title, icon, whether to disable the sidebar, show the header, and show PageTitle
  switch (location.pathname) {
    case "/dashboard":
      pageTitle = "Dashboard";
      icon = "bi bi-grid";
      break;
    case "/news":
      pageTitle = "All News";
      icon = "bi bi-newspaper";
      break;
    case "/notices":
      pageTitle = "All Notifications";
      icon = "bi bi-bell";
      break;
    case "/contact":
      pageTitle = "Contact";
      icon = "bi bi-envelope";
      break;
    case "/faq":
      pageTitle = "Frequently Asked Questions (F.A.Qs)";
      icon = "bi bi-question-circle";
      break;
    case "/settings":
      pageTitle = "Account Settings";
      icon = "bi bi-gear";
      break;
    case "/login":
      pageTitle = "Login";
      icon = "bi bi-person";
      disableSidebar = true; // Disable sidebar for login
      showHeader = false; // Hide header for login
      break;
    case "/register":
      pageTitle = "Register";
      icon = "bi bi-person-add";
      disableSidebar = true; // Disable sidebar for register
      showHeader = false; // Hide header for register
      break;
    case "/":
      pageTitle = "Home Page";
      icon = "bi bi-house-door";
      disableSidebar = true; // Disable sidebar for landing page
      showHeader = false; // Hide header for home
      showPageTitle = false; // Do not show PageTitle for home
      break;
    default:
      pageTitle = "Home";
      icon = "bi bi-exclamation-square";
  }

  return (
    <main
      className={`main ${disableSidebar ? "disable-sidebar" : ""} ${
        showHeader ? "with-header" : "without-header"
      }`}
      id="main"
    >
      {showHeader && <Header />}
      {showPageTitle && <PageTitle page={pageTitle} icon={icon} />}
      <Routes>
        <Route path="/" element={<LandingHero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<AllNews />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}

export default Main;
