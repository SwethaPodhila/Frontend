import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

function Projects() {
  const { id } = useParams();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [editingRfq, setEditingRfq] = useState(null);
  const [editData, setEditData] = useState({
    title: '', budget: '', state: '', city: '', description: '',
    deadline: '', subCategories: [], providers: []
  });

  const budgetOptions = [
    'Under 1 Lakh', '1–2 Lakhs', '2–5 Lakhs',
    '5–10 Lakhs', '10–25 Lakhs', 'Above 25 Lakhs'
  ];

  useEffect(() => {
    fetch('http://localhost:5000/category/sub-categories')
      .then(res => res.json())
      .then(setSubCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/rfq/user/Rfqs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch RFQs');
        const data = await res.json();
        setRfqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRfqs();
  }, [id]);

  const isEditable = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    return (now - createdDate) / (1000 * 60 * 60) < 24;
  };

  const openEditModal = (rfq) => {
    setEditingRfq(rfq);
    setEditData({
      title: rfq.title,
      budget: rfq.budget,
      state: rfq.state,
      city: rfq.city,
      description: rfq.description,
      deadline: rfq.deadline?.split('T')[0],
      subCategories: rfq.subCategories.map(s => ({ value: s, label: s })),
      providers: rfq.providers || []
    });

    fetch('http://localhost:5000/user/all/users')
      .then(res => res.json())
      .then(users => {
        const filtered = users.filter(u => rfq.subCategories.includes(u.subCategory));
        const uniqueCompanies = [...new Set(filtered.map(u => u.companyName))];
        setCompanies(uniqueCompanies);
      });
  };

  const handleEditSubmit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      ...editData,
      subCategories: editData.subCategories.map(s => s.value),
      providers: editData.providers
    };
    try {
      const res = await fetch(`http://localhost:5000/rfq/update/${editingRfq._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();
      setRfqs(rfqs.map(r => r._id === updated._id ? updated : r));
      setEditingRfq(null);
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-primary mb-4">📋 Your Created RFQs</h2>
      {loading ? <p className="text-center">Loading...</p> : error ? <p className="text-danger text-center">{error}</p> : (
        <div className="row">
          {rfqs.map(rfq => (
            <div key={rfq._id} className="col-md-6 mb-4">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body">
                  <h4 className="card-title text-dark fw-semibold">{rfq.title}</h4>
                  <hr />
                  <p><strong>📊 Budget:</strong> {rfq.budget}</p>
                  <p><strong>📍 Location:</strong> {rfq.city}, {rfq.state}</p>
                  <p><strong>📅 Deadline:</strong> {new Date(rfq.deadline).toLocaleDateString()}</p>
                  <p><strong>🔖 Status:</strong> <span className={`badge ${rfq.status === 'approved' ? 'bg-success' : 'bg-warning text-dark'}`}>{rfq.status}</span></p>
                  <p><strong>📝 Description:</strong> {rfq.description}</p>
                  <p><strong>📂 Subcategories:</strong> {rfq.subCategories?.join(', ')}</p>
                  <p><strong>🏢 Providers:</strong> {rfq.providers?.join(', ')}</p>
                  {isEditable(rfq.createdAt) && (
                    <button className="btn btn-outline-warning mt-3" onClick={() => openEditModal(rfq)}>
                      ✏️ Edit RFQ
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingRfq && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✏️ Edit RFQ</h5>
                <button className="btn-close" onClick={() => setEditingRfq(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input className="form-control" value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Budget</label>
                    <select className="form-select" value={editData.budget} onChange={e => setEditData({ ...editData, budget: e.target.value })}>
                      <option value="">Select Budget</option>
                      {budgetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <input className="form-control" value={editData.state} onChange={e => setEditData({ ...editData, state: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input className="form-control" value={editData.city} onChange={e => setEditData({ ...editData, city: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Deadline</label>
                    <input type="date" className="form-control" value={editData.deadline} onChange={e => setEditData({ ...editData, deadline: e.target.value })} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Project Type (Subcategories)</label>
                    <Select
                      isMulti
                      options={subCategories.map(sub => ({ value: sub.name, label: sub.name }))}
                      value={editData.subCategories}
                      onChange={(selected) => setEditData({ ...editData, subCategories: selected })}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Provider Companies</label>
                    <div className="row">
                      {companies.map((company, idx) => (
                        <div className="col-md-4" key={idx}>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={editData.providers.includes(company)}
                              onChange={() => {
                                const updated = editData.providers.includes(company)
                                  ? editData.providers.filter(c => c !== company)
                                  : [...editData.providers, company];
                                setEditData({ ...editData, providers: updated });
                              }}
                              id={`provider-${idx}`}
                            />
                            <label className="form-check-label" htmlFor={`provider-${idx}`}>{company}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingRfq(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEditSubmit}>💾 Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
