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
        return <Navigate to="/account" />;
    }
    return (
        <div>
            <h1 className="page-header">Log in</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>
                        Email:
                        <input className="form-control" name="email" id="email" type="email" placeholder="Email" required />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Password:
                        <input className="form-control" name="password" type="password" placeholder="Password" autoComplete="off" required />
                    </label>
                </div>
                <button type="submit" className="btn btn-light">
                    Log in
                </button>

                {/* <button className="forgotPassword" onClick={handlePasswordReset}>
                    Forgot Password
                </button> */}
                <div className="w-100 text-center mt-3">
                    Forgot Password? <Link to="/forgot-password">Click Here</Link>
                </div>
            </form>
            <Toast onClose={() => setError(false)} show={error} style={styles.toast} position={"top-end"} autohide delay={3000}>
                <Toast.Body style={styles.toastBody}>Username or Password Incorrect</Toast.Body>
            </Toast>
            <br />
            <SocialSignIn />
        </div>
    );
}

export default SignIn;
