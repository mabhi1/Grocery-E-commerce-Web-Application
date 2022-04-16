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

const ADD_PRODUCT = gql`
    mutation createProduct($name: String!, $description: String, $price: Int!, $quantity: Int!) {
        addProdcut(name: $name, description: $description, price: $price, quantity: $quantity) {
            name
            description
            price
            quantity
        }
    }
`;

let exported = {
    GET_PRODUCTS_BY_ID,
    GET_PRODUCTS_NAME_PRICE,
    ADD_PRODUCT,
};

export default exported;
