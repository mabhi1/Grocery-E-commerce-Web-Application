const mongoCollections = require("../config/mongoCollection");
const productsCollection = mongoCollections.products;
const usersCollection = mongoCollections.users;
const reviewCollection = mongoCollections.reviews;
const uuid = require("uuid");
const { ObjectId } = require("mongodb");

module.exports = {
    async createReview(args) {
        let userId = args.userId;
        let productId = args.productId;
        let review = args.review;
        let rating = args.rating;

        if (!userId) {
            throw "ERROR! The userid field should have valid value";
        }

        if (!productId) {
            throw "ERROR! The productId field should have valid value";
        }

        if (!review) {
            throw "ERROR! The review field should have valid value";
        }

        if (!rating) {
            throw "ERROR! The rating field should have valid value";
        }

        if (typeof userId !== "string") {
            throw "ERROR! The userid parameter should be a string";
        }

        if (typeof productId !== "string") {
            throw "ERROR! The productId parameter should be a string";
        }

        if (typeof review !== "string") {
            throw "ERROR! The review parameter should be a string";
        }

        if (typeof rating !== "number") {
            throw "ERROR! The rating parameter should be an integer";
        }

        if (userId.length == 0 || userId.trim().length == 0) {
            throw "ERROR! The userid parameter cannot be empty";
        }

        if (productId.length == 0 || productId.trim().length == 0) {
            throw "ERROR! The productId parameter cannot be empty";
        }

        if (review.length == 0 || review.trim().length == 0) {
            throw "ERROR! The productId parameter cannot be empty";
        }

        if (rating < 1 || rating > 5) {
            throw "ERROR! Please enter a valid rating";
        }

        const d = new Date();

        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();

        const hrs = d.getHours();
        const min = d.getMinutes();
        const seconds = d.getSeconds();

        const date = month + "-" + day + "-" + year + " " + (hrs % 12) + ":" + min + ":" + seconds;
        const reviews = await reviewCollection();
        const products = await productsCollection();
        const users = await usersCollection();

        const newReview = {};

        newReview._id = uuid.v4();
        newReview.userId = userId;
        newReview.productId = productId;
        newReview.review = review;
        newReview.rating = rating;
        newReview.createdAt = date;

        await reviews.insertOne(newReview);

        // let parsedProductId = ObjectId(productId);

        await products.updateOne(
            {
                _id: productId,
            },
            {
                $push: { reviews: newReview._id },
            }
        );

        // let parsedUserId = ObjectId(userid);

        await users.updateOne(
            {
                _id: userId,
            },
            {
                $push: { reviews: newReview._id },
            }
        );

        return newReview;
    },

    async getReviewById(args) {
        let id = "";

        if (typeof args == "object") {
            id = args._id;
        } else {
            id = args;
        }

        if (!id) {
            throw "ERROR! The id is not provided";
        }

        if (typeof id !== "string") {
            throw "ERROR! The id parameter should be a string";
        }

        if (id.length == 0 || id.trim().length == 0) {
            throw "ERROR! The id parameter cannot be empty";
        }

        const reviews = await reviewCollection();
        const reviewInfo = await reviews.findOne({ _id: id });

        if (reviewInfo === null) {
            throw "ERROR! No review found with the given id";
        }

        return reviewInfo;
    },

    async getReviewByUserId(args) {
        let userid = args.userId;

        if (!userid) {
            throw "ERROR! The userid field should have valid value";
        }

        if (typeof userid !== "string") {
            throw "ERROR! The userid parameter should be a string";
        }

        if (userid.length == 0 || userid.trim().length == 0) {
            throw "ERROR! The userid parameter cannot be empty";
        }

        const reviews = await reviewCollection();
        const userReviews = await reviews.find({ userId: userid }).sort({ rating: 1 }).toArray();
        return userReviews;
    },

    async getAllReviews() {
        const reviews = await reviewCollection();
        const allReviews = await reviews.find({}).toArray();
        return allReviews;
    },

    async getReviewByProductId(args) {
        let productId = args.productId;

        if (!productId) {
            throw "ERROR! The productId field should have valid value";
        }

        if (typeof productId !== "string") {
            throw "ERROR! The productId parameter should be a string";
        }

        if (productId.length == 0 || productId.trim().length == 0) {
            throw "ERROR! The productId parameter cannot be empty";
        }

        const reviews = await reviewCollection();
        const productReviews = await reviews.find({ productId: productId }).sort({ createdAt: -1 }).toArray();

        if (productReviews == null) {
            throw "ERROR! No review found for the product with the given product id";
        }
        return productReviews;
    },
};
