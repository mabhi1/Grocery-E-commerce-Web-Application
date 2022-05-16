const mongoCollections = require("../config/mongoCollection");
const userCollection = mongoCollections.users;
const uuid = require("uuid");

const createUser = async (args) => {
    if (!args._id && !args.name && !args.email && !args.phoneNumber && !args.addressStreet && !args.apt && !args.city && !args.state && !args.zip) {
        throw "Please provide all the required fields";
    }
    if (
        typeof args._id !== "string" &&
        typeof args.name !== "string" &&
        typeof args.email !== "string" &&
        typeof args.phoneNumber !== "string" &&
        typeof args.addressStreet !== "string" &&
        typeof args.apt !== "string" &&
        typeof args.city !== "string" &&
        typeof args.state !== "string" &&
        typeof args.zip !== "string"
    ) {
        throw "Type of _id, name, email, phoneNumber, addressStreet, apt, city, state, zip must be string";
    }
    if (
        args._id.trim().length === 0 &&
        args.name.trim().length === 0 &&
        args.email.trim().length === 0 &&
        args.phoneNumber.trim().length === 0 &&
        args.addressStreet.trim().length === 0 &&
        args.apt.trim().length === 0 &&
        args.city.trim().length === 0 &&
        args.state.trim().length === 0 &&
        args.zip.trim().length === 0
    ) {
        throw "Please provide all the required fields";
    }

    if (args.phoneNumber.length !== 10) {
        throw "Phone number must be 10 digits";
    }
    if (args.zip.length !== 5) {
        throw "Zip code must be 5 digits";
    }

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
    if (args._id === undefined) {
        throw "No user id provided";
    }
    if (typeof args._id !== "string") {
        throw "User id must be a string";
    }
    if (args._id.length === 0) {
        throw "User id must be a non-empty string";
    }

    if (args._id.trim().length === 0) {
        throw "User id must be a non-empty string";
    }

    const users = await userCollection();
    const user = await users.findOne({ _id: args._id });
    if (!user) {
        throw "No user with that id";
    }
    return user;
};

const editUser = async (args) => {
    if (
        (args.name && typeof args.name !== "string") ||
        (args.phoneNumber && typeof args.phoneNumber !== "string") ||
        (args.addressStreet && typeof args.addressStreet !== "string") ||
        (args.apt && typeof args.apt !== "string") ||
        (args.city && typeof args.city !== "string") ||
        (args.state && typeof args.state !== "string") ||
        (args.zip && typeof args.zip !== "string")
    ) {
        throw "Type of name, phoneNumber, addressStreet, apt, city, state, zip must be string";
    }

    if (args.phoneNumber && args.phoneNumber.length !== 10) {
        throw "Phone number must be 10 digits";
    }
    if (args.zip && args.zip.length !== 5) {
        throw "Zip code must be 5 digits";
    }

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
