import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className='sidebar-links'>
        <li>
          <NavLink to="/" activeclassname="active" exact="true">
            Student
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/courses" activeclassname="active">
            Course
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/grades" activeclassname="active">
            Grades
          </NavLink>
        </li>
      </ul>
      <div className="logout-link">
        <Link to="/admin-profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default SideBar;
