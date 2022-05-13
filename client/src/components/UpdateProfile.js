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
    //const [state, setState] = useState("");
    const name = useRef();
    const addressStreet = useRef();
    const apartment = useRef();
    const city = useRef();
    const state = useRef();
    const zip = useRef();
    const phoneNumber = useRef();
    const [userId] = useState(currentUser.uid);

    const [editUser] = useMutation(queries.EDIT_USER, {
        fetchPolicy: "network-only",
    });

    console.log(currentUser.uid);
    const { data, error, loading } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: userId,
        },
    });

    console.log(data);

    if (data) {
        return (
            <>
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                    <div className="w-100" style={{ maxWidth: "600px" }}>
                        <Form>
                            {/* //!Jumbotron for user Detail */}
                            <div className="jumbotron jumbotron-fluid" style={{ backgroundColor: "#F0F8FF", borderRadius: "20px", color: "black" }}>
                                <div className="container">
                                    <h1 className="display-4">Hello, {currentUser.displayName} </h1>
                                    <p className="lead">Please choose fields you want to update</p>
                                </div>
                            </div>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={name} defaultValue={currentUser.displayName} placeholder="Enter Name" />
                            </Form.Group>
                            <FormLabel>Phone Number</FormLabel>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">+1</InputGroup.Text>
                                <Form.Control
                                    ref={phoneNumber}
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    className="form-control"
                                    id="inputPhone"
                                    placeholder="Enter Phone Number"
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
                                    ref={addressStreet}
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
                                    ref={apartment}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        defaultValue={data.getUser.city}
                                        className="form-control"
                                        id="inputCity"
                                        ref={city}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Select ref={state}>
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
                                        ref={zip}
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
                                onClick={async (e) => {
                                    if(phoneNumber.current.value.length !== 10){
                                        alert("Please enter a valid phone number");
                                        return;
                                    }
                                    if(!name.current.value){
                                        alert("Please enter a valid name");
                                        return;
                                    }
                                    if(zip.current.value.length !== 5){
                                        alert("Please enter a valid zip code");
                                        return;
                                    }
                                    e.preventDefault();
                                    try {
                                        await updateName(name.current.value);
                                    } catch (e) {
                                        console.log("error updating name");
                                    }

                                    try {
                                        editUser({
                                            variables: {
                                                _id: currentUser.uid,
                                                name: name.current.value,
                                                addressStreet: addressStreet.current.value,
                                                apt: apartment.current.value,
                                                city: city.current.value,
                                                state: state.current.value,
                                                zip: zip.current.value,
                                                phoneNumber: phoneNumber.current.value,
                                            },
                                        });
                                    } catch (e) {
                                        console.log("error updating user");
                                    }

                                    alert("user updated successfully");

                                    navigate("/account");
                                }}
                            >
                                Submit
                            </Button>
                            <Button onClick={() => navigate("/account")}>Cancel</Button>
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
