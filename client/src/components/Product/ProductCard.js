import React, { useContext, useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../../actions";
import { AuthContext } from "../../Firebase/Auth";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../../queries";

function ProductCard(props) {
    let [quantity, setQuantity] = useState(0);
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
        if (currentUser) {
            const { getUser } = data;
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
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ProductCard;
