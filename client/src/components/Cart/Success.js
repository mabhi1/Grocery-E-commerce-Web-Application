import React from "react";
import AddOrder from "../orders/AddOrder";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../../queries";
import { Link } from "react-router-dom"; 
function Success() {
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
                <h3>Payment Successful, your order was placed</h3>
                <div className="w-100 text-center mt-3">
                        <Link to="/">Return to Home</Link>
                    </div>
            </div>
        );
    } else {
        navigate("/notfound");
    }
}

export default Success;
