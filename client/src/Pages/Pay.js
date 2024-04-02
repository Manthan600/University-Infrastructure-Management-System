import React from 'react'
import Header from '../common/Header'
import { Link } from 'react-router-dom'
import qr from '../images/qr.png'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert';

export default function Pay() {
  
  
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div>
      <Header/>
      <h2>Welcome Account!</h2>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to='/acc' className='btn btn-primary'>Back</Link>
      </div>

      <div className="box">
        <div className="head">
          <h2>PAY BILL</h2>
          <h3>Acc</h3>
        </div>

        <div className="complaint">
           
           <div className="qr" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' , height:'300px' }}>
              <img src={qr} alt="qr" />
           </div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button className="btn btn-success" onClick={handleSubmit} >Done</button>
            </div>
            <Alert show={showAlert} variant="success" style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}>
            Successfully Done ✔
          </Alert>
          </div>
        </div>
      </div>
  )
}
