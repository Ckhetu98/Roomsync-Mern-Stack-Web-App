import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../services/TokenService";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    const token = getToken();
    try {
      const res = await axios.get("http://localhost:5000/owner/myproperties", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    const token = getToken();
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`http://localhost:5000/owner/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Property deleted successfully");
      fetchProperties();
    } catch (err) {
      alert("Failed to delete property");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  if (loading) return <p>Loading your properties...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-primary fw-bold">My Properties</h4>
        <a href="/dashboard/owner/add-property" className="btn btn-success">
          + Add New Property
        </a>
      </div>

      {properties.length === 0 ? (
        <div className="alert alert-info">You haven't added any properties yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Occupancy</th>
                <th>Price (₹)</th>
                <th>Rating</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        width="70"
                        height="50"
                        style={{ objectFit: "cover", borderRadius: "5px" }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.location}</td>
                  <td>{p.type}</td>
                  <td>{p.occupancy}</td>
                  <td>{Number(p.price).toFixed(2)}</td>
                  <td>{p.rating || "–"}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.available ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {p.available ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <a
                      href={`/dashboard/owner/edit-property/${p.id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                       Edit
                    </a>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteProperty(p.id)}
                    >
                       Delete
                    </button>
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

export default PropertyList;
