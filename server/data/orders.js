const mongoCollections = require("../config/mongoCollection");
const ordersCollection = mongoCollections.orders;
const uuid = require("uuid");

const createOrder = async (args) => {
    const orders = await ordersCollection();
    const newOrder = {};
    newOrder._id = uuid.v4();
    newOrder.status = args.status;
    newOrder.userId = args.userId;
    newOrder.createdAt = args.createdAt
    newOrder.products = args.products
    await orders.insertOne(newOrder);
    return newOrder;
};



const deleteOrder = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    await orders.deleteOne({ _id: args._id });
    return order;
};


const getOrderById = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const getOrdersByUserId = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.find({ userId: args.userId }).toArray();
    return order;
};

const getAllOrders = async (args) => {
    const orders = ordersCollection();
    const order = await orders.find({}).toArray();
    return order;
}



module.exports = { createOrder, getOrderById, deleteOrder, getOrdersByUserId, getAllOrders };
