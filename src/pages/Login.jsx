import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://backend-u1pk.onrender.com/user/login', {
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
     
        <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/construction-plans-with-helmet-drawing-tools-blueprints_1232-4300.jpg?uid=R193659352&ga=GA1.1.1797180488.1749059233&w=740')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
     
      }}
    >
      <div
        className="shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* Black Header */}
        <div
          className="p-3"
          style={{
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Login
        </div>

        {/* Form Box */}
        <div className="p-4">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Enter your password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
              <div className="mb-4 d-flex justify-content-end">
              
              <a href="/forgot-password" className="text-decoration-none text-dark">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#FFC107', color: '#000', fontWeight: 'bold' }}
            >
              Login
            </button>
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <a href="/register" className="text-decoration-underline text-blue">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default Login;

