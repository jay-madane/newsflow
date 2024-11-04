// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    let formErrors = {};
    if (!userDetails.email) formErrors.email = "Email is required";
    if (!userDetails.password) formErrors.password = "Password is required";

    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      setLoginError(""); // Clear previous login errors

      // Mock validation: Check if email and password match
      const registeredUser = localStorage.getItem("userDetails");
      if (registeredUser) {
        const { email, password } = JSON.parse(registeredUser);
        if (email === userDetails.email && password === userDetails.password) {
          navigate("/dashboard"); // Redirect to dashboard if credentials match
        } else {
          setLoginError("Invalid email or password"); // Set login error message
        }
      } else {
        setLoginError("No registered user found"); // Set error if no user is found
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
              {/* <h4 className="card-title">Login</h4> */}
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
                  <button type="submit" className="btn1  btn-gradient mb-2 p-2">
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
