import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../Firebase/Auth";
import queries from "../../queries";

import { useContext } from "react";



function UserOrders() {
  
  const { currentUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(queries.GET_ORDERS_BY_USERID , { variables: { userId: currentUser.uid } });

  if(error) {
    return <h1> error</h1>;
   }
   
   if(loading) {
    return <h1> loading</h1>;
   }
  
 
  return (
    <div className="App">
      
      {data.userOrders.map((data) => (
        <>
          
			<p>{data._id}</p>	
            <p>{data.status}</p>	
            <p>{data.createdAt}</p>	
            <br/>
            <br/>
            
			
          
          </>
        
      ))}
      
    
    </div>
  );
}

export default UserOrders;