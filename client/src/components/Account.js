import React, { useContext, useState } from "react";
//import SignOutButton from "./SignOut";
//import ChangePassword from "./ChangePassword";
import { AuthContext } from "../Firebase/Auth";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { dosignOut } from "../Firebase/FirebaseFunctions";

function Account(props) {
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogout() {
        // localStorage.removeItem('token');
        // window.location.reload();
        setError("");

        try {
            await dosignOut();
            navigate("/signin");
        } catch {
            setError("Error logging out");
        }
    }

    console.log(currentUser);

    return (
        <div>
            <>
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <Card>
                            <Card.Body>
                                <h1 className="text-center mb-4">Profile</h1>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <strong>Name:</strong> {currentUser && currentUser.displayName}
                                <br />
                                <br />
                                <strong>Email:</strong> {currentUser && currentUser.email}
                                <Link to="/update-profile" className="btn btn-primary w-100 mt-3 ">
                                    Update Profile
                                </Link>
                            </Card.Body>
                        </Card>

                        <div className="w-100 text-center mt-2">
                            <Button variant="btn btn-danger" onClick={handleLogout}>
                                Log Out
                            </Button>
                            <div className="w-100 text-center mt-3">
          UserDetailPage <Link to="/userDetail">Click Here</Link>
        </div>
                            {/* <SignOutButton /> */}
                        </div>
                    </div>
                </Container>
            </>
            {/* Account */}
            {/* {JSON.stringify(currentUser)} */}
            {/* <ChangePassword /> */}
            {/* <SignOutButton /> */}
        </div>
    );
}

export default Account;
