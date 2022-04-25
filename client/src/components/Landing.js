import React from "react";

function Landing() {
    return (
        <div>
            <img
                className="d-block w-100"
                src="https://www.pngall.com/wp-content/uploads/4/Grocery-PNG-Image.png"
                alt="banner"
                style={{ opacity: "0.9", marginTop: "-35px" }}
            />
            <div className="banner-text">
                <h1 style={{ textShadow: "2px 2px 3px #634334" }}>Asian Mart</h1>
                <div>Get the best deal and discounts on Asian groceries</div>
                <div>24 hour Free Home Delivery</div>
            </div>
        </div>
    );
}

export default Landing;
