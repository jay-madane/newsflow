import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie"; // Make sure to import js-cookie if needed for the token

function NavAvatar() {
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check local storage for user details
    const storedUserDetails = JSON.parse(localStorage.getItem("user"));

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
            localStorage.setItem("user", JSON.stringify(data.data)); // Store in local storage for future use
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
  }, []); 

  const handleSignOut = async () => {
    try {
      const response = await fetch("https://newsflowservices.vercel.app/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        credentials: "include", // Include cookies with the request
      });

      if (response.ok) {
        Cookies.remove("accessToken"); // Clear client-side access token
        localStorage.removeItem("user"); // Clear user details from local storage
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };



  const userName = userDetails
    ? `${userDetails.fullName.charAt(0) || userDetails.fullName}. ${userDetails.fullName
        .split(" ")
        .pop()}` 
    : "User"; // Display "User" if details are not available

  const departmentName = userDetails
    ? `${userDetails.department.toUpperCase()} DEPARTMENT` // Convert to uppercase and add "DEPARTMENT"
    : "DEPARTMENT"; // Fallback for department

  if (loading) {
    return <div>Loading...</div>; 
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
        <button
            className="dropdown-item d-flex align-items-center"
            onClick={handleSignOut}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </li>
  );
}

export default NavAvatar;
