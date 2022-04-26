import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";

const styles = {
    card: {
        flexDirection: "row",
        padding: "20px",
        border: "0",
        width: "25%",
    },
    cardImg: {
        width: "50%",
    },
    cardBody: {
        textAlign: "left",
        marginLeft: "10px",
        padding: "0",
    },
    totalPrice: {
        float: "left",
        width: "80%",
        textAlign: "right",
        lineHeight: "2.5em",
        borderTop: "1px solid blueviolet",
        paddingRight: "28px",
        marginLeft: "60px",
        borderBottom: "1px solid blueviolet",
        fontFamily: "auto",
        fontSize: "large",
    },
};
function Cart() {
    let totalPrice = 0;
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const buildCard = (product) => {
        totalPrice += product.price;
        return (
            <Card style={styles.card} key={product.id}>
                <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" style={styles.cardImg} />
                <Card.Body style={styles.cardBody}>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        Price : {product.price}
                        <br />
                        Quantity : {product.quantity}
                    </Card.Text>
                    <Button onClick={() => dispatch(actions.removeProduct(product.id))}>Remove</Button>
                </Card.Body>
            </Card>
        );
    };
    return (
        <div>
            <div className="page-header">Cart</div>
            {cart.length > 0 ? (
                <div>
                    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "25px" }}>{cart.map((product) => buildCard(product))}</div>
                    <div style={styles.totalPrice}>Total Price : {totalPrice}</div>
                    <Button>Checkout</Button>
                </div>
            ) : (
                <div style={{ margin: "50px", fontSize: "x-large", fontFamily: "initial" }}>Your cart is empty</div>
            )}
        </div>
    );
}

export default Cart;
