import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';

function Rfq() {
    const [rfqs, setRfqs] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRfqs = async () => {
            try {
                const res = await fetch('https://backend-u1pk.onrender.com/rfq/rfq/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setRfqs(data);
            } catch (err) {
                console.error('Error fetching user RFQs:', err);
            }
        };

        fetchRfqs();
    }, [token]);

    const urgencyBadge = (urgency) => {
        const badgeColors = {
            low: 'secondary',
            medium: 'info',
            high: 'warning',
            urgent: 'danger'
        };
        const labelMap = {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            urgent: 'Urgent'
        };
        return (
            <span className={`badge bg-${badgeColors[urgency] || 'secondary'} px-2 py-1`}>
                {labelMap[urgency] || urgency}
            </span>
        );
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5 mb-5">
                <h3 className="mb-4 fw-bold text-warning">📄 My RFQs</h3>

                {rfqs.length === 0 ? (
                    <p className="text-muted">No RFQs found.</p>
                ) : (
                    <div className="row g-4">
                        {rfqs.map((rfq) => (
                            <div className="col-md-6 col-lg-4" key={rfq._id}>
                                <div className="card h-100 shadow-sm border border-warning rounded-3">


                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold text-dark">{rfq.title}</h5>
                                        <p className="mb-1"><strong>Location:</strong> {rfq.city}, {rfq.state}</p>
                                        <p className="mb-1"><strong>Budget:</strong> {rfq.budget}</p>
                                        <p className="mb-1"><strong>Deadline:</strong> {moment(rfq.endDate).format('DD MMM YYYY')}</p>
                                        <p className="mb-2"><strong>Urgency:</strong> {urgencyBadge(rfq.urgency)}</p>

                                        {rfq.subCategories?.length > 0 && (
                                            <div className="mb-2">
                                                <strong>Categories:</strong>
                                                <div className="d-flex flex-wrap gap-1 mt-1">
                                                    {rfq.subCategories.map((cat, idx) => (
                                                        <span key={idx} className="badge bg-light text-dark border">{cat}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <p className="card-text"><strong>Description :</strong> <span className="text-muted small mt-auto">{rfq.description?.slice(0, 100)}...</span></p>
                                        <div className="mt-auto">
                                            <button className="btn btn-outline-warning w-100 mt-2 fw-semibold" onClick={() => navigate(`/Rfqdetailed/${rfq._id}`)}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <UserFooter />
        </>
    );
}

export default Rfq;
