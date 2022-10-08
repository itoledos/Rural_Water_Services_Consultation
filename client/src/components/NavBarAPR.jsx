import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../img/aprLogo.png';

const NavBarAPR = () => {
    return(
        <React.Fragment>
            <Navbar 
                className="d-flex flex-row mt-0 mb-0 align-items-center"
                style={{
                    width: '102%',
                    height: '14%',
                    maxHeight: '100px',
                    position: 'fixed',
                    top: '0',
                    paddingLeft: '15%',
                    fontSize: '1.4em',
                    zIndex: '1000',
                    background: 'linear-gradient(270deg, rgba(151,254,255,1) 0%, rgba(143,206,255,1) 100%)',
                    padding: '4px 10%',
                    boxShadow: '0 2px 5px #777777'
                }} 
            >

                <Navbar.Brand href="/home">
                    <img src={logo} alt='logo' width={'90%'} />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">

                        <Nav.Link href="/home">Principal</Nav.Link>
                        <Nav.Link href="/login">Login Admin</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default NavBarAPR;