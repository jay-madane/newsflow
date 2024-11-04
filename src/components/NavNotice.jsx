import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./nav.css";

function NavNotice() {
  return (
    <li className="nav-item dropdown">
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-primary badge-number">4</span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        {/* Dropdown Header */}
        <li className="dropdown-header">
          You have 4 new notifications!
          <Link to="/notices">
            <span className="badge rounded-pill bg-primary p-2 ms-2">
              View all
            </span>
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {/* Dropdown items */}
        <li className="notification-item">
          <i className="bi bi-exclamation-circle text-warning "></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
            <p>30 min. ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li className="notification-item">
          <i className="bi bi-check-circle text-success "></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Ipsum dolor sit amet.</p>
            <p>30 min. ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li className="notification-item">
          <i className="bi bi-x-circle text-danger "></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Lorem amet consectetur.</p>
            <p>30 min. ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        <li className="notification-item">
          <i className="bi bi-info-circle text-primary "></i>
          <div>
            <h4>Lorem Ipsum</h4>
            <p>Lorem ipsum dolor sit.</p>
            <p>30 min. ago</p>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        {/* Dropdown footer */}
        <li className="dropdown-footer">
          <Link to="/notices">Show all notifications</Link>
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;
