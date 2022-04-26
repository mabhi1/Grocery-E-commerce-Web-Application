import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../../actions";

function ProductCard(props) {
    let [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const product = props.product;
    return (
        <Col style={{ width: "12.5%", marginBottom: "20px" }}>
            <Card style={{ textAlign: "center" }}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" alt={product.name} />
                </Link>
                <Card.Body>
                    <Link className="btn btn-light" to={`/product/${product._id}`} role="button">
                        {product.name}
                    </Link>
                    <Card.Text>Price : ${product.price}</Card.Text>
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
                    {quantity > 0 ? (
                        <Button className="btn btn-primary" onClick={() => dispatch(actions.addProduct(product.name, product.price, quantity))}>
                            Add to Cart
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" disabled>
                            Add to Cart
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;
