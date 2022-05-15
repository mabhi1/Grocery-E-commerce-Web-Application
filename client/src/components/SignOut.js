import { dosignOut } from "../Firebase/FirebaseFunctions";
import { Button } from "react-bootstrap";

const SignOutButton = () => {
    return (
        <Button variant="danger" type="button" onClick={dosignOut} className="sign-out">
            Sign Out
        </Button>
    );
};

export default SignOutButton;
