import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { API_ENDPOINT } from "./Api"; // Make sure your API endpoint is correct

function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'));
                setUser(response.data);
                navigate("/dashboard");
            } catch (error) {
                navigate("/login");
            }
        };
        fetchUser();
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
                username,
                password,
            });

            localStorage.setItem("token", JSON.stringify(response));
            setError('');
            navigate("/dashboard");
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">NET FLIX.</Navbar.Brand>
                </Container>
            </Navbar>

            {/* Background Image & Dark Overlay */}
            <div 
                style={{
                    backgroundImage: 'url("https://as1.ftcdn.net/v2/jpg/04/81/76/22/1000_F_481762281_Xcvl3QsGh1pBMvQuyKIoIqq8aYksXEwX.jpg")', // Add your background image URL here
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                {/* Dark overlay */}
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.5)', // Dark overlay
                    }}
                >
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md={4}>
                                <div className="login-form" style={{ position: 'relative', zIndex: 1 }}>
                                    <center style={{ marginBottom: '20px' }}>
                                        NETFLIX LOG IN REGISTER
                                    </center>

                                    <div className="card">
                                        <div className="card-body login-card-body">
                                            <Form onSubmit={handleSubmit}>
                                                <Form.Group controlId="formUsername">
                                                    <Form.Label>Username:</Form.Label>
                                                    <Form.Control 
                                                        className='form-control-sm rounded-0' 
                                                        type="text" 
                                                        placeholder="Enter Username" 
                                                        value={username} 
                                                        onChange={(e) => setUsername(e.target.value)} 
                                                        required 
                                                    />
                                                </Form.Group><br />

                                                <Form.Group controlId="formPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control 
                                                        className='form-control-sm rounded-0' 
                                                        type="password" 
                                                        placeholder="Enter Password" 
                                                        value={password} 
                                                        onChange={(e) => setPassword(e.target.value)} 
                                                        required 
                                                    />
                                                </Form.Group><br />

                                                <Form.Group controlId="formButton">
                                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                                    <Button variant="danger" className="btn btn-block btn-flat rounded-0" size="sm" block="block" type="submit">
                                                        Log in Now
                                                    </Button>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Login;
