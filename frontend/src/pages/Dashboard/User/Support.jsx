import React, { useState } from "react";
import { submitContact } from "../../../services/ContactService";
import { toast } from "react-toastify";

const Support = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      toast.success(" Message sent successfully!");
      setFormData({ email: "", subject: "", message: "" });
    } catch {
      toast.error(" Failed to send message");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: "linear-gradient(145deg, #f8fbff, #e9f4ff)",
      }}
    >
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">

        {/*  Main Card */}
        <div
          className="row shadow-sm p-4 rounded-4 align-items-center"
          style={{
            maxWidth: "900px",
            background: "white",
            gap: "15px",    //  Controls gap
          }}
        >

          {/*  LEFT — Illustration */}
          <div className="col-md-6 d-flex flex-column align-items-center">
            <img
              src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Support Illustration"
              style={{ width: "85%", maxWidth: "350px" }}
            />

            <h4 className="fw-bold mt-3" style={{ color: "#0a4360" }}>
              We're here to help
            </h4>
            <p className="text-muted text-center" style={{ fontSize: "14.5px" }}>
              Facing an issue or have suggestions?  
              Just drop a message — our team will contact you soon.
            </p>
          </div>

          {/*  RIGHT — Form */}
          <div className="col-md-5 mx-auto">
            <h5 className="fw-bold text-primary mb-3 text-center">
              Contact Support
            </h5>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="subject"
                className="form-control mb-3"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                className="form-control mb-3"
                placeholder="Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button
                className="btn w-100 text-white"
                style={{ background: "#0a4360" }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/*  Animation Styling */}
      <style>{`
        .fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Support;
