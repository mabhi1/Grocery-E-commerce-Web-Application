const mongodb = require("mongodb").MongoClient;
const settings = require("./settings").mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if (!_connection) {
        _connection = await mongodb.connect(settings.url, {
            useNewUrlParser: true,
        });
        _db = await _connection.db(settings.db);
    }
    return _db;
};
