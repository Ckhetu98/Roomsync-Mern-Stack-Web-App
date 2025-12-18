import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import OwnerNavbar from "../../../components/layout/OwnerNavbar";
import Properties from "./Properties";
import Tenants from "./Tenants";
import Earnings from "./Earnings";
import CreateProperty from "./CreateProperty";

const OwnerDashboard = () => {
  const [ownerName, setOwnerName] = useState("Owner");

  useEffect(() => {
    const storedName = localStorage.getItem("ownerName");
    if (storedName) setOwnerName(storedName);
  }, []);

  return (
    <>
      {/* ✅ Top Navbar for owner */}
      <OwnerNavbar />

      {/* ✅ Dashboard Wrapper */}
      <div className="d-flex flex-column min-vh-100">

        {/* ✅ Main Content */}
        <div className="container mt-5 pt-3 flex-grow-1">

          <Routes>

            {/* ✅ DEFAULT LANDING SCREEN */}
            <Route
              index
              element={
                <div
                  className="fade-in rounded-4 shadow-sm p-4 mb-5 text-center position-relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #e9fbff, #f9fdff)",
                  }}
                >
                  {/* ✅ Personalized text */}
                  <h2 className="fw-bold" style={{ color: "#0a4360" }}>
                    Welcome back, {ownerName}! 👋
                  </h2>
                  <p className="text-muted">
                    Manage properties, tenants & earnings at one place.
                  </p>

                  {/* ✅ SVG Illustration */}
                  <div className="mt-3">
                    <img
                      src="https://cdn.undraw.co/illustrations/package-arrived_twqd.svg"
                      alt="owner panel"
                      style={{
                        width: "330px",
                        opacity: 0.9,
                        filter: "drop-shadow(0px 3px 8px #c2dbe5)",
                      }}
                    />
                  </div>

                  {/* ✅ Quick Actions */}
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Link
                      className="btn px-4 rounded-pill"
                      to="createproperty"
                      style={{
                        background: "#0a435a",
                        color: "white",
                        border: "none",
                        textDecoration: "none",
                      }}
                    >
                      Add Property
                    </Link>

                    <Link
                      className="btn btn-outline-secondary px-4 rounded-pill"
                      to="properties"
                      style={{ textDecoration: "none" }}
                    >
                      Manage Property
                    </Link>
                  </div>

                  {/* ✅ Bottom soft shape */}
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
              }
            />

            {/* ✅ Other Pages */}
            <Route path="createproperty" element={<CreateProperty />} />
            <Route path="properties" element={<Properties />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="earnings" element={<Earnings />} />
          </Routes>
        </div>

        {/* ✅ Sticky Footer */}
        <footer
          className="text-white text-center py-3 mt-auto"
          style={{ background: "#0a435a" }}
        >
          © {new Date().getFullYear()} RoomSync — All rights reserved
        </footer>
      </div>

      {/* ✅ Animation Styling */}
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

export default OwnerDashboard;
