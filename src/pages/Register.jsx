import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  // ✅ Load reCAPTCHA v3 script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=6Ldn2FQrAAAAAKnVS4HvPvxI5k5ZNAVMowTjE5nK'; // Replace with your actual site key
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        alert("⚠️ reCAPTCHA not loaded yet. Please wait and try again.");
        return;
      }

      // ✅ Proper reCAPTCHA execution with await
      const token = await new Promise((resolve) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute('6Ldn2FQrAAAAAKnVS4HvPvxI5k5ZNAVMowTjE5nK', { action: 'register' })
            .then(resolve);
        });
      });

      console.log("✅ reCAPTCHA token:", token);

      const response = await axios.post(
        'http://localhost:5000/user/register',
        { ...formData, recaptchaToken: token },
        { withCredentials: true }
      );

      setMessage(response.data.message);

      if (response.data.success) {
        alert("✅ Registered successfully! Check your email.");
        setFormData({
          fullName: '',
          mobile: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        alert(`⚠️ ${response.data.message}`);
      }
    } catch (error) {
      let errorMsg = "Registration failed. Try again.";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;

        if (errorMsg === "Email already exists") {
          alert("⚠️ This email is already registered. Try another one.");
        } else if (errorMsg === "reCAPTCHA verification failed.") {
          alert("⚠️ reCAPTCHA is incorrect. Please try again.");
        } else {
          alert(`❌ ${errorMsg}`);
        }
      } else {
        alert(errorMsg);
      }

      setMessage(errorMsg);
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

          <div className="text-muted text-end" style={{ fontSize: '0.8rem' }}>
            This form is protected by Google reCAPTCHA v3.
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <a href="/login" className="text-decoration-none">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
