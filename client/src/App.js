import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Home from "./components/Home";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">Asian Market</header>
            </div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<Products />} />
            </Routes>
        </Router>
    );
}

export default App;
