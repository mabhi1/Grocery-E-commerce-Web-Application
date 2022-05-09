import React, { useState } from "react";
import queries from "../../queries";
import { useQuery } from "@apollo/client";
import Button from "react-bootstrap/Button";
import ProductList from "./ProductList";
import { useDispatch } from "react-redux";
import actions from "../../actions";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Products() {
    let name;
    let filter;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pageNum } = useParams();
    const [searchTerm, setSearchTerm] = useState("null");
    const [sortProducts, setSortProducts] = useState(false);
    const [filterValue, setFilterValue] = useState(null);
    const numberOfProductsData = useQuery(queries.NUMBER_OF_PRODUCTS).data;
    const numberOfProducts = numberOfProductsData?.numberOfProducts;
    const { loading, error, data } = useQuery(queries.GET_ALL_PRODUCTS, { variables: { page: parseInt(pageNum) } });
    console.log(data);
    const searchData = useQuery(queries.SEARCH_PRODUCTS, { variables: { name: searchTerm } });
    let searchResults = searchData.data && searchData.data.searchProducts;
    const productByCategoryData = useQuery(queries.GET_PRODUCT_BY_CATEGORY, {
        variables: { category: filterValue },
    });
    let productByCategory = productByCategoryData.data && productByCategoryData.data.category;
    const handlePageChange = (data) => {
        navigate(`/products/${data.selected + 1}`, { replace: true });
    };
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
                    <div className="filter-value">
                        <Form.Label>Filter by Category : </Form.Label>
                        <Form.Select
                            type="text"
                            ref={(node) => (filter = node)}
                            onChange={() => {
                                setFilterValue(filter.value.toString());
                            }}
                            style={{ width: "50%" }}
                        >
                            <option value="all">Show All</option>
                            <option value="value1">value 1</option>
                            <option value="value2">value 2</option>
                            <option value="value3">value 3</option>
                        </Form.Select>
                    </div>
                    <div className="sort-product">
                        <Form.Check type="checkbox" name="sortByPrice" id="sortByPrice" onChange={handleChange} /> Sort by Price
                    </div>
                </div>

                <ProductList sort={sortProducts} />
            </div>
        );
    }
    if (data) {
        let { products } = data;
        console.log(productByCategory, products)
        dispatch(actions.showProducts(productByCategory?.length > 0 ? productByCategory : products));
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
                    <div className="filter-value">
                        <Form.Label>Filter by Category : </Form.Label>
                        <Form.Select
                            type="text"
                            ref={(node) => (filter = node)}
                            onChange={() => {
                                setFilterValue(filter.value.toString());
                            }}
                            style={{ width: "50%" }}
                        >
                            <option value="all">Show All</option>
                            <option value="value1">value 1</option>
                            <option value="value2">value 2</option>
                            <option value="value3">value 3</option>
                        </Form.Select>
                    </div>
                    <div className="sort-product">
                        <input type="checkbox" name="sortByPrice" id="sortByPrice" onChange={handleChange} /> Sort by Price
                    </div>
                </div>
                <ProductList sort={sortProducts} />
                {productByCategory?.length > 0 ? null : (
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={numberOfProducts / 18}
                        onPageChange={handlePageChange}
                        forcePage={parseInt(pageNum) - 1}
                        containerClassName={"pagination justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                    />
                )}
            </div>
        );
    } else if (loading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>{error.message}</div>;
    }
}

export default Products;
