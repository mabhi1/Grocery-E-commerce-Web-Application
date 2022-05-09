const mongoCollections = require("../config/mongoCollection");
const userCollection = mongoCollections.users;
const uuid = require("uuid");

const createUser = async (args) => {
    const users = await userCollection();
    const newUser = {};
    newUser._id = args._id;
    newUser.name = args.name;
    newUser.email = args.email;
    newUser.phoneNumber = args.phoneNumber;
    newUser.addressStreet = args.addressStreet;
    newUser.apt = args.apt;
    newUser.city = args.city;
    newUser.state = args.state;
    newUser.zip = args.zip;
    newUser.cart = [];
    newUser.orders = [];
    newUser.reviews = [];
    newUser.createdAt = new Date();
    await users.insertOne(newUser);
    return newUser;
};

const getAllUsers = async () => {
    const users = await userCollection();
    const allUsers = await users.find({}).toArray();
    return allUsers;
};

const getUser = async (args) => {
    const users = await userCollection();
    const user = await users.findOne({ _id: args._id });
    return user;
};

const editUser = async (args) => {
    const users = await userCollection();
    const user = await users.findOne({ _id: args._id });
    if (user) {
        if (args.name) user.name = args.name;
        if (args.email) user.email = args.email;
        if (args.phoneNumber) user.phoneNumber = args.phoneNumber;
        if (args.addressStreet) user.addressStreet = args.addressStreet;
        if (args.apt) user.apt = args.apt;
        if (args.city) user.city = args.city;
        if (args.state) user.state = args.state;
        if (args.zip) user.zip = args.zip;
        if (args.cart) user.cart = args.cart;
        await users.updateOne({ _id: args._id }, { $set: user });
    }
    return user;
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    editUser,
};
