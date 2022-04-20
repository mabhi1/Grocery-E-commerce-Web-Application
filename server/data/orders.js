const mongoCollections = require("../config/mongoCollection");
const orderCollection = mongoCollections.order;
const uuid = require('uuid');

const getAllOrders = async () => {
    const orders = await orderCollection();
    const allOrders = await orders.find({}).toArray();
    return allOrders;
}

module.exports = {getAllOrders};