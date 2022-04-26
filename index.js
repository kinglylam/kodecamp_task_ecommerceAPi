const express = require("express");
const bodyParser =require("body-parser");
const app = express();


const  connectDatabase = require("./scr/config/database");

const productRouter = require('./scr/api/routes/product');

connectDatabase(app);

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send(" <h1> ecommerce API </h1>");
});

app.use('/product', productRouter);

console.log("waiting for database");

