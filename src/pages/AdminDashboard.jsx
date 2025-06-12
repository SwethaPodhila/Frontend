import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [mainCount, setMainCount] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchMainCategoryCount();
    fetchSubCategoryCount();
    fetchUserCount();
  }, []);

  const fetchMainCategoryCount = async () => {
    try {
      const res = await axios.get('https://backend-u1pk.onrender.com/category/main-categories');
      setMainCount(res.data.length);
    } catch (err) {
      console.error('Error fetching main categories:', err);
    }
  };

  const fetchSubCategoryCount = async () => {
    try {
      const res = await axios.get('https://backend-u1pk.onrender.com/category/sub-categories');
      setSubCount(res.data.length);
    } catch (err) {
      console.error('Error fetching sub categories:', err);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await axios.get('https://backend-u1pk.onrender.com/user/all/users');
      setUserCount(res.data.length);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const cardData = [
    { title: 'Total Users', value: userCount, path: '/users' },
    { title: 'Main Categories', value: mainCount, path: '/category' },
    { title: 'Sub Categories', value: subCount, path: '/sub-category' },
    { title: 'Total Orders', value: 0, path: '/orders' },
    { title: 'Completed Projects', value: 0, path: '/projects' },
    { title: 'Pending Approvals', value: 0, path: '/approvals' },
  ];

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px',
    padding: '20px',
  };

  const cardStyle = {
    flex: '1 1 calc(33.33% - 20px)',
    background: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minWidth: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: '0.2s',
  };

  const titleStyle = {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  };

  const valueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Admin Dashboard</h2>
      <div style={containerStyle}>
        {cardData.map((card, index) => (
          <div
            key={index}
            style={cardStyle}
            onClick={() => navigate(card.path)}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')}
          >
            <div style={titleStyle}>{card.title}</div>
            <div style={valueStyle}>{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
