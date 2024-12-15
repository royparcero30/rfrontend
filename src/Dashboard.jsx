import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { API_ENDPOINT } from './Api';

function Dashboard() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecodeUserID = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'))
                setUser(response.data);

                const decode_token = jwtDecode(response.data.token);
                setUser(decode_token);

            } catch (error) {
                navigate("/login");
            }
        };

        fetchDecodeUserID();
    }, []);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
        <Navbar bg="dark" variant="dark" style={{ backgroundColor: '#141414' }}>

            <Container>
                <Navbar.Brand href="home">Naga College Foundation, Inc.</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#users">Users</Nav.Link>
                    <Nav.Link href="#departments">Departments</Nav.Link>
                    <Nav.Link href="#courses">Courses</Nav.Link>
                </Nav>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title={user ? `User: ${user.username}` : 'Dropdown'} id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        {/* Set background color of the main page */}
        <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: 'white' }}>
            {/* Page content goes here */}
        </div>
        </>
    );
}

export default Dashboard;
