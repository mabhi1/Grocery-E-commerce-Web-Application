const mongoCollections = require("../config/mongoCollection");
const userCollection = mongoCollections.users;
const uuid = require('uuid');

const getAllUsers = async () => {
    const users = await userCollection();
    const allUsers = await users.find({}).toArray();
    return allUsers;
}

module.exports = {getAllUsers};