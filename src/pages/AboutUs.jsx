import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import headerImg from './image.png';

import {
  ArrowRight, CheckCircle, Users, MapPin, FileText, Shield, Star,
  Building2, Wrench, Paintbrush, Home, HardHat, Clock, IndianRupee,
  Truck, Settings, Hammer
} from 'lucide-react';
import UserFooter from '../components/UserFooter';
import Navbar from '../components/Navbar';

function AboutUs() {
  const services = [
    { name: 'Construction Builders', icon: Building2 },
    { name: 'Interior Designers', icon: Home },
    { name: 'Architects', icon: HardHat },
    { name: 'Material Suppliers', icon: Truck },
    { name: 'Service Providers', icon: Settings },
    { name: 'Plumbing Services', icon: Wrench },
    { name: 'Civil Engineers', icon: Hammer },
    { name: 'Others', icon: Paintbrush }
  ];

  const primaryColor = '#FFD700';

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
      <Navbar />

      {/* Hero Section */}
      <section style={{ backgroundColor: '#000', padding: '60px 0' }}>
        <div className="container d-flex flex-column-reverse flex-lg-row align-items-center justify-content-between gap-3">
          <div style={{ maxWidth: '880px' }} className="text-center text-lg-start">
            <h1 className="fw-bold text-white mb-4 display-5">
              Connect with Verified <br />
              <span style={{ color: primaryColor }}>Construction Experts</span> Across India
            </h1>
            <p className="text-light fs-5 mb-4">
              Post your RFQ and get quotes from trusted contractors to make your project stress-free and efficient.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link to="/user-enquiry" className="btn btn-warning btn-lg px-4 d-flex align-items-center justify-content-center shadow">
                Post RFQ <ArrowRight className="ms-2" />
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg px-4 shadow-sm">
                Learn More
              </Link>
            </div>
          </div>
          <div className="text-center">
            <img
              src={headerImg}
              alt="Construction Banner"
              className="img-fluid rounded shadow"
              style={{
                width: '360px',
                maxWidth: '100%',
                border: `3px solid ${primaryColor}`
              }}
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-light text-dark">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="section-title">Our Story</h2>
              <p>
                The construction industry in India is vast, diverse, and growing rapidly. Yet, it continues to suffer from one critical issue — fragmentation. Builders don’t know where to find reliable vendors. Architects struggle to connect with specialized service providers. Small-scale suppliers have little digital visibility. And crucial opportunities are lost in the gaps between stakeholders.
              </p>
              <p>
                We founded this platform with one powerful purpose: to bridge those gaps. What started as a simple idea to connect professionals has grown into a dynamic networking and ordering ecosystem designed specifically for the Indian construction sector.
              </p>

              <p>
                Our platform empowers builders, architects, interior designers, suppliers, and service providers to <strong>collaborate smarter, trade faster, and grow together.</strong>
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://www.shutterstock.com/image-photo/engineer-teamwork-meeting-drawing-working-600nw-2477560025.jpg"
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
                To be India’s leading digital hub for construction professionals — a space where every builder, supplier, and service provider can connect, grow, and build the future together.
              </p>
              <p>
                We envision a transparent, technology-driven construction industry where discovery is easy, partnerships are trusted, and every stakeholder — from large firms to small local vendors — can thrive in a connected ecosystem.
              </p>
            </Col>
            <Col md={6}>
              <h3 className="section-title-yellow">Our Mission</h3>
              <ul>
                <li>Enable Discovery: Help professionals find trusted partners and services.</li>
                <li>Simplify Transactions: Streamline RFQs, orders, and payments.</li>
                <li>Foster Trust: Verified profiles, reviews, and dispute resolution.</li>
                <li>Empower the Underserved: Support local vendors and service providers.</li>
                <li>Digitize Workflows: Tools for project tracking and estimation.</li>
                <li>Drive Growth: A community-first approach to industry development.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Why Choose nineplusinfra</h2>
            <p className="lead text-secondary">
              The trusted platform for construction professionals and project owners
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-3 text-center">
              <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <Shield size={40} className="text-success" />
              </div>
              <h6 className="fw-semibold mb-2">Verified Profiles</h6>
              <p className="text-secondary">
                All contractors are thoroughly verified with document checks and quality assessments
              </p>
            </div>
            <div className="col-md-3 text-center">
              <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <MapPin size={40} className="text-primary" />
              </div>
              <h6 className="fw-semibold mb-2">Location-Based Matching</h6>
              <p className="text-secondary">
                Connect with contractors in your city for faster response and better service
              </p>
            </div>
            <div className="col-md-3 text-center">
              <div className="rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <FileText size={40} className="text-info" />
              </div>
              <h6 className="fw-semibold mb-2">Easy Quotation System</h6>
              <p className="text-secondary">
                Streamlined process for receiving and comparing multiple quotations quickly
              </p>
            </div>
            <div className="col-md-3 text-center">
              <div className="rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <CheckCircle size={40} className="text-warning" />
              </div>
              <h6 className="fw-semibold mb-2">Secure Platform</h6>
              <p className="text-secondary">
                Safe and secure environment with payment protection and dispute resolution
              </p>
            </div>
          </div>
        </div>
      </section>

      <UserFooter />
    </>
  );
}

export default AboutUs;
