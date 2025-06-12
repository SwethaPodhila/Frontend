import React from 'react';
import {
  Building2,
  Phone,
  Mail,
  MapPin as MapPinIcon,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
 
} from 'lucide-react';

const UserFooter = () => {
    return (
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
    )
}

export default UserFooter
