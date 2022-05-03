const mongoCollections = require('../config/mongoCollection');
const productsCollection = mongoCollections.products;
// const usersCollection = mongoCollections.users;
const reviewCollection = mongoCollections.reviews;
const uuid = require('uuid');
const { ObjectId } = require('mongodb');

module.exports = {

    async createReview(args){

        let productId = args.productId;
        let review = args.review;
        let rating = args.rating;
        
        // if(!userid){
        //     throw "ERROR! The userid field should have valid value";
        // }

        if(!productId){
            throw "ERROR! The productId field should have valid value";
        }

        if(!review){
            throw "ERROR! The review field should have valid value";
        }

        if(!rating){
            throw "ERROR! The rating field should have valid value";
        }

        // if(typeof(userid) !== "string"){
        //     throw "ERROR! The userid parameter should be a string";
        // }

        if(typeof(productId) !== "string"){
            throw "ERROR! The productId parameter should be a string";
        }

        if(typeof(review) !== "string"){
            throw "ERROR! The review parameter should be a string";
        }

        if(typeof(rating) !== "number"){
            throw "ERROR! The rating parameter should be an integer";
        }

        // if(userid.length == 0 || userid.trim().length == 0)
        // {
        //     throw "ERROR! The userid parameter cannot be empty";
        // }

        if(productId.length == 0 || productId.trim().length == 0)
        {
            throw "ERROR! The productId parameter cannot be empty";
        }

        if(review.length == 0 || review.trim().length == 0)
        {
            throw "ERROR! The productId parameter cannot be empty";
        }

        if(rating<1 || rating>5){
            throw "ERROR! Please enter a valid rating";
        }

        const d = new Date();
        
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();

        const hrs = d.getHours();
        const min = d.getMinutes();
        const seconds = d.getSeconds();

        const date = month + "-" + day + "-" + year + " " + hrs%12 + ":" + min + ":" + seconds;
        const reviews = await reviewCollection();
        const products = await productsCollection();
        // const users = await usersCollection();

        const newReview = {};

        newReview._id = uuid.v4();
        // newReview.userid = userid;
        newReview.productId = productId;
        newReview.rating = rating;
        newReview.review = review;
        newReview.createdAt = date;

        await reviews.insertOne(newReview);

        // let parsedProductId = ObjectId(productId);

        await products.updateOne(
            {
                _id: productId,
            },
            {
                $push: {reviews : newReview._id}
            }
        )

        // let parsedUserId = ObjectId(userid);

        // await users.updateOne(
        //     {
        //         _id: userid,
        //     },
        //     {
        //         $push: {reviews : newReview._id}
        //     }
        // )

        return newReview;
    },

    async getReviewById(args){

        let id = "";

        if(typeof(args) == "object"){
            id = args._id;
        }else{
            id = args;
        }
        
        if(!id)
        {
            throw "ERROR! The id is not provided";
        }

        if(typeof(id) !== "string")
        {
            throw "ERROR! The id parameter should be a string";
        }

        if(id.length == 0 || id.trim().length == 0)
        {
            throw "ERROR! The id parameter cannot be empty";
        }

        const reviews = await reviewCollection();
        const reviewInfo = await reviews.findOne({_id: id});

        if (reviewInfo === null){
            throw "ERROR! No review found with the given id";
        }

        return reviewInfo;
    },

    async getAllReviews_Product(args){

        let product_id = "";

        product_id = args._id;
        
        if(!product_id)
        {
            throw "ERROR! The product_id is not provided";
        }

        if(typeof(product_id) !== "string")
        {
            throw "ERROR! The product_id parameter should be a string";
        }

        if(product_id.length == 0 || product_id.trim().length == 0)
        {
            throw "ERROR! The product_id parameter cannot be empty";
        }

        const products = await productsCollection();

        const product_info = await products.findOne({_id: product_id});

        if(product_info == null){
            throw "ERROR! No product found with the given product id";
        }

        let review_ids = product_info.reviews;

        let product_review_info = {};

        let all_reviews = [];

        let total_rating_product = 0;

        for(let i=0; i<review_ids.length; i++)
        {
            let a = await this.getReviewById(review_ids[i]);
            total_rating_product += a.rating;
            all_reviews.push(a.review);
        }

        product_review_info.overall_rating = total_rating_product;
        product_review_info.reviews = all_reviews;
        
        return product_review_info;
    }
}