
const user = require("../models/user");
const jwt=require("jsonwebtoken");
//const CustomError = require("./scr/error/customError");

const { userValidation } = require("../validation/user");

const hashedPassword = async (password) => {
  try {
    const saltRounds = 12
    const hashed = await bcrypt.hash(password, saltRounds);
    return hashed;
  } catch (err) {
    console.log(err);
  }
};
const signup = async (req, res) => {
    try {
        const { error } = userValidation(req.body);
        if(error)
        return res.status(400).json({
            msg: error.details(0).message
        });
        
        let {firstname, lastname, email, password, confirmPassword} = req.body
        const emailExist = await user.findOne({ email });
        if (emailExist) {
            res.status(400).json({
                msg: "email already exist",
                success: false,
           });

        }

        const hashed = await hashedPassword(password);
        const newUser = new user({
            firstname,
            lastname,
            email,
            password: hashed,
        });
        const refreshToken = await newUser.generateToken(newUser,
          process.env.JWT_REFRESH_SECRET,
          "1d"
        );
        const accessToken = await newUser.generateToken(newUser,
          process.env.JWT_ACCESS_SECRET,
          "o.25h"
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: true,
        });
        newUser.refreshToken = refreshToken;
        await newUser.save();
        return res.status(201).json({
            msg: "new  user account created",
            success: true,
            data: { accessToken, user: newUser }
       });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "failed to create user",
            success: false,
       });
    }
};

const signin = async (req, res) => {
  const user = req.body;
  const result = await userModel.findOne({ email: user.email });
  if (!result) {
    throw new CustomError("Invalid email or password");
  }
  console.log(user.password);
  const validatePassword = await result.validatePassword(user.password);
  if (!validatePassword) {
    console.log(validatePassword);
    throw new CustomError("Invalid email or password validation not working",404);
  }
  const refreshToken = await result.generateToken(
    result,
    process.env.JWT_REFRESH_SECRET,
    "1d"
  );
  const accessToken = await result.generateToken(
    result,
    process.env.JWT_ACCESS_SECRET,
    "0.25h"
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
  });

  result.refreshToken = refreshToken;
  await result.save();

  res.status(201).json({ success: true, data: { accessToken, user: result } });
};

const getAllUsers = async (req, res) => {
    const users = await user.find({});
    res.status(200).json({ 
        success: true, 
        data: users });
  };
  
  const getUserById = async (req, res) => {
    const user = await user.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ 
        success: true, 
        data: user });
  };
  
  const updateUser = async (req, res) => {
    const { firstName, lastName } = req.body;
    if (firstName && lastName) {
      const user = await user.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
      });
      if (!user) {
        throw new Error("something went wrong");
      }
      res.status(200).json({ 
          success: true, 
          data: user });
    } else {
      throw new Error("Invalid data");
    }
  };
  
  const deleteUser = async (req, res) => {
    const user = await user.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ 
        success: true, 
        data: user });
  };

  const refreshAccessToken=async(req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
      throw new CustomError("No refresh token",404);
    }
    const user=await userModel.findOne({refreshToken});
    if(!user){
      throw new CustomError("Invalid refresh token",401);
    }
    
    const payload=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    if(payload._id!=user._id){
      throw new CustomError("Invalid refresh token",401);
    }
  
    const accessToken=await user.generateToken(user,process.env.JWT_ACCESS_SECRET,"0.25h");
    res.status(200).json({success:true,data:{accessToken,user}});
    
  }
module.exports = {signup, signin, getAllUsers, getUserById, updateUser, deleteUser, refreshAccessToken};