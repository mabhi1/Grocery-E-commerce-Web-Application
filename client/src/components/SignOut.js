import { dosignOut } from "../Firebase/FirebaseFunctions";

const SignOutButton = () => {
    return (
        <button type="button" onClick={dosignOut}>
            Sign Out
        </button>
    );
};

export default SignOutButton;
