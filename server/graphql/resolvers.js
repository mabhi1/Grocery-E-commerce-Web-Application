const productData = require("../data/products");
const userData = require("../data/users");
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
        //User queries
        getUser: async (_, args) => {
            const user = await userData.getUser(args);
            return user;
        },
        getAllUsers : async () => {
            const users = await userData.getAllUsers();
            return users;
        },  
        searchProducts: async (_, args) => {
            if (args.name === "null") return;
            const products = await productData.searchProducts(args);
            return products;
        },
        reviews : async () => {
            const reviews = await reviewData.getAllReviews();
            return reviews;
        },
        review: async (_, args) => {
            const review = await reviewData.getReviewById(args);
            return review;
        },
        userReview: async (_, args) => {
            const review = await reviewData.getReviewByUserId(args);
            return review;
        },
        productReview: async (_, args) => {
            const review = await reviewData.getReviewByProductId(args);
            return review;
        }
    },

    Mutation: {
        addProduct: async (_, args) => {
            const newProduct = await productData.createProduct(args);
            return newProduct;
        },

        addReview: async (_, args) => {
            const newReview = await reviewData.createReview(args);
            return newReview;
        },

        editProduct: async (_, args) => {
            const newProduct = await productData.editProduct(args);
            return newProduct;
        },

        deleteProduct: async (_, args) => {
            const product = await productData.deleteProduct(args);
            return product;
        },
        //User Collection
        addUser: async (_, args) => {
            const newUser = await userData.createUser(args);
            return newUser;
        },

        editUser: async (_, args) => {
            const newUser = await userData.editUser(args);
            return newUser;
        }
    },
};

module.exports = resolvers;
