import React, { useState } from 'react';
import Header from '../../common/Header';
import {Link} from 'react-router-dom'

export default function AddDevices() {
  const [deviceType, setDeviceType] = useState('PC'); // Default to PC

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
          <h2>ADD DEVICES</h2>
          <h4>Fac-ID</h4>
        </div>

        <div className="complaint">
          <form action="">
            <label htmlFor="deviceType">Device type: </label>
            <br />
            <select
              className="custom-select"
              name="deviceType"
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <option value="PC">Computers</option>
              <option value="AC">AC</option>
              <option value="Projector">Projector</option>
              <option value="Other">Other</option>
            </select>
            <br />

            {/* Dynamically change label based on selected device type */}
            <label htmlFor="deviceId">{`${deviceType} ID: `}</label>
            <input type="number" id="deviceId" />
            <br />

            <label htmlFor="modelId">Model ID: </label>
            <input type="number" id="modelId" />
            <br />
            <label htmlFor="roomId">Room ID: </label>
            <input type="number" id="roomId" />
            <br />
            <label htmlFor="company">Company: </label>
            <input type="text" id="company" />
            <br />
            <label htmlFor="DOI">DOI: </label>
            <input type="date" id="DOI" />
            <br />
            <label htmlFor="status">Status: </label>
            <select className="custom-select" name="status" id="status">
              <option value="Working">Working</option>
              <option value="Not Working">Not Working</option>
            </select>
            <br />
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
