import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutUs() {
  return (
    <>
      <style>
        {`
          .hero-section {
            background-color: #000;
            color: #FFD700;
            padding: 80px 0;
            text-align: center;
          }

          .section-padding {
            padding: 80px 0;
          }

          .section-title {
            font-weight: 700;
            color: #000;
            margin-bottom: 30px;
          }

          .section-title-yellow {
            font-weight: 700;
            color: #FFD700;
            margin-bottom: 20px;
          }

          .info-box {
            background-color: #f9f9f9;
            padding: 20px;
            border-left: 5px solid #FFD700;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .text-yellow {
            color: #FFD700;
          }

          .feature-box {
            border: 2px solid #FFD700;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            background-color: #fff;
            font-weight: 600;
          }

          .cta-section {
            background-color: #000;
            color: #FFD700;
            padding: 60px 0;
            text-align: center;
          }

          .cta-section .btn {
            background-color: #FFD700;
            color: #000;
            font-weight: bold;
            padding: 10px 30px;
            border-radius: 50px;
          }

          .img-fluid {
            border-radius: 12px;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1 className="display-4 fw-bold">Connecting India's Construction Ecosystem</h1>
          <p className="lead mt-3">One platform for builders, architects, suppliers & service pros.</p>
        </Container>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-light text-dark">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="section-title">Our Story</h2>
              <p>
                We started this platform to solve one major problem — fragmentation. Construction professionals were disconnected, vendors had no digital presence, and communication was scattered. Now, with our unified digital hub, we are empowering India's construction industry to operate smarter, faster, and more collaboratively.
              </p>
              <p>
                Our mission is to bring convenience and visibility for all stakeholders, whether you're a builder in Mumbai or a tiles supplier in Hyderabad.
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-photo/engineer-looking-building-blueprints_23-2149271771.jpg"
                alt="Our Story"
                className="img-fluid shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-black text-white">
        <Container>
          <Row>
            <Col md={6}>
              <h3 className="section-title-yellow">Our Vision</h3>
              <p>
                To become India’s go-to digital platform for construction collaboration, driving industry-wide growth and innovation.
              </p>
            </Col>
            <Col md={6}>
              <h3 className="section-title-yellow">Our Mission</h3>
              <p>
                • Build trust through verified profiles and transparent reviews.<br />
                • Support faster project delivery through smart digital tools.<br />
                • Help professionals discover more opportunities and clients.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Who We Serve */}
      <section className="section-padding bg-white text-dark">
        <Container>
          <h2 className="section-title text-center">Who We Serve</h2>
          <Row>
            <Col md={4}>
              <div className="info-box">
                <h5 className="text-yellow">Builders & Contractors</h5>
                <p>Post projects, manage suppliers, and connect with verified vendors across locations.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="info-box">
                <h5 className="text-yellow">Architects & Designers</h5>
                <p>Showcase your portfolio, get noticed by top builders, and simplify procurement.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="info-box">
                <h5 className="text-yellow">Suppliers & Vendors</h5>
                <p>Get more RFQs, expand your network, and manage orders in one place.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Platform Features */}
      <section className="section-padding bg-light text-dark">
        <Container>
          <h2 className="section-title text-center">Why Choose Us?</h2>
          <Row className="text-center">
            <Col md={3}><div className="feature-box">📦 Live RFQs & Ordering</div></Col>
            <Col md={3}><div className="feature-box">🛠 Verified Service Providers</div></Col>
            <Col md={3}><div className="feature-box">📍 Location-based Visibility</div></Col>
            <Col md={3}><div className="feature-box">💬 Chat & Enquiry Tools</div></Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <Container>
          <h2 className="fw-bold mb-3">Ready to Build the Future?</h2>
          <p>Join 10,000+ professionals transforming construction across India.</p>
          <a href="/register" className="btn mt-3">Get Started</a>
        </Container>
      </section>
    </>
  );
}

export default AboutUs;
