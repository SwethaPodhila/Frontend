import { useEffect, useState } from 'react';
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Rfq() {
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [imageInputs, setImageInputs] = useState([null]);

    const budgetOptions = [
        'Under 1 Lakh', '1–2 Lakhs', '2–5 Lakhs',
        '5–10 Lakhs', '10–25 Lakhs', 'Above 25 Lakhs'
    ];

    useEffect(() => {
        fetch('http://localhost:5000/category/sub-categories')
            .then(res => res.json())
            .then(setSubCategories)
            .catch(err => console.error('Failed to fetch subcategories', err));
    }, []);

    useEffect(() => {
        if (selectedSubCategories.length === 0) {
            setCompanies([]);
            return;
        }

        fetch('http://localhost:5000/user/all/users')
            .then(res => res.json())
            .then(users => {
                const filtered = users.filter(u =>
                    selectedSubCategories.map(s => s.value).includes(u.subCategory)
                );
                const uniqueCompanies = [...new Set(filtered.map(u => u.companyName))];
                setCompanies(uniqueCompanies);
            })
            .catch(err => console.error('Failed to fetch companies', err));
    }, [selectedSubCategories]);

    const handleImageInputChange = (index, file) => {
        const newInputs = [...imageInputs];
        newInputs[index] = file;
        setImageInputs(newInputs);
    };

    const handleAddImage = () => {
        if (imageInputs.length < 5) {
            setImageInputs([...imageInputs, null]);
        }
    };

    const handleCompanyCheckbox = (name) => {
        setSelectedCompanies(prev =>
            prev.includes(name)
                ? prev.filter(c => c !== name)
                : [...prev, name]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', title);
        form.append('budget', budget);
        form.append('location', location);
        form.append('description', description);
        form.append('deadline', deadline);
        selectedSubCategories.forEach(sub => form.append('subCategories', sub.value));
        selectedCompanies.forEach(comp => form.append('providers', comp));
        imageInputs.forEach(file => {
            if (file) form.append('images', file);
        });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/rfq/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: form,
            });
            const data = await res.json();
            alert(data.message || 'RFQ Created!');
        } catch (err) {
            console.error('Submit failed', err);
            alert('Failed to submit RFQ');
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5" style={{ maxWidth: '960px', fontFamily: 'Inter, sans-serif' }}>
                <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
                    <h3 className="mb-4 text-primary fw-bold"><i className="bi bi-file-earmark-plus"></i> Create RFQ</h3>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Title */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-card-text"></i> Project Title</label>
                            <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>

                        {/* Budget */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-cash-coin"></i> Budget Range</label>
                            <select className="form-select" value={budget} onChange={e => setBudget(e.target.value)} required>
                                <option value="">-- Select Budget --</option>
                                {budgetOptions.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-geo-alt-fill"></i> Location</label>
                            <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} required />
                        </div>

                        {/* Sub Categories */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-diagram-3"></i> Project Type</label>
                            <Select
                                isMulti
                                options={subCategories.map(sub => ({ value: sub.name, label: sub.name }))}
                                value={selectedSubCategories}
                                onChange={setSelectedSubCategories}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-info-circle"></i> Description</label>
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Briefly describe your project..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Deadline */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-calendar3"></i> Response Deadline</label>
                            <input type="date" className="form-control" value={deadline} onChange={e => setDeadline(e.target.value)} required />
                        </div>

                        {/* Image Upload */}
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-images"></i> Upload Images (max 5)</label>
                            {imageInputs.map((file, idx) => (
                                <input
                                    key={idx}
                                    type="file"
                                    className="form-control mb-2"
                                    accept="image/*"
                                    onChange={e => handleImageInputChange(idx, e.target.files[0])}
                                />
                            ))}
                            {imageInputs.length < 5 && (
                                <button type="button" onClick={handleAddImage} className="btn btn-outline-secondary btn-sm">
                                    <i className="bi bi-plus-circle"></i> Add Image
                                </button>
                            )}
                        </div>

                        {/* Providers */}
                        <div className="mb-4">
                            <label className="form-label"><i className="bi bi-buildings"></i> Select Provider Companies</label>
                            <div className="row">
                                {companies.map((company, idx) => (
                                    <div className="col-sm-6 col-md-4" key={idx}>
                                        <div className="form-check mb-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedCompanies.includes(company)}
                                                onChange={() => handleCompanyCheckbox(company)}
                                                id={`provider-${idx}`}
                                            />
                                            <label className="form-check-label" htmlFor={`provider-${idx}`}>
                                                {company}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-primary w-100 py-2 fw-bold" type="submit">
                            <i className="bi bi-send-fill"></i> Submit RFQ
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Rfq;
