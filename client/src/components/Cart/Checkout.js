import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../queries";
import { Col, Row, Button, Alert, Form , Container} from "react-bootstrap";
import { v4 as uuid } from "uuid";
import CartCards from "./CartCards";

function Checkout(props) {
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
    const handleCheckout = () => {
        fetch("http://localhost:5000/create-checkout-session", {
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
        <Row style={{ marginTop: "150px" }}>
            <Col>
          
                                    
                                    
                                   {/*  <strong>Name:</strong> {data.getUser && data.getUser.name}
                                    <br />
                                    <br />
                                    <strong>Email:</strong> {data.getUser && data.getUser.email}
                                    <br />
                                    <br />
                                    <strong>Phone:</strong> {data.getUser && data.getUser.phoneNumber}
                                    <br />
                                    <br />
                                    <input defaultValue={data.getUser.addressStreet} placeholder="Enter Street" />
                                    <br />
                                    <br />
                                    <input defaultValue={data.getUser.apt} placeholder="Enter Apt" />
                                    <br />
                                    <br />
                                    <input defaultValue={data.getUser.city} placeholder="Enter City" />
                                    <br />
                                    <br />
                                    <input defaultValue={data.getUser.state} placeholder="Enter State" />
                                    <br />
                                    <br />
                                    <input defaultValue={data.getUser.zip} placeholder="Enter Zip" /> */}
                                    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "600px" }}>
                    <Form>
                        {/* <p>{JSON.stringify(currentUser.displayName)}</p> */}
                        {/* //!Jumbotron for user Detail */}
                        <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black" }}>
                            <div className="container">
                                <h1 className="display-4">Welcome, {currentUser.displayName} </h1>
                                <p className="lead">Please provide additional detalis so we can serve you better</p>
                            </div>
                        </div> 

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputAddress2"
                                placeholder="Enter Address"
                                defaultValue={data.getUser.addressStreet}
                                
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Apt</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputAddress2"
                                placeholder="Enter Apt"
                                defaultValue={data.getUser.apt}
                                
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputAddress2"
                                placeholder="Enter State"
                                defaultValue={data.getUser.state}
                                
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputAddress2"
                                placeholder="Enter City"
                                defaultValue={data.getUser.city}
                                
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                                className="form-control"
                                id="inputAddress2"
                                placeholder="Enter Zip"
                                defaultValue={data.getUser.zip}
                                
                            />
                        </Form.Group>
                       
                        </Form>
                </div>
            </Container>                
                                
            </Col>
            <Col>
                {data?.getUser.cart.map((product) => buildCard(product))}
                <div style={{ marginRight: "80px", display: "flex" }}>
                    <Alert variant="info" style={{ width: "fit-content" }}>
                        Total Price : {totalPrice}
                    </Alert>
                    <Button onClick={handleCheckout} style={{ marginLeft: "25px" }} size="sm">
                        Pay Now
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

export default Checkout;
