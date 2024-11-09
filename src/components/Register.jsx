// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

function Register() {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    department: "",
    profileImage: `${process.env.PUBLIC_URL}/assets/items/default-profile.jpg`,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails({
          ...userDetails,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    let formErrors = {};
    if (!userDetails.fullName) formErrors.fullName = "Full Name is required";
    if (!userDetails.email) formErrors.email = "Email is required";
    if (!userDetails.password) formErrors.password = "Password is required";
    if (userDetails.password !== userDetails.confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    if (!userDetails.phoneNumber)
      formErrors.phoneNumber = "Phone Number is required";
    if (!userDetails.department)
      formErrors.department = "Department is required";

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      setSubmitted(true);

      // Create FormData object to handle file and text data
      const formData = new FormData();
      formData.append("avatar", userDetails.profileImage); // Append image file
      formData.append("email", userDetails.email);
      formData.append("fullName", userDetails.fullName);
      formData.append("department", userDetails.department);
      formData.append("password", userDetails.password);
      formData.append("username", userDetails.username); // Example username
      formData.append("mobile", userDetails.phoneNumber);

      try {
        // Make the POST request
        const response = await fetch(
          "https://newsflowservices.vercel.app/api/v1/users/register",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Store user details in localStorage for login
          const userToStore = {
            email: userDetails.email,
            username: userDetails.username,
            password: userDetails.password, // Storing plain password is not secure, consider using a hashed password or a token in a real application
            fullName: userDetails.fullName,
            phoneNumber: userDetails.phoneNumber,
            department: userDetails.department,
            profileImage: userDetails.profileImage,
          };

          localStorage.setItem("userDetails", JSON.stringify(userToStore)); // Save user details to localStorage

          setSuccessMessage("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Redirect after 2 seconds
        } else {
          // Handle error responses
          const errorData = await response.json();
          console.error("Error:", errorData);
          setErrors({ server: "Registration failed. Please try again." });
        }
      } catch (error) {
        // console.error("Request error:", error);
        setErrors({ server: "An error occurred. Please try again." });
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Sample departments list for dropdown
  const departments = [
    "Ministry of Sports",
    "Ministry of Healthcare",
    "Ministry of Business",
    "Ministry of Politics",
    "Ministry of Laws",
    "Ministry of Entertainment",
    "Ministry of Weather",
    "Ministry of Technology",
  ];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-body1">
              {/* <h4 className="card-title">Register</h4> */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-center">
                  <img
                    src={userDetails.profileImage}
                    alt="Profile"
                    className="profile-img"
                  />
                  <input
                    type="file"
                    className="form-control mt-3"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <small className="text-danger">{errors.fullName}</small>
                  )}
                </div>
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
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <small className="text-danger">{errors.username}</small>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userDetails.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userDetails.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber && (
                    <small className="text-danger">{errors.phoneNumber}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <select
                    className="form-select"
                    id="department"
                    name="department"
                    value={userDetails.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <small className="text-danger">{errors.department}</small>
                  )}
                </div>
                <div className="d-flex flex-column align-items-center">
                  <button type="submit" className="btn1 btn-gradient mb-2 p-2">
                    Register
                  </button>
                  <button
                    type="button"
                    className="btn1 btn-primary"
                    onClick={() => navigate("/login")} // Navigate to /login
                  >
                    Already have an account?
                  </button>
                </div>
                {successMessage && (
                  <div className="mt-3 alert alert-success" role="alert">
                    {successMessage}
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

export default Register;
