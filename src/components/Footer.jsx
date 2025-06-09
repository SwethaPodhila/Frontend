// src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row mb-4">
                    {/* Company Info */}
                    <div className="col-md-3 mb-3">
                        <h5>Nine Plus Infra</h5>
                        <p className="text-muted">Connecting Infra Businesses</p>
                        <p>Connecting India's construction ecosystem. Builders, contractors, architects, and suppliers - all in one platform.</p>
                        <p><strong>Phone:</strong> +91 79975 58833</p>
                        <p><strong>Email:</strong> <a href="mailto:9plusinfra@gmail.com" className="text-light">9plusinfra@gmail.com</a></p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-3 mb-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/contractors" className="text-light text-decoration-none">Find Contractors</a></li>
                            <li><a href="/suppliers" className="text-light text-decoration-none">Material Suppliers</a></li>
                            <li><a href="/architects" className="text-light text-decoration-none">Architects</a></li>
                            <li><a href="/tenders" className="text-light text-decoration-none">Tenders</a></li>
                        </ul>

                    </div>

                    <div className="col-md-3 mb-3">
                        <h6 className="mt-3">Support & Legal</h6>
                        <ul className="list-unstyled">
                            <li><a href="/help" className="text-light text-decoration-none">Help Center</a></li>
                            <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
                            <li><a href="/terms" className="text-light text-decoration-none">Terms of Service</a></li>
                            <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
                            <li><a href="/refund" className="text-light text-decoration-none">Refund Policy</a></li>
                            <li><a href="/disclaimer" className="text-light text-decoration-none">Disclaimer</a></li>
                        </ul>
                    </div>

                    {/* Subscription */}
                    <div className="col-md-3 mb-3">
                        <h5>Stay Updated</h5>
                        <p>Get the latest tenders and opportunities delivered to your inbox.</p>
                        <form>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Enter your email" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center text-muted border-top pt-3">
                    © 2024 Nine Plus Infra. All rights reserved. | Connecting India's Construction Ecosystem
                </div>
            </div>
        </footer>
    );
}

export default Footer;
