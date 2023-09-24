import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScanPage = () => {
  const initialScanData = {
    scan_name: '',
    scope: '',
    options: 'fast port scan',
  };

  const [scanData, setScanData] = useState(initialScanData);
  const [setScanResult] = useState(null);
  const [scanRecords, setScanRecords] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setScanData({ ...scanData, [name]: value });
  };

  const handleScanSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to initiate the scan
      const response = await axios.post('http://localhost:8000/scans/', scanData);

      // Update scan result
      setScanResult(response.data);

      // Reset form fields
      setScanData(initialScanData);

      // Fetch and update scan records
      fetchScanRecords();
    } catch (error) {
      console.error('Error creating scan:', error);
      // Handle error and display an error message if needed
    }
  };

  const fetchScanRecords = async () => {
    try {
      // Make a GET request to fetch scan records
      const response = await axios.get('http://localhost:8000/scans/');
      const data = response.data;
      setScanRecords(data);
    } catch (error) {
      console.error('Error fetching scan records:', error);
      // Handle error and display an error message if needed
    }
  };

  useEffect(() => {
    // Fetch scan records when the component mounts
    fetchScanRecords();
  }, []);

  return (
    <div>
      <h2>Scan Page</h2>
      <form onSubmit={handleScanSubmit}>
        {/* Scan Name */}
        <div>
          <label htmlFor="scan_name">Scan Name:</label>
          <input
            type="text"
            id="scan_name"
            name="scan_name"
            value={scanData.scan_name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Scope */}
        <div>
          <label htmlFor="scope">Scope:</label>
          <input
            type="text"
            id="scope"
            name="scope"
            value={scanData.scope}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Scan Option */}
        <div>
          <label htmlFor="options">Scan Option:</label>
          <select
            id="options"
            name="options"
            value={scanData.options}
            onChange={handleInputChange}
          >
            <option value="fast port scan">Fast Port Scan</option>
            <option value="full port scan">Full Port Scan</option>
            <option value="script based scan">Script-Based Scan</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit">Scan</button>
      </form>

      {/* Display Scan Result */}
      {/* Display Scan List */}
{scanRecords.length > 0 && (
  <div>
    <h2>Scan List</h2>
    <table>
      
        <tr>
          <th style={{ fontWeight: 'bold' }}>Scan Name</th>
          <th style={{ fontWeight: 'bold' }}>Scope</th>
          <th style={{ fontWeight: 'bold' }}>Created At</th>
          <th style={{ fontWeight: 'bold' }}>Finished At</th>
          <th style={{ fontWeight: 'bold' }}>Options</th>
          <th style={{ fontWeight: 'bold' }}>Status</th>
        </tr>
      
      <tbody>
        {scanRecords.map((scan) => (
          <tr key={scan.scan_name}>
            <td>{scan.scan_name}</td>

            <td>{scan.scope}</td>
            
            <td>{scan.created_at}</td>
            
            <td>{scan.finished_at}</td>
            
            <td>{scan.options}</td>
            
            <td>{scan.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default ScanPage;
