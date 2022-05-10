import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createUser } from "../Firebase/FirebaseFunctions";
import { AuthContext } from "../Firebase/Auth";
import { Alert, Container } from "react-bootstrap";
//import { useMutation } from "@apollo/client";
//import queries from "../queries";
import Toast from "react-bootstrap/Toast";

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
            <h1 className="page-header">Sign up</h1>
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
                                <label> Name:</label>
                                <input className="form-control" required name="displayName" type="text" placeholder="Name" ref={name} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                className="form-control"
                                required
                                name="email"
                                type="email"
                                placeholder="Email"
                                ref={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
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
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                ref={confPassRef}
                                className="form-control"
                                name="passwordTwo"
                                type="password"
                                placeholder="Confirm Password"
                                autoComplete="off"
                                required
                            />
                        </div>
                        

                        {/* //TODO Sumbit Button */}
                        <button
                            id="submitButton"
                            type="submit"
                            name="submitButton"
                            className="btn btn-warning"
                        >
                            Sign Up
                        </button>
                    </form>
                    <br />
                    <Toast onClose={() => setError(false)} show={error} style={styles.toast} position={"top-end"} autohide delay={3000}>
                        <Toast.Body style={styles.toastBody}>User already registered</Toast.Body>
                    </Toast>
                    <br />
                </div>
            </Container>
        </>
    );

}

export default SignUp;
