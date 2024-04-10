import React, { useState } from "react";
import axios from "axios";
import "./login.css";

import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstitution } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../common/Header.css";

const UserLogin = ({ userType }) => {
  const [showImage, setShowImage] = useState(true);
  const [hideImage, setHideImage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setErrorMsg("");
    setHideImage(true); // Trigger fade-out animation
    setTimeout(() => {
      setShowImage(false); // Hide image after fade-out animation completes
      setShowLogin(true); // Hide image after fade-out animation completes
    }, 500); // Adjust this value to match the duration of your fade-out animation
  };
  const smartLogin = async (path, username, password) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/${path}`,
        { username, password }
      );
      // console.log(response.data);

      const name = response.data.data[0].name;
      const user_type = response.data.user_type;

      console.log("Login successful");

      // Save mis and name to sessionStorage
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("user_type", user_type);
      sessionStorage.setItem("isLogin", true);
      let userID;
      // Navigate to home if user_type is 'normal'
      if (user_type === "normal") {
        userID = response.data.data[0].mis;
        sessionStorage.setItem("userID", userID);
        sessionStorage.setItem("user_type", user_type);
        navigate("/student");
      } else if (user_type === "admin") {
        userID = response.data.data[0].username;
        sessionStorage.setItem("userID", userID);
        sessionStorage.setItem("user_type", user_type);
        navigate("/faculty");
      } else if (user_type === "technician") {
        userID = response.data.data[0].tech_id;
        let tech_type = response.data.data[0].field;
        sessionStorage.setItem("userID", userID);
        sessionStorage.setItem("tech_type", tech_type);
        sessionStorage.setItem("user_type", user_type);
        navigate("/tech");
      } else if (user_type === "accounts") {
        userID = response.data.data[0].username;
        sessionStorage.setItem("userID", userID);
        sessionStorage.setItem("user_type", user_type);
        navigate("/acc");
      }
    } catch (error) {
      console.error("Login error:", error.response.data.error);
      setErrorMsg(error.response.data.error);
      // Handle error, show error message to the user, etc.
    }
  };
  const handleLogin = async () => {
    setErrorMsg("");
    switch (userType) {
      case "user":
        smartLogin("loginUser", username, password);
        break;
      case "technician":
        smartLogin("loginTechnician", username, password);
        break;
      case "account":
        smartLogin("loginAccountSection", username, password);
        break;
      case "faculty":
        smartLogin("loginAdmin", username, password);
        break;
      default:
        smartLogin("loginUser", username, password);
        break;
    }
    console.log(userType);
  };

  return (
    <>
      <div className="login-container">
        {showImage && (
          <div className={`image ${hideImage ? "slide-up" : ""}`}>
            <button
              className="button-29"
              role="button"
              onClick={handleButtonClick}
            >
              Welcome back {userType}!
            </button>
          </div>
        )}
        {showLogin && (
          <div
            className="container-fluid h-custom"
            style={{ marginTop: "4rem" }}
          >
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5 d-flex justify-content-center">
                {/* <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              /> */}

                <div className="embed-responsive embed-responsive-4by3 d-flex justify-content-center">
                  <iframe
                    id="myiframe"
                    className="embed-responsive-item"
                    src="https://lottie.host/embed/3ce855b8-e242-419d-a029-2e778db903e9/1N4OVze4bW.json"
                    title="Responsive iframe"
                    allowFullScreen
                  />
                </div>
              </div>
              <div class="input_form" className="col-md-10 col-lg-8 col-xl-6 offset-xl-1">
                <h2 className="text-3xl text-center font-bold mt-0 p-0 text-red-500">
                  {userType} Login
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-900">
                      Username
                    </label>
                    <input
                      type="text"
                      className="mt-1 p-0 w-full border rounded-md form-control form-control-lg"
                      style={{padding: "0.5rem"}}
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
                      className="mt-1 p-0 w-full border rounded-md form-control form-control-lg"
                      style={{padding: "0.5rem"}}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* adding error messge */}
                  {errorMsg && (
                    <p className="text-red-500 text-xs italic">{errorMsg}</p>
                  )}

                  <div className="flex items-center justify-center mt-6">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="btn btn-primary btn-lg px-6 py-2 rounded-md hover:bg-green-900 transition-all duration-300"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Login = () => {
  const [activeLink, setActiveLink] = useState("user");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setExpanded(false); // Collapse the navbar after selecting an option
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar"
        variant="dark"
        sticky="top"
        expanded={expanded}
      >
        <Container>
          <FontAwesomeIcon
            icon={faInstitution}
            className="logo text-danger"
            style={{ height: "25px", marginRight: "20px" }}
          />
          <Navbar.Brand>
            <Link className="navbar-brand" to={"/"}>
              Uni-Infra-Management
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="responsive-navbar-nav">
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
              <Nav.Link>
                <button
                  onClick={() => handleLinkClick("account")}
                  className={`link ml-5 ${
                    activeLink === "account" && "underline"
                  } hover:text-pink-600 transition-all duration-300`}
                >
                  Account Section
                </button>
              </Nav.Link>
              <Nav.Link>
                <button
                  onClick={() => handleLinkClick("faculty")}
                  className={`link ml-5 ${
                    activeLink === "faculty" && "underline"
                  } hover:text-pink-600 transition-all duration-300`}
                >
                  Faculty
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container m-0 p-0">
        {<UserLogin userType={activeLink} />}
      </div>
    </>
  );
};

export default Login;
