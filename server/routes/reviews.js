const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;

router.get('/', async (req, res) => {
    try {
      const reviewsList = await reviewsData.getAllReviews();
      res.json(reviewsList);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});

module.exports = router;