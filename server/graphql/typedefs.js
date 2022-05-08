const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        products(page: Int): [Product]
        product(_id: String): Product
        category(category: String): [Product]
        ascCategory(category: String): [Product]
        desCategory(category: String): [Product]
        searchProducts(name: String!): [Product]
        adminProducts: [Product]
        numberOfProducts: Int

        getUser(_id: String): User
        getAllUsers: [User]

        userOrders(userId: String): [Order]
        getAllOrders: [Order]
        order(_id: String): Order
        orderStatus(status: String): [Order]
        reviews: [Review]
        userReview(userId: String): [Review]
        productReview(productId: String): [Review]
        review(_id: String!): Review

        session(_id: String!): Session
    }

    type Session {
        _id: String
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
        userEmail: String
        total: Int
        products: [Prod]
        status: String
        createdAt: String
    }

    type Prod {
        _id: String
        name: String
        image: String
        description: String
        price: Int
        category: String
        orderedQuantity: Int
    }

    input Pro {
        _id: String
        image: String
        name: String
        description: String
        price: Int
        category: String
        orderedQuantity: Int
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
        image: String
        name: String
        price: Int
        quantity: Int
    }

    type Deleted {
        deleted: Boolean
    }

    input Cart {
        _id: String
        image: String
        name: String
        price: Int
        quantity: Int
    }

    type Mutation {
        addProduct(name: String!, image: String, description: String, price: Int!, category: String!, quantity: Int!): Product

        addReview(userId: String!, productId: String!, review: String!, rating: Int!): Review

        editProduct(_id: String!, image: String, name: String, price: Int, quantity: Int, description: String, category: String): Product

        deleteProduct(_id: String!): Product

        deleteSession(_id: String!): Deleted

        addUser(_id: String, name: String!, email: String!, address: String!, phoneNumber: String!, createdAt: String): User

        addOrder(userId: String!, userEmail: String!, total: Int!, products: [Pro], status: String, createdAt: String, flag: Int): Order

        deleteOrder(_id: String!): Order

        editUser(_id: String!, name: String, email: String, address: String, phoneNumber: String, cart: [Cart]): User

        addSession(_id: String!): Session

        changeStatusToCompleted(_id: String!): Order

        changeStatusToDispatched(_id: String!): Order
    }
`;

module.exports = typeDefs;
