import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [imageInputs, setImageInputs] = useState([null]);
  const [formData, setFormData] = useState({
    companyName: '',
    pinCode: '',
    mainCategory: '',
    subCategory: '',
    city: '',
    state: '',
    logo: null,
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const hasFetched = useRef(false);

  // Fetch user profile and categories on mount
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        // Fetch user
        const userRes = await fetch(`http://localhost:5000/user/${id}`);
        const userData = await userRes.json();

        if (userData.expired) {
          alert("This link has expired or profile is already completed.");
          navigate("/login");
          return;
        }

        setUser(userData);
        setFormData(prev => ({
          ...prev,
          companyName: userData.companyName || '',
          pinCode: userData.pinCode || '',
          mainCategory: userData.mainCategory || '',
          subCategory: userData.subCategory || '',
          city: userData.city || '',
          state: userData.state || '',
          logo: null,
          images: []
        }));

        // Fetch main categories
        const categoryRes = await fetch("http://localhost:5000/category/main-categories");
        const categoryData = await categoryRes.json();
        setCategories(categoryData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, navigate]);

  // Fetch subcategories when mainCategory changes
  useEffect(() => {
    if (!formData.mainCategory) {
      setSubCategories([]);
      setFormData(prev => ({ ...prev, subCategory: '' }));
      return;
    }

    // Find selected main category to get its _id
    const selectedMainCat = categories.find(cat => cat.name === formData.mainCategory);
    if (!selectedMainCat) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`http://localhost:5000/category/sub-categories/${selectedMainCat._id}`);
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      }
    };

    fetchSubCategories();
  }, [formData.mainCategory, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'mainCategory' ? { subCategory: '' } : {})
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.name === 'logo') {
      setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
    }
  };

  const handleImageInputChange = (e, index) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const updatedInputs = [...imageInputs];
    updatedInputs[index] = files[0];
    setImageInputs(updatedInputs);

    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = files[0];
      return { ...prev, images: updatedImages };
    });
  };

  const addImageInput = () => {
    if (imageInputs.length < 5) {
      setImageInputs([...imageInputs, null]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) {
      if (key === 'images') {
        formData.images.forEach(img => form.append('images', img));
      } else {
        form.append(key, formData[key]);
      }
    }

    const res = await fetch(`http://localhost:5000/user/profile/${id}`, {
      method: 'PUT',
      body: form
    });

    const result = await res.json();
    alert(result.message);
    if (res.ok) {
       navigate(`/user-dashboard/${id}`);
      //navigate(`/user-dashboard/${data.user.id}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      {user ? (
        <div className="card p-4 shadow">
          <h2 className="mb-4 text-center">Welcome, {user.fullName}. Please complete your profile.</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Main Category</label>
              <select className="form-select" name="mainCategory" value={formData.mainCategory} onChange={handleChange}>
                <option value="">Select Main Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Sub Category</label>
              <select
                className="form-select"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                disabled={!formData.mainCategory || subCategories.length === 0}
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((sub, i) => (
                  <option key={i} value={sub.name}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Logo</label>
              <input type="file" className="form-control" name="logo" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="form-label">Pin Code</label>
              <input type="text" className="form-control" name="pinCode" value={formData.pinCode} onChange={handleChange} />
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
                <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={addImageInput}>
                  + Add Another Image
                </button>
              )}
              {imageInputs.length >= 5 && (
                <div className="text-danger mt-1">Maximum 5 images allowed</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
