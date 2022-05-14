import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

import { passwordReset } from "../Firebase/FirebaseFunctions";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const emailRef = useRef();
    
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        try {
            setMessage("");
            setError("");
            setLoading(true);
            
            await passwordReset(email);
            alert("Check your email for a password reset link");
            navigate("/signin");
        } catch {
            setError("Fail to reset password");
        }
        setLoading(false);
    };

    return (
        <>
            <div
                className="jumbotron jumbotron-fluid"
                style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black", marginBottom: "30px" }}
            >
                <div className="container">
                    <h1 className="display-4">ForgotPassword</h1>
                </div>
            </div>
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && (
                                <Alert autohide delay={3000} variant="success">
                                    {message}
                                </Alert>
                            )}
                        </Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required ref={emailRef} />
                            </Form.Group>
                            <Button disabled={loading} variant="primary" type="submit" className="w-100">
                                Reset Password
                            </Button>
                        </Form>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Remember what you were looking for. <Link to="/signin">Go Back?</Link>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ForgotPassword;
