import React from 'react'
import Header from '../common/Header'
import { Link } from 'react-router-dom'

export default function Account() {
  return (
    <div>
      <Header />
      <div>
        <h2>Welcome Account!</h2>
        <div className="box">
          <div className="head">
            <h2>Bills</h2>
            <h3>AccNo/Bank</h3>
          </div>

          <div className="complaint">

            <form action="">
              <label htmlFor="">Pending Bills : </label>
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
                    <th>Payment</th>
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
                        <Link to="/acc/pay" className='btn btn-primary'>Pay</Link>
                     </form>
                    </td>

                  </tr>
                </tbody>
              </table>

              <br />

              
              <label htmlFor="">Paid Bills : </label>
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
                    <th>Payment</th>
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
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success">Paid</button>
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

    </div>
  )
}
