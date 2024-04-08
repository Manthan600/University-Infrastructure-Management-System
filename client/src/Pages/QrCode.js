import React, {  useEffect } from "react";

import Header from '../common/Header';
import './Chat.css'; // Import the CSS file for Chat component styling
import {useNavigate ,useParams } from 'react-router-dom';

export default function QrCode() {
    const { device_id, device_type } = useParams();
    sessionStorage.setItem("QRdevice_id",device_id);
    sessionStorage.setItem("QRdevice_type",device_type);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("isLogin");
        const user_type = sessionStorage.getItem("user_type");
    
        if (!isLoggedIn || user_type !== "normal") {
          navigate("/");
        }
        else{
            navigate("/student");
        }
      }, [navigate]);
  return (
    <>
      <Header />
    </>
  );
}
