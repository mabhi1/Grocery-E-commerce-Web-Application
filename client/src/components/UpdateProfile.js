import React, { useRef, useState, useContext } from "react";
import { Card, Form, Button,Alert, Container} from "react-bootstrap";
import { AuthContext } from "../Firebase/Auth";
import { changePassword,updateName } from "../Firebase/FirebaseFunctions";
import queries from "../queries";

import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";



const UpdateProfile = () => {

    const [editUser] = useMutation(queries.EDIT_USER,{
      fetchPolicy: "network-only"
    });

    const nameRef = useRef();
    const addressRef = useRef();
    const phoneRef = useRef();

    //const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { currentUser } = useContext(AuthContext);
    //const { currentUser,updateEmail, updatePassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log(currentUser);

    const handleSubmit = (e) => {
        e.preventDefault();
        //const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const phone = phoneRef.current.value;
        if (password !== confirmPassword) {
            // alert("Passwords do not match");
            // return;
            return setError("Passwords do not match");
        }

        const promise = [];
        setLoading(true);
        setError("");
        
        // if(email !== currentUser.email){
        //     promise.push(updateEmail(email));
        // }
        if(password !== currentUser.password){
            promise.push(changePassword(password));
        }
        if(name !== currentUser.name){
          promise.push(updateName(name));
        }


        Promise.all(promise).then(()=>{
            navigate("/");
        }).catch(()=>{
            setError("Error updating profile");
        }).finally(()=>{
            setLoading(false);
        })

    }


  return (
    <>
       <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
          <Card.Body >
          <h1 className="text-center mb-4">Update Profile</h1>
          {/* {currentUser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
         <Form onSubmit={handleSubmit}>
            {/* <Form.Group id="formBasicEmail">
                <Form.Label style={{paddingRight:"10px" , paddingLeft:"10px"}}>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
               // defaultValue={currentUser.email} 
                required ref={emailRef} />
            </Form.Group> */}
            <Form.Group id="formBasic">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Leave Blank to keep the same" ref={nameRef} />
            </Form.Group>
            <Form.Group id="formBasicPass">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Leave Blank to keep the same"  ref={passwordRef} />
            </Form.Group>
            <Form.Group id="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Leave Blank to keep the same"  ref={confirmPasswordRef} />
            </Form.Group>
            <Form.Group id="formChangeNumber">
                <Form.Label>Phone: </Form.Label>
                <Form.Control type="tel" placeholder="Leave Blank to keep the same" ref ={phoneRef} />
            </Form.Group>
            <Form.Group id="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Leave Blank to keep the same" ref={addressRef}  />
            </Form.Group>
         

            <Button disabled={loading} variant="primary" type="submit" className="w-100">Update</Button>
         </Form>

      </Card>
      <div className="w-100 text-center mt-2">
          <Link to="/">Cancel</Link>
      </div>
      </div>
      </Container>
    </>
  );
};

export default UpdateProfile;
