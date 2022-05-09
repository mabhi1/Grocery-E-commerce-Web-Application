import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../../queries";
import { Button, Alert } from "react-bootstrap";

function Failed() {
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
                <Alert variant="danger">Failed to place your order</Alert>
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
        );

    } else {
        navigate("/notfound");
    }
}

export default Failed;
