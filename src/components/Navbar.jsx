import React from 'react'
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFD700' }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <Building2 size={32} style={{ color: '#000' }} />
                    <span className="ms-2 fw-bold fs-4" style={{ color: '#000' }}>nineplusinfra</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" style={{ color: '#000' }} to="#">Find Services</Link></li>
                        <li className="nav-item"><Link className="nav-link" style={{ color: '#000' }} to="/user-enquiry">Post RFQ</Link></li>
                        <li className="nav-item"><Link className="nav-link" style={{ color: '#000' }} to="#">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" style={{ color: '#000' }} to="#">Contact</Link></li>
                    </ul>
                    <div className="d-flex ms-3">
                        <Link className="btn btn-outline-dark me-2" to="/login">Login</Link>
                        <Link className="btn btn-dark" to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
