import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../services/TokenService";

const UserNavbar = () => {
  const navigate = useNavigate();
  const logoutModalRef = useRef(null);

  const openLogoutModal = () => {
    const modal = new window.bootstrap.Modal(logoutModalRef.current);
    modal.show();
  };

  const confirmLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg text-white" style={{ background: "#0a435aff" }}>
        <div className="container">
          <Link
            className="navbar-brand fw-bold text-white d-flex align-items-center gap-2"
            to="/dashboard/user"
          >
            <i className="bi bi-house-heart-fill"></i>
            RoomSync
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#userNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="userNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-1">

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-1"
                  to="/dashboard/user/hostellist"
                >
                  <i className="bi bi-building"></i>
                  Hostels
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-1"
                  to="/dashboard/user/bookings"
                >
                  <i className="bi bi-journal-check"></i>
                  Bookings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-1"
                  to="/dashboard/user/profile"
                >
                  <i className="bi bi-person-circle"></i>
                  Profile
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-1"
                  to="/dashboard/user/support"
                >
                  <i className="bi bi-headset"></i>
                  Support
                </Link>
              </li>

              <li className="nav-item">
                <button
                  onClick={openLogoutModal}
                  className="btn btn-light text-primary fw-semibold d-flex align-items-center gap-1 ms-lg-2"
                  style={{ borderRadius: "8px", padding: "5px 12px" }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Logout Modal */}
      <div
        className="modal fade"
        tabIndex="-1"
        ref={logoutModalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirm Logout
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <p className="mb-0">
                Are you sure you want to logout?
              </p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmLogout}
                data-bs-dismiss="modal"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
