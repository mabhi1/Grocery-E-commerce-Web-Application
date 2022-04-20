const mongoCollections = require("../config/mongoCollection");
const reviewCollection = mongoCollections.reviews;
const uuid = require('uuid');

const getAllReviews = async () => {
    const reviews = await reviewCollection();
    const allReviews = await reviews.find({}).toArray();
    return allReviews;
}

module.exports = {getAllReviews};