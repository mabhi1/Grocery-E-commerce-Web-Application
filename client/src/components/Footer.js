import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Footer() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" style={{ justifyContent: "center", fontFamily: "ui-rounded", marginTop: "70px" }}>
            <Nav style={{ color: "#9e9e9e" }}>All Rights Reserved © 2022 - Asian Mart </Nav>
        </Navbar>
    );
}

export default Footer;
