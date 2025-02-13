const mongodb = require("mongodb").MongoClient;
const settings = {
    "url": process.env.MONGO,
    "db": "asian_market"
  }

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if (!_connection) {
        try {
            _connection = await mongodb.connect(settings.url, {
                useNewUrlParser: true,
            });
        } catch (error) {
            console.log(error);
        }
        _db = await _connection.db(settings.db);
    }
    return _db;
};
