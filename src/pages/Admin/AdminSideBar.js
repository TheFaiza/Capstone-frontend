import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Admin.scss";

const AdminSideBar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    
    const userDataString = localStorage.removeItem('user');
    localStorage.removeItem('headerClass');
    navigate('/');
    console.log("userDataString:", userDataString)
  }

  return (
    <div className="sidebar">
      <ul className='sidebar-links'>
        <li>
          <NavLink to="admin/students" activeclassname="active" exact="true">
            Students
          </NavLink>
        </li>
        <li>
          <NavLink to="admin/courses" activeclassname="active">
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="admin/grades" activeclassname="active">
            Grades
          </NavLink>
        </li>
      </ul>
      <div className="logout-link">
        <Link to="/admin">Profile</Link>
        <Link onClick={handleLogout} to="/">
            Logout
          </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
