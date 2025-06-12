import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://backend-u1pk.onrender.com/user/all/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const openModal = (user) => {
    setEditUserId(user._id);
    setEditData({
      fullName: user.fullName || '',
      email: user.email || '',
      mobile: user.mobile || '',
      companyName: user.companyName || '',
      city: user.city || '',
      state: user.state || '',
      pinCode: user.pinCode || '',
      logo: user.logo || '',
      mainCategory: user.mainCategory || '',
      subCategory: user.subCategory || '',
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setEditUserId(null);
    setEditData({});
    setShowModal(false);
  };

  const saveUser = async () => {
    try {
      await axios.put(`https://backend-u1pk.onrender.com/user/profile/admin/${editUserId}`, editData);
      closeModal();
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`https://backend-u1pk.onrender.com/user/delete/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Company</th>
            <th>City</th>
            <th>State</th>
            <th>Pin Code</th>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.companyName}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.pinCode}</td>
              <td>{user.mainCategory}</td>
              <td>{user.subCategory}</td>
              <td>{user.logo ? <a href={user.logo} target="_blank" rel="noreferrer">View</a> : '—'}</td>
              <td>
                <button onClick={() => openModal(user)}>Edit</button>
                <button onClick={() => deleteUser(user._id)} style={{ marginLeft: '8px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#fff', padding: '20px', borderRadius: '10px',
            width: '400px', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h3>Edit User</h3>
            {Object.keys(editData).map(key => (
              <div key={key} style={{ marginBottom: '10px' }}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label><br />
                <input
                  type="text"
                  value={editData[key]}
                  onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
            ))}

            <div style={{ textAlign: 'right' }}>
              <button onClick={saveUser}>Save</button>
              <button onClick={closeModal} style={{ marginLeft: '10px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
