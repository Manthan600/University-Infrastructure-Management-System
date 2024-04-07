import React, { useState } from "react";
import axios from "axios";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import './login.css'
import AboutUs from "./AboutUs";

import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstitution } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
// import "./Header.css";

const UserLogin = () => {

  const [showImage, setShowImage] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleButtonClick = () => {
    setHideImage(true); // Trigger fade-out animation
    setTimeout(() => {
      setShowImage(false); // Hide image after fade-out animation completes
      setShowLogin(true); // Hide image after fade-out animation completes
    }, 500); // Adjust this value to match the duration of your fade-out animation
  };
 


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/loginUser",
        { username, password }
      );
      // console.log(response.data);
      const userID = response.data.data[0].mis;
      const name = response.data.data[0].name;

      const user_type = response.data.user_type;
     
      // Display login success message for 1 second
      console.log("Login successful");

      // Save mis and name to sessionStorage
      sessionStorage.setItem("userID", userID);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("user_type", user_type);
      sessionStorage.setItem("isLogin", true);


        
      // Navigate to home if user_type is 'normal'
      if (user_type === "normal") {
        navigate("/student");
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      // Handle error, show error message to the user, etc.
    }
  };


  

  return (
    <>

{showImage && (
        <div className={`image ${hideImage ? 'slide-up' : ''}`}>
          <button className="button-29" role='button' onClick={handleButtonClick} >
            Welcome!
          </button>

        </div>
      )}
{showLogin &&
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
          User Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>}
    </>
  );
};

const TechnicianLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/loginTechnician",
        { username, password }
      );
      // console.log(response.data);
      const userID = response.data.data[0].tech_id;
      const name = response.data.data[0].name;
      const user_type = 'technician';
     
      // Display login success message for 1 second
      console.log("Login successful");

      // Save mis, name, and user_type to sessionStorage
      sessionStorage.setItem("userID", userID);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("user_type", user_type);
      sessionStorage.setItem("isLogin", true);

      // Navigate to home if user_type is 'normal'
      if (user_type === "technician") {
        navigate("/tech");
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <>
      <div className="boxxx max-w-md my-auto mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
          Technician Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              type="button"
              onClick={handleLogin}
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


const AccountSection = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/loginAccountSection",
        { username, password }
      );
     // console.log(response.data);
      const userID = response.data.data[0].username;
      const name = response.data.data[0].name;
      const user_type ='accounts';
     
      // Display login success message for 1 second
      console.log("Login successful");

      // Save mis, name, and user_type to sessionStorage
      sessionStorage.setItem("userID", userID);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("user_type", user_type);
      sessionStorage.setItem("isLogin", true);

      // Navigate to home if user_type is 'normal'
      if (user_type === "accounts") {
        navigate("/acc");
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <>
   
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
          Account Section Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const FacultyLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/loginAdmin",
        { username, password }
      );
     // console.log(response.data);
      const userID = response.data.data[0].username;
      const name = response.data.data[0].name;
      const user_type = 'admin';
     
      // Display login success message for 1 second
      console.log("Login successful");

      // Save mis, name, and user_type to sessionStorage
      sessionStorage.setItem("userID", userID);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("user_type", user_type);
      sessionStorage.setItem("isLogin", true);

      // Navigate to home if user_type is 'normal'
      if (user_type === "admin") {
        navigate("/faculty");
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      // Handle error, show error message to the user, etc.
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4 bg-blue-300 shadow-md rounded-md">
        <h2 className="text-4xl text-center font-bold mb-4 mt-10">
        Faculty Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="text-blue-500 hover:underline hover:text-blue-800"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// main function of login component
const Login = () => {
  const [activeLink, setActiveLink] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };



  // Function to toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>

<div sticky="top">
      {/* <Navbar style={{backgroundColor: '#ed8ffd'}}> */}
      <Navbar className="navbar" data-bs-theme="dark" sticky="top">
        <Container>
          <FontAwesomeIcon
            icon={faInstitution}
            className="logo text-danger"
            style={{ height: "25px", marginRight: "20px" }}
          />
          <Navbar.Brand>
            {" "}
            <Link className="navbar-brand" to={"/"}>
              Uni-Infra-Management
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
            <button
                onClick={() => handleLinkClick("user")}
                className={`link ${
                  activeLink === "user" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                User
              </button>
            </Nav.Link>
            <Nav.Link>
            <button
                onClick={() => handleLinkClick("technician")}
                className={`link ml-5 ${
                  activeLink === "technician" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                Technician
              </button>
            </Nav.Link>
            <button
                onClick={() => handleLinkClick("account")}
                className={`link ml-5 ${
                  activeLink === "account" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                Account Section
              </button>
              <button
                onClick={() => handleLinkClick("faculty")}
                className={`link ml-5 ${
                  activeLink === "faculty" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                Faculty
              </button>
              <button
                onClick={() => navigate('/about')}
                className={`link ml-5 ${
                  activeLink === "faculty" && "underline"
                } hover:text-pink-600 transition-all duration-300`}
              >
                AboutUs
              </button>
          </Nav>

          </Container>
      </Navbar>
    </div>
     
      {/* Responsive menu for small screens */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 p-4">
          <button
            onClick={() => handleLinkClick("user")}
            className={`block text-white mb-2 ${
              activeLink === "user" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            User
          </button>
          <button
            onClick={() => handleLinkClick("technician")}
            className={`block text-white mb-2 ${
              activeLink === "technician" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            Technician
          </button>
          <button
            onClick={() => handleLinkClick("account")}
            className={`block text-white mb-2 ${
              activeLink === "account" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            Account Section
          </button>
          <button
            onClick={() => handleLinkClick("faculty")}
            className={`block text-white mb-2 ${
              activeLink === "faculty" && "underline"
            } hover:text-pink-600 transition-all duration-300`}
          >
            Faculty
          </button>
        </div>
      )}
      {/* here based on selected user component is displayed */}
      <div className="container  m-0 p-0">
        {activeLink === "user" && <UserLogin />}
        {activeLink === "technician" && <TechnicianLogin />}
        {activeLink === "account" && <AccountSection />}
        {activeLink === "faculty" && <FacultyLogin />}
      </div>
    </>
  );
};

export default Login;

