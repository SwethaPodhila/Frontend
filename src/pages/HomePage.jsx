import React from 'react';
import { Link } from 'react-router-dom';
import headerImg from './image.png';

import {
  ArrowRight, CheckCircle, Users, MapPin, FileText, Shield, Star,
  Building2, Wrench, Paintbrush, Home, HardHat, Clock, IndianRupee,
  Truck, Settings, Hammer
} from 'lucide-react';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';

function HomePage() {
  const services = [
    { name: 'Construction Builders', icon: Building2 },
    { name: 'Interior Designers', icon: Home },
    { name: 'Architects', icon: HardHat },
    { name: 'Material Suppliers', icon: Truck },
    { name: 'Service Providers', icon: Settings },
    { name: 'Plumbing Services', icon: Wrench },
    { name: 'Civil Engineers', icon: Hammer },
    { name: 'others', icon: Hammer }
  ];

  const recentRFQs = [
    {
      id: 1,
      title: 'Residential Building Construction',
      city: 'Mumbai',
      budget: '₹15,00,000',
      category: 'Construction Builders',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Office Interior Design',
      city: 'Bangalore',
      budget: '₹8,50,000',
      category: 'Interior Designers',
      posted: '3 days ago'
    },
    {
      id: 3,
      title: 'Villa Architecture Planning',
      city: 'Delhi',
      budget: '₹12,20,000',
      category: 'Architects',
      posted: '4 days ago'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Kumar Constructions',
      text: 'This platform helped me connect with quality clients across India. The quotation system is seamless and I\'ve grown my business significantly.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      company: 'Homeowner',
      text: 'Found the perfect contractor for my home renovation. The verification process gave me confidence and the quotes were competitive.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      company: 'Patel Enterprises',
      text: 'Excellent platform for construction professionals. The enterprise plan features have streamlined our project management process.',
      rating: 5
    }
  ];

  const primaryColor = '#FFD700';

  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <Navbar />

      {/* Hero Section */}
      <section className="text-white" style={{ backgroundColor: '#000', padding: '50px 0 30px' }}>
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="mb-4 mb-md-0" style={{ maxWidth: '600px' }}>
            <h1 className="display-5 fw-bold mb-3">
              Connect with Verified <br />
              <span style={{ color: primaryColor }}>Construction Service Providers</span> Across India
            </h1>
            <p className="lead mb-4">
              Find trusted contractors, get competitive quotes, and complete your construction projects with confidence.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link to="/user-enquiry" className="btn btn-warning btn-lg d-flex align-items-center justify-content-center">
                Business Enquiry <ArrowRight className="ms-2" size={20} />
              </Link>
              <Link to="/about" className="btn btn-outline-light btn-lg">
                About Us
              </Link>
            </div>
          </div>
          <div>
            <img src={headerImg} alt="Construction" className="img-fluid rounded shadow" style={{ maxWidth: '500px' }} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-4">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="lead text-secondary">Simple steps to connect with the right construction professionals</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <FileText size={40} className="text-white" />
              </div>
              <h5 className="fw-semibold mb-2">1. Post Your Requirement</h5>
              <p className="text-secondary">Describe your project details, location, budget, and timeline to attract the right contractors</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <Users size={40} className="text-white" />
              </div>
              <h5 className="fw-semibold mb-2">2. Get Quotations</h5>
              <p className="text-secondary">Receive competitive quotes from verified contractors in your area within 24-48 hours</p>
            </div>
            <div className="col-md-4 text-center">
              <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <CheckCircle size={40} className="text-white" />
              </div>
              <h5 className="fw-semibold mb-2">3. Compare & Hire</h5>
              <p className="text-secondary">Compare profiles, reviews, and quotes to select the best contractor for your project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-4">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">Our Services</h2>
            <p className="lead text-secondary">Find expert contractors for all your construction needs</p>
          </div>
          <div className="row g-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body text-center">
                      <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 64, height: 64 }}>
                        <IconComponent size={32} style={{ color: primaryColor }} />
                      </div>
                      <h5 className="fw-semibold mb-2">{service.name}</h5>
                      <p className="text-secondary mb-3">Connect with verified professionals for quality {service.name.toLowerCase()} services</p>
                      <button className="btn" style={{ color: '#000', backgroundColor: primaryColor }}>
                        Find Contractors <ArrowRight className="ms-2" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Posted RFQs */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">Recently Posted RFQs</h2>
            <p className="lead text-secondary">Latest project opportunities from verified clients</p>
          </div>
          <div className="row g-4 mb-3">
            {recentRFQs.map((rfq) => (
              <div key={rfq.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge" style={{ backgroundColor: primaryColor, color: '#000' }}>{rfq.category}</span>
                      <span className="text-muted small d-flex align-items-center"><Clock size={16} className="me-1" />{rfq.posted}</span>
                    </div>
                    <h5 className="fw-semibold mb-2">{rfq.title}</h5>
                    <div className="mb-3">
                      <div className="d-flex align-items-center text-secondary mb-1">
                        <MapPin size={16} className="me-2" />{rfq.city}
                      </div>
                      <div className="d-flex align-items-center text-secondary">
                        <IndianRupee size={16} className="me-2" />{rfq.budget}
                      </div>
                    </div>
                    <button className="btn w-100" style={{ backgroundColor: primaryColor, color: '#000' }}>
                      Submit Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="btn btn-lg fw-semibold px-4 py-2" style={{ backgroundColor: primaryColor, color: '#000' }}>
              View All RFQs
            </button>
          </div>
        </div>
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

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-secondary">
              Trusted by thousands of construction professionals and project owners
            </p>
          </div>
          <div className="row g-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-warning" fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="text-secondary mb-3">
                      "{testimonial.text}"
                    </blockquote>
                    <div>
                      <div className="fw-semibold text-dark">{testimonial.name}</div>
                      <div className="text-secondary">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UserFooter />

    </div>
  );
}
export default HomePage;
