import React, { useState } from "react";
import "../styles/LoginModal.css";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${email}`);
    onClose(); // Close modal after login
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container animate-pop">
        <h3 className="text-center mb-3 text-primary fw-bold">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100 mt-2" type="submit">
            Login
          </button>
        </form>
        <button className="btn btn-outline-danger w-100 mt-3" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
