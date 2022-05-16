const mongoCollections = require("../config/mongoCollection");
const productsCollection = mongoCollections.products;
const usersCollection = mongoCollections.users;
const reviewCollection = mongoCollections.reviews;
const uuid = require("uuid");
const { ObjectId } = require("mongodb");

module.exports = {
    async createReview(args) {
        let userName = args.userName;
        let userId = args.userId;
        let productId = args.productId;
        let review = args.review;
        let rating = args.rating;

        if (!userId) {
            throw "ERROR! The userid field should have valid value";
        }

        if (!userName) {
            throw "ERROR! The userName field should have valid value";
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

        if (typeof userName !== "string") {
            throw "ERROR! The userName parameter should be a string";
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

        if (userName.length == 0 || userName.trim().length == 0) {
            throw "ERROR! The userName parameter cannot be empty";
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

        function compstr(val) {
            if (val < 10) {
                return "0" + val;
            } else {
                return val;
            }
        }

        const month = compstr(d.getMonth() + 1);
        const day = compstr(d.getDate());
        const year = d.getFullYear();

        const hrs = compstr(d.getHours());
        const min = compstr(d.getMinutes());
        const seconds = compstr(d.getSeconds());

        const date = month + "-" + day + "-" + year + " " + hrs + ":" + min + ":" + seconds;
        const reviews = await reviewCollection();
        const products = await productsCollection();
        const users = await usersCollection();

        const newReview = {};

        newReview._id = uuid.v4();
        newReview.userId = userId;
        newReview.userName = userName;
        newReview.productId = productId;
        newReview.review = review;
        newReview.rating = rating;
        newReview.flags = [];
        newReview.createdAt = date;

        await reviews.insertOne(newReview);

        await products.updateOne(
            {
                _id: productId,
            },
            {
                $push: { reviews: newReview._id },
            }
        );

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
        const userReviews = await reviews.find({ userId: userid }).sort({ createdAt: -1 }).toArray();

        if (userReviews == null) {
            throw "ERROR! No reviews found for the user with the given user id";
        }
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

    async deleteReview(args) {
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

        const deletionInfo = await reviews.deleteOne({ _id: id });

        if (deletionInfo.deletedCount > 0) {
            return { _id: args._id };
        }
    },

    async flagReview(args) {
        let reviewId = args._id;
        let userId = args.userid;

        if (!reviewId) {
            throw "ERROR! The reviewId is not provided";
        }

        if (typeof reviewId !== "string") {
            throw "ERROR! The reviewId parameter should be a string";
        }

        if (reviewId.length == 0 || reviewId.trim().length == 0) {
            throw "ERROR! The reviewId parameter cannot be empty";
        }

        if (!userId) {
            throw "ERROR! The userId is not provided";
        }

        if (typeof userId !== "string") {
            throw "ERROR! The userId parameter should be a string";
        }

        if (userId.length == 0 || userId.trim().length == 0) {
            throw "ERROR! The userId parameter cannot be empty";
        }

        const reviews = await reviewCollection();

        const review_data = await reviews.updateOne(
            {
                _id: reviewId,
            },
            {
                $push: { flags: userId },
            }
        );

        const reviewInfo = await this.getReviewById(reviewId);

        return reviewInfo;
    },
};