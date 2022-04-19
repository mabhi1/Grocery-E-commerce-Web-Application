const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.get('/', async (req, res) => {
    try {
      const usersList = await usersData.getAllUsers();
      res.json(usersList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

module.exports = router;