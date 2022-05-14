import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../../queries";
import { Button } from "react-bootstrap";

function Failed() {
    const logo = require("../../assets/fail.gif"); 
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
                
                <img alt="Success" id="logo" src={logo} style={{ width: "45%", height: "45%" , marginTop: "30px"}} />
                <br />
                <br/>
                
                <Button style={{marginBottom: "20px"}} onClick={() => navigate("/")}>Home</Button>
            </div>
        );
    } else {
        navigate("/notfound");
    }
}

export default Failed;
