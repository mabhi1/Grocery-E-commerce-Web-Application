const mongoCollections = require("../config/mongoCollection");
const sessionCollection = mongoCollections.orderSession;

const createSession = async (args) => {
    const sessions = await sessionCollection();
    try {
        await sessions.insertOne({ sessionId: args.id });
        return true;
    } catch (error) {
        return false;
    }
};

const deleteSession = async (args) => {
    const sessions = await sessionCollection();
    try {
        await sessions.deleteOne({ sessionId: args.id });
        return true;
    } catch (error) {
        return false;
    }
};

const getSessionById = async (args) => {
    const sessions = await sessionCollection();
    const session = await sessions.findOne({ sessionId: args.id });
    if (session) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    getSessionById,
    deleteSession,
    createSession,
};
