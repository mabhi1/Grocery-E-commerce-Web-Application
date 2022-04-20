const productsRoutes = require('./products');
const userRoutes = require('./users');
const ordersRoutes = require('./orders');
const reviewRoutes = require('./reviews');

const constructorMethod = (app) => {
    app.use('/products', productsRoutes);
    app.use('/users', userRoutes);
    app.use('/orders', ordersRoutes);
    app.use('/reviews', reviewRoutes);
    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;