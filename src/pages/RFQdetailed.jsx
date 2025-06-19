import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';

function RfqDetailed() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [rfq, setRfq] = useState(null);
    const [responses, setResponses] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };

                const res1 = await fetch('https://backend-u1pk.onrender.com/rfq/rfq/user', { headers });
                const user = await res1.json();
                setCurrentUserId(user._id);

                const rfqRes = await fetch(`https://backend-u1pk.onrender.com/rfq/rfq/${id}`, { headers });
                const rfqData = await rfqRes.json();
                setRfq(rfqData);

                const respRes = await fetch(`https://backend-u1pk.onrender.com/rfq/responses/${id}`, { headers });
                const respData = await respRes.json();
                setResponses(Array.isArray(respData) ? respData : []);
            } catch (err) {
                console.error("Error loading RFQ or responses:", err);
            }
        };

        fetchData();
    }, [id, token]);

    if (!rfq) return <div className="text-center mt-5">Loading RFQ details...</div>;

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="row g-4">

                    {/* LEFT: RFQ Details (60%) */}
                    <div className="col-md-6">
                        <div className="bg-white rounded-4 shadow-sm border border-warning p-4">
                            <h2 className="fw-bold text-warning mb-4">{rfq.title}</h2>

                            <div className="d-flex flex-column gap-3">

                                {/* Location */}
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <span className="text-muted fw-semibold">📍 Location</span>
                                    <span className="text-dark">{rfq.city}, {rfq.state}</span>
                                </div>

                                {/* Budget */}
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <span className="text-muted fw-semibold">💰 Budget</span>
                                    <span className="text-dark">{rfq.budget}</span>
                                </div>

                                {/* Deadline */}
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <span className="text-muted fw-semibold">📆 Deadline</span>
                                    <span className="text-dark">{moment(rfq.endDate).format('DD MMM YYYY')}</span>
                                </div>

                                {/* Urgency */}
                                <div className="d-flex justify-content-between border-bottom pb-2">
                                    <span className="text-muted fw-semibold">⚡ Urgency</span>
                                    <span>
                                        <span className="badge bg-secondary">{rfq.urgency}</span>
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <span className="text-muted fw-semibold d-block mb-1">📝 Description</span>
                                    <p className="text-dark small mb-0" style={{ lineHeight: '1.6' }}>{rfq.description}</p>
                                </div>

                                {/* Categories */}
                                {rfq.subCategories?.length > 0 && (
                                    <div>
                                        <span className="text-muted fw-semibold d-block mb-1">🔧 Categories</span>
                                        <div className="d-flex flex-wrap gap-2">
                                            {rfq.subCategories.map((cat, i) => (
                                                <span key={i} className="badge bg-light text-dark border border-secondary">{cat}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Images */}
                                {rfq.images?.length > 0 && (
                                    <div>
                                        <span className="text-muted fw-semibold d-block mb-2">📷 Images</span>
                                        <div className="d-flex flex-wrap gap-3">
                                            {rfq.images.map((img, idx) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`rfq-img-${idx}`}
                                                    className="rounded border"
                                                    style={{ width: 120, height: 90, objectFit: 'cover' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Edit Button */}
                                {currentUserId === rfq.createdBy && (
                                    <div className="mt-4 text-end">
                                        <button
                                            className="btn btn-outline-primary px-4 fw-semibold"
                                            onClick={() => navigate(`/editRfq/${rfq._id}`)}
                                        >
                                            ✏️ Edit This RFQ
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Responses (40%) */}
                    <div className="col-md-6">
                        <div className="bg-white shadow rounded p-4 border border-light">
                            <h4 className="fw-bold mb-4 text-secondary"> Responses</h4>

                            {responses.length > 0 ? (
                                responses.map((resp, i) => (
                                    <div key={i} className="border-start border-4 border-success ps-3 mb-4">
                                        <h6 className="fw-semibold mb-1">{resp.userName}</h6>
                                        <p className="mb-1"><strong>Email:</strong> {resp.userEmail}</p>
                                        <p className="mb-1"><strong>Message:</strong> {resp.message}</p>
                                        <p className="mb-1"><strong>💰 Offered Price:</strong> ₹{resp.price}</p>
                                        <p className="text-muted small">{moment(resp.createdAt).fromNow()}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="alert alert-light text-muted">
                                    No responses yet for this RFQ.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            <UserFooter />
        </>
    );
}

export default RfqDetailed;
