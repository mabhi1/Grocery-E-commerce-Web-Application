import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../queries";
import { Col, Row, Button, Alert } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import CartCards from "./CartCards";

function Checkout() {
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
        <Row xs={1} md={2}>
            <Col></Col>
            <Col>
                {data?.getUser.cart.map((product) => buildCard(product))}
                <div style={{ margin: "25px" }}>
                    <Alert variant="info" style={{ lineHeight: "0.1em" }}>
                        Total Price : {totalPrice}
                    </Alert>
                    <Button onClick={handleCheckout} style={{ width: "100%", margin: "0" }} size="sm">
                        Pay Now
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

export default Checkout;
