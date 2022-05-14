import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { useContext } from "react";

import { reactLocalStorage } from "reactjs-localstorage";
let add = reactLocalStorage.getObject("addressDetails");

function AddOrder() {
    const d = new Date();
    let text = d.toString();
    const [addOrder] = useMutation(queries.ADD_ORDER);
    const [editUser] = useMutation(queries.EDIT_USER_CART);

    const { currentUser } = useContext(AuthContext);

    const { data, loading, error } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "network-only",
        variables: {
            id: currentUser.uid,
        },
    });

    const getUserOrders = useQuery(queries.GET_USER_ORDERS, {
        fetchPolicy: "network-only",
        variables: {
            userId: currentUser.uid,
        },
    });

    if (error) {
        return <h1> error</h1>;
    } else if (loading) {
        return <h1> loading</h1>;
    } else if (data && getUserOrders.data && currentUser && data.getUser.cart.length > 0) {
        let newCart = [];
        let total = 0;
        for (let i = 0; i < data.getUser.cart.length; i++) {
            total += data.getUser.cart[i].price * data.getUser.cart[i].quantity;
            newCart.push({
                orderedQuantity: data.getUser.cart[i].quantity,
                _id: data.getUser.cart[i]._id,
                name: data.getUser.cart[i].name,
                image: data.getUser.cart[i].image,
                price: data.getUser.cart[i].price,
            });
        }
        addOrder({
            variables: {
                userId: currentUser.uid,
                userEmail: currentUser.email,
                status: "ordered",
                createdAt: text,
                products: newCart,
                total: total,
                flag: getUserOrders.data.userOrders.length + 1,
                zip: add.zip.val ? add.zip.val : add.zip,
                state: add.state.val ? add.state.val : add.state,
                city: add.city.val ? add.city.val : add.city,
                apt: add.apt.val ? add.apt.val : add.apt,
                addressStreet: add.addressStreet.val ? add.addressStreet.val : add.addressStreet,
            },
        });

        editUser({
            variables: {
                id: currentUser.uid,
                cart: [],
            },
        });
    }
}
export default AddOrder;
