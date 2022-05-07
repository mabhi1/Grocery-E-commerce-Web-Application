const mongoCollections = require("../config/mongoCollection");
const productCollection = mongoCollections.products;
const uuid = require("uuid");

const createProduct = async (args) => {
    const products = await productCollection();
    const newProduct = {};
    newProduct._id = uuid.v4();
    newProduct.name = args.name;
    newProduct.description = args.description;
    args.category = args.category.toLowerCase();
    newProduct.category = args.category;
    newProduct.price = args.price;
    newProduct.quantity = args.quantity;
    await products.insertOne(newProduct);
    return newProduct;
};

const editProduct = async (args) => {
    const products = await productCollection();
    const product = await products.findOne({ _id: args._id });
    if (product) {
        if (args.name) product.name = args.name;
        if (args.description) product.description = args.description;
        if (args.price) product.price = args.price;
        if (args.category) product.category = args.category;
        if (args.quantity) product.quantity = args.quantity;
        await products.updateOne({ _id: args._id }, { $set: product });
    }
    return product;
};

const deleteProduct = async (args) => {
    const products = await productCollection();
    const product = await products.findOne({ _id: args._id });
    await products.deleteOne({ _id: args._id });
    return product;
};

const getAllProducts = async () => {
    const products = await productCollection();
    const allProducts = await products.find({}).toArray();
    return allProducts;
};

const getProductById = async (args) => {
    const products = await productCollection();
    const product = await products.findOne({ _id: args._id });
    return product;
};

const findByCategory = async (args) => {
    const products = await productCollection();
    args.category = args.category.toLowerCase();
    const allProducts = await products.find({ category: args.category }).toArray();
    return allProducts;
};

const sortAscByCategory = async (args) => {
    const products = await productCollection();
    args.category = args.category.toLowerCase();
    const allProducts = await products.find({ category: args.category }).sort({ price: 1 }).toArray();
    return allProducts;
};

const sortDesByCategory = async (args) => {
    const products = await productCollection();
    args.category = args.category.toLowerCase();
    const allProducts = await products.find({ category: args.category }).sort({ price: -1 }).toArray();
    return allProducts;
};

const searchProducts = async (args) => {
    const products = await productCollection();
    products.createIndex({ name: "text" });
    const searchedProducts = products.find({ $text: { $search: args.name } }).toArray();
    return searchedProducts;
};

module.exports = {
    createProduct,
    editProduct,
    getAllProducts,
    getProductById,
    findByCategory,
    sortAscByCategory,
    sortDesByCategory,
    deleteProduct,
    searchProducts,
};
