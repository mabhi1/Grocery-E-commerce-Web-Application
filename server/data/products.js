const mongoCollections = require("../config/mongoCollection");
const productCollection = mongoCollections.products;
const uuid = require("uuid");
const { checkString, checkNumber } = require("../Validator/validation");

const createProduct = async (args) => {
    const products = await productCollection();
    const newProduct = {};
    newProduct._id = uuid.v4();
    newProduct.name = checkString("name", args.name);
    newProduct.description = checkString("description", args.description);
    args.category = checkString("category", args.category.toLowerCase());
    newProduct.category = args.category;
    newProduct.image = checkString("image", args.image);
    newProduct.price = checkNumber("price", args.price);
    newProduct.quantity = checkNumber("quantity", args.quantity);
    await products.insertOne(newProduct);
    return newProduct;
};

const editProduct = async (args) => {
    const products = await productCollection();
    const product = await products.findOne({ _id: args._id });
    if (product) {
        if (args.name) product.name = checkString("name", args.name);
        if (args.image) product.image = checkString("image", args.image);
        if (args.description) product.description = checkString("description", args.description);
        if (args.price) product.price = checkNumber("price", args.price);
        if (args.category) product.category = checkString("category", args.category);
        if (args.quantity) product.quantity = checkNumber("quantity", args.quantity);
        await products.updateOne({ _id: checkString("id", args._id) }, { $set: product });
    }
    return product;
};

const deleteProduct = async (args) => {
    const products = await productCollection();
    const product = await products.findOne({ _id: checkString("id", args._id) });
    await products.deleteOne({ _id: checkString("id", args._id) });
    return product;
};

const getAllProducts = async (args) => {
    const limit = 18;
    const skip = (args.page - 1) * limit;
    const products = await productCollection();
    const allProducts = await products.find({}).limit(limit).skip(skip).toArray();
    return allProducts;
};

const totalNumberOfProducts = async () => {
    const products = await productCollection();
    const totalProducts = await products.find({}).toArray();
    return totalProducts.length;
};

const getAdminProducts = async () => {
    const products = await productCollection();
    const allProducts = await products.find({}).toArray();
    return allProducts;
};

const getProductById = async (args) => {
    const products = await productCollection();
    const product = await products.findOne({ _id: checkString("id", args._id) });
    return product;
};

const findByCategory = async (args) => {
    const products = await productCollection();
    args.category = checkString("category", args.category.toLowerCase());
    const allProducts = await products.find({ category: args.category }).toArray();
    return allProducts;
};

const sortAscByCategory = async (args) => {
    const products = await productCollection();
    args.category = checkString("category", args.category.toLowerCase());
    const allProducts = await products.find({ category: args.category }).sort({ price: 1 }).toArray();
    return allProducts;
};

const sortDesByCategory = async (args) => {
    const products = await productCollection();
    args.category = checkString("category", args.category.toLowerCase());
    const allProducts = await products.find({ category: args.category }).sort({ price: -1 }).toArray();
    return allProducts;
};

const searchProducts = async (args) => {
    const products = await productCollection();
    products.createIndex({ name: "text" });
    const searchedProducts = products.find({ $text: { $search: checkString("name", args.name) } }).toArray();
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
    getAdminProducts,
    totalNumberOfProducts,
};
