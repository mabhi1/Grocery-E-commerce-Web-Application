import { gql } from "@apollo/client";

const NUMBER_OF_PRODUCTS = gql`
    query Query {
        numberOfProducts
    }
`;

const GET_USER_REVIEWS = gql`
    query Query($id: String!){
        userReviews(userId: $id){
            _id,
            review,
            rating
        }
    }
`;

const GET_PRODUCT_REVIEWS = gql`
    query Query($id: String!){
        productReview(productId: $id){
            _id,
            review,
            rating
        }
    }
`;

const GET_PRODUCTS_FOR_ADMIN = gql`
    query Query {
        adminProducts {
            _id
            name
            description
            price
            category
            quantity
        }
    }
`;

const GET_PRODUCT_BY_CATEGORY = gql`
    query Query($category: String) {
        category(category: $category) {
            _id
            name
            description
            price
            category
            quantity
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
    query Query($page: Int) {
        products(page: $page) {
            _id
            name
            image
            description
            price
            category
            quantity
        }
    }
`;

const SEARCH_PRODUCTS = gql`
    query ($name: String!) {
        searchProducts(name: $name) {
            _id
            name
            image
            price
            category
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

// GraphQL query to get all users

const CREATE_USER = gql`
    mutation Mutation($_id: String!, $name: String!, $email: String!, $address: String!, $phoneNumber: String!) {
        addUser(_id: $_id, name: $name, email: $email, address: $address, phoneNumber: $phoneNumber) {
            _id
            name
            email
            address
            phoneNumber
        }
    }
`;

const GET_USER_BY_ID = gql`
    query ($id: String) {
        getUser(_id: $id) {
            _id
            name
            email
            address
            phoneNumber
            cart {
                _id
                name
                price
                quantity
            }
            createdAt
        }
    }
`;

const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            _id
            name
            email
            address
            phoneNumber
            createdAt
        }
    }
`;

const EDIT_USER = gql`
    mutation Mutation($_id: String!, $name: String, $email: String, $address: String, $phoneNumber: String) {
        editUser(_id: $_id, name: $name, email: $email, address: $address, phoneNumber: $phoneNumber) {
            _id
            name
            email
            address
            phoneNumber
        }
    }
`;
const GET_ALL_ORDERS = gql`
    query {
        getAllOrders {
            _id
            userId
            products
            status
            createdAt
        }
    }
`;

const EDIT_USER_CART = gql`
    mutation Mutation($id: String!, $cart: [Cart]) {
        editUser(_id: $id, cart: $cart) {
            _id
            name
            email
            address
            phoneNumber
            cart {
                _id
                name
                price
                quantity
            }
        }
    }
`;

const ADD_ORDER = gql`
    mutation Mutation($userId: String!, $products: [Pro], $status: String, $createdAt: String, $flag: Int) {
        addOrder(userId: $userId, products: $products, status: $status, createdAt: $createdAt, flag: $flag) {
            _id
            userId
            products {
                _id
                name
                description
                price
                category
                quantity
            }
            status
            createdAt
        }
    }
`;

const GET_USER_ORDERS = gql`
    query Query($userId: String) {
        userOrders(userId: $userId) {
            _id
            userId
            products {
                _id
                name
                image
                description
                price
                category
                quantity
            }
            status
            createdAt
        }
    }
`;

const FILTER_ORDER = gql`
    mutation Mutation($userId: String!) {
        filterOrder(userId: $userId)
    }
`;

let exported = {
    GET_PRODUCTS_BY_ID,
    GET_PRODUCTS_FOR_ADMIN,
    ADD_PRODUCT,
    GET_ALL_PRODUCTS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    CREATE_USER,
    GET_USER_BY_ID,
    GET_ALL_USERS,
    SEARCH_PRODUCTS,
    EDIT_USER,
    EDIT_USER_CART,
    GET_PRODUCT_BY_CATEGORY,
    NUMBER_OF_PRODUCTS,
    GET_ALL_ORDERS,
    ADD_ORDER,
    GET_USER_ORDERS,
    FILTER_ORDER,
    GET_PRODUCT_REVIEWS,
    GET_USER_REVIEWS
};

export default exported;
