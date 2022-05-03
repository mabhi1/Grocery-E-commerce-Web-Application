const productData = require("../data/products");
const userData = require("../data/users");
const ordersData = require("../data/orders");
const resolvers = {
    Query: {
        product: async (_, args) => {
            const products = await productData.getProductById(args);
            return products;
        },

        order: async (_, args) => {
            const orders = await ordersData.getOrderById(args);
            return orders;
        },

        userOrders: async (_,args) => {
            const orders = await ordersData.getOrdersByUserId(args);
            return orders
        },

        getAllOrders: async (_,args) => {
            const orders = await ordersData.getAllOrders(args);
            return orders
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
        addOrder: async(_,args) => {
            const newOrder = await ordersData.createOrder(args);
            return newOrder;
        },

        deleteOrder: async(_,args) => {
            const order = await ordersData.deleteOrder(args);
            return order;
        }
    },
};

module.exports = resolvers;
