import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";
import { getToken } from "../../../services/TokenService";
import { toast, ToastContainer } from "react-toastify";

const CreateProperty = () => {
  const [form, setForm] = useState({
    name: "", location: "", price: "", type: "Boys",
    occupancy: "Single", description: "", image: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();

      await axios.post(`${API_BASE_URL}/owner/properties`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Property created successfully!", { autoClose: 1200 });

      setForm({
        name: "", location: "", price: "", type: "Boys",
        occupancy: "Single", description: "", image: ""
      });

    } catch {
      toast.error(" Failed to create property");
    }
  };

  return (
    <div className="col-md-8 mx-auto">
      <div className="card p-4 shadow-sm">
        <h4 className="fw-bold mb-3 text-dark">
          <i className="bi bi-plus-circle me-2"></i>Add Property
        </h4>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" className="form-control mb-2"
            value={form.name} onChange={handleChange} required />

          <input name="location" placeholder="Location" className="form-control mb-2"
            value={form.location} onChange={handleChange} required />

          <input name="price" placeholder="Price" type="number" className="form-control mb-2"
            value={form.price} onChange={handleChange} required />

          <select name="type" className="form-select mb-2"
            value={form.type} onChange={handleChange}>
            <option>Boys</option>
            <option>Girls</option>
            <option>Co-living</option>
          </select>

          <select name="occupancy" className="form-select mb-2"
            value={form.occupancy} onChange={handleChange}>
            <option>Single</option>
            <option>Double</option>
            <option>Triple</option>
            <option>Multiple</option>
          </select>

          <textarea name="description" placeholder="Description"
            className="form-control mb-3" rows="3"
            value={form.description} onChange={handleChange} />

          <input name="image" placeholder="Image URL" className="form-control mb-3"
            value={form.image} onChange={handleChange} />

          <button className="btn w-100 text-white"
            style={{ background: "#0a435a" }}>
             Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateProperty;
