import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import actions from "../../actions";



function AddOrder() {
  const d = new Date();
  let text = d.toString();
  const cart_products = useSelector((state) => state.cart);
  const { currentUser } = useContext(AuthContext);
  
  const { loading, error, data } = useMutation(queries.ADD_ORDER , { variables: { userId: currentUser.uid, status: 'ordered', createdAt: text, products: cart_products } });
    
  if(error) {
    return <h1> error</h1>;
   }
   
   if(loading) {
    return <h1> loading</h1>;
   }

  
    if(data){
        return (
            "Order COnfirmed"
        )
    }
  
}

export default AddOrder;