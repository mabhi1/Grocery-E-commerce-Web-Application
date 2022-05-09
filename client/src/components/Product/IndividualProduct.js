import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import queries from "../../queries";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import { useDispatch } from "react-redux";
import actions from "../../actions";
import { AuthContext } from "../../Firebase/Auth";
import PostRating from "../Ratings";

function IndividualProduct() {
    let navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);
    const [toast, setToast] = useState(false);
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
    useEffect(() => {
        if (data) {
            if (!data.product) {
                navigate("/notfound");
            }
        }
    }, [data, navigate]);
    if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    } else if (data && data.product) {
        const { product } = data;
        const handleClick = () => {
            if (quantity > product.quantity) {
                alert(`Only ${product.quantity} quantity of ${product.name} is left in stock. Please choose a smaller value.`);
                setQuantity(0);
                return;
            }
            if (currentUser) {
                const { getUser } = userData.data;
                let newCart = [];
                let found = false;
                let totalQuantity = 0;
                if (getUser.cart.length > 0) {
                    for (let item of getUser.cart) {
                        if (item._id !== product._id) {
                            newCart.push({ _id: item._id, name: item.name, price: item.price, quantity: item.quantity, image: item.image });
                        } else {
                            totalQuantity = quantity + item.quantity;
                            newCart.push({
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                quantity: quantity + item.quantity,
                                image: product.image,
                            });
                            found = true;
                        }
                    }
                }
                if (totalQuantity > product.quantity) {
                    alert(
                        `Only ${product.quantity} quantity of ${product.name} is left in stock. You already have ${
                            totalQuantity - quantity
                        } in your cart.`
                    );
                    setQuantity(0);
                    return;
                }
                if (!found) newCart.push({ _id: product._id, name: product.name, price: product.price, quantity: quantity, image: product.image });
                editUser({
                    variables: {
                        id: getUser._id,
                        cart: newCart,
                    },
                });
            } else {
                navigate("/signin");
                dispatch(actions.addProduct(product._id, product.name, product.price, quantity));
            }
            setQuantity(0);
            setToast(true);
        };
        return (
            <div style={{ marginTop: "150px" }}>
                <Row className="m-5" style={{ border: "1px solid rgba(0,0,0,.125)" }}>
                    <Col
                        md={3}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <img src={product.image} alt="No_Image" style={{ width: "100%", height: "auto" }} />
                    </Col>
                    <Col style={{ width: "60%", minHeight: "270px", padding: "0" }}>
                        <Card style={{ border: "0" }}>
                            <Card.Header style={{ fontSize: "20px" }}>{product.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>Price : ${product.price}.00</Card.Text>
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

                            <PostRating />
                        </Card>
                    </Col>
                </Row>
                <Toast onClose={() => setToast(false)} show={toast} delay={2000} autohide>
                    <Toast.Header>
                        <img
                            src="https://iconarchive.com/download/i48706/custom-icon-design/pretty-office-2/success.ico"
                            className="rounded me-2"
                            alt=""
                            style={{ width: "20px" }}
                        />
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>{`${product.name} added to your cart`}</Toast.Body>
                </Toast>
            </div>
        );
    }
}

export default IndividualProduct;
