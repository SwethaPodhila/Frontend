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
                <h4 className="mb-0">nineplusinfra</h4>
                <div className="d-flex align-items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-dark me-3"
                        style={{ padding: '5px 12px', fontSize: '14px' }}
                    >
                        ← Back
                    </button>
                    <nav>
                        <Link to="/" className="text-dark me-3 text-decoration-none border border-dark rounded px-2 py-1">Home</Link>
                        {userId && (
                            <Link to={`/dashboard/${userId}`} className="text-dark me-3 text-decoration-none border border-dark rounded px-2 py-1">Profile</Link>
                        )}
                        <span
                            className="text-dark text-decoration-none border border-dark rounded px-2 py-1"
                            style={{ cursor: 'pointer' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </span>
                    </nav>
                </div>
            </div>

        </header>
    );
}

export default Header;