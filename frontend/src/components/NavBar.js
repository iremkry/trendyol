import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
    <ul className="navbar-tabs">
      <li>
        <Link to="/" className="navbar-tabs">Trendyol Asset</Link>
      </li>
      <li>
        <Link to="/" className="navbar-tab">Dashboard</Link>
      </li>
      <li>
        <Link to="/assets" className="navbar-tab">Asset Search</Link>
      </li>
      <li>
        <Link to="/scans" className="navbar-tab">Scan</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavBar;
