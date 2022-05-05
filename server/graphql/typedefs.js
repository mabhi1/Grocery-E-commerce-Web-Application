const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        products(page: Int): [Product]
        product(_id: String): Product
        category(category: String): [Product]
        ascCategory(category: String): [Product]
        desCategory(category: String): [Product]
        getUser(_id: String): User
        getAllUsers: [User]
        searchProducts(name: String!): [Product]
        userOrders(userId: String): [Order]
        getAllOrders(_id: String): [Order]
        order(_id: String): Order
        adminProducts: [Product]
        numberOfProducts: Int
        reviews: [Review]
        userReview(userId: String): [Review]
        productReview(productId: String): [Review]
        review(_id: String!): Review
    }

    type Review {
        _id: String
        userId: String
        productId: String
        review: String
        rating: Int
    }

    type Order {
        _id: String
        userId: String
        products: [Product]
        status: String
        createdAt: String
    }

    input Pro {
        _id: String
        name: String
        description: String
        price: Int
        category: String
        quantity: Int
    }

    type Product {
        _id: String
        name: String
        image: String
        description: String
        price: Int
        category: String
        quantity: Int
    }

    type User {
        _id: String
        name: String
        email: String
        address: String
        phoneNumber: String
        cart: [CartProduct]
        createdAt: String
    }

    type CartProduct {
        _id: String
        name: String
        price: Int
        quantity: Int
    }

    input Cart {
        _id: String
        name: String
        price: Int
        quantity: Int
    }

    type Mutation {
        addProduct(name: String!, image: String, description: String, price: Int!, category: String!, quantity: Int!): Product

        addReview(userId: String!, productId: String!, review: String!, rating: Int!): Review

        editProduct(_id: String!, name: String, price: Int, quantity: Int, description: String, category: String): Product

        deleteProduct(_id: String!): Product

        addUser(_id: String, name: String!, email: String!, address: String!, phoneNumber: String!, createdAt: String): User

        addOrder(userId: String!, products: Pro, status: String, createdAt: String): Order

        deleteOrder(_id: String!): Order

        editUser(_id: String!, name: String, email: String, address: String, phoneNumber: String, cart: [Cart]): User
    }
`;

module.exports = typeDefs;
