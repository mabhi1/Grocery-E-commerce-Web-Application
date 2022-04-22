import "../App.css";
import Navigation from "./Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
//import Home from "./Home";
import Account from "./Account";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider } from "../Firebase/Auth";
import PrivateRoute from "./PrivateRoute";
import Products from "./Products";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navigation />
                    <Routes>
                        <Route exact path="/" element={<Products />} />
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route element={<PrivateRoute />}>
                            {/* <Route exact path="/home" element={<Home />} /> */}
                            <Route exact path="/account" element={<Account />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
