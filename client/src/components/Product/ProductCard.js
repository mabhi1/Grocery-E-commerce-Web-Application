import React, { useContext, useState } from "react";
import { Toast, Col, Card, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../../actions";
import { AuthContext } from "../../Firebase/Auth";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../queries";

const styles = {
    Col: { marginBottom: "20px" },
    Card: { textAlign: "center" },
    Container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "3px",
        height: "185px",
        padding: "0",
        margin: "0",
        overflow: "hidden",
    },
    Image: { width: "75%", height: "auto", margin: "auto" },
    toastImage: { width: "20px" },
};
function ProductCard(props) {
    let [quantity, setQuantity] = useState(0);
    let [toast, setToast] = useState(false);
    let navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { data } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser ? currentUser.uid : "none",
        },
    });
    console.log("data", data);
    const [editUser] = useMutation(queries.EDIT_USER_CART);
    const dispatch = useDispatch();
    const product = props.product;
    const handleClick = () => {
        if (quantity > product.quantity) {
            alert(`Only ${product.quantity} quantity of ${product.name} is left in stock. Please choose a smaller value.`);
            setQuantity(0);
            return;
        }
        if (currentUser) {
            const { getUser } = data;
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
        <Col style={styles.Col}>
            <Card style={styles.Card}>
                <Container style={styles.Container}>
                    <Card.Img src={product.image} alt={product.name} style={styles.Image} />
                </Container>
                <Card.Body>
                    <Link className="btn btn-light" to={`/product/${product._id}`} role="button">
                        {product.name}
                    </Link>
                    <Card.Text>Price : ${product.price}.00</Card.Text>
                    <Button
                        size="sm"
                        className="btn btn-light"
                        onClick={() => {
                            quantity === 0 ? setQuantity(0) : setQuantity(quantity - 1);
                        }}
                    >
                        -
                    </Button>
                    <span>{quantity}</span>
                    <Button size="sm" className="btn btn-light" onClick={() => setQuantity(quantity + 1)}>
                        +
                    </Button>
                    {quantity > 0 ? (
                        <Button className="btn btn-primary" size="sm" onClick={handleClick}>
                            Add to Cart
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" size="sm" disabled>
                            Add to Cart
                        </Button>
                    )}
                    <Toast onClose={() => setToast(false)} show={toast} delay={2000} autohide>
                        <Toast.Header>
                            <img
                                src="https://iconarchive.com/download/i48706/custom-icon-design/pretty-office-2/success.ico"
                                className="rounded me-2"
                                alt=""
                                style={styles.toastImage}
                            />
                            <strong className="me-auto">Success</strong>
                        </Toast.Header>
                        <Toast.Body>{`${product.name} added to your cart`}</Toast.Body>
                    </Toast>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;
