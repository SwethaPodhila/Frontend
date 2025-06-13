import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm sticky-top"
      style={{ backgroundColor: '#FFD700', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Building2 size={28} style={{ color: '#000' }} />
          <span className="ms-2 fw-bold fs-4" style={{ color: '#000' }}>
            nineplusinfra
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/services">
                Find Services
              </Link>
            </li>
           
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-hover" to="/user-enquiry">
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex ms-lg-3 mt-3 mt-lg-0">
            <Link className="btn btn-outline-dark me-2 rounded-pill px-4" to="/login">
              Login
            </Link>
            <Link className="btn btn-dark rounded-pill px-4" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
