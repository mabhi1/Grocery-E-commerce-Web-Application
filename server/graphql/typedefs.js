const { gql } = require("apollo-server");

const typeDefs = gql`
    type Query {
        products: [Product]
        product(_id: String): Product
        category(category: String): [Product]
        ascCategory(category: String): [Product]
        desCategory(category: String): [Product]

        getReview(_id: String): productReview
        product_Reviews(_id: String): [productReview]
    }

    type Product {
        _id: String
        name: String
        description: String
        price: Int
        category: String
        quantity: Int
    }

    type productReview{
        review : String
    }

    type Review{
        _id : String
        productId : String
        review : String
    }

    type Mutation {
        addProduct(name: String!, description: String, price: Int!, category: String!, quantity: Int!): Product

        editProduct(_id: String!, name: String, price: Int, quantity: Int, description: String, category: String): Product

        deleteProduct(_id: String!): Product

        addReview( productId: String!, review: String!): Review
    }
`;

module.exports = typeDefs;
