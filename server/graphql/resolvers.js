const productData = require("../data/products");
const reviewData = require("../data/reviews");

const resolvers = {
    Query: {
        product: async (_, args) => {
            const products = await productData.getProductById(args);
            return products;
        },
        products: async () => {
            const products = await productData.getAllProducts();
            return products;
        },
        category: async (_, args) => {
            const products = await productData.findByCategory(args);
            return products;
        },
        ascCategory: async (_, args) => {
            const products = await productData.sortAscByCategory(args);
            return products;
        },
        desCategory: async (_, args) => {
            const products = await productData.sortDesByCategory(args);
            return products;
        },
        getReview : async (_, args) => {
            const reviewInfo = await reviewData.getReviewById(args);
            return reviewInfo;
        },
        product_Reviews : async (_, args) => {
            const all_reviews = await reviewData.getAllReviews_Product(args);
            return all_reviews;
        }
    },

    Mutation: {
        addProduct: async (_, args) => {
            const newProduct = await productData.createProduct(args);
            return newProduct;
        },

        editProduct: async (_, args) => {
            const newProduct = await productData.editProduct(args);
            return newProduct;
        },

        deleteProduct: async (_, args) => {
            const product = await productData.deleteProduct(args);
            return product;
        },
        
        addReview: async (_, args) => {
            const new_review = await reviewData.createReview(args);
            return new_review;
        }
    },
};

module.exports = resolvers;
