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
  }, [])

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
   <div
      className="min-vh-100 vw-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/construction-plans-with-helmet-drawing-tools-blueprints_1232-4300.jpg?uid=R193659352&ga=GA1.1.1797180488.1749059233&w=740')",
        padding: '0px', // Removed padding from the outer container
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="p-0"
        style={{
          width: '100%',
          maxWidth: '450px', // Fixed width for the box
          backgroundColor: '#ffffff',
          borderRadius: '4px', // Reduced border radius
          color: '#333333',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          position: 'fixed', // Fixed position in the center
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden' // Ensure no scroll 
        }}
      >
        {/* Black Header */}
        <div
          className="w-100 py-2 text-center" // Reduced padding
          style={{
            backgroundColor: '#000000',
            color: '#ffffff'
          }}
        >
          <h2 className="m-0" style={{ fontSize: '24px' }}>User Registration</h2>
        </div>

        {/* White Form Body */}
        <div
          className="p-3" // Reduced padding
          style={{
            height: 'auto',
            overflow: 'hidden' // Remove scroll
          }}
        >
          {message && <div className="alert alert-info" style={{ marginBottom: '10px', padding: '5px' }}>{message}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-2"> {/* Reduced margin */}
              <label htmlFor="fullName" className="form-label" style={{ marginBottom: '2px' }}>Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                style={{
                  padding: '4px', // Reduced padding
                  borderRadius: '2px',
                  fontSize: '14px'
                }}
                placeholder="Enter your name"
                onChange={handleChange}
                value={formData.fullName}
                required
              />
            </div>

            <div className="mb-2"> {/* Reduced margin */}
              <label htmlFor="email" className="form-label" style={{ marginBottom: '2px' }}>E-mail</label>
              <input
                type="email"
                name="email"
                className="form-control"
                style={{
                  padding: '4px', // Reduced padding
                  borderRadius: '2px',
                  fontSize: '14px'
                }}
                placeholder="Enter email"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>

            <div className="mb-2"> {/* Reduced margin */}
              <label htmlFor="mobile" className="form-label" style={{ marginBottom: '2px' }}>Contact Number</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                style={{
                  padding: '4px', // Reduced padding
                  borderRadius: '2px',
                  fontSize: '14px'
                }}
                placeholder="Enter mobile number"
                onChange={handleChange}
                value={formData.mobile}
                required
              />
            </div>

            <div className="mb-2"> {/* Reduced margin */}
              <label htmlFor="password" className="form-label" style={{ marginBottom: '2px' }}>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                style={{
                  padding: '4px', // Reduced padding
                  borderRadius: '2px',
                  fontSize: '14px'
                }}
                placeholder="Enter password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>

            <div className="mb-2"> {/* Reduced margin */}
              <label htmlFor="confirmPassword" className="form-label" style={{ marginBottom: '2px' }}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                style={{
                  padding: '4px', // Reduced padding
                  borderRadius: '2px',
                  fontSize: '14px'
                }}
                placeholder="Confirm password"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
              />
            </div>

          <div className="text-muted text-end" style={{ fontSize: '0.8rem' }}>
            This form is protected by Google reCAPTCHA v3.
          </div>

         <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: '#FFD700',
                color: '#000000',
                padding: '8px', // Reduced padding
                borderRadius: '4px',
                border: 'none',
                fontWeight: '600',
                fontSize: '16px',
                marginTop: '4px' // Reduced margin
              }}
            >
              Sign Up
            </button>
          </form>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <a href="/login" className="text-decoration-none">Login</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
