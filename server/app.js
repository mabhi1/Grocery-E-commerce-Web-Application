const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');

app.use(express.json());

app.use(
  session({
    name: 'AsianMarket',
    secret: "The secret to good Indian food.",
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 60000}
  })
);

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});