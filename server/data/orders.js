const mongoCollections = require("../config/mongoCollection");
const ordersCollection = mongoCollections.orders;
const productCollection = mongoCollections.products;
const uuid = require("uuid");

const createOrder = async (args) => {
    const orders = await ordersCollection();
    const newOrder = {};
    newOrder._id = uuid.v4();
    newOrder.status = args.status;
    newOrder.userId = args.userId;
    newOrder.userEmail = args.userEmail;
    newOrder.total = args.total;
    newOrder.createdAt = args.createdAt;
    newOrder.products = args.products;
    newOrder.flag = args.flag;
    newOrder.addressStreet = args.addressStreet;
    newOrder.zip = args.zip;
    newOrder.state = args.state;
    newOrder.city = args.city;
    newOrder.apt = args.apt;
    await orders.insertOne(newOrder);
    return newOrder;
};

const filterOrders = async (args) => {
    let flags = [];
    const orders = await ordersCollection();
    const products = await productCollection();
    const userOrders = await orders.find({ userId: args.userId, flag: args.flag }).toArray();
    for (let userOrder of userOrders) {
        const deleted = await orders.deleteOne({ _id: userOrder._id });
        if (!flags.includes(userOrder.flag)) {
            flags.push(userOrder.flag);
            let order = {
                _id: uuid.v4(),
                status: userOrder.status,
                userId: userOrder.userId,
                userEmail: userOrder.userEmail,
                total: userOrder.total,
                createdAt: userOrder.createdAt,
                products: userOrder.products,
                flag: userOrder.flag,
                zip: userOrder.zip,
                state: userOrder.state,
                city: userOrder.city,
                apt: userOrder.apt,
                addressStreet: userOrder.addressStreet,
            };
            if (deleted.deletedCount !== 0) {
                await orders.insertOne(order);
                for (let product of userOrder.products) {
                    let oldProduct = await products.findOne({ _id: product._id });
                    let quantity = oldProduct.quantity - product.orderedQuantity;
                    products.updateOne({ _id: product._id }, { $set: { quantity: quantity } });
                }
            }
        }
    }
};

const deleteOrder = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    await orders.deleteOne({ _id: args._id });
    return order;
};

const getStatusOrders = async (args) => {
    const orders = await ordersCollection();
    const recievedOrders = await orders.find({ status: args.status }).toArray();
    return recievedOrders;
};

const getOrderById = async (args) => {
    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const changeStatusToCompleted = async (args) => {
    const orders = await ordersCollection();
    await orders.updateOne({ _id: args._id }, { $set: { status: "completed" } });
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const changeStatusToDispatched = async (args) => {
    const orders = await ordersCollection();
    await orders.updateOne({ _id: args._id }, { $set: { status: "dispatched" } });
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

module.exports = {
    createOrder,
    getOrderById,
    deleteOrder,
    getOrdersByUserId,
    getAllOrders,
    filterOrders,
    getStatusOrders,
    changeStatusToCompleted,
    changeStatusToDispatched,
};
