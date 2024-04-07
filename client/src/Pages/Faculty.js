import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useNavigate,
} from "react-router-dom";
// import { Link } from 'react-router-dom';
import axios from "axios";
import Header from "../common/Header";
import "./Faculty.css";

import { Alert } from "react-bootstrap";

export default function Faculty() {
  const [selectedOption, setSelectedOption] = useState("complaint"); // Initial selected option
  const [selectedDeviceType, setSelectedDeviceType] = useState("computer");

  const [unverifiedComplaints, setUnverifiedComplaints] = useState([]);
  const [notAcceptedComplaints, setnotAcceptedComplaints] = useState([]);
  const [acceptedComplaints, setAcceptedComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const [showAlertDel, setShowAlertDel] = useState(false);

  const [comps, setComps] = useState([]);
  const [projectors, setProjectors] = useState([]);
  const [ac, setAc] = useState([]);

  const [student, setStudent] = useState([]);
  const [tech, setTech] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [account_section, setAccount_section] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLogin");
    const user_type = sessionStorage.getItem("user_type");

    if (!isLoggedIn || user_type !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getAllComplaintsAdmin(selectedDeviceType);
  }, [selectedDeviceType]);

  // useEffect(() => {
  //   getAllComplaintsAdmin();
  // }, []);

  useEffect(() => {
    getAllDevices();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  // const getAllComplaintsAdmin = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:4000/api/v1/getAllComplaintsAdmin',{user_type:sessionStorage.getItem('user_type'),device_type});
  //     const { data } = response.data;
  //     // console.log({ data });
  //     setUnverifiedComplaints(data.filter(complaint => !complaint.admin_approval));
  //     setnotAcceptedComplaints(data.filter(complaint => !complaint.tech_id && complaint.admin_approval === 1));
  //     setAcceptedComplaints(data.filter(complaint => complaint.tech_id && !complaint.resolved_date && complaint.admin_approval === 1));
  //     // console.log(acceptedComplaints);
  //     setResolvedComplaints(data.filter(complaint => complaint.tech_id && complaint.resolved_date && complaint.admin_approval === 1));
  //   } catch (error) {
  //     console.error('Error fetching complaints:', error);
  //   }
  // };

  const getAllComplaintsAdmin = async (deviceType) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/getAllComplaintsAdmin",
        {
          params: {
            user_type: sessionStorage.getItem("user_type"),
            device_type: deviceType,
          },
        }
      );
      const { data } = response.data;
      console.log(data);
      setUnverifiedComplaints(
        data.filter((complaint) => !complaint.admin_approval)
      );
      setnotAcceptedComplaints(
        data.filter(
          (complaint) => !complaint.tech_id && complaint.admin_approval === 1
        )
      );
      setAcceptedComplaints(
        data.filter(
          (complaint) =>
            complaint.tech_id &&
            !complaint.resolved_date &&
            complaint.admin_approval === 1
        )
      );
      setResolvedComplaints(
        data.filter(
          (complaint) =>
            complaint.tech_id &&
            complaint.resolved_date &&
            complaint.admin_approval === 1
        )
      );
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleDeviceTypeChange = (deviceType) => {
    setSelectedDeviceType(deviceType);
    console.log(deviceType);
    getAllComplaintsAdmin(deviceType); // Call getAllComplaintsAdmin with the selected device type
  };

  const handleApproveComplaint = async (token_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/approveComplaint",
        {
          token_id: token_id,
          device_type: selectedDeviceType,
          user_type: "admin",
        }
      );
      setShowAlert(true);
      getAllComplaintsAdmin(selectedDeviceType);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error approving complaint:", error);
    }
  };

  const deleteComplaint = async (token_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteComplaint",
        {
          token_id: token_id,
          device_type: selectedDeviceType,
          user_type: sessionStorage.getItem("user_type"),
        }
      );
      setShowAlert(true);
      getAllComplaintsAdmin(selectedDeviceType);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const deleteComp = async (device_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteComp",
        {
          device_id: device_id,
          device_type: "computer",
          user_type: sessionStorage.getItem("user_type"),
        }
      );
      getAllDevices();
      setShowAlertDel(true);
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting Device:", error);
    }
  };

  const deleteProj = async (device_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteProj",
        {
          device_id: device_id,
          device_type: "projector",
          user_type: sessionStorage.getItem("user_type"),
        }
      );
      getAllDevices();
      setShowAlertDel(true);
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting Device:", error);
    }
  };

  const deleteAc = async (device_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteAc",
        {
          device_id: device_id,
          device_type: "ac",
          user_type: sessionStorage.getItem("user_type"),
        }
      );
      getAllDevices();
      setShowAlertDel(true);
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleting Device:", error);
    }
  };

  const getAllDevices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/getAllDevices",
        {
          params: {
            user_type: sessionStorage.getItem("user_type"),
          },
        }
      );
      const { data } = response.data;

      // Process the data accordingly
      const compData = data.filter(
        (device) => device.device_type === "computer"
      );
      const projectorData = data.filter(
        (device) => device.device_type === "projector"
      );
      const acData = data.filter((device) => device.device_type === "ac");

      setComps(compData);
      setProjectors(projectorData);
      setAc(acData);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/getAllUsers"
      );
      const { data } = response.data;

      // console.log("All Users:", { data });
      const student = data.students;
      // console.log(student);
      const tech = data.technicians;
      // console.log(tech);
      const admin = data.admin;
      // console.log(admin);
      const account_section = data.account_section;
      // console.log(account_section);

      //   const studentData = data.filter(user => user.user_type==='student');
      // const techData = data.filter(user => user.user_type==='technician');
      const studentData = student;
      const techData = tech;
      const adminData = admin;
      const account_sectionData = account_section;

      setStudent(studentData);
      setTech(techData);
      setAdmin(adminData);
      setAccount_section(account_sectionData);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const deleteStudent = async (MIS) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteStudent",
        { MIS }
      );
      // console.log('User Deleted:', response.data);
      getAllUsers();
      setShowAlertDel(true);
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleteing User:", error);
    }
  };

  const deleteAcc = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteAcc",
        { username }
      );
      // console.log('User Deleted:', response.data);
      setShowAlertDel(true);
      getAllUsers();
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleteing User:", error);
    }
  };

  const deleteTech = async (tech_id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteTech",
        { tech_id }
      );
      // console.log('User Deleted:', response.data);
      setShowAlertDel(true);
      getAllUsers();
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleteing User:", error);
    }
  };

  const deleteAdmin = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/deleteAdmin",
        { username }
      );
      // console.log('User Deleted:', response.data);
      setShowAlertDel(true);
      getAllUsers();
      setTimeout(() => {
        setShowAlertDel(false);
      }, 4000);
    } catch (error) {
      console.error("Error deleteing User:", error);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Header />

      <div className="options">
        <input
          type="radio"
          id="complaint"
          name="option"
          value="complaint"
          checked={selectedOption === "complaint"}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="complaint" className="subpages text-white">
          Complaint
        </label>

        <input
          type="radio"
          id="device"
          name="option"
          value="device"
          checked={selectedOption === "device"}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="device" className="subpages text-white">
          Device
        </label>

        <input
          type="radio"
          id="staff"
          name="option"
          value="staff"
          checked={selectedOption === "staff"}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="staff" className="subpages text-white">
          Staff
        </label>

        <input
          type="radio"
          id="bills"
          name="option"
          value="bills"
          checked={selectedOption === "bills"}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="bills" className="subpages text-white">
          Bills
        </label>
      </div>

      {selectedOption === "complaint" && (
        <div>
          <h2 class="gradient-text_b">Welcome Faculty!</h2>
          <div className="box">
            <div className="head">
              <h2 class="gradient-text_b">Complaint</h2>
              <h3 class="gradient-text_r">
                {sessionStorage.getItem("userID")}:{" "}
                {sessionStorage.getItem("name")}
              </h3>
            </div>

            <div className="complaint">
              <label htmlFor="" className="text-black">
                Select Device Type:
              </label>
              <select
                onChange={(e) => handleDeviceTypeChange(e.target.value)}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="computer">Computer</option>
                <option value="projector">Projector</option>
                <option value="ac">AC</option>
              </select>

              <form action="">
                <label htmlFor="" className="text-black">
                  Verify Complaints :
                </label>
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
                      {unverifiedComplaints.map((complaint) => (
                        <tr key={complaint.token_id}>
                          <td>{complaint.token_id}</td>
                          <td>{complaint.student_id}</td>
                          <td>{complaint.device_id}</td>
                          <td>{complaint.description}</td>
                          <td>
                            {
                              new Date(complaint.complaint_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="text-center">
                            {/* <button onClick={() => handleApproveComplaint(complaint.token_id)} className="btn btn-success">Accept</button> */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleApproveComplaint(complaint.token_id);
                              }}
                              class="btn btn-success"
                              style={{ marginRight: "10px" }}
                            >
                              Verify
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteComplaint(complaint.token_id);
                              }}
                              type="submit"
                              class="btn btn-danger"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Verified but not accepted Complaints :
                </label>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
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
                      {notAcceptedComplaints.map((complaint) => (
                        <tr key={complaint.token_id}>
                          <td>{complaint.token_id}</td>
                          <td>{complaint.student_id}</td>
                          <td>{complaint.device_id}</td>
                          <td>{complaint.description}</td>
                          <td>
                            {
                              new Date(complaint.complaint_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteComplaint(complaint.token_id);
                              }}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />
                <label htmlFor="device" className="text-black">
                  Accepted and Ongoing Complaints :
                </label>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Token ID</th>
                        <th>Student ID</th>
                        <th>Device ID</th>
                        <th>Description</th>
                        <th>Complaint Date</th>
                        <th>Technician-ID</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {acceptedComplaints.map((complaint) => (
                        <tr key={complaint.token_id}>
                          <td>{complaint.token_id}</td>
                          <td>{complaint.student_id}</td>
                          <td>{complaint.device_id}</td>
                          <td>{complaint.description}</td>
                          <td>
                            {
                              new Date(complaint.complaint_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td>{complaint.tech_id}</td>
                          <td className="text-center">
                            <Link to="/chat" className="btn btn-primary">
                              Chat
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Solved Complaints :{" "}
                </label>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Token ID</th>
                        <th>Student ID</th>
                        <th>Device ID</th>
                        <th>Description</th>
                        <th>Complaint Date</th>
                        <th>Resolved Date</th>
                        <th>Technician-ID</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resolvedComplaints.map((complaint) => (
                        <tr key={complaint.token_id}>
                          <td>{complaint.token_id}</td>
                          <td>{complaint.student_id}</td>
                          <td>{complaint.device_id}</td>
                          <td>{complaint.description}</td>
                          <td>
                            {
                              new Date(complaint.complaint_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td>
                            {
                              new Date(complaint.resolved_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td>{complaint.tech_id}</td>
                          <td className="text-center">
                            <Link to="/chat" className="btn btn-primary">
                              Chat
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <br />
              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      {selectedOption === "device" && (
        <div>
          <h2 class="gradient-text_b">Welcome Faculty!</h2>
          <div className="box">
            <div className="head">
              <h2 class="gradient-text_b">Devices</h2>
              <h3 class="gradient-text_r">
                {sessionStorage.getItem("userID")}:{" "}
                {sessionStorage.getItem("name")}
              </h3>
            </div>

            <div className="complaint">
              <form action="">
                <label htmlFor="" className="text-black">
                  Computers :
                </label>
                <Link
                  to="/adddevices"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Deivce-ID</th>
                        <th>Model-ID(Too much other info acc to data)</th>
                        <th>Room-ID(Dept?)</th>
                        <th>Company</th>
                        <th>DOI</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Map over the comps array to render computer devices */}
                      {comps.map((device) => (
                        <tr key={device.device_id}>
                          <td>{device.device_id}</td>
                          <td>{device.model_id}</td>
                          <td>{device.Room_id}</td>
                          <td>{device.Company}</td>
                          <td>
                            {new Date(device.DOI).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                          <td>{device.status}</td>
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteComp(device.device_id);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Projectors :
                </label>
                <Link
                  to="/adddevices"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Deivce-ID</th>
                        <th>Model-ID(Too much other info acc to data)</th>
                        <th>Room-ID(Dept?)</th>
                        <th>Company</th>
                        <th>DOI</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectors.map((device) => (
                        <tr key={device.device_id}>
                          <td>{device.device_id}</td>
                          <td>{device.model_id}</td>
                          <td>{device.Room_id}</td>
                          <td>{device.Company}</td>
                          <td>
                            {new Date(device.DOI).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                          <td>{device.status}</td>
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteProj(device.device_id);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="device" className="text-black">
                  AC :
                </label>
                <Link
                  to="/adddevices"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Deivce-ID</th>
                        <th>Model-ID(Too much other info acc to data)</th>
                        <th>Room-ID(Dept?)</th>
                        <th>Company</th>
                        <th>DOI</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ac.map((device) => (
                        <tr key={device.device_id}>
                          <td>{device.device_id}</td>
                          <td>{device.model_id}</td>
                          <td>{device.Room_id}</td>
                          <td>{device.Company}</td>
                          <td>
                            {new Date(device.DOI).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                          <td>{device.status}</td>
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteAc(device.device_id);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />
              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      {selectedOption === "staff" && (
        <div>
          <h2 class="gradient-text_b">Welcome Faculty!</h2>
          <div className="box">
            <div className="head">
              <h2 class="gradient-text_b">Staff</h2>
              <h3 class="gradient-text_r">
                {sessionStorage.getItem("userID")}:{" "}
                {sessionStorage.getItem("name")}
              </h3>
            </div>

            <div className="complaint">
              <form action="">
                <label htmlFor="" className="text-black">
                  Students :
                </label>
                <Link
                  to="/addstaff"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>MIS/ID</th>
                        <th>Name/Uname</th>
                        <th>Password</th>
                        <th>Branch</th>
                        <th>Contact No</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.map((staffMember) => (
                        <tr key={staffMember.MIS}>
                          <td>{staffMember.MIS}</td>
                          <td>{staffMember.name}</td>
                          <td>{staffMember.password}</td>
                          <td>{staffMember.branch}</td>
                          <td>{staffMember.contact_no}</td>
                          {/* Add more columns if needed */}
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteStudent(staffMember.MIS);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Technicians :
                </label>
                <Link
                  to="/addstaff"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>TECH-ID</th>
                        <th>Name/Uname</th>
                        <th>Password</th>
                        <th>Contact No</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Zip</th>
                        <th>Field</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tech.map((technician) => (
                        <tr key={technician.MIS}>
                          <td>{technician.MIS}</td>
                          <td>{technician.name}</td>
                          <td>{technician.password}</td>
                          <td>{technician.contact_no}</td>
                          <td>{technician.address}</td>
                          <td>{technician.city}</td>
                          <td>{technician.zip}</td>
                          <td>{technician.field}</td>
                          {/* Add more columns if needed */}
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteTech(technician.MIS);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Faculty/Admin :
                </label>
                <Link
                  to="/addstaff"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Uname</th>
                        <th>Name</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admin.map((admin) => (
                        <tr key={admin.MIS}>
                          <td>{admin.MIS}</td>
                          <td>{admin.name}</td>
                          <td>{admin.password}</td>
                          {/* Add more columns if needed */}
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteAdmin(admin.MIS);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Account Section : (Not in db)
                </label>
                <Link
                  to="/addstaff"
                  style={{ marginLeft: "30px" }}
                  className="btn btn-primary"
                >
                  Add
                </Link>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Bank</th>
                        <th>Account-No</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {account_section.map((Acc) => (
                        <tr key={Acc.MIS}>
                          <td>{Acc.MIS}</td>
                          <td>{Acc.name}</td>
                          <td>{Acc.password}</td>
                          {/* Add more columns if needed */}
                          <td className="text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteAcc(Acc.MIS);
                              }}
                              type="submit"
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />
              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      {selectedOption === "bills" && (
        <div>
          <h2 class="gradient-text_b">Welcome Faculty!</h2>
          <div className="box">
            <div className="head">
              <h2 class="gradient-text_b">Bills</h2>
              <h3 class="gradient-text_r">
                {sessionStorage.getItem("userID")}:{" "}
                {sessionStorage.getItem("name")}
              </h3>
            </div>

            <div className="complaint">
              <form action="">
                <label htmlFor="" className="text-black">
                  Solved complaints :
                </label>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Token ID</th>
                        <th>Student ID</th>
                        <th>Device ID</th>
                        <th>Description</th>
                        <th>Complaint Date</th>
                        <th>Resolved Date</th>
                        <th>Technician-ID</th>
                        <th>Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resolvedComplaints.map((complaint) => (
                        <tr key={complaint.token_id}>
                          <td>{complaint.token_id}</td>
                          <td>{complaint.student_id}</td>
                          <td>{complaint.device_id}</td>
                          <td>{complaint.description}</td>
                          <td>
                            {
                              new Date(complaint.complaint_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td>
                            {
                              new Date(complaint.resolved_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td>{complaint.tech_id}</td>
                          <td style={{ color: "blue" }}>
                            <strong>For payment contact Acc Section</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <br />

                <label htmlFor="" className="text-black">
                  Verified but Pending Bills :
                </label>

                <br />
                <label htmlFor="device" className="text-black">
                  Paid Bills :
                </label>
                <div className="table-responsive">
                  <table class="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th>Token ID</th>
                        <th>Student ID</th>
                        <th>Device ID</th>
                        <th>Description</th>
                        <th>Complaint Date</th>
                        <th>Technician-ID</th>
                        <th>Paid</th>
                      </tr>
                    </thead>
                  </table>
                </div>

                <br />
              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      <Alert
        show={showAlertDel}
        variant="danger"
        style={{
          position: "fixed", // Change to fixed
          bottom: "500px", // Adjust bottom distance as needed
          height: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "9999",
        }}
      >
        DELETED X
      </Alert>
    </div>
  );
}
