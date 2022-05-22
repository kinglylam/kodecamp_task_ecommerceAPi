require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const  connectDatabase = require("./scr/config/database");

const productRouter = require('./scr/api/routes/product');
const userRouter = require("./scr/api/routes/user");

//app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send(" <h1> ecommerce API </h1>");
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

console.log("waiting for database");

const PORT = process.env.PORT || 4000;
const con = async () => {
  try {
    await connectDatabase(process.env.DB_URI);
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}...`);
    });

  } catch (err) {
    console.log(err);
  }

};

con();