// src/pages/Dashboard/User/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../services/TokenService";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", password: "" });

  const token = getToken();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
      setForm({
        name: res.data.user.name,
        phone: res.data.user.phone,
        password: ""
      });
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateProfile = async () => {
    try {
      await axios.patch("http://localhost:5000/user/me", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!", { autoClose: 1200 });
      setEditMode(false);
      fetchProfile();
    } catch {
      toast.error("Update failed");
    }
  };

  if (!profile) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      {/*  ✅ Keeps footer bottom without shrinking */}

      <div className="container flex-grow-1 d-flex justify-content-center align-items-start pt-5">
        {/* ✅ align-items-start prevents shrinking */}

        <div
          className="card shadow-lg p-4 mb-5"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <div className="text-center mb-3">
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px", margin: "auto", fontSize: "30px" }}
            >
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <h4 className="fw-bold mt-3">{profile.name}</h4>
            <span className="badge bg-secondary text-uppercase">
              {profile.role}
            </span>
          </div>

          {!editMode ? (
            <>
              <div className="border rounded p-3 mb-4">
                <p className="mb-2">
                  <b>Email:</b> {profile.email}
                </p>
                <p className="mb-2">
                  <b>Phone:</b> {profile.phone || "Not Provided"}
                </p>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={() => setEditMode(true)}
              >
                <i className="bi bi-pencil-square me-2"></i>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">
                  <b>Name</b>
                </label>
                <input
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <b>Phone</b>
                </label>
                <input
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  <b>New Password (Optional)</b>
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success w-50"
                  onClick={updateProfile}
                >
                  <i className="bi bi-save me-2"></i> Save
                </button>
                <button
                  className="btn btn-secondary w-50"
                  onClick={() => setEditMode(false)}
                >
                  <i className="bi bi-x-circle me-2"></i> Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
