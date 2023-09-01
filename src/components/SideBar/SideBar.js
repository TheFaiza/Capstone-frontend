import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./SideBar.scss";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className='sidebar-links'>
        <li>
          <NavLink to="/" activeClassName="active-link" exact>
            Student
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/courses" activeClassName="active-link">
            Course
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/grades" activeClassName="active-link">
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
