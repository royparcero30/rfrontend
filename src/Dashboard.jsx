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
import { API_ENDPOINT } from './App';
import Swal from 'sweetalert2';
import Modal from "react-bootstrap/Modal";

import backgroundImage from './assets/netflix.jpg.jfif';

function Dashboard () {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'));
                setUser(response.data);

                const decoded_token = jwtDecode(response.data.token);
                setUser(decoded_token);
            } catch (error) {
                navigate("/login");
            }
        };

        fetchDecodedUserID();
    }, []);

    /* LOGOUT */
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    /* DISPLAY USERS */
    const [users, setUsers] = useState([]);
    const userdata = JSON.parse(localStorage.getItem('token'));
    const token = userdata.data.token;

    const headers = {
        accept: 'application/json',
        Authorization: token
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        await axios.get(`${API_ENDPOINT}/user`, { headers: headers }).then(({data}) => {
            setUsers(data);
        });
    };

    /* DELETE USER */
    const deleteUser = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e50914',
            cancelButtonColor: '#d33',
            confirmButtonText: 'YES'
        }).then((result) => {
            return result.isConfirmed;
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers: headers }).then(({data}) => {
            Swal.fire({
                icon: "success",
                text: "Successfully deleted User!"
            });
            fetchUsers();
        }).catch(({response: {data}}) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            });
        });
    };

    /* CREATE USER */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState({});

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('username', username);
        formData.append('password', password);

        await axios.post(`${API_ENDPOINT}/auth/register`, { fullname, username, password }, { headers: headers }).then(({data}) => {
            Swal.fire({
                icon: "success",
                text: data.message
            });
            fetchUsers();
        }).catch(({response}) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                });
            }
        });
    };

    /* READ USER DETAILS */
    const [selectedUser, setSelectedUser] = useState(null);
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = (row_users) => {
        setSelectedUser(row_users);
        setShow1(true);
    };

    /* UPDATE USER */
    const [showUpdate, setShowUpdate] = useState(false);
    const [newFullname, setNewFullname] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [editUser, setEditUser] = useState(null);

    const handleShowUpdate = (user) => {
        setEditUser(user);
        setNewFullname(user.fullname);
        setNewUsername(user.username);
        setNewPassword("");
        setShowUpdate(true);
    };

    const handleCloseUpdate = () => setShowUpdate(false);

    const updateUser = async (e) => {
        e.preventDefault();

        if (!editUser) return;

        const updatedData = {
            fullname: newFullname,
            username: newUsername,
            password: newPassword,
        };

        try {
            const response = await axios.put(
                `${API_ENDPOINT}/user/${editUser.user_id}`,
                updatedData,
                { headers: headers }
            );

            Swal.fire({
                icon: 'success',
                text: response.data.message,
            });

            setShowUpdate(false);
            fetchUsers();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response ? error.response.data.message : 'An error occurred',
            });
        }
    };

    return (
        <>
            <Navbar style={{
                backgroundColor: '#e50914',  // Red background for navbar
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }} data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#Facebook" style={{color: '#fff', fontSize: '24px', fontWeight: 'bold'}}>Netflix</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#Profile" style={{color: '#fff', fontSize: '15px', marginLeft: '13px'}}>Movies</Nav.Link>
                        <Nav.Link href="#Group" style={{color: '#fff', fontSize: '15px', marginLeft: '13px'}}>Series</Nav.Link>
                        <Nav.Link href="#Friends" style={{color: '#fff', fontSize: '15px', marginLeft: '13px'}}>Myprofile</Nav.Link>
                    </Nav>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown title={user ? `User: ${user.username}` : 'Dropdown'} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item href="#" style={{color: '#e50914'}}>Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#" style={{color: '#e50914'}}>Info</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={handleLogout} style={{color: '#e50914'}}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                minHeight: '100vh', 
                backgroundAttachment: 'fixed',
                paddingTop: '50px'
            }}>
                <div className="container" style={{
                    marginTop: '30px', 
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                    padding: '20px', 
                    borderRadius: '10px',
                    color: 'white',
                }}>
                    <div className="col-12">
                        <Button variant="primary mb-2 float-end" onClick={handleShow} style={{
                            background: '#e50914', 
                            borderColor: '#e50914', 
                            color: '#fff'
                        }}>Create User</Button>
                    </div>

                    <table className="table table-bordered" style={{
                        background: '#333',  // Darker background for the table
                        borderRadius: '8px',
                        color: '#fff', // White text in table
                    }}>
                        <thead style={{background: '#e50914', color: '#fff'}}>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((row_users, index) => (
                                <tr key={index}>
                                    <td>{row_users.user_id}</td>
                                    <td>{row_users.username}</td>
                                    <td>{row_users.fullname}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => handleShow1(row_users)} style={{
                                            backgroundColor: '#e50914', 
                                            borderColor: '#e50914', 
                                            color: '#fff'
                                        }}>Details</Button>
                                        <Button variant="danger" onClick={() => deleteUser(row_users.user_id)} style={{
                                            backgroundColor: '#dc3545', 
                                            borderColor: '#dc3545', 
                                            color: '#fff', 
                                            marginLeft: '10px'
                                        }}>Delete</Button>
                                        <Button variant="warning" onClick={() => handleShowUpdate(row_users)} style={{
                                            backgroundColor: '#f39c12', 
                                            borderColor: '#f39c12', 
                                            color: '#fff', 
                                            marginLeft: '10px'
                                        }}>Update</Button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan="4">No users found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update Modal */}
            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateUser}>
                        <Form.Group className="mb-3" controlId="formFullname">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Full Name" 
                                value={newFullname} 
                                onChange={(e) => setNewFullname(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username" 
                                value={newUsername} 
                                onChange={(e) => setNewUsername(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{
                            backgroundColor: '#e50914', 
                            borderColor: '#e50914', 
                            color: '#fff'
                        }}>
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* User Details Modal */}
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser ? (
                        <>
                            <p><strong>Full Name:</strong> {selectedUser.fullname}</p>
                            <p><strong>Username:</strong> {selectedUser.username}</p>
                            <p><strong>Created At:</strong> {new Date(selectedUser.created_at).toLocaleString()}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Dashboard;
