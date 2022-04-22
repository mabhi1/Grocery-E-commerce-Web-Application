const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        products: [Product]
        product(_id: String): Product
        category(category: String): [Product]
        ascCategory(category: String): [Product]
        desCategory(category: String): [Product]
    }

    type Product{
        _id : String
        name : String
        description: String
        price : Int
        category : String
        quantity : Int 	

    }

    type Mutation {
        addProduct(
            name : String!
            description: String
            price : Int!
            category : String!
            quantity : Int! 
        ):  Product

        editProduct(
            _id: String!
            name: String
            price: Int
            quantity: Int
            description: String
            category: String
        ): Product
    }
`;

module.exports = typeDefs