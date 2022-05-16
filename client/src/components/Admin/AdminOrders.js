import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import queries from "../../queries";
import OrderCard from "./OrderCard";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

function AdminOrders() {
    /* const { data, loading, error } = useQuery(queries.GET_ALL_ORDERS); */
    const { loading, error, data } = useQuery(queries.GET_ALL_ORDERS, {
        fetchPolicy: "no-cache",
    });
    const [filterValue, setFilterValue] = useState("all");
    if (error) {
        return <div>{error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (data) {
        const handleFilterValue = (event) => {
            setFilterValue(event.target.id);
        };
        const handleClearSelection = () => {
            setFilterValue("all");
            if (filterValue !== "all") document.getElementById(filterValue).checked = false;
        };
        const createCard = (order) => {
            return <OrderCard order={order} key={order._id} filter={filterValue} />;
        };
        return (
            <>
                <div className="mb-3">
                    <span className="filter-order">Filter Orders :</span>
                    <Form.Check inline name="group1" label="Ordered" type="radio" id="ordered" onChange={handleFilterValue} />
                    <Form.Check inline name="group1" label="Dispatched" type="radio" id="dispatched" onChange={handleFilterValue} />
                    <Form.Check inline name="group1" label="Completed" type="radio" id="completed" onChange={handleFilterValue} />
                    <Button size="sm" onClick={handleClearSelection}>
                        Clear Selection
                    </Button>
                </div>
                <Container style={{ textAlign: "left" }}>{data.getAllOrders.map((order) => createCard(order))}</Container>
            </>
        );
    }
}

export default AdminOrders;
