import React from 'react'
import Header from '../common/Header'
import './Technician.css';

export default function Technician() {
  return (
    <div>
      <Header />
      <h2>Welcome Technician!</h2>

      <div className="box">
        <div className="head">
          <h2>Handle complaints</h2>
          <h4>Technician-ID</h4>
        </div>

        <div className="complaint">
          <form action="">
            <label htmlFor="device">Ongoing Complaints :</label>
            <table class="table table-bordered mb-5" >
              <thead >
                <tr>
                  <th>Token ID</th>
                  <th>Student ID</th>
                  <th>Device ID</th>
                  <th>Description</th>
                  <th>Complaint Date</th>
                  <th>Technician-ID</th>
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
                  <td>Tech1</td>
                  <td class="text-center">
                    {/* <form method="POST" action=""> */}
                    <form action="">
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success">Solved?</button>
                    </form>
                  </td>

                </tr>
              </tbody>
            </table>

            <br />



            <label htmlFor="">Accept Complaints :</label>
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
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success">Accept</button>
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
                  <td>Tech1</td>
                  <td class="text-center">
                    {/* <form method="POST" action=""> */}
                    <form action="">
                      <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success">???</button>
                    </form>
                  </td>

                </tr>
              </tbody>
            </table>
            <br />

          </form>
        </div>
      </div>
    </div>
  )
}
