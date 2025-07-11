import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainCategory from './pages/MainCategory';
import SubCategory from './pages/SubCategory';
import UserEnquiry from './pages/UserEnquiry';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import UserDashboard from './pages/UserDashboard';
import SearchProfessions from './pages/SearchProfessions';
import Notifications from './pages/Notifications';
import AdminRFQApprovals from './pages/AdminRFQApprovals';
import HomePage from './pages/HomePage';
import Cities from './pages/Cities';
import Projects from './pages/Projects';
import AboutUs from './pages/AboutUs';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import CreateRfq from './pages/CreateRfq';
import Rfq from './pages/Rfq';
import RFQdetailed from './pages/RFQdetailed';
const App = () => {
  return (
    <Router>
      <div>
        {/* You can add a Navbar here if needed */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/category" element={<MainCategory />} />
          <Route path="/sub-category" element={<SubCategory />} />
          <Route path="/user-enquiry" element={<UserEnquiry />} />
          <Route path="/user-dashboard/:id" element={<UserDashboard />} />
          <Route path="/professionals/search" element={<SearchProfessions />} />
          {/*   <Route path="/user-dashboard/:id" element={<UserDashboard />} />   /projectDetails/${rfq._id} */}
          <Route path="/allRfq/:id" element={<Rfq />} />
          <Route path="/notifications/:id" element={<Notifications />} />
          <Route path="/admin/rfqs" element={<AdminRFQApprovals />} />
          <Route path="/admin/cities" element={<Cities />} />
          <Route path="/projects/:id" element={<Projects />} />
          <Route path="/projectDetails/:id" element={<ProjectDetails />} />
          <Route path="/CreateProject/:id" element={<CreateProject />} />
          <Route path="/createRfq/:id" element={<CreateRfq />} />
          <Route path="/Rfqdetailed/:id" element={<RFQdetailed/>} />

          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
