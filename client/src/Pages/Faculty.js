import React, { useState } from 'react';
import Header from '../common/Header';
import './Faculty.css';

export default function Faculty() {
  const [selectedOption, setSelectedOption] = useState('complaint'); // Initial selected option

  
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
        <label htmlFor="complaint" className='subpages'>Complaint</label>

        <input
          type="radio"
          id="device"
          name="option"
          value="device"
          checked={selectedOption === 'device'}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="device" className='subpages'>Device</label>

        <input
          type="radio"
          id="staff"
          name="option"
          value="staff"
          checked={selectedOption === 'staff'}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="staff" className='subpages'>Staff</label>

        <input
          type="radio"
          id="bills"
          name="option"
          value="bills"
          checked={selectedOption === 'bills'}
          onChange={handleOptionChange}
          className="option-button"
        />
        <label htmlFor="bills" className='subpages'>Bills</label>
      </div>

      {selectedOption === 'complaint' && (
        <div>
          <h2>Welcome Faculty/Admin!</h2>
          <div className="box">
            <div className="head">
              <h2>Complaint</h2>
              <h4>Fac-ID</h4>
            </div>

            <div className="complaint">

              <form action="">

                <label htmlFor="">Verify Complaints :</label>
                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>dev1</td>
                      <td>complaint</td>
                      <td>1/1/2024</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success" style={{ marginRight: '10px' }}>Verify</button>
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Reject</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>

                <br />

                <label htmlFor="">Verified but not accepted Complaints :</label>
                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>dev1</td>
                      <td>complaint</td>
                      <td>1/1/2024</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>

                <br />
                <label htmlFor="device">Accepted and Ongoing Complaints :</label>
                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>dev1</td>
                      <td>complaint</td>
                      <td>1/1/2024</td>
                      <td>Tech1</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Chat</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>

                <br />


                <label htmlFor="">Solved Complaints : </label>
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
                      <th>Chat</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>dev1</td>
                      <td>complaint</td>
                      <td>1/1/2024</td>
                      <td>1/1/2025</td>
                      <td>Tech1</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Chat</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>
                <br />

              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      {selectedOption === 'device' && (
        <div>
          <h2>Welcome Faculty/Admin!</h2>
          <div className="box">
            <div className="head">
              <h2>Devices</h2>
              <h4>Fac-ID</h4>
            </div>

            <div className="complaint">

              <form action="">

                <label htmlFor="">Computers :</label>
                <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>R1</td>
                      <td>xyz</td>
                      <td>1/1/2024</td>
                      <td>Working/No</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>

                <br />

                <label htmlFor="">Projectors :</label>
                <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>R1</td>
                      <td>xyz</td>
                      <td>1/1/2024</td>
                      <td>Working/No</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>

                <br />

                <label htmlFor="device">AC :</label>
                <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>R1</td>
                      <td>xyz</td>
                      <td>1/1/2024</td>
                      <td>Working/No</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>


                <label htmlFor="">Other : </label>
                <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

                <table class="table table-bordered mb-5" >
                  <thead >
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

                    <tr>
                      <td>1</td>
                      <td>12345</td>
                      <td>R1</td>
                      <td>xyz</td>
                      <td>1/1/2024</td>
                      <td>Working/No</td>
                      <td class="text-center">
                        {/* <form method="POST" action=""> */}
                        <form action="">
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                          <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                        </form>
                      </td>

                    </tr>
                  </tbody>
                </table>
                <br />

              </form>
            </div>
          </div>

          <div className="foot"></div>
        </div>
      )}

      {selectedOption === 'staff' && (
        <div>
        <h2>Welcome Faculty/Admin!</h2>
        <div className="box">
          <div className="head">
            <h2>Staff</h2>
            <h4>Fac-ID</h4>
          </div>

          <div className="complaint">

            <form action="">

              <label htmlFor="">Students :</label>
              <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

              <table class="table table-bordered mb-5" >
                <thead >
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

                  <tr>
                    <td>12345</td>
                    <td>TonyStark</td>
                    <td>***</td>
                    <td>CS</td>
                    <td>999999</td>
                    <td class="text-center">
                      {/* <form method="POST" action=""> */}
                      <form action="">
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                      </form>
                    </td>

                  </tr>
                </tbody>
              </table>

              <br />

              <label htmlFor="">Technicians :</label>
              <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

              <table class="table table-bordered mb-5" >
                <thead >
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

                  <tr>
                    <td>6846</td>
                    <td>Doraemon</td>
                    <td>***</td>
                    <td>999999</td>
                    <td>addr</td>
                    <td>Pune(need?)</td>
                    <td>?</td>
                    <td>software</td>
                    <td class="text-center">
                      {/* <form method="POST" action=""> */}
                      <form action="">
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                      </form>
                    </td>

                  </tr>
                </tbody>
              </table>

              <br />

              <label htmlFor="">Faculty/Admin :</label>
              <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

              <table class="table table-bordered mb-5" >
                <thead >
                  <tr>
                    <th>Uname</th>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td>Nobita@yz</td>
                    <td>Nobita</td>
                    <td>***</td>
                    <td class="text-center">
                      {/* <form method="POST" action=""> */}
                      <form action="">
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                      </form>
                    </td>

                  </tr>
                </tbody>
              </table>

              <br />



              <label htmlFor="">Account Section : (data fields??)</label>
              <button style={{ marginLeft: '30px' }} onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary">Add</button>

              <table class="table table-bordered mb-5" >
                <thead >
                  <tr>
                    <th>Id</th>
                    <th>Bank</th>
                    <th>Account-No</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td>9</td>
                    <td>zbi@yz</td>
                    <td>zbi789</td>
                    <td>***</td>
                    <td class="text-center">
                      {/* <form method="POST" action=""> */}
                      <form action="">
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-primary" style={{ marginRight: '10px' }}>Update</button>
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                      </form>
                    </td>

                  </tr>
                </tbody>
              </table>

              <br />


          

            </form>
          </div>
        </div>

        <div className="foot"></div>
      </div>
      )}

      {selectedOption === 'bills' && (
      <div>
      <h2>Welcome Faculty/Admin!</h2>
      <div className="box">
        <div className="head">
          <h2>Bills</h2>
          <h4>Fac-ID</h4>
        </div>

        <div className="complaint">

          <form action="">

            <label htmlFor="">Verify Bills :</label>
            <table class="table table-bordered mb-5" >
              <thead >
                <tr>
                  <th>Token ID</th>
                  <th>Student ID</th>
                  <th>Device ID</th>
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Resolved Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>1</td>
                  <td>12345</td>
                  <td>dev1</td>
                  <td>complaint</td>
                  <td>1/1/2024</td>
                  <td>1/1/2025</td>
                  <td class="text-center">
                    {/* <form method="POST" action=""> */}
                    <form action="">
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success" style={{ marginRight: '10px' }}>Verify</button>
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Reject</button>
                    </form>
                  </td>

                </tr>
              </tbody>
            </table>

            <br />

            <label htmlFor="">Verified but Pending Bills :</label>
            <table class="table table-bordered mb-5" >
              <thead >
                <tr>
                  <th>Token ID</th>
                  <th>Student ID</th>
                  <th>Device ID</th>
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Resolved Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>1</td>
                  <td>12345</td>
                  <td>dev1</td>
                  <td>complaint</td>
                  <td>1/1/2024</td>
                  <td>1/1/2025</td>
                  <td class="text-center">
                    {/* <form method="POST" action=""> */}
                    <form action="">
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-danger">Delete</button>
                    </form>
                  </td>

                </tr>
              </tbody>
            </table>

            <br />
            <label htmlFor="device">Paid Bills :</label>
            <table class="table table-bordered mb-5" >
              <thead >
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
              <tbody>

                <tr>
                  <td>1</td>
                  <td>12345</td>
                  <td>dev1</td>
                  <td>complaint</td>
                  <td>1/1/2024</td>
                  <td>Tech1</td>
                  <td class="text-center">
                    {/* <form method="POST" action=""> */}
                    <form action="">
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success">Done</button>
                    </form>
                  </td>

                </tr>
              </tbody>
            </table>

            <br />


            

          </form>
        </div>
      </div>

      <div className="foot"></div>
    </div>

      )}
    </div>
  );
}
