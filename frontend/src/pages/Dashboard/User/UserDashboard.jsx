import React from "react";
import { Routes, Route } from "react-router-dom";
import UserNavbar from "../../../components/layout/UserNavbar";
import HostelList from "./HostelList";
import Bookings from "./Bookings";
import Profile from "./Profile";
import Support from "./Support";

const UserDashboard = () => {
  return (
    <>
      {/* ✅ Navbar stays fixed */}
      <UserNavbar />

      <div
        className="d-flex flex-column min-vh-100 pt-5"
        style={{
          background: "linear-gradient(145deg, #f8fbff, #e9f4ff)",
        }}
      >
        <div className="container flex-grow-1 mt-4">
          <h2
            className="fw-bold mb-4 d-flex align-items-center gap-2"
            style={{ color: "#22313f" }}
          >
            <i className="bi bi-grid"></i>
            User Dashboard
          </h2>

          {/* ✅ Page Routes */}
          <Routes>
            {/* ✅ Default Landing Page */}
            <Route
              index
              element={
                <div
                  className="fade-in rounded-4 shadow-sm p-4 mb-5 d-flex align-items-center justify-content-between flex-wrap"
                  style={{
                    background: "linear-gradient(135deg, #e9fbff, #f9fdff)",
                    gap: "10px",
                  }}
                >
                  {/* ✅ Left — Illustration */}
                  <div>
                    <img
                      src="https://www.thebalancemoney.com/thmb/ldnz5De1NzF4D99x5TdM9COhkDg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1192190068-5dd5049f63ce4dd8848bc7dc296db091.jpg"
                      alt="user-illustration"
                      style={{
                        width: "560px",
                        maxWidth: "100%",
                        filter: "drop-shadow(0px 3px 8px #c2dbe5)",
                      }}
                    />
                  </div>

                  {/* ✅ Right — Text */}
                  <div style={{ textAlign: "left", maxWidth: "350px" }}>
                    <h3 className="fw-bold mb-2" style={{ color: "#0a4360" }}>
                      Welcome to RoomSync
                    </h3>

                    <p className="text-muted mb-3" style={{ fontSize: "15px" }}>
                      Discover & book the best hostel spaces easily.
                    </p>

                    {/* ✅ Buttons */}
                    <div className="d-flex gap-2">
                      <a
                        className="btn px-4 rounded-pill"
                        href="/dashboard/user/hostellist"
                        style={{
                          background: "#0a435a",
                          color: "white",
                          border: "none",
                        }}
                      >
                        Explore Hostels
                      </a>

                      <a
                        className="btn btn-outline-secondary px-4 rounded-pill"
                        href="/dashboard/user/bookings"
                      >
                        My Bookings
                      </a>
                    </div>
                  </div>
                </div>
              }
            />

            {/* ✅ Other Pages */}
            <Route path="hostellist" element={<HostelList />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="support" element={<Support />} />
          </Routes>
        </div>

        {/* ✅ Sticky Footer */}
        <footer
          className="text-white text-center py-3 mt-auto shadow-sm"
          style={{ background: "#0a435a" }}
        >
          © {new Date().getFullYear()} RoomSync — All rights reserved
        </footer>
      </div>

      {/* ✅ Animation CSS */}
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

export default UserDashboard;
