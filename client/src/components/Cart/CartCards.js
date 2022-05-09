import React, { useEffect, useContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";

const styles = {
    card: {
        margin: "0px 15px 10px 15px",
        lineHeight: "3.5em",
        border: "0",
    },
    cardImg: {
        width: "auto",
        height: "60px",
    },
    cardBody: {
        textAlign: "left",
        marginLeft: "10px",
        padding: "0",
    },
    error: {
        color: "white",
        lineHeight: "1.8em",
        background: "#dc3545",
        margin: "0px 15px",
        borderRadius: "2px",
    },
    input: {
        lineHeight: "1.5em",
        width: "60px",
    },
    col: {
        paddingLeft: "0",
        paddingRight: "0",
    },
};
function CartCards({ product, handleClick, setError, checkout }) {
    let { data } = useQuery(queries.GET_PRODUCTS_BY_ID, { variables: { id: product._id } });
    let [changeQty, setChangeQty] = useState(product.quantity);
    const { currentUser } = useContext(AuthContext);
    const user = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser.uid,
        },
    });
    const [editUser] = useMutation(queries.EDIT_USER_CART);
    const handleCheckout = () => {
        if (changeQty === product.quantity) return;
        if (changeQty > data?.product.quantity) {
            alert(`Only ${data?.product.quantity} quantity of ${product.name} is left in stock. Please choose a smaller value.`);
            setChangeQty(product.quantity);
            return;
        }
        const { getUser } = user.data;
        let newCart = [];
        if (getUser.cart.length > 0) {
            for (let item of getUser.cart) {
                if (item._id !== product._id) {
                    newCart.push({ _id: item._id, name: item.name, price: item.price, quantity: item.quantity, image: item.image });
                } else {
                    newCart.push({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        quantity: changeQty,
                        image: product.image,
                    });
                }
            }
        }
        editUser({
            variables: {
                id: getUser._id,
                cart: newCart,
            },
        });
    };
    useEffect(() => {
        if (data?.product.quantity < product.quantity) {
            setError(true);
        }
    }, [data?.product.quantity, product.quantity, setError]);
    return (
        <Card style={styles.card} className="out-of-stock">
            <Row xs={checkout === true ? 1 : 2} md={3} lg={checkout === true ? 3 : 5}>
                <Col style={styles.col}>
                    <Card.Img src={product.image} style={styles.cardImg} />
                </Col>
                <Col style={styles.col}>
                    <Link className="btn btn-light" to={`/product/${product._id}`} role="button">
                        {product.name}
                    </Link>
                </Col>
                {checkout === true ? (
                    <Col>Total : ${product.price * product.quantity}.00</Col>
                ) : (
                    <>
                        <Col style={styles.col}>Price : ${product.price}.00</Col>
                        <Col style={styles.col}>
                            Quantity :
                            <Button className="btn btn-light" onClick={() => (changeQty === 1 ? setChangeQty(1) : setChangeQty(changeQty - 1))}>
                                -
                            </Button>
                            <span>{changeQty}</span>
                            <Button className="btn btn-light" onClick={() => setChangeQty(changeQty + 1)}>
                                +
                            </Button>
                            <Button className="btn btn-light" size="sm" onClick={handleCheckout}>
                                Change
                            </Button>
                        </Col>
                        <Col style={styles.col}>
                            <Button
                                size="sm"
                                onClick={() => {
                                    handleClick(product._id);
                                    data?.product.quantity < product.quantity && setError(false);
                                }}
                            >
                                Remove
                            </Button>
                        </Col>
                    </>
                )}
            </Row>
            {data?.product.quantity < product.quantity ? (
                <Row style={styles.error}>
                    <Col>
                        Only {data.product.quantity} of {product.name} left in stock. Select again with smaller quantity to continue
                    </Col>
                </Row>
            ) : undefined}
        </Card>
    );
}

export default CartCards;
