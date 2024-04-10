import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import './Technician.css';
import axios from 'axios'; // Import axios for making HTTP requests
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Technician() {
  const [ongoingComplaints, setOngoingComplaints] = useState([]);
  const [acceptedComplaints, setAcceptedComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [totalBill, setTotalBill] = useState(0);
  const [billDescription, setBillDescription] = useState('');
  useEffect(() => {
    getAllComplaints();
  }, []);

  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLogin');
    const user_type = sessionStorage.getItem('user_type');

    if (!isLoggedIn || user_type!=='technician') {
      navigate('/');
    }
  }, [navigate]);


  const getAllComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAllComplaints',{ params: {
        user_type: sessionStorage.getItem('user_type'),
        tech_id : sessionStorage.getItem('userID'),
        tech_type: sessionStorage.getItem('tech_type')
      }});
      const { data } = response.data;
      console.log(data);
      setOngoingComplaints(data.filter(complaint => !complaint.tech_id));
      setAcceptedComplaints(data.filter(complaint => complaint.tech_id && !complaint.resolved_date ));
      // console.log(acceptedComplaints);
      setResolvedComplaints(data.filter(complaint => complaint.tech_id && complaint.resolved_date ));
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleAcceptComplaint = async (token_id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/acceptComplaints', { token_id, tech_id:sessionStorage.getItem("userID"), tech_type:sessionStorage.getItem("tech_type"), user_type: 'technician' });
      // console.log('Complaint accepted:', response.data);
      setShowAlert(true);
      getAllComplaints();
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error('Error accepting complaint:', error);
    }
  };

  const handleResolveComplaint = async (token_id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/resolveComplaints', { tech_id:sessionStorage.getItem('userID'),token_id, tech_type:sessionStorage.getItem('tech_type'), user_type: 'technician', bill_description:billDescription, total_bill : totalBill });
      // console.log('Complaint resolved:', response.data);
      setShowAlert(true);
      getAllComplaints();
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };
  return (
    <div>
      <Header />
      <h2 class="gradient-text_b">Welcome Technician!</h2>
      <div className="box">
        <div className="head">
          <h2 class="gradient-text_b">Handle complaints</h2>
          <h3 class="gradient-text_r">{sessionStorage.getItem("userID")}: {sessionStorage.getItem("name")}</h3>
        </div>

        <div className="complaint">
          <label htmlFor="device" className="text-black">Ongoing Complaints :</label>
          <div className="table-responsive">
          <table className="table table-bordered mb-5">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Student ID</th>
                <th>Device ID</th>
                <th>Description</th>
                <th>Complaint Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ongoingComplaints.map(complaint => (
                <tr key={complaint.token_id}>
                  <td>{complaint.token_id}</td>
                  <td>{complaint.student_id}</td>
                  {/* <td>
            {tech_type === "computer" && <span>{complaint.comp_id}</span>}
            {tech_type === "ac" && <span>{complaint.ac_id}</span>}
            {tech_type === "projectors" && <span>{complaint.proj_id}</span>}
          </td> */}
                  <td>{complaint.device_id}</td>
                  <td>{complaint.description}</td>
                  <td>{new Date(complaint.complaint_date).toISOString().split('T')[0]}</td>
                  <td className="text-center">
                    <button onClick={() => handleAcceptComplaint(complaint.token_id)} className="btn btn-success">Accept</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
          </div>

          <label htmlFor="" className="text-black">Accepted Complaints :</label>
          <div className="table-responsive">
          <table className="table table-bordered mb-5">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Student ID</th>
                <th>Device ID</th>
                <th>Description</th>
                <th>Complaint Date</th>
                <th>Tech ID</th>
                <th>Bill Decription</th>
                <th>Bill Amt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {acceptedComplaints.map(complaint => (
                <tr key={complaint.token_id}>
                  <td>{complaint.token_id}</td>
                  <td>{complaint.student_id}</td>
                  <td>{complaint.device_id}</td>
                  <td>{complaint.description}</td>
                  <td>{new Date(complaint.complaint_date).toISOString().split('T')[0]}</td>
                  <td>{complaint.tech_id}</td>
                  <td><input type="text" name="bill_description" placeholder="Bill Description" value={billDescription} onChange={(e) => setBillDescription(e.target.value)}/></td>
                  <td className="text-center">
                  <td><input type="number" name="total_bill" value={totalBill} onChange={(e) => setTotalBill(parseFloat(e.target.value))}/></td>
                  </td>
                  <td className="text-center">
                    <button onClick={() => handleResolveComplaint(complaint.token_id)} className="btn btn-success">Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <label htmlFor="" className="text-black">Resolved Complaints :</label>
          <div className="table-responsive">
          <table className="table table-bordered mb-5">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Student ID</th>
                <th>Device ID</th>
                <th>Description</th>
                <th>Complaint Date</th>
                <th>Resolved Date</th>
              </tr>
            </thead>
            <tbody>
              {resolvedComplaints.map(complaint => (
                <tr key={complaint.token_id}>
                  <td>{complaint.token_id}</td>
                  <td>{complaint.student_id}</td>
                  <td>{complaint.device_id}</td>
                  <td>{complaint.description}</td>
                  <td>{new Date(complaint.complaint_date).toISOString().split('T')[0]}</td>
                  <td>{new Date(complaint.resolved_date).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
      <Alert show={showAlert} variant="success" style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
        Action completed successfully ✔
      </Alert>
    </div>
  );
}