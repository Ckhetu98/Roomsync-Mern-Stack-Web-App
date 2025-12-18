import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DashboardNavbar from "../../../components/layout/DashboardNavbar";
import ManageOwners from "./ManageOwners";
import ManageUsers from "./ManageUsers";
import Reports from "./Reports";

const AdminDashboard = () => {
  return (
    <>
      {/*  Navbar */}
      <DashboardNavbar />

      {/*  Page Wrapper */}
      <div
        className="d-flex flex-column min-vh-100 pt-5"
        style={{
          background: "linear-gradient(145deg, #f8fbff, #e9f4ff)",
        }}
      >
        <div className="container flex-grow-1 mt-4">

          {/*  HERO SECTION */}
          <div
            className="fade-in rounded-4 shadow-sm p-4 mb-5 position-relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #e9fbff, #f9fdff)",
            }}
          >
            <div className="row align-items-center">

              {/* ✅ Left — Image */}
              <div className="col-md-6 text-center">
                <img
                  src="https://img.freepik.com/premium-vector/illustration-administrator-assistant-concept-with-businessman-admin-working-office-desk_675567-3117.jpg"
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    opacity: 0.95,
                    filter: "drop-shadow(0px 3px 10px #c2dbe5)"
                  }}
                />
              </div>

              {/* ✅ Right — Text */}
              <div className="col-md-6 text-md-start text-center mt-4 mt-md-0">
                <h2 className="fw-bold" style={{ color: "#0a4360" }}>
                  Welcome, Admin 👋
                </h2>
                <p className="text-muted">
                  Manage platform owners, users & reports effortlessly.
                </p>

                {/* ✅ Quick Actions */}
                <div className="d-flex gap-3 justify-content-md-start justify-content-center mt-3">
                  <Link
                    className="btn px-4 rounded-pill"
                    to="/dashboard/admin/owners"
                    style={{
                      background: "#0a435a",
                      color: "white",
                    }}
                  >
                    Manage Owners
                  </Link>

                  <Link
                    className="btn btn-outline-secondary px-4 rounded-pill"
                    to="/dashboard/admin/users"
                  >
                    Manage Users
                  </Link>
                </div>
              </div>
            </div>

            {/* ✅ Decorative SVG bottom */}
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "70px",
              }}
            >
              <path
                d="M0,40 C150,150 350,0 500,100 L500,150 L0,150 Z"
                style={{ fill: "#0a435a22" }}
              ></path>
            </svg>
          </div>

          {/* ✅ ROUTES */}
          <Routes>
            <Route path="owners" element={<ManageOwners />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>

        {/* ✅ Sticky Footer */}
        <footer
          className="text-white text-center py-3 mt-auto shadow-sm"
          style={{ background: "#0a435a" }}
        >
          © {new Date().getFullYear()} RoomSync — Admin Panel
        </footer>
      </div>

      {/* ✅ Fade animation */}
      <style>{`
        .fade-in {
          animation: fadeIn 0.7s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;