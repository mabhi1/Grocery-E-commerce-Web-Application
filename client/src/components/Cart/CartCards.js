import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
};
function CartCards({ product, handleClick, setError }) {
    let { data } = useQuery(queries.GET_PRODUCTS_BY_ID, { variables: { id: product._id } });
    useEffect(() => {
        if (data?.product.quantity < product.quantity) {
            setError(true);
        }
    }, [data?.product.quantity, product.quantity, setError]);
    return (
        <Card style={styles.card} className="out-of-stock">
            <Row xs={2} md={5}>
                <Col>
                    <Card.Img src={product.image} style={styles.cardImg} />
                </Col>
                <Col>
                    <Link className="btn btn-light" to={`/product/${product._id}`} role="button">
                        {product.name}
                    </Link>
                </Col>
                <Col>Price : ${product.price}.00</Col>
                <Col>Quantity : {product.quantity}</Col>

                <Col>
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
