import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import UserFooter from '../components/UserFooter';

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

  // Fetch main categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://construction-backend-w8qz.onrender.com/category/main-categories');
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
        const res = await fetch(`https://construction-backend-w8qz.onrender.com/category/sub-categories/${selectedMain._id}`);
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
      const res = await fetch('https://construction-backend-w8qz.onrender.com/category/send-otp', {
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
      const res = await fetch('https://construction-backend-w8qz.onrender.com/category/verify-otp', {
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

      const enquiryRes = await fetch('https://construction-backend-w8qz.onrender.com/category/enquiry', {
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

      {/* Hero */}
      <section style={{ backgroundColor: secondaryColor }} className="text-white py-5 text-center position-relative">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold mb-3">
            Connect with Verified Construction <br />
            <span style={{ color: primaryColor }}>Service Providers</span> Across India
          </h1>
          <p className="lead mb-4">
            Find trusted contractors, get competitive quotes, and complete your construction projects with confidence
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <Link to="/about" className="btn btn-lg d-flex align-items-center justify-content-center" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
              About Us <ArrowRight className="ms-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <div className="container shadow-sm my-5 p-4 rounded" style={{ maxWidth: '600px', backgroundColor: '#fff', borderLeft: `5px solid ${primaryColor}` }}>
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
                <input type="text" className="form-control" placeholder="City" value={formData.city} required onChange={e => setFormData({ ...formData, city: e.target.value })} />
              </div>
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="State" value={formData.state} required onChange={e => setFormData({ ...formData, state: e.target.value })} />
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

      <UserFooter />
    </div>
  );
};

const UserEnquiry = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LfV4VUrAAAAAALBx3hDT_-HAnNKMKaEwYMw76sT"
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      <UserEnquiryForm />
    </GoogleReCaptchaProvider>
  );
};

export default UserEnquiry;
