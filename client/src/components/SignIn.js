import React, { useContext } from "react";
import SocialSignIn from "./SocialSignIn";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Firebase/Auth";
import { signIn } from "../Firebase/FirebaseFunctions";
import { Link } from "react-router-dom";

function SignIn() {
    const { currentUser } = useContext(AuthContext);
    const handleLogin = async (event) => {
        event.preventDefault();
        let { email, password } = event.target.elements;

        try {
            await signIn(email.value, password.value);
            console.log(currentUser);
        } catch (error) {
            console.log(error);
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
        return <Navigate to="/home" />;
    }
    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Log in</button>

                {/* <button className="forgotPassword" onClick={handlePasswordReset}>
                    Forgot Password
                </button> */}
                 <div className="w-100 text-center mt-3">
          Forgot Password? <Link to="/forgot-password">Click Here</Link>
      </div>
            </form>

            <br />
            <SocialSignIn />
        </div>
    );
}

export default SignIn;
