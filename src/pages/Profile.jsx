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
  const [cities, setCities] = useState([]);

  const hasFetched = useRef(false);

  const stateList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
  ];

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const userRes = await fetch(`https://backend-u1pk.onrender.com/user/${id}`);
        const userData = await userRes.json();

        if (userData.expired) {
          alert("This link has expired or profile is already completed.");
          navigate(`/user-dashboard/${userData._id}`); // Use userData._id instead of data.user.id
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

        const categoryRes = await fetch("https://backend-u1pk.onrender.com/category/main-categories");
        const categoryData = await categoryRes.json();
        setCategories(categoryData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    if (!formData.mainCategory) {
      setSubCategories([]);
      setFormData(prev => ({ ...prev, subCategory: '' }));
      return;
    }

    const selectedMainCat = categories.find(cat => cat.name === formData.mainCategory);
    if (!selectedMainCat) {
      setSubCategories([]);
      return;
    }

    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`https://backend-u1pk.onrender.com/category/sub-categories/${selectedMainCat._id}`);
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      }
    };

    fetchSubCategories();
  }, [formData.mainCategory, categories]);

  // Fetch cities when state changes
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'mainCategory' ? { subCategory: '' } : {}),
      ...(name === 'state' ? { city: '' } : {})
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
    if (res.ok && result.token) {
      localStorage.setItem('token', result.token); // Save JWT like in Login
      localStorage.setItem('userId', result.user._id); // Use _id instead of id
      navigate(`/user-dashboard/${result.user._id}`); // Redirect using user _id from response
    }
  };

 return (
    <div 
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/construction-plans-with-helmet-drawing-tools-blueprints_1232-4300.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
           top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {user ? (
        <div 
          style={{
            width: '95%',
            maxWidth: '450px',
            maxHeight: '90vh',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Fixed Header */}
          <div 
            style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '15px',
              textAlign: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}
          >
            <h5 style={{ margin: 0 }}>Welcome, {user.fullName}</h5>
            <small>Please complete your profile</small>
          </div>

          {/* Scrollable Content */}
          <div 
            style={{
              padding: '20px',
              overflowY: 'auto',
              flex: 1,
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none' // For IE
            }}
          >
            {/* Hide scrollbar for Chrome/Safari */}
            <style dangerouslySetInnerHTML={{ __html: 
              `::-webkit-scrollbar { display: none; }` 
            }} />
            
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Company Name</label>
                <input 
                  type="text" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Main Category</label>
                <select 
                  name="mainCategory" 
                  value={formData.mainCategory} 
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                >
                  <option value="">Select Main Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Sub Category</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!formData.mainCategory || subCategories.length === 0}
                  style={{
                    width: '100%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                >
                  <option value="">Select Sub Category</option>
                  {subCategories.map((sub, i) => (
                    <option key={i} value={sub.name}>{sub.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Upload Logo</label>
                <input 
                  type="file" 
                  name="logo" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

            <div className="mb-3">

              <label className="form-label">State</label>
              <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                <option value="">Select State</option>
                {stateList.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <select className="form-select" name="city" value={formData.city} onChange={handleChange} disabled={!formData.state || cities.length === 0}>
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Pin Code</label>
                <input 
                  type="text" 
                  name="pinCode" 
                  value={formData.pinCode} 
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '5px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Project Images (up to 5):</label>
                {imageInputs.map((_, index) => (
                  <input
                    key={index}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageInputChange(e, index)}
                    style={{
                      width: '100%',
                      padding: '5px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      marginBottom: '10px'
                    }}
                  />
                ))}
                {imageInputs.length < 5 && (
                  <button 
                    type="button"
                    onClick={addImageInput}
                    style={{
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    + Add Another Image
                  </button>
                )}
                {imageInputs.length >= 5 && (
                  <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>Maximum 5 images allowed</div>
                )}
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#FFD700',
                  color: '#000000',
                  padding: '12px',
                  borderRadius: '4px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ 
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: '#fff',
          padding: '20px',
          borderRadius: '8px'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}

export default Profile;