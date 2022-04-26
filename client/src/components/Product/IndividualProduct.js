import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import queries from "../../queries";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import actions from "../../actions";

function IndividualProduct() {
    const [quantity, setQuantity] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    let { loading, error, data } = useQuery(queries.GET_PRODUCTS_BY_ID, { variables: { id: id } });
    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    } else if (data) {
        const { product } = data;
        return (
            <div style={{ marginTop: "150px" }}>
                <Row xs={1} md={2} lg={4} className="m-5">
                    <Col style={{ width: "30%" }}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                            alt="No_Image"
                            style={{ width: "340px" }}
                        />
                    </Col>
                    <Col style={{ width: "60%", minHeight: "270px" }}>
                        <Card>
                            <Card.Header style={{ fontSize: "20px" }}>{product.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>Price : {product.price}</Card.Text>
                                <Card.Text>Description : {product.description}</Card.Text>
                                <Card.Text>Category : {product.category}</Card.Text>
                                <Card.Text>Quantity in stock : {product.quantity}</Card.Text>
                            </Card.Body>
                            <Card.Text>
                                <Button
                                    className="btn btn-light"
                                    onClick={() => {
                                        quantity === 0 ? setQuantity(0) : setQuantity(quantity - 1);
                                    }}
                                >
                                    -
                                </Button>
                                <span>{quantity}</span>
                                <Button className="btn btn-light" onClick={() => setQuantity(quantity + 1)}>
                                    +
                                </Button>
                            </Card.Text>
                            {quantity > 0 ? (
                                <Button
                                    className="btn btn-primary"
                                    onClick={() => dispatch(actions.addProduct(product.name, product.price, quantity))}
                                >
                                    Add to Cart
                                </Button>
                            ) : (
                                <Button className="btn btn-primary" disabled>
                                    Add to Cart
                                </Button>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
    return <div>IndividualProduct</div>;
}

export default IndividualProduct;
