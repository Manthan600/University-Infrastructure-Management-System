import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstitution,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Navigate to home page
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div sticky="top">
      <Navbar expand="lg" className="navbar" variant="dark" sticky="top">
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="text-white" />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="text-white hamburger-icon"
              />
            )}
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={isOpen ? "show" : ""}
          >
            <Nav className="me-auto">
              <Nav.Link>
                <Link className="link" to={"/student"}>
                  Student
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to={"/faculty"}>
                  Faculty
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to={"/tech"}>
                  Tech
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to={"/acc"}>
                  Account
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to={"/about"}>
                  AboutUs
                </Link>
              </Nav.Link>
            </Nav>
            <div className="logout-container">
              <button
                className="btn btn-danger d-flex justify-content-center"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
