import { useEffect, useState } from 'react';
import Select from 'react-select';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Rfq() {
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [imageInputs, setImageInputs] = useState([null]);
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientAddress, setClientAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [stage, setStage] = useState('');
    const [categories, setCategories] = useState([]); // fetched from backend
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [endDate, setEndDate] = useState('');

    console.log("Selected Categories:", selectedCategories);
    console.log("SubCategories State:", subCategories);

    const budgetOptions = [
        'Under 1 Lakh', '1–2 Lakhs', '2–5 Lakhs',
        '5–10 Lakhs', '10–25 Lakhs', 'Above 25 Lakhs'
    ];

    const stateList = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
    ];

    useEffect(() => {
        fetch('https://backend-u1pk.onrender.com/category/main-categories')
            .then(res => res.json())
            .then(setCategories)
            .catch(err => console.error('Failed to fetch main categories', err));
    }, []);

    useEffect(() => {
        const mainCategoryIds = selectedCategories.map(cat => cat.value);
        if (mainCategoryIds.length === 0) {
            setSubCategories([]);
            return;
        }

        fetch('https://backend-u1pk.onrender.com/category/sub-categories/:mainCategoryId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mainCategoryIds }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Fetched subcategories:', data);
                // Handle case where response is not an array
                if (Array.isArray(data)) {
                    setSubCategories(data);
                } else if (Array.isArray(data.subCategories)) {
                    setSubCategories(data.subCategories);
                } else {
                    setSubCategories([]);
                }
            })
            .catch(err => {
                console.error('Failed to fetch subcategories', err);
                setSubCategories([]);
            });
    }, [selectedCategories]);

    useEffect(() => {
        if (selectedSubCategories.length === 0) {
            setCompanies([]);
            return;
        }

        fetch('https://backend-u1pk.onrender.com/user/all/users')
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

    useEffect(() => {
        if (!state) return;
        fetch(`https://backend-u1pk.onrender.com/admin/citiesByState?state=${encodeURIComponent(state)}`)
            .then(res => res.json())
            .then(data => setCities(data))
            .catch(err => {
                console.error('Failed to fetch cities', err);
                setCities([]);
            });
    }, [state]);

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
        form.append('state', state);         // Send state to backend
        form.append('city', city);       // Send city as 'location' for backend
        form.append('description', description);
        form.append('deadline', deadline);
        form.append('startDate', startDate);
        form.append('endDate', endDate);
        form.append('stage', stage);
        form.append('clientName', clientName);
        form.append('clientEmail', clientEmail);
        form.append('clientPhone', clientPhone);
        form.append('clientAddress', clientAddress);
        selectedCategories.forEach(cat => form.append('categories', cat.value));

        selectedSubCategories.forEach(sub => form.append('subCategories', sub.value));
        selectedCompanies.forEach(comp => form.append('providers', comp));
        imageInputs.forEach(file => {
            if (file) form.append('images', file);
        });

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('https://backend-u1pk.onrender.com/rfq/create', {
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
            <div className="container py-5" style={{
                maxWidth: '900px',
                fontFamily: 'Inter, sans-serif'
            }}>
                <div className="p-4 rounded" style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    {/* Only this heading has yellow color */}
                    <h3 className="mb-4 fw-bold" style={{
                        color: '#ffc107', // Only yellow element
                        borderBottom: '2px solid #e0e0e0',
                        paddingBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <i className="bi bi-file-earmark-plus"></i>
                        Create Project
                    </h3>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">

                        {/* === PROJECT SECTION === */}
                        <h5 className="fw-bold mb-3">Project</h5>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Project Title</label>
                                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Budget Range</label>
                                <input type="text" className="form-control" value={budget} onChange={e => setBudget(e.target.value)} required />
                            </div>
                        </div>

                        <div className="mb-3 col-md-12">
                            <label className="form-label">Categories</label>
                            <Select
                                isMulti
                                options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
                                value={selectedCategories}
                                onChange={setSelectedCategories}
                            />
                        </div>

                        {/* Subcategories */}
                        <div className="mb-3 col-md-12">
                            <label className="form-label">Sub Categories</label>
                            <Select
                                isMulti
                                options={
                                    Array.isArray(subCategories)
                                        ? subCategories.map(sub => ({
                                            value: sub.name,
                                            label: sub.name
                                        }))
                                        : []
                                }
                                value={selectedSubCategories}
                                onChange={setSelectedSubCategories}
                            />
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Start Date</label>
                                <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">End Date</label>
                                <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Project Stage</label>
                                <select className="form-select" value={stage} onChange={e => setStage(e.target.value)} required>
                                    <option value="">-- Select Stage --</option>
                                    <option value="planning">Planning</option>
                                    <option value="execution">Execution</option>
                                    <option value="testing">Testing</option>
                                    <option value="completed">Completed</option>
                                    <option value="on hold">On Hold</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" rows="2" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                        </div>

                        {/* === COMPANY INFO === */}
                        <h5 className="fw-bold mt-4 mb-3">Company Info</h5>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">State</label>
                                <select className="form-select" value={state} onChange={e => setState(e.target.value)} required>
                                    <option value="">-- Select State --</option>
                                    {stateList.map((st, idx) => <option key={idx} value={st}>{st}</option>)}
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label">City</label>
                                <select className="form-select" value={city} onChange={e => setCity(e.target.value)} required>
                                    <option value="">-- Select City --</option>
                                    {cities.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Upload Images (Max 5)</label>
                            {imageInputs.map((file, idx) => (
                                <input key={idx} type="file" className="form-control mb-2" accept="image/*" onChange={e => handleImageInputChange(idx, e.target.files[0])} />
                            ))}
                            {imageInputs.length < 5 && (
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleAddImage}>
                                    <i className="bi bi-plus-circle me-1"></i> Add Image
                                </button>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Select Provider Companies</label>
                            <div className="row">
                                {companies.map((company, idx) => (
                                    <div className="col-md-4" key={idx}>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedCompanies.includes(company)}
                                                onChange={() => handleCompanyCheckbox(company)}
                                                id={`provider-${idx}`}
                                            />
                                            <label className="form-check-label" htmlFor={`provider-${idx}`}>{company}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* === CLIENT INFO === */}
                        <h5 className="fw-bold mt-4 mb-3">Client Info</h5>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Client Name</label>
                                <input type="text" className="form-control" value={clientName} onChange={e => setClientName(e.target.value)} required />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Client Email</label>
                                <input type="email" className="form-control" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Client Phone</label>
                                <input type="tel" className="form-control" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label">Client Address</label>
                                <textarea className="form-control" rows="2" value={clientAddress} onChange={e => setClientAddress(e.target.value)} />
                            </div>

                        </div>

                        {/* === SUBMIT BUTTON === */}
                        <button type="submit" className="btn btn-warning w-100 fw-bold">
                            <i className="bi bi-send-fill me-2"></i> Submit RFQ
                        </button>

                    </form>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Rfq;