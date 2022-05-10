const mongoCollections = require("../config/mongoCollection");
const ordersCollection = mongoCollections.orders;
const productCollection = mongoCollections.products;
const uuid = require("uuid");
const productData = require("./products");

const createOrder = async (args) => {
    const orders = await ordersCollection();
    const products = await productCollection();
    const newOrder = {};
    const orderProducts = [];
    newOrder._id = uuid.v4();
    newOrder.status = args.status;
    newOrder.userId = args.userId;
    newOrder.createdAt = args.createdAt;
    newOrder.products = args.products;
    newOrder.flag = args.flag;

    for(let i = 0; i < args.products.length; i++) {
        let product = await products.findOne({_id: args.products[i]._id});
        let quantity = product.quantity;
        quantity = quantity - args.products[i].quantity;
        product = products.updateOne({_id:  args.products[i]._id}, {$set: {quantity: quantity}});
        const updatedProduct = await products.findOne({_id: args.products[i]._id});
        orderProducts.push(updatedProduct); 
    };

    console.log(orderProducts);
    await orders.insertOne(newOrder);
    return newOrder;
};

const filterOrders = async (args) => {
    let flags = [];
    const orders = await ordersCollection();
    const userOrders = await orders.find({ userId: args.userId }).toArray();
    for (let userOrder of userOrders) {
        const deleted = await orders.deleteOne({ _id: userOrder._id });
        if (!flags.includes(userOrder.flag)) {
            flags.push(userOrder.flag);
            let order = {
                _id: uuid.v4(),
                status: userOrder.status,
                userId: userOrder.userId,
                createdAt: userOrder.createdAt,
                products: userOrder.products,
                flag: userOrder.flag,
            };
            if (deleted.deletedCount !== 0) await orders.insertOne(order);
        }
    }
};

const deleteOrder = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    await orders.deleteOne({ _id: args._id });
    return order;
};

const getStatusOrders = async(args) => {
    const orders = await ordersCollection();
    const recievedOrders = await orders.find({status: args.status}).toArray();
    return recievedOrders;
}

const getOrderById = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const changeStatusToCompleted = async(args) => {
    const orders = await ordersCollection();
    await orders.updateOne({ _id: args._id }, {$set:{status: "completed"}});
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const changeStatusToDispatched = async(args) => {
    const orders = await ordersCollection();
    await orders.updateOne({ _id: args._id }, {$set:{status: "dispatched"}});
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const getOrdersByUserId = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.find({ userId: args.userId }).toArray();
    return order;
};

const getAllOrders = async () => {
    const orders = await ordersCollection();
    const order = await orders.find({}).toArray();
    return order;
};

module.exports = { createOrder, getOrderById, deleteOrder, getOrdersByUserId, getAllOrders, filterOrders, getStatusOrders, changeStatusToCompleted, changeStatusToDispatched};
