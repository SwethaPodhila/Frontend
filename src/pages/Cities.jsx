import React, { useState } from 'react';

function Cities() {
    const [state, setState] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const stateList = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/admin/add/cities', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state, name }),
            });
            const data = await res.json();
            setMessage(data.message);
            setName('');
        } catch (err) {
            console.error('Submit failed', err);
            setMessage('Failed to add city');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            
            <h2 className="mb-4">Add City (Admin)</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select State</label>
                    <select className="form-select" value={state} onChange={e => setState(e.target.value)} required>
                        <option value="">-- Select State --</option>
                        {stateList.map((s, idx) => (
                            <option key={idx} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">City Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add City</button>
            </form>
        </div>
    );
}

export default Cities;
