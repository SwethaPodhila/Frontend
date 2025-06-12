import { useEffect, useState } from 'react';

function AdminRFQApprovals() {
    const [rfqs, setRfqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingRFQs = async () => {
        try {
            const res = await fetch('https://backend-u1pk.onrender.com/admin/pending');
            const data = await res.json();
            setRfqs(data);
        } catch (err) {
            console.error('Error fetching RFQs:', err);
        } finally {
            setLoading(false);
        }
    };

    const approveRfq = async (id) => {
        try {
            const res = await fetch(`https://backend-u1pk.onrender.com/admin/approve/${id}`, {
                method: 'POST'
            });
            const result = await res.json();
            if (res.ok) {
                alert('RFQ approved successfully');
                fetchPendingRFQs(); // Refresh list
            } else {
                alert(result.error || 'Failed to approve');
            }
        } catch (err) {
            console.error('Approval error:', err);
            alert('Error during approval');
        }
    };

    useEffect(() => {
        fetchPendingRFQs();
    }, []);

    return (
        <div className="container mt-5" style={{ maxWidth: '960px' }}>
            <h3 className="mb-4 text-primary">🧾 Pending RFQ Approvals</h3>
            {loading ? (
                <p>Loading RFQs...</p>
            ) : rfqs.length === 0 ? (
                <p>No pending RFQs.</p>
            ) : (
                rfqs.map((rfq) => (
                    <div className="card mb-3 shadow-sm" key={rfq._id}>
                        <div className="card-body">
                            <h5 className="card-title text-primary">{rfq.title}</h5>
                            <p className="mb-1"><strong>Budget:</strong> {rfq.budget}</p>
                            <p className="mb-1"><strong>Location:</strong> {rfq.location}</p>
                            <p className="mb-1"><strong>Deadline:</strong> {new Date(rfq.deadline).toLocaleDateString()}</p>
                            <p className="mb-1"><strong>Sub Categories:</strong> {rfq.subCategories.join(', ')}</p>
                            <p className="mb-3"><strong>Providers:</strong> {rfq.providers.join(', ')}</p>
                            <button
                                className="btn btn-success"
                                onClick={() => approveRfq(rfq._id)}
                            >
                                ✅ Approve RFQ
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminRFQApprovals;
