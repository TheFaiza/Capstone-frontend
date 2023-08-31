import React from 'react';
import './Header.scss';
import applogo from '../icons/logo192.png';



function Header() {
  return (
    <div className="header">
      <div className="logo">
      <img src={applogo} alt='app logo' />
      </div>
    </div>
  );
}

export default Header;
