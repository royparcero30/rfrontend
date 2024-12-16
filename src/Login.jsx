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
      backgroundImage: 'url("src/assets/netflix.jpg.jfif")', // Netflix background
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center', // Centering the login form horizontally
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
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.5))', // Dark gradient overlay
        zIndex: 1
      }}></div>

      <Container style={{
        zIndex: 2,
        maxWidth: '400px', // Limit the width for a more compact form
        padding: '30px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for form
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
      }}>
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="login-form">
              {/* Custom logo */}
              <div className="login-logo" style={{
                textAlign: 'center',
                marginBottom: '30px',
                fontSize: '40px',
                fontWeight: 'bold',
                color: '#e50914', // Netflix red color for logo
              }}>
                <span style={{ color: '#e50914' }}>Netflix</span>
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
                      padding: '15px',
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
                      padding: '15px',
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
                  color: '#ff0a0a', // Bright red for error message
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
                      backgroundColor: '#e50914', // Netflix red for button
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      border: 'none'
                    }}
                  >
                    Log In
                  </Button>
                </Form.Group>
              </Form>

              <div className="login-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#bbb' }}>By logging in, you agree to our <a href="/terms" style={{ color: '#e50914' }}>Terms of Service</a> and <a href="/privacy" style={{ color: '#e50914' }}>Privacy Policy</a></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
