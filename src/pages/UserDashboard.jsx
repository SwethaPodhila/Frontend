import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';

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
        const userRes = await fetch(`https://backend-u1pk.onrender.com/user/dashboard/${id}`, {
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
    return <div className="alert alert-danger m-5">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: '#f4f6f9', minHeight: '100vh', padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>

          {/* WELCOME + ADD BUTTON */}
          <div className="mb-5 p-4 rounded shadow-sm bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h3 className="fw-bold mb-1">Welcome, {user.fullName}!</h3>
                <p className="text-muted mb-0">Here's your current account summary:</p>
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={() => navigate(`/rfq/${id}`)}
              >
                <i className="bi bi-plus-circle me-2 fs-5"></i> Add New Project
              </button>
            </div>

            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <div className="p-3 border-start border-warning border-4 bg-light rounded shadow-sm d-flex align-items-center">
                  <i className="bi bi-person-badge fs-3 me-3 text-warning"></i>
                  <div>
                    <h6 className="text-muted mb-1">Category</h6>
                    <strong>{user.mainCategory || 'N/A'}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 border-start border-success border-4 bg-light rounded shadow-sm d-flex align-items-center">
                  <i className="bi bi-tag fs-3 me-3 text-success"></i>
                  <div>
                    <h6 className="text-muted mb-1">Subcategory</h6>
                    <strong>{user.subCategory || 'N/A'}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3 border-start border-primary border-4 bg-light rounded shadow-sm d-flex align-items-center">
                  <i className="bi bi-check-circle fs-3 me-3 text-primary"></i>
                  <div>
                    <h6 className="text-muted mb-1">Account Status</h6>
                    <span className={`badge ${localStorage.getItem('token') ? 'bg-success' : 'bg-danger'}`}>
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
            {[
              {
                title: "All Projects",
                icon: "bi-kanban",
                color: "#ffc107",
                bg: "rgba(255, 193, 7, 0.1)",
                btnText: "Manage",
                path: `/projects/${id}`,
              },
              {
                title: "Create Project",
                icon: "bi-file-earmark-plus",
                color: "#6c757d",
                bg: "rgba(108, 117, 125, 0.1)",
                btnText: "Create",
                path: `/rfq/${id}`,
              },
              {
                title: "Notifications",
                icon: "bi-bell",
                color: "#dc3545",
                bg: "rgba(220, 53, 69, 0.1)",
                btnText: "View",
                path: `/notifications/${id}`,
              },
              {
                title: "Professionals",
                icon: "bi-search",
                color: "#0d6efd",
                bg: "rgba(13, 110, 253, 0.1)",
                btnText: "Search",
                path: `/professionals/search`,
              },
              {
                title: "Tasks",
                icon: "bi-list-task",
                color: "#17a2b8",
                bg: "rgba(23, 162, 184, 0.1)",
                btnText: "Open",
                path: `/tasks/${id}`,
              },
              {
                title: "Team",
                icon: "bi-people",
                color: "#6610f2",
                bg: "rgba(102, 16, 242, 0.1)",
                btnText: "View",
                path: `/team/${id}`,
              },
              {
                title: "Files",
                icon: "bi-folder2-open",
                color: "#fd7e14",
                bg: "rgba(253, 126, 20, 0.1)",
                btnText: "Browse",
                path: `/files/${id}`,
              },
              {
                title: "Chat",
                icon: "bi-chat-dots",
                color: "#198754",
                bg: "rgba(25, 135, 84, 0.1)",
                btnText: "Message",
                path: `/chat/${id}`,
              },
              {
                title: "Schedule",
                icon: "bi-calendar-check",
                color: "#20c997",
                bg: "rgba(32, 201, 151, 0.1)",
                btnText: "Plan",
                path: `/schedule/${id}`,
              },
              {
                title: "Reports",
                icon: "bi-bar-chart-line",
                color: "#d63384",
                bg: "rgba(214, 51, 132, 0.1)",
                btnText: "Analyze",
                path: `/reports/${id}`,
              },
              {
                title: "Settings",
                icon: "bi-gear",
                color: "#343a40",
                bg: "rgba(52, 58, 64, 0.1)",
                btnText: "Configure",
                path: `/settings/${id}`,
              }
            ].map((action, index) => (
              <div className="col-md-3" key={index}>
                <div
                  className="h-100 p-3"
                  style={{
                    backgroundColor: action.bg,
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    border: '1px solid #f0f0f0',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onClick={() => navigate(action.path)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <i className={`bi ${action.icon} fs-3 mb-2`} style={{ color: action.color }}></i>
                  <h6 style={{ fontWeight: '600', color: action.color }}>{action.title}</h6>
                  <p style={{ fontSize: '0.85rem', color: '#555' }}>{action.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <UserFooter />
    </>
  );
}

export default UserDashboard;