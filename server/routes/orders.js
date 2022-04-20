const express = require('express');
const router = express.Router();
const data = require('../data');
const ordersData = data.orders;

router.get('/', async (req, res) => {
    try {
      const ordersList = await ordersData.getAllOrders();
      res.json(ordersList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

module.exports = router;