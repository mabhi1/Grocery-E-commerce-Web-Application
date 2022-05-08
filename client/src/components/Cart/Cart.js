import { useQuery, useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../actions";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { v4 as uuid } from "uuid";
import CartCards from "./CartCards";
import { useState } from "react";

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
    let secret = uuid();
    const { currentUser } = useContext(AuthContext);
    const { data } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser ? currentUser.uid : "none",
        },
    });
    const [error, setError] = useState(false);
    const [addSession] = useMutation(queries.ADD_SESSION);
    const [editUser] = useMutation(queries.EDIT_USER_CART);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleClick = (id, err) => {
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
    const handleCheckout = () => {
        fetch("http://localhost:5000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: data?.getUser ? data.getUser.cart : cart,
                email: currentUser ? currentUser.email : undefined,
                secret: secret,
            }),
        })
            .then(async (res) => {
                if (res.ok) return res.json();
                const json = await res.json();
                return await Promise.reject(json);
            })
            .then(({ url }) => {
                window.location = url;
            })
            .catch((e) => {
                console.error(e.error);
            });
        addSession({
            variables: {
                id: secret,
            },
        });
    };
    return (
        <div>
            <div className="page-header">Cart</div>
            {cart.length > 0 || (data?.getUser && data.getUser.cart.length > 0) ? (
                <div>
                    <div style={{ marginBottom: "25px" }}>
                        {data?.getUser ? data.getUser.cart.map((product) => buildCard(product)) : cart.map((product) => buildCard(product))}
                    </div>
                    <div style={styles.totalPrice}>Total Price : {totalPrice}</div>
                    {error ? <Button disabled>Checkout</Button> : <Button onClick={handleCheckout}>Checkout</Button>}
                </div>
            ) : (
                <div style={{ margin: "50px", fontSize: "x-large", fontFamily: "initial" }}>Your cart is empty</div>
            )}
        </div>
    );
}

export default Cart;
