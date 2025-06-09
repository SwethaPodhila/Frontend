import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://construction-backend-w8qz.onrender.com/category/main-categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const addCategory = async () => {
    if (!name.trim()) return alert('Enter a category name');
    try {
      await axios.post('https://construction-backend-w8qz.onrender.com/category/main-categories', { name });
      setName('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
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

  const updateCategory = async () => {
    if (!editName.trim()) return alert('Enter a valid name');
    try {
      await axios.put(`https://construction-backend-w8qz.onrender.com/category/main-categories/${editId}`, { name: editName });
      closeModal();
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`https://construction-backend-w8qz.onrender.com/category/main-categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      <h2>Main Categories</h2>
      <input
        type="text"
        placeholder="Add main category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addCategory} style={{ marginLeft: '10px' }}>Add</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td style={thTdStyle}>{cat.name}</td>
              <td style={thTdStyle}>
                <button onClick={() => openEditModal(cat._id, cat.name)}>Edit</button>
                <button onClick={() => deleteCategory(cat._id)} style={{ marginLeft: '8px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h3>Edit Category</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <button onClick={updateCategory}>Update</button>
              <button onClick={closeModal} style={{ marginLeft: '8px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainCategory;
