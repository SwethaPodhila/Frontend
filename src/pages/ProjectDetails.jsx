import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';
import Select from 'react-select';
import axios from 'axios';

const stateList = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const stageOptions = [
  "planning", "execution", "testing", "completed", "on hold", "cancelled"
];

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [previewUrls, setPreviewUrls] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [imageInputs, setImageInputs] = useState([{ id: Date.now(), file: null }]);


  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fixedMainCategoryIds = [
      "683f33a2f2c5ff5195d26d81", // 🛠 Replace these with real main category IDs
      "683f33aff2c5ff5195d26d84",
      "683f33bbf2c5ff5195d26d87"
    ];

    const fetchSubCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/category/subCategories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mainCategoryIds: fixedMainCategoryIds })
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setSubCategories(data);
        } else if (Array.isArray(data.subCategories)) {
          setSubCategories(data.subCategories);
        } else {
          setSubCategories([]);
        }
      } catch (err) {
        console.error('Failed to fetch subcategories', err);
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSingleFileChange = (index, file) => {
    const updatedInputs = [...imageInputs];
    updatedInputs[index].file = file;

    setImageInputs(updatedInputs);

    // Update previews
    const previews = updatedInputs
      .filter(inp => inp.file)
      .map(inp => URL.createObjectURL(inp.file));

    setPreviewUrls(previews);
  };

  const handleAddImageInput = () => {
    if (imageInputs.length >= 5) return;
    setImageInputs(prev => [...prev, { id: Date.now(), file: null }]);
  };

  // You can pass projectId if needed
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get('https://your-api-url.com/api/responses'); // 🔁 Replace with your actual API
        setResponses(res.data); // 🧠 Adjust if your API structure is different
        setLoading(false);
      } catch (err) {
        setError('Failed to load responses');
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`https://backend-u1pk.onrender.com/project/projectDetails/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProject(data);
      setFormData(data);

      if (data.state) {
        const cityRes = await fetch(`https://backend-u1pk.onrender.com/admin/citiesByState?state=${encodeURIComponent(data.state)}`);
        const cityData = await cityRes.json();
        setCities(cityData);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setFormData(prev => ({ ...prev, state: selectedState, city: '' }));

    try {
      const res = await fetch(`https://backend-u1pk.onrender.com/admin/citiesByState?state=${encodeURIComponent(selectedState)}`);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
      setCities([]);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleUpdate = async () => {
    const form = new FormData();

    for (let key in formData) {
      if (key !== 'images') {
        if (Array.isArray(formData[key])) {
          form.append(key, JSON.stringify(formData[key])); // convert array to string
        } else {
          form.append(key, formData[key]);
        }
      }
    }

    // Add existing images if needed
    form.append('existingImages', JSON.stringify(project.images || []));

    // Add new images
    imageInputs.forEach(input => {
      if (input.file) form.append('images', input.file);
    });

    const res = await fetch(`http://localhost:5000/project/updateProject/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: form
    });

    const data = await res.json();
    setProject(data);
    setShowModal(false);
  };

  if (!project) return <p className="text-center mt-5">Loading...</p>;

  const getVal = (val) => val || 'N/A';

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>← Back</Button>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="row">
            {/* Left Column: Project Details (65%) */}
            <div className="col-md-8">
              <div className="card shadow p-4 border-0">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0 fw-bold">Project Details</h3>
                  <Button variant="dark" onClick={() => setShowModal(true)}>✏️ Edit Project</Button>
                </div>

                <div className="row g-4">
                  <Detail label="Title" value={getVal(project.title)} />
                  <Detail label="Budget" value={getVal(project.budget)} />
                  <Detail
                    label="Project Type"
                    value={Array.isArray(project.subCategories) ? project.subCategories.join(', ') : 'N/A'}
                  />

                  <Detail label="Stage" value={getVal(project.stage)} />
                  <Detail label="City" value={getVal(project.city)} />
                  <Detail label="State" value={getVal(project.state)} />
                  <Detail label="Description" value={getVal(project.description)} />
                  <Detail label="Start Date" value={project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'} />
                  <Detail label="End Date" value={project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'} />
                  <Detail label="Client Name" value={getVal(project.clientName)} />
                  <Detail label="Client Email" value={getVal(project.clientEmail)} />
                  <Detail label="Client Phone" value={getVal(project.clientPhone)} />
                  <Detail label="Client Address" value={getVal(project.clientAddress)} />
                </div>

                {project.images?.length > 0 && (
                  <div className="mt-5">
                    <h5 className="fw-semibold">Project Images</h5>
                    <div className="d-flex flex-wrap gap-3">
                      {project.images.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt={`img-${idx}`}
                          style={{
                            width: '150px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card shadow p-4 border-0"
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                <h5 className="fw-bold mb-3">Responses from Users</h5>

                {loading ? (
                  <p className="text-muted">Loading responses...</p>
                ) : error ? (
                  <p className="text-danger">{error}</p>
                ) : responses.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {responses.map((res, idx) => (
                      <li key={idx} className="list-group-item">{res.message}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No responses yet.</p>
                )}
              </div>
            </div>

          </div>
        </div>


        {/* Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row g-3">
              <InputField name="title" label="Title" value={formData.title} onChange={handleChange} />
              <InputField name="budget" label="Budget" value={formData.budget} onChange={handleChange} />

              <div className="mb-3 col-md-6">
                <label className="form-label">Project Type</label>
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
                  onChange={(selectedOptions) => {
                    setSelectedSubCategories(selectedOptions);
                    setFormData(prev => ({
                      ...prev,
                      subCategories: selectedOptions.map(opt => opt.value) // IMPORTANT ✅
                    }));
                  }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Project Stage</label>
                <select className="form-select" name="stage" value={formData.stage || ''} onChange={handleChange}>
                  <option value="">-- Select Stage --</option>
                  {stageOptions.map((stage, idx) => (
                    <option key={idx} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">State</label>
                <select className="form-select" name="state" value={formData.state || ''} onChange={handleStateChange}>
                  <option value="">-- Select State --</option>
                  {stateList.map((state, idx) => (
                    <option key={idx} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">City</label>
                <select className="form-select" name="city" value={formData.city || ''} onChange={handleChange}>
                  <option value="">-- Select City --</option>
                  {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <InputField name="clientName" label="Client Name" value={formData.clientName} onChange={handleChange} />
              <InputField name="clientEmail" label="Client Email" value={formData.clientEmail} onChange={handleChange} />
              <InputField name="clientPhone" label="Client Phone" value={formData.clientPhone} onChange={handleChange} />
              <InputField name="clientAddress" label="Client Address" value={formData.clientAddress} onChange={handleChange} />
              <InputField name="startDate" label="Start Date" value={formData.startDate?.slice(0, 10)} onChange={handleChange} type="date" />
              <InputField name="endDate" label="End Date" value={formData.endDate?.slice(0, 10)} onChange={handleChange} type="date" />

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={formData.description || ''} onChange={handleChange} />
              </div>

              <div className="col-12">
                <label className="form-label d-block">Upload Images</label>
                {imageInputs.map((input, idx) => (
                  <div key={input.id} className="d-flex align-items-center mb-2 gap-3">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => handleSingleFileChange(idx, e.target.files[0])}
                    />
                    {idx === imageInputs.length - 1 && imageInputs.length < 5 && (
                      <Button variant="outline-primary" size="sm" onClick={handleAddImageInput}>
                        ➕ Add Image
                      </Button>
                    )}
                  </div>
                ))}

                <div className="mt-3 d-flex gap-2 flex-wrap">
                  {previewUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`preview-${idx}`}
                      style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <UserFooter />
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="col-md-6">
      <div className="p-3 border rounded bg-light">
        <strong>{label}:</strong><br />
        <span>{value}</span>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text' }) {
  return (
    <div className="col-md-6">
      <label className="form-label">{label}</label>
      <input className="form-control" name={name} type={type} value={value || ''} onChange={onChange} />
    </div>
  );
}

export default ProjectDetails;
