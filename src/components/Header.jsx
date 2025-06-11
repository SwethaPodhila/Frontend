// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header style={{ backgroundColor: '#FFD700', color: 'black', padding: '18px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="container d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Nine Plus Infra</h4>
                <nav>
                    <Link to="/" className="text-dark me-4 text-decoration-none border border-dark rounded" style={{ padding: '5px 10px' }}>Home</Link>
                    {userId && (
                        <Link to={`/dashboard/${userId}`} className="text-dark me-4 text-decoration-none border border-dark rounded" style={{ padding: '5px 10px' }}>
                            Profile
                        </Link>
                    )}
                    <span
                        className="text-dark text-decoration-none border border-dark rounded"
                        style={{ cursor: 'pointer', padding: '5px 10px' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </span>
                </nav>
            </div>
        </header>
    );
}

export default Header;