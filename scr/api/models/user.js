const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password: {
        type: Number,
        required:true
    },
    refreshToken:{
        type:String,
        default:""
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model("user", userSchema);