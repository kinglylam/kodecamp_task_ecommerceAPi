const express = require("express");
require("dotenv").config();
const app = express();


const  connectDatabase = require("./scr/config/database");

const productRouter = require('./scr/api/routes/product');

app.use(express.json());


app.get("/", (req, res) => {
    res.send(" <h1> ecommerce API </h1>");
});

app.use('/api/product', productRouter);

console.log("waiting for database");

const PORT = process.env.PORT ?? 5000;
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
