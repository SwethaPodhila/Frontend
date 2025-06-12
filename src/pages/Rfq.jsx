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
        fetch('https://backend-u1pk.onrender.com/category/sub-categories')
            .then(res => res.json())
            .then(setSubCategories)
            .catch(err => console.error('Failed to fetch subcategories', err));
    }, []);

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
                maxWidth: '600px', 
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
                        Create RFQ
                    </h3>

                     <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Title - icon now black */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                <i className="bi bi-card-text me-2"></i> 
                                Project Title
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                style={{ borderColor: '#ddd' }}
                                value={title} 
                                onChange={e => setTitle(e.target.value)} 
                                required 
                            />
                        </div>

                        {/* Budget - icon now black */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                <i className="bi bi-cash-coin me-2"></i> 
                                Budget Range
                            </label>
                            <select 
                                className="form-select" 
                                style={{ borderColor: '#ddd' }}
                                value={budget} 
                                onChange={e => setBudget(e.target.value)} 
                                required
                            >
                                <option value="">-- Select Budget --</option>
                                {budgetOptions.map((opt, idx) => (
                                    <option key={idx} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        

                        {/* State & City */}
            
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-geo-fill"></i> State</label>
                            <select className="form-select" value={state} onChange={e => setState(e.target.value)} required>
                                <option value="">-- Select State --</option>
                                {stateList.map((st, idx) => (
                                    <option key={idx} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><i className="bi bi-geo-alt-fill"></i> City</label>
                            <select className="form-select" value={city} onChange={e => setCity(e.target.value)} required>
                                <option value="">-- Select City --</option>
                                {cities.map((c, idx) => (
                                    <option key={idx} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sub Categories - icon now black */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                <i className="bi bi-diagram-3 me-2"></i> 
                                Project Type
                            </label>
                            <Select
                                isMulti
                                options={subCategories.map(sub => ({ value: sub.name, label: sub.name }))}
                                value={selectedSubCategories}
                                onChange={setSelectedSubCategories}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: '#ddd',
                                        minHeight: '42px'
                                    })
                                }}
                            />
                        </div>

                         {/* Description - icon now black */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                <i className="bi bi-info-circle me-2"></i> 
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                style={{ borderColor: '#ddd' }}
                                rows="4"
                                placeholder="Briefly describe your project..."
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                                               {/* Deadline - icon now black */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                <i className="bi bi-calendar3 me-2"></i> 
                                Response Deadline
                            </label>
                            <input 
                                type="date" 
                                className="form-control" 
                                style={{ borderColor: '#ddd' }}
                                value={deadline} 
                                onChange={e => setDeadline(e.target.value)} 
                                required 
                            />
                        </div>

       {/* Image Upload - icon now black */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">
                                <i className="bi bi-images me-2"></i> 
                                Upload Images (max 5)
                            </label>
                            {imageInputs.map((file, idx) => (
                                <input
                                    key={idx}
                                    type="file"
                                    className="form-control mb-2"
                                    style={{ borderColor: '#ddd' }}
                                    accept="image/*"
                                    onChange={e => handleImageInputChange(idx, e.target.files[0])}
                                />
                            ))}
                            {imageInputs.length < 5 && (
                                <button 
                                    type="button" 
                                    onClick={handleAddImage} 
                                    className="btn btn-sm mt-2"
                                    style={{ 
                                        backgroundColor: '#f8f9fa',
                                        color: '#000',
                                        fontWeight: '500',
                                        border: '1px solid #ddd'
                                    }}
                                >
                                    <i className="bi bi-plus-circle me-1"></i> Add Image
                                </button>
                            )}
                        </div>
                         
  {/* Providers - icon now black */}
                        <div className="mb-4">
                            <label className="form-label fw-medium">
                                <i className="bi bi-buildings me-2"></i> 
                                Select Provider Companies
                            </label>
                            <div className="row">
                                {companies.map((company, idx) => (
                                    <div className="col-sm-6 col-md-4" key={idx}>
                                        <div className="form-check mb-2">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                style={{ accentColor: '#000' }}
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

                        <button 
                            className="btn w-100 py-2 fw-bold" 
                            type="submit"
                            style={{ 
                                backgroundColor: '#FFD700',
                                color: '#000',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        >
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