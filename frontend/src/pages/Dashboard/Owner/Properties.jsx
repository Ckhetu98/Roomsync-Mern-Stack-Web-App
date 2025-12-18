import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../services/TokenService";
import { toast, ToastContainer } from "react-toastify";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    type: "Boys",
    occupancy: "Single",
    description: "",
    image: "",
  });

  const token = getToken();

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/owner/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data.properties || []);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load properties", { autoClose: 1500 });
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/owner/properties/${editingId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Property updated!", { autoClose: 1200 });
      } else {
        await axios.post("http://localhost:5000/owner/properties", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Property created successfully!", { autoClose: 1200 });
      }

      setForm({
        name: "",
        location: "",
        price: "",
        type: "Boys",
        occupancy: "Single",
        description: "",
        image: "",
      });
      setEditingId(null);
      fetchProperties();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Operation failed", { autoClose: 1200 });
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      location: p.location,
      price: p.price,
      type: p.type,
      occupancy: p.occupancy,
      description: p.description,
      image: p.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDeleteModal = (id) => {
    setDeleteId(id);
    const modal = new window.bootstrap.Modal(
      document.getElementById("deletePropertyModal")
    );
    modal.show();
  };

  const performDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/owner/properties/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.info("Property deleted", { autoClose: 1200 });
      fetchProperties();
      setDeleteId(null);

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyModal")
      );
      modal.hide();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed", { autoClose: 1200 });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      location: "",
      price: "",
      type: "Boys",
      occupancy: "Single",
      description: "",
      image: "",
    });
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" />
      <h4 className="fw-bold text-black mb-3">
        {editingId ? (
          <>
            <i className="bi bi-pencil-square me-2" />
            Edit Property
          </>
        ) : (
          <>
            <i className="bi bi-house-add me-2" />
            Add Property
          </>
        )}
      </h4>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          {["name", "location", "price"].map((f) => (
            <div className="col-md-4" key={f}>
              <input
                name={f}
                value={form[f]}
                onChange={handleChange}
                className="form-control"
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                required
              />
            </div>
          ))}

          <div className="col-md-3">
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-select"
            >
              <option>Boys</option>
              <option>Girls</option>
              <option>Co-living</option>
            </select>
          </div>

          <div className="col-md-3">
            <select
              name="occupancy"
              value={form.occupancy}
              onChange={handleChange}
              className="form-select"
            >
              <option>Single</option>
              <option>Double</option>
              <option>Triple</option>
              <option>Multiple</option>
            </select>
          </div>

          <div className="col-md-12">
            <textarea
              name="description"
              rows="2"
              value={form.description}
              onChange={handleChange}
              className="form-control"
              placeholder="Description"
            />
          </div>

          <div className="col-md-6">
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="form-control"
            />
          </div>

          <div className="col-md-12 text-end">
            <button className="btn btn-primary me-2">
              {editingId ? "Update Property" : "Submit"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <h5 className="fw-bold text-grey mb-3">
        <i className="bi bi-card-checklist me-2" />
        Your Properties
      </h5>

      <div className="row">
        {properties.length === 0 ? (
          <div className="alert alert-info text-center">No properties yet.</div>
        ) : (
          properties.map((p) => (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image || "https://placehold.co/400x200"}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={p.name}
                />

                <div className="card-body">
                  <h6 className="fw-bold">{p.name}</h6>
                  <p>
                    <i className="bi bi-geo-alt-fill text-danger"></i>{" "}
                    {p.location}
                  </p>
                  <p>
                    <i className="bi bi-currency-rupee text-success"></i>{" "}
                    {p.price}
                  </p>

                  <div className="d-flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="btn btn-sm btn-outline-primary w-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteModal(p.id)}
                      className="btn btn-sm btn-outline-danger w-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className="modal fade"
        id="deletePropertyModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              Are you sure you want to delete this property?
            </div>

            <div className="modal-footer">
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
                onClick={performDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
