const express = require("express");
const app = express();

const  connectDatabase = require("./scr/config/database");
connectDatabase(app);

const router = require("./scr/api/routes/product");

app.use(express.json());

app.get("/", (req, res) => {
    res.send(" <h1> hello world </h1>");
});

app.use("/", router);

console.log("waiting for database");