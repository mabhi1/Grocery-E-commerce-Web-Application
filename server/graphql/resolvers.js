const mongoCollections = require('../config/mongoCollection');
const uuid = require('uuid');

const productCollection = mongoCollections.products;

const resolvers = {
    Query: {
        product: async (_, args) => {
            const products = await productCollection();
            const product = await products.findOne({_id: args._id});
            return product;
        },
        products: async () => {
            const products = await productCollection();
            const allProducts = await products.find({}).toArray();
            return allProducts;
        }
    },

    Mutation: {
        addProduct: async (_, args) => {
            const products = await productCollection();
            const newProduct = {
                _id: uuid.v4(), 
                name : args.name,
                description: args.description,
                price : args.price,
                category : args.category,
                quantity : args.quantity,
            };
            await products.insertOne(newProduct);
            return newProduct;
        },
    }
}

module.exports = resolvers;