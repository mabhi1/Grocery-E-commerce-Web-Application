import React, { useContext } from "react";
import { AuthContext } from "../Firebase/Auth";

function Admin() {
    const { currentUser } = useContext(AuthContext);
    return <div>{JSON.stringify(currentUser)}</div>;
}

export default Admin;
