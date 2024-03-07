import React, { useState } from 'react';
import Header from '../common/Header';
import './Student.css';

export default function Student() {
  const [textareaHeight, setTextareaHeight] = useState(50); // Initial height of 50px
  const [selectedOption, setSelectedOption] = useState('complaint'); // Initial selected option

  const handleTextareaChange = (event) => {
    const element = event.target;
    const lines = element.value.split('\n').length;
    setTextareaHeight(lines * 40); // Adjust this value as needed
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Header />

      <div className='options'>
        <input
          type="radio"
          id="complaint"
          name="option"
          value="complaint"
          checked={selectedOption === 'complaint'}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label className='subpages' htmlFor="complaint">Complaint</label>

        <input
          type="radio"
          id="status"
          name="option"
          value="status"
          checked={selectedOption === 'status'}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label className='subpages' htmlFor="status">Check Status</label>
      </div>


      {selectedOption === 'complaint' && (
        <div>
          <h2>Welcome Student!</h2>
          <div className="box">
            <div className="head">
              <h2>Make a complaint</h2>
              <h4>MIS : Name/Username</h4>
            </div>

            <div className="complaint">
              <form action="">
                <label htmlFor="device">Device type : </label>
                <br />
                <select className="custom-select" name="device" id="device">
                  <option value="PC">Computers</option>
                  <option value="AC">AC</option>
                  <option value="Projector">Projector</option>
                  <option value="Other">Other</option>
                </select>
                <br />
                <label htmlFor="">Device ID : </label>
                {/* <h3>DEVICE123</h3> */}
                <p className='dev'>DEVICE123</p>
                <br />
                <label htmlFor="">Description of problem : </label>
                <br />
                <textarea
                  name="description"
                  id="description"
                  cols=""
                  rows=""
                  style={{ height: `${textareaHeight}px` }}
                  onChange={handleTextareaChange}
                ></textarea>
                <br />

                <button class="button-82-pushable" role="button">
                  <span class="button-82-shadow"></span>
                  <span class="button-82-edge"></span>
                  <span class="button-82-front text">
                    Submit
                  </span>
                </button>


              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      {selectedOption === 'status' && (
        <div>
          <h2>Welcome Student!</h2>

          <div className="box">
            <div className="head">
              <h2>Check Status</h2>
              <h4>MIS : Name/Username</h4>
            </div>
            <table class="table table-bordered mb-5" >
              <thead >
                <tr>
                  <th>Token ID</th>
                  <th>Student ID</th>
                  <th>Device ID</th>
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Resolved Date</th>
                  <th>Technician-ID</th>
                  <th>Resolved</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>1</td>
                  <td>12345</td>
                  <td>dev1</td>
                  <td>complaint</td>
                  <td>1/1/2024</td>
                  <td>-</td>
                  <td>Tech1</td>
                  <td class="text-center">
                    <input type="checkbox" />
                  </td>

                </tr>
              </tbody>
            </table>
          </div>


          <div className="foot"></div>

        </div>
      )}
    </div>
  );
}
