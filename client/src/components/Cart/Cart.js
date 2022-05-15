import { useQuery, useMutation } from "@apollo/client";
import React, { useContext, useEffect } from "react";

import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import CartCards from "./CartCards";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
    totalPrice: {
        float: "left",
        width: "80%",
        textAlign: "right",
        lineHeight: "2.5em",
        borderTop: "1px solid #0d6efd24",
        paddingRight: "28px",
        marginLeft: "60px",
        borderBottom: "1px solid #0d6efd24",
        fontFamily: "auto",
        fontSize: "large",
    },
};

function Cart() {
    let totalPrice = 0;
    let navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { data, loading } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser ? currentUser.uid : "none",
        },
    });
    useEffect(() => {
        if (data) {
            if (!data.getUser) {
                navigate("/userDetail");
            }
        } else if (!loading) {
            navigate("/userDetail");
        }
    });
    const [error, setError] = useState(false);

    const [editUser] = useMutation(queries.EDIT_USER_CART);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleClick = (id) => {
        if (currentUser) {
            const { getUser } = data;
            let newCart = [];
            if (getUser.cart.length > 0) {
                for (let item of getUser.cart) {
                    if (item._id !== id) {
                        newCart.push({ _id: item._id, image: item.image, name: item.name, price: item.price, quantity: item.quantity });
                    }
                }
            }
            editUser({
                variables: {
                    id: getUser._id,
                    cart: newCart,
                },
            });
        } else {
            dispatch(actions.removeProduct(id));
        }
    };
    const buildCard = (product) => {
        totalPrice += product.price * product.quantity;
        return <CartCards product={product} handleClick={handleClick} key={product._id} setError={setError} />;
    };

    return (
        <div>
            <div
                className="jumbotron jumbotron-fluid"
                style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black", marginBottom: "30px" }}
            >
                <div className="container">
                    <h1 className="display-4">Cart</h1>
                </div>
            </div>
            {data?.getUser && data.getUser.cart.length > 0 ? (
                <div>
                    <div style={{ marginBottom: "25px" }}>
                        {data?.getUser ? data.getUser.cart.map((product) => buildCard(product)) : cart.map((product) => buildCard(product))}
                    </div>

                    <div style={styles.totalPrice}>Total Price : ${totalPrice}.00 </div>
                    {error ? <Button disabled>Checkout</Button> : <Button onClick={() => navigate("/checkout")}>Checkout</Button>}
                </div>
            ) : (
                <div style={{ margin: "50px", fontSize: "x-large", fontFamily: "initial" }}>Your cart is empty</div>
            )}
        </div>
    );
}

export default Cart;
