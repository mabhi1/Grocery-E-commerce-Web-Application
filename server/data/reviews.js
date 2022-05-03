const mongoCollections = require("../config/mongoCollection");
const reviewCollection = mongoCollections.reviews;
const uuid = require("uuid");

const createReview = async (args) => {
    const reviews = await reviewCollection();
    const newReview = {};
    newReview._id = uuid.v4();
    newReview.userId = args.userId;
    newReview.productId = args.productId;
    newReview.review = args.review;
    newReview.rating = args.rating;
    await reviews.insertOne(newReview);
    return newReview;
};

const getAllReviews = async () => {
    const reviews = await reviewCollection();
    const allReviews = await reviews.find({}).toArray();
    return allReviews;
};

const getReviewByUserId = async (args) => {
    const reviews = await reviewCollection();
    const userReviews = await reviews.find({ userId: args.userId }).sort({rating: 1}).toArray();
    return userReviews;
};

const getReviewByProductId = async (args) => {
    const reviews = await reviewCollection();
    const productReviews = await reviews.find({ productId: args.productId }).sort({rating: -1}).toArray();
    return productReviews;
};



module.exports = {
    createReview,
    getReviewByUserId,
    getReviewByProductId,
    getAllReviews
};