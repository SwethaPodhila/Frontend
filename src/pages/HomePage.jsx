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
    { name: 'Others', icon: Paintbrush }
  ];

  const pricingPlans = [
    {
      name: 'Starter Plan',
      price: '₹0',
      period: 'Forever Free',
      features: [
        'Post up to 3 RFQs monthly',
        'Basic contractor profiles view',
        'Email support',
        'Standard verification badge',
        'Basic project tracking'
      ],
      buttonText: 'Get Started Free',
      buttonClass: 'btn-outline-primary',
      popular: false
    },
    {
      name: 'Professional Plan',
      price: '₹1,999',
      period: 'per month',
      features: [
        'Unlimited RFQ posting',
        'Full contractor database access',
        'Priority listing in search',
        'In-app chat & video calls',
        'Advanced analytics dashboard',
        'Premium verification badge',
        '24/7 priority support'
      ],
      buttonText: 'Upgrade to Pro',
      buttonClass: 'btn-warning text-dark',
      popular: true
    },
    {
      name: 'Enterprise Plan',
      price: '₹9,999',
      period: 'per month',
      features: [
        'All Professional features',
        'Dedicated account manager',
        'Custom branding options',
        'Advanced project management tools',
        'Team collaboration features',
        'API access & integrations',
        'Custom reporting & analytics',
        'White-label solutions'
      ],
      buttonText: 'Contact Sales',
      buttonClass: 'btn-dark',
      popular: false
    }
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

      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">How It Works</h2>
            <p className="lead text-secondary">Simple steps to connect with the right construction professionals</p>
          </div>
          <div className="row g-4">
            {[{
              icon: FileText,
              title: "1. Post Your Requirement",
              desc: "Describe your project details, location, budget, and timeline to attract the right contractors"
            }, {
              icon: Users,
              title: "2. Get Quotations",
              desc: "Receive competitive quotes from verified contractors in your area within 24-48 hours"
            }, {
              icon: CheckCircle,
              title: "3. Compare & Hire",
              desc: "Compare profiles, reviews, and quotes to select the best contractor for your project"
            }].map((step, idx) => (
              <div key={idx} className="col-md-4 text-center">
                <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                  <step.icon size={40} className="text-white" />
                </div>
                <h5 className="fw-semibold mb-2">{step.title}</h5>
                <p className="text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-5" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">What We Offer</h2>
            <p className="lead text-muted">Explore a range of construction services tailored to your project</p>
          </div>
          <div className="row g-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card h-100 text-center border-0 shadow-sm service-card" style={{ borderRadius: '16px', transition: 'transform 0.3s ease' }}>
                    <div className="card-body d-flex flex-column justify-content-between p-4">
                      <div className="icon-box mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: 70, height: 70, backgroundColor: '#fff3cd' }}>
                        <IconComponent size={32} style={{ color: primaryColor }} />
                      </div>
                      <h5 className="fw-bold">{service.name}</h5>
                      <p className="text-muted small mb-4">
                        Get expert help for {service.name.toLowerCase()} with fast quotes and trusted professionals.
                      </p>
                      <button className="btn btn-sm fw-semibold rounded-pill mt-auto"
                        style={{ backgroundColor: primaryColor, color: '#000' }}>
                        Find Contractors <ArrowRight className="ms-1" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <style>
          {`
            .service-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
          `}
        </style>
      </section>

      {/* Pricing Plans */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">Flexible Pricing for Every Need</h2>
            <p className="text-muted lead">Choose a plan that fits your project size and complexity</p>
          </div>
          <div className="row g-4 justify-content-center">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="col-md-4">
                <div
                  className={`card h-100 rounded-3 border ${plan.popular ? 'border-warning popular-plan' : 'border-light'
                    }`}
                  style={{
                    boxShadow: plan.popular
                      ? '0 6px 12px rgba(255, 193, 7, 0.3)'
                      : '0 2px 6px rgba(0, 0, 0, 0.08)',
                    transform: plan.popular ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    if (!plan.popular) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!plan.popular) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)';
                    }
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        backgroundColor: '#ffc107',
                        color: '#212529',
                        padding: '5px 12px',
                        fontWeight: '600',
                        fontSize: '0.8rem',
                        borderRadius: '12px',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                        zIndex: 10,
                        textTransform: 'uppercase',
                      }}
                    >
                      Most Popular
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold text-center mb-3">{plan.name}</h5>
                    <div className="text-center mb-3">
                      <span
                        className="d-block fw-bold"
                        style={{ fontSize: '2rem', color: '#ffc107' }}
                      >
                        {plan.price}
                      </span>
                      <small className="text-muted">{plan.period}</small>
                    </div>
                    <ul className="list-unstyled text-muted flex-grow-1 mb-3" style={{ fontSize: '0.95rem' }}>
                      {plan.features.map((feature, i) => (
                        <li key={i} className="mb-2 d-flex align-items-center">
                          <CheckCircle size={18} className="text-success me-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="d-grid mt-auto">
                      <button
                        className={`btn rounded-pill fw-semibold ${plan.popular ? 'btn-warning text-dark' : 'btn-outline-secondary'
                          }`}
                        style={{ letterSpacing: '0.03em', padding: '0.5rem 1.5rem' }}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
    .popular-plan {
      border-width: 2.5px !important;
    }
  `}</style>
      </section>

      {/* Recent RFQs */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Recent RFQs</h2>
            <p className="lead text-muted">See what people are building right now</p>
          </div>
          <div className="row g-4">
            {recentRFQs.map((rfq) => (
              <div key={rfq.id} className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{rfq.title}</h5>
                    <p className="card-text"><MapPin className="me-1" size={16} />{rfq.city}</p>
                    <p className="card-text"><IndianRupee className="me-1" size={16} />{rfq.budget}</p>
                    <p className="card-text"><Clock className="me-1" size={16} />{rfq.posted}</p>
                    <p className="badge bg-warning text-dark">{rfq.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-muted">Real stories from our users across India</p>
          </div>
          <div className="row g-4">
            {testimonials.map((testi, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <p className="text-secondary fst-italic">"{testi.text}"</p>
                    <div className="d-flex align-items-center mt-3">
                      <div>
                        <h6 className="mb-0 fw-bold">{testi.name}</h6>
                        <small className="text-muted">{testi.company}</small>
                      </div>
                      <div className="ms-auto">
                        {[...Array(testi.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-warning" />
                        ))}
                      </div>
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
