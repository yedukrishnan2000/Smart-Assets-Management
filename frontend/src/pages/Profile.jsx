import React, { useEffect, useState } from "react";
import { getCurrentUser, changePassword } from "../services/api";
import Layout from "../components/Layout";

const Profile = () => {
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    getCurrentUser().then((res) => setUser(res.data));
  }, []);

  const handleChangePassword = () => {
    changePassword({
      old_password: oldPassword,
      new_password: newPassword,
    })
      .then(() => {
        alert("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      })
      .catch(() => alert("Password change failed"));
  };

  const getRole = () => {
    if (user.is_staff) return "ADMIN";
    if (user.groups && user.groups.includes("Technician"))
      return "TECHNICIAN";
    return "EMPLOYEE";
  };

  const getRoleBadge = () => {
    const role = getRole();
    if (role === "ADMIN") return "badge bg-danger";
    if (role === "TECHNICIAN") return "badge bg-warning text-dark";
    return "badge bg-primary";
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="mb-4 text-center">Profile</h3>

              {/* USER INFO */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Username
                </label>
                <div className="form-control bg-light">
                  {user.username}
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Role
                </label>
                <div>
                  <span className={getRoleBadge()}>
                    {getRole()}
                  </span>
                </div>
              </div>

              <hr />

              {/* CHANGE PASSWORD */}
              <h5 className="mb-3">Change Password</h5>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />
              </div>

              <div className="d-grid mb-4">
                <button
                  className="btn btn-primary"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>

              <hr />

              {/* LOGOUT */}
              <div className="d-grid">
                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Profile;
