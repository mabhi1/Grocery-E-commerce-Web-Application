import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Table } from "react-bootstrap";
import queries from "../../queries";
import { AuthContext } from "../../Firebase/Auth";

const UserOrders = () => {
    const { currentUser } = useContext(AuthContext);

    const { loading, error, data } = useQuery(queries.GET_USER_ORDERS, {
        fetchPolicy: "no-cache",
        variables: {
            userId: currentUser.uid,
        },
    });
    if (loading) return <div>Loading</div>;
    else if (error) return <div>error</div>;
    else if (data) {
        
        let realData = data.userOrders.sort((a, b) => (a.flag > b.flag) ? 1 : -1)
        return (
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Ordered Items</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {realData.map((x) => {
                        
                        return (
                            <>
                            <tr key={x._id}>
                                <td>{x.flag}</td>
                                <td>
                                    
                                    {x.products.map((y) => {
                                        
                                        return <div>{y.name} - {y.orderedQuantity}</div>;
                                    })}
                                </td>

                                    <td>{x.total}</td>
                                    <td>{x.createdAt.split("G")[0]}</td>
                                    <td>{x.status}</td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </Table>
        );
    } 
    
};

export default UserOrders;
