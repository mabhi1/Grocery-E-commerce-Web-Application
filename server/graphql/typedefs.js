const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        products: [Product]
        product(_id: String): Product
        category(category: String): [Product]
        ascCategory(category: String): [Product]
        desCategory(category: String): [Product]
        getUser(_id: String): User
        getAllUsers: [User]
        searchProducts(name: String!): [Product]
    }

    type Product {
        _id: String
        name: String
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
        createdAt: String
    }

    type Mutation {
        addProduct(name: String!, description: String, price: Int!, category: String!, quantity: Int!): Product

        editProduct(_id: String!, name: String, price: Int, quantity: Int, description: String, category: String): Product

        deleteProduct(_id: String!): Product

        addUser(_id: String, name: String!, email: String!, address: String!, phoneNumber: String!, createdAt: String): User
    }
`;

module.exports = typeDefs;
