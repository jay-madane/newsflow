// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Cookies from "js-cookie"; // Import js-cookie
import "./login.css";

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(""); // State to hold login error message

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    let formErrors = {};
    if (!userDetails.email) formErrors.email = "Email is required";
    if (!userDetails.password) formErrors.password = "Password is required";

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      setSubmitted(true);
      setLoginError(""); // Clear previous login errors

      try {
        // Make the POST request to your backend
        const response = await fetch(
          "https://newsflowservices.vercel.app/api/v1/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: userDetails.email,
              password: userDetails.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Extract user info, accessToken, and refreshToken from the response
          const { user, accessToken, refreshToken } = data.data; // Destructure from data.data

          // Set cookies for accessToken and refreshToken
          Cookies.set("accessToken", accessToken, { expires: 7 }); // Set cookie to expire in 7 days
          Cookies.set("refreshToken", refreshToken, { expires: 7 }); // Set cookie to expire in 7 days

          // Optional: Store user information in local storage if needed
          localStorage.setItem("authToken", accessToken); // Store access token in localStorage
          localStorage.setItem("user", JSON.stringify(user)); // Store user information

          // Redirect to dashboard
          navigate("/dashboard");
        } else {
          // Handle failed login
          const errorData = await response.json();
          setLoginError(errorData.message || "Invalid email or password"); // Display backend error message
        }
      } catch (error) {
        console.error("Request error:", error);
        setLoginError("An error occurred. Please try again.");
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="card">
            <div className="card-body1">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <div className="d-flex flex-column align-items-center">
                  <button type="submit" className="btn1 btn-gradient mb-2 p-2">
                    Login
                  </button>
                  <button
                    type="button"
                    className="btn1 btn-primary"
                    onClick={() => navigate("/register")} // Navigate to /register
                  >
                    Don't have an account?
                  </button>
                </div>
                {loginError && (
                  <div className="mt-3 alert alert-danger" role="alert">
                    {loginError}
                  </div>
                )}
                {submitted && !loginError && (
                  <div className="mt-3 alert alert-success" role="alert">
                    Login successful!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
