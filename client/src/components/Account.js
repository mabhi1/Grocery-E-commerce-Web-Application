import React, { useContext, useState } from "react";
//import SignOutButton from "./SignOut";
//import ChangePassword from "./ChangePassword";
import { AuthContext } from "../Firebase/Auth";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Alert, Container,Table } from "react-bootstrap";
import { dosignOut } from "../Firebase/FirebaseFunctions";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import UserOrders from "./orders/UserOrders";

function Account(props) {
    const { currentUser } = useContext(AuthContext);
    const [error1, setError] = useState("");
    const navigate = useNavigate();
    const { loadiing, error, data } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser.uid,
        },
    });

    

    //console.log(data);
    console.log(data);

    if (data) {
        const { getUser } = data;

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
                                    {error1 && <Alert variant="danger">{error1}</Alert>}
                                    <strong>Name:</strong> {currentUser && currentUser.displayName}
                                    <br />
                                    <br />
                                    <strong>Email:</strong> {currentUser && currentUser.email}
                                    <br />
                                    <br />
                                    <strong>Phone:</strong> {getUser && getUser.phoneNumber}
                                    <br />
                                    <br />
                                    <strong>Address:</strong> {getUser.addressStreet+", "+getUser.apt+", "+getUser.city+", "+getUser.state+", "+getUser.zip}
                                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3 ">
                                        Update Profile
                                    </Link>
                                </Card.Body>
                            </Card>
                            <div className="w-100" style={{ maxWidth: "400px" }}>
                            <Card>
                                <Card.Body>
                                    <h1 className="text-center mb-4">Your Orders</h1>
                                    <UserOrders />
                                </Card.Body>
                            </Card>
                            </div>
                            <div className="w-100 text-center mt-2">
                                <Button variant="btn btn-danger" onClick={handleLogout}>
                                    Log Out
                                </Button>
                                {/* <div className="w-100 text-center mt-3">
              UserDetailPage <Link to="/userDetail">Click Here</Link>
            </div> */}
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
    } else if (loadiing) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error</div>;
    }
}

export default Account;
