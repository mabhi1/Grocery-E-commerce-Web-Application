import React from "react";
import queries from "../../queries";
import { useQuery } from "@apollo/client";
import Row from "react-bootstrap/Row";
import ProductCard from "./ProductCard";

function Products() {
    let { loading, error, data } = useQuery(queries.GET_PRODUCTS_NAME_PRICE, { fetchPolicy: "cache-and-network" });
    if (data) {
        const { products } = data;
        const createCard = (product) => {
            return <ProductCard product={product} key={product.name} />;
        };
        const cards = products.map((product) => {
            return createCard(product);
        });
        return (
            <div>
                <div className="page-header">Products</div>
                <Row xs={2} md={4} lg={6} xl={12} className="m-1">
                    {cards}
                </Row>
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default Products;
