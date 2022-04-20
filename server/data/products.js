const mongoCollections = require("../config/mongoCollection");
const productCollection = mongoCollections.products;
const uuid = require('uuid');

const createProduct = async (product) => {
    //console.log(product);
    const products = await productCollection();
    const newProduct = {};
    newProduct._id = uuid.v4();
    newProduct.name = product.name;
    newProduct.description = product.description;
    product.category = product.category.toLowerCase();
    newProduct.category = product.category;
    newProduct.price = product.price;
    newProduct.quantity = product.quantity;
    await products.insertOne(newProduct);
    return newProduct;
}

const editProduct = async (editProduct) => {
    const products = await productCollection();
    const product = await products.findOne({_id: editProduct._id});
    if(product){
        if(editProduct.name) product.name = editProduct.name;
        if(editProduct.description) product.description = editProduct.description;
        if(editProduct.price) product.price = editProduct.price;
        if(editProduct.category) product.category = editProduct.category;
        if(editProduct.quantity) product.quantity = editProduct.quantity;
        await products.updateOne({_id: editProduct._id}, {$set: product});
    }
    return product;
}

const getAllProducts = async () => {
    const products = await productCollection();
    const allProducts = await products.find({}).toArray();
    return allProducts;
}

const getProductById = async (id) => {
    const products = await productCollection();
    const product = await products.findOne({_id: id});
    return product;
}

const findByCategory = async (category) => {
    const products = await productCollection();
    category = category.toLowerCase();
    const allProducts = await products.find({category: category}).toArray();
    return allProducts;
}

const sortAscByCategory = async (category) => {
    const products = await productCollection();
    category = category.toLowerCase();
    const allProducts = await products.find({category: category}).sort({price: 1}).toArray();
    return allProducts;
}

const sortDesByCategory = async (category) => {
    const products = await productCollection();
    category = category.toLowerCase();
    const allProducts = await products.find({category: category}).sort({price: -1}).toArray();
    return allProducts;
}

module.exports = {createProduct, editProduct, getAllProducts, getProductById, findByCategory, sortAscByCategory, sortDesByCategory};
