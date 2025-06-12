import React from 'react';
<<<<<<< HEAD

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

=======
import {
  Building2,
  Phone,
  Mail,
  MapPin as MapPinIcon,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
 
>>>>>>> b2e81004913c99e4041a9269bbb142641cf397a8
} from 'lucide-react';

const UserFooter = () => {
    return (
<<<<<<< HEAD
        <footer className="bg-dark text-light py-5">
            <div className="container">
                <div className="row g-4">
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
=======
        <div>

            {/* Footer */}
            <footer className="bg-dark text-white py-5">
                <div className="container">
                    <div className="row g-4 mb-4">
                        <div className="col-md-3">
                            <div className="d-flex align-items-center mb-3">
                                <Building2 size={32} className="text-primary" />
                                <span className="ms-2 fs-5 fw-bold">nineplusinfra</span>
                            </div>
                            <p className="text-secondary mb-3">
                                India's leading construction service marketplace connecting project owners with verified contractors.
                            </p>
                            <div className="d-flex gap-3">
                                <Facebook size={24} className="text-secondary" />
                                <Twitter size={24} className="text-secondary" />
                                <Linkedin size={24} className="text-secondary" />
                                <Instagram size={24} className="text-secondary" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <h6 className="fw-semibold mb-3">Quick Links</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-secondary text-decoration-none d-block mb-2">Find Contractors</a></li>
                                <li><a href="#" className="text-secondary text-decoration-none d-block mb-2">Post RFQ</a></li>
                                <li><a href="#" className="text-secondary text-decoration-none d-block mb-2">Browse Categories</a></li>
                                <li><a href="#" className="text-secondary text-decoration-none d-block">Success Stories</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h6 className="fw-semibold mb-3">Support</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-secondary text-decoration-none d-block mb-2">Help Center</a></li>
                                <li><a href="#" className="text-secondary text-decoration-none d-block mb-2">Terms of Service</a></li>
                                <li><a href="#" className="text-secondary text-decoration-none d-block mb-2">Privacy Policy</a></li>
                                <li><a href="#" className="text-secondary text-decoration-none d-block">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h6 className="fw-semibold mb-3">Contact Info</h6>
                            <div className="mb-2 d-flex align-items-center">
                                <Phone size={18} className="text-secondary me-2" />
                                <span className="text-secondary">+91 98765 43210</span>
                            </div>
                            <div className="mb-2 d-flex align-items-center">
                                <Mail size={18} className="text-secondary me-2" />
                                <span className="text-secondary">info@nineplusinfra.in</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <MapPinIcon size={18} className="text-secondary me-2" />
                                <span className="text-secondary">Mumbai, India</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-top border-secondary pt-3 text-center">
                        <p className="text-secondary mb-0">
                            © 2024 nineplusinfra. All rights reserved. | Made with ❤️ in India
                        </p>
                    </div>
                </div>
            </footer>
        </div>
>>>>>>> b2e81004913c99e4041a9269bbb142641cf397a8
    )
}

export default UserFooter
