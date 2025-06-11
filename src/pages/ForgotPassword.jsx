import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSendOtp = async () => {
        const res = await fetch('http://localhost:5000/user/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok) {
            alert('OTP sent to your email!');
            setOtpSent(true);
        } else {
            alert(data.message || 'Failed to send OTP');
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const res = await fetch('http://localhost:5000/user/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, newPassword }),
        });
        const data = await res.json();
        if (res.ok) {
            alert('Password reset successful!');
            window.location.href = '/login';
        } else {
            alert(data.message || 'Failed to reset password');
        }
    };

    return (
          <>
            <Header />
            <div className="min-vh-100 vw-100 d-flex flex-column" style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
        }}>

        <div className="container mt-5">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', margin: 'auto' }}>
                <h3 className="mb-4 text-center" style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>Forgot Password</h3>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Registered Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button 
                    className="btn w-100 mb-3" 
                    style={{ backgroundColor: '#FFD700', color: 'black' }} 
                    onClick={handleSendOtp}
                >
                    Send OTP
                </button>

                {/* OTP & Reset Fields */}
                {otpSent && (
                    <>
                        <div className="mb-2">
                            <label htmlFor="otp" className="form-label">Enter OTP</label>
                            <input
                                id="otp"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input
                                id="newPassword"
                                className="form-control"
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                className="form-control"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button 
                            className="btn w-100" 
                            style={{ backgroundColor: '#FFD700', color: 'black' }} 
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
        
            <Footer />
</div>
  </>  );
   
}

export default ForgotPassword;