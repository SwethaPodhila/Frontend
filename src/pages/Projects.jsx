<<<<<<< HEAD

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
=======
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Projects() {
  const { id } = useParams();  // Get user ID from the URL parameters
>>>>>>> b2e81004913c99e4041a9269bbb142641cf397a8
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
<<<<<<< HEAD
        const token = localStorage.getItem('token');
        const res = await fetch(`https://backend-u1pk.onrender.com/rfq/user/Rfqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch RFQs');
=======
        const token = localStorage.getItem('token');  // Get token from localStorage
        const res = await fetch(`http://localhost:5000/rfq/user/Rfqs/${id}`, {  // Pass user ID in the URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch RFQs');
        }

>>>>>>> b2e81004913c99e4041a9269bbb142641cf397a8
        const data = await res.json();
        setRfqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
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
            <StatCard title="Approved" value={rfqs.filter(r => r.status === 'approved').length} bg="#e8f5e9" />
            <StatCard title="Pending" value={rfqs.filter(r => r.status !== 'approved').length} bg="#fff3e0" />
            <StatCard title="Completed" value={0} bg="#ede7f6" />
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
                      className={`badge position-absolute top-0 end-0 m-3 ${rfq.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'}`}
                    >
                      {rfq.status}
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
=======

    fetchRfqs();
  }, [id]);  // Dependency on the user ID

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2>Your Created RFQs</h2>
      {rfqs.length === 0 ? (
        <p className="text-muted text-center">You haven’t created any RFQs yet.</p>
      ) : (
        <div className="list-group">
          {rfqs.map((rfq) => (
            <div key={rfq._id} className="list-group-item">
              <h5>{rfq.title}</h5>
              <p><strong>Budget:</strong> {rfq.budget}</p>
              <p><strong>Location:</strong> {rfq.city}, {rfq.state}</p>
              <p><strong>Deadline:</strong> {new Date(rfq.deadline).toLocaleDateString()}</p>
              <Link to={`/rfq/${rfq._id}`} className="btn btn-primary btn-sm">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
>>>>>>> b2e81004913c99e4041a9269bbb142641cf397a8
    </div>
  );
}

<<<<<<< HEAD
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

=======
>>>>>>> b2e81004913c99e4041a9269bbb142641cf397a8
export default Projects;
