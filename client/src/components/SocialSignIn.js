import React from "react";
import { socialSignIn } from "../Firebase/FirebaseFunctions";
import { useNavigate } from "react-router-dom";

const SocialSignIn = () => {
    const navigate = useNavigate();

    const socialSignOn = async (provider) => {
        try {
            await socialSignIn(provider);
            navigate("/userDetail");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="social-login-container" style={{textAlign:"center"}}>
            <img
                onClick={() => socialSignOn("google")}
                alt="google signin"
                src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
                style={{
                    width: "225px",
                    cursor: "pointer",
                }}
            />
        </div>
    );
};

export default SocialSignIn;
