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
        <header className="bg-dark text-light py-3 shadow-sm">
            <div className="container d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Nine Plus Infra</h4>
                <nav>
                    <Link to="/" className="text-light me-4 text-decoration-none">Home</Link>
                    {userId && (
                        <Link to={`/dashboard/${userId}`} className="text-light me-4 text-decoration-none">
                            Profile
                        </Link>
                    )}
                    <span
                        className="text-light text-decoration-none"
                        style={{ cursor: 'pointer' }}
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
