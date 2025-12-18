import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto w-100">
      <div className="container text-center">
        <h5 className="text-info fw-bold">Contact Us</h5>
        <p className="text-secondary mb-1">
          Have questions? Reach out at{" "}
          <a href="mailto:info@roomsync.com" className="text-info text-decoration-none">
            info@roomsync.com
          </a>
        </p>

        <hr className="border-secondary" />

        <p className="text-secondary small mb-0">
          © {new Date().getFullYear()} RoomSync. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
