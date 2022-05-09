const users = require("./data/users");
const connection = require("./config/mongoConnection");

async function main() {
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

//   const getuser = await users.getUser({ _id: "gaQir7iPWFcNMQibWnBja7BZavJ2" });
//     console.log(getuser);

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



  const db = await connection.connectToDb();
  await connection.closeConnection();
  console.log("Done!");
}

main().catch((error) => {
  console.log(error);
});
