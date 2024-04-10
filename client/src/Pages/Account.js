import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Account() {
  
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [Paidbills, setPaidBills] = useState([]);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLogin');
    const user_type = sessionStorage.getItem('user_type');
    // const bills 
    if (!isLoggedIn || user_type!=='accounts') {
      console.log("unauth");
      navigate('/');
    }
    const fetchBills = async () => {
      try {
        // Fetch data from the server
        console.log("fetching");
        const response = await axios.post("http://localhost:4000/api/v1/getAllBillsAccounts",{
            user_type: sessionStorage.getItem("user_type")
            
        });
        // Set the fetched data to the state
        setBills(response.data.data);
      } catch (error) {
        // Handle error, such as redirecting to login page
        console.log('Error fetching data:', error);
        navigate('/');
      }
    };
    fetchBills();
    const PaidBills = async () => {
      try {
        // Fetch data from the server
        console.log("fetching");
        const response = await axios.post("http://localhost:4000/api/v1/getAllPaidBillsAccounts",{
            user_type: sessionStorage.getItem("user_type")
        });
        // Set the fetched data to the state
        setPaidBills(response.data.data);
      } catch (error) {
        // Handle error, such as redirecting to login page
        console.log('Error fetching data:', error);
        navigate('/');
      }
    };
    PaidBills();
  }, [navigate]);

  const checkoutHandler = async (amount,bill_id) => {
    console.log("in checkout handler");
    const { data: { key } } = await axios.get("http://localhost:4000/api/v1/getkey")

    const { data: { order } } = await axios.post("http://localhost:4000/api/v1/checkout", {
        amount , bill_id
    })

    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "6 Pack Programmer",
        description: "Tutorial of RazorPay",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/v1/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
}

  return (
    <div>
      <Header />
      <div>
        <h2 class="gradient-text_b">Welcome Account!</h2>
        <div className="box">
          <div className="head">
            <h2 class="gradient-text_b">Bills</h2>
            <h3 class="gradient-text_r">AccNo/Bank</h3>
          </div>

          <div className="complaint">

            <form action="">
              <label htmlFor="" className='text-black'>Pending Bills : </label>
              <div className="table-responsive">
              <table class="table table-bordered mb-5" >
                <thead >
                  <tr>
                    <th>Bill ID</th>
                    <th>Technician ID</th>
                    <th>Token ID</th>
                    <th>Device ID</th>
                    <th>Device Type</th>
                    <th>Total Bill</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>

                {bills.map((bill) => (
                      <tr key={bill.bill_id}>
                        <td>{bill.bill_id}</td>
                        <td>{bill.tech_id}</td>
                        <td>{bill.token_id}</td>
                        <td>{bill.device_id}</td>
                        <td>{bill.device_type}</td>
                        <td>{bill.total_bill}</td>

                        <td className="text-center">
                          <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); checkoutHandler(bill.total_bill, bill.bill_id);}}>Pay</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>

              <br />

              
              <label htmlFor="" className='text-black'>Paid Bills : </label>
              <div className="table-responsive">
              <table class="table table-bordered mb-5" >
                <thead >
                <tr>
                    <th>Bill ID</th>
                    <th>Technician ID</th>
                    <th>Token ID</th>
                    <th>Device ID</th>
                    <th>Device Type</th>
                    <th>Total Bill</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>

                {Paidbills.map((bill) => (
                      <tr key={bill.bill_id}>
                        <td>{bill.bill_id}</td>
                        <td>{bill.tech_id}</td>
                        <td>{bill.token_id}</td>
                        <td>{bill.device_id}</td>
                        <td>{bill.device_type}</td>
                        <td>{bill.total_bill}</td>

                        <td className="text-center">
                        <button onClick={(e) => { e.preventDefault() }} type="submit" class="btn btn-success">Paid</button>
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

    </div>
  )
}
