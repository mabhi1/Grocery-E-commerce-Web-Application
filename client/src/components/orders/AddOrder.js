import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { useContext } from "react";

function AddOrder() {
    const d = new Date();
    let text = d.toString();
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

    const [addOrder] = useMutation(queries.ADD_ORDER);
    const [editUser] = useMutation(queries.EDIT_USER_CART);

    if (error) {
        return <h1> error</h1>;
    } else if (loading) {
        return <h1> loading</h1>;
    } else if (data && getUserOrders.data && currentUser && data.getUser.cart.length > 0) {
        let newCart = [];
        for (let i = 0; i < data.getUser.cart.length; i++) {
            newCart.push({ quantity: data.getUser.cart[i].quantity, _id: data.getUser.cart[i]._id });
        }

        editUser({
            variables: {
                id: currentUser.uid,
                cart: [],
            },
        });

        addOrder({
            variables: {
                userId: currentUser.uid,
                status: "ordered",
                createdAt: text,
                products: newCart,
                flag: getUserOrders.data.userOrders.length + 1,
            },
        });
    }
}
export default AddOrder;
