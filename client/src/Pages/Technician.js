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
  
  const [paidBills, setPaidBills] = useState([]);
  const [unpaidBills, setUnaidBills] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [billDescription, setBillDescription] = useState('');
  useEffect(() => {
    getAllComplaints();
    getAllBillsStatus();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLogin');
    const user_type = sessionStorage.getItem('user_type');

    if (!isLoggedIn || user_type !== 'technician') {
      navigate('/');
    }
  }, [navigate]);


  const getAllBillsStatus = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/getAllBillsStatus', {
        
          user_type: sessionStorage.getItem('user_type'),
          tech_id: sessionStorage.getItem('userID'),
        
      });
      const { data } = response.data;
      setPaidBills(data.filter(bill => bill.acc_sec_approval=== 1  && bill.admin_approval=== 1));
      console.log("bills : ",(paidBills));
   
      } catch (error) {
      console.error('Error fetching bill status:', error);
    }
  };


  const getAllComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAllComplaints', {
        params: {
          user_type: sessionStorage.getItem('user_type'),
          tech_id: sessionStorage.getItem('userID'),
          tech_type: sessionStorage.getItem('tech_type')
        }
      });
      const { data } = response.data;
      // console.log(data);
      setOngoingComplaints(data.filter(complaint => !complaint.tech_id));
      setAcceptedComplaints(data.filter(complaint => complaint.tech_id && !complaint.resolved_date));
      // console.log(acceptedComplaints);
      setResolvedComplaints(data.filter(complaint => complaint.tech_id && complaint.resolved_date));
      
      // setBillStatus(data.filter(complaint => complaint.admin_approval));
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleAcceptComplaint = async (token_id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/acceptComplaints', { token_id, tech_id: sessionStorage.getItem("userID"), tech_type: sessionStorage.getItem("tech_type"), user_type: 'technician' });
      // console.log('Complaint accepted:', response.data);
      setShowAlert(true);
      getAllComplaints();
      
      getAllBillsStatus();
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error('Error accepting complaint:', error);
    }
  };

  const handleResolveComplaint = async (token_id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/resolveComplaints', { tech_id: sessionStorage.getItem('userID'), token_id, tech_type: sessionStorage.getItem('tech_type'), user_type: 'technician', bill_description: billDescriptions[token_id], total_bill:  totalBills[token_id] });
      // console.log('Complaint resolved:', response.data);
      console.log(billDescription , totalBill);
      setShowAlert(true);
      getAllComplaints();
      
    getAllBillsStatus();
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };

  // Define state variables for bill description and total bill for each complaint
  const [billDescriptions, setBillDescriptions] = useState({});
  const [totalBills, setTotalBills] = useState({});


  const handleBillDescriptionChange = (e, tokenId) => {
    const { value } = e.target;
    console.log("New bill description:", value);
    setBillDescriptions(prevState => ({
      ...prevState,
      [tokenId]: value
    }));
  };
  
  const handleTotalBillChange = (e, tokenId) => {
    const { value } = e.target;
    console.log("New total bill:", value);
    setTotalBills(prevState => ({
      ...prevState,
      [tokenId]: parseFloat(value)
    }));
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
                    {/* <td><input type="text" name={`bill_description_${complaint.token_id}`} placeholder="Bill Description" value={billDescriptions[complaint.token_id] || ''} onChange={(e) => handleBillDescriptionChange(e, complaint.token_id)} /></td>
                    <td className="text-center">
                      <input type="number" name={`total_bill_${complaint.token_id}`} value={totalBills[complaint.token_id] || 0} onChange={(e) => handleTotalBillChange(e, complaint.token_id)} />
                    </td> */}
                  <td> <input
  type="text"
  name={`bill_description_${complaint.token_id}`}
  placeholder="Bill Description"
  value={billDescriptions[complaint.token_id]}
  onChange={(e) => handleBillDescriptionChange(e, complaint.token_id)}
/>
                  </td>
                  <td>

                  <input
  type="number"
  name={`total_bill_${complaint.token_id}`}
  value={totalBills[complaint.token_id]}
  onChange={(e) => handleTotalBillChange(e, complaint.token_id)}
/>
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
                  <th>Payment Status</th>
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
                    {/* <td>{complaint.description}</td> */}
                    <td>
                    {paidBills.some(bill => bill.token_id === complaint.token_id && bill.acc_sec_approval ===1 && bill.admin_approval===1) ? 'Paid' : 'Not Paid'}
                    </td>
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