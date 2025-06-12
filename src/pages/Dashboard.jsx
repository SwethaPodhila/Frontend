import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Dashboard() {
    <Header />
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // New state for categories & subcategories
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);


    const [showModal, setShowModal] = useState(false);
    const [imageInputs, setImageInputs] = useState([null]);
    const [formData, setFormData] = useState({
        companyName: '',
        city: '',
        pinCode: '',
        state: '',
        mainCategory: '',
        subCategory: '',
        productDetails: '',
    });
    const [logoFile, setLogoFile] = useState(null);
    const modalRef = useRef(null);
    // Add this line below:
    const [cities, setCities] = useState([]);

    const stateList = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
    ];
    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.state) {
                setCities([]);
                setFormData(prev => ({ ...prev, city: '' }));
                return;
            }

            try {
                const res = await fetch(`https://backend-u1pk.onrender.com/admin/citiesByState?state=${formData.state}`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.error("Error fetching cities:", err);
            }
        };

        fetchCities();
    }, [formData.state]);


    // Fetch user details + main categories on mount
    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                // Fetch user details
                const userRes = await fetch(`https://backend-u1pk.onrender.com/user/dashboard/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!userRes.ok) throw new Error(`HTTP error! status: ${userRes.status}`);
                const userData = await userRes.json();
                setUser(userData);

                if (userData) {
                    setFormData({
                        companyName: userData.companyName || '',
                        city: userData.city || '',
                        pinCode: userData.pinCode || '',
                        state: userData.state || '',
                        mainCategory: userData.mainCategory || '',
                        subCategory: userData.subCategory || '',
                        productDetails: userData.productDetails || '',
                    });
                }

                // Fetch main categories
                const catRes = await fetch("https://backend-u1pk.onrender.com/category/main-categories");
                const catData = await catRes.json();
                setCategories(catData);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchData();
    }, [id, navigate]);

    // Fetch subcategories whenever mainCategory changes
    useEffect(() => {
        if (!formData.mainCategory) {
            setSubCategories([]);
            setFormData(prev => ({ ...prev, subCategory: '' }));
            return;
        }

        const selectedMain = categories.find(cat => cat.name === formData.mainCategory);
        if (!selectedMain) {
            setSubCategories([]);
            return;
        }

        const fetchSubCategories = async () => {
            try {
                const res = await fetch(`https://backend-u1pk.onrender.com/category/sub-categories/${selectedMain._id}`);
                const data = await res.json();
                setSubCategories(data);
            } catch (err) {
                console.error("Failed to fetch subcategories", err);
                setSubCategories([]);
            }
        };
        fetchSubCategories();
    }, [formData.mainCategory, categories]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'mainCategory' ? { subCategory: '' } : {})
        }));
    };

    const handleLogoChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    const handleImageInputChange = (e, index) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const updated = [...imageInputs];
        updated[index] = files[0];
        setImageInputs(updated);
    };

    const addImageInput = () => {
        if (imageInputs.length < 5) {
            setImageInputs([...imageInputs, null]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        for (const key in formData) {
            payload.append(key, formData[key]);
        }
        if (logoFile) payload.append('logo', logoFile);
        imageInputs.forEach(file => file && payload.append('images', file));

        try {
            const res = await fetch(`https://backend-u1pk.onrender.com/user/profile/${id}`, {
                method: 'PUT',
                body: payload,
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message || 'Profile updated successfully');
                setShowModal(false);
                const updatedUser = await fetch(`https://backend-u1pk.onrender.com/user/dashboard/${id}`).then(r => r.json());
                setUser(updatedUser);
            } else {
                alert(result.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('Server error while updating profile');
        }
    };

    if (!user) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="min-vh-100 vw-100 d-flex flex-column" style={{
                backgroundColor: '#f5f5f5',
                padding: '10px',
            }}>

                <div className="container flex-grow-1">
                    <div className="p-4 mb-5 rounded-4" style={{
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        backgroundImage: 'linear-gradient(to right, #ffffff),',
                        borderBottom: '2px solid #FFD700',
                    }}>
                        <div className="w-100 py-3 text-center" style={{
                            backgroundColor: '#000000',
                            color: '#fff',
                            padding: '16px',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            margin: '-1.5rem -1.5rem 1.5rem -0.1rem',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                        }}>
                            <h2 className="m-0" style={{ fontSize: '24px' }}>Welcome {user.fullName}</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <p style={{ color: '#333333' }}><strong>Email:</strong> {user.email}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <p style={{ color: '#333333' }}><strong>Mobile:</strong> {user.mobile}</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn" onClick={() => setShowModal(true)} style={{
                                backgroundColor: '#FFD700',
                                color: '#000000',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                fontWeight: '600',
                            }}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                    {user.isProfileComplete ? (
                        <>
                            <div className="p-4 mb-4 rounded-4" style={{
                                backgroundColor: '#ffffff',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                borderBottom: '3px solid #FFD700'
                            }}>
                                <h4 className="mb-3" style={{
                                    color: 'black',
                                    display: 'inline-block',
                                    borderBottom: '2px solid #FFD700',
                                    paddingBottom: '5px'
                                }}>
                                    Company Details
                                </h4>
                                <div className="row">
                                    <div className="col-md-6 mb-2">
                                        <p style={{ color: '#333333' }}><strong>Company:</strong> {user.companyName}</p>
                                        <p style={{ color: '#333333' }}><strong>City:</strong> {user.city}</p>
                                        <p style={{ color: '#333333' }}><strong>Pin Code:</strong> {user.pinCode}</p>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <p style={{ color: '#333333' }}><strong>State:</strong> {user.state}</p>
                                        <p style={{ color: '#333333' }}><strong>Main Category:</strong> {user.mainCategory}</p>
                                        <p style={{ color: '#333333' }}><strong>Sub Category:</strong> {user.subCategory}</p>
                                    </div>
                                </div>
                                {user.logo && (
                                    <div className="text-center mt-4">
                                        <h5 style={{ color: 'black' }}>Company Logo</h5>
                                        <img src={user.logo} alt="Company Logo" className="img-thumbnail" width={120} />
                                    </div>
                                )}
                            </div>
                            {user.images && user.images.length > 0 && (
                                <div className="p-4 rounded-4" style={{
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                                    borderBottom: '3px solid #FFD700'
                                }}>
                                    <h4 className="mb-3" style={{
                                        color: 'black',
                                        display: 'inline-block',
                                        borderBottom: '2px solid #FFD700',
                                        paddingBottom: '6px'
                                    }}>
                                        product Images
                                    </h4>
                                    <div className="row">
                                        {user.images.map((img, idx) => (
                                            <div key={idx} className="col-6 col-md-3 mb-3">
                                                <img src={img} alt={`img-${idx}`} className="img-fluid rounded shadow-sm" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="alert alert-warning text-center" style={{
                            backgroundColor: '#fff8e1',
                            color: '#333333',
                            borderLeft: '4px solid #FFD700'
                        }}>
                            Please complete your profile first!
                        </div>
                    )}

                    {showModal && (
                        <div className="modal fade show d-block" tabIndex="-1" aria-modal="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} ref={modalRef}>
                            <div className="modal-dialog" style={{ maxWidth: '500px' }}>
                                <div className="modal-content rounded-4" style={{ backgroundColor: '#ffffff' }}>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="modal-header" style={{
                                            backgroundColor: '#000000',
                                            color: '#ffffff',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '4px',
                                            padding: '8px 10px',
                                        }}>
                                            <h5 className="modal-title" style={{ fontSize: '16px' }}>Update Profile</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                        </div>
                                        <div className="modal-body" style={{ color: '#333333', padding: '15px' }}>
                                            <div className="mb-2">
                                                <label htmlFor="companyName" className="form-label" style={{ fontSize: '14px' }}>Company Name</label>
                                                <input type="text" id="companyName" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} required style={{
                                                    borderRadius: '2px',
                                                    padding: '4px',
                                                    backgroundColor: '#f5f5f5',
                                                    fontSize: '14px',
                                                }} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="state" className="form-label" style={{ fontSize: '14px' }}>State</label>
                                                <select id="state" name="state" className="form-select" value={formData.state} onChange={handleChange} required>
                                                    <option value="">-- Select State --</option>
                                                    {stateList.map((state, idx) => (
                                                        <option key={idx} value={state}>{state}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="city" className="form-label" style={{ fontSize: '14px' }}>City</label>
                                                <select id="city" name="city" className="form-select" value={formData.city} onChange={handleChange} required>
                                                    <option value="">-- Select City --</option>
                                                    {cities.map((c, idx) => (
                                                        <option key={idx} value={c}>{c}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-2">
                                                <label htmlFor="pinCode" className="form-label" style={{ fontSize: '14px' }}>Pin Code</label>
                                                <input type="text" id="pinCode" name="pinCode" className="form-control" value={formData.pinCode} onChange={handleChange} required style={{
                                                    borderRadius: '2px',
                                                    padding: '4px',
                                                    backgroundColor: '#f5f5f5',
                                                    fontSize: '14px',
                                                }} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="mainCategory" className="form-label" style={{ fontSize: '14px' }}>Main Category</label>
                                                <select id="mainCategory" name="mainCategory" className="form-select" value={formData.mainCategory} onChange={handleChange} required style={{
                                                    borderRadius: '2px',
                                                    padding: '4px',
                                                    backgroundColor: '#f5f5f5',
                                                    fontSize: '14px',
                                                }}>
                                                    <option value="">-- Select Main Category --</option>
                                                    {categories.map(cat => (
                                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="subCategory" className="form-label" style={{ fontSize: '14px' }}>Sub Category</label>
                                                <select id="subCategory" name="subCategory" className="form-select" value={formData.subCategory} onChange={handleChange} required disabled={!formData.mainCategory} style={{
                                                    borderRadius: '2px',
                                                    padding: '4px',
                                                    backgroundColor: '#f5f5f5',
                                                    fontSize: '14px',
                                                }}>
                                                    <option value="">-- Select Sub Category --</option>
                                                    {subCategories.map(sub => (
                                                        <option key={sub._id} value={sub.name}>{sub.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="productDetails" className="form-label">Product Details</label>
                                                <textarea
                                                    id="productDetails"
                                                    name="productDetails"
                                                    className="form-control"
                                                    rows="4"
                                                    value={formData.productDetails}
                                                    onChange={handleChange}
                                                    placeholder="Describe your products or services..."
                                                    style={{
                                                        borderRadius: '2px',
                                                        padding: '4px',
                                                        backgroundColor: '#f5f5f5',
                                                        fontSize: '14px',
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="logo" className="form-label" style={{ fontSize: '14px' }}>Company Logo</label>
                                                <input type="file" id="logo" name="logo" className="form-control" accept="image/*" onChange={handleLogoChange} style={{
                                                    borderRadius: '2px',
                                                    padding: '4px',
                                                    backgroundColor: '#f5f5f5',
                                                    fontSize: '14px',
                                                }} />
                                            </div>
                                            <div className="mb-2">
                                                <label className="form-label" style={{ fontSize: '14px' }}>Project Images (up to 5):</label>
                                                {imageInputs.map((_, index) => (
                                                    <input key={index} type="file" className="form-control mb-1" accept="image/*" onChange={(e) => handleImageInputChange(e, index)} style={{
                                                        borderRadius: '2px',
                                                        padding: '4px',
                                                        backgroundColor: '#f5f5f5',
                                                        fontSize: '14px',
                                                    }} />
                                                ))}
                                                {imageInputs.length < 5 && (
                                                    <button type="button" className="btn btn-sm mt-1" onClick={addImageInput} style={{
                                                        backgroundColor: '#FFD700',
                                                        color: '#000000',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '12px',
                                                    }}>
                                                        + Image
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="modal-footer" style={{ padding: '10px 15px' }}>
                                            <button type="button" className="btn btn-sm" onClick={() => setShowModal(false)} style={{
                                                backgroundColor: '#f5f5f5',
                                                color: '#333333',
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                padding: '4px 8px',
                                            }}>
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-sm" style={{
                                                backgroundColor: '#FFD700',
                                                color: '#000000',
                                                border: 'none',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                padding: '4px 8px',
                                            }}>
                                                Update Profile
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>);
}

export default Dashboard;