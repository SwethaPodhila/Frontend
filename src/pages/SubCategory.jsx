import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubCategory() {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState('');
  const [subName, setSubName] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMainCategories();
  }, []);

  const fetchMainCategories = async () => {
    try {
      const res = await axios.get('https://construction-backend-w8qz.onrender.com/category/main-categories');
      setMainCategories(res.data);
    } catch (err) {
      console.error('Error fetching main categories:', err);
    }
  };

  const fetchSubCategories = async (mainCategoryId) => {
    try {
      const res = await axios.get(`https://construction-backend-w8qz.onrender.com/category/sub-categories/${mainCategoryId}`);
      setSubCategories(res.data);
    } catch (err) {
      console.error('Error fetching sub-categories:', err);
    }
  };

  const addSubCategory = async () => {
    if (!selectedMain || subName.trim() === '') return alert('Select main category and enter name');
    try {
      await axios.post('https://construction-backend-w8qz.onrender.com/category/sub-categories', {
        name: subName,
        mainCategoryId: selectedMain,
      });
      setSubName('');
      fetchSubCategories(selectedMain);
    } catch (err) {
      console.error('Error adding sub-category:', err);
    }
  };

  const openEditModal = (id, currentName) => {
    setEditId(id);
    setEditName(currentName);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditId(null);
    setEditName('');
    setShowModal(false);
  };

  const updateSubCategory = async () => {
    if (!editName.trim()) return alert('Enter a valid name');
    try {
      await axios.put(`https://construction-backend-w8qz.onrender.com/category/sub-categories/${editId}`, {
        name: editName,
        mainCategoryId: selectedMain,
      });
      closeModal();
      fetchSubCategories(selectedMain);
    } catch (err) {
      console.error('Error updating sub-category:', err);
    }
  };

  const deleteSubCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sub-category?')) return;
    try {
      await axios.delete(`https://construction-backend-w8qz.onrender.com/category/sub-categories/${id}`);
      fetchSubCategories(selectedMain);
    } catch (err) {
      console.error('Error deleting sub-category:', err);
    }
  };

  // Styling
  const tableStyle = {
    width: '40%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  };

  const modalOverlay = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  };

  const modalContent = {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Sub Categories</h2>

      <select
        value={selectedMain}
        onChange={(e) => {
          setSelectedMain(e.target.value);
          fetchSubCategories(e.target.value);
        }}
      >
        <option value="">Select Main Category</option>
        {mainCategories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <br /><br />
      <input
        type="text"
        placeholder="Enter sub category name"
        value={subName}
        onChange={(e) => setSubName(e.target.value)}
      />
      <button onClick={addSubCategory} style={{ marginLeft: '10px' }}>Add Sub Category</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((sub) => (
            <tr key={sub._id}>
              <td style={thTdStyle}>{sub.name}</td>
              <td style={thTdStyle}>
                <button onClick={() => openEditModal(sub._id, sub.name)}>Edit</button>
                <button onClick={() => deleteSubCategory(sub._id)} style={{ marginLeft: '8px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Edit Sub Category</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <button onClick={updateSubCategory}>Update</button>
              <button onClick={closeModal} style={{ marginLeft: '8px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubCategory;