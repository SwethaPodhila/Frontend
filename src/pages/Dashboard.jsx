import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Dashboard() {
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
    });
    const [logoFile, setLogoFile] = useState(null);
    const modalRef = useRef(null);

    // Fetch user details + main categories on mount
    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                // Fetch user details
                const userRes = await fetch(`http://localhost:5000/user/dashboard/${id}`, {
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
                    });
                }

                // Fetch main categories
                const catRes = await fetch("http://localhost:5000/category/main-categories");
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
                const res = await fetch(`http://localhost:5000/category/sub-categories/${selectedMain._id}`);
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
            const res = await fetch(`http://localhost:5000/user/profile/${id}`, {
                method: 'PUT',
                body: payload,
            });
            const result = await res.json();
            if (res.ok) {
                alert(result.message || 'Profile updated successfully');
                setShowModal(false);
                const updatedUser = await fetch(`http://localhost:5000/user/dashboard/${id}`).then(r => r.json());
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
        <div className="container mt-5">
            <div className="card shadow p-4 mb-4">
                <h2 className="mb-3 text-center">Welcome {user.fullName}</h2>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                        <p><strong>Mobile:</strong> {user.mobile}</p>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Update Profile
                    </button>
                </div>
            </div>

            {user.isProfileComplete ? (
                <>
                    <div className="card shadow p-4 mb-4">
                        <h4 className="mb-3">Company Details</h4>
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <p><strong>Company:</strong> {user.companyName}</p>
                                <p><strong>City:</strong> {user.city}</p>
                                <p><strong>Pin Code:</strong> {user.pinCode}</p>
                            </div>
                            <div className="col-md-6 mb-2">
                                <p><strong>State:</strong> {user.state}</p>
                                <p><strong>Main Category:</strong> {user.mainCategory}</p>
                                <p><strong>Sub Category:</strong> {user.subCategory}</p>
                            </div>
                        </div>
                        {user.logo && (
                            <div className="text-center mt-4">
                                <h5>Company Logo</h5>
                                <img src={user.logo} alt="Company Logo" className="img-thumbnail" width={120} />
                            </div>
                        )}
                    </div>
                    {user.images && user.images.length > 0 && (
                        <div className="card shadow p-4">
                            <h4 className="mb-3">Project Images</h4>
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
                <div className="alert alert-warning text-center">
                    Please complete your profile first!
                </div>
            )}

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" aria-modal="true"
                     style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} ref={modalRef}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="modal-header">
                                    <h5 className="modal-title">Update Profile</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="companyName" className="form-label">Company Name</label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            className="form-control"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="form-control"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="form-control"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pinCode" className="form-label">Pin Code</label>
                                        <input
                                            type="text"
                                            id="pinCode"
                                            name="pinCode"
                                            className="form-control"
                                            value={formData.pinCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mainCategory" className="form-label">Main Category</label>
                                        <select
                                            id="mainCategory"
                                            name="mainCategory"
                                            className="form-select"
                                            value={formData.mainCategory}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">-- Select Main Category --</option>
                                            {categories.map(cat => (
                                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="subCategory" className="form-label">Sub Category</label>
                                        <select
                                            id="subCategory"
                                            name="subCategory"
                                            className="form-select"
                                            value={formData.subCategory}
                                            onChange={handleChange}
                                            required
                                            disabled={!formData.mainCategory}
                                        >
                                            <option value="">-- Select Sub Category --</option>
                                            {subCategories.map(sub => (
                                                <option key={sub._id} value={sub.name}>{sub.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="logo" className="form-label">Company Logo (upload new to replace)</label>
                                        <input
                                            type="file"
                                            id="logo"
                                            name="logo"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Project Images (you can add up to 5):</label>
                                        {imageInputs.map((_, index) => (
                                            <input
                                                key={index}
                                                type="file"
                                                className="form-control mb-2"
                                                accept="image/*"
                                                onChange={(e) => handleImageInputChange(e, index)}
                                            />
                                        ))}
                                        {imageInputs.length < 5 && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-primary mt-2"
                                                onClick={addImageInput}
                                            >
                                                + Add Another Image
                                            </button>
                                        )}
                                        {imageInputs.length >= 5 && (
                                            <div className="text-danger mt-1">Maximum 5 images allowed</div>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
