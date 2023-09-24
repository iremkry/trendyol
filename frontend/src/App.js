import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from '../src/pages/Dashboard'; 
import AssetSearch from '../src/pages/AssetSearch'; 
import Scan from './pages/Scan';
import NavBar from './components/NavBar';
import AssetDetails from './pages/AssetDetails';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar> </NavBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assets" element={<AssetSearch />} />
          <Route path="/scans" element={<Scan />} />
          <Route path="/asset_details/:ipAddress" element={<AssetDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
