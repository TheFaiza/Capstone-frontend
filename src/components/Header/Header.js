import React, { useEffect, useState } from 'react';
import './Header.scss';
import applogo from '../icons/logo192.png';
import { Link, useNavigate } from 'react-router-dom';



function Header() {
  
  const navigate = useNavigate();
  const userDataString = localStorage.getItem('user');
  const headerClass = localStorage.getItem('headerClass');
  const userData = JSON.parse(userDataString);

  const checkLogin = () => {
    if(userData != null && userData.user_type === "Admin") {
      navigate('/admin');
    } else if (userData != null && userData.user_type === "Student") {
      navigate('student');
    }
    else {
      navigate('/')
    }
  
  }


  return (
    <div className={`header ${headerClass}`}>
      <div className="logo">
        <Link><img src={applogo} alt='app logo' onClick={checkLogin} /></Link>
      </div>
    </div>
  );
}

export default Header;
