import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000",
    }),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <header className="App-header">Asian Market</header>
                </div>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/products" element={<Products />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
