import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import './Student.css';
import axios from 'axios'; // Import axios for making HTTP requests
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Student() {
  const [textareaHeight, setTextareaHeight] = useState(100); // Initial height of 50px
  const [selectedOption, setSelectedOption] = useState('complaint'); // Initial selected option
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorAlert409, setShowErrorAlert409] = useState(false);
  const [showErrorAlert404, setShowErrorAlert404] = useState(false);
  const [showErrorAlert500, setShowErrorAlert500] = useState(false);
  const [ShowErrorAlertOther, setShowErrorAlertOther] = useState(false);

  const [studentComplaints, setStudentComplaints] = useState([]);

  useEffect(() => {
    getStudentComplaints();
  }, []);


  const getStudentComplaints = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/getStudentComplaints', { student_id: sessionStorage.getItem('userID') });
      console.log('Server response:', response.data);

      setStudentComplaints(response.data.data);
    } catch (error) {
      console.error('Error fetching student complaints:', error);
      setShowErrorAlert(true);
    }
  };
  const [formData, setFormData] = useState({
    mis: '',
    device_id: '',
    description: '',
    user_type: '',
    complaint_type: ''
  });

  const navigate = useNavigate();



  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLogin');
    const user_type = sessionStorage.getItem('user_type');

    if (!isLoggedIn || user_type!=='normal') {
      navigate('/');
    }
  }, [navigate]);


  const handleTextareaChange = (event) => {
    const element = event.target;
    const lines = element.value.split('\n').length;
    setTextareaHeight(lines * 40); // Adjust this value as needed

    setFormData(prevState => ({
      ...prevState,
      description: element.value // Update description in formData
    }));
  };



  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/registerComplaints', formData);
      console.log('Server response:', response.data);

      setShowErrorAlert404(false);
      setShowErrorAlert500(false);
      setShowErrorAlert409(false);
      setShowErrorAlertOther(false);
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);



      setFormData({
        userID: '',
        device_id: '',
        description: '',
        user_type: '',
        complaint_type: ''
      });
    } catch (error) {

      if (error.response && error.response.status === 409) {
        setShowAlert(false); // Close the success alert if it's already open
        setShowErrorAlert404(false); // Close the success alert if it's already open
        setShowErrorAlert500(false); // Close the success alert if it's already open
        setShowErrorAlertOther(false); // Close the success alert if it's already open
        setShowErrorAlert409(true); // Show error alert

        setTimeout(() => {
          setShowErrorAlert409(false);
        }, 3000);
      }
      else if (error.response && error.response.status === 500) {
        setShowAlert(false); // Close the success alert if it's already open
        setShowErrorAlert404(false); // Close the success alert if it's already open
        setShowErrorAlert409(false); // Close the success alert if it's already open
        setShowErrorAlertOther(false); // Close the success alert if it's already open
        setShowErrorAlert500(true); // Show error alert

        setTimeout(() => {
          setShowErrorAlert500(false);
        }, 3000);
      } else if (error.response && error.response.status === 404) {
        setShowAlert(false); // Close the success alert if it's already open
        setShowErrorAlert409(false); // Close the success alert if it's already open
        setShowErrorAlert500(false); // Close the success alert if it's already open
        setShowErrorAlertOther(false); // Close the success alert if it's already open
        setShowErrorAlert404(true); // Show error alert


        setTimeout(() => {
          setShowErrorAlert404(false);
        }, 3000);

      } else {
        setShowAlert(false); // Close the success alert if it's already open
        setShowErrorAlert409(false); // Close the success alert if it's already open
        setShowErrorAlert500(false); // Close the success alert if it's already open
        setShowErrorAlertOther(false); // Close the success alert if it's already open
        setShowErrorAlert404(false); // Show error alert
        setShowErrorAlertOther(true); // Show error alert
        console.error('Error submitting data:', error);
        // Handle other types of errors (e.g., network error)
      }

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
          onChange={handleOptionChange && getStudentComplaints(sessionStorage.getItem('userID') )}
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
              <h3> {sessionStorage.getItem("userID")}: {sessionStorage.getItem("name")}</h3>
            </div>



            <div className="complaint">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>MIS:</label>
                  <input className='inp' style={{ border: '0' }} type="text" name="mis" value={formData.userID = sessionStorage.getItem('userID')} onChange={handleChange} />
                </div>
                <div>
                  <label>Device ID:</label>
                  <input className='inp' type="text" name="device_id" value={formData.device_id} onChange={handleChange} />
                </div>
                <div>
                  <label>Description:</label>

                  <textarea
                    name="description"
                    id="description"
                    cols=""
                    rows=""
                    className='description'
                    value={formData.description}
                    style={{ height: `${textareaHeight}px` }}
                    onChange={handleTextareaChange}
                  ></textarea>
                </div>
                <div>
                  <label>User Type:</label>
                  <input className='inp' style={{ border: '0' }} type="text" name="user_type" value={formData.user_type = sessionStorage.getItem('user_type')} onChange={handleChange} />
                </div>
                <div>
                  <label>Complaint Type:</label>
                  {/* <input type="text" name="complaint_type" value={formData.complaint_type} onChange={handleChange} /> */}
                  <select name="complaint_type" value={formData.complaint_type} onChange={handleChange} className="custom-select">
                    <option value="">Select Complaint Type</option>

                    <option value="computer">Computer</option>
                    <option value="projectors">Projectors</option>
                    <option value="ac">AC</option>
                  </select>
                </div>
                <br />
                <br />
                <button class="button-82-pushable" role="button">
                  <span class="button-82-shadow"></span>
                  <span class="button-82-edge"></span>
                  <span class="button-82-front text" onClick={handleSubmit}>
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
              <h3>{sessionStorage.getItem("userID")}: {sessionStorage.getItem("name")}</h3>
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

                </tr>
              </thead>
              <tbody>
              {studentComplaints.map(complaint => (
              <tr key={complaint.token_id}>
                <td>{complaint.token_id}</td>
                <td>{complaint.student_id}</td>
                <td>{complaint.device_id}</td>
                <td>{complaint.description}</td>
                <td>{new Date(complaint.complaint_date).toISOString().split('T')[0]}</td>
<td>{complaint.resolved_date ? new Date(complaint.resolved_date).toISOString().split('T')[0] : '--'}</td>
<td>{complaint.tech_id ? complaint.tech_id : '--'}</td>
              </tr>
            ))}
            </tbody>
            </table>
          </div>


          <div className="foot"></div>

        </div>
      )}

      <Alert show={showAlert} variant="success" style={{ position: 'absolute', top: '400px', height: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Successfully Registered ✔
      </Alert>
      <Alert show={showErrorAlert409} variant="danger" style={{ position: 'absolute', top: '450px', height: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Already Faulty X
      </Alert>
      <Alert show={showErrorAlert500} variant="danger" style={{ position: 'absolute', top: '450px', height: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Internal Server Error X
      </Alert>
      <Alert show={showErrorAlert404} variant="danger" style={{ position: 'absolute', top: '450px', height: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Device Not Found Error X
      </Alert>
      <Alert show={ShowErrorAlertOther} variant="danger" style={{ position: 'absolute', top: '450px', height: '60px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Device Not Found Error X
      </Alert>
    </div>
  );
}
