import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstitution } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const location = useLocation();

    return (
        <Navbar className='navbar' data-bs-theme="dark">
            <Container>
                <FontAwesomeIcon icon={faInstitution} className="logo text-danger" style={{ height: '25px', marginRight: '20px' }} />
                <Navbar.Brand><Link className='navbar-brand' to={'/'}>Uni-Infra-Management</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link><Link className={location.pathname === '/student' ? 'link active' : 'link'} to={'/student'}>Student</Link></Nav.Link>
                    <Nav.Link><Link className={location.pathname === '/faculty' ? 'link active' : 'link'} to={'/faculty'}>Faculty</Link></Nav.Link>
                    <Nav.Link><Link className={location.pathname === '/tech' ? 'link active' : 'link'} to={'/tech'}>Tech</Link></Nav.Link>
                    <Nav.Link><Link className={location.pathname === '/acc' ? 'link active' : 'link'} to={'/acc'}>Account</Link></Nav.Link>
                    <Nav.Link><Link className={location.pathname === '/about' ? 'link active' : 'link'} to={'/about'}>AboutUs</Link></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

