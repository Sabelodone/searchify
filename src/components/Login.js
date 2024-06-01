import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Login({ show, handleClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');  // Reset the error message
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            }, {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            if (response.status === 200) {
                handleClose();
                window.location.reload();
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 404)) {
                setError("Incorrect credentials");
            } else {
                console.error('Error logging in user:', error);
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="loginEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;
