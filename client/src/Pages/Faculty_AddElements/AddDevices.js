import React, { useState } from 'react';
import axios from 'axios';
import './AddDevice.css';

export default function AddDevice() {
  const [deviceData, setDeviceData] = useState({
    device_type: 'computer',
    model_id: '',
    Room_id: '',
    Company: '',
    DOI: '',
    status: '',
    dept_id: 3 // Default to computer department
  });

  const handleChange = (e) => {
    setDeviceData({ ...deviceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/addDevice', deviceData);
      alert('Device added successfully');
      // Clear form fields or redirect to another page
    } catch (error) {
      console.error('Error adding device:', error);
      alert('Failed to add device');
    }
  };

  return (
    <div className="container1">
      <h2>Add Device</h2>
      <form className="add-device-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="device_type">Device Type:</label>
          <select name="device_type" id="device_type" value={deviceData.device_type} onChange={handleChange} required>
            <option value="computer">Computer</option>
            <option value="ac">AC</option>
            <option value="projector">Projector</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="model_id">Model ID:</label>
          <input type="text" name="model_id" id="model_id" value={deviceData.model_id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Room_id">Room ID:</label>
          <input type="text" name="Room_id" id="Room_id" value={deviceData.Room_id} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Company">Company:</label>
          <input type="text" name="Company" id="Company" value={deviceData.Company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="DOI">DOI:</label>
          <input type="date" name="DOI" id="DOI" value={deviceData.DOI} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select name="status" id="status" value={deviceData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Working">Working</option>
            <option value="Not Working">Not Working</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dept_id">Department:</label>
          <select name="dept_id" id="dept_id" value={deviceData.dept_id} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="1">Electrical</option>
            <option value="2">Mechanical</option>
            <option value="3">Computer</option>
            <option value="4">Civil</option>
            <option value="5">Chemical</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Add Device</button>
      </form>
    </div>
  );
}
