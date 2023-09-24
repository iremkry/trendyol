import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

const AssetPage = () => {
  const [assets, setAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch asset data from the backend using the search query
    axios.get(`http://localhost:8000/assets/search?query=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });

    // Fetch all assets
    axios.get('http://localhost:8000/assets') // Replace with the actual endpoint
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assets:', error);
      });
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div>
      <h2>Asset Page</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search assets by hostname or IP address"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />

      {/* Display Search Results */}
      <h3>Search Results</h3>
      <ul>
        {searchResults.map((asset, index) => (
          <li key={index}>
            <strong>Hostname:</strong> {asset.hostname}<br />
            <strong>IP Address:</strong> {asset.ip_address}<br />
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>

      {/* Display All Assets */}
      <h3>All Assets</h3>
      <ul>
        {assets.map((asset, index) => (
          <li key={index}>
            <strong>Hostname:</strong> {asset.hostname}<br />
            <strong>IP Address:</strong> {asset.ip_address}<br />
            <Link to={`/asset_details/${asset.ip_address}`}>
              View Details
            </Link>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetPage;
