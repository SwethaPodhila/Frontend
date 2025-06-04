import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MainCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/category/main-categories');
    setCategories(res.data);
  };

  const addCategory = async () => {
    if (name.trim() === '') return alert('Enter a category name');
    await axios.post('http://localhost:5000/category/main-categories', { name });
    setName('');
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Main Categories</h2>
      <input
        type="text"
        placeholder="Add main category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addCategory}>Add</button>

      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MainCategory;
