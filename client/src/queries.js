import { gql } from "@apollo/client";

const GET_PRODUCTS_NAME_PRICE = gql`
    query {
        products {
            _id
            name
            price
        }
    }
`;
const GET_PRODUCTS_BY_ID = gql`
    query {
        product(_id: $_id) {
            _id
            name
            description
            price
            quantity
        }
    }
`;
const GET_ALL_PRODUCTS = gql`
    query {
        products {
            _id
            name
            description
            price
            category
            quantity
        }
    }
`;

const ADD_PRODUCT = gql`
    mutation createProduct($name: String!, $description: String, $price: Int!, $category: String!, $quantity: Int!) {
        addProduct(name: $name, description: $description, price: $price, category: $category, quantity: $quantity) {
            name
            description
            price
            category
            quantity
        }
    }
`;

let exported = {
    GET_PRODUCTS_BY_ID,
    GET_PRODUCTS_NAME_PRICE,
    ADD_PRODUCT,
    GET_ALL_PRODUCTS,
};

export default exported;
