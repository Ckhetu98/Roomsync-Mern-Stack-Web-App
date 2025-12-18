import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { loginByRole } from "../../services/AuthService";
import { storeToken } from "../../services/TokenService";
import { AuthContext } from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginByRole(formData.role, formData);
      const { token, user } = res.data;

      if (token && user) {
        storeToken(token);
        login(user);
        toast.success("Login Successful!", { transition: Bounce });

        navigate(`/dashboard/${user.role}`, { replace: true });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Invalid credentials. Please try again.",
        { transition: Bounce }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-box shadow-lg p-4 rounded bg-white">
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="fw-semibold">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter password"
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
            <label className="fw-semibold d-block">Login As:</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="loginUser" value="user" checked={formData.role === "user"} onChange={handleChange} />
              <label className="form-check-label" htmlFor="loginUser">User</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="loginOwner" value="owner" checked={formData.role === "owner"} onChange={handleChange} />
              <label className="form-check-label" htmlFor="loginOwner">Owner</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="role" id="loginAdmin" value="admin" checked={formData.role === "admin"} onChange={handleChange} />
              <label className="form-check-label" htmlFor="loginAdmin">Admin</label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <a href="/signup" className="text-decoration-none">
              Sign Up
            </a>
          </p>
          <p className="text-center mt-2 mb-0">
            <a href="/" className="text-decoration-none">
              Back to Home
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
