import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";
import { useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "../../actions";



function AddOrder() {
  const d = new Date();
  let text = d.toString();
  const { currentUser } = useContext(AuthContext);
  
  const { data, loading, error } = useQuery(queries.GET_USER_BY_ID, {
    fetchPolicy: "cache-and-network",
    variables: {
        id: currentUser.uid
    },
});
const [addOrder] = useMutation(queries.ADD_ORDER); 
useEffect(() => {
    console.log('hi')
})
if(error) {
    return <h1> error</h1>;
   }
   
if(loading) {
    return <h1> loading</h1>;
   }
if (data){
let newCart = []
for(let i=0; i< data.getUser.cart.length; i++){
    newCart.push({quantity: data.getUser.cart[i].quantity, _id: data.getUser.cart[i]._id})
}
console.log(newCart)
  addOrder({
    variables: {
        userId: currentUser.uid, status: 'ordered', createdAt: text, products: newCart
    }
  });
  console.log("hello")
}
}
export default AddOrder;