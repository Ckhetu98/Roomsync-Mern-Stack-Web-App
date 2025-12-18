import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../services/TokenService";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const modal = new bootstrap.Modal(
      document.getElementById("logoutConfirm")
    );
    modal.show();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg text-white shadow-sm"
        style={{ background: "#0a435a" }}
      >
        <div className="container">
          {/* BRAND */}
          <Link
            className="navbar-brand fw-bold text-white d-flex align-items-center gap-2"
            to="/dashboard/admin"
          >
            <i className="bi bi-speedometer2"></i>
            Admin Panel
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-2"
                  to="/dashboard/admin/users"
                >
                  <i className="bi bi-people-fill"></i>
                  Manage Users
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-2"
                  to="/dashboard/admin/owners"
                >
                  <i className="bi bi-person-vcard-fill"></i>
                  Manage Owners
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold d-flex align-items-center gap-2"
                  to="/dashboard/admin/reports"
                >
                  <i className="bi bi-bar-chart-line-fill"></i>
                  Reports
                </Link>
              </li>

              {/* LOGOUT BTN */}
              <li className="nav-item d-flex align-items-center">
                <button
                  onClick={handleLogout}
                  className="btn btn-light btn-sm fw-semibold ms-lg-3 d-flex align-items-center gap-2"
                  style={{
                    color: "#0a435a",
                    borderRadius: "50px",
                    padding: "6px 14px",
                    fontWeight: 600,
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Logout Confirm Modal */}
      <div
        className="modal fade"
        id="logoutConfirm"
        tabIndex="-1"
        aria-labelledby="logoutConfirmLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold" id="logoutConfirmLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body text-center text-muted">
              Are you sure you want to logout?
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  removeToken();
                  navigate("/login");
                }}
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

export default DashboardNavbar;
