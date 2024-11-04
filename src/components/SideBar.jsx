import React from "react";
import { NavLink } from "react-router-dom";
import "./sideBar.css";
import pageList from "../data/PageItem";

function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink
            exact="true"
            to="/dashboard"
            className="nav-link"
            activeClassName="active"
          >
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/news" className="nav-link " activeClassName="active">
            <i className="bi bi-newspaper"></i>
            <span>All News</span>
          </NavLink>
        </li>

        {/* Pages Items */}
        <li className="nav-heading">Pages</li>
        {/* <li className="nav-item">
          <NavLink
            to="/profile"
            className="nav-link collapsed"
            activeClassName="active"
          >
            <i className="bi bi-person"></i>
            <span>Profile</span>
          </NavLink>
        </li> */}
        {pageList.map((item) => (
          <li className="nav-item" key={item._id}>
            <NavLink
              to={item.path}
              className="nav-link collapsed"
              activeClassName="active"
            >
              <i className={item.icon}></i>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
