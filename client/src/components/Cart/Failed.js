import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../../queries";

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
        return <div>
            <h3>Order Failed</h3>
            <h4>Please check the credentials and try again</h4>
            </div>;
    } else {
        navigate("/notfound");
    }
}

export default Failed;
