import React from "react";
import AddOrder from "../orders/AddOrder";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../../queries";
import { Alert, Button } from "react-bootstrap";



function Success() {
    const logo = require("../../assets/delivery-package.gif"); 
    const navigate = useNavigate();
    const { secret } = useParams();
    const { loading, error, data } = useQuery(queries.GET_SESSION, { variables: { id: secret } });
    const [deleteSession] = useMutation(queries.DELETE_SESSION);
    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        navigate("/notfound");
    } else if (data.session) {
        deleteSession({
            variables: {
                id: secret,
            },
        });
        return (
            <div>
                <AddOrder />
                <Alert variant="success" style={{fontSize: "25px"}}>Order Placed Successfully</Alert>
                <img alt="Success Image" id="logo" src={logo} style={{ width: "70%", height: "70%" , marginTop: "30px"}} />
                <br />
                <br/>
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
        );
    } else {
        navigate("/notfound");
    }
}

export default Success;
