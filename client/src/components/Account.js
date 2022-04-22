import React, { useContext } from "react";
import SignOutButton from "./SignOut";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../Firebase/Auth";

function Account(props) {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            Account
            {JSON.stringify(currentUser)}
            <ChangePassword />
            <SignOutButton />
        </div>
    );
}

export default Account;
