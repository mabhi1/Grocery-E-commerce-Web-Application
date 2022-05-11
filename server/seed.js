const products = require('./data/products');
const users = require('./data/users');
const reviews = require('./data/reviews');
const connection = require('./config/mongoConnection');

const main = async () => {
 //----------------------CREATE A REVIEW FOR A PRODUCT-----------------//

    // try{
    //     const review1 = await reviews.createReview({"userId":"gaQir7iPWFcNMQibWnBja7BZavJ2","productId":"75f1e57d-1648-4ce3-b87d-d7c8edb2ca7b","review":"Not so good fruits", "rating":1});
    //     console.log(review1);
    //     return review1;
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

    // try{
    //     const review = await reviews.getAllReviews_Product("f8ad348a-a7f6-40b5-abda-582671680657");
    //     console.log(review);
    // }catch(e){
    //     console.log (e);
    // }    
   
    //---------------------------GET ALL REVIEWS OF ALL PRODUCTS---------------------------//

    // try{
    //     const allReviews = await reviews.getAllReviews();
    //     console.log(allReviews);
    // }catch(e){
    //     console.log(e);
    // }

    //-------------------------GET ALL REVIEWS FOR A SINGLE PRODUCT---------------------//
    
    // try{
    //     const product_review_details = await reviews.getAllReviews_Product({"_id":"75f1e57d-1648-4ce3-b87d-d7c8edb2ca7b"});
    //     console.log(product_review_details);
    // }catch(e){
    //     console.log(e)
    // }

    //------------------------DELETE A REVIEW------------------------------//

    // try{
    //     const delete_review = await reviews.deleteReview("0e825abf-4783-4472-b4c8-d9cb1b4757b4");
    //     console.log(delete_review);
    // }catch(e){
    //     console.log(e);
    // }
    
    //-------------------------FLAG A REVIEW-------------------------------//

    // try{
    //     const flag_review = await reviews.flagReview({"_id": "3ae5f008-4cdd-45ec-85da-4409453ecb8d","userId": "AsPZl19VnyfFAQo0hmjinx4uvYx1"});
    //     console.log(flag_review);
    // }catch(e){
    //     console.log(e);
    // }
    //---------------------------CREATE A USER-----------------------------//

    // try{
  //     const user1 = await users.createUser({
  //         name: "Joker Doe",
  //         email: "joshi@123.com",
  //         phoneNumber: "123121212",
  //         address: "123 Main St",
  //         cart: [],
  //         orders: [],
  //         reviews: [],
  //         createdAt: new Date()
  //     });
  //     console.log(user1);

  // }catch(error){
  //     console.log(error);
  // }

    //-----------------------------EDIT A USER--------------------------------//

    // const edituser = await users.editUser({
    //   _id: "TRbubFmdZXcHPix88cDavna3tRn2",
    //   name: "Aditya Doe",
    // });

    //----------------------------GET A USER----------------------------------//
// const edituser = await users.editUser({
//     _id: "TRbubFmdZXcHPix88cDavna3tRn2",
//     name: "Aditya Doe",
// });
// console.log(edituser);

// const createUser = await users.createUser({
//   name: "Joker Doe",
//   email: "JD@JD.com",
//   phoneNumber: "5675675657",
//   addressStreet: "123 Main St",
//   apt: "Apt. 1",
//   city: "San Francisco",
//   state: "CA",
//   zip: "94111",
// });
// console.log(createUser);

const editUser = await users.editUser({
  _id: "mogS6rpNZERpY5gF505RKkLyDBX2",
  name: "Aditya Doe",
  addressStreet: "123 Main St",
  apt: "Apt. 1",
  city: "San Francisco",
  state: "CA",
});
console.log(editUser);

    // const getuser = await users.getUser({ _id: "gaQir7iPWFcNMQibWnBja7BZavJ2" });
    // console.log(getuser);

    const db = await connection.connectToDb();
    await connection.closeConnection();
    console.log('Done!');
};

main().catch((error) => {
    console.log(error);
});