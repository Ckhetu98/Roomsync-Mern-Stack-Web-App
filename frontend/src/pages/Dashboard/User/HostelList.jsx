import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchAllHostels } from "../../../services/PropertyServices";
import axios from "axios";
import { getToken } from "../../../services/TokenService";
import { USER_API_URL } from "../../../utils/constants";

const HostelList = () => {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState({ checkInDate: "", durationMonths: 1 });
  const [detailsProperty, setDetailsProperty] = useState(null);

  const loadHostels = async () => {
    const data = await fetchAllHostels();
    setProperties(data);
  };

  useEffect(() => {
    loadHostels();
  }, []);

  const openBookingModal = (p) => {
    setSelected(p);
    new window.bootstrap.Modal("#bookingModal").show();
  };

  const openDetailsModal = (p) => {
    setDetailsProperty(p);
    new window.bootstrap.Modal("#detailsModal").show();
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return toast.warn("Please login first!", { autoClose: 1300 });

    try {
      await axios.post(`${USER_API_URL}/properties/book`, {
        propertyId: selected.id,
        checkInDate: booking.checkInDate,
        durationMonths: booking.durationMonths
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Booking request submitted!", { autoClose: 1300 });
      window.bootstrap.Modal.getInstance("#bookingModal").hide();
    } catch {
      toast.error("Booking failed!", { autoClose: 1300 });
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" />
      <h3 className="fw-bold text-black mb-4 d-flex align-items-center gap-2">
        <i className="bi bi-buildings"></i>
        Available Hostels
      </h3>

      <div className="row">
        {properties.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <img
                src={p.image || "https://placehold.co/400x200"}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5>{p.name}</h5>
                <p>
                  <i className="bi bi-geo-alt-fill text-danger"></i> {p.location}
                </p>
                <p>
                  <i className="bi bi-currency-rupee text-success"></i> {p.price}
                </p>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-info flex-fill"
                    onClick={() => openDetailsModal(p)}
                  >
                    <i className="bi bi-eye me-2"></i>
                    View Details
                  </button>
                  <button
                    className="btn btn-primary flex-fill"
                    onClick={() => openBookingModal(p)}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <div className="modal fade" id="bookingModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleBooking}>
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Confirm Booking</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>

              <div className="modal-body">
                <label className="form-label">Check-in Date</label>
                <input type="date" className="form-control mb-3"
                  onChange={(e) => setBooking({ ...booking, checkInDate: e.target.value })}
                  required />

                <label className="form-label">Duration (Months)</label>
                <input type="number" className="form-control" min="1" defaultValue="1"
                  onChange={(e) => setBooking({ ...booking, durationMonths: e.target.value })} />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <div className="modal fade" id="detailsModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">
                <i className="bi bi-building me-2"></i>
                {detailsProperty?.name}
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {detailsProperty && (
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={detailsProperty.image || "https://placehold.co/400x300"}
                      className="img-fluid rounded"
                      alt={detailsProperty.name}
                      style={{ width: "100%", height: "250px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-primary">{detailsProperty.name}</h5>
                    <p className="mb-2">
                      <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                      <strong>Location:</strong> {detailsProperty.location}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-currency-rupee text-success me-2"></i>
                      <strong>Price:</strong> ₹{detailsProperty.price}/month
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-people-fill text-info me-2"></i>
                      <strong>Capacity:</strong> {detailsProperty.capacity || 'N/A'} people
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-house-door text-warning me-2"></i>
                      <strong>Type:</strong> {detailsProperty.type || 'Hostel'}
                    </p>
                    {detailsProperty.description && (
                      <div className="mt-3">
                        <h6 className="text-secondary">Description:</h6>
                        <p className="text-muted">{detailsProperty.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  window.bootstrap.Modal.getInstance(document.getElementById('detailsModal')).hide();
                  openBookingModal(detailsProperty);
                }}
              >
                <i className="bi bi-check-circle me-2"></i>
                Book This Hostel
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HostelList;
