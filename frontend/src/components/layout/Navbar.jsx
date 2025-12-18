import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => { if (window.scrollY > 50) setScrolled(true); else setScrolled(false); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
  if (hideNavbar) return null;

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-solid" : "navbar-transparent"}`}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">RoomSync</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/aboutus">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contactus">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
