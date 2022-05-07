import { useQuery } from "@apollo/client";
import React from "react";
import queries from "../../queries";

function AdminOrders() {
    const { data, loading, error } = useQuery(queries.GET_ALL_ORDERS);
    if (error) {
        return <div>{error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (data) {
        const createCard = (order) => {
            return (
                <div key={order._id}>
                    <div>{order.status}</div>
                    {order.products.map((product) => {
                        console.log(product);
                        return (
                            <div key={product._id}>
                                name : {product.name}
                                <br />
                                price : {product.price}
                                <br />
                                quantity : {product.orderedQuantity}
                                <br />
                            </div>
                        );
                    })}
                </div>
            );
        };
        return <div>{data.getAllOrders.map((order) => createCard(order))}</div>;
    }
}

export default AdminOrders;
