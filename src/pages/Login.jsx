import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/user/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (response.ok) {
                localStorage.setItem('token', data.token);     // ✅ JWT saved
                alert('Login successful!');
                localStorage.setItem('userId', data.user.id);
                navigate(`/user-dashboard/${data.user.id}`);
                // ✅ Navigate to Dashboard
            }
            else {
                alert(data.message || 'Login failed');
            }

        } catch (err) {
            console.error('Login error:', err);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-5">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">User Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    {/* Links Section */}
                    <div className="text-center mt-3">
                        <a href="/forgot-password" className="text-decoration-none d-block mb-2">Forgot Password?</a>
                        <span>Don't have an account? </span>
                        <a href="/register" className="text-decoration-none">Register</a>
                    </div>
                </form>
            </div>
        </div>
    ); 
}

export default Login;
