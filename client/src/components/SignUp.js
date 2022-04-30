import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { createUser } from "../Firebase/FirebaseFunctions";
import { AuthContext } from "../Firebase/Auth";
import SocialSignIn from "./SocialSignIn";
import { Alert, Container } from "react-bootstrap";
//import { useMutation } from "@apollo/client";
//import queries from "../queries";

function SignUp() {
  // const [addUser] = useMutation(queries.CREATE_USER, {
  //   refetchQueries: [{ query: queries.GET_USERS }],
  // });
  let navigate = useNavigate();

  let name = useRef();
  // let phoneNumber;
  let email = useRef();
  let passRef = useRef();
  let confPassRef = useRef();
  // let address1Ref;
  //let address2Ref;
  //let cityRef;
  //let address;
  //const stateRef = useRef();
  //let zipRef;
  //let _id;

  //console.log(JSON.stringify(nameRef));
  // console.log(phoneNumber);
  // console.log(email);
  // console.log(passRef);
  // console.log(confPassRef);
  // console.log(address1Ref);
  // console.log(address2Ref);
  // console.log(cityRef);
  // console.log(zipRef);

  // get current user
  //console.log(stateRef);
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  //this is for toggling state of usa
  //const [state, setState] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    //const displayName = e.target.elements.displayName.value;
    let displayName = name.current.value;
    console.log(displayName);
    //const { email, passwordOne, passwordTwo } = e.target.elements;
    if (passRef.current.value !== confPassRef.current.value) {
      setPwMatch("Passwords do not match");
      return false;
    }

    try {
      await createUser(email.current.value, passRef.current.value, displayName);
      navigate("/userDetail");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(currentUser);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "600px" }}>
          <h1 className="page-header">Sign up</h1>
          {pwMatch && (
            <Alert variant="danger" className="error">
              {pwMatch}
            </Alert>
          )}
          <form onSubmit={handleSignUp} className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label> Name:</label>
                <input className="form-control" required name="displayName" type="text" placeholder="Name" ref={name} />
              </div>
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                className="form-control"
                required
                name="email"
                type="email"
                placeholder="Email"
                // ref={(node) => {
                //   email = node;
                // }}
                ref={email}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                // ref={(node) => {
                //   passRef = node;
                // }}
                ref={passRef}
                className="form-control"
                id="passwordOne"
                name="passwordOne"
                type="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                // ref={(node) => {
                //   confPassRef = node;
                // }}
                ref={confPassRef}
                className="form-control"
                name="passwordTwo"
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="inputAddress">Phone Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                required
                className="form-control"
                id="inputPhone"
                placeholder="123-456-7890"
                ref={(node) => {
                  phoneNumber = node;
                }}
              />
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                required
                id="inputAddress"
                placeholder="1234 Main St"
                ref={(node) => {
                  address1Ref = node;
                }}
              />
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="inputAddress2">Address Line 2</label>
              <input
                type="text"
                className="form-control"
                required
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                ref={(node) => {
                  address2Ref = node;
                }}
              />
            </div> */}

            {/* <div className="form-group ">
              <label htmlFor="inputCity">City</label>
              <input
                type="text"
                placeholder="Input City"
                required
                className="form-control"
                id="inputCity"
                ref={(node) => {
                  cityRef = node;
                }}
              />
            </div> */}
            {/* <div className="form-group ">
              <label htmlFor="inputState">State</label>
              <select id="inputState" className="form-control" value={state} onChange={(e) => setState(e.target.value)}>
                <option defaultValue>Choose...</option>
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
              </select>
              <h1>{state}</h1>
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="inputZip">Zip</label>
              <input
                type="text"
                pattern="[0-9]*"
                placeholder="Enter Zip"
                className="form-control"
                id="inputZip"
                ref={(node) => {
                  zipRef = node;
                }}
              />
            </div> */}
            {/* </div> */}

            {/* //TODO Sumbit Button */}
            <button
              id="submitButton"
              type="submit"
              // onClick={(e) => {
              //   e.preventDefault();
              //   addUser(
              //    // (_id = currentUser.uid),
              //     (name = name.value),
              //     (email = email.value),
              //     (phoneNumber = phoneNumber.value),
              //     (address = address1Ref.value + " " + address2Ref.value + " " + cityRef.value + " " + state + " " + zipRef.value)
              //   );
              // }}
              name="submitButton"
              className="btn btn-warning"
            >
              Sign Up
            </button>
          </form>
          <div className="w-100 text-center mt-3">
            UserDetailPage <Link to="/userDetail">Click Here</Link>
          </div>
          <br />
          <SocialSignIn />
        </div>
      </Container>
    </>
  );
}

export default SignUp;
