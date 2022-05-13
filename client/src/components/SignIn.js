import React, { useContext, useState } from "react";
import SocialSignIn from "./SocialSignIn";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Firebase/Auth";
import { signIn } from "../Firebase/FirebaseFunctions";
import { Link } from "react-router-dom";
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
function SignIn() {
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const handleLogin = async (event) => {
        event.preventDefault();
        let { email, password } = event.target.elements;

        if(email.value.trim() === ""){
            alert("Please enter an email");
            return;
        }

        if(password.value.trim() === ""){
            alert("Please enter a password");
            return;
        }
        if(password.value.length < 6){
            alert("Password must be at least 6 characters");
            password.value = "";
            return;
        }
        try {
            await signIn(email.value, password.value);
            console.log(currentUser);
        } catch (error) {
            setError(true);
            console.log(error.message.split(":")[1]);
        }
    };

    // const handlePasswordReset = (event) => {
    //     event.preventDefault();
    //     let email = document.getElementById("email").value;
    //     if (email) {
    //         passwordReset(email);
    //         alert("Password reset email was sent");
    //     } else {
    //         alert("Please enter an email address below before you click the forgot password link");
    //     }
    // };

    if (currentUser) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <div
                className="jumbotron jumbotron-fluid"
                style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black", marginBottom: "30px" }}
            >
                <div className="container">
                    <h1 className="display-4">Sign In</h1>
                </div>
            </div>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>
                        Email:
                        <input className="form-control" name="email" id="email" type="email" placeholder="Email" required style={{width:"350px"}} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password:
                        <input className="form-control" name="password" type="password" placeholder="Password" autoComplete="off" required style={{width:"350px"}} />
                    </label>
                </div>
                <button type="submit" className="btn btn-info">
                    Log in
                </button>

                {/* <button className="forgotPassword" onClick={handlePasswordReset}>
                    Forgot Password
                </button> */}
                <div className="w-100 text-center mt-3">
                    Forgot Password? <Link to="/forgot-password">Click Here</Link>
                </div>
                <br />
            <SocialSignIn />
            </form>
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
                <Toast.Body>Username or Password Incorrect</Toast.Body>
            </Toast>
            
        </div>
    );
}

export default SignIn;
