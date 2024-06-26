import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddDevice.css'
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const DeviceForm = ({ isUpdate }) => {
  const [formData, setFormData] = useState({
    no_of_devices: '',
    device_type: '',
    device_info: {
      model_id: '',
      Room_id: '',
      Company: '',
      DOI: '',
      status: 'Working' // Default value for status
    }
  });
  const [availableModels, setAvailableModels] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertErr, setShowAlertErr] = useState(false);
  const [showAlertErr2, setShowAlertErr2] = useState(false);

  useEffect(() => {
    fetchAvailableModels();
    fetchAvailableRooms();
  }, []);

  const fetchAvailableModels = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/models');
      setAvailableModels(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching available models:', error);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/rooms');
      setAvailableRooms(response.data);
      console.log(response.data);




    } catch (error) {
      console.error('Error fetching available rooms:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'no_of_devices' || name === 'device_type') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        device_info: {
          ...prevState.device_info,
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/addDevice', formData);
      console.log(res.data);
      // Reset form after successful submission
      setFormData({
        no_of_devices: '',
        device_type: '',
        device_info: {
          model_id: '',
          Room_id: '',
          Company: '',
          DOI: '',
          status: 'Working'
        }
      });
      setShowAlert(true)
    }  catch (error) {
      if (error.response.status == 400) {
        setShowAlertErr(true)
        // alert('Already present');
      } else {
        console.error('Error adding Device:', error);
        // alert('Failed to add staff member');
        setShowAlertErr2(true)
      }
    }
  };
  



  return (
    <div>
      <h2>Add Device</h2>
      <h2>Welcome Faculty/Admin!</h2>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to='/faculty' className='btn btn-primary'>Back</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box">
        <div className="head">
          <h2 className="text-black">ADD DEVICE</h2>
          <h3 className="text-black">{sessionStorage.getItem("userID")}: {sessionStorage.getItem("name")}</h3>
        </div>
          <div className="complaint">
            <div>
              <label htmlFor="no_of_devices" className="text-black">Number of Devices:</label>
              <input className='inp' type="number" name="no_of_devices" value={formData.no_of_devices} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="device_type" className="text-black">Device Type:</label>
              <select name="device_type" value={formData.device_type} onChange={handleChange} required>
                <option value="">Select Device Type</option>
                <option value="computer">Computer</option>
                <option value="projector">Projector</option>
                <option value="ac">AC</option>
              </select>
            </div>
            <div>
              <label htmlFor="model_id" className="text-black">Model ID:</label>
              <select name="model_id" value={formData.device_info.model_id} onChange={handleChange} required>
                <option value="" className="text-black">Select Model ID</option>
                {[...Array(5)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </select>

            </div>
            <div>

              <div>
                <div>
                  <label htmlFor="Room_id" className="text-black">Room ID:</label>
                  <select name="Room_id" value={formData.device_info.Room_id} onChange={handleChange} required>
                    <option value="">Select Room ID</option>
                    {availableRooms && Object.keys(availableRooms).flatMap(key => (
                      availableRooms[key].map(room => (
                        <option key={room.Room_id} value={room.Room_id}>{room.Room_id}</option>
                      ))
                    ))}
                  </select>
                </div>


              </div>


            </div>
            <div>
              <label htmlFor="Company" className="text-black">Company:</label>
              <input className='inp' type="text" name="Company" value={formData.device_info.Company} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="DOI" className="text-black">Date of Installation (DOI):</label>
              <input className='inp' type="date" name="DOI" value={formData.device_info.DOI} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="status" className="text-black">Status:</label>
              <input className='inp' type="text" name="status" value={formData.device_info.status} readOnly />
            </div>
            <button
              className="button-82-pushable"
              role="button"
              type="submit"
            >
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">Submit</span>
            </button>          </div>
        </div>
      </form>
      
      <Alert show={showAlert} variant="success" 
       style={{
        position: 'fixed', // Change to fixed
        bottom: '550px',    // Adjust bottom distance as needed
        height: '60px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: '9999' 
      }}
    >
        Successfully Registered ✔
      </Alert>
      <Alert show={showAlertErr} variant="danger" 
       style={{
        position: 'fixed', // Change to fixed
        bottom: '550px',    // Adjust bottom distance as needed
        height: '60px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: '9999' 
      }}
    >
        Already present
      </Alert>
      <Alert show={showAlertErr2} variant="danger" 
       style={{
        position: 'fixed', // Change to fixed
        bottom: '550px',    // Adjust bottom distance as needed
        height: '60px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: '9999' 
      }}
    >
        Failed To Add
      </Alert>
    </div>
  );
};

export default DeviceForm;
