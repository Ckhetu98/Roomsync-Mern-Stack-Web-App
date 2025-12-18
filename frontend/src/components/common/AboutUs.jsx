import React from "react";
import Footer from "../layout/Footer";
function AboutUs() {
  return (
    <section className="py-5" style={{
      background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%)",
      minHeight: "100vh"
    }}>
      <div className="container">
       
        <h1 className="text-center text-dark mb-4 fw-bold">About Us</h1>

        <p className="lead text-center mb-5 text-secondary">
          Welcome to <strong>RoomSync</strong>! We are a passionate team of developers, designers,
          and innovators dedicated to creating exceptional user experiences and powerful web
          solutions.
        </p>
           <div className="container-fluid py-5">
      <div className="row align-items-center">
        {/* Left Side - Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="/images/AboutUs.png"
            alt="About Us Illustration"
            className="img-fluid rounded shadow-lg" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right Side - Mission, Vision, Values */}
        <div className="col-md-6">
          <div className="d-flex flex-column justify-content-between h-100">
            {/* Mission */}
            <div className="mb-4">
              <h3 className="text-dark fw-bold">Our Mission</h3>
              <p className="text-secondary">
                To empower individuals and businesses by delivering high-quality, scalable, and
                user-friendly applications.
              </p>
            </div>

            {/* Vision */}
            <div className="mb-4">
              <h3 className="text-dark fw-bold">Our Vision</h3>
              <p className="text-secondary">
                To innovate continuously and provide cutting-edge digital products that make life
                easier and more connected.
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-dark fw-bold">Our Values</h3>
              <ul className="list-unstyled mb-0 text-secondary">
                <li>• Innovation</li>
                <li>• Collaboration</li>
                <li>• Quality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* Developer Cards */}
        <h2 className="text-center text-dark mb-4 fw-bold">Meet the Developers</h2>
        <div className="row g-4 mb-5 justify-content-center">
          {/* Developer 1 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg text-center" style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
              <img
                src="src\assets\Purvesh.jpg"
                className="card-img-top mx-auto mt-3 rounded-circle"
                alt="Developer 1"
                style={{ width: "55%", height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark fw-bold">Purvesh Khandare</h5>
                <p className="card-text text-secondary">Frontend Developer specializing in React and UI/UX design.</p>
              </div>
            </div>
          </div>

          {/* Developer 2 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg text-center" style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
              <img
                src="src\assets\khetesh.jpg"
                className="card-img-top mx-auto mt-3 rounded-circle"
                alt="Developer 2"
                style={{ width: "55%", height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark fw-bold">Khetesh Choudhary</h5>
                <p className="card-text text-secondary">Backend Developer with expertise in Node.js and databases.</p>
              </div>
            </div>
          </div>

          {/* Developer 3 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-lg text-center" style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
              <img
                src="/images/akash_kokulwar.jpeg"
                className="card-img-top mx-auto mt-3 rounded-circle"
                alt="Developer 3"
                style={{ width: "55%", height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark fw-bold">Akash Kokulwar</h5>
                <p className="card-text text-secondary">Frontend Developer specializing in React and UI/UX design.</p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
      
    </section>
  );
}

export default AboutUs;
