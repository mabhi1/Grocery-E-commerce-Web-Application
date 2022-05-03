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
    query ($id: String) {
        product(_id: $id) {
            _id
            name
            description
            price
            category
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

const DELETE_PRODUCT = gql`
    mutation Mutation($id: String!) {
        deleteProduct(_id: $id) {
            _id
            name
            description
            price
            category
            quantity
        }
    }
`;

const EDIT_PRODUCT = gql`
    mutation Mutation($id: String!, $name: String, $price: Int, $quantity: Int, $description: String, $category: String) {
        editProduct(_id: $id, name: $name, price: $price, quantity: $quantity, description: $description, category: $category) {
            _id
            name
            description
            price
            category
            quantity
        }
    }
`;

const ADD_REVIEW = gql`
    mutation Mutation($productId: String!, $review: String!) {
        addReview(productId: $productId, review: $review){
            productId
            review
        }
    }
`;

const REVIEW_BY_ID = gql`
    query ($id: String){
        getReview(_id: $id){
            review
        }
    }
`;

const ALL_REVIEWS_PRODUCT = gql`
    query ($id: String){
        product_Reviews(_id: $id){
            review
        }
    }
`;
let exported = {
    GET_PRODUCTS_BY_ID,
    GET_PRODUCTS_NAME_PRICE,
    ADD_PRODUCT,
    GET_ALL_PRODUCTS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    ADD_REVIEW,
    REVIEW_BY_ID,
    ALL_REVIEWS_PRODUCT
};

export default exported;
