import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters

const AssetDetails = () => {
  const { ipAddress } = useParams(); // Get the IP address from URL parameters
  const [assetDetails, setAssetDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/asset_details/' + ipAddress)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAssetDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching asset details:', error);
      });
  }, [ipAddress])
  

  return (
    <div>
      <h2>Asset Details</h2>
      <p><strong>Hostname:</strong> {assetDetails.hostname}</p>
      <p><strong>IP Address:</strong> {assetDetails.ip_address}</p>
      <p><strong>OS:</strong> {assetDetails.os}</p>
      <p><strong>MAC Address:</strong> {assetDetails.mac_address}</p>
      <p><strong>First Seen:</strong> {assetDetails.first_seen}</p>
      <p><strong>Last Seen:</strong> {assetDetails.last_seen}</p>
      <p><strong>Additional Details:</strong> {assetDetails.additional_details}</p>
    </div>
  );
};

export default AssetDetails;
