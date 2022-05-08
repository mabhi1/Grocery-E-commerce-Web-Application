import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../Firebase/Auth";
import SignOutButton from "./SignOut";
import { Container, Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
    const { currentUser } = useContext(AuthContext);
    return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser);

    return (
        // <div>
        //   <div>
        //     <Link to="/">Landing</Link>
        //   </div>
        //   <div>
        //     <Link to="/home">Home</Link>
        //   </div>
        //   <div>
        //     <Link to="/account">Account</Link>
        //   </div>
        //   <div>
        //     <SignOutButton />
        //   </div>
        // </div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" style={{ boxShadow: "0px 5px 10px 0px black" }}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://icons-for-free.com/download-icon-shop+shopping+trolley+icon-1320191097483113693_512.png"
                        alt="asian_mart"
                        style={{ width: "40px" }}
                    />{" "}
                    Asian Mart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        {/* <Nav.Link href="/home">Home</Nav.Link> */}
                        <p style={{ color: "white", paddingTop: "13px", fontWeight: "bold" }}>Hi, {currentUser.email.split("@")[0]}</p>
                        <Link className="btn btn-dark" to="/products/1" role="button">
                            Products
                        </Link>
                        <Link className="btn btn-dark" to="/account" role="button">
                            Account
                        </Link>
                        <Link className="btn btn-dark" to="/cart" role="button">
                            Cart
                        </Link>
                        <SignOutButton />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const NavigationNonAuth = () => {
    return (
        // <div>
        //     <div>
        //         <Link to="/">Landing</Link>
        //     </div>
        //     <div>
        //         <Link to="/signup">Sign Up</Link>
        //     </div>
        //     <div>
        //         <Link to="/signin">Sign In</Link>
        //     </div>
        // </div>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" style={{ boxShadow: "0px 5px 10px 0px black" }}>
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="https://icons-for-free.com/download-icon-shop+shopping+trolley+icon-1320191097483113693_512.png"
                        alt="asian_mart"
                        style={{ width: "45px" }}
                    />{" "}
                    Asian Mart
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Link className="btn btn-dark" to="/products/1" role="button">
                            Products
                        </Link>
                        <Link className="btn btn-dark" to="/signin" role="button">
                            Login
                        </Link>
                        <Link className="btn btn-dark" to="/signup" role="button">
                            Sign Up
                        </Link>
                        <Link className="btn btn-dark" to="/cart" role="button">
                            Cart
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
