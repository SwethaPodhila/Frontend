import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import UserFooter from '../components/UserFooter';

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };


  const token = localStorage.getItem('token');

  // Initial fetch for project data and its cities
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

  // Controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // When state changes, update city dropdown
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

  // Submit update
  const handleUpdate = async () => {
    const form = new FormData();

    for (let key in formData) {
      if (key !== 'images') form.append(key, formData[key]);
    }

    selectedFiles.forEach(file => {
      form.append('images', file); // backend should handle array upload
    });

    const res = await fetch(`https://backend-u1pk.onrender.com/project/updateProject/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
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
        <Button variant="secondary" className="mb-4" onClick={() => navigate(-1)}>← Back</Button>
        <div className="card shadow p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Project Details</h3>
            <Button variant="warning" onClick={() => setShowModal(true)}>Edit Project</Button>
          </div>

          <div className="row g-4">
            <Detail label="Title" value={getVal(project.title)} />
            <Detail label="Budget" value={getVal(project.budget)} />
            <Detail label="City" value={getVal(project.city)} />
            <Detail label="State" value={getVal(project.state)} />
            <Detail label="Description" value={getVal(project.description)} />
            <Detail label="Start Date" value={project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'} />
            <Detail label="End Date" value={project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'} />
            <Detail label="Stage" value={getVal(project.stage)} />
            <Detail label="Client Name" value={getVal(project.clientName)} />
            <Detail label="Client Email" value={getVal(project.clientEmail)} />
            <Detail label="Client Phone" value={getVal(project.clientPhone)} />
            <Detail label="Client Address" value={getVal(project.clientAddress)} />
          </div>

          {project.images?.length > 0 && (
            <div className="mt-5">
              <h5>Project Images</h5>
              <div className="d-flex flex-wrap gap-3">
                {project.images.map((url, idx) => (
                  <img key={idx} src={url} alt={`img-${idx}`} style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                ))}
              </div>
            </div>
          )}
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

              {/* State Dropdown */}
              <div className="col-md-6">
                <label className="form-label">State</label>
                <select className="form-select" name="state" value={formData.state || ''} onChange={handleStateChange}>
                  <option value="">-- Select State --</option>
                  {stateList.map((state, idx) => (
                    <option key={idx} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div className="col-md-6">
                <label className="form-label">City</label>
                <select className="form-select" name="city" value={formData.city || ''} onChange={handleChange}>
                  <option value="">-- Select City --</option>
                  {cities.map((city, idx) => (
                    <option key={idx} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Stage Dropdown */}
              <div className="col-md-6">
                <label className="form-label">Project Stage</label>
                <select className="form-select" name="stage" value={formData.stage || ''} onChange={handleChange}>
                  <option value="">-- Select Stage --</option>
                  {stageOptions.map((stage, idx) => (
                    <option key={idx} value={stage}>{stage}</option>
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

              {[...Array(6)].map((_, idx) => (
                <div className="col-md-6" key={idx}>
                  {selectedFiles[idx] || idx === selectedFiles.length ? (
                    <>
                      <label className="form-label">Image {idx + 1}</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const newFiles = [...selectedFiles];
                            newFiles[idx] = file;
                            setSelectedFiles(newFiles);

                            const newPreviews = [...previewUrls];
                            newPreviews[idx] = URL.createObjectURL(file);
                            setPreviewUrls(newPreviews);
                          }
                        }}
                      />
                      {previewUrls[idx] && (
                        <div className="mt-2">
                          <img
                            src={previewUrls[idx]}
                            alt={`preview-${idx}`}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              ))}

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
