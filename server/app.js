const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res) => {
    res.send("Welcome to asian market");
});

app.listen(4000, () => {
    console.log("Server started at port 4000!");
});
