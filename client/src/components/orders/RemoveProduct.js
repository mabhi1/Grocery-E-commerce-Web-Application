import { useMutation, useQuery } from "@apollo/client";
import queries from "../../queries";

function RemoveProduct(props) {
    
    const [editProduct] = useMutation(queries.EDIT_PRODUCT);
    let { loading, error, data } = useQuery(queries.GET_PRODUCTS_BY_ID, {
        fetchPolicy: "network-only",
        variables: {
            _id: props.id,
        },
    });
    if (error) {
        return <h1> error</h1>;
    } else if (loading) {
        return <h1> loading</h1>;
    } else if (data) {
        let a = data.quantity - props.quantity;
        
        editProduct({
            variables: {
                _id: props.id,
                quantity: a,
            },
        });
    }
}

export default RemoveProduct;
