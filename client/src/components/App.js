import Navigation from "./Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./Landing";
//import Home from "./Home";
import UserDetailPage from "./UserDetailPage";
import ForgotPassword from "./ForgotPassword";
import Account from "./Account";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider } from "../Firebase/Auth";
import PrivateRoute from "./PrivateRoute";
import Products from "./Product/Products";
import Admin from "./Admin/Admin";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import Landing from "./Landing";
import IndividualProduct from "./Product/IndividualProduct";
import Cart from "./Cart/Cart";
import UpdateProfile from "./UpdateProfile";
import Success from "./Cart/Success";
import Failed from "./Cart/Failed";
import "../App.css";
import NotFound from "./NotFound";
import Checkout from "./Cart/Checkout";
import Footer from "./Footer";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000",
    }),
});

function App() {
    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <Router>
                    <div className="App">
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/products/:pageNum" element={<Products />} />
                            <Route path="/notfound" element={<NotFound />} />
                            <Route path="/product/:id" element={<IndividualProduct />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route element={<PrivateRoute />}>
                                <Route path="/update-profile" element={<UpdateProfile />} />
                                <Route path="/paymentsuccess" element={<Success />} />
                                <Route path="/paymentsuccess/:secret" element={<Success />} />
                                <Route path="/paymentfailed/:secret" element={<Failed />} />
                                <Route path="/cart" element={<Cart />} />
                                {/* <Route path="/home" element={<Home />} /> */}
                                <Route path="/userDetail" element={<UserDetailPage />} />
                                <Route path="/account" element={<Account />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/checkout" element={<Checkout />} />
                            </Route>
                        </Routes>
                    </div>
                    <Footer />
                </Router>
            </ApolloProvider>
        </AuthProvider>
    );
}

export default App;
