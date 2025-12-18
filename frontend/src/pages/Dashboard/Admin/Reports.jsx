import React, { useEffect, useState } from "react";
import { fetchContacts } from "../../../services/AdminService";

const Reports = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts()
      .then(res => setContacts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app-wrapper d-flex flex-column min-vh-100">

      <div className="container mt-4 mb-3">
        <h4 className="fw-bold text-primary d-flex align-items-center gap-2">
          <i className="bi bi-clipboard-data"></i>
          Contact Messages
        </h4>
        <p className="text-secondary">View system contact messages here.</p>
      </div>

      <div className="container flex-grow-1">
        <div className="table-responsive shadow-sm rounded overflow-hidden">
          <table className="table table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>{c.email}</td>
                  <td className="fw-semibold">{c.subject}</td>
                  <td className="text-wrap" style={{ maxWidth: "350px" }}>
                    {c.message}
                  </td>
                  <td>{c.created_at}</td>
                </tr>
              ))}

              {contacts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-secondary py-3">
                    No contact messages found.
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

export default Reports;
