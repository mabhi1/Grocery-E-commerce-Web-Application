const dbConnection = require('./mongoConnection');

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
    products: getCollectionFn('products'),
    users: getCollectionFn('users'),
    orders: getCollectionFn('orders'),
    reviews: getCollectionFn('reviews'),
};