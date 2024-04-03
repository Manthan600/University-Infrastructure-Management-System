import React, { useState } from 'react';
import Header from '../../common/Header';
import { Link } from 'react-router-dom';

export default function UpdateStaff() {
  const [userType, setUserType] = useState('student'); // Default to student

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <h2>Update Staff</h2>
          <h4>Fac-ID</h4>
        </div>

        <div className="complaint">
          <form action="">
            <label htmlFor="userType">User type: </label>
            <br />
            <select
              className="custom-select"
              name="userType"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="technician">Technician</option>
              <option value="admin">Admin/Faculty</option>
              <option value="Acc section">Acc Section</option>
            </select>
            <br />

            {/* Conditional rendering based on userType */}
            {userType === 'student' && (
              <>
                <label htmlFor="MIS">MIS: </label>
                <input type="text" id="MIS" />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
                <br />
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" />
                <br />
                <label htmlFor="branch">Branch: </label>
                <input type="text" id="branch" />
                <br />
                <label htmlFor="contactNo">Contact No: </label>
                <input type="text" id="contactNo" />
                <br />
              </>
            )}

            {userType === 'technician' && (
              <>
                <label htmlFor="tech_id">Tech ID: </label>
                <input type="text" id="tech_id" />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
                <br />
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" />
                <br />
                <label htmlFor="contactNo">Contact No: </label>
                <input type="text" id="contactNo" />
                <br />
                <label htmlFor="address">Address: </label>
                <input type="text" id="address" />
                <br />
                <label htmlFor="city">City: </label>
                <input type="text" id="city" />
                <br />
                <label htmlFor="zipCode">Zip Code: </label>
                <input type="text" id="zipCode" />
                <br />
                <label htmlFor="device">Select Device: </label>
                <select className="custom-select" name="device" id="device">
                  <option value="PC">Computers</option>
                  <option value="AC">AC</option>
                  <option value="Projector">Projector</option>
                  <option value="Other">Other</option>
                </select>
                <br />
              </>
            )}

            {userType === 'admin' && (
              <>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" />
                <br />
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" />
                <br />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
                <br />
              </>
            )}

            <br />
            <button
              className="button-82-pushable"
              role="button"
              onClick={handleSubmit}
            >
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
