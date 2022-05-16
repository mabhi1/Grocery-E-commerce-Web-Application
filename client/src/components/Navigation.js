import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../Firebase/Auth";
import SignOutButton from "./SignOut";
import { Container, Navbar, Nav } from "react-bootstrap";

const styles = {
    navLink: {
        padding: 0,
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        margin: "auto",
    },
};
const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" style={{ boxShadow: "black 0px 1px 4px 1px" }}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://icons-for-free.com/download-icon-shop+shopping+trolley+icon-1320191097483113693_512.png"
                        alt="asian_mart"
                        style={{ width: "40px" }}
                    />
                    Asian Mart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {currentUser && currentUser.uid === "wWhJlb03YaaAnFQjlRKDsUJh0le2" && (
                            <Nav.Link eventKey="1" style={styles.navLink}>
                                <Link className="btn btn-dark" to="/admin" role="button">
                                    Dashboard
                                </Link>
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        <p style={{ color: "white", paddingTop: "19px", fontWeight: "bold" }}>
                            Hi, {currentUser.displayName ? currentUser.displayName : currentUser.email.split("@")[0]}
                        </p>
                        <Nav.Link eventKey="2" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/" role="button">
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="3" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/products/1" role="button">
                                Products
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="4" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/account" role="button">
                                Account
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="5" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/cart" role="button">
                                Cart
                            </Link>
                        </Nav.Link>
                        <SignOutButton />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const NavigationNonAuth = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" style={{ boxShadow: "black 0px 1px 4px 1px" }}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://icons-for-free.com/download-icon-shop+shopping+trolley+icon-1320191097483113693_512.png"
                        alt="asian_mart"
                        style={{ width: "45px" }}
                    />
                    Asian Mart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link eventKey="1" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/" role="button">
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="2" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/products/1" role="button">
                                Products
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="3" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/signin" role="button">
                                Login
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="4" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/signup" role="button">
                                Sign Up
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey="5" style={styles.navLink}>
                            <Link className="btn btn-dark" to="/cart" role="button">
                                Cart
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
