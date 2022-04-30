const products = require('./data/products');
// const users = require('./data/users');
const reviews = require('./data/reviews');
const connection = require('./config/mongoConnection');

const main = async () => {
 //----------------------CREATE A REVIEW FOR A PRODUCT-----------------//

    // try{
    //     const review1 = await reviews.createReview("f8ad348a-a7f6-40b5-abda-582671680657","Good product");
    //     console.log(review1);
    // }catch(e){
    //     console.log (e);
    // }

    //--------------------------GET A REVIEW BY ID----------------------//

    // try{
    //     const review = await reviews.getReviewById("95688bcb-cd26-410c-bab2-981dabcc21ab");
    //     console.log(review);
    // }catch(e){
    //     console.log (e);
    // }

    //-------------------------GET ALL REVIEWS FOR A PARTICULAR PRODUCT----------------------//

    try{
        const review = await reviews.getAllReviews_Product("f8ad348a-a7f6-40b5-abda-582671680657");
        console.log(review);
    }catch(e){
        console.log (e);
    }    
   
    const db = await connection.connectToDb();
    await connection.closeConnection();
    console.log('Done!');
};

main().catch((error) => {
    console.log(error);
});