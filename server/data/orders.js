const mongoCollections = require("../config/mongoCollection");
const ordersCollection = mongoCollections.orders;
const productCollection = mongoCollections.products;
const uuid = require("uuid");

const createOrder = async (args) => {
    if (
        (args.status && typeof args.status !== "string") ||
        (args.userId && typeof args.userId !== "string") ||
        (args.addressStreet && typeof args.addressStreet !== "string") ||
        (args.apt && typeof args.apt !== "string") ||
        (args.city && typeof args.city !== "string") ||
        (args.state && typeof args.state !== "string") ||
        (args.zip && typeof args.zip !== "string") ||
        (args.createdAt && typeof args.createdAt !== "string") ||
        (args.userEmail && typeof args.userEmail !== "string") ||
        (args.zip && typeof args.zip !== "string") ||
        (args.products && typeof args.products !== "object") ||
        (args.total && typeof args.total !== "number")
    ) {
        throw "Invalid Type of status, userId, address, email, products or total";
    }
    const orders = await ordersCollection();
    const products = await productCollection();
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
    for (let product of args.products) {
        let oldProduct = await products.findOne({ _id: product._id });
        let quantity = oldProduct.quantity - product.orderedQuantity;
        products.updateOne({ _id: product._id }, { $set: { quantity: quantity } });
    }
    return newOrder;
};

const filterOrders = async (args) => {
    if (
        (args.status && typeof args.status !== "string") ||
        (args.userId && typeof args.userId !== "string") ||
        (args.addressStreet && typeof args.addressStreet !== "string") ||
        (args.apt && typeof args.apt !== "string") ||
        (args.city && typeof args.city !== "string") ||
        (args.state && typeof args.state !== "string") ||
        (args.zip && typeof args.zip !== "string") ||
        (args.createdAt && typeof args.createdAt !== "string") ||
        (args.userEmail && typeof args.userEmail !== "string") ||
        (args.zip && typeof args.zip !== "string") ||
        (args.products && typeof args.products !== "object") ||
        (args.total && typeof args.total !== "number")
    ) {
        throw "Invalid Type of status, userId, address, email, products or total";
    }

    let flags = [];
    const orders = await ordersCollection();
    const products = await productCollection();
    const userOrders = await orders.find({ userId: args.userId, flag: args.flag }).toArray();
    for (let userOrder of userOrders) {
        const deleted = await orders.deleteOne({ _id: userOrder._id });
        for (let product of userOrder.products) {
            let oldProduct = await products.findOne({ _id: product._id });
            let quantity = oldProduct.quantity + product.orderedQuantity;
            products.updateOne({ _id: product._id }, { $set: { quantity: quantity } });
        }
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
    if (args._id && typeof args._id !== "string") {
        throw "Type of id must be string";
    }

    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    await orders.deleteOne({ _id: args._id });
    return order;
};

const getStatusOrders = async (args) => {
    if (args.status && typeof args.status !== "string") {
        throw "Type of status must be string";
    }

    const orders = await ordersCollection();
    const recievedOrders = await orders.find({ status: args.status }).toArray();
    return recievedOrders;
};

const getOrderById = async (args) => {
    if (args._id && typeof args._id !== "string") {
        throw "Type of id be string";
    }

    const orders = await ordersCollection();
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const changeStatusToCompleted = async (args) => {
    if (args._id && typeof args._id !== "string") {
        throw "Type of id be string";
    }

    const orders = await ordersCollection();
    await orders.updateOne({ _id: args._id }, { $set: { status: "completed" } });
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const changeStatusToDispatched = async (args) => {
    if (args._id && typeof args._id !== "string") {
        throw "Type of id be string";
    }

    const orders = await ordersCollection();
    await orders.updateOne({ _id: args._id }, { $set: { status: "dispatched" } });
    const order = await orders.findOne({ _id: args._id });
    return order;
};

const getOrdersByUserId = async (args) => {
    if (args.userId && typeof args.userId !== "string") {
        throw "Type of id be string";
    }

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
