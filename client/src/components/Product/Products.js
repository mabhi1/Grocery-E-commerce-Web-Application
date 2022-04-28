import React, { useState } from "react";
import queries from "../../queries";
import { useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import ProductList from "./ProductList";
import { useDispatch } from "react-redux";
import actions from "../../actions";

function Products() {
    let name;
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("null");
    const [sortProducts, setSortProducts] = useState(false);
    const { loading, error, data } = useQuery(queries.GET_PRODUCTS_NAME_PRICE, { fetchPolicy: "cache-and-network" });
    const searchData = useQuery(queries.SEARCH_PRODUCTS, { variables: { name: searchTerm } });
    let searchResults = searchData.data && searchData.data.searchProducts;
    const handleChange = () => {
        let check = document.getElementById("sortByPrice");
        setSortProducts(check.checked);
    };
    if (searchResults) {
        dispatch(actions.showProducts(searchResults));
        return (
            <div>
                <div className="page-header">Products</div>
                <div className="product-header">
                    <div className="search-div">
                        <input ref={(node) => (name = node)} type="text" placeholder="Search Products" />
                        <Button onClick={() => setSearchTerm(name.value.toString())} size="sm" variant="primary">
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setSearchTerm("null");
                                name.value = "";
                            }}
                            size="sm"
                            variant="primary"
                        >
                            Clear
                        </Button>
                    </div>
                    <div className="sort-product">
                        <input type="checkbox" name="sortByPrice" id="sortByPrice" onChange={handleChange} /> Sort by Price
                    </div>
                </div>
                <ProductList sort={sortProducts} />
            </div>
        );
    }
    if (data) {
        let { products } = data;
        dispatch(actions.showProducts(products));
        return (
            <div>
                <div className="page-header">Products</div>
                <div className="product-header">
                    <div className="search-div">
                        <input ref={(node) => (name = node)} type="text" placeholder="Search Products" />
                        <Button onClick={() => setSearchTerm(name.value.toString())} size="sm" variant="primary">
                            Search
                        </Button>
                    </div>
                    <div className="sort-product">
                        <input type="checkbox" name="sortByPrice" id="sortByPrice" onChange={handleChange} /> Sort by Price
                    </div>
                </div>
                <ProductList sort={sortProducts} />
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default Products;
