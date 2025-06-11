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
      <div className="dashboard-container" style={{ 
        backgroundColor: '#f8f9fa',
        minHeight: 'calc(100vh - 120px)',
        padding: '40px 0'
      }}>
        <div className="container py-4" style={{ 
          maxWidth: '1200px',
          fontFamily: "'Inter', sans-serif"
        }}>
          {/* Dashboard Header */}
          <div className="dashboard-header mb-5 text-center">
            <h2 className="fw-bold mb-3" style={{ color: '#2c3e50' }}>Welcome, {user.name || 'User'}</h2>
            <p className="text-muted">Manage your account and services</p>
          </div>

          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="stats-card h-100 p-4" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #ffc107'
              }}>
                <div className="d-flex align-items-center">
                  <div className="icon-container me-3" style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-person-badge fs-4" style={{ color: '#ffc107' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold" style={{ color: '#495057' }}>Category</h6>
                    <p className="mb-0" style={{ color: '#6c757d' }}>{user.mainCategory || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card h-100 p-4" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #20c997'
              }}>
                <div className="d-flex align-items-center">
                  <div className="icon-container me-3" style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(32, 201, 151, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-tag fs-4" style={{ color: '#20c997' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold" style={{ color: '#495057' }}>Subcategory</h6>
                    <p className="mb-0" style={{ color: '#6c757d' }}>{user.subCategory || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stats-card h-100 p-4" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #0d6efd'
              }}>
                <div className="d-flex align-items-center">
                  <div className="icon-container me-3" style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="bi bi-check-circle fs-4" style={{ color: '#0d6efd' }}></i>
                  </div>
                  <div>
                    <h6 className="mb-1 fw-semibold" style={{ color: '#495057' }}>Account Status</h6>
                    <span className={`badge ${localStorage.getItem('token') ? 'bg-success' : 'bg-danger'} px-3 py-1`}>
                      {localStorage.getItem('token') ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h5 className="fw-bold mb-4" style={{ color: '#2c3e50' }}>Quick Actions</h5>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="action-card h-100 p-4 text-center" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onClick={() => navigate(`/projects/${id}`)}>
                <div className="icon-container mx-auto mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255, 193, 7, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="bi bi-kanban fs-3" style={{ color: '#ffc107' }}></i>
                </div>
                <h6 className="fw-semibold mb-3" style={{ color: '#495057' }}>Projects</h6>
                <button className="btn btn-sm w-100" style={{
                  backgroundColor: '#ffc107',
                  color: '#000',
                  fontWeight: '500',
                  borderRadius: '6px'
                }}>
                  Manage
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="action-card h-100 p-4 text-center" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onClick={() => navigate(`/rfq/${id}`)}>
                <div className="icon-container mx-auto mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(108, 117, 125, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="bi bi-file-earmark-plus fs-3" style={{ color: '#6c757d' }}></i>
                </div>
                <h6 className="fw-semibold mb-3" style={{ color: '#495057' }}>RFQ</h6>
                <button className="btn btn-sm w-100" style={{
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  fontWeight: '500',
                  borderRadius: '6px'
                }}>
                  Create
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="action-card h-100 p-4 text-center" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onClick={() => navigate(`/notifications/${id}`)}>
                <div className="icon-container mx-auto mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(220, 53, 69, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="bi bi-bell fs-3" style={{ color: '#dc3545' }}></i>
                </div>
                <h6 className="fw-semibold mb-3" style={{ color: '#495057' }}>Notifications</h6>
                <button className="btn btn-sm w-100" style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  fontWeight: '500',
                  borderRadius: '6px'
                }}>
                  View
                </button>
              </div>
            </div>
            <div className="col-md-3">
              <div className="action-card h-100 p-4 text-center" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }} onClick={() => navigate(`/professionals/search`)}>
                <div className="icon-container mx-auto mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(13, 110, 253, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="bi bi-search fs-3" style={{ color: '#0d6efd' }}></i>
                </div>
                <h6 className="fw-semibold mb-3" style={{ color: '#495057' }}>Professionals</h6>
                <button className="btn btn-sm w-100" style={{
                  backgroundColor: '#0d6efd',
                  color: '#fff',
                  fontWeight: '500',
                  borderRadius: '6px'
                }}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;