import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../services/TokenService";
import { toast } from "react-toastify";

const Earnings = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadEarnings = async () => {
      try {
        const token = getToken();
        const res = await axios.get("http://localhost:5000/owner/earnings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotal(res.data.total || 0);
      } catch {
        toast.error("Failed to load earnings");
      }
    };
    loadEarnings();
  }, []);

  return (
    <div className="container mt-60 p-4 ">
      <div
        className="d-flex justify-content-evenly align-items-center"
        style={{ gap: "10px" }}   // ✅ minimal gap
      >
        {/* ✅ Left — SVG image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1578/1578656.png"
          alt="rupee icon"
          style={{
            width: "250px",
            height: "260px",
            objectFit: "contain",
          }}
        />

        {/* ✅ Right — text */}
        <div>
          <h4 className="fw-bold text-dark mb-2">
            <i className="bi bi-cash-stack me-2"></i>
            Total Earnings
          </h4>
          <div className="display-6 fw-bold" style={{ color: "#0a435a" }}>
            ₹{Number(total)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
