import React, { useEffect, useState } from "react";
import "./settings.css";
import Cookies from "js-cookie";

const Settings = () => {
  const [profileImage, setProfileImage] = useState(
    `${process.env.PUBLIC_URL}/assets/items/default-profile.jpg`
  );
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    username: "",
    department: "",
    email: "",
    mobile: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [detailsChanged, setDetailsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.error("Access token not found in cookies.");
      return;
    }

    try {
      const response = await fetch(
        "https://newsflowservices.vercel.app/api/v1/users/getCurrentUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        const { fullName, username, department, email, avatar, mobile } =
          result.data;
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          fullName,
          username,
          department,
          email,
          mobile,
        }));
        setProfileImage(avatar);
      } else {
        console.error("Failed to fetch user details:", result.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditMode(false);
    setLoading(true);
    setMessage(null); // Reset message on new submission
    setErrorFields([]); // Reset error fields

    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.error("Access token not found in cookies.");
      return;
    }

    // Patch requests
    const patchRequests = [];

    if (avatarChanged) {
      const formData = new FormData();
      formData.append("avatar", profileImage);

      patchRequests.push(
        fetch(
          "https://newsflowservices.vercel.app/api/v1/users/updateUserAvatar",
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: formData,
          }
        ).then((response) => response.json())
      );
    }

    if (detailsChanged) {
      patchRequests.push(
        fetch(
          "https://newsflowservices.vercel.app/api/v1/users/updateAccountDetails",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              fullName: userDetails.fullName,
              email: userDetails.email,
              mobile: userDetails.mobile,
            }),
          }
        ).then((response) => response.json())
      );
    }

    if (
      userDetails.currentPassword &&
      userDetails.newPassword &&
      userDetails.confirmPassword
    ) {
      patchRequests.push(
        fetch(
          "https://newsflowservices.vercel.app/api/v1/users/changePassword",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              oldPassword: userDetails.currentPassword,
              newPassword: userDetails.newPassword,
            }),
          }
        ).then((response) => response.json())
      );
    }

    // Execute all PATCH requests
    try {
      const results = await Promise.all(patchRequests);
      let successCount = 0;

      results.forEach((result, index) => {
        if (result.success) {
          successCount++;
        } else {
          console.error("Failed to apply changes:", result.message);
          setErrorFields((prev) => [...prev, index]); // Track which requests failed
        }
      });

      // Clear password fields if any changes were successful
      if (successCount > 0) {
        setMessage("Changes applied successfully!");
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } else {
        setMessage("No changes were made.");
      }

      fetchUserDetails(); // Fetch updated user details
    } catch (error) {
      console.error("Error applying changes:", error);
      setMessage("Error applying changes. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });

    // Check if details have changed
    if (name === "fullName" || name === "email" || name === "mobile") {
      setDetailsChanged(true);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setAvatarChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (editMode) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }
    setEditMode(!editMode);
  };

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
                      className={`form-control ${
                        errorFields.includes(1) ? "is-invalid" : ""
                      }`}
                      id="fullName"
                      name="fullName"
                      value={userDetails.fullName}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
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
                      disabled
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
                      disabled
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
                      className={`form-control ${
                        errorFields.includes(2) ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        errorFields.includes(3) ? "is-invalid" : ""
                      }`}
                      id="mobile"
                      name="mobile"
                      value={userDetails.mobile}
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

              {loading && (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              {message && (
                <div className="alert alert-info mt-3">{message}</div>
              )}

              <div className="mb-3">
                {!editMode ? (
                  <button
                    type="button"
                    className="btn btn-gradient"
                    onClick={handleEditToggle}
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
                      onClick={handleEditToggle}
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
