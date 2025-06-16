import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import headerImg from './image.png';

import { ArrowRight } from 'lucide-react';
import UserFooter from '../components/UserFooter';
import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // Add this at the top with other imports

const primaryColor = '#FFD700';
const secondaryColor = '#000000';

const UserEnquiryForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    otp: '',
    email: '',
    city: '',
    state: '',
    mainCategory: '',
    subCategory: '',
    quantity: '',
    message: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const stateList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!formData.state) {
      setCities([]);
      setFormData(prev => ({ ...prev, city: '' }));
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(`https://backend-u1pk.onrender.com/admin/citiesByState?state=${formData.state}`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error('Failed to fetch cities', error);
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.state]);

  // Fetch main categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://backend-u1pk.onrender.com/category/main-categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch main categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories
  useEffect(() => {
    if (!formData.mainCategory) {
      setSubCategories([]);
      setFormData(prev => ({ ...prev, subCategory: '' }));
      return;
    }

    const selectedMain = categories.find(cat => cat.name === formData.mainCategory);
    if (!selectedMain) return;

    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`https://backend-u1pk.onrender.com/category/sub-categories/${selectedMain._id}`);
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        console.error('Failed to fetch subcategories', err);
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [formData.mainCategory, categories]);

  const sendOtp = async () => {
    if (!formData.mobile.match(/^\d{10}$/)) {
      alert('Enter valid 10-digit mobile number');
      return;
    }

    try {
      const res = await fetch('https://backend-u1pk.onrender.com/category/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to send OTP');
        return;
      }

      setOtpSent(true);
      alert('OTP sent successfully. Please check your phone.');
    } catch (error) {
      console.error('Send OTP error:', error);
      alert('Error sending OTP. Try again.');
    }
  };

  const verifyOtp = async () => {
    if (!otpInput.match(/^\d{4,6}$/)) {
      alert('Enter the OTP you received');
      return;
    }

    try {
      const res = await fetch('https://backend-u1pk.onrender.com/category/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp: otpInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Invalid OTP');
        return;
      }

      setOtpVerified(true);
      alert('Mobile number verified!');
    } catch (error) {
      console.error('Verify OTP error:', error);
      alert('Error verifying OTP. Try again.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!otpVerified) {
      alert('Please verify your mobile number via OTP');
      return;
    }

    if (!executeRecaptcha) {
      alert('reCAPTCHA not yet available');
      return;
    }

    try {
      const token = await executeRecaptcha('business_enquiry_submit');

      const enquiryRes = await fetch('https://backend-u1pk.onrender.com/category/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      const data = await enquiryRes.json();
      if (!enquiryRes.ok) {
        alert(data.message || 'Failed to submit enquiry');
        return;
      }

      alert('We thank you for your Enquiry, Team will connect with you soon');

      setFormData({
        name: '',
        mobile: '',
        otp: '',
        email: '',
        city: '',
        state: '',
        mainCategory: '',
        subCategory: '',
        quantity: '',
        message: '',
      });
      setOtpSent(false);
      setOtpVerified(false);
      setOtpInput('');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong, please try again.');
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
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

      {/* Contact Info Cards - Single Row (3 Columns) */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mb-3 mt-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Email Us */}
        <div className="col">
          <div className="p-4 rounded shadow-sm d-flex align-items-start h-100" style={{ backgroundColor: '#fff', borderLeft: `5px solid ${primaryColor}` }}>
            <Mail size={24} className="me-3 text-warning mt-1" />
            <div>
              <h5 className="mb-1" style={{ color: secondaryColor }}>Email Us</h5>
              <p className="mb-0 text-muted">9plusinfra@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Call Us */}
        <div className="col">
          <div className="p-4 rounded shadow-sm d-flex align-items-start h-100" style={{ backgroundColor: '#fff', borderLeft: `5px solid ${primaryColor}` }}>
            <Phone size={24} className="me-3 text-warning mt-1" />
            <div>
              <h5 className="mb-1" style={{ color: secondaryColor }}>Call Us</h5>
              <p className="mb-0 text-muted">+91 79975 58833</p>
            </div>
          </div>
        </div>

        {/* Visit Us */}
        <div className="col">
          <div className="p-4 rounded shadow-sm d-flex align-items-start h-100" style={{ backgroundColor: '#fff', borderLeft: `5px solid ${primaryColor}` }}>
            <MapPin size={24} className="me-3 text-warning mt-1" />
            <div>
              <h5 className="mb-1" style={{ color: secondaryColor }}>Visit Us</h5>
              <p className="mb-0 text-muted">Nineplusinfra Hub<br />Hyderabad, Telangana - 500001</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" style={{ maxWidth: '900px' }}>
        {/* Business Enquiry Form - Bottom Section */}
        <div className="p-4 rounded shadow" style={{ backgroundColor: '#fff', borderLeft: `5px solid ${primaryColor}` }}>
          <h2 className="mb-4 text-center" style={{ color: secondaryColor }}>Business Enquiry</h2>
          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={formData.name} required onChange={e => setFormData({ ...formData, name: e.target.value })} />
            </div>

            {/* Mobile + OTP */}
            <div className="mb-3 d-flex align-items-center">
              <div className="flex-grow-1 me-2">
                <label className="form-label">Mobile</label>
                <input type="tel" className="form-control" value={formData.mobile} required onChange={e => {
                  setFormData({ ...formData, mobile: e.target.value });
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtpInput('');
                }} />
              </div>
              <button type="button" className={`btn ${otpVerified ? 'btn-success' : ''}`}
                style={{ backgroundColor: otpVerified ? '#28a745' : primaryColor, color: secondaryColor, height: 'fit-content', marginTop: '1.9rem' }}
                onClick={sendOtp} disabled={otpSent && !otpVerified}>
                {otpSent ? (otpVerified ? 'Verified' : 'Resend OTP') : 'Send OTP'}
              </button>
            </div>

            {otpSent && !otpVerified && (
              <div className="mb-3 d-flex align-items-center">
                <div className="flex-grow-1 me-2">
                  <label className="form-label">Enter OTP</label>
                  <input type="text" className="form-control" value={otpInput} onChange={e => setOtpInput(e.target.value)} maxLength={6} />
                </div>
                <button type="button" className="btn btn-secondary" onClick={verifyOtp} style={{ height: 'fit-content', marginTop: '1.9rem' }}>
                  Verify OTP
                </button>
              </div>
            )}

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email ID</label>
              <input type="email" className="form-control" value={formData.email} required onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>

            {/* City / State */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <div className="row g-3">
                <div className="col-md-6">
                  <select
                    className="form-select"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value, city: '' })}
                  >
                    <option value="">Select State</option>
                    {stateList.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <select
                    className="form-select"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    disabled={!cities.length}
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-3">
              <label className="form-label">Product</label>
              <select className="form-select mb-2" required value={formData.mainCategory} onChange={e => setFormData({ ...formData, mainCategory: e.target.value, subCategory: '' })}>
                <option value="">Select Main Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              <select className="form-select mb-2" required value={formData.subCategory} onChange={e => setFormData({ ...formData, subCategory: e.target.value })} disabled={!subCategories.length}>
                <option value="">Select Sub Category</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub.name}>{sub.name}</option>
                ))}
              </select>

              <input type="number" min="1" className="form-control" placeholder="Quantity" required value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
            </div>

            {/* Message */}
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
            </div>

            <div className="text-muted text-end" style={{ fontSize: '0.8rem' }}>
              This form is protected by Google reCAPTCHA v3.
            </div>

            <button type="submit" className="btn w-100" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
              Submit
            </button>
          </form>
        </div>
      </div>

      <UserFooter />
    </div >
  );
};

const UserEnquiry = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6Ldpr18rAAAAAEVYRAgvynsQGjYXtYsrGohSntrF"
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      <UserEnquiryForm />
    </GoogleReCaptchaProvider>
  );
};

export default UserEnquiry;
