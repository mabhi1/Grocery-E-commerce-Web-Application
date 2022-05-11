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
        <div>
            <img
                onClick={() => socialSignOn("google")}
                alt="google signin"
                src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
                style={{
                    width: "200px",
                    cursor: "pointer",
                }}
            />
            <img
                onClick={() => socialSignOn("facebook")}
                alt="facebook signin"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaiIBQZaElJ23FsevRyEZUYG2eQFXiR9fQGik9S0czlS3BCIQcu9FQ5Ywb73cRs6bG-A&usqp=CAU"
                style={{
                    width: "190px",
                    cursor: "pointer",
                }}
            />
        </div>
    );
};

export default SocialSignIn;
