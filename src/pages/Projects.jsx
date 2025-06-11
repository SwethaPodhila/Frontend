import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Projects() {
  const { id } = useParams();  // Get user ID from the URL parameters
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const token = localStorage.getItem('token');  // Get token from localStorage
        const res = await fetch(`http://localhost:5000/rfq/user/Rfqs/${id}`, {  // Pass user ID in the URL
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch RFQs');
        }

        const data = await res.json();
        setRfqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

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
    </div>
  );
}

export default Projects;
