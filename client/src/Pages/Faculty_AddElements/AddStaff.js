import React, { useState } from 'react';
import Header from '../../common/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export default function AddStaff() {
  const [userType, setUserType] = useState('student'); // Default to student

  const [showAlert, setShowAlert] = useState(false);

  const [formData, setFormData] = useState({
    userType: '',
    data: {
      MIS: '',
      password: '',
      name: '',
      branch: '',
      contactNo: '',
      tech_id: '',
      address: '',
      city: '',
      zip: '',
      field: '',
      email: '',
      username: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formDataToSend;
  
      if (userType === 'student') {
        formDataToSend = {
          userType,
          data: {
            MIS: formData.data.MIS,
            password: formData.data.password,
            name: formData.data.name,
            branch: formData.data.branch,
            contact_no: formData.data.contactNo
          }
        };
        
        // Check if any of the required fields are empty for student
        for (const key in formDataToSend.data) {
          if (formDataToSend.data[key] === '') {
            alert('Please fill in all fields');
            return;
          }
        }
      } else if (userType === 'technician') {
        formDataToSend = {
          userType,
          data: {
            tech_id: formData.data.tech_id,
            password: formData.data.password,
            name: formData.data.name,
            contact_no: formData.data.contactNo,
            address: formData.data.address,
            city: formData.data.city,
            zip: formData.data.zip,
            field: formData.data.field,
            email: formData.data.email
          }
        };
        
        // Check if any of the required fields are empty for technician
        for (const key in formDataToSend.data) {
          if (formDataToSend.data[key] === '') {
            alert('Please fill in all fields');
            return;
          }
        }
      } else if (userType === 'admin') {
        formDataToSend = {
          userType,
          data: {
            name: formData.data.name,
            username: formData.data.username,
            password: formData.data.password
          }
        };
      } else if (userType === 'account_section') {
        formDataToSend = {
          userType,
          data: {
            name: formData.data.name,
            username: formData.data.username,
            password: formData.data.password
          }
        };
  
        // Check if any of the required fields are empty for admin
        for (const key in formDataToSend.data) {
          if (formDataToSend.data[key] === '') {
            alert('Please fill in all fields');
            return;
          }
        }
      }
      else{
        alert("Some INternal Issue")
      }
  
      // Make the API call to add the staff member
      const response = await axios.post('http://localhost:4000/api/v1/addStaff', formDataToSend);
      console.log(response.data);
      alert('Staff member added successfully');
  
      // Reset form data to empty
      setFormData({
        userType: '',
        data: {
          MIS: '',
          password: '',
          name: '',
          branch: '',
          contactNo: '',
          tech_id: '',
          address: '',
          city: '',
          zip: '',
          field: '',
          email: '',
          username: ''
        }
      });

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      if (error.response.status == 400) {
        alert('Already present');
      } else {
        console.error('Error adding staff:', error);
        alert('Failed to add staff member');
      }
    }
  };
  

  return (
    <div>
      <Header />
      <h2>Welcome Faculty/Admin!</h2>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to='/faculty' className='btn btn-primary'>Back</Link>
      </div>

      <div className="box">
        <div className="head">
          <h2>ADD Staff</h2>
          <h3>{sessionStorage.getItem("userID")}: {sessionStorage.getItem("name")}</h3>
        </div>

        <div className="complaint">
          <form onSubmit={handleSubmit}>
            <label htmlFor="userType">User type: </label>
            <br />
            <select
              className="custom-select"
              name="userType"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required // Make the select field required
            >
              <option value="student">Student</option>
              <option value="technician">Technician</option>
              <option value="admin">Admin/Faculty</option>
              <option value="account_section">Acc Section</option>
            </select>
            <br />

            {/* Conditional rendering based on userType */}
            {userType === 'student' && (
              <>
                <label htmlFor="MIS">MIS: </label>
                <input type="text" id="MIS" name="MIS" value={formData.data.MIS} onChange={handleChange} required />
                <br />
                {/* Add the required attribute */}
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={formData.data.password} onChange={handleChange} required />
                <br />
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={formData.data.name} onChange={handleChange} required />
                <br />
                <label htmlFor="branch">Branch: </label>
                <input type="text" id="branch" name="branch" value={formData.data.branch} onChange={handleChange} required />
                <br />
                <label htmlFor="contact_no">Contact No: </label>
                <input type="number" id="contact_no" name="contactNo" value={formData.data.contactNo} onChange={handleChange} required />
                <br />
              </>
            )}

            {userType === 'technician' && (
              <>
                <label htmlFor="tech_id">Tech ID: </label>
                <input type="text" id="tech_id" name="tech_id" value={formData.data.tech_id} onChange={handleChange} required />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={formData.data.password} onChange={handleChange} required />
                <br />
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={formData.data.name} onChange={handleChange} required />
                <br />
                <label htmlFor="contact_no">Contact No: </label>
                <input type="text" id="contact_no" name="contactNo" value={formData.data.contactNo} onChange={handleChange} required />
                <br />
                <label htmlFor="address">Address: </label>
                <input type="text" id="address" name="address" value={formData.data.address} onChange={handleChange} required />
                <br />
                <label htmlFor="city">City: </label>
                <input type="text" id="city" name="city" value={formData.data.city} onChange={handleChange} required />
                <br />
                <label htmlFor="zip">Zip Code: </label>
                <input type="text" id="zip" name="zip" value={formData.data.zip} onChange={handleChange} required />
                <br />
                <label htmlFor="field">Select Field: </label>
                <select className="custom-select" name="field" id="field" value={formData.data.field} onChange={handleChange} required>
                  <option value="">Select Field</option>
                  <option value="PC">Computers</option>
                  <option value="AC">AC</option>
                  <option value="Projector">Projector</option>
                  <option value="Other">Other</option>
                </select>
                <br />
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" value={formData.data.email} onChange={handleChange} required />
                <br />
              </>
            )}

            {userType === 'admin' && (
              <>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={formData.data.name} onChange={handleChange} required />
                <br />
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" value={formData.data.username} onChange={handleChange} required />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={formData.data.password} onChange={handleChange} required />
                <br />
              </>
            )}


            {userType === 'account_section' && (
              <>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={formData.data.name} onChange={handleChange} required />
                <br />
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" value={formData.data.username} onChange={handleChange} required />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={formData.data.password} onChange={handleChange} required />
                <br />
              </>
            )}

            <br />
            <button
              className="button-82-pushable"
              role="button"
              type="submit"
            >
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">Submit</span>
            </button>
          </form>
        </div>
      </div>

      <Alert show={showAlert} variant="success" style={{ position: 'absolute', top: '400px', height: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Successfully Registered ✔
      </Alert>
    </div>
  );
}
