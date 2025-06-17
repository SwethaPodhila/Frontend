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
        fetch('http://localhost:5000/category/sub-categories')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Failed with status ${res.status}`);
                }
                return res.json();
            })
            .then(data => setSubCategories(data))
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

    useEffect(() => {
        if (!state) return;
        fetch(`http://localhost:5000/admin/citiesByState?state=${encodeURIComponent(state)}`)
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
        form.append('state', state);
        form.append('city', city);
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
                headers: { Authorization: `Bearer ${token}` },
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
            <div className="container-fluid py-5" style={{
                fontFamily: 'Inter, sans-serif',
                minHeight: '100vh',
                background: 'linear-gradient(135deg,rgb(237, 239, 241),rgb(226, 228, 231))',
                paddingBottom: '50px'
            }}>
                <div className="mx-auto p-5 shadow rounded-4" style={{
                    maxWidth: '700px',
                    backgroundColor: '#fefefe',
                    border: '2px solid #FFB400',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                    <div className="text-center mb-4">
                        <h2 style={{ color: '#FFB400', fontWeight: '700' }}>📄 Create New RFQ</h2>
                        <p className="text-muted" style={{ fontSize: '14px' }}>Enter project details to request quotations</p>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Project Title</label>
                            <input type="text" className="form-control form-control-lg" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Budget Range</label>
                            <select className="form-select form-select-lg" style={{ fontSize: '1.2rem' }} value={budget} onChange={e => setBudget(e.target.value)} required>
                                <option value="">Select Budget</option>
                                {budgetOptions.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label" style={{ fontWeight: 550 }}>State</label>
                                <select className="form-select form-select-lg" style={{ fontSize: '1.2rem' }} value={state} onChange={e => setState(e.target.value)} required>
                                    <option value="">Select State</option>
                                    {stateList.map((st, idx) => <option key={idx} value={st}>{st}</option>)}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label" style={{ fontWeight: 550 }}>City</label>
                                <select className="form-select form-select-lg" style={{ fontSize: '1.2rem' }} value={city} onChange={e => setCity(e.target.value)} required>
                                    <option value="">Select City</option>
                                    {cities.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Project Type</label>
                            <Select
                                isMulti
                                options={subCategories.map(sub => ({ value: sub.name, label: sub.name }))}
                                value={selectedSubCategories}
                                onChange={setSelectedSubCategories}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        padding: '5px',
                                        borderRadius: '10px',
                                        borderColor: '#ced4da',
                                        boxShadow: 'none',
                                        fontSize: '1.2rem'
                                    })
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Description</label>
                            <textarea className="form-control form-control-lg" rows="4" placeholder="Describe your project..." value={description} onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Response Deadline</label>
                            <input type="date" className="form-control form-control-lg" value={deadline} onChange={e => setDeadline(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Upload Images (max 5)</label>
                            {imageInputs.map((file, idx) => (
                                <input key={idx} type="file" className="form-control mb-2" accept="image/*" onChange={e => handleImageInputChange(idx, e.target.files[0])} />
                            ))}
                            {imageInputs.length < 5 && (
                                <button type="button" onClick={handleAddImage} className="btn btn-outline-dark btn-sm">
                                    + Add Image
                                </button>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ fontWeight: 550 }}>Select Provider Companies</label>
                            <div className="row">
                                {companies.map((company, idx) => (
                                    <div className="col-md-4" key={idx}>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" checked={selectedCompanies.includes(company)} onChange={() => handleCompanyCheckbox(company)} id={`provider-${idx}`} />
                                            <label className="form-check-label" htmlFor={`provider-${idx}`}>{company}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-lg w-100 mt-3" style={{ backgroundColor: '#FFB400', color: '#fff', fontWeight: '600', borderRadius: '10px' }}>
                            🚀 Submit RFQ
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Rfq;
