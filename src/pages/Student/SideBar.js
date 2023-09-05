import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Student.scss";

const SideBar = () => {
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
          <NavLink to="/student" activeclassname="active" exact="true">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/student/courses" activeclassname="active">
            Course
          </NavLink>
        </li>
        <li>
          <NavLink to="/student/studentAssignGrades" activeclassname="active">
            Grades
          </NavLink>
        </li>
      </ul>
      <div className="logout-link">
        <Link onClick={handleLogout} to="/">
            Logout
          </Link>
      </div>
    </div>
  );
};

export default SideBar;
