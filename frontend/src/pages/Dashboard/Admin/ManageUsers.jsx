import React, { useEffect, useState } from "react";
import { fetchAllUsers, deleteUser } from "../../../services/AdminService";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers()
      .then(res => {
        const filtered = res.data.filter(u => u.role === "user");
        setUsers(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      setUsers(users => users.filter(u => u.id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">

      {/* HEADER AREA */}
      <div className="container mt-4 mb-3">
        <h4 className="fw-bold text-primary d-flex align-items-center gap-2">
          <i className="bi bi-people"></i>
          Manage Users
        </h4>
        <p className="text-secondary">
          Manage all registered users here.
        </p>
      </div>

      {/* TABLE AREA */}
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
              {users.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger d-flex align-items-center mx-auto"
                      onClick={() => handleDelete(u.id)}
                    >
                      <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-secondary py-3">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STICKY FOOTER */}
      
    </div>
  );
};

export default ManageUsers;
