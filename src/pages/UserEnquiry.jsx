import React, { useState, useEffect } from 'react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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
        const res = await fetch('http://localhost:5000/category/main-categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch main categories', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories whenever mainCategory changes
  useEffect(() => {
    if (!formData.mainCategory) {
      setSubCategories([]);
      setFormData(prev => ({ ...prev, subCategory: '' }));
      return;
    }

    const selectedMain = categories.find(cat => cat.name === formData.mainCategory);
    if (!selectedMain) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/category/sub-categories/${selectedMain._id}`
        );
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        console.error('Failed to fetch subcategories', err);
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [formData.mainCategory, categories]);

  // SEND OTP: calls backend /api/otp/send-otp
  const sendOtp = async () => {
    if (!formData.mobile.match(/^\d{10}$/)) {
      alert('Enter valid 10-digit mobile number');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/category/send-otp', {
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

  // VERIFY OTP: calls backend /api/otp/verify-otp
  const verifyOtp = async () => {
    if (!otpInput.match(/^\d{4,6}$/)) {
      alert('Enter the OTP you received');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/category/verify-otp', {
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

  // FORM SUBMISSION: reCAPTCHA → verify on backend → submit enquiry
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
      // 1. Run reCAPTCHA on frontend
      const token = await executeRecaptcha('business_enquiry_submit');

      // 2. Verify reCAPTCHA token on backend
      const verifyRes = await fetch('http://localhost:5000/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!verifyRes.ok) {
        alert('reCAPTCHA verification failed. Please refresh and try again.');
        return;
      }

      // 3. Submit the enquiry form data to your backend
      const enquiryRes = await fetch('http://localhost:5000/category/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const enquiryData = await enquiryRes.json();
      if (!enquiryRes.ok) {
        alert(enquiryData.message || 'Failed to submit enquiry');
        return;
      }

      alert('We thank you for your Enquiry, Team will connect with you soon');

      // Reset form state
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

  // OPTIONAL: test that executeRecaptcha is available and returning a token
  useEffect(() => {
    const testRecaptcha = async () => {
      if (!executeRecaptcha) {
        console.warn('reCAPTCHA not yet available');
        return;
      }
      const token = await executeRecaptcha('test_action');
      console.log('✅ reCAPTCHA token:', token);
    };
    testRecaptcha();
  }, [executeRecaptcha]);

  return (
    <div
      className="container shadow-sm my-5 p-4 rounded"
      style={{ maxWidth: '600px', backgroundColor: '#f8f9fa', borderLeft: '5px solid #0d6efd' }}
    >
      <h2 className="mb-4 text-center">Business Enquiry</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            required
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Mobile + Send OTP button */}
        <div className="mb-3 d-flex align-items-center">
          <div className="flex-grow-1 me-2">
            <label className="form-label">Mobile</label>
            <input
              type="tel"
              className="form-control"
              value={formData.mobile}
              required
              onChange={e => {
                setFormData({ ...formData, mobile: e.target.value });
                setOtpSent(false);
                setOtpVerified(false);
                setOtpInput('');
              }}
            />
          </div>
          <button
            type="button"
            className={`btn btn-${otpVerified ? 'success' : 'primary'}`}
            onClick={sendOtp}
            disabled={otpSent && !otpVerified}
            style={{ height: 'fit-content', marginTop: '1.9rem' }}
          >
            {otpSent ? (otpVerified ? 'Verified' : 'Resend OTP') : 'Send OTP'}
          </button>
        </div>

        {/* OTP Input + Verify OTP button */}
        {otpSent && !otpVerified && (
          <div className="mb-3 d-flex align-items-center">
            <div className="flex-grow-1 me-2">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                value={otpInput}
                onChange={e => setOtpInput(e.target.value)}
                maxLength={6}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={verifyOtp}
              style={{ height: 'fit-content', marginTop: '1.9rem' }}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email ID</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            required
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* City / State */}
        <div className="mb-3">
          <label className="form-label">Location</label>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                value={formData.city}
                required
                onChange={e => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                value={formData.state}
                required
                onChange={e => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Product selection */}
        <div className="mb-3">
          <label className="form-label">Product</label>
          <select
            className="form-select mb-2"
            required
            value={formData.mainCategory}
            onChange={e =>
              setFormData({ ...formData, mainCategory: e.target.value, subCategory: '' })
            }
          >
            <option value="">Select Main Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="form-select mb-2"
            required
            value={formData.subCategory}
            onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
            disabled={!subCategories.length}
          >
            <option value="">Select Sub Category</option>
            {subCategories.map(sub => (
              <option key={sub._id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            className="form-control"
            placeholder="Quantity"
            required
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
          />
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="text-muted text-end" style={{ fontSize: '0.8rem' }}>
          This form is protected by Google reCAPTCHA v3.
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

// Wrap the form in GoogleReCaptchaProvider
const UserEnquiry = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6Ldn2FQrAAAAAKnVS4HvPvxI5k5ZNAVMowTjE5nK" // ← Your site key here
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      <UserEnquiryForm />
    </GoogleReCaptchaProvider>
  );
};

export default UserEnquiry;
