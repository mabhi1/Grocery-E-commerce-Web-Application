import React, { useContext } from "react";
import { AuthContext } from "../../Firebase/Auth";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../queries";
import { Col, Row, Button, Alert } from "react-bootstrap";
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
            <Col></Col>
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
