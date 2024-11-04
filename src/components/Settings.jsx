import React, { useState } from "react";
import "./settings.css";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(
    `${process.env.PUBLIC_URL}/assets/items/messages-1.jpg`
  );
  const [userDetails, setUserDetails] = useState({
    fullName: "Amea Doe",
    department: "Public Relations",
    email: "johndoe@example.com",
    phoneNumber: "+91 9876543210",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEditMode(false);
    console.log("Form submitted with changes:", userDetails);
    // Reset password fields after submission (for illustration)
    setUserDetails({
      ...userDetails,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

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
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //departments list for dropdown
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
      <div className="mb-4">
        <h4>Profile</h4>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-3">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-img"
                  />
                  {editMode && (
                    <div className="mb-3 mt-2">
                      <label htmlFor="imageUpload" className="form-label">
                        Change Profile Photo
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-9">
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
                      disabled={!editMode}
                    />
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
                      disabled={!editMode}
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
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
                      disabled
                    />
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
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div className="mb-4">
                <h4>Password Change</h4>
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor="currentPassword" className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                      value={userDetails.currentPassword}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                      value={userDetails.newPassword}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={userDetails.confirmPassword}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                {!editMode ? (
                  <button
                    type="button"
                    className="btn btn-gradient"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div>
                    <button type="submit" className="btn btn-gradient me-2">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-gradient"
                      onClick={() => {
                        setEditMode(false);
                        // Reset password fields on cancel (for illustration)
                        setUserDetails({
                          ...userDetails,
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
