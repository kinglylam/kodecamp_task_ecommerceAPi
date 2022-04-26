const mongoose = require("mongoose");






const connectDatabase=async(URL)=>{
    await mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
}

module.exports= connectDatabase;
