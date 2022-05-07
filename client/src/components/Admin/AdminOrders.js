import { useQuery } from "@apollo/client";
import React from "react";
import Container from "react-bootstrap/Container";
import queries from "../../queries";
import OrderCard from "./OrderCard";

function AdminOrders() {
    const { data, loading, error } = useQuery(queries.GET_ALL_ORDERS);
    if (error) {
        return <div>{error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (data) {
        const createCard = (order) => {
            return <OrderCard order={order} />;
        };
        return <Container style={{ textAlign: "left" }}>{data.getAllOrders.map((order) => createCard(order))}</Container>;
    }
}

export default AdminOrders;
