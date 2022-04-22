import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../Firebase/Auth";
import SignOutButton from "./SignOut";

const Navigation = () => {
    const { currentUser } = useContext(AuthContext);

    return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
    return (
        <div className="App-header">
            <div>
                <Link to="/">Landing</Link>
            </div>
            <div>
                <Link to="/home">Home</Link>
            </div>
            <div>
                <Link to="/account">Account</Link>
            </div>
            <div>
                <SignOutButton />
            </div>
        </div>
    );
};

const NavigationNonAuth = () => {
    return (
        <div className="App-header">
            <div>
                <Link to="/">Landing</Link>
            </div>
            <div>
                <Link to="/signup">Sign Up</Link>
            </div>
            <div>
                <Link to="/signin">Sign In</Link>
            </div>
        </div>
    );
};

export default Navigation;
