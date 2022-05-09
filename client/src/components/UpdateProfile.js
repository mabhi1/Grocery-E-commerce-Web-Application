import React, { useContext, useState, useRef } from "react";
import { Container, Form, Button, Row, Col, InputGroup, FormLabel } from "react-bootstrap";
import { AuthContext } from "../Firebase/Auth";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { updateName } from "../Firebase/FirebaseFunctions";


const UserDetailPage = () => {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [state, setState] = useState("");
  const name = useRef();
  const [userId] = useState(currentUser.uid);
  //const [name] = useState(currentUser.displayName);

  // const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // const [addUser] = useMutation(queries.CREATE_USER, {
  //     fetchPolicy: "network-only",
  // });

  const [editUser] = useMutation(queries.EDIT_USER, {
    fetchPolicy: "network-only",
    });



  // function alertBox() {
  //   alert("user added successfully" + name + address1 + address2 + city + zip + phoneNumber + state + currentUser.email);
  // }

  //let _id;
  //let name;
  //let email;
  //let address;
  //let phoneNumber;
console.log(currentUser.uid);
  const { data, error, loading } = useQuery(queries.GET_USER_BY_ID, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: userId,
    },
  });

  console.log(data);

  const handleSubmit = async  (e) => {
    e.preventDefault();
    try{
       await updateName(name.current.value);
    }catch(e){
        console.log("error updating name");
    }

    try{
   
    editUser({
        variables: {
            _id: currentUser.uid,
            name: name.current.value,
            addressStreet: address1 ,
            apt: address2 ,
            city: city ,
            state: state ,
            zip: zip ,
            phoneNumber: phoneNumber
            
        },
    });
    }catch(e){
        console.log("error updating user");
    } 
    
    alert("user updated successfully");

    navigate("/account");

  }



  if (data) {
    return (
      <>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "600px" }}>
            <Form onSubmit={handleSubmit}>
              {/* <p>{JSON.stringify(currentUser.displayName)}</p> */}
              {/* //!Jumbotron for user Detail */}
              <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black" }}>
                <div className="container">
                  <h1 className="display-4">Welcome, {currentUser.displayName} </h1>
                  <p className="lead">Please choose fields you want to update</p>
                </div>
              </div>
              {/* <Row className="mb-3">
            
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row> */}
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref = {name} defaultValue ={currentUser.displayName}  placeholder="Enter Name" />
              </Form.Group>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">+1</InputGroup.Text>
                <Form.Control
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="tel"
                  pattern="[0-9]{10}"
                  className="form-control"
                  id="inputPhone"
                  placeholder= "Enter Phone Number"
                  defaultValue={data.getUser.phoneNumber}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  defaultValue={data.getUser.addressStreet}
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  defaultValue={data.getUser.apt}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder= "Enter City"
                    defaultValue={data.getUser.city}
                    className="form-control"
                    id="inputCity"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>State</Form.Label>
                  <Form.Select value={state} onChange={(e) => setState(e.target.value)}>
                    <option defaultValue>{data.getUser.state}</option>
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="Delaware">Delaware</option>
                    <option value="District Of Columbia">District Of Columbia</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="New York">New York</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                  </Form.Select>
                  {/* <p>{state}</p> */}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    onChange={(e) => setZip(e.target.value)}
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Enter Zip"
                    defaultValue={data.getUser.zip}
                    className="form-control"
                    id="inputZip"
                  />
                </Form.Group>
              </Row>

              <Button
                variant="primary"
                type="submit"
                name="submitButton"

                // onClick={(e) => {
                //     e.preventDefault();
                //     try {
                //         if (address1 && address2 && city && state && zip && phoneNumber) {
                //             addUser({
                //                 variables: {
                //                     _id: currentUser.uid,
                //                     name: name || "test",
                //                     email: currentUser.email,
                //                     address: address1 + ", " + address2 + ", " + city + ", " + state + ", " + zip,
                //                     phoneNumber: phoneNumber,
                //                 },
                //             });
                //             setAddress1("");
                //             setAddress2("");
                //             setCity("");
                //             setState("");
                //             setZip("");
                //             setPhoneNumber("");
                //             navigate("/");
                //         } else {
                //             alert("Please fill out all fields");
                //         }
                //     } catch (err) {
                //         console.log(err);
                //     }
                // }}

                // onClick={(e) => {
                //   e.preventDefault();
                //   alertBox();
                // }}

                
              >
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </>
    );
  } else if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error...</div>;
  }
};

export default UserDetailPage;
