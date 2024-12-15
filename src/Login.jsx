import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { API_ENDPOINT } from './Api';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, { username, password });
      localStorage.setItem("token", JSON.stringify(response));
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      position: 'relative',
      backgroundImage: 'url("src/assets/facebook-background.jpg")', // Background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'flex-start',  // Align content to the left
      alignItems: 'center',
      color: 'white',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Dark overlay with gradient effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))',
        zIndex: 1
      }}></div>

      <Container style={{
        zIndex: 2, 
        marginTop: '50px', 
        marginLeft: '100px', // Adjust left margin to move the container to the left
        maxWidth: '500px'  // Optionally limit the container width
      }}>
        <Row className="justify-content-start"> {/* Align row items to the left */}
          <Col md={12}>
            <div className="login-form" style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark form background
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'
            }}>
              {/* Custom logo */}
              <div className="login-logo" style={{
                textAlign: 'center',
                marginBottom: '30px',
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#00bcd4' // Teal color for the logo
              }}>
                <span style={{ color: '#00bcd4' }}>Facebook</span>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Control
                    className="form-control-sm rounded-0"
                    type="text"
                    placeholder="Email or Phone"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      padding: '12px',
                      fontSize: '18px',
                      marginBottom: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly darker input background
                      color: 'white',
                      border: '1px solid #444',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Control
                    className="form-control-sm rounded-0"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      padding: '12px',
                      fontSize: '18px',
                      marginBottom: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly darker input background
                      color: 'white',
                      border: '1px solid #444',
                      borderRadius: '8px'
                    }}
                  />
                </Form.Group>

                {error && <p style={{
                  color: 'red',
                  textAlign: 'center',
                  fontSize: '14px',
                  marginBottom: '20px'
                }}>{error}</p>}

                <Form.Group controlId="formButton">
                  <Button
                    variant="primary"
                    className="btn-block bg-custom btn-flat rounded-0"
                    size="lg"
                    type="submit"
                    style={{
                      padding: '15px',
                      fontSize: '18px',
                      width: '100%',
                      backgroundColor: '#00bcd4', // Teal for button
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}
                  >
                    Log In
                  </Button>
                </Form.Group>
              </Form>

              <div className="login-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#bbb' }}>By logging in, you agree to our <a href="/terms" style={{ color: '#00bcd4' }}>Terms of Service</a> and <a href="/privacy" style={{ color: '#00bcd4' }}>Privacy Policy</a></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
