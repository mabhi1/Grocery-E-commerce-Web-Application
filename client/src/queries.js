import { gql } from "@apollo/client";

const NUMBER_OF_PRODUCTS = gql`
    query Query {
        numberOfProducts
    }
`;

const GET_PRODUCTS_FOR_ADMIN = gql`
    query Query {
        adminProducts {
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
            image
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
    mutation Mutation($name: String!, $price: Int!, $category: String!, $quantity: Int!, $image: String, $description: String) {
        addProduct(name: $name, price: $price, category: $category, quantity: $quantity, image: $image, description: $description) {
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
    mutation Mutation($id: String!, $name: String, $image: String, $price: Int, $quantity: Int, $description: String, $category: String) {
        editProduct(_id: $id, name: $name, image: $image, price: $price, quantity: $quantity, description: $description, category: $category) {
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

const ADD_REVIEW = gql`
    mutation Mutation($userId: String!, $userName: String!, $productId: String!, $review: String!, $rating: Int!) {
        addReview(userId: $userId, userName: $userName, productId: $productId, review: $review, rating: $rating) {
            _id
            userId
            userName
            productId
            review
            rating
        }
    }`
;

const GET_PRODUCT_REVIEW = gql`
    query Query($productId: String) {
        productReview(productId: $productId) {
            _id
            userName
            userId
            productId
            review
            rating
        }
    }
`;

const DEL_REVIEW = gql`
mutation Mutation($id: String!) {
    deleteReview(_id: $id) {
      acknowledged
      deletedCount
    }
}`;

const FLAG_REVIEW = gql`
mutation Mutation($id: String, $userId: String) {
    flagReview(_id: $id, userId: $userId) {
      review_id
      flagCount
    }
  }
`;
const CREATE_USER = gql`
    mutation Mutation(
        $_id: String!
        $name: String!
        $email: String!
        $addressStreet: String!
        $apt: String!
        $city: String!
        $state: String!
        $zip: String!
        $phoneNumber: String!
    ) {
        addUser(
            _id: $_id
            name: $name
            email: $email
            addressStreet: $addressStreet
            apt: $apt
            city: $city
            state: $state
            zip: $zip
            phoneNumber: $phoneNumber
        ) {
            _id
            name
            email
            addressStreet
            apt
            city
            state
            zip
            phoneNumber
        }
    }
`;

const REVIEW_BY_ID = gql`
    query Query($id: String) {
        reviewbyId(_id: $id) {
            _id
            userId
            productId
            review
            rating
        }
    }
`;

const REVIEW_BY_USERID = gql`
    query Query($userId: String) {
        userReview(userId: $userId) {
            _id
            userName
            userId
            productId
            review
            rating
            createdAt
        }
    }
`;

const ALL_REVIEWS_PRODUCT = gql`
    query ProductReview($productId: String) {
        productReview(productId: $productId) {
            _id
            userId
            productId
            review
            rating
        }
    }
`;

const ALL_REVIEWS = gql`
    query ProductReview {
        reviews {
            _id
            userId
            productId
            review
            rating
        }
    }
`;

const GET_USER_BY_ID = gql`
    query ($id: String) {
        getUser(_id: $id) {
            _id
            name
            email
            addressStreet
            apt
            city
            state
            zip
            phoneNumber
            cart {
                _id
                image
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
            addressStreet
            apt
            city
            state
            zip
            phoneNumber
            createdAt
        }
    }
`;

const EDIT_USER = gql`
    mutation Mutation(
        $_id: String!
        $name: String
        $addressStreet: String
        $apt: String
        $city: String
        $state: String
        $zip: String
        $phoneNumber: String
    ) {
        editUser(_id: $_id, name: $name, addressStreet: $addressStreet, apt: $apt, city: $city, state: $state, zip: $zip, phoneNumber: $phoneNumber) {
            _id
            name
            addressStreet
            apt
            city
            state
            zip
            phoneNumber
            cart {
                _id
                image
                name
                price
                quantity
            }
            createdAt
        }
    }
`;

const GET_ALL_ORDERS = gql`
    query Query {
        getAllOrders {
            _id
            userId
            userEmail
            total
            products {
                _id
                name
                image
                description
                price
                category
                orderedQuantity
            }
            flag
            status
            createdAt
            zip
            state
            city
            apt
            addressStreet
        }
    }
`;

const EDIT_USER_CART = gql`
    mutation Mutation($id: String!, $cart: [Cart]) {
        editUser(_id: $id, cart: $cart) {
            _id
            cart {
                _id
                image
                name
                price
                quantity
            }
        }
    }
`;

const ADD_ORDER = gql`
    mutation Mutation(
        $userId: String!
        $userEmail: String!
        $total: Int!
        $state: String
        $zip: String
        $apt: String
        $city: String
        $products: [Pro]
        $status: String
        $createdAt: String
        $flag: Int
        $addressStreet: String
    ) {
        addOrder(
            userId: $userId
            userEmail: $userEmail
            total: $total
            state: $state
            zip: $zip
            apt: $apt
            city: $city
            products: $products
            status: $status
            createdAt: $createdAt
            flag: $flag
            addressStreet: $addressStreet
        ) {
            _id
            userId
            userEmail
            total
            products {
                _id
                name
                image
                description
                price
                category
                orderedQuantity
            }
            flag
            status
            createdAt
            addressStreet
            zip
            apt
            city
            state
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
                description
                price
                category
                orderedQuantity
            }
            status
            createdAt
            flag
            total
        }
    }
`;

const FILTER_ORDER = gql`
    mutation Mutation($userId: String!) {
        filterOrder(userId: $userId)
    }
`;

const ADD_SESSION = gql`
    mutation Mutation($id: String!) {
        addSession(_id: $id) {
            _id
        }
    }
`;

const GET_SESSION = gql`
    query Query($id: String!) {
        session(_id: $id) {
            _id
        }
    }
`;

const DELETE_SESSION = gql`
    mutation Mutation($id: String!) {
        deleteSession(_id: $id) {
            deleted
        }
    }
`;

const COMPLETE_STATUS = gql`
    mutation Mutation($id: String!) {
        changeStatusToCompleted(_id: $id) {
            _id
            userId
            userEmail
            total
            status
            createdAt
        }
    }
`;

const DISPATCH_STATUS = gql`
    mutation Mutation($id: String!) {
        changeStatusToDispatched(_id: $id) {
            _id
            userId
            userEmail
            total
            status
            createdAt
        }
    }
`;

const GET_ORDER_BY_ID = gql`
    query Query($id: String) {
        order(_id: $id) {
            _id
            userId
            userEmail
            total
            products {
                _id
                name
                image
                description
                price
                category
                orderedQuantity
            }
            flag
            status
            createdAt
        }
    }
`;

let exported = {
    GET_PRODUCTS_BY_ID,
    GET_PRODUCTS_FOR_ADMIN,
    ADD_PRODUCT,
    GET_ALL_PRODUCTS,
    DELETE_PRODUCT,
    EDIT_PRODUCT,
    ADD_REVIEW,
    DEL_REVIEW,
    FLAG_REVIEW,
    REVIEW_BY_ID,
    REVIEW_BY_USERID,
    ALL_REVIEWS_PRODUCT,
    ALL_REVIEWS,
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
    ADD_SESSION,
    GET_SESSION,
    DELETE_SESSION,
    DISPATCH_STATUS,
    COMPLETE_STATUS,
    GET_ORDER_BY_ID,
    GET_PRODUCT_REVIEW,
};

export default exported;
