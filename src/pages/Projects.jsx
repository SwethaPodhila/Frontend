
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserFooter from '../components/UserFooter';
import Navbar from '../components/Navbar';

function Projects() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://backend-u1pk.onrender.com/project/user/Rfqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch RFQs');
        const data = await res.json();
        setRfqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRfqs();
  }, [id]);

  return (
    <>
      <Navbar />
      <div style={styles.pageWrapper}>
        <div className="container py-5">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>← Back</button>
            <h2 style={styles.title}>Project Dashboard</h2>
            <button
              className="btn d-flex align-items-center"
              style={{ backgroundColor: '#ffc107', color: '#000' }}
              onClick={() => navigate(`/rfq/${id}`)}
            >
              <i className="bi bi-plus-circle me-2 fs-5"></i> Add New Project
            </button>
          </div>

          <p className="text-muted mb-4">View, manage and track the status of your project RFQs.</p>

          {/* Stats Section */}
          <div className="row g-4 mb-5">
            <StatCard title="Total Projects" value={rfqs.length} bg="#f1f8e9" />
            <StatCard title="Planning" value={rfqs.filter(r => r.stage === 'planning').length} bg="#e3f2fd" />
            <StatCard title="Execution" value={rfqs.filter(r => r.stage === 'execution').length} bg="#fff3e0" />
            <StatCard title="Completed" value={rfqs.filter(r => r.stage === 'completed').length} bg="#ede7f6" />
          </div>

          {/* RFQs Section */}
          <h4 className="mb-4">Your Projects</h4>

          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="row g-4">
              {rfqs.map(rfq => (
                <div className="col-md-4" key={rfq._id}>
                  <div className="card h-100 shadow-sm border-0 position-relative">
                    {/* Top-right Status Badge */}
                    <span
                      className={`badge position-absolute top-0 end-0 m-3 ${rfq.stage === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}
                    >
                      {rfq.stage}
                    </span>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-2" style={{ color: '#ffc107' }}>{rfq.title}</h5>
                      <p className="mb-2"><strong>Deadline:</strong> {new Date(rfq.deadline).toLocaleDateString()}</p>
                      <p className="mb-2"><strong>Startdate:</strong> {new Date(rfq.startdate).toLocaleDateString()}</p>
                      <p className="mb-2"><strong>Location:</strong> {rfq.city}, {rfq.state}</p>
                      <p className="mb-2"><strong>Budget:</strong> {rfq.budget}</p>
                      <button
                        className="btn mt-auto"
                        style={{ border: '1px solid #ffc107', color: '#ffc107' }}
                        onClick={() => navigate(`/projectDetails/${rfq._id}`)}
                      >
                        View Details
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <UserFooter />
    </>
  );
}

function StatCard({ title, value, bg }) {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: bg }}>
        <h6 className="text-muted mb-2">{title}</h6>
        <h3 className="fw-bold">{value}</h3>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
  },
};

export default Projects;
