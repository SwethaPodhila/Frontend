import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';
import { jwtDecode } from 'jwt-decode'; 


const urgencyOptions = [
    { label: 'Low (15+ days)', value: 'low' },
    { label: 'Medium (7–15 days)', value: 'medium' },
    { label: 'High (3–6 days)', value: 'high' },
    { label: 'Urgent (1–2 days)', value: 'urgent' },
];

function CreateRfq() {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        state: '',
        city: '',
        description: '',
        endDate: '',
        urgency: '',
        budget: ''
    });

    const [projectTypes, setProjectTypes] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [imageInputs, setImageInputs] = useState([{ id: Date.now(), file: null }]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch categories
        fetch('https://backend-u1pk.onrender.com/category/sub-categories')
            .then(res => res.json())
            .then(data => setProjectTypes(data));

        // Fetch states dynamically
        fetch('https://backend-u1pk.onrender.com/admin/state/states')
            .then(res => res.json())
            .then(data => setStates(data))
            .catch(err => console.error("Error fetching states:", err));
    }, []);

    const handleStateChange = async (e) => {
        const state = e.target.value;
        setFormData(prev => ({ ...prev, state, city: '' }));

        try {
            const res = await fetch(`https://backend-u1pk.onrender.com/admin/city/cities`);
            const data = await res.json();
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (idx, file) => {
        const updated = [...imageInputs];
        updated[idx].file = file;
        setImageInputs(updated);
        const previews = updated.filter(f => f.file).map(f => URL.createObjectURL(f.file));
        setPreviewUrls(previews);
    };

    const handleAddImage = () => {
        if (imageInputs.length >= 6) return;
        setImageInputs(prev => [...prev, { id: Date.now(), file: null }]);
    };

    const handleSubmit = async () => {
        const form = new FormData();

        // Append form data
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        // Subcategories
        form.append("subCategories", JSON.stringify(selectedSubCategories));

        // Images
        imageInputs.forEach(img => {
            if (img.file) form.append('images', img.file);
        });

        // Decode token to get user ID
        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id || decoded._id || decoded.userId; // based on your token payload
            form.append("createdBy", userId); // send explicitly if backend requires
        } catch (err) {
            alert("Invalid or expired token. Please log in again.");
            return;
        }

        // Submit
        const res = await fetch('https://backend-u1pk.onrender.com/rfq/rfq/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: form
        });

        const data = await res.json();

        if (!res.ok) {
            alert(`Error: ${data.message}`);
        } else {
            alert('RFQ created successfully! and Notification sent successfully');
            window.location.reload();
        }
    };

    return (
        <>
            <Navbar />
            <div className="container my-5 create-rfq-container">
                <style>{`
                    .create-rfq-container {
                        max-width:1050px;
                        background: linear-gradient(135deg, #f3f4f6, #e9ecef);
                        font-family: 'Inter', sans-serif;
                        border-radius: 12px;
                    }
                    .create-rfq-form {
                        background: white;
                        padding: 30px;
                        border-radius: 16px;
                        border: 2px solid #ffc107;
                        box-shadow: 0 0 20px rgba(0,0,0,0.06);
                    }
                    .rfq-preview {
                        width: 100px;
                        height: 80px;
                        object-fit: cover;
                        border-radius: 6px;
                        border: 1px solid #ccc;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    .form-label {
                        font-weight: 600;
                    }
                `}</style>

                <div className="create-rfq-form">
                    <h3 className="text-center text-warning fw-bold mb-4">📄 Create New RFQ</h3>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">RFQ Title</label>
                            <input type="text" name="title" className="form-control" required onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Budget Range</label>
                            <select name="budget" className="form-select" value={formData.budget} onChange={handleChange}>
                                <option value="">-- Select Budget --</option>
                                <option value="Under 1 Lakh">Under 1 Lakh</option>
                                <option value="1–2 Lakhs">1–2 Lakhs</option>
                                <option value="2–5 Lakhs">2–5 Lakhs</option>
                                <option value="5–10 Lakhs">5–10 Lakhs</option>
                                <option value="10–25 Lakhs">10–25 Lakhs</option>
                                <option value="Above 25 Lakhs">Above 25 Lakhs</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Select categories</label>
                            <Select
                                isMulti
                                name="subCategories"
                                options={projectTypes.map(pt => ({ label: pt.name, value: pt.name }))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(selected) => {
                                    const selectedValues = selected.map(item => item.value);
                                    setSelectedSubCategories(selectedValues);
                                }}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">State</label>
                            <select name="state" className="form-select" onChange={handleStateChange} value={formData.state}>
                                <option value="">-- Select State --</option>
                                {states.map((s) => (
                                    <option key={s._id} value={s.stateName}>{s.stateName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">City</label>
                            <select name="city" className="form-select" onChange={handleChange} value={formData.city}>
                                <option value="">-- Select City --</option>
                                {cities.map((c) => (
                                    <option key={c._id} value={c.cityName}>{c.cityName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <textarea name="description" className="form-control" rows="3" placeholder="Describe your project..." onChange={handleChange}></textarea>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Deadline</label>
                            <input type="date" name="endDate" className="form-control" onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Urgency</label>
                            <select name="urgency" className="form-select" onChange={handleChange}>
                                <option value="">-- Select Urgency --</option>
                                {urgencyOptions.map((u, i) => (
                                    <option key={i} value={u.value}>{u.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="form-label">Upload Images (max 6)</label>
                        {imageInputs.map((input, idx) => (
                            <div key={input.id} className="d-flex align-items-center mb-2 gap-3">
                                <input type="file" accept="image/*" className="form-control" onChange={e => handleImageChange(idx, e.target.files[0])} />
                                {idx === imageInputs.length - 1 && imageInputs.length < 6 && (
                                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleAddImage}>+ Add Image</button>
                                )}
                            </div>
                        ))}

                        <div className="d-flex flex-wrap gap-2 mt-3">
                            {previewUrls.map((url, i) => (
                                <img key={i} src={url} alt="preview" className="rfq-preview" />
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-warning w-100 mt-4 fw-semibold fs-5" onClick={handleSubmit}>Submit RFQ</button>
                </div>
            </div>
            <UserFooter />
        </>
    );
}

export default CreateRfq;
