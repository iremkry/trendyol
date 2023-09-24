import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-button">
        <Link to="/">
          <button className="dashboard-btn">Dasboard</button>
        </Link>
        <Link to="/assets">
          <button className="dashboard-btn">Assets</button>
        </Link>
        <Link to="/scans">
          <button className="dashboard-btn">Scan</button>
        </Link>
        <Link to="/asset_details">
          <button className="dashboard-btn">Asset Details</button>
        </Link>
      </div>
      {/* Add similar links/buttons for other pages */}
    </div>
  );
};

export default Dashboard;
