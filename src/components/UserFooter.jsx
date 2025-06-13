import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

const UserFooter = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-4">
              <Building2 className="text-warning me-3" size={32} />
              <h4 className="fw-bold text-warning mb-0">NinePlusInfra</h4>
            </div>
            <p className="text-light opacity-75 mb-4">
              India's most trusted construction platform connecting verified contractors
              with quality clients. Building dreams, one project at a time.
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning btn-sm rounded-circle">
                <Facebook size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning btn-sm rounded-circle">
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning btn-sm rounded-circle">
                <Linkedin size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-warning btn-sm rounded-circle">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-warning mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-light opacity-75 text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/services" className="text-light opacity-75 text-decoration-none">Services</Link></li>
              <li className="mb-2"><Link to="/pricing" className="text-light opacity-75 text-decoration-none">Pricing</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-light opacity-75 text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-warning mb-3">For Contractors</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/register" className="text-light opacity-75 text-decoration-none">Join as Contractor</Link></li>
              <li className="mb-2"><Link to="/requirements" className="text-light opacity-75 text-decoration-none">Browse Requirements</Link></li>
              <li className="mb-2"><Link to="/verification" className="text-light opacity-75 text-decoration-none">Get Verified</Link></li>
              <li className="mb-2"><Link to="/resources" className="text-light opacity-75 text-decoration-none">Resources</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="fw-bold text-warning mb-3">Contact Info</h6>
            <div className="d-flex align-items-center mb-3">
              <Phone size={16} className="text-warning me-3" />
              <span className="text-light opacity-75">+91 98765 43210</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <Mail size={16} className="text-warning me-3" />
              <span className="text-light opacity-75">hello@nineplusinfra.com</span>
            </div>
            <div className="d-flex align-items-start">
              <MapPin size={16} className="text-warning me-3 mt-1" />
              <span className="text-light opacity-75">
                Tech Hub, Sector 18,<br />
                Gurgaon, Haryana 122015
              </span>
            </div>
          </div>
        </div>

        <hr className="my-4 opacity-25" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-light opacity-50">
              © 2024 NinePlusInfra. All rights reserved. Built with ❤️ in India.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex flex-wrap gap-3 justify-content-md-end">
              <Link to="/privacy" className="text-light opacity-50 text-decoration-none small">Privacy Policy</Link>
              <Link to="/terms" className="text-light opacity-50 text-decoration-none small">Terms of Service</Link>
              <Link to="/sitemap" className="text-light opacity-50 text-decoration-none small">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
