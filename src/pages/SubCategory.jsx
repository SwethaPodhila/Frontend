import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubCategory() {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState('');
  const [subName, setSubName] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  const fetchMainCategories = async () => {
    const res = await axios.get('http://localhost:5000/category/main-categories');
    setMainCategories(res.data);
  };

  const fetchSubCategories = async (mainCategoryId) => {
    const res = await axios.get(`http://localhost:5000/category/sub-categories/${mainCategoryId}`);
    setSubCategories(res.data);
  };

  const addSubCategory = async () => {
    if (!selectedMain || subName.trim() === '') return alert('Select main category and enter name');
    await axios.post('http://localhost:5000/category/sub-categories', {
      name: subName,
      mainCategoryId: selectedMain,
    });
    setSubName('');
    fetchSubCategories(selectedMain);
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  return (
    <div>
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

      <br />
      <input
        type="text"
        placeholder="Enter sub category name"
        value={subName}
        onChange={(e) => setSubName(e.target.value)}
      />
      <button onClick={addSubCategory}>Add Sub Category</button>

      <ul>
        {subCategories.map((sub) => (
          <li key={sub._id}>{sub.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SubCategory;
