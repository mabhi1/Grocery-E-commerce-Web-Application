const productData = require("../data/products");
const userData = require("../data/users");

const resolvers = {
    Query: {
        product: async (_, args) => {
            const products = await productData.getProductById(args);
            return products;
        },
        products: async (_, args) => {
            const numberOfProducts = await productData.totalNumberOfProducts();
            if (args.page > numberOfProducts / 2 || args.page < 1) return new Error("Not Found");
            const products = await productData.getAllProducts(args);
            return products;
        },
        adminProducts: async () => {
            const products = await productData.getAdminProducts();
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
        numberOfProducts: async () => {
            const numberOfProducts = await productData.totalNumberOfProducts();
            return numberOfProducts;
        },
        searchProducts: async (_, args) => {
            if (args.name === "null") return;
            const products = await productData.searchProducts(args);
            return products;
        },
        //User queries
        getUser: async (_, args) => {
            const user = await userData.getUser(args);
            return user;
        },
        getAllUsers: async () => {
            const users = await userData.getAllUsers();
            return users;
        },
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
        //User Collection
        addUser: async (_, args) => {
            const newUser = await userData.createUser(args);
            return newUser;
        },

        editUser: async (_, args) => {
            const newUser = await userData.editUser(args);
            return newUser;
        },
    },
};

module.exports = resolvers;
