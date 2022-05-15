const mongoCollections = require("../config/mongoCollection");
const { checkString } = require("../Validator/validation");
const sessionCollection = mongoCollections.orderSession;

const createSession = async (args) => {
    const sessions = await sessionCollection();
    const newSession = {
        _id: checkString("id", args._id),
    };
    await sessions.insertOne(newSession);
    return newSession;
};

const deleteSession = async (args) => {
    const sessions = await sessionCollection();
    await sessions.deleteOne({ _id: checkString("id", args._id) });
    return {
        deleted: true,
    };
};

const getSessionById = async (args) => {
    const sessions = await sessionCollection();
    const session = await sessions.findOne({ _id: checkString("id", args._id) });
    return session;
};

module.exports = {
    getSessionById,
    deleteSession,
    createSession,
};
