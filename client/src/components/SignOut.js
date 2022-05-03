import { dosignOut } from "../Firebase/FirebaseFunctions";
import { Button } from "react-bootstrap";

const SignOutButton = () => {

    
    return (
        <Button variant="danger" type="button" onClick={dosignOut}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;
