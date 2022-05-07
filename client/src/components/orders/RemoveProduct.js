import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { useContext } from "react";


function RemoveProduct (props)  {
    
    

    let getProd = useQuery(queries.GET_PRODUCTS_BY_ID, {
      fetchPolicy: "network-only",
      variables: {
        _id : props.x._id
      },
    });
    console.log(getProd.quantity)
    console.log(props.x.quantity)
    let a = getProd.quantity -props.x.quantity
    console.log(a)
    editProduct({
      variables: {
        _id : props.x._id,
        quantity: a
      },
    });
    return null;
}

export default RemoveProduct