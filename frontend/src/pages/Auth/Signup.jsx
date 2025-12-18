import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerByRole } from "../../services/AuthService";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phone: "", role: "user", adminKey: ""
  });
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminKeyField, setShowAdminKeyField] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (name === "role") setShowAdminKey(value === "admin");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, role, adminKey } = formData;
    if (!name || !email || !password) { toast.warn("Please fill all required fields!"); return; }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!emailRegex.test(email)) { toast.warn("Enter a valid email address!"); return; }
    if (!passwordRegex.test(password)) { toast.warn("Password must be at least 6 chars and include a number!"); return; }

    try {
      setLoading(true);
      if (role === "admin" && !adminKey) { toast.error("Admin key is required!"); setLoading(false); return; }
      const response = await registerByRole(role, { name, email, password, phone, adminKey });
      if (response.status === 200 || response.status === 201) {
        toast.success("Signup Successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const errorMessage = err.response?.data?.error || "Signup failed. Try again.";
      if (role === "admin" && errorMessage.toLowerCase().includes("admin")) {
        toast.error("Invalid admin key or password!", { type: "error" });
      } else {
        toast.error(errorMessage);
      }
    } finally { setLoading(false); }
  };

  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-box shadow-lg p-4 rounded bg-white">
        <h2 className="text-center mb-4 text-primary">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Full Name:</label>
            <input type="text" className="form-control" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Email:</label>
            <input type="email" className="form-control" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Phone:</label>
            <input type="tel" className="form-control" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="fw-semibold d-block">Select Role:</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="user" value="user" checked={formData.role === "user"} onChange={handleChange} />
              <label className="form-check-label" htmlFor="user">User</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="owner" value="owner" checked={formData.role === "owner"} onChange={handleChange} />
              <label className="form-check-label" htmlFor="owner">Owner</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="admin" value="admin" checked={formData.role === "admin"} onChange={handleChange} />
              <label className="form-check-label" htmlFor="admin">Admin</label>
            </div>
          </div>

          {showAdminKey && (
            <div className="form-group mb-3">
              <label className="fw-semibold">Admin Key:</label>
              <div className="input-group">
                <input
                  type={showAdminKeyField ? "text" : "password"}
                  className="form-control"
                  name="adminKey"
                  placeholder="Enter admin key"
                  value={formData.adminKey}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowAdminKeyField(!showAdminKeyField)}
                >
                  <i className={`bi ${showAdminKeyField ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>

          <p className="login-link text-center mt-3 mb-0">Already have an account? <a href="/login" className="text-decoration-none">Login here</a></p>
          <p className="home-link text-center mt-3 mb-0"><a href="/" className="text-decoration-none">Back to Home</a></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
