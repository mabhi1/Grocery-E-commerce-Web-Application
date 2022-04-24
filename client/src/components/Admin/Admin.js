import React from "react";
import AdminProducts from "./AdminProducts";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function Admin() {
    return (
        <div>
            <div className="page-header">Admin Dashboard</div>
            <Tabs defaultActiveKey="orders" id="uncontrolled-tab-example" className="mb-3" style={{ margin: "25px" }}>
                <Tab eventKey="orders" title="Orders">
                    <div>Orders</div>
                </Tab>
                <Tab eventKey="products" title="Products">
                    <AdminProducts />
                </Tab>
                <Tab eventKey="users" title="Users">
                    <div>Users</div>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Admin;
