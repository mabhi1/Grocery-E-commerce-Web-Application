const dbConnection = require("./mongoConnection");

let dbCol = (name) => {
    let _col = undefined;
    return async () => {
        if (!_col) {
            db = await dbConnection();
            _col = await db.collection(name);
        }
        return _col;
    };
};

module.exports = {
    users: dbCol("users"),
    orders: dbCol("orders"),
    categories: dbCol("categories"),
    products: dbCol("products"),
    reviews: dbCol("reviews"),
};
