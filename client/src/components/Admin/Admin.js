import React from "react";
import AdminProducts from "./AdminProducts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AdminOrders from "./AdminOrders";
import AdminReviews from "./AdminReviews";

function Admin() {
    return (
        <div>
            <div
                className="jumbotron jumbotron-fluid"
                style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black", marginBottom: "30px" }}
            >
                <div className="container">
                    <h1 className="display-4">Dashboard</h1>
                </div>
            </div>
            <Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="mb-3" style={{ margin: "25px" }}>
                <Tab eventKey="orders" title="Orders">
                    <AdminOrders />
                </Tab>
                <Tab eventKey="products" title="Products">
                    <AdminProducts />
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <AdminReviews />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Admin;
