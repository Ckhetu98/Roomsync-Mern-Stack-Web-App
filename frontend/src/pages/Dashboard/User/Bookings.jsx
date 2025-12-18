import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../../../services/TokenService";
import { USER_API_URL } from "../../../utils/constants";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${USER_API_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data || []);
    } catch {
      toast.error("Failed to load bookings!");
    }
  };

  const cancelBooking = async (id) => {
    try {
      const token = getToken();
      await axios.patch(
        `${USER_API_URL}/bookings/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Booking cancelled successfully!");
      fetchBookings();
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
      
      <h3 className="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
        <i className="bi bi-calendar2-check"></i>
        My Bookings
      </h3>

      <div className="row">
        {bookings.map((b) => (
          <div key={b.id} className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <img
                src={b.image || "https://placehold.co/400x200?text=No+Image"}
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
                alt={b.property_name}
              />

              <div className="card-body">
                <h5>{b.property_name}</h5>

                <p><i className="bi bi-geo-alt"></i> {b.location}</p>
                <p><i className="bi bi-currency-rupee"></i> {b.price}</p>

                <p>
                  Status:{" "}
                  <span style={getStatusStyle(b.status)}>{b.status}</span>
                </p>

                {b.status !== "cancelled" && (
                  <button
                    onClick={() => {
                      const modal = new window.bootstrap.Modal(document.getElementById('cancelModal'));
                      setCancelBookingId(b.id);
                      modal.show();
                    }}
                    className="btn btn-outline-danger w-100 mt-3 d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-secondary text-center mt-4">No bookings found.</p>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <div className="modal fade" id="cancelModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Cancel Booking
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">Are you sure you want to cancel this booking?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                No, Keep Booking
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  cancelBooking(cancelBookingId);
                  const modal = window.bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
                  modal.hide();
                }}
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
