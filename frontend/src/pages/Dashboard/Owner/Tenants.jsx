import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../services/TokenService";
import { ToastContainer, toast } from "react-toastify";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const token = getToken();

  const loadTenants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/owner/tenants", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTenants(res.data.tenants || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load tenants", { autoClose: 1200 });
    }
  };

  useEffect(() => {
    loadTenants();
  }, []);

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/owner/bookings/${bookingId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Status updated to: ${status}`, { autoClose: 1200 });
      loadTenants();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status", { autoClose: 1200 });
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return {
          backgroundColor: "#28a745",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontWeight: "600",
          textTransform: "capitalize",
          border: "none",
          boxShadow: "0 2px 4px rgba(40, 167, 69, 0.3)"
        };
      case "pending":
        return {
          backgroundColor: "#ffc107",
          color: "#212529",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontWeight: "600",
          textTransform: "capitalize",
          border: "none",
          boxShadow: "0 2px 4px rgba(255, 193, 7, 0.3)"
        };
      case "cancelled":
        return {
          backgroundColor: "#dc3545",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontWeight: "600",
          textTransform: "capitalize",
          border: "none",
          boxShadow: "0 2px 4px rgba(220, 53, 69, 0.3)"
        };
      default:
        return {
          backgroundColor: "#6c757d",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontWeight: "600",
          textTransform: "capitalize",
          border: "none",
          boxShadow: "0 2px 4px rgba(108, 117, 125, 0.3)"
        };
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" />

      {/* ✅ Heading updated (icon + black text) */}
      <h3 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
        <i className="bi bi-people-fill"></i> Tenants / Bookings
      </h3>

      {tenants.length === 0 ? (
        <div className="alert alert-info text-center">No bookings yet.</div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover text-center align-middle mb-0">
            <thead style={{
              background: "linear-gradient(135deg, #0a435a, #3282b8)",
              color: "white"
            }}>
              <tr>
                <th>#</th>
                <th>Tenant</th>
                <th>Email</th>
                <th>Property</th>
                <th>Check-in</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Change</th>
              </tr>
            </thead>

            <tbody>
              {tenants.map((t, i) => (
                <tr key={t.booking_id}>
                  <td>{i + 1}</td>
                  <td>{t.tenant_name}</td>
                  <td>{t.tenant_email}</td>
                  <td>{t.property_name}</td>
                  <td>
                    {t.check_in_date
                      ? new Date(t.check_in_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>₹{t.total_amount}</td>

                  <td>
                    <span style={getStatusStyle(t.status)}>
                      {t.status}
                    </span>
                  </td>

                  <td>
                    <select
                      className="form-select"
                      value={t.status}
                      onChange={(e) => updateStatus(t.booking_id, e.target.value)}
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e9ecef",
                        padding: "8px 12px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        backgroundColor: "#f8f9fa",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0a435a";
                        e.target.style.boxShadow = "0 0 0 0.2rem rgba(10, 67, 90, 0.25)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e9ecef";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Reject</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default Tenants;
