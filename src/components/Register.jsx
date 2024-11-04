// Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login.css";

function Register() {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
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

  const handleSubmit = (event) => {
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
      console.log("Form submitted:", userDetails);

      // Save new user details
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
        })
      );

      // Set success message and redirect to login after a delay
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
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
