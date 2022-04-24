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
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Asian Mart</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        {/* <Nav.Link href="/home">Home</Nav.Link> */}
                        <Link className="btn btn-primary" to="/account" role="button">
                            Account
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

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Asian Mart</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/signin">Login</Nav.Link>
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
