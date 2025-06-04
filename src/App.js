import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainCategory from './pages/MainCategory';
import SubCategory from './pages/SubCategory';
import UserEnquiry from './pages/UserEnquiry';

const App = () => {
  return (
    <Router>
      <div>
        {/* You can add a Navbar here if needed */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          <Route path="/category" element={<MainCategory />} />
          <Route path="/sub-category" element={<SubCategory />} />
          <Route path="/user-enquiry" element={<UserEnquiry />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
