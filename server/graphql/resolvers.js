const productData = require("../data/products");
const userData = require("../data/users");
const reviewData = require("../data/reviews");

const resolvers = {
    Query: {
        
        //--------------------PRODUCT FUNCTIONS---------------------//
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
        searchProducts: async (_, args) => {
            if (args.name === "null") return;
            const products = await productData.searchProducts(args);
            return products;
        },

        //------------------USER FUNCTIONS------------------//
        getUser: async (_, args) => {
            const user = await userData.getUser(args);
            return user;
        },
        getAllUsers : async () => {
            const users = await userData.getAllUsers();
            return users;
        },  
       
        //----------------REVIEW FUNCTIONS------------------//
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
            const newProduct = await productData.addProduct(args);
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
            const newReview = await reviewData.createReview(args);
            return newReview;
        },

        addUser: async (_, args) => {
            const newUser = await userData.createUser(args);
            return newUser;
        },

        editUser: async (_, args) => {
            const newUser = await userData.editUser(args);
            return newUser;
        },
        
        addReview: async (_, args) => {
            const new_review = await reviewData.createReview(args);
            return new_review;
        }
    },
};

module.exports = resolvers;
