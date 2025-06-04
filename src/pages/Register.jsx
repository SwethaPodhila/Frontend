import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: '',
  });
  const [message, setMessage] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/generate-captcha', {
        withCredentials: true, // important to send session cookies
      });
      setCaptchaImage(response.data);
    } catch (error) {
      console.error('Captcha load error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/register', formData, {
        withCredentials: true,
      });

      setMessage(response.data.message);

      if (response.data.success) {
        alert("✅ Registered successfully! Check your email.");

        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          password: '',
          confirmPassword: '',
          captcha: '',
        });
      } else {
        alert(`⚠️ ${response.data.message}`);
      }

      fetchCaptcha(); // refresh captcha
    } catch (error) {
      let errorMsg = "Registration failed. Try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;

        // 👇 Show alert specifically for "Email already exists"
        if (errorMsg === "Email already exists") {
          alert("⚠️ This email is already registered. Try another one.");
        } else if (errorMsg === "Invalid CAPTCHA") {
          alert("⚠️ CAPTCHA is incorrect. Please try again.");
        } else {
          alert(`❌ ${errorMsg}`);
        }
      } else {
        alert(errorMsg);
      }

      setMessage(errorMsg);
      fetchCaptcha();
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '800px', width: '100%' }}>
        <h2 className="text-center mb-4">User Registration</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Enter your name"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              className="form-control"
              placeholder="Enter mobile number"
              onChange={handleChange}
              value={formData.mobile}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email ID</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              placeholder="Confirm password"
              onChange={handleChange}
              value={formData.confirmPassword}
              required
            />
          </div>

          {captchaImage && (
            <div className="mb-3">
              <label className="form-label">Captcha</label>
              <div dangerouslySetInnerHTML={{ __html: captchaImage }} />
              <input
                type="text"
                name="captcha"
                className="form-control mt-2"
                placeholder="Enter captcha"
                onChange={handleChange}
                value={formData.captcha}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        {/* Right: Login Link */}
        <div className="text-center mt-3">
          <span>already have an account? </span>
          <a href="/login" className="text-decoration-none">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;