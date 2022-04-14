const {gql} = require('apollo-server');

const typeDefs = gql`
    type Query {
        products: [Product]
        product(_id: String): Product
    }

    type Product{
        id : String
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
    }
`;

module.exports = typeDefs