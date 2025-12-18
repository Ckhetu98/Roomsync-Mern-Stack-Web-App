import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import LoginModal from "./LoginModal";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleCloseModal = () => setShowLogin(false);

  return (
    <div className={`home-page ${showLogin ? "blurred" : ""}`}>
      <div className="overlay">
        <div className="content text-center">
          <h1>
            Welcome to <span className="highlight">RoomSync</span>
          </h1>
          <p>Find, connect, and stay — all in one place.</p>
          <div className="mt-4 d-flex justify-content-center gap-3">
             <Link to="/login" className="btn btn-outline-light px-4 py-2">
              Log In
            </Link>
            <Link className="btn btn-primary px-4" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Show modal only when "Login" is clicked */}
      {showLogin && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Home;
