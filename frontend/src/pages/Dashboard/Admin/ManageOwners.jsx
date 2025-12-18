import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../../../services/AdminService";
import { toast } from "react-toastify";

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchAllUsers()
      .then(res => setOwners(res.data.filter(u => u.role === "owner")))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this owner?");
    if (!confirmed) return;
    
    try {
      await deleteUser(id);
      toast.success("Owner deleted successfully");
      setOwners(o => o.filter(x => x.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">

      <div className="container mt-4 mb-3">
        <h4 className="fw-bold text-black d-flex align-items-center gap-2">
          <i className="bi bi-person-badge"></i>
          Manage Owners
        </h4>
        <p className="text-secondary">Manage all registered owners here.</p>
      </div>

      <div className="container flex-grow-1">
        <div className="table-responsive shadow-sm rounded overflow-hidden">
          <table className="table table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((o, i) => (
                <tr key={o.id}>
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{o.name}</td>
                  <td>{o.email}</td>
                  <td>{o.phone || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger d-flex align-items-center mx-auto"
                      onClick={() => handleDelete(o.id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}

              {owners.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-secondary py-3">
                    No owners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
    </div>
  );
};

export default ManageOwners;
