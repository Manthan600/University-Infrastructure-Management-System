import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstitution } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import './Header.css'



export default function Header() {
    
    return (
        <div sticky="top">
            {/* <Navbar style={{backgroundColor: '#ed8ffd'}}> */}
            <Navbar className='navbar'  data-bs-theme="dark" sticky="top">
                <Container>
                    <FontAwesomeIcon icon={faInstitution} className="logo text-danger" style={{height:'25px' , marginRight :'20px'}} />
                    <Navbar.Brand > <Link className='navbar-brand'  to={'/'}>Uni-Infra-Management</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link ><Link className='link'  to={'/student'}>Student</Link></Nav.Link>
                        <Nav.Link  ><Link className='link' to={'/faculty'}>Faculty</Link></Nav.Link>
                        <Nav.Link ><Link className='link' to={'/tech'}>Tech</Link></Nav.Link>
                        <Nav.Link ><Link className='link' to={'/acc'}>Account</Link></Nav.Link>
                        <Nav.Link ><Link className='link' to={'/about'}>AboutUs</Link></Nav.Link>
                    </Nav>

              

                </Container>
            </Navbar>

        </div>
    )
}
