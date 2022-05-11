import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
// import { resetPassword } from "../Firebase/FirebaseFunctions";

import { passwordReset } from "../Firebase/FirebaseFunctions";
import { Link,useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const emailRef = useRef();
//   const { resetPassword } = useAuth();
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
      // await signUp(email, password);  // signUp is a function from useAuth
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
       <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h1 className="text-center mb-4">Forgot Password</h1>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert autohide delay={3000} variant="success">{message}</Alert>}
        </Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="formBasicEmail">
            <Form.Label style={{ paddingRight: "10px", paddingLeft: "10px" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              ref={emailRef}
            />
          </Form.Group>
          <Button
            disabled={loading}
            variant="primary"
            type="submit"
            className="w-100"
          >
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
