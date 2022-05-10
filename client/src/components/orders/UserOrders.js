import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";
import queries from "../../queries";
import { AuthContext } from "../../Firebase/Auth";

const UserOrders = () => {
    const { currentUser } = useContext(AuthContext);

    const { loading, error, data } = useQuery(queries.GET_USER_ORDERS, {
        fetchPolicy: "cache-and-network",
        variables: {
            userId: currentUser.uid,
        },
    });
    console.log(data);
    if (!data) {
        return null;
    } else if (data) {
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Ordered Items</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.userOrders.map((x) => {
                        return (
                            <tr key={x._id}>
                                <td>{x._id}</td>
                                <td>
                                    {x.products.map((y) => {
                                        return <h6>{y.name}</h6>;
                                    })}
                                </td>
                                <td>{x.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    } else if (loading) return <div>Loading</div>;
    else if (error) return <div>error</div>;
};

export default UserOrders;
