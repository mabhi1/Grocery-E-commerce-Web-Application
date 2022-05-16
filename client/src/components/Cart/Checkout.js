import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Firebase/Auth";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../queries";
import { Col, Row, Button, Alert, Form, Container } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import CartCards from "./CartCards";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

function Checkout() {
    let navigate = useNavigate();
    let totalPrice = 0;
    const { currentUser } = useContext(AuthContext);
    const [addSession] = useMutation(queries.ADD_SESSION);
    let secret = uuid();

    const { data } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser ? currentUser.uid : "none",
        },
    });

    useEffect(() => {
        if (data) {
            if (!data.getUser) {
                navigate("/userDetail");
            }
        } else {
            navigate("/cart");
        }
    });

    const [zip, setZip] = useState(data?.getUser.zip);
    const [city, setCity] = useState(data?.getUser.city);
    const [state, setState] = useState(data?.getUser.state);
    const [apt, setApt] = useState(data?.getUser.apt);
    const [addressStreet, setAddressStreet] = useState(data?.getUser.addressStreet);

    const handleCheckout = () => {
        if (zip.val === "" || city.val === "" || state.val === "" || apt.val === "" || addressStreet.val === "") {
            alert("please fill all the fields");
            return;
        }
        document.getElementById("paynow").disabled = true;
        document.getElementById("paynow").innerHTML = "Please wait...";
        reactLocalStorage.setObject("addressDetails", { addressStreet: addressStreet, zip: zip, state: state, city: city, apt: apt });
        fetch("http://localhost:5001/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: data?.getUser.cart,
                email: currentUser ? currentUser.email : undefined,
                secret: secret,
            }),
        })
            .then(async (res) => {
                if (res.ok) return res.json();
                const json = await res.json();
                return await Promise.reject(json);
            })
            .then(({ url }) => {
                window.location = url;
            })
            .catch((e) => {
                console.error(e.error);
            });
        addSession({
            variables: {
                id: secret,
            },
        });
    };
    const buildCard = (product) => {
        totalPrice += product.price * product.quantity;
        return <CartCards product={product} key={product._id} checkout={true} />;
    };
    return (
        <>
            <div
                className="jumbotron jumbotron-fluid"
                style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black", marginBottom: "30px" }}
            >
                <div className="container">
                    <h1 className="display-4">Order Details</h1>
                </div>
            </div>
            <Row xs={1} md={2}>
                <Col>
                    <Container className="d-flex align-items-center justify-content-center">
                        <div className="w-75" style={{ maxWidth: "600px" }}>
                            <Form style={{ textAlign: "left" }}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        defaultValue={data?.getUser.name}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        defaultValue={data?.getUser.email}
                                        disabled
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="phone">Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        placeholder="Enter Phone Number"
                                        defaultValue={data?.getUser.phoneNumber}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="inputAddress1">Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="inputAddress1"
                                        placeholder="Enter Address"
                                        defaultValue={data?.getUser.addressStreet}
                                        onChange={(e) => setAddressStreet({ val: e.target.value })}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="apt">Apt</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="apt"
                                        placeholder="Enter Apt"
                                        defaultValue={data?.getUser.apt}
                                        required
                                        onChange={(e) => setApt({ val: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="state">State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="state"
                                        placeholder="Enter State"
                                        defaultValue={data?.getUser.state}
                                        required
                                        onChange={(e) => setState({ val: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="city">City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="city"
                                        placeholder="Enter City"
                                        defaultValue={data?.getUser.city}
                                        required
                                        onChange={(e) => setCity({ val: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="zip">Zip</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="zip"
                                        placeholder="Enter Zip"
                                        defaultValue={data?.getUser.zip}
                                        required
                                        onChange={(e) => setZip({ val: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                    </Container>
                </Col>
                <Col>
                    {data?.getUser.cart.map((product) => buildCard(product))}
                    <div style={{ margin: "25px" }}>
                        <Alert variant="info" style={{ lineHeight: "0.1em" }}>
                            Total Price : ${totalPrice}.00
                        </Alert>
                        <Button id="paynow" onClick={handleCheckout} style={{ width: "100%", margin: "0" }}>
                            Pay Now
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Checkout;
