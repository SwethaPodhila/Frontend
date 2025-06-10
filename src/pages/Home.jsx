import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <Link className="navbar-brand" to="/">My App</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-primary" to="/login">Sign In</Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5 text-center">
        <h1>This is the Home Page</h1>
        <p>Welcome to the application homepage.</p>
      </div>
    </div>
  );
};

export default Home;
