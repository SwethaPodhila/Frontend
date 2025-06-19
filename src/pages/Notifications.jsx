import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedRfq, setSelectedRfq] = useState(null);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        message: '',
        price: '',
        state: '',
        city: ''
    });

    const token = localStorage.getItem('token');
    const decodedUser = token ? jwtDecode(token) : null;

    // Fetch state list
    useEffect(() => {
        if (!token) return;

        fetch('https://backend-u1pk.onrender.com/admin/state/states')
            .then(res => res.json())
            .then(data => setStates(data))
            .catch(err => console.error("Error fetching states:", err));
    }, [token]);

    const handleOpenModal = (note) => {
        setSelectedRfq(note);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedRfq(null);
        setFormData({
            message: '',
            price: '',
            state: '',
            city: ''
        });
        setCities([]);
        setShowModal(false);
    };

    const handleStateChange = async (e) => {
        const selectedState = e.target.value;
        setFormData(prev => ({ ...prev, state: selectedState, city: '' }));

        try {
            const res = await fetch(`https://backend-u1pk.onrender.com/admin/city/cities`);
            const data = await res.json();

            const filteredCities = data.filter(city =>
                city.stateName === selectedState || city.state?.stateName === selectedState
            );

            setCities(filteredCities);
        } catch (err) {
            console.error('Error fetching cities:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const rfqId = selectedRfq?.rfq?._id || selectedRfq?.rfq;

            if (!rfqId) {
                alert("RFQ ID is missing.");
                return;
            }

            const userId = decodedUser?.id;
            const userEmail = decodedUser?.email;

            if (!userId || !userEmail) {
                alert("User info missing. Please log in again.");
                return;
            }

            const res = await fetch('https://backend-u1pk.onrender.com/rfq/responses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    rfqId,
                    userId,        // ✅ correct field
                    userEmail,     // ✅ correct field
                    ...formData    // includes message, price, state, city
                })
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            alert('Response submitted successfully!');
            handleCloseModal();
        } catch (err) {
            console.error('Error submitting response:', err);
            alert('Failed to submit response');
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!token) return;

            try {
                const res = await fetch('https://backend-u1pk.onrender.com/rfq/notifications/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                console.log("Fetched notifications:", data);

                if (Array.isArray(data)) {
                    setNotifications(data);
                } else if (Array.isArray(data.notifications)) {
                    setNotifications(data.notifications);
                } else {
                    console.error("Unexpected notifications format:", data);
                    setNotifications([]);
                }
            } catch (err) {
                console.error('Failed to fetch notifications', err);
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [token]);

    return (
        <>
            <Header />
            <div className="container mt-5" style={{ maxWidth: '960px', fontFamily: 'Inter, sans-serif' }}>
                <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
                    <h3 className="mb-4 text-primary fw-semibold">📬 Notifications</h3>

                    {loading ? (
                        <p>Loading notifications...</p>
                    ) : notifications.length === 0 ? (
                        <p className="text-muted">No notifications yet.</p>
                    ) : (
                        notifications.map((note, idx) => (
                            <div className="card mb-3 shadow-sm" key={idx}>
                                <div className="card-body">
                                    <h5 className="card-title text-success">{note.rfq?.title || 'RFQ'}</h5>
                                    <p><strong>Message:</strong> {note.message}</p>
                                    <p><strong>Location:</strong> {note.city || 'N/A'}, {note.state || 'N/A'}</p>
                                    <p><strong>Budget:</strong> {note.budget || 'N/A'}</p>
                                    <p><strong>Deadline:</strong> {note.deadline ? new Date(note.deadline).toLocaleDateString() : 'N/A'}</p>

                                    <p className="text-muted small">Received on {new Date(note.createdAt).toLocaleString()}</p>

                                    {note.rfq ? (
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleOpenModal(note)}
                                        >
                                            ✍️ Respond to this RFQ
                                        </button>
                                    ) : (
                                        <p className="text-danger small">RFQ ID missing. Cannot respond.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal for responding */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Respond to RFQ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            name="message"
                            className="form-control"
                            rows="3"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">State</label>
                        <select
                            name="state"
                            className="form-select"
                            value={formData.state}
                            onChange={handleStateChange}
                        >
                            <option value="">-- Select State --</option>
                            {states.map((s, i) => (
                                <option key={i} value={s.stateName}>{s.stateName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City</label>
                        <select
                            name="city"
                            className="form-select"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!formData.state}
                        >
                            <option value="">-- Select City --</option>
                            {cities.map((c, i) => (
                                <option key={i} value={c.cityName}>{c.cityName}</option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit}>Submit Response</Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
}

export default Notifications;
