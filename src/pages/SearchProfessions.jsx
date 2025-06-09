import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SearchProfessions() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    selectedCategories: [],
    selectedSubCategories: []
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const usersRes = await fetch('http://localhost:5000/user/all/users');
      const users = await usersRes.json();
      setAllUsers(users);
      setFilteredUsers(users);

      const catRes = await fetch('http://localhost:5000/category/main-categories');
      const catData = await catRes.json();
      setCategories(catData);

      const subCatRes = await fetch('http://localhost:5000/category/sub-categories');
      const subData = await subCatRes.json();
      setSubCategories(subData);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    applyFilters(updated);
  };

  const handleCheckboxChange = (type, value) => {
    setFilters(prev => {
      const list = [...prev[type]];
      const index = list.indexOf(value);
      if (index > -1) {
        list.splice(index, 1); // uncheck
      } else {
        list.push(value); // check
      }
      const updated = { ...prev, [type]: list };
      applyFilters(updated);
      return updated;
    });
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...allUsers];

    if (currentFilters.name) {
      filtered = filtered.filter(user =>
        user.fullName.toLowerCase().includes(currentFilters.name.toLowerCase())
      );
    }

    if (currentFilters.city) {
      filtered = filtered.filter(user =>
        user.city.toLowerCase().includes(currentFilters.city.toLowerCase())
      );
    }

    if (currentFilters.selectedCategories.length > 0) {
      filtered = filtered.filter(user =>
        currentFilters.selectedCategories.includes(user.mainCategory)
      );
    }

    if (currentFilters.selectedSubCategories.length > 0) {
      filtered = filtered.filter(user =>
        currentFilters.selectedSubCategories.includes(user.subCategory)
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-4">
        {/* Search Bar Top Row */}
        <div className="row mb-3">

          <div className="col-md-12 mb-2">
            <input
              type="text"
              name="city"
              placeholder="🏙️ Search by city"
              className="form-control"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          {/* Sidebar Filters */}

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <h5 className="mb-3">🎯 Filters</h5>
              <div className="col-md-12 mb-2">
                <input
                  type="text"
                  name="name"
                  placeholder="🔤 Search by name"
                  className="form-control"
                  value={filters.name}
                  onChange={handleInputChange}
                />
              </div>

              <h6>Main Categories</h6>
              {categories.map(cat => (
                <div className="form-check" key={cat._id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={cat.name}
                    checked={filters.selectedCategories.includes(cat.name)}
                    onChange={() => handleCheckboxChange('selectedCategories', cat.name)}
                  />
                  <label className="form-check-label">{cat.name}</label>
                </div>
              ))}

              <hr />

              <h6>Sub Categories</h6>
              {subCategories.map(sub => (
                <div className="form-check" key={sub._id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={sub.name}
                    checked={filters.selectedSubCategories.includes(sub.name)}
                    onChange={() => handleCheckboxChange('selectedSubCategories', sub.name)}
                  />
                  <label className="form-check-label">{sub.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* User Cards */}
          <div className="col-md-9">
            <div className="row">
              {filteredUsers.length === 0 ? (
                <p className="text-muted">No users found matching filters.</p>
              ) : (
                filteredUsers.map((user, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card h-100 shadow-sm">
                      <div className="card-body text-center">
                        <img
                          src={user.logo || 'https://via.placeholder.com/100'}
                          className="rounded-circle mb-3"
                          alt="Logo"
                          width="80"
                          height="80"
                        />
                        <h6 className="fw-bold">{user.fullName}</h6>
                        <p className="mb-1 text-muted">{user.companyName}</p>
                        <p className="mb-0">{user.mainCategory} → {user.subCategory}</p>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{user.city}, {user.state}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

}

export default SearchProfessions;
