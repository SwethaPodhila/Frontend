import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function UserDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token found. Please login.");
        navigate('/login');
        return;
      }
      try {
        const userRes = await fetch(`http://localhost:5000/user/dashboard/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("User API failed");
        const userData = await userRes.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDashboardData();
  }, [id, navigate]);

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading dashboard...</p>
      </div>
    );
  }
  
  return (
    <>
      <Header />
      <div className="container py-5" style={{ maxWidth: '1000px', fontFamily: 'Inter, sans-serif' }}>
        <h3 className="text-center mb-5 fw-bold">User Dashboard</h3>

        {/* User Info Section */}
        <div className="row text-center g-4 mb-5">
          <div className="col-md-4">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-person-badge fs-1 text-primary mb-2"></i>
              <h6 className="fw-bold mb-1">Category</h6>
              <p className="text-muted">{user.mainCategory}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-tag fs-1 text-success mb-2"></i>
              <h6 className="fw-bold mb-1">Subcategory</h6>
              <p className="text-muted">{user.subCategory}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-check-circle fs-1 text-info mb-2"></i>
              <h6 className="fw-bold mb-1">Active Status</h6>
              <span className={`badge rounded-pill px-3 py-2 fw-medium ${localStorage.getItem('token') ? 'bg-success' : 'bg-danger'}`}>
                {localStorage.getItem('token') ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Manage Section */}
        <h5 className="fw-bold mb-3">Manage</h5>
        <div className="row text-center g-4">
          <div className="col-md-3">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-kanban fs-2 text-warning mb-2"></i>
              <h6 className="fw-semibold">Project Management</h6>
              <button
                className="btn btn-warning btn-sm w-100 mt-2"
                onClick={() => navigate(`/projects/${id}`)}
              >
                Go
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-file-earmark-plus fs-2 text-secondary mb-2"></i>
              <h6 className="fw-semibold">RFQ Create</h6>
              <button
                className="btn btn-secondary btn-sm w-100 mt-2"
                onClick={() => navigate(`/rfq/${id}`)}
              >
                Create
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-bell fs-2 text-danger mb-2"></i>
              <h6 className="fw-semibold">Notifications</h6>
              <button
                className="btn btn-danger btn-sm w-100 mt-2"
                onClick={() => navigate(`/notifications/${id}`)}
              >
                View
              </button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="shadow-sm rounded bg-white p-4">
              <i className="bi bi-search fs-2 text-info mb-2"></i>
              <h6 className="fw-semibold">Search Profession</h6>
              <button
                className="btn btn-info btn-sm w-100 mt-2 text-white"
                onClick={() => navigate(`/professionals/search`)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
