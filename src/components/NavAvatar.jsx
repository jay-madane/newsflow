import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure to import js-cookie if needed for the token

function NavAvatar() {
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Check local storage for user details
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (storedUserDetails) {
      // If user details are found in local storage, set them to state
      setUserDetails(storedUserDetails);
      setLoading(false);
    } else {
      // If not found, make a GET request to fetch user details
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(
            "https://newsflowservices.vercel.app/api/v1/users/getCurrentUser",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("accessToken")}`, // Assuming you are using a Bearer token
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUserDetails(data.data); // Set the user details to state
            localStorage.setItem("userDetails", JSON.stringify(data.data)); // Store in local storage for future use
          } else {
            console.error("Failed to fetch user details:", response.statusText);
            setUserDetails(null); // Reset to null if there's an error
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          setUserDetails(null); // Reset to null on error
        } finally {
          setLoading(false); // Set loading to false after request completes
        }
      };

      fetchUserDetails(); // Call the function to fetch user details
    }
  }, []); // Run effect on component mount

  // Fallback in case userDetails is not available
  const userName = userDetails
    ? `${userDetails.fullName.charAt(0)}. ${userDetails.fullName
        .split(" ")
        .pop()}` // Format: A. Jaiswal
    : "User"; // Display "User" if details are not available

  const departmentName = userDetails
    ? `${userDetails.department.toUpperCase()} DEPARTMENT` // Convert to uppercase and add "DEPARTMENT"
    : "DEPARTMENT"; // Fallback for department

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-icon nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <i className="bi bi-person-circle"></i>
        <span className="d-none d-md-block dropdown-toggle ps-2">
          {userName}
        </span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        {/* Profile Header */}
        <li className="dropdown-header align-item-center">
          <h6>{userDetails ? userDetails.fullName : "User"}</h6>
          <span>{departmentName}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>

        {/* Profile items */}
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

export default NavAvatar;
