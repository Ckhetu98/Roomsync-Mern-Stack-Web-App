import React, { useState } from "react";
import "../../styles/ContactUs.css";
import { submitContact } from "../../services/ContactService";
import contactBg from "../../assets/contact.jpg";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      toast.success("Thank you for contacting us!");
    setFormData({ email: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Submit failed");
    }
  
  };

  return (
    <div className="contact-page" style={{
      background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 0"
    }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={contactBg}
              alt="Contact Us"
              className="img-fluid rounded shadow-lg"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="contact-form-container p-5 shadow-lg rounded" style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
              <h2 className="text-center mb-4 text-dark fw-bold">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  color: "#333"
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  color: "#333"
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="4"
                placeholder="Write your query here..."
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  color: "#333"
                }}
              ></textarea>
            </div>

            <button type="submit" className="btn w-100 mt-2 fw-bold" style={{
              background: "#0f4c75",
              border: "2px solid #0f4c75",
              color: "white",
              transition: "all 0.3s ease"
            }} onMouseOver={(e) => {
              e.target.style.background = "#3282b8";
              e.target.style.borderColor = "#3282b8";
            }} onMouseOut={(e) => {
              e.target.style.background = "#0f4c75";
              e.target.style.borderColor = "#0f4c75";
            }}>
              Submit
            </button>
          </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
