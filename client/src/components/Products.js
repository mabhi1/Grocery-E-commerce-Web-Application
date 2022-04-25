import React from "react";
import queries from "../queries";
import { useQuery } from "@apollo/client";

function Products() {
    let { loading, error, data } = useQuery(queries.GET_PRODUCTS_NAME_PRICE, { fetchPolicy: "cache-and-network" });
    console.log(data);
    if (data) {
        const { products } = data;
        const createCard = (product) => {
            let quantity = 0;
            return (
                <div key={product.name} className="card" style={{ width: "14rem", textAlign: "center" }}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                        className="card-img-top"
                        alt={product.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.price}</p>
                        <button className="btn btn-primary btn-sm">-</button>
                        <span>{quantity}</span>
                        <button className="btn btn-primary btn-sm">+</button>
                        <button className="btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                </div>
            );
        };
        const cards = products.map((product) => {
            return createCard(product);
        });
        return (
            <div>
                <div style={{ display: "flex" }}>{cards}</div>
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default Products;
