import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:5000/rfq/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
    }, []);

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
                                    <h5 className="card-title text-success">
                                        {note.rfq?.title || 'RFQ'}
                                    </h5>
                                    <p className="mb-1">
                                        <strong>Message:</strong> {note.message}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Location:</strong> {note.rfq?.city || 'N/A'} , {note.rfq?.state || 'N/A'}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Budget:</strong> {note.rfq?.budget || 'N/A'}
                                    </p>
                                    <p className="mb-1">
                                        <strong>Deadline:</strong>{' '}
                                        {note.rfq?.deadline
                                            ? new Date(note.rfq.deadline).toLocaleDateString()
                                            : 'N/A'}
                                    </p>
                                    <p className="text-muted mt-2" style={{ fontSize: '0.85rem' }}>
                                        Received on {new Date(note.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Notifications;
