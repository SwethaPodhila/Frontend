import React, { useEffect, useState } from 'react';

const stateList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

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
    });

    const [projectTypes, setProjectTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [imageInputs, setImageInputs] = useState([{ id: Date.now(), file: null }]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:5000/category/projectTypes')
            .then(res => res.json())
            .then(data => setProjectTypes(data));
    }, []);

    const handleStateChange = async (e) => {
        const state = e.target.value;
        setFormData(prev => ({ ...prev, state, city: '' }));
        const res = await fetch(`http://localhost:5000/admin/citiesByState?state=${encodeURIComponent(state)}`);
        const data = await res.json();
        setCities(data);
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
        for (let key in formData) {
            form.append(key, formData[key]);
        }
        imageInputs.forEach(img => {
            if (img.file) form.append('images', img.file);
        });

        const res = await fetch('http://localhost:5000/project/create', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: form
        });

        const data = await res.json();
        alert('Project created!');
    };

    return (
        <div className="container py-5">
            <h3>Create RFQ</h3>
            <input type="text" name="title" className="form-control mb-3" placeholder="Project Title" onChange={handleChange} />

            <select name="type" className="form-select mb-3" onChange={handleChange}>
                <option value="">-- Project Type --</option>
                {projectTypes.map((t, i) => (
                    <option key={i} value={t.name}>{t.name}</option>
                ))}
            </select>

            <select name="state" className="form-select mb-3" onChange={handleStateChange}>
                <option value="">-- Select State --</option>
                {stateList.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>

            <select name="city" className="form-select mb-3" onChange={handleChange}>
                <option value="">-- Select City --</option>
                {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>

            <textarea name="description" className="form-control mb-3" placeholder="Description" onChange={handleChange} />

            <input type="date" name="endDate" className="form-control mb-3" onChange={handleChange} />

            <select name="urgency" className="form-select mb-3" onChange={handleChange}>
                <option value="">-- Urgency Level --</option>
                {urgencyOptions.map((u, i) => <option key={i} value={u.value}>{u.label}</option>)}
            </select>

            <label className="form-label">Upload Images (max 6)</label>
            {imageInputs.map((input, idx) => (
                <div key={input.id} className="d-flex align-items-center mb-2 gap-2">
                    <input type="file" accept="image/*" onChange={e => handleImageChange(idx, e.target.files[0])} />
                    {idx === imageInputs.length - 1 && imageInputs.length < 6 && (
                        <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleAddImage}>Add Image</button>
                    )}
                </div>
            ))}
            <div className="d-flex flex-wrap gap-2 mt-2">
                {previewUrls.map((url, i) => (
                    <img key={i} src={url} alt="preview" style={{ width: '100px', height: '80px', objectFit: 'cover' }} />
                ))}
            </div>

            <button className="btn btn-success mt-4" onClick={handleSubmit}>Submit RFQ</button>
        </div>
    );
}

export default CreateRfq;
