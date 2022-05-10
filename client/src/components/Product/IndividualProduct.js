import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import queries from "../../queries";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import actions from "../../actions";
import { AuthContext } from "../../Firebase/Auth";
import ProductReviews from "./ProductReviews"

function IndividualProduct() {
    const [quantity, setQuantity] = useState(0);
    const { currentUser } = useContext(AuthContext);
    const userData = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser ? currentUser.uid : "none",
        },
    });
    const { id } = useParams();
    const dispatch = useDispatch();
    const [editUser] = useMutation(queries.EDIT_USER_CART);
    let { loading, error, data } = useQuery(queries.GET_PRODUCTS_BY_ID, { variables: { id: id } });
    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    } else if (data) {
        const { product } = data;
        const handleClick = () => {
            if (currentUser) {
                const { getUser } = userData.data;
                let newCart = [];
                let found = false;
                if (getUser.cart.length > 0) {
                    for (let item of getUser.cart) {
                        if (item._id !== product._id) {
                            newCart.push({ _id: item._id, name: item.name, price: item.price, quantity: item.quantity });
                        } else {
                            newCart.push({ _id: product._id, name: product.name, price: product.price, quantity: quantity + item.quantity });
                            found = true;
                        }
                    }
                }
                if (!found) newCart.push({ _id: product._id, name: product.name, price: product.price, quantity: quantity });
                editUser({
                    variables: {
                        id: getUser._id,
                        cart: newCart,
                    },
                });
            } else {
                dispatch(actions.addProduct(product._id, product.name, product.price, quantity));
            }
            setQuantity(0);
            alert(`${product.name} added to your cart`);
        };
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
                                <Button className="btn btn-primary" onClick={handleClick}>
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
                <ProductReviews id={id}/>
            </div>
        );
    }
}

export default IndividualProduct;
