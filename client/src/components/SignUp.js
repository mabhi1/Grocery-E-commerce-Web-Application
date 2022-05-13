import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../Firebase/FirebaseFunctions";
import { AuthContext } from "../Firebase/Auth";
import { Alert, Container } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
//import { useMutation } from "@apollo/client";
//import queries from "../queries";
import Toast from "react-bootstrap/Toast";
import SocialSignIn from "./SocialSignIn";

const styles = {
    toast: {
        marginLeft: "auto",
        marginRight: "auto",
        border: "0",
    },
    toastBody: {
        background: "#ff7575",
        color: "white",
        fontSize: "medium",
        fontFamily: "auto",
        borderRadius: "5px",
    },
};
function SignUp() {
    const [error, setError] = useState(false);
    let navigate = useNavigate();

    let name = useRef();
    // let phoneNumber;
    let email = useRef();
    let passRef = useRef();
    let confPassRef = useRef();
    const { currentUser } = useContext(AuthContext);
    const [pwMatch, setPwMatch] = useState("");
    //this is for toggling state of usa
    //const [state, setState] = useState("");
    const handleSignUp = async (e) => {
        e.preventDefault();
        //const displayName = e.target.elements.displayName.value;
        let displayName = name.current.value;
        console.log(displayName);
        //const { email, passwordOne, passwordTwo } = e.target.elements;
        if (name.current.value.trim() === "") {
            setPwMatch("Please enter a name");
            return;
        }

        if (passRef.current.value.length < 6 || confPassRef.current.value.length < 6) {
            setPwMatch("Password must be at least 6 characters");
            return;
        }

        if (passRef.current.value !== confPassRef.current.value) {
            setPwMatch("Passwords do not match");
            return false;
        }

        try {
            await createUser(email.current.value, passRef.current.value, displayName);
            navigate("/userDetail");
        } catch (error) {
            setError(true);
        }
    };

    console.log(currentUser);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div
                className="jumbotron jumbotron-fluid"
                style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black", marginBottom: "30px" }}
            >
                <div className="container">
                    <h1 className="display-4">Sign Up</h1>
                </div>
            </div>
            <Container className="d-flex align-items-center justify-content-center">
                <div className="w-100" style={{ maxWidth: "600px" }}>
                    {pwMatch && (
                        <Alert variant="danger" className="error">
                            {pwMatch}
                        </Alert>
                    )}
                    <form onSubmit={handleSignUp} className="signup-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label for="displayName"> Name:</label>
                                <input
                                    id="dispalyName"
                                    className="form-control"
                                    required
                                    name="displayName"
                                    type="text"
                                    placeholder="Name"
                                    ref={name}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input id="email" className="form-control" required name="email" type="email" placeholder="Email" ref={email} />
                        </div>
                        <div className="form-group">
                            <label for="passwordOne">Password:</label>
                            <div style={{ display: "flex" }}>
                                <input
                                    ref={passRef}
                                    className="form-control"
                                    id="passwordOne"
                                    name="passwordOne"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="off"
                                    required
                                />
                                <span style={{ marginLeft: "-20px", marginTop: "5px" }}>
                                    <BsFillEyeFill
                                        className="icon"
                                        onClick={() => {
                                            passRef.current.type = passRef.current.type === "password" ? "text" : "password";
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="passwordTwo">Confirm Password:</label>
                            <div style={{ display: "flex" }}>
                                <input
                                    ref={confPassRef}
                                    className="form-control"
                                    id="passwordTwo"
                                    name="passwordTwo"
                                    type="password"
                                    placeholder="Confirm Password"
                                    autoComplete="off"
                                    required
                                />
                                <span style={{ marginLeft: "-20px", marginTop: "5px" }}>
                                    <BsFillEyeFill
                                        className="icon"
                                        onClick={() => {
                                            confPassRef.current.type = confPassRef.current.type === "password" ? "text" : "password";
                                        }}
                                    />
                                </span>
                            </div>
                        </div>

                        <button id="submitButton" type="submit" name="submitButton" className="btn btn-warning">
                            Sign Up
                        </button>
                        <div style={{ marginTop: "20px" }}>
                            <SocialSignIn />
                        </div>
                    </form>
                    <br />
                    <Toast onClose={() => setError(false)} show={error} style={styles.toastBody} position={"top-end"} autohide delay={3000}>
                        <Toast.Header>
                            <img
                                src="https://toppng.com/uploads/preview/error-handling-windows-xp-error-logo-11563210401mwwnodn9yn.png"
                                className="rounded me-2"
                                alt=""
                                style={{ width: "20px" }}
                            />
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>User already registered</Toast.Body>
                    </Toast>
                    <br />
                </div>
            </Container>
        </>
    );
}

export default SignUp;
