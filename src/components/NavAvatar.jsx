import React from "react";
import { NavLink } from "react-router-dom";
// import profileImg from "../assets/items/messages-1.jpg"; // Updated image path

const profileImg = `${process.env.PUBLIC_URL}/assets/items/messages-1.jpg`;

function NavAvater() {
  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-icon nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <i class="bi bi-person-circle"></i>
        {/* <img src={profileImg} alt="Profile" className="rounded-circle" /> */}
        <span className="d-none d-md-block dropdown-toggle ps-2">F. David</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        {/* Profile Header */}
        <li className="dropdown-header  align-item-center">
          <h6>David</h6>
          <span>Web Developer</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        {/* Profile items */}
        {/* <li>
          <NavLink
            className="dropdown-item d-flex align-items-center"
            to="/profile"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </NavLink>
        </li> */}
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <NavLink
            className="dropdown-item d-flex align-items-center"
            to="/settings"
          >
            <i className="bi bi-gear"></i>
            <span>Account Settings</span>
          </NavLink>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <NavLink
            className="dropdown-item d-flex align-items-center"
            to="/faq"
          >
            <i className="bi bi-question-circle"></i>
            <span>Need Help?</span>
          </NavLink>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li>
          <a className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
}

export default NavAvater;
